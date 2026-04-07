import { Outlet } from 'react-router'
import { ThemeToggle } from './components/theme-toggle'
import { cn } from './lib/utils'

export const Layout = () => {
  return (
    <>
      <div className="px-4">
        <header
          className={cn(
            'mx-auto max-w-4xl flex justify-between items-center p-2',
          )}
        >
          <h1 className={cn('font-black')}>TODO WAV</h1>

          <ThemeToggle />
        </header>

        <section className="flex flex-col gap-4">
          <Outlet />
        </section>
      </div>
    </>
  )
}
