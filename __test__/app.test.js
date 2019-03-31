import React from 'react';
import { mount } from 'enzyme';
import App from '../src/app';

test('Mount app wrapper', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html()).toContain('React');
});