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
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChainInfo } from "../../hooks/useFetchChains";
import { TransferInputs, transferFormSchema } from "./formTypes";
import { useEnableChains } from "./useEnableChains";
import { useBroadcastTransfer } from "./useBroadcastTransfer";

export const TransferForm = ({ chains }: { chains: ChainInfo[] }) => {
  const formMethods = useForm<TransferInputs>({
    defaultValues: {
      sourceChain: { chainName: "migaloo", chainId: "migaloo-1" },
      destinationChain: { chainName: "stargaze", chainId: "stargaze-1" },
    },
    resolver: yupResolver(transferFormSchema),
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
    connectWallet,
    getSigningStargateClient,
    sourceChainUserAddress,
    destinationChainUserAddress,
  } = useEnableChains(
    watch("sourceChain.chainName"),
    watch("destinationChain.chainName")
  );

  const { onSubmit } = useBroadcastTransfer({
    sourceChainUserAddress,
    destinationChainUserAddress,
    getSigningClient: getSigningStargateClient,
    setValue,
  });

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
            <NetworkSelector chains={chains} />
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
              <Button label="Connect Wallet" onClick={connectWallet} />
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};
