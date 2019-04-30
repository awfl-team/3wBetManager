export default class NotificationHelper {
  static createNotif(message) {
    // eslint-disable-next-line no-new
    new Notification('3wBetManager', { body: message, icon: 'assets/icons/icon-512x512.png' });
  }
}
