import './Map.scss';
import { useState } from 'react';
import Cell from '../Cell/Cell';

const Map = ({ player1Position, player2Position }) => {
    const renderMap = () => {
        const map = [];
        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                row.push(
                    <Cell
                        isPlayer1={i === player1Position.x && j === player1Position.y}
                        isPlayer2={ i === player2Position.x && j === player2Position.y}
                        key={`${i}-${j}`}
                    />
                );
            }
            map.push(row);
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