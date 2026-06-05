# ETF Screener Dashboard

A static ETF discovery interface that combines a filter dashboard with direct links to dedicated ETF websites.

## Features

- Filter ETFs by search term, sector/theme, issuer, maximum expense ratio, minimum 1-year return, minimum AUM, dividend yield, and low-cost status.
- Sort matching ETFs by AUM, 1-year return, expense ratio, dividend yield, or ticker.
- Ask for a screening request in plain language, such as `Find low-cost Vanguard dividend ETFs with yield above 2%`.
- Require user confirmation before opening an external ETF research page for internet/latest/current-data requests.
- Open official ETF pages and issuer-specific search redirects directly from each result card.
- Use quick links for common ETF provider search and fund-finder pages.

## Ask and internet research

Use the **Ask screener** box to describe what you want. The app parses common terms like issuer names, sectors, dividend/yield, low-cost, expense ratio limits, return thresholds, AUM thresholds, and sorting requests, then applies the matching local filters.

If the request includes words like `latest`, `current`, `internet`, `web`, or `online`, the app asks whether you want to connect to the internet before opening an external ETF.com search in a new tab. If you decline, the app keeps the local sample-data screening results visible.

## Deploy locally in a browser

Use the included launcher to serve the static site and open your default browser automatically:

```bash
python3 serve.py
```

Then use the browser tab at `http://127.0.0.1:8000`. Stop the local server with `Ctrl+C`.

If you are in a headless environment or want to open the URL yourself, run:

```bash
python3 serve.py --no-browser
```

You can also serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

## Publish the repository

This repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`. After this branch is merged to `main`, GitHub Actions will:

1. run `node --check script.js`;
2. run `node --test test/smoke.test.js`;
3. package `index.html`, `styles.css`, and `script.js` as the static site artifact; and
4. deploy the artifact to GitHub Pages.

You can also publish manually from GitHub by opening **Actions → Publish ETF Screener to GitHub Pages → Run workflow**.

## Test

Run the local smoke tests with Node:

```bash
node --test test/smoke.test.js
```

## Data note

The included ETF data is sample interface data for demonstration only. Confirm current expense ratios, returns, yields, AUM, and risk information on each ETF issuer website before making investment decisions.
