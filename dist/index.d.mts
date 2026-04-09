interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}
type ApiOk<T> = ApiResponse<T> & {
    success: true;
    data: T;
};
type ApiErr = ApiResponse<never> & {
    success: false;
    error: string;
};
declare function ok<T>(data: T): ApiOk<T>;
declare function err(error: string): ApiErr;
interface User {
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
interface UserPublic {
    id: string;
    username: string;
    walletAddress: string | null;
    referralCode: string | null;
    createdAt: Date;
}
type AgentStatus = 'active' | 'sleeping' | 'paused' | 'killed' | 'error' | 'restarting' | 'stopping';
type AgentFramework = 'openclaw' | 'hermes' | 'elizaos' | 'milady';
type Framework = AgentFramework;
interface OpenClawGatewayAuth {
    mode?: string;
    token?: string;
}
interface OpenClawGateway {
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
            chatCompletions?: {
                enabled?: boolean;
            };
            responses?: {
                enabled?: boolean;
            };
        };
    };
}
interface OpenClawModelRef {
    primary: string;
    fallback?: string[];
}
interface OpenClawModelProvider {
    apiKey?: string;
    baseUrl?: string;
    api?: string;
    models?: Array<{
        id: string;
        name: string;
    }>;
}
interface OpenClawModels {
    mode?: string;
    providers?: Record<string, OpenClawModelProvider>;
}
interface OpenClawAgentDef {
    id?: string;
    name?: string;
    default?: boolean;
    workspace?: string;
    model?: OpenClawModelRef;
    maxConcurrent?: number;
    compaction?: {
        mode?: string;
    };
    subagents?: {
        maxConcurrent?: number;
    };
}
interface OpenClawAgents {
    defaults?: Partial<OpenClawAgentDef>;
    list?: OpenClawAgentDef[];
}
/** Per-channel behavior settings (stored in config_json.channelSettings) */
interface ChannelSettings {
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
interface OpenClawChannel {
    enabled: boolean;
    dmPolicy?: string;
    groupPolicy?: string;
    allowFrom?: string[];
    groupAllowFrom?: string[];
    streaming?: string;
    botToken?: string;
    token?: string;
    appToken?: string;
    account?: string;
    [key: string]: unknown;
}
/** All valid OpenClaw channel identifiers */
type OpenClawChannelName = 'telegram' | 'discord' | 'whatsapp' | 'slack' | 'signal' | 'irc' | 'googlechat' | 'msteams' | 'mattermost' | 'line' | 'matrix' | 'nostr' | 'twitch' | 'feishu' | 'nextcloud-talk' | 'synology-chat' | 'tlon' | 'zalo' | 'bluebubbles';
interface OpenClawBinding {
    agentId: string;
    match: {
        channel: string;
        [key: string]: unknown;
    };
}
interface OpenClawCron {
    webhookToken?: string;
}
interface OpenClawHooks {
    path?: string;
    allowedAgentIds?: string[];
}
/** OpenClaw TTS config — flat provider keys (e.g. `elevenlabs: { apiKey }`) */
interface OpenClawTTS {
    provider?: string;
    voice?: string;
    elevenlabs?: {
        apiKey?: string;
    };
    openai?: {
        apiKey?: string;
    };
    edge?: Record<string, unknown>;
}
interface OpenClawMessages {
    tts?: OpenClawTTS;
}
interface OpenClawSession {
    dmScope?: string;
}
interface OpenClawSkillsConfig {
    load?: {
        watch?: boolean;
    };
}
/** The real openclaw.json structure */
interface OpenClawNativeConfig {
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
interface OpenClawConfig {
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
        steps: Array<{
            skill: string;
            config?: Record<string, unknown>;
        }>;
    }>;
}
interface HermesConfig {
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
interface ElizaOSConfig {
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
interface MiladyConfig {
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
type AgentConfig = {
    framework: 'openclaw';
    config: OpenClawConfig;
} | {
    framework: 'hermes';
    config: HermesConfig;
} | {
    framework: 'elizaos';
    config: ElizaOSConfig;
} | {
    framework: 'milady';
    config: MiladyConfig;
};
interface Agent {
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
interface AgentPublic extends Omit<Agent, 'config' | 'containerId' | 'ownerId'> {
    ownerAddress: string;
    features: AgentFeaturePublic[];
}
type UserTierKey = 'free' | 'starter' | 'pro' | 'business' | 'founding_member';
/** @deprecated Use 'starter' instead. Kept for DB backward compat. */
type LegacyTierKey = 'basic';
type AddonKey = 'addon.agents.3' | 'addon.agents.10' | 'addon.always_on' | 'addon.messages.200' | 'addon.file_manager';
type FeatureKey = UserTierKey | AddonKey;
type FeatureType = 'subscription' | 'one_time';
interface AgentFeature {
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
interface AgentFeaturePublic {
    featureKey: FeatureKey;
    type: FeatureType;
    expiresAt: Date | null;
}
type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'refunded';
interface Payment {
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
type BYOKProvider = 'openai' | 'anthropic' | 'google' | 'groq' | 'xai' | 'openrouter';
/** Maps each BYOK provider to the env var name expected by frameworks */
declare const BYOK_PROVIDER_ENV_VARS: Record<BYOKProvider, string>;
interface BYOKConfig {
    provider: BYOKProvider;
    apiKey?: string;
    model?: string;
    baseUrl?: string;
}
type LLMProvider = BYOKProvider | 'hatcher_proxy';
interface LLMMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
interface LLMRequest {
    messages: LLMMessage[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
}
interface LLMResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}
interface LlmUsage {
    id: string;
    userId: string;
    agentId: string | null;
    model: string;
    inputTokens: number;
    outputTokens: number;
    usdCost: number;
    createdAt: Date;
}
type WSMessageType = 'chat_message' | 'chat_response' | 'chat_token' | 'chat_done' | 'chat_error' | 'agent_status' | 'rate_limit';
interface WSMessage {
    type: WSMessageType;
    payload: unknown;
}
interface ChatMessage {
    id: string;
    agentId: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
interface AuthChallenge {
    nonce: string;
    message: string;
    expiresAt: Date;
}
interface AuthToken {
    token: string;
    expiresAt: Date;
    user: UserPublic;
}
interface AgentFile {
    id: string;
    agentId: string;
    name: string;
    mimeType: string;
    sizeBytes: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}
type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
type TicketCategory = 'general' | 'billing' | 'technical' | 'feature_request' | 'bug_report';
type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';
interface TicketMessage {
    role: 'user' | 'support' | 'system';
    content: string;
    timestamp: string;
}
interface SupportTicket {
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
interface FileManagerEntry {
    path: string;
    size: number;
    modified: Date;
    isDirectory: boolean;
}
type AgentAddon = 'agents_3' | 'agents_5' | 'agents_10';
type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';
/** @deprecated Use TeamRole instead */
type TeamMemberRole = TeamRole;
interface Team {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
interface TeamMember {
    id: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    createdAt: Date;
    user?: UserPublic;
}
interface TeamWithMembers extends Team {
    members: TeamMember[];
    agentCount: number;
}
type DomainSSLStatus = 'pending' | 'active' | 'error';
/** @deprecated Use DomainSSLStatus instead */
type SslStatus = DomainSSLStatus;
interface CustomDomain {
    id: string;
    agentId: string;
    domain: string;
    verified: boolean;
    sslStatus: DomainSSLStatus;
    cnameTarget: string;
    createdAt: Date;
    updatedAt: Date;
}
interface AgentVersion {
    id: string;
    agentId: string;
    version: number;
    configSnapshot: string;
    commitMessage: string | null;
    createdBy: string | null;
    createdAt: Date;
}
interface ScheduledTask {
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
interface Referral {
    id: string;
    referrerId: string;
    referredId: string;
    rewardClaimed: boolean;
    createdAt: Date;
}
type CreditTransactionType = 'referral_reward' | 'subscription' | 'addon' | 'hosted_llm' | 'top_up' | 'stripe_purchase';
interface CreditTransaction {
    id: string;
    userId: string;
    amount: number;
    balance: number;
    type: CreditTransactionType;
    description: string | null;
    createdAt: Date;
}
type WorkflowNodeType = 'trigger' | 'action' | 'condition' | 'response';
interface WorkflowNode {
    id: string;
    type: WorkflowNodeType;
    position: {
        x: number;
        y: number;
    };
    data: {
        label: string;
        nodeType: string;
        config: Record<string, unknown>;
    };
}
interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    label?: string;
}
interface Workflow {
    id: string;
    agentId: string;
    name: string;
    enabled: boolean;
    nodesJson: string;
    edgesJson: string;
    createdAt: Date;
    updatedAt: Date;
}
interface AdminStats {
    totalUsers: number;
    totalAgents: number;
    activeAgents: number;
    totalFeaturesUnlocked: number;
    totalPayments: number;
}
interface WsChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
interface WsChatPayload {
    message: string;
    history?: WsChatMessage[];
}

interface TierConfig {
    key: UserTierKey;
    name: string;
    usdPrice: number;
    includedAgents: number;
    messagesPerDay: number;
    cpuLimit: number;
    memoryMb: number;
    storageMb: number;
    autoSleep: boolean;
    autoSleepMinutes: number;
    fileManager: boolean;
    fullLogs: boolean;
    prioritySupport: boolean;
}
declare const TIERS: Record<UserTierKey, TierConfig>;
declare const TIER_ORDER: UserTierKey[];
/** Map legacy tier names to current ones (for DB backward compat) */
declare const LEGACY_TIER_MAP: Record<string, UserTierKey>;
interface AddonConfig {
    key: AddonKey;
    name: string;
    description: string;
    usdPrice: number;
    type: 'subscription' | 'one_time';
    perAgent: boolean;
    extraAgents?: number;
}
declare const ADDONS: AddonConfig[];
declare function getTier(key: UserTierKey | string): TierConfig;
declare function getAddon(key: AddonKey): AddonConfig | undefined;
declare const TOKEN_ECONOMY: {
    readonly symbol: "TOKEN";
    readonly name: "Token";
};
interface BYOKProviderMeta {
    key: BYOKProvider;
    name: string;
    description: string;
    requiresApiKey: boolean;
    requiresBaseUrl: boolean;
    defaultBaseUrl?: string;
    models: Array<{
        id: string;
        name: string;
        context?: string;
    }>;
}
declare const BYOK_PROVIDERS: BYOKProviderMeta[];
/** Get provider metadata by key */
declare function getBYOKProvider(key: string): BYOKProviderMeta | undefined;
interface FrameworkMeta {
    key: AgentFramework;
    name: string;
    description: string;
    dockerImage: string;
    features: string[];
    complexity: 'beginner' | 'intermediate' | 'advanced';
    bestFor: string;
    docsUrl: string;
    port: number;
    healthEndpoint: string;
    chatEndpoint: string;
}
declare const FRAMEWORKS: Record<AgentFramework, FrameworkMeta>;
declare const RATE_LIMITS: {
    readonly apiRequestsPerWindow: 100;
    readonly windowMs: 60000;
    readonly authAttemptsPerWindow: 10;
    readonly authWindowMs: 60000;
    readonly chatMessagesPerMinute: 10;
};
declare const SOLANA_CONFIG: {
    readonly networks: {
        readonly mainnet: "mainnet-beta";
        readonly devnet: "devnet";
        readonly testnet: "testnet";
    };
    readonly minSolBalance: 0.001;
    readonly authNonceExpirySecs: 300;
};
declare const ACCOUNT_AGENT_LIMITS: Record<string, number>;
declare const FREE_TIER_MAX_AGENTS = 1;
declare const PRICING: {
    free: {
        usdPrice: number;
        label: string;
        description: string;
    };
    paid: {
        usdPrice: number;
        label: string;
        type: "one_time";
        description: string;
    };
};
declare const AGENT_STATUSES: readonly ["active", "sleeping", "paused", "error", "killed", "restarting", "stopping"];
declare const AGENT_STATUS_CONFIG: Record<AgentStatus, {
    label: string;
    color: string;
    pulse: boolean;
}>;
declare const PAID_TIER: {
    maxActiveAgents: number;
    logRetentionHours: number;
    chatMessagesPerDay: number;
    researchTasksPerDay: number;
    tokenScansPerDay: number;
    walletWatcherMax: number;
    openclaw: {
        maxSkills: number;
        skills: "all";
        workflows: boolean;
        triggers: boolean;
    };
};

export { ACCOUNT_AGENT_LIMITS, ADDONS, AGENT_STATUSES, AGENT_STATUS_CONFIG, type AddonConfig, type AddonKey, type AdminStats, type Agent, type AgentAddon, type AgentConfig, type AgentFeature, type AgentFeaturePublic, type AgentFile, type AgentFramework, type AgentPublic, type AgentStatus, type AgentVersion, type ApiErr, type ApiOk, type ApiResponse, type AuthChallenge, type AuthToken, type BYOKConfig, type BYOKProvider, type BYOKProviderMeta, BYOK_PROVIDERS, BYOK_PROVIDER_ENV_VARS, type ChannelSettings, type ChatMessage, type CreditTransaction, type CreditTransactionType, type CustomDomain, type DomainSSLStatus, type ElizaOSConfig, FRAMEWORKS, FREE_TIER_MAX_AGENTS, type FeatureKey, type FeatureType, type FileManagerEntry, type Framework, type FrameworkMeta, type HermesConfig, LEGACY_TIER_MAP, type LLMMessage, type LLMProvider, type LLMRequest, type LLMResponse, type LegacyTierKey, type LlmUsage, type MiladyConfig, type OpenClawAgentDef, type OpenClawAgents, type OpenClawBinding, type OpenClawChannel, type OpenClawChannelName, type OpenClawConfig, type OpenClawCron, type OpenClawGateway, type OpenClawGatewayAuth, type OpenClawHooks, type OpenClawMessages, type OpenClawModelProvider, type OpenClawModelRef, type OpenClawModels, type OpenClawNativeConfig, type OpenClawSession, type OpenClawSkillsConfig, type OpenClawTTS, PAID_TIER, PRICING, type Payment, type PaymentStatus, RATE_LIMITS, type Referral, SOLANA_CONFIG, type ScheduledTask, type SslStatus, type SupportTicket, TIERS, TIER_ORDER, TOKEN_ECONOMY, type Team, type TeamMember, type TeamMemberRole, type TeamRole, type TeamWithMembers, type TicketCategory, type TicketMessage, type TicketPriority, type TicketStatus, type TierConfig, type User, type UserPublic, type UserTierKey, type WSMessage, type WSMessageType, type Workflow, type WorkflowEdge, type WorkflowNode, type WorkflowNodeType, type WsChatMessage, type WsChatPayload, err, getAddon, getBYOKProvider, getTier, ok };
