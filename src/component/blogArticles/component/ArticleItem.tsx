import * as React from 'react'
import { Link } from 'react-router-dom'
import { createSkeletonProvider, createSkeletonElement } from '@trainline/react-skeletor'

import { DateFormat } from '@utils'

import { articleStyle, pendingHomeStyle } from '../style'

interface ActicleProps {
  article: any
  index: number
}

const SkeletorSetting = {
  article: {
    title: '____________________________',
    summary: '______________________________________________________',
    created_at: '____________'
  }
}

const ArticleSelf = ({ article, index }: ActicleProps) => {
  const Title = createSkeletonElement('h2', pendingHomeStyle)
  const Summary = createSkeletonElement('p', pendingHomeStyle)
  const Date = createSkeletonElement('span', pendingHomeStyle)
  return (
    <Link to={ article.id
      ? { pathname: `/blog/article/${article.id}` }
      : { pathname: '/blog' }
      } className={articleStyle}>
      <div className="clearfix">
        <Title className="article-title">{article.title}</Title>
        <Date className="article-date">{DateFormat(article.created_at || 0, 'YYYY-MM-DD hh:mm:ss')}</Date>
      </div>
      <Summary className="article-summary">{article.summary}</Summary>
    </Link>
  )  
}

export default createSkeletonProvider(
  SkeletorSetting,
  ({ article }) => article === null
)(ArticleSelf)
