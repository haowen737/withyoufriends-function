import { css } from 'react-emotion'
export const SocialLinkStyle = css({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  margin: '20px auto',
  textAlign: 'center',
  '& .iconfont': {
    display: 'inline-block',
    fontFamily: "iconfont",
    fontSize: 32,
    fontStyle: 'normal',
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-text-stroke-width': '0.2',
    '-moz-osx-font-smoothing': 'grayscale',
    padding: '0 10px',
    transition: 'all .3s linear',
  },
  '& i': {
    animationName: 'iconfont-animation',
    transition: 'all .3s linear',
    cursor: 'pointer',
  },
  '& i:hover': {
    transform: 'translateY(-10%)',
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
  }
})