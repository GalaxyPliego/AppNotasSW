
if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Registro de SW exitoso'))
        .catch(error => console.log('SW registro fallido', error))
}