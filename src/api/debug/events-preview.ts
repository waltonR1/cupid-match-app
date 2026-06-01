import {isApiStatusError, apiRequest} from '@/api/shared/http'
import type {EventPreviewActionResponse, EventPreviewDetail, EventPreviewQuery} from './events-preview.types'

export async function getEventPreview(params: EventPreviewQuery): Promise<EventPreviewDetail | null> {
  try {
    return await apiRequest<EventPreviewDetail>(`/debug/events-preview/${params.eventId}`, {
      query: {mode: params.mode},
    })
  } catch (error) {
    if (isApiStatusError(error, 404)) return null
    throw error
  }
}

export async function registerEventPreview(params: EventPreviewQuery): Promise<EventPreviewActionResponse> {
  try {
    return await apiRequest<EventPreviewActionResponse>(`/debug/events-preview/${params.eventId}/register`, {
      method: 'POST',
      query: {mode: params.mode},
      data: {},
    })
  } catch (error) {
    if (isApiStatusError(error, 401) || isApiStatusError(error, 409)) {
      const payload = error && typeof error === 'object' && 'payload' in error ? error.payload : null
      if (payload && typeof payload === 'object') {
        return payload as EventPreviewActionResponse
      }
    }
    throw error
  }
}

export async function cancelEventPreview(params: EventPreviewQuery): Promise<EventPreviewActionResponse> {
  try {
    return await apiRequest<EventPreviewActionResponse>(`/debug/events-preview/${params.eventId}/cancel`, {
      method: 'POST',
      query: {mode: params.mode},
      data: {},
    })
  } catch (error) {
    if (isApiStatusError(error, 401) || isApiStatusError(error, 409)) {
      const payload = error && typeof error === 'object' && 'payload' in error ? error.payload : null
      if (payload && typeof payload === 'object') {
        return payload as EventPreviewActionResponse
      }
    }
    throw error
  }
}
