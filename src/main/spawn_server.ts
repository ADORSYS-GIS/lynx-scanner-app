import { spawn } from 'node:child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { app } from 'electron'
import arch from 'arch'

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

const appData = app.getPath('userData')
serverLog.log(`appData: ${appData}`, arch(), buildDownloadUrl('v0.1.0'))

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

function buildDownloadUrl(version: string): string {
  const os = getOS()
  const arch = getArch()
  return `https://github.com/stephane-segning/lynx-scanner-backend/releases/download/${version}/lynx-backend-${os}-${arch}`
}

function getOS(): string {
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

function getArch(): string {
  switch (arch()) {
    case 'arm64':
      return 'arm64'
    case 'x64':
      return 'amd64'
    default:
      throw new Error(`Unsupported arch: ${arch()}`)
  }
}
