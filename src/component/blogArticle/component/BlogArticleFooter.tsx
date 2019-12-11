import * as React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'

const defaultStyle = {
  transition: `all 600ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(30%, 0, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

interface Props {
  tags: string
}

export default class BlogArticleFooter extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  renderTagTransition = () => {
    const { tags } = this.props
    return (
      <TransitionGroup>
        {
          tags && tags.split(',').map((t, index) => (
            <Transition key={index} in={true} appear={true} timeout={(100 + (100 * index))}>
              {(state: any) => (
                <Link
                style={{
                  ...defaultStyle,
                  ...{transform: `translate3d(${index * 10}%, 0, 0)`},
                  ...transitionStyles[state]
                }}
                to='/'>
                  {t}
                </Link>
              )}
            </Transition>
          ))
        }
      </TransitionGroup>
    )
  }

  renderTagList = () => (
    <div className="taglist-container">
      <i className="iconfont">&#xe61f;</i>
      <div className="tag-list">
        {this.renderTagTransition()}
      </div>
    </div>
  )

  render() {
    return (
      <div className="blog-article-footer">
        {this.renderTagList()}
      </div>
    )
  }
}
