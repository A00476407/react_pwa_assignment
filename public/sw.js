let cacheData='app';
this.addEventListener("install", (event)=> {
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/',
                'index.html',
                'manifest.json',
                'favicon.ico',
                'logo192.png',
                'logo512.png',
                '/static/js/bundle.js'
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            if (response)
            {
                return response;
            }
            
            return fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheData)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
      })
    )
})