const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
let self = this

const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if(keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })
}

self.addEventListener('install', function(event) {
    const cachePromise = caches.open(CACHE_STATIC).then(function (cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js'
        ])
    })
    event.waitUntil(Promise.all([cachePromise]))
})