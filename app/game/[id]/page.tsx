import { notFound } from 'next/navigation'
import { getGame, GAMES } from '@/lib/games'
import GameShell from '@/components/game/GameShell'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return GAMES.map(g => ({ id: g.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const game = getGame(id)
  return {
    title: game ? `Мини-игра: ${game.title} — КемСтать` : 'Игра не найдена',
  }
}

export default async function GamePage({ params }: Props) {
  const { id } = await params
  const game = getGame(id)
  if (!game) notFound()

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-lg font-bold text-fg hover:text-accent transition-colors">
          КемСтать
        </a>
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>{game.emoji}</span>
          <span>{game.title}</span>
        </div>
      </header>

      <GameShell game={game} />
    </div>
  )
}
