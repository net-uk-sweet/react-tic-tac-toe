import React from 'react';

export default function Square(props) {
    const classes = props.highlight ? 'square highlight' : 'square';
    return (
      <button 
        className={classes}
        onClick={props.onClick}>
          {props.value}
      </button>
    );
  }