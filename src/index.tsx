import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { observable} from "mobx"
import { Provider as MProvider } from "mobx-react"
import { createBrowserHistory } from 'history'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myRedux from './reducers'

import './index.css'
import App from './component/app/App'
// import registerServiceWorker from './registerServiceWorker'

interface RootProps {
  apis: any
}

const store = createStore(myRedux)
const root = document.getElementById('root')
const history = createBrowserHistory()
const renderRoot = () => {
  return (
    ReactDOM.render((
      <Provider store={store}>
        <MProvider $api={observable({})}>
          <Router history={history}>
            <App />
          </Router>
        </MProvider>
      </Provider>
    ), root)
  )
}

renderRoot()


// process.env.NODE_ENV !== 'development' && registerServiceWorker()
