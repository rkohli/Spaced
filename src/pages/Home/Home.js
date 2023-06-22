import './Home.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leaderboard from "../../components/Leaderboard/Leaderboard";

const Home = ({ setPlayer1, setPlayer2 }) => {
    const navigate = useNavigate();
    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlayer1(username1);
        setPlayer2(username2);
        navigate(`/game/${encodeURIComponent(username1)}/${encodeURIComponent(username2)}`);
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
                        />
                    </div>
                    <button className='name__form--button' type='submit'>Start Game</button>
                </form>
            </div>
            <div>
                <Leaderboard />
            </div>
        </div>
    )
}

export default Home;