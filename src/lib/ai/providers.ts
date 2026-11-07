/**
 * LLM providers for Relay (lab) and Core (support dock).
 *
 * Both xAI (Grok) and Google Gemini speak the OpenAI chat-completions
 * format, so one request shape serves both — only the base URL, model,
 * and key change. Priority: xAI first when its key is set, then Gemini
 * (free tier via Google AI Studio), then the local knowledge base.
 * A provider that fails (bad key, rate limit, outage) never errors the
 * chat — the next provider is tried, and the local engine answers last.
 */

export type AIProvider = "xai" | "gemini";

export type ProviderConfig = {
  /** Base URL for the provider's OpenAI-compatible API (no trailing slash). */
  baseUrl: string;
  /** Model id to request. */
  model: string;
  /** Env var name holding this provider's API key. */
  envKey: string;
};

export const XAI_CONFIG: ProviderConfig = {
  baseUrl: "https://api.x.ai/v1",
  model: "grok-4.5",
  envKey: "XAI_API_KEY",
};

export const GEMINI_CONFIG: ProviderConfig = {
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
  model: "gemini-2.5-flash",
  envKey: "GEMINI_API_KEY",
};

export const PROVIDER_CONFIGS: Record<AIProvider, ProviderConfig> = {
  xai: XAI_CONFIG,
  gemini: GEMINI_CONFIG,
};

/** Providers in the order they are tried. */
export const PROVIDER_ORDER: AIProvider[] = ["xai", "gemini"];

function hasKey(env: Record<string, string | undefined>, key: string): boolean {
  const value = env[key];
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Which providers are configured, in try order. Blank keys count as unset.
 * Returns an empty list when no key is set (local answers only).
 */
export function configuredProviders(
  env: Record<string, string | undefined>,
): AIProvider[] {
  return PROVIDER_ORDER.filter((p) => hasKey(env, PROVIDER_CONFIGS[p].envKey));
}

/** API key for a provider, or undefined when unset/blank. */
export function providerApiKey(
  env: Record<string, string | undefined>,
  provider: AIProvider,
): string | undefined {
  const value = env[PROVIDER_CONFIGS[provider].envKey];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

/** Full chat-completions URL for a provider. */
export function chatCompletionsUrl(provider: AIProvider): string {
  return `${PROVIDER_CONFIGS[provider].baseUrl}/chat/completions`;
}
