import assert from 'node:assert/strict';
import test from 'node:test';

import { HATCHER_HOSTED_MODEL_RECOMMENDATIONS } from '../dist/index.mjs';

const modelsById = new Map(
  HATCHER_HOSTED_MODEL_RECOMMENDATIONS.map((model) => [model.id, model]),
);

test('hosted model ids remain unique', () => {
  assert.equal(modelsById.size, HATCHER_HOSTED_MODEL_RECOMMENDATIONS.length);
});

test('latest verified models are exposed on the Hatcher route', () => {
  const expected = new Map([
    ['openai/gpt-5.6-luna', '1.05M'],
    ['openai/gpt-5.6-terra', '1.05M'],
    ['openai/gpt-5.6-sol', '1.05M'],
    ['anthropic/claude-sonnet-5', '1M'],
    ['anthropic/claude-fable-5', '1M'],
    ['google/gemini-3.5-flash', '1.05M'],
    ['z-ai/glm-5.2', '1.05M'],
    ['qwen/qwen3.7-plus', '1M'],
    ['x-ai/grok-4.6', '500K'],
  ]);

  for (const [id, context] of expected) {
    assert.equal(modelsById.get(id)?.context, context, `${id} should expose its verified context label`);
  }
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
  assert.deepEqual(modelsById.get('x-ai/grok-4.6'), {
    id: 'x-ai/grok-4.6',
    name: 'Grok 4.6',
    provider: 'xAI',
    category: 'premium',
    costTier: 'high',
    context: '500K',
    description: 'xAI flagship model for coding, agentic tasks, reasoning, and multimodal workflows.',
  });
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

test('Virtuals Compute models are retired from hosted inference', () => {
  assert.equal(
    HATCHER_HOSTED_MODEL_RECOMMENDATIONS.some(
      (model) => model.provider === 'Virtuals' || model.id.startsWith('virtuals/'),
    ),
    false,
  );
});
