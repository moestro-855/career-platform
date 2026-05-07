'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/school-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, school, email }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="text-6xl mb-4">✅</div>
        <h3 className="font-display text-2xl font-bold text-bg mb-2">Заявка отправлена!</h3>
        <p className="text-bg/60">Свяжемся с вами в течение одного рабочего дня</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
      />
      <input
        type="text"
        placeholder="Название школы"
        value={school}
        onChange={e => setSchool(e.target.value)}
        required
        className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
      />
      <input
        type="email"
        placeholder="Email для связи"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="h-12 rounded-xl bg-bg/10 border border-bg/20 px-4 text-bg placeholder:text-bg/40 focus:outline-none focus:border-accent transition"
      />

      {status === 'error' && (
        <p className="text-rose-400 text-sm">Не удалось отправить. Попробуйте ещё раз.</p>
      )}

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-12 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-h transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
      </motion.button>
    </form>
  )
}
