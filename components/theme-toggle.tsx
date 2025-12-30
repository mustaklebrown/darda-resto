'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const mounted = useMounted()

    return (
        <Button
            id="theme-toggle"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            disabled={!mounted}
            className="
        rounded-xl
        border border-border/40
        bg-background/60
        backdrop-blur-md
        hover:bg-accent/20
      "
        >
            {mounted ? (
                theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5 opacity-0" />
            )}
        </Button>
    )
}
