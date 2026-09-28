export type Theme = 'dark' | 'light' | 'auto'

const STORAGE_KEY = 'theme'
const ORDER: Theme[] = ['dark', 'light', 'auto']
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

export function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return ORDER.includes(saved as Theme) ? (saved as Theme) : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private mode can block storage; the choice still applies for this visit.
  }
  applyTheme(theme)
}

export function applyTheme(theme: Theme): void {
  const dark = theme === 'dark' || (theme === 'auto' && darkQuery.matches)
  document.documentElement.classList.toggle('dark', dark)
}

export function nextTheme(theme: Theme): Theme {
  return ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]
}

export function onSystemThemeChange(listener: () => void): () => void {
  darkQuery.addEventListener('change', listener)
  return () => darkQuery.removeEventListener('change', listener)
}
