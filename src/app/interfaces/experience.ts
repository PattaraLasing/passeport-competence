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
    id?: string | null,
    genre?: string | null,
    name?: string | null,
    description?: string | null
}

export interface Experience {
    id: string | null,
    header: Header,
    star: Star,
    evidence?: Evidence
}