import React, {FC, useState} from "react";
import './card.css';
import Droppable from "../droppable/droppable";

type PropsType = {
    name: string
    turned: boolean
    id: string

    dropCardToColumn?: (col: any, idsArr: Array<string>) => void
    dropCard?: (id: number, suite: string) => void
    col?: number
}




const Card: FC<PropsType> = (props) => {

    let image = (fake: boolean = false) => {
         if (fake) {
             return require(`./images/fakeImg.png`)
         }
        else if (props.turned) {
            return require(`./images/${props.name}.svg`)
        }
        return require(`./images/back.svg`)
    };

    const onDragStartHandler = (e: React.DragEvent) => {
        let elem = e.currentTarget;
        let ids: Array<string> = [];
        let newNode: HTMLDivElement;
        if (elem.nextSibling) {
            let cloneHeight;
            let cloneWidth;
            let cloneTop;
            let arr = [];
            newNode = document.createElement('div');
            newNode.classList.add('fewCards');
            // @ts-ignore
            for (let i = e.currentTarget.parentNode.children.length - 1; i >= 0; i--) {
                // @ts-ignore
                if (e.currentTarget.parentNode.children[i + 1] === elem) {
                    break
                }
                // @ts-ignore
                arr.push(e.currentTarget.parentNode.children[i])
            }
            ids = arr.reverse().map( (item, i) => {
                let clone = item.cloneNode(true);
                // @ts-ignore
                cloneHeight = item.offsetHeight;
                // @ts-ignore
                cloneWidth = item.offsetWidth;
                // @ts-ignore
                cloneTop = +getComputedStyle(item).top.replace('px', '');
                newNode.appendChild(clone);
                return item.id
            });
            newNode.style.width = cloneWidth + 'px';
            // @ts-ignore
            newNode.style.height = cloneHeight + cloneTop / e.currentTarget.parentNode.children.length + 'px';
            document.body.appendChild(newNode)
        }
        if (elem) {
            let dragAttr = elem.getAttribute('draggable');
            if (!dragAttr) return;
            if (dragAttr === 'false') {
                let fakeImg = document.querySelector('.card.fakeImg');
                if (fakeImg) {
                    e.dataTransfer.setDragImage(fakeImg, 0, 0);
                    return
                }

            }

            if (ids.length === 0) {
                ids.push(elem.id);
            }
            e.dataTransfer.setData('transfer', ids.join(','));

            // @ts-ignore
            if (newNode) {
                // @ts-ignore
                elem = document.querySelector('.fewCards');
                // @ts-ignore
                e.dataTransfer.setDragImage(newNode, elem.offsetWidth, elem.offsetHeight);
            }
            else {
                // @ts-ignore
                e.dataTransfer.setDragImage(elem, elem.offsetWidth, elem.offsetHeight);
            }
        }

        setTimeout((target) => {
            if (elem.classList.contains('card')) {
                //@ts-ignore
                elem.style.opacity = 0;
                return
            }
            // @ts-ignore
            for (let i = target.children.length - 1; i >= 0; i--) {
                // @ts-ignore
                if ( target.children[i].dataset['turned'] === 'false') {
                    break
                }
                //@ts-ignore
                target.children[i].style.opacity = 0
            }
            // @ts-ignore
        }, 0, e.currentTarget.parentNode)
    };

    const cancelDrop = (e: React.DragEvent) => {
        let elem = e.currentTarget;
        if (elem) {
            setTimeout(() => {
                //@ts-ignore
                elem.style.opacity = 1
            }, 0)
        }
    };

    const onDragOverHandler = (e: React.DragEvent) => {
        e.stopPropagation();
    };


    return (
        <>
            <div
                id={props.id}
                className="card"
                data-empty={props.name === 'none'}
                onDragStart={onDragStartHandler}
                draggable={props.turned}
                onDragOver={onDragOverHandler}
                onDragEnd={cancelDrop}
                data-turned={props.turned}>
                {
                    props.turned ? <img src={image()} alt=""/> : props.name === 'none' && !props.turned ? <img src={image()} style={{opacity: "0"}} alt=""/> : !props.turned ? <img src={image()} alt=""/> : null
                }
                <Droppable dropCardToColumn={props.dropCardToColumn} dropCard={props.dropCard} col={props.col}/>
                <img src={image(true)} className='fakeImg' alt=""/>
            </div>
        </>
    )
};

export default Card;