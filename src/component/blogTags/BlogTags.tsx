import * as React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'

import ArticleList from './ArticleList'
import { Swagger } from '@utils'

// import * as TransitionConfig from './TransitionConfig'
import { defaultStyle, transitionStyles, defaultHeaderStyle, transitionHeaderStyles } from './TransitionConfig'

import './BlogTags.css'

interface State {
  tags: string[]
  activeTag: string
  activeTagIn: boolean
}

interface TagProps {
  children?: JSX.Element
  index: number
  tag: any
}

export default class BlogTags extends React.Component<object, State> {
  constructor (props: object) {
    super(props)
    this.state = {
      tags: [],
      activeTag: '',
      activeTagIn: true
    }

    this.onClickTag = this.onClickTag.bind(this)
  }

  componentWillMount () {
    this.getTagList()
  }

  getTagList () {
    Swagger.apis.tags.getTags()
      .then(({ data }: any) => {
        this.setState({ tags: data, activeTag: data[0] })
      })
    // Axios
    //   .get('/api/article/getTags')
    //   .then(({ data }) => {
    //     this.setState({ tags: [] })
    //     setTimeout(() => {
    //     }, 0)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  onClickTag(tag: string): void {
    // 首先清空activeTag，触发离场动画
    this.setState({ activeTagIn: false })
    setTimeout(() => {
      this.setState({ activeTag: tag, activeTagIn: true })
    }, 400)
  }

  renderTag (argv: TagProps) {
    const { index, tag } = argv
    const { activeTag } = this.state

    return (
      <Transition in={true} appear={true} timeout={(50 + (50 * index))}>
        {(state: any) => (
          <li
            key={index}
            style={{
              ...defaultStyle,
              ...{transform: `translate3d(0, -${index * 10}%, 0)`},
              ...transitionStyles[state]
            }}
            className={tag === activeTag ? `tag-active` : ''}
            onClick={() => {this.onClickTag(tag)}}
          >
            {tag}
          </li>
        )}
      </Transition>
    )
  }

  renderTagList () {
    const { tags } = this.state
    return (
      <ul className="tags-list">
        <TransitionGroup>
          {
            tags.map((tag, index) => (
              this.renderTag({ index, tag })
            ))
          }
        </TransitionGroup>
      </ul>
    )
  }

  renderTagListHeader () {
    const { activeTag, activeTagIn } = this.state

    return (
      <Transition in={activeTagIn} appear={true} timeout={300}>
        {
          (state: any) => (
            <header
              className="article-list-header"
              style={{
                ...defaultHeaderStyle,
                ...transitionHeaderStyles[state]
              }}>
              { activeTag }
            </header>
          )
        }
      </Transition>
    )
  }

  render() {
    const { activeTag } = this.state
    return (
      <div className="tags-container">
        {this.renderTagList()}
        {this.renderTagListHeader()}
        <ArticleList activeTag={activeTag} />>
      </div>
    )
  }
}
