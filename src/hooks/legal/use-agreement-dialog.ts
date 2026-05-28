import { computed, ref } from 'vue'
import { getLegalDocument, type LegalDocumentDTO, type LegalDocumentType } from '@/api/legal'
import type { AgreementDocumentViewModel } from '@/types/legal/view'

export function useAgreementDialog() {
  const kind = ref<LegalDocumentType | null>(null)
  const document = ref<AgreementDocumentViewModel | null>(null)
  const loading = ref(false)
  const error = ref(false)
  let requestId = 0

  const open = computed(() => kind.value !== null)

  async function openAgreementDialog(nextKind: LegalDocumentType) {
    const currentRequestId = ++requestId
    kind.value = nextKind
    document.value = null
    loading.value = true
    error.value = false

    try {
      const nextDocument = await getLegalDocument(nextKind)
      if (currentRequestId !== requestId || kind.value !== nextKind) return

      document.value = nextDocument ? toAgreementDocumentViewModel(nextDocument) : null
      error.value = nextDocument === null
    } catch {
      if (currentRequestId !== requestId || kind.value !== nextKind) return

      document.value = null
      error.value = true
    } finally {
      if (currentRequestId !== requestId || kind.value !== nextKind) return

      loading.value = false
    }
  }

  function closeAgreementDialog() {
    requestId += 1
    kind.value = null
    document.value = null
    loading.value = false
    error.value = false
  }

  return {
    agreementDialogOpen: open,
    agreementDocument: document,
    agreementLoading: loading,
    agreementError: error,
    openAgreementDialog,
    closeAgreementDialog,
  }
}

function toAgreementDocumentViewModel(document: LegalDocumentDTO): AgreementDocumentViewModel {
  return {
    title: document.title,
    sections: document.sections.map((section) => ({
      heading: section.heading,
      clauses: section.clauses.map((clause) => ({
        number: clause.number,
        body: clause.body,
      })),
    })),
  }
}
