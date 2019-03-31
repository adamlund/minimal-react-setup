import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
global.fetch = require('jest-fetch-mock');

global.delay = ms => new Promise(resolve => setTimeout(resolve, ms));