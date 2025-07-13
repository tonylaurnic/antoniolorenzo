'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon-16x16.png": "69948787a150ee1680bcd836abd8be3b",
"flutter_bootstrap.js": "cbab43ad38702901d773d68da09a5dc5",
"version.json": "9020cc020f70a15ac6d8bd5d2e925d45",
"favicon.ico": "904c1030c266e192b5d0d77bc8a0c25e",
"index.html": "c8f9a4b642959e3893835b0bf4061359",
"/": "c8f9a4b642959e3893835b0bf4061359",
"android-chrome-192x192.png": "f6cc92d2464240f6738ccf2e648b5712",
"apple-touch-icon.png": "fc96e824267e735b7cc4e0e36ee8684d",
"main.dart.js": "8b4c63a8fc84a7947dd83c07e6b1d18a",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"android-chrome-512x512.png": "41d38af1b451f3a5086785d967e25c57",
"site.webmanifest": "053100cb84a50d2ae7f5492f7dd7f25e",
"assets/AssetManifest.json": "feb500a5fa12f1d04ea5961df1fdbecb",
"assets/NOTICES": "241f9eb17afce32815260494be5fad14",
"assets/FontManifest.json": "3dee9a094bc8ae6434222068473ef20c",
"assets/AssetManifest.bin.json": "77f105f0970b3ee59e8f5d50ddefc315",
"assets/packages/line_icons/lib/assets/fonts/LineIcons.ttf": "23621397bc1906a79180a918e98f35b2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "ce844ea6f8eeaa145c4d383faec65783",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4769f3245a24c1fa9965f113ea85ec2a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e92ed19305c462f3c7a300e71a93a493",
"assets/fonts/Ibarra_Real_Nova/IbarraRealNova-Regular.ttf": "e17cadd63a323c7196d7da0062694f96",
"assets/fonts/OPTIDeligne-Normal.otf": "f1e9a99257200452e630cdd01a078d47",
"assets/fonts/MaterialIcons-Regular.otf": "2dc59278df5f8fbe0967e10e774d071f",
"assets/assets/logo1.png": "a02a540911603bded8d30416cc64d3b8",
"assets/assets/dental.png": "a8e0332b406cbaeb212037cd78bcb916",
"assets/assets/logo.PNG": "434449612b36a82accc0a69dedaeabc6",
"assets/assets/sushi/image8.jpg": "0890c4600d283b1c6b6dfce423ec3842",
"assets/assets/sushi/image9.jpg": "46d194911235d6138aca252acb401d16",
"assets/assets/sushi/image6.jpeg": "b27be49af75468c77d2374ce26b04c1c",
"assets/assets/sushi/image4.jpeg": "3b995e02bb235a8bdf1b468aa5f1a30e",
"assets/assets/sushi/image7.JPG": "3630d8b6d187372fe33abec5af432cfa",
"assets/assets/sushi/image0.PNG": "eb6885adbd9d7bdb14f8b81667a19f8b",
"assets/assets/sushi/image2.jpg": "b8af01b54d98c5eeac24bb534162b318",
"assets/assets/sushi/image3.jpg": "a67bd8fde681d1b58e592531608a9bf8",
"assets/assets/animations/animation_ll26ggaq.json": "8f0d8ac3f5ad4787684a7bb15e642c81",
"assets/assets/animations/squares.json": "742a813103b4751838cea44ad410a652",
"assets/assets/animations/animation.json": "3d29a5ac03c38baa7ab941eac5825d57",
"assets/assets/animations/data.json": "3d29a5ac03c38baa7ab941eac5825d57",
"assets/assets/animations/animation_ll3v9mj6.json": "85850f70762dbfbbed40ce7d27173abd",
"assets/assets/animations/animation_lm50s66c.json": "0c4c7389de52417e5a7bb87357b8a562",
"favicon-32x32.png": "b6aafd0bdefca0b8dbfb094c7ae253b0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
