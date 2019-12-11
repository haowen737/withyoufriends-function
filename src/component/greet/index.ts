import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router"

import { themeChange, WithYouAction } from '../../ducks/global'
import { ThemeState, StoreState } from '@types'

import Greet from './component/Greet'

const mapStateToProps = (state: StoreState) => ({
  theme: state.themeState,
  apis: state.apis
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: ThemeState) => dispatch(themeChange(theme))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Greet))