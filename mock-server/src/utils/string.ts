import type {QueryValue} from '../types/common.js'

/** 获取字符串值 */
export function getString(value: unknown): string {
    if (Array.isArray(value)) {
        return typeof value[0] === 'string' ? value[0] : ''
    }

    return typeof value === 'string' ? value : ''
}

/** 转为整数 */
export function toInt(value: QueryValue, fallback: number): number {
    const next = Number.parseInt(getString(value), 10)
    return Number.isNaN(next) ? fallback : next
}

/** 限制数值范围 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/** 解析环境布尔值 */
export function parseEnvBoolean(value: string | undefined, fallback: boolean): boolean {
    if (value === undefined) {
        return fallback
    }

    const normalized = value.trim().toLowerCase()
    if (normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on') {
        return true
    }
    if (normalized === '0' || normalized === 'false' || normalized === 'no' || normalized === 'off') {
        return false
    }

    return fallback
}