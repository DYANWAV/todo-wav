import { cn } from '@/lib/utils'
import { useTaskStore, type Filter } from '@/store/task-store'
import type { HTMLAttributes } from 'react'
import { Button } from './ui/button'
import { ButtonGroup } from './ui/button-group'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Completadas', value: 'completed' },
]

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const TaskFilter = ({ className, ...props }: Props) => {
  const activeFilter = useTaskStore(state => state.filter)
  const setFilter = useTaskStore(state => state.setFilter)

  return (
    <ButtonGroup className={cn('', className)} {...props}>
      {FILTERS.map(({ label, value }) => (
        <>
          <Button
            key={value}
            variant={activeFilter === value ? 'secondary' : 'ghost'}
            onClick={() => setFilter(value)}
            className={cn(
              activeFilter !== value && 'text-accent-foreground/40',
            )}
          >
            {label}
          </Button>
        </>
      ))}
    </ButtonGroup>
  )
}
