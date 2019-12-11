import React, { Component } from 'react'
import './Cube.css'

const randomCubeStyle = function () {
  let random1 = Math.random()
  let random2 = Math.random()
  let x = random1 > 0.5 ? random1 * random2 * 150 : random1 * random2 * -150
  let y = random1 < 0.5 ? random2 * 150 : random1 * -150
  let z = random1 > 0.5 ? random1 * random2 * 150 : random1 * random2 * -150
  const translate = `translate3d(${x}px,${y}px,${z}px)`
  const skew = `skew(${random1 * 10}deg,${random1 * 10}deg)`
  const rotate = `rotate(${random1 * 90}deg)`
  return {
    backgroundColor: '#fff',
    transform: `${translate}${rotate}`
  }
}

const Surface = function () {
  const mutiSurface = [1, 2, 3].map(i => 
    <div className="surface" style={randomCubeStyle()} key={i}></div>
  )
  return mutiSurface
}

export default class Cube extends Component {
  render() {
    return (
      <div className="cube-container">
        <Surface></Surface>
      </div>
    )
  }
}
