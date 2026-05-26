import type { NavItem } from '@/constants/nav'

type RegistrationLandingPath = 'self' | 'family'

/** 根据导航 key 在导航列表中查找目标页面并跳转 */
export function navigateByNavKey(key: string, navList: NavItem[]) {
  const target = navList.find(item => item.key === key)
  if (!target?.path) return

  openPage(target.path)
}

/** 打开登录页 */
export function openLoginPage() {
  openPage('/pages/auth/login')
}

/** 通用页面跳转方法 */
export function openPage(url: string) {
  if (!url) return

  uni.navigateTo({
    url,
  })
}

/** 打开首页 */
export function openHomePage() {
  openPage('/pages/index')
}

/** 打开注册页 */
export function openRegisterPage() {
  openPage('/pages/auth/register')
}

/** 登录完成后进入账户首页 */
export function redirectToAuthLanding() {
  uni.redirectTo({
    url: '/pages/account/index',
  })
}

/** 注册完成后按本次入口选择进入资料创建页，关系已预填 */
export function redirectToRegistrationLanding(path: RegistrationLandingPath) {
  const rel = path === 'family' ? 'relative' : 'self'
  uni.redirectTo({
    url: `/pages/account/profile-detail?mode=create&rel=${rel}`,
  })
}

/** 打开个人资料目录页 */
export function openSelfDirectoryPage() {
  openPage('/pages/profiles/self/index')
}

/** 打开活动列表页 */
export function openEventsPage() {
  openPage('/pages/events/index')
}

/** 打开个人资料详情页 */
export function openSelfDetail(id: string) {
  openPage(`/pages/profiles/self/detail?id=${encodeURIComponent(id)}`)
}

/** 打开家庭资料详情页 */
export function openFamilyProfileDetail(id: string) {
  openPage(`/pages/profiles/family/detail?id=${encodeURIComponent(id)}`)
}

/** 打开活动详情页 */
export function openEventDetail(id: string) {
  openPage(`/pages/events/detail?id=${encodeURIComponent(id)}`)
}

/** 打开账户首页 */
export function openAccountPage() {
  openPage('/pages/account/index')
}

/** 打开我的资料页 */
export function openMyProfilePage() {
  openPage('/pages/account/profiles')
}

/** 打开账户中心统一档案详情页 */
export function openAccountProfileDetail(id: string) {
  openPage(`/pages/account/profile-detail?id=${encodeURIComponent(id)}`)
}

export function openAccountProfileCreate(hasSelfProfile?: boolean) {
  const url = hasSelfProfile
    ? '/pages/account/profile-detail?mode=create&hasSelf=1'
    : '/pages/account/profile-detail?mode=create'
  openPage(url)
}

/** 打开活动页 */
export function openAccountEventsPage() {
  openPage('/pages/account/events')
}

/** 打开关系页 */
export function openRelationshipPage() {
  openPage('/pages/account/relationship')
}

/** 打开设置页 */
export function openAccountSettingsPage() {
  openPage('/pages/account/settings')
}

/** 打开会员页 */
export function openMembershipPage() {
  openPage('/pages/account/membership')
}

/** 打开消息中心 */
export function openMessagesPage() {
  openPage('/pages/messages/index')
}

/** 打开资料页中的认证区域 */
export function openVerificationPage() {
  openMyProfilePage()
}

/** 打开关系页 */
export function openConnectionsPage() {
  openRelationshipPage()
}
