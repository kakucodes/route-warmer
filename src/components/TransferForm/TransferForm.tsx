import { useChain, useChainWallet, useWallet } from "@cosmos-kit/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Text,
} from "grommet";
import { NetworkSelector } from "./NetworkSelector/NetworkSelector";
import { AssetSelector } from "./AssetSelector/AssetSelector";

import { ChannelSelector } from "./ChannelSelector/ChannelSelector";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FEES, ibc } from "osmojs";
import { Coin } from "osmojs/dist/codegen/cosmos/base/v1beta1/coin";

const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl;

export type TransferInputs = {
  sourceChain: { chainName: string; chainId: string };
  destinationChain: { chainName: string; chainId: string };
  channel: string;
  asset: {
    denom: string;
    amount: string;
  };
};

const schema = yup.object().shape({
  sourceChain: yup.object().shape({
    chainName: yup.string().required(),
    chainId: yup.string().required(),
  }),
  destinationChain: yup.object().shape({
    chainName: yup.string().required(),
    chainId: yup.string().required(),
  }),
  channel: yup
    .string()
    .matches(/channel-\d+/, "Channel must follow the format channel-<number>")
    .required(),
  asset: yup.object().shape({
    denom: yup.string().required(),
    amount: yup.string().required(),
  }),
});

export const TransferForm = () => {
  const formMethods = useForm<TransferInputs>({
    defaultValues: {
      sourceChain: { chainName: "migaloo", chainId: "migaloo-1" },
      destinationChain: { chainName: "stargaze", chainId: "stargaze-1" },
    },
    resolver: yupResolver(schema),
    reValidateMode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting, isDirty },
    watch,
    setValue,
  } = formMethods;

  const {
    isWalletConnected,
    getSigningStargateClient,
    address: sourceChainUserAddress,
  } = useChainWallet(watch("sourceChain.chainName"), "keplr-extension");

  const { address: destinationChainUserAddress } = useChainWallet(
    watch("destinationChain.chainName"),
    "keplr-extension"
  );

  console.log({
    isWalletConnected,
    userAddress: sourceChainUserAddress,
    destinationChainUserAddress,
  });

  const onSubmit: SubmitHandler<TransferInputs> = async ({
    sourceChain,
    destinationChain,
    asset,
    channel,
  }) => {
    if (sourceChainUserAddress && destinationChainUserAddress) {
      const client = await getSigningStargateClient();

      const currentHeight = await client.getHeight();
      const currentBlock = await client.getBlock(currentHeight);

      const broadcast = await client.signAndBroadcast(
        sourceChainUserAddress,
        [
          transfer({
            sender: sourceChainUserAddress,
            sourcePort: "transfer",
            sourceChannel: channel,
            token: asset,
            receiver: destinationChainUserAddress,
            timeoutHeight: {
              revisionNumber: BigInt(currentBlock.header.version.block),
              revisionHeight: BigInt(currentHeight) + BigInt(1000),
            },
            timeoutTimestamp: BigInt(0),
            memo: "",
          }),
        ],
        "auto",
        "Transfer courtesy of Kaku's Route Warmer"
      );

      if (broadcast.code === 0) {
        setValue("asset", { denom: "", amount: "0" }, { shouldValidate: true });
        setValue("channel", "", { shouldValidate: true });
      }

      console.log({ broadcast });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card background="dark-2">
          <CardHeader
            pad={{ horizontal: "medium", vertical: "small" }}
            border="bottom"
          >
            Transfer Token
          </CardHeader>
          <CardBody
            pad={{ horizontal: "medium", vertical: "small" }}
            gap="small"
          >
            <NetworkSelector />
            <ChannelSelector />
            <AssetSelector />
          </CardBody>
          <CardFooter
            background="dark-1"
            pad={{ horizontal: "medium", vertical: "small" }}
          >
            {!!Object.keys(errors).length && isDirty && (
              <Box>
                <Text size="small" color="pink">
                  Errors: {JSON.stringify(errors)}
                </Text>
              </Box>
            )}
            {isWalletConnected ? (
              <Button
                label={isSubmitting ? "Broadcasting TX" : "Transfer"}
                fill="horizontal"
                primary
                disabled={!isValid || isSubmitting}
                icon={isSubmitting ? <Spinner size="xsmall" /> : undefined}
                type="submit"
              />
            ) : (
              "Please Connect Wallet" // <ConnectButton />
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};
