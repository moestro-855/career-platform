import Link from 'next/link'

export const metadata = {
  title: 'Профориентация для школ — КемСтать',
  description: 'Инструмент профориентации для классных руководителей и психологов. Групповой доступ, аналитика по классу, готовые отчёты.',
}

const features = [
  {
    emoji: '📊',
    title: 'Аналитика по классу',
    desc: 'Сводный отчёт по всем ученикам: распределение RIASEC-типов, сильные стороны, зоны роста. Готов к печати за один клик.',
  },
  {
    emoji: '🔗',
    title: 'Ссылка вместо регистрации',
    desc: 'Отправь классу одну ссылку — ученики проходят тест без создания аккаунта. Никаких паролей и форм.',
  },
  {
    emoji: '🎯',
    title: 'Соответствие ФГОС',
    desc: 'Материалы для классных часов, родительских собраний и индивидуальных бесед в рамках программы профориентации.',
  },
  {
    emoji: '🤖',
    title: 'AI-анализ для каждого',
    desc: 'Каждый ученик получает персональные рекомендации от ИИ — не шаблонные, а с учётом индивидуального профиля.',
  },
  {
    emoji: '🎮',
    title: 'Мини-игры по профессиям',
    desc: 'Ученики «примеряют» профессии через интерактивные сценарии. Отлично подходит для формата классного часа.',
  },
  {
    emoji: '📧',
    title: 'Результаты родителям',
    desc: 'Ученик может отправить свой профиль родителям прямо из платформы — удобно для разговора о выборе профессии.',
  },
]

const plans = [
  {
    name: 'Один класс',
    price: 'Бесплатно',
    desc: 'До 35 учеников',
    features: ['Тест + AI-анализ', 'Мини-игры', 'Email-результаты'],
    cta: 'Начать бесплатно',
    href: '/test',
    accent: false,
  },
  {
    name: 'Школа',
    price: '2 900 ₽/мес',
    desc: 'Неограниченно учеников',
    features: ['Всё из бесплатного', 'Сводная аналитика по классам', 'Экспорт отчётов PDF', 'Приоритетная поддержка'],
    cta: 'Оставить заявку',
    href: '#contact',
    accent: true,
  },
]

export default function SchoolsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold text-fg hover:text-accent transition-colors">
          КемСтать
        </Link>
        <Link href="/test" className="text-sm font-medium text-muted hover:text-fg transition-colors">
          Пройти тест →
        </Link>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            Для школ и педагогов
          </span>
          <h1 className="font-display text-5xl font-bold text-fg leading-tight">
            Профориентация, которая{' '}
            <span className="text-accent">действительно работает</span>
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Подключите класс за 5 минут. ИИ анализирует профиль каждого ученика
            и подбирает профессии индивидуально — не по шаблону.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#contact"
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-accent px-8 text-base font-semibold text-white hover:bg-accent-h transition-colors">
              Оставить заявку
            </a>
            <Link href="/test"
              className="text-sm font-medium text-muted hover:text-fg transition-colors">
              Попробовать самому →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-surface">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-fg text-center mb-14">
            Всё что нужно педагогу
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <div key={f.title} className="rounded-2xl border border-border bg-bg p-6">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-display text-base font-semibold text-fg mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6 bg-bg">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-fg text-center mb-14">Тарифы</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {plans.map(plan => (
              <div key={plan.name}
                className={`rounded-3xl border p-8 ${plan.accent ? 'border-accent bg-accent/4' : 'border-border bg-surface'}`}>
                <div className="font-display text-xl font-bold text-fg">{plan.name}</div>
                <div className={`text-3xl font-bold mt-3 mb-1 ${plan.accent ? 'text-accent' : 'text-fg'}`}>
                  {plan.price}
                </div>
                <div className="text-sm text-muted mb-6">{plan.desc}</div>
                <ul className="flex flex-col gap-2 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-fg/80">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}
                  className={`flex h-11 items-center justify-center rounded-2xl text-sm font-semibold transition-colors
                    ${plan.accent
                      ? 'bg-accent text-white hover:bg-accent-h'
                      : 'border border-border text-fg hover:bg-surface'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="py-20 px-6 bg-fg text-bg">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Оставить заявку</h2>
          <p className="text-bg/60 mb-10">Свяжемся в течение одного рабочего дня и поможем подключить школу</p>

          <form className="flex flex-col gap-4 text-left">
            <input
              type="text"
              placeholder="Ваше имя"
              className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
            />
            <input
              type="text"
              placeholder="Название школы"
              className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
            />
            <input
              type="email"
              placeholder="Email для связи"
              className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
            />
            <button
              type="submit"
              className="h-12 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-h transition-colors"
            >
              Отправить заявку
            </button>
          </form>

          <p className="text-xs text-bg/30 mt-4">
            Или напишите напрямую: schools@kemstat.ru
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8 px-6 text-center">
        <p className="text-xs text-muted">© 2026 КемСтать · <Link href="/" className="hover:text-fg transition-colors">На главную</Link></p>
      </footer>
    </div>
  )
}
