import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/index.ts';

// index.tsx (or App.tsx)

if ('Notification' in window) {
  // Check if the browser supports notifications
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      console.log(
        'Notification permission granted! You can now show notifications.',
      );
      // Proceed with setting up push notifications (e.g., subscribe to a push service)
    } else {
      console.log(
        'Notification permission denied. Notifications will not work.',
      );
      // Handle the case where permission is denied
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.ts')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
