<template>
  <AppPageLayout>
    <view class="mx-auto max-w-[1180px] px-5 py-10 lg:px-8">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          Debug Tool
        </view>
        <view class="mt-2 text-[28px] font-semibold leading-tight text-semantic-text-primary">
          Self Detail 访问层级预览
        </view>
        <view class="mt-3 text-[15px] leading-7 text-semantic-text-muted">
          本页只用于调试 guest / free / member 的展示效果。正式 self detail 页面不再依赖全局 preview store。
        </view>

        <view class="mt-6 flex flex-wrap items-end gap-3">
          <view>
            <view class="mb-2 text-[12px] tracking-[1px] text-semantic-text-muted">Profile ID</view>
            <input
              v-model="profileIdInput"
              class="h-[40px] min-w-[180px] border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] text-semantic-text-primary"
            />
          </view>

          <view class="flex flex-wrap gap-2">
            <AppButton
              v-for="item in previewModes"
              :key="item.value"
              :variant="mode === item.value ? 'primary' : 'secondary'"
              size="sm"
              @click="mode = item.value"
            >
              {{ item.label }}
            </AppButton>
          </view>

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

      <view v-if="heroData" class="mt-6 space-y-6">
        <SelfProfileDetailHero :data="heroData" />

        <view class="grid gap-3 md:grid-cols-3">
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
          <SelfProfileDetailSection :columns="2" :items="snapshotFacts" :title="t('sections.profileSnapshot')" />
          <SelfProfileDetailSection
            v-if="showRelationshipSection"
            :columns="2"
            :items="relationshipFacts"
            :title="t('sections.matchIntent')"
          />
          <SelfProfileDetailSection
            v-if="showRegisteredSections"
            :columns="2"
            :items="personalityFacts"
            :title="t('sections.aboutPersonality')"
          />
          <SelfProfileDetailSection
            v-if="showRegisteredSections"
            :columns="1"
            :items="lifestyleFacts"
            :title="t('sections.lifestyle')"
          />
          <SelfProfileDetailSection
            v-if="showPremiumSections"
            :columns="1"
            :items="preferenceFacts"
            :title="t('sections.partnerPreference')"
          />
          <SelfProfileDetailSection
            v-if="showPremiumSections"
            :columns="1"
            :items="valueFacts"
            :title="t('sections.valuesAndPlans')"
          />
          <SelfProfileDetailSection
            v-if="showPremiumSections"
            :columns="1"
            :items="careerFacts"
            :title="t('sections.careerAndCompatibility')"
          />
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
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import SelfProfileDetailHero from '@/components/profiles/detail/SelfProfileDetailHero.vue'
import SelfProfileDetailSection from '@/components/profiles/detail/SelfProfileDetailSection.vue'
import {
  getSelfProfileDetail,
  PROFILE_FIELD_LOGIN_REQUIRED,
  PROFILE_FIELD_MEMBER_ONLY,
  type FormatLocale,
  type SelfProfileDetail,
} from '@/api/profiles'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {toSelfProfileDetailPageData} from '@/mappers/self-profile-detail-page'

type PreviewMode = 'backend' | 'guest' | 'free' | 'member'
type RestrictedSelfProfileDetailField =
  | (typeof SELF_PROFILE_LOGIN_REQUIRED_FIELDS)[number]
  | (typeof SELF_PROFILE_MEMBER_ONLY_FIELDS)[number]
  | (typeof SELF_PROFILE_GUEST_REQUIRED_FIELDS)[number]

const SELF_PROFILE_LOGIN_REQUIRED_FIELDS = [
  'age',
  'bodyType',
  'acceptsLongDistance',
  'values',
  'smoking',
  'drinking',
  'exercise',
  'activityLevel',
  'weekendStyle',
  'pets',
  'personalityTraits',
  'interests',
  'communicationStyle',
  'funFacts',
] as const

const SELF_PROFILE_MEMBER_ONLY_FIELDS = [
  'hasChildren',
  'wantsChildren',
  'residencePlan',
  'relocationWillingness',
  'preferredAgeMin',
  'preferredAgeMax',
  'locationScope',
  'preferredEducation',
  'familyPlan',
  'dealBreakers',
  'highlights',
  'prompts',
  'compatibilityDimensions',
] as const

const SELF_PROFILE_GUEST_REQUIRED_FIELDS = [
  ...SELF_PROFILE_LOGIN_REQUIRED_FIELDS,
  ...SELF_PROFILE_MEMBER_ONLY_FIELDS,
] as const

const previewModes: Array<{ label: string, value: PreviewMode }> = [
  {label: 'Backend', value: 'backend'},
  {label: 'Guest', value: 'guest'},
  {label: 'Free', value: 'free'},
  {label: 'Member', value: 'member'},
]

const {t, locale} = usePageI18n('selfDetail')
const profileIdInput = ref('p-009')
const mode = ref<PreviewMode>('guest')
const profile = ref<SelfProfileDetail | null>(null)
const loading = ref(false)
const showActualLayout = ref(true)

const previewProfile = computed(() => applyPreview(profile.value, mode.value))
const pageData = computed(() => toSelfProfileDetailPageData({
  profile: previewProfile.value,
  locale: locale.value as FormatLocale,
  t,
}))

const accessLevel = computed(() => pageData.value.accessLevel)
const showRelationshipSection = computed(() => !showActualLayout.value || accessLevel.value !== 'visitor')
const showRegisteredSections = computed(() => !showActualLayout.value || accessLevel.value !== 'visitor')
const showPremiumSections = computed(() => !showActualLayout.value || accessLevel.value === 'premium')
const revealSteps = computed(() => pageData.value.revealSteps)
const heroData = computed(() => pageData.value.heroData)
const snapshotFacts = computed(() => pageData.value.snapshotFacts)
const relationshipFacts = computed(() => pageData.value.relationshipFacts)
const personalityFacts = computed(() => pageData.value.personalityFacts)
const preferenceFacts = computed(() => pageData.value.preferenceFacts)
const valueFacts = computed(() => pageData.value.valueFacts)
const lifestyleFacts = computed(() => pageData.value.lifestyleFacts)
const careerFacts = computed(() => pageData.value.careerFacts)

onMounted(() => {
  void load()
})

async function load() {
  loading.value = true
  try {
    profile.value = await getSelfProfileDetail(profileIdInput.value)
  } finally {
    loading.value = false
  }
}

function applyPreview(source: SelfProfileDetail | null, nextMode: PreviewMode): SelfProfileDetail | null {
  if (!source || nextMode === 'backend') return source

  const nextProfile = {...source}

  if (nextMode === 'guest') {
    SELF_PROFILE_GUEST_REQUIRED_FIELDS.forEach((field) => {
      assignRestrictedField(nextProfile, field, PROFILE_FIELD_LOGIN_REQUIRED)
    })
    return nextProfile
  }

  if (nextMode === 'free') {
    SELF_PROFILE_MEMBER_ONLY_FIELDS.forEach((field) => {
      assignRestrictedField(nextProfile, field, PROFILE_FIELD_MEMBER_ONLY)
    })
  }

  return nextProfile
}

function assignRestrictedField(
  nextProfile: SelfProfileDetail,
  field: RestrictedSelfProfileDetailField,
  value: typeof PROFILE_FIELD_LOGIN_REQUIRED | typeof PROFILE_FIELD_MEMBER_ONLY,
) {
  ;(nextProfile as unknown as Record<string, unknown>)[field] = value
}
</script>
