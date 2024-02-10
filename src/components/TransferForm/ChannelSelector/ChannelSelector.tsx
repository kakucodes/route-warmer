import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  Tag,
  Text,
} from "grommet";
import { Refresh } from "grommet-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Channel } from "../../../utils/fetchChannels/fetchChannels.d";
import { match } from "ts-pattern";

type Props = {
  channels: undefined | Channel[];
};

const channelIdNum = (channelName: string): number =>
  parseInt(channelName.split("channel-")[1], 10);

export const ChannelSelector = ({ channels }: Props) => {
  const [channelSearch, setChannelSearch] = useState<Number>();
  const channelSelect = useRef<HTMLInputElement>(null);

  useHotkeys(["ctrl+i", "cmd+i"], () => {
    console.log("focus channel select");
    return channelSelect.current?.focus();
  });

  const filteredOptions = (
    channelSearch && channels
      ? channels.filter(
          ({ channel_id }) => channel_id === `channel-${channelSearch}`
        )
      : channels || []
  ).sort((a, b) => channelIdNum(a.channel_id) - channelIdNum(b.channel_id));

  // view for a channel to be used for the select box options
  const channelRow = useMemo(
    () =>
      ({ channel_id, state, ordering, counterparty, version }: Channel) =>
        (
          <Box>
            <Box direction="row" align="end" gap="xsmall">
              <Text>{channel_id}</Text>
              <Text size="xsmall" color="disabled">
                / {counterparty.channel_id}
              </Text>
            </Box>
            <Box direction="row" gap="xsmall">
              <Tag
                size="xsmall"
                value={match(ordering)
                  .with("ORDER_UNORDERED", () => "Unordered")
                  .with("ORDER_ORDERED", () => "Ordered")
                  .exhaustive()}
              />{" "}
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
        ),
    []
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
        <Select
          labelKey="channel_id"
          valueKey="channel_id"
          valueLabel={channelRow}
          focusIndicator
          ref={channelSelect}
          options={filteredOptions}
          icon={<Tag size="xsmall" border={false} value={"ctrl+i"} />}
          searchPlaceholder="Search by channel number"
          onSearch={(search) => setChannelSearch(parseInt(search, 10))}
          onClose={() => setChannelSearch(undefined)}
        >
          {channelRow}
        </Select>
        <Button icon={<Refresh size="small" />} hoverIndicator />
      </CardBody>
    </Card>
  );
};
