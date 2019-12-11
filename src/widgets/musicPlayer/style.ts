import { css } from 'react-emotion'

export const musicPlayerStyle = css({
  position: 'fixed',
  bottom: '10%',
  height: '80px',
  color: '#fff',
  zIndex: 20,
  transition: 'all .8s cubic-bezier(0.65, 0.02, 0.18, 0.66)',
  boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
  whiteSpace: 'nowrap',
  '& .cover': {
    position: 'relative',
    float: 'left',
    width: '80px',
    height: '80px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: 'cover-animatioin .6s linear',
    zIndex: 100,
    cursor: 'pointer',
  }
})


export const playerContentStyle = css({
  height: '100%',
  float: 'left',
  paddingLeft: 20,
  'a': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    padding: '10px 30px',
    fontWeight: 'lighter',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    textIndent: '20px',
    transition: 'all 1s linear',
    boxShadow: '-2px -2px 4px rgba(0,0,0,.2)',
  },
  'a::after': {
    content: '""',
    position: 'absolute',
    bottom: '0px',
    left: '0',
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(0,0,0,.2)',
    transform: 'scaleY(.5)',
  },
  'a:hover': {
    transition: 'all .7s ease',
    width: '105%',
    padding: '10px 40px',
    filter: 'brightness(110%)',
  },
  '@media (max-width: 1100px)': {
    bottom: '15%',
    '& .title': {
      fontSize: '1.1rem',
      animation: 'none',
    },
    '& .cover': {
      animation: 'none',
    },
    '& .control-play': {
      animation: 'none',
    },
    '& .content': {
      animation: 'none',
    },
  }
})
