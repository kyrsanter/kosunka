import React, {FC} from "react";
import './stack.css';
import {CardType} from "../../types";
import Card from "../card/card";

type PropsType = {
    remainingCards: Array<CardType>
    turnedCards: [] | Array<CardType>
    turnOverCard: (cardName: string) => void
}

const Stack: FC<PropsType> = (props) => {
    let {remainingCards} = props;

    let turnOverCard = () => {
        props.turnOverCard('aa')
    };

    // @ts-ignore
    return (
        <div
            onClick={turnOverCard}
            className="stack">
            <div className="a">
                {
                    remainingCards.map( (card: CardType, i: number) => {
                        if (!card.turned) {
                            return (
                                    <Card
                                        key={i} id={card.name}
                                        name={card.name}
                                        turned={card.turned}/>
                            )
                        }
                    })
                }
            </div>
            {
                props.turnedCards.length ? (
                    <div className="base">
                        {
                            //@ts-ignore
                            props.turnedCards.map( (card: CardType, i: number) => {
                                if (card.turned) {
                                    return (
                                        <Card
                                            key={i}
                                            id={card.name}
                                            name={card.name}
                                            turned={card.turned}/>
                                    )
                                }
                            })
                        }
                    </div>
                ) : null
            }

        </div>
    )
};

export default Stack;