import React, { Component, Fragment } from 'react';
import LoadFileAsync from './loadasync';
import './app.css';

class App extends Component {
    render() {
      return (
        <Fragment>
          <h1>React App Example</h1>
          <p>Load datafile via async call and display contents.</p>
          <LoadFileAsync filePath="./sampledata/sample_async_data.json" rootNode="data" />
        </Fragment>
      );
    }
}

export default App;
