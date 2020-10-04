import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './navbar.css';
import './login.css'
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadState, saveState } from './store/localStorage'

const preloadedState = loadState()
const store = configureStore(preloadedState)

//subscribe to the store to get updated state to save to preloaded state
store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

