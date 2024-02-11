import { useChain } from "@cosmos-kit/react";
import { Box, Text, Image } from "grommet";

export const WalletConnectionInfo = () => {
  const { username, wallet, address } = useChain("cosmoshub");

  return (
    !!(wallet && username) && (
      <Box direction="row" gap="small" alignContent="center">
        {wallet?.logo && (
          <Image
            alignSelf="center"
            height="25"
            width="25"
            src={
              typeof wallet.logo === "string"
                ? wallet.logo
                : wallet.logo.major || wallet.logo.minor
            }
          />
        )}
        <Box gap="xsmall" alignContent="center" justify="center">
          {username && (
            <Text size="small" textAlign="center">
              {username}
            </Text>
          )}
          <Text size="small" textAlign="center">
            {address?.slice(0, 7)}..{address?.slice(-5)}
          </Text>
        </Box>
      </Box>
    )
  );
};
