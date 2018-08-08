import React from 'react';

import { splitIntoChunks } from './helpers';
import Row from './Row';
import Square from './Square';
export default class Board extends React.Component {

    renderSquare(index, row, column) {
      const props = {
        highlight: this.props.winner && this.props.winner.includes(index),
        value: this.props.squares.getIn([index, 'token']),
        key: column,
        onClick: () => this.props.onClick(index, row, column)
      }
      return <Square {...props} />;
    }
  
    renderRow(rowData, rowCount) {
      const squares = rowData.map((el, index) => {
        const squareCount = (rowCount * this.props.columns) + index;
        return this.renderSquare(squareCount, rowCount, index + 1);
      });

      return (
        <Row key={rowCount}>{squares}</Row>
      );
    }
  
    render() {
      const rows = splitIntoChunks(this.props.squares, this.props.columns).map((row, index) => {
        return this.renderRow(row, index);
      });
  
      return (
        <div>{rows}</div>
      );
    }
  }