import { P, match } from "ts-pattern";
import { COSMOS_DIRECTORY_REST } from "../constants";
import type { Balance, BalanceResponse } from "./fetchBalances.d";
import { skipFetcher } from "../skipFetcher";
import { paths } from "../skipApi.generated";

const DENOMS_FETCH_LIMIT = 75;

export type AugmentedBalance = {
  balance: bigint;
  chainDenom: string;
  assetInfo: NonNullable<
    NonNullable<
      paths["/v1/fungible/assets_from_source"]["post"]["responses"]["200"]["content"]["application/json"]["dest_assets"]
    >[string]["assets"]
  >[number];
};

/**
 * Fetches the wallet balances for a wallet on a chain and collates the asset info for each token
 * TODO: add in querying cw20s on the chain- need to find a reliable repository of contract addresses
 */
export const fetchFullTokenBalances = async (
  chainName: string,
  chainId: string,
  walletAddress: string
) => {
  const basicBalances = await fetchBalances(chainName, chainId, walletAddress);

  if (!basicBalances) {
    // exit early if there are no balances
    return [];
  }

  const assetInfo =
    (
      await skipFetcher
        .path("/v1/fungible/ibc_origin_assets")
        .method("post")
        .create()({
        assets: basicBalances?.map(({ denom }) => ({
          denom,
          chain_id: chainId,
        })),
      })
    ).data.origin_assets || [];

  return assetInfo
    .map((denomInfo, i) => ({
      assetInfo: denomInfo.asset,
      balance: BigInt(basicBalances[i].amount),
      chainDenom: basicBalances[i].denom,
    }))
    .sort((a, b) =>
      (a.assetInfo?.recommended_symbol || "").localeCompare(
        b.assetInfo?.recommended_symbol || ""
      )
    );
};

/**
 * Fetches the wallet balances for a given chain
 */
export const fetchBalances = async (
  chainName: string,
  chainId: string,
  walletAddress: string,
  key?: string
) =>
  fetch(
    `${COSMOS_DIRECTORY_REST}${chainName}/cosmos/bank/v1beta1/balances/${walletAddress}?pagination.limit=${DENOMS_FETCH_LIMIT}${
      key ? `&pagination.key=${key}` : ""
    }`
  )
    .then((response) => response.json())
    .then(
      (data: BalanceResponse): Promise<Balance[] | undefined> =>
        match(data)
          // if there are no more results we should return the balances
          .with({ pagination: { next_key: P.nullish } }, ({ balances }) =>
            Promise.resolve(balances)
          )
          // if there are more results we should fetch them
          .with(
            { pagination: { next_key: P.string } },
            async ({ pagination: { next_key }, balances }) => [
              ...balances,
              ...((await fetchBalances(
                chainName,
                chainId,
                walletAddress,
                next_key
              )) || []),
            ]
          )
          .with({ code: P._ }, (err) => {
            // TODO: handle error better
            console.error(
              `Failed to fetch wallet balance for ${walletAddress} on ${chainId}/${chainName}`,
              err
            );
            return Promise.resolve(undefined);
          })
          .exhaustive()
    );
