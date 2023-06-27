import "./Cell.scss"
import React from "react"

const Cell = ({ id, isPlayer1, isPlayer2, isHighlighted, onClick }) => {
    let cellClassName = `cell ${isPlayer1 ? 'cell-player1' : ''} ${isPlayer2 ? 'cell-player2' : ''} ${isHighlighted ? 'cell-highlighted' : ''}`;
    
    if (isPlayer1) {
        cellClassName += " cell-player1";
    } else if (isPlayer2) {
        cellClassName += " cell-player2";
    }

    return (
        <div className={cellClassName} onClick={onClick}>
            <span className="cell-id">{id}</span>
        </div>
    );
};

export default Cell;