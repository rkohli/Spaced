import './GameScreen.scss';

import Player1HealthAP from '../../components/Player1HealthAP/Player1HealthAP';
import Player2HealthAP from '../../components/Player2HealthAP/Player2HealthAP';
import Map from '../../components/Map/Map';
import PlayerReference from '../../components/PlayerReference/PlayerReference';
import ActionLog from '../../components/ActionLog/ActionLog';
import SwitchPlayer from '../../components/SwitchPlayer/SwitchPlayer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const GameScreen = ({player1, player2}) => {
    const [player1Health, setPlayer1Health] = useState(2)
    const [player2Health, setPlayer2Health] = useState(2)
    const [player1AP, setPlayer1AP] = useState(3)
    const [player2AP, setPlayer2AP] = useState(3)
    // const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 });
    // const [player2Position, setPlayer2Position] = useState({ x: 3, y: 3 });
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [isMoveButtonClicked, setIsMoveButtonClicked] = useState(false);
    const [isListenCellHighlighted, setIsListenCellHighlighted] = useState(false);
    const [isKnifeButtonClicked, setIsKnifeButtonClicked] = useState(false);
    const [isShootButtonClicked, setIsShootButtonClicked] = useState(false);
    const [showSwitchPlayer, setShowSwitchPlayer] = useState(true);
    const [actionLog, setActionLog] = useState([]);

    const currentPlayerName = currentPlayer === 'player1' ? `${player1}` : `${player2}`;
    const opposingPlayerName = currentPlayer === 'player1' ? `${player2}` : `${player1}`;
    const navigate = useNavigate();

    const getRandomPositon = () => {
        const randomX = Math.floor(Math.random() * 4);
        const randomY = Math.floor(Math.random() * 4);
        return { x: randomX, y: randomY };
    }
    const [player1Position, setPlayer1Position] = useState(getRandomPositon());
    const [player2Position, setPlayer2Position] = useState(getRandomPositon());

    const handleMoveButtonClick = () => {
        setIsMoveButtonClicked(true);
        setIsKnifeButtonClicked(false);
        setIsShootButtonClicked(false);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const adjacentCells = getAdjacentCells(currentPlayerPosition);
        setHighlightedCells([...adjacentCells, currentPlayerPosition]);
        setShowSwitchPlayer(false);
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

        setShowSwitchPlayer(false);
        addActionToLog('Listen');
    };

    const handleKnifeClick = () => {
        setIsKnifeButtonClicked(true);
        setIsMoveButtonClicked(false);
        setIsShootButtonClicked(false);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        const adjacentCells = getAdjacentCells(currentPlayerPosition);
        setHighlightedCells([...adjacentCells, currentPlayerPosition]);
        setShowSwitchPlayer(false);

    }

    const handleShootClick = () => {
        setIsShootButtonClicked(true);
        setIsKnifeButtonClicked(false);
        setIsMoveButtonClicked(false);
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        const rowCells = getRowCells(currentPlayerPosition.x).filter(cell => !(cell.x === currentPlayerPosition.x && cell.y === currentPlayerPosition.y));
        const columnCells = getColumnCells(currentPlayerPosition.y).filter(cell => !(cell.x === currentPlayerPosition.x && cell.y === currentPlayerPosition.y));
        setHighlightedCells([...rowCells, ...columnCells])
        setShowSwitchPlayer(false);
    }

    const handleCellClick = (position, cellID) => {
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;
        const opposingPlayerPosition = currentPlayer === 'player1' ? player2Position : player1Position;
        
        if (!isMoveButtonClicked && !isKnifeButtonClicked && !isShootButtonClicked) {
            return;
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
                addActionToLog('Move');
                return;
            }
        }

        if (isKnifeButtonClicked) {
            if (isCellHighlighted(position)) {
                if (currentPlayer === 'player1') {
                    if (opposingPlayerPosition.x === position.x && opposingPlayerPosition.y === position.y) {
                        setPlayer2Health(player2Health - 1);
                        if (player2Health - 1 === 0) {
                            navigate(`/winner/${player1}`);
                            return;
                        }
                    }
                    setPlayer1AP(player1AP - 2);
                } else {
                    if (opposingPlayerPosition.x === position.x && opposingPlayerPosition.y === position.y) {
                        setPlayer1Health(player1Health - 1);
                        if (player1Health - 1 === 0) {
                            navigate(`/winner/${player2}`);
                            return;
                        }
                    }
                    setPlayer2AP(player2AP - 2);
                }
                setHighlightedCells([]);
                setIsKnifeButtonClicked(false);
                addActionToLog('Knife');
                return;
            }
        }

        if (isShootButtonClicked) {
            if (isCellHighlighted(position)) {
                if (currentPlayer === 'player1') {
                    if (opposingPlayerPosition.x === position.x) {
                        setPlayer2Health(player2Health - 1);
                    } else if (opposingPlayerPosition.y === position.y) {
                        setPlayer2Health(player2Health - 1);
                    }
                    setPlayer1AP(player1AP - 2);
                    if (player2Health - 1 === 0) {
                        navigate(`/winner/${player1}`);
                        return;
                    }
                } else {
                    if (opposingPlayerPosition.x === position.x) {
                        setPlayer1Health(player1Health - 1);
                    } else if (opposingPlayerPosition.y === position.y) {
                        setPlayer1Health(player1Health - 1);
                    }
                    setPlayer2AP(player2AP - 2);
                    if (player1Health - 1 === 0) {
                        navigate(`/winner/${player2}`);
                        return;
                    }
                }
                setHighlightedCells([]);
                setIsShootButtonClicked(false);
                addActionToLog('Shoot', cellID);
                return;
            }
        }
    };

    const handleSkip = () => {
        setIsMoveButtonClicked(false);
        setIsKnifeButtonClicked(false);
        setIsShootButtonClicked(false);
        setHighlightedCells([]);
        setShowSwitchPlayer(true);
    };

    const handleNext = () => {
        setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        setHighlightedCells([]);
        setIsListenCellHighlighted(false);
        setPlayer1AP(3);
        setPlayer2AP(3)
        setShowSwitchPlayer(false);
    } 

    const onMove = (adjacentCells) => {
        setHighlightedCells(adjacentCells);
        setIsListenCellHighlighted(false);
    };

    const isCellHighlighted = (position) => {
       return highlightedCells.some(
        (cell) => cell.x === position.x && cell.y === position.y)};

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

    const getRowCells = (rowIndex) => {
        const cells = [];
        for (let y = 0; y < 4; y++) {
            cells.push({ x: rowIndex, y });
        }
        return cells;
    };

    const getColumnCells = (columnIndex) => {
        const cells = [];
        for (let x = 0; x < 4; x++) {
            cells.push({ x, y: columnIndex });
        }
        return cells;
    };

    const isValidCell = (x, y) => {
        return x >= 0 && x < 4 && y >= 0 && y < 4;
    };

    const addActionToLog = (action, cellID) => {
        let actionMessage;
        const currentPlayerPosition = currentPlayer === 'player1' ? player1Position : player2Position;

        switch (action) {
            case 'Move':
                actionMessage = `${currentPlayerName} moved for 1 AP`;
                break;
            case 'Listen':
                actionMessage = `${currentPlayerName} listened for 1 AP`;
                break;
            case 'Knife':
                actionMessage = `${currentPlayerName} knifed for 2 AP`;
                break;
            case 'Shoot':
                const currentPlayerCellID = currentPlayerPosition.y * 4 + currentPlayerPosition.x + 1
                actionMessage = `${currentPlayerName} shot from Room ${currentPlayerCellID} for 2 AP`;
                break;
            default:
                actionMessage = '';
                break;
        }

        setActionLog([...actionLog, actionMessage]);
    };

    return (
        <div className='gamescreen'>
            <header className='gamescreen__header'>
                <Player1HealthAP 
                    player1Health={player1Health} 
                    player1AP={player1AP}
                    player1={player1} />
                <h2 className='gamescreen__header--title'>Spaced!</h2>
                <Player2HealthAP 
                    player2Health={player2Health}
                    player2AP={player2AP}
                    player2={player2} />
            </header>
            {showSwitchPlayer && (
                <SwitchPlayer 
                    opposingPlayerName={opposingPlayerName}
                    onBack={() => setShowSwitchPlayer(false)}
                    onNext={handleNext}
                />
            )}
            <footer className='gamescreen__footer'>
                <PlayerReference 
                    currentPlayer={currentPlayer}
                    currentPlayerName={currentPlayerName}
                    isMoveButtonClicked={isMoveButtonClicked}
                    onCellClick={handleCellClick}
                    handleMoveButtonClick={handleMoveButtonClick}
                    onListenClick={handleListenClick}
                    handleKnifeClick={handleKnifeClick}
                    handleShootClick={handleShootClick}
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
                <div className='gamescreen__map'>
                    <Map 
                        player1Position={player1Position} 
                        player2Position={player2Position}
                        currentPlayer={currentPlayer}
                        highlightedCells={highlightedCells}
                        isHighlighted={isCellHighlighted}
                        isListenCellHighlighted={isListenCellHighlighted}
                        onCellClick={handleCellClick} 
                        currentPlayerName={currentPlayerName}
                    />
                </div>
                <ActionLog 
                    player1={player1}
                    player2={player2}
                    actionLog={actionLog} />
            </footer>
        </div>
    )
}

export default GameScreen;