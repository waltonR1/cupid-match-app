<template>
  <!-- 协议弹窗遮罩层 -->
  <view
      v-if="open"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-[#07131fcc] px-6 py-10"
      @click="$emit('close')"
  >
    <!-- 协议内容面板 -->
    <view
        class="relative max-h-[80vh] w-full max-w-[760px] overflow-y-auto border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 text-semantic-text-inverse shadow-hero"
        @click.stop
    >
      <!-- 关闭按钮 -->
      <button
          class="absolute right-5 top-5 border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-2 text-[13px] uppercase tracking-[3px] text-semantic-text-hero-label"
          @click="$emit('close')"
      >
        {{ closeText }}
      </button>

      <!-- 弹窗标题区 -->
      <view class="flex items-start gap-6 pr-24">
        <view>
          <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
            {{ kicker }}
          </view>
          <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-semantic-text-inverse">
            {{ title }}
          </view>
        </view>
      </view>

      <!-- 协议正文 -->
      <view
          class="mt-6 border border-semantic-border-hero bg-component-auth-overlay-background-soft px-5 py-4 text-[15px] leading-8 text-semantic-text-hero-body whitespace-pre-line">
        {{ body }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'

/** 协议类型 */
type AgreementKind = 'terms' | 'privacy'

/** 协议弹窗参数 */
const props = defineProps<{
  open: boolean
  kind: AgreementKind
}>()

/** 协议弹窗事件 */
defineEmits<{
  close: []
}>()

/** 协议页面命名空间文案 */
const {t} = usePageI18n('agreements')

/** 弹窗辅助标题 */
const kicker = computed(() => t('kicker'))

/** 关闭按钮文案 */
const closeText = computed(() => t('close'))

/** 当前协议标题 */
const title = computed(() => t(`${props.kind}.title`))

/** 当前协议正文 */
const body = computed(() => [
  t(`${props.kind}.p1`),
  t(`${props.kind}.p2`),
  t(`${props.kind}.p3`),
].join('\n\n'))
</script>