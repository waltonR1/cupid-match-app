export type ContactInquiryType =
  | 'platform'
  | 'membership'
  | 'event'
  | 'advisor'
  | 'partnership'
  | 'complaint'
  | 'privacy'
  | 'other'

export type ContactChannel = 'email' | 'phone' | 'wechat'

export interface ContactLeadPayload {
  inquiryType: ContactInquiryType
  name?: string
  contactChannel: ContactChannel
  contactValue: string
  message: string
}

export interface ContactLeadResultDTO {
  id: string
  status: 'new'
}
