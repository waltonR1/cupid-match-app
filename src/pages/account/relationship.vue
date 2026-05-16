<template>
  <AccountShell :account-data="accountData" active-page="relationship">
    <view>
      <AccountSubPageHeader
        :label="t('nav.relationship')"
        :title="t('nav.relationship')"
        :description="t('relationship.subtitle')"
      />

      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="grid gap-4 lg:grid-cols-3">
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
          <view v-if="pageData.favorites.length > 0" class="grid gap-3">
            <view
              v-for="f in pageData.favorites"
              :key="f.favoriteId"
              class="flex items-center gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel"
            >
              <image :src="f.avatarUrl" class="h-12 w-12 rounded-full object-cover" />
              <view class="flex-1">
                <view class="font-medium">{{ f.displayName }}, {{ f.age }}</view>
                <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ f.city }}</view>
              </view>
              <view class="text-[12px] text-semantic-text-card-label">{{ f.savedAtText }}</view>
            </view>
          </view>
          <EmptyStatePanel v-else size="page" :title="t('relationship.empty.favorites')" />
        </view>

        <view v-if="activeTab === 'introductions'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.introductions') }}</view>
          <view v-if="pageData.introductions.length > 0" class="grid gap-3">
            <view
              v-for="i in pageData.introductions"
              :key="i.requestId"
              class="flex items-center gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel"
            >
              <image :src="i.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />
              <view class="flex-1">
                <view class="font-medium">{{ i.targetDisplayName }}</view>
                <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ i.statusText }}</view>
              </view>
              <view class="text-[12px] text-semantic-text-card-label">{{ t('relationship.labels.introduction') }}</view>
            </view>
          </view>
          <EmptyStatePanel v-else size="page" :title="t('relationship.empty.introductions')" />
        </view>

        <view v-if="activeTab === 'messages'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.messages') }}</view>
          <view v-if="pageData.rooms.length > 0" class="grid gap-3">
            <view
              v-for="r in pageData.rooms"
              :key="r.roomId"
              class="flex items-center gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel"
            >
              <image :src="r.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />
              <view class="flex-1">
                <view class="font-medium">{{ r.targetDisplayName }}</view>
                <view v-if="r.lastMessageText" class="mt-1 text-[13px] text-semantic-text-muted">{{ r.lastMessageText }}</view>
              </view>
              <view class="text-[12px] text-semantic-text-card-label">{{ t('relationship.labels.message') }}</view>
            </view>
          </view>
          <EmptyStatePanel v-else size="page" :title="t('relationship.empty.messages')" />
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

const { t } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const { pageData } = useAccountRelationship(t)
const activeTab = ref<'favorites' | 'introductions' | 'messages'>('favorites')

</script>
