import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import SignUpForm from './Components/Auth/SingupForm'
import LoginForm from './Components/Auth/LoginForm'
import TaskManager from './Components/Tasks/TasksManager'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,

      },
      {
        path: "/signup",
        element: <SignUpForm />
      },
      {
        path: "/tasks",
        element: <TaskManager />
      }
    ]

  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
