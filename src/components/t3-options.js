import React from 'react';

import T3OptionsDifficulty from './t3-options-difficulty';
import T3OptionsAvatar from './t3-options-avatar';

const T3Options = (props) => {
  const { difficulty, player1} = props;
  const { onChangeDifficulty, onChangeAvatar } = props;

  return (
    <div className="t3-options row">
      <T3OptionsAvatar
        avatar={player1.avatar}
        onChangeAvatar={onChangeAvatar}
      />
      {player1.avatar !== null && <T3OptionsDifficulty
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />}
    </div>
  );
}

export default T3Options;
