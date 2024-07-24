import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Loading } from 'react-daisyui'
import QRCode from 'react-qr-code'
import { urlConfigSelector, useAppSelector, useFetchConfigUrl } from '../store'
import { ArrowRight } from 'react-feather'

export function ConfigScreen() {
  const navigate = useNavigate()
  const getUrl = useFetchConfigUrl()
  const url = useAppSelector(urlConfigSelector)

  const toScan = useCallback(() => navigate('/scans'), [navigate])
  useEffect(() => getUrl(), [getUrl])

  return (
    <div className="flex justify-center items-center h-[100vh] p-4">
      <Card className="max-w-sm flex flex-col justify-center">
        <figure>
          {!url && <Loading />}
          {url && <QRCode value={url} />}
        </figure>
        <Card.Body>QR Code</Card.Body>
        <Card.Actions>
          <Button fullWidth color="primary" onClick={toScan}>
            <span>To Scans</span>
            <ArrowRight />
          </Button>
        </Card.Actions>
      </Card>
    </div>
  )
}
