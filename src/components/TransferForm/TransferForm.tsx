import { useChain } from "@cosmos-kit/react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "grommet";
import { NetworkSelector } from "./NetworkSelector/NetworkSelector";
import { AssetSelector } from "./AssetSelector/AssetSelector";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { ChannelSelector } from "./ChannelSelector/ChannelSelector";

export const TransferForm = () => {
  const { isWalletConnected } = useChain("cosmoshub");
  return (
    <Card background="dark-2">
      <CardHeader
        pad={{ horizontal: "medium", vertical: "small" }}
        border="bottom"
      >
        Transfer Token
      </CardHeader>
      <CardBody pad={{ horizontal: "medium", vertical: "small" }} gap="small">
        <NetworkSelector />
        <ChannelSelector
          channels={[
            {
              state: "STATE_INIT",
              ordering: "ORDER_UNORDERED",
              counterparty: {
                port_id: "transfer",
                channel_id: "",
              },
              connection_hops: ["connection-41"],
              version: "ics20-1",
              port_id: "transfer",
              channel_id: "channel-14",
            },
            {
              state: "STATE_OPEN",
              ordering: "ORDER_UNORDERED",
              counterparty: {
                port_id: "transfer",
                channel_id: "channel-80",
              },
              connection_hops: ["connection-1491"],
              version: "ics20-1",
              port_id: "transfer",
              channel_id: "channel-230",
            },
            {
              state: "STATE_OPEN",
              ordering: "ORDER_UNORDERED",
              counterparty: {
                port_id: "transfer",
                channel_id: "channel-0",
              },
              connection_hops: ["connection-1142"],
              version: "ics20-1",
              port_id: "transfer",
              channel_id: "channel-42",
            },
            {
              state: "STATE_OPEN",
              ordering: "ORDER_UNORDERED",
              counterparty: {
                port_id: "transfer",
                channel_id: "channel-271",
              },
              connection_hops: ["connection-1142"],
              version: "ics20-1",
              port_id: "transfer",
              channel_id: "channel-868",
            },
          ]}
        />
        <AssetSelector
          balances={[
            {
              assetInfo: {
                denom:
                  "factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO",
                chain_id: "osmosis-1",
                origin_denom:
                  "factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "WOSMO",
                name: "WOSMO",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/wosmo.png",
                decimals: 6,
                description:
                  "The first native memecoin on Osmosis. Crafted by the deftest of hands in the lab of lunacy. It's scientifically anarchic, professionally foolish, and your ticket to the madhouse.",
                coingecko_id: "",
                recommended_symbol: "WOSMO",
              },
              balance: BigInt("843638119"),
              chainDenom:
                "factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO",
            },
            {
              assetInfo: {
                denom:
                  "factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail",
                chain_id: "osmosis-1",
                origin_denom:
                  "factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "SAIL",
                name: "SAIL",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sail.png",
                decimals: 6,
                description: "Sail DAO Token",
                coingecko_id: "",
                recommended_symbol: "SAIL",
              },
              balance: BigInt("57682794728"),
              chainDenom:
                "factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail",
            },
            {
              assetInfo: {
                denom:
                  "factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos",
                chain_id: "osmosis-1",
                origin_denom:
                  "factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                coingecko_id: "",
              },
              balance: BigInt("387801533358"),
              chainDenom:
                "factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos",
            },
            {
              assetInfo: {
                denom: "gamm/pool/1403",
                chain_id: "osmosis-1",
                origin_denom: "gamm/pool/1403",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                coingecko_id: "",
              },
              balance: BigInt("8100732882398172141"),
              chainDenom: "gamm/pool/1403",
            },
            {
              assetInfo: {
                denom: "gamm/pool/634",
                chain_id: "osmosis-1",
                origin_denom: "gamm/pool/634",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                coingecko_id: "",
              },
              balance: BigInt("39310036819429973"),
              chainDenom: "gamm/pool/634",
            },
            {
              assetInfo: {
                denom: "gamm/pool/833",
                chain_id: "osmosis-1",
                origin_denom: "gamm/pool/833",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                coingecko_id: "",
              },
              balance: BigInt("114977497696746431"),
              chainDenom: "gamm/pool/833",
            },
            {
              assetInfo: {
                denom: "ucmst",
                chain_id: "comdex-1",
                origin_denom: "ucmst",
                origin_chain_id: "comdex-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "CMST",
                name: "CMST",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/comdex/images/cmst.png",
                decimals: 6,
                description:
                  "Stable Token of Harbor protocol on Comdex network",
                coingecko_id: "composite",
                recommended_symbol: "CMST",
              },
              balance: BigInt("1002799"),
              chainDenom:
                "ibc/23CA6C8D1AB2145DD13EB1E089A2E3F960DC298B468CCE034E19E5A78B61136E",
            },
            {
              assetInfo: {
                denom: "uatom",
                chain_id: "cosmoshub-4",
                origin_denom: "uatom",
                origin_chain_id: "cosmoshub-4",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "ATOM",
                name: "ATOM",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
                decimals: 6,
                description:
                  "The native staking and governance token of the Cosmos Hub.",
                coingecko_id: "cosmos",
                recommended_symbol: "ATOM",
              },
              balance: BigInt("152714502"),
              chainDenom:
                "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
            },
            {
              assetInfo: {
                denom: "aevmos",
                chain_id: "evmos_9001-2",
                origin_denom: "aevmos",
                origin_chain_id: "evmos_9001-2",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "EVMOS",
                name: "EVMOS",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
                decimals: 18,
                description:
                  "The native EVM, governance and staking token of the Evmos Hub",
                coingecko_id: "evmos",
                recommended_symbol: "EVMOS",
              },
              balance: BigInt("5000"),
              chainDenom:
                "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
            },
            {
              assetInfo: {
                denom: "usei",
                chain_id: "pacific-1",
                origin_denom: "usei",
                origin_chain_id: "pacific-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "SEI",
                name: "SEI",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/sei/images/sei.png",
                decimals: 6,
                description: "The native staking token of Sei.",
                coingecko_id: "sei-network",
                recommended_symbol: "SEI",
              },
              balance: BigInt("2568981"),
              chainDenom:
                "ibc/71F11BC0AF8E526B80E44172EBA9D3F0A8E03950BB882325435691EBC9450B1D",
            },
            {
              assetInfo: {
                denom: "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
                chain_id: "gravity-bridge-3",
                origin_denom:
                  "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
                origin_chain_id: "gravity-bridge-3",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "PSTAKE",
                name: "PSTAKE",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/pstake.png",
                decimals: 18,
                description:
                  "pSTAKE is a liquid staking protocol unlocking the liquidity of staked assets.",
                coingecko_id: "pstake-finance",
                recommended_symbol: "PSTAKE.grv",
              },
              balance: BigInt("4483148455547584137"),
              chainDenom:
                "ibc/8061A06D3BD4D52C4A28FFECF7150D370393AF0BA661C3776C54FF32836C3961",
            },
            {
              assetInfo: {
                denom:
                  "factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE",
                chain_id: "migaloo-1",
                origin_denom:
                  "factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE",
                origin_chain_id: "migaloo-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "ampWHALE",
                name: "ampWHALE",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/migaloo/images/ampwhale.svg",
                decimals: 6,
                description: "ampWHALE",
                coingecko_id: "",
                recommended_symbol: "ampWHALE",
              },
              balance: BigInt("379034886"),
              chainDenom:
                "ibc/834D0AEF380E2A490E4209DFF2785B8DBB7703118C144AC373699525C65B4223",
            },
            {
              assetInfo: {
                denom: "uflix",
                chain_id: "omniflixhub-1",
                origin_denom: "uflix",
                origin_chain_id: "omniflixhub-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "FLIX",
                name: "FLIX",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/omniflixhub/images/flix.png",
                decimals: 6,
                description: "The native staking token of OmniFlix Hub.",
                coingecko_id: "omniflix-network",
                recommended_symbol: "FLIX",
              },
              balance: BigInt("363097"),
              chainDenom:
                "ibc/CEE970BB3D26F4B907097B6B660489F13F3B0DA765B83CC7D9A0BC0CE220FA6F",
            },
            {
              assetInfo: {
                denom: "uwhale",
                chain_id: "migaloo-1",
                origin_denom: "uwhale",
                origin_chain_id: "migaloo-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "WHALE",
                name: "WHALE",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/migaloo/images/white-whale.png",
                decimals: 6,
                description: "The native token of Migaloo Chain",
                coingecko_id: "white-whale",
                recommended_symbol: "WHALE",
              },
              balance: BigInt("10762946"),
              chainDenom:
                "ibc/EDD6F0D66BCD49C1084FB2C35353B4ACD7B9191117CE63671B61320548F7C89D",
            },
            {
              assetInfo: {
                denom: "uosmo",
                chain_id: "osmosis-1",
                origin_denom: "uosmo",
                origin_chain_id: "osmosis-1",
                trace: "",
                is_cw20: false,
                is_evm: false,
                symbol: "OSMO",
                name: "OSMO",
                logo_uri:
                  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
                decimals: 6,
                description: "The native token of Osmosis",
                coingecko_id: "osmosis",
                recommended_symbol: "OSMO",
              },
              balance: BigInt("2163280"),
              chainDenom: "uosmo",
            },
          ]}
        />
      </CardBody>
      <CardFooter
        background="dark-1"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        {isWalletConnected ? (
          <Button label="Transfer" fill="horizontal" primary />
        ) : (
          <ConnectButton />
        )}
      </CardFooter>
    </Card>
  );
};
