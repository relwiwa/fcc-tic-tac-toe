import React, { Component } from 'react';

import T3Cell from './t3-cell';
import T3Status from './t3-status';

import SPEX from '../data/t3-spex';

import '../styles/t3-board.scss';

const T3Board = (props) => {
  const { cellSpex, currentPlayer, difficulty, gameHistory, gameMode, gameStatus, player1, player2 } = props;

  return (
    <div className="t3-board grid-x align-center">
      <div className="cell medium-9 large-8">
        {(player1 !== null && gameStatus !== null) && <T3Status
          currentPlayer={currentPlayer}
          difficulty={gameMode === SPEX.gameMode.demo ? null : difficulty}
          gameHistory={gameHistory}
          player1={player1}
          player2={player2}
        />}
        <div className="grid-x small-up-3">
          {cellSpex.map((cellSpec) => {
            return (
              <T3Cell
                key={cellSpec.key}
                onClick={cellSpec.onClick}
                content={cellSpec.content}
                status={cellSpec.status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default T3Board;
