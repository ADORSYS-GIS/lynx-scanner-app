import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { JSX } from 'react'
import { Notification } from './components/notification'

export function App(): JSX.Element {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Notification />
      <RouterProvider router={router} />
    </div>
  )
}
