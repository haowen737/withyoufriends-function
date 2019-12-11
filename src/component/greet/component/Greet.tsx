import * as React from 'react'
// import styled from 'react-emotion'
import ParticleEffectButton from 'react-particle-effect-button'
import {RouteComponentProps} from "react-router"

import GreetContent from '../../greetContent'
// import GreetFlower from '../greetFlower/GreetFlower'
import GreetHeader from '../../greetHeader/GreetHeader'
import SocialLinkList from './SocialLinkList'
import GreetCanvas from './GreetCanvas'

import { ThemeEnum } from '../../../Hero.service'
import { ThemeState } from '@types'

import { greetStyle } from '../style'

interface Props {
  theme: ThemeState;
  themeChange: any
}

interface State {
  heroIndex: number,
  startButtonHidden: boolean
}

export default class Greet extends React.Component<Props & RouteComponentProps<any>, State> {
  private greetMan: any
  constructor (props: Props & RouteComponentProps<any>) {
    super(props)
    this.state = {
      heroIndex: 0,
      startButtonHidden: false
    }
  }

  componentDidMount() {
    this.emitThemeChange()
    this.initIntervalIndexManager()
    document.addEventListener('visibilitychange', this.handleBrowserTabChange)
  }

  componentWillUnmount() {
    this.removeIntervalIndexManager()
    document.removeEventListener('visibilitychange', this.handleBrowserTabChange)
  }

  handleBrowserTabChange = () => {
    if (this.greetMan) {
      this.removeIntervalIndexManager()
    } else {
      this.initIntervalIndexManager()
    }
  }

  initIntervalIndexManager = () => {
    this.greetMan = setInterval(this.indexManager.bind(this), 7000)
  }
  removeIntervalIndexManager = () => {
    if (this.greetMan) {
      clearInterval(this.greetMan)
      this.greetMan = null
    }
  }
  indexManager = () => {
    this.setState((prev) => {
      const currIndex = prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
      return {
        heroIndex: currIndex
      }
    }, () => {
      this.emitThemeChange(this.state.heroIndex)
    })
  }

  rd = (n: number, m: number) => {
    const c = m - n
    return Math.floor(Math.random() * c + n)
  }

  emitThemeChange = (index: number = -1) => {
    const hero = ThemeEnum[index > -1 ? index : this.rd(0, 4)]
    this.props.themeChange(hero)
  }

  onClickStart() {
    const { history } = this.props
    this.setState({
      startButtonHidden: true
    }, () => {
      setTimeout(() => {
        history.push('/blog')
      }, 700)
    })
  }

  renderStartButton(): JSX.Element | void {
    const { startButtonHidden } = this.state
    const { color, btnTheme } = this.props.theme
    console.log('style---', greetStyle)
    return (
      <div>
        <ParticleEffectButton
          style="fill"
          color='#121019'
          duration={800}
          canvasPadding={20}
          hidden={startButtonHidden}
        >
          <a
           className="buttonStyle"
            // to="/blog"
            onClick={() => { this.onClickStart() }}
            style={{
              color,
              backgroundColor: btnTheme,
              display: 'block',
            }}>
              START A TRIP
          </a>
        </ParticleEffectButton>
      </div>
    )
  }
  
  render() {
    const { theme } = this.props

    return (
      <div className={greetStyle} style={{backgroundColor: theme.theme}}>
        <GreetHeader theme={theme} />
        {/* <div className="greet-flower-layout">
          <GreetFlower
            theme={theme}
            poem={theme.poem} />
        </div> */}
        <div className="greet-content-layout">
          <GreetContent
            theme={theme}
          />
          {this.renderStartButton()}
          {/* <SocialLinkList theme={theme} /> */}
        </div>
        <GreetCanvas />
      </div>
    )
  }
}

