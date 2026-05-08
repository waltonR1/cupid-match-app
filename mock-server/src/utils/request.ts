/** 解析当前用户请求头 */
export function resolveUserIdHeader(value: unknown): string {
    if (typeof value === 'string') return value
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
    return ''
}
