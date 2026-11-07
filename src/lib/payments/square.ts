/**
 * Square payments for the checkout (embedded card form).
 *
 * Flow: the browser loads Square's Web Payments SDK, mounts the card form,
 * and tokenizes the card into a single-use source ID. The server charges
 * that token via the Payments API — the raw card number never touches
 * this codebase. Amounts are always recomputed server-side from
 * authoritative prices (see submitOrder), so a tampered cart cannot
 * underpay. Every charge carries a unique idempotency key so a retry
 * never double-charges.
 *
 * Env vars (Vercel, Production + Preview):
 *   SQUARE_ACCESS_TOKEN  — server-only secret (sandbox-... or sq0atp-...)
 *   SQUARE_LOCATION_ID   — the Square location (business) to charge under
 *   SQUARE_APPLICATION_ID — public app id, used by the browser SDK
 *   SQUARE_ENVIRONMENT   — "sandbox" or "production" (default "production")
 *
 * The public config (application id, location id, environment) is served
 * to the browser by a server function so no VITE_ vars are needed.
 */

export type SquareEnvironment = "sandbox" | "production";

export const SQUARE_API_VERSION = "2024-12-18";

export const SQUARE_API_BASES: Record<SquareEnvironment, string> = {
  sandbox: "https://connect.squareupsandbox.com",
  production: "https://connect.squareup.com",
};

export const SQUARE_SDK_URLS: Record<SquareEnvironment, string> = {
  sandbox: "https://sandbox.web.squarecdn.com/v1/square.js",
  production: "https://web.squarecdn.com/v1/square.js",
};

export type SquareConfig = {
  accessToken: string;
  locationId: string;
  applicationId: string;
  environment: SquareEnvironment;
};

export type SquarePublicConfig = {
  applicationId: string;
  locationId: string;
  environment: SquareEnvironment;
};

function readEnv(env: Record<string, string | undefined>, key: string): string {
  const value = env[key];
  return typeof value === "string" ? value.trim() : "";
}

/** Parse the environment; anything other than "sandbox" means production. */
export function parseSquareEnvironment(
  value: string | undefined,
): SquareEnvironment {
  return value?.trim().toLowerCase() === "sandbox" ? "sandbox" : "production";
}

/** Full Square config from env, or null when the secret/location is missing. */
export function squareConfig(
  env: Record<string, string | undefined>,
): SquareConfig | null {
  const accessToken = readEnv(env, "SQUARE_ACCESS_TOKEN");
  const locationId = readEnv(env, "SQUARE_LOCATION_ID");
  const applicationId = readEnv(env, "SQUARE_APPLICATION_ID");
  if (!accessToken || !locationId) return null;
  return {
    accessToken,
    locationId,
    applicationId,
    environment: parseSquareEnvironment(env["SQUARE_ENVIRONMENT"]),
  };
}

/** The public half of the config the browser SDK needs, or null. */
export function squarePublicConfig(
  env: Record<string, string | undefined>,
): SquarePublicConfig | null {
  const config = squareConfig(env);
  if (!config || !config.applicationId) return null;
  return {
    applicationId: config.applicationId,
    locationId: config.locationId,
    environment: config.environment,
  };
}

/**
 * Public config for the browser, read from Vite env vars inlined at build
 * time. This is the primary source for the card form — it does not depend
 * on a server round-trip, so a failed config fetch can never silently hide
 * the form. The values are public (application id, location id,
 * environment); the secret access token stays server-only. `env` is
 * injectable so tests can pass values without a Vite runtime.
 */
export function squareClientConfig(
  env: Record<string, string | undefined> = (import.meta as {
    env?: Record<string, string | undefined>;
  }).env ?? {},
): SquarePublicConfig | null {
  const applicationId = (env["VITE_SQUARE_APPLICATION_ID"] ?? "").trim();
  const locationId = (env["VITE_SQUARE_LOCATION_ID"] ?? "").trim();
  if (!applicationId || !locationId) return null;
  return {
    applicationId,
    locationId,
    environment: parseSquareEnvironment(env["VITE_SQUARE_ENVIRONMENT"]),
  };
}

/** API base URL for an environment. */
export function squareApiBase(environment: SquareEnvironment): string {
  return SQUARE_API_BASES[environment];
}

/** Dollars to integer cents (Square charges in the smallest unit). */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export type SquareChargeInput = {
  sourceId: string;
  amountCents: number;
  idempotencyKey: string;
  note?: string;
  buyerEmail?: string;
};

export type SquareChargeResult = {
  paymentId: string;
  status: string;
  amountCents: number;
};

/** Error text safe to show to a customer (never leaks the raw API body). */
export function squareErrorMessage(status: number): string {
  if (status === 401 || status === 403) return "Square is not connected correctly.";
  if (status === 429) return "Square is busy right now. Try again in a moment.";
  return "The card could not be charged. Check the details and try again.";
}

/**
 * Charge a tokenized card. Returns the payment on success (COMPLETED).
 * Throws an Error with a customer-safe message on any failure, so the
 * caller never records an order for a payment that did not go through.
 */
export async function chargeSquare(
  config: SquareConfig,
  input: SquareChargeInput,
): Promise<SquareChargeResult> {
  if (!input.sourceId) throw new Error("Missing card token.");
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) {
    throw new Error("Invalid charge amount.");
  }
  const res = await fetch(`${squareApiBase(config.environment)}/v2/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_API_VERSION,
    },
    body: JSON.stringify({
      source_id: input.sourceId,
      idempotency_key: input.idempotencyKey,
      amount_money: { amount: input.amountCents, currency: "USD" },
      location_id: config.locationId,
      ...(input.note ? { note: input.note } : {}),
      ...(input.buyerEmail
        ? { buyer_email_address: input.buyerEmail }
        : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(squareErrorMessage(res.status));
  }
  const json = (await res.json()) as {
    payment?: { id?: string; status?: string; amount_money?: { amount?: number } };
  };
  const payment = json.payment;
  if (!payment?.id || payment.status !== "COMPLETED") {
    throw new Error("The card could not be charged. Check the details and try again.");
  }
  return {
    paymentId: payment.id,
    status: payment.status,
    amountCents: payment.amount_money?.amount ?? input.amountCents,
  };
}
