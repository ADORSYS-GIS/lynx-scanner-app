import arch from 'arch'
import { join } from 'node:path'
import { from, Observable, of } from 'rxjs'
import fs from 'node:fs'
import { switchMap, tap } from 'rxjs/operators'
import axios from 'axios'
import { app } from 'electron'
import logger from 'electron-log'

export const serverVersion = import.meta.env.MAIN_VITE_BACKEND_VERSION
const serverLog = logger.scope('utils')

export const appData = app.getPath('userData')
export const serverBinaryPath = join(
  appData,
  'lynx-scanner-backend',
  `lynx-backend-${serverVersion}`
)

export const buildDownloadUrl = (version: string, os = getOS(), arch = getArch()): string =>
  `https://github.com/stephane-segning/lynx-scanner-backend/releases/download/${version}/lynx-backend-${os}-${arch}`

export const getOS = (): string => {
  switch (process.platform) {
    case 'darwin':
      return 'macos'
    case 'win32':
      return 'windows'
    case 'linux':
      return 'linux'
    default:
      throw new Error(`Unsupported OS: ${process.platform}`)
  }
}

export const getArch = (): string => {
  switch (arch()) {
    case 'arm64':
      return 'arm64'
    case 'x64':
      return 'x64'
    default:
      throw new Error(`Unsupported arch: ${arch()}`)
  }
}

export const checkServer = (): Observable<boolean> => of(fs.existsSync(serverBinaryPath))

export const downloadServer = (version: string): Observable<void> => {
  const url = buildDownloadUrl(version)
  serverLog.log(`Downloading server from ${url}`)

  return downloadFile(url, serverBinaryPath).pipe(
    switchMap(makeExec),
    tap(() => serverLog.log('Server downloaded and made executable'))
  )
}

const downloadFile = (url: string, dest: string): Observable<void> => {
  const parentDir = join(dest, '..')
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true })
  }

  const file = fs.createWriteStream(dest)
  return new Observable<void>((subscriber) => {
    axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
      .then((response) => {
        response.data.pipe(file)
        file.on('finish', () => {
          file.close()
          subscriber.next()
        })
      })
      .catch((error) => {
        file.close()
        fs.unlinkSync(dest)
        subscriber.error(error)
      })
  })
}

const makeExec = (): Observable<void> => from(fs.promises.chmod(serverBinaryPath, '755'))
