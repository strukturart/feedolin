function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var XMLParser;
(function() {
    var t = {
        696: function(t) {
            var e = /^[-+]?0x[a-fA-F0-9]+$/, r = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
            !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
            var n = {
                hex: !0,
                leadingZeros: !0,
                decimalPoint: ".",
                eNotation: !0
            };
            t.exports = function(t) {
                var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                if (i = Object.assign({}, n, i), !t || "string" != typeof t) return t;
                var a = t.trim();
                if (void 0 !== i.skipLike && i.skipLike.test(a)) return t;
                if (i.hex && e.test(a)) return Number.parseInt(a, 16);
                {
                    var e1 = r.exec(a);
                    if (e1) {
                        var r1 = e1[1], n1 = e1[2];
                        var o = (s1 = e1[3]) && -1 !== s1.indexOf(".") ? ("." === (s1 = s1.replace(/0+$/, "")) ? s1 = "0" : "." === s1[0] ? s1 = "0" + s1 : "." === s1[s1.length - 1] && (s1 = s1.substr(0, s1.length - 1)), s1) : s1;
                        var l = e1[4] || e1[6];
                        if (!i.leadingZeros && n1.length > 0 && r1 && "." !== a[2]) return t;
                        if (!i.leadingZeros && n1.length > 0 && !r1 && "." !== a[1]) return t;
                        {
                            var e2 = Number(a), s = "" + e2;
                            return -1 !== s.search(/[eE]/) || l ? i.eNotation ? e2 : t : -1 !== a.indexOf(".") ? "0" === s && "" === o || s === o || r1 && s === "-" + o ? e2 : t : n1 ? o === s || r1 + o === s ? e2 : t : a === s || a === r1 + s ? e2 : t;
                        }
                    }
                    return t;
                }
                var s1;
            };
        },
        470: function(t) {
            var e = function e(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for(var r = 0, n = new Array(e); r < e; r++)n[r] = t[r];
                return n;
            };
            t.exports = function(t) {
                return "function" == typeof t ? t : Array.isArray(t) ? function(r) {
                    for(var n, i = function(t, r) {
                        var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                        if (n) return (n = n.call(t)).next.bind(n);
                        if (Array.isArray(t) || (n = function(t, r) {
                            if (t) {
                                if ("string" == typeof t) return e(t, r);
                                var n = Object.prototype.toString.call(t).slice(8, -1);
                                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e(t, r) : void 0;
                            }
                        }(t)) || r && t && "number" == typeof t.length) {
                            n && (t = n);
                            var i = 0;
                            return function() {
                                return i >= t.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: t[i++]
                                };
                            };
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }(t); !(n = i()).done;){
                        var a = n.value;
                        if ("string" == typeof a && r === a) return !0;
                        if (a instanceof RegExp && a.test(r)) return !0;
                    }
                } : function() {
                    return !1;
                };
            };
        },
        825: function(t, e) {
            "use strict";
            var r = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", n = "[" + r + "][" + r + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*", i = new RegExp("^" + n + "$");
            e.isExist = function(t) {
                return void 0 !== t;
            }, e.isEmptyObject = function(t) {
                return 0 === Object.keys(t).length;
            }, e.merge = function(t, e, r) {
                if (e) for(var n = Object.keys(e), i = n.length, a = 0; a < i; a++)t[n[a]] = "strict" === r ? [
                    e[n[a]]
                ] : e[n[a]];
            }, e.getValue = function(t) {
                return e.isExist(t) ? t : "";
            }, e.isName = function(t) {
                return !(null == i.exec(t));
            }, e.getAllMatches = function(t, e) {
                for(var r = [], n = e.exec(t); n;){
                    var i = [];
                    i.startIndex = e.lastIndex - n[0].length;
                    for(var a = n.length, s = 0; s < a; s++)i.push(n[s]);
                    r.push(i), n = e.exec(t);
                }
                return r;
            }, e.nameRegexp = n;
        },
        631: function(t, e, r) {
            "use strict";
            var a = function a(t) {
                return " " === t || "	" === t || "\n" === t || "\r" === t;
            };
            var s = function s(t, e) {
                for(var _$r = e; e < t.length; e++)if ("?" != t[e] && " " != t[e]) ;
                else {
                    var n = t.substr(_$r, e - _$r);
                    if (e > 5 && "xml" === n) return p("InvalidXml", "XML declaration allowed only at the start of the document.", v(t, e));
                    if ("?" == t[e] && ">" == t[e + 1]) {
                        e++;
                        break;
                    }
                }
                return e;
            };
            var o = function o(t, e) {
                if (t.length > e + 5 && "-" === t[e + 1] && "-" === t[e + 2]) {
                    for(e += 3; e < t.length; e++)if ("-" === t[e] && "-" === t[e + 1] && ">" === t[e + 2]) {
                        e += 2;
                        break;
                    }
                } else if (t.length > e + 8 && "D" === t[e + 1] && "O" === t[e + 2] && "C" === t[e + 3] && "T" === t[e + 4] && "Y" === t[e + 5] && "P" === t[e + 6] && "E" === t[e + 7]) {
                    var _$r = 1;
                    for(e += 8; e < t.length; e++)if ("<" === t[e]) _$r++;
                    else if (">" === t[e] && 0 == --_$r) break;
                } else if (t.length > e + 9 && "[" === t[e + 1] && "C" === t[e + 2] && "D" === t[e + 3] && "A" === t[e + 4] && "T" === t[e + 5] && "A" === t[e + 6] && "[" === t[e + 7]) {
                    for(e += 8; e < t.length; e++)if ("]" === t[e] && "]" === t[e + 1] && ">" === t[e + 2]) {
                        e += 2;
                        break;
                    }
                }
                return e;
            };
            var f = function f(t, e) {
                for(var _$r = "", n = "", i = !1; e < t.length; e++){
                    if (t[e] === l || t[e] === u) "" === n ? n = t[e] : n !== t[e] || (n = "");
                    else if (">" === t[e] && "" === n) {
                        i = !0;
                        break;
                    }
                    _$r += t[e];
                }
                return "" === n && {
                    value: _$r,
                    index: e,
                    tagClosed: i
                };
            };
            var d = function d(t, e) {
                for(var _$r = n.getAllMatches(t, g), i = {}, a = 0; a < _$r.length; a++){
                    if (0 === _$r[a][1].length) return p("InvalidAttr", "Attribute '" + _$r[a][2] + "' has no space in starting.", m(_$r[a]));
                    if (void 0 !== _$r[a][3] && void 0 === _$r[a][4]) return p("InvalidAttr", "Attribute '" + _$r[a][2] + "' is without value.", m(_$r[a]));
                    if (void 0 === _$r[a][3] && !e.allowBooleanAttributes) return p("InvalidAttr", "boolean attribute '" + _$r[a][2] + "' is not allowed.", m(_$r[a]));
                    var s = _$r[a][2];
                    if (!c(s)) return p("InvalidAttr", "Attribute '" + s + "' is an invalid name.", m(_$r[a]));
                    if (i.hasOwnProperty(s)) return p("InvalidAttr", "Attribute '" + s + "' is repeated.", m(_$r[a]));
                    i[s] = 1;
                }
                return !0;
            };
            var h = function h(t, e) {
                if (";" === t[++e]) return -1;
                if ("#" === t[e]) return function(t, e) {
                    var _$r = /\d/;
                    for("x" === t[e] && (e++, _$r = /[\da-fA-F]/); e < t.length; e++){
                        if (";" === t[e]) return e;
                        if (!t[e].match(_$r)) break;
                    }
                    return -1;
                }(t, ++e);
                for(var _$r = 0; e < t.length; e++, _$r++)if (!(t[e].match(/\w/) && _$r < 20)) {
                    if (";" === t[e]) break;
                    return -1;
                }
                return e;
            };
            var p = function p(t, e, r) {
                return {
                    err: {
                        code: t,
                        msg: e,
                        line: r.line || r,
                        col: r.col
                    }
                };
            };
            var c = function c(t) {
                return n.isName(t);
            };
            var v = function v(t, e) {
                var _$r = t.substring(0, e).split(/\r?\n/);
                return {
                    line: _$r.length,
                    col: _$r[_$r.length - 1].length + 1
                };
            };
            var m = function m(t) {
                return t.startIndex + t[1].length;
            };
            var n = r(825), i = {
                allowBooleanAttributes: !1,
                unpairedTags: []
            };
            e.validate = function(t, e) {
                e = Object.assign({}, i, e);
                var _$r, l = [], u = !1, g = !1;
                "\uFEFF" === t[0] && (t = t.substr(1));
                for(var c = 0; c < t.length; c++)if ("<" === t[c] && "?" === t[c + 1]) {
                    if ((c = s(t, c += 2)).err) return c;
                } else {
                    if ("<" !== t[c]) {
                        if (a(t[c])) continue;
                        return p("InvalidChar", "char '" + t[c] + "' is not expected.", v(t, c));
                    }
                    var m = c;
                    if ("!" === t[++c]) {
                        c = o(t, c);
                        continue;
                    }
                    var x = !1;
                    "/" === t[c] && (x = !0, c++);
                    for(var b = ""; c < t.length && ">" !== t[c] && " " !== t[c] && "	" !== t[c] && "\n" !== t[c] && "\r" !== t[c]; c++)b += t[c];
                    if ("/" === (b = b.trim())[b.length - 1] && (b = b.substring(0, b.length - 1), c--), _$r = b, !n.isName(_$r)) return p("InvalidTag", 0 === b.trim().length ? "Invalid space after '<'." : "Tag '" + b + "' is an invalid name.", v(t, c));
                    var N = f(t, c);
                    if (!1 === N) return p("InvalidAttr", "Attributes for '" + b + "' have open quote.", v(t, c));
                    var E = N.value;
                    if (c = N.index, "/" === E[E.length - 1]) {
                        var y = c - E.length, T = d(E = E.substring(0, E.length - 1), e);
                        if (!0 !== T) return p(T.err.code, T.err.msg, v(t, y + T.err.line));
                        u = !0;
                    } else if (x) {
                        if (!N.tagClosed) return p("InvalidTag", "Closing tag '" + b + "' doesn't have proper closing.", v(t, c));
                        if (E.trim().length > 0) return p("InvalidTag", "Closing tag '" + b + "' can't have attributes or invalid starting.", v(t, m));
                        if (0 === l.length) return p("InvalidTag", "Closing tag '" + b + "' has not been opened.", v(t, m));
                        var w = l.pop();
                        if (b !== w.tagName) {
                            var O = v(t, w.tagStartPos);
                            return p("InvalidTag", "Expected closing tag '" + w.tagName + "' (opened in line " + O.line + ", col " + O.col + ") instead of closing tag '" + b + "'.", v(t, m));
                        }
                        0 == l.length && (g = !0);
                    } else {
                        var A = d(E, e);
                        if (!0 !== A) return p(A.err.code, A.err.msg, v(t, c - E.length + A.err.line));
                        if (!0 === g) return p("InvalidXml", "Multiple possible root nodes found.", v(t, c));
                        -1 !== e.unpairedTags.indexOf(b) || l.push({
                            tagName: b,
                            tagStartPos: m
                        }), u = !0;
                    }
                    for(c++; c < t.length; c++)if ("<" === t[c]) {
                        if ("!" === t[c + 1]) {
                            c = o(t, ++c);
                            continue;
                        }
                        if ("?" !== t[c + 1]) break;
                        if ((c = s(t, ++c)).err) return c;
                    } else if ("&" === t[c]) {
                        var I = h(t, c);
                        if (-1 == I) return p("InvalidChar", "char '&' is not expected.", v(t, c));
                        c = I;
                    } else if (!0 === g && !a(t[c])) return p("InvalidXml", "Extra text at the end", v(t, c));
                    "<" === t[c] && c--;
                }
                return u ? 1 == l.length ? p("InvalidTag", "Unclosed tag '" + l[0].tagName + "'.", v(t, l[0].tagStartPos)) : !(l.length > 0) || p("InvalidXml", "Invalid '" + JSON.stringify(l.map(function(t) {
                    return t.tagName;
                }), null, 4).replace(/\r?\n/g, "") + "' found.", {
                    line: 1,
                    col: 1
                }) : p("InvalidXml", "Start tag expected.", 1);
            };
            var l = '"', u = "'";
            var g = new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");
        },
        785: function(t, e, r) {
            var i = function i(t, e) {
                for(var _$r = ""; e < t.length && "'" !== t[e] && '"' !== t[e]; e++)_$r += t[e];
                if (-1 !== (_$r = _$r.trim()).indexOf(" ")) throw new Error("External entites are not supported");
                for(var n = t[e++], i = ""; e < t.length && t[e] !== n; e++)i += t[e];
                return [
                    _$r,
                    i,
                    e
                ];
            };
            var a = function a(t, e) {
                return "!" === t[e + 1] && "-" === t[e + 2] && "-" === t[e + 3];
            };
            var s = function s(t, e) {
                return "!" === t[e + 1] && "E" === t[e + 2] && "N" === t[e + 3] && "T" === t[e + 4] && "I" === t[e + 5] && "T" === t[e + 6] && "Y" === t[e + 7];
            };
            var o = function o(t, e) {
                return "!" === t[e + 1] && "E" === t[e + 2] && "L" === t[e + 3] && "E" === t[e + 4] && "M" === t[e + 5] && "E" === t[e + 6] && "N" === t[e + 7] && "T" === t[e + 8];
            };
            var l = function l(t, e) {
                return "!" === t[e + 1] && "A" === t[e + 2] && "T" === t[e + 3] && "T" === t[e + 4] && "L" === t[e + 5] && "I" === t[e + 6] && "S" === t[e + 7] && "T" === t[e + 8];
            };
            var u = function u(t, e) {
                return "!" === t[e + 1] && "N" === t[e + 2] && "O" === t[e + 3] && "T" === t[e + 4] && "A" === t[e + 5] && "T" === t[e + 6] && "I" === t[e + 7] && "O" === t[e + 8] && "N" === t[e + 9];
            };
            var f = function f(t) {
                if (n.isName(t)) return t;
                throw new Error("Invalid entity name " + t);
            };
            var n = r(825);
            t.exports = function(t, e) {
                var _$r = {};
                if ("O" !== t[e + 3] || "C" !== t[e + 4] || "T" !== t[e + 5] || "Y" !== t[e + 6] || "P" !== t[e + 7] || "E" !== t[e + 8]) throw new Error("Invalid Tag instead of DOCTYPE");
                e += 9;
                for(var n = 1, g = !1, d = !1; e < t.length; e++)if ("<" !== t[e] || d) {
                    if (">" === t[e]) {
                        if (d ? "-" === t[e - 1] && "-" === t[e - 2] && (d = !1, n--) : n--, 0 === n) break;
                    } else "[" === t[e] ? g = !0 : t[e];
                } else {
                    if (g && s(t, e)) {
                        var h = i(t, (e += 7) + 1);
                        entityName = h[0], val = h[1], e = h[2], -1 === val.indexOf("&") && (_$r[f(entityName)] = {
                            regx: RegExp("&" + entityName + ";", "g"),
                            val: val
                        });
                    } else if (g && o(t, e)) e += 8;
                    else if (g && l(t, e)) e += 8;
                    else if (g && u(t, e)) e += 9;
                    else {
                        if (!a) throw new Error("Invalid DOCTYPE");
                        d = !0;
                    }
                    n++;
                }
                if (0 !== n) throw new Error("Unclosed DOCTYPE");
                return {
                    entities: _$r,
                    i: e
                };
            };
        },
        7: function(t, e) {
            var r = {
                preserveOrder: !1,
                attributeNamePrefix: "@_",
                attributesGroupName: !1,
                textNodeName: "#text",
                ignoreAttributes: !0,
                removeNSPrefix: !1,
                allowBooleanAttributes: !1,
                parseTagValue: !0,
                parseAttributeValue: !1,
                trimValues: !0,
                cdataPropName: !1,
                numberParseOptions: {
                    hex: !0,
                    leadingZeros: !0,
                    eNotation: !0
                },
                tagValueProcessor: function tagValueProcessor(t, e) {
                    return e;
                },
                attributeValueProcessor: function attributeValueProcessor(t, e) {
                    return e;
                },
                stopNodes: [],
                alwaysCreateTextNode: !1,
                isArray: function isArray() {
                    return !1;
                },
                commentPropName: !1,
                unpairedTags: [],
                processEntities: !0,
                htmlEntities: !1,
                ignoreDeclaration: !1,
                ignorePiTags: !1,
                transformTagName: !1,
                transformAttributeName: !1,
                updateTag: function updateTag(t, e, r) {
                    return t;
                }
            };
            e.buildOptions = function(t) {
                return Object.assign({}, r, t);
            }, e.defaultOptions = r;
        },
        731: function(t, e, r) {
            "use strict";
            var l = function l(t) {
                for(var e = Object.keys(t), _$r = 0; _$r < e.length; _$r++){
                    var n = e[_$r];
                    this.lastEntities[n] = {
                        regex: new RegExp("&" + n + ";", "g"),
                        val: t[n]
                    };
                }
            };
            var u = function u(t, e, r, n, i, a, s) {
                if (void 0 !== t && (this.options.trimValues && !n && (t = t.trim()), t.length > 0)) {
                    s || (t = this.replaceEntitiesValue(t));
                    var o = this.options.tagValueProcessor(e, t, r, i, a);
                    return null == o ? t : (typeof o === "undefined" ? "undefined" : _type_of(o)) != (typeof t === "undefined" ? "undefined" : _type_of(t)) || o !== t ? o : this.options.trimValues || t.trim() === t ? E(t, this.options.parseTagValue, this.options.numberParseOptions) : t;
                }
            };
            var f = function f(t) {
                if (this.options.removeNSPrefix) {
                    var e = t.split(":"), _$r = "/" === t.charAt(0) ? "/" : "";
                    if ("xmlns" === e[0]) return "";
                    2 === e.length && (t = _$r + e[1]);
                }
                return t;
            };
            var d = function d(t, e, r) {
                if (!0 !== this.options.ignoreAttributes && "string" == typeof t) {
                    for(var i = n.getAllMatches(t, g), a = i.length, s = {}, o = 0; o < a; o++){
                        var l = this.resolveNameSpace(i[o][1]);
                        if (!this.ignoreAttributesFn(l, e)) {
                            var u = i[o][4], f = this.options.attributeNamePrefix + l;
                            if (l.length) {
                                if (this.options.transformAttributeName && (f = this.options.transformAttributeName(f)), "__proto__" === f && (f = "#__proto__"), void 0 !== u) {
                                    this.options.trimValues && (u = u.trim()), u = this.replaceEntitiesValue(u);
                                    var d = this.options.attributeValueProcessor(l, u, e);
                                    s[f] = null == d ? u : (typeof d === "undefined" ? "undefined" : _type_of(d)) != (typeof u === "undefined" ? "undefined" : _type_of(u)) || d !== u ? d : E(u, this.options.parseAttributeValue, this.options.numberParseOptions);
                                } else this.options.allowBooleanAttributes && (s[f] = !0);
                            }
                        }
                    }
                    if (!Object.keys(s).length) return;
                    if (this.options.attributesGroupName) {
                        var h = {};
                        return h[this.options.attributesGroupName] = s, h;
                    }
                    return s;
                }
            };
            var p = function p(t, e, r) {
                var n = this.options.updateTag(e.tagname, r, e[":@"]);
                !1 === n || ("string" == typeof n ? (e.tagname = n, t.addChild(e)) : t.addChild(e));
            };
            var v = function v(t, e, r, n) {
                return t && (void 0 === n && (n = 0 === Object.keys(e.child).length), void 0 !== (t = this.parseTextData(t, e.tagname, r, !1, !!e[":@"] && 0 !== Object.keys(e[":@"]).length, n)) && "" !== t && e.add(this.options.textNodeName, t), t = ""), t;
            };
            var m = function m(t, e, r) {
                var n = "*." + r;
                for(var i in t){
                    var a = t[i];
                    if (n === a || e === a) return !0;
                }
                return !1;
            };
            var x = function x(t, e, r, n) {
                var i = t.indexOf(e, r);
                if (-1 === i) throw new Error(n);
                return i + e.length - 1;
            };
            var b = function b(t, e, r, n) {
                void 0 === n && (n = ">");
                var i = function(t, e, r) {
                    var _$n;
                    void 0 === r && (r = ">");
                    for(var i = "", a = e; a < t.length; a++){
                        var s = t[a];
                        if (_$n) s === _$n && (_$n = "");
                        else if ('"' === s || "'" === s) _$n = s;
                        else if (s === r[0]) {
                            if (!r[1]) return {
                                data: i,
                                index: a
                            };
                            if (t[a + 1] === r[1]) return {
                                data: i,
                                index: a
                            };
                        } else "	" === s && (s = " ");
                        i += s;
                    }
                }(t, e + 1, n);
                if (i) {
                    var a = i.data, s = i.index, o = a.search(/\s/), l = a, u = !0;
                    -1 !== o && (l = a.substring(0, o), a = a.substring(o + 1).trimStart());
                    var f = l;
                    if (r) {
                        var g = l.indexOf(":");
                        -1 !== g && (u = (l = l.substr(g + 1)) !== i.data.substr(g + 1));
                    }
                    return {
                        tagName: l,
                        tagExp: a,
                        closeIndex: s,
                        attrExpPresent: u,
                        rawTagName: f
                    };
                }
            };
            var N = function N(t, e, r) {
                for(var n = r, i = 1; r < t.length; r++)if ("<" === t[r]) {
                    if ("/" === t[r + 1]) {
                        var a = x(t, ">", r, e + " is not closed");
                        if (t.substring(r + 2, a).trim() === e && 0 == --i) return {
                            tagContent: t.substring(n, r),
                            i: a
                        };
                        r = a;
                    } else if ("?" === t[r + 1]) r = x(t, "?>", r + 1, "StopNode is not closed.");
                    else if ("!--" === t.substr(r + 1, 3)) r = x(t, "-->", r + 3, "StopNode is not closed.");
                    else if ("![" === t.substr(r + 1, 2)) r = x(t, "]]>", r, "StopNode is not closed.") - 2;
                    else {
                        var s = b(t, r, ">");
                        s && ((s && s.tagName) === e && "/" !== s.tagExp[s.tagExp.length - 1] && i++, r = s.closeIndex);
                    }
                }
            };
            var E = function E(t, e, r) {
                if (e && "string" == typeof t) {
                    var i = t.trim();
                    return "true" === i || "false" !== i && s(t, r);
                }
                return n.isExist(t) ? t : "";
            };
            var n = r(825), i = r(501), a = r(785), s = r(696), o = r(470);
            var g = new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
            var h = function h(t) {
                t = t.replace(/\r\n?/g, "\n");
                for(var e = new i("!xml"), _$r = e, n = "", s = "", o = 0; o < t.length; o++)if ("<" === t[o]) {
                    if ("/" === t[o + 1]) {
                        var l = x(t, ">", o, "Closing Tag is not closed."), u = t.substring(o + 2, l).trim();
                        if (this.options.removeNSPrefix) {
                            var f = u.indexOf(":");
                            -1 !== f && (u = u.substr(f + 1));
                        }
                        this.options.transformTagName && (u = this.options.transformTagName(u)), _$r && (n = this.saveTextToParentTag(n, _$r, s));
                        var g = s.substring(s.lastIndexOf(".") + 1);
                        if (u && -1 !== this.options.unpairedTags.indexOf(u)) throw new Error("Unpaired tag can not be used as closing tag: </" + u + ">");
                        var d = 0;
                        g && -1 !== this.options.unpairedTags.indexOf(g) ? (d = s.lastIndexOf(".", s.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : d = s.lastIndexOf("."), s = s.substring(0, d), _$r = this.tagsNodeStack.pop(), n = "", o = l;
                    } else if ("?" === t[o + 1]) {
                        var h = b(t, o, !1, "?>");
                        if (!h) throw new Error("Pi Tag is not closed.");
                        if (n = this.saveTextToParentTag(n, _$r, s), this.options.ignoreDeclaration && "?xml" === h.tagName || this.options.ignorePiTags) ;
                        else {
                            var p = new i(h.tagName);
                            p.add(this.options.textNodeName, ""), h.tagName !== h.tagExp && h.attrExpPresent && (p[":@"] = this.buildAttributesMap(h.tagExp, s, h.tagName)), this.addChild(_$r, p, s);
                        }
                        o = h.closeIndex + 1;
                    } else if ("!--" === t.substr(o + 1, 3)) {
                        var c = x(t, "-->", o + 4, "Comment is not closed.");
                        if (this.options.commentPropName) {
                            var v, m = t.substring(o + 4, c - 2);
                            n = this.saveTextToParentTag(n, _$r, s), _$r.add(this.options.commentPropName, [
                                (v = {}, v[this.options.textNodeName] = m, v)
                            ]);
                        }
                        o = c;
                    } else if ("!D" === t.substr(o + 1, 2)) {
                        var N = a(t, o);
                        this.docTypeEntities = N.entities, o = N.i;
                    } else if ("![" === t.substr(o + 1, 2)) {
                        var E = x(t, "]]>", o, "CDATA is not closed.") - 2, y = t.substring(o + 9, E);
                        n = this.saveTextToParentTag(n, _$r, s);
                        var T, w = this.parseTextData(y, _$r.tagname, s, !0, !1, !0, !0);
                        null == w && (w = ""), this.options.cdataPropName ? _$r.add(this.options.cdataPropName, [
                            (T = {}, T[this.options.textNodeName] = y, T)
                        ]) : _$r.add(this.options.textNodeName, w), o = E + 2;
                    } else {
                        var O = b(t, o, this.options.removeNSPrefix), A = O.tagName, I = O.rawTagName, P = O.tagExp, C = O.attrExpPresent, S = O.closeIndex;
                        this.options.transformTagName && (A = this.options.transformTagName(A)), _$r && n && "!xml" !== _$r.tagname && (n = this.saveTextToParentTag(n, _$r, s, !1));
                        var F = _$r;
                        if (F && -1 !== this.options.unpairedTags.indexOf(F.tagname) && (_$r = this.tagsNodeStack.pop(), s = s.substring(0, s.lastIndexOf("."))), A !== e.tagname && (s += s ? "." + A : A), this.isItStopNode(this.options.stopNodes, s, A)) {
                            var k = "";
                            if (P.length > 0 && P.lastIndexOf("/") === P.length - 1) "/" === A[A.length - 1] ? (A = A.substr(0, A.length - 1), s = s.substr(0, s.length - 1), P = A) : P = P.substr(0, P.length - 1), o = O.closeIndex;
                            else if (-1 !== this.options.unpairedTags.indexOf(A)) o = O.closeIndex;
                            else {
                                var _ = this.readStopNodeData(t, I, S + 1);
                                if (!_) throw new Error("Unexpected end of " + I);
                                o = _.i, k = _.tagContent;
                            }
                            var D = new i(A);
                            A !== P && C && (D[":@"] = this.buildAttributesMap(P, s, A)), k && (k = this.parseTextData(k, A, s, !0, C, !0, !0)), s = s.substr(0, s.lastIndexOf(".")), D.add(this.options.textNodeName, k), this.addChild(_$r, D, s);
                        } else {
                            if (P.length > 0 && P.lastIndexOf("/") === P.length - 1) {
                                "/" === A[A.length - 1] ? (A = A.substr(0, A.length - 1), s = s.substr(0, s.length - 1), P = A) : P = P.substr(0, P.length - 1), this.options.transformTagName && (A = this.options.transformTagName(A));
                                var j = new i(A);
                                A !== P && C && (j[":@"] = this.buildAttributesMap(P, s, A)), this.addChild(_$r, j, s), s = s.substr(0, s.lastIndexOf("."));
                            } else {
                                var V = new i(A);
                                this.tagsNodeStack.push(_$r), A !== P && C && (V[":@"] = this.buildAttributesMap(P, s, A)), this.addChild(_$r, V, s), _$r = V;
                            }
                            n = "", o = S;
                        }
                    }
                } else n += t[o];
                return e.child;
            };
            var c = function c(t) {
                if (this.options.processEntities) {
                    for(var e in this.docTypeEntities){
                        var _$r = this.docTypeEntities[e];
                        t = t.replace(_$r.regx, _$r.val);
                    }
                    for(var n in this.lastEntities){
                        var i = this.lastEntities[n];
                        t = t.replace(i.regex, i.val);
                    }
                    if (this.options.htmlEntities) for(var a in this.htmlEntities){
                        var s = this.htmlEntities[a];
                        t = t.replace(s.regex, s.val);
                    }
                    t = t.replace(this.ampEntity.regex, this.ampEntity.val);
                }
                return t;
            };
            t.exports = function(t) {
                this.options = t, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = {
                    apos: {
                        regex: /&(apos|#39|#x27);/g,
                        val: "'"
                    },
                    gt: {
                        regex: /&(gt|#62|#x3E);/g,
                        val: ">"
                    },
                    lt: {
                        regex: /&(lt|#60|#x3C);/g,
                        val: "<"
                    },
                    quot: {
                        regex: /&(quot|#34|#x22);/g,
                        val: '"'
                    }
                }, this.ampEntity = {
                    regex: /&(amp|#38|#x26);/g,
                    val: "&"
                }, this.htmlEntities = {
                    space: {
                        regex: /&(nbsp|#160);/g,
                        val: " "
                    },
                    cent: {
                        regex: /&(cent|#162);/g,
                        val: "\xa2"
                    },
                    pound: {
                        regex: /&(pound|#163);/g,
                        val: "\xa3"
                    },
                    yen: {
                        regex: /&(yen|#165);/g,
                        val: "\xa5"
                    },
                    euro: {
                        regex: /&(euro|#8364);/g,
                        val: "\u20AC"
                    },
                    copyright: {
                        regex: /&(copy|#169);/g,
                        val: "\xa9"
                    },
                    reg: {
                        regex: /&(reg|#174);/g,
                        val: "\xae"
                    },
                    inr: {
                        regex: /&(inr|#8377);/g,
                        val: "\u20B9"
                    },
                    num_dec: {
                        regex: /&#([0-9]{1,7});/g,
                        val: function val1(t, e) {
                            return String.fromCharCode(Number.parseInt(e, 10));
                        }
                    },
                    num_hex: {
                        regex: /&#x([0-9a-fA-F]{1,6});/g,
                        val: function val1(t, e) {
                            return String.fromCharCode(Number.parseInt(e, 16));
                        }
                    }
                }, this.addExternalEntities = l, this.parseXml = h, this.parseTextData = u, this.resolveNameSpace = f, this.buildAttributesMap = d, this.isItStopNode = m, this.replaceEntitiesValue = c, this.readStopNodeData = N, this.saveTextToParentTag = v, this.addChild = p, this.ignoreAttributesFn = o(this.options.ignoreAttributes);
            };
        },
        354: function(t, e, r) {
            var n = r(7).buildOptions, i = r(731), a = r(120).prettify, s = r(631), o = function() {
                function t(t) {
                    this.externalEntities = {}, this.options = n(t);
                }
                var e = t.prototype;
                return e.parse = function(t, e) {
                    if ("string" == typeof t) ;
                    else {
                        if (!t.toString) throw new Error("XML data is accepted in String or Bytes[] form.");
                        t = t.toString();
                    }
                    if (e) {
                        !0 === e && (e = {});
                        var _$r = s.validate(t, e);
                        if (!0 !== _$r) throw Error(_$r.err.msg + ":" + _$r.err.line + ":" + _$r.err.col);
                    }
                    var n = new i(this.options);
                    n.addExternalEntities(this.externalEntities);
                    var o = n.parseXml(t);
                    return this.options.preserveOrder || void 0 === o ? o : a(o, this.options);
                }, e.addEntity = function(t, e) {
                    if (-1 !== e.indexOf("&")) throw new Error("Entity value can't have '&'");
                    if (-1 !== t.indexOf("&") || -1 !== t.indexOf(";")) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
                    if ("&" === e) throw new Error("An entity with value '&' is not permitted");
                    this.externalEntities[t] = e;
                }, t;
            }();
            t.exports = o;
        },
        120: function(t, e) {
            "use strict";
            var n = function n(t) {
                for(var _$e = Object.keys(t), r = 0; r < _$e.length; r++){
                    var n = _$e[r];
                    if (":@" !== n) return n;
                }
            };
            var i = function i(t, e, r, n) {
                if (e) for(var i = Object.keys(e), a = i.length, s = 0; s < a; s++){
                    var o = i[s];
                    n.isArray(o, r + "." + o, !0, !0) ? t[o] = [
                        e[o]
                    ] : t[o] = e[o];
                }
            };
            var a = function a(t, e) {
                var r = e.textNodeName, n = Object.keys(t).length;
                return 0 === n || !(1 !== n || !t[r] && "boolean" != typeof t[r] && 0 !== t[r]);
            };
            function r(t, e, s) {
                for(var o, l = {}, u = 0; u < t.length; u++){
                    var f, g = t[u], d = n(g);
                    if (f = void 0 === s ? d : s + "." + d, d === e.textNodeName) void 0 === o ? o = g[d] : o += "" + g[d];
                    else {
                        if (void 0 === d) continue;
                        if (g[d]) {
                            var h = r(g[d], e, f), p = a(h, e);
                            g[":@"] ? i(h, g[":@"], f, e) : 1 !== Object.keys(h).length || void 0 === h[e.textNodeName] || e.alwaysCreateTextNode ? 0 === Object.keys(h).length && (e.alwaysCreateTextNode ? h[e.textNodeName] = "" : h = "") : h = h[e.textNodeName], void 0 !== l[d] && l.hasOwnProperty(d) ? (Array.isArray(l[d]) || (l[d] = [
                                l[d]
                            ]), l[d].push(h)) : e.isArray(d, f, p) ? l[d] = [
                                h
                            ] : l[d] = h;
                        }
                    }
                }
                return "string" == typeof o ? o.length > 0 && (l[e.textNodeName] = o) : void 0 !== o && (l[e.textNodeName] = o), l;
            }
            e.prettify = function(t, e) {
                return r(t, e);
            };
        },
        501: function(t) {
            "use strict";
            var e = function() {
                function t(t) {
                    this.tagname = t, this.child = [], this[":@"] = {};
                }
                var e = t.prototype;
                return e.add = function(t, e) {
                    var r;
                    "__proto__" === t && (t = "#__proto__"), this.child.push(((r = {})[t] = e, r));
                }, e.addChild = function(t) {
                    var e, r;
                    "__proto__" === t.tagname && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push(((e = {})[t.tagname] = t.child, e[":@"] = t[":@"], e)) : this.child.push(((r = {})[t.tagname] = t.child, r));
                }, t;
            }();
            t.exports = e;
        }
    }, e = {}, r = function r(n) {
        var i = e[n];
        if (void 0 !== i) return i.exports;
        var a = e[n] = {
            exports: {}
        };
        return t[n](a, a.exports, r), a.exports;
    }(354);
    XMLParser = r;
})(); //# sourceMappingURL=fxparser.min.js.map

