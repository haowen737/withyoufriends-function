import * as React from 'react'
import { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { themeChange, WithYouAction } from '../../ducks/global'
import { ThemeState, StoreState } from '@types'

import BlogArticles from '../blogArticles'
import BlogArticle from '../blogArticle'
import BlogTags from '../blogTags/BlogTags'
import BlogHeader from '../blogHeader/BlogHeader'

import { BlogTheme } from '../../Hero.service'

import './Blog.css'

interface Props {
  themeChange: any,
  theme: ThemeState
}

class Blog extends React.Component<Props> {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  render() {
    const { theme } = this.props
    return (
      <React.Fragment>
        <BlogHeader color={theme.color} />
        <div className="blog-main">
          <Switch>
            <Route path="/blog" exact component={BlogArticles} />
            <Route path="/blog/tags" exact component={BlogTags} />
            <Route path="/blog/article/:id" component={BlogArticle} />
          </Switch>
        </div>
      </React.Fragment>
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
)(Blog)
