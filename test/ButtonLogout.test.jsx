import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ButtonLogout from '../src/ButtonLogout';

test('should match snapshot', () => {
  const m = shallow(<ButtonLogout
    onClick={() => {}}
  />);

  expect(toJSON(m)).toMatchSnapshot();
});
