/** 生成递增 ID */
export function nextId(prefix: string, items: Array<{ id: string }>): string {
    let maxNumeric = 0
    for (const item of items) {
        const match = item.id.match(new RegExp(`^${prefix}-(\\d+)$`))
        if (match) {
            const n = parseInt(match[1], 10)
            if (n > maxNumeric) maxNumeric = n
        }
    }
    return `${prefix}-${String(maxNumeric + 1).padStart(3, '0')}`
}