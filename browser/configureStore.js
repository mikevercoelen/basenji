import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

export default function configureStore (initialState = {}, history) {
  const ducks = require('ducks')

  let middleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    routerMiddleware(history)
  )

  if (__DEBUG__) {
    if (window.devToolsExtension) {
      middleware = compose(middleware, window.devToolsExtension())
    }
  }

  const store = middleware(createStore)(ducks, initialState)

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('ducks', () => {
        const nextRootReducer = require('ducks').default
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  return store
}
