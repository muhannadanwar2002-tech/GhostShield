"""Export E09 weights, genuine fixtures, and independent Keras references."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
import pandas as pd
import pyarrow.parquet as pq
from tensorflow import keras

parser = argparse.ArgumentParser()
parser.add_argument('data', type=Path, help='Directory with original temporal Parquet files')
data = parser.parse_args().data
root = Path(__file__).resolve().parents[1]
submission = root.parent / 'GhostShield'
weights = submission / 'models/best_ae_time_12features.keras'
metadata = json.loads((submission/'results/tuned/frozen_threshold.json').read_text())
assert metadata['model_filename'] == weights.name
threshold = metadata['threshold']
model = keras.models.load_model(weights, compile=False)
features = ['CAN_ID','DLC',*[f'Byte{i}' for i in range(8)],'time_diff','can_id_time_diff']
assert model.input_shape == model.output_shape == (None, 12)
assert [l.units for l in model.layers] == [16, 8, 4, 8, 16, 12]
assert [l.activation.__name__ for l in model.layers] == ['relu']*5 + ['sigmoid']
def write(path, value):
    path.write_text(json.dumps(value, separators=(',', ':'), allow_nan=False)+'\n')
def record(nums, labels, i, source, row):
    return dict(x=nums[i].tolist(), label=labels[i], row=int(row), source=source)
def scored(X):
    rec = model.predict(X, batch_size=4096, verbose=0)
    mse = np.mean((X-rec)**2, axis=1, dtype=np.float64)
    return rec, mse

assets = root/'site/assets'
write(assets/'model.json', dict(features=features, threshold=threshold, sha256=hashlib.sha256(weights.read_bytes()).hexdigest(),
    layers=[dict(kernel=l.get_weights()[0].tolist(), bias=l.get_weights()[1].tolist(), activation=l.activation.__name__) for l in model.layers]))
rng = np.random.default_rng(42)
replay, examples, refs, provenance = {}, {}, [], {}
for source in ['normal','dos','fuzzy','gear','rpm']:
    filename = 'validation_scaled_time.parquet' if source == 'normal' else f'{source}_test_scaled_time.parquet'
    pf = pq.ParquetFile(data/filename)
    cols = features + ([] if source=='normal' else ['Label'])
    assert pf.schema_arrow.names == cols
    total = pf.metadata.num_rows
    picks = np.sort(rng.choice(total, 8192, replace=False))
    samples, labels = [], []
    segment, previous, offset, start = [], [], 0, None
    for batch in pf.iter_batches(batch_size=32768, columns=cols):
        frame = batch.to_pandas()
        X = frame[features].to_numpy(dtype=np.float32)
        Y = frame.Label.tolist() if source!='normal' else ['R']*len(frame)
        assert set(Y)<={'R','T'} and np.isfinite(X).all()
        lo, hi = picks.searchsorted([offset,offset+len(X)])
        local = picks[lo:hi]-offset
        samples.extend(X[local])
        labels.extend(Y[i] for i in local)
        if start is None and (source=='normal' or 'T' in Y):
            i = 0 if source=='normal' else Y.index('T')
            start = max(0, offset+i-32)
            if start < offset:
                segment.extend(previous[start-offset:])
        if start is not None and len(segment)<128:
            a=max(0,start-offset)
            b=min(len(X),start+128-offset)
            if a<b:
                segment.extend(record(X,Y,i,source,offset+i) for i in range(a,b))
        if start is None:
            previous=[record(X,Y,i,source,offset+i) for i in range(max(0,len(X)-32),len(X))]
        offset+=len(X)
    assert len(segment)==128 and [r['row'] for r in segment]==list(range(start,start+128))
    replay[source]=segment
    S=np.array(samples,dtype=np.float32)
    R,M=scored(S)
    example_ids=[]
    for truth in ('R','T'):
        for pred in (False, True):
            example_ids.extend(np.flatnonzero((np.array(labels)==truth)&((M>threshold)==pred))[:3])
    examples[source]=[record(S,labels,i,source,picks[i]) for i in sorted(set(example_ids))]
    close=np.argsort(abs(M-threshold))[:16]
    indices=np.unique(np.r_[rng.choice(len(S),240,replace=False),close,example_ids])
    for i in indices:
        refs.append(dict(**record(S,labels,i,source,picks[i]), reconstructed=R[i].tolist(), mse=float(M[i]), attack=bool(M[i]>threshold)))
    provenance[source]=dict(file=filename, rows=total, replay_start=start, replay_length=len(segment),
        replay_labels=sorted(set(r['label'] for r in segment)),
        example_counts={f'{truth}/{pred}':int(sum(labels[i]==truth and (M[i]>threshold)==pred for i in example_ids)) for truth in ('R','T') for pred in (False,True)})
write(assets/'samples.json',dict(replay=replay,examples=examples))
write(root/'tests/reference.json',refs)
write(root/'docs/provenance.json',provenance)
write(assets/'metrics.json',dict(tuned=json.loads((submission/'results/tuned/evaluation_metrics.json').read_text())['metrics'],
    baseline=json.loads((submission/'results/baseline/evaluation_metrics.json').read_text())['metrics']))
print('Exported',len(refs),'independent reference examples.')
