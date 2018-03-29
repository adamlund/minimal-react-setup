import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom';
  import React, { Component } from 'react';

class App extends Component {
    state = {
        params: []
    }

    componentDidMount() {
        console.log('app component mounted');
        this.loadFileNoAsync();
    }

    loadFileNoAsync() {
        const rel = fetch('./sample.json').then((res) => {
            return res.json();
        })
        .then((json) => { 
            console.log(json);
            if(json.thing1) {
                console.log(json.thing1);
            }
        })
        .catch((err) => {
            console.error('Unable to GET file', err)
        });
    }

    render() {
        const title = this.state;
        return (
            <div>
                <div>This is the App component</div>
            </div>
        );
    }

}

export default App;