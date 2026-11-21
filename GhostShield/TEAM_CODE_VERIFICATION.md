# Team code verification

Cell numbers are one-based positions including Markdown cells. Comparisons use exact source strings, including comments, whitespace and empty code cells. Outputs, counts and metadata are excluded from code comparison. Exact cells are aligned in order using SequenceMatcher; changed blocks are diffed in full with cell headers. Thus splits, merges and moves are visible as deletions and additions.

## Source identification

Drive snapshots from the original team folder are authoritative for Persons 1–3. The local v2 source is used for Person 4; the local simplified notebook is used for Person 5, as identified by the unified source. Later executed deliverables are checked separately.

| Member | Original source | Submission copy | Source SHA-256 | Submission SHA-256 | Original code cells | Copy status and changes | Integrated status |
|---|---|---|---|---|---:|---|---|
| 1 | ElectricCar_EDA.ipynb | 01_EDA.ipynb | `e9d98e673139d27c48cb052897e957c032bc73a28d1c6da4f0f3ae3cd84e7112` | `e9d98e673139d27c48cb052897e957c032bc73a28d1c6da4f0f3ae3cd84e7112` | 131 | EXACT MATCH (131 submission code cells) | MODIFIED |
| 2 | Preprocessing (1).ipynb | 02_Preprocessing.ipynb | `92b7fc442f32425deb132bf55f40f59c1326aa36aff5865bbf66b8124d7d497e` | `92b7fc442f32425deb132bf55f40f59c1326aa36aff5865bbf66b8124d7d497e` | 15 | EXACT MATCH (15 submission code cells) | MODIFIED |
| 3 | Autoencoder_Baseline_time.ipynb | 03_Autoencoder_Baseline.ipynb | `29de69300305cbe2743574c09af7339c8a18c3e1dd4492b8b3088f423272d4cf` | `29de69300305cbe2743574c09af7339c8a18c3e1dd4492b8b3088f423272d4cf` | 11 | EXACT MATCH (11 submission code cells) | MODIFIED |
| 4 | 04_Tuning_Time_v2.ipynb | 04_Temporal_Tuning_Executed.ipynb | `d023c1be40d0aa305b29d7b5b59e56ddadaa9d37278ae6e2a43bae619c5c5fba` | `2da9e23de55482a2afeaf5eae88dcfaa9bdd2d8e561fdea631ecfc954bac0417` | 18 | MODIFIED (18 submission code cells) | MODIFIED |
| 5 | 05_Anomaly_Detection_Evaluation_Simple.ipynb | 05_Tuned_Evaluation_Executed.ipynb | `3672b7083c9a4ad35aca2b841798d494965ac1d8d0045143ab658a520cb5cf25` | `515fc841c11963293874ddb2f286741fcb3a9aa6405b19f8c088e680f002e65c` | 10 | MODIFIED (10 submission code cells) | MODIFIED |

## Later executed release copies
- Person 4: EXACT MATCH to executed release `04_Tuning_Time_v2_Executed.ipynb`, SHA-256 `2da9e23de55482a2afeaf5eae88dcfaa9bdd2d8e561fdea631ecfc954bac0417`. This does not imply identity to the earlier source.
- Person 5: EXACT MATCH to executed release `05_Anomaly_Detection_Evaluation_Tuned.ipynb`, SHA-256 `515fc841c11963293874ddb2f286741fcb3a9aa6405b19f8c088e680f002e65c`. This does not imply identity to the earlier source.

## Additional integration cells
- Integrated notebook: cells 2–3 (setup), 263 (release arrays before evaluation), and 283 (inference example).
- Executed and final: two additional cells display archived baseline and tuning results; source stages are compared separately.

## Final cleanup validation

Stream text changed only in cells [4, 12, 199, 205]. Removed the free-disk diagnostic and absolute run directory, shortened the input inventory to project-relative paths, and replaced two absolute archive destination messages. Python and Markdown source, execution counts, and all 31 images are unchanged. E09 and all metrics match the original executed run.
Pooled: 16,569,475 messages; Accuracy 0.750891503804; Precision 0.281198530343; Recall 0.495016763764; F1 0.35865819064; FPR 0.207208084193.

## Person 1 — ElectricCar_EDA.ipynb

### Individual copy
EXACT MATCH (all code cells in order).

### Unified source archive
EXACT MATCH (all code cells in order).

### Integrated notebook
MODIFIED

