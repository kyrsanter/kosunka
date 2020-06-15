import React, {FC, useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {StateType} from "../redux/store";
import Stack from "../components/stack/stack";
import {dropCardThunk} from "../redux/thunk";


const StackContainer: FC<PropsFromReduxType> = (props) => {
    let {remainingCards} = props;

    if (remainingCards.length === 0) {
        return null
    }

    return (
        <>
            <Stack dropCard={props.dropCard} remainingCards={remainingCards}/>
        </>
    )
};


const mapStateToProps = (state: StateType) => {
    return {
        remainingCards: state.game.gameField.remainingCards
    }
};

const mapDispatchToProps = {
    dropCard: (id: number, suite: string) => dropCardThunk(id, suite)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxType = ConnectedProps<typeof connector>

export default connector(StackContainer)

