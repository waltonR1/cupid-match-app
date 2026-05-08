<template>
  <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
    <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
      {{ text.title }}
    </view>
    <view class="mt-2 text-[14px] leading-6 text-semantic-text-muted">
      {{ text.subtitle }}
    </view>
    <view class="mt-4 border border-semantic-border-divider bg-semantic-surface-soft px-4 py-3 text-[13px] text-semantic-text-secondary">
      {{ text.quota }}
    </view>
    <view class="mt-3 text-[13px] leading-6 text-semantic-text-muted">
      {{ text.status }}
    </view>

    <view v-if="data.canRequest" class="mt-5">
      <AppButton variant="primary" size="sm" block @click="emit('request')">
        {{ text.requestButton }}
      </AppButton>
    </view>

    <view v-else class="mt-5 grid gap-3">
      <AppButton variant="secondary" size="sm" block disabled>
        {{ text.disabledButton }}
      </AppButton>

      <view
        v-if="data.showPrivateRoom"
        class="border border-semantic-border-divider bg-semantic-surface-soft px-4 py-4"
      >
        <view class="text-[15px] font-semibold text-semantic-text-primary">
          {{ text.roomTitle }}
        </view>
        <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">
          {{ text.roomSubtitle }}
        </view>
        <view class="mt-4">
          <AppButton variant="primary" size="sm" block @click="emit('open-room')">
            {{ text.roomAction }}
          </AppButton>
        </view>
      </view>

      <view
        v-for="item in text.steps"
        :key="item"
        class="border-b border-semantic-border-divider pb-3 last:border-b-0"
      >
        <view class="mt-2 text-[16px] leading-7 text-semantic-text-secondary">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import AppButton from '@/components/common/AppButton.vue'
import type {PrivateIntroductionPanelText, PrivateIntroductionSectionData} from '@/types/profiles/detail'

defineProps<{
  data: PrivateIntroductionSectionData
  text: PrivateIntroductionPanelText
}>()

const emit = defineEmits<{
  request: []
  'open-room': []
}>()
</script>
