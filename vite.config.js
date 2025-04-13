import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
<<<<<<< HEAD
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
  },
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
  // 設置端口輸出
  server: {
    port: 4201,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
