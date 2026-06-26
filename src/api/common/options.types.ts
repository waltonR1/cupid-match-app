export interface CommonOptionDTO {
    value: string
    label: string
    requiresExtraText?: boolean
}

export type CommonOptionsGroup = Record<string, CommonOptionDTO[]>

export interface CommonOptionsResponse {
    version: string
    unchanged: boolean
    groups?: CommonOptionsGroup
    labelGroups?: CommonOptionsGroup
}