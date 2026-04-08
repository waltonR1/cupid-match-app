<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
      :nav-list="navListWithContact"
      active-nav="common.nav.contact"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <ContactHero
      :cards="contactCards"
      :email="email"
      @primary-action="handlePrimaryAction"
    />
    <ContactInfo
      :cards="contactCards"
      :email="email"
    />
    <ContactCases :cards="caseCards" />
    <ContactGuide :tags="guideTags" />

    <AppFooter
      :nav-list="navListWithContact"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import ContactCases from '@/components/contact/ContactCases.vue'
import ContactGuide from '@/components/contact/ContactGuide.vue'
import ContactHero from '@/components/contact/ContactHero.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import type {
  ContactCardItem,
  ContactCaseItem,
  ContactGuideTag,
} from '@/components/contact/contact.types'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navListWithContact = NAV_LIST
const email = 'contact@rencontreaparis.com'

const contactCards: ContactCardItem[] = [
  { icon: '\u2709\uFE0F', title: 'info.card1.title', desc: 'info.card1.desc', value: 'info.card1.value' },
  { icon: '\uD83D\uDCAC', title: 'info.card2.title', desc: 'info.card2.desc', value: 'info.card2.value' },
  { icon: '\uD83D\uDCCD', title: 'info.card3.title', desc: 'info.card3.desc', value: 'info.card3.value' },
]

const caseCards: ContactCaseItem[] = [
  { icon: '\uD83D\uDCD8', title: 'cases.card1.title', desc: 'cases.card1.desc' },
  { icon: '\uD83D\uDC8E', title: 'cases.card2.title', desc: 'cases.card2.desc' },
  { icon: '\uD83C\uDFAD', title: 'cases.card3.title', desc: 'cases.card3.desc' },
  { icon: '\uD83E\uDD1D', title: 'cases.card4.title', desc: 'cases.card4.desc' },
  { icon: '\uD83D\uDC6A', title: 'cases.card5.title', desc: 'cases.card5.desc' },
  { icon: '\uD83C\uDFDB\uFE0F', title: 'cases.card6.title', desc: 'cases.card6.desc' },
]

const guideTags: ContactGuideTag[] = [
  { title: 'guide.tag1.title', desc: 'guide.tag1.desc' },
  { title: 'guide.tag2.title', desc: 'guide.tag2.desc' },
  { title: 'guide.tag3.title', desc: 'guide.tag3.desc' },
]

function handleNavClick(key: string) {
  navigateByNavKey(key, navListWithContact)
}

function handlePrimaryAction() {
  openRegisterPage('contact')
}

function handleRegisterClick() {
  openRegisterPage('contact')
}
</script>
