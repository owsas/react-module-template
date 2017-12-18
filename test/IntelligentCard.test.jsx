import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Parse from 'parse/node';

import IntelligentCard from '../src/IntelligentCard';
import RenderObjectsUtils from '../src/RenderObjectsUtils';

const brand = new Parse.Object('Brand');
brand.set('name', 'La marca');
brand.set('description', 'Muy importante');
brand.set('picUrl', 'def://123');
brand.id = 'abc123';

const obj = new Parse.Object('Promo');
obj.set('pics', ['abc://123']);
obj.set('name', 'La promo');
obj.set('trends', ['#123']);
obj.set('description', 'La descripción de la promo');
obj.set('brand', brand);
obj.id = '123';

describe('Rendered View', () => {
  const m = shallow(<IntelligentCard obj={obj} extended />);

  const res = RenderObjectsUtils.getInfoForObject(obj);

  describe('Card information', () => {
    const card = m.at(0);

    test('.cardTitle should have the correct title', () => {
      expect(card.find('.cardTitle').text()).toEqual(res.title);
    });

    test('.cardAuthor should have the correct author', () => {
      expect(card.find('.cardAuthor').text()).toEqual(res.author);
    });

    test('.cardPrice should have the correct price', () => {
      const prod = new Parse.Object('Product');
      prod.set('price', 12312);
      prod.set('currencyCode', 'CO');

      const m2 = shallow(<IntelligentCard obj={prod} extended />);

      const res2 = RenderObjectsUtils.getInfoForObject(prod);

      expect(m2.find('.cardPrice').text()).toEqual(res2.price);
    });
  });


  test('should match snapshot', () => {
    expect(toJSON(m)).toMatchSnapshot();
  });
});
