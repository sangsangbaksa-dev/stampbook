/* Cache name is above the previous port's stampbook-v10 and this repo's stampbook-v7.
   Only successful same-origin GET responses are stored. /api is never cached or intercepted. */
var V='stampbook-v11',F=['./','index.html','style.css','core.js','i18n.js','../config.js','qr.js','app.js','cloud-i18n.js','cloud-sync.js','cloud-panel.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var url;try{url=new URL(e.request.url);}catch(err){return;}
  if(url.origin!==self.location.origin)return;
  if(url.pathname==='/api'||url.pathname.indexOf('/api/')===0)return;
  e.respondWith(fetch(e.request).then(function(r){
    if(r&&r.ok){var copy=r.clone();caches.open(V).then(function(x){x.put(e.request,copy);});}
    return r;
  }).catch(function(){return caches.match(e.request);}));
});
