'use client'

import Link from 'next/link'
import type { GameConfig } from '@/lib/games'

interface Props {
  game: GameConfig
  score: number
  maxScore: number
}

function getVerdict(pct: number) {
  if (pct >= 85) return { label: 'Прирождённый специалист!', emoji: '🏆', color: 'text-emerald-600' }
  if (pct >= 60) return { label: 'Хорошие задатки', emoji: '⭐', color: 'text-amber-500' }
  return { label: 'Есть куда расти', emoji: '📈', color: 'text-accent' }
}

export default function GameResult({ game, score, maxScore }: Props) {
  const pct = Math.round((score / maxScore) * 100)
  const verdict = getVerdict(pct)

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-16 text-center max-w-lg mx-auto w-full">
      <div className="text-6xl mb-4">{verdict.emoji}</div>

      <h1 className="font-display text-3xl font-bold text-fg mb-2">
        Ты справился!
      </h1>
      <p className={`text-lg font-semibold mb-8 ${verdict.color}`}>{verdict.label}</p>

      {/* Score ring */}
      <div className="relative w-36 h-36 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-fg">{pct}%</span>
          <span className="text-xs text-muted">{score}/{maxScore} очков</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 mb-8 text-left w-full">
        <p className="text-sm text-fg/80 leading-relaxed">
          {pct >= 85
            ? `Профессия «${game.title}» тебе очень подходит. Ты принимал взвешенные решения и думал как настоящий специалист. Рекомендуем изучить это направление глубже.`
            : pct >= 60
            ? `У тебя есть хорошие задатки для профессии «${game.title}». Некоторые решения были не оптимальными, но это нормально — опыт приходит с практикой.`
            : `Профессия «${game.title}» требует навыков, которые пока в стадии развития. Это не значит «не твоё» — попробуй другие профессии и сравни результаты.`}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link
          href="/results"
          className="h-12 rounded-2xl bg-accent text-white font-semibold text-sm flex items-center justify-center hover:bg-accent-h transition-colors"
        >
          ← Вернуться к результатам
        </Link>
        <Link
          href="/test"
          className="h-12 rounded-2xl border border-border text-muted text-sm flex items-center justify-center hover:text-fg hover:border-fg transition-colors"
        >
          Пройти тест заново
        </Link>
      </div>
    </div>
  )
}
