import * as React from 'react'
import { Link } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'

import NavService from './Nav.Service'

import './BlogHeader.css'

interface Props {
  color: string
}

interface Propss {
  children: any
  index: number
  data: any
}

const defaultStyle = {
  transition: `all 600ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(30%, 0, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const Nav = ({ children, index, data }: Propss) => {
  return (
    <Transition in={true} appear={true} timeout={(100 + (100 * index))}>
      {(state: any) => (
        <Link 
        style={{
          ...defaultStyle,
          ...{transform: `translate3d(${index * 10}%, 0, 0)`},
          ...transitionStyles[state]
        }}
        to={data.to}>
          {children}
        </Link>
      )}
    </Transition>
  )
}

export default class BlogHeader extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }

  renderLogo(): JSX.Element {
    return <Link className="logo" to="/" style={{color: this.props.color}}>withyoufriends</Link>
  }

  renderNavList(): JSX.Element[] {
    return (
      NavService.map((n: any, i: number) => (
        <Nav key={i} index={i} data={n}>{n.name}</Nav>
      ))
    )
  }
  
  render() {
    return (
      <div className="blog-header-layout">
        {this.renderLogo()}
        <nav className="blogheader-nav">
          <TransitionGroup>
            {this.renderNavList()}
          </TransitionGroup>
        </nav>
      </div>
    )
  }
}
