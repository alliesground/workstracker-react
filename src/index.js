import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router
} from 'react-router-dom'

import './index.css';
import App from './redux-example/App-v3';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router> 
    <App />
  </Router>,
  document.getElementById('root')
);
