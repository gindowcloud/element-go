import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'utils',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: ['index.ts'],
    }
  },
})
