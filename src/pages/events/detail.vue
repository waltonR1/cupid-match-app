<template>
  <AppPageLayout>
    <view v-if="pageData.eventCard" class="pb-20">
      <EventDetailHero
        :eyebrow="t('hero.eyebrow')"
        :fields="pageData.detailFieldLabels"
        :event="pageData.eventCard"
        :action="pageData.eventAction"
        @register="openRegisterPage"
      />

      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <EventDetailAgenda
              :eyebrow="t('sections.agenda')"
              :title="t('sections.agenda')"
              :items="pageData.agenda"
            />

          <view class="grid gap-6">
            <EventDetailNotes
              :eyebrow="t('sections.notes')"
              :title="t('sections.notes')"
              :items="pageData.noteItems"
            />

            <EventDetailRelatedProfiles
              :eyebrow="t('sections.relatedProfiles')"
              :title="t('sections.relatedProfiles')"
              :empty-text="t('sections.relatedEmpty')"
              :profiles="pageData.relatedProfileItems"
              @open="openSelfDetail"
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
import EventDetailRelatedProfiles from '@/components/events/EventDetailRelatedProfiles.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useEventDetail } from '@/hooks/events'
import { openEventsPage, openRegisterPage, openSelfDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('eventDetail')
const eventId = ref('')
const { pageData } = useEventDetail(eventId, t, locale)

onLoad((query) => {
  if (query && typeof query.id === 'string') {
    eventId.value = query.id
  }
})
</script>
