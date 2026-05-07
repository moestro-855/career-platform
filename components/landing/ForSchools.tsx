import Link from 'next/link'

const benefits = [
  { icon: '📈', text: 'Аналитика по классу — видите сильные стороны каждого ученика' },
  { icon: '🏫', text: 'Групповой доступ без регистрации для учеников' },
  { icon: '📋', text: 'Готовые отчёты для родительских собраний' },
  { icon: '🎯', text: 'Интеграция с программой профориентации ФГОС' },
]

export default function ForSchools() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent mb-5">
              Для школ и педагогов
            </span>
            <h2 className="font-display text-4xl font-bold text-fg leading-tight">
              Инструмент для классного часа и профориентации
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Подключите весь класс за 5 минут. Получайте сводные отчёты
              и помогайте каждому ученику найти свой путь.
            </p>

            <Link
              href="/schools"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-fg px-7 text-sm font-semibold text-bg transition-colors hover:bg-fg/85"
            >
              Узнать условия для школ
            </Link>
          </div>

          <ul className="flex flex-col gap-4">
            {benefits.map((b) => (
              <li
                key={b.text}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="text-2xl shrink-0">{b.icon}</span>
                <span className="text-sm text-fg/80 leading-relaxed">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
