import React from 'react';
import { act }  from 'react-dom/test-utils';
import { mount } from 'enzyme';
import LoadFileAsync from '../src/loadasync';
import SAMPLEDATA from './__mocks__/sample.json';

test('should mount component', async () => {
    const wrapper = mount(<LoadFileAsync />);
    expect(wrapper.find('button[data-qa="loadFile"]')).toHaveLength(1);
});

test('should load sample data', async () => {
    // Setup a mock response by fetch
    // https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.mockResponseOnce(JSON.stringify(SAMPLEDATA));

    // Spy on a static method
    const isLoadSuccessSpy = jest.spyOn(LoadFileAsync, 'isLoadSuccess');
    const fetchDataSpy = jest.spyOn(LoadFileAsync, 'fetchData');

    // exec the test
    const wrapper = mount(<LoadFileAsync filePath="./sample.json" rootNode="stuff" />);

    expect(wrapper.find('button[data-qa="loadFile"]')).toHaveLength(1);
    await act(async () => {
        wrapper.find('button[data-qa="loadFile"]').simulate('click');
        await delay(100);
        await wrapper.update();
    });
    expect(wrapper.find('textarea').getDOMNode().innerHTML).toContain('Hello');
    expect(isLoadSuccessSpy).toHaveBeenCalled();
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
        wrapper.find('button[data-qa="reset"]').simulate('click');
        await delay(100);
        await wrapper.update();
    });
    expect(wrapper.find('textarea')).toHaveLength(0);
});

test('should present error message on reject', async () => {
    // Setup a mock rejection by fetch
    // https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.mockRejectOnce('404 data not found');

    // exec the test
    const wrapper = mount(<LoadFileAsync />);
    await act(async () => {
        wrapper.find('button[data-qa="loadFile"]').simulate('click');
        // ensure updates are made
        await delay(100);
        await wrapper.update();
    });

    // assertions
    expect(wrapper.find('div.error-message')).toHaveLength(1);
});

test('function testing', () => {
    expect(LoadFileAsync.isLoadSuccess()).toBe(false);
    expect(LoadFileAsync.isLoadSuccess({})).toBe(false);
    expect(LoadFileAsync.isLoadSuccess({ thing1: 'hello' })).toBe(true);
});
