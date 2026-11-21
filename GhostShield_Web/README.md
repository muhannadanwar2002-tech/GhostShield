# GhostShield browser demo

An Arabic, RTL research demo of the trained E09 temporal autoencoder. It scores preprocessed messages in the browser, without a Python inference backend, an API key, a CDN, or an active vehicle connection.

## Run offline on macOS

From this directory run `./run_demo.sh` using Python 3. The launcher prints an available loopback URL. Open that URL in a browser and stop the server with Ctrl+C. You can pass a specific port, for example `./run_demo.sh 8766`. The entire runtime is in `site/`.

## What gets served

- Home: `./`
- Demo: `./demo/`
- Presentation integration: `./presentation/`
- Weights, compact samples, and offline evaluation metrics: `./assets/`

The final cinematic presentation was not available in the inspected workspace. The presentation route states this and links to the real demo in a new tab. When the original presentation is available, place its existing assets under `site/presentation/` and add a `<a href="../demo/" target="_blank" rel="noopener">Try GhostShield</a>` in the protection scene. A new tab lets the original presentation remain open at the same scene. This behavior still needs testing with the actual presentation.

## Inference and data

The exporter loads the original `GhostShield/models/best_ae_time_12features.keras`, verifies its six Dense layers, exports the actual kernels and biases, and reads the exact threshold from `frozen_threshold.json`. The dependency-free browser runner evaluates the same dense/ReLU/sigmoid graph, with float32 accumulation, and calculates the MSE before comparing against the threshold. This is a faithful port of the trained network rather than a TensorFlow.js Layers export.

The 12 inputs are CAN_ID, DLC, Byte0–Byte7, time_diff, and can_id_time_diff, in original scaled feature order. No raw CAN input or extra scaling is supported. R and T are original normal/injected labels; the normal validation file contains only normal messages. Browser demo data never contains precomputed predictions, and the UI computes decisions and counts at runtime.

Each replay spans 128 consecutive Parquet rows. Attack replays start up to 32 rows before the first injected message. In example mode, deterministic sampling (seed 42, 8,192 rows per recording) supplies up to three examples per available true-label/prediction combination. These intentionally stratified examples are not representative of recording prevalence or model performance. See `docs/provenance.json` for exact filenames, zero-based row offsets, and strata.

The previously measured test results are displayed separately from demo counts. E09 had F1 35.87% and FPR 20.72%, versus 50.97% and 6.95% for the temporal baseline. The reduction in normal-validation reconstruction MSE does not establish better attack detection.

## Verify and regenerate

- `node tests/parity.mjs` runs without dependencies against 1,326 Python fixtures. The reference fixtures are outside the public site artifact.
- Run `scripts/export.py /path/to/temporal/parquet_directory` with the original project's TensorFlow/Keras, NumPy, pandas, and PyArrow environment to regenerate assets. The model files are read-only.
- `tests/browser.mjs` is a Playwright test for a locally served site. Set `DEMO_BASE` to the complete URL, including its trailing slash; optionally set `CHROME_PATH` to the installed Chrome executable. Use `PLAYWRIGHT_MODULE` if Playwright is installed outside this folder.
- See `docs/verification.md` for observed validation and `docs/instructor_demo_ar.md` for the presenter script.

## GitHub Pages publication

The workflow packages only `GhostShield_Web/site`, and deploys from `main`. Repository owner: open **Settings → Pages → Build and deployment → Source → GitHub Actions**. After review and approved merge, run **GhostShield Pages** from Actions if it did not trigger automatically. Check the URL emitted by the deployment job and verify that the demo route loads the model and samples there. No public deployment has been verified during branch review.
