import Immutable from 'immutable';

export const defaultState = (squareCount) => ({
    move: 0,
    ascendingOrder: true,
    history: Immutable.fromJS([{
      squares: Array(squareCount).fill().map(() => ({
        token: null,
        column: null,
        row: null
      }))
    }]),
    player: 0
  });