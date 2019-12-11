import React, { Component } from 'react'
import './RainDrop.css'


const Cloud = function () {
  return (
    <div className="cloud-container">
      <div className="cloud cloud-m"></div>
      <div className="cloud cloud-l"></div>
      <div className="cloud cloud-r"></div>
      <div className="cloud cloud-r-r"></div>
      <div className="cloud cloud-l-l"></div>
    </div>
  )
}

const randomStyle = function (i) {
  const random = Math.random()
  return {
    animationDelay: `${random * i * 3}s`,
    left: `${random > 0.5 ? random * i * 100 : -random * i * 100}px`
  }
}

const Rain = function () {
  const rains = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => 
    <div className="rain" style={randomStyle(i)} key={i}></div>
  )
  return rains
}
export default class RainDrop extends Component {
  render() {
    return (
      <div className="rain-drop">
        <Cloud></Cloud>
        <Rain></Rain>
      </div>
    )
  }
}
