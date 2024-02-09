import { P, match } from "ts-pattern";
import { COSMOS_DIRECTORY_REST } from "../constants";
import type { Channel, ChannelsResponse } from "./fetchChannels.d";

const CHANNELS_FETCH_LIMIT = 100;

/**
 * Fetches the channels for a given chain
 */
export const fetchChannels = async (chainName: string, key?: string) =>
  fetch(
    `${COSMOS_DIRECTORY_REST}${chainName}/ibc/core/channel/v1/channels?pagination.limit=${CHANNELS_FETCH_LIMIT}${
      key ? `&pagination.key=${key}` : ""
    }`
  )
    .then((response) => response.json())
    .then(
      (data: ChannelsResponse): Promise<Channel[] | undefined> =>
        match(data)
          .with({ pagination: { next_key: P.nullish } }, ({ channels }) =>
            Promise.resolve(
              channels.filter(({ port_id }) => port_id === "transfer")
            )
          )
          .with(
            { pagination: { next_key: P.string } },
            async ({ pagination: { next_key }, channels }) => [
              ...channels.filter(({ port_id }) => port_id === "transfer"),
              ...((await fetchChannels(chainName, next_key)) || []),
            ]
          )
          .with({ code: P._ }, (err) => {
            // TODO: handle error better
            console.error("Failed to fetch channels", err);
            return Promise.resolve(undefined);
          })

          .exhaustive()
    );

const toCounterpartyChannelsObj = (
  allChannels: Record<string, Channel>,
  channel: Channel
) => ({
  ...allChannels,
  // key by the amalgamation of channel id and counterparty channel id
  [channel.channel_id + channel.counterparty.channel_id]: channel,
});

export const findCommonTransferChannels = (xs: Channel[], ys: Channel[]) => {
  // obj that's keyed by counterparty channel ids so we can easily compute the union
  const ysCounterpartyChannelsObj = ys

    // convert to object for easy lookup
    .reduce(toCounterpartyChannelsObj, {});

  console.log(ysCounterpartyChannelsObj, "ysCounterpartyChannelsObj");
  console.log(
    xs,
    xs.find(({ channel_id }) => channel_id === "channel-44"),
    "xs"
  );

  return xs.filter(
    ({ channel_id, counterparty }) =>
      // check to see if the pair of channel id and counterparty id are matching
      ysCounterpartyChannelsObj[counterparty.channel_id + channel_id]
  );
};

export const fetchTransferChannels = (chainAName: string, chainBName: string) =>
  Promise.all([fetchChannels(chainAName), fetchChannels(chainBName)]).then(
    ([chainAChannels, chainBChannels]) => {
      console.log(chainAChannels, chainBChannels, "loaded");
      return match([chainAChannels, chainBChannels] as const)
        .with(
          P.union([P.nullish, P._], [P._, P.nullish]),
          ([aChans, bChans]) => {
            console.error(
              `Failed to fetch channels for both chains. Chain A: ${chainAName} - ${
                aChans ? `${aChans.length} loaded` : "failed"
              }. Chain B: ${chainBName} - ${
                bChans ? `${bChans.length} loaded` : "failed"
              }.`
            );
            return undefined;
          }
        )
        .with([P.array(P._), P.array(P._)], ([aChans, bChans]) =>
          findCommonTransferChannels(aChans, bChans)
        )
        .exhaustive();
    }
  );
