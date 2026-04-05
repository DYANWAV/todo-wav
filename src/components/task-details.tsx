import { formatDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { useTaskStore } from '@/store/task-store'
import { Calendar, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from './ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export const TaskDetails = () => {
  const editTask = useTaskStore(x => x.editTask)
  const getTaskById = useTaskStore(x => x.getTaskById)
  const { id } = useParams()
  const task = getTaskById(id)
  const [editTitle, setEditTitle] = useState(task?.title.trim())
  const [editDescription, setEditDescription] = useState(
    task?.description.trim(),
  )
  const [editDueDate, setEditDueDate] = useState(task?.dueDate)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  const closeDialog = () => {
    navigate(-1)
  }

  useEffect(() => {
    console.log(task?.dueDate)

    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [task?.dueDate])

  if (!task) return null

  return (
    <dialog
      ref={dialogRef}
      onClose={() => closeDialog()}
      closedby="any"
      className={cn(
        'm-auto backdrop:bg-black/50 backdrop:backdrop-blur-xs bg-transparent max-w-sm w-[calc(100%-2rem)]',
      )}
    >
      <form method="dialog">
        <Card>
          <CardHeader className={cn('border-b gap-0')}>
            <CardAction onClick={() => closeDialog()}>
              <Button
                variant={'ghost'}
                size={'icon'}
                className={cn('rounded-full')}
              >
                <X />
              </Button>
            </CardAction>
            <CardTitle className={cn('group-data-[size=sm]/card:text-lg')}>
              <Input
                className={cn(
                  'py-0 border-transparent md:text-base',
                  'w-full text-xl',
                  'focus-visible:ring-0',
                )}
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
            </CardTitle>
          </CardHeader>

          <CardContent className={cn('flex flex-col gap-3')}>
            <Field>
              <FieldLabel htmlFor="description">Descripción</FieldLabel>

              <Textarea
                id="description"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Añade una descripción (opcional)..."
                className={cn(
                  'max-h-75 resize-none',
                  ' focus-visible:ring-transparent',
                )}
              />
            </Field>

            {task.dueDate && (
              <Button
                type="button"
                variant={'ghost'}
                className={cn('self-start')}
              >
                <Calendar />
                {formatDate(task?.dueDate, 'long')}
              </Button>
            )}
          </CardContent>

          <CardFooter className={cn('flex justify-end gap-2')}>
            <Button variant={'outline'}>Cancelar</Button>

            <Button
              className={cn('justify-self-end')}
              onClick={() => {
                editTask(task.id, {
                  title: editTitle,
                  description: editDescription,
                  dueDate: editDueDate,
                })
              }}
              disabled={
                task?.title === editTitle &&
                task?.description === editDescription &&
                task?.dueDate === editDueDate
              }
            >
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </dialog>
  )
}
