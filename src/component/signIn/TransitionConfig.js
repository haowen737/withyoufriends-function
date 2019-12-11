export const defaultStyle = {
  position: 'absolute',
  transition: `all 500ms ease`,
  transform: `translate3d(-50%, -50%, 0)`,
  opacity: 0,
  display: 'none'
}

export const transitionStyles = {
  entering: {
    opacity: 0,
    transform: `translate3d(-50%, -20%, 0)`,
    display: 'block'
 },
  entered: {
    opacity: 1,
    transform: `translate3d(-50%, -50%, 0)`,
    display: 'block'
 },
  exiting: {
    opacity: 1,
    transform: `translate3d(-50%, -50%, 0)`,
    display: 'block'
 },
  exited: {
    opacity: 0,
    transform: `translate3d(-50%, -30%, 0)`,
    display: 'none'
 }
}
