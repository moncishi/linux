/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/03/cmds-linux-common-cmd/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/about/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/archives/2024/03/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/archives/2024/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/archives/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/blog-LeadPage/assets/css/fontawesome-all.min.css","5d0dca741a40eccc1122a7d3bfbbc6e9"],["/blog-LeadPage/assets/css/main.css","5531b558b7b45c1484e5e6a39519fa70"],["/blog-LeadPage/assets/css/noscript.css","a486734186d49c8e89898d66e4ae7ab8"],["/blog-LeadPage/assets/js/breakpoints.min.js","31fbdd1b26642f35b103de1e749b5cad"],["/blog-LeadPage/assets/js/browser.min.js","3fb2cca7b47122cd2878133d55a96540"],["/blog-LeadPage/assets/js/jquery.min.js","3367a9a51ee6d5eee0e6e93e6b42ea9b"],["/blog-LeadPage/assets/js/main.js","c728fd61933f6055113346959b3ee267"],["/blog-LeadPage/assets/js/util.js","6d67d6c608b0ba8d7d3af51e1facc504"],["/blog-LeadPage/assets/webfonts/fa-brands-400.eot","03783c5172ee1ad128c576bf88fac168"],["/blog-LeadPage/assets/webfonts/fa-brands-400.svg","dfe717b64df48f2b1fdf3d604cf17902"],["/blog-LeadPage/assets/webfonts/fa-brands-400.ttf","ed2b8bf117160466ba6220a8f1da54a4"],["/blog-LeadPage/assets/webfonts/fa-brands-400.woff","fe9d62e0d16a333a20e63c3e7595f82e"],["/blog-LeadPage/assets/webfonts/fa-regular-400.eot","fc9c63c8224fb341fc933641cbdd12ef"],["/blog-LeadPage/assets/webfonts/fa-regular-400.svg","ab2c684c9bcfaa78144cf5b1f10dbc12"],["/blog-LeadPage/assets/webfonts/fa-regular-400.ttf","59215032a4397507b80e5625dc323de3"],["/blog-LeadPage/assets/webfonts/fa-regular-400.woff","e5770f9863963fb576942e25214a226d"],["/blog-LeadPage/assets/webfonts/fa-solid-900.eot","ef3df98419d143d9617fe163bf4edc0b"],["/blog-LeadPage/assets/webfonts/fa-solid-900.svg","71e2ab35c0c985ca0fefcda5a1944d50"],["/blog-LeadPage/assets/webfonts/fa-solid-900.ttf","acf50f59802f20d8b45220eaae532a1c"],["/blog-LeadPage/assets/webfonts/fa-solid-900.woff","4bced7c4c0d61d4f988629bb8ae80b8b"],["/blog-LeadPage/images/avatar.jpg","1289110a7cdcd77af35477b623633ba2"],["/blog-LeadPage/images/bg.jpg","336ebad2792632505e3b0037adeeeba2"],["/blog-LeadPage/images/icon-fa-gem.png","4c344e67b8c04cb6f222e3da173fab7d"],["/blog-LeadPage/images/overlay.png","c2d2f4d92c31072bb430e0ed0a609294"],["/blog-LeadPage/images/pic01.jpg","55e1797fd15a7113b2be5a8fc1363d93"],["/blog-LeadPage/images/pic02.jpg","4528ad9f4ac47247d0e81d536ab02791"],["/blog-LeadPage/images/pic03.jpg","d537afae25e1f5de2071ec39e6956980"],["/blog-LeadPage/images/svg/coolapk.svg","e7b5898194fed5281b4131e2047a4352"],["/blog-LeadPage/images/svg/gitee.svg","ebf0ba20d6dc992adf85d776fadeab40"],["/blog-LeadPage/images/svg/github.svg","25a1eca2ec90800e1cd0b8d0cea08a1c"],["/blog-LeadPage/images/svg/mail.svg","4d5213d6ed052d04a06f78585fbb7af5"],["/blog-LeadPage/images/svg/money_receiving_QR_code.svg","216c8f540f1ec1901122c40012dde563"],["/blog-LeadPage/images/svg/qq.svg","05eccd1932b61aeacf0cb99b353a5c01"],["/blog-LeadPage/index.html","322415e0739bdebf579faaec8e8c5320"],["/blog-LeadPage/money_receiving_QR_code/index.html","f7bcd910b0eb4255c611548ab18032f7"],["/categories/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/categories/linux常用命令/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/resources/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/sw-register.js","5066897d832d96438b7f64c3cecf25ad"],["/tags/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/tags/linux/index.html","d41d8cd98f00b204e9800998ecf8427e"],["/tags/ubuntu/index.html","d41d8cd98f00b204e9800998ecf8427e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */