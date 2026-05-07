'use client'

import { useState } from 'react'

interface Props {
  onSubmit: (name: string, age: number) => void
}

export default function NameStep({ onSubmit }: Props) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ageNum = parseInt(age)
    if (!name.trim()) { setError('Введи своё имя'); return }
    if (!ageNum || ageNum < 10 || ageNum > 25) { setError('Введи возраст от 10 до 25 лет'); return }
    onSubmit(name.trim(), ageNum)
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-5xl">👋</span>
          <h1 className="font-display text-3xl font-bold text-fg mt-4">
            Привет! Давай познакомимся
          </h1>
          <p className="text-muted mt-3">
            Это поможет ИИ дать тебе более точные рекомендации
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-fg">
              Твоё имя
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder="Например, Саша"
              className="h-12 rounded-xl border border-border bg-surface px-4 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="age" className="text-sm font-medium text-fg">
              Сколько тебе лет?
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => { setAge(e.target.value); setError('') }}
              placeholder="13–17"
              min={10}
              max={25}
              className="h-12 rounded-xl border border-border bg-surface px-4 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>

          {error && (
            <p className="text-sm text-rose-500">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 h-13 rounded-2xl bg-accent px-6 text-base font-semibold text-white transition-colors hover:bg-accent-h disabled:opacity-50"
          >
            Начать тест →
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          36 вопросов · около 10 минут · полностью бесплатно
        </p>
      </div>
    </div>
  )
}
