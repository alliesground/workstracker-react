import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';

const App = () => (
  <Router>
    <div className='ui text container'>
      <h2 className='ui dividing header'>
        Which body of water?
      </h2>

      <ul>
        <li>
          <Link to='/atlantic'>
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to='/pacific'>
            <code>/pacific</code>
          </Link>
        </li>
      </ul>

      <hr />
      {/* We'll insert the Route component here */}
      <Switch>
        <Route exact path='/atlantic/ocean' render={() => (
          <div>
            <h3>Atlantic Ocean -  Again!</h3>
            <p>
              Also known as "The Pond."
            </p>
          </div>
        )} />

        <Route exact path='/' render={() => (
            <h3 className='ui text center'>
              Welcome to Works Tracker.
            </h3>
        )} />

        <Route exact path='/atlantic' component={Atlantic} />
        <Route exact path='/pacific' component={Pacific} />

        <Route render={( {location} ) => (
          <div className='ui inverted red segment'>
            <h3>
              Error! No matches for <code>{location.pathname}</code>
            </h3>
          </div>
        )} />
      </Switch>
    </div>
  </Router>
);

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>The Atlantic ocean</p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>The Pacific ocean</p>
  </div>
);

export default App;
