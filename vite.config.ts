import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

const defaultDevApi = 'http://172.17.114.123:31736/';
const defaultPermissionApi = 'http://172.17.114.123:31738/';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量

  const curDevApi = env.VITE_DEV_API_URL || defaultDevApi;  // 获取.env文件里定义的环境变量VITE_DEV_API，如果没有定义，则使用默认值
  const curPermissionApi = env.VITE_PERMISSION_API_URL || defaultPermissionApi;  // 获取.env文件里定义的环境变量VITE_PERMISSION_API，如果没有定义，则使用默认值

  console.log(mode, curDevApi, env);   //变量在命令行里打印出来
  return defineConfig({
    plugins: [
      vue(), 
      vueJsx({}), 
      UnoCSS(),
      Components({
        resolvers: [NaiveUiResolver()],
      })
    ],
    define: {
      'process.env': process.env
    },
    server: {
      host: '0.0.0.0', //解决"vite use --host to expose"
      port: 5179,
      open: false,
      proxy: {
        // 选项写法
        '/dev-api': {
          target: curDevApi,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, '')
        },
        '/permission': {
          target: curPermissionApi,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/permission/, '')
        }
      },
    },
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
  })
}


