// ============================================================
// Shared Constants for Hatcher
// ============================================================

import type { AgentFramework, AgentStatus, UserTierKey, AddonKey } from '../types/index.js';
import { TIER_KEYS, ADDON_KEYS, FRAMEWORK_KEYS, AGENT_STATUS_KEYS } from '../i18n/keys.js';

// --- Subscription Tiers ---

export interface TierConfig {
  key: UserTierKey;
  name: string;
  /** Stable i18n key — frontend resolves via t(`${translationKey}.name`) / t(`${translationKey}.description`) */
  translationKey: string;
  usdPrice: number;       // 0 = free
  includedAgents: number;
  /** Monthly AI Credits granted for hosted LLM/search/tool usage. */
  aiCreditsMonthly: number;
  /** @deprecated Hosted AI usage is metered by aiCreditsMonthly. Kept for API compatibility. */
  messagesPerDay: number;
  /** @deprecated Hosted web search is metered by aiCreditsMonthly. Kept for API compatibility. */
  searchesPerDay: number;
  cpuLimit: number;        // CPU cores
  memoryMb: number;        // RAM in MB
  storageMb: number;       // Workspace in MB
  autoSleep: boolean;      // true = sleep after idle
  autoSleepMinutes: number;
  fileManager: boolean;
  fullLogs: boolean;
  prioritySupport: boolean;
  /** null = unlimited plugins + skills. */
  maxPlugins: number | null;
}

export const AI_CREDIT_UNIT_USD = 0.001;
export const AI_CREDIT_DEFAULT_MARGIN_MULTIPLIER = 1;
export const AI_CREDIT_MIN_CHARGE = 1;

export const TIER_AI_CREDITS_MONTHLY: Record<UserTierKey, number> = {
  free: 500,
  starter: 3000,
  pro: 15000,
  business: 40000,
  founding_member: 25000,
};

export type HostedModelCategory = 'default' | 'fast' | 'balanced' | 'coding' | 'premium' | 'advanced';
export type HostedModelCostTier = 'free' | 'low' | 'medium' | 'high' | 'premium';

export interface HostedModelRecommendation {
  id: string;
  name: string;
  provider: string;
  category: HostedModelCategory;
  costTier: HostedModelCostTier;
  context?: string;
  description: string;
  default?: boolean;
  warning?: string;
}

