import React from 'react';
import { shallow } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';

it('matches snapshot', () => {
  const wrapper = shallow(<Game {...props} />);
  expect(wrapper.getElement()).toMatchSnapshot();
});
