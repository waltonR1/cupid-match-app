<template>
  <AppPageLayout>
    <ContactHero
      :cards="contactCards"
      :email="contact.email"
      :wechat="contact.wechat"
      :location="contact.location"
      @primary-action="scrollToContactForm"
    />

    <ContactInfo
      :cards="contactCards"
      :email="contact.email"
      :wechat="contact.wechat"
      :location="contact.location"
    />

    <view id="contact-form" class="bg-semantic-page-default">
      <view class="mx-auto max-w-[1280px] px-8 pb-24">
        <view class="border border-semantic-border-default bg-semantic-surface-panel p-8 shadow-panel lg:p-10">
          <view class="mb-8">
            <view class="mb-4 inline-flex items-center gap-4">
              <view class="h-[1px] w-16 bg-semantic-border-eyebrow" />
              <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-eyebrow">
                {{ t('form.eyebrow') }}
              </text>
            </view>
            <view class="text-[34px] font-semibold text-semantic-text-primary lg:text-[46px]">
              {{ t('form.title') }}
            </view>
            <view class="mt-4 max-w-[720px] text-[16px] leading-8 text-semantic-text-secondary">
              {{ t('form.subtitle') }}
            </view>
          </view>

          <view class="grid gap-5 lg:grid-cols-2">
            <FormSelectField
              v-model="form.inquiryType"
              :label="t('form.fields.inquiryType')"
              :options="inquiryTypeOptions"
            />

            <ContactFormField
              v-model="form.name"
              :label="t('form.fields.name')"
              :placeholder="t('form.placeholders.name')"
              :maxlength="80"
            />

            <FormSelectField
              v-model="form.contactChannel"
              :label="t('form.fields.contactChannel')"
              :options="contactChannelOptions"
            />

            <ContactFormField
              v-model="form.contactValue"
              :label="t('form.fields.contactValue')"
              :placeholder="contactValuePlaceholder"
              :maxlength="191"
            />
          </view>

          <ContactFormField
            v-model="form.message"
            class="mt-5"
            :label="t('form.fields.message')"
            :placeholder="t('form.placeholders.message')"
            :maxlength="1000"
            multiline
          />

          <view class="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <AppButton
              variant="primary"
              size="lg"
              width="cta"
              :disabled="submitting"
              @click="handleSubmit"
            >
              {{ submitting ? t('form.actions.submitting') : t('form.actions.submit') }}
            </AppButton>
            <text class="text-[14px] leading-6 text-semantic-text-secondary">
              {{ t('form.notice') }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <ContactCases :cards="caseCards" />

    <ContactGuide :tags="guideTags" />
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import FormSelectField from '@/components/common/FormSelectField.vue'
import ContactCases from '@/components/contact/ContactCases.vue'
import ContactFormField from '@/components/contact/ContactFormField.vue'
import ContactGuide from '@/components/contact/ContactGuide.vue'
import ContactHero from '@/components/contact/ContactHero.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import { resolvePublicContactConfig } from '@/config/contact'
import { useContactLead } from '@/hooks/contact/use-contact-lead'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { ContactChannel, ContactInquiryType } from '@/api/contact'
import type { DirectoryOption } from '@/types/profiles/directory'

const { t } = usePageI18n('contact')
const contact = resolvePublicContactConfig()
const { form, submitting, resetForm, submitContactLead } = useContactLead()

const inquiryTypes: ContactInquiryType[] = ['platform', 'membership', 'event', 'advisor', 'partnership', 'complaint', 'privacy', 'other']
const contactChannels: ContactChannel[] = ['email', 'phone', 'wechat']

const inquiryTypeOptions = computed<DirectoryOption[]>(() =>
  inquiryTypes.map(value => ({ label: t(`form.inquiryTypes.${value}`), value })),
)
const contactChannelOptions = computed<DirectoryOption[]>(() =>
  contactChannels.map(value => ({ label: t(`form.contactChannels.${value}`), value })),
)
const contactValuePlaceholder = computed(() => t(`form.placeholders.${form.contactChannel}`))

const contactCards = [
  { icon: '\u2709\uFE0F', title: 'info.card1.title', desc: 'info.card1.desc', value: 'info.card1.value' },
  { icon: '\uD83D\uDCAC', title: 'info.card2.title', desc: 'info.card2.desc', value: 'info.card2.value' },
  { icon: '\uD83D\uDCCD', title: 'info.card3.title', desc: 'info.card3.desc', value: 'info.card3.value' },
]

const caseCards = [
  { icon: '\uD83D\uDCD8', title: 'cases.card1.title', desc: 'cases.card1.desc' },
  { icon: '\uD83D\uDC8E', title: 'cases.card2.title', desc: 'cases.card2.desc' },
  { icon: '\uD83C\uDFAD', title: 'cases.card3.title', desc: 'cases.card3.desc' },
  { icon: '\uD83E\uDD1D', title: 'cases.card4.title', desc: 'cases.card4.desc' },
  { icon: '\uD83D\uDC6A', title: 'cases.card5.title', desc: 'cases.card5.desc' },
  { icon: '\uD83C\uDFDB\uFE0F', title: 'cases.card6.title', desc: 'cases.card6.desc' },
]
const guideTags = [
  { title: 'guide.tag1.title', desc: 'guide.tag1.desc' },
  { title: 'guide.tag2.title', desc: 'guide.tag2.desc' },
  { title: 'guide.tag3.title', desc: 'guide.tag3.desc' },
]

function scrollToContactForm() {
  uni.pageScrollTo({
    selector: '#contact-form',
    duration: 260,
  })
}

async function handleSubmit() {
  if (!form.contactValue.trim()) {
    showToast(t('form.validation.contactValue'))
    return
  }
  if (!form.message.trim()) {
    showToast(t('form.validation.message'))
    return
  }
  if (form.contactChannel === 'email' && !form.contactValue.includes('@')) {
    showToast(t('form.validation.email'))
    return
  }

  const result = await submitContactLead()
  if (!result) {
    showToast(t('form.result.failed'))
    return
  }
  resetForm()
  showToast(t('form.result.success'))
}

function showToast(title: string) {
  uni.showToast({
    title,
    icon: 'none',
  })
}
</script>
