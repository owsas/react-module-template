import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ButtonLike from '../src/ButtonLike';

test('should match snapshot', () => {
  const m = shallow(<ButtonLike
    onLogin={() => {}}
    className="Promo"
    objectId="E5SyTySkx5"
    interactionKey="promoId"
  />);

  expect(toJSON(m)).toMatchSnapshot();
});
