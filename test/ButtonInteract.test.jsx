import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up';

import ButtonInteract from '../src/ButtonInteract';

test('should match snapshot', () => {
  const m = shallow(<ButtonInteract
    type="likes"
    text="Me gusta"
    objectId="123"
    interactionKey="promoId"
    className="Promo"
    textDone="Te gusta"
    icon={<ThumbsUpIcon />}
    onLogin={jest.fn()}
  />);

  expect(toJSON(m)).toMatchSnapshot();
});
