import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { reducers, defaultState } from './store'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware, promiseMiddleware]
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const store = createStore(reducers, defaultState as any, applyMiddleware(...middlewares))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
