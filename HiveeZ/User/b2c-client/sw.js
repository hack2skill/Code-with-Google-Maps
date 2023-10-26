console.log('Service Worker Loaded...');

this.addEventListener('activate', function (e) {
    console.log('Service Worker Activated...');
});

self.addEventListener('push', async function (e) {
    const data = e.data.json();
    console.log('Push Received...', data);
    console.log(self);

    this.registration.showNotification(data.title, {
        body: data.body
    })
});