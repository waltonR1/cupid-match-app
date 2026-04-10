<template>
  <AccountShell active-page="profile">
    <template #header>
      <AccountPageHeader
        :eyebrow="t('profile.eyebrow')"
        :title="t('profile.title')"
        :description="t('profile.subtitle')"
      />
    </template>

    <view
      v-if="profile"
      class="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
    >
      <view class="grid gap-6">
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <view class="flex flex-wrap items-start justify-between gap-4">
            <AccountSectionHeader
              :label="t('profile.eyebrow')"
              :title="t('profile.sections.summary')"
              :description="localize(account.bio)"
            />

            <view class="rounded-full border border-next-semantic-accent-secondary bg-next-semantic-surface-soft px-4 py-2 text-[12px] font-medium text-next-semantic-accent-secondary">
              {{ membershipLabel(account.membership) }}
            </view>
          </view>

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in summaryItems"
              :key="item.label"
              class="border border-next-semantic-border-soft bg-next-semantic-surface-panel px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-next-component-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-next-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.base')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in baseRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-next-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-next-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[340px] text-right text-[15px] leading-7 text-next-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="relative overflow-hidden border border-next-component-emphasis-card-border bg-next-component-emphasis-card-background px-6 py-6 shadow-next-shadow-emphasis lg:px-8 lg:py-8">
          <view class="absolute inset-x-0 top-0 h-px bg-next-component-emphasis-card-line" />

          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.tasks')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in taskPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-semantic-action-primary" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.media')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in mediaPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-semantic-accent-secondary" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.visibility')"
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

        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-info-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.preview')"
            :description="localize(profile.summary)"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="item in profile.highlights"
              :key="localize(item)"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-semantic-accent-secondary" />
              <text>{{ localize(item) }}</text>
            </view>
          </view>

          <view class="mt-6 flex flex-wrap gap-3">
            <view
              v-for="item in profile.tags"
              :key="localize(item)"
              class="rounded-full border border-next-semantic-border-soft bg-next-semantic-surface-panel px-4 py-2 text-[13px] text-next-semantic-text-secondary"
            >
              {{ localize(item) }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountPageHeader from '@/components/account/AccountPageHeader.vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import { useAccountData } from '@/components/account/use-account-data'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('accountCenter')
const {
  account,
  profile,
  familyAssistSetting,
  visibleFieldsSetting,
  localize,
  formatLanguages,
  membershipLabel,
} = useAccountData()

const summaryItems = computed(() => [
  {
    label: t('topSummary.metrics.completion'),
    value: `${account.completion}%`,
  },
  {
    label: t('common.currentTier'),
    value: membershipLabel(account.membership),
  },
  {
    label: t('common.visibility'),
    value: profile?.familyVisible ? t('common.familyVisible') : t('common.privateOnly'),
  },
])

const baseRows = computed(() => {
  if (!profile) return []

  return [
    { label: t('profile.rows.city'), value: localize(profile.city) },
    { label: t('profile.rows.education'), value: localize(profile.education) },
    { label: t('profile.rows.occupation'), value: localize(profile.occupation) },
    { label: t('profile.rows.languages'), value: formatLanguages(profile.languages) },
    { label: t('common.currentTier'), value: membershipLabel(account.membership) },
  ]
})

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
])

const mediaPoints = computed(() => [
  t('profile.media.photos'),
  t('profile.media.video'),
  t('profile.media.order'),
])

const taskPoints = computed(() => [
  t('profile.tasks.photos'),
  t('profile.tasks.introduction'),
  t('profile.tasks.verification'),
])
</script>
