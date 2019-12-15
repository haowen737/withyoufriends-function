import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { themeChange, WithYouAction } from '../../ducks/global'
import { BlogTheme } from '../../Hero.service'
import { ThemeState, StoreState } from '@types'
import SocialLinkList from './SocialLinkList'

import './me.css'

interface Props {
  themeChange: any
  theme: ThemeState
  history: any
}


class Me extends React.Component<Props> {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }

  renderWindow = () => {
    return (
      <div className="window">Haowen</div>
    )
  }
  
  render() {
    const { history } = this.props
    return (
      <div>
        <a className="signin-navback" onClick={history.goBack}>
          <i className="iconfont">&#xe608;</i>
          Back To Blog
        </a>
        {this.renderWindow()}
        <SocialLinkList theme={this.props.theme} />
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  theme: state.themeState
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: ThemeState) => dispatch(themeChange(theme))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Me)