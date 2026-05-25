<template>
  <AccountShell active-page="profiles">
    <view>
      <AccountSubPageHeader
          :description="t('profiles.subtitle')"
          :label="t('profiles.title')"
          :title="t('profiles.title')"
      />

      <view v-if="payload" class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
          <view
              v-for="profile in payload.profiles"
              :key="profile.profileId"
              class="grid cursor-pointer gap-5 border-b border-semantic-border-soft px-5 py-5 transition-colors last:border-b-0 hover:bg-semantic-surface-soft md:grid-cols-[auto_minmax(0,1fr)_220px]"
              @click="openAccountProfileDetail(profile.profileId)"
          >
            <image :src="profile.avatarUrl" class="h-14 w-14 rounded-full object-cover"/>

            <view class="min-w-0">
              <view class="flex flex-wrap items-center gap-2">
                <view class="text-[18px] font-semibold">
                  {{ profile.profileName }}
                  <text class="text-[15px] font-normal"> {{ formatLocalizedAge(locale, profile.age) }}</text>
                </view>

                <view
                    v-for="badge in getProfileBadges(profile)"
                    :key="badge.key"
                    class="border border-semantic-border-soft bg-semantic-surface-panel px-2 py-1 text-[11px] text-semantic-text-secondary"
                >
                  {{ t(badge.i18nKey) }}
                </view>
              </view>

              <view class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-semantic-text-secondary">
                <view>{{ profile.city }}</view>
                <view
                    class="border border-semantic-border-soft bg-semantic-surface-panel px-2.5 py-1 text-[12px] text-semantic-text-primary">
                  {{ t(`profiles.status.${profile.profileStatus}`) }}
                </view>
              </view>

              <view class="mt-3 text-[13px] leading-6 text-semantic-text-secondary">
                {{ verificationDescription(profile.verification) }}
              </view>
            </view>

            <view
                class="grid content-between gap-4 border-t border-semantic-border-soft pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
              <view>
                <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
                  {{ t('profiles.verificationSummary') }}
                </view>
                <view class="mt-2 text-[24px] font-semibold text-semantic-text-primary">
                  {{ verificationRatioText(profile.verification) }}
                </view>
              </view>

              <view class="text-[13px] text-semantic-text-link">
                {{ t('profiles.actions.view') }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <EmptyStatePanel
          v-else-if="!loading"
          :description="t('profiles.empty.description')"
          :title="t('profiles.empty.title')"
          size="page"
      />

      <view
          v-if="!loading"
          class="cursor-pointer border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel transition-colors hover:bg-semantic-surface-soft"
          @click="openAccountProfileCreate"
      >
        <view
            class="flex min-h-[72px] items-center justify-center gap-3 border border-dashed border-semantic-border-emphasis bg-semantic-surface-panel px-5 py-4 text-[14px] text-semantic-text-primary">
          <view
              class="flex h-8 w-8 items-center justify-center border border-semantic-border-emphasis text-[18px] leading-none">
            +
          </view>
          <view>
            {{ t('profiles.actions.create') }}
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script lang="ts" setup>
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { watch } from 'vue'
import { useAccountProfiles } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openAccountProfileCreate, openAccountProfileDetail } from '@/utils/navigation'
import { formatLocalizedAge } from '@/utils/profile-format'
import type { AccountProfileVerificationDTO, ManagedProfileSummaryDTO } from '@/api/account'
import { computeVerificationRatio, resolveVerificationDescriptionKey } from '@/mappers/account-profiles'

const { t, locale } = usePageI18n('accountCenter')
const { loading, payload, refresh } = useAccountProfiles()
watch(locale, () => { void refresh() })

function getProfileBadges(profile: ManagedProfileSummaryDTO) {
  const badges: Array<{ key: string; i18nKey: string }> = []
  if (profile.isPrimary) badges.push({ key: 'primary', i18nKey: 'profiles.badges.primary' })
  if (profile.isFeatured) badges.push({ key: 'priority', i18nKey: 'profiles.badges.priority' })
  badges.push({ key: 'relation', i18nKey: `profiles.relationship.${profile.relationshipToProfile}` })
  return badges
}

function verificationRatioText(v: AccountProfileVerificationDTO) {
  const r = computeVerificationRatio(v)
  return `${r.verified}/${r.total}`
}

function verificationDescription(v: AccountProfileVerificationDTO) {
  const r = computeVerificationRatio(v)
  return t(`profiles.verificationDescription.${resolveVerificationDescriptionKey(r.verified, r.total)}`)
}
</script>
