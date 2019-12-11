// interface TransitionConfig {
//   defaultFormStyle: {}
//   transitionFormStyles: {}
//   defaultFormInnerStyle: {}
//   transitionFormInnerStyles: {}
//   defaultStyle: {}
//   transitionStyles: any
//   defaultHeaderStyle: any
//   transitionHeaderStyles: any
// }

export const defaultFormStyle = {
  transition: `all 600ms cubic-bezier(0.04, 0.35, 0.19, 1.01)`,
  opacity: 0,
  zIndex: -1
}

export const transitionFormStyles = {
  entering: {
    opacity: 0,
    transform: `translate3d(0, 20px, 0)`,  
    zIndex: 100
  },
  entered: {
    opacity: 1,
    transform: `translate3d(0, 0, 0)`,  
    zIndex: 100
  },
  exiting: {
    opacity: 1,
    transform: `translate3d(0, 0, 0)`,  
    zIndex: 100
  },
  exited: {
    opacity: 0,
    transform: `translate3d(0, 20px, 0)`,
    zIndex: -1
  }
}

export const defaultFormInnerStyle = {
  transition: `all 600ms cubic-bezier(0.04, 0.35, 0.19, 1.01)`,
  opacity: 0,
  transform: `translate3d(0, 0, 0)`,
  zIndex: -1
}

export const transitionFormInnerStyles = {
  entering: {
    opacity: 0,
    transform: `translate3d(-20px, 0, 0)`,  
    zIndex: 100
  },
  entered: {
    opacity: 1,
    transform: `translate3d(0, 0, 0)`,  
    zIndex: 100
  },
  exiting: {
    opacity: 1,
    transform: `translate3d(0, 0, 0)`,  
    zIndex: 100
  },
  exited: {
    opacity: 0,
    transform: `translate3d(20px, 0, 0)`,
    zIndex: -1
  }
}

export const defaultStyle = {
  transition: `all 300ms ease`,
  transform: `translate3d(0, -30%, 0)`,
  opacity: 0
}

export const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(0, -30%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}


export const defaultHeaderStyle = {
  transition: `all 400ms cubic-bezier(0.14, 0.53, 0.15, 1.11)`,
  transform: `translate3d(20px, 0, 0)`,
  opacity: 0
}

export const transitionHeaderStyles = {
  entering: { opacity: 0, transform: `translate3d(-20px, 0, 0)` },
  entered:  { opacity: 1, transform: `translate3d(50px, 0, 0)` }
}
