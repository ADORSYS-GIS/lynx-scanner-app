import { JSX, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-daisyui'
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'
import { urlConfigSelector } from '../store/slices/config.slice'
import { fetchConfigUrl } from '../store/thunks/fetch.config-url'

export function ConfigScreen(): JSX.Element {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const toScan = useCallback(() => {
    navigate('/scans')
  }, [navigate])

  const url = useSelector(urlConfigSelector)

  const getUrl = useCallback(() => {
    dispatch(fetchConfigUrl())
  }, [dispatch])

  useEffect(() => {
    getUrl()
  }, [getUrl])
  return (
    <div className="flex justify-center items-center h-[100vh] p-4">
      <div className="max-w-sm flex flex-col justify-center gap-4">
        <figure>{url && <QRCode value={url} />}</figure>
        <div>QR Code</div>
        <Card.Actions>
          <Button fullWidth color="primary" onClick={toScan}>
            To Scans
          </Button>
        </Card.Actions>
      </div>
    </div>
  )
}
