import { Outlet } from 'react-router'
import { AddTaskForm } from './components/add-task-form'
import { TaskItem } from './components/task-item'
import { useTaskStore } from './store/task-store'

function App() {
  const tasks = useTaskStore(x => x.tasks)

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
