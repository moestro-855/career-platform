const testimonials = [
  {
    text: 'Раньше не понимала, куда поступать. После теста всё стало ясно — иду на психологию. ИИ объяснил почему именно это мне подойдёт.',
    name: 'Алина, 16 лет',
    city: 'Москва',
    avatar: '👩‍🎓',
  },
  {
    text: 'Мини-игра «Программист» была огонь! Попробовал написать первый алгоритм и понял — это моё. Теперь хожу на курсы по Python.',
    name: 'Тимур, 15 лет',
    city: 'Казань',
    avatar: '👦',
  },
  {
    text: 'Показал результаты маме. Она удивилась, что тест так точно описал мои черты. Теперь она поддерживает мой выбор — стать дизайнером.',
    name: 'Саша, 14 лет',
    city: 'Новосибирск',
    avatar: '🧑',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-fg">
            Что говорят школьники
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl bg-bg border border-border p-7 flex flex-col gap-5"
            >
              <p className="text-fg/80 text-sm leading-relaxed flex-1">
                «{t.text}»
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <div className="font-semibold text-sm text-fg">{t.name}</div>
                  <div className="text-xs text-muted">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
