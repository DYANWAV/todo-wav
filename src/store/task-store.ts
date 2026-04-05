import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  description: string
  dueDate: Date | string | undefined
  completed: boolean
  position: number
}

interface TaskState {
  tasks: Task[]
  tasksCount: number
}

interface TaskActions {
  addTask: (task: Omit<Task, 'id' | 'position' | 'completed'>) => void
}

export const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    set => ({
      tasks: [],
      tasksCount: 0,
      addTask: task => {
        set(state => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              completed: false,
              position: state.tasksCount,
              ...task,
            },
          ],
          tasksCount: state.tasksCount + 1,
        }))
      },
    }),
    {
      name: 'task-storage',
    },
  ),
)
