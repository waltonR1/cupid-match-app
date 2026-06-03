import type { Database } from '../types/database.js'

type TemplateCode = 'profile_review_approved' | 'identity_verified' | 'event_registration_confirmed' | 'event_reminder' | 'welcome_message'

const noticeTemplates: Record<TemplateCode, Record<'zh' | 'en' | 'fr', string>> = {
    profile_review_approved: {
        zh: '你的资料审核已通过，现状态变更为 open。',
        en: 'Your profile review has been approved and is now open.',
        fr: 'Votre profil a ete approuve et est maintenant ouvert.',
    },
    identity_verified: {
        zh: '你的资料已完成身份认证，可信度已提升。',
        en: 'Your identity has been verified. Your profile credibility has improved.',
        fr: 'Votre identite a ete verifiee. La credibilite de votre profil s est amelioree.',
    },
    event_registration_confirmed: {
        zh: '你的活动报名已确认。请按时参加。',
        en: 'Your event registration has been confirmed. Please attend on time.',
        fr: 'Votre inscription a l evenement a ete confirmee. Merci de vous presenter a l heure.',
    },
    event_reminder: {
        zh: '活动即将开始，请提前 15 分钟到场。',
        en: 'The event is starting soon. Please arrive 15 minutes early.',
        fr: 'L evenement va bientot commencer. Merci d arriver 15 minutes a l avance.',
    },
    welcome_message: {
        zh: '欢迎使用相约巴黎！探索资料、活动与私人介绍服务。',
        en: 'Welcome to Meet in Paris! Explore profiles, events, and private introduction services.',
        fr: 'Bienvenue sur Rencontre a Paris ! Explorez les profils, les evenements et les introductions privees.',
    },
}

export interface InboxDebugThread {
    id: string
    userId: string
    subjectType?: Database['inbox_threads'][number]['subjectType']
    subjectId?: string
    status: string
    messageCount: number
    createdAt: string
    updatedAt: string
}

export function listInboxDebugThreads(data: Database): InboxDebugThread[] {
    return data.inbox_threads
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((t) => ({
            id: t.id,
            userId: t.userId,
            subjectType: t.subjectType,
            subjectId: t.subjectId,
            status: t.status,
            messageCount: data.inbox_messages.filter((m) => m.threadId === t.id).length,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
        }))
}

export function sendInboxDebugNotification(
    data: Database,
    payload: {
        userId?: string
        templateCode?: string
        templateLocale?: 'zh' | 'en' | 'fr'
        body?: string
    },
) {
    const now = new Date().toISOString()
    const threadId = `inbox-${Date.now()}`
    const messageId = `msg-${Date.now()}`
    const locale = payload.templateLocale || 'zh'
    const code = (payload.templateCode || 'welcome_message') as TemplateCode
    const body = payload.body || noticeTemplates[code]?.[locale] || noticeTemplates.welcome_message[locale]

    data.inbox_threads.push({
        id: threadId,
        userId: payload.userId || 'u-001',
        category: 'system' as const,
        status: 'open',
        createdAt: now,
        updatedAt: now,
    })
    data.inbox_messages.push({
        id: messageId,
        threadId,
        senderType: 'system',
        messageType: 'system_notice',
        body,
        templateCode: code,
        templateLocale: locale,
        createdAt: now,
        updatedAt: now,
    })

    return {
        threadId,
        messageId,
        userId: payload.userId || 'u-001',
        templateCode: code,
        templateLocale: locale,
        body,
        createdAt: now,
    }
}
