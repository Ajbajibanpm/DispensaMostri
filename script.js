// sw.js - Versione potenziata
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const options = {
            body: event.data.body,
            icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
            badge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
            vibrate: [300, 100, 300],
            data: { url: self.registration.scope }, // Serve per riaprire l'app al clic
            actions: [
                { action: 'open', title: 'Apri Oblò' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(event.data.title, options)
        );
    }
});

// Gestisce il clic sulla notifica: riporta l'utente al gioco
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});
