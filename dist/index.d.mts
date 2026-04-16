declare function ok<T>(data: T): {
    success: true;
    data: T;
};
declare function err(error: string): {
    success: false;
    error: string;
};
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
type AgentStatus = 'active' | 'sleeping' | 'paused' | 'killed' | 'error' | 'restarting' | 'stopping';
type AgentFramework = 'openclaw' | 'hermes' | 'elizaos' | 'milady';
type Framework = AgentFramework;
/** All valid OpenClaw channel identifiers */
type OpenClawChannelName = 'telegram' | 'discord' | 'whatsapp' | 'slack' | 'signal' | 'irc' | 'googlechat' | 'msteams' | 'mattermost' | 'line' | 'matrix' | 'nostr' | 'twitch' | 'feishu' | 'nextcloud-talk' | 'synology-chat' | 'tlon' | 'zalo' | 'bluebubbles';
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
interface OpenClawBinding {
    agentId: string;
    match: {
        channel: string;
        [key: string]: unknown;
    };
}
interface OpenClawMessages {
    tts?: {
        provider?: string;
        voice?: string;
        elevenlabs?: {
            apiKey?: string;
        };
        openai?: {
            apiKey?: string;
        };
        edge?: Record<string, unknown>;
    };
}
interface OpenClawSkillsConfig {
    load?: {
        watch?: boolean;
    };
}
/** The real openclaw.json structure */
interface OpenClawNativeConfig {
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
                chatCompletions?: {
                    enabled?: boolean;
                };
                responses?: {
                    enabled?: boolean;
                };
            };
        };
    };
    models: {
        mode?: string;
        providers?: Record<string, {
            apiKey?: string;
            baseUrl?: string;
            api?: string;
            models?: Array<{
                id: string;
                name: string;
            }>;
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
            compaction?: {
                mode?: string;
            };
            subagents?: {
                maxConcurrent?: number;
            };
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
            compaction?: {
                mode?: string;
            };
            subagents?: {
                maxConcurrent?: number;
            };
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
    config: Record<string, unknown>;
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
type UserTierKey = 'free' | 'starter' | 'pro' | 'business' | 'founding_member';
type AddonKey = 'addon.agents.1' | 'addon.agents.3' | 'addon.agents.5' | 'addon.agents.10' | 'addon.always_on' | 'addon.messages.20' | 'addon.messages.50' | 'addon.messages.100' | 'addon.messages.200' | 'addon.searches.25' | 'addon.searches.50' | 'addon.file_manager' | 'addon.full_logs' | 'addon.extra_plugins';
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
interface Payment {
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
interface WSMessage {
    type: 'chat_message' | 'chat_response' | 'chat_token' | 'chat_done' | 'chat_error' | 'agent_status' | 'rate_limit';
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
type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';
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
    user?: {
        id: string;
        username: string;
        walletAddress: string | null;
        referralCode: string | null;
        createdAt: Date;
    };
}
interface CustomDomain {
    id: string;
    agentId: string;
    domain: string;
    verified: boolean;
    sslStatus: 'pending' | 'active' | 'error';
    cnameTarget: string;
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
interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action' | 'condition' | 'response';
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
type PluginType = 'skill' | 'plugin';
type PluginSource = 'clawhub' | 'clawhub-plugin' | 'elizaos-registry' | 'milady-skills' | 'github' | 'npm';
type PluginStatus = 'pending' | 'installed' | 'failed' | 'uninstalled';
interface AgentPluginRecord {
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
interface PluginRegistryEntry {
    name: string;
    type: PluginType;
    source: PluginSource;
    description: string;
    author?: string;
    stars?: number;
    installed: boolean;
}
interface PluginLimits {
    used: number;
    max: number;
}

interface TierConfig {
    key: UserTierKey;
    name: string;
    usdPrice: number;
    includedAgents: number;
    messagesPerDay: number;
    searchesPerDay: number;
    cpuLimit: number;
    memoryMb: number;
    storageMb: number;
    autoSleep: boolean;
    autoSleepMinutes: number;
    fileManager: boolean;
    fullLogs: boolean;
    prioritySupport: boolean;
    maxPlugins: number;
}
declare const TIERS: Record<UserTierKey, TierConfig>;
declare const TIER_ORDER: UserTierKey[];
/** Absolute cap on Founding Member slots. Hard-coded here (not in the DB)
 *  so the limit ships with every release and can't be silently raised by
 *  a rogue admin query. The backend counts users with tier='founding_member'
 *  and refuses new purchases once `FOUNDING_MEMBER_MAX_SLOTS` is reached. */
declare const FOUNDING_MEMBER_MAX_SLOTS = 20;
declare function getTier(key: UserTierKey | string): TierConfig;
interface AddonConfig {
    key: AddonKey;
    name: string;
    description: string;
    usdPrice: number;
    type: 'subscription' | 'one_time';
    /** true = one purchase per agent; false = account-level (stackable). */
    perAgent: boolean;
    /** Number of extra agent slots this addon grants. */
    extraAgents?: number;
    /** Number of extra daily messages this addon grants (account-level). */
    extraMessages?: number;
    /** Number of extra daily web searches this addon grants (account-level). */
    extraSearches?: number;
    /** Number of extra plugin+skill slots this addon grants. */
    extraPlugins?: number;
}
declare const ADDONS: AddonConfig[];
declare function getAddon(key: AddonKey): typeof ADDONS[number] | undefined;
declare const PLUGIN_LIMITS: Record<UserTierKey, number>;
declare const BYOK_PROVIDERS: Array<{
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
}>;
/** Get provider metadata by key */
declare function getBYOKProvider(key: string): typeof BYOK_PROVIDERS[number] | undefined;
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
declare const SOLANA_CONFIG: {
    readonly networks: {
        readonly mainnet: "mainnet-beta";
        readonly devnet: "devnet";
        readonly testnet: "testnet";
    };
    readonly minSolBalance: 0.001;
    readonly authNonceExpirySecs: 300;
};
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

export { ADDONS, AGENT_STATUSES, AGENT_STATUS_CONFIG, type AddonConfig, type AddonKey, type AdminStats, type Agent, type AgentConfig, type AgentFeature, type AgentFramework, type AgentPluginRecord, type AgentStatus, type AuthChallenge, type BYOKConfig, type BYOKProvider, BYOK_PROVIDERS, BYOK_PROVIDER_ENV_VARS, type ChannelSettings, type ChatMessage, type CustomDomain, FOUNDING_MEMBER_MAX_SLOTS, FRAMEWORKS, type FeatureKey, type FeatureType, type Framework, type FrameworkMeta, type HermesConfig, type LLMMessage, type LLMProvider, type LLMRequest, type LLMResponse, type MiladyConfig, type OpenClawBinding, type OpenClawChannel, type OpenClawChannelName, type OpenClawConfig, type OpenClawMessages, type OpenClawNativeConfig, type OpenClawSkillsConfig, PLUGIN_LIMITS, PRICING, type Payment, type PluginLimits, type PluginRegistryEntry, type PluginSource, type PluginStatus, type PluginType, type Referral, SOLANA_CONFIG, type SupportTicket, TIERS, TIER_ORDER, type Team, type TeamMember, type TeamRole, type TicketCategory, type TicketMessage, type TicketPriority, type TicketStatus, type TierConfig, type User, type UserTierKey, type WSMessage, type Workflow, type WorkflowEdge, type WorkflowNode, type WsChatMessage, type WsChatPayload, err, getAddon, getBYOKProvider, getTier, ok };
