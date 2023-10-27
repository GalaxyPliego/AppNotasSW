const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
let self = this

const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })
}

self.addEventListener('install', function (event) {
    const cachePromise = caches.open(CACHE_STATIC).then(function (cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js'
        ])
    })
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(function (cache) {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;700&display=swap" rel="stylesheet'
        ])
    })
    event.waitUntil(Promise.all([cachePromise, cacheInmutable]))
})

// ESta función elimina los caches que no se usan
self.addEventListener('activate', function (event) {
    const respuesta = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key !== CACHE_STATIC && key.includes('static')) {
                    return caches.delete(key)
                }
            })
        })
    event.waitUntil(respuesta)
})


// Lo que hace es buscar en cache y despues en la red y lo guarda en el cache dinamico.
// 
self.addEventListener('fetch', function (event) {
    //Cache with network fallback
    const respuesta = caches.match(event.request)
        .then(response => {
            if (response) return response
            //Si no existe el archivo lo descarga de la web
            return fetch(event.request)
                .then(newResponse => {

                    caches.open(CACHE_DYNAMIC)
                        .then(cache => {
                            cache.put(event.request, newResponse)
                            limpiarCache(CACHE_DYNAMIC, 20)
                        })
                    return newResponse.clone()
                })//ToDo 2 Manejo de errores
                .catch(err => {
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('./pages/offline.html')
                    }
                })
        })
    event.respondWith(respuesta)
})

self.addEventListener('fetch', function (event) {
    const respuesta = caches.match(event.request)
        .then(res => {
            if (res) {
                return res
            } else {
                return fetch(event.request).then(newRes => {
                    return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes)
                })
            }
        })
    event.respondWith(respuesta)
})