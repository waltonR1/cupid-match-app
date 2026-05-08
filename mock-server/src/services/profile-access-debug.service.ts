import type {ApiLocale} from '../types/common.js'
import type {Database, MembershipLevel} from '../types/database.js'
import type {FamilyProfileDetailDTO, SelfProfileDetailDTO} from '../types/profile.js'
import {resolveUserContext, toFamilyProfileDetail, toSelfProfileDetail, type UserContext} from './profile.service.js'
import {withDisplayName} from '../utils/localized.js'

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

    if (profileType === 'family') {
        return toFamilyProfileDetail(locale, withDisplayName(profile), userContext, data.private_introduction_requests)
    }

    return toSelfProfileDetail(locale, withDisplayName(profile), userContext, data.private_introduction_requests)
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
