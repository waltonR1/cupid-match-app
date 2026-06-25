<template>
  <AccountShell active-page="home">
    <view v-if="payload" class="grid gap-6">
      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <view
            v-if="primaryAction"
            class="border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{
              t('home.nextStage')
            }}
          </view>
          <view class="mt-4 text-[24px] font-semibold">{{ t(`home.actions.${primaryAction}`) }}</view>
          <view
              class="mt-6 inline-flex cursor-pointer border border-semantic-border-emphasis bg-component-button-primary-background px-5 py-3 text-[14px] text-semantic-text-inverse transition-opacity hover:opacity-90"
              @click="handleAction(primaryAction)"
          >
            {{ t(`home.actions.${primaryAction}`) }}
          </view>
        </view>

        <view
            v-if="privateIntroQuota"
            class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ t('home.quota.title') }}
          </view>
          <view class="mt-5 text-[34px] font-semibold">{{ privateIntroQuota.quotaRemaining }} /
            {{ privateIntroQuota.quotaTotal }}
          </view>
          <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
            {{ t('home.quota.description') }}
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{
              t('home.attention.title')
            }}
          </view>
          <view class="mt-5 grid gap-4">
            <view
                :class="requestedIntroductions.length > 0 ? 'cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-2 px-2' : ''"
                class="border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
                @click="requestedIntroductions.length > 0 && openRelationshipPage('introductions')"
            >
              <view class="flex items-start justify-between gap-4">
                <view>
                  <view class="text-[14px] text-semantic-text-secondary">{{ t('home.attention.introductions') }}</view>
                  <view class="mt-2 text-[15px] leading-7">{{
                      requestedIntroductions.length > 0 ? t('home.attention.introductionsActive') : t('home.attention.introductionsEmpty')
                    }}
                  </view>
                </view>
                <view class="text-[28px] font-semibold">{{ requestedIntroductions.length }}</view>
              </view>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{
              t('home.upcoming.title')
            }}
          </view>
          <view v-if="payload.upcomingEvents.length > 0" class="mt-5 grid gap-4">
            <view
                v-for="item in payload.upcomingEvents"
                :key="item.registrationId"
                class="border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0 cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-2 px-2"
                @click="openAccountEventsPage()"
            >
              <view class="flex flex-wrap items-center justify-between gap-3">
                <view>
                  <view class="text-[15px]">{{ item.title }}</view>
                  <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ item.city }} · {{ item.date }}</view>
                </view>
                <view class="border border-semantic-border-soft px-3 py-1 text-[12px] text-semantic-text-secondary">
                  {{ optionLabel('event.registrationStatus', item.status) }}
                </view>
              </view>
            </view>
          </view>
          <view v-else class="mt-5 text-[15px] leading-7 text-semantic-text-secondary">
            {{ t('home.upcoming.empty') }}
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{
              t('home.profiles.title')
            }}
          </view>
          <view v-if="payload.profiles.length > 0"
                class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
            <view
                v-for="item in payload.profiles"
                :key="item.profileId"
                class="grid cursor-pointer gap-2 py-4 transition-colors hover:bg-semantic-surface-soft sm:grid-cols-[minmax(0,1fr)_auto] -mx-2 px-2"
                @click="openAccountProfileDetail(item.profileId)"
            >
              <view>
                <view class="text-[15px]">
                  <template v-if="item.profileName">{{ item.profileName }}</template>
                  <template v-else-if="item.profileType === 'self'">{{ t('profiles.profileType.self') }}</template>
                  <template v-else>{{ optionLabel('profile.relationshipToProfile', item.relationshipToProfile) }}
                    {{ t('profiles.profileType.family') }}
                  </template>
                </view>
                <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ item.city }}</view>
              </view>
              <view class="text-[13px] text-semantic-text-secondary">{{
                  optionLabel('profile.profileStatus', item.profileStatus)
                }}
              </view>
            </view>
          </view>
          <view v-else class="mt-5 text-[15px] leading-7 text-semantic-text-secondary">
            {{ t('home.profiles.empty') }}
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ t('home.accountSummary') }}
          </view>
          <view class="mt-4 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
            <view class="grid gap-1 py-4">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('home.accountFields.accountName') }}</view>
              <view class="text-[15px]">{{ payload.user.accountName }}</view>
            </view>
            <view class="grid gap-1 py-4">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('home.accountFields.status') }}</view>
              <view class="text-[15px]">{{ optionLabel('account.status', payload.user.status) }}</view>
            </view>
            <view class="grid gap-1 py-4">
              <view class="text-[13px] text-semantic-text-secondary">{{
                  t('home.accountFields.preferredLocale')
                }}
              </view>
              <view class="text-[15px]">{{ optionLabel('account.locale', payload.user.preferredLocale) }}</view>
            </view>
            <view class="grid gap-1 py-4">
              <view class="text-[13px] text-semantic-text-secondary">{{ t('home.accountFields.membership') }}</view>
              <view class="text-[15px]">{{ payload.membership?.name ?? t('home.functional.noMembership') }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{
            t('home.activitySummary')
          }}
        </view>
        <view class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <view class="cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-3 -my-2 px-3 py-2"
                @click="openMyProfilePage()">
            <view class="text-[13px] text-semantic-text-secondary">{{ t('home.overview.profiles') }}</view>
            <view class="mt-2 text-[26px] font-semibold">{{ payload.profiles.length }}</view>
          </view>
          <view class="cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-3 -my-2 px-3 py-2"
                @click="openRelationshipPage('favorites')">
            <view class="text-[13px] text-semantic-text-secondary">{{ t('home.overview.favorites') }}</view>
            <view class="mt-2 text-[26px] font-semibold">{{ payload.favoriteCount }}</view>
          </view>
          <view class="cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-3 -my-2 px-3 py-2"
                @click="openRelationshipPage('introductions')">
            <view class="text-[13px] text-semantic-text-secondary">{{ t('home.overview.introductions') }}</view>
            <view class="mt-2 text-[26px] font-semibold">{{ payload.recentIntroductions.length }}</view>
          </view>
          <view class="cursor-pointer transition-colors hover:bg-semantic-surface-soft -mx-3 -my-2 px-3 py-2"
                @click="openAccountEventsPage()">
            <view class="text-[13px] text-semantic-text-secondary">{{ t('home.overview.events') }}</view>
            <view class="mt-2 text-[26px] font-semibold">{{ payload.upcomingEvents.length }}</view>
          </view>
        </view>
      </view>
    </view>
    <EmptyStatePanel
        v-else-if="!loading"
        :subtitle="t('home.empty.profile')"
        :title="t('home.empty.title')"
        size="page"
    />
  </AccountShell>
