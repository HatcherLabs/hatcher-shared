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

// src/i18n/keys.ts
var TIER_KEYS = {
  free: "shared.tiers.free",
  starter: "shared.tiers.starter",
  pro: "shared.tiers.pro",
  business: "shared.tiers.business",
  founding_member: "shared.tiers.founding_member"
};
var ADDON_KEYS = {
  "addon.agents.1": "shared.addons.agents_plus1",
  "addon.agents.3": "shared.addons.agents_plus3",
  "addon.agents.5": "shared.addons.agents_plus5",
  "addon.agents.10": "shared.addons.agents_plus10",
  "addon.always_on": "shared.addons.always_on",
  "addon.messages.20": "shared.addons.messages_plus20",
  "addon.messages.50": "shared.addons.messages_plus50",
  "addon.messages.100": "shared.addons.messages_plus100",
  "addon.messages.200": "shared.addons.messages_plus200",
  "addon.searches.25": "shared.addons.searches_plus25",
  "addon.searches.50": "shared.addons.searches_plus50",
  "addon.file_manager": "shared.addons.file_manager",
  "addon.full_logs": "shared.addons.full_logs",
  "addon.extra_plugins": "shared.addons.plugins_plus10"
};
var FRAMEWORK_KEYS = {
  openclaw: "shared.frameworks.openclaw",
  hermes: "shared.frameworks.hermes",
  elizaos: "shared.frameworks.elizaos",
  milady: "shared.frameworks.milady"
};
var AGENT_STATUS_KEYS = {
  active: "shared.agentStatus.active",
  sleeping: "shared.agentStatus.sleeping",
  paused: "shared.agentStatus.paused",
  error: "shared.agentStatus.error",
  killed: "shared.agentStatus.killed",
  restarting: "shared.agentStatus.restarting",
  stopping: "shared.agentStatus.stopping"
};

