const cacheName = 'memory-auto-cache-v1';
const filesToCache = [
  './','./index.html','./style.css','./script.js',
  './images/auto1.jpg','./images/auto2.jpg','./images/auto3.jpg','./images/auto4.jpg',
  './images/auto5.jpg','./images/auto6.jpg','./images/auto7.jpg','./images/auto8.jpg',
  './images/auto9.jpg','./images/auto10.jpg','./images/auto11.jpg','./images/auto12.jpg',
  './images/auto13.jpg','./images/auto14.jpg','./images/auto15.jpg','./images/auto16.jpg',
  './images/auto17.jpg','./images/auto18.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
