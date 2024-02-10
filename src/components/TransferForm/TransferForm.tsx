import { useChain } from "@cosmos-kit/react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "grommet";
import { NetworkSelector } from "./NetworkSelector/NetworkSelector";
import { AssetSelector } from "./AssetSelector/AssetSelector";

import { ChannelSelector } from "./ChannelSelector/ChannelSelector";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  channel: yup.string().required(),
  asset: yup.object().shape({
    denom: yup.string().required(),
    amount: yup.string().required(),
  }),
});

export const TransferForm = () => {
  const { isWalletConnected } = useChain("cosmoshub");
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
    formState: { isValid, errors },
  } = formMethods;

  const onSubmit: SubmitHandler<TransferInputs> = (data) =>
    console.log("submit data", data);

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
            {isWalletConnected ? (
              <Button
                label="Transfer"
                fill="horizontal"
                primary
                disabled={!isValid}
              />
            ) : (
              "Connect" // <ConnectButton />
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};
