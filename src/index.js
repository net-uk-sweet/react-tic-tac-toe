import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { GAME as props } from './config';
import Game from './Game';

// TODO: need to include this conditionally for dev
require('immutable-devtools')(Immutable);

ReactDOM.render(
  <Game {...props} />,
  document.getElementById('root')
);

  