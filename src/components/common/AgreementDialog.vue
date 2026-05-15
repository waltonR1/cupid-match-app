<template>
  <view
    v-if="open"
    class="fixed inset-0 z-[70] flex items-center justify-center bg-[#07131fcc] px-6 py-10"
    @click="$emit('close')"
  >
    <view
      class="relative max-h-[80vh] w-full max-w-[760px] overflow-y-auto border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 text-semantic-text-inverse shadow-hero"
      @click.stop
    >
      <button
        class="absolute right-5 top-5 border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-2 text-[13px] uppercase tracking-[3px] text-semantic-text-hero-label"
        @click="$emit('close')"
      >
        {{ closeText }}
      </button>

      <view class="flex items-start gap-6 pr-24">
        <view>
          <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
            {{ kicker }}
          </view>
          <view class="mt-4 text-[30px] font-semibold leading-[1.25] text-semantic-text-inverse">
            {{ document?.title ?? '' }}
          </view>
        </view>
      </view>

      <view
        v-if="loading"
        class="mt-6 border border-semantic-border-hero bg-component-auth-overlay-background-soft px-5 py-4 text-[15px] leading-8 text-semantic-text-hero-body"
      >
        {{ loadingText }}
      </view>

      <view
        v-else-if="error"
        class="mt-6 border border-semantic-state-danger bg-semantic-state-warning px-5 py-4 text-[15px] leading-8 text-semantic-text-hero-body"
      >
        {{ errorText }}
      </view>

      <view v-else-if="document" class="mt-8 grid gap-8">
        <view
          v-for="(section, index) in document.sections"
          :key="index"
          class="border-t border-semantic-border-divider pt-6 first:border-t-0 first:pt-0"
        >
          <view class="text-[18px] font-semibold leading-8 text-semantic-text-inverse">
            {{ section.heading }}
          </view>
          <view class="mt-4 grid gap-4">
            <view
              v-for="(clause, clauseIndex) in section.clauses"
              :key="clauseIndex"
              class="text-[15px] leading-8 text-semantic-text-hero-body"
            >
              <text v-if="clause.number" class="mr-2 font-semibold text-semantic-text-inverse">
                {{ clause.number }}
              </text>
              <text class="whitespace-pre-line">
                {{ clause.body }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getLegalDocument, type LegalDocumentDTO } from '@/api/legal'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

type AgreementKind = 'terms' | 'privacy'

const props = defineProps<{
  open: boolean
  kind: AgreementKind | null
}>()

defineEmits<{
  close: []
}>()

const { t } = usePageI18n('agreements')

const kicker = computed(() => t('kicker'))
const closeText = computed(() => t('close'))
const loadingText = computed(() => t('loading'))
const errorText = computed(() => t('error'))

const document = ref<LegalDocumentDTO | null>(null)
const loading = ref(false)
const error = ref(false)

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      document.value = null
      error.value = false
      return
    }

    if (!props.kind) return

    const requestedKind = props.kind
    loading.value = true
    error.value = false
    void getLegalDocument(requestedKind).then((doc) => {
      if (!props.open || props.kind !== requestedKind) return
      document.value = doc
      error.value = doc === null
    }).catch(() => {
      if (!props.open || props.kind !== requestedKind) return
      document.value = null
      error.value = true
    }).finally(() => {
      if (!props.open || props.kind !== requestedKind) return
      loading.value = false
    })
  },
)
</script>
