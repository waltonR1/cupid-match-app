import type {FamilyProfileDetail, SelfProfileDetail} from '@/api/profiles'

export type ProfileAccessPreviewType = 'self' | 'family'
export type ProfileAccessPreviewMode = 'backend' | 'guest' | 'free' | 'member'

export type ProfileAccessPreviewDetail = SelfProfileDetail | FamilyProfileDetail
