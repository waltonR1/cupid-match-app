import { apiRequest } from '@/api/shared/http'
import type { ContactLeadPayload, ContactLeadResultDTO } from './contact.types'

export function createContactLead(payload: ContactLeadPayload): Promise<ContactLeadResultDTO> {
  return apiRequest<ContactLeadResultDTO>('/contact/leads', {
    method: 'POST',
    data: payload,
  })
}
