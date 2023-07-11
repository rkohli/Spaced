import './Home.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setPlayer1, setPlayer2 }) => {
    const navigate = useNavigate();
    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");
    const [showInstructions, setShowInstructions] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlayer1(username1);
        setPlayer2(username2);
        navigate(`/game/${encodeURIComponent(username1)}/${encodeURIComponent(username2)}`);
    };

    const handleInstructionsClick = () => {
        setShowInstructions(!showInstructions);
    };

    return (
        <div className="Home">
            <header className="header">
                <h1 className="header__title">Spaced!</h1>
                <h3 className="header__subtitle">A turn based hidden movement game with deadly results</h3>
            </header>
            <div className="names">
                <form onSubmit={handleSubmit} className="name__form">
                    <div className="name__form--player">
                        <label 
                            className="name__form--label" 
                            htmlFor="player1Name">Player 1</label>
                        <input 
                            className="name__form--input" 
                            id="player1Name" 
                            name="player1Name" 
                            type="text" 
                            value={username1} 
                            onChange={(e) => setUsername1(e.target.value)} 
                            placeholder="Enter name here"
                            required 
                        />
                    </div>
                    <div className="name__form--player">
                        <label 
                            className="name__form--label" 
                            htmlFor="player2Name">Player 2</label>
                        <input 
                            className="name__form--input" 
                            id="player2Name" 
                            name="player2Name"
                            type="text"
                            value={username2}
                            onChange={(e) => setUsername2(e.target.value)}
                            placeholder="Enter name here" 
                            required
                        />
                    </div>
                    <div className='name__form--buttons'>
                        <button className='name__form--button--submit' type='submit'>Start</button>
                        <button className='name__form--button--instructions' onClick={handleInstructionsClick}>Instructions</button>
                    </div>
                    {showInstructions && (
                            <div className='instructions-panel'>
                                <p>Each player will start the game in a random location on the map with 2 Health. The first player to utilize their actions and the action log to find their opponent and reduce their opponent's Health to 0 will win!</p>
                                <p>Players will start each turn with 3 Action Points (AP) and will be able to spend them by performing actions like Move, Listen, Knife, and Shoot. Each action players take will be recorded at the top of the Action Log for both players to see.</p>
                                <p>When a player runs out of AP or is done taking their turn, they should click the Next Turn button and pass the screen to their opponent. In order to prevent cheating, when a player is taking their turn, their opponent should not be able to see the gamescreen.</p>
                                <ul>
                                    <li>Move costs 1 AP and will allow the player to move to an adjacent room (or to their own room) by clicking the room on the map.</li>
                                    <li>Listen costs 1 AP and will allow the player to see which quadrant of the map their opponent is in by highlighting those rooms.</li>
                                    <li>Knife costs 2 AP and will allow the player to attack an adjacent room (or their own room). If the chosen room contains their opponent, their opponent will lose 1 Health.</li>
                                    <li>Shoot costs 2 AP and will allow the player to shoot an entire row or column on the map by clicking any room in the highlighted row or column. If the chosen row or column (or the player's current room) contains their opponent, their opponent will lose 1 Health. While the Shoot action is powerful, it is also very loud, and will reveal the player's location in the Action Log.</li>
                                </ul>
                                <p className='instructions-panel--final'>Good luck, and good hunting!</p>
                            </div>
                        )}
                </form>
            </div>
        </div>
    )
}

export default Home;