# GhostShield | CAN Bus Anomaly Detection

GhostShield learns what normal vehicle traffic looks like on a Controller Area Network (CAN) bus. A neural network called an autoencoder compresses each CAN message into four numbers and tries to reconstruct the original features. The mean squared difference between the input and reconstruction gives each message an anomaly score. A higher score means the message was harder for the model to reconstruct.

The tuned model reduced reconstruction error on held-out normal traffic by **73.5%**. Attack detection is the next evaluation step. The notebooks include labeled test data, but report no detection threshold, precision, recall, or F1 score.

## Data and features

The project uses the [Car-Hacking Dataset on Kaggle](https://www.kaggle.com/datasets/pranavjha24/car-hacking-dataset). It includes one normal driving capture and four labeled captures covering denial-of-service (DoS), fuzzy, gear spoofing, and RPM spoofing. Each labeled capture contains both regular (`R`) and injected (`T`) messages.

The EDA notebook checks that each message contains the number of payload bytes specified by its Data Length Code (DLC). Preprocessing splits the 988,871 normal messages in order into **791,096 training** and **197,775 validation** messages. It fits a MinMax scaler on the training split and uses the same transformation on validation and test data.

| Model input | Features |
| --- | --- |
| Baseline and tuned models | CAN identifier, DLC, and eight payload bytes (`Byte0` through `Byte7`) |
| Timing model | The same ten features, plus the time since the previous message and the time since the previous message with the same CAN identifier |

## Results

The tuning notebook compared 12 configurations, varying learning rate, batch size, layer widths and depth, early stopping, L2 regularization, and dropout. E09 achieved the lowest mean squared error (MSE) on the normal validation split.

| Model | Hidden layers | Parameters | Normal validation MSE |
| --- | --- | ---: | ---: |
| Baseline | 8 → 4 → 8 | 254 | 0.008027 |
| Tuned (E09) | 16 → 8 → 4 → 8 → 16 | 702 | **0.002130** |

E09 used Adam with a learning rate of 0.003 and a batch size of 256. Training stopped after 39 epochs and restored the best weights.

The separate timing experiment compared both baseline architectures after 20 epochs. On the ten features they share, the timing model had a higher MSE (0.0131) than the original baseline (0.0080). Whether timing helps identify injected messages remains an open question.

## Run the project

**To reproduce tuning from the prepared data**, place `04_Tuning.ipynb`, `baseline_autoencoder.keras`, and `CAN_Bus_Preprocessed_Data.zip` in the same working directory. In Google Colab, run this cell there before starting the tuning notebook.

```python
from zipfile import ZipFile

with ZipFile("CAN_Bus_Preprocessed_Data.zip") as archive:
    for name in ["train_scaled.parquet", "validation_scaled.parquet"]:
        archive.extract(name, ".")
```

Run `04_Tuning.ipynb` from top to bottom. It saves the selected model to `models/best_ae.keras`, the experiment table to `results/tuning_results.csv`, and the selected settings to `configs/best_config.json`. The supplied `best_ae.keras` is available for scoring without retraining.

**To rebuild from raw data**, use Google Colab for the Drive and download cells. The notebooks use Python, pandas, NumPy, scikit-learn, TensorFlow/Keras, Matplotlib, seaborn, KaggleHub, and a Parquet engine such as PyArrow.

| Order | Notebook | What it does |
| --- | --- | --- |
| 1 | `ElectricCar_EDA.ipynb` | Downloads the raw captures, cleans the messages, explores traffic patterns, and writes five Parquet files to the `CAN_Cleaned` folder in Google Drive. |
| 2 | `Preprocessing (1).ipynb` | Reads the five cleaned files from the working directory. Creates scaled datasets for the ten-feature and twelve-feature experiments. |
| 3 | `Autoencoder_Baseline_time.ipynb` | Reads both ZIP archives, compares reconstruction errors, and saves `baseline_autoencoder.keras` and `time_autoencoder.keras`. |
| 4 | `04_Tuning.ipynb` | Loads the ten-feature baseline and the extracted training and validation files, then runs the tuning experiments. |

Copy the cleaned Parquet files into the preprocessing working directory before step 2. In that notebook, the first Colab download cell reuses the name `files` for the download module. To run both feature pipelines in one session, change the import to `from google.colab import files as colab_files` and use `colab_files.download(...)` for both downloads. Keep both generated archives beside the baseline comparison notebook. The twelve-feature archive, `CAN_Bus_Preprocessed_Data_Time_Features.zip`, is generated in step 2 and is needed only for the timing comparison.
