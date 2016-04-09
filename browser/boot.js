import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: ''
})

export default function boot (configureRoutes) {
  const store = configureStore({}, browserHistory)

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
  })

  configureRoutes(history, store, (routes) => {
    render(
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('root')
    )
  })
}
