export type LegalDocumentType = 'terms' | 'privacy'

export interface LegalDocumentClauseDTO {
  number: string
  body: string
}

export interface LegalDocumentSectionDTO {
  heading: string
  clauses: LegalDocumentClauseDTO[]
}

export interface LegalDocumentDTO {
  type: LegalDocumentType
  version: string
  locale: string
  title: string
  sections: LegalDocumentSectionDTO[]
  effectiveAt: string
}
