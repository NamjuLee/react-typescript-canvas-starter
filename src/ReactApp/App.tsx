import React, { Component } from 'react';
import './App.css';

import { Application } from '../Application';

class App extends Component {
  constructor(props: {}) {
    super(props);
    
  }
  componentDidMount() {
    const app = new Application('main');
  }
  public render() {
    return (
      <div id ="main">

      </div>
    );
  }
}

export default App;
