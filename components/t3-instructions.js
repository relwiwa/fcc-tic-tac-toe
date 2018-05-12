import React from 'react';

import T3Board from './t3-board';
import TabsContainer from '../../../reusable-components/tabs-container/tabs-container';

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
      <div className="t3-instructions">
        <TabsContainer
          tabs={SPEX.instructions.tabs}
          onToggleTabsContainer={onToggleInstructions}
        >
          <div className="callout cell">
            <h3 className="text-center">Tic Tac Toe Game</h3>
            <div className="grid-x grid-padding-x">
              <div className="cell medium-6">
                <p>In Tic Tac Toe, two players, X and O, take turns marking the spaces in a 3x3 grid.</p>
                <p>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</p>
                <p>The game can be traced back to ancient Egypt.</p>
                <p>These days, it is also known as Noughts and Crosses, Tick Tack Toe, Tick Tat Toe and Xs and Os.</p>
                <p>Learn more about the game on <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" title="Wikipedia page featuring Tic Tac Toe game">Wikipedia</a>.</p>
              </div>
              <div className="cell medium-6">
                <p>In this implementation you can chose to:</p>
                <ul className="fa-ul">
                  <li><i className="fa-li fa fa-user"></i>play against another human opponent,</li>
                  <li><i className="fa-li fa fa-microchip"></i>or play against an AI opponent.</li>
                </ul>
                <p>There are three difficulties available:</p>
                <ul className="fa-ul">
                  <li><i className="fa-li fa fa-gamepad"></i>Easy: AI plays totally random</li>
                  <li><i className="fa-li fa fa-gamepad"></i>Medium: AI occassionally makes mistakes</li>
                  <li><i className="fa-li fa fa-gamepad"></i>Hard: AI makes no mistakes</li>
                </ul>
                <p>There's also a demo mode which lets you watch two AI players playing against each other on medium difficulty.</p>
                <p>You can find out more about the <a title="Show Tab with Rules of the Game" onClick={() => this.setState({tabSelected: SPEX.instructions.tabs.rules})}>rules of the game</a>.</p>
              </div>
            </div>
          </div>
          <div className="callout cell">
            <h3 className="text-center">Rules</h3>
            <p>You can win Tic Tac Toe in one of the following ways:</p>
            <div className="grid-x">
              {SPEX.instructions.boards.map((item, index) => this.renderBoard(item.location, item.board, index))}
            </div>
          </div>
        </TabsContainer>
      </div>
    );
  }
}

export default T3Instructions;
