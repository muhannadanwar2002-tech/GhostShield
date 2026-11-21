"""Compare every public row with its original Parquet source."""
import argparse
import json
from pathlib import Path
import numpy as np
import pyarrow.parquet as pq

parser=argparse.ArgumentParser()
parser.add_argument('data', type=Path)
data=parser.parse_args().data
root=Path(__file__).resolve().parents[1]
model=json.loads((root/'site/assets/model.json').read_text())
samples=json.loads((root/'site/assets/samples.json').read_text())
provenance=json.loads((root/'docs/provenance.json').read_text())
count=0
for source, info in provenance.items():
    replay=samples['replay'][source]
    assert [r['row'] for r in replay]==list(range(info['replay_start'],info['replay_start']+128))
    assert set(r['label'] for r in replay)==({'R'} if source=='normal' else {'R','T'})
    rows=replay+samples['examples'][source]
    wanted={}
    for r in rows:
        assert set(r)=={'x','label','row','source'} and r['source']==source
        wanted.setdefault(r['row'],[]).append(r)
    parquet=pq.ParquetFile(data/info['file'])
    assert parquet.metadata.num_rows==info['rows']
    start=0
    for group in range(parquet.num_row_groups):
        stop=start+parquet.metadata.row_group(group).num_rows
        positions=[r for r in wanted if start<=r<stop]
        if positions:
            frame=parquet.read_row_group(group,columns=model['features']+([] if source=='normal' else ['Label'])).take([i-start for i in positions]).to_pandas()
            for i,row in zip(positions,frame.to_dict('records'),strict=True):
                for record in wanted.pop(i):
                    np.testing.assert_array_equal(np.asarray(record['x'],dtype=np.float32),np.array([row[c] for c in model['features']],dtype=np.float32))
                    assert record['label']==('R' if source=='normal' else row['Label'])
                    count+=1
        start=stop
    assert not wanted
print(f'{count} public records matched the exact source features and labels.')
