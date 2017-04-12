import React, { Component } from 'react';

import T3Board from './t3-board';
import T3Controls from './t3-controls';
import T3Dialog from './t3-dialog';
import T3Options from './t3-options';

import SPEX from '../data/t3-spex';

class T3Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '---------',
      difficulty: null, // just-kiddin || regular || impossible
      gameHistory: [], // user || ai || tie
      gameStatus: null,
      showOptions: true,
      turn: null, // user || ai
      userAvatar: null // x || y
    }
  }

  handleChangeDifficulty(event, difficulty) {
    this.setState({
      difficulty
    });
  }

  handleChangeUserAvatar(event, userAvatar) {
    this.setState({
      userAvatar
    });
  }

  handleStartGame() {
    const { difficulty } = this.state;
    this.setState({
      board: '---------',
      gameStatus: SPEX.gameStatus.started,
      turn: this.setupTurn(),
      showOptions: false,
    });
  }

  handleMove(newBoard, boardStatus) {
    const { board, gameHistory, turn, userAvatar } = this.state;
    let newState = {};
    if (boardStatus.gameOver === false) {
      newState.board = newBoard;
      newState.turn = (turn === SPEX.turn.user) ? SPEX.turn.ai : SPEX.turn.user;
    }
    else {
      newState.board = newBoard;
      newState.gameStatus = SPEX.gameStatus.ended;
      newState.gameHistory = gameHistory.concat(boardStatus);
    }
    this.setState(newState);
  }

  setupTurn() {
    const { difficulty } = this.state;
    if (difficulty === SPEX.difficulty.easy) {
      return SPEX.turn.user;
    }
    else if (difficulty === SPEX.difficulty.medium) {
      return (Math.random() > SPEX.mediumRandomFactor) ? SPEX.turn.ai : SPEX.turn.user;        
    }
    else {
      return SPEX.turn.ai;
    }
  }

  render() {
    const { board, difficulty, gameHistory, gameStatus, showOptions, turn, userAvatar } = this.state;

    return (
      <div className="t3-game row column medium-8">
        <h1 className="text-center">
          Tic Tac Toe Game
        </h1>
        {(gameStatus === SPEX.gameStatus.ended && !showOptions) && <T3Dialog
          gameResult={gameHistory[gameHistory.length - 1].winner}
        />}
        {showOptions && <T3Options
          difficulty={difficulty}
          userAvatar={userAvatar}
          onChangeDifficulty={(event, difficulty) => this.handleChangeDifficulty(event, difficulty)}
          onChangeUserAvatar={(event, userAvatar) => this.handleChangeUserAvatar(event, userAvatar)}
        />}
        {((gameStatus === SPEX.gameStatus.started || gameStatus === SPEX.gameStatus.ended) && !showOptions) && <T3Board
          board={board}
          difficulty={difficulty}
          gameStatus={gameStatus}
          gameHistory={gameHistory}
          turn={turn}
          userAvatar={userAvatar}
          onMove={(newBoard, boardStatus) => this.handleMove(newBoard, boardStatus)}
        />}
        {(gameStatus !== SPEX.gameStatus.started) && <T3Controls
          difficulty={difficulty}
          numberOfRounds={gameHistory.length}
          showOptions={showOptions}
          userAvatar={userAvatar}
          onShowOptions={() => this.setState({ showOptions: true })}
          onStartGame={() => this.handleStartGame()}
        />}
      </div>
    );
  }
  
};

export default T3Game;
