import { useChains, useManager, useWalletClient } from "@cosmos-kit/react";
import { Box, Button, Text, Image, Spinner } from "grommet";
import { Connect, Logout } from "grommet-icons";
import { get } from "http";
import { useEffect, useState } from "react";

export const ConnectButton = () => {
  const chains = useChains(
    ["cosmoshub", "osmosis", "stargaze", "juno", "akash", "neutron", "noble"],
    true
  );
  const connected = Object.values(chains).every(
    (chain) => chain.isWalletConnected
  );

  const {
    connect,
    openView,
    disconnect,
    address,
    username,
    wallet,
    isWalletConnecting,
  } = chains.cosmoshub;

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
