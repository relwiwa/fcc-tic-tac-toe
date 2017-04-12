import React from 'react';

import SPEX from '../data/t3-spex';

const T3Cell = (props) => {
  const { cellData, cellId, gameHistory, gameStatus, onUserMove, turn } = props;
  
  const checkWinningCell = () => {
    if (gameStatus === SPEX.gameStatus.ended) {
    const currentResult = gameHistory[gameHistory.length - 1];
      if (currentResult.winner !== null) {
        const winningCells = currentResult.cells;
        return (winningCells.indexOf(cellId) >= 0) ? true : false;
      }
    }
  }

  const isWinningCell = checkWinningCell();

  return (
    <div className="t3-cell column column-block text-center">
      <div
        className={isWinningCell ? 'cell-active' : ''}
        onClick={(turn === SPEX.turn.user && cellData === '-') ? (event) => onUserMove(event, cellId) : null}
      >
        <span>
          {cellData !== '-' ? cellData : ''}
        </span>
      </div>
    </div>
  );
}

export default T3Cell;
