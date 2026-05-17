import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/fr/common'
import { homeMessages } from '@/i18n/messages/fr/home'
import { loginMessages } from '@/i18n/messages/fr/login'
import { aboutMessages } from '@/i18n/messages/fr/about'
import { accountCenterMessages } from '@/i18n/messages/fr/account-center'
import { selfMessages } from '@/i18n/messages/fr/self'
import { eventsMessages } from '@/i18n/messages/fr/events'
import { eventDetailMessages } from '@/i18n/messages/fr/event-detail'
import { membershipMessages } from '@/i18n/messages/fr/membership'
import { familyMessages } from '@/i18n/messages/fr/family'
import { familyDetailMessages } from '@/i18n/messages/fr/family-detail'
import { selfDetailMessages } from '@/i18n/messages/fr/self-detail'
import { registerMessages } from '@/i18n/messages/fr/register'
import { agreementsMessages } from '@/i18n/messages/fr/agreements'
import { contactMessages } from '@/i18n/messages/fr/contact'
import { notFoundMessages } from '@/i18n/messages/fr/not-found'
import { messagesMessages } from '@/i18n/messages/fr/messages'

export const fr: AppMessages['fr'] = {
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
