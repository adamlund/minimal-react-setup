import React from 'react';
import { mount } from 'enzyme';
import LoadFileAsync from '../src/loadasync';
import SAMPLEDATA from './__mocks__/sample.json';

test('should mount component', async () => {
    const wrapper = mount(<LoadFileAsync />);
    expect(wrapper.find('button')).toHaveLength(1);
});

test('should load sample data', async () => {
    // Setup a mock response by fetch
    // https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.mockResponseOnce(JSON.stringify(SAMPLEDATA));

    // setup a spy to monitor the fn call
    const loadFnSpy = jest.spyOn(LoadFileAsync.prototype, 'loadFileAsync');

    // exec the test
    const wrapper = mount(<LoadFileAsync filePath="./sample.json" rootNode="stuff" />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');

    // ensure updates are made
    await delay(100);
    await wrapper.update();

    // assertions
    expect(loadFnSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().data['1'].name).toBe('Hello');
    expect(wrapper.find('textarea').getDOMNode().innerHTML).toContain('Hello');
});

test('should present error message on reject', async () => {
    // Setup a mock rejection by fetch
    // https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.mockRejectOnce('404 data not found');

    // exec the test
    const wrapper = mount(<LoadFileAsync />);
    wrapper.find('button').simulate('click');

    // ensure updates are made
    await delay(100);
    await wrapper.update();

    // assertions
    expect(wrapper.find('div.error-message')).toHaveLength(1);
    expect(wrapper.state().status).toBe(-1);
});
