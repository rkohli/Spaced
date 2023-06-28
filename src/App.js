import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home";
import GameScreen from "./pages/GameScreen/GameScreen";
import PlayerWinScreen from "./pages/PlayerWinScreen/PlayerWinScreen";

const App = () => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("")

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    exact path="/" 
                    element={<Home setPlayer1={setPlayer1} setPlayer2={setPlayer2}/>} 
                />
                <Route 
                    path="/game/:username1/:username2" 
                    element={<GameScreen player1={player1} player2={player2}/>} 
                />
                <Route 
                    path="/winner/:player" 
                    element={<PlayerWinScreen />}
                    // render={({ match }) => <PlayerWinScreen player={match.params.player} />} 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;