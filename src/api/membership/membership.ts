import {apiRequest} from '@/api/shared/http'
import type {MembershipCatalogDTO} from './membership.types'

export function getMembershipCatalog(): Promise<MembershipCatalogDTO> {
  return apiRequest<MembershipCatalogDTO>('/membership/catalog')
}
