<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1280px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <ProfileDirectoryIntro
        :eyebrow="t('hero.eyebrow')"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :tags="heroTags"
      />

      <ProfileFilterToolbar
        :title="t('directory.title')"
        :reset-text="t('filters.clear')"
        :expand-text="t('filters.expand')"
        :collapse-text="t('filters.collapse')"
        :items="filterItems"
        :active-filters="activeFilterChips"
        @update:filter="handleUpdateFilter"
        @remove-filter="handleRemoveFilter"
        @reset="handleResetFilters"
      />

      <ProfileResultToolbar
        :summary="resultSummary"
        :sort="resultSort"
        @update:sort-key="handleUpdateSort"
      />

      <ProfileResultsGrid
        :items="pagedItems"
        :empty-text="t('directory.empty')"
        :empty-action-text="t('filters.clear')"
        :show-empty-action="activeFilterChips.length > 0"
        @reset="handleResetFilters"
      >
        <template #default="{ item }">
          <ProfileCardFrame
            :data="buildCardViewModel(item)"
            @select="openSelfDetail(item.id)"
          />
        </template>
      </ProfileResultsGrid>

      <ProfileDirectoryPagination
        :page="page"
        :page-size="pageSize"
        :total="total"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        @change="handleChangePage"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import ProfileFilterToolbar from '@/components/profiles/directory/ProfileFilterToolbar.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import ProfileResultsGrid from '@/components/profiles/directory/ProfileResultsGrid.vue'
import ProfileDirectoryIntro from '@/components/profiles/directory/ProfileDirectoryIntro.vue'
import ProfileDirectoryPagination from '@/components/profiles/directory/ProfileDirectoryPagination.vue'
import ProfileResultToolbar from '@/components/profiles/directory/ProfileResultToolbar.vue'
import { useSelfDirectory } from '@/composables/profiles'
import {
  getLocalizedProfileCardData,
  getProfileLanguageLabel,
  localized,
  pickLocalized,
  type LocalizedText,
  type Profile,
} from '@/api/modules/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { ProfileCardViewModel } from '@/types/profiles/card'
import type { ActiveDirectoryFilterChip, DirectoryOption, SelfDirectoryFilters } from '@/types/profiles/directory'
import {
  buildActiveProfileFilterChip,
  buildBaseAllOption,
  buildLocalizedProfileOptions,
  dedupeProfileOption,
} from '@/utils/profile-directory-options'
import { openSelfDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('self')

const {
  filters,
  sortKey,
  page,
  pageSize,
  sourceItems,
  total,
  pagedItems,
  pageStart,
  pageEnd,
  updateFilters,
  removeFilter,
  resetFilters,
  updateSort,
  changePage,
} = useSelfDirectory()

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

interface SelfFilterToolbarItem {
  key: keyof SelfDirectoryFilters
  label: string
  options: DirectoryOption[]
  value: string
  widthClass: string
  group?: 'primary' | 'secondary'
}

const compactWidthClass = 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]'
const regularWidthClass = 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]'
const wideWidthClass = 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]'

