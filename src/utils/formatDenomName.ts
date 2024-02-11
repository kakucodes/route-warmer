import { bech32 } from "bech32";
import { match } from "ts-pattern";

export const formatDenomName = (denom: string) =>
  match(denom)
    .when(
      (denom) => denom.startsWith("ibc/"),
      (ibcDenom) => `ibc/..${ibcDenom.slice(-4)}`
    )
    .when(
      (denom) =>
        /^factory\/[a-zA-Z0-9]+1[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/.test(denom),
      (factoryDenom) => {
        const [contractAddress, tokenName] = factoryDenom.split("/").slice(1);

        return `factory/${
          bech32.decode(contractAddress).prefix
        }..${contractAddress.slice(-4)}/${tokenName}`;
      }
    )
    .when(
      (denom) => {
        try {
          return !!bech32.decode(denom).prefix;
        } catch {
          return false;
        }
      },
      (cw20Denom) => {
        const { prefix } = bech32.decode(cw20Denom);
        return `cw20:${prefix}..${cw20Denom.slice(-4)}`;
      }
    )
    .otherwise(() => denom);
