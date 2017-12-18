import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ButtonFollow from '../src/ButtonFollow';

test('should match snapshot', () => {
  const m = shallow(<ButtonFollow
    onLogin={() => {}}
    className="Promo"
    objectId="E5SyTySkx5"
    interactionKey="promoId"
  />);

  expect(toJSON(m)).toMatchSnapshot();
});
