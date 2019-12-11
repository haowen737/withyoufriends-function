import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { observer } from "mobx-react"

import Disscuss from '../disscuss/Disscuss'
import Nomatch from '../nomatch/Nomatch'
import SignIn from '../signIn/SignIn'
import DemoHouse from '../demoHouse'
import Greet from '../greet'
import Blog from '../blog/Blog'
import Me from '../me/Me'

import MusicPlayer from '../../widgets/musicPlayer';
import Talk from '../talk'

import style from './style'
// import './App.css'

// @observer
class App extends React.Component<any> {
  render() {
    return (
      <div className={style}>
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/me" component={Me} />
            <Route path="/signin" component={SignIn} />
            <Route path="/discuss" component={Disscuss} />
            <Route path="/" exact component={Greet} />
            <Route path="/talk-with-me-please" component={Talk} />
            <Route path="/demo-house" component={DemoHouse} />
            <Route component={Nomatch} />
          </Switch>
        </div>
        {/* <MusicPlayer /> */}
      </div>
    )
  }
}

export default App
