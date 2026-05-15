import type { Database } from '../types/database.js'
import type { LegalDocumentDTO, LegalDocumentSectionDTO } from '../types/legal.js'

export function getLegalDocument(
  data: Database,
  type: 'terms' | 'privacy',
  locale: string,
): LegalDocumentDTO | null {
  const doc = findActiveLegalDocument(data, type, locale)

  if (!doc) return null

  return {
    type: doc.type,
    version: doc.version,
    locale: doc.locale,
    title: doc.title,
    sections: doc.sections
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((section): LegalDocumentSectionDTO => ({
        heading: section.heading,
        clauses: section.clauses,
      })),
    effectiveAt: doc.effectiveAt,
  }
}

export function resolveActiveDocumentVersions(
  data: Database,
  locale: string,
): Array<{ type: 'terms' | 'privacy'; version: string; locale: string }> {
  return (['terms', 'privacy'] as const)
    .map((type) => {
      const doc = findActiveLegalDocument(data, type, locale)
      return doc ? { type, version: doc.version, locale: doc.locale } : null
    })
    .filter((item): item is { type: 'terms' | 'privacy'; version: string; locale: string } => item !== null)
}

export function upsertAgreementAcceptances(
  data: Database,
  userId: string,
  locale: string,
  acceptedAt: string,
): void {
  const activeVersions = resolveActiveDocumentVersions(data, locale)

  activeVersions.forEach((doc) => {
    const existing = data.user_agreement_acceptances.find(
      (item) => item.userId === userId && item.documentType === doc.type,
    )

    if (existing) {
      if (existing.documentVersion === doc.version) return
      existing.documentVersion = doc.version
      existing.locale = doc.locale
      existing.acceptedAt = acceptedAt
    } else {
      data.user_agreement_acceptances.push({
        id: nextAcceptanceId(data),
        userId,
        documentType: doc.type,
        documentVersion: doc.version,
        locale: doc.locale,
        acceptedAt,
        createdAt: acceptedAt,
      })
    }
  })
}

function nextAcceptanceId(data: Database): string {
  return `ua-${String(data.user_agreement_acceptances.length + 1).padStart(3, '0')}`
}

function findActiveLegalDocument(data: Database, type: 'terms' | 'privacy', locale: string) {
  return data.legal_documents.find(
    (item) => item.type === type && item.locale === locale && item.status === 'active',
  ) ?? data.legal_documents.find(
    (item) => item.type === type && item.locale === 'zh' && item.status === 'active',
  ) ?? null
}
