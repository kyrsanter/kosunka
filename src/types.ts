export type CardType = {
    name: string
    turned: boolean
}

export type ColumnType = {
    order: number,
    cards: Array<CardType>
}