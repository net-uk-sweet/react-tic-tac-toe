import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    const props = {
      value: this.props.squares[i],
      onClick: () => this.props.onClick(i)
    }
    return <Square {...props} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      move: 0,
      history: [{
        squares: Array(9).fill(null)
      }],
      player: this.props.player
    }
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.move + 1);
    const current = history[history.length - 1];  
    const player = this.state.player ? 0 : 1;
    
    let squares = [...current.squares];

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.props.players[this.state.player];
    
    this.setState({ 
      player, 
      move: history.length,
      history: history.concat([{ 
        squares: squares 
      }])
    });
  }

  jumpTo(move) {
    this.setState({ move });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.move].squares;  
    const playerToken = this.props.players[this.state.player];
    const winner = calculateWinner(current);
    const status = winner ? `Winner: ${winner}`
      : `Next player: ${playerToken}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move ${move}` : 'Go to start';
      return (
        <li key={move} onClick={() => this.jumpTo(move) }>
          <button>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current} 
            onClick={(i) => { this.handleClick(i) } } 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game player={0} players={['X', '0']} />,
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

  