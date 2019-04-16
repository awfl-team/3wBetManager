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

  static useBomb(userId) {
    return API.put(`items/bomb/${userId}`);
  }

  static useMultiplier(betId, multiplierValue) {
    return API.put(`items/multiplier/${multiplierValue}/${betId}`);
  }

  static useLoot() {
    return API.get('items/loot');
  }
}
