import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import "@interchain-ui/react/styles";
import { Grommet, grommet } from "grommet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GasPrice } from "@cosmjs/stargate";
import { TxHistoryProvider } from "./components/TxHistoryProvider/TxHistoryProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChainProvider
        chains={[...chains]} // supported chains
        assetLists={assets} // supported asset lists
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]} // supported wallets
        signerOptions={{
          signingStargate: (chain) => ({
            gasPrice: GasPrice.fromString("0.025uosmo"),
          }),
        }}
      >
        <Grommet theme={grommet} themeMode="dark" full>
          <TxHistoryProvider>{children}</TxHistoryProvider>
        </Grommet>
      </ChainProvider>
    </QueryClientProvider>
  );
};
