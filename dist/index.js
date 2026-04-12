"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ADDONS: () => ADDONS,
  AGENT_STATUSES: () => AGENT_STATUSES,
  AGENT_STATUS_CONFIG: () => AGENT_STATUS_CONFIG,
  BYOK_PROVIDERS: () => BYOK_PROVIDERS,
  BYOK_PROVIDER_ENV_VARS: () => BYOK_PROVIDER_ENV_VARS,
  FRAMEWORKS: () => FRAMEWORKS,
  PLUGIN_LIMITS: () => PLUGIN_LIMITS,
  PRICING: () => PRICING,
  SOLANA_CONFIG: () => SOLANA_CONFIG,
  TIERS: () => TIERS,
  TIER_ORDER: () => TIER_ORDER,
  err: () => err,
  getAddon: () => getAddon,
  getBYOKProvider: () => getBYOKProvider,
  getTier: () => getTier,
  ok: () => ok
});
module.exports = __toCommonJS(index_exports);

// src/types/index.ts
function ok(data) {
  return { success: true, data };
}
function err(error) {
  return { success: false, error };
}
var BYOK_PROVIDER_ENV_VARS = {
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  groq: "GROQ_API_KEY",
  xai: "XAI_API_KEY",
  openrouter: "OPENROUTER_API_KEY"
};

