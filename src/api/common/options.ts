import {apiRequest} from '@/api/shared/http'
import type {CommonOptionsResponse} from './options.types'

export function getCommonOptions(version?: string): Promise<CommonOptionsResponse> {
    return apiRequest<CommonOptionsResponse>('/common/options', {query: version ? { version } : {}})
}