import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src')
    }
  },
  server: {
    port: "80",
    host: '0.0.0.0'
  },
})
