import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import ducks from 'ducks'

export default function configureStore (initialState = {}, history) {
  let middleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    routerMiddleware(history)
  )

  /* @if isDevelopment=true */
  if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension())
  }
  /* @endif */

  const store = middleware(createStore)(ducks, initialState)

  /* @if isDevelopment=true */
  if (module.hot) {
    module.hot.accept('ducks', () => {
      const nextRootReducer = require('ducks').default
      store.replaceReducer(nextRootReducer)
    })
  }
  /* @endif */

  return store
}
