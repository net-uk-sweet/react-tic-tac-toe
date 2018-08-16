import Immutable from 'immutable';

export function splitIntoChunks(list, chunkSize) {
    return Immutable.Range(0, list.count(), chunkSize)
        .map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize));
}
  
export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        const toka = squares.getIn([a, 'token']);
        const tokb = squares.getIn([b, 'token']);
        const tokc = squares.getIn([c, 'token']);

        if (toka && toka === tokb && toka === tokc) {
            return Immutable.fromJS({ 
                token: toka,
                sequence: lines[i]
            });
        }
    }
    return null;
}