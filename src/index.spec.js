import React from 'react';
import { mount } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';

it('renders without crashing', () => {
  mount(<Game {...props} />);
});

  