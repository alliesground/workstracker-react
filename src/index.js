import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './ducks/index';
import thunk from 'redux-thunk';
import { loadState, saveState } from './utils/localStorage';
import {batchActions, enableBatching, batchDispatchMiddleware} from 'redux-batched-actions';
import { checkToken } from './middlewares'

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk, checkToken),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
