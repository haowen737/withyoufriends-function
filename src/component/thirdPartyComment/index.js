import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BlogTheme } from '../../Hero.service'
import { themeChange, checkUser } from '../../ducks/global'

import './index.css'

class ThirdPartyComment extends Component {
  componentDidMount() {
    this.props.themeChange(BlogTheme)
    const PAGE_URL = 'https://www.withyoufriends.com'
    const PAGE_IDENTIFIER = 'withyoufriends'
    var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
      (function () { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
  }
  render() {
    return (
      <div className="comment-wrapper">
        <div id="disqus_thread"></div>
      </div>
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