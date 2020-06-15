import {DropCardActionCreatorType, DropCardToColumnActionCreatorType, StartGameActionCreatorType} from "./types";
import {CardType, ColumnType} from "../../types";

export const START_GAME = 'START_GAME';
export const DROP_CARD = 'DROP_CARD';
export const DROP_CARD_TO_COLUMN = 'DROP_CARD_TO_COLUMN';

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

export const dropCardToColumnActionCreator = (col: number, id: number, suite: string): DropCardToColumnActionCreatorType => ({
    type: DROP_CARD_TO_COLUMN,
    payload: {
        id,
        suite,
        col
    }
});

