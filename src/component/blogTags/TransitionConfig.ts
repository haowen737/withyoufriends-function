const defaultStyle = {
  transition: `all 300ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(0, -30%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const defaultHeaderStyle = {
  transition: `all 400ms cubic-bezier(0.14, 0.53, 0.15, 1.11)`,
  transform: `translate3d(20px, 0, 0)`,
  opacity: 0
}

const transitionHeaderStyles = {
  entering: { opacity: 0, transform: `translate3d(-20px, 0, 0)` },
  entered:  { opacity: 1, transform: `translate3d(50px, 0, 0)` }
}

export {
  defaultStyle,
  transitionStyles,
  defaultHeaderStyle,
  transitionHeaderStyles
}
