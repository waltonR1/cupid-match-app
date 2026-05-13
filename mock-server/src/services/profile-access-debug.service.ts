import type {ApiLocale} from '../types/common.js'
import type {Database, MembershipLevel} from '../types/database.js'
import type {FamilyProfileDetailDTO, SelfProfileDetailDTO} from '../types/profile.js'
import {buildProfileView, resolveUserContext, toFamilyProfileDetail, toSelfProfileDetail, type UserContext} from './profile.service.js'

export type ProfileAccessDebugType = 'self' | 'family'
export type ProfileAccessDebugMode = 'backend' | 'guest' | 'free' | 'member'

export type ProfileAccessDebugDetailDTO = SelfProfileDetailDTO | FamilyProfileDetailDTO

export function getProfileAccessDebugPreview(
    locale: ApiLocale,
    data: Database,
    profileType: ProfileAccessDebugType,
    profileId: string,
    mode: ProfileAccessDebugMode,
    userId?: string,
): ProfileAccessDebugDetailDTO | null {
    const profile = data.profiles.find((item) => item.id === profileId)
    if (!profile) return null
    if (profileType === 'family' && !profile.familyVisible) return null

    const userContext = resolvePreviewUserContext(data, profileId, mode, userId)
    const profileView = buildProfileView(data, profile)
    const visibilitySettings = data.profile_visibility_settings.filter((item) => item.profileId === profile.id)

    if (profileType === 'family') {
        return toFamilyProfileDetail(locale, profileView, userContext, data.private_introduction_requests, visibilitySettings)
    }

    return toSelfProfileDetail(locale, profileView, userContext, data.private_introduction_requests, visibilitySettings)
}

function resolvePreviewUserContext(
    data: Database,
    profileId: string,
    mode: ProfileAccessDebugMode,
    userId?: string,
): UserContext | null {
    if (mode === 'guest') return null

    if (mode === 'backend') {
        return userId ? resolveUserContext(data, userId) : null
    }

    return createPreviewUserContext(mode === 'free' ? 'free' : 'silver')
}

function createPreviewUserContext(membership: MembershipLevel): UserContext {
    return {
        userId: `debug-${membership}`,
        membership,
    }
}
