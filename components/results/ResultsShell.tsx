'use client'

import { useEffect, useState } from 'react'
import { TYPE_LABELS, TYPE_EMOJIS, topTypes } from '@/lib/riasec'
import type { TestState, AIAnalysisResult, RIASECType } from '@/types'
import { GAMES } from '@/lib/games'
import EmailCapture from './EmailCapture'
import Link from 'next/link'

type Status = 'loading' | 'done' | 'error' | 'no-data'

interface Recommendation {
  professionId: string
  title: string
  matchPercent: number
  explanation: string
  personalNote: string
}

export default function ResultsShell() {
  const [status, setStatus] = useState<Status>('loading')
  const [testState, setTestState] = useState<TestState | null>(null)
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('testResult')
    if (!raw) { setStatus('no-data'); return }

    const state: TestState = JSON.parse(raw)
    setTestState(state)

    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: state.userName,
        age: state.userAge,
        scores: state.riasecScores,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setAiResult(data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'no-data') {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-6 py-20">
        <span className="text-5xl">🤔</span>
        <h1 className="font-display text-2xl font-bold text-fg">Результатов нет</h1>
        <p className="text-muted">Сначала пройди тест</p>
        <Link href="/test" className="mt-4 inline-flex h-11 items-center rounded-2xl bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-h transition-colors">
          Пройти тест
        </Link>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-5 text-center px-6 py-20">
        <div className="text-6xl animate-pulse">🤖</div>
        <div>
          <p className="font-display text-xl font-semibold text-fg">ИИ анализирует твой профиль…</p>
          <p className="text-muted text-sm mt-2">Подбираем профессии специально для тебя</p>
        </div>
        <div className="flex gap-1.5 mt-4">
          {[0,1,2].map(i => (
            <div key={i} className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-6 py-20">
        <span className="text-5xl">😕</span>
        <h1 className="font-display text-2xl font-bold text-fg">Что-то пошло не так</h1>
        <p className="text-muted">Не удалось получить AI-анализ. Попробуй ещё раз.</p>
        <button onClick={() => { setStatus('loading'); window.location.reload() }}
          className="mt-4 inline-flex h-11 items-center rounded-2xl bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-h transition-colors">
          Повторить
        </button>
      </div>
    )
  }

  if (!testState || !aiResult) return null

  const top3 = topTypes(testState.riasecScores, 3)

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-5xl">🎉</span>
        <h1 className="font-display text-4xl font-bold text-fg mt-4">
          {testState.userName}, твой профиль готов!
        </h1>
        <p className="text-muted mt-3 text-lg">Ведущие типы личности по RIASEC</p>

        {/* Top 3 types */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {top3.map((type, i) => (
            <div key={type} className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 ${i === 0 ? 'border-accent bg-accent/8' : 'border-border bg-surface'}`}>
              <span className="text-xl">{TYPE_EMOJIS[type]}</span>
              <span className={`font-semibold text-sm ${i === 0 ? 'text-accent' : 'text-fg'}`}>{TYPE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Score bars */}
      <div className="rounded-3xl border border-border bg-surface p-6 mb-10">
        <h2 className="font-display text-lg font-semibold text-fg mb-5">Твои баллы по типам</h2>
        <div className="flex flex-col gap-3">
          {(Object.entries(testState.riasecScores) as [RIASECType, number][])
            .sort(([, a], [, b]) => b - a)
            .map(([type, score]) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-lg w-7">{TYPE_EMOJIS[type]}</span>
                <span className="text-sm text-muted w-36 shrink-0">{TYPE_LABELS[type]}</span>
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${(score / 12) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-fg w-10 text-right">{score}/12</span>
              </div>
            ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-3xl border border-border bg-bg p-6">
          <h2 className="font-display text-base font-semibold text-fg mb-4">💪 Твои сильные стороны</h2>
          <ul className="flex flex-col gap-2">
            {aiResult.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-fg/80">
                <span className="text-accent mt-0.5">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-bg p-6">
          <h2 className="font-display text-base font-semibold text-fg mb-4">🌱 Зоны роста</h2>
          <ul className="flex flex-col gap-2">
            {aiResult.growthAreas.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-fg/80">
                <span className="text-amber-500 mt-0.5">→</span> {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Profession recommendations */}
      <h2 className="font-display text-2xl font-bold text-fg mb-6">🎯 Подходящие профессии</h2>
      <div className="flex flex-col gap-4 mb-14">
        {((aiResult.recommendations ?? []) as Recommendation[]).map((rec, i) => (
          <div key={rec.professionId} className={`rounded-3xl border p-6 ${i === 0 ? 'border-accent bg-accent/4' : 'border-border bg-bg'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-semibold text-fg">{rec.title}</h3>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${i === 0 ? 'bg-accent text-white' : 'bg-surface text-muted'}`}>
                {rec.matchPercent}%
              </span>
            </div>
            <p className="text-sm text-fg/75 leading-relaxed mb-3">{rec.explanation}</p>
            <p className="text-sm text-accent font-medium italic">{rec.personalNote}</p>
          </div>
        ))}
      </div>

      {/* Email capture */}
      <EmailCapture
        userName={testState.userName}
        topTypes={top3.map(t => TYPE_LABELS[t]).join(', ')}
      />

      {/* Mini-games */}
      <h2 className="font-display text-2xl font-bold text-fg mb-6">🎮 Попробуй профессии в деле</h2>
      <div className="grid grid-cols-2 gap-4 mb-14">
        {GAMES.map(game => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className={`rounded-3xl border p-6 transition-transform hover:-translate-y-1 ${game.color}`}
          >
            <div className="text-4xl mb-3">{game.emoji}</div>
            <div className="font-display text-base font-semibold text-fg">{game.title}</div>
            <div className="text-xs text-muted mt-1">{game.description}</div>
            <div className="mt-4 text-xs font-medium text-accent">Играть →</div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/test"
          className="inline-flex h-12 items-center rounded-2xl border border-border px-7 text-sm font-medium text-muted hover:text-fg hover:border-fg transition-colors">
          ← Пройти тест заново
        </Link>
      </div>
    </div>
  )
}
