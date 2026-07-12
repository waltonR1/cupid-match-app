import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import type { ContactLeadRecord } from '../types/database.js'

const inquiryTypes = new Set(['platform', 'membership', 'event', 'advisor', 'partnership', 'complaint', 'privacy', 'other'])
const contactChannels = new Set(['email', 'phone', 'wechat'])

export async function registerContactRoutes(app: FastifyInstance): Promise<void> {
  app.post('/contact/leads', async (request, reply) => {
    const payload = request.body as Record<string, unknown>
    const inquiryType = normalizeEnum(payload.inquiryType, inquiryTypes, 'platform') as ContactLeadRecord['inquiryType']
    const contactChannel = normalizeEnum(payload.contactChannel, contactChannels, '') as ContactLeadRecord['contactChannel'] | ''
    const contactValue = normalizeText(payload.contactValue)
    const message = normalizeText(payload.message)
    const name = normalizeText(payload.name)

    if (!contactChannel || !contactValue || !message) {
      return reply.code(400).send({ error: 'Missing required contact lead fields' })
    }
    if (contactChannel === 'email' && !contactValue.includes('@')) {
      return reply.code(400).send({ error: 'Invalid email' })
    }

    const now = new Date().toISOString()
    const record: ContactLeadRecord = {
      id: `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      source: 'contact_page',
      inquiryType,
      ...(name ? { name } : {}),
      contactChannel,
      contactValue,
      message,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    }

    const db = getDb()
    db.data.contact_leads.unshift(record)
    await db.write()

    return {
      id: record.id,
      status: record.status,
    }
  })
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeEnum(value: unknown, allowed: Set<string>, fallback: string) {
  const text = normalizeText(value)
  return allowed.has(text) ? text : fallback
}
