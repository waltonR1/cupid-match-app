<template>
  <!--
    提示消息外层容器：
    - v-if="visible"：visible 为 true 时显示组件
    - fixed：固定定位，不随页面滚动
    - left-1/2 + -translate-x-1/2：水平居中
    - top-24：距离页面顶部一定距离
    - z-50：提高层级，避免被其他元素遮挡
    - transition-opacity duration-200：透明度过渡动画
  -->
  <view
      v-if="visible"
      class="fixed left-1/2 top-24 z-50 -translate-x-1/2 transition-opacity duration-200"
      :class="visible ? 'opacity-100' : 'opacity-0'"
  >
    <!--
      提示内容区域：
      - flex items-center：图标和文字水平排列并垂直居中
      - gap-3：图标和文字之间的间距
      - border：边框
      - shadow-panel：阴影效果
      - typeClass：根据 success / error / info 切换不同样式
    -->
    <view
        class="flex items-center gap-3 border px-6 py-4 shadow-panel"
        :class="typeClass"
    >
      <!-- 成功状态图标 -->
      <text v-if="type === 'success'" class="text-[18px]">&#10003;</text>

      <!-- 错误状态图标 -->
      <text v-if="type === 'error'" class="text-[18px]">&#10007;</text>

      <!-- 信息提示图标 -->
      <text v-if="type === 'info'" class="text-[18px]">&#9432;</text>

      <!-- 提示文本内容 -->
      <text class="text-[15px] leading-6">{{ message }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

/**
 * Toast / Message 提示组件
 *
 * 用途：
 * - 用于显示全局提示信息
 * - 支持成功、错误、普通信息三种类型
 * - visible 为 true 时显示
 * - 显示一段时间后会自动触发 close 事件
 */
const props = defineProps<{
  /**
   * 控制提示框是否显示
   */
  visible: boolean

  /**
   * 提示消息文本
   */
  message: string

  /**
   * 提示类型
   *
   * success：成功提示
   * error：错误提示
   * info：普通信息提示
   *
   * 不传时默认使用普通样式
   */
  type?: 'success' | 'error' | 'info'

  /**
   * 自动关闭时间，单位为毫秒
   *
   * 不传时默认 2000ms
   */
  duration?: number
}>()

/**
 * 组件向父组件抛出的事件
 */
const emit = defineEmits<{
  /**
   * 提示框自动关闭时触发
   *
   * 父组件通常在这里把 visible 设置为 false
   */
  close: []
}>()

/**
 * 根据提示类型动态计算样式
 *
 * success：绿色/完成状态样式
 * error：红色/危险状态样式
 * info 或未传：默认文本样式
 */
const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-semantic-state-complete bg-semantic-surface-card text-semantic-state-complete'
    case 'error':
      return 'border-semantic-state-danger bg-semantic-surface-card text-semantic-state-danger'
    default:
      return 'border-semantic-border-emphasis bg-semantic-surface-card text-semantic-text-primary'
  }
})

/**
 * 自动关闭定时器
 *
 * 使用变量保存 timer，
 * 方便在 visible 改变时清除旧定时器，
 * 避免多个定时器同时存在
 */
let timer: ReturnType<typeof setTimeout> | null = null

/**
 * 监听 visible 的变化
 *
 * 当 visible 变为 true 时：
 * - 读取 duration
 * - 如果没有传 duration，则默认 2000ms
 * - 到时间后触发 close 事件
 *
 * 当 visible 变化时：
 * - 先清除旧定时器
 * - 避免重复触发 close
 */
watch(
    () => props.visible,
    (val) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      if (val) {
        const ms = props.duration ?? 2000
        timer = setTimeout(() => emit('close'), ms)
      }
    },
)
</script>