import { css } from 'react-emotion'

export default css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  transition: 'all 1s ease',
  '& .page': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'all 1s ease'
  }
});