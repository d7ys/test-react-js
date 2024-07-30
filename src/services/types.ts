export type WithUUID = {
    uuid: string
}

export type WithID = {
    id: number
}

export type WithDateAt = {
    created_at: string
    updated_at: string
}

export type BaseSearchQueries = {
    offset?: number
    limit?: number
}
