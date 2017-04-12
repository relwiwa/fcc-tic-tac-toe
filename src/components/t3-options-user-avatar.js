import React from 'react';

import SPEX from '../data/t3-spex';

const T3OptionsUserAvatar = (props) => {
  const { onChangeUserAvatar, userAvatar } = props;

  const renderUserAvatarButton = (item) => {
    return (
      <button
        className={'button ' + (item === userAvatar ? 'selection' : 'primary')}
        onClick={item === userAvatar ? null : (event) => onChangeUserAvatar(event, item)}
      >
        {item.toUpperCase()}
      </button>
    );
  };

  return (
    <div className="t3-options-user-avatar text-center column small-12">
      <h4>X or O?</h4>
      <div className="button-group">
        {renderUserAvatarButton(SPEX.avatar.x)}
        {renderUserAvatarButton(SPEX.avatar.o)}
      </div>
    </div>
  );
}

export default T3OptionsUserAvatar;
