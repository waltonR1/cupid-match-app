<template>
  <AccountShell active-page="relationship">
    <view>
      <AccountSubPageHeader
          :description="t('relationship.subtitle')"
          :label="t('nav.relationship')"
          :title="t('relationship.title')"
      />

      <view v-if="loading" class="px-5 py-8 text-[13px] text-semantic-text-muted">
        {{ t('relationship.loading') }}
      </view>

      <EmptyStatePanel
          v-else-if="error"
          :primary-text="t('common.retry')"
          :subtitle="t('relationship.error.description')"
          :title="t('relationship.error.title')"
          size="page"
          @primary="refresh"
      />

      <view v-else class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="grid gap-4 lg:grid-cols-2">
            <view class="border-b border-semantic-border-soft pb-4 lg:border-b-0 lg:border-r lg:pr-5">
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
                {{ t('relationship.overview.favorites') }}
              </view>
              <view class="mt-3 text-[28px] font-semibold">{{ favorites.length }}</view>
              <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
                {{ t('relationship.stageDescription.favorites') }}
              </view>
            </view>

            <view class="pb-4 lg:pr-5">
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
                {{ t('relationship.overview.introductions') }}
              </view>
              <view class="mt-3 text-[28px] font-semibold">{{ introSplit.attention.length }}</view>
              <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
                {{ t('relationship.stageDescription.introductions') }}
              </view>
            </view>
          </view>
        </view>

        <view class="flex gap-3">
          <view
              :class="activeTab === 'favorites'
              ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
              : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-card-hover'"
              class="cursor-pointer rounded-button border px-4 py-2 text-[13px] font-medium transition-all"
              @click="activeTab = 'favorites'"
          >
            {{ t('relationship.tabs.favorites') }} ({{ favorites.length }})
          </view>

          <view
              :class="activeTab === 'introductions'
              ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
              : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-card-hover'"
              class="cursor-pointer rounded-button border px-4 py-2 text-[13px] font-medium transition-all"
              @click="activeTab = 'introductions'"
          >
            {{ t('relationship.tabs.introductions') }} ({{ introductions.length }})
          </view>
        </view>

        <view v-if="activeTab === 'favorites'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">
            {{ t('relationship.panelDescription.favorites') }}
          </view>

          <view v-if="favorites.length > 0" class="grid gap-4">
            <view
                v-for="favorite in favorites"
                :key="favorite.favoriteId"
                class="group grid cursor-pointer gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel transition-all duration-200 hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft hover:shadow-card-hover md:grid-cols-[88px_minmax(0,1fr)_auto]"
                @click="openFavoriteProfile(favorite.profileId, favorite.profileType)"
            >
              <image :src="resolveAssetUrl(favorite.avatarUrl)" class="h-20 w-20 object-cover"/>

              <view class="min-w-0">
                <view class="flex flex-wrap items-center gap-2">
                  <view class="text-[18px] font-semibold text-semantic-text-primary">{{ favorite.displayName }}</view>
                  <view class="text-[14px] text-semantic-text-secondary">{{
                      formatLocalizedAge(locale, favorite.age)
                    }}
                  </view>
                </view>

                <view class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-semantic-text-secondary">
                  <text>{{ favorite.city }}</text>
                  <text>{{ favorite.education }}</text>
                  <text>{{ favorite.industry }}</text>
                </view>

                <view class="mt-3 line-clamp-2 text-[14px] leading-6 text-semantic-text-muted">{{
                    favorite.summary
                  }}
                </view>

                <view v-if="favorite.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
                  <text
                      v-for="tag in favorite.tags"
                      :key="tag"
                      class="rounded-full border border-semantic-border-soft px-2.5 py-1 text-[12px] text-semantic-text-secondary"
                  >
                    {{ tag }}
                  </text>
                </view>
              </view>

              <view
                  class="flex flex-row items-center justify-between gap-4 text-[12px] text-semantic-text-card-label md:flex-col md:items-end">
                <text>{{ t('relationship.labels.savedAt') }}</text>
                <text class="text-semantic-text-primary">{{ formatLocalizedDate(locale, favorite.createdAt) }}</text>
                <text class="transition-colors group-hover:text-semantic-text-primary">
                  {{ t('relationship.labels.openProfile') }}
                </text>
              </view>
            </view>
          </view>

          <EmptyStatePanel v-else :title="t('relationship.empty.favorites')" size="page"/>
        </view>

        <view v-if="activeTab === 'introductions'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">
            {{ t('relationship.panelDescription.introductions') }}
          </view>

          <view v-if="introSplit.attention.length > 0"
                class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.attention.title') }}</view>
              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.attention.description') }}
              </view>
            </view>

            <AccountIntroductionItem
                v-for="item in introSplit.attention"
                :key="item.requestId"
                :contact="contactMap[item.requestId]"
                :contact-loading="contactLoading[item.requestId]"
                :item="item"
                :locale="locale"
                @reveal-contact="revealContact"
            />
          </view>

          <view
              v-if="introSplit.attention.length === 0 && introSplit.history.length > 0"
              class="mt-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 text-[14px] leading-7 text-semantic-text-secondary shadow-panel"
          >
            {{ t('relationship.noActiveIntroductions') }}
          </view>

          <view
              v-if="introSplit.history.length > 0"
              class="mt-4 border border-semantic-border-default bg-semantic-surface-card shadow-panel"
          >
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.history.title') }}</view>
              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.history.description') }}
              </view>
            </view>

            <AccountIntroductionItem
                v-for="item in introSplit.history"
                :key="item.requestId"
                :contact="contactMap[item.requestId]"
                :contact-loading="contactLoading[item.requestId]"
                :item="item"
                :locale="locale"
                @reveal-contact="revealContact"
            />
          </view>

          <EmptyStatePanel
              v-if="introSplit.attention.length === 0 && introSplit.history.length === 0"
              :title="t('relationship.empty.introductions')"
              size="page"
          />
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script lang="ts" setup>
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {computed, ref, watch} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import AccountIntroductionItem from '@/components/account/AccountIntroductionItem.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import {useAccountRelationship} from '@/hooks/account'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {splitIntroductions} from '@/mappers/account/relationship'
import {openFamilyProfileDetail, openSelfDetail} from '@/utils/navigation'
import {formatLocalizedDate} from '@/utils/locale-format'
import {formatLocalizedAge} from '@/utils/profile-format'
import {resolveAssetUrl} from '@/config/app'

useRequireAuth()
const {t, locale} = usePageI18n('accountCenter')
const {
  loading,
  error,
  favorites,
  introductions,
  contactMap,
  contactLoading,
  refresh,
  revealContact
} = useAccountRelationship()
const activeTab = ref<'favorites' | 'introductions'>('favorites')
const introSplit = computed(() => splitIntroductions(introductions.value))

watch(locale, () => {
  void refresh()
})

onLoad((query) => {
  if (query && (query.tab === 'favorites' || query.tab === 'introductions')) {
    activeTab.value = query.tab
  }
})

function openFavoriteProfile(profileId: string, profileType: 'self' | 'family') {
  if (profileType === 'family') {
    openFamilyProfileDetail(profileId)
    return
  }

  openSelfDetail(profileId)
}
</script>
