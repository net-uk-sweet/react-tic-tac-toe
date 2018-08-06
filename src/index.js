import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import './index.css';

function Square(props) {
  const classes = props.highlight ? 'square highlight' : 'square';
  return (
    <button 
      className={classes}
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}

class Row extends React.Component {
  render() {
    return (
      <div className="board-row">
        {this.props.children}
      </div>     
    )
  }
}

class Board extends React.Component {

  renderSquare(i, row, column) {
    const props = {
      highlight: this.props.winner && this.props.winner.includes(i),
      value: this.props.squares.getIn([i, 'token']),
      key: i + 1,
      onClick: () => this.props.onClick(i, row, column)
    }
    return <Square {...props} />;
  }

  renderRow(rowData, rowCount) {
    return (
      <Row key={rowCount}>
        { rowData.map((el, index) => this.renderSquare((rowCount * this.props.columns) + index, rowCount, index + 1)) }
      </Row>
    );
  }

  render() {

    // console.log(jsx.toJS());

    /*
    let rows = [];

    this.props.squares.forEach((el, index, squares) => {
      if (!(index % this.props.columns)) {
        const rowData = squares.splice(index, this.props.columns);
        const rowCount = rows.length + 1;
        const row = this.renderRow(rowData, rowCount, index);

        rows.push(row);
      }
    })
    */

    const rows = splitIntoChunks(this.props.squares, this.props.columns).map((row, index) => {
      return this.renderRow(row, index);
    });

    return (
      <div>
        {rows}
      </div>
    )
  }
}

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

class Game extends React.Component {

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
    let history = this.state.history.splice(0, this.state.move);
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
    
    history = this.state.history.concat(Immutable.fromJS([{ index, squares }]));

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

  render() {

    const history = this.state.history;
    const current = history.getIn([this.state.move, 'squares']);
    const playerToken = this.props.players[this.state.player];
    const winner = calculateWinner(current);

    let status = winner ? `Winner: ${winner.get('token')}` : 
      this.state.move < current.size ? `Next player: ${playerToken}` : 'Draw';

    const moves = (this.state.ascendingOrder ? history : history.reverse()).map((step, index, list) => {
      const totalMoves = list.size - 1;
      const move = step.get('squares').get(0);
      const isStartMove = this.state.ascendingOrder ? index === 0 : index === totalMoves;
      const mutatedIndex = this.state.ascendingOrder ? index : totalMoves - index;
      const desc = isStartMove ? 'Go to start' : `Go to move ${index} - column - ${move.get('column')} - row - ${move.get('row')}`;
    
      return (
        <li key={index} 
          onClick={() => this.jumpTo(mutatedIndex)} 
          className={mutatedIndex === this.state.move ? 'selected' : ''}>
            <button>{desc}</button>
        </li>
      );
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

// ========================================

ReactDOM.render(
  <Game player={0} players={['X', '0']} squares={9} columns={3} />,
  document.getElementById('root')
);

function splitIntoChunks(list, chunkSize = 1) {
  return Immutable.Range(0, list.count(), chunkSize)
    .map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize));
}

function calculateWinner(squares) {
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
    if (squares.get(a).get('token') && squares.get(a).get('token') === squares.get(b).get('token') && squares.get(a).get('token') === squares.get(c).get('token')) {
      return Immutable.fromJS({ 
        token: squares.get(a).get('token'),
        sequence: lines[i]
      });
    }
  }
  return null;
}

  