```diff
replace: source [1, 2, 3, 6, 7, 8, 9, 10, 11] → target [6, 7, 8, 11, 12, 13, 14, 15, 16]
--- original
+++ integrated
@@ -1,34 +1,34 @@
-# Cell 1
-!pip install -q -U kagglehub
-# Cell 2
-import kagglehub
+# Cell 6
+# Dependencies are installed in the project environment before running the notebook.
+# Cell 7
+path = str(RAW)
+if not RUN_RAW_EDA:
+    print('Raw EDA skipped. Preprocessing will use the team cleaned export.')
+# Cell 8
+import os
+# Cell 11
+if RUN_RAW_EDA:
+    import os
 
-path = kagglehub.dataset_download(
-    "pranavjha24/car-hacking-dataset",
-    output_dir="/content/car_hacking"
-)
+    for folder, subfolders, files in os.walk(path):
+        for file in files:
+            print(os.path.join(folder, file))
+# Cell 12
+if RUN_RAW_EDA:
+    import pandas as pd
+    import seaborn as sns
+    import matplotlib.pyplot as plt
+    import numpy as np
 
-print("Dataset folder:", path)
-# Cell 3
-from google.colab import drive
-import os
-# Cell 6
-import os
-
-for folder, subfolders, files in os.walk(path):
-    for file in files:
-        print(os.path.join(folder, file))
-# Cell 7
-import pandas as pd
-import seaborn as sns
-import matplotlib.pyplot as plt
-import numpy as np
-
-# Cell 8
-df_fuzzy=pd.read_csv(f"{path}/Fuzzy_dataset.csv")
-# Cell 9
-df_dos=pd.read_csv(f"{path}/DoS_dataset.csv")
-# Cell 10
-df_rpm=pd.read_csv(f"{path}/RPM_dataset.csv")
-# Cell 11
-df_gear=pd.read_csv(f"{path}/gear_dataset.csv")
+# Cell 13
+if RUN_RAW_EDA:
+    df_fuzzy=pd.read_csv(f"{path}/Fuzzy_dataset.csv")
+# Cell 14
+if RUN_RAW_EDA:
+    df_dos=pd.read_csv(f"{path}/DoS_dataset.csv")
+# Cell 15
+if RUN_RAW_EDA:
+    df_rpm=pd.read_csv(f"{path}/RPM_dataset.csv")
+# Cell 16
+if RUN_RAW_EDA:
+    df_gear=pd.read_csv(f"{path}/gear_dataset.csv")
replace: source [14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 44, 46, 47, 48, 49] → target [19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 46, 49, 51, 52, 53, 54]
--- original
+++ integrated
@@ -1,81 +1,111 @@
-# Cell 14
-df_fuzzy.info()
-# Cell 15
-df_dos.info()
-# Cell 16
-df_rpm.info()
-# Cell 17
-df_gear.info()
-# Cell 18
-df_fuzzy
 # Cell 19
-df_dos
+if RUN_RAW_EDA:
+    df_fuzzy.info()
 # Cell 20
-df_rpm
+if RUN_RAW_EDA:
+    df_dos.info()
 # Cell 21
-df_gear
+if RUN_RAW_EDA:
+    df_rpm.info()
+# Cell 22
+if RUN_RAW_EDA:
+    df_gear.info()
 # Cell 23
-df_fuzzy = pd.read_csv(f"{path}/Fuzzy_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
+if RUN_RAW_EDA:
+    display(df_fuzzy)
 # Cell 24
-df_dos=pd.read_csv(f"{path}/DoS_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
+if RUN_RAW_EDA:
+    display(df_dos)
 # Cell 25
-df_rpm=pd.read_csv(f"{path}/RPM_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
+if RUN_RAW_EDA:
+    display(df_rpm)
 # Cell 26
-df_gear=pd.read_csv(f"{path}/gear_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
-# Cell 27
-df_fuzzy.describe()
+if RUN_RAW_EDA:
+    display(df_gear)
 # Cell 28
-df_dos.describe()
+if RUN_RAW_EDA:
+    df_fuzzy = pd.read_csv(f"{path}/Fuzzy_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
 # Cell 29
-df_rpm.describe()
+if RUN_RAW_EDA:
+    df_dos=pd.read_csv(f"{path}/DoS_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
 # Cell 30
-df_gear.describe()
+if RUN_RAW_EDA:
+    df_rpm=pd.read_csv(f"{path}/RPM_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
 # Cell 31
-df_fuzzy
+if RUN_RAW_EDA:
+    df_gear=pd.read_csv(f"{path}/gear_dataset.csv",header=None,names=["Timestamp","CAN_ID","DLC","Byte0", "Byte1", "Byte2", "Byte3","Byte4", "Byte5", "Byte6", "Byte7","Label"])
+# Cell 32
+if RUN_RAW_EDA:
+    display(df_fuzzy.describe())
 # Cell 33
-df_fuzzy.isnull().sum()
+if RUN_RAW_EDA:
+    display(df_dos.describe())
 # Cell 34
-df_dos.isnull().sum()
+if RUN_RAW_EDA:
+    display(df_rpm.describe())
 # Cell 35
-df_rpm.isnull().sum()
+if RUN_RAW_EDA:
+    display(df_gear.describe())
 # Cell 36
-df_gear.isnull().sum()
+if RUN_RAW_EDA:
+    display(df_fuzzy)
 # Cell 38
-df_fuzzy.duplicated().sum()
+if RUN_RAW_EDA:
+    display(df_fuzzy.isnull().sum())
 # Cell 39
-df_dos.duplicated().sum()
+if RUN_RAW_EDA:
+    display(df_dos.isnull().sum())
 # Cell 40
-df_rpm.duplicated().sum()
+if RUN_RAW_EDA:
+    display(df_rpm.isnull().sum())
 # Cell 41
-df_gear.duplicated().sum()
+if RUN_RAW_EDA:
+    display(df_gear.isnull().sum())
+# Cell 43
+if RUN_RAW_EDA:
+    display(df_fuzzy.duplicated().sum())
 # Cell 44
-df_fuzzy.isnull().mean()
+if RUN_RAW_EDA:
+    display(df_dos.duplicated().sum())
+# Cell 45
+if RUN_RAW_EDA:
+    display(df_rpm.duplicated().sum())
 # Cell 46
-byte_columns = [
-    "Byte0", "Byte1", "Byte2", "Byte3",
-    "Byte4", "Byte5", "Byte6", "Byte7"
-]
+if RUN_RAW_EDA:
+    display(df_gear.duplicated().sum())
+# Cell 49
+if RUN_RAW_EDA:
+    display(df_fuzzy.isnull().mean())
+# Cell 51
+if RUN_RAW_EDA:
+    byte_columns = [
+        "Byte0", "Byte1", "Byte2", "Byte3",
+        "Byte4", "Byte5", "Byte6", "Byte7"
+    ]
 
-# Cell 47
-for data in [df_fuzzy, df_dos, df_rpm, df_gear]:
-    for dlc, column in enumerate(byte_columns):
-        shifted = (
-            data["DLC"].eq(dlc)
-            & data["Label"].isna()
-            & data[column].isin(["R", "T"])
-        )
+# Cell 52
+if RUN_RAW_EDA:
+    for data in [df_fuzzy, df_dos, df_rpm, df_gear]:
+        for dlc, column in enumerate(byte_columns):
+            shifted = (
+                data["DLC"].eq(dlc)
+                & data["Label"].isna()
+                & data[column].isin(["R", "T"])
+            )
 
-        data.loc[shifted, "Label"] = data.loc[shifted, column]
-        data.loc[shifted, column] = np.nan
+            data.loc[shifted, "Label"] = data.loc[shifted, column]
+            data.loc[shifted, column] = np.nan
 
-# Cell 48
-byte_count = df_fuzzy[byte_columns].notna().sum(axis=1)
-# Cell 49
-valid = (
-    df_fuzzy["Timestamp"].notna()
-    & df_fuzzy["CAN_ID"].notna()
-    & df_fuzzy["DLC"].isin(range(9))
-    & byte_count.eq(df_fuzzy["DLC"])
-    & df_fuzzy["Label"].notna()
-)
+# Cell 53
+if RUN_RAW_EDA:
+    byte_count = df_fuzzy[byte_columns].notna().sum(axis=1)
+# Cell 54
+if RUN_RAW_EDA:
+    valid = (
+        df_fuzzy["Timestamp"].notna()
+        & df_fuzzy["CAN_ID"].notna()
+        & df_fuzzy["DLC"].isin(range(9))
+        & byte_count.eq(df_fuzzy["DLC"])
+        & df_fuzzy["Label"].notna()
+    )
 
replace: source [53, 54, 56] → target [58, 59, 61]
--- original
+++ integrated
@@ -1,16 +1,19 @@
-# Cell 53
-df_fuzzy=df_fuzzy[valid]
-# Cell 54
-df_dos.isnull().mean()
-# Cell 56
-#df_dos=df_dos.dropna(axis=0)
-byte_count = df_dos[byte_columns].notna().sum(axis=1)
-valid = (
-    df_dos["Timestamp"].notna()
-    & df_dos["CAN_ID"].notna()
-    & df_dos["DLC"].isin(range(9))
-    & byte_count.eq(df_dos["DLC"])
-    & df_dos["Label"].notna()
-)
+# Cell 58
+if RUN_RAW_EDA:
+    df_fuzzy=df_fuzzy[valid]
+# Cell 59
+if RUN_RAW_EDA:
+    display(df_dos.isnull().mean())
+# Cell 61
+if RUN_RAW_EDA:
+    #df_dos=df_dos.dropna(axis=0)
+    byte_count = df_dos[byte_columns].notna().sum(axis=1)
+    valid = (
+        df_dos["Timestamp"].notna()
+        & df_dos["CAN_ID"].notna()
+        & df_dos["DLC"].isin(range(9))
+        & byte_count.eq(df_dos["DLC"])
+        & df_dos["Label"].notna()
+    )
 
 
replace: source [58] → target [63]
--- original
+++ integrated
@@ -1,2 +1,3 @@
-# Cell 58
-df_dos=df_dos[valid]
+# Cell 63
+if RUN_RAW_EDA:
+    df_dos=df_dos[valid]
replace: source [62] → target [67]
--- original
+++ integrated
@@ -1,11 +1,12 @@
-# Cell 62
-byte_count = df_rpm[byte_columns].notna().sum(axis=1)
-valid = (
-    df_rpm["Timestamp"].notna()
-    & df_rpm["CAN_ID"].notna()
-    & df_rpm["DLC"].isin(range(9))
-    & byte_count.eq(df_rpm["DLC"])
-    & df_rpm["Label"].notna()
-)
+# Cell 67
+if RUN_RAW_EDA:
+    byte_count = df_rpm[byte_columns].notna().sum(axis=1)
+    valid = (
+        df_rpm["Timestamp"].notna()
+        & df_rpm["CAN_ID"].notna()
+        & df_rpm["DLC"].isin(range(9))
+        & byte_count.eq(df_rpm["DLC"])
+        & df_rpm["Label"].notna()
+    )
 
 
replace: source [64, 65] → target [69, 70]
--- original
+++ integrated
@@ -1,4 +1,6 @@
-# Cell 64
-df_rpm=df_rpm[valid]
-# Cell 65
-df_gear.isnull().mean()
+# Cell 69
+if RUN_RAW_EDA:
+    df_rpm=df_rpm[valid]
+# Cell 70
+if RUN_RAW_EDA:
+    display(df_gear.isnull().mean())
replace: source [68] → target [73]
--- original
+++ integrated
@@ -1,11 +1,12 @@
-# Cell 68
-byte_count = df_gear[byte_columns].notna().sum(axis=1)
-valid = (
-    df_gear["Timestamp"].notna()
-    & df_gear["CAN_ID"].notna()
-    & df_gear["DLC"].isin(range(9))
-    & byte_count.eq(df_gear["DLC"])
-    & df_gear["Label"].notna()
-)
+# Cell 73
+if RUN_RAW_EDA:
+    byte_count = df_gear[byte_columns].notna().sum(axis=1)
+    valid = (
+        df_gear["Timestamp"].notna()
+        & df_gear["CAN_ID"].notna()
+        & df_gear["DLC"].isin(range(9))
+        & byte_count.eq(df_gear["DLC"])
+        & df_gear["Label"].notna()
+    )
 
 
replace: source [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 100, 102] → target [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 107]
--- original
+++ integrated
@@ -1,80 +1,109 @@
-# Cell 70
-df_gear=df_gear[valid]
-# Cell 71
-df_fuzzy.shape
-# Cell 72
-df_dos.shape
-# Cell 73
-df_rpm.shape
-# Cell 74
-df_gear.shape
 # Cell 75
+if RUN_RAW_EDA:
+    df_gear=df_gear[valid]
+# Cell 76
+if RUN_RAW_EDA:
+    display(df_fuzzy.shape)
+# Cell 77
+if RUN_RAW_EDA:
+    display(df_dos.shape)
+# Cell 78
+if RUN_RAW_EDA:
+    display(df_rpm.shape)
+# Cell 79
+if RUN_RAW_EDA:
+    display(df_gear.shape)
+# Cell 80
+if RUN_RAW_EDA:
 
-for column in byte_columns:
-    df_fuzzy[column] = df_fuzzy[column].map(
-        lambda value: int(value, 16) if isinstance(value, str) else value
-    )
-# Cell 76
-df_fuzzy.head()
-# Cell 77
-df_fuzzy.tail()
-# Cell 78
-for column in byte_columns:
-    df_dos[column] = df_dos[column].map(
-        lambda value: int(value, 16) if isinstance(value, str) else value
-    )
-# Cell 79
-df_dos.head()
-
-# Cell 80
-df_dos.tail()
+    for column in byte_columns:
+        df_fuzzy[column] = df_fuzzy[column].map(
+            lambda value: int(value, 16) if isinstance(value, str) else value
+        )
 # Cell 81
-for column in byte_columns:
-    df_rpm[column] = df_rpm[column].map(
-        lambda value: int(value, 16) if isinstance(value, str) else value
-    )
+if RUN_RAW_EDA:
+    display(df_fuzzy.head())
 # Cell 82
-df_rpm.head()
+if RUN_RAW_EDA:
+    display(df_fuzzy.tail())
 # Cell 83
-df_rpm.tail()
+if RUN_RAW_EDA:
+    for column in byte_columns:
+        df_dos[column] = df_dos[column].map(
+            lambda value: int(value, 16) if isinstance(value, str) else value
+        )
 # Cell 84
-for column in byte_columns:
-    df_gear[column] = df_gear[column].map(
-        lambda value: int(value, 16) if isinstance(value, str) else value
-    )
+if RUN_RAW_EDA:
+    display(df_dos.head())
 # Cell 85
-df_gear.head()
+if RUN_RAW_EDA:
+    display(df_dos.tail())
 # Cell 86
-df_gear.tail()
+if RUN_RAW_EDA:
+    for column in byte_columns:
+        df_rpm[column] = df_rpm[column].map(
+            lambda value: int(value, 16) if isinstance(value, str) else value
+        )
+# Cell 87
+if RUN_RAW_EDA:
+    display(df_rpm.head())
 # Cell 88
-df=pd.read_csv(f"{path}/normal_run_data.txt")
+if RUN_RAW_EDA:
+    display(df_rpm.tail())
 # Cell 89
-df
+if RUN_RAW_EDA:
+    for column in byte_columns:
+        df_gear[column] = df_gear[column].map(
+            lambda value: int(value, 16) if isinstance(value, str) else value
+        )
 # Cell 90
-df = pd.read_csv(f"{path}/normal_run_data.txt",sep=r"\s+",header=None,)
+if RUN_RAW_EDA:
+    display(df_gear.head())
 # Cell 91
-df
-# Cell 92
-df.columns = [
-    "Timestamp_tag", "Timestamp", "ID_tag", "CAN_ID", "Extra",
-    "DLC_tag", "DLC",
-    "Byte0", "Byte1", "Byte2", "Byte3",
-    "Byte4", "Byte5", "Byte6", "Byte7"
-]
+if RUN_RAW_EDA:
+    display(df_gear.tail())
 # Cell 93
-df
+if RUN_RAW_EDA:
+    df=pd.read_csv(f"{path}/normal_run_data.txt")
+# Cell 94
+if RUN_RAW_EDA:
+    display(df)
 # Cell 95
-drop=["Timestamp_tag","ID_tag","DLC_tag","Extra"]
-df=df.drop(columns=drop,axis=1)
+if RUN_RAW_EDA:
+    df = pd.read_csv(f"{path}/normal_run_data.txt",sep=r"\s+",header=None,)
 # Cell 96
-df.info()
+if RUN_RAW_EDA:
+    display(df)
 # Cell 97
-df.describe()
+if RUN_RAW_EDA:
+    df.columns = [
+        "Timestamp_tag", "Timestamp", "ID_tag", "CAN_ID", "Extra",
+        "DLC_tag", "DLC",
+        "Byte0", "Byte1", "Byte2", "Byte3",
+        "Byte4", "Byte5", "Byte6", "Byte7"
+    ]
 # Cell 98
-df.shape
-# Cell 99
-df.isnull().sum()
+if RUN_RAW_EDA:
+    display(df)
 # Cell 100
-df.duplicated().sum()
+if RUN_RAW_EDA:
+    drop=["Timestamp_tag","ID_tag","DLC_tag","Extra"]
+    df=df.drop(columns=drop)
+# Cell 101
+if RUN_RAW_EDA:
+    df.info()
 # Cell 102
-df.isnull().mean()
+if RUN_RAW_EDA:
+    display(df.describe())
+# Cell 103
+if RUN_RAW_EDA:
+    display(df.shape)
+# Cell 104
+if RUN_RAW_EDA:
+    display(df.isnull().sum())
+# Cell 105
+if RUN_RAW_EDA:
+    display(df.duplicated().sum())
+# Cell 107
+if RUN_RAW_EDA:
+    display(df.isnull().mean())
replace: source [105, 106, 107, 108, 110, 111, 112] → target [110, 111, 112, 113, 115, 116, 117]
--- original
+++ integrated
@@ -1,23 +1,30 @@
-# Cell 105
-df.shape
-# Cell 106
-df["DLC"] = pd.to_numeric(df["DLC"], errors="coerce")
-# Cell 107
-df['Timestamp']=pd.to_numeric(df['Timestamp'],errors="coerce")
-# Cell 108
-byte_count = df[byte_columns].notna().sum(axis=1)
 # Cell 110
-valid = (
-    df["Timestamp"].notna()
-    & df["CAN_ID"].notna()
-    & df["DLC"].isin(range(9))
-    & byte_count.eq(df["DLC"])
+if RUN_RAW_EDA:
+    display(df.shape)
+# Cell 111
+if RUN_RAW_EDA:
+    df["DLC"] = pd.to_numeric(df["DLC"], errors="coerce")
+# Cell 112
+if RUN_RAW_EDA:
+    df['Timestamp']=pd.to_numeric(df['Timestamp'],errors="coerce")
+# Cell 113
+if RUN_RAW_EDA:
+    byte_count = df[byte_columns].notna().sum(axis=1)
+# Cell 115
+if RUN_RAW_EDA:
+    valid = (
+        df["Timestamp"].notna()
+        & df["CAN_ID"].notna()
+        & df["DLC"].isin(range(9))
+        & byte_count.eq(df["DLC"])
 
-)
+    )
 
-invalid = df[~valid].copy()
-# Cell 111
-invalid
-# Cell 112
-df=df[valid]
-df
+    invalid = df[~valid].copy()
+# Cell 116
+if RUN_RAW_EDA:
+    display(invalid)
+# Cell 117
+if RUN_RAW_EDA:
+    df=df[valid]
+    display(df)
replace: source [114, 115, 116, 117, 118, 121, 122, 123, 125, 126, 127, 131, 132, 133, 135, 136, 137, 140, 141, 142, 144, 145, 148, 149, 150, 152, 153, 156, 159, 162, 165, 168, 170, 172, 174, 176] → target [119, 120, 121, 122, 123, 126, 127, 128, 130, 131, 132, 136, 137, 138, 140, 141, 142, 145, 146, 147, 149, 150, 153, 154, 155, 157, 158, 161, 164, 167, 170, 173, 175, 177, 179, 181]
--- original
+++ integrated
@@ -1,131 +1,165 @@
-# Cell 114
-for column in byte_columns:
-    df[column] = df[column].map(
-        lambda value: int(value, 16) if isinstance(value, str) else value
-    )
-
-df["Label"] = "R"
-# Cell 115
-df
-# Cell 116
-df.info()
-# Cell 117
-df.head()
-# Cell 118
-df.tail()
-# Cell 121
-sns.countplot(df_fuzzy["Label"])
-# Cell 122
-sns.countplot(data=df_fuzzy, x="DLC", hue="Label")
-plt.show()
-# Cell 123
-df_fuzzy["Label"].value_counts(normalize=True) * 100
-# Cell 125
-df_fuzzy.columns
-# Cell 126
-sns.histplot(df_fuzzy,x="DLC",bins=15)
-# Cell 127
-sns.boxplot(data=df_fuzzy,x="DLC")
-# Cell 131
-sns.countplot(data=df_dos, x="Label")
-plt.show()
-# Cell 132
-sns.countplot(data=df_dos, x="DLC", hue="Label")
-plt.show()
-# Cell 133
-df_dos["Label"].value_counts(normalize=True) * 100
-# Cell 135
-sns.histplot(df_dos["DLC"],bins=15)
-# Cell 136
-df_dos["DLC"].value_counts()
-# Cell 137
-sns.boxplot(data=df_dos, x="DLC")
-plt.show()
-# Cell 140
-sns.countplot(data=df_rpm, x="Label")
-plt.show()
-# Cell 141
-sns.countplot(data=df_rpm, x="DLC", hue="Label")
-plt.show()
-# Cell 142
-df_rpm["Label"].value_counts(normalize=True) * 100
-# Cell 144
-sns.histplot(data=df_rpm, x="DLC", bins=15)
-plt.show()
-# Cell 145
-sns.boxplot(data=df_rpm, x="DLC")
-plt.show()
-# Cell 148
-sns.countplot(data=df_gear, x="Label")
-plt.show()
-# Cell 149
-sns.countplot(data=df_gear, x="DLC", hue="Label")
-plt.show()
-# Cell 150
-df_gear["Label"].value_counts(normalize=True) * 100
-# Cell 152
-sns.histplot(data=df_gear, x="DLC", bins=15)
-plt.show()
-# Cell 153
-sns.boxplot(data=df_gear, x="DLC")
-plt.show()
-# Cell 156
-sns.heatmap(
-    df_fuzzy[["DLC"] + byte_columns].corr(),
-    annot=True,
-    cmap="coolwarm"
-)
-plt.show()
-# Cell 159
-sns.heatmap(df_dos[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
-plt.show()
-# Cell 162
-sns.heatmap(df_rpm[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
-plt.show()
-# Cell 165
-sns.heatmap(df_gear[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
-plt.show()
-# Cell 168
-comp= df_fuzzy.groupby("Label")[byte_columns].mean().T
-comp.columns.name = "Label"
-
-comp
-# Cell 170
-comp= df_dos.groupby("Label")[byte_columns].mean().T
-comp.columns.name = "Label"
-
-comp
-# Cell 172
-comp= df_rpm.groupby("Label")[byte_columns].mean().T
-comp.columns.name = "Label"
-
-comp
-# Cell 174
-comp= df_gear.groupby("Label")[byte_columns].mean().T
-comp.columns.name = "Label"
-
-comp
-# Cell 176
-drive.mount("/content/drive")
-
-folder = "/content/drive/MyDrive/CAN_Cleaned"
-os.makedirs(folder, exist_ok=True)
-
-datasets = {
-    "normal": df,
-    "fuzzy": df_fuzzy,
-    "dos": df_dos,
-    "rpm": df_rpm,
-    "gear": df_gear
-}
-
-for name, data in datasets.items():
-    assert data["Label"].isin(["R", "T"]).all(), f"Check Label in {name}"
-
-    for position, column in enumerate(byte_columns):
-        assert data[column].notna().eq(data["DLC"] > position).all(), (
-            f"Check {column} and DLC in {name}"
+# Cell 119
+if RUN_RAW_EDA:
+    for column in byte_columns:
+        df[column] = df[column].map(
+            lambda value: int(value, 16) if isinstance(value, str) else value
         )
 
-    data.to_parquet(f"{folder}/{name}.parquet", index=False)
-    print(f"Saved {name}.parquet | {len(data):,} rows")
+    df["Label"] = "R"
+# Cell 120
+if RUN_RAW_EDA:
+    display(df)
+# Cell 121
+if RUN_RAW_EDA:
+    df.info()
+# Cell 122
+if RUN_RAW_EDA:
+    display(df.head())
+# Cell 123
+if RUN_RAW_EDA:
+    display(df.tail())
+# Cell 126
+if RUN_RAW_EDA:
+    sns.countplot(df_fuzzy["Label"])
+# Cell 127
+if RUN_RAW_EDA:
+    sns.countplot(data=df_fuzzy, x="DLC", hue="Label")
+    plt.show()
+# Cell 128
+if RUN_RAW_EDA:
+    display(df_fuzzy["Label"].value_counts(normalize=True) * 100)
+# Cell 130
+if RUN_RAW_EDA:
+    display(df_fuzzy.columns)
+# Cell 131
+if RUN_RAW_EDA:
+    sns.histplot(df_fuzzy,x="DLC",bins=15)
+# Cell 132
+if RUN_RAW_EDA:
+    sns.boxplot(data=df_fuzzy,x="DLC")
+# Cell 136
+if RUN_RAW_EDA:
+    sns.countplot(data=df_dos, x="Label")
+    plt.show()
+# Cell 137
+if RUN_RAW_EDA:
+    sns.countplot(data=df_dos, x="DLC", hue="Label")
+    plt.show()
+# Cell 138
+if RUN_RAW_EDA:
+    display(df_dos["Label"].value_counts(normalize=True) * 100)
+# Cell 140
+if RUN_RAW_EDA:
+    sns.histplot(df_dos["DLC"],bins=15)
+# Cell 141
+if RUN_RAW_EDA:
+    display(df_dos["DLC"].value_counts())
+# Cell 142
+if RUN_RAW_EDA:
+    sns.boxplot(data=df_dos, x="DLC")
+    plt.show()
+# Cell 145
+if RUN_RAW_EDA:
+    sns.countplot(data=df_rpm, x="Label")
+    plt.show()
+# Cell 146
+if RUN_RAW_EDA:
+    sns.countplot(data=df_rpm, x="DLC", hue="Label")
+    plt.show()
+# Cell 147
+if RUN_RAW_EDA:
+    display(df_rpm["Label"].value_counts(normalize=True) * 100)
+# Cell 149
+if RUN_RAW_EDA:
+    sns.histplot(data=df_rpm, x="DLC", bins=15)
+    plt.show()
+# Cell 150
+if RUN_RAW_EDA:
+    sns.boxplot(data=df_rpm, x="DLC")
+    plt.show()
+# Cell 153
+if RUN_RAW_EDA:
+    sns.countplot(data=df_gear, x="Label")
+    plt.show()
+# Cell 154
+if RUN_RAW_EDA:
+    sns.countplot(data=df_gear, x="DLC", hue="Label")
+    plt.show()
+# Cell 155
+if RUN_RAW_EDA:
+    display(df_gear["Label"].value_counts(normalize=True) * 100)
+# Cell 157
+if RUN_RAW_EDA:
+    sns.histplot(data=df_gear, x="DLC", bins=15)
+    plt.show()
+# Cell 158
+if RUN_RAW_EDA:
+    sns.boxplot(data=df_gear, x="DLC")
+    plt.show()
+# Cell 161
+if RUN_RAW_EDA:
+    sns.heatmap(
+        df_fuzzy[["DLC"] + byte_columns].corr(),
+        annot=True,
+        cmap="coolwarm"
+    )
+    plt.show()
+# Cell 164
+if RUN_RAW_EDA:
+    sns.heatmap(df_dos[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
+    plt.show()
+# Cell 167
+if RUN_RAW_EDA:
+    sns.heatmap(df_rpm[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
+    plt.show()
+# Cell 170
+if RUN_RAW_EDA:
+    sns.heatmap(df_gear[["DLC"] + byte_columns].corr(), annot=True, cmap="coolwarm")
+    plt.show()
+# Cell 173
+if RUN_RAW_EDA:
+    comp= df_fuzzy.groupby("Label")[byte_columns].mean().T
+    comp.columns.name = "Label"
+
+    display(comp)
+# Cell 175
+if RUN_RAW_EDA:
+    comp= df_dos.groupby("Label")[byte_columns].mean().T
+    comp.columns.name = "Label"
+
+    display(comp)
+# Cell 177
+if RUN_RAW_EDA:
+    comp= df_rpm.groupby("Label")[byte_columns].mean().T
+    comp.columns.name = "Label"
+
+    display(comp)
+# Cell 179
+if RUN_RAW_EDA:
+    comp= df_gear.groupby("Label")[byte_columns].mean().T
+    comp.columns.name = "Label"
+
+    display(comp)
+# Cell 181
+if RUN_RAW_EDA:
+    folder = RUN / "cleaned"
+    os.makedirs(folder, exist_ok=True)
+
+    datasets = {
+        "normal": df,
+        "fuzzy": df_fuzzy,
+        "dos": df_dos,
+        "rpm": df_rpm,
+        "gear": df_gear
+    }
+
+    for name, data in datasets.items():
+        assert data["Label"].isin(["R", "T"]).all(), f"Check Label in {name}"
+
+        for position, column in enumerate(byte_columns):
+            assert data[column].notna().eq(data["DLC"] > position).all(), (
+                f"Check {column} and DLC in {name}"
+            )
+
+        data.to_parquet(f"{folder}/{name}.parquet", index=False)
+        print(f"Saved {name}.parquet | {len(data):,} rows")
```

