import { css } from 'react-emotion'

export default css({
  lineHeight: 1,
  textAlign: 'center',
  animation: 'content-wrap-animation .5s linear',
  '& .heroSummary': {
    fontSize: '1.7rem',
    fontWeight: 300,
    color: 'rgba(0,0,0,0.4)',
    margin: '1rem 0',
  },
  '& .type-writter-wrapper': {
    position: 'relative',
    fontSize: '5rem',
    color: '#191919',
    textIndent: '-0.2rem',
  },
  '& .type-writter': {
    position: 'relative',
    color: '#666',
  },
  '& .type-writter::after': {
    content: '""',
    margin: 'auto',
    position: 'absolute',
    right: -4,
    top: 10,
    width: 1,
    height: '70%',
    backgroundColor: '#666',
    animation: 'cursor-animation 1.5s step-end infinite',
  },
  '& .hero-title-br': {
    display: 'none',
    '@media (max-width: 1200px)': {
      display: 'block'
    }
  },
  '@keyframes type-writer': {
    'from': {
      width: '0%'
    },
    'to': {
      width: '100%'
    }
  },
  '@keyframes cursor-animation': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  },
  '@keyframes content-wrap-animation': {
    'from': {
      opacity: 0,
      transform: 'translateY(10%)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
})
