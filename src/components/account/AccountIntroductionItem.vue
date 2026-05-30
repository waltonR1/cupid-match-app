<template>
  <view class="grid gap-4 border-b border-semantic-border-soft px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)]">
    <image :src="item.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />

    <view class="min-w-0">
      <view class="flex flex-wrap items-start justify-between gap-3">
        <view>
          <view class="font-medium">{{ item.targetDisplayName }}</view>
          <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ t(`introduction.status.${item.status}`) }}</view>
        </view>

        <view class="text-[12px] text-semantic-text-card-label">
          {{ t('relationship.labels.introduction') }}
        </view>
      </view>

      <view class="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-semantic-border-soft pt-4 text-[13px] leading-6">
        <view v-for="field in introDateFields" :key="field.key">
          <view v-if="item[field.key]" class="flex gap-2">
            <text class="text-semantic-text-card-label">{{ t(field.labelKey) }}</text>
            <text class="text-semantic-text-primary">{{ formatLocalizedDate(locale, item[field.key]!) }}</text>
          </view>
        </view>
      </view>

      <view v-if="item.status === 'accepted'" class="mt-4 border-t border-semantic-border-soft pt-4">
        <view
          v-if="contact === undefined"
          class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px] transition-colors hover:bg-semantic-surface-soft"
          :class="contactLoading ? 'pointer-events-none opacity-50' : ''"
          @click="emit('reveal-contact', item.requestId)"
        >
          {{ contactLoading ? t('relationship.labels.loadingContact') : t('relationship.actions.viewContact') }}
        </view>

        <view v-else>
          <view v-if="!contact.available" class="text-[13px] text-semantic-text-muted">
            {{ t(`relationship.contactReason.${contact.reason}`) }}
          </view>

          <view v-else class="grid gap-1 text-[13px]">
            <view v-if="contact.phone" class="flex gap-2">
              <text class="text-semantic-text-card-label">{{ t('settings.contactChannel.phone') }}</text>
              <text class="text-semantic-text-primary">{{ contact.phone }}</text>
              <text v-if="contact.preferredChannel === 'phone'" class="text-semantic-text-muted">({{ t('relationship.preferredTag') }})</text>
            </view>

            <view v-if="contact.email" class="flex gap-2">
              <text class="text-semantic-text-card-label">{{ t('settings.contactChannel.email') }}</text>
              <text class="text-semantic-text-primary">{{ contact.email }}</text>
              <text v-if="contact.preferredChannel === 'email'" class="text-semantic-text-muted">({{ t('relationship.preferredTag') }})</text>
            </view>

            <view v-if="contact.wechat" class="flex gap-2">
              <text class="text-semantic-text-card-label">{{ t('settings.contactChannel.wechat') }}</text>
              <text class="text-semantic-text-primary">{{ contact.wechat }}</text>
              <text v-if="contact.preferredChannel === 'wechat'" class="text-semantic-text-muted">({{ t('relationship.preferredTag') }})</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { formatLocalizedDate, type FormatLocale } from '@/utils/locale-format'

type IntroductionItem = {
  requestId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: string
  requestedAt?: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

type IntroductionContact =
  | {
      available: true
      phone: string | null
      email: string | null
      wechat: string | null
      preferredChannel: 'phone' | 'email' | 'wechat' | null
    }
  | {
      available: false
      reason: string
    }

defineProps<{
  item: IntroductionItem
  contact?: IntroductionContact
  contactLoading?: boolean
  locale: FormatLocale
}>()

const emit = defineEmits<{
  'reveal-contact': [requestId: string]
}>()

const { t } = usePageI18n('accountCenter')

const introDateFields = [
  { key: 'requestedAt' as const, labelKey: 'relationship.labels.requestedAt' },
  { key: 'expiresAt' as const, labelKey: 'relationship.labels.expiresAt' },
  { key: 'respondedAt' as const, labelKey: 'relationship.labels.respondedAt' },
  { key: 'cooldownUntil' as const, labelKey: 'relationship.labels.cooldownUntil' },
]
</script>
