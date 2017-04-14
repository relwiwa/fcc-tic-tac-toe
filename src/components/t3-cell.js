import React from 'react';

const T3Cell = (props) => {
  const { content, onClick, status } = props;
  
  return (
    <div className={'t3-cell column column-block text-center'}>
      <div
        className={(status === 'active' ? 'active' : '') + (onClick ? ' hoverable' : '')}
        onClick={(onClick) ? (event) => onClick(event) : null}
      >
        <span>
          {content}
        </span>
      </div>
    </div>
  );
}

export default T3Cell;
