<script setup lang="ts">
import { watchEffect } from 'vue'
import { onHide, onLaunch, onPageNotFound, onShow } from '@dcloudio/uni-app'
import { useThemeStore } from '@/stores/modules/theme'
import { installRouteGuard } from '@/utils/route-guard'

const themeStore = useThemeStore()

watchEffect(() => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute('data-theme', themeStore.theme)
})

onLaunch(() => {
  installRouteGuard()
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})

onPageNotFound(({ path }) => {
  uni.reLaunch({
    url: `/pages/not-found?path=${encodeURIComponent(path)}`,
  })
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
/*每个页面公共css */

   /* #ifdef H5 */
 html,
 body,
 #app,
 uni-app,
 uni-page,
 uni-page-wrapper,
 uni-page-body,
 uni-view,
 uni-text,
 uni-text span {
   -webkit-user-select: text !important;
   -moz-user-select: text !important;
   user-select: text !important;
 }
/* #endif */

</style>
