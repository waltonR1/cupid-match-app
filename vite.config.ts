import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import {UnifiedViteWeappTailwindcssPlugin as uvwt} from 'weapp-tailwindcss/vite'

// 判断平台
const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp =
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-plus'

// 只在小程序端开启
const enableWeappTailwind = !(isH5 || isApp)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      uni(),
      enableWeappTailwind && uvwt({
        rem2rpx: true,
      })
  ].filter(Boolean),
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
});
