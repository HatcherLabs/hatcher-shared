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
  'addon.messages.20':    'shared.addons.messages_plus20',
  'addon.messages.50':    'shared.addons.messages_plus50',
  'addon.messages.100':   'shared.addons.messages_plus100',
  'addon.messages.200':   'shared.addons.messages_plus200',
  'addon.searches.25':    'shared.addons.searches_plus25',
  'addon.searches.50':    'shared.addons.searches_plus50',
  'addon.file_manager':   'shared.addons.file_manager',
  'addon.full_logs':      'shared.addons.full_logs',
  'addon.extra_plugins':  'shared.addons.plugins_plus10',
} as const;

export const FRAMEWORK_KEYS = {
  openclaw: 'shared.frameworks.openclaw',
  hermes:   'shared.frameworks.hermes',
  elizaos:  'shared.frameworks.elizaos',
  milady:   'shared.frameworks.milady',
} as const;

export type FrameworkTranslationKey = (typeof FRAMEWORK_KEYS)[keyof typeof FRAMEWORK_KEYS];

export const AGENT_STATUS_KEYS = {
  active:     'shared.agentStatus.active',
  sleeping:   'shared.agentStatus.sleeping',
  paused:     'shared.agentStatus.paused',
  error:      'shared.agentStatus.error',
  killed:     'shared.agentStatus.killed',
  restarting: 'shared.agentStatus.restarting',
  stopping:   'shared.agentStatus.stopping',
} as const;

export type AgentStatusTranslationKey = (typeof AGENT_STATUS_KEYS)[keyof typeof AGENT_STATUS_KEYS];
