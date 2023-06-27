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
    handleKnifeClick, 
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
                    <button className="reference__button" onClick={handleMoveButtonClick} disabled={player1AP === 0 || player2AP === 0}>Move - 1 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button" onClick={onListenClick} disabled={player1AP === 0 || player2AP === 0}>Listen - 1 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button" onClick={handleKnifeClick} disabled={player1AP < 2 || player2AP < 2}>Knife - 2 AP</button>
                </div>
                <div className="reference__row">
                    <button className="reference__button" disabled={player1AP < 2 || player2AP < 2}>Shoot - 2 AP</button>
                </div>
            </div>
            <div className="skip">
                <button onClick={onSkip}>Next</button>
            </div>
        </div>
    );
};

export default PlayerReference;