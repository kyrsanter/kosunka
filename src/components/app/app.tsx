import React, {FC} from "react";
import './app.css'
import GameContainer from "../../containers/game-container";



const App: FC = () => {
    return (
        <div className="container">
            <GameContainer />
        </div>
    )
};

export default App;