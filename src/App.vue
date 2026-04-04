<script setup lang="ts">
import { watchEffect } from 'vue'
import { onHide, onLaunch, onPageNotFound, onShow } from '@dcloudio/uni-app'
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()

watchEffect(() => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute('data-theme', themeStore.theme)
})

onLaunch(() => {
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
/*姣忎釜椤甸潰鍏叡css */
</style>
