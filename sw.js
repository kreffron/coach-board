/* Coach Board — offline service worker
   Bump CACHE whenever the app files change.

   The HTML is fetched network-first so that an online coach ALWAYS gets the
   version currently on the site — no stale copies after an update. If the
   network is missing or slow it falls back to the cached copy, which is what
   makes the app work on a field with no signal. Icons and the manifest are
   served cache-first because they almost never change.                        */

const CACHE = "coach-board-2026-08-25-subs";
const DOC   = "./index.html";
const SHELL = ["./", DOC, "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
const NET_TIMEOUT = 3500;   // ms before we give up on a flaky signal and use the cache

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // one at a time, so a single missing file cannot fail the whole install
    await Promise.all(SHELL.map(u => cache.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

function withTimeout(p, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("slow network")), ms);
    p.then(v => { clearTimeout(t); resolve(v); },
           e => { clearTimeout(t); reject(e); });
  });
}

async function freshFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const net = await withTimeout(fetch(req, { cache: "no-store" }), NET_TIMEOUT);
    if (net && net.ok) cache.put(DOC, net.clone());
    return net;
  } catch (err) {
    const hit = (await cache.match(DOC)) || (await cache.match("./"));
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) {
    fetch(req).then(r => { if (r && r.ok) cache.put(req, r); }).catch(() => {});
    return hit;
  }
  const net = await fetch(req);
  if (net && net.ok) cache.put(req, net.clone());
  return net;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;        // never touch anything off-site

  const isDoc = req.mode === "navigate" ||
                url.pathname.endsWith("/") ||
                url.pathname.endsWith("index.html");
  e.respondWith(isDoc ? freshFirst(req) : cacheFirst(req));
});

/* the app's "Force refresh" button asks for this */
self.addEventListener("message", e => {
  if (e.data === "wipe") {
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister());
  }
});
