import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { ScanListScreen } from './screens/scan-list.screen'
import { ConfigScreen } from './screens/config.screen'

export const router = createBrowserRouter([
  {
    path: '/scans',
    element: (
      <div className="p-4">
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '',
        Component: ScanListScreen
      }
    ]
  },
  {
    path: '/config',
    Component: ConfigScreen
  },
  {
    path: '*',
    Component: () => <Navigate to="/config" replace={true} />
  }
])
