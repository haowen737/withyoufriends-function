import { connect } from 'react-redux'

import MusicPlayer from './component/MusicPlayer'

const mapStateToProps = state => ({
  theme: state.themeState
})

export default connect(
  mapStateToProps
)(MusicPlayer)