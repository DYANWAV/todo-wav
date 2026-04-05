import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AddTaskForm } from './components/add-task-form'
import { TaskItem } from './components/task-item'
import { cn } from './lib/utils'
import { useTaskStore } from './store/task-store'

function App() {
  const count = useTaskStore(x => x.tasksCount)
  const tasks = useTaskStore(x => x.tasks)

  const location = useLocation()
  const mask = location.unstable_mask

  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <>
      <header className={cn('mx-auto flex justify-center p-2')}>
        <h1 className={cn('font-black')}>TODO WAV</h1>
      </header>

      <section className="flex flex-col gap-4">
        <AddTaskForm />

        <ul className="flex w-full max-w-lg mx-auto flex-col gap-3">
          {tasks.map(task => {
            return <TaskItem key={task.id} task={task} />
          })}
        </ul>

        {/* {mask && <TaskDetails />} */}
      </section>

      <Outlet />
    </>
  )
}

export default App
