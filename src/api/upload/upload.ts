import {apiUploadFile} from '@/api/shared/http'
import {resolveAssetUrl} from '@/config/app'

interface UploadResponse {
  url: string
}

interface VerificationMaterialUploadResponse {
  materialUrl: string
  originalFilename?: string
  contentType?: string
  size?: number
}

export function uploadImage(filePath: string): Promise<string> {
  return apiUploadFile<UploadResponse>('/upload', filePath)
    .then((result) => resolveAssetUrl(result.url))
}

export function uploadVerificationMaterial(profileId: string, filePath: string): Promise<VerificationMaterialUploadResponse> {
  return apiUploadFile<VerificationMaterialUploadResponse>(`/account/profiles/${profileId}/verification/materials/upload`, filePath)
}
