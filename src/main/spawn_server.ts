import { spawn } from 'node:child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { app } from 'electron'
import arch from 'arch'
import * as fs from 'node:fs'
import axios from 'axios'
import { from, Observable, of, throwError } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'

const serverLog = logger.scope('server')
const appData = app.getPath('userData')
const serverBinaryPath = join(appData, 'lynx-scanner-backend', 'lynx-backend')

const buildDownloadUrl = (version: string, os = getOS(), arch = getArch()): string =>
  `https://github.com/stephane-segning/lynx-scanner-backend/releases/tag/${version}/lynx-backend-${os}-${arch}`

const getOS = (): string => {
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

const getArch = (): string => {
  switch (arch()) {
    case 'arm64':
      return 'arm64'
    case 'x64':
      return 'amd64'
    default:
      throw new Error(`Unsupported arch: ${arch()}`)
  }
}

const checkServer = (): Observable<boolean> => of(fs.existsSync(serverBinaryPath))

const downloadServer = (version: string): Observable<void> => {
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

const startServer = (): Observable<void> => {
  return new Observable<void>((subscriber) => {
    const springApp = spawn(serverBinaryPath, [], {
      env: {
        ...process.env,
        SERVER_PORT: '21007',
        SPRING_MAIN_BANNERMODE: 'off',
        LOGGING_LEVEL_ROOT: 'error',
        LOGGING_LEVEL_COM_SSEGNING_LYNX_LYNXBACKEND: 'error',
        FILE_UPLOADDIR: join(appData, 'lynx-scanner-backend', 'uploads')
      }
    })

    springApp.stdout.on('data', (data) => {
      serverLog.log(data.toString())
    })

    springApp.stderr.on('data', (data) => {
      serverLog.error(data.toString())
    })

    springApp.on('close', (code) => {
      serverLog.log(`child process exited with code ${code}`)
    })

    springApp.on('error', (error) => {
      serverLog.error(error)
    })

    serverLog.log('Server started on port 21007')
    subscriber.next()
  })
}

const startServerIfNotRunning = (): void => {
  const version = process.env.MAIN_VITE_BACKEND_VERSION
  if (!version) {
    throw new Error('MAIN_VITE_BACKEND_VERSION is not set')
  }

  serverLog.log('Checking if server app is already downloaded')

  checkServer()
    .pipe(
      switchMap((exists) => (exists ? of(null) : downloadServer(version))),
      switchMap(startServer),
      catchError((error) => {
        serverLog.error(error)
        return throwError(error)
      })
    )
    .subscribe()
}

startServerIfNotRunning()
