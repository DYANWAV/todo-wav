import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import { TaskDetails } from './components/task-details.tsx'
import './index.css'
import { Layout } from './layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        Component: App,
        children: [
          {
            path: 'task/:id',
            Component: TaskDetails,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
