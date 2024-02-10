import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  Tag,
  Text,
  TextInput,
} from "grommet";
import { Refresh } from "grommet-icons";
import { AugmentedBalance } from "../../../utils/fetchBalances/fetchBalances";
import { useMemo } from "react";
import { match } from "ts-pattern";

type Props = {
  balances: undefined | AugmentedBalance[];
};

export const AssetSelector = ({ balances = [] }: Props) => {
  const filteredBalances = balances.sort((a, b) =>
    (a.assetInfo?.recommended_symbol || "").localeCompare(
      b.assetInfo?.recommended_symbol || ""
    )
  );

  const balanceRow = useMemo(
    () =>
      ({ assetInfo, balance, chainDenom }: AugmentedBalance) => {
        return (
          <Box pad="xsmall">
            <Box direction="row" gap="xsmall" justify="between">
              <Text color="disabled">
                {match(chainDenom)
                  .when(
                    (denom) => denom.startsWith("ibc/"),
                    (ibcDenom) => `ibc..${ibcDenom.slice(-4)}`
                  )
                  .when(
                    (denom) =>
                      /^factory\/[a-zA-Z0-9]+1[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/.test(
                        denom
                      ),
                    (factoryDenom) =>
                      `factory/..${factoryDenom.split("/")?.[1].slice(-5)}/${
                        factoryDenom.split("/")[2]
                      }`
                  )
                  .otherwise(() => chainDenom)}
              </Text>
              <Text size="small">{assetInfo?.recommended_symbol}</Text>
            </Box>

            <Box direction="row" gap="xsmall" justify="between">
              <Text size="xsmall">bal: {balance.toString()}</Text>
              <Box direction="row" gap="xsmall" justify="end">
                {assetInfo?.decimals && (
                  <Tag
                    size="xsmall"
                    name="decimals"
                    value={assetInfo.decimals}
                  />
                )}
                {assetInfo?.is_cw20 && <Tag value={"cw20"} />}
              </Box>
            </Box>
          </Box>
        );
      },
    []
  );

  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Asset
        </Text>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
        gap="xsmall"
        justify="between"
      >
        <Box width="50%">
          <Select
            options={filteredBalances}
            // value="chainDenom"
            labelKey="chainDenom"
            valueLabel={balanceRow}
          >
            {balanceRow}
          </Select>
        </Box>

        <Box width="50%">
          <TextInput textAlign="end" placeholder="0" />
        </Box>
        <Button icon={<Refresh size="small" />} hoverIndicator />
      </CardBody>
      <CardFooter pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small">Balance: 0.0000</Text>
      </CardFooter>
    </Card>
  );
};
