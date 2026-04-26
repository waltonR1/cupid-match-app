<template>
  <AccountShell
    active-page="profile"
    :account-data="accountData"
    :header-eyebrow="t('profile.eyebrow')"
    :header-title="t('profile.title')"
    :header-description="t('profile.subtitle')"
  >
    <view
      v-if="profile"
      class="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
    >
      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <view class="flex flex-wrap items-start justify-between gap-4">
            <AccountSectionHeader
              :label="t('profile.eyebrow')"
              :title="t('profile.sections.summary')"
              :description="pageData.bio"
            />

            <view class="rounded-full border border-component-account-badge-meta-border bg-component-account-badge-meta-background px-4 py-2 text-[12px] font-medium text-component-account-badge-meta-text">
              {{ pageData.membershipLabel }}
            </view>
          </view>

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in pageData.summaryItems"
              :key="item.label"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.base')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in pageData.baseRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[340px] text-right text-[15px] leading-7 text-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="relative overflow-hidden border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis lg:px-8 lg:py-8">
          <view class="absolute inset-x-0 top-0 h-px bg-semantic-border-emphasis-divider" />

          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.tasks')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in pageData.taskPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.media')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in pageData.mediaPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.visibility')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in pageData.visibilityRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[320px] text-right text-[15px] leading-7 text-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-soft bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('profile.eyebrow')"
            :title="t('profile.sections.preview')"
            :description="pageData.summaryText"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="item in pageData.highlightTexts"
              :key="item"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ item }}</text>
            </view>
          </view>

          <view class="mt-6 flex flex-wrap gap-3">
            <view
              v-for="item in pageData.tagTexts"
              :key="item"
              class="rounded-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] text-semantic-text-secondary"
            >
              {{ item }}
            </view>
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
import { useAccountOverview } from '@/hooks/account'
import { buildAccountProfilePageViewModel } from '@/mappers/account/account.mapper'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t, locale } = usePageI18n('accountCenter')
const { t: globalT } = useLocaleBridge()
const accountData = useAccountOverview()
const { profile } = accountData
const pageData = computed(() => buildAccountProfilePageViewModel(accountData, locale.value, t, globalT))
</script>
