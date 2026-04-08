import { Outlet } from 'react-router'
import { AddTaskForm } from './components/add-task-form'
import { TaskFilter } from './components/task-filter'
import { TaskItem } from './components/task-item'
import { cn } from './lib/utils'
import { useTaskStore } from './store/task-store'

function App() {
  const tasks = useTaskStore(x => x.tasks)
  const filter = useTaskStore(x => x.filter)

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <>
      <AddTaskForm />

      <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
        <TaskFilter className={cn('self-end')} />
        <ul className="flex w-full flex-col gap-3">
          {filteredTasks.map(task => {
            return <TaskItem key={task.id} task={task} />
          })}
        </ul>
      </div>

      <Outlet />
    </>
  )
}

export default App
