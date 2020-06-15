import {GameService} from "../service/game-service";
import {
    dropCardActionCreator,
    dropCardToColumnActionCreator,
    startGameActionCreator
} from "./actions/main";
import store from "./store";

const service = new GameService();

export const initThunk = () => (dispatch: any) => {
    const {stack, remainingCards, columns} = service.leftCardsFilter();
    dispatch(startGameActionCreator(stack, remainingCards, columns));
};

export const dropCardThunk = (id: number, suite: string) => (dispatch: any) => {
    dispatch(dropCardActionCreator(id, suite))
};

export const dropCardToColumnThunk = (col: number, id: number, suite: string) => (dispatch: any) => {
    dispatch(dropCardToColumnActionCreator(col, id, suite))
};