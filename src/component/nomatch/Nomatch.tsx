import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { BlogTheme } from '../../Hero.service'
import { themeChange, WithYouAction } from '../../ducks/global'
import { ThemeState, StoreState } from '@types'

import './Nomatch.css'

interface Props {
  themeChange: any
}


class Nomatch extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props)
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  render() {
    return (
      <div className="nomatch-layout">
        <div className="nomatch-body">
          <p>404</p>
          <p>Oops... looks like you got lost</p>
          <Link to="/">Take me back</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  theme: state.themeState
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => {
  return {
    themeChange: (theme: ThemeState) => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nomatch)
