import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Test from '../src/index';

describe('Test', () => {
  test('should be a component', () => {
    expect(<Test />).toBeTruthy();
  });

  test('should say "Hello, world!"', () => {
    const s = shallow(<Test />);
    expect(s.text()).toEqual('Hello world!');
  });

  test('should match snapshot', () => {
    const s = shallow(<Test />);
    expect(toJSON(s)).toMatchSnapshot();
  });
});
