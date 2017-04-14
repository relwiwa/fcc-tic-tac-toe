import React from 'react';

const T3Controls = (props) => {
  const { difficulty, numberOfRounds, onShowOptions, onStartGame, player1, showOptions } = props;

  return (
    <div className="t3-controls row">
      <div className="text-center column small-12">
        <div className="button-group">
          {(numberOfRounds > 0 && !showOptions) && <button
            className="button primary text-center"
            onClick={onShowOptions}
          >Change options</button>}
          {(player1 !== null && difficulty !== null) && <button
            className="button primary text-center"
            onClick={onStartGame}
          >Play {numberOfRounds > 0 ? ' again' : null}</button>}
        </div>
      </div>
    </div>
  );
}

export default T3Controls;
