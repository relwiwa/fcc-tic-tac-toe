import React, { Component } from 'react';

import T3GameBoard from './t3-game-board';
import T3Controls from './t3-controls';
import T3Options from './t3-options';

import SPEX from '../data/t3-spex';

class T3Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '---------',
      currentPlayer: null, // player1 object || player2 object
      difficulty: null, // just-kiddin || regular || impossible
      gameHistory: [], // user || ai || tie
      gameStatus: null,
      player1: null,
      player2: null,
      showOptions: true,
    }
  }

  componentWillMount() {
    this.setState({
      player1: {
        type: SPEX.player.ai,
        avatar: null,
      },
      player2: {
        type: SPEX.player.ai,
        avatar: null,
      }
    });
  }

  handleChangeDifficulty(event, difficulty) {
    this.setState({
      difficulty
    });
  }

  handleChangeAvatar(event, avatar) {
    const { player1, player2 } = this.state;
    let newState = {}
    newState.player1 = player1;
    newState.player1.avatar = avatar;
    newState.player2 = player2;
    newState.player2.avatar = avatar === SPEX.avatar.x ? SPEX.avatar.o : SPEX.avatar.x; 
    this.setState(newState);
  }

  handleStartGame() {
    const { difficulty } = this.state;
    this.setState({
      board: '---------',
      currentPlayer: this.setupCurrentPlayer(),
      gameStatus: SPEX.gameStatus.started,
      showOptions: false,
    });
  }

  handleMove(newBoard, boardStatus) {
    const { board, currentPlayer, gameHistory, player1, player2 } = this.state;
    let newState = {};
    if (boardStatus.gameOver === false) {
      newState.board = newBoard;
      newState.currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    else {
      newState.board = newBoard;
      newState.gameStatus = SPEX.gameStatus.ended;
      newState.gameHistory = gameHistory.concat(boardStatus);
    }
    this.setState(newState);
  }

  setupCurrentPlayer() {
    const { difficulty, player1, player2 } = this.state;
    if (difficulty === SPEX.difficulty.easy) {
      return player1;
    }
    else if (difficulty === SPEX.difficulty.medium) {
      return (Math.random() > 0.5) ? player1 : player2;        
    }
    else {
      return player2;
    }
  }

  render() {
    const { board, currentPlayer, difficulty, gameHistory, gameStatus, player1, player2, showOptions } = this.state;

    return (
      <div className="t3-game row column medium-8">
        <h1 className="text-center">
          Tic Tac Toe
        </h1>
        {showOptions && <T3Options
          difficulty={difficulty}
          player1={player1}
          onChangeDifficulty={(event, difficulty) => this.handleChangeDifficulty(event, difficulty)}
          onChangeAvatar={(event, avatar) => this.handleChangeAvatar(event, avatar)}
        />}
        {((gameStatus === SPEX.gameStatus.started || gameStatus === SPEX.gameStatus.ended) && !showOptions) && <T3GameBoard
          board={board}
          currentPlayer={currentPlayer}
          difficulty={difficulty}
          gameHistory={gameHistory}
          gameStatus={gameStatus}
          player1={player1}
          player2={player2}
          onMove={(newBoard, boardStatus) => this.handleMove(newBoard, boardStatus)}
        />}
        {(gameStatus !== SPEX.gameStatus.started) && <T3Controls
          difficulty={difficulty}
          numberOfRounds={gameHistory.length}
          player1={player1}
          showOptions={showOptions}
          onShowOptions={() => this.setState({ showOptions: true })}
          onStartGame={() => this.handleStartGame()}
        />}
      </div>
    );
  }
  
};

export default T3Game;
