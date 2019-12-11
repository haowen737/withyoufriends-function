import React, { Component } from 'react'
import './PlayList.css'

export default class PlayList extends Component {
  constructor () {
    super()
    this.state = {
      height: Math.random() * 10
    }
  }
  componentDidMount () {
  }
  randomHeight () {
    return Math.random() * 5 + 5
  }
  randomWidth () {
    return Math.random()
  }
  getArr () {
    let arr = []
    for (let i = 0; i < 30; i++) {
      arr.push(i)
    }
    return arr
  }
  render() {
    const { theme } = this.props 
    const { height } = this.state
    return (
      <div className="playlist-container">
        <ul>
        {
          this.getArr().map(i => (
            <li className="item" key={i} style={{
              background: `linear-gradient(rgba(0,0,0,0), ${theme}`,
              height: `${this.randomHeight()}rem`
            }}></li>
          ))
        }
        </ul>
        <div className="summary" style={{color: theme}}>THIS IS TITLE</div>
      </div>
    )
  }
}
