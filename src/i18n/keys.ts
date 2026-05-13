/**
 * Stable translation keys for user-facing strings in the shared package.
 * Frontend uses these to look up translations in messages/*.json under the
 * `shared.*` namespace. Backend ignores these and returns the English fallback
 * from the `name`/`description` fields on the constants.
 */

export const TIER_KEYS = {
  free:            'shared.tiers.free',
  starter:         'shared.tiers.starter',
  pro:             'shared.tiers.pro',
  business:        'shared.tiers.business',
  founding_member: 'shared.tiers.founding_member',
} as const;

export type TierTranslationKey = (typeof TIER_KEYS)[keyof typeof TIER_KEYS];

/**
 * Addon keys — keyed by the AddonKey string used in ADDONS constant.
 * Translation path: `shared.addons.<mapped_key>.{name,description}`.
 */
export const ADDON_KEYS: Record<string, string> = {
  'addon.agents.1':       'shared.addons.agents_plus1',
  'addon.agents.3':       'shared.addons.agents_plus3',
  'addon.agents.5':       'shared.addons.agents_plus5',
  'addon.agents.10':      'shared.addons.agents_plus10',
  'addon.always_on':      'shared.addons.always_on',
  'addon.ai_credits.5000':  'shared.addons.ai_credits_5000',
  'addon.ai_credits.10000': 'shared.addons.ai_credits_10000',
  'addon.ai_credits.25000': 'shared.addons.ai_credits_25000',
  'addon.ai_credits.50000': 'shared.addons.ai_credits_50000',
  'addon.file_manager':   'shared.addons.file_manager',
  'addon.full_logs':      'shared.addons.full_logs',
} as const;

export const FRAMEWORK_KEYS = {
  openclaw: 'shared.frameworks.openclaw',
  hermes:   'shared.frameworks.hermes',
  custom:   'shared.frameworks.custom',
} as const;

export type FrameworkTranslationKey = (typeof FRAMEWORK_KEYS)[keyof typeof FRAMEWORK_KEYS];

export const AGENT_STATUS_KEYS = {
  active:     'shared.agentStatus.active',
  sleeping:   'shared.agentStatus.sleeping',
  paused:     'shared.agentStatus.paused',
  archived:   'shared.agentStatus.archived',
  error:      'shared.agentStatus.error',
  killed:     'shared.agentStatus.killed',
  restarting: 'shared.agentStatus.restarting',
  stopping:   'shared.agentStatus.stopping',
} as const;

export type AgentStatusTranslationKey = (typeof AGENT_STATUS_KEYS)[keyof typeof AGENT_STATUS_KEYS];
