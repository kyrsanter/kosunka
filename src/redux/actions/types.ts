import {DROP_CARD, DROP_CARD_TO_COLUMN, START_GAME, TURN_OVER_STACK_CARD} from "./main";
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
        idsArr: Array<string>
        col: number
    }
}

export type TurnOverStackCardActionCreatorType = {
    type: typeof TURN_OVER_STACK_CARD
    payload: string
}

export type CombinedMainTypes = StartGameActionCreatorType | DropCardActionCreatorType | DropCardToColumnActionCreatorType | TurnOverStackCardActionCreatorType