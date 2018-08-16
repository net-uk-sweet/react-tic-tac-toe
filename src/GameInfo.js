import React from 'react';

const GameInfo = props => {

    const renderMove = (step, index, list, ascendingOrder) => {

        const totalMoves = list.size - 1;
        const move = step.get('squares').get(step.get('index'));
        const isStartMove = ascendingOrder ? index === 0 : index === totalMoves;
        const mutatedIndex = ascendingOrder ? index : totalMoves - index;
  
        const details = isStartMove ? 'Go to start' : 
          `Go to move ${mutatedIndex} - column - ${move.get('column')} - row - ${move.get('row')}`;
      
        return (
          <li key={index}  
            className={mutatedIndex === props.currentMove ? 'selected qa-selected' : ''}>
              <button onClick={() => props.onMoveClick(mutatedIndex)}>{details}</button>
          </li>
        );
      }

    const moves = (props.ascendingOrder ? props.history : props.history.reverse()).map((step, move, list) => {
        return renderMove(step, move, list, props.ascendingOrder);
    });

    return (
        <React.Fragment>
            <div>{props.status}</div>
            <ol>{moves}</ol>
        </React.Fragment>
    );
}

export default GameInfo;