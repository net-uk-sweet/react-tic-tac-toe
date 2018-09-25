import React from 'react';
import { shallow } from 'enzyme';

import { GAME as props } from './config';
import Game from './Game';
import winState from './winState';
import drawState from './drawState';

let shared = { };
// TODO: needed?
let mockCalculateWin = hasWon => () => hasWon;

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

// TODO: refactor
it('updates the move and player when a previous move is selected', () => {
  shared.wrapper.find('Board').props().onClick(4, 1, 3);
  shared.wrapper.find('Board').props().onClick(2, 3, 5);
  shared.wrapper.find('GameInfo').props().onMoveClick(0);
  expect(shared.wrapper.state().move).toEqual(0);
  expect(shared.wrapper.state().player).toEqual(0);
  shared.wrapper.find('GameInfo').props().onMoveClick(1);
  expect(shared.wrapper.state().move).toEqual(1);
  expect(shared.wrapper.state().player).toEqual(1);
});

// TODO: 
it('should not update when a previously selected square is selected or the game is won', () => {
  // shared.wrapper.
});

it('should correctly calculate a draw', () => {
  shared.wrapper.state(drawState);
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('should correctly calculate a win', () => {
  shared.wrapper.state(winState);
  expect(shared.wrapper.getElement()).toMatchSnapshot();
});

it('should output the winning sequence', () => {

});

describe('when the game is won', () => {
  
}); 
