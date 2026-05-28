export interface AgreementDocumentClauseViewModel {
  number: string
  body: string
}

export interface AgreementDocumentSectionViewModel {
  heading: string
  clauses: AgreementDocumentClauseViewModel[]
}

export interface AgreementDocumentViewModel {
  title: string
  sections: AgreementDocumentSectionViewModel[]
}
