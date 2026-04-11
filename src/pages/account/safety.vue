<template>
  <AccountShell
    active-page="safety"
    :header-eyebrow="t('safety.eyebrow')"
    :header-title="t('safety.title')"
    :header-description="t('safety.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
      <view class="grid gap-6">
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('safety.eyebrow')"
            :title="t('safety.sections.visibility')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in visibilityRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-next-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-next-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[320px] text-right text-[15px] leading-7 text-next-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('safety.eyebrow')"
            :title="t('safety.sections.contact')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="item in privacySettings"
              :key="item.id"
              class="border border-next-semantic-border-soft bg-next-semantic-surface-card px-5 py-5"
            >
              <view class="flex items-start justify-between gap-4">
                <view class="min-w-0 flex-1">
                  <view class="text-[18px] font-semibold text-next-semantic-text-primary">
                    {{ localize(item.title) }}
                  </view>
                  <view class="mt-3 text-[15px] leading-7 text-next-semantic-text-secondary">
                    {{ localize(item.desc) }}
                  </view>
                </view>

                <view
                  class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                  :class="item.enabled
                    ? 'border-next-component-account-badge-status-border bg-next-component-account-badge-status-background text-next-component-account-badge-status-text'
                    : 'border-next-semantic-border-soft bg-next-semantic-surface-soft text-next-semantic-text-secondary'"
                >
                  {{ item.enabled ? t('common.enabled') : t('common.disabled') }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('safety.eyebrow')"
            :title="t('safety.sections.family')"
            :description="familyAssistSetting ? localize(familyAssistSetting.desc) : ''"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in familyPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('safety.eyebrow')"
            :title="t('safety.sections.risk')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in notePoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>

          <view class="mt-6 flex flex-wrap gap-3">
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openMessagesPage"
            >
              {{ t('common.review') }}
            </AppButton>
            <AppButton
              variant="primary"
              size="sm"
              @click="openVerificationPage"
            >
              {{ t('common.manage') }}
            </AppButton>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import { useAccountData } from '@/components/account/use-account-data'
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openMessagesPage, openVerificationPage } from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const {
  profile,
  privacySettings,
  familyAssistSetting,
  advisorContactSetting,
  visibleFieldsSetting,
  localize,
} = useAccountData()

const visibilityRows = computed(() => [
  {
    label: t('common.familyVisible'),
    value: profile?.familyVisible ? t('common.enabled') : t('common.disabled'),
  },
  {
    label: t('common.familyAssist'),
    value: familyAssistSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
  },
  {
    label: t('common.visibleFields'),
    value: visibleFieldsSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
  },
  {
    label: localize(advisorContactSetting.value?.title ?? { zh: '', fr: '', en: '' }),
    value: advisorContactSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
  },
])

const familyPoints = computed(() => [
  t('safety.family.point1'),
  t('safety.family.point2'),
  t('safety.family.point3'),
])

const notePoints = computed(() => [
  t('safety.notes.point1'),
  t('safety.notes.point2'),
  t('safety.notes.point3'),
])
</script>