export const HATCHER_HOSTED_MODEL_RECOMMENDATIONS: HostedModelRecommendation[] = [
  {
    id: 'deepseek/deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'DeepSeek',
    category: 'default',
    costTier: 'low',
    context: '1M',
    description: 'Default hosted model. Fast, low-cost, and routed through the best available Hatcher provider.',
    default: true,
  },
  {
    id: 'deepseek/deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    category: 'balanced',
    costTier: 'medium',
    context: '1M',
    description: 'Higher quality DeepSeek option for broader analysis and longer tasks.',
  },
  {
    id: 'deepseek/deepseek-v3.2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    category: 'fast',
    costTier: 'low',
    context: '128K',
    description: 'Efficient fallback for quick general-purpose agent replies.',
  },
  {
    id: 'openai/gpt-5-nano',
    name: 'GPT-5 Nano',
    provider: 'OpenAI',
    category: 'fast',
    costTier: 'low',
    context: '400K',
    description: 'Very low-cost OpenAI option for lightweight chat and extraction.',
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'OpenAI',
    category: 'balanced',
    costTier: 'medium',
    context: '400K',
    description: 'Balanced OpenAI model for most hosted agent work.',
  },
  {
    id: 'openai/gpt-5.1-codex-mini',
    name: 'GPT-5.1 Codex Mini',
    provider: 'OpenAI',
    category: 'coding',
    costTier: 'medium',
    context: '400K',
    description: 'Lower-cost OpenAI coding model for repo edits and tool use.',
  },
  {
    id: 'openai/gpt-5.1',
    name: 'GPT-5.1',
    provider: 'OpenAI',
    category: 'balanced',
    costTier: 'high',
    context: '400K',
    description: 'General OpenAI model for complex assistant workflows.',
  },
  {
    id: 'openai/gpt-5.4-nano',
    name: 'GPT-5.4 Nano',
    provider: 'OpenAI',
    category: 'fast',
    costTier: 'low',
    context: '400K',
    description: 'Newer low-cost OpenAI option for short tasks and quick responses.',
  },
  {
    id: 'google/gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    provider: 'Google',
    category: 'fast',
    costTier: 'low',
    context: '1M',
    description: 'Low-latency model for simple assistant and extraction workflows.',
  },
  {
    id: 'qwen/qwen3-coder-flash',
    name: 'Qwen3 Coder Flash',
    provider: 'Qwen',
    category: 'coding',
    costTier: 'low',
    context: '1M',
    description: 'Fast code-oriented model for tool use and routine development tasks.',
  },
  {
    id: 'openai/gpt-5.4-mini',
    name: 'GPT-5.4 Mini',
    provider: 'OpenAI',
    category: 'balanced',
    costTier: 'medium',
    context: '400K',
    description: 'Stronger balanced OpenAI model for daily agent workloads.',
  },
  {
    id: 'anthropic/claude-haiku-4.5',
    name: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    category: 'balanced',
    costTier: 'medium',
    context: '200K',
    description: 'Quick Claude option for structured assistant tasks.',
  },
  {
    id: 'idle/claude-haiku-4-5',
    name: 'Claude Haiku 4.5 (IDLE)',
    provider: 'IDLE',
    category: 'fast',
    costTier: 'low',
    context: '200K',
    description: 'Partner-hosted Claude Haiku through IDLE. Fixed 1 AI Credit per request.',
  },
  {
    id: 'idle/claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6 (IDLE)',
    provider: 'IDLE',
    category: 'balanced',
    costTier: 'medium',
    context: '1M',
    description: 'Partner-hosted Claude Sonnet through IDLE. Fixed 3 AI Credits per request.',
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    category: 'balanced',
    costTier: 'medium',
    context: '1M',
    description: 'Stable Gemini option with tool support and broad context.',
  },
  {
    id: 'google/gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    provider: 'Google',
    category: 'balanced',
    costTier: 'medium',
    context: '1M',
    description: 'Large-context Google model for broader research and summaries.',
  },
  {
    id: 'google/gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro Preview',
    provider: 'Google',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Higher quality Gemini option for complex reasoning.',
  },
  {
    id: 'qwen/qwen3.5-flash-02-23',
    name: 'Qwen3.5 Flash',
    provider: 'Qwen',
    category: 'fast',
    costTier: 'low',
    context: '1M',
    description: 'Very efficient Qwen model for high-volume agent loops.',
  },
  {
    id: 'qwen/qwen3.6-flash',
    name: 'Qwen3.6 Flash',
    provider: 'Qwen',
    category: 'fast',
    costTier: 'medium',
    context: '1M',
    description: 'Newer Qwen flash model with strong price-performance.',
  },
  {
    id: 'qwen/qwen3.6-35b-a3b',
    name: 'Qwen3.6 35B A3B',
    provider: 'Qwen',
    category: 'balanced',
    costTier: 'medium',
    context: '256K',
    description: 'Current Qwen hosted option that replaces the retired Qwen3 32B ID.',
  },
  {
    id: 'qwen/qwen3.5-35b-a3b',
    name: 'Qwen3.5 35B A3B',
    provider: 'Qwen',
    category: 'balanced',
    costTier: 'medium',
    context: '256K',
    description: 'Balanced Qwen model for general chat, research, and tool-use loops.',
  },
  {
    id: 'moonshotai/kimi-k2-thinking',
    name: 'Kimi K2 Thinking',
    provider: 'Moonshot AI',
    category: 'balanced',
    costTier: 'medium',
    context: '256K',
    description: 'Reasoning-focused option for analysis-heavy tasks.',
  },
  {
    id: 'qwen/qwen3-coder',
    name: 'Qwen3 Coder',
    provider: 'Qwen',
    category: 'coding',
    costTier: 'medium',
    context: '256K',
    description: 'Higher quality coding model for edits, repo analysis, and agentic coding.',
  },
  {
    id: 'qwen/qwen3-coder-next',
    name: 'Qwen3 Coder Next',
    provider: 'Qwen',
    category: 'coding',
    costTier: 'medium',
    context: '1M',
    description: 'Newer Qwen coding model for repo edits and structured tool calls.',
  },
  {
    id: 'qwen/qwen3-coder-plus',
    name: 'Qwen3 Coder Plus',
    provider: 'Qwen',
    category: 'coding',
    costTier: 'high',
    context: '1M',
    description: 'Larger Qwen coding option for difficult implementation tasks.',
  },
  {
    id: 'qwen/qwen3.6-plus',
    name: 'Qwen3.6 Plus',
    provider: 'Qwen',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Higher quality Qwen option for more complex reasoning tasks.',
  },
  {
    id: 'qwen/qwen3-max',
    name: 'Qwen3 Max',
    provider: 'Qwen',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Large Qwen model for demanding agent work.',
  },
  {
    id: 'qwen/qwen3-max-thinking',
    name: 'Qwen3 Max Thinking',
    provider: 'Qwen',
    category: 'advanced',
    costTier: 'premium',
    context: '1M',
    description: 'Reasoning-focused Qwen model for selective high-value tasks.',
    warning: 'Consumes AI Credits quickly.',
  },
  {
    id: 'x-ai/grok-4.1-fast',
    name: 'Grok 4.1 Fast',
    provider: 'xAI',
    category: 'fast',
    costTier: 'low',
    context: '2M',
    description: 'Fast Grok model with very large context.',
  },
  {
    id: 'x-ai/grok-code-fast-1',
    name: 'Grok Code Fast 1',
    provider: 'xAI',
    category: 'coding',
    costTier: 'medium',
    context: '256K',
    description: 'xAI coding model tuned for fast code generation.',
  },
  {
    id: 'mistralai/mistral-small-2603',
    name: 'Mistral Small 4',
    provider: 'Mistral',
    category: 'fast',
    costTier: 'low',
    context: '256K',
    description: 'Efficient general model from Mistral.',
  },
  {
    id: 'mistralai/codestral-2508',
    name: 'Codestral 2508',
    provider: 'Mistral',
    category: 'coding',
    costTier: 'medium',
    context: '256K',
    description: 'Mistral coding model for code edits and tool use.',
  },
  {
    id: 'mistralai/mistral-large-2512',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    category: 'premium',
    costTier: 'medium',
    context: '256K',
    description: 'Stronger Mistral model for complex general tasks.',
  },
  {
    id: 'moonshotai/kimi-k2.6',
    name: 'Kimi K2.6',
    provider: 'Moonshot AI',
    category: 'balanced',
    costTier: 'high',
    context: '256K',
    description: 'Newer Kimi model for long-form analysis and synthesis.',
  },
  {
    id: 'z-ai/glm-4.7-flash',
    name: 'GLM 4.7 Flash',
    provider: 'Z.ai',
    category: 'fast',
    costTier: 'low',
    context: '200K',
    description: 'Low-cost GLM model for quick agent loops.',
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b',
    name: 'Nemotron 3 Nano',
    provider: 'NVIDIA',
    category: 'fast',
    costTier: 'low',
    context: '256K',
    description: 'Low-cost NVIDIA model for lightweight workflows.',
  },
  {
    id: 'openai/gpt-5.3-codex',
    name: 'GPT-5.3 Codex',
    provider: 'OpenAI',
    category: 'coding',
    costTier: 'high',
    context: '400K',
    description: 'Premium coding model for complex implementation and debugging work.',
  },
  {
    id: 'anthropic/claude-sonnet-4.5',
    name: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Strong premium reasoning and coding model.',
  },
  {
    id: 'anthropic/claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Newer Sonnet model for complex reasoning and agent workflows.',
  },
  {
    id: 'x-ai/grok-4.3',
    name: 'Grok 4.3',
    provider: 'xAI',
    category: 'premium',
    costTier: 'high',
    context: '1M',
    description: 'Higher quality Grok model for reasoning-heavy tasks.',
  },
  {
    id: 'z-ai/glm-5.1',
    name: 'GLM 5.1',
    provider: 'Z.ai',
    category: 'balanced',
    costTier: 'high',
    context: '200K',
    description: 'Higher quality GLM model for reasoning and planning.',
  },
  {
    id: 'openai/gpt-5.4',
    name: 'GPT-5.4',
    provider: 'OpenAI',
    category: 'premium',
    costTier: 'high',
    context: '1.05M',
    description: 'High-quality OpenAI model for complex general tasks.',
  },
  {
    id: 'anthropic/claude-opus-4.7',
    name: 'Claude Opus 4.7',
    provider: 'Anthropic',
    category: 'premium',
    costTier: 'premium',
    context: '1M',
    description: 'Most expensive Claude option for difficult reasoning.',
    warning: 'Consumes AI Credits quickly. Show a confirmation before saving as default.',
  },
  {
    id: 'openai/gpt-5.5',
    name: 'GPT-5.5',
    provider: 'OpenAI',
    category: 'premium',
    costTier: 'premium',
    context: '1.05M',
    description: 'Frontier OpenAI model for high-value workflows.',
    warning: 'Consumes AI Credits quickly. Show a confirmation before saving as default.',
  },
  {
    id: 'openai/gpt-5.5-pro',
    name: 'GPT-5.5 Pro',
    provider: 'OpenAI',
    category: 'premium',
    costTier: 'premium',
    context: '1.05M',
    description: 'Highest-cost OpenAI option for rare, high-stakes tasks.',
    warning: 'Consumes AI Credits very quickly. Keep hidden behind an explicit advanced toggle.',
  },
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    category: 'advanced',
    costTier: 'low',
    context: '10M',
    description: 'Legacy compatibility option for existing Hatcher agent configs.',
  },
  {
    id: 'openrouter/auto',
    name: 'OpenRouter Auto',
    provider: 'OpenRouter',
    category: 'advanced',
    costTier: 'medium',
    context: '2M',
    description: 'Lets the fallback router select an available model. Useful as a fallback, not a default.',
  },
];

