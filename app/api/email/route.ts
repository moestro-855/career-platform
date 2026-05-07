import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { email, name, topTypes } = await req.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'КемСтать <onboarding@resend.dev>',
      to: 'muradcahaev2387@gmail.com',
      subject: `Новый пользователь прошёл тест: ${name}`,
      html: `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #FAFAF9; margin: 0; padding: 40px 20px;">
  <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 24px; padding: 40px; border: 1px solid #E7E5E4;">
    <h1 style="font-size: 24px; font-weight: 700; color: #1C1917; margin: 0 0 16px;">📬 Новый пользователь прошёл тест</h1>

    <div style="background: #F4F4F5; border-radius: 16px; padding: 20px; margin: 0 0 20px;">
      <p style="margin: 0 0 8px; color: #1C1917;"><b>Имя:</b> ${name}</p>
      <p style="margin: 0 0 8px; color: #1C1917;"><b>Email:</b> ${email}</p>
      <p style="margin: 0; color: #1C1917;"><b>Типы RIASEC:</b> ${topTypes || '—'}</p>
    </div>

    <p style="color: #78716C; font-size: 13px;">Пользователь запросил результаты на почту с сайта КемСтать.</p>
  </div>
</body>
</html>
      `.trim(),
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
