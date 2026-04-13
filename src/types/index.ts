// ============================================================
// Shared TypeScript Types for Hatcher
// ============================================================

// --- API Response Wrapper ---

export function ok<T>(data: T): { success: true; data: T } {
  return { success: true, data };
}

export function err(error: string): { success: false; error: string } {
  return { success: false, error };
}

// --- User ---


export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string | null;
  walletAddress: string | null;
  apiKey: string;
  referralCode: string | null;
  hatchCredits: number;
  tier: UserTierKey;
  isAdmin: boolean;
  createdAt: Date;
}

// --- Agent ---

export type AgentStatus = 'active' | 'sleeping' | 'paused' | 'killed' | 'error' | 'restarting' | 'stopping';
export type AgentFramework = 'openclaw' | 'hermes' | 'elizaos' | 'milady';
export type Framework = AgentFramework;

// ── OpenClaw Native Config Types (matches real openclaw.json) ──

/** All valid OpenClaw channel identifiers */
export type OpenClawChannelName =
  // Main platforms
  | 'telegram' | 'discord' | 'whatsapp' | 'slack'
  | 'signal'
  // Extra platforms
  | 'irc' | 'googlechat' | 'msteams' | 'mattermost'
  | 'line' | 'matrix' | 'nostr' | 'twitch'
  | 'feishu' | 'nextcloud-talk' | 'synology-chat'
  | 'tlon' | 'zalo' | 'bluebubbles';

/** Per-channel behavior settings (stored in config_json.channelSettings) */
export interface ChannelSettings {
  dmPolicy?: 'open' | 'allowlist' | 'disabled';
  groupPolicy?: 'open' | 'mention' | 'disabled';
  allowFrom?: string[];
  groupAllowFrom?: string[];
  streaming?: 'partial' | 'full' | 'off';
}

/**
 * OpenClaw channel config — flat structure.
 * Credentials and settings live directly on the channel object.
 */
export interface OpenClawChannel {
  enabled: boolean;
  // Common settings
  dmPolicy?: string;
  groupPolicy?: string;
  allowFrom?: string[];
  groupAllowFrom?: string[];
  streaming?: string;
  // Credentials (vary per channel)
  botToken?: string;
  token?: string;
  appToken?: string;
  account?: string;
  [key: string]: unknown;
}

export interface OpenClawBinding {
  agentId: string;
  match: {
    channel: string;
    [key: string]: unknown;
  };
}

export interface OpenClawMessages {
  tts?: {
    provider?: string;
    voice?: string;
    elevenlabs?: { apiKey?: string };
    openai?: { apiKey?: string };
    edge?: Record<string, unknown>;
  };
}

export interface OpenClawSkillsConfig {
  load?: { watch?: boolean };
}

/** The real openclaw.json structure */
export interface OpenClawNativeConfig {
  gateway: {
    port?: number;
    bind?: string;
    auth?: {
      mode?: string;
      token?: string;
    };
    controlUi?: {
      enabled?: boolean;
      allowedOrigins?: string[];
      dangerouslyAllowHostHeaderOriginFallback?: boolean;
    };
    http?: {
      endpoints?: {
        chatCompletions?: { enabled?: boolean };
        responses?: { enabled?: boolean };
      };
    };
  };
  models: {
    mode?: string;
    providers?: Record<string, {
      apiKey?: string;
      baseUrl?: string;
      api?: string;
      models?: Array<{ id: string; name: string }>;
    }>;
  };
  agents: {
    defaults?: Partial<{
      id?: string;
      name?: string;
      default?: boolean;
      workspace?: string;
      model?: {
        primary: string;
        fallback?: string[];
      };
      maxConcurrent?: number;
      compaction?: { mode?: string };
      subagents?: { maxConcurrent?: number };
    }>;
    list?: Array<{
      id?: string;
      name?: string;
      default?: boolean;
      workspace?: string;
      model?: {
        primary: string;
        fallback?: string[];
      };
      maxConcurrent?: number;
      compaction?: { mode?: string };
      subagents?: { maxConcurrent?: number };
    }>;
  };
  channels: Partial<Record<OpenClawChannelName, OpenClawChannel>>;
  bindings: OpenClawBinding[];
  cron?: {
    webhookToken?: string;
  };
  hooks?: {
    path?: string;
    allowedAgentIds?: string[];
  };
  messages?: OpenClawMessages;
  session?: {
    dmScope?: string;
  };
  skills?: OpenClawSkillsConfig;
  tools?: Record<string, unknown>;
  plugins?: {
    allow?: string[];
    deny?: string[];
    entries?: Record<string, unknown>;
  };
  talk?: Record<string, unknown>;
  meta?: {
    lastTouchedVersion?: string;
    lastTouchedAt?: string;
  };
}