The executed and final notebooks have the same stage code as the integrated notebook. Use the following cell cross-reference for the diffs above: `integrated → executed → final`.

6→7→7, 7→8→8, 8→9→9, 11→12→12, 12→13→13, 13→14→14, 14→15→15, 15→16→16, 16→17→17, 17→18→18, 19→20→20, 20→21→21, 21→22→22, 22→23→23, 23→24→24, 24→25→25, 25→26→26, 26→27→27, 28→29→29, 29→30→30, 30→31→31, 31→32→32, 32→33→33, 33→34→34, 34→35→35, 35→36→36, 36→37→37, 38→39→39, 39→40→40, 40→41→41, 41→42→42, 43→44→44, 44→45→45, 45→46→46, 46→47→47, 49→50→50, 51→52→52, 52→53→53, 53→54→54, 54→55→55, 55→56→56, 57→58→58, 58→59→59, 59→60→60, 61→62→62, 62→63→63, 63→64→64, 64→65→65, 66→67→67, 67→68→68, 68→69→69, 69→70→70, 70→71→71, 72→73→73, 73→74→74, 74→75→75, 75→76→76, 76→77→77, 77→78→78, 78→79→79, 79→80→80, 80→81→81, 81→82→82, 82→83→83, 83→84→84, 84→85→85, 85→86→86, 86→87→87, 87→88→88, 88→89→89, 89→90→90, 90→91→91, 91→92→92, 93→94→94, 94→95→95, 95→96→96, 96→97→97, 97→98→98, 98→99→99, 100→101→101, 101→102→102, 102→103→103, 103→104→104, 104→105→105, 105→106→106, 107→108→108, 109→110→110, 110→111→111, 111→112→112, 112→113→113, 113→114→114, 115→116→116, 116→117→117, 117→118→118, 118→119→119, 119→120→120, 120→121→121, 121→122→122, 122→123→123, 123→124→124, 126→127→127, 127→128→128, 128→129→129, 130→131→131, 131→132→132, 132→133→133, 136→137→137, 137→138→138, 138→139→139, 140→141→141, 141→142→142, 142→143→143, 145→146→146, 146→147→147, 147→148→148, 149→150→150, 150→151→151, 153→154→154, 154→155→155, 155→156→156, 157→158→158, 158→159→159, 161→162→162, 164→165→165, 167→168→168, 170→171→171, 173→174→174, 175→176→176, 177→178→178, 179→180→180, 181→182→182

