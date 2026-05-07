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
      from: 'КемСтать <noreply@kemstat.ru>',
      to: email,
      subject: `${name}, твой профиль профориентации готов`,
      html: `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #FAFAF9; margin: 0; padding: 40px 20px;">
  <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 24px; padding: 40px; border: 1px solid #E7E5E4;">
    <h1 style="font-size: 28px; font-weight: 700; color: #1C1917; margin: 0 0 8px;">Привет, ${name}! 👋</h1>
    <p style="color: #78716C; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
      Твой тест профориентации завершён. Вот краткая сводка твоего профиля:
    </p>

    <div style="background: #F4F4F5; border-radius: 16px; padding: 20px; margin: 0 0 24px;">
      <p style="font-size: 13px; color: #78716C; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Ведущие типы личности</p>
      <p style="font-size: 18px; font-weight: 600; color: #1C1917; margin: 0;">${topTypes || 'см. на сайте'}</p>
    </div>

    <a href="https://kemstat.ru/results"
      style="display: inline-block; background: #6366F1; color: white; text-decoration: none; padding: 14px 28px; border-radius: 16px; font-weight: 600; font-size: 15px; margin: 0 0 24px;">
      Смотреть полный профиль →
    </a>

    <p style="color: #78716C; font-size: 13px; line-height: 1.6; margin: 0; border-top: 1px solid #E7E5E4; padding-top: 20px;">
      Ты получил это письмо, потому что прошёл тест на КемСтать.
      Если это были не вы — просто проигнорируйте письмо.
    </p>
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
