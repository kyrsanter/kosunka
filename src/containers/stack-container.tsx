import React, {FC, useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {StateType} from "../redux/store";
import Stack from "../components/stack/stack";
import {dropCardThunk, turnOverStackCardThunk} from "../redux/thunk";


const StackContainer: FC<PropsFromReduxType> = (props) => {
    let {remainingCards} = props;

    if (remainingCards.length === 0) {
        return null
    }

    return (
        <>
            <Stack turnOverCard={props.turnOverCard} remainingCards={remainingCards} turnedCards={props.turnedCards}/>
        </>
    )
};


const mapStateToProps = (state: StateType) => {
    return {
        remainingCards: state.game.gameField.remainingCards,
        turnedCards: state.game.gameField.turnedStackCards
    }
};

const mapDispatchToProps = {
    turnOverCard: (cardName: string) => turnOverStackCardThunk(cardName)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxType = ConnectedProps<typeof connector>

export default connector(StackContainer)

