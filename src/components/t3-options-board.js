import React from 'react';

import T3Board from './t3-board';

import SPEX from '../data/t3-spex';

const T3OptionsBoard = (props) => {
  const { currentPlayer, difficulty, gameHistory, gameMode, gameStatus, player1, player2 } = props;
  const { onChangeAvatar, onChangeDifficulty, onChangeGameMode } = props;
  
  const createEmptyBoard = () => {
    let emptyBoard = [];
    for (let i = 0; i < 9; i++) {
      let cellSpec = {};
      cellSpec.content = '';
      cellSpec.onClick = null;
      cellSpec.key = i;
      emptyBoard.push(cellSpec);
    }
    return emptyBoard;
  }

  const setupCellSpex = (cellSpex, cells, options, referenceOption, callback) => {
    for (let i = 0; i < cells.length; i++) {
      cellSpex[cells[i]].content = options[i];
      if (referenceOption === options[i]) {
        cellSpex[cells[i]].status = 'active';
      }
      else {
        cellSpex[cells[i]].onClick = (event) => callback(options[i]);
      }
    }
    return cellSpex;
  }

  const setupInstructionCell = (cellSpex, cell) => {
    cellSpex[cell].status = 'static';    
    if (gameMode === null) {
      cellSpex[cell].content = 'Chose Players';
    }
    else if (player1.avatar === null) {
      cellSpex[cell].content = 'Chose Avatar';
    }
    else if (difficulty === null && gameMode !== SPEX.gameMode.twoPlayer) {
      cellSpex[cell].content = 'Chose Difficulty';      
    }
    else {
      cellSpex[cell].content = 'Change Options';            
    }
    return cellSpex;
  }

  const setupOptionCellSpex = () => {
    let cellSpex = createEmptyBoard();
    const gameModes = [SPEX.gameMode.onePlayer, SPEX.gameMode.twoPlayer];
    cellSpex = setupCellSpex(cellSpex, [0, 2], gameModes, gameMode, onChangeGameMode);
    if (gameMode !== null) {
      const avatars = [SPEX.avatar.x, SPEX.avatar.o];
      cellSpex = setupCellSpex(cellSpex, [3, 5], avatars, player1.avatar, onChangeAvatar);
    }
    if (player1.avatar !== null && gameMode !== SPEX.gameMode.twoPlayer) {
      const difficulties = [SPEX.difficulty.easy, SPEX.difficulty.medium, SPEX.difficulty.hard];
      cellSpex = setupCellSpex(cellSpex, [6, 7, 8], difficulties, difficulty, onChangeDifficulty);
    }
    cellSpex = setupInstructionCell(cellSpex, 4);
    return cellSpex;
  }
 
  return (
    <div className="t3-options-board">
      <T3Board
        cellSpex={setupOptionCellSpex()}
        currentPlayer={currentPlayer}
        difficulty={difficulty}
        gameHistory={gameHistory}
        gameMode={gameMode}
        gameStatus={gameStatus}
        player1={player1}
        player2={player2}
      />
    </div>
  );
}

export default T3OptionsBoard;
