import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'element-go',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      //忽略打包vue、element-plus
      external: ['vue', 'element-plus'],
      input: ['index.ts'],
    },
  },
})
