export function mockHashPassword(password: string): string {
  return `mock-sha256:${Buffer.from(password, 'utf8').toString('base64')}`
}
