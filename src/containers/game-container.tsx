import React, {FC, useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {StateType} from "../redux/store";
import {initThunk} from "../redux/thunk";
import Aces from "../components/aces/aces";
import ColumnsContainer from "./column-container";
import StackContainer from "./stack-container";
import AcesContainer from "./aces-container";

const GameContainer: FC<PropsFromReduxType> = (props) => {

    useEffect(() => {
        props.start()
    }, []);


    return (
        <>
            <div className="game-top">
                <StackContainer/>
                <AcesContainer />
            </div>
            <hr/>
            <div className="columns-wrapper">
                <ColumnsContainer />
            </div>
        </>
    )
};

const mapStateToProps = (state: StateType) => {
    return {

    }
};

const mapDispatchToProps = {
    start: () => initThunk()
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromReduxType = ConnectedProps<typeof connector>

export default connector(GameContainer)