</template>

<script lang="ts" setup>
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {computed, watch} from 'vue'
import AccountShell from '@/components/account/AccountShell.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import {useAccountDashboard} from '@/hooks/account'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {
  openAccountEventsPage,
  openAccountProfileCreate,
  openAccountProfileDetail,
  openMyProfilePage,
  openRelationshipPage,
  openSelfDirectoryPage
} from '@/utils/navigation'
import {resolvePrimaryAction} from '@/mappers/account/home'
import {useOptionsStore} from '@/stores/modules/options'

useRequireAuth()
const {t, locale} = usePageI18n('accountCenter')
const optionsStore = useOptionsStore()
const {loading, payload, refresh} = useAccountDashboard()
watch(locale, value => {
  void optionsStore.ensureOptions(value)
  void refresh()
}, {immediate: true})

const primaryAction = computed(() => payload.value ? resolvePrimaryAction(payload.value) : undefined)
const privateIntroQuota = computed(() => payload.value?.entitlements.find((item) => item.code === 'private_introduction'))
const requestedIntroductions = computed(() => payload.value?.recentIntroductions.filter((item) => item.status === 'requested') ?? [])

function optionLabel(group: string, value: string): string {
  return optionsStore.optionsFor(locale.value, group)
    .find(option => option.value === value)?.label ?? value
}

function handleAction(key: string) {
  if (key === 'create-profile') {
    openAccountProfileCreate()
    return
  }

  if (key === 'browse-profiles') {
    openSelfDirectoryPage()
  }
}
</script>
