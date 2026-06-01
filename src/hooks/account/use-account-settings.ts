import {ref} from 'vue'
import {
    bindIdentity as bindIdentityApi,
    changeAccountPassword,
    deactivateAccount as deactivateAccountApi,
    enableAccountMfa,
    disableAccountMfa,
    getAccountMfaStatus,
    getAccountSettings,
    requestAccountMfaVerificationCode,
    requestAccountExport,
    requestAccountExportDownload,
    requestSecurityChallengeCode,
    requestVerificationCode as requestVerificationCodeApi,
    unbindIdentity as unbindIdentityApi,
    updateAccountMe,
    updateAccountPreferences,
    verifySecurityChallenge,
    type AccountIdentityCreatePayload,
    type AccountMfaEnablePayload,
    type AccountMfaDisablePayload,
    type AccountMfaVerificationCodePayload,
    type AccountMfaStatusDTO,
    type AccountPasswordChangePayload,
    type AccountPreferenceUpdatePayload,
    type AccountSecurityChallengeAction,
    type AccountSettingsDTO,
    type AccountMeUpdatePayload,
    type VerificationCodeRequestPayload,
} from '@/api/account'
import {uploadImage} from '@/api/upload/upload'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import {useAuthStore} from '@/stores/modules/auth'

export function useAccountSettings() {
    const authStore = useAuthStore()
    const latest = useLatestRequest()
    const settings = ref<AccountSettingsDTO | null>(null)
    const mfaStatus = ref<AccountMfaStatusDTO | null>(null)

    void load()
    void loadMfa()

    async function loadMfa() {
        if (!authStore.isLoggedIn) return

        try {
            mfaStatus.value = await getAccountMfaStatus()
        } catch { /* ignore */
        }
    }

    async function load() {
        if (!authStore.isLoggedIn) return

        const data = await latest.run(() => getAccountSettings())
        if (data) settings.value = data
    }

    async function saveAccount(payload: AccountMeUpdatePayload) {
        if (!authStore.isLoggedIn) return false

        const data = await latest.run(() => updateAccountMe(payload))
        if (!data) return false

        if (authStore.user) {
            const preferredLocale = isAuthLocale(data.user.preferredLocale)
                ? data.user.preferredLocale
                : authStore.user.preferredLocale
            authStore.user = {
                ...authStore.user,
                accountName: data.user.accountName,
                avatarUrl: data.user.avatarUrl,
                preferredLocale,
            }
        }
        await load()
        return true
    }

    async function savePreferences(payload: AccountPreferenceUpdatePayload) {
        if (!authStore.isLoggedIn) return false

        const data = await latest.run(() => updateAccountPreferences(payload))
        if (!data) return false
        settings.value = data
        return true
    }

    async function uploadAvatar(filePath: string) {
        return uploadImage(filePath)
    }

    async function changePassword(payload: AccountPasswordChangePayload) {
        if (!authStore.isLoggedIn) return null

        const data = await latest.run(() => changeAccountPassword(payload))
        return data ?? null
    }

    async function exportData(challengeToken?: string) {
        if (!authStore.isLoggedIn) return false

        const result = await latest.run(() => requestAccountExport({challengeToken}))
        if (!result?.downloadUrl) return false

        const data = await latest.run(() => requestAccountExportDownload(result.downloadUrl))
        if (!data) return false

        downloadJsonFile('account-export.json', data)
        return true
    }

    async function deactivateAccount(challengeToken?: string) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => deactivateAccountApi({challengeToken}))
        return result ?? null
    }

    async function requestVerificationCode(payload: VerificationCodeRequestPayload) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => requestVerificationCodeApi(payload))
        return result ?? null
    }

    async function bindIdentity(payload: AccountIdentityCreatePayload) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => bindIdentityApi(payload))
        if (!result) return null
        await load()
        return result
    }

    async function unbindIdentity(identityId: string, challengeToken?: string) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => unbindIdentityApi(identityId, {challengeToken}))
        if (!result) return null
        await load()
        return result
    }

    async function enableMfa(payload: AccountMfaEnablePayload) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => enableAccountMfa(payload))
        if (result) {
            mfaStatus.value = result;
            await load()
        }
        return result ?? null
    }

    async function disableMfa(payload: AccountMfaDisablePayload) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => disableAccountMfa(payload))
        if (result) {
            mfaStatus.value = result;
            await load()
        }
        return result ?? null
    }

    async function requestMfaVerificationCode(payload: AccountMfaVerificationCodePayload) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => requestAccountMfaVerificationCode(payload))
        return result ?? null
    }

    async function requestSecurityChallenge(action: AccountSecurityChallengeAction) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => requestSecurityChallengeCode({action}))
        return result ?? null
    }

    async function verifySensitiveAction(action: AccountSecurityChallengeAction, code: string) {
        if (!authStore.isLoggedIn) return null

        const result = await latest.run(() => verifySecurityChallenge({action, code}))
        return result ?? null
    }

    return {
        loading: latest.loading,
        error: latest.error,
        settings,
        refresh: load,
        saveAccount,
        savePreferences,
        uploadAvatar,
        changePassword,
        deactivateAccount,
        requestVerificationCode,
        bindIdentity,
        unbindIdentity,
        mfaStatus,
        requestMfaVerificationCode,
        enableMfa,
        disableMfa,
        requestSecurityChallenge,
        verifySensitiveAction,
        exportData,
    }
}

function isAuthLocale(value: string): value is 'zh' | 'fr' | 'en' {
    return value === 'zh' || value === 'fr' || value === 'en'
}

function downloadJsonFile(filename: string, data: unknown) {
    const documentRef = globalThis.document
    if (!documentRef) {
        throw new Error('Browser download is only available in H5 runtime.')
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const link = documentRef.createElement('a')
    link.href = url
    link.download = filename
    documentRef.body.appendChild(link)
    link.click()
    documentRef.body.removeChild(link)
    URL.revokeObjectURL(url)
}
