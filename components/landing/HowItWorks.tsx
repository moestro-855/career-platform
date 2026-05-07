const steps = [
  {
    number: '01',
    emoji: '📝',
    title: 'Пройди тест',
    description:
      'Ответь на 36 вопросов о своих интересах и предпочтениях. Занимает около 10 минут.',
  },
  {
    number: '02',
    emoji: '🤖',
    title: 'Получи AI-анализ',
    description:
      'Наш ИИ расшифрует твой профиль RIASEC и подберёт профессии, в которых ты проявишься лучше всего.',
  },
  {
    number: '03',
    emoji: '🎮',
    title: 'Попробуй профессию',
    description:
      'Мини-игры симулируют реальные задачи врача, дизайнера, программиста и других специалистов.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-fg">
            Как это работает
          </h2>
          <p className="mt-4 text-muted text-lg">
            Три шага от «не знаю» до «хочу стать»
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl bg-bg border border-border p-8"
            >
              <span className="font-display text-6xl font-bold text-accent/15 select-none absolute top-6 right-6">
                {step.number}
              </span>
              <div className="text-4xl mb-4">{step.emoji}</div>
              <h3 className="font-display text-xl font-semibold text-fg mb-2">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
