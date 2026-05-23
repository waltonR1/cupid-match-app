<template>
  <AccountShell :account-data="accountData" active-page="relationship">
    <view>
      <AccountSubPageHeader
        :label="t('nav.relationship')"
        :title="t('relationship.title')"
        :description="t('relationship.subtitle')"
      />

      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="grid gap-4 lg:grid-cols-2">
          <view
            v-for="item in pageData.overview"
            :key="item.key"
            class="border-b border-semantic-border-soft pb-4 lg:border-b-0 lg:border-r lg:pr-5 last:border-b-0 last:lg:border-r-0"
          >
            <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ item.label }}</view>
            <view class="mt-3 text-[28px] font-semibold">{{ item.value }}</view>
            <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
              {{ item.description }}
            </view>
          </view>
          </view>
        </view>

        <view class="flex gap-3">
          <view
            v-for="tab in pageData.tabs"
            :key="tab.key"
            class="cursor-pointer rounded-button border px-4 py-2 text-[13px] font-medium transition-all"
            :class="activeTab === tab.key
              ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
              : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-card-hover'"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}<text v-if="tab.count" class="ml-1 opacity-50">({{ tab.count }})</text>
          </view>
        </view>

        <view v-if="activeTab === 'favorites'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.favorites') }}</view>
          <view v-if="pageData.favorites.length > 0" class="grid gap-4">
            <view
              v-for="f in pageData.favorites"
              :key="f.favoriteId"
              class="group grid cursor-pointer gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel transition-all duration-200 hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft hover:shadow-card-hover md:grid-cols-[88px_minmax(0,1fr)_auto]"
              @click="openFavoriteProfile(f.profileId, f.profileType)"
            >
              <image :src="f.avatarUrl" class="h-20 w-20 object-cover" />
              <view class="min-w-0">
                <view class="flex flex-wrap items-center gap-2">
                  <view class="text-[18px] font-semibold text-semantic-text-primary">{{ f.displayName }}</view>
                  <view class="text-[14px] text-semantic-text-secondary">{{ f.age }}</view>
                </view>
                <view class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-semantic-text-secondary">
                  <text>{{ f.city }}</text>
                  <text>{{ f.education }}</text>
                  <text>{{ f.industry }}</text>
                </view>
                <view class="mt-3 line-clamp-2 text-[14px] leading-6 text-semantic-text-muted">{{ f.summary }}</view>
                <view v-if="f.tags.length > 0" class="mt-4 flex flex-wrap gap-2">
                  <text
                    v-for="tag in f.tags"
                    :key="tag"
                    class="rounded-full border border-semantic-border-soft px-2.5 py-1 text-[12px] text-semantic-text-secondary"
                  >
                    {{ tag }}
                  </text>
                </view>
              </view>
              <view class="flex flex-row items-center justify-between gap-4 text-[12px] text-semantic-text-card-label md:flex-col md:items-end">
                <text>{{ t('relationship.labels.savedAt') }}</text>
                <text class="text-semantic-text-primary">{{ f.savedAtText }}</text>
                <text class="transition-colors group-hover:text-semantic-text-primary">{{ t('relationship.labels.openProfile') }}</text>
              </view>
            </view>
          </view>
          <EmptyStatePanel v-else size="page" :title="t('relationship.empty.favorites')" />
        </view>

        <view v-if="activeTab === 'introductions'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.introductions') }}</view>
          <view v-if="pageData.attentionIntroductions.length > 0" class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.attention.title') }}</view>
              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.attention.description') }}
              </view>
            </view>
            <view
              v-for="i in pageData.attentionIntroductions"
              :key="i.requestId"
              class="grid gap-4 border-b border-semantic-border-soft px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)]"
            >
              <image :src="i.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />
              <view class="min-w-0">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view>
                    <view class="font-medium">{{ i.targetDisplayName }}</view>
                    <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ i.statusText }}</view>
                  </view>
                  <view class="text-[12px] text-semantic-text-card-label">{{ t('relationship.labels.introduction') }}</view>
                </view>
                <view class="mt-4 grid gap-3 border-t border-semantic-border-soft pt-4 text-[13px] leading-6 text-semantic-text-secondary sm:grid-cols-2">
                  <view>
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.requestedAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.requestedAtText }}</view>
                  </view>
                  <view v-if="i.expiresAtText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.expiresAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.expiresAtText }}</view>
                  </view>
                  <view v-if="i.respondedAtText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.respondedAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.respondedAtText }}</view>
                  </view>
                  <view v-if="i.cooldownUntilText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.cooldownUntil') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.cooldownUntilText }}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view
            v-if="pageData.attentionIntroductions.length === 0 && pageData.historyIntroductions.length > 0"
            class="mt-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 text-[14px] leading-7 text-semantic-text-secondary shadow-panel"
          >
            {{ t('relationship.noActiveIntroductions') }}
          </view>

          <view
            v-if="pageData.historyIntroductions.length > 0"
            class="mt-4 border border-semantic-border-default bg-semantic-surface-card shadow-panel"
          >
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.history.title') }}</view>
              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.history.description') }}
              </view>
            </view>
            <view
              v-for="i in pageData.historyIntroductions"
              :key="i.requestId"
              class="grid gap-4 border-b border-semantic-border-soft px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)]"
            >
              <image :src="i.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />
              <view class="min-w-0">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view>
                    <view class="font-medium">{{ i.targetDisplayName }}</view>
                    <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ i.statusText }}</view>
                  </view>
                  <view class="text-[12px] text-semantic-text-card-label">{{ t('relationship.labels.introduction') }}</view>
                </view>
                <view class="mt-4 grid gap-3 border-t border-semantic-border-soft pt-4 text-[13px] leading-6 text-semantic-text-secondary sm:grid-cols-2">
                  <view>
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.requestedAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.requestedAtText }}</view>
                  </view>
                  <view v-if="i.expiresAtText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.expiresAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.expiresAtText }}</view>
                  </view>
                  <view v-if="i.respondedAtText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.respondedAt') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.respondedAtText }}</view>
                  </view>
                  <view v-if="i.cooldownUntilText">
                    <view class="text-semantic-text-card-label">{{ t('relationship.labels.cooldownUntil') }}</view>
                    <view class="mt-1 text-semantic-text-primary">{{ i.cooldownUntilText }}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <EmptyStatePanel
            v-if="pageData.attentionIntroductions.length === 0 && pageData.historyIntroductions.length === 0"
            size="page"
            :title="t('relationship.empty.introductions')"
          />
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountOverview, useAccountRelationship } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openFamilyProfileDetail, openSelfDetail } from '@/utils/navigation'

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountRelationship(t)
const activeTab = ref<'favorites' | 'introductions'>('favorites')

function openFavoriteProfile(profileId: string, profileType: 'self' | 'family') {
  if (profileType === 'family') {
    openFamilyProfileDetail(profileId)
    return
  }

  openSelfDetail(profileId)
}

</script>
