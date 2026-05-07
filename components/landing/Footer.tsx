import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-10 px-6">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <span className="font-display text-lg font-bold text-fg">КемСтать</span>
          <p className="text-xs text-muted mt-1">Профориентация для школьников 13–17 лет</p>
        </div>

        <nav className="flex gap-6 text-sm text-muted">
          <Link href="/test" className="hover:text-fg transition-colors">Тест</Link>
          <Link href="/schools" className="hover:text-fg transition-colors">Школам</Link>
          <Link href="/privacy" className="hover:text-fg transition-colors">Конфиденциальность</Link>
        </nav>

        <p className="text-xs text-muted">© 2026 КемСтать</p>
      </div>
    </footer>
  )
}
