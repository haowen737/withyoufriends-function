import * as React from 'react';
import { Route, Switch } from 'react-router-dom'

import Aiglet from '../../widgets/aiglet'

export default class DemoHouse extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/demo-house/aiglet" component={Aiglet} />
        </Switch>
      </div>
    )
  }
};
