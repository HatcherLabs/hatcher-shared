// ============================================================
// Shared TypeScript Types for Hatcher
// ============================================================

// --- API Response Wrapper ---

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ApiOk<T> = ApiResponse<T> & { success: true; data: T };
export type ApiErr = ApiResponse<never> & { success: false; error: string };

export function ok<T>(data: T): ApiOk<T> {
  return { success: true, data };
}

export function err(error: string): ApiErr {
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

export interface UserPublic {
  id: string;
  username: string;
  walletAddress: string | null;
  referralCode: string | null;
  createdAt: Date;
}

// --- Agent ---

export type AgentStatus = 'active' | 'sleeping' | 'paused' | 'killed' | 'error' | 'restarting' | 'stopping';
export type AgentFramework = 'openclaw' | 'hermes' | 'elizaos' | 'milady';
export type Framework = AgentFramework;

// ── OpenClaw Native Config Types (matches real openclaw.json) ──

export interface OpenClawGatewayAuth {
  mode?: string;
  token?: string;
}

export interface OpenClawGateway {
  port?: number;
  bind?: string;
  auth?: OpenClawGatewayAuth;
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
}

export interface OpenClawModelRef {
  primary: string;
  fallback?: string[];
}

export interface OpenClawModelProvider {
  apiKey?: string;
  baseUrl?: string;
  api?: string;
  models?: Array<{ id: string; name: string }>;
}

export interface OpenClawModels {
  mode?: string;
  providers?: Record<string, OpenClawModelProvider>;
}

export interface OpenClawAgentDef {
  id?: string;
  name?: string;
  default?: boolean;
  workspace?: string;
  model?: OpenClawModelRef;
  maxConcurrent?: number;
  compaction?: { mode?: string };
  subagents?: { maxConcurrent?: number };
}

export interface OpenClawAgents {
  defaults?: Partial<OpenClawAgentDef>;
  list?: OpenClawAgentDef[];
}

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

export interface OpenClawBinding {
  agentId: string;
  match: {
    channel: string;
    [key: string]: unknown;
  };
}

export interface OpenClawCron {
  webhookToken?: string;
}

export interface OpenClawHooks {
  path?: string;
  allowedAgentIds?: string[];
}

/** OpenClaw TTS config — flat provider keys (e.g. `elevenlabs: { apiKey }`) */
export interface OpenClawTTS {
  provider?: string;
  voice?: string;
  elevenlabs?: { apiKey?: string };
  openai?: { apiKey?: string };
  edge?: Record<string, unknown>;
}

export interface OpenClawMessages {
  tts?: OpenClawTTS;
}

export interface OpenClawSession {
  dmScope?: string;
}

export interface OpenClawSkillsConfig {
  load?: { watch?: boolean };
}

/** The real openclaw.json structure */
export interface OpenClawNativeConfig {
  gateway: OpenClawGateway;
  models: OpenClawModels;
  agents: OpenClawAgents;
  channels: Partial<Record<OpenClawChannelName, OpenClawChannel>>;
  bindings: OpenClawBinding[];
  cron?: OpenClawCron;
  hooks?: OpenClawHooks;
  messages?: OpenClawMessages;
  session?: OpenClawSession;
  skills?: OpenClawSkillsConfig;
  tools?: Record<string, unknown>;
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

// --- ElizaOS Config ---

export interface ElizaOSConfig {
  name: string;
  model?: string;
  provider?: string;
  systemPrompt?: string;
  character?: {
    name?: string;
    bio?: string;
    lore?: string[];
    topics?: string[];
    style?: {
      all?: string[];
      chat?: string[];
      post?: string[];
    };
    adjectives?: string[];
  };
  plugins?: string[];
  clients?: Array<'telegram' | 'discord' | 'twitter' | 'direct'>;
  settings?: {
    secrets?: Record<string, string>;
    [key: string]: unknown;
  };
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
  | { framework: 'elizaos'; config: ElizaOSConfig }
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

export interface AgentPublic extends Omit<Agent, 'config' | 'containerId' | 'ownerId'> {
  ownerAddress: string;
  features: AgentFeaturePublic[];
}

// --- Subscription Tiers ---

export type UserTierKey = 'free' | 'basic' | 'pro';

export type AddonKey =
  | 'addon.agents.3'
  | 'addon.agents.5'
  | 'addon.agents.10'
  | 'addon.file_manager';

// FeatureKey is now tier + addon keys (kept for DB backward compat)
export type FeatureKey = UserTierKey | AddonKey;
export type FeatureType = 'subscription';

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

export interface AgentFeaturePublic {
  featureKey: FeatureKey;
  type: FeatureType;
  expiresAt: Date | null;
}

// --- Payments ---

export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  userId: string;
  agentId: string | null;
  featureKey: string;
  usdAmount: number;
  hatchAmount: number;
  txSignature: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

// --- BYOK (Bring Your Own Key) ---

export type BYOKProvider = 'openai' | 'anthropic' | 'google' | 'groq' | 'xai' | 'openrouter' | 'ollama';

/** Maps each BYOK provider to the env var name expected by frameworks */
export const BYOK_PROVIDER_ENV_VARS: Record<BYOKProvider, string> = {
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  google: 'GOOGLE_API_KEY',
  groq: 'GROQ_API_KEY',
  xai: 'XAI_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
  ollama: 'OLLAMA_BASE_URL',
};

export interface BYOKConfig {
  provider: BYOKProvider;
  apiKey?: string; // encrypted at rest, absent for ollama
  model?: string;
  baseUrl?: string; // for ollama or custom endpoints
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

// --- LLM Usage Tracking ---

export interface LlmUsage {
  id: string;
  userId: string;
  agentId: string | null;
  model: string;
  inputTokens: number;
  outputTokens: number;
  usdCost: number;
  createdAt: Date;
}

// --- WebSocket / Chat ---

export type WSMessageType =
  | 'chat_message'
  | 'chat_response'
  | 'chat_error'
  | 'agent_status'
  | 'rate_limit';

export interface WSMessage {
  type: WSMessageType;
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

export interface AuthToken {
  token: string;
  expiresAt: Date;
  user: UserPublic;
}

// --- Agent File Manager ---

export interface AgentFile {
  id: string;
  agentId: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
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

// --- File Manager ---

export interface FileManagerEntry {
  path: string;
  size: number;
  modified: Date;
  isDirectory: boolean;
}

// --- Agent Add-on ---

export type AgentAddon = 'agents_3' | 'agents_5' | 'agents_10';

// --- Teams ---

export type TeamMemberRole = 'owner' | 'admin' | 'member' | 'viewer';

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
  role: TeamMemberRole;
  createdAt: Date;
}

// --- Custom Domains ---

export type SslStatus = 'pending' | 'active' | 'error';

export interface CustomDomain {
  id: string;
  agentId: string;
  domain: string;
  verified: boolean;
  sslStatus: SslStatus;
  cnameTarget: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Agent Versioning ---

export interface AgentVersion {
  id: string;
  agentId: string;
  version: number;
  configSnapshot: string;
  commitMessage: string | null;
  createdBy: string | null;
  createdAt: Date;
}

// --- Scheduled Tasks ---

export interface ScheduledTask {
  id: string;
  agentId: string;
  name: string;
  schedule: string;
  prompt: string;
  enabled: boolean;
  lastRunAt: Date | null;
  nextRunAt: Date | null;
  runCount: number;
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

// --- Credit Transactions ---

export type CreditTransactionType =
  | 'referral_reward'
  | 'subscription'
  | 'addon'
  | 'hosted_llm'
  | 'top_up'
  | 'stripe_purchase';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  balance: number;
  type: CreditTransactionType;
  description: string | null;
  createdAt: Date;
}

// --- Workflows (Visual Builder) ---

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

// --- Teams (Collaboration) ---

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
  user?: UserPublic;
}

export interface TeamWithMembers extends Team {
  members: TeamMember[];
  agentCount: number;
}

// --- Custom Domains ---

export type DomainSSLStatus = 'pending' | 'active' | 'error';

export interface CustomDomain {
  id: string;
  agentId: string;
  domain: string;
  verified: boolean;
  sslStatus: DomainSSLStatus;
  cnameTarget: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Agent Versioning ---

export interface AgentVersion {
  id: string;
  agentId: string;
  version: number;
  configSnapshot: string; // JSON string
  commitMessage: string | null;
  createdBy: string | null;
  createdAt: Date;
}

// --- Workflows (Visual Builder) ---

export type WorkflowNodeType = 'trigger' | 'action' | 'condition' | 'response';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
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
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
}
