import React from 'react';
import { render } from 'react-dom';

import './global-styles.scss';

import T3Game from './components/t3-game';

render(
  <T3Game />,
  document.getElementById('root')
);
