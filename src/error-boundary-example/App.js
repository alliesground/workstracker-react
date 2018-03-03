import React, { Component } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import BuggyCounter from './BuggyCounter';

const App = () => (
  <div>
    <ErrorBoundary>
      <BuggyCounter />
      <BuggyCounter />
    </ErrorBoundary>
  </div>
);

export default App;
