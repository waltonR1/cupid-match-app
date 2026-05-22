<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1180px] px-5 py-10 lg:px-8">
      <DebugPageHeader
        title="Profile Detail 访问层预览"
        description="用隔离的 debug 接口预览 self / family detail 在 Backend、Guest、Free、Member 下的字段返回、锁定值与页面隐藏规则。"
      >
        <view class="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <view class="grid gap-4 md:grid-cols-[auto_220px_auto] md:items-end">
            <view>
              <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Profile Type</view>
              <view class="flex flex-wrap gap-2">
                <AppButton
                  v-for="item in profileTypes"
                  :key="item.value"
                  :variant="profileType === item.value ? 'primary' : 'secondary'"
                  size="sm"
                  @click="changeProfileType(item.value)"
                >
                  {{ item.label }}
                </AppButton>
              </view>
            </view>

            <view>
              <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Profile ID</view>
              <input
                v-model="profileIdInput"
                class="box-border min-h-[44px] w-full min-w-[220px] border border-semantic-border-default bg-semantic-surface-soft px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
              />
            </view>

            <view>
              <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Access Mode</view>
              <view class="flex flex-wrap gap-2">
                <AppButton
                  v-for="item in previewModes"
                  :key="item.value"
                  :variant="mode === item.value ? 'primary' : 'secondary'"
                  size="sm"
                  @click="changeMode(item.value)"
                >
                  {{ item.label }}
                </AppButton>
              </view>
            </view>
          </view>

          <view class="flex flex-wrap gap-2">
            <AppButton variant="secondary" size="sm" @click="load">
              读取资料
            </AppButton>

            <AppButton
              :variant="showActualLayout ? 'primary' : 'secondary'"
              size="sm"
              @click="showActualLayout = !showActualLayout"
            >
              {{ showActualLayout ? '真实页面隐藏规则' : '显示全部字段状态' }}
            </AppButton>
          </view>
        </view>
      </DebugPageHeader>

      <view class="mt-6 grid gap-3 md:grid-cols-3">
        <view
          v-for="item in previewNotes"
          :key="item.title"
          class="border border-semantic-border-default bg-semantic-surface-card px-5 py-4"
        >
          <view class="text-[12px] uppercase tracking-[2.4px] text-semantic-text-eyebrow">
            {{ item.title }}
          </view>
          <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">
            {{ item.description }}
          </view>
        </view>
      </view>

      <view v-if="heroData" class="mt-6 space-y-6">
        <ProfileDetailHero
          :data="heroData"
          :login-locked-text="pageT('sections.loginLocked')"
          :member-locked-text="pageT('sections.memberLocked')"
        />

        <view v-if="accessLevel === 'visitor'" class="grid gap-3 md:grid-cols-3">
          <view
            v-for="item in revealSteps"
            :key="item.title"
            class="border border-semantic-border-default bg-semantic-surface-card px-5 py-4"
          >
            <view class="text-[12px] uppercase tracking-[2.4px] text-semantic-text-eyebrow">
              {{ item.title }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-muted">
              {{ item.subtitle }}
            </view>
          </view>
        </view>

        <view class="grid gap-6 xl:grid-cols-2">
          <ProfileDetailSection :columns="2" :items="snapshotFacts" :title="pageT('sections.profileSnapshot')" />

          <template v-if="profileType === 'self'">
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="2"
              :items="selfPageData.relationshipFacts"
              :title="pageT('sections.matchIntent')"
            />
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="2"
              :items="selfPageData.personalityFacts"
              :title="pageT('sections.aboutPersonality')"
            />
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="1"
              :items="selfPageData.lifestyleFacts"
              :title="pageT('sections.lifestyle')"
            />
            <ProfileDetailSection
              v-if="showPremiumSections"
              :columns="1"
              :items="selfPageData.preferenceFacts"
              :title="pageT('sections.partnerPreference')"
            />
            <ProfileDetailSection
              v-if="showPremiumSections"
              :columns="1"
              :items="selfPageData.valueFacts"
              :title="pageT('sections.valuesAndPlans')"
            />
          </template>

          <template v-else>
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="2"
              :items="familyPageData.familyReviewFacts"
              :title="pageT('sections.familyReview')"
            />
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="2"
              :items="familyPageData.relationshipFacts"
              :title="pageT('sections.marriagePlan')"
            />
            <ProfileDetailSection
              v-if="showRegisteredSections"
              :columns="1"
              :items="familyPageData.lifestyleFacts"
              :title="pageT('sections.lifestyle')"
            />
            <ProfileDetailSection
              v-if="showPremiumSections"
              :columns="1"
              :items="familyPageData.preferenceFacts"
              :title="pageT('sections.partnerPreference')"
            />
            <ProfileDetailSection
              v-if="showPremiumSections"
              :columns="1"
              :items="familyPageData.valueFacts"
              :title="pageT('sections.familyValues')"
            />
          </template>
        </view>
      </view>

      <view
        v-else-if="!loading"
        class="mt-6 border border-semantic-border-default bg-semantic-surface-card px-6 py-8 text-center text-semantic-text-muted shadow-panel"
      >
        暂无可预览资料。
      </view>
    </view>
  </AppPageLayout>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import DebugPageHeader from '@/components/debug/DebugPageHeader.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import ProfileDetailHero from '@/components/profiles/detail/ProfileDetailHero.vue'
import ProfileDetailSection from '@/components/profiles/detail/ProfileDetailSection.vue'
import {
  getProfileAccessPreview,
  type ProfileAccessPreviewMode,
  type ProfileAccessPreviewType,
} from '@/api/debug'
import type {FamilyProfileDetail, FormatLocale, SelfProfileDetail} from '@/api/profiles'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {toFamilyProfileDetailPageData} from '@/mappers/family-profile-detail-page'
import {toSelfProfileDetailPageData} from '@/mappers/self-profile-detail-page'

const profileTypes: Array<{ label: string, value: ProfileAccessPreviewType }> = [
  {label: 'Self', value: 'self'},
  {label: 'Family', value: 'family'},
]

const previewModes: Array<{ label: string, value: ProfileAccessPreviewMode }> = [
  {label: 'Backend', value: 'backend'},
  {label: 'Guest', value: 'guest'},
  {label: 'Free', value: 'free'},
  {label: 'Member', value: 'member'},
]

const selfI18n = usePageI18n('selfDetail')
const familyI18n = usePageI18n('familyDetail')
const profileType = ref<ProfileAccessPreviewType>('self')
const profileIdInput = ref('p-009')
const mode = ref<ProfileAccessPreviewMode>('guest')
const selfProfile = ref<SelfProfileDetail | null>(null)
const familyProfile = ref<FamilyProfileDetail | null>(null)
const loading = ref(false)
const showActualLayout = ref(true)

const activeLocale = computed(() => selfI18n.locale.value as FormatLocale)
const selfPageData = computed(() => toSelfProfileDetailPageData({
  profile: selfProfile.value,
  locale: activeLocale.value,
  t: selfI18n.t,
}))
const familyPageData = computed(() => toFamilyProfileDetailPageData({
  profile: familyProfile.value,
  locale: activeLocale.value,
  t: familyI18n.t,
}))

const currentPageData = computed(() => profileType.value === 'self' ? selfPageData.value : familyPageData.value)
const accessLevel = computed(() => currentPageData.value.accessLevel)
const heroData = computed(() => currentPageData.value.heroData)
const snapshotFacts = computed(() => currentPageData.value.snapshotFacts)
const showRegisteredSections = computed(() => !showActualLayout.value || accessLevel.value !== 'visitor')
const showPremiumSections = computed(() => !showActualLayout.value || accessLevel.value === 'premium')
const previewNotes = computed(() => [
  {
    title: 'Backend',
    description: '查看后端字段经过访问层处理后的返回形态。',
  },
  {
    title: 'Layout',
    description: showActualLayout.value ? '当前按正式页面规则隐藏未开放 section。' : '当前显示全部 section，便于核对字段锁定状态。',
  },
  {
    title: 'Scope',
    description: '仅用于访问层预览，不改变正式用户状态或数据库数据。',
  },
])
const revealSteps = computed(() => [
  {
    title: pageT('sections.revealVisitorTitle'),
    subtitle: pageT('sections.revealVisitorSubtitle'),
  },
  {
    title: pageT('sections.revealRegisteredTitle'),
    subtitle: pageT('sections.revealRegisteredSubtitle'),
  },
  {
    title: pageT('sections.revealPremiumTitle'),
    subtitle: pageT('sections.revealPremiumSubtitle'),
  },
])

onMounted(() => {
  void load()
})

function pageT(key: string) {
  return profileType.value === 'self' ? selfI18n.t(key) : familyI18n.t(key)
}

function changeProfileType(nextType: ProfileAccessPreviewType) {
  profileType.value = nextType
  profileIdInput.value = nextType === 'self' ? 'p-009' : 'p-001'
  selfProfile.value = null
  familyProfile.value = null
  void load()
}

function changeMode(nextMode: ProfileAccessPreviewMode) {
  mode.value = nextMode
  void load()
}

async function load() {
  loading.value = true
  try {
    const profile = await getProfileAccessPreview({
      profileType: profileType.value,
      profileId: profileIdInput.value,
      mode: mode.value,
    })

    if (profileType.value === 'self') {
      selfProfile.value = profile as SelfProfileDetail
      return
    }

    familyProfile.value = profile as FamilyProfileDetail
  } finally {
    loading.value = false
  }
}
</script>
