'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', toggleTheme: () => {}, setTheme: () => {} })

const THEME_KEY = 'tnt-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    // Premier visit : toujours clair. Ensuite : choix utilisateur mémorisé.
    const initial: Theme = stored === 'dark' || stored === 'light' ? stored : 'light'
    setThemeState(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
    document.documentElement.style.colorScheme = initial
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
    document.documentElement.style.colorScheme = t
    localStorage.setItem(THEME_KEY, t)
  }

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
