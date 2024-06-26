import { spawn } from 'node:child_process'
import { join } from 'node:path'
import logger from 'electron-log'

const serverLog = logger.scope('server')

const serverBinaryPath = join(
  __dirname,
  '..',
  '..',
  '..',
  'lynx-scanner-backend',
  'build',
  'native',
  'nativeCompile',
  'lynx-backend'
)

const springApp = spawn(serverBinaryPath, [], {
  env: {
    ...process.env,
    SERVER_PORT: '32679',
    SPRING_MAIN_BANNERMODE: 'off',
    LOGGING_LEVEL_ROOT: 'error',
    LOGGING_LEVEL_COM_SSEGNING_LYNX_LYNXBACKEND: 'info'
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

