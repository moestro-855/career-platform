'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GameConfig } from '@/lib/games'
import GameResult from './GameResult'
import Link from 'next/link'

interface Props {
  game: GameConfig
}

export default function GameShell({ game }: Props) {
  const [current, setCurrent] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [done, setDone] = useState(false)

  const scenario = game.scenarios[current]
  const isLast = current === game.scenarios.length - 1

  function handleSelect(idx: number, score: number) {
    if (showFeedback) return
    setSelectedIdx(idx)
    setShowFeedback(true)
    setTotalScore(s => s + score)
  }

  function handleNext() {
    if (isLast) {
      setDone(true)
    } else {
      setCurrent(i => i + 1)
      setSelectedIdx(null)
      setShowFeedback(false)
    }
  }

  if (done) {
    return <GameResult game={game} score={totalScore} maxScore={game.scenarios.length * 3} />
  }

  return (
    <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full px-6 py-12">
      {/* Progress header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/results" className="text-muted hover:text-fg text-sm transition-colors">
          ← Назад
        </Link>
        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((current + 1) / game.scenarios.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-xs text-muted">{current + 1}/{game.scenarios.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {/* Situation block */}
          <div className="rounded-2xl bg-surface border border-border p-5 mb-6">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Ситуация</p>
            <p className="text-fg leading-relaxed text-sm">{scenario.situation}</p>
          </div>

          {/* Question */}
          <h2 className="font-display text-xl font-semibold text-fg mb-5">{scenario.question}</h2>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-6">
            {scenario.options.map((opt, idx) => {
              const isSelected = showFeedback && selectedIdx === idx
              const isBestAnswer = showFeedback && opt.score === 3 && selectedIdx !== idx

              let style = 'border-border bg-bg hover:border-accent/50 hover:bg-surface cursor-pointer'
              if (isSelected) {
                if (opt.score >= 2) style = 'border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default'
                else if (opt.score === 1) style = 'border-amber-400 bg-amber-50 text-amber-800 cursor-default'
                else style = 'border-rose-400 bg-rose-50 text-rose-800 cursor-default'
              } else if (isBestAnswer) {
                style = 'border-emerald-200 bg-emerald-50/40 text-emerald-700 cursor-default'
              } else if (showFeedback) {
                style = 'border-border bg-bg text-muted cursor-default opacity-60'
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback}
                  onClick={() => handleSelect(idx, opt.score)}
                  className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all ${style}`}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {showFeedback && selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-surface p-5 mb-6"
            >
              <p className="text-sm text-fg/80 leading-relaxed">
                💬 {scenario.options[selectedIdx].feedback}
              </p>
            </motion.div>
          )}

          {showFeedback && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full h-12 rounded-2xl bg-accent text-white font-semibold text-sm hover:bg-accent-h transition-colors"
            >
              {isLast ? 'Посмотреть результат →' : 'Следующая ситуация →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
