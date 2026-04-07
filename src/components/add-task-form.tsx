import { cn } from '@/lib/utils'
import { useTaskStore, type Task } from '@/store/task-store'
import { Plus } from 'lucide-react'
import { useRef, useState, type SubmitEvent } from 'react'
import { DatePickerInput } from './date-picker'
import { Button } from './ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from './ui/input-group'

export const AddTaskForm = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const addTask = useTaskStore(x => x.addTask)

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title.trim().length === 0) return

    const newTask: Omit<Task, 'id' | 'position' | 'completed'> = {
      title,
      description,
      dueDate: date,
    }

    console.log({ dueDate: newTask.dueDate })
    addTask(newTask)

    resetForm()
  }

  const resetForm = () => {
    setOpen(false)
    setTitle('')
    setDescription('')
    setDate(undefined)
  }

  const onCancelAddTask = () => {
    if (
      title.trim().length > 0 ||
      description.trim().length > 0 ||
      date !== undefined
    ) {
      dialogRef.current?.showModal()
      return
    }

    resetForm()
  }

  const onChangeDate = (date: Date | undefined) => {
    setDate(date)
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={cn(
          'flex flex-col w-96 max-w-full mx-auto overflow-hidden',
          'border rounded-lg',
          open && 'h-auto',
        )}
      >
        <InputGroup
          className={cn(
            'p-1 h-fit border-transparent',
            'has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-transparent',
            'text-base',
          )}
        >
          <InputGroupInput
            ref={titleInputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Qué quieres hacer hoy?"
            className={cn('pr-1')}
            onFocus={() => setOpen(true)}
          />

          <InputGroupAddon align={'inline-end'} className={cn('py-0')}>
            <InputGroupButton
              size={'icon-sm'}
              variant={'secondary'}
              className={cn('rounded-full')}
              onClick={() => {
                if (!open) {
                  setOpen(true)
                  titleInputRef.current?.focus()
                  return
                }

                onCancelAddTask()
              }}
            >
              <Plus
                className={cn(
                  open && 'rotate-135',
                  'transition-transform duration-300',
                )}
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <div
          className={cn(
            'flex flex-col gap-2',
            'transition-all duration-300 ease-in-out px-2 opacity-0',
            'h-0 overflow-hidden [interpolate-size:allow-keywords]',
            open && 'h-auto border-t py-2 opacity-100',
          )}
        >
          <div className={cn('flex gap-4')}>
            <InputGroup
              className={cn(
                'border-transparent',
                'has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-transparent',
              )}
            >
              <InputGroupTextarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={cn('h-22.5')}
                placeholder="Añade una descripción (opcional)..."
              />
            </InputGroup>
          </div>

          <div className={cn('flex justify-between gap-2')}>
            <DatePickerInput date={date} onChangeDate={onChangeDate} />

            <div className={cn('flex gap-2 self-end')}>
              <Button
                variant={'secondary'}
                type="button"
                onClick={() => onCancelAddTask()}
                className={cn('')}
              >
                Cancelar
              </Button>
              <Button
                className={cn(
                  'disabled:pointer-events-auto disabled:cursor-not-allowed',
                )}
                disabled={title.trim().length === 0}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal de confirmación para cerrar el formulario */}
      <dialog
        ref={dialogRef}
        closedby="any"
        className={cn(
          'm-auto backdrop:bg-black/50 backdrop:backdrop-blur-xs bg-transparent max-w-sm w-[calc(100%-2rem)]',
        )}
      >
        <form method="dialog">
          <Card>
            <CardHeader>
              <CardTitle>¿Descartar cambios?</CardTitle>
              <CardDescription>
                Si aceptas, se borrará todo lo que escribiste
              </CardDescription>
            </CardHeader>

            <CardFooter className={cn('flex gap-2 justify-end')}>
              <Button type="submit" variant={'secondary'}>
                Volver
              </Button>
              <Button onClick={() => resetForm()} variant={'destructive'}>
                Aceptar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </dialog>
    </>
  )
}
