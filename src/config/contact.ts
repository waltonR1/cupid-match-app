export interface PublicContactConfig {
  email: string
  privacyEmail: string
  wechat: string
  location: string
}

export function resolvePublicContactConfig(): PublicContactConfig {
  const email = readEnv('VITE_PUBLIC_CONTACT_EMAIL', 'contact@rencontreaparis.com')
  return {
    email,
    privacyEmail: readEnv('VITE_PUBLIC_PRIVACY_EMAIL', email.replace(/^contact@/, 'privacy@')),
    wechat: readEnv('VITE_PUBLIC_CONTACT_WECHAT', 'RencontreParis'),
    location: readEnv('VITE_PUBLIC_CONTACT_LOCATION', 'Paris / France'),
  }
}

function readEnv(key: string, fallback: string): string {
  const value = import.meta.env[key]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}
