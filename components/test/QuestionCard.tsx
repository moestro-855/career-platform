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
  const progress = ((current) / total) * 100

  return (
    <div className="flex flex-1 flex-col px-6 py-12 max-w-xl mx-auto w-full">
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
          transition={{ duration: 0.25 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="font-display text-2xl font-semibold text-fg leading-snug mb-10">
            {question.text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className={`relative rounded-2xl border px-6 py-4 text-left text-base font-medium transition-all
                  ${selected === opt.value
                    ? 'border-accent bg-accent text-white shadow-md'
                    : 'border-border bg-bg text-fg hover:border-accent/50 hover:bg-surface'
                  }`}
              >
                {opt.label}
                {selected === opt.value && (
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
