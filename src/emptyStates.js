import Immutable from 'immutable';

export const defaultState = (squares) => ({
    hasWinner: false,
    move: 0,
    ascendingOrder: true,
    history: Immutable.fromJS([{
      squares: Array(squares).fill().map(() => ({
        token: null,
        column: null,
        row: null
      }))
    }]),
    player: 0
  });