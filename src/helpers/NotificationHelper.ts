export default class NotificationHelper {
  public static createNotif(message: string) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('3wBetManager', {
          body: message,
          icon: 'assets/icons/icon-512x512.png', badge: 'assets/icons/icon-512x512.png',
        });
      });
    }
  }
}
