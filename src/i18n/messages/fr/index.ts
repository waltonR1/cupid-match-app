import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/fr/common'
import { homeMessages } from '@/i18n/messages/fr/home'
import { loginMessages } from '@/i18n/messages/fr/login'
import { aboutMessages } from '@/i18n/messages/fr/about'
import { accountMessages } from '@/i18n/messages/fr/account'
import { selfMessages } from '@/i18n/messages/fr/self'
import { eventsMessages } from '@/i18n/messages/fr/events'
import { eventDetailMessages } from '@/i18n/messages/fr/event-detail'
import { favoritesMessages } from '@/i18n/messages/fr/favorites'
import { membershipMessages } from '@/i18n/messages/fr/membership'
import { messagesPageMessages } from '@/i18n/messages/fr/messages-page'
import { myEventsMessages } from '@/i18n/messages/fr/my-events'
import { myProfileMessages } from '@/i18n/messages/fr/my-profile'
import { familyMessages } from '@/i18n/messages/fr/family'
import { familyDetailMessages } from '@/i18n/messages/fr/family-detail'
import { privacyMessages } from '@/i18n/messages/fr/privacy'
import { selfDetailMessages } from '@/i18n/messages/fr/self-detail'
import { registerMessages } from '@/i18n/messages/fr/register'
import { agreementsMessages } from '@/i18n/messages/fr/agreements'
import { contactMessages } from '@/i18n/messages/fr/contact'
import { notFoundMessages } from '@/i18n/messages/fr/not-found'

export const fr: AppMessages['fr'] = {
  common: commonMessages,
  home: homeMessages,
  login: loginMessages,
  about: aboutMessages,
  account: accountMessages,
  self: selfMessages,
  events: eventsMessages,
  eventDetail: eventDetailMessages,
  favorites: favoritesMessages,
  membership: membershipMessages,
  messages: messagesPageMessages,
  myEvents: myEventsMessages,
  myProfile: myProfileMessages,
  family: familyMessages,
  familyDetail: familyDetailMessages,
  privacy: privacyMessages,
  selfDetail: selfDetailMessages,
  register: registerMessages,
  agreements: agreementsMessages,
  contact: contactMessages,
  notFound: notFoundMessages,
}
