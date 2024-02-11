import { useChains } from "@cosmos-kit/react";
import { Box, Button, Text, Image, Spinner } from "grommet";
import { Connect, Logout } from "grommet-icons";

import { ChainInfo, useFetchChains } from "../../hooks/useFetchChains";

export const ConnectButton = ({ chains }: { chains: ChainInfo[] }) => {
  const allChains = chains
    ?.flatMap(({ chain_name }) => (chain_name ? [chain_name] : []))
    // having errors on a handfull of chains here. i suspect it's because of naming discrepancies
    // TODO: no time to dig in now, but should be looked at later
    .filter(
      (name) =>
        !["lum", "dymension", "secret", "ununifi", "xpla"].includes(name)
    );

  const walletChains = useChains(allChains || [], true);
  const connected = Object.values(chains).every(
    (chain) => walletChains.isWalletConnected
  );

  if (!allChains) return <Spinner />;

  const { connect, disconnect, address, username, wallet, isWalletConnecting } =
    walletChains.cosmoshub;

  return connected ? (
    <Box direction="row" gap="xsmall" alignContent="center">
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
        {username && <Text textAlign="center">{username}</Text>}
        <Text size="small" textAlign="center">
          {address?.slice(0, 7)}..{address?.slice(-5)}
        </Text>
      </Box>
      <Button
        hoverIndicator
        onClick={() => disconnect()}
        icon={<Logout size="small" />}
        size="small"
      />
    </Box>
  ) : (
    <Button
      fill="horizontal"
      onClick={connect}
      size="small"
      hoverIndicator
      primary
      {...(isWalletConnecting
        ? { disabled: true, icon: <Spinner size="small" /> }
        : { label: "Connect", icon: <Connect size="small" /> })}
    />
  );
};
