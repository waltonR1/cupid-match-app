import {apiRequest} from '@/api/shared/http'

interface UploadResponse {
  url: string
}

export function uploadImage(filePath: string): Promise<string> {
  return readImageAsBase64(filePath).then(({data, fileName}) => (
    apiRequest<UploadResponse>('/upload', {
      method: 'POST',
      data: {fileName, data},
    })
      .then((result) => result.url)
  ))
}

async function readImageAsBase64(filePath: string): Promise<{ data: string; fileName: string }> {
  const fileName = resolveFileName(filePath)

  if (filePath.startsWith('data:')) {
    return {data: filePath, fileName}
  }

  if (canReadWithFetch(filePath)) {
    try {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Read file failed with status ${response.status}`)
      const buffer = await response.arrayBuffer()
      return {data: arrayBufferToBase64(buffer), fileName}
    } catch {
      // Fall through to platform file-system APIs.
    }
  }

  return readImageWithFileSystem(filePath, fileName)
}

function readImageWithFileSystem(filePath: string, fileName: string): Promise<{ data: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    const fileSystem = typeof uni.getFileSystemManager === 'function'
      ? uni.getFileSystemManager()
      : null

    if (!fileSystem) {
      reject(new Error('File system API is unavailable'))
      return
    }

    fileSystem.readFile({
      filePath,
      encoding: 'base64',
      success(readResult) {
        resolve({data: readResult.data as string, fileName})
      },
      fail(error) {
        reject(new Error(error.errMsg || 'Read file failed'))
      },
    })
  })
}

function canReadWithFetch(filePath: string): boolean {
  return (
    typeof fetch === 'function'
    && (
      filePath.startsWith('blob:')
      || filePath.startsWith('data:')
      || filePath.startsWith('http://')
      || filePath.startsWith('https://')
    )
  )
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000
  let binary = ''

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize)
    binary += String.fromCharCode(...chunk)
  }

  return btoa(binary)
}

function resolveFileName(filePath: string): string {
  if (filePath.startsWith('data:')) return 'photo.jpg'

  const cleanPath = filePath.split('?')[0].split('#')[0]
  const fileName = cleanPath.split('/').pop()

  return fileName || 'photo.jpg'
}
