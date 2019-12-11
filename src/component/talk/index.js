import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BlogTheme } from '../../Hero.service'
import { themeChange } from '../../ducks/global'
import LoadingBall from '../../widgets/loadingBall/LoadingBall'

import TalkHeader from './TalkHeader'

import './index.css'

window.PAGE_URL = 'https://www.withyoufriends.com'
window.PAGE_IDENTIFIER = '/talk-with-me-please'
window.disqus_config = function () {
  this.page.url = window.PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = window.PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

class ThirdPartyComment extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    this.props.themeChange(BlogTheme);
    
    (function () { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }
  render() {
    const { loading } = this.state
    return (
      <React.Fragment>
        <TalkHeader></TalkHeader>
        {
          loading && (
            <div className="talk-loading-wrap">
              <LoadingBall color="#666"></LoadingBall>
            </div>
          )
        }
        <div className="talk-wrapper">
          <div id="disqus_thread"></div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themeState,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyComment)