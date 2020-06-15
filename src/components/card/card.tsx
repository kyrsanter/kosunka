import React, {FC, useState} from "react";
import './card.css';
import store from "../../redux/store";

type PropsType = {
    name: string
    turned: boolean
    id: string

    dropCardToColumn?: (col: any, id: number, suite: string) => void
    dropCard?: (id: number, suite: string) => void
    col?: number
}

type IdAnalyserReturnType = {
    id: number
    suite: string
}


const Card: FC<PropsType> = (props) => {

    let [possibleCount, setPossibleCount] = useState(1);

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
            e.dataTransfer.setData('transfer', ids.join(''));

            // @ts-ignore
            if (newNode) {
                // @ts-ignore
                elem = document.querySelector('.fewCards');
                // @ts-ignore
                e.dataTransfer.setDragImage(elem, elem.offsetWidth, elem.offsetHeight);
            }
            else {
                // @ts-ignore
                e.dataTransfer.setDragImage(elem, elem.offsetWidth, elem.offsetHeight);
            }
            //@ts-ignore

        }

        setTimeout((elems = elem) => {
            debugger
            if (elems.classList.contains('card')) {
                elems.style.opacity = 0;
                return
            }

            // @ts-ignore
            for (let i = e.currentTarget.parentNode.children.length - 1; i >= 0; i--) {
                // @ts-ignore
                if ( e.currentTarget.parentNode.children[i].getAttribute('data-turned') === 'false') {
                    break
                }
                //@ts-ignore
                e.currentTarget.parentNode.children[i].style.opacity = 0
            }
            // @ts-ignore
        }, 0, newNode)
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

    /*==========================================*/


    const idAnalyser = (id: string):IdAnalyserReturnType => {
        const regExp = /^([1-9]|1[0-3])([HDSC])$/;
        let variants = id.match(regExp);
        if (variants && variants.length) {
            return {
                id: Number(variants[1]),
                suite: variants[2]
            }
        }
        return {
            id: -1,
            suite: '0'
        }
    };

    const drop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer'); //dropped element id
        //@ts-ignore
        let droppedElem = document.getElementById(data);
        //@ts-ignore
        let {id: droppedId, suite: droppedSuite} = idAnalyser(droppedElem.id);
        if (e.currentTarget && e.currentTarget.parentElement) {
            let {id: bottomId, suite: bottomSuite} = idAnalyser(e.currentTarget.parentElement.id);
            let droppedCardIsRed = droppedSuite === 'D' || droppedSuite === 'H' ? true : false;
            let bottomCardIsRed = bottomSuite === 'D' || bottomSuite === 'H' ? true : false;
            if (droppedCardIsRed !== bottomCardIsRed && droppedId === bottomId - 1) {
                if (props.dropCardToColumn && props.col) {
                    props.dropCardToColumn(props.col, droppedId, droppedSuite)
                }
                if (props.dropCard) {
                    props.dropCard(droppedId, droppedSuite)
                }
                console.log(store.getState())
            }
        }

    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault()
    };

    /*==========================================*/
    return (
        <>
            <div
                id={props.id}
                className="card"
                onDragStart={onDragStartHandler}
                draggable={props.turned}
                onDragOver={onDragOverHandler}
                onDragEnd={cancelDrop}
                data-turned={props.turned}>
                {
                    props.turned ? <img src={image()} alt=""/> : <img src={image()} alt=""/>
                }
                <div
                    onDrop={drop}
                    onDragOver={allowDrop}
                    className="droppable"></div>
                <img src={image(true)} className='fakeImg' alt=""/>
            </div>
        </>
    )
};

export default Card;