import React, { Component } from 'react';

import './index.css'

const isOdd = (i) => i % 2 === 0

const dispatchStyle = (i) => {
  return {
    animation: `animation-square 2s ease-in-out ${isOdd(i) ? 0 : 1}s infinite`
  }
}

const Square = ({ i }) => (
  <div className="aiglet-square" style={dispatchStyle(i)}></div>
)

const count = new Array(9).fill(0)

export default class Aiglet extends Component {
  render() {
    return (
      <div className="aiglet-container">
        {
          count.map((c, i) => <Square i={i} key={i}></Square>)
        }
      </div>
    )
  }
};
