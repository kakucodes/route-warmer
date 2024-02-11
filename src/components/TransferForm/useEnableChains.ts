import { useChains } from "@cosmos-kit/react";
import { useEffect } from "react";

export const useEnableChains = (
  sourceChainName: string,
  destChainName: string
) => {
  const walletChains = useChains([sourceChainName, destChainName]);

  const {
    isWalletConnected: isSourceWalletConnected,
    isWalletConnecting,
    getSigningStargateClient,
    address: sourceChainUserAddress,
    connect: connectSourceWallet,
  } = walletChains[sourceChainName];

  const {
    isWalletConnected: isDestinationWalletConnected,
    address: destinationChainUserAddress,
    connect: connectDestinationWallet,
  } = walletChains[destChainName];

  useEffect(() => {
    // if we're not currently connecting, and one of the wallets is connected,
    // connect the other
    if (!isWalletConnecting) {
      if (isSourceWalletConnected && !isDestinationWalletConnected) {
        connectDestinationWallet();
      } else if (!isSourceWalletConnected && isDestinationWalletConnected) {
        connectSourceWallet();
      }
    }
  }, [
    sourceChainUserAddress,
    destinationChainUserAddress,
    connectSourceWallet,
    connectDestinationWallet,
    isSourceWalletConnected,
    isDestinationWalletConnected,
    isWalletConnecting,
  ]);

  return {
    isWalletConnected: isSourceWalletConnected && isDestinationWalletConnected,
    connectWallet:
      isSourceWalletConnected && !isDestinationWalletConnected
        ? connectDestinationWallet
        : connectSourceWallet,
    getSigningStargateClient,
    sourceChainUserAddress,
    destinationChainUserAddress,
  };
};
