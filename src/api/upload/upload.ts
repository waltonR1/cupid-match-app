import {apiUploadFile} from '@/api/shared/http'
import {resolveAssetUrl} from '@/config/app'

interface UploadResponse {
  url: string
}

export function uploadImage(filePath: string): Promise<string> {
  return apiUploadFile<UploadResponse>('/upload', filePath)
    .then((result) => resolveAssetUrl(result.url))
}
