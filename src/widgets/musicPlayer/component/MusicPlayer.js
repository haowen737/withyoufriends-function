import React, { Component } from 'react'

import '../MusicPlayer.css'

import MyMusic from './MyMusic'
import DefaultPlayer from './DefaultPlayer'

export default class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currMusic: MyMusic[0]
    }
  }
  renderPlayerLeft (theme) {
    const type = theme.musicPlayerType
    return type === 'hide' ? `-90%` : '-20px'
  }
  render() {
    const { theme } = this.props
    const { currMusic } = this.state
    return (
      <DefaultPlayer
        left={this.renderPlayerLeft(theme)}
        theme={theme}
        MyMusic={MyMusic}
        currMusic={currMusic} />
    )
  }
}

