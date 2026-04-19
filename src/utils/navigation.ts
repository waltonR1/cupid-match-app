import type { NavItem } from '@/constants/nav'

export function navigateByNavKey(key: string, navList: NavItem[]) {
  const target = navList.find(item => item.key === key)
  if (!target?.path) return

  openPage(target.path)
}

export function openLoginPage() {
  openPage('/pages/auth/login')
}

export function openPage(url: string) {
  if (!url) return

  uni.navigateTo({
    url,
  })
}

export function openHomePage() {
  openPage('/pages/index')
}

export function openRegisterPage() {
  openPage('/pages/auth/register')
}

export function openSelfDirectoryPage() {
  openPage('/pages/profiles/self/index')
}

export function openEventsPage() {
  openPage('/pages/events/index')
}

export function openSelfDetail(id: string) {
  openPage(`/pages/profiles/self/detail?id=${encodeURIComponent(id)}`)
}

export function openFamilyProfileDetail(id: string) {
  openPage(`/pages/profiles/family/detail?id=${encodeURIComponent(id)}`)
}

export function openEventDetail(id: string) {
  openPage(`/pages/events/detail?id=${encodeURIComponent(id)}`)
}

export function openAccountPage() {
  openPage('/pages/account/profile')
}

export function openMyProfilePage() {
  openAccountPage()
}

export function openActivityPage() {
  openPage('/pages/account/activity')
}

export function openMessagesPage() {
  openPage('/pages/account/messages')
}

export function openVerificationPage() {
  openPage('/pages/account/verification')
}

export function openConnectionsPage() {
  openPage('/pages/account/connections')
}

export function openSafetyPage() {
  openPage('/pages/account/safety')
}

export function openMembershipPage() {
  openPage('/pages/account/membership')
}
