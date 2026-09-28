import { API_DOCS_URL, SOURCE_URL } from '../api/config'
import { ThemeToggle } from './ThemeToggle'

const LINK = 'rounded-lg px-3 py-2 text-muted hover:text-ink'

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="/" className="text-lg font-semibold tracking-tight">
          Claims<span className="text-accent">API</span>
        </a>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer" className={LINK}>
            API docs
          </a>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer" className={LINK}>
            Code
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
