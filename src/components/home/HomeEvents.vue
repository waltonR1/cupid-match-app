<template>
  <view class="bg-semantic-page-subtle text-semantic-text-primary">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-semantic-border-eyebrow"/>
            <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
              {{ t('events.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[56px]">
            {{ t('events.title') }}
            <text class="text-semantic-text-section-highlight"> {{ t('events.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[420px] text-[18px] leading-8 text-semantic-text-muted">
          {{ t('events.subtitle') }}
        </view>
      </view>

      <!-- 活动卡片列表 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <EventOverviewCard
            v-for="event in props.viewModel.events"
            :key="event.id"
            :event="event"
            :fields="props.viewModel.fieldLabels"
            @open="openEventDetail"
        />
      </view>

      <!-- 跳转完整活动页 -->
      <view class="mt-12 flex justify-center">
        <AppButton
            variant="secondary"
            context="section"
            class="min-w-[178px] px-8 tracking-[0.6px]"
            @click="openEventsPage"
        >
          {{ t('events.cta') }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import EventOverviewCard from '@/components/events/EventOverviewCard.vue'
import type {EventPreviewSectionViewModel} from '@/types/events/card'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {openEventDetail, openEventsPage} from '@/utils/navigation'

defineOptions({
  name: 'HomeEvents'
})

/** 首页活动预览数据 */
const props = defineProps<{
  viewModel: EventPreviewSectionViewModel
}>()

/** 首页命名空间文案 */
const {t} = usePageI18n('home')
</script>
