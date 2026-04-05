import { Outlet } from 'react-router'
import { cn } from './lib/utils'

export const Layout = () => {
  return (
    <>
      <header className={cn('mx-auto flex justify-center p-2')}>
        <h1 className={cn('font-black')}>TODO WAV</h1>
      </header>

      <section className="flex flex-col gap-4">
        <Outlet />
      </section>
    </>
  )
}
