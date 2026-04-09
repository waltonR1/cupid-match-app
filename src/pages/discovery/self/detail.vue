<template>
  <view class="min-h-screen bg-page-soft text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.self"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1240px] px-6 pb-20 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
      <view
        class="mb-6 inline-flex cursor-pointer items-center gap-2 border border-border-base bg-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-text-body-soft transition-colors duration-200 hover:text-brand-support"
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
        <text>{{ t('actions.backToSelf') }}</text>
      </view>

      <view v-if="heroData" class="space-y-6">
        <DetailHeroPanel :data="heroData" />

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <view class="space-y-6">
            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ t('sections.overview') }}
              </view>

              <view class="mt-6 grid gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
                <view
                  v-for="item in overviewFacts"
                  :key="item.label"
                  class="border-b border-border-light pb-3"
                >
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ item.label }}
                  </view>
                  <view class="mt-2 text-[16px] leading-7 text-text-body">
                    {{ item.value }}
                  </view>
                </view>
              </view>
            </view>

            <view class="grid gap-6 lg:grid-cols-2">
              <view class="border border-border-base bg-surface-card-soft px-6 py-7 shadow-panel">
                <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                  {{ t('sections.relationship') }}
                </view>

                <view class="mt-6 border border-border-light bg-surface-card px-5 py-5">
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

                <view class="mt-6 grid gap-4">
                  <view
                    v-for="item in relationshipFacts"
                    :key="item.label"
                    class="border-b border-border-light pb-3 last:border-b-0 last:pb-0"
                  >
                    <view class="text-[12px] tracking-[1px] text-text-muted">
                      {{ item.label }}
                    </view>
                    <view class="mt-2 text-[16px] leading-7 text-text-body">
                      {{ item.value }}
                    </view>
                  </view>
                </view>
              </view>

              <view class="border border-border-base bg-surface-card px-6 py-7 shadow-panel">
                <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                  {{ t('sections.lifestyle') }}
                </view>

                <view class="mt-6 grid gap-4">
                  <view
                    v-for="item in lifestyleFacts"
                    :key="item.label"
                    class="border-b border-border-light pb-3 last:border-b-0 last:pb-0"
                  >
                    <view class="text-[12px] tracking-[1px] text-text-muted">
                      {{ item.label }}
                    </view>
                    <view class="mt-2 text-[16px] leading-7 text-text-body">
                      {{ item.value }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <view class="border border-border-base bg-surface-card-soft px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ t('sections.accessPolicy') }}
              </view>
              <view class="mt-4 text-[16px] leading-8 text-text-body-soft">
                {{ t('hero.accessNote') }}
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ t('sections.curationFocus') }}
              </view>

              <view class="mt-6 grid gap-4">
                <view
                  v-for="item in spotlightFacts"
                  :key="item.label"
                  class="border-b border-border-light pb-3 last:border-b-0 last:pb-0"
                >
                  <view class="text-[12px] tracking-[1px] text-text-muted">
                    {{ item.label }}
                  </view>
                  <view class="mt-2 text-[16px] leading-7 text-text-body">
                    {{ item.value }}
                  </view>
                </view>
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ t('sections.highlights') }}
              </view>

              <view class="mt-6 grid gap-3">
                <view
                  v-for="item in highlightTexts"
                  :key="item"
                  class="border border-border-light bg-surface-card-soft px-4 py-4 text-[16px] leading-7 text-text-body"
                >
                  {{ item }}
                </view>
              </view>
            </view>

            <view class="border border-border-base bg-surface-card px-6 py-7 shadow-panel">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                {{ t('sections.tags') }}
              </view>

              <view class="mt-4 flex flex-wrap gap-2">
                <view
                  v-for="item in tagTexts"
                  :key="item"
                  class="rounded-full border border-border-base bg-surface-panel px-3 py-1.5 text-[12px] text-brand-support"
                >
                  {{ item }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <EmptyStatePanel
        v-else
        :title="t('sections.notFoundTitle')"
        :subtitle="t('sections.notFoundSubtitle')"
        :primary-text="t('actions.backToSelf')"
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
import DetailHeroPanel from '@/components/discovery/shared/detail/DetailHeroPanel.vue'
import { useSelfDetailViewModel } from '@/components/discovery/self/useSelfDetailViewModel'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('selfDetail')

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
} = useSelfDetailViewModel(profileId, locale, t)

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }

  uni.redirectTo({
    url: '/pages/discovery/self/index',
  })
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
