import Link from 'next/link'
import { PROFESSIONS } from '@/lib/professions'

const SHOWN = [
  'programmer', 'designer', 'doctor', 'entrepreneur',
  'scientist', 'psychologist', 'journalist', 'teacher',
  'chef', 'marketer', 'lawyer', 'architect',
]

const TYPE_RU: Record<string, string> = {
  realistic:     'Реалистичный',
  investigative: 'Исследовательский',
  artistic:      'Артистический',
  social:        'Социальный',
  enterprising:  'Предприимчивый',
  conventional:  'Конвенциональный',
}

const shown = PROFESSIONS.filter(p => SHOWN.includes(p.id))

export default function ProfessionPreview() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-fg">
            Какие профессии тебя ждут?
          </h2>
          <p className="mt-4 text-muted text-lg">
            25+ профессий с реальными задачами и мини-играми
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {shown.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-5 ${p.color} transition-transform hover:-translate-y-1`}
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <div className="font-display text-sm font-semibold text-fg leading-tight">{p.name}</div>
              <div className="text-xs text-muted mt-1">{TYPE_RU[p.riasecPrimary]}</div>
              {p.gameAvailable && (
                <div className="mt-2 text-xs font-medium text-accent">🎮 есть игра</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/test"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-accent px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-h"
          >
            Узнать свои профессии →
          </Link>
        </div>
      </div>
    </section>
  )
}
