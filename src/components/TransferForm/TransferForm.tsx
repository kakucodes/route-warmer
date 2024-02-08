import { useChain } from "@cosmos-kit/react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "grommet";
import { NetworkSelector } from "./NetworkSelector/NetworkSelector";
import { AssetSelector } from "./AssetSelector/AssetSelector";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { ChannelSelector } from "./ChannelSelector/ChannelSelector";

export const TransferForm = () => {
  const { isWalletConnected } = useChain("cosmoshub");
  return (
    <Card background="dark-2">
      <CardHeader
        pad={{ horizontal: "medium", vertical: "small" }}
        border="bottom"
      >
        Transfer Token
      </CardHeader>
      <CardBody pad={{ horizontal: "medium", vertical: "small" }} gap="small">
        <NetworkSelector />
        <ChannelSelector />
        <AssetSelector />
      </CardBody>
      <CardFooter
        background="dark-1"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        {isWalletConnected ? (
          <Button label="Transfer" fill="horizontal" primary />
        ) : (
          <ConnectButton />
        )}
      </CardFooter>
    </Card>
  );
};
