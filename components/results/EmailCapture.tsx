'use client'

import { useState } from 'react'

interface Props {
  userName: string
  topTypes: string
}

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function EmailCapture({ userName, topTypes }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: userName, topTypes }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="text-3xl mb-2">📬</div>
        <p className="font-semibold text-emerald-800">Отправлено!</p>
        <p className="text-sm text-emerald-600 mt-1">Проверь почту — там твой профиль</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 mb-10">
      <div className="flex items-start gap-4">
        <span className="text-3xl shrink-0">📧</span>
        <div className="flex-1">
          <h3 className="font-display text-base font-semibold text-fg mb-1">
            Получи результаты на почту
          </h3>
          <p className="text-sm text-muted mb-4">
            Пришлём краткую сводку профиля — удобно показать родителям или учителю
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="твой@email.ru"
              required
              className="flex-1 h-10 rounded-xl border border-border bg-bg px-3 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-10 rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-h transition-colors disabled:opacity-60 shrink-0"
            >
              {status === 'loading' ? '...' : 'Отправить'}
            </button>
          </form>

          {status === 'error' && (
            <p className="text-xs text-rose-500 mt-2">Не удалось отправить. Попробуй позже.</p>
          )}
        </div>
      </div>
    </div>
  )
}