// src/constants/index.ts
var TIERS = {
  free: {
    key: "free",
    name: "Free",
    translationKey: TIER_KEYS.free,
    usdPrice: 0,
    includedAgents: 1,
    messagesPerDay: 20,
    // shared across all agents in the account
    searchesPerDay: 3,
    cpuLimit: 0.5,
    memoryMb: 1024,
    storageMb: 50,
    autoSleep: true,
    autoSleepMinutes: 60,
    // 1 hour idle
    fileManager: false,
    // available as per-agent addon
    fullLogs: false,
    // available as account addon
    prioritySupport: false,
    maxPlugins: 3
    // plugins + skills share the same cap
  },
  starter: {
    key: "starter",
    name: "Starter",
    translationKey: TIER_KEYS.starter,
    usdPrice: 6.99,
    includedAgents: 1,
    messagesPerDay: 50,
    // BYOK = unlimited
    searchesPerDay: 10,
    cpuLimit: 1,
    memoryMb: 1536,
    storageMb: 150,
    autoSleep: true,
    autoSleepMinutes: 240,
    // 4 hours idle
    fileManager: false,
    // available as per-agent addon
    fullLogs: false,
    // available as account addon
    prioritySupport: false,
    maxPlugins: 10
  },
  pro: {
    key: "pro",
    name: "Pro",
    translationKey: TIER_KEYS.pro,
    usdPrice: 19.99,
    includedAgents: 3,
    messagesPerDay: 100,
    // BYOK = unlimited
    searchesPerDay: 50,
    cpuLimit: 1.5,
    memoryMb: 2048,
    storageMb: 500,
    autoSleep: true,
    autoSleepMinutes: 720,
    // 12 hours idle — buy Always On addon for 24/7
    fileManager: false,
    // available as per-agent addon
    fullLogs: false,
    // available as account addon
    prioritySupport: false,
    maxPlugins: 25
  },
  business: {
    key: "business",
    name: "Business",
    translationKey: TIER_KEYS.business,
    usdPrice: 49.99,
    includedAgents: 10,
    messagesPerDay: 300,
    // BYOK = unlimited
    searchesPerDay: 200,
    cpuLimit: 2,
    memoryMb: 3072,
    storageMb: 1024,
    autoSleep: false,
    // always-on included
    autoSleepMinutes: 0,
    fileManager: true,
    // included for all agents
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: 50
  },
  founding_member: {
    key: "founding_member",
    name: "Founding Member",
    translationKey: TIER_KEYS.founding_member,
    usdPrice: 99,
    includedAgents: 10,
    // was 25 — capped like Business
    messagesPerDay: 300,
    // same as Business (not unlimited)
    searchesPerDay: 200,
    // same as Business
    cpuLimit: 2,
    memoryMb: 4096,
    // bonus: 4GB vs Business 3GB
    storageMb: 2048,
    // bonus: 2GB vs Business 1GB
    autoSleep: false,
    autoSleepMinutes: 0,
    fileManager: true,
    fullLogs: true,
    prioritySupport: true,
    maxPlugins: 50
  }
};
var TIER_ORDER = ["free", "starter", "pro", "business", "founding_member"];
var FOUNDING_MEMBER_MAX_SLOTS = 20;
function getTier(key) {
  const legacyMap = { basic: "starter", unlimited: "starter" };
  const normalized = legacyMap[key] ?? key;
  return TIERS[normalized] ?? TIERS.free;
}
var ADDONS = [
  // ── Agent capacity (account-level, stackable) ────────────────
  { key: "addon.agents.1", name: "+1 Agent", description: "1 additional agent slot", translationKey: ADDON_KEYS["addon.agents.1"], usdPrice: 2.99, type: "subscription", perAgent: false, extraAgents: 1 },
  { key: "addon.agents.3", name: "+3 Agents", description: "3 additional agent slots", translationKey: ADDON_KEYS["addon.agents.3"], usdPrice: 6.99, type: "subscription", perAgent: false, extraAgents: 3 },
  { key: "addon.agents.5", name: "+5 Agents", description: "5 additional agent slots", translationKey: ADDON_KEYS["addon.agents.5"], usdPrice: 11.99, type: "subscription", perAgent: false, extraAgents: 5 },
  { key: "addon.agents.10", name: "+10 Agents", description: "10 additional agent slots", translationKey: ADDON_KEYS["addon.agents.10"], usdPrice: 19.99, type: "subscription", perAgent: false, extraAgents: 10 },
  // ── Always On (per-agent) ────────────────────────────────────
  { key: "addon.always_on", name: "Always On", description: "Keep this agent running 24/7", translationKey: ADDON_KEYS["addon.always_on"], usdPrice: 7.99, type: "subscription", perAgent: true },
  // ── Extra messages (account-level, stackable) ────────────────
  { key: "addon.messages.20", name: "+20 msg/day", description: "20 extra messages per day", translationKey: ADDON_KEYS["addon.messages.20"], usdPrice: 1.99, type: "subscription", perAgent: false, extraMessages: 20 },
  { key: "addon.messages.50", name: "+50 msg/day", description: "50 extra messages per day", translationKey: ADDON_KEYS["addon.messages.50"], usdPrice: 3.99, type: "subscription", perAgent: false, extraMessages: 50 },
  { key: "addon.messages.100", name: "+100 msg/day", description: "100 extra messages per day", translationKey: ADDON_KEYS["addon.messages.100"], usdPrice: 5.99, type: "subscription", perAgent: false, extraMessages: 100 },
  { key: "addon.messages.200", name: "+200 msg/day", description: "200 extra messages per day", translationKey: ADDON_KEYS["addon.messages.200"], usdPrice: 9.99, type: "subscription", perAgent: false, extraMessages: 200 },
  // ── Extra searches (account-level, stackable) ────────────────
  { key: "addon.searches.25", name: "+25 searches/day", description: "25 extra web searches per day", translationKey: ADDON_KEYS["addon.searches.25"], usdPrice: 3.99, type: "subscription", perAgent: false, extraSearches: 25 },
  { key: "addon.searches.50", name: "+50 searches/day", description: "50 extra web searches per day", translationKey: ADDON_KEYS["addon.searches.50"], usdPrice: 6.99, type: "subscription", perAgent: false, extraSearches: 50 },
  // ── File Manager (per-agent, permanent) ──────────────────────
  { key: "addon.file_manager", name: "File Manager", description: "Browse, edit & download workspace files", translationKey: ADDON_KEYS["addon.file_manager"], usdPrice: 4.99, type: "one_time", perAgent: true },
  // ── Full Logs (per-agent) ────────────────────────────────────
  //    Logs are written per container → this unlock is naturally
  //    scoped to one agent, not the whole account.
  { key: "addon.full_logs", name: "Full Logs", description: "Unlock full log viewer for this agent", translationKey: ADDON_KEYS["addon.full_logs"], usdPrice: 2.99, type: "subscription", perAgent: true },
  // ── Extra plugins+skills (per-agent, stackable) ──────────────
  //    Plugin limit is enforced per-agent in PLUGIN_LIMITS, so a
  //    stackable +10 slots naturally applies to the agent you pay
  //    for. Price bumped to reflect per-agent scope and what
  //    competitors charge for comparable capacity.
  { key: "addon.extra_plugins", name: "+10 Plugins", description: "10 extra plugin+skill slots for this agent", translationKey: ADDON_KEYS["addon.extra_plugins"], usdPrice: 5.99, type: "subscription", perAgent: true, extraPlugins: 10 }
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
    // Note: gpt-oss models (20b/120b) are intentionally NOT listed here.
    // They emit function-call intent as literal JSON inside message.content
    // instead of OpenAI-native tool_calls, breaking every agent framework
    // (OpenClaw / Hermes / ElizaOS / Milady) silently. See AUDIT_REPORT.md
    // and docs/research/hermes-reference.md §3 for the full post-mortem.
    // Llama 4 Scout is the default across the platform.
    models: [
      { id: "meta-llama/llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B (Recommended)", context: "128K" },
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
    translationKey: FRAMEWORK_KEYS.openclaw,
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
    translationKey: FRAMEWORK_KEYS.hermes,
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
    translationKey: FRAMEWORK_KEYS.elizaos,
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
    translationKey: FRAMEWORK_KEYS.milady,
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
  active: { label: "Active", translationKey: AGENT_STATUS_KEYS.active, color: "bg-green-400", pulse: true },
  sleeping: { label: "Sleeping", translationKey: AGENT_STATUS_KEYS.sleeping, color: "bg-blue-400", pulse: false },
  paused: { label: "Paused", translationKey: AGENT_STATUS_KEYS.paused, color: "bg-red-400", pulse: false },
  killed: { label: "Killed", translationKey: AGENT_STATUS_KEYS.killed, color: "bg-gray-500", pulse: false },
  error: { label: "Error", translationKey: AGENT_STATUS_KEYS.error, color: "bg-red-500", pulse: false },
  restarting: { label: "Restarting", translationKey: AGENT_STATUS_KEYS.restarting, color: "bg-cyan-400", pulse: true },
  stopping: { label: "Stopping", translationKey: AGENT_STATUS_KEYS.stopping, color: "bg-yellow-400", pulse: true }
};
export {
  ADDONS,
  ADDON_KEYS,
  AGENT_STATUSES,
  AGENT_STATUS_CONFIG,
  AGENT_STATUS_KEYS,
  BYOK_PROVIDERS,
  BYOK_PROVIDER_ENV_VARS,
  FOUNDING_MEMBER_MAX_SLOTS,
  FRAMEWORKS,
  FRAMEWORK_KEYS,
  PLUGIN_LIMITS,
  PRICING,
  SOLANA_CONFIG,
  TIERS,
  TIER_KEYS,
  TIER_ORDER,
  err,
  getAddon,
  getBYOKProvider,
  getTier,
  ok
};
