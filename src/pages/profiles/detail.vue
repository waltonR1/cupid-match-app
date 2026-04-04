<template>
  <view class="bg-page-base text-text-heading">
    <DetailDossierPage
      :nav-list="navList"
      active-nav-key="common.nav.profiles"
      :back-text="t('actions.backToProfiles')"
      :hero-data="heroData"
      :overview-facts="overviewFacts"
      :relationship-facts="relationshipFacts"
      :lifestyle-facts="lifestyleFacts"
      :spotlight-facts="spotlightFacts"
      :highlight-texts="highlightTexts"
      :tag-texts="tagTexts"
      :overview-title="t('sections.overview')"
      :relationship-title="t('sections.relationship')"
      :lifestyle-title="t('sections.lifestyle')"
      :access-policy-title="t('sections.accessPolicy')"
      :curation-focus-title="t('sections.curationFocus')"
      :highlights-title="t('sections.highlights')"
      :tags-title="t('sections.tags')"
      :intent-label="t('fields.intent')"
      :intent-text="intentText"
      :marital-plan-label="t('fields.maritalPlan')"
      :marital-plan-text="maritalPlanText"
      :access-note="t('hero.accessNote')"
      :not-found-title="t('sections.notFoundTitle')"
      :not-found-subtitle="t('sections.notFoundSubtitle')"
      @back="handleBack"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import DetailDossierPage from '@/components/common/detail/DetailDossierPage.vue'
import { useProfileDetailViewModel } from '@/components/profiles/useProfileDetailViewModel'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('profileDetail')

const profileId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

const {
  heroData,
  overviewFacts,
  relationshipFacts,
  lifestyleFacts,
  spotlightFacts,
  intentText,
  maritalPlanText,
  highlightTexts,
  tagTexts,
} = useProfileDetailViewModel(profileId, locale, t)

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  uni.redirectTo({
    url: '/pages/profiles/index',
  })
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
