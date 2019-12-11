import React, { Component } from 'react'
import './loadingCircle.css'

const OutCircle = () => (
  <div className="loading-circle-large">
    <div className="loading-circle-large-inner"></div>
    <div className="loading-circle-large-block"></div>
  </div>
)

const MiddleCircle = () => (
  <div className="loading-circle-middle">
    <div className="loading-circle-middle-inner"></div>
    <div className="loading-circle-large-block"></div>
  </div>
)

const SmallCircle = () => (
  <div className="loading-circle-small">
    <div className="loading-circle-small-inner"></div>
    <div className="loading-circle-small-block"></div>
  </div>
)

export default class LoadingCircle extends Component {
  render() {
    return (
      <div className="loading-circle-container">
        <OutCircle></OutCircle>
        <MiddleCircle></MiddleCircle>
        <SmallCircle></SmallCircle>
      </div>
    )
  }
}
