import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CheckBox,
  Select,
  Text,
} from "grommet";
import { Shift } from "grommet-icons";
import { ChainInfo, useFetchChains } from "../../../hooks/useFetchChains";
import { useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const matchChain = (searchString: string) => (chain: ChainInfo) =>
  chain.chain_name?.toLowerCase().includes(searchString.toLowerCase()) ||
  chain.chain_id?.toLowerCase().includes(searchString.toLowerCase());

export const NetworkSelector = () => {
  const { control, setValue, watch } = useFormContext();
  const [displayTestnets, setDisplayTestnets] = useState(false);
  const { data: chains = [] } = useFetchChains(displayTestnets);

  const sourceChainValue = watch("sourceChain");
  const destChainValue = watch("destinationChain");

  const onReverseChains = useCallback(() => {
    setValue("sourceChain", destChainValue, { shouldValidate: true });
    setValue("destinationChain", sourceChainValue, { shouldValidate: true });
  }, [setValue, destChainValue, sourceChainValue]);

  const [sourceChainSearch, setSourceChainSearch] = useState<string>();
  const [destChainSearch, setDestChainSearch] = useState<string>();
  const sortedChains = chains.sort((a, b) =>
    (a.chain_name || "").localeCompare(b.chain_name || "")
  );
  const filteredSourceChains = sourceChainSearch
    ? sortedChains.filter(matchChain(sourceChainSearch))
    : sortedChains;
  const filteredDestChains = destChainSearch
    ? sortedChains.filter(matchChain(destChainSearch))
    : sortedChains;

  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Networks
        </Text>
        <CheckBox
          checked={displayTestnets}
          onChange={() => setDisplayTestnets(!displayTestnets)}
        >
          {({ checked }: { checked: boolean }) => (
            <Text
              size="xsmall"
              color={!checked ? "gray" : undefined}
              style={{ textDecoration: !checked ? "line-through" : undefined }}
            >
              Testnets
            </Text>
          )}
        </CheckBox>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
        gap="xsmall"
      >
        <Controller
          name="sourceChain"
          control={control}
          render={({ field }) => (
            <Select
              placeholder={`${displayTestnets ? "Testnet " : ""}Source`}
              options={filteredSourceChains}
              labelKey="chain_name"
              valueKey="chain_name"
              onSearch={setSourceChainSearch}
              onClose={() => setSourceChainSearch(undefined)}
              searchPlaceholder="Search chain by name or id"
              {...field}
              value={field.value?.chainName}
              onChange={(e: { value: ChainInfo }) =>
                field.onChange({
                  chainName: e.value.chain_name,
                  chainId: e.value.chain_id,
                })
              }
            />
          )}
        />
        <Button icon={<Shift />} onClick={onReverseChains} />
        <Controller
          name="destinationChain"
          control={control}
          render={({ field }) => (
            <Select
              placeholder={`${displayTestnets ? "Testnet " : ""}Destination`}
              options={filteredDestChains}
              labelKey="chain_name"
              valueKey="chain_name"
              onSearch={setDestChainSearch}
              onClose={() => setDestChainSearch(undefined)}
              searchPlaceholder="Search chain by name or id"
              {...field}
              value={field.value?.chainName}
              onChange={(e: { value: ChainInfo }) =>
                field.onChange({
                  chainName: e.value.chain_name,
                  chainId: e.value.chain_id,
                })
              }
            />
          )}
        />
      </CardBody>
    </Card>
  );
};
