import { cn } from '@/lib/utils'
import { useTaskStore } from '@/store/task-store'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { DatePickerInput } from './date-picker'
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
  const [dialogNode, setDialogNode] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()

  const onClose = () => {
    navigate(-1)
  }

  const closeDialog = () => dialogRef.current?.close()

  const onChangeDate = (date: Date | undefined) => {
    setEditDueDate(date)
  }

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
      setDialogNode(dialogRef.current)
    }
  }, [])

  if (!task) return null

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      closedby="any"
      className={cn(
        'm-auto backdrop:bg-black/50 backdrop:backdrop-blur-xs bg-transparent max-w-sm w-[calc(100%-2rem)]',
      )}
    >
      <form
        method="dialog"
        onSubmit={() => {
          // e.preventDefault()

          if (editTitle?.trim().length === 0) return

          editTask(task.id, {
            title: editTitle?.trim(),
            description: editDescription?.trim(),
            dueDate: editDueDate,
          })
        }}
      >
        <Card>
          <CardHeader className={cn('border- gap-0')}>
            <CardAction onClick={closeDialog}>
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

            <DatePickerInput
              container={dialogNode}
              className={cn('z-auto')}
              date={editDueDate}
              onChangeDate={onChangeDate}
            />
          </CardContent>

          <CardFooter className={cn('flex justify-end gap-2')}>
            <Button variant={'outline'} type="button" onClick={closeDialog}>
              Cancelar
            </Button>

            <Button
              className={cn('justify-self-end')}
              onClick={() => {
                editTask(task.id, {
                  title: editTitle,
                  description: editDescription,
                  dueDate: editDueDate,
                })

                // closeDialog()
              }}
              disabled={
                (task?.title === editTitle &&
                  task?.description === editDescription &&
                  task?.dueDate === editDueDate) ||
                editTitle?.length === 0
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
