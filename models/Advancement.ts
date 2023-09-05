interface Advancement {
    id: string
    title: string
    description: string
    icon: string
    parent_id: string
    mod_id: string
    mod_name?: string
    players: Player[]
    image_base64: string

}
