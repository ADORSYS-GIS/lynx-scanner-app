import { rimraf } from 'rimraf'
import { mkdirp } from 'fs-extra'

const GEN_FOLDER = './src/renderer/src/store/gen'

async function main() {
  await rimraf(GEN_FOLDER)
  await mkdirp(GEN_FOLDER)
}

main()
