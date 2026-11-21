# Colab and GitHub release check

| Check | Status |
|---|---|
| Paths and required inputs | Project-relative inputs, optional external data directory, explicit preflight and missing-file list. |
| Linux dependencies | All workflow requirements resolved to binary distributions for Linux x86_64 / Python 3.12. This is dependency resolution, not installation in a hosted Colab session. |
| Local workflow | Revised notebook ran from raw EDA to inference with saved weights. Evaluation JSON and comparison CSV matched the published results byte for byte. |
| Model and team artifacts | Released E09, reference results and source notebook copies are preserved. Training and tuning are documented and guarded by off-by-default flags. |
| Memory | Releases completed feature arrays and diagnostics between stages. Full EDA/preprocessing still loads large tables and may require a high-memory runtime. |
| Hosted acceptance test | Pending. Follow the numbered test in README.md and save outputs before the runtime disconnects. |
| GitHub contents | Integrated notebook, original notebook copies, inference script, both requirements files, models and measured results are included. Raw data, Parquet files, archives, virtual environments, run folders and caches are ignored. |
