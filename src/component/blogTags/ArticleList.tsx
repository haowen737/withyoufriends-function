import * as React from 'react'
import { Transition } from 'react-transition-group'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import { DateFormat } from '@utils'
import Axios from 'axios'

interface Props {
  activeTag: any
}

interface State {
  articleList: any[]
  articleListIn: boolean
}

interface ArticleProps {
  children: JSX.Element
  index: number
  article: any
  articleListIn: boolean
}

interface ListSelfProps {
  articleList: any[]
  articleListIn: boolean
}

const Article = ({ children, index, article, articleListIn }: ArticleProps) => {
  return (
    <Transition in={articleListIn} appear={true} timeout={(50 + (50 * index))}>
    {(state: any) => (
      <li 
      key={index}
      style={{
        ...defaultStyle,
        ...{transform: `translate3d(0, -${index * 10}%, 0)`},
        ...transitionStyles[state]
      }}>
        {children}
      </li>
    )}
  </Transition>
  )
}

const ListSelf = ({ articleList, articleListIn }: ListSelfProps) => (
  <ul className="article-list">
  {
    articleList.map((article, i) => (
      <Article
      key={i}
      article={article}
      articleListIn={articleListIn}
      index={i}>
        <div className="article-card clearfix">
          <div className="article-left">
            <p>{DateFormat(article.created_at, 'YYYY-MM-DD hh:mm:ss')}</p>
          </div>
          <div className="article-right">
            <h2>{article.title}</h2>
          </div>
        </div>
      </Article>
    ))
  }
  </ul>
)

const EmptyList = () => (
  <div className="empty-list">搜索中...</div>
)

export default class ArticleList extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      articleList: [],
      articleListIn: false
    }
  }

  componentWillReceiveProps ({ activeTag }: Props) {
    this.setState({ articleListIn: false })
    // this.getArticles(activeTag)
  }

  getArticles (activeTag: string) {
    Axios.get('/api/article', { params: { tag: activeTag }})
      .then(({ data }: any) => {
        this.setState({ articleList: data })
        setTimeout(() => {
          this.setState({ articleListIn: true })
        }, 600);
      })
  }

  render() {
    const { articleList, articleListIn } = this.state
    return (
      <div className="article-list-container">
      {
        articleList.length
        ? <ListSelf articleList={articleList} articleListIn={articleListIn} />
        : <EmptyList />
      }
      </div>
    )
  }
}
