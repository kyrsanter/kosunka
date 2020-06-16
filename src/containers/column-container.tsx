import React, {FC} from "react";
import Column from "../components/column/column";
import {connect, ConnectedProps} from "react-redux";
import {StateType} from "../redux/store";
import {dropCardToColumnThunk} from "../redux/thunk";

const ColumnsContainer: FC<PropsFromReduxType> = (props) => {
    const {columns} = props;
    if (columns.length === 0) {
        return null
    }

    let newColumns = [];
    for (let i = 0; i < columns.length; i++) {
        newColumns.push(columns[i])
    }

    return (
        <>
            {
                newColumns.map((col) => {
                    return <Column
                                key={col.order}
                                dropCardToColumn={props.dropCardToColumn}
                                cards={col.cards}
                                col={col.order}/>
                })
            }
        </>
    )
};

const mapStateToProps = (state: StateType) => {
    return {
        columns: state.game.gameField.columns
    }
};

const mapDispatchToProps = {
    dropCardToColumn: (col: number, idsArr: Array<string>) => dropCardToColumnThunk(col, idsArr)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxType = ConnectedProps<typeof connector>

export default connector(ColumnsContainer)
