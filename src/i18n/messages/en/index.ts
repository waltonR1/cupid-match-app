import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/en/common'
import { homeMessages } from '@/i18n/messages/en/home'
import { loginMessages } from '@/i18n/messages/en/login'
import { aboutMessages } from '@/i18n/messages/en/about'
import { accountCenterMessages } from '@/i18n/messages/en/account-center'
import { selfMessages } from '@/i18n/messages/en/self'
import { eventsMessages } from '@/i18n/messages/en/events'
import { eventDetailMessages } from '@/i18n/messages/en/event-detail'
import { membershipMessages } from '@/i18n/messages/en/membership'
import { familyMessages } from '@/i18n/messages/en/family'
import { familyDetailMessages } from '@/i18n/messages/en/family-detail'
import { selfDetailMessages } from '@/i18n/messages/en/self-detail'
import { registerMessages } from '@/i18n/messages/en/register'
import { agreementsMessages } from '@/i18n/messages/en/agreements'
import { contactMessages } from '@/i18n/messages/en/contact'
import { notFoundMessages } from '@/i18n/messages/en/not-found'
import { messagesMessages } from '@/i18n/messages/en/messages'

export const en: AppMessages['en'] = {
  common: commonMessages,
  home: homeMessages,
  login: loginMessages,
  about: aboutMessages,
  accountCenter: accountCenterMessages,
  self: selfMessages,
  events: eventsMessages,
  eventDetail: eventDetailMessages,
  membership: membershipMessages,
  family: familyMessages,
  familyDetail: familyDetailMessages,
  selfDetail: selfDetailMessages,
  register: registerMessages,
  agreements: agreementsMessages,
  contact: contactMessages,
  notFound: notFoundMessages,
  messages: messagesMessages,
}
