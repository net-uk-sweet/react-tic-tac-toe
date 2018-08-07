import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Game from './Game';

ReactDOM.render(
  <Game player={0} players={['X', '0']} squares={9} columns={3} />,
  document.getElementById('root')
);

  