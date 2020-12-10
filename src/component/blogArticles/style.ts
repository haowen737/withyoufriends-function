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
  cursor: 'pointer',
  ':hover':  {
    transform: 'translate3d(-3px, 0, 0)'
  },
  '& .article-title': {
    position: 'absolute',
    left: 0,
    right: 150,
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
    width: '130px',
    color: '#ddd',
  }
})

export const pendingHomeStyle = css({
  // animation: 'pending-home 1.5s linear infinite',
  lineHeight: 1,
  margin: '10px 0',
  opacity: 1,
  color: '#eaeaea !important',
  backgroundColor: '#eaeaea',
  transition: 'all 1s linear',
  '@keyframes pending-home': {
    '0%': {
      transform: 'translateY(0%)',
      opacity: 1,
    },
    '50%': {
      transform: 'translateY(50%)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
