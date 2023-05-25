import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ include: './lib' })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'element-go'
    },
    rollupOptions: {
      external: [
        'vue', 
        '@videojs-player/vue'
      ],
      output: { globals: { vue: 'Vue' } }
    }
  }
})
