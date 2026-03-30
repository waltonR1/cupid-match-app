export interface NavItem {
  key: string
  path?: string
}

export const NAV_LIST: NavItem[] = [
  { key: 'common.nav.about', path: '/pages/about/index' },
  { key: 'common.nav.profiles', path: '/pages/profiles/index' },
  { key: 'common.nav.family', path: '/pages/family/index' },
  { key: 'common.nav.events', path: '/pages/events/index' },
  { key: 'common.nav.membership', path: '/pages/membership/index' },
  { key: 'common.nav.contact', path: '/pages/contact/index' },
]
