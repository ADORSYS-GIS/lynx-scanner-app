import { removeNotification, selectNotifications, useAppDispatch, useAppSelector } from '../store'
import { Alert, Button } from 'react-daisyui'
import { useCallback } from 'react'

export function Notification() {
  const notifications = useAppSelector(selectNotifications)
  const dispatch = useAppDispatch()
  const remove = useCallback(
    (msg: string) => () => {
      dispatch(removeNotification(msg))
    },
    [dispatch]
  )
  return (
    <div className="px-4 pt-4 absolute">
      {notifications.map((message, index) => (
        <Alert status="error" className="shadow-2xl" key={index}>
          <Button onClick={remove(message)} color="ghost" size="sm" shape="circle">
            Close
          </Button>
          <span>{message}</span>
        </Alert>
      ))}
    </div>
  )
}
