import {createStore, combineReducers, applyMiddleware} from "redux";
import {mainReducer} from "./reducers";
import thunk from 'redux-thunk';

const initialState = combineReducers({
    game: mainReducer
});

const store = createStore(initialState, applyMiddleware(thunk));

export type StateType = ReturnType<typeof initialState>
export default store;