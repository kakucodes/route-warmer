import { match } from "ts-pattern";

export const formatDenomName = (denom: string) =>
  match(denom)
    .when(
      (denom) => denom.startsWith("ibc/"),
      (ibcDenom) => `ibc..${ibcDenom.slice(-4)}`
    )
    .when(
      (denom) =>
        /^factory\/[a-zA-Z0-9]+1[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/.test(denom),
      (factoryDenom) =>
        `factory/..${factoryDenom.split("/")?.[1].slice(-5)}/${
          factoryDenom.split("/")[2]
        }`
    )
    .otherwise(() => denom);
