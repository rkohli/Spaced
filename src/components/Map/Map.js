import './Map.scss';
import { useState } from 'react';
import Cell from '../Cell/Cell';

const Map = ({ 
    player1Position, 
    player2Position, 
    currentPlayer, 
    onCellClick, 
    highlightedCells, 
    isHighlighted, 
    isListenCellHighlighted, 
}) => {
    const renderMap = () => {
        const map = [];
        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const isPlayer1Visible = 
                    currentPlayer === 'player1' && (i === player1Position.x && j === player1Position.y);
                const isPlayer2Visible = 
                    currentPlayer === 'player2' && (i === player2Position.x && j === player2Position.y);

                const isCellHighlighted = highlightedCells.some((cell) => cell.x === i && cell.y === j);

                let cellClassName = `cell ${
                    isPlayer1Visible ? 'cell-player1' : ''} 
                    ${isPlayer2Visible ? 'cell-player2' : ''} 
                    ${isCellHighlighted ? 'cell-highlighted' : ''} 
                    ${isListenCellHighlighted && isPlayer1Visible ? 'cell-listen-highlighted' : ''
                    }`;
                
                row.push(
                    <Cell
                        isPlayer1={isPlayer1Visible}
                        isPlayer2={isPlayer2Visible}
                        isHighlighted={isCellHighlighted}
                        key={`${i}-${j}`}
                        onClick={() => onCellClick({ x: i, y: j })}
                    />
                );
            }
            map.push(<div key={i} className='row'>{row}</div>);
        }
        return map;
    };

    return (
        <div className='map'>
            {renderMap()}
        </div>
    );
};

export default Map;