/**
 * OpenClaw agent configuration — Hatcher's internal representation.
 * Used to store user intent in config_json. The adapter converts this
 * into a full OpenClawNativeConfig at container start time.
 */
export interface OpenClawConfig {
  name: string;
  model?: string;
  provider?: string;
  skills?: string[];
  systemPrompt?: string;
  triggers?: Array<{
    type: string;
    config: Record<string, unknown>;
  }>;
  workflows?: Array<{
    name: string;
    steps: Array<{ skill: string; config?: Record<string, unknown> }>;
  }>;
}

// --- Hermes Agent Config (Nous Research) ---

export interface HermesConfig {
  name: string;
  model?: string;
  provider?: string;
  systemPrompt?: string;
  memory?: {
    enabled?: boolean;
    backend?: 'sqlite' | 'postgres' | 'redis';
  };
  tools?: string[];
  skills?: string[];
  channels?: Partial<Record<'telegram' | 'discord' | 'slack' | 'whatsapp', {
    enabled: boolean;
    token?: string;
    [key: string]: unknown;
  }>>;
}

// --- Milady Config ---

export interface MiladyConfig {
  name: string;
  model?: string;
  provider?: string;
  systemPrompt?: string;
  persona?: {
    name?: string;
    description?: string;
    traits?: string[];
    voice?: string;
  };
  modules?: string[];
  channels?: Partial<Record<'telegram' | 'discord' | 'twitter', {
    enabled: boolean;
    token?: string;
    [key: string]: unknown;
  }>>;
}

// --- Agent Config (discriminated union for all frameworks) ---

export type AgentConfig =
  | { framework: 'openclaw'; config: OpenClawConfig }
  | { framework: 'hermes'; config: HermesConfig }
  | { framework: 'elizaos'; config: Record<string, unknown> }
  | { framework: 'milady'; config: MiladyConfig };

