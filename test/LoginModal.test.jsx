import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import LoginModal from '../src/LoginModal';

test('should match snapshot', () => {
  const m = shallow(<LoginModal onLogin={() => {}} onHide={() => {}} />);
  expect(shallow(toJSON(m))).toMatchSnapshot();
});
