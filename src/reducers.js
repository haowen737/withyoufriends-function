import { combineReducers } from 'redux'

// import { THEME_CHANGE, UPDATE_USER } from './actions'
import themeState from './ducks/global'

const myRedux = combineReducers({
  themeState,
})

export default myRedux
