import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Playground from './containers/Playground/Playground';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Playground />
      </div>
    );
  }
}

export default App;
