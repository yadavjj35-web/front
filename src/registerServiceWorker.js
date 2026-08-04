// registerServiceWorker.js - lightweight SW register (safe, optional)
export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // registration successful
        })
        .catch((err) => {
          // swallow for now
          console.error('SW register failed', err);
        });
    });
  }
}
