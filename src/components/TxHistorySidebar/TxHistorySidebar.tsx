import { Anchor, Box, Button, Notification, Sidebar, Text } from "grommet";
import { useTxHistory } from "../TxHistoryProvider/TxHistoryProvider";
import { Trash } from "grommet-icons";
import { formatDenomName } from "../../utils/formatDenomName";

export const TxHistorySidebar = () => {
  const { txHistory, clearHistory } = useTxHistory();

  return (
    <Sidebar
      responsive
      border="left"
      width="medium"
      height={{ min: "100%" }}
      header={
        <Box direction="row" justify="between" align="center">
          <Text>Transfer History</Text>
          <Button
            icon={<Trash size="small" />}
            hoverIndicator
            onClick={clearHistory}
          />
        </Box>
      }
    >
      <Box gap="small">
        {txHistory.map(
          ({
            source,
            destination,
            txHash,
            code,
            timestamp,
            asset,
            channel,
          }) => (
            <Notification
              title={code === 0 ? "successful" : "error"}
              status={code === 0 ? "unknown" : "warning"}
              key={txHash}
              message={
                <Box gap="xsmall">
                  <Box>
                    <Text size="small">
                      From: {source.address.slice(0, 6)}..
                      {source.address.slice(-5)}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="small">
                      To: {destination.address.slice(0, 6)}..
                      {destination.address.slice(-5)}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="small">via {channel}</Text>
                  </Box>
                  <Text size="small">
                    {asset.amount} {formatDenomName(asset.denom)}
                  </Text>
                  <Anchor
                    size="small"
                    href={`https://ping.pub/${source.chainName}/tx/${txHash}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    label={`TX: ${txHash.slice(0, 4)}..${txHash.slice(-4)}`}
                  />
                  <Text size="small">
                    {new Date(timestamp).toLocaleTimeString()}{" "}
                    {new Date(timestamp).toLocaleDateString()}
                  </Text>
                </Box>
              }
            />
          )
        )}
      </Box>
    </Sidebar>
  );
};
