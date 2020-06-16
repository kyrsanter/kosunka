import {
    DropCardActionCreatorType,
    DropCardToColumnActionCreatorType,
    StartGameActionCreatorType,
    TurnOverStackCardActionCreatorType
} from "./types";
import {CardType, ColumnType} from "../../types";

export const START_GAME = 'START_GAME';
export const DROP_CARD = 'DROP_CARD';
export const DROP_CARD_TO_COLUMN = 'DROP_CARD_TO_COLUMN';
export const TURN_OVER_STACK_CARD = 'TURN_OVER_STACK_CARD';

export const startGameActionCreator = (stack: Array<CardType>, remainingCards: Array<CardType>, columns: Array<ColumnType>): StartGameActionCreatorType => ({
    type: START_GAME,
    payload: {
        stack,
        remainingCards,
        columns
    }
});

export const dropCardActionCreator = (id: number, suite: string): DropCardActionCreatorType => ({ // to aces from remaining cards or columns
    type: DROP_CARD,
    payload: {
        id,
        suite,
    }
});

export const dropCardToColumnActionCreator = (col: number, idsArr: Array<string>): DropCardToColumnActionCreatorType => ({
    type: DROP_CARD_TO_COLUMN,
    payload: {
        col,
        idsArr
    }
});

export const turnOverStackCardActionCreator = (cardName: string): TurnOverStackCardActionCreatorType => {
    return {
        type: TURN_OVER_STACK_CARD,
        payload: cardName
    }
}

