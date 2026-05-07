# CLAUDE.md

## О проекте
Платформа профориентации для школьников 13-17 лет.
Тест → AI-анализ (Claude) → топ-3 профессии → мини-игра.
Ключевая ценность: «Попробуй до выбора».

## Стек
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui + Framer Motion
- Anthropic SDK, модель claude-sonnet-4-6
- localStorage + Resend (MVP), PostHog, Vercel

## Структура
app/page.tsx — Лендинг (7 секций)
app/test/page.tsx — Тест RIASEC
app/results/page.tsx — Результаты + AI
app/play/[profession]/ — Мини-игры
app/api/analyze/route.ts — Claude API
app/api/subscribe/route.ts — Resend email
lib/prompts.ts — Системные промпты (версионировать!)
lib/professions.ts — Каталог профессий
lib/questions.ts — 12 вопросов RIASEC

## Правила
- TypeScript strict, без any
- Server Components по умолчанию, use client только когда нужно
- Framer Motion = всегда use client
- API ключи только в .env.local
- Системные промпты только в lib/prompts.ts

## Прогресс
[x] Фаза 0: Setup
[ ] Фаза 1: Лендинг
[ ] Фаза 2: Тест
[ ] Фаза 3: AI-интеграция
[ ] Фаза 4: Результаты
[ ] Фаза 5: Мини-игра
[ ] Фаза 6: Полировка
[ ] Фаза 7: Деплой
