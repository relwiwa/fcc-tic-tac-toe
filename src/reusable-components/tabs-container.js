import React, { Component } from 'react';

import './tabs-container.scss';

class TabsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabSelected: 0,
    };
  }

  render() {
    const { tabSelected } = this.state;
    const { onToggleTabsContainer, tabs } = this.props;

    return (
      <div className="tabs-container grid-x">
        <div className="cell">
          <ul className="menu horizontal">
            {tabs.map((tab, index) => (
              <li
                className={tabSelected === index ? 'active' : null}
                key={tab}
              >
                <a onClick={() => this.setState({tabSelected: index})}>{tab}</a>
              </li>
            ))}
          </ul>
          {this.props.children.map((child, index) => {
            if (index === tabSelected) {
              return child;
            }
            else {
              return null;
            }
          })}
        </div>
        <div className="close-instructions cell">
          <ul className="menu horizontal align-right">
            <li><a onClick={onToggleTabsContainer}>Close Instructions</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TabsContainer;