## Person 2 — Preprocessing (1).ipynb

### Individual copy
EXACT MATCH (all code cells in order).

### Unified source archive
EXACT MATCH (all code cells in order).

### Integrated notebook
MODIFIED

```diff
replace: source [1, 3] → target [185, 187]
--- original
+++ integrated
@@ -1,15 +1,21 @@
-# Cell 1
+# Cell 185
+# Release large raw tables before loading the cleaned export.
+for variable in ('df', 'df_fuzzy', 'df_dos', 'df_rpm', 'df_gear',
+                 'datasets', 'data', 'shifted', 'byte_count', 'valid', 'invalid'):
+    globals().pop(variable, None)
+gc.collect()
+CLEANED = RUN / 'cleaned' if RUN_RAW_EDA else ARTIFACTS / 'cleaned'
 import pandas as pd
 from sklearn.model_selection import train_test_split
 from sklearn.preprocessing import MinMaxScaler
 import joblib
 import zipfile
-# Cell 3
-normal = pd.read_parquet('normal.parquet')
-dos = pd.read_parquet('dos.parquet')
-fuzzy = pd.read_parquet('fuzzy.parquet')
-gear = pd.read_parquet('gear.parquet')
-rpm = pd.read_parquet('rpm.parquet')
+# Cell 187
+normal = pd.read_parquet(CLEANED / 'normal.parquet')
+dos = pd.read_parquet(CLEANED / 'dos.parquet')
+fuzzy = pd.read_parquet(CLEANED / 'fuzzy.parquet')
+gear = pd.read_parquet(CLEANED / 'gear.parquet')
+rpm = pd.read_parquet(CLEANED / 'rpm.parquet')
 
 files = {
     'normal': normal,
replace: source [14] → target [198]
--- original
+++ integrated
@@ -1,4 +1,4 @@
-# Cell 14
+# Cell 198
 # Save all datasets in one ZIP file
 with zipfile.ZipFile('CAN_Bus_Preprocessed_Data.zip', 'w') as zipf:
 
@@ -20,8 +20,9 @@
         filename = f'{name}_test_scaled.parquet'
         test_df.to_parquet(filename, index=False)
         zipf.write(filename)
+print('Archive saved in', RUN)
 
-
-# Download ZIP
-from google.colab import files
-files.download('CAN_Bus_Preprocessed_Data.zip')
+# The temporal stage starts from files, so release the plain feature copies.
+del X_files, x_train, x_val, x_train_scaled, x_val_scaled
+del x_scaled_files, train_df, val_df, test_df, X
+gc.collect()
replace: source [20] → target [204]
--- original
+++ integrated
@@ -1,4 +1,4 @@
-# Cell 20
+# Cell 204
 # Save all datasets in one ZIP file
 with zipfile.ZipFile('CAN_Bus_Preprocessed_Data_Time_Features.zip', 'w') as zipf:
 
@@ -24,8 +24,4 @@
     # Save Scaler
     joblib.dump(scaler1, 'scaler_time.pkl')
     zipf.write('scaler_time.pkl')
-
-# Download ZIP
-from google.colab import files
-files.download('CAN_Bus_Preprocessed_Data_Time_Features.zip')
-
+print('Archive saved in', RUN)
```

The executed and final notebooks have the same stage code as the integrated notebook. Use the following cell cross-reference for the diffs above: `integrated → executed → final`.

185→186→186, 187→188→188, 189→190→190, 190→191→191, 192→193→193, 193→194→194, 195→196→196, 196→197→197, 197→198→198, 198→199→199, 200→201→201, 201→202→202, 202→203→203, 203→204→204, 204→205→205

## Person 3 — Autoencoder_Baseline_time.ipynb

### Individual copy
EXACT MATCH (all code cells in order).

### Unified source archive
MODIFIED

```diff
replace: source [5] → target [207]
--- original
+++ unified archive
@@ -1,4 +1,6 @@
-# Cell 5
+# Cell 207
+# both versions should hold the same rows in the same order,
+# otherwise comparing them on the shared features is not fair
 same_train = np.allclose(x_train["baseline"], x_train["time"][:, :10])
 same_val = np.allclose(x_val["baseline"], x_val["time"][:, :10])
 print("Same rows in train:", same_train)
```

### Integrated notebook
MODIFIED

```diff
replace: source [2, 4, 5] → target [207, 209, 210]
--- original
+++ integrated
@@ -1,4 +1,11 @@
-# Cell 2
+# Cell 207
+# Release full preprocessing tables before model inference.
+for variable in ('normal', 'dos', 'fuzzy', 'gear', 'rpm', 'files', 'df',
+                 'X_files', 'X_files1', 'x_train', 'x_val', 'x_train1', 'x_val1',
+                 'x_train_scaled', 'x_val_scaled', 'x_train_scaled1', 'x_val_scaled1',
+                 'x_scaled_files', 'x_scaled_files1', 'train_df', 'val_df', 'test_df', 'X'):
+    globals().pop(variable, None)
+gc.collect()
 import zipfile
 import numpy as np
 import pandas as pd
@@ -8,12 +15,12 @@
 from tensorflow.keras import layers
 
 tf.keras.utils.set_random_seed(42)
-# Cell 4
-with zipfile.ZipFile("CAN_Bus_Preprocessed_Data.zip") as z:
+# Cell 209
+with zipfile.ZipFile((RUN / "CAN_Bus_Preprocessed_Data.zip") if TRAIN_BASELINES else PLAIN_ZIP) as z:
     z.extract("train_scaled.parquet", "data")
     z.extract("validation_scaled.parquet", "data")
 
-with zipfile.ZipFile("CAN_Bus_Preprocessed_Data_Time_Features.zip") as z:
+with zipfile.ZipFile((RUN / "CAN_Bus_Preprocessed_Data_Time_Features.zip") if TRAIN_BASELINES else TIME_ZIP) as z:
     z.extract("train_scaled_time.parquet", "data")
     z.extract("validation_scaled_time.parquet", "data")
 
@@ -31,7 +38,9 @@
 
 for name in x_train:
     print(name, "train:", x_train[name].shape, "validation:", x_val[name].shape)
-# Cell 5
+# Cell 210
+# both versions should hold the same rows in the same order,
+# otherwise comparing them on the shared features is not fair
 same_train = np.allclose(x_train["baseline"], x_train["time"][:, :10])
 same_val = np.allclose(x_val["baseline"], x_val["time"][:, :10])
 print("Same rows in train:", same_train)
replace: source [9, 11] → target [214, 216]
--- original
+++ integrated
@@ -1,37 +1,53 @@
-# Cell 9
-models = {}
-histories = {}
+# Cell 214
+if TRAIN_BASELINES:
+    models = {}
+    histories = {}
 
-for name in x_train:
-    print(f"\nTraining the {name} model")
-    tf.keras.utils.set_random_seed(42)
-    model = build_model(x_train[name].shape[1])
+    for name in x_train:
+        print(f"\nTraining the {name} model")
+        tf.keras.utils.set_random_seed(42)
+        model = build_model(x_train[name].shape[1])
 
-    history = model.fit(
-        x_train[name], x_train[name],
-        validation_data=(x_val[name], x_val[name]),
-        epochs=20,
-        batch_size=256,
-        verbose=2
-    )
+        history = model.fit(
+            x_train[name], x_train[name],
+            validation_data=(x_val[name], x_val[name]),
+            epochs=20,
+            batch_size=256,
+            verbose=2
+        )
 
-    models[name] = model
-    histories[name] = history.history
-# Cell 11
-fig, axes = plt.subplots(1, 2, figsize=(13, 5))
+        models[name] = model
+        histories[name] = history.history
+else:
+    models = {
+        'baseline': keras.models.load_model(SAVED / 'baseline_autoencoder.keras', compile=False),
+        'time': keras.models.load_model(SAVED / 'time_autoencoder.keras', compile=False)
+    }
+    histories = {}
+    for name, model in models.items():
+        expected_shape = (None, x_train[name].shape[1])
+        if model.input_shape != expected_shape or model.output_shape != expected_shape:
+            raise ValueError(f'{name}: saved model shape does not match the data.')
+        print(f'Loaded saved {name} model: {model.input_shape} -> {model.output_shape}')
 
-for ax, name in zip(axes, histories):
-    ax.plot(histories[name]["loss"], label="Training Loss")
-    ax.plot(histories[name]["val_loss"], label="Validation Loss")
-    ax.set_title(f"{name} autoencoder loss ({x_train[name].shape[1]} features)")
-    ax.set_xlabel("Epoch")
-    ax.set_ylabel("MSE")
-    ax.legend()
-    ax.grid(alpha=0.3)
+# Cell 216
+if TRAIN_BASELINES:
+    fig, axes = plt.subplots(1, 2, figsize=(13, 5))
 
-plt.tight_layout()
-plt.savefig("loss_curves.png", dpi=150, bbox_inches="tight")
-plt.show()
+    for ax, name in zip(axes, histories):
+        ax.plot(histories[name]["loss"], label="Training Loss")
+        ax.plot(histories[name]["val_loss"], label="Validation Loss")
+        ax.set_title(f"{name} autoencoder loss ({x_train[name].shape[1]} features)")
+        ax.set_xlabel("Epoch")
+        ax.set_ylabel("MSE")
+        ax.legend()
+        ax.grid(alpha=0.3)
 
-for name, h in histories.items():
-    print(f"{name}: last train loss {h['loss'][-1]:.6f}, last validation loss {h['val_loss'][-1]:.6f}")
+    plt.tight_layout()
+    plt.savefig("loss_curves.png", dpi=150, bbox_inches="tight")
+    plt.show()
+
+    for name, h in histories.items():
+        print(f"{name}: last train loss {h['loss'][-1]:.6f}, last validation loss {h['val_loss'][-1]:.6f}")
+else:
+    print('Training history plot skipped because saved models were loaded.')
replace: source [20] → target [225]
--- original
+++ integrated
@@ -1,7 +1,8 @@
-# Cell 20
+# Cell 225
 for name in models:
-    models[name].save(f"{name}_autoencoder.keras")
-    pd.DataFrame(histories[name]).to_csv(f"{name}_history.csv", index_label="epoch")
+    if TRAIN_BASELINES:
+        models[name].save(f"{name}_autoencoder.keras")
+        pd.DataFrame(histories[name]).to_csv(f"{name}_history.csv", index_label="epoch")
     pd.DataFrame({"error": train_errors[name]}).to_csv(f"{name}_train_errors.csv", index=False)
     pd.DataFrame({"error": val_errors[name]}).to_csv(f"{name}_validation_errors.csv", index=False)
 
```

