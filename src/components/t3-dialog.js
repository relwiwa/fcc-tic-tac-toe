import React from 'react';

import SPEX from '../data/t3-spex';

const T3Dialog = (props) => {
  const { gameResult } = props;
  console.log(gameResult);

  return (
    <div className="t3-dialog-text callout primary text-center">
      {gameResult !== null && gameResult.avatar.toUpperCase() + ' won'}    
      {gameResult === null && 'It is a tie!'}    
    </div>
  );
}

export default T3Dialog;
