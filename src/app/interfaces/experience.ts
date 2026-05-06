export interface Header {
    title: string,
    date?: string,
    location?: string,
    participants?: string[]
}

export interface Star {
    situation: string,
    task: string,
    action: string,
    result: string
}

export interface Evidence {
    id: string,
    genre: string,
    name: string,
    description: string,
}

export interface Experience {
    id: string,
    header: Header,
    star: Star,
    evidences?: Evidence[]
}