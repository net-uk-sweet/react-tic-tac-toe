import React from 'react';
import { shallow } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';

let shared = { };

beforeEach(() => {
  shared = {};
  shared.wrapper = shallow(<Game {...props} />);
});

it('matches snapshot', () => {
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('has the correct default state', () => {
  const state = shared.wrapper.state();
  const squares = state.history.getIn([0, 'squares']);

  expect(state.history.size).toEqual(1);
  expect(squares.size).toEqual(9);
  expect(squares.get(0).toJS()).toEqual({ token: null, column: null, row: null });
  expect(state.player).toEqual(0);
});

xit('toggles the move order', () => {
  const initialState = shared.wrapper.state().ascendingOrder;
  shared.wrapper.find('button').at(0).simulate('click');

  expect(shared.wrapper.state().ascendingOrder).not.toEqual(initialState);
})
