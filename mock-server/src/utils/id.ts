export function nextId(prefix: string, items: Array<{ id: string }>): string {
  return `${prefix}-${String(items.length + 1).padStart(3, '0')}`
}
