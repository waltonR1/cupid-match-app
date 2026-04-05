<template>
  <view class="min-h-screen bg-page-soft text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.family"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1240px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <view
        class="mb-6 inline-flex cursor-pointer items-center gap-2 border border-border-base bg-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-text-body-soft transition-colors duration-200 hover:text-brand-brown"
        @click="handleBack"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75 2.5L4.25 6L7.75 9.5"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <text>{{ t('actions.backToFamily') }}</text>
      </view>

      <view v-if="heroData" class="space-y-6">
        <DetailHeroPanel :data="heroData" />

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <view class="space-y-6">
            <DetailSectionPanel :title="t('sections.overview')">
              <DetailFactGrid :items="overviewFacts" />
            </DetailSectionPanel>

            <view class="grid gap-6 lg:grid-cols-2">
              <DetailSectionPanel :title="t('sections.relationship')" surface="soft">
                <view class="border border-border-light bg-surface-card px-5 py-5">
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ t('fields.intent') }}
                  </view>
                  <view class="mt-3 text-[22px] leading-8 text-text-heading">
                    {{ intentText }}
                  </view>

                  <view class="mt-5 text-[12px] tracking-[1px] text-text-muted">
                    {{ t('fields.maritalPlan') }}
                  </view>
                  <view class="mt-3 text-[16px] leading-8 text-text-body">
                    {{ maritalPlanText }}
                  </view>
                </view>

                <view class="mt-6">
                  <DetailFactList :items="relationshipFacts" />
                </view>
              </DetailSectionPanel>

              <DetailSectionPanel :title="t('sections.lifestyle')">
                <DetailFactList :items="lifestyleFacts" />
              </DetailSectionPanel>
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <DetailSectionPanel :title="t('sections.accessPolicy')" surface="soft" spacing="compact">
              <view class="text-[16px] leading-8 text-text-body-soft">
                {{ t('hero.accessNote') }}
              </view>
            </DetailSectionPanel>

            <DetailSectionPanel :title="t('sections.curationFocus')">
              <DetailFactList :items="spotlightFacts" />
            </DetailSectionPanel>

            <DetailSectionPanel :title="t('sections.highlights')">
              <view class="grid gap-3">
                <view
                  v-for="item in highlightTexts"
                  :key="item"
                  class="border border-border-light bg-surface-card-soft px-4 py-4 text-[16px] leading-7 text-text-body"
                >
                  {{ item }}
                </view>
              </view>
            </DetailSectionPanel>

            <DetailSectionPanel :title="t('sections.tags')" spacing="compact">
              <DetailTagList :items="tagTexts" />
            </DetailSectionPanel>
          </view>
        </view>
      </view>

      <EmptyStatePanel
        v-else
        :title="t('sections.notFoundTitle')"
        :subtitle="t('sections.notFoundSubtitle')"
        :primary-text="t('actions.backToFamily')"
        primary-variant="outline"
        variant="compact"
        @primary="handleBack"
      />
    </view>

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import DetailFactGrid from '@/components/common/detail/DetailFactGrid.vue'
import DetailFactList from '@/components/common/detail/DetailFactList.vue'
import DetailHeroPanel from '@/components/common/detail/DetailHeroPanel.vue'
import DetailSectionPanel from '@/components/common/detail/DetailSectionPanel.vue'
import DetailTagList from '@/components/common/detail/DetailTagList.vue'
import { useFamilyDetailViewModel } from '@/components/family/useFamilyDetailViewModel'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('familyDetail')

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
} = useFamilyDetailViewModel(profileId, locale, t)

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  uni.redirectTo({
    url: '/pages/family/index',
  })
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>
