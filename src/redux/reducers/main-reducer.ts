import {CombinedMainTypes} from "../actions/types";
import {CardType, ColumnType} from "../../types";

const initialState = {
    cardCount: 52,
    gameField: {
        stack: [] as [] | Array<CardType>,
        columns: [] as [] | Array<ColumnType>,
        remainingCards: [] as [] | Array<CardType>,
        aces: [
            {
                suite: 'S',
                cards: [] as [] | Array<CardType>
            },
            {
                suite: 'H',
                cards: [] as [] | Array<CardType>
            },
            {
                suite: 'D',
                cards: [] as [] | Array<CardType>
            },
            {
                suite: 'C',
                cards: [] as [] | Array<CardType>
            },
        ]
    }
};

type InitialStateType = typeof initialState;

export const mainReducer = (state = initialState, action: CombinedMainTypes): InitialStateType => {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                gameField: {
                    ...state.gameField,
                    stack: action.payload.stack,
                    columns: action.payload.columns,
                    remainingCards: action.payload.remainingCards
                }
            };

        case "DROP_CARD":
            debugger
            let remainingIdx;
            let cardInColumnIdx;
            let before;
            let after;
            let currentCard;
            let {id, suite} = action.payload;
            let remainingCards = state.gameField.remainingCards;
            remainingIdx = remainingCards.findIndex( ({name}) => name === id + suite);
            if (remainingIdx > -1) {
                currentCard = remainingCards[remainingIdx];
                before = remainingCards.slice(0, remainingIdx);
                after = remainingCards.slice(remainingIdx + 1, remainingCards.length);

                let aceIdx = state.gameField.aces.findIndex((ace) => ace.suite === suite);
                let acesBefore = state.gameField.aces.slice(0, aceIdx);
                let acesAfter = state.gameField.aces.slice(aceIdx + 1, state.gameField.aces.length);
                let neededAce = state.gameField.aces[aceIdx].cards.concat();
                neededAce.push(currentCard);
                return {
                    ...state,
                    gameField: {
                        ...state.gameField,
                        remainingCards: [...before, ...after],
                        aces: [...acesBefore, {...state.gameField.aces[aceIdx], cards: neededAce}, ...acesAfter]
                    },
                };
            }
            for (let col = 0; col < state.gameField.columns.length; col++) {
                let column = state.gameField.columns[col];
                if (!cardInColumnIdx || cardInColumnIdx < 0) {
                    cardInColumnIdx = column.cards.findIndex( ({name}) => name === id + suite);
                    if (cardInColumnIdx !== -1) {
                        before = column.cards.slice(0, cardInColumnIdx);
                        after = column.cards.slice(cardInColumnIdx + 1, column.cards.length);
                        if (before[before.length - 1]) {
                            before[before.length - 1].turned = true; /**/
                        }
                        let currentCard = column.cards[cardInColumnIdx];
                        let colBefore = state.gameField.columns.slice(0, col);
                        column = {
                            ...column,
                            cards: [...before, ...after]
                        };
                        let colAfter = state.gameField.columns.slice(col + 1, state.gameField.columns.length);
                        //@ts-ignore
                        let aceIdx = state.gameField.aces.findIndex((ace) => ace.suite === suite);
                        let acesBefore = state.gameField.aces.slice(0, aceIdx);
                        let acesAfter = state.gameField.aces.slice(aceIdx + 1, state.gameField.aces.length);
                        let neededAce = state.gameField.aces[aceIdx].cards.concat();
                        neededAce.push(currentCard);
                        return {
                            ...state,
                            gameField: {
                                ...state.gameField,
                                columns: [...colBefore, column, ...colAfter],
                                aces: [...acesBefore, {...state.gameField.aces[aceIdx], cards: neededAce}, ...acesAfter]
                            }
                        }
                    }
                }
            };
            return state;
        break;

        case "DROP_CARD_TO_COLUMN":
            let {id: cardId, suite: cardSuite, col: cardCol} = action.payload;
            let cardName = cardId + cardSuite;


            /*LOOKING FOR RELATIVE COLUMNS FOR PAYLOAD CARD AND CARD*/
            for (let i = 0; i < state.gameField.columns.length; i++) {
                let payloadCardContainer = state.gameField.columns[i];
                let payloadCardIdx = payloadCardContainer.cards.findIndex( (card) => card.name === cardName);
                if (payloadCardIdx && payloadCardIdx !== -1) {
                    let payloadCard = payloadCardContainer.cards[payloadCardIdx];
                    /* get back the payload card from its column */
                    // @ts-ignore
                    let payloadCardArrayContainerBefore = payloadCardContainer.cards.slice(0, payloadCardIdx);
                    // @ts-ignore
                    let payloadCardArrayContainerAfter = payloadCardContainer.cards.slice(payloadCardIdx + 1, payloadCardContainer.length);
                    let newPayloadCardArray = [...payloadCardArrayContainerBefore, ...payloadCardArrayContainerAfter]; // without payload card

                    newPayloadCardArray[newPayloadCardArray.length - 1].turned = true;
                    debugger
                    let newColumnWithoutPayloadCard = {
                        order: i,
                        cards: newPayloadCardArray
                    };

                    let columnToAddCards = state.gameField.columns[cardCol]; // cards in the column to add the card
                    let columnToAddCardsIdx = state.gameField.columns[cardCol].order;

                    let newColumnToAddCards = {
                        ...columnToAddCards,
                        cards: [...columnToAddCards.cards, payloadCard]
                    };

                    if (i < columnToAddCardsIdx) {
                        let columnsBefore = state.gameField.columns.slice(0, i);
                        let columnsCenter = state.gameField.columns.slice(i + 1, columnToAddCardsIdx);
                        let columnsAfter = state.gameField.columns.slice(columnToAddCardsIdx + 1, state.gameField.columns.length);
                        let s = [...columnsBefore, newColumnWithoutPayloadCard, ...columnsCenter, newColumnToAddCards, ...columnsAfter];
                        return {
                            ...state,
                            gameField: {
                                ...state.gameField,
                                columns: [...s]
                            }
                        }
                    }
                    else {
                        let columnsBefore = state.gameField.columns.slice(0, columnToAddCardsIdx);
                        let columnsCenter = state.gameField.columns.slice(columnToAddCardsIdx + 1, i);
                        let columnsAfter = state.gameField.columns.slice(i + 1, state.gameField.columns.length);
                        let s = [...columnsBefore, newColumnToAddCards, ...columnsCenter, newColumnWithoutPayloadCard, ...columnsAfter];
                        return {
                            ...state,
                            gameField: {
                                ...state.gameField,
                                columns: [...s]
                            }
                        }
                    }

                    return state;
                }
            }



            //
            // let columns = [...state.gameField.columns, columnToAddCards];
            // console.log(columns);

            return {
                ...state,
                gameField: {
                    ...state.gameField,
                    columns: [
                        ...state.gameField.columns,
                    ]
                }
            }

        default:
            return state;
    }
};