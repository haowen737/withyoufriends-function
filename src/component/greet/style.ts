import { css } from 'react-emotion'

export const greetCanvasStyle = css({})

export const greetStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: 'all .6s linear',
  '& .buttonStyle': {
    display: 'block',
    width: '40rem',
    color: '#fff',
    padding: '1.5rem 2.3rem',
    margin: '1rem 0',
    cursor: 'pointer',
    transition: 'all .5s ease',
    transitionDelay: '.6',
    '@media (max-width:600px)': {
      width: '20rem'
    }
    // animation: 'start-btn-animation 1.5s',
  },
  '& .greet-content-layout': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    '@media (max-width:1100px)': {
      width: '100%'
    }
  },
  '& .greet-flower-layout': {
    position: 'absolute',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    '@media (max-width:1100px)': {
      display: 'none'
    }
  },
  '& .sociallink-list-container': {
    position: 'fixed',
    padding: '1rem 10rem',
    right: 0,
    bottom: '10%',
    width: '100%',
    textAlign: 'right',
    '@media (max-width: 1100px)': {
      padding: '10px 0',
      bottom: '5%',
      textAlign: 'center',
    }
  },
  '& .iconfont': {
    display: 'inline-block',
    fontFamily: "iconfont",
    fontSize: 32,
    fontStyle: 'normal',
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-text-stroke-width': '0.2',
    '-moz-osx-font-smoothing': 'grayscale',
    padding: '0 10px',
    transition: 'all .6s linear',
  },
  '& .sociallink-list-container i': {
    animationName: 'iconfont-animation',
    transition: 'all .3s linear',
    cursor: 'pointer',
  },
  '& .sociallink-list-container i:hover': {
    transform: 'scale(1.2) translateY(-10%)',
  },
  '@keyframes iconfont-animation': {
    '0%': {
      opacity: 0,
      transform: 'translate3d(30px, 0, 0)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    }
  },
  '@keyframes start-btn-animation': {
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
