import React from 'react';

import SPEX from '../data/t3-spex';

const T3OptionsDifficulty = (props) => {
  const { difficulty, onChangeDifficulty } = props;
  
  const renderDifficultyButton = (item) => {
    return (
      <button
        className={'button ' + (item === difficulty ? 'selection' : 'primary')}
        onClick={item === difficulty ? null : (event) => onChangeDifficulty(event, item)}
      >
        {item.split('-').map((string) => {
          return string[0].toUpperCase() + string.substr(1) + ' ';
        })}
      </button>
    );
  };
  
  return (
    <div className="t3-options-difficulty text-center column small-12">
      <h4>Choose Difficulty</h4>
      <div className="button-group">
        {renderDifficultyButton(SPEX.difficulty.easy)}
        {renderDifficultyButton(SPEX.difficulty.medium)}
        {renderDifficultyButton(SPEX.difficulty.hard)}
      </div>
    </div>
  );
}

export default T3OptionsDifficulty;
