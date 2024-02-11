[![Unit Test](https://github.com/kakucodes/route-warmer/actions/workflows/unitTest.yml/badge.svg)](https://github.com/kakucodes/route-warmer/actions/workflows/unitTest.yml)

# Kaku's Route Warmer

Frontend to enable easy discovery and initiation of new ibc routes via custom IBC token transfers.

The channel list will auto-populate with all of the shared channels between the selected chains and the assets dropdown fill generate itself with all of the liquid contents of the selected wallet (cw20 support coming soon).

## Features

- Allows sending of arbitrary token transfers.
- Automatically populates channels with the live shared channels between the selected chains.
- Automatically displays the entire contents of the connected wallet's balances and refetches the data every 30s to ensure accuracy.
- Caches chain channels for improved performance.
- Tracks TX history to improve workflow.
- Previews token amounts with both 6 and 18 exponents to ensure accurate transfer amounts.

## Roadmap

While this is a simple proof of concept there are numerous next steps to be tackled given more time/effort.

- Allowing urls to control the initial state of the form. This would make the app more composable.
- Setting up keybindings to focus on the different input fields so to improve efficiency of data entry.
- Validating/QAing use of cold wallets, evm signing, non-memo transfer chains.
- Integration testing and more exhaustive unit testing.

## Installation & Dev Server

Install route-warmer with `yarn` and spin up the dev server with `yarn start`

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Deployment

Manual deployment shouldn't be necessary as when `main` is updated it will automatically deploy to github pages. If it was needed to be done manually you can simply run:

```bash
  yarn deploy
```
