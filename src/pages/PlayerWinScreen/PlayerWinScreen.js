import { useState } from 'react';
import './PlayerWinScreen.scss'
import { useNavigate, useParams } from 'react-router-dom';

const PlayerWinScreen = () => {
    const { player } = useParams();
    const navigate = useNavigate();

    const handleRestartClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h3>{player} wins!</h3>
            <button onClick={handleRestartClick}>Restart</button>
        </div>
    )
}

export default PlayerWinScreen;