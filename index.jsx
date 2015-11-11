import 'babel-core/polyfill'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectReddit, fetchPosts, fetchPostsIfNeeded } from './actions'
import rootReducer from './reducers'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AsyncApp from './containers/AsyncApp'



const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

store.dispatch(selectReddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)
store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
  console.log(store.getState())
)

render(
  <Provider store={store}>
        <AsyncApp />
  </Provider>,
  document.getElementById('root')
)
