# Humanitix EchoJS

This repository contains the hosted script file which is injected via the Humanitix Echo Google Tag Manager community template.

The script:
- Listens to analytics events emitted by Humanitix embedded widgets via `window.postMessage(...)`
- Checks to see if Google Tag Manager and/or Meta Pixel is installed on the parent frame
- Depending on which installations are available, echos events from Humanitix embedded widgets to the relevant analytics installations available

## Build

`npm run build`

This creates an uglified version of `main.js` as `dist/echo.js`

## Test

`npm run test`