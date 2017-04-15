import React, { Component } from 'react';

import T3GameBoard from './t3-game-board';
import T3Controls from './t3-controls';
import T3OptionsBoard from './t3-options-board';
import T3Status from './t3-status';

import SPEX from '../data/t3-spex';

class T3Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '---------',
      currentPlayer: null, // player1 object || player2 object
      difficulty: null, // just-kiddin || regular || impossible
      gameHistory: [], // user || ai || tie
      gameMode: null,
      gameStatus: null,
      player1: {
        avatar: null,
        type: null,
      },
      player2: {
        avatar: null,
        type: null,
      },
      showOptions: false,
    }
  }

  componentWillMount() {
    this.setupDemoGame();
  }

  handleChangeAvatar(avatar) {
    const { player1, player2 } = this.state;
    let newState = {}
    newState.player1 = player1;
    newState.player1.avatar = avatar;
    newState.player2 = player2;
    newState.player2.avatar = avatar === SPEX.avatar.x ? SPEX.avatar.o : SPEX.avatar.x; 
    this.setState(newState);
  }

  handleChangeDifficulty(difficulty) {
    this.setState({
      difficulty
    });
  }

  handleChangeGameMode(gameMode) {
    const { player1, player2 } = this.state;
    let newState = {}
    newState.gameMode = gameMode;
    newState.player1 = player1;
    newState.player1.type = SPEX.player.user;
    newState.player2 = player2;
    newState.player2.type = gameMode === SPEX.gameMode.onePlayer ? SPEX.player.ai : SPEX.player.user;
    this.setState(newState);
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

  handleSetupInitialGame() {
    this.setState({
      board: '---------',
      currentPlayer: null,
      difficulty: null,
      gameMode: null,
      gameStatus: null,
      player1: {
        avatar: null,
        type: null,
      },
      player2: {
        avatar: null,
        type: null,
      },
      showOptions: true,
    });
  }

  handleSetupGame() {
    const { difficulty } = this.state;
    this.setState({
      board: '---------',
      currentPlayer: this.setupCurrentPlayer(),
      gameStatus: SPEX.gameStatus.started,
      showOptions: false,
    });
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

  setupDemoGame() {
    const player1 = {
      type: SPEX.player.ai,
      avatar: SPEX.avatar.x,
    }
    const player2 = {
      type: SPEX.player.ai,
      avatar: SPEX.avatar.o,
    }
    this.setState({
      board: '---------',
      currentPlayer: player1,
      difficulty: SPEX.difficulty.medium,
      gameMode: SPEX.gameMode.demo,
      gameStatus: SPEX.gameStatus.started,
      player1: player1,
      player2: player2,
      showOptions: false,
    });    
  }

  render() {
    const { board, currentPlayer, difficulty, gameHistory, gameMode, gameStatus, player1, player2, showOptions } = this.state;

    return (
      <div className="t3-game row column medium-8">
        <h1 className="text-center">
          Tic Tac Toe
        </h1>
        {showOptions && <T3OptionsBoard
          difficulty={difficulty}
          gameMode={gameMode}
          gameStatus={gameStatus}
          player1={player1}
          player2={player2}
          onChangeAvatar={(avatar) => this.handleChangeAvatar(avatar)}
          onChangeDifficulty={(difficulty) => this.handleChangeDifficulty(difficulty)}
          onChangeGameMode={(gameMode) => this.handleChangeGameMode(gameMode)}
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
        <T3Controls
          difficulty={difficulty}
          gameMode={gameMode}
          gameStatus={gameStatus}
          numberOfRounds={gameHistory.length}
          player1={player1}
          showOptions={showOptions}
          onSetupGame={() => this.handleSetupGame()}
          onSetupInitialGame={() => this.handleSetupInitialGame()}
          onShowOptions={() => this.setState({ showOptions: true })}
        />
      </div>
    );
  }
  
};

export default T3Game;
