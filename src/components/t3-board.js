import React, { Component } from 'react';

import T3Cell from './t3-cell';
import T3Status from './t3-status';

import SPEX from '../data/t3-spex';

class T3Board extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { turn } = this.props;
    this.boardStati = {};
    if (turn === SPEX.player.ai) {
      this.getAiMove();
    }
  }

  componentDidUpdate() {
    const { difficulty, gameStatus, turn } = this.props;
    if (gameStatus === SPEX.gameStatus.started && turn === SPEX.player.ai) {
      if (difficulty === SPEX.difficulty.hard) {
        this.getAiMove();        
      }
      else {
        window.setTimeout(() => {
          this.getAiMove();
        }, 800);
      }
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
    const { board, turn } = this.props;
    if (board === '---------') {
      return Math.floor(Math.random() * 8);
    }
    let aiMove = this.minimax(board, SPEX.player.ai)
    return aiMove.cell;
  }

  /*  minimax implementation adapted from:
      https://medium.freecodecamp.com/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 */
  minimax(board, turn) {
    const { aiAvatar, userAvatar } = this.props;
    const boardStatus = this.getBoardStatus(board, turn);
    if (boardStatus.gameOver === true) {
      if (boardStatus.winner === SPEX.player.ai) {
        return { result: 30 };
      }
      else if (boardStatus.winner === SPEX.player.user) {
        return { result: -30 };
      }
      else {
        return { result: 0 };
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
          avatar: turn === SPEX.player.ai ? aiAvatar : userAvatar,
          cell: emptyCells[i]
        };
        const newBoard = board.substr(0, move.cell) + move.avatar + board.substr(move.cell + 1);
        const result = this.minimax(newBoard, (turn === SPEX.player.ai ? SPEX.player.user : SPEX.player.ai));
        move.result = result.result;
        moves.push(move);
      }

      // when results for all the moves possible for this board are done, get best move
      let bestMove;
      if (turn === SPEX.player.ai) {
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
    const { userAvatar } = this.props;
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
            result.winner = boardToCheck[i] === userAvatar ? SPEX.player.user : SPEX.player.ai;
            result.cells = [i, i + 1, i + 2];
            return result;
          }
        }

        // cols
        if (boardToCheck[i / 3] !== '-') { // check is only necessary if first cell of column is not empty
          if (boardToCheck[i / 3] === boardToCheck[i / 3 + 3] && boardToCheck[i / 3 + 3] === boardToCheck[i / 3 + 6]) {
            result.gameOver = true;
            result.winner = boardToCheck[i / 3] === userAvatar ? SPEX.player.user : SPEX.player.ai;
            result.cells = [i / 3, i / 3 + 3, i / 3 + 6];
            return result;
          }
        }

				// diagonals
				if (boardToCheck[0] !== '-') {
					if (boardToCheck[0] === boardToCheck[4] && boardToCheck[4] === boardToCheck[8]) {
						result.gameOver = true,
						result.winner = boardToCheck[0] === userAvatar ? SPEX.player.user : SPEX.player.ai
						result.cells = [0, 4, 8];
            return result;
					}
				}
				if (boardToCheck[2] !== '-') {
					if (boardToCheck[2] === boardToCheck[4] && boardToCheck[4] === boardToCheck[6]) {
						result.gameOver = true,
						result.winner = boardToCheck[2] === userAvatar ? SPEX.player.user : SPEX.player.ai
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
    const { aiAvatar, board, difficulty, onMove, turn, userAvatar } = this.props;
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
    newBoard += aiAvatar;
    newBoard += board.substr(aiMove + 1);
    const boardStatus = this.getBoardStatus(newBoard, turn);
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
    const { board, onMove, turn, userAvatar } = this.props;
    let newBoard = board.substr(0, cellId);
    newBoard += userAvatar;
    newBoard += board.substr(cellId + 1);
    const boardStatus = this.getBoardStatus(newBoard, turn);
    onMove(newBoard, boardStatus);
  }

  renderCells() {
    const { board, gameHistory, gameStatus, turn } = this.props;
    let cells = [];
    for (let i = 0; i < board.length; i++) {
      cells.push(
        <T3Cell
          cellData={board[i]}
          cellId={i}
          gameHistory={gameHistory}
          gameStatus={gameStatus}
          turn={turn}
          onUserMove={(event, cellId) => this.handleUserMove(event, cellId)}
        />
      );
    }
    return cells;
  };

  render() {
    const { aiAvatar, board, difficulty, gameHistory, turn, userAvatar } = this.props;

    return (
      <div className="t3-board row">
        <div className="column medium-offset-1 medium-10 large-offset-3 large-6">
          <T3Status
            aiAvatar={aiAvatar}
            difficulty={difficulty}
            gameHistory={gameHistory}
            turn={turn}
            userAvatar={userAvatar}
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
