import type { ConfigFile } from '@rtk-query/codegen-openapi'

const baseDir = './src/renderer/src/store/gen'

const config: ConfigFile = {
  schemaFile: 'lynx-scanner/openapi.yaml',
  apiFile: './src/renderer/src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  hooks: true,
  outputFiles: {
    [`${baseDir}/scans.api.gen.ts`]: {
      filterEndpoints: /scan/i,
      exportName: 'ScansApi'
    },
    [`${baseDir}/files.api.gen.ts`]: {
      filterEndpoints: [/file/i],
      exportName: 'FilesApi'
    }
  }
}

export default config
