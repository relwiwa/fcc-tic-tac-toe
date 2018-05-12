import React from 'react';
import { render } from 'react-dom';

import '../../../styles/global-styles.scss';
import '../../../config/font-awesome';

import T3Game from './components/t3-game';

render(
  <T3Game />,
  document.getElementById('root')
);
