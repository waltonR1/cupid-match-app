<script setup lang="ts">
import { onHide, onLaunch, onPageNotFound, onShow } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

onPageNotFound(({ path }) => {
  uni.reLaunch({
    url: `/pages/not-found?path=${encodeURIComponent(path)}`,
  });
});
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
/*每个页面公共css */
</style>
