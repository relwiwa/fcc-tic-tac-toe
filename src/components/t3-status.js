import React from 'react';

import SPEX from '../data/t3-spex';

const T3Status = (props) => {
  const { currentPlayer, difficulty, player1, player2 } = props;

  const renderDifficulty = () => {
    if (difficulty) {
      return difficulty[0].toUpperCase() + difficulty.substr(1);
    }
    else {
      return null;
    }
  };

  return (
    <div className="t3-status row text-center">
      <h4 className={'column small-2' + (currentPlayer !== null && currentPlayer === SPEX.player.name.player1 ? ' status-avatar-active' : '')}>{player1.avatar}</h4>
      <h4 className="column small-8">{renderDifficulty()}</h4>
      <h4 className={'column small-2' + (currentPlayer !== null && currentPlayer === SPEX.player.name.player2 ? ' status-avatar-active' : '')}>{player2.avatar}</h4>
    </div>
  );
}

export default T3Status;
