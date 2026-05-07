import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { TYPE_LABELS, topTypes } from '@/lib/riasec'
import type { RIASECScores, AIAnalysisResult } from '@/types'

function buildPrompt(name: string, age: number, scores: RIASECScores): string {
  const top3 = topTypes(scores, 3)
  const scoresText = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([t, s]) => `${TYPE_LABELS[t as keyof typeof TYPE_LABELS]}: ${s}/12`)
    .join(', ')

  return `Ты эксперт по профориентации для подростков. Проанализируй результаты теста RIASEC и дай персональные рекомендации.

Имя: ${name}, возраст: ${age} лет
Результаты RIASEC: ${scoresText}
Ведущие типы: ${top3.map(t => TYPE_LABELS[t]).join(', ')}

Ответь строго в JSON формате:
{
  "recommendations": [
    {
      "professionId": "slug профессии (например: doctor, programmer, designer)",
      "title": "Название профессии",
      "matchPercent": число от 70 до 99,
      "explanation": "2-3 предложения почему эта профессия подходит именно этому человеку с учётом его RIASEC-профиля",
      "personalNote": "Короткое личное обращение к ${name} (1 предложение) — тёплое и мотивирующее"
    }
  ],
  "strengths": ["сильная сторона 1", "сильная сторона 2", "сильная сторона 3"],
  "growthAreas": ["зона роста 1", "зона роста 2"]
}

Дай ровно 4 рекомендации профессий. Пиши на русском, тон дружелюбный и поддерживающий, обращайся на «ты».`
}

function safeParseJSON(text: string): AIAnalysisResult | null {
  try {
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, age, scores } = await req.json()

    if (!name || !age || !scores) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: buildPrompt(name, age, scores) }],
      temperature: 0.7,
      max_tokens: 1200,
    })

    const text = completion.choices[0]?.message?.content ?? ''
    const result = safeParseJSON(text)

    if (!result) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[analyze]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
