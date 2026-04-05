import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AddTaskForm } from './components/add-task-form'
import { TaskItem } from './components/task-item'
import { useTaskStore } from './store/task-store'

function App() {
  const count = useTaskStore(x => x.tasksCount)
  const tasks = useTaskStore(x => x.tasks)

  // const location = useLocation()
  // const mask = location.unstable_mask

  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <>
      <AddTaskForm />

      <ul className="flex w-full max-w-lg mx-auto flex-col gap-3">
        {tasks.map(task => {
          return <TaskItem key={task.id} task={task} />
        })}
      </ul>

      <Outlet />
    </>
  )
}

export default App
