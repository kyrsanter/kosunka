import React, {FC, useState} from "react";
import './ace-item.css';
import {CardType} from "../../types";
import Card from "../card/card";

type PropsType = {
    id: string
    dropCard: (id: number, suite: string) => void
    suite: string
    cards: [] | Array<CardType>
}

type IdAnalyserReturnType = {
    id: number
    suite: string
}

const AceItem: FC<PropsType> = (props) => {
    let {id, cards} = props;

    let [possibleCount, setPossibleCount] = useState(1);

    const idAnalyser = (id: string):IdAnalyserReturnType | void => {
        const regExp = /^([1-9]|1[0-3])([HDSC])$/;
        let variants = id.match(regExp);
        if (variants && variants.length) {
            return {
                id: Number(variants[1]),
                suite: variants[2]
            }
        }
    };

    const drop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer'); //dropped element id
        //@ts-ignore
        let droppedElem = document.getElementById(data);
        //@ts-ignore
        let {id, suite} = idAnalyser(droppedElem.id);
        if (id === possibleCount && suite === props.suite) {
            setPossibleCount(possibleCount + 1);
            props.dropCard(id, suite)
        }
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault()
    };

    let image = `${process.env.PUBLIC_URL}/images/${props.suite}.png`;

    /**/

    const neededCard = (e: React.DragEvent) => {
        let cardsInAcesContainer = Array.from(e.currentTarget.children).filter( (child) => child.classList.contains('card'));
        if (cardsInAcesContainer.length === 0) return;
        return cardsInAcesContainer[cardsInAcesContainer.length - 1];
    };

    const onDragStartHandler = (e: React.DragEvent) => {
        /*looking for cards in aces container*/
        let draggedElem = neededCard(e);
        if (draggedElem) {
            let dragAttr = draggedElem.getAttribute('draggable');
            if (!dragAttr) return;
            if (dragAttr === 'false') {
                let fakeImg = document.querySelector('.card.fakeImg');
                if (fakeImg) {
                    e.dataTransfer.setDragImage(fakeImg, 0, 0);
                    return
                }
            }
            e.dataTransfer.setData('transfer', draggedElem.id);
            //@ts-ignore
            e.dataTransfer.setDragImage(draggedElem, draggedElem.offsetWidth, draggedElem.offsetHeight);
        }
        setTimeout(() => {
            //@ts-ignore
            draggedElem.style.opacity = 0
        }, 0)
    };

    const onDragOverHandler = (e: React.DragEvent) => {
        e.stopPropagation();
    };

    const cancelDrop = (e: React.DragEvent) => {
        let draggedElem = neededCard(e);
        if (draggedElem) {
            setTimeout(() => {
                //@ts-ignore
                draggedElem.style.opacity = 1
            }, 0)
        }
    };

    /**/

    return (
        <div
            onDragStart={onDragStartHandler}
            onDragOver={onDragOverHandler}
            onDragEnd={cancelDrop}
            draggable={cards.length === 0 ? false : true}
            className='ace'>
            {
                // @ts-ignore
                cards.length === 0 ? <div className='suite'><img src={image} alt=""/></div> : cards.map( (card: CardType) => <Card
                                                                                                                                    key={card.name}
                                                                                                                                    name={card.name}
                                                                                                                                    turned={card.turned}
                                                                                                                                    id={card.name}
                                                                                                                                    />)
            }
            <div
                id={id}
                onDrop={drop}
                onDragOver={allowDrop}
                className="droppable"></div>
        </div>
    )
};

export default AceItem