The executed and final notebooks have the same stage code as the integrated notebook. Use the following cell cross-reference for the diffs above: `integrated → executed → final`.

207→208→208, 209→210→210, 210→211→211, 212→213→213, 214→215→215, 216→217→217, 218→219→219, 220→221→221, 222→223→223, 223→224→224, 225→226→226

## Person 4 — 04_Tuning_Time_v2.ipynb

### Individual copy
MODIFIED

```diff
replace: source [2, 4, 6, 8] → target [3, 5, 7, 9]
--- original
+++ individual copy
@@ -1,6 +1,18 @@
-# Cell 2
-!pip install -q keras==3.15.1
-# Cell 4
+# Cell 3
+from pathlib import Path
+TRAIN_BASELINES = False
+RUN_TUNING = True
+PROJECT = Path.cwd()
+OUT = PROJECT / 'results_tuning_time_v2'
+MODEL_PATH = PROJECT / 'models/time_autoencoder.keras'
+TRAIN_PATH = PROJECT / 'data/train_scaled_time.parquet'
+VAL_PATH = PROJECT / 'data/validation_scaled_time.parquet'
+if TRAIN_BASELINES or not RUN_TUNING:
+    raise ValueError('This copy runs temporal tuning only.')
+if (OUT / 'best_ae_time_12features.keras').exists():
+    raise FileExistsError('Move the completed results to a new location before rerunning.')
+(OUT / 'plots').mkdir(parents=True, exist_ok=True)
+# Cell 5
 import os, json
 import numpy as np
 import pandas as pd
@@ -12,15 +24,28 @@
 SEED = 42
 tf.keras.utils.set_random_seed(SEED)
 
-for folder in ["models", "results/plots", "configs"]:
-    os.makedirs(folder, exist_ok=True)
-# Cell 6
-x_train = pd.read_parquet("train_scaled_time.parquet").values.astype("float32")
-x_val = pd.read_parquet("validation_scaled_time.parquet").values.astype("float32")
 
-print(x_train.shape, x_val.shape)
-# Cell 8
-baseline_model = keras.models.load_model("time_autoencoder.keras")
+# Cell 7
+FEATURE_COLUMNS = ['CAN_ID', 'DLC', *[f'Byte{i}' for i in range(8)],
+                   'time_diff', 'can_id_time_diff']
+train = pd.read_parquet(TRAIN_PATH)
+validation = pd.read_parquet(VAL_PATH)
+for name, frame in [('Training', train), ('Validation', validation)]:
+    if list(frame.columns) != FEATURE_COLUMNS:
+        raise ValueError(f'{name} feature order does not match the original pipeline.')
+x_train = train.values.astype('float32')
+x_val = validation.values.astype('float32')
+for values in (x_train, x_val):
+    if not np.isfinite(values).all():
+        raise ValueError('Inputs contain NaN or infinite values.')
+print('Training and validation shapes:', x_train.shape, x_val.shape)
+print('Features:', FEATURE_COLUMNS)
+del train, validation
+# Cell 9
+baseline_model = keras.models.load_model(MODEL_PATH)
+if baseline_model.input_shape != (None, 12) or baseline_model.output_shape != (None, 12):
+    raise ValueError("Expected a baseline with 12 input and output features.")
+print("Baseline shape:", baseline_model.input_shape, baseline_model.output_shape)
 
 def val_loss(model):
     pred = model.predict(x_val, batch_size=4096, verbose=0)
replace: source [14, 16, 18, 20, 22] → target [15, 17, 19, 21, 23]
--- original
+++ individual copy
@@ -1,11 +1,11 @@
-# Cell 14
+# Cell 15
 #E01:
 # Goal: prove our code gives the same result as the baseline
 
 model = build_model()
 h01 = model.fit(x_train, x_train,                              #  train: input = target (autoencoder)
                 validation_data=(x_val, x_val),
-                epochs=20, batch_size=256, verbose=0)
+                epochs=20, batch_size=256, verbose=2)
 loss = val_loss(model)
 
 results.append({"ID": "E01", "Architecture": "8-4-8", "LR": 0.001, "Batch": 256,
@@ -23,7 +23,7 @@
 h02 = model.fit(x_train, x_train,
                 validation_data=(x_val, x_val),
                 epochs=200, batch_size=256,
-                callbacks=[early_stop()], verbose=0)
+                callbacks=[early_stop()], verbose=2)
 loss = val_loss(model)
 epochs_run = len(h02.history["loss"])                          # how many epochs before it stopped
 
@@ -34,7 +34,7 @@
 models["E02"] = model
 histories["E02"] = h02.history
 print("E02 val_loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
-# Cell 16
+# Cell 17
 lr_results = {0.001: results[-1]["Val Loss"]}      # results[-1] = last row added = E02
 
 # Each experiment: (experiment name, learning rate to try, hypothesis)
@@ -51,7 +51,7 @@
     h = model.fit(x_train, x_train,
                   validation_data=(x_val, x_val),
                   epochs=200, batch_size=256,
-                  callbacks=[early_stop()], verbose=0)
+                  callbacks=[early_stop()], verbose=2)
     loss = val_loss(model)
     epochs_run = len(h.history["loss"])
 
@@ -69,7 +69,7 @@
 best_lr = min(lr_results, key=lr_results.get)
 print("\nAll LR results:", lr_results)
 print("Best learning rate:", best_lr)
-# Cell 18
+# Cell 19
 # Batch 256 with the best LR was already trained in Task 3, so we reuse its result
 batch_results = {256: lr_results[best_lr]}
 
@@ -86,7 +86,7 @@
     h = model.fit(x_train, x_train,
                   validation_data=(x_val, x_val),
                   epochs=200, batch_size=batch,
-                  callbacks=[early_stop()], verbose=0)
+                  callbacks=[early_stop()], verbose=2)
     loss = val_loss(model)
     epochs_run = len(h.history["loss"])
 
@@ -104,7 +104,7 @@
 best_batch = min(batch_results, key=batch_results.get)
 print("\nAll batch results:", batch_results)
 print("Best batch size:", best_batch)
-# Cell 20
+# Cell 21
 # 8-4-8 with the best LR and batch was already trained, so we reuse its result
 arch_results = {"8-4-8": batch_results[best_batch]}
 
@@ -123,7 +123,7 @@
     h = model.fit(x_train, x_train,
                   validation_data=(x_val, x_val),
                   epochs=200, batch_size=best_batch,
-                  callbacks=[early_stop()], verbose=0)
+                  callbacks=[early_stop()], verbose=2)
     loss = val_loss(model)
     epochs_run = len(h.history["loss"])
 
@@ -142,7 +142,7 @@
 best_hidden = [int(u) for u in best_arch.split("-")]  # "16-4-16" -> [16, 4, 16]
 print("\nAll layer results:", arch_results)
 print("Best layers:", best_arch)
-# Cell 22
+# Cell 23
 # Task 5b: re-check the LR on the best layers
 # The best LR was chosen on 8-4-8, so the best layers may need a different one
 lr_recheck = {best_lr: arch_results[best_arch]}
@@ -153,7 +153,7 @@
 h = model.fit(x_train, x_train,
               validation_data=(x_val, x_val),
               epochs=200, batch_size=best_batch,
-              callbacks=[early_stop()], verbose=0)
+              callbacks=[early_stop()], verbose=2)
 loss = val_loss(model)
 epochs_run = len(h.history["loss"])
 
replace: source [25, 27, 29, 31, 32, 33] → target [26, 28, 30, 32, 33, 34]
--- original
+++ individual copy
@@ -1,4 +1,4 @@
-# Cell 25
+# Cell 26
 reg_experiments = [
     ("E10", l2_small, 0.0,  "Light L2: may help generalization"),
     ("E11", l2_large, 0.0,  "Stronger L2: may underfit"),
@@ -17,7 +17,7 @@
     h = model.fit(x_train, x_train,
                   validation_data=(x_val, x_val),
                   epochs=200, batch_size=best_batch,
-                  callbacks=[early_stop()], verbose=0)
+                  callbacks=[early_stop()], verbose=2)
     loss = val_loss(model)
     epochs_run = len(h.history["loss"])
 
@@ -29,9 +29,9 @@
 
     print("Val loss:", round(loss, 6), "| before:", round(best_before_reg, 6),
           "| better?", loss < best_before_reg)
-# Cell 27
+# Cell 28
 results_df = pd.DataFrame(results)
-results_df.to_csv("results/tuning_results.csv", index=False)
+results_df.to_csv(OUT / "tuning_results.csv", index=False)
 display(results_df)
 
 # Selection rule: lowest val loss, but simplest model if within 2%
@@ -47,9 +47,9 @@
 print("Best model:", best["ID"], "| val_loss:", round(best["Val Loss"], 6))
 print("Difference:", round(baseline_loss - best["Val Loss"], 6))
 print(f"Improvement: {(baseline_loss - best['Val Loss']) / baseline_loss * 100:.1f}%")
-# Cell 29
+# Cell 30
 best_model = models[best["ID"]]
-best_model.save("models/best_ae.keras")
+best_model.save(OUT / "best_ae_time_12features.keras")
 
 best_config = {
     "experiment_id": best["ID"],
@@ -64,15 +64,22 @@
     "selection_rule": "lowest val_loss; simplest model if within 2%",
     "seed": SEED,
 }
-with open("configs/best_config.json", "w") as f:
+with open(OUT / "best_config.json", "w") as f:
     json.dump(best_config, f, indent=2)
 
 print(best_config)
 
 # Check: the saved file opens and gives the same val_loss
-reloaded = keras.models.load_model("models/best_ae.keras")
+reloaded = keras.models.load_model(OUT / "best_ae_time_12features.keras")
 print("Reloaded val_loss:", round(val_loss(reloaded), 6))
-# Cell 31
+
+if reloaded.input_shape != (None, 12) or reloaded.output_shape != (None, 12):
+    raise ValueError('The saved model does not have 12 inputs and outputs.')
+reloaded_mse = val_loss(reloaded)
+np.testing.assert_allclose(reloaded_mse, best['Val Loss'], rtol=1e-7, atol=1e-10)
+print(f'Reload verification: {reloaded.input_shape} -> {reloaded.output_shape}, MSE={reloaded_mse:.12g}')
+
+# Cell 32
 # 1) Val loss of every experiment (chosen model in red)
 colors = ["red" if exp_id == best["ID"] else "steelblue" for exp_id in results_df["ID"]]
 
@@ -83,9 +90,9 @@
 plt.title("Val loss per experiment")
 plt.gca().invert_yaxis()
 plt.legend()
-plt.savefig("results/plots/tuning_val_loss.png", dpi=150, bbox_inches="tight")
+plt.savefig(OUT / "plots/tuning_val_loss.png", dpi=150, bbox_inches="tight")
 plt.show()
-# Cell 32
+# Cell 33
 # 2) Overfitting check: train loss vs val loss of the best model
 h = histories[best["ID"]]
 
@@ -97,7 +104,7 @@
 plt.ylabel("Loss (log scale)")
 plt.title(f"Overfitting check: {best['ID']}")
 plt.legend()
-plt.savefig("results/plots/overfitting_check.png", dpi=150, bbox_inches="tight")
+plt.savefig(OUT / "plots/overfitting_check.png", dpi=150, bbox_inches="tight")
 plt.show()
 
 # Loss on the full train set vs val set (final weights)
@@ -113,7 +120,7 @@
     print("No overfitting: train and val loss are close")
 else:
     print("Possible overfitting: val loss is much higher than train loss")
-# Cell 33
+# Cell 34
 # 3) Val loss curve: baseline (E01) vs best model
 plt.figure(figsize=(8, 5))
 plt.plot(histories["E01"]["val_loss"], label="Baseline (E01)")
@@ -123,5 +130,5 @@
 plt.ylabel("Val loss (log scale)")
 plt.title("Baseline vs Tuned training")
 plt.legend()
-plt.savefig("results/plots/baseline_vs_tuned_loss.png", dpi=150, bbox_inches="tight")
+plt.savefig(OUT / "plots/baseline_vs_tuned_loss.png", dpi=150, bbox_inches="tight")
 plt.show()
```

