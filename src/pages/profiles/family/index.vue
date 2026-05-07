<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">

      <!-- 页面介绍 -->
      <ProfileDirectoryIntro
          :eyebrow="t('hero.eyebrow')"
          :subtitle="t('hero.subtitle')"
          :tags="heroTags"
          :title="t('hero.title')"
      />

      <!-- 筛选工具栏 -->
      <ProfileFilterToolbar
          :active-filters="pageData.activeFilters"
          :collapse-text="t('filters.collapse')"
          :expand-text="t('filters.expand')"
          :items="pageData.filters"
          :reset-text="t('filters.clear')"
          :title="t('directory.title')"
          @reset="resetFilters"
          @update:filter="updateFilter"
          @remove-filter="removeFilter"
      />

      <!-- 结果工具栏 -->
      <ProfileResultToolbar
          :sort="resultSort"
          :summary="resultSummary"
          @update:sort-key="updateSort"
      />

      <!-- 列表 / 空状态 -->
      <view class="mt-5">
        <view v-if="pageData.items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <ProfileCardFrame
              v-for="item in pageData.items"
              :key="item.id"
              :data="item.card"
              @select="openFamilyProfileDetail(item.id)"
          />
        </view>

        <EmptyStatePanel
            v-else
            :primary-text="pageData.activeFilters.length > 0 ? t('filters.clear') : ''"
            :title="t('directory.empty')"
            @primary="resetFilters"
        />
      </view>

      <!-- 分页 -->
      <ProfileDirectoryPagination
          :next-text="t('pagination.next')"
          :page="pageData.page"
          :page-size="pageData.pageSize"
          :prev-text="t('pagination.prev')"
          :total="pageData.total"
          @change="changePage"
      />
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import ProfileFilterToolbar from '@/components/profiles/directory/ProfileFilterToolbar.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import ProfileDirectoryIntro from '@/components/profiles/directory/ProfileDirectoryIntro.vue'
import ProfileDirectoryPagination from '@/components/profiles/directory/ProfileDirectoryPagination.vue'
import ProfileResultToolbar from '@/components/profiles/directory/ProfileResultToolbar.vue'
import {useFamilyProfileDirectory} from '@/hooks/profiles'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import type {FamilySortKey} from '@/types/profiles/directory'
import type {DirectoryResultSummary, DirectorySortControl} from '@/types/profiles/view'
import {openFamilyProfileDetail} from '@/utils/navigation'

/** 页面文案 */
const {t, locale} = usePageI18n('family')

/** 页面数据 */
const {
  pageData,
  sortKey,
  updateFilter,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useFamilyProfileDirectory(t, locale)

/** Hero 标签 */
const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

/** 结果统计 */
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

/** 排序配置 */
const resultSort = computed<DirectorySortControl<FamilySortKey>>(() => ({
  label: t('toolbar.sortLabel'),
  key: sortKey.value,
  options: [
    {label: t('sort.priorityFirst'), value: 'priorityFirst'},
    {label: t('sort.recentActive'), value: 'recentActive'},
    {label: t('sort.ageAsc'), value: 'ageAsc'},
    {label: t('sort.ageDesc'), value: 'ageDesc'},
  ],
}))

</script>