export const TIERS: Record<UserTierKey, TierConfig> = {
  free: {
    key: 'free',
    name: 'Free',
    translationKey: TIER_KEYS.free,
    usdPrice: 0,
    includedAgents: 1,
    aiCreditsMonthly: TIER_AI_CREDITS_MONTHLY.free,
    messagesPerDay: 0,
    searchesPerDay: 0,
    cpuLimit: 1,
    memoryMb: 1024,
    storageMb: 2048,
    autoSleep: true,
    autoSleepMinutes: 720,
    fileManager: true,
    fullLogs: true,
    prioritySupport: false,
    maxPlugins: null,
  },
  starter: {
    key: 'starter',
    name: 'Starter',
    translationKey: TIER_KEYS.starter,
    usdPrice: 6.99,
    includedAgents: 1,
    aiCreditsMonthly: TIER_AI_CREDITS_MONTHLY.starter,
    messagesPerDay: 0,
    searchesPerDay: 0,
    cpuLimit: 1,
    memoryMb: 1536,
    storageMb: 10240,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    fullLogs: true,
    prioritySupport: false,
    maxPlugins: null,
  },
  pro: {
    key: 'pro',
    name: 'Pro',
    translationKey: TIER_KEYS.pro,
    usdPrice: 19.99,
    includedAgents: 3,
    aiCreditsMonthly: TIER_AI_CREDITS_MONTHLY.pro,
    messagesPerDay: 0,
    searchesPerDay: 0,
    cpuLimit: 1.5,
    memoryMb: 2048,
    storageMb: 25600,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    fullLogs: true,
    prioritySupport: false,
    maxPlugins: null,
  },
  business: {
    key: 'business',
    name: 'Business',
    translationKey: TIER_KEYS.business,
    usdPrice: 49.99,
    includedAgents: 5,
    aiCreditsMonthly: TIER_AI_CREDITS_MONTHLY.business,
    messagesPerDay: 0,
    searchesPerDay: 0,
    cpuLimit: 2,
    memoryMb: 3072,
    storageMb: 51200,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,       // included for all agents
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: null,
  },
  founding_member: {
    key: 'founding_member',
    name: 'Founding Member',
    translationKey: TIER_KEYS.founding_member,
    usdPrice: 99,
    includedAgents: 10,
    aiCreditsMonthly: TIER_AI_CREDITS_MONTHLY.founding_member,
    messagesPerDay: 0,
    searchesPerDay: 0,
    cpuLimit: 2,
    memoryMb: 4096,
    storageMb: 40960,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: null,
  },
};

