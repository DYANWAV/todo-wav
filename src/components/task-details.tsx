import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { useTaskStore } from '@/store/task-store'
import { Calendar, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'

export const TaskDetails = () => {
  const getTaskById = useTaskStore(x => x.getTaskById)
  const { id } = useParams()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  const task = getTaskById(id)

  const closeDialog = () => {
    // Navegamos un paso hacia atrás en el historial para "cerrar" la máscara
    // y restaurar la URL original
    navigate('/')
  }

  useEffect(() => {
    // Abrimos el dialog como un modal modal nativo cuando el componente se monta
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      onClose={() => closeDialog()}
      className={cn(
        'm-auto backdrop:bg-black/50 backdrop:backdrop-blur-xs bg-transparent max-w-sm w-[calc(100%-2rem)]',
      )}
    >
      <form method="dialog">
        <Card>
          <CardHeader>
            <CardAction onClick={() => closeDialog()}>
              <Button
                variant={'ghost'}
                size={'icon'}
                className={cn('rounded-full')}
              >
                <X />
              </Button>
            </CardAction>
            <CardTitle>
              <Input
                className={cn(
                  'p-0 border-none',
                  'w-full border-transparent text-base sm:text-lg',
                  'focus-visible:ring-0',
                )}
                value={task?.title}
                onChange={() => {}}
              />
            </CardTitle>
            <CardDescription>{task?.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Badge variant={'secondary'}>
              <Calendar />
              {formatDate(task?.dueDate, 'long')}
            </Badge>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </form>
    </dialog>
  )
}
