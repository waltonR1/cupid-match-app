import {apiRequest} from '@/api/shared/http'
import type {CommonOptionsResponse} from './options.types'

export function getCommonOptions(scope: string, version?: string): Promise<CommonOptionsResponse> {
    return apiRequest<CommonOptionsResponse>('/common/options', {query: {scope, version}})
}