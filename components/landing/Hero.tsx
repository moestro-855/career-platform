'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-24 pb-20 px-6">
      {/* Atmospheric background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            Для школьников 13–17 лет
          </span>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Узнай, кем{' '}
            <span className="text-accent">ты можешь стать</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted max-w-2xl mx-auto sm:text-xl">
            Пройди тест за 10 минут — получи AI-анализ своих сильных сторон
            и попробуй профессии через мини-игры прямо сейчас.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/test"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-accent px-8 text-base font-semibold text-white transition-colors hover:bg-accent-h focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Пройти тест бесплатно →
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted hover:text-fg transition-colors"
          >
            Как это работает?
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-muted"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span>Тест RIASEC</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span>AI-анализ</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <span>Мини-игры</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
