import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-28 px-6 bg-fg text-bg overflow-hidden relative">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 110%, rgba(99,102,241,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          Твоя профессия ждёт тебя
        </h2>
        <p className="mt-5 text-bg/60 text-lg leading-relaxed">
          Пройди тест прямо сейчас — это бесплатно и занимает 10 минут.
          Сотни школьников уже нашли своё направление.
        </p>
        <Link
          href="/test"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-2xl bg-accent px-10 text-base font-semibold text-white transition-colors hover:bg-accent-h"
        >
          Начать тест →
        </Link>
        <p className="mt-4 text-xs text-bg/40">
          Без регистрации. Без оплаты. Только результат.
        </p>
      </div>
    </section>
  )
}
