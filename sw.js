self.addEventListener('install',function(event){

    event.waitUntil(
        caches.open('news_api').then(function(cache){
           return cache.addAll([
        './app.js',
        './index.html',
        'https://fonts.googleapis.com/css?family=Open+Sans',
        'images/icon-article.png',
        'images/icon-no-articles.png',
        'http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css'
        ]);
        })
    );
});


self.addEventListener('fetch',function(event){
event.respondWith(
    caches.match(event.request).then(function(response){
if(response) return response;

return fetch(event.request);
    })
);
});