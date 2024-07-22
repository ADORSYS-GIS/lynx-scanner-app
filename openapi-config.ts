import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'lynx-scanner/openapi.yaml',
  apiFile: './src/renderer/src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/renderer/src/store/LynxScannerAppApi.ts',
  exportName: 'LynxScannerAppApi',
  hooks: true
}

export default config
