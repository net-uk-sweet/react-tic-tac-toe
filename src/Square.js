import React from 'react';

const Square = props => {
  const classes = props.highlight ? 'square highlight' : 'square';
  return (
    <button 
      className={classes}
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}

export default Square;