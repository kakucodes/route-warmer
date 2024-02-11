import { describe, expect, test } from "@jest/globals";
import { formatDenomName } from "../formatDenomName";

describe("Format Denom Name Tests", () => {
  test("IBC Denoms", () => {
    expect(
      formatDenomName(
        "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034"
      )
    ).toBe("ibc/..8034");
  });

  test("CW20 Denoms", () => {
    expect(
      formatDenomName(
        "juno14lycavan8gvpjn97aapzvwmsj8kyrvf644p05r0hu79namyj3ens87650k"
      )
    ).toBe("cw20:juno..650k");
  });

  test("Token Factory Denoms", () => {
    expect(
      formatDenomName(
        "factory/migaloo1cwk3hg5g0rz32u6us8my045ge7es0jnmtfpwt50rv6nagk5aalasa733pt/ampUSDC"
      )
    ).toBe("factory/migaloo..33pt/ampUSDC");
  });

  test("Unknown Denoms", () => {
    expect(formatDenomName("gamm/pool/123")).toBe("gamm/pool/123");
  });
});
