import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import apiClientMiddleware from './middleware/apiClient'
import rootReducer from './reducers'

const finalCreateStore = compose(
  applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware,
    apiClientMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
