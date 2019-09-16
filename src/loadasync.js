import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const LOAD_STATUS = {
    NONE: 0,
    FAILED: -1,
    SUCCESS: 1,
};

/**
 * Demonstrates pattern to load JSON data through a fetch
 */
const LoadFileAsync = (props) => {
    const [ data, setData ] = useState({});
    const [ status, setStatus ] = useState(LOAD_STATUS.NONE);

    const loadFileAsync = async () => {
        const { filePath, rootNode } = props;
        try {
            const result = await LoadFileAsync.fetchData(filePath, rootNode);
            setData(result);
            setStatus(LOAD_STATUS.SUCCESS);
        } catch(error) {
            setStatus(LOAD_STATUS.FAILED);
        }
    };

    const reset = () => {
        setData({});
        setStatus(LOAD_STATUS.NONE);
    };

    return (
        <Fragment>
            {(status === LOAD_STATUS.FAILED) &&
                <div className="error-message">Data file failed to load</div>
            }
            {(status === LOAD_STATUS.NONE) &&
                <div>
                    <div>Click to load data asynchronously</div>
                    <div>File: <code>{props.filePath}</code></div>
                    <div><button data-qa="loadFile" onClick={loadFileAsync}>Load file</button></div>
                </div>
            }
            {(LoadFileAsync.isLoadSuccess(data) && status === LOAD_STATUS.SUCCESS) &&
                <div>
                <h3>Async data load success</h3>
                <div><button data-qa="reset" onClick={reset}>Reset</button></div>
                <textarea
                    value={JSON.stringify(data)}
                    cols="150"
                    rows="25"
                    readOnly
                />
                </div>
            }
        </Fragment>
    );
};

LoadFileAsync.isLoadSuccess = (data = {}) => (data && Object.keys(data).length > 0);
LoadFileAsync.fetchData = async (filePath, rootNode) => {
    const rel = await fetch(filePath);
    const json = await rel.json();
    return json[rootNode];
};

LoadFileAsync.propTypes = {
    filePath: PropTypes.string,
    rootNode: PropTypes.string,
};

LoadFileAsync.defaultProps = {
    filePath: '',
    rootNode: 'data',
};

export default LoadFileAsync;