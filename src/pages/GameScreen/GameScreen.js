import './GameScreen.scss';

import Player1HealthAP from '../../components/Player1HealthAP/Player1HealthAP';
import Player2HealthAP from '../../components/Player2HealthAP/Player2HealthAP';
import Map from '../../components/Map/Map';
import PlayerReference from '../../components/PlayerReference/PlayerReference';
import ActionLog from '../../components/ActionLog/ActionLog';
import { useState } from 'react';

const GameScreen = ({player1, player2}) => {
    const [player1Health, setPlayer1Health] = useState(2)
    const [player2Health, setPlayer2Health] = useState(2)
    const [player1AP, setPlayer1AP] = useState(3)
    const [player2AP, setPlayer2AP] = useState(3)
    const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 });
    const [player2Position, setPlayer2Position] = useState({ x: 3, y: 3 });
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [isMoveButtonClicked, setIsMoveButtonClicked] = useState(false);
    const [isListenCellHighlighted, setIsListenCellHighlighted] = useState(false);
    const [isKnifeButtonClicked, setIsKnifeButtonClicked] = useState(false)

    const currentPlayerName = currentPlayer === 'player1' ? 'Player 1' : 'Player 2';

    const handleMoveButtonClick = () => {
        setIsMoveButtonClicked(true);
        setIsKnifeButtonClicked(false);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const adjacentCells = getAdjacentCells(currentPlayerPosition);
        setHighlightedCells([...adjacentCells, currentPlayerPosition]);
    };

    const handleListenClick = () => {
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        const quadrantX = opposingPlayerPosition.x < 2 ? 0 : 2;
        const quadrantY = opposingPlayerPosition.y < 2 ? 0 : 2;
        const listenCells = [];
    
        for (let i = quadrantX; i < quadrantX + 2; i++) {
            for (let j = quadrantY; j < quadrantY + 2; j++) {
                listenCells.push({ x: i, y: j });
            }
        }
    
        setHighlightedCells(listenCells);
        setIsMoveButtonClicked(false);
        setIsListenCellHighlighted(true);
        if (currentPlayer === 'player1') {
            setPlayer1AP(player1AP - 1);
        } else {
            setPlayer2AP(player2AP - 1);
        }
    };

    const handleKnifeClick = () => {
        setIsKnifeButtonClicked(true);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        const adjacentCells = getAdjacentCells(currentPlayerPosition);
        setHighlightedCells([...adjacentCells, currentPlayerPosition]);
    }

    const handleCellClick = (position) => {
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        if (!isMoveButtonClicked && !isKnifeButtonClicked) {
            return;
        } 
        
        if (isKnifeButtonClicked) {
            if (isCellHighlighted(position)) {
                if (currentPlayer === 'player1') {
                    if (opposingPlayerPosition.x === position.x && opposingPlayerPosition.y === position.y) {
                        setPlayer2Health(player2Health - 1);
                    }
                    setPlayer1AP(player1AP - 2);
                } else {
                    if (opposingPlayerPosition.x === position.x && opposingPlayerPosition.y === position.y) {
                        setPlayer1Health(player1Health - 1);
                    }
                    setPlayer2AP(player2AP - 2);
                }
                setHighlightedCells([]);
                setIsKnifeButtonClicked(false);
                return;
            }
        }
        if (isMoveButtonClicked) {
            if (isCellHighlighted(position)) {
                if (currentPlayer === 'player1') {
                    setPlayer1Position(position);
                    setPlayer1AP(player1AP - 1);
                } else {
                    setPlayer2Position(position);
                    setPlayer2AP(player2AP - 1);
                }
                setHighlightedCells([]);
                setIsMoveButtonClicked(false);
                return;
            }
        }
    };

    const handleSkip = () => {
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        setHighlightedCells([]);
        setIsListenCellHighlighted(false);
        setPlayer1AP(3);
        setPlayer2AP(3);
    };

    const onMove = (adjacentCells) => {
        setHighlightedCells(adjacentCells);
        setIsListenCellHighlighted(false);
    };

    const isCellHighlighted = (position) => 
    highlightedCells.some((cell) => cell.x === position.x && cell.y === position.y);

    const getAdjacentCells = ({ x, y }) => {
        const directions = [
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }, // Right
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }, // Down
        ];

        const adjacentCells = directions
            .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
            .filter(({ x, y }) => isValidCell(x, y));

        return adjacentCells;
    };

    const isValidCell = (x, y) => {
        return x >= 0 && x < 4 && y >= 0 && y < 4;
    };

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
                    isHighlighted={isCellHighlighted}
                    isListenCellHighlighted={isListenCellHighlighted}
                    onCellClick={handleCellClick} 
                />
            </div>
            <footer className='footer'>
                <PlayerReference 
                    currentPlayer={currentPlayer}
                    currentPlayerName={currentPlayerName}
                    isMoveButtonClicked={isMoveButtonClicked}
                    onCellClick={handleCellClick}
                    handleMoveButtonClick={handleMoveButtonClick}
                    onListenClick={handleListenClick}
                    handleKnifeClick={handleKnifeClick}
                    onSkip={handleSkip}
                    onMove={onMove}
                    player1AP={player1AP}
                    player2AP={player2AP}
                    player1Position={player1Position}
                    setPlayer1Position={setPlayer1Position}
                    player2Position={player2Position}
                    setPlayer2Position={setPlayer2Position}
                    highlightedCells={highlightedCells}
                    isCellHighlighted={isCellHighlighted}
                    getAdjacentCells={getAdjacentCells}
                    isValidCell={isValidCell}
                    />
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