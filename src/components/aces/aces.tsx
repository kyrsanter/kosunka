import React, {FC} from "react";
import './aces.css';
import AceItem from "../ace-item/ace-item";
import {CardType} from "../../types";

type PropsType = {
    dropCard: (id: number, suite: string) => void
    aces: Array<{
        suite: string,
        cards: Array<CardType>
    }>


}

const Aces: FC<PropsType> = (props) => {
    return (
        <div className='aces'>
            {
                props.aces.map( (ace, i) => {
                    // @ts-ignore
                    return <AceItem key={i} cards={ace.cards} suite={ace.suite} dropCard={props.dropCard} id={`ace_${i + 1}`}/>
                })
            }
        </div>
    )
};

export default Aces;