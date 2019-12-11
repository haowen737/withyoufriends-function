import React, { Component } from 'react'

import './SpinningSpread.css'

export default class SpinningSpread extends Component {
  constructor () {
    super ()
    this.state = {
      btnTransition: '',
      line1: '',
      line2: '',
      line3: ''
    }
  }
  componentWillMount () {
    setInterval(() => {
      this.startAnimation()
    }, 7000)
  }
  startAnimation () {
    if (this.state.btnTransition !== 'btn-upper-arrow') {
      this.setState({
        btnTransition: 'btn-upper-arrow',
        line1: 'line-arrow-1',
        line2: 'line-arrow-2',
        line3: 'line-arrow-3'
      })
      
    } else {
      this.setState({
        btnTransition: 'btn-normal',
        line1: 'line-normal-1',
        line2: 'line-normal-2',
        line3: 'line-normal-3'
      })
    }
  }
  render() {
    const { btnTransition, line1, line2, line3 } = this.state
    return (
      <div>
        <div className={`${btnTransition} bottom-btn`}>
          <div className={`${line1} line`}></div>
          <div className={`${line2} line`}></div>
          <div className={`${line3} line`}></div>
        </div>
      </div>
    )
  }
}
