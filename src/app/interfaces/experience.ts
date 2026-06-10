export interface Header {
    title?: string | null,
    dateStart?: string | null,
    dateEnd?: string | null,
    location?: string | null,
    participants?: string | null
}

export interface Star {
    situation?: string | null,
    task?: string | null,
    action?: string | null,
    result?: string | null
}

export interface Evidence {
    name?: string | null,
    description?: string | null,
    fileUUID?: string | null,
    fileRefURL?: string | null,
    fileStorage?: File | null
}

export interface Experience {
    uuid: string,
    header: Header,
    star: Star,
    note?: string | null,
    evidences?: Evidence[]
}