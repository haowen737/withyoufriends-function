import * as React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group';

import { ThemeState } from '@types'

import './GreetFlower.css'

const renderDefaultStyle = (i: number) => {
  ++i
  return {
    transition: `all ${(i - i * 0.6) > 1.2 ? (i - i * 0.7) : (i - i * 0.6)}s ease`,
    opacity: 0,
    transform: `translateX('0')`,
  }
}

const renderTransitionStyles = (i: number) => {
  ++i
  const entering = { opacity: 0, transform: `translateX(-10%)` }
  const entered = { opacity: 1 - 0.1 * i, transform: `translateX(0)` }
  const exiting = { opacity: 1 - 0.1 * i, transform: `translateX(0%)` }
  const exited = { opacity: 0, transform: `translateX(10%)` }
  return {
    entering,
    entered,
    exiting,
    exited
  }
}

interface Props {
  poem: string[]
  theme: ThemeState
}

interface State {
  show: boolean
  poem: string[]
}

export default class GreetFlower extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      show: false,
      poem: []
    }
  }
  
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        show: true,
        poem: this.props.poem
      })
    }, 0)
  }
  
  componentWillReceiveProps() {
    this.setState({ show: false })
    setTimeout(() => {
      this.setState({
        show: true,
        poem: this.props.poem
      })
    }, 1000)
  }

  renderPoems = () => {
    const { theme } = this.props
    const { show, poem } = this.state
    const doc = poem.map((item, i) => (
      <Transition
      in={show}
      timeout={0}
      appear={true}
      key={i}>
        {(state: any) => (
          <p style={{
            color: theme.headerTheme,
            ...renderDefaultStyle(i),
            ...renderTransitionStyles(i)[state]
          }}>
            {`${item}`}
          </p>
        )}
      </Transition>
    ))
    return doc
  }

  render() {
    return (
      <div className="greet-flower">
        <TransitionGroup className="fade-list">
        {this.renderPoems()}
        </TransitionGroup>
      </div>
    )
  }
}
