import TestShell from '@/components/test/TestShell'

export const metadata = {
  title: 'Тест профориентации RIASEC — КемСтать',
  description: 'Ответь на 36 вопросов и узнай, какие профессии подходят именно тебе',
}

export default function TestPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Minimal header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-lg font-bold text-fg hover:text-accent transition-colors">
          КемСтать
        </a>
        <span className="text-xs text-muted">Тест профориентации</span>
      </header>

      <TestShell />
    </div>
  )
}
