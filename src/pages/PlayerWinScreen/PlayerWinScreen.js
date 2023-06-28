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
        <div className='win-screen'>
            <h3 className='win-screen__text'>{player} wins!</h3>
            <button className='restart-button' onClick={handleRestartClick}>Restart</button>
        </div>
    )
}

export default PlayerWinScreen;