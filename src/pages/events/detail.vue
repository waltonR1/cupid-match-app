<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav="common.nav.events"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view v-if="eventDetail.eventCard.value" class="pb-20">
      <EventDetailHero
        :eyebrow="t('hero.eyebrow')"
        :fields="eventDetail.detailFieldLabels.value"
        :event="eventDetail.eventCard.value"
        :register-text="t('actions.register')"
        :waitlist-text="t('actions.joinWaitlist')"
        :full-text="t('actions.full')"
        :register-hint="t('actions.registerHint')"
        :waitlist-hint="t('actions.waitlistHint')"
        :full-hint="t('actions.fullHint')"
        @register="handleRegisterClick"
      />

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <EventDetailAgenda
            :eyebrow="t('sections.agenda')"
            :title="t('sections.agenda')"
            :items="eventDetail.agenda.value"
          />

          <view class="grid gap-6">
            <EventDetailNotes
              :eyebrow="t('sections.notes')"
              :title="t('sections.notes')"
              :items="eventDetail.noteItems.value"
            />

            <EventDetailRelatedProfiles
              :eyebrow="t('sections.relatedProfiles')"
              :title="t('sections.relatedProfiles')"
              :empty-text="t('sections.relatedEmpty')"
              :profiles="eventDetail.relatedProfileItems.value"
              @open="handleProfileOpen"
            />
          </view>
        </view>
      </view>
    </view>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <EmptyStatePanel
        :title="t('sections.notFound')"
        :primary-text="t('actions.backToEvents')"
        variant="compact"
        @primary="handleBackToEvents"
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
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import EventDetailAgenda from '@/components/events/EventDetailAgenda.vue'
import EventDetailHero from '@/components/events/EventDetailHero.vue'
import EventDetailNotes from '@/components/events/EventDetailNotes.vue'
import EventDetailRelatedProfiles from '@/components/events/EventDetailRelatedProfiles.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useEventDetail } from '@/composables/events/use-event-detail'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openRegisterPage, openSelfDetail } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('eventDetail')
const eventId = ref('')
const eventDetail = useEventDetail(eventId)

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    eventId.value = query.id
  }
})

function handleProfileOpen(id: string) {
  openSelfDetail(id)
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleBackToEvents() {
  navigateByNavKey('common.nav.events', navList)
}

function handleRegisterClick() {
  openRegisterPage('event')
}
</script>
