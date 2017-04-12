import React from 'react';

import SPEX from '../data/t3-spex';

const T3Dialog = (props) => {
  const { gameResult } = props;

  return (
    <div className="t3-dialog-text callout primary">
      {gameResult === SPEX.turn.user && 'You won!'}    
      {gameResult === SPEX.turn.ai && 'You lost!'}    
      {gameResult === null && 'It is a tie!'}    
    </div>
  );
}

export default T3Dialog;
