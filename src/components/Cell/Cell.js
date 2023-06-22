import "./Cell.scss"
import React from "react"

const Cell = ({ isPlayer1, isPlayer2, onClick }) => {
    const cellClassName = isPlayer1 
        ? "cell cell-player1" 
        : isPlayer2
        ? "cell cell-player2"
        : "cell";

    return (
        <div className={cellClassName} onClick={onClick} />
    );
};

export default Cell;