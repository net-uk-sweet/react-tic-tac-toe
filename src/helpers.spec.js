import Immutable from 'Immutable';

import {splitIntoChunks, calculateWinner} from './helpers';

it('calculates the winner', () => {
    const data = Immutable.fromJS([
        { token: 'x' },
        { token: 'x' },
        { token: 'x' }
    ]);
    const result = {
        token: 'x',
        sequence: [0, 1, 2]
    }; 
    expect(calculateWinner(data).toJS()).toEqual(result);
});

it('chunks a list', () => {
    const data = Immutable.fromJS(Array(9).fill(null));
    const result = [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null)
    ]
    expect(splitIntoChunks(data, 3).toJS()).toEqual(result);
});