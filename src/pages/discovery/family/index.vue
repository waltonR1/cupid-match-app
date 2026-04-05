<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.family"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <DirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
      />

      <FamilyFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :expand-text="t('filters.expand')"
        :collapse-text="t('filters.collapse')"
        :gender-label="t('filters.gender')"
        :age-label="t('filters.age')"
        :city-label="t('filters.city')"
        :education-label="t('filters.education')"
        :intent-label="t('filters.intent')"
        :family-mode-label="t('filters.familyMode')"
        :occupation-label="t('filters.occupation')"
        :industry-label="t('filters.industry')"
        :marital-status-label="t('filters.maritalStatus')"
        :children-label="t('filters.children')"
        :long-distance-label="t('filters.longDistance')"
        :filters="filters"
        :gender-options="genderOptions"
        :age-options="ageOptions"
        :city-options="cityOptions"
        :education-options="educationOptions"
        :intent-options="intentOptions"
        :family-mode-options="familyModeOptions"
        :occupation-options="occupationOptions"
        :industry-options="industryOptions"
        :marital-status-options="maritalStatusOptions"
        :children-options="childrenOptions"
        :long-distance-options="longDistanceOptions"
        :active-filters="activeFilterChips"
        @update:filters="handleUpdateFilters"
        @remove-filter="handleRemoveFilter"
        @reset="handleResetFilters"
      />

      <DirectoryResultToolbar
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

      <DirectoryGridShell
        :items="pagedItems"
        :empty-text="t('directory.empty')"
        :empty-action-text="t('filters.clear')"
        :show-empty-action="activeFilterChips.length > 0"
        @reset="handleResetFilters"
      >
        <template #default="{ item }">
          <DirectoryCardFrame
            :data="createFamilyCardViewModel(item)"
            clickable
            summary-class="line-clamp-3"
            @select="handleProfileOpen(item.id)"
          />
        </template>
      </DirectoryGridShell>

      <DirectoryPagination
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
import { computed } from 'vue'
import DirectoryCardFrame from '@/components/common/directory/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/common/directory/directory-card.types'
import DirectoryGridShell from '@/components/common/directory/DirectoryGridShell.vue'
import DirectoryIntro from '@/components/common/directory/DirectoryIntro.vue'
import DirectoryPagination from '@/components/common/directory/DirectoryPagination.vue'
import DirectoryResultToolbar from '@/components/common/directory/DirectoryResultToolbar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FamilyFilterToolbar from '@/components/family/FamilyFilterToolbar.vue'
import type { FamilyDirectoryFilters } from '@/components/family/family.types'
import { useFamilyDirectory } from '@/components/family/useFamilyDirectory'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { pickLocalized, type MockProfile } from '@/mock/business'
import { openFamilyProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('family')

const {
  filters,
  sortKey,
  page,
  pageSize,
  total,
  pagedItems,
  pageStart,
  pageEnd,
  activeFilterChips,
  ageOptions,
  genderOptions,
  cityOptions,
  educationOptions,
  intentOptions,
  familyModeOptions,
  occupationOptions,
  industryOptions,
  maritalStatusOptions,
  childrenOptions,
  longDistanceOptions,
  sortOptions,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useFamilyDirectory()


const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

function createFamilyCardViewModel(profile: MockProfile): DirectoryCardViewModel {
  const occupation = pickLocalized(locale.value, profile.occupation)
  const meta = locale.value === 'zh'
    ? `${profile.age}岁 / ${occupation}`
    : locale.value === 'fr'
      ? `${profile.age} ans / ${occupation}`
      : `${profile.age} / ${occupation}`

  const familyMode = profile.familyPriority
    ? t('modes.priority')
    : profile.allowFamilyContact
      ? t('modes.contactReady')
      : t('modes.contextOnly')

  const maritalStatus = profile.maritalStatus === 'divorced'
    ? t('tags.maritalDivorced')
    : profile.maritalStatus === 'widowed'
      ? t('tags.maritalWidowed')
      : t('tags.maritalSingle')

  const familyContext = profile.acceptLongDistance
    ? t('tags.longDistanceYes')
    : profile.hasChildren
      ? t('tags.childrenYes')
      : t('tags.childrenNo')

  const decisionLabel = profile.status === 'review'
    ? t('card.labelReview')
    : profile.familyPriority
      ? t('card.labelPriority')
      : profile.allowFamilyContact
        ? t('card.labelContactReady')
        : t('card.labelObserve')

  return {
    avatar: profile.avatar,
    name: profile.name,
    gender: profile.gender,
    meta,
    badge: familyMode,
    summary: pickLocalized(locale.value, profile.maritalPlan),
    facts: [
      { label: t('fields.city'), value: pickLocalized(locale.value, profile.city) },
      { label: t('fields.education'), value: pickLocalized(locale.value, profile.education) },
      { label: t('fields.residencePlan'), value: pickLocalized(locale.value, profile.residencePlan) },
    ],
    tags: [
      pickLocalized(locale.value, profile.intent),
      maritalStatus,
      familyContext,
    ],
    footer: decisionLabel,
  }
}

function handleUpdateFilters(nextFilters: Partial<FamilyDirectoryFilters>) {
  updateFilters(nextFilters)
}

function handleRemoveFilter(key: keyof FamilyDirectoryFilters) {
  removeFilter(key)
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

function handleProfileOpen(id: string) {
  openFamilyProfileDetail(id)
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>
