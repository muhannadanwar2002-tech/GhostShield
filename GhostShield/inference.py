"""Classify one already scaled CAN message using the tuned temporal model."""
import json
from functools import lru_cache
from pathlib import Path

import numpy as np
from tensorflow import keras

ROOT = Path(__file__).resolve().parent
FEATURE_COLUMNS = (
    'CAN_ID', 'DLC', 'Byte0', 'Byte1', 'Byte2', 'Byte3',
    'Byte4', 'Byte5', 'Byte6', 'Byte7', 'time_diff', 'can_id_time_diff',
)

@lru_cache(maxsize=1)
def _load_model_and_threshold():
    metadata = json.loads((ROOT / 'results/tuned/frozen_threshold.json').read_text())
    model_path = ROOT / 'models/best_ae_time_12features.keras'
    if metadata['model_filename'] != model_path.name:
        raise ValueError('The threshold belongs to a different model.')
    model = keras.models.load_model(model_path, compile=False)
    if model.input_shape != (None, 12) or model.output_shape != (None, 12):
        raise ValueError('Expected a model with 12 input and output features.')
    threshold = float(metadata['threshold'])
    if not np.isfinite(threshold) or threshold < 0:
        raise ValueError('Invalid reconstruction error threshold.')
    return model, threshold


def predict_message(features):
    """Accept 12 scaled values in FEATURE_COLUMNS order and return the decision."""
    values = np.asarray(features, dtype=np.float32)
    if values.shape != (12,) or not np.isfinite(values).all():
        raise ValueError('Expected 12 finite, already scaled values in feature order.')
    model, threshold = _load_model_and_threshold()
    X = values.reshape(1, 12)
    reconstructed = model.predict(X, verbose=0)
    error = float(np.mean((X - reconstructed) ** 2, dtype=np.float64))
    return {'label': 'Attack' if error > threshold else 'Normal',
            'reconstruction_error': error, 'threshold': threshold}
