# scripts/

- **stamp-version.mjs** — writes `public/version.json` (version + build hash) before each build. Powers the auto-update banner.
- **reference-path.local.txt** — absolute path to Gabs's external HVAC references folder (ASHRAE/ACCA/SMACNA/AHRI/ICC PDFs). Git-ignored: the path contains a username and is machine-specific. Standards study-guide articles are written by reading these PDFs for accurate section numbers, then re-explained in original wording — the PDFs themselves are never copied into the repo.
