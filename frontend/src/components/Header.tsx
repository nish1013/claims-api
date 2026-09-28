import { useLocation } from 'preact-iso'
import { API_DOCS_URL, SOURCE_URL } from '../api/config'
import { ThemeToggle } from './ThemeToggle'

const LINK = 'whitespace-nowrap rounded-lg px-1.5 py-2 text-muted hover:text-ink sm:px-3'

export function Header() {
  const { path } = useLocation()
  const current = (href: string) => (path === href ? 'page' : undefined)

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4">
        <a href="/" className="shrink-0 text-lg font-semibold tracking-tight">
          Claims<span className="text-accent">API</span>
        </a>
        <nav className="flex items-center text-sm sm:gap-1">
          <a href="/claims" aria-current={current('/claims')} className={LINK}>
            Claims
          </a>
          <a href="/how-it-works" aria-current={current('/how-it-works')} className={LINK}>
            How it works
          </a>
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer" className={LINK}>
            API docs
          </a>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className={`${LINK} hidden sm:inline`}
          >
            Code
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
