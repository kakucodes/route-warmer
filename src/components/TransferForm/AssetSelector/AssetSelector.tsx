import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  Spinner,
  Tag,
  Text,
  TextInput,
} from "grommet";
import { Refresh } from "grommet-icons";
import { AugmentedBalance } from "../../../utils/fetchBalances/fetchBalances";
import { useEffect, useMemo } from "react";
import { match } from "ts-pattern";
import { Controller, useFormContext } from "react-hook-form";
import { useChain } from "@cosmos-kit/react";
import { useFetchBalances } from "../../../hooks/useFetchBalances";
import { formatDenomName } from "../../../utils/formatDenomName";

/**
 * takes an expontent and an amount of utoken/atoken and formats the number for readability
 */
const applyAmountExponent = (exponent: number, amount: string) => {
  const wholeAmount = BigInt(amount) / BigInt(10 ** exponent);
  return (
    wholeAmount.toLocaleString() +
    "." +
    (BigInt(amount) - wholeAmount * BigInt(10 ** exponent))
      .toString()
      .padStart(exponent, "0")
  );
};

export const AssetSelector = () => {
  const { control, setValue, watch } = useFormContext();

  const { chainName, chainId } = watch("sourceChain");
  const {
    address: userAddress,
    isWalletConnected,
    connect,
  } = useChain(chainName);

  const assetValue = watch("asset");
  const amount = assetValue?.amount || "";

  useEffect(() => {
    !userAddress && isWalletConnected && connect();
  }, [isWalletConnected, userAddress, connect]);

  const {
    data: balances = [],
    isLoading: balancesLoading,
    isRefetching: balancesRefetching,
    refetch: refetchBalances,
  } = useFetchBalances(chainName, chainId, userAddress);
  const fetchingBalances = balancesLoading || balancesRefetching;

  const filteredBalances = balances;

  const balanceRow = useMemo(
    () => (balanceKey: AugmentedBalance | string) => {
      const balanceInfo =
        typeof balanceKey === "string"
          ? balances.find(({ chainDenom }) => chainDenom === balanceKey)
          : balanceKey;

      if (!balanceInfo) return null;

      const { assetInfo, balance, chainDenom } = balanceInfo;
      return (
        <Box pad="xsmall">
          <Box direction="row" gap="xsmall" justify="between">
            <Text color="disabled">{formatDenomName(chainDenom)}</Text>
            <Text size="small">{assetInfo?.recommended_symbol}</Text>
          </Box>

          <Box direction="row" gap="xsmall" justify="between">
            <Text size="xsmall">bal: {balance.toString()}</Text>
            <Box direction="row" gap="xsmall" justify="end">
              {assetInfo?.decimals && (
                <Tag size="xsmall" name="decimals" value={assetInfo.decimals} />
              )}
              {assetInfo?.is_cw20 && <Tag size="xsmall" value={"cw20"} />}
            </Box>
          </Box>
        </Box>
      );
    },
    [balances]
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
        <Box direction="row" gap="xsmall">
          <Box width="50%">
            <Controller
              name="asset.denom"
              control={control}
              render={({
                field: { value, onChange, onBlur, disabled, ref, name },
              }) => (
                <Select
                  placeholder={
                    fetchingBalances
                      ? "Loading Assets..."
                      : `Select Asset (${balances.length})`
                  }
                  disabled={fetchingBalances || disabled}
                  options={filteredBalances}
                  labelKey="chainDenom"
                  valueLabel={balanceRow}
                  onBlur={onBlur}
                  ref={ref}
                  name={name}
                  value={value}
                  onChange={(e: { value: AugmentedBalance }) => {
                    setValue("asset.denom", e.value.chainDenom, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {balanceRow}
                </Select>
              )}
            />
          </Box>

          <Box width="50%">
            <Controller
              name="asset.amount"
              control={control}
              render={({
                field: { value, onChange, onBlur, disabled, ref, name },
              }) => (
                <TextInput
                  textAlign="end"
                  placeholder="0"
                  disabled={disabled}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  name={name}
                  onChange={(e) =>
                    setValue("asset.amount", Number(e.target.value) || "", {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
          </Box>
        </Box>

        <Button
          icon={
            fetchingBalances ? (
              <Spinner size="xsmall" />
            ) : (
              <Refresh size="small" />
            )
          }
          onClick={refetchBalances}
          hoverIndicator
        />
      </CardBody>
      <CardFooter
        justify="end"
        direction="row"
        pad={{ horizontal: "small", vertical: "xsmall" }}
      >
        <Box>
          <Text
            style={{ fontFamily: "monospace" }}
            textAlign="end"
            size="small"
            onClick={() =>
              setValue("asset.amount", (1_000_000).toString(), {
                shouldValidate: true,
              })
            }
          >
            {applyAmountExponent(6, amount)} e06
          </Text>

          <Text
            style={{ fontFamily: "monospace" }}
            textAlign="end"
            size="small"
            onClick={() =>
              setValue("asset.amount", (1_000_000_000_000_000_000).toString(), {
                shouldValidate: true,
              })
            }
          >
            {applyAmountExponent(18, amount)} e18
          </Text>
        </Box>
      </CardFooter>
    </Card>
  );
};