export const TIER_ORDER: UserTierKey[] = ['free', 'starter', 'pro', 'business', 'founding_member'];

/** Absolute cap on Founding Member slots. Hard-coded here (not in the DB)
 *  so the limit ships with every release and can't be silently raised by
 *  a rogue admin query. The backend counts users with tier='founding_member'
 *  and refuses new purchases once `FOUNDING_MEMBER_MAX_SLOTS` is reached. */
export const FOUNDING_MEMBER_MAX_SLOTS = 20;

// Helper: get tier config (falls back to free for unknown/legacy tiers)
export function getTier(key: UserTierKey | string): TierConfig {
  const legacyMap: Record<string, UserTierKey> = { basic: 'starter', unlimited: 'starter' };
  const normalized = legacyMap[key] ?? key;
  return TIERS[normalized as UserTierKey] ?? TIERS.free;
}

// --- Add-ons ---

export interface AddonConfig {
  key: AddonKey;
  name: string;
  description: string;
  /** Stable i18n key — frontend resolves via t(`${translationKey}.name`) / t(`${translationKey}.description`) */
  translationKey: string;
  usdPrice: number;
  type: 'subscription' | 'one_time';
  /** true = one purchase per agent; false = account-level (stackable). */
  perAgent: boolean;
  /** Number of extra agent slots this addon grants. */
  extraAgents?: number;
  /** @deprecated legacy daily message quota add-on field. */
  extraMessages?: number;
  /** @deprecated legacy daily web-search quota add-on field. */
  extraSearches?: number;
  /** One-time AI Credits granted to the buyer's account. */
  aiCredits?: number;
  /** @deprecated Plugin and skill slots are unlimited. */
  extraPlugins?: number;
}

