import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: {
        '@core': fileURLToPath(new URL('../core/src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue()
    ]
  }
})
