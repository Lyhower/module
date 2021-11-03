var p = {
  isFunction (n) {
    return "function" === p.type(n);
  },
  isArray: Array.isArray || function (n) {
    return "array" === p.type(n);
  },
  isWindow (n) {
    return null != n && n == n.window;
  },
  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  type (n) {
    return null == n ? String(n) : "object" === (void 0 === n ? "undefined" : e(n)) || "function" == typeof n ? o[c.call(n)] || "object" : void 0 === n ? "undefined" : e(n);
  },
  isPlainObject (n) {
    var t;
    if (!n || "object" !== p.type(n) || n.nodeType || p.isWindow(n)) return !1;

    try {
      if (n.constructor && !a.call(n, "constructor") && !a.call(n.constructor.prototype, "isPrototypeOf")) return !1;
    } catch (n) {
      return !1;
    }

    if (p.support.ownLast) for (t in n) return a.call(n, t);

    for (t in n);

    return void 0 === t || a.call(n, t);
  },
  isEmptyObject (n) {
    var t;

    for (t in n) return !1;

    return !0;
  },
  each (n, r, e) {
    var o = 0,
        i = n.length,
        u = isArray(n);

    if (e) {
      if (u) for (; o < i && !1 !== r.apply(n[o], e); o++);else for (o in n) if (!1 === r.apply(n[o], e)) break;
    } else if (u) for (; o < i && !1 !== r.call(n[o], o, n[o]); o++);else for (o in n) if (!1 === r.call(n[o], o, n[o])) break;

    return n;
  },
  trim (n) {
    return null == n ? "" : (n + "").trim();
  },
  makeArray (n, r) {
    var e = r || [];
    return null != n && (isArray(Object(n)) ? p.merge(e, "string" == typeof n ? [n] : n) : u.call(e, n)), e;
  },
  inArray (n, t, r) {
    var e;

    if (t) {
      if (f) return f.call(t, n, r);

      for (e = t.length, r = r ? r < 0 ? Math.max(0, e + r) : r : 0; r < e; r++) if (r in t && t[r] === n) return r;
    }

    return -1;
  },
  merge (n, t) {
    var r = t.length,
        e = n.length,
        o = 0;
    if ("number" == typeof r) for (; o < r; o++) n[e++] = t[o];else for (; void 0 !== t[o];) n[e++] = t[o++];
    return n.length = e, n;
  },
  isMobile (n) {
    return "" !== p.trim(n) && /^1[3|4|5|7|8][0-9]\d{8}$/.test(p.trim(n));
  },
  toFixed (n, t) {
    var r = parseInt(t) || 0;
    if (r < -20 || r > 100) throw new RangeError("Precision of " + r + " fractional digits is out of range");
    var e = Number(n);
    if (isNaN(e)) return "NaN";
    var o = "";
    if (e <= 0 && (o = "-", e = -e), e >= Math.pow(10, 21)) return o + e.toString();
    var i;
    if (t = Math.round(e * Math.pow(10, r)), i = 0 == t ? "0" : t.toString(), 0 == r) return o + i;
    var u = i.length;
    return u <= r && (i = Math.pow(10, r + 1 - u).toString().substring(1) + i, u = r + 1), r > 0 && (i = i.substring(0, u - r) + "." + i.substring(u - r)), o + i;
  }
};
module.exports = p;