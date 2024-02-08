import React from "react";
import { Box, Page, PageContent, Sidebar, Text } from "grommet";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { useScreenSize } from "./hooks/useScreenSize";
import { ConnectButton } from "./components/ConnectButton/ConnectButton";
import { useChain } from "@cosmos-kit/react";
import { NetworkSelector } from "./components/TransferForm/NetworkSelector/NetworkSelector";
import { AssetSelector } from "./components/TransferForm/AssetSelector/AssetSelector";
import { TransferForm } from "./components/TransferForm/TransferForm";

function App() {
  return (
    <Page fill>
      <AppHeader />
      <PageContent fill direction="row">
        <Box fill justify="center" alignContent="center" pad="medium">
          <TransferForm />
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
