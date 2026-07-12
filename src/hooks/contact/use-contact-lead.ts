import { computed, reactive } from 'vue'
import { createContactLead } from '@/api/contact'
import type { ContactChannel, ContactInquiryType, ContactLeadPayload } from '@/api/contact'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export interface ContactLeadFormState {
  inquiryType: ContactInquiryType
  name: string
  contactChannel: ContactChannel
  contactValue: string
  message: string
}

export function useContactLead() {
  const request = useLatestRequest()
  const form = reactive<ContactLeadFormState>({
    inquiryType: 'membership',
    name: '',
    contactChannel: 'email',
    contactValue: '',
    message: '',
  })

  const submitting = computed(() => request.loading.value)

  function resetForm() {
    form.inquiryType = 'membership'
    form.name = ''
    form.contactChannel = 'email'
    form.contactValue = ''
    form.message = ''
  }

  async function submitContactLead() {
    const payload: ContactLeadPayload = {
      inquiryType: form.inquiryType,
      name: form.name.trim() || undefined,
      contactChannel: form.contactChannel,
      contactValue: form.contactValue.trim(),
      message: form.message.trim(),
    }

    return request.run(() => createContactLead(payload))
  }

  return {
    form,
    submitting,
    error: request.error,
    resetForm,
    submitContactLead,
  }
}
