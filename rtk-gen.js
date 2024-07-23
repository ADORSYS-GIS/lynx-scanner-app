const { rimraf } = require('rimraf')
const { mkdirSync } = require('node:fs')
const GEN_FOLDER = './src/renderer/src/store/gen'

async function main() {
  await rimraf(GEN_FOLDER)
  mkdirSync(GEN_FOLDER)
}

main()
