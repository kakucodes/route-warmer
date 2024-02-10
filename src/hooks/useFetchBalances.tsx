import { useQuery } from "@tanstack/react-query";
import { fetchFullTokenBalances } from "../utils/fetchBalances/fetchBalances";

export const useFetchBalances = (
  chainName: string,
  chainId: string,
  walletAddress: string | undefined
) =>
  useQuery({
    queryKey: ["balances", chainId, walletAddress],
    queryFn: () =>
      fetchFullTokenBalances(
        chainName,
        chainId,
        // since walletAddress is required in the enabled field, we can safely use give a backup string here
        walletAddress || ""
      ),
    enabled: !!walletAddress,
    refetchInterval: 1000 * 60, // refetch every 30s to keep balances up to date
  });
