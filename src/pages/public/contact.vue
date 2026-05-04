<template>
  <AppPageLayout>
    <!-- 联系页 Hero 区 -->
    <ContactHero
        :cards="contactCards"
        :email="email"
        @primary-action="openRegisterPage"
    />

    <!-- 联系方式信息区 -->
    <ContactInfo
        :cards="contactCards"
        :email="email"
    />

    <!-- 联系场景卡片区 -->
    <ContactCases :cards="caseCards"/>

    <!-- 联系指引标签区 -->
    <ContactGuide :tags="guideTags"/>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import ContactCases from '@/components/contact/ContactCases.vue'
import ContactGuide from '@/components/contact/ContactGuide.vue'
import ContactHero from '@/components/contact/ContactHero.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import type {
  ContactCardItem,
  ContactCaseItem,
  ContactGuideTag,
} from '@/types/contact/view'
import {openRegisterPage} from '@/utils/navigation'

/** 联系邮箱 */
const email = 'contact@rencontreaparis.com'

/** 联系方式卡片数据 */
const contactCards: ContactCardItem[] = [
  {icon: '\u2709\uFE0F', title: 'info.card1.title', desc: 'info.card1.desc', value: 'info.card1.value'},
  {icon: '\uD83D\uDCAC', title: 'info.card2.title', desc: 'info.card2.desc', value: 'info.card2.value'},
  {icon: '\uD83D\uDCCD', title: 'info.card3.title', desc: 'info.card3.desc', value: 'info.card3.value'},
]

/** 联系场景卡片数据 */
const caseCards: ContactCaseItem[] = [
  {icon: '\uD83D\uDCD8', title: 'cases.card1.title', desc: 'cases.card1.desc'},
  {icon: '\uD83D\uDC8E', title: 'cases.card2.title', desc: 'cases.card2.desc'},
  {icon: '\uD83C\uDFAD', title: 'cases.card3.title', desc: 'cases.card3.desc'},
  {icon: '\uD83E\uDD1D', title: 'cases.card4.title', desc: 'cases.card4.desc'},
  {icon: '\uD83D\uDC6A', title: 'cases.card5.title', desc: 'cases.card5.desc'},
  {icon: '\uD83C\uDFDB\uFE0F', title: 'cases.card6.title', desc: 'cases.card6.desc'},
]

/** 联系指引标签数据 */
const guideTags: ContactGuideTag[] = [
  {title: 'guide.tag1.title', desc: 'guide.tag1.desc'},
  {title: 'guide.tag2.title', desc: 'guide.tag2.desc'},
  {title: 'guide.tag3.title', desc: 'guide.tag3.desc'},
]
</script>