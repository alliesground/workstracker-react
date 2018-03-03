import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ 
      error: error,
      hasError: true,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return (
      <div>
        { this.state.hasError ? (
            <div className='column'>
              <i className='close icon'></i>
              <div className='header'>Error!</div>
              <p>This is Error</p>
            </div>
          ) : (
            null
          )
        }

        {this.props.children}
      </div>
    );
  }
}
