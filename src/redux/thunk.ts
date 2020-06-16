import {GameService} from "../service/game-service";
import {
    dropCardActionCreator,
    dropCardToColumnActionCreator,
    startGameActionCreator, turnOverStackCardActionCreator
} from "./actions/main";


const service = new GameService();

export const initThunk = () => (dispatch: any) => {
    const {stack, remainingCards, columns} = service.leftCardsFilter();
    dispatch(startGameActionCreator(stack, remainingCards, columns));
};

export const dropCardThunk = (id: number, suite: string) => (dispatch: any) => {
    dispatch(dropCardActionCreator(id, suite))
};

export const dropCardToColumnThunk = (col: number, idsArr: Array<string>) => (dispatch: any) => {
    dispatch(dropCardToColumnActionCreator(col, idsArr))
};

export const turnOverStackCardThunk = (cardName: string) => (dispatch: any) => {
    debugger
    dispatch(turnOverStackCardActionCreator(cardName))
}