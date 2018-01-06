import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello, React</p>
      </div>
    );
  }
};

ReactDOM.render(
  <App></App>,
  document.getElementById('app')
);
