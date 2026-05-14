<template>
  <AppPageLayout>
    <view v-if="pageData.hero && pageData.registration" class="pb-20">
      <EventDetailHero
        :eyebrow="t('hero.eyebrow')"
        :fields="pageData.fieldLabels"
        :event="pageData.hero"
        :registration="pageData.registration"
        @action="handleRegistrationAction"
      />

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <EventDetailAgenda
              :eyebrow="t('sections.agenda')"
              :title="t('sections.agenda')"
              :items="pageData.agendaItems"
            />

          <view class="grid gap-6">
            <EventDetailNotes
              :eyebrow="t('sections.notes')"
              :title="t('sections.notes')"
              :items="pageData.noteItems"
            />
          </view>
        </view>
      </view>
    </view>

    <view v-else class="mx-auto max-w-[960px] px-8 py-24">
      <EmptyStatePanel
        :title="t('sections.notFound')"
        :primary-text="t('actions.backToEvents')"
        @primary="openEventsPage"
      />
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import EventDetailAgenda from '@/components/events/EventDetailAgenda.vue'
import EventDetailHero from '@/components/events/EventDetailHero.vue'
import EventDetailNotes from '@/components/events/EventDetailNotes.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useEventDetail } from '@/hooks/events'
import { openEventsPage, openLoginPage, openMembershipPage } from '@/utils/navigation'

const { t, locale } = usePageI18n('eventDetail')
const eventId = ref('')
const { pageData, register, cancelRegistration } = useEventDetail(eventId, t, locale)

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    eventId.value = query.id
  }
})

function handleRegistrationAction(key: string) {
  switch (key) {
    case 'login':
      openLoginPage()
      return
    case 'membership':
      openMembershipPage()
      return
    case 'cancel':
      void cancelRegistration()
      return
    case 'register':
      void register()
      return
    default:
      return
  }
}
</script>
