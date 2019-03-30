import React, { Component, Fragment } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sampledata: {}
      };
      this.loadFileAsync = this.loadFileAsync.bind(this);
    }

    async loadFileAsync() {
      const rel = await fetch('./sample.json');
      const json = await rel.json();
      this.setState(json);
    }

    render() {
      const { sampledata } = this.state;
      const { id, name, level } = sampledata;
      const loadSuccess = (id && name && level);
      return (
        <Fragment>
          <h1>React App</h1>
          {(loadSuccess) &&
            <div>
              <h3>Data loaded async success</h3>
              <dl>
                <dt>ID</dt>
                <dd>{id}</dd>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>Level</dt>
                <dd>{level}</dd>
              </dl>
            </div>
          }
          {(!loadSuccess) &&
            <div>Click to load file async <button id="load-data-button" onClick={this.loadFileAsync}>Load file</button></div>
          }
        </Fragment>
      );
    }
}

export default App;
