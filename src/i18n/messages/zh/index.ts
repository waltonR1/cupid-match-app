import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/zh/common'
import { homeMessages } from '@/i18n/messages/zh/home'
import { loginMessages } from '@/i18n/messages/zh/login'
import { aboutMessages } from '@/i18n/messages/zh/about'
import { accountCenterMessages } from '@/i18n/messages/zh/account-center'
import { selfMessages } from '@/i18n/messages/zh/self'
import { eventsMessages } from '@/i18n/messages/zh/events'
import { eventDetailMessages } from '@/i18n/messages/zh/event-detail'
import { membershipMessages } from '@/i18n/messages/zh/membership'
import { familyMessages } from '@/i18n/messages/zh/family'
import { familyDetailMessages } from '@/i18n/messages/zh/family-detail'
import { selfDetailMessages } from '@/i18n/messages/zh/self-detail'
import { registerMessages } from '@/i18n/messages/zh/register'
import { agreementsMessages } from '@/i18n/messages/zh/agreements'
import { contactMessages } from '@/i18n/messages/zh/contact'
import { notFoundMessages } from '@/i18n/messages/zh/not-found'

export const zh: AppMessages['zh'] = {
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
}
