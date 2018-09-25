import Immutable from 'immutable';

export const winningState = {
    hasWinner: false,
    move: 5,
    ascendingOrder: false,
    history: Immutable.fromJS([
      {
        squares: [
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          }
        ]
      },
      {
        index: 0,
        squares: [
          {
            token: 'x',
            row: 1,
            column: 1
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          }
        ]
      },
      {
        index: 1,
        squares: [
          {
            token: 'x',
            row: 1,
            column: 1
          },
          {
            token: 'o',
            row: 1,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          }
        ]
      },
      {
        index: 4,
        squares: [
          {
            token: 'x',
            row: 1,
            column: 1
          },
          {
            token: 'o',
            row: 1,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'x',
            row: 2,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          }
        ]
      },
      {
        index: 6,
        squares: [
          {
            token: 'x',
            row: 1,
            column: 1
          },
          {
            token: 'o',
            row: 1,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'x',
            row: 2,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'o',
            row: 3,
            column: 1
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          }
        ]
      },
      {
        index: 8,
        squares: [
          {
            token: 'x',
            row: 1,
            column: 1
          },
          {
            token: 'o',
            row: 1,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'x',
            row: 2,
            column: 2
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'o',
            row: 3,
            column: 1
          },
          {
            token: null,
            column: null,
            row: null
          },
          {
            token: 'x',
            row: 3,
            column: 3
          }
        ]
      }
    ]),
    player: 1
  };