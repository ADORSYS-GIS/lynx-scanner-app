import { Code } from 'react-feather'
import { Button } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'
import { JSX } from 'react'

export function ScanListScreen(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl">Scans</h1>
        <Button color="ghost" onClick={() => navigate('/config')} shape="circle">
          <Code />
        </Button>
      </div>

      <div className="bg-base-100">TODO: List of scans</div>
    </div>
  )
}
