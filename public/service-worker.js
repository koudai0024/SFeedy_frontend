if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise((async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()}))),a.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},a=(a,c)=>{Promise.all(a.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(a)};self.define=(a,i,r)=>{c[a]||(c[a]=Promise.resolve().then((()=>{let c={};const n={uri:location.origin+a.slice(1)};return Promise.all(i.map((a=>{switch(a){case"exports":return c;case"module":return n;default:return e(a)}}))).then((e=>{const a=r(...e);return c.default||(c.default=a),c}))})))}}define("./service-worker.js",["./workbox-860774eb"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0a301732.adba3f76b28fc11ecdaa.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/157422fdf2cc6cc1c586d00fbfbc6206714522f9.d83aa0119869a20cbe26.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.9d3005e2d840fa5248b8.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/82dea381ecbc2419fa92cf992e5482f1887596cc.04dd59e347a84799cc35.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/8356a0b4c9febcafaf1ff36a26270b0f77980931.85b8b0fb0168d8b7cde2.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/a61aa6cf38f2b6c4d829da3da0eb5e8bd8c51fec.5fff89b76f4850013881.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/commons.21bf482f099678bcb929.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/framework.9d524150d48315f49e80.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/main-4aabd9aa62d0b12f1564.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/_app-3d596f94ea551ad6adda.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/_error-a5d1eadc0abc7e2dd757.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/dashboard-410eb2d9485ac71fe9ec.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/dashboard/%5BpostId%5D-5b275ae65fc5b6c9fc87.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/index-73edd8f306daabb14c84.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/login-5c4f0f58f7899ce1ba83.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/mypage-f37114c37fcf3c562d56.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/new-1689c69c99c7e23704d9.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/profile-ccf6094f3d53a73d2ba5.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/tags/%5BtagId%5D/posts-74ccda06995c0b4e8f35.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/users/%5BuserId%5D-c64f7a5954dc5052b822.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/users/%5BuserId%5D/posts-292b95ea4caeffc26d31.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/pages/users/%5BuserId%5D/posts/%5BpostId%5D-bab1da43ee83f7d9d4d3.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/polyfills-0144d5b481bf411d4a2c.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/css/87cb570661ab95d804de.css",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/zBf8Cea5yB6l7r2J_EpNu/_buildManifest.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/_next/static/zBf8Cea5yB6l7r2J_EpNu/_ssgManifest.js",revision:"zBf8Cea5yB6l7r2J_EpNu"},{url:"/android-chrome-128x128.png",revision:"06d1ecad20f0e65a11fc41e5b2a198d2"},{url:"/android-chrome-144x144.png",revision:"669a8a970359f97a669615943e2731d8"},{url:"/android-chrome-152x152.png",revision:"43e986d792773e36a4ea01d5fe0460da"},{url:"/android-chrome-192x192.png",revision:"fa596b0ee81751c2e0382485e73a59ec"},{url:"/android-chrome-256x256.png",revision:"f64a5e6c3aa9660e77a4a36505544e6e"},{url:"/android-chrome-36x36.png",revision:"002e3f695da66e2b6ff5fb2afd1aefdb"},{url:"/android-chrome-384x384.png",revision:"213e996b83b7f094b9e1921ffbad9c2e"},{url:"/android-chrome-48x48.png",revision:"3b8f0f4c076a7dcaefedd705916be938"},{url:"/android-chrome-512x512.png",revision:"2a2de18cf556cd3217b4c0bd398998c9"},{url:"/android-chrome-72x72.png",revision:"d047a3f280e6538f2b5da8402261c784"},{url:"/android-chrome-96x96.png",revision:"57238bc417bd0a4e955a8b3328ee537a"},{url:"/apple-touch-icon-114x114-precomposed.png",revision:"4357a85f086f1b37ddb8e761902a0b76"},{url:"/apple-touch-icon-114x114.png",revision:"4357a85f086f1b37ddb8e761902a0b76"},{url:"/apple-touch-icon-120x120-precomposed.png",revision:"ef73c0da028253656c8af95219cd1312"},{url:"/apple-touch-icon-120x120.png",revision:"ef73c0da028253656c8af95219cd1312"},{url:"/apple-touch-icon-144x144-precomposed.png",revision:"669a8a970359f97a669615943e2731d8"},{url:"/apple-touch-icon-144x144.png",revision:"669a8a970359f97a669615943e2731d8"},{url:"/apple-touch-icon-152x152-precomposed.png",revision:"43e986d792773e36a4ea01d5fe0460da"},{url:"/apple-touch-icon-152x152.png",revision:"43e986d792773e36a4ea01d5fe0460da"},{url:"/apple-touch-icon-180x180-precomposed.png",revision:"03d2c3bfc6324b3d65207c510f67f8d0"},{url:"/apple-touch-icon-180x180.png",revision:"03d2c3bfc6324b3d65207c510f67f8d0"},{url:"/apple-touch-icon-57x57-precomposed.png",revision:"6cb4cfa1b9c5c9b35f6d8054ec9f90f6"},{url:"/apple-touch-icon-57x57.png",revision:"6cb4cfa1b9c5c9b35f6d8054ec9f90f6"},{url:"/apple-touch-icon-60x60-precomposed.png",revision:"e786f00fdfd09b985ccac382710a96c3"},{url:"/apple-touch-icon-60x60.png",revision:"e786f00fdfd09b985ccac382710a96c3"},{url:"/apple-touch-icon-72x72-precomposed.png",revision:"d047a3f280e6538f2b5da8402261c784"},{url:"/apple-touch-icon-72x72.png",revision:"d047a3f280e6538f2b5da8402261c784"},{url:"/apple-touch-icon-76x76-precomposed.png",revision:"a0fff321e94d8abcefae28aab378515a"},{url:"/apple-touch-icon-76x76.png",revision:"a0fff321e94d8abcefae28aab378515a"},{url:"/apple-touch-icon-precomposed.png",revision:"03d2c3bfc6324b3d65207c510f67f8d0"},{url:"/apple-touch-icon.png",revision:"03d2c3bfc6324b3d65207c510f67f8d0"},{url:"/blank-profile-picture-973460_1280.png",revision:"77f5794e2eb49f7989b8f85e92cfa4e0"},{url:"/btn_google_signin_dark_focus_web.png",revision:"852a96b2d3c8c22423ed60e98a8047e0"},{url:"/favicon.ico",revision:"063d354cc6990f17b2c2890c55e0cf60"},{url:"/icon-128x128.png",revision:"06d1ecad20f0e65a11fc41e5b2a198d2"},{url:"/icon-144x144.png",revision:"669a8a970359f97a669615943e2731d8"},{url:"/icon-152x152.png",revision:"43e986d792773e36a4ea01d5fe0460da"},{url:"/icon-160x160.png",revision:"ce3ac5620109b8881459abf5ecb03b09"},{url:"/icon-16x16.png",revision:"8f25aef08e52783816218017db2e0c95"},{url:"/icon-192x192.png",revision:"fa596b0ee81751c2e0382485e73a59ec"},{url:"/icon-196x196.png",revision:"84350baa32e1da3a83f4345499b0892d"},{url:"/icon-24x24.png",revision:"373953880d34536519f056ee31f5d8d4"},{url:"/icon-256x256.png",revision:"f64a5e6c3aa9660e77a4a36505544e6e"},{url:"/icon-32x32.png",revision:"3e71e9f6b5403c6786f7472d5a7e0096"},{url:"/icon-36x36.png",revision:"002e3f695da66e2b6ff5fb2afd1aefdb"},{url:"/icon-384x384.png",revision:"213e996b83b7f094b9e1921ffbad9c2e"},{url:"/icon-48x48.png",revision:"3b8f0f4c076a7dcaefedd705916be938"},{url:"/icon-512x512.png",revision:"2a2de18cf556cd3217b4c0bd398998c9"},{url:"/icon-72x72.png",revision:"d047a3f280e6538f2b5da8402261c784"},{url:"/icon-96x96.png",revision:"57238bc417bd0a4e955a8b3328ee537a"},{url:"/image/gib-black.png",revision:"a2ecb008979024523c428b9c9ebbc8b9"},{url:"/image/gib.png",revision:"fcec69bc8bcaed376b9b762b28199656"},{url:"/image/gib.svg",revision:"6897e5cb2d98ace3107c84b0aab4e5fd"},{url:"/manifest.json",revision:"1a2431a7e90b46515d50479877738aae"},{url:"/site-tile-150x150.png",revision:"b1f8b7085fc4f2a14a28054703d8936a"},{url:"/site-tile-310x150.png",revision:"622056371e6cb2f1ce3f86f726153faa"},{url:"/site-tile-310x310.png",revision:"4d7e36b91d12f06280007f00f4b5d58e"},{url:"/site-tile-70x70.png",revision:"8a90386419eb39fd7ce3a0d8b1e920b0"},{url:"/sw.js",revision:"8bbe2a19f4f29d87d96738b0cdc7763a"},{url:"/sw.js.map",revision:"9d67b97931957c4404b5ad2d81d9e8f6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[]}),"GET")}));
