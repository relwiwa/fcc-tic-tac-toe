import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React from 'react';

import SPEX from '../data/t3-spex';

import '../styles/t3-status.scss';

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

  const renderAvatarIcon = (avatarIcon) => <FontAwesomeIcon icon={SPEX.avatarIcons[avatarIcon]} />;

  return (
    <div className="t3-status grid-x text-center">
      <h4 className={'cell small-2' + (currentPlayer !== null && currentPlayer === SPEX.player.name.player1 ? ' status-avatar-active' : '')}>{renderAvatarIcon(player1.avatar)}</h4>
      <h4 className="cell small-8">{renderDifficulty()}</h4>
      <h4 className={'cell small-2' + (currentPlayer !== null && currentPlayer === SPEX.player.name.player2 ? ' status-avatar-active' : '')}>{renderAvatarIcon(player2.avatar)}</h4>
    </div>
  );
}

export default T3Status;
