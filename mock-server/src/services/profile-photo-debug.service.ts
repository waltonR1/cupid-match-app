import type {Database} from '../types/database.js'

export type ProfilePhotoDebugStatus = Database['profile_photos'][number]['status']

export interface ProfilePhotoDebugItem {
    id: string
    profileId: string
    profileName: string
    url: string
    isPrimary: boolean
    sortOrder: number
    status: ProfilePhotoDebugStatus
    createdAt: string
    updatedAt: string
}

export interface ProfilePhotoDebugResponse {
    items: ProfilePhotoDebugItem[]
}

export function listProfilePhotoDebugItems(data: Database, profileId?: string): ProfilePhotoDebugResponse {
    return {
        items: data.profile_photos
            .filter((item) => !profileId || item.profileId === profileId)
            .sort((left, right) => left.profileId.localeCompare(right.profileId) || left.sortOrder - right.sortOrder)
            .map((item) => toDebugItem(data, item)),
    }
}

export function reviewProfilePhotoDebugItem(
    data: Database,
    photoId: string,
    status: ProfilePhotoDebugStatus,
): { status: 'updated', item: ProfilePhotoDebugItem } | { status: 'not_found' } {
    const photo = data.profile_photos.find((item) => item.id === photoId)
    if (!photo) return {status: 'not_found'}

    photo.status = status
    photo.updatedAt = new Date().toISOString()

    return {status: 'updated', item: toDebugItem(data, photo)}
}

function toDebugItem(data: Database, photo: Database['profile_photos'][number]): ProfilePhotoDebugItem {
    const profile = data.profiles.find((item) => item.id === photo.profileId)

    return {
        id: photo.id,
        profileId: photo.profileId,
        profileName: profile?.id ?? photo.profileId,
        url: photo.url,
        isPrimary: photo.isPrimary,
        sortOrder: photo.sortOrder,
        status: photo.status,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
    }
}
