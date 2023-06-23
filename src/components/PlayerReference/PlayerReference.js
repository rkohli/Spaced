import { useState } from 'react';
import './PlayerReference.scss';

const PlayerReference = ({ currentPlayer, onSkip, player1Position, player2Position }) => {
    const currentPlayerName = currentPlayer === 'player1' ? 'Player 1' : 'Player 2';
    const [isMoveEnabled, setIsMoveEnabled] = useState(false);
    const [highlightedCells, setHighlightedCells] = useState([]);
    
    const handleMove = () => {
        setIsMoveEnabled(true);
        setHighlightedCells(getAdjacentCells(currentPlayer === 'player1' ? player1Position : player2Position));
    }

    const getAdjacentCells = ({ x, y }) => {
        const adjacentCells = [];
        const directions = [
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }, // Right
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }, // Down
        ];

        for (const { dx, dy } of directions) {
            const adjacentX = x + dx;
            const adjacentY = y + dy;

            if (isValidCell(adjacentX, adjacentY)) {
                adjacentCells.push({ x: adjacentX, y: adjacentY });
            }
        }

        return adjacentCells;
    };

    const isValidCell = (x, y) => {
        return x >= 0 && x < 4 && y >= 0 && y < 4;
    }

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
                    <button className="reference__button" onClick={handleMove}>Move - 1 AP</button>
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
    )
}

export default PlayerReference;