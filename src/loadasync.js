import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const LOAD_STATUS = {
    NONE: 0,
    FAILED: -1,
    SUCCESS: 1,
};

/**
 * Demonstrates simple pattern to load JSON data through a fetch
 */
class LoadFileAsync extends Component {
    static propTypes = {
        filePath: PropTypes.string,
        rootNode: PropTypes.string,
    };

    static defaultProps = {
        filePath: '',
        rootNode: 'data',
    };
    
    constructor(props) {
        super(props);
        this.state = {
          data: {},
          status: LOAD_STATUS.NONE,
        };
        this.loadFileAsync = this.loadFileAsync.bind(this);
      }
  
      async loadFileAsync() {
        const { filePath, rootNode } = this.props;
        try {
          const rel = await fetch(filePath);
          const json = await rel.json();
          this.setState({ data: json[rootNode], status: LOAD_STATUS.SUCCESS });
        } catch(error) {
          console.error(error);
          this.setState({ status: LOAD_STATUS.FAILED });
        }
      }
  
      render() {
        const { data, status } = this.state;
        const loadSuccess = (data && Object.keys(data).length > 0);
        return (
          <Fragment>
            {(status === LOAD_STATUS.FAILED) &&
                <div className="error-message">Data file failed to load</div>
            }
            {(loadSuccess && status === LOAD_STATUS.SUCCESS) &&
              <div>
                <h3>Async data load success</h3>
                <textarea
                    value={JSON.stringify(data)}
                    cols="150"
                    rows="25"
                    readOnly
                />
              </div>
            }
            {(status === LOAD_STATUS.NONE) &&
              <div>Click to load data asynchronously 
                <button onClick={this.loadFileAsync}>Load file</button></div>
            }
          </Fragment>
        );
      }
  }
  
  export default LoadFileAsync;