### Unified source archive
EXACT MATCH (all code cells in order).

### Integrated notebook
MODIFIED

```diff
replace: source [2] → target [229]
--- original
+++ integrated
@@ -1,2 +1,2 @@
-# Cell 2
-!pip install -q keras==3.15.1
+# Cell 229
+# Keras is pinned in requirements-executed.txt.
replace: source [6, 8] → target [233, 235]
--- original
+++ integrated
@@ -1,10 +1,10 @@
-# Cell 6
-x_train = pd.read_parquet("train_scaled_time.parquet").values.astype("float32")
-x_val = pd.read_parquet("validation_scaled_time.parquet").values.astype("float32")
+# Cell 233
+x_train = pd.read_parquet((RUN / "train_scaled_time.parquet") if TRAIN_BASELINES else (SCALED_TIME / "train_scaled_time.parquet")).values.astype("float32")
+x_val = pd.read_parquet((RUN / "validation_scaled_time.parquet") if TRAIN_BASELINES else (SCALED_TIME / "validation_scaled_time.parquet")).values.astype("float32")
 
 print(x_train.shape, x_val.shape)
-# Cell 8
-baseline_model = keras.models.load_model("time_autoencoder.keras")
+# Cell 235
+baseline_model = keras.models.load_model((RUN if TRAIN_BASELINES else SAVED) / "time_autoencoder.keras", compile=False)
 
 def val_loss(model):
     pred = model.predict(x_val, batch_size=4096, verbose=0)
replace: source [14, 16, 18, 20, 22] → target [241, 243, 245, 247, 249]
--- original
+++ integrated
@@ -1,125 +1,162 @@
-# Cell 14
-#E01:
-# Goal: prove our code gives the same result as the baseline
+# Cell 241
+if RUN_TUNING:
+    #E01:
+    # Goal: prove our code gives the same result as the baseline
 
-model = build_model()
-h01 = model.fit(x_train, x_train,                              #  train: input = target (autoencoder)
-                validation_data=(x_val, x_val),
-                epochs=20, batch_size=256, verbose=0)
-loss = val_loss(model)
+    model = build_model()
+    h01 = model.fit(x_train, x_train,                              #  train: input = target (autoencoder)
+                    validation_data=(x_val, x_val),
+                    epochs=20, batch_size=256, verbose=0)
+    loss = val_loss(model)
 
-results.append({"ID": "E01", "Architecture": "8-4-8", "LR": 0.001, "Batch": 256,
-                "Regularization": "None", "Val Loss": loss, "Epochs": 20,
-                "Params": model.count_params(), "Notes": "Reproduce baseline"})
-models["E01"] = model
-histories["E01"] = h01.history
-print("E01 val_loss:", round(loss, 6))
+    results.append({"ID": "E01", "Architecture": "8-4-8", "LR": 0.001, "Batch": 256,
+                    "Regularization": "None", "Val Loss": loss, "Epochs": 20,
+                    "Params": model.count_params(), "Notes": "Reproduce baseline"})
+    models["E01"] = model
+    histories["E01"] = h01.history
+    print("E01 val_loss:", round(loss, 6))
 
 
-#E02:
-# Hypothesis: val_loss was still falling at epoch 20, so longer training will lower it
+    #E02:
+    # Hypothesis: val_loss was still falling at epoch 20, so longer training will lower it
 
-model = build_model()
-h02 = model.fit(x_train, x_train,
-                validation_data=(x_val, x_val),
-                epochs=200, batch_size=256,
-                callbacks=[early_stop()], verbose=0)
-loss = val_loss(model)
-epochs_run = len(h02.history["loss"])                          # how many epochs before it stopped
+    model = build_model()
+    h02 = model.fit(x_train, x_train,
+                    validation_data=(x_val, x_val),
+                    epochs=200, batch_size=256,
+                    callbacks=[early_stop()], verbose=0)
+    loss = val_loss(model)
+    epochs_run = len(h02.history["loss"])                          # how many epochs before it stopped
 
-# 4) record the result
-results.append({"ID": "E02", "Architecture": "8-4-8", "LR": 0.001, "Batch": 256,
-                "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
-                "Params": model.count_params(), "Notes": "val_loss still falling at epoch 20 -> train longer"})
-models["E02"] = model
-histories["E02"] = h02.history
-print("E02 val_loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
-# Cell 16
-lr_results = {0.001: results[-1]["Val Loss"]}      # results[-1] = last row added = E02
+    # 4) record the result
+    results.append({"ID": "E02", "Architecture": "8-4-8", "LR": 0.001, "Batch": 256,
+                    "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
+                    "Params": model.count_params(), "Notes": "val_loss still falling at epoch 20 -> train longer"})
+    models["E02"] = model
+    histories["E02"] = h02.history
+    print("E02 val_loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
+else:
+    print('Tuning experiments and export skipped. No model was retrained.')
+# Cell 243
+if RUN_TUNING:
+    lr_results = {0.001: results[-1]["Val Loss"]}      # results[-1] = last row added = E02
 
-# Each experiment: (experiment name, learning rate to try, hypothesis)
-lr_experiments = [
-    ("E03",  0.003,  "Bigger LR: may learn faster"),
-    ("E04",  0.0003, "Smaller LR: slower but smoother learning"),
-    ("E04b", 0.002,  "Between 0.001 and 0.003: faster but still stable"),
-]
+    # Each experiment: (experiment name, learning rate to try, hypothesis)
+    lr_experiments = [
+        ("E03",  0.003,  "Bigger LR: may learn faster"),
+        ("E04",  0.0003, "Smaller LR: slower but smoother learning"),
+        ("E04b", 0.002,  "Between 0.001 and 0.003: faster but still stable"),
+    ]
 
-for exp_id, lr, note in lr_experiments:
-    print(f"\nTraining {exp_id} with learning rate = {lr}")
+    for exp_id, lr, note in lr_experiments:
+        print(f"\nTraining {exp_id} with learning rate = {lr}")
 
-    model = build_model(lr=lr)
-    h = model.fit(x_train, x_train,
-                  validation_data=(x_val, x_val),
-                  epochs=200, batch_size=256,
-                  callbacks=[early_stop()], verbose=0)
-    loss = val_loss(model)
-    epochs_run = len(h.history["loss"])
+        model = build_model(lr=lr)
+        h = model.fit(x_train, x_train,
+                      validation_data=(x_val, x_val),
+                      epochs=200, batch_size=256,
+                      callbacks=[early_stop()], verbose=0)
+        loss = val_loss(model)
+        epochs_run = len(h.history["loss"])
 
-    #record the result
-    results.append({"ID": exp_id, "Architecture": "8-4-8", "LR": lr, "Batch": 256,
-                    "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
-                    "Params": model.count_params(), "Notes": note})
-    models[exp_id] = model
-    histories[exp_id] = h.history
-    lr_results[lr] = loss                                      # keep for choosing the best LR
+        #record the result
+        results.append({"ID": exp_id, "Architecture": "8-4-8", "LR": lr, "Batch": 256,
+                        "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
+                        "Params": model.count_params(), "Notes": note})
+        models[exp_id] = model
+        histories[exp_id] = h.history
+        lr_results[lr] = loss                                      # keep for choosing the best LR
 
-    print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
+        print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
 
-# Choose the learning rate with the lowest val loss -> used in all next tasks
-best_lr = min(lr_results, key=lr_results.get)
-print("\nAll LR results:", lr_results)
-print("Best learning rate:", best_lr)
-# Cell 18
-# Batch 256 with the best LR was already trained in Task 3, so we reuse its result
-batch_results = {256: lr_results[best_lr]}
+    # Choose the learning rate with the lowest val loss -> used in all next tasks
+    best_lr = min(lr_results, key=lr_results.get)
+    print("\nAll LR results:", lr_results)
+    print("Best learning rate:", best_lr)
+# Cell 245
+if RUN_TUNING:
+    # Batch 256 with the best LR was already trained in Task 3, so we reuse its result
+    batch_results = {256: lr_results[best_lr]}
 
-# Each experiment: (experiment name, batch size to try, hypothesis)
-batch_experiments = [
-    ("E05", 128, "Smaller batch: more weight updates per epoch, may learn finer details"),
-    ("E06", 512, "Bigger batch: faster and smoother training, maybe similar loss"),
-]
+    # Each experiment: (experiment name, batch size to try, hypothesis)
+    batch_experiments = [
+        ("E05", 128, "Smaller batch: more weight updates per epoch, may learn finer details"),
+        ("E06", 512, "Bigger batch: faster and smoother training, maybe similar loss"),
+    ]
 
-for exp_id, batch, note in batch_experiments:
-    print(f"\nTraining {exp_id} with batch size = {batch}")
+    for exp_id, batch, note in batch_experiments:
+        print(f"\nTraining {exp_id} with batch size = {batch}")
 
-    model = build_model(lr=best_lr)
-    h = model.fit(x_train, x_train,
-                  validation_data=(x_val, x_val),
-                  epochs=200, batch_size=batch,
-                  callbacks=[early_stop()], verbose=0)
-    loss = val_loss(model)
-    epochs_run = len(h.history["loss"])
+        model = build_model(lr=best_lr)
+        h = model.fit(x_train, x_train,
+                      validation_data=(x_val, x_val),
+                      epochs=200, batch_size=batch,
+                      callbacks=[early_stop()], verbose=0)
+        loss = val_loss(model)
+        epochs_run = len(h.history["loss"])
 
-    # record the result
-    results.append({"ID": exp_id, "Architecture": "8-4-8", "LR": best_lr, "Batch": batch,
-                    "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
-                    "Params": model.count_params(), "Notes": note})
-    models[exp_id] = model
-    histories[exp_id] = h.history
-    batch_results[batch] = loss                         # keep for choosing the best batch
+        # record the result
+        results.append({"ID": exp_id, "Architecture": "8-4-8", "LR": best_lr, "Batch": batch,
+                        "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
+                        "Params": model.count_params(), "Notes": note})
+        models[exp_id] = model
+        histories[exp_id] = h.history
+        batch_results[batch] = loss                         # keep for choosing the best batch
 
-    print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
+        print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
 
-# Choose the batch size with the lowest val loss -> used in all next tasks
-best_batch = min(batch_results, key=batch_results.get)
-print("\nAll batch results:", batch_results)
-print("Best batch size:", best_batch)
-# Cell 20
-# 8-4-8 with the best LR and batch was already trained, so we reuse its result
-arch_results = {"8-4-8": batch_results[best_batch]}
+    # Choose the batch size with the lowest val loss -> used in all next tasks
+    best_batch = min(batch_results, key=batch_results.get)
+    print("\nAll batch results:", batch_results)
+    print("Best batch size:", best_batch)
+# Cell 247
+if RUN_TUNING:
+    # 8-4-8 with the best LR and batch was already trained, so we reuse its result
+    arch_results = {"8-4-8": batch_results[best_batch]}
 
-# Each experiment: (experiment name, hidden layers, hypothesis)
-arch_experiments = [
-    ("E07", [6, 4, 6],         "Narrower: 8-4-8 may be bigger than needed"),
-    ("E08", [16, 4, 16],       "Wider: more units may capture more patterns"),
-    ("E09", [16, 8, 4, 8, 16], "Deeper: more gradual compression may help"),
-]
+    # Each experiment: (experiment name, hidden layers, hypothesis)
+    arch_experiments = [
+        ("E07", [6, 4, 6],         "Narrower: 8-4-8 may be bigger than needed"),
+        ("E08", [16, 4, 16],       "Wider: more units may capture more patterns"),
+        ("E09", [16, 8, 4, 8, 16], "Deeper: more gradual compression may help"),
+    ]
 
-for exp_id, hidden, note in arch_experiments:
-    name = "-".join(map(str, hidden))                  # [16, 4, 16] -> "16-4-16"
-    print(f"\nTraining {exp_id} with layers = {name}")
+    for exp_id, hidden, note in arch_experiments:
+        name = "-".join(map(str, hidden))                  # [16, 4, 16] -> "16-4-16"
+        print(f"\nTraining {exp_id} with layers = {name}")
 
-    model = build_model(hidden=hidden, lr=best_lr)     # only the layers change
+        model = build_model(hidden=hidden, lr=best_lr)     # only the layers change
+        h = model.fit(x_train, x_train,
+                      validation_data=(x_val, x_val),
+                      epochs=200, batch_size=best_batch,
+                      callbacks=[early_stop()], verbose=0)
+        loss = val_loss(model)
+        epochs_run = len(h.history["loss"])
+
+        # record the result
+        results.append({"ID": exp_id, "Architecture": name, "LR": best_lr, "Batch": best_batch,
+                        "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
+                        "Params": model.count_params(), "Notes": note})
+        models[exp_id] = model
+        histories[exp_id] = h.history
+        arch_results[name] = loss                          # keep for choosing the best layers
+
+        print("Val loss:", round(loss, 6), "| params:", model.count_params(), "| stopped after", epochs_run, "epochs")
+
+    # Choose the layers with the lowest val loss -> used in the next task
+    best_arch = min(arch_results, key=arch_results.get)
+    best_hidden = [int(u) for u in best_arch.split("-")]  # "16-4-16" -> [16, 4, 16]
+    print("\nAll layer results:", arch_results)
+    print("Best layers:", best_arch)
+# Cell 249
+if RUN_TUNING:
+    # Task 5b: re-check the LR on the best layers
+    # The best LR was chosen on 8-4-8, so the best layers may need a different one
+    lr_recheck = {best_lr: arch_results[best_arch]}
+    second_lr = sorted(lr_results, key=lr_results.get)[1]     # 2nd best LR from Task 3
+
+    print(f"Training E09b with layers = {best_arch} and learning rate = {second_lr}")
+    model = build_model(hidden=best_hidden, lr=second_lr)
     h = model.fit(x_train, x_train,
                   validation_data=(x_val, x_val),
                   epochs=200, batch_size=best_batch,
@@ -127,47 +164,17 @@
     loss = val_loss(model)
     epochs_run = len(h.history["loss"])
 
-    # record the result
-    results.append({"ID": exp_id, "Architecture": name, "LR": best_lr, "Batch": best_batch,
+    results.append({"ID": "E09b", "Architecture": best_arch, "LR": second_lr, "Batch": best_batch,
                     "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
-                    "Params": model.count_params(), "Notes": note})
-    models[exp_id] = model
-    histories[exp_id] = h.history
-    arch_results[name] = loss                          # keep for choosing the best layers
+                    "Params": model.count_params(), "Notes": "Re-check LR on the best layers"})
+    models["E09b"] = model
+    histories["E09b"] = h.history
+    lr_recheck[second_lr] = loss
 
-    print("Val loss:", round(loss, 6), "| params:", model.count_params(), "| stopped after", epochs_run, "epochs")
+    print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
 
-# Choose the layers with the lowest val loss -> used in the next task
-best_arch = min(arch_results, key=arch_results.get)
-best_hidden = [int(u) for u in best_arch.split("-")]  # "16-4-16" -> [16, 4, 16]
-print("\nAll layer results:", arch_results)
-print("Best layers:", best_arch)
-# Cell 22
-# Task 5b: re-check the LR on the best layers
-# The best LR was chosen on 8-4-8, so the best layers may need a different one
-lr_recheck = {best_lr: arch_results[best_arch]}
-second_lr = sorted(lr_results, key=lr_results.get)[1]     # 2nd best LR from Task 3
-
-print(f"Training E09b with layers = {best_arch} and learning rate = {second_lr}")
-model = build_model(hidden=best_hidden, lr=second_lr)
-h = model.fit(x_train, x_train,
-              validation_data=(x_val, x_val),
-              epochs=200, batch_size=best_batch,
-              callbacks=[early_stop()], verbose=0)
-loss = val_loss(model)
-epochs_run = len(h.history["loss"])
-
-results.append({"ID": "E09b", "Architecture": best_arch, "LR": second_lr, "Batch": best_batch,
-                "Regularization": "EarlyStopping", "Val Loss": loss, "Epochs": epochs_run,
-                "Params": model.count_params(), "Notes": "Re-check LR on the best layers"})
-models["E09b"] = model
-histories["E09b"] = h.history
-lr_recheck[second_lr] = loss
-
-print("Val loss:", round(loss, 6), "| stopped after", epochs_run, "epochs")
-
-# Keep the better LR for the best layers -> used in Task 6
-best_lr = min(lr_recheck, key=lr_recheck.get)
-best_before_reg = lr_recheck[best_lr]
-print("\nLR results on", best_arch, ":", lr_recheck)
-print("Best learning rate:", best_lr)
+    # Keep the better LR for the best layers -> used in Task 6
+    best_lr = min(lr_recheck, key=lr_recheck.get)
+    best_before_reg = lr_recheck[best_lr]
+    print("\nLR results on", best_arch, ":", lr_recheck)
+    print("Best learning rate:", best_lr)
replace: source [25, 27, 29, 31, 32, 33] → target [252, 254, 256, 258, 259, 260]
--- original
+++ integrated
@@ -1,127 +1,133 @@
-# Cell 25
-reg_experiments = [
-    ("E10", l2_small, 0.0,  "Light L2: may help generalization"),
-    ("E11", l2_large, 0.0,  "Stronger L2: may underfit"),
-    ("E12", 0.0,      0.1,  "Dropout 0.1: small network, probably no help"),
-    ("E13", 0.0,      0.05, "Smaller dropout: may hurt less"),
-]
+# Cell 252
+if RUN_TUNING:
+    reg_experiments = [
+        ("E10", l2_small, 0.0,  "Light L2: may help generalization"),
+        ("E11", l2_large, 0.0,  "Stronger L2: may underfit"),
+        ("E12", 0.0,      0.1,  "Dropout 0.1: small network, probably no help"),
+        ("E13", 0.0,      0.05, "Smaller dropout: may hurt less"),
+    ]
 
-for exp_id, l2, dropout, note in reg_experiments:
-    if l2 > 0:
-        reg_name = f"ES + L2 {np.format_float_positional(l2)}"
+    for exp_id, l2, dropout, note in reg_experiments:
+        if l2 > 0:
+            reg_name = f"ES + L2 {np.format_float_positional(l2)}"
+        else:
+            reg_name = f"ES + Dropout {dropout}"
+        print(f"\nTraining {exp_id} with {reg_name}")
+
+        model = build_model(hidden=best_hidden, lr=best_lr, l2=l2, dropout=dropout)
+        h = model.fit(x_train, x_train,
+                      validation_data=(x_val, x_val),
+                      epochs=200, batch_size=best_batch,
+                      callbacks=[early_stop()], verbose=0)
+        loss = val_loss(model)
+        epochs_run = len(h.history["loss"])
+
+        results.append({"ID": exp_id, "Architecture": best_arch, "LR": best_lr, "Batch": best_batch,
+                        "Regularization": reg_name, "Val Loss": loss, "Epochs": epochs_run,
+                        "Params": model.count_params(), "Notes": note})
+        models[exp_id] = model
+        histories[exp_id] = h.history
+
+        print("Val loss:", round(loss, 6), "| before:", round(best_before_reg, 6),
+              "| better?", loss < best_before_reg)
+# Cell 254
+if RUN_TUNING:
+    results_df = pd.DataFrame(results)
+    results_df.to_csv("results/tuning_results.csv", index=False)
+    display(results_df)
+
+    # Selection rule: lowest val loss, but simplest model if within 2%
+    lowest = results_df["Val Loss"].min()
+    close = results_df[results_df["Val Loss"] <= lowest * 1.02]
+    best = close.sort_values(["Params", "Val Loss"]).iloc[0]
+
+    print("Lowest val_loss:", round(lowest, 6))
+    print("Within 2%:", list(close["ID"]))
+    print("Chosen (simplest):", best["ID"], "| params:", best["Params"])
+
+    print("\nBaseline val_loss:", round(baseline_loss, 6))
+    print("Best model:", best["ID"], "| val_loss:", round(best["Val Loss"], 6))
+    print("Difference:", round(baseline_loss - best["Val Loss"], 6))
+    print(f"Improvement: {(baseline_loss - best['Val Loss']) / baseline_loss * 100:.1f}%")
+# Cell 256
+if RUN_TUNING:
+    best_model = models[best["ID"]]
+    best_model.save("models/best_ae.keras")
+
+    best_config = {
+        "experiment_id": best["ID"],
+        "architecture": best["Architecture"],
+        "learning_rate": float(best["LR"]),
+        "batch_size": int(best["Batch"]),
+        "regularization": best["Regularization"],
+        "early_stopping": {"monitor": "val_loss", "patience": 10, "min_delta": 0.00001},
+        "epochs_run": int(best["Epochs"]),
+        "val_loss": float(best["Val Loss"]),
+        "baseline_val_loss": baseline_loss,
+        "selection_rule": "lowest val_loss; simplest model if within 2%",
+        "seed": SEED,
+    }
+    with open("configs/best_config.json", "w") as f:
+        json.dump(best_config, f, indent=2)
+
+    print(best_config)
+
+    # Check: the saved file opens and gives the same val_loss
+    reloaded = keras.models.load_model("models/best_ae.keras")
+    print("Reloaded val_loss:", round(val_loss(reloaded), 6))
+# Cell 258
+if RUN_TUNING:
+    # 1) Val loss of every experiment (chosen model in red)
+    colors = ["red" if exp_id == best["ID"] else "steelblue" for exp_id in results_df["ID"]]
+
+    plt.figure(figsize=(9, 5))
+    plt.barh(results_df["ID"], results_df["Val Loss"], color=colors)
+    plt.axvline(baseline_loss, color="gray", linestyle="--", label="Baseline")
+    plt.xlabel("Validation loss (lower is better)")
+    plt.title("Val loss per experiment")
+    plt.gca().invert_yaxis()
+    plt.legend()
+    plt.savefig("results/plots/tuning_val_loss.png", dpi=150, bbox_inches="tight")
+    plt.show()
+# Cell 259
+if RUN_TUNING:
+    # 2) Overfitting check: train loss vs val loss of the best model
+    h = histories[best["ID"]]
+
+    plt.figure(figsize=(8, 5))
+    plt.plot(h["loss"], label="Train loss")
+    plt.plot(h["val_loss"], label="Val loss")
+    plt.yscale("log")
+    plt.xlabel("Epoch")
+    plt.ylabel("Loss (log scale)")
+    plt.title(f"Overfitting check: {best['ID']}")
+    plt.legend()
+    plt.savefig("results/plots/overfitting_check.png", dpi=150, bbox_inches="tight")
+    plt.show()
+
+    # Loss on the full train set vs val set (final weights)
+    train_loss = float(np.mean((x_train - best_model.predict(x_train, batch_size=4096, verbose=0)) ** 2))
+    val_loss_best = val_loss(best_model)
+    gap = (val_loss_best - train_loss) / train_loss * 100
+
+    print("Train loss:", round(train_loss, 6))
+    print("Val loss:  ", round(val_loss_best, 6))
+    print(f"Gap: {gap:.1f}%")
+
+    if gap < 5:
+        print("No overfitting: train and val loss are close")
     else:
-        reg_name = f"ES + Dropout {dropout}"
-    print(f"\nTraining {exp_id} with {reg_name}")
-
-    model = build_model(hidden=best_hidden, lr=best_lr, l2=l2, dropout=dropout)
-    h = model.fit(x_train, x_train,
-                  validation_data=(x_val, x_val),
-                  epochs=200, batch_size=best_batch,
-                  callbacks=[early_stop()], verbose=0)
-    loss = val_loss(model)
-    epochs_run = len(h.history["loss"])
-
-    results.append({"ID": exp_id, "Architecture": best_arch, "LR": best_lr, "Batch": best_batch,
-                    "Regularization": reg_name, "Val Loss": loss, "Epochs": epochs_run,
-                    "Params": model.count_params(), "Notes": note})
-    models[exp_id] = model
-    histories[exp_id] = h.history
-
-    print("Val loss:", round(loss, 6), "| before:", round(best_before_reg, 6),
-          "| better?", loss < best_before_reg)
-# Cell 27
-results_df = pd.DataFrame(results)
-results_df.to_csv("results/tuning_results.csv", index=False)
-display(results_df)
-
-# Selection rule: lowest val loss, but simplest model if within 2%
-lowest = results_df["Val Loss"].min()
-close = results_df[results_df["Val Loss"] <= lowest * 1.02]
-best = close.sort_values(["Params", "Val Loss"]).iloc[0]
-
-print("Lowest val_loss:", round(lowest, 6))
-print("Within 2%:", list(close["ID"]))
-print("Chosen (simplest):", best["ID"], "| params:", best["Params"])
-
-print("\nBaseline val_loss:", round(baseline_loss, 6))
-print("Best model:", best["ID"], "| val_loss:", round(best["Val Loss"], 6))
-print("Difference:", round(baseline_loss - best["Val Loss"], 6))
-print(f"Improvement: {(baseline_loss - best['Val Loss']) / baseline_loss * 100:.1f}%")
-# Cell 29
-best_model = models[best["ID"]]
-best_model.save("models/best_ae.keras")
-
-best_config = {
-    "experiment_id": best["ID"],
-    "architecture": best["Architecture"],
-    "learning_rate": float(best["LR"]),
-    "batch_size": int(best["Batch"]),
-    "regularization": best["Regularization"],
-    "early_stopping": {"monitor": "val_loss", "patience": 10, "min_delta": 0.00001},
-    "epochs_run": int(best["Epochs"]),
-    "val_loss": float(best["Val Loss"]),
-    "baseline_val_loss": baseline_loss,
-    "selection_rule": "lowest val_loss; simplest model if within 2%",
-    "seed": SEED,
-}
-with open("configs/best_config.json", "w") as f:
-    json.dump(best_config, f, indent=2)
-
-print(best_config)
-
-# Check: the saved file opens and gives the same val_loss
-reloaded = keras.models.load_model("models/best_ae.keras")
-print("Reloaded val_loss:", round(val_loss(reloaded), 6))
-# Cell 31
-# 1) Val loss of every experiment (chosen model in red)
-colors = ["red" if exp_id == best["ID"] else "steelblue" for exp_id in results_df["ID"]]
-
-plt.figure(figsize=(9, 5))
-plt.barh(results_df["ID"], results_df["Val Loss"], color=colors)
-plt.axvline(baseline_loss, color="gray", linestyle="--", label="Baseline")
-plt.xlabel("Validation loss (lower is better)")
-plt.title("Val loss per experiment")
-plt.gca().invert_yaxis()
-plt.legend()
-plt.savefig("results/plots/tuning_val_loss.png", dpi=150, bbox_inches="tight")
-plt.show()
-# Cell 32
-# 2) Overfitting check: train loss vs val loss of the best model
-h = histories[best["ID"]]
-
-plt.figure(figsize=(8, 5))
-plt.plot(h["loss"], label="Train loss")
-plt.plot(h["val_loss"], label="Val loss")
-plt.yscale("log")
-plt.xlabel("Epoch")
-plt.ylabel("Loss (log scale)")
-plt.title(f"Overfitting check: {best['ID']}")
-plt.legend()
-plt.savefig("results/plots/overfitting_check.png", dpi=150, bbox_inches="tight")
-plt.show()
-
-# Loss on the full train set vs val set (final weights)
-train_loss = float(np.mean((x_train - best_model.predict(x_train, batch_size=4096, verbose=0)) ** 2))
-val_loss_best = val_loss(best_model)
-gap = (val_loss_best - train_loss) / train_loss * 100
-
-print("Train loss:", round(train_loss, 6))
-print("Val loss:  ", round(val_loss_best, 6))
-print(f"Gap: {gap:.1f}%")
-
-if gap < 5:
-    print("No overfitting: train and val loss are close")
-else:
-    print("Possible overfitting: val loss is much higher than train loss")
-# Cell 33
-# 3) Val loss curve: baseline (E01) vs best model
-plt.figure(figsize=(8, 5))
-plt.plot(histories["E01"]["val_loss"], label="Baseline (E01)")
-plt.plot(histories[best["ID"]]["val_loss"], label=f"Best ({best['ID']})")
-plt.yscale("log")
-plt.xlabel("Epoch")
-plt.ylabel("Val loss (log scale)")
-plt.title("Baseline vs Tuned training")
-plt.legend()
-plt.savefig("results/plots/baseline_vs_tuned_loss.png", dpi=150, bbox_inches="tight")
-plt.show()
+        print("Possible overfitting: val loss is much higher than train loss")
+# Cell 260
+if RUN_TUNING:
+    # 3) Val loss curve: baseline (E01) vs best model
+    plt.figure(figsize=(8, 5))
+    plt.plot(histories["E01"]["val_loss"], label="Baseline (E01)")
+    plt.plot(histories[best["ID"]]["val_loss"], label=f"Best ({best['ID']})")
+    plt.yscale("log")
+    plt.xlabel("Epoch")
+    plt.ylabel("Val loss (log scale)")
+    plt.title("Baseline vs Tuned training")
+    plt.legend()
+    plt.savefig("results/plots/baseline_vs_tuned_loss.png", dpi=150, bbox_inches="tight")
+    plt.show()
```

