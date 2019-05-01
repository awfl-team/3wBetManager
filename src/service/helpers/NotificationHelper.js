export default class NotificationHelper {
  static createNotif(message) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('3wBetManager', { body: message, icon: 'assets/icons/icon-512x512.png' });
      });
    }
  }
}
