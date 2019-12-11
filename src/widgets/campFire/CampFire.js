import React, { Component } from 'react'
import './CampFire.css'

export default class CampFire extends Component {
  render() {
    return (
      <div className="camp-fire">
        <div className="dragon"></div>
        <div className="fire fire-r"></div>
        <div className="fire fire-m"></div>
        <div className="fire fire-l"></div>
        <div className="fire fire-r-2"></div>
        <div className="fire fire-m-2"></div>
        <div className="fire fire-l-2"></div>
        <div className="fire fire-r-3"></div>
        <div className="fire fire-m-3"></div>
        <div className="fire fire-l-3"></div>
        <div className="wood wood-l"></div>
        <div className="wood wood-r"></div>
      </div>
    )
  }
}
