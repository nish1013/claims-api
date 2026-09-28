import { useEffect, useState } from 'preact/hooks'
import {
  applyTheme,
  nextTheme,
  onSystemThemeChange,
  readTheme,
  saveTheme,
  Theme,
} from '../theme/theme'

const LABELS: Record<Theme, string> = {
  dark: 'Dark theme',
  light: 'Light theme',
  auto: 'Theme follows the system',
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    if (theme !== 'auto') return
    return onSystemThemeChange(() => applyTheme('auto'))
  }, [theme])

  const cycle = () => {
    const next = nextTheme(theme)
    saveTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${LABELS[theme]}. Switch theme`}
      title={LABELS[theme]}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-raised hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        {theme === 'dark' && <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
        {theme === 'light' && (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
        {theme === 'auto' && (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
          </>
        )}
      </svg>
    </button>
  )
}
