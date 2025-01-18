const CACHE_NAME = "JackWCache";

const cacheList = [
    "index.html",
    "intro.html",
    "about.html",
    "certs.html",
    "contact.html",
    "portfolio.html",
    "style.css",
    "assets/lain_telephone_pole.webp"
];

self.addEventListener("install", function (event) {
    //Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(cacheList);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            //If in cache then return, else, go to network
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName.startsWith("JackWCache") && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
