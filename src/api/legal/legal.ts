import { isApiStatusError, requestJson } from '@/api/shared/http'
import type { LegalDocumentDTO } from './legal.types'

export async function getLegalDocument(type: 'terms' | 'privacy'): Promise<LegalDocumentDTO | null> {
  try {
    return await requestJson<LegalDocumentDTO>(`/legal/documents/${type}`)
  } catch (error) {
    if (isApiStatusError(error, 404)) return null
    throw error
  }
}
