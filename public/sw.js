if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,a,t)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const i={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return c;case"module":return i;default:return e(s)}})).then(e=>{const s=t(...e);return c.default||(c.default=s),c})}))}}define("./sw.js",["./workbox-e032be30"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"_ft1p2kYQ-Xbt04l7Z0fR"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/_buildManifest.js",revision:"668e121c625193025cf288fa13babfd3"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/_app.js",revision:"79482d6c77e4569a57b10b3d55515db2"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/_error.js",revision:"dc91347122636ea4dfa38ec4db656dba"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/about.js",revision:"4f47c1acfb2578aa49671ed0452717f3"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/index.js",revision:"154ddada821d50333d46948dd1ab619c"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/oops.js",revision:"4a4827ca09b8d6ece6b71642b42e923f"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/portfolio.js",revision:"d288ac43ada256431dc545b3fbd61c57"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/posts.js",revision:"8c0bb3734d6c2226495e1162c42bb880"},{url:"/_next/static/_ft1p2kYQ-Xbt04l7Z0fR/pages/posts/[id].js",revision:"7a9762c2defd275f7d1d831d36507388"},{url:"/_next/static/chunks/16.2cd9e2dfc3b6e8986df2.js",revision:"9e1373aafe3fc41f9141d3ae7d40bf2d"},{url:"/_next/static/chunks/5d3e4f0e06c1aff8b8e38daa504933f86e31c4b8.cc7447df789cdc7ceb5a.js",revision:"8cc7a33f318a55278113415615b77f16"},{url:"/_next/static/chunks/9f96d65d.a86943d4b2eb7629e8eb.js",revision:"274e158e0d24ba9c9094ec2abf7ddcc1"},{url:"/_next/static/chunks/commons.3f7e63a7db1a32289cb0.js",revision:"a79645e3eb5c7320e0d5644afada75a4"},{url:"/_next/static/chunks/decb033b681b23b2d51aa5f486e9cc553409247d.82e5a2b6e4cbfcf106b4.js",revision:"01384fc1412d4516b4a20bb45e0ea7c3"},{url:"/_next/static/chunks/framework.7dfd02d307191d63a37e.js",revision:"ea911a542695350f8b048822f2f9c480"},{url:"/_next/static/css/65d2d4e6c6f1c200910d.css",revision:"6204a61a256c858996e347acda5d0d1f"},{url:"/_next/static/runtime/main-8be85bbd228929d2b0c0.js",revision:"c1311581f0c89cde45c461353014eab6"},{url:"/_next/static/runtime/polyfills-07e15e0d81524aaaf609.js",revision:"6d84cf30cf1dd1227dc0af60c1452946"},{url:"/_next/static/runtime/webpack-47c382533c5babfb92b6.js",revision:"25d3b376d945f5bc93b0849e4273bc44"},{url:"/favicon.ico",revision:"412192267449ea67eebabd3e62acfe51"},{url:"/googlebcffd69a6d3475be.html",revision:"84405f513e06ccf965f4d9106abb1ee9"},{url:"/icons/icon-128x128.png",revision:"db7481a04968b3ad4716436d30b3e409"},{url:"/icons/icon-144x144.png",revision:"689a1926530ed6ca26db537029c1dfd7"},{url:"/icons/icon-152x152.png",revision:"98af072da209b3b297308717b06ea86c"},{url:"/icons/icon-192x192.png",revision:"7ab8c82581552c7558c5b009ffcb3cd2"},{url:"/icons/icon-384x384.png",revision:"aae6d1f552c78e06bf42aae2462a98fa"},{url:"/icons/icon-512x512.png",revision:"837ab4469c705c188326cec571ecb227"},{url:"/icons/icon-72x72.png",revision:"cb6e3fb9db7db52f0986da1ff9bab188"},{url:"/icons/icon-96x96.png",revision:"7d8348b60cdd985bd24b48cb56855c1a"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
