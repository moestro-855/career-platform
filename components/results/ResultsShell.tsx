'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TYPE_LABELS, TYPE_EMOJIS, topTypes } from '@/lib/riasec'
import type { TestState, AIAnalysisResult, AIRecommendation, RIASECType } from '@/types'
import { GAMES } from '@/lib/games'
import EmailCapture from './EmailCapture'
import Link from 'next/link'

type Status = 'loading' | 'done' | 'error' | 'no-data'

const loadingMessages = [
  'Анализирую твой профиль личности…',
  'Подбираю профессии специально для тебя…',
  'Строю твой карьерный путь…',
  'Готовлю персональные рекомендации…',
]

function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setMsgIdx(i => (i + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-6 text-center px-6 py-20">
      <div className="relative">
        <div className="text-6xl animate-pulse">🤖</div>
        <div className="absolute -bottom-1 -right-1 text-2xl animate-spin">⚙️</div>
      </div>
      <div>
        <p className="font-display text-xl font-semibold text-fg">{loadingMessages[msgIdx]}</p>
        <p className="text-muted text-sm mt-2">Claude AI думает над твоим профилем</p>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function ProfessionCard({ rec, idx }: { rec: AIRecommendation; idx: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className={`rounded-3xl border p-6 ${idx === 0 ? 'border-accent bg-accent/4' : 'border-border bg-bg'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <h3 className="font-display text-lg font-semibold text-fg">{rec.title}</h3>
        <span className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${idx === 0 ? 'bg-accent text-white' : 'bg-surface text-muted'}`}>
          {rec.matchPercent}%
        </span>
      </div>

      {/* Main explanation */}
      <p className="text-sm text-fg/75 leading-relaxed mb-3">{rec.explanation}</p>

      {/* Why it fits */}
      <div className="rounded-2xl bg-accent/8 border border-accent/15 px-4 py-3 mb-4">
        <p className="text-sm text-accent font-medium">✨ {rec.whyItFits}</p>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="text-xs font-medium text-muted hover:text-fg transition-colors flex items-center gap-1"
      >
        {expanded ? '▲ Свернуть' : '▼ Подробнее: день из жизни и первые шаги'}
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Day in life */}
          {rec.dayInLife && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">📅 День из жизни</p>
              <p className="text-sm text-fg/75 leading-relaxed">{rec.dayInLife}</p>
            </div>
          )}

          {/* First steps */}
          {rec.firstSteps && rec.firstSteps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">🚀 Первые шаги</p>
              <ol className="flex flex-col gap-1.5">
                {rec.firstSteps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-fg/75">
                    <span className="font-bold text-accent shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Subjects */}
          {rec.subjects && rec.subjects.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">📚 Предметы для ЕГЭ/ОГЭ</p>
              <div className="flex flex-wrap gap-2">
                {rec.subjects.map(s => (
                  <span key={s} className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-fg/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Personal note */}
      <p className="text-sm text-accent font-medium italic mt-4">{rec.personalNote}</p>
    </motion.div>
  )
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
      .then(r => r.json())
      .then(data => {
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

  if (status === 'loading') return <LoadingScreen />

  if (status === 'error') {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-6 py-20">
        <span className="text-5xl">😕</span>
        <h1 className="font-display text-2xl font-bold text-fg">Что-то пошло не так</h1>
        <p className="text-muted">Не удалось получить AI-анализ. Попробуй ещё раз.</p>
        <button
          onClick={() => { setStatus('loading'); window.location.reload() }}
          className="mt-4 inline-flex h-11 items-center rounded-2xl bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-h transition-colors"
        >
          Повторить
        </button>
      </div>
    )
  }

  if (!testState || !aiResult) return null

  const top3 = topTypes(testState.riasecScores, 3)
  const maxScore = 12

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 w-full">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-5xl">🎉</span>
        <h1 className="font-display text-4xl font-bold text-fg mt-4">
          {testState.userName}, твой профиль готов!
        </h1>
        <p className="text-muted mt-3 text-lg">Анализ выполнен Claude AI по модели RIASEC</p>

        {/* Top 3 types */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {top3.map((type, i) => (
            <div
              key={type}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 ${i === 0 ? 'border-accent bg-accent/8' : 'border-border bg-surface'}`}
            >
              <span className="text-xl">{TYPE_EMOJIS[type]}</span>
              <span className={`font-semibold text-sm ${i === 0 ? 'text-accent' : 'text-fg'}`}>
                {TYPE_LABELS[type]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Personality Profile ── */}
      {aiResult.personalityProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-accent bg-accent/4 p-6 mb-8"
        >
          <h2 className="font-display text-base font-semibold text-accent mb-3">🧬 Твой профиль личности</h2>
          <p className="text-fg/85 leading-relaxed">{aiResult.personalityProfile}</p>
          {aiResult.motivationKey && (
            <p className="mt-3 text-sm font-medium text-accent/80 italic">⚡ {aiResult.motivationKey}</p>
          )}
        </motion.div>
      )}

      {/* ── Score Bars ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-3xl border border-border bg-surface p-6 mb-8"
      >
        <h2 className="font-display text-lg font-semibold text-fg mb-5">Твои баллы по типам</h2>
        <div className="flex flex-col gap-3">
          {(Object.entries(testState.riasecScores) as [RIASECType, number][])
            .sort(([, a], [, b]) => b - a)
            .map(([type, score]) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-lg w-7">{TYPE_EMOJIS[type]}</span>
                <span className="text-sm text-muted w-36 shrink-0">{TYPE_LABELS[type]}</span>
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / maxScore) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <span className="text-sm font-medium text-fg w-10 text-right">{score}/{maxScore}</span>
              </div>
            ))}
        </div>
      </motion.div>

      {/* ── Strengths & Growth ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4 mb-8"
      >
        <div className="rounded-3xl border border-border bg-bg p-6">
          <h2 className="font-display text-base font-semibold text-fg mb-4">💪 Твои сильные стороны</h2>
          <ul className="flex flex-col gap-2">
            {aiResult.strengths.map(s => (
              <li key={s} className="flex items-start gap-2 text-sm text-fg/80">
                <span className="text-accent mt-0.5 shrink-0">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-bg p-6">
          <h2 className="font-display text-base font-semibold text-fg mb-4">🌱 Зоны роста</h2>
          <ul className="flex flex-col gap-2">
            {aiResult.growthAreas.map(g => (
              <li key={g} className="flex items-start gap-2 text-sm text-fg/80">
                <span className="text-amber-500 mt-0.5 shrink-0">→</span> {g}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Career Path ── */}
      {aiResult.careerPath && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl border border-border bg-surface p-6 mb-10"
        >
          <h2 className="font-display text-base font-semibold text-fg mb-3">🗺️ Твой карьерный путь</h2>
          <p className="text-sm text-fg/75 leading-relaxed">{aiResult.careerPath}</p>
        </motion.div>
      )}

      {/* ── Profession Recommendations ── */}
      <h2 className="font-display text-2xl font-bold text-fg mb-6">🎯 Подходящие профессии</h2>
      <div className="flex flex-col gap-4 mb-14">
        {((aiResult.recommendations ?? []) as AIRecommendation[]).map((rec, i) => (
          <ProfessionCard key={rec.professionId ?? i} rec={rec} idx={i} />
        ))}
      </div>

      {/* ── Email Capture ── */}
      <EmailCapture
        userName={testState.userName}
        topTypes={top3.map(t => TYPE_LABELS[t]).join(', ')}
      />

      {/* ── Mini Games ── */}
      <h2 className="font-display text-2xl font-bold text-fg mb-2 mt-10">🎮 Попробуй профессии в деле</h2>
      <p className="text-muted text-sm mb-6">Короткие сценарии из реальной рабочей жизни</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-14">
        {GAMES.map(game => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className={`rounded-3xl border p-5 transition-all hover:-translate-y-1 hover:shadow-md ${game.color}`}
          >
            <div className="text-3xl mb-2">{game.emoji}</div>
            <div className="font-display text-sm font-semibold text-fg">{game.title}</div>
            <div className="text-xs text-muted mt-1">{game.description}</div>
            <div className="mt-3 text-xs font-medium text-accent">Играть →</div>
          </Link>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="text-center">
        <Link
          href="/test"
          className="inline-flex h-12 items-center rounded-2xl border border-border px-7 text-sm font-medium text-muted hover:text-fg hover:border-fg transition-colors"
        >
          ← Пройти тест заново
        </Link>
      </div>
    </div>
  )
}
