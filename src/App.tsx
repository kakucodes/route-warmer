import { Box, Page, PageContent } from "grommet";
import { AppHeader } from "./components/AppHeader/AppHeader";

import { TransferForm } from "./components/TransferForm/TransferForm";
import { TxHistorySidebar } from "./components/TxHistorySidebar/TxHistorySidebar";
import { useFetchChains } from "./hooks/useFetchChains";

function App() {
  const { data: chains } = useFetchChains(false);

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
            {chains ? <TransferForm chains={chains} /> : <Box>Loading...</Box>}
          </Box>
        </Box>
        <TxHistorySidebar />
      </PageContent>
    </Page>
  );
}

export default App;
