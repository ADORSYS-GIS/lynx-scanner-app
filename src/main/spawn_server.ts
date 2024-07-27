import { spawn } from 'node:child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { Observable, of, throwError } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { appData, checkServer, downloadServer, serverBinaryPath, serverVersion } from './util'

const serverLog = logger.scope('server')

const startServer = (): Observable<void> => {
  return new Observable<void>((subscriber) => {
    const springApp = spawn(serverBinaryPath, [], {
      env: {
        //...process.env,
        SERVER_PORT: '21007',
        SPRING_MAIN_BANNERMODE: 'off',
        //LOGGING_LEVEL_ROOT: 'error',
        //LOGGING_LEVEL_COM_SSEGNING_LYNX_LYNXBACKEND: 'error',
        FILE_UPLOADDIR: join(appData, 'lynx-scanner-backend', 'uploads'),
        SPRING_DATASOURCE_URL:
          'jdbc:h2:file:' + join(appData, 'lynx-scanner-backend', 'database.db')
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
  serverLog.log('Checking if server app is already downloaded')

  checkServer()
    .pipe(
      switchMap((exist) => (exist ? of(serverVersion) : downloadServer(serverVersion))),
      tap(() => serverLog.log('Server downloaded and made executable')),
      switchMap(startServer),
      catchError((error) => {
        serverLog.error(error)
        return throwError(error)
      })
    )
    .subscribe()
}

startServerIfNotRunning()