export const ADDONS: AddonConfig[] = [
  // ── Agent capacity (account-level, stackable) ────────────────
  { key: 'addon.agents.1',       name: '+1 Agent',         description: '1 additional agent slot',                   translationKey: ADDON_KEYS['addon.agents.1'],       usdPrice: 2.99,   type: 'subscription', perAgent: false, extraAgents: 1 },
  { key: 'addon.agents.3',       name: '+3 Agents',        description: '3 additional agent slots',                  translationKey: ADDON_KEYS['addon.agents.3'],       usdPrice: 6.99,   type: 'subscription', perAgent: false, extraAgents: 3 },
  { key: 'addon.agents.5',       name: '+5 Agents',        description: '5 additional agent slots',                  translationKey: ADDON_KEYS['addon.agents.5'],       usdPrice: 11.99,  type: 'subscription', perAgent: false, extraAgents: 5 },
  { key: 'addon.agents.10',      name: '+10 Agents',       description: '10 additional agent slots',                 translationKey: ADDON_KEYS['addon.agents.10'],      usdPrice: 19.99,  type: 'subscription', perAgent: false, extraAgents: 10 },
  // ── AI Credits (account-level, one-time, repeatable) ─────────
  { key: 'addon.ai_credits.5000',  name: '5,000 AI Credits',  description: 'One-time AI Credit top-up for hosted models and web search', translationKey: ADDON_KEYS['addon.ai_credits.5000'],  usdPrice: 7.00,  type: 'one_time', perAgent: false, aiCredits: 5000 },
  { key: 'addon.ai_credits.10000', name: '10,000 AI Credits', description: 'One-time AI Credit top-up for hosted models and web search', translationKey: ADDON_KEYS['addon.ai_credits.10000'], usdPrice: 13.00, type: 'one_time', perAgent: false, aiCredits: 10000 },
  { key: 'addon.ai_credits.25000', name: '25,000 AI Credits', description: 'One-time AI Credit top-up for hosted models and web search', translationKey: ADDON_KEYS['addon.ai_credits.25000'], usdPrice: 30.00, type: 'one_time', perAgent: false, aiCredits: 25000 },
  { key: 'addon.ai_credits.50000', name: '50,000 AI Credits', description: 'One-time AI Credit top-up for hosted models and web search', translationKey: ADDON_KEYS['addon.ai_credits.50000'], usdPrice: 60.00, type: 'one_time', perAgent: false, aiCredits: 50000 },
];

