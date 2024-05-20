// // service-worker.ts

// src/serviceWorker.ts
// This TypeScript service worker script handles background tasks and notifications.

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installing.');
  // Perform install steps
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activating.');
  // Clean up old caches
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});


// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('my-cache').then((cache) => {
//       return cache.addAll([
//         // Add your static assets (CSS, JS, images, etc.) here
//         '/index.html',
//         '/main.js',
//         '/styles.css',
//         // ...
//       ]);
//     }),
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     }),
//   );
// });


// self.addEventListener('push', (event) => {
//   const options = {
//     body: 'Time to take your medicine!',
//     // icon: '/path/to/notification-icon.png', // Replace with your actual icon path
//     // badge: '/path/to/badge-icon.png', // Replace with your actual badge path
//   };

//   event.waitUntil(
//     self.registration.showNotification('Medicine Reminder', options),
//   );
// });