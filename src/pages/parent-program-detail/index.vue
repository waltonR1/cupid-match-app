<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav="common.nav.parents"
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view v-if="program" class="pb-20">
      <view class="relative overflow-hidden bg-[linear-gradient(135deg,#f5f0e8_0%,#efe2cf_52%,#eadac4_100%)] text-[#1f2520]">
        <view class="absolute right-[-80px] top-10 h-[300px] w-[300px] rounded-full bg-white/30 blur-3xl" />
        <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
          <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
            <view class="max-w-[700px]">
              <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d7c9b5] bg-white/40 px-5 py-2">
                <view class="h-[1px] w-12 bg-[#d7b86e]" />
                <text class="text-[12px] uppercase tracking-[6px] text-[#8f785b]">{{ t('hero.eyebrow') }}</text>
              </view>

              <view class="text-[52px] font-semibold leading-[1.02] text-[#1d221e] lg:text-[82px]">
                {{ localize(program.title) }}
              </view>

              <view class="mt-8 max-w-[620px] text-[18px] leading-8 text-[#5d4f42]">
                {{ localize(program.summary) }}
              </view>
            </view>

            <view class="border border-white/50 bg-white/55 px-8 py-8 shadow-[0_18px_45px_rgba(50,63,49,0.08)]">
              <view class="grid gap-4 text-[15px] leading-7 text-[#5d5045]">
                <view>{{ t('fields.date') }} {{ formatDate(program.date) }}</view>
                <view>{{ t('fields.city') }} {{ localize(program.city) }}</view>
                <view>{{ t('fields.mode') }} {{ localize(program.mode) }}</view>
                <view>{{ t('fields.seats') }} {{ program.seats }}</view>
                <view>{{ t('fields.status') }} {{ statusLabel(program.status) }}</view>
              </view>

              <button class="mt-8 w-full bg-[#223148] px-6 py-4 text-[16px] font-medium text-white" @click="handleRegisterClick">
                {{ t('actions.apply') }}
              </button>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <view class="border border-[#e2d7c9] bg-white px-8 py-10">
            <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.scope') }}</view>
            <view class="mt-8 grid gap-5">
              <view
                  v-for="item in scopeCards"
                  :key="item.title"
                  class="border border-[#eee4d8] bg-[#faf7f1] px-6 py-6"
              >
                <view class="text-[24px] font-semibold text-[#1f1f1f]">{{ item.title }}</view>
                <view class="mt-3 text-[15px] leading-8 text-[#6b5c4d]">{{ item.desc }}</view>
              </view>
            </view>
          </view>

          <view class="grid gap-6">
            <view class="border border-[#223148] bg-[#223148] px-8 py-10 text-white">
              <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('sections.boundary') }}</view>
              <view class="mt-6 text-[16px] leading-8 text-[#d8cfbf]">
                {{ t('sections.guidance') }}
              </view>
            </view>

            <view class="grid gap-6 md:grid-cols-2">
              <view
                  v-for="profile in familyProfiles"
                  :key="profile.id"
                  class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8"
                  @click="handleProfileOpen(profile.id)"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ t('sections.visibleProfiles') }}</view>
                <view class="mt-4 text-[28px] font-semibold text-[#1f1f1f]">{{ profile.name }}</view>
                <view class="mt-3 text-[15px] leading-7 text-[#6b5c4d]">{{ localize(profile.summary) }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <view class="border border-[#e2d7c9] bg-white px-8 py-10 text-[18px] leading-8 text-[#6b5c4d]">
        {{ t('sections.notFound') }}
      </view>
    </view>

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { getMockParentProgramById, mockProfiles, pickLocalized, type LocalizedText } from '@/mock/business'
import { openProfileDetail, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t, locale } = usePageI18n('parentProgramDetail')
const programId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    programId.value = query.id
  }
})

const program = computed(() => getMockParentProgramById(programId.value))
const familyProfiles = computed(() => mockProfiles.filter(profile => profile.familyVisible).slice(0, 2))

const scopeCards = computed(() => [
  { title: t('scopeCards.understanding.title'), desc: t('scopeCards.understanding.desc') },
  { title: t('scopeCards.boundary.title'), desc: t('scopeCards.boundary.desc') },
])

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function statusLabel(status: 'open' | 'waitlist' | 'closed') {
  return t(`status.${status}`)
}

function formatDate(date: string) {
  const map = {
    zh: new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
    fr: new Date(date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
    en: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  } as const

  return map[locale.value]
}

function handleProfileOpen(id: string) {
  openProfileDetail(id, 'parent')
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>



