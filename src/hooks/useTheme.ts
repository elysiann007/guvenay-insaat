import { useCallback, useEffect, useState } from 'react'

/**
 * Three-state theme control.
 *
 * 'system' removes the explicit override entirely and lets
 * `prefers-color-scheme` (handled in src/index.css) decide.
 * 'light' / 'dark' set `data-theme` on <html>, which the CSS in
 * src/index.css treats as an override that wins over the media query
 * in both directions.
 *
 * The choice is persisted to localStorage under STORAGE_KEY. index.html
 * has a blocking inline script that reads the same key before first
 * paint and applies the attribute immediately, so there is no flash of
 * the wrong theme on reload — keep the key in sync with that script.
 */

export type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark'
}

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isThemeMode(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/** Page background per theme — must match --bg in src/index.css. */
const THEME_COLOR: Record<'light' | 'dark', string> = {
  light: '#F8FAFC',
  dark: '#0B1220',
}

/**
 * index.html ships two media-gated <meta name="theme-color"> tags so browser
 * chrome tracks the OS preference before JS runs. Once the user picks an
 * explicit theme those media queries are wrong — someone on OS-dark who
 * chooses light would get light content under dark chrome. Point both tags at
 * the chosen colour so whichever media query matches still reports it, and
 * restore the split when they go back to 'system'.
 */
function applyThemeColor(mode: ThemeMode) {
  const tags = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
  tags.forEach((tag) => {
    const media = tag.getAttribute('media')
    if (mode === 'system') {
      if (media?.includes('dark')) tag.content = THEME_COLOR.dark
      else if (media?.includes('light')) tag.content = THEME_COLOR.light
    } else {
      tag.content = THEME_COLOR[mode]
    }
  })
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }
  applyThemeColor(mode)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(readStoredTheme)

  // Keep the DOM in sync (covers the initial mount too, in case the
  // no-flash script and this state ever disagree).
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // localStorage unavailable (private browsing, storage quota, etc.) —
      // the theme still applies for the current page load.
    }
  }, [])

  const cycleTheme = useCallback(() => {
    setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')
  }, [theme, setTheme])

  return { theme, setTheme, cycleTheme }
}
