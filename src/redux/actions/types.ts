import {DROP_CARD, DROP_CARD_TO_COLUMN, START_GAME} from "./main";
import {CardType, ColumnType} from "../../types";

export type StartGameActionCreatorType = {
    type: typeof START_GAME,
    payload: {
        stack: Array<CardType>
        remainingCards: Array<CardType>
        columns: Array<ColumnType>
    }
}

export type DropCardActionCreatorType = {
    type: typeof DROP_CARD
    payload: {
        id: number,
        suite: string
    }
}

export type DropCardToColumnActionCreatorType = {
    type: typeof DROP_CARD_TO_COLUMN,
    payload: {
        id: number
        suite: string
        col: number
    }
}

export type CombinedMainTypes = StartGameActionCreatorType | DropCardActionCreatorType | DropCardToColumnActionCreatorType