The executed and final notebooks have the same stage code as the integrated notebook. Use the following cell cross-reference for the diffs above: `integrated → executed → final`.

229→232→232, 231→234→234, 233→236→236, 235→238→238, 237→240→240, 239→242→242, 241→244→244, 243→246→246, 245→248→248, 247→250→250, 249→252→252, 251→254→254, 252→255→255, 254→257→257, 256→259→259, 258→261→261, 259→262→262, 260→263→263

## Person 5 — 05_Anomaly_Detection_Evaluation_Simple.ipynb

### Individual copy
MODIFIED

```diff
replace: source [5] → target [5]
--- original
+++ individual copy
@@ -1,5 +1,5 @@
 # Cell 5
-MODEL = Path('models/time_autoencoder.keras')
+MODEL = Path('results_tuning_time_v2/best_ae_time_12features.keras')
 VALIDATION = Path('data/validation_scaled_time.parquet')
 TESTS = {
     attack: Path(f'data/{attack}_test_scaled_time.parquet')
replace: source [15] → target [15]
--- original
+++ individual copy
@@ -1,5 +1,5 @@
 # Cell 15
-OUT = Path('results_simple')
+OUT = Path('results_tuned')
 FIG = OUT / 'figures'
 FIG.mkdir(parents=True, exist_ok=True)
 plt.figure(figsize=(8,4.8))
replace: source [19] → target [19]
--- original
+++ individual copy
@@ -14,7 +14,7 @@
 metrics_table.to_csv(OUT / 'metrics_per_attack.csv', index_label='attack_type')
 
 report = [
-    '# CarShield AI — Temporal Baseline Evaluation', '',
+    '# CarShield AI — Tuned Temporal Model Evaluation', '',
     f'Validation P99 threshold: {threshold:.12f}', '',
     '## Recall by attack', '',
 ]
@@ -29,3 +29,23 @@
 ])
 (OUT / 'evaluation_report.md').write_text(chr(10).join(report) + chr(10), encoding='utf-8')
 print(f'Results saved to {OUT}/')
+
+baseline = json.loads(Path('results_simple/evaluation_metrics.json').read_text())
+comparison = []
+metric_names = ['accuracy', 'precision', 'recall', 'f1', 'fpr', 'roc_auc', 'average_precision']
+for attack, tuned in metrics.items():
+    previous = baseline['metrics'][attack]
+    if any(tuned[key] != previous[key] for key in ('n', 'normal', 'attack')):
+        raise ValueError(f'{attack}: baseline and tuned sample counts differ.')
+    for metric in metric_names:
+        comparison.append({
+            'evaluation': attack,
+            'metric': metric,
+            'baseline': previous[metric],
+            'tuned': tuned[metric],
+            'change': tuned[metric] - previous[metric]
+        })
+comparison = pd.DataFrame(comparison)
+comparison.to_csv(OUT / 'baseline_vs_tuned.csv', index=False)
+display(comparison[comparison['evaluation'] == 'pooled'].round(6))
+
```

