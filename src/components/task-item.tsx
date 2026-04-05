import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { useTaskStore, type Task } from '@/store/task-store'
import { Calendar, EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react'

import { Link } from 'react-router'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from './ui/item'

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const deleteTask = useTaskStore(x => x.deleteTask)

  return (
    <Item className={cn('flex')} variant={'outline'}>
      <ItemMedia>
        <Checkbox className={cn('size-5', 'rounded-full', '')} />
      </ItemMedia>

      <ItemContent className={cn('gap-1 flex-1 min-w-0')}>
        <Link to={`/task/${task.id}`} unstable_mask={`/task/${task.id}`}>
          <ItemTitle className={cn('truncate text-base')}>
            {task.title}
          </ItemTitle>
        </Link>

        {task.description && (
          <ItemDescription className={cn('truncate')}>
            {task.description}
          </ItemDescription>
        )}

        {task.dueDate && (
          <Badge variant={'secondary'}>
            <Calendar />
            {formatDate(task.dueDate)}
          </Badge>
        )}
      </ItemContent>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ItemActions
            className={cn(
              'self-start',
              task.dueDate === undefined && 'self-center',
            )}
          >
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </ItemActions>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <Eye />
            Abrir
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Pencil />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => deleteTask(task.id)}
          >
            <Trash />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Item>
  )
}
