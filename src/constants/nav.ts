export interface NavItem {
  key: string
  path?: string
}

export const NAV_LIST: NavItem[] = [
  { key: 'common.nav.about', path: '/pages/public/about' },
  { key: 'common.nav.self', path: '/pages/profiles/self/index' },
  { key: 'common.nav.family', path: '/pages/profiles/family/index' },
  { key: 'common.nav.events', path: '/pages/events/index' },
  { key: 'common.nav.membership', path: '/pages/public/membership' },
  { key: 'common.nav.contact', path: '/pages/public/contact' },
]
