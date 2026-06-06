export interface Header {
    title?: string | null,
    date?: string | null,
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
    fileRefURL?: string | null
}

export interface EvidenceStorage {
    fileUUID?: string | null,
    file?: File | null
}

export interface Experience {
    uuid: string | null,
    header: Header,
    star: Star,
    evidence?: Evidence[]
}