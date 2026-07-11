import assert from 'node:assert/strict';
import test from 'node:test';

import { HATCHER_HOSTED_MODEL_RECOMMENDATIONS } from '../dist/index.mjs';

const modelsById = new Map(
  HATCHER_HOSTED_MODEL_RECOMMENDATIONS.map((model) => [model.id, model]),
);

test('hosted model ids remain unique', () => {
  assert.equal(modelsById.size, HATCHER_HOSTED_MODEL_RECOMMENDATIONS.length);
});

test('stale selectable partner and xAI ids are removed', () => {
  const staleIds = [
    'xiaomi/mimo-v2-pro',
    'xiaomi/mimo-v2-omni',
    'x-ai/grok-4.1-fast',
    'x-ai/grok-code-fast-1',
    'acedata/gpt-5.5',
    'virtuals/llama-3-3-70b',
  ];

  for (const id of staleIds) {
    assert.equal(modelsById.has(id), false, `${id} must not remain selectable`);
  }
});

test('current direct Grok model replaces retired xAI options', () => {
  assert.deepEqual(modelsById.get('x-ai/grok-4.5'), {
    id: 'x-ai/grok-4.5',
    name: 'Grok 4.5',
    provider: 'xAI',
    category: 'premium',
    costTier: 'high',
    context: '500K',
    description: 'Current Grok model for reasoning, coding, and multimodal agent workflows.',
    warning: 'The current UsePod marketplace route can report additional provider-side tokens. Monitor AI Credit usage.',
  });
});

test('Virtuals fallback catalog matches the current no-Llama set', () => {
  const expectedIds = [
    'virtuals/anthropic-claude-fable-5',
    'virtuals/e2ee-deepseek-v4-flash',
    'virtuals/openai-gpt-56-luna',
    'virtuals/openai-gpt-56-luna-pro',
    'virtuals/openai-gpt-56-sol',
    'virtuals/openai-gpt-56-sol-pro',
    'virtuals/openai-gpt-56-terra',
    'virtuals/openai-gpt-56-terra-pro',
    'virtuals/x-ai-grok-4-5',
    'virtuals/moonshotai-kimi-k2-5',
    'virtuals/moonshotai-kimi-k2-6',
    'virtuals/moonshotai-kimi-k2-7-code',
    'virtuals/deepseek-deepseek-v3-2',
    'virtuals/google-gemini-3-flash-preview',
  ];
  const actualIds = HATCHER_HOSTED_MODEL_RECOMMENDATIONS
    .filter((model) => model.provider === 'Virtuals')
    .map((model) => model.id);

  assert.deepEqual(actualIds, expectedIds);
  for (const id of expectedIds) {
    assert.equal(modelsById.get(id)?.costTier, 'variable', `${id} must expose variable pricing`);
  }
});

test('new Virtuals frontier models expose verified context labels', () => {
  const oneMillionContextIds = [
    'virtuals/anthropic-claude-fable-5',
    'virtuals/e2ee-deepseek-v4-flash',
    'virtuals/openai-gpt-56-luna',
    'virtuals/openai-gpt-56-luna-pro',
    'virtuals/openai-gpt-56-sol',
    'virtuals/openai-gpt-56-sol-pro',
    'virtuals/openai-gpt-56-terra',
    'virtuals/openai-gpt-56-terra-pro',
  ];

  for (const id of oneMillionContextIds) {
    assert.equal(modelsById.get(id)?.context, '1M');
  }
  assert.equal(modelsById.get('virtuals/x-ai-grok-4-5')?.context, '500K');
  for (const id of [
    'virtuals/moonshotai-kimi-k2-5',
    'virtuals/moonshotai-kimi-k2-6',
    'virtuals/moonshotai-kimi-k2-7-code',
    'virtuals/google-gemini-3-flash-preview',
  ]) {
    assert.equal(modelsById.get(id)?.context, '256K');
  }
  assert.equal(modelsById.get('virtuals/deepseek-deepseek-v3-2')?.context, '160K');
});
