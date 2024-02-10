import { useQuery } from "@tanstack/react-query";
import {
  fetchChannels,
  findCommonTransferChannels,
} from "../utils/fetchChannels/fetchChannels";

const useFetchChainTransferChains = (chainName: string) =>
  useQuery({
    queryKey: ["chainChannels", chainName],
    queryFn: () => fetchChannels(chainName),
    staleTime: 1000 * 60 * 60 * 3, // 3hrs
  });

export const useFetchPossibleChannels = (
  sourceChainName: string,
  destChainName: string
) => {
  const sourceChainChannels = useFetchChainTransferChains(sourceChainName);
  const destChainChannels = useFetchChainTransferChains(destChainName);

  const commonChannels =
    sourceChainChannels.data && destChainChannels.data
      ? findCommonTransferChannels(
          sourceChainChannels.data,
          destChainChannels.data
        )
      : [];

  return {
    data: commonChannels,
    isLoading: sourceChainChannels.isLoading || destChainChannels.isLoading,
    isRefetching:
      sourceChainChannels.isRefetching || destChainChannels.isRefetching,
    refetch: () =>
      !!sourceChainChannels.refetch() && destChainChannels.refetch(),
  };
};
