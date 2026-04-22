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
            clickable
            summary-class="line-clamp-3"
            @select="openFamilyProfileDetail(item.id)"
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
import { useFamilyDirectory } from '@/composables/profiles'
import {
  localized,
  pickLocalized,
  type LocalizedText,
  type Profile,
} from '@/api/modules/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { DirectoryCardViewModel } from '@/types/directory-card'
import type { ActiveDirectoryFilterChip, DirectoryOption, FamilyDirectoryFilters } from '@/types/family-directory'
import {
  buildActiveProfileFilterChip,
  buildBaseAllOption,
  buildLocalizedProfileOptions,
  dedupeProfileOption,
} from '@/utils/profile-directory-options'
import { openFamilyProfileDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('family')

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
} = useFamilyDirectory()

const heroTags = computed(() => [
  t('hero.tags.first'),
  t('hero.tags.second'),
  t('hero.tags.third'),
])

interface FamilyFilterToolbarItem {
  key: keyof FamilyDirectoryFilters
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
const cityOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.city),
])
const educationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('本科', 'Licence', 'Bachelor')[locale.value], value: 'bachelor' },
  { label: localized('硕士', 'Master', 'Master')[locale.value], value: 'master' },
  { label: localized('博士', 'Doctorat', 'PhD')[locale.value], value: 'phd' },
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
const familyModeOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  { label: localized('仅背景可见', 'Contexte seulement', 'Context only')[locale.value], value: 'context_only' },
  { label: localized('可辅助沟通', 'Pret pour echange famille', 'Contact-ready')[locale.value], value: 'contact_ready' },
  { label: localized('优先家长评估', 'Priorite famille', 'Priority review')[locale.value], value: 'priority' },
])
const occupationOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.occupation),
])
const industryOptions = computed<DirectoryOption[]>(() => [
  buildBaseAllOption(allLabel.value),
  ...buildLocalizedProfileOptions(sourceItems.value, localize, profile => profile.industry),
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
  { label: localized('更偏同城', 'Plutot meme ville', 'Prefers same city')[locale.value], value: 'no' },
])
const sortOptions = computed<DirectoryOption[]>(() => [
  { label: localized('优先家长评估', 'Priorite famille', 'Priority review')[locale.value], value: 'priorityFirst' },
  { label: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value], value: 'recentActive' },
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
const filterItems = computed<FamilyFilterToolbarItem[]>(() => [
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
    key: 'familyMode',
    label: t('filters.familyMode'),
    options: familyModeOptions.value,
    value: filters.value.familyMode,
    widthClass: wideWidthClass,
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
    key: 'occupation',
    label: t('filters.occupation'),
    options: occupationOptions.value,
    value: filters.value.occupation,
    widthClass: wideWidthClass,
    group: 'secondary',
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
const activeFilterChips = computed<ActiveDirectoryFilterChip[]>(() => {
  const chips = [
    buildActiveProfileFilterChip('gender', t('filters.gender'), genderOptions.value, filters.value.gender),
    buildActiveProfileFilterChip('ageRange', t('filters.age'), ageOptions.value, filters.value.ageRange),
    buildActiveProfileFilterChip('city', t('filters.city'), cityOptions.value, filters.value.city),
    buildActiveProfileFilterChip('education', t('filters.education'), educationOptions.value, filters.value.education),
    buildActiveProfileFilterChip('intentCode', t('filters.intent'), intentOptions.value, filters.value.intentCode),
    buildActiveProfileFilterChip('familyMode', t('filters.familyMode'), familyModeOptions.value, filters.value.familyMode),
    buildActiveProfileFilterChip('occupation', t('filters.occupation'), occupationOptions.value, filters.value.occupation),
    buildActiveProfileFilterChip('industry', t('filters.industry'), industryOptions.value, filters.value.industry),
    buildActiveProfileFilterChip('maritalStatus', t('filters.maritalStatus'), maritalStatusOptions.value, filters.value.maritalStatus),
    buildActiveProfileFilterChip('hasChildren', t('filters.children'), childrenOptions.value, filters.value.hasChildren),
    buildActiveProfileFilterChip('acceptLongDistance', t('filters.longDistance'), longDistanceOptions.value, filters.value.acceptLongDistance),
  ]

  return chips.filter((item): item is ActiveDirectoryFilterChip => Boolean(item))
})

function handleUpdateFilter(payload: { key: string, value: string }) {
  const key = payload.key as keyof FamilyDirectoryFilters
  updateFilters({ [key]: payload.value } as Partial<FamilyDirectoryFilters>)
}

function handleRemoveFilter(key: string) {
  removeFilter(key as keyof FamilyDirectoryFilters)
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


function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function buildCardViewModel(profile: Profile): DirectoryCardViewModel {
  const occupation = localize(profile.occupation)
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
    summary: localize(profile.maritalPlan),
    facts: [
      { label: t('fields.city'), value: localize(profile.city) },
      { label: t('fields.education'), value: localize(profile.education) },
      { label: t('fields.residencePlan'), value: localize(profile.residencePlan) },
    ],
    tags: [
      localize(profile.intent),
      maritalStatus,
      familyContext,
    ],
    footer: decisionLabel,
  }
}
</script>
