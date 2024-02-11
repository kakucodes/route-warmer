import { Box, Page, PageContent, Sidebar, Text } from "grommet";
import { AppHeader } from "./components/AppHeader/AppHeader";

import { TransferForm } from "./components/TransferForm/TransferForm";
import { TxHistorySidebar } from "./components/TxHistorySidebar/TxHistorySidebar";

function App() {
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
        <TxHistorySidebar />
      </PageContent>
    </Page>
  );
}

export default App;
