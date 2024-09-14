(function () {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire5393"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire5393"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("kDffi", function(module, exports) {

$parcel$export(module.exports, "register", function () { return $f05346a33658c95b$export$6503ec6e8aabbaf; }, function (v) { return $f05346a33658c95b$export$6503ec6e8aabbaf = v; });
var $f05346a33658c95b$export$6503ec6e8aabbaf;
var $f05346a33658c95b$export$f7ad0328861e2f03;
"use strict";
var $f05346a33658c95b$var$mapping = new Map();
function $f05346a33658c95b$var$register(baseUrl, manifest) {
    for(var i = 0; i < manifest.length - 1; i += 2)$f05346a33658c95b$var$mapping.set(manifest[i], {
        baseUrl: baseUrl,
        path: manifest[i + 1]
    });
}
function $f05346a33658c95b$var$resolve(id) {
    var resolved = $f05346a33658c95b$var$mapping.get(id);
    if (resolved == null) throw new Error("Could not resolve bundle with id " + id);
    return new URL(resolved.path, resolved.baseUrl).toString();
}
$f05346a33658c95b$export$6503ec6e8aabbaf = $f05346a33658c95b$var$register;
$f05346a33658c95b$export$f7ad0328861e2f03 = $f05346a33658c95b$var$resolve;

});

parcelRegister("xqsiy", function(module, exports) {

$parcel$export(module.exports, "getBundleURL", function () { return $06479aad94a8f866$export$bdfd709ae4826697; }, function (v) { return $06479aad94a8f866$export$bdfd709ae4826697 = v; });
var $06479aad94a8f866$export$bdfd709ae4826697;
var $06479aad94a8f866$export$c9e73fbda7da57b6;
var $06479aad94a8f866$export$5a759dc7a1cfb72a;
"use strict";
var $06479aad94a8f866$var$bundleURL = {};
function $06479aad94a8f866$var$getBundleURLCached(id) {
    var value = $06479aad94a8f866$var$bundleURL[id];
    if (!value) {
        value = $06479aad94a8f866$var$getBundleURL();
        $06479aad94a8f866$var$bundleURL[id] = value;
    }
    return value;
}
function $06479aad94a8f866$var$getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return $06479aad94a8f866$var$getBaseURL(matches[2]);
    }
    return "/";
}
function $06479aad94a8f866$var$getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function $06479aad94a8f866$var$getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
$06479aad94a8f866$export$bdfd709ae4826697 = $06479aad94a8f866$var$getBundleURLCached;
$06479aad94a8f866$export$c9e73fbda7da57b6 = $06479aad94a8f866$var$getBaseURL;
$06479aad94a8f866$export$5a759dc7a1cfb72a = $06479aad94a8f866$var$getOrigin;

});

var $7feabcc09eb4afac$exports = {};


(parcelRequire("kDffi")).register((parcelRequire("xqsiy")).getBundleURL("2D5Ur"), JSON.parse('["2D5Ur","index.7956873b.js","2qxSZ","sw.js"]'));

})();
