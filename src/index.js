import React from 'react';
import ReactDOM from 'react-dom';
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
      value: this.props.squares[i].token,
      key: i + 1,
      onClick: () => this.props.onClick(i, row, column)
    }
    return <Square {...props} />;
  }

  renderRow(rowData, rowCount, index) {
    return (
      <Row key={rowCount}>
        { rowData.map((el, _index) => this.renderSquare(index + _index, rowCount, _index + 1)) }
      </Row>
    );
  }

  render() {
    let rows = [];

    this.props.squares.forEach((el, index) => {
      if (!(index % this.props.columns)) {
        const arr = [...this.props.squares];
        const rowData = arr.splice(index, this.props.columns);
        const rowCount = rows.length + 1;
        const row = this.renderRow(rowData, rowCount, index);

        rows.push(row);
      }
    })

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
  history: [{
    squares: Array(squares).fill().map(() => ({
      token: null,
      column: null,
      row: null
    }))
  }],
  player: player
});

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.setInitialState();
  }

  setInitialState() {
    return {...defaultState(this.props.squares, this.props.player)};
  }

  handleToggleOrderClick() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    })
  }

  handleResetClick() {
    this.setState(this.setInitialState());
  }

  handleSquareClick(index, row, column) {
    const history = this.state.history.slice(0, this.state.move + 1);
    const current = history[history.length - 1];  
    const player = this.state.player ? 0 : 1;
    
    let squares = [...current.squares];

    if (calculateWinner(squares) || squares[index].token) {
      return;
    }

    squares[index] = {
      token: this.props.players[this.state.player],
      row,
      column
    };
    
    this.setState({ 
      player, 
      move: history.length,
      history: history.concat([{ 
        index: index,
        squares: squares 
      }])
    });
  }

  jumpTo(move) {
    const player = move % 2 ? 1 : 0;
    this.setState({ move, player });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.move].squares;  
    const playerToken = this.props.players[this.state.player];
    const winner = calculateWinner(current);

    let status = winner ? `Winner: ${winner.token}` : 
      this.state.move < current.length ? `Next player: ${playerToken}` : 'Draw';

    const moves = (this.state.ascendingOrder ? history : [...history].reverse()).map((step, index, arr) => {
      const totalMoves = arr.length - 1;
      const move = step.squares[step.index];
      const isStartMove = this.state.ascendingOrder ? index === 0 : index === totalMoves;
      const mutatedIndex = this.state.ascendingOrder ? index : totalMoves - index;
      const desc = isStartMove ? 'Go to start' : `Go to move ${index} - column - ${move.column} - row - ${move.row}`;
    
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
            winner={winner && winner.sequence}
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
    if (squares[a].token && squares[a].token === squares[b].token && squares[a].token === squares[c].token) {
      return { 
        token: squares[a].token,
        sequence: lines[i]
      }
    }
  }
  return null;
}

  