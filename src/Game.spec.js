import React from 'react';
import { shallow } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';
import { winState } from './winState';
import { drawState } from './drawState';

let shared = { };

beforeEach(() => {
  shared = {};
  shared.wrapper = shallow(<Game {...props} />);
  shared.initialState = shared.wrapper.state();
});

it('matches snapshot', () => {
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('has the correct default state', () => {
  const squares = shared.initialState.history.getIn([0, 'squares']);
  expect(shared.initialState.history.size).toEqual(1);
  expect(shared.initialState.player).toEqual(0);
  expect(squares.size).toEqual(9);
  expect(squares.get(0).toJS()).toEqual({ token: null, column: null, row: null });
});

it('toggles the move order when the toggle order button is selected', () => {
  shared.wrapper.find('.qa-toggle-button').simulate('click');
  expect(shared.wrapper.state().ascendingOrder).not.toEqual(shared.initialState);
});

it('resets the game when the reset button is selected', () => {
  shared.wrapper.state(winState);
  shared.wrapper.find('.qa-reset-button').simulate('click');
  expect(shared.wrapper.state()).toEqual(shared.initialState);
});

it('updates the move and player when a previous move is selected', () => {
  shared.wrapper.setState(winState);
  shared.wrapper.find('GameInfo').props().onMoveClick(0);
  expect(shared.wrapper.state().move).toEqual(0);
  expect(shared.wrapper.state().player).toEqual(shared.initialState.player);
});

it('should select the correct player when a move is selected', () => {
  shared.wrapper.setState(winState);
  shared.wrapper.find('GameInfo').props().onMoveClick(1);
  expect(shared.wrapper.state().move).toEqual(1);
  expect(shared.wrapper.state().player).not.toEqual(shared.initialState.player);
});

it('should correctly calculate a draw', () => {
  shared.wrapper.setState(drawState);
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('should correctly calculate a win', () => {
  shared.wrapper.setState(winState);
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('should output the winning sequence', () => {
  shared.wrapper.setState(winState);
  expect(shared.wrapper.find('Board').props().winner.toJS()).toEqual([0, 4, 8]);
});

it('should not update when a previously selected square is selected', () => {
  shared.wrapper.find('Board').props().onClick(4, 1, 3);
  const interimState = shared.wrapper.state();
  shared.wrapper.find('Board').props().onClick(4, 1, 3);
  expect(shared.wrapper.state()).toEqual(interimState);
});

it('should not update when the game is finished and a square is selected', () => {
  shared.wrapper.setState(winState);
  shared.wrapper.find('Board').props().onClick(0, 1, 4);
  expect(shared.wrapper.state()).toEqual(winState);
});
