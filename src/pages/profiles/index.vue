<template>
  <view class="min-h-screen bg-background text-text-main">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.profiles"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1280px] px-6 pb-16 pt-8 lg:px-8 lg:pt-10">
      <ProfilesPageIntro
          :eyebrow="t('hero.eyebrow')"
          :title="t('hero.title')"
          :subtitle="t('hero.subtitle')"
          :tags="heroTags"
      />

      <ProfilesFilterToolbar
          :title="t('directory.title')"
          :reset-text="t('filters.clear')"
          :age-label="t('filters.age')"
          :city-label="t('filters.city')"
          :height-label="t('filters.height')"
          :education-label="t('filters.education')"
          :intent-label="t('filters.intent')"
          :more-filters-label="t('toolbar.filtersLabel')"
          :expand-text="t('toolbar.filterToggleOpen')"
          :collapse-text="t('toolbar.filterToggleClose')"
          :filters="filters"
          :age-options="ageOptions"
          :city-options="cityOptions"
          :height-options="heightOptions"
          :education-options="educationOptions"
          :intent-options="intentOptions"
          :advanced-open="advancedOpen"
          @update:filters="handleUpdateFilters"
          @toggle-advanced="advancedOpen = !advancedOpen"
          @reset="handleResetFilters"
      />

      <ProfilesAdvancedFilters
          v-if="advancedOpen"
          :title="t('directory.subtitle')"
          :industry-label="t('filters.industry')"
          :occupation-label="t('fields.job')"
          :language-label="t('filters.languages')"
          :verified-label="t('filters.verified')"
          :marital-status-label="t('filters.maritalStatus')"
          :children-label="t('filters.children')"
          :long-distance-label="t('filters.longDistance')"
          :filters="filters"
          :industry-options="industryOptions"
          :occupation-options="occupationOptions"
          :language-options="languageOptions"
          :verified-options="verifiedOptions"
          :marital-status-options="maritalStatusOptions"
          :children-options="childrenOptions"
          :long-distance-options="longDistanceOptions"
          @update:filters="handleUpdateFilters"
      />

      <ProfilesResultToolbar
          :result-prefix="t('directory.resultPrefix')"
          :result-suffix="t('directory.resultSuffix')"
          :page-text="t('directory.pagePrefix')"
          :sort-label="t('toolbar.sortLabel')"
          :total="total"
          :start="pageStart"
          :end="pageEnd"
          :sort-key="sortKey"
          :sort-options="sortOptions"
          @update:sort-key="handleUpdateSort"
      />

      <ProfilesDirectoryGrid
          :items="pagedItems"
          :locale="locale"
          :empty-text="t('directory.empty')"
          :male-text="genderMaleText"
          :female-text="genderFemaleText"
          :education-label="t('fields.education')"
          :job-label="t('fields.job')"
          :intent-label="t('fields.intent')"
          :verified-text="t('filters.verifiedLabel')"
          :status-open-text="t('status.open')"
          :status-review-text="t('status.review')"
          :status-vip-text="t('status.vip')"
          :open-text="t('actions.open')"
          :favorite-text="t('actions.favorite')"
          :compare-text="t('actions.compare')"
          @view-detail="handleViewDetail"
          @toggle-favorite="handleToggleFavorite"
          @compare="handleCompare"
      />

      <ProfilesPagination
          :page="page"
          :page-size="pageSize"
          :total="total"
          :prev-text="t('pagination.prev')"
          :next-text="t('pagination.next')"
          @change="handleChangePage"
      />
    </view>

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ProfilesPageIntro from '@/components/business/profiles/ProfilesPageIntro.vue'
import ProfilesFilterToolbar from '@/components/business/profiles/ProfilesFilterToolbar.vue'
import ProfilesAdvancedFilters from '@/components/business/profiles/ProfilesAdvancedFilters.vue'
import ProfilesResultToolbar from '@/components/business/profiles/ProfilesResultToolbar.vue'
import ProfilesDirectoryGrid from '@/components/business/profiles/ProfilesDirectoryGrid.vue'
import ProfilesPagination from '@/components/business/profiles/ProfilesPagination.vue'
import type { ProfilesDirectoryFilters } from '@/components/business/profiles/profiles.types'
import { useProfilesDirectory } from '@/components/business/profiles/useProfilesDirectory'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { NAV_LIST } from '@/constants/nav'
import { navigateByNavKey } from '@/utils/navigation'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('profiles')
const navList = NAV_LIST
const advancedOpen = ref(false)

const {
  filters,
  sortKey,
  page,
  pageSize,
  total,
  pagedItems,
  pageStart,
  pageEnd,
  ageOptions,
  cityOptions,
  heightOptions,
  educationOptions,
  intentOptions,
  industryOptions,
  occupationOptions,
  languageOptions,
  verifiedOptions,
  maritalStatusOptions,
  childrenOptions,
  longDistanceOptions,
  sortOptions,
  updateFilters,
  resetFilters,
  updateSort,
  changePage,
} = useProfilesDirectory()

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

const genderMaleText = computed(() => {
  if (locale.value === 'zh') return '男'
  if (locale.value === 'fr') return 'H'
  return 'M'
})

const genderFemaleText = computed(() => {
  if (locale.value === 'zh') return '女'
  if (locale.value === 'fr') return 'F'
  return 'F'
})

function handleUpdateFilters(nextFilters: Partial<ProfilesDirectoryFilters>) {
  updateFilters(nextFilters)
}

function handleResetFilters() {
  resetFilters()
}

function handleUpdateSort(nextSortKey: string) {
  updateSort(nextSortKey)
}

function handleChangePage(nextPage: number) {
  changePage(nextPage)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage()
}

function handleViewDetail(id: string) {
  openProfileDetail(id, 'member')
}

function handleToggleFavorite(id: string) {
  console.log('toggle favorite', id)
}

function handleCompare(id: string) {
  console.log('compare profile', id)
}
</script>