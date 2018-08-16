import React from 'react';
import { mount, shallow } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';

it('renders without crashing', () => {
  mount(<Game {...props} />);
});

it('matches snapshot', () => {
  const wrapper = shallow(<Game {...props} />);
  expect(wrapper.getElement()).toMatchSnapshot();
});