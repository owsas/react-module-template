import CurrencyFormatter from 'currency-formatter';

import { Constants as constants } from '@owsas/geopromos-web-constants';

/**
 * Helps getting the information to be shown
 * on Cards and other UI items for the classes
 * of the Database
 */
export default class RenderObjectsUtils {
  /**
   * Gets the info to be shown for the promo
   * @param {Parse.Object} obj
   */
  static getInfoForPromo(obj) {
    return {
      img: (obj.get('pics') && obj.get('pics')[0]) || obj.get('picurl') || constants.img.default,
      title: obj.get('name'),
      description: obj.get('description'),
      date: obj.createdAt,
      badges: obj.get('trends'),
      to: `/promos/${obj.id}`,
      author: obj.get('brand') && obj.get('brand').get('name'),
    };
  }

  /**
   * Gets the info to be shown for the product
   * @param {Parse.Object} obj
   */
  static getInfoForProduct(obj) {
    return {
      img: (obj.get('pics') && obj.get('pics')[0]) || constants.img.default,
      title: obj.get('defaultName'),
      description: obj.get('description'),
      price: obj.get('price') ? CurrencyFormatter.format(
        obj.get('price'),
        { code: (obj.get('currencyCode') || 'COP') },
      ) : undefined,
      badges: obj.get('trends'),
      to: `/products/${obj.id}`,
      author: obj.get('brand') && obj.get('brand').get('name'),
    };
  }

  /**
   * Gets the info to be shown for the brand
   * @param {Parse.Object} obj
   */
  static getInfoForBrand(obj) {
    return {
      img: obj.get('picUrl') ||
        (obj.get('picture') && obj.get('picture').url()) ||
        constants.img.default,
      title: obj.get('name'),
      description: obj.get('description'),
      to: `/brands/${obj.id}`,
    };
  }

  /**
   * Gets the info to be shown for the category
   * @param {Parse.Object} obj
   */
  static getInfoForCategory(obj) {
    return {
      img: (obj.get('logo') && obj.get('logo').url()) ||
        constants.img.default,
      title: obj.get('defaultName'),
      alias: obj.get('alias'),
      to: `/search?c=${obj.get('alias')}`,
    };
  }

  /**
   * Gets the info to be shown for the subcategory
   * @param {Parse.Object} obj
   */
  static getInfoForSubcategory(obj) {
    return {
      img: (obj.get('logo') && obj.get('logo').url()) ||
        constants.img.default,
      title: obj.get('defaultName'),
      alias: obj.get('alias'),
      to: `/search?s=${obj.get('alias')}`,
    };
  }


  /**
   * Gets the info to be shown for the given object
   * @param {Parse.Object} obj
   */
  static getInfoForObject(obj) {
    let params;

    switch (obj.className) {
      case 'Promo':
        params = RenderObjectsUtils.getInfoForPromo(obj);
        break;
      case 'Product':
        params = RenderObjectsUtils.getInfoForProduct(obj);
        break;
      case 'Brand':
        params = RenderObjectsUtils.getInfoForBrand(obj);
        break;
      case 'Category':
        params = RenderObjectsUtils.getInfoForCategory(obj);
        break;
      case 'Subcategory':
        params = RenderObjectsUtils.getInfoForSubcategory(obj);
        break;
      default:
        params = {
          title: obj.get('name') || obj.get('title'),
          to: '/404',
        };
    }

    return params;
  }
}
