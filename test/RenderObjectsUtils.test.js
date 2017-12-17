import Parse from 'parse/node';
import RenderObjectsUtils from '../src/RenderObjectsUtils';

const brand = new Parse.Object('Brand');
brand.set('name', 'La marca');
brand.set('description', 'Muy importante');
brand.set('picUrl', 'def://123');

describe('#getInfoForPromo', () => {
  const obj = new Parse.Object('Promo');
  obj.set('pics', ['abc://123']);
  obj.set('name', 'La promo');
  obj.set('trends', ['#123']);
  obj.set('description', 'La descripción de la promo');
  obj.set('brand', brand);
  obj.id = '123';

  const params = RenderObjectsUtils.getInfoForObject(obj);

  test('should return the expected params', () => {
    expect(params).toEqual({
      title: obj.get('name'),
      img: obj.get('pics')[0],
      badges: obj.get('trends'),
      date: undefined,
      author: brand.get('name'),
      description: obj.get('description'),
      to: `/promos/${obj.id}`,
    });
  });
});

describe('#getInfoForProduct', () => {
  const obj = new Parse.Object('Product');
  obj.set('pics', ['abc://123']);
  obj.set('defaultName', 'El producto');
  obj.set('trends', ['#123']);
  obj.set('description', 'La descripción');
  obj.set('brand', brand);
  obj.id = '123';

  const params = RenderObjectsUtils.getInfoForObject(obj);

  test('should return the expected params', () => {
    expect(params).toEqual({
      title: obj.get('defaultName'),
      img: obj.get('pics')[0],
      badges: obj.get('trends'),
      date: undefined,
      author: brand.get('name'),
      description: obj.get('description'),
      to: `/products/${obj.id}`,
    });
  });
});

describe('#getInfoForBrand', () => {
  test('should return the expected params', () => {
    const params = RenderObjectsUtils.getInfoForObject(brand);
    expect(params).toEqual({
      img: brand.get('picUrl'),
      title: brand.get('name'),
      description: brand.get('description'),
      to: `/brands/${brand.id}`,
    });
  });
});

describe('#getInfoForCategory', () => {
  const obj = new Parse.Object('Category');
  obj.set('alias', 'abc');
  obj.set('logo', { url: () => '123' });
  obj.set('defaultName', 'La Cat');
  obj.set('brand', brand);
  obj.id = '123';

  const params = RenderObjectsUtils.getInfoForObject(obj);

  test('should return the expected params', () => {
    expect(params).toEqual({
      img: (obj.get('logo') && obj.get('logo').url()),
      title: obj.get('defaultName'),
      alias: obj.get('alias'),
      to: `/search?c=${obj.get('alias')}`,
    });
  });
});

describe('#getInfoForSubcategory', () => {
  const obj = new Parse.Object('Subcategory');
  obj.set('alias', 'abc');
  obj.set('logo', { url: () => '123' });
  obj.set('defaultName', 'La Cat');
  obj.set('brand', brand);
  obj.id = '123';

  const params = RenderObjectsUtils.getInfoForObject(obj);

  test('should return the expected params', () => {
    expect(params).toEqual({
      img: (obj.get('logo') && obj.get('logo').url()),
      title: obj.get('defaultName'),
      alias: obj.get('alias'),
      to: `/search?s=${obj.get('alias')}`,
    });
  });
});

describe('Other classNames', () => {
  const obj = new Parse.Object('OtherType');
  obj.set('name', 'ABC123');
  obj.id = '123';

  const params = RenderObjectsUtils.getInfoForObject(obj);

  test('should return the expected params', () => {
    expect(params).toEqual({
      title: obj.get('name'),
      to: '/404',
    });
  });
});
