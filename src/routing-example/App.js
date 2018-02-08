import React, { Component } from 'react';

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

class App extends Component {
  render() {
    return (
      <div className='ui text container'>
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <a href='/atlantic'>
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'>
              <code>/pacific</code>
            </a>
          </li>
        </ul>

        <hr />
        {/* We'll insert the Match component here */}
        <Match pattern='/atlantic' component={Atlantic} />
        <Match pattern='/pacific' component={Pacific} />
      </div>
    );
  }
}

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
