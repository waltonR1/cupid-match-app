<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <!-- 个人资料目录介绍区 -->
      <ProfileDirectoryIntro
          :eyebrow="t('hero.eyebrow')"
          :title="t('hero.title')"
          :subtitle="t('hero.subtitle')"
          :tags="heroTags"
      />

      <!-- 个人资料筛选工具栏 -->
      <ProfileFilterToolbar
          :title="t('directory.title')"
          :reset-text="t('filters.clear')"
          :expand-text="t('filters.expand')"
          :collapse-text="t('filters.collapse')"
          :items="pageData.filters"
          :active-filters="pageData.activeFilters"
          @update:filter="updateFilter"
          @remove-filter="removeFilter"
          @reset="resetFilters"
      />

      <!-- 结果统计与排序工具栏 -->
      <ProfileResultToolbar
          :summary="resultSummary"
          :sort="resultSort"
          @update:sort-key="updateSort"
      />

      <!-- 个人资料卡片结果列表 -->
      <view class="mt-5">
        <view v-if="pageData.items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <ProfileCardFrame
              v-for="item in pageData.items"
              :key="item.id"
              :data="item.card"
              @select="openSelfDetail(item.id)"
          />
        </view>

        <EmptyStatePanel
            v-else
            :title="t('directory.empty')"
            :primary-text="pageData.activeFilters.length > 0 ? t('filters.clear') : ''"
            primary-variant="outline"
            variant="compact"
            @primary="resetFilters"
        />
      </view>

      <!-- 个人资料分页器 -->
      <ProfileDirectoryPagination
          :page="pageData.page"
          :page-size="pageData.pageSize"
          :total="pageData.total"
          :prev-text="t('pagination.prev')"
          :next-text="t('pagination.next')"
          @change="changePage"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import ProfileFilterToolbar from '@/components/profiles/directory/ProfileFilterToolbar.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import ProfileDirectoryIntro from '@/components/profiles/directory/ProfileDirectoryIntro.vue'
import ProfileDirectoryPagination from '@/components/profiles/directory/ProfileDirectoryPagination.vue'
import ProfileResultToolbar from '@/components/profiles/directory/ProfileResultToolbar.vue'
import {useSelfProfileDirectory} from '@/hooks/profiles'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import type {SelfSortKey} from '@/types/profiles/directory'
import type {DirectoryResultSummary, DirectorySortControl} from '@/types/profiles/view'
import {openSelfDetail} from '@/utils/navigation'

/** Self 页面命名空间文案 */
const {t, locale} = usePageI18n('self')

/** 个人资料目录状态与操作 */
const {
  pageData,
  sortKey,
  updateFilter,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useSelfProfileDirectory(t, locale)

/** Hero 标签文案 */
const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

/** 目录结果统计文案与范围 */
const resultSummary = computed<DirectoryResultSummary>(() => {
  const total = pageData.value.total
  const start = total ? (pageData.value.page - 1) * pageData.value.pageSize + 1 : 0
  const end = total ? Math.min(pageData.value.page * pageData.value.pageSize, total) : 0

  return {
    prefix: t('directory.resultPrefix'),
    suffix: t('directory.resultSuffix'),
    pageText: t('directory.pagePrefix'),
    total,
    start,
    end,
  }
})

/** 目录排序选项文案 */
const resultSort = computed<DirectorySortControl<SelfSortKey>>(() => ({
  label: t('toolbar.sortLabel'),
  key: sortKey.value,
  options: [
    {label: t('sort.recentActive'), value: 'recentActive'},
    {label: t('sort.priorityFirst'), value: 'priorityFirst'},
    {label: t('sort.ageAsc'), value: 'ageAsc'},
    {label: t('sort.ageDesc'), value: 'ageDesc'},
  ],
}))

</script>
