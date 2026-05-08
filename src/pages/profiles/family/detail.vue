<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1180px] px-5 pb-20 pt-6 lg:px-8 lg:pb-24 lg:pt-8">
      <view
          class="mb-5 inline-flex cursor-pointer items-center gap-2 border border-semantic-border-default bg-semantic-surface-card px-3 py-2 text-[12px] tracking-[1.2px] text-semantic-text-muted transition-colors duration-200 hover:text-semantic-text-link"
          @click="handleBack"
      >
        <svg
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M7.75 2.5L4.25 6L7.75 9.5"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
          />
        </svg>
        <text>{{ t('actions.backToFamily') }}</text>
      </view>

      <view v-if="heroData" class="space-y-6">
        <ProfileDetailHero
            :data="heroData"
            :login-locked-text="t('sections.loginLocked')"
            :member-locked-text="t('sections.memberLocked')"
        />

        <view v-if="isVisitorAccess" class="grid gap-3 md:grid-cols-3">
          <view
              v-for="item in revealSteps"
              :key="item.title"
              class="border px-5 py-4"
              :class="revealStepClass(item.state)"
          >
            <view class="text-[12px] uppercase tracking-[2.4px] text-semantic-text-eyebrow">
              {{ item.title }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">
              {{ item.subtitle }}
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <view class="space-y-6">
            <ProfileDetailSection
                :columns="3"
                :items="snapshotFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.profileSnapshot')"
            />

            <view
                v-if="isVisitorAccess"
                class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
                {{ t('sections.visitorGateTitle') }}
              </view>
              <view class="mt-3 text-[16px] leading-8 text-semantic-text-secondary">
                {{ t('sections.visitorGateSubtitle') }}
              </view>
              <view class="mt-5">
                <AppButton variant="primary" size="sm" @click="openLoginPage">
                  {{ t('actions.loginToDiscover') }}
                </AppButton>
              </view>
            </view>

            <ProfileDetailSection
                v-if="!isVisitorAccess"
                :columns="2"
                :items="familyReviewFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.familyReview')"
            />

            <ProfileDetailSection
                v-if="!isVisitorAccess"
                :columns="2"
                :items="relationshipFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.marriagePlan')"
            />

            <ProfileDetailSection
                v-if="isPremiumAccess"
                :columns="1"
                :items="preferenceFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.partnerPreference')"
            />

            <ProfileDetailSection
                v-if="isPremiumAccess"
                :columns="1"
                :items="valueFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.familyValues')"
            />

            <view
                v-if="isRegisteredAccess"
                class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
                {{ t('sections.premiumGateTitle') }}
              </view>
              <view class="mt-3 text-[16px] leading-8 text-semantic-text-secondary">
                {{ t('sections.premiumGateSubtitle') }}
              </view>
              <view class="mt-5">
                <AppButton variant="primary" size="sm" @click="openMembershipPage">
                  {{ t('actions.becomeMember') }}
                </AppButton>
              </view>
            </view>
          </view>

          <view class="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <ProfileDetailSection
                v-if="!isVisitorAccess"
                :columns="1"
                :items="lifestyleFacts"
                :login-locked-text="t('sections.loginLocked')"
                :member-locked-text="t('sections.memberLocked')"
                :title="t('sections.lifestyle')"
            />

            <view
                v-if="familyIntroductionData && !isVisitorAccess"
                class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
                {{ familyIntroductionData.title }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-semantic-text-secondary">
                {{ familyIntroductionData.subtitle }}
              </view>
              <view class="mt-6 grid gap-4">
                <view
                    v-for="item in familyIntroductionData.facts"
                    :key="item.label"
                    class="border-b border-semantic-border-divider pb-3 last:border-b-0 last:pb-0"
                >
                  <view class="text-[12px] tracking-[1px] text-semantic-text-muted">
                    {{ item.label }}
                  </view>
                  <view class="mt-2 text-[16px] leading-7 text-semantic-text-secondary">
                    {{ item.value }}
                  </view>
                </view>
              </view>
            </view>

            <ProfilePrivateIntroductionPanel
                v-if="privateIntroductionData && !isVisitorAccess"
                :data="privateIntroductionData"
                :text="privateIntroductionText"
                @open-room="openMessagesPage"
                @request="requestPrivateIntroduction"
            />

            <view
                v-if="isVisitorAccess"
                class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
                {{ t('sections.conciergeNoteTitle') }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
                {{ t('sections.conciergeNoteSubtitle') }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <EmptyStatePanel
          v-else
          :primary-text="t('actions.backToFamily')"
          :subtitle="t('sections.notFoundSubtitle')"
          :title="t('sections.notFoundTitle')"
          @primary="handleBack"
      />
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import AppButton from '@/components/common/AppButton.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import ProfileDetailHero from '@/components/profiles/detail/ProfileDetailHero.vue'
import ProfileDetailSection from '@/components/profiles/detail/ProfileDetailSection.vue'
import ProfilePrivateIntroductionPanel from '@/components/profiles/detail/ProfilePrivateIntroductionPanel.vue'
import {useFamilyProfileDetail} from '@/hooks/profiles'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import type {PrivateIntroductionPanelText} from '@/types/profiles/detail'
import {openLoginPage, openMembershipPage, openMessagesPage} from '@/utils/navigation'

const {t, locale} = usePageI18n('familyDetail')
const profileId = ref('')

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

const {
  accessLevel,
  heroData,
  snapshotFacts,
  familyReviewFacts,
  relationshipFacts,
  lifestyleFacts,
  preferenceFacts,
  valueFacts,
  familyIntroductionData,
  privateIntroductionData,
  requestPrivateIntroduction,
} = useFamilyProfileDetail(profileId, t, locale)

type VisitorRevealStep = {
  title: string
  subtitle: string
  state: 'active' | 'locked'
}

const isVisitorAccess = computed(() => accessLevel.value === 'visitor')
const isRegisteredAccess = computed(() => accessLevel.value === 'registered')
const isPremiumAccess = computed(() => accessLevel.value === 'premium')

const revealSteps = computed<VisitorRevealStep[]>(() => [
  {
    title: t('sections.revealVisitorTitle'),
    subtitle: t('sections.revealVisitorSubtitle'),
    state: 'active',
  },
  {
    title: t('sections.revealRegisteredTitle'),
    subtitle: t('sections.revealRegisteredSubtitle'),
    state: 'locked',
  },
  {
    title: t('sections.revealPremiumTitle'),
    subtitle: t('sections.revealPremiumSubtitle'),
    state: 'locked',
  },
])

const privateIntroductionStatusText = computed(() => {
  const status = privateIntroductionData.value?.status
  if (status === 'requested') return t('sections.privateIntroductionStatusRequested')
  if (status === 'accepted') return t('sections.privateIntroductionStatusAccepted')
  if (status === 'declined') return t('sections.privateIntroductionStatusDeclined')
  if (status === 'cooldown') return t('sections.privateIntroductionStatusCooldown')
  if (status === 'quota_exhausted') return t('sections.privateIntroductionStatusQuotaExhausted')
  if (status === 'login_required') return t('sections.privateIntroductionStatusLoginRequired')
  return t('sections.privateIntroductionStatusAvailable')
})

const privateIntroductionActionLabel = computed(() => {
  const status = privateIntroductionData.value?.status
  if (status === 'accepted') return t('sections.privateIntroductionAccepted')
  if (status === 'declined' || status === 'cooldown') return t('sections.privateIntroductionCooldown')
  if (status === 'quota_exhausted') return t('sections.privateIntroductionQuotaUsed')
  if (status === 'requested') return t('sections.privateIntroductionRequested')
  return t('sections.privateIntroductionUnavailable')
})

const privateIntroductionSteps = computed(() => {
  const status = privateIntroductionData.value?.status
  if (status === 'accepted') {
    return [
      t('sections.privateIntroductionAcceptedStep1'),
      t('sections.privateIntroductionAcceptedStep2'),
      t('sections.privateIntroductionAcceptedStep3'),
    ]
  }

  if (status === 'declined' || status === 'cooldown') {
    return [
      t('sections.privateIntroductionDeclinedStep1'),
      t('sections.privateIntroductionDeclinedStep2'),
      t('sections.privateIntroductionDeclinedStep3'),
    ]
  }

  return [
    t('sections.privateIntroductionStep1'),
    t('sections.privateIntroductionStep2'),
    t('sections.privateIntroductionStep3'),
  ]
})

const privateIntroductionText = computed<PrivateIntroductionPanelText>(() => ({
  title: t('sections.privateIntroduction'),
  subtitle: t('sections.privateIntroductionSubtitle'),
  quota: privateIntroductionData.value
      ? `${t('sections.privateIntroductionQuotaPrefix')}${privateIntroductionData.value.quotaRemaining}/${privateIntroductionData.value.quotaTotal}`
      : '',
  status: privateIntroductionStatusText.value,
  requestButton: t('sections.privateIntroductionRequestButton'),
  disabledButton: privateIntroductionActionLabel.value,
  roomTitle: t('sections.privateIntroductionRoomTitle'),
  roomSubtitle: t('sections.privateIntroductionRoomSubtitle'),
  roomAction: t('sections.privateIntroductionRoomAction'),
  steps: privateIntroductionSteps.value,
}))

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({delta: 1})
    return
  }

  uni.redirectTo({
    url: '/pages/profiles/family/index',
  })
}

function revealStepClass(state: VisitorRevealStep['state']) {
  if (state === 'active') {
    return 'border-semantic-accent-secondary bg-semantic-surface-card shadow-panel'
  }

  return 'border-semantic-border-divider bg-semantic-surface-soft'
}
</script>
