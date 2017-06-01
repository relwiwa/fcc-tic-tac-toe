import React from 'react';

import T3Board from './t3-board';

import '../styles/t3-instructions.scss';
import SPEX from '../data/t3-spex';

class T3Instructions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabSelected: SPEX.instructions.tabs.about
    };
  }

  renderBoard(location, board, index) {
    return (
      <div key={location} className={'column small-6 small-offset-3 medium-offset-0 medium-4' + (index === 2 ? ' end' : '')}>
        <T3Board
          cellSpex={this.setupCellSpex(board)}
          currentPlayer={null}
          difficulty={null}
          gameMode={null}
          gameStatus={null}
          player1={null}
          player2={null}
        />
        <h6 className="text-center">Three Cells {location + 'ly'}</h6>
      </div>
    );
  }

  setupCellSpex(spex) {
    let cellSpex = [];
    for (let i = 0; i < spex.length; i++) {
      let cellSpec = {};
      cellSpec.content = '';
      cellSpec.key = i;
      if (spex[i] !== '-') {
        cellSpec.status = 'active';
      }
      cellSpex.push(cellSpec);
    }
    return cellSpex;

  }

  render() {
    const { tabSelected } = this.state;
    const { onToggleInstructions } = this.props;

    return (
      <div className="t3-instructions row">
        <div className="column small-12">          
          <ul className="menu horizontal">
            <li className={this.state.tabSelected === SPEX.instructions.tabs.about ? 'active' : null}>
              <a onClick={() => this.setState({tabSelected: SPEX.instructions.tabs.about})}>About</a>
            </li>
            <li className={this.state.tabSelected === SPEX.instructions.tabs.rules ? 'active' : null}>
              <a onClick={() => this.setState({tabSelected: SPEX.instructions.tabs.rules})}>Rules</a>
            </li>
          </ul>
          {tabSelected === SPEX.instructions.tabs.about && <div className="callout column small-12">
            <h3 className="text-center">Tic Tac Toe Game</h3>
            <div className="row">
              <div className="column small-12 medium-6">
                <p>In Tic Tac Toe, two players, X and O, take turns marking the spaces in a 3x3 grid.</p>
                <p>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</p>
                <p>The game can be traced back to ancient Egypt.</p>
                <p>These days, it is also known as Noughts and Crosses, Tick Tack Toe, Tick Tat Toe and Xs and Os.</p>
                <p>Learn more about the game on <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" title="Wikipedia page featuring Tic Tac Toe game">Wikipedia</a>.</p>
              </div>
              <div className="column small-12 medium-6">
                <p>In this implementation you can chose to:</p>
                <ul>
                  <li>play against another human opponent,</li>
                  <li>or play against an AI opponent.</li>
                </ul>
                <p>There are three difficulties available:</p>
                <ul>
                  <li>Easy: AI plays totally random</li>
                  <li>Medium: AI occassionally makes mistakes</li>
                  <li>Hard: AI makes no mistakes</li>
                </ul>
                <p>There's also a demo mode which lets you watch two AI players playing against each other on medium difficulty.</p>
                <p>You can find out more about the <a title="Show Tab with Rules of the Game" onClick={() => this.setState({tabSelected: SPEX.instructions.tabs.rules})}>rules of the game</a>.</p>
              </div>
            </div>
          </div>}
          {tabSelected === SPEX.instructions.tabs.rules && <div className="callout column small-12">
            <h3 className="text-center">Rules</h3>
            <p>You can win Tic Tac Toe in one of the following ways:</p>
            <div className="row">
              {SPEX.instructions.boards.map((item, index) => this.renderBoard(item.location, item.board, index))}
            </div>
          </div>}
        </div>
        <div className="close-instructions column small-12">
          <ul className="menu horizontal text-right">
            <li><a onClick={onToggleInstructions}>Close Instructions</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default T3Instructions;
