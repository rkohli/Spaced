import { useState } from 'react';
import './PlayerReference.scss';

const PlayerReference = ({ 
    currentPlayer, 
    onSkip, 
    onMove, 
    player1AP, 
    player2AP, 
    player1Position, 
    setPlayer1Position, 
    player2Position, 
    setPlayer2Position, 
    highlightedCells, 
    handleCellClick, 
    isCellHighlighted, 
    getAdjacentCells, 
    isValidCell, 
    currentPlayerName, 
    isMoveButtonClicked, 
    renderHighlightedCells, 
    onCellClick, 
    handleMoveButtonClick, 
    onListenClick, 
}) => {

    return (
        <div className="actions">
            <div className="reference">
                <div className='reference__header'>
                    <h2 className='reference__header--text'>{currentPlayerName}'s Turn</h2>
                </div>
                <div className="reference__row">
                    <h3 className="reference__label">Action - Cost</h3>
                </div>
                <div className="reference__row">
                    <button className="reference__button" onClick={handleMoveButtonClick}>Move - 1 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button" onClick={onListenClick}>Listen - 1 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button">Knife - 2 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button">Shoot - 2 AP</button>
                </div>
            </div>
            <div className="skip">
                <button onClick={onSkip}>Skip</button>
            </div>
        </div>
    );
};

export default PlayerReference;