import { useQuery } from "@tanstack/react-query";
import { skipFetcher } from "../utils/skipFetcher";
import { paths } from "../utils/skipApi.generated";

export type ChainInfo = NonNullable<
  NonNullable<
    paths["/v1/info/chains"]["get"]["responses"]["200"]["content"]["application/json"]["chains"]
  >[number]
>;

export const useFetchChains = (testnets: boolean) =>
  useQuery({
    queryKey: ["chains", testnets ? "testnet" : "mainnet"],
    queryFn: (): Promise<ChainInfo[]> =>
      skipFetcher
        .path("/v1/info/chains")
        .method("get")
        .create()({ include_testnets: testnets, include_evm: false })
        .then(({ data }) =>
          testnets
            ? (data.chains || []).filter(
                (chain) => !!chain.chain_name?.includes("testnet")
              )
            : data.chains || []
        ),
    staleTime: 1000 * 60 * 60 * 3, // 3hrs
  });
