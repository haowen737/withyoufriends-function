import * as React from 'react'
import { Link } from 'react-router-dom'
import './GreetHeader.css'

import { ThemeState } from '@types'
import GreetNav from './GreetNav.service'

interface Props {
  theme: ThemeState
}

export default class Header extends React.Component<Props> {
  renderLogo = () => {
    const theme = this.props.theme
    return <Link className="logo" to="/" style={{ color: theme.color }}>hi_Haowen</Link>
  }

  renderNav = () => {
    const theme = this.props.theme
    return (
      <nav className="nav">
      {
        GreetNav.map((n, i) => (
          <Link key={i} to={n.url} style={{color: theme.color}}>{n.title}</Link>
        ))
      }
      </nav>
    )
  }
  
  render() {
    return (
      <div className="header-container">
        {this.renderLogo()}
        {this.renderNav()}
      </div>
    )
  }
}
