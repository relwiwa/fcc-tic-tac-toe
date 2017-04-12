import React from 'react';

import T3OptionsDifficulty from './t3-options-difficulty';
import T3OptionsUserAvatar from './t3-options-user-avatar';

const T3Options = (props) => {
  const { difficulty, onChangeDifficulty, onChangeUserAvatar, userAvatar } = props;

  return (
    <div className="t3-options row">
      <T3OptionsUserAvatar
        userAvatar={userAvatar}
        onChangeUserAvatar={onChangeUserAvatar}
      />
      {userAvatar !== null && <T3OptionsDifficulty
        difficulty={difficulty}
        onChangeDifficulty={onChangeDifficulty}
      />}
    </div>
  );
}

export default T3Options;
