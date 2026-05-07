'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: 'Один класс',
    price: 'Бесплатно',
    desc: 'До 35 учеников',
    features: ['Тест + AI-анализ', 'Мини-игры по профессиям', 'Email-результаты ученикам'],
    cta: 'Начать бесплатно',
    href: '/test',
    accent: false,
    badge: null,
  },
  {
    name: 'Школа',
    price: '2 900 ₽',
    period: '/мес',
    desc: 'Неограниченно учеников',
    features: [
      'Всё из бесплатного',
      'Сводная аналитика по классам',
      'Экспорт отчётов PDF',
      'Персональный менеджер',
      'Приоритетная поддержка',
    ],
    cta: 'Оставить заявку',
    href: '#contact',
    accent: true,
    badge: 'Популярный',
  },
]

export default function PricingCards() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onHoverStart={() => setHovered(plan.name)}
          onHoverEnd={() => setHovered(null)}
          animate={{
            y: hovered === plan.name ? -6 : 0,
            boxShadow: hovered === plan.name
              ? plan.accent
                ? '0 20px 60px rgba(99,102,241,0.25)'
                : '0 20px 40px rgba(0,0,0,0.08)'
              : '0 0px 0px rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.1 }}
          className={`relative rounded-3xl border p-8 cursor-default
            ${plan.accent
              ? 'border-accent bg-gradient-to-b from-accent/8 to-accent/3'
              : 'border-border bg-surface'
            }`}
        >
          {/* Badge */}
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                {plan.badge}
              </span>
            </div>
          )}

          {/* Plan name */}
          <div className="font-display text-xl font-bold text-fg mt-2">{plan.name}</div>

          {/* Price */}
          <div className="flex items-end gap-1 mt-4 mb-1">
            <span className={`font-display text-4xl font-bold ${plan.accent ? 'text-accent' : 'text-fg'}`}>
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-muted text-base mb-1">{plan.period}</span>
            )}
          </div>
          <div className="text-sm text-muted mb-7">{plan.desc}</div>

          {/* Features */}
          <ul className="flex flex-col gap-2.5 mb-8">
            {plan.features.map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-fg/80">
                <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs
                  ${plan.accent ? 'bg-accent text-white' : 'bg-fg/10 text-fg'}`}>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link href={plan.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex h-12 items-center justify-center rounded-2xl text-sm font-semibold transition-colors cursor-pointer select-none
                ${plan.accent
                  ? 'bg-accent text-white hover:bg-accent-h shadow-lg shadow-accent/30'
                  : 'border-2 border-fg/15 text-fg hover:bg-fg/5 hover:border-fg/30'
                }`}
            >
              {plan.cta} {plan.accent ? '→' : ''}
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
