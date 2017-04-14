import React, { Component } from 'react';

import T3Cell from './t3-cell';

const T3Board = (props) => {
  const { cellSpex } = props;

  return (
    <div className="t3-board row small-up-3">
      {cellSpex.map((cellSpec) => {
        return (
          <T3Cell
            onClick={cellSpec.onUserMove}
            content={cellSpec.content}
            status={cellSpec.status}
          />
        );
      })}
    </div>
  );
};

export default T3Board;
