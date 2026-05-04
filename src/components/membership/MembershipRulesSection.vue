<template>
  <view class="bg-semantic-page-default text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <!-- Membership Rules 内容区域 -->
      <view class="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <!-- 左侧规则介绍 -->
        <view>
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
              {{ t('rules.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.15] text-semantic-text-primary lg:text-[66px]">
            {{ t('rules.title') }}
            <text class="text-semantic-text-section-highlight"> {{ t('rules.titleAccent') }}</text>
          </view>

          <view class="mt-10 max-w-[660px] text-[19px] italic leading-[1.95] text-semantic-text-lead">
            {{ t('rules.description') }}
          </view>

          <view class="mt-8 max-w-[660px] text-[19px] italic leading-[1.95] text-semantic-text-lead">
            {{ t('rules.secondaryDescription') }}
          </view>
        </view>

        <!-- 右侧规则内容 -->
        <view class="grid gap-6">
          <!-- 规则标签列表 -->
          <view class="grid gap-6 md:grid-cols-3">
            <view
                v-for="item in ruleTags"
                :key="item.title"
                class="border px-7 py-6"
                :class="item.emphasis
                ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis shadow-emphasis'
                : 'border-semantic-border-default bg-component-editorial-card-background shadow-panel hover:border-component-editorial-card-border-hover hover:bg-component-editorial-card-background-hover'"
            >
              <view class="text-[22px] font-medium"
                    :class="item.emphasis ? 'text-component-membership-rule-emphasis' : 'text-semantic-text-primary'">
                {{ t(item.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-semantic-text-secondary">
                {{ t(item.desc) }}
              </view>
            </view>
          </view>

          <!-- 流程与重点说明 -->
          <view class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <!-- 申请流程 -->
            <view class="border border-semantic-border-default bg-semantic-surface-panel px-8 py-8 shadow-panel">
              <view class="text-[20px] font-medium text-semantic-text-primary">
                {{ t('rules.processTitle') }}
              </view>

              <view class="mt-6 grid gap-4">
                <view class="flex gap-4 border-b border-semantic-border-divider pb-4">
                  <view class="text-[26px] font-semibold text-component-membership-rule-emphasis">01</view>
                  <view class="text-[16px] leading-8 text-semantic-text-secondary">{{ t('rules.process1') }}</view>
                </view>

                <view class="flex gap-4 border-b border-semantic-border-divider pb-4">
                  <view class="text-[26px] font-semibold text-component-membership-rule-emphasis">02</view>
                  <view class="text-[16px] leading-8 text-semantic-text-secondary">{{ t('rules.process2') }}</view>
                </view>

                <view class="flex gap-4">
                  <view class="text-[26px] font-semibold text-component-membership-rule-emphasis">03</view>
                  <view class="text-[16px] leading-8 text-semantic-text-secondary">{{ t('rules.process3') }}</view>
                </view>
              </view>
            </view>

            <!-- 重点规则说明卡片 -->
            <view class="border border-semantic-border-emphasis bg-semantic-surface-emphasis px-8 py-8 shadow-emphasis">
              <view class="text-[24px] leading-[1.7] text-semantic-text-primary">
                {{ t('rules.card1') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-semantic-text-secondary">
                {{ t('rules.card1Sub') }}
              </view>

              <view class="mt-8 h-px w-full bg-semantic-border-emphasis-divider"/>

              <view class="mt-8 text-[24px] leading-[1.7] text-semantic-text-primary">
                {{ t('rules.card2') }}
              </view>
              <view class="mt-5 text-[16px] italic leading-8 text-semantic-text-secondary">
                {{ t('rules.card2Sub') }}
              </view>

              <AppButton
                  variant="primary"
                  size="lg"
                  width="cta"
                  rounded="none"
                  class="mt-8"
                  @click="emit('openPlan', 'vip')"
              >
                {{ t('rules.finalCta') }}
              </AppButton>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'

/** Membership Rules 操作事件 */
const emit = defineEmits<{
  openPlan: [plan: string]
}>()

/** Membership 页面命名空间文案 */
const {t} = usePageI18n('membership')

/** 会员规则标签数据 */
const ruleTags = [
  {title: 'rules.tag1.title', desc: 'rules.tag1.desc', emphasis: true},
  {title: 'rules.tag2.title', desc: 'rules.tag2.desc', emphasis: false},
  {title: 'rules.tag3.title', desc: 'rules.tag3.desc', emphasis: false},
]
</script>