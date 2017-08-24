import React from 'react';

import SPEX from '../data/t3-spex';

import '../styles/t3-cell.scss';

const T3Cell = (props) => {
  const { content, status } = props;
  const { onClick } = props;

  const renderContent = (content) => {
    const { avatarIcons, avatar: { x, o } } = SPEX;

    if (content === x || content === o) {
      return <i className={'fa fa-2x ' + avatarIcons[content]}></i>;
    }
    else {
      return content;
    }
  };
  
  return (
    <div className="t3-cell cell text-center">
      <div
        className={status + (onClick ? ' hoverable' : '')}
        onClick={(onClick) ? (event) => onClick(event) : null}
      >
        <span>
          {renderContent(content)}
        </span>
      </div>
    </div>
  );
}

export default T3Cell;
