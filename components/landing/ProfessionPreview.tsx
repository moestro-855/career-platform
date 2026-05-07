import Link from 'next/link'

const professions = [
  { icon: '🩺', name: 'Врач', type: 'Социальный', color: 'bg-rose-50 border-rose-100' },
  { icon: '💻', name: 'Программист', type: 'Исследовательский', color: 'bg-indigo-50 border-indigo-100' },
  { icon: '🎨', name: 'Дизайнер', type: 'Артистический', color: 'bg-amber-50 border-amber-100' },
  { icon: '⚖️', name: 'Юрист', type: 'Конвенциональный', color: 'bg-slate-50 border-slate-100' },
  { icon: '🏗️', name: 'Инженер', type: 'Реалистичный', color: 'bg-emerald-50 border-emerald-100' },
  { icon: '📊', name: 'Предприниматель', type: 'Предприимчивый', color: 'bg-orange-50 border-orange-100' },
]

export default function ProfessionPreview() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-fg">
            Какие профессии тебя ждут?
          </h2>
          <p className="mt-4 text-muted text-lg">
            Более 30 профессий с реальными задачами и мини-играми
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {professions.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${p.color} transition-transform hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{p.icon}</div>
              <div className="font-display text-lg font-semibold text-fg">{p.name}</div>
              <div className="text-xs text-muted mt-1">{p.type}</div>
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
