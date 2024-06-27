import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}), UnoCSS()],
  define: {
    'process.env': process.env
  },
  server: {
    host: '0.0.0.0', //解决"vite use --host to expose"
    port: 5179,
    open: true,
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