const allLabel = computed(() => localized('全部', 'Tous', 'All')[locale.value])
const ageOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('25岁以下', 'Moins de 25 ans', 'Under 25')[locale.value], value: 'under25' },
  { label: localized('25-29岁', '25-29 ans', '25-29')[locale.value], value: '25to29' },
  { label: localized('30-34岁', '30-34 ans', '30-34')[locale.value], value: '30to34' },
  { label: localized('35-39岁', '35-39 ans', '35-39')[locale.value], value: '35to39' },
  { label: localized('40岁以上', '40 ans et plus', '40+')[locale.value], value: '40plus' },
])
const genderOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: t('filters.genderMale'), value: 'male' },
  { label: t('filters.genderFemale'), value: 'female' },
])
const heightOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: '165cm-', value: 'under165' },
  { label: '165-169cm', value: '165to169' },
  { label: '170-174cm', value: '170to174' },
  { label: '175-179cm', value: '175to179' },
  { label: '180cm+', value: '180plus' },
])
const educationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('本科', 'Licence', 'Bachelor')[locale.value], value: 'bachelor' },
  { label: localized('硕士', 'Master', 'Master')[locale.value], value: 'master' },
  { label: localized('博士', 'Doctorat', 'PhD')[locale.value], value: 'phd' },
])
const cityOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.city),
])
const intentOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...sourceItems.value
    .map(profile => ({
      label: localize(profile.intent),
      value: profile.intentCode,
    }))
    .filter(dedupeProfileOption),
])
const industryOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.industry),
])
const occupationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.occupation),
])
const languageOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...Array.from(new Set(sourceItems.value.flatMap(profile => profile.languages)))
    .sort((left, right) => getProfileLanguageLabel(locale.value, left).localeCompare(getProfileLanguageLabel(locale.value, right)))
    .map(value => ({
      label: getProfileLanguageLabel(locale.value, value),
      value,
    })),
])
const verifiedOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('已认证', 'Verifie', 'Verified')[locale.value], value: 'verified' },
  { label: localized('未认证', 'Non verifie', 'Unverified')[locale.value], value: 'unverified' },
])
const maritalStatusOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('未婚', 'Celibataire', 'Single')[locale.value], value: 'single' },
  { label: localized('离异', 'Divorce', 'Divorced')[locale.value], value: 'divorced' },
  { label: localized('丧偶', 'Veuf / veuve', 'Widowed')[locale.value], value: 'widowed' },
])
const childrenOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('有孩子', 'Avec enfants', 'Has children')[locale.value], value: 'yes' },
  { label: localized('无孩子', 'Sans enfant', 'No children')[locale.value], value: 'no' },
])
const longDistanceOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('接受异地', 'Ouvert a distance', 'Open to long-distance')[locale.value], value: 'yes' },
  { label: localized('不接受异地', 'Pas de distance', 'No long-distance')[locale.value], value: 'no' },
])
const sortOptions = computed<DirectoryOption[]>(() => [
  { label: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value], value: 'recentActive' },
  { label: localized('优先资料', 'Profils prioritaires', 'Priority profiles')[locale.value], value: 'priorityFirst' },
  { label: localized('年龄从低到高', 'Age croissant', 'Age: low to high')[locale.value], value: 'ageAsc' },
  { label: localized('年龄从高到低', 'Age decroissant', 'Age: high to low')[locale.value], value: 'ageDesc' },
])
const resultSummary = computed(() => ({
  prefix: t('directory.resultPrefix'),
  suffix: t('directory.resultSuffix'),
  pageText: t('directory.pagePrefix'),
  total: total.value,
  start: pageStart.value,
  end: pageEnd.value,
}))
const resultSort = computed(() => ({
  label: t('toolbar.sortLabel'),
  key: sortKey.value,
  options: sortOptions.value,
}))
const filterItems = computed<SelfFilterToolbarItem[]>(() => [
  {
    key: 'gender',
    label: t('filters.gender'),
    options: genderOptions.value,
    value: filters.value.gender,
    widthClass: compactWidthClass,
    group: 'primary',
  },
  {
    key: 'ageRange',
    label: t('filters.age'),
    options: ageOptions.value,
    value: filters.value.ageRange,
    widthClass: compactWidthClass,
    group: 'primary',
  },
  {
    key: 'city',
    label: t('filters.city'),
    options: cityOptions.value,
    value: filters.value.city,
    widthClass: regularWidthClass,
    group: 'primary',
  },
  {
    key: 'heightRange',
    label: t('filters.height'),
    options: heightOptions.value,
    value: filters.value.heightRange,
    widthClass: compactWidthClass,
    group: 'primary',
  },
  {
    key: 'education',
    label: t('filters.education'),
    options: educationOptions.value,
    value: filters.value.education,
    widthClass: regularWidthClass,
    group: 'primary',
  },
  {
    key: 'intentCode',
    label: t('filters.intent'),
    options: intentOptions.value,
    value: filters.value.intentCode,
    widthClass: wideWidthClass,
    group: 'primary',
  },
  {
    key: 'industry',
    label: t('filters.industry'),
    options: industryOptions.value,
    value: filters.value.industry,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
  {
    key: 'occupation',
    label: t('fields.job'),
    options: occupationOptions.value,
    value: filters.value.occupation,
    widthClass: wideWidthClass,
    group: 'secondary',
  },
  {
    key: 'language',
    label: t('filters.languages'),
    options: languageOptions.value,
    value: filters.value.language,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
  {
    key: 'verified',
    label: t('filters.verified'),
    options: verifiedOptions.value,
    value: filters.value.verified,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
  {
    key: 'maritalStatus',
    label: t('filters.maritalStatus'),
    options: maritalStatusOptions.value,
    value: filters.value.maritalStatus,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
  {
    key: 'hasChildren',
    label: t('filters.children'),
    options: childrenOptions.value,
    value: filters.value.hasChildren,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
  {
    key: 'acceptLongDistance',
    label: t('filters.longDistance'),
    options: longDistanceOptions.value,
    value: filters.value.acceptLongDistance,
    widthClass: regularWidthClass,
    group: 'secondary',
  },
])

const activeFilterChips = computed<Array<ActiveDirectoryFilterChip<keyof SelfDirectoryFilters>>>(() => {
  const chips = [
    buildActiveProfileFilterChip('gender', t('filters.gender'), genderOptions.value, filters.value.gender),
    buildActiveProfileFilterChip('ageRange', t('filters.age'), ageOptions.value, filters.value.ageRange),
    buildActiveProfileFilterChip('city', t('filters.city'), cityOptions.value, filters.value.city),
    buildActiveProfileFilterChip('heightRange', t('filters.height'), heightOptions.value, filters.value.heightRange),
    buildActiveProfileFilterChip('education', t('filters.education'), educationOptions.value, filters.value.education),
    buildActiveProfileFilterChip('intentCode', t('filters.intent'), intentOptions.value, filters.value.intentCode),
    buildActiveProfileFilterChip('industry', t('filters.industry'), industryOptions.value, filters.value.industry),
    buildActiveProfileFilterChip('occupation', t('fields.job'), occupationOptions.value, filters.value.occupation),
    buildActiveProfileFilterChip('language', t('filters.languages'), languageOptions.value, filters.value.language),
    buildActiveProfileFilterChip('verified', t('filters.verified'), verifiedOptions.value, filters.value.verified),
    buildActiveProfileFilterChip('maritalStatus', t('filters.maritalStatus'), maritalStatusOptions.value, filters.value.maritalStatus),
    buildActiveProfileFilterChip('hasChildren', t('filters.children'), childrenOptions.value, filters.value.hasChildren),
    buildActiveProfileFilterChip('acceptLongDistance', t('filters.longDistance'), longDistanceOptions.value, filters.value.acceptLongDistance),
  ]

  return chips.filter((item): item is ActiveDirectoryFilterChip<keyof SelfDirectoryFilters> => Boolean(item))
})

function handleUpdateFilter(payload: { key: string, value: string }) {
  const key = payload.key as keyof SelfDirectoryFilters
  updateFilters({ [key]: payload.value } as Partial<SelfDirectoryFilters>)
}

function handleResetFilters() {
  resetFilters()
}

function handleRemoveFilter(key: string) {
  removeFilter(key as keyof SelfDirectoryFilters)
}

function handleUpdateSort(nextSortKey: string) {
  updateSort(nextSortKey)
}

function handleChangePage(nextPage: number) {
  changePage(nextPage)
}


function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function buildCardViewModel(profile: Profile): ProfileCardViewModel {
  const cardData = getLocalizedProfileCardData(locale.value, profile)
  const goalText = cardData.goalCode === 'marriage'
    ? t('card.goalMarriage')
    : cardData.goalCode === 'exclusive'
      ? t('card.goalExclusive')
      : cardData.goalCode === 'cross_border'
        ? t('card.goalCrossBorder')
        : t('card.goalSerious')

  const labelText = cardData.status === 'review'
    ? t('card.labelReview')
    : cardData.status === 'vip'
      ? t('card.labelPriority')
      : t('card.labelSelected')

  return {
    avatarUrl: cardData.avatarUrl,
    avatarFallback: cardData.displayName,
    displayName: cardData.displayName,
    gender: profile.gender,
    meta: cardData.meta,
    badge: goalText,
    summary: cardData.summary,
    facts: [
      { label: t('fields.city'), value: cardData.facts.city },
      { label: t('fields.education'), value: cardData.facts.education },
      { label: t('fields.languages'), value: cardData.facts.languages },
    ],
    tags: cardData.tags,
    footer: labelText,
  }
}
</script>
