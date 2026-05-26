import {resolveApiBaseUrl} from '@/api/shared/config'

function resolveUploadBaseUrl(): string {
  const apiBase = resolveApiBaseUrl()
  return apiBase.replace(/\/api\/?$/, '')
}

interface UploadResponse {
  url: string
}

export function uploadImage(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      success(readResult) {
        const data = readResult.data as string
        const fileName = filePath.split('/').pop() || 'photo.jpg'

        uni.request({
          url: `${resolveUploadBaseUrl()}/upload`,
          method: 'POST',
          data: {fileName, data},
          header: {'Content-Type': 'application/json'},
          success(response) {
            const statusCode = response.statusCode ?? 0
            if (statusCode >= 200 && statusCode < 300) {
              const result = response.data as UploadResponse
              resolve(`${resolveUploadBaseUrl()}${result.url}`)
              return
            }
            reject(new Error(`Upload failed with status ${statusCode}`))
          },
          fail(error) {
            reject(new Error(error.errMsg || 'Upload failed'))
          },
        })
      },
      fail(error) {
        reject(new Error(error.errMsg || 'Read file failed'))
      },
    })
  })
}
