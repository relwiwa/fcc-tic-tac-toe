import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import T3GameBoard from './t3-game-board';
import T3Controls from './t3-controls';
import T3Instructions from './t3-instructions';
import T3OptionsBoard from './t3-options-board';

import SPEX from '../data/t3-spex';

class T3Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '---------',
      currentPlayer: null, // player1 || player2
      difficulty: null, // just-kiddin || regular || impossible
      gameHistory: [], // user || ai || tie
      gameMode: null,
      gameStatus: null,
      player1: {
        name: SPEX.player.player1,
        avatar: null,
        type: null,
      },
      player2: {
        name: SPEX.player.player2,
        avatar: null,
        type: null,
      },
      showInstructions: false,
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
    newState.player2.avatar = (avatar === SPEX.avatar.x ? SPEX.avatar.o : SPEX.avatar.x); 
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
    newState.player1.type = SPEX.player.type.user;
    newState.player2 = player2;
    newState.player2.type = (gameMode === SPEX.gameMode.onePlayer ? SPEX.player.type.ai : SPEX.player.type.user);
    this.setState(newState);
  }

  handleMove(newBoard, boardStatus) {
    const { board, currentPlayer, gameHistory, player1, player2 } = this.state;
    let newState = {};
    if (boardStatus.gameOver === false) {
      newState.board = newBoard;
      newState.currentPlayer = (currentPlayer === SPEX.player.name.player1) ? SPEX.player.name.player2 : SPEX.player.name.player1;
      this.setState(newState);
    }
    else {
      newState.board = newBoard;
      newState.gameStatus = SPEX.gameStatus.ended;
      newState.gameHistory = gameHistory.concat(boardStatus);
      if (this.state.gameMode === SPEX.gameMode.demo) {
        this.demoTimeout = window.setTimeout(() => {
          this.setupDemoGame();
        }, SPEX.timeoutDemoGame)
      }
      this.setState(newState);
    }
  }

  handleSetupInitialGame() {
    if (this.demoTimeout !== null) {
      clearTimeout(this.demoTimeout);
    }
    this.setState({
      board: '---------',
      currentPlayer: null,
      difficulty: null,
      gameMode: null,
      gameHistory: [],
      gameStatus: null,
      player1: {
        name: SPEX.player.name.player1,
        avatar: null,
        type: null,
      },
      player2: {
        name: SPEX.player.name.player2,
        avatar: null,
        type: null,
      },
      showInstructions: this.state.showInstructions,
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

  handleStopCurrentGame() {
    this.setState({
      board: '---------',
      currentPlayer: this.setupCurrentPlayer(),
      gameStatus: SPEX.gameStatus.ended,
      showOptions: true
    });    
  }

  handleToggleInstructions() {
    this.setState({
      showInstructions: !this.state.showInstructions
    });
  }

  setupCurrentPlayer() {
    const { difficulty, gameMode } = this.state;
    if (difficulty === SPEX.difficulty.medium || gameMode === SPEX.gameMode.twoPlayer) {
      return (Math.random() > 0.5) ? SPEX.player.name.player1 : SPEX.player.name.player2;        
    }
    else if (difficulty === SPEX.difficulty.easy) {
      return SPEX.player.name.player1;
    }
    else {
      return SPEX.player.name.player2;
    }
  }

  setupDemoGame() {
    const player1 = {
      name: SPEX.player.name.player1,
      type: SPEX.player.type.ai,
      avatar: SPEX.avatar.x,
    }
    const player2 = {
      name: SPEX.player.name.player2,
      type: SPEX.player.type.ai,
      avatar: SPEX.avatar.o,
    }
    this.setState({
      board: '---------',
      currentPlayer: SPEX.player.name.player1,
      difficulty: SPEX.difficulty.medium,
      gameMode: SPEX.gameMode.demo,
      gameStatus: SPEX.gameStatus.started,
      player1: player1,
      player2: player2,
      showOptions: false,
    });   
  }

  render() {
    const { board, currentPlayer, difficulty, gameHistory, gameMode, gameStatus, player1, player2, showInstructions, showOptions } = this.state;

    return (
      <div className="t3-game grid-container grid-container-padded">
        <div className="grid-x align-center">
          <div className="cell">
            <h1 className="text-center">
              Tic Tac Toe <small style={{position: 'relative', bottom: '4px'}}><FontAwesomeIcon icon="question-circle" onClick={() => this.handleToggleInstructions()} /></small>
            </h1>
            {showInstructions && <T3Instructions
              onToggleInstructions={() => this.handleToggleInstructions()}
            />}
          </div>
          {!showInstructions && <div className="cell medium-8">
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
              gameMode={gameMode}
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
              onStopCurrentGame={() => this.handleStopCurrentGame()}
            />
          </div>}
        </div>
      </div>
    );
  }
  
};

export default T3Game;
