# Scientific verification

- Reference: the team's original 12-feature E09 Keras model and the frozen threshold, 0.017968580495137495.
- Compared 1,326 genuine preprocessed rows across normal validation, DoS, Fuzzy, Gear and RPM. The closest sample was 5.1662e-6 MSE units from the threshold. Within each recording, the test includes up to 16 rows nearest the threshold from the 8,192-row candidate sample.
- Maximum absolute reconstruction difference: 1.1920928955078125e-7. Mean absolute reconstruction difference: 8.392958667368452e-9.
- Maximum absolute MSE difference: 1.396589747321153e-8. Classification agreement: 100%; zero disagreements.
- Gates: 5e-7 for elementwise reconstruction, 1e-7 for MSE, and zero disagreements. Float32 roundoff near a sigmoid output of one is about 1.19e-7; the reconstruction gate permits only a few units at that scale. The MSE gate remains more than 50 times smaller than the closest tested classification margin. The tests do not imply agreement on every possible input, especially directly at the threshold.
- Replays preserve consecutive Parquet row positions and labels. Example rows are not chronological replays. The parity references are excluded from the Pages artifact, and demo predictions are always computed at runtime.

## Browser and provenance checks

- The data audit compared all 689 public replay/example entries to their original Parquet row, feature order, values, and ground truth. Each attack replay contains normal and injected rows.
- Playwright with installed macOS Chrome verified 1920×1080, 1440×900, 1280×800 and 390×844. It exercised replay playback, pause, speed, step, reset, switching recordings and modes, chart rendering, matching counts, manual input, and return navigation from the demo to Home. It checked model load failure and verified the JavaScript port against the Keras fixtures in Chrome.
- The static server was tested on loopback at the same /GhostShield/ base as Pages. The offline launcher independently started an available port and served the demo route.
- Safari WebDriver could not open a session because Allow Remote Automation is disabled. The original cinematic presentation was unavailable; its 14 scenes and Scene 12 handoff were not tested. Public Pages deployment was not tested before review.

The dashboard reads the official 16,569,475-row results and displays the exact threshold from the E09 asset. It does not report a confidence percentage, vehicle ID, bitrate, or fabricated timing. The placeholder presentation route and its navigation links have been removed pending delivery of the original files.
