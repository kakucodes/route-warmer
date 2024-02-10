export type ChannelsResponse =
  | CsdkApiFailure
  | {
      channels: Channel[];
      pagination: Pagination;
      height: Height;
    };

export interface Channel {
  state: ChannelState;
  ordering: ChannelOrdering;
  counterparty: Counterparty;
  connection_hops: string[];
  version: string;
  port_id: string;
  channel_id: string;
}

interface Counterparty {
  port_id: string;
  channel_id: string;
}

export type ChannelOrdering = "ORDER_ORDERED" | "ORDER_UNORDERED";

export type ChannelState = "STATE_INIT" | "STATE_OPEN" | "STATE_TRYOPEN";

interface Height {
  revision_number: string;
  revision_height: string;
}

interface Pagination {
  next_key: string | null;
  total: string;
}

export type CsdkApiFailure = {
  code: number;
  message: string;
  details: any[];
};
