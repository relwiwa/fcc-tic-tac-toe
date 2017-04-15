import React, { Component } from 'react';

import T3Board from './t3-board';

import SPEX from '../data/t3-spex';

/**
 * @class T3GameBoard component represents a game of Tic Tac Toe
 * - It is a controlled component as far as board is concerned which is passed in as props 
 *   and sent back via onMove callback
 * - It is able to handle any of three game modes: user:ai, user:user, ai:ai
 * - It also handles calculating ai moves
 * - It is able to check the status of the board after a new move and sends this info
 *   back to parent component along with the newBoard
 * 
 * @param board current Board passed in as props
 * @callback onMove send newBoard and boardStatus back to parent component
 */
class T3GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentPlayer } = this.props;
    this.boardStati = {};
    if (currentPlayer.type === SPEX.player.ai) {
      window.setTimeout(() => {
        this.getAiMove();
      }, SPEX.timeoutAiMove);
    }
  }

  componentDidUpdate() {
    const { currentPlayer, difficulty, gameStatus } = this.props;
    if (gameStatus === SPEX.gameStatus.started && currentPlayer.type === SPEX.player.ai) {
      window.setTimeout(() => {
        this.getAiMove();
      }, SPEX.timeoutAiMove);
    }
  }

  /**
   * @method calculateBestMove
   * - passes the currentBoard and the current(Ai)Player to the minimax method in
   *   order to get the next best move
   * - It enables the AI to play a perfect game in hard mode
   * - The first move is set randomly
   * 
   * @return cell index of next move
   */
  calculateBestMove() {
    const { board, currentPlayer } = this.props;
    if (board === '---------') {
      return Math.floor(Math.random() * 8);
    }
    let aiMove = this.minimax(board, currentPlayer)
    return aiMove.cell;
  }

  /**
   * @method calculateBoardStatus
   * - checks whether the board passed in is in a final state
   * 
   * @param  boardToCheck
   * @return result object with gameOver, winner, cells properties
   */
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

  /**
   * @method calculateRandomMove
   * - selects a random cell from the currently empty cells of the board and returns
   *   it
   * 
   * @return cell index of next move
   */
  calculateRandomMove() {
    const { board } = this.props;
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '-') {
        emptyCells.push(i);
      }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  /**
   * @method minimax
   * - evaluates board and turn in relation to currentPlayer
   *   
   * @param board
   * @param turn
   * @return bestMove object with cell property
   * 
   * Minimax implementation adapted from:
   * https://medium.freecodecamp.com/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
   */
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

  /**
   * @method getAiMove
   * - Generates the next AI move depending on difficulty
   * - On hard difficulty, the best move is always played
   * - On medium difficulty, the best move is played more often than a random move
   * - On easy difficulty, a random move is played more often than the best move
   * - aiMove gets passed on to handleMove that will handle communication with
   *   parent component
   */
  getAiMove() {
    const { board, currentPlayer, difficulty, onMove } = this.props;
    let aiMove = null;
    if (difficulty === SPEX.difficulty.easy) {
      aiMove = (Math.random() > SPEX.randomMoveFactors.easy) ? this.calculateRandomMove() : this.calculateBestMove();
    }
    else if (difficulty === SPEX.difficulty.medium) {
      aiMove = (Math.random() > SPEX.randomMoveFactors.medium) ? this.calculateRandomMove() : this.calculateBestMove();
    }
    else {
      aiMove = this.calculateBestMove();
    }
    this.handleMove(aiMove);
  }

  /**
   * @method getBoardStatus
   * - Returns the status of the board passed in
   * - Results get cached, so especially for minimax, already calculated results get
   *   returned from cache
   * 
   * @param board
   * @return boardStatus 
   */
  getBoardStatus(board) {
    let boardStatus = this.boardStati[board];
    if (!boardStatus) {
      boardStatus = this.calculateBoardStatus(board);
      this.boardStati[board] = boardStatus;
    }
    return boardStatus;
  }

  /**
   * @method handleMove
   * - Gets called, after either player made a move
   * - The board status gets evaluated via getboardStatus
   * - The newBoard and boardStatus get sent back to parent component via callback
   * 
   * @param cellId
   * @callback onMove sends newBoard and boardStatus back to parent component
   */
  handleMove(cellId) {
    const { board, currentPlayer, onMove } = this.props;
    let newBoard = board.substr(0, cellId);
    newBoard += currentPlayer.avatar;
    newBoard += board.substr(cellId + 1);
    const boardStatus = this.getBoardStatus(newBoard);
    onMove(newBoard, boardStatus);
  }

  /**
   * @method setupCellSpex
   * - Transforms the current board data received as a string and turns it into an array
   *   containing all information that is necessary to render T3Board
   * - If the game has ended, it passes the cell specs on to setupWinningCells, which will
   *   add information to highlight the winning cells (unless there was a draw)
   * 
   * @return cellSpex contains all info to render T3Board
   */
  setupCellSpex() {
    const { board, currentPlayer, gameStatus } = this.props;
    let cellSpex = [];
    for (let i = 0; i < board.length; i++) {
      let cellSpec = {};
      cellSpec.content = board[i] === '-' ? '' : board[i];
      if (gameStatus !== SPEX.gameStatus.ended) {
        cellSpec.onClick = (currentPlayer.type === SPEX.player.user && board[i] === '-')
          ? (event) => this.handleMove(i)
          : null;
      }
      cellSpec.key = i;
      cellSpex.push(cellSpec);
    }
    if (gameStatus === SPEX.gameStatus.ended) {
      cellSpex = this.updateWinningCells(cellSpex);
    }
    return cellSpex;
  }

  /**
   * @method updateWinningCells
   * - Updates the cell specs so that the three winning cells will be highlighted when
   *   rendered via T3Board
   * - The middle cell will contain a statement about the game status
   * - If the game has not ended or there was a tie, the original cellSpex array will be returned
   * 
   * @param cellSpex: array with infor to render T3Board
   * @return cellSpex: original array or updated array with cell specs
   */
  updateWinningCells(cellSpex) {
    const { currentPlayer, gameHistory } = this.props;
    const currentResult = gameHistory[gameHistory.length - 1];
    if (currentResult.winner !== null) {
      let newCellSpex = cellSpex;
      const winningCells = currentResult.cells;
      for (let i = 0; i < winningCells.length; i++) {
        let winningCell = newCellSpex[winningCells[i]];
        winningCell.status = 'active';
        if (i === 1) {
          winningCell.content = currentPlayer.avatar + ' won';
        }
        else {
          winningCell.content = '';
        }
        newCellSpex[winningCells[i]] = winningCell;
      }
      return newCellSpex;
    }
    return cellSpex;
  }

  render() {
    const { currentPlayer, difficulty, gameHistory, gameStatus, player1, player2 } = this.props;

    return (
      <div className="t3-game-board">
        <T3Board
          cellSpex={this.setupCellSpex()}
          currentPlayer={currentPlayer}
          difficulty={difficulty}
          gameHistory={gameHistory}
          gameStatus={gameStatus}
          player1={player1}
          player2={player2}
        />
      </div>
    );
  };
}

export default T3GameBoard;
