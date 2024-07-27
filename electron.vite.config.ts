import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: 'lynx-scanner',
    resolve: {
      alias: {
        '@renderer': resolve('lynx-scanner')
      }
    },
    plugins: [tsconfigPaths(), react()],
    build: {
      rollupOptions: {
        input: 'lynx-scanner/index.html'
      }
    }
  }
})