export interface Agent {
  id: string;
  ownerId: string;
  name: string;
  slug: string | null;
  description: string | null;
  avatarUrl: string | null;
  framework: AgentFramework;
  template: string;
  status: AgentStatus;
  messageCount: number;
  containerId: string | null;
  containerToken: string | null;
  config: AgentConfig;
  teamId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Subscription Tiers ---

export type UserTierKey = 'free' | 'starter' | 'pro' | 'business' | 'founding_member';

export type AddonKey =
  | 'addon.agents.3'
  | 'addon.agents.10'
  | 'addon.always_on'
  | 'addon.messages.200'
  | 'addon.file_manager';

// FeatureKey is now tier + addon keys (kept for DB backward compat)
export type FeatureKey = UserTierKey | AddonKey;
export type FeatureType = 'subscription' | 'one_time';

export interface AgentFeature {
  id: string;
  agentId: string | null;
  userId: string;
  featureKey: FeatureKey;
  type: FeatureType;
  expiresAt: Date | null;
  txSignature: string;
  usdPrice: number;
  hatchAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Payments ---

export interface Payment {
  id: string;
  userId: string;
  agentId: string | null;
  featureKey: string;
  usdAmount: number;
  hatchAmount: number;
  txSignature: string;
  status: 'pending' | 'confirmed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

// --- BYOK (Bring Your Own Key) ---

export type BYOKProvider = 'openai' | 'anthropic' | 'google' | 'groq' | 'xai' | 'openrouter';

/** Maps each BYOK provider to the env var name expected by frameworks */
export const BYOK_PROVIDER_ENV_VARS: Record<BYOKProvider, string> = {
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  google: 'GOOGLE_API_KEY',
  groq: 'GROQ_API_KEY',
  xai: 'XAI_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
};

export interface BYOKConfig {
  provider: BYOKProvider;
  apiKey?: string;
  model?: string;
  baseUrl?: string; // for custom endpoints
}

// --- LLM ---

export type LLMProvider = BYOKProvider | 'hatcher_proxy';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMRequest {
  messages: LLMMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// --- WebSocket / Chat ---

export interface WSMessage {
  type: 'chat_message' | 'chat_response' | 'chat_token' | 'chat_done' | 'chat_error' | 'agent_status' | 'rate_limit';
  payload: unknown;
}

export interface ChatMessage {
  id: string;
  agentId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// --- Auth ---

export interface AuthChallenge {
  nonce: string;
  message: string;
  expiresAt: Date;
}

// --- Support Tickets ---

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketCategory = 'general' | 'billing' | 'technical' | 'feature_request' | 'bug_report';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface TicketMessage {
  role: 'user' | 'support' | 'system';
  content: string;
  timestamp: string; // ISO-8601
}

export interface SupportTicket {
  id: string;
  userId: string;
  agentId: string | null;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// --- Teams ---

export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  createdAt: Date;
  user?: {
    id: string;
    username: string;
    walletAddress: string | null;
    referralCode: string | null;
    createdAt: Date;
  };
}

// --- Custom Domains ---

export interface CustomDomain {
  id: string;
  agentId: string;
  domain: string;
  verified: boolean;
  sslStatus: 'pending' | 'active' | 'error';
  cnameTarget: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Referrals ---

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  rewardClaimed: boolean;
  createdAt: Date;
}

// --- Workflows (Visual Builder) ---

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'response';
  position: { x: number; y: number };
  data: {
    label: string;
    nodeType: string; // e.g. 'message_received', 'send_message', 'if_else'
    config: Record<string, unknown>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface Workflow {
  id: string;
  agentId: string;
  name: string;
  enabled: boolean;
  nodesJson: string;
  edgesJson: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Admin Stats ---

export interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  activeAgents: number;
  totalFeaturesUnlocked: number;
  totalPayments: number;
}

// --- WebSocket Chat ---

export interface WsChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface WsChatPayload {
  message: string;
  history?: WsChatMessage[];
}

// --- Plugin Install ---

export type PluginType = 'skill' | 'plugin';

export type PluginSource =
  | 'clawhub'          // OpenClaw/Hermes skills from ClawHub
  | 'clawhub-plugin'   // OpenClaw code plugins from ClawHub
  | 'elizaos-registry' // ElizaOS npm plugins
  | 'milady-skills'    // Milady skills from milady-ai/skills
  | 'github'           // Hermes Python plugins from GitHub repos
  | 'npm';             // OpenClaw plugins from npm registry

export type PluginStatus = 'pending' | 'installed' | 'failed' | 'uninstalled';

export interface AgentPluginRecord {
  id: string;
  agentId: string;
  pluginName: string;
  pluginType: PluginType;
  source: PluginSource;
  status: PluginStatus;
  version: string | null;
  metadata: Record<string, unknown> | null;
  installedAt: string | null;
  error: string | null;
}

export interface PluginRegistryEntry {
  name: string;
  type: PluginType;
  source: PluginSource;
  description: string;
  author?: string;
  stars?: number;
  installed: boolean;
}

export interface PluginLimits {
  used: number;
  max: number;
}
