import React, { Component, Fragment } from 'react';
import LoadFileAsync from './loadasync';
import './app.css';

class App extends Component {
    render() {
      return (
        <Fragment>
          <h1>Simple React App</h1>
          <LoadFileAsync filePath="./sample.json" rootNode="data" />
        </Fragment>
      );
    }
}

export default App;
