let cacheData='app';
this.addEventListener("install", (event)=> {
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
                cache.addAll([
                'static/js/bundle.js',
                '/',
                'index.html'
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((resp)=>{
            if (resp)
            {
                return resp
            }
        })
    )
})