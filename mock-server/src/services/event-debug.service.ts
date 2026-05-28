import type { Database } from '../types/database.js'

export interface EventDebugItem {
    id: string
    slug: string
    status: string
    visibility: string
    title: string
    city: string
    date: string
    capacity: number
    confirmedCount: number
    createdAt: string
}

export function listEventDebugItems(data: Database): EventDebugItem[] {
    return [...data.events]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((e) => ({
            id: e.id,
            slug: e.slug,
            status: e.status,
            visibility: e.visibility,
            title: typeof e.title === 'object' && e.title ? (e.title as Record<string, { value: string }>).zh?.value || e.slug : e.slug,
            city: typeof e.city === 'object' && e.city ? (e.city as Record<string, { value: string }>).zh?.value || '' : '',
            date: e.date,
            capacity: e.capacity,
            confirmedCount: data.event_registrations.filter((r) => r.eventId === e.id && r.status === 'confirmed').length,
            createdAt: e.createdAt,
        }))
}

export function updateEventDebugStatus(
    data: Database,
    eventId: string,
    status: string,
): { status: 'updated'; item: EventDebugItem } | { status: 'not_found' } | { status: 'invalid_status' } {
    const event = data.events.find((e) => e.id === eventId)
    if (!event) return { status: 'not_found' }

    const validStatuses = ['draft', 'open', 'waitlist', 'closed', 'completed']
    if (!validStatuses.includes(status)) return { status: 'invalid_status' }

    event.status = status as never
    event.updatedAt = new Date().toISOString()

    const title = typeof event.title === 'object' && event.title ? (event.title as Record<string, { value: string }>).zh?.value || event.slug : event.slug
    const city = typeof event.city === 'object' && event.city ? (event.city as Record<string, { value: string }>).zh?.value || '' : ''

    return {
        status: 'updated',
        item: {
            id: event.id,
            slug: event.slug,
            status: event.status,
            visibility: event.visibility,
            title,
            city,
            date: event.date,
            capacity: event.capacity,
            confirmedCount: data.event_registrations.filter((r) => r.eventId === event.id && r.status === 'confirmed').length,
            createdAt: event.createdAt,
        },
    }
}
