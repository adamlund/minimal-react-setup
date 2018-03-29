import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom';
  import React, { Component } from 'react';

class App extends Component {
    state = {
        sampledata: {}
    }

    componentDidMount() {
        console.log('app component mounted');
        this.loadFileAsync();
    }

    async loadFileAsync() {
        const rel = await fetch('./sample.json');
        const json = await rel.json();
        this.setState(json);
        console.log('Async load success', this.state);
    }

    render() {
        const myData = this.state.sampledata;
        return (
            <div>
                <div>This is the App component</div>
                <div>State: {myData.id} {myData.name} {myData.level}</div>
            </div>
        );
    }

}

export default App;