// src/constants/index.ts
var TIERS = {
  free: {
    key: "free",
    name: "Free",
    usdPrice: 0,
    includedAgents: 1,
    messagesPerDay: 10,
    cpuLimit: 0.5,
    memoryMb: 1024,
    storageMb: 100,
    autoSleep: true,
    autoSleepMinutes: 10,
    fileManager: false,
    fullLogs: false,
    prioritySupport: false,
    maxPlugins: 3
  },
  starter: {
    key: "starter",
    name: "Starter",
    usdPrice: 4.99,
    includedAgents: 1,
    messagesPerDay: 50,
    // 50/day with our key, BYOK = unlimited
    cpuLimit: 1,
    memoryMb: 1536,
    storageMb: 200,
    autoSleep: true,
    autoSleepMinutes: 120,
    fileManager: false,
    fullLogs: false,
    prioritySupport: false,
    maxPlugins: 10
  },
  pro: {
    key: "pro",
    name: "Pro",
    usdPrice: 14.99,
    includedAgents: 3,
    messagesPerDay: 200,
    // 200/day per agent with our key, BYOK = unlimited
    cpuLimit: 1.5,
    memoryMb: 2048,
    storageMb: 500,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: false,
    // Available as per-agent unlock in File Manager tab
    fullLogs: true,
    prioritySupport: false,
    maxPlugins: 25
  },
  business: {
    key: "business",
    name: "Business",
    usdPrice: 39.99,
    includedAgents: 10,
    messagesPerDay: 500,
    // 500/day per agent with our key, BYOK = unlimited
    cpuLimit: 2,
    memoryMb: 3072,
    storageMb: 1024,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    // Included for all agents
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: 50
  },
  founding_member: {
    key: "founding_member",
    name: "Founding Member",
    usdPrice: 99,
    includedAgents: 25,
    messagesPerDay: 0,
    // Unlimited
    cpuLimit: 2,
    memoryMb: 4096,
    storageMb: 2048,
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: 50
  }
};
var TIER_ORDER = ["free", "starter", "pro", "business", "founding_member"];
function getTier(key) {
  const legacyMap = { basic: "starter", unlimited: "starter" };
  const normalized = legacyMap[key] ?? key;
  return TIERS[normalized] ?? TIERS.free;
}
var ADDONS = [
  { key: "addon.agents.3", name: "+3 Agents", description: "3 additional agents", usdPrice: 3.99, type: "subscription", perAgent: false, extraAgents: 3 },
  { key: "addon.agents.10", name: "+10 Agents", description: "10 additional agents", usdPrice: 9.99, type: "subscription", perAgent: false, extraAgents: 10 },
  { key: "addon.always_on", name: "Always On", description: "Keep agent running 24/7", usdPrice: 4.99, type: "subscription", perAgent: true },
  { key: "addon.messages.200", name: "+200 msg/day", description: "200 extra messages per day", usdPrice: 2.99, type: "subscription", perAgent: true },
  { key: "addon.file_manager", name: "File Manager", description: "Browse, edit & download files", usdPrice: 4.99, type: "one_time", perAgent: true }
];
function getAddon(key) {
  return ADDONS.find((a) => a.key === key);
}
var PLUGIN_LIMITS = {
  free: 3,
  starter: 10,
  pro: 25,
  business: 50,
  founding_member: 50
};
var BYOK_PROVIDERS = [
  {
    key: "groq",
    name: "Groq",
    description: "Ultra-fast inference (free tier available)",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B (Recommended)", context: "128K" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", context: "128K" },
      { id: "meta-llama/llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B", context: "128K" },
      { id: "meta-llama/llama-4-maverick-17b-128e-instruct", name: "Llama 4 Maverick 17B", context: "128K" },
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", context: "128K" },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", context: "128K" },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", context: "32K" },
      { id: "gemma2-9b-it", name: "Gemma 2 9B", context: "8K" }
    ]
  },
  {
    key: "openai",
    name: "OpenAI",
    description: "GPT-4o, o3, and more",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "gpt-4o", name: "GPT-4o", context: "128K" },
      { id: "gpt-4o-mini", name: "GPT-4o mini", context: "128K" },
      { id: "gpt-4.1", name: "GPT-4.1", context: "1M" },
      { id: "gpt-4.1-mini", name: "GPT-4.1 mini", context: "1M" },
      { id: "gpt-4.1-nano", name: "GPT-4.1 nano", context: "1M" },
      { id: "o3-mini", name: "o3-mini", context: "200K" },
      { id: "o4-mini", name: "o4-mini", context: "200K" }
    ]
  },
  {
    key: "anthropic",
    name: "Anthropic",
    description: "Claude Sonnet, Haiku, Opus",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", context: "200K" },
      { id: "claude-opus-4-6", name: "Claude Opus 4.6", context: "200K" },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", context: "200K" }
    ]
  },
  {
    key: "google",
    name: "Google",
    description: "Gemini 2.5 Pro, Flash",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", context: "1M" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", context: "1M" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", context: "1M" }
    ]
  },
  {
    key: "xai",
    name: "xAI",
    description: "Grok models",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "grok-3", name: "Grok 3", context: "128K" },
      { id: "grok-3-mini", name: "Grok 3 Mini", context: "128K" },
      { id: "grok-2", name: "Grok 2", context: "128K" }
    ]
  },
  {
    key: "openrouter",
    name: "OpenRouter",
    description: "Access 200+ models via one API key",
    requiresApiKey: true,
    requiresBaseUrl: false,
    models: [
      { id: "openai/gpt-4o", name: "GPT-4o (via OpenRouter)" },
      { id: "anthropic/claude-sonnet-4-6", name: "Claude Sonnet 4.6 (via OpenRouter)" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro (via OpenRouter)" },
      { id: "meta-llama/llama-3.3-70b", name: "Llama 3.3 70B (via OpenRouter)" }
    ]
  }
  // Ollama removed — requires local server, incompatible with Docker-hosted agents
];
function getBYOKProvider(key) {
  return BYOK_PROVIDERS.find((p) => p.key === key);
}
var FRAMEWORKS = {
  openclaw: {
    key: "openclaw",
    name: "OpenClaw",
    description: "Self-hosted AI assistant with 3,200+ community skills, multi-channel messaging gateway, and autonomous task execution.",
    complexity: "advanced",
    bestFor: "Autonomous agents, task automation, multi-channel messaging",
    dockerImage: "hatcher/openclaw:latest",
    port: 2138,
    healthEndpoint: "/api/health",
    chatEndpoint: "/api/chat",
    features: ["3,200+ community skills", "Multi-channel gateway", "Browser automation", "Cron jobs & triggers"],
    docsUrl: "https://docs.openclaw.ai"
  },
  hermes: {
    key: "hermes",
    name: "Hermes Agent",
    description: "Autonomous AI agent by Nous Research with persistent memory, 40+ tools, skills system, and multi-platform messaging gateway.",
    complexity: "intermediate",
    bestFor: "Learning agents, persistent memory, research, multi-provider LLM support",
    dockerImage: "hatcher/hermes:latest",
    port: 8642,
    healthEndpoint: "/health",
    chatEndpoint: "/v1/chat/completions",
    features: ["Persistent memory & learning", "40+ built-in tools", "Skills system", "Multi-provider LLM support"],
    docsUrl: "https://hermes-agent.nousresearch.com"
  },
  elizaos: {
    key: "elizaos",
    name: "ElizaOS",
    description: "Open-source AI agent framework with character-driven personas, plugin ecosystem, and multi-client support for social and messaging platforms.",
    complexity: "intermediate",
    bestFor: "Character-driven agents, social media bots, community engagement",
    dockerImage: "hatcher/elizaos:latest",
    port: 3e3,
    healthEndpoint: "/health",
    chatEndpoint: "/api/chat",
    features: ["Character personas", "Plugin ecosystem", "Multi-client support", "Social media integration"],
    docsUrl: "https://elizaos.github.io/eliza/"
  },
  milady: {
    key: "milady",
    name: "Milady",
    description: "Lightweight, personality-first AI agent framework designed for expressive, culturally-aware conversational agents with modular capabilities.",
    complexity: "beginner",
    bestFor: "Personality-driven bots, community engagement, lightweight deployment",
    dockerImage: "hatcher/milady:latest",
    port: 8080,
    healthEndpoint: "/health",
    chatEndpoint: "/api/chat",
    features: ["Personality-first design", "Modular capabilities", "Lightweight footprint", "Cultural awareness"],
    docsUrl: "https://docs.milady.gg"
  }
};
var SOLANA_CONFIG = {
  networks: {
    mainnet: "mainnet-beta",
    devnet: "devnet",
    testnet: "testnet"
  },
  minSolBalance: 1e-3,
  authNonceExpirySecs: 300
};
var PRICING = {
  free: { usdPrice: 0, label: "Free", description: "Free baseline \u2014 1 agent, Groq LLM, BYOK always free" },
  paid: { usdPrice: 0, label: "A la carte", type: "one_time", description: "Unlock features individually with tokens" }
};
var AGENT_STATUSES = ["active", "sleeping", "paused", "error", "killed", "restarting", "stopping"];
var AGENT_STATUS_CONFIG = {
  active: { label: "Active", color: "bg-green-400", pulse: true },
  sleeping: { label: "Sleeping", color: "bg-blue-400", pulse: false },
  paused: { label: "Paused", color: "bg-red-400", pulse: false },
  killed: { label: "Killed", color: "bg-gray-500", pulse: false },
  error: { label: "Error", color: "bg-red-500", pulse: false },
  restarting: { label: "Restarting", color: "bg-cyan-400", pulse: true },
  stopping: { label: "Stopping", color: "bg-yellow-400", pulse: true }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ADDONS,
  AGENT_STATUSES,
  AGENT_STATUS_CONFIG,
  BYOK_PROVIDERS,
  BYOK_PROVIDER_ENV_VARS,
  FRAMEWORKS,
  PLUGIN_LIMITS,
  PRICING,
  SOLANA_CONFIG,
  TIERS,
  TIER_ORDER,
  err,
  getAddon,
  getBYOKProvider,
  getTier,
  ok
});
