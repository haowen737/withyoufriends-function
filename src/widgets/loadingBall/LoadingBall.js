import React, { Component } from 'react'
import './LoadingBall.css'

export default class componentName extends Component {
  constructor () {
    super()
    this.state = {
      backgroundColor: null
    }
  }
  render() {
    const { color } = this.props
    return (
      <div>
        <div className="neo-loading-layout" style={{top: `50%`}}>
          <div className="ball ball-1" style={{backgroundColor: color}}></div>
          <div className="ball ball-2" style={{backgroundColor: color}}></div>
          <div className="ball ball-3" style={{backgroundColor: color}}></div>
          <div className="ball ball-4" style={{backgroundColor: color}}></div>
        </div>
      </div>
    )
  }
}

