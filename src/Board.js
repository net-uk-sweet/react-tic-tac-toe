import React from 'react';

import { splitIntoChunks } from './helpers';
import Row from './Row';
import Square from './Square';

export default class Board extends React.Component {

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