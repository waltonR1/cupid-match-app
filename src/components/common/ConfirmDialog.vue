<template>
  <!--
    弹窗遮罩层：
    - v-if="open"：只有 open 为 true 时才显示弹窗
    - fixed inset-0：铺满整个屏幕
    - z-50：提高层级，避免被其他内容覆盖
    - bg-black/40：半透明黑色背景
    - 点击遮罩层时，触发 close 和 cancel 事件
  -->
  <view
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      @click="$emit('close'); $emit('cancel')"
  >
    <!--
      弹窗主体：
      - max-w-[420px]：限制最大宽度
      - bg-semantic-surface-card：卡片背景色
      - @click.stop：阻止点击弹窗内容时冒泡到遮罩层
        否则点击弹窗内部也会触发关闭
    -->
    <view
        class="w-full max-w-[420px] border border-semantic-border-default bg-semantic-surface-card px-7 py-8 shadow-panel"
        @click.stop
    >
      <!-- 弹窗标题 -->
      <view class="text-[18px] font-semibold text-semantic-text-primary">
        {{ title }}
      </view>

      <!-- 弹窗描述内容 -->
      <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
        {{ description }}
      </view>

      <!--
        底部操作区域：
        - 左侧/右侧按钮靠右排列
        - border-t：上边框，用于分隔内容和操作按钮
      -->
      <view class="mt-7 flex justify-end gap-3 border-t border-semantic-border-soft pt-5">
        <!--
          取消按钮：
          - 点击后触发 cancel 和 close
          - loading 时禁用点击，并降低透明度
        -->
        <view
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] transition-colors hover:bg-semantic-surface-soft"
            :class="loading ? 'pointer-events-none opacity-50' : ''"
            @click="$emit('cancel'); $emit('close')"
        >
          {{ cancelLabel }}
        </view>

        <!--
          确认按钮：
          - 点击后触发 confirm
          - destructive 为 true 时显示危险操作样式，例如删除、清空等
          - loading 时禁用点击，并降低透明度
        -->
        <view
            class="cursor-pointer border px-5 py-2 text-[13px] font-medium transition-opacity"
            :class="[
            loading ? 'pointer-events-none opacity-50' : '',
            destructive
              ? 'border-semantic-state-danger bg-semantic-state-danger text-white'
              : 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-inverse',
          ]"
            @click="$emit('confirm')"
        >
          {{ confirmLabel }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * ConfirmDialog 确认弹窗组件
 *
 * 用途：
 * - 用于删除、取消、提交等需要用户二次确认的操作
 * - 支持普通确认样式和危险操作样式
 * - 支持 loading 状态，避免重复点击
 */
defineProps<{
  /**
   * 控制弹窗是否显示
   */
  open: boolean

  /**
   * 弹窗标题
   */
  title: string

  /**
   * 弹窗描述文本
   */
  description: string

  /**
   * 确认按钮文案
   */
  confirmLabel: string

  /**
   * 取消按钮文案
   */
  cancelLabel: string

  /**
   * 是否为危险操作
   *
   * true 时确认按钮会使用危险样式，
   * 例如红色按钮，适合删除、清空等操作
   */
  destructive?: boolean

  /**
   * 是否处于加载状态
   *
   * true 时按钮会禁用点击，
   * 用于防止用户重复提交
   */
  loading?: boolean
}>()

/**
 * 组件向父组件抛出的事件
 */
defineEmits<{
  /**
   * 点击确认按钮时触发
   */
  confirm: []

  /**
   * 点击取消按钮，或点击遮罩层取消时触发
   */
  cancel: []

  /**
   * 请求关闭弹窗时触发
   */
  close: []
}>()
</script>