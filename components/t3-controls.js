import React from 'react';

import IconButton from '../../../reusable-components/icon-button';
import SPEX from '../data/t3-spex';

import '../styles/t3-controls.scss';

const T3Controls = (props) => {
  const { difficulty, gameMode, gameStatus, numberOfRounds, player1, showOptions } = props;
  const { onSetupInitialGame, onShowOptions, onSetupGame, onStopCurrentGame } = props;

  return (
    <div className="t3-controls grid-x">
      <div className="text-center cell">
        <div className="button-group align-center">
          {(gameMode === SPEX.gameMode.demo) && <IconButton
            faIcon="play"
            foundationClass="primary"
            onClick={onSetupInitialGame}
            text="Start Game"
          />}
          {(gameMode !== SPEX.gameMode.demo && gameStatus === SPEX.gameStatus.ended && !showOptions) && <IconButton
            faIcon="cogs"
            foundationClass="primary"
            onClick={onShowOptions}
            text="Change Options"
          />}
          {(gameMode !== SPEX.gameMode.demo && gameStatus === SPEX.gameStatus.started && !showOptions) && <IconButton
            faIcon="stop"
            foundationClass="primary"
            onClick={onStopCurrentGame}
            text="Stop Current Game"
          />}
          {(gameMode === SPEX.gameMode.onePlayer && gameStatus !== SPEX.gameStatus.started && player1.avatar !== null && difficulty !== null) && <IconButton
            faIcon="play"
            foundationClass="primary"
            onClick={onSetupGame}
            text={'Play' + (numberOfRounds > 0 ? ' again' : '')}
          />}
          {(gameMode === SPEX.gameMode.twoPlayer && gameStatus !== SPEX.gameStatus.started && player1.avatar !== null) && <IconButton
            faIcon="play"
            foundationClass="primary"
            onClick={onSetupGame}
            text={'Play' + (numberOfRounds > 0 ? ' Again' : '')}
          />}
        </div>
      </div>
    </div>
  );
}

export default T3Controls;
