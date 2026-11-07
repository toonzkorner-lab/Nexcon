import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  dollarsToCents,
  parseSquareEnvironment,
  squareApiBase,
  squareConfig,
  squareErrorMessage,
  squarePublicConfig,
} from "./square.ts";

const FULL_ENV = {
  SQUARE_ACCESS_TOKEN: "sq0atp-test",
  SQUARE_LOCATION_ID: "loc-1",
  SQUARE_APPLICATION_ID: "app-1",
  SQUARE_ENVIRONMENT: "sandbox",
};

describe("parseSquareEnvironment", () => {
  it("returns sandbox only for sandbox", () => {
    assert.equal(parseSquareEnvironment("sandbox"), "sandbox");
    assert.equal(parseSquareEnvironment("Sandbox"), "sandbox");
    assert.equal(parseSquareEnvironment("production"), "production");
    assert.equal(parseSquareEnvironment(undefined), "production");
    assert.equal(parseSquareEnvironment(""), "production");
  });
});

describe("squareConfig", () => {
  it("returns the config when token and location are set", () => {
    assert.deepEqual(squareConfig(FULL_ENV), {
      accessToken: "sq0atp-test",
      locationId: "loc-1",
      applicationId: "app-1",
      environment: "sandbox",
    });
  });

  it("defaults to production when the environment is unset", () => {
    const { SQUARE_ENVIRONMENT: _drop, ...rest } = FULL_ENV;
    assert.equal(squareConfig(rest)?.environment, "production");
  });

  it("returns null when the token or location is missing", () => {
    assert.equal(squareConfig({ SQUARE_LOCATION_ID: "loc-1" }), null);
    assert.equal(squareConfig({ SQUARE_ACCESS_TOKEN: "sq0atp-test" }), null);
    assert.equal(squareConfig({}), null);
  });

  it("treats blank values as missing", () => {
    assert.equal(
      squareConfig({ SQUARE_ACCESS_TOKEN: "  ", SQUARE_LOCATION_ID: "loc-1" }),
      null,
    );
  });
});

describe("squarePublicConfig", () => {
  it("returns the public half for the browser SDK", () => {
    assert.deepEqual(squarePublicConfig(FULL_ENV), {
      applicationId: "app-1",
      locationId: "loc-1",
      environment: "sandbox",
    });
  });

  it("returns null when the application id is missing", () => {
    const { SQUARE_APPLICATION_ID: _drop, ...rest } = FULL_ENV;
    assert.equal(squarePublicConfig(rest), null);
  });
});

describe("squareApiBase", () => {
  it("uses the sandbox host for sandbox", () => {
    assert.equal(squareApiBase("sandbox"), "https://connect.squareupsandbox.com");
  });

  it("uses the production host otherwise", () => {
    assert.equal(squareApiBase("production"), "https://connect.squareup.com");
  });
});

describe("dollarsToCents", () => {
  it("converts dollars to integer cents", () => {
    assert.equal(dollarsToCents(10), 1000);
    assert.equal(dollarsToCents(19.99), 1999);
    assert.equal(dollarsToCents(0.1), 10);
  });
});

describe("squareErrorMessage", () => {
  it("gives a customer-safe message per status", () => {
    assert.equal(squareErrorMessage(401), "Square is not connected correctly.");
    assert.equal(squareErrorMessage(429), "Square is busy right now. Try again in a moment.");
    assert.equal(
      squareErrorMessage(402),
      "The card could not be charged. Check the details and try again.",
    );
  });
});
