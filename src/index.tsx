import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import "@interchain-ui/react/styles";
import { Grommet, grommet } from "grommet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChainProvider
      chains={chains} // supported chains
      assetLists={assets} // supported asset lists
      wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]} // supported wallets
      // walletConnectOptions={} // required if `wallets` contains mobile wallets
    >
      <Grommet theme={grommet} themeMode="dark" full>
        <App />
      </Grommet>
    </ChainProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
