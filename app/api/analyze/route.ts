import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildAnalysisPrompt, PROMPT_VERSION } from '@/lib/prompts'
import type { RIASECScores, AIAnalysisResult } from '@/types'

function safeParseJSON(text: string): AIAnalysisResult | null {
  try {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    const parsed = JSON.parse(match[0])
    if (!parsed.recommendations || !parsed.strengths) return null
    return parsed as AIAnalysisResult
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, age, scores } = await req.json() as {
      name: string
      age: number
      scores: RIASECScores
    }

    if (!name || !age || !scores) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const prompt = buildAnalysisPrompt(name, age, scores)

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const text = completion.choices[0]?.message?.content ?? ''
    const result = safeParseJSON(text)

    if (!result) {
      console.error('[analyze] Failed to parse GPT response:', text.slice(0, 500))
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    return NextResponse.json({ ...result, _promptVersion: PROMPT_VERSION })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[analyze]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
