import React, {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import {StateType} from "../redux/store";
import Aces from "../components/aces/aces";
import {dropCardThunk} from "../redux/thunk";

const AcesContainer: FC<PropsFromReduxType> = (props) => {
    return <Aces aces={props.aces} dropCard={props.dropCard}/>;
};

const mapStateToProps = (state: StateType) => {
    return {
        aces: state.game.gameField.aces
    }
};

const mapDispatchToProps = {
    dropCard: (id: number, suite: string) => dropCardThunk(id, suite)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxType = ConnectedProps<typeof connector>

export default connector(AcesContainer)
