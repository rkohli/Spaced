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
                    </div>
                </form>
                <button className='name__form--button--instructions' onClick={handleInstructionsClick}>Instructions</button>
                {showInstructions && (
                    <div className='instructions-panel'>
                        <p>Welcome to "Spaced!" – the thrilling 2-player man hunt where strategy and stealth collide!</p>
                        <p>Your challenge? Start in a random spot on the map with 2 Health. Your goal: track down your rival and drain their Health to zero. First to do it wins!</p>
                        <p>Ready for action? You've got 3 Action Points (AP) each turn. Unleash actions like a pro: Move, Listen, Knife, and Shoot.</p> 
                        <p>But remember - every play's recorded on the action-packed Action Log, and is shared by both players.</p>
                        <p>Honor above all! When your AP is spent or you're passing the game, hit Next Turn and don't peek at your rival's screen! Keep the suspense alive!</p>
                        <ul>
                            <li>Move: Slide & conquer! For 1 AP, hop to an adjacent room or back to yours. Just tap on the map to move.</li>
                            <li>Listen: Call the shadows! Use 1 AP to light up four rooms your rival might lurk in. Watch out – they could be in yours!</li>
                            <li>Knife: Strike with precision! Spend 2 AP to knife an adjacent room or even your own. Hit the mark, they lose 1 Health.</li>
                            <li>Shoot: Rain chaos! For 2 AP, blast a whole row or column. Just click a lit room. Score a hit, they lose 1 Health. But beware, the powerful Shoot action will let your opponent know where you shot from!</li>
                        </ul>
                        <p className='instructions-panel--final'>Ready for the hunt? Best of luck, and may the slyest hunter triumph!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;