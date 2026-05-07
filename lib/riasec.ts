import type { RIASECType, RIASECScores } from '@/types'
import { QUESTIONS } from './questions'

export function calculateScores(answers: Record<number, number>): RIASECScores {
  const scores: RIASECScores = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  }

  for (const question of QUESTIONS) {
    const answer = answers[question.id] ?? 0
    scores[question.type] += answer
  }

  return scores
}

export function topTypes(scores: RIASECScores, count = 3): RIASECType[] {
  return (Object.entries(scores) as [RIASECType, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([type]) => type)
}

export const TYPE_LABELS: Record<RIASECType, string> = {
  realistic:     'Реалистичный',
  investigative: 'Исследовательский',
  artistic:      'Артистический',
  social:        'Социальный',
  enterprising:  'Предприимчивый',
  conventional:  'Конвенциональный',
}

export const TYPE_EMOJIS: Record<RIASECType, string> = {
  realistic:     '🔧',
  investigative: '🔬',
  artistic:      '🎨',
  social:        '🤝',
  enterprising:  '🚀',
  conventional:  '📊',
}
