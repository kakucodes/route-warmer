export type ChannelsResponse =
  | CsdkApiFailure
  | {
      channels: Channel[];
      pagination: Pagination;
      height: Height;
    };

export interface Channel {
  state: State;
  ordering: Ordering;
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

enum Ordering {
  OrderOrdered = "ORDER_ORDERED",
  OrderUnordered = "ORDER_UNORDERED",
}

enum State {
  StateInit = "STATE_INIT",
  StateOpen = "STATE_OPEN",
  StateTryopen = "STATE_TRYOPEN",
}

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
