var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ "use strict";
    var aa = function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            };
        };
    };
    var ca = function ca(a) {
        a = [
            "object" == typeof globalThis && globalThis,
            a,
            "object" == typeof window && window,
            "object" == typeof self && self,
            "object" == typeof global && global
        ];
        for(var b = 0; b < a.length; ++b){
            var c = a[b];
            if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
    };
    var r = function r(a, b) {
        if (b) a: {
            var c = da;
            a = a.split(".");
            for(var d = 0; d < a.length - 1; d++){
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e];
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            });
        }
    };
    var ea = function ea(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this;
        };
        return a;
    };
    var u = function u(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        };
    };
    var fa = function fa(a) {
        if (!(a instanceof Array)) {
            a = u(a);
            for(var b, c = []; !(b = a.next()).done;)c.push(b.value);
            a = c;
        }
        return a;
    };
    var v = function v(a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (oa) oa(a, b);
        else for(var c in b)if ("prototype" != c) {
            if (Object.defineProperties) {
                var d = Object.getOwnPropertyDescriptor(b, c);
                d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
        }
        a.N = b.prototype;
    };
    var pa = function pa() {
        this.u = !1;
        this.l = null;
        this.i = void 0;
        this.h = 1;
        this.m = this.v = 0;
        this.I = this.j = null;
    };
    var qa = function qa(a) {
        if (a.u) throw new TypeError("Generator is already running");
        a.u = !0;
    };
    var ra = function ra(a, b) {
        a.j = {
            Ma: b,
            Qa: !0
        };
        a.h = a.v || a.m;
    };
    var w = function w(a, b, c) {
        a.h = c;
        return {
            value: b
        };
    };
    var sa = function sa(a, b, c) {
        a.v = b;
        void 0 != c && (a.m = c);
    };
    var ta = function ta(a, b) {
        a.h = b;
        a.v = 0;
    };
    var ua = function ua(a) {
        a.v = 0;
        var b = a.j.Ma;
        a.j = null;
        return b;
    };
    var xa = function xa(a) {
        a.I = [
            a.j
        ];
        a.v = 0;
        a.m = 0;
    };
    var ya = function ya(a) {
        var b = a.I.splice(0)[0];
        (b = a.j = a.j || b) ? b.Qa ? a.h = a.v || a.m : void 0 != b.o && a.m < b.o ? (a.h = b.o, a.j = null) : a.h = a.m : a.h = 0;
    };
    var za = function za(a) {
        this.h = new pa();
        this.i = a;
    };
    var Aa = function Aa(a, b) {
        qa(a.h);
        var c = a.h.l;
        if (c) return Ba(a, "return" in c ? c["return"] : function(d) {
            return {
                value: d,
                done: !0
            };
        }, b, a.h.return);
        a.h.return(b);
        return Ca(a);
    };
    var Ba = function Ba(a, b, c, d) {
        try {
            var e = b.call(a.h.l, c);
            if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done) return a.h.u = !1, e;
            var f = e.value;
        } catch (g) {
            return a.h.l = null, ra(a.h, g), Ca(a);
        }
        a.h.l = null;
        d.call(a.h, f);
        return Ca(a);
    };
    var Ca = function Ca(a) {
        for(; a.h.h;)try {
            var b = a.i(a.h);
            if (b) return a.h.u = !1, {
                value: b.value,
                done: !1
            };
        } catch (c) {
            a.h.i = void 0, ra(a.h, c);
        }
        a.h.u = !1;
        if (a.h.j) {
            b = a.h.j;
            a.h.j = null;
            if (b.Qa) throw b.Ma;
            return {
                value: b.return,
                done: !0
            };
        }
        return {
            value: void 0,
            done: !0
        };
    };
    var Da = function Da(a) {
        this.next = function(b) {
            qa(a.h);
            a.h.l ? b = Ba(a, a.h.l.next, b, a.h.A) : (a.h.A(b), b = Ca(a));
            return b;
        };
        this.throw = function(b) {
            qa(a.h);
            a.h.l ? b = Ba(a, a.h.l["throw"], b, a.h.A) : (ra(a.h, b), b = Ca(a));
            return b;
        };
        this.return = function(b) {
            return Aa(a, b);
        };
        this[Symbol.iterator] = function() {
            return this;
        };
    };
    var Ea = function Ea(a) {
        function b(d) {
            return a.next(d);
        }
        function c(d) {
            return a.throw(d);
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
            }
            f(a.next());
        });
    };
    var z = function z(a) {
        return Ea(new Da(new za(a)));
    };
    var Fa = function Fa() {
        for(var a = Number(this), b = [], c = a; c < arguments.length; c++)b[c - a] = arguments[c];
        return b;
    };
    var Ga = function Ga(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var Ha = function Ha(a, b, c) {
        if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + "";
    };
    var Ia = function Ia(a, b) {
        a instanceof String && (a += "");
        var c = 0, d = !1, e = {
            next: function next() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    };
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                };
            }
        };
        e[Symbol.iterator] = function() {
            return e;
        };
        return e;
    };
    var C = function C(a, b) {
        a = a.split(".");
        b = b || B;
        for(var c = 0; c < a.length; c++)if (b = b[a[c]], null == b) return null;
        return b;
    };
    var Ka = function Ka() {};
    var La = function La(a) {
        var b = typeof a === "undefined" ? "undefined" : _typeof(a);
        b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return "array" == b || "object" == b && "number" == typeof a.length;
    };
    var Ma = function Ma(a) {
        var b = typeof a === "undefined" ? "undefined" : _typeof(a);
        return "object" == b && null != a || "function" == b;
    };
    var Na = function Na(a) {
        return Object.prototype.hasOwnProperty.call(a, Oa) && a[Oa] || (a[Oa] = ++Pa);
    };
    var Qa = function Qa(a, b, c) {
        return a.call.apply(a.bind, arguments);
    };
    var Ra = function Ra(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e);
            };
        }
        return function() {
            return a.apply(b, arguments);
        };
    };
    var D = function D(a, b) {
        a = a.split(".");
        var c = B;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for(var d; a.length && (d = a.shift());)a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
    };
    var E = function E(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.N = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
        a.Lb = function(d, e, f) {
            for(var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g);
        };
    };
    var Ta = function Ta(a) {
        return a;
    };
    var Va = function Va(a) {
        a = a.url;
        var b = /[?&]dsh=1(&|$)/.test(a);
        this.j = !b && /[?&]ae=1(&|$)/.test(a);
        this.l = !b && /[?&]ae=2(&|$)/.test(a);
        if ((this.h = /[?&]adurl=([^&]*)/.exec(a)) && this.h[1]) {
            try {
                var c = decodeURIComponent(this.h[1]);
            } catch (d) {
                c = null;
            }
            this.i = c;
        }
    };
    var Wa = function Wa(a) {
        var b = !1, c;
        return function() {
            b || (c = a(), b = !0);
            return c;
        };
    };
    var Za = function Za(a, b) {
        b = Xa(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c;
    };
    var $a = function $a(a) {
        return Array.prototype.concat.apply([], arguments);
    };
    var ab = function ab(a) {
        var b = a.length;
        if (0 < b) {
            for(var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c;
        }
        return [];
    };
    var bb = function bb(a, b) {
        for(var c = 1; c < arguments.length; c++){
            var d = arguments[c];
            if (La(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for(var g = 0; g < f; g++)a[e + g] = d[g];
            } else a.push(d);
        }
    };
    var cb = function cb(a, b) {
        for(var c in a)b.call(void 0, a[c], c, a);
    };
    var db = function db(a) {
        var b = eb, c;
        for(c in b)if (a.call(void 0, b[c], c, b)) return c;
    };
    var fb = function fb(a, b) {
        for(var c in a)if (!(c in b) || a[c] !== b[c]) return !1;
        for(var d in b)if (!(d in a)) return !1;
        return !0;
    };
    var ib = function ib(a, b) {
        for(var c, d, e = 1; e < arguments.length; e++){
            d = arguments[e];
            for(c in d)a[c] = d[c];
            for(var f = 0; f < hb.length; f++)c = hb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    };
    var kb = function kb() {};
    var lb = function lb(a) {
        return new kb(nb, a);
    };
    var wb = function wb() {
        var a = B.navigator;
        return a && (a = a.userAgent) ? a : "";
    };
    var G = function G(a) {
        return -1 != wb().indexOf(a);
    };
    var xb = function xb() {
        return (G("Chrome") || G("CriOS")) && !G("Edge") || G("Silk");
    };
    var zb = function zb(a) {
        this.h = yb === yb ? a : "";
    };
    var Bb = function Bb(a) {
        return a ? decodeURI(a) : a;
    };
    var Cb = function Cb(a) {
        return Bb(a.match(Ab)[3] || null);
    };
    var Db = function Db(a) {
        var b = a.match(Ab);
        a = b[1];
        var c = b[2], d = b[3];
        b = b[4];
        var e = "";
        a && (e += a + ":");
        d && (e += "//", c && (e += c + "@"), e += d, b && (e += ":" + b));
        return e;
    };
    var Fb = function Fb(a) {
        var b = [], c;
        for(c in a)Eb(c, a[c], b);
        return b.join("&");
    };
    var Hb = function Hb(a, b) {
        var c = a.search(Gb);
        a: {
            var d = 0;
            for(var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;){
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f) {
                    if (f = a.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f) break a;
                }
                d += e + 1;
            }
            d = -1;
        }
        if (0 > d) return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "));
    };
    var Ib = function Ib() {
        return G("iPhone") && !G("iPod") && !G("iPad");
    };
    var Pb = function Pb() {
        var a = B.document;
        return a ? a.documentMode : void 0;
    };
    var dc = function dc(a, b) {
        La(a);
        void 0 === b && (b = 0);
        if (!cc) {
            cc = {};
            for(var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = [
                "+/=",
                "+/",
                "-_=",
                "-_.",
                "-_"
            ], e = 0; 5 > e; e++){
                var f = c.concat(d[e].split(""));
                bc[e] = f;
                for(var g = 0; g < f.length; g++){
                    var h = f[g];
                    void 0 === cc[h] && (cc[h] = g);
                }
            }
        }
        b = bc[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for(e = f = 0; f < a.length - 2; f += 3){
            var k = a[f], l = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | l >> 4];
            l = b[(l & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = "" + g + k + l + h;
        }
        g = 0;
        h = d;
        switch(a.length - f){
            case 2:
                g = a[f + 1], h = b[(g & 15) << 2] || d;
            case 1:
                a = a[f], c[e] = "" + b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d;
        }
        return c.join("");
    };
    var gc = function gc(a, b) {
        Object.isFrozen(a) || (fc ? a[fc] |= b : void 0 !== a.h ? a.h |= b : Object.defineProperties(a, {
            h: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        }));
    };
    var hc = function hc(a) {
        var b;
        fc ? b = a[fc] : b = a.h;
        return null == b ? 0 : b;
    };
    var ic = function ic(a) {
        gc(a, 1);
        return a;
    };
    var jc = function jc(a) {
        return Array.isArray(a) ? !!(hc(a) & 2) : !1;
    };
    var kc = function kc(a) {
        if (!Array.isArray(a)) throw Error("cannot mark non-array as immutable");
        gc(a, 2);
    };
    var lc = function lc(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object;
    };
    var oc = function oc(a) {
        if (jc(a.C)) throw Error("Cannot mutate an immutable Message");
    };
    var qc = function qc(a) {
        return {
            value: a,
            configurable: !1,
            writable: !1,
            enumerable: !1
        };
    };
    var rc = function rc(a, b, c) {
        return -1 === b ? null : b >= a.l ? a.i ? a.i[b] : void 0 : (void 0 === c ? 0 : c) && a.i && (c = a.i[b], null != c) ? c : a.C[b + a.j];
    };
    var H = function H(a, b, c, d, e) {
        d = void 0 === d ? !1 : d;
        (void 0 === e ? 0 : e) || oc(a);
        b < a.l && !d ? a.C[b + a.j] = c : (a.i || (a.i = a.C[a.l + a.j] = {}))[b] = c;
        return a;
    };
    var sc = function sc(a, b, c, d) {
        c = void 0 === c ? !0 : c;
        d = void 0 === d ? !1 : d;
        var e = rc(a, b, d);
        null == e && (e = nc);
        if (jc(a.C)) c && (kc(e), Object.freeze(e));
        else if (e === nc || jc(e)) e = ic(e.slice()), H(a, b, e, d);
        return e;
    };
    var tc = function tc(a, b) {
        for(var c = 0, d = 0; d < b.length; d++){
            var e = b[d];
            null != rc(a, e) && (0 !== c && H(a, c, void 0, !1, !0), c = e);
        }
        return c;
    };
    var uc = function uc(a, b, c, d, e) {
        if (-1 === c) return null;
        a.h || (a.h = {});
        var f = a.h[c];
        if (f) return f;
        e = rc(a, c, void 0 === e ? !1 : e);
        if (null == e && !d) return f;
        b = new b(e);
        jc(a.C) && kc(b.C);
        return a.h[c] = b;
    };
    var vc = function vc(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        a.h || (a.h = {});
        var e = jc(a.C), f = a.h[c];
        if (!f) {
            d = sc(a, c, !0, d);
            f = [];
            e = e || jc(d);
            for(var g = 0; g < d.length; g++)f[g] = new b(d[g]), e && kc(f[g].C);
            e && (kc(f), Object.freeze(f));
            a.h[c] = f;
        }
        return f;
    };
    var wc = function wc(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        oc(a);
        a.h || (a.h = {});
        var e = c ? c.C : c;
        a.h[b] = c;
        return H(a, b, e, d);
    };
    var xc = function xc(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        oc(a);
        e = vc(a, c, b, e);
        c = d ? d : new c();
        a = sc(a, b);
        e.push(c);
        a.push(c.C);
    };
    var yc = function yc(a) {
        switch(typeof a === "undefined" ? "undefined" : _typeof(a)){
            case "number":
                return isFinite(a) ? a : String(a);
            case "object":
                if (a && !Array.isArray(a) && ec && null != a && a instanceof Uint8Array) return dc(a);
        }
        return a;
    };
    var zc = function zc(a, b) {
        b = void 0 === b ? Ac : b;
        return Bc(a, b);
    };
    var Bc = function Bc(a, b) {
        for(var c = a.slice(), d = 0; d < c.length; d++)c[d] = Cc(c[d], b);
        Array.isArray(a) && hc(a) & 1 && ic(c);
        return c;
    };
    var Ac = function Ac(a) {
        return ec && null != a && a instanceof Uint8Array ? new Uint8Array(a) : a;
    };
    var Ec = function Ec(a, b, c) {
        a || (a = Fc);
        Fc = null;
        var d = this.constructor.i;
        a || (a = d ? [
            d
        ] : []);
        this.j = (d ? 0 : -1) - (this.constructor.h || 0);
        this.h = void 0;
        this.C = a;
        a: {
            d = this.C.length;
            a = d - 1;
            if (d && (d = this.C[a], lc(d))) {
                this.l = a - this.j;
                this.i = d;
                break a;
            }
            void 0 !== b && -1 < b ? (this.l = Math.max(b, a + 1 - this.j), this.i = void 0) : this.l = Number.MAX_VALUE;
        }
        if (c) for(b = 0; b < c.length; b++)if (a = c[b], a < this.l) a += this.j, (d = this.C[a]) ? Array.isArray(d) && ic(d) : this.C[a] = nc;
        else {
            d = this.i || (this.i = this.C[this.l + this.j] = {});
            var e = d[a];
            e ? Array.isArray(e) && ic(e) : d[a] = nc;
        }
    };
    var Hc = function Hc(a, b) {
        return yc(b);
    };
    var Ic = function Ic() {
        Ec.apply(this, arguments);
    };
    var Jc = function Jc() {
        var a = {};
        Object.defineProperties(Ic, (a[Symbol.hasInstance] = qc(function() {
            throw Error("Cannot perform instanceof checks for MutableMessage");
        }), a));
    };
    var Kc = function Kc(a, b) {
        var c = this.h;
        if (this.isRepeated) {
            var d = !0;
            d = void 0 === d ? !1 : d;
            oc(a);
            if (b) {
                var e = ic([]);
                for(var f = 0; f < b.length; f++)e[f] = b[f].C;
                a.h || (a.h = {});
                a.h[c] = b;
            } else a.h && (a.h[c] = void 0), e = nc;
            a = H(a, c, e, d);
        } else a = wc(a, c, b, !0);
        return a;
    };
    var Lc = function Lc(a) {
        B.setTimeout(function() {
            throw a;
        }, 0);
    };
    var I = function I() {
        Ic.apply(this, arguments);
    };
    var Mc = function Mc() {
        var a = {};
        Object.defineProperties(I, (a[Symbol.hasInstance] = qc(Object[Symbol.hasInstance]), a));
    };
    var Oc = function Oc(a, b) {
        this.width = a;
        this.height = b;
    };
    var Pc = function Pc() {
        var a = document;
        var b = "IFRAME";
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b);
    };
    var Qc = function Qc(a, b) {
        for(var c = 0; a;){
            if (b(a)) return a;
            a = a.parentNode;
            c++;
        }
        return null;
    };
    var Rc = function Rc(a) {
        var b = Sc;
        if (b) for(var c in b)Object.prototype.hasOwnProperty.call(b, c) && a(b[c], c, b);
    };
    var Tc = function Tc() {
        var a = [];
        Rc(function(b) {
            a.push(b);
        });
        return a;
    };
    var Vc = function Vc() {
        var a = Wc(), b = {};
        F(Uc(), function(c) {
            a.sandbox && a.sandbox.supports && a.sandbox.supports(c) && (b[c] = !0);
        });
        return b;
    };
    var Wc = function Wc() {
        var a = void 0 === a ? document : a;
        return a.createElement("iframe");
    };
    var Yc = function Yc(a) {
        if (!a) return "";
        if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
        a = a.split("#")[0].split("?")[0];
        a = a.toLowerCase();
        0 == a.indexOf("//") && (a = window.location.protocol + a);
        /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
        var b = a.substring(a.indexOf("://") + 3), c = b.indexOf("/");
        -1 != c && (b = b.substring(0, c));
        c = a.substring(0, a.indexOf("://"));
        if (!c) throw Error("URI is missing protocol: " + a);
        if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
        a = "";
        var d = b.indexOf(":");
        if (-1 != d) {
            var e = b.substring(d + 1);
            b = b.substring(0, d);
            if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e;
        }
        return c + "://" + b + a;
    };
    var Zc = function Zc() {
        function a() {
            e[0] = 1732584193;
            e[1] = 4023233417;
            e[2] = 2562383102;
            e[3] = 271733878;
            e[4] = 3285377520;
            m = l = 0;
        }
        function b(p) {
            for(var t = g, q = 0; 64 > q; q += 4)t[q / 4] = p[q] << 24 | p[q + 1] << 16 | p[q + 2] << 8 | p[q + 3];
            for(q = 16; 80 > q; q++)p = t[q - 3] ^ t[q - 8] ^ t[q - 14] ^ t[q - 16], t[q] = (p << 1 | p >>> 31) & 4294967295;
            p = e[0];
            var x = e[1], y = e[2], A = e[3], M = e[4];
            for(q = 0; 80 > q; q++){
                if (40 > q) {
                    if (20 > q) {
                        var O = A ^ x & (y ^ A);
                        var P = 1518500249;
                    } else O = x ^ y ^ A, P = 1859775393;
                } else 60 > q ? (O = x & y | A & (x | y), P = 2400959708) : (O = x ^ y ^ A, P = 3395469782);
                O = ((p << 5 | p >>> 27) & 4294967295) + O + M + P + t[q] & 4294967295;
                M = A;
                A = y;
                y = (x << 30 | x >>> 2) & 4294967295;
                x = p;
                p = O;
            }
            e[0] = e[0] + p & 4294967295;
            e[1] = e[1] + x & 4294967295;
            e[2] = e[2] + y & 4294967295;
            e[3] = e[3] + A & 4294967295;
            e[4] = e[4] + M & 4294967295;
        }
        function c(p, t) {
            if ("string" === typeof p) {
                p = unescape(encodeURIComponent(p));
                for(var q = [], x = 0, y = p.length; x < y; ++x)q.push(p.charCodeAt(x));
                p = q;
            }
            t || (t = p.length);
            q = 0;
            if (0 == l) for(; q + 64 < t;)b(p.slice(q, q + 64)), q += 64, m += 64;
            for(; q < t;)if (f[l++] = p[q++], m++, 64 == l) for(l = 0, b(f); q + 64 < t;)b(p.slice(q, q + 64)), q += 64, m += 64;
        }
        function d() {
            var p = [], t = 8 * m;
            56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
            for(var q = 63; 56 <= q; q--)f[q] = t & 255, t >>>= 8;
            b(f);
            for(q = t = 0; 5 > q; q++)for(var x = 24; 0 <= x; x -= 8)p[t++] = e[q] >> x & 255;
            return p;
        }
        for(var e = [], f = [], g = [], h = [
            128
        ], k = 1; 64 > k; ++k)h[k] = 0;
        var l, m;
        a();
        return {
            reset: a,
            update: c,
            digest: d,
            ib: function ib() {
                for(var p = d(), t = "", q = 0; q < p.length; q++)t += "0123456789ABCDEF".charAt(Math.floor(p[q] / 16)) + "0123456789ABCDEF".charAt(p[q] % 16);
                return t;
            }
        };
    };
    var $c = function $c(a, b, c) {
        var d = String(B.location.href);
        return d && a && b ? [
            b,
            ad(Yc(d), a, c || null)
        ].join(" ") : null;
    };
    var ad = function ad(a, b, c) {
        var d = [], e = [];
        if (1 == (Array.isArray(c) ? 2 : 1)) return e = [
            b,
            a
        ], F(d, function(h) {
            e.push(h);
        }), bd(e.join(" "));
        var f = [], g = [];
        F(c, function(h) {
            g.push(h.key);
            f.push(h.value);
        });
        c = Math.floor(new Date().getTime() / 1e3);
        e = 0 == f.length ? [
            c,
            b,
            a
        ] : [
            f.join(":"),
            c,
            b,
            a
        ];
        F(d, function(h) {
            e.push(h);
        });
        a = bd(e.join(" "));
        a = [
            c,
            a
        ];
        0 == g.length || a.push(g.join(""));
        return a.join("_");
    };
    var bd = function bd(a) {
        var b = Zc();
        b.update(a);
        return b.ib().toLowerCase();
    };
    var dd = function dd(a) {
        this.h = a || {
            cookie: ""
        };
    };
    var fd = function fd(a) {
        return !!cd.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a);
    };
    var gd = function gd(a, b, c, d) {
        (a = B[a]) || (a = new dd(document).get(b));
        return a ? $c(a, c, d) : null;
    };
    var hd = function hd(a) {
        var b = void 0 === b ? !1 : b;
        var c = Yc(String(B.location.href)), d = [];
        var e = b;
        e = void 0 === e ? !1 : e;
        var f = B.__SAPISID || B.__APISID || B.__3PSAPISID || B.__OVERRIDE_SID;
        fd(e) && (f = f || B.__1PSAPISID);
        if (f) e = !0;
        else {
            var g = new dd(document);
            f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID");
            fd(e) && (f = f || g.get("__Secure-1PAPISID"));
            e = !!f;
        }
        e && (e = (c = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:")) ? B.__SAPISID : B.__APISID, e || (e = new dd(document), e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID")), (e = e ? $c(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e), c && fd(b) && ((b = gd("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b), (a = gd("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a)));
        return 0 == d.length ? null : d.join(" ");
    };
    var id = function id(a) {
        pc && Object.defineProperty(a, Symbol.hasInstance, qc(Object[Symbol.hasInstance]));
    };
    var jd = function jd() {
        this.l = this.l;
        this.v = this.v;
    };
    var kd = function kd(a, b) {
        this.type = a;
        this.h = this.target = b;
        this.defaultPrevented = this.j = !1;
    };
    var ld = function ld(a) {
        var b = C("window.location.href");
        null == a && (a = 'Unknown Error of type "null/undefined"');
        if ("string" === typeof a) return {
            message: a,
            name: "Unknown error",
            lineNumber: "Not available",
            fileName: b,
            stack: "Not available"
        };
        var c = !1;
        try {
            var d = a.lineNumber || a.line || "Not available";
        } catch (g) {
            d = "Not available", c = !0;
        }
        try {
            var e = a.fileName || a.filename || a.sourceURL || B.$googDebugFname || b;
        } catch (g) {
            e = "Not available", c = !0;
        }
        b = md(a);
        if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
            c = a.message;
            if (null == c) {
                if (a.constructor && a.constructor instanceof Function) {
                    if (a.constructor.name) c = a.constructor.name;
                    else if (c = a.constructor, nd[c]) c = nd[c];
                    else {
                        c = String(c);
                        if (!nd[c]) {
                            var f = /function\s+([^\(]+)/m.exec(c);
                            nd[c] = f ? f[1] : "[Anonymous]";
                        }
                        c = nd[c];
                    }
                    c = 'Unknown Error of type "' + c + '"';
                } else c = "Unknown Error of unknown type";
                "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString());
            }
            return {
                message: c,
                name: a.name || "UnknownError",
                lineNumber: d,
                fileName: e,
                stack: b || "Not available"
            };
        }
        a.stack = b;
        return {
            message: a.message,
            name: a.name,
            lineNumber: a.lineNumber,
            fileName: a.fileName,
            stack: a.stack
        };
    };
    var od = function od(a) {
        var b = "";
        "function" === typeof a.toString && (b = "" + a);
        return b + a.stack;
    };
    var qd = function qd(a, b) {
        kd.call(this, a ? a.type : "");
        this.relatedTarget = this.h = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.i = null;
        a && this.init(a, b);
    };
    var ud = function ud(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.pa = e;
        this.key = ++td;
        this.ha = this.la = !1;
    };
    var vd = function vd(a) {
        a.ha = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.pa = null;
    };
    var wd = function wd(a) {
        this.src = a;
        this.listeners = {};
        this.h = 0;
    };
    var yd = function yd(a, b) {
        var c = b.type;
        c in a.listeners && Za(a.listeners[c], b) && (vd(b), 0 == a.listeners[c].length && (delete a.listeners[c], a.h--));
    };
    var xd = function xd(a, b, c, d) {
        for(var e = 0; e < a.length; ++e){
            var f = a[e];
            if (!f.ha && f.listener == b && f.capture == !!c && f.pa == d) return e;
        }
        return -1;
    };
    var Fd = function Fd(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = Ma(e) ? !!e.capture : !!e, h = Gd(a);
        h || (a[zd] = h = new wd(a));
        c = h.add(b, c, d, g, f);
        if (!c.proxy) {
            d = Hd();
            c.proxy = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) pd || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent) a.attachEvent(Id(b.toString()), d);
            else if (a.addListener && a.removeListener) a.addListener(d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            Bd++;
        }
    };
    var Hd = function Hd() {
        function a(c) {
            return b.call(a.src, a.listener, c);
        }
        var b = Jd;
        return a;
    };
    var Ld = function Ld(a) {
        if ("number" !== typeof a && a && !a.ha) {
            var b = a.src;
            if (b && b[sd]) yd(b.h, a);
            else {
                var c = a.type, d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Id(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Bd--;
                (c = Gd(b)) ? (yd(c, a), 0 == c.h && (c.src = null, b[zd] = null)) : vd(a);
            }
        }
    };
    var Id = function Id(a) {
        return a in Ad ? Ad[a] : Ad[a] = "on" + a;
    };
    var Jd = function Jd(a, b) {
        if (a.ha) a = !0;
        else {
            b = new qd(b, this);
            var c = a.listener, d = a.pa || a.src;
            a.la && Ld(a);
            a = c.call(d, b);
        }
        return a;
    };
    var Gd = function Gd(a) {
        a = a[zd];
        return a instanceof wd ? a : null;
    };
    var Ed = function Ed(a) {
        if ("function" === typeof a) return a;
        a[Md] || (a[Md] = function(b) {
            return a.handleEvent(b);
        });
        return a[Md];
    };
    var J = function J() {
        jd.call(this);
        this.h = new wd(this);
        this.va = this;
        this.I = null;
    };
    var Nd = function Nd(a, b) {
        var c = a.I;
        if (c) {
            var d = [];
            for(var e = 1; c; c = c.I)d.push(c), ++e;
        }
        a = a.va;
        c = b.type || b;
        "string" === typeof b ? b = new kd(b, a) : b instanceof kd ? b.target = b.target || a : (e = b, b = new kd(c, a), ib(b, e));
        e = !0;
        if (d) for(var f = d.length - 1; !b.j && 0 <= f; f--){
            var g = b.h = d[f];
            e = Od(g, c, !0, b) && e;
        }
        b.j || (g = b.h = a, e = Od(g, c, !0, b) && e, b.j || (e = Od(g, c, !1, b) && e));
        if (d) for(f = 0; !b.j && f < d.length; f++)g = b.h = d[f], e = Od(g, c, !1, b) && e;
    };
    var Od = function Od(a, b, c, d) {
        b = a.h.listeners[String(b)];
        if (!b) return !0;
        b = b.concat();
        for(var e = !0, f = 0; f < b.length; ++f){
            var g = b[f];
            if (g && !g.ha && g.capture == c) {
                var h = g.listener, k = g.pa || g.src;
                g.la && yd(a.h, g);
                e = !1 !== h.call(k, d) && e;
            }
        }
        return e && !d.defaultPrevented;
    };
    var Pd = function Pd(a) {
        var b, c;
        J.call(this);
        var d = this;
        this.A = this.j = 0;
        this.K = null !== a && void 0 !== a ? a : {
            L: function L(e, f) {
                return setTimeout(e, f);
            },
            W: clearTimeout
        };
        this.i = null !== (c = null === (b = window.navigator) || void 0 === b ? void 0 : b.onLine) && void 0 !== c ? c : !0;
        this.m = function() {
            return z(function(e) {
                return w(e, Qd(d), 0);
            });
        };
        window.addEventListener("offline", this.m);
        window.addEventListener("online", this.m);
        this.A || Rd(this);
    };
    var Qd = function Qd(a, b) {
        return a.u ? a.u : a.u = new Promise(function(c) {
            var d, e, f;
            return z(function(g) {
                switch(g.h){
                    case 1:
                        return d = window.AbortController ? new window.AbortController() : void 0, e = null === d || void 0 === d ? void 0 : d.signal, f = !1, sa(g, 2, 3), d && (a.j = a.K.L(function() {
                            d.abort();
                        }, b || 2e4)), w(g, fetch("/generate_204", {
                            method: "HEAD",
                            signal: e
                        }), 5);
                    case 5:
                        f = !0;
                    case 3:
                        xa(g);
                        a.u = void 0;
                        a.j && (a.K.W(a.j), a.j = 0);
                        f !== a.i && (a.i = f, a.i ? Nd(a, "networkstatus-online") : Nd(a, "networkstatus-offline"));
                        c(f);
                        ya(g);
                        break;
                    case 2:
                        ua(g), f = !1, g.o(3);
                }
            });
        });
    };
    var Sd = function Sd() {
        this.data_ = [];
        this.h = -1;
    };
    var Td = function Td(a) {
        -1 == a.h && (a.h = Ya(a.data_, function(b, c, d) {
            return c ? b + Math.pow(2, d) : b;
        }, 0));
        return a.h;
    };
    var Ud = function Ud(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null;
    };
    var Vd = function Vd(a, b) {
        a.l(b);
        100 > a.i && (a.i++, b.next = a.h, a.h = b);
    };
    var Xd = function Xd() {
        var a = B.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !G("Presto") && (a = function a() {
            var e = Pc();
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random(), h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = Sa(function(k) {
                if (("*" == h || k.origin == h) && k.data == g) this.port1.onmessage();
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function postMessage() {
                    f.postMessage(g, h);
                }
            };
        });
        if ("undefined" !== typeof a && !G("Trident") && !G("MSIE")) {
            var b = new a(), c = {}, d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.Ja;
                    c.Ja = null;
                    e();
                }
            };
            return function(e) {
                d.next = {
                    Ja: e
                };
                d = d.next;
                b.port2.postMessage(0);
            };
        }
        return function(e) {
            B.setTimeout(e, 0);
        };
    };
    var Yd = function Yd() {
        this.i = this.h = null;
    };
    var $d = function $d() {
        this.next = this.scope = this.h = null;
    };
    var ae = function ae(a, b) {
        ce || de();
        ee || (ce(), ee = !0);
        fe.add(a, b);
    };
    var de = function de() {
        if (B.Promise && B.Promise.resolve) {
            var a = B.Promise.resolve(void 0);
            ce = function ce() {
                a.then(ge);
            };
        } else ce = function ce() {
            var b = ge;
            "function" !== typeof B.setImmediate || B.Window && B.Window.prototype && !G("Edge") && B.Window.prototype.setImmediate == B.setImmediate ? (Wd || (Wd = Xd()), Wd(b)) : B.setImmediate(b);
        };
    };
    var ge = function ge() {
        for(var a; a = fe.remove();){
            try {
                a.h.call(a.scope);
            } catch (b) {
                Lc(b);
            }
            Vd(Zd, a);
        }
        ee = !1;
    };
    var he = function he(a, b) {
        this.h = a[B.Symbol.iterator]();
        this.i = b;
    };
    var ie = function ie(a, b) {
        return new he(a, b);
    };
    var je = function je() {
        this.blockSize = -1;
    };
    var ke = function ke() {
        this.blockSize = -1;
        this.blockSize = 64;
        this.h = [];
        this.m = [];
        this.v = [];
        this.j = [];
        this.j[0] = 128;
        for(var a = 1; a < this.blockSize; ++a)this.j[a] = 0;
        this.l = this.i = 0;
        this.reset();
    };
    var le = function le(a, b, c) {
        c || (c = 0);
        var d = a.v;
        if ("string" === typeof b) for(var e = 0; 16 > e; e++)d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else for(e = 0; 16 > e; e++)d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for(e = 16; 80 > e; e++){
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295;
        }
        b = a.h[0];
        c = a.h[1];
        var g = a.h[2], h = a.h[3], k = a.h[4];
        for(e = 0; 80 > e; e++){
            if (40 > e) {
                if (20 > e) {
                    f = h ^ c & (g ^ h);
                    var l = 1518500249;
                } else f = c ^ g ^ h, l = 1859775393;
            } else 60 > e ? (f = c & g | h & (c | g), l = 2400959708) : (f = c ^ g ^ h, l = 3395469782);
            f = (b << 5 | b >>> 27) + f + k + l + d[e] & 4294967295;
            k = h;
            h = g;
            g = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f;
        }
        a.h[0] = a.h[0] + b & 4294967295;
        a.h[1] = a.h[1] + c & 4294967295;
        a.h[2] = a.h[2] + g & 4294967295;
        a.h[3] = a.h[3] + h & 4294967295;
        a.h[4] = a.h[4] + k & 4294967295;
    };
    var ne = function ne() {};
    var pe = function pe(a) {
        return {
            value: a,
            done: !1
        };
    };
    var qe = function qe(a) {
        if (a.done) throw me;
        return a.value;
    };
    var re = function re(a) {
        if (a instanceof se || a instanceof te || a instanceof ue) return a;
        if ("function" == typeof a.R) return new se(function() {
            return ve(a);
        });
        if ("function" == typeof a[Symbol.iterator]) return new se(function() {
            return a[Symbol.iterator]();
        });
        if ("function" == typeof a.J) return new se(function() {
            return ve(a.J());
        });
        throw Error("Not an iterator or iterable.");
    };
    var ve = function ve(a) {
        if (!(a instanceof ne)) return a;
        var b = !1;
        return {
            next: function next() {
                for(var c; !b;)try {
                    c = a.R();
                    break;
                } catch (d) {
                    if (d !== me) throw d;
                    b = !0;
                }
                return {
                    value: c,
                    done: b
                };
            }
        };
    };
    var se = function se(a) {
        this.h = a;
    };
    var te = function te(a) {
        this.h = a;
    };
    var ue = function ue(a) {
        se.call(this, function() {
            return a;
        });
        this.j = a;
    };
    var xe = function xe(a) {
        ye(a);
        return a.h.concat();
    };
    var Ae = function Ae(a, b) {
        return a === b;
    };
    var ye = function ye(a) {
        if (a.size != a.h.length) {
            for(var b = 0, c = 0; b < a.h.length;){
                var d = a.h[b];
                ze(a.i, d) && (a.h[c++] = d);
                b++;
            }
            a.h.length = c;
        }
        if (a.size != a.h.length) {
            var e = {};
            for(c = b = 0; b < a.h.length;)d = a.h[b], ze(e, d) || (a.h[c++] = d, e[d] = 1), b++;
            a.h.length = c;
        }
    };
    var ze = function ze(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var Ce = function Ce() {
        var a = this;
        this.promise = new Promise(function(b, c) {
            a.resolve = b;
            a.reject = c;
        });
    };
    var De = function De(a) {
        this.h = 0;
        this.u = void 0;
        this.l = this.i = this.j = null;
        this.m = this.v = !1;
        if (a != Ka) try {
            var b = this;
            a.call(void 0, function(c) {
                Ee(b, 2, c);
            }, function(c) {
                Ee(b, 3, c);
            });
        } catch (c) {
            Ee(this, 3, c);
        }
    };
    var Fe = function Fe() {
        this.next = this.context = this.onRejected = this.i = this.h = null;
        this.j = !1;
    };
    var He = function He(a, b, c) {
        var d = Ge.get();
        d.i = a;
        d.onRejected = b;
        d.context = c;
        return d;
    };
    var Ne = function Ne(a, b) {
        a.i || 2 != a.h && 3 != a.h || Oe(a);
        a.l ? a.l.next = b : a.i = b;
        a.l = b;
    };
    var Ie = function Ie(a, b, c, d) {
        var e = He(null, null, null);
        e.h = new De(function(f, g) {
            e.i = b ? function(h) {
                try {
                    var k = b.call(d, h);
                    f(k);
                } catch (l) {
                    g(l);
                }
            } : f;
            e.onRejected = c ? function(h) {
                try {
                    var k = c.call(d, h);
                    void 0 === k && h instanceof Je ? g(h) : f(k);
                } catch (l) {
                    g(l);
                }
            } : g;
        });
        e.h.j = a;
        Ne(a, e);
        return e.h;
    };
    var Ee = function Ee(a, b, c) {
        if (0 == a.h) {
            a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.h = 1;
            a: {
                var d = c, e = a.I, f = a.O;
                if (d instanceof De) {
                    Ne(d, He(e || Ka, f || null, a));
                    var g = !0;
                } else {
                    if (d) try {
                        var h = !!d.$goog_Thenable;
                    } catch (l) {
                        h = !1;
                    }
                    else h = !1;
                    if (h) d.then(e, f, a), g = !0;
                    else {
                        if (Ma(d)) try {
                            var k = d.then;
                            if ("function" === typeof k) {
                                Pe(d, k, e, f, a);
                                g = !0;
                                break a;
                            }
                        } catch (l) {
                            f.call(a, l);
                            g = !0;
                            break a;
                        }
                        g = !1;
                    }
                }
            }
            g || (a.u = c, a.h = b, a.j = null, Oe(a), 3 != b || c instanceof Je || Qe(a, c));
        }
    };
    var Pe = function Pe(a, b, c, d, e) {
        function f(k) {
            h || (h = !0, d.call(e, k));
        }
        function g(k) {
            h || (h = !0, c.call(e, k));
        }
        var h = !1;
        try {
            b.call(a, g, f);
        } catch (k) {
            f(k);
        }
    };
    var Oe = function Oe(a) {
        a.v || (a.v = !0, ae(a.A, a));
    };
    var Le = function Le(a) {
        var b = null;
        a.i && (b = a.i, a.i = b.next, b.next = null);
        a.i || (a.l = null);
        return b;
    };
    var Me = function Me(a, b, c, d) {
        if (3 == c && b.onRejected && !b.j) for(; a && a.m; a = a.j)a.m = !1;
        if (b.h) b.h.j = null, Re(b, c, d);
        else try {
            b.j ? b.i.call(b.context) : Re(b, c, d);
        } catch (e) {
            Se.call(null, e);
        }
        Vd(Ge, b);
    };
    var Re = function Re(a, b, c) {
        2 == b ? a.i.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c);
    };
    var Qe = function Qe(a, b) {
        a.m = !0;
        ae(function() {
            a.m && Se.call(null, b);
        });
    };
    var Je = function Je(a) {
        Ua.call(this, a);
    };
    var K = function K(a) {
        jd.call(this);
        this.u = 1;
        this.j = [];
        this.m = 0;
        this.h = [];
        this.i = {};
        this.A = !!a;
    };
    var Te = function Te(a, b, c) {
        var d = Ue;
        if (a = d.i[a]) {
            var e = d.h;
            (a = a.find(function(f) {
                return e[f + 1] == b && e[f + 2] == c;
            })) && d.ja(a);
        }
    };
    var Ve = function Ve(a, b, c) {
        ae(function() {
            a.apply(b, c);
        });
    };
    var We = function We(a) {
        this.h = a;
    };
    var Xe = function Xe(a) {
        this.h = a;
    };
    var Ye = function Ye(a) {
        this.data = a;
    };
    var Ze = function Ze(a) {
        return void 0 === a || a instanceof Ye ? a : new Ye(a);
    };
    var $e = function $e(a) {
        this.h = a;
    };
    var af = function af() {};
    var bf = function bf() {};
    var cf = function cf(a) {
        this.h = a;
    };
    var df = function df() {
        var a = null;
        try {
            a = window.localStorage || null;
        } catch (b) {}
        this.h = a;
    };
    var ef = function ef(a, b) {
        this.i = a;
        this.h = null;
        var c;
        if (c = Lb) c = !(9 <= Number(Yb));
        if (c) {
            ff || (ff = new we());
            this.h = ff.get(a);
            this.h || (b ? this.h = document.getElementById(b) : (this.h = document.createElement("userdata"), this.h.addBehavior("#default#userData"), document.body.appendChild(this.h)), ff.set(a, this.h));
            try {
                this.h.load(this.i);
            } catch (d) {
                this.h = null;
            }
        }
    };
    var hf = function hf(a) {
        return "_" + encodeURIComponent(a).replace(/[.!~*'()%]/g, function(b) {
            return gf[b];
        });
    };
    var jf = function jf(a) {
        try {
            a.h.save(a.i);
        } catch (b) {
            throw "Storage mechanism: Quota exceeded";
        }
    };
    var kf = function kf(a, b) {
        this.i = a;
        this.h = b + "::";
    };
    var lf = function lf(a) {
        I.call(this, a);
    };
    var nf = function nf(a) {
        I.call(this, a);
    };
    var of = function of(a) {
        I.call(this, a);
    };
    var pf = function pf(a) {
        I.call(this, a);
    };
    var qf = function qf(a) {
        I.call(this, a, -1, rf);
    };
    var sf = function sf(a) {
        I.call(this, a, -1, tf);
    };
    var uf = function uf(a) {
        I.call(this, a);
    };
    var vf = function vf(a) {
        I.call(this, a, -1, wf);
    };
    var xf = function xf(a) {
        I.call(this, a, -1, yf);
    };
    var zf = function zf(a) {
        I.call(this, a, 428);
    };
    var Af = function Af(a) {
        I.call(this, a);
    };
    var Cf = function Cf(a) {
        I.call(this, a, -1, Df);
    };
    var Ef = function Ef(a) {
        I.call(this, a, 1);
    };
    var Ff = function Ff(a) {
        I.call(this, a);
    };
    var Hf = function Hf() {
        Ff.apply(this, arguments);
    };
    var Of = function Of() {
        Ef.apply(this, arguments);
    };
    var Sf = function Sf() {
        var a = arguments;
        1 < a.length ? Mf[a[0]] = a[1] : 1 === a.length && Object.assign(Mf, a[0]);
    };
    var L = function L(a, b) {
        return a in Mf ? Mf[a] : b;
    };
    var Tf = function Tf() {
        return L("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS", void 0);
    };
    var Vf = function Vf(a) {
        Uf.forEach(function(b) {
            return b(a);
        });
    };
    var Wf = function Wf(a) {
        return a && window.yterr ? function() {
            try {
                return a.apply(this, arguments);
            } catch (b) {
                Xf(b);
            }
        } : a;
    };
    var Xf = function Xf(a, b, c, d) {
        var e = C("yt.logging.errors.log");
        e ? e(a, "ERROR", b, c, d) : (e = L("ERRORS", []), e.push([
            a,
            "ERROR",
            b,
            c,
            d
        ]), Sf("ERRORS", e));
        Vf(a);
    };
    var Yf = function Yf(a, b, c, d) {
        var e = C("yt.logging.errors.log");
        e ? e(a, "WARNING", b, c, d) : (e = L("ERRORS", []), e.push([
            a,
            "WARNING",
            b,
            c,
            d
        ]), Sf("ERRORS", e));
    };
    var ag = function ag(a) {
        this.type = "";
        this.state = this.source = this.data = this.currentTarget = this.relatedTarget = this.target = null;
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.ctrlKey = this.altKey = !1;
        this.rotation = this.clientY = this.clientX = 0;
        this.scale = 1;
        this.changedTouches = this.touches = null;
        try {
            if (a = a || window.event) {
                this.event = a;
                for(var b in a)b in $f || (this[b] = a[b]);
                this.scale = a.scale;
                this.rotation = a.rotation;
                var c = a.target || a.srcElement;
                c && 3 == c.nodeType && (c = c.parentNode);
                this.target = c;
                var d = a.relatedTarget;
                if (d) try {
                    d = d.nodeName ? d : null;
                } catch (e) {
                    d = null;
                }
                else "mouseover" == this.type ? d = a.fromElement : "mouseout" == this.type && (d = a.toElement);
                this.relatedTarget = d;
                this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
                this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
                this.keyCode = a.keyCode ? a.keyCode : a.which;
                this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
                this.altKey = a.altKey;
                this.ctrlKey = a.ctrlKey;
                this.shiftKey = a.shiftKey;
                this.metaKey = a.metaKey;
            }
        } catch (e) {}
    };
    var cg = function cg(a, b, c, d) {
        d = void 0 === d ? {} : d;
        a.addEventListener && ("mouseenter" != b || "onmouseenter" in document ? "mouseleave" != b || "onmouseenter" in document ? "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll") : b = "mouseout" : b = "mouseover");
        return db(function(e) {
            var f = "boolean" === typeof e[4] && e[4] == !!d, g = Ma(e[4]) && Ma(d) && fb(e[4], d);
            return !!e.length && e[0] == a && e[1] == b && e[2] == c && (f || g);
        });
    };
    var dg = function dg(a) {
        a && ("string" == typeof a && (a = [
            a
        ]), F(a, function(b) {
            if (b in eb) {
                var c = eb[b], d = c[0], e = c[1], f = c[3];
                c = c[4];
                d.removeEventListener ? eg() || "boolean" === typeof c ? d.removeEventListener(e, f, c) : d.removeEventListener(e, f, !!c.capture) : d.detachEvent && d.detachEvent("on" + e, f);
                delete eb[b];
            }
        }));
    };
    var fg = function fg(a, b, c) {
        var d = void 0 === d ? {} : d;
        if (a && (a.addEventListener || a.attachEvent)) {
            var e = cg(a, b, c, d);
            if (!e) {
                e = ++bg.count + "";
                var f = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document);
                var g = f ? function g(h) {
                    h = new ag(h);
                    if (!Qc(h.relatedTarget, function(k) {
                        return k == a;
                    })) return h.currentTarget = a, h.type = b, c.call(a, h);
                } : function(h) {
                    h = new ag(h);
                    h.currentTarget = a;
                    return c.call(a, h);
                };
                g = Wf(g);
                a.addEventListener ? ("mouseenter" == b && f ? b = "mouseover" : "mouseleave" == b && f ? b = "mouseout" : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll"), eg() || "boolean" === typeof d ? a.addEventListener(b, g, d) : a.addEventListener(b, g, !!d.capture)) : a.attachEvent("on" + b, g);
                eb[e] = [
                    a,
                    b,
                    c,
                    g,
                    d
                ];
            }
        }
    };
    var gg = function gg(a, b) {
        "function" === typeof a && (a = Wf(a));
        return window.setTimeout(a, b);
    };
    var hg = function hg(a) {
        "function" === typeof a && (a = Wf(a));
        return window.setInterval(a, 250);
    };
    var ng = function ng(a) {
        var b = [];
        cb(a, function(c, d) {
            var e = encodeURIComponent(String(d)), f;
            Array.isArray(c) ? f = c : f = [
                c
            ];
            F(f, function(g) {
                "" == g ? b.push(e) : b.push(e + "=" + encodeURIComponent(String(g)));
            });
        });
        return b.join("&");
    };
    var og = function og(a) {
        "?" == a.charAt(0) && (a = a.substr(1));
        return kg(a, "&");
    };
    var pg = function pg(a, b, c) {
        var d = a.split("#", 2);
        a = d[0];
        d = 1 < d.length ? "#" + d[1] : "";
        var e = a.split("?", 2);
        a = e[0];
        e = og(e[1] || "");
        for(var f in b)!c && null !== e && f in e || (e[f] = b[f]);
        b = a;
        a = Fb(e);
        a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [
            b.substr(0, f),
            e,
            b.substr(c)
        ], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
        return a + d;
    };
    var qg = function qg(a) {
        if (!b) var b = window.location.href;
        var c = a.match(Ab)[1] || null, d = Cb(a);
        c && d ? (a = a.match(Ab), b = b.match(Ab), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Cb(b) == d && (Number(b.match(Ab)[4] || null) || null) == (Number(a.match(Ab)[4] || null) || null) : !0;
        return a;
    };
    var lg = function lg(a) {
        return a && a.match(ig) ? a : decodeURIComponent(a.replace(/\+/g, " "));
    };
    var N = function N(a) {
        a = rg(a);
        return "string" === typeof a && "false" === a ? !1 : !!a;
    };
    var sg = function sg(a, b) {
        a = rg(a);
        return void 0 === a && void 0 !== b ? b : Number(a || 0);
    };
    var rg = function rg(a) {
        var b = L("EXPERIMENTS_FORCED_FLAGS", {});
        return void 0 !== b[a] ? b[a] : L("EXPERIMENT_FLAGS", {})[a];
    };
    var tg = function tg() {
        var a = [], b = L("EXPERIMENTS_FORCED_FLAGS", {});
        for(c in b)a.push({
            key: c,
            value: String(b[c])
        });
        var c = L("EXPERIMENT_FLAGS", {});
        for(var d in c)d.startsWith("force_") && void 0 === b[d] && a.push({
            key: d,
            value: String(c[d])
        });
        return a;
    };
    var xg = function xg() {};
    var yg = function yg(a, b) {
        return zg(a, 0, b);
    };
    var Ag = function Ag(a, b) {
        zg(a, 2, b);
    };
    var Bg = function Bg() {
        xg.apply(this, arguments);
    };
    var Cg = function Cg() {
        Bg.h || (Bg.h = new Bg());
        return Bg.h;
    };
    var zg = function zg(a, b, c) {
        void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
        var d = C("yt.scheduler.instance.addJob");
        return d ? d(a, b, c) : void 0 === c ? (a(), NaN) : gg(a, c || 0);
    };
    var Eg = function Eg(a) {
        var b = Fg;
        a = void 0 === a ? C("yt.ads.biscotti.lastId_") || "" : a;
        var c = Object, d = c.assign, e = {};
        e.dt = Xc;
        e.flash = "0";
        a: {
            try {
                var f = b.h.top.location.href;
            } catch (va) {
                f = 2;
                break a;
            }
            f = f ? f === b.i.location.href ? 0 : 1 : 2;
        }
        e = (e.frm = f, e);
        try {
            e.u_tz = -new Date().getTimezoneOffset();
            var g = void 0 === g ? Nc : g;
            try {
                var h = g.history.length;
            } catch (va) {
                h = 0;
            }
            e.u_his = h;
            var k;
            e.u_h = null == (k = Nc.screen) ? void 0 : k.height;
            var l;
            e.u_w = null == (l = Nc.screen) ? void 0 : l.width;
            var m;
            e.u_ah = null == (m = Nc.screen) ? void 0 : m.availHeight;
            var p;
            e.u_aw = null == (p = Nc.screen) ? void 0 : p.availWidth;
            var t;
            e.u_cd = null == (t = Nc.screen) ? void 0 : t.colorDepth;
        } catch (va) {}
        h = b.h;
        try {
            var q = h.screenX;
            var x = h.screenY;
        } catch (va) {}
        try {
            var y = h.outerWidth;
            var A = h.outerHeight;
        } catch (va) {}
        try {
            var M = h.innerWidth;
            var O = h.innerHeight;
        } catch (va) {}
        try {
            var P = h.screenLeft;
            var Qb = h.screenTop;
        } catch (va) {}
        try {
            M = h.innerWidth, O = h.innerHeight;
        } catch (va) {}
        try {
            var be = h.screen.availWidth;
            var Tj = h.screen.availTop;
        } catch (va) {}
        q = [
            P,
            Qb,
            q,
            x,
            be,
            Tj,
            y,
            A,
            M,
            O
        ];
        x = b.h.top;
        try {
            var mb = (x || window).document, wa = "CSS1Compat" == mb.compatMode ? mb.documentElement : mb.body;
            var ka = new Oc(wa.clientWidth, wa.clientHeight).round();
        } catch (va) {
            ka = new Oc(-12245933, -12245933);
        }
        mb = ka;
        ka = {};
        var la = void 0 === la ? B : la;
        wa = new Sd();
        la.SVGElement && la.document.createElementNS && wa.set(0);
        x = Vc();
        x["allow-top-navigation-by-user-activation"] && wa.set(1);
        x["allow-popups-to-escape-sandbox"] && wa.set(2);
        la.crypto && la.crypto.subtle && wa.set(3);
        la.TextDecoder && la.TextEncoder && wa.set(4);
        la = Td(wa);
        ka.bc = la;
        ka.bih = mb.height;
        ka.biw = mb.width;
        ka.brdim = q.join();
        b = b.i;
        b = (ka.vis = b.prerendering ? 3 : ({
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        })[b.visibilityState || b.webkitVisibilityState || b.mozVisibilityState || ""] || 0, ka.wgl = !!Nc.WebGLRenderingContext, ka);
        c = d.call(c, e, b);
        c.ca_type = "image";
        a && (c.bid = a);
        return c;
    };
    var Hg = function Hg() {
        if (!Gg) return null;
        var a = Gg();
        return "open" in a ? a : null;
    };
    var Lg = function Lg(a, b) {
        b = void 0 === b ? {} : b;
        var c = qg(a), d = N("web_ajax_ignore_global_headers_if_set"), e;
        for(e in Ig){
            var f = L(Ig[e]);
            !f || !c && Cb(a) || d && void 0 !== b[e] || (b[e] = f);
        }
        if (c || !Cb(a)) b["X-YouTube-Utc-Offset"] = String(-new Date().getTimezoneOffset());
        if (c || !Cb(a)) {
            try {
                var g = new Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch (h) {}
            g && (b["X-YouTube-Time-Zone"] = g);
        }
        if (c || !Cb(a)) b["X-YouTube-Ad-Signals"] = ng(Eg(void 0));
        return b;
    };
    var Mg = function Mg(a) {
        var b = window.location.search, c = Cb(a);
        N("debug_handle_relative_url_for_query_forward_killswitch") || c || !qg(a) || (c = document.location.hostname);
        var d = Bb(a.match(Ab)[5] || null);
        d = (c = c && (c.endsWith("youtube.com") || c.endsWith("youtube-nocookie.com"))) && d && d.startsWith("/api/");
        if (!c || d) return a;
        var e = og(b), f = {};
        F(Jg, function(g) {
            e[g] && (f[g] = e[g]);
        });
        return pg(a, f || {}, !1);
    };
    var Ng = function Ng(a, b) {
        var c = b.format || "JSON";
        a = Og(a, b);
        var d = Pg(a, b), e = !1, f = Qg(a, function(k) {
            if (!e) {
                e = !0;
                h && window.clearTimeout(h);
                a: switch(k && "status" in k ? k.status : -1){
                    case 200:
                    case 201:
                    case 202:
                    case 203:
                    case 204:
                    case 205:
                    case 206:
                    case 304:
                        var l = !0;
                        break a;
                    default:
                        l = !1;
                }
                var m = null, p = 400 <= k.status && 500 > k.status, t = 500 <= k.status && 600 > k.status;
                if (l || p || t) m = Rg(a, c, k, b.convertToSafeHtml);
                if (l) a: if (k && 204 == k.status) l = !0;
                else {
                    switch(c){
                        case "XML":
                            l = 0 == parseInt(m && m.return_code, 10);
                            break a;
                        case "RAW":
                            l = !0;
                            break a;
                    }
                    l = !!m;
                }
                m = m || {};
                p = b.context || B;
                l ? b.onSuccess && b.onSuccess.call(p, k, m) : b.onError && b.onError.call(p, k, m);
                b.onFinish && b.onFinish.call(p, k, m);
            }
        }, b.method, d, b.headers, b.responseType, b.withCredentials);
        if (b.onTimeout && 0 < b.timeout) {
            var g = b.onTimeout;
            var h = gg(function() {
                e || (e = !0, f.abort(), window.clearTimeout(h), g.call(b.context || B, f));
            }, b.timeout);
        }
    };
    var Og = function Og(a, b) {
        b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
        var c = L("XSRF_FIELD_NAME", void 0);
        if (b = b.urlParams) b[c] && delete b[c], a = pg(a, b || {}, !0);
        return a;
    };
    var Pg = function Pg(a, b) {
        var c = L("XSRF_FIELD_NAME", void 0), d = L("XSRF_TOKEN", void 0), e = b.postBody || "", f = b.postParams, g = L("XSRF_FIELD_NAME", void 0), h;
        b.headers && (h = b.headers["Content-Type"]);
        b.excludeXsrf || Cb(a) && !b.withCredentials && Cb(a) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
        f && "string" === typeof e && (e = og(e), ib(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ? JSON.stringify(e) : Fb(e));
        if (!(a = e) && (a = f)) {
            a: {
                for(var k in f){
                    f = !1;
                    break a;
                }
                f = !0;
            }
            a = !f;
        }
        !Kg && a && "POST" != b.method && (Kg = !0, Xf(Error("AJAX request with postData should use POST")));
        return e;
    };
    var Rg = function Rg(a, b, c, d) {
        var e = null;
        switch(b){
            case "JSON":
                try {
                    var f = c.responseText;
                } catch (g) {
                    throw d = Error("Error reading responseText"), d.params = a, Yf(d), g;
                }
                a = c.getResponseHeader("Content-Type") || "";
                f && 0 <= a.indexOf("json") && (")]}'\n" === f.substring(0, 5) && (f = f.substring(5)), e = JSON.parse(f));
                break;
            case "XML":
                if (a = (a = c.responseXML) ? Sg(a) : null) e = {}, F(a.getElementsByTagName("*"), function(g) {
                    e[g.tagName] = Tg(g);
                });
        }
        d && Ug(e);
        return e;
    };
    var Sg = function Sg(a) {
        return a ? (a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && 0 < a.length ? a[0] : null : null;
    };
    var Tg = function Tg(a) {
        var b = "";
        F(a.childNodes, function(c) {
            b += c.nodeValue;
        });
        return b;
    };
    var Qg = function Qg(a, b, c, d, e, f, g) {
        function h() {
            4 == (k && "readyState" in k ? k.readyState : 0) && b && Wf(b)(k);
        }
        c = void 0 === c ? "GET" : c;
        d = void 0 === d ? "" : d;
        var k = Hg();
        if (!k) return null;
        "onloadend" in k ? k.addEventListener("loadend", h, !1) : k.onreadystatechange = h;
        N("debug_forward_web_query_parameters") && (a = Mg(a));
        k.open(c, a, !0);
        f && (k.responseType = f);
        g && (k.withCredentials = !0);
        c = "POST" == c && (void 0 === window.FormData || !(d instanceof FormData));
        if (e = Lg(a, e)) for(var l in e)k.setRequestHeader(l, e[l]), "content-type" == l.toLowerCase() && (c = !1);
        c && k.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        k.send(d);
        return k;
    };
    var Zg = function Zg(a) {
        var b = Fa.apply(1, arguments);
        var c = Error.call(this, a);
        this.message = c.message;
        "stack" in c && (this.stack = c.stack);
        this.args = [].concat(fa(b));
    };
    var dh = function dh() {
        this.j = this.h = this.i = 0;
    };
    var lh = function lh(a, b) {
        if ("log_event" === a.endpoint) {
            var c = mh(a), d = hh.get(c) || [];
            hh.set(c, d);
            d.push(a.payload);
            var e = void 0 === e ? !1 : e;
            b && (ch = new b());
            a = sg("tvhtml5_logging_max_batch") || sg("web_logging_max_batch") || 100;
            b = Q();
            var f = e ? fh.j : eh.j;
            d.length >= a ? nh({
                writeThenSend: !0
            }, N("flush_only_full_queue") ? c : void 0, e) : 10 <= b - f && (oh(e), e ? fh.j = b : eh.j = b);
        }
    };
    var ph = function ph(a, b) {
        if ("log_event" === a.endpoint) {
            var c = mh(a), d = new Map();
            d.set(c, [
                a.payload
            ]);
            b && (ch = new b());
            return new De(function(e) {
                ch && ch.isReady() ? qh(d, e, {
                    bypassNetworkless: !0
                }, !0) : e();
            });
        }
    };
    var mh = function mh(a) {
        var b = "";
        if (a.xa) b = "visitorOnlyApprovedKey";
        else if (a.da) {
            b = a.da;
            var c = {};
            b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId);
            jh[a.da.token] = c;
            b = a.da.token;
        }
        return b;
    };
    var nh = function nh(a, b, c) {
        a = void 0 === a ? {} : a;
        c = void 0 === c ? !1 : c;
        new De(function(d) {
            c ? (window.clearTimeout(fh.i), window.clearTimeout(fh.h), fh.h = 0) : (window.clearTimeout(eh.i), window.clearTimeout(eh.h), eh.h = 0);
            if (ch && ch.isReady()) {
                if (void 0 !== b) {
                    if (c) {
                        var e = new Map(), f = ih.get(b) || [];
                        e.set(b, f);
                        rh(e, d, a);
                        ih.delete(b);
                    } else e = new Map(), f = hh.get(b) || [], e.set(b, f), qh(e, d, a), hh.delete(b);
                } else c ? (rh(ih, d, a), ih.clear()) : (qh(hh, d, a), hh.clear());
            } else oh(c), d();
        });
    };
    var oh = function oh(a) {
        a = void 0 === a ? !1 : a;
        if (N("web_gel_timeout_cap") && (!a && !eh.h || a && !fh.h)) {
            var b = gg(function() {
                nh({
                    writeThenSend: !0
                }, void 0, a);
            }, 6e4);
            a ? fh.h = b : eh.h = b;
        }
        window.clearTimeout(a ? fh.i : eh.i);
        b = L("LOGGING_BATCH_TIMEOUT", sg("web_gel_debounce_ms", 1e4));
        N("shorten_initial_gel_batch_timeout") && gh && (b = ah);
        b = gg(function() {
            nh({
                writeThenSend: !0
            }, void 0, a);
        }, b);
        a ? fh.i = b : eh.i = b;
    };
    var qh = function qh(a, b, c, d) {
        var e = ch;
        c = void 0 === c ? {} : c;
        var f = Math.round(Q()), g = a.size;
        a = u(a);
        for(var h = a.next(); !h.done; h = a.next()){
            var k = u(h.value);
            h = k.next().value;
            var l = k = k.next().value;
            k = gb({
                context: sh(e.config_ || th())
            });
            k.events = l;
            (l = jh[h]) && uh(k, h, l);
            delete jh[h];
            h = "visitorOnlyApprovedKey" === h;
            vh(k, f, h);
            wh(c);
            xh(e, "log_event", k, yh(c, h, function() {
                g--;
                g || b();
            }, function() {
                g--;
                g || b();
            }, d));
            gh = !1;
        }
    };
    var rh = function rh(a, b, c) {
        var d = ch;
        c = void 0 === c ? {} : c;
        var e = Math.round(Q()), f = a.size;
        a = u(a);
        for(var g = a.next(); !g.done; g = a.next()){
            var h = u(g.value);
            g = h.next().value;
            var k = h = h.next().value;
            h = new Cf();
            var l = zh(d.config_ || th());
            wc(h, 1, l);
            k = Ah(k);
            for(l = 0; l < k.length; l++)xc(h, 3, zf, k[l]);
            (k = kh[g]) && Bh(h, g, k);
            delete kh[g];
            g = "visitorOnlyApprovedKey" === g;
            Ch(h, e, g);
            wh(c);
            a: {
                mc = !0;
                try {
                    var m = JSON.stringify(h.toJSON(), Hc);
                    break a;
                } finally{
                    mc = !1;
                }
                m = void 0;
            }
            h = m;
            g = yh(c, g, function() {
                f--;
                f || b();
            }, function() {
                f--;
                f || b();
            }, void 0);
            g.headers = {
                "Content-Type": "application/json+protobuf"
            };
            g.postBodyFormat = "JSPB";
            g.postBody = h;
            xh(d, "log_event", "", g);
            gh = !1;
        }
    };
    var wh = function wh(a) {
        N("always_send_and_write") && (a.writeThenSend = !1);
    };
    var yh = function yh(a, b, c, d, e) {
        return {
            retry: !0,
            onSuccess: c,
            onError: d,
            Sa: a,
            xa: b,
            Mb: !!e,
            headers: {},
            postBodyFormat: "",
            postBody: ""
        };
    };
    var vh = function vh(a, b, c) {
        a.requestTimeMs = String(b);
        N("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
        !c && (b = L("EVENT_ID", void 0)) && (c = Dh(), a.serializedClientEventId = {
            serializedEventId: b,
            clientCounter: String(c)
        });
    };
    var Ch = function Ch(a, b, c) {
        H(a, 2, b);
        if (!c && (b = L("EVENT_ID", void 0))) {
            c = Dh();
            var d = new Af();
            H(d, 1, b);
            H(d, 2, c);
            wc(a, 5, d);
        }
    };
    var Dh = function Dh() {
        var a = L("BATCH_CLIENT_COUNTER", void 0) || 0;
        a || (a = Math.floor(Math.random() * bh / 2));
        a++;
        a > bh && (a = 1);
        Sf("BATCH_CLIENT_COUNTER", a);
        return a;
    };
    var uh = function uh(a, b, c) {
        if (c.videoId) var d = "VIDEO";
        else if (c.playlistId) d = "PLAYLIST";
        else return;
        a.credentialTransferTokenTargetId = c;
        a.context = a.context || {};
        a.context.user = a.context.user || {};
        a.context.user.credentialTransferTokens = [
            {
                token: b,
                scope: d
            }
        ];
    };
    var Bh = function Bh(a, b, c) {
        if (rc(c, 1 === tc(c, Bf) ? 1 : -1)) var d = 1;
        else if (c.getPlaylistId()) d = 2;
        else return;
        wc(a, 4, c);
        a = uc(a, xf, 1) || new xf();
        c = uc(a, vf, 3) || new vf();
        var e = new uf();
        e.setToken(b);
        H(e, 1, d);
        xc(c, 12, uf, e);
        wc(a, 3, c);
    };
    var Ah = function Ah(a) {
        for(var b = [], c = 0; c < a.length; c++)try {
            var d = b, e = d.push;
            var f = String(a[c]), g = zf;
            if (null == f || "" == f) var h = new g();
            else {
                var k = JSON.parse(f);
                Fc = k;
                var l = new g(k);
                Fc = null;
                h = l;
            }
            e.call(d, h);
        } catch (m) {
            Xf(new Zg("Transport failed to deserialize " + String(a[c])));
        }
        return b;
    };
    var Fh = function Fh() {
        if (!B.matchMedia) return "WEB_DISPLAY_MODE_UNKNOWN";
        try {
            return B.matchMedia("(display-mode: standalone)").matches ? "WEB_DISPLAY_MODE_STANDALONE" : B.matchMedia("(display-mode: minimal-ui)").matches ? "WEB_DISPLAY_MODE_MINIMAL_UI" : B.matchMedia("(display-mode: fullscreen)").matches ? "WEB_DISPLAY_MODE_FULLSCREEN" : B.matchMedia("(display-mode: browser)").matches ? "WEB_DISPLAY_MODE_BROWSER" : "WEB_DISPLAY_MODE_UNKNOWN";
        } catch (a) {
            return "WEB_DISPLAY_MODE_UNKNOWN";
        }
    };
    var Gh = function Gh() {
        var a = Fh();
        a = Object.keys(ug).indexOf(a);
        return -1 === a ? null : a;
    };
    var Lh = function Lh() {
        var a = B.navigator;
        return a ? a.connection : void 0;
    };
    var Mh = function Mh() {
        return "INNERTUBE_API_KEY" in Mf && "INNERTUBE_API_VERSION" in Mf;
    };
    var th = function th() {
        return {
            innertubeApiKey: L("INNERTUBE_API_KEY", void 0),
            innertubeApiVersion: L("INNERTUBE_API_VERSION", void 0),
            za: L("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
            Aa: L("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
            kb: L("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
            innertubeContextClientVersion: L("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0),
            Pa: L("INNERTUBE_CONTEXT_HL", void 0),
            Oa: L("INNERTUBE_CONTEXT_GL", void 0),
            lb: L("INNERTUBE_HOST_OVERRIDE", void 0) || "",
            nb: !!L("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
            mb: !!L("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
            appInstallData: L("SERIALIZED_CLIENT_CONFIG_DATA", void 0)
        };
    };
    var sh = function sh(a) {
        var b = {
            client: {
                hl: a.Pa,
                gl: a.Oa,
                clientName: a.Aa,
                clientVersion: a.innertubeContextClientVersion,
                configInfo: a.za
            }
        };
        navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
        var c = B.devicePixelRatio;
        c && 1 != c && (b.client.screenDensityFloat = String(c));
        c = L("EXPERIMENTS_TOKEN", "");
        "" !== c && (b.client.experimentsToken = c);
        c = tg();
        0 < c.length && (b.request = {
            internalExperimentFlags: c
        });
        Nh(a, void 0, b);
        Oh(a, void 0, b);
        Ph(void 0, b);
        Qh(a, void 0, b);
        Rh(void 0, b);
        L("DELEGATED_SESSION_ID") && !N("pageid_as_header_web") && (b.user = {
            onBehalfOfUser: L("DELEGATED_SESSION_ID")
        });
        a = Object;
        c = a.assign;
        for(var d = b.client, e = {}, f = u(Object.entries(og(L("DEVICE", "")))), g = f.next(); !g.done; g = f.next()){
            var h = u(g.value);
            g = h.next().value;
            h = h.next().value;
            "cbrand" === g ? e.deviceMake = h : "cmodel" === g ? e.deviceModel = h : "cbr" === g ? e.browserName = h : "cbrver" === g ? e.browserVersion = h : "cos" === g ? e.osName = h : "cosver" === g ? e.osVersion = h : "cplatform" === g && (e.platform = h);
        }
        b.client = c.call(a, d, e);
        return b;
    };
    var zh = function zh(a) {
        var b = new xf(), c = new qf();
        H(c, 1, a.Pa);
        H(c, 2, a.Oa);
        H(c, 16, a.kb);
        H(c, 17, a.innertubeContextClientVersion);
        if (a.za) {
            var d = a.za, e = new nf();
            d.coldConfigData && H(e, 1, d.coldConfigData);
            d.appInstallData && H(e, 6, d.appInstallData);
            d.coldHashData && H(e, 3, d.coldHashData);
            d.hotHashData && H(e, 5, d.hotHashData);
            wc(c, 62, e);
        }
        (d = B.devicePixelRatio) && 1 != d && H(c, 65, d);
        d = L("EXPERIMENTS_TOKEN", "");
        "" !== d && H(c, 54, d);
        d = tg();
        if (0 < d.length) {
            e = new sf();
            for(var f = 0; f < d.length; f++){
                var g = new lf();
                H(g, 1, d[f].key);
                g.setValue(d[f].value);
                xc(e, 15, lf, g);
            }
            wc(b, 5, e);
        }
        Nh(a, c);
        Oh(a, c);
        Ph(c);
        Qh(a, c);
        Rh(c);
        L("DELEGATED_SESSION_ID") && !N("pageid_as_header_web") && (a = new vf(), H(a, 3, L("DELEGATED_SESSION_ID")));
        a = u(Object.entries(og(L("DEVICE", ""))));
        for(d = a.next(); !d.done; d = a.next())e = u(d.value), d = e.next().value, e = e.next().value, "cbrand" === d ? H(c, 12, e) : "cmodel" === d ? H(c, 13, e) : "cbr" === d ? H(c, 87, e) : "cbrver" === d ? H(c, 88, e) : "cos" === d ? H(c, 18, e) : "cosver" === d ? H(c, 19, e) : "cplatform" === d && H(c, 42, e);
        wc(b, 1, c);
        return b;
    };
    var Nh = function Nh(a, b, c) {
        a = a.Aa;
        if ("WEB" === a || "MWEB" === a || 1 === a || 2 === a) {
            if (b) {
                c = uc(b, of, 96) || new of();
                var d = Gh();
                null !== d && H(c, 3, d);
                wc(b, 96, c);
            } else c && (c.client.mainAppWebInfo = null != (d = c.client.mainAppWebInfo) ? d : {}, c.client.mainAppWebInfo.webDisplayMode = Fh());
        }
    };
    var Oh = function Oh(a, b, c) {
        a = a.Aa;
        if (("WEB_REMIX" === a || 76 === a) && !N("music_web_display_mode_killswitch")) {
            if (b) {
                var d;
                c = null != (d = uc(b, pf, 70)) ? d : new pf();
                d = Gh();
                null !== d && H(c, 10, d);
                wc(b, 70, c);
            } else if (c) {
                var e;
                c.client.Ra = null != (e = c.client.Ra) ? e : {};
                c.client.Ra.webDisplayMode = Fh();
            }
        }
    };
    var Ph = function Ph(a, b) {
        var c;
        if (N("web_log_memory_total_kbytes") && (null == (c = B.navigator) ? 0 : c.deviceMemory)) {
            var d;
            c = null == (d = B.navigator) ? void 0 : d.deviceMemory;
            a ? H(a, 95, 1e6 * c) : b && (b.client.memoryTotalKbytes = "" + 1e6 * c);
        }
    };
    var Qh = function Qh(a, b, c) {
        if (a.appInstallData) {
            if (b) {
                var d;
                c = null != (d = uc(b, nf, 62)) ? d : new nf();
                H(c, 6, a.appInstallData);
                wc(b, 62, c);
            } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData);
        }
    };
    var Rh = function Rh(a, b) {
        a: {
            var c = Lh();
            if (c) {
                var d = Hh[c.type || "unknown"] || "CONN_UNKNOWN";
                c = Hh[c.effectiveType || "unknown"] || "CONN_UNKNOWN";
                "CONN_CELLULAR_UNKNOWN" === d && "CONN_UNKNOWN" !== c && (d = c);
                if ("CONN_UNKNOWN" !== d) break a;
                if ("CONN_UNKNOWN" !== c) {
                    d = c;
                    break a;
                }
            }
            d = void 0;
        }
        d && (a ? H(a, 61, Ih[d]) : b && (b.client.connectionType = d));
        N("web_log_effective_connection_type") && (d = Lh(), d = null !== d && void 0 !== d && d.effectiveType ? Kh.hasOwnProperty(d.effectiveType) ? Kh[d.effectiveType] : "EFFECTIVE_CONNECTION_TYPE_UNKNOWN" : void 0, d && (a ? H(a, 94, Jh[d]) : b && (b.client.effectiveConnectionType = d)));
    };
    var Sh = function Sh(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = {};
        N("enable_web_eom_visitor_data") && L("EOM_VISITOR_DATA") ? d = {
            "X-Goog-EOM-Visitor-Id": L("EOM_VISITOR_DATA")
        } : d = {
            "X-Goog-Visitor-Id": c.visitorData || L("VISITOR_DATA", "")
        };
        if (b && b.includes("www.youtube-nocookie.com")) return d;
        (b = c.Kb || L("AUTHORIZATION")) || (a ? b = "Bearer " + C("gapi.auth.getToken")().Jb : b = hd([]));
        b && (d.Authorization = b, d["X-Goog-AuthUser"] = L("SESSION_INDEX", 0), N("pageid_as_header_web") && (d["X-Goog-PageId"] = L("DELEGATED_SESSION_ID")));
        return d;
    };
    var Th = function Th(a) {
        a = Object.assign({}, a);
        delete a.Authorization;
        var b = hd();
        if (b) {
            var c = new ke();
            c.update(L("INNERTUBE_API_KEY", void 0));
            c.update(b);
            a.hash = dc(c.digest(), 3);
        }
        return a;
    };
    var Uh = function Uh(a) {
        var b = new df();
        (b = b.isAvailable() ? a ? new kf(b, a) : b : null) || (a = new ef(a || "UserDataSharedStore"), b = a.isAvailable() ? a : null);
        this.h = (a = b) ? new $e(a) : null;
        this.i = document.domain || window.location.hostname;
    };
    var Wh = function Wh() {
        Vh || (Vh = new Uh("yt.innertube"));
        return Vh;
    };
    var Xh = function Xh(a, b, c, d) {
        if (d) return null;
        d = Wh().get("nextId", !0) || 1;
        var e = Wh().get("requests", !0) || {};
        e[d] = {
            method: a,
            request: b,
            authState: Th(c),
            requestTime: Math.round(Q())
        };
        Wh().set("nextId", d + 1, 86400, !0);
        Wh().set("requests", e, 86400, !0);
        return d;
    };
    var Yh = function Yh(a) {
        var b = Wh().get("requests", !0) || {};
        delete b[a];
        Wh().set("requests", b, 86400, !0);
    };
    var Zh = function Zh(a) {
        var b = Wh().get("requests", !0);
        if (b) {
            for(var c in b){
                var d = b[c];
                if (!(6e4 > Math.round(Q()) - d.requestTime)) {
                    var e = d.authState, f = Th(Sh(!1));
                    fb(e, f) && (e = d.request, "requestTimeMs" in e && (e.requestTimeMs = Math.round(Q())), xh(a, d.method, e, {}));
                    delete b[c];
                }
            }
            Wh().set("requests", b, 86400, !0);
        }
    };
    var bi = function bi() {
        var a;
        return null === (a = ai()) || void 0 === a ? void 0 : a.get("LAST_RESULT_ENTRY_KEY", !0);
    };
    var ei = function ei(a) {
        di || (ci.push({
            type: "ERROR",
            payload: a
        }), 10 < ci.length && ci.shift());
    };
    var fi = function fi(a, b) {
        di || (ci.push({
            type: "EVENT",
            eventType: a,
            payload: b
        }), 10 < ci.length && ci.shift());
    };
    var gi = function gi() {
        try {
            return hi(), !0;
        } catch (a) {
            return !1;
        }
    };
    var hi = function hi() {
        if (void 0 !== L("DATASYNC_ID", void 0)) return L("DATASYNC_ID", void 0);
        throw new Zg("Datasync ID not set", "unknown");
    };
    var ii = function ii(a) {
        if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
    };
    var ji = function ji(a) {
        return a.substr(0, a.indexOf(":")) || a;
    };
    var qi = function qi(a, b, c, d) {
        b = ji(b);
        var e = a instanceof Error ? a : Error("Unexpected error: " + a);
        if (e instanceof U) return e;
        a = {
            objectStoreNames: c,
            dbName: b,
            dbVersion: d
        };
        if ("QuotaExceededError" === e.name) return new U("QUOTA_EXCEEDED", a);
        if (ac && "UnknownError" === e.name) return new U("QUOTA_MAYBE_EXCEEDED", a);
        if (e instanceof oi) return new U("MISSING_INDEX", Object.assign(Object.assign({}, a), {
            objectStore: e.objectStore,
            index: e.index
        }));
        if ("InvalidStateError" === e.name && pi.some(function(f) {
            return e.message.includes(f);
        })) return new U("EXECUTE_TRANSACTION_ON_CLOSED_DB", a);
        if ("AbortError" === e.name) return new U("UNKNOWN_ABORT", a, e.message);
        e.args = [
            Object.assign(Object.assign({}, a), {
                name: "IdbError",
                Qb: e.name
            })
        ];
        e.level = "WARNING";
        return e;
    };
    var ri = function ri(a, b, c) {
        var d = bi();
        return new U("IDB_NOT_SUPPORTED", {
            context: {
                caller: a,
                publicName: b,
                version: c,
                hasSucceededOnce: null === d || void 0 === d ? void 0 : d.hasSucceededOnce
            }
        });
    };
    var si = function si(a) {
        if (!a) throw Error();
        throw a;
    };
    var ti = function ti(a) {
        return a;
    };
    var ui = function ui(a) {
        this.h = a;
    };
    var V = function V(a) {
        function b(e) {
            if ("PENDING" === d.state.status) {
                d.state = {
                    status: "REJECTED",
                    reason: e
                };
                e = u(d.onRejected);
                for(var f = e.next(); !f.done; f = e.next())f = f.value, f();
            }
        }
        function c(e) {
            if ("PENDING" === d.state.status) {
                d.state = {
                    status: "FULFILLED",
                    value: e
                };
                e = u(d.h);
                for(var f = e.next(); !f.done; f = e.next())f = f.value, f();
            }
        }
        var d = this;
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.onRejected = [];
        a = a.h;
        try {
            a(c, b);
        } catch (e) {
            b(e);
        }
    };
    var vi = function vi(a, b) {
        a.then(void 0, b);
    };
    var wi = function wi(a, b, c, d, e) {
        try {
            if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
            var f = c(a.state.value);
            f instanceof V ? yi(a, b, f, d, e) : d(f);
        } catch (g) {
            e(g);
        }
    };
    var xi = function xi(a, b, c, d, e) {
        try {
            if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
            var f = c(a.state.reason);
            f instanceof V ? yi(a, b, f, d, e) : d(f);
        } catch (g) {
            e(g);
        }
    };
    var zi = function zi(a, b, c) {
        function d() {
            c(a.error);
            f();
        }
        function e() {
            b(a.result);
            f();
        }
        function f() {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", d);
            } catch (g) {}
        }
        a.addEventListener("success", e);
        a.addEventListener("error", d);
    };
    var Ai = function Ai(a) {
        return new Promise(function(b, c) {
            zi(a, b, c);
        });
    };
    var W = function W(a) {
        return new V(new ui(function(b, c) {
            zi(a, b, c);
        }));
    };
    var Bi = function Bi(a, b) {
        return new V(new ui(function(c, d) {
            function e() {
                var f = a ? b(a) : null;
                f ? f.then(function(g) {
                    a = g;
                    e();
                }, d) : c();
            }
            e();
        }));
    };
    var Ci = function Ci(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(Q());
        this.i = !1;
    };
    var Di = function Di(a, b, c) {
        a = a.h.createObjectStore(b, c);
        return new Ei(a);
    };
    var Fi = function Fi(a, b) {
        return X(a, [
            "LogsRequestsStore"
        ], {
            mode: "readwrite",
            H: !0
        }, function(c) {
            c = c.objectStore("LogsRequestsStore");
            return W(c.h.put(b, void 0));
        });
    };
    var X = function X(a, b, c, d) {
        var e, f, g, h, k, l, m, p, t, q, x, y;
        return z(function(A) {
            switch(A.h){
                case 1:
                    var M = {
                        mode: "readonly",
                        H: !1,
                        tag: "IDB_TRANSACTION_TAG_UNKNOWN"
                    };
                    "string" === typeof c ? M.mode = c : Object.assign(M, c);
                    e = M;
                    a.transactionCount++;
                    f = e.H ? 3 : 1;
                    g = 0;
                case 2:
                    if (h) {
                        A.o(3);
                        break;
                    }
                    g++;
                    k = Math.round(Q());
                    sa(A, 4);
                    l = a.h.transaction(b, e.mode);
                    M = new Gi(l);
                    M = Hi(M, d);
                    return w(A, M, 6);
                case 6:
                    return m = A.i, p = Math.round(Q()), Ii(a, k, p, g, void 0, b.join(), e), A.return(m);
                case 4:
                    t = ua(A);
                    q = Math.round(Q());
                    x = qi(t, a.h.name, b.join(), a.h.version);
                    if ((y = x instanceof U && !x.h) || g >= f) Ii(a, k, q, g, x, b.join(), e), h = x;
                    A.o(2);
                    break;
                case 3:
                    return A.return(Promise.reject(h));
            }
        });
    };
    var Ii = function Ii(a, b, c, d, e, f, g) {
        b = c - b;
        e ? (e instanceof U && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && fi("QUOTA_EXCEEDED", {
            dbName: ji(a.h.name),
            objectStoreNames: f,
            transactionCount: a.transactionCount,
            transactionMode: g.mode
        }), e instanceof U && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), fi("TRANSACTION_UNEXPECTEDLY_ABORTED", {
            objectStoreNames: f,
            transactionDuration: b,
            transactionCount: a.transactionCount,
            dbDuration: c
        }), a.i = !0), Ji(a, !1, d, f, b, g.tag), ei(e)) : Ji(a, !0, d, f, b, g.tag);
    };
    var Ji = function Ji(a, b, c, d, e, f) {
        fi("TRANSACTION_ENDED", {
            objectStoreNames: d,
            connectionHasUnknownAbortedTransaction: a.i,
            duration: e,
            isSuccessful: b,
            tryCount: c,
            tag: void 0 === f ? "IDB_TRANSACTION_TAG_UNKNOWN" : f
        });
    };
    var Ei = function Ei(a) {
        this.h = a;
    };
    var Ki = function Ki(a, b) {
        return Li(a, {
            query: b
        }, function(c) {
            return c.delete().then(function() {
                return c.continue();
            });
        }).then(function() {});
    };
    var Li = function Li(a, b, c) {
        a = a.h.openCursor(b.query, b.direction);
        return Ni(a).then(function(d) {
            return Bi(d, c);
        });
    };
    var Gi = function Gi(a) {
        var b = this;
        this.h = a;
        this.j = new Map();
        this.i = !1;
        this.done = new Promise(function(c, d) {
            b.h.addEventListener("complete", function() {
                c();
            });
            b.h.addEventListener("error", function(e) {
                e.currentTarget === e.target && d(b.h.error);
            });
            b.h.addEventListener("abort", function() {
                var e = b.h.error;
                if (e) d(e);
                else if (!b.i) {
                    e = U;
                    for(var f = b.h.objectStoreNames, g = [], h = 0; h < f.length; h++){
                        var k = f.item(h);
                        if (null === k) throw Error("Invariant: item in DOMStringList is null");
                        g.push(k);
                    }
                    e = new e("UNKNOWN_ABORT", {
                        objectStoreNames: g.join(),
                        dbName: b.h.db.name,
                        mode: b.h.mode
                    });
                    d(e);
                }
            });
        });
    };
    var Hi = function Hi(a, b) {
        var c = new Promise(function(d, e) {
            try {
                vi(b(a).then(function(f) {
                    d(f);
                }), e);
            } catch (f) {
                e(f), a.abort();
            }
        });
        return Promise.all([
            c,
            a.done
        ]).then(function(d) {
            return u(d).next().value;
        });
    };
    var Mi = function Mi(a) {
        this.h = a;
    };
    var Oi = function Oi(a, b, c) {
        a = a.h.openCursor(void 0 === b.query ? null : b.query, void 0 === b.direction ? "next" : b.direction);
        return Ni(a).then(function(d) {
            return Bi(d, c);
        });
    };
    var Pi = function Pi(a, b) {
        this.request = a;
        this.cursor = b;
    };
    var Ni = function Ni(a) {
        return W(a).then(function(b) {
            return b ? new Pi(a, b) : null;
        });
    };
    var Qi = function Qi(a, b, c) {
        return new Promise(function(d, e) {
            function f() {
                t || (t = new Ci(g.result, {
                    closed: p
                }));
                return t;
            }
            var g = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
            var h = c.blocked, k = c.blocking, l = c.rb, m = c.upgrade, p = c.closed, t;
            g.addEventListener("upgradeneeded", function(q) {
                try {
                    if (null === q.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                    if (null === g.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                    q.dataLoss && "none" !== q.dataLoss && fi("IDB_DATA_CORRUPTED", {
                        reason: q.dataLossMessage || "unknown reason",
                        dbName: ji(a)
                    });
                    var x = f(), y = new Gi(g.transaction);
                    m && m(x, function(A) {
                        return q.oldVersion < A && q.newVersion >= A;
                    }, y);
                    y.done.catch(function(A) {
                        e(A);
                    });
                } catch (A) {
                    e(A);
                }
            });
            g.addEventListener("success", function() {
                var q = g.result;
                k && q.addEventListener("versionchange", function() {
                    k(f());
                });
                q.addEventListener("close", function() {
                    fi("IDB_UNEXPECTEDLY_CLOSED", {
                        dbName: ji(a),
                        dbVersion: q.version
                    });
                    l && l();
                });
                d(f());
            });
            g.addEventListener("error", function() {
                e(g.error);
            });
            h && g.addEventListener("blocked", function() {
                h();
            });
        });
    };
    var Ri = function Ri(a, b, c) {
        c = void 0 === c ? {} : c;
        return Qi(a, b, c);
    };
    var Si = function Si(a, b) {
        b = void 0 === b ? {} : b;
        var c, d, e, f;
        return z(function(g) {
            if (1 == g.h) return sa(g, 2), c = self.indexedDB.deleteDatabase(a), d = b, (e = d.blocked) && c.addEventListener("blocked", function() {
                e();
            }), w(g, Ai(c), 4);
            if (2 != g.h) return ta(g, 0);
            f = ua(g);
            throw qi(f, a, "", -1);
        });
    };
    var Ti = function Ti(a) {
        return new Promise(function(b) {
            Ag(function() {
                b();
            }, a);
        });
    };
    var Ui = function Ui(a, b) {
        this.name = a;
        this.options = b;
        this.l = !0;
        this.v = this.m = 0;
        this.i = 500;
    };
    var Vi = function Vi(a, b) {
        return new U("INCOMPATIBLE_DB_VERSION", {
            dbName: a.name,
            oldVersion: a.options.version,
            newVersion: b
        });
    };
    var Wi = function Wi(a, b) {
        if (!b) throw ri("openWithToken", ji(a.name));
        return a.open();
    };
    var Yi = function Yi(a, b) {
        var c;
        return z(function(d) {
            if (1 == d.h) return w(d, Wi(Xi, b), 2);
            c = d.i;
            return d.return(X(c, [
                "databases"
            ], {
                H: !0,
                mode: "readwrite"
            }, function(e) {
                var f = e.objectStore("databases");
                return f.get(a.actualName).then(function(g) {
                    if (g ? a.actualName !== g.actualName || a.publicName !== g.publicName || a.userIdentifier !== g.userIdentifier : 1) return W(f.h.put(a, void 0)).then(function() {});
                });
            }));
        });
    };
    var Zi = function Zi(a, b) {
        var c;
        return z(function(d) {
            if (1 == d.h) return a ? w(d, Wi(Xi, b), 2) : d.return();
            c = d.i;
            return d.return(c.delete("databases", a));
        });
    };
    var $i = function $i(a, b) {
        var c, d;
        return z(function(e) {
            return 1 == e.h ? (c = [], w(e, Wi(Xi, b), 2)) : 3 != e.h ? (d = e.i, w(e, X(d, [
                "databases"
            ], {
                H: !0,
                mode: "readonly"
            }, function(f) {
                c.length = 0;
                return Li(f.objectStore("databases"), {}, function(g) {
                    a(g.X()) && c.push(g.X());
                    return g.continue();
                });
            }), 3)) : e.return(c);
        });
    };
    var aj = function aj(a) {
        return $i(function(b) {
            return "LogsDatabaseV2" === b.publicName && void 0 !== b.userIdentifier;
        }, a);
    };
    var dj = function dj() {
        var a, b, c;
        return z(function(d) {
            switch(d.h){
                case 1:
                    a = bi();
                    if (null === a || void 0 === a ? 0 : a.hasSucceededOnce) return d.return(!0);
                    var e;
                    if (e = $h) e = /WebKit\/([0-9]+)/.exec(wb()), e = !!(e && 600 <= parseInt(e[1], 10));
                    e && (e = /WebKit\/([0-9]+)/.exec(wb()), e = !(e && 602 <= parseInt(e[1], 10)));
                    if (e || Mb) return d.return(!1);
                    try {
                        if (b = self, !(b.indexedDB && b.IDBIndex && b.IDBKeyRange && b.IDBObjectStore)) return d.return(!1);
                    } catch (f) {
                        return d.return(!1);
                    }
                    if (!("IDBTransaction" in self && "objectStoreNames" in IDBTransaction.prototype)) return d.return(!1);
                    sa(d, 2);
                    c = {
                        actualName: "yt-idb-test-do-not-use",
                        publicName: "yt-idb-test-do-not-use",
                        userIdentifier: void 0
                    };
                    return w(d, Yi(c, cj), 4);
                case 4:
                    return w(d, Zi("yt-idb-test-do-not-use", cj), 5);
                case 5:
                    return d.return(!0);
                case 2:
                    return ua(d), d.return(!1);
            }
        });
    };
    var ej = function ej() {
        if (void 0 !== bj) return bj;
        di = !0;
        return bj = dj().then(function(a) {
            di = !1;
            var b, c;
            null !== (b = ai()) && void 0 !== b && b.h && (b = bi(), b = {
                hasSucceededOnce: (null === b || void 0 === b ? void 0 : b.hasSucceededOnce) || a
            }, null === (c = ai()) || void 0 === c || c.set("LAST_RESULT_ENTRY_KEY", b, 2592e3, !0));
            return a;
        });
    };
    var fj = function fj() {
        return C("ytglobal.idbToken_") || void 0;
    };
    var gj = function gj() {
        var a = fj();
        return a ? Promise.resolve(a) : ej().then(function(b) {
            (b = b ? cj : void 0) && D("ytglobal.idbToken_", b);
            return b;
        });
    };
    var hj = function hj(a) {
        if (!gi()) throw a = new U("AUTH_INVALID", {
            dbName: a
        }), ei(a), a;
        var b = hi();
        return {
            actualName: a + ":" + b,
            publicName: a,
            userIdentifier: b
        };
    };
    var ij = function ij(a, b, c, d) {
        var e, f, g, h, k, l;
        return z(function(m) {
            switch(m.h){
                case 1:
                    return f = null !== (e = Error().stack) && void 0 !== e ? e : "", w(m, gj(), 2);
                case 2:
                    g = m.i;
                    if (!g) throw h = ri("openDbImpl", a, b), N("ytidb_async_stack_killswitch") || (h.stack = h.stack + "\n" + f.substring(f.indexOf("\n") + 1)), ei(h), h;
                    ii(a);
                    k = c ? {
                        actualName: a,
                        publicName: a,
                        userIdentifier: void 0
                    } : hj(a);
                    sa(m, 3);
                    return w(m, Yi(k, g), 5);
                case 5:
                    return w(m, Ri(k.actualName, b, d), 6);
                case 6:
                    return m.return(m.i);
                case 3:
                    return l = ua(m), sa(m, 7), w(m, Zi(k.actualName, g), 9);
                case 9:
                    ta(m, 8);
                    break;
                case 7:
                    ua(m);
                case 8:
                    throw l;
            }
        });
    };
    var jj = function jj(a, b, c) {
        c = void 0 === c ? {} : c;
        return ij(a, b, !1, c);
    };
    var kj = function kj(a, b, c) {
        c = void 0 === c ? {} : c;
        return ij(a, b, !0, c);
    };
    var lj = function lj(a, b) {
        b = void 0 === b ? {} : b;
        var c, d;
        return z(function(e) {
            if (1 == e.h) return w(e, gj(), 2);
            if (3 != e.h) {
                c = e.i;
                if (!c) return e.return();
                ii(a);
                d = hj(a);
                return w(e, Si(d.actualName, b), 3);
            }
            return w(e, Zi(d.actualName, c), 0);
        });
    };
    var mj = function mj(a, b, c) {
        a = a.map(function(d) {
            return z(function(e) {
                return 1 == e.h ? w(e, Si(d.actualName, b), 2) : w(e, Zi(d.actualName, c), 0);
            });
        });
        return Promise.all(a).then(function() {});
    };
    var nj = function nj() {
        var a = void 0 === a ? {} : a;
        var b, c;
        return z(function(d) {
            if (1 == d.h) return w(d, gj(), 2);
            if (3 != d.h) {
                b = d.i;
                if (!b) return d.return();
                ii("LogsDatabaseV2");
                return w(d, aj(b), 3);
            }
            c = d.i;
            return w(d, mj(c, a, b), 0);
        });
    };
    var oj = function oj(a, b) {
        b = void 0 === b ? {} : b;
        var c;
        return z(function(d) {
            if (1 == d.h) return w(d, gj(), 2);
            if (3 != d.h) {
                c = d.i;
                if (!c) return d.return();
                ii(a);
                return w(d, Si(a, b), 3);
            }
            return w(d, Zi(a, c), 0);
        });
    };
    var pj = function pj(a) {
        var b, c, d, e, f, g, h, k;
        this.h = !1;
        this.potentialEsfErrorCounter = this.i = 0;
        this.handleError = function() {};
        this.ba = function() {};
        this.now = Date.now;
        this.ea = !1;
        this.Za = null !== (b = a.Za) && void 0 !== b ? b : 100;
        this.Xa = null !== (c = a.Xa) && void 0 !== c ? c : 1;
        this.Va = null !== (d = a.Va) && void 0 !== d ? d : 2592e6;
        this.Ua = null !== (e = a.Ua) && void 0 !== e ? e : 12e4;
        this.Wa = null !== (f = a.Wa) && void 0 !== f ? f : 5e3;
        this.s = null !== (g = a.s) && void 0 !== g ? g : void 0;
        this.oa = !!a.oa;
        this.na = null !== (h = a.na) && void 0 !== h ? h : 0.1;
        this.sa = null !== (k = a.sa) && void 0 !== k ? k : 10;
        a.handleError && (this.handleError = a.handleError);
        a.ba && (this.ba = a.ba);
        a.ea && (this.ea = a.ea);
        this.B = a.B;
        this.K = a.K;
        this.D = a.D;
        this.G = a.G;
        this.S = a.S;
        this.Ea = a.Ea;
        this.Da = a.Da;
        this.s && (!this.B || this.B("networkless_logging")) && qj(this);
    };
    var qj = function qj(a) {
        a.s && !a.ea && (a.h = !0, a.oa && Math.random() <= a.na && a.D.hb(a.s), rj(a), a.G.F() && a.ia(), a.G.Y(a.Ea, a.ia.bind(a)), a.G.Y(a.Da, a.Ia.bind(a)));
    };
    var sj = function sj(a, b) {
        var c, d;
        return z(function(e) {
            switch(e.h){
                case 1:
                    if (!a.s) throw c = ri("immediateSend"), c;
                    if (void 0 === b.id) {
                        e.o(2);
                        break;
                    }
                    return w(e, a.D.ob(b.id, a.s), 3);
                case 3:
                    (d = e.i) ? b = d : a.ba(Error("The request cannot be found in the database."));
                case 2:
                    if (uj(a, b, a.Va)) {
                        e.o(4);
                        break;
                    }
                    a.ba(Error("Networkless Logging: Stored logs request expired age limit"));
                    if (void 0 === b.id) {
                        e.o(5);
                        break;
                    }
                    return w(e, a.D.aa(b.id, a.s), 5);
                case 5:
                    return e.return();
                case 4:
                    b.skipRetry || (b = vj(a, b));
                    if (!b) {
                        e.o(0);
                        break;
                    }
                    if (!b.skipRetry || void 0 === b.id) {
                        e.o(8);
                        break;
                    }
                    return w(e, a.D.aa(b.id, a.s), 8);
                case 8:
                    a.S(b.url, b.options, !!b.skipRetry), e.h = 0;
            }
        });
    };
    var vj = function vj(a, b) {
        if (!a.s) throw ri("updateRequestHandlers");
        var c = b.options.onError ? b.options.onError : function c() {};
        b.options.onError = function(e, f) {
            var g;
            return z(function(h) {
                switch(h.h){
                    case 1:
                        g = wj(f);
                        if (!(a.B && a.B("nwl_consider_error_code") && g || a.B && !a.B("nwl_consider_error_code") && a.potentialEsfErrorCounter <= a.sa)) {
                            h.o(2);
                            break;
                        }
                        if (!a.G.T) {
                            h.o(3);
                            break;
                        }
                        return w(h, a.G.T(), 3);
                    case 3:
                        if (a.G.F()) {
                            h.o(2);
                            break;
                        }
                        c(e, f);
                        if (!a.B || !a.B("nwl_consider_error_code") || void 0 === (null === b || void 0 === b ? void 0 : b.id)) {
                            h.o(6);
                            break;
                        }
                        return w(h, a.D.Fa(b.id, a.s, !1), 6);
                    case 6:
                        return h.return();
                    case 2:
                        if (a.B && a.B("nwl_consider_error_code") && !g && a.potentialEsfErrorCounter > a.sa) return h.return();
                        a.potentialEsfErrorCounter++;
                        if (void 0 === (null === b || void 0 === b ? void 0 : b.id)) {
                            h.o(8);
                            break;
                        }
                        return b.sendCount < a.Xa ? w(h, a.D.Fa(b.id, a.s), 12) : w(h, a.D.aa(b.id, a.s), 8);
                    case 12:
                        a.K.L(function() {
                            a.G.F() && a.ia();
                        }, a.Wa);
                    case 8:
                        c(e, f), h.h = 0;
                }
            });
        };
        var d = b.options.onSuccess ? b.options.onSuccess : function d() {};
        b.options.onSuccess = function(e, f) {
            return z(function(g) {
                if (1 == g.h) return void 0 === (null === b || void 0 === b ? void 0 : b.id) ? g.o(2) : w(g, a.D.aa(b.id, a.s), 2);
                a.G.P && a.B && a.B("vss_network_hint") && a.G.P(!0);
                d(e, f);
                g.h = 0;
            });
        };
        return b;
    };
    var uj = function uj(a, b, c) {
        b = b.timestamp;
        return a.now() - b >= c ? !1 : !0;
    };
    var tj = function tj(a, b) {
        a.ab && !a.G.F() ? a.ab(b) : a.handleError(b);
    };
    var wj = function wj(a) {
        var b;
        return (a = null === (b = null === a || void 0 === a ? void 0 : a.error) || void 0 === b ? void 0 : b.code) && 400 <= a && 599 >= a ? !1 : !0;
    };
    var yj = function yj(a, b) {
        Ui.call(this, a, b);
        this.options = b;
        ii(a);
    };
    var zj = function zj(a, b) {
        var c;
        return function() {
            c || (c = new yj(a, b));
            return c;
        };
    };
    var Aj = function Aj(a, b) {
        return zj(a, b);
    };
    var Cj = function Cj() {
        if (Bj) return Bj();
        var a = {};
        Bj = Aj("LogsDatabaseV2", {
            ga: (a.LogsRequestsStore = {
                wa: 2
            }, a),
            Ga: !1,
            upgrade: function upgrade(b, c, d) {
                c(2) && Di(b, "LogsRequestsStore", {
                    keyPath: "id",
                    autoIncrement: !0
                });
                c(3);
                c(5) && (d = d.objectStore("LogsRequestsStore"), d.h.indexNames.contains("newRequest") && d.h.deleteIndex("newRequest"), d.h.createIndex("newRequestV2", [
                    "status",
                    "interface",
                    "timestamp"
                ], {
                    unique: !1
                }));
                c(7) && b.h.objectStoreNames.contains("sapisid") && b.h.deleteObjectStore("sapisid");
                c(9) && b.h.objectStoreNames.contains("SWHealthLog") && b.h.deleteObjectStore("SWHealthLog");
            },
            version: 9
        });
        return Bj();
    };
    var Dj = function Dj(a) {
        return Wi(Cj(), a);
    };
    var Ej = function Ej(a, b) {
        var c, d, e, f;
        return z(function(g) {
            if (1 == g.h) return c = {
                startTime: Q(),
                transactionType: "YT_IDB_TRANSACTION_TYPE_WRITE"
            }, w(g, Dj(b), 2);
            if (3 != g.h) return d = g.i, e = Object.assign(Object.assign({}, a), {
                options: JSON.parse(JSON.stringify(a.options)),
                interface: L("INNERTUBE_CONTEXT_CLIENT_NAME", 0)
            }), w(g, Fi(d, e), 3);
            f = g.i;
            c.sb = Q();
            Fj(c);
            return g.return(f);
        });
    };
    var Gj = function Gj(a, b) {
        var c, d, e, f, g, h, k;
        return z(function(l) {
            if (1 == l.h) return c = {
                startTime: Q(),
                transactionType: "YT_IDB_TRANSACTION_TYPE_READ"
            }, w(l, Dj(b), 2);
            if (3 != l.h) return d = l.i, e = L("INNERTUBE_CONTEXT_CLIENT_NAME", 0), f = [
                a,
                e,
                0
            ], g = [
                a,
                e,
                Q()
            ], h = IDBKeyRange.bound(f, g), k = void 0, w(l, X(d, [
                "LogsRequestsStore"
            ], {
                mode: "readwrite",
                H: !0
            }, function(m) {
                return Oi(m.objectStore("LogsRequestsStore").index("newRequestV2"), {
                    query: h,
                    direction: "prev"
                }, function(p) {
                    p.X() && (k = p.X(), "NEW" === a && (k.status = "QUEUED", p.update(k)));
                });
            }), 3);
            c.sb = Q();
            Fj(c);
            return l.return(k);
        });
    };
    var Hj = function Hj(a, b) {
        var c;
        return z(function(d) {
            if (1 == d.h) return w(d, Dj(b), 2);
            c = d.i;
            return d.return(X(c, [
                "LogsRequestsStore"
            ], {
                mode: "readwrite",
                H: !0
            }, function(e) {
                var f = e.objectStore("LogsRequestsStore");
                return f.get(a).then(function(g) {
                    if (g) return g.status = "QUEUED", W(f.h.put(g, void 0)).then(function() {
                        return g;
                    });
                });
            }));
        });
    };
    var Ij = function Ij(a, b, c) {
        c = void 0 === c ? !0 : c;
        var d;
        return z(function(e) {
            if (1 == e.h) return w(e, Dj(b), 2);
            d = e.i;
            return e.return(X(d, [
                "LogsRequestsStore"
            ], {
                mode: "readwrite",
                H: !0
            }, function(f) {
                var g = f.objectStore("LogsRequestsStore");
                return g.get(a).then(function(h) {
                    return h ? (h.status = "NEW", c && (h.sendCount += 1), W(g.h.put(h, void 0)).then(function() {
                        return h;
                    })) : V.resolve(void 0);
                });
            }));
        });
    };
    var Jj = function Jj(a, b) {
        var c;
        return z(function(d) {
            if (1 == d.h) return w(d, Dj(b), 2);
            c = d.i;
            return d.return(c.delete("LogsRequestsStore", a));
        });
    };
    var Kj = function Kj(a) {
        var b, c;
        return z(function(d) {
            if (1 == d.h) return w(d, Dj(a), 2);
            b = d.i;
            c = Q() - 2592e6;
            return w(d, X(b, [
                "LogsRequestsStore"
            ], {
                mode: "readwrite",
                H: !0
            }, function(e) {
                return Li(e.objectStore("LogsRequestsStore"), {}, function(f) {
                    if (f.X().timestamp <= c) return f.delete().then(function() {
                        return f.continue();
                    });
                });
            }), 0);
        });
    };
    var Lj = function Lj() {
        z(function(a) {
            return w(a, nj(), 0);
        });
    };
    var Fj = function Fj(a) {
        if (!N("nwl_csi_killswitch") && 0.01 >= Math.random()) {
            var b = C("ytPubsub2Pubsub2Instance");
            b && b.publish.call(b, "nwl_transaction_latency_payload".toString(), "nwl_transaction_latency_payload", a);
        }
    };
    var Oj = function Oj(a) {
        return Wi(Nj(), a);
    };
    var Pj = function Pj(a) {
        var b, c;
        z(function(d) {
            if (1 == d.h) return w(d, Oj(a), 2);
            b = d.i;
            c = Q() - 2592e6;
            return w(d, X(b, [
                "SWHealthLog"
            ], {
                mode: "readwrite",
                H: !0
            }, function(e) {
                return Li(e.objectStore("SWHealthLog"), {}, function(f) {
                    if (f.X().timestamp <= c) return f.delete().then(function() {
                        return f.continue();
                    });
                });
            }), 0);
        });
    };
    var Qj = function Qj(a) {
        var b;
        return z(function(c) {
            if (1 == c.h) return w(c, Oj(a), 2);
            b = c.i;
            return w(c, b.clear("SWHealthLog"), 0);
        });
    };
    var Uj = function Uj(a) {
        var b = void 0 === b ? "" : b;
        if (a) {
            if (b) Qg(a, void 0, "POST", b, void 0);
            else if (L("USE_NET_AJAX_FOR_PING_TRANSPORT", !1)) Qg(a, void 0, "GET", "", void 0);
            else {
                b: {
                    try {
                        var c = new Va({
                            url: a
                        });
                        if (c.j && c.i || c.l) {
                            var d = Bb(a.match(Ab)[5] || null);
                            var e = !(!d || !d.endsWith("/aclk") || "1" !== Hb(a, "ri"));
                            break b;
                        }
                    } catch (g) {}
                    e = !1;
                }
                if (e) {
                    b: {
                        try {
                            if (window.navigator && window.navigator.sendBeacon && window.navigator.sendBeacon(a, "")) {
                                var f = !0;
                                break b;
                            }
                        } catch (g) {}
                        f = !1;
                    }
                    b = f ? !0 : !1;
                } else b = !1;
                b || Vj(a);
            }
        }
    };
    var Vj = function Vj(a) {
        var b = new Image(), c = "" + Sj++;
        Rj[c] = b;
        b.onload = b.onerror = function() {
            delete Rj[c];
        };
        b.src = a;
    };
    var Y = function Y() {
        this.h = new Map();
        this.i = !1;
    };
    var Wj = function Wj() {
        if (!Y.h) {
            var a = C("yt.networkRequestMonitor.instance") || new Y();
            D("yt.networkRequestMonitor.instance", a);
            Y.h = a;
        }
        return Y.h;
    };
    var Yj = function Yj() {
        Xj || (Xj = new Uh("yt.offline"));
        return Xj;
    };
    var Zj = function Zj(a) {
        if (N("offline_error_handling")) {
            var b = Yj().get("errors", !0) || {};
            b[a.message] = {
                name: a.name,
                stack: a.stack
            };
            a.level && (b[a.message].level = a.level);
            Yj().set("errors", b, 2592e3, !0);
        }
    };
    var ak = function ak() {
        if (N("offline_error_handling")) {
            var a = Yj().get("errors", !0);
            if (a) {
                for(var b in a)if (a[b]) {
                    var c = new Zg(b, "sent via offline_errors");
                    c.name = a[b].name;
                    c.stack = a[b].stack;
                    c.level = a[b].level;
                    Xf(c);
                }
                Yj().set("errors", {}, 2592e3, !0);
            }
        }
    };
    var Z = function Z() {
        J.call(this);
        this.O = 0;
        this.ka = this.m = !1;
        this.j = this.ya();
        N("use_shared_nsm") ? (Pd.h || (Pd.h = new Pd(Dg)), this.i = Pd.h) : (ck(this), dk(this));
    };
    var ek = function ek() {
        if (!Z.h) {
            var a = C("yt.networkStatusManager.instance") || new Z();
            D("yt.networkStatusManager.instance", a);
            Z.h = a;
        }
        return Z.h;
    };
    var dk = function dk(a) {
        window.addEventListener("online", function() {
            return z(function(b) {
                if (1 == b.h) return w(b, a.T(), 2);
                a.ka && ak();
                b.h = 0;
            });
        });
    };
    var ck = function ck(a) {
        window.addEventListener("offline", function() {
            return z(function(b) {
                return w(b, a.T(), 0);
            });
        });
    };
    var gk = function gk(a) {
        a = void 0 === a ? {} : a;
        J.call(this);
        var b = this;
        this.j = this.O = 0;
        this.m = "ytnetworkstatus-offline";
        this.u = "ytnetworkstatus-online";
        N("use_shared_nsm") && (this.m = "networkstatus-offline", this.u = "networkstatus-online");
        this.i = ek();
        var c = C("yt.networkStatusManager.instance.monitorNetworkStatusChange").bind(this.i);
        c && c(a.La);
        a.qa && !N("use_shared_nsm") && (c = C("yt.networkStatusManager.instance.enableErrorFlushing").bind(this.i)) && c();
        if (c = C("yt.networkStatusManager.instance.listen").bind(this.i)) a.ta ? (this.ta = a.ta, c(this.u, function() {
            hk(b, "publicytnetworkstatus-online");
            N("use_shared_nsm") && a.qa && ak();
        }), c(this.m, function() {
            hk(b, "publicytnetworkstatus-offline");
        })) : (c(this.u, function() {
            Nd(b, "publicytnetworkstatus-online");
            N("use_shared_nsm") && a.qa && ak();
        }), c(this.m, function() {
            Nd(b, "publicytnetworkstatus-offline");
        }));
    };
    var hk = function hk(a, b) {
        a.ta ? a.j ? (Dg.W(a.O), a.O = Dg.L(function() {
            a.A !== b && (Nd(a, b), a.A = b, a.j = Q());
        }, a.ta - (Q() - a.j))) : (Nd(a, b), a.A = b, a.j = Q()) : Nd(a, b);
    };
    var jk = function jk() {
        pj.call(this, {
            D: {
                hb: Kj,
                aa: Jj,
                Na: Gj,
                ob: Hj,
                Fa: Ij,
                set: Ej
            },
            G: kk(),
            handleError: Xf,
            ba: Yf,
            S: lk,
            now: Q,
            ab: Zj,
            K: Cg(),
            Ea: "publicytnetworkstatus-online",
            Da: "publicytnetworkstatus-offline",
            oa: !0,
            na: 0.1,
            sa: sg("potential_esf_error_limit", 10),
            B: N,
            ea: !(gi() && (N("embeds_web_nwl_disable_nocookie") ? "www.youtube-nocookie.com" !== Cb(document.location.toString()) : 1))
        });
        this.j = new Ce();
        N("networkless_immediately_drop_all_requests") && Lj();
        oj("LogsDatabaseV2");
    };
    var mk = function mk() {
        var a = C("yt.networklessRequestController.instance");
        a || (a = new jk(), D("yt.networklessRequestController.instance", a), N("networkless_logging") && gj().then(function(b) {
            a.s = b;
            qj(a);
            a.j.resolve();
            a.oa && Math.random() <= a.na && a.s && Pj(a.s);
            N("networkless_immediately_drop_sw_health_store") && nk(a);
        }));
        return a;
    };
    var nk = function nk(a) {
        var b;
        z(function(c) {
            if (!a.s) throw b = ri("clearSWHealthLogsDb"), b;
            return c.return(Qj(a.s).catch(function(d) {
                a.handleError(d);
            }));
        });
    };
    var lk = function lk(a, b, c) {
        N("use_cfr_monitor") && ok(a, b);
        var d;
        if (null === (d = b.postParams) || void 0 === d ? 0 : d.requestTimeMs) b.postParams.requestTimeMs = Math.round(Q());
        c && 0 === Object.keys(b).length ? Uj(a) : Ng(a, b);
    };
    var kk = function kk() {
        ik || (ik = new gk({
            qa: !0,
            La: !0
        }));
        return ik;
    };
    var ok = function ok(a, b) {
        var c = b.onError ? b.onError : function c() {};
        b.onError = function(e, f) {
            Wj().requestComplete(a, !1);
            c(e, f);
        };
        var d = b.onSuccess ? b.onSuccess : function d() {};
        b.onSuccess = function(e, f) {
            Wj().requestComplete(a, !0);
            d(e, f);
        };
    };
    var tk = function tk(a, b) {
        function c(d) {
            var e = uk().F();
            if (!vk() || !d || e && N("vss_networkless_bypass_write")) wk(a, b);
            else {
                var f = {
                    url: a,
                    options: b,
                    timestamp: Q(),
                    status: "NEW",
                    sendCount: 0
                };
                Ej(f, d).then(function(g) {
                    f.id = g;
                    uk().F() && xk(f);
                }).catch(function(g) {
                    xk(f);
                    uk().F() ? Xf(g) : Zj(g);
                });
            }
        }
        b = void 0 === b ? {} : b;
        N("skip_is_supported_killswitch") ? gj().then(function(d) {
            c(d);
        }) : c(fj());
    };
    var yk = function yk(a, b) {
        function c(d) {
            if (vk() && d) {
                var e = {
                    url: a,
                    options: b,
                    timestamp: Q(),
                    status: "NEW",
                    sendCount: 0
                }, f = !1, g = b.onSuccess ? b.onSuccess : function g() {};
                e.options.onSuccess = function(k, l) {
                    N("use_cfr_monitor") && Wj().requestComplete(e.url, !0);
                    void 0 !== e.id ? Jj(e.id, d) : f = !0;
                    N("vss_network_hint") && uk().P(!0);
                    g(k, l);
                };
                if (N("use_cfr_monitor")) {
                    var h = b.onError ? b.onError : function h() {};
                    e.options.onError = function(k, l) {
                        Wj().requestComplete(e.url, !1);
                        h(k, l);
                    };
                }
                wk(e.url, e.options);
                Ej(e, d).then(function(k) {
                    e.id = k;
                    f && Jj(e.id, d);
                }).catch(function(k) {
                    uk().F() ? Xf(k) : Zj(k);
                });
            } else wk(a, b);
        }
        b = void 0 === b ? {} : b;
        N("skip_is_supported_killswitch") ? gj().then(function(d) {
            c(d);
        }) : c(fj());
    };
    var xk = function xk(a) {
        var b, c, d;
        return z(function(e) {
            switch(e.h){
                case 1:
                    b = fj();
                    if (!b) throw c = ri("immediateSend"), c;
                    if (void 0 === a.id) {
                        e.o(2);
                        break;
                    }
                    return w(e, Hj(a.id, b), 3);
                case 3:
                    (d = e.i) ? a = d : Yf(Error("The request cannot be found in the database."));
                case 2:
                    var f = a.timestamp;
                    if (!(2592e6 <= Q() - f)) {
                        e.o(4);
                        break;
                    }
                    Yf(Error("Networkless Logging: Stored logs request expired age limit"));
                    if (void 0 === a.id) {
                        e.o(5);
                        break;
                    }
                    return w(e, Jj(a.id, b), 5);
                case 5:
                    return e.return();
                case 4:
                    a.skipRetry || (a = Ak(a));
                    f = a;
                    var g, h;
                    if (null === (h = null === (g = null === f || void 0 === f ? void 0 : f.options) || void 0 === g ? void 0 : g.postParams) || void 0 === h ? 0 : h.requestTimeMs) f.options.postParams.requestTimeMs = Math.round(Q());
                    a = f;
                    if (!a) {
                        e.o(0);
                        break;
                    }
                    if (!a.skipRetry || void 0 === a.id) {
                        e.o(8);
                        break;
                    }
                    return w(e, Jj(a.id, b), 8);
                case 8:
                    wk(a.url, a.options, !!a.skipRetry), e.h = 0;
            }
        });
    };
    var Ak = function Ak(a) {
        var b = fj();
        if (!b) throw ri("updateRequestHandlers");
        var c = a.options.onError ? a.options.onError : function c() {};
        a.options.onError = function(e, f) {
            var g;
            return z(function(h) {
                switch(h.h){
                    case 1:
                        N("use_cfr_monitor") && Wj().requestComplete(a.url, !1);
                        g = wj(f);
                        if (!(N("nwl_consider_error_code") && g || !N("nwl_consider_error_code") && Bk() <= sg("potential_esf_error_limit", 10))) {
                            h.o(2);
                            break;
                        }
                        if (N("skip_checking_network_on_cfr_failure") && (!N("skip_checking_network_on_cfr_failure") || Wj().isEndpointCFR(a.url))) {
                            h.o(3);
                            break;
                        }
                        return w(h, uk().T(), 3);
                    case 3:
                        if (uk().F()) {
                            h.o(2);
                            break;
                        }
                        c(e, f);
                        if (!N("nwl_consider_error_code") || void 0 === (null === a || void 0 === a ? void 0 : a.id)) {
                            h.o(6);
                            break;
                        }
                        return w(h, Ij(a.id, b, !1), 6);
                    case 6:
                        return h.return();
                    case 2:
                        if (N("nwl_consider_error_code") && !g && Bk() > sg("potential_esf_error_limit", 10)) return h.return();
                        C("ytNetworklessLoggingInitializationOptions") && sk.potentialEsfErrorCounter++;
                        qk++;
                        if (void 0 === (null === a || void 0 === a ? void 0 : a.id)) {
                            h.o(8);
                            break;
                        }
                        return 1 > a.sendCount ? w(h, Ij(a.id, b), 12) : w(h, Jj(a.id, b), 8);
                    case 12:
                        Dg.L(function() {
                            uk().F() && zk();
                        }, 5e3);
                    case 8:
                        c(e, f), h.h = 0;
                }
            });
        };
        var d = a.options.onSuccess ? a.options.onSuccess : function d() {};
        a.options.onSuccess = function(e, f) {
            return z(function(g) {
                if (1 == g.h) return N("use_cfr_monitor") && Wj().requestComplete(a.url, !0), void 0 === (null === a || void 0 === a ? void 0 : a.id) ? g.o(2) : w(g, Jj(a.id, b), 2);
                N("vss_network_hint") && uk().P(!0);
                d(e, f);
                g.h = 0;
            });
        };
        return a;
    };
    var uk = function uk() {
        if (N("use_new_nwl")) return kk();
        rk || (rk = new gk({
            qa: !0,
            La: !0
        }));
        return rk;
    };
    var wk = function wk(a, b, c) {
        c && 0 === Object.keys(b).length ? Uj(a) : Ng(a, b);
    };
    var vk = function vk() {
        return C("ytNetworklessLoggingInitializationOptions") ? sk.isNwlInitialized : !1;
    };
    var Bk = function Bk() {
        return C("ytNetworklessLoggingInitializationOptions") ? sk.potentialEsfErrorCounter : qk;
    };
    var Ck = function Ck(a) {
        var b = this;
        this.config_ = null;
        a ? this.config_ = a : Mh() && (this.config_ = th());
        yg(function() {
            Zh(b);
        }, 5e3);
    };
    var xh = function xh(a, b, c, d) {
        function e(x) {
            x = void 0 === x ? !1 : x;
            var y;
            if (d.retry && "www.youtube-nocookie.com" != h && (x || N("skip_ls_gel_retry") || "application/json" !== g.headers["Content-Type"] || (y = Xh(b, c, l, k)), y)) {
                var A = g.onSuccess, M = g.onFetchSuccess;
                g.onSuccess = function(O, P) {
                    Yh(y);
                    A(O, P);
                };
                c.onFetchSuccess = function(O, P) {
                    Yh(y);
                    M(O, P);
                };
            }
            try {
                x && d.retry && !d.Sa.bypassNetworkless ? (g.method = "POST", d.Sa.writeThenSend ? N("use_new_nwl_wts") ? mk().writeThenSend(q, g) : tk(q, g) : N("use_new_nwl_saw") ? mk().sendAndWrite(q, g) : yk(q, g)) : (g.method = "POST", g.postParams || (g.postParams = {}), Ng(q, g));
            } catch (O) {
                if ("InvalidAccessError" == O.name) y && (Yh(y), y = 0), Yf(Error("An extension is blocking network request."));
                else throw O;
            }
            y && yg(function() {
                Zh(a);
            }, 5e3);
        }
        !L("VISITOR_DATA") && "visitor_id" !== b && 0.01 > Math.random() && Yf(new Zg("Missing VISITOR_DATA when sending innertube request.", b, c, d));
        if (!a.isReady()) {
            var f = new Zg("innertube xhrclient not ready", b, c, d);
            Xf(f);
            throw f;
        }
        var g = {
            headers: d.headers || {},
            method: "POST",
            postParams: c,
            postBody: d.postBody,
            postBodyFormat: d.postBodyFormat || "JSON",
            onTimeout: function onTimeout() {
                d.onTimeout();
            },
            onFetchTimeout: d.onTimeout,
            onSuccess: function onSuccess(x, y) {
                if (d.onSuccess) d.onSuccess(y);
            },
            onFetchSuccess: function onFetchSuccess(x) {
                if (d.onSuccess) d.onSuccess(x);
            },
            onError: function onError(x, y) {
                if (d.onError) d.onError(y);
            },
            onFetchError: function onFetchError(x) {
                if (d.onError) d.onError(x);
            },
            timeout: d.timeout,
            withCredentials: !0
        };
        g.headers["Content-Type"] || (g.headers["Content-Type"] = "application/json");
        var h = "";
        (f = a.config_.lb) && (h = f);
        var k = a.config_.nb || !1, l = Sh(k, h, d);
        Object.assign(g.headers, l);
        (f = g.headers.Authorization) && !h && (g.headers["x-origin"] = window.location.origin);
        var m = "/youtubei/" + a.config_.innertubeApiVersion + "/" + b, p = {
            alt: "json"
        }, t = a.config_.mb && f;
        t = t && f.startsWith("Bearer");
        t || (p.key = a.config_.innertubeApiKey);
        var q = pg("" + h + m, p || {}, !0);
        N("use_new_nwl") && mk().h || !N("use_new_nwl") && vk() ? ej().then(function(x) {
            e(x);
        }) : e(!1);
    };
    var Dk = function Dk(a, b) {
        var c = void 0 === c ? {} : c;
        var d = Ck;
        L("ytLoggingEventsDefaultDisabled", !1) && Ck == Ck && (d = null);
        a: {
            c = void 0 === c ? {} : c;
            if (N("lr_drop_other_and_business_payloads")) {
                if (wg[a] || vg[a]) break a;
            } else if (N("lr_drop_other_payloads") && wg[a]) break a;
            var e = {}, f = Math.round(c.timestamp || Q());
            e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
            e[a] = b;
            a = C("_lact", window);
            a = null == a ? -1 : Math.max(Date.now() - a, 0);
            e.context = {
                lastActivityMs: String(c.timestamp || !isFinite(a) ? -1 : a)
            };
            N("log_sequence_info_on_gel_web") && c.Ya && (a = e.context, b = c.Ya, Eh[b] = b in Eh ? Eh[b] + 1 : 0, a.sequence = {
                index: Eh[b],
                groupKey: b
            }, c.Nb && delete Eh[c.Ya]);
            (c.Sb ? ph : lh)({
                endpoint: "log_event",
                payload: e,
                da: c.da,
                xa: c.xa
            }, d);
        }
    };
    var Fk = function Fk(a) {
        if ("JavaException" === a.name) return !0;
        a = a.stack;
        return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://");
    };
    var Hk = function Hk() {
        this.U = [];
        this.V = [];
    };
    var Jk = function Jk() {
        if (!Ik) {
            var a = Ik = new Hk();
            a.V.length = 0;
            a.U.length = 0;
            Gk.V && a.V.push.apply(a.V, Gk.V);
            Gk.U && a.U.push.apply(a.U, Gk.U);
        }
        return Ik;
    };
    var Lk = function Lk(a) {
        function b() {
            return a.charCodeAt(d++);
        }
        var c = a.length, d = 0;
        do {
            var e = Mk(b);
            if (Infinity === e) break;
            var f = e >> 3;
            switch(e & 7){
                case 0:
                    e = Mk(b);
                    if (2 === f) return e;
                    break;
                case 1:
                    if (2 === f) return;
                    d += 8;
                    break;
                case 2:
                    e = Mk(b);
                    if (2 === f) return a.substr(d, e);
                    d += e;
                    break;
                case 5:
                    if (2 === f) return;
                    d += 4;
                    break;
                default:
                    return;
            }
        }while (d < c);
    };
    var Mk = function Mk(a) {
        var b = a(), c = b & 127;
        if (128 > b) return c;
        b = a();
        c |= (b & 127) << 7;
        if (128 > b) return c;
        b = a();
        c |= (b & 127) << 14;
        if (128 > b) return c;
        b = a();
        return 128 > b ? c | (b & 127) << 21 : Infinity;
    };
    var Nk = function Nk(a, b, c, d) {
        if (a) {
            if (Array.isArray(a)) {
                var e = d;
                for(d = 0; d < a.length && !(a[d] && (e += Ok(d, a[d], b, c), 500 < e)); d++);
                d = e;
            } else if ("object" === typeof a) {
                for(e in a)if (a[e]) {
                    var f = a[e];
                    var g = b;
                    var h = c;
                    g = "string" !== typeof f || "clickTrackingParams" !== e && "trackingParams" !== e ? 0 : (f = Lk(atob(f.replace(/-/g, "+").replace(/_/g, "/")))) ? Ok(e + ".ve", f, g, h) : 0;
                    d += g;
                    d += Ok(e, a[e], b, c);
                    if (500 < d) break;
                }
            } else c[b] = Pk(a), d += c[b].length;
        } else c[b] = Pk(a), d += c[b].length;
        return d;
    };
    var Ok = function Ok(a, b, c, d) {
        c += "." + a;
        a = Pk(b);
        d[c] = a;
        return c.length + a.length;
    };
    var Pk = function Pk(a) {
        try {
            return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500);
        } catch (b) {
            return "unable to serialize " + (typeof a === "undefined" ? "undefined" : _typeof(a)) + " (" + b.message + ")";
        }
    };
    var Xk = function Xk(a) {
        return Wk[a] || (Wk[a] = String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase();
        }));
    };
    var al = function al() {
        for(var a = u(Zk), b = a.next(); !b.done; b = a.next())b = b.value, b();
    };
    var bl = function bl(a, b) {
        var c;
        "yt:" === a.tagName.toLowerCase().substr(0, 3) ? c = a.getAttribute(b) : c = a ? a.dataset ? a.dataset[Xk(b)] : a.getAttribute("data-" + b) : null;
        return c;
    };
    var cl = function cl(a) {
        Ue.ca.apply(Ue, arguments);
    };
    var dl = function dl(a) {
        this.h = a || {};
        a = [
            this.h,
            window.YTConfig || {}
        ];
        for(var b = 0; b < a.length; b++)a[b].host && (a[b].host = a[b].host.toString().replace("http://", "https://"));
    };
    var el = function el(a, b) {
        a = [
            a.h,
            window.YTConfig || {}
        ];
        for(var c = 0; c < a.length; c++){
            var d = a[c][b];
            if (void 0 !== d) return d;
        }
        return null;
    };
    var fl = function fl(a, b, c) {
        gl || (gl = {}, fg(window, "message", function(d) {
            a: {
                if (d.origin === el(a, "host")) {
                    try {
                        var e = JSON.parse(d.data);
                    } catch (f) {
                        e = void 0;
                        break a;
                    }
                    if (d = gl[e.id]) d.u = !0, d.u && (F(d.v, d.sendMessage, d), d.v.length = 0), d.Ha(e);
                }
                e = void 0;
            }
            return e;
        }));
        gl[c] = b;
    };
    var hl = function hl(a, b, c) {
        this.m = this.h = this.i = null;
        this.j = 0;
        this.u = !1;
        this.v = [];
        this.l = null;
        this.I = {};
        if (!a) throw Error("YouTube player element ID required.");
        this.id = Na(this);
        this.A = c;
        this.setup(a, b);
    };
    var kl = function kl(a, b) {
        b = b.split(".");
        if (2 === b.length) {
            var c = b[1];
            a.A === b[0] && jl(a, c);
        }
    };
    var ll = function ll(a, b, c) {
        c = c || [];
        c = Array.prototype.slice.call(c);
        b = {
            event: "command",
            func: b,
            args: c
        };
        a.u ? a.sendMessage(b) : a.v.push(b);
    };
    var il = function il(a, b, c) {
        a.l.l || (c = {
            target: a,
            data: c
        }, a.l.ca(b, c), cl(a.A + "." + b, c));
    };
    var ml = function ml(a, b) {
        var c = document.createElement("iframe");
        b = b.attributes;
        for(var d = 0, e = b.length; d < e; d++){
            var f = b[d].value;
            null != f && "" !== f && "null" !== f && c.setAttribute(b[d].name, f);
        }
        c.setAttribute("frameBorder", "0");
        c.setAttribute("allowfullscreen", "1");
        c.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        c.setAttribute("title", "YouTube " + el(a.i, "title"));
        (b = el(a.i, "width")) && c.setAttribute("width", b.toString());
        (b = el(a.i, "height")) && c.setAttribute("height", b.toString());
        var g = a.Ka();
        g.enablejsapi = window.postMessage ? 1 : 0;
        window.location.host && (g.origin = window.location.protocol + "//" + window.location.host);
        g.widgetid = a.id;
        window.location.href && F([
            "debugjs",
            "debugcss"
        ], function(h) {
            var k = Hb(window.location.href, h);
            null !== k && (g[h] = k);
        });
        window.yt_embedsTokenValue && (g.embedsTokenValue = encodeURIComponent(window.yt_embedsTokenValue), delete window.yt_embedsTokenValue);
        c.src = el(a.i, "host") + ("/embed/" + el(a.i, "videoId")) + "?" + Fb(g);
        return c;
    };
    var nl = function nl(a) {
        fl(a.i, a, a.id);
        a.j = hg(a.Ta.bind(a));
        fg(a.h, "load", function() {
            window.clearInterval(a.j);
            a.j = hg(a.Ta.bind(a));
        });
    };
    var jl = function jl(a, b) {
        a.I[b] || (a.I[b] = !0, ll(a, "addEventListener", [
            b
        ]));
    };
    var ol = function ol(a) {
        return (0 === a.search("cue") || 0 === a.search("load")) && "loadModule" !== a;
    };
    var pl = function pl(a) {
        return 0 === a.search("get") || 0 === a.search("is");
    };
    var ql = function ql(a, b) {
        hl.call(this, a, Object.assign({
            title: "video player",
            videoId: "",
            width: 640,
            height: 360
        }, b || {}), "player");
        this.M = {};
        this.playerInfo = {};
    };
    var rl = function rl(a, b) {
        if (Ma(b)) for(var c in b)b.hasOwnProperty(c) && (a.playerInfo[c] = b[c]);
    };
    var sl = function sl(a, b) {
        F(b, function(c) {
            this[c] || ("getCurrentTime" === c ? this[c] = function() {
                var d = this.playerInfo.currentTime;
                if (1 === this.playerInfo.playerState) {
                    var e = (Date.now() / 1e3 - this.playerInfo.currentTimeLastUpdated_) * this.playerInfo.playbackRate;
                    0 < e && (d += Math.min(e, 1));
                }
                return d;
            } : ol(c) ? this[c] = function() {
                this.playerInfo = {};
                this.M = {};
                ll(this, c, arguments);
                return this;
            } : pl(c) ? this[c] = function() {
                var d = 0;
                0 === c.search("get") ? d = 3 : 0 === c.search("is") && (d = 2);
                return this.playerInfo[c.charAt(d).toLowerCase() + c.substr(d + 1)];
            } : this[c] = function() {
                ll(this, c, arguments);
                return this;
            });
        }, a);
    };
    var tl = function tl(a) {
        if ("iframe" !== a.tagName.toLowerCase()) {
            var b = bl(a, "videoid");
            b && (b = {
                videoId: b,
                width: bl(a, "width"),
                height: bl(a, "height")
            }, new ql(a, b));
        }
    };
    var n;
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function ba(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a;
    };
    var da = ca(this);
    r("Symbol", function(a) {
        var c = function c(f, g) {
            this.h = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            });
        };
        function b(f) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++, f);
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.h;
        };
        var d = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", e = 0;
        return b;
    });
    r("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for(var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++){
            var d = da[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function value() {
                    return ea(aa(this));
                }
            });
        }
        return a;
    });
    var ha = "function" == typeof Object.create ? Object.create : function ha(a) {
        var b = function b() {};
        b.prototype = a;
        return new b();
    }, ia;
    if ("function" == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf;
    else {
        var ja;
        a: {
            var ma = {
                a: !0
            }, na = {};
            try {
                na.__proto__ = ma;
                ja = na.a;
                break a;
            } catch (a) {}
            ja = !1;
        }
        ia = ja ? function ia(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a;
        } : null;
    }
    var oa = ia;
    pa.prototype.A = function(a) {
        this.i = a;
    };
    pa.prototype.return = function(a) {
        this.j = {
            return: a
        };
        this.h = this.m;
    };
    pa.prototype.o = function(a) {
        this.h = a;
    };
    r("Reflect.setPrototypeOf", function(a) {
        return a ? a : oa ? function(b, c) {
            try {
                return oa(b, c), !0;
            } catch (d) {
                return !1;
            }
        } : null;
    });
    r("Promise", function(a) {
        var b = function b(g) {
            this.h = 0;
            this.j = void 0;
            this.i = [];
            this.u = !1;
            var h = this.l();
            try {
                g(h.resolve, h.reject);
            } catch (k) {
                h.reject(k);
            }
        };
        var c = function c() {
            this.h = null;
        };
        var d = function d(g) {
            return g instanceof b ? g : new b(function(h) {
                h(g);
            });
        };
        if (a) return a;
        c.prototype.i = function(g) {
            if (null == this.h) {
                this.h = [];
                var h = this;
                this.j(function() {
                    h.m();
                });
            }
            this.h.push(g);
        };
        var e = da.setTimeout;
        c.prototype.j = function(g) {
            e(g, 0);
        };
        c.prototype.m = function() {
            for(; this.h && this.h.length;){
                var g = this.h;
                this.h = [];
                for(var h = 0; h < g.length; ++h){
                    var k = g[h];
                    g[h] = null;
                    try {
                        k();
                    } catch (l) {
                        this.l(l);
                    }
                }
            }
            this.h = null;
        };
        c.prototype.l = function(g) {
            this.j(function() {
                throw g;
            });
        };
        b.prototype.l = function() {
            var g = function g(l) {
                return function(m) {
                    k || (k = !0, l.call(h, m));
                };
            };
            var h = this, k = !1;
            return {
                resolve: g(this.va),
                reject: g(this.m)
            };
        };
        b.prototype.va = function(g) {
            if (g === this) this.m(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof b) this.cb(g);
            else {
                a: switch(typeof g === "undefined" ? "undefined" : _typeof(g)){
                    case "object":
                        var h = null != g;
                        break a;
                    case "function":
                        h = !0;
                        break a;
                    default:
                        h = !1;
                }
                h ? this.ka(g) : this.v(g);
            }
        };
        b.prototype.ka = function(g) {
            var h = void 0;
            try {
                h = g.then;
            } catch (k) {
                this.m(k);
                return;
            }
            "function" == typeof h ? this.eb(h, g) : this.v(g);
        };
        b.prototype.m = function(g) {
            this.A(2, g);
        };
        b.prototype.v = function(g) {
            this.A(1, g);
        };
        b.prototype.A = function(g, h) {
            if (0 != this.h) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.h);
            this.h = g;
            this.j = h;
            2 === this.h && this.bb();
            this.I();
        };
        b.prototype.bb = function() {
            var g = this;
            e(function() {
                if (g.O()) {
                    var h = da.console;
                    "undefined" !== typeof h && h.error(g.j);
                }
            }, 1);
        };
        b.prototype.O = function() {
            if (this.u) return !1;
            var g = da.CustomEvent, h = da.Event, k = da.dispatchEvent;
            if ("undefined" === typeof k) return !0;
            "function" === typeof g ? g = new g("unhandledrejection", {
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection", {
                cancelable: !0
            }) : (g = da.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.j;
            return k(g);
        };
        b.prototype.I = function() {
            if (null != this.i) {
                for(var g = 0; g < this.i.length; ++g)f.i(this.i[g]);
                this.i = null;
            }
        };
        var f = new c();
        b.prototype.cb = function(g) {
            var h = this.l();
            g.ma(h.resolve, h.reject);
        };
        b.prototype.eb = function(g, h) {
            var k = this.l();
            try {
                g.call(h, k.resolve, k.reject);
            } catch (l) {
                k.reject(l);
            }
        };
        b.prototype.then = function(g, h) {
            var k = function k(t, q) {
                return "function" == typeof t ? function(x) {
                    try {
                        l(t(x));
                    } catch (y) {
                        m(y);
                    }
                } : q;
            };
            var l, m, p = new b(function(t, q) {
                l = t;
                m = q;
            });
            this.ma(k(g, l), k(h, m));
            return p;
        };
        b.prototype.catch = function(g) {
            return this.then(void 0, g);
        };
        b.prototype.ma = function(g, h) {
            var k = function k() {
                switch(l.h){
                    case 1:
                        g(l.j);
                        break;
                    case 2:
                        h(l.j);
                        break;
                    default:
                        throw Error("Unexpected state: " + l.h);
                }
            };
            var l = this;
            null == this.i ? f.i(k) : this.i.push(k);
            this.u = !0;
        };
        b.resolve = d;
        b.reject = function(g) {
            return new b(function(h, k) {
                k(g);
            });
        };
        b.race = function(g) {
            return new b(function(h, k) {
                for(var l = u(g), m = l.next(); !m.done; m = l.next())d(m.value).ma(h, k);
            });
        };
        b.all = function(g) {
            var h = u(g), k = h.next();
            return k.done ? d([]) : new b(function(l, m) {
                var p = function p(x) {
                    return function(y) {
                        t[x] = y;
                        q--;
                        0 == q && l(t);
                    };
                };
                var t = [], q = 0;
                do t.push(void 0), q++, d(k.value).ma(p(t.length - 1), m), k = h.next();
                while (!k.done);
            });
        };
        return b;
    });
    r("WeakMap", function(a) {
        var b = function b(k) {
            this.h = (h += Math.random() + 1).toString();
            if (k) {
                k = u(k);
                for(var l; !(l = k.next()).done;)l = l.value, this.set(l[0], l[1]);
            }
        };
        var c = function c() {};
        var d = function d(k) {
            var l = typeof k === "undefined" ? "undefined" : _typeof(k);
            return "object" === l && null !== k || "function" === l;
        };
        var e = function e(k) {
            if (!Ga(k, g)) {
                var l = new c();
                ba(k, g, {
                    value: l
                });
            }
        };
        var f = function f(k) {
            var l = Object[k];
            l && (Object[k] = function(m) {
                if (m instanceof c) return m;
                Object.isExtensible(m) && e(m);
                return l(m);
            });
        };
        if (function() {
            if (!a || !Object.seal) return !1;
            try {
                var k = Object.seal({}), l = Object.seal({}), m = new a([
                    [
                        k,
                        2
                    ],
                    [
                        l,
                        3
                    ]
                ]);
                if (2 != m.get(k) || 3 != m.get(l)) return !1;
                m.delete(k);
                m.set(l, 4);
                return !m.has(k) && 4 == m.get(l);
            } catch (p) {
                return !1;
            }
        }()) return a;
        var g = "$jscomp_hidden_" + Math.random();
        f("freeze");
        f("preventExtensions");
        f("seal");
        var h = 0;
        b.prototype.set = function(k, l) {
            if (!d(k)) throw Error("Invalid WeakMap key");
            e(k);
            if (!Ga(k, g)) throw Error("WeakMap key fail: " + k);
            k[g][this.h] = l;
            return this;
        };
        b.prototype.get = function(k) {
            return d(k) && Ga(k, g) ? k[g][this.h] : void 0;
        };
        b.prototype.has = function(k) {
            return d(k) && Ga(k, g) && Ga(k[g], this.h);
        };
        b.prototype.delete = function(k) {
            return d(k) && Ga(k, g) && Ga(k[g], this.h) ? delete k[g][this.h] : !1;
        };
        return b;
    });
    r("Map", function(a) {
        var b = function b() {
            var h = {};
            return h.previous = h.next = h.head = h;
        };
        var c = function c(h, k) {
            var l = h.h;
            return ea(function() {
                if (l) {
                    for(; l.head != h.h;)l = l.previous;
                    for(; l.next != l.head;)return l = l.next, {
                        done: !1,
                        value: k(l)
                    };
                    l = null;
                }
                return {
                    done: !0,
                    value: void 0
                };
            });
        };
        var d = function d(h, k) {
            var l = k && (typeof k === "undefined" ? "undefined" : _typeof(k));
            "object" == l || "function" == l ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
            var m = h.data_[l];
            if (m && Ga(h.data_, l)) for(h = 0; h < m.length; h++){
                var p = m[h];
                if (k !== k && p.key !== p.key || k === p.key) return {
                    id: l,
                    list: m,
                    index: h,
                    entry: p
                };
            }
            return {
                id: l,
                list: m,
                index: -1,
                entry: void 0
            };
        };
        var e = function e(h) {
            this.data_ = {};
            this.h = b();
            this.size = 0;
            if (h) {
                h = u(h);
                for(var k; !(k = h.next()).done;)k = k.value, this.set(k[0], k[1]);
            }
        };
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var h = Object.seal({
                    x: 4
                }), k = new a(u([
                    [
                        h,
                        "s"
                    ]
                ]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || 2 != k.size) return !1;
                var l = k.entries(), m = l.next();
                if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
                m = l.next();
                return m.done || 4 != m.value[0].x || "t" != m.value[1] || !l.next().done ? !1 : !0;
            } catch (p) {
                return !1;
            }
        }()) return a;
        var f = new WeakMap();
        e.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this.data_[l.id] = []);
            l.entry ? l.entry.value = k : (l.entry = {
                next: this.h,
                previous: this.h.previous,
                head: this.h,
                key: h,
                value: k
            }, l.list.push(l.entry), this.h.previous.next = l.entry, this.h.previous = l.entry, this.size++);
            return this;
        };
        e.prototype.delete = function(h) {
            h = d(this, h);
            return h.entry && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.data_[h.id], h.entry.previous.next = h.entry.next, h.entry.next.previous = h.entry.previous, h.entry.head = null, this.size--, !0) : !1;
        };
        e.prototype.clear = function() {
            this.data_ = {};
            this.h = this.h.previous = b();
            this.size = 0;
        };
        e.prototype.has = function(h) {
            return !!d(this, h).entry;
        };
        e.prototype.get = function(h) {
            return (h = d(this, h).entry) && h.value;
        };
        e.prototype.entries = function() {
            return c(this, function(h) {
                return [
                    h.key,
                    h.value
                ];
            });
        };
        e.prototype.keys = function() {
            return c(this, function(h) {
                return h.key;
            });
        };
        e.prototype.values = function() {
            return c(this, function(h) {
                return h.value;
            });
        };
        e.prototype.forEach = function(h, k) {
            for(var l = this.entries(), m; !(m = l.next()).done;)m = m.value, h.call(k, m[1], m[0], this);
        };
        e.prototype[Symbol.iterator] = e.prototype.entries;
        var g = 0;
        return e;
    });
    r("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Ha(this, b, "endsWith");
            b += "";
            void 0 === c && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for(var e = b.length; 0 < e && 0 < c;)if (d[--c] != b[--e]) return !1;
            return 0 >= e;
        };
    });
    r("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for(var e = d.length, f = 0; f < e; f++){
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                        b = g;
                        break a;
                    }
                }
                b = void 0;
            }
            return b;
        };
    });
    r("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Ha(this, b, "startsWith");
            b += "";
            var e = d.length, f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for(var g = 0; g < f && c < e;)if (d[c++] != b[g++]) return !1;
            return g >= f;
        };
    });
    r("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return Ia(this, function(b, c) {
                return [
                    b,
                    c
                ];
            });
        };
    });
    r("Object.setPrototypeOf", function(a) {
        return a || oa;
    });
    var Ja = "function" == typeof Object.assign ? Object.assign : function Ja(a, b) {
        for(var c = 1; c < arguments.length; c++){
            var d = arguments[c];
            if (d) for(var e in d)Ga(d, e) && (a[e] = d[e]);
        }
        return a;
    };
    r("Object.assign", function(a) {
        return a || Ja;
    });
    r("Set", function(a) {
        var b = function b(c) {
            this.h = new Map();
            if (c) {
                c = u(c);
                for(var d; !(d = c.next()).done;)this.add(d.value);
            }
            this.size = this.h.size;
        };
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var c = Object.seal({
                    x: 4
                }), d = new a(u([
                    c
                ]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size) return !1;
                var e = d.entries(), f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done;
            } catch (g) {
                return !1;
            }
        }()) return a;
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.h.set(c, c);
            this.size = this.h.size;
            return this;
        };
        b.prototype.delete = function(c) {
            c = this.h.delete(c);
            this.size = this.h.size;
            return c;
        };
        b.prototype.clear = function() {
            this.h.clear();
            this.size = 0;
        };
        b.prototype.has = function(c) {
            return this.h.has(c);
        };
        b.prototype.entries = function() {
            return this.h.entries();
        };
        b.prototype.values = function() {
            return this.h.values();
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.h.forEach(function(f) {
                return c.call(d, f, f, e);
            });
        };
        return b;
    });
    r("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for(d in b)Ga(b, d) && c.push([
                d,
                b[d]
            ]);
            return c;
        };
    });
    r("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Ia(this, function(b) {
                return b;
            });
        };
    });
    r("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Ia(this, function(b, c) {
                return c;
            });
        };
    });
    r("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function c(h) {
                return h;
            };
            var e = [], f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for(var g = 0; !(f = b.next()).done;)e.push(c.call(d, f.value, g++));
            } else for(f = b.length, g = 0; g < f; g++)e.push(c.call(d, b[g], g));
            return e;
        };
    });
    r("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b);
        };
    });
    r("Number.MAX_SAFE_INTEGER", function() {
        return 9007199254740991;
    });
    r("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
    });
    r("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for(0 > c && (c = Math.max(c + e, 0)); c < e; c++){
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0;
            }
            return !1;
        };
    });
    r("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== Ha(this, b, "includes").indexOf(b, c || 0);
        };
    });
    var B = this || self;
    var Oa = "closure_uid_" + (1e9 * Math.random() >>> 0), Pa = 0;
    function Sa(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Sa = Qa : Sa = Ra;
        return Sa.apply(null, arguments);
    }
    function Ua(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Ua);
        else {
            var c = Error().stack;
            c && (this.stack = c);
        }
        a && (this.message = String(a));
        void 0 !== b && (this.gb = b);
    }
    E(Ua, Error);
    Ua.prototype.name = "CustomError";
    var Xa = Array.prototype.indexOf ? function Xa(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0);
    } : function(a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for(var c = 0; c < a.length; c++)if (c in a && a[c] === b) return c;
        return -1;
    }, F = Array.prototype.forEach ? function F(a, b, c) {
        Array.prototype.forEach.call(a, b, c);
    } : function(a, b, c) {
        for(var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a);
    }, Ya = Array.prototype.reduce ? function Ya(a, b, c) {
        return Array.prototype.reduce.call(a, b, c);
    } : function(a, b, c) {
        var d = c;
        F(a, function(e, f) {
            d = b.call(void 0, d, e, f, a);
        });
        return d;
    };
    function gb(a) {
        if (!a || "object" !== typeof a) return a;
        if ("function" === typeof a.clone) return a.clone();
        if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
        if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
        var b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length), c;
        for(c in a)b[c] = gb(a[c]);
        return b;
    }
    var hb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    var jb;
    var nb = {};
    lb("");
    var ob = String.prototype.trim ? function ob(a) {
        return a.trim();
    } : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
    }, pb = /&/g, qb = /</g, rb = />/g, sb = /"/g, tb = /'/g, ub = /\x00/g, vb = /[\x00&<>"']/;
    var yb = {};
    zb.prototype.toString = function() {
        return this.h.toString();
    };
    var Ab = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function Eb(a, b, c) {
        if (Array.isArray(b)) for(var d = 0; d < b.length; d++)Eb(a, String(b[d]), c);
        else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))));
    }
    var Gb = /#|$/;
    function Jb(a) {
        Jb[" "](a);
        return a;
    }
    Jb[" "] = Ka;
    var Kb = G("Opera"), Lb = G("Trident") || G("MSIE"), Mb = G("Edge"), Nb = G("Gecko") && !(-1 != wb().toLowerCase().indexOf("webkit") && !G("Edge")) && !(G("Trident") || G("MSIE")) && !G("Edge"), Ob = -1 != wb().toLowerCase().indexOf("webkit") && !G("Edge");
    var Rb;
    a: {
        var Sb = "", Tb = function() {
            var a = wb();
            if (Nb) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Mb) return /Edge\/([\d\.]+)/.exec(a);
            if (Lb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Ob) return /WebKit\/(\S+)/.exec(a);
            if (Kb) return /(?:Version)[ \/]?(\S+)/.exec(a);
        }();
        Tb && (Sb = Tb ? Tb[1] : "");
        if (Lb) {
            var Ub = Pb();
            if (null != Ub && Ub > parseFloat(Sb)) {
                Rb = String(Ub);
                break a;
            }
        }
        Rb = Sb;
    }
    var Vb = Rb, Wb;
    if (B.document && Lb) {
        var Xb = Pb();
        Wb = Xb ? Xb : parseInt(Vb, 10) || void 0;
    } else Wb = void 0;
    var Yb = Wb;
    var Zb = Ib() || G("iPod"), $b = G("iPad");
    !G("Android") || xb();
    xb();
    var ac = G("Safari") && !(xb() || G("Coast") || G("Opera") || G("Edge") || G("Edg/") || G("OPR") || G("Firefox") || G("FxiOS") || G("Silk") || G("Android")) && !(Ib() || G("iPad") || G("iPod"));
    var bc = {}, cc = null;
    var ec = "function" === typeof Uint8Array;
    var fc = "function" === typeof Symbol && "symbol" === _typeof(Symbol()) ? Symbol(void 0) : void 0;
    var mc, nc = Object.freeze(ic([]));
    var pc = "undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance;
    function Cc(a, b) {
        if (null != a) {
            if (Array.isArray(a)) a = Bc(a, b);
            else if (lc(a)) {
                var c = {}, d;
                for(d in a)c[d] = Cc(a[d], b);
                a = c;
            } else a = b(a);
            return a;
        }
    }
    function Dc(a) {
        if (a && "object" == typeof a && a.toJSON) return a.toJSON();
        a = yc(a);
        return Array.isArray(a) ? zc(a, Dc) : a;
    }
    Ec.prototype.toJSON = function() {
        var a = this.C;
        return mc ? a : zc(a, Dc);
    };
    Ec.prototype.clone = function() {
        var a = zc(this.C);
        Fc = a;
        a = new this.constructor(a);
        Fc = null;
        Gc(a, this);
        return a;
    };
    Ec.prototype.toString = function() {
        return this.C.toString();
    };
    function Gc(a, b) {
        b.m && (a.m = b.m.slice());
        var c = b.h;
        if (c) {
            b = b.i;
            for(var d in c){
                var e = c[d];
                if (e) {
                    var f = !(!b || !b[d]), g = +d;
                    if (Array.isArray(e)) {
                        if (e.length) for(f = vc(a, e[0].constructor, g, f), g = 0; g < Math.min(f.length, e.length); g++)Gc(f[g], e[g]);
                    } else (f = uc(a, e.constructor, g, void 0, f)) && Gc(f, e);
                }
            }
        }
    }
    var Fc;
    v(Ic, Ec);
    pc && Jc();
    v(I, Ic);
    pc && Mc();
    var Nc = window;
    lb("csi.gstatic.com");
    lb("googleads.g.doubleclick.net");
    lb("partner.googleadservices.com");
    lb("pubads.g.doubleclick.net");
    lb("securepubads.g.doubleclick.net");
    lb("tpc.googlesyndication.com"); /*

 SPDX-License-Identifier: Apache-2.0
*/ 
    n = Oc.prototype;
    n.clone = function() {
        return new Oc(this.width, this.height);
    };
    n.aspectRatio = function() {
        return this.width / this.height;
    };
    n.isEmpty = function() {
        return !(this.width * this.height);
    };
    n.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    n.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    n.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    n.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this;
    };
    var Sc = {
        tb: "allow-forms",
        ub: "allow-modals",
        vb: "allow-orientation-lock",
        wb: "allow-pointer-lock",
        xb: "allow-popups",
        yb: "allow-popups-to-escape-sandbox",
        zb: "allow-presentation",
        Ab: "allow-same-origin",
        Bb: "allow-scripts",
        Cb: "allow-top-navigation",
        Db: "allow-top-navigation-by-user-activation"
    }, Uc = Wa(function() {
        return Tc();
    });
    var Xc = new Date().getTime();
    var cd = {};
    n = dd.prototype;
    n.isEnabled = function() {
        if (!B.navigator.cookieEnabled) return !1;
        if (!this.isEmpty()) return !0;
        this.set("TESTCOOKIESENABLED", "1", {
            Ba: 60
        });
        if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
        this.remove("TESTCOOKIESENABLED");
        return !0;
    };
    n.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.Rb;
            d = c.secure || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var h = c.Ba;
        }
        if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
        void 0 === h && (h = -1);
        c = f ? ";domain=" + f : "";
        g = g ? ";path=" + g : "";
        d = d ? ";secure" : "";
        h = 0 > h ? "" : 0 == h ? ";expires=" + new Date(1970, 1, 1).toUTCString() : ";expires=" + new Date(Date.now() + 1e3 * h).toUTCString();
        this.h.cookie = a + "=" + b + c + g + h + d + (null != e ? ";samesite=" + e : "");
    };
    n.get = function(a, b) {
        for(var c = a + "=", d = (this.h.cookie || "").split(";"), e = 0, f; e < d.length; e++){
            f = ob(d[e]);
            if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
            if (f == a) return "";
        }
        return b;
    };
    n.remove = function(a, b, c) {
        var d = void 0 !== this.get(a);
        this.set(a, "", {
            Ba: 0,
            path: b,
            domain: c
        });
        return d;
    };
    n.isEmpty = function() {
        return !this.h.cookie;
    };
    n.clear = function() {
        for(var a = (this.h.cookie || "").split(";"), b = [], c = [], d, e, f = 0; f < a.length; f++)e = ob(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        for(a = b.length - 1; 0 <= a; a--)this.remove(b[a]);
    };
    var ed = new dd("undefined" == typeof document ? null : document);
    jd.prototype.l = !1;
    jd.prototype.dispose = function() {
        this.l || (this.l = !0, this.fa());
    };
    jd.prototype.fa = function() {
        if (this.v) for(; this.v.length;)this.v.shift()();
    };
    kd.prototype.stopPropagation = function() {
        this.j = !0;
    };
    kd.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
    };
    function md(a, b) {
        b || (b = {});
        b[od(a)] = !0;
        var c = a.stack || "";
        (a = a.gb) && !b[od(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += md(a, b));
        return c;
    }
    var nd = {};
    var pd = function() {
        if (!B.addEventListener || !Object.defineProperty) return !1;
        var a = !1, b = Object.defineProperty({}, "passive", {
            get: function get() {
                a = !0;
            }
        });
        try {
            B.addEventListener("test", Ka, b), B.removeEventListener("test", Ka, b);
        } catch (c) {}
        return a;
    }();
    E(qd, kd);
    var rd = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    qd.prototype.init = function(a, b) {
        var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.h = b;
        if (b = a.relatedTarget) {
            if (Nb) {
                a: {
                    try {
                        Jb(b.nodeName);
                        var e = !0;
                        break a;
                    } catch (f) {}
                    e = !1;
                }
                e || (b = null);
            }
        } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : rd[a.pointerType] || "";
        this.state = a.state;
        this.i = a;
        a.defaultPrevented && qd.N.preventDefault.call(this);
    };
    qd.prototype.stopPropagation = function() {
        qd.N.stopPropagation.call(this);
        this.i.stopPropagation ? this.i.stopPropagation() : this.i.cancelBubble = !0;
    };
    qd.prototype.preventDefault = function() {
        qd.N.preventDefault.call(this);
        var a = this.i;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
    };
    var sd = "closure_listenable_" + (1e6 * Math.random() | 0);
    var td = 0;
    wd.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.listeners[f];
        a || (a = this.listeners[f] = [], this.h++);
        var g = xd(a, b, d, e);
        -1 < g ? (b = a[g], c || (b.la = !1)) : (b = new ud(b, this.src, f, !!d, e), b.la = c, a.push(b));
        return b;
    };
    wd.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.listeners)) return !1;
        var e = this.listeners[a];
        b = xd(e, b, c, d);
        return -1 < b ? (vd(e[b]), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.listeners[a], this.h--), !0) : !1;
    };
    var zd = "closure_lm_" + (1e6 * Math.random() | 0), Ad = {}, Bd = 0;
    function Cd(a, b, c, d, e) {
        if (d && d.once) Dd(a, b, c, d, e);
        else if (Array.isArray(b)) for(var f = 0; f < b.length; f++)Cd(a, b[f], c, d, e);
        else c = Ed(c), a && a[sd] ? a.Y(b, c, Ma(d) ? !!d.capture : !!d, e) : Fd(a, b, c, !1, d, e);
    }
    function Dd(a, b, c, d, e) {
        if (Array.isArray(b)) for(var f = 0; f < b.length; f++)Dd(a, b[f], c, d, e);
        else c = Ed(c), a && a[sd] ? a.h.add(String(b), c, !0, Ma(d) ? !!d.capture : !!d, e) : Fd(a, b, c, !0, d, e);
    }
    function Kd(a, b, c, d, e) {
        if (Array.isArray(b)) for(var f = 0; f < b.length; f++)Kd(a, b[f], c, d, e);
        else (d = Ma(d) ? !!d.capture : !!d, c = Ed(c), a && a[sd]) ? a.h.remove(String(b), c, d, e) : a && (a = Gd(a)) && (b = a.listeners[b.toString()], a = -1, b && (a = xd(b, c, d, e)), (c = -1 < a ? b[a] : null) && Ld(c));
    }
    var Md = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
    E(J, jd);
    J.prototype[sd] = !0;
    J.prototype.addEventListener = function(a, b, c, d) {
        Cd(this, a, b, c, d);
    };
    J.prototype.removeEventListener = function(a, b, c, d) {
        Kd(this, a, b, c, d);
    };
    J.prototype.fa = function() {
        J.N.fa.call(this);
        if (this.h) {
            var a = this.h, b = 0, c;
            for(c in a.listeners){
                for(var d = a.listeners[c], e = 0; e < d.length; e++)++b, vd(d[e]);
                delete a.listeners[c];
                a.h--;
            }
        }
        this.I = null;
    };
    J.prototype.Y = function(a, b, c, d) {
        return this.h.add(String(a), b, !1, c, d);
    };
    v(Pd, J);
    Pd.prototype.dispose = function() {
        window.removeEventListener("offline", this.m);
        window.removeEventListener("online", this.m);
        this.K.W(this.A);
        delete Pd.h;
    };
    Pd.prototype.F = function() {
        return this.i;
    };
    function Rd(a) {
        a.A = a.K.L(function() {
            var b;
            return z(function(c) {
                if (1 == c.h) return a.i ? (null === (b = window.navigator) || void 0 === b ? 0 : b.onLine) ? c.o(3) : w(c, Qd(a), 3) : w(c, Qd(a), 3);
                Rd(a);
                c.h = 0;
            });
        }, 3e4);
    }
    Sd.prototype.set = function(a, b) {
        b = void 0 === b ? !0 : b;
        0 <= a && 52 > a && 0 === a % 1 && this.data_[a] != b && (this.data_[a] = b, this.h = -1);
    };
    Sd.prototype.get = function(a) {
        return !!this.data_[a];
    };
    Ud.prototype.get = function() {
        if (0 < this.i) {
            this.i--;
            var a = this.h;
            this.h = a.next;
            a.next = null;
        } else a = this.j();
        return a;
    };
    var Wd;
    Yd.prototype.add = function(a, b) {
        var c = Zd.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c;
    };
    Yd.prototype.remove = function() {
        var a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a;
    };
    var Zd = new Ud(function() {
        return new $d();
    }, function(a) {
        return a.reset();
    });
    $d.prototype.set = function(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null;
    };
    $d.prototype.reset = function() {
        this.next = this.scope = this.h = null;
    };
    var ce;
    var ee = !1, fe = new Yd();
    he.prototype[Symbol.iterator] = function() {
        return this;
    };
    he.prototype.next = function() {
        var a = this.h.next();
        return {
            value: a.done ? void 0 : this.i.call(void 0, a.value),
            done: a.done
        };
    };
    E(ke, je);
    ke.prototype.reset = function() {
        this.h[0] = 1732584193;
        this.h[1] = 4023233417;
        this.h[2] = 2562383102;
        this.h[3] = 271733878;
        this.h[4] = 3285377520;
        this.l = this.i = 0;
    };
    ke.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for(var c = b - this.blockSize, d = 0, e = this.m, f = this.i; d < b;){
                if (0 == f) for(; d <= c;)le(this, a, d), d += this.blockSize;
                if ("string" === typeof a) {
                    for(; d < b;)if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.blockSize) {
                        le(this, e);
                        f = 0;
                        break;
                    }
                } else for(; d < b;)if (e[f] = a[d], ++f, ++d, f == this.blockSize) {
                    le(this, e);
                    f = 0;
                    break;
                }
            }
            this.i = f;
            this.l += b;
        }
    };
    ke.prototype.digest = function() {
        var a = [], b = 8 * this.l;
        56 > this.i ? this.update(this.j, 56 - this.i) : this.update(this.j, this.blockSize - (this.i - 56));
        for(var c = this.blockSize - 1; 56 <= c; c--)this.m[c] = b & 255, b /= 256;
        le(this, this.m);
        for(c = b = 0; 5 > c; c++)for(var d = 24; 0 <= d; d -= 8)a[b] = this.h[c] >> d & 255, ++b;
        return a;
    };
    var me = "StopIteration" in B ? B.StopIteration : {
        message: "StopIteration",
        stack: ""
    };
    ne.prototype.R = function() {
        throw me;
    };
    ne.prototype.next = function() {
        return oe;
    };
    var oe = {
        done: !0,
        value: void 0
    };
    ne.prototype.J = function() {
        return this;
    };
    se.prototype.J = function() {
        return new te(this.h());
    };
    se.prototype[Symbol.iterator] = function() {
        return new ue(this.h());
    };
    se.prototype.i = function() {
        return new ue(this.h());
    };
    v(te, ne);
    te.prototype.R = function() {
        var a = this.h.next();
        if (a.done) throw me;
        return a.value;
    };
    te.prototype.next = function() {
        return this.h.next();
    };
    te.prototype[Symbol.iterator] = function() {
        return new ue(this.h);
    };
    te.prototype.i = function() {
        return new ue(this.h);
    };
    v(ue, se);
    ue.prototype.next = function() {
        return this.j.next();
    };
    function we(a, b) {
        this.i = {};
        this.h = [];
        this.j = this.size = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for(var d = 0; d < c; d += 2)this.set(arguments[d], arguments[d + 1]);
        } else if (a) {
            if (a instanceof we) for(c = xe(a), d = 0; d < c.length; d++)this.set(c[d], a.get(c[d]));
            else for(d in a)this.set(d, a[d]);
        }
    }
    n = we.prototype;
    n.has = function(a) {
        return ze(this.i, a);
    };
    n.equals = function(a, b) {
        if (this === a) return !0;
        if (this.size != a.size) return !1;
        b = b || Ae;
        ye(this);
        for(var c, d = 0; c = this.h[d]; d++)if (!b(this.get(c), a.get(c))) return !1;
        return !0;
    };
    n.isEmpty = function() {
        return 0 == this.size;
    };
    n.clear = function() {
        this.i = {};
        this.j = this.size = this.h.length = 0;
    };
    n.remove = function(a) {
        return this.delete(a);
    };
    n.delete = function(a) {
        return ze(this.i, a) ? (delete this.i[a], --this.size, this.j++, this.h.length > 2 * this.size && ye(this), !0) : !1;
    };
    n.get = function(a, b) {
        return ze(this.i, a) ? this.i[a] : b;
    };
    n.set = function(a, b) {
        ze(this.i, a) || (this.size += 1, this.h.push(a), this.j++);
        this.i[a] = b;
    };
    n.forEach = function(a, b) {
        for(var c = xe(this), d = 0; d < c.length; d++){
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this);
        }
    };
    n.clone = function() {
        return new we(this);
    };
    n.keys = function() {
        return re(this.J(!0)).i();
    };
    n.values = function() {
        return re(this.J(!1)).i();
    };
    n.entries = function() {
        var a = this;
        return ie(this.keys(), function(b) {
            return [
                b,
                a.get(b)
            ];
        });
    };
    n.J = function(a) {
        ye(this);
        var b = 0, c = this.j, d = this, e = new ne();
        e.next = function() {
            if (c != d.j) throw Error("The map has changed since the iterator was created");
            if (b >= d.h.length) return oe;
            var g = d.h[b++];
            return pe(a ? g : d.i[g]);
        };
        var f = e.next;
        e.R = function() {
            return qe(f.call(e));
        };
        return e;
    };
    var Be = B.JSON.stringify;
    Fe.prototype.reset = function() {
        this.context = this.onRejected = this.i = this.h = null;
        this.j = !1;
    };
    var Ge = new Ud(function() {
        return new Fe();
    }, function(a) {
        a.reset();
    });
    De.prototype.then = function(a, b, c) {
        return Ie(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c);
    };
    De.prototype.$goog_Thenable = !0;
    De.prototype.cancel = function(a) {
        if (0 == this.h) {
            var b = new Je(a);
            ae(function() {
                Ke(this, b);
            }, this);
        }
    };
    function Ke(a, b) {
        if (0 == a.h) {
            if (a.j) {
                var c = a.j;
                if (c.i) {
                    for(var d = 0, e = null, f = null, g = c.i; g && (g.j || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next)e || (f = g);
                    e && (0 == c.h && 1 == d ? Ke(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : Le(c), Me(c, e, 3, b)));
                }
                a.j = null;
            } else Ee(a, 3, b);
        }
    }
    De.prototype.I = function(a) {
        this.h = 0;
        Ee(this, 2, a);
    };
    De.prototype.O = function(a) {
        this.h = 0;
        Ee(this, 3, a);
    };
    De.prototype.A = function() {
        for(var a; a = Le(this);)Me(this, a, this.h, this.u);
        this.v = !1;
    };
    var Se = Lc;
    E(Je, Ua);
    Je.prototype.name = "cancel";
    E(K, jd);
    n = K.prototype;
    n.subscribe = function(a, b, c) {
        var d = this.i[a];
        d || (d = this.i[a] = []);
        var e = this.u;
        this.h[e] = a;
        this.h[e + 1] = b;
        this.h[e + 2] = c;
        this.u = e + 3;
        d.push(e);
        return e;
    };
    n.ja = function(a) {
        var b = this.h[a];
        if (b) {
            var c = this.i[b];
            0 != this.m ? (this.j.push(a), this.h[a + 1] = Ka) : (c && Za(c, a), delete this.h[a], delete this.h[a + 1], delete this.h[a + 2]);
        }
        return !!b;
    };
    n.ca = function(a, b) {
        var c = this.i[a];
        if (c) {
            for(var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++)d[e - 1] = arguments[e];
            if (this.A) for(e = 0; e < c.length; e++){
                var g = c[e];
                Ve(this.h[g + 1], this.h[g + 2], d);
            }
            else {
                this.m++;
                try {
                    for(e = 0, f = c.length; e < f && !this.l; e++)g = c[e], this.h[g + 1].apply(this.h[g + 2], d);
                } finally{
                    if (this.m--, 0 < this.j.length && 0 == this.m) for(; c = this.j.pop();)this.ja(c);
                }
            }
            return 0 != e;
        }
        return !1;
    };
    n.clear = function(a) {
        if (a) {
            var b = this.i[a];
            b && (b.forEach(this.ja, this), delete this.i[a]);
        } else this.h.length = 0, this.i = {};
    };
    n.fa = function() {
        K.N.fa.call(this);
        this.clear();
        this.j.length = 0;
    };
    We.prototype.set = function(a, b) {
        void 0 === b ? this.h.remove(a) : this.h.set(a, Be(b));
    };
    We.prototype.get = function(a) {
        try {
            var b = this.h.get(a);
        } catch (c) {
            return;
        }
        if (null !== b) try {
            return JSON.parse(b);
        } catch (c) {
            throw "Storage: Invalid value was encountered";
        }
    };
    We.prototype.remove = function(a) {
        this.h.remove(a);
    };
    E(Xe, We);
    Xe.prototype.set = function(a, b) {
        Xe.N.set.call(this, a, Ze(b));
    };
    Xe.prototype.i = function(a) {
        a = Xe.N.get.call(this, a);
        if (void 0 === a || a instanceof Object) return a;
        throw "Storage: Invalid value was encountered";
    };
    Xe.prototype.get = function(a) {
        if (a = this.i(a)) {
            if (a = a.data, void 0 === a) throw "Storage: Invalid value was encountered";
        } else a = void 0;
        return a;
    };
    E($e, Xe);
    $e.prototype.set = function(a, b, c) {
        if (b = Ze(b)) {
            if (c) {
                if (c < Date.now()) {
                    $e.prototype.remove.call(this, a);
                    return;
                }
                b.expiration = c;
            }
            b.creation = Date.now();
        }
        $e.N.set.call(this, a, b);
    };
    $e.prototype.i = function(a) {
        var b = $e.N.i.call(this, a);
        if (b) {
            var c = b.creation, d = b.expiration;
            if (d && d < Date.now() || c && c > Date.now()) $e.prototype.remove.call(this, a);
            else return b;
        }
    };
    E(bf, af);
    bf.prototype[Symbol.iterator] = function() {
        return re(this.J(!0)).i();
    };
    bf.prototype.clear = function() {
        var a = Array.from(this);
        a = u(a);
        for(var b = a.next(); !b.done; b = a.next())this.remove(b.value);
    };
    E(cf, bf);
    n = cf.prototype;
    n.isAvailable = function() {
        if (!this.h) return !1;
        try {
            return this.h.setItem("__sak", "1"), this.h.removeItem("__sak"), !0;
        } catch (a) {
            return !1;
        }
    };
    n.set = function(a, b) {
        try {
            this.h.setItem(a, b);
        } catch (c) {
            if (0 == this.h.length) throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    };
    n.get = function(a) {
        a = this.h.getItem(a);
        if ("string" !== typeof a && null !== a) throw "Storage mechanism: Invalid value was encountered";
        return a;
    };
    n.remove = function(a) {
        this.h.removeItem(a);
    };
    n.J = function(a) {
        var b = 0, c = this.h, d = new ne();
        d.next = function() {
            if (b >= c.length) return oe;
            var f = c.key(b++);
            if (a) return pe(f);
            f = c.getItem(f);
            if ("string" !== typeof f) throw "Storage mechanism: Invalid value was encountered";
            return pe(f);
        };
        var e = d.next;
        d.R = function() {
            return qe(e.call(d));
        };
        return d;
    };
    n.clear = function() {
        this.h.clear();
    };
    n.key = function(a) {
        return this.h.key(a);
    };
    E(df, cf);
    E(ef, bf);
    var gf = {
        ".": ".2E",
        "!": ".21",
        "~": ".7E",
        "*": ".2A",
        "'": ".27",
        "(": ".28",
        ")": ".29",
        "%": "."
    }, ff = null;
    n = ef.prototype;
    n.isAvailable = function() {
        return !!this.h;
    };
    n.set = function(a, b) {
        this.h.setAttribute(hf(a), b);
        jf(this);
    };
    n.get = function(a) {
        a = this.h.getAttribute(hf(a));
        if ("string" !== typeof a && null !== a) throw "Storage mechanism: Invalid value was encountered";
        return a;
    };
    n.remove = function(a) {
        this.h.removeAttribute(hf(a));
        jf(this);
    };
    n.J = function(a) {
        var b = 0, c = this.h.XMLDocument.documentElement.attributes, d = new ne();
        d.next = function() {
            if (b >= c.length) return oe;
            var f = c[b++];
            if (a) return pe(decodeURIComponent(f.nodeName.replace(/\./g, "%")).substr(1));
            f = f.nodeValue;
            if ("string" !== typeof f) throw "Storage mechanism: Invalid value was encountered";
            return pe(f);
        };
        var e = d.next;
        d.R = function() {
            return qe(e.call(d));
        };
        return d;
    };
    n.clear = function() {
        for(var a = this.h.XMLDocument.documentElement, b = a.attributes.length; 0 < b; b--)a.removeAttribute(a.attributes[b - 1].nodeName);
        jf(this);
    };
    E(kf, bf);
    kf.prototype.set = function(a, b) {
        this.i.set(this.h + a, b);
    };
    kf.prototype.get = function(a) {
        return this.i.get(this.h + a);
    };
    kf.prototype.remove = function(a) {
        this.i.remove(this.h + a);
    };
    kf.prototype.J = function(a) {
        var b = this.i.J(!0), c = this, d = new ne();
        d.next = function() {
            try {
                var f = b.R();
            } catch (g) {
                if (g === me) return oe;
                throw g;
            }
            for(; f.substr(0, c.h.length) != c.h;)try {
                f = b.R();
            } catch (g) {
                if (g === me) return oe;
                throw g;
            }
            return pe(a ? f.substr(c.h.length) : c.i.get(f));
        };
        var e = d.next;
        d.R = function() {
            return qe(e.call(d));
        };
        return d;
    };
    v(lf, I);
    lf.prototype.getKey = function() {
        return rc(this, 1);
    };
    lf.prototype.X = function() {
        return rc(this, 2 === tc(this, mf) ? 2 : -1);
    };
    lf.prototype.setValue = function(a) {
        var b = mf;
        oc(this);
        (b = tc(this, b)) && 2 !== b && null != a && (this.h && b in this.h && (this.h[b] = void 0), H(this, b, void 0));
        return H(this, 2, a);
    };
    var mf = [
        2,
        3,
        4,
        5,
        6
    ];
    v(nf, I);
    v(of, I);
    v(pf, I);
    v(qf, I);
    qf.prototype.getPlayerType = function() {
        return rc(this, 36);
    };
    qf.prototype.setHomeGroupInfo = function(a) {
        return wc(this, 81, a);
    };
    var rf = [
        9,
        66,
        24,
        32,
        86,
        100,
        101
    ];
    v(sf, I);
    var tf = [
        15,
        26,
        28
    ];
    v(uf, I);
    uf.prototype.setToken = function(a) {
        return H(this, 2, a);
    };
    v(vf, I);
    vf.prototype.setSafetyMode = function(a) {
        return H(this, 5, a);
    };
    var wf = [
        12
    ];
    v(xf, I);
    var yf = [
        12
    ];
    v(zf, I);
    v(Af, I);
    var Bf = [
        1,
        2
    ];
    v(Cf, I);
    var Df = [
        3
    ];
    v(Ef, I);
    v(Ff, I);
    var Gf;
    Gf = new function(a, b) {
        this.h = a;
        this.fieldName = b;
        this.isRepeated = 0;
        this.i = Kc;
    }(406606992, {
        Ob: 0
    }, Ff);
    v(Hf, Ff);
    id(Hf);
    var If, Jf, Kf, Lf = B.window, Mf = (null === (If = null === Lf || void 0 === Lf ? void 0 : Lf.yt) || void 0 === If ? void 0 : If.config_) || (null === (Jf = null === Lf || void 0 === Lf ? void 0 : Lf.ytcfg) || void 0 === Jf ? void 0 : Jf.data_) || {}, Nf = (null === (Kf = null === Lf || void 0 === Lf ? void 0 : Lf.ytcfg) || void 0 === Kf ? void 0 : Kf.obfuscatedData_) || [];
    v(Of, Ef);
    id(Of);
    var Pf = new Of(Nf), Qf = Mf.EXPERIMENT_FLAGS;
    if (!Qf || !Qf.jspb_i18n_extension) {
        var Rf = new Hf();
        Gf.i(Pf, Rf);
    }
    D("yt.config_", Mf);
    D("yt.configJspb_", Nf);
    var Uf = [];
    var Zf = 0;
    D("ytDomDomGetNextId", C("ytDomDomGetNextId") || function() {
        return ++Zf;
    });
    var $f = {
        stopImmediatePropagation: 1,
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        screenX: 1,
        screenY: 1,
        scale: 1,
        rotation: 1,
        webkitMovementX: 1,
        webkitMovementY: 1
    };
    ag.prototype.preventDefault = function() {
        this.event && (this.event.returnValue = !1, this.event.preventDefault && this.event.preventDefault());
    };
    ag.prototype.stopPropagation = function() {
        this.event && (this.event.cancelBubble = !0, this.event.stopPropagation && this.event.stopPropagation());
    };
    ag.prototype.stopImmediatePropagation = function() {
        this.event && (this.event.cancelBubble = !0, this.event.stopImmediatePropagation && this.event.stopImmediatePropagation());
    };
    var eb = B.ytEventsEventsListeners || {};
    D("ytEventsEventsListeners", eb);
    var bg = B.ytEventsEventsCounter || {
        count: 0
    };
    D("ytEventsEventsCounter", bg);
    var eg = Wa(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "capture", {
                get: function get() {
                    a = !0;
                }
            });
            window.addEventListener("test", null, b);
        } catch (c) {}
        return a;
    });
    var ig = /^[\w.]*$/, jg = {
        q: !0,
        search_query: !0
    };
    function kg(a, b) {
        b = a.split(b);
        for(var c = {}, d = 0, e = b.length; d < e; d++){
            var f = b[d].split("=");
            if (1 == f.length && f[0] || 2 == f.length) try {
                var g = lg(f[0] || ""), h = lg(f[1] || "");
                g in c ? Array.isArray(c[g]) ? bb(c[g], h) : c[g] = [
                    c[g],
                    h
                ] : c[g] = h;
            } catch (p) {
                var k = p, l = f[0], m = String(kg);
                k.args = [
                    {
                        key: l,
                        value: f[1],
                        query: a,
                        method: mg == m ? "unchanged" : m
                    }
                ];
                jg.hasOwnProperty(l) || Yf(k);
            }
        }
        return c;
    }
    var mg = String(kg);
    var ug = {
        Ib: "WEB_DISPLAY_MODE_UNKNOWN",
        Eb: "WEB_DISPLAY_MODE_BROWSER",
        Gb: "WEB_DISPLAY_MODE_MINIMAL_UI",
        Hb: "WEB_DISPLAY_MODE_STANDALONE",
        Fb: "WEB_DISPLAY_MODE_FULLSCREEN"
    };
    var vg = {
        appSettingsCaptured: !0,
        visualElementAttached: !0,
        visualElementGestured: !0,
        visualElementHidden: !0,
        visualElementShown: !0,
        flowEvent: !0,
        visualElementStateChanged: !0,
        playbackAssociated: !0,
        youThere: !0,
        accountStateChangeSignedIn: !0,
        accountStateChangeSignedOut: !0
    }, wg = {
        latencyActionBaselined: !0,
        latencyActionInfo: !0,
        latencyActionTicked: !0,
        bedrockRepetitiveActionTimed: !0,
        adsClientStateChange: !0,
        streamzIncremented: !0,
        mdxDialAdditionalDataUpdateEvent: !0,
        tvhtml5WatchKeyEvent: !0,
        tvhtml5VideoSeek: !0,
        tokenRefreshEvent: !0,
        adNotify: !0,
        adNotifyFilled: !0,
        tvhtml5LaunchUrlComponentChanged: !0,
        bedrockResourceConsumptionSnapshot: !0,
        deviceStartupMetrics: !0,
        mdxSignIn: !0,
        tvhtml5KeyboardLogging: !0,
        tvhtml5StartupSoundEvent: !0,
        tvhtml5LiveChatStatus: !0,
        tvhtml5DeviceStorageStatus: !0,
        tvhtml5LocalStorage: !0,
        directSignInEvent: !0,
        finalPayload: !0,
        tvhtml5SearchCompleted: !0,
        tvhtml5KeyboardPerformance: !0,
        adNotifyFailure: !0,
        latencyActionSpan: !0,
        tvhtml5AccountDialogOpened: !0,
        tvhtml5ApiTest: !0
    };
    xg.prototype.L = function(a, b) {
        return zg(a, 1, b);
    };
    v(Bg, xg);
    Bg.prototype.W = function(a) {
        if (void 0 === a || !Number.isNaN(Number(a))) {
            var b = C("yt.scheduler.instance.cancelJob");
            b ? b(a) : window.clearTimeout(a);
        }
    };
    Bg.prototype.start = function() {
        var a = C("yt.scheduler.instance.start");
        a && a();
    };
    var Dg = Cg();
    var Fg = new function() {
        var a = window.document;
        this.h = window;
        this.i = a;
    }();
    D("yt.ads_.signals_.getAdSignalsString", function(a) {
        return ng(Eg(a));
    });
    Date.now();
    var Gg = "XMLHttpRequest" in B ? function Gg() {
        return new XMLHttpRequest();
    } : null;
    var Ig = {
        Authorization: "AUTHORIZATION",
        "X-Goog-Visitor-Id": "SANDBOXED_VISITOR_ID",
        "X-Youtube-Domain-Admin-State": "DOMAIN_ADMIN_STATE",
        "X-Youtube-Chrome-Connected": "CHROME_CONNECTED_HEADER",
        "X-YouTube-Client-Name": "INNERTUBE_CONTEXT_CLIENT_NAME",
        "X-YouTube-Client-Version": "INNERTUBE_CONTEXT_CLIENT_VERSION",
        "X-YouTube-Delegation-Context": "INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT",
        "X-YouTube-Device": "DEVICE",
        "X-Youtube-Identity-Token": "ID_TOKEN",
        "X-YouTube-Page-CL": "PAGE_CL",
        "X-YouTube-Page-Label": "PAGE_BUILD_LABEL",
        "X-YouTube-Variants-Checksum": "VARIANTS_CHECKSUM"
    }, Jg = "app debugcss debugjs expflag force_ad_params force_ad_encrypted force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" ").concat(fa("client_dev_mss_url client_dev_regex_map client_dev_root_url client_rollout_override expflag jsfeat jsmode mods".split(" "))), Kg = !1;
    function Ug(a) {
        if (Ma(a)) for(var b in a){
            var c;
            (c = "html_content" == b) || (c = b.length - 5, c = 0 <= c && b.indexOf("_html", c) == c);
            if (c) {
                c = b;
                lb("HTML that is escaped and sanitized server-side and passed through yt.net.ajax");
                var d = a[b];
                if (void 0 === jb) {
                    var e = null;
                    var f = B.trustedTypes;
                    if (f && f.createPolicy) {
                        try {
                            e = f.createPolicy("goog#html", {
                                createHTML: Ta,
                                createScript: Ta,
                                createScriptURL: Ta
                            });
                        } catch (g) {
                            B.console && B.console.error(g.message);
                        }
                        jb = e;
                    } else jb = e;
                }
                d = (e = jb) ? e.createHTML(d) : d;
                a[c] = new zb(d);
            } else Ug(a[b]);
        }
    }
    var Vg = B.ytPubsubPubsubInstance || new K(), Wg = B.ytPubsubPubsubSubscribedKeys || {}, Xg = B.ytPubsubPubsubTopicToKeys || {}, Yg = B.ytPubsubPubsubIsSynchronous || {};
    K.prototype.subscribe = K.prototype.subscribe;
    K.prototype.unsubscribeByKey = K.prototype.ja;
    K.prototype.publish = K.prototype.ca;
    K.prototype.clear = K.prototype.clear;
    D("ytPubsubPubsubInstance", Vg);
    D("ytPubsubPubsubTopicToKeys", Xg);
    D("ytPubsubPubsubIsSynchronous", Yg);
    D("ytPubsubPubsubSubscribedKeys", Wg);
    v(Zg, Error);
    var $g = window, Q = $g.ytcsi && $g.ytcsi.now ? $g.ytcsi.now : $g.performance && $g.performance.timing && $g.performance.now && $g.performance.timing.navigationStart ? function Q() {
        return $g.performance.timing.navigationStart + $g.performance.now();
    } : function() {
        return new Date().getTime();
    };
    var ah = sg("initial_gel_batch_timeout", 2e3), bh = Math.pow(2, 16) - 1, ch = void 0;
    var eh = new dh(), fh = new dh(), gh = !0, hh = B.ytLoggingTransportGELQueue_ || new Map();
    D("ytLoggingTransportGELQueue_", hh);
    var ih = B.ytLoggingTransportGELProtoQueue_ || new Map();
    D("ytLoggingTransportGELProtoQueue_", ih);
    var jh = B.ytLoggingTransportTokensToCttTargetIds_ || {};
    D("ytLoggingTransportTokensToCttTargetIds_", jh);
    var kh = B.ytLoggingTransportTokensToJspbCttTargetIds_ || {};
    D("ytLoggingTransportTokensToJspbCttTargetIds_", kh);
    var Eh = B.ytLoggingGelSequenceIdObj_ || {};
    D("ytLoggingGelSequenceIdObj_", Eh);
    D("ytglobal.prefsUserPrefsPrefs_", C("ytglobal.prefsUserPrefsPrefs_") || {});
    var Hh = {
        bluetooth: "CONN_DISCO",
        cellular: "CONN_CELLULAR_UNKNOWN",
        ethernet: "CONN_WIFI",
        none: "CONN_NONE",
        wifi: "CONN_WIFI",
        wimax: "CONN_CELLULAR_4G",
        other: "CONN_UNKNOWN",
        unknown: "CONN_UNKNOWN",
        "slow-2g": "CONN_CELLULAR_2G",
        "2g": "CONN_CELLULAR_2G",
        "3g": "CONN_CELLULAR_3G",
        "4g": "CONN_CELLULAR_4G"
    }, Ih = {
        CONN_DEFAULT: 0,
        CONN_UNKNOWN: 1,
        CONN_NONE: 2,
        CONN_WIFI: 3,
        CONN_CELLULAR_2G: 4,
        CONN_CELLULAR_3G: 5,
        CONN_CELLULAR_4G: 6,
        CONN_CELLULAR_UNKNOWN: 7,
        CONN_DISCO: 8,
        CONN_CELLULAR_5G: 9,
        CONN_WIFI_METERED: 10,
        CONN_CELLULAR_5G_SA: 11,
        CONN_CELLULAR_5G_NSA: 12,
        CONN_INVALID: 31
    }, Jh = {
        EFFECTIVE_CONNECTION_TYPE_UNKNOWN: 0,
        EFFECTIVE_CONNECTION_TYPE_OFFLINE: 1,
        EFFECTIVE_CONNECTION_TYPE_SLOW_2G: 2,
        EFFECTIVE_CONNECTION_TYPE_2G: 3,
        EFFECTIVE_CONNECTION_TYPE_3G: 4,
        EFFECTIVE_CONNECTION_TYPE_4G: 5
    }, Kh = {
        "slow-2g": "EFFECTIVE_CONNECTION_TYPE_SLOW_2G",
        "2g": "EFFECTIVE_CONNECTION_TYPE_2G",
        "3g": "EFFECTIVE_CONNECTION_TYPE_3G",
        "4g": "EFFECTIVE_CONNECTION_TYPE_4G"
    };
    Uh.prototype.set = function(a, b, c, d) {
        c = c || 31104e3;
        this.remove(a);
        if (this.h) try {
            this.h.set(a, b, Date.now() + 1e3 * c);
            return;
        } catch (f) {}
        var e = "";
        if (d) try {
            e = escape(Be(b));
        } catch (f) {
            return;
        }
        else e = escape(b);
        b = this.i;
        ed.set("" + a, e, {
            Ba: c,
            path: "/",
            domain: void 0 === b ? "youtube.com" : b,
            secure: !1
        });
    };
    Uh.prototype.get = function(a, b) {
        var c = void 0, d = !this.h;
        if (!d) try {
            c = this.h.get(a);
        } catch (e) {
            d = !0;
        }
        if (d && (c = ed.get("" + a, void 0)) && (c = unescape(c), b)) try {
            c = JSON.parse(c);
        } catch (e) {
            this.remove(a), c = void 0;
        }
        return c;
    };
    Uh.prototype.remove = function(a) {
        this.h && this.h.remove(a);
        var b = this.i;
        ed.remove("" + a, "/", void 0 === b ? "youtube.com" : b);
    };
    var Vh;
    var $h = Zb || $b;
    var ai = function() {
        var a;
        return function() {
            a || (a = new Uh("ytidb"));
            return a;
        };
    }();
    var ci = [], di = !1;
    var R = {}, ki = (R.AUTH_INVALID = "No user identifier specified.", R.EXPLICIT_ABORT = "Transaction was explicitly aborted.", R.IDB_NOT_SUPPORTED = "IndexedDB is not supported.", R.MISSING_INDEX = "Index not created.", R.MISSING_OBJECT_STORES = "Object stores not created.", R.DB_DELETED_BY_MISSING_OBJECT_STORES = "Database is deleted because expected object stores were not created.", R.DB_REOPENED_BY_MISSING_OBJECT_STORES = "Database is reopened because expected object stores were not created.", R.UNKNOWN_ABORT = "Transaction was aborted for unknown reasons.", R.QUOTA_EXCEEDED = "The current transaction exceeded its quota limitations.", R.QUOTA_MAYBE_EXCEEDED = "The current transaction may have failed because of exceeding quota limitations.", R.EXECUTE_TRANSACTION_ON_CLOSED_DB = "Can't start a transaction on a closed database", R.INCOMPATIBLE_DB_VERSION = "The binary is incompatible with the database version", R), S = {}, li = (S.AUTH_INVALID = "ERROR", S.EXECUTE_TRANSACTION_ON_CLOSED_DB = "WARNING", S.EXPLICIT_ABORT = "IGNORED", S.IDB_NOT_SUPPORTED = "ERROR", S.MISSING_INDEX = "WARNING", S.MISSING_OBJECT_STORES = "ERROR", S.DB_DELETED_BY_MISSING_OBJECT_STORES = "WARNING", S.DB_REOPENED_BY_MISSING_OBJECT_STORES = "WARNING", S.QUOTA_EXCEEDED = "WARNING", S.QUOTA_MAYBE_EXCEEDED = "WARNING", S.UNKNOWN_ABORT = "WARNING", S.INCOMPATIBLE_DB_VERSION = "WARNING", S), T = {}, mi = (T.AUTH_INVALID = !1, T.EXECUTE_TRANSACTION_ON_CLOSED_DB = !1, T.EXPLICIT_ABORT = !1, T.IDB_NOT_SUPPORTED = !1, T.MISSING_INDEX = !1, T.MISSING_OBJECT_STORES = !1, T.DB_DELETED_BY_MISSING_OBJECT_STORES = !1, T.DB_REOPENED_BY_MISSING_OBJECT_STORES = !1, T.QUOTA_EXCEEDED = !1, T.QUOTA_MAYBE_EXCEEDED = !0, T.UNKNOWN_ABORT = !0, T.INCOMPATIBLE_DB_VERSION = !1, T);
    function U(a, b, c, d, e) {
        b = void 0 === b ? {} : b;
        c = void 0 === c ? ki[a] : c;
        d = void 0 === d ? li[a] : d;
        e = void 0 === e ? mi[a] : e;
        Zg.call(this, c, Object.assign({
            name: "YtIdbKnownError",
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            type: a
        }, b));
        this.type = a;
        this.message = c;
        this.level = d;
        this.h = e;
        Object.setPrototypeOf(this, U.prototype);
    }
    v(U, Zg);
    function ni(a, b) {
        U.call(this, "MISSING_OBJECT_STORES", {
            expectedObjectStores: b,
            foundObjectStores: a
        }, ki.MISSING_OBJECT_STORES);
        Object.setPrototypeOf(this, ni.prototype);
    }
    v(ni, U);
    function oi(a, b) {
        var c = Error.call(this);
        this.message = c.message;
        "stack" in c && (this.stack = c.stack);
        this.index = a;
        this.objectStore = b;
        Object.setPrototypeOf(this, oi.prototype);
    }
    v(oi, Error);
    var pi = [
        "The database connection is closing",
        "Can't start a transaction on a closed database",
        "A mutation operation was attempted on a database that did not allow mutations"
    ];
    V.all = function(a) {
        return new V(new ui(function(b, c) {
            var d = [], e = a.length;
            0 === e && b(d);
            for(var f = {
                Z: 0
            }; f.Z < a.length; f = {
                Z: f.Z
            }, ++f.Z)vi(V.resolve(a[f.Z]).then(function(g) {
                return function(h) {
                    d[g.Z] = h;
                    e--;
                    0 === e && b(d);
                };
            }(f)), function(g) {
                c(g);
            });
        }));
    };
    V.resolve = function(a) {
        return new V(new ui(function(b, c) {
            a instanceof V ? a.then(b, c) : b(a);
        }));
    };
    V.reject = function(a) {
        return new V(new ui(function(b, c) {
            c(a);
        }));
    };
    V.prototype.then = function(a, b) {
        var c = this, d = null !== a && void 0 !== a ? a : ti, e = null !== b && void 0 !== b ? b : si;
        return new V(new ui(function(f, g) {
            "PENDING" === c.state.status ? (c.h.push(function() {
                wi(c, c, d, f, g);
            }), c.onRejected.push(function() {
                xi(c, c, e, f, g);
            })) : "FULFILLED" === c.state.status ? wi(c, c, d, f, g) : "REJECTED" === c.state.status && xi(c, c, e, f, g);
        }));
    };
    function yi(a, b, c, d, e) {
        b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(function(f) {
            f instanceof V ? yi(a, b, f, d, e) : d(f);
        }, function(f) {
            e(f);
        });
    }
    n = Ci.prototype;
    n.add = function(a, b, c) {
        return X(this, [
            a
        ], {
            mode: "readwrite",
            H: !0
        }, function(d) {
            return d.objectStore(a).add(b, c);
        });
    };
    n.clear = function(a) {
        return X(this, [
            a
        ], {
            mode: "readwrite",
            H: !0
        }, function(b) {
            return b.objectStore(a).clear();
        });
    };
    n.close = function() {
        var a;
        this.h.close();
        (null === (a = this.options) || void 0 === a ? 0 : a.closed) && this.options.closed();
    };
    n.count = function(a, b) {
        return X(this, [
            a
        ], {
            mode: "readonly",
            H: !0
        }, function(c) {
            return c.objectStore(a).count(b);
        });
    };
    n.delete = function(a, b) {
        return X(this, [
            a
        ], {
            mode: "readwrite",
            H: !0
        }, function(c) {
            return c.objectStore(a).delete(b);
        });
    };
    n.get = function(a, b) {
        return X(this, [
            a
        ], {
            mode: "readonly",
            H: !0
        }, function(c) {
            return c.objectStore(a).get(b);
        });
    };
    n.objectStoreNames = function() {
        return Array.from(this.h.objectStoreNames);
    };
    n.getName = function() {
        return this.h.name;
    };
    n = Ei.prototype;
    n.add = function(a, b) {
        return W(this.h.add(a, b));
    };
    n.autoIncrement = function() {
        return this.h.autoIncrement;
    };
    n.clear = function() {
        return W(this.h.clear()).then(function() {});
    };
    n.count = function(a) {
        return W(this.h.count(a));
    };
    n.delete = function(a) {
        return a instanceof IDBKeyRange ? Ki(this, a) : W(this.h.delete(a));
    };
    n.get = function(a) {
        return W(this.h.get(a));
    };
    n.index = function(a) {
        try {
            return new Mi(this.h.index(a));
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new oi(a, this.h.name);
            throw b;
        }
    };
    n.getName = function() {
        return this.h.name;
    };
    n.keyPath = function() {
        return this.h.keyPath;
    };
    Gi.prototype.abort = function() {
        this.h.abort();
        this.i = !0;
        throw new U("EXPLICIT_ABORT");
    };
    Gi.prototype.objectStore = function(a) {
        a = this.h.objectStore(a);
        var b = this.j.get(a);
        b || (b = new Ei(a), this.j.set(a, b));
        return b;
    };
    n = Mi.prototype;
    n.count = function(a) {
        return W(this.h.count(a));
    };
    n.delete = function(a) {
        return Oi(this, {
            query: a
        }, function(b) {
            return b.delete().then(function() {
                return b.continue();
            });
        });
    };
    n.get = function(a) {
        return W(this.h.get(a));
    };
    n.getKey = function(a) {
        return W(this.h.getKey(a));
    };
    n.keyPath = function() {
        return this.h.keyPath;
    };
    n.unique = function() {
        return this.h.unique;
    };
    n = Pi.prototype;
    n.advance = function(a) {
        this.cursor.advance(a);
        return Ni(this.request);
    };
    n.continue = function(a) {
        this.cursor.continue(a);
        return Ni(this.request);
    };
    n.delete = function() {
        return W(this.cursor.delete()).then(function() {});
    };
    n.getKey = function() {
        return this.cursor.key;
    };
    n.X = function() {
        return this.cursor.value;
    };
    n.update = function(a) {
        return W(this.cursor.update(a));
    };
    Ui.prototype.j = function(a, b, c) {
        c = void 0 === c ? {} : c;
        return Ri(a, b, c);
    };
    Ui.prototype.delete = function(a) {
        a = void 0 === a ? {} : a;
        return Si(this.name, a);
    };
    Ui.prototype.open = function() {
        var b = function b() {
            c.h === d && (c.h = void 0);
        };
        function a() {
            var f, g, h, k, l, m, p, t, q, x;
            return z(function(y) {
                switch(y.h){
                    case 1:
                        return h = null !== (f = Error().stack) && void 0 !== f ? f : "", sa(y, 2), w(y, c.j(c.name, c.options.version, e), 4);
                    case 4:
                        k = y.i;
                        for(var A = c.options, M = [], O = u(Object.keys(A.ga)), P = O.next(); !P.done; P = O.next()){
                            P = P.value;
                            var Qb = A.ga[P], be = void 0 === Qb.qb ? Number.MAX_VALUE : Qb.qb;
                            !(k.h.version >= Qb.wa) || k.h.version >= be || k.h.objectStoreNames.contains(P) || M.push(P);
                        }
                        l = M;
                        if (0 === l.length) {
                            y.o(5);
                            break;
                        }
                        m = Object.keys(c.options.ga);
                        p = k.objectStoreNames();
                        if (c.v < sg("ytidb_reopen_db_retries", 0)) return c.v++, k.close(), ei(new U("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                            dbName: c.name,
                            expectedObjectStores: m,
                            foundObjectStores: p
                        })), y.return(a());
                        if (!(c.m < sg("ytidb_remake_db_retries", 1))) {
                            y.o(6);
                            break;
                        }
                        c.m++;
                        if (!N("ytidb_remake_db_enable_backoff_delay")) {
                            y.o(7);
                            break;
                        }
                        return w(y, Ti(c.i), 8);
                    case 8:
                        c.i *= 2;
                    case 7:
                        return w(y, c.delete(), 9);
                    case 9:
                        return ei(new U("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                            dbName: c.name,
                            expectedObjectStores: m,
                            foundObjectStores: p
                        })), y.return(a());
                    case 6:
                        throw new ni(p, m);
                    case 5:
                        return y.return(k);
                    case 2:
                        t = ua(y);
                        if (t instanceof DOMException ? "VersionError" !== t.name : "DOMError" in self && t instanceof DOMError ? "VersionError" !== t.name : !(t instanceof Object && "message" in t) || "An attempt was made to open a database using a lower version than the existing version." !== t.message) {
                            y.o(10);
                            break;
                        }
                        return w(y, c.j(c.name, void 0, Object.assign(Object.assign({}, e), {
                            upgrade: void 0
                        })), 11);
                    case 11:
                        q = y.i;
                        x = q.h.version;
                        if (void 0 !== c.options.version && x > c.options.version + 1) throw q.close(), c.l = !1, Vi(c, x);
                        return y.return(q);
                    case 10:
                        throw b(), t instanceof Error && !N("ytidb_async_stack_killswitch") && (t.stack = t.stack + "\n" + h.substring(h.indexOf("\n") + 1)), qi(t, c.name, "", null !== (g = c.options.version) && void 0 !== g ? g : -1);
                }
            });
        }
        var c = this;
        if (!this.l) throw Vi(this);
        if (this.h) return this.h;
        var d, e = {
            blocking: function blocking(f) {
                f.close();
            },
            closed: b,
            rb: b,
            upgrade: this.options.upgrade
        };
        return this.h = d = a();
    };
    var Xi = new Ui("YtIdbMeta", {
        ga: {
            databases: {
                wa: 1
            }
        },
        upgrade: function upgrade(a, b) {
            b(1) && Di(a, "databases", {
                keyPath: "actualName"
            });
        }
    });
    var bj, cj = new function() {}(new function() {}());
    new Ce();
    n = pj.prototype;
    n.writeThenSend = function(a, b) {
        var c = this;
        b = void 0 === b ? {} : b;
        if (this.s && this.h) {
            var d = {
                url: a,
                options: b,
                timestamp: this.now(),
                status: "NEW",
                sendCount: 0
            };
            this.D.set(d, this.s).then(function(e) {
                d.id = e;
                c.G.F() && sj(c, d);
            }).catch(function(e) {
                sj(c, d);
                tj(c, e);
            });
        } else this.S(a, b);
    };
    n.sendThenWrite = function(a, b, c) {
        var d = this;
        b = void 0 === b ? {} : b;
        if (this.s && this.h) {
            var e = {
                url: a,
                options: b,
                timestamp: this.now(),
                status: "NEW",
                sendCount: 0
            };
            this.B && this.B("nwl_skip_retry") && (e.skipRetry = c);
            if (this.G.F() || this.B && this.B("nwl_aggressive_send_then_write") && !e.skipRetry) {
                if (!e.skipRetry) {
                    var f = b.onError ? b.onError : function f() {};
                    b.onError = function(g, h) {
                        return z(function(k) {
                            if (1 == k.h) return w(k, d.D.set(e, d.s).catch(function(l) {
                                tj(d, l);
                            }), 2);
                            f(g, h);
                            k.h = 0;
                        });
                    };
                }
                this.S(a, b, e.skipRetry);
            } else this.D.set(e, this.s).catch(function(g) {
                d.S(a, b, e.skipRetry);
                tj(d, g);
            });
        } else this.S(a, b, this.B && this.B("nwl_skip_retry") && c);
    };
    n.sendAndWrite = function(a, b) {
        var c = this;
        b = void 0 === b ? {} : b;
        if (this.s && this.h) {
            var d = {
                url: a,
                options: b,
                timestamp: this.now(),
                status: "NEW",
                sendCount: 0
            }, e = !1, f = b.onSuccess ? b.onSuccess : function f() {};
            d.options.onSuccess = function(g, h) {
                void 0 !== d.id ? c.D.aa(d.id, c.s) : e = !0;
                c.G.P && c.B && c.B("vss_network_hint") && c.G.P(!0);
                f(g, h);
            };
            this.S(d.url, d.options);
            this.D.set(d, this.s).then(function(g) {
                d.id = g;
                e && c.D.aa(d.id, c.s);
            }).catch(function(g) {
                tj(c, g);
            });
        } else this.S(a, b);
    };
    n.ia = function() {
        var a = this;
        if (!this.s) throw ri("throttleSend");
        this.i || (this.i = this.K.L(function() {
            var b;
            return z(function(c) {
                if (1 == c.h) return w(c, a.D.Na("NEW", a.s), 2);
                if (3 != c.h) return b = c.i, b ? w(c, sj(a, b), 3) : (a.Ia(), c.return());
                a.i && (a.i = 0, a.ia());
                c.h = 0;
            });
        }, this.Za));
    };
    n.Ia = function() {
        this.K.W(this.i);
        this.i = 0;
    };
    function rj(a) {
        if (!a.s) throw ri("retryQueuedRequests");
        a.D.Na("QUEUED", a.s).then(function(b) {
            b && !uj(a, b, a.Ua) ? a.K.L(function() {
                return z(function(c) {
                    if (1 == c.h) return void 0 === b.id ? c.o(2) : w(c, a.D.Fa(b.id, a.s), 2);
                    rj(a);
                    c.h = 0;
                });
            }) : a.G.F() && a.ia();
        });
    }
    var xj = C("ytPubsub2Pubsub2Instance") || new K();
    K.prototype.subscribe = K.prototype.subscribe;
    K.prototype.unsubscribeByKey = K.prototype.ja;
    K.prototype.publish = K.prototype.ca;
    K.prototype.clear = K.prototype.clear;
    D("ytPubsub2Pubsub2Instance", xj);
    D("ytPubsub2Pubsub2SubscribedKeys", C("ytPubsub2Pubsub2SubscribedKeys") || {});
    D("ytPubsub2Pubsub2TopicToKeys", C("ytPubsub2Pubsub2TopicToKeys") || {});
    D("ytPubsub2Pubsub2IsAsync", C("ytPubsub2Pubsub2IsAsync") || {});
    D("ytPubsub2Pubsub2SkipSubKey", null);
    v(yj, Ui);
    yj.prototype.j = function(a, b, c) {
        c = void 0 === c ? {} : c;
        return (this.options.Ga ? kj : jj)(a, b, Object.assign({}, c));
    };
    yj.prototype.delete = function(a) {
        a = void 0 === a ? {} : a;
        return (this.options.Ga ? oj : lj)(this.name, a);
    };
    var Bj;
    var Mj = {}, Nj = Aj("ServiceWorkerLogsDatabase", {
        ga: (Mj.SWHealthLog = {
            wa: 1
        }, Mj),
        Ga: !0,
        upgrade: function upgrade(a, b) {
            b(1) && Di(a, "SWHealthLog", {
                keyPath: "id",
                autoIncrement: !0
            }).h.createIndex("swHealthNewRequest", [
                "interface",
                "timestamp"
            ], {
                unique: !1
            });
        },
        version: 1
    });
    var Rj = {}, Sj = 0;
    Y.prototype.requestComplete = function(a, b) {
        b && (this.i = !0);
        a = this.removeParams(a);
        this.h.get(a) || this.h.set(a, b);
    };
    Y.prototype.isEndpointCFR = function(a) {
        a = this.removeParams(a);
        return (a = this.h.get(a)) ? !1 : !1 === a && this.i ? !0 : null;
    };
    Y.prototype.removeParams = function(a) {
        return a.split("?")[0];
    };
    Y.prototype.removeParams = Y.prototype.removeParams;
    Y.prototype.isEndpointCFR = Y.prototype.isEndpointCFR;
    Y.prototype.requestComplete = Y.prototype.requestComplete;
    Y.getInstance = Wj;
    var Xj;
    var bk = sg("network_polling_interval", 3e4);
    v(Z, J);
    n = Z.prototype;
    n.F = function() {
        var a;
        return N("use_shared_nsm") && this.i ? null === (a = this.i) || void 0 === a ? void 0 : a.F() : this.j;
    };
    n.P = function(a) {
        var b;
        N("use_shared_nsm") && this.i ? null === (b = this.i) || void 0 === b || (b.i = a) : a !== this.j && (this.j = a);
    };
    n.pb = function(a) {
        !N("use_shared_nsm") && (this.m = !0, void 0 === a ? 0 : a) && (this.O || fk(this));
    };
    n.ya = function() {
        var a = window.navigator.onLine;
        return void 0 === a ? !0 : a;
    };
    n.jb = function() {
        this.ka = !0;
    };
    n.Y = function(a, b) {
        return N("use_shared_nsm") && this.i ? this.i.Y(a, b) : J.prototype.Y.call(this, a, b);
    };
    function fk(a) {
        a.O = yg(function() {
            return z(function(b) {
                if (1 == b.h) return a.j ? a.ya() || !a.m ? b.o(3) : w(b, a.T(), 3) : w(b, a.T(), 3);
                fk(a);
                b.h = 0;
            });
        }, bk);
    }
    n.T = function(a) {
        var b = this;
        if (N("use_shared_nsm") && this.i) {
            var c = Qd(this.i, a);
            c.then(function(d) {
                N("use_cfr_monitor") && Wj().requestComplete("generate_204", d);
            });
            return c;
        }
        return this.u ? this.u : this.u = new Promise(function(d) {
            var e, f, g;
            return z(function(h) {
                switch(h.h){
                    case 1:
                        return e = window.AbortController ? new window.AbortController() : void 0, f = null === e || void 0 === e ? void 0 : e.signal, g = !1, sa(h, 2, 3), e && (b.A = Dg.L(function() {
                            e.abort();
                        }, a || 2e4)), w(h, fetch("/generate_204", {
                            method: "HEAD",
                            signal: f
                        }), 5);
                    case 5:
                        g = !0;
                    case 3:
                        xa(h);
                        N("use_cfr_monitor") && Wj().requestComplete("generate_204", g);
                        b.u = void 0;
                        b.A && Dg.W(b.A);
                        g !== b.j && (b.j = g, b.j && b.m ? Nd(b, "ytnetworkstatus-online") : b.m && Nd(b, "ytnetworkstatus-offline"));
                        d(g);
                        ya(h);
                        break;
                    case 2:
                        ua(h), g = !1, h.o(3);
                }
            });
        });
    };
    Z.prototype.sendNetworkCheckRequest = Z.prototype.T;
    Z.prototype.listen = Z.prototype.Y;
    Z.prototype.enableErrorFlushing = Z.prototype.jb;
    Z.prototype.getWindowStatus = Z.prototype.ya;
    Z.prototype.monitorNetworkStatusChange = Z.prototype.pb;
    Z.prototype.networkStatusHint = Z.prototype.P;
    Z.prototype.isNetworkAvailable = Z.prototype.F;
    Z.getInstance = ek;
    v(gk, J);
    gk.prototype.F = function() {
        var a = C("yt.networkStatusManager.instance.isNetworkAvailable");
        return a ? a.bind(this.i)() : !0;
    };
    gk.prototype.P = function(a) {
        var b = C("yt.networkStatusManager.instance.networkStatusHint").bind(this.i);
        b && b(a);
    };
    gk.prototype.T = function(a) {
        var b = this, c;
        return z(function(d) {
            c = C("yt.networkStatusManager.instance.sendNetworkCheckRequest").bind(b.i);
            return N("skip_network_check_if_cfr") && Wj().isEndpointCFR("generate_204") ? d.return(new Promise(function(e) {
                var f;
                b.P((null === (f = window.navigator) || void 0 === f ? void 0 : f.onLine) || !0);
                e(b.F());
            })) : c ? d.return(c(a)) : d.return(!0);
        });
    };
    var ik;
    v(jk, pj);
    jk.prototype.writeThenSend = function(a, b) {
        b || (b = {});
        gi() || (this.h = !1);
        pj.prototype.writeThenSend.call(this, a, b);
    };
    jk.prototype.sendThenWrite = function(a, b, c) {
        b || (b = {});
        gi() || (this.h = !1);
        pj.prototype.sendThenWrite.call(this, a, b, c);
    };
    jk.prototype.sendAndWrite = function(a, b) {
        b || (b = {});
        gi() || (this.h = !1);
        pj.prototype.sendAndWrite.call(this, a, b);
    };
    jk.prototype.awaitInitialization = function() {
        return this.j.promise;
    };
    var pk = 0, qk = 0, rk, sk = B.ytNetworklessLoggingInitializationOptions || {
        isNwlInitialized: !1,
        potentialEsfErrorCounter: qk
    };
    D("ytNetworklessLoggingInitializationOptions", sk);
    function zk() {
        var a = fj();
        if (!a) throw ri("throttleSend");
        pk || (pk = Dg.L(function() {
            var b;
            return z(function(c) {
                if (1 == c.h) return w(c, Gj("NEW", a), 2);
                if (3 != c.h) return b = c.i, b ? w(c, xk(b), 3) : (Dg.W(pk), pk = 0, c.return());
                pk && (pk = 0, zk());
                c.h = 0;
            });
        }, 100));
    }
    Ck.prototype.isReady = function() {
        !this.config_ && Mh() && (this.config_ = th());
        return !!this.config_;
    };
    var Ek = [
        {
            Ca: function Ca(a) {
                return "Cannot read property '" + a.key + "'";
            },
            ra: {
                Error: [
                    {
                        regexp: /(Permission denied) to access property "([^']+)"/,
                        groups: [
                            "reason",
                            "key"
                        ]
                    }
                ],
                TypeError: [
                    {
                        regexp: /Cannot read property '([^']+)' of (null|undefined)/,
                        groups: [
                            "key",
                            "value"
                        ]
                    },
                    {
                        regexp: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
                        groups: [
                            "value",
                            "key"
                        ]
                    },
                    {
                        regexp: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
                        groups: [
                            "value",
                            "key"
                        ]
                    },
                    {
                        regexp: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
                        groups: [
                            "key"
                        ]
                    },
                    {
                        regexp: /Unable to get property '([^']+)' of (undefined or null) reference/,
                        groups: [
                            "key",
                            "value"
                        ]
                    },
                    {
                        regexp: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
                        groups: [
                            "value",
                            "base",
                            "key"
                        ]
                    }
                ]
            }
        },
        {
            Ca: function Ca(a) {
                return "Cannot call '" + a.key + "'";
            },
            ra: {
                TypeError: [
                    {
                        regexp: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
                        groups: [
                            "base",
                            "key"
                        ]
                    },
                    {
                        regexp: /([^ ]+) called on (null or undefined)/,
                        groups: [
                            "key",
                            "value"
                        ]
                    },
                    {
                        regexp: /Object (.*) has no method '([^ ]+)'/,
                        groups: [
                            "base",
                            "key"
                        ]
                    },
                    {
                        regexp: /Object doesn't support property or method '([^ ]+)'/,
                        groups: [
                            "key"
                        ]
                    },
                    {
                        regexp: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
                        groups: [
                            "key"
                        ]
                    },
                    {
                        regexp: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
                        groups: [
                            "key"
                        ]
                    }
                ]
            }
        },
        {
            Ca: function Ca(a) {
                return a.key + " is not defined";
            },
            ra: {
                ReferenceError: [
                    {
                        regexp: /(.*) is not defined/,
                        groups: [
                            "key"
                        ]
                    },
                    {
                        regexp: /Can't find variable: (.*)/,
                        groups: [
                            "key"
                        ]
                    }
                ]
            }
        }
    ];
    var Gk = {
        V: [],
        U: [
            {
                fb: Fk,
                weight: 500
            }
        ]
    };
    var Ik;
    var Kk = new K();
    var Qk = new Set(), Rk = 0, Sk = 0, Tk = 0, Uk = [], Vk = [
        "PhantomJS",
        "Googlebot",
        "TO STOP THIS SECURITY SCAN go/scan"
    ];
    var Wk = {};
    var Yk = {}, Zk = [], Ue = new K(), $k = {};
    var gl = null;
    n = hl.prototype;
    n.setSize = function(a, b) {
        this.h.width = a.toString();
        this.h.height = b.toString();
        return this;
    };
    n.getIframe = function() {
        return this.h;
    };
    n.Ha = function(a) {
        il(this, a.event, a);
    };
    n.addEventListener = function(a, b) {
        var c = b;
        "string" === typeof b && (c = function c() {
            window[b].apply(window, arguments);
        });
        if (!c) return this;
        this.l.subscribe(a, c);
        jl(this, a);
        return this;
    };
    n.destroy = function() {
        this.h && this.h.id && (Yk[this.h.id] = null);
        var a = this.l;
        a && "function" == typeof a.dispose && a.dispose();
        if (this.m) {
            a = this.h;
            var b = a.parentNode;
            b && b.replaceChild(this.m, a);
        } else (a = this.h) && a.parentNode && a.parentNode.removeChild(a);
        gl && (gl[this.id] = null);
        this.i = null;
        a = this.h;
        for(var c in eb)eb[c][0] == a && dg(c);
        this.m = this.h = null;
    };
    n.Ka = function() {
        return {};
    };
    n.Ta = function() {
        this.h && this.h.contentWindow ? this.sendMessage({
            event: "listening"
        }) : window.clearInterval(this.j);
    };
    n.setup = function(a, b) {
        var c = document;
        if (a = "string" === typeof a ? c.getElementById(a) : a) {
            if (c = "iframe" === a.tagName.toLowerCase(), b.host || (b.host = c ? Db(a.src) : "https://www.youtube.com"), this.i = new dl(b), c || (b = ml(this, a), this.m = a, (c = a.parentNode) && c.replaceChild(b, a), a = b), this.h = a, this.h.id || (this.h.id = "widget" + Na(this.h)), Yk[this.h.id] = this, window.postMessage) {
                this.l = new K();
                nl(this);
                b = el(this.i, "events");
                for(var d in b)b.hasOwnProperty(d) && this.addEventListener(d, b[d]);
                for(var e in $k)$k.hasOwnProperty(e) && kl(this, e);
            }
        }
    };
    n.sendMessage = function(a) {
        a.id = this.id;
        a.channel = "widget";
        a = Be(a);
        var b = [
            Db(this.h.src || "").replace("http:", "https:")
        ];
        if (this.h.contentWindow) for(var c = 0; c < b.length; c++)try {
            this.h.contentWindow.postMessage(a, b[c]);
        } catch (A) {
            if (A.name && "SyntaxError" === A.name) {
                if (!(A.message && 0 < A.message.indexOf("target origin ''"))) {
                    var d = void 0, e = A;
                    d = void 0 === d ? {} : d;
                    d.name = L("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
                    d.version = L("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0);
                    var f = d || {};
                    d = "WARNING";
                    d = void 0 === d ? "ERROR" : d;
                    if (e) {
                        e.hasOwnProperty("level") && e.level && (d = e.level);
                        if (N("console_log_js_exceptions")) {
                            var g = e, h = [];
                            h.push("Name: " + g.name);
                            h.push("Message: " + g.message);
                            g.hasOwnProperty("params") && h.push("Error Params: " + JSON.stringify(g.params));
                            g.hasOwnProperty("args") && h.push("Error args: " + JSON.stringify(g.args));
                            h.push("File name: " + g.fileName);
                            h.push("Stacktrace: " + g.stack);
                            window.console.log(h.join("\n"), g);
                        }
                        if (!(5 <= Rk)) {
                            g = void 0;
                            var k = f, l = ld(e);
                            f = l.message || "Unknown Error";
                            h = l.name || "UnknownError";
                            var m = l.stack || e.i || "Not available";
                            if (m.startsWith(h + ": " + f)) {
                                var p = m.split("\n");
                                p.shift();
                                m = p.join("\n");
                            }
                            p = l.lineNumber || "Not available";
                            l = l.fileName || "Not available";
                            var t = 0;
                            if (e.hasOwnProperty("args") && e.args && e.args.length) for(g = 0; g < e.args.length && !(t = Nk(e.args[g], "params." + g, k, t), 500 <= t); g++);
                            else if (e.hasOwnProperty("params") && e.params) {
                                var q = e.params;
                                if ("object" === typeof e.params) {
                                    for(g in q)if (q[g]) {
                                        var x = "params." + g, y = Pk(q[g]);
                                        k[x] = y;
                                        t += x.length + y.length;
                                        if (500 < t) break;
                                    }
                                } else k.params = Pk(q);
                            }
                            if (Uk.length) for(g = 0; g < Uk.length && !(t = Nk(Uk[g], "params.context." + g, k, t), 500 <= t); g++);
                            navigator.vendor && !k.hasOwnProperty("vendor") && (k["device.vendor"] = navigator.vendor);
                            g = {
                                message: f,
                                name: h,
                                lineNumber: p,
                                fileName: l,
                                stack: m,
                                params: k,
                                sampleWeight: 1
                            };
                            f = Number(e.columnNumber);
                            isNaN(f) || (g.lineNumber = g.lineNumber + ":" + f);
                            if ("IGNORED" === e.level) e = 0;
                            else a: {
                                e = Jk();
                                f = u(e.V);
                                for(h = f.next(); !h.done; h = f.next())if (h = h.value, g.message && g.message.match(h.Pb)) {
                                    e = h.weight;
                                    break a;
                                }
                                e = u(e.U);
                                for(f = e.next(); !f.done; f = e.next())if (f = f.value, f.fb(g)) {
                                    e = f.weight;
                                    break a;
                                }
                                e = 1;
                            }
                            g.sampleWeight = e;
                            e = g;
                            g = u(Ek);
                            for(f = g.next(); !f.done; f = g.next())if (f = f.value, f.ra[e.name]) {
                                for(p = u(f.ra[e.name]), h = p.next(); !h.done; h = p.next())if (l = h.value, h = e.message.match(l.regexp)) {
                                    e.params["params.error.original"] = h[0];
                                    p = l.groups;
                                    l = {};
                                    for(m = 0; m < p.length; m++)l[p[m]] = h[m + 1], e.params["params.error." + p[m]] = h[m + 1];
                                    e.message = f.Ca(l);
                                    break;
                                }
                            }
                            e.params || (e.params = {});
                            g = Jk();
                            e.params["params.errorServiceSignature"] = "msg=" + g.V.length + "&cb=" + g.U.length;
                            e.params["params.serviceWorker"] = "false";
                            B.document && B.document.querySelectorAll && (e.params["params.fscripts"] = String(document.querySelectorAll("script:not([nonce])").length));
                            lb("sample").constructor !== kb && (e.params["params.fconst"] = "true");
                            window.yterr && "function" === typeof window.yterr && window.yterr(e);
                            if (0 !== e.sampleWeight && !Qk.has(e.message)) {
                                "ERROR" === d ? (Kk.ca("handleError", e), N("record_app_crashed_web") && 0 === Tk && 1 === e.sampleWeight && (Tk++, g = {
                                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                                }, N("report_client_error_with_app_crash_ks") || (g.systemHealth = {
                                    crashData: {
                                        clientError: {
                                            logMessage: {
                                                message: e.message
                                            }
                                        }
                                    }
                                }), Dk("appCrashed", g)), Sk++) : "WARNING" === d && Kk.ca("handleWarning", e);
                                if (N("kevlar_gel_error_routing")) {
                                    g = d;
                                    f = e;
                                    b: {
                                        h = u(Vk);
                                        for(p = h.next(); !p.done; p = h.next())if ((l = wb()) && 0 <= l.toLowerCase().indexOf(p.value.toLowerCase())) {
                                            h = !0;
                                            break b;
                                        }
                                        h = !1;
                                    }
                                    if (h) f = void 0;
                                    else {
                                        p = {
                                            stackTrace: f.stack
                                        };
                                        f.fileName && (p.filename = f.fileName);
                                        h = f.lineNumber && f.lineNumber.split ? f.lineNumber.split(":") : [];
                                        0 !== h.length && (1 !== h.length || isNaN(Number(h[0])) ? 2 !== h.length || isNaN(Number(h[0])) || isNaN(Number(h[1])) || (p.lineNumber = Number(h[0]), p.columnNumber = Number(h[1])) : p.lineNumber = Number(h[0]));
                                        h = {
                                            level: "ERROR_LEVEL_UNKNOWN",
                                            message: f.message,
                                            errorClassName: f.name,
                                            sampleWeight: f.sampleWeight
                                        };
                                        "ERROR" === g ? h.level = "ERROR_LEVEL_ERROR" : "WARNING" === g && (h.level = "ERROR_LEVEL_WARNNING");
                                        p = {
                                            isObfuscated: !0,
                                            browserStackInfo: p
                                        };
                                        l = {
                                            pageUrl: window.location.href,
                                            kvPairs: []
                                        };
                                        L("FEXP_EXPERIMENTS") && (l.experimentIds = L("FEXP_EXPERIMENTS"));
                                        m = Tf();
                                        k = (k = Mf.EXPERIMENT_FLAGS) ? k.web_disable_gel_stp_ecatcher_killswitch : void 0;
                                        if (!k && m) for(t = u(Object.keys(m)), k = t.next(); !k.done; k = t.next())k = k.value, l.kvPairs.push({
                                            key: k,
                                            value: String(m[k])
                                        });
                                        if (f = f.params) for(m = u(Object.keys(f)), k = m.next(); !k.done; k = m.next())k = k.value, l.kvPairs.push({
                                            key: "client." + k,
                                            value: String(f[k])
                                        });
                                        f = L("SERVER_NAME", void 0);
                                        m = L("SERVER_VERSION", void 0);
                                        f && m && (l.kvPairs.push({
                                            key: "server.name",
                                            value: f
                                        }), l.kvPairs.push({
                                            key: "server.version",
                                            value: m
                                        }));
                                        f = {
                                            errorMetadata: l,
                                            stackTrace: p,
                                            logMessage: h
                                        };
                                    }
                                    f && (Dk("clientError", f), ("ERROR" === g || N("errors_flush_gel_always_killswitch")) && nh());
                                }
                                if (!N("suppress_error_204_logging")) {
                                    f = e;
                                    g = f.params || {};
                                    d = {
                                        urlParams: {
                                            a: "logerror",
                                            t: "jserror",
                                            type: f.name,
                                            msg: f.message.substr(0, 250),
                                            line: f.lineNumber,
                                            level: d,
                                            "client.name": g.name
                                        },
                                        postParams: {
                                            url: L("PAGE_NAME", window.location.href),
                                            file: f.fileName
                                        },
                                        method: "POST"
                                    };
                                    g.version && (d["client.version"] = g.version);
                                    if (d.postParams) {
                                        f.stack && (d.postParams.stack = f.stack);
                                        f = u(Object.keys(g));
                                        for(h = f.next(); !h.done; h = f.next())h = h.value, d.postParams["client." + h] = g[h];
                                        if (g = Tf()) for(f = u(Object.keys(g)), h = f.next(); !h.done; h = f.next())h = h.value, d.postParams[h] = g[h];
                                        g = L("SERVER_NAME", void 0);
                                        f = L("SERVER_VERSION", void 0);
                                        g && f && (d.postParams["server.name"] = g, d.postParams["server.version"] = f);
                                    }
                                    Ng(L("ECATCHER_REPORT_HOST", "") + "/error_204", d);
                                }
                                try {
                                    Qk.add(e.message);
                                } catch (M) {}
                                Rk++;
                            }
                        }
                    }
                }
            } else throw A;
        }
        else console && console.warn && console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events");
    };
    v(ql, hl);
    n = ql.prototype;
    n.Ka = function() {
        var a = el(this.i, "playerVars");
        if (a) {
            var b = {}, c;
            for(c in a)b[c] = a[c];
            a = b;
        } else a = {};
        window !== window.top && document.referrer && (a.widget_referrer = document.referrer.substring(0, 256));
        if (c = el(this.i, "embedConfig")) {
            if (Ma(c)) try {
                c = JSON.stringify(c);
            } catch (d) {
                console.error("Invalid embed config JSON", d);
            }
            a.embed_config = c;
        }
        return a;
    };
    n.Ha = function(a) {
        var b = a.event;
        a = a.info;
        switch(b){
            case "apiInfoDelivery":
                if (Ma(a)) for(var c in a)a.hasOwnProperty(c) && (this.M[c] = a[c]);
                break;
            case "infoDelivery":
                rl(this, a);
                break;
            case "initialDelivery":
                Ma(a) && (window.clearInterval(this.j), this.playerInfo = {}, this.M = {}, sl(this, a.apiInterface), rl(this, a));
                break;
            default:
                il(this, b, a);
        }
    };
    n.getVideoEmbedCode = function() {
        var a = el(this.i, "host") + ("/embed/" + el(this.i, "videoId")), b = Number(el(this.i, "width")), c = Number(el(this.i, "height"));
        if (isNaN(b) || isNaN(c)) throw Error("Invalid width or height property");
        b = Math.floor(b);
        c = Math.floor(c);
        vb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(pb, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(qb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(rb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(sb, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(tb, "&#39;")), -1 != a.indexOf("\0") && (a = a.replace(ub, "&#0;")));
        return '<iframe width="' + b + '" height="' + c + '" src="' + a + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    };
    n.getOptions = function(a) {
        return this.M.namespaces ? a ? this.M[a] ? this.M[a].options || [] : [] : this.M.namespaces || [] : [];
    };
    n.getOption = function(a, b) {
        if (this.M.namespaces && a && b && this.M[a]) return this.M[a][b];
    };
    D("YT.PlayerState.UNSTARTED", -1);
    D("YT.PlayerState.ENDED", 0);
    D("YT.PlayerState.PLAYING", 1);
    D("YT.PlayerState.PAUSED", 2);
    D("YT.PlayerState.BUFFERING", 3);
    D("YT.PlayerState.CUED", 5);
    D("YT.get", function(a) {
        return Yk[a];
    });
    D("YT.scan", al);
    D("YT.subscribe", function(a, b, c) {
        Ue.subscribe(a, b, c);
        $k[a] = !0;
        for(var d in Yk)Yk.hasOwnProperty(d) && kl(Yk[d], a);
    });
    D("YT.unsubscribe", function(a, b, c) {
        Te(a, b, c);
    });
    D("YT.Player", ql);
    hl.prototype.destroy = hl.prototype.destroy;
    hl.prototype.setSize = hl.prototype.setSize;
    hl.prototype.getIframe = hl.prototype.getIframe;
    hl.prototype.addEventListener = hl.prototype.addEventListener;
    ql.prototype.getVideoEmbedCode = ql.prototype.getVideoEmbedCode;
    ql.prototype.getOptions = ql.prototype.getOptions;
    ql.prototype.getOption = ql.prototype.getOption;
    Zk.push(function(a) {
        var b = a;
        b || (b = document);
        a = ab(b.getElementsByTagName("yt:player"));
        var c = b || document;
        if (c.querySelectorAll && c.querySelector) b = c.querySelectorAll(".yt-player");
        else {
            var d;
            c = document;
            b = b || c;
            if (b.querySelectorAll && b.querySelector) b = b.querySelectorAll(".yt-player");
            else if (b.getElementsByClassName) {
                var e = b.getElementsByClassName("yt-player");
                b = e;
            } else {
                e = b.getElementsByTagName("*");
                var f = {};
                for(c = d = 0; b = e[c]; c++){
                    var g = b.className, h;
                    if (h = "function" == typeof g.split) h = 0 <= Xa(g.split(/\s+/), "yt-player");
                    h && (f[d++] = b);
                }
                f.length = d;
                b = f;
            }
        }
        b = ab(b);
        F($a(a, b), tl);
    });
    "undefined" != typeof YTConfig && YTConfig.parsetags && "onload" != YTConfig.parsetags || al();
    var ul = B.onYTReady;
    ul && ul();
    var vl = B.onYouTubeIframeAPIReady;
    vl && vl();
    var wl = B.onYouTubePlayerAPIReady;
    wl && wl();
}).call(this);

