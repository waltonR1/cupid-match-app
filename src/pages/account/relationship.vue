<template>
  <AccountShell active-page="relationship">
    <view>
      <!-- 页面标题 -->
      <AccountSubPageHeader
          :label="t('nav.relationship')"
          :title="t('relationship.title')"
          :description="t('relationship.subtitle')"
      />

      <view class="grid gap-6">
        <!-- 概览统计 -->
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
          <view class="grid gap-4 lg:grid-cols-2">
            <!-- 收藏数量 -->
            <view
                class="border-b border-semantic-border-soft pb-4 lg:border-b-0 lg:border-r lg:pr-5 last:border-b-0 last:lg:border-r-0"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('relationship.overview.favorites') }}</view>

              <view class="mt-3 text-[28px] font-semibold">{{ favorites.length }}</view>

              <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
                {{ t('relationship.stageDescription.favorites') }}
              </view>
            </view>

            <!-- 介绍流程数量 -->
            <view
                class="border-b border-semantic-border-soft pb-4 lg:border-b-0 lg:border-r lg:pr-5 last:border-b-0 last:lg:border-r-0"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">{{ t('relationship.overview.introductions') }}</view>

              <view class="mt-3 text-[28px] font-semibold">{{ introSplit.attention.length }}</view>

              <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
                {{ t('relationship.stageDescription.introductions') }}
              </view>
            </view>
          </view>
        </view>

        <!-- Tab 切换 -->
        <view class="flex gap-3">
          <view
              class="cursor-pointer rounded-button border px-4 py-2 text-[13px] font-medium transition-all"
              :class="activeTab === 'favorites'
              ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
              : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-card-hover'"
              @click="activeTab = 'favorites'"
          >
            {{ t('relationship.tabs.favorites') }} ({{ favorites.length }})
          </view>

          <view
              class="cursor-pointer rounded-button border px-4 py-2 text-[13px] font-medium transition-all"
              :class="activeTab === 'introductions'
              ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
              : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:border-semantic-border-card-hover'"
              @click="activeTab = 'introductions'"
          >
            {{ t('relationship.tabs.introductions') }} ({{ introductions.length }})
          </view>
        </view>

        <!-- 收藏列表 -->
        <view v-if="activeTab === 'favorites'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.favorites') }}</view>

          <!-- 有收藏 -->
          <view v-if="favorites.length > 0" class="grid gap-4">
            <view
                v-for="f in favorites"
                :key="f.favoriteId"
                class="group grid cursor-pointer gap-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel transition-all duration-200 hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft hover:shadow-card-hover md:grid-cols-[88px_minmax(0,1fr)_auto]"
                @click="openFavoriteProfile(f.profileId, f.profileType)"
            >
              <!-- 头像 -->
              <image :src="f.avatarUrl" class="h-20 w-20 object-cover" />

              <!-- 基础信息 -->
              <view class="min-w-0">
                <view class="flex flex-wrap items-center gap-2">
                  <view class="text-[18px] font-semibold text-semantic-text-primary">{{ f.displayName }}</view>

                  <view class="text-[14px] text-semantic-text-secondary">{{ formatLocalizedAge(locale, f.age) }}</view>
                </view>

                <!-- 标签信息 -->
                <view class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-semantic-text-secondary">
                  <text>{{ f.city }}</text>
                  <text>{{ f.education }}</text>
                  <text>{{ f.industry }}</text>
                </view>

                <!-- 简介 -->
                <view class="mt-3 line-clamp-2 text-[14px] leading-6 text-semantic-text-muted">{{ f.summary }}</view>

                <!-- 兴趣标签 -->
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

              <!-- 右侧信息 -->
              <view class="flex flex-row items-center justify-between gap-4 text-[12px] text-semantic-text-card-label md:flex-col md:items-end">
                <text>{{ t('relationship.labels.savedAt') }}</text>

                <text class="text-semantic-text-primary">{{ formatLocalizedDate(locale, f.createdAt) }}</text>

                <text class="transition-colors group-hover:text-semantic-text-primary">{{ t('relationship.labels.openProfile') }}</text>
              </view>
            </view>
          </view>

          <!-- 空状态 -->
          <EmptyStatePanel v-else size="page" :title="t('relationship.empty.favorites')"/>
        </view>

        <!-- 介绍流程 -->
        <view v-if="activeTab === 'introductions'">
          <view class="mb-4 text-[14px] leading-7 text-semantic-text-secondary">{{ t('relationship.panelDescription.introductions') }}</view>

          <!-- 需要关注的介绍 -->
          <view v-if="introSplit.attention.length > 0" class="border border-semantic-border-default bg-semantic-surface-card shadow-panel">
            <!-- 区块标题 -->
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.attention.title') }}</view>

              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.attention.description') }}
              </view>
            </view>

            <!-- 介绍项 -->
            <view
                v-for="i in introSplit.attention"
                :key="i.requestId"
                class="grid gap-4 border-b border-semantic-border-soft px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)]"
            >
              <image :src="i.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />

              <view class="min-w-0">
                <!-- 顶部信息 -->
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view>
                    <view class="font-medium">{{ i.targetDisplayName }}</view>

                    <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ t(`introduction.status.${i.status}`) }}</view>
                  </view>

                  <view class="text-[12px] text-semantic-text-card-label">
                    {{ t('relationship.labels.introduction') }}
                  </view>
                </view>

                <!-- 时间信息 -->
                <view class="mt-4 grid gap-3 border-t border-semantic-border-soft pt-4 text-[13px] leading-6 text-semantic-text-secondary sm:grid-cols-2">
                  <view v-for="field in introDateFields" :key="field.key">
                    <view v-if="i[field.key]">
                      <view class="text-semantic-text-card-label">{{ t(field.labelKey) }}</view>

                      <view class="mt-1 text-semantic-text-primary">{{ formatIntroductionDate(i[field.key]) }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <!-- 无进行中，仅历史 -->
          <view
              v-if="introSplit.attention.length === 0 && introSplit.history.length > 0"
              class="mt-4 border border-semantic-border-default bg-semantic-surface-card px-5 py-5 text-[14px] leading-7 text-semantic-text-secondary shadow-panel"
          >
            {{ t('relationship.noActiveIntroductions') }}
          </view>

          <!-- 历史记录 -->
          <view
              v-if="introSplit.history.length > 0"
              class="mt-4 border border-semantic-border-default bg-semantic-surface-card shadow-panel"
          >
            <!-- 区块标题 -->
            <view class="border-b border-semantic-border-soft px-5 py-4">
              <view class="text-[15px] font-semibold">{{ t('relationship.history.title') }}</view>

              <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                {{ t('relationship.history.description') }}
              </view>
            </view>

            <!-- 历史项 -->
            <view
                v-for="i in introSplit.history"
                :key="i.requestId"
                class="grid gap-4 border-b border-semantic-border-soft px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)]"
            >
              <image :src="i.targetAvatarUrl" class="h-12 w-12 rounded-full object-cover" />

              <view class="min-w-0">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view>
                    <view class="font-medium">{{ i.targetDisplayName }}</view>

                    <view class="mt-1 text-[13px] text-semantic-text-secondary">{{ t(`introduction.status.${i.status}`) }}</view>
                  </view>

                  <view class="text-[12px] text-semantic-text-card-label">{{ t('relationship.labels.introduction') }}</view>
                </view>

                <!-- 时间字段 -->
                <view class="mt-4 grid gap-3 border-t border-semantic-border-soft pt-4 text-[13px] leading-6 text-semantic-text-secondary sm:grid-cols-2">
                  <view v-for="field in introDateFields" :key="field.key">
                    <view v-if="i[field.key]">
                      <view class="text-semantic-text-card-label">{{ t(field.labelKey) }}</view>

                      <view class="mt-1 text-semantic-text-primary">{{ formatIntroductionDate(i[field.key]) }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <!-- 空状态 -->
          <EmptyStatePanel
              v-if="introSplit.attention.length === 0 && introSplit.history.length === 0"
              size="page"
              :title="t('relationship.empty.introductions')"
          />
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'

import { useAccountRelationship } from '@/hooks/account'
import { splitIntroductions } from '@/mappers/account-relationship'

import { usePageI18n } from '@/i18n/composables/use-page-i18n'

import { openFamilyProfileDetail, openSelfDetail } from '@/utils/navigation'
import { formatLocalizedDate } from '@/utils/locale-format'
import { formatLocalizedAge } from '@/utils/profile-format'

// 页面 i18n
const { t, locale } = usePageI18n('accountCenter')

// 关系数据
const { favorites, introductions, refresh } = useAccountRelationship()

// 语言切换时重新加载数据
watch(locale, () => {void refresh()})

// 当前 Tab
const activeTab = ref<'favorites' | 'introductions'>('favorites')

onLoad((query) => {
  if (query && (query.tab === 'favorites' || query.tab === 'introductions')) {
    activeTab.value = query.tab
  }
})

// 将介绍流程拆分为“需关注”和“历史”
const introSplit = computed(() => splitIntroductions(introductions.value))

// 介绍流程中展示的时间字段
const introDateFields = [
  { key: 'requestedAt' as const, labelKey: 'relationship.labels.requestedAt' },
  { key: 'expiresAt' as const, labelKey: 'relationship.labels.expiresAt' },
  { key: 'respondedAt' as const, labelKey: 'relationship.labels.respondedAt' },
  { key: 'cooldownUntil' as const, labelKey: 'relationship.labels.cooldownUntil' },
]

// 打开收藏档案详情
function openFavoriteProfile(profileId: string, profileType: 'self' | 'family') {
  if (profileType === 'family') {
    openFamilyProfileDetail(profileId)
    return
  }

  openSelfDetail(profileId)
}

// 格式化介绍流程时间
function formatIntroductionDate(value?: string) {
  return value
      ? formatLocalizedDate(locale.value, value)
      : ''
}
</script>