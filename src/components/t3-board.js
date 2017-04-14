import React, { Component } from 'react';

import T3Cell from './t3-cell';
import T3Status from './t3-status';

import SPEX from '../data/t3-spex';

class T3Board extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentPlayer } = this.props;
    this.boardStati = {};
    if (currentPlayer.type === SPEX.player.ai) {
      window.setTimeout(() => {
        this.getAiMove();
      }, 2000);
    }
  }

  componentDidUpdate() {
    const { currentPlayer, difficulty, gameStatus } = this.props;
    if (gameStatus === SPEX.gameStatus.started && currentPlayer.type === SPEX.player.ai) {
      window.setTimeout(() => {
        this.getAiMove();
      }, 2000);
    }
  }

  calculateAiMoveEasy() {
    const { board } = this.props;
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '-') {
        emptyCells.push(i);
      }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  calculateAiMoveHard() {
    const { board, currentPlayer } = this.props;
    if (board === '---------') {
      return Math.floor(Math.random() * 8);
    }
    let aiMove = this.minimax(board, currentPlayer)
    return aiMove.cell;
  }

  /*  minimax implementation adapted from:
      https://medium.freecodecamp.com/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
      it evaluates board and turn in relation to currentPlayer */
  minimax(board, turn) {
    const { currentPlayer, player1, player2 } = this.props;
    const boardStatus = this.getBoardStatus(board);

    if (boardStatus.gameOver === true) {
      if (boardStatus.winner === null) {
        return { result: 0 };
      }
      else {
        if (boardStatus.winner === currentPlayer) {
          return { result: 30 };
        }
        else {
          return { result: -30 };
        }
      }
    }
    // game is not over yet
    else {
      // get all empty cells within this board...
      let emptyCells = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '-') {
          emptyCells.push(i);
        }
      }
      let moves = [];
      // ... and iterate through all the moves possible for each board using minimax
      // store move object with result in moves array
      for (let i = 0; i < emptyCells.length; i++) {
        let move = {
          avatar: turn.avatar,
          cell: emptyCells[i]
        };
        const newBoard = board.substr(0, move.cell) + move.avatar + board.substr(move.cell + 1);
        const result = this.minimax(newBoard, (turn === player1 ? player2 : player1));
        move.result = result.result;
        moves.push(move);
      }

      // when results for all the moves possible for this board are done, get best move
      let bestMove;
      /* internal minimax turn gets compared to overall currentPlayer:
         - if it is currentPlayers turn in the overall game, maximize score,
         - if it is not currentPlayers turn in the overall game, minimize score */
      if (turn === currentPlayer) {
        let maxScore = -50;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].result > maxScore) {
            maxScore = moves[i].result;
            bestMove = i;
          }
        }
      }
      else {
        let minScore = 50;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].result < minScore) {
            minScore = moves[i].result;
            bestMove = i;
          }
        }
      }
      return moves[bestMove];
    }
  }

  calculateBoardStatus(boardToCheck) {
    const { player1, player2 } = this.props;
		let result = {};
    result.gameOver = false;
    let emptyCells = 0;
    for (let i = 0; i < boardToCheck.length; i++) {
      if (boardToCheck[i] === '-') {
        emptyCells++;
      }
    }

    // check is only necessary when there are more than two entries
    if (emptyCells < 7) {
      for (let i = 0; i < 9; i += 3) {

        // rows
        if (boardToCheck[i] !== '-') { // check is only necessary if first cell of row is not empty
          if (boardToCheck[i] === boardToCheck[i + 1] && boardToCheck[i + 1] === boardToCheck[i + 2]) {
            result.gameOver = true;
            result.winner = boardToCheck[i] === player1.avatar ? player1 : player2;
            result.cells = [i, i + 1, i + 2];
            return result;
          }
        }

        // cols
        if (boardToCheck[i / 3] !== '-') { // check is only necessary if first cell of column is not empty
          if (boardToCheck[i / 3] === boardToCheck[i / 3 + 3] && boardToCheck[i / 3 + 3] === boardToCheck[i / 3 + 6]) {
            result.gameOver = true;
            result.winner = boardToCheck[i / 3] === player1.avatar ? player1 : player2;
            result.cells = [i / 3, i / 3 + 3, i / 3 + 6];
            return result;
          }
        }

				// diagonals
				if (boardToCheck[0] !== '-') {
					if (boardToCheck[0] === boardToCheck[4] && boardToCheck[4] === boardToCheck[8]) {
						result.gameOver = true,
						result.winner = boardToCheck[0] === player1.avatar ? player1 : player2;
						result.cells = [0, 4, 8];
            return result;
					}
				}
				if (boardToCheck[2] !== '-') {
					if (boardToCheck[2] === boardToCheck[4] && boardToCheck[4] === boardToCheck[6]) {
						result.gameOver = true,
						result.winner = boardToCheck[2] === player1.avatar ? player1 : player2;
						result.cells = [2, 4, 6];
            return result;
					}
				}

				if (emptyCells === 0 && result.gameOver === false) {
					result.gameOver = true;
					result.winner = null;
				}
      }
    }
    return result;
  }

  getAiMove() {
    const { board, currentPlayer, difficulty, onMove } = this.props;
    let aiMove = null;
    if (difficulty === SPEX.difficulty.easy) {
      aiMove = this.calculateAiMoveEasy();
    }
    else if (difficulty === SPEX.difficulty.medium) {
      aiMove = (Math.random() > SPEX.mediumRandomFactor) ? this.calculateAiMoveEasy() : this.calculateAiMoveHard();
    }
    else {
      aiMove = this.calculateAiMoveHard();
    }
    let newBoard = board.substr(0, aiMove);
    newBoard += currentPlayer.avatar;
    newBoard += board.substr(aiMove + 1);
    const boardStatus = this.getBoardStatus(newBoard);
    onMove(newBoard, boardStatus);
  }

  // the result of each board status gets stored in boardStati object, so next time, no calculation is necessary
  getBoardStatus(board) {
    let boardStatus = this.boardStati[board];
    if (!boardStatus) {
      boardStatus = this.calculateBoardStatus(board);
      this.boardStati[board] = boardStatus;
    }
    return boardStatus;
  }

  handleUserMove(event, cellId) {
    const { board, currentPlayer, onMove } = this.props;
    let newBoard = board.substr(0, cellId);
    newBoard += currentPlayer.avatar;
    newBoard += board.substr(cellId + 1);
    const boardStatus = this.getBoardStatus(newBoard);
    onMove(newBoard, boardStatus);
  }

  renderCells() {
    const { board, currentPlayer, gameHistory, gameStatus } = this.props;
    let cells = [];
    for (let i = 0; i < board.length; i++) {
      cells.push(
        <T3Cell
          cellData={board[i]}
          cellId={i}
          currentPlayer={currentPlayer}
          gameHistory={gameHistory}
          gameStatus={gameStatus}
          onUserMove={(event, cellId) => this.handleUserMove(event, cellId)}
        />
      );
    }
    return cells;
  };

  render() {
    const { board, currentPlayer, difficulty, gameHistory, player1, player2 } = this.props;

    return (
      <div className="t3-board row">
        <div className="column medium-offset-1 medium-10 large-offset-3 large-6">
          <T3Status
            currentPlayer={currentPlayer}
            difficulty={difficulty}
            gameHistory={gameHistory}
            player1={player1}
            player2={player2}
          />
          <div className="t3-row row small-up-3">
            {this.renderCells()}
          </div>
        </div>
      </div>
    );
  };
}

export default T3Board;
