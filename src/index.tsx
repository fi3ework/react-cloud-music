import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const PLAY_SONG = 'click a song to play'

const playSong = (state, action) => {
  switch (action.type) {
    case PLAY_SONG:
      if (state.playingSong.id === action.id) {
        return state
      } else {
        const nextPlayingSong = { id: action.id }
        return { ...state, playingSong: nextPlayingSong }
      }
  }
}

const reducers = () => {
  console.log(123)
}
const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
