import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1
    }));
  }

  render() {
    const { name = 'React' } = this.props;
    return (
      <div>
        <p>Hello, {name}. Count: {this.state.counter}</p>
        <input type='button' value='Click' onClick={this.handleClick}/>
      </div>
    );
  }
};
