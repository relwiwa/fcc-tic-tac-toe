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
    if (turn === SPEX.turn.ai) {
      this.getAiMove();
    }
  }

  componentDidUpdate() {
    const { gameStatus, turn } = this.props;
    if (gameStatus === SPEX.gameStatus.started && turn === SPEX.turn.ai) {
      window.setTimeout(() => {
        this.getAiMove();
      }, 1000);
    }
  }

  calculateBoardStatus(boardToCheck, turn) {
    console.log('calculating board status');
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
          console.log('checking row ' + i / 3);
          if (boardToCheck[i] === boardToCheck[i + 1] && boardToCheck[i + 1] === boardToCheck[i + 2]) {
            console.log('row win');
            result.gameOver = true;
            result.winner = turn;
            result.cells = [i, i + 1, i + 2];
            return result;
          }
        }

        // cols
        if (boardToCheck[i / 3] !== '-') { // check is only necessary if first cell of column is not empty
          console.log('checking col ' + i / 3);
          if (boardToCheck[i / 3] === boardToCheck[i / 3 + 3] && boardToCheck[i / 3 + 3] === boardToCheck[i / 3 + 6]) {
            console.log('col win');
            result.gameOver = true;
            result.winner = turn;
            result.cells = [i / 3, i / 3 + 3, i / 3 + 6];
            return result;
          }
        }

				// diagonals
				if (boardToCheck[0] !== '-') {
					if (boardToCheck[0] === boardToCheck[4] && boardToCheck[4] === boardToCheck[8]) {
						console.log('diagonal 0 4 8 wins');
						result.gameOver = true,
						result.winner = turn;
						result.cells = [0, 4, 8];
            return result;
					}
				}
				if (boardToCheck[2] !== '-') {
					if (boardToCheck[2] === boardToCheck[4] && boardToCheck[4] === boardToCheck[6]) {
						console.log('diagonal 2 4 6 wins');
						result.gameOver = true,
						result.winner = turn;
						result.cells = [2, 4, 6];
            return result;
					}
				}

				if (emptyCells === 0 && result.gameOver === false) {
					console.log('its a tie');
					result.gameOver = true;
					result.winner = null;
				}
      }
    }
    return result;
  }

  getAiMove() {
    const { board, onMove, turn, userAvatar } = this.props;
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '-') {
        emptyCells.push(i);
      }
    }
    const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    let newBoard = board.substr(0, aiMove);
    newBoard += userAvatar === SPEX.userAvatar.x ? SPEX.userAvatar.o : SPEX.userAvatar.x;
    newBoard += board.substr(aiMove + 1);
    const boardStatus = this.getBoardStatus(newBoard, turn);
    onMove(newBoard, boardStatus);
  }

  getBoardStatus(board, turn) {
    let boardStatus = this.boardStati[board];
    if (!boardStatus) {
      boardStatus = this.calculateBoardStatus(board, turn);
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
    const { board, difficulty, gameHistory, turn, userAvatar } = this.props;

    return (
      <div className="t3-board row">
        <div className="column medium-offset-1 medium-10 large-offset-3 large-6">
          <T3Status
            turn={turn}
            difficulty={difficulty}
            userAvatar={userAvatar}
            gameHistory={gameHistory}
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
