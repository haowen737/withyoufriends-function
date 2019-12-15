import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Nomatch from '../nomatch/Nomatch'
import Greet from '../greet'
import Blog from '../blog/Blog'
import Me from '../me/Me'

import style from './style'

// @observer
class App extends React.Component<any> {
  render() {
    return (
      <div className={style}>
        <div className="page">
          <Switch>
            <Route path="/blog" component={Blog} />
            <Route path="/me" component={Me} />
            <Route path="/" exact component={Greet} />
            <Route component={Nomatch} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
