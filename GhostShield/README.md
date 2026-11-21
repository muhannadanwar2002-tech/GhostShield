# GhostShield — Deep Learning Project

GhostShield scores CAN messages with an autoencoder. Person 4 selected E09
(12 features, hidden layers 16-8-4-8-16) by normal-validation reconstruction
MSE. Person 5 evaluated it on four labeled attack recordings.

| Pooled test metric | Temporal baseline | Tuned E09 |
|---|---:|---:|
| Accuracy | 86.81% | 75.09% |
| Precision | 53.44% | 28.12% |
| Recall | 48.71% | 49.50% |
| F1 | 50.97% | 35.87% |
| False positive rate | 6.95% | 20.72% |

The tuned model improved normal-validation MSE relative to the baseline, but
its F1 and false positive rate were worse on the same 16,569,475 test messages.
Results are per message. Normal validation was also used during model
development. There is no separate held-out normal-only recording. The fixed
threshold is the 99th percentile of E09's normal validation reconstruction
errors. Full-precision metrics and the threshold are in `results/tuned/`.

## Model versions

- The repository root's `best_ae.keras` is the earlier 10-feature model. Its
  E09 was selected using normal-validation MSE and is documented in the
  [historical README](https://github.com/muhannadanwar2002-tech/smarterDrive/blob/0498ec7/README.md).
- `models/time_autoencoder.keras` is the separate 12-feature temporal baseline.
  Its measured attack results appear in the temporal baseline column above.
- `models/best_ae_time_12features.keras` is the final temporal E09. Its inputs add
  the elapsed time since the previous message and since the previous message
  with the same CAN ID. Temporal tuning and evaluation are recorded under
  `results/tuning/` and `results/tuned/`, respectively. Its normal-validation
  MSE was 0.0013439235044643283 versus 0.011401691474020481 for the temporal baseline.

## Files and setup

- `CarShield_AI_Colab_Final.ipynb` displays the saved tables and figures on open.
- `CarShield_AI_Colab.ipynb` integrates all five stages and inference.
- `notebooks/` contains unchanged team notebook copies, including executed tuning and evaluation.
- `models/` contains the original models and a verified HDF5 export of E09.
- `results/` contains measured metrics, tuning settings, comparison CSVs and figures.
- `inference.py` loads the tuned Keras model and its exact saved threshold.

Use Python 3.12 and `python -m pip install -r requirements.txt` in a virtual
environment. Colab users can put the submission folder in Google Drive,
mount it, and change into that folder using the first setup cell. Restart the
runtime after installing packages if prompted. A high-memory runtime is
recommended for raw EDA and preprocessing. Optional training and tuning
can take several minutes or longer.

## Obtain the datasets

1. Download the [Car Hacking Dataset mirror used by the team](https://www.kaggle.com/datasets/pranavjha24/car-hacking-dataset). Extract `DoS_dataset.csv`, `Fuzzy_dataset.csv`, `gear_dataset.csv`, `RPM_dataset.csv`, and `normal_run_data.txt` directly into `team_inputs/raw/`.
2. Download both prepared archives from the [team Drive folder](https://drive.google.com/drive/folders/117fEIcshQSzDMbxA_MjESBPj8n8xdW0G). Place `CAN_Bus_Preprocessed_Data.zip` and `CAN_Bus_Preprocessed_Data_Time_Features.zip` in `team_inputs/`. Extract the temporal archive's contents into `data/`.
3. For preprocessing from the team cleaned export, extract the five cleaned Parquet files into `team_inputs/cleaned/` and set `RUN_RAW_EDA = False`. That route skips raw EDA. If data is stored separately, set `CARSHIELD_DATA_ROOT` to the parent directory containing `data/` and `team_inputs/`.

Raw data and Parquet files are excluded from version control. Run the notebook
with both training switches off to use the published weights. The optional
training and tuning cells save artifacts in an isolated run directory.
The final evaluation always scores the included E09 release against the
original test inputs, so a new optional training run does not silently replace it.

## Inference

`predict_message` takes one **already scaled** row in the original feature order.
Raw CAN bytes, raw timestamps, and hexadecimal strings require the complete team
preprocessing workflow first. This function uses no scaler and expects 12 finite numbers.

```python
import pandas as pd
from inference import FEATURE_COLUMNS, predict_message

row = pd.read_parquet("data/validation_scaled_time.parquet").iloc[0]
result = predict_message(row[list(FEATURE_COLUMNS)].to_numpy())
print(result)
```

The result contains the label, reconstruction error, and calibrated threshold.
The HDF5 format can be loaded with `keras.models.load_model(path, compile=False)`.

The unchanged notebooks in `notebooks/` preserve their original paths and
instructions. Use the integrated notebook for the reproducible submission workflow.

## Verification

The integrated saved-weights workflow ran locally through raw EDA,
preprocessing, model diagnostics, tuned evaluation, and inference.
The evaluation JSON and baseline comparison CSV matched the published
results exactly. The exact threshold was `0.017968580495137495`.

The original Keras model and the reloaded HDF5 export produced identical
predictions on all 197,775 validation messages. Inference was checked with
examples on both sides of the threshold. Optional retraining, optional
tuning, and the hosted Colab runtime were outside this integration test.

## Hosted Colab acceptance test

1. Upload this `GhostShield/` folder to **My Drive** and name the Drive copy
   `CarShield_AI_Final_Submission`. Prepare the dataset layout above. The
   model files must remain under `models/`, and both `results/baseline/` and
   `results/tuned/` must remain in the submission.
2. Open `CarShield_AI_Colab.ipynb` in Colab. Use a **CPU** runtime.
   For the closest match to the local Python 3.12 test, select runtime version
   **2026.07** if it is available. Leave `RUN_RAW_EDA = True`,
   `TRAIN_BASELINES = False`, and `RUN_TUNING = False`.
3. Run the first setup cell and authorize the Drive mount. The cell installs
   only the pinned workflow dependencies when needed. If installation runs,
   restart the session, reopen the setup cell if needed, and run all cells.
4. The setup lists every missing input before EDA begins. To avoid slow repeated
   reads from Drive, optionally copy the data to the runtime's local disk and
   set `CARSHIELD_DATA_ROOT` before the second code cell. The directory it
   points to must directly contain both `team_inputs/` and `data/`.
5. Confirm the last cell prints an inference dictionary and the evaluation
   directory contains the JSON, comparison CSV and five plots. Check for
   16,569,475 pooled messages, P99 near 0.01796858, and pooled F1 near 35.87%.
   Small floating-point differences across CPU platforms are possible. Report
   material differences rather than replacing the published files.
6. In Colab, working outputs default to `/content/carshield_runs/`, which is
   temporary. Download the run's `results_tuned/` or copy it to Drive as a new
   folder before disconnecting. The reference outputs in `results/` are separate.

### Memory and storage

The full workflow loads the raw and cleaned recordings into pandas; those
stages are the main memory risk. Prefer a high-RAM CPU runtime if available.
The 10-feature temporary arrays are released before creating the temporal
arrays. Evaluation reads 32,768 rows per batch and predicts in batches of
4,096, retaining scores and labels for pooled ROC and PR. The pooled score
and label arrays alone occupy about 149 MB; sorting and plotting need
additional temporary memory. Keep several GiB of free local disk for data,
archives and generated outputs. If raw EDA runs out of RAM, try the cleaned
export route on a fresh session and record that raw EDA was skipped. If
preprocessing still fails, rerun the full integration on a higher-memory
runtime. Colab memory availability varies by runtime and plan.

References: [Colab runtime versions](https://research.google.com/colaboratory/runtime-version-faq.html)
and [Colab resource limits](https://research.google.com/colaboratory/faq.html).
