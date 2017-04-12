import React from 'react';

import SPEX from '../data/t3-spex';

const T3Status = (props) => {
  const { aiAvatar, difficulty, turn, userAvatar } = props;

  const renderDifficulty = () => {
    return difficulty[0].toUpperCase() + difficulty.substr(1);
  };

  return (
    <div className="t3-status row text-center">
      <h4 className={'column small-2' + (turn === SPEX.player.user ? ' status-avatar-active' : '')}>{userAvatar}</h4>
      <h4 className="column small-8">{renderDifficulty()}</h4>
      <h4 className={'column small-2' + (turn === SPEX.player.ai ? ' status-avatar-active' : '')}>{aiAvatar}</h4>
    </div>
  );
}

export default T3Status;
