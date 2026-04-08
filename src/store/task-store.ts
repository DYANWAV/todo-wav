import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  description: string
  dueDate: Date | undefined
  completed: boolean
  position: number
}

export type Filter = 'all' | 'pending' | 'completed'

interface TaskState {
  tasks: Task[]
  tasksCount: number
  filter: Filter
}

interface TaskActions {
  addTask: (task: Omit<Task, 'id' | 'position' | 'completed'>) => void
  editTask: (id: Pick<Task, 'id'>['id'], task: Partial<Task>) => void
  toggleCompleted: (id: Pick<Task, 'id'>['id']) => void
  deleteTask: (id: Pick<Task, 'id'>['id']) => void
  getTaskById: (id: string | undefined) => Task | undefined
  setFilter: (filter: Filter) => void
}

export const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set, get) => ({
      tasks: [],
      tasksCount: 0,
      filter: 'all',
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
      getTaskById: id => {
        if (!id) return undefined

        const task = get().tasks.find(task => task.id === id)

        return task
      },

      deleteTask: id => {
        const index = get().tasks.findIndex(task => task.id === id)

        if (index === -1) return

        const newTasks = get().tasks

        newTasks.splice(index, 1)

        set(state => ({
          tasks: [...newTasks],
          tasksCount: state.tasksCount - 1,
        }))
      },
      editTask: (id, task) => {
        const index = get().tasks.findIndex(task => task.id === id)

        if (index === -1) return

        const newTasks = get().tasks

        newTasks[index] = {
          ...newTasks[index],
          ...task,
        }

        set(() => ({
          tasks: [...newTasks],
        }))
      },
      toggleCompleted: id => {
        const index = get().tasks.findIndex(task => task.id === id)
        if (index === -1) return

        const newTasks = get().tasks

        newTasks[index].completed = !newTasks[index].completed

        set(() => ({
          tasks: [...newTasks],
        }))
      },
      setFilter: filter => {
        set({ filter })
      },
    }),
    {
      name: 'task-storage',
    },
  ),
)
