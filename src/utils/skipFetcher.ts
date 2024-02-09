import { paths } from "./skipApi.generated";
import { Fetcher } from "openapi-typescript-fetch";

export const skipFetcher = Fetcher.for<paths>();

skipFetcher.configure({
  baseUrl: "https://api.skip.money",
  init: {
    headers: {},
  },
});
