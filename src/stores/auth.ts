import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * 用户信息结构（当前最小版本）
 *
 * 后续可以继续扩展：
 * - token
 * - email
 * - phone
 * - roles
 * - permissions
 * - profileComplete
 * 等等
 */
export interface UserInfo {
    /**
     * 用户唯一标识
     */
    id?: string

    /**
     * 展示名称
     * 用于 header、个人中心等区域展示
     */
    displayName: string

    /**
     * 用户头像地址
     */
    avatar?: string
}

/**
 * Auth Store
 *
 * 只负责“认证域”的最小状态：
 * 1. 是否登录
 * 2. 当前用户信息
 *
 * 注意：
 * 这个 store 目前还没有接真实后端，
 * 所以先保留 mock 登录能力，方便前期开发。
 *
 * 为什么建议改成 setup store？
 * - 和 locale store 风格统一
 * - 和 Vue3 / composable 风格一致
 * - 未来扩展 token、持久化、自动恢复登录态时更顺手
 */
export const useAuthStore = defineStore('auth', () => {
    /**
     * 是否已登录
     *
     * 这是最核心的认证状态。
     * 很多 UI 会直接依赖它做显示切换：
     * - header 显示“登录 / 个人中心”
     * - 某些页面是否允许访问
     * - 某些按钮是否展示
     */
    const isLoggedIn = ref(false)

    /**
     * 当前用户信息
     *
     * 未登录时为 null。
     * 登录后写入用户对象。
     */
    const user = ref<UserInfo | null>(null)

    /**
     * 当前显示名称
     *
     * 为什么用 computed？
     * 因为它是从 user 派生出来的数据，
     * 不是独立状态，不应该单独再存一份。
     */
    const displayName = computed(() => {
        return user.value?.displayName || ''
    })

    /**
     * 当前头像
     *
     * 同样属于从 user 派生出的展示数据。
     */
    const avatar = computed(() => {
        return user.value?.avatar || ''
    })

    /**
     * mock 登录
     *
     * 当前开发阶段先用假数据模拟登录，
     * 后续接入真实接口时，可以把这里替换成：
     * 1. 调用登录 API
     * 2. 保存 token
     * 3. 拉取用户信息
     * 4. 更新登录状态
     */
    function loginMock() {
        isLoggedIn.value = true
        user.value = {
            id: '1',
            displayName: 'Claire',
            avatar: '',
        }
    }

    /**
     * 登出
     *
     * 最小实现就是：
     * 1. 清空登录状态
     * 2. 清空用户信息
     *
     * 后续如果接真实认证，还可以在这里补充：
     * - 清空 token
     * - 清空本地缓存
     * - 清空权限信息
     * - 跳转到首页或登录页
     */
    function logout() {
        isLoggedIn.value = false
        user.value = null
    }

    /**
     * 开发期快速切换登录状态
     *
     * 这个方法适合开发联调时临时使用，
     * 方便你快速查看“已登录 / 未登录”两套 UI。
     *
     * ⚠️ 生产环境一般不建议保留这种入口
     * 或者至少要受到 config 开关严格控制。
     */
    function toggleLoginStatus() {
        if (isLoggedIn.value) {
            logout()
        } else {
            loginMock()
        }
    }

    /**
     * setup store 中，想暴露给外部使用的内容，
     * 都必须在这里 return 出去。
     */
    return {
        isLoggedIn,
        user,
        displayName,
        avatar,
        loginMock,
        logout,
        toggleLoginStatus,
    }
})