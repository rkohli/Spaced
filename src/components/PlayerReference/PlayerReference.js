import { useState } from 'react';
import './PlayerReference.scss';

const PlayerReference = ({ currentPlayer, player1Position, setPlayer1Position, player2Position, setPlayer2Position, player1AP, player2AP, highlightedCells, onMove, handleCellClick, onSkip, isCellHighlighted }) => {
    const currentPlayerName = currentPlayer === 'player1' ? 'Player 1' : 'Player 2';
    const [isMoveButtonClicked, setIsMoveButtonClicked] = useState(false);
    
    const renderHighlightedCells = () => {
        return highlightedCells.map((cell, index) => (
            <div key={index} className={`cell ${isCellHighlighted(cell) ? 'highlighted' : ''}`} onClick={() => onCellClick(cell)}></div>
        ));
    };

    const onCellClick = (position) => {
        if (!isMoveButtonClicked) {
            return;
        }
        if (isMoveButtonClicked) {
            if (currentPlayer === 'player1') {
                setPlayer1Position(position);
            } else {
                setPlayer2Position(position);
            }
            setIsMoveButtonClicked(false);
            onMove([]);
        }
    };

    const handleMoveButtonClick = () => {
        setIsMoveButtonClicked(true);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const adjacentCells = getAdjacentCells(currentPlayerPosition);
        onMove(adjacentCells)
    };

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
                    <button className="reference__button">Listen - 1 AP</button>
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

const getAdjacentCells = ({ x, y }) => {
    const directions = [
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }, // Right
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 }, // Down
    ];

    const adjacentCells = directions.map(({ dx, dy }) => ({ x: x + dx, y: y + dy })).filter(({ x, y }) => isValidCell(x, y));

    return adjacentCells;
};

const isValidCell = (x, y) => {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
};

export default PlayerReference;
export { getAdjacentCells, isValidCell };