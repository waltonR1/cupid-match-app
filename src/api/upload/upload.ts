import {apiUploadFile} from '@/api/shared/http'

interface UploadResponse {
  url: string
}

interface VerificationMaterialUploadResponse {
  materialUrl: string
  originalFilename?: string
  contentType?: string
  size?: number
  scanStatus?: string
  scanMessage?: string
}

export function uploadImage(filePath: string): Promise<string> {
  return apiUploadFile<UploadResponse>('/upload', filePath)
    .then((result) => result.url)
}

export function uploadVerificationMaterial(profileId: string, filePath: string): Promise<VerificationMaterialUploadResponse> {
  return apiUploadFile<VerificationMaterialUploadResponse>(`/account/profiles/${profileId}/verification/materials/upload`, filePath)
}
