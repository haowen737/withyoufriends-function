import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

import { playerContentStyle } from '../style'

const duration = 270;

const renderDefaultStyle = i => ({
  transition: `all 600ms ease`,
  opacity: 0,
  transform: `translate(-80%, ${-100 * (i + 1)}%)`,
})

const renderTitleDefaultStyle = i => ({
  transition: `all 800ms cubic-bezier(0.85, 0.02, 0.18, 0.96)`,
  opacity: 0,
  transform: `translate(-80px,0,0)`,
})

const renderTransitionStyles = (i, state) => ({
  entering: { opacity: 0, filter: 'blur(2px) brightness(100%)', transform: `translate3d(-30%, ${-100 * (i + 1)}%, 0)` },
  entered: { opacity: 1, filter: 'blur(0) brightness(100%)', transform: `translate3d(0, ${-100 * (i + 1)}%, 0)` },
  exiting: { opacity: 1, filter: 'blur(0) brightness(100%)', transform: `translate3d(0, ${-100 * (i + 1)}%, 0)` },
  exited: { opacity: 0, filter: 'blur(2px) brightness(100%)', transform: `translate3d(-30%, ${-100 * (i + 1)}%, 0)` }
})

const renderTitleTransitionStyles = (i, state) => ({
  entering: { opacity: 0, transform: `translate3d(-80px, 0, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  exiting: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  exited: { opacity: 0, transform: `translate3d(-80px, 0, 0)` }
})

const PlayList = ({ playList, theme, listShow, onClickItem }) => {
  const renderTimeout = i => ({
    enter: 20 + (30 * i),
    exit: 20 + (30 * i),
  })
  return (
      playList.map((p, i) => {
        return (
          <Transition in={listShow} appear={false} timeout={renderTimeout(i)} key={i}>
            {(state) => (
              <React.Fragment>
                <a
                  className="playlist-content"
                  style={{
                    ...renderDefaultStyle(i),
                    ...renderTransitionStyles(i, state)[state],
                    ...{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg }
                  }}
                  onClick={() => {onClickItem(p)}}
                >
                  <span
                    style={{
                      ...renderTitleDefaultStyle(i),
                      ...renderTitleTransitionStyles(i, state)[state]
                    }}
                  >{p.title}</span>
                </a>
              </React.Fragment>
            )}
          </Transition>
        )
      })
  )
}

const CurrentPlaying = ({ theme, currMusic, onMouseEnterContent, onMouseLeaveContent }) => {
  // let clickContent = onMouseEnterContent && onMouseEnterContent.bind(this, currMusic)
  return (
    <Transition appear={true} in={true} timeout={duration}>
      <div
        className="currentplaying"
        style={{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg}}
        onMouseEnter={onMouseEnterContent}
      >
        <h3 className="title">{currMusic.title}</h3>
        <p className="artist">By {currMusic.artist}</p>
      </div>
    </Transition>
  )
}

export default class PlayerContent extends Component {
  constructor () {
    super()
    this.state = {
      listShow: false
    }
  }
  componentDidMount () {
  }
  onMouseEnterContent () {
    !this.state.listShow && this.setState({ listShow: true })
  }
  onMouseLeaveContent () {
    this.state.listShow && this.setState({ listShow: false })
  }
  onClickItem (item) {
    console.log('onClickItem', item)
  }
  render() {
    const { currMusic, theme, playList } = this.props
    const { listShow } = this.state
    return (
      <div
        className={playerContentStyle}
        style={{left: `translateX(-100%)`}}
        onMouseLeave={this.onMouseLeaveContent.bind(this)}
      >
        <CurrentPlaying
          currMusic={currMusic}
          theme={theme}
          onMouseEnterContent={this.onMouseEnterContent.bind(this)}
        >
        </CurrentPlaying>
        <PlayList
          playList={playList}
          theme={theme}
          listShow={listShow}
          onClickItem={this.onClickItem}
        ></PlayList>
      </div>
    )
  }
}
