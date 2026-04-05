import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { type Task } from '@/store/task-store'
import { Calendar, EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react'

import { Link } from 'react-router'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
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
  ItemTitle,
} from './ui/item'

interface Props {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  return (
    <Item className={cn('flex')} variant={'outline'}>
      <ItemContent className={cn('gap-1 flex-1 min-w-0')}>
        {/* <a href=""> */}
        <Link to={`/task/${task.id}`} unstable_mask={`/task/${task.id}`}>
          <ItemTitle className={cn('truncate text-base')}>
            {task.title}
          </ItemTitle>
        </Link>
        {/* </a> */}

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

          <DropdownMenuItem>
            <Trash />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Item>
  )
}
