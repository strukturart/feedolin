// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"59mMM":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "5d57051a3907991b";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"20BJq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "recently_played", ()=>recently_played
);
parcelHelpers.export(exports, "listened_elem", ()=>listened_elem
);
parcelHelpers.export(exports, "userLang", ()=>userLang
);
parcelHelpers.export(exports, "setting", ()=>setting
);
parcelHelpers.export(exports, "status", ()=>status
);
var _translationsJs = require("./assets/js/translations.js");
var _mustache = require("mustache");
var _mustacheDefault = parcelHelpers.interopDefault(_mustache);
var _dompurify = require("dompurify");
var _dompurifyDefault = parcelHelpers.interopDefault(_dompurify);
var _helperJs = require("./assets/js/helper.js");
var _cacheJs = require("./assets/js/cache.js");
var _scanJs = require("./assets/js/scan.js");
var _settingsJs = require("./assets/js/settings.js");
var _audioJs = require("./assets/js/audio.js");
"use strict";
let article_array;
var content_arr = [];
var source_array = [];
var k = 0;
var panels = [
    "channels"
];
var current_panel = 0;
const parser = new DOMParser();
let video = "";
let youtube_player;
let video_time;
let youtube_time;
let video_status = "";
let youtube_status = "";
//store all used article ids
var all_cid = [];
//get read articles
var read_elem = localStorage.getItem("read_elem") != null ? JSON.parse(localStorage.getItem("read_elem")) : [];
let recently_played = localStorage.getItem("recently_played") != null ? JSON.parse(localStorage.getItem("recently_played")) : [];
let listened_elem = localStorage.getItem("listened_elem") != null ? JSON.parse(localStorage.getItem("listened_elem")) : [];
let tab_index = 0;
//xml items
let rss_title = "";
let item_title = "";
let item_summary = "";
let item_link = "";
let item_date_unix = "";
let item_duration = "";
let item_type = "";
let item_filesize = "";
let item_category = "";
let item_cid = "";
let item_image = "";
let yt_thumbnail = "";
let select_box = [];
_helperJs.screenlock("lock");
setTimeout(function() {
    _helperJs.screenlock("unlock");
}, 3000);
let userLang = navigator.language || navigator.userLanguage;
if (!_translationsJs.translations[userLang]) userLang = "en-EN";
let setting = {
    sleep_time: localStorage.getItem("sleep_time") != null ? localStorage.getItem("sleep_time") : 20,
    epsiodes_download: localStorage.getItem("episodes_download") != null ? localStorage.getItem("epsiodes_download") : 5,
    interval: localStorage.getItem("interval") != null ? localStorage.getItem("interval") : 0,
    source_local: localStorage.getItem("source_local") != null ? localStorage.getItem("source_local") : "",
    source: localStorage.getItem("source") != null ? localStorage.getItem("source") : "",
    local_file: false,
    wwww_file: false,
    ads: false
};
let default_opml = "https://raw.githubusercontent.com/strukturart/feedolin/master/example.opml";
let status = {
    active_element_id: "",
    window_status: "intro",
    active_audio_element_id: "",
    volume_status: false,
    panel: "",
    audio_duration: "",
    audio_status: "play",
    sleepmode: false
};
let reload = function() {
    window.location.reload(true);
    localStorage.setItem("reload", "true");
};
let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
    let d = JSON.parse(localStorage.getItem("audio_memory"));
    audio_memory = d;
} else audio_memory = {};
if (navigator.mozApps) {
    //ads || ads free
    //KaioOs ads
    let getManifest = function(callback) {
        if (!navigator.mozApps) return false;
        let self2 = navigator.mozApps.getSelf();
        self2.onsuccess = function() {
            callback(self2.result);
        };
        self2.onerror = function() {};
    };
    let self1;
    //KaiOs store true||false
    function manifest(a) {
        self1 = a.origin;
        let t = document.getElementById("KaiOsAds-Wrapper");
        if (a.installOrigin == "app://kaios-plus.kaiostech.com") document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
        else {
            console.log("Ads free");
            t.style.display = "none";
        }
    }
    getManifest(manifest);
}
//let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
    let d = JSON.parse(localStorage.getItem("audio_memory"));
    audio_memory = d;
}
setTimeout(()=>{
    if (navigator.minimizeMemoryUsage) navigator.minimizeMemoryUsage();
    if (localStorage["source_local"] == null && localStorage["source"] == null) {
        localStorage.setItem("source", default_opml);
        load_source_opml();
    }
    //get update time; cache || download
    let a = localStorage.getItem("interval");
    //reload content without caching
    if (localStorage.getItem("reload") == null) localStorage.setItem("reload", "false");
    if (localStorage.getItem("reload") == "true") a = 0;
    localStorage.setItem("reload", "false");
    document.getElementById("intro-message").innerText = "checking feed list";
    //download
    if (_cacheJs.getTime(a) && navigator.onLine) {
        let check = false;
        if (localStorage["source"] && localStorage["source"] != "" && localStorage["source"] != undefined) {
            load_source_opml();
            check = true;
        }
        if (localStorage["source_local"] && localStorage["source_local"] != "" && localStorage["source_local"] != undefined) {
            load_local_file_opml();
            check = true;
        }
        if (!check) {
            localStorage.setItem("source", default_opml);
            load_source_opml();
        }
    //load cache
    } else {
        document.getElementById("intro-message").innerText = "your device is offline, loading cached data";
        content_arr = _cacheJs.loadCache();
        if (content_arr) {
            document.getElementById("intro-message").innerText = "load cached data";
            setTimeout(function() {
                build();
            }, 1000);
        } else {
            document.getElementById("intro-message").innerText = "no internet connection and no cached data available";
            setTimeout(function() {
                _helperJs.goodbye();
            }, 4000);
        }
    }
}, 1000);
//start loading feeds
let load_feeds = function(data) {
    var xmlDoc = parser.parseFromString(data, "text/xml");
    let content = xmlDoc.getElementsByTagName("body")[0];
    let m = content.querySelectorAll("outline");
    for(var i = 0; i < m.length; i++){
        var nested = m[i].querySelectorAll("outline");
        if (nested.length > 0) for(var z = 0; z < nested.length; z++)source_array.push([
            nested[z].getAttribute("xmlUrl"),
            setting.epsiodes_download,
            m[i].getAttribute("text"),
            m[i].getAttribute("text"), 
        ]);
    }
    rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3]);
};
/////////////////////////////
////////////////////////////
//GET URL LIST/////////////
//from local file or online source
//////////////////////////
//////////////////////////
let nocaching = Math.floor(Date.now() / 1000);
///////////
///load source opml file from local source
//////////
let load_local_file_opml = function() {
    let a = localStorage.getItem("source_local");
    if (localStorage.getItem("source_local") == "" || localStorage.getItem("source_local") == null) return false;
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request = sdcard.get(a);
    request.onerror = function() {
        document.getElementById("intro-message").innerHTML = _translationsJs.translations[userLang].app_error_0;
    };
    request.onsuccess = function() {
        var file = this.result;
        var reader = new FileReader();
        reader.onerror = function(event) {
            reader.abort();
        };
        reader.onloadend = function(event) {
            let data = event.target.result;
            document.getElementById("intro-message").innerText = _translationsJs.translations[userLang].app_load_file;
            load_feeds(data);
        };
        reader.readAsText(file);
    };
};
///////////
///load source opml file from online source
//////////
let load_source_opml = function() {
    let source_url = localStorage.getItem("source");
    let xhttp = new XMLHttpRequest({
        mozSystem: true
    });
    xhttp.open("GET", source_url + "?time=" + nocaching, true);
    xhttp.timeout = 25000;
    xhttp.onload = function() {
        if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
            document.getElementById("intro-message").innerText = _translationsJs.translations[userLang].app_load_file;
            let data = xhttp.response;
            load_feeds(data);
        }
    };
    xhttp.onerror = function() {
        document.getElementById("intro-message").innerHTML = "😴<br>the source file cannot be loaded";
        document.getElementById("intro").style.display = "none";
        setTimeout(()=>{
            content_arr = cache.loadCache();
            if (content_arr) {
                build();
                document.getElementById("intro-message").innerText = "cached data loaded";
            } else setTimeout(()=>{
                show_settings();
            }, 3000);
        }, 4000);
    };
    xhttp.send(null);
};
//////////////////////////////
//download content////
//////////////////////////////
let rss_fetcher = function(param_url, param_limit, param_channel, param_category) {
    var xhttp = new XMLHttpRequest({
        mozSystem: true
    });
    xhttp.open("GET", param_url, true);
    xhttp.timeout = 2000;
    xhttp.responseType = "document";
    xhttp.overrideMimeType("text/xml");
    xhttp.send();
    xhttp.addEventListener("error", transferFailed);
    xhttp.addEventListener("loadend", loadEnd);
    function transferFailed() {
    //console.log("failed" + param_channel, 1000);
    }
    xhttp.onload = function() {
        document.getElementById("intro-message").innerText = "loading data";
        if (xhttp.readyState === xhttp.DONE && xhttp.status == 200) {
            let data = xhttp.response;
            item_image = "";
            item_summary = "";
            item_link = "";
            item_title = "";
            item_type = "";
            item_media = "rss";
            item_duration = "";
            item_filesize = "";
            listened = "false";
            play_track = "false";
            item_cid = "";
            item_read = "not-read";
            item_date = "";
            startlistened = "";
            youtube_id = "";
            yt_thumbnail = "";
            item_video_url = "";
            //Channel
            rss_title = data.querySelector("title").textContent || param_channel;
            param_channel = rss_title;
            let p = Number(source_array.length - 1);
            precent = 100 / p * k;
            document.querySelector("div#intro div#loading-progress div div").style.width = precent + "%";
            if (data.getElementsByTagName("url")[0]) item_image = data.getElementsByTagName("url")[0].textContent;
            //ATOM
            el = data.querySelectorAll("entry");
            if (el.length > 0) for(let i = 0; i < param_limit; i++){
                item_title = el[i].querySelector("title").innerHTML;
                item_cid = _helperJs.hashCode(item_title);
                var elem = el[i].querySelector("summary");
                if (elem) {
                    item_summary = el[i].querySelector("summary").textContent;
                    item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
                    item_summary = item_summary.replace(/(]]>)/g, "");
                    item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
                    item_summary = item_summary.replace(/(]]&gt;)/g, "");
                } else {
                    var elem = el[i].querySelector("content");
                    if (elem) {
                        item_summary = el[i].querySelector("content").textContent;
                        item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
                        item_summary = item_summary.replace(/(]]>)/g, "");
                        item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
                        item_summary = item_summary.replace(/(]]&gt;)/g, "");
                    }
                }
                if (el[i].getElementsByTagNameNS("*", "thumbnail").length > 0) item_image = el[i].getElementsByTagNameNS("*", "thumbnail").item(0).getAttribute("url");
                if (el[i].querySelector("link") !== null) item_link = el[i].querySelector("link").getAttribute("href");
                if (el[i].querySelector("enclosure") != null || el[i].querySelector("enclosure") != undefined) {
                    if (el[i].querySelector("enclosure").getAttribute("url")) item_download = el[i].querySelector("enclosure").getAttribute("url");
                    if (el[i].querySelector("enclosure").getAttribute("type")) item_type = el[i].querySelector("enclosure").getAttribute("type");
                    if (item_type == "audio/mpeg" || item_type == "audio/aac" || item_type == "audio/x-mpeg" || item_type == "audio/mp3" || item_type == "audio/x-m4a") item_media = "podcast";
                    if (item_type == "video/mp4" || item_type == "application/x-mpegurl") {
                        item_media = "video";
                        item_video_url = el[i].querySelector("enclosure").getAttribute("url");
                    }
                    if (el[i].querySelector("enclosure").getAttribute("length") > 0) {
                        let en_length = el[i].querySelector("enclosure").getAttribute("length");
                        item_filesize = _helperJs.formatFileSize(en_length, 2);
                    }
                }
                if (item_media == "podcast") {
                    if (el[i].getElementsByTagNameNS("*", "duration").length > 0) {
                        var duration = el[i].getElementsByTagNameNS("*", "duration").item(0).textContent;
                        item_duration = duration;
                        if (item_duration == "Invalid date") item_duration = "";
                    }
                }
                //check valid date
                if (el[i].querySelector("updated") != null || el[i].querySelector("updated") != undefined) {
                    if (el[i].querySelector("updated").innerHTML == "") {
                        item_date_unix = new Date().valueOf();
                        item_date = "";
                    } else {
                        item_date = new Date(el[i].querySelector("updated").innerHTML);
                        item_date_unix = item_date.valueOf();
                        item_date = item_date.toDateString();
                    }
                }
                if (item_link !== null && item_link.includes("https://www.youtube.com") === true) {
                    item_media = "youtube";
                    if (el[i].getElementsByTagNameNS("*", "videoId").length > 0) youtube_id = el[i].getElementsByTagNameNS("*", "videoId").item(0).textContent;
                } else item_media = "rss";
                if (item_media == "youtube") {
                    if (el[i].getElementsByTagNameNS("*", "group").length > 0) {
                        yt_thumbnail = el[i].getElementsByTagNameNS("*", "group")[0];
                        let n = yt_thumbnail.getElementsByTagNameNS("*", "thumbnail")[0];
                        yt_thumbnail = n.getAttribute("url");
                    }
                }
                startlistened = "";
                if (audio_memory.hasOwnProperty(item_cid)) start_listened = "start_listened";
                content_arr.push({
                    title: _dompurifyDefault.default.sanitize(item_title),
                    summary: _dompurifyDefault.default.sanitize(item_summary),
                    link: item_link,
                    date: item_date,
                    dateunix: item_date_unix,
                    channel: param_channel,
                    category: param_category,
                    type: item_type,
                    image: item_image,
                    duration: item_duration,
                    media: item_media,
                    filesize: item_filesize,
                    cid: item_cid,
                    listened: "not-listened",
                    recently_played: null,
                    recently_order: null,
                    read: "not-read",
                    start_listened: startlistened,
                    youtube_id: youtube_id,
                    youtube_thumbnail: yt_thumbnail,
                    video_url: item_video_url
                });
            }
            ////////////
            //RSS
            ///////////
            el = data.querySelectorAll("item");
            if (el.length > 0) for(let i1 = 0; i1 < param_limit; i1++){
                if (el[i1].querySelector("title") && el[i1].querySelector("title") != undefined) {
                    item_title = el[i1].querySelector("title").innerHTML;
                    item_title = item_title.replace("<![CDATA[", "");
                    item_title = item_title.replace("]]>", "");
                }
                item_cid = _helperJs.hashCode(item_title);
                if (el[i1].querySelector("description")) {
                    item_summary = el[i1].querySelector("description").textContent;
                    item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
                    item_summary = item_summary.replace(/(]]>)/g, "");
                    item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
                    item_summary = item_summary.replace(/(]]&gt;)/g, "");
                }
                if (el[i1].querySelector("link")) {
                    item_link = el[i1].querySelector("link").textContent;
                    item_download = el[i1].querySelector("link");
                }
                //check valid date
                if (el[i1].querySelector("pubDate") != null || el[i1].querySelector("pubDate") != undefined) {
                    if (el[i1].querySelector("pubDate").innerHTML == "") {
                        item_date_unix = new Date().valueOf();
                        item_date = "";
                    } else {
                        item_date = new Date(el[i1].querySelector("pubDate").innerHTML);
                        item_date_unix = item_date.valueOf();
                        item_date = item_date.toDateString();
                    }
                }
                if (el[i1].querySelector("enclosure") != null || el[i1].querySelector("enclosure") != undefined) {
                    if (el[i1].querySelector("enclosure").getAttribute("url")) item_download = el[i1].querySelector("enclosure").getAttribute("url");
                    item_link = el[i1].querySelector("enclosure").getAttribute("url");
                    if (el[i1].querySelector("enclosure").getAttribute("type")) item_type = el[i1].querySelector("enclosure").getAttribute("type");
                    console.log(item_type);
                    if (item_type == "audio/mpeg" || item_type == "audio/aac" || item_type == "audio/x-mpeg" || item_type == "audio/mp3" || item_type == "audio/x-m4a") item_media = "podcast";
                    if (item_type == "video/mp4" || item_type == "application/x-mpegurl") {
                        item_media = "video";
                        item_video_url = el[i1].querySelector("enclosure").getAttribute("url");
                    }
                    if (el[i1].querySelector("enclosure").getAttribute("length") > 0) {
                        let en_length = el[i1].querySelector("enclosure").getAttribute("length");
                        item_filesize = _helperJs.formatFileSize(en_length, 2);
                    }
                }
                if (item_media == "podcast") {
                    if (el[i1].getElementsByTagNameNS("*", "duration").length > 0) {
                        var duration = el[i1].getElementsByTagNameNS("*", "duration").item(0).textContent;
                        item_duration = duration;
                        if (item_duration == "Invalid date") item_duration = "";
                    }
                }
                startlistened = "";
                if (audio_memory.hasOwnProperty(item_cid)) startlistened = "start_listened";
                content_arr.push({
                    title: _dompurifyDefault.default.sanitize(item_title),
                    summary: _dompurifyDefault.default.sanitize(item_summary),
                    link: item_link,
                    date: item_date,
                    dateunix: item_date_unix,
                    channel: param_channel,
                    category: param_category,
                    type: item_type,
                    image: item_image,
                    duration: item_duration,
                    media: item_media,
                    filesize: item_filesize,
                    cid: item_cid,
                    listened: "not-listened",
                    recently_played: null,
                    recently_order: null,
                    read: "not-read",
                    start_listened: startlistened,
                    youtube_thumbnail: yt_thumbnail,
                    video_url: item_video_url
                });
            }
        }
        if (xhttp.status === 404) console.log(param_channel + " url not found", 3000);
        if (xhttp.status === 408) console.log(param_channel + "Time out", 3000);
        if (xhttp.status === 409) console.log(param_channel + "Conflict", 3000);
        ////Redirection
        if (xhttp.status === 301) //console.log(param_channel + " redirection", 3000);
        rss_fetcher(xhttp.getResponseHeader("Location"), param_limit, param_channel);
        xhttp.ontimeout = function(e) {
        //console.log(param_channel + "Time out", 3000);
        };
        xhttp.status;
    };
    function loadEnd(e) {
        //after download build html objects
        if (k == source_array.length - 1) {
            build();
            _cacheJs.saveCache(content_arr);
        }
        if (k < source_array.length - 1) {
            document.getElementById("intro-message").innerText = "loading data";
            k++;
            rss_fetcher(source_array[k][0], source_array[k][1], source_array[k][2], source_array[k][3]);
        }
    }
};
//sort content by date
//build
//write html
let read_articles = function() {
    //if element in read list
    //mark article as read
    content_arr.forEach(function(index) {
        all_cid.push(index.cid);
        index.read = "not-read";
        if (read_elem.length > 0) read_elem.forEach(function(p) {
            if (p == index.cid) index.read = "read";
        });
    });
};
//end to listen
//to show icon
let listened_articles = function() {
    content_arr.forEach(function(index) {
        index.listened = "not-listened";
        if (listened_elem.length > 0) {
            for(t = 0; t < listened_elem.length; t++)if (listened_elem[t] == index.cid) index.listened = "listened";
        }
    });
};
//started to listen
//add to list recently played
let listened_podcast_articles = function() {
    content_arr.forEach(function(index) {
        index.recently_played = "";
        index.recently_order = "";
        if (recently_played.length > 0) {
            for(let t = 0; t < recently_played.length; t++)if (recently_played[t] == index.cid) {
                index.recently_played = "recently-played";
                index.recently_order = t;
            }
        }
    });
};
//clear local storage
let clean_localstorage = function() {
    for(let i = 0; i < read_elem.length; i++)if (all_cid.indexOf(read_elem[i]) == -1) read_elem.slice(i, 1);
    localStorage.setItem("read_elem", JSON.stringify(read_elem));
    //recently played
    for(let i2 = 0; i2 < recently_played.length; i2++)if (all_cid.indexOf(recently_played[i2]) == -1) recently_played.slice(i2, 1);
    localStorage.setItem("recently_played", JSON.stringify(recently_played));
};
//render html
function renderHello(arr) {
    var template = document.getElementById("template").innerHTML;
    var rendered = _mustacheDefault.default.render(template, {
        data: arr
    });
    document.getElementById("news-feed-list").innerHTML = rendered;
}
//render selectbox
function renderSB(arr) {
    var template = document.getElementById("sb").innerHTML;
    var rendered = _mustacheDefault.default.render(template, {
        data: arr
    });
    document.getElementById("select-box").innerHTML = rendered;
}
//filter view
let heroArray = [];
let filter_data = function(cat) {
    heroArray.length = 0;
    for(let i = 0; i < content_arr.length; i++)if (content_arr[i].category == cat) heroArray.push(content_arr[i]);
};
let tabs = function() {
    for(let i = 0; i < content_arr.length; i++)//set panel category
    if (panels.includes(content_arr[i].category) === false && content_arr[i].category != 0) panels.push(content_arr[i].category);
};
let division_remove = function() {
    //remove division element
    if (document.querySelectorAll("div.division").length > 0) {
        let pp = [];
        document.querySelectorAll("div.division").forEach(function(item, index, object) {
            if (document.querySelectorAll("div.division")[index].classList) {
                let k1 = document.querySelectorAll("div.division")[index].className;
                if (pp.indexOf(k1) > -1) item.classList.add("remove");
                pp.push(k1);
            }
        });
        document.querySelectorAll("div.remove").forEach(function(item, index, object) {
            item.remove();
        });
    }
};
//build html
function build() {
    _helperJs.sort_array(content_arr, "channel", "string");
    read_articles();
    listened_articles();
    tabs();
    clean_localstorage();
    _helperJs.bottom_bar(_translationsJs.translations[userLang].app_settings, _translationsJs.translations[userLang].app_select, _translationsJs.translations[userLang].app_options);
    _helperJs.top_bar("", panels[0], "");
    panels.push("recently-played");
    renderHello(content_arr);
    division_remove();
    status.window_status = "article-list";
    document.getElementById("intro").style.display = "none";
    set_tabindex();
    article_array = document.querySelectorAll("article");
    article_array[0].focus();
}
//set tabindex
let set_tabindex = function() {
    let divs = document.querySelectorAll("article");
    let t = -1;
    for(let i = 0; i < divs.length; i++){
        divs[i].removeAttribute("tabindex");
        t++;
        divs[i].tabIndex = t;
    }
    tab_index = 0;
    setTimeout(function() {
        article_array = document.querySelectorAll("article");
        if (article_array > 0) article_array[0].focus();
    }, 1500);
};
//mark as read
let mark_as_read = function(un_read) {
    if (un_read == true) {
        document.activeElement.setAttribute("data-read", "read");
        status.active_element_id = document.activeElement.getAttribute("data-id");
        read_elem.push(status.active_element_id);
        localStorage.setItem("read_elem", JSON.stringify(read_elem));
    }
    if (un_read == false) {
        let kk = document.querySelector("[data-id ='" + status.active_element_id + "']").getAttribute("data-id");
        let test = [];
        for(var i = 0; i < read_elem.length; i++)if (read_elem[i] != kk) test.push(read_elem[i]);
        localStorage.setItem("read", JSON.stringify(test));
        document.activeElement.setAttribute("data-read", "not-read");
        _helperJs.toaster("article marked as not read", 2000);
    }
};
////////////////////////
//NAVIGATION
/////////////////////////
function nav_panels(left_right) {
    if (left_right == "left") current_panel--;
    if (left_right == "right") current_panel++;
    current_panel = current_panel % panels.length;
    if (current_panel < 0) current_panel += panels.length;
    _helperJs.top_bar("", panels[current_panel], "");
    if (status.sleepmode) _helperJs.top_bar("sleep", panels[current_panel], "");
    //filter data
    //default
    //view
    filter_data(panels[current_panel]);
    //sort
    _helperJs.sort_array(heroArray, "dateunix", "number");
    //build html
    renderHello(heroArray);
    setTimeout(()=>{
        if (document.querySelectorAll("article").length < 1) return false;
        article_array = document.querySelectorAll("article")[0].focus();
        //smooth scrolling
        const rect = document.activeElement.getBoundingClientRect();
        const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
        document.activeElement.parentNode.scrollBy({
            left: 0,
            top: elY - window.innerHeight / 2,
            behavior: "smooth"
        });
    }, 1000);
    document.querySelectorAll("div.division").forEach(function(index, key) {
        document.querySelectorAll("div.division")[key].style.display = "none";
    });
    //recently played
    if (panels[current_panel] == "recently-played") {
        //to do
        heroArray.length = 0;
        listened_podcast_articles();
        for(let i = 0; i < content_arr.length; i++)if (content_arr[i].recently_played == "recently-played") heroArray.push(content_arr[i]);
        _helperJs.sort_array(heroArray, "recently_order", "number");
        renderHello(heroArray);
        document.querySelectorAll("div.division").forEach(function(index, key) {
            document.querySelectorAll("div.division")[key].style.display = "none";
        });
    }
    //channels
    if (panels[current_panel] == "channels") {
        document.querySelectorAll("div.division").forEach(function(index, key) {
            document.querySelectorAll("div.division")[key].style.display = "block";
        });
        _helperJs.sort_array(content_arr, "channel", "string");
        renderHello(content_arr);
        division_remove();
    }
    set_tabindex();
    document.activeElement.classList.remove("overscrolling");
    status.panel = panels[current_panel];
}
////////////
//TABINDEX NAVIGATION
///////////
let tabIndex = 0;
function nav(move) {
    //let elem = document.activeElement;
    // Setup siblings array and get the first sibling
    //document.activeElement.classList.remove("overscrolling");
    let siblings = [];
    //let sibling = elem.parentNode.firstChild;
    //nested input field
    if (document.activeElement.parentNode.classList.contains("input-parent")) document.activeElement.parentNode.focus();
    if (document.activeElement.classList.contains("input-parent")) _helperJs.bottom_bar("", _translationsJs.translations[userLang].app_edit, _translationsJs.translations[userLang].app_back);
    let b = document.activeElement.parentNode;
    let items = b.querySelectorAll(".item");
    for(let i = 0; i < items.length; i++)siblings.push(items[i]);
    if (move == "+1") {
        tab_index++;
        if (tab_index >= siblings.length) {
            tab_index = siblings.length - 1;
            return true;
        }
        siblings[tab_index].focus();
    }
    if (move == "-1" && tab_index > 0) {
        tab_index--;
        siblings[tab_index].focus();
    }
    //smooth scrolling
    const rect = document.activeElement.getBoundingClientRect();
    const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
    document.activeElement.parentNode.scrollBy({
        left: 0,
        top: elY - window.innerHeight / 2,
        behavior: "smooth"
    });
}
//navigation between channels into channels view
division_count = 0;
let channel_navigation = function(direction) {
    let elements = document.getElementsByClassName("division");
    if (direction == "down" && division_count < elements.length) {
        let current = document.activeElement;
        let nextSibling = current.nextElementSibling;
        while(nextSibling){
            nextSibling = nextSibling.nextElementSibling;
            if (nextSibling.classList.contains("division")) {
                nextSibling.nextElementSibling.focus();
                tab_index = document.activeElement.getAttribute("tabindex");
                const rect = document.activeElement.getBoundingClientRect();
                const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
                document.activeElement.parentNode.scrollBy({
                    left: 0,
                    top: elY - window.innerHeight / 2,
                    behavior: "smooth"
                });
                return true;
            }
        }
    }
    if (direction == "up") {
        let current = document.activeElement;
        let previousSibling = current.previousElementSibling;
        while(previousSibling){
            previousSibling = previousSibling.previousElementSibling;
            if (previousSibling.classList.contains("division")) {
                previousSibling.nextElementSibling.focus();
                tab_index = document.activeElement.getAttribute("tabindex");
                const rect = document.activeElement.getBoundingClientRect();
                const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
                document.activeElement.parentNode.scrollBy({
                    left: 0,
                    top: elY - window.innerHeight / 2,
                    behavior: "smooth"
                });
                return true;
            }
        }
    }
};
let show_article = function() {
    document.querySelector("div#youtube-player").style.display = "none";
    document.querySelector("div#video-player").style.display = "none";
    document.querySelector("div#audio-player").style.display = "none";
    document.querySelectorAll("div.division").forEach(function(index, key) {
        document.querySelectorAll("div.division")[key].style.display = "none";
    });
    status.window_status = "single-article";
    navigator.spatialNavigationEnabled = false;
    document.querySelector("div#news-feed").style.background = "silver";
    link_type = document.activeElement.getAttribute("data-audio-type");
    let elem = document.querySelectorAll("article");
    for(let i = 0; i < elem.length; i++)elem[i].style.display = "none";
    elem = document.querySelectorAll("div.summary");
    for(let i3 = 0; i3 < elem.length; i3++)elem[i3].style.display = "block";
    document.activeElement.style.fontStyle = "normal";
    document.activeElement.style.color = "black";
    document.activeElement.style.display = "block";
    document.activeElement.classList.add("view");
    document.getElementById("top-bar").style.display = "none";
    document.getElementById("settings").style.display = "none";
    if (document.activeElement.getAttribute("data-media") == "podcast") {
        if (document.activeElement.classList.contains("audio-playing")) _helperJs.bottom_bar(_translationsJs.translations[userLang].player_pause, "", _translationsJs.translations[userLang].app_options);
        else _helperJs.bottom_bar(_translationsJs.translations[userLang].player_play, "", _translationsJs.translations[userLang].app_options);
    }
    if (document.activeElement.getAttribute("data-media") == "video") _helperJs.bottom_bar(_translationsJs.translations[userLang].player_play, "", _translationsJs.translations[userLang].app_options);
    if (document.activeElement.getAttribute("data-media") == "rss") _helperJs.bottom_bar(_translationsJs.translations[userLang].app_visit, "", _translationsJs.translations[userLang].app_options);
    if (document.activeElement.getAttribute("data-media") == "youtube") _helperJs.bottom_bar(_translationsJs.translations[userLang].app_open, "", _translationsJs.translations[userLang].app_options);
    document.activeElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    if (status.panel == "channel") document.querySelectorAll("div.division").forEach(function(index, key) {
        document.querySelectorAll("div.division")[key].style.display = "none";
    });
    mark_as_read(true);
    document.querySelector("div#news-feed div#news-feed-list").style.top = "0px";
};
let toTime = function(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
};
let youtube_seeking = function(param) {
    var step = 10;
    let new_time;
    if (param == "backward") {
        new_time = youtube_player.getCurrentTime() - step++;
        youtube_player.seekTo(new_time, true);
    }
    if (param == "forward") {
        new_time = youtube_player.getCurrentTime() + step++;
        youtube_player.seekTo(new_time, true);
    }
};
let video_seeking = function(param) {
    var step = 10;
    if (param == "backward") video.currentTime = video.currentTime - step++;
    if (param == "forward") video.currentTime = video.currentTime + step++;
};
//open source or youtube
function open_url() {
    //rss
    if (document.activeElement.getAttribute("data-media") == "rss") {
        let link_target = document.activeElement.getAttribute("data-link");
        let title = document.activeElement.querySelector("h1.title").textContent;
        title = title.replace(/\s/g, "-");
        _helperJs.bottom_bar("", "", "");
        show_article_list();
        window.open(link_target);
        return true;
    }
    //video
    if (document.activeElement.getAttribute("data-media") == "video") {
        video = document.getElementById("videoplayer");
        video.src = document.activeElement.getAttribute("data-video-url");
        console.log(document.activeElement.getAttribute("data-video-url"));
        open_video_player();
        document.getElementById("progress-bar").style.display = "block";
        status.window_status = "video";
        _helperJs.bottom_bar(_translationsJs.translations[userLang].player_pause, "", "");
        video.onloadedmetadata = function() {
            document.getElementById("message").style.top = "0px";
            document.getElementById("message-inner").innerText = "please wait ";
        };
        video.onplay = function() {};
        video.onplaying = function() {
            _audioJs.stop_player(); //stop audio player
            document.getElementById("message").style.top = "-1000px";
            video_status = "playing";
            video_time = setInterval(function() {
                t = video.duration - video.currentTime;
                let percent = video.currentTime / video.duration * 100;
                document.getElementById("progress-bar").style.display = "block";
                document.querySelector("div#progress-bar div").style.width = percent + "%";
                if (video_status == "playing") _helperJs.bottom_bar(_translationsJs.translations[userLang].player_pause, toTime(t), "");
                if (video_status == "paused") _helperJs.bottom_bar(_translationsJs.translations[userLang].player_play, toTime(t), "");
            }, 1000);
        };
        video.onpause = function() {
            document.getElementById("message").style.top = "-1000px";
            video_status = "paused";
            _helperJs.bottom_bar(_translationsJs.translations[userLang].player_pause, toTime(video.duration), "");
        };
        return;
    }
    //youtube
    if (document.activeElement.getAttribute("data-media") == "youtube") {
        _audioJs.stop_player();
        status.window_status = "youtube";
        _helperJs.bottom_bar(_translationsJs.translations[userLang].player_play, "", "");
        document.getElementById("message").style.top = "0px";
        document.getElementById("message-inner").innerText = "please wait ";
        document.getElementById("youtube-player").style.display = "block";
        youtube_player = new YT.Player("iframe-wrapper", {
            videoId: document.activeElement.getAttribute("data-youtube-id"),
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
        let t;
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING) {
                youtube_status = "playing";
                _helperJs.bottom_bar("pause", toTime(t), "");
            }
            if (event.data == YT.PlayerState.PAUSED) youtube_status = "paused";
            youtube_time = setInterval(function() {
                t = youtube_player.getDuration() - youtube_player.getCurrentTime();
                let percent = youtube_player.getCurrentTime() / youtube_player.getDuration() * 100;
                document.getElementById("progress-bar").style.display = "block";
                document.querySelector("div#progress-bar div").style.width = percent + "%";
                if (youtube_status == "playing") _helperJs.bottom_bar("pause", toTime(t), "");
                if (youtube_status == "paused") _helperJs.bottom_bar("play", toTime(t), "");
            }, 1000);
        }
        function onPlayerReady(event) {
            event.target.playVideo();
            document.getElementById("message").style.top = "-1000px";
        }
        return;
    }
}
/////////////////
//show article list
//////////////////
let show_article_list = function() {
    document.querySelector("div#news-feed div#news-feed-list").style.top = "27px";
    _helperJs.bottom_bar(_translationsJs.translations[userLang].app_select, _translationsJs.translations[userLang].app_select, _translationsJs.translations[userLang].app_options);
    _helperJs.top_bar("", panels[current_panel], "");
    document.getElementById("progress-bar").style.display = "none";
    if (youtube_player) {
        youtube_player.stopVideo();
        youtube_player.destroy();
        youtube_player = "";
        clearInterval(youtube_time);
        document.querySelector("div#youtube-player").style.display = "none";
    }
    video.src = "";
    clearInterval(video_time);
    document.querySelector("div#video-player").style.display = "none";
    if (status.sleepmode) _helperJs.top_bar("sleep", panels[current_panel], "");
    //show hide channels division
    if (status.panel == "channels") document.querySelectorAll("div.division").forEach(function(index, key) {
        document.querySelectorAll("div.division")[key].style.display = "block";
        document.querySelectorAll("div.division")[key].style.background = "black";
    });
    document.getElementById("audio-player").style.display = "none";
    document.querySelector("div#news-feed").style.background = "white";
    document.getElementById("top-bar").style.display = "block";
    let elem = document.querySelectorAll("article");
    for(let i = 0; i < elem.length; i++){
        elem[i].style.display = "block";
        let rd = elem[i].getAttribute("data-read");
        if (rd == "read") {
            document.activeElement.style.fontStyle = "italic";
            document.activeElement.style.color = "gray";
        }
    }
    elem = document.querySelectorAll("div.summary");
    for(let i4 = 0; i4 < elem.length; i4++)elem[i4].style.display = "none";
    document.querySelector("div#settings").style.display = "none";
    article_array[tab_index];
    document.querySelector("div#youtube-player").style.display = "none";
    document.querySelector("div#youtube-player iframe").setAttribute("src", "");
    status.window_status = "article-list";
    document.activeElement.focus();
    document.activeElement.classList.remove("view");
    const rect = document.activeElement.getBoundingClientRect();
    const elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
    document.activeElement.parentNode.scrollBy({
        left: 0,
        top: elY - window.innerHeight / 2,
        behavior: "smooth"
    });
    tab_index = document.activeElement.getAttribute("tabIndex");
};
//settings view
let show_settings = function() {
    _helperJs.bottom_bar("", "", _translationsJs.translations[userLang].app_back);
    document.querySelectorAll("div#settings .item").forEach(function(e, index) {
        if (e.style.display != "none") e.setAttribute("tabindex", index);
    });
    status.active_element_id = document.activeElement.getAttribute("data-id");
    status.window_status = "settings";
    tab_index = 0;
    document.getElementById("top-bar").style.display = "none";
    document.getElementById("settings").style.display = "block";
    document.getElementById("settings").children[0].focus();
    _settingsJs.load_settings();
};
let open_options = function() {
    _helperJs.bottom_bar("", _translationsJs.translations[userLang].app_select, "");
    tab_index = 0;
    status.active_element_id = document.activeElement.getAttribute("data-id");
    status.window_status = "options";
    document.getElementById("options").style.display = "block";
    document.querySelectorAll("div#options button")[0].focus();
};
let start_options = function() {
    if (document.activeElement.getAttribute("data-function") == "unread") mark_as_read(false);
    if (document.activeElement.getAttribute("data-function") == "sleepmode") sleep_mode();
    if (document.activeElement.getAttribute("data-function") == "share") {
        var k2 = document.querySelector("[data-id='" + status.active_element_id + "']").getAttribute("data-link");
        share(k2);
    }
    if (document.activeElement.getAttribute("data-function") == "audio-player") open_player(true);
    if (document.activeElement.getAttribute("data-function") == "volume") {
        navigator.volumeManager.requestShow();
        status.volume_status = true;
        navigator.spatialNavigationEnabled = false;
    }
};
let sleep_mode = function() {
    let st = setting.sleep_time;
    st = st * 60000;
    status.sleepmode = true;
    _helperJs.toaster("sleepmode activ", 3000);
    setTimeout(()=>{
        _audioJs.play_podcast();
        status.sleepmode = false;
    }, st);
};
let open_video_player = function() {
    document.getElementById("video-player").style.display = "block";
    status.window_status = "video";
    video.src = document.activeElement.getAttribute("data-video-url");
};
let open_player = function(reopen) {
    document.getElementById("audio-player").style.display = "block";
    status.window_status = "audio-player";
    document.getElementById("options").style.display = "none";
    if (status.active_audio_element_id != "") document.querySelector('[data-id="' + status.active_audio_element_id + '"]').focus();
    else document.querySelector('[data-id="' + document.activeElement.getAttribute("data-id") + '"]').focus();
    status.active_element_id = document.activeElement.getAttribute("data-id");
    if (!reopen) {
        if (document.activeElement.getAttribute("data-image") != "") {
            audio_cover = document.activeElement.getAttribute("data-image");
            document.getElementById("image").style.backgroundImage = "url(" + document.activeElement.getAttribute("data-image") + ")";
        } else document.getElementById("image").style.backgroundImage = "url(null)";
    }
    if (reopen) document.getElementById("image").style.backgroundImage = "url(" + audio_cover + ")";
    _helperJs.top_bar("", "", "");
};
//qr scan listener
const qr_listener = document.querySelector("input#source");
let qrscan = false;
qr_listener.addEventListener("focus", (event)=>{
    _helperJs.bottom_bar("", _translationsJs.translations[userLang].app_qr, _translationsJs.translations[userLang].app_back);
    qrscan = true;
});
qr_listener.addEventListener("blur", (event)=>{
    _helperJs.bottom_bar("", "", _translationsJs.translations[userLang].app_back);
    qrscan = false;
});
//button actions
let button_action = function() {
    _helperJs.bottom_bar("", _translationsJs.translations[userLang].app_select, _translationsJs.translations[userLang].app_back);
    let p = document.activeElement.getAttribute("data-action");
    if (p == "list-opml-files") {
        document.getElementById("select-box").style.display = "block";
        status.window_status = "select-box";
        _helperJs.bottom_bar(_translationsJs.translations[userLang].app_, _translationsJs.translations[userLang].app_select, _translationsJs.translations[userLang].app_back);
        document.querySelectorAll("div#select-box .item").forEach(function(e, index) {
            e.setAttribute("tabIndex", index);
            document.querySelectorAll("div#select-box div.item")[0].focus();
            tab_index = 0;
        });
    }
    if (p == "set-filename") select_box_selected();
};
document.querySelector("div.source-local-wrapper").style.display = "none";
let list_files_callback = function(filename) {
    document.querySelector("div.source-local-wrapper").style.display = "block";
    select_box.push({
        filename: filename
    });
    renderSB(select_box);
};
_helperJs.list_files("opml", list_files_callback);
//custom select box
let select_box_selected = function() {
    localStorage.setItem("source_local", document.activeElement.innerText);
    close_select_box();
};
let select_box_clear = function() {
    localStorage.setItem("source_local", "");
    close_select_box();
};
let close_select_box = function() {
    document.getElementById("select-box").style.display = "none";
    show_settings();
};
//////////////////////////////
////KEYPAD HANDLER////////////
//////////////////////////////
let longpress = false;
const longpress_timespan = 1000;
let timeout;
function repeat_action(param) {
    switch(param.key){
        case "0":
            break;
        case "ArrowLeft":
            if (status.window_status == "audio-player") {
                _audioJs.seeking("backward");
                break;
            }
            break;
        case "ArrowRight":
            if (status.window_status == "audio-player") {
                _audioJs.seeking("forward");
                break;
            }
            break;
    }
}
//////////////
////LONGPRESS
/////////////
function longpress_action(param) {
    switch(param.key){
        case "Backspace":
            window.close();
            break;
        case "0":
            reload();
            break;
    }
}
///////////////
////SHORTPRESS
//////////////
function shortpress_action(param) {
    switch(param.key){
        case "2":
            channel_navigation("up");
            break;
        case "5":
            channel_navigation("down");
            break;
        case "Enter":
            if (document.activeElement.hasAttributes("data-action")) button_action();
            if (document.activeElement.classList.contains("input-parent")) {
                document.activeElement.children[0].focus();
                return true;
            }
            if (status.window_status == "article-list") {
                show_article();
                break;
            }
            if (status.window_status == "options") {
                start_options();
                break;
            }
            if (status.window_status == "settings" && document.activeElement.classList.contains("reload")) reload();
            if (status.window_status == "settings" && document.activeElement.classList.contains("loadsettings")) _settingsJs.load_settings_from_file();
            if (status.window_status == "settings" && document.activeElement.classList.contains("export")) _settingsJs.export_settings();
            if (status.window_status == "settings" && document.activeElement.classList.contains("save")) _settingsJs.save_settings();
            if (status.window_status == "settings" && qrscan == true) {
                status.window_status = "scan";
                _scanJs.start_scan(function(callback) {
                    status.window_status = "settings";
                    let slug = callback;
                    document.getElementById("source").value = slug;
                });
                break;
            }
            break;
        case "ArrowLeft":
            if (status.window_status == "article-list") {
                nav_panels("left");
                break;
            }
            if (status.window_status == "audio-player") {
                _audioJs.seeking("backward");
                break;
            }
            if (status.window_status == "youtube") {
                youtube_seeking("backward");
                break;
            }
            if (status.window_status == "video") video_seeking("backward");
            break;
        case "ArrowRight":
            if (status.window_status == "article-list") {
                nav_panels("right");
                break;
            }
            if (status.window_status == "audio-player") {
                _audioJs.seeking("forward");
                break;
            }
            if (status.window_status == "youtube") {
                youtube_seeking("forward");
                break;
            }
            if (status.window_status == "video") video_seeking("forward");
            break;
        case "ArrowDown":
            if (status.window_status == "settings") {
                nav("+1");
                break;
            }
            if (status.window_status == "article-list") {
                nav("+1");
                break;
            }
            if (status.window_status == "options") {
                nav("+1");
                break;
            }
            if (status.window_status == "select-box") {
                nav("+1");
                break;
            }
            if (status.volume_status === true) {
                _audioJs.volume_control("down");
                break;
            }
            break;
        case "ArrowUp":
            if (status.window_status == "select-box") {
                nav("-1");
                break;
            }
            if (status.window_status == "settings") {
                nav("-1");
                break;
            }
            if (status.window_status == "options") {
                nav("-1");
                break;
            }
            if (status.window_status == "article-list") {
                nav("-1");
                break;
            }
            if (status.volume_status === true) {
                _audioJs.volume_control("up");
                break;
            }
            break;
        case "*":
            open_player(true);
            break;
        case "#":
            navigator.volumeManager.requestShow();
            status.volume_status = true;
            navigator.spatialNavigationEnabled = false;
            break;
        case "SoftLeft":
        case "Control":
            if (status.window_status == "article-list") {
                show_settings();
                break;
            }
            if (status.window_status == "single-article" && document.activeElement.getAttribute("data-media") == "podcast") {
                open_player(false);
                _audioJs.play_podcast(document.activeElement.getAttribute("data-link"));
                break;
            }
            if (status.window_status == "single-article") {
                open_url();
                break;
            }
            if (status.window_status == "settings") {
                _settingsJs.save_settings();
                break;
            }
            if (status.window_status == "audio-player") {
                _audioJs.play_podcast(document.activeElement.getAttribute("data-link"));
                break;
            }
            if (status.window_status == "video") {
                if (video_status == "paused" || video_status == "") {
                    video.play();
                    return false;
                }
                if (video_status == "playing") {
                    video.pause();
                    return false;
                }
            }
            if (status.window_status == "youtube") {
                if (youtube_status == "paused" || youtube_status == "") {
                    youtube_player.playVideo();
                    return false;
                }
                if (youtube_status == "playing") {
                    youtube_player.pauseVideo();
                    return false;
                }
                break;
            }
            if (status.window_status == "select-box") {
                select_box_clear();
                break;
            }
            break;
        case "SoftRight":
        case "Alt":
            if (status.window_status == "single-article") {
                open_options();
                break;
            }
            if (status.window_status == "settings") {
                show_article_list();
                setTimeout(()=>{
                    article_array = document.querySelectorAll("article");
                    article_array[0].focus();
                }, 1000);
                break;
            }
            if (status.window_status == "article-list") {
                open_options();
                break;
            }
            break;
        case "EndCall":
            _helperJs.goodbye();
            break;
        case "Backspace":
            if (status.window_status == "intro") {
                _helperJs.bottom_bar("", "", "");
                break;
            }
            if (status.window_status == "select-box") {
                _helperJs.bottom_bar("", "", _translationsJs.translations[userLang].app_back);
                close_select_box();
                status.window_status = "settings";
                show_settings();
                break;
            }
            if (status.window_status == "article-list") {
                _helperJs.bottom_bar("", "", "");
                break;
            }
            if (status.window_status == "single-article") {
                show_article_list();
                break;
            }
            if (status.window_status == "audio-player") {
                show_article_list();
                break;
            }
            if (status.window_status == "video") {
                show_article_list();
                break;
            }
            if (status.window_status == "youtube") {
                show_article_list();
                break;
            }
            if (status.window_status == "options") {
                document.getElementById("options").style.display = "none";
                show_article_list();
                document.querySelector("[data-id ='" + status.active_element_id + "']").focus();
                break;
            }
            if (status.window_status == "scan") {
                _scanJs.stop_scan();
                status.window_status;
                break;
            }
            break;
    }
}
/////////////////////////////////
////shortpress / longpress logic
////////////////////////////////
function handleKeyDown(evt) {
    if (evt.key === "Backspace" && status.window_status != "article-list") evt.preventDefault();
    if (evt.key === "EndCall") {
        evt.preventDefault();
        _helperJs.goodbye();
    }
    if (!evt.repeat) {
        longpress = false;
        timeout = setTimeout(()=>{
            longpress = true;
            longpress_action(evt);
        }, longpress_timespan);
    }
    if (evt.repeat) {
        if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace
        if (evt.key == "ArrowLeft") {
            if (status.window_status == "youtube") youtube_seeking("backward");
            if (status.window_status == "video") video_seeking("backward");
        }
        if (evt.key == "ArrowRight") {
            if (status.window_status == "youtube") youtube_seeking("forward");
            if (status.window_status == "video") video_seeking("forward");
        }
        longpress = false;
        repeat_action(evt);
    }
}
function handleKeyUp(evt) {
    evt.preventDefault();
    if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace
    if (evt.key == "Backspace" && status.window_status != "article-list" && document.activeElement.tagName == "INPUT") evt.preventDefault();
    clearTimeout(timeout);
    if (!longpress) shortpress_action(evt);
}
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

},{"./assets/js/translations.js":"3MYwo","mustache":"f4a22","dompurify":"8sfhq","./assets/js/helper.js":"db1Xp","./assets/js/cache.js":"8tkpL","./assets/js/scan.js":"6auJa","./assets/js/settings.js":"7Gtcu","./assets/js/audio.js":"9lrwz","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"3MYwo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "translations", ()=>translations
);
const translations = {
    "en-EN": {
        "app_intro_loading": "loading data",
        "player_play": "play",
        "player_pause": "pause",
        "player_stop": "stop",
        "app_settings": "settings",
        "app_options": "options",
        "app_select": "select",
        "app_edit": "edit",
        "app_back": "back",
        "app_visit": "visit",
        "app_open": "open",
        "app_slepp": "sleep",
        "app_load_file": "load OPML file",
        "app_qrcode": "QR",
        "app_clear": "clear",
        "app_error_0": "😴<br>No source file founded,<br> please create a opml file or set a url in the settings."
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"j7FRh":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"f4a22":[function(require,module,exports) {
(function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */ var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === '[object Array]';
    };
    function isFunction(object) {
        return typeof object === 'function';
    }
    /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */ function typeStr(obj) {
        return isArray(obj) ? 'array' : typeof obj;
    }
    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }
    /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */ function hasProperty(obj, propName) {
        return obj != null && typeof obj === 'object' && propName in obj;
    }
    /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */ function primitiveHasOwnProperty(primitive, propName) {
        return primitive != null && typeof primitive !== 'object' && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
    }
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }
    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */ function parseTemplate(template, tags) {
        if (!template) return [];
        var lineHasNonSpace = false;
        var sections = []; // Stack to hold section tokens
        var tokens = []; // Buffer to hold the tokens
        var spaces = []; // Indices of whitespace tokens on the current line
        var hasTag = false; // Is there a {{tag}} on the current line?
        var nonSpace = false; // Is there a non-space char on the current line?
        var indentation = ''; // Tracks indentation for tags that use it
        var tagIndex = 0; // Stores a count of number of tags encountered on a line
        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
            if (hasTag && !nonSpace) while(spaces.length)delete tokens[spaces.pop()];
            else spaces = [];
            hasTag = false;
            nonSpace = false;
        }
        var openingTagRe, closingTagRe, closingCurlyRe;
        function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);
            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);
            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
        }
        compileTags(tags || mustache.tags);
        var scanner = new Scanner(template);
        var start, type, value, chr, token, openSection;
        while(!scanner.eos()){
            start = scanner.pos;
            // Match any text between tags.
            value = scanner.scanUntil(openingTagRe);
            if (value) for(var i = 0, valueLength = value.length; i < valueLength; ++i){
                chr = value.charAt(i);
                if (isWhitespace(chr)) {
                    spaces.push(tokens.length);
                    indentation += chr;
                } else {
                    nonSpace = true;
                    lineHasNonSpace = true;
                    indentation += ' ';
                }
                tokens.push([
                    'text',
                    chr,
                    start,
                    start + 1
                ]);
                start += 1;
                // Check for whitespace on the current line.
                if (chr === '\n') {
                    stripSpace();
                    indentation = '';
                    tagIndex = 0;
                    lineHasNonSpace = false;
                }
            }
            // Match the opening tag.
            if (!scanner.scan(openingTagRe)) break;
            hasTag = true;
            // Get the tag type.
            type = scanner.scan(tagRe) || 'name';
            scanner.scan(whiteRe);
            // Get the tag value.
            if (type === '=') {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === '{') {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = '&';
            } else value = scanner.scanUntil(closingTagRe);
            // Match the closing tag.
            if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);
            if (type == '>') token = [
                type,
                value,
                start,
                scanner.pos,
                indentation,
                tagIndex,
                lineHasNonSpace
            ];
            else token = [
                type,
                value,
                start,
                scanner.pos
            ];
            tagIndex++;
            tokens.push(token);
            if (type === '#' || type === '^') sections.push(token);
            else if (type === '/') {
                // Check section nesting.
                openSection = sections.pop();
                if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
                if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === 'name' || type === '{' || type === '&') nonSpace = true;
            else if (type === '=') // Set the tags for the next time around.
            compileTags(value);
        }
        stripSpace();
        // Make sure there are no open sections when we're done.
        openSection = sections.pop();
        if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
        return nestTokens(squashTokens(tokens));
    }
    /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */ function squashTokens(tokens) {
        var squashedTokens = [];
        var token, lastToken;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            token = tokens[i];
            if (token) {
                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }
        return squashedTokens;
    }
    /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */ function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];
        var token, section;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            token = tokens[i];
            switch(token[0]){
                case '#':
                case '^':
                    collector.push(token);
                    sections.push(token);
                    collector = token[4] = [];
                    break;
                case '/':
                    section = sections.pop();
                    section[5] = token[2];
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }
        return nestedTokens;
    }
    /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */ function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }
    /**
   * Returns `true` if the tail is empty (end of string).
   */ Scanner.prototype.eos = function eos() {
        return this.tail === '';
    };
    /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */ Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);
        if (!match || match.index !== 0) return '';
        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
    };
    /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */ Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re), match;
        switch(index){
            case -1:
                match = this.tail;
                this.tail = '';
                break;
            case 0:
                match = '';
                break;
            default:
                match = this.tail.substring(0, index);
                this.tail = this.tail.substring(index);
        }
        this.pos += match.length;
        return match;
    };
    /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */ function Context(view, parentContext) {
        this.view = view;
        this.cache = {
            '.': this.view
        };
        this.parent = parentContext;
    }
    /**
   * Creates a new context using the given view with this context
   * as the parent.
   */ Context.prototype.push = function push(view) {
        return new Context(view, this);
    };
    /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */ Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;
        var value;
        if (cache.hasOwnProperty(name)) value = cache[name];
        else {
            var context = this, intermediateValue, names, index, lookupHit = false;
            while(context){
                if (name.indexOf('.') > 0) {
                    intermediateValue = context.view;
                    names = name.split('.');
                    index = 0;
                    /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/ while(intermediateValue != null && index < names.length){
                        if (index === names.length - 1) lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
                        intermediateValue = intermediateValue[names[index++]];
                    }
                } else {
                    intermediateValue = context.view[name];
                    /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/ lookupHit = hasProperty(context.view, name);
                }
                if (lookupHit) {
                    value = intermediateValue;
                    break;
                }
                context = context.parent;
            }
            cache[name] = value;
        }
        if (isFunction(value)) value = value.call(this.view);
        return value;
    };
    /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */ function Writer() {
        this.templateCache = {
            _cache: {},
            set: function set(key, value) {
                this._cache[key] = value;
            },
            get: function get(key) {
                return this._cache[key];
            },
            clear: function clear() {
                this._cache = {};
            }
        };
    }
    /**
   * Clears all cached templates in this writer.
   */ Writer.prototype.clearCache = function clearCache() {
        if (typeof this.templateCache !== 'undefined') this.templateCache.clear();
    };
    /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */ Writer.prototype.parse = function parse(template, tags) {
        var cache = this.templateCache;
        var cacheKey = template + ':' + (tags || mustache.tags).join(':');
        var isCacheEnabled = typeof cache !== 'undefined';
        var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;
        if (tokens == undefined) {
            tokens = parseTemplate(template, tags);
            isCacheEnabled && cache.set(cacheKey, tokens);
        }
        return tokens;
    };
    /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */ Writer.prototype.render = function render(template, view, partials, config) {
        var tags = this.getConfigTags(config);
        var tokens = this.parse(template, tags);
        var context = view instanceof Context ? view : new Context(view, undefined);
        return this.renderTokens(tokens, context, partials, template, config);
    };
    /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */ Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
        var buffer = '';
        var token, symbol, value;
        for(var i = 0, numTokens = tokens.length; i < numTokens; ++i){
            value = undefined;
            token = tokens[i];
            symbol = token[0];
            if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
            else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
            else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
            else if (symbol === '&') value = this.unescapedValue(token, context);
            else if (symbol === 'name') value = this.escapedValue(token, context, config);
            else if (symbol === 'text') value = this.rawValue(token);
            if (value !== undefined) buffer += value;
        }
        return buffer;
    };
    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
        var self = this;
        var buffer = '';
        var value = context.lookup(token[1]);
        // This function is used to render an arbitrary template
        // in the current context by higher-order sections.
        function subRender(template) {
            return self.render(template, context, partials, config);
        }
        if (!value) return;
        if (isArray(value)) for(var j = 0, valueLength = value.length; j < valueLength; ++j)buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
        else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
        else if (isFunction(value)) {
            if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');
            // Extract the portion of the original template that the section contains.
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (value != null) buffer += value;
        } else buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
        return buffer;
    };
    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
        var value = context.lookup(token[1]);
        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate, config);
    };
    Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
        var filteredIndentation = indentation.replace(/[^ \t]/g, '');
        var partialByNl = partial.split('\n');
        for(var i = 0; i < partialByNl.length; i++)if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) partialByNl[i] = filteredIndentation + partialByNl[i];
        return partialByNl.join('\n');
    };
    Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
        if (!partials) return;
        var tags = this.getConfigTags(config);
        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) {
            var lineHasNonSpace = token[6];
            var tagIndex = token[5];
            var indentation = token[4];
            var indentedValue = value;
            if (tagIndex == 0 && indentation) indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
            var tokens = this.parse(indentedValue, tags);
            return this.renderTokens(tokens, context, partials, indentedValue, config);
        }
    };
    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);
        if (value != null) return value;
    };
    Writer.prototype.escapedValue = function escapedValue(token, context, config) {
        var escape = this.getConfigEscape(config) || mustache.escape;
        var value = context.lookup(token[1]);
        if (value != null) return typeof value === 'number' && escape === mustache.escape ? String(value) : escape(value);
    };
    Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };
    Writer.prototype.getConfigTags = function getConfigTags(config) {
        if (isArray(config)) return config;
        else if (config && typeof config === 'object') return config.tags;
        else return undefined;
    };
    Writer.prototype.getConfigEscape = function getConfigEscape(config) {
        if (config && typeof config === 'object' && !isArray(config)) return config.escape;
        else return undefined;
    };
    var mustache = {
        name: 'mustache.js',
        version: '4.2.0',
        tags: [
            '{{',
            '}}'
        ],
        clearCache: undefined,
        escape: undefined,
        parse: undefined,
        render: undefined,
        Scanner: undefined,
        Context: undefined,
        Writer: undefined,
        /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */ set templateCache (cache){
            defaultWriter.templateCache = cache;
        },
        /**
     * Gets the default or overridden caching object from the default writer.
     */ get templateCache () {
            return defaultWriter.templateCache;
        }
    };
    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();
    /**
   * Clears all cached templates in the default writer.
   */ mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };
    /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */ mustache.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
    };
    /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */ mustache.render = function render(template, view, partials, config) {
        if (typeof template !== 'string') throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
        return defaultWriter.render(template, view, partials, config);
    };
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;
    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
    return mustache;
});

},{}],"8sfhq":[function(require,module,exports) {
/*! @license DOMPurify 2.3.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.6/LICENSE */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for(var i = 0, arr2 = Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
            return arr2;
        } else return Array.from(arr);
    }
    var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var freeze = Object.freeze, seal = Object.seal, create = Object.create; // eslint-disable-line import/no-mutable-exports
    var _ref = typeof Reflect !== 'undefined' && Reflect, apply = _ref.apply, construct = _ref.construct;
    if (!apply) apply = function apply(fun, thisValue, args) {
        return fun.apply(thisValue, args);
    };
    if (!freeze) freeze = function freeze(x) {
        return x;
    };
    if (!seal) seal = function seal(x) {
        return x;
    };
    if (!construct) construct = function construct(Func, args) {
        return new (Function.prototype.bind.apply(Func, [
            null
        ].concat(_toConsumableArray(args))))();
    };
    var arrayForEach = unapply(Array.prototype.forEach);
    var arrayPop = unapply(Array.prototype.pop);
    var arrayPush = unapply(Array.prototype.push);
    var stringToLowerCase = unapply(String.prototype.toLowerCase);
    var stringMatch = unapply(String.prototype.match);
    var stringReplace = unapply(String.prototype.replace);
    var stringIndexOf = unapply(String.prototype.indexOf);
    var stringTrim = unapply(String.prototype.trim);
    var regExpTest = unapply(RegExp.prototype.test);
    var typeErrorCreate = unconstruct(TypeError);
    function unapply(func) {
        return function(thisArg) {
            for(var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
            return apply(func, thisArg, args);
        };
    }
    function unconstruct(func) {
        return function() {
            for(var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
            return construct(func, args);
        };
    }
    /* Add properties to a lookup table */ function addToSet(set, array) {
        if (setPrototypeOf) // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null);
        var l = array.length;
        while(l--){
            var element = array[l];
            if (typeof element === 'string') {
                var lcElement = stringToLowerCase(element);
                if (lcElement !== element) {
                    // Config presets (e.g. tags.js, attrs.js) are immutable.
                    if (!isFrozen(array)) array[l] = lcElement;
                    element = lcElement;
                }
            }
            set[element] = true;
        }
        return set;
    }
    /* Shallow clone an object */ function clone(object) {
        var newObject = create(null);
        var property = void 0;
        for(property in object)if (apply(hasOwnProperty, object, [
            property
        ])) newObject[property] = object[property];
        return newObject;
    }
    /* IE10 doesn't support __lookupGetter__ so lets'
   * simulate it. It also automatically checks
   * if the prop is function or getter and behaves
   * accordingly. */ function lookupGetter(object, prop) {
        while(object !== null){
            var desc = getOwnPropertyDescriptor(object, prop);
            if (desc) {
                if (desc.get) return unapply(desc.get);
                if (typeof desc.value === 'function') return unapply(desc.value);
            }
            object = getPrototypeOf(object);
        }
        function fallbackValue(element) {
            console.warn('fallback value for', element);
            return null;
        }
        return fallbackValue;
    }
    var html = freeze([
        'a',
        'abbr',
        'acronym',
        'address',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'content',
        'data',
        'datalist',
        'dd',
        'decorator',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'element',
        'em',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'map',
        'mark',
        'marquee',
        'menu',
        'menuitem',
        'meter',
        'nav',
        'nobr',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'picture',
        'pre',
        'progress',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'section',
        'select',
        'shadow',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr'
    ]);
    // SVG
    var svg = freeze([
        'svg',
        'a',
        'altglyph',
        'altglyphdef',
        'altglyphitem',
        'animatecolor',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'filter',
        'font',
        'g',
        'glyph',
        'glyphref',
        'hkern',
        'image',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'stop',
        'style',
        'switch',
        'symbol',
        'text',
        'textpath',
        'title',
        'tref',
        'tspan',
        'view',
        'vkern'
    ]);
    var svgFilters = freeze([
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence'
    ]);
    // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.
    var svgDisallowed = freeze([
        'animate',
        'color-profile',
        'cursor',
        'discard',
        'fedropshadow',
        'font-face',
        'font-face-format',
        'font-face-name',
        'font-face-src',
        'font-face-uri',
        'foreignobject',
        'hatch',
        'hatchpath',
        'mesh',
        'meshgradient',
        'meshpatch',
        'meshrow',
        'missing-glyph',
        'script',
        'set',
        'solidcolor',
        'unknown',
        'use'
    ]);
    var mathMl = freeze([
        'math',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover'
    ]);
    // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.
    var mathMlDisallowed = freeze([
        'maction',
        'maligngroup',
        'malignmark',
        'mlongdiv',
        'mscarries',
        'mscarry',
        'msgroup',
        'mstack',
        'msline',
        'msrow',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ]);
    var text = freeze([
        '#text'
    ]);
    var html$1 = freeze([
        'accept',
        'action',
        'align',
        'alt',
        'autocapitalize',
        'autocomplete',
        'autopictureinpicture',
        'autoplay',
        'background',
        'bgcolor',
        'border',
        'capture',
        'cellpadding',
        'cellspacing',
        'checked',
        'cite',
        'class',
        'clear',
        'color',
        'cols',
        'colspan',
        'controls',
        'controlslist',
        'coords',
        'crossorigin',
        'datetime',
        'decoding',
        'default',
        'dir',
        'disabled',
        'disablepictureinpicture',
        'disableremoteplayback',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'face',
        'for',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'id',
        'inputmode',
        'integrity',
        'ismap',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'loop',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'multiple',
        'muted',
        'name',
        'nonce',
        'noshade',
        'novalidate',
        'nowrap',
        'open',
        'optimum',
        'pattern',
        'placeholder',
        'playsinline',
        'poster',
        'preload',
        'pubdate',
        'radiogroup',
        'readonly',
        'rel',
        'required',
        'rev',
        'reversed',
        'role',
        'rows',
        'rowspan',
        'spellcheck',
        'scope',
        'selected',
        'shape',
        'size',
        'sizes',
        'span',
        'srclang',
        'start',
        'src',
        'srcset',
        'step',
        'style',
        'summary',
        'tabindex',
        'title',
        'translate',
        'type',
        'usemap',
        'valign',
        'value',
        'width',
        'xmlns',
        'slot'
    ]);
    var svg$1 = freeze([
        'accent-height',
        'accumulate',
        'additive',
        'alignment-baseline',
        'ascent',
        'attributename',
        'attributetype',
        'azimuth',
        'basefrequency',
        'baseline-shift',
        'begin',
        'bias',
        'by',
        'class',
        'clip',
        'clippathunits',
        'clip-path',
        'clip-rule',
        'color',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'cx',
        'cy',
        'd',
        'dx',
        'dy',
        'diffuseconstant',
        'direction',
        'display',
        'divisor',
        'dur',
        'edgemode',
        'elevation',
        'end',
        'fill',
        'fill-opacity',
        'fill-rule',
        'filter',
        'filterunits',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'fx',
        'fy',
        'g1',
        'g2',
        'glyph-name',
        'glyphref',
        'gradientunits',
        'gradienttransform',
        'height',
        'href',
        'id',
        'image-rendering',
        'in',
        'in2',
        'k',
        'k1',
        'k2',
        'k3',
        'k4',
        'kerning',
        'keypoints',
        'keysplines',
        'keytimes',
        'lang',
        'lengthadjust',
        'letter-spacing',
        'kernelmatrix',
        'kernelunitlength',
        'lighting-color',
        'local',
        'marker-end',
        'marker-mid',
        'marker-start',
        'markerheight',
        'markerunits',
        'markerwidth',
        'maskcontentunits',
        'maskunits',
        'max',
        'mask',
        'media',
        'method',
        'mode',
        'min',
        'name',
        'numoctaves',
        'offset',
        'operator',
        'opacity',
        'order',
        'orient',
        'orientation',
        'origin',
        'overflow',
        'paint-order',
        'path',
        'pathlength',
        'patterncontentunits',
        'patterntransform',
        'patternunits',
        'points',
        'preservealpha',
        'preserveaspectratio',
        'primitiveunits',
        'r',
        'rx',
        'ry',
        'radius',
        'refx',
        'refy',
        'repeatcount',
        'repeatdur',
        'restart',
        'result',
        'rotate',
        'scale',
        'seed',
        'shape-rendering',
        'specularconstant',
        'specularexponent',
        'spreadmethod',
        'startoffset',
        'stddeviation',
        'stitchtiles',
        'stop-color',
        'stop-opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke',
        'stroke-width',
        'style',
        'surfacescale',
        'systemlanguage',
        'tabindex',
        'targetx',
        'targety',
        'transform',
        'transform-origin',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'textlength',
        'type',
        'u1',
        'u2',
        'unicode',
        'values',
        'viewbox',
        'visibility',
        'version',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'width',
        'word-spacing',
        'wrap',
        'writing-mode',
        'xchannelselector',
        'ychannelselector',
        'x',
        'x1',
        'x2',
        'xmlns',
        'y',
        'y1',
        'y2',
        'z',
        'zoomandpan'
    ]);
    var mathMl$1 = freeze([
        'accent',
        'accentunder',
        'align',
        'bevelled',
        'close',
        'columnsalign',
        'columnlines',
        'columnspan',
        'denomalign',
        'depth',
        'dir',
        'display',
        'displaystyle',
        'encoding',
        'fence',
        'frame',
        'height',
        'href',
        'id',
        'largeop',
        'length',
        'linethickness',
        'lspace',
        'lquote',
        'mathbackground',
        'mathcolor',
        'mathsize',
        'mathvariant',
        'maxsize',
        'minsize',
        'movablelimits',
        'notation',
        'numalign',
        'open',
        'rowalign',
        'rowlines',
        'rowspacing',
        'rowspan',
        'rspace',
        'rquote',
        'scriptlevel',
        'scriptminsize',
        'scriptsizemultiplier',
        'selection',
        'separator',
        'separators',
        'stretchy',
        'subscriptshift',
        'supscriptshift',
        'symmetric',
        'voffset',
        'width',
        'xmlns'
    ]);
    var xml = freeze([
        'xlink:href',
        'xml:id',
        'xlink:title',
        'xml:space',
        'xmlns:xlink'
    ]);
    // eslint-disable-next-line unicorn/better-regex
    var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
    var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
    var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
    var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
    var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    );
    var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    );
    var DOCTYPE_NAME = seal(/^html$/i);
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function _toConsumableArray$1(arr) {
        if (Array.isArray(arr)) {
            for(var i = 0, arr2 = Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
            return arr2;
        } else return Array.from(arr);
    }
    var getGlobal = function getGlobal() {
        return typeof window === 'undefined' ? null : window;
    };
    /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */ var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
        if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') return null;
        // Allow the callers to control the unique policy name
        // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
        // Policy creation with duplicate names throws in Trusted Types.
        var suffix = null;
        var ATTR_NAME = 'data-tt-policy-suffix';
        if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) suffix = document.currentScript.getAttribute(ATTR_NAME);
        var policyName = 'dompurify' + (suffix ? '#' + suffix : '');
        try {
            return trustedTypes.createPolicy(policyName, {
                createHTML: function createHTML(html$$1) {
                    return html$$1;
                }
            });
        } catch (_) {
            // Policy creation failed (most likely another DOMPurify script has
            // already run). Skip creating the policy, as this will only cause errors
            // if TT are enforced.
            console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
            return null;
        }
    };
    function createDOMPurify() {
        var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
        var DOMPurify = function DOMPurify(root) {
            return createDOMPurify(root);
        };
        /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */ DOMPurify.version = '2.3.6';
        /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */ DOMPurify.removed = [];
        if (!window || !window.document || window.document.nodeType !== 9) {
            // Not running in a browser, provide a factory function
            // so that you can pass your own Window
            DOMPurify.isSupported = false;
            return DOMPurify;
        }
        var originalDocument = window.document;
        var document = window.document;
        var DocumentFragment = window.DocumentFragment, HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, Element = window.Element, NodeFilter = window.NodeFilter, _window$NamedNodeMap = window.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window.HTMLFormElement, DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
        var ElementPrototype = Element.prototype;
        var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
        var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
        var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
        var getParentNode = lookupGetter(ElementPrototype, 'parentNode');
        // As per issue #47, the web-components registry is inherited by a
        // new document created via createHTMLDocument. As per the spec
        // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
        // a new empty registry is used when creating a template contents owner
        // document, so we use that as our parent document to ensure nothing
        // is inherited.
        if (typeof HTMLTemplateElement === 'function') {
            var template = document.createElement('template');
            if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
        }
        var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
        var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
        var _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        var importNode = originalDocument.importNode;
        var documentMode = {};
        try {
            documentMode = clone(document).documentMode ? document.documentMode : {};
        } catch (_) {}
        var hooks = {};
        /**
     * Expose whether this browser supports running the full DOMPurify.
     */ DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
        var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR, ERB_EXPR$$1 = ERB_EXPR, DATA_ATTR$$1 = DATA_ATTR, ARIA_ATTR$$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
        var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;
        /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */ /* allowed element names */ var ALLOWED_TAGS = null;
        var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));
        /* Allowed attribute names */ var ALLOWED_ATTR = null;
        var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));
        /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */ var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
            tagNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: false
            }
        }));
        /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */ var FORBID_TAGS = null;
        /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */ var FORBID_ATTR = null;
        /* Decide if ARIA attributes are okay */ var ALLOW_ARIA_ATTR = true;
        /* Decide if custom data attributes are okay */ var ALLOW_DATA_ATTR = true;
        /* Decide if unknown protocols are okay */ var ALLOW_UNKNOWN_PROTOCOLS = false;
        /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */ var SAFE_FOR_TEMPLATES = false;
        /* Decide if document with <html>... should be returned */ var WHOLE_DOCUMENT = false;
        /* Track whether config is already set on this instance of DOMPurify. */ var SET_CONFIG = false;
        /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */ var FORCE_BODY = false;
        /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */ var RETURN_DOM = false;
        /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */ var RETURN_DOM_FRAGMENT = false;
        /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */ var RETURN_TRUSTED_TYPE = false;
        /* Output should be free from DOM clobbering attacks? */ var SANITIZE_DOM = true;
        /* Keep element content when removing element? */ var KEEP_CONTENT = true;
        /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */ var IN_PLACE = false;
        /* Allow usage of profiles like html, svg and mathMl */ var USE_PROFILES = {};
        /* Tags to ignore content of when KEEP_CONTENT is true */ var FORBID_CONTENTS = null;
        var DEFAULT_FORBID_CONTENTS = addToSet({}, [
            'annotation-xml',
            'audio',
            'colgroup',
            'desc',
            'foreignobject',
            'head',
            'iframe',
            'math',
            'mi',
            'mn',
            'mo',
            'ms',
            'mtext',
            'noembed',
            'noframes',
            'noscript',
            'plaintext',
            'script',
            'style',
            'svg',
            'template',
            'thead',
            'title',
            'video',
            'xmp'
        ]);
        /* Tags that are safe for data: URIs */ var DATA_URI_TAGS = null;
        var DEFAULT_DATA_URI_TAGS = addToSet({}, [
            'audio',
            'video',
            'img',
            'source',
            'image',
            'track'
        ]);
        /* Attributes safe for values like "javascript:" */ var URI_SAFE_ATTRIBUTES = null;
        var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
            'alt',
            'class',
            'for',
            'id',
            'label',
            'name',
            'pattern',
            'placeholder',
            'role',
            'summary',
            'title',
            'value',
            'style',
            'xmlns'
        ]);
        var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
        var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
        /* Document namespace */ var NAMESPACE = HTML_NAMESPACE;
        var IS_EMPTY_INPUT = false;
        /* Parsing of strict XHTML documents */ var PARSER_MEDIA_TYPE = void 0;
        var SUPPORTED_PARSER_MEDIA_TYPES = [
            'application/xhtml+xml',
            'text/html'
        ];
        var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
        var transformCaseFunc = void 0;
        /* Keep a reference to config to pass to hooks */ var CONFIG = null;
        /* Ideally, do not touch anything below this line */ /* ______________________________________________ */ var formElement = document.createElement('form');
        var isRegexOrFunction = function isRegexOrFunction(testValue) {
            return testValue instanceof RegExp || testValue instanceof Function;
        };
        /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */ // eslint-disable-next-line complexity
        var _parseConfig = function _parseConfig(cfg) {
            if (CONFIG && CONFIG === cfg) return;
            /* Shield configuration object from tampering */ if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') cfg = {};
            /* Shield configuration object from prototype pollution */ cfg = clone(cfg);
            /* Set configuration parameters */ ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
            ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
            URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
            DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
            FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
            FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
            FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
            USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
            ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
            ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
            ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
            SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
            WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
            RETURN_DOM = cfg.RETURN_DOM || false; // Default false
            RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
            RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
            FORCE_BODY = cfg.FORCE_BODY || false; // Default false
            SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
            KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
            IN_PLACE = cfg.IN_PLACE || false; // Default false
            IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
            NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
            PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
            SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
            // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
            transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? function(x) {
                return x;
            } : stringToLowerCase;
            if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
            if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
            /* Parse profile info */ if (USE_PROFILES) {
                ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
                ALLOWED_ATTR = [];
                if (USE_PROFILES.html === true) {
                    addToSet(ALLOWED_TAGS, html);
                    addToSet(ALLOWED_ATTR, html$1);
                }
                if (USE_PROFILES.svg === true) {
                    addToSet(ALLOWED_TAGS, svg);
                    addToSet(ALLOWED_ATTR, svg$1);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.svgFilters === true) {
                    addToSet(ALLOWED_TAGS, svgFilters);
                    addToSet(ALLOWED_ATTR, svg$1);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.mathMl === true) {
                    addToSet(ALLOWED_TAGS, mathMl);
                    addToSet(ALLOWED_ATTR, mathMl$1);
                    addToSet(ALLOWED_ATTR, xml);
                }
            }
            /* Merge configuration parameters */ if (cfg.ADD_TAGS) {
                if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
                addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
            }
            if (cfg.ADD_ATTR) {
                if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
                addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
            }
            if (cfg.ADD_URI_SAFE_ATTR) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
            if (cfg.FORBID_CONTENTS) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
                addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
            }
            /* Add #text in case KEEP_CONTENT is set to true */ if (KEEP_CONTENT) ALLOWED_TAGS['#text'] = true;
            /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */ if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
                'html',
                'head',
                'body'
            ]);
            /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */ if (ALLOWED_TAGS.table) {
                addToSet(ALLOWED_TAGS, [
                    'tbody'
                ]);
                delete FORBID_TAGS.tbody;
            }
            // Prevent further manipulation of configuration.
            // Not available in IE8, Safari 5, etc.
            if (freeze) freeze(cfg);
            CONFIG = cfg;
        };
        var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, [
            'mi',
            'mo',
            'mn',
            'ms',
            'mtext'
        ]);
        var HTML_INTEGRATION_POINTS = addToSet({}, [
            'foreignobject',
            'desc',
            'title',
            'annotation-xml'
        ]);
        /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */ var ALL_SVG_TAGS = addToSet({}, svg);
        addToSet(ALL_SVG_TAGS, svgFilters);
        addToSet(ALL_SVG_TAGS, svgDisallowed);
        var ALL_MATHML_TAGS = addToSet({}, mathMl);
        addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
        /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */ var _checkValidNamespace = function _checkValidNamespace(element) {
            var parent = getParentNode(element);
            // In JSDOM, if we're inside shadow DOM, then parentNode
            // can be null. We just simulate parent in this case.
            if (!parent || !parent.tagName) parent = {
                namespaceURI: HTML_NAMESPACE,
                tagName: 'template'
            };
            var tagName = stringToLowerCase(element.tagName);
            var parentTagName = stringToLowerCase(parent.tagName);
            if (element.namespaceURI === SVG_NAMESPACE) {
                // The only way to switch from HTML namespace to SVG
                // is via <svg>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'svg';
                // The only way to switch from MathML to SVG is via
                // svg if parent is either <annotation-xml> or MathML
                // text integration points.
                if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
                // We only allow elements that are defined in SVG
                // spec. All others are disallowed in SVG namespace.
                return Boolean(ALL_SVG_TAGS[tagName]);
            }
            if (element.namespaceURI === MATHML_NAMESPACE) {
                // The only way to switch from HTML namespace to MathML
                // is via <math>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'math';
                // The only way to switch from SVG to MathML is via
                // <math> and HTML integration points
                if (parent.namespaceURI === SVG_NAMESPACE) return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
                // We only allow elements that are defined in MathML
                // spec. All others are disallowed in MathML namespace.
                return Boolean(ALL_MATHML_TAGS[tagName]);
            }
            if (element.namespaceURI === HTML_NAMESPACE) {
                // The only way to switch from SVG to HTML is via
                // HTML integration points, and from MathML to HTML
                // is via MathML text integration points
                if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
                if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
                // Certain elements are allowed in both SVG and HTML
                // namespace. We need to specify them explicitly
                // so that they don't get erronously deleted from
                // HTML namespace.
                var commonSvgAndHTMLElements = addToSet({}, [
                    'title',
                    'style',
                    'font',
                    'a',
                    'script'
                ]);
                // We disallow tags that are specific for MathML
                // or SVG and should never appear in HTML namespace
                return !ALL_MATHML_TAGS[tagName] && (commonSvgAndHTMLElements[tagName] || !ALL_SVG_TAGS[tagName]);
            }
            // The code should never reach this place (this means
            // that the element somehow got namespace that is not
            // HTML, SVG or MathML). Return false just in case.
            return false;
        };
        /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */ var _forceRemove = function _forceRemove(node) {
            arrayPush(DOMPurify.removed, {
                element: node
            });
            try {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                node.parentNode.removeChild(node);
            } catch (_) {
                try {
                    node.outerHTML = emptyHTML;
                } catch (_) {
                    node.remove();
                }
            }
        };
        /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */ var _removeAttribute = function _removeAttribute(name, node) {
            try {
                arrayPush(DOMPurify.removed, {
                    attribute: node.getAttributeNode(name),
                    from: node
                });
            } catch (_) {
                arrayPush(DOMPurify.removed, {
                    attribute: null,
                    from: node
                });
            }
            node.removeAttribute(name);
            // We void attribute values for unremovable "is"" attributes
            if (name === 'is' && !ALLOWED_ATTR[name]) {
                if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
                    _forceRemove(node);
                } catch (_) {}
                else try {
                    node.setAttribute(name, '');
                } catch (_1) {}
            }
        };
        /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */ var _initDocument = function _initDocument(dirty) {
            /* Create a HTML document */ var doc = void 0;
            var leadingWhitespace = void 0;
            if (FORCE_BODY) dirty = '<remove></remove>' + dirty;
            else {
                /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */ var matches = stringMatch(dirty, /^[\r\n\t ]+/);
                leadingWhitespace = matches && matches[0];
            }
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
            var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
            /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */ if (NAMESPACE === HTML_NAMESPACE) try {
                doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {}
            /* Use createHTMLDocument in case DOMParser is not available */ if (!doc || !doc.documentElement) {
                doc = implementation.createDocument(NAMESPACE, 'template', null);
                try {
                    doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload;
                } catch (_) {
                // Syntax error if dirtyPayload is invalid xml
                }
            }
            var body = doc.body || doc.documentElement;
            if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
            /* Work on whole document or just its body */ if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
            return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */ var _createIterator = function _createIterator(root) {
            return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
        };
        /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */ var _isClobbered = function _isClobbered(elm) {
            return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function');
        };
        /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */ var _isNode = function _isNode(object) {
            return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
        };
        /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */ var _executeHook = function _executeHook(entryPoint, currentNode, data) {
            if (!hooks[entryPoint]) return;
            arrayForEach(hooks[entryPoint], function(hook) {
                hook.call(DOMPurify, currentNode, data, CONFIG);
            });
        };
        /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */ var _sanitizeElements = function _sanitizeElements(currentNode) {
            var content = void 0;
            /* Execute a hook if present */ _executeHook('beforeSanitizeElements', currentNode, null);
            /* Check if element is clobbered or can clobber */ if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Check if tagname contains Unicode */ if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Now let's check the element's type and name */ var tagName = transformCaseFunc(currentNode.nodeName);
            /* Execute a hook if present */ _executeHook('uponSanitizeElement', currentNode, {
                tagName: tagName,
                allowedTags: ALLOWED_TAGS
            });
            /* Detect mXSS attempts abusing namespace confusion */ if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Mitigate a problem with templates inside select */ if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove element if anything forbids its presence */ if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                /* Check if we have a custom element to handle */ if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
                }
                /* Keep content except for bad-listed elements */ if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                    var parentNode = getParentNode(currentNode) || currentNode.parentNode;
                    var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
                    if (childNodes && parentNode) {
                        var childCount = childNodes.length;
                        for(var i = childCount - 1; i >= 0; --i)parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
                    }
                }
                _forceRemove(currentNode);
                return true;
            }
            /* Check whether element has a valid namespace */ if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Sanitize element content to be template-safe */ if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
                /* Get the element's text content */ content = currentNode.textContent;
                content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
                content = stringReplace(content, ERB_EXPR$$1, ' ');
                if (currentNode.textContent !== content) {
                    arrayPush(DOMPurify.removed, {
                        element: currentNode.cloneNode()
                    });
                    currentNode.textContent = content;
                }
            }
            /* Execute a hook if present */ _executeHook('afterSanitizeElements', currentNode, null);
            return false;
        };
        /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */ // eslint-disable-next-line complexity
        var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
            /* Make sure attribute cannot clobber */ if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) return false;
            /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */ if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$$1, lcName)) ;
            else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ;
            else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
                if (// First condition does a very basic check if a) it's basically a valid custom element tagname AND
                // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
                _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
                // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ;
                else return false;
            /* Check value is safe. First, is attr inert? If so, is safe */ } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
            else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ;
            else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;
            else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ;
            else if (!value) ;
            else return false;
            return true;
        };
        /**
     * _basicCustomElementCheck
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     * @param {string} tagName name of the tag of the node to sanitize
     */ var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
            return tagName.indexOf('-') > 0;
        };
        /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */ var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
            var attr = void 0;
            var value = void 0;
            var lcName = void 0;
            var l = void 0;
            /* Execute a hook if present */ _executeHook('beforeSanitizeAttributes', currentNode, null);
            var attributes = currentNode.attributes;
            /* Check if we have attributes; if not we might have a text node */ if (!attributes) return;
            var hookEvent = {
                attrName: '',
                attrValue: '',
                keepAttr: true,
                allowedAttributes: ALLOWED_ATTR
            };
            l = attributes.length;
            /* Go backwards over all attributes; safely remove bad ones */ while(l--){
                attr = attributes[l];
                var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
                value = stringTrim(attr.value);
                lcName = transformCaseFunc(name);
                /* Execute a hook if present */ hookEvent.attrName = lcName;
                hookEvent.attrValue = value;
                hookEvent.keepAttr = true;
                hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
                _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
                value = hookEvent.attrValue;
                /* Did the hooks approve of the attribute? */ if (hookEvent.forceKeepAttr) continue;
                /* Remove attribute */ _removeAttribute(name, currentNode);
                /* Did the hooks approve of the attribute? */ if (!hookEvent.keepAttr) continue;
                /* Work around a security issue in jQuery 3.0 */ if (regExpTest(/\/>/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Sanitize attribute content to be template-safe */ if (SAFE_FOR_TEMPLATES) {
                    value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
                    value = stringReplace(value, ERB_EXPR$$1, ' ');
                }
                /* Is `value` valid for this attribute? */ var lcTag = transformCaseFunc(currentNode.nodeName);
                if (!_isValidAttribute(lcTag, lcName, value)) continue;
                /* Handle invalid data-* attribute set by try-catching it */ try {
                    if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
                    else /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */ currentNode.setAttribute(name, value);
                    arrayPop(DOMPurify.removed);
                } catch (_) {}
            }
            /* Execute a hook if present */ _executeHook('afterSanitizeAttributes', currentNode, null);
        };
        /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */ var _sanitizeShadowDOM1 = function _sanitizeShadowDOM(fragment) {
            var shadowNode = void 0;
            var shadowIterator = _createIterator(fragment);
            /* Execute a hook if present */ _executeHook('beforeSanitizeShadowDOM', fragment, null);
            while(shadowNode = shadowIterator.nextNode()){
                /* Execute a hook if present */ _executeHook('uponSanitizeShadowNode', shadowNode, null);
                /* Sanitize tags and elements */ if (_sanitizeElements(shadowNode)) continue;
                /* Deep shadow DOM detected */ if (shadowNode.content instanceof DocumentFragment) _sanitizeShadowDOM(shadowNode.content);
                /* Check attributes, sanitize if necessary */ _sanitizeAttributes(shadowNode);
            }
            /* Execute a hook if present */ _executeHook('afterSanitizeShadowDOM', fragment, null);
        };
        /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */ // eslint-disable-next-line complexity
        DOMPurify.sanitize = function(dirty, cfg) {
            var body = void 0;
            var importedNode = void 0;
            var currentNode = void 0;
            var oldNode = void 0;
            var returnNode = void 0;
            /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */ IS_EMPTY_INPUT = !dirty;
            if (IS_EMPTY_INPUT) dirty = '<!-->';
            /* Stringify, in case dirty is an object */ if (typeof dirty !== 'string' && !_isNode(dirty)) {
                // eslint-disable-next-line no-negated-condition
                if (typeof dirty.toString !== 'function') throw typeErrorCreate('toString is not a function');
                else {
                    dirty = dirty.toString();
                    if (typeof dirty !== 'string') throw typeErrorCreate('dirty is not a string, aborting');
                }
            }
            /* Check we can run. Otherwise fall back or ignore */ if (!DOMPurify.isSupported) {
                if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
                    if (typeof dirty === 'string') return window.toStaticHTML(dirty);
                    if (_isNode(dirty)) return window.toStaticHTML(dirty.outerHTML);
                }
                return dirty;
            }
            /* Assign config vars */ if (!SET_CONFIG) _parseConfig(cfg);
            /* Clean up removed elements */ DOMPurify.removed = [];
            /* Check if dirty is correctly typed for IN_PLACE */ if (typeof dirty === 'string') IN_PLACE = false;
            if (IN_PLACE) /* Do some early pre-sanitization to avoid unsafe root nodes */ {
                if (dirty.nodeName) {
                    var tagName = transformCaseFunc(dirty.nodeName);
                    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
                }
            } else if (dirty instanceof Node) {
                /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */ body = _initDocument('<!---->');
                importedNode = body.ownerDocument.importNode(dirty, true);
                if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') /* Node is already a body, use as is */ body = importedNode;
                else if (importedNode.nodeName === 'HTML') body = importedNode;
                else // eslint-disable-next-line unicorn/prefer-dom-node-append
                body.appendChild(importedNode);
            } else {
                /* Exit directly if we have nothing to do */ if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
                dirty.indexOf('<') === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
                /* Initialize the document to work on */ body = _initDocument(dirty);
                /* Check we have a DOM node from the data */ if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
            }
            /* Remove first element node (ours) if FORCE_BODY is set */ if (body && FORCE_BODY) _forceRemove(body.firstChild);
            /* Get node iterator */ var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
            /* Now start iterating over the created document */ while(currentNode = nodeIterator.nextNode()){
                /* Fix IE's strange behavior with manipulated textNodes #89 */ if (currentNode.nodeType === 3 && currentNode === oldNode) continue;
                /* Sanitize tags and elements */ if (_sanitizeElements(currentNode)) continue;
                /* Shadow DOM detected, sanitize it */ if (currentNode.content instanceof DocumentFragment) _sanitizeShadowDOM1(currentNode.content);
                /* Check attributes, sanitize if necessary */ _sanitizeAttributes(currentNode);
                oldNode = currentNode;
            }
            oldNode = null;
            /* If we sanitized `dirty` in-place, return it. */ if (IN_PLACE) return dirty;
            /* Return sanitized string or DOM */ if (RETURN_DOM) {
                if (RETURN_DOM_FRAGMENT) {
                    returnNode = createDocumentFragment.call(body.ownerDocument);
                    while(body.firstChild)// eslint-disable-next-line unicorn/prefer-dom-node-append
                    returnNode.appendChild(body.firstChild);
                } else returnNode = body;
                if (ALLOWED_ATTR.shadowroot) /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */ returnNode = importNode.call(originalDocument, returnNode, true);
                return returnNode;
            }
            var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
            /* Serialize doctype if allowed */ if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
            /* Sanitize final string template-safe */ if (SAFE_FOR_TEMPLATES) {
                serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
                serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
            }
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */ DOMPurify.setConfig = function(cfg) {
            _parseConfig(cfg);
            SET_CONFIG = true;
        };
        /**
     * Public method to remove the configuration
     * clearConfig
     *
     */ DOMPurify.clearConfig = function() {
            CONFIG = null;
            SET_CONFIG = false;
        };
        /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */ DOMPurify.isValidAttribute = function(tag, attr, value) {
            /* Initialize shared config vars if necessary. */ if (!CONFIG) _parseConfig({});
            var lcTag = transformCaseFunc(tag);
            var lcName = transformCaseFunc(attr);
            return _isValidAttribute(lcTag, lcName, value);
        };
        /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */ DOMPurify.addHook = function(entryPoint, hookFunction) {
            if (typeof hookFunction !== 'function') return;
            hooks[entryPoint] = hooks[entryPoint] || [];
            arrayPush(hooks[entryPoint], hookFunction);
        };
        /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     */ DOMPurify.removeHook = function(entryPoint) {
            if (hooks[entryPoint]) arrayPop(hooks[entryPoint]);
        };
        /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */ DOMPurify.removeHooks = function(entryPoint) {
            if (hooks[entryPoint]) hooks[entryPoint] = [];
        };
        /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */ DOMPurify.removeAllHooks = function() {
            hooks = {};
        };
        return DOMPurify;
    }
    var purify = createDOMPurify();
    return purify;
});

},{}],"db1Xp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hashCode", ()=>hashCode
);
parcelHelpers.export(exports, "intToRGB", ()=>intToRGB
);
parcelHelpers.export(exports, "notify", ()=>notify
);
parcelHelpers.export(exports, "bottom_bar", ()=>bottom_bar
);
parcelHelpers.export(exports, "top_bar", ()=>top_bar
);
parcelHelpers.export(exports, "share", ()=>share
);
//check if internet connection
parcelHelpers.export(exports, "check_iconnection", ()=>check_iconnection
);
parcelHelpers.export(exports, "get_file", ()=>get_file
);
parcelHelpers.export(exports, "write_file", ()=>write_file
);
parcelHelpers.export(exports, "sort_array", ()=>sort_array
);
parcelHelpers.export(exports, "add_source", ()=>add_source
);
parcelHelpers.export(exports, "list_files", ()=>list_files
);
parcelHelpers.export(exports, "validate", ()=>validate
);
parcelHelpers.export(exports, "getManifest", ()=>getManifest
);
parcelHelpers.export(exports, "toaster", ()=>toaster
);
parcelHelpers.export(exports, "screenlock", ()=>screenlock
);
parcelHelpers.export(exports, "lazyload", ()=>lazyload
);
//filesize
parcelHelpers.export(exports, "formatFileSize", ()=>formatFileSize
);
parcelHelpers.export(exports, "goodbye", ()=>goodbye
);
//delete file
parcelHelpers.export(exports, "deleteFile", ()=>deleteFile
);
"use strict";
if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
let hashCode = function(str) {
    var hash = 0;
    for(var i = 0; i < str.length; i++)hash = ~~((hash << 5) - hash + str.charCodeAt(i));
    return hash;
};
function intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
let notify = function(param_title, param_text, param_silent, requireInteraction) {
    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: requireInteraction
    };
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) alert("This browser does not support desktop notification");
    else if (Notification.permission === "granted") // If it's okay let's create a notification
    var notification1 = new Notification(param_title, options);
    else if (Notification.permission !== "denied") Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            var notification = new Notification(param_title, options, action);
            document.addEventListener("visibilitychange", function() {
                if (document.visibilityState === "visible") {
                    // The tab has become visible so clear the now-stale Notification.
                    notification.close();
                    toaster("yes", 2000);
                }
            });
        }
    });
};
let bottom_bar = function(left, center, right) {
    document.querySelector("div#bottom-bar div#button-left").textContent = left;
    document.querySelector("div#bottom-bar div#button-center").textContent = center;
    document.querySelector("div#bottom-bar div#button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#bottom-bar").style.display = "none";
    else document.querySelector("div#bottom-bar").style.display = "block";
};
let top_bar = function(left, center, right) {
    document.querySelector("div#top-bar div.button-left").innerHTML = left;
    document.querySelector("div#top-bar div.button-center").textContent = center;
    document.querySelector("div#top-bar div.button-right").textContent = right;
    if (left == "" && center == "" && right == "") document.querySelector("div#top-bar").style.display = "none";
    else document.querySelector("div#top-bar").style.display = "block";
};
let share = function(url) {
    var activity = new MozActivity({
        name: "share",
        data: {
            type: "url",
            url: url
        }
    });
    activity.onsuccess = function() {};
    activity.onerror = function() {
        console.log("The activity encounter en error: " + this.error);
    };
};
function check_iconnection() {
    function updateOfflineStatus() {
        toaster("Your Browser is offline", 15000);
        return false;
    }
    window.addEventListener("offline", updateOfflineStatus);
}
function delete_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].delete(filename);
    request.onsuccess = function() {
    //toaster("File deleted", 2000);
    };
    request.onerror = function() {
    //toaster("Unable to delete the file: " + this.error, 2000);
    };
}
function get_file(filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var request = sdcard[1].get(filename);
    request.onsuccess = function() {
        var file = this.result;
    //alert("Get the file: " + file.name);
    };
    request.onerror = function() {
    //alert("Unable to get the file: " + this.error);
    };
}
function write_file(data, filename) {
    var sdcard = navigator.getDeviceStorages("sdcard");
    var file = new Blob([
        data
    ], {
        type: "text/plain"
    });
    var request = sdcard[1].addNamed(file, filename);
    request.onsuccess = function() {
        var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
    };
    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
        toaster("Unable to write the file: " + this.error, 2000);
    };
}
let sort_array = function(arr, item_key, type) {
    //sort by number
    if (type == "number") arr.sort((a, b)=>{
        return b[item_key] - a[item_key];
    });
    //sort by string
    if (type == "string") arr.sort((a, b)=>{
        let fa = a[item_key].toLowerCase(), fb = b[item_key].toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
    });
};
function add_source(url, limit, categorie, channel) {
    let sdcard = navigator.getDeviceStorages("sdcard");
    let request = sdcard[1].get("rss-reader.json");
    request.onsuccess = function() {
        let fileget = this.result;
        let reader = new FileReader();
        reader.addEventListener("loadend", function(event) {
            let data;
            //check if json valid
            try {
                data = JSON.parse(event.target.result);
            } catch (e) {
                toaster("Json is not valid", 2000);
                return false;
            }
            data.push({
                categorie: categorie,
                url: url,
                limit: limit,
                channel: channel
            });
            let extData = JSON.stringify(data);
            var request_del = sdcard[1].delete("rss-reader.json");
            request_del.onsuccess = function() {
                //toaster('File successfully removed.', 2000);
                let file = new Blob([
                    extData
                ], {
                    type: "application/json"
                });
                let requestAdd = sdcard[1].addNamed(file, "rss-reader.json");
                requestAdd.onsuccess = function() {
                    toaster("<br><br>the rss feed <br>has been successfully added to your list.", 3000);
                };
                requestAdd.onerror = function() {
                    toaster("Unable to write the file: " + this.error);
                };
            };
            request_del.onerror = function() {
            //toaster('Unable to remove the file: ' + this.error);
            };
        });
        reader.readAsText(fileget);
    };
    request.onerror = function() {
        toaster(this.error, 3000);
    };
}
let list_files = function(filetype, callback) {
    if (!navigator.getDeviceStorage) return false;
    var d = navigator.getDeviceStorage("sdcard");
    var cursor = d.enumerate();
    cursor.onsuccess = function() {
        if (!this.result) console.log("finished");
        if (cursor.result.name !== null) {
            var file = cursor.result;
            let n = file.name.split(".");
            let file_type = n[n.length - 1];
            if (file_type == filetype) callback(file.name);
            this.continue();
        }
    };
    cursor.onerror = function() {
        console.warn("No file found: " + this.error);
    };
};
function validate(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) return true;
    return false;
}
let getManifest = function(callback) {
    if (!navigator.mozApps) //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function() {
        callback(self.result);
    };
    self.onerror = function() {};
};
let queue = [];
let timeout;
let toaster = function(text, time) {
    queue.push({
        text: text,
        time: time
    });
    if (queue.length === 1) toast_q(text, time);
};
let add_script = function(script) {
    document.body.appendChild(document.createElement("script")).src = script;
};
let toast_q = function(text, time) {
    var x = document.querySelector("div#toast");
    x.innerHTML = queue[0].text;
    x.style.transform = "translate(0px, 0px)";
    timeout = setTimeout(function() {
        timeout = null;
        x.style.transform = "translate(0px, -100px)";
        queue = queue.slice(1);
        if (queue.length > 0) setTimeout(()=>{
            toast_q(text, time);
        }, 1000);
    }, time);
};
let lock;
let screenlock = function(stat) {
    if (typeof window.navigator.requestWakeLock === "undefined") return false;
    if (stat == "lock") {
        lock = window.navigator.requestWakeLock("screen");
        lock.onsuccess = function() {};
        lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }
    if (stat == "unlock") {
        if (lock.topic == "screen") lock.unlock();
    }
};
const lazyload = ((_)=>{
    let ll = function() {
        const images = document.querySelectorAll(".lazyload");
        function handleIntersection(entries) {
            entries.map((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.classList.add("loaded");
                    observer.unobserve(entry.target);
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection);
        for(let i = 0; i < images.length; i++)observer.observe(images[i]);
    };
    let existCondition = setInterval(function() {
        if (document.getElementsByClassName("lazyload").length) {
            clearInterval(existCondition);
            ll();
        }
    }, 500);
    return {
        ll
    };
})();
function formatFileSize(bytes, decimalPoint) {
    if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
        var k = 1000, dm = decimalPoint || 2, sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB"
        ], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
}
let goodbye = function() {
    document.getElementById("goodbye").style.display = "block";
    bottom_bar("", "", "");
    if (localStorage.clickcount) localStorage.clickcount = Number(localStorage.clickcount) + 1;
    else localStorage.clickcount = 1;
    if (localStorage.clickcount == 300000) message();
    else {
        document.getElementById("ciao").style.display = "block";
        setTimeout(function() {
            window.close();
        }, 4000);
    }
    function message() {
        document.getElementById("donation").style.display = "block";
        setTimeout(function() {
            localStorage.clickcount = 1;
            window.close();
        }, 6000);
    }
};
function deleteFile(storage, path, notification) {
    let sdcard = navigator.getDeviceStorages("sdcard");
    let requestDel = sdcard[storage].delete(path);
    requestDel.onsuccess = function() {
        if (notification == "notification") helper.toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
    };
    requestDel.onerror = function() {
        helper.toaster("Unable to delete the file: " + this.error);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8tkpL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getTime", ()=>getTime
);
parcelHelpers.export(exports, "loadCache", ()=>loadCache
);
parcelHelpers.export(exports, "saveCache", ()=>saveCache
);
let getTime = function(cache_buffer) {
    let timestamp = Math.floor(new Date().getTime() / 60000);
    cache_buffer = Number(cache_buffer);
    let lastupdate = Number(localStorage.getItem("last_update"));
    let update_time = cache_buffer + lastupdate;
    //alert(timestamp + "/" + lastupdate + "/" + cache_buffer)
    //document.getElementById("nextdownload").innerText = moment(update_time * 60000).format("DD.MM.YYYY,hh:mm");
    if (lastupdate == null || timestamp > update_time) {
        localStorage.setItem("last_update", timestamp.toString());
        //download
        return true;
    } else //cache
    return false;
};
let loadCache = function() {
    if (localStorage.getItem("data") == "" || localStorage.getItem("data") == undefined) return false;
    else return JSON.parse(localStorage.getItem("data"));
};
let saveCache = function(data) {
    localStorage.setItem("data", JSON.stringify(data));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6auJa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "stop_scan", ()=>stop_scan
);
parcelHelpers.export(exports, "start_scan", ()=>start_scan
);
var _jsqr = require("jsqr");
var _jsqrDefault = parcelHelpers.interopDefault(_jsqr);
var _appJs = require("../../app.js");
let video;
let intv;
let stop_scan = function() {
    document.getElementById("qr-screen").style.display = "none";
    console.log("yeah");
    clearInterval(intv);
    _appJs.status.window_status = "settings";
};
let start_scan = function(callback) {
    document.getElementById("qr-screen").style.display = "block";
    console.log("start");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) navigator.getUserMedia({
        audio: false,
        video: {
            width: 200,
            height: 200
        }
    }, function(stream) {
        video = document.querySelector("video");
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
            var barcodeCanvas = document.createElement("canvas");
            intv = setInterval(()=>{
                barcodeCanvas.width = video.videoWidth;
                barcodeCanvas.height = video.videoHeight;
                var barcodeContext = barcodeCanvas.getContext("2d");
                var imageWidth = Math.max(1, Math.floor(video.videoWidth)), imageHeight = Math.max(1, Math.floor(video.videoHeight));
                barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);
                var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
                var idd = imageData.data;
                let code = _jsqrDefault.default(idd, imageWidth, imageHeight);
                console.log(code);
                if (code) {
                    stop_scan();
                    callback(code.data);
                    clearInterval(intv);
                    _appJs.status.window_status = "settings";
                }
            }, 1000);
        };
    }, function(err) {
        console.log("The following error occurred: " + err.name);
    });
    else console.log("getUserMedia not supported");
};

},{"jsqr":"04jWG","../../app.js":"20BJq","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"04jWG":[function(require,module,exports) {
(function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
})(typeof self !== 'undefined' ? self : this, function() {
    return /******/ function(modules) {
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: false,
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/ /******/ // Flag the module as loaded
            /******/ module.l = true;
            /******/ /******/ // Return the exports of the module
            /******/ return module.exports;
        /******/ }
        /******/ /******/ /******/ // expose the modules object (__webpack_modules__)
        /******/ __webpack_require__.m = modules;
        /******/ /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules;
        /******/ /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ if (!__webpack_require__.o(exports, name)) /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
            });
        /******/ };
        /******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module) {
            /******/ var getter = module && module.__esModule ? /******/ function getDefault() {
                return module['default'];
            } : /******/ function getModuleExports() {
                return module;
            };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
        /******/ };
        /******/ /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/ /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "";
        /******/ /******/ // Load entry module and return exports
        /******/ return __webpack_require__(__webpack_require__.s = 3);
    /******/ }([
        /* 0 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix1 = /** @class */ function() {
                function BitMatrix(data, width) {
                    this.width = width;
                    this.height = data.length / width;
                    this.data = data;
                }
                BitMatrix.createEmpty = function(width, height) {
                    return new BitMatrix(new Uint8ClampedArray(width * height), width);
                };
                BitMatrix.prototype.get = function(x, y) {
                    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
                    return !!this.data[y * this.width + x];
                };
                BitMatrix.prototype.set = function(x, y, v) {
                    this.data[y * this.width + x] = v ? 1 : 0;
                };
                BitMatrix.prototype.setRegion = function(left, top, width, height, v) {
                    for(var y = top; y < top + height; y++)for(var x = left; x < left + width; x++)this.set(x, y, !!v);
                };
                return BitMatrix;
            }();
            exports.BitMatrix = BitMatrix1;
        /***/ },
        /* 1 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGFPoly_1 = __webpack_require__(2);
            function addOrSubtractGF(a, b) {
                return a ^ b; // tslint:disable-line:no-bitwise
            }
            exports.addOrSubtractGF = addOrSubtractGF;
            var GenericGF1 = /** @class */ function() {
                function GenericGF(primitive, size, genBase) {
                    this.primitive = primitive;
                    this.size = size;
                    this.generatorBase = genBase;
                    this.expTable = new Array(this.size);
                    this.logTable = new Array(this.size);
                    var x = 1;
                    for(var i = 0; i < this.size; i++){
                        this.expTable[i] = x;
                        x = x * 2;
                        if (x >= this.size) x = (x ^ this.primitive) & this.size - 1; // tslint:disable-line:no-bitwise
                    }
                    for(var i = 0; i < this.size - 1; i++)this.logTable[this.expTable[i]] = i;
                    this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        0
                    ]));
                    this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([
                        1
                    ]));
                }
                GenericGF.prototype.multiply = function(a, b) {
                    if (a === 0 || b === 0) return 0;
                    return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
                };
                GenericGF.prototype.inverse = function(a) {
                    if (a === 0) throw new Error("Can't invert 0");
                    return this.expTable[this.size - this.logTable[a] - 1];
                };
                GenericGF.prototype.buildMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid monomial degree less than 0");
                    if (coefficient === 0) return this.zero;
                    var coefficients = new Uint8ClampedArray(degree + 1);
                    coefficients[0] = coefficient;
                    return new GenericGFPoly_1.default(this, coefficients);
                };
                GenericGF.prototype.log = function(a) {
                    if (a === 0) throw new Error("Can't take log(0)");
                    return this.logTable[a];
                };
                GenericGF.prototype.exp = function(a) {
                    return this.expTable[a];
                };
                return GenericGF;
            }();
            exports.default = GenericGF1;
        /***/ },
        /* 2 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly1 = /** @class */ function() {
                function GenericGFPoly(field, coefficients) {
                    if (coefficients.length === 0) throw new Error("No coefficients.");
                    this.field = field;
                    var coefficientsLength = coefficients.length;
                    if (coefficientsLength > 1 && coefficients[0] === 0) {
                        // Leading term must be non-zero for anything except the constant polynomial "0"
                        var firstNonZero = 1;
                        while(firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0)firstNonZero++;
                        if (firstNonZero === coefficientsLength) this.coefficients = field.zero.coefficients;
                        else {
                            this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                            for(var i = 0; i < this.coefficients.length; i++)this.coefficients[i] = coefficients[firstNonZero + i];
                        }
                    } else this.coefficients = coefficients;
                }
                GenericGFPoly.prototype.degree = function() {
                    return this.coefficients.length - 1;
                };
                GenericGFPoly.prototype.isZero = function() {
                    return this.coefficients[0] === 0;
                };
                GenericGFPoly.prototype.getCoefficient = function(degree) {
                    return this.coefficients[this.coefficients.length - 1 - degree];
                };
                GenericGFPoly.prototype.addOrSubtract = function(other) {
                    var _a;
                    if (this.isZero()) return other;
                    if (other.isZero()) return this;
                    var smallerCoefficients = this.coefficients;
                    var largerCoefficients = other.coefficients;
                    if (smallerCoefficients.length > largerCoefficients.length) _a = [
                        largerCoefficients,
                        smallerCoefficients
                    ], smallerCoefficients = _a[0], largerCoefficients = _a[1];
                    var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
                    var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
                    for(var i = 0; i < lengthDiff; i++)sumDiff[i] = largerCoefficients[i];
                    for(var i = lengthDiff; i < largerCoefficients.length; i++)sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
                    return new GenericGFPoly(this.field, sumDiff);
                };
                GenericGFPoly.prototype.multiply = function(scalar) {
                    if (scalar === 0) return this.field.zero;
                    if (scalar === 1) return this;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], scalar);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyPoly = function(other) {
                    if (this.isZero() || other.isZero()) return this.field.zero;
                    var aCoefficients = this.coefficients;
                    var aLength = aCoefficients.length;
                    var bCoefficients = other.coefficients;
                    var bLength = bCoefficients.length;
                    var product = new Uint8ClampedArray(aLength + bLength - 1);
                    for(var i = 0; i < aLength; i++){
                        var aCoeff = aCoefficients[i];
                        for(var j = 0; j < bLength; j++)product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
                    }
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.multiplyByMonomial = function(degree, coefficient) {
                    if (degree < 0) throw new Error("Invalid degree less than 0");
                    if (coefficient === 0) return this.field.zero;
                    var size = this.coefficients.length;
                    var product = new Uint8ClampedArray(size + degree);
                    for(var i = 0; i < size; i++)product[i] = this.field.multiply(this.coefficients[i], coefficient);
                    return new GenericGFPoly(this.field, product);
                };
                GenericGFPoly.prototype.evaluateAt = function(a) {
                    var result = 0;
                    if (a === 0) // Just return the x^0 coefficient
                    return this.getCoefficient(0);
                    var size = this.coefficients.length;
                    if (a === 1) {
                        // Just the sum of the coefficients
                        this.coefficients.forEach(function(coefficient) {
                            result = GenericGF_1.addOrSubtractGF(result, coefficient);
                        });
                        return result;
                    }
                    result = this.coefficients[0];
                    for(var i = 1; i < size; i++)result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
                    return result;
                };
                return GenericGFPoly;
            }();
            exports.default = GenericGFPoly1;
        /***/ },
        /* 3 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var binarizer_1 = __webpack_require__(4);
            var decoder_1 = __webpack_require__(5);
            var extractor_1 = __webpack_require__(11);
            var locator_1 = __webpack_require__(12);
            function scan(matrix) {
                var locations = locator_1.locate(matrix);
                if (!locations) return null;
                for(var _i = 0, locations_1 = locations; _i < locations_1.length; _i++){
                    var location_1 = locations_1[_i];
                    var extracted = extractor_1.extract(matrix, location_1);
                    var decoded = decoder_1.decode(extracted.matrix);
                    if (decoded) return {
                        binaryData: decoded.bytes,
                        data: decoded.text,
                        chunks: decoded.chunks,
                        version: decoded.version,
                        location: {
                            topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                            topLeftCorner: extracted.mappingFunction(0, 0),
                            bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                            bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                            topRightFinderPattern: location_1.topRight,
                            topLeftFinderPattern: location_1.topLeft,
                            bottomLeftFinderPattern: location_1.bottomLeft,
                            bottomRightAlignmentPattern: location_1.alignmentPattern
                        }
                    };
                }
                return null;
            }
            var defaultOptions = {
                inversionAttempts: "attemptBoth"
            };
            function jsQR(data, width, height, providedOptions) {
                if (providedOptions === void 0) providedOptions = {};
                var options = defaultOptions;
                Object.keys(options || {}).forEach(function(opt) {
                    options[opt] = providedOptions[opt] || options[opt];
                });
                var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
                var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
                var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
                var result = scan(tryInvertedFirst ? inverted : binarized);
                if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) result = scan(tryInvertedFirst ? binarized : inverted);
                return result;
            }
            jsQR.default = jsQR;
            exports.default = jsQR;
        /***/ },
        /* 4 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var REGION_SIZE = 8;
            var MIN_DYNAMIC_RANGE = 24;
            function numBetween(value, min, max) {
                return value < min ? min : value > max ? max : value;
            }
            // Like BitMatrix but accepts arbitry Uint8 values
            var Matrix1 = /** @class */ function() {
                function Matrix(width, height) {
                    this.width = width;
                    this.data = new Uint8ClampedArray(width * height);
                }
                Matrix.prototype.get = function(x, y) {
                    return this.data[y * this.width + x];
                };
                Matrix.prototype.set = function(x, y, value) {
                    this.data[y * this.width + x] = value;
                };
                return Matrix;
            }();
            function binarize(data, width, height, returnInverted) {
                if (data.length !== width * height * 4) throw new Error("Malformed data passed to binarizer.");
                // Convert image to greyscale
                var greyscalePixels = new Matrix1(width, height);
                for(var x = 0; x < width; x++)for(var y = 0; y < height; y++){
                    var r = data[(y * width + x) * 4 + 0];
                    var g = data[(y * width + x) * 4 + 1];
                    var b = data[(y * width + x) * 4 + 2];
                    greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
                }
                var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
                var verticalRegionCount = Math.ceil(height / REGION_SIZE);
                var blackPoints = new Matrix1(horizontalRegionCount, verticalRegionCount);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var sum = 0;
                    var min = Infinity;
                    var max = 0;
                    for(var y = 0; y < REGION_SIZE; y++)for(var x = 0; x < REGION_SIZE; x++){
                        var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                        sum += pixelLumosity;
                        min = Math.min(min, pixelLumosity);
                        max = Math.max(max, pixelLumosity);
                    }
                    var average = sum / Math.pow(REGION_SIZE, 2);
                    if (max - min <= MIN_DYNAMIC_RANGE) {
                        // If variation within the block is low, assume this is a block with only light or only
                        // dark pixels. In that case we do not want to use the average, as it would divide this
                        // low contrast area into black and white pixels, essentially creating data out of noise.
                        //
                        // Default the blackpoint for these blocks to be half the min - effectively white them out
                        average = min / 2;
                        if (verticalRegion > 0 && hortizontalRegion > 0) {
                            // Correct the "white background" assumption for blocks that have neighbors by comparing
                            // the pixels in this block to the previously calculated black points. This is based on
                            // the fact that dark barcode symbology is always surrounded by some amount of light
                            // background for which reasonable black point estimates were made. The bp estimated at
                            // the boundaries is used for the interior.
                            // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                            var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                            if (min < averageNeighborBlackPoint) average = averageNeighborBlackPoint;
                        }
                    }
                    blackPoints.set(hortizontalRegion, verticalRegion, average);
                }
                var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
                var inverted = null;
                if (returnInverted) inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
                for(var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++)for(var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++){
                    var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
                    var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
                    var sum = 0;
                    for(var xRegion = -2; xRegion <= 2; xRegion++)for(var yRegion = -2; yRegion <= 2; yRegion++)sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                    var threshold = sum / 25;
                    for(var xRegion = 0; xRegion < REGION_SIZE; xRegion++)for(var yRegion = 0; yRegion < REGION_SIZE; yRegion++){
                        var x = hortizontalRegion * REGION_SIZE + xRegion;
                        var y = verticalRegion * REGION_SIZE + yRegion;
                        var lum = greyscalePixels.get(x, y);
                        binarized.set(x, y, lum <= threshold);
                        if (returnInverted) inverted.set(x, y, !(lum <= threshold));
                    }
                }
                if (returnInverted) return {
                    binarized: binarized,
                    inverted: inverted
                };
                return {
                    binarized: binarized
                };
            }
            exports.binarize = binarize;
        /***/ },
        /* 5 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            var decodeData_1 = __webpack_require__(6);
            var reedsolomon_1 = __webpack_require__(9);
            var version_1 = __webpack_require__(10);
            // tslint:disable:no-bitwise
            function numBitsDiffering(x, y) {
                var z = x ^ y;
                var bitCount = 0;
                while(z){
                    bitCount++;
                    z &= z - 1;
                }
                return bitCount;
            }
            function pushBit(bit, byte) {
                return byte << 1 | bit;
            }
            // tslint:enable:no-bitwise
            var FORMAT_INFO_TABLE = [
                {
                    bits: 0x5412,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x5125,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x5E7C,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x5B4B,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x45F9,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x40CE,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x4F97,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x4AA0,
                    formatInfo: {
                        errorCorrectionLevel: 1,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x77C4,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x72F3,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x7DAA,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x789D,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x662F,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x6318,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x6C41,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x6976,
                    formatInfo: {
                        errorCorrectionLevel: 0,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x1689,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x13BE,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x1CE7,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x19D0,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x0762,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x0255,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x0D0C,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x083B,
                    formatInfo: {
                        errorCorrectionLevel: 3,
                        dataMask: 7
                    }
                },
                {
                    bits: 0x355F,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 0
                    }
                },
                {
                    bits: 0x3068,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 1
                    }
                },
                {
                    bits: 0x3F31,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 2
                    }
                },
                {
                    bits: 0x3A06,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 3
                    }
                },
                {
                    bits: 0x24B4,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 4
                    }
                },
                {
                    bits: 0x2183,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 5
                    }
                },
                {
                    bits: 0x2EDA,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 6
                    }
                },
                {
                    bits: 0x2BED,
                    formatInfo: {
                        errorCorrectionLevel: 2,
                        dataMask: 7
                    }
                }, 
            ];
            var DATA_MASKS = [
                function(p) {
                    return (p.y + p.x) % 2 === 0;
                },
                function(p) {
                    return p.y % 2 === 0;
                },
                function(p) {
                    return p.x % 3 === 0;
                },
                function(p) {
                    return (p.y + p.x) % 3 === 0;
                },
                function(p) {
                    return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0;
                },
                function(p) {
                    return p.x * p.y % 2 + p.x * p.y % 3 === 0;
                },
                function(p) {
                    return (p.y * p.x % 2 + p.y * p.x % 3) % 2 === 0;
                },
                function(p) {
                    return ((p.y + p.x) % 2 + p.y * p.x % 3) % 2 === 0;
                }, 
            ];
            function buildFunctionPatternMask(version) {
                var dimension = 17 + 4 * version.versionNumber;
                var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
                matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
                matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
                matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
                // Alignment patterns
                for(var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++){
                    var x = _a[_i];
                    for(var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++){
                        var y = _c[_b];
                        if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) matrix.setRegion(x - 2, y - 2, 5, 5, true);
                    }
                }
                matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
                matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
                if (version.versionNumber > 6) {
                    matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
                    matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
                }
                return matrix;
            }
            function readCodewords(matrix, version, formatInfo) {
                var dataMask = DATA_MASKS[formatInfo.dataMask];
                var dimension = matrix.height;
                var functionPatternMask = buildFunctionPatternMask(version);
                var codewords = [];
                var currentByte = 0;
                var bitsRead = 0;
                // Read columns in pairs, from right to left
                var readingUp = true;
                for(var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2){
                    if (columnIndex === 6) columnIndex--;
                    for(var i = 0; i < dimension; i++){
                        var y = readingUp ? dimension - 1 - i : i;
                        for(var columnOffset = 0; columnOffset < 2; columnOffset++){
                            var x = columnIndex - columnOffset;
                            if (!functionPatternMask.get(x, y)) {
                                bitsRead++;
                                var bit = matrix.get(x, y);
                                if (dataMask({
                                    y: y,
                                    x: x
                                })) bit = !bit;
                                currentByte = pushBit(bit, currentByte);
                                if (bitsRead === 8) {
                                    codewords.push(currentByte);
                                    bitsRead = 0;
                                    currentByte = 0;
                                }
                            }
                        }
                    }
                    readingUp = !readingUp;
                }
                return codewords;
            }
            function readVersion(matrix) {
                var dimension = matrix.height;
                var provisionalVersion = Math.floor((dimension - 17) / 4);
                if (provisionalVersion <= 6) return version_1.VERSIONS[provisionalVersion - 1];
                var topRightVersionBits = 0;
                for(var y = 5; y >= 0; y--)for(var x = dimension - 9; x >= dimension - 11; x--)topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
                var bottomLeftVersionBits = 0;
                for(var x = 5; x >= 0; x--)for(var y = dimension - 9; y >= dimension - 11; y--)bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
                var bestDifference = Infinity;
                var bestVersion;
                for(var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++){
                    var version = VERSIONS_1[_i];
                    if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) return version;
                    var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                    difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
                    if (difference < bestDifference) {
                        bestVersion = version;
                        bestDifference = difference;
                    }
                }
                // We can tolerate up to 3 bits of error since no two version info codewords will
                // differ in less than 8 bits.
                if (bestDifference <= 3) return bestVersion;
            }
            function readFormatInformation(matrix) {
                var topLeftFormatInfoBits = 0;
                for(var x = 0; x <= 8; x++)if (x !== 6) topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
                for(var y = 7; y >= 0; y--)if (y !== 6) topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
                var dimension = matrix.height;
                var topRightBottomRightFormatInfoBits = 0;
                for(var y = dimension - 1; y >= dimension - 7; y--)topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
                for(var x = dimension - 8; x < dimension; x++)topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
                var bestDifference = Infinity;
                var bestFormatInfo = null;
                for(var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++){
                    var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
                    if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) return formatInfo;
                    var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
                    if (difference < bestDifference) {
                        bestFormatInfo = formatInfo;
                        bestDifference = difference;
                    }
                    if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
                        difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
                        if (difference < bestDifference) {
                            bestFormatInfo = formatInfo;
                            bestDifference = difference;
                        }
                    }
                }
                // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
                if (bestDifference <= 3) return bestFormatInfo;
                return null;
            }
            function getDataBlocks(codewords, version, ecLevel) {
                var ecInfo = version.errorCorrectionLevels[ecLevel];
                var dataBlocks = [];
                var totalCodewords = 0;
                ecInfo.ecBlocks.forEach(function(block) {
                    for(var i = 0; i < block.numBlocks; i++){
                        dataBlocks.push({
                            numDataCodewords: block.dataCodewordsPerBlock,
                            codewords: []
                        });
                        totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
                    }
                });
                // In some cases the QR code will be malformed enough that we pull off more or less than we should.
                // If we pull off less there's nothing we can do.
                // If we pull off more we can safely truncate
                if (codewords.length < totalCodewords) return null;
                codewords = codewords.slice(0, totalCodewords);
                var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
                // Pull codewords to fill the blocks up to the minimum size
                for(var i1 = 0; i1 < shortBlockSize; i1++)for(var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++){
                    var dataBlock = dataBlocks_1[_i];
                    dataBlock.codewords.push(codewords.shift());
                }
                // If there are any large blocks, pull codewords to fill the last element of those
                if (ecInfo.ecBlocks.length > 1) {
                    var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
                    var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
                    for(var i1 = 0; i1 < largeBlockCount; i1++)dataBlocks[smallBlockCount + i1].codewords.push(codewords.shift());
                }
                // Add the rest of the codewords to the blocks. These are the error correction codewords.
                while(codewords.length > 0)for(var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++){
                    var dataBlock = dataBlocks_2[_a];
                    dataBlock.codewords.push(codewords.shift());
                }
                return dataBlocks;
            }
            function decodeMatrix(matrix) {
                var version = readVersion(matrix);
                if (!version) return null;
                var formatInfo = readFormatInformation(matrix);
                if (!formatInfo) return null;
                var codewords = readCodewords(matrix, version, formatInfo);
                var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
                if (!dataBlocks) return null;
                // Count total number of data bytes
                var totalBytes = dataBlocks.reduce(function(a, b) {
                    return a + b.numDataCodewords;
                }, 0);
                var resultBytes = new Uint8ClampedArray(totalBytes);
                var resultIndex = 0;
                for(var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++){
                    var dataBlock = dataBlocks_3[_i];
                    var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
                    if (!correctedBytes) return null;
                    for(var i = 0; i < dataBlock.numDataCodewords; i++)resultBytes[resultIndex++] = correctedBytes[i];
                }
                try {
                    return decodeData_1.decode(resultBytes, version.versionNumber);
                } catch (_a) {
                    return null;
                }
            }
            function decode(matrix) {
                if (matrix == null) return null;
                var result = decodeMatrix(matrix);
                if (result) return result;
                // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
                for(var x = 0; x < matrix.width; x++){
                    for(var y = x + 1; y < matrix.height; y++)if (matrix.get(x, y) !== matrix.get(y, x)) {
                        matrix.set(x, y, !matrix.get(x, y));
                        matrix.set(y, x, !matrix.get(y, x));
                    }
                }
                return decodeMatrix(matrix);
            }
            exports.decode = decode;
        /***/ },
        /* 6 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            // tslint:disable:no-bitwise
            var BitStream_1 = __webpack_require__(7);
            var shiftJISTable_1 = __webpack_require__(8);
            var Mode1;
            (function(Mode) {
                Mode["Numeric"] = "numeric";
                Mode["Alphanumeric"] = "alphanumeric";
                Mode["Byte"] = "byte";
                Mode["Kanji"] = "kanji";
                Mode["ECI"] = "eci";
            })(Mode1 = exports.Mode || (exports.Mode = {}));
            var ModeByte1;
            (function(ModeByte) {
                ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
                ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
                ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
                ModeByte[ModeByte["Byte"] = 4] = "Byte";
                ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
                ModeByte[ModeByte["ECI"] = 7] = "ECI";
            // StructuredAppend = 0x3,
            // FNC1FirstPosition = 0x5,
            // FNC1SecondPosition = 0x9,
            })(ModeByte1 || (ModeByte1 = {}));
            function decodeNumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    10,
                    12,
                    14
                ][size];
                var length = stream.readBits(characterCountSize);
                // Read digits in groups of 3
                while(length >= 3){
                    var num = stream.readBits(10);
                    if (num >= 1000) throw new Error("Invalid numeric value above 999");
                    var a = Math.floor(num / 100);
                    var b = Math.floor(num / 10) % 10;
                    var c = num % 10;
                    bytes.push(48 + a, 48 + b, 48 + c);
                    text += a.toString() + b.toString() + c.toString();
                    length -= 3;
                }
                // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
                if (length === 2) {
                    var num = stream.readBits(7);
                    if (num >= 100) throw new Error("Invalid numeric value above 99");
                    var a = Math.floor(num / 10);
                    var b = num % 10;
                    bytes.push(48 + a, 48 + b);
                    text += a.toString() + b.toString();
                } else if (length === 1) {
                    var num = stream.readBits(4);
                    if (num >= 10) throw new Error("Invalid numeric value above 9");
                    bytes.push(48 + num);
                    text += num.toString();
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            var AlphanumericCharacterCodes = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                " ",
                "$",
                "%",
                "*",
                "+",
                "-",
                ".",
                "/",
                ":", 
            ];
            function decodeAlphanumeric(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    9,
                    11,
                    13
                ][size];
                var length = stream.readBits(characterCountSize);
                while(length >= 2){
                    var v = stream.readBits(11);
                    var a = Math.floor(v / 45);
                    var b = v % 45;
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
                    length -= 2;
                }
                if (length === 1) {
                    var a = stream.readBits(6);
                    bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
                    text += AlphanumericCharacterCodes[a];
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeByte(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    16,
                    16
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var b = stream.readBits(8);
                    bytes.push(b);
                }
                try {
                    text += decodeURIComponent(bytes.map(function(b) {
                        return "%" + ("0" + b.toString(16)).substr(-2);
                    }).join(""));
                } catch (_a) {
                // failed to decode
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decodeKanji(stream, size) {
                var bytes = [];
                var text = "";
                var characterCountSize = [
                    8,
                    10,
                    12
                ][size];
                var length = stream.readBits(characterCountSize);
                for(var i = 0; i < length; i++){
                    var k = stream.readBits(13);
                    var c = Math.floor(k / 0xC0) << 8 | k % 0xC0;
                    if (c < 0x1F00) c += 0x8140;
                    else c += 0xC140;
                    bytes.push(c >> 8, c & 0xFF);
                    text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
                }
                return {
                    bytes: bytes,
                    text: text
                };
            }
            function decode(data, version) {
                var _a, _b, _c, _d;
                var stream = new BitStream_1.BitStream(data);
                // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
                var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
                var result = {
                    text: "",
                    bytes: [],
                    chunks: [],
                    version: version
                };
                while(stream.available() >= 4){
                    var mode = stream.readBits(4);
                    if (mode === ModeByte1.Terminator) return result;
                    else if (mode === ModeByte1.ECI) {
                        if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(7)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(14)
                        });
                        else if (stream.readBits(1) === 0) result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: stream.readBits(21)
                        });
                        else // ECI data seems corrupted
                        result.chunks.push({
                            type: Mode1.ECI,
                            assignmentNumber: -1
                        });
                    } else if (mode === ModeByte1.Numeric) {
                        var numericResult = decodeNumeric(stream, size);
                        result.text += numericResult.text;
                        (_a = result.bytes).push.apply(_a, numericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Numeric,
                            text: numericResult.text
                        });
                    } else if (mode === ModeByte1.Alphanumeric) {
                        var alphanumericResult = decodeAlphanumeric(stream, size);
                        result.text += alphanumericResult.text;
                        (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
                        result.chunks.push({
                            type: Mode1.Alphanumeric,
                            text: alphanumericResult.text
                        });
                    } else if (mode === ModeByte1.Byte) {
                        var byteResult = decodeByte(stream, size);
                        result.text += byteResult.text;
                        (_c = result.bytes).push.apply(_c, byteResult.bytes);
                        result.chunks.push({
                            type: Mode1.Byte,
                            bytes: byteResult.bytes,
                            text: byteResult.text
                        });
                    } else if (mode === ModeByte1.Kanji) {
                        var kanjiResult = decodeKanji(stream, size);
                        result.text += kanjiResult.text;
                        (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
                        result.chunks.push({
                            type: Mode1.Kanji,
                            bytes: kanjiResult.bytes,
                            text: kanjiResult.text
                        });
                    }
                }
                // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
                if (stream.available() === 0 || stream.readBits(stream.available()) === 0) return result;
            }
            exports.decode = decode;
        /***/ },
        /* 7 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            // tslint:disable:no-bitwise
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitStream1 = /** @class */ function() {
                function BitStream(bytes) {
                    this.byteOffset = 0;
                    this.bitOffset = 0;
                    this.bytes = bytes;
                }
                BitStream.prototype.readBits = function(numBits) {
                    if (numBits < 1 || numBits > 32 || numBits > this.available()) throw new Error("Cannot read " + numBits.toString() + " bits");
                    var result = 0;
                    // First, read remainder from current byte
                    if (this.bitOffset > 0) {
                        var bitsLeft = 8 - this.bitOffset;
                        var toRead = numBits < bitsLeft ? numBits : bitsLeft;
                        var bitsToNotRead = bitsLeft - toRead;
                        var mask = 0xFF >> 8 - toRead << bitsToNotRead;
                        result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                        numBits -= toRead;
                        this.bitOffset += toRead;
                        if (this.bitOffset === 8) {
                            this.bitOffset = 0;
                            this.byteOffset++;
                        }
                    }
                    // Next read whole bytes
                    if (numBits > 0) {
                        while(numBits >= 8){
                            result = result << 8 | this.bytes[this.byteOffset] & 0xFF;
                            this.byteOffset++;
                            numBits -= 8;
                        }
                        // Finally read a partial byte
                        if (numBits > 0) {
                            var bitsToNotRead = 8 - numBits;
                            var mask = 0xFF >> bitsToNotRead << bitsToNotRead;
                            result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
                            this.bitOffset += numBits;
                        }
                    }
                    return result;
                };
                BitStream.prototype.available = function() {
                    return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
                };
                return BitStream;
            }();
            exports.BitStream = BitStream1;
        /***/ },
        /* 8 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shiftJISTable = {
                0x20: 0x0020,
                0x21: 0x0021,
                0x22: 0x0022,
                0x23: 0x0023,
                0x24: 0x0024,
                0x25: 0x0025,
                0x26: 0x0026,
                0x27: 0x0027,
                0x28: 0x0028,
                0x29: 0x0029,
                0x2A: 0x002A,
                0x2B: 0x002B,
                0x2C: 0x002C,
                0x2D: 0x002D,
                0x2E: 0x002E,
                0x2F: 0x002F,
                0x30: 0x0030,
                0x31: 0x0031,
                0x32: 0x0032,
                0x33: 0x0033,
                0x34: 0x0034,
                0x35: 0x0035,
                0x36: 0x0036,
                0x37: 0x0037,
                0x38: 0x0038,
                0x39: 0x0039,
                0x3A: 0x003A,
                0x3B: 0x003B,
                0x3C: 0x003C,
                0x3D: 0x003D,
                0x3E: 0x003E,
                0x3F: 0x003F,
                0x40: 0x0040,
                0x41: 0x0041,
                0x42: 0x0042,
                0x43: 0x0043,
                0x44: 0x0044,
                0x45: 0x0045,
                0x46: 0x0046,
                0x47: 0x0047,
                0x48: 0x0048,
                0x49: 0x0049,
                0x4A: 0x004A,
                0x4B: 0x004B,
                0x4C: 0x004C,
                0x4D: 0x004D,
                0x4E: 0x004E,
                0x4F: 0x004F,
                0x50: 0x0050,
                0x51: 0x0051,
                0x52: 0x0052,
                0x53: 0x0053,
                0x54: 0x0054,
                0x55: 0x0055,
                0x56: 0x0056,
                0x57: 0x0057,
                0x58: 0x0058,
                0x59: 0x0059,
                0x5A: 0x005A,
                0x5B: 0x005B,
                0x5C: 0x00A5,
                0x5D: 0x005D,
                0x5E: 0x005E,
                0x5F: 0x005F,
                0x60: 0x0060,
                0x61: 0x0061,
                0x62: 0x0062,
                0x63: 0x0063,
                0x64: 0x0064,
                0x65: 0x0065,
                0x66: 0x0066,
                0x67: 0x0067,
                0x68: 0x0068,
                0x69: 0x0069,
                0x6A: 0x006A,
                0x6B: 0x006B,
                0x6C: 0x006C,
                0x6D: 0x006D,
                0x6E: 0x006E,
                0x6F: 0x006F,
                0x70: 0x0070,
                0x71: 0x0071,
                0x72: 0x0072,
                0x73: 0x0073,
                0x74: 0x0074,
                0x75: 0x0075,
                0x76: 0x0076,
                0x77: 0x0077,
                0x78: 0x0078,
                0x79: 0x0079,
                0x7A: 0x007A,
                0x7B: 0x007B,
                0x7C: 0x007C,
                0x7D: 0x007D,
                0x7E: 0x203E,
                0x8140: 0x3000,
                0x8141: 0x3001,
                0x8142: 0x3002,
                0x8143: 0xFF0C,
                0x8144: 0xFF0E,
                0x8145: 0x30FB,
                0x8146: 0xFF1A,
                0x8147: 0xFF1B,
                0x8148: 0xFF1F,
                0x8149: 0xFF01,
                0x814A: 0x309B,
                0x814B: 0x309C,
                0x814C: 0x00B4,
                0x814D: 0xFF40,
                0x814E: 0x00A8,
                0x814F: 0xFF3E,
                0x8150: 0xFFE3,
                0x8151: 0xFF3F,
                0x8152: 0x30FD,
                0x8153: 0x30FE,
                0x8154: 0x309D,
                0x8155: 0x309E,
                0x8156: 0x3003,
                0x8157: 0x4EDD,
                0x8158: 0x3005,
                0x8159: 0x3006,
                0x815A: 0x3007,
                0x815B: 0x30FC,
                0x815C: 0x2015,
                0x815D: 0x2010,
                0x815E: 0xFF0F,
                0x815F: 0x005C,
                0x8160: 0x301C,
                0x8161: 0x2016,
                0x8162: 0xFF5C,
                0x8163: 0x2026,
                0x8164: 0x2025,
                0x8165: 0x2018,
                0x8166: 0x2019,
                0x8167: 0x201C,
                0x8168: 0x201D,
                0x8169: 0xFF08,
                0x816A: 0xFF09,
                0x816B: 0x3014,
                0x816C: 0x3015,
                0x816D: 0xFF3B,
                0x816E: 0xFF3D,
                0x816F: 0xFF5B,
                0x8170: 0xFF5D,
                0x8171: 0x3008,
                0x8172: 0x3009,
                0x8173: 0x300A,
                0x8174: 0x300B,
                0x8175: 0x300C,
                0x8176: 0x300D,
                0x8177: 0x300E,
                0x8178: 0x300F,
                0x8179: 0x3010,
                0x817A: 0x3011,
                0x817B: 0xFF0B,
                0x817C: 0x2212,
                0x817D: 0x00B1,
                0x817E: 0x00D7,
                0x8180: 0x00F7,
                0x8181: 0xFF1D,
                0x8182: 0x2260,
                0x8183: 0xFF1C,
                0x8184: 0xFF1E,
                0x8185: 0x2266,
                0x8186: 0x2267,
                0x8187: 0x221E,
                0x8188: 0x2234,
                0x8189: 0x2642,
                0x818A: 0x2640,
                0x818B: 0x00B0,
                0x818C: 0x2032,
                0x818D: 0x2033,
                0x818E: 0x2103,
                0x818F: 0xFFE5,
                0x8190: 0xFF04,
                0x8191: 0x00A2,
                0x8192: 0x00A3,
                0x8193: 0xFF05,
                0x8194: 0xFF03,
                0x8195: 0xFF06,
                0x8196: 0xFF0A,
                0x8197: 0xFF20,
                0x8198: 0x00A7,
                0x8199: 0x2606,
                0x819A: 0x2605,
                0x819B: 0x25CB,
                0x819C: 0x25CF,
                0x819D: 0x25CE,
                0x819E: 0x25C7,
                0x819F: 0x25C6,
                0x81A0: 0x25A1,
                0x81A1: 0x25A0,
                0x81A2: 0x25B3,
                0x81A3: 0x25B2,
                0x81A4: 0x25BD,
                0x81A5: 0x25BC,
                0x81A6: 0x203B,
                0x81A7: 0x3012,
                0x81A8: 0x2192,
                0x81A9: 0x2190,
                0x81AA: 0x2191,
                0x81AB: 0x2193,
                0x81AC: 0x3013,
                0x81B8: 0x2208,
                0x81B9: 0x220B,
                0x81BA: 0x2286,
                0x81BB: 0x2287,
                0x81BC: 0x2282,
                0x81BD: 0x2283,
                0x81BE: 0x222A,
                0x81BF: 0x2229,
                0x81C8: 0x2227,
                0x81C9: 0x2228,
                0x81CA: 0x00AC,
                0x81CB: 0x21D2,
                0x81CC: 0x21D4,
                0x81CD: 0x2200,
                0x81CE: 0x2203,
                0x81DA: 0x2220,
                0x81DB: 0x22A5,
                0x81DC: 0x2312,
                0x81DD: 0x2202,
                0x81DE: 0x2207,
                0x81DF: 0x2261,
                0x81E0: 0x2252,
                0x81E1: 0x226A,
                0x81E2: 0x226B,
                0x81E3: 0x221A,
                0x81E4: 0x223D,
                0x81E5: 0x221D,
                0x81E6: 0x2235,
                0x81E7: 0x222B,
                0x81E8: 0x222C,
                0x81F0: 0x212B,
                0x81F1: 0x2030,
                0x81F2: 0x266F,
                0x81F3: 0x266D,
                0x81F4: 0x266A,
                0x81F5: 0x2020,
                0x81F6: 0x2021,
                0x81F7: 0x00B6,
                0x81FC: 0x25EF,
                0x824F: 0xFF10,
                0x8250: 0xFF11,
                0x8251: 0xFF12,
                0x8252: 0xFF13,
                0x8253: 0xFF14,
                0x8254: 0xFF15,
                0x8255: 0xFF16,
                0x8256: 0xFF17,
                0x8257: 0xFF18,
                0x8258: 0xFF19,
                0x8260: 0xFF21,
                0x8261: 0xFF22,
                0x8262: 0xFF23,
                0x8263: 0xFF24,
                0x8264: 0xFF25,
                0x8265: 0xFF26,
                0x8266: 0xFF27,
                0x8267: 0xFF28,
                0x8268: 0xFF29,
                0x8269: 0xFF2A,
                0x826A: 0xFF2B,
                0x826B: 0xFF2C,
                0x826C: 0xFF2D,
                0x826D: 0xFF2E,
                0x826E: 0xFF2F,
                0x826F: 0xFF30,
                0x8270: 0xFF31,
                0x8271: 0xFF32,
                0x8272: 0xFF33,
                0x8273: 0xFF34,
                0x8274: 0xFF35,
                0x8275: 0xFF36,
                0x8276: 0xFF37,
                0x8277: 0xFF38,
                0x8278: 0xFF39,
                0x8279: 0xFF3A,
                0x8281: 0xFF41,
                0x8282: 0xFF42,
                0x8283: 0xFF43,
                0x8284: 0xFF44,
                0x8285: 0xFF45,
                0x8286: 0xFF46,
                0x8287: 0xFF47,
                0x8288: 0xFF48,
                0x8289: 0xFF49,
                0x828A: 0xFF4A,
                0x828B: 0xFF4B,
                0x828C: 0xFF4C,
                0x828D: 0xFF4D,
                0x828E: 0xFF4E,
                0x828F: 0xFF4F,
                0x8290: 0xFF50,
                0x8291: 0xFF51,
                0x8292: 0xFF52,
                0x8293: 0xFF53,
                0x8294: 0xFF54,
                0x8295: 0xFF55,
                0x8296: 0xFF56,
                0x8297: 0xFF57,
                0x8298: 0xFF58,
                0x8299: 0xFF59,
                0x829A: 0xFF5A,
                0x829F: 0x3041,
                0x82A0: 0x3042,
                0x82A1: 0x3043,
                0x82A2: 0x3044,
                0x82A3: 0x3045,
                0x82A4: 0x3046,
                0x82A5: 0x3047,
                0x82A6: 0x3048,
                0x82A7: 0x3049,
                0x82A8: 0x304A,
                0x82A9: 0x304B,
                0x82AA: 0x304C,
                0x82AB: 0x304D,
                0x82AC: 0x304E,
                0x82AD: 0x304F,
                0x82AE: 0x3050,
                0x82AF: 0x3051,
                0x82B0: 0x3052,
                0x82B1: 0x3053,
                0x82B2: 0x3054,
                0x82B3: 0x3055,
                0x82B4: 0x3056,
                0x82B5: 0x3057,
                0x82B6: 0x3058,
                0x82B7: 0x3059,
                0x82B8: 0x305A,
                0x82B9: 0x305B,
                0x82BA: 0x305C,
                0x82BB: 0x305D,
                0x82BC: 0x305E,
                0x82BD: 0x305F,
                0x82BE: 0x3060,
                0x82BF: 0x3061,
                0x82C0: 0x3062,
                0x82C1: 0x3063,
                0x82C2: 0x3064,
                0x82C3: 0x3065,
                0x82C4: 0x3066,
                0x82C5: 0x3067,
                0x82C6: 0x3068,
                0x82C7: 0x3069,
                0x82C8: 0x306A,
                0x82C9: 0x306B,
                0x82CA: 0x306C,
                0x82CB: 0x306D,
                0x82CC: 0x306E,
                0x82CD: 0x306F,
                0x82CE: 0x3070,
                0x82CF: 0x3071,
                0x82D0: 0x3072,
                0x82D1: 0x3073,
                0x82D2: 0x3074,
                0x82D3: 0x3075,
                0x82D4: 0x3076,
                0x82D5: 0x3077,
                0x82D6: 0x3078,
                0x82D7: 0x3079,
                0x82D8: 0x307A,
                0x82D9: 0x307B,
                0x82DA: 0x307C,
                0x82DB: 0x307D,
                0x82DC: 0x307E,
                0x82DD: 0x307F,
                0x82DE: 0x3080,
                0x82DF: 0x3081,
                0x82E0: 0x3082,
                0x82E1: 0x3083,
                0x82E2: 0x3084,
                0x82E3: 0x3085,
                0x82E4: 0x3086,
                0x82E5: 0x3087,
                0x82E6: 0x3088,
                0x82E7: 0x3089,
                0x82E8: 0x308A,
                0x82E9: 0x308B,
                0x82EA: 0x308C,
                0x82EB: 0x308D,
                0x82EC: 0x308E,
                0x82ED: 0x308F,
                0x82EE: 0x3090,
                0x82EF: 0x3091,
                0x82F0: 0x3092,
                0x82F1: 0x3093,
                0x8340: 0x30A1,
                0x8341: 0x30A2,
                0x8342: 0x30A3,
                0x8343: 0x30A4,
                0x8344: 0x30A5,
                0x8345: 0x30A6,
                0x8346: 0x30A7,
                0x8347: 0x30A8,
                0x8348: 0x30A9,
                0x8349: 0x30AA,
                0x834A: 0x30AB,
                0x834B: 0x30AC,
                0x834C: 0x30AD,
                0x834D: 0x30AE,
                0x834E: 0x30AF,
                0x834F: 0x30B0,
                0x8350: 0x30B1,
                0x8351: 0x30B2,
                0x8352: 0x30B3,
                0x8353: 0x30B4,
                0x8354: 0x30B5,
                0x8355: 0x30B6,
                0x8356: 0x30B7,
                0x8357: 0x30B8,
                0x8358: 0x30B9,
                0x8359: 0x30BA,
                0x835A: 0x30BB,
                0x835B: 0x30BC,
                0x835C: 0x30BD,
                0x835D: 0x30BE,
                0x835E: 0x30BF,
                0x835F: 0x30C0,
                0x8360: 0x30C1,
                0x8361: 0x30C2,
                0x8362: 0x30C3,
                0x8363: 0x30C4,
                0x8364: 0x30C5,
                0x8365: 0x30C6,
                0x8366: 0x30C7,
                0x8367: 0x30C8,
                0x8368: 0x30C9,
                0x8369: 0x30CA,
                0x836A: 0x30CB,
                0x836B: 0x30CC,
                0x836C: 0x30CD,
                0x836D: 0x30CE,
                0x836E: 0x30CF,
                0x836F: 0x30D0,
                0x8370: 0x30D1,
                0x8371: 0x30D2,
                0x8372: 0x30D3,
                0x8373: 0x30D4,
                0x8374: 0x30D5,
                0x8375: 0x30D6,
                0x8376: 0x30D7,
                0x8377: 0x30D8,
                0x8378: 0x30D9,
                0x8379: 0x30DA,
                0x837A: 0x30DB,
                0x837B: 0x30DC,
                0x837C: 0x30DD,
                0x837D: 0x30DE,
                0x837E: 0x30DF,
                0x8380: 0x30E0,
                0x8381: 0x30E1,
                0x8382: 0x30E2,
                0x8383: 0x30E3,
                0x8384: 0x30E4,
                0x8385: 0x30E5,
                0x8386: 0x30E6,
                0x8387: 0x30E7,
                0x8388: 0x30E8,
                0x8389: 0x30E9,
                0x838A: 0x30EA,
                0x838B: 0x30EB,
                0x838C: 0x30EC,
                0x838D: 0x30ED,
                0x838E: 0x30EE,
                0x838F: 0x30EF,
                0x8390: 0x30F0,
                0x8391: 0x30F1,
                0x8392: 0x30F2,
                0x8393: 0x30F3,
                0x8394: 0x30F4,
                0x8395: 0x30F5,
                0x8396: 0x30F6,
                0x839F: 0x0391,
                0x83A0: 0x0392,
                0x83A1: 0x0393,
                0x83A2: 0x0394,
                0x83A3: 0x0395,
                0x83A4: 0x0396,
                0x83A5: 0x0397,
                0x83A6: 0x0398,
                0x83A7: 0x0399,
                0x83A8: 0x039A,
                0x83A9: 0x039B,
                0x83AA: 0x039C,
                0x83AB: 0x039D,
                0x83AC: 0x039E,
                0x83AD: 0x039F,
                0x83AE: 0x03A0,
                0x83AF: 0x03A1,
                0x83B0: 0x03A3,
                0x83B1: 0x03A4,
                0x83B2: 0x03A5,
                0x83B3: 0x03A6,
                0x83B4: 0x03A7,
                0x83B5: 0x03A8,
                0x83B6: 0x03A9,
                0x83BF: 0x03B1,
                0x83C0: 0x03B2,
                0x83C1: 0x03B3,
                0x83C2: 0x03B4,
                0x83C3: 0x03B5,
                0x83C4: 0x03B6,
                0x83C5: 0x03B7,
                0x83C6: 0x03B8,
                0x83C7: 0x03B9,
                0x83C8: 0x03BA,
                0x83C9: 0x03BB,
                0x83CA: 0x03BC,
                0x83CB: 0x03BD,
                0x83CC: 0x03BE,
                0x83CD: 0x03BF,
                0x83CE: 0x03C0,
                0x83CF: 0x03C1,
                0x83D0: 0x03C3,
                0x83D1: 0x03C4,
                0x83D2: 0x03C5,
                0x83D3: 0x03C6,
                0x83D4: 0x03C7,
                0x83D5: 0x03C8,
                0x83D6: 0x03C9,
                0x8440: 0x0410,
                0x8441: 0x0411,
                0x8442: 0x0412,
                0x8443: 0x0413,
                0x8444: 0x0414,
                0x8445: 0x0415,
                0x8446: 0x0401,
                0x8447: 0x0416,
                0x8448: 0x0417,
                0x8449: 0x0418,
                0x844A: 0x0419,
                0x844B: 0x041A,
                0x844C: 0x041B,
                0x844D: 0x041C,
                0x844E: 0x041D,
                0x844F: 0x041E,
                0x8450: 0x041F,
                0x8451: 0x0420,
                0x8452: 0x0421,
                0x8453: 0x0422,
                0x8454: 0x0423,
                0x8455: 0x0424,
                0x8456: 0x0425,
                0x8457: 0x0426,
                0x8458: 0x0427,
                0x8459: 0x0428,
                0x845A: 0x0429,
                0x845B: 0x042A,
                0x845C: 0x042B,
                0x845D: 0x042C,
                0x845E: 0x042D,
                0x845F: 0x042E,
                0x8460: 0x042F,
                0x8470: 0x0430,
                0x8471: 0x0431,
                0x8472: 0x0432,
                0x8473: 0x0433,
                0x8474: 0x0434,
                0x8475: 0x0435,
                0x8476: 0x0451,
                0x8477: 0x0436,
                0x8478: 0x0437,
                0x8479: 0x0438,
                0x847A: 0x0439,
                0x847B: 0x043A,
                0x847C: 0x043B,
                0x847D: 0x043C,
                0x847E: 0x043D,
                0x8480: 0x043E,
                0x8481: 0x043F,
                0x8482: 0x0440,
                0x8483: 0x0441,
                0x8484: 0x0442,
                0x8485: 0x0443,
                0x8486: 0x0444,
                0x8487: 0x0445,
                0x8488: 0x0446,
                0x8489: 0x0447,
                0x848A: 0x0448,
                0x848B: 0x0449,
                0x848C: 0x044A,
                0x848D: 0x044B,
                0x848E: 0x044C,
                0x848F: 0x044D,
                0x8490: 0x044E,
                0x8491: 0x044F,
                0x849F: 0x2500,
                0x84A0: 0x2502,
                0x84A1: 0x250C,
                0x84A2: 0x2510,
                0x84A3: 0x2518,
                0x84A4: 0x2514,
                0x84A5: 0x251C,
                0x84A6: 0x252C,
                0x84A7: 0x2524,
                0x84A8: 0x2534,
                0x84A9: 0x253C,
                0x84AA: 0x2501,
                0x84AB: 0x2503,
                0x84AC: 0x250F,
                0x84AD: 0x2513,
                0x84AE: 0x251B,
                0x84AF: 0x2517,
                0x84B0: 0x2523,
                0x84B1: 0x2533,
                0x84B2: 0x252B,
                0x84B3: 0x253B,
                0x84B4: 0x254B,
                0x84B5: 0x2520,
                0x84B6: 0x252F,
                0x84B7: 0x2528,
                0x84B8: 0x2537,
                0x84B9: 0x253F,
                0x84BA: 0x251D,
                0x84BB: 0x2530,
                0x84BC: 0x2525,
                0x84BD: 0x2538,
                0x84BE: 0x2542,
                0x889F: 0x4E9C,
                0x88A0: 0x5516,
                0x88A1: 0x5A03,
                0x88A2: 0x963F,
                0x88A3: 0x54C0,
                0x88A4: 0x611B,
                0x88A5: 0x6328,
                0x88A6: 0x59F6,
                0x88A7: 0x9022,
                0x88A8: 0x8475,
                0x88A9: 0x831C,
                0x88AA: 0x7A50,
                0x88AB: 0x60AA,
                0x88AC: 0x63E1,
                0x88AD: 0x6E25,
                0x88AE: 0x65ED,
                0x88AF: 0x8466,
                0x88B0: 0x82A6,
                0x88B1: 0x9BF5,
                0x88B2: 0x6893,
                0x88B3: 0x5727,
                0x88B4: 0x65A1,
                0x88B5: 0x6271,
                0x88B6: 0x5B9B,
                0x88B7: 0x59D0,
                0x88B8: 0x867B,
                0x88B9: 0x98F4,
                0x88BA: 0x7D62,
                0x88BB: 0x7DBE,
                0x88BC: 0x9B8E,
                0x88BD: 0x6216,
                0x88BE: 0x7C9F,
                0x88BF: 0x88B7,
                0x88C0: 0x5B89,
                0x88C1: 0x5EB5,
                0x88C2: 0x6309,
                0x88C3: 0x6697,
                0x88C4: 0x6848,
                0x88C5: 0x95C7,
                0x88C6: 0x978D,
                0x88C7: 0x674F,
                0x88C8: 0x4EE5,
                0x88C9: 0x4F0A,
                0x88CA: 0x4F4D,
                0x88CB: 0x4F9D,
                0x88CC: 0x5049,
                0x88CD: 0x56F2,
                0x88CE: 0x5937,
                0x88CF: 0x59D4,
                0x88D0: 0x5A01,
                0x88D1: 0x5C09,
                0x88D2: 0x60DF,
                0x88D3: 0x610F,
                0x88D4: 0x6170,
                0x88D5: 0x6613,
                0x88D6: 0x6905,
                0x88D7: 0x70BA,
                0x88D8: 0x754F,
                0x88D9: 0x7570,
                0x88DA: 0x79FB,
                0x88DB: 0x7DAD,
                0x88DC: 0x7DEF,
                0x88DD: 0x80C3,
                0x88DE: 0x840E,
                0x88DF: 0x8863,
                0x88E0: 0x8B02,
                0x88E1: 0x9055,
                0x88E2: 0x907A,
                0x88E3: 0x533B,
                0x88E4: 0x4E95,
                0x88E5: 0x4EA5,
                0x88E6: 0x57DF,
                0x88E7: 0x80B2,
                0x88E8: 0x90C1,
                0x88E9: 0x78EF,
                0x88EA: 0x4E00,
                0x88EB: 0x58F1,
                0x88EC: 0x6EA2,
                0x88ED: 0x9038,
                0x88EE: 0x7A32,
                0x88EF: 0x8328,
                0x88F0: 0x828B,
                0x88F1: 0x9C2F,
                0x88F2: 0x5141,
                0x88F3: 0x5370,
                0x88F4: 0x54BD,
                0x88F5: 0x54E1,
                0x88F6: 0x56E0,
                0x88F7: 0x59FB,
                0x88F8: 0x5F15,
                0x88F9: 0x98F2,
                0x88FA: 0x6DEB,
                0x88FB: 0x80E4,
                0x88FC: 0x852D,
                0x8940: 0x9662,
                0x8941: 0x9670,
                0x8942: 0x96A0,
                0x8943: 0x97FB,
                0x8944: 0x540B,
                0x8945: 0x53F3,
                0x8946: 0x5B87,
                0x8947: 0x70CF,
                0x8948: 0x7FBD,
                0x8949: 0x8FC2,
                0x894A: 0x96E8,
                0x894B: 0x536F,
                0x894C: 0x9D5C,
                0x894D: 0x7ABA,
                0x894E: 0x4E11,
                0x894F: 0x7893,
                0x8950: 0x81FC,
                0x8951: 0x6E26,
                0x8952: 0x5618,
                0x8953: 0x5504,
                0x8954: 0x6B1D,
                0x8955: 0x851A,
                0x8956: 0x9C3B,
                0x8957: 0x59E5,
                0x8958: 0x53A9,
                0x8959: 0x6D66,
                0x895A: 0x74DC,
                0x895B: 0x958F,
                0x895C: 0x5642,
                0x895D: 0x4E91,
                0x895E: 0x904B,
                0x895F: 0x96F2,
                0x8960: 0x834F,
                0x8961: 0x990C,
                0x8962: 0x53E1,
                0x8963: 0x55B6,
                0x8964: 0x5B30,
                0x8965: 0x5F71,
                0x8966: 0x6620,
                0x8967: 0x66F3,
                0x8968: 0x6804,
                0x8969: 0x6C38,
                0x896A: 0x6CF3,
                0x896B: 0x6D29,
                0x896C: 0x745B,
                0x896D: 0x76C8,
                0x896E: 0x7A4E,
                0x896F: 0x9834,
                0x8970: 0x82F1,
                0x8971: 0x885B,
                0x8972: 0x8A60,
                0x8973: 0x92ED,
                0x8974: 0x6DB2,
                0x8975: 0x75AB,
                0x8976: 0x76CA,
                0x8977: 0x99C5,
                0x8978: 0x60A6,
                0x8979: 0x8B01,
                0x897A: 0x8D8A,
                0x897B: 0x95B2,
                0x897C: 0x698E,
                0x897D: 0x53AD,
                0x897E: 0x5186,
                0x8980: 0x5712,
                0x8981: 0x5830,
                0x8982: 0x5944,
                0x8983: 0x5BB4,
                0x8984: 0x5EF6,
                0x8985: 0x6028,
                0x8986: 0x63A9,
                0x8987: 0x63F4,
                0x8988: 0x6CBF,
                0x8989: 0x6F14,
                0x898A: 0x708E,
                0x898B: 0x7114,
                0x898C: 0x7159,
                0x898D: 0x71D5,
                0x898E: 0x733F,
                0x898F: 0x7E01,
                0x8990: 0x8276,
                0x8991: 0x82D1,
                0x8992: 0x8597,
                0x8993: 0x9060,
                0x8994: 0x925B,
                0x8995: 0x9D1B,
                0x8996: 0x5869,
                0x8997: 0x65BC,
                0x8998: 0x6C5A,
                0x8999: 0x7525,
                0x899A: 0x51F9,
                0x899B: 0x592E,
                0x899C: 0x5965,
                0x899D: 0x5F80,
                0x899E: 0x5FDC,
                0x899F: 0x62BC,
                0x89A0: 0x65FA,
                0x89A1: 0x6A2A,
                0x89A2: 0x6B27,
                0x89A3: 0x6BB4,
                0x89A4: 0x738B,
                0x89A5: 0x7FC1,
                0x89A6: 0x8956,
                0x89A7: 0x9D2C,
                0x89A8: 0x9D0E,
                0x89A9: 0x9EC4,
                0x89AA: 0x5CA1,
                0x89AB: 0x6C96,
                0x89AC: 0x837B,
                0x89AD: 0x5104,
                0x89AE: 0x5C4B,
                0x89AF: 0x61B6,
                0x89B0: 0x81C6,
                0x89B1: 0x6876,
                0x89B2: 0x7261,
                0x89B3: 0x4E59,
                0x89B4: 0x4FFA,
                0x89B5: 0x5378,
                0x89B6: 0x6069,
                0x89B7: 0x6E29,
                0x89B8: 0x7A4F,
                0x89B9: 0x97F3,
                0x89BA: 0x4E0B,
                0x89BB: 0x5316,
                0x89BC: 0x4EEE,
                0x89BD: 0x4F55,
                0x89BE: 0x4F3D,
                0x89BF: 0x4FA1,
                0x89C0: 0x4F73,
                0x89C1: 0x52A0,
                0x89C2: 0x53EF,
                0x89C3: 0x5609,
                0x89C4: 0x590F,
                0x89C5: 0x5AC1,
                0x89C6: 0x5BB6,
                0x89C7: 0x5BE1,
                0x89C8: 0x79D1,
                0x89C9: 0x6687,
                0x89CA: 0x679C,
                0x89CB: 0x67B6,
                0x89CC: 0x6B4C,
                0x89CD: 0x6CB3,
                0x89CE: 0x706B,
                0x89CF: 0x73C2,
                0x89D0: 0x798D,
                0x89D1: 0x79BE,
                0x89D2: 0x7A3C,
                0x89D3: 0x7B87,
                0x89D4: 0x82B1,
                0x89D5: 0x82DB,
                0x89D6: 0x8304,
                0x89D7: 0x8377,
                0x89D8: 0x83EF,
                0x89D9: 0x83D3,
                0x89DA: 0x8766,
                0x89DB: 0x8AB2,
                0x89DC: 0x5629,
                0x89DD: 0x8CA8,
                0x89DE: 0x8FE6,
                0x89DF: 0x904E,
                0x89E0: 0x971E,
                0x89E1: 0x868A,
                0x89E2: 0x4FC4,
                0x89E3: 0x5CE8,
                0x89E4: 0x6211,
                0x89E5: 0x7259,
                0x89E6: 0x753B,
                0x89E7: 0x81E5,
                0x89E8: 0x82BD,
                0x89E9: 0x86FE,
                0x89EA: 0x8CC0,
                0x89EB: 0x96C5,
                0x89EC: 0x9913,
                0x89ED: 0x99D5,
                0x89EE: 0x4ECB,
                0x89EF: 0x4F1A,
                0x89F0: 0x89E3,
                0x89F1: 0x56DE,
                0x89F2: 0x584A,
                0x89F3: 0x58CA,
                0x89F4: 0x5EFB,
                0x89F5: 0x5FEB,
                0x89F6: 0x602A,
                0x89F7: 0x6094,
                0x89F8: 0x6062,
                0x89F9: 0x61D0,
                0x89FA: 0x6212,
                0x89FB: 0x62D0,
                0x89FC: 0x6539,
                0x8A40: 0x9B41,
                0x8A41: 0x6666,
                0x8A42: 0x68B0,
                0x8A43: 0x6D77,
                0x8A44: 0x7070,
                0x8A45: 0x754C,
                0x8A46: 0x7686,
                0x8A47: 0x7D75,
                0x8A48: 0x82A5,
                0x8A49: 0x87F9,
                0x8A4A: 0x958B,
                0x8A4B: 0x968E,
                0x8A4C: 0x8C9D,
                0x8A4D: 0x51F1,
                0x8A4E: 0x52BE,
                0x8A4F: 0x5916,
                0x8A50: 0x54B3,
                0x8A51: 0x5BB3,
                0x8A52: 0x5D16,
                0x8A53: 0x6168,
                0x8A54: 0x6982,
                0x8A55: 0x6DAF,
                0x8A56: 0x788D,
                0x8A57: 0x84CB,
                0x8A58: 0x8857,
                0x8A59: 0x8A72,
                0x8A5A: 0x93A7,
                0x8A5B: 0x9AB8,
                0x8A5C: 0x6D6C,
                0x8A5D: 0x99A8,
                0x8A5E: 0x86D9,
                0x8A5F: 0x57A3,
                0x8A60: 0x67FF,
                0x8A61: 0x86CE,
                0x8A62: 0x920E,
                0x8A63: 0x5283,
                0x8A64: 0x5687,
                0x8A65: 0x5404,
                0x8A66: 0x5ED3,
                0x8A67: 0x62E1,
                0x8A68: 0x64B9,
                0x8A69: 0x683C,
                0x8A6A: 0x6838,
                0x8A6B: 0x6BBB,
                0x8A6C: 0x7372,
                0x8A6D: 0x78BA,
                0x8A6E: 0x7A6B,
                0x8A6F: 0x899A,
                0x8A70: 0x89D2,
                0x8A71: 0x8D6B,
                0x8A72: 0x8F03,
                0x8A73: 0x90ED,
                0x8A74: 0x95A3,
                0x8A75: 0x9694,
                0x8A76: 0x9769,
                0x8A77: 0x5B66,
                0x8A78: 0x5CB3,
                0x8A79: 0x697D,
                0x8A7A: 0x984D,
                0x8A7B: 0x984E,
                0x8A7C: 0x639B,
                0x8A7D: 0x7B20,
                0x8A7E: 0x6A2B,
                0x8A80: 0x6A7F,
                0x8A81: 0x68B6,
                0x8A82: 0x9C0D,
                0x8A83: 0x6F5F,
                0x8A84: 0x5272,
                0x8A85: 0x559D,
                0x8A86: 0x6070,
                0x8A87: 0x62EC,
                0x8A88: 0x6D3B,
                0x8A89: 0x6E07,
                0x8A8A: 0x6ED1,
                0x8A8B: 0x845B,
                0x8A8C: 0x8910,
                0x8A8D: 0x8F44,
                0x8A8E: 0x4E14,
                0x8A8F: 0x9C39,
                0x8A90: 0x53F6,
                0x8A91: 0x691B,
                0x8A92: 0x6A3A,
                0x8A93: 0x9784,
                0x8A94: 0x682A,
                0x8A95: 0x515C,
                0x8A96: 0x7AC3,
                0x8A97: 0x84B2,
                0x8A98: 0x91DC,
                0x8A99: 0x938C,
                0x8A9A: 0x565B,
                0x8A9B: 0x9D28,
                0x8A9C: 0x6822,
                0x8A9D: 0x8305,
                0x8A9E: 0x8431,
                0x8A9F: 0x7CA5,
                0x8AA0: 0x5208,
                0x8AA1: 0x82C5,
                0x8AA2: 0x74E6,
                0x8AA3: 0x4E7E,
                0x8AA4: 0x4F83,
                0x8AA5: 0x51A0,
                0x8AA6: 0x5BD2,
                0x8AA7: 0x520A,
                0x8AA8: 0x52D8,
                0x8AA9: 0x52E7,
                0x8AAA: 0x5DFB,
                0x8AAB: 0x559A,
                0x8AAC: 0x582A,
                0x8AAD: 0x59E6,
                0x8AAE: 0x5B8C,
                0x8AAF: 0x5B98,
                0x8AB0: 0x5BDB,
                0x8AB1: 0x5E72,
                0x8AB2: 0x5E79,
                0x8AB3: 0x60A3,
                0x8AB4: 0x611F,
                0x8AB5: 0x6163,
                0x8AB6: 0x61BE,
                0x8AB7: 0x63DB,
                0x8AB8: 0x6562,
                0x8AB9: 0x67D1,
                0x8ABA: 0x6853,
                0x8ABB: 0x68FA,
                0x8ABC: 0x6B3E,
                0x8ABD: 0x6B53,
                0x8ABE: 0x6C57,
                0x8ABF: 0x6F22,
                0x8AC0: 0x6F97,
                0x8AC1: 0x6F45,
                0x8AC2: 0x74B0,
                0x8AC3: 0x7518,
                0x8AC4: 0x76E3,
                0x8AC5: 0x770B,
                0x8AC6: 0x7AFF,
                0x8AC7: 0x7BA1,
                0x8AC8: 0x7C21,
                0x8AC9: 0x7DE9,
                0x8ACA: 0x7F36,
                0x8ACB: 0x7FF0,
                0x8ACC: 0x809D,
                0x8ACD: 0x8266,
                0x8ACE: 0x839E,
                0x8ACF: 0x89B3,
                0x8AD0: 0x8ACC,
                0x8AD1: 0x8CAB,
                0x8AD2: 0x9084,
                0x8AD3: 0x9451,
                0x8AD4: 0x9593,
                0x8AD5: 0x9591,
                0x8AD6: 0x95A2,
                0x8AD7: 0x9665,
                0x8AD8: 0x97D3,
                0x8AD9: 0x9928,
                0x8ADA: 0x8218,
                0x8ADB: 0x4E38,
                0x8ADC: 0x542B,
                0x8ADD: 0x5CB8,
                0x8ADE: 0x5DCC,
                0x8ADF: 0x73A9,
                0x8AE0: 0x764C,
                0x8AE1: 0x773C,
                0x8AE2: 0x5CA9,
                0x8AE3: 0x7FEB,
                0x8AE4: 0x8D0B,
                0x8AE5: 0x96C1,
                0x8AE6: 0x9811,
                0x8AE7: 0x9854,
                0x8AE8: 0x9858,
                0x8AE9: 0x4F01,
                0x8AEA: 0x4F0E,
                0x8AEB: 0x5371,
                0x8AEC: 0x559C,
                0x8AED: 0x5668,
                0x8AEE: 0x57FA,
                0x8AEF: 0x5947,
                0x8AF0: 0x5B09,
                0x8AF1: 0x5BC4,
                0x8AF2: 0x5C90,
                0x8AF3: 0x5E0C,
                0x8AF4: 0x5E7E,
                0x8AF5: 0x5FCC,
                0x8AF6: 0x63EE,
                0x8AF7: 0x673A,
                0x8AF8: 0x65D7,
                0x8AF9: 0x65E2,
                0x8AFA: 0x671F,
                0x8AFB: 0x68CB,
                0x8AFC: 0x68C4,
                0x8B40: 0x6A5F,
                0x8B41: 0x5E30,
                0x8B42: 0x6BC5,
                0x8B43: 0x6C17,
                0x8B44: 0x6C7D,
                0x8B45: 0x757F,
                0x8B46: 0x7948,
                0x8B47: 0x5B63,
                0x8B48: 0x7A00,
                0x8B49: 0x7D00,
                0x8B4A: 0x5FBD,
                0x8B4B: 0x898F,
                0x8B4C: 0x8A18,
                0x8B4D: 0x8CB4,
                0x8B4E: 0x8D77,
                0x8B4F: 0x8ECC,
                0x8B50: 0x8F1D,
                0x8B51: 0x98E2,
                0x8B52: 0x9A0E,
                0x8B53: 0x9B3C,
                0x8B54: 0x4E80,
                0x8B55: 0x507D,
                0x8B56: 0x5100,
                0x8B57: 0x5993,
                0x8B58: 0x5B9C,
                0x8B59: 0x622F,
                0x8B5A: 0x6280,
                0x8B5B: 0x64EC,
                0x8B5C: 0x6B3A,
                0x8B5D: 0x72A0,
                0x8B5E: 0x7591,
                0x8B5F: 0x7947,
                0x8B60: 0x7FA9,
                0x8B61: 0x87FB,
                0x8B62: 0x8ABC,
                0x8B63: 0x8B70,
                0x8B64: 0x63AC,
                0x8B65: 0x83CA,
                0x8B66: 0x97A0,
                0x8B67: 0x5409,
                0x8B68: 0x5403,
                0x8B69: 0x55AB,
                0x8B6A: 0x6854,
                0x8B6B: 0x6A58,
                0x8B6C: 0x8A70,
                0x8B6D: 0x7827,
                0x8B6E: 0x6775,
                0x8B6F: 0x9ECD,
                0x8B70: 0x5374,
                0x8B71: 0x5BA2,
                0x8B72: 0x811A,
                0x8B73: 0x8650,
                0x8B74: 0x9006,
                0x8B75: 0x4E18,
                0x8B76: 0x4E45,
                0x8B77: 0x4EC7,
                0x8B78: 0x4F11,
                0x8B79: 0x53CA,
                0x8B7A: 0x5438,
                0x8B7B: 0x5BAE,
                0x8B7C: 0x5F13,
                0x8B7D: 0x6025,
                0x8B7E: 0x6551,
                0x8B80: 0x673D,
                0x8B81: 0x6C42,
                0x8B82: 0x6C72,
                0x8B83: 0x6CE3,
                0x8B84: 0x7078,
                0x8B85: 0x7403,
                0x8B86: 0x7A76,
                0x8B87: 0x7AAE,
                0x8B88: 0x7B08,
                0x8B89: 0x7D1A,
                0x8B8A: 0x7CFE,
                0x8B8B: 0x7D66,
                0x8B8C: 0x65E7,
                0x8B8D: 0x725B,
                0x8B8E: 0x53BB,
                0x8B8F: 0x5C45,
                0x8B90: 0x5DE8,
                0x8B91: 0x62D2,
                0x8B92: 0x62E0,
                0x8B93: 0x6319,
                0x8B94: 0x6E20,
                0x8B95: 0x865A,
                0x8B96: 0x8A31,
                0x8B97: 0x8DDD,
                0x8B98: 0x92F8,
                0x8B99: 0x6F01,
                0x8B9A: 0x79A6,
                0x8B9B: 0x9B5A,
                0x8B9C: 0x4EA8,
                0x8B9D: 0x4EAB,
                0x8B9E: 0x4EAC,
                0x8B9F: 0x4F9B,
                0x8BA0: 0x4FA0,
                0x8BA1: 0x50D1,
                0x8BA2: 0x5147,
                0x8BA3: 0x7AF6,
                0x8BA4: 0x5171,
                0x8BA5: 0x51F6,
                0x8BA6: 0x5354,
                0x8BA7: 0x5321,
                0x8BA8: 0x537F,
                0x8BA9: 0x53EB,
                0x8BAA: 0x55AC,
                0x8BAB: 0x5883,
                0x8BAC: 0x5CE1,
                0x8BAD: 0x5F37,
                0x8BAE: 0x5F4A,
                0x8BAF: 0x602F,
                0x8BB0: 0x6050,
                0x8BB1: 0x606D,
                0x8BB2: 0x631F,
                0x8BB3: 0x6559,
                0x8BB4: 0x6A4B,
                0x8BB5: 0x6CC1,
                0x8BB6: 0x72C2,
                0x8BB7: 0x72ED,
                0x8BB8: 0x77EF,
                0x8BB9: 0x80F8,
                0x8BBA: 0x8105,
                0x8BBB: 0x8208,
                0x8BBC: 0x854E,
                0x8BBD: 0x90F7,
                0x8BBE: 0x93E1,
                0x8BBF: 0x97FF,
                0x8BC0: 0x9957,
                0x8BC1: 0x9A5A,
                0x8BC2: 0x4EF0,
                0x8BC3: 0x51DD,
                0x8BC4: 0x5C2D,
                0x8BC5: 0x6681,
                0x8BC6: 0x696D,
                0x8BC7: 0x5C40,
                0x8BC8: 0x66F2,
                0x8BC9: 0x6975,
                0x8BCA: 0x7389,
                0x8BCB: 0x6850,
                0x8BCC: 0x7C81,
                0x8BCD: 0x50C5,
                0x8BCE: 0x52E4,
                0x8BCF: 0x5747,
                0x8BD0: 0x5DFE,
                0x8BD1: 0x9326,
                0x8BD2: 0x65A4,
                0x8BD3: 0x6B23,
                0x8BD4: 0x6B3D,
                0x8BD5: 0x7434,
                0x8BD6: 0x7981,
                0x8BD7: 0x79BD,
                0x8BD8: 0x7B4B,
                0x8BD9: 0x7DCA,
                0x8BDA: 0x82B9,
                0x8BDB: 0x83CC,
                0x8BDC: 0x887F,
                0x8BDD: 0x895F,
                0x8BDE: 0x8B39,
                0x8BDF: 0x8FD1,
                0x8BE0: 0x91D1,
                0x8BE1: 0x541F,
                0x8BE2: 0x9280,
                0x8BE3: 0x4E5D,
                0x8BE4: 0x5036,
                0x8BE5: 0x53E5,
                0x8BE6: 0x533A,
                0x8BE7: 0x72D7,
                0x8BE8: 0x7396,
                0x8BE9: 0x77E9,
                0x8BEA: 0x82E6,
                0x8BEB: 0x8EAF,
                0x8BEC: 0x99C6,
                0x8BED: 0x99C8,
                0x8BEE: 0x99D2,
                0x8BEF: 0x5177,
                0x8BF0: 0x611A,
                0x8BF1: 0x865E,
                0x8BF2: 0x55B0,
                0x8BF3: 0x7A7A,
                0x8BF4: 0x5076,
                0x8BF5: 0x5BD3,
                0x8BF6: 0x9047,
                0x8BF7: 0x9685,
                0x8BF8: 0x4E32,
                0x8BF9: 0x6ADB,
                0x8BFA: 0x91E7,
                0x8BFB: 0x5C51,
                0x8BFC: 0x5C48,
                0x8C40: 0x6398,
                0x8C41: 0x7A9F,
                0x8C42: 0x6C93,
                0x8C43: 0x9774,
                0x8C44: 0x8F61,
                0x8C45: 0x7AAA,
                0x8C46: 0x718A,
                0x8C47: 0x9688,
                0x8C48: 0x7C82,
                0x8C49: 0x6817,
                0x8C4A: 0x7E70,
                0x8C4B: 0x6851,
                0x8C4C: 0x936C,
                0x8C4D: 0x52F2,
                0x8C4E: 0x541B,
                0x8C4F: 0x85AB,
                0x8C50: 0x8A13,
                0x8C51: 0x7FA4,
                0x8C52: 0x8ECD,
                0x8C53: 0x90E1,
                0x8C54: 0x5366,
                0x8C55: 0x8888,
                0x8C56: 0x7941,
                0x8C57: 0x4FC2,
                0x8C58: 0x50BE,
                0x8C59: 0x5211,
                0x8C5A: 0x5144,
                0x8C5B: 0x5553,
                0x8C5C: 0x572D,
                0x8C5D: 0x73EA,
                0x8C5E: 0x578B,
                0x8C5F: 0x5951,
                0x8C60: 0x5F62,
                0x8C61: 0x5F84,
                0x8C62: 0x6075,
                0x8C63: 0x6176,
                0x8C64: 0x6167,
                0x8C65: 0x61A9,
                0x8C66: 0x63B2,
                0x8C67: 0x643A,
                0x8C68: 0x656C,
                0x8C69: 0x666F,
                0x8C6A: 0x6842,
                0x8C6B: 0x6E13,
                0x8C6C: 0x7566,
                0x8C6D: 0x7A3D,
                0x8C6E: 0x7CFB,
                0x8C6F: 0x7D4C,
                0x8C70: 0x7D99,
                0x8C71: 0x7E4B,
                0x8C72: 0x7F6B,
                0x8C73: 0x830E,
                0x8C74: 0x834A,
                0x8C75: 0x86CD,
                0x8C76: 0x8A08,
                0x8C77: 0x8A63,
                0x8C78: 0x8B66,
                0x8C79: 0x8EFD,
                0x8C7A: 0x981A,
                0x8C7B: 0x9D8F,
                0x8C7C: 0x82B8,
                0x8C7D: 0x8FCE,
                0x8C7E: 0x9BE8,
                0x8C80: 0x5287,
                0x8C81: 0x621F,
                0x8C82: 0x6483,
                0x8C83: 0x6FC0,
                0x8C84: 0x9699,
                0x8C85: 0x6841,
                0x8C86: 0x5091,
                0x8C87: 0x6B20,
                0x8C88: 0x6C7A,
                0x8C89: 0x6F54,
                0x8C8A: 0x7A74,
                0x8C8B: 0x7D50,
                0x8C8C: 0x8840,
                0x8C8D: 0x8A23,
                0x8C8E: 0x6708,
                0x8C8F: 0x4EF6,
                0x8C90: 0x5039,
                0x8C91: 0x5026,
                0x8C92: 0x5065,
                0x8C93: 0x517C,
                0x8C94: 0x5238,
                0x8C95: 0x5263,
                0x8C96: 0x55A7,
                0x8C97: 0x570F,
                0x8C98: 0x5805,
                0x8C99: 0x5ACC,
                0x8C9A: 0x5EFA,
                0x8C9B: 0x61B2,
                0x8C9C: 0x61F8,
                0x8C9D: 0x62F3,
                0x8C9E: 0x6372,
                0x8C9F: 0x691C,
                0x8CA0: 0x6A29,
                0x8CA1: 0x727D,
                0x8CA2: 0x72AC,
                0x8CA3: 0x732E,
                0x8CA4: 0x7814,
                0x8CA5: 0x786F,
                0x8CA6: 0x7D79,
                0x8CA7: 0x770C,
                0x8CA8: 0x80A9,
                0x8CA9: 0x898B,
                0x8CAA: 0x8B19,
                0x8CAB: 0x8CE2,
                0x8CAC: 0x8ED2,
                0x8CAD: 0x9063,
                0x8CAE: 0x9375,
                0x8CAF: 0x967A,
                0x8CB0: 0x9855,
                0x8CB1: 0x9A13,
                0x8CB2: 0x9E78,
                0x8CB3: 0x5143,
                0x8CB4: 0x539F,
                0x8CB5: 0x53B3,
                0x8CB6: 0x5E7B,
                0x8CB7: 0x5F26,
                0x8CB8: 0x6E1B,
                0x8CB9: 0x6E90,
                0x8CBA: 0x7384,
                0x8CBB: 0x73FE,
                0x8CBC: 0x7D43,
                0x8CBD: 0x8237,
                0x8CBE: 0x8A00,
                0x8CBF: 0x8AFA,
                0x8CC0: 0x9650,
                0x8CC1: 0x4E4E,
                0x8CC2: 0x500B,
                0x8CC3: 0x53E4,
                0x8CC4: 0x547C,
                0x8CC5: 0x56FA,
                0x8CC6: 0x59D1,
                0x8CC7: 0x5B64,
                0x8CC8: 0x5DF1,
                0x8CC9: 0x5EAB,
                0x8CCA: 0x5F27,
                0x8CCB: 0x6238,
                0x8CCC: 0x6545,
                0x8CCD: 0x67AF,
                0x8CCE: 0x6E56,
                0x8CCF: 0x72D0,
                0x8CD0: 0x7CCA,
                0x8CD1: 0x88B4,
                0x8CD2: 0x80A1,
                0x8CD3: 0x80E1,
                0x8CD4: 0x83F0,
                0x8CD5: 0x864E,
                0x8CD6: 0x8A87,
                0x8CD7: 0x8DE8,
                0x8CD8: 0x9237,
                0x8CD9: 0x96C7,
                0x8CDA: 0x9867,
                0x8CDB: 0x9F13,
                0x8CDC: 0x4E94,
                0x8CDD: 0x4E92,
                0x8CDE: 0x4F0D,
                0x8CDF: 0x5348,
                0x8CE0: 0x5449,
                0x8CE1: 0x543E,
                0x8CE2: 0x5A2F,
                0x8CE3: 0x5F8C,
                0x8CE4: 0x5FA1,
                0x8CE5: 0x609F,
                0x8CE6: 0x68A7,
                0x8CE7: 0x6A8E,
                0x8CE8: 0x745A,
                0x8CE9: 0x7881,
                0x8CEA: 0x8A9E,
                0x8CEB: 0x8AA4,
                0x8CEC: 0x8B77,
                0x8CED: 0x9190,
                0x8CEE: 0x4E5E,
                0x8CEF: 0x9BC9,
                0x8CF0: 0x4EA4,
                0x8CF1: 0x4F7C,
                0x8CF2: 0x4FAF,
                0x8CF3: 0x5019,
                0x8CF4: 0x5016,
                0x8CF5: 0x5149,
                0x8CF6: 0x516C,
                0x8CF7: 0x529F,
                0x8CF8: 0x52B9,
                0x8CF9: 0x52FE,
                0x8CFA: 0x539A,
                0x8CFB: 0x53E3,
                0x8CFC: 0x5411,
                0x8D40: 0x540E,
                0x8D41: 0x5589,
                0x8D42: 0x5751,
                0x8D43: 0x57A2,
                0x8D44: 0x597D,
                0x8D45: 0x5B54,
                0x8D46: 0x5B5D,
                0x8D47: 0x5B8F,
                0x8D48: 0x5DE5,
                0x8D49: 0x5DE7,
                0x8D4A: 0x5DF7,
                0x8D4B: 0x5E78,
                0x8D4C: 0x5E83,
                0x8D4D: 0x5E9A,
                0x8D4E: 0x5EB7,
                0x8D4F: 0x5F18,
                0x8D50: 0x6052,
                0x8D51: 0x614C,
                0x8D52: 0x6297,
                0x8D53: 0x62D8,
                0x8D54: 0x63A7,
                0x8D55: 0x653B,
                0x8D56: 0x6602,
                0x8D57: 0x6643,
                0x8D58: 0x66F4,
                0x8D59: 0x676D,
                0x8D5A: 0x6821,
                0x8D5B: 0x6897,
                0x8D5C: 0x69CB,
                0x8D5D: 0x6C5F,
                0x8D5E: 0x6D2A,
                0x8D5F: 0x6D69,
                0x8D60: 0x6E2F,
                0x8D61: 0x6E9D,
                0x8D62: 0x7532,
                0x8D63: 0x7687,
                0x8D64: 0x786C,
                0x8D65: 0x7A3F,
                0x8D66: 0x7CE0,
                0x8D67: 0x7D05,
                0x8D68: 0x7D18,
                0x8D69: 0x7D5E,
                0x8D6A: 0x7DB1,
                0x8D6B: 0x8015,
                0x8D6C: 0x8003,
                0x8D6D: 0x80AF,
                0x8D6E: 0x80B1,
                0x8D6F: 0x8154,
                0x8D70: 0x818F,
                0x8D71: 0x822A,
                0x8D72: 0x8352,
                0x8D73: 0x884C,
                0x8D74: 0x8861,
                0x8D75: 0x8B1B,
                0x8D76: 0x8CA2,
                0x8D77: 0x8CFC,
                0x8D78: 0x90CA,
                0x8D79: 0x9175,
                0x8D7A: 0x9271,
                0x8D7B: 0x783F,
                0x8D7C: 0x92FC,
                0x8D7D: 0x95A4,
                0x8D7E: 0x964D,
                0x8D80: 0x9805,
                0x8D81: 0x9999,
                0x8D82: 0x9AD8,
                0x8D83: 0x9D3B,
                0x8D84: 0x525B,
                0x8D85: 0x52AB,
                0x8D86: 0x53F7,
                0x8D87: 0x5408,
                0x8D88: 0x58D5,
                0x8D89: 0x62F7,
                0x8D8A: 0x6FE0,
                0x8D8B: 0x8C6A,
                0x8D8C: 0x8F5F,
                0x8D8D: 0x9EB9,
                0x8D8E: 0x514B,
                0x8D8F: 0x523B,
                0x8D90: 0x544A,
                0x8D91: 0x56FD,
                0x8D92: 0x7A40,
                0x8D93: 0x9177,
                0x8D94: 0x9D60,
                0x8D95: 0x9ED2,
                0x8D96: 0x7344,
                0x8D97: 0x6F09,
                0x8D98: 0x8170,
                0x8D99: 0x7511,
                0x8D9A: 0x5FFD,
                0x8D9B: 0x60DA,
                0x8D9C: 0x9AA8,
                0x8D9D: 0x72DB,
                0x8D9E: 0x8FBC,
                0x8D9F: 0x6B64,
                0x8DA0: 0x9803,
                0x8DA1: 0x4ECA,
                0x8DA2: 0x56F0,
                0x8DA3: 0x5764,
                0x8DA4: 0x58BE,
                0x8DA5: 0x5A5A,
                0x8DA6: 0x6068,
                0x8DA7: 0x61C7,
                0x8DA8: 0x660F,
                0x8DA9: 0x6606,
                0x8DAA: 0x6839,
                0x8DAB: 0x68B1,
                0x8DAC: 0x6DF7,
                0x8DAD: 0x75D5,
                0x8DAE: 0x7D3A,
                0x8DAF: 0x826E,
                0x8DB0: 0x9B42,
                0x8DB1: 0x4E9B,
                0x8DB2: 0x4F50,
                0x8DB3: 0x53C9,
                0x8DB4: 0x5506,
                0x8DB5: 0x5D6F,
                0x8DB6: 0x5DE6,
                0x8DB7: 0x5DEE,
                0x8DB8: 0x67FB,
                0x8DB9: 0x6C99,
                0x8DBA: 0x7473,
                0x8DBB: 0x7802,
                0x8DBC: 0x8A50,
                0x8DBD: 0x9396,
                0x8DBE: 0x88DF,
                0x8DBF: 0x5750,
                0x8DC0: 0x5EA7,
                0x8DC1: 0x632B,
                0x8DC2: 0x50B5,
                0x8DC3: 0x50AC,
                0x8DC4: 0x518D,
                0x8DC5: 0x6700,
                0x8DC6: 0x54C9,
                0x8DC7: 0x585E,
                0x8DC8: 0x59BB,
                0x8DC9: 0x5BB0,
                0x8DCA: 0x5F69,
                0x8DCB: 0x624D,
                0x8DCC: 0x63A1,
                0x8DCD: 0x683D,
                0x8DCE: 0x6B73,
                0x8DCF: 0x6E08,
                0x8DD0: 0x707D,
                0x8DD1: 0x91C7,
                0x8DD2: 0x7280,
                0x8DD3: 0x7815,
                0x8DD4: 0x7826,
                0x8DD5: 0x796D,
                0x8DD6: 0x658E,
                0x8DD7: 0x7D30,
                0x8DD8: 0x83DC,
                0x8DD9: 0x88C1,
                0x8DDA: 0x8F09,
                0x8DDB: 0x969B,
                0x8DDC: 0x5264,
                0x8DDD: 0x5728,
                0x8DDE: 0x6750,
                0x8DDF: 0x7F6A,
                0x8DE0: 0x8CA1,
                0x8DE1: 0x51B4,
                0x8DE2: 0x5742,
                0x8DE3: 0x962A,
                0x8DE4: 0x583A,
                0x8DE5: 0x698A,
                0x8DE6: 0x80B4,
                0x8DE7: 0x54B2,
                0x8DE8: 0x5D0E,
                0x8DE9: 0x57FC,
                0x8DEA: 0x7895,
                0x8DEB: 0x9DFA,
                0x8DEC: 0x4F5C,
                0x8DED: 0x524A,
                0x8DEE: 0x548B,
                0x8DEF: 0x643E,
                0x8DF0: 0x6628,
                0x8DF1: 0x6714,
                0x8DF2: 0x67F5,
                0x8DF3: 0x7A84,
                0x8DF4: 0x7B56,
                0x8DF5: 0x7D22,
                0x8DF6: 0x932F,
                0x8DF7: 0x685C,
                0x8DF8: 0x9BAD,
                0x8DF9: 0x7B39,
                0x8DFA: 0x5319,
                0x8DFB: 0x518A,
                0x8DFC: 0x5237,
                0x8E40: 0x5BDF,
                0x8E41: 0x62F6,
                0x8E42: 0x64AE,
                0x8E43: 0x64E6,
                0x8E44: 0x672D,
                0x8E45: 0x6BBA,
                0x8E46: 0x85A9,
                0x8E47: 0x96D1,
                0x8E48: 0x7690,
                0x8E49: 0x9BD6,
                0x8E4A: 0x634C,
                0x8E4B: 0x9306,
                0x8E4C: 0x9BAB,
                0x8E4D: 0x76BF,
                0x8E4E: 0x6652,
                0x8E4F: 0x4E09,
                0x8E50: 0x5098,
                0x8E51: 0x53C2,
                0x8E52: 0x5C71,
                0x8E53: 0x60E8,
                0x8E54: 0x6492,
                0x8E55: 0x6563,
                0x8E56: 0x685F,
                0x8E57: 0x71E6,
                0x8E58: 0x73CA,
                0x8E59: 0x7523,
                0x8E5A: 0x7B97,
                0x8E5B: 0x7E82,
                0x8E5C: 0x8695,
                0x8E5D: 0x8B83,
                0x8E5E: 0x8CDB,
                0x8E5F: 0x9178,
                0x8E60: 0x9910,
                0x8E61: 0x65AC,
                0x8E62: 0x66AB,
                0x8E63: 0x6B8B,
                0x8E64: 0x4ED5,
                0x8E65: 0x4ED4,
                0x8E66: 0x4F3A,
                0x8E67: 0x4F7F,
                0x8E68: 0x523A,
                0x8E69: 0x53F8,
                0x8E6A: 0x53F2,
                0x8E6B: 0x55E3,
                0x8E6C: 0x56DB,
                0x8E6D: 0x58EB,
                0x8E6E: 0x59CB,
                0x8E6F: 0x59C9,
                0x8E70: 0x59FF,
                0x8E71: 0x5B50,
                0x8E72: 0x5C4D,
                0x8E73: 0x5E02,
                0x8E74: 0x5E2B,
                0x8E75: 0x5FD7,
                0x8E76: 0x601D,
                0x8E77: 0x6307,
                0x8E78: 0x652F,
                0x8E79: 0x5B5C,
                0x8E7A: 0x65AF,
                0x8E7B: 0x65BD,
                0x8E7C: 0x65E8,
                0x8E7D: 0x679D,
                0x8E7E: 0x6B62,
                0x8E80: 0x6B7B,
                0x8E81: 0x6C0F,
                0x8E82: 0x7345,
                0x8E83: 0x7949,
                0x8E84: 0x79C1,
                0x8E85: 0x7CF8,
                0x8E86: 0x7D19,
                0x8E87: 0x7D2B,
                0x8E88: 0x80A2,
                0x8E89: 0x8102,
                0x8E8A: 0x81F3,
                0x8E8B: 0x8996,
                0x8E8C: 0x8A5E,
                0x8E8D: 0x8A69,
                0x8E8E: 0x8A66,
                0x8E8F: 0x8A8C,
                0x8E90: 0x8AEE,
                0x8E91: 0x8CC7,
                0x8E92: 0x8CDC,
                0x8E93: 0x96CC,
                0x8E94: 0x98FC,
                0x8E95: 0x6B6F,
                0x8E96: 0x4E8B,
                0x8E97: 0x4F3C,
                0x8E98: 0x4F8D,
                0x8E99: 0x5150,
                0x8E9A: 0x5B57,
                0x8E9B: 0x5BFA,
                0x8E9C: 0x6148,
                0x8E9D: 0x6301,
                0x8E9E: 0x6642,
                0x8E9F: 0x6B21,
                0x8EA0: 0x6ECB,
                0x8EA1: 0x6CBB,
                0x8EA2: 0x723E,
                0x8EA3: 0x74BD,
                0x8EA4: 0x75D4,
                0x8EA5: 0x78C1,
                0x8EA6: 0x793A,
                0x8EA7: 0x800C,
                0x8EA8: 0x8033,
                0x8EA9: 0x81EA,
                0x8EAA: 0x8494,
                0x8EAB: 0x8F9E,
                0x8EAC: 0x6C50,
                0x8EAD: 0x9E7F,
                0x8EAE: 0x5F0F,
                0x8EAF: 0x8B58,
                0x8EB0: 0x9D2B,
                0x8EB1: 0x7AFA,
                0x8EB2: 0x8EF8,
                0x8EB3: 0x5B8D,
                0x8EB4: 0x96EB,
                0x8EB5: 0x4E03,
                0x8EB6: 0x53F1,
                0x8EB7: 0x57F7,
                0x8EB8: 0x5931,
                0x8EB9: 0x5AC9,
                0x8EBA: 0x5BA4,
                0x8EBB: 0x6089,
                0x8EBC: 0x6E7F,
                0x8EBD: 0x6F06,
                0x8EBE: 0x75BE,
                0x8EBF: 0x8CEA,
                0x8EC0: 0x5B9F,
                0x8EC1: 0x8500,
                0x8EC2: 0x7BE0,
                0x8EC3: 0x5072,
                0x8EC4: 0x67F4,
                0x8EC5: 0x829D,
                0x8EC6: 0x5C61,
                0x8EC7: 0x854A,
                0x8EC8: 0x7E1E,
                0x8EC9: 0x820E,
                0x8ECA: 0x5199,
                0x8ECB: 0x5C04,
                0x8ECC: 0x6368,
                0x8ECD: 0x8D66,
                0x8ECE: 0x659C,
                0x8ECF: 0x716E,
                0x8ED0: 0x793E,
                0x8ED1: 0x7D17,
                0x8ED2: 0x8005,
                0x8ED3: 0x8B1D,
                0x8ED4: 0x8ECA,
                0x8ED5: 0x906E,
                0x8ED6: 0x86C7,
                0x8ED7: 0x90AA,
                0x8ED8: 0x501F,
                0x8ED9: 0x52FA,
                0x8EDA: 0x5C3A,
                0x8EDB: 0x6753,
                0x8EDC: 0x707C,
                0x8EDD: 0x7235,
                0x8EDE: 0x914C,
                0x8EDF: 0x91C8,
                0x8EE0: 0x932B,
                0x8EE1: 0x82E5,
                0x8EE2: 0x5BC2,
                0x8EE3: 0x5F31,
                0x8EE4: 0x60F9,
                0x8EE5: 0x4E3B,
                0x8EE6: 0x53D6,
                0x8EE7: 0x5B88,
                0x8EE8: 0x624B,
                0x8EE9: 0x6731,
                0x8EEA: 0x6B8A,
                0x8EEB: 0x72E9,
                0x8EEC: 0x73E0,
                0x8EED: 0x7A2E,
                0x8EEE: 0x816B,
                0x8EEF: 0x8DA3,
                0x8EF0: 0x9152,
                0x8EF1: 0x9996,
                0x8EF2: 0x5112,
                0x8EF3: 0x53D7,
                0x8EF4: 0x546A,
                0x8EF5: 0x5BFF,
                0x8EF6: 0x6388,
                0x8EF7: 0x6A39,
                0x8EF8: 0x7DAC,
                0x8EF9: 0x9700,
                0x8EFA: 0x56DA,
                0x8EFB: 0x53CE,
                0x8EFC: 0x5468,
                0x8F40: 0x5B97,
                0x8F41: 0x5C31,
                0x8F42: 0x5DDE,
                0x8F43: 0x4FEE,
                0x8F44: 0x6101,
                0x8F45: 0x62FE,
                0x8F46: 0x6D32,
                0x8F47: 0x79C0,
                0x8F48: 0x79CB,
                0x8F49: 0x7D42,
                0x8F4A: 0x7E4D,
                0x8F4B: 0x7FD2,
                0x8F4C: 0x81ED,
                0x8F4D: 0x821F,
                0x8F4E: 0x8490,
                0x8F4F: 0x8846,
                0x8F50: 0x8972,
                0x8F51: 0x8B90,
                0x8F52: 0x8E74,
                0x8F53: 0x8F2F,
                0x8F54: 0x9031,
                0x8F55: 0x914B,
                0x8F56: 0x916C,
                0x8F57: 0x96C6,
                0x8F58: 0x919C,
                0x8F59: 0x4EC0,
                0x8F5A: 0x4F4F,
                0x8F5B: 0x5145,
                0x8F5C: 0x5341,
                0x8F5D: 0x5F93,
                0x8F5E: 0x620E,
                0x8F5F: 0x67D4,
                0x8F60: 0x6C41,
                0x8F61: 0x6E0B,
                0x8F62: 0x7363,
                0x8F63: 0x7E26,
                0x8F64: 0x91CD,
                0x8F65: 0x9283,
                0x8F66: 0x53D4,
                0x8F67: 0x5919,
                0x8F68: 0x5BBF,
                0x8F69: 0x6DD1,
                0x8F6A: 0x795D,
                0x8F6B: 0x7E2E,
                0x8F6C: 0x7C9B,
                0x8F6D: 0x587E,
                0x8F6E: 0x719F,
                0x8F6F: 0x51FA,
                0x8F70: 0x8853,
                0x8F71: 0x8FF0,
                0x8F72: 0x4FCA,
                0x8F73: 0x5CFB,
                0x8F74: 0x6625,
                0x8F75: 0x77AC,
                0x8F76: 0x7AE3,
                0x8F77: 0x821C,
                0x8F78: 0x99FF,
                0x8F79: 0x51C6,
                0x8F7A: 0x5FAA,
                0x8F7B: 0x65EC,
                0x8F7C: 0x696F,
                0x8F7D: 0x6B89,
                0x8F7E: 0x6DF3,
                0x8F80: 0x6E96,
                0x8F81: 0x6F64,
                0x8F82: 0x76FE,
                0x8F83: 0x7D14,
                0x8F84: 0x5DE1,
                0x8F85: 0x9075,
                0x8F86: 0x9187,
                0x8F87: 0x9806,
                0x8F88: 0x51E6,
                0x8F89: 0x521D,
                0x8F8A: 0x6240,
                0x8F8B: 0x6691,
                0x8F8C: 0x66D9,
                0x8F8D: 0x6E1A,
                0x8F8E: 0x5EB6,
                0x8F8F: 0x7DD2,
                0x8F90: 0x7F72,
                0x8F91: 0x66F8,
                0x8F92: 0x85AF,
                0x8F93: 0x85F7,
                0x8F94: 0x8AF8,
                0x8F95: 0x52A9,
                0x8F96: 0x53D9,
                0x8F97: 0x5973,
                0x8F98: 0x5E8F,
                0x8F99: 0x5F90,
                0x8F9A: 0x6055,
                0x8F9B: 0x92E4,
                0x8F9C: 0x9664,
                0x8F9D: 0x50B7,
                0x8F9E: 0x511F,
                0x8F9F: 0x52DD,
                0x8FA0: 0x5320,
                0x8FA1: 0x5347,
                0x8FA2: 0x53EC,
                0x8FA3: 0x54E8,
                0x8FA4: 0x5546,
                0x8FA5: 0x5531,
                0x8FA6: 0x5617,
                0x8FA7: 0x5968,
                0x8FA8: 0x59BE,
                0x8FA9: 0x5A3C,
                0x8FAA: 0x5BB5,
                0x8FAB: 0x5C06,
                0x8FAC: 0x5C0F,
                0x8FAD: 0x5C11,
                0x8FAE: 0x5C1A,
                0x8FAF: 0x5E84,
                0x8FB0: 0x5E8A,
                0x8FB1: 0x5EE0,
                0x8FB2: 0x5F70,
                0x8FB3: 0x627F,
                0x8FB4: 0x6284,
                0x8FB5: 0x62DB,
                0x8FB6: 0x638C,
                0x8FB7: 0x6377,
                0x8FB8: 0x6607,
                0x8FB9: 0x660C,
                0x8FBA: 0x662D,
                0x8FBB: 0x6676,
                0x8FBC: 0x677E,
                0x8FBD: 0x68A2,
                0x8FBE: 0x6A1F,
                0x8FBF: 0x6A35,
                0x8FC0: 0x6CBC,
                0x8FC1: 0x6D88,
                0x8FC2: 0x6E09,
                0x8FC3: 0x6E58,
                0x8FC4: 0x713C,
                0x8FC5: 0x7126,
                0x8FC6: 0x7167,
                0x8FC7: 0x75C7,
                0x8FC8: 0x7701,
                0x8FC9: 0x785D,
                0x8FCA: 0x7901,
                0x8FCB: 0x7965,
                0x8FCC: 0x79F0,
                0x8FCD: 0x7AE0,
                0x8FCE: 0x7B11,
                0x8FCF: 0x7CA7,
                0x8FD0: 0x7D39,
                0x8FD1: 0x8096,
                0x8FD2: 0x83D6,
                0x8FD3: 0x848B,
                0x8FD4: 0x8549,
                0x8FD5: 0x885D,
                0x8FD6: 0x88F3,
                0x8FD7: 0x8A1F,
                0x8FD8: 0x8A3C,
                0x8FD9: 0x8A54,
                0x8FDA: 0x8A73,
                0x8FDB: 0x8C61,
                0x8FDC: 0x8CDE,
                0x8FDD: 0x91A4,
                0x8FDE: 0x9266,
                0x8FDF: 0x937E,
                0x8FE0: 0x9418,
                0x8FE1: 0x969C,
                0x8FE2: 0x9798,
                0x8FE3: 0x4E0A,
                0x8FE4: 0x4E08,
                0x8FE5: 0x4E1E,
                0x8FE6: 0x4E57,
                0x8FE7: 0x5197,
                0x8FE8: 0x5270,
                0x8FE9: 0x57CE,
                0x8FEA: 0x5834,
                0x8FEB: 0x58CC,
                0x8FEC: 0x5B22,
                0x8FED: 0x5E38,
                0x8FEE: 0x60C5,
                0x8FEF: 0x64FE,
                0x8FF0: 0x6761,
                0x8FF1: 0x6756,
                0x8FF2: 0x6D44,
                0x8FF3: 0x72B6,
                0x8FF4: 0x7573,
                0x8FF5: 0x7A63,
                0x8FF6: 0x84B8,
                0x8FF7: 0x8B72,
                0x8FF8: 0x91B8,
                0x8FF9: 0x9320,
                0x8FFA: 0x5631,
                0x8FFB: 0x57F4,
                0x8FFC: 0x98FE,
                0x9040: 0x62ED,
                0x9041: 0x690D,
                0x9042: 0x6B96,
                0x9043: 0x71ED,
                0x9044: 0x7E54,
                0x9045: 0x8077,
                0x9046: 0x8272,
                0x9047: 0x89E6,
                0x9048: 0x98DF,
                0x9049: 0x8755,
                0x904A: 0x8FB1,
                0x904B: 0x5C3B,
                0x904C: 0x4F38,
                0x904D: 0x4FE1,
                0x904E: 0x4FB5,
                0x904F: 0x5507,
                0x9050: 0x5A20,
                0x9051: 0x5BDD,
                0x9052: 0x5BE9,
                0x9053: 0x5FC3,
                0x9054: 0x614E,
                0x9055: 0x632F,
                0x9056: 0x65B0,
                0x9057: 0x664B,
                0x9058: 0x68EE,
                0x9059: 0x699B,
                0x905A: 0x6D78,
                0x905B: 0x6DF1,
                0x905C: 0x7533,
                0x905D: 0x75B9,
                0x905E: 0x771F,
                0x905F: 0x795E,
                0x9060: 0x79E6,
                0x9061: 0x7D33,
                0x9062: 0x81E3,
                0x9063: 0x82AF,
                0x9064: 0x85AA,
                0x9065: 0x89AA,
                0x9066: 0x8A3A,
                0x9067: 0x8EAB,
                0x9068: 0x8F9B,
                0x9069: 0x9032,
                0x906A: 0x91DD,
                0x906B: 0x9707,
                0x906C: 0x4EBA,
                0x906D: 0x4EC1,
                0x906E: 0x5203,
                0x906F: 0x5875,
                0x9070: 0x58EC,
                0x9071: 0x5C0B,
                0x9072: 0x751A,
                0x9073: 0x5C3D,
                0x9074: 0x814E,
                0x9075: 0x8A0A,
                0x9076: 0x8FC5,
                0x9077: 0x9663,
                0x9078: 0x976D,
                0x9079: 0x7B25,
                0x907A: 0x8ACF,
                0x907B: 0x9808,
                0x907C: 0x9162,
                0x907D: 0x56F3,
                0x907E: 0x53A8,
                0x9080: 0x9017,
                0x9081: 0x5439,
                0x9082: 0x5782,
                0x9083: 0x5E25,
                0x9084: 0x63A8,
                0x9085: 0x6C34,
                0x9086: 0x708A,
                0x9087: 0x7761,
                0x9088: 0x7C8B,
                0x9089: 0x7FE0,
                0x908A: 0x8870,
                0x908B: 0x9042,
                0x908C: 0x9154,
                0x908D: 0x9310,
                0x908E: 0x9318,
                0x908F: 0x968F,
                0x9090: 0x745E,
                0x9091: 0x9AC4,
                0x9092: 0x5D07,
                0x9093: 0x5D69,
                0x9094: 0x6570,
                0x9095: 0x67A2,
                0x9096: 0x8DA8,
                0x9097: 0x96DB,
                0x9098: 0x636E,
                0x9099: 0x6749,
                0x909A: 0x6919,
                0x909B: 0x83C5,
                0x909C: 0x9817,
                0x909D: 0x96C0,
                0x909E: 0x88FE,
                0x909F: 0x6F84,
                0x90A0: 0x647A,
                0x90A1: 0x5BF8,
                0x90A2: 0x4E16,
                0x90A3: 0x702C,
                0x90A4: 0x755D,
                0x90A5: 0x662F,
                0x90A6: 0x51C4,
                0x90A7: 0x5236,
                0x90A8: 0x52E2,
                0x90A9: 0x59D3,
                0x90AA: 0x5F81,
                0x90AB: 0x6027,
                0x90AC: 0x6210,
                0x90AD: 0x653F,
                0x90AE: 0x6574,
                0x90AF: 0x661F,
                0x90B0: 0x6674,
                0x90B1: 0x68F2,
                0x90B2: 0x6816,
                0x90B3: 0x6B63,
                0x90B4: 0x6E05,
                0x90B5: 0x7272,
                0x90B6: 0x751F,
                0x90B7: 0x76DB,
                0x90B8: 0x7CBE,
                0x90B9: 0x8056,
                0x90BA: 0x58F0,
                0x90BB: 0x88FD,
                0x90BC: 0x897F,
                0x90BD: 0x8AA0,
                0x90BE: 0x8A93,
                0x90BF: 0x8ACB,
                0x90C0: 0x901D,
                0x90C1: 0x9192,
                0x90C2: 0x9752,
                0x90C3: 0x9759,
                0x90C4: 0x6589,
                0x90C5: 0x7A0E,
                0x90C6: 0x8106,
                0x90C7: 0x96BB,
                0x90C8: 0x5E2D,
                0x90C9: 0x60DC,
                0x90CA: 0x621A,
                0x90CB: 0x65A5,
                0x90CC: 0x6614,
                0x90CD: 0x6790,
                0x90CE: 0x77F3,
                0x90CF: 0x7A4D,
                0x90D0: 0x7C4D,
                0x90D1: 0x7E3E,
                0x90D2: 0x810A,
                0x90D3: 0x8CAC,
                0x90D4: 0x8D64,
                0x90D5: 0x8DE1,
                0x90D6: 0x8E5F,
                0x90D7: 0x78A9,
                0x90D8: 0x5207,
                0x90D9: 0x62D9,
                0x90DA: 0x63A5,
                0x90DB: 0x6442,
                0x90DC: 0x6298,
                0x90DD: 0x8A2D,
                0x90DE: 0x7A83,
                0x90DF: 0x7BC0,
                0x90E0: 0x8AAC,
                0x90E1: 0x96EA,
                0x90E2: 0x7D76,
                0x90E3: 0x820C,
                0x90E4: 0x8749,
                0x90E5: 0x4ED9,
                0x90E6: 0x5148,
                0x90E7: 0x5343,
                0x90E8: 0x5360,
                0x90E9: 0x5BA3,
                0x90EA: 0x5C02,
                0x90EB: 0x5C16,
                0x90EC: 0x5DDD,
                0x90ED: 0x6226,
                0x90EE: 0x6247,
                0x90EF: 0x64B0,
                0x90F0: 0x6813,
                0x90F1: 0x6834,
                0x90F2: 0x6CC9,
                0x90F3: 0x6D45,
                0x90F4: 0x6D17,
                0x90F5: 0x67D3,
                0x90F6: 0x6F5C,
                0x90F7: 0x714E,
                0x90F8: 0x717D,
                0x90F9: 0x65CB,
                0x90FA: 0x7A7F,
                0x90FB: 0x7BAD,
                0x90FC: 0x7DDA,
                0x9140: 0x7E4A,
                0x9141: 0x7FA8,
                0x9142: 0x817A,
                0x9143: 0x821B,
                0x9144: 0x8239,
                0x9145: 0x85A6,
                0x9146: 0x8A6E,
                0x9147: 0x8CCE,
                0x9148: 0x8DF5,
                0x9149: 0x9078,
                0x914A: 0x9077,
                0x914B: 0x92AD,
                0x914C: 0x9291,
                0x914D: 0x9583,
                0x914E: 0x9BAE,
                0x914F: 0x524D,
                0x9150: 0x5584,
                0x9151: 0x6F38,
                0x9152: 0x7136,
                0x9153: 0x5168,
                0x9154: 0x7985,
                0x9155: 0x7E55,
                0x9156: 0x81B3,
                0x9157: 0x7CCE,
                0x9158: 0x564C,
                0x9159: 0x5851,
                0x915A: 0x5CA8,
                0x915B: 0x63AA,
                0x915C: 0x66FE,
                0x915D: 0x66FD,
                0x915E: 0x695A,
                0x915F: 0x72D9,
                0x9160: 0x758F,
                0x9161: 0x758E,
                0x9162: 0x790E,
                0x9163: 0x7956,
                0x9164: 0x79DF,
                0x9165: 0x7C97,
                0x9166: 0x7D20,
                0x9167: 0x7D44,
                0x9168: 0x8607,
                0x9169: 0x8A34,
                0x916A: 0x963B,
                0x916B: 0x9061,
                0x916C: 0x9F20,
                0x916D: 0x50E7,
                0x916E: 0x5275,
                0x916F: 0x53CC,
                0x9170: 0x53E2,
                0x9171: 0x5009,
                0x9172: 0x55AA,
                0x9173: 0x58EE,
                0x9174: 0x594F,
                0x9175: 0x723D,
                0x9176: 0x5B8B,
                0x9177: 0x5C64,
                0x9178: 0x531D,
                0x9179: 0x60E3,
                0x917A: 0x60F3,
                0x917B: 0x635C,
                0x917C: 0x6383,
                0x917D: 0x633F,
                0x917E: 0x63BB,
                0x9180: 0x64CD,
                0x9181: 0x65E9,
                0x9182: 0x66F9,
                0x9183: 0x5DE3,
                0x9184: 0x69CD,
                0x9185: 0x69FD,
                0x9186: 0x6F15,
                0x9187: 0x71E5,
                0x9188: 0x4E89,
                0x9189: 0x75E9,
                0x918A: 0x76F8,
                0x918B: 0x7A93,
                0x918C: 0x7CDF,
                0x918D: 0x7DCF,
                0x918E: 0x7D9C,
                0x918F: 0x8061,
                0x9190: 0x8349,
                0x9191: 0x8358,
                0x9192: 0x846C,
                0x9193: 0x84BC,
                0x9194: 0x85FB,
                0x9195: 0x88C5,
                0x9196: 0x8D70,
                0x9197: 0x9001,
                0x9198: 0x906D,
                0x9199: 0x9397,
                0x919A: 0x971C,
                0x919B: 0x9A12,
                0x919C: 0x50CF,
                0x919D: 0x5897,
                0x919E: 0x618E,
                0x919F: 0x81D3,
                0x91A0: 0x8535,
                0x91A1: 0x8D08,
                0x91A2: 0x9020,
                0x91A3: 0x4FC3,
                0x91A4: 0x5074,
                0x91A5: 0x5247,
                0x91A6: 0x5373,
                0x91A7: 0x606F,
                0x91A8: 0x6349,
                0x91A9: 0x675F,
                0x91AA: 0x6E2C,
                0x91AB: 0x8DB3,
                0x91AC: 0x901F,
                0x91AD: 0x4FD7,
                0x91AE: 0x5C5E,
                0x91AF: 0x8CCA,
                0x91B0: 0x65CF,
                0x91B1: 0x7D9A,
                0x91B2: 0x5352,
                0x91B3: 0x8896,
                0x91B4: 0x5176,
                0x91B5: 0x63C3,
                0x91B6: 0x5B58,
                0x91B7: 0x5B6B,
                0x91B8: 0x5C0A,
                0x91B9: 0x640D,
                0x91BA: 0x6751,
                0x91BB: 0x905C,
                0x91BC: 0x4ED6,
                0x91BD: 0x591A,
                0x91BE: 0x592A,
                0x91BF: 0x6C70,
                0x91C0: 0x8A51,
                0x91C1: 0x553E,
                0x91C2: 0x5815,
                0x91C3: 0x59A5,
                0x91C4: 0x60F0,
                0x91C5: 0x6253,
                0x91C6: 0x67C1,
                0x91C7: 0x8235,
                0x91C8: 0x6955,
                0x91C9: 0x9640,
                0x91CA: 0x99C4,
                0x91CB: 0x9A28,
                0x91CC: 0x4F53,
                0x91CD: 0x5806,
                0x91CE: 0x5BFE,
                0x91CF: 0x8010,
                0x91D0: 0x5CB1,
                0x91D1: 0x5E2F,
                0x91D2: 0x5F85,
                0x91D3: 0x6020,
                0x91D4: 0x614B,
                0x91D5: 0x6234,
                0x91D6: 0x66FF,
                0x91D7: 0x6CF0,
                0x91D8: 0x6EDE,
                0x91D9: 0x80CE,
                0x91DA: 0x817F,
                0x91DB: 0x82D4,
                0x91DC: 0x888B,
                0x91DD: 0x8CB8,
                0x91DE: 0x9000,
                0x91DF: 0x902E,
                0x91E0: 0x968A,
                0x91E1: 0x9EDB,
                0x91E2: 0x9BDB,
                0x91E3: 0x4EE3,
                0x91E4: 0x53F0,
                0x91E5: 0x5927,
                0x91E6: 0x7B2C,
                0x91E7: 0x918D,
                0x91E8: 0x984C,
                0x91E9: 0x9DF9,
                0x91EA: 0x6EDD,
                0x91EB: 0x7027,
                0x91EC: 0x5353,
                0x91ED: 0x5544,
                0x91EE: 0x5B85,
                0x91EF: 0x6258,
                0x91F0: 0x629E,
                0x91F1: 0x62D3,
                0x91F2: 0x6CA2,
                0x91F3: 0x6FEF,
                0x91F4: 0x7422,
                0x91F5: 0x8A17,
                0x91F6: 0x9438,
                0x91F7: 0x6FC1,
                0x91F8: 0x8AFE,
                0x91F9: 0x8338,
                0x91FA: 0x51E7,
                0x91FB: 0x86F8,
                0x91FC: 0x53EA,
                0x9240: 0x53E9,
                0x9241: 0x4F46,
                0x9242: 0x9054,
                0x9243: 0x8FB0,
                0x9244: 0x596A,
                0x9245: 0x8131,
                0x9246: 0x5DFD,
                0x9247: 0x7AEA,
                0x9248: 0x8FBF,
                0x9249: 0x68DA,
                0x924A: 0x8C37,
                0x924B: 0x72F8,
                0x924C: 0x9C48,
                0x924D: 0x6A3D,
                0x924E: 0x8AB0,
                0x924F: 0x4E39,
                0x9250: 0x5358,
                0x9251: 0x5606,
                0x9252: 0x5766,
                0x9253: 0x62C5,
                0x9254: 0x63A2,
                0x9255: 0x65E6,
                0x9256: 0x6B4E,
                0x9257: 0x6DE1,
                0x9258: 0x6E5B,
                0x9259: 0x70AD,
                0x925A: 0x77ED,
                0x925B: 0x7AEF,
                0x925C: 0x7BAA,
                0x925D: 0x7DBB,
                0x925E: 0x803D,
                0x925F: 0x80C6,
                0x9260: 0x86CB,
                0x9261: 0x8A95,
                0x9262: 0x935B,
                0x9263: 0x56E3,
                0x9264: 0x58C7,
                0x9265: 0x5F3E,
                0x9266: 0x65AD,
                0x9267: 0x6696,
                0x9268: 0x6A80,
                0x9269: 0x6BB5,
                0x926A: 0x7537,
                0x926B: 0x8AC7,
                0x926C: 0x5024,
                0x926D: 0x77E5,
                0x926E: 0x5730,
                0x926F: 0x5F1B,
                0x9270: 0x6065,
                0x9271: 0x667A,
                0x9272: 0x6C60,
                0x9273: 0x75F4,
                0x9274: 0x7A1A,
                0x9275: 0x7F6E,
                0x9276: 0x81F4,
                0x9277: 0x8718,
                0x9278: 0x9045,
                0x9279: 0x99B3,
                0x927A: 0x7BC9,
                0x927B: 0x755C,
                0x927C: 0x7AF9,
                0x927D: 0x7B51,
                0x927E: 0x84C4,
                0x9280: 0x9010,
                0x9281: 0x79E9,
                0x9282: 0x7A92,
                0x9283: 0x8336,
                0x9284: 0x5AE1,
                0x9285: 0x7740,
                0x9286: 0x4E2D,
                0x9287: 0x4EF2,
                0x9288: 0x5B99,
                0x9289: 0x5FE0,
                0x928A: 0x62BD,
                0x928B: 0x663C,
                0x928C: 0x67F1,
                0x928D: 0x6CE8,
                0x928E: 0x866B,
                0x928F: 0x8877,
                0x9290: 0x8A3B,
                0x9291: 0x914E,
                0x9292: 0x92F3,
                0x9293: 0x99D0,
                0x9294: 0x6A17,
                0x9295: 0x7026,
                0x9296: 0x732A,
                0x9297: 0x82E7,
                0x9298: 0x8457,
                0x9299: 0x8CAF,
                0x929A: 0x4E01,
                0x929B: 0x5146,
                0x929C: 0x51CB,
                0x929D: 0x558B,
                0x929E: 0x5BF5,
                0x929F: 0x5E16,
                0x92A0: 0x5E33,
                0x92A1: 0x5E81,
                0x92A2: 0x5F14,
                0x92A3: 0x5F35,
                0x92A4: 0x5F6B,
                0x92A5: 0x5FB4,
                0x92A6: 0x61F2,
                0x92A7: 0x6311,
                0x92A8: 0x66A2,
                0x92A9: 0x671D,
                0x92AA: 0x6F6E,
                0x92AB: 0x7252,
                0x92AC: 0x753A,
                0x92AD: 0x773A,
                0x92AE: 0x8074,
                0x92AF: 0x8139,
                0x92B0: 0x8178,
                0x92B1: 0x8776,
                0x92B2: 0x8ABF,
                0x92B3: 0x8ADC,
                0x92B4: 0x8D85,
                0x92B5: 0x8DF3,
                0x92B6: 0x929A,
                0x92B7: 0x9577,
                0x92B8: 0x9802,
                0x92B9: 0x9CE5,
                0x92BA: 0x52C5,
                0x92BB: 0x6357,
                0x92BC: 0x76F4,
                0x92BD: 0x6715,
                0x92BE: 0x6C88,
                0x92BF: 0x73CD,
                0x92C0: 0x8CC3,
                0x92C1: 0x93AE,
                0x92C2: 0x9673,
                0x92C3: 0x6D25,
                0x92C4: 0x589C,
                0x92C5: 0x690E,
                0x92C6: 0x69CC,
                0x92C7: 0x8FFD,
                0x92C8: 0x939A,
                0x92C9: 0x75DB,
                0x92CA: 0x901A,
                0x92CB: 0x585A,
                0x92CC: 0x6802,
                0x92CD: 0x63B4,
                0x92CE: 0x69FB,
                0x92CF: 0x4F43,
                0x92D0: 0x6F2C,
                0x92D1: 0x67D8,
                0x92D2: 0x8FBB,
                0x92D3: 0x8526,
                0x92D4: 0x7DB4,
                0x92D5: 0x9354,
                0x92D6: 0x693F,
                0x92D7: 0x6F70,
                0x92D8: 0x576A,
                0x92D9: 0x58F7,
                0x92DA: 0x5B2C,
                0x92DB: 0x7D2C,
                0x92DC: 0x722A,
                0x92DD: 0x540A,
                0x92DE: 0x91E3,
                0x92DF: 0x9DB4,
                0x92E0: 0x4EAD,
                0x92E1: 0x4F4E,
                0x92E2: 0x505C,
                0x92E3: 0x5075,
                0x92E4: 0x5243,
                0x92E5: 0x8C9E,
                0x92E6: 0x5448,
                0x92E7: 0x5824,
                0x92E8: 0x5B9A,
                0x92E9: 0x5E1D,
                0x92EA: 0x5E95,
                0x92EB: 0x5EAD,
                0x92EC: 0x5EF7,
                0x92ED: 0x5F1F,
                0x92EE: 0x608C,
                0x92EF: 0x62B5,
                0x92F0: 0x633A,
                0x92F1: 0x63D0,
                0x92F2: 0x68AF,
                0x92F3: 0x6C40,
                0x92F4: 0x7887,
                0x92F5: 0x798E,
                0x92F6: 0x7A0B,
                0x92F7: 0x7DE0,
                0x92F8: 0x8247,
                0x92F9: 0x8A02,
                0x92FA: 0x8AE6,
                0x92FB: 0x8E44,
                0x92FC: 0x9013,
                0x9340: 0x90B8,
                0x9341: 0x912D,
                0x9342: 0x91D8,
                0x9343: 0x9F0E,
                0x9344: 0x6CE5,
                0x9345: 0x6458,
                0x9346: 0x64E2,
                0x9347: 0x6575,
                0x9348: 0x6EF4,
                0x9349: 0x7684,
                0x934A: 0x7B1B,
                0x934B: 0x9069,
                0x934C: 0x93D1,
                0x934D: 0x6EBA,
                0x934E: 0x54F2,
                0x934F: 0x5FB9,
                0x9350: 0x64A4,
                0x9351: 0x8F4D,
                0x9352: 0x8FED,
                0x9353: 0x9244,
                0x9354: 0x5178,
                0x9355: 0x586B,
                0x9356: 0x5929,
                0x9357: 0x5C55,
                0x9358: 0x5E97,
                0x9359: 0x6DFB,
                0x935A: 0x7E8F,
                0x935B: 0x751C,
                0x935C: 0x8CBC,
                0x935D: 0x8EE2,
                0x935E: 0x985B,
                0x935F: 0x70B9,
                0x9360: 0x4F1D,
                0x9361: 0x6BBF,
                0x9362: 0x6FB1,
                0x9363: 0x7530,
                0x9364: 0x96FB,
                0x9365: 0x514E,
                0x9366: 0x5410,
                0x9367: 0x5835,
                0x9368: 0x5857,
                0x9369: 0x59AC,
                0x936A: 0x5C60,
                0x936B: 0x5F92,
                0x936C: 0x6597,
                0x936D: 0x675C,
                0x936E: 0x6E21,
                0x936F: 0x767B,
                0x9370: 0x83DF,
                0x9371: 0x8CED,
                0x9372: 0x9014,
                0x9373: 0x90FD,
                0x9374: 0x934D,
                0x9375: 0x7825,
                0x9376: 0x783A,
                0x9377: 0x52AA,
                0x9378: 0x5EA6,
                0x9379: 0x571F,
                0x937A: 0x5974,
                0x937B: 0x6012,
                0x937C: 0x5012,
                0x937D: 0x515A,
                0x937E: 0x51AC,
                0x9380: 0x51CD,
                0x9381: 0x5200,
                0x9382: 0x5510,
                0x9383: 0x5854,
                0x9384: 0x5858,
                0x9385: 0x5957,
                0x9386: 0x5B95,
                0x9387: 0x5CF6,
                0x9388: 0x5D8B,
                0x9389: 0x60BC,
                0x938A: 0x6295,
                0x938B: 0x642D,
                0x938C: 0x6771,
                0x938D: 0x6843,
                0x938E: 0x68BC,
                0x938F: 0x68DF,
                0x9390: 0x76D7,
                0x9391: 0x6DD8,
                0x9392: 0x6E6F,
                0x9393: 0x6D9B,
                0x9394: 0x706F,
                0x9395: 0x71C8,
                0x9396: 0x5F53,
                0x9397: 0x75D8,
                0x9398: 0x7977,
                0x9399: 0x7B49,
                0x939A: 0x7B54,
                0x939B: 0x7B52,
                0x939C: 0x7CD6,
                0x939D: 0x7D71,
                0x939E: 0x5230,
                0x939F: 0x8463,
                0x93A0: 0x8569,
                0x93A1: 0x85E4,
                0x93A2: 0x8A0E,
                0x93A3: 0x8B04,
                0x93A4: 0x8C46,
                0x93A5: 0x8E0F,
                0x93A6: 0x9003,
                0x93A7: 0x900F,
                0x93A8: 0x9419,
                0x93A9: 0x9676,
                0x93AA: 0x982D,
                0x93AB: 0x9A30,
                0x93AC: 0x95D8,
                0x93AD: 0x50CD,
                0x93AE: 0x52D5,
                0x93AF: 0x540C,
                0x93B0: 0x5802,
                0x93B1: 0x5C0E,
                0x93B2: 0x61A7,
                0x93B3: 0x649E,
                0x93B4: 0x6D1E,
                0x93B5: 0x77B3,
                0x93B6: 0x7AE5,
                0x93B7: 0x80F4,
                0x93B8: 0x8404,
                0x93B9: 0x9053,
                0x93BA: 0x9285,
                0x93BB: 0x5CE0,
                0x93BC: 0x9D07,
                0x93BD: 0x533F,
                0x93BE: 0x5F97,
                0x93BF: 0x5FB3,
                0x93C0: 0x6D9C,
                0x93C1: 0x7279,
                0x93C2: 0x7763,
                0x93C3: 0x79BF,
                0x93C4: 0x7BE4,
                0x93C5: 0x6BD2,
                0x93C6: 0x72EC,
                0x93C7: 0x8AAD,
                0x93C8: 0x6803,
                0x93C9: 0x6A61,
                0x93CA: 0x51F8,
                0x93CB: 0x7A81,
                0x93CC: 0x6934,
                0x93CD: 0x5C4A,
                0x93CE: 0x9CF6,
                0x93CF: 0x82EB,
                0x93D0: 0x5BC5,
                0x93D1: 0x9149,
                0x93D2: 0x701E,
                0x93D3: 0x5678,
                0x93D4: 0x5C6F,
                0x93D5: 0x60C7,
                0x93D6: 0x6566,
                0x93D7: 0x6C8C,
                0x93D8: 0x8C5A,
                0x93D9: 0x9041,
                0x93DA: 0x9813,
                0x93DB: 0x5451,
                0x93DC: 0x66C7,
                0x93DD: 0x920D,
                0x93DE: 0x5948,
                0x93DF: 0x90A3,
                0x93E0: 0x5185,
                0x93E1: 0x4E4D,
                0x93E2: 0x51EA,
                0x93E3: 0x8599,
                0x93E4: 0x8B0E,
                0x93E5: 0x7058,
                0x93E6: 0x637A,
                0x93E7: 0x934B,
                0x93E8: 0x6962,
                0x93E9: 0x99B4,
                0x93EA: 0x7E04,
                0x93EB: 0x7577,
                0x93EC: 0x5357,
                0x93ED: 0x6960,
                0x93EE: 0x8EDF,
                0x93EF: 0x96E3,
                0x93F0: 0x6C5D,
                0x93F1: 0x4E8C,
                0x93F2: 0x5C3C,
                0x93F3: 0x5F10,
                0x93F4: 0x8FE9,
                0x93F5: 0x5302,
                0x93F6: 0x8CD1,
                0x93F7: 0x8089,
                0x93F8: 0x8679,
                0x93F9: 0x5EFF,
                0x93FA: 0x65E5,
                0x93FB: 0x4E73,
                0x93FC: 0x5165,
                0x9440: 0x5982,
                0x9441: 0x5C3F,
                0x9442: 0x97EE,
                0x9443: 0x4EFB,
                0x9444: 0x598A,
                0x9445: 0x5FCD,
                0x9446: 0x8A8D,
                0x9447: 0x6FE1,
                0x9448: 0x79B0,
                0x9449: 0x7962,
                0x944A: 0x5BE7,
                0x944B: 0x8471,
                0x944C: 0x732B,
                0x944D: 0x71B1,
                0x944E: 0x5E74,
                0x944F: 0x5FF5,
                0x9450: 0x637B,
                0x9451: 0x649A,
                0x9452: 0x71C3,
                0x9453: 0x7C98,
                0x9454: 0x4E43,
                0x9455: 0x5EFC,
                0x9456: 0x4E4B,
                0x9457: 0x57DC,
                0x9458: 0x56A2,
                0x9459: 0x60A9,
                0x945A: 0x6FC3,
                0x945B: 0x7D0D,
                0x945C: 0x80FD,
                0x945D: 0x8133,
                0x945E: 0x81BF,
                0x945F: 0x8FB2,
                0x9460: 0x8997,
                0x9461: 0x86A4,
                0x9462: 0x5DF4,
                0x9463: 0x628A,
                0x9464: 0x64AD,
                0x9465: 0x8987,
                0x9466: 0x6777,
                0x9467: 0x6CE2,
                0x9468: 0x6D3E,
                0x9469: 0x7436,
                0x946A: 0x7834,
                0x946B: 0x5A46,
                0x946C: 0x7F75,
                0x946D: 0x82AD,
                0x946E: 0x99AC,
                0x946F: 0x4FF3,
                0x9470: 0x5EC3,
                0x9471: 0x62DD,
                0x9472: 0x6392,
                0x9473: 0x6557,
                0x9474: 0x676F,
                0x9475: 0x76C3,
                0x9476: 0x724C,
                0x9477: 0x80CC,
                0x9478: 0x80BA,
                0x9479: 0x8F29,
                0x947A: 0x914D,
                0x947B: 0x500D,
                0x947C: 0x57F9,
                0x947D: 0x5A92,
                0x947E: 0x6885,
                0x9480: 0x6973,
                0x9481: 0x7164,
                0x9482: 0x72FD,
                0x9483: 0x8CB7,
                0x9484: 0x58F2,
                0x9485: 0x8CE0,
                0x9486: 0x966A,
                0x9487: 0x9019,
                0x9488: 0x877F,
                0x9489: 0x79E4,
                0x948A: 0x77E7,
                0x948B: 0x8429,
                0x948C: 0x4F2F,
                0x948D: 0x5265,
                0x948E: 0x535A,
                0x948F: 0x62CD,
                0x9490: 0x67CF,
                0x9491: 0x6CCA,
                0x9492: 0x767D,
                0x9493: 0x7B94,
                0x9494: 0x7C95,
                0x9495: 0x8236,
                0x9496: 0x8584,
                0x9497: 0x8FEB,
                0x9498: 0x66DD,
                0x9499: 0x6F20,
                0x949A: 0x7206,
                0x949B: 0x7E1B,
                0x949C: 0x83AB,
                0x949D: 0x99C1,
                0x949E: 0x9EA6,
                0x949F: 0x51FD,
                0x94A0: 0x7BB1,
                0x94A1: 0x7872,
                0x94A2: 0x7BB8,
                0x94A3: 0x8087,
                0x94A4: 0x7B48,
                0x94A5: 0x6AE8,
                0x94A6: 0x5E61,
                0x94A7: 0x808C,
                0x94A8: 0x7551,
                0x94A9: 0x7560,
                0x94AA: 0x516B,
                0x94AB: 0x9262,
                0x94AC: 0x6E8C,
                0x94AD: 0x767A,
                0x94AE: 0x9197,
                0x94AF: 0x9AEA,
                0x94B0: 0x4F10,
                0x94B1: 0x7F70,
                0x94B2: 0x629C,
                0x94B3: 0x7B4F,
                0x94B4: 0x95A5,
                0x94B5: 0x9CE9,
                0x94B6: 0x567A,
                0x94B7: 0x5859,
                0x94B8: 0x86E4,
                0x94B9: 0x96BC,
                0x94BA: 0x4F34,
                0x94BB: 0x5224,
                0x94BC: 0x534A,
                0x94BD: 0x53CD,
                0x94BE: 0x53DB,
                0x94BF: 0x5E06,
                0x94C0: 0x642C,
                0x94C1: 0x6591,
                0x94C2: 0x677F,
                0x94C3: 0x6C3E,
                0x94C4: 0x6C4E,
                0x94C5: 0x7248,
                0x94C6: 0x72AF,
                0x94C7: 0x73ED,
                0x94C8: 0x7554,
                0x94C9: 0x7E41,
                0x94CA: 0x822C,
                0x94CB: 0x85E9,
                0x94CC: 0x8CA9,
                0x94CD: 0x7BC4,
                0x94CE: 0x91C6,
                0x94CF: 0x7169,
                0x94D0: 0x9812,
                0x94D1: 0x98EF,
                0x94D2: 0x633D,
                0x94D3: 0x6669,
                0x94D4: 0x756A,
                0x94D5: 0x76E4,
                0x94D6: 0x78D0,
                0x94D7: 0x8543,
                0x94D8: 0x86EE,
                0x94D9: 0x532A,
                0x94DA: 0x5351,
                0x94DB: 0x5426,
                0x94DC: 0x5983,
                0x94DD: 0x5E87,
                0x94DE: 0x5F7C,
                0x94DF: 0x60B2,
                0x94E0: 0x6249,
                0x94E1: 0x6279,
                0x94E2: 0x62AB,
                0x94E3: 0x6590,
                0x94E4: 0x6BD4,
                0x94E5: 0x6CCC,
                0x94E6: 0x75B2,
                0x94E7: 0x76AE,
                0x94E8: 0x7891,
                0x94E9: 0x79D8,
                0x94EA: 0x7DCB,
                0x94EB: 0x7F77,
                0x94EC: 0x80A5,
                0x94ED: 0x88AB,
                0x94EE: 0x8AB9,
                0x94EF: 0x8CBB,
                0x94F0: 0x907F,
                0x94F1: 0x975E,
                0x94F2: 0x98DB,
                0x94F3: 0x6A0B,
                0x94F4: 0x7C38,
                0x94F5: 0x5099,
                0x94F6: 0x5C3E,
                0x94F7: 0x5FAE,
                0x94F8: 0x6787,
                0x94F9: 0x6BD8,
                0x94FA: 0x7435,
                0x94FB: 0x7709,
                0x94FC: 0x7F8E,
                0x9540: 0x9F3B,
                0x9541: 0x67CA,
                0x9542: 0x7A17,
                0x9543: 0x5339,
                0x9544: 0x758B,
                0x9545: 0x9AED,
                0x9546: 0x5F66,
                0x9547: 0x819D,
                0x9548: 0x83F1,
                0x9549: 0x8098,
                0x954A: 0x5F3C,
                0x954B: 0x5FC5,
                0x954C: 0x7562,
                0x954D: 0x7B46,
                0x954E: 0x903C,
                0x954F: 0x6867,
                0x9550: 0x59EB,
                0x9551: 0x5A9B,
                0x9552: 0x7D10,
                0x9553: 0x767E,
                0x9554: 0x8B2C,
                0x9555: 0x4FF5,
                0x9556: 0x5F6A,
                0x9557: 0x6A19,
                0x9558: 0x6C37,
                0x9559: 0x6F02,
                0x955A: 0x74E2,
                0x955B: 0x7968,
                0x955C: 0x8868,
                0x955D: 0x8A55,
                0x955E: 0x8C79,
                0x955F: 0x5EDF,
                0x9560: 0x63CF,
                0x9561: 0x75C5,
                0x9562: 0x79D2,
                0x9563: 0x82D7,
                0x9564: 0x9328,
                0x9565: 0x92F2,
                0x9566: 0x849C,
                0x9567: 0x86ED,
                0x9568: 0x9C2D,
                0x9569: 0x54C1,
                0x956A: 0x5F6C,
                0x956B: 0x658C,
                0x956C: 0x6D5C,
                0x956D: 0x7015,
                0x956E: 0x8CA7,
                0x956F: 0x8CD3,
                0x9570: 0x983B,
                0x9571: 0x654F,
                0x9572: 0x74F6,
                0x9573: 0x4E0D,
                0x9574: 0x4ED8,
                0x9575: 0x57E0,
                0x9576: 0x592B,
                0x9577: 0x5A66,
                0x9578: 0x5BCC,
                0x9579: 0x51A8,
                0x957A: 0x5E03,
                0x957B: 0x5E9C,
                0x957C: 0x6016,
                0x957D: 0x6276,
                0x957E: 0x6577,
                0x9580: 0x65A7,
                0x9581: 0x666E,
                0x9582: 0x6D6E,
                0x9583: 0x7236,
                0x9584: 0x7B26,
                0x9585: 0x8150,
                0x9586: 0x819A,
                0x9587: 0x8299,
                0x9588: 0x8B5C,
                0x9589: 0x8CA0,
                0x958A: 0x8CE6,
                0x958B: 0x8D74,
                0x958C: 0x961C,
                0x958D: 0x9644,
                0x958E: 0x4FAE,
                0x958F: 0x64AB,
                0x9590: 0x6B66,
                0x9591: 0x821E,
                0x9592: 0x8461,
                0x9593: 0x856A,
                0x9594: 0x90E8,
                0x9595: 0x5C01,
                0x9596: 0x6953,
                0x9597: 0x98A8,
                0x9598: 0x847A,
                0x9599: 0x8557,
                0x959A: 0x4F0F,
                0x959B: 0x526F,
                0x959C: 0x5FA9,
                0x959D: 0x5E45,
                0x959E: 0x670D,
                0x959F: 0x798F,
                0x95A0: 0x8179,
                0x95A1: 0x8907,
                0x95A2: 0x8986,
                0x95A3: 0x6DF5,
                0x95A4: 0x5F17,
                0x95A5: 0x6255,
                0x95A6: 0x6CB8,
                0x95A7: 0x4ECF,
                0x95A8: 0x7269,
                0x95A9: 0x9B92,
                0x95AA: 0x5206,
                0x95AB: 0x543B,
                0x95AC: 0x5674,
                0x95AD: 0x58B3,
                0x95AE: 0x61A4,
                0x95AF: 0x626E,
                0x95B0: 0x711A,
                0x95B1: 0x596E,
                0x95B2: 0x7C89,
                0x95B3: 0x7CDE,
                0x95B4: 0x7D1B,
                0x95B5: 0x96F0,
                0x95B6: 0x6587,
                0x95B7: 0x805E,
                0x95B8: 0x4E19,
                0x95B9: 0x4F75,
                0x95BA: 0x5175,
                0x95BB: 0x5840,
                0x95BC: 0x5E63,
                0x95BD: 0x5E73,
                0x95BE: 0x5F0A,
                0x95BF: 0x67C4,
                0x95C0: 0x4E26,
                0x95C1: 0x853D,
                0x95C2: 0x9589,
                0x95C3: 0x965B,
                0x95C4: 0x7C73,
                0x95C5: 0x9801,
                0x95C6: 0x50FB,
                0x95C7: 0x58C1,
                0x95C8: 0x7656,
                0x95C9: 0x78A7,
                0x95CA: 0x5225,
                0x95CB: 0x77A5,
                0x95CC: 0x8511,
                0x95CD: 0x7B86,
                0x95CE: 0x504F,
                0x95CF: 0x5909,
                0x95D0: 0x7247,
                0x95D1: 0x7BC7,
                0x95D2: 0x7DE8,
                0x95D3: 0x8FBA,
                0x95D4: 0x8FD4,
                0x95D5: 0x904D,
                0x95D6: 0x4FBF,
                0x95D7: 0x52C9,
                0x95D8: 0x5A29,
                0x95D9: 0x5F01,
                0x95DA: 0x97AD,
                0x95DB: 0x4FDD,
                0x95DC: 0x8217,
                0x95DD: 0x92EA,
                0x95DE: 0x5703,
                0x95DF: 0x6355,
                0x95E0: 0x6B69,
                0x95E1: 0x752B,
                0x95E2: 0x88DC,
                0x95E3: 0x8F14,
                0x95E4: 0x7A42,
                0x95E5: 0x52DF,
                0x95E6: 0x5893,
                0x95E7: 0x6155,
                0x95E8: 0x620A,
                0x95E9: 0x66AE,
                0x95EA: 0x6BCD,
                0x95EB: 0x7C3F,
                0x95EC: 0x83E9,
                0x95ED: 0x5023,
                0x95EE: 0x4FF8,
                0x95EF: 0x5305,
                0x95F0: 0x5446,
                0x95F1: 0x5831,
                0x95F2: 0x5949,
                0x95F3: 0x5B9D,
                0x95F4: 0x5CF0,
                0x95F5: 0x5CEF,
                0x95F6: 0x5D29,
                0x95F7: 0x5E96,
                0x95F8: 0x62B1,
                0x95F9: 0x6367,
                0x95FA: 0x653E,
                0x95FB: 0x65B9,
                0x95FC: 0x670B,
                0x9640: 0x6CD5,
                0x9641: 0x6CE1,
                0x9642: 0x70F9,
                0x9643: 0x7832,
                0x9644: 0x7E2B,
                0x9645: 0x80DE,
                0x9646: 0x82B3,
                0x9647: 0x840C,
                0x9648: 0x84EC,
                0x9649: 0x8702,
                0x964A: 0x8912,
                0x964B: 0x8A2A,
                0x964C: 0x8C4A,
                0x964D: 0x90A6,
                0x964E: 0x92D2,
                0x964F: 0x98FD,
                0x9650: 0x9CF3,
                0x9651: 0x9D6C,
                0x9652: 0x4E4F,
                0x9653: 0x4EA1,
                0x9654: 0x508D,
                0x9655: 0x5256,
                0x9656: 0x574A,
                0x9657: 0x59A8,
                0x9658: 0x5E3D,
                0x9659: 0x5FD8,
                0x965A: 0x5FD9,
                0x965B: 0x623F,
                0x965C: 0x66B4,
                0x965D: 0x671B,
                0x965E: 0x67D0,
                0x965F: 0x68D2,
                0x9660: 0x5192,
                0x9661: 0x7D21,
                0x9662: 0x80AA,
                0x9663: 0x81A8,
                0x9664: 0x8B00,
                0x9665: 0x8C8C,
                0x9666: 0x8CBF,
                0x9667: 0x927E,
                0x9668: 0x9632,
                0x9669: 0x5420,
                0x966A: 0x982C,
                0x966B: 0x5317,
                0x966C: 0x50D5,
                0x966D: 0x535C,
                0x966E: 0x58A8,
                0x966F: 0x64B2,
                0x9670: 0x6734,
                0x9671: 0x7267,
                0x9672: 0x7766,
                0x9673: 0x7A46,
                0x9674: 0x91E6,
                0x9675: 0x52C3,
                0x9676: 0x6CA1,
                0x9677: 0x6B86,
                0x9678: 0x5800,
                0x9679: 0x5E4C,
                0x967A: 0x5954,
                0x967B: 0x672C,
                0x967C: 0x7FFB,
                0x967D: 0x51E1,
                0x967E: 0x76C6,
                0x9680: 0x6469,
                0x9681: 0x78E8,
                0x9682: 0x9B54,
                0x9683: 0x9EBB,
                0x9684: 0x57CB,
                0x9685: 0x59B9,
                0x9686: 0x6627,
                0x9687: 0x679A,
                0x9688: 0x6BCE,
                0x9689: 0x54E9,
                0x968A: 0x69D9,
                0x968B: 0x5E55,
                0x968C: 0x819C,
                0x968D: 0x6795,
                0x968E: 0x9BAA,
                0x968F: 0x67FE,
                0x9690: 0x9C52,
                0x9691: 0x685D,
                0x9692: 0x4EA6,
                0x9693: 0x4FE3,
                0x9694: 0x53C8,
                0x9695: 0x62B9,
                0x9696: 0x672B,
                0x9697: 0x6CAB,
                0x9698: 0x8FC4,
                0x9699: 0x4FAD,
                0x969A: 0x7E6D,
                0x969B: 0x9EBF,
                0x969C: 0x4E07,
                0x969D: 0x6162,
                0x969E: 0x6E80,
                0x969F: 0x6F2B,
                0x96A0: 0x8513,
                0x96A1: 0x5473,
                0x96A2: 0x672A,
                0x96A3: 0x9B45,
                0x96A4: 0x5DF3,
                0x96A5: 0x7B95,
                0x96A6: 0x5CAC,
                0x96A7: 0x5BC6,
                0x96A8: 0x871C,
                0x96A9: 0x6E4A,
                0x96AA: 0x84D1,
                0x96AB: 0x7A14,
                0x96AC: 0x8108,
                0x96AD: 0x5999,
                0x96AE: 0x7C8D,
                0x96AF: 0x6C11,
                0x96B0: 0x7720,
                0x96B1: 0x52D9,
                0x96B2: 0x5922,
                0x96B3: 0x7121,
                0x96B4: 0x725F,
                0x96B5: 0x77DB,
                0x96B6: 0x9727,
                0x96B7: 0x9D61,
                0x96B8: 0x690B,
                0x96B9: 0x5A7F,
                0x96BA: 0x5A18,
                0x96BB: 0x51A5,
                0x96BC: 0x540D,
                0x96BD: 0x547D,
                0x96BE: 0x660E,
                0x96BF: 0x76DF,
                0x96C0: 0x8FF7,
                0x96C1: 0x9298,
                0x96C2: 0x9CF4,
                0x96C3: 0x59EA,
                0x96C4: 0x725D,
                0x96C5: 0x6EC5,
                0x96C6: 0x514D,
                0x96C7: 0x68C9,
                0x96C8: 0x7DBF,
                0x96C9: 0x7DEC,
                0x96CA: 0x9762,
                0x96CB: 0x9EBA,
                0x96CC: 0x6478,
                0x96CD: 0x6A21,
                0x96CE: 0x8302,
                0x96CF: 0x5984,
                0x96D0: 0x5B5F,
                0x96D1: 0x6BDB,
                0x96D2: 0x731B,
                0x96D3: 0x76F2,
                0x96D4: 0x7DB2,
                0x96D5: 0x8017,
                0x96D6: 0x8499,
                0x96D7: 0x5132,
                0x96D8: 0x6728,
                0x96D9: 0x9ED9,
                0x96DA: 0x76EE,
                0x96DB: 0x6762,
                0x96DC: 0x52FF,
                0x96DD: 0x9905,
                0x96DE: 0x5C24,
                0x96DF: 0x623B,
                0x96E0: 0x7C7E,
                0x96E1: 0x8CB0,
                0x96E2: 0x554F,
                0x96E3: 0x60B6,
                0x96E4: 0x7D0B,
                0x96E5: 0x9580,
                0x96E6: 0x5301,
                0x96E7: 0x4E5F,
                0x96E8: 0x51B6,
                0x96E9: 0x591C,
                0x96EA: 0x723A,
                0x96EB: 0x8036,
                0x96EC: 0x91CE,
                0x96ED: 0x5F25,
                0x96EE: 0x77E2,
                0x96EF: 0x5384,
                0x96F0: 0x5F79,
                0x96F1: 0x7D04,
                0x96F2: 0x85AC,
                0x96F3: 0x8A33,
                0x96F4: 0x8E8D,
                0x96F5: 0x9756,
                0x96F6: 0x67F3,
                0x96F7: 0x85AE,
                0x96F8: 0x9453,
                0x96F9: 0x6109,
                0x96FA: 0x6108,
                0x96FB: 0x6CB9,
                0x96FC: 0x7652,
                0x9740: 0x8AED,
                0x9741: 0x8F38,
                0x9742: 0x552F,
                0x9743: 0x4F51,
                0x9744: 0x512A,
                0x9745: 0x52C7,
                0x9746: 0x53CB,
                0x9747: 0x5BA5,
                0x9748: 0x5E7D,
                0x9749: 0x60A0,
                0x974A: 0x6182,
                0x974B: 0x63D6,
                0x974C: 0x6709,
                0x974D: 0x67DA,
                0x974E: 0x6E67,
                0x974F: 0x6D8C,
                0x9750: 0x7336,
                0x9751: 0x7337,
                0x9752: 0x7531,
                0x9753: 0x7950,
                0x9754: 0x88D5,
                0x9755: 0x8A98,
                0x9756: 0x904A,
                0x9757: 0x9091,
                0x9758: 0x90F5,
                0x9759: 0x96C4,
                0x975A: 0x878D,
                0x975B: 0x5915,
                0x975C: 0x4E88,
                0x975D: 0x4F59,
                0x975E: 0x4E0E,
                0x975F: 0x8A89,
                0x9760: 0x8F3F,
                0x9761: 0x9810,
                0x9762: 0x50AD,
                0x9763: 0x5E7C,
                0x9764: 0x5996,
                0x9765: 0x5BB9,
                0x9766: 0x5EB8,
                0x9767: 0x63DA,
                0x9768: 0x63FA,
                0x9769: 0x64C1,
                0x976A: 0x66DC,
                0x976B: 0x694A,
                0x976C: 0x69D8,
                0x976D: 0x6D0B,
                0x976E: 0x6EB6,
                0x976F: 0x7194,
                0x9770: 0x7528,
                0x9771: 0x7AAF,
                0x9772: 0x7F8A,
                0x9773: 0x8000,
                0x9774: 0x8449,
                0x9775: 0x84C9,
                0x9776: 0x8981,
                0x9777: 0x8B21,
                0x9778: 0x8E0A,
                0x9779: 0x9065,
                0x977A: 0x967D,
                0x977B: 0x990A,
                0x977C: 0x617E,
                0x977D: 0x6291,
                0x977E: 0x6B32,
                0x9780: 0x6C83,
                0x9781: 0x6D74,
                0x9782: 0x7FCC,
                0x9783: 0x7FFC,
                0x9784: 0x6DC0,
                0x9785: 0x7F85,
                0x9786: 0x87BA,
                0x9787: 0x88F8,
                0x9788: 0x6765,
                0x9789: 0x83B1,
                0x978A: 0x983C,
                0x978B: 0x96F7,
                0x978C: 0x6D1B,
                0x978D: 0x7D61,
                0x978E: 0x843D,
                0x978F: 0x916A,
                0x9790: 0x4E71,
                0x9791: 0x5375,
                0x9792: 0x5D50,
                0x9793: 0x6B04,
                0x9794: 0x6FEB,
                0x9795: 0x85CD,
                0x9796: 0x862D,
                0x9797: 0x89A7,
                0x9798: 0x5229,
                0x9799: 0x540F,
                0x979A: 0x5C65,
                0x979B: 0x674E,
                0x979C: 0x68A8,
                0x979D: 0x7406,
                0x979E: 0x7483,
                0x979F: 0x75E2,
                0x97A0: 0x88CF,
                0x97A1: 0x88E1,
                0x97A2: 0x91CC,
                0x97A3: 0x96E2,
                0x97A4: 0x9678,
                0x97A5: 0x5F8B,
                0x97A6: 0x7387,
                0x97A7: 0x7ACB,
                0x97A8: 0x844E,
                0x97A9: 0x63A0,
                0x97AA: 0x7565,
                0x97AB: 0x5289,
                0x97AC: 0x6D41,
                0x97AD: 0x6E9C,
                0x97AE: 0x7409,
                0x97AF: 0x7559,
                0x97B0: 0x786B,
                0x97B1: 0x7C92,
                0x97B2: 0x9686,
                0x97B3: 0x7ADC,
                0x97B4: 0x9F8D,
                0x97B5: 0x4FB6,
                0x97B6: 0x616E,
                0x97B7: 0x65C5,
                0x97B8: 0x865C,
                0x97B9: 0x4E86,
                0x97BA: 0x4EAE,
                0x97BB: 0x50DA,
                0x97BC: 0x4E21,
                0x97BD: 0x51CC,
                0x97BE: 0x5BEE,
                0x97BF: 0x6599,
                0x97C0: 0x6881,
                0x97C1: 0x6DBC,
                0x97C2: 0x731F,
                0x97C3: 0x7642,
                0x97C4: 0x77AD,
                0x97C5: 0x7A1C,
                0x97C6: 0x7CE7,
                0x97C7: 0x826F,
                0x97C8: 0x8AD2,
                0x97C9: 0x907C,
                0x97CA: 0x91CF,
                0x97CB: 0x9675,
                0x97CC: 0x9818,
                0x97CD: 0x529B,
                0x97CE: 0x7DD1,
                0x97CF: 0x502B,
                0x97D0: 0x5398,
                0x97D1: 0x6797,
                0x97D2: 0x6DCB,
                0x97D3: 0x71D0,
                0x97D4: 0x7433,
                0x97D5: 0x81E8,
                0x97D6: 0x8F2A,
                0x97D7: 0x96A3,
                0x97D8: 0x9C57,
                0x97D9: 0x9E9F,
                0x97DA: 0x7460,
                0x97DB: 0x5841,
                0x97DC: 0x6D99,
                0x97DD: 0x7D2F,
                0x97DE: 0x985E,
                0x97DF: 0x4EE4,
                0x97E0: 0x4F36,
                0x97E1: 0x4F8B,
                0x97E2: 0x51B7,
                0x97E3: 0x52B1,
                0x97E4: 0x5DBA,
                0x97E5: 0x601C,
                0x97E6: 0x73B2,
                0x97E7: 0x793C,
                0x97E8: 0x82D3,
                0x97E9: 0x9234,
                0x97EA: 0x96B7,
                0x97EB: 0x96F6,
                0x97EC: 0x970A,
                0x97ED: 0x9E97,
                0x97EE: 0x9F62,
                0x97EF: 0x66A6,
                0x97F0: 0x6B74,
                0x97F1: 0x5217,
                0x97F2: 0x52A3,
                0x97F3: 0x70C8,
                0x97F4: 0x88C2,
                0x97F5: 0x5EC9,
                0x97F6: 0x604B,
                0x97F7: 0x6190,
                0x97F8: 0x6F23,
                0x97F9: 0x7149,
                0x97FA: 0x7C3E,
                0x97FB: 0x7DF4,
                0x97FC: 0x806F,
                0x9840: 0x84EE,
                0x9841: 0x9023,
                0x9842: 0x932C,
                0x9843: 0x5442,
                0x9844: 0x9B6F,
                0x9845: 0x6AD3,
                0x9846: 0x7089,
                0x9847: 0x8CC2,
                0x9848: 0x8DEF,
                0x9849: 0x9732,
                0x984A: 0x52B4,
                0x984B: 0x5A41,
                0x984C: 0x5ECA,
                0x984D: 0x5F04,
                0x984E: 0x6717,
                0x984F: 0x697C,
                0x9850: 0x6994,
                0x9851: 0x6D6A,
                0x9852: 0x6F0F,
                0x9853: 0x7262,
                0x9854: 0x72FC,
                0x9855: 0x7BED,
                0x9856: 0x8001,
                0x9857: 0x807E,
                0x9858: 0x874B,
                0x9859: 0x90CE,
                0x985A: 0x516D,
                0x985B: 0x9E93,
                0x985C: 0x7984,
                0x985D: 0x808B,
                0x985E: 0x9332,
                0x985F: 0x8AD6,
                0x9860: 0x502D,
                0x9861: 0x548C,
                0x9862: 0x8A71,
                0x9863: 0x6B6A,
                0x9864: 0x8CC4,
                0x9865: 0x8107,
                0x9866: 0x60D1,
                0x9867: 0x67A0,
                0x9868: 0x9DF2,
                0x9869: 0x4E99,
                0x986A: 0x4E98,
                0x986B: 0x9C10,
                0x986C: 0x8A6B,
                0x986D: 0x85C1,
                0x986E: 0x8568,
                0x986F: 0x6900,
                0x9870: 0x6E7E,
                0x9871: 0x7897,
                0x9872: 0x8155,
                0x989F: 0x5F0C,
                0x98A0: 0x4E10,
                0x98A1: 0x4E15,
                0x98A2: 0x4E2A,
                0x98A3: 0x4E31,
                0x98A4: 0x4E36,
                0x98A5: 0x4E3C,
                0x98A6: 0x4E3F,
                0x98A7: 0x4E42,
                0x98A8: 0x4E56,
                0x98A9: 0x4E58,
                0x98AA: 0x4E82,
                0x98AB: 0x4E85,
                0x98AC: 0x8C6B,
                0x98AD: 0x4E8A,
                0x98AE: 0x8212,
                0x98AF: 0x5F0D,
                0x98B0: 0x4E8E,
                0x98B1: 0x4E9E,
                0x98B2: 0x4E9F,
                0x98B3: 0x4EA0,
                0x98B4: 0x4EA2,
                0x98B5: 0x4EB0,
                0x98B6: 0x4EB3,
                0x98B7: 0x4EB6,
                0x98B8: 0x4ECE,
                0x98B9: 0x4ECD,
                0x98BA: 0x4EC4,
                0x98BB: 0x4EC6,
                0x98BC: 0x4EC2,
                0x98BD: 0x4ED7,
                0x98BE: 0x4EDE,
                0x98BF: 0x4EED,
                0x98C0: 0x4EDF,
                0x98C1: 0x4EF7,
                0x98C2: 0x4F09,
                0x98C3: 0x4F5A,
                0x98C4: 0x4F30,
                0x98C5: 0x4F5B,
                0x98C6: 0x4F5D,
                0x98C7: 0x4F57,
                0x98C8: 0x4F47,
                0x98C9: 0x4F76,
                0x98CA: 0x4F88,
                0x98CB: 0x4F8F,
                0x98CC: 0x4F98,
                0x98CD: 0x4F7B,
                0x98CE: 0x4F69,
                0x98CF: 0x4F70,
                0x98D0: 0x4F91,
                0x98D1: 0x4F6F,
                0x98D2: 0x4F86,
                0x98D3: 0x4F96,
                0x98D4: 0x5118,
                0x98D5: 0x4FD4,
                0x98D6: 0x4FDF,
                0x98D7: 0x4FCE,
                0x98D8: 0x4FD8,
                0x98D9: 0x4FDB,
                0x98DA: 0x4FD1,
                0x98DB: 0x4FDA,
                0x98DC: 0x4FD0,
                0x98DD: 0x4FE4,
                0x98DE: 0x4FE5,
                0x98DF: 0x501A,
                0x98E0: 0x5028,
                0x98E1: 0x5014,
                0x98E2: 0x502A,
                0x98E3: 0x5025,
                0x98E4: 0x5005,
                0x98E5: 0x4F1C,
                0x98E6: 0x4FF6,
                0x98E7: 0x5021,
                0x98E8: 0x5029,
                0x98E9: 0x502C,
                0x98EA: 0x4FFE,
                0x98EB: 0x4FEF,
                0x98EC: 0x5011,
                0x98ED: 0x5006,
                0x98EE: 0x5043,
                0x98EF: 0x5047,
                0x98F0: 0x6703,
                0x98F1: 0x5055,
                0x98F2: 0x5050,
                0x98F3: 0x5048,
                0x98F4: 0x505A,
                0x98F5: 0x5056,
                0x98F6: 0x506C,
                0x98F7: 0x5078,
                0x98F8: 0x5080,
                0x98F9: 0x509A,
                0x98FA: 0x5085,
                0x98FB: 0x50B4,
                0x98FC: 0x50B2,
                0x9940: 0x50C9,
                0x9941: 0x50CA,
                0x9942: 0x50B3,
                0x9943: 0x50C2,
                0x9944: 0x50D6,
                0x9945: 0x50DE,
                0x9946: 0x50E5,
                0x9947: 0x50ED,
                0x9948: 0x50E3,
                0x9949: 0x50EE,
                0x994A: 0x50F9,
                0x994B: 0x50F5,
                0x994C: 0x5109,
                0x994D: 0x5101,
                0x994E: 0x5102,
                0x994F: 0x5116,
                0x9950: 0x5115,
                0x9951: 0x5114,
                0x9952: 0x511A,
                0x9953: 0x5121,
                0x9954: 0x513A,
                0x9955: 0x5137,
                0x9956: 0x513C,
                0x9957: 0x513B,
                0x9958: 0x513F,
                0x9959: 0x5140,
                0x995A: 0x5152,
                0x995B: 0x514C,
                0x995C: 0x5154,
                0x995D: 0x5162,
                0x995E: 0x7AF8,
                0x995F: 0x5169,
                0x9960: 0x516A,
                0x9961: 0x516E,
                0x9962: 0x5180,
                0x9963: 0x5182,
                0x9964: 0x56D8,
                0x9965: 0x518C,
                0x9966: 0x5189,
                0x9967: 0x518F,
                0x9968: 0x5191,
                0x9969: 0x5193,
                0x996A: 0x5195,
                0x996B: 0x5196,
                0x996C: 0x51A4,
                0x996D: 0x51A6,
                0x996E: 0x51A2,
                0x996F: 0x51A9,
                0x9970: 0x51AA,
                0x9971: 0x51AB,
                0x9972: 0x51B3,
                0x9973: 0x51B1,
                0x9974: 0x51B2,
                0x9975: 0x51B0,
                0x9976: 0x51B5,
                0x9977: 0x51BD,
                0x9978: 0x51C5,
                0x9979: 0x51C9,
                0x997A: 0x51DB,
                0x997B: 0x51E0,
                0x997C: 0x8655,
                0x997D: 0x51E9,
                0x997E: 0x51ED,
                0x9980: 0x51F0,
                0x9981: 0x51F5,
                0x9982: 0x51FE,
                0x9983: 0x5204,
                0x9984: 0x520B,
                0x9985: 0x5214,
                0x9986: 0x520E,
                0x9987: 0x5227,
                0x9988: 0x522A,
                0x9989: 0x522E,
                0x998A: 0x5233,
                0x998B: 0x5239,
                0x998C: 0x524F,
                0x998D: 0x5244,
                0x998E: 0x524B,
                0x998F: 0x524C,
                0x9990: 0x525E,
                0x9991: 0x5254,
                0x9992: 0x526A,
                0x9993: 0x5274,
                0x9994: 0x5269,
                0x9995: 0x5273,
                0x9996: 0x527F,
                0x9997: 0x527D,
                0x9998: 0x528D,
                0x9999: 0x5294,
                0x999A: 0x5292,
                0x999B: 0x5271,
                0x999C: 0x5288,
                0x999D: 0x5291,
                0x999E: 0x8FA8,
                0x999F: 0x8FA7,
                0x99A0: 0x52AC,
                0x99A1: 0x52AD,
                0x99A2: 0x52BC,
                0x99A3: 0x52B5,
                0x99A4: 0x52C1,
                0x99A5: 0x52CD,
                0x99A6: 0x52D7,
                0x99A7: 0x52DE,
                0x99A8: 0x52E3,
                0x99A9: 0x52E6,
                0x99AA: 0x98ED,
                0x99AB: 0x52E0,
                0x99AC: 0x52F3,
                0x99AD: 0x52F5,
                0x99AE: 0x52F8,
                0x99AF: 0x52F9,
                0x99B0: 0x5306,
                0x99B1: 0x5308,
                0x99B2: 0x7538,
                0x99B3: 0x530D,
                0x99B4: 0x5310,
                0x99B5: 0x530F,
                0x99B6: 0x5315,
                0x99B7: 0x531A,
                0x99B8: 0x5323,
                0x99B9: 0x532F,
                0x99BA: 0x5331,
                0x99BB: 0x5333,
                0x99BC: 0x5338,
                0x99BD: 0x5340,
                0x99BE: 0x5346,
                0x99BF: 0x5345,
                0x99C0: 0x4E17,
                0x99C1: 0x5349,
                0x99C2: 0x534D,
                0x99C3: 0x51D6,
                0x99C4: 0x535E,
                0x99C5: 0x5369,
                0x99C6: 0x536E,
                0x99C7: 0x5918,
                0x99C8: 0x537B,
                0x99C9: 0x5377,
                0x99CA: 0x5382,
                0x99CB: 0x5396,
                0x99CC: 0x53A0,
                0x99CD: 0x53A6,
                0x99CE: 0x53A5,
                0x99CF: 0x53AE,
                0x99D0: 0x53B0,
                0x99D1: 0x53B6,
                0x99D2: 0x53C3,
                0x99D3: 0x7C12,
                0x99D4: 0x96D9,
                0x99D5: 0x53DF,
                0x99D6: 0x66FC,
                0x99D7: 0x71EE,
                0x99D8: 0x53EE,
                0x99D9: 0x53E8,
                0x99DA: 0x53ED,
                0x99DB: 0x53FA,
                0x99DC: 0x5401,
                0x99DD: 0x543D,
                0x99DE: 0x5440,
                0x99DF: 0x542C,
                0x99E0: 0x542D,
                0x99E1: 0x543C,
                0x99E2: 0x542E,
                0x99E3: 0x5436,
                0x99E4: 0x5429,
                0x99E5: 0x541D,
                0x99E6: 0x544E,
                0x99E7: 0x548F,
                0x99E8: 0x5475,
                0x99E9: 0x548E,
                0x99EA: 0x545F,
                0x99EB: 0x5471,
                0x99EC: 0x5477,
                0x99ED: 0x5470,
                0x99EE: 0x5492,
                0x99EF: 0x547B,
                0x99F0: 0x5480,
                0x99F1: 0x5476,
                0x99F2: 0x5484,
                0x99F3: 0x5490,
                0x99F4: 0x5486,
                0x99F5: 0x54C7,
                0x99F6: 0x54A2,
                0x99F7: 0x54B8,
                0x99F8: 0x54A5,
                0x99F9: 0x54AC,
                0x99FA: 0x54C4,
                0x99FB: 0x54C8,
                0x99FC: 0x54A8,
                0x9A40: 0x54AB,
                0x9A41: 0x54C2,
                0x9A42: 0x54A4,
                0x9A43: 0x54BE,
                0x9A44: 0x54BC,
                0x9A45: 0x54D8,
                0x9A46: 0x54E5,
                0x9A47: 0x54E6,
                0x9A48: 0x550F,
                0x9A49: 0x5514,
                0x9A4A: 0x54FD,
                0x9A4B: 0x54EE,
                0x9A4C: 0x54ED,
                0x9A4D: 0x54FA,
                0x9A4E: 0x54E2,
                0x9A4F: 0x5539,
                0x9A50: 0x5540,
                0x9A51: 0x5563,
                0x9A52: 0x554C,
                0x9A53: 0x552E,
                0x9A54: 0x555C,
                0x9A55: 0x5545,
                0x9A56: 0x5556,
                0x9A57: 0x5557,
                0x9A58: 0x5538,
                0x9A59: 0x5533,
                0x9A5A: 0x555D,
                0x9A5B: 0x5599,
                0x9A5C: 0x5580,
                0x9A5D: 0x54AF,
                0x9A5E: 0x558A,
                0x9A5F: 0x559F,
                0x9A60: 0x557B,
                0x9A61: 0x557E,
                0x9A62: 0x5598,
                0x9A63: 0x559E,
                0x9A64: 0x55AE,
                0x9A65: 0x557C,
                0x9A66: 0x5583,
                0x9A67: 0x55A9,
                0x9A68: 0x5587,
                0x9A69: 0x55A8,
                0x9A6A: 0x55DA,
                0x9A6B: 0x55C5,
                0x9A6C: 0x55DF,
                0x9A6D: 0x55C4,
                0x9A6E: 0x55DC,
                0x9A6F: 0x55E4,
                0x9A70: 0x55D4,
                0x9A71: 0x5614,
                0x9A72: 0x55F7,
                0x9A73: 0x5616,
                0x9A74: 0x55FE,
                0x9A75: 0x55FD,
                0x9A76: 0x561B,
                0x9A77: 0x55F9,
                0x9A78: 0x564E,
                0x9A79: 0x5650,
                0x9A7A: 0x71DF,
                0x9A7B: 0x5634,
                0x9A7C: 0x5636,
                0x9A7D: 0x5632,
                0x9A7E: 0x5638,
                0x9A80: 0x566B,
                0x9A81: 0x5664,
                0x9A82: 0x562F,
                0x9A83: 0x566C,
                0x9A84: 0x566A,
                0x9A85: 0x5686,
                0x9A86: 0x5680,
                0x9A87: 0x568A,
                0x9A88: 0x56A0,
                0x9A89: 0x5694,
                0x9A8A: 0x568F,
                0x9A8B: 0x56A5,
                0x9A8C: 0x56AE,
                0x9A8D: 0x56B6,
                0x9A8E: 0x56B4,
                0x9A8F: 0x56C2,
                0x9A90: 0x56BC,
                0x9A91: 0x56C1,
                0x9A92: 0x56C3,
                0x9A93: 0x56C0,
                0x9A94: 0x56C8,
                0x9A95: 0x56CE,
                0x9A96: 0x56D1,
                0x9A97: 0x56D3,
                0x9A98: 0x56D7,
                0x9A99: 0x56EE,
                0x9A9A: 0x56F9,
                0x9A9B: 0x5700,
                0x9A9C: 0x56FF,
                0x9A9D: 0x5704,
                0x9A9E: 0x5709,
                0x9A9F: 0x5708,
                0x9AA0: 0x570B,
                0x9AA1: 0x570D,
                0x9AA2: 0x5713,
                0x9AA3: 0x5718,
                0x9AA4: 0x5716,
                0x9AA5: 0x55C7,
                0x9AA6: 0x571C,
                0x9AA7: 0x5726,
                0x9AA8: 0x5737,
                0x9AA9: 0x5738,
                0x9AAA: 0x574E,
                0x9AAB: 0x573B,
                0x9AAC: 0x5740,
                0x9AAD: 0x574F,
                0x9AAE: 0x5769,
                0x9AAF: 0x57C0,
                0x9AB0: 0x5788,
                0x9AB1: 0x5761,
                0x9AB2: 0x577F,
                0x9AB3: 0x5789,
                0x9AB4: 0x5793,
                0x9AB5: 0x57A0,
                0x9AB6: 0x57B3,
                0x9AB7: 0x57A4,
                0x9AB8: 0x57AA,
                0x9AB9: 0x57B0,
                0x9ABA: 0x57C3,
                0x9ABB: 0x57C6,
                0x9ABC: 0x57D4,
                0x9ABD: 0x57D2,
                0x9ABE: 0x57D3,
                0x9ABF: 0x580A,
                0x9AC0: 0x57D6,
                0x9AC1: 0x57E3,
                0x9AC2: 0x580B,
                0x9AC3: 0x5819,
                0x9AC4: 0x581D,
                0x9AC5: 0x5872,
                0x9AC6: 0x5821,
                0x9AC7: 0x5862,
                0x9AC8: 0x584B,
                0x9AC9: 0x5870,
                0x9ACA: 0x6BC0,
                0x9ACB: 0x5852,
                0x9ACC: 0x583D,
                0x9ACD: 0x5879,
                0x9ACE: 0x5885,
                0x9ACF: 0x58B9,
                0x9AD0: 0x589F,
                0x9AD1: 0x58AB,
                0x9AD2: 0x58BA,
                0x9AD3: 0x58DE,
                0x9AD4: 0x58BB,
                0x9AD5: 0x58B8,
                0x9AD6: 0x58AE,
                0x9AD7: 0x58C5,
                0x9AD8: 0x58D3,
                0x9AD9: 0x58D1,
                0x9ADA: 0x58D7,
                0x9ADB: 0x58D9,
                0x9ADC: 0x58D8,
                0x9ADD: 0x58E5,
                0x9ADE: 0x58DC,
                0x9ADF: 0x58E4,
                0x9AE0: 0x58DF,
                0x9AE1: 0x58EF,
                0x9AE2: 0x58FA,
                0x9AE3: 0x58F9,
                0x9AE4: 0x58FB,
                0x9AE5: 0x58FC,
                0x9AE6: 0x58FD,
                0x9AE7: 0x5902,
                0x9AE8: 0x590A,
                0x9AE9: 0x5910,
                0x9AEA: 0x591B,
                0x9AEB: 0x68A6,
                0x9AEC: 0x5925,
                0x9AED: 0x592C,
                0x9AEE: 0x592D,
                0x9AEF: 0x5932,
                0x9AF0: 0x5938,
                0x9AF1: 0x593E,
                0x9AF2: 0x7AD2,
                0x9AF3: 0x5955,
                0x9AF4: 0x5950,
                0x9AF5: 0x594E,
                0x9AF6: 0x595A,
                0x9AF7: 0x5958,
                0x9AF8: 0x5962,
                0x9AF9: 0x5960,
                0x9AFA: 0x5967,
                0x9AFB: 0x596C,
                0x9AFC: 0x5969,
                0x9B40: 0x5978,
                0x9B41: 0x5981,
                0x9B42: 0x599D,
                0x9B43: 0x4F5E,
                0x9B44: 0x4FAB,
                0x9B45: 0x59A3,
                0x9B46: 0x59B2,
                0x9B47: 0x59C6,
                0x9B48: 0x59E8,
                0x9B49: 0x59DC,
                0x9B4A: 0x598D,
                0x9B4B: 0x59D9,
                0x9B4C: 0x59DA,
                0x9B4D: 0x5A25,
                0x9B4E: 0x5A1F,
                0x9B4F: 0x5A11,
                0x9B50: 0x5A1C,
                0x9B51: 0x5A09,
                0x9B52: 0x5A1A,
                0x9B53: 0x5A40,
                0x9B54: 0x5A6C,
                0x9B55: 0x5A49,
                0x9B56: 0x5A35,
                0x9B57: 0x5A36,
                0x9B58: 0x5A62,
                0x9B59: 0x5A6A,
                0x9B5A: 0x5A9A,
                0x9B5B: 0x5ABC,
                0x9B5C: 0x5ABE,
                0x9B5D: 0x5ACB,
                0x9B5E: 0x5AC2,
                0x9B5F: 0x5ABD,
                0x9B60: 0x5AE3,
                0x9B61: 0x5AD7,
                0x9B62: 0x5AE6,
                0x9B63: 0x5AE9,
                0x9B64: 0x5AD6,
                0x9B65: 0x5AFA,
                0x9B66: 0x5AFB,
                0x9B67: 0x5B0C,
                0x9B68: 0x5B0B,
                0x9B69: 0x5B16,
                0x9B6A: 0x5B32,
                0x9B6B: 0x5AD0,
                0x9B6C: 0x5B2A,
                0x9B6D: 0x5B36,
                0x9B6E: 0x5B3E,
                0x9B6F: 0x5B43,
                0x9B70: 0x5B45,
                0x9B71: 0x5B40,
                0x9B72: 0x5B51,
                0x9B73: 0x5B55,
                0x9B74: 0x5B5A,
                0x9B75: 0x5B5B,
                0x9B76: 0x5B65,
                0x9B77: 0x5B69,
                0x9B78: 0x5B70,
                0x9B79: 0x5B73,
                0x9B7A: 0x5B75,
                0x9B7B: 0x5B78,
                0x9B7C: 0x6588,
                0x9B7D: 0x5B7A,
                0x9B7E: 0x5B80,
                0x9B80: 0x5B83,
                0x9B81: 0x5BA6,
                0x9B82: 0x5BB8,
                0x9B83: 0x5BC3,
                0x9B84: 0x5BC7,
                0x9B85: 0x5BC9,
                0x9B86: 0x5BD4,
                0x9B87: 0x5BD0,
                0x9B88: 0x5BE4,
                0x9B89: 0x5BE6,
                0x9B8A: 0x5BE2,
                0x9B8B: 0x5BDE,
                0x9B8C: 0x5BE5,
                0x9B8D: 0x5BEB,
                0x9B8E: 0x5BF0,
                0x9B8F: 0x5BF6,
                0x9B90: 0x5BF3,
                0x9B91: 0x5C05,
                0x9B92: 0x5C07,
                0x9B93: 0x5C08,
                0x9B94: 0x5C0D,
                0x9B95: 0x5C13,
                0x9B96: 0x5C20,
                0x9B97: 0x5C22,
                0x9B98: 0x5C28,
                0x9B99: 0x5C38,
                0x9B9A: 0x5C39,
                0x9B9B: 0x5C41,
                0x9B9C: 0x5C46,
                0x9B9D: 0x5C4E,
                0x9B9E: 0x5C53,
                0x9B9F: 0x5C50,
                0x9BA0: 0x5C4F,
                0x9BA1: 0x5B71,
                0x9BA2: 0x5C6C,
                0x9BA3: 0x5C6E,
                0x9BA4: 0x4E62,
                0x9BA5: 0x5C76,
                0x9BA6: 0x5C79,
                0x9BA7: 0x5C8C,
                0x9BA8: 0x5C91,
                0x9BA9: 0x5C94,
                0x9BAA: 0x599B,
                0x9BAB: 0x5CAB,
                0x9BAC: 0x5CBB,
                0x9BAD: 0x5CB6,
                0x9BAE: 0x5CBC,
                0x9BAF: 0x5CB7,
                0x9BB0: 0x5CC5,
                0x9BB1: 0x5CBE,
                0x9BB2: 0x5CC7,
                0x9BB3: 0x5CD9,
                0x9BB4: 0x5CE9,
                0x9BB5: 0x5CFD,
                0x9BB6: 0x5CFA,
                0x9BB7: 0x5CED,
                0x9BB8: 0x5D8C,
                0x9BB9: 0x5CEA,
                0x9BBA: 0x5D0B,
                0x9BBB: 0x5D15,
                0x9BBC: 0x5D17,
                0x9BBD: 0x5D5C,
                0x9BBE: 0x5D1F,
                0x9BBF: 0x5D1B,
                0x9BC0: 0x5D11,
                0x9BC1: 0x5D14,
                0x9BC2: 0x5D22,
                0x9BC3: 0x5D1A,
                0x9BC4: 0x5D19,
                0x9BC5: 0x5D18,
                0x9BC6: 0x5D4C,
                0x9BC7: 0x5D52,
                0x9BC8: 0x5D4E,
                0x9BC9: 0x5D4B,
                0x9BCA: 0x5D6C,
                0x9BCB: 0x5D73,
                0x9BCC: 0x5D76,
                0x9BCD: 0x5D87,
                0x9BCE: 0x5D84,
                0x9BCF: 0x5D82,
                0x9BD0: 0x5DA2,
                0x9BD1: 0x5D9D,
                0x9BD2: 0x5DAC,
                0x9BD3: 0x5DAE,
                0x9BD4: 0x5DBD,
                0x9BD5: 0x5D90,
                0x9BD6: 0x5DB7,
                0x9BD7: 0x5DBC,
                0x9BD8: 0x5DC9,
                0x9BD9: 0x5DCD,
                0x9BDA: 0x5DD3,
                0x9BDB: 0x5DD2,
                0x9BDC: 0x5DD6,
                0x9BDD: 0x5DDB,
                0x9BDE: 0x5DEB,
                0x9BDF: 0x5DF2,
                0x9BE0: 0x5DF5,
                0x9BE1: 0x5E0B,
                0x9BE2: 0x5E1A,
                0x9BE3: 0x5E19,
                0x9BE4: 0x5E11,
                0x9BE5: 0x5E1B,
                0x9BE6: 0x5E36,
                0x9BE7: 0x5E37,
                0x9BE8: 0x5E44,
                0x9BE9: 0x5E43,
                0x9BEA: 0x5E40,
                0x9BEB: 0x5E4E,
                0x9BEC: 0x5E57,
                0x9BED: 0x5E54,
                0x9BEE: 0x5E5F,
                0x9BEF: 0x5E62,
                0x9BF0: 0x5E64,
                0x9BF1: 0x5E47,
                0x9BF2: 0x5E75,
                0x9BF3: 0x5E76,
                0x9BF4: 0x5E7A,
                0x9BF5: 0x9EBC,
                0x9BF6: 0x5E7F,
                0x9BF7: 0x5EA0,
                0x9BF8: 0x5EC1,
                0x9BF9: 0x5EC2,
                0x9BFA: 0x5EC8,
                0x9BFB: 0x5ED0,
                0x9BFC: 0x5ECF,
                0x9C40: 0x5ED6,
                0x9C41: 0x5EE3,
                0x9C42: 0x5EDD,
                0x9C43: 0x5EDA,
                0x9C44: 0x5EDB,
                0x9C45: 0x5EE2,
                0x9C46: 0x5EE1,
                0x9C47: 0x5EE8,
                0x9C48: 0x5EE9,
                0x9C49: 0x5EEC,
                0x9C4A: 0x5EF1,
                0x9C4B: 0x5EF3,
                0x9C4C: 0x5EF0,
                0x9C4D: 0x5EF4,
                0x9C4E: 0x5EF8,
                0x9C4F: 0x5EFE,
                0x9C50: 0x5F03,
                0x9C51: 0x5F09,
                0x9C52: 0x5F5D,
                0x9C53: 0x5F5C,
                0x9C54: 0x5F0B,
                0x9C55: 0x5F11,
                0x9C56: 0x5F16,
                0x9C57: 0x5F29,
                0x9C58: 0x5F2D,
                0x9C59: 0x5F38,
                0x9C5A: 0x5F41,
                0x9C5B: 0x5F48,
                0x9C5C: 0x5F4C,
                0x9C5D: 0x5F4E,
                0x9C5E: 0x5F2F,
                0x9C5F: 0x5F51,
                0x9C60: 0x5F56,
                0x9C61: 0x5F57,
                0x9C62: 0x5F59,
                0x9C63: 0x5F61,
                0x9C64: 0x5F6D,
                0x9C65: 0x5F73,
                0x9C66: 0x5F77,
                0x9C67: 0x5F83,
                0x9C68: 0x5F82,
                0x9C69: 0x5F7F,
                0x9C6A: 0x5F8A,
                0x9C6B: 0x5F88,
                0x9C6C: 0x5F91,
                0x9C6D: 0x5F87,
                0x9C6E: 0x5F9E,
                0x9C6F: 0x5F99,
                0x9C70: 0x5F98,
                0x9C71: 0x5FA0,
                0x9C72: 0x5FA8,
                0x9C73: 0x5FAD,
                0x9C74: 0x5FBC,
                0x9C75: 0x5FD6,
                0x9C76: 0x5FFB,
                0x9C77: 0x5FE4,
                0x9C78: 0x5FF8,
                0x9C79: 0x5FF1,
                0x9C7A: 0x5FDD,
                0x9C7B: 0x60B3,
                0x9C7C: 0x5FFF,
                0x9C7D: 0x6021,
                0x9C7E: 0x6060,
                0x9C80: 0x6019,
                0x9C81: 0x6010,
                0x9C82: 0x6029,
                0x9C83: 0x600E,
                0x9C84: 0x6031,
                0x9C85: 0x601B,
                0x9C86: 0x6015,
                0x9C87: 0x602B,
                0x9C88: 0x6026,
                0x9C89: 0x600F,
                0x9C8A: 0x603A,
                0x9C8B: 0x605A,
                0x9C8C: 0x6041,
                0x9C8D: 0x606A,
                0x9C8E: 0x6077,
                0x9C8F: 0x605F,
                0x9C90: 0x604A,
                0x9C91: 0x6046,
                0x9C92: 0x604D,
                0x9C93: 0x6063,
                0x9C94: 0x6043,
                0x9C95: 0x6064,
                0x9C96: 0x6042,
                0x9C97: 0x606C,
                0x9C98: 0x606B,
                0x9C99: 0x6059,
                0x9C9A: 0x6081,
                0x9C9B: 0x608D,
                0x9C9C: 0x60E7,
                0x9C9D: 0x6083,
                0x9C9E: 0x609A,
                0x9C9F: 0x6084,
                0x9CA0: 0x609B,
                0x9CA1: 0x6096,
                0x9CA2: 0x6097,
                0x9CA3: 0x6092,
                0x9CA4: 0x60A7,
                0x9CA5: 0x608B,
                0x9CA6: 0x60E1,
                0x9CA7: 0x60B8,
                0x9CA8: 0x60E0,
                0x9CA9: 0x60D3,
                0x9CAA: 0x60B4,
                0x9CAB: 0x5FF0,
                0x9CAC: 0x60BD,
                0x9CAD: 0x60C6,
                0x9CAE: 0x60B5,
                0x9CAF: 0x60D8,
                0x9CB0: 0x614D,
                0x9CB1: 0x6115,
                0x9CB2: 0x6106,
                0x9CB3: 0x60F6,
                0x9CB4: 0x60F7,
                0x9CB5: 0x6100,
                0x9CB6: 0x60F4,
                0x9CB7: 0x60FA,
                0x9CB8: 0x6103,
                0x9CB9: 0x6121,
                0x9CBA: 0x60FB,
                0x9CBB: 0x60F1,
                0x9CBC: 0x610D,
                0x9CBD: 0x610E,
                0x9CBE: 0x6147,
                0x9CBF: 0x613E,
                0x9CC0: 0x6128,
                0x9CC1: 0x6127,
                0x9CC2: 0x614A,
                0x9CC3: 0x613F,
                0x9CC4: 0x613C,
                0x9CC5: 0x612C,
                0x9CC6: 0x6134,
                0x9CC7: 0x613D,
                0x9CC8: 0x6142,
                0x9CC9: 0x6144,
                0x9CCA: 0x6173,
                0x9CCB: 0x6177,
                0x9CCC: 0x6158,
                0x9CCD: 0x6159,
                0x9CCE: 0x615A,
                0x9CCF: 0x616B,
                0x9CD0: 0x6174,
                0x9CD1: 0x616F,
                0x9CD2: 0x6165,
                0x9CD3: 0x6171,
                0x9CD4: 0x615F,
                0x9CD5: 0x615D,
                0x9CD6: 0x6153,
                0x9CD7: 0x6175,
                0x9CD8: 0x6199,
                0x9CD9: 0x6196,
                0x9CDA: 0x6187,
                0x9CDB: 0x61AC,
                0x9CDC: 0x6194,
                0x9CDD: 0x619A,
                0x9CDE: 0x618A,
                0x9CDF: 0x6191,
                0x9CE0: 0x61AB,
                0x9CE1: 0x61AE,
                0x9CE2: 0x61CC,
                0x9CE3: 0x61CA,
                0x9CE4: 0x61C9,
                0x9CE5: 0x61F7,
                0x9CE6: 0x61C8,
                0x9CE7: 0x61C3,
                0x9CE8: 0x61C6,
                0x9CE9: 0x61BA,
                0x9CEA: 0x61CB,
                0x9CEB: 0x7F79,
                0x9CEC: 0x61CD,
                0x9CED: 0x61E6,
                0x9CEE: 0x61E3,
                0x9CEF: 0x61F6,
                0x9CF0: 0x61FA,
                0x9CF1: 0x61F4,
                0x9CF2: 0x61FF,
                0x9CF3: 0x61FD,
                0x9CF4: 0x61FC,
                0x9CF5: 0x61FE,
                0x9CF6: 0x6200,
                0x9CF7: 0x6208,
                0x9CF8: 0x6209,
                0x9CF9: 0x620D,
                0x9CFA: 0x620C,
                0x9CFB: 0x6214,
                0x9CFC: 0x621B,
                0x9D40: 0x621E,
                0x9D41: 0x6221,
                0x9D42: 0x622A,
                0x9D43: 0x622E,
                0x9D44: 0x6230,
                0x9D45: 0x6232,
                0x9D46: 0x6233,
                0x9D47: 0x6241,
                0x9D48: 0x624E,
                0x9D49: 0x625E,
                0x9D4A: 0x6263,
                0x9D4B: 0x625B,
                0x9D4C: 0x6260,
                0x9D4D: 0x6268,
                0x9D4E: 0x627C,
                0x9D4F: 0x6282,
                0x9D50: 0x6289,
                0x9D51: 0x627E,
                0x9D52: 0x6292,
                0x9D53: 0x6293,
                0x9D54: 0x6296,
                0x9D55: 0x62D4,
                0x9D56: 0x6283,
                0x9D57: 0x6294,
                0x9D58: 0x62D7,
                0x9D59: 0x62D1,
                0x9D5A: 0x62BB,
                0x9D5B: 0x62CF,
                0x9D5C: 0x62FF,
                0x9D5D: 0x62C6,
                0x9D5E: 0x64D4,
                0x9D5F: 0x62C8,
                0x9D60: 0x62DC,
                0x9D61: 0x62CC,
                0x9D62: 0x62CA,
                0x9D63: 0x62C2,
                0x9D64: 0x62C7,
                0x9D65: 0x629B,
                0x9D66: 0x62C9,
                0x9D67: 0x630C,
                0x9D68: 0x62EE,
                0x9D69: 0x62F1,
                0x9D6A: 0x6327,
                0x9D6B: 0x6302,
                0x9D6C: 0x6308,
                0x9D6D: 0x62EF,
                0x9D6E: 0x62F5,
                0x9D6F: 0x6350,
                0x9D70: 0x633E,
                0x9D71: 0x634D,
                0x9D72: 0x641C,
                0x9D73: 0x634F,
                0x9D74: 0x6396,
                0x9D75: 0x638E,
                0x9D76: 0x6380,
                0x9D77: 0x63AB,
                0x9D78: 0x6376,
                0x9D79: 0x63A3,
                0x9D7A: 0x638F,
                0x9D7B: 0x6389,
                0x9D7C: 0x639F,
                0x9D7D: 0x63B5,
                0x9D7E: 0x636B,
                0x9D80: 0x6369,
                0x9D81: 0x63BE,
                0x9D82: 0x63E9,
                0x9D83: 0x63C0,
                0x9D84: 0x63C6,
                0x9D85: 0x63E3,
                0x9D86: 0x63C9,
                0x9D87: 0x63D2,
                0x9D88: 0x63F6,
                0x9D89: 0x63C4,
                0x9D8A: 0x6416,
                0x9D8B: 0x6434,
                0x9D8C: 0x6406,
                0x9D8D: 0x6413,
                0x9D8E: 0x6426,
                0x9D8F: 0x6436,
                0x9D90: 0x651D,
                0x9D91: 0x6417,
                0x9D92: 0x6428,
                0x9D93: 0x640F,
                0x9D94: 0x6467,
                0x9D95: 0x646F,
                0x9D96: 0x6476,
                0x9D97: 0x644E,
                0x9D98: 0x652A,
                0x9D99: 0x6495,
                0x9D9A: 0x6493,
                0x9D9B: 0x64A5,
                0x9D9C: 0x64A9,
                0x9D9D: 0x6488,
                0x9D9E: 0x64BC,
                0x9D9F: 0x64DA,
                0x9DA0: 0x64D2,
                0x9DA1: 0x64C5,
                0x9DA2: 0x64C7,
                0x9DA3: 0x64BB,
                0x9DA4: 0x64D8,
                0x9DA5: 0x64C2,
                0x9DA6: 0x64F1,
                0x9DA7: 0x64E7,
                0x9DA8: 0x8209,
                0x9DA9: 0x64E0,
                0x9DAA: 0x64E1,
                0x9DAB: 0x62AC,
                0x9DAC: 0x64E3,
                0x9DAD: 0x64EF,
                0x9DAE: 0x652C,
                0x9DAF: 0x64F6,
                0x9DB0: 0x64F4,
                0x9DB1: 0x64F2,
                0x9DB2: 0x64FA,
                0x9DB3: 0x6500,
                0x9DB4: 0x64FD,
                0x9DB5: 0x6518,
                0x9DB6: 0x651C,
                0x9DB7: 0x6505,
                0x9DB8: 0x6524,
                0x9DB9: 0x6523,
                0x9DBA: 0x652B,
                0x9DBB: 0x6534,
                0x9DBC: 0x6535,
                0x9DBD: 0x6537,
                0x9DBE: 0x6536,
                0x9DBF: 0x6538,
                0x9DC0: 0x754B,
                0x9DC1: 0x6548,
                0x9DC2: 0x6556,
                0x9DC3: 0x6555,
                0x9DC4: 0x654D,
                0x9DC5: 0x6558,
                0x9DC6: 0x655E,
                0x9DC7: 0x655D,
                0x9DC8: 0x6572,
                0x9DC9: 0x6578,
                0x9DCA: 0x6582,
                0x9DCB: 0x6583,
                0x9DCC: 0x8B8A,
                0x9DCD: 0x659B,
                0x9DCE: 0x659F,
                0x9DCF: 0x65AB,
                0x9DD0: 0x65B7,
                0x9DD1: 0x65C3,
                0x9DD2: 0x65C6,
                0x9DD3: 0x65C1,
                0x9DD4: 0x65C4,
                0x9DD5: 0x65CC,
                0x9DD6: 0x65D2,
                0x9DD7: 0x65DB,
                0x9DD8: 0x65D9,
                0x9DD9: 0x65E0,
                0x9DDA: 0x65E1,
                0x9DDB: 0x65F1,
                0x9DDC: 0x6772,
                0x9DDD: 0x660A,
                0x9DDE: 0x6603,
                0x9DDF: 0x65FB,
                0x9DE0: 0x6773,
                0x9DE1: 0x6635,
                0x9DE2: 0x6636,
                0x9DE3: 0x6634,
                0x9DE4: 0x661C,
                0x9DE5: 0x664F,
                0x9DE6: 0x6644,
                0x9DE7: 0x6649,
                0x9DE8: 0x6641,
                0x9DE9: 0x665E,
                0x9DEA: 0x665D,
                0x9DEB: 0x6664,
                0x9DEC: 0x6667,
                0x9DED: 0x6668,
                0x9DEE: 0x665F,
                0x9DEF: 0x6662,
                0x9DF0: 0x6670,
                0x9DF1: 0x6683,
                0x9DF2: 0x6688,
                0x9DF3: 0x668E,
                0x9DF4: 0x6689,
                0x9DF5: 0x6684,
                0x9DF6: 0x6698,
                0x9DF7: 0x669D,
                0x9DF8: 0x66C1,
                0x9DF9: 0x66B9,
                0x9DFA: 0x66C9,
                0x9DFB: 0x66BE,
                0x9DFC: 0x66BC,
                0x9E40: 0x66C4,
                0x9E41: 0x66B8,
                0x9E42: 0x66D6,
                0x9E43: 0x66DA,
                0x9E44: 0x66E0,
                0x9E45: 0x663F,
                0x9E46: 0x66E6,
                0x9E47: 0x66E9,
                0x9E48: 0x66F0,
                0x9E49: 0x66F5,
                0x9E4A: 0x66F7,
                0x9E4B: 0x670F,
                0x9E4C: 0x6716,
                0x9E4D: 0x671E,
                0x9E4E: 0x6726,
                0x9E4F: 0x6727,
                0x9E50: 0x9738,
                0x9E51: 0x672E,
                0x9E52: 0x673F,
                0x9E53: 0x6736,
                0x9E54: 0x6741,
                0x9E55: 0x6738,
                0x9E56: 0x6737,
                0x9E57: 0x6746,
                0x9E58: 0x675E,
                0x9E59: 0x6760,
                0x9E5A: 0x6759,
                0x9E5B: 0x6763,
                0x9E5C: 0x6764,
                0x9E5D: 0x6789,
                0x9E5E: 0x6770,
                0x9E5F: 0x67A9,
                0x9E60: 0x677C,
                0x9E61: 0x676A,
                0x9E62: 0x678C,
                0x9E63: 0x678B,
                0x9E64: 0x67A6,
                0x9E65: 0x67A1,
                0x9E66: 0x6785,
                0x9E67: 0x67B7,
                0x9E68: 0x67EF,
                0x9E69: 0x67B4,
                0x9E6A: 0x67EC,
                0x9E6B: 0x67B3,
                0x9E6C: 0x67E9,
                0x9E6D: 0x67B8,
                0x9E6E: 0x67E4,
                0x9E6F: 0x67DE,
                0x9E70: 0x67DD,
                0x9E71: 0x67E2,
                0x9E72: 0x67EE,
                0x9E73: 0x67B9,
                0x9E74: 0x67CE,
                0x9E75: 0x67C6,
                0x9E76: 0x67E7,
                0x9E77: 0x6A9C,
                0x9E78: 0x681E,
                0x9E79: 0x6846,
                0x9E7A: 0x6829,
                0x9E7B: 0x6840,
                0x9E7C: 0x684D,
                0x9E7D: 0x6832,
                0x9E7E: 0x684E,
                0x9E80: 0x68B3,
                0x9E81: 0x682B,
                0x9E82: 0x6859,
                0x9E83: 0x6863,
                0x9E84: 0x6877,
                0x9E85: 0x687F,
                0x9E86: 0x689F,
                0x9E87: 0x688F,
                0x9E88: 0x68AD,
                0x9E89: 0x6894,
                0x9E8A: 0x689D,
                0x9E8B: 0x689B,
                0x9E8C: 0x6883,
                0x9E8D: 0x6AAE,
                0x9E8E: 0x68B9,
                0x9E8F: 0x6874,
                0x9E90: 0x68B5,
                0x9E91: 0x68A0,
                0x9E92: 0x68BA,
                0x9E93: 0x690F,
                0x9E94: 0x688D,
                0x9E95: 0x687E,
                0x9E96: 0x6901,
                0x9E97: 0x68CA,
                0x9E98: 0x6908,
                0x9E99: 0x68D8,
                0x9E9A: 0x6922,
                0x9E9B: 0x6926,
                0x9E9C: 0x68E1,
                0x9E9D: 0x690C,
                0x9E9E: 0x68CD,
                0x9E9F: 0x68D4,
                0x9EA0: 0x68E7,
                0x9EA1: 0x68D5,
                0x9EA2: 0x6936,
                0x9EA3: 0x6912,
                0x9EA4: 0x6904,
                0x9EA5: 0x68D7,
                0x9EA6: 0x68E3,
                0x9EA7: 0x6925,
                0x9EA8: 0x68F9,
                0x9EA9: 0x68E0,
                0x9EAA: 0x68EF,
                0x9EAB: 0x6928,
                0x9EAC: 0x692A,
                0x9EAD: 0x691A,
                0x9EAE: 0x6923,
                0x9EAF: 0x6921,
                0x9EB0: 0x68C6,
                0x9EB1: 0x6979,
                0x9EB2: 0x6977,
                0x9EB3: 0x695C,
                0x9EB4: 0x6978,
                0x9EB5: 0x696B,
                0x9EB6: 0x6954,
                0x9EB7: 0x697E,
                0x9EB8: 0x696E,
                0x9EB9: 0x6939,
                0x9EBA: 0x6974,
                0x9EBB: 0x693D,
                0x9EBC: 0x6959,
                0x9EBD: 0x6930,
                0x9EBE: 0x6961,
                0x9EBF: 0x695E,
                0x9EC0: 0x695D,
                0x9EC1: 0x6981,
                0x9EC2: 0x696A,
                0x9EC3: 0x69B2,
                0x9EC4: 0x69AE,
                0x9EC5: 0x69D0,
                0x9EC6: 0x69BF,
                0x9EC7: 0x69C1,
                0x9EC8: 0x69D3,
                0x9EC9: 0x69BE,
                0x9ECA: 0x69CE,
                0x9ECB: 0x5BE8,
                0x9ECC: 0x69CA,
                0x9ECD: 0x69DD,
                0x9ECE: 0x69BB,
                0x9ECF: 0x69C3,
                0x9ED0: 0x69A7,
                0x9ED1: 0x6A2E,
                0x9ED2: 0x6991,
                0x9ED3: 0x69A0,
                0x9ED4: 0x699C,
                0x9ED5: 0x6995,
                0x9ED6: 0x69B4,
                0x9ED7: 0x69DE,
                0x9ED8: 0x69E8,
                0x9ED9: 0x6A02,
                0x9EDA: 0x6A1B,
                0x9EDB: 0x69FF,
                0x9EDC: 0x6B0A,
                0x9EDD: 0x69F9,
                0x9EDE: 0x69F2,
                0x9EDF: 0x69E7,
                0x9EE0: 0x6A05,
                0x9EE1: 0x69B1,
                0x9EE2: 0x6A1E,
                0x9EE3: 0x69ED,
                0x9EE4: 0x6A14,
                0x9EE5: 0x69EB,
                0x9EE6: 0x6A0A,
                0x9EE7: 0x6A12,
                0x9EE8: 0x6AC1,
                0x9EE9: 0x6A23,
                0x9EEA: 0x6A13,
                0x9EEB: 0x6A44,
                0x9EEC: 0x6A0C,
                0x9EED: 0x6A72,
                0x9EEE: 0x6A36,
                0x9EEF: 0x6A78,
                0x9EF0: 0x6A47,
                0x9EF1: 0x6A62,
                0x9EF2: 0x6A59,
                0x9EF3: 0x6A66,
                0x9EF4: 0x6A48,
                0x9EF5: 0x6A38,
                0x9EF6: 0x6A22,
                0x9EF7: 0x6A90,
                0x9EF8: 0x6A8D,
                0x9EF9: 0x6AA0,
                0x9EFA: 0x6A84,
                0x9EFB: 0x6AA2,
                0x9EFC: 0x6AA3,
                0x9F40: 0x6A97,
                0x9F41: 0x8617,
                0x9F42: 0x6ABB,
                0x9F43: 0x6AC3,
                0x9F44: 0x6AC2,
                0x9F45: 0x6AB8,
                0x9F46: 0x6AB3,
                0x9F47: 0x6AAC,
                0x9F48: 0x6ADE,
                0x9F49: 0x6AD1,
                0x9F4A: 0x6ADF,
                0x9F4B: 0x6AAA,
                0x9F4C: 0x6ADA,
                0x9F4D: 0x6AEA,
                0x9F4E: 0x6AFB,
                0x9F4F: 0x6B05,
                0x9F50: 0x8616,
                0x9F51: 0x6AFA,
                0x9F52: 0x6B12,
                0x9F53: 0x6B16,
                0x9F54: 0x9B31,
                0x9F55: 0x6B1F,
                0x9F56: 0x6B38,
                0x9F57: 0x6B37,
                0x9F58: 0x76DC,
                0x9F59: 0x6B39,
                0x9F5A: 0x98EE,
                0x9F5B: 0x6B47,
                0x9F5C: 0x6B43,
                0x9F5D: 0x6B49,
                0x9F5E: 0x6B50,
                0x9F5F: 0x6B59,
                0x9F60: 0x6B54,
                0x9F61: 0x6B5B,
                0x9F62: 0x6B5F,
                0x9F63: 0x6B61,
                0x9F64: 0x6B78,
                0x9F65: 0x6B79,
                0x9F66: 0x6B7F,
                0x9F67: 0x6B80,
                0x9F68: 0x6B84,
                0x9F69: 0x6B83,
                0x9F6A: 0x6B8D,
                0x9F6B: 0x6B98,
                0x9F6C: 0x6B95,
                0x9F6D: 0x6B9E,
                0x9F6E: 0x6BA4,
                0x9F6F: 0x6BAA,
                0x9F70: 0x6BAB,
                0x9F71: 0x6BAF,
                0x9F72: 0x6BB2,
                0x9F73: 0x6BB1,
                0x9F74: 0x6BB3,
                0x9F75: 0x6BB7,
                0x9F76: 0x6BBC,
                0x9F77: 0x6BC6,
                0x9F78: 0x6BCB,
                0x9F79: 0x6BD3,
                0x9F7A: 0x6BDF,
                0x9F7B: 0x6BEC,
                0x9F7C: 0x6BEB,
                0x9F7D: 0x6BF3,
                0x9F7E: 0x6BEF,
                0x9F80: 0x9EBE,
                0x9F81: 0x6C08,
                0x9F82: 0x6C13,
                0x9F83: 0x6C14,
                0x9F84: 0x6C1B,
                0x9F85: 0x6C24,
                0x9F86: 0x6C23,
                0x9F87: 0x6C5E,
                0x9F88: 0x6C55,
                0x9F89: 0x6C62,
                0x9F8A: 0x6C6A,
                0x9F8B: 0x6C82,
                0x9F8C: 0x6C8D,
                0x9F8D: 0x6C9A,
                0x9F8E: 0x6C81,
                0x9F8F: 0x6C9B,
                0x9F90: 0x6C7E,
                0x9F91: 0x6C68,
                0x9F92: 0x6C73,
                0x9F93: 0x6C92,
                0x9F94: 0x6C90,
                0x9F95: 0x6CC4,
                0x9F96: 0x6CF1,
                0x9F97: 0x6CD3,
                0x9F98: 0x6CBD,
                0x9F99: 0x6CD7,
                0x9F9A: 0x6CC5,
                0x9F9B: 0x6CDD,
                0x9F9C: 0x6CAE,
                0x9F9D: 0x6CB1,
                0x9F9E: 0x6CBE,
                0x9F9F: 0x6CBA,
                0x9FA0: 0x6CDB,
                0x9FA1: 0x6CEF,
                0x9FA2: 0x6CD9,
                0x9FA3: 0x6CEA,
                0x9FA4: 0x6D1F,
                0x9FA5: 0x884D,
                0x9FA6: 0x6D36,
                0x9FA7: 0x6D2B,
                0x9FA8: 0x6D3D,
                0x9FA9: 0x6D38,
                0x9FAA: 0x6D19,
                0x9FAB: 0x6D35,
                0x9FAC: 0x6D33,
                0x9FAD: 0x6D12,
                0x9FAE: 0x6D0C,
                0x9FAF: 0x6D63,
                0x9FB0: 0x6D93,
                0x9FB1: 0x6D64,
                0x9FB2: 0x6D5A,
                0x9FB3: 0x6D79,
                0x9FB4: 0x6D59,
                0x9FB5: 0x6D8E,
                0x9FB6: 0x6D95,
                0x9FB7: 0x6FE4,
                0x9FB8: 0x6D85,
                0x9FB9: 0x6DF9,
                0x9FBA: 0x6E15,
                0x9FBB: 0x6E0A,
                0x9FBC: 0x6DB5,
                0x9FBD: 0x6DC7,
                0x9FBE: 0x6DE6,
                0x9FBF: 0x6DB8,
                0x9FC0: 0x6DC6,
                0x9FC1: 0x6DEC,
                0x9FC2: 0x6DDE,
                0x9FC3: 0x6DCC,
                0x9FC4: 0x6DE8,
                0x9FC5: 0x6DD2,
                0x9FC6: 0x6DC5,
                0x9FC7: 0x6DFA,
                0x9FC8: 0x6DD9,
                0x9FC9: 0x6DE4,
                0x9FCA: 0x6DD5,
                0x9FCB: 0x6DEA,
                0x9FCC: 0x6DEE,
                0x9FCD: 0x6E2D,
                0x9FCE: 0x6E6E,
                0x9FCF: 0x6E2E,
                0x9FD0: 0x6E19,
                0x9FD1: 0x6E72,
                0x9FD2: 0x6E5F,
                0x9FD3: 0x6E3E,
                0x9FD4: 0x6E23,
                0x9FD5: 0x6E6B,
                0x9FD6: 0x6E2B,
                0x9FD7: 0x6E76,
                0x9FD8: 0x6E4D,
                0x9FD9: 0x6E1F,
                0x9FDA: 0x6E43,
                0x9FDB: 0x6E3A,
                0x9FDC: 0x6E4E,
                0x9FDD: 0x6E24,
                0x9FDE: 0x6EFF,
                0x9FDF: 0x6E1D,
                0x9FE0: 0x6E38,
                0x9FE1: 0x6E82,
                0x9FE2: 0x6EAA,
                0x9FE3: 0x6E98,
                0x9FE4: 0x6EC9,
                0x9FE5: 0x6EB7,
                0x9FE6: 0x6ED3,
                0x9FE7: 0x6EBD,
                0x9FE8: 0x6EAF,
                0x9FE9: 0x6EC4,
                0x9FEA: 0x6EB2,
                0x9FEB: 0x6ED4,
                0x9FEC: 0x6ED5,
                0x9FED: 0x6E8F,
                0x9FEE: 0x6EA5,
                0x9FEF: 0x6EC2,
                0x9FF0: 0x6E9F,
                0x9FF1: 0x6F41,
                0x9FF2: 0x6F11,
                0x9FF3: 0x704C,
                0x9FF4: 0x6EEC,
                0x9FF5: 0x6EF8,
                0x9FF6: 0x6EFE,
                0x9FF7: 0x6F3F,
                0x9FF8: 0x6EF2,
                0x9FF9: 0x6F31,
                0x9FFA: 0x6EEF,
                0x9FFB: 0x6F32,
                0x9FFC: 0x6ECC,
                0xA1: 0xFF61,
                0xA2: 0xFF62,
                0xA3: 0xFF63,
                0xA4: 0xFF64,
                0xA5: 0xFF65,
                0xA6: 0xFF66,
                0xA7: 0xFF67,
                0xA8: 0xFF68,
                0xA9: 0xFF69,
                0xAA: 0xFF6A,
                0xAB: 0xFF6B,
                0xAC: 0xFF6C,
                0xAD: 0xFF6D,
                0xAE: 0xFF6E,
                0xAF: 0xFF6F,
                0xB0: 0xFF70,
                0xB1: 0xFF71,
                0xB2: 0xFF72,
                0xB3: 0xFF73,
                0xB4: 0xFF74,
                0xB5: 0xFF75,
                0xB6: 0xFF76,
                0xB7: 0xFF77,
                0xB8: 0xFF78,
                0xB9: 0xFF79,
                0xBA: 0xFF7A,
                0xBB: 0xFF7B,
                0xBC: 0xFF7C,
                0xBD: 0xFF7D,
                0xBE: 0xFF7E,
                0xBF: 0xFF7F,
                0xC0: 0xFF80,
                0xC1: 0xFF81,
                0xC2: 0xFF82,
                0xC3: 0xFF83,
                0xC4: 0xFF84,
                0xC5: 0xFF85,
                0xC6: 0xFF86,
                0xC7: 0xFF87,
                0xC8: 0xFF88,
                0xC9: 0xFF89,
                0xCA: 0xFF8A,
                0xCB: 0xFF8B,
                0xCC: 0xFF8C,
                0xCD: 0xFF8D,
                0xCE: 0xFF8E,
                0xCF: 0xFF8F,
                0xD0: 0xFF90,
                0xD1: 0xFF91,
                0xD2: 0xFF92,
                0xD3: 0xFF93,
                0xD4: 0xFF94,
                0xD5: 0xFF95,
                0xD6: 0xFF96,
                0xD7: 0xFF97,
                0xD8: 0xFF98,
                0xD9: 0xFF99,
                0xDA: 0xFF9A,
                0xDB: 0xFF9B,
                0xDC: 0xFF9C,
                0xDD: 0xFF9D,
                0xDE: 0xFF9E,
                0xDF: 0xFF9F,
                0xE040: 0x6F3E,
                0xE041: 0x6F13,
                0xE042: 0x6EF7,
                0xE043: 0x6F86,
                0xE044: 0x6F7A,
                0xE045: 0x6F78,
                0xE046: 0x6F81,
                0xE047: 0x6F80,
                0xE048: 0x6F6F,
                0xE049: 0x6F5B,
                0xE04A: 0x6FF3,
                0xE04B: 0x6F6D,
                0xE04C: 0x6F82,
                0xE04D: 0x6F7C,
                0xE04E: 0x6F58,
                0xE04F: 0x6F8E,
                0xE050: 0x6F91,
                0xE051: 0x6FC2,
                0xE052: 0x6F66,
                0xE053: 0x6FB3,
                0xE054: 0x6FA3,
                0xE055: 0x6FA1,
                0xE056: 0x6FA4,
                0xE057: 0x6FB9,
                0xE058: 0x6FC6,
                0xE059: 0x6FAA,
                0xE05A: 0x6FDF,
                0xE05B: 0x6FD5,
                0xE05C: 0x6FEC,
                0xE05D: 0x6FD4,
                0xE05E: 0x6FD8,
                0xE05F: 0x6FF1,
                0xE060: 0x6FEE,
                0xE061: 0x6FDB,
                0xE062: 0x7009,
                0xE063: 0x700B,
                0xE064: 0x6FFA,
                0xE065: 0x7011,
                0xE066: 0x7001,
                0xE067: 0x700F,
                0xE068: 0x6FFE,
                0xE069: 0x701B,
                0xE06A: 0x701A,
                0xE06B: 0x6F74,
                0xE06C: 0x701D,
                0xE06D: 0x7018,
                0xE06E: 0x701F,
                0xE06F: 0x7030,
                0xE070: 0x703E,
                0xE071: 0x7032,
                0xE072: 0x7051,
                0xE073: 0x7063,
                0xE074: 0x7099,
                0xE075: 0x7092,
                0xE076: 0x70AF,
                0xE077: 0x70F1,
                0xE078: 0x70AC,
                0xE079: 0x70B8,
                0xE07A: 0x70B3,
                0xE07B: 0x70AE,
                0xE07C: 0x70DF,
                0xE07D: 0x70CB,
                0xE07E: 0x70DD,
                0xE080: 0x70D9,
                0xE081: 0x7109,
                0xE082: 0x70FD,
                0xE083: 0x711C,
                0xE084: 0x7119,
                0xE085: 0x7165,
                0xE086: 0x7155,
                0xE087: 0x7188,
                0xE088: 0x7166,
                0xE089: 0x7162,
                0xE08A: 0x714C,
                0xE08B: 0x7156,
                0xE08C: 0x716C,
                0xE08D: 0x718F,
                0xE08E: 0x71FB,
                0xE08F: 0x7184,
                0xE090: 0x7195,
                0xE091: 0x71A8,
                0xE092: 0x71AC,
                0xE093: 0x71D7,
                0xE094: 0x71B9,
                0xE095: 0x71BE,
                0xE096: 0x71D2,
                0xE097: 0x71C9,
                0xE098: 0x71D4,
                0xE099: 0x71CE,
                0xE09A: 0x71E0,
                0xE09B: 0x71EC,
                0xE09C: 0x71E7,
                0xE09D: 0x71F5,
                0xE09E: 0x71FC,
                0xE09F: 0x71F9,
                0xE0A0: 0x71FF,
                0xE0A1: 0x720D,
                0xE0A2: 0x7210,
                0xE0A3: 0x721B,
                0xE0A4: 0x7228,
                0xE0A5: 0x722D,
                0xE0A6: 0x722C,
                0xE0A7: 0x7230,
                0xE0A8: 0x7232,
                0xE0A9: 0x723B,
                0xE0AA: 0x723C,
                0xE0AB: 0x723F,
                0xE0AC: 0x7240,
                0xE0AD: 0x7246,
                0xE0AE: 0x724B,
                0xE0AF: 0x7258,
                0xE0B0: 0x7274,
                0xE0B1: 0x727E,
                0xE0B2: 0x7282,
                0xE0B3: 0x7281,
                0xE0B4: 0x7287,
                0xE0B5: 0x7292,
                0xE0B6: 0x7296,
                0xE0B7: 0x72A2,
                0xE0B8: 0x72A7,
                0xE0B9: 0x72B9,
                0xE0BA: 0x72B2,
                0xE0BB: 0x72C3,
                0xE0BC: 0x72C6,
                0xE0BD: 0x72C4,
                0xE0BE: 0x72CE,
                0xE0BF: 0x72D2,
                0xE0C0: 0x72E2,
                0xE0C1: 0x72E0,
                0xE0C2: 0x72E1,
                0xE0C3: 0x72F9,
                0xE0C4: 0x72F7,
                0xE0C5: 0x500F,
                0xE0C6: 0x7317,
                0xE0C7: 0x730A,
                0xE0C8: 0x731C,
                0xE0C9: 0x7316,
                0xE0CA: 0x731D,
                0xE0CB: 0x7334,
                0xE0CC: 0x732F,
                0xE0CD: 0x7329,
                0xE0CE: 0x7325,
                0xE0CF: 0x733E,
                0xE0D0: 0x734E,
                0xE0D1: 0x734F,
                0xE0D2: 0x9ED8,
                0xE0D3: 0x7357,
                0xE0D4: 0x736A,
                0xE0D5: 0x7368,
                0xE0D6: 0x7370,
                0xE0D7: 0x7378,
                0xE0D8: 0x7375,
                0xE0D9: 0x737B,
                0xE0DA: 0x737A,
                0xE0DB: 0x73C8,
                0xE0DC: 0x73B3,
                0xE0DD: 0x73CE,
                0xE0DE: 0x73BB,
                0xE0DF: 0x73C0,
                0xE0E0: 0x73E5,
                0xE0E1: 0x73EE,
                0xE0E2: 0x73DE,
                0xE0E3: 0x74A2,
                0xE0E4: 0x7405,
                0xE0E5: 0x746F,
                0xE0E6: 0x7425,
                0xE0E7: 0x73F8,
                0xE0E8: 0x7432,
                0xE0E9: 0x743A,
                0xE0EA: 0x7455,
                0xE0EB: 0x743F,
                0xE0EC: 0x745F,
                0xE0ED: 0x7459,
                0xE0EE: 0x7441,
                0xE0EF: 0x745C,
                0xE0F0: 0x7469,
                0xE0F1: 0x7470,
                0xE0F2: 0x7463,
                0xE0F3: 0x746A,
                0xE0F4: 0x7476,
                0xE0F5: 0x747E,
                0xE0F6: 0x748B,
                0xE0F7: 0x749E,
                0xE0F8: 0x74A7,
                0xE0F9: 0x74CA,
                0xE0FA: 0x74CF,
                0xE0FB: 0x74D4,
                0xE0FC: 0x73F1,
                0xE140: 0x74E0,
                0xE141: 0x74E3,
                0xE142: 0x74E7,
                0xE143: 0x74E9,
                0xE144: 0x74EE,
                0xE145: 0x74F2,
                0xE146: 0x74F0,
                0xE147: 0x74F1,
                0xE148: 0x74F8,
                0xE149: 0x74F7,
                0xE14A: 0x7504,
                0xE14B: 0x7503,
                0xE14C: 0x7505,
                0xE14D: 0x750C,
                0xE14E: 0x750E,
                0xE14F: 0x750D,
                0xE150: 0x7515,
                0xE151: 0x7513,
                0xE152: 0x751E,
                0xE153: 0x7526,
                0xE154: 0x752C,
                0xE155: 0x753C,
                0xE156: 0x7544,
                0xE157: 0x754D,
                0xE158: 0x754A,
                0xE159: 0x7549,
                0xE15A: 0x755B,
                0xE15B: 0x7546,
                0xE15C: 0x755A,
                0xE15D: 0x7569,
                0xE15E: 0x7564,
                0xE15F: 0x7567,
                0xE160: 0x756B,
                0xE161: 0x756D,
                0xE162: 0x7578,
                0xE163: 0x7576,
                0xE164: 0x7586,
                0xE165: 0x7587,
                0xE166: 0x7574,
                0xE167: 0x758A,
                0xE168: 0x7589,
                0xE169: 0x7582,
                0xE16A: 0x7594,
                0xE16B: 0x759A,
                0xE16C: 0x759D,
                0xE16D: 0x75A5,
                0xE16E: 0x75A3,
                0xE16F: 0x75C2,
                0xE170: 0x75B3,
                0xE171: 0x75C3,
                0xE172: 0x75B5,
                0xE173: 0x75BD,
                0xE174: 0x75B8,
                0xE175: 0x75BC,
                0xE176: 0x75B1,
                0xE177: 0x75CD,
                0xE178: 0x75CA,
                0xE179: 0x75D2,
                0xE17A: 0x75D9,
                0xE17B: 0x75E3,
                0xE17C: 0x75DE,
                0xE17D: 0x75FE,
                0xE17E: 0x75FF,
                0xE180: 0x75FC,
                0xE181: 0x7601,
                0xE182: 0x75F0,
                0xE183: 0x75FA,
                0xE184: 0x75F2,
                0xE185: 0x75F3,
                0xE186: 0x760B,
                0xE187: 0x760D,
                0xE188: 0x7609,
                0xE189: 0x761F,
                0xE18A: 0x7627,
                0xE18B: 0x7620,
                0xE18C: 0x7621,
                0xE18D: 0x7622,
                0xE18E: 0x7624,
                0xE18F: 0x7634,
                0xE190: 0x7630,
                0xE191: 0x763B,
                0xE192: 0x7647,
                0xE193: 0x7648,
                0xE194: 0x7646,
                0xE195: 0x765C,
                0xE196: 0x7658,
                0xE197: 0x7661,
                0xE198: 0x7662,
                0xE199: 0x7668,
                0xE19A: 0x7669,
                0xE19B: 0x766A,
                0xE19C: 0x7667,
                0xE19D: 0x766C,
                0xE19E: 0x7670,
                0xE19F: 0x7672,
                0xE1A0: 0x7676,
                0xE1A1: 0x7678,
                0xE1A2: 0x767C,
                0xE1A3: 0x7680,
                0xE1A4: 0x7683,
                0xE1A5: 0x7688,
                0xE1A6: 0x768B,
                0xE1A7: 0x768E,
                0xE1A8: 0x7696,
                0xE1A9: 0x7693,
                0xE1AA: 0x7699,
                0xE1AB: 0x769A,
                0xE1AC: 0x76B0,
                0xE1AD: 0x76B4,
                0xE1AE: 0x76B8,
                0xE1AF: 0x76B9,
                0xE1B0: 0x76BA,
                0xE1B1: 0x76C2,
                0xE1B2: 0x76CD,
                0xE1B3: 0x76D6,
                0xE1B4: 0x76D2,
                0xE1B5: 0x76DE,
                0xE1B6: 0x76E1,
                0xE1B7: 0x76E5,
                0xE1B8: 0x76E7,
                0xE1B9: 0x76EA,
                0xE1BA: 0x862F,
                0xE1BB: 0x76FB,
                0xE1BC: 0x7708,
                0xE1BD: 0x7707,
                0xE1BE: 0x7704,
                0xE1BF: 0x7729,
                0xE1C0: 0x7724,
                0xE1C1: 0x771E,
                0xE1C2: 0x7725,
                0xE1C3: 0x7726,
                0xE1C4: 0x771B,
                0xE1C5: 0x7737,
                0xE1C6: 0x7738,
                0xE1C7: 0x7747,
                0xE1C8: 0x775A,
                0xE1C9: 0x7768,
                0xE1CA: 0x776B,
                0xE1CB: 0x775B,
                0xE1CC: 0x7765,
                0xE1CD: 0x777F,
                0xE1CE: 0x777E,
                0xE1CF: 0x7779,
                0xE1D0: 0x778E,
                0xE1D1: 0x778B,
                0xE1D2: 0x7791,
                0xE1D3: 0x77A0,
                0xE1D4: 0x779E,
                0xE1D5: 0x77B0,
                0xE1D6: 0x77B6,
                0xE1D7: 0x77B9,
                0xE1D8: 0x77BF,
                0xE1D9: 0x77BC,
                0xE1DA: 0x77BD,
                0xE1DB: 0x77BB,
                0xE1DC: 0x77C7,
                0xE1DD: 0x77CD,
                0xE1DE: 0x77D7,
                0xE1DF: 0x77DA,
                0xE1E0: 0x77DC,
                0xE1E1: 0x77E3,
                0xE1E2: 0x77EE,
                0xE1E3: 0x77FC,
                0xE1E4: 0x780C,
                0xE1E5: 0x7812,
                0xE1E6: 0x7926,
                0xE1E7: 0x7820,
                0xE1E8: 0x792A,
                0xE1E9: 0x7845,
                0xE1EA: 0x788E,
                0xE1EB: 0x7874,
                0xE1EC: 0x7886,
                0xE1ED: 0x787C,
                0xE1EE: 0x789A,
                0xE1EF: 0x788C,
                0xE1F0: 0x78A3,
                0xE1F1: 0x78B5,
                0xE1F2: 0x78AA,
                0xE1F3: 0x78AF,
                0xE1F4: 0x78D1,
                0xE1F5: 0x78C6,
                0xE1F6: 0x78CB,
                0xE1F7: 0x78D4,
                0xE1F8: 0x78BE,
                0xE1F9: 0x78BC,
                0xE1FA: 0x78C5,
                0xE1FB: 0x78CA,
                0xE1FC: 0x78EC,
                0xE240: 0x78E7,
                0xE241: 0x78DA,
                0xE242: 0x78FD,
                0xE243: 0x78F4,
                0xE244: 0x7907,
                0xE245: 0x7912,
                0xE246: 0x7911,
                0xE247: 0x7919,
                0xE248: 0x792C,
                0xE249: 0x792B,
                0xE24A: 0x7940,
                0xE24B: 0x7960,
                0xE24C: 0x7957,
                0xE24D: 0x795F,
                0xE24E: 0x795A,
                0xE24F: 0x7955,
                0xE250: 0x7953,
                0xE251: 0x797A,
                0xE252: 0x797F,
                0xE253: 0x798A,
                0xE254: 0x799D,
                0xE255: 0x79A7,
                0xE256: 0x9F4B,
                0xE257: 0x79AA,
                0xE258: 0x79AE,
                0xE259: 0x79B3,
                0xE25A: 0x79B9,
                0xE25B: 0x79BA,
                0xE25C: 0x79C9,
                0xE25D: 0x79D5,
                0xE25E: 0x79E7,
                0xE25F: 0x79EC,
                0xE260: 0x79E1,
                0xE261: 0x79E3,
                0xE262: 0x7A08,
                0xE263: 0x7A0D,
                0xE264: 0x7A18,
                0xE265: 0x7A19,
                0xE266: 0x7A20,
                0xE267: 0x7A1F,
                0xE268: 0x7980,
                0xE269: 0x7A31,
                0xE26A: 0x7A3B,
                0xE26B: 0x7A3E,
                0xE26C: 0x7A37,
                0xE26D: 0x7A43,
                0xE26E: 0x7A57,
                0xE26F: 0x7A49,
                0xE270: 0x7A61,
                0xE271: 0x7A62,
                0xE272: 0x7A69,
                0xE273: 0x9F9D,
                0xE274: 0x7A70,
                0xE275: 0x7A79,
                0xE276: 0x7A7D,
                0xE277: 0x7A88,
                0xE278: 0x7A97,
                0xE279: 0x7A95,
                0xE27A: 0x7A98,
                0xE27B: 0x7A96,
                0xE27C: 0x7AA9,
                0xE27D: 0x7AC8,
                0xE27E: 0x7AB0,
                0xE280: 0x7AB6,
                0xE281: 0x7AC5,
                0xE282: 0x7AC4,
                0xE283: 0x7ABF,
                0xE284: 0x9083,
                0xE285: 0x7AC7,
                0xE286: 0x7ACA,
                0xE287: 0x7ACD,
                0xE288: 0x7ACF,
                0xE289: 0x7AD5,
                0xE28A: 0x7AD3,
                0xE28B: 0x7AD9,
                0xE28C: 0x7ADA,
                0xE28D: 0x7ADD,
                0xE28E: 0x7AE1,
                0xE28F: 0x7AE2,
                0xE290: 0x7AE6,
                0xE291: 0x7AED,
                0xE292: 0x7AF0,
                0xE293: 0x7B02,
                0xE294: 0x7B0F,
                0xE295: 0x7B0A,
                0xE296: 0x7B06,
                0xE297: 0x7B33,
                0xE298: 0x7B18,
                0xE299: 0x7B19,
                0xE29A: 0x7B1E,
                0xE29B: 0x7B35,
                0xE29C: 0x7B28,
                0xE29D: 0x7B36,
                0xE29E: 0x7B50,
                0xE29F: 0x7B7A,
                0xE2A0: 0x7B04,
                0xE2A1: 0x7B4D,
                0xE2A2: 0x7B0B,
                0xE2A3: 0x7B4C,
                0xE2A4: 0x7B45,
                0xE2A5: 0x7B75,
                0xE2A6: 0x7B65,
                0xE2A7: 0x7B74,
                0xE2A8: 0x7B67,
                0xE2A9: 0x7B70,
                0xE2AA: 0x7B71,
                0xE2AB: 0x7B6C,
                0xE2AC: 0x7B6E,
                0xE2AD: 0x7B9D,
                0xE2AE: 0x7B98,
                0xE2AF: 0x7B9F,
                0xE2B0: 0x7B8D,
                0xE2B1: 0x7B9C,
                0xE2B2: 0x7B9A,
                0xE2B3: 0x7B8B,
                0xE2B4: 0x7B92,
                0xE2B5: 0x7B8F,
                0xE2B6: 0x7B5D,
                0xE2B7: 0x7B99,
                0xE2B8: 0x7BCB,
                0xE2B9: 0x7BC1,
                0xE2BA: 0x7BCC,
                0xE2BB: 0x7BCF,
                0xE2BC: 0x7BB4,
                0xE2BD: 0x7BC6,
                0xE2BE: 0x7BDD,
                0xE2BF: 0x7BE9,
                0xE2C0: 0x7C11,
                0xE2C1: 0x7C14,
                0xE2C2: 0x7BE6,
                0xE2C3: 0x7BE5,
                0xE2C4: 0x7C60,
                0xE2C5: 0x7C00,
                0xE2C6: 0x7C07,
                0xE2C7: 0x7C13,
                0xE2C8: 0x7BF3,
                0xE2C9: 0x7BF7,
                0xE2CA: 0x7C17,
                0xE2CB: 0x7C0D,
                0xE2CC: 0x7BF6,
                0xE2CD: 0x7C23,
                0xE2CE: 0x7C27,
                0xE2CF: 0x7C2A,
                0xE2D0: 0x7C1F,
                0xE2D1: 0x7C37,
                0xE2D2: 0x7C2B,
                0xE2D3: 0x7C3D,
                0xE2D4: 0x7C4C,
                0xE2D5: 0x7C43,
                0xE2D6: 0x7C54,
                0xE2D7: 0x7C4F,
                0xE2D8: 0x7C40,
                0xE2D9: 0x7C50,
                0xE2DA: 0x7C58,
                0xE2DB: 0x7C5F,
                0xE2DC: 0x7C64,
                0xE2DD: 0x7C56,
                0xE2DE: 0x7C65,
                0xE2DF: 0x7C6C,
                0xE2E0: 0x7C75,
                0xE2E1: 0x7C83,
                0xE2E2: 0x7C90,
                0xE2E3: 0x7CA4,
                0xE2E4: 0x7CAD,
                0xE2E5: 0x7CA2,
                0xE2E6: 0x7CAB,
                0xE2E7: 0x7CA1,
                0xE2E8: 0x7CA8,
                0xE2E9: 0x7CB3,
                0xE2EA: 0x7CB2,
                0xE2EB: 0x7CB1,
                0xE2EC: 0x7CAE,
                0xE2ED: 0x7CB9,
                0xE2EE: 0x7CBD,
                0xE2EF: 0x7CC0,
                0xE2F0: 0x7CC5,
                0xE2F1: 0x7CC2,
                0xE2F2: 0x7CD8,
                0xE2F3: 0x7CD2,
                0xE2F4: 0x7CDC,
                0xE2F5: 0x7CE2,
                0xE2F6: 0x9B3B,
                0xE2F7: 0x7CEF,
                0xE2F8: 0x7CF2,
                0xE2F9: 0x7CF4,
                0xE2FA: 0x7CF6,
                0xE2FB: 0x7CFA,
                0xE2FC: 0x7D06,
                0xE340: 0x7D02,
                0xE341: 0x7D1C,
                0xE342: 0x7D15,
                0xE343: 0x7D0A,
                0xE344: 0x7D45,
                0xE345: 0x7D4B,
                0xE346: 0x7D2E,
                0xE347: 0x7D32,
                0xE348: 0x7D3F,
                0xE349: 0x7D35,
                0xE34A: 0x7D46,
                0xE34B: 0x7D73,
                0xE34C: 0x7D56,
                0xE34D: 0x7D4E,
                0xE34E: 0x7D72,
                0xE34F: 0x7D68,
                0xE350: 0x7D6E,
                0xE351: 0x7D4F,
                0xE352: 0x7D63,
                0xE353: 0x7D93,
                0xE354: 0x7D89,
                0xE355: 0x7D5B,
                0xE356: 0x7D8F,
                0xE357: 0x7D7D,
                0xE358: 0x7D9B,
                0xE359: 0x7DBA,
                0xE35A: 0x7DAE,
                0xE35B: 0x7DA3,
                0xE35C: 0x7DB5,
                0xE35D: 0x7DC7,
                0xE35E: 0x7DBD,
                0xE35F: 0x7DAB,
                0xE360: 0x7E3D,
                0xE361: 0x7DA2,
                0xE362: 0x7DAF,
                0xE363: 0x7DDC,
                0xE364: 0x7DB8,
                0xE365: 0x7D9F,
                0xE366: 0x7DB0,
                0xE367: 0x7DD8,
                0xE368: 0x7DDD,
                0xE369: 0x7DE4,
                0xE36A: 0x7DDE,
                0xE36B: 0x7DFB,
                0xE36C: 0x7DF2,
                0xE36D: 0x7DE1,
                0xE36E: 0x7E05,
                0xE36F: 0x7E0A,
                0xE370: 0x7E23,
                0xE371: 0x7E21,
                0xE372: 0x7E12,
                0xE373: 0x7E31,
                0xE374: 0x7E1F,
                0xE375: 0x7E09,
                0xE376: 0x7E0B,
                0xE377: 0x7E22,
                0xE378: 0x7E46,
                0xE379: 0x7E66,
                0xE37A: 0x7E3B,
                0xE37B: 0x7E35,
                0xE37C: 0x7E39,
                0xE37D: 0x7E43,
                0xE37E: 0x7E37,
                0xE380: 0x7E32,
                0xE381: 0x7E3A,
                0xE382: 0x7E67,
                0xE383: 0x7E5D,
                0xE384: 0x7E56,
                0xE385: 0x7E5E,
                0xE386: 0x7E59,
                0xE387: 0x7E5A,
                0xE388: 0x7E79,
                0xE389: 0x7E6A,
                0xE38A: 0x7E69,
                0xE38B: 0x7E7C,
                0xE38C: 0x7E7B,
                0xE38D: 0x7E83,
                0xE38E: 0x7DD5,
                0xE38F: 0x7E7D,
                0xE390: 0x8FAE,
                0xE391: 0x7E7F,
                0xE392: 0x7E88,
                0xE393: 0x7E89,
                0xE394: 0x7E8C,
                0xE395: 0x7E92,
                0xE396: 0x7E90,
                0xE397: 0x7E93,
                0xE398: 0x7E94,
                0xE399: 0x7E96,
                0xE39A: 0x7E8E,
                0xE39B: 0x7E9B,
                0xE39C: 0x7E9C,
                0xE39D: 0x7F38,
                0xE39E: 0x7F3A,
                0xE39F: 0x7F45,
                0xE3A0: 0x7F4C,
                0xE3A1: 0x7F4D,
                0xE3A2: 0x7F4E,
                0xE3A3: 0x7F50,
                0xE3A4: 0x7F51,
                0xE3A5: 0x7F55,
                0xE3A6: 0x7F54,
                0xE3A7: 0x7F58,
                0xE3A8: 0x7F5F,
                0xE3A9: 0x7F60,
                0xE3AA: 0x7F68,
                0xE3AB: 0x7F69,
                0xE3AC: 0x7F67,
                0xE3AD: 0x7F78,
                0xE3AE: 0x7F82,
                0xE3AF: 0x7F86,
                0xE3B0: 0x7F83,
                0xE3B1: 0x7F88,
                0xE3B2: 0x7F87,
                0xE3B3: 0x7F8C,
                0xE3B4: 0x7F94,
                0xE3B5: 0x7F9E,
                0xE3B6: 0x7F9D,
                0xE3B7: 0x7F9A,
                0xE3B8: 0x7FA3,
                0xE3B9: 0x7FAF,
                0xE3BA: 0x7FB2,
                0xE3BB: 0x7FB9,
                0xE3BC: 0x7FAE,
                0xE3BD: 0x7FB6,
                0xE3BE: 0x7FB8,
                0xE3BF: 0x8B71,
                0xE3C0: 0x7FC5,
                0xE3C1: 0x7FC6,
                0xE3C2: 0x7FCA,
                0xE3C3: 0x7FD5,
                0xE3C4: 0x7FD4,
                0xE3C5: 0x7FE1,
                0xE3C6: 0x7FE6,
                0xE3C7: 0x7FE9,
                0xE3C8: 0x7FF3,
                0xE3C9: 0x7FF9,
                0xE3CA: 0x98DC,
                0xE3CB: 0x8006,
                0xE3CC: 0x8004,
                0xE3CD: 0x800B,
                0xE3CE: 0x8012,
                0xE3CF: 0x8018,
                0xE3D0: 0x8019,
                0xE3D1: 0x801C,
                0xE3D2: 0x8021,
                0xE3D3: 0x8028,
                0xE3D4: 0x803F,
                0xE3D5: 0x803B,
                0xE3D6: 0x804A,
                0xE3D7: 0x8046,
                0xE3D8: 0x8052,
                0xE3D9: 0x8058,
                0xE3DA: 0x805A,
                0xE3DB: 0x805F,
                0xE3DC: 0x8062,
                0xE3DD: 0x8068,
                0xE3DE: 0x8073,
                0xE3DF: 0x8072,
                0xE3E0: 0x8070,
                0xE3E1: 0x8076,
                0xE3E2: 0x8079,
                0xE3E3: 0x807D,
                0xE3E4: 0x807F,
                0xE3E5: 0x8084,
                0xE3E6: 0x8086,
                0xE3E7: 0x8085,
                0xE3E8: 0x809B,
                0xE3E9: 0x8093,
                0xE3EA: 0x809A,
                0xE3EB: 0x80AD,
                0xE3EC: 0x5190,
                0xE3ED: 0x80AC,
                0xE3EE: 0x80DB,
                0xE3EF: 0x80E5,
                0xE3F0: 0x80D9,
                0xE3F1: 0x80DD,
                0xE3F2: 0x80C4,
                0xE3F3: 0x80DA,
                0xE3F4: 0x80D6,
                0xE3F5: 0x8109,
                0xE3F6: 0x80EF,
                0xE3F7: 0x80F1,
                0xE3F8: 0x811B,
                0xE3F9: 0x8129,
                0xE3FA: 0x8123,
                0xE3FB: 0x812F,
                0xE3FC: 0x814B,
                0xE440: 0x968B,
                0xE441: 0x8146,
                0xE442: 0x813E,
                0xE443: 0x8153,
                0xE444: 0x8151,
                0xE445: 0x80FC,
                0xE446: 0x8171,
                0xE447: 0x816E,
                0xE448: 0x8165,
                0xE449: 0x8166,
                0xE44A: 0x8174,
                0xE44B: 0x8183,
                0xE44C: 0x8188,
                0xE44D: 0x818A,
                0xE44E: 0x8180,
                0xE44F: 0x8182,
                0xE450: 0x81A0,
                0xE451: 0x8195,
                0xE452: 0x81A4,
                0xE453: 0x81A3,
                0xE454: 0x815F,
                0xE455: 0x8193,
                0xE456: 0x81A9,
                0xE457: 0x81B0,
                0xE458: 0x81B5,
                0xE459: 0x81BE,
                0xE45A: 0x81B8,
                0xE45B: 0x81BD,
                0xE45C: 0x81C0,
                0xE45D: 0x81C2,
                0xE45E: 0x81BA,
                0xE45F: 0x81C9,
                0xE460: 0x81CD,
                0xE461: 0x81D1,
                0xE462: 0x81D9,
                0xE463: 0x81D8,
                0xE464: 0x81C8,
                0xE465: 0x81DA,
                0xE466: 0x81DF,
                0xE467: 0x81E0,
                0xE468: 0x81E7,
                0xE469: 0x81FA,
                0xE46A: 0x81FB,
                0xE46B: 0x81FE,
                0xE46C: 0x8201,
                0xE46D: 0x8202,
                0xE46E: 0x8205,
                0xE46F: 0x8207,
                0xE470: 0x820A,
                0xE471: 0x820D,
                0xE472: 0x8210,
                0xE473: 0x8216,
                0xE474: 0x8229,
                0xE475: 0x822B,
                0xE476: 0x8238,
                0xE477: 0x8233,
                0xE478: 0x8240,
                0xE479: 0x8259,
                0xE47A: 0x8258,
                0xE47B: 0x825D,
                0xE47C: 0x825A,
                0xE47D: 0x825F,
                0xE47E: 0x8264,
                0xE480: 0x8262,
                0xE481: 0x8268,
                0xE482: 0x826A,
                0xE483: 0x826B,
                0xE484: 0x822E,
                0xE485: 0x8271,
                0xE486: 0x8277,
                0xE487: 0x8278,
                0xE488: 0x827E,
                0xE489: 0x828D,
                0xE48A: 0x8292,
                0xE48B: 0x82AB,
                0xE48C: 0x829F,
                0xE48D: 0x82BB,
                0xE48E: 0x82AC,
                0xE48F: 0x82E1,
                0xE490: 0x82E3,
                0xE491: 0x82DF,
                0xE492: 0x82D2,
                0xE493: 0x82F4,
                0xE494: 0x82F3,
                0xE495: 0x82FA,
                0xE496: 0x8393,
                0xE497: 0x8303,
                0xE498: 0x82FB,
                0xE499: 0x82F9,
                0xE49A: 0x82DE,
                0xE49B: 0x8306,
                0xE49C: 0x82DC,
                0xE49D: 0x8309,
                0xE49E: 0x82D9,
                0xE49F: 0x8335,
                0xE4A0: 0x8334,
                0xE4A1: 0x8316,
                0xE4A2: 0x8332,
                0xE4A3: 0x8331,
                0xE4A4: 0x8340,
                0xE4A5: 0x8339,
                0xE4A6: 0x8350,
                0xE4A7: 0x8345,
                0xE4A8: 0x832F,
                0xE4A9: 0x832B,
                0xE4AA: 0x8317,
                0xE4AB: 0x8318,
                0xE4AC: 0x8385,
                0xE4AD: 0x839A,
                0xE4AE: 0x83AA,
                0xE4AF: 0x839F,
                0xE4B0: 0x83A2,
                0xE4B1: 0x8396,
                0xE4B2: 0x8323,
                0xE4B3: 0x838E,
                0xE4B4: 0x8387,
                0xE4B5: 0x838A,
                0xE4B6: 0x837C,
                0xE4B7: 0x83B5,
                0xE4B8: 0x8373,
                0xE4B9: 0x8375,
                0xE4BA: 0x83A0,
                0xE4BB: 0x8389,
                0xE4BC: 0x83A8,
                0xE4BD: 0x83F4,
                0xE4BE: 0x8413,
                0xE4BF: 0x83EB,
                0xE4C0: 0x83CE,
                0xE4C1: 0x83FD,
                0xE4C2: 0x8403,
                0xE4C3: 0x83D8,
                0xE4C4: 0x840B,
                0xE4C5: 0x83C1,
                0xE4C6: 0x83F7,
                0xE4C7: 0x8407,
                0xE4C8: 0x83E0,
                0xE4C9: 0x83F2,
                0xE4CA: 0x840D,
                0xE4CB: 0x8422,
                0xE4CC: 0x8420,
                0xE4CD: 0x83BD,
                0xE4CE: 0x8438,
                0xE4CF: 0x8506,
                0xE4D0: 0x83FB,
                0xE4D1: 0x846D,
                0xE4D2: 0x842A,
                0xE4D3: 0x843C,
                0xE4D4: 0x855A,
                0xE4D5: 0x8484,
                0xE4D6: 0x8477,
                0xE4D7: 0x846B,
                0xE4D8: 0x84AD,
                0xE4D9: 0x846E,
                0xE4DA: 0x8482,
                0xE4DB: 0x8469,
                0xE4DC: 0x8446,
                0xE4DD: 0x842C,
                0xE4DE: 0x846F,
                0xE4DF: 0x8479,
                0xE4E0: 0x8435,
                0xE4E1: 0x84CA,
                0xE4E2: 0x8462,
                0xE4E3: 0x84B9,
                0xE4E4: 0x84BF,
                0xE4E5: 0x849F,
                0xE4E6: 0x84D9,
                0xE4E7: 0x84CD,
                0xE4E8: 0x84BB,
                0xE4E9: 0x84DA,
                0xE4EA: 0x84D0,
                0xE4EB: 0x84C1,
                0xE4EC: 0x84C6,
                0xE4ED: 0x84D6,
                0xE4EE: 0x84A1,
                0xE4EF: 0x8521,
                0xE4F0: 0x84FF,
                0xE4F1: 0x84F4,
                0xE4F2: 0x8517,
                0xE4F3: 0x8518,
                0xE4F4: 0x852C,
                0xE4F5: 0x851F,
                0xE4F6: 0x8515,
                0xE4F7: 0x8514,
                0xE4F8: 0x84FC,
                0xE4F9: 0x8540,
                0xE4FA: 0x8563,
                0xE4FB: 0x8558,
                0xE4FC: 0x8548,
                0xE540: 0x8541,
                0xE541: 0x8602,
                0xE542: 0x854B,
                0xE543: 0x8555,
                0xE544: 0x8580,
                0xE545: 0x85A4,
                0xE546: 0x8588,
                0xE547: 0x8591,
                0xE548: 0x858A,
                0xE549: 0x85A8,
                0xE54A: 0x856D,
                0xE54B: 0x8594,
                0xE54C: 0x859B,
                0xE54D: 0x85EA,
                0xE54E: 0x8587,
                0xE54F: 0x859C,
                0xE550: 0x8577,
                0xE551: 0x857E,
                0xE552: 0x8590,
                0xE553: 0x85C9,
                0xE554: 0x85BA,
                0xE555: 0x85CF,
                0xE556: 0x85B9,
                0xE557: 0x85D0,
                0xE558: 0x85D5,
                0xE559: 0x85DD,
                0xE55A: 0x85E5,
                0xE55B: 0x85DC,
                0xE55C: 0x85F9,
                0xE55D: 0x860A,
                0xE55E: 0x8613,
                0xE55F: 0x860B,
                0xE560: 0x85FE,
                0xE561: 0x85FA,
                0xE562: 0x8606,
                0xE563: 0x8622,
                0xE564: 0x861A,
                0xE565: 0x8630,
                0xE566: 0x863F,
                0xE567: 0x864D,
                0xE568: 0x4E55,
                0xE569: 0x8654,
                0xE56A: 0x865F,
                0xE56B: 0x8667,
                0xE56C: 0x8671,
                0xE56D: 0x8693,
                0xE56E: 0x86A3,
                0xE56F: 0x86A9,
                0xE570: 0x86AA,
                0xE571: 0x868B,
                0xE572: 0x868C,
                0xE573: 0x86B6,
                0xE574: 0x86AF,
                0xE575: 0x86C4,
                0xE576: 0x86C6,
                0xE577: 0x86B0,
                0xE578: 0x86C9,
                0xE579: 0x8823,
                0xE57A: 0x86AB,
                0xE57B: 0x86D4,
                0xE57C: 0x86DE,
                0xE57D: 0x86E9,
                0xE57E: 0x86EC,
                0xE580: 0x86DF,
                0xE581: 0x86DB,
                0xE582: 0x86EF,
                0xE583: 0x8712,
                0xE584: 0x8706,
                0xE585: 0x8708,
                0xE586: 0x8700,
                0xE587: 0x8703,
                0xE588: 0x86FB,
                0xE589: 0x8711,
                0xE58A: 0x8709,
                0xE58B: 0x870D,
                0xE58C: 0x86F9,
                0xE58D: 0x870A,
                0xE58E: 0x8734,
                0xE58F: 0x873F,
                0xE590: 0x8737,
                0xE591: 0x873B,
                0xE592: 0x8725,
                0xE593: 0x8729,
                0xE594: 0x871A,
                0xE595: 0x8760,
                0xE596: 0x875F,
                0xE597: 0x8778,
                0xE598: 0x874C,
                0xE599: 0x874E,
                0xE59A: 0x8774,
                0xE59B: 0x8757,
                0xE59C: 0x8768,
                0xE59D: 0x876E,
                0xE59E: 0x8759,
                0xE59F: 0x8753,
                0xE5A0: 0x8763,
                0xE5A1: 0x876A,
                0xE5A2: 0x8805,
                0xE5A3: 0x87A2,
                0xE5A4: 0x879F,
                0xE5A5: 0x8782,
                0xE5A6: 0x87AF,
                0xE5A7: 0x87CB,
                0xE5A8: 0x87BD,
                0xE5A9: 0x87C0,
                0xE5AA: 0x87D0,
                0xE5AB: 0x96D6,
                0xE5AC: 0x87AB,
                0xE5AD: 0x87C4,
                0xE5AE: 0x87B3,
                0xE5AF: 0x87C7,
                0xE5B0: 0x87C6,
                0xE5B1: 0x87BB,
                0xE5B2: 0x87EF,
                0xE5B3: 0x87F2,
                0xE5B4: 0x87E0,
                0xE5B5: 0x880F,
                0xE5B6: 0x880D,
                0xE5B7: 0x87FE,
                0xE5B8: 0x87F6,
                0xE5B9: 0x87F7,
                0xE5BA: 0x880E,
                0xE5BB: 0x87D2,
                0xE5BC: 0x8811,
                0xE5BD: 0x8816,
                0xE5BE: 0x8815,
                0xE5BF: 0x8822,
                0xE5C0: 0x8821,
                0xE5C1: 0x8831,
                0xE5C2: 0x8836,
                0xE5C3: 0x8839,
                0xE5C4: 0x8827,
                0xE5C5: 0x883B,
                0xE5C6: 0x8844,
                0xE5C7: 0x8842,
                0xE5C8: 0x8852,
                0xE5C9: 0x8859,
                0xE5CA: 0x885E,
                0xE5CB: 0x8862,
                0xE5CC: 0x886B,
                0xE5CD: 0x8881,
                0xE5CE: 0x887E,
                0xE5CF: 0x889E,
                0xE5D0: 0x8875,
                0xE5D1: 0x887D,
                0xE5D2: 0x88B5,
                0xE5D3: 0x8872,
                0xE5D4: 0x8882,
                0xE5D5: 0x8897,
                0xE5D6: 0x8892,
                0xE5D7: 0x88AE,
                0xE5D8: 0x8899,
                0xE5D9: 0x88A2,
                0xE5DA: 0x888D,
                0xE5DB: 0x88A4,
                0xE5DC: 0x88B0,
                0xE5DD: 0x88BF,
                0xE5DE: 0x88B1,
                0xE5DF: 0x88C3,
                0xE5E0: 0x88C4,
                0xE5E1: 0x88D4,
                0xE5E2: 0x88D8,
                0xE5E3: 0x88D9,
                0xE5E4: 0x88DD,
                0xE5E5: 0x88F9,
                0xE5E6: 0x8902,
                0xE5E7: 0x88FC,
                0xE5E8: 0x88F4,
                0xE5E9: 0x88E8,
                0xE5EA: 0x88F2,
                0xE5EB: 0x8904,
                0xE5EC: 0x890C,
                0xE5ED: 0x890A,
                0xE5EE: 0x8913,
                0xE5EF: 0x8943,
                0xE5F0: 0x891E,
                0xE5F1: 0x8925,
                0xE5F2: 0x892A,
                0xE5F3: 0x892B,
                0xE5F4: 0x8941,
                0xE5F5: 0x8944,
                0xE5F6: 0x893B,
                0xE5F7: 0x8936,
                0xE5F8: 0x8938,
                0xE5F9: 0x894C,
                0xE5FA: 0x891D,
                0xE5FB: 0x8960,
                0xE5FC: 0x895E,
                0xE640: 0x8966,
                0xE641: 0x8964,
                0xE642: 0x896D,
                0xE643: 0x896A,
                0xE644: 0x896F,
                0xE645: 0x8974,
                0xE646: 0x8977,
                0xE647: 0x897E,
                0xE648: 0x8983,
                0xE649: 0x8988,
                0xE64A: 0x898A,
                0xE64B: 0x8993,
                0xE64C: 0x8998,
                0xE64D: 0x89A1,
                0xE64E: 0x89A9,
                0xE64F: 0x89A6,
                0xE650: 0x89AC,
                0xE651: 0x89AF,
                0xE652: 0x89B2,
                0xE653: 0x89BA,
                0xE654: 0x89BD,
                0xE655: 0x89BF,
                0xE656: 0x89C0,
                0xE657: 0x89DA,
                0xE658: 0x89DC,
                0xE659: 0x89DD,
                0xE65A: 0x89E7,
                0xE65B: 0x89F4,
                0xE65C: 0x89F8,
                0xE65D: 0x8A03,
                0xE65E: 0x8A16,
                0xE65F: 0x8A10,
                0xE660: 0x8A0C,
                0xE661: 0x8A1B,
                0xE662: 0x8A1D,
                0xE663: 0x8A25,
                0xE664: 0x8A36,
                0xE665: 0x8A41,
                0xE666: 0x8A5B,
                0xE667: 0x8A52,
                0xE668: 0x8A46,
                0xE669: 0x8A48,
                0xE66A: 0x8A7C,
                0xE66B: 0x8A6D,
                0xE66C: 0x8A6C,
                0xE66D: 0x8A62,
                0xE66E: 0x8A85,
                0xE66F: 0x8A82,
                0xE670: 0x8A84,
                0xE671: 0x8AA8,
                0xE672: 0x8AA1,
                0xE673: 0x8A91,
                0xE674: 0x8AA5,
                0xE675: 0x8AA6,
                0xE676: 0x8A9A,
                0xE677: 0x8AA3,
                0xE678: 0x8AC4,
                0xE679: 0x8ACD,
                0xE67A: 0x8AC2,
                0xE67B: 0x8ADA,
                0xE67C: 0x8AEB,
                0xE67D: 0x8AF3,
                0xE67E: 0x8AE7,
                0xE680: 0x8AE4,
                0xE681: 0x8AF1,
                0xE682: 0x8B14,
                0xE683: 0x8AE0,
                0xE684: 0x8AE2,
                0xE685: 0x8AF7,
                0xE686: 0x8ADE,
                0xE687: 0x8ADB,
                0xE688: 0x8B0C,
                0xE689: 0x8B07,
                0xE68A: 0x8B1A,
                0xE68B: 0x8AE1,
                0xE68C: 0x8B16,
                0xE68D: 0x8B10,
                0xE68E: 0x8B17,
                0xE68F: 0x8B20,
                0xE690: 0x8B33,
                0xE691: 0x97AB,
                0xE692: 0x8B26,
                0xE693: 0x8B2B,
                0xE694: 0x8B3E,
                0xE695: 0x8B28,
                0xE696: 0x8B41,
                0xE697: 0x8B4C,
                0xE698: 0x8B4F,
                0xE699: 0x8B4E,
                0xE69A: 0x8B49,
                0xE69B: 0x8B56,
                0xE69C: 0x8B5B,
                0xE69D: 0x8B5A,
                0xE69E: 0x8B6B,
                0xE69F: 0x8B5F,
                0xE6A0: 0x8B6C,
                0xE6A1: 0x8B6F,
                0xE6A2: 0x8B74,
                0xE6A3: 0x8B7D,
                0xE6A4: 0x8B80,
                0xE6A5: 0x8B8C,
                0xE6A6: 0x8B8E,
                0xE6A7: 0x8B92,
                0xE6A8: 0x8B93,
                0xE6A9: 0x8B96,
                0xE6AA: 0x8B99,
                0xE6AB: 0x8B9A,
                0xE6AC: 0x8C3A,
                0xE6AD: 0x8C41,
                0xE6AE: 0x8C3F,
                0xE6AF: 0x8C48,
                0xE6B0: 0x8C4C,
                0xE6B1: 0x8C4E,
                0xE6B2: 0x8C50,
                0xE6B3: 0x8C55,
                0xE6B4: 0x8C62,
                0xE6B5: 0x8C6C,
                0xE6B6: 0x8C78,
                0xE6B7: 0x8C7A,
                0xE6B8: 0x8C82,
                0xE6B9: 0x8C89,
                0xE6BA: 0x8C85,
                0xE6BB: 0x8C8A,
                0xE6BC: 0x8C8D,
                0xE6BD: 0x8C8E,
                0xE6BE: 0x8C94,
                0xE6BF: 0x8C7C,
                0xE6C0: 0x8C98,
                0xE6C1: 0x621D,
                0xE6C2: 0x8CAD,
                0xE6C3: 0x8CAA,
                0xE6C4: 0x8CBD,
                0xE6C5: 0x8CB2,
                0xE6C6: 0x8CB3,
                0xE6C7: 0x8CAE,
                0xE6C8: 0x8CB6,
                0xE6C9: 0x8CC8,
                0xE6CA: 0x8CC1,
                0xE6CB: 0x8CE4,
                0xE6CC: 0x8CE3,
                0xE6CD: 0x8CDA,
                0xE6CE: 0x8CFD,
                0xE6CF: 0x8CFA,
                0xE6D0: 0x8CFB,
                0xE6D1: 0x8D04,
                0xE6D2: 0x8D05,
                0xE6D3: 0x8D0A,
                0xE6D4: 0x8D07,
                0xE6D5: 0x8D0F,
                0xE6D6: 0x8D0D,
                0xE6D7: 0x8D10,
                0xE6D8: 0x9F4E,
                0xE6D9: 0x8D13,
                0xE6DA: 0x8CCD,
                0xE6DB: 0x8D14,
                0xE6DC: 0x8D16,
                0xE6DD: 0x8D67,
                0xE6DE: 0x8D6D,
                0xE6DF: 0x8D71,
                0xE6E0: 0x8D73,
                0xE6E1: 0x8D81,
                0xE6E2: 0x8D99,
                0xE6E3: 0x8DC2,
                0xE6E4: 0x8DBE,
                0xE6E5: 0x8DBA,
                0xE6E6: 0x8DCF,
                0xE6E7: 0x8DDA,
                0xE6E8: 0x8DD6,
                0xE6E9: 0x8DCC,
                0xE6EA: 0x8DDB,
                0xE6EB: 0x8DCB,
                0xE6EC: 0x8DEA,
                0xE6ED: 0x8DEB,
                0xE6EE: 0x8DDF,
                0xE6EF: 0x8DE3,
                0xE6F0: 0x8DFC,
                0xE6F1: 0x8E08,
                0xE6F2: 0x8E09,
                0xE6F3: 0x8DFF,
                0xE6F4: 0x8E1D,
                0xE6F5: 0x8E1E,
                0xE6F6: 0x8E10,
                0xE6F7: 0x8E1F,
                0xE6F8: 0x8E42,
                0xE6F9: 0x8E35,
                0xE6FA: 0x8E30,
                0xE6FB: 0x8E34,
                0xE6FC: 0x8E4A,
                0xE740: 0x8E47,
                0xE741: 0x8E49,
                0xE742: 0x8E4C,
                0xE743: 0x8E50,
                0xE744: 0x8E48,
                0xE745: 0x8E59,
                0xE746: 0x8E64,
                0xE747: 0x8E60,
                0xE748: 0x8E2A,
                0xE749: 0x8E63,
                0xE74A: 0x8E55,
                0xE74B: 0x8E76,
                0xE74C: 0x8E72,
                0xE74D: 0x8E7C,
                0xE74E: 0x8E81,
                0xE74F: 0x8E87,
                0xE750: 0x8E85,
                0xE751: 0x8E84,
                0xE752: 0x8E8B,
                0xE753: 0x8E8A,
                0xE754: 0x8E93,
                0xE755: 0x8E91,
                0xE756: 0x8E94,
                0xE757: 0x8E99,
                0xE758: 0x8EAA,
                0xE759: 0x8EA1,
                0xE75A: 0x8EAC,
                0xE75B: 0x8EB0,
                0xE75C: 0x8EC6,
                0xE75D: 0x8EB1,
                0xE75E: 0x8EBE,
                0xE75F: 0x8EC5,
                0xE760: 0x8EC8,
                0xE761: 0x8ECB,
                0xE762: 0x8EDB,
                0xE763: 0x8EE3,
                0xE764: 0x8EFC,
                0xE765: 0x8EFB,
                0xE766: 0x8EEB,
                0xE767: 0x8EFE,
                0xE768: 0x8F0A,
                0xE769: 0x8F05,
                0xE76A: 0x8F15,
                0xE76B: 0x8F12,
                0xE76C: 0x8F19,
                0xE76D: 0x8F13,
                0xE76E: 0x8F1C,
                0xE76F: 0x8F1F,
                0xE770: 0x8F1B,
                0xE771: 0x8F0C,
                0xE772: 0x8F26,
                0xE773: 0x8F33,
                0xE774: 0x8F3B,
                0xE775: 0x8F39,
                0xE776: 0x8F45,
                0xE777: 0x8F42,
                0xE778: 0x8F3E,
                0xE779: 0x8F4C,
                0xE77A: 0x8F49,
                0xE77B: 0x8F46,
                0xE77C: 0x8F4E,
                0xE77D: 0x8F57,
                0xE77E: 0x8F5C,
                0xE780: 0x8F62,
                0xE781: 0x8F63,
                0xE782: 0x8F64,
                0xE783: 0x8F9C,
                0xE784: 0x8F9F,
                0xE785: 0x8FA3,
                0xE786: 0x8FAD,
                0xE787: 0x8FAF,
                0xE788: 0x8FB7,
                0xE789: 0x8FDA,
                0xE78A: 0x8FE5,
                0xE78B: 0x8FE2,
                0xE78C: 0x8FEA,
                0xE78D: 0x8FEF,
                0xE78E: 0x9087,
                0xE78F: 0x8FF4,
                0xE790: 0x9005,
                0xE791: 0x8FF9,
                0xE792: 0x8FFA,
                0xE793: 0x9011,
                0xE794: 0x9015,
                0xE795: 0x9021,
                0xE796: 0x900D,
                0xE797: 0x901E,
                0xE798: 0x9016,
                0xE799: 0x900B,
                0xE79A: 0x9027,
                0xE79B: 0x9036,
                0xE79C: 0x9035,
                0xE79D: 0x9039,
                0xE79E: 0x8FF8,
                0xE79F: 0x904F,
                0xE7A0: 0x9050,
                0xE7A1: 0x9051,
                0xE7A2: 0x9052,
                0xE7A3: 0x900E,
                0xE7A4: 0x9049,
                0xE7A5: 0x903E,
                0xE7A6: 0x9056,
                0xE7A7: 0x9058,
                0xE7A8: 0x905E,
                0xE7A9: 0x9068,
                0xE7AA: 0x906F,
                0xE7AB: 0x9076,
                0xE7AC: 0x96A8,
                0xE7AD: 0x9072,
                0xE7AE: 0x9082,
                0xE7AF: 0x907D,
                0xE7B0: 0x9081,
                0xE7B1: 0x9080,
                0xE7B2: 0x908A,
                0xE7B3: 0x9089,
                0xE7B4: 0x908F,
                0xE7B5: 0x90A8,
                0xE7B6: 0x90AF,
                0xE7B7: 0x90B1,
                0xE7B8: 0x90B5,
                0xE7B9: 0x90E2,
                0xE7BA: 0x90E4,
                0xE7BB: 0x6248,
                0xE7BC: 0x90DB,
                0xE7BD: 0x9102,
                0xE7BE: 0x9112,
                0xE7BF: 0x9119,
                0xE7C0: 0x9132,
                0xE7C1: 0x9130,
                0xE7C2: 0x914A,
                0xE7C3: 0x9156,
                0xE7C4: 0x9158,
                0xE7C5: 0x9163,
                0xE7C6: 0x9165,
                0xE7C7: 0x9169,
                0xE7C8: 0x9173,
                0xE7C9: 0x9172,
                0xE7CA: 0x918B,
                0xE7CB: 0x9189,
                0xE7CC: 0x9182,
                0xE7CD: 0x91A2,
                0xE7CE: 0x91AB,
                0xE7CF: 0x91AF,
                0xE7D0: 0x91AA,
                0xE7D1: 0x91B5,
                0xE7D2: 0x91B4,
                0xE7D3: 0x91BA,
                0xE7D4: 0x91C0,
                0xE7D5: 0x91C1,
                0xE7D6: 0x91C9,
                0xE7D7: 0x91CB,
                0xE7D8: 0x91D0,
                0xE7D9: 0x91D6,
                0xE7DA: 0x91DF,
                0xE7DB: 0x91E1,
                0xE7DC: 0x91DB,
                0xE7DD: 0x91FC,
                0xE7DE: 0x91F5,
                0xE7DF: 0x91F6,
                0xE7E0: 0x921E,
                0xE7E1: 0x91FF,
                0xE7E2: 0x9214,
                0xE7E3: 0x922C,
                0xE7E4: 0x9215,
                0xE7E5: 0x9211,
                0xE7E6: 0x925E,
                0xE7E7: 0x9257,
                0xE7E8: 0x9245,
                0xE7E9: 0x9249,
                0xE7EA: 0x9264,
                0xE7EB: 0x9248,
                0xE7EC: 0x9295,
                0xE7ED: 0x923F,
                0xE7EE: 0x924B,
                0xE7EF: 0x9250,
                0xE7F0: 0x929C,
                0xE7F1: 0x9296,
                0xE7F2: 0x9293,
                0xE7F3: 0x929B,
                0xE7F4: 0x925A,
                0xE7F5: 0x92CF,
                0xE7F6: 0x92B9,
                0xE7F7: 0x92B7,
                0xE7F8: 0x92E9,
                0xE7F9: 0x930F,
                0xE7FA: 0x92FA,
                0xE7FB: 0x9344,
                0xE7FC: 0x932E,
                0xE840: 0x9319,
                0xE841: 0x9322,
                0xE842: 0x931A,
                0xE843: 0x9323,
                0xE844: 0x933A,
                0xE845: 0x9335,
                0xE846: 0x933B,
                0xE847: 0x935C,
                0xE848: 0x9360,
                0xE849: 0x937C,
                0xE84A: 0x936E,
                0xE84B: 0x9356,
                0xE84C: 0x93B0,
                0xE84D: 0x93AC,
                0xE84E: 0x93AD,
                0xE84F: 0x9394,
                0xE850: 0x93B9,
                0xE851: 0x93D6,
                0xE852: 0x93D7,
                0xE853: 0x93E8,
                0xE854: 0x93E5,
                0xE855: 0x93D8,
                0xE856: 0x93C3,
                0xE857: 0x93DD,
                0xE858: 0x93D0,
                0xE859: 0x93C8,
                0xE85A: 0x93E4,
                0xE85B: 0x941A,
                0xE85C: 0x9414,
                0xE85D: 0x9413,
                0xE85E: 0x9403,
                0xE85F: 0x9407,
                0xE860: 0x9410,
                0xE861: 0x9436,
                0xE862: 0x942B,
                0xE863: 0x9435,
                0xE864: 0x9421,
                0xE865: 0x943A,
                0xE866: 0x9441,
                0xE867: 0x9452,
                0xE868: 0x9444,
                0xE869: 0x945B,
                0xE86A: 0x9460,
                0xE86B: 0x9462,
                0xE86C: 0x945E,
                0xE86D: 0x946A,
                0xE86E: 0x9229,
                0xE86F: 0x9470,
                0xE870: 0x9475,
                0xE871: 0x9477,
                0xE872: 0x947D,
                0xE873: 0x945A,
                0xE874: 0x947C,
                0xE875: 0x947E,
                0xE876: 0x9481,
                0xE877: 0x947F,
                0xE878: 0x9582,
                0xE879: 0x9587,
                0xE87A: 0x958A,
                0xE87B: 0x9594,
                0xE87C: 0x9596,
                0xE87D: 0x9598,
                0xE87E: 0x9599,
                0xE880: 0x95A0,
                0xE881: 0x95A8,
                0xE882: 0x95A7,
                0xE883: 0x95AD,
                0xE884: 0x95BC,
                0xE885: 0x95BB,
                0xE886: 0x95B9,
                0xE887: 0x95BE,
                0xE888: 0x95CA,
                0xE889: 0x6FF6,
                0xE88A: 0x95C3,
                0xE88B: 0x95CD,
                0xE88C: 0x95CC,
                0xE88D: 0x95D5,
                0xE88E: 0x95D4,
                0xE88F: 0x95D6,
                0xE890: 0x95DC,
                0xE891: 0x95E1,
                0xE892: 0x95E5,
                0xE893: 0x95E2,
                0xE894: 0x9621,
                0xE895: 0x9628,
                0xE896: 0x962E,
                0xE897: 0x962F,
                0xE898: 0x9642,
                0xE899: 0x964C,
                0xE89A: 0x964F,
                0xE89B: 0x964B,
                0xE89C: 0x9677,
                0xE89D: 0x965C,
                0xE89E: 0x965E,
                0xE89F: 0x965D,
                0xE8A0: 0x965F,
                0xE8A1: 0x9666,
                0xE8A2: 0x9672,
                0xE8A3: 0x966C,
                0xE8A4: 0x968D,
                0xE8A5: 0x9698,
                0xE8A6: 0x9695,
                0xE8A7: 0x9697,
                0xE8A8: 0x96AA,
                0xE8A9: 0x96A7,
                0xE8AA: 0x96B1,
                0xE8AB: 0x96B2,
                0xE8AC: 0x96B0,
                0xE8AD: 0x96B4,
                0xE8AE: 0x96B6,
                0xE8AF: 0x96B8,
                0xE8B0: 0x96B9,
                0xE8B1: 0x96CE,
                0xE8B2: 0x96CB,
                0xE8B3: 0x96C9,
                0xE8B4: 0x96CD,
                0xE8B5: 0x894D,
                0xE8B6: 0x96DC,
                0xE8B7: 0x970D,
                0xE8B8: 0x96D5,
                0xE8B9: 0x96F9,
                0xE8BA: 0x9704,
                0xE8BB: 0x9706,
                0xE8BC: 0x9708,
                0xE8BD: 0x9713,
                0xE8BE: 0x970E,
                0xE8BF: 0x9711,
                0xE8C0: 0x970F,
                0xE8C1: 0x9716,
                0xE8C2: 0x9719,
                0xE8C3: 0x9724,
                0xE8C4: 0x972A,
                0xE8C5: 0x9730,
                0xE8C6: 0x9739,
                0xE8C7: 0x973D,
                0xE8C8: 0x973E,
                0xE8C9: 0x9744,
                0xE8CA: 0x9746,
                0xE8CB: 0x9748,
                0xE8CC: 0x9742,
                0xE8CD: 0x9749,
                0xE8CE: 0x975C,
                0xE8CF: 0x9760,
                0xE8D0: 0x9764,
                0xE8D1: 0x9766,
                0xE8D2: 0x9768,
                0xE8D3: 0x52D2,
                0xE8D4: 0x976B,
                0xE8D5: 0x9771,
                0xE8D6: 0x9779,
                0xE8D7: 0x9785,
                0xE8D8: 0x977C,
                0xE8D9: 0x9781,
                0xE8DA: 0x977A,
                0xE8DB: 0x9786,
                0xE8DC: 0x978B,
                0xE8DD: 0x978F,
                0xE8DE: 0x9790,
                0xE8DF: 0x979C,
                0xE8E0: 0x97A8,
                0xE8E1: 0x97A6,
                0xE8E2: 0x97A3,
                0xE8E3: 0x97B3,
                0xE8E4: 0x97B4,
                0xE8E5: 0x97C3,
                0xE8E6: 0x97C6,
                0xE8E7: 0x97C8,
                0xE8E8: 0x97CB,
                0xE8E9: 0x97DC,
                0xE8EA: 0x97ED,
                0xE8EB: 0x9F4F,
                0xE8EC: 0x97F2,
                0xE8ED: 0x7ADF,
                0xE8EE: 0x97F6,
                0xE8EF: 0x97F5,
                0xE8F0: 0x980F,
                0xE8F1: 0x980C,
                0xE8F2: 0x9838,
                0xE8F3: 0x9824,
                0xE8F4: 0x9821,
                0xE8F5: 0x9837,
                0xE8F6: 0x983D,
                0xE8F7: 0x9846,
                0xE8F8: 0x984F,
                0xE8F9: 0x984B,
                0xE8FA: 0x986B,
                0xE8FB: 0x986F,
                0xE8FC: 0x9870,
                0xE940: 0x9871,
                0xE941: 0x9874,
                0xE942: 0x9873,
                0xE943: 0x98AA,
                0xE944: 0x98AF,
                0xE945: 0x98B1,
                0xE946: 0x98B6,
                0xE947: 0x98C4,
                0xE948: 0x98C3,
                0xE949: 0x98C6,
                0xE94A: 0x98E9,
                0xE94B: 0x98EB,
                0xE94C: 0x9903,
                0xE94D: 0x9909,
                0xE94E: 0x9912,
                0xE94F: 0x9914,
                0xE950: 0x9918,
                0xE951: 0x9921,
                0xE952: 0x991D,
                0xE953: 0x991E,
                0xE954: 0x9924,
                0xE955: 0x9920,
                0xE956: 0x992C,
                0xE957: 0x992E,
                0xE958: 0x993D,
                0xE959: 0x993E,
                0xE95A: 0x9942,
                0xE95B: 0x9949,
                0xE95C: 0x9945,
                0xE95D: 0x9950,
                0xE95E: 0x994B,
                0xE95F: 0x9951,
                0xE960: 0x9952,
                0xE961: 0x994C,
                0xE962: 0x9955,
                0xE963: 0x9997,
                0xE964: 0x9998,
                0xE965: 0x99A5,
                0xE966: 0x99AD,
                0xE967: 0x99AE,
                0xE968: 0x99BC,
                0xE969: 0x99DF,
                0xE96A: 0x99DB,
                0xE96B: 0x99DD,
                0xE96C: 0x99D8,
                0xE96D: 0x99D1,
                0xE96E: 0x99ED,
                0xE96F: 0x99EE,
                0xE970: 0x99F1,
                0xE971: 0x99F2,
                0xE972: 0x99FB,
                0xE973: 0x99F8,
                0xE974: 0x9A01,
                0xE975: 0x9A0F,
                0xE976: 0x9A05,
                0xE977: 0x99E2,
                0xE978: 0x9A19,
                0xE979: 0x9A2B,
                0xE97A: 0x9A37,
                0xE97B: 0x9A45,
                0xE97C: 0x9A42,
                0xE97D: 0x9A40,
                0xE97E: 0x9A43,
                0xE980: 0x9A3E,
                0xE981: 0x9A55,
                0xE982: 0x9A4D,
                0xE983: 0x9A5B,
                0xE984: 0x9A57,
                0xE985: 0x9A5F,
                0xE986: 0x9A62,
                0xE987: 0x9A65,
                0xE988: 0x9A64,
                0xE989: 0x9A69,
                0xE98A: 0x9A6B,
                0xE98B: 0x9A6A,
                0xE98C: 0x9AAD,
                0xE98D: 0x9AB0,
                0xE98E: 0x9ABC,
                0xE98F: 0x9AC0,
                0xE990: 0x9ACF,
                0xE991: 0x9AD1,
                0xE992: 0x9AD3,
                0xE993: 0x9AD4,
                0xE994: 0x9ADE,
                0xE995: 0x9ADF,
                0xE996: 0x9AE2,
                0xE997: 0x9AE3,
                0xE998: 0x9AE6,
                0xE999: 0x9AEF,
                0xE99A: 0x9AEB,
                0xE99B: 0x9AEE,
                0xE99C: 0x9AF4,
                0xE99D: 0x9AF1,
                0xE99E: 0x9AF7,
                0xE99F: 0x9AFB,
                0xE9A0: 0x9B06,
                0xE9A1: 0x9B18,
                0xE9A2: 0x9B1A,
                0xE9A3: 0x9B1F,
                0xE9A4: 0x9B22,
                0xE9A5: 0x9B23,
                0xE9A6: 0x9B25,
                0xE9A7: 0x9B27,
                0xE9A8: 0x9B28,
                0xE9A9: 0x9B29,
                0xE9AA: 0x9B2A,
                0xE9AB: 0x9B2E,
                0xE9AC: 0x9B2F,
                0xE9AD: 0x9B32,
                0xE9AE: 0x9B44,
                0xE9AF: 0x9B43,
                0xE9B0: 0x9B4F,
                0xE9B1: 0x9B4D,
                0xE9B2: 0x9B4E,
                0xE9B3: 0x9B51,
                0xE9B4: 0x9B58,
                0xE9B5: 0x9B74,
                0xE9B6: 0x9B93,
                0xE9B7: 0x9B83,
                0xE9B8: 0x9B91,
                0xE9B9: 0x9B96,
                0xE9BA: 0x9B97,
                0xE9BB: 0x9B9F,
                0xE9BC: 0x9BA0,
                0xE9BD: 0x9BA8,
                0xE9BE: 0x9BB4,
                0xE9BF: 0x9BC0,
                0xE9C0: 0x9BCA,
                0xE9C1: 0x9BB9,
                0xE9C2: 0x9BC6,
                0xE9C3: 0x9BCF,
                0xE9C4: 0x9BD1,
                0xE9C5: 0x9BD2,
                0xE9C6: 0x9BE3,
                0xE9C7: 0x9BE2,
                0xE9C8: 0x9BE4,
                0xE9C9: 0x9BD4,
                0xE9CA: 0x9BE1,
                0xE9CB: 0x9C3A,
                0xE9CC: 0x9BF2,
                0xE9CD: 0x9BF1,
                0xE9CE: 0x9BF0,
                0xE9CF: 0x9C15,
                0xE9D0: 0x9C14,
                0xE9D1: 0x9C09,
                0xE9D2: 0x9C13,
                0xE9D3: 0x9C0C,
                0xE9D4: 0x9C06,
                0xE9D5: 0x9C08,
                0xE9D6: 0x9C12,
                0xE9D7: 0x9C0A,
                0xE9D8: 0x9C04,
                0xE9D9: 0x9C2E,
                0xE9DA: 0x9C1B,
                0xE9DB: 0x9C25,
                0xE9DC: 0x9C24,
                0xE9DD: 0x9C21,
                0xE9DE: 0x9C30,
                0xE9DF: 0x9C47,
                0xE9E0: 0x9C32,
                0xE9E1: 0x9C46,
                0xE9E2: 0x9C3E,
                0xE9E3: 0x9C5A,
                0xE9E4: 0x9C60,
                0xE9E5: 0x9C67,
                0xE9E6: 0x9C76,
                0xE9E7: 0x9C78,
                0xE9E8: 0x9CE7,
                0xE9E9: 0x9CEC,
                0xE9EA: 0x9CF0,
                0xE9EB: 0x9D09,
                0xE9EC: 0x9D08,
                0xE9ED: 0x9CEB,
                0xE9EE: 0x9D03,
                0xE9EF: 0x9D06,
                0xE9F0: 0x9D2A,
                0xE9F1: 0x9D26,
                0xE9F2: 0x9DAF,
                0xE9F3: 0x9D23,
                0xE9F4: 0x9D1F,
                0xE9F5: 0x9D44,
                0xE9F6: 0x9D15,
                0xE9F7: 0x9D12,
                0xE9F8: 0x9D41,
                0xE9F9: 0x9D3F,
                0xE9FA: 0x9D3E,
                0xE9FB: 0x9D46,
                0xE9FC: 0x9D48,
                0xEA40: 0x9D5D,
                0xEA41: 0x9D5E,
                0xEA42: 0x9D64,
                0xEA43: 0x9D51,
                0xEA44: 0x9D50,
                0xEA45: 0x9D59,
                0xEA46: 0x9D72,
                0xEA47: 0x9D89,
                0xEA48: 0x9D87,
                0xEA49: 0x9DAB,
                0xEA4A: 0x9D6F,
                0xEA4B: 0x9D7A,
                0xEA4C: 0x9D9A,
                0xEA4D: 0x9DA4,
                0xEA4E: 0x9DA9,
                0xEA4F: 0x9DB2,
                0xEA50: 0x9DC4,
                0xEA51: 0x9DC1,
                0xEA52: 0x9DBB,
                0xEA53: 0x9DB8,
                0xEA54: 0x9DBA,
                0xEA55: 0x9DC6,
                0xEA56: 0x9DCF,
                0xEA57: 0x9DC2,
                0xEA58: 0x9DD9,
                0xEA59: 0x9DD3,
                0xEA5A: 0x9DF8,
                0xEA5B: 0x9DE6,
                0xEA5C: 0x9DED,
                0xEA5D: 0x9DEF,
                0xEA5E: 0x9DFD,
                0xEA5F: 0x9E1A,
                0xEA60: 0x9E1B,
                0xEA61: 0x9E1E,
                0xEA62: 0x9E75,
                0xEA63: 0x9E79,
                0xEA64: 0x9E7D,
                0xEA65: 0x9E81,
                0xEA66: 0x9E88,
                0xEA67: 0x9E8B,
                0xEA68: 0x9E8C,
                0xEA69: 0x9E92,
                0xEA6A: 0x9E95,
                0xEA6B: 0x9E91,
                0xEA6C: 0x9E9D,
                0xEA6D: 0x9EA5,
                0xEA6E: 0x9EA9,
                0xEA6F: 0x9EB8,
                0xEA70: 0x9EAA,
                0xEA71: 0x9EAD,
                0xEA72: 0x9761,
                0xEA73: 0x9ECC,
                0xEA74: 0x9ECE,
                0xEA75: 0x9ECF,
                0xEA76: 0x9ED0,
                0xEA77: 0x9ED4,
                0xEA78: 0x9EDC,
                0xEA79: 0x9EDE,
                0xEA7A: 0x9EDD,
                0xEA7B: 0x9EE0,
                0xEA7C: 0x9EE5,
                0xEA7D: 0x9EE8,
                0xEA7E: 0x9EEF,
                0xEA80: 0x9EF4,
                0xEA81: 0x9EF6,
                0xEA82: 0x9EF7,
                0xEA83: 0x9EF9,
                0xEA84: 0x9EFB,
                0xEA85: 0x9EFC,
                0xEA86: 0x9EFD,
                0xEA87: 0x9F07,
                0xEA88: 0x9F08,
                0xEA89: 0x76B7,
                0xEA8A: 0x9F15,
                0xEA8B: 0x9F21,
                0xEA8C: 0x9F2C,
                0xEA8D: 0x9F3E,
                0xEA8E: 0x9F4A,
                0xEA8F: 0x9F52,
                0xEA90: 0x9F54,
                0xEA91: 0x9F63,
                0xEA92: 0x9F5F,
                0xEA93: 0x9F60,
                0xEA94: 0x9F61,
                0xEA95: 0x9F66,
                0xEA96: 0x9F67,
                0xEA97: 0x9F6C,
                0xEA98: 0x9F6A,
                0xEA99: 0x9F77,
                0xEA9A: 0x9F72,
                0xEA9B: 0x9F76,
                0xEA9C: 0x9F95,
                0xEA9D: 0x9F9C,
                0xEA9E: 0x9FA0,
                0xEA9F: 0x582F,
                0xEAA0: 0x69C7,
                0xEAA1: 0x9059,
                0xEAA2: 0x7464,
                0xEAA3: 0x51DC,
                0xEAA4: 0x7199
            };
        /***/ },
        /* 9 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var GenericGF_1 = __webpack_require__(1);
            var GenericGFPoly_1 = __webpack_require__(2);
            function runEuclideanAlgorithm(field, a, b, R) {
                var _a;
                // Assume a's degree is >= b's
                if (a.degree() < b.degree()) _a = [
                    b,
                    a
                ], a = _a[0], b = _a[1];
                var rLast = a;
                var r = b;
                var tLast = field.zero;
                var t = field.one;
                // Run Euclidean algorithm until r's degree is less than R/2
                while(r.degree() >= R / 2){
                    var rLastLast = rLast;
                    var tLastLast = tLast;
                    rLast = r;
                    tLast = t;
                    // Divide rLastLast by rLast, with quotient in q and remainder in r
                    if (rLast.isZero()) // Euclidean algorithm already terminated?
                    return null;
                    r = rLastLast;
                    var q = field.zero;
                    var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
                    var dltInverse = field.inverse(denominatorLeadingTerm);
                    while(r.degree() >= rLast.degree() && !r.isZero()){
                        var degreeDiff = r.degree() - rLast.degree();
                        var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
                        q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
                        r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    }
                    t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
                    if (r.degree() >= rLast.degree()) return null;
                }
                var sigmaTildeAtZero = t.getCoefficient(0);
                if (sigmaTildeAtZero === 0) return null;
                var inverse = field.inverse(sigmaTildeAtZero);
                return [
                    t.multiply(inverse),
                    r.multiply(inverse)
                ];
            }
            function findErrorLocations(field, errorLocator) {
                // This is a direct application of Chien's search
                var numErrors = errorLocator.degree();
                if (numErrors === 1) return [
                    errorLocator.getCoefficient(1)
                ];
                var result = new Array(numErrors);
                var errorCount = 0;
                for(var i = 1; i < field.size && errorCount < numErrors; i++)if (errorLocator.evaluateAt(i) === 0) {
                    result[errorCount] = field.inverse(i);
                    errorCount++;
                }
                if (errorCount !== numErrors) return null;
                return result;
            }
            function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
                // This is directly applying Forney's Formula
                var s = errorLocations.length;
                var result = new Array(s);
                for(var i = 0; i < s; i++){
                    var xiInverse = field.inverse(errorLocations[i]);
                    var denominator = 1;
                    for(var j = 0; j < s; j++)if (i !== j) denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
                    result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
                    if (field.generatorBase !== 0) result[i] = field.multiply(result[i], xiInverse);
                }
                return result;
            }
            function decode(bytes, twoS) {
                var outputBytes = new Uint8ClampedArray(bytes.length);
                outputBytes.set(bytes);
                var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
                var poly = new GenericGFPoly_1.default(field, outputBytes);
                var syndromeCoefficients = new Uint8ClampedArray(twoS);
                var error = false;
                for(var s = 0; s < twoS; s++){
                    var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
                    syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
                    if (evaluation !== 0) error = true;
                }
                if (!error) return outputBytes;
                var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
                var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
                if (sigmaOmega === null) return null;
                var errorLocations = findErrorLocations(field, sigmaOmega[0]);
                if (errorLocations == null) return null;
                var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
                for(var i = 0; i < errorLocations.length; i++){
                    var position = outputBytes.length - 1 - field.log(errorLocations[i]);
                    if (position < 0) return null;
                    outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
                }
                return outputBytes;
            }
            exports.decode = decode;
        /***/ },
        /* 10 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.VERSIONS = [
                {
                    infoBits: null,
                    versionNumber: 1,
                    alignmentPatternCenters: [],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 7,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 13,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 17,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 2,
                    alignmentPatternCenters: [
                        6,
                        18
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 10,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 34
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 28
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 16
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 3,
                    alignmentPatternCenters: [
                        6,
                        22
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 15,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 55
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 4,
                    alignmentPatternCenters: [
                        6,
                        26
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 80
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 32
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 24
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 9
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 5,
                    alignmentPatternCenters: [
                        6,
                        30
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 108
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 43
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: null,
                    versionNumber: 6,
                    alignmentPatternCenters: [
                        6,
                        34
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 16,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 27
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 19
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x07C94,
                    versionNumber: 7,
                    alignmentPatternCenters: [
                        6,
                        22,
                        38
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 78
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 31
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x085BC,
                    versionNumber: 8,
                    alignmentPatternCenters: [
                        6,
                        24,
                        42
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 97
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 38
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 39
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 18
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 19
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x09A99,
                    versionNumber: 9,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 116
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0A4D3,
                    versionNumber: 10,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 18,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 68
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 69
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0BBF6,
                    versionNumber: 11,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 81
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 50
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 51
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0C762,
                    versionNumber: 12,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 92
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 93
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 36
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 37
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0D847,
                    versionNumber: 13,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 37
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 38
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 20
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 21
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 11
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 12
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0E60D,
                    versionNumber: 14,
                    alignmentPatternCenters: [
                        6,
                        26,
                        46,
                        66
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 40
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 20,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x0F928,
                    versionNumber: 15,
                    alignmentPatternCenters: [
                        6,
                        26,
                        48,
                        70
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 22,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 87
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 88
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 12
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 13
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x10B78,
                    versionNumber: 16,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 98
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 99
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 19
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 20
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1145D,
                    versionNumber: 17,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x12A17,
                    versionNumber: 18,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 120
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 121
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 43
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 44
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 14
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x13532,
                    versionNumber: 19,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 113
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 114
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 44
                                },
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 45
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 21
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 22
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 9,
                                    dataCodewordsPerBlock: 13
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 14
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x149A6,
                    versionNumber: 20,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 107
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 108
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 41
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 42
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x15683,
                    versionNumber: 21,
                    alignmentPatternCenters: [
                        6,
                        28,
                        50,
                        72,
                        94
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 42
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x168C9,
                    versionNumber: 22,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 111
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 112
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 46
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 24,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 13
                                }
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x177EC,
                    versionNumber: 23,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        74,
                        102
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x18EC4,
                    versionNumber: 24,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 16,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 30,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x191E1,
                    versionNumber: 25,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 26,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 106
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 107
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1AFAB,
                    versionNumber: 26,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 114
                                },
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 115
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 22
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 23
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 33,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1B08E,
                    versionNumber: 27,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 8,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1CC1A,
                    versionNumber: 28,
                    alignmentPatternCenters: [
                        6,
                        26,
                        50,
                        74,
                        98,
                        122
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1D33F,
                    versionNumber: 29,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 116
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 117
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 45
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 46
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 23
                                },
                                {
                                    numBlocks: 37,
                                    dataCodewordsPerBlock: 24
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1ED75,
                    versionNumber: 30,
                    alignmentPatternCenters: [
                        6,
                        26,
                        52,
                        78,
                        104,
                        130
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 5,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 15,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 25,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x1F250,
                    versionNumber: 31,
                    alignmentPatternCenters: [
                        6,
                        30,
                        56,
                        82,
                        108,
                        134
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 3,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 28,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x209D5,
                    versionNumber: 32,
                    alignmentPatternCenters: [
                        6,
                        34,
                        60,
                        86,
                        112,
                        138
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                }
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 35,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x216F0,
                    versionNumber: 33,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 21,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 11,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x228BA,
                    versionNumber: 34,
                    alignmentPatternCenters: [
                        6,
                        34,
                        62,
                        90,
                        118,
                        146
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 115
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 116
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 23,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 44,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 59,
                                    dataCodewordsPerBlock: 16
                                },
                                {
                                    numBlocks: 1,
                                    dataCodewordsPerBlock: 17
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x2379F,
                    versionNumber: 35,
                    alignmentPatternCenters: [
                        6,
                        30,
                        54,
                        78,
                        102,
                        126,
                        150
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 12,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 26,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 39,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 41,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x24B0B,
                    versionNumber: 36,
                    alignmentPatternCenters: [
                        6,
                        24,
                        50,
                        76,
                        102,
                        128,
                        154
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 121
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 122
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 2,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 64,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x2542E,
                    versionNumber: 37,
                    alignmentPatternCenters: [
                        6,
                        28,
                        54,
                        80,
                        106,
                        132,
                        158
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 17,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 29,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 49,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 24,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 46,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x26A64,
                    versionNumber: 38,
                    alignmentPatternCenters: [
                        6,
                        32,
                        58,
                        84,
                        110,
                        136,
                        162
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 122
                                },
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 123
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 13,
                                    dataCodewordsPerBlock: 46
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 47
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 48,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 14,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 42,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 32,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x27541,
                    versionNumber: 39,
                    alignmentPatternCenters: [
                        6,
                        26,
                        54,
                        82,
                        110,
                        138,
                        166
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 117
                                },
                                {
                                    numBlocks: 4,
                                    dataCodewordsPerBlock: 118
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 40,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 7,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 43,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 22,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 10,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 67,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                },
                {
                    infoBits: 0x28C69,
                    versionNumber: 40,
                    alignmentPatternCenters: [
                        6,
                        30,
                        58,
                        86,
                        114,
                        142,
                        170
                    ],
                    errorCorrectionLevels: [
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 19,
                                    dataCodewordsPerBlock: 118
                                },
                                {
                                    numBlocks: 6,
                                    dataCodewordsPerBlock: 119
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 28,
                            ecBlocks: [
                                {
                                    numBlocks: 18,
                                    dataCodewordsPerBlock: 47
                                },
                                {
                                    numBlocks: 31,
                                    dataCodewordsPerBlock: 48
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 24
                                },
                                {
                                    numBlocks: 34,
                                    dataCodewordsPerBlock: 25
                                }, 
                            ]
                        },
                        {
                            ecCodewordsPerBlock: 30,
                            ecBlocks: [
                                {
                                    numBlocks: 20,
                                    dataCodewordsPerBlock: 15
                                },
                                {
                                    numBlocks: 61,
                                    dataCodewordsPerBlock: 16
                                }, 
                            ]
                        }, 
                    ]
                }, 
            ];
        /***/ },
        /* 11 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var BitMatrix_1 = __webpack_require__(0);
            function squareToQuadrilateral(p1, p2, p3, p4) {
                var dx3 = p1.x - p2.x + p3.x - p4.x;
                var dy3 = p1.y - p2.y + p3.y - p4.y;
                if (dx3 === 0 && dy3 === 0) return {
                    a11: p2.x - p1.x,
                    a12: p2.y - p1.y,
                    a13: 0,
                    a21: p3.x - p2.x,
                    a22: p3.y - p2.y,
                    a23: 0,
                    a31: p1.x,
                    a32: p1.y,
                    a33: 1
                };
                else {
                    var dx1 = p2.x - p3.x;
                    var dx2 = p4.x - p3.x;
                    var dy1 = p2.y - p3.y;
                    var dy2 = p4.y - p3.y;
                    var denominator = dx1 * dy2 - dx2 * dy1;
                    var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
                    var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
                    return {
                        a11: p2.x - p1.x + a13 * p2.x,
                        a12: p2.y - p1.y + a13 * p2.y,
                        a13: a13,
                        a21: p4.x - p1.x + a23 * p4.x,
                        a22: p4.y - p1.y + a23 * p4.y,
                        a23: a23,
                        a31: p1.x,
                        a32: p1.y,
                        a33: 1
                    };
                }
            }
            function quadrilateralToSquare(p1, p2, p3, p4) {
                // Here, the adjoint serves as the inverse:
                var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
                return {
                    a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
                    a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
                    a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
                    a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
                    a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
                    a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
                    a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
                    a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
                    a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
                };
            }
            function times(a, b) {
                return {
                    a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
                    a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
                    a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
                    a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
                    a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
                    a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
                    a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
                    a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
                    a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
                };
            }
            function extract(image, location) {
                var qToS = quadrilateralToSquare({
                    x: 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 3.5,
                    y: 3.5
                }, {
                    x: location.dimension - 6.5,
                    y: location.dimension - 6.5
                }, {
                    x: 3.5,
                    y: location.dimension - 3.5
                });
                var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
                var transform = times(sToQ, qToS);
                var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
                var mappingFunction = function(x, y) {
                    var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
                    return {
                        x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
                        y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator
                    };
                };
                for(var y1 = 0; y1 < location.dimension; y1++)for(var x1 = 0; x1 < location.dimension; x1++){
                    var xValue = x1 + 0.5;
                    var yValue = y1 + 0.5;
                    var sourcePixel = mappingFunction(xValue, yValue);
                    matrix.set(x1, y1, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
                }
                return {
                    matrix: matrix,
                    mappingFunction: mappingFunction
                };
            }
            exports.extract = extract;
        /***/ },
        /* 12 */ /***/ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var MAX_FINDERPATTERNS_TO_SEARCH = 4;
            var MIN_QUAD_RATIO = 0.5;
            var MAX_QUAD_RATIO = 1.5;
            var distance = function(a, b) {
                return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            };
            function sum(values) {
                return values.reduce(function(a, b) {
                    return a + b;
                });
            }
            // Takes three finder patterns and organizes them into topLeft, topRight, etc
            function reorderFinderPatterns(pattern1, pattern2, pattern3) {
                var _a, _b, _c, _d;
                // Find distances between pattern centers
                var oneTwoDistance = distance(pattern1, pattern2);
                var twoThreeDistance = distance(pattern2, pattern3);
                var oneThreeDistance = distance(pattern1, pattern3);
                var bottomLeft;
                var topLeft;
                var topRight;
                // Assume one closest to other two is B; A and C will just be guesses at first
                if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) _a = [
                    pattern2,
                    pattern1,
                    pattern3
                ], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
                else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) _b = [
                    pattern1,
                    pattern2,
                    pattern3
                ], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
                else _c = [
                    pattern1,
                    pattern3,
                    pattern2
                ], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
                // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
                // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
                // we've got it flipped around and should swap topRight and bottomLeft.
                if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) _d = [
                    topRight,
                    bottomLeft
                ], bottomLeft = _d[0], topRight = _d[1];
                return {
                    bottomLeft: bottomLeft,
                    topLeft: topLeft,
                    topRight: topRight
                };
            }
            // Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
            function computeDimension(topLeft, topRight, bottomLeft, matrix) {
                var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
                if (moduleSize < 1) throw new Error("Invalid module size");
                var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
                var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
                var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
                switch(dimension % 4){
                    case 0:
                        dimension++;
                        break;
                    case 2:
                        dimension--;
                        break;
                }
                return {
                    dimension: dimension,
                    moduleSize: moduleSize
                };
            }
            // Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
            // Returns an array of elements, representing the pixel size of the black white run.
            // Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
            function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
                var switchPoints = [
                    {
                        x: Math.floor(origin.x),
                        y: Math.floor(origin.y)
                    }
                ];
                var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
                var fromX;
                var fromY;
                var toX;
                var toY;
                if (steep) {
                    fromX = Math.floor(origin.y);
                    fromY = Math.floor(origin.x);
                    toX = Math.floor(end.y);
                    toY = Math.floor(end.x);
                } else {
                    fromX = Math.floor(origin.x);
                    fromY = Math.floor(origin.y);
                    toX = Math.floor(end.x);
                    toY = Math.floor(end.y);
                }
                var dx = Math.abs(toX - fromX);
                var dy = Math.abs(toY - fromY);
                var error = Math.floor(-dx / 2);
                var xStep = fromX < toX ? 1 : -1;
                var yStep = fromY < toY ? 1 : -1;
                var currentPixel = true;
                // Loop up until x == toX, but not beyond
                for(var x = fromX, y = fromY; x !== toX + xStep; x += xStep){
                    // Does current pixel mean we have moved white to black or vice versa?
                    // Scanning black in state 0,2 and white in state 1, so if we find the wrong
                    // color, advance to next state or end if we are in state 2 already
                    var realX = steep ? y : x;
                    var realY = steep ? x : y;
                    if (matrix.get(realX, realY) !== currentPixel) {
                        currentPixel = !currentPixel;
                        switchPoints.push({
                            x: realX,
                            y: realY
                        });
                        if (switchPoints.length === length + 1) break;
                    }
                    error += dy;
                    if (error > 0) {
                        if (y === toY) break;
                        y += yStep;
                        error -= dx;
                    }
                }
                var distances = [];
                for(var i = 0; i < length; i++)if (switchPoints[i] && switchPoints[i + 1]) distances.push(distance(switchPoints[i], switchPoints[i + 1]));
                else distances.push(0);
                return distances;
            }
            // Takes an origin point and an end point and counts the sizes of the black white run in the origin point
            // along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
            // of the black white run. Takes a length which represents the number of switches from black to white to look for.
            function countBlackWhiteRun(origin, end, matrix, length) {
                var _a;
                var rise = end.y - origin.y;
                var run = end.x - origin.x;
                var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
                var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
                    x: origin.x - run,
                    y: origin.y - rise
                }, matrix, Math.ceil(length / 2));
                var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
                return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
            }
            // Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
            // that is the amount the run diverges from the expected ratio
            function scoreBlackWhiteRun(sequence, ratios) {
                var averageSize = sum(sequence) / sum(ratios);
                var error = 0;
                ratios.forEach(function(ratio, i) {
                    error += Math.pow(sequence[i] - ratio * averageSize, 2);
                });
                return {
                    averageSize: averageSize,
                    error: error
                };
            }
            // Takes an X,Y point and an array of sizes and scores the point against those ratios.
            // For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
            // against that.
            function scorePattern(point, ratios, matrix) {
                try {
                    var horizontalRun = countBlackWhiteRun(point, {
                        x: -1,
                        y: point.y
                    }, matrix, ratios.length);
                    var verticalRun = countBlackWhiteRun(point, {
                        x: point.x,
                        y: -1
                    }, matrix, ratios.length);
                    var topLeftPoint = {
                        x: Math.max(0, point.x - point.y) - 1,
                        y: Math.max(0, point.y - point.x) - 1
                    };
                    var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
                    var bottomLeftPoint = {
                        x: Math.min(matrix.width, point.x + point.y) + 1,
                        y: Math.min(matrix.height, point.y + point.x) + 1
                    };
                    var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
                    var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
                    var vertError = scoreBlackWhiteRun(verticalRun, ratios);
                    var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
                    var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
                    var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
                    var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
                    var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
                    return ratioError + sizeError;
                } catch (_a) {
                    return Infinity;
                }
            }
            function recenterLocation(matrix, p) {
                var leftX = Math.round(p.x);
                while(matrix.get(leftX, Math.round(p.y)))leftX--;
                var rightX = Math.round(p.x);
                while(matrix.get(rightX, Math.round(p.y)))rightX++;
                var x = (leftX + rightX) / 2;
                var topY = Math.round(p.y);
                while(matrix.get(Math.round(x), topY))topY--;
                var bottomY = Math.round(p.y);
                while(matrix.get(Math.round(x), bottomY))bottomY++;
                var y = (topY + bottomY) / 2;
                return {
                    x: x,
                    y: y
                };
            }
            function locate(matrix) {
                var finderPatternQuads = [];
                var activeFinderPatternQuads = [];
                var alignmentPatternQuads = [];
                var activeAlignmentPatternQuads = [];
                var _loop_1 = function(y) {
                    var length_1 = 0;
                    var lastBit = false;
                    var scans = [
                        0,
                        0,
                        0,
                        0,
                        0
                    ];
                    var _loop_2 = function(x) {
                        var v = matrix.get(x, y);
                        if (v === lastBit) length_1++;
                        else {
                            scans = [
                                scans[1],
                                scans[2],
                                scans[3],
                                scans[4],
                                length_1
                            ];
                            length_1 = 1;
                            lastBit = v;
                            // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                            var averageFinderPatternBlocksize = sum(scans) / 7;
                            var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v; // And make sure the current pixel is white since finder patterns are bordered in white
                            // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                            var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                            var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v; // Is the current pixel black since alignment patterns are bordered in black
                            if (validFinderPattern) {
                                // Compute the start and end x values of the large center black square
                                var endX_1 = x - scans[3] - scans[4];
                                var startX_1 = endX_1 - scans[2];
                                var line = {
                                    startX: startX_1,
                                    endX: endX_1,
                                    y: y
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeFinderPatternQuads.filter(function(q) {
                                    return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeFinderPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                            if (validAlignmentPattern) {
                                // Compute the start and end x values of the center black square
                                var endX_2 = x - scans[4];
                                var startX_2 = endX_2 - scans[3];
                                var line = {
                                    startX: startX_2,
                                    y: y,
                                    endX: endX_2
                                };
                                // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                                // that line as the starting point.
                                var matchingQuads = activeAlignmentPatternQuads.filter(function(q) {
                                    return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
                                });
                                if (matchingQuads.length > 0) matchingQuads[0].bottom = line;
                                else activeAlignmentPatternQuads.push({
                                    top: line,
                                    bottom: line
                                });
                            }
                        }
                    };
                    for(var x2 = -1; x2 <= matrix.width; x2++)_loop_2(x2);
                    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
                    }));
                    activeFinderPatternQuads = activeFinderPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y !== y;
                    }));
                    activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function(q) {
                        return q.bottom.y === y;
                    });
                };
                for(var y2 = 0; y2 <= matrix.height; y2++)_loop_1(y2);
                finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }));
                alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
                var finderPatternGroups = finderPatternQuads.filter(function(q) {
                    return q.bottom.y - q.top.y >= 2;
                }) // All quads must be at least 2px tall since the center square is larger than a block
                .map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.round(x), Math.round(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var score = scorePattern({
                        x: Math.round(x),
                        y: Math.round(y)
                    }, [
                        1,
                        1,
                        3,
                        1,
                        1
                    ], matrix);
                    return {
                        score: score,
                        x: x,
                        y: y,
                        size: size
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected quads from above
                .sort(function(a, b) {
                    return a.score - b.score;
                })// Now take the top finder pattern options and try to find 2 other options with a similar size.
                .map(function(point, i, finderPatterns) {
                    if (i > MAX_FINDERPATTERNS_TO_SEARCH) return null;
                    var otherPoints = finderPatterns.filter(function(p, ii) {
                        return i !== ii;
                    }).map(function(p) {
                        return {
                            x: p.x,
                            y: p.y,
                            score: p.score + Math.pow(p.size - point.size, 2) / point.size,
                            size: p.size
                        };
                    }).sort(function(a, b) {
                        return a.score - b.score;
                    });
                    if (otherPoints.length < 2) return null;
                    var score = point.score + otherPoints[0].score + otherPoints[1].score;
                    return {
                        points: [
                            point
                        ].concat(otherPoints.slice(0, 2)),
                        score: score
                    };
                }).filter(function(q) {
                    return !!q;
                }) // Filter out any rejected finder patterns from above
                .sort(function(a, b) {
                    return a.score - b.score;
                });
                if (finderPatternGroups.length === 0) return null;
                var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
                var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
                var result = [];
                if (alignment) result.push({
                    alignmentPattern: {
                        x: alignment.alignmentPattern.x,
                        y: alignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: bottomLeft.x,
                        y: bottomLeft.y
                    },
                    dimension: alignment.dimension,
                    topLeft: {
                        x: topLeft.x,
                        y: topLeft.y
                    },
                    topRight: {
                        x: topRight.x,
                        y: topRight.y
                    }
                });
                // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
                // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
                // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
                // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
                // attempts at decoding harder images.
                var midTopRight = recenterLocation(matrix, topRight);
                var midTopLeft = recenterLocation(matrix, topLeft);
                var midBottomLeft = recenterLocation(matrix, bottomLeft);
                var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
                if (centeredAlignment) result.push({
                    alignmentPattern: {
                        x: centeredAlignment.alignmentPattern.x,
                        y: centeredAlignment.alignmentPattern.y
                    },
                    bottomLeft: {
                        x: midBottomLeft.x,
                        y: midBottomLeft.y
                    },
                    topLeft: {
                        x: midTopLeft.x,
                        y: midTopLeft.y
                    },
                    topRight: {
                        x: midTopRight.x,
                        y: midTopRight.y
                    },
                    dimension: centeredAlignment.dimension
                });
                if (result.length === 0) return null;
                return result;
            }
            exports.locate = locate;
            function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
                var _a;
                // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
                // We'll use these to help find the alignment pattern but also later when we do the extraction.
                var dimension;
                var moduleSize;
                try {
                    _a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
                } catch (e) {
                    return null;
                }
                // Now find the alignment pattern
                var bottomRightFinderPattern = {
                    x: topRight.x - topLeft.x + bottomLeft.x,
                    y: topRight.y - topLeft.y + bottomLeft.y
                };
                var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
                var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
                var expectedAlignmentPattern = {
                    x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
                    y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
                };
                var alignmentPatterns = alignmentPatternQuads.map(function(q) {
                    var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
                    var y = (q.top.y + q.bottom.y + 1) / 2;
                    if (!matrix.get(Math.floor(x), Math.floor(y))) return;
                    var lengths = [
                        q.top.endX - q.top.startX,
                        q.bottom.endX - q.bottom.startX,
                        q.bottom.y - q.top.y + 1
                    ];
                    var size = sum(lengths) / lengths.length;
                    var sizeScore = scorePattern({
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, [
                        1,
                        1,
                        1
                    ], matrix);
                    var score = sizeScore + distance({
                        x: x,
                        y: y
                    }, expectedAlignmentPattern);
                    return {
                        x: x,
                        y: y,
                        score: score
                    };
                }).filter(function(v) {
                    return !!v;
                }).sort(function(a, b) {
                    return a.score - b.score;
                });
                // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
                // so we can only use our best guess.
                var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
                return {
                    alignmentPattern: alignmentPattern,
                    dimension: dimension
                };
            }
        /***/ }
    ])["default"];
});

},{}],"7Gtcu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "save_settings", ()=>save_settings
);
parcelHelpers.export(exports, "load_settings", ()=>load_settings
);
parcelHelpers.export(exports, "load_settings_from_file", ()=>load_settings_from_file
);
parcelHelpers.export(exports, "export_settings", ()=>export_settings
);
var _appJs = require("../../app.js");
var _helperJs = require("./helper.js");
"use strict";
let save_settings = function() {
    if (document.getElementById("source-local").value == "" && document.getElementById("source").value == "") {
        _helperJs.toaster("please fill in the location of the source file", 3000);
        return false;
    }
    if (document.getElementById("source").value != "") {
        if (!_helperJs.validate(document.getElementById("source").value)) {
            _helperJs.toaster("url not valid", 2000);
            return false;
        }
    }
    localStorage.setItem("interval", document.getElementById("time").value);
    localStorage.setItem("source", document.getElementById("source").value);
    localStorage.setItem("source_local", document.getElementById("source-local").value);
    localStorage.setItem("sleep_time", document.getElementById("sleep-mode").value);
    localStorage.setItem("epsiodes_download", document.getElementById("episodes-download").value);
    _helperJs.toaster("saved, the settings will be active the next time the app is started.", 5000);
    _helperJs.toaster("saved successfully", 2000);
    return true;
};
let load_settings = function() {
    if (localStorage.getItem("epsiodes_download") !== null) document.getElementById("episodes-download").value = localStorage.getItem("epsiodes_download");
    if (localStorage.getItem("interval") != null) document.getElementById("time").value = localStorage.getItem("interval");
    if (localStorage.getItem("source") != null) document.getElementById("source").value = localStorage.getItem("source");
    if (localStorage.getItem("source_local") != null) document.getElementById("source-local").value = localStorage.getItem("source_local");
    if (localStorage.getItem("sleep_time") !== null) document.getElementById("sleep-mode").value = localStorage.getItem("sleep_time");
};
let load_settings_from_file = function() {
    const sdcard = navigator.getDeviceStorage("sdcard");
    var file = sdcard.get("feedolin_settings.json");
    _helperJs.toaster("search setting file", 2000);
    file.onerror = function() {
        _helperJs.toaster("error", 2000);
    };
    file.onerror = function() {
        _helperJs.toaster("error", 2000);
    };
    file.onsuccess = function() {
        _helperJs.toaster(file.result, 2000);
        let reader = new FileReader();
        reader.readAsText(file.result);
        reader.onload = function() {
            let data = JSON.parse(reader.result);
            let settings = data[0];
            console.log(settings);
            document.getElementById("source-local").value = settings.source_local;
            document.getElementById("source").value = settings.source;
            document.getElementById("time").value = settings.interval;
            document.getElementById("episodes-download").value = settings.epsiodes_download;
            document.getElementById("sleep-mode").value = settings.sleep_time;
            _helperJs.toaster("the settings were loaded from the file, if you want to use them permanently don't forget to save.", 3000);
            reader.onerror = function() {
                _helperJs.toaster(reader.error);
            };
        };
    };
};
let export_settings = function() {
    var sdcard = navigator.getDeviceStorage("sdcard");
    var request_del = sdcard.delete("feedolin_settings.json");
    request_del.onsuccess = function() {};
    request_del.onerror = function() {};
    setTimeout(function() {
        let data = JSON.stringify(_appJs.setting);
        var file = new Blob([
            "[" + data + "]"
        ], {
            type: "application/json"
        });
        var request = sdcard.addNamed(file, "feedolin_settings.json");
        request.onsuccess = function() {
            var name = this.result;
            _helperJs.toaster("settings exported, feedolin_settings.json", 5000);
        };
        request.onerror = function() {
            _helperJs.toaster("Unable to write the file", 2000);
        };
    }, 2000);
};

},{"../../app.js":"20BJq","./helper.js":"db1Xp","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"9lrwz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "play_podcast", ()=>play_podcast
);
parcelHelpers.export(exports, "stop_player", ()=>stop_player
);
parcelHelpers.export(exports, "seeking", ()=>seeking
);
parcelHelpers.export(exports, "volume_control", ()=>volume_control
);
var _appJs = require("../../app.js");
var _helperJs = require("./helper.js");
var _translationsJs = require("../../assets/js/translations.js");
"use strict";
let player = new Audio();
player.mozAudioChannelType = "content";
player.type = "audio/mpeg";
player.mozaudiochannel = "content";
player.preload = "none";
let getduration;
let duration = "";
if (navigator.mozAudioChannelManager) navigator.mozAudioChannelManager.volumeControlChannel = "content";
let stream_id = "";
let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
    let d = JSON.parse(localStorage.getItem("audio_memory"));
    audio_memory = d;
} else audio_memory = {};
let play_podcast = function(url) {
    if (url != player.src) {
        player.src = url;
        player.play();
        _appJs.status.audio_status = "play";
        return true;
    }
    if (!player.paused) {
        player.pause();
        _appJs.status.audio_status = "pause";
        return false;
    }
    if (player.paused) {
        _appJs.status.audio_status = "play";
        player.play();
    }
};
let stop_player = function() {
    player.src = "";
    clearInterval(getduration);
};
let seeking = function(param) {
    var step = 10;
    if (param == "backward") player.currentTime = player.currentTime - step++;
    if (param == "forward") player.currentTime = player.currentTime + step++;
};
let volume_control = function(param) {
    if (param == "up") {
        navigator.volumeManager.requestUp();
        setTimeout(function() {
            volume_status = false;
            if (_appJs.status.window_status == "source-page") navigator.spatialNavigationEnabled = true;
        }, 3000);
    }
    if (param == "down") {
        navigator.volumeManager.requestDown();
        setTimeout(function() {
            volume_status = false;
            if (_appJs.status.window_status == "source-page") navigator.spatialNavigationEnabled = true;
        }, 3000);
    }
};
player.onloadedmetadata = function() {
    stream_id = document.activeElement.getAttribute("data-id");
    if (audio_memory.hasOwnProperty(stream_id)) {
        player.pause();
        var w = confirm("would you like to continue the podcast ?");
        if (w) {
            player.play();
            player.currentTime = audio_memory[stream_id];
        }
        if (!w) {
            player.play();
            delete audio_memory[stream_id];
        }
    }
};
let remember = function() {
    //rember position
    if (player.currentTime > 10) {
        audio_memory[stream_id] = player.currentTime;
        var tt = JSON.stringify(audio_memory);
        localStorage.setItem("audio_memory", tt);
    }
};
player.addEventListener("play", (event)=>{
    _helperJs.bottom_bar(_translationsJs.translations[_appJs.userLang].player_pause, duration, "");
});
player.addEventListener("pause", (event)=>{
    remember();
    _helperJs.bottom_bar(_translationsJs.translations[_appJs.userLang].player_play, duration, "");
    clearInterval(getduration);
});
let toTime = function(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
};
player.addEventListener("playing", (event)=>{
    if (player.networkState === 2) _helperJs.toaster("loading media", 1000);
    let articles = document.querySelectorAll("article");
    for(var i = 0; i < articles.length; i++)articles[i].classList.remove("audio-playing");
    document.activeElement.classList.add("audio-playing");
    document.getElementById("progress-bar").style.display = "block";
    _appJs.status.active_audio_element_id = document.activeElement.getAttribute("data-id");
    _appJs.status.active_element_id = document.activeElement.getAttribute("data-id");
    document.getElementById("audio-title").innerText = document.activeElement.getAttribute("data-title");
    //add recently played tracks in list
    if (_appJs.recently_played.indexOf(_appJs.status.active_element_id) == -1) {
        if (_appJs.recently_played.length > 4) _appJs.recently_played.shift();
        _appJs.recently_played.push(_appJs.status.active_element_id);
        localStorage.setItem("recently_played", JSON.stringify(_appJs.recently_played));
    }
    getduration = setInterval(function() {
        if (!player.paused) {
            var time = player.duration - player.currentTime;
            let percent = player.currentTime / player.duration * 100;
            document.querySelector("div#progress-bar div").style.width = percent + "%";
            _appJs.status.audio_duration = toTime(time);
            if (_appJs.status.window_status == "audio-player") _helperJs.bottom_bar(_translationsJs.translations[_appJs.userLang].player_pause, toTime(time), "");
        }
    }, 1000);
});
player.onended = function() {
    if (audio_memory.hasOwnProperty(stream_id)) delete audio_memory.stream_id;
    if (localStorage.getItem("listened_elem")) listened_elem = JSON.parse(localStorage["listened_elem"]);
    _appJs.listened_elem.push(_appJs.status.active_audio_element_id);
    localStorage.setItem("listened_elem", JSON.stringify(_appJs.listened_elem));
    clearInterval(getduration);
    _appJs.status.audio_duration = 0;
    document.getElementById("progress-bar").style.display = "none";
};
player.addEventListener("error", ()=>{
    clearInterval(getduration);
});

},{"../../app.js":"20BJq","./helper.js":"db1Xp","../../assets/js/translations.js":"3MYwo","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["59mMM","20BJq"], "20BJq", "parcelRequire94c2")

