import { describe, expect, test } from "@jest/globals";
import { Channel } from "./fetchChannels.d";
import {
  findCommonTransferChannels,
  toCounterpartyChannelsObj,
} from "./fetchChannels";

const channelProperties: Pick<
  Channel,
  "port_id" | "state" | "ordering" | "version" | "connection_hops"
> = {
  port_id: "transfer",
  state: "STATE_OPEN",
  ordering: "ORDER_ORDERED",
  version: "1",
  connection_hops: [],
};

describe("Fetch Channel Utils Tests", () => {
  test('Creating the "counterparty channels" object', () => {
    const channel1: Channel = {
      channel_id: `channel-${1}`,
      counterparty: {
        channel_id: `channel-${2}`,
        port_id: "transfer",
      },
      ...channelProperties,
    };
    const channel2: Channel = {
      channel_id: `channel-${2}`,
      counterparty: {
        channel_id: `channel-${3}`,
        port_id: "transfer",
      },
      ...channelProperties,
    };
    expect(toCounterpartyChannelsObj({}, channel1)).toStrictEqual({
      [`channel-1channel-2`]: channel1,
    });

    expect(
      toCounterpartyChannelsObj(
        toCounterpartyChannelsObj({}, channel1),
        channel2
      )
    ).toStrictEqual({
      [`channel-1channel-2`]: channel1,
      [`channel-2channel-3`]: channel2,
    });
  });

  test("Find common transfer channels", () => {
    const chainAChannels: Channel[] = [
      {
        channel_id: `channel-${1}`,
        counterparty: {
          channel_id: `channel-${0}`,
          port_id: "transfer",
        },
        ...channelProperties,
      },
      {
        channel_id: `channel-${2}`,
        counterparty: {
          channel_id: `channel-${3}`,
          port_id: "transfer",
        },
        ...channelProperties,
      },
    ];
    const chainBChannels: Channel[] = [
      {
        channel_id: `channel-${0}`,
        counterparty: {
          channel_id: `channel-${1}`,
          port_id: "transfer",
        },
        ...channelProperties,
      },
      {
        channel_id: `channel-${1}`,
        counterparty: {
          channel_id: `channel-${100}`,
          port_id: "transfer",
        },
        ...channelProperties,
      },
    ];
    expect(
      findCommonTransferChannels(chainAChannels, chainBChannels)
    ).toStrictEqual([
      {
        channel_id: `channel-${1}`,
        counterparty: {
          channel_id: `channel-${0}`,
          port_id: "transfer",
        },
        ...channelProperties,
      },
    ]);
  });
});
