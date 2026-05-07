import ResultsShell from '@/components/results/ResultsShell'

export const metadata = {
  title: 'Твой профиль профориентации — КемСтать',
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-lg font-bold text-fg hover:text-accent transition-colors">
          КемСтать
        </a>
        <span className="text-xs text-muted">Результаты теста</span>
      </header>

      <ResultsShell />
    </div>
  )
}
