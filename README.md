# GhostShield | CAN Bus Anomaly Detection

GhostShield evaluates an autoencoder that assigns a reconstruction error to already scaled CAN messages. The final submission uses the tuned 12-feature temporal E09 and a fixed threshold calibrated on normal validation data.

- [Final Colab notebook with saved results](GhostShield/CarShield_AI_Colab_Final.ipynb)
- [Setup, data sources, inference and model documentation](GhostShield/README.md)
- [Measured E09 results](GhostShield/results/tuned/evaluation_metrics.json) and [comparison with the 12-feature temporal baseline](GhostShield/results/tuned/baseline_vs_tuned.csv)

| Metric on 16,569,475 test messages | Temporal baseline (12 features) | Final E09 (12 features) |
|---|---:|---:|
| Accuracy | 86.81% | 75.09% |
| Precision | 53.44% | 28.12% |
| Recall | 48.71% | 49.50% |
| F1 | 50.97% | 35.87% |
| False positive rate | 6.95% | 20.72% |

The final model reduced normal-validation reconstruction error. At the calibrated thresholds, the temporal baseline had higher F1 and fewer false alarms on the same attack recordings.

The earlier root-level [`best_ae.keras`](best_ae.keras) uses 10 inputs (CAN ID, DLC, and eight payload bytes). Its tuning results are documented in the [historical README](https://github.com/muhannadanwar2002-tech/smarterDrive/blob/0498ec7/README.md). The final [temporal E09](GhostShield/models/best_ae_time_12features.keras) uses 12 inputs, adding two timing features. Despite sharing the E09 label, these are separate experiments with different input schemas.
