import { css } from 'react-emotion'

export const articleList = css({
  padding: '30px 0',
})

export const articleStyle = css({
  display: 'block',
  maxWidth: '50rem',
  padding: '10px',
  margin: '5rem auto',
  transition: 'all 2s',
  animation: 'article-animation .3s linear',
  cursor: 'pointer',
  ':hover':  {
    transform: 'translate3d(-3px, 0, 0)'
  },
  '& .article-title': {
    float: 'left',
    fontSize: '1.5rem',
    fontWeight: 200,
    color: '#666',
    lineHeight: '3rem',
    transition: 'all .2s ease',
  },
  '& .article-summary': {
    padding: '3px 0',
    fontSize: '1rem',
    fontWeight: 200,
    color: '#333',
  },
  '& .article-date': {
    lineHeight: '3rem',
    display: 'block',
    float: 'right',
    color: '#ddd',
  }
})

export const pendingHomeStyle = css({
  animation: 'pending-home 1.5s linear infinite',
  lineHeight: 1,
  margin: '10px 0',
  opacity: 1,
  color: '#eaeaea !important',
  backgroundColor: '#eaeaea',
  transition: 'all 1s linear',
  '@keyframes pending-home': {
    '0%': {
      transform: 'scale(1) translateY(0%)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(.9) translateY(50%)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1) translateY(0%)',
      opacity: 1,
    },
  },
  '@keyframes article-animation': {
    'from': {
      opacity: 0,
      transform: 'sranslate3d(0, -10%, 0)',
    },
    'to': {
      opacity: 1,
      transform: 'sranslate3d(0, 0, 0)',
    },
  }
})
