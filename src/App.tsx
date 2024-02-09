import React, { useEffect } from "react";
import { Box, Page, PageContent, Sidebar, Text } from "grommet";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { useScreenSize } from "./hooks/useScreenSize";
import { ConnectButton } from "./components/ConnectButton/ConnectButton";
import { useChain } from "@cosmos-kit/react";
import { NetworkSelector } from "./components/TransferForm/NetworkSelector/NetworkSelector";
import { AssetSelector } from "./components/TransferForm/AssetSelector/AssetSelector";
import { TransferForm } from "./components/TransferForm/TransferForm";
import { skipFetcher } from "./utils/skipFetcher";
import { fetchTransferChannels } from "./utils/fetchChannels/fetchChannels";
import { fetchFullTokenBalances } from "./utils/fetchBalances/fetchBalances";

function App() {
  useEffect(() => {
    (async () => {
      // skipFetcher
      //   .path("/v1/info/chains")
      //   .method("get")
      //   .create()({ include_testnets: true })
      //   .then(({ data }) =>
      //     (data.chains || []).filter(
      //       (chain) => !!chain.chain_name?.includes("testnet")
      //     )
      //   )
      //   .then(console.log);
      // fetchTransferChannels("migaloo", "stargaze").then((transChans) =>
      //   console.log("matching transfer channels", transChans)
      // );
      fetchFullTokenBalances(
        "migaloo",
        "migaloo-1",
        "migaloo1ewdttrv2ph7762egx4n2309h3m9r4z9pxsg48n"
      ).then(console.log);
    })();
  }, []);

  return (
    <Page fill>
      <AppHeader />
      <PageContent fill direction="row">
        <Box
          fill
          justify="center"
          align="center"
          alignContent="center"
          pad="medium"
        >
          <Box width={{ max: "750px" }}>
            <TransferForm />
          </Box>
        </Box>
        <Sidebar
          responsive
          border="left"
          width="small"
          height={{ min: "100%" }}
          header={<Text>Transfer History</Text>}
        >
          {["Tx example", "Tx example33", "Tx example3", "Tx example15"].map(
            (text) => (
              <Text key={text}>{text}</Text>
            )
          )}
        </Sidebar>
      </PageContent>
    </Page>
  );
}

export default App;
