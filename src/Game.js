import React from 'react';
import Immutable from 'immutable';

import Board from './Board';
import { calculateWinner } from './helpers';

const defaultState = (squares, player) => ({
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
    player: player
  });
  
  export default class Game extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.state = this.getInitialState();
    }
  
    getInitialState() {
      return defaultState(this.props.squares, this.props.player);
    }
  
    handleToggleOrderClick() {
      this.setState({
        ascendingOrder: !this.state.ascendingOrder
      })
    }
  
    handleResetClick() {
      this.setState(this.getInitialState());
    }
  
    handleSquareClick(index, row, column) {
      let history = this.state.history.slice(0, this.state.move + 1);
      const current = history.get(history.size - 1);  
      const player = this.state.player ? 0 : 1;
      
      let squares = current.get('squares');
  
      if (calculateWinner(squares) || squares.getIn([index, 'token'])) {
        return;
      }
  
      squares = squares.set(index, Immutable.fromJS({
        token: this.props.players[this.state.player],
        row,
        column
      }));
      
      history = history.concat(Immutable.fromJS([{ index, squares }]));
  
      this.setState({
        player,
        move: history.size - 1,
        history
      });
    }
  
    jumpTo(move) {
      const player = move % 2 ? 1 : 0;
      this.setState({ move, player });
    }
  
    renderMove(step, index, list, ascendingOrder) {

      const totalMoves = list.size - 1;
      const move = step.get('squares').get(step.get('index'));
      const isStartMove = ascendingOrder ? index === 0 : index === totalMoves;
      const mutatedIndex = ascendingOrder ? index : totalMoves - index;

      const details = isStartMove ? 'Go to start' : 
        `Go to move ${index} - column - ${move.get('column')} - row - ${move.get('row')}`;
    
      return (
        <li key={index} 
          onClick={() => this.jumpTo(mutatedIndex)} 
          className={mutatedIndex === this.state.move ? 'selected' : ''}>
            <button>{details}</button>
        </li>
      );
    }

    render() {
  
      const history = this.state.history;
      const current = history.getIn([this.state.move, 'squares']);
      const playerToken = this.props.players[this.state.player];
      const winner = calculateWinner(current);
  
      let status = this.state.move < current.size ? `Next player: ${playerToken}` : 'Draw';
      
      if (winner) {
        status = `Winner: ${winner.get('token')}`;
      }
    
      const moves = (this.state.ascendingOrder ? history : history.reverse()).map((step, move, list) => {
        return this.renderMove(step, move, list, this.state.ascendingOrder);
      });
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              winner={winner && winner.get('sequence')}
              squares={current} 
              columns={this.props.columns}
              onClick={(i, row, column) => { this.handleSquareClick(i, row, column) } } 
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <button className="button" onClick={() => this.handleToggleOrderClick()}>Toggle order</button>
            <button className="button" onClick={() => this.handleResetClick()}>Reset</button>
          </div>
        </div>
      );
    }
  }