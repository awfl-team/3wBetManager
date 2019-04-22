export default class NotificationHelper {
  static createNotif(message) {
    // eslint-disable-next-line no-new
    new Notification('Item used on you', { body: message });
  }
}
