import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Redirect from 'react-router/Redirect';


/*
const Match = ({pattern, component: Component}) => {
  const pathname = window.location.pathname;
  if(pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

const Link = ({ to, children }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
)*/

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
      {/* We'll insert the Match component here */}
      <Match pattern='/atlantic' component={Atlantic} />
      <Match pattern='/pacific' component={Pacific} />
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
