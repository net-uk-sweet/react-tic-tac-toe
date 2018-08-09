import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { GAME as props } from './config';
import Game from './Game';

ReactDOM.render(
  <Game {...props} />,
  document.getElementById('root')
);

  