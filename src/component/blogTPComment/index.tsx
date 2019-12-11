import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { BlogTheme } from '../../Hero.service'
import { themeChange, WithYouAction } from '../../ducks/global'
import { ThemeState, StoreState } from '@types'

import './index.css'

interface Props {
  themeChange: any
  articleId: number
}

interface WindowInterface extends Window {
  PAGE_URL?: string
  PAGE_IDENTIFIER?: string
  disqus_config?: () => void
  page?: any
}

const win: WindowInterface = window

class BlogTPComment extends React.Component<Props, object> {
  constructor (props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.themeChange(BlogTheme)
    this.loadDisqus()
  }

  loadDisqus() {
    const { articleId } = this.props
    win.PAGE_URL = `https://www.withyoufriends.com`
    win.PAGE_IDENTIFIER = `/blog/article?id=${articleId}`
    win.disqus_config = function () {
      this.page.url = win.PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = win.PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (() => { // DON'T EDIT BELOW THIS LINE
      const d = document
      const s = d.createElement('script');
      const timestamp =  new Date().valueOf().toString()
      s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
      s.setAttribute('data-timestamp', timestamp);
      (d.head || d.body).appendChild(s);
    })();
  }

  render() {
    return (
      <div className="article-comment-wrapper">
        <div id="disqus_thread" />
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  theme: state.themeState,
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: ThemeState) => dispatch(themeChange(theme))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogTPComment)