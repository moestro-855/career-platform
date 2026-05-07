'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '@/types'

interface Props {
  question: Question
  current: number
  total: number
  selected: number | null
  onAnswer: (value: number) => void
}

export default function QuestionCard({ question, current, total, selected, onAnswer }: Props) {
  const progress = (current / total) * 100

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-xl mx-auto w-full">

      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Вопрос {current} из {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.22 }}
          className="flex-1 flex flex-col"
        >
          {/* Emoji + Question */}
          <div className="mb-8">
            <div className="text-5xl mb-4">{question.emoji}</div>
            <h2 className="font-display text-2xl font-semibold text-fg leading-snug">
              {question.text}
            </h2>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => {
              const isSelected = selected === opt.value
              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer(opt.value)}
                  className={`relative rounded-2xl border px-6 py-4 text-left text-base font-medium transition-all
                    ${isSelected
                      ? 'border-accent bg-accent text-white shadow-md'
                      : 'border-border bg-bg text-fg hover:border-accent/50 hover:bg-surface'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all
                      ${isSelected
                        ? 'border-white bg-white text-accent'
                        : 'border-border text-transparent'
                      }`}
                    >
                      {isSelected ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    {opt.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
