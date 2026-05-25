/** 对邮箱/手机/微信标识符进行脱敏展示 */
export function maskIdentifier(identifier: string, provider: 'email' | 'phone' | 'wechat' | 'google') {
  if (provider === 'email' || provider === 'google') {
    const [name, domain] = identifier.split('@')
    if (!domain) return identifier
    const visible = name.length <= 2 ? name[0] ?? '' : name.slice(0, 2)
    return `${visible}${'*'.repeat(Math.max(name.length - visible.length, 2))}@${domain}`
  }

  if (provider === 'phone') {
    if (identifier.length <= 4) return identifier
    return `${identifier.slice(0, 3)}****${identifier.slice(-2)}`
  }

  return identifier
}
