import React, {FC} from "react";

type PropsType = {
    dropCardToColumn?: (col: any, idsArr: Array<string>) => void
    dropCard?: (id: number, suite: string) => void
    col?: number
}


type IdAnalyserReturnType = {
    id: number
    suite: string
}

const Droppable: FC<PropsType> = (props) => {

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
        let lastId;
        const data = e.dataTransfer.getData('transfer'); //dropped element id or string of id separated with a coma
        let idsArr = data.split(',');
        if (idsArr.length === 1) {
            lastId = data;
        }
        else {
            lastId = idsArr[0];
        }
        let {id: droppedId, suite: droppedSuite} = idAnalyser(lastId);
        if (e.currentTarget && e.currentTarget.parentElement) {
            let {id: bottomId, suite: bottomSuite} = idAnalyser(e.currentTarget.parentElement.id);
            if (e.currentTarget.parentElement.dataset['empty'] === 'true' && droppedId === 13) {
                if (props.dropCardToColumn) {
                    props.dropCardToColumn(props.col, idsArr);
                    return;
                }
            }
            let droppedCardIsRed = droppedSuite === 'D' || droppedSuite === 'H' ? true : false;
            let bottomCardIsRed = bottomSuite === 'D' || bottomSuite === 'H' ? true : false;
            if (droppedCardIsRed !== bottomCardIsRed && droppedId === bottomId - 1) {
                // @ts-ignore
                if (props.dropCardToColumn && props.col.toString()) {
                    // @ts-ignore
                    props.dropCardToColumn(props.col, idsArr)
                }
                if (props.dropCard) {
                    // @ts-ignore
                    props.dropCard(droppedId, droppedSuite)
                }
            }
            else {
                console.log('ok');
                return
            }
        }
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault()
    };

    return <div
        onDrop={drop}
        onDragOver={allowDrop}
        className="droppable"></div>
};

export default Droppable