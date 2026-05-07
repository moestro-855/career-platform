import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, school, email } = await req.json()

    if (!name || !school || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const text = `📩 *Новая заявка с КемСтать*\n\n👤 Имя: ${name}\n🏫 Школа: ${school}\n📧 Email: ${email}`

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })

    if (!res.ok) throw new Error('Telegram API error')

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[school-contact]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