// Helper: get addon config
export function getAddon(key: AddonKey): typeof ADDONS[number] | undefined {
  return ADDONS.find(a => a.key === key);
}

// --- Retired Plugin Limits per Tier ---

export const PLUGIN_LIMITS: Record<UserTierKey, number | null> = {
  free: null,
  starter: null,
  pro: null,
  business: null,
  founding_member: null,
};

// --- BYOK Providers & Models ---

export const BYOK_PROVIDERS: Array<{
  key: import('../types/index.js').BYOKProvider;
  name: string;
  description: string;
  requiresApiKey: boolean;
  requiresBaseUrl: boolean;
  defaultBaseUrl?: string;
  models: Array<{ id: string; name: string; context?: string }>;
}> = [
  {
    key: 'groq',
    name: 'Groq',
    description: 'BYOK-only ultra-fast inference',
    requiresApiKey: true,
    requiresBaseUrl: false,
    // Note: gpt-oss models (20b/120b) are intentionally NOT listed here.
    // They emit function-call intent as literal JSON inside message.content
    // instead of OpenAI-native tool_calls, breaking every agent framework
    // (OpenClaw / Hermes) silently. See AUDIT_REPORT.md
    // and docs/research/hermes-reference.md §3 for the full post-mortem.
    // Hosted Hatcher defaults are UsePod/OpenRouter-backed; Groq remains a BYOK-only option.
    models: [
      { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B', context: '128K' },
      { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B', context: '128K' },
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', context: '128K' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', context: '128K' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', context: '32K' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B', context: '8K' },
    ],
  },
  {
    key: 'openai',
    name: 'OpenAI',
    description: 'GPT-4o, o3, and more',
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', context: '128K' },
      { id: 'gpt-4o-mini', name: 'GPT-4o mini', context: '128K' },
      { id: 'gpt-4.1', name: 'GPT-4.1', context: '1M' },
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 mini', context: '1M' },
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 nano', context: '1M' },
      { id: 'o3-mini', name: 'o3-mini', context: '200K' },
      { id: 'o4-mini', name: 'o4-mini', context: '200K' },
    ],
  },
  {
    key: 'anthropic',
    name: 'Anthropic',
    description: 'Claude Sonnet, Haiku, Opus',
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', context: '1M' },
      { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', context: '200K' },
      { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', context: '200K' },
    ],
  },
  {
    key: 'google',
    name: 'Google',
    description: 'Gemini 2.5 Pro, Flash',
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', context: '1M' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', context: '1M' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', context: '1M' },
    ],
  },
  {
    key: 'xai',
    name: 'xAI',
    description: 'Grok models',
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: 'grok-3', name: 'Grok 3', context: '128K' },
      { id: 'grok-3-mini', name: 'Grok 3 Mini', context: '128K' },
      { id: 'grok-2', name: 'Grok 2', context: '128K' },
    ],
  },
  {
    key: 'openrouter',
    name: 'OpenRouter',
    description: 'Access 200+ models via one API key',
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: 'openai/gpt-4o', name: 'GPT-4o (via OpenRouter)' },
      { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6 (via OpenRouter)' },
      { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro (via OpenRouter)' },
      { id: 'meta-llama/llama-3.3-70b', name: 'Llama 3.3 70B (via OpenRouter)' },
    ],
  },
  // Ollama removed — requires local server, incompatible with Docker-hosted agents
];

/** Get provider metadata by key */
export function getBYOKProvider(key: string): typeof BYOK_PROVIDERS[number] | undefined {
  return BYOK_PROVIDERS.find(p => p.key === key);
}

// --- Framework ---

export interface FrameworkMeta {
  key: AgentFramework;
  name: string;
  description: string;
  /** Stable i18n key — frontend resolves via t(`${translationKey}.name`) / t(`${translationKey}.description`) */
  translationKey: string;
  dockerImage: string;
  features: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string;
  docsUrl: string;
  port: number;
  healthEndpoint: string;
  chatEndpoint: string;
}

