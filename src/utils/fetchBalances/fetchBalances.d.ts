export type BalanceResponse =
  | CsdkApiFailure
  | {
      balances: Balance[];
      pagination: Pagination;
    };

interface Balance {
  denom: string;
  amount: string;
}

interface Pagination {
  next_key: null | string;
  total: string;
}

interface CsdkApiFailure {
  code: number;
  message: string;
  details: any[];
}
