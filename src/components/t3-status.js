import React from 'react';

import SPEX from '../data/t3-spex';

const T3Status = (props) => {
  const { difficulty, turn, userAvatar } = props;

  const renderAiAvatar = () => {
    let aiAvatar = null;
    if (userAvatar !== null) {
      aiAvatar = (userAvatar === SPEX.userAvatar.x) ? SPEX.userAvatar.o : SPEX.userAvatar.x;
    }
    return aiAvatar;
  };

  const renderDifficulty = () => {
    return difficulty[0].toUpperCase() + difficulty.substr(1);
  };

  return (
    <div className="t3-status row text-center">
      <h4 className={'column small-2' + (turn === SPEX.turn.user ? ' status-avatar-active' : '')}>{userAvatar}</h4>
      <h4 className="column small-8">{renderDifficulty()}</h4>
      <h4 className={'column small-2' + (turn === SPEX.turn.ai ? ' status-avatar-active' : '')}>{renderAiAvatar()}</h4>
    </div>
  );
}

export default T3Status;
