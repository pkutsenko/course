import '../sass/index'
import React from 'react'
import App from './App'
import Posts from './Posts'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../redux/configureStore'
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default function Root () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Posts} />
        </Route>
      </Router>
    </Provider>
  )
}
