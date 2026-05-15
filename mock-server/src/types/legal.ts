export interface LegalDocumentClauseDTO {
  number: string
  body: string
}

export interface LegalDocumentSectionDTO {
  heading: string
  clauses: LegalDocumentClauseDTO[]
}

export interface LegalDocumentDTO {
  type: 'terms' | 'privacy'
  version: string
  locale: string
  title: string
  sections: LegalDocumentSectionDTO[]
  effectiveAt: string
}
