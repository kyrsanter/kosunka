import React, {FC} from "react";
import './column.css';
import {CardType} from "../../types";
import Card from "../card/card";


type PropsType = {
    cards: Array<CardType>
    col: number
    dropCardToColumn: (col: number, idsArr: Array<string>) => void
}

const Column: FC<PropsType> = (props) => {

        return (

            <div className='column'>
                {
                    props.cards.length === 0 ? <Card col={props.col} name={"none"} turned={false} id={"0A"} dropCardToColumn={props.dropCardToColumn}/> :
                    props.cards.map( (card, idx) => {
                        if (card.turned) {
                            return <Card
                                        dropCardToColumn={props.dropCardToColumn}
                                        key={idx}
                                        id={card.name}
                                        name={card.name}
                                        col={props.col}
                                        turned={card.turned}/>
                        }
                        return <Card
                                    key={idx}
                                    col={props.col}
                                    dropCardToColumn={props.dropCardToColumn}
                                    id={card.name}
                                    name={card.name}
                                    turned={card.turned}/>
                    })
                }
            </div>

    )
};

export default Column;