// sw.js - Service Worker for Mobile Notifications
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Notification par click karne se chat app open ho jayegi
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});