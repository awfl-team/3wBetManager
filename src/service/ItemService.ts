import api from '../api';
import Item from "../model/Item";

export default class ItemService {
  static getAllItems() {
    return api.get('items');
  }

  static addItemsToUser(items: Item[]) {
    return api.post('items', items);
  }

  static updateCost(item: Item) {
    return api.put(`items/${item.Id}`, item);
  }

  static useBomb(userId: number) {
    return api.put(`items/bomb/${userId}`);
  }

  static useKey(userId: number) {
    return api.get(`items/key/${userId}`);
  }

  static useMultiplier(betId: number, multiplierValue: number) {
    return api.put(`items/multiplier/${multiplierValue}/${betId}`);
  }

  static useLoot() {
    return api.get('items/loot');
  }

  static useMystery() {
    return api.get('items/mystery');
  }
}
