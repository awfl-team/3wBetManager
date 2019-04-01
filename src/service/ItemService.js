import API from '../api';

export default class ItemService {
  static getAllItems() {
    return API.get('items');
  }

  static addItemsToUser(items) {
    return API.post('items', items);
  }

  static updateCost(item) {
    return API.put(`items/${item.Id}`, item);
  }
}
