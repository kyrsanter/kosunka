import React, {FC} from "react";
import './stack.css';
import {CardType} from "../../types";
import Card from "../card/card";

type PropsType = {
    remainingCards: Array<CardType>
    dropCard: (id: number, suite: string) => void
}

const Stack: FC<PropsType> = (props) => {
    let {remainingCards} = props;
    return (
        <div className="stack">
                {
                    remainingCards.map( (card: CardType, i: number) => {
                        return <Card dropCard={props.dropCard} key={i} id={card.name} name={card.name} turned={card.turned}/>
                    })
                }
        </div>
    )
};

export default Stack;