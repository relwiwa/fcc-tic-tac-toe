import React from 'react';

import SPEX from '../data/t3-spex';

const T3Controls = (props) => {
  const { difficulty, gameMode, gameStatus, numberOfRounds, player1, showOptions } = props;
  const { onSetupInitialGame, onShowOptions, onSetupGame } = props;

  return (
    <div className="t3-controls row">
      <div className="text-center column small-12">
        <div className="button-group">
          {(gameMode === SPEX.gameMode.demo) && <button
            className="button primary text-center"
            onClick={onSetupInitialGame}
          >Start Game</button>}
          {(gameMode !== SPEX.gameMode.demo && gameStatus === SPEX.gameStatus.ended && !showOptions) && <button
            className="button primary text-center"
            onClick={onShowOptions}
          >Change options</button>}
          {(gameMode === SPEX.gameMode.onePlayer && gameStatus !== SPEX.gameStatus.started && player1.avatar !== null && difficulty !== null) && <button
            className="button primary text-center"
            onClick={onSetupGame}
          >Play {numberOfRounds > 0 ? ' again' : null}</button>}
          {(gameMode === SPEX.gameMode.twoPlayer && gameStatus !== SPEX.gameStatus.started && player1.avatar !== null) && <button
            className="button primary text-center"
            onClick={onSetupGame}
          >Play {numberOfRounds > 0 ? ' again' : null}</button>}
        </div>
      </div>
    </div>
  );
}

export default T3Controls;
