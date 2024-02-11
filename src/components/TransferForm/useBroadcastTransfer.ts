import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { TransferInputs } from "./formTypes";
import { SigningStargateClient } from "@cosmjs/stargate";
import { ibc } from "osmojs";
import { useTxHistory } from "../TxHistoryProvider/TxHistoryProvider";
import { useCallback } from "react";

const { transfer } = ibc.applications.transfer.v1.MessageComposer.withTypeUrl;

export const useBroadcastTransfer = ({
  sourceChainUserAddress,
  destinationChainUserAddress,
  getSigningClient,
  setValue,
}: {
  sourceChainUserAddress: string | undefined;
  destinationChainUserAddress: string | undefined;
  getSigningClient: () => Promise<SigningStargateClient>;
  setValue: UseFormSetValue<TransferInputs>;
}) => {
  const { recordTx } = useTxHistory();

  const onSubmit: SubmitHandler<TransferInputs> = useCallback(
    async ({ sourceChain, destinationChain, asset, channel }) => {
      if (sourceChainUserAddress && destinationChainUserAddress) {
        const client = await getSigningClient();

        // Get the current block height and block so we can set a timeout height
        // when we make the actual transfer message
        const currentHeight = await client.getHeight();
        const currentBlock = await client.getBlock(currentHeight);

        const broadcast = await client
          .signAndBroadcast(
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
          )
          .catch((e) => alert(e.toString()));

        // if the broadcast failed let's not record the tx and what
        // not since it didn't even get on chain
        if (!broadcast) {
          return undefined;
        }

        if (broadcast.code === 0) {
          // reset the form if the tx was successful
          setValue(
            "asset",
            { denom: "", amount: "0" },
            { shouldValidate: true }
          );
          setValue("channel", "", { shouldValidate: true });
        } else {
          console.error("Error broadcasting tx", broadcast);
        }

        recordTx({
          source: {
            address: sourceChainUserAddress,
            chainId: sourceChain.chainId,
            chainName: sourceChain.chainName,
          },
          destination: {
            address: destinationChainUserAddress,
            chainId: destinationChain.chainId,
            chainName: destinationChain.chainName,
          },
          txHash: broadcast.transactionHash,
          code: broadcast.code,
          timestamp: new Date().toISOString(),
          asset: {
            symbol: undefined,
            ...asset,
          },
          channel,
        });
      }
    },
    [
      sourceChainUserAddress,
      destinationChainUserAddress,
      getSigningClient,
      setValue,
      recordTx,
    ]
  );

  return { onSubmit };
};
