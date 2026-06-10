export interface Skill {
    uuid: string,
    category?: string | null,
    title?: string | null,
    description?: string | null,
    experiencesID?: number[] | null
}