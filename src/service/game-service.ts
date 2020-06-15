import {CardType} from "../types";

export class GameService {
    cardCount: number;
    cardSuits: string[] = ['H', 'D', 'S', 'C'];
    cardValues: string[] = ['1', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    cardsStack: Array<CardType> = []; //52 order
    shuffledCards: Array<CardType> = []; //52 random order

    constructor() {
        this.cardCount = 52;
        this.cardsStack = this.cardCombiner();
        this.shuffledCards = this.shuffler();
    }

    cardCombiner() {
        let cards: Array<CardType> = [];
        this.cardSuits.forEach(( suit ) => {
            this.cardValues.forEach((value) => {
                cards.push({
                    name: value + suit,
                    turned: false
                });
            })
        });
        return cards;
    }

    randomNumsArrBuilder() {
        let arr: number[] = [];
        while(arr.length !== this.cardCount) {
            let rnd = Math.floor(Math.random() * this.cardCount);
            if (!arr.includes(rnd)) {
                arr.push(rnd)
            }
        }
        return arr;
    }

    shuffler() {
        let randomNumsArr = this.randomNumsArrBuilder();
        return randomNumsArr.map((num) => this.cardsStack[num])
    }

    columnBuilder() { /* column from 1 to 7. the last card is turned */
        let displayedColumns: Array<any> = [];
        let columnsCounter = 7;
        let cardCounter = 0;
        for (let i = 0; i < columnsCounter; i++) {
            let cardsInColumn: Array<CardType> = [];
            for (let j = 0; j < i + 1; j++) {
                let currentCard = this.shuffledCards[cardCounter];
                if (i === j) {
                    currentCard.turned = true
                }
                cardsInColumn.push(currentCard);
                cardCounter++;
            }
            let column = {
                order: i,
                cards: cardsInColumn
            };
            displayedColumns.push(column)
        }
        return displayedColumns;
    }

    leftCardsFilter() {
        let stack = this.shuffledCards;
        let columns = this.columnBuilder();
        let cardsInColumns: string[] = [];
        columns.forEach( col => {
             col.cards.forEach((card: CardType) => {
                 cardsInColumns.push(card.name)
            })
        });
        let remainingCards = stack.filter((card: CardType) => {
            if (!cardsInColumns.includes(card.name)) {
                return card
            }
        });
        return {
            remainingCards,
            stack,
            columns
        }
    }

    getStartData() {
        return this.leftCardsFilter()
    }
}
