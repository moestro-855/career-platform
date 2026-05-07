'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import NameStep from './NameStep'
import QuestionCard from './QuestionCard'
import { QUESTIONS } from '@/lib/questions'
import { calculateScores } from '@/lib/riasec'

type Step = 'name' | 'test' | 'saving'

export default function TestShell() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('name')
  const [userName, setUserName] = useState('')
  const [userAge, setUserAge] = useState(0)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleName = useCallback((name: string, age: number) => {
    setUserName(name)
    setUserAge(age)
    setStep('test')
  }, [])

  const handleAnswer = useCallback((value: number) => {
    const question = QUESTIONS[currentIdx]
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentIdx < QUESTIONS.length - 1) {
      // short delay so user sees the selection before advancing
      setTimeout(() => setCurrentIdx((i) => i + 1), 280)
    } else {
      setStep('saving')
      const scores = calculateScores(newAnswers)
      const result = { userName, userAge, answers: newAnswers, riasecScores: scores }
      localStorage.setItem('testResult', JSON.stringify(result))
      router.push('/results')
    }
  }, [currentIdx, answers, userName, userAge, router])

  if (step === 'name') {
    return <NameStep onSubmit={handleName} />
  }

  if (step === 'saving') {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-4 text-center px-6">
        <div className="text-5xl animate-bounce">🤖</div>
        <p className="font-display text-xl font-semibold text-fg">Анализируем твои ответы…</p>
        <p className="text-muted text-sm">Это займёт буквально секунду</p>
      </div>
    )
  }

  const question = QUESTIONS[currentIdx]
  const selected = answers[question.id] ?? null

  return (
    <QuestionCard
      question={question}
      current={currentIdx + 1}
      total={QUESTIONS.length}
      selected={selected}
      onAnswer={handleAnswer}
    />
  )
}
