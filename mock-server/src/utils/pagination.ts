import type { Pagination } from '../types/common.js'

export function buildPagination(total: number, page: number, pageSize: number): Pagination {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const pagination = buildPagination(items.length, page, pageSize)
  const start = (pagination.page - 1) * pagination.pageSize
  return items.slice(start, start + pagination.pageSize)
}
