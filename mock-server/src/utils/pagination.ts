import type {Pagination} from '../types/common.js'

/** 构建分页信息 */
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

/** 分页截取数据 */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const pagination = buildPagination(items.length, page, pageSize)
    const start = (pagination.page - 1) * pagination.pageSize
    return items.slice(start, start + pagination.pageSize)
}