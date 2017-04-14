import React from 'react';

import SPEX from '../data/t3-spex';

const T3OptionsAvatar = (props) => {
  const { onChangeAvatar, avatar } = props;

  const renderAvatarButton = (item) => {
    return (
      <button
        className={'button ' + (item === avatar ? 'selection' : 'primary')}
        onClick={item === avatar ? null : (event) => onChangeAvatar(event, item)}
      >
        {item.toUpperCase()}
      </button>
    );
  };

  return (
    <div className="t3-options-avatar text-center column small-12">
      <h4>X or O?</h4>
      <div className="button-group">
        {renderAvatarButton(SPEX.avatar.x)}
        {renderAvatarButton(SPEX.avatar.o)}
      </div>
    </div>
  );
}

export default T3OptionsAvatar;
