import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  Spinner,
  Tag,
  Text,
} from "grommet";
import { Refresh } from "grommet-icons";
import { useEffect, useMemo, useState } from "react";
import { Channel } from "../../../utils/fetchChannels/fetchChannels.d";
import { match } from "ts-pattern";
import { Controller, useFormContext } from "react-hook-form";
import { useFetchPossibleChannels } from "../../../hooks/useFetchPossibleChannels";

const channelIdNum = (channelName: string): number =>
  parseInt(channelName.split("channel-")[1], 10);

export const ChannelSelector = () => {
  const [channelSearch, setChannelSearch] = useState<Number>();

  const { control, setValue, watch } = useFormContext();

  const { chainName: sourceChain } = watch("sourceChain");
  const { chainName: destChain } = watch("destinationChain");

  useEffect(() => {
    console.log("resetting channel");
    setValue("channel", "", { shouldValidate: true });
  }, [sourceChain, destChain, setValue]);

  const {
    data: channels,
    isLoading: channelsLoading,
    isRefetching: channelsRefetching,
    refetch: refetchChannels,
  } = useFetchPossibleChannels(sourceChain, destChain);

  const fetchingChannels = channelsLoading || channelsRefetching;

  const filteredOptions = (
    channelSearch && channels
      ? channels.filter(({ channel_id }) =>
          channelIdNum(channel_id).toString().includes(channelSearch.toString())
        )
      : channels || []
  ).sort((a, b) => channelIdNum(a.channel_id) - channelIdNum(b.channel_id));

  // view for a channel to be used for the select box options
  const channelRow = useMemo(
    () => (channel: Channel | string) => {
      // for value rendering we'll just get the channel as a string and we have to find it in the channels list
      const channelInfo =
        typeof channel === "string"
          ? channels.find(({ channel_id }) => channel_id === channel)
          : channel;

      if (!channelInfo) return null;

      const { channel_id, state, ordering, counterparty, version } =
        channelInfo;
      return (
        <Box pad="xsmall">
          <Box direction="row" align="end" gap="xsmall">
            <Text>{channel_id}</Text>
            <Text size="xsmall" color="disabled">
              / {counterparty.channel_id}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Tag size="xsmall" name="version" value={version} />
            <Tag
              size="xsmall"
              value={match(ordering)
                .with("ORDER_UNORDERED", () => "Unordered")
                .with("ORDER_ORDERED", () => "Ordered")
                .exhaustive()}
            />
            <Tag
              size="xsmall"
              name="state"
              // @ts-ignore
              style={{ color: state !== "STATE_OPEN" ? "red" : undefined }}
              value={match(state)
                .with("STATE_INIT", () => "Init")
                .with("STATE_OPEN", () => "Open")
                .with("STATE_TRYOPEN", () => "Try Open")
                .exhaustive()}
            />
          </Box>
        </Box>
      );
    },
    [channels]
  );

  return (
    <Card background="background">
      <CardHeader pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text size="small" weight="bold">
          Channel
        </Text>
      </CardHeader>
      <CardBody
        pad={{ horizontal: "small", vertical: "xsmall" }}
        direction="row"
      >
        <Controller
          control={control}
          name="channel"
          render={({ field }) => (
            <Select
              placeholder={
                fetchingChannels
                  ? "Loading Channels..."
                  : channels.length === 0
                  ? "No Available Channels"
                  : "Select Channel"
              }
              disabled={channelsLoading}
              labelKey="channel_id"
              valueKey="channel_id"
              valueLabel={channelRow}
              focusIndicator
              options={filteredOptions}
              icon={<Tag size="xsmall" border={false} value={"ctrl+i"} />}
              searchPlaceholder="Search by channel number"
              onSearch={(search) => setChannelSearch(parseInt(search, 10))}
              onClose={() => setChannelSearch(undefined)}
              {...field}
              onChange={(e: { value: Channel }) =>
                // field.onChange(e.value.channel_id)
                setValue("channel", e.value.channel_id, {
                  shouldValidate: true,
                })
              }
            >
              {channelRow}
            </Select>
          )}
        />

        <Button
          icon={
            fetchingChannels ? (
              <Spinner size="xsmall" />
            ) : (
              <Refresh size="small" />
            )
          }
          disabled={fetchingChannels}
          onClick={refetchChannels}
          hoverIndicator
        />
      </CardBody>
    </Card>
  );
};