### Unified source archive
EXACT MATCH (all code cells in order).

### Integrated notebook
MODIFIED

```diff
replace: source [5] → target [267]
--- original
+++ integrated
@@ -1,8 +1,8 @@
-# Cell 5
-MODEL = Path('models/time_autoencoder.keras')
-VALIDATION = Path('data/validation_scaled_time.parquet')
+# Cell 267
+MODEL = TUNED_MODEL
+VALIDATION = SCALED_TIME / 'validation_scaled_time.parquet'
 TESTS = {
-    attack: Path(f'data/{attack}_test_scaled_time.parquet')
+    attack: SCALED_TIME / f'{attack}_test_scaled_time.parquet'
     for attack in ('dos', 'fuzzy', 'gear', 'rpm')
 }
 FEATURE_COLUMNS = [
replace: source [15] → target [277]
--- original
+++ integrated
@@ -1,5 +1,5 @@
-# Cell 15
-OUT = Path('results_simple')
+# Cell 277
+OUT = Path('results_tuned')
 FIG = OUT / 'figures'
 FIG.mkdir(parents=True, exist_ok=True)
 plt.figure(figsize=(8,4.8))
replace: source [19] → target [281]
--- original
+++ integrated
@@ -1,4 +1,4 @@
-# Cell 19
+# Cell 281
 threshold_info = {
     'model_filename': MODEL.name,
     'validation_filename': VALIDATION.name,
@@ -14,7 +14,7 @@
 metrics_table.to_csv(OUT / 'metrics_per_attack.csv', index_label='attack_type')
 
 report = [
-    '# CarShield AI — Temporal Baseline Evaluation', '',
+    '# CarShield AI — Tuned Temporal Model Evaluation', '',
     f'Validation P99 threshold: {threshold:.12f}', '',
     '## Recall by attack', '',
 ]
@@ -29,3 +29,23 @@
 ])
 (OUT / 'evaluation_report.md').write_text(chr(10).join(report) + chr(10), encoding='utf-8')
 print(f'Results saved to {OUT}/')
+
+baseline = json.loads((PROJECT / 'results/baseline/evaluation_metrics.json').read_text())
+comparison = []
+metric_names = ['accuracy', 'precision', 'recall', 'f1', 'fpr', 'roc_auc', 'average_precision']
+for attack, tuned in metrics.items():
+    previous = baseline['metrics'][attack]
+    if any(tuned[key] != previous[key] for key in ('n', 'normal', 'attack')):
+        raise ValueError(f'{attack}: baseline and tuned sample counts differ.')
+    for metric in metric_names:
+        comparison.append({
+            'evaluation': attack,
+            'metric': metric,
+            'baseline': previous[metric],
+            'tuned': tuned[metric],
+            'change': tuned[metric] - previous[metric]
+        })
+comparison = pd.DataFrame(comparison)
+comparison.to_csv(OUT / 'baseline_vs_tuned.csv', index=False)
+display(comparison[comparison['evaluation'] == 'pooled'].round(6))
+
```

The executed and final notebooks have the same stage code as the integrated notebook. Use the following cell cross-reference for the diffs above: `integrated → executed → final`.

265→270→270, 267→272→272, 269→274→274, 271→276→276, 273→278→278, 275→280→280, 277→282→282, 278→283→283, 279→284→284, 281→286→286
