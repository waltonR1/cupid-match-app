import type { Database } from '../types/database.js'
import type { LegalDocumentDTO, LegalDocumentSectionDTO } from '../types/legal.js'

export function getLegalDocument(
  data: Database,
  type: 'terms' | 'privacy',
  locale: string,
): LegalDocumentDTO | null {
  const doc = findActiveLegalDocument(data, type)
  if (!doc) return null

  const content = findContent(data, doc.id, locale)
  if (!content) return null

  return {
    type: doc.type,
    version: doc.version,
    locale: content.locale,
    title: content.title,
    sections: content.sections
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
): Array<{ type: 'terms' | 'privacy'; version: string }> {
  return (['terms', 'privacy'] as const)
    .map((type) => {
      const doc = findActiveLegalDocument(data, type)
      return doc ? { type, version: doc.version } : null
    })
    .filter((item): item is { type: 'terms' | 'privacy'; version: string } => item !== null)
}

export function upsertAgreementAcceptances(
  data: Database,
  userId: string,
  acceptedAt: string,
): void {
  const activeVersions = resolveActiveDocumentVersions(data)

  activeVersions.forEach((doc) => {
    const existing = data.user_agreement_acceptances.find(
      (item) => item.userId === userId && item.documentType === doc.type,
    )

    if (existing) {
      if (existing.documentVersion === doc.version) return
      existing.documentVersion = doc.version
      existing.acceptedAt = acceptedAt
    } else {
      data.user_agreement_acceptances.push({
        id: nextAcceptanceId(data),
        userId,
        documentType: doc.type,
        documentVersion: doc.version,
        acceptedAt,
        createdAt: acceptedAt,
      })
    }
  })
}

function nextAcceptanceId(data: Database): string {
  return `ua-${String(data.user_agreement_acceptances.length + 1).padStart(3, '0')}`
}

function findActiveLegalDocument(data: Database, type: 'terms' | 'privacy') {
  return data.legal_documents.find(
    (item) => item.type === type && item.status === 'active',
  ) ?? null
}

function findContent(data: Database, documentId: string, locale: string) {
  return (
    data.legal_document_contents.find(
      (item) => item.documentId === documentId && item.locale === locale,
    ) ??
    data.legal_document_contents.find(
      (item) => item.documentId === documentId && item.locale === 'zh',
    ) ??
    data.legal_document_contents.find(
      (item) => item.documentId === documentId,
    ) ?? null
  )
}
