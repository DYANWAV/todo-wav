import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type Theme = 'dark' | 'light' | 'system'

const THEME: Record<Theme, Theme> = {
  dark: 'dark',
  light: 'light',
  system: 'system',
}

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || THEME.dark,
  )

  const toggleTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(THEME.light, THEME.dark)

    if (theme === THEME.system) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? THEME.dark
        : THEME.light

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={'icon'}
          className={cn(
            '*:h-[1.2rem] *:w-[1.2rem] *:transition-transform *:duration-300 *:ease-in-out',
          )}
        >
          <Sun className="scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
          <Moon
            className={cn(
              'absolute scale-0 rotate-90',
              theme !== 'system' && 'dark:scale-100 dark:rotate-0',
            )}
          />
          <Monitor
            className={cn(
              'absolute scale-0 rotate-90',
              theme === 'system' && 'scale-100 rotate-0',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTheme('light')}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme('dark')}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme('system')}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
