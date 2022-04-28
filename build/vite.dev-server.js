import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as common from './webpack.common';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VUE_APP') };

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
        },
      },
    },
    envPrefix: 'VUE_APP',
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: common.resolve.alias,
    },
    plugins: [vue()],
  };
});
