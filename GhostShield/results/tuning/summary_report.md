# CarShield AI — Temporal Tuning v2

All 15 experiments completed using the original 12-feature temporal data and training settings.

- Selected: E09, hidden layers 16-8-4-8-16, 768 parameters.
- Learning rate: 0.001. Batch size: 512.
- Regularization: EarlyStopping. Epochs run: 184.
- Baseline validation MSE: 0.011401691474.
- Reloaded selected model validation MSE: 0.001343923504.
- Validation MSE improvement: 88.213%.
- Minimum observed validation MSE: 0.001343923504.
- Saved model: `best_ae_time_12features.keras`.

The selection uses the fewest parameters among candidates within 2% of the minimum MSE, then lower MSE. The saved model was reloaded and scored independently. These results measure reconstruction on normal validation data. Attack detection was outside this run.

Epoch counts include the early-stopping patience period where applicable. For L2 experiments the stopping callback monitors Keras validation loss, while the comparison table uses reconstruction MSE as in the source notebook.

Runtime: Python 3.12.15, TensorFlow 2.21.0, Keras 3.15.1.
