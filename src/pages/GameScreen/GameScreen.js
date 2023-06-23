import './GameScreen.scss';

import Player1HealthAP from '../../components/Player1HealthAP/Player1HealthAP';
import Player2HealthAP from '../../components/Player2HealthAP/Player2HealthAP';
import Map from '../../components/Map/Map';
import PlayerReference from '../../components/PlayerReference/PlayerReference';
import ActionLog from '../../components/ActionLog/ActionLog';
import { getAdjacentCells, isValidCell } from '../../components/PlayerReference/PlayerReference';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const GameScreen = ({player1, player2}) => {
    const [player1Health, setPlayer1Health] = useState(2)
    const [player2Health, setPlayer2Health] = useState(2)
    const [player1AP, setPlayer1AP] = useState(2)
    const [player2AP, setPlayer2AP] = useState(2)
    const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 });
    const [player2Position, setPlayer2Position] = useState({ x: 3, y: 3 });
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('player1');

    const handleSkip = () => {
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    };

    const onMove = (adjacentCells) => {
        setHighlightedCells(adjacentCells);
    };

    const handleCellClick = (position) => {
        if (currentPlayer === 'player1') {
            setPlayer1Position(position);
        } else {
            setPlayer2Position(position);
        }
        setHighlightedCells([]);
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    };

    // const onCellClick = (position) => {
    //     const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
    //     if (currentPlayerPosition.x === position.x && currentPlayerPosition.y === position.y) {
    //         return;
    //     }

    //     const adjacentCells = getAdjacentCells(currentPlayerPosition);
    //     const isValidMove = adjacentCells.some(
    //         ({ x, y }) => x === position.x && y === position.y
    //     );
    //     if (isValidMove) {
    //         if (currentPlayer === 'player1') {
    //             setPlayer1Position(position);
    //         } else {
    //             setPlayer2Position(position);
    //         }
    //         setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    //     }
    // };

    // const getAdjacentCells = ({ x, y }) => {
    //     const directions = [
    //         { dx: -1, dy: 0 }, //Left
    //         { dx: 1, dy: 0 }, //Right
    //         { dx: 0, dy: -1 }, //Up
    //         { dx: 0, dy: 1 }, //Down
    //     ];

    //     const adjacentCells = directions.map(({ dx, dy }) => ({ x: x + dx, y: y + dy })).filter(({ x, y }) => isValidCell(x, y));

    //     return adjacentCells;
    // };

    // const isValidCell = (x, y) => {
    //     return x >= 0 && x < 4 && y >= 0 && y < 4;
    // };

    return (
        <div className='gamescreen'>
            <header className='header'>
                <Player1HealthAP 
                    player1Health={player1Health} 
                    player1AP={player1AP}
                    player1={player1} />
                <Player2HealthAP 
                    player2Health={player2Health}
                    player2AP={player2AP}
                    player2={player2} />
            </header>
            <div className='map'>
                <Map 
                    player1Position={player1Position} 
                    player2Position={player2Position}
                    currentPlayer={currentPlayer}
                    highlightedCells={highlightedCells}
                    onCellClick={handleCellClick} 
                />
            </div>
            <footer className='footer'>
                <PlayerReference 
                    player1Position={player1Position}
                    setPlayer1Position={setPlayer1Position}
                    player2Position={player2Position}
                    setPlayer2Position={setPlayer2Position}
                    player1AP={player1AP}
                    player2AP={player2AP}
                    highlightedCells={highlightedCells}
                    onMove={onMove}
                    currentPlayer={currentPlayer}
                    handleCellClick={handleCellClick}
                    onSkip={handleSkip} />
                <ActionLog 
                    player1Position={player1Position} 
                    player2Position={player2Position}
                    player1={player1}
                    player2={player2} />
            </footer>
        </div>
    )
}

export default GameScreen;