export const FRAMEWORKS: Record<AgentFramework, FrameworkMeta> = {
  openclaw: {
    key: 'openclaw',
    name: 'OpenClaw',
    description: 'Self-hosted AI assistant with 3,200+ community skills, multi-channel messaging gateway, and autonomous task execution.',
    translationKey: FRAMEWORK_KEYS.openclaw,
    complexity: 'advanced',
    bestFor: 'Autonomous agents, task automation, multi-channel messaging',
    dockerImage: 'hatcher/openclaw:latest',
    port: 2138,
    healthEndpoint: '/api/health',
    chatEndpoint: '/api/chat',
    features: ['3,200+ community skills', 'Multi-channel gateway', 'Browser automation', 'Cron jobs & triggers'],
    docsUrl: 'https://docs.openclaw.ai',
  },
  hermes: {
    key: 'hermes',
    name: 'Hermes Agent',
    description: 'Autonomous AI agent by Nous Research with persistent memory, 40+ tools, skills system, and multi-platform messaging gateway.',
    translationKey: FRAMEWORK_KEYS.hermes,
    complexity: 'intermediate',
    bestFor: 'Learning agents, persistent memory, research, multi-provider LLM support',

    dockerImage: 'hatcher/hermes:latest',
    port: 8642,
    healthEndpoint: '/health',
    chatEndpoint: '/v1/chat/completions',
    features: ['Persistent memory & learning', '40+ built-in tools', 'Skills system', 'Multi-provider LLM support'],
    docsUrl: 'https://hermes-agent.nousresearch.com',
  },
  custom: {
    key: 'custom',
    name: 'Custom Docker',
    description: 'User-supplied Docker image for advanced agent runtimes.',
    translationKey: FRAMEWORK_KEYS.custom,
    complexity: 'advanced',
    bestFor: 'Advanced teams bringing their own runtime image',
    dockerImage: 'custom',
    port: 3000,
    healthEndpoint: '/health',
    chatEndpoint: '/chat',
    features: ['Bring your own Docker image', 'Custom runtime contract'],
    docsUrl: 'https://docs.hatcher.host/frameworks',
  },
};

// --- Solana Config ---

export const SOLANA_CONFIG = {
  networks: {
    mainnet: 'mainnet-beta',
    devnet: 'devnet',
    testnet: 'testnet',
  },
  minSolBalance: 0.001,
  authNonceExpirySecs: 300,
} as const;

// --- Legacy Compat: PRICING ---
// Referenced by features.ts and tests. Will be refactored in features route rewrite.

export const PRICING = {
  free: { usdPrice: 0, label: 'Free', description: 'Free baseline - 1 agent, hosted UsePod/OpenRouter via AI Credits, BYOK always free' },
  paid: { usdPrice: 0, label: 'A la carte', type: 'one_time' as const, description: 'Unlock features individually with tokens' },
};

// --- Agent Statuses ---

export const AGENT_STATUSES = ['active', 'sleeping', 'paused', 'archived', 'error', 'killed', 'restarting', 'stopping'] as const;

export const AGENT_STATUS_CONFIG: Record<AgentStatus, { label: string; translationKey: string; color: string; pulse: boolean }> = {
  active:     { label: 'Active',     translationKey: AGENT_STATUS_KEYS.active,     color: 'bg-green-400',  pulse: true },
  sleeping:   { label: 'Sleeping',   translationKey: AGENT_STATUS_KEYS.sleeping,   color: 'bg-blue-400',   pulse: false },
  paused:     { label: 'Paused',     translationKey: AGENT_STATUS_KEYS.paused,     color: 'bg-red-400',    pulse: false },
  archived:   { label: 'Archived',   translationKey: AGENT_STATUS_KEYS.archived,   color: 'bg-zinc-400',   pulse: false },
  killed:     { label: 'Killed',     translationKey: AGENT_STATUS_KEYS.killed,     color: 'bg-gray-500',   pulse: false },
  error:      { label: 'Error',      translationKey: AGENT_STATUS_KEYS.error,      color: 'bg-red-500',    pulse: false },
  restarting: { label: 'Restarting', translationKey: AGENT_STATUS_KEYS.restarting, color: 'bg-cyan-400',   pulse: true },
  stopping:   { label: 'Stopping',   translationKey: AGENT_STATUS_KEYS.stopping,   color: 'bg-yellow-400', pulse: true },
};
