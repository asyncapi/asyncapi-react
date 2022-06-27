!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define('AsyncApiStandalone', [], t)
    : 'object' == typeof exports
    ? (exports.AsyncApiStandalone = t())
    : (e.AsyncApiStandalone = t());
})('undefined' != typeof self ? self : this, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var a = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var a in e)
            n.d(
              r,
              a,
              function(t) {
                return e[t];
              }.bind(null, a),
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 274))
    );
  })({
    0: function(e, t, n) {
      'use strict';
      e.exports = n(70);
    },
    1: function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return r;
      }),
        n.d(t, 'j', function() {
          return a;
        }),
        n.d(t, 'h', function() {
          return i;
        }),
        n.d(t, 'i', function() {
          return o;
        }),
        n.d(t, 'c', function() {
          return l;
        }),
        n.d(t, 'g', function() {
          return u;
        }),
        n.d(t, 'e', function() {
          return s;
        }),
        n.d(t, 'd', function() {
          return c;
        }),
        n.d(t, 'f', function() {
          return f;
        }),
        n.d(t, 'b', function() {
          return d;
        });
      var r = 'https://www.iana.org/assignments/media-types',
        a = 'https://github.com/asyncapi/parser-js/validation-errors',
        i = 'Terms of service',
        o = 'Support',
        l = 'External Docs',
        u = 'Servers',
        s = 'Operations',
        c = 'Messages',
        f = 'Schemas',
        d = 'Error';
    },
    10: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        o = n(3),
        { xParserCircle: l, xParserCircleProps: u } = n(24),
        s = n(6),
        c = n(17),
        f = n(4);
      class d extends o {
        constructor(e, t) {
          super(e), (this.options = t || {});
        }
        uid() {
          return this.$id() || this.ext('x-parser-schema-id');
        }
        $id() {
          return this._json.$id;
        }
        multipleOf() {
          return this._json.multipleOf;
        }
        maximum() {
          return this._json.maximum;
        }
        exclusiveMaximum() {
          return this._json.exclusiveMaximum;
        }
        minimum() {
          return this._json.minimum;
        }
        exclusiveMinimum() {
          return this._json.exclusiveMinimum;
        }
        maxLength() {
          return this._json.maxLength;
        }
        minLength() {
          return this._json.minLength;
        }
        pattern() {
          return this._json.pattern;
        }
        maxItems() {
          return this._json.maxItems;
        }
        minItems() {
          return this._json.minItems;
        }
        uniqueItems() {
          return !!this._json.uniqueItems;
        }
        maxProperties() {
          return this._json.maxProperties;
        }
        minProperties() {
          return this._json.minProperties;
        }
        required() {
          return this._json.required;
        }
        enum() {
          return this._json.enum;
        }
        type() {
          return this._json.type;
        }
        allOf() {
          return this._json.allOf
            ? this._json.allOf.map(e => new d(e, { parent: this }))
            : null;
        }
        oneOf() {
          return this._json.oneOf
            ? this._json.oneOf.map(e => new d(e, { parent: this }))
            : null;
        }
        anyOf() {
          return this._json.anyOf
            ? this._json.anyOf.map(e => new d(e, { parent: this }))
            : null;
        }
        not() {
          return this._json.not
            ? new d(this._json.not, { parent: this })
            : null;
        }
        items() {
          return this._json.items
            ? Array.isArray(this._json.items)
              ? this._json.items.map(e => new d(e, { parent: this }))
              : new d(this._json.items, { parent: this })
            : null;
        }
        properties() {
          return r(this._json.properties, d, { parent: this });
        }
        property(e) {
          return a(this._json.properties, e, d, { parent: this });
        }
        additionalProperties() {
          const e = this._json.additionalProperties;
          if (null != e)
            return 'boolean' == typeof e ? e : new d(e, { parent: this });
        }
        additionalItems() {
          const e = this._json.additionalItems;
          if (null != e) return new d(e, { parent: this });
        }
        patternProperties() {
          return r(this._json.patternProperties, d, { parent: this });
        }
        const() {
          return this._json.const;
        }
        contains() {
          return this._json.contains
            ? new d(this._json.contains, { parent: this })
            : null;
        }
        dependencies() {
          if (!this._json.dependencies) return null;
          const e = {};
          return (
            Object.entries(this._json.dependencies).forEach(([t, n]) => {
              e[String(t)] = Array.isArray(n) ? n : new d(n, { parent: this });
            }),
            e
          );
        }
        propertyNames() {
          return this._json.propertyNames
            ? new d(this._json.propertyNames, { parent: this })
            : null;
        }
        if() {
          return this._json.if ? new d(this._json.if, { parent: this }) : null;
        }
        then() {
          return this._json.then
            ? new d(this._json.then, { parent: this })
            : null;
        }
        else() {
          return this._json.else
            ? new d(this._json.else, { parent: this })
            : null;
        }
        format() {
          return this._json.format;
        }
        contentEncoding() {
          return this._json.contentEncoding;
        }
        contentMediaType() {
          return this._json.contentMediaType;
        }
        definitions() {
          return r(this._json.definitions, d, { parent: this });
        }
        title() {
          return this._json.title;
        }
        default() {
          return this._json.default;
        }
        deprecated() {
          return this._json.deprecated;
        }
        discriminator() {
          return this._json.discriminator;
        }
        readOnly() {
          return !!this._json.readOnly;
        }
        writeOnly() {
          return !!this._json.writeOnly;
        }
        examples() {
          return this._json.examples;
        }
        isBooleanSchema() {
          return 'boolean' == typeof this._json;
        }
        isCircular() {
          if (this.ext(l)) return !0;
          let e = this.options.parent;
          for (; e; ) {
            if (e._json === this._json) return !0;
            e = e.options && e.options.parent;
          }
          return !1;
        }
        circularSchema() {
          let e = this.options.parent;
          for (; e; ) {
            if (e._json === this._json) return e;
            e = e.options && e.options.parent;
          }
        }
        hasCircularProps() {
          return Array.isArray(this.ext(u))
            ? this.ext(u).length > 0
            : Object.entries(this.properties() || {})
                .map(([e, t]) => {
                  if (t.isCircular()) return e;
                })
                .filter(Boolean).length > 0;
        }
        circularProps() {
          return Array.isArray(this.ext(u))
            ? this.ext(u)
            : Object.entries(this.properties() || {})
                .map(([e, t]) => {
                  if (t.isCircular()) return e;
                })
                .filter(Boolean);
        }
      }
      e.exports = i(d, s, c, f);
    },
    11: function(e, t, n) {
      'use strict';
      (function(e) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = n(81),
          a = n(82),
          i = n(63);
        function o() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function l(e, t) {
          if (o() < t) throw new RangeError('Invalid typed array length');
          return (
            u.TYPED_ARRAY_SUPPORT
              ? ((e = new Uint8Array(t)).__proto__ = u.prototype)
              : (null === e && (e = new u(t)), (e.length = t)),
            e
          );
        }
        function u(e, t, n) {
          if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
            return new u(e, t, n);
          if ('number' == typeof e) {
            if ('string' == typeof t)
              throw new Error(
                'If encoding is specified then the first argument must be a string',
              );
            return f(this, e);
          }
          return s(this, e, t, n);
        }
        function s(e, t, n, r) {
          if ('number' == typeof t)
            throw new TypeError('"value" argument must not be a number');
          return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
            ? (function(e, t, n, r) {
                if ((t.byteLength, n < 0 || t.byteLength < n))
                  throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0))
                  throw new RangeError("'length' is out of bounds");
                t =
                  void 0 === n && void 0 === r
                    ? new Uint8Array(t)
                    : void 0 === r
                    ? new Uint8Array(t, n)
                    : new Uint8Array(t, n, r);
                u.TYPED_ARRAY_SUPPORT
                  ? ((e = t).__proto__ = u.prototype)
                  : (e = d(e, t));
                return e;
              })(e, t, n, r)
            : 'string' == typeof t
            ? (function(e, t, n) {
                ('string' == typeof n && '' !== n) || (n = 'utf8');
                if (!u.isEncoding(n))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding',
                  );
                var r = 0 | h(t, n),
                  a = (e = l(e, r)).write(t, n);
                a !== r && (e = e.slice(0, a));
                return e;
              })(e, t, n)
            : (function(e, t) {
                if (u.isBuffer(t)) {
                  var n = 0 | p(t.length);
                  return 0 === (e = l(e, n)).length || t.copy(e, 0, 0, n), e;
                }
                if (t) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    'length' in t
                  )
                    return 'number' != typeof t.length || (r = t.length) != r
                      ? l(e, 0)
                      : d(e, t);
                  if ('Buffer' === t.type && i(t.data)) return d(e, t.data);
                }
                var r;
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
                );
              })(e, t);
        }
        function c(e) {
          if ('number' != typeof e)
            throw new TypeError('"size" argument must be a number');
          if (e < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function f(e, t) {
          if ((c(t), (e = l(e, t < 0 ? 0 : 0 | p(t))), !u.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < t; ++n) e[n] = 0;
          return e;
        }
        function d(e, t) {
          var n = t.length < 0 ? 0 : 0 | p(t.length);
          e = l(e, n);
          for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
          return e;
        }
        function p(e) {
          if (e >= o())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                o().toString(16) +
                ' bytes',
            );
          return 0 | e;
        }
        function h(e, t) {
          if (u.isBuffer(e)) return e.length;
          if (
            'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
          )
            return e.byteLength;
          'string' != typeof e && (e = '' + e);
          var n = e.length;
          if (0 === n) return 0;
          for (var r = !1; ; )
            switch (t) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return n;
              case 'utf8':
              case 'utf-8':
              case void 0:
                return L(e).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * n;
              case 'hex':
                return n >>> 1;
              case 'base64':
                return U(e).length;
              default:
                if (r) return L(e).length;
                (t = ('' + t).toLowerCase()), (r = !0);
            }
        }
        function m(e, t, n) {
          var r = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
          if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
            return '';
          if ((n >>>= 0) <= (t >>>= 0)) return '';
          for (e || (e = 'utf8'); ; )
            switch (e) {
              case 'hex':
                return S(this, t, n);
              case 'utf8':
              case 'utf-8':
                return _(this, t, n);
              case 'ascii':
                return A(this, t, n);
              case 'latin1':
              case 'binary':
                return T(this, t, n);
              case 'base64':
                return C(this, t, n);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return N(this, t, n);
              default:
                if (r) throw new TypeError('Unknown encoding: ' + e);
                (e = (e + '').toLowerCase()), (r = !0);
            }
        }
        function g(e, t, n) {
          var r = e[t];
          (e[t] = e[n]), (e[n] = r);
        }
        function y(e, t, n, r, a) {
          if (0 === e.length) return -1;
          if (
            ('string' == typeof n
              ? ((r = n), (n = 0))
              : n > 2147483647
              ? (n = 2147483647)
              : n < -2147483648 && (n = -2147483648),
            (n = +n),
            isNaN(n) && (n = a ? 0 : e.length - 1),
            n < 0 && (n = e.length + n),
            n >= e.length)
          ) {
            if (a) return -1;
            n = e.length - 1;
          } else if (n < 0) {
            if (!a) return -1;
            n = 0;
          }
          if (('string' == typeof t && (t = u.from(t, r)), u.isBuffer(t)))
            return 0 === t.length ? -1 : b(e, t, n, r, a);
          if ('number' == typeof t)
            return (
              (t &= 255),
              u.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? a
                  ? Uint8Array.prototype.indexOf.call(e, t, n)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                : b(e, [t], n, r, a)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function b(e, t, n, r, a) {
          var i,
            o = 1,
            l = e.length,
            u = t.length;
          if (
            void 0 !== r &&
            ('ucs2' === (r = String(r).toLowerCase()) ||
              'ucs-2' === r ||
              'utf16le' === r ||
              'utf-16le' === r)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (o = 2), (l /= 2), (u /= 2), (n /= 2);
          }
          function s(e, t) {
            return 1 === o ? e[t] : e.readUInt16BE(t * o);
          }
          if (a) {
            var c = -1;
            for (i = n; i < l; i++)
              if (s(e, i) === s(t, -1 === c ? 0 : i - c)) {
                if ((-1 === c && (c = i), i - c + 1 === u)) return c * o;
              } else -1 !== c && (i -= i - c), (c = -1);
          } else
            for (n + u > l && (n = l - u), i = n; i >= 0; i--) {
              for (var f = !0, d = 0; d < u; d++)
                if (s(e, i + d) !== s(t, d)) {
                  f = !1;
                  break;
                }
              if (f) return i;
            }
          return -1;
        }
        function v(e, t, n, r) {
          n = Number(n) || 0;
          var a = e.length - n;
          r ? (r = Number(r)) > a && (r = a) : (r = a);
          var i = t.length;
          if (i % 2 != 0) throw new TypeError('Invalid hex string');
          r > i / 2 && (r = i / 2);
          for (var o = 0; o < r; ++o) {
            var l = parseInt(t.substr(2 * o, 2), 16);
            if (isNaN(l)) return o;
            e[n + o] = l;
          }
          return o;
        }
        function x(e, t, n, r) {
          return $(L(t, e.length - n), e, n, r);
        }
        function E(e, t, n, r) {
          return $(
            (function(e) {
              for (var t = [], n = 0; n < e.length; ++n)
                t.push(255 & e.charCodeAt(n));
              return t;
            })(t),
            e,
            n,
            r,
          );
        }
        function w(e, t, n, r) {
          return E(e, t, n, r);
        }
        function D(e, t, n, r) {
          return $(U(t), e, n, r);
        }
        function k(e, t, n, r) {
          return $(
            (function(e, t) {
              for (
                var n, r, a, i = [], o = 0;
                o < e.length && !((t -= 2) < 0);
                ++o
              )
                (n = e.charCodeAt(o)),
                  (r = n >> 8),
                  (a = n % 256),
                  i.push(a),
                  i.push(r);
              return i;
            })(t, e.length - n),
            e,
            n,
            r,
          );
        }
        function C(e, t, n) {
          return 0 === t && n === e.length
            ? r.fromByteArray(e)
            : r.fromByteArray(e.slice(t, n));
        }
        function _(e, t, n) {
          n = Math.min(e.length, n);
          for (var r = [], a = t; a < n; ) {
            var i,
              o,
              l,
              u,
              s = e[a],
              c = null,
              f = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
            if (a + f <= n)
              switch (f) {
                case 1:
                  s < 128 && (c = s);
                  break;
                case 2:
                  128 == (192 & (i = e[a + 1])) &&
                    (u = ((31 & s) << 6) | (63 & i)) > 127 &&
                    (c = u);
                  break;
                case 3:
                  (i = e[a + 1]),
                    (o = e[a + 2]),
                    128 == (192 & i) &&
                      128 == (192 & o) &&
                      (u = ((15 & s) << 12) | ((63 & i) << 6) | (63 & o)) >
                        2047 &&
                      (u < 55296 || u > 57343) &&
                      (c = u);
                  break;
                case 4:
                  (i = e[a + 1]),
                    (o = e[a + 2]),
                    (l = e[a + 3]),
                    128 == (192 & i) &&
                      128 == (192 & o) &&
                      128 == (192 & l) &&
                      (u =
                        ((15 & s) << 18) |
                        ((63 & i) << 12) |
                        ((63 & o) << 6) |
                        (63 & l)) > 65535 &&
                      u < 1114112 &&
                      (c = u);
              }
            null === c
              ? ((c = 65533), (f = 1))
              : c > 65535 &&
                ((c -= 65536),
                r.push(((c >>> 10) & 1023) | 55296),
                (c = 56320 | (1023 & c))),
              r.push(c),
              (a += f);
          }
          return (function(e) {
            var t = e.length;
            if (t <= 4096) return String.fromCharCode.apply(String, e);
            var n = '',
              r = 0;
            for (; r < t; )
              n += String.fromCharCode.apply(String, e.slice(r, (r += 4096)));
            return n;
          })(r);
        }
        (t.Buffer = u),
          (t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return u.alloc(+e);
          }),
          (t.INSPECT_MAX_BYTES = 50),
          (u.TYPED_ARRAY_SUPPORT =
            void 0 !== e.TYPED_ARRAY_SUPPORT
              ? e.TYPED_ARRAY_SUPPORT
              : (function() {
                  try {
                    var e = new Uint8Array(1);
                    return (
                      (e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                          return 42;
                        },
                      }),
                      42 === e.foo() &&
                        'function' == typeof e.subarray &&
                        0 === e.subarray(1, 1).byteLength
                    );
                  } catch (e) {
                    return !1;
                  }
                })()),
          (t.kMaxLength = o()),
          (u.poolSize = 8192),
          (u._augment = function(e) {
            return (e.__proto__ = u.prototype), e;
          }),
          (u.from = function(e, t, n) {
            return s(null, e, t, n);
          }),
          u.TYPED_ARRAY_SUPPORT &&
            ((u.prototype.__proto__ = Uint8Array.prototype),
            (u.__proto__ = Uint8Array),
            'undefined' != typeof Symbol &&
              Symbol.species &&
              u[Symbol.species] === u &&
              Object.defineProperty(u, Symbol.species, {
                value: null,
                configurable: !0,
              })),
          (u.alloc = function(e, t, n) {
            return (function(e, t, n, r) {
              return (
                c(t),
                t <= 0
                  ? l(e, t)
                  : void 0 !== n
                  ? 'string' == typeof r
                    ? l(e, t).fill(n, r)
                    : l(e, t).fill(n)
                  : l(e, t)
              );
            })(null, e, t, n);
          }),
          (u.allocUnsafe = function(e) {
            return f(null, e);
          }),
          (u.allocUnsafeSlow = function(e) {
            return f(null, e);
          }),
          (u.isBuffer = function(e) {
            return !(null == e || !e._isBuffer);
          }),
          (u.compare = function(e, t) {
            if (!u.isBuffer(e) || !u.isBuffer(t))
              throw new TypeError('Arguments must be Buffers');
            if (e === t) return 0;
            for (
              var n = e.length, r = t.length, a = 0, i = Math.min(n, r);
              a < i;
              ++a
            )
              if (e[a] !== t[a]) {
                (n = e[a]), (r = t[a]);
                break;
              }
            return n < r ? -1 : r < n ? 1 : 0;
          }),
          (u.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (u.concat = function(e, t) {
            if (!i(e))
              throw new TypeError(
                '"list" argument must be an Array of Buffers',
              );
            if (0 === e.length) return u.alloc(0);
            var n;
            if (void 0 === t)
              for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
            var r = u.allocUnsafe(t),
              a = 0;
            for (n = 0; n < e.length; ++n) {
              var o = e[n];
              if (!u.isBuffer(o))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers',
                );
              o.copy(r, a), (a += o.length);
            }
            return r;
          }),
          (u.byteLength = h),
          (u.prototype._isBuffer = !0),
          (u.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0)
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (var t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
          }),
          (u.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0)
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (var t = 0; t < e; t += 4)
              g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
          }),
          (u.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0)
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (var t = 0; t < e; t += 8)
              g(this, t, t + 7),
                g(this, t + 1, t + 6),
                g(this, t + 2, t + 5),
                g(this, t + 3, t + 4);
            return this;
          }),
          (u.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e
              ? ''
              : 0 === arguments.length
              ? _(this, 0, e)
              : m.apply(this, arguments);
          }),
          (u.prototype.equals = function(e) {
            if (!u.isBuffer(e))
              throw new TypeError('Argument must be a Buffer');
            return this === e || 0 === u.compare(this, e);
          }),
          (u.prototype.inspect = function() {
            var e = '',
              n = t.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((e = this.toString('hex', 0, n)
                  .match(/.{2}/g)
                  .join(' ')),
                this.length > n && (e += ' ... ')),
              '<Buffer ' + e + '>'
            );
          }),
          (u.prototype.compare = function(e, t, n, r, a) {
            if (!u.isBuffer(e))
              throw new TypeError('Argument must be a Buffer');
            if (
              (void 0 === t && (t = 0),
              void 0 === n && (n = e ? e.length : 0),
              void 0 === r && (r = 0),
              void 0 === a && (a = this.length),
              t < 0 || n > e.length || r < 0 || a > this.length)
            )
              throw new RangeError('out of range index');
            if (r >= a && t >= n) return 0;
            if (r >= a) return -1;
            if (t >= n) return 1;
            if (this === e) return 0;
            for (
              var i = (a >>>= 0) - (r >>>= 0),
                o = (n >>>= 0) - (t >>>= 0),
                l = Math.min(i, o),
                s = this.slice(r, a),
                c = e.slice(t, n),
                f = 0;
              f < l;
              ++f
            )
              if (s[f] !== c[f]) {
                (i = s[f]), (o = c[f]);
                break;
              }
            return i < o ? -1 : o < i ? 1 : 0;
          }),
          (u.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n);
          }),
          (u.prototype.indexOf = function(e, t, n) {
            return y(this, e, t, n, !0);
          }),
          (u.prototype.lastIndexOf = function(e, t, n) {
            return y(this, e, t, n, !1);
          }),
          (u.prototype.write = function(e, t, n, r) {
            if (void 0 === t) (r = 'utf8'), (n = this.length), (t = 0);
            else if (void 0 === n && 'string' == typeof t)
              (r = t), (n = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  'Buffer.write(string, encoding, offset[, length]) is no longer supported',
                );
              (t |= 0),
                isFinite(n)
                  ? ((n |= 0), void 0 === r && (r = 'utf8'))
                  : ((r = n), (n = void 0));
            }
            var a = this.length - t;
            if (
              ((void 0 === n || n > a) && (n = a),
              (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError('Attempt to write outside buffer bounds');
            r || (r = 'utf8');
            for (var i = !1; ; )
              switch (r) {
                case 'hex':
                  return v(this, e, t, n);
                case 'utf8':
                case 'utf-8':
                  return x(this, e, t, n);
                case 'ascii':
                  return E(this, e, t, n);
                case 'latin1':
                case 'binary':
                  return w(this, e, t, n);
                case 'base64':
                  return D(this, e, t, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return k(this, e, t, n);
                default:
                  if (i) throw new TypeError('Unknown encoding: ' + r);
                  (r = ('' + r).toLowerCase()), (i = !0);
              }
          }),
          (u.prototype.toJSON = function() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        function A(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(127 & e[a]);
          return r;
        }
        function T(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(e[a]);
          return r;
        }
        function S(e, t, n) {
          var r = e.length;
          (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
          for (var a = '', i = t; i < n; ++i) a += z(e[i]);
          return a;
        }
        function N(e, t, n) {
          for (var r = e.slice(t, n), a = '', i = 0; i < r.length; i += 2)
            a += String.fromCharCode(r[i] + 256 * r[i + 1]);
          return a;
        }
        function O(e, t, n) {
          if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
          if (e + t > n)
            throw new RangeError('Trying to access beyond buffer length');
        }
        function F(e, t, n, r, a, i) {
          if (!u.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > a || t < i)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > e.length) throw new RangeError('Index out of range');
        }
        function j(e, t, n, r) {
          t < 0 && (t = 65535 + t + 1);
          for (var a = 0, i = Math.min(e.length - n, 2); a < i; ++a)
            e[n + a] =
              (t & (255 << (8 * (r ? a : 1 - a)))) >>> (8 * (r ? a : 1 - a));
        }
        function P(e, t, n, r) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var a = 0, i = Math.min(e.length - n, 4); a < i; ++a)
            e[n + a] = (t >>> (8 * (r ? a : 3 - a))) & 255;
        }
        function R(e, t, n, r, a, i) {
          if (n + r > e.length) throw new RangeError('Index out of range');
          if (n < 0) throw new RangeError('Index out of range');
        }
        function B(e, t, n, r, i) {
          return i || R(e, 0, n, 4), a.write(e, t, n, r, 23, 4), n + 4;
        }
        function I(e, t, n, r, i) {
          return i || R(e, 0, n, 8), a.write(e, t, n, r, 52, 8), n + 8;
        }
        (u.prototype.slice = function(e, t) {
          var n,
            r = this.length;
          if (
            ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0
              ? (t += r) < 0 && (t = 0)
              : t > r && (t = r),
            t < e && (t = e),
            u.TYPED_ARRAY_SUPPORT)
          )
            (n = this.subarray(e, t)).__proto__ = u.prototype;
          else {
            var a = t - e;
            n = new u(a, void 0);
            for (var i = 0; i < a; ++i) n[i] = this[i + e];
          }
          return n;
        }),
          (u.prototype.readUIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e], a = 1, i = 0; ++i < t && (a *= 256); )
              r += this[e + i] * a;
            return r;
          }),
          (u.prototype.readUIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e + --t], a = 1; t > 0 && (a *= 256); )
              r += this[e + --t] * a;
            return r;
          }),
          (u.prototype.readUInt8 = function(e, t) {
            return t || O(e, 1, this.length), this[e];
          }),
          (u.prototype.readUInt16LE = function(e, t) {
            return t || O(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (u.prototype.readUInt16BE = function(e, t) {
            return t || O(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (u.prototype.readUInt32LE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (u.prototype.readUInt32BE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (u.prototype.readIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = this[e], a = 1, i = 0; ++i < t && (a *= 256); )
              r += this[e + i] * a;
            return r >= (a *= 128) && (r -= Math.pow(2, 8 * t)), r;
          }),
          (u.prototype.readIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || O(e, t, this.length);
            for (var r = t, a = 1, i = this[e + --r]; r > 0 && (a *= 256); )
              i += this[e + --r] * a;
            return i >= (a *= 128) && (i -= Math.pow(2, 8 * t)), i;
          }),
          (u.prototype.readInt8 = function(e, t) {
            return (
              t || O(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (u.prototype.readInt16LE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e] | (this[e + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt16BE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e + 1] | (this[e] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt32LE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function(e, t) {
            return (
              t || O(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (u.prototype.readFloatLE = function(e, t) {
            return t || O(e, 4, this.length), a.read(this, e, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function(e, t) {
            return t || O(e, 4, this.length), a.read(this, e, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function(e, t) {
            return t || O(e, 8, this.length), a.read(this, e, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function(e, t) {
            return t || O(e, 8, this.length), a.read(this, e, !1, 52, 8);
          }),
          (u.prototype.writeUIntLE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              F(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var a = 1,
              i = 0;
            for (this[t] = 255 & e; ++i < n && (a *= 256); )
              this[t + i] = (e / a) & 255;
            return t + n;
          }),
          (u.prototype.writeUIntBE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              F(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var a = n - 1,
              i = 1;
            for (this[t + a] = 255 & e; --a >= 0 && (i *= 256); )
              this[t + a] = (e / i) & 255;
            return t + n;
          }),
          (u.prototype.writeUInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 1, 255, 0),
              u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (u.prototype.writeUInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : j(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeUInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : j(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeUInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e))
                : P(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeUInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : P(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeIntLE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var a = Math.pow(2, 8 * n - 1);
              F(this, e, t, n, a - 1, -a);
            }
            var i = 0,
              o = 1,
              l = 0;
            for (this[t] = 255 & e; ++i < n && (o *= 256); )
              e < 0 && 0 === l && 0 !== this[t + i - 1] && (l = 1),
                (this[t + i] = (((e / o) >> 0) - l) & 255);
            return t + n;
          }),
          (u.prototype.writeIntBE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var a = Math.pow(2, 8 * n - 1);
              F(this, e, t, n, a - 1, -a);
            }
            var i = n - 1,
              o = 1,
              l = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
              e < 0 && 0 === l && 0 !== this[t + i + 1] && (l = 1),
                (this[t + i] = (((e / o) >> 0) - l) & 255);
            return t + n;
          }),
          (u.prototype.writeInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 1, 127, -128),
              u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (u.prototype.writeInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : j(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : j(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 4, 2147483647, -2147483648),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24))
                : P(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || F(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : P(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeFloatLE = function(e, t, n) {
            return B(this, e, t, !0, n);
          }),
          (u.prototype.writeFloatBE = function(e, t, n) {
            return B(this, e, t, !1, n);
          }),
          (u.prototype.writeDoubleLE = function(e, t, n) {
            return I(this, e, t, !0, n);
          }),
          (u.prototype.writeDoubleBE = function(e, t, n) {
            return I(this, e, t, !1, n);
          }),
          (u.prototype.copy = function(e, t, n, r) {
            if (
              (n || (n = 0),
              r || 0 === r || (r = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              r > 0 && r < n && (r = n),
              r === n)
            )
              return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError('targetStart out of bounds');
            if (n < 0 || n >= this.length)
              throw new RangeError('sourceStart out of bounds');
            if (r < 0) throw new RangeError('sourceEnd out of bounds');
            r > this.length && (r = this.length),
              e.length - t < r - n && (r = e.length - t + n);
            var a,
              i = r - n;
            if (this === e && n < t && t < r)
              for (a = i - 1; a >= 0; --a) e[a + t] = this[a + n];
            else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT)
              for (a = 0; a < i; ++a) e[a + t] = this[a + n];
            else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
            return i;
          }),
          (u.prototype.fill = function(e, t, n, r) {
            if ('string' == typeof e) {
              if (
                ('string' == typeof t
                  ? ((r = t), (t = 0), (n = this.length))
                  : 'string' == typeof n && ((r = n), (n = this.length)),
                1 === e.length)
              ) {
                var a = e.charCodeAt(0);
                a < 256 && (e = a);
              }
              if (void 0 !== r && 'string' != typeof r)
                throw new TypeError('encoding must be a string');
              if ('string' == typeof r && !u.isEncoding(r))
                throw new TypeError('Unknown encoding: ' + r);
            } else 'number' == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n)
              throw new RangeError('Out of range index');
            if (n <= t) return this;
            var i;
            if (
              ((t >>>= 0),
              (n = void 0 === n ? this.length : n >>> 0),
              e || (e = 0),
              'number' == typeof e)
            )
              for (i = t; i < n; ++i) this[i] = e;
            else {
              var o = u.isBuffer(e) ? e : L(new u(e, r).toString()),
                l = o.length;
              for (i = 0; i < n - t; ++i) this[i + t] = o[i % l];
            }
            return this;
          });
        var M = /[^+\/0-9A-Za-z-_]/g;
        function z(e) {
          return e < 16 ? '0' + e.toString(16) : e.toString(16);
        }
        function L(e, t) {
          var n;
          t = t || 1 / 0;
          for (var r = e.length, a = null, i = [], o = 0; o < r; ++o) {
            if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
              if (!a) {
                if (n > 56319) {
                  (t -= 3) > -1 && i.push(239, 191, 189);
                  continue;
                }
                if (o + 1 === r) {
                  (t -= 3) > -1 && i.push(239, 191, 189);
                  continue;
                }
                a = n;
                continue;
              }
              if (n < 56320) {
                (t -= 3) > -1 && i.push(239, 191, 189), (a = n);
                continue;
              }
              n = 65536 + (((a - 55296) << 10) | (n - 56320));
            } else a && (t -= 3) > -1 && i.push(239, 191, 189);
            if (((a = null), n < 128)) {
              if ((t -= 1) < 0) break;
              i.push(n);
            } else if (n < 2048) {
              if ((t -= 2) < 0) break;
              i.push((n >> 6) | 192, (63 & n) | 128);
            } else if (n < 65536) {
              if ((t -= 3) < 0) break;
              i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
            } else {
              if (!(n < 1114112)) throw new Error('Invalid code point');
              if ((t -= 4) < 0) break;
              i.push(
                (n >> 18) | 240,
                ((n >> 12) & 63) | 128,
                ((n >> 6) & 63) | 128,
                (63 & n) | 128,
              );
            }
          }
          return i;
        }
        function U(e) {
          return r.toByteArray(
            (function(e) {
              if (
                (e = (function(e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
                })(e).replace(M, '')).length < 2
              )
                return '';
              for (; e.length % 4 != 0; ) e += '=';
              return e;
            })(e),
          );
        }
        function $(e, t, n, r) {
          for (var a = 0; a < r && !(a + n >= t.length || a >= e.length); ++a)
            t[a + n] = e[a];
          return a;
        }
      }.call(this, n(13)));
    },
    129: function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return i;
      });
      var r = n(22),
        a = n.n(r),
        i = (function() {
          function e() {}
          return (
            (e.retrieveParsedSpec = function(e) {
              if (e) {
                if (e.constructor && 'AsyncAPIDocument' === e.constructor.name)
                  return e;
                if (
                  'function' == typeof e.version &&
                  e._json &&
                  e._json.asyncapi
                )
                  return e;
                if ('string' == typeof e)
                  try {
                    e = JSON.parse(e);
                  } catch (e) {
                    return;
                  }
                return 'object' == typeof e && !0 === e['x-parser-spec-parsed']
                  ? !0 === e['x-parser-spec-stringified']
                    ? a.a.parse(e)
                    : new a.a(e)
                  : void 0;
              }
            }),
            (e.containTags = function(e, t) {
              var n = 'function' == typeof e.tags ? e.tags() : void 0;
              return (
                !(void 0 === n || !Array.isArray(n)) &&
                ((t = Array.isArray(t) ? t : [t]),
                n.some(function(e) {
                  return t.some(function(t) {
                    return t.name() === e.name();
                  });
                }))
              );
            }),
            (e.operationsTags = function(e) {
              var t = new Map();
              return (
                Object.entries(e.channels()).forEach(function(e) {
                  e[0];
                  var n = e[1],
                    r = n.publish();
                  r &&
                    r.hasTags() &&
                    r.tags().forEach(function(e) {
                      return t.set(e.name(), e);
                    });
                  var a = n.subscribe();
                  a &&
                    a.hasTags() &&
                    a.tags().forEach(function(e) {
                      return t.set(e.name(), e);
                    });
                }),
                Array.from(t.values())
              );
            }),
            e
          );
        })();
    },
    13: function(e, t) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || new Function('return this')();
      } catch (e) {
        'object' == typeof window && (n = window);
      }
      e.exports = n;
    },
    15: function(e, t) {
      function n(e) {
        return (
          e instanceof Map
            ? (e.clear = e.delete = e.set = function() {
                throw new Error('map is read-only');
              })
            : e instanceof Set &&
              (e.add = e.clear = e.delete = function() {
                throw new Error('set is read-only');
              }),
          Object.freeze(e),
          Object.getOwnPropertyNames(e).forEach(function(t) {
            var r = e[t];
            'object' != typeof r || Object.isFrozen(r) || n(r);
          }),
          e
        );
      }
      var r = n,
        a = n;
      r.default = a;
      class i {
        constructor(e) {
          void 0 === e.data && (e.data = {}),
            (this.data = e.data),
            (this.isMatchIgnored = !1);
        }
        ignoreMatch() {
          this.isMatchIgnored = !0;
        }
      }
      function o(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      }
      function l(e, ...t) {
        const n = Object.create(null);
        for (const t in e) n[t] = e[t];
        return (
          t.forEach(function(e) {
            for (const t in e) n[t] = e[t];
          }),
          n
        );
      }
      const u = e => !!e.kind;
      class s {
        constructor(e, t) {
          (this.buffer = ''), (this.classPrefix = t.classPrefix), e.walk(this);
        }
        addText(e) {
          this.buffer += o(e);
        }
        openNode(e) {
          if (!u(e)) return;
          let t = e.kind;
          e.sublanguage || (t = `${this.classPrefix}${t}`), this.span(t);
        }
        closeNode(e) {
          u(e) && (this.buffer += '</span>');
        }
        value() {
          return this.buffer;
        }
        span(e) {
          this.buffer += `<span class="${e}">`;
        }
      }
      class c {
        constructor() {
          (this.rootNode = { children: [] }), (this.stack = [this.rootNode]);
        }
        get top() {
          return this.stack[this.stack.length - 1];
        }
        get root() {
          return this.rootNode;
        }
        add(e) {
          this.top.children.push(e);
        }
        openNode(e) {
          const t = { kind: e, children: [] };
          this.add(t), this.stack.push(t);
        }
        closeNode() {
          if (this.stack.length > 1) return this.stack.pop();
        }
        closeAllNodes() {
          for (; this.closeNode(); );
        }
        toJSON() {
          return JSON.stringify(this.rootNode, null, 4);
        }
        walk(e) {
          return this.constructor._walk(e, this.rootNode);
        }
        static _walk(e, t) {
          return (
            'string' == typeof t
              ? e.addText(t)
              : t.children &&
                (e.openNode(t),
                t.children.forEach(t => this._walk(e, t)),
                e.closeNode(t)),
            e
          );
        }
        static _collapse(e) {
          'string' != typeof e &&
            e.children &&
            (e.children.every(e => 'string' == typeof e)
              ? (e.children = [e.children.join('')])
              : e.children.forEach(e => {
                  c._collapse(e);
                }));
        }
      }
      class f extends c {
        constructor(e) {
          super(), (this.options = e);
        }
        addKeyword(e, t) {
          '' !== e && (this.openNode(t), this.addText(e), this.closeNode());
        }
        addText(e) {
          '' !== e && this.add(e);
        }
        addSublanguage(e, t) {
          const n = e.root;
          (n.kind = t), (n.sublanguage = !0), this.add(n);
        }
        toHTML() {
          return new s(this, this.options).value();
        }
        finalize() {
          return !0;
        }
      }
      function d(e) {
        return e ? ('string' == typeof e ? e : e.source) : null;
      }
      const p = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      const h =
          '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)',
        m = { begin: '\\\\[\\s\\S]', relevance: 0 },
        g = {
          className: 'string',
          begin: "'",
          end: "'",
          illegal: '\\n',
          contains: [m],
        },
        y = {
          className: 'string',
          begin: '"',
          end: '"',
          illegal: '\\n',
          contains: [m],
        },
        b = {
          begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
        },
        v = function(e, t, n = {}) {
          const r = l(
            { className: 'comment', begin: e, end: t, contains: [] },
            n,
          );
          return (
            r.contains.push(b),
            r.contains.push({
              className: 'doctag',
              begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
              relevance: 0,
            }),
            r
          );
        },
        x = v('//', '$'),
        E = v('/\\*', '\\*/'),
        w = v('#', '$'),
        D = { className: 'number', begin: '\\b\\d+(\\.\\d+)?', relevance: 0 },
        k = { className: 'number', begin: h, relevance: 0 },
        C = { className: 'number', begin: '\\b(0b[01]+)', relevance: 0 },
        _ = {
          className: 'number',
          begin:
            '\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
          relevance: 0,
        },
        A = {
          begin: /(?=\/[^/\n]*\/)/,
          contains: [
            {
              className: 'regexp',
              begin: /\//,
              end: /\/[gimuy]*/,
              illegal: /\n/,
              contains: [
                m,
                { begin: /\[/, end: /\]/, relevance: 0, contains: [m] },
              ],
            },
          ],
        },
        T = { className: 'title', begin: '[a-zA-Z]\\w*', relevance: 0 },
        S = { className: 'title', begin: '[a-zA-Z_]\\w*', relevance: 0 },
        N = { begin: '\\.\\s*[a-zA-Z_]\\w*', relevance: 0 };
      var O = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: '[a-zA-Z]\\w*',
        UNDERSCORE_IDENT_RE: '[a-zA-Z_]\\w*',
        NUMBER_RE: '\\b\\d+(\\.\\d+)?',
        C_NUMBER_RE: h,
        BINARY_NUMBER_RE: '\\b(0b[01]+)',
        RE_STARTERS_RE:
          '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~',
        SHEBANG: (e = {}) => {
          const t = /^#![ ]*\//;
          return (
            e.binary &&
              (e.begin = (function(...e) {
                return e.map(e => d(e)).join('');
              })(t, /.*\b/, e.binary, /\b.*/)),
            l(
              {
                className: 'meta',
                begin: t,
                end: /$/,
                relevance: 0,
                'on:begin': (e, t) => {
                  0 !== e.index && t.ignoreMatch();
                },
              },
              e,
            )
          );
        },
        BACKSLASH_ESCAPE: m,
        APOS_STRING_MODE: g,
        QUOTE_STRING_MODE: y,
        PHRASAL_WORDS_MODE: b,
        COMMENT: v,
        C_LINE_COMMENT_MODE: x,
        C_BLOCK_COMMENT_MODE: E,
        HASH_COMMENT_MODE: w,
        NUMBER_MODE: D,
        C_NUMBER_MODE: k,
        BINARY_NUMBER_MODE: C,
        CSS_NUMBER_MODE: _,
        REGEXP_MODE: A,
        TITLE_MODE: T,
        UNDERSCORE_TITLE_MODE: S,
        METHOD_GUARD: N,
        END_SAME_AS_BEGIN: function(e) {
          return Object.assign(e, {
            'on:begin': (e, t) => {
              t.data._beginMatch = e[1];
            },
            'on:end': (e, t) => {
              t.data._beginMatch !== e[1] && t.ignoreMatch();
            },
          });
        },
      });
      function F(e, t) {
        '.' === e.input[e.index - 1] && t.ignoreMatch();
      }
      function j(e, t) {
        t &&
          e.beginKeywords &&
          ((e.begin =
            '\\b(' +
            e.beginKeywords.split(' ').join('|') +
            ')(?!\\.)(?=\\b|\\s)'),
          (e.__beforeBegin = F),
          (e.keywords = e.keywords || e.beginKeywords),
          delete e.beginKeywords,
          void 0 === e.relevance && (e.relevance = 0));
      }
      function P(e, t) {
        Array.isArray(e.illegal) &&
          (e.illegal = (function(...e) {
            return '(' + e.map(e => d(e)).join('|') + ')';
          })(...e.illegal));
      }
      function R(e, t) {
        if (e.match) {
          if (e.begin || e.end)
            throw new Error('begin & end are not supported with match');
          (e.begin = e.match), delete e.match;
        }
      }
      function B(e, t) {
        void 0 === e.relevance && (e.relevance = 1);
      }
      const I = [
        'of',
        'and',
        'for',
        'in',
        'not',
        'or',
        'if',
        'then',
        'parent',
        'list',
        'value',
      ];
      function M(e, t) {
        return t
          ? Number(t)
          : (function(e) {
              return I.includes(e.toLowerCase());
            })(e)
          ? 0
          : 1;
      }
      function z(e, { plugins: t }) {
        function n(t, n) {
          return new RegExp(
            d(t),
            'm' + (e.case_insensitive ? 'i' : '') + (n ? 'g' : ''),
          );
        }
        class r {
          constructor() {
            (this.matchIndexes = {}),
              (this.regexes = []),
              (this.matchAt = 1),
              (this.position = 0);
          }
          addRule(e, t) {
            (t.position = this.position++),
              (this.matchIndexes[this.matchAt] = t),
              this.regexes.push([t, e]),
              (this.matchAt +=
                (function(e) {
                  return new RegExp(e.toString() + '|').exec('').length - 1;
                })(e) + 1);
          }
          compile() {
            0 === this.regexes.length && (this.exec = () => null);
            const e = this.regexes.map(e => e[1]);
            (this.matcherRe = n(
              (function(e, t = '|') {
                let n = 0;
                return e
                  .map(e => {
                    n += 1;
                    const t = n;
                    let r = d(e),
                      a = '';
                    for (; r.length > 0; ) {
                      const e = p.exec(r);
                      if (!e) {
                        a += r;
                        break;
                      }
                      (a += r.substring(0, e.index)),
                        (r = r.substring(e.index + e[0].length)),
                        '\\' === e[0][0] && e[1]
                          ? (a += '\\' + String(Number(e[1]) + t))
                          : ((a += e[0]), '(' === e[0] && n++);
                    }
                    return a;
                  })
                  .map(e => `(${e})`)
                  .join(t);
              })(e),
              !0,
            )),
              (this.lastIndex = 0);
          }
          exec(e) {
            this.matcherRe.lastIndex = this.lastIndex;
            const t = this.matcherRe.exec(e);
            if (!t) return null;
            const n = t.findIndex((e, t) => t > 0 && void 0 !== e),
              r = this.matchIndexes[n];
            return t.splice(0, n), Object.assign(t, r);
          }
        }
        class a {
          constructor() {
            (this.rules = []),
              (this.multiRegexes = []),
              (this.count = 0),
              (this.lastIndex = 0),
              (this.regexIndex = 0);
          }
          getMatcher(e) {
            if (this.multiRegexes[e]) return this.multiRegexes[e];
            const t = new r();
            return (
              this.rules.slice(e).forEach(([e, n]) => t.addRule(e, n)),
              t.compile(),
              (this.multiRegexes[e] = t),
              t
            );
          }
          resumingScanAtSamePosition() {
            return 0 !== this.regexIndex;
          }
          considerAll() {
            this.regexIndex = 0;
          }
          addRule(e, t) {
            this.rules.push([e, t]), 'begin' === t.type && this.count++;
          }
          exec(e) {
            const t = this.getMatcher(this.regexIndex);
            t.lastIndex = this.lastIndex;
            let n = t.exec(e);
            if (this.resumingScanAtSamePosition())
              if (n && n.index === this.lastIndex);
              else {
                const t = this.getMatcher(0);
                (t.lastIndex = this.lastIndex + 1), (n = t.exec(e));
              }
            return (
              n &&
                ((this.regexIndex += n.position + 1),
                this.regexIndex === this.count && this.considerAll()),
              n
            );
          }
        }
        if (
          (e.compilerExtensions || (e.compilerExtensions = []),
          e.contains && e.contains.includes('self'))
        )
          throw new Error(
            'ERR: contains `self` is not supported at the top-level of a language.  See documentation.',
          );
        return (
          (e.classNameAliases = l(e.classNameAliases || {})),
          (function t(r, i) {
            const o = r;
            if (r.isCompiled) return o;
            [R].forEach(e => e(r, i)),
              e.compilerExtensions.forEach(e => e(r, i)),
              (r.__beforeBegin = null),
              [j, P, B].forEach(e => e(r, i)),
              (r.isCompiled = !0);
            let u = null;
            if (
              ('object' == typeof r.keywords &&
                ((u = r.keywords.$pattern), delete r.keywords.$pattern),
              r.keywords &&
                (r.keywords = (function e(t, n, r = 'keyword') {
                  const a = {};
                  return (
                    'string' == typeof t
                      ? i(r, t.split(' '))
                      : Array.isArray(t)
                      ? i(r, t)
                      : Object.keys(t).forEach(function(r) {
                          Object.assign(a, e(t[r], n, r));
                        }),
                    a
                  );
                  function i(e, t) {
                    n && (t = t.map(e => e.toLowerCase())),
                      t.forEach(function(t) {
                        const n = t.split('|');
                        a[n[0]] = [e, M(n[0], n[1])];
                      });
                  }
                })(r.keywords, e.case_insensitive)),
              r.lexemes && u)
            )
              throw new Error(
                'ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ',
              );
            return (
              (u = u || r.lexemes || /\w+/),
              (o.keywordPatternRe = n(u, !0)),
              i &&
                (r.begin || (r.begin = /\B|\b/),
                (o.beginRe = n(r.begin)),
                r.endSameAsBegin && (r.end = r.begin),
                r.end || r.endsWithParent || (r.end = /\B|\b/),
                r.end && (o.endRe = n(r.end)),
                (o.terminatorEnd = d(r.end) || ''),
                r.endsWithParent &&
                  i.terminatorEnd &&
                  (o.terminatorEnd += (r.end ? '|' : '') + i.terminatorEnd)),
              r.illegal && (o.illegalRe = n(r.illegal)),
              r.contains || (r.contains = []),
              (r.contains = [].concat(
                ...r.contains.map(function(e) {
                  return (function(e) {
                    e.variants &&
                      !e.cachedVariants &&
                      (e.cachedVariants = e.variants.map(function(t) {
                        return l(e, { variants: null }, t);
                      }));
                    if (e.cachedVariants) return e.cachedVariants;
                    if (
                      (function e(t) {
                        return !!t && (t.endsWithParent || e(t.starts));
                      })(e)
                    )
                      return l(e, { starts: e.starts ? l(e.starts) : null });
                    if (Object.isFrozen(e)) return l(e);
                    return e;
                  })('self' === e ? r : e);
                }),
              )),
              r.contains.forEach(function(e) {
                t(e, o);
              }),
              r.starts && t(r.starts, i),
              (o.matcher = (function(e) {
                const t = new a();
                return (
                  e.contains.forEach(e =>
                    t.addRule(e.begin, { rule: e, type: 'begin' }),
                  ),
                  e.terminatorEnd &&
                    t.addRule(e.terminatorEnd, { type: 'end' }),
                  e.illegal && t.addRule(e.illegal, { type: 'illegal' }),
                  t
                );
              })(o)),
              o
            );
          })(e)
        );
      }
      function L(e) {
        const t = {
          props: ['language', 'code', 'autodetect'],
          data: function() {
            return { detectedLanguage: '', unknownLanguage: !1 };
          },
          computed: {
            className() {
              return this.unknownLanguage
                ? ''
                : 'hljs ' + this.detectedLanguage;
            },
            highlighted() {
              if (!this.autoDetect && !e.getLanguage(this.language))
                return (
                  console.warn(
                    `The language "${this.language}" you specified could not be found.`,
                  ),
                  (this.unknownLanguage = !0),
                  o(this.code)
                );
              let t = {};
              return (
                this.autoDetect
                  ? ((t = e.highlightAuto(this.code)),
                    (this.detectedLanguage = t.language))
                  : ((t = e.highlight(
                      this.language,
                      this.code,
                      this.ignoreIllegals,
                    )),
                    (this.detectedLanguage = this.language)),
                t.value
              );
            },
            autoDetect() {
              return (
                !this.language ||
                ((e = this.autodetect), Boolean(e || '' === e))
              );
              var e;
            },
            ignoreIllegals: () => !0,
          },
          render(e) {
            return e('pre', {}, [
              e('code', {
                class: this.className,
                domProps: { innerHTML: this.highlighted },
              }),
            ]);
          },
        };
        return {
          Component: t,
          VuePlugin: {
            install(e) {
              e.component('highlightjs', t);
            },
          },
        };
      }
      const U = {
        'after:highlightElement': ({ el: e, result: t, text: n }) => {
          const r = H(e);
          if (!r.length) return;
          const a = document.createElement('div');
          (a.innerHTML = t.value),
            (t.value = (function(e, t, n) {
              let r = 0,
                a = '';
              const i = [];
              function l() {
                return e.length && t.length
                  ? e[0].offset !== t[0].offset
                    ? e[0].offset < t[0].offset
                      ? e
                      : t
                    : 'start' === t[0].event
                    ? e
                    : t
                  : e.length
                  ? e
                  : t;
              }
              function u(e) {
                a +=
                  '<' +
                  $(e) +
                  [].map
                    .call(e.attributes, function(e) {
                      return ' ' + e.nodeName + '="' + o(e.value) + '"';
                    })
                    .join('') +
                  '>';
              }
              function s(e) {
                a += '</' + $(e) + '>';
              }
              function c(e) {
                ('start' === e.event ? u : s)(e.node);
              }
              for (; e.length || t.length; ) {
                let t = l();
                if (
                  ((a += o(n.substring(r, t[0].offset))),
                  (r = t[0].offset),
                  t === e)
                ) {
                  i.reverse().forEach(s);
                  do {
                    c(t.splice(0, 1)[0]), (t = l());
                  } while (t === e && t.length && t[0].offset === r);
                  i.reverse().forEach(u);
                } else
                  'start' === t[0].event ? i.push(t[0].node) : i.pop(),
                    c(t.splice(0, 1)[0]);
              }
              return a + o(n.substr(r));
            })(r, H(a), n));
        },
      };
      function $(e) {
        return e.nodeName.toLowerCase();
      }
      function H(e) {
        const t = [];
        return (
          (function e(n, r) {
            for (let a = n.firstChild; a; a = a.nextSibling)
              3 === a.nodeType
                ? (r += a.nodeValue.length)
                : 1 === a.nodeType &&
                  (t.push({ event: 'start', offset: r, node: a }),
                  (r = e(a, r)),
                  $(a).match(/br|hr|img|input/) ||
                    t.push({ event: 'stop', offset: r, node: a }));
            return r;
          })(e, 0),
          t
        );
      }
      const V = {},
        W = e => {
          console.error(e);
        },
        q = (e, ...t) => {
          console.log('WARN: ' + e, ...t);
        },
        Y = (e, t) => {
          V[`${e}/${t}`] ||
            (console.log(`Deprecated as of ${e}. ${t}`), (V[`${e}/${t}`] = !0));
        },
        Q = o,
        K = l,
        G = Symbol('nomatch');
      var Z = (function(e) {
        const t = Object.create(null),
          n = Object.create(null),
          a = [];
        let o = !0;
        const l = /(^(<[^>]+>|\t|)+|\n)/gm,
          u =
            "Could not find the language '{}', did you forget to load/include a language module?",
          s = { disableAutodetect: !0, name: 'Plain text', contains: [] };
        let c = {
          noHighlightRe: /^(no-?highlight)$/i,
          languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
          classPrefix: 'hljs-',
          tabReplace: null,
          useBR: !1,
          languages: null,
          __emitter: f,
        };
        function d(e) {
          return c.noHighlightRe.test(e);
        }
        function p(e, t, n, r) {
          let a = '',
            i = '';
          'object' == typeof t
            ? ((a = e), (n = t.ignoreIllegals), (i = t.language), (r = void 0))
            : (Y(
                '10.7.0',
                'highlight(lang, code, ...args) has been deprecated.',
              ),
              Y(
                '10.7.0',
                'Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277',
              ),
              (i = e),
              (a = t));
          const o = { code: a, language: i };
          _('before:highlight', o);
          const l = o.result ? o.result : h(o.language, o.code, n, r);
          return (l.code = o.code), _('after:highlight', l), l;
        }
        function h(e, n, r, l) {
          function s(e, t) {
            const n = x.case_insensitive ? t[0].toLowerCase() : t[0];
            return (
              Object.prototype.hasOwnProperty.call(e.keywords, n) &&
              e.keywords[n]
            );
          }
          function f() {
            null != k.subLanguage
              ? (function() {
                  if ('' === A) return;
                  let e = null;
                  if ('string' == typeof k.subLanguage) {
                    if (!t[k.subLanguage]) return void _.addText(A);
                    (e = h(k.subLanguage, A, !0, C[k.subLanguage])),
                      (C[k.subLanguage] = e.top);
                  } else e = m(A, k.subLanguage.length ? k.subLanguage : null);
                  k.relevance > 0 && (T += e.relevance),
                    _.addSublanguage(e.emitter, e.language);
                })()
              : (function() {
                  if (!k.keywords) return void _.addText(A);
                  let e = 0;
                  k.keywordPatternRe.lastIndex = 0;
                  let t = k.keywordPatternRe.exec(A),
                    n = '';
                  for (; t; ) {
                    n += A.substring(e, t.index);
                    const r = s(k, t);
                    if (r) {
                      const [e, a] = r;
                      if ((_.addText(n), (n = ''), (T += a), e.startsWith('_')))
                        n += t[0];
                      else {
                        const n = x.classNameAliases[e] || e;
                        _.addKeyword(t[0], n);
                      }
                    } else n += t[0];
                    (e = k.keywordPatternRe.lastIndex),
                      (t = k.keywordPatternRe.exec(A));
                  }
                  (n += A.substr(e)), _.addText(n);
                })(),
              (A = '');
          }
          function d(e) {
            return (
              e.className &&
                _.openNode(x.classNameAliases[e.className] || e.className),
              (k = Object.create(e, { parent: { value: k } })),
              k
            );
          }
          function p(e) {
            return 0 === k.matcher.regexIndex
              ? ((A += e[0]), 1)
              : ((O = !0), 0);
          }
          function g(e) {
            const t = e[0],
              n = e.rule,
              r = new i(n),
              a = [n.__beforeBegin, n['on:begin']];
            for (const n of a)
              if (n && (n(e, r), r.isMatchIgnored)) return p(t);
            return (
              n &&
                n.endSameAsBegin &&
                (n.endRe = new RegExp(
                  t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
                  'm',
                )),
              n.skip
                ? (A += t)
                : (n.excludeBegin && (A += t),
                  f(),
                  n.returnBegin || n.excludeBegin || (A = t)),
              d(n),
              n.returnBegin ? 0 : t.length
            );
          }
          function y(e) {
            const t = e[0],
              r = n.substr(e.index),
              a = (function e(t, n, r) {
                let a = (function(e, t) {
                  const n = e && e.exec(t);
                  return n && 0 === n.index;
                })(t.endRe, r);
                if (a) {
                  if (t['on:end']) {
                    const e = new i(t);
                    t['on:end'](n, e), e.isMatchIgnored && (a = !1);
                  }
                  if (a) {
                    for (; t.endsParent && t.parent; ) t = t.parent;
                    return t;
                  }
                }
                if (t.endsWithParent) return e(t.parent, n, r);
              })(k, e, r);
            if (!a) return G;
            const o = k;
            o.skip
              ? (A += t)
              : (o.returnEnd || o.excludeEnd || (A += t),
                f(),
                o.excludeEnd && (A = t));
            do {
              k.className && _.closeNode(),
                k.skip || k.subLanguage || (T += k.relevance),
                (k = k.parent);
            } while (k !== a.parent);
            return (
              a.starts &&
                (a.endSameAsBegin && (a.starts.endRe = a.endRe), d(a.starts)),
              o.returnEnd ? 0 : t.length
            );
          }
          let b = {};
          function v(t, a) {
            const i = a && a[0];
            if (((A += t), null == i)) return f(), 0;
            if (
              'begin' === b.type &&
              'end' === a.type &&
              b.index === a.index &&
              '' === i
            ) {
              if (((A += n.slice(a.index, a.index + 1)), !o)) {
                const t = new Error('0 width match regex');
                throw ((t.languageName = e), (t.badRule = b.rule), t);
              }
              return 1;
            }
            if (((b = a), 'begin' === a.type)) return g(a);
            if ('illegal' === a.type && !r) {
              const e = new Error(
                'Illegal lexeme "' +
                  i +
                  '" for mode "' +
                  (k.className || '<unnamed>') +
                  '"',
              );
              throw ((e.mode = k), e);
            }
            if ('end' === a.type) {
              const e = y(a);
              if (e !== G) return e;
            }
            if ('illegal' === a.type && '' === i) return 1;
            if (N > 1e5 && N > 3 * a.index) {
              throw new Error(
                'potential infinite loop, way more iterations than matches',
              );
            }
            return (A += i), i.length;
          }
          const x = D(e);
          if (!x)
            throw (W(u.replace('{}', e)),
            new Error('Unknown language: "' + e + '"'));
          const E = z(x, { plugins: a });
          let w = '',
            k = l || E;
          const C = {},
            _ = new c.__emitter(c);
          !(function() {
            const e = [];
            for (let t = k; t !== x; t = t.parent)
              t.className && e.unshift(t.className);
            e.forEach(e => _.openNode(e));
          })();
          let A = '',
            T = 0,
            S = 0,
            N = 0,
            O = !1;
          try {
            for (k.matcher.considerAll(); ; ) {
              N++,
                O ? (O = !1) : k.matcher.considerAll(),
                (k.matcher.lastIndex = S);
              const e = k.matcher.exec(n);
              if (!e) break;
              const t = v(n.substring(S, e.index), e);
              S = e.index + t;
            }
            return (
              v(n.substr(S)),
              _.closeAllNodes(),
              _.finalize(),
              (w = _.toHTML()),
              {
                relevance: Math.floor(T),
                value: w,
                language: e,
                illegal: !1,
                emitter: _,
                top: k,
              }
            );
          } catch (t) {
            if (t.message && t.message.includes('Illegal'))
              return {
                illegal: !0,
                illegalBy: {
                  msg: t.message,
                  context: n.slice(S - 100, S + 100),
                  mode: t.mode,
                },
                sofar: w,
                relevance: 0,
                value: Q(n),
                emitter: _,
              };
            if (o)
              return {
                illegal: !1,
                relevance: 0,
                value: Q(n),
                emitter: _,
                language: e,
                top: k,
                errorRaised: t,
              };
            throw t;
          }
        }
        function m(e, n) {
          n = n || c.languages || Object.keys(t);
          const r = (function(e) {
              const t = {
                relevance: 0,
                emitter: new c.__emitter(c),
                value: Q(e),
                illegal: !1,
                top: s,
              };
              return t.emitter.addText(e), t;
            })(e),
            a = n
              .filter(D)
              .filter(C)
              .map(t => h(t, e, !1));
          a.unshift(r);
          const i = a.sort((e, t) => {
              if (e.relevance !== t.relevance) return t.relevance - e.relevance;
              if (e.language && t.language) {
                if (D(e.language).supersetOf === t.language) return 1;
                if (D(t.language).supersetOf === e.language) return -1;
              }
              return 0;
            }),
            [o, l] = i,
            u = o;
          return (u.second_best = l), u;
        }
        const g = {
            'before:highlightElement': ({ el: e }) => {
              c.useBR &&
                (e.innerHTML = e.innerHTML
                  .replace(/\n/g, '')
                  .replace(/<br[ /]*>/g, '\n'));
            },
            'after:highlightElement': ({ result: e }) => {
              c.useBR && (e.value = e.value.replace(/\n/g, '<br>'));
            },
          },
          y = /^(<[^>]+>|\t)+/gm,
          b = {
            'after:highlightElement': ({ result: e }) => {
              c.tabReplace &&
                (e.value = e.value.replace(y, e =>
                  e.replace(/\t/g, c.tabReplace),
                ));
            },
          };
        function v(e) {
          let t = null;
          const r = (function(e) {
            let t = e.className + ' ';
            t += e.parentNode ? e.parentNode.className : '';
            const n = c.languageDetectRe.exec(t);
            if (n) {
              const t = D(n[1]);
              return (
                t ||
                  (q(u.replace('{}', n[1])),
                  q('Falling back to no-highlight mode for this block.', e)),
                t ? n[1] : 'no-highlight'
              );
            }
            return t.split(/\s+/).find(e => d(e) || D(e));
          })(e);
          if (d(r)) return;
          _('before:highlightElement', { el: e, language: r }), (t = e);
          const a = t.textContent,
            i = r ? p(a, { language: r, ignoreIllegals: !0 }) : m(a);
          _('after:highlightElement', { el: e, result: i, text: a }),
            (e.innerHTML = i.value),
            (function(e, t, r) {
              const a = t ? n[t] : r;
              e.classList.add('hljs'), a && e.classList.add(a);
            })(e, r, i.language),
            (e.result = {
              language: i.language,
              re: i.relevance,
              relavance: i.relevance,
            }),
            i.second_best &&
              (e.second_best = {
                language: i.second_best.language,
                re: i.second_best.relevance,
                relavance: i.second_best.relevance,
              });
        }
        const x = () => {
          if (x.called) return;
          (x.called = !0),
            Y(
              '10.6.0',
              'initHighlighting() is deprecated.  Use highlightAll() instead.',
            );
          document.querySelectorAll('pre code').forEach(v);
        };
        let E = !1;
        function w() {
          if ('loading' === document.readyState) return void (E = !0);
          document.querySelectorAll('pre code').forEach(v);
        }
        function D(e) {
          return (e = (e || '').toLowerCase()), t[e] || t[n[e]];
        }
        function k(e, { languageName: t }) {
          'string' == typeof e && (e = [e]),
            e.forEach(e => {
              n[e.toLowerCase()] = t;
            });
        }
        function C(e) {
          const t = D(e);
          return t && !t.disableAutodetect;
        }
        function _(e, t) {
          const n = e;
          a.forEach(function(e) {
            e[n] && e[n](t);
          });
        }
        'undefined' != typeof window &&
          window.addEventListener &&
          window.addEventListener(
            'DOMContentLoaded',
            function() {
              E && w();
            },
            !1,
          ),
          Object.assign(e, {
            highlight: p,
            highlightAuto: m,
            highlightAll: w,
            fixMarkup: function(e) {
              return (
                Y('10.2.0', 'fixMarkup will be removed entirely in v11.0'),
                Y(
                  '10.2.0',
                  'Please see https://github.com/highlightjs/highlight.js/issues/2534',
                ),
                (t = e),
                c.tabReplace || c.useBR
                  ? t.replace(l, e =>
                      '\n' === e
                        ? c.useBR
                          ? '<br>'
                          : e
                        : c.tabReplace
                        ? e.replace(/\t/g, c.tabReplace)
                        : e,
                    )
                  : t
              );
              var t;
            },
            highlightElement: v,
            highlightBlock: function(e) {
              return (
                Y('10.7.0', 'highlightBlock will be removed entirely in v12.0'),
                Y('10.7.0', 'Please use highlightElement now.'),
                v(e)
              );
            },
            configure: function(e) {
              e.useBR &&
                (Y('10.3.0', "'useBR' will be removed entirely in v11.0"),
                Y(
                  '10.3.0',
                  'Please see https://github.com/highlightjs/highlight.js/issues/2559',
                )),
                (c = K(c, e));
            },
            initHighlighting: x,
            initHighlightingOnLoad: function() {
              Y(
                '10.6.0',
                'initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.',
              ),
                (E = !0);
            },
            registerLanguage: function(n, r) {
              let a = null;
              try {
                a = r(e);
              } catch (e) {
                if (
                  (W(
                    "Language definition for '{}' could not be registered.".replace(
                      '{}',
                      n,
                    ),
                  ),
                  !o)
                )
                  throw e;
                W(e), (a = s);
              }
              a.name || (a.name = n),
                (t[n] = a),
                (a.rawDefinition = r.bind(null, e)),
                a.aliases && k(a.aliases, { languageName: n });
            },
            unregisterLanguage: function(e) {
              delete t[e];
              for (const t of Object.keys(n)) n[t] === e && delete n[t];
            },
            listLanguages: function() {
              return Object.keys(t);
            },
            getLanguage: D,
            registerAliases: k,
            requireLanguage: function(e) {
              Y('10.4.0', 'requireLanguage will be removed entirely in v11.'),
                Y(
                  '10.4.0',
                  'Please see https://github.com/highlightjs/highlight.js/pull/2844',
                );
              const t = D(e);
              if (t) return t;
              throw new Error(
                "The '{}' language is required, but not loaded.".replace(
                  '{}',
                  e,
                ),
              );
            },
            autoDetection: C,
            inherit: K,
            addPlugin: function(e) {
              !(function(e) {
                e['before:highlightBlock'] &&
                  !e['before:highlightElement'] &&
                  (e['before:highlightElement'] = t => {
                    e['before:highlightBlock'](
                      Object.assign({ block: t.el }, t),
                    );
                  }),
                  e['after:highlightBlock'] &&
                    !e['after:highlightElement'] &&
                    (e['after:highlightElement'] = t => {
                      e['after:highlightBlock'](
                        Object.assign({ block: t.el }, t),
                      );
                    });
              })(e),
                a.push(e);
            },
            vuePlugin: L(e).VuePlugin,
          }),
          (e.debugMode = function() {
            o = !1;
          }),
          (e.safeMode = function() {
            o = !0;
          }),
          (e.versionString = '10.7.3');
        for (const e in O) 'object' == typeof O[e] && r(O[e]);
        return (
          Object.assign(e, O), e.addPlugin(g), e.addPlugin(U), e.addPlugin(b), e
        );
      })({});
      e.exports = Z;
    },
    17: function(e, t, n) {
      const { getMapValueOfType: r } = n(2),
        a = n(78),
        i = {
          hasExternalDocs() {
            return !(
              !this._json.externalDocs ||
              !Object.keys(this._json.externalDocs).length
            );
          },
          externalDocs() {
            return r(this._json, 'externalDocs', a);
          },
        };
      e.exports = i;
    },
    2: function(e, t) {
      const n = e.exports,
        r = (e, t, n, r) => {
          if ('string' != typeof t || !e) return null;
          const a = e[String(t)];
          return void 0 === a ? null : n ? new n(a, r) : a;
        };
      (n.createMapOfType = (e, t, n) => {
        const r = {};
        return e
          ? (Object.entries(e).forEach(([e, a]) => {
              r[String(e)] = new t(a, n);
            }),
            r)
          : r;
      }),
        (n.getMapValueOfType = (e, t, n, a) => r(e, t, n, a)),
        (n.getMapValueByKey = (e, t) => r(e, t)),
        (n.mix = (e, ...t) => {
          let n = !1;
          if (
            t.some(function(t) {
              return (
                e === t ||
                ((n = Object.keys(t).some(t => e.prototype.hasOwnProperty(t))),
                n)
              );
            })
          )
            throw n
              ? new Error(
                  `invalid mix function: model ${e.name} has at least one method that it is trying to replace by mixin`,
                )
              : new Error(
                  `invalid mix function: cannot use the model ${e.name} as a mixin`,
                );
          return t.forEach(t => Object.assign(e.prototype, t)), e;
        });
    },
    21: function(e, t, n) {
      const { getMapValueByKey: r } = n(2),
        a = {
          hasBindings() {
            return !(
              !this._json.bindings || !Object.keys(this._json.bindings).length
            );
          },
          bindings() {
            return this.hasBindings() ? this._json.bindings : {};
          },
          bindingProtocols() {
            return Object.keys(this.bindings());
          },
          hasBinding(e) {
            return this.hasBindings() && !!this._json.bindings[String(e)];
          },
          binding(e) {
            return r(this._json.bindings, e);
          },
        };
      e.exports = a;
    },
    22: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        o = n(3),
        l = n(74),
        u = n(38),
        s = n(40),
        c = n(85),
        f = n(17),
        d = n(25),
        p = n(4),
        {
          xParserSpecParsed: h,
          xParserSpecStringified: m,
          xParserCircle: g,
        } = n(24),
        {
          assignNameToAnonymousMessages: y,
          assignNameToComponentMessages: b,
          assignUidToComponentSchemas: v,
          assignUidToParameterSchemas: x,
          assignIdToAnonymousSchemas: E,
          assignUidToComponentParameterSchemas: w,
        } = n(88),
        { traverseAsyncApiDocument: D } = n(48);
      class k extends o {
        constructor(...e) {
          super(...e),
            !0 !== this.ext(h) &&
              (b(this),
              y(this),
              v(this),
              w(this),
              x(this),
              E(this),
              (this.json()[String(h)] = !0));
        }
        version() {
          return this._json.asyncapi;
        }
        info() {
          return new l(this._json.info);
        }
        id() {
          return this._json.id;
        }
        hasServers() {
          return !!this._json.servers;
        }
        servers() {
          return r(this._json.servers, u);
        }
        serverNames() {
          return this._json.servers ? Object.keys(this._json.servers) : [];
        }
        server(e) {
          return a(this._json.servers, e, u);
        }
        hasDefaultContentType() {
          return !!this._json.defaultContentType;
        }
        defaultContentType() {
          return this._json.defaultContentType || null;
        }
        hasChannels() {
          return !!this._json.channels;
        }
        channels() {
          return r(this._json.channels, s, this);
        }
        channelNames() {
          return this._json.channels ? Object.keys(this._json.channels) : [];
        }
        channel(e) {
          return a(this._json.channels, e, s, this);
        }
        hasComponents() {
          return !!this._json.components;
        }
        components() {
          return this._json.components ? new c(this._json.components) : null;
        }
        hasMessages() {
          return !!this.allMessages().size;
        }
        allMessages() {
          const e = new Map();
          return (
            this.hasChannels() &&
              this.channelNames().forEach(t => {
                const n = this.channel(t);
                n.hasPublish() &&
                  n
                    .publish()
                    .messages()
                    .forEach(t => {
                      e.set(t.uid(), t);
                    }),
                  n.hasSubscribe() &&
                    n
                      .subscribe()
                      .messages()
                      .forEach(t => {
                        e.set(t.uid(), t);
                      });
              }),
            this.hasComponents() &&
              Object.values(this.components().messages()).forEach(t => {
                e.set(t.uid(), t);
              }),
            e
          );
        }
        allSchemas() {
          const e = new Map();
          return (
            D(this, t => {
              t.uid() && e.set(t.uid(), t);
            }),
            e
          );
        }
        hasCircular() {
          return !!this._json[String(g)];
        }
        traverseSchemas(e, t) {
          D(this, e, t);
        }
        static stringify(e, t) {
          const n = { ...e.json() };
          return (
            (n[String(m)] = !0),
            JSON.stringify(
              n,
              (function() {
                const e = new Map(),
                  t = new Map();
                let n = null;
                return function(r, a) {
                  const i =
                      e.get(this) + (Array.isArray(this) ? `[${r}]` : '.' + r),
                    o = a === Object(a);
                  o && e.set(a, i);
                  const l = t.get(a) || '';
                  if (!l && o) {
                    const e = i.replace(/undefined\.\.?/, '');
                    t.set(a, e);
                  }
                  const u = '[' === l[0] ? '$' : '$.';
                  let s = l ? `$ref:${u}${l}` : a;
                  return null === n ? (n = a) : s === n && (s = '$ref:$'), s;
                };
              })(),
              t,
            )
          );
        }
        static parse(e) {
          let t = e;
          if (
            ('string' == typeof e
              ? (t = JSON.parse(e))
              : 'object' == typeof e && (t = { ...t }),
            'object' != typeof t || !t[String(h)])
          )
            throw new Error('Cannot parse invalid AsyncAPI document');
          if (!t[String(m)]) return new k(t);
          delete t[String(m)];
          return (
            (function e(t, n, r, a, i) {
              let o = t,
                l = '$ref:$';
              if (void 0 !== n) {
                o = t[String(n)];
                const e = n ? '.' + n : '';
                l = a.get(t) + (Array.isArray(t) ? `[${n}]` : e);
              }
              a.set(o, l), i.set(l, o);
              const u = i.get(o);
              u && (t[String(n)] = u);
              ('$ref:$' !== o && '$ref:$' !== u) || (t[String(n)] = r);
              if (o === Object(o)) for (const t in o) e(o, t, r, a, i);
            })(t, void 0, t, new Map(), new Map()),
            new k(t)
          );
        }
      }
      e.exports = i(k, d, f, p);
    },
    23: function(e, t) {
      const n = (e, t) => (
        (t.type = e.type.startsWith('https://github.com/asyncapi/parser-js/')
          ? e.type
          : 'https://github.com/asyncapi/parser-js/' + e.type),
        (t.title = e.title),
        e.detail && (t.detail = e.detail),
        e.validationErrors && (t.validationErrors = e.validationErrors),
        e.parsedJSON && (t.parsedJSON = e.parsedJSON),
        e.location && (t.location = e.location),
        e.refs && (t.refs = e.refs),
        t
      );
      class r extends Error {
        constructor(e) {
          super(), n(e, this), (this.message = e.title);
        }
        toJS() {
          return n(this, {});
        }
      }
      e.exports = r;
    },
    24: function(e, t) {
      e.exports = {
        xParserSpecParsed: 'x-parser-spec-parsed',
        xParserSpecStringified: 'x-parser-spec-stringified',
        xParserMessageName: 'x-parser-message-name',
        xParserSchemaId: 'x-parser-schema-id',
        xParserCircle: 'x-parser-circular',
        xParserCircleProps: 'x-parser-circular-props',
      };
    },
    25: function(e, t, n) {
      const r = n(80),
        a = {
          hasTags() {
            return !(
              !Array.isArray(this._json.tags) || !this._json.tags.length
            );
          },
          tags() {
            return this.hasTags() ? this._json.tags.map(e => new r(e)) : [];
          },
          tagNames() {
            return this.hasTags() ? this._json.tags.map(e => e.name) : [];
          },
          hasTag(e) {
            return this.hasTags() && this._json.tags.some(t => t.name === e);
          },
          tag(e) {
            const t = this.hasTags() && this._json.tags.find(t => t.name === e);
            return t ? new r(t) : null;
          },
        };
      e.exports = a;
    },
    274: function(e, t, n) {
      'use strict';
      n.r(t);
      var r = n(36),
        a = n(28),
        i = n(15),
        o = n.n(i);
      t.default = {
        render: Object(a.b)(r.a),
        hydrate: Object(a.a)(r.a),
        hljs: o.a,
      };
    },
    28: function(e, t, n) {
      'use strict';
      n.d(t, 'b', function() {
        return l;
      }),
        n.d(t, 'a', function() {
          return u;
        });
      var r = n(0),
        a = n.n(r),
        i = n(29);
      function o(e) {
        return 'undefined' != typeof document
          ? document.querySelector(e)
          : null;
      }
      function l(e) {
        return function(t, n, r) {
          null !== (n = n || o('asyncapi')) &&
            Object(i.render)(a.a.createElement(e, t), n, r);
        };
      }
      function u(e) {
        return function(t, n, r) {
          null !== (n = n || o('asyncapi')) &&
            Object(i.hydrate)(a.a.createElement(e, t), n, r);
        };
      }
    },
    29: function(e, t, n) {
      'use strict';
      !(function e() {
        if (
          'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
        ) {
          0;
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
          } catch (e) {
            console.error(e);
          }
        }
      })(),
        (e.exports = n(71));
    },
    3: function(e, t, n) {
      const r = n(23);
      e.exports = class {
        constructor(e) {
          if (null == e)
            throw new r(
              `Invalid JSON to instantiate the ${this.constructor.name} object.`,
            );
          this._json = e;
        }
        json(e) {
          return void 0 === e
            ? this._json
            : this._json
            ? this._json[String(e)]
            : void 0;
        }
      };
    },
    30: function(e, t, n) {
      const r = n(42),
        a = n(43),
        i = n(47),
        o = n(83);
      e.exports = class extends r {
        hasMultipleMessages() {
          return (
            !!(
              this._json.message &&
              this._json.message.oneOf &&
              this._json.message.oneOf.length > 1
            ) || (this._json.message, !1)
          );
        }
        traits() {
          const e = this._json['x-parser-original-traits'] || this._json.traits;
          return e ? e.map(e => new i(e)) : [];
        }
        hasTraits() {
          return (
            !!this._json['x-parser-original-traits'] || !!this._json.traits
          );
        }
        messages() {
          return this._json.message
            ? this._json.message.oneOf
              ? this._json.message.oneOf.map(e => new a(e))
              : [new a(this._json.message)]
            : [];
        }
        message(e) {
          return this._json.message
            ? this._json.message.oneOf
              ? 'number' != typeof e || e > this._json.message.oneOf.length - 1
                ? null
                : new a(this._json.message.oneOf[+e])
              : new a(this._json.message)
            : null;
        }
        security() {
          return this._json.security
            ? this._json.security.map(e => new o(e))
            : null;
        }
      };
    },
    36: function(e, t, n) {
      'use strict';
      var r = n(0),
        a = n.n(r),
        i = n(129),
        o = {
          schemaID: '',
          show: {
            sidebar: !1,
            info: !0,
            servers: !0,
            operations: !0,
            messages: !0,
            schemas: !0,
            errors: !0,
          },
          sidebar: { showOperations: 'byOperationsTags' },
        };
      var l = function(e, t, n) {
        return e[t]
          ? e[t][0]
            ? e[t][0][n]
            : e[t][n]
          : 'contentBoxSize' === t
          ? e.contentRect['inlineSize' === n ? 'width' : 'height']
          : void 0;
      };
      function u(e) {
        void 0 === e && (e = {});
        var t = e.onResize,
          n = Object(r.useRef)(void 0);
        n.current = t;
        var a = e.round || Math.round,
          i = Object(r.useRef)(),
          o = Object(r.useState)({ width: void 0, height: void 0 }),
          u = o[0],
          s = o[1],
          c = Object(r.useRef)(!1);
        Object(r.useEffect)(function() {
          return function() {
            c.current = !0;
          };
        }, []);
        var f,
          d,
          p,
          h,
          m,
          g,
          y = Object(r.useRef)({ width: void 0, height: void 0 }),
          b =
            ((f = Object(r.useCallback)(
              function(t) {
                return (
                  (i.current &&
                    i.current.box === e.box &&
                    i.current.round === a) ||
                    (i.current = {
                      box: e.box,
                      round: a,
                      instance: new ResizeObserver(function(t) {
                        var r = t[0],
                          i =
                            'border-box' === e.box
                              ? 'borderBoxSize'
                              : 'device-pixel-content-box' === e.box
                              ? 'devicePixelContentBoxSize'
                              : 'contentBoxSize',
                          o = l(r, i, 'inlineSize'),
                          u = l(r, i, 'blockSize'),
                          f = o ? a(o) : void 0,
                          d = u ? a(u) : void 0;
                        if (y.current.width !== f || y.current.height !== d) {
                          var p = { width: f, height: d };
                          (y.current.width = f),
                            (y.current.height = d),
                            n.current ? n.current(p) : c.current || s(p);
                        }
                      }),
                    }),
                  i.current.instance.observe(t, { box: e.box }),
                  function() {
                    i.current && i.current.instance.unobserve(t);
                  }
                );
              },
              [e.box, a],
            )),
            (d = e.ref),
            (p = Object(r.useRef)(null)),
            (h = Object(r.useRef)(null)),
            (m = Object(r.useRef)()),
            (g = Object(r.useCallback)(
              function() {
                var e = null;
                p.current
                  ? (e = p.current)
                  : d && (e = d instanceof HTMLElement ? d : d.current),
                  (h.current &&
                    h.current.element === e &&
                    h.current.reporter === g) ||
                    (m.current && (m.current(), (m.current = null)),
                    (h.current = { reporter: g, element: e }),
                    e && (m.current = f(e)));
              },
              [d, f],
            )),
            Object(r.useEffect)(
              function() {
                g();
              },
              [g],
            ),
            Object(r.useCallback)(
              function(e) {
                (p.current = e), g();
              },
              [g],
            ));
        return Object(r.useMemo)(
          function() {
            return { ref: b, width: u.width, height: u.height };
          },
          [b, u ? u.width : null, u ? u.height : null],
        );
      }
      var s = function() {
          return (s =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        c = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        f = function(e) {
          var t = e.chevronProps,
            n = e.children,
            r = c(e, ['chevronProps', 'children']);
          return a.a.createElement(
            'button',
            s({}, r, { className: 'focus:outline-none '.concat(r.className) }),
            n,
            a.a.createElement(
              'svg',
              s(
                {
                  version: '1.1',
                  viewBox: '0 0 24 24',
                  x: '0',
                  xmlns: 'http://www.w3.org/2000/svg',
                  y: '0',
                },
                t,
                {
                  className: 'inline-block align-baseline cursor-pointer -mb-1 w-5 transform transition-transform duration-150 ease-linear '.concat(
                    (null == t ? void 0 : t.className) || '',
                  ),
                },
              ),
              a.a.createElement('polygon', {
                points: '17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 ',
              }),
            ),
          );
        },
        d = a.a.createContext(null);
      function p() {
        return Object(r.useContext)(d);
      }
      var h = a.a.createContext({
          setShowSidebar: function(e) {
            return e;
          },
        }),
        m = function(e) {
          var t = e.config,
            n = Object(r.useState)(!1),
            i = n[0],
            o = n[1],
            l = (null == t ? void 0 : t.showOperations) || 'byDefault',
            u = p(),
            s = u.info(),
            c = s.ext('x-logo'),
            f = u.hasComponents() && u.components(),
            d = f && f.messages(),
            m = f && f.schemas(),
            v = g;
          'bySpecTags' === l ? (v = y) : 'byOperationsTags' === l && (v = b);
          var x =
              d &&
              Object.keys(d).length > 0 &&
              a.a.createElement(
                'li',
                { className: 'mb-3 mt-9' },
                a.a.createElement(
                  'a',
                  {
                    className:
                      'text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900',
                    href: '#messages',
                    onClick: function() {
                      return o(!1);
                    },
                  },
                  'Messages',
                ),
                a.a.createElement(
                  'ul',
                  { className: 'text-sm mt-2' },
                  Object.entries(d).map(function(e) {
                    var t = e[0],
                      n = e[1];
                    return a.a.createElement(
                      'li',
                      { key: t },
                      a.a.createElement(
                        'a',
                        {
                          className:
                            'flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900',
                          href: '#message-'.concat(t),
                          onClick: function() {
                            return o(!1);
                          },
                        },
                        a.a.createElement(
                          'div',
                          { className: 'break-all inline-block' },
                          n.uid(),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            E =
              m &&
              Object.keys(m).length > 0 &&
              a.a.createElement(
                'li',
                { className: 'mb-3 mt-9' },
                a.a.createElement(
                  'a',
                  {
                    className:
                      'text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900',
                    href: '#schemas',
                    onClick: function() {
                      return o(!1);
                    },
                  },
                  'Schemas',
                ),
                a.a.createElement(
                  'ul',
                  { className: 'text-sm mt-2' },
                  Object.keys(m).map(function(e) {
                    return a.a.createElement(
                      'li',
                      { key: e },
                      a.a.createElement(
                        'a',
                        {
                          className:
                            'flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900',
                          href: '#schema-'.concat(e),
                          onClick: function() {
                            return o(!1);
                          },
                        },
                        a.a.createElement(
                          'div',
                          { className: 'break-all inline-block' },
                          e,
                        ),
                      ),
                    );
                  }),
                ),
              );
          return a.a.createElement(
            h.Provider,
            { value: { setShowSidebar: o } },
            a.a.createElement(
              'div',
              {
                className:
                  'burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500',
                onClick: function() {
                  return o(function(e) {
                    return !e;
                  });
                },
                'data-lol': i,
              },
              a.a.createElement(
                'svg',
                {
                  viewBox: '0 0 100 70',
                  width: '40',
                  height: '30',
                  className: 'fill-current text-gray-200',
                },
                a.a.createElement('rect', { width: '100', height: '10' }),
                a.a.createElement('rect', {
                  y: '30',
                  width: '100',
                  height: '10',
                }),
                a.a.createElement('rect', {
                  y: '60',
                  width: '100',
                  height: '10',
                }),
              ),
            ),
            a.a.createElement(
              'div',
              {
                className: ''.concat(
                  i ? 'block fixed w-full' : 'hidden',
                  ' sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20',
                ),
              },
              a.a.createElement(
                'div',
                {
                  className: ''.concat(
                    i ? 'w-full' : '',
                    ' block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200',
                  ),
                },
                a.a.createElement(
                  'div',
                  { className: 'sidebar--content' },
                  a.a.createElement(
                    'div',
                    null,
                    c
                      ? a.a.createElement('img', {
                          src: c,
                          alt: ''
                            .concat(s.title(), ' logo, ')
                            .concat(s.version(), ' version'),
                        })
                      : a.a.createElement(
                          'h1',
                          { className: 'text-2xl font-light' },
                          s.title(),
                          ' ',
                          s.version(),
                        ),
                  ),
                  a.a.createElement(
                    'ul',
                    { className: 'text-sm mt-10 relative' },
                    a.a.createElement(
                      'li',
                      { className: 'mb-3' },
                      a.a.createElement(
                        'a',
                        {
                          className:
                            'text-gray-700 no-underline hover:text-gray-900',
                          href: '#introduction',
                          onClick: function() {
                            return o(!1);
                          },
                        },
                        'Introduction',
                      ),
                    ),
                    u.hasServers() &&
                      a.a.createElement(
                        'li',
                        { className: 'mb-3' },
                        a.a.createElement(
                          'a',
                          {
                            className:
                              'text-gray-700 no-underline hover:text-gray-900',
                            href: '#servers',
                            onClick: function() {
                              return o(!1);
                            },
                          },
                          'Servers',
                        ),
                      ),
                    u.hasChannels() &&
                      a.a.createElement(
                        a.a.Fragment,
                        null,
                        a.a.createElement(
                          'li',
                          { className: 'mb-3 mt-9' },
                          a.a.createElement(
                            'a',
                            {
                              className:
                                'text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900',
                              href: '#operations',
                              onClick: function() {
                                return o(!1);
                              },
                            },
                            'Operations',
                          ),
                          a.a.createElement(v, null),
                        ),
                        x,
                        E,
                      ),
                  ),
                ),
              ),
            ),
          );
        },
        g = function() {
          var e = p().channels(),
            t = [];
          return (
            Object.entries(e).forEach(function(e) {
              var n = e[0],
                r = e[1];
              r.hasPublish() &&
                t.push(
                  a.a.createElement(x, {
                    channelName: n,
                    key: 'pub-'.concat(n),
                  }),
                ),
                r.hasSubscribe() &&
                  t.push(
                    a.a.createElement(E, {
                      channelName: n,
                      key: 'sub-'.concat(n),
                    }),
                  );
            }),
            a.a.createElement('ul', { className: 'text-sm mt-2' }, t)
          );
        },
        y = function() {
          var e = p(),
            t = e.channels(),
            n = e.tags(),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    o = t[1];
                  o.hasPublish() &&
                    i.a.containTags(o.publish(), e) &&
                    n.push(
                      a.a.createElement(x, {
                        channelName: r,
                        key: 'pub-'.concat(r),
                      }),
                    ),
                    o.hasSubscribe() &&
                      i.a.containTags(o.subscribe(), e) &&
                      n.push(
                        a.a.createElement(E, {
                          channelName: r,
                          key: 'sub-'.concat(r),
                        }),
                      );
                }),
                n
              );
            },
            o = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && i.a.containTags(r.publish(), n)) ||
                o.push(
                  a.a.createElement(x, {
                    channelName: t,
                    key: 'pub-'.concat(t),
                  }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    i.a.containTags(r.subscribe(), n)) ||
                  o.push(
                    a.a.createElement(E, {
                      channelName: t,
                      key: 'sub-'.concat(t),
                    }),
                  );
            }),
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'ul',
                null,
                n &&
                  n.map(function(e) {
                    return (
                      r(e).length > 0 &&
                      a.a.createElement(
                        'li',
                        { key: e.name() },
                        a.a.createElement(v, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                o.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(v, { tagName: 'Untagged' }, o),
                  ),
              ),
            )
          );
        },
        b = function() {
          var e = p(),
            t = e.channels(),
            n = i.a.operationsTags(e),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    o = t[1];
                  o.hasPublish() &&
                    i.a.containTags(o.publish(), e) &&
                    n.push(
                      a.a.createElement(x, {
                        channelName: r,
                        key: 'pub-'.concat(r),
                      }),
                    ),
                    o.hasSubscribe() &&
                      i.a.containTags(o.subscribe(), e) &&
                      n.push(
                        a.a.createElement(E, {
                          channelName: r,
                          key: 'sub-'.concat(r),
                        }),
                      );
                }),
                n
              );
            },
            o = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && i.a.containTags(r.publish(), n)) ||
                o.push(
                  a.a.createElement(x, {
                    channelName: t,
                    key: 'pub-'.concat(t),
                  }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    i.a.containTags(r.subscribe(), n)) ||
                  o.push(
                    a.a.createElement(E, {
                      channelName: t,
                      key: 'sub-'.concat(t),
                    }),
                  );
            }),
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'ul',
                null,
                n &&
                  n.map(function(e) {
                    return (
                      r(e).length > 0 &&
                      a.a.createElement(
                        'li',
                        { key: e.name() },
                        a.a.createElement(v, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                o.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(v, { tagName: 'Untagged' }, o),
                  ),
              ),
            )
          );
        },
        v = function(e) {
          var t = e.tagName,
            n = e.children,
            i = Object(r.useState)(!1),
            o = i[0],
            l = i[1];
          return a.a.createElement(
            'div',
            null,
            a.a.createElement(
              f,
              {
                onClick: function() {
                  return l(function(e) {
                    return !e;
                  });
                },
                chevronProps: { className: o ? '-rotate-180' : '-rotate-90' },
              },
              a.a.createElement(
                'span',
                { className: 'text-sm inline-block mt-1 font-extralight' },
                t,
              ),
            ),
            a.a.createElement(
              'ul',
              {
                className: ''.concat(
                  o ? 'block' : 'hidden',
                  ' text-sm mt-2 font-light',
                ),
              },
              n,
            ),
          );
        },
        x = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(h).setShowSidebar;
          return a.a.createElement(
            'li',
            null,
            a.a.createElement(
              'a',
              {
                className:
                  'flex no-underline text-gray-700 mb-2 hover:text-gray-900',
                href: '#operation-publish-'.concat(t),
                onClick: function() {
                  return n(!1);
                },
              },
              a.a.createElement(
                'span',
                {
                  className:
                    'bg-blue-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs',
                  title: 'Publish',
                },
                'Pub',
              ),
              a.a.createElement(
                'span',
                { className: 'break-all inline-block' },
                t,
              ),
            ),
          );
        },
        E = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(h).setShowSidebar;
          return a.a.createElement(
            'li',
            null,
            a.a.createElement(
              'a',
              {
                className:
                  'flex no-underline text-gray-700 mb-2 hover:text-gray-900',
                href: '#operation-subscribe-'.concat(t),
                onClick: function() {
                  return n(!1);
                },
              },
              a.a.createElement(
                'span',
                {
                  className:
                    'bg-green-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs',
                  title: 'Subscribe',
                },
                'SUB',
              ),
              a.a.createElement(
                'span',
                { className: 'break-all inline-block' },
                t,
              ),
            ),
          );
        },
        w = function(e) {
          var t = e.href,
            n = e.title,
            r = e.className,
            i = e.children;
          return a.a.createElement(
            'a',
            {
              href: t,
              title: n,
              className: r,
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
            i,
          );
        },
        D = n(56),
        k = n(57),
        C = n(15),
        _ = n.n(C),
        A = n(58),
        T = n.n(A),
        S = n(59),
        N = n.n(S),
        O = n(60),
        F = n.n(O);
      _.a.registerLanguage('json', T.a),
        _.a.registerLanguage('yaml', N.a),
        _.a.registerLanguage('bash', F.a);
      var j = {
        langPrefix: 'hljs language-',
        highlight: function(e, t) {
          if (!_.a.getLanguage(t)) return e;
          try {
            return _.a.highlight(e, { language: t }).value;
          } catch (t) {
            return e;
          }
        },
      };
      var P = function(e) {
          var t,
            n = e.children;
          return n
            ? 'string' != typeof n
              ? a.a.createElement(a.a.Fragment, null, n)
              : a.a.createElement('div', {
                  className: 'prose max-w-none text-sm',
                  dangerouslySetInnerHTML: {
                    __html: Object(D.sanitize)(
                      ((t = n), Object(k.marked)(t, j)),
                    ),
                  },
                })
            : null;
        },
        R = function(e) {
          var t = e.tag,
            n = '#'.concat(t.name()),
            r = t.description() || '',
            i = t.externalDocs(),
            o = a.a.createElement(
              'div',
              {
                title: r,
                className:
                  'border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1',
              },
              a.a.createElement('span', { className: i ? 'underline' : '' }, n),
            );
          return i ? a.a.createElement(w, { href: i.url(), title: r }, o) : o;
        },
        B = function(e) {
          var t = e.tags;
          return t && t.length
            ? a.a.createElement(
                'ul',
                { className: 'flex flex-wrap leading-normal' },
                t.map(function(e) {
                  return a.a.createElement(
                    'li',
                    { className: 'inline-block mt-2 mr-2', key: e.name() },
                    a.a.createElement(R, { tag: e }),
                  );
                }),
              )
            : null;
        },
        I = n(1),
        M = function() {
          var e = p(),
            t = e.info();
          if (!t) return null;
          var n = e.id(),
            r = e.externalDocs(),
            i = t.license(),
            o = t.termsOfService(),
            l = e.defaultContentType(),
            u = t.contact(),
            s = i || o || l || u || r;
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              {
                className: 'panel-item--center px-8 text-left',
                id: 'introduction',
              },
              a.a.createElement(
                'div',
                { className: 'text-4xl' },
                t.title(),
                ' ',
                t.version(),
              ),
              s &&
                a.a.createElement(
                  'ul',
                  { className: 'flex flex-wrap mt-2 leading-normal' },
                  i &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      i.url()
                        ? a.a.createElement(
                            w,
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: i.url(),
                            },
                            a.a.createElement('span', null, i.name()),
                          )
                        : a.a.createElement(
                            'span',
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            },
                            i.name(),
                          ),
                    ),
                  o &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        w,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: o,
                        },
                        a.a.createElement('span', null, I.h),
                      ),
                    ),
                  l &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        w,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: ''.concat(I.a, '/').concat(l),
                        },
                        a.a.createElement('span', null, l),
                      ),
                    ),
                  r &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        w,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: r.url(),
                        },
                        a.a.createElement('span', null, I.c),
                      ),
                    ),
                  u &&
                    a.a.createElement(
                      a.a.Fragment,
                      null,
                      u.url() &&
                        a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2' },
                          a.a.createElement(
                            w,
                            {
                              className:
                                'border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: u.url(),
                            },
                            a.a.createElement('span', null, u.name() || I.i),
                          ),
                        ),
                      u.email() &&
                        a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2' },
                          a.a.createElement(
                            w,
                            {
                              className:
                                'border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: 'mailto:'.concat(u.email()),
                            },
                            a.a.createElement('span', null, u.email()),
                          ),
                        ),
                    ),
                  n &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                        },
                        'ID: ',
                        n,
                      ),
                    ),
                ),
              t.hasDescription() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-4' },
                  a.a.createElement(P, null, t.description()),
                ),
              e.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-4' },
                  a.a.createElement(B, { tags: e.tags() }),
                ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        z = (function() {
          function e() {}
          return (
            (e.securityType = function(e) {
              switch (e) {
                case 'apiKey':
                  return 'API key';
                case 'oauth2':
                  return 'OAuth2';
                case 'openIdConnect':
                  return 'Open ID';
                case 'http':
                  return 'HTTP';
                case 'userPassword':
                  return 'User/Password';
                case 'X509':
                  return 'X509:';
                case 'symmetricEncryption':
                  return 'Symmetric Encription';
                case 'asymmetricEncryption':
                  return 'Asymmetric Encription';
                case 'httpApiKey':
                  return 'HTTP API key';
                case 'scramSha256':
                  return 'ScramSha256';
                case 'scramSha512':
                  return 'ScramSha512';
                case 'gssapi':
                  return 'GSSAPI';
                default:
                  return 'API key';
              }
            }),
            (e.flowName = function(e) {
              switch (e) {
                case 'implicit':
                  return 'Implicit';
                case 'password':
                  return 'Password';
                case 'clientCredentials':
                  return 'Client credentials';
                case 'authorizationCode':
                  return 'Authorization Code';
                default:
                  return 'Implicit';
              }
            }),
            (e.getKafkaSecurity = function(e, t) {
              var n, r;
              if (
                ((n =
                  'kafka' === e
                    ? t
                      ? 'SASL_PLAINTEXT'
                      : 'PLAINTEXT'
                    : t
                    ? 'SASL_SSL'
                    : 'SSL'),
                t)
              )
                switch (t.type()) {
                  case 'plain':
                    r = 'PLAIN';
                    break;
                  case 'scramSha256':
                    r = 'SCRAM-SHA-256';
                    break;
                  case 'scramSha512':
                    r = 'SCRAM-SHA-512';
                    break;
                  case 'oauth2':
                    r = 'OAUTHBEARER';
                    break;
                  case 'gssapi':
                    r = 'GSSAPI';
                    break;
                  case 'X509':
                    n = 'SSL';
                }
              return { securityProtocol: n, saslMechanism: r };
            }),
            e
          );
        })(),
        L = function(e) {
          var t,
            n = e.security,
            r = void 0 === n ? [] : n,
            i = e.protocol,
            o = void 0 === i ? '' : i,
            l = e.header,
            u = void 0 === l ? 'Security' : l,
            s = p(),
            c = s.hasComponents() && s.components().securitySchemes();
          if (r && r.length && c && Object.keys(c).length) {
            var f = r
              .map(function(e) {
                var t = e.json(),
                  n = Object.keys(t)[0],
                  r = c[String(n)],
                  i = t[String(n)];
                return r
                  ? a.a.createElement($, {
                      protocol: o,
                      securitySchema: r,
                      requiredScopes: i,
                      key: r.type(),
                    })
                  : null;
              })
              .filter(Boolean);
            t = a.a.createElement(
              'ul',
              null,
              f.map(function(e, t) {
                return a.a.createElement(
                  'li',
                  { className: 'mt-2', key: t },
                  e,
                );
              }),
            );
          } else
            ('kafka' !== o && 'kafka-secure' !== o) ||
              (t = a.a.createElement($, { protocol: o, securitySchema: null }));
          return t
            ? a.a.createElement(
                'div',
                { className: 'text-sm mt-4' },
                a.a.createElement('h5', { className: 'text-gray-800' }, u, ':'),
                t,
              )
            : null;
        };
      var U,
        $ = function(e) {
          var t,
            n = e.securitySchema,
            r = e.protocol,
            i = (function(e, t) {
              void 0 === t && (t = []);
              var n = [];
              return (
                e &&
                  (e.name() &&
                    n.push(a.a.createElement('span', null, 'Name: ', e.name())),
                  e.in() &&
                    n.push(a.a.createElement('span', null, 'In: ', e.in())),
                  e.scheme() &&
                    n.push(
                      a.a.createElement('span', null, 'Scheme: ', e.scheme()),
                    ),
                  e.bearerFormat() &&
                    n.push(
                      a.a.createElement(
                        'span',
                        null,
                        'Bearer format: ',
                        e.bearerFormat(),
                      ),
                    ),
                  e.openIdConnectUrl() &&
                    n.push(
                      a.a.createElement(
                        w,
                        { href: e.openIdConnectUrl(), className: 'underline' },
                        'Connect URL',
                      ),
                    ),
                  t.length &&
                    n.push(
                      a.a.createElement(
                        'span',
                        null,
                        'Required scopes: ',
                        t.join(', '),
                      ),
                    )),
                n
              );
            })(n, e.requiredScopes);
          if (['kafka', 'kafka-secure'].includes(r)) {
            var o = z.getKafkaSecurity(r, n),
              l = o.securityProtocol,
              u = o.saslMechanism;
            t = a.a.createElement(
              'div',
              {
                className:
                  'px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded',
              },
              l &&
                a.a.createElement(
                  'div',
                  { className: 'mt-1' },
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                    },
                    'security.protocol:',
                  ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1',
                    },
                    l,
                  ),
                ),
              u &&
                a.a.createElement(
                  'div',
                  { className: 'mt-1' },
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                    },
                    'sasl.mechanism:',
                  ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1',
                    },
                    u,
                  ),
                ),
            );
          }
          var s = n && n.flows(),
            c =
              s &&
              Object.entries(s).map(function(e) {
                var t = e[0],
                  n = e[1],
                  r = n.authorizationUrl(),
                  i = n.tokenUrl(),
                  o = n.refreshUrl(),
                  l = n.scopes();
                return a.a.createElement(
                  'div',
                  {
                    className:
                      'px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded',
                    key: t,
                  },
                  a.a.createElement(
                    'div',
                    null,
                    a.a.createElement(
                      'span',
                      {
                        className:
                          'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                      },
                      'Flow:',
                    ),
                    a.a.createElement(
                      'span',
                      {
                        className:
                          'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                      },
                      z.flowName(t),
                    ),
                  ),
                  r &&
                    a.a.createElement(
                      'div',
                      { className: 'mt-1' },
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                        },
                        'Auth URL:',
                      ),
                      a.a.createElement(
                        w,
                        { href: r, className: 'underline' },
                        r,
                      ),
                    ),
                  i &&
                    a.a.createElement(
                      'div',
                      { className: 'mt-1' },
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                        },
                        'Token URL:',
                      ),
                      a.a.createElement(
                        w,
                        { href: i, className: 'underline' },
                        i,
                      ),
                    ),
                  o &&
                    a.a.createElement(
                      'div',
                      { className: 'mt-1' },
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                        },
                        'Refresh URL:',
                      ),
                      a.a.createElement(
                        w,
                        { href: o, className: 'underline' },
                        o,
                      ),
                    ),
                  l &&
                    a.a.createElement(
                      'div',
                      { className: 'mt-1' },
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'text-xs font-bold text-gray-600 mt-1 mr-1 uppercase',
                        },
                        'Scopes:',
                      ),
                      a.a.createElement(
                        'ul',
                        { className: 'inline-block' },
                        l &&
                          Object.entries(l).map(function(e) {
                            var t = e[0],
                              n = e[1];
                            return a.a.createElement(
                              'li',
                              {
                                className:
                                  'inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1',
                                title: n,
                                key: t,
                              },
                              t,
                            );
                          }),
                      ),
                    ),
                );
              });
          return a.a.createElement(
            'div',
            null,
            n &&
              i &&
              a.a.createElement(
                'div',
                null,
                a.a.createElement(
                  'span',
                  null,
                  z.securityType(n.type()),
                  i.length > 0 &&
                    a.a.createElement(
                      'ul',
                      { className: 'inline-block ml-2' },
                      i.map(function(e, t) {
                        return a.a.createElement(
                          'li',
                          {
                            className:
                              'inline-block font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded px-2 py-0 ml-1',
                            key: t,
                          },
                          e,
                        );
                      }),
                    ),
                ),
              ),
            n &&
              n.hasDescription() &&
              a.a.createElement(
                'div',
                null,
                a.a.createElement(P, null, n.description()),
              ),
            c &&
              c.length > 0 &&
              a.a.createElement(
                'ul',
                { className: 'my-2' },
                a.a.createElement('li', null, c),
              ),
            t && a.a.createElement('div', null, t),
          );
        },
        H = n(10),
        V = n.n(H);
      !(function(e) {
        (e.ANY = 'any'),
          (e.RESTRICTED_ANY = 'restricted any'),
          (e.NEVER = 'never'),
          (e.UNKNOWN = 'unknown');
      })(U || (U = {}));
      var W = [
          'string',
          'number',
          'integer',
          'boolean',
          'array',
          'object',
          'null',
        ],
        q = Object.keys({
          maxLength: 'string',
          minLength: 'string',
          pattern: 'string',
          contentMediaType: 'string',
          contentEncoding: 'string',
          multipleOf: 'number',
          maximum: 'number',
          exclusiveMaximum: 'number',
          minimum: 'number',
          exclusiveMinimum: 'number',
          items: 'array',
          maxItems: 'array',
          minItems: 'array',
          uniqueItems: 'array',
          contains: 'array',
          additionalItems: 'array',
          maxProperties: 'object',
          minProperties: 'object',
          required: 'object',
          properties: 'object',
          patternProperties: 'object',
          propertyNames: 'object',
          dependencies: 'object',
          additionalProperties: 'object',
        }),
        Y = (function() {
          function e() {}
          return (
            (e.toSchemaType = function(e) {
              var t = this;
              if (!e || 'function' != typeof e.json) return U.UNKNOWN;
              if (e.isBooleanSchema()) return !0 === e.json() ? U.ANY : U.NEVER;
              if (0 === Object.keys(e.json()).length) return U.ANY;
              var n = e.not();
              if (n && this.inferType(n) === U.ANY) return U.NEVER;
              var r = this.inferType(e);
              if (Array.isArray(r))
                return r
                  .map(function(n) {
                    return t.toType(n, e);
                  })
                  .join(' | ');
              r = this.toType(r, e);
              var a = this.toCombinedType(e);
              return r && a ? ''.concat(r, ' ').concat(a) : a || r;
            }),
            (e.prettifyValue = function(e) {
              var t = typeof e;
              return 'string' === t
                ? '"'.concat(e, '"')
                : 'number' === t || 'bigint' === t || 'boolean' === t
                ? e
                : Array.isArray(e)
                ? '['.concat(e.toString(), ']')
                : JSON.stringify(e);
            }),
            (e.humanizeConstraints = function(e) {
              var t = [],
                n = this.humanizeNumberRangeConstraint(
                  e.minimum(),
                  e.exclusiveMinimum(),
                  e.maximum(),
                  e.exclusiveMaximum(),
                );
              void 0 !== n && t.push(n);
              var r = this.humanizeMultipleOfConstraint(e.multipleOf());
              void 0 !== r && t.push(r);
              var a = this.humanizeRangeConstraint(
                'characters',
                e.minLength(),
                e.maxLength(),
              );
              void 0 !== a && t.push(a);
              var i = e.uniqueItems(),
                o = this.humanizeRangeConstraint(
                  i ? 'unique items' : 'items',
                  e.minItems(),
                  e.maxItems(),
                );
              void 0 !== o && t.push(o);
              var l = this.humanizeRangeConstraint(
                'properties',
                e.minProperties(),
                e.maxProperties(),
              );
              return void 0 !== l && t.push(l), t;
            }),
            (e.isExpandable = function(e) {
              var t = this.inferType(e);
              if (
                (t = Array.isArray(t) ? t : [t]).includes('object') ||
                t.includes('array')
              )
                return !0;
              if (
                e.oneOf() ||
                e.anyOf() ||
                e.allOf() ||
                Object.keys(e.properties()).length ||
                e.items() ||
                e.not() ||
                e.if() ||
                e.then() ||
                e.else()
              )
                return !0;
              var n = this.getCustomExtensions(e);
              return !(!n || !Object.keys(n).length);
            }),
            (e.serverVariablesToSchema = function(e) {
              var t;
              if (e && Object.keys(e).length) {
                var n =
                  (((t = {
                    type: 'object',
                    properties: Object.entries(e).reduce(function(e, t) {
                      var n = t[0],
                        r = t[1];
                      return (
                        (e[n] = Object.assign({}, r.json() || {})),
                        (e[n].type = 'string'),
                        e
                      );
                    }, {}),
                    required: Object.keys(e),
                  })[this.extRenderType] = !1),
                  (t[this.extRenderAdditionalInfo] = !1),
                  t);
                return new V.a(n);
              }
            }),
            (e.parametersToSchema = function(e) {
              var t,
                n = this;
              if (e && Object.keys(e).length) {
                var r =
                  (((t = {
                    type: 'object',
                    properties: Object.entries(e).reduce(function(e, t) {
                      var r = t[0],
                        a = t[1],
                        i = a.schema();
                      return (
                        (e[r] = Object.assign({}, i ? i.json() : {})),
                        (e[r].description =
                          a.description() || e[r].description),
                        (e[r][n.extParameterLocation] = a.location()),
                        e
                      );
                    }, {}),
                    required: Object.keys(e),
                  })[this.extRenderType] = !1),
                  (t[this.extRenderAdditionalInfo] = !1),
                  t);
                return new V.a(r);
              }
            }),
            (e.jsonToSchema = function(e) {
              var t = this.jsonFieldToSchema(e);
              return new V.a(t);
            }),
            (e.getCustomExtensions = function(e) {
              if (e && 'function' == typeof e.extensions)
                return Object.entries(e.extensions() || {}).reduce(function(
                  e,
                  t,
                ) {
                  var n = t[0],
                    r = t[1];
                  return (
                    n.startsWith('x-parser-') ||
                      n.startsWith('x-schema-private-') ||
                      (e[n] = r),
                    e
                  );
                },
                {});
            }),
            (e.getDependentRequired = function(e, t) {
              var n = [],
                r = t.dependencies();
              if (r) {
                for (var a = 0, i = Object.entries(r); a < i.length; a++) {
                  var o = i[a],
                    l = o[0],
                    u = o[1];
                  Array.isArray(u) && u.includes(e) && n.push(l);
                }
                return n.length ? n : void 0;
              }
            }),
            (e.getDependentSchemas = function(e) {
              var t,
                n = e.dependencies();
              if (n) {
                for (
                  var r = {}, a = 0, i = Object.entries(n);
                  a < i.length;
                  a++
                ) {
                  var o = i[a],
                    l = o[0],
                    u = o[1];
                  'object' != typeof u || Array.isArray(u) || (r[l] = u);
                }
                if (Object.keys(r).length) {
                  var s =
                    (((t = {
                      type: 'object',
                      properties: Object.entries(r).reduce(function(e, t) {
                        var n = t[0],
                          r = t[1];
                        return (e[n] = Object.assign({}, r.json())), e;
                      }, {}),
                    })[this.extRenderType] = !1),
                    (t[this.extRenderAdditionalInfo] = !1),
                    t);
                  return new V.a(s);
                }
              }
            }),
            (e.toType = function(e, t) {
              if (t.isCircular()) return e;
              if ('array' === e) {
                var n = t.items();
                return Array.isArray(n)
                  ? this.toItemsType(n, t)
                  : 'array<'.concat(
                      n ? this.toSchemaType(n) || U.UNKNOWN : U.ANY,
                      '>',
                    );
              }
              return e;
            }),
            (e.toItemsType = function(e, t) {
              var n = this,
                r = e
                  .map(function(e) {
                    return n.toSchemaType(e);
                  })
                  .join(', '),
                a = t.additionalItems();
              if (void 0 === a || a.json()) {
                var i =
                  void 0 === a || !0 === a.json()
                    ? U.ANY
                    : this.toSchemaType(a);
                return 'tuple<'
                  .concat(r || U.UNKNOWN, ', ...optional<')
                  .concat(i, '>>');
              }
              return 'tuple<'.concat(r || U.UNKNOWN, '>');
            }),
            (e.toCombinedType = function(e) {
              return e.oneOf()
                ? 'oneOf'
                : e.anyOf()
                ? 'anyOf'
                : e.allOf()
                ? 'allOf'
                : void 0;
            }),
            (e.inferType = function(e) {
              var t = e.type();
              if (void 0 !== t)
                return Array.isArray(t)
                  ? (t.includes('integer') &&
                      t.includes('number') &&
                      (t = t.filter(function(e) {
                        return 'integer' !== e;
                      })),
                    1 === t.length ? t[0] : t)
                  : t;
              var n = e.const();
              if (void 0 !== n) return typeof n;
              var r = e.enum();
              if (Array.isArray(r) && r.length) {
                var a = Array.from(
                  new Set(
                    r.map(function(e) {
                      return typeof e;
                    }),
                  ),
                );
                return 1 === a.length ? a[0] : a;
              }
              var i = Object.keys(e.json() || {}) || [];
              return !0 ===
                q.some(function(e) {
                  return i.includes(e);
                })
                ? U.RESTRICTED_ANY
                : this.toCombinedType(e)
                ? ''
                : U.ANY;
            }),
            (e.humanizeNumberRangeConstraint = function(e, t, n, r) {
              var a,
                i = void 0 !== t,
                o = void 0 !== e || i,
                l = void 0 !== r,
                u = void 0 !== n || l;
              return (
                o && u
                  ? ((a = i ? '( ' : '[ '),
                    (a += i ? t : e),
                    (a += ' .. '),
                    (a += l ? r : n),
                    (a += l ? ' )' : ' ]'))
                  : o
                  ? ((a = i ? '> ' : '>= '), (a += i ? t : e))
                  : u && ((a = l ? '< ' : '<= '), (a += l ? r : n)),
                a
              );
            }),
            (e.humanizeMultipleOfConstraint = function(e) {
              if (void 0 !== e) {
                var t = e.toString(10);
                return /^0\.0*1$/.test(t)
                  ? 'decimal places <= '.concat(t.split('.')[1].length)
                  : 'multiple of '.concat(t);
              }
            }),
            (e.humanizeRangeConstraint = function(e, t, n) {
              var r;
              return (
                void 0 !== t && void 0 !== n
                  ? (r =
                      t === n
                        ? ''.concat(t, ' ').concat(e)
                        : '[ '
                            .concat(t, ' .. ')
                            .concat(n, ' ] ')
                            .concat(e))
                  : void 0 !== n
                  ? (r = '<= '.concat(n, ' ').concat(e))
                  : void 0 !== t &&
                    (r =
                      1 === t ? 'non-empty' : '>= '.concat(t, ' ').concat(e)),
                r
              );
            }),
            (e.jsonFieldToSchema = function(e) {
              var t,
                n,
                r,
                a,
                i = this;
              return null == e
                ? (((t = { type: 'string', const: '' })[this.extRawValue] = !0),
                  t)
                : 'object' != typeof e
                ? (((n = {
                    type: 'string',
                    const: 'function' == typeof e.toString ? e.toString() : e,
                  })[this.extRawValue] = !0),
                  n)
                : this.isJSONSchema(e)
                ? e
                : Array.isArray(e)
                ? (((r = {
                    type: 'array',
                    items: e.map(function(e) {
                      return i.jsonFieldToSchema(e);
                    }),
                  })[this.extRenderType] = !1),
                  (r[this.extRenderAdditionalInfo] = !1),
                  r)
                : (((a = {
                    type: 'object',
                    properties: Object.entries(e).reduce(function(e, t) {
                      var n = t[0],
                        r = t[1];
                      return (e[n] = i.jsonFieldToSchema(r)), e;
                    }, {}),
                  })[this.extRenderType] = !1),
                  (a[this.extRenderAdditionalInfo] = !1),
                  a);
            }),
            (e.isJSONSchema = function(e) {
              return !(
                !e ||
                'object' != typeof e ||
                !(
                  W.includes(e.type) ||
                  (Array.isArray(e.type) &&
                    e.type.some(function(e) {
                      return !W.includes(e);
                    }))
                )
              );
            }),
            (e.extRenderType = 'x-schema-private-render-type'),
            (e.extRenderAdditionalInfo =
              'x-schema-private-render-additional-info'),
            (e.extRawValue = 'x-schema-private-raw-value'),
            (e.extParameterLocation = 'x-schema-private-parameter-location'),
            e
          );
        })(),
        Q = function(e) {
          var t = e.name,
            n = void 0 === t ? 'Extensions' : t,
            r = e.item,
            i = Y.getCustomExtensions(r);
          if (!i || !Object.keys(i).length) return null;
          var o = Y.jsonToSchema(i);
          return (
            o &&
            a.a.createElement(
              'div',
              { className: 'mt-2' },
              a.a.createElement(G, { schemaName: n, schema: o, onlyTitle: !0 }),
            )
          );
        },
        K = a.a.createContext({ reverse: !1 }),
        G = function(e) {
          var t = e.schemaName,
            n = e.schema,
            i = e.required,
            o = void 0 !== i && i,
            l = e.isPatternProperty,
            u = void 0 !== l && l,
            s = e.isProperty,
            c = void 0 !== s && s,
            d = e.isCircular,
            p = void 0 !== d && d,
            h = e.dependentRequired,
            m = e.expanded,
            g = void 0 !== m && m,
            y = e.onlyTitle,
            b = void 0 !== y && y,
            v = Object(r.useContext)(K).reverse,
            x = Object(r.useState)(g),
            E = x[0],
            D = x[1];
          if (
            !n ||
            ('string' == typeof t &&
              ((null == t ? void 0 : t.startsWith('x-parser-')) ||
                (null == t ? void 0 : t.startsWith('x-schema-private-'))))
          )
            return null;
          var k = Y.getDependentSchemas(n),
            C = Y.humanizeConstraints(n),
            _ = n.externalDocs(),
            A = !1 !== n.ext(Y.extRenderType),
            T = !0 === n.ext(Y.extRawValue),
            S = n.ext(Y.extParameterLocation),
            N = Y.isExpandable(n) || k,
            O = Y.toSchemaType(n);
          p = p || n.isCircular() || n.ext('x-parser-circular') || !1;
          var F = n.uid(),
            j = n.items();
          j && !Array.isArray(j)
            ? ((p = p || j.isCircular() || j.ext('x-parser-circular') || !1),
              (F = j.uid()),
              p &&
                'function' == typeof j.circularSchema &&
                (O = Y.toSchemaType(j.circularSchema())))
            : p &&
              'function' == typeof n.circularSchema &&
              (O = Y.toSchemaType(n.circularSchema()));
          var R = c ? 'italic' : '',
            B =
              'string' == typeof t
                ? a.a.createElement(
                    'span',
                    { className: 'break-words text-sm '.concat(R) },
                    t,
                  )
                : t;
          return a.a.createElement(
            K.Provider,
            { value: { reverse: !v } },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'div',
                { className: 'flex py-2' },
                a.a.createElement(
                  'div',
                  { className: ''.concat(b ? '' : 'min-w-1/4', ' mr-2') },
                  N && !p
                    ? a.a.createElement(
                        f,
                        {
                          onClick: function() {
                            return D(function(e) {
                              return !e;
                            });
                          },
                          chevronProps: {
                            className: E ? '-rotate-180' : '-rotate-90',
                          },
                        },
                        B,
                      )
                    : a.a.createElement(
                        'span',
                        {
                          className: 'break-words text-sm '.concat(
                            c ? 'italic' : '',
                          ),
                        },
                        t,
                      ),
                  u &&
                    a.a.createElement(
                      'div',
                      { className: 'text-gray-500 text-xs italic' },
                      '(pattern property)',
                    ),
                  o &&
                    a.a.createElement(
                      'div',
                      { className: 'text-red-600 text-xs' },
                      'required',
                    ),
                  h &&
                    a.a.createElement(
                      a.a.Fragment,
                      null,
                      a.a.createElement(
                        'div',
                        { className: 'text-gray-500 text-xs' },
                        'required when defined:',
                      ),
                      a.a.createElement(
                        'div',
                        { className: 'text-red-600 text-xs' },
                        h.join(', '),
                      ),
                    ),
                  n.deprecated() &&
                    a.a.createElement(
                      'div',
                      { className: 'text-red-600 text-xs' },
                      'deprecated',
                    ),
                  n.writeOnly() &&
                    a.a.createElement(
                      'div',
                      { className: 'text-gray-500 text-xs' },
                      'write-only',
                    ),
                  n.readOnly() &&
                    a.a.createElement(
                      'div',
                      { className: 'text-gray-500 text-xs' },
                      'read-only',
                    ),
                ),
                T
                  ? a.a.createElement(
                      'div',
                      null,
                      a.a.createElement(
                        'div',
                        { className: 'text-sm' },
                        n.const(),
                      ),
                    )
                  : a.a.createElement(
                      'div',
                      null,
                      a.a.createElement(
                        'div',
                        null,
                        A &&
                          a.a.createElement(
                            'div',
                            {
                              className:
                                'capitalize text-sm text-teal-500 font-bold inline-block mr-2',
                            },
                            p ? ''.concat(O, ' [CIRCULAR]') : O,
                          ),
                        a.a.createElement(
                          'div',
                          { className: 'inline-block' },
                          n.format() &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs',
                              },
                              'format: ',
                              n.format(),
                            ),
                          void 0 !== n.pattern() &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'bg-yellow-600 font-bold no-underline text-white rounded mr-2 p-1 text-xs',
                              },
                              'must match: ',
                              n.pattern(),
                            ),
                          void 0 !== n.contentMediaType() &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs',
                              },
                              'media type: ',
                              n.contentMediaType(),
                            ),
                          void 0 !== n.contentEncoding() &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs',
                              },
                              'encoding: ',
                              n.contentEncoding(),
                            ),
                          !!C.length &&
                            C.map(function(e) {
                              return a.a.createElement(
                                'span',
                                {
                                  className:
                                    'bg-purple-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs',
                                  key: e,
                                },
                                e,
                              );
                            }),
                          F &&
                            !F.startsWith('<anonymous-') &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border text-orange-600 rounded mr-2 p-1 text-xs',
                              },
                              'uid: ',
                              F,
                            ),
                        ),
                        n.hasDescription() &&
                          a.a.createElement(
                            'div',
                            null,
                            a.a.createElement(P, null, n.description()),
                          ),
                        void 0 !== n.default() &&
                          a.a.createElement(
                            'div',
                            { className: 'text-xs' },
                            'Default value:',
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border inline-block text-orange-600 rounded ml-1 py-0 px-2',
                              },
                              Y.prettifyValue(n.default()),
                            ),
                          ),
                        void 0 !== n.const() &&
                          a.a.createElement(
                            'div',
                            { className: 'text-xs' },
                            'Const:',
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border inline-block text-orange-600 rounded ml-1 py-0 px-2',
                              },
                              Y.prettifyValue(n.const()),
                            ),
                          ),
                        n.enum() &&
                          a.a.createElement(
                            'ul',
                            { className: 'text-xs' },
                            'Allowed values:',
                            ' ',
                            n.enum().map(function(e, t) {
                              return a.a.createElement(
                                'li',
                                {
                                  key: t,
                                  className:
                                    'border inline-block text-orange-600 rounded ml-1 py-0 px-2',
                                },
                                a.a.createElement(
                                  'span',
                                  null,
                                  Y.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                        S &&
                          a.a.createElement(
                            'div',
                            { className: 'text-xs' },
                            'Parameter location:',
                            ' ',
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border text-orange-600 rounded mr-2 p-1 text-xs',
                              },
                              S,
                            ),
                          ),
                        _ &&
                          a.a.createElement(
                            'span',
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-2 py-0',
                            },
                            a.a.createElement(
                              w,
                              { href: _.url(), title: _.description() || '' },
                              'Documentation',
                            ),
                          ),
                        n.examples() &&
                          a.a.createElement(
                            'ul',
                            { className: 'text-xs' },
                            'Examples values:',
                            ' ',
                            n.examples().map(function(e, t) {
                              return a.a.createElement(
                                'li',
                                {
                                  key: t,
                                  className:
                                    'border inline-block text-orange-600 rounded ml-1 py-0 px-2 break-all',
                                },
                                a.a.createElement(
                                  'span',
                                  null,
                                  Y.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                      ),
                    ),
              ),
              p || !N
                ? null
                : a.a.createElement(
                    'div',
                    {
                      className: 'rounded p-4 py-2 border bg-gray-100 '
                        .concat(v ? 'bg-gray-200' : '', ' ')
                        .concat(E ? 'block' : 'hidden'),
                    },
                    a.a.createElement(Z, { schema: n }),
                    a.a.createElement(J, { schema: n }),
                    n.oneOf() &&
                      n.oneOf().map(function(e, t) {
                        return a.a.createElement(G, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Adheres to:' : 'Or to:',
                        });
                      }),
                    n.anyOf() &&
                      n.anyOf().map(function(e, t) {
                        return a.a.createElement(G, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Can adhere to:' : 'Or to:',
                        });
                      }),
                    n.allOf() &&
                      n.allOf().map(function(e, t) {
                        return a.a.createElement(G, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Consists of:' : 'And with:',
                        });
                      }),
                    n.not() &&
                      a.a.createElement(G, {
                        schema: n.not(),
                        schemaName: 'Cannot adhere to:',
                      }),
                    n.propertyNames() &&
                      a.a.createElement(G, {
                        schema: n.propertyNames(),
                        schemaName: 'Property names must adhere to:',
                      }),
                    n.contains() &&
                      a.a.createElement(G, {
                        schema: n.contains(),
                        schemaName: 'Array must contain at least one of:',
                      }),
                    n.if() &&
                      a.a.createElement(G, {
                        schema: n.if(),
                        schemaName: 'If schema adheres to:',
                      }),
                    n.then() &&
                      a.a.createElement(G, {
                        schema: n.then(),
                        schemaName: 'Then must adhere to:',
                      }),
                    n.else() &&
                      a.a.createElement(G, {
                        schema: n.else(),
                        schemaName: 'Otherwise:',
                      }),
                    k &&
                      a.a.createElement(G, {
                        schema: k,
                        schemaName: 'Dependent schemas:',
                      }),
                    a.a.createElement(Q, { item: n }),
                    a.a.createElement(X, { schema: n }),
                    a.a.createElement(ee, { schema: n }),
                  ),
            ),
          );
        },
        Z = function(e) {
          var t = e.schema,
            n = t.properties() || {};
          if (!Object.keys(n)) return null;
          var r = t.required() || [],
            i = t.patternProperties(),
            o = t.ext('x-parser-circular-props') || [];
          return a.a.createElement(
            a.a.Fragment,
            null,
            Object.entries(n).map(function(e) {
              var n = e[0],
                i = e[1];
              return a.a.createElement(G, {
                schema: i,
                schemaName: n,
                required: r.includes(n),
                isProperty: !0,
                isCircular: o.includes(n),
                dependentRequired: Y.getDependentRequired(n, t),
                key: n,
              });
            }),
            Object.entries(i).map(function(e) {
              var t = e[0],
                n = e[1];
              return a.a.createElement(G, {
                schema: n,
                schemaName: t,
                isPatternProperty: !0,
                isProperty: !0,
                isCircular: o.includes(t),
                key: t,
              });
            }),
          );
        },
        X = function(e) {
          var t = e.schema;
          if (!1 === t.ext(Y.extRenderAdditionalInfo)) return null;
          var n = t.type();
          if (!(n = Array.isArray(n) ? n : [n]).includes('object')) return null;
          var r = t.additionalProperties();
          return !0 === r || void 0 === r
            ? a.a.createElement(
                'p',
                { className: 'mt-2 text-xs text-gray-700' },
                'Additional properties are allowed.',
              )
            : !1 === r
            ? a.a.createElement(
                'p',
                { className: 'mt-2 text-xs text-gray-700' },
                'Additional properties are ',
                a.a.createElement('strong', null, 'NOT'),
                ' allowed.',
              )
            : a.a.createElement(G, {
                schemaName: 'Additional properties:',
                schema: r,
              });
        },
        J = function(e) {
          var t = e.schema,
            n = t.type();
          if (!(n = Array.isArray(n) ? n : [n]).includes('array')) return null;
          var r = t.items();
          return r &&
            !Array.isArray(r) &&
            Object.keys(r.properties() || {}).length
            ? a.a.createElement(Z, { schema: r })
            : Array.isArray(r)
            ? a.a.createElement(
                a.a.Fragment,
                null,
                r.map(function(e, t) {
                  return a.a.createElement(G, {
                    schema: e,
                    schemaName: ''.concat(t + 1, ' item:'),
                    key: t,
                  });
                }),
              )
            : a.a.createElement(G, { schema: r, schemaName: 'Items:' });
        },
        ee = function(e) {
          var t = e.schema;
          if (!1 === t.ext(Y.extRenderAdditionalInfo)) return null;
          var n = t.type();
          if (!(n = Array.isArray(n) ? n : [n]).includes('array')) return null;
          if (!Array.isArray(t.items())) return null;
          var r = t.additionalItems();
          return !0 === r || void 0 === r
            ? a.a.createElement(
                'p',
                { className: 'mt-2 text-xs text-gray-700' },
                'Additional items are allowed.',
              )
            : !1 === r
            ? a.a.createElement(
                'p',
                { className: 'mt-2 text-xs text-gray-700' },
                'Additional items are ',
                a.a.createElement('strong', null, 'NOT'),
                ' allowed.',
              )
            : a.a.createElement(G, {
                schemaName: 'Additional items:',
                schema: r,
              });
        },
        te = function(e) {
          var t = e.name,
            n = void 0 === t ? 'Binding specific information' : t,
            r = e.bindings;
          if (!r || !Object.keys(r).length) return null;
          var i = Object.entries(r).map(function(e) {
            var t = e[0],
              r = e[1],
              i = Y.jsonToSchema(r),
              o = a.a.createElement(
                'div',
                { className: 'inline-block text-sm' },
                a.a.createElement('span', null, n),
                a.a.createElement(
                  'span',
                  {
                    className:
                      'bg-teal-500 font-bold no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs',
                  },
                  t,
                ),
              );
            return (
              i &&
              a.a.createElement(G, {
                schemaName: o,
                schema: i,
                key: t,
                onlyTitle: !0,
              })
            );
          });
          return a.a.createElement(a.a.Fragment, null, i);
        },
        ne = Object(r.createContext)({});
      function re() {
        return Object(r.useContext)(ne);
      }
      var ae = (function() {
          function e() {}
          return (
            (e.getIdentifier = function(e, t) {
              var n = null == t ? void 0 : t.schemaID;
              return n ? ''.concat(n, '-').concat(e) : e;
            }),
            e
          );
        })(),
        ie = function(e) {
          var t = e.serverName,
            n = e.server,
            r = re();
          if (!n) return null;
          var i = Y.serverVariablesToSchema(n.variables()),
            o = n.protocolVersion(),
            l = n.security();
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(
                'div',
                {
                  className:
                    'shadow rounded bg-gray-200 p-4 border bg-gray-100',
                },
                a.a.createElement(
                  'div',
                  null,
                  a.a.createElement(
                    'span',
                    { className: 'font-mono text-base' },
                    n.url(),
                  ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'bg-teal-500 font-bold no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm',
                    },
                    o ? ''.concat(n.protocol(), ' ').concat(o) : n.protocol(),
                  ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'bg-blue-500 font-bold no-underline text-white uppercase rounded px-2 py-1 text-sm',
                    },
                    t,
                  ),
                ),
                n.hasDescription() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(P, null, n.description()),
                  ),
                i &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'mt-2',
                      id: ''.concat(
                        ae.getIdentifier(
                          'server-'.concat(t, '-url-variables'),
                          r,
                        ),
                      ),
                    },
                    a.a.createElement(G, {
                      schemaName: 'URL Variables',
                      schema: i,
                      expanded: !0,
                    }),
                  ),
                a.a.createElement(
                  'div',
                  {
                    id: ''.concat(
                      ae.getIdentifier('server-'.concat(t, '-security'), r),
                    ),
                  },
                  a.a.createElement(L, { protocol: n.protocol(), security: l }),
                ),
                n.hasBindings() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(te, {
                      name: 'Server specific information',
                      bindings: n.bindings(),
                    }),
                  ),
              ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        oe = function() {
          var e = p().servers(),
            t = re();
          return Object.keys(e).length
            ? a.a.createElement(
                'section',
                {
                  id: ''.concat(ae.getIdentifier('servers', t)),
                  className: 'mt-16',
                },
                a.a.createElement(
                  'h2',
                  { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                  I.g,
                ),
                a.a.createElement(
                  'ul',
                  null,
                  Object.entries(e).map(function(e) {
                    var n = e[0],
                      r = e[1];
                    return a.a.createElement(
                      'li',
                      {
                        className: 'mb-4',
                        key: n,
                        id: ''.concat(ae.getIdentifier('server-'.concat(n), t)),
                      },
                      a.a.createElement(ie, {
                        serverName: n,
                        server: r,
                        key: n,
                      }),
                    );
                  }),
                ),
              )
            : null;
        },
        le = function(e) {
          var t = e.snippet;
          return (
            'object' == typeof t &&
              (t = '```json\n' + JSON.stringify(t, void 0, 2) + '\n```'),
            a.a.createElement(P, null, t)
          );
        };
      function ue(e) {
        return e < 10 ? '0' + e : e;
      }
      function se(e, t) {
        return t > e.length
          ? e.repeat(Math.trunc(t / e.length) + 1).substring(0, t)
          : e;
      }
      function ce(...e) {
        const t = e => e && 'object' == typeof e;
        return e.reduce(
          (e, n) => (
            Object.keys(n).forEach(r => {
              const a = e[r],
                i = n[r];
              t(a) && t(i) ? (e[r] = ce(a, i)) : (e[r] = i);
            }),
            e
          ),
          Array.isArray(e[e.length - 1]) ? [] : {},
        );
      }
      function fe(e) {
        return { value: 'object' === e ? {} : 'array' === e ? [] : void 0 };
      }
      function de(e, t) {
        t && e.pop();
      }
      const pe = {
        multipleOf: 'number',
        maximum: 'number',
        exclusiveMaximum: 'number',
        minimum: 'number',
        exclusiveMinimum: 'number',
        maxLength: 'string',
        minLength: 'string',
        pattern: 'string',
        items: 'array',
        maxItems: 'array',
        minItems: 'array',
        uniqueItems: 'array',
        additionalItems: 'array',
        maxProperties: 'object',
        minProperties: 'object',
        required: 'object',
        additionalProperties: 'object',
        properties: 'object',
        patternProperties: 'object',
        dependencies: 'object',
      };
      function he(e) {
        if (void 0 !== e.type)
          return Array.isArray(e.type)
            ? 0 === e.type.length
              ? null
              : e.type[0]
            : e.type;
        const t = Object.keys(pe);
        for (var n = 0; n < t.length; n++) {
          let r = t[n],
            a = pe[r];
          if (void 0 !== e[r]) return a;
        }
        return null;
      }
      var me = n(61),
        ge = n.n(me);
      let ye = {},
        be = [];
      function ve(e) {
        let t;
        return (
          void 0 !== e.const
            ? (t = e.const)
            : void 0 !== e.examples && e.examples.length
            ? (t = e.examples[0])
            : void 0 !== e.enum && e.enum.length
            ? (t = e.enum[0])
            : void 0 !== e.default && (t = e.default),
          t
        );
      }
      function xe(e) {
        const t = ve(e);
        if (void 0 !== t)
          return {
            value: t,
            readOnly: e.readOnly,
            writeOnly: e.writeOnly,
            type: null,
          };
      }
      function Ee(e, t, n, r) {
        if (r) {
          if (be.includes(e)) return fe(he(e));
          be.push(e);
        }
        if (r && r.depth > t.maxSampleDepth) return de(be, r), fe(he(e));
        if (e.$ref) {
          if (!n)
            throw new Error(
              'Your schema contains $ref. You must provide full specification in the third parameter.',
            );
          let a = decodeURIComponent(e.$ref);
          a.startsWith('#') && (a = a.substring(1));
          const i = ge.a.get(n, a);
          let o;
          if (!0 !== ye[a]) (ye[a] = !0), (o = Ee(i, t, n, r)), (ye[a] = !1);
          else {
            o = fe(he(i));
          }
          return de(be, r), o;
        }
        if (void 0 !== e.example)
          return (
            de(be, r),
            {
              value: e.example,
              readOnly: e.readOnly,
              writeOnly: e.writeOnly,
              type: e.type,
            }
          );
        if (void 0 !== e.allOf)
          return (
            de(be, r),
            xe(e) ||
              (function(e, t, n, r, a) {
                let i = Ee(e, n, r);
                const o = [];
                for (let e of t) {
                  const { type: t, readOnly: l, writeOnly: u, value: s } = Ee(
                    { type: i.type, ...e },
                    n,
                    r,
                    a,
                  );
                  i.type &&
                    t &&
                    t !== i.type &&
                    (console.warn(
                      "allOf: schemas with different types can't be merged",
                    ),
                    (i.type = t)),
                    (i.type = i.type || t),
                    (i.readOnly = i.readOnly || l),
                    (i.writeOnly = i.writeOnly || u),
                    null != s && o.push(s);
                }
                if ('object' === i.type)
                  return (
                    (i.value = ce(
                      i.value || {},
                      ...o.filter(e => 'object' == typeof e),
                    )),
                    i
                  );
                {
                  'array' === i.type &&
                    (n.quiet ||
                      console.warn(
                        'OpenAPI Sampler: found allOf with "array" type. Result may be incorrect',
                      ));
                  const e = o[o.length - 1];
                  return (i.value = null != e ? e : i.value), i;
                }
              })({ ...e, allOf: void 0 }, e.allOf, t, n, r)
          );
        if (e.oneOf && e.oneOf.length) {
          e.anyOf &&
            (t.quiet ||
              console.warn(
                'oneOf and anyOf are not supported on the same level. Skipping anyOf',
              )),
            de(be, r);
          const a = Object.assign(
            { readOnly: e.readOnly, writeOnly: e.writeOnly },
            e.oneOf[0],
          );
          return xe(e) || Ee(a, t, n, r);
        }
        if (e.anyOf && e.anyOf.length)
          return de(be, r), xe(e) || Ee(e.anyOf[0], t, n, r);
        if (e.if && e.then)
          return de(be, r), xe(e) || Ee(ce(e.if, e.then), t, n, r);
        let a = ve(e),
          i = null;
        if (void 0 === a) {
          (a = null),
            (i = e.type),
            Array.isArray(i) && e.type.length > 0 && (i = e.type[0]),
            i || (i = he(e));
          let o = _e[i];
          o && (a = o(e, t, n, r));
        }
        return (
          de(be, r),
          { value: a, readOnly: e.readOnly, writeOnly: e.writeOnly, type: i }
        );
      }
      function we(e) {
        let t = 0;
        if (
          'boolean' == typeof e.exclusiveMinimum ||
          'boolean' == typeof e.exclusiveMaximum
        ) {
          if (e.maximum && e.minimum)
            return (
              (t = e.exclusiveMinimum ? Math.floor(e.minimum) + 1 : e.minimum),
              ((e.exclusiveMaximum && t >= e.maximum) ||
                (!e.exclusiveMaximum && t > e.maximum)) &&
                (t = (e.maximum + e.minimum) / 2),
              t
            );
          if (e.minimum)
            return e.exclusiveMinimum ? Math.floor(e.minimum) + 1 : e.minimum;
          if (e.maximum)
            return e.exclusiveMaximum
              ? e.maximum > 0
                ? 0
                : Math.floor(e.maximum) - 1
              : e.maximum > 0
              ? 0
              : e.maximum;
        } else {
          if (e.minimum) return e.minimum;
          e.exclusiveMinimum
            ? ((t = Math.floor(e.exclusiveMinimum) + 1),
              t === e.exclusiveMaximum &&
                (t = (t + Math.floor(e.exclusiveMaximum) - 1) / 2))
            : e.exclusiveMaximum
            ? (t = Math.floor(e.exclusiveMaximum) - 1)
            : e.maximum && (t = e.maximum);
        }
        return t;
      }
      function De({ min: e, max: t, omitTime: n, omitDate: r }) {
        let a = (function(e, t, n, r) {
          var a = n
            ? ''
            : e.getUTCFullYear() +
              '-' +
              ue(e.getUTCMonth() + 1) +
              '-' +
              ue(e.getUTCDate());
          return (
            t ||
              (a +=
                'T' +
                ue(e.getUTCHours()) +
                ':' +
                ue(e.getUTCMinutes()) +
                ':' +
                ue(e.getUTCSeconds()) +
                (r
                  ? '.' + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5)
                  : '') +
                'Z'),
            a
          );
        })(new Date('2019-08-24T14:15:22.123Z'), n, r, !1);
        return (
          a.length < e &&
            console.warn(
              `Using minLength = ${e} is incorrect with format "date-time"`,
            ),
          t &&
            a.length > t &&
            console.warn(
              `Using maxLength = ${t} is incorrect with format "date-time"`,
            ),
          a
        );
      }
      function ke(e, t) {
        let n = se('string', e);
        return t && n.length > t && (n = n.substring(0, t)), n;
      }
      const Ce = {
        email: function() {
          return 'user@example.com';
        },
        'idn-email': function() {
          return 'пошта@укр.нет';
        },
        password: function(e, t) {
          let n = 'pa$$word';
          return (
            e > n.length &&
              ((n += '_'),
              (n += se('qwerty!@#$%^123456', e - n.length).substring(
                0,
                e - n.length,
              ))),
            n
          );
        },
        'date-time': function(e, t) {
          return De({ min: e, max: t, omitTime: !1, omitDate: !1 });
        },
        date: function(e, t) {
          return De({ min: e, max: t, omitTime: !0, omitDate: !1 });
        },
        time: function(e, t) {
          return De({ min: e, max: t, omitTime: !1, omitDate: !0 }).slice(1);
        },
        ipv4: function() {
          return '192.168.0.1';
        },
        ipv6: function() {
          return '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
        },
        hostname: function() {
          return 'example.com';
        },
        'idn-hostname': function() {
          return 'приклад.укр';
        },
        iri: function() {
          return 'http://example.com';
        },
        'iri-reference': function() {
          return '../словник';
        },
        uri: function() {
          return 'http://example.com';
        },
        'uri-reference': function() {
          return '../dictionary';
        },
        'uri-template': function() {
          return 'http://example.com/{endpoint}';
        },
        uuid: function(e, t, n) {
          return (
            (l = (function(e) {
              var t = 0;
              if (0 == e.length) return t;
              for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                (t = (t << 5) - t + r), (t &= t);
              }
              return t;
            })(n || 'id')),
            (r = l),
            (a = l),
            (i = l),
            (o = l),
            (u = function() {
              var e = ((r |= 0) - (((a |= 0) << 27) | (a >>> 5))) | 0;
              return (
                (r = a ^ (((i |= 0) << 17) | (i >>> 15))),
                (a = (i + (o |= 0)) | 0),
                (i = (o + e) | 0),
                ((o = (r + e) | 0) >>> 0) / 4294967296
              );
            }),
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, e => {
              var t = (16 * u()) % 16 | 0;
              return ('x' == e ? t : (3 & t) | 8).toString(16);
            })
          );
          var r, a, i, o, l, u;
        },
        default: ke,
        'json-pointer': function() {
          return '/json/pointer';
        },
        'relative-json-pointer': function() {
          return '1/relative/json/pointer';
        },
        regex: function() {
          return '/regex/';
        },
      };
      var _e = {};
      const Ae = { skipReadOnly: !1, maxSampleDepth: 15 };
      function Te(e, t, n) {
        let r = Object.assign({}, Ae, t);
        return (ye = {}), (be = []), Ee(e, r, n).value;
      }
      function Se(e, t) {
        _e[e] = t;
      }
      Se('array', function(e, t = {}, n, r) {
        const a = (r && r.depth) || 1;
        let i = Math.min(
          null != e.maxItems ? e.maxItems : 1 / 0,
          e.minItems || 1,
        );
        const o = e.items || e.contains;
        Array.isArray(o) && (i = Math.max(i, o.length));
        let l = [];
        if (!o) return l;
        for (let r = 0; r < i; r++) {
          let i = ((u = r), Array.isArray(e.items) ? o[u] || {} : o || {}),
            { value: s } = Ee(i, t, n, { depth: a + 1 });
          l.push(s);
        }
        var u;
        return l;
      }),
        Se('boolean', function(e) {
          return !0;
        }),
        Se('integer', we),
        Se('number', we),
        Se('object', function(e, t = {}, n, r) {
          let a = {};
          const i = (r && r.depth) || 1;
          if (e && 'object' == typeof e.properties) {
            let r = (Array.isArray(e.required) ? e.required : []).reduce(
              (e, t) => ((e[t] = !0), e),
              {},
            );
            Object.keys(e.properties).forEach(o => {
              if (t.skipNonRequired && !r.hasOwnProperty(o)) return;
              const l = Ee(e.properties[o], t, n, {
                propertyName: o,
                depth: i + 1,
              });
              (t.skipReadOnly && l.readOnly) ||
                (t.skipWriteOnly && l.writeOnly) ||
                (a[o] = l.value);
            });
          }
          if (e && 'object' == typeof e.additionalProperties) {
            const r =
              e.additionalProperties['x-additionalPropertiesName'] ||
              'property';
            (a[String(r) + '1'] = Ee(e.additionalProperties, t, n, {
              depth: i + 1,
            }).value),
              (a[String(r) + '2'] = Ee(e.additionalProperties, t, n, {
                depth: i + 1,
              }).value);
          }
          return a;
        }),
        Se('string', function(e, t, n, r) {
          let a = e.format || 'default',
            i = Ce[a] || ke,
            o = r && r.propertyName;
          return i(0 | e.minLength, e.maxLength, o);
        });
      var Ne,
        Oe = (function() {
          function e() {}
          return (
            (e.generateExample = function(e, t) {
              void 0 === t && (t = {});
              try {
                return this.sanitizeExample(Te(e, t)) || '';
              } catch (e) {
                return '';
              }
            }),
            (e.sanitizeExample = function(e) {
              var t = this;
              return 'object' == typeof e && e && !Array.isArray(e)
                ? Object.entries(e).reduce(function(e, n) {
                    var r = n[0],
                      a = n[1];
                    return (
                      r.startsWith('x-parser-') ||
                        r.startsWith('x-schema-private-') ||
                        (e[r] = t.sanitizeExample(a)),
                      e
                    );
                  }, {})
                : e;
            }),
            (e.getPayloadExamples = function(e) {
              var t = e.examples();
              if (
                Array.isArray(t) &&
                t.some(function(e) {
                  return e.payload;
                })
              ) {
                var n = t
                  .flatMap(function(e) {
                    if (e.payload)
                      return {
                        name: e.name,
                        summary: e.summary,
                        example: e.payload,
                      };
                  })
                  .filter(Boolean);
                if (n.length > 0) return n;
              }
              var r = e.payload();
              if (r && r.examples())
                return r.examples().map(function(e) {
                  return { example: e };
                });
            }),
            (e.getHeadersExamples = function(e) {
              var t = e.examples();
              if (
                Array.isArray(t) &&
                t.some(function(e) {
                  return e.headers;
                })
              ) {
                var n = t
                  .flatMap(function(e) {
                    if (e.headers)
                      return {
                        name: e.name,
                        summary: e.summary,
                        example: e.headers,
                      };
                  })
                  .filter(Boolean);
                if (n.length > 0) return n;
              }
              var r = e.headers();
              if (r && r.examples())
                return r.examples().map(function(e) {
                  return { example: e };
                });
            }),
            e
          );
        })(),
        Fe = function(e) {
          var t = e.message;
          if (!t) return null;
          var n = t.payload(),
            r = t.headers();
          return a.a.createElement(
            'div',
            {
              className:
                'bg-gray-800 px-8 py-4 mt-4 -mx-8 2xl:mx-0 2xl:px-4 2xl:rounded examples',
            },
            a.a.createElement(
              'h4',
              { className: 'text-white text-lg' },
              'Examples',
            ),
            n &&
              a.a.createElement(je, {
                type: 'Payload',
                schema: n,
                examples: Oe.getPayloadExamples(t),
              }),
            r &&
              a.a.createElement(je, {
                type: 'Headers',
                schema: r,
                examples: Oe.getHeadersExamples(t),
              }),
          );
        },
        je = function(e) {
          var t = e.type,
            n = void 0 === t ? 'Payload' : t,
            i = e.schema,
            o = e.examples,
            l = void 0 === o ? [] : o,
            u = Object(r.useState)(!1),
            s = u[0],
            c = u[1];
          return a.a.createElement(
            'div',
            { className: 'mt-4' },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                f,
                {
                  onClick: function() {
                    return c(function(e) {
                      return !e;
                    });
                  },
                  chevronProps: {
                    className: 'fill-current text-gray-200 '.concat(
                      s ? '-rotate-180' : '-rotate-90',
                    ),
                  },
                },
                a.a.createElement(
                  'span',
                  {
                    className:
                      'px-2 py-1 mr-2 text-gray-200 text-sm border rounded focus:outline-none',
                  },
                  n,
                ),
              ),
            ),
            a.a.createElement(
              'div',
              { className: s ? 'block' : 'hidden' },
              l && l.length > 0
                ? a.a.createElement(
                    'ul',
                    null,
                    l.map(function(e, t) {
                      return a.a.createElement(
                        'li',
                        { className: 'mt-4', key: t },
                        a.a.createElement(
                          'h5',
                          { className: 'text-xs font-bold text-gray-500' },
                          e.name
                            ? '#'.concat(t + 1, ' Example - ').concat(e.name)
                            : '#'.concat(t + 1, ' Example'),
                        ),
                        e.summary &&
                          a.a.createElement(
                            'p',
                            { className: 'text-xs font-bold text-gray-500' },
                            e.summary,
                          ),
                        a.a.createElement(
                          'div',
                          { className: 'mt-1' },
                          a.a.createElement(le, {
                            snippet: Oe.sanitizeExample(e.example),
                          }),
                        ),
                      );
                    }),
                  )
                : a.a.createElement(
                    'div',
                    { className: 'mt-4' },
                    a.a.createElement(le, {
                      snippet: Oe.generateExample(i.json()),
                    }),
                    a.a.createElement(
                      'h6',
                      {
                        className:
                          'text-xs font-bold text-gray-600 italic mt-2',
                      },
                      'This example has been generated automatically.',
                    ),
                  ),
            ),
          );
        },
        Pe = function(e) {
          var t = e.message,
            n = e.messageName,
            r = e.index,
            i = e.showExamples,
            o = void 0 !== i && i,
            l = re();
          if (!t) return null;
          var u = 'function' == typeof t.id && t.id(),
            s = t.title(),
            c = t.summary(),
            f = t.payload(),
            d = t.headers(),
            p = t.correlationId(),
            h = t.contentType(),
            m = t.externalDocs(),
            g = h || m;
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(
                'div',
                { className: 'shadow rounded bg-gray-200 p-4 border' },
                a.a.createElement(
                  'div',
                  null,
                  void 0 !== r &&
                    a.a.createElement(
                      'span',
                      { className: 'text-gray-700 font-bold mr-2' },
                      '#',
                      r,
                    ),
                  s &&
                    a.a.createElement(
                      'span',
                      { className: 'text-gray-700 mr-2' },
                      s,
                    ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'border text-orange-600 rounded text-xs py-0 px-2',
                    },
                    t.uid(),
                  ),
                ),
                c &&
                  a.a.createElement(
                    'p',
                    { className: 'text-gray-600 text-sm' },
                    c,
                  ),
                g &&
                  a.a.createElement(
                    'ul',
                    {
                      className: 'leading-normal mt-2 mb-4 space-x-2 space-y-2',
                    },
                    h &&
                      a.a.createElement(
                        'li',
                        { className: 'inline-block' },
                        a.a.createElement(
                          w,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: ''.concat(I.a, '/').concat(h),
                          },
                          a.a.createElement('span', null, h),
                        ),
                      ),
                    m &&
                      a.a.createElement(
                        'li',
                        { className: 'inline-block' },
                        a.a.createElement(
                          w,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: m.url(),
                          },
                          a.a.createElement('span', null, I.c),
                        ),
                      ),
                  ),
                u &&
                  a.a.createElement(
                    'div',
                    { className: 'border bg-gray-100 rounded px-4 py-2 mt-2' },
                    a.a.createElement(
                      'div',
                      { className: 'text-sm text-gray-700' },
                      'Message ID',
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'border text-orange-600 rounded text-xs ml-2 py-0 px-2',
                        },
                        u,
                      ),
                    ),
                  ),
                p &&
                  a.a.createElement(
                    'div',
                    { className: 'border bg-gray-100 rounded px-4 py-2 mt-2' },
                    a.a.createElement(
                      'div',
                      { className: 'text-sm text-gray-700' },
                      'Correlation ID',
                      a.a.createElement(
                        'span',
                        {
                          className:
                            'border text-orange-600 rounded text-xs ml-2 py-0 px-2',
                        },
                        p.location(),
                      ),
                    ),
                    p.hasDescription() &&
                      a.a.createElement(
                        'div',
                        { className: 'mt-2' },
                        a.a.createElement(P, null, p.description()),
                      ),
                  ),
                t.hasDescription() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(P, null, t.description()),
                  ),
                f &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'mt-2',
                      id: n
                        ? ae.getIdentifier('message-'.concat(n, '-payload'), l)
                        : void 0,
                    },
                    a.a.createElement(G, { schemaName: 'Payload', schema: f }),
                  ),
                d &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'mt-2',
                      id: n
                        ? ae.getIdentifier('message-'.concat(n, '-headers'), l)
                        : void 0,
                    },
                    a.a.createElement(G, { schemaName: 'Headers', schema: d }),
                  ),
                t.hasBindings() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(te, {
                      name: 'Message specific information',
                      bindings: t.bindings(),
                    }),
                  ),
                a.a.createElement(Q, { item: t }),
                t.hasTags() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(B, { tags: t.tags() }),
                  ),
              ),
            ),
            o &&
              a.a.createElement(
                'div',
                { className: 'panel-item--right px-8' },
                a.a.createElement(Fe, { message: t }),
              ),
          );
        },
        Re = n(7),
        Be = function() {
          return (Be =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        Ie = function(e) {
          var t = re(),
            n = e.type,
            r = void 0 === n ? Re.a.PUBLISH : n,
            i = e.operation,
            o = e.channelName,
            l = e.channel;
          if (!i || !l) return null;
          var u = 'function' == typeof l.servers && l.servers(),
            s = 'function' == typeof i.security && i.security(),
            c = Y.parametersToSchema(l.parameters());
          return a.a.createElement(
            'div',
            null,
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(Me, Be({}, e)),
              u && u.length > 0
                ? a.a.createElement(
                    'div',
                    { className: 'mt-2 text-sm' },
                    a.a.createElement('p', null, 'Available only on servers:'),
                    a.a.createElement(
                      'ul',
                      { className: 'flex flex-wrap leading-normal' },
                      u.map(function(e) {
                        return a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2', key: e },
                          a.a.createElement(
                            'a',
                            {
                              href: '#'.concat(
                                ae.getIdentifier('server-' + e, t),
                              ),
                              className:
                                'border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer',
                            },
                            a.a.createElement(
                              'span',
                              { className: 'underline' },
                              e,
                            ),
                          ),
                        );
                      }),
                    ),
                  )
                : null,
              c &&
                a.a.createElement(
                  'div',
                  {
                    className: 'mt-2',
                    id: ae.getIdentifier(
                      'operation-'.concat(r, '-').concat(o, '-parameters'),
                      t,
                    ),
                  },
                  a.a.createElement(G, {
                    schemaName: 'Parameters',
                    schema: c,
                    expanded: !0,
                  }),
                ),
              s &&
                a.a.createElement(
                  'div',
                  {
                    className: 'mt-2',
                    id: ae.getIdentifier(
                      'operation-'.concat(r, '-').concat(o, '-security'),
                      t,
                    ),
                  },
                  a.a.createElement(L, {
                    security: s,
                    header: 'Additional security requirements',
                  }),
                ),
              l.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(te, {
                    name: 'Channel specific information',
                    bindings: l.bindings(),
                  }),
                ),
              a.a.createElement(Q, { name: 'Channel Extensions', item: l }),
              i.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(te, {
                    name: 'Operation specific information',
                    bindings: i.bindings(),
                  }),
                ),
              a.a.createElement(Q, { name: 'Operation Extensions', item: i }),
              i.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(B, { tags: i.tags() }),
                ),
            ),
            a.a.createElement(
              'div',
              {
                className: 'w-full mt-4',
                id: ae.getIdentifier(
                  'operation-'.concat(r, '-').concat(o, '-message'),
                  t,
                ),
              },
              i.hasMultipleMessages()
                ? a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(
                      'p',
                      { className: 'px-8' },
                      'Accepts ',
                      a.a.createElement('strong', null, 'one of'),
                      ' the following messages:',
                    ),
                    a.a.createElement(
                      'ul',
                      null,
                      i.messages().map(function(e, t) {
                        return a.a.createElement(
                          'li',
                          { className: 'mt-4', key: t },
                          a.a.createElement(Pe, {
                            message: e,
                            index: t,
                            showExamples: !0,
                          }),
                        );
                      }),
                    ),
                  )
                : a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(
                      'p',
                      { className: 'px-8' },
                      'Accepts the following message:',
                    ),
                    a.a.createElement(
                      'div',
                      { className: 'mt-2' },
                      a.a.createElement(Pe, {
                        message: i.message(0),
                        showExamples: !0,
                      }),
                    ),
                  ),
            ),
          );
        },
        Me = function(e) {
          var t = e.type,
            n = void 0 === t ? Re.a.PUBLISH : t,
            r = e.operation,
            i = e.channelName,
            o = e.channel,
            l = r.summary(),
            u = r.externalDocs(),
            s = r.id();
          return a.a.createElement(
            a.a.Fragment,
            null,
            a.a.createElement(
              'div',
              { className: 'mb-4' },
              a.a.createElement(
                'h3',
                null,
                a.a.createElement(
                  'span',
                  {
                    className: 'font-mono border uppercase p-1 rounded mr-2 '.concat(
                      n === Re.a.PUBLISH
                        ? 'border-blue-600 text-blue-500'
                        : 'border-green-600 text-green-600',
                    ),
                    title: n,
                  },
                  n === Re.a.PUBLISH ? 'PUB' : 'SUB',
                ),
                ' ',
                a.a.createElement(
                  'span',
                  { className: 'font-mono text-base' },
                  i,
                ),
              ),
            ),
            o.hasDescription() &&
              a.a.createElement(
                'div',
                { className: 'mt-2' },
                a.a.createElement(P, null, o.description()),
              ),
            l &&
              a.a.createElement(
                'p',
                { className: 'text-gray-600 text-sm mt-2' },
                l,
              ),
            r.hasDescription() &&
              a.a.createElement(
                'div',
                { className: 'mt-2' },
                a.a.createElement(P, null, r.description()),
              ),
            u &&
              a.a.createElement(
                'ul',
                { className: 'leading-normal mt-2 mb-4 space-x-2 space-y-2' },
                u &&
                  a.a.createElement(
                    'li',
                    { className: 'inline-block' },
                    a.a.createElement(
                      w,
                      {
                        className:
                          'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                        href: u.url(),
                      },
                      a.a.createElement('span', null, I.c),
                    ),
                  ),
              ),
            s &&
              a.a.createElement(
                'div',
                { className: 'border bg-gray-100 rounded px-4 py-2 mt-2' },
                a.a.createElement(
                  'div',
                  { className: 'text-sm text-gray-700' },
                  'Operation ID',
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'border text-orange-600 rounded text-xs ml-2 py-0 px-2',
                    },
                    s,
                  ),
                ),
              ),
          );
        },
        ze = function() {
          var e = p().channels(),
            t = re();
          if (!Object.keys(e).length) return null;
          var n = [];
          return (
            Object.entries(e).forEach(function(e) {
              var r = e[0],
                i = e[1];
              i.hasPublish() &&
                n.push(
                  a.a.createElement(
                    'li',
                    {
                      className: 'mb-12',
                      key: 'pub-'.concat(r),
                      id: ae.getIdentifier(
                        'operation-'.concat(Re.a.PUBLISH, '-').concat(r),
                        t,
                      ),
                    },
                    a.a.createElement(Ie, {
                      type: Re.a.PUBLISH,
                      operation: i.publish(),
                      channelName: r,
                      channel: i,
                    }),
                  ),
                ),
                i.hasSubscribe() &&
                  n.push(
                    a.a.createElement(
                      'li',
                      {
                        className: 'mb-12',
                        key: 'sub-'.concat(r),
                        id: ae.getIdentifier(
                          'operation-'.concat(Re.a.SUBSCRIBE, '-').concat(r),
                          t,
                        ),
                      },
                      a.a.createElement(Ie, {
                        type: Re.a.SUBSCRIBE,
                        operation: i.subscribe(),
                        channelName: r,
                        channel: i,
                      }),
                    ),
                  );
            }),
            a.a.createElement(
              'section',
              {
                id: ''.concat(ae.getIdentifier('operations', t)),
                className: 'mt-16',
              },
              a.a.createElement(
                'h2',
                { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                I.e,
              ),
              a.a.createElement('ul', null, n),
            )
          );
        },
        Le = function() {
          var e = p(),
            t = re(),
            n = e.hasComponents() && e.components().messages();
          return n && 0 !== Object.keys(n).length
            ? a.a.createElement(
                'section',
                {
                  id: ''.concat(ae.getIdentifier('messages', t)),
                  className: 'mt-16',
                },
                a.a.createElement(
                  'h2',
                  { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                  I.d,
                ),
                a.a.createElement(
                  'ul',
                  null,
                  Object.entries(n).map(function(e, n) {
                    var r = e[0],
                      i = e[1];
                    return a.a.createElement(
                      'li',
                      {
                        className: 'mb-4',
                        key: r,
                        id: ae.getIdentifier('message-'.concat(r), t),
                      },
                      a.a.createElement(Pe, {
                        messageName: r,
                        message: i,
                        index: n + 1,
                        key: r,
                      }),
                    );
                  }),
                ),
              )
            : null;
        },
        Ue = function(e) {
          var t = e.schemaName,
            n = e.schema;
          return n
            ? a.a.createElement(
                'div',
                null,
                a.a.createElement(
                  'div',
                  { className: 'panel-item--center px-8' },
                  a.a.createElement(
                    'div',
                    {
                      className: 'shadow rounded px-4 py-2 border bg-gray-200',
                    },
                    a.a.createElement(G, { schemaName: t, schema: n }),
                  ),
                ),
                a.a.createElement('div', { className: 'w-full mt-4' }),
              )
            : null;
        },
        $e = function() {
          var e = p(),
            t = re(),
            n = e.hasComponents() && e.components().schemas();
          return n && 0 !== Object.keys(n).length
            ? a.a.createElement(
                'section',
                {
                  id: ''.concat(ae.getIdentifier('schemas', t)),
                  className: 'mt-16',
                },
                a.a.createElement(
                  'h2',
                  { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                  I.f,
                ),
                a.a.createElement(
                  'ul',
                  null,
                  Object.entries(n).map(function(e) {
                    var n = e[0],
                      r = e[1];
                    return a.a.createElement(
                      'li',
                      {
                        className: 'mb-4',
                        key: n,
                        id: ae.getIdentifier('schema-'.concat(n), t),
                      },
                      a.a.createElement(Ue, { schemaName: n, schema: r }),
                    );
                  }),
                ),
              )
            : null;
        },
        He = function(e) {
          var t = e.error;
          if (!t) return null;
          var n,
            r = t.title,
            i = t.validationErrors;
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              { className: 'panel-item--center p-8' },
              a.a.createElement(
                'section',
                {
                  className:
                    'shadow rounded bg-gray-200 border-red-500 border-l-8',
                },
                a.a.createElement(
                  'h2',
                  { className: 'p-2' },
                  r ? ''.concat(I.b, ': ').concat(r) : I.b,
                ),
                i && i.length
                  ? a.a.createElement(
                      'div',
                      { className: 'bg-gray-800 text-white text-xs p-2' },
                      a.a.createElement(
                        'pre',
                        null,
                        (n = i)
                          ? n
                              .map(function(e, t) {
                                return e && e.title && e.location
                                  ? a.a.createElement(
                                      'div',
                                      { key: t, className: 'flex' },
                                      a.a.createElement(
                                        'span',
                                        null,
                                        ''.concat(e.location.startLine, '.'),
                                      ),
                                      a.a.createElement(
                                        'code',
                                        {
                                          className:
                                            'whitespace-pre-wrap break-all ml-2',
                                        },
                                        e.title,
                                      ),
                                    )
                                  : null;
                              })
                              .filter(Boolean)
                          : null,
                      ),
                    )
                  : null,
              ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        Ve = function(e) {
          var t,
            n,
            i,
            o,
            l,
            s,
            c,
            f = e.asyncapi,
            p = e.config,
            h = e.error,
            g = void 0 === h ? null : h,
            y = Object(r.useState)('container:xl'),
            b = y[0],
            v = y[1],
            x = u({
              onResize: function(e) {
                var t = e.width;
                requestAnimationFrame(function() {
                  if (void 0 !== t) {
                    var e = t <= 1280 ? 'container:xl' : 'container:base';
                    e !== b && v(e);
                  }
                });
              },
            }).ref;
          return a.a.createElement(
            ne.Provider,
            { value: p },
            a.a.createElement(
              d.Provider,
              { value: f },
              a.a.createElement(
                'section',
                { className: 'aui-root' },
                a.a.createElement(
                  'div',
                  {
                    className: ''.concat(
                      b,
                      ' relative md:flex bg-white leading-normal',
                    ),
                    id: p.schemaID || void 0,
                    ref: x,
                  },
                  (null === (t = p.show) || void 0 === t
                    ? void 0
                    : t.sidebar) && a.a.createElement(m, { config: p.sidebar }),
                  a.a.createElement(
                    'div',
                    { className: 'panel--center relative py-8 flex-1' },
                    a.a.createElement(
                      'div',
                      { className: 'relative z-10' },
                      (null === (n = p.show) || void 0 === n
                        ? void 0
                        : n.errors) &&
                        g &&
                        a.a.createElement(He, { error: g }),
                      (null === (i = p.show) || void 0 === i
                        ? void 0
                        : i.info) && a.a.createElement(M, null),
                      (null === (o = p.show) || void 0 === o
                        ? void 0
                        : o.servers) && a.a.createElement(oe, null),
                      (null === (l = p.show) || void 0 === l
                        ? void 0
                        : l.operations) && a.a.createElement(ze, null),
                      (null === (s = p.show) || void 0 === s
                        ? void 0
                        : s.messages) && a.a.createElement(Le, null),
                      (null === (c = p.show) || void 0 === c
                        ? void 0
                        : c.schemas) && a.a.createElement($e, null),
                    ),
                    a.a.createElement('div', {
                      className:
                        'panel--right absolute top-0 right-0 h-full bg-gray-800',
                    }),
                  ),
                ),
              ),
            ),
          );
        },
        We =
          ((Ne = function(e, t) {
            return (Ne =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(e, t) {
                  e.__proto__ = t;
                }) ||
              function(e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              })(e, t);
          }),
          function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Class extends value ' +
                  String(t) +
                  ' is not a constructor or null',
              );
            function n() {
              this.constructor = e;
            }
            Ne(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((n.prototype = t.prototype), new n()));
          }),
        qe = function() {
          return (qe =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        Ye = function(e, t, n, r) {
          return new (n || (n = Promise))(function(a, i) {
            function o(e) {
              try {
                u(r.next(e));
              } catch (e) {
                i(e);
              }
            }
            function l(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function(e) {
                        e(t);
                      })).then(o, l);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Qe = function(e, t) {
          var n,
            r,
            a,
            i,
            o = {
              label: 0,
              sent: function() {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (i = { next: l(0), throw: l(1), return: l(2) }),
            'function' == typeof Symbol &&
              (i[Symbol.iterator] = function() {
                return this;
              }),
            i
          );
          function l(i) {
            return function(l) {
              return (function(i) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; o; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (a =
                          2 & i[0]
                            ? r.return
                            : i[0]
                            ? r.throw || ((a = r.return) && a.call(r), 0)
                            : r.next) &&
                        !(a = a.call(r, i[1])).done)
                    )
                      return a;
                    switch (((r = 0), a && (i = [2 & i[0], a.value]), i[0])) {
                      case 0:
                      case 1:
                        a = i;
                        break;
                      case 4:
                        return o.label++, { value: i[1], done: !1 };
                      case 5:
                        o.label++, (r = i[1]), (i = [0]);
                        continue;
                      case 7:
                        (i = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = o.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== i[0] && 2 !== i[0]))
                        ) {
                          o = 0;
                          continue;
                        }
                        if (
                          3 === i[0] &&
                          (!a || (i[1] > a[0] && i[1] < a[3]))
                        ) {
                          o.label = i[1];
                          break;
                        }
                        if (6 === i[0] && o.label < a[1]) {
                          (o.label = a[1]), (a = i);
                          break;
                        }
                        if (a && o.label < a[2]) {
                          (o.label = a[2]), o.ops.push(i);
                          break;
                        }
                        a[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    i = t.call(e, o);
                  } catch (e) {
                    (i = [6, e]), (r = 0);
                  } finally {
                    n = a = 0;
                  }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              })([i, l]);
            };
          }
        },
        Ke = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            n.state = { asyncapi: void 0, error: void 0 };
            var r = i.a.retrieveParsedSpec(t.schema);
            return r && (n.state = { asyncapi: r }), n;
          }
          return (
            We(t, e),
            (t.prototype.componentDidMount = function() {
              return Ye(this, void 0, void 0, function() {
                return Qe(this, function(e) {
                  return (
                    this.state.asyncapi || this.updateState(this.props.schema),
                    [2]
                  );
                });
              });
            }),
            (t.prototype.componentDidUpdate = function(e) {
              return Ye(this, void 0, void 0, function() {
                var t, n;
                return Qe(this, function(r) {
                  return (
                    (t = e.schema),
                    (n = this.props.schema),
                    t !== n && this.updateState(n),
                    [2]
                  );
                });
              });
            }),
            (t.prototype.render = function() {
              var e,
                t = this.props,
                n = t.config,
                r = t.error,
                i = this.state,
                l = i.asyncapi,
                u = i.error,
                s = r || u,
                c = qe(qe(qe({}, o), n), {
                  show: qe(qe({}, o.show), !!n && n.show),
                  sidebar: qe(qe({}, o.sidebar), !!n && n.sidebar),
                });
              return l
                ? a.a.createElement(Ve, { asyncapi: l, config: c, error: s })
                : s
                ? (null === (e = c.show) || void 0 === e ? void 0 : e.errors) &&
                  a.a.createElement(He, { error: s })
                : null;
            }),
            (t.prototype.updateState = function(e) {
              var t = i.a.retrieveParsedSpec(e);
              t
                ? this.setState({ asyncapi: t })
                : this.setState({ asyncapi: void 0 });
            }),
            t
          );
        })(r.Component);
      t.a = Ke;
    },
    37: function(e, t, n) {
      'use strict';
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
          Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
      function o(e) {
        if (null == e)
          throw new TypeError(
            'Object.assign cannot be called with null or undefined',
          );
        return Object(e);
      }
      e.exports = (function() {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, n = 0; n < 10; n++)
            t['_' + String.fromCharCode(n)] = n;
          if (
            '0123456789' !==
            Object.getOwnPropertyNames(t)
              .map(function(e) {
                return t[e];
              })
              .join('')
          )
            return !1;
          var r = {};
          return (
            'abcdefghijklmnopqrst'.split('').forEach(function(e) {
              r[e] = e;
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, r)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function(e, t) {
            for (var n, l, u = o(e), s = 1; s < arguments.length; s++) {
              for (var c in (n = Object(arguments[s])))
                a.call(n, c) && (u[c] = n[c]);
              if (r) {
                l = r(n);
                for (var f = 0; f < l.length; f++)
                  i.call(n, l[f]) && (u[l[f]] = n[l[f]]);
              }
            }
            return u;
          };
    },
    38: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        o = n(3),
        l = n(39),
        u = n(77),
        s = n(6),
        c = n(21),
        f = n(4);
      e.exports = i(
        class extends o {
          url() {
            return this._json.url;
          }
          protocol() {
            return this._json.protocol;
          }
          protocolVersion() {
            return this._json.protocolVersion;
          }
          variables() {
            return r(this._json.variables, l);
          }
          variable(e) {
            return a(this._json.variables, e, l);
          }
          hasVariables() {
            return !!this._json.variables;
          }
          security() {
            return this._json.security
              ? this._json.security.map(e => new u(e))
              : null;
          }
        },
        s,
        c,
        f,
      );
    },
    39: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        o = n(4);
      e.exports = r(
        class extends a {
          allowedValues() {
            return this._json.enum;
          }
          allows(e) {
            return void 0 === this._json.enum || this._json.enum.includes(e);
          }
          hasAllowedValues() {
            return void 0 !== this._json.enum;
          }
          defaultValue() {
            return this._json.default;
          }
          hasDefaultValue() {
            return void 0 !== this._json.default;
          }
          examples() {
            return this._json.examples;
          }
        },
        i,
        o,
      );
    },
    4: function(e, t) {
      const n = {
        hasExtensions() {
          return !!this.extensionKeys().length;
        },
        extensions() {
          const e = {};
          return (
            Object.entries(this._json).forEach(([t, n]) => {
              /^x-[\w\d\.\-\_]+$/.test(t) && (e[String(t)] = n);
            }),
            e
          );
        },
        extensionKeys() {
          return Object.keys(this.extensions());
        },
        extKeys() {
          return this.extensionKeys();
        },
        hasExtension(e) {
          return !!e.startsWith('x-') && !!this._json[String(e)];
        },
        extension(e) {
          return e.startsWith('x-') ? this._json[String(e)] : null;
        },
        hasExt(e) {
          return this.hasExtension(e);
        },
        ext(e) {
          return this.extension(e);
        },
      };
      e.exports = n;
    },
    40: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        o = n(3),
        l = n(41),
        u = n(79),
        s = n(84),
        c = n(6),
        f = n(21),
        d = n(4);
      e.exports = i(
        class extends o {
          parameters() {
            return r(this._json.parameters, l);
          }
          parameter(e) {
            return a(this._json.parameters, e, l);
          }
          hasParameters() {
            return !!this._json.parameters;
          }
          hasServers() {
            return !!this._json.servers;
          }
          servers() {
            return this._json.servers ? this._json.servers : [];
          }
          server(e) {
            return this._json.servers
              ? 'number' != typeof e || e > this._json.servers.length - 1
                ? null
                : this._json.servers[+e]
              : null;
          }
          publish() {
            return this._json.publish ? new u(this._json.publish) : null;
          }
          subscribe() {
            return this._json.subscribe ? new s(this._json.subscribe) : null;
          }
          hasPublish() {
            return !!this._json.publish;
          }
          hasSubscribe() {
            return !!this._json.subscribe;
          }
        },
        c,
        f,
        d,
      );
    },
    41: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(10),
        o = n(6),
        l = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
          schema() {
            return this._json.schema ? new i(this._json.schema) : null;
          }
        },
        o,
        l,
      );
    },
    42: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        o = n(25),
        l = n(17),
        u = n(21),
        s = n(4);
      e.exports = r(
        class extends a {
          id() {
            return this._json.operationId;
          }
          summary() {
            return this._json.summary;
          }
        },
        i,
        o,
        l,
        u,
        s,
      );
    },
    43: function(e, t, n) {
      (function(t) {
        const r = n(44),
          a = n(45),
          i = n(10);
        e.exports = class extends a {
          uid() {
            return (
              this.id() ||
              this.name() ||
              this.ext('x-parser-message-name') ||
              t.from(JSON.stringify(this._json)).toString('base64')
            );
          }
          payload() {
            return this._json.payload ? new i(this._json.payload) : null;
          }
          traits() {
            const e =
              this._json['x-parser-original-traits'] || this._json.traits;
            return e ? e.map(e => new r(e)) : [];
          }
          hasTraits() {
            return (
              !!this._json['x-parser-original-traits'] || !!this._json.traits
            );
          }
          originalPayload() {
            return this._json['x-parser-original-payload'] || this.payload();
          }
          originalSchemaFormat() {
            return (
              this._json['x-parser-original-schema-format'] ||
              this.schemaFormat()
            );
          }
        };
      }.call(this, n(11).Buffer));
    },
    44: function(e, t, n) {
      const r = n(45);
      e.exports = class extends r {};
    },
    45: function(e, t, n) {
      const { getMapValueOfType: r, mix: a } = n(2),
        i = n(3),
        o = n(10),
        l = n(46),
        u = n(6),
        s = n(17),
        c = n(25),
        f = n(21),
        d = n(4);
      e.exports = a(
        class extends i {
          headers() {
            return this._json.headers ? new o(this._json.headers) : null;
          }
          header(e) {
            return this._json.headers
              ? r(this._json.headers.properties, e, o)
              : null;
          }
          id() {
            return this._json.messageId;
          }
          correlationId() {
            return this._json.correlationId
              ? new l(this._json.correlationId)
              : null;
          }
          schemaFormat() {
            return this._json.schemaFormat;
          }
          contentType() {
            return this._json.contentType;
          }
          name() {
            return this._json.name;
          }
          title() {
            return this._json.title;
          }
          summary() {
            return this._json.summary;
          }
          examples() {
            return this._json.examples;
          }
        },
        u,
        c,
        s,
        f,
        d,
      );
    },
    46: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        o = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
        },
        o,
        i,
      );
    },
    47: function(e, t, n) {
      const r = n(42);
      e.exports = class extends r {};
    },
    48: function(e, t) {
      const n = Object.freeze({
          NEW_SCHEMA: 'NEW_SCHEMA',
          END_SCHEMA: 'END_SCHEMA',
        }),
        r = Object.freeze({
          parameters: 'parameters',
          payloads: 'payloads',
          headers: 'headers',
          components: 'components',
          objects: 'objects',
          arrays: 'arrays',
          oneOfs: 'oneOfs',
          allOfs: 'allOfs',
          anyOfs: 'anyOfs',
          nots: 'nots',
          propertyNames: 'propertyNames',
          patternProperties: 'patternProperties',
          contains: 'contains',
          ifs: 'ifs',
          thenes: 'thenes',
          elses: 'elses',
          dependencies: 'dependencies',
          definitions: 'definitions',
        });
      function a(e, t, i) {
        if (!e) return;
        const { callback: o, schemaTypesToIterate: l, seenSchemas: u } = i,
          s = e.json();
        if (u.has(s)) return;
        u.add(s);
        let c = e.type() || [];
        Array.isArray(c) || (c = [c]),
          (!l.includes(r.objects) && c.includes('object')) ||
            (!l.includes(r.arrays) && c.includes('array')) ||
            (!1 !== o(e, t, n.NEW_SCHEMA) &&
              (l.includes(r.objects) &&
                c.includes('object') &&
                (function(e, t) {
                  Object.entries(e.properties() || {}).forEach(([e, n]) => {
                    a(n, e, t);
                  });
                  const n = e.additionalProperties();
                  'object' == typeof n && a(n, null, t);
                  const i = t.schemaTypesToIterate;
                  i.includes(r.propertyNames) &&
                    e.propertyNames() &&
                    a(e.propertyNames(), null, t);
                  i.includes(r.patternProperties) &&
                    Object.entries(e.patternProperties() || {}).forEach(
                      ([e, n]) => {
                        a(n, e, t);
                      },
                    );
                })(e, i),
              l.includes(r.arrays) &&
                c.includes('array') &&
                (function(e, t) {
                  const n = e.items();
                  n &&
                    (Array.isArray(n)
                      ? n.forEach((e, n) => {
                          a(e, n, t);
                        })
                      : a(n, null, t));
                  const i = e.additionalItems();
                  'object' == typeof i && a(i, null, t);
                  t.schemaTypesToIterate.includes(r.contains) &&
                    e.contains() &&
                    a(e.contains(), null, t);
                })(e, i),
              l.includes(r.oneOfs) &&
                (e.oneOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              l.includes(r.anyOfs) &&
                (e.anyOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              l.includes(r.allOfs) &&
                (e.allOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              l.includes(r.nots) && e.not() && a(e.not(), null, i),
              l.includes(r.ifs) && e.if() && a(e.if(), null, i),
              l.includes(r.thenes) && e.then() && a(e.then(), null, i),
              l.includes(r.elses) && e.else() && a(e.else(), null, i),
              l.includes(r.dependencies) &&
                Object.entries(e.dependencies() || {}).forEach(([e, t]) => {
                  t && !Array.isArray(t) && a(t, e, i);
                }),
              l.includes(r.definitions) &&
                Object.entries(e.definitions() || {}).forEach(([e, t]) => {
                  a(t, e, i);
                }),
              o(e, t, n.END_SCHEMA),
              u.delete(s)));
      }
      function i(e, t) {
        if (!e) return;
        const { schemaTypesToIterate: n } = t;
        n.includes(r.headers) && a(e.headers(), null, t),
          n.includes(r.payloads) && a(e.payload(), null, t);
      }
      e.exports = {
        SchemaIteratorCallbackType: n,
        SchemaTypesToIterate: r,
        traverseAsyncApiDocument: function(e, t, n) {
          n || (n = Object.values(r));
          const o = {
            callback: t,
            schemaTypesToIterate: n,
            seenSchemas: new Set(),
          };
          if (
            (e.hasChannels() &&
              Object.values(e.channels()).forEach(e => {
                !(function(e, t) {
                  if (!e) return;
                  const { schemaTypesToIterate: n } = t;
                  n.includes(r.parameters) &&
                    Object.values(e.parameters() || {}).forEach(e => {
                      a(e.schema(), null, t);
                    });
                  e.hasPublish() &&
                    e
                      .publish()
                      .messages()
                      .forEach(e => {
                        i(e, t);
                      });
                  e.hasSubscribe() &&
                    e
                      .subscribe()
                      .messages()
                      .forEach(e => {
                        i(e, t);
                      });
                })(e, o);
              }),
            n.includes(r.components) && e.hasComponents())
          ) {
            const t = e.components();
            Object.values(t.messages() || {}).forEach(e => {
              i(e, o);
            }),
              Object.values(t.schemas() || {}).forEach(e => {
                a(e, null, o);
              }),
              n.includes(r.parameters) &&
                Object.values(t.parameters() || {}).forEach(e => {
                  a(e.schema(), null, o);
                }),
              Object.values(t.messageTraits() || {}).forEach(e => {
                !(function(e, t) {
                  if (!e) return;
                  const { schemaTypesToIterate: n } = t;
                  n.includes(r.headers) && a(e.headers(), null, t);
                })(e, o);
              });
          }
        },
      };
    },
    49: function(e, t, n) {
      /*! @license DOMPurify 2.3.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.6/LICENSE */
      e.exports = (function() {
        'use strict';
        var e = Object.hasOwnProperty,
          t = Object.setPrototypeOf,
          n = Object.isFrozen,
          r = Object.getPrototypeOf,
          a = Object.getOwnPropertyDescriptor,
          i = Object.freeze,
          o = Object.seal,
          l = Object.create,
          u = 'undefined' != typeof Reflect && Reflect,
          s = u.apply,
          c = u.construct;
        s ||
          (s = function(e, t, n) {
            return e.apply(t, n);
          }),
          i ||
            (i = function(e) {
              return e;
            }),
          o ||
            (o = function(e) {
              return e;
            }),
          c ||
            (c = function(e, t) {
              return new (Function.prototype.bind.apply(
                e,
                [null].concat(
                  (function(e) {
                    if (Array.isArray(e)) {
                      for (var t = 0, n = Array(e.length); t < e.length; t++)
                        n[t] = e[t];
                      return n;
                    }
                    return Array.from(e);
                  })(t),
                ),
              ))();
            });
        var f,
          d = w(Array.prototype.forEach),
          p = w(Array.prototype.pop),
          h = w(Array.prototype.push),
          m = w(String.prototype.toLowerCase),
          g = w(String.prototype.match),
          y = w(String.prototype.replace),
          b = w(String.prototype.indexOf),
          v = w(String.prototype.trim),
          x = w(RegExp.prototype.test),
          E =
            ((f = TypeError),
            function() {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return c(f, t);
            });
        function w(e) {
          return function(t) {
            for (
              var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1;
              a < n;
              a++
            )
              r[a - 1] = arguments[a];
            return s(e, t, r);
          };
        }
        function D(e, r) {
          t && t(e, null);
          for (var a = r.length; a--; ) {
            var i = r[a];
            if ('string' == typeof i) {
              var o = m(i);
              o !== i && (n(r) || (r[a] = o), (i = o));
            }
            e[i] = !0;
          }
          return e;
        }
        function k(t) {
          var n = l(null),
            r = void 0;
          for (r in t) s(e, t, [r]) && (n[r] = t[r]);
          return n;
        }
        function C(e, t) {
          for (; null !== e; ) {
            var n = a(e, t);
            if (n) {
              if (n.get) return w(n.get);
              if ('function' == typeof n.value) return w(n.value);
            }
            e = r(e);
          }
          return function(e) {
            return console.warn('fallback value for', e), null;
          };
        }
        var _ = i([
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
            'wbr',
          ]),
          A = i([
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
            'vkern',
          ]),
          T = i([
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
            'feTurbulence',
          ]),
          S = i([
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
            'use',
          ]),
          N = i([
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
            'munderover',
          ]),
          O = i([
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
            'none',
          ]),
          F = i(['#text']),
          j = i([
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
            'slot',
          ]),
          P = i([
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
            'zoomandpan',
          ]),
          R = i([
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
            'xmlns',
          ]),
          B = i([
            'xlink:href',
            'xml:id',
            'xlink:title',
            'xml:space',
            'xmlns:xlink',
          ]),
          I = o(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
          M = o(/<%[\s\S]*|[\s\S]*%>/gm),
          z = o(/^data-[\-\w.\u00B7-\uFFFF]/),
          L = o(/^aria-[\-\w]+$/),
          U = o(
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          ),
          $ = o(/^(?:\w+script|data):/i),
          H = o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
          V = o(/^html$/i),
          W =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                };
        function q(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
          }
          return Array.from(e);
        }
        var Y = function() {
            return 'undefined' == typeof window ? null : window;
          },
          Q = function(e, t) {
            if (
              'object' !== (void 0 === e ? 'undefined' : W(e)) ||
              'function' != typeof e.createPolicy
            )
              return null;
            var n = null;
            t.currentScript &&
              t.currentScript.hasAttribute('data-tt-policy-suffix') &&
              (n = t.currentScript.getAttribute('data-tt-policy-suffix'));
            var r = 'dompurify' + (n ? '#' + n : '');
            try {
              return e.createPolicy(r, {
                createHTML: function(e) {
                  return e;
                },
              });
            } catch (e) {
              return (
                console.warn(
                  'TrustedTypes policy ' + r + ' could not be created.',
                ),
                null
              );
            }
          };
        return (function e() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Y(),
            n = function(t) {
              return e(t);
            };
          if (
            ((n.version = '2.3.6'),
            (n.removed = []),
            !t || !t.document || 9 !== t.document.nodeType)
          )
            return (n.isSupported = !1), n;
          var r = t.document,
            a = t.document,
            o = t.DocumentFragment,
            l = t.HTMLTemplateElement,
            u = t.Node,
            s = t.Element,
            c = t.NodeFilter,
            f = t.NamedNodeMap,
            w = void 0 === f ? t.NamedNodeMap || t.MozNamedAttrMap : f,
            K = t.HTMLFormElement,
            G = t.DOMParser,
            Z = t.trustedTypes,
            X = s.prototype,
            J = C(X, 'cloneNode'),
            ee = C(X, 'nextSibling'),
            te = C(X, 'childNodes'),
            ne = C(X, 'parentNode');
          if ('function' == typeof l) {
            var re = a.createElement('template');
            re.content &&
              re.content.ownerDocument &&
              (a = re.content.ownerDocument);
          }
          var ae = Q(Z, r),
            ie = ae ? ae.createHTML('') : '',
            oe = a,
            le = oe.implementation,
            ue = oe.createNodeIterator,
            se = oe.createDocumentFragment,
            ce = oe.getElementsByTagName,
            fe = r.importNode,
            de = {};
          try {
            de = k(a).documentMode ? a.documentMode : {};
          } catch (e) {}
          var pe = {};
          n.isSupported =
            'function' == typeof ne &&
            le &&
            void 0 !== le.createHTMLDocument &&
            9 !== de;
          var he = I,
            me = M,
            ge = z,
            ye = L,
            be = $,
            ve = H,
            xe = U,
            Ee = null,
            we = D({}, [].concat(q(_), q(A), q(T), q(N), q(F))),
            De = null,
            ke = D({}, [].concat(q(j), q(P), q(R), q(B))),
            Ce = Object.seal(
              Object.create(null, {
                tagNameCheck: {
                  writable: !0,
                  configurable: !1,
                  enumerable: !0,
                  value: null,
                },
                attributeNameCheck: {
                  writable: !0,
                  configurable: !1,
                  enumerable: !0,
                  value: null,
                },
                allowCustomizedBuiltInElements: {
                  writable: !0,
                  configurable: !1,
                  enumerable: !0,
                  value: !1,
                },
              }),
            ),
            _e = null,
            Ae = null,
            Te = !0,
            Se = !0,
            Ne = !1,
            Oe = !1,
            Fe = !1,
            je = !1,
            Pe = !1,
            Re = !1,
            Be = !1,
            Ie = !1,
            Me = !0,
            ze = !0,
            Le = !1,
            Ue = {},
            $e = null,
            He = D({}, [
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
              'xmp',
            ]),
            Ve = null,
            We = D({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
            qe = null,
            Ye = D({}, [
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
              'xmlns',
            ]),
            Qe = 'http://www.w3.org/1998/Math/MathML',
            Ke = 'http://www.w3.org/2000/svg',
            Ge = 'http://www.w3.org/1999/xhtml',
            Ze = Ge,
            Xe = !1,
            Je = void 0,
            et = ['application/xhtml+xml', 'text/html'],
            tt = 'text/html',
            nt = void 0,
            rt = null,
            at = a.createElement('form'),
            it = function(e) {
              return e instanceof RegExp || e instanceof Function;
            },
            ot = function(e) {
              (rt && rt === e) ||
                ((e && 'object' === (void 0 === e ? 'undefined' : W(e))) ||
                  (e = {}),
                (e = k(e)),
                (Ee = 'ALLOWED_TAGS' in e ? D({}, e.ALLOWED_TAGS) : we),
                (De = 'ALLOWED_ATTR' in e ? D({}, e.ALLOWED_ATTR) : ke),
                (qe =
                  'ADD_URI_SAFE_ATTR' in e
                    ? D(k(Ye), e.ADD_URI_SAFE_ATTR)
                    : Ye),
                (Ve =
                  'ADD_DATA_URI_TAGS' in e
                    ? D(k(We), e.ADD_DATA_URI_TAGS)
                    : We),
                ($e = 'FORBID_CONTENTS' in e ? D({}, e.FORBID_CONTENTS) : He),
                (_e = 'FORBID_TAGS' in e ? D({}, e.FORBID_TAGS) : {}),
                (Ae = 'FORBID_ATTR' in e ? D({}, e.FORBID_ATTR) : {}),
                (Ue = 'USE_PROFILES' in e && e.USE_PROFILES),
                (Te = !1 !== e.ALLOW_ARIA_ATTR),
                (Se = !1 !== e.ALLOW_DATA_ATTR),
                (Ne = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                (Oe = e.SAFE_FOR_TEMPLATES || !1),
                (Fe = e.WHOLE_DOCUMENT || !1),
                (Re = e.RETURN_DOM || !1),
                (Be = e.RETURN_DOM_FRAGMENT || !1),
                (Ie = e.RETURN_TRUSTED_TYPE || !1),
                (Pe = e.FORCE_BODY || !1),
                (Me = !1 !== e.SANITIZE_DOM),
                (ze = !1 !== e.KEEP_CONTENT),
                (Le = e.IN_PLACE || !1),
                (xe = e.ALLOWED_URI_REGEXP || xe),
                (Ze = e.NAMESPACE || Ge),
                e.CUSTOM_ELEMENT_HANDLING &&
                  it(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                  (Ce.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                e.CUSTOM_ELEMENT_HANDLING &&
                  it(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                  (Ce.attributeNameCheck =
                    e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                e.CUSTOM_ELEMENT_HANDLING &&
                  'boolean' ==
                    typeof e.CUSTOM_ELEMENT_HANDLING
                      .allowCustomizedBuiltInElements &&
                  (Ce.allowCustomizedBuiltInElements =
                    e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                (Je = Je =
                  -1 === et.indexOf(e.PARSER_MEDIA_TYPE)
                    ? tt
                    : e.PARSER_MEDIA_TYPE),
                (nt =
                  'application/xhtml+xml' === Je
                    ? function(e) {
                        return e;
                      }
                    : m),
                Oe && (Se = !1),
                Be && (Re = !0),
                Ue &&
                  ((Ee = D({}, [].concat(q(F)))),
                  (De = []),
                  !0 === Ue.html && (D(Ee, _), D(De, j)),
                  !0 === Ue.svg && (D(Ee, A), D(De, P), D(De, B)),
                  !0 === Ue.svgFilters && (D(Ee, T), D(De, P), D(De, B)),
                  !0 === Ue.mathMl && (D(Ee, N), D(De, R), D(De, B))),
                e.ADD_TAGS && (Ee === we && (Ee = k(Ee)), D(Ee, e.ADD_TAGS)),
                e.ADD_ATTR && (De === ke && (De = k(De)), D(De, e.ADD_ATTR)),
                e.ADD_URI_SAFE_ATTR && D(qe, e.ADD_URI_SAFE_ATTR),
                e.FORBID_CONTENTS &&
                  ($e === He && ($e = k($e)), D($e, e.FORBID_CONTENTS)),
                ze && (Ee['#text'] = !0),
                Fe && D(Ee, ['html', 'head', 'body']),
                Ee.table && (D(Ee, ['tbody']), delete _e.tbody),
                i && i(e),
                (rt = e));
            },
            lt = D({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
            ut = D({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
            st = D({}, A);
          D(st, T), D(st, S);
          var ct = D({}, N);
          D(ct, O);
          var ft = function(e) {
              var t = ne(e);
              (t && t.tagName) ||
                (t = { namespaceURI: Ge, tagName: 'template' });
              var n = m(e.tagName),
                r = m(t.tagName);
              if (e.namespaceURI === Ke)
                return t.namespaceURI === Ge
                  ? 'svg' === n
                  : t.namespaceURI === Qe
                  ? 'svg' === n && ('annotation-xml' === r || lt[r])
                  : Boolean(st[n]);
              if (e.namespaceURI === Qe)
                return t.namespaceURI === Ge
                  ? 'math' === n
                  : t.namespaceURI === Ke
                  ? 'math' === n && ut[r]
                  : Boolean(ct[n]);
              if (e.namespaceURI === Ge) {
                if (t.namespaceURI === Ke && !ut[r]) return !1;
                if (t.namespaceURI === Qe && !lt[r]) return !1;
                var a = D({}, ['title', 'style', 'font', 'a', 'script']);
                return !ct[n] && (a[n] || !st[n]);
              }
              return !1;
            },
            dt = function(e) {
              h(n.removed, { element: e });
              try {
                e.parentNode.removeChild(e);
              } catch (t) {
                try {
                  e.outerHTML = ie;
                } catch (t) {
                  e.remove();
                }
              }
            },
            pt = function(e, t) {
              try {
                h(n.removed, { attribute: t.getAttributeNode(e), from: t });
              } catch (e) {
                h(n.removed, { attribute: null, from: t });
              }
              if ((t.removeAttribute(e), 'is' === e && !De[e]))
                if (Re || Be)
                  try {
                    dt(t);
                  } catch (e) {}
                else
                  try {
                    t.setAttribute(e, '');
                  } catch (e) {}
            },
            ht = function(e) {
              var t = void 0,
                n = void 0;
              if (Pe) e = '<remove></remove>' + e;
              else {
                var r = g(e, /^[\r\n\t ]+/);
                n = r && r[0];
              }
              'application/xhtml+xml' === Je &&
                (e =
                  '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                  e +
                  '</body></html>');
              var i = ae ? ae.createHTML(e) : e;
              if (Ze === Ge)
                try {
                  t = new G().parseFromString(i, Je);
                } catch (e) {}
              if (!t || !t.documentElement) {
                t = le.createDocument(Ze, 'template', null);
                try {
                  t.documentElement.innerHTML = Xe ? '' : i;
                } catch (e) {}
              }
              var o = t.body || t.documentElement;
              return (
                e &&
                  n &&
                  o.insertBefore(a.createTextNode(n), o.childNodes[0] || null),
                Ze === Ge
                  ? ce.call(t, Fe ? 'html' : 'body')[0]
                  : Fe
                  ? t.documentElement
                  : o
              );
            },
            mt = function(e) {
              return ue.call(
                e.ownerDocument || e,
                e,
                c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT,
                null,
                !1,
              );
            },
            gt = function(e) {
              return (
                e instanceof K &&
                ('string' != typeof e.nodeName ||
                  'string' != typeof e.textContent ||
                  'function' != typeof e.removeChild ||
                  !(e.attributes instanceof w) ||
                  'function' != typeof e.removeAttribute ||
                  'function' != typeof e.setAttribute ||
                  'string' != typeof e.namespaceURI ||
                  'function' != typeof e.insertBefore)
              );
            },
            yt = function(e) {
              return 'object' === (void 0 === u ? 'undefined' : W(u))
                ? e instanceof u
                : e &&
                    'object' === (void 0 === e ? 'undefined' : W(e)) &&
                    'number' == typeof e.nodeType &&
                    'string' == typeof e.nodeName;
            },
            bt = function(e, t, r) {
              pe[e] &&
                d(pe[e], function(e) {
                  e.call(n, t, r, rt);
                });
            },
            vt = function(e) {
              var t = void 0;
              if ((bt('beforeSanitizeElements', e, null), gt(e)))
                return dt(e), !0;
              if (g(e.nodeName, /[\u0080-\uFFFF]/)) return dt(e), !0;
              var r = nt(e.nodeName);
              if (
                (bt('uponSanitizeElement', e, { tagName: r, allowedTags: Ee }),
                !yt(e.firstElementChild) &&
                  (!yt(e.content) || !yt(e.content.firstElementChild)) &&
                  x(/<[/\w]/g, e.innerHTML) &&
                  x(/<[/\w]/g, e.textContent))
              )
                return dt(e), !0;
              if ('select' === r && x(/<template/i, e.innerHTML))
                return dt(e), !0;
              if (!Ee[r] || _e[r]) {
                if (!_e[r] && Et(r)) {
                  if (
                    Ce.tagNameCheck instanceof RegExp &&
                    x(Ce.tagNameCheck, r)
                  )
                    return !1;
                  if (Ce.tagNameCheck instanceof Function && Ce.tagNameCheck(r))
                    return !1;
                }
                if (ze && !$e[r]) {
                  var a = ne(e) || e.parentNode,
                    i = te(e) || e.childNodes;
                  if (i && a)
                    for (var o = i.length - 1; o >= 0; --o)
                      a.insertBefore(J(i[o], !0), ee(e));
                }
                return dt(e), !0;
              }
              return e instanceof s && !ft(e)
                ? (dt(e), !0)
                : ('noscript' !== r && 'noembed' !== r) ||
                  !x(/<\/no(script|embed)/i, e.innerHTML)
                ? (Oe &&
                    3 === e.nodeType &&
                    ((t = e.textContent),
                    (t = y(t, he, ' ')),
                    (t = y(t, me, ' ')),
                    e.textContent !== t &&
                      (h(n.removed, { element: e.cloneNode() }),
                      (e.textContent = t))),
                  bt('afterSanitizeElements', e, null),
                  !1)
                : (dt(e), !0);
            },
            xt = function(e, t, n) {
              if (Me && ('id' === t || 'name' === t) && (n in a || n in at))
                return !1;
              if (Se && !Ae[t] && x(ge, t));
              else if (Te && x(ye, t));
              else if (!De[t] || Ae[t]) {
                if (
                  !(
                    (Et(e) &&
                      ((Ce.tagNameCheck instanceof RegExp &&
                        x(Ce.tagNameCheck, e)) ||
                        (Ce.tagNameCheck instanceof Function &&
                          Ce.tagNameCheck(e))) &&
                      ((Ce.attributeNameCheck instanceof RegExp &&
                        x(Ce.attributeNameCheck, t)) ||
                        (Ce.attributeNameCheck instanceof Function &&
                          Ce.attributeNameCheck(t)))) ||
                    ('is' === t &&
                      Ce.allowCustomizedBuiltInElements &&
                      ((Ce.tagNameCheck instanceof RegExp &&
                        x(Ce.tagNameCheck, n)) ||
                        (Ce.tagNameCheck instanceof Function &&
                          Ce.tagNameCheck(n))))
                  )
                )
                  return !1;
              } else if (qe[t]);
              else if (x(xe, y(n, ve, '')));
              else if (
                ('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
                'script' === e ||
                0 !== b(n, 'data:') ||
                !Ve[e]
              )
                if (Ne && !x(be, y(n, ve, '')));
                else if (n) return !1;
              return !0;
            },
            Et = function(e) {
              return e.indexOf('-') > 0;
            },
            wt = function(e) {
              var t = void 0,
                r = void 0,
                a = void 0,
                i = void 0;
              bt('beforeSanitizeAttributes', e, null);
              var o = e.attributes;
              if (o) {
                var l = {
                  attrName: '',
                  attrValue: '',
                  keepAttr: !0,
                  allowedAttributes: De,
                };
                for (i = o.length; i--; ) {
                  var u = (t = o[i]),
                    s = u.name,
                    c = u.namespaceURI;
                  if (
                    ((r = v(t.value)),
                    (a = nt(s)),
                    (l.attrName = a),
                    (l.attrValue = r),
                    (l.keepAttr = !0),
                    (l.forceKeepAttr = void 0),
                    bt('uponSanitizeAttribute', e, l),
                    (r = l.attrValue),
                    !l.forceKeepAttr && (pt(s, e), l.keepAttr))
                  )
                    if (x(/\/>/i, r)) pt(s, e);
                    else {
                      Oe && ((r = y(r, he, ' ')), (r = y(r, me, ' ')));
                      var f = nt(e.nodeName);
                      if (xt(f, a, r))
                        try {
                          c ? e.setAttributeNS(c, s, r) : e.setAttribute(s, r),
                            p(n.removed);
                        } catch (e) {}
                    }
                }
                bt('afterSanitizeAttributes', e, null);
              }
            },
            Dt = function e(t) {
              var n = void 0,
                r = mt(t);
              for (bt('beforeSanitizeShadowDOM', t, null); (n = r.nextNode()); )
                bt('uponSanitizeShadowNode', n, null),
                  vt(n) || (n.content instanceof o && e(n.content), wt(n));
              bt('afterSanitizeShadowDOM', t, null);
            };
          return (
            (n.sanitize = function(e, a) {
              var i = void 0,
                l = void 0,
                s = void 0,
                c = void 0,
                f = void 0;
              if (
                ((Xe = !e) && (e = '\x3c!--\x3e'),
                'string' != typeof e && !yt(e))
              ) {
                if ('function' != typeof e.toString)
                  throw E('toString is not a function');
                if ('string' != typeof (e = e.toString()))
                  throw E('dirty is not a string, aborting');
              }
              if (!n.isSupported) {
                if (
                  'object' === W(t.toStaticHTML) ||
                  'function' == typeof t.toStaticHTML
                ) {
                  if ('string' == typeof e) return t.toStaticHTML(e);
                  if (yt(e)) return t.toStaticHTML(e.outerHTML);
                }
                return e;
              }
              if (
                (je || ot(a),
                (n.removed = []),
                'string' == typeof e && (Le = !1),
                Le)
              ) {
                if (e.nodeName) {
                  var d = nt(e.nodeName);
                  if (!Ee[d] || _e[d])
                    throw E(
                      'root node is forbidden and cannot be sanitized in-place',
                    );
                }
              } else if (e instanceof u)
                (1 ===
                  (l = (i = ht('\x3c!----\x3e')).ownerDocument.importNode(
                    e,
                    !0,
                  )).nodeType &&
                  'BODY' === l.nodeName) ||
                'HTML' === l.nodeName
                  ? (i = l)
                  : i.appendChild(l);
              else {
                if (!Re && !Oe && !Fe && -1 === e.indexOf('<'))
                  return ae && Ie ? ae.createHTML(e) : e;
                if (!(i = ht(e))) return Re ? null : Ie ? ie : '';
              }
              i && Pe && dt(i.firstChild);
              for (var p = mt(Le ? e : i); (s = p.nextNode()); )
                (3 === s.nodeType && s === c) ||
                  vt(s) ||
                  (s.content instanceof o && Dt(s.content), wt(s), (c = s));
              if (((c = null), Le)) return e;
              if (Re) {
                if (Be)
                  for (f = se.call(i.ownerDocument); i.firstChild; )
                    f.appendChild(i.firstChild);
                else f = i;
                return De.shadowroot && (f = fe.call(r, f, !0)), f;
              }
              var h = Fe ? i.outerHTML : i.innerHTML;
              return (
                Fe &&
                  Ee['!doctype'] &&
                  i.ownerDocument &&
                  i.ownerDocument.doctype &&
                  i.ownerDocument.doctype.name &&
                  x(V, i.ownerDocument.doctype.name) &&
                  (h = '<!DOCTYPE ' + i.ownerDocument.doctype.name + '>\n' + h),
                Oe && ((h = y(h, he, ' ')), (h = y(h, me, ' '))),
                ae && Ie ? ae.createHTML(h) : h
              );
            }),
            (n.setConfig = function(e) {
              ot(e), (je = !0);
            }),
            (n.clearConfig = function() {
              (rt = null), (je = !1);
            }),
            (n.isValidAttribute = function(e, t, n) {
              rt || ot({});
              var r = nt(e),
                a = nt(t);
              return xt(r, a, n);
            }),
            (n.addHook = function(e, t) {
              'function' == typeof t && ((pe[e] = pe[e] || []), h(pe[e], t));
            }),
            (n.removeHook = function(e) {
              pe[e] && p(pe[e]);
            }),
            (n.removeHooks = function(e) {
              pe[e] && (pe[e] = []);
            }),
            (n.removeAllHooks = function() {
              pe = {};
            }),
            n
          );
        })();
      })();
    },
    56: function(e, t, n) {
      e.exports =
        window.DOMPurify || (window.DOMPurify = n(49).default || n(49));
    },
    57: function(e, t, n) {
      !(function(e) {
        'use strict';
        function t(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function n(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        function r(e, t) {
          var r =
            ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator'];
          if (r) return (r = r.call(e)).next.bind(r);
          if (
            Array.isArray(e) ||
            (r = (function(e, t) {
              if (e) {
                if ('string' == typeof e) return n(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  'Object' === r && e.constructor && (r = e.constructor.name),
                  'Map' === r || 'Set' === r
                    ? Array.from(e)
                    : 'Arguments' === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? n(e, t)
                    : void 0
                );
              }
            })(e)) ||
            (t && e && 'number' == typeof e.length)
          ) {
            r && (e = r);
            var a = 0;
            return function() {
              return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function a() {
          return {
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: '',
            highlight: null,
            langPrefix: 'language-',
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartLists: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1,
          };
        }
        e.defaults = {
          baseUrl: null,
          breaks: !1,
          extensions: null,
          gfm: !0,
          headerIds: !0,
          headerPrefix: '',
          highlight: null,
          langPrefix: 'language-',
          mangle: !0,
          pedantic: !1,
          renderer: null,
          sanitize: !1,
          sanitizer: null,
          silent: !1,
          smartLists: !1,
          smartypants: !1,
          tokenizer: null,
          walkTokens: null,
          xhtml: !1,
        };
        var i = /[&<>"']/,
          o = /[&<>"']/g,
          l = /[<>"']|&(?!#?\w+;)/,
          u = /[<>"']|&(?!#?\w+;)/g,
          s = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          },
          c = function(e) {
            return s[e];
          };
        function f(e, t) {
          if (t) {
            if (i.test(e)) return e.replace(o, c);
          } else if (l.test(e)) return e.replace(u, c);
          return e;
        }
        var d = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
        function p(e) {
          return e.replace(d, function(e, t) {
            return 'colon' === (t = t.toLowerCase())
              ? ':'
              : '#' === t.charAt(0)
              ? 'x' === t.charAt(1)
                ? String.fromCharCode(parseInt(t.substring(2), 16))
                : String.fromCharCode(+t.substring(1))
              : '';
          });
        }
        var h = /(^|[^\[])\^/g;
        function m(e, t) {
          (e = 'string' == typeof e ? e : e.source), (t = t || '');
          var n = {
            replace: function(t, r) {
              return (
                (r = (r = r.source || r).replace(h, '$1')),
                (e = e.replace(t, r)),
                n
              );
            },
            getRegex: function() {
              return new RegExp(e, t);
            },
          };
          return n;
        }
        var g = /[^\w:]/g,
          y = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function b(e, t, n) {
          if (e) {
            var r;
            try {
              r = decodeURIComponent(p(n))
                .replace(g, '')
                .toLowerCase();
            } catch (e) {
              return null;
            }
            if (
              0 === r.indexOf('javascript:') ||
              0 === r.indexOf('vbscript:') ||
              0 === r.indexOf('data:')
            )
              return null;
          }
          t &&
            !y.test(n) &&
            (n = (function(e, t) {
              v[' ' + e] ||
                (x.test(e)
                  ? (v[' ' + e] = e + '/')
                  : (v[' ' + e] = _(e, '/', !0)));
              var n = -1 === (e = v[' ' + e]).indexOf(':');
              return '//' === t.substring(0, 2)
                ? n
                  ? t
                  : e.replace(E, '$1') + t
                : '/' === t.charAt(0)
                ? n
                  ? t
                  : e.replace(w, '$1') + t
                : e + t;
            })(t, n));
          try {
            n = encodeURI(n).replace(/%25/g, '%');
          } catch (e) {
            return null;
          }
          return n;
        }
        var v = {},
          x = /^[^:]+:\/*[^/]*$/,
          E = /^([^:]+:)[\s\S]*$/,
          w = /^([^:]+:\/*[^/]*)[\s\S]*$/,
          D = { exec: function() {} };
        function k(e) {
          for (var t, n, r = 1; r < arguments.length; r++)
            for (n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }
        function C(e, t) {
          var n = e
              .replace(/\|/g, function(e, t, n) {
                for (var r = !1, a = t; --a >= 0 && '\\' === n[a]; ) r = !r;
                return r ? '|' : ' |';
              })
              .split(/ \|/),
            r = 0;
          if (
            (n[0].trim() || n.shift(),
            n.length > 0 && !n[n.length - 1].trim() && n.pop(),
            n.length > t)
          )
            n.splice(t);
          else for (; n.length < t; ) n.push('');
          for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|');
          return n;
        }
        function _(e, t, n) {
          var r = e.length;
          if (0 === r) return '';
          for (var a = 0; a < r; ) {
            var i = e.charAt(r - a - 1);
            if (i !== t || n) {
              if (i === t || !n) break;
              a++;
            } else a++;
          }
          return e.slice(0, r - a);
        }
        function A(e) {
          e &&
            e.sanitize &&
            !e.silent &&
            console.warn(
              'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options',
            );
        }
        function T(e, t) {
          if (t < 1) return '';
          for (var n = ''; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e);
          return n + e;
        }
        function S(e, t, n, r) {
          var a = t.href,
            i = t.title ? f(t.title) : null,
            o = e[1].replace(/\\([\[\]])/g, '$1');
          if ('!' !== e[0].charAt(0)) {
            r.state.inLink = !0;
            var l = {
              type: 'link',
              raw: n,
              href: a,
              title: i,
              text: o,
              tokens: r.inlineTokens(o, []),
            };
            return (r.state.inLink = !1), l;
          }
          return { type: 'image', raw: n, href: a, title: i, text: f(o) };
        }
        var N = (function() {
            function t(t) {
              this.options = t || e.defaults;
            }
            var n = t.prototype;
            return (
              (n.space = function(e) {
                var t = this.rules.block.newline.exec(e);
                if (t && t[0].length > 0) return { type: 'space', raw: t[0] };
              }),
              (n.code = function(e) {
                var t = this.rules.block.code.exec(e);
                if (t) {
                  var n = t[0].replace(/^ {1,4}/gm, '');
                  return {
                    type: 'code',
                    raw: t[0],
                    codeBlockStyle: 'indented',
                    text: this.options.pedantic ? n : _(n, '\n'),
                  };
                }
              }),
              (n.fences = function(e) {
                var t = this.rules.block.fences.exec(e);
                if (t) {
                  var n = t[0],
                    r = (function(e, t) {
                      var n = e.match(/^(\s+)(?:```)/);
                      if (null === n) return t;
                      var r = n[1];
                      return t
                        .split('\n')
                        .map(function(e) {
                          var t = e.match(/^\s+/);
                          return null === t
                            ? e
                            : t[0].length >= r.length
                            ? e.slice(r.length)
                            : e;
                        })
                        .join('\n');
                    })(n, t[3] || '');
                  return {
                    type: 'code',
                    raw: n,
                    lang: t[2] ? t[2].trim() : t[2],
                    text: r,
                  };
                }
              }),
              (n.heading = function(e) {
                var t = this.rules.block.heading.exec(e);
                if (t) {
                  var n = t[2].trim();
                  if (/#$/.test(n)) {
                    var r = _(n, '#');
                    this.options.pedantic
                      ? (n = r.trim())
                      : (r && !/ $/.test(r)) || (n = r.trim());
                  }
                  var a = {
                    type: 'heading',
                    raw: t[0],
                    depth: t[1].length,
                    text: n,
                    tokens: [],
                  };
                  return this.lexer.inline(a.text, a.tokens), a;
                }
              }),
              (n.hr = function(e) {
                var t = this.rules.block.hr.exec(e);
                if (t) return { type: 'hr', raw: t[0] };
              }),
              (n.blockquote = function(e) {
                var t = this.rules.block.blockquote.exec(e);
                if (t) {
                  var n = t[0].replace(/^ *>[ \t]?/gm, '');
                  return {
                    type: 'blockquote',
                    raw: t[0],
                    tokens: this.lexer.blockTokens(n, []),
                    text: n,
                  };
                }
              }),
              (n.list = function(e) {
                var t = this.rules.block.list.exec(e);
                if (t) {
                  var n,
                    a,
                    i,
                    o,
                    l,
                    u,
                    s,
                    c,
                    f,
                    d,
                    p,
                    h,
                    m = t[1].trim(),
                    g = m.length > 1,
                    y = {
                      type: 'list',
                      raw: '',
                      ordered: g,
                      start: g ? +m.slice(0, -1) : '',
                      loose: !1,
                      items: [],
                    };
                  (m = g ? '\\d{1,9}\\' + m.slice(-1) : '\\' + m),
                    this.options.pedantic && (m = g ? m : '[*+-]');
                  for (
                    var b = new RegExp(
                      '^( {0,3}' + m + ')((?:[\t ][^\\n]*)?(?:\\n|$))',
                    );
                    e &&
                    ((h = !1), (t = b.exec(e))) &&
                    !this.rules.block.hr.test(e);

                  ) {
                    if (
                      ((n = t[0]),
                      (e = e.substring(n.length)),
                      (c = t[2].split('\n', 1)[0]),
                      (f = e.split('\n', 1)[0]),
                      this.options.pedantic
                        ? ((o = 2), (p = c.trimLeft()))
                        : ((o = (o = t[2].search(/[^ ]/)) > 4 ? 1 : o),
                          (p = c.slice(o)),
                          (o += t[1].length)),
                      (u = !1),
                      !c &&
                        /^ *$/.test(f) &&
                        ((n += f + '\n'),
                        (e = e.substring(f.length + 1)),
                        (h = !0)),
                      !h)
                    )
                      for (
                        var v = new RegExp(
                          '^ {0,' +
                            Math.min(3, o - 1) +
                            '}(?:[*+-]|\\d{1,9}[.)])',
                        );
                        e &&
                        ((c = d = e.split('\n', 1)[0]),
                        this.options.pedantic &&
                          (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
                        !v.test(c));

                      ) {
                        if (c.search(/[^ ]/) >= o || !c.trim())
                          p += '\n' + c.slice(o);
                        else {
                          if (u) break;
                          p += '\n' + c;
                        }
                        u || c.trim() || (u = !0),
                          (n += d + '\n'),
                          (e = e.substring(d.length + 1));
                      }
                    y.loose ||
                      (s ? (y.loose = !0) : /\n *\n *$/.test(n) && (s = !0)),
                      this.options.gfm &&
                        (a = /^\[[ xX]\] /.exec(p)) &&
                        ((i = '[ ] ' !== a[0]),
                        (p = p.replace(/^\[[ xX]\] +/, ''))),
                      y.items.push({
                        type: 'list_item',
                        raw: n,
                        task: !!a,
                        checked: i,
                        loose: !1,
                        text: p,
                      }),
                      (y.raw += n);
                  }
                  (y.items[y.items.length - 1].raw = n.trimRight()),
                    (y.items[y.items.length - 1].text = p.trimRight()),
                    (y.raw = y.raw.trimRight());
                  var x = y.items.length;
                  for (l = 0; l < x; l++) {
                    (this.lexer.state.top = !1),
                      (y.items[l].tokens = this.lexer.blockTokens(
                        y.items[l].text,
                        [],
                      ));
                    var E = y.items[l].tokens.filter(function(e) {
                        return 'space' === e.type;
                      }),
                      w = E.every(function(e) {
                        for (
                          var t, n = 0, a = r(e.raw.split(''));
                          !(t = a()).done;

                        )
                          if (('\n' === t.value && (n += 1), n > 1)) return !0;
                        return !1;
                      });
                    !y.loose &&
                      E.length &&
                      w &&
                      ((y.loose = !0), (y.items[l].loose = !0));
                  }
                  return y;
                }
              }),
              (n.html = function(e) {
                var t = this.rules.block.html.exec(e);
                if (t) {
                  var n = {
                    type: 'html',
                    raw: t[0],
                    pre:
                      !this.options.sanitizer &&
                      ('pre' === t[1] || 'script' === t[1] || 'style' === t[1]),
                    text: t[0],
                  };
                  return (
                    this.options.sanitize &&
                      ((n.type = 'paragraph'),
                      (n.text = this.options.sanitizer
                        ? this.options.sanitizer(t[0])
                        : f(t[0])),
                      (n.tokens = []),
                      this.lexer.inline(n.text, n.tokens)),
                    n
                  );
                }
              }),
              (n.def = function(e) {
                var t = this.rules.block.def.exec(e);
                if (t)
                  return (
                    t[3] && (t[3] = t[3].substring(1, t[3].length - 1)),
                    {
                      type: 'def',
                      tag: t[1].toLowerCase().replace(/\s+/g, ' '),
                      raw: t[0],
                      href: t[2],
                      title: t[3],
                    }
                  );
              }),
              (n.table = function(e) {
                var t = this.rules.block.table.exec(e);
                if (t) {
                  var n = {
                    type: 'table',
                    header: C(t[1]).map(function(e) {
                      return { text: e };
                    }),
                    align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    rows:
                      t[3] && t[3].trim()
                        ? t[3].replace(/\n[ \t]*$/, '').split('\n')
                        : [],
                  };
                  if (n.header.length === n.align.length) {
                    n.raw = t[0];
                    var r,
                      a,
                      i,
                      o,
                      l = n.align.length;
                    for (r = 0; r < l; r++)
                      /^ *-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'right')
                        : /^ *:-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'center')
                        : /^ *:-+ *$/.test(n.align[r])
                        ? (n.align[r] = 'left')
                        : (n.align[r] = null);
                    for (l = n.rows.length, r = 0; r < l; r++)
                      n.rows[r] = C(n.rows[r], n.header.length).map(function(
                        e,
                      ) {
                        return { text: e };
                      });
                    for (l = n.header.length, a = 0; a < l; a++)
                      (n.header[a].tokens = []),
                        this.lexer.inlineTokens(
                          n.header[a].text,
                          n.header[a].tokens,
                        );
                    for (l = n.rows.length, a = 0; a < l; a++)
                      for (o = n.rows[a], i = 0; i < o.length; i++)
                        (o[i].tokens = []),
                          this.lexer.inlineTokens(o[i].text, o[i].tokens);
                    return n;
                  }
                }
              }),
              (n.lheading = function(e) {
                var t = this.rules.block.lheading.exec(e);
                if (t) {
                  var n = {
                    type: 'heading',
                    raw: t[0],
                    depth: '=' === t[2].charAt(0) ? 1 : 2,
                    text: t[1],
                    tokens: [],
                  };
                  return this.lexer.inline(n.text, n.tokens), n;
                }
              }),
              (n.paragraph = function(e) {
                var t = this.rules.block.paragraph.exec(e);
                if (t) {
                  var n = {
                    type: 'paragraph',
                    raw: t[0],
                    text:
                      '\n' === t[1].charAt(t[1].length - 1)
                        ? t[1].slice(0, -1)
                        : t[1],
                    tokens: [],
                  };
                  return this.lexer.inline(n.text, n.tokens), n;
                }
              }),
              (n.text = function(e) {
                var t = this.rules.block.text.exec(e);
                if (t) {
                  var n = { type: 'text', raw: t[0], text: t[0], tokens: [] };
                  return this.lexer.inline(n.text, n.tokens), n;
                }
              }),
              (n.escape = function(e) {
                var t = this.rules.inline.escape.exec(e);
                if (t) return { type: 'escape', raw: t[0], text: f(t[1]) };
              }),
              (n.tag = function(e) {
                var t = this.rules.inline.tag.exec(e);
                if (t)
                  return (
                    !this.lexer.state.inLink && /^<a /i.test(t[0])
                      ? (this.lexer.state.inLink = !0)
                      : this.lexer.state.inLink &&
                        /^<\/a>/i.test(t[0]) &&
                        (this.lexer.state.inLink = !1),
                    !this.lexer.state.inRawBlock &&
                    /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
                      ? (this.lexer.state.inRawBlock = !0)
                      : this.lexer.state.inRawBlock &&
                        /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
                        (this.lexer.state.inRawBlock = !1),
                    {
                      type: this.options.sanitize ? 'text' : 'html',
                      raw: t[0],
                      inLink: this.lexer.state.inLink,
                      inRawBlock: this.lexer.state.inRawBlock,
                      text: this.options.sanitize
                        ? this.options.sanitizer
                          ? this.options.sanitizer(t[0])
                          : f(t[0])
                        : t[0],
                    }
                  );
              }),
              (n.link = function(e) {
                var t = this.rules.inline.link.exec(e);
                if (t) {
                  var n = t[2].trim();
                  if (!this.options.pedantic && /^</.test(n)) {
                    if (!/>$/.test(n)) return;
                    var r = _(n.slice(0, -1), '\\');
                    if ((n.length - r.length) % 2 == 0) return;
                  } else {
                    var a = (function(e, t) {
                      if (-1 === e.indexOf(t[1])) return -1;
                      for (var n = e.length, r = 0, a = 0; a < n; a++)
                        if ('\\' === e[a]) a++;
                        else if (e[a] === t[0]) r++;
                        else if (e[a] === t[1] && --r < 0) return a;
                      return -1;
                    })(t[2], '()');
                    if (a > -1) {
                      var i =
                        (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + a;
                      (t[2] = t[2].substring(0, a)),
                        (t[0] = t[0].substring(0, i).trim()),
                        (t[3] = '');
                    }
                  }
                  var o = t[2],
                    l = '';
                  if (this.options.pedantic) {
                    var u = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);
                    u && ((o = u[1]), (l = u[3]));
                  } else l = t[3] ? t[3].slice(1, -1) : '';
                  return (
                    (o = o.trim()),
                    /^</.test(o) &&
                      (o =
                        this.options.pedantic && !/>$/.test(n)
                          ? o.slice(1)
                          : o.slice(1, -1)),
                    S(
                      t,
                      {
                        href: o
                          ? o.replace(this.rules.inline._escapes, '$1')
                          : o,
                        title: l
                          ? l.replace(this.rules.inline._escapes, '$1')
                          : l,
                      },
                      t[0],
                      this.lexer,
                    )
                  );
                }
              }),
              (n.reflink = function(e, t) {
                var n;
                if (
                  (n = this.rules.inline.reflink.exec(e)) ||
                  (n = this.rules.inline.nolink.exec(e))
                ) {
                  var r = (n[2] || n[1]).replace(/\s+/g, ' ');
                  if (!(r = t[r.toLowerCase()]) || !r.href) {
                    var a = n[0].charAt(0);
                    return { type: 'text', raw: a, text: a };
                  }
                  return S(n, r, n[0], this.lexer);
                }
              }),
              (n.emStrong = function(e, t, n) {
                void 0 === n && (n = '');
                var r = this.rules.inline.emStrong.lDelim.exec(e);
                if (
                  r &&
                  (!r[3] ||
                    !n.match(
                      /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/,
                    ))
                ) {
                  var a = r[1] || r[2] || '';
                  if (
                    !a ||
                    (a && ('' === n || this.rules.inline.punctuation.exec(n)))
                  ) {
                    var i,
                      o,
                      l = r[0].length - 1,
                      u = l,
                      s = 0,
                      c =
                        '*' === r[0][0]
                          ? this.rules.inline.emStrong.rDelimAst
                          : this.rules.inline.emStrong.rDelimUnd;
                    for (
                      c.lastIndex = 0, t = t.slice(-1 * e.length + l);
                      null != (r = c.exec(t));

                    )
                      if ((i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]))
                        if (((o = i.length), r[3] || r[4])) u += o;
                        else if (!((r[5] || r[6]) && l % 3) || (l + o) % 3) {
                          if (!((u -= o) > 0)) {
                            if (
                              ((o = Math.min(o, o + u + s)), Math.min(l, o) % 2)
                            ) {
                              var f = e.slice(1, l + r.index + o);
                              return {
                                type: 'em',
                                raw: e.slice(0, l + r.index + o + 1),
                                text: f,
                                tokens: this.lexer.inlineTokens(f, []),
                              };
                            }
                            var d = e.slice(2, l + r.index + o - 1);
                            return {
                              type: 'strong',
                              raw: e.slice(0, l + r.index + o + 1),
                              text: d,
                              tokens: this.lexer.inlineTokens(d, []),
                            };
                          }
                        } else s += o;
                  }
                }
              }),
              (n.codespan = function(e) {
                var t = this.rules.inline.code.exec(e);
                if (t) {
                  var n = t[2].replace(/\n/g, ' '),
                    r = /[^ ]/.test(n),
                    a = /^ /.test(n) && / $/.test(n);
                  return (
                    r && a && (n = n.substring(1, n.length - 1)),
                    (n = f(n, !0)),
                    { type: 'codespan', raw: t[0], text: n }
                  );
                }
              }),
              (n.br = function(e) {
                var t = this.rules.inline.br.exec(e);
                if (t) return { type: 'br', raw: t[0] };
              }),
              (n.del = function(e) {
                var t = this.rules.inline.del.exec(e);
                if (t)
                  return {
                    type: 'del',
                    raw: t[0],
                    text: t[2],
                    tokens: this.lexer.inlineTokens(t[2], []),
                  };
              }),
              (n.autolink = function(e, t) {
                var n,
                  r,
                  a = this.rules.inline.autolink.exec(e);
                if (a)
                  return (
                    (r =
                      '@' === a[2]
                        ? 'mailto:' +
                          (n = f(this.options.mangle ? t(a[1]) : a[1]))
                        : (n = f(a[1]))),
                    {
                      type: 'link',
                      raw: a[0],
                      text: n,
                      href: r,
                      tokens: [{ type: 'text', raw: n, text: n }],
                    }
                  );
              }),
              (n.url = function(e, t) {
                var n;
                if ((n = this.rules.inline.url.exec(e))) {
                  var r, a;
                  if ('@' === n[2])
                    a =
                      'mailto:' + (r = f(this.options.mangle ? t(n[0]) : n[0]));
                  else {
                    var i;
                    do {
                      (i = n[0]),
                        (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
                    } while (i !== n[0]);
                    (r = f(n[0])), (a = 'www.' === n[1] ? 'http://' + r : r);
                  }
                  return {
                    type: 'link',
                    raw: n[0],
                    text: r,
                    href: a,
                    tokens: [{ type: 'text', raw: r, text: r }],
                  };
                }
              }),
              (n.inlineText = function(e, t) {
                var n,
                  r = this.rules.inline.text.exec(e);
                if (r)
                  return (
                    (n = this.lexer.state.inRawBlock
                      ? this.options.sanitize
                        ? this.options.sanitizer
                          ? this.options.sanitizer(r[0])
                          : f(r[0])
                        : r[0]
                      : f(this.options.smartypants ? t(r[0]) : r[0])),
                    { type: 'text', raw: r[0], text: n }
                  );
              }),
              t
            );
          })(),
          O = {
            newline: /^(?: *(?:\n|$))+/,
            code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
            hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
            html:
              '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
            def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
            table: D,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
          };
        (O.def = m(O.def)
          .replace('label', O._label)
          .replace('title', O._title)
          .getRegex()),
          (O.bullet = /(?:[*+-]|\d{1,9}[.)])/),
          (O.listItemStart = m(/^( *)(bull) */)
            .replace('bull', O.bullet)
            .getRegex()),
          (O.list = m(O.list)
            .replace(/bull/g, O.bullet)
            .replace(
              'hr',
              '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
            )
            .replace('def', '\\n+(?=' + O.def.source + ')')
            .getRegex()),
          (O._tag =
            'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
          (O._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
          (O.html = m(O.html, 'i')
            .replace('comment', O._comment)
            .replace('tag', O._tag)
            .replace(
              'attribute',
              / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
            )
            .getRegex()),
          (O.paragraph = m(O._paragraph)
            .replace('hr', O.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('|table', '')
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
            )
            .replace('tag', O._tag)
            .getRegex()),
          (O.blockquote = m(O.blockquote)
            .replace('paragraph', O.paragraph)
            .getRegex()),
          (O.normal = k({}, O)),
          (O.gfm = k({}, O.normal, {
            table:
              '^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
          })),
          (O.gfm.table = m(O.gfm.table)
            .replace('hr', O.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
            )
            .replace('tag', O._tag)
            .getRegex()),
          (O.gfm.paragraph = m(O._paragraph)
            .replace('hr', O.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('table', O.gfm.table)
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
            )
            .replace('tag', O._tag)
            .getRegex()),
          (O.pedantic = k({}, O.normal, {
            html: m(
              '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
            )
              .replace('comment', O._comment)
              .replace(
                /tag/g,
                '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
              )
              .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: D,
            paragraph: m(O.normal._paragraph)
              .replace('hr', O.hr)
              .replace('heading', ' *#{1,6} *[^\n]')
              .replace('lheading', O.lheading)
              .replace('blockquote', ' {0,3}>')
              .replace('|fences', '')
              .replace('|list', '')
              .replace('|html', '')
              .getRegex(),
          }));
        var F = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: D,
          tag:
            '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
          link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(ref)\]/,
          nolink: /^!?\[(ref)\](?:\[\])?/,
          reflinkSearch: 'reflink|nolink(?!\\()',
          emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
            rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
          },
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: D,
          text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
          punctuation: /^([\spunctuation])/,
        };
        function j(e) {
          return e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…');
        }
        function P(e) {
          var t,
            n,
            r = '',
            a = e.length;
          for (t = 0; t < a; t++)
            (n = e.charCodeAt(t)),
              Math.random() > 0.5 && (n = 'x' + n.toString(16)),
              (r += '&#' + n + ';');
          return r;
        }
        (F._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~'),
          (F.punctuation = m(F.punctuation)
            .replace(/punctuation/g, F._punctuation)
            .getRegex()),
          (F.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
          (F.escapedEmSt = /\\\*|\\_/g),
          (F._comment = m(O._comment)
            .replace('(?:--\x3e|$)', '--\x3e')
            .getRegex()),
          (F.emStrong.lDelim = m(F.emStrong.lDelim)
            .replace(/punct/g, F._punctuation)
            .getRegex()),
          (F.emStrong.rDelimAst = m(F.emStrong.rDelimAst, 'g')
            .replace(/punct/g, F._punctuation)
            .getRegex()),
          (F.emStrong.rDelimUnd = m(F.emStrong.rDelimUnd, 'g')
            .replace(/punct/g, F._punctuation)
            .getRegex()),
          (F._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
          (F._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
          (F._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
          (F.autolink = m(F.autolink)
            .replace('scheme', F._scheme)
            .replace('email', F._email)
            .getRegex()),
          (F._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
          (F.tag = m(F.tag)
            .replace('comment', F._comment)
            .replace('attribute', F._attribute)
            .getRegex()),
          (F._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
          (F._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
          (F._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
          (F.link = m(F.link)
            .replace('label', F._label)
            .replace('href', F._href)
            .replace('title', F._title)
            .getRegex()),
          (F.reflink = m(F.reflink)
            .replace('label', F._label)
            .replace('ref', O._label)
            .getRegex()),
          (F.nolink = m(F.nolink)
            .replace('ref', O._label)
            .getRegex()),
          (F.reflinkSearch = m(F.reflinkSearch, 'g')
            .replace('reflink', F.reflink)
            .replace('nolink', F.nolink)
            .getRegex()),
          (F.normal = k({}, F)),
          (F.pedantic = k({}, F.normal, {
            strong: {
              start: /^__|\*\*/,
              middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
              endAst: /\*\*(?!\*)/g,
              endUnd: /__(?!_)/g,
            },
            em: {
              start: /^_|\*/,
              middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
              endAst: /\*(?!\*)/g,
              endUnd: /_(?!_)/g,
            },
            link: m(/^!?\[(label)\]\((.*?)\)/)
              .replace('label', F._label)
              .getRegex(),
            reflink: m(/^!?\[(label)\]\s*\[([^\]]*)\]/)
              .replace('label', F._label)
              .getRegex(),
          })),
          (F.gfm = k({}, F.normal, {
            escape: m(F.escape)
              .replace('])', '~|])')
              .getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
          })),
          (F.gfm.url = m(F.gfm.url, 'i')
            .replace('email', F.gfm._extended_email)
            .getRegex()),
          (F.breaks = k({}, F.gfm, {
            br: m(F.br)
              .replace('{2,}', '*')
              .getRegex(),
            text: m(F.gfm.text)
              .replace('\\b_', '\\b_| {2,}\\n')
              .replace(/\{2,\}/g, '*')
              .getRegex(),
          }));
        var R = (function() {
            function n(t) {
              (this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = t || e.defaults),
                (this.options.tokenizer = this.options.tokenizer || new N()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options),
                (this.tokenizer.lexer = this),
                (this.inlineQueue = []),
                (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
              var n = { block: O.normal, inline: F.normal };
              this.options.pedantic
                ? ((n.block = O.pedantic), (n.inline = F.pedantic))
                : this.options.gfm &&
                  ((n.block = O.gfm),
                  this.options.breaks
                    ? (n.inline = F.breaks)
                    : (n.inline = F.gfm)),
                (this.tokenizer.rules = n);
            }
            (n.lex = function(e, t) {
              return new n(t).lex(e);
            }),
              (n.lexInline = function(e, t) {
                return new n(t).inlineTokens(e);
              });
            var r,
              a,
              i,
              o = n.prototype;
            return (
              (o.lex = function(e) {
                var t;
                for (
                  e = e.replace(/\r\n|\r/g, '\n'),
                    this.blockTokens(e, this.tokens);
                  (t = this.inlineQueue.shift());

                )
                  this.inlineTokens(t.src, t.tokens);
                return this.tokens;
              }),
              (o.blockTokens = function(e, t) {
                var n,
                  r,
                  a,
                  i,
                  o = this;
                for (
                  void 0 === t && (t = []),
                    e = this.options.pedantic
                      ? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
                      : e.replace(/^( *)(\t+)/gm, function(e, t, n) {
                          return t + '    '.repeat(n.length);
                        });
                  e;

                )
                  if (
                    !(
                      this.options.extensions &&
                      this.options.extensions.block &&
                      this.options.extensions.block.some(function(r) {
                        return (
                          !!(n = r.call({ lexer: o }, e, t)) &&
                          ((e = e.substring(n.raw.length)), t.push(n), !0)
                        );
                      })
                    )
                  )
                    if ((n = this.tokenizer.space(e)))
                      (e = e.substring(n.raw.length)),
                        1 === n.raw.length && t.length > 0
                          ? (t[t.length - 1].raw += '\n')
                          : t.push(n);
                    else if ((n = this.tokenizer.code(e)))
                      (e = e.substring(n.raw.length)),
                        !(r = t[t.length - 1]) ||
                        ('paragraph' !== r.type && 'text' !== r.type)
                          ? t.push(n)
                          : ((r.raw += '\n' + n.raw),
                            (r.text += '\n' + n.text),
                            (this.inlineQueue[this.inlineQueue.length - 1].src =
                              r.text));
                    else if ((n = this.tokenizer.fences(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.heading(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.hr(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.blockquote(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.list(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.html(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.def(e)))
                      (e = e.substring(n.raw.length)),
                        !(r = t[t.length - 1]) ||
                        ('paragraph' !== r.type && 'text' !== r.type)
                          ? this.tokens.links[n.tag] ||
                            (this.tokens.links[n.tag] = {
                              href: n.href,
                              title: n.title,
                            })
                          : ((r.raw += '\n' + n.raw),
                            (r.text += '\n' + n.raw),
                            (this.inlineQueue[this.inlineQueue.length - 1].src =
                              r.text));
                    else if ((n = this.tokenizer.table(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.lheading(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if (
                      ((a = e),
                      this.options.extensions &&
                        this.options.extensions.startBlock &&
                        (function() {
                          var t = 1 / 0,
                            n = e.slice(1),
                            r = void 0;
                          o.options.extensions.startBlock.forEach(function(e) {
                            'number' ==
                              typeof (r = e.call({ lexer: this }, n)) &&
                              r >= 0 &&
                              (t = Math.min(t, r));
                          }),
                            t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
                        })(),
                      this.state.top && (n = this.tokenizer.paragraph(a)))
                    )
                      (r = t[t.length - 1]),
                        i && 'paragraph' === r.type
                          ? ((r.raw += '\n' + n.raw),
                            (r.text += '\n' + n.text),
                            this.inlineQueue.pop(),
                            (this.inlineQueue[this.inlineQueue.length - 1].src =
                              r.text))
                          : t.push(n),
                        (i = a.length !== e.length),
                        (e = e.substring(n.raw.length));
                    else if ((n = this.tokenizer.text(e)))
                      (e = e.substring(n.raw.length)),
                        (r = t[t.length - 1]) && 'text' === r.type
                          ? ((r.raw += '\n' + n.raw),
                            (r.text += '\n' + n.text),
                            this.inlineQueue.pop(),
                            (this.inlineQueue[this.inlineQueue.length - 1].src =
                              r.text))
                          : t.push(n);
                    else if (e) {
                      var l = 'Infinite loop on byte: ' + e.charCodeAt(0);
                      if (this.options.silent) {
                        console.error(l);
                        break;
                      }
                      throw new Error(l);
                    }
                return (this.state.top = !0), t;
              }),
              (o.inline = function(e, t) {
                this.inlineQueue.push({ src: e, tokens: t });
              }),
              (o.inlineTokens = function(e, t) {
                var n,
                  r,
                  a,
                  i = this;
                void 0 === t && (t = []);
                var o,
                  l,
                  u,
                  s = e;
                if (this.tokens.links) {
                  var c = Object.keys(this.tokens.links);
                  if (c.length > 0)
                    for (
                      ;
                      null !=
                      (o = this.tokenizer.rules.inline.reflinkSearch.exec(s));

                    )
                      c.includes(o[0].slice(o[0].lastIndexOf('[') + 1, -1)) &&
                        (s =
                          s.slice(0, o.index) +
                          '[' +
                          T('a', o[0].length - 2) +
                          ']' +
                          s.slice(
                            this.tokenizer.rules.inline.reflinkSearch.lastIndex,
                          ));
                }
                for (
                  ;
                  null != (o = this.tokenizer.rules.inline.blockSkip.exec(s));

                )
                  s =
                    s.slice(0, o.index) +
                    '[' +
                    T('a', o[0].length - 2) +
                    ']' +
                    s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                for (
                  ;
                  null != (o = this.tokenizer.rules.inline.escapedEmSt.exec(s));

                )
                  s =
                    s.slice(0, o.index) +
                    '++' +
                    s.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
                for (; e; )
                  if (
                    (l || (u = ''),
                    (l = !1),
                    !(
                      this.options.extensions &&
                      this.options.extensions.inline &&
                      this.options.extensions.inline.some(function(r) {
                        return (
                          !!(n = r.call({ lexer: i }, e, t)) &&
                          ((e = e.substring(n.raw.length)), t.push(n), !0)
                        );
                      })
                    ))
                  )
                    if ((n = this.tokenizer.escape(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.tag(e)))
                      (e = e.substring(n.raw.length)),
                        (r = t[t.length - 1]) &&
                        'text' === n.type &&
                        'text' === r.type
                          ? ((r.raw += n.raw), (r.text += n.text))
                          : t.push(n);
                    else if ((n = this.tokenizer.link(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
                      (e = e.substring(n.raw.length)),
                        (r = t[t.length - 1]) &&
                        'text' === n.type &&
                        'text' === r.type
                          ? ((r.raw += n.raw), (r.text += n.text))
                          : t.push(n);
                    else if ((n = this.tokenizer.emStrong(e, s, u)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.codespan(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.br(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.del(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.autolink(e, P)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if (
                      this.state.inLink ||
                      !(n = this.tokenizer.url(e, P))
                    ) {
                      if (
                        ((a = e),
                        this.options.extensions &&
                          this.options.extensions.startInline &&
                          (function() {
                            var t = 1 / 0,
                              n = e.slice(1),
                              r = void 0;
                            i.options.extensions.startInline.forEach(function(
                              e,
                            ) {
                              'number' ==
                                typeof (r = e.call({ lexer: this }, n)) &&
                                r >= 0 &&
                                (t = Math.min(t, r));
                            }),
                              t < 1 / 0 &&
                                t >= 0 &&
                                (a = e.substring(0, t + 1));
                          })(),
                        (n = this.tokenizer.inlineText(a, j)))
                      )
                        (e = e.substring(n.raw.length)),
                          '_' !== n.raw.slice(-1) && (u = n.raw.slice(-1)),
                          (l = !0),
                          (r = t[t.length - 1]) && 'text' === r.type
                            ? ((r.raw += n.raw), (r.text += n.text))
                            : t.push(n);
                      else if (e) {
                        var f = 'Infinite loop on byte: ' + e.charCodeAt(0);
                        if (this.options.silent) {
                          console.error(f);
                          break;
                        }
                        throw new Error(f);
                      }
                    } else (e = e.substring(n.raw.length)), t.push(n);
                return t;
              }),
              (r = n),
              (i = [
                {
                  key: 'rules',
                  get: function() {
                    return { block: O, inline: F };
                  },
                },
              ]),
              (a = null) && t(r.prototype, a),
              i && t(r, i),
              Object.defineProperty(r, 'prototype', { writable: !1 }),
              n
            );
          })(),
          B = (function() {
            function t(t) {
              this.options = t || e.defaults;
            }
            var n = t.prototype;
            return (
              (n.code = function(e, t, n) {
                var r = (t || '').match(/\S*/)[0];
                if (this.options.highlight) {
                  var a = this.options.highlight(e, r);
                  null != a && a !== e && ((n = !0), (e = a));
                }
                return (
                  (e = e.replace(/\n$/, '') + '\n'),
                  r
                    ? '<pre><code class="' +
                      this.options.langPrefix +
                      f(r, !0) +
                      '">' +
                      (n ? e : f(e, !0)) +
                      '</code></pre>\n'
                    : '<pre><code>' + (n ? e : f(e, !0)) + '</code></pre>\n'
                );
              }),
              (n.blockquote = function(e) {
                return '<blockquote>\n' + e + '</blockquote>\n';
              }),
              (n.html = function(e) {
                return e;
              }),
              (n.heading = function(e, t, n, r) {
                return this.options.headerIds
                  ? '<h' +
                      t +
                      ' id="' +
                      (this.options.headerPrefix + r.slug(n)) +
                      '">' +
                      e +
                      '</h' +
                      t +
                      '>\n'
                  : '<h' + t + '>' + e + '</h' + t + '>\n';
              }),
              (n.hr = function() {
                return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
              }),
              (n.list = function(e, t, n) {
                var r = t ? 'ol' : 'ul';
                return (
                  '<' +
                  r +
                  (t && 1 !== n ? ' start="' + n + '"' : '') +
                  '>\n' +
                  e +
                  '</' +
                  r +
                  '>\n'
                );
              }),
              (n.listitem = function(e) {
                return '<li>' + e + '</li>\n';
              }),
              (n.checkbox = function(e) {
                return (
                  '<input ' +
                  (e ? 'checked="" ' : '') +
                  'disabled="" type="checkbox"' +
                  (this.options.xhtml ? ' /' : '') +
                  '> '
                );
              }),
              (n.paragraph = function(e) {
                return '<p>' + e + '</p>\n';
              }),
              (n.table = function(e, t) {
                return (
                  t && (t = '<tbody>' + t + '</tbody>'),
                  '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
                );
              }),
              (n.tablerow = function(e) {
                return '<tr>\n' + e + '</tr>\n';
              }),
              (n.tablecell = function(e, t) {
                var n = t.header ? 'th' : 'td';
                return (
                  (t.align
                    ? '<' + n + ' align="' + t.align + '">'
                    : '<' + n + '>') +
                  e +
                  '</' +
                  n +
                  '>\n'
                );
              }),
              (n.strong = function(e) {
                return '<strong>' + e + '</strong>';
              }),
              (n.em = function(e) {
                return '<em>' + e + '</em>';
              }),
              (n.codespan = function(e) {
                return '<code>' + e + '</code>';
              }),
              (n.br = function() {
                return this.options.xhtml ? '<br/>' : '<br>';
              }),
              (n.del = function(e) {
                return '<del>' + e + '</del>';
              }),
              (n.link = function(e, t, n) {
                if (
                  null ===
                  (e = b(this.options.sanitize, this.options.baseUrl, e))
                )
                  return n;
                var r = '<a href="' + f(e) + '"';
                return (
                  t && (r += ' title="' + t + '"'), (r += '>' + n + '</a>')
                );
              }),
              (n.image = function(e, t, n) {
                if (
                  null ===
                  (e = b(this.options.sanitize, this.options.baseUrl, e))
                )
                  return n;
                var r = '<img src="' + e + '" alt="' + n + '"';
                return (
                  t && (r += ' title="' + t + '"'),
                  (r += this.options.xhtml ? '/>' : '>')
                );
              }),
              (n.text = function(e) {
                return e;
              }),
              t
            );
          })(),
          I = (function() {
            function e() {}
            var t = e.prototype;
            return (
              (t.strong = function(e) {
                return e;
              }),
              (t.em = function(e) {
                return e;
              }),
              (t.codespan = function(e) {
                return e;
              }),
              (t.del = function(e) {
                return e;
              }),
              (t.html = function(e) {
                return e;
              }),
              (t.text = function(e) {
                return e;
              }),
              (t.link = function(e, t, n) {
                return '' + n;
              }),
              (t.image = function(e, t, n) {
                return '' + n;
              }),
              (t.br = function() {
                return '';
              }),
              e
            );
          })(),
          M = (function() {
            function e() {
              this.seen = {};
            }
            var t = e.prototype;
            return (
              (t.serialize = function(e) {
                return e
                  .toLowerCase()
                  .trim()
                  .replace(/<[!\/a-z].*?>/gi, '')
                  .replace(
                    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
                    '',
                  )
                  .replace(/\s/g, '-');
              }),
              (t.getNextSafeSlug = function(e, t) {
                var n = e,
                  r = 0;
                if (this.seen.hasOwnProperty(n)) {
                  r = this.seen[e];
                  do {
                    n = e + '-' + ++r;
                  } while (this.seen.hasOwnProperty(n));
                }
                return t || ((this.seen[e] = r), (this.seen[n] = 0)), n;
              }),
              (t.slug = function(e, t) {
                void 0 === t && (t = {});
                var n = this.serialize(e);
                return this.getNextSafeSlug(n, t.dryrun);
              }),
              e
            );
          })(),
          z = (function() {
            function t(t) {
              (this.options = t || e.defaults),
                (this.options.renderer = this.options.renderer || new B()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new I()),
                (this.slugger = new M());
            }
            (t.parse = function(e, n) {
              return new t(n).parse(e);
            }),
              (t.parseInline = function(e, n) {
                return new t(n).parseInline(e);
              });
            var n = t.prototype;
            return (
              (n.parse = function(e, t) {
                void 0 === t && (t = !0);
                var n,
                  r,
                  a,
                  i,
                  o,
                  l,
                  u,
                  s,
                  c,
                  f,
                  d,
                  h,
                  m,
                  g,
                  y,
                  b,
                  v,
                  x,
                  E,
                  w = '',
                  D = e.length;
                for (n = 0; n < D; n++)
                  if (
                    ((f = e[n]),
                    !(
                      this.options.extensions &&
                      this.options.extensions.renderers &&
                      this.options.extensions.renderers[f.type]
                    ) ||
                      (!1 ===
                        (E = this.options.extensions.renderers[f.type].call(
                          { parser: this },
                          f,
                        )) &&
                        [
                          'space',
                          'hr',
                          'heading',
                          'code',
                          'table',
                          'blockquote',
                          'list',
                          'html',
                          'paragraph',
                          'text',
                        ].includes(f.type)))
                  )
                    switch (f.type) {
                      case 'space':
                        continue;
                      case 'hr':
                        w += this.renderer.hr();
                        continue;
                      case 'heading':
                        w += this.renderer.heading(
                          this.parseInline(f.tokens),
                          f.depth,
                          p(this.parseInline(f.tokens, this.textRenderer)),
                          this.slugger,
                        );
                        continue;
                      case 'code':
                        w += this.renderer.code(f.text, f.lang, f.escaped);
                        continue;
                      case 'table':
                        for (
                          s = '', u = '', i = f.header.length, r = 0;
                          r < i;
                          r++
                        )
                          u += this.renderer.tablecell(
                            this.parseInline(f.header[r].tokens),
                            { header: !0, align: f.align[r] },
                          );
                        for (
                          s += this.renderer.tablerow(u),
                            c = '',
                            i = f.rows.length,
                            r = 0;
                          r < i;
                          r++
                        ) {
                          for (
                            u = '', o = (l = f.rows[r]).length, a = 0;
                            a < o;
                            a++
                          )
                            u += this.renderer.tablecell(
                              this.parseInline(l[a].tokens),
                              { header: !1, align: f.align[a] },
                            );
                          c += this.renderer.tablerow(u);
                        }
                        w += this.renderer.table(s, c);
                        continue;
                      case 'blockquote':
                        (c = this.parse(f.tokens)),
                          (w += this.renderer.blockquote(c));
                        continue;
                      case 'list':
                        for (
                          d = f.ordered,
                            h = f.start,
                            m = f.loose,
                            i = f.items.length,
                            c = '',
                            r = 0;
                          r < i;
                          r++
                        )
                          (b = (y = f.items[r]).checked),
                            (v = y.task),
                            (g = ''),
                            y.task &&
                              ((x = this.renderer.checkbox(b)),
                              m
                                ? y.tokens.length > 0 &&
                                  'paragraph' === y.tokens[0].type
                                  ? ((y.tokens[0].text =
                                      x + ' ' + y.tokens[0].text),
                                    y.tokens[0].tokens &&
                                      y.tokens[0].tokens.length > 0 &&
                                      'text' === y.tokens[0].tokens[0].type &&
                                      (y.tokens[0].tokens[0].text =
                                        x + ' ' + y.tokens[0].tokens[0].text))
                                  : y.tokens.unshift({ type: 'text', text: x })
                                : (g += x)),
                            (g += this.parse(y.tokens, m)),
                            (c += this.renderer.listitem(g, v, b));
                        w += this.renderer.list(c, d, h);
                        continue;
                      case 'html':
                        w += this.renderer.html(f.text);
                        continue;
                      case 'paragraph':
                        w += this.renderer.paragraph(
                          this.parseInline(f.tokens),
                        );
                        continue;
                      case 'text':
                        for (
                          c = f.tokens ? this.parseInline(f.tokens) : f.text;
                          n + 1 < D && 'text' === e[n + 1].type;

                        )
                          c +=
                            '\n' +
                            ((f = e[++n]).tokens
                              ? this.parseInline(f.tokens)
                              : f.text);
                        w += t ? this.renderer.paragraph(c) : c;
                        continue;
                      default:
                        var k =
                          'Token with "' + f.type + '" type was not found.';
                        if (this.options.silent) return void console.error(k);
                        throw new Error(k);
                    }
                  else w += E || '';
                return w;
              }),
              (n.parseInline = function(e, t) {
                t = t || this.renderer;
                var n,
                  r,
                  a,
                  i = '',
                  o = e.length;
                for (n = 0; n < o; n++)
                  if (
                    ((r = e[n]),
                    !(
                      this.options.extensions &&
                      this.options.extensions.renderers &&
                      this.options.extensions.renderers[r.type]
                    ) ||
                      (!1 ===
                        (a = this.options.extensions.renderers[r.type].call(
                          { parser: this },
                          r,
                        )) &&
                        [
                          'escape',
                          'html',
                          'link',
                          'image',
                          'strong',
                          'em',
                          'codespan',
                          'br',
                          'del',
                          'text',
                        ].includes(r.type)))
                  )
                    switch (r.type) {
                      case 'escape':
                        i += t.text(r.text);
                        break;
                      case 'html':
                        i += t.html(r.text);
                        break;
                      case 'link':
                        i += t.link(
                          r.href,
                          r.title,
                          this.parseInline(r.tokens, t),
                        );
                        break;
                      case 'image':
                        i += t.image(r.href, r.title, r.text);
                        break;
                      case 'strong':
                        i += t.strong(this.parseInline(r.tokens, t));
                        break;
                      case 'em':
                        i += t.em(this.parseInline(r.tokens, t));
                        break;
                      case 'codespan':
                        i += t.codespan(r.text);
                        break;
                      case 'br':
                        i += t.br();
                        break;
                      case 'del':
                        i += t.del(this.parseInline(r.tokens, t));
                        break;
                      case 'text':
                        i += t.text(r.text);
                        break;
                      default:
                        var l =
                          'Token with "' + r.type + '" type was not found.';
                        if (this.options.silent) return void console.error(l);
                        throw new Error(l);
                    }
                  else i += a || '';
                return i;
              }),
              t
            );
          })();
        function L(e, t, n) {
          if (null == e)
            throw new Error('marked(): input parameter is undefined or null');
          if ('string' != typeof e)
            throw new Error(
              'marked(): input parameter is of type ' +
                Object.prototype.toString.call(e) +
                ', string expected',
            );
          if (
            ('function' == typeof t && ((n = t), (t = null)),
            A((t = k({}, L.defaults, t || {}))),
            n)
          ) {
            var r,
              a = t.highlight;
            try {
              r = R.lex(e, t);
            } catch (e) {
              return n(e);
            }
            var i = function(e) {
              var i;
              if (!e)
                try {
                  t.walkTokens && L.walkTokens(r, t.walkTokens),
                    (i = z.parse(r, t));
                } catch (t) {
                  e = t;
                }
              return (t.highlight = a), e ? n(e) : n(null, i);
            };
            if (!a || a.length < 3) return i();
            if ((delete t.highlight, !r.length)) return i();
            var o = 0;
            return (
              L.walkTokens(r, function(e) {
                'code' === e.type &&
                  (o++,
                  setTimeout(function() {
                    a(e.text, e.lang, function(t, n) {
                      if (t) return i(t);
                      null != n &&
                        n !== e.text &&
                        ((e.text = n), (e.escaped = !0)),
                        0 == --o && i();
                    });
                  }, 0));
              }),
              void (0 === o && i())
            );
          }
          try {
            var l = R.lex(e, t);
            return t.walkTokens && L.walkTokens(l, t.walkTokens), z.parse(l, t);
          } catch (e) {
            if (
              ((e.message +=
                '\nPlease report this to https://github.com/markedjs/marked.'),
              t.silent)
            )
              return (
                '<p>An error occurred:</p><pre>' +
                f(e.message + '', !0) +
                '</pre>'
              );
            throw e;
          }
        }
        (L.options = L.setOptions = function(t) {
          var n;
          return k(L.defaults, t), (n = L.defaults), (e.defaults = n), L;
        }),
          (L.getDefaults = a),
          (L.defaults = e.defaults),
          (L.use = function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            var r,
              a = k.apply(void 0, [{}].concat(t)),
              i = L.defaults.extensions || { renderers: {}, childTokens: {} };
            t.forEach(function(e) {
              if (
                (e.extensions &&
                  ((r = !0),
                  e.extensions.forEach(function(e) {
                    if (!e.name) throw new Error('extension name required');
                    if (e.renderer) {
                      var t = i.renderers ? i.renderers[e.name] : null;
                      i.renderers[e.name] = t
                        ? function() {
                            for (
                              var n = arguments.length, r = new Array(n), a = 0;
                              a < n;
                              a++
                            )
                              r[a] = arguments[a];
                            var i = e.renderer.apply(this, r);
                            return !1 === i && (i = t.apply(this, r)), i;
                          }
                        : e.renderer;
                    }
                    if (e.tokenizer) {
                      if (
                        !e.level ||
                        ('block' !== e.level && 'inline' !== e.level)
                      )
                        throw new Error(
                          "extension level must be 'block' or 'inline'",
                        );
                      i[e.level]
                        ? i[e.level].unshift(e.tokenizer)
                        : (i[e.level] = [e.tokenizer]),
                        e.start &&
                          ('block' === e.level
                            ? i.startBlock
                              ? i.startBlock.push(e.start)
                              : (i.startBlock = [e.start])
                            : 'inline' === e.level &&
                              (i.startInline
                                ? i.startInline.push(e.start)
                                : (i.startInline = [e.start])));
                    }
                    e.childTokens && (i.childTokens[e.name] = e.childTokens);
                  })),
                e.renderer &&
                  (function() {
                    var t = L.defaults.renderer || new B(),
                      n = function(n) {
                        var r = t[n];
                        t[n] = function() {
                          for (
                            var a = arguments.length, i = new Array(a), o = 0;
                            o < a;
                            o++
                          )
                            i[o] = arguments[o];
                          var l = e.renderer[n].apply(t, i);
                          return !1 === l && (l = r.apply(t, i)), l;
                        };
                      };
                    for (var r in e.renderer) n(r);
                    a.renderer = t;
                  })(),
                e.tokenizer &&
                  (function() {
                    var t = L.defaults.tokenizer || new N(),
                      n = function(n) {
                        var r = t[n];
                        t[n] = function() {
                          for (
                            var a = arguments.length, i = new Array(a), o = 0;
                            o < a;
                            o++
                          )
                            i[o] = arguments[o];
                          var l = e.tokenizer[n].apply(t, i);
                          return !1 === l && (l = r.apply(t, i)), l;
                        };
                      };
                    for (var r in e.tokenizer) n(r);
                    a.tokenizer = t;
                  })(),
                e.walkTokens)
              ) {
                var t = L.defaults.walkTokens;
                a.walkTokens = function(n) {
                  e.walkTokens.call(this, n), t && t.call(this, n);
                };
              }
              r && (a.extensions = i), L.setOptions(a);
            });
          }),
          (L.walkTokens = function(e, t) {
            for (
              var n,
                a = function() {
                  var e = n.value;
                  switch ((t.call(L, e), e.type)) {
                    case 'table':
                      for (var a, i = r(e.header); !(a = i()).done; ) {
                        var o = a.value;
                        L.walkTokens(o.tokens, t);
                      }
                      for (var l, u = r(e.rows); !(l = u()).done; )
                        for (var s, c = r(l.value); !(s = c()).done; ) {
                          var f = s.value;
                          L.walkTokens(f.tokens, t);
                        }
                      break;
                    case 'list':
                      L.walkTokens(e.items, t);
                      break;
                    default:
                      L.defaults.extensions &&
                      L.defaults.extensions.childTokens &&
                      L.defaults.extensions.childTokens[e.type]
                        ? L.defaults.extensions.childTokens[e.type].forEach(
                            function(n) {
                              L.walkTokens(e[n], t);
                            },
                          )
                        : e.tokens && L.walkTokens(e.tokens, t);
                  }
                },
                i = r(e);
              !(n = i()).done;

            )
              a();
          }),
          (L.parseInline = function(e, t) {
            if (null == e)
              throw new Error(
                'marked.parseInline(): input parameter is undefined or null',
              );
            if ('string' != typeof e)
              throw new Error(
                'marked.parseInline(): input parameter is of type ' +
                  Object.prototype.toString.call(e) +
                  ', string expected',
              );
            A((t = k({}, L.defaults, t || {})));
            try {
              var n = R.lexInline(e, t);
              return (
                t.walkTokens && L.walkTokens(n, t.walkTokens),
                z.parseInline(n, t)
              );
            } catch (e) {
              if (
                ((e.message +=
                  '\nPlease report this to https://github.com/markedjs/marked.'),
                t.silent)
              )
                return (
                  '<p>An error occurred:</p><pre>' +
                  f(e.message + '', !0) +
                  '</pre>'
                );
              throw e;
            }
          }),
          (L.Parser = z),
          (L.parser = z.parse),
          (L.Renderer = B),
          (L.TextRenderer = I),
          (L.Lexer = R),
          (L.lexer = R.lex),
          (L.Tokenizer = N),
          (L.Slugger = M),
          (L.parse = L);
        var U = L.options,
          $ = L.setOptions,
          H = L.use,
          V = L.walkTokens,
          W = L.parseInline,
          q = L,
          Y = z.parse,
          Q = R.lex;
        (e.Lexer = R),
          (e.Parser = z),
          (e.Renderer = B),
          (e.Slugger = M),
          (e.TextRenderer = I),
          (e.Tokenizer = N),
          (e.getDefaults = a),
          (e.lexer = Q),
          (e.marked = L),
          (e.options = U),
          (e.parse = q),
          (e.parseInline = W),
          (e.parser = Y),
          (e.setOptions = $),
          (e.use = H),
          (e.walkTokens = V),
          Object.defineProperty(e, '__esModule', { value: !0 });
      })(t);
    },
    58: function(e, t) {
      e.exports = function(e) {
        const t = { literal: 'true false null' },
          n = [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
          r = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
          a = {
            end: ',',
            endsWithParent: !0,
            excludeEnd: !0,
            contains: r,
            keywords: t,
          },
          i = {
            begin: /\{/,
            end: /\}/,
            contains: [
              {
                className: 'attr',
                begin: /"/,
                end: /"/,
                contains: [e.BACKSLASH_ESCAPE],
                illegal: '\\n',
              },
              e.inherit(a, { begin: /:/ }),
            ].concat(n),
            illegal: '\\S',
          },
          o = {
            begin: '\\[',
            end: '\\]',
            contains: [e.inherit(a)],
            illegal: '\\S',
          };
        return (
          r.push(i, o),
          n.forEach(function(e) {
            r.push(e);
          }),
          { name: 'JSON', contains: r, keywords: t, illegal: '\\S' }
        );
      };
    },
    59: function(e, t) {
      e.exports = function(e) {
        var t = 'true false yes no null',
          n = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
          r = {
            className: 'string',
            relevance: 0,
            variants: [
              { begin: /'/, end: /'/ },
              { begin: /"/, end: /"/ },
              { begin: /\S+/ },
            ],
            contains: [
              e.BACKSLASH_ESCAPE,
              {
                className: 'template-variable',
                variants: [
                  { begin: /\{\{/, end: /\}\}/ },
                  { begin: /%\{/, end: /\}/ },
                ],
              },
            ],
          },
          a = e.inherit(r, {
            variants: [
              { begin: /'/, end: /'/ },
              { begin: /"/, end: /"/ },
              { begin: /[^\s,{}[\]]+/ },
            ],
          }),
          i = {
            className: 'number',
            begin:
              '\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b',
          },
          o = {
            end: ',',
            endsWithParent: !0,
            excludeEnd: !0,
            keywords: t,
            relevance: 0,
          },
          l = {
            begin: /\{/,
            end: /\}/,
            contains: [o],
            illegal: '\\n',
            relevance: 0,
          },
          u = {
            begin: '\\[',
            end: '\\]',
            contains: [o],
            illegal: '\\n',
            relevance: 0,
          },
          s = [
            {
              className: 'attr',
              variants: [
                { begin: '\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
                { begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' },
                { begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)" },
              ],
            },
            { className: 'meta', begin: '^---\\s*$', relevance: 10 },
            {
              className: 'string',
              begin:
                '[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*',
            },
            {
              begin: '<%[%=-]?',
              end: '[%-]?%>',
              subLanguage: 'ruby',
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0,
            },
            { className: 'type', begin: '!\\w+!' + n },
            { className: 'type', begin: '!<' + n + '>' },
            { className: 'type', begin: '!' + n },
            { className: 'type', begin: '!!' + n },
            { className: 'meta', begin: '&' + e.UNDERSCORE_IDENT_RE + '$' },
            { className: 'meta', begin: '\\*' + e.UNDERSCORE_IDENT_RE + '$' },
            { className: 'bullet', begin: '-(?=[ ]|$)', relevance: 0 },
            e.HASH_COMMENT_MODE,
            { beginKeywords: t, keywords: { literal: t } },
            i,
            { className: 'number', begin: e.C_NUMBER_RE + '\\b', relevance: 0 },
            l,
            u,
            r,
          ],
          c = [...s];
        return (
          c.pop(),
          c.push(a),
          (o.contains = c),
          { name: 'YAML', case_insensitive: !0, aliases: ['yml'], contains: s }
        );
      };
    },
    6: function(e, t, n) {
      const { getMapValueByKey: r } = n(2),
        a = {
          hasDescription() {
            return !!this._json.description;
          },
          description() {
            return r(this._json, 'description');
          },
        };
      e.exports = a;
    },
    60: function(e, t) {
      function n(...e) {
        return e
          .map(e => {
            return (t = e) ? ('string' == typeof t ? t : t.source) : null;
            var t;
          })
          .join('');
      }
      e.exports = function(e) {
        const t = {},
          r = {
            begin: /\$\{/,
            end: /\}/,
            contains: ['self', { begin: /:-/, contains: [t] }],
          };
        Object.assign(t, {
          className: 'variable',
          variants: [
            { begin: n(/\$[\w\d#@][\w\d_]*/, '(?![\\w\\d])(?![$])') },
            r,
          ],
        });
        const a = {
            className: 'subst',
            begin: /\$\(/,
            end: /\)/,
            contains: [e.BACKSLASH_ESCAPE],
          },
          i = {
            begin: /<<-?\s*(?=\w+)/,
            starts: {
              contains: [
                e.END_SAME_AS_BEGIN({
                  begin: /(\w+)/,
                  end: /(\w+)/,
                  className: 'string',
                }),
              ],
            },
          },
          o = {
            className: 'string',
            begin: /"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, t, a],
          };
        a.contains.push(o);
        const l = {
            begin: /\$\(\(/,
            end: /\)\)/,
            contains: [
              { begin: /\d+#[0-9a-f]+/, className: 'number' },
              e.NUMBER_MODE,
              t,
            ],
          },
          u = e.SHEBANG({
            binary: `(${[
              'fish',
              'bash',
              'zsh',
              'sh',
              'csh',
              'ksh',
              'tcsh',
              'dash',
              'scsh',
            ].join('|')})`,
            relevance: 10,
          }),
          s = {
            className: 'function',
            begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            returnBegin: !0,
            contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
            relevance: 0,
          };
        return {
          name: 'Bash',
          aliases: ['sh', 'zsh'],
          keywords: {
            $pattern: /\b[a-z._-]+\b/,
            keyword:
              'if then else elif fi for while in do done case esac function',
            literal: 'true false',
            built_in:
              'break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp',
          },
          contains: [
            u,
            e.SHEBANG(),
            s,
            l,
            e.HASH_COMMENT_MODE,
            i,
            o,
            { className: '', begin: /\\"/ },
            { className: 'string', begin: /'/, end: /'/ },
            t,
          ],
        };
      };
    },
    61: function(e, t, n) {
      'use strict';
      var r = n(89);
      function a(e, t, n) {
        if (3 === arguments.length) return a.set(e, t, n);
        if (2 === arguments.length) return a.get(e, t);
        var r = a.bind(a, e);
        for (var i in a) a.hasOwnProperty(i) && (r[i] = a[i].bind(r, e));
        return r;
      }
      (e.exports = a),
        (a.get = function(e, t) {
          for (
            var n = Array.isArray(t) ? t : a.parse(t), r = 0;
            r < n.length;
            ++r
          ) {
            var i = n[r];
            if ('object' != typeof e || !(i in e))
              throw new Error('Invalid reference token: ' + i);
            e = e[i];
          }
          return e;
        }),
        (a.set = function(e, t, n) {
          var r = Array.isArray(t) ? t : a.parse(t),
            i = r[0];
          if (0 === r.length) throw Error('Can not set the root object');
          for (var o = 0; o < r.length - 1; ++o) {
            var l = r[o];
            'string' != typeof l && 'number' != typeof l && (l = String(l)),
              '__proto__' !== l &&
                'constructor' !== l &&
                'prototype' !== l &&
                ('-' === l && Array.isArray(e) && (l = e.length),
                (i = r[o + 1]),
                l in e || (i.match(/^(\d+|-)$/) ? (e[l] = []) : (e[l] = {})),
                (e = e[l]));
          }
          return (
            '-' === i && Array.isArray(e) && (i = e.length), (e[i] = n), this
          );
        }),
        (a.remove = function(e, t) {
          var n = Array.isArray(t) ? t : a.parse(t),
            r = n[n.length - 1];
          if (void 0 === r)
            throw new Error('Invalid JSON pointer for remove: "' + t + '"');
          var i = a.get(e, n.slice(0, -1));
          if (Array.isArray(i)) {
            var o = +r;
            if ('' === r && isNaN(o))
              throw new Error('Invalid array index: "' + r + '"');
            Array.prototype.splice.call(i, o, 1);
          } else delete i[r];
        }),
        (a.dict = function(e, t) {
          var n = {};
          return (
            a.walk(
              e,
              function(e, t) {
                n[t] = e;
              },
              t,
            ),
            n
          );
        }),
        (a.walk = function(e, t, n) {
          var i = [];
          (n =
            n ||
            function(e) {
              var t = Object.prototype.toString.call(e);
              return '[object Object]' === t || '[object Array]' === t;
            }),
            (function e(o) {
              r(o, function(r, o) {
                i.push(String(o)), n(r) ? e(r) : t(r, a.compile(i)), i.pop();
              });
            })(e);
        }),
        (a.has = function(e, t) {
          try {
            a.get(e, t);
          } catch (e) {
            return !1;
          }
          return !0;
        }),
        (a.escape = function(e) {
          return e
            .toString()
            .replace(/~/g, '~0')
            .replace(/\//g, '~1');
        }),
        (a.unescape = function(e) {
          return e.replace(/~1/g, '/').replace(/~0/g, '~');
        }),
        (a.parse = function(e) {
          if ('' === e) return [];
          if ('/' !== e.charAt(0))
            throw new Error('Invalid JSON pointer: ' + e);
          return e
            .substring(1)
            .split(/\//)
            .map(a.unescape);
        }),
        (a.compile = function(e) {
          return 0 === e.length ? '' : '/' + e.map(a.escape).join('/');
        });
    },
    63: function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    7: function(e, t, n) {
      'use strict';
      function r(e) {
        return void 0 !== e.url;
      }
      var a;
      n.d(t, 'b', function() {
        return r;
      }),
        n.d(t, 'a', function() {
          return a;
        }),
        (function(e) {
          (e.PUBLISH = 'publish'), (e.SUBSCRIBE = 'subscribe');
        })(a || (a = {}));
    },
    70: function(e, t, n) {
      'use strict';
      /** @license React v16.14.0
       * react.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var r = n(37),
        a = 'function' == typeof Symbol && Symbol.for,
        i = a ? Symbol.for('react.element') : 60103,
        o = a ? Symbol.for('react.portal') : 60106,
        l = a ? Symbol.for('react.fragment') : 60107,
        u = a ? Symbol.for('react.strict_mode') : 60108,
        s = a ? Symbol.for('react.profiler') : 60114,
        c = a ? Symbol.for('react.provider') : 60109,
        f = a ? Symbol.for('react.context') : 60110,
        d = a ? Symbol.for('react.forward_ref') : 60112,
        p = a ? Symbol.for('react.suspense') : 60113,
        h = a ? Symbol.for('react.memo') : 60115,
        m = a ? Symbol.for('react.lazy') : 60116,
        g = 'function' == typeof Symbol && Symbol.iterator;
      function y(e) {
        for (
          var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
            n = 1;
          n < arguments.length;
          n++
        )
          t += '&args[]=' + encodeURIComponent(arguments[n]);
        return (
          'Minified React error #' +
          e +
          '; visit ' +
          t +
          ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
        );
      }
      var b = {
          isMounted: function() {
            return !1;
          },
          enqueueForceUpdate: function() {},
          enqueueReplaceState: function() {},
          enqueueSetState: function() {},
        },
        v = {};
      function x(e, t, n) {
        (this.props = e),
          (this.context = t),
          (this.refs = v),
          (this.updater = n || b);
      }
      function E() {}
      function w(e, t, n) {
        (this.props = e),
          (this.context = t),
          (this.refs = v),
          (this.updater = n || b);
      }
      (x.prototype.isReactComponent = {}),
        (x.prototype.setState = function(e, t) {
          if ('object' != typeof e && 'function' != typeof e && null != e)
            throw Error(y(85));
          this.updater.enqueueSetState(this, e, t, 'setState');
        }),
        (x.prototype.forceUpdate = function(e) {
          this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
        }),
        (E.prototype = x.prototype);
      var D = (w.prototype = new E());
      (D.constructor = w), r(D, x.prototype), (D.isPureReactComponent = !0);
      var k = { current: null },
        C = Object.prototype.hasOwnProperty,
        _ = { key: !0, ref: !0, __self: !0, __source: !0 };
      function A(e, t, n) {
        var r,
          a = {},
          o = null,
          l = null;
        if (null != t)
          for (r in (void 0 !== t.ref && (l = t.ref),
          void 0 !== t.key && (o = '' + t.key),
          t))
            C.call(t, r) && !_.hasOwnProperty(r) && (a[r] = t[r]);
        var u = arguments.length - 2;
        if (1 === u) a.children = n;
        else if (1 < u) {
          for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
          a.children = s;
        }
        if (e && e.defaultProps)
          for (r in (u = e.defaultProps)) void 0 === a[r] && (a[r] = u[r]);
        return {
          $$typeof: i,
          type: e,
          key: o,
          ref: l,
          props: a,
          _owner: k.current,
        };
      }
      function T(e) {
        return 'object' == typeof e && null !== e && e.$$typeof === i;
      }
      var S = /\/+/g,
        N = [];
      function O(e, t, n, r) {
        if (N.length) {
          var a = N.pop();
          return (
            (a.result = e),
            (a.keyPrefix = t),
            (a.func = n),
            (a.context = r),
            (a.count = 0),
            a
          );
        }
        return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
      }
      function F(e) {
        (e.result = null),
          (e.keyPrefix = null),
          (e.func = null),
          (e.context = null),
          (e.count = 0),
          10 > N.length && N.push(e);
      }
      function j(e, t, n) {
        return null == e
          ? 0
          : (function e(t, n, r, a) {
              var l = typeof t;
              ('undefined' !== l && 'boolean' !== l) || (t = null);
              var u = !1;
              if (null === t) u = !0;
              else
                switch (l) {
                  case 'string':
                  case 'number':
                    u = !0;
                    break;
                  case 'object':
                    switch (t.$$typeof) {
                      case i:
                      case o:
                        u = !0;
                    }
                }
              if (u) return r(a, t, '' === n ? '.' + P(t, 0) : n), 1;
              if (((u = 0), (n = '' === n ? '.' : n + ':'), Array.isArray(t)))
                for (var s = 0; s < t.length; s++) {
                  var c = n + P((l = t[s]), s);
                  u += e(l, c, r, a);
                }
              else if (
                (null === t || 'object' != typeof t
                  ? (c = null)
                  : (c =
                      'function' == typeof (c = (g && t[g]) || t['@@iterator'])
                        ? c
                        : null),
                'function' == typeof c)
              )
                for (t = c.call(t), s = 0; !(l = t.next()).done; )
                  u += e((l = l.value), (c = n + P(l, s++)), r, a);
              else if ('object' === l)
                throw ((r = '' + t),
                Error(
                  y(
                    31,
                    '[object Object]' === r
                      ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                      : r,
                    '',
                  ),
                ));
              return u;
            })(e, '', t, n);
      }
      function P(e, t) {
        return 'object' == typeof e && null !== e && null != e.key
          ? (function(e) {
              var t = { '=': '=0', ':': '=2' };
              return (
                '$' +
                ('' + e).replace(/[=:]/g, function(e) {
                  return t[e];
                })
              );
            })(e.key)
          : t.toString(36);
      }
      function R(e, t) {
        e.func.call(e.context, t, e.count++);
      }
      function B(e, t, n) {
        var r = e.result,
          a = e.keyPrefix;
        (e = e.func.call(e.context, t, e.count++)),
          Array.isArray(e)
            ? I(e, r, n, function(e) {
                return e;
              })
            : null != e &&
              (T(e) &&
                (e = (function(e, t) {
                  return {
                    $$typeof: i,
                    type: e.type,
                    key: t,
                    ref: e.ref,
                    props: e.props,
                    _owner: e._owner,
                  };
                })(
                  e,
                  a +
                    (!e.key || (t && t.key === e.key)
                      ? ''
                      : ('' + e.key).replace(S, '$&/') + '/') +
                    n,
                )),
              r.push(e));
      }
      function I(e, t, n, r, a) {
        var i = '';
        null != n && (i = ('' + n).replace(S, '$&/') + '/'),
          j(e, B, (t = O(t, i, r, a))),
          F(t);
      }
      var M = { current: null };
      function z() {
        var e = M.current;
        if (null === e) throw Error(y(321));
        return e;
      }
      var L = {
        ReactCurrentDispatcher: M,
        ReactCurrentBatchConfig: { suspense: null },
        ReactCurrentOwner: k,
        IsSomeRendererActing: { current: !1 },
        assign: r,
      };
      (t.Children = {
        map: function(e, t, n) {
          if (null == e) return e;
          var r = [];
          return I(e, r, null, t, n), r;
        },
        forEach: function(e, t, n) {
          if (null == e) return e;
          j(e, R, (t = O(null, null, t, n))), F(t);
        },
        count: function(e) {
          return j(
            e,
            function() {
              return null;
            },
            null,
          );
        },
        toArray: function(e) {
          var t = [];
          return (
            I(e, t, null, function(e) {
              return e;
            }),
            t
          );
        },
        only: function(e) {
          if (!T(e)) throw Error(y(143));
          return e;
        },
      }),
        (t.Component = x),
        (t.Fragment = l),
        (t.Profiler = s),
        (t.PureComponent = w),
        (t.StrictMode = u),
        (t.Suspense = p),
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L),
        (t.cloneElement = function(e, t, n) {
          if (null == e) throw Error(y(267, e));
          var a = r({}, e.props),
            o = e.key,
            l = e.ref,
            u = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((l = t.ref), (u = k.current)),
              void 0 !== t.key && (o = '' + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (c in t)
              C.call(t, c) &&
                !_.hasOwnProperty(c) &&
                (a[c] = void 0 === t[c] && void 0 !== s ? s[c] : t[c]);
          }
          var c = arguments.length - 2;
          if (1 === c) a.children = n;
          else if (1 < c) {
            s = Array(c);
            for (var f = 0; f < c; f++) s[f] = arguments[f + 2];
            a.children = s;
          }
          return {
            $$typeof: i,
            type: e.type,
            key: o,
            ref: l,
            props: a,
            _owner: u,
          };
        }),
        (t.createContext = function(e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: f,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: c, _context: e }),
            (e.Consumer = e)
          );
        }),
        (t.createElement = A),
        (t.createFactory = function(e) {
          var t = A.bind(null, e);
          return (t.type = e), t;
        }),
        (t.createRef = function() {
          return { current: null };
        }),
        (t.forwardRef = function(e) {
          return { $$typeof: d, render: e };
        }),
        (t.isValidElement = T),
        (t.lazy = function(e) {
          return { $$typeof: m, _ctor: e, _status: -1, _result: null };
        }),
        (t.memo = function(e, t) {
          return { $$typeof: h, type: e, compare: void 0 === t ? null : t };
        }),
        (t.useCallback = function(e, t) {
          return z().useCallback(e, t);
        }),
        (t.useContext = function(e, t) {
          return z().useContext(e, t);
        }),
        (t.useDebugValue = function() {}),
        (t.useEffect = function(e, t) {
          return z().useEffect(e, t);
        }),
        (t.useImperativeHandle = function(e, t, n) {
          return z().useImperativeHandle(e, t, n);
        }),
        (t.useLayoutEffect = function(e, t) {
          return z().useLayoutEffect(e, t);
        }),
        (t.useMemo = function(e, t) {
          return z().useMemo(e, t);
        }),
        (t.useReducer = function(e, t, n) {
          return z().useReducer(e, t, n);
        }),
        (t.useRef = function(e) {
          return z().useRef(e);
        }),
        (t.useState = function(e) {
          return z().useState(e);
        }),
        (t.version = '16.14.0');
    },
    71: function(e, t, n) {
      'use strict';
      /** @license React v16.14.0
       * react-dom.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var r = n(0),
        a = n(37),
        i = n(72);
      function o(e) {
        for (
          var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
            n = 1;
          n < arguments.length;
          n++
        )
          t += '&args[]=' + encodeURIComponent(arguments[n]);
        return (
          'Minified React error #' +
          e +
          '; visit ' +
          t +
          ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
        );
      }
      if (!r) throw Error(o(227));
      function l(e, t, n, r, a, i, o, l, u) {
        var s = Array.prototype.slice.call(arguments, 3);
        try {
          t.apply(n, s);
        } catch (e) {
          this.onError(e);
        }
      }
      var u = !1,
        s = null,
        c = !1,
        f = null,
        d = {
          onError: function(e) {
            (u = !0), (s = e);
          },
        };
      function p(e, t, n, r, a, i, o, c, f) {
        (u = !1), (s = null), l.apply(d, arguments);
      }
      var h = null,
        m = null,
        g = null;
      function y(e, t, n) {
        var r = e.type || 'unknown-event';
        (e.currentTarget = g(n)),
          (function(e, t, n, r, a, i, l, d, h) {
            if ((p.apply(this, arguments), u)) {
              if (!u) throw Error(o(198));
              var m = s;
              (u = !1), (s = null), c || ((c = !0), (f = m));
            }
          })(r, t, void 0, e),
          (e.currentTarget = null);
      }
      var b = null,
        v = {};
      function x() {
        if (b)
          for (var e in v) {
            var t = v[e],
              n = b.indexOf(e);
            if (!(-1 < n)) throw Error(o(96, e));
            if (!w[n]) {
              if (!t.extractEvents) throw Error(o(97, e));
              for (var r in ((w[n] = t), (n = t.eventTypes))) {
                var a = void 0,
                  i = n[r],
                  l = t,
                  u = r;
                if (D.hasOwnProperty(u)) throw Error(o(99, u));
                D[u] = i;
                var s = i.phasedRegistrationNames;
                if (s) {
                  for (a in s) s.hasOwnProperty(a) && E(s[a], l, u);
                  a = !0;
                } else
                  i.registrationName
                    ? (E(i.registrationName, l, u), (a = !0))
                    : (a = !1);
                if (!a) throw Error(o(98, r, e));
              }
            }
          }
      }
      function E(e, t, n) {
        if (k[e]) throw Error(o(100, e));
        (k[e] = t), (C[e] = t.eventTypes[n].dependencies);
      }
      var w = [],
        D = {},
        k = {},
        C = {};
      function _(e) {
        var t,
          n = !1;
        for (t in e)
          if (e.hasOwnProperty(t)) {
            var r = e[t];
            if (!v.hasOwnProperty(t) || v[t] !== r) {
              if (v[t]) throw Error(o(102, t));
              (v[t] = r), (n = !0);
            }
          }
        n && x();
      }
      var A = !(
          'undefined' == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
        ),
        T = null,
        S = null,
        N = null;
      function O(e) {
        if ((e = m(e))) {
          if ('function' != typeof T) throw Error(o(280));
          var t = e.stateNode;
          t && ((t = h(t)), T(e.stateNode, e.type, t));
        }
      }
      function F(e) {
        S ? (N ? N.push(e) : (N = [e])) : (S = e);
      }
      function j() {
        if (S) {
          var e = S,
            t = N;
          if (((N = S = null), O(e), t)) for (e = 0; e < t.length; e++) O(t[e]);
        }
      }
      function P(e, t) {
        return e(t);
      }
      function R(e, t, n, r, a) {
        return e(t, n, r, a);
      }
      function B() {}
      var I = P,
        M = !1,
        z = !1;
      function L() {
        (null === S && null === N) || (B(), j());
      }
      function U(e, t, n) {
        if (z) return e(t, n);
        z = !0;
        try {
          return I(e, t, n);
        } finally {
          (z = !1), L();
        }
      }
      var $ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
        H = Object.prototype.hasOwnProperty,
        V = {},
        W = {};
      function q(e, t, n, r, a, i) {
        (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
          (this.attributeName = r),
          (this.attributeNamespace = a),
          (this.mustUseProperty = n),
          (this.propertyName = e),
          (this.type = t),
          (this.sanitizeURL = i);
      }
      var Y = {};
      'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
        .split(' ')
        .forEach(function(e) {
          Y[e] = new q(e, 0, !1, e, null, !1);
        }),
        [
          ['acceptCharset', 'accept-charset'],
          ['className', 'class'],
          ['htmlFor', 'for'],
          ['httpEquiv', 'http-equiv'],
        ].forEach(function(e) {
          var t = e[0];
          Y[t] = new q(t, 1, !1, e[1], null, !1);
        }),
        ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
          function(e) {
            Y[e] = new q(e, 2, !1, e.toLowerCase(), null, !1);
          },
        ),
        [
          'autoReverse',
          'externalResourcesRequired',
          'focusable',
          'preserveAlpha',
        ].forEach(function(e) {
          Y[e] = new q(e, 2, !1, e, null, !1);
        }),
        'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
          .split(' ')
          .forEach(function(e) {
            Y[e] = new q(e, 3, !1, e.toLowerCase(), null, !1);
          }),
        ['checked', 'multiple', 'muted', 'selected'].forEach(function(e) {
          Y[e] = new q(e, 3, !0, e, null, !1);
        }),
        ['capture', 'download'].forEach(function(e) {
          Y[e] = new q(e, 4, !1, e, null, !1);
        }),
        ['cols', 'rows', 'size', 'span'].forEach(function(e) {
          Y[e] = new q(e, 6, !1, e, null, !1);
        }),
        ['rowSpan', 'start'].forEach(function(e) {
          Y[e] = new q(e, 5, !1, e.toLowerCase(), null, !1);
        });
      var Q = /[\-:]([a-z])/g;
      function K(e) {
        return e[1].toUpperCase();
      }
      'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
        .split(' ')
        .forEach(function(e) {
          var t = e.replace(Q, K);
          Y[t] = new q(t, 1, !1, e, null, !1);
        }),
        'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
          .split(' ')
          .forEach(function(e) {
            var t = e.replace(Q, K);
            Y[t] = new q(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1);
          }),
        ['xml:base', 'xml:lang', 'xml:space'].forEach(function(e) {
          var t = e.replace(Q, K);
          Y[t] = new q(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1);
        }),
        ['tabIndex', 'crossOrigin'].forEach(function(e) {
          Y[e] = new q(e, 1, !1, e.toLowerCase(), null, !1);
        }),
        (Y.xlinkHref = new q(
          'xlinkHref',
          1,
          !1,
          'xlink:href',
          'http://www.w3.org/1999/xlink',
          !0,
        )),
        ['src', 'href', 'action', 'formAction'].forEach(function(e) {
          Y[e] = new q(e, 1, !1, e.toLowerCase(), null, !0);
        });
      var G = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function Z(e, t, n, r) {
        var a = Y.hasOwnProperty(t) ? Y[t] : null;
        (null !== a
          ? 0 === a.type
          : !r &&
            2 < t.length &&
              ('o' === t[0] || 'O' === t[0]) &&
              ('n' === t[1] || 'N' === t[1])) ||
          ((function(e, t, n, r) {
            if (
              null == t ||
              (function(e, t, n, r) {
                if (null !== n && 0 === n.type) return !1;
                switch (typeof t) {
                  case 'function':
                  case 'symbol':
                    return !0;
                  case 'boolean':
                    return (
                      !r &&
                      (null !== n
                        ? !n.acceptsBooleans
                        : 'data-' !== (e = e.toLowerCase().slice(0, 5)) &&
                          'aria-' !== e)
                    );
                  default:
                    return !1;
                }
              })(e, t, n, r)
            )
              return !0;
            if (r) return !1;
            if (null !== n)
              switch (n.type) {
                case 3:
                  return !t;
                case 4:
                  return !1 === t;
                case 5:
                  return isNaN(t);
                case 6:
                  return isNaN(t) || 1 > t;
              }
            return !1;
          })(t, n, a, r) && (n = null),
          r || null === a
            ? (function(e) {
                return (
                  !!H.call(W, e) ||
                  (!H.call(V, e) &&
                    ($.test(e) ? (W[e] = !0) : ((V[e] = !0), !1)))
                );
              })(t) &&
              (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
            : a.mustUseProperty
            ? (e[a.propertyName] = null === n ? 3 !== a.type && '' : n)
            : ((t = a.attributeName),
              (r = a.attributeNamespace),
              null === n
                ? e.removeAttribute(t)
                : ((n =
                    3 === (a = a.type) || (4 === a && !0 === n) ? '' : '' + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
      }
      G.hasOwnProperty('ReactCurrentDispatcher') ||
        (G.ReactCurrentDispatcher = { current: null }),
        G.hasOwnProperty('ReactCurrentBatchConfig') ||
          (G.ReactCurrentBatchConfig = { suspense: null });
      var X = /^(.*)[\\\/]/,
        J = 'function' == typeof Symbol && Symbol.for,
        ee = J ? Symbol.for('react.element') : 60103,
        te = J ? Symbol.for('react.portal') : 60106,
        ne = J ? Symbol.for('react.fragment') : 60107,
        re = J ? Symbol.for('react.strict_mode') : 60108,
        ae = J ? Symbol.for('react.profiler') : 60114,
        ie = J ? Symbol.for('react.provider') : 60109,
        oe = J ? Symbol.for('react.context') : 60110,
        le = J ? Symbol.for('react.concurrent_mode') : 60111,
        ue = J ? Symbol.for('react.forward_ref') : 60112,
        se = J ? Symbol.for('react.suspense') : 60113,
        ce = J ? Symbol.for('react.suspense_list') : 60120,
        fe = J ? Symbol.for('react.memo') : 60115,
        de = J ? Symbol.for('react.lazy') : 60116,
        pe = J ? Symbol.for('react.block') : 60121,
        he = 'function' == typeof Symbol && Symbol.iterator;
      function me(e) {
        return null === e || 'object' != typeof e
          ? null
          : 'function' == typeof (e = (he && e[he]) || e['@@iterator'])
          ? e
          : null;
      }
      function ge(e) {
        if (null == e) return null;
        if ('function' == typeof e) return e.displayName || e.name || null;
        if ('string' == typeof e) return e;
        switch (e) {
          case ne:
            return 'Fragment';
          case te:
            return 'Portal';
          case ae:
            return 'Profiler';
          case re:
            return 'StrictMode';
          case se:
            return 'Suspense';
          case ce:
            return 'SuspenseList';
        }
        if ('object' == typeof e)
          switch (e.$$typeof) {
            case oe:
              return 'Context.Consumer';
            case ie:
              return 'Context.Provider';
            case ue:
              var t = e.render;
              return (
                (t = t.displayName || t.name || ''),
                e.displayName ||
                  ('' !== t ? 'ForwardRef(' + t + ')' : 'ForwardRef')
              );
            case fe:
              return ge(e.type);
            case pe:
              return ge(e.render);
            case de:
              if ((e = 1 === e._status ? e._result : null)) return ge(e);
          }
        return null;
      }
      function ye(e) {
        var t = '';
        do {
          e: switch (e.tag) {
            case 3:
            case 4:
            case 6:
            case 7:
            case 10:
            case 9:
              var n = '';
              break e;
            default:
              var r = e._debugOwner,
                a = e._debugSource,
                i = ge(e.type);
              (n = null),
                r && (n = ge(r.type)),
                (r = i),
                (i = ''),
                a
                  ? (i =
                      ' (at ' +
                      a.fileName.replace(X, '') +
                      ':' +
                      a.lineNumber +
                      ')')
                  : n && (i = ' (created by ' + n + ')'),
                (n = '\n    in ' + (r || 'Unknown') + i);
          }
          (t += n), (e = e.return);
        } while (e);
        return t;
      }
      function be(e) {
        switch (typeof e) {
          case 'boolean':
          case 'number':
          case 'object':
          case 'string':
          case 'undefined':
            return e;
          default:
            return '';
        }
      }
      function ve(e) {
        var t = e.type;
        return (
          (e = e.nodeName) &&
          'input' === e.toLowerCase() &&
          ('checkbox' === t || 'radio' === t)
        );
      }
      function xe(e) {
        e._valueTracker ||
          (e._valueTracker = (function(e) {
            var t = ve(e) ? 'checked' : 'value',
              n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
              r = '' + e[t];
            if (
              !e.hasOwnProperty(t) &&
              void 0 !== n &&
              'function' == typeof n.get &&
              'function' == typeof n.set
            ) {
              var a = n.get,
                i = n.set;
              return (
                Object.defineProperty(e, t, {
                  configurable: !0,
                  get: function() {
                    return a.call(this);
                  },
                  set: function(e) {
                    (r = '' + e), i.call(this, e);
                  },
                }),
                Object.defineProperty(e, t, { enumerable: n.enumerable }),
                {
                  getValue: function() {
                    return r;
                  },
                  setValue: function(e) {
                    r = '' + e;
                  },
                  stopTracking: function() {
                    (e._valueTracker = null), delete e[t];
                  },
                }
              );
            }
          })(e));
      }
      function Ee(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var n = t.getValue(),
          r = '';
        return (
          e && (r = ve(e) ? (e.checked ? 'true' : 'false') : e.value),
          (e = r) !== n && (t.setValue(e), !0)
        );
      }
      function we(e, t) {
        var n = t.checked;
        return a({}, t, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: void 0,
          checked: null != n ? n : e._wrapperState.initialChecked,
        });
      }
      function De(e, t) {
        var n = null == t.defaultValue ? '' : t.defaultValue,
          r = null != t.checked ? t.checked : t.defaultChecked;
        (n = be(null != t.value ? t.value : n)),
          (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
              'checkbox' === t.type || 'radio' === t.type
                ? null != t.checked
                : null != t.value,
          });
      }
      function ke(e, t) {
        null != (t = t.checked) && Z(e, 'checked', t, !1);
      }
      function Ce(e, t) {
        ke(e, t);
        var n = be(t.value),
          r = t.type;
        if (null != n)
          'number' === r
            ? ((0 === n && '' === e.value) || e.value != n) &&
              (e.value = '' + n)
            : e.value !== '' + n && (e.value = '' + n);
        else if ('submit' === r || 'reset' === r)
          return void e.removeAttribute('value');
        t.hasOwnProperty('value')
          ? Ae(e, t.type, n)
          : t.hasOwnProperty('defaultValue') &&
            Ae(e, t.type, be(t.defaultValue)),
          null == t.checked &&
            null != t.defaultChecked &&
            (e.defaultChecked = !!t.defaultChecked);
      }
      function _e(e, t, n) {
        if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
          var r = t.type;
          if (
            !(
              ('submit' !== r && 'reset' !== r) ||
              (void 0 !== t.value && null !== t.value)
            )
          )
            return;
          (t = '' + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
        }
        '' !== (n = e.name) && (e.name = ''),
          (e.defaultChecked = !!e._wrapperState.initialChecked),
          '' !== n && (e.name = n);
      }
      function Ae(e, t, n) {
        ('number' === t && e.ownerDocument.activeElement === e) ||
          (null == n
            ? (e.defaultValue = '' + e._wrapperState.initialValue)
            : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
      }
      function Te(e, t) {
        return (
          (e = a({ children: void 0 }, t)),
          (t = (function(e) {
            var t = '';
            return (
              r.Children.forEach(e, function(e) {
                null != e && (t += e);
              }),
              t
            );
          })(t.children)) && (e.children = t),
          e
        );
      }
      function Se(e, t, n, r) {
        if (((e = e.options), t)) {
          t = {};
          for (var a = 0; a < n.length; a++) t['$' + n[a]] = !0;
          for (n = 0; n < e.length; n++)
            (a = t.hasOwnProperty('$' + e[n].value)),
              e[n].selected !== a && (e[n].selected = a),
              a && r && (e[n].defaultSelected = !0);
        } else {
          for (n = '' + be(n), t = null, a = 0; a < e.length; a++) {
            if (e[a].value === n)
              return (
                (e[a].selected = !0), void (r && (e[a].defaultSelected = !0))
              );
            null !== t || e[a].disabled || (t = e[a]);
          }
          null !== t && (t.selected = !0);
        }
      }
      function Ne(e, t) {
        if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
        return a({}, t, {
          value: void 0,
          defaultValue: void 0,
          children: '' + e._wrapperState.initialValue,
        });
      }
      function Oe(e, t) {
        var n = t.value;
        if (null == n) {
          if (((n = t.children), (t = t.defaultValue), null != n)) {
            if (null != t) throw Error(o(92));
            if (Array.isArray(n)) {
              if (!(1 >= n.length)) throw Error(o(93));
              n = n[0];
            }
            t = n;
          }
          null == t && (t = ''), (n = t);
        }
        e._wrapperState = { initialValue: be(n) };
      }
      function Fe(e, t) {
        var n = be(t.value),
          r = be(t.defaultValue);
        null != n &&
          ((n = '' + n) !== e.value && (e.value = n),
          null == t.defaultValue &&
            e.defaultValue !== n &&
            (e.defaultValue = n)),
          null != r && (e.defaultValue = '' + r);
      }
      function je(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue &&
          '' !== t &&
          null !== t &&
          (e.value = t);
      }
      var Pe = 'http://www.w3.org/1999/xhtml',
        Re = 'http://www.w3.org/2000/svg';
      function Be(e) {
        switch (e) {
          case 'svg':
            return 'http://www.w3.org/2000/svg';
          case 'math':
            return 'http://www.w3.org/1998/Math/MathML';
          default:
            return 'http://www.w3.org/1999/xhtml';
        }
      }
      function Ie(e, t) {
        return null == e || 'http://www.w3.org/1999/xhtml' === e
          ? Be(t)
          : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
          ? 'http://www.w3.org/1999/xhtml'
          : e;
      }
      var Me,
        ze = (function(e) {
          return 'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
            ? function(t, n, r, a) {
                MSApp.execUnsafeLocalFunction(function() {
                  return e(t, n);
                });
              }
            : e;
        })(function(e, t) {
          if (e.namespaceURI !== Re || 'innerHTML' in e) e.innerHTML = t;
          else {
            for (
              (Me = Me || document.createElement('div')).innerHTML =
                '<svg>' + t.valueOf().toString() + '</svg>',
                t = Me.firstChild;
              e.firstChild;

            )
              e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
          }
        });
      function Le(e, t) {
        if (t) {
          var n = e.firstChild;
          if (n && n === e.lastChild && 3 === n.nodeType)
            return void (n.nodeValue = t);
        }
        e.textContent = t;
      }
      function Ue(e, t) {
        var n = {};
        return (
          (n[e.toLowerCase()] = t.toLowerCase()),
          (n['Webkit' + e] = 'webkit' + t),
          (n['Moz' + e] = 'moz' + t),
          n
        );
      }
      var $e = {
          animationend: Ue('Animation', 'AnimationEnd'),
          animationiteration: Ue('Animation', 'AnimationIteration'),
          animationstart: Ue('Animation', 'AnimationStart'),
          transitionend: Ue('Transition', 'TransitionEnd'),
        },
        He = {},
        Ve = {};
      function We(e) {
        if (He[e]) return He[e];
        if (!$e[e]) return e;
        var t,
          n = $e[e];
        for (t in n) if (n.hasOwnProperty(t) && t in Ve) return (He[e] = n[t]);
        return e;
      }
      A &&
        ((Ve = document.createElement('div').style),
        'AnimationEvent' in window ||
          (delete $e.animationend.animation,
          delete $e.animationiteration.animation,
          delete $e.animationstart.animation),
        'TransitionEvent' in window || delete $e.transitionend.transition);
      var qe = We('animationend'),
        Ye = We('animationiteration'),
        Qe = We('animationstart'),
        Ke = We('transitionend'),
        Ge = 'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
        Ze = new ('function' == typeof WeakMap ? WeakMap : Map)();
      function Xe(e) {
        var t = Ze.get(e);
        return void 0 === t && ((t = new Map()), Ze.set(e, t)), t;
      }
      function Je(e) {
        var t = e,
          n = e;
        if (e.alternate) for (; t.return; ) t = t.return;
        else {
          e = t;
          do {
            0 != (1026 & (t = e).effectTag) && (n = t.return), (e = t.return);
          } while (e);
        }
        return 3 === t.tag ? n : null;
      }
      function et(e) {
        if (13 === e.tag) {
          var t = e.memoizedState;
          if (
            (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
            null !== t)
          )
            return t.dehydrated;
        }
        return null;
      }
      function tt(e) {
        if (Je(e) !== e) throw Error(o(188));
      }
      function nt(e) {
        if (
          !(e = (function(e) {
            var t = e.alternate;
            if (!t) {
              if (null === (t = Je(e))) throw Error(o(188));
              return t !== e ? null : e;
            }
            for (var n = e, r = t; ; ) {
              var a = n.return;
              if (null === a) break;
              var i = a.alternate;
              if (null === i) {
                if (null !== (r = a.return)) {
                  n = r;
                  continue;
                }
                break;
              }
              if (a.child === i.child) {
                for (i = a.child; i; ) {
                  if (i === n) return tt(a), e;
                  if (i === r) return tt(a), t;
                  i = i.sibling;
                }
                throw Error(o(188));
              }
              if (n.return !== r.return) (n = a), (r = i);
              else {
                for (var l = !1, u = a.child; u; ) {
                  if (u === n) {
                    (l = !0), (n = a), (r = i);
                    break;
                  }
                  if (u === r) {
                    (l = !0), (r = a), (n = i);
                    break;
                  }
                  u = u.sibling;
                }
                if (!l) {
                  for (u = i.child; u; ) {
                    if (u === n) {
                      (l = !0), (n = i), (r = a);
                      break;
                    }
                    if (u === r) {
                      (l = !0), (r = i), (n = a);
                      break;
                    }
                    u = u.sibling;
                  }
                  if (!l) throw Error(o(189));
                }
              }
              if (n.alternate !== r) throw Error(o(190));
            }
            if (3 !== n.tag) throw Error(o(188));
            return n.stateNode.current === n ? e : t;
          })(e))
        )
          return null;
        for (var t = e; ; ) {
          if (5 === t.tag || 6 === t.tag) return t;
          if (t.child) (t.child.return = t), (t = t.child);
          else {
            if (t === e) break;
            for (; !t.sibling; ) {
              if (!t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
        }
        return null;
      }
      function rt(e, t) {
        if (null == t) throw Error(o(30));
        return null == e
          ? t
          : Array.isArray(e)
          ? Array.isArray(t)
            ? (e.push.apply(e, t), e)
            : (e.push(t), e)
          : Array.isArray(t)
          ? [e].concat(t)
          : [e, t];
      }
      function at(e, t, n) {
        Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
      }
      var it = null;
      function ot(e) {
        if (e) {
          var t = e._dispatchListeners,
            n = e._dispatchInstances;
          if (Array.isArray(t))
            for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
              y(e, t[r], n[r]);
          else t && y(e, t, n);
          (e._dispatchListeners = null),
            (e._dispatchInstances = null),
            e.isPersistent() || e.constructor.release(e);
        }
      }
      function lt(e) {
        if ((null !== e && (it = rt(it, e)), (e = it), (it = null), e)) {
          if ((at(e, ot), it)) throw Error(o(95));
          if (c) throw ((e = f), (c = !1), (f = null), e);
        }
      }
      function ut(e) {
        return (
          (e = e.target || e.srcElement || window).correspondingUseElement &&
            (e = e.correspondingUseElement),
          3 === e.nodeType ? e.parentNode : e
        );
      }
      function st(e) {
        if (!A) return !1;
        var t = (e = 'on' + e) in document;
        return (
          t ||
            ((t = document.createElement('div')).setAttribute(e, 'return;'),
            (t = 'function' == typeof t[e])),
          t
        );
      }
      var ct = [];
      function ft(e) {
        (e.topLevelType = null),
          (e.nativeEvent = null),
          (e.targetInst = null),
          (e.ancestors.length = 0),
          10 > ct.length && ct.push(e);
      }
      function dt(e, t, n, r) {
        if (ct.length) {
          var a = ct.pop();
          return (
            (a.topLevelType = e),
            (a.eventSystemFlags = r),
            (a.nativeEvent = t),
            (a.targetInst = n),
            a
          );
        }
        return {
          topLevelType: e,
          eventSystemFlags: r,
          nativeEvent: t,
          targetInst: n,
          ancestors: [],
        };
      }
      function pt(e) {
        var t = e.targetInst,
          n = t;
        do {
          if (!n) {
            e.ancestors.push(n);
            break;
          }
          var r = n;
          if (3 === r.tag) r = r.stateNode.containerInfo;
          else {
            for (; r.return; ) r = r.return;
            r = 3 !== r.tag ? null : r.stateNode.containerInfo;
          }
          if (!r) break;
          (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = An(r));
        } while (n);
        for (n = 0; n < e.ancestors.length; n++) {
          t = e.ancestors[n];
          var a = ut(e.nativeEvent);
          r = e.topLevelType;
          var i = e.nativeEvent,
            o = e.eventSystemFlags;
          0 === n && (o |= 64);
          for (var l = null, u = 0; u < w.length; u++) {
            var s = w[u];
            s && (s = s.extractEvents(r, t, i, a, o)) && (l = rt(l, s));
          }
          lt(l);
        }
      }
      function ht(e, t, n) {
        if (!n.has(e)) {
          switch (e) {
            case 'scroll':
              Qt(t, 'scroll', !0);
              break;
            case 'focus':
            case 'blur':
              Qt(t, 'focus', !0),
                Qt(t, 'blur', !0),
                n.set('blur', null),
                n.set('focus', null);
              break;
            case 'cancel':
            case 'close':
              st(e) && Qt(t, e, !0);
              break;
            case 'invalid':
            case 'submit':
            case 'reset':
              break;
            default:
              -1 === Ge.indexOf(e) && Yt(e, t);
          }
          n.set(e, null);
        }
      }
      var mt,
        gt,
        yt,
        bt = !1,
        vt = [],
        xt = null,
        Et = null,
        wt = null,
        Dt = new Map(),
        kt = new Map(),
        Ct = [],
        _t = 'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit'.split(
          ' ',
        ),
        At = 'focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture'.split(
          ' ',
        );
      function Tt(e, t, n, r, a) {
        return {
          blockedOn: e,
          topLevelType: t,
          eventSystemFlags: 32 | n,
          nativeEvent: a,
          container: r,
        };
      }
      function St(e, t) {
        switch (e) {
          case 'focus':
          case 'blur':
            xt = null;
            break;
          case 'dragenter':
          case 'dragleave':
            Et = null;
            break;
          case 'mouseover':
          case 'mouseout':
            wt = null;
            break;
          case 'pointerover':
          case 'pointerout':
            Dt.delete(t.pointerId);
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
            kt.delete(t.pointerId);
        }
      }
      function Nt(e, t, n, r, a, i) {
        return null === e || e.nativeEvent !== i
          ? ((e = Tt(t, n, r, a, i)),
            null !== t && null !== (t = Tn(t)) && gt(t),
            e)
          : ((e.eventSystemFlags |= r), e);
      }
      function Ot(e) {
        var t = An(e.target);
        if (null !== t) {
          var n = Je(t);
          if (null !== n)
            if (13 === (t = n.tag)) {
              if (null !== (t = et(n)))
                return (
                  (e.blockedOn = t),
                  void i.unstable_runWithPriority(e.priority, function() {
                    yt(n);
                  })
                );
            } else if (3 === t && n.stateNode.hydrate)
              return void (e.blockedOn =
                3 === n.tag ? n.stateNode.containerInfo : null);
        }
        e.blockedOn = null;
      }
      function Ft(e) {
        if (null !== e.blockedOn) return !1;
        var t = Xt(
          e.topLevelType,
          e.eventSystemFlags,
          e.container,
          e.nativeEvent,
        );
        if (null !== t) {
          var n = Tn(t);
          return null !== n && gt(n), (e.blockedOn = t), !1;
        }
        return !0;
      }
      function jt(e, t, n) {
        Ft(e) && n.delete(t);
      }
      function Pt() {
        for (bt = !1; 0 < vt.length; ) {
          var e = vt[0];
          if (null !== e.blockedOn) {
            null !== (e = Tn(e.blockedOn)) && mt(e);
            break;
          }
          var t = Xt(
            e.topLevelType,
            e.eventSystemFlags,
            e.container,
            e.nativeEvent,
          );
          null !== t ? (e.blockedOn = t) : vt.shift();
        }
        null !== xt && Ft(xt) && (xt = null),
          null !== Et && Ft(Et) && (Et = null),
          null !== wt && Ft(wt) && (wt = null),
          Dt.forEach(jt),
          kt.forEach(jt);
      }
      function Rt(e, t) {
        e.blockedOn === t &&
          ((e.blockedOn = null),
          bt ||
            ((bt = !0),
            i.unstable_scheduleCallback(i.unstable_NormalPriority, Pt)));
      }
      function Bt(e) {
        function t(t) {
          return Rt(t, e);
        }
        if (0 < vt.length) {
          Rt(vt[0], e);
          for (var n = 1; n < vt.length; n++) {
            var r = vt[n];
            r.blockedOn === e && (r.blockedOn = null);
          }
        }
        for (
          null !== xt && Rt(xt, e),
            null !== Et && Rt(Et, e),
            null !== wt && Rt(wt, e),
            Dt.forEach(t),
            kt.forEach(t),
            n = 0;
          n < Ct.length;
          n++
        )
          (r = Ct[n]).blockedOn === e && (r.blockedOn = null);
        for (; 0 < Ct.length && null === (n = Ct[0]).blockedOn; )
          Ot(n), null === n.blockedOn && Ct.shift();
      }
      var It = {},
        Mt = new Map(),
        zt = new Map(),
        Lt = [
          'abort',
          'abort',
          qe,
          'animationEnd',
          Ye,
          'animationIteration',
          Qe,
          'animationStart',
          'canplay',
          'canPlay',
          'canplaythrough',
          'canPlayThrough',
          'durationchange',
          'durationChange',
          'emptied',
          'emptied',
          'encrypted',
          'encrypted',
          'ended',
          'ended',
          'error',
          'error',
          'gotpointercapture',
          'gotPointerCapture',
          'load',
          'load',
          'loadeddata',
          'loadedData',
          'loadedmetadata',
          'loadedMetadata',
          'loadstart',
          'loadStart',
          'lostpointercapture',
          'lostPointerCapture',
          'playing',
          'playing',
          'progress',
          'progress',
          'seeking',
          'seeking',
          'stalled',
          'stalled',
          'suspend',
          'suspend',
          'timeupdate',
          'timeUpdate',
          Ke,
          'transitionEnd',
          'waiting',
          'waiting',
        ];
      function Ut(e, t) {
        for (var n = 0; n < e.length; n += 2) {
          var r = e[n],
            a = e[n + 1],
            i = 'on' + (a[0].toUpperCase() + a.slice(1));
          (i = {
            phasedRegistrationNames: { bubbled: i, captured: i + 'Capture' },
            dependencies: [r],
            eventPriority: t,
          }),
            zt.set(r, t),
            Mt.set(r, i),
            (It[a] = i);
        }
      }
      Ut(
        'blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange'.split(
          ' ',
        ),
        0,
      ),
        Ut(
          'drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel'.split(
            ' ',
          ),
          1,
        ),
        Ut(Lt, 2);
      for (
        var $t = 'change selectionchange textInput compositionstart compositionend compositionupdate'.split(
            ' ',
          ),
          Ht = 0;
        Ht < $t.length;
        Ht++
      )
        zt.set($t[Ht], 0);
      var Vt = i.unstable_UserBlockingPriority,
        Wt = i.unstable_runWithPriority,
        qt = !0;
      function Yt(e, t) {
        Qt(t, e, !1);
      }
      function Qt(e, t, n) {
        var r = zt.get(t);
        switch (void 0 === r ? 2 : r) {
          case 0:
            r = Kt.bind(null, t, 1, e);
            break;
          case 1:
            r = Gt.bind(null, t, 1, e);
            break;
          default:
            r = Zt.bind(null, t, 1, e);
        }
        n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
      }
      function Kt(e, t, n, r) {
        M || B();
        var a = Zt,
          i = M;
        M = !0;
        try {
          R(a, e, t, n, r);
        } finally {
          (M = i) || L();
        }
      }
      function Gt(e, t, n, r) {
        Wt(Vt, Zt.bind(null, e, t, n, r));
      }
      function Zt(e, t, n, r) {
        if (qt)
          if (0 < vt.length && -1 < _t.indexOf(e))
            (e = Tt(null, e, t, n, r)), vt.push(e);
          else {
            var a = Xt(e, t, n, r);
            if (null === a) St(e, r);
            else if (-1 < _t.indexOf(e)) (e = Tt(a, e, t, n, r)), vt.push(e);
            else if (
              !(function(e, t, n, r, a) {
                switch (t) {
                  case 'focus':
                    return (xt = Nt(xt, e, t, n, r, a)), !0;
                  case 'dragenter':
                    return (Et = Nt(Et, e, t, n, r, a)), !0;
                  case 'mouseover':
                    return (wt = Nt(wt, e, t, n, r, a)), !0;
                  case 'pointerover':
                    var i = a.pointerId;
                    return Dt.set(i, Nt(Dt.get(i) || null, e, t, n, r, a)), !0;
                  case 'gotpointercapture':
                    return (
                      (i = a.pointerId),
                      kt.set(i, Nt(kt.get(i) || null, e, t, n, r, a)),
                      !0
                    );
                }
                return !1;
              })(a, e, t, n, r)
            ) {
              St(e, r), (e = dt(e, r, null, t));
              try {
                U(pt, e);
              } finally {
                ft(e);
              }
            }
          }
      }
      function Xt(e, t, n, r) {
        if (null !== (n = An((n = ut(r))))) {
          var a = Je(n);
          if (null === a) n = null;
          else {
            var i = a.tag;
            if (13 === i) {
              if (null !== (n = et(a))) return n;
              n = null;
            } else if (3 === i) {
              if (a.stateNode.hydrate)
                return 3 === a.tag ? a.stateNode.containerInfo : null;
              n = null;
            } else a !== n && (n = null);
          }
        }
        e = dt(e, r, n, t);
        try {
          U(pt, e);
        } finally {
          ft(e);
        }
        return null;
      }
      var Jt = {
          animationIterationCount: !0,
          borderImageOutset: !0,
          borderImageSlice: !0,
          borderImageWidth: !0,
          boxFlex: !0,
          boxFlexGroup: !0,
          boxOrdinalGroup: !0,
          columnCount: !0,
          columns: !0,
          flex: !0,
          flexGrow: !0,
          flexPositive: !0,
          flexShrink: !0,
          flexNegative: !0,
          flexOrder: !0,
          gridArea: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowSpan: !0,
          gridRowStart: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnSpan: !0,
          gridColumnStart: !0,
          fontWeight: !0,
          lineClamp: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          tabSize: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeDasharray: !0,
          strokeDashoffset: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
          strokeWidth: !0,
        },
        en = ['Webkit', 'ms', 'Moz', 'O'];
      function tn(e, t, n) {
        return null == t || 'boolean' == typeof t || '' === t
          ? ''
          : n ||
            'number' != typeof t ||
            0 === t ||
            (Jt.hasOwnProperty(e) && Jt[e])
          ? ('' + t).trim()
          : t + 'px';
      }
      function nn(e, t) {
        for (var n in ((e = e.style), t))
          if (t.hasOwnProperty(n)) {
            var r = 0 === n.indexOf('--'),
              a = tn(n, t[n], r);
            'float' === n && (n = 'cssFloat'),
              r ? e.setProperty(n, a) : (e[n] = a);
          }
      }
      Object.keys(Jt).forEach(function(e) {
        en.forEach(function(t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Jt[t] = Jt[e]);
        });
      });
      var rn = a(
        { menuitem: !0 },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
      );
      function an(e, t) {
        if (t) {
          if (
            rn[e] &&
            (null != t.children || null != t.dangerouslySetInnerHTML)
          )
            throw Error(o(137, e, ''));
          if (null != t.dangerouslySetInnerHTML) {
            if (null != t.children) throw Error(o(60));
            if (
              'object' != typeof t.dangerouslySetInnerHTML ||
              !('__html' in t.dangerouslySetInnerHTML)
            )
              throw Error(o(61));
          }
          if (null != t.style && 'object' != typeof t.style)
            throw Error(o(62, ''));
        }
      }
      function on(e, t) {
        if (-1 === e.indexOf('-')) return 'string' == typeof t.is;
        switch (e) {
          case 'annotation-xml':
          case 'color-profile':
          case 'font-face':
          case 'font-face-src':
          case 'font-face-uri':
          case 'font-face-format':
          case 'font-face-name':
          case 'missing-glyph':
            return !1;
          default:
            return !0;
        }
      }
      var ln = Pe;
      function un(e, t) {
        var n = Xe(
          (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument),
        );
        t = C[t];
        for (var r = 0; r < t.length; r++) ht(t[r], e, n);
      }
      function sn() {}
      function cn(e) {
        if (
          void 0 ===
          (e = e || ('undefined' != typeof document ? document : void 0))
        )
          return null;
        try {
          return e.activeElement || e.body;
        } catch (t) {
          return e.body;
        }
      }
      function fn(e) {
        for (; e && e.firstChild; ) e = e.firstChild;
        return e;
      }
      function dn(e, t) {
        var n,
          r = fn(e);
        for (e = 0; r; ) {
          if (3 === r.nodeType) {
            if (((n = e + r.textContent.length), e <= t && n >= t))
              return { node: r, offset: t - e };
            e = n;
          }
          e: {
            for (; r; ) {
              if (r.nextSibling) {
                r = r.nextSibling;
                break e;
              }
              r = r.parentNode;
            }
            r = void 0;
          }
          r = fn(r);
        }
      }
      function pn() {
        for (var e = window, t = cn(); t instanceof e.HTMLIFrameElement; ) {
          try {
            var n = 'string' == typeof t.contentWindow.location.href;
          } catch (e) {
            n = !1;
          }
          if (!n) break;
          t = cn((e = t.contentWindow).document);
        }
        return t;
      }
      function hn(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return (
          t &&
          (('input' === t &&
            ('text' === e.type ||
              'search' === e.type ||
              'tel' === e.type ||
              'url' === e.type ||
              'password' === e.type)) ||
            'textarea' === t ||
            'true' === e.contentEditable)
        );
      }
      var mn = null,
        gn = null;
      function yn(e, t) {
        switch (e) {
          case 'button':
          case 'input':
          case 'select':
          case 'textarea':
            return !!t.autoFocus;
        }
        return !1;
      }
      function bn(e, t) {
        return (
          'textarea' === e ||
          'option' === e ||
          'noscript' === e ||
          'string' == typeof t.children ||
          'number' == typeof t.children ||
          ('object' == typeof t.dangerouslySetInnerHTML &&
            null !== t.dangerouslySetInnerHTML &&
            null != t.dangerouslySetInnerHTML.__html)
        );
      }
      var vn = 'function' == typeof setTimeout ? setTimeout : void 0,
        xn = 'function' == typeof clearTimeout ? clearTimeout : void 0;
      function En(e) {
        for (; null != e; e = e.nextSibling) {
          var t = e.nodeType;
          if (1 === t || 3 === t) break;
        }
        return e;
      }
      function wn(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if ('$' === n || '$!' === n || '$?' === n) {
              if (0 === t) return e;
              t--;
            } else '/$' === n && t++;
          }
          e = e.previousSibling;
        }
        return null;
      }
      var Dn = Math.random()
          .toString(36)
          .slice(2),
        kn = '__reactInternalInstance$' + Dn,
        Cn = '__reactEventHandlers$' + Dn,
        _n = '__reactContainere$' + Dn;
      function An(e) {
        var t = e[kn];
        if (t) return t;
        for (var n = e.parentNode; n; ) {
          if ((t = n[_n] || n[kn])) {
            if (
              ((n = t.alternate),
              null !== t.child || (null !== n && null !== n.child))
            )
              for (e = wn(e); null !== e; ) {
                if ((n = e[kn])) return n;
                e = wn(e);
              }
            return t;
          }
          n = (e = n).parentNode;
        }
        return null;
      }
      function Tn(e) {
        return !(e = e[kn] || e[_n]) ||
          (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
          ? null
          : e;
      }
      function Sn(e) {
        if (5 === e.tag || 6 === e.tag) return e.stateNode;
        throw Error(o(33));
      }
      function Nn(e) {
        return e[Cn] || null;
      }
      function On(e) {
        do {
          e = e.return;
        } while (e && 5 !== e.tag);
        return e || null;
      }
      function Fn(e, t) {
        var n = e.stateNode;
        if (!n) return null;
        var r = h(n);
        if (!r) return null;
        n = r[t];
        e: switch (t) {
          case 'onClick':
          case 'onClickCapture':
          case 'onDoubleClick':
          case 'onDoubleClickCapture':
          case 'onMouseDown':
          case 'onMouseDownCapture':
          case 'onMouseMove':
          case 'onMouseMoveCapture':
          case 'onMouseUp':
          case 'onMouseUpCapture':
          case 'onMouseEnter':
            (r = !r.disabled) ||
              (r = !(
                'button' === (e = e.type) ||
                'input' === e ||
                'select' === e ||
                'textarea' === e
              )),
              (e = !r);
            break e;
          default:
            e = !1;
        }
        if (e) return null;
        if (n && 'function' != typeof n) throw Error(o(231, t, typeof n));
        return n;
      }
      function jn(e, t, n) {
        (t = Fn(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
          ((n._dispatchListeners = rt(n._dispatchListeners, t)),
          (n._dispatchInstances = rt(n._dispatchInstances, e)));
      }
      function Pn(e) {
        if (e && e.dispatchConfig.phasedRegistrationNames) {
          for (var t = e._targetInst, n = []; t; ) n.push(t), (t = On(t));
          for (t = n.length; 0 < t--; ) jn(n[t], 'captured', e);
          for (t = 0; t < n.length; t++) jn(n[t], 'bubbled', e);
        }
      }
      function Rn(e, t, n) {
        e &&
          n &&
          n.dispatchConfig.registrationName &&
          (t = Fn(e, n.dispatchConfig.registrationName)) &&
          ((n._dispatchListeners = rt(n._dispatchListeners, t)),
          (n._dispatchInstances = rt(n._dispatchInstances, e)));
      }
      function Bn(e) {
        e && e.dispatchConfig.registrationName && Rn(e._targetInst, null, e);
      }
      function In(e) {
        at(e, Pn);
      }
      var Mn = null,
        zn = null,
        Ln = null;
      function Un() {
        if (Ln) return Ln;
        var e,
          t,
          n = zn,
          r = n.length,
          a = 'value' in Mn ? Mn.value : Mn.textContent,
          i = a.length;
        for (e = 0; e < r && n[e] === a[e]; e++);
        var o = r - e;
        for (t = 1; t <= o && n[r - t] === a[i - t]; t++);
        return (Ln = a.slice(e, 1 < t ? 1 - t : void 0));
      }
      function $n() {
        return !0;
      }
      function Hn() {
        return !1;
      }
      function Vn(e, t, n, r) {
        for (var a in ((this.dispatchConfig = e),
        (this._targetInst = t),
        (this.nativeEvent = n),
        (e = this.constructor.Interface)))
          e.hasOwnProperty(a) &&
            ((t = e[a])
              ? (this[a] = t(n))
              : 'target' === a
              ? (this.target = r)
              : (this[a] = n[a]));
        return (
          (this.isDefaultPrevented = (null != n.defaultPrevented
          ? n.defaultPrevented
          : !1 === n.returnValue)
            ? $n
            : Hn),
          (this.isPropagationStopped = Hn),
          this
        );
      }
      function Wn(e, t, n, r) {
        if (this.eventPool.length) {
          var a = this.eventPool.pop();
          return this.call(a, e, t, n, r), a;
        }
        return new this(e, t, n, r);
      }
      function qn(e) {
        if (!(e instanceof this)) throw Error(o(279));
        e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
      }
      function Yn(e) {
        (e.eventPool = []), (e.getPooled = Wn), (e.release = qn);
      }
      a(Vn.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : 'unknown' != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = $n));
        },
        stopPropagation: function() {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : 'unknown' != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = $n));
        },
        persist: function() {
          this.isPersistent = $n;
        },
        isPersistent: Hn,
        destructor: function() {
          var e,
            t = this.constructor.Interface;
          for (e in t) this[e] = null;
          (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
            (this.isPropagationStopped = this.isDefaultPrevented = Hn),
            (this._dispatchInstances = this._dispatchListeners = null);
        },
      }),
        (Vn.Interface = {
          type: null,
          target: null,
          currentTarget: function() {
            return null;
          },
          eventPhase: null,
          bubbles: null,
          cancelable: null,
          timeStamp: function(e) {
            return e.timeStamp || Date.now();
          },
          defaultPrevented: null,
          isTrusted: null,
        }),
        (Vn.extend = function(e) {
          function t() {}
          function n() {
            return r.apply(this, arguments);
          }
          var r = this;
          t.prototype = r.prototype;
          var i = new t();
          return (
            a(i, n.prototype),
            (n.prototype = i),
            (n.prototype.constructor = n),
            (n.Interface = a({}, r.Interface, e)),
            (n.extend = r.extend),
            Yn(n),
            n
          );
        }),
        Yn(Vn);
      var Qn = Vn.extend({ data: null }),
        Kn = Vn.extend({ data: null }),
        Gn = [9, 13, 27, 32],
        Zn = A && 'CompositionEvent' in window,
        Xn = null;
      A && 'documentMode' in document && (Xn = document.documentMode);
      var Jn = A && 'TextEvent' in window && !Xn,
        er = A && (!Zn || (Xn && 8 < Xn && 11 >= Xn)),
        tr = String.fromCharCode(32),
        nr = {
          beforeInput: {
            phasedRegistrationNames: {
              bubbled: 'onBeforeInput',
              captured: 'onBeforeInputCapture',
            },
            dependencies: ['compositionend', 'keypress', 'textInput', 'paste'],
          },
          compositionEnd: {
            phasedRegistrationNames: {
              bubbled: 'onCompositionEnd',
              captured: 'onCompositionEndCapture',
            },
            dependencies: 'blur compositionend keydown keypress keyup mousedown'.split(
              ' ',
            ),
          },
          compositionStart: {
            phasedRegistrationNames: {
              bubbled: 'onCompositionStart',
              captured: 'onCompositionStartCapture',
            },
            dependencies: 'blur compositionstart keydown keypress keyup mousedown'.split(
              ' ',
            ),
          },
          compositionUpdate: {
            phasedRegistrationNames: {
              bubbled: 'onCompositionUpdate',
              captured: 'onCompositionUpdateCapture',
            },
            dependencies: 'blur compositionupdate keydown keypress keyup mousedown'.split(
              ' ',
            ),
          },
        },
        rr = !1;
      function ar(e, t) {
        switch (e) {
          case 'keyup':
            return -1 !== Gn.indexOf(t.keyCode);
          case 'keydown':
            return 229 !== t.keyCode;
          case 'keypress':
          case 'mousedown':
          case 'blur':
            return !0;
          default:
            return !1;
        }
      }
      function ir(e) {
        return 'object' == typeof (e = e.detail) && 'data' in e ? e.data : null;
      }
      var or = !1;
      var lr = {
          eventTypes: nr,
          extractEvents: function(e, t, n, r) {
            var a;
            if (Zn)
              e: {
                switch (e) {
                  case 'compositionstart':
                    var i = nr.compositionStart;
                    break e;
                  case 'compositionend':
                    i = nr.compositionEnd;
                    break e;
                  case 'compositionupdate':
                    i = nr.compositionUpdate;
                    break e;
                }
                i = void 0;
              }
            else
              or
                ? ar(e, n) && (i = nr.compositionEnd)
                : 'keydown' === e &&
                  229 === n.keyCode &&
                  (i = nr.compositionStart);
            return (
              i
                ? (er &&
                    'ko' !== n.locale &&
                    (or || i !== nr.compositionStart
                      ? i === nr.compositionEnd && or && (a = Un())
                      : ((zn = 'value' in (Mn = r) ? Mn.value : Mn.textContent),
                        (or = !0))),
                  (i = Qn.getPooled(i, t, n, r)),
                  a ? (i.data = a) : null !== (a = ir(n)) && (i.data = a),
                  In(i),
                  (a = i))
                : (a = null),
              (e = Jn
                ? (function(e, t) {
                    switch (e) {
                      case 'compositionend':
                        return ir(t);
                      case 'keypress':
                        return 32 !== t.which ? null : ((rr = !0), tr);
                      case 'textInput':
                        return (e = t.data) === tr && rr ? null : e;
                      default:
                        return null;
                    }
                  })(e, n)
                : (function(e, t) {
                    if (or)
                      return 'compositionend' === e || (!Zn && ar(e, t))
                        ? ((e = Un()), (Ln = zn = Mn = null), (or = !1), e)
                        : null;
                    switch (e) {
                      case 'paste':
                        return null;
                      case 'keypress':
                        if (
                          !(t.ctrlKey || t.altKey || t.metaKey) ||
                          (t.ctrlKey && t.altKey)
                        ) {
                          if (t.char && 1 < t.char.length) return t.char;
                          if (t.which) return String.fromCharCode(t.which);
                        }
                        return null;
                      case 'compositionend':
                        return er && 'ko' !== t.locale ? null : t.data;
                      default:
                        return null;
                    }
                  })(e, n))
                ? (((t = Kn.getPooled(nr.beforeInput, t, n, r)).data = e),
                  In(t))
                : (t = null),
              null === a ? t : null === t ? a : [a, t]
            );
          },
        },
        ur = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
      function sr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return 'input' === t ? !!ur[e.type] : 'textarea' === t;
      }
      var cr = {
        change: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture',
          },
          dependencies: 'blur change click focus input keydown keyup selectionchange'.split(
            ' ',
          ),
        },
      };
      function fr(e, t, n) {
        return (
          ((e = Vn.getPooled(cr.change, e, t, n)).type = 'change'),
          F(n),
          In(e),
          e
        );
      }
      var dr = null,
        pr = null;
      function hr(e) {
        lt(e);
      }
      function mr(e) {
        if (Ee(Sn(e))) return e;
      }
      function gr(e, t) {
        if ('change' === e) return t;
      }
      var yr = !1;
      function br() {
        dr && (dr.detachEvent('onpropertychange', vr), (pr = dr = null));
      }
      function vr(e) {
        if ('value' === e.propertyName && mr(pr))
          if (((e = fr(pr, e, ut(e))), M)) lt(e);
          else {
            M = !0;
            try {
              P(hr, e);
            } finally {
              (M = !1), L();
            }
          }
      }
      function xr(e, t, n) {
        'focus' === e
          ? (br(), (pr = n), (dr = t).attachEvent('onpropertychange', vr))
          : 'blur' === e && br();
      }
      function Er(e) {
        if ('selectionchange' === e || 'keyup' === e || 'keydown' === e)
          return mr(pr);
      }
      function wr(e, t) {
        if ('click' === e) return mr(t);
      }
      function Dr(e, t) {
        if ('input' === e || 'change' === e) return mr(t);
      }
      A &&
        (yr =
          st('input') && (!document.documentMode || 9 < document.documentMode));
      var kr = {
          eventTypes: cr,
          _isInputEventSupported: yr,
          extractEvents: function(e, t, n, r) {
            var a = t ? Sn(t) : window,
              i = a.nodeName && a.nodeName.toLowerCase();
            if ('select' === i || ('input' === i && 'file' === a.type))
              var o = gr;
            else if (sr(a))
              if (yr) o = Dr;
              else {
                o = Er;
                var l = xr;
              }
            else
              (i = a.nodeName) &&
                'input' === i.toLowerCase() &&
                ('checkbox' === a.type || 'radio' === a.type) &&
                (o = wr);
            if (o && (o = o(e, t))) return fr(o, n, r);
            l && l(e, a, t),
              'blur' === e &&
                (e = a._wrapperState) &&
                e.controlled &&
                'number' === a.type &&
                Ae(a, 'number', a.value);
          },
        },
        Cr = Vn.extend({ view: null, detail: null }),
        _r = {
          Alt: 'altKey',
          Control: 'ctrlKey',
          Meta: 'metaKey',
          Shift: 'shiftKey',
        };
      function Ar(e) {
        var t = this.nativeEvent;
        return t.getModifierState
          ? t.getModifierState(e)
          : !!(e = _r[e]) && !!t[e];
      }
      function Tr() {
        return Ar;
      }
      var Sr = 0,
        Nr = 0,
        Or = !1,
        Fr = !1,
        jr = Cr.extend({
          screenX: null,
          screenY: null,
          clientX: null,
          clientY: null,
          pageX: null,
          pageY: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          getModifierState: Tr,
          button: null,
          buttons: null,
          relatedTarget: function(e) {
            return (
              e.relatedTarget ||
              (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
            );
          },
          movementX: function(e) {
            if ('movementX' in e) return e.movementX;
            var t = Sr;
            return (
              (Sr = e.screenX),
              Or ? ('mousemove' === e.type ? e.screenX - t : 0) : ((Or = !0), 0)
            );
          },
          movementY: function(e) {
            if ('movementY' in e) return e.movementY;
            var t = Nr;
            return (
              (Nr = e.screenY),
              Fr ? ('mousemove' === e.type ? e.screenY - t : 0) : ((Fr = !0), 0)
            );
          },
        }),
        Pr = jr.extend({
          pointerId: null,
          width: null,
          height: null,
          pressure: null,
          tangentialPressure: null,
          tiltX: null,
          tiltY: null,
          twist: null,
          pointerType: null,
          isPrimary: null,
        }),
        Rr = {
          mouseEnter: {
            registrationName: 'onMouseEnter',
            dependencies: ['mouseout', 'mouseover'],
          },
          mouseLeave: {
            registrationName: 'onMouseLeave',
            dependencies: ['mouseout', 'mouseover'],
          },
          pointerEnter: {
            registrationName: 'onPointerEnter',
            dependencies: ['pointerout', 'pointerover'],
          },
          pointerLeave: {
            registrationName: 'onPointerLeave',
            dependencies: ['pointerout', 'pointerover'],
          },
        },
        Br = {
          eventTypes: Rr,
          extractEvents: function(e, t, n, r, a) {
            var i = 'mouseover' === e || 'pointerover' === e,
              o = 'mouseout' === e || 'pointerout' === e;
            if (
              (i && 0 == (32 & a) && (n.relatedTarget || n.fromElement)) ||
              (!o && !i)
            )
              return null;
            ((i =
              r.window === r
                ? r
                : (i = r.ownerDocument)
                ? i.defaultView || i.parentWindow
                : window),
            o)
              ? ((o = t),
                null !==
                  (t = (t = n.relatedTarget || n.toElement) ? An(t) : null) &&
                  (t !== Je(t) || (5 !== t.tag && 6 !== t.tag)) &&
                  (t = null))
              : (o = null);
            if (o === t) return null;
            if ('mouseout' === e || 'mouseover' === e)
              var l = jr,
                u = Rr.mouseLeave,
                s = Rr.mouseEnter,
                c = 'mouse';
            else
              ('pointerout' !== e && 'pointerover' !== e) ||
                ((l = Pr),
                (u = Rr.pointerLeave),
                (s = Rr.pointerEnter),
                (c = 'pointer'));
            if (
              ((e = null == o ? i : Sn(o)),
              (i = null == t ? i : Sn(t)),
              ((u = l.getPooled(u, o, n, r)).type = c + 'leave'),
              (u.target = e),
              (u.relatedTarget = i),
              ((n = l.getPooled(s, t, n, r)).type = c + 'enter'),
              (n.target = i),
              (n.relatedTarget = e),
              (c = t),
              (r = o) && c)
            )
              e: {
                for (s = c, o = 0, e = l = r; e; e = On(e)) o++;
                for (e = 0, t = s; t; t = On(t)) e++;
                for (; 0 < o - e; ) (l = On(l)), o--;
                for (; 0 < e - o; ) (s = On(s)), e--;
                for (; o--; ) {
                  if (l === s || l === s.alternate) break e;
                  (l = On(l)), (s = On(s));
                }
                l = null;
              }
            else l = null;
            for (
              s = l, l = [];
              r && r !== s && (null === (o = r.alternate) || o !== s);

            )
              l.push(r), (r = On(r));
            for (
              r = [];
              c && c !== s && (null === (o = c.alternate) || o !== s);

            )
              r.push(c), (c = On(c));
            for (c = 0; c < l.length; c++) Rn(l[c], 'bubbled', u);
            for (c = r.length; 0 < c--; ) Rn(r[c], 'captured', n);
            return 0 == (64 & a) ? [u] : [u, n];
          },
        };
      var Ir =
          'function' == typeof Object.is
            ? Object.is
            : function(e, t) {
                return (
                  (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
                );
              },
        Mr = Object.prototype.hasOwnProperty;
      function zr(e, t) {
        if (Ir(e, t)) return !0;
        if (
          'object' != typeof e ||
          null === e ||
          'object' != typeof t ||
          null === t
        )
          return !1;
        var n = Object.keys(e),
          r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (r = 0; r < n.length; r++)
          if (!Mr.call(t, n[r]) || !Ir(e[n[r]], t[n[r]])) return !1;
        return !0;
      }
      var Lr = A && 'documentMode' in document && 11 >= document.documentMode,
        Ur = {
          select: {
            phasedRegistrationNames: {
              bubbled: 'onSelect',
              captured: 'onSelectCapture',
            },
            dependencies: 'blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange'.split(
              ' ',
            ),
          },
        },
        $r = null,
        Hr = null,
        Vr = null,
        Wr = !1;
      function qr(e, t) {
        var n =
          t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
        return Wr || null == $r || $r !== cn(n)
          ? null
          : ('selectionStart' in (n = $r) && hn(n)
              ? (n = { start: n.selectionStart, end: n.selectionEnd })
              : (n = {
                  anchorNode: (n = (
                    (n.ownerDocument && n.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: n.anchorOffset,
                  focusNode: n.focusNode,
                  focusOffset: n.focusOffset,
                }),
            Vr && zr(Vr, n)
              ? null
              : ((Vr = n),
                ((e = Vn.getPooled(Ur.select, Hr, e, t)).type = 'select'),
                (e.target = $r),
                In(e),
                e));
      }
      var Yr = {
          eventTypes: Ur,
          extractEvents: function(e, t, n, r, a, i) {
            if (
              !(i = !(a =
                i ||
                (r.window === r
                  ? r.document
                  : 9 === r.nodeType
                  ? r
                  : r.ownerDocument)))
            ) {
              e: {
                (a = Xe(a)), (i = C.onSelect);
                for (var o = 0; o < i.length; o++)
                  if (!a.has(i[o])) {
                    a = !1;
                    break e;
                  }
                a = !0;
              }
              i = !a;
            }
            if (i) return null;
            switch (((a = t ? Sn(t) : window), e)) {
              case 'focus':
                (sr(a) || 'true' === a.contentEditable) &&
                  (($r = a), (Hr = t), (Vr = null));
                break;
              case 'blur':
                Vr = Hr = $r = null;
                break;
              case 'mousedown':
                Wr = !0;
                break;
              case 'contextmenu':
              case 'mouseup':
              case 'dragend':
                return (Wr = !1), qr(n, r);
              case 'selectionchange':
                if (Lr) break;
              case 'keydown':
              case 'keyup':
                return qr(n, r);
            }
            return null;
          },
        },
        Qr = Vn.extend({
          animationName: null,
          elapsedTime: null,
          pseudoElement: null,
        }),
        Kr = Vn.extend({
          clipboardData: function(e) {
            return 'clipboardData' in e
              ? e.clipboardData
              : window.clipboardData;
          },
        }),
        Gr = Cr.extend({ relatedTarget: null });
      function Zr(e) {
        var t = e.keyCode;
        return (
          'charCode' in e
            ? 0 === (e = e.charCode) && 13 === t && (e = 13)
            : (e = t),
          10 === e && (e = 13),
          32 <= e || 13 === e ? e : 0
        );
      }
      var Xr = {
          Esc: 'Escape',
          Spacebar: ' ',
          Left: 'ArrowLeft',
          Up: 'ArrowUp',
          Right: 'ArrowRight',
          Down: 'ArrowDown',
          Del: 'Delete',
          Win: 'OS',
          Menu: 'ContextMenu',
          Apps: 'ContextMenu',
          Scroll: 'ScrollLock',
          MozPrintableKey: 'Unidentified',
        },
        Jr = {
          8: 'Backspace',
          9: 'Tab',
          12: 'Clear',
          13: 'Enter',
          16: 'Shift',
          17: 'Control',
          18: 'Alt',
          19: 'Pause',
          20: 'CapsLock',
          27: 'Escape',
          32: ' ',
          33: 'PageUp',
          34: 'PageDown',
          35: 'End',
          36: 'Home',
          37: 'ArrowLeft',
          38: 'ArrowUp',
          39: 'ArrowRight',
          40: 'ArrowDown',
          45: 'Insert',
          46: 'Delete',
          112: 'F1',
          113: 'F2',
          114: 'F3',
          115: 'F4',
          116: 'F5',
          117: 'F6',
          118: 'F7',
          119: 'F8',
          120: 'F9',
          121: 'F10',
          122: 'F11',
          123: 'F12',
          144: 'NumLock',
          145: 'ScrollLock',
          224: 'Meta',
        },
        ea = Cr.extend({
          key: function(e) {
            if (e.key) {
              var t = Xr[e.key] || e.key;
              if ('Unidentified' !== t) return t;
            }
            return 'keypress' === e.type
              ? 13 === (e = Zr(e))
                ? 'Enter'
                : String.fromCharCode(e)
              : 'keydown' === e.type || 'keyup' === e.type
              ? Jr[e.keyCode] || 'Unidentified'
              : '';
          },
          location: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          repeat: null,
          locale: null,
          getModifierState: Tr,
          charCode: function(e) {
            return 'keypress' === e.type ? Zr(e) : 0;
          },
          keyCode: function(e) {
            return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
          },
          which: function(e) {
            return 'keypress' === e.type
              ? Zr(e)
              : 'keydown' === e.type || 'keyup' === e.type
              ? e.keyCode
              : 0;
          },
        }),
        ta = jr.extend({ dataTransfer: null }),
        na = Cr.extend({
          touches: null,
          targetTouches: null,
          changedTouches: null,
          altKey: null,
          metaKey: null,
          ctrlKey: null,
          shiftKey: null,
          getModifierState: Tr,
        }),
        ra = Vn.extend({
          propertyName: null,
          elapsedTime: null,
          pseudoElement: null,
        }),
        aa = jr.extend({
          deltaX: function(e) {
            return 'deltaX' in e
              ? e.deltaX
              : 'wheelDeltaX' in e
              ? -e.wheelDeltaX
              : 0;
          },
          deltaY: function(e) {
            return 'deltaY' in e
              ? e.deltaY
              : 'wheelDeltaY' in e
              ? -e.wheelDeltaY
              : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
          },
          deltaZ: null,
          deltaMode: null,
        }),
        ia = {
          eventTypes: It,
          extractEvents: function(e, t, n, r) {
            var a = Mt.get(e);
            if (!a) return null;
            switch (e) {
              case 'keypress':
                if (0 === Zr(n)) return null;
              case 'keydown':
              case 'keyup':
                e = ea;
                break;
              case 'blur':
              case 'focus':
                e = Gr;
                break;
              case 'click':
                if (2 === n.button) return null;
              case 'auxclick':
              case 'dblclick':
              case 'mousedown':
              case 'mousemove':
              case 'mouseup':
              case 'mouseout':
              case 'mouseover':
              case 'contextmenu':
                e = jr;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                e = ta;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                e = na;
                break;
              case qe:
              case Ye:
              case Qe:
                e = Qr;
                break;
              case Ke:
                e = ra;
                break;
              case 'scroll':
                e = Cr;
                break;
              case 'wheel':
                e = aa;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                e = Kr;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                e = Pr;
                break;
              default:
                e = Vn;
            }
            return In((t = e.getPooled(a, t, n, r))), t;
          },
        };
      if (b) throw Error(o(101));
      (b = Array.prototype.slice.call(
        'ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin'.split(
          ' ',
        ),
      )),
        x(),
        (h = Nn),
        (m = Tn),
        (g = Sn),
        _({
          SimpleEventPlugin: ia,
          EnterLeaveEventPlugin: Br,
          ChangeEventPlugin: kr,
          SelectEventPlugin: Yr,
          BeforeInputEventPlugin: lr,
        });
      var oa = [],
        la = -1;
      function ua(e) {
        0 > la || ((e.current = oa[la]), (oa[la] = null), la--);
      }
      function sa(e, t) {
        la++, (oa[la] = e.current), (e.current = t);
      }
      var ca = {},
        fa = { current: ca },
        da = { current: !1 },
        pa = ca;
      function ha(e, t) {
        var n = e.type.contextTypes;
        if (!n) return ca;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
          return r.__reactInternalMemoizedMaskedChildContext;
        var a,
          i = {};
        for (a in n) i[a] = t[a];
        return (
          r &&
            (((e =
              e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
          i
        );
      }
      function ma(e) {
        return null != (e = e.childContextTypes);
      }
      function ga() {
        ua(da), ua(fa);
      }
      function ya(e, t, n) {
        if (fa.current !== ca) throw Error(o(168));
        sa(fa, t), sa(da, n);
      }
      function ba(e, t, n) {
        var r = e.stateNode;
        if (((e = t.childContextTypes), 'function' != typeof r.getChildContext))
          return n;
        for (var i in (r = r.getChildContext()))
          if (!(i in e)) throw Error(o(108, ge(t) || 'Unknown', i));
        return a({}, n, {}, r);
      }
      function va(e) {
        return (
          (e =
            ((e = e.stateNode) &&
              e.__reactInternalMemoizedMergedChildContext) ||
            ca),
          (pa = fa.current),
          sa(fa, e),
          sa(da, da.current),
          !0
        );
      }
      function xa(e, t, n) {
        var r = e.stateNode;
        if (!r) throw Error(o(169));
        n
          ? ((e = ba(e, t, pa)),
            (r.__reactInternalMemoizedMergedChildContext = e),
            ua(da),
            ua(fa),
            sa(fa, e))
          : ua(da),
          sa(da, n);
      }
      var Ea = i.unstable_runWithPriority,
        wa = i.unstable_scheduleCallback,
        Da = i.unstable_cancelCallback,
        ka = i.unstable_requestPaint,
        Ca = i.unstable_now,
        _a = i.unstable_getCurrentPriorityLevel,
        Aa = i.unstable_ImmediatePriority,
        Ta = i.unstable_UserBlockingPriority,
        Sa = i.unstable_NormalPriority,
        Na = i.unstable_LowPriority,
        Oa = i.unstable_IdlePriority,
        Fa = {},
        ja = i.unstable_shouldYield,
        Pa = void 0 !== ka ? ka : function() {},
        Ra = null,
        Ba = null,
        Ia = !1,
        Ma = Ca(),
        za =
          1e4 > Ma
            ? Ca
            : function() {
                return Ca() - Ma;
              };
      function La() {
        switch (_a()) {
          case Aa:
            return 99;
          case Ta:
            return 98;
          case Sa:
            return 97;
          case Na:
            return 96;
          case Oa:
            return 95;
          default:
            throw Error(o(332));
        }
      }
      function Ua(e) {
        switch (e) {
          case 99:
            return Aa;
          case 98:
            return Ta;
          case 97:
            return Sa;
          case 96:
            return Na;
          case 95:
            return Oa;
          default:
            throw Error(o(332));
        }
      }
      function $a(e, t) {
        return (e = Ua(e)), Ea(e, t);
      }
      function Ha(e, t, n) {
        return (e = Ua(e)), wa(e, t, n);
      }
      function Va(e) {
        return null === Ra ? ((Ra = [e]), (Ba = wa(Aa, qa))) : Ra.push(e), Fa;
      }
      function Wa() {
        if (null !== Ba) {
          var e = Ba;
          (Ba = null), Da(e);
        }
        qa();
      }
      function qa() {
        if (!Ia && null !== Ra) {
          Ia = !0;
          var e = 0;
          try {
            var t = Ra;
            $a(99, function() {
              for (; e < t.length; e++) {
                var n = t[e];
                do {
                  n = n(!0);
                } while (null !== n);
              }
            }),
              (Ra = null);
          } catch (t) {
            throw (null !== Ra && (Ra = Ra.slice(e + 1)), wa(Aa, Wa), t);
          } finally {
            Ia = !1;
          }
        }
      }
      function Ya(e, t, n) {
        return (
          1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n
        );
      }
      function Qa(e, t) {
        if (e && e.defaultProps)
          for (var n in ((t = a({}, t)), (e = e.defaultProps)))
            void 0 === t[n] && (t[n] = e[n]);
        return t;
      }
      var Ka = { current: null },
        Ga = null,
        Za = null,
        Xa = null;
      function Ja() {
        Xa = Za = Ga = null;
      }
      function ei(e) {
        var t = Ka.current;
        ua(Ka), (e.type._context._currentValue = t);
      }
      function ti(e, t) {
        for (; null !== e; ) {
          var n = e.alternate;
          if (e.childExpirationTime < t)
            (e.childExpirationTime = t),
              null !== n &&
                n.childExpirationTime < t &&
                (n.childExpirationTime = t);
          else {
            if (!(null !== n && n.childExpirationTime < t)) break;
            n.childExpirationTime = t;
          }
          e = e.return;
        }
      }
      function ni(e, t) {
        (Ga = e),
          (Xa = Za = null),
          null !== (e = e.dependencies) &&
            null !== e.firstContext &&
            (e.expirationTime >= t && (No = !0), (e.firstContext = null));
      }
      function ri(e, t) {
        if (Xa !== e && !1 !== t && 0 !== t)
          if (
            (('number' == typeof t && 1073741823 !== t) ||
              ((Xa = e), (t = 1073741823)),
            (t = { context: e, observedBits: t, next: null }),
            null === Za)
          ) {
            if (null === Ga) throw Error(o(308));
            (Za = t),
              (Ga.dependencies = {
                expirationTime: 0,
                firstContext: t,
                responders: null,
              });
          } else Za = Za.next = t;
        return e._currentValue;
      }
      var ai = !1;
      function ii(e) {
        e.updateQueue = {
          baseState: e.memoizedState,
          baseQueue: null,
          shared: { pending: null },
          effects: null,
        };
      }
      function oi(e, t) {
        (e = e.updateQueue),
          t.updateQueue === e &&
            (t.updateQueue = {
              baseState: e.baseState,
              baseQueue: e.baseQueue,
              shared: e.shared,
              effects: e.effects,
            });
      }
      function li(e, t) {
        return ((e = {
          expirationTime: e,
          suspenseConfig: t,
          tag: 0,
          payload: null,
          callback: null,
          next: null,
        }).next = e);
      }
      function ui(e, t) {
        if (null !== (e = e.updateQueue)) {
          var n = (e = e.shared).pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
      }
      function si(e, t) {
        var n = e.alternate;
        null !== n && oi(n, e),
          null === (n = (e = e.updateQueue).baseQueue)
            ? ((e.baseQueue = t.next = t), (t.next = t))
            : ((t.next = n.next), (n.next = t));
      }
      function ci(e, t, n, r) {
        var i = e.updateQueue;
        ai = !1;
        var o = i.baseQueue,
          l = i.shared.pending;
        if (null !== l) {
          if (null !== o) {
            var u = o.next;
            (o.next = l.next), (l.next = u);
          }
          (o = l),
            (i.shared.pending = null),
            null !== (u = e.alternate) &&
              null !== (u = u.updateQueue) && (u.baseQueue = l);
        }
        if (null !== o) {
          u = o.next;
          var s = i.baseState,
            c = 0,
            f = null,
            d = null,
            p = null;
          if (null !== u)
            for (var h = u; ; ) {
              if ((l = h.expirationTime) < r) {
                var m = {
                  expirationTime: h.expirationTime,
                  suspenseConfig: h.suspenseConfig,
                  tag: h.tag,
                  payload: h.payload,
                  callback: h.callback,
                  next: null,
                };
                null === p ? ((d = p = m), (f = s)) : (p = p.next = m),
                  l > c && (c = l);
              } else {
                null !== p &&
                  (p = p.next = {
                    expirationTime: 1073741823,
                    suspenseConfig: h.suspenseConfig,
                    tag: h.tag,
                    payload: h.payload,
                    callback: h.callback,
                    next: null,
                  }),
                  iu(l, h.suspenseConfig);
                e: {
                  var g = e,
                    y = h;
                  switch (((l = t), (m = n), y.tag)) {
                    case 1:
                      if ('function' == typeof (g = y.payload)) {
                        s = g.call(m, s, l);
                        break e;
                      }
                      s = g;
                      break e;
                    case 3:
                      g.effectTag = (-4097 & g.effectTag) | 64;
                    case 0:
                      if (
                        null ==
                        (l =
                          'function' == typeof (g = y.payload)
                            ? g.call(m, s, l)
                            : g)
                      )
                        break e;
                      s = a({}, s, l);
                      break e;
                    case 2:
                      ai = !0;
                  }
                }
                null !== h.callback &&
                  ((e.effectTag |= 32),
                  null === (l = i.effects) ? (i.effects = [h]) : l.push(h));
              }
              if (null === (h = h.next) || h === u) {
                if (null === (l = i.shared.pending)) break;
                (h = o.next = l.next),
                  (l.next = u),
                  (i.baseQueue = o = l),
                  (i.shared.pending = null);
              }
            }
          null === p ? (f = s) : (p.next = d),
            (i.baseState = f),
            (i.baseQueue = p),
            ou(c),
            (e.expirationTime = c),
            (e.memoizedState = s);
        }
      }
      function fi(e, t, n) {
        if (((e = t.effects), (t.effects = null), null !== e))
          for (t = 0; t < e.length; t++) {
            var r = e[t],
              a = r.callback;
            if (null !== a) {
              if (
                ((r.callback = null), (r = a), (a = n), 'function' != typeof r)
              )
                throw Error(o(191, r));
              r.call(a);
            }
          }
      }
      var di = G.ReactCurrentBatchConfig,
        pi = new r.Component().refs;
      function hi(e, t, n, r) {
        (n = null == (n = n(r, (t = e.memoizedState))) ? t : a({}, t, n)),
          (e.memoizedState = n),
          0 === e.expirationTime && (e.updateQueue.baseState = n);
      }
      var mi = {
        isMounted: function(e) {
          return !!(e = e._reactInternalFiber) && Je(e) === e;
        },
        enqueueSetState: function(e, t, n) {
          e = e._reactInternalFiber;
          var r = ql(),
            a = di.suspense;
          ((a = li((r = Yl(r, e, a)), a)).payload = t),
            null != n && (a.callback = n),
            ui(e, a),
            Ql(e, r);
        },
        enqueueReplaceState: function(e, t, n) {
          e = e._reactInternalFiber;
          var r = ql(),
            a = di.suspense;
          ((a = li((r = Yl(r, e, a)), a)).tag = 1),
            (a.payload = t),
            null != n && (a.callback = n),
            ui(e, a),
            Ql(e, r);
        },
        enqueueForceUpdate: function(e, t) {
          e = e._reactInternalFiber;
          var n = ql(),
            r = di.suspense;
          ((r = li((n = Yl(n, e, r)), r)).tag = 2),
            null != t && (r.callback = t),
            ui(e, r),
            Ql(e, n);
        },
      };
      function gi(e, t, n, r, a, i, o) {
        return 'function' == typeof (e = e.stateNode).shouldComponentUpdate
          ? e.shouldComponentUpdate(r, i, o)
          : !t.prototype ||
              !t.prototype.isPureReactComponent ||
              !zr(n, r) || !zr(a, i);
      }
      function yi(e, t, n) {
        var r = !1,
          a = ca,
          i = t.contextType;
        return (
          'object' == typeof i && null !== i
            ? (i = ri(i))
            : ((a = ma(t) ? pa : fa.current),
              (i = (r = null != (r = t.contextTypes)) ? ha(e, a) : ca)),
          (t = new t(n, i)),
          (e.memoizedState =
            null !== t.state && void 0 !== t.state ? t.state : null),
          (t.updater = mi),
          (e.stateNode = t),
          (t._reactInternalFiber = e),
          r &&
            (((e =
              e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
          t
        );
      }
      function bi(e, t, n, r) {
        (e = t.state),
          'function' == typeof t.componentWillReceiveProps &&
            t.componentWillReceiveProps(n, r),
          'function' == typeof t.UNSAFE_componentWillReceiveProps &&
            t.UNSAFE_componentWillReceiveProps(n, r),
          t.state !== e && mi.enqueueReplaceState(t, t.state, null);
      }
      function vi(e, t, n, r) {
        var a = e.stateNode;
        (a.props = n), (a.state = e.memoizedState), (a.refs = pi), ii(e);
        var i = t.contextType;
        'object' == typeof i && null !== i
          ? (a.context = ri(i))
          : ((i = ma(t) ? pa : fa.current), (a.context = ha(e, i))),
          ci(e, n, a, r),
          (a.state = e.memoizedState),
          'function' == typeof (i = t.getDerivedStateFromProps) &&
            (hi(e, t, i, n), (a.state = e.memoizedState)),
          'function' == typeof t.getDerivedStateFromProps ||
            'function' == typeof a.getSnapshotBeforeUpdate ||
            ('function' != typeof a.UNSAFE_componentWillMount &&
              'function' != typeof a.componentWillMount) ||
            ((t = a.state),
            'function' == typeof a.componentWillMount && a.componentWillMount(),
            'function' == typeof a.UNSAFE_componentWillMount &&
              a.UNSAFE_componentWillMount(),
            t !== a.state && mi.enqueueReplaceState(a, a.state, null),
            ci(e, n, a, r),
            (a.state = e.memoizedState)),
          'function' == typeof a.componentDidMount && (e.effectTag |= 4);
      }
      var xi = Array.isArray;
      function Ei(e, t, n) {
        if (
          null !== (e = n.ref) &&
          'function' != typeof e &&
          'object' != typeof e
        ) {
          if (n._owner) {
            if ((n = n._owner)) {
              if (1 !== n.tag) throw Error(o(309));
              var r = n.stateNode;
            }
            if (!r) throw Error(o(147, e));
            var a = '' + e;
            return null !== t &&
              null !== t.ref &&
              'function' == typeof t.ref &&
              t.ref._stringRef === a
              ? t.ref
              : (((t = function(e) {
                  var t = r.refs;
                  t === pi && (t = r.refs = {}),
                    null === e ? delete t[a] : (t[a] = e);
                })._stringRef = a),
                t);
          }
          if ('string' != typeof e) throw Error(o(284));
          if (!n._owner) throw Error(o(290, e));
        }
        return e;
      }
      function wi(e, t) {
        if ('textarea' !== e.type)
          throw Error(
            o(
              31,
              '[object Object]' === Object.prototype.toString.call(t)
                ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                : t,
              '',
            ),
          );
      }
      function Di(e) {
        function t(t, n) {
          if (e) {
            var r = t.lastEffect;
            null !== r
              ? ((r.nextEffect = n), (t.lastEffect = n))
              : (t.firstEffect = t.lastEffect = n),
              (n.nextEffect = null),
              (n.effectTag = 8);
          }
        }
        function n(n, r) {
          if (!e) return null;
          for (; null !== r; ) t(n, r), (r = r.sibling);
          return null;
        }
        function r(e, t) {
          for (e = new Map(); null !== t; )
            null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
              (t = t.sibling);
          return e;
        }
        function a(e, t) {
          return ((e = _u(e, t)).index = 0), (e.sibling = null), e;
        }
        function i(t, n, r) {
          return (
            (t.index = r),
            e
              ? null !== (r = t.alternate)
                ? (r = r.index) < n
                  ? ((t.effectTag = 2), n)
                  : r
                : ((t.effectTag = 2), n)
              : n
          );
        }
        function l(t) {
          return e && null === t.alternate && (t.effectTag = 2), t;
        }
        function u(e, t, n, r) {
          return null === t || 6 !== t.tag
            ? (((t = Su(n, e.mode, r)).return = e), t)
            : (((t = a(t, n)).return = e), t);
        }
        function s(e, t, n, r) {
          return null !== t && t.elementType === n.type
            ? (((r = a(t, n.props)).ref = Ei(e, t, n)), (r.return = e), r)
            : (((r = Au(n.type, n.key, n.props, null, e.mode, r)).ref = Ei(
                e,
                t,
                n,
              )),
              (r.return = e),
              r);
        }
        function c(e, t, n, r) {
          return null === t ||
            4 !== t.tag ||
            t.stateNode.containerInfo !== n.containerInfo ||
            t.stateNode.implementation !== n.implementation
            ? (((t = Nu(n, e.mode, r)).return = e), t)
            : (((t = a(t, n.children || [])).return = e), t);
        }
        function f(e, t, n, r, i) {
          return null === t || 7 !== t.tag
            ? (((t = Tu(n, e.mode, r, i)).return = e), t)
            : (((t = a(t, n)).return = e), t);
        }
        function d(e, t, n) {
          if ('string' == typeof t || 'number' == typeof t)
            return ((t = Su('' + t, e.mode, n)).return = e), t;
          if ('object' == typeof t && null !== t) {
            switch (t.$$typeof) {
              case ee:
                return (
                  ((n = Au(t.type, t.key, t.props, null, e.mode, n)).ref = Ei(
                    e,
                    null,
                    t,
                  )),
                  (n.return = e),
                  n
                );
              case te:
                return ((t = Nu(t, e.mode, n)).return = e), t;
            }
            if (xi(t) || me(t))
              return ((t = Tu(t, e.mode, n, null)).return = e), t;
            wi(e, t);
          }
          return null;
        }
        function p(e, t, n, r) {
          var a = null !== t ? t.key : null;
          if ('string' == typeof n || 'number' == typeof n)
            return null !== a ? null : u(e, t, '' + n, r);
          if ('object' == typeof n && null !== n) {
            switch (n.$$typeof) {
              case ee:
                return n.key === a
                  ? n.type === ne
                    ? f(e, t, n.props.children, r, a)
                    : s(e, t, n, r)
                  : null;
              case te:
                return n.key === a ? c(e, t, n, r) : null;
            }
            if (xi(n) || me(n)) return null !== a ? null : f(e, t, n, r, null);
            wi(e, n);
          }
          return null;
        }
        function h(e, t, n, r, a) {
          if ('string' == typeof r || 'number' == typeof r)
            return u(t, (e = e.get(n) || null), '' + r, a);
          if ('object' == typeof r && null !== r) {
            switch (r.$$typeof) {
              case ee:
                return (
                  (e = e.get(null === r.key ? n : r.key) || null),
                  r.type === ne
                    ? f(t, e, r.props.children, a, r.key)
                    : s(t, e, r, a)
                );
              case te:
                return c(
                  t,
                  (e = e.get(null === r.key ? n : r.key) || null),
                  r,
                  a,
                );
            }
            if (xi(r) || me(r)) return f(t, (e = e.get(n) || null), r, a, null);
            wi(t, r);
          }
          return null;
        }
        function m(a, o, l, u) {
          for (
            var s = null, c = null, f = o, m = (o = 0), g = null;
            null !== f && m < l.length;
            m++
          ) {
            f.index > m ? ((g = f), (f = null)) : (g = f.sibling);
            var y = p(a, f, l[m], u);
            if (null === y) {
              null === f && (f = g);
              break;
            }
            e && f && null === y.alternate && t(a, f),
              (o = i(y, o, m)),
              null === c ? (s = y) : (c.sibling = y),
              (c = y),
              (f = g);
          }
          if (m === l.length) return n(a, f), s;
          if (null === f) {
            for (; m < l.length; m++)
              null !== (f = d(a, l[m], u)) &&
                ((o = i(f, o, m)),
                null === c ? (s = f) : (c.sibling = f),
                (c = f));
            return s;
          }
          for (f = r(a, f); m < l.length; m++)
            null !== (g = h(f, a, m, l[m], u)) &&
              (e &&
                null !== g.alternate &&
                f.delete(null === g.key ? m : g.key),
              (o = i(g, o, m)),
              null === c ? (s = g) : (c.sibling = g),
              (c = g));
          return (
            e &&
              f.forEach(function(e) {
                return t(a, e);
              }),
            s
          );
        }
        function g(a, l, u, s) {
          var c = me(u);
          if ('function' != typeof c) throw Error(o(150));
          if (null == (u = c.call(u))) throw Error(o(151));
          for (
            var f = (c = null), m = l, g = (l = 0), y = null, b = u.next();
            null !== m && !b.done;
            g++, b = u.next()
          ) {
            m.index > g ? ((y = m), (m = null)) : (y = m.sibling);
            var v = p(a, m, b.value, s);
            if (null === v) {
              null === m && (m = y);
              break;
            }
            e && m && null === v.alternate && t(a, m),
              (l = i(v, l, g)),
              null === f ? (c = v) : (f.sibling = v),
              (f = v),
              (m = y);
          }
          if (b.done) return n(a, m), c;
          if (null === m) {
            for (; !b.done; g++, b = u.next())
              null !== (b = d(a, b.value, s)) &&
                ((l = i(b, l, g)),
                null === f ? (c = b) : (f.sibling = b),
                (f = b));
            return c;
          }
          for (m = r(a, m); !b.done; g++, b = u.next())
            null !== (b = h(m, a, g, b.value, s)) &&
              (e &&
                null !== b.alternate &&
                m.delete(null === b.key ? g : b.key),
              (l = i(b, l, g)),
              null === f ? (c = b) : (f.sibling = b),
              (f = b));
          return (
            e &&
              m.forEach(function(e) {
                return t(a, e);
              }),
            c
          );
        }
        return function(e, r, i, u) {
          var s =
            'object' == typeof i &&
            null !== i &&
            i.type === ne &&
            null === i.key;
          s && (i = i.props.children);
          var c = 'object' == typeof i && null !== i;
          if (c)
            switch (i.$$typeof) {
              case ee:
                e: {
                  for (c = i.key, s = r; null !== s; ) {
                    if (s.key === c) {
                      switch (s.tag) {
                        case 7:
                          if (i.type === ne) {
                            n(e, s.sibling),
                              ((r = a(s, i.props.children)).return = e),
                              (e = r);
                            break e;
                          }
                          break;
                        default:
                          if (s.elementType === i.type) {
                            n(e, s.sibling),
                              ((r = a(s, i.props)).ref = Ei(e, s, i)),
                              (r.return = e),
                              (e = r);
                            break e;
                          }
                      }
                      n(e, s);
                      break;
                    }
                    t(e, s), (s = s.sibling);
                  }
                  i.type === ne
                    ? (((r = Tu(
                        i.props.children,
                        e.mode,
                        u,
                        i.key,
                      )).return = e),
                      (e = r))
                    : (((u = Au(
                        i.type,
                        i.key,
                        i.props,
                        null,
                        e.mode,
                        u,
                      )).ref = Ei(e, r, i)),
                      (u.return = e),
                      (e = u));
                }
                return l(e);
              case te:
                e: {
                  for (s = i.key; null !== r; ) {
                    if (r.key === s) {
                      if (
                        4 === r.tag &&
                        r.stateNode.containerInfo === i.containerInfo &&
                        r.stateNode.implementation === i.implementation
                      ) {
                        n(e, r.sibling),
                          ((r = a(r, i.children || [])).return = e),
                          (e = r);
                        break e;
                      }
                      n(e, r);
                      break;
                    }
                    t(e, r), (r = r.sibling);
                  }
                  ((r = Nu(i, e.mode, u)).return = e), (e = r);
                }
                return l(e);
            }
          if ('string' == typeof i || 'number' == typeof i)
            return (
              (i = '' + i),
              null !== r && 6 === r.tag
                ? (n(e, r.sibling), ((r = a(r, i)).return = e), (e = r))
                : (n(e, r), ((r = Su(i, e.mode, u)).return = e), (e = r)),
              l(e)
            );
          if (xi(i)) return m(e, r, i, u);
          if (me(i)) return g(e, r, i, u);
          if ((c && wi(e, i), void 0 === i && !s))
            switch (e.tag) {
              case 1:
              case 0:
                throw ((e = e.type),
                Error(o(152, e.displayName || e.name || 'Component')));
            }
          return n(e, r);
        };
      }
      var ki = Di(!0),
        Ci = Di(!1),
        _i = {},
        Ai = { current: _i },
        Ti = { current: _i },
        Si = { current: _i };
      function Ni(e) {
        if (e === _i) throw Error(o(174));
        return e;
      }
      function Oi(e, t) {
        switch ((sa(Si, t), sa(Ti, e), sa(Ai, _i), (e = t.nodeType))) {
          case 9:
          case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Ie(null, '');
            break;
          default:
            t = Ie(
              (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
              (e = e.tagName),
            );
        }
        ua(Ai), sa(Ai, t);
      }
      function Fi() {
        ua(Ai), ua(Ti), ua(Si);
      }
      function ji(e) {
        Ni(Si.current);
        var t = Ni(Ai.current),
          n = Ie(t, e.type);
        t !== n && (sa(Ti, e), sa(Ai, n));
      }
      function Pi(e) {
        Ti.current === e && (ua(Ai), ua(Ti));
      }
      var Ri = { current: 0 };
      function Bi(e) {
        for (var t = e; null !== t; ) {
          if (13 === t.tag) {
            var n = t.memoizedState;
            if (
              null !== n &&
              (null === (n = n.dehydrated) ||
                '$?' === n.data ||
                '$!' === n.data)
            )
              return t;
          } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
            if (0 != (64 & t.effectTag)) return t;
          } else if (null !== t.child) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === e) break;
          for (; null === t.sibling; ) {
            if (null === t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
        return null;
      }
      function Ii(e, t) {
        return { responder: e, props: t };
      }
      var Mi = G.ReactCurrentDispatcher,
        zi = G.ReactCurrentBatchConfig,
        Li = 0,
        Ui = null,
        $i = null,
        Hi = null,
        Vi = !1;
      function Wi() {
        throw Error(o(321));
      }
      function qi(e, t) {
        if (null === t) return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
          if (!Ir(e[n], t[n])) return !1;
        return !0;
      }
      function Yi(e, t, n, r, a, i) {
        if (
          ((Li = i),
          (Ui = t),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.expirationTime = 0),
          (Mi.current = null === e || null === e.memoizedState ? yo : bo),
          (e = n(r, a)),
          t.expirationTime === Li)
        ) {
          i = 0;
          do {
            if (((t.expirationTime = 0), !(25 > i))) throw Error(o(301));
            (i += 1),
              (Hi = $i = null),
              (t.updateQueue = null),
              (Mi.current = vo),
              (e = n(r, a));
          } while (t.expirationTime === Li);
        }
        if (
          ((Mi.current = go),
          (t = null !== $i && null !== $i.next),
          (Li = 0),
          (Hi = $i = Ui = null),
          (Vi = !1),
          t)
        )
          throw Error(o(300));
        return e;
      }
      function Qi() {
        var e = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null,
        };
        return (
          null === Hi ? (Ui.memoizedState = Hi = e) : (Hi = Hi.next = e), Hi
        );
      }
      function Ki() {
        if (null === $i) {
          var e = Ui.alternate;
          e = null !== e ? e.memoizedState : null;
        } else e = $i.next;
        var t = null === Hi ? Ui.memoizedState : Hi.next;
        if (null !== t) (Hi = t), ($i = e);
        else {
          if (null === e) throw Error(o(310));
          (e = {
            memoizedState: ($i = e).memoizedState,
            baseState: $i.baseState,
            baseQueue: $i.baseQueue,
            queue: $i.queue,
            next: null,
          }),
            null === Hi ? (Ui.memoizedState = Hi = e) : (Hi = Hi.next = e);
        }
        return Hi;
      }
      function Gi(e, t) {
        return 'function' == typeof t ? t(e) : t;
      }
      function Zi(e) {
        var t = Ki(),
          n = t.queue;
        if (null === n) throw Error(o(311));
        n.lastRenderedReducer = e;
        var r = $i,
          a = r.baseQueue,
          i = n.pending;
        if (null !== i) {
          if (null !== a) {
            var l = a.next;
            (a.next = i.next), (i.next = l);
          }
          (r.baseQueue = a = i), (n.pending = null);
        }
        if (null !== a) {
          (a = a.next), (r = r.baseState);
          var u = (l = i = null),
            s = a;
          do {
            var c = s.expirationTime;
            if (c < Li) {
              var f = {
                expirationTime: s.expirationTime,
                suspenseConfig: s.suspenseConfig,
                action: s.action,
                eagerReducer: s.eagerReducer,
                eagerState: s.eagerState,
                next: null,
              };
              null === u ? ((l = u = f), (i = r)) : (u = u.next = f),
                c > Ui.expirationTime && ((Ui.expirationTime = c), ou(c));
            } else
              null !== u &&
                (u = u.next = {
                  expirationTime: 1073741823,
                  suspenseConfig: s.suspenseConfig,
                  action: s.action,
                  eagerReducer: s.eagerReducer,
                  eagerState: s.eagerState,
                  next: null,
                }),
                iu(c, s.suspenseConfig),
                (r = s.eagerReducer === e ? s.eagerState : e(r, s.action));
            s = s.next;
          } while (null !== s && s !== a);
          null === u ? (i = r) : (u.next = l),
            Ir(r, t.memoizedState) || (No = !0),
            (t.memoizedState = r),
            (t.baseState = i),
            (t.baseQueue = u),
            (n.lastRenderedState = r);
        }
        return [t.memoizedState, n.dispatch];
      }
      function Xi(e) {
        var t = Ki(),
          n = t.queue;
        if (null === n) throw Error(o(311));
        n.lastRenderedReducer = e;
        var r = n.dispatch,
          a = n.pending,
          i = t.memoizedState;
        if (null !== a) {
          n.pending = null;
          var l = (a = a.next);
          do {
            (i = e(i, l.action)), (l = l.next);
          } while (l !== a);
          Ir(i, t.memoizedState) || (No = !0),
            (t.memoizedState = i),
            null === t.baseQueue && (t.baseState = i),
            (n.lastRenderedState = i);
        }
        return [i, r];
      }
      function Ji(e) {
        var t = Qi();
        return (
          'function' == typeof e && (e = e()),
          (t.memoizedState = t.baseState = e),
          (e = (e = t.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: Gi,
            lastRenderedState: e,
          }).dispatch = mo.bind(null, Ui, e)),
          [t.memoizedState, e]
        );
      }
      function eo(e, t, n, r) {
        return (
          (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
          null === (t = Ui.updateQueue)
            ? ((t = { lastEffect: null }),
              (Ui.updateQueue = t),
              (t.lastEffect = e.next = e))
            : null === (n = t.lastEffect)
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
          e
        );
      }
      function to() {
        return Ki().memoizedState;
      }
      function no(e, t, n, r) {
        var a = Qi();
        (Ui.effectTag |= e),
          (a.memoizedState = eo(1 | t, n, void 0, void 0 === r ? null : r));
      }
      function ro(e, t, n, r) {
        var a = Ki();
        r = void 0 === r ? null : r;
        var i = void 0;
        if (null !== $i) {
          var o = $i.memoizedState;
          if (((i = o.destroy), null !== r && qi(r, o.deps)))
            return void eo(t, n, i, r);
        }
        (Ui.effectTag |= e), (a.memoizedState = eo(1 | t, n, i, r));
      }
      function ao(e, t) {
        return no(516, 4, e, t);
      }
      function io(e, t) {
        return ro(516, 4, e, t);
      }
      function oo(e, t) {
        return ro(4, 2, e, t);
      }
      function lo(e, t) {
        return 'function' == typeof t
          ? ((e = e()),
            t(e),
            function() {
              t(null);
            })
          : null != t
          ? ((e = e()),
            (t.current = e),
            function() {
              t.current = null;
            })
          : void 0;
      }
      function uo(e, t, n) {
        return (
          (n = null != n ? n.concat([e]) : null),
          ro(4, 2, lo.bind(null, t, e), n)
        );
      }
      function so() {}
      function co(e, t) {
        return (Qi().memoizedState = [e, void 0 === t ? null : t]), e;
      }
      function fo(e, t) {
        var n = Ki();
        t = void 0 === t ? null : t;
        var r = n.memoizedState;
        return null !== r && null !== t && qi(t, r[1])
          ? r[0]
          : ((n.memoizedState = [e, t]), e);
      }
      function po(e, t) {
        var n = Ki();
        t = void 0 === t ? null : t;
        var r = n.memoizedState;
        return null !== r && null !== t && qi(t, r[1])
          ? r[0]
          : ((e = e()), (n.memoizedState = [e, t]), e);
      }
      function ho(e, t, n) {
        var r = La();
        $a(98 > r ? 98 : r, function() {
          e(!0);
        }),
          $a(97 < r ? 97 : r, function() {
            var r = zi.suspense;
            zi.suspense = void 0 === t ? null : t;
            try {
              e(!1), n();
            } finally {
              zi.suspense = r;
            }
          });
      }
      function mo(e, t, n) {
        var r = ql(),
          a = di.suspense;
        a = {
          expirationTime: (r = Yl(r, e, a)),
          suspenseConfig: a,
          action: n,
          eagerReducer: null,
          eagerState: null,
          next: null,
        };
        var i = t.pending;
        if (
          (null === i ? (a.next = a) : ((a.next = i.next), (i.next = a)),
          (t.pending = a),
          (i = e.alternate),
          e === Ui || (null !== i && i === Ui))
        )
          (Vi = !0), (a.expirationTime = Li), (Ui.expirationTime = Li);
        else {
          if (
            0 === e.expirationTime &&
            (null === i || 0 === i.expirationTime) &&
            null !== (i = t.lastRenderedReducer)
          )
            try {
              var o = t.lastRenderedState,
                l = i(o, n);
              if (((a.eagerReducer = i), (a.eagerState = l), Ir(l, o))) return;
            } catch (e) {}
          Ql(e, r);
        }
      }
      var go = {
          readContext: ri,
          useCallback: Wi,
          useContext: Wi,
          useEffect: Wi,
          useImperativeHandle: Wi,
          useLayoutEffect: Wi,
          useMemo: Wi,
          useReducer: Wi,
          useRef: Wi,
          useState: Wi,
          useDebugValue: Wi,
          useResponder: Wi,
          useDeferredValue: Wi,
          useTransition: Wi,
        },
        yo = {
          readContext: ri,
          useCallback: co,
          useContext: ri,
          useEffect: ao,
          useImperativeHandle: function(e, t, n) {
            return (
              (n = null != n ? n.concat([e]) : null),
              no(4, 2, lo.bind(null, t, e), n)
            );
          },
          useLayoutEffect: function(e, t) {
            return no(4, 2, e, t);
          },
          useMemo: function(e, t) {
            var n = Qi();
            return (
              (t = void 0 === t ? null : t),
              (e = e()),
              (n.memoizedState = [e, t]),
              e
            );
          },
          useReducer: function(e, t, n) {
            var r = Qi();
            return (
              (t = void 0 !== n ? n(t) : t),
              (r.memoizedState = r.baseState = t),
              (e = (e = r.queue = {
                pending: null,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t,
              }).dispatch = mo.bind(null, Ui, e)),
              [r.memoizedState, e]
            );
          },
          useRef: function(e) {
            return (e = { current: e }), (Qi().memoizedState = e);
          },
          useState: Ji,
          useDebugValue: so,
          useResponder: Ii,
          useDeferredValue: function(e, t) {
            var n = Ji(e),
              r = n[0],
              a = n[1];
            return (
              ao(
                function() {
                  var n = zi.suspense;
                  zi.suspense = void 0 === t ? null : t;
                  try {
                    a(e);
                  } finally {
                    zi.suspense = n;
                  }
                },
                [e, t],
              ),
              r
            );
          },
          useTransition: function(e) {
            var t = Ji(!1),
              n = t[0];
            return (t = t[1]), [co(ho.bind(null, t, e), [t, e]), n];
          },
        },
        bo = {
          readContext: ri,
          useCallback: fo,
          useContext: ri,
          useEffect: io,
          useImperativeHandle: uo,
          useLayoutEffect: oo,
          useMemo: po,
          useReducer: Zi,
          useRef: to,
          useState: function() {
            return Zi(Gi);
          },
          useDebugValue: so,
          useResponder: Ii,
          useDeferredValue: function(e, t) {
            var n = Zi(Gi),
              r = n[0],
              a = n[1];
            return (
              io(
                function() {
                  var n = zi.suspense;
                  zi.suspense = void 0 === t ? null : t;
                  try {
                    a(e);
                  } finally {
                    zi.suspense = n;
                  }
                },
                [e, t],
              ),
              r
            );
          },
          useTransition: function(e) {
            var t = Zi(Gi),
              n = t[0];
            return (t = t[1]), [fo(ho.bind(null, t, e), [t, e]), n];
          },
        },
        vo = {
          readContext: ri,
          useCallback: fo,
          useContext: ri,
          useEffect: io,
          useImperativeHandle: uo,
          useLayoutEffect: oo,
          useMemo: po,
          useReducer: Xi,
          useRef: to,
          useState: function() {
            return Xi(Gi);
          },
          useDebugValue: so,
          useResponder: Ii,
          useDeferredValue: function(e, t) {
            var n = Xi(Gi),
              r = n[0],
              a = n[1];
            return (
              io(
                function() {
                  var n = zi.suspense;
                  zi.suspense = void 0 === t ? null : t;
                  try {
                    a(e);
                  } finally {
                    zi.suspense = n;
                  }
                },
                [e, t],
              ),
              r
            );
          },
          useTransition: function(e) {
            var t = Xi(Gi),
              n = t[0];
            return (t = t[1]), [fo(ho.bind(null, t, e), [t, e]), n];
          },
        },
        xo = null,
        Eo = null,
        wo = !1;
      function Do(e, t) {
        var n = ku(5, null, null, 0);
        (n.elementType = 'DELETED'),
          (n.type = 'DELETED'),
          (n.stateNode = t),
          (n.return = e),
          (n.effectTag = 8),
          null !== e.lastEffect
            ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
            : (e.firstEffect = e.lastEffect = n);
      }
      function ko(e, t) {
        switch (e.tag) {
          case 5:
            var n = e.type;
            return (
              null !==
                (t =
                  1 !== t.nodeType ||
                  n.toLowerCase() !== t.nodeName.toLowerCase()
                    ? null
                    : t) && ((e.stateNode = t), !0)
            );
          case 6:
            return (
              null !==
                (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
              ((e.stateNode = t), !0)
            );
          case 13:
          default:
            return !1;
        }
      }
      function Co(e) {
        if (wo) {
          var t = Eo;
          if (t) {
            var n = t;
            if (!ko(e, t)) {
              if (!(t = En(n.nextSibling)) || !ko(e, t))
                return (
                  (e.effectTag = (-1025 & e.effectTag) | 2),
                  (wo = !1),
                  void (xo = e)
                );
              Do(xo, n);
            }
            (xo = e), (Eo = En(t.firstChild));
          } else (e.effectTag = (-1025 & e.effectTag) | 2), (wo = !1), (xo = e);
        }
      }
      function _o(e) {
        for (
          e = e.return;
          null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

        )
          e = e.return;
        xo = e;
      }
      function Ao(e) {
        if (e !== xo) return !1;
        if (!wo) return _o(e), (wo = !0), !1;
        var t = e.type;
        if (
          5 !== e.tag ||
          ('head' !== t && 'body' !== t && !bn(t, e.memoizedProps))
        )
          for (t = Eo; t; ) Do(e, t), (t = En(t.nextSibling));
        if ((_o(e), 13 === e.tag)) {
          if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
            throw Error(o(317));
          e: {
            for (e = e.nextSibling, t = 0; e; ) {
              if (8 === e.nodeType) {
                var n = e.data;
                if ('/$' === n) {
                  if (0 === t) {
                    Eo = En(e.nextSibling);
                    break e;
                  }
                  t--;
                } else ('$' !== n && '$!' !== n && '$?' !== n) || t++;
              }
              e = e.nextSibling;
            }
            Eo = null;
          }
        } else Eo = xo ? En(e.stateNode.nextSibling) : null;
        return !0;
      }
      function To() {
        (Eo = xo = null), (wo = !1);
      }
      var So = G.ReactCurrentOwner,
        No = !1;
      function Oo(e, t, n, r) {
        t.child = null === e ? Ci(t, null, n, r) : ki(t, e.child, n, r);
      }
      function Fo(e, t, n, r, a) {
        n = n.render;
        var i = t.ref;
        return (
          ni(t, a),
          (r = Yi(e, t, n, r, i, a)),
          null === e || No
            ? ((t.effectTag |= 1), Oo(e, t, r, a), t.child)
            : ((t.updateQueue = e.updateQueue),
              (t.effectTag &= -517),
              e.expirationTime <= a && (e.expirationTime = 0),
              Qo(e, t, a))
        );
      }
      function jo(e, t, n, r, a, i) {
        if (null === e) {
          var o = n.type;
          return 'function' != typeof o ||
            Cu(o) ||
            void 0 !== o.defaultProps ||
            null !== n.compare ||
            void 0 !== n.defaultProps
            ? (((e = Au(n.type, null, r, null, t.mode, i)).ref = t.ref),
              (e.return = t),
              (t.child = e))
            : ((t.tag = 15), (t.type = o), Po(e, t, o, r, a, i));
        }
        return (
          (o = e.child),
          a < i &&
          ((a = o.memoizedProps),
          (n = null !== (n = n.compare) ? n : zr)(a, r) && e.ref === t.ref)
            ? Qo(e, t, i)
            : ((t.effectTag |= 1),
              ((e = _u(o, r)).ref = t.ref),
              (e.return = t),
              (t.child = e))
        );
      }
      function Po(e, t, n, r, a, i) {
        return null !== e &&
          zr(e.memoizedProps, r) &&
          e.ref === t.ref &&
          ((No = !1), a < i)
          ? ((t.expirationTime = e.expirationTime), Qo(e, t, i))
          : Bo(e, t, n, r, i);
      }
      function Ro(e, t) {
        var n = t.ref;
        ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
          (t.effectTag |= 128);
      }
      function Bo(e, t, n, r, a) {
        var i = ma(n) ? pa : fa.current;
        return (
          (i = ha(t, i)),
          ni(t, a),
          (n = Yi(e, t, n, r, i, a)),
          null === e || No
            ? ((t.effectTag |= 1), Oo(e, t, n, a), t.child)
            : ((t.updateQueue = e.updateQueue),
              (t.effectTag &= -517),
              e.expirationTime <= a && (e.expirationTime = 0),
              Qo(e, t, a))
        );
      }
      function Io(e, t, n, r, a) {
        if (ma(n)) {
          var i = !0;
          va(t);
        } else i = !1;
        if ((ni(t, a), null === t.stateNode))
          null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            yi(t, n, r),
            vi(t, n, r, a),
            (r = !0);
        else if (null === e) {
          var o = t.stateNode,
            l = t.memoizedProps;
          o.props = l;
          var u = o.context,
            s = n.contextType;
          'object' == typeof s && null !== s
            ? (s = ri(s))
            : (s = ha(t, (s = ma(n) ? pa : fa.current)));
          var c = n.getDerivedStateFromProps,
            f =
              'function' == typeof c ||
              'function' == typeof o.getSnapshotBeforeUpdate;
          f ||
            ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
              'function' != typeof o.componentWillReceiveProps) ||
            ((l !== r || u !== s) && bi(t, o, r, s)),
            (ai = !1);
          var d = t.memoizedState;
          (o.state = d),
            ci(t, r, o, a),
            (u = t.memoizedState),
            l !== r || d !== u || da.current || ai
              ? ('function' == typeof c &&
                  (hi(t, n, c, r), (u = t.memoizedState)),
                (l = ai || gi(t, n, l, r, d, u, s))
                  ? (f ||
                      ('function' != typeof o.UNSAFE_componentWillMount &&
                        'function' != typeof o.componentWillMount) ||
                      ('function' == typeof o.componentWillMount &&
                        o.componentWillMount(),
                      'function' == typeof o.UNSAFE_componentWillMount &&
                        o.UNSAFE_componentWillMount()),
                    'function' == typeof o.componentDidMount &&
                      (t.effectTag |= 4))
                  : ('function' == typeof o.componentDidMount &&
                      (t.effectTag |= 4),
                    (t.memoizedProps = r),
                    (t.memoizedState = u)),
                (o.props = r),
                (o.state = u),
                (o.context = s),
                (r = l))
              : ('function' == typeof o.componentDidMount && (t.effectTag |= 4),
                (r = !1));
        } else
          (o = t.stateNode),
            oi(e, t),
            (l = t.memoizedProps),
            (o.props = t.type === t.elementType ? l : Qa(t.type, l)),
            (u = o.context),
            'object' == typeof (s = n.contextType) && null !== s
              ? (s = ri(s))
              : (s = ha(t, (s = ma(n) ? pa : fa.current))),
            (f =
              'function' == typeof (c = n.getDerivedStateFromProps) ||
              'function' == typeof o.getSnapshotBeforeUpdate) ||
              ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
                'function' != typeof o.componentWillReceiveProps) ||
              ((l !== r || u !== s) && bi(t, o, r, s)),
            (ai = !1),
            (u = t.memoizedState),
            (o.state = u),
            ci(t, r, o, a),
            (d = t.memoizedState),
            l !== r || u !== d || da.current || ai
              ? ('function' == typeof c &&
                  (hi(t, n, c, r), (d = t.memoizedState)),
                (c = ai || gi(t, n, l, r, u, d, s))
                  ? (f ||
                      ('function' != typeof o.UNSAFE_componentWillUpdate &&
                        'function' != typeof o.componentWillUpdate) ||
                      ('function' == typeof o.componentWillUpdate &&
                        o.componentWillUpdate(r, d, s),
                      'function' == typeof o.UNSAFE_componentWillUpdate &&
                        o.UNSAFE_componentWillUpdate(r, d, s)),
                    'function' == typeof o.componentDidUpdate &&
                      (t.effectTag |= 4),
                    'function' == typeof o.getSnapshotBeforeUpdate &&
                      (t.effectTag |= 256))
                  : ('function' != typeof o.componentDidUpdate ||
                      (l === e.memoizedProps && u === e.memoizedState) ||
                      (t.effectTag |= 4),
                    'function' != typeof o.getSnapshotBeforeUpdate ||
                      (l === e.memoizedProps && u === e.memoizedState) ||
                      (t.effectTag |= 256),
                    (t.memoizedProps = r),
                    (t.memoizedState = d)),
                (o.props = r),
                (o.state = d),
                (o.context = s),
                (r = c))
              : ('function' != typeof o.componentDidUpdate ||
                  (l === e.memoizedProps && u === e.memoizedState) ||
                  (t.effectTag |= 4),
                'function' != typeof o.getSnapshotBeforeUpdate ||
                  (l === e.memoizedProps && u === e.memoizedState) ||
                  (t.effectTag |= 256),
                (r = !1));
        return Mo(e, t, n, r, i, a);
      }
      function Mo(e, t, n, r, a, i) {
        Ro(e, t);
        var o = 0 != (64 & t.effectTag);
        if (!r && !o) return a && xa(t, n, !1), Qo(e, t, i);
        (r = t.stateNode), (So.current = t);
        var l =
          o && 'function' != typeof n.getDerivedStateFromError
            ? null
            : r.render();
        return (
          (t.effectTag |= 1),
          null !== e && o
            ? ((t.child = ki(t, e.child, null, i)),
              (t.child = ki(t, null, l, i)))
            : Oo(e, t, l, i),
          (t.memoizedState = r.state),
          a && xa(t, n, !0),
          t.child
        );
      }
      function zo(e) {
        var t = e.stateNode;
        t.pendingContext
          ? ya(0, t.pendingContext, t.pendingContext !== t.context)
          : t.context && ya(0, t.context, !1),
          Oi(e, t.containerInfo);
      }
      var Lo,
        Uo,
        $o,
        Ho = { dehydrated: null, retryTime: 0 };
      function Vo(e, t, n) {
        var r,
          a = t.mode,
          i = t.pendingProps,
          o = Ri.current,
          l = !1;
        if (
          ((r = 0 != (64 & t.effectTag)) ||
            (r = 0 != (2 & o) && (null === e || null !== e.memoizedState)),
          r
            ? ((l = !0), (t.effectTag &= -65))
            : (null !== e && null === e.memoizedState) ||
              void 0 === i.fallback ||
              !0 === i.unstable_avoidThisFallback ||
              (o |= 1),
          sa(Ri, 1 & o),
          null === e)
        ) {
          if ((void 0 !== i.fallback && Co(t), l)) {
            if (
              ((l = i.fallback),
              ((i = Tu(null, a, 0, null)).return = t),
              0 == (2 & t.mode))
            )
              for (
                e = null !== t.memoizedState ? t.child.child : t.child,
                  i.child = e;
                null !== e;

              )
                (e.return = i), (e = e.sibling);
            return (
              ((n = Tu(l, a, n, null)).return = t),
              (i.sibling = n),
              (t.memoizedState = Ho),
              (t.child = i),
              n
            );
          }
          return (
            (a = i.children),
            (t.memoizedState = null),
            (t.child = Ci(t, null, a, n))
          );
        }
        if (null !== e.memoizedState) {
          if (((a = (e = e.child).sibling), l)) {
            if (
              ((i = i.fallback),
              ((n = _u(e, e.pendingProps)).return = t),
              0 == (2 & t.mode) &&
                (l = null !== t.memoizedState ? t.child.child : t.child) !==
                  e.child)
            )
              for (n.child = l; null !== l; ) (l.return = n), (l = l.sibling);
            return (
              ((a = _u(a, i)).return = t),
              (n.sibling = a),
              (n.childExpirationTime = 0),
              (t.memoizedState = Ho),
              (t.child = n),
              a
            );
          }
          return (
            (n = ki(t, e.child, i.children, n)),
            (t.memoizedState = null),
            (t.child = n)
          );
        }
        if (((e = e.child), l)) {
          if (
            ((l = i.fallback),
            ((i = Tu(null, a, 0, null)).return = t),
            (i.child = e),
            null !== e && (e.return = i),
            0 == (2 & t.mode))
          )
            for (
              e = null !== t.memoizedState ? t.child.child : t.child,
                i.child = e;
              null !== e;

            )
              (e.return = i), (e = e.sibling);
          return (
            ((n = Tu(l, a, n, null)).return = t),
            (i.sibling = n),
            (n.effectTag |= 2),
            (i.childExpirationTime = 0),
            (t.memoizedState = Ho),
            (t.child = i),
            n
          );
        }
        return (t.memoizedState = null), (t.child = ki(t, e, i.children, n));
      }
      function Wo(e, t) {
        e.expirationTime < t && (e.expirationTime = t);
        var n = e.alternate;
        null !== n && n.expirationTime < t && (n.expirationTime = t),
          ti(e.return, t);
      }
      function qo(e, t, n, r, a, i) {
        var o = e.memoizedState;
        null === o
          ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailExpiration: 0,
              tailMode: a,
              lastEffect: i,
            })
          : ((o.isBackwards = t),
            (o.rendering = null),
            (o.renderingStartTime = 0),
            (o.last = r),
            (o.tail = n),
            (o.tailExpiration = 0),
            (o.tailMode = a),
            (o.lastEffect = i));
      }
      function Yo(e, t, n) {
        var r = t.pendingProps,
          a = r.revealOrder,
          i = r.tail;
        if ((Oo(e, t, r.children, n), 0 != (2 & (r = Ri.current))))
          (r = (1 & r) | 2), (t.effectTag |= 64);
        else {
          if (null !== e && 0 != (64 & e.effectTag))
            e: for (e = t.child; null !== e; ) {
              if (13 === e.tag) null !== e.memoizedState && Wo(e, n);
              else if (19 === e.tag) Wo(e, n);
              else if (null !== e.child) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === t) break e;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === t) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          r &= 1;
        }
        if ((sa(Ri, r), 0 == (2 & t.mode))) t.memoizedState = null;
        else
          switch (a) {
            case 'forwards':
              for (n = t.child, a = null; null !== n; )
                null !== (e = n.alternate) && null === Bi(e) && (a = n),
                  (n = n.sibling);
              null === (n = a)
                ? ((a = t.child), (t.child = null))
                : ((a = n.sibling), (n.sibling = null)),
                qo(t, !1, a, n, i, t.lastEffect);
              break;
            case 'backwards':
              for (n = null, a = t.child, t.child = null; null !== a; ) {
                if (null !== (e = a.alternate) && null === Bi(e)) {
                  t.child = a;
                  break;
                }
                (e = a.sibling), (a.sibling = n), (n = a), (a = e);
              }
              qo(t, !0, n, null, i, t.lastEffect);
              break;
            case 'together':
              qo(t, !1, null, null, void 0, t.lastEffect);
              break;
            default:
              t.memoizedState = null;
          }
        return t.child;
      }
      function Qo(e, t, n) {
        null !== e && (t.dependencies = e.dependencies);
        var r = t.expirationTime;
        if ((0 !== r && ou(r), t.childExpirationTime < n)) return null;
        if (null !== e && t.child !== e.child) throw Error(o(153));
        if (null !== t.child) {
          for (
            n = _u((e = t.child), e.pendingProps), t.child = n, n.return = t;
            null !== e.sibling;

          )
            (e = e.sibling),
              ((n = n.sibling = _u(e, e.pendingProps)).return = t);
          n.sibling = null;
        }
        return t.child;
      }
      function Ko(e, t) {
        switch (e.tailMode) {
          case 'hidden':
            t = e.tail;
            for (var n = null; null !== t; )
              null !== t.alternate && (n = t), (t = t.sibling);
            null === n ? (e.tail = null) : (n.sibling = null);
            break;
          case 'collapsed':
            n = e.tail;
            for (var r = null; null !== n; )
              null !== n.alternate && (r = n), (n = n.sibling);
            null === r
              ? t || null === e.tail
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
      }
      function Go(e, t, n) {
        var r = t.pendingProps;
        switch (t.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return null;
          case 1:
            return ma(t.type) && ga(), null;
          case 3:
            return (
              Fi(),
              ua(da),
              ua(fa),
              (n = t.stateNode).pendingContext &&
                ((n.context = n.pendingContext), (n.pendingContext = null)),
              (null !== e && null !== e.child) || !Ao(t) || (t.effectTag |= 4),
              null
            );
          case 5:
            Pi(t), (n = Ni(Si.current));
            var i = t.type;
            if (null !== e && null != t.stateNode)
              Uo(e, t, i, r, n), e.ref !== t.ref && (t.effectTag |= 128);
            else {
              if (!r) {
                if (null === t.stateNode) throw Error(o(166));
                return null;
              }
              if (((e = Ni(Ai.current)), Ao(t))) {
                (r = t.stateNode), (i = t.type);
                var l = t.memoizedProps;
                switch (((r[kn] = t), (r[Cn] = l), i)) {
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    Yt('load', r);
                    break;
                  case 'video':
                  case 'audio':
                    for (e = 0; e < Ge.length; e++) Yt(Ge[e], r);
                    break;
                  case 'source':
                    Yt('error', r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    Yt('error', r), Yt('load', r);
                    break;
                  case 'form':
                    Yt('reset', r), Yt('submit', r);
                    break;
                  case 'details':
                    Yt('toggle', r);
                    break;
                  case 'input':
                    De(r, l), Yt('invalid', r), un(n, 'onChange');
                    break;
                  case 'select':
                    (r._wrapperState = { wasMultiple: !!l.multiple }),
                      Yt('invalid', r),
                      un(n, 'onChange');
                    break;
                  case 'textarea':
                    Oe(r, l), Yt('invalid', r), un(n, 'onChange');
                }
                for (var u in (an(i, l), (e = null), l))
                  if (l.hasOwnProperty(u)) {
                    var s = l[u];
                    'children' === u
                      ? 'string' == typeof s
                        ? r.textContent !== s && (e = ['children', s])
                        : 'number' == typeof s &&
                          r.textContent !== '' + s &&
                          (e = ['children', '' + s])
                      : k.hasOwnProperty(u) && null != s && un(n, u);
                  }
                switch (i) {
                  case 'input':
                    xe(r), _e(r, l, !0);
                    break;
                  case 'textarea':
                    xe(r), je(r);
                    break;
                  case 'select':
                  case 'option':
                    break;
                  default:
                    'function' == typeof l.onClick && (r.onclick = sn);
                }
                (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
              } else {
                switch (
                  ((u = 9 === n.nodeType ? n : n.ownerDocument),
                  e === ln && (e = Be(i)),
                  e === ln
                    ? 'script' === i
                      ? (((e = u.createElement('div')).innerHTML =
                          '<script></script>'),
                        (e = e.removeChild(e.firstChild)))
                      : 'string' == typeof r.is
                      ? (e = u.createElement(i, { is: r.is }))
                      : ((e = u.createElement(i)),
                        'select' === i &&
                          ((u = e),
                          r.multiple
                            ? (u.multiple = !0)
                            : r.size && (u.size = r.size)))
                    : (e = u.createElementNS(e, i)),
                  (e[kn] = t),
                  (e[Cn] = r),
                  Lo(e, t),
                  (t.stateNode = e),
                  (u = on(i, r)),
                  i)
                ) {
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    Yt('load', e), (s = r);
                    break;
                  case 'video':
                  case 'audio':
                    for (s = 0; s < Ge.length; s++) Yt(Ge[s], e);
                    s = r;
                    break;
                  case 'source':
                    Yt('error', e), (s = r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    Yt('error', e), Yt('load', e), (s = r);
                    break;
                  case 'form':
                    Yt('reset', e), Yt('submit', e), (s = r);
                    break;
                  case 'details':
                    Yt('toggle', e), (s = r);
                    break;
                  case 'input':
                    De(e, r),
                      (s = we(e, r)),
                      Yt('invalid', e),
                      un(n, 'onChange');
                    break;
                  case 'option':
                    s = Te(e, r);
                    break;
                  case 'select':
                    (e._wrapperState = { wasMultiple: !!r.multiple }),
                      (s = a({}, r, { value: void 0 })),
                      Yt('invalid', e),
                      un(n, 'onChange');
                    break;
                  case 'textarea':
                    Oe(e, r),
                      (s = Ne(e, r)),
                      Yt('invalid', e),
                      un(n, 'onChange');
                    break;
                  default:
                    s = r;
                }
                an(i, s);
                var c = s;
                for (l in c)
                  if (c.hasOwnProperty(l)) {
                    var f = c[l];
                    'style' === l
                      ? nn(e, f)
                      : 'dangerouslySetInnerHTML' === l
                      ? null != (f = f ? f.__html : void 0) && ze(e, f)
                      : 'children' === l
                      ? 'string' == typeof f
                        ? ('textarea' !== i || '' !== f) && Le(e, f)
                        : 'number' == typeof f && Le(e, '' + f)
                      : 'suppressContentEditableWarning' !== l &&
                        'suppressHydrationWarning' !== l &&
                        'autoFocus' !== l &&
                        (k.hasOwnProperty(l)
                          ? null != f && un(n, l)
                          : null != f && Z(e, l, f, u));
                  }
                switch (i) {
                  case 'input':
                    xe(e), _e(e, r, !1);
                    break;
                  case 'textarea':
                    xe(e), je(e);
                    break;
                  case 'option':
                    null != r.value &&
                      e.setAttribute('value', '' + be(r.value));
                    break;
                  case 'select':
                    (e.multiple = !!r.multiple),
                      null != (n = r.value)
                        ? Se(e, !!r.multiple, n, !1)
                        : null != r.defaultValue &&
                          Se(e, !!r.multiple, r.defaultValue, !0);
                    break;
                  default:
                    'function' == typeof s.onClick && (e.onclick = sn);
                }
                yn(i, r) && (t.effectTag |= 4);
              }
              null !== t.ref && (t.effectTag |= 128);
            }
            return null;
          case 6:
            if (e && null != t.stateNode) $o(0, t, e.memoizedProps, r);
            else {
              if ('string' != typeof r && null === t.stateNode)
                throw Error(o(166));
              (n = Ni(Si.current)),
                Ni(Ai.current),
                Ao(t)
                  ? ((n = t.stateNode),
                    (r = t.memoizedProps),
                    (n[kn] = t),
                    n.nodeValue !== r && (t.effectTag |= 4))
                  : (((n = (9 === n.nodeType
                      ? n
                      : n.ownerDocument
                    ).createTextNode(r))[kn] = t),
                    (t.stateNode = n));
            }
            return null;
          case 13:
            return (
              ua(Ri),
              (r = t.memoizedState),
              0 != (64 & t.effectTag)
                ? ((t.expirationTime = n), t)
                : ((n = null !== r),
                  (r = !1),
                  null === e
                    ? void 0 !== t.memoizedProps.fallback && Ao(t)
                    : ((r = null !== (i = e.memoizedState)),
                      n ||
                        null === i ||
                        (null !== (i = e.child.sibling) &&
                          (null !== (l = t.firstEffect)
                            ? ((t.firstEffect = i), (i.nextEffect = l))
                            : ((t.firstEffect = t.lastEffect = i),
                              (i.nextEffect = null)),
                          (i.effectTag = 8)))),
                  n &&
                    !r &&
                    0 != (2 & t.mode) &&
                    ((null === e &&
                      !0 !== t.memoizedProps.unstable_avoidThisFallback) ||
                    0 != (1 & Ri.current)
                      ? Al === xl && (Al = El)
                      : ((Al !== xl && Al !== El) || (Al = wl),
                        0 !== Fl && null !== kl && (ju(kl, _l), Pu(kl, Fl)))),
                  (n || r) && (t.effectTag |= 4),
                  null)
            );
          case 4:
            return Fi(), null;
          case 10:
            return ei(t), null;
          case 17:
            return ma(t.type) && ga(), null;
          case 19:
            if ((ua(Ri), null === (r = t.memoizedState))) return null;
            if (((i = 0 != (64 & t.effectTag)), null === (l = r.rendering))) {
              if (i) Ko(r, !1);
              else if (Al !== xl || (null !== e && 0 != (64 & e.effectTag)))
                for (l = t.child; null !== l; ) {
                  if (null !== (e = Bi(l))) {
                    for (
                      t.effectTag |= 64,
                        Ko(r, !1),
                        null !== (i = e.updateQueue) &&
                          ((t.updateQueue = i), (t.effectTag |= 4)),
                        null === r.lastEffect && (t.firstEffect = null),
                        t.lastEffect = r.lastEffect,
                        r = t.child;
                      null !== r;

                    )
                      (l = n),
                        ((i = r).effectTag &= 2),
                        (i.nextEffect = null),
                        (i.firstEffect = null),
                        (i.lastEffect = null),
                        null === (e = i.alternate)
                          ? ((i.childExpirationTime = 0),
                            (i.expirationTime = l),
                            (i.child = null),
                            (i.memoizedProps = null),
                            (i.memoizedState = null),
                            (i.updateQueue = null),
                            (i.dependencies = null))
                          : ((i.childExpirationTime = e.childExpirationTime),
                            (i.expirationTime = e.expirationTime),
                            (i.child = e.child),
                            (i.memoizedProps = e.memoizedProps),
                            (i.memoizedState = e.memoizedState),
                            (i.updateQueue = e.updateQueue),
                            (l = e.dependencies),
                            (i.dependencies =
                              null === l
                                ? null
                                : {
                                    expirationTime: l.expirationTime,
                                    firstContext: l.firstContext,
                                    responders: l.responders,
                                  })),
                        (r = r.sibling);
                    return sa(Ri, (1 & Ri.current) | 2), t.child;
                  }
                  l = l.sibling;
                }
            } else {
              if (!i)
                if (null !== (e = Bi(l))) {
                  if (
                    ((t.effectTag |= 64),
                    (i = !0),
                    null !== (n = e.updateQueue) &&
                      ((t.updateQueue = n), (t.effectTag |= 4)),
                    Ko(r, !0),
                    null === r.tail && 'hidden' === r.tailMode && !l.alternate)
                  )
                    return (
                      null !== (t = t.lastEffect = r.lastEffect) &&
                        (t.nextEffect = null),
                      null
                    );
                } else
                  2 * za() - r.renderingStartTime > r.tailExpiration &&
                    1 < n &&
                    ((t.effectTag |= 64),
                    (i = !0),
                    Ko(r, !1),
                    (t.expirationTime = t.childExpirationTime = n - 1));
              r.isBackwards
                ? ((l.sibling = t.child), (t.child = l))
                : (null !== (n = r.last) ? (n.sibling = l) : (t.child = l),
                  (r.last = l));
            }
            return null !== r.tail
              ? (0 === r.tailExpiration && (r.tailExpiration = za() + 500),
                (n = r.tail),
                (r.rendering = n),
                (r.tail = n.sibling),
                (r.lastEffect = t.lastEffect),
                (r.renderingStartTime = za()),
                (n.sibling = null),
                (t = Ri.current),
                sa(Ri, i ? (1 & t) | 2 : 1 & t),
                n)
              : null;
        }
        throw Error(o(156, t.tag));
      }
      function Zo(e) {
        switch (e.tag) {
          case 1:
            ma(e.type) && ga();
            var t = e.effectTag;
            return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
          case 3:
            if ((Fi(), ua(da), ua(fa), 0 != (64 & (t = e.effectTag))))
              throw Error(o(285));
            return (e.effectTag = (-4097 & t) | 64), e;
          case 5:
            return Pi(e), null;
          case 13:
            return (
              ua(Ri),
              4096 & (t = e.effectTag)
                ? ((e.effectTag = (-4097 & t) | 64), e)
                : null
            );
          case 19:
            return ua(Ri), null;
          case 4:
            return Fi(), null;
          case 10:
            return ei(e), null;
          default:
            return null;
        }
      }
      function Xo(e, t) {
        return { value: e, source: t, stack: ye(t) };
      }
      (Lo = function(e, t) {
        for (var n = t.child; null !== n; ) {
          if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
          else if (4 !== n.tag && null !== n.child) {
            (n.child.return = n), (n = n.child);
            continue;
          }
          if (n === t) break;
          for (; null === n.sibling; ) {
            if (null === n.return || n.return === t) return;
            n = n.return;
          }
          (n.sibling.return = n.return), (n = n.sibling);
        }
      }),
        (Uo = function(e, t, n, r, i) {
          var o = e.memoizedProps;
          if (o !== r) {
            var l,
              u,
              s = t.stateNode;
            switch ((Ni(Ai.current), (e = null), n)) {
              case 'input':
                (o = we(s, o)), (r = we(s, r)), (e = []);
                break;
              case 'option':
                (o = Te(s, o)), (r = Te(s, r)), (e = []);
                break;
              case 'select':
                (o = a({}, o, { value: void 0 })),
                  (r = a({}, r, { value: void 0 })),
                  (e = []);
                break;
              case 'textarea':
                (o = Ne(s, o)), (r = Ne(s, r)), (e = []);
                break;
              default:
                'function' != typeof o.onClick &&
                  'function' == typeof r.onClick &&
                  (s.onclick = sn);
            }
            for (l in (an(n, r), (n = null), o))
              if (!r.hasOwnProperty(l) && o.hasOwnProperty(l) && null != o[l])
                if ('style' === l)
                  for (u in (s = o[l]))
                    s.hasOwnProperty(u) && (n || (n = {}), (n[u] = ''));
                else
                  'dangerouslySetInnerHTML' !== l &&
                    'children' !== l &&
                    'suppressContentEditableWarning' !== l &&
                    'suppressHydrationWarning' !== l &&
                    'autoFocus' !== l &&
                    (k.hasOwnProperty(l)
                      ? e || (e = [])
                      : (e = e || []).push(l, null));
            for (l in r) {
              var c = r[l];
              if (
                ((s = null != o ? o[l] : void 0),
                r.hasOwnProperty(l) && c !== s && (null != c || null != s))
              )
                if ('style' === l)
                  if (s) {
                    for (u in s)
                      !s.hasOwnProperty(u) ||
                        (c && c.hasOwnProperty(u)) ||
                        (n || (n = {}), (n[u] = ''));
                    for (u in c)
                      c.hasOwnProperty(u) &&
                        s[u] !== c[u] &&
                        (n || (n = {}), (n[u] = c[u]));
                  } else n || (e || (e = []), e.push(l, n)), (n = c);
                else
                  'dangerouslySetInnerHTML' === l
                    ? ((c = c ? c.__html : void 0),
                      (s = s ? s.__html : void 0),
                      null != c && s !== c && (e = e || []).push(l, c))
                    : 'children' === l
                    ? s === c ||
                      ('string' != typeof c && 'number' != typeof c) ||
                      (e = e || []).push(l, '' + c)
                    : 'suppressContentEditableWarning' !== l &&
                      'suppressHydrationWarning' !== l &&
                      (k.hasOwnProperty(l)
                        ? (null != c && un(i, l), e || s === c || (e = []))
                        : (e = e || []).push(l, c));
            }
            n && (e = e || []).push('style', n),
              (i = e),
              (t.updateQueue = i) && (t.effectTag |= 4);
          }
        }),
        ($o = function(e, t, n, r) {
          n !== r && (t.effectTag |= 4);
        });
      var Jo = 'function' == typeof WeakSet ? WeakSet : Set;
      function el(e, t) {
        var n = t.source,
          r = t.stack;
        null === r && null !== n && (r = ye(n)),
          null !== n && ge(n.type),
          (t = t.value),
          null !== e && 1 === e.tag && ge(e.type);
        try {
          console.error(t);
        } catch (e) {
          setTimeout(function() {
            throw e;
          });
        }
      }
      function tl(e) {
        var t = e.ref;
        if (null !== t)
          if ('function' == typeof t)
            try {
              t(null);
            } catch (t) {
              bu(e, t);
            }
          else t.current = null;
      }
      function nl(e, t) {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return;
          case 1:
            if (256 & t.effectTag && null !== e) {
              var n = e.memoizedProps,
                r = e.memoizedState;
              (t = (e = t.stateNode).getSnapshotBeforeUpdate(
                t.elementType === t.type ? n : Qa(t.type, n),
                r,
              )),
                (e.__reactInternalSnapshotBeforeUpdate = t);
            }
            return;
          case 3:
          case 5:
          case 6:
          case 4:
          case 17:
            return;
        }
        throw Error(o(163));
      }
      function rl(e, t) {
        if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
          var n = (t = t.next);
          do {
            if ((n.tag & e) === e) {
              var r = n.destroy;
              (n.destroy = void 0), void 0 !== r && r();
            }
            n = n.next;
          } while (n !== t);
        }
      }
      function al(e, t) {
        if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
          var n = (t = t.next);
          do {
            if ((n.tag & e) === e) {
              var r = n.create;
              n.destroy = r();
            }
            n = n.next;
          } while (n !== t);
        }
      }
      function il(e, t, n) {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return void al(3, n);
          case 1:
            if (((e = n.stateNode), 4 & n.effectTag))
              if (null === t) e.componentDidMount();
              else {
                var r =
                  n.elementType === n.type
                    ? t.memoizedProps
                    : Qa(n.type, t.memoizedProps);
                e.componentDidUpdate(
                  r,
                  t.memoizedState,
                  e.__reactInternalSnapshotBeforeUpdate,
                );
              }
            return void (null !== (t = n.updateQueue) && fi(n, t, e));
          case 3:
            if (null !== (t = n.updateQueue)) {
              if (((e = null), null !== n.child))
                switch (n.child.tag) {
                  case 5:
                    e = n.child.stateNode;
                    break;
                  case 1:
                    e = n.child.stateNode;
                }
              fi(n, t, e);
            }
            return;
          case 5:
            return (
              (e = n.stateNode),
              void (
                null === t &&
                4 & n.effectTag &&
                yn(n.type, n.memoizedProps) &&
                e.focus()
              )
            );
          case 6:
          case 4:
          case 12:
            return;
          case 13:
            return void (
              null === n.memoizedState &&
              ((n = n.alternate),
              null !== n &&
                ((n = n.memoizedState),
                null !== n && ((n = n.dehydrated), null !== n && Bt(n))))
            );
          case 19:
          case 17:
          case 20:
          case 21:
            return;
        }
        throw Error(o(163));
      }
      function ol(e, t, n) {
        switch (('function' == typeof wu && wu(t), t.tag)) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
              var r = e.next;
              $a(97 < n ? 97 : n, function() {
                var e = r;
                do {
                  var n = e.destroy;
                  if (void 0 !== n) {
                    var a = t;
                    try {
                      n();
                    } catch (e) {
                      bu(a, e);
                    }
                  }
                  e = e.next;
                } while (e !== r);
              });
            }
            break;
          case 1:
            tl(t),
              'function' == typeof (n = t.stateNode).componentWillUnmount &&
                (function(e, t) {
                  try {
                    (t.props = e.memoizedProps),
                      (t.state = e.memoizedState),
                      t.componentWillUnmount();
                  } catch (t) {
                    bu(e, t);
                  }
                })(t, n);
            break;
          case 5:
            tl(t);
            break;
          case 4:
            cl(e, t, n);
        }
      }
      function ll(e) {
        var t = e.alternate;
        (e.return = null),
          (e.child = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.alternate = null),
          (e.firstEffect = null),
          (e.lastEffect = null),
          (e.pendingProps = null),
          (e.memoizedProps = null),
          (e.stateNode = null),
          null !== t && ll(t);
      }
      function ul(e) {
        return 5 === e.tag || 3 === e.tag || 4 === e.tag;
      }
      function sl(e) {
        e: {
          for (var t = e.return; null !== t; ) {
            if (ul(t)) {
              var n = t;
              break e;
            }
            t = t.return;
          }
          throw Error(o(160));
        }
        switch (((t = n.stateNode), n.tag)) {
          case 5:
            var r = !1;
            break;
          case 3:
          case 4:
            (t = t.containerInfo), (r = !0);
            break;
          default:
            throw Error(o(161));
        }
        16 & n.effectTag && (Le(t, ''), (n.effectTag &= -17));
        e: t: for (n = e; ; ) {
          for (; null === n.sibling; ) {
            if (null === n.return || ul(n.return)) {
              n = null;
              break e;
            }
            n = n.return;
          }
          for (
            n.sibling.return = n.return, n = n.sibling;
            5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

          ) {
            if (2 & n.effectTag) continue t;
            if (null === n.child || 4 === n.tag) continue t;
            (n.child.return = n), (n = n.child);
          }
          if (!(2 & n.effectTag)) {
            n = n.stateNode;
            break e;
          }
        }
        r
          ? (function e(t, n, r) {
              var a = t.tag,
                i = 5 === a || 6 === a;
              if (i)
                (t = i ? t.stateNode : t.stateNode.instance),
                  n
                    ? 8 === r.nodeType
                      ? r.parentNode.insertBefore(t, n)
                      : r.insertBefore(t, n)
                    : (8 === r.nodeType
                        ? (n = r.parentNode).insertBefore(t, r)
                        : (n = r).appendChild(t),
                      (null !== (r = r._reactRootContainer) && void 0 !== r) ||
                        null !== n.onclick ||
                        (n.onclick = sn));
              else if (4 !== a && null !== (t = t.child))
                for (e(t, n, r), t = t.sibling; null !== t; )
                  e(t, n, r), (t = t.sibling);
            })(e, n, t)
          : (function e(t, n, r) {
              var a = t.tag,
                i = 5 === a || 6 === a;
              if (i)
                (t = i ? t.stateNode : t.stateNode.instance),
                  n ? r.insertBefore(t, n) : r.appendChild(t);
              else if (4 !== a && null !== (t = t.child))
                for (e(t, n, r), t = t.sibling; null !== t; )
                  e(t, n, r), (t = t.sibling);
            })(e, n, t);
      }
      function cl(e, t, n) {
        for (var r, a, i = t, l = !1; ; ) {
          if (!l) {
            l = i.return;
            e: for (;;) {
              if (null === l) throw Error(o(160));
              switch (((r = l.stateNode), l.tag)) {
                case 5:
                  a = !1;
                  break e;
                case 3:
                case 4:
                  (r = r.containerInfo), (a = !0);
                  break e;
              }
              l = l.return;
            }
            l = !0;
          }
          if (5 === i.tag || 6 === i.tag) {
            e: for (var u = e, s = i, c = n, f = s; ; )
              if ((ol(u, f, c), null !== f.child && 4 !== f.tag))
                (f.child.return = f), (f = f.child);
              else {
                if (f === s) break e;
                for (; null === f.sibling; ) {
                  if (null === f.return || f.return === s) break e;
                  f = f.return;
                }
                (f.sibling.return = f.return), (f = f.sibling);
              }
            a
              ? ((u = r),
                (s = i.stateNode),
                8 === u.nodeType
                  ? u.parentNode.removeChild(s)
                  : u.removeChild(s))
              : r.removeChild(i.stateNode);
          } else if (4 === i.tag) {
            if (null !== i.child) {
              (r = i.stateNode.containerInfo),
                (a = !0),
                (i.child.return = i),
                (i = i.child);
              continue;
            }
          } else if ((ol(e, i, n), null !== i.child)) {
            (i.child.return = i), (i = i.child);
            continue;
          }
          if (i === t) break;
          for (; null === i.sibling; ) {
            if (null === i.return || i.return === t) return;
            4 === (i = i.return).tag && (l = !1);
          }
          (i.sibling.return = i.return), (i = i.sibling);
        }
      }
      function fl(e, t) {
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            return void rl(3, t);
          case 1:
            return;
          case 5:
            var n = t.stateNode;
            if (null != n) {
              var r = t.memoizedProps,
                a = null !== e ? e.memoizedProps : r;
              e = t.type;
              var i = t.updateQueue;
              if (((t.updateQueue = null), null !== i)) {
                for (
                  n[Cn] = r,
                    'input' === e &&
                      'radio' === r.type &&
                      null != r.name &&
                      ke(n, r),
                    on(e, a),
                    t = on(e, r),
                    a = 0;
                  a < i.length;
                  a += 2
                ) {
                  var l = i[a],
                    u = i[a + 1];
                  'style' === l
                    ? nn(n, u)
                    : 'dangerouslySetInnerHTML' === l
                    ? ze(n, u)
                    : 'children' === l
                    ? Le(n, u)
                    : Z(n, l, u, t);
                }
                switch (e) {
                  case 'input':
                    Ce(n, r);
                    break;
                  case 'textarea':
                    Fe(n, r);
                    break;
                  case 'select':
                    (t = n._wrapperState.wasMultiple),
                      (n._wrapperState.wasMultiple = !!r.multiple),
                      null != (e = r.value)
                        ? Se(n, !!r.multiple, e, !1)
                        : t !== !!r.multiple &&
                          (null != r.defaultValue
                            ? Se(n, !!r.multiple, r.defaultValue, !0)
                            : Se(n, !!r.multiple, r.multiple ? [] : '', !1));
                }
              }
            }
            return;
          case 6:
            if (null === t.stateNode) throw Error(o(162));
            return void (t.stateNode.nodeValue = t.memoizedProps);
          case 3:
            return void (
              (t = t.stateNode).hydrate &&
              ((t.hydrate = !1), Bt(t.containerInfo))
            );
          case 12:
            return;
          case 13:
            if (
              ((n = t),
              null === t.memoizedState
                ? (r = !1)
                : ((r = !0), (n = t.child), (Pl = za())),
              null !== n)
            )
              e: for (e = n; ; ) {
                if (5 === e.tag)
                  (i = e.stateNode),
                    r
                      ? 'function' == typeof (i = i.style).setProperty
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none')
                      : ((i = e.stateNode),
                        (a =
                          null != (a = e.memoizedProps.style) &&
                          a.hasOwnProperty('display')
                            ? a.display
                            : null),
                        (i.style.display = tn('display', a)));
                else if (6 === e.tag)
                  e.stateNode.nodeValue = r ? '' : e.memoizedProps;
                else {
                  if (
                    13 === e.tag &&
                    null !== e.memoizedState &&
                    null === e.memoizedState.dehydrated
                  ) {
                    ((i = e.child.sibling).return = e), (e = i);
                    continue;
                  }
                  if (null !== e.child) {
                    (e.child.return = e), (e = e.child);
                    continue;
                  }
                }
                if (e === n) break;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === n) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            return void dl(t);
          case 19:
            return void dl(t);
          case 17:
            return;
        }
        throw Error(o(163));
      }
      function dl(e) {
        var t = e.updateQueue;
        if (null !== t) {
          e.updateQueue = null;
          var n = e.stateNode;
          null === n && (n = e.stateNode = new Jo()),
            t.forEach(function(t) {
              var r = xu.bind(null, e, t);
              n.has(t) || (n.add(t), t.then(r, r));
            });
        }
      }
      var pl = 'function' == typeof WeakMap ? WeakMap : Map;
      function hl(e, t, n) {
        ((n = li(n, null)).tag = 3), (n.payload = { element: null });
        var r = t.value;
        return (
          (n.callback = function() {
            Bl || ((Bl = !0), (Il = r)), el(e, t);
          }),
          n
        );
      }
      function ml(e, t, n) {
        (n = li(n, null)).tag = 3;
        var r = e.type.getDerivedStateFromError;
        if ('function' == typeof r) {
          var a = t.value;
          n.payload = function() {
            return el(e, t), r(a);
          };
        }
        var i = e.stateNode;
        return (
          null !== i &&
            'function' == typeof i.componentDidCatch &&
            (n.callback = function() {
              'function' != typeof r &&
                (null === Ml ? (Ml = new Set([this])) : Ml.add(this), el(e, t));
              var n = t.stack;
              this.componentDidCatch(t.value, {
                componentStack: null !== n ? n : '',
              });
            }),
          n
        );
      }
      var gl,
        yl = Math.ceil,
        bl = G.ReactCurrentDispatcher,
        vl = G.ReactCurrentOwner,
        xl = 0,
        El = 3,
        wl = 4,
        Dl = 0,
        kl = null,
        Cl = null,
        _l = 0,
        Al = xl,
        Tl = null,
        Sl = 1073741823,
        Nl = 1073741823,
        Ol = null,
        Fl = 0,
        jl = !1,
        Pl = 0,
        Rl = null,
        Bl = !1,
        Il = null,
        Ml = null,
        zl = !1,
        Ll = null,
        Ul = 90,
        $l = null,
        Hl = 0,
        Vl = null,
        Wl = 0;
      function ql() {
        return 0 != (48 & Dl)
          ? 1073741821 - ((za() / 10) | 0)
          : 0 !== Wl
          ? Wl
          : (Wl = 1073741821 - ((za() / 10) | 0));
      }
      function Yl(e, t, n) {
        if (0 == (2 & (t = t.mode))) return 1073741823;
        var r = La();
        if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
        if (0 != (16 & Dl)) return _l;
        if (null !== n) e = Ya(e, 0 | n.timeoutMs || 5e3, 250);
        else
          switch (r) {
            case 99:
              e = 1073741823;
              break;
            case 98:
              e = Ya(e, 150, 100);
              break;
            case 97:
            case 96:
              e = Ya(e, 5e3, 250);
              break;
            case 95:
              e = 2;
              break;
            default:
              throw Error(o(326));
          }
        return null !== kl && e === _l && --e, e;
      }
      function Ql(e, t) {
        if (50 < Hl) throw ((Hl = 0), (Vl = null), Error(o(185)));
        if (null !== (e = Kl(e, t))) {
          var n = La();
          1073741823 === t
            ? 0 != (8 & Dl) && 0 == (48 & Dl)
              ? Jl(e)
              : (Zl(e), 0 === Dl && Wa())
            : Zl(e),
            0 == (4 & Dl) ||
              (98 !== n && 99 !== n) ||
              (null === $l
                ? ($l = new Map([[e, t]]))
                : (void 0 === (n = $l.get(e)) || n > t) && $l.set(e, t));
        }
      }
      function Kl(e, t) {
        e.expirationTime < t && (e.expirationTime = t);
        var n = e.alternate;
        null !== n && n.expirationTime < t && (n.expirationTime = t);
        var r = e.return,
          a = null;
        if (null === r && 3 === e.tag) a = e.stateNode;
        else
          for (; null !== r; ) {
            if (
              ((n = r.alternate),
              r.childExpirationTime < t && (r.childExpirationTime = t),
              null !== n &&
                n.childExpirationTime < t &&
                (n.childExpirationTime = t),
              null === r.return && 3 === r.tag)
            ) {
              a = r.stateNode;
              break;
            }
            r = r.return;
          }
        return (
          null !== a && (kl === a && (ou(t), Al === wl && ju(a, _l)), Pu(a, t)),
          a
        );
      }
      function Gl(e) {
        var t = e.lastExpiredTime;
        if (0 !== t) return t;
        if (!Fu(e, (t = e.firstPendingTime))) return t;
        var n = e.lastPingedTime;
        return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
          ? 0
          : e;
      }
      function Zl(e) {
        if (0 !== e.lastExpiredTime)
          (e.callbackExpirationTime = 1073741823),
            (e.callbackPriority = 99),
            (e.callbackNode = Va(Jl.bind(null, e)));
        else {
          var t = Gl(e),
            n = e.callbackNode;
          if (0 === t)
            null !== n &&
              ((e.callbackNode = null),
              (e.callbackExpirationTime = 0),
              (e.callbackPriority = 90));
          else {
            var r = ql();
            if (
              (1073741823 === t
                ? (r = 99)
                : 1 === t || 2 === t
                ? (r = 95)
                : (r =
                    0 >= (r = 10 * (1073741821 - t) - 10 * (1073741821 - r))
                      ? 99
                      : 250 >= r
                      ? 98
                      : 5250 >= r
                      ? 97
                      : 95),
              null !== n)
            ) {
              var a = e.callbackPriority;
              if (e.callbackExpirationTime === t && a >= r) return;
              n !== Fa && Da(n);
            }
            (e.callbackExpirationTime = t),
              (e.callbackPriority = r),
              (t =
                1073741823 === t
                  ? Va(Jl.bind(null, e))
                  : Ha(r, Xl.bind(null, e), {
                      timeout: 10 * (1073741821 - t) - za(),
                    })),
              (e.callbackNode = t);
          }
        }
      }
      function Xl(e, t) {
        if (((Wl = 0), t)) return Ru(e, (t = ql())), Zl(e), null;
        var n = Gl(e);
        if (0 !== n) {
          if (((t = e.callbackNode), 0 != (48 & Dl))) throw Error(o(327));
          if ((mu(), (e === kl && n === _l) || nu(e, n), null !== Cl)) {
            var r = Dl;
            Dl |= 16;
            for (var a = au(); ; )
              try {
                uu();
                break;
              } catch (t) {
                ru(e, t);
              }
            if ((Ja(), (Dl = r), (bl.current = a), 1 === Al))
              throw ((t = Tl), nu(e, n), ju(e, n), Zl(e), t);
            if (null === Cl)
              switch (
                ((a = e.finishedWork = e.current.alternate),
                (e.finishedExpirationTime = n),
                (r = Al),
                (kl = null),
                r)
              ) {
                case xl:
                case 1:
                  throw Error(o(345));
                case 2:
                  Ru(e, 2 < n ? 2 : n);
                  break;
                case El:
                  if (
                    (ju(e, n),
                    n === (r = e.lastSuspendedTime) &&
                      (e.nextKnownPendingLevel = fu(a)),
                    1073741823 === Sl && 10 < (a = Pl + 500 - za()))
                  ) {
                    if (jl) {
                      var i = e.lastPingedTime;
                      if (0 === i || i >= n) {
                        (e.lastPingedTime = n), nu(e, n);
                        break;
                      }
                    }
                    if (0 !== (i = Gl(e)) && i !== n) break;
                    if (0 !== r && r !== n) {
                      e.lastPingedTime = r;
                      break;
                    }
                    e.timeoutHandle = vn(du.bind(null, e), a);
                    break;
                  }
                  du(e);
                  break;
                case wl:
                  if (
                    (ju(e, n),
                    n === (r = e.lastSuspendedTime) &&
                      (e.nextKnownPendingLevel = fu(a)),
                    jl && (0 === (a = e.lastPingedTime) || a >= n))
                  ) {
                    (e.lastPingedTime = n), nu(e, n);
                    break;
                  }
                  if (0 !== (a = Gl(e)) && a !== n) break;
                  if (0 !== r && r !== n) {
                    e.lastPingedTime = r;
                    break;
                  }
                  if (
                    (1073741823 !== Nl
                      ? (r = 10 * (1073741821 - Nl) - za())
                      : 1073741823 === Sl
                      ? (r = 0)
                      : ((r = 10 * (1073741821 - Sl) - 5e3),
                        0 > (r = (a = za()) - r) && (r = 0),
                        (n = 10 * (1073741821 - n) - a) <
                          (r =
                            (120 > r
                              ? 120
                              : 480 > r
                              ? 480
                              : 1080 > r
                              ? 1080
                              : 1920 > r
                              ? 1920
                              : 3e3 > r
                              ? 3e3
                              : 4320 > r
                              ? 4320
                              : 1960 * yl(r / 1960)) - r) && (r = n)),
                    10 < r)
                  ) {
                    e.timeoutHandle = vn(du.bind(null, e), r);
                    break;
                  }
                  du(e);
                  break;
                case 5:
                  if (1073741823 !== Sl && null !== Ol) {
                    i = Sl;
                    var l = Ol;
                    if (
                      (0 >= (r = 0 | l.busyMinDurationMs)
                        ? (r = 0)
                        : ((a = 0 | l.busyDelayMs),
                          (r =
                            (i =
                              za() -
                              (10 * (1073741821 - i) -
                                (0 | l.timeoutMs || 5e3))) <= a
                              ? 0
                              : a + r - i)),
                      10 < r)
                    ) {
                      ju(e, n), (e.timeoutHandle = vn(du.bind(null, e), r));
                      break;
                    }
                  }
                  du(e);
                  break;
                default:
                  throw Error(o(329));
              }
            if ((Zl(e), e.callbackNode === t)) return Xl.bind(null, e);
          }
        }
        return null;
      }
      function Jl(e) {
        var t = e.lastExpiredTime;
        if (((t = 0 !== t ? t : 1073741823), 0 != (48 & Dl)))
          throw Error(o(327));
        if ((mu(), (e === kl && t === _l) || nu(e, t), null !== Cl)) {
          var n = Dl;
          Dl |= 16;
          for (var r = au(); ; )
            try {
              lu();
              break;
            } catch (t) {
              ru(e, t);
            }
          if ((Ja(), (Dl = n), (bl.current = r), 1 === Al))
            throw ((n = Tl), nu(e, t), ju(e, t), Zl(e), n);
          if (null !== Cl) throw Error(o(261));
          (e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = t),
            (kl = null),
            du(e),
            Zl(e);
        }
        return null;
      }
      function eu(e, t) {
        var n = Dl;
        Dl |= 1;
        try {
          return e(t);
        } finally {
          0 === (Dl = n) && Wa();
        }
      }
      function tu(e, t) {
        var n = Dl;
        (Dl &= -2), (Dl |= 8);
        try {
          return e(t);
        } finally {
          0 === (Dl = n) && Wa();
        }
      }
      function nu(e, t) {
        (e.finishedWork = null), (e.finishedExpirationTime = 0);
        var n = e.timeoutHandle;
        if ((-1 !== n && ((e.timeoutHandle = -1), xn(n)), null !== Cl))
          for (n = Cl.return; null !== n; ) {
            var r = n;
            switch (r.tag) {
              case 1:
                null != (r = r.type.childContextTypes) && ga();
                break;
              case 3:
                Fi(), ua(da), ua(fa);
                break;
              case 5:
                Pi(r);
                break;
              case 4:
                Fi();
                break;
              case 13:
              case 19:
                ua(Ri);
                break;
              case 10:
                ei(r);
            }
            n = n.return;
          }
        (kl = e),
          (Cl = _u(e.current, null)),
          (_l = t),
          (Al = xl),
          (Tl = null),
          (Nl = Sl = 1073741823),
          (Ol = null),
          (Fl = 0),
          (jl = !1);
      }
      function ru(e, t) {
        for (;;) {
          try {
            if ((Ja(), (Mi.current = go), Vi))
              for (var n = Ui.memoizedState; null !== n; ) {
                var r = n.queue;
                null !== r && (r.pending = null), (n = n.next);
              }
            if (
              ((Li = 0),
              (Hi = $i = Ui = null),
              (Vi = !1),
              null === Cl || null === Cl.return)
            )
              return (Al = 1), (Tl = t), (Cl = null);
            e: {
              var a = e,
                i = Cl.return,
                o = Cl,
                l = t;
              if (
                ((t = _l),
                (o.effectTag |= 2048),
                (o.firstEffect = o.lastEffect = null),
                null !== l &&
                  'object' == typeof l &&
                  'function' == typeof l.then)
              ) {
                var u = l;
                if (0 == (2 & o.mode)) {
                  var s = o.alternate;
                  s
                    ? ((o.updateQueue = s.updateQueue),
                      (o.memoizedState = s.memoizedState),
                      (o.expirationTime = s.expirationTime))
                    : ((o.updateQueue = null), (o.memoizedState = null));
                }
                var c = 0 != (1 & Ri.current),
                  f = i;
                do {
                  var d;
                  if ((d = 13 === f.tag)) {
                    var p = f.memoizedState;
                    if (null !== p) d = null !== p.dehydrated;
                    else {
                      var h = f.memoizedProps;
                      d =
                        void 0 !== h.fallback &&
                        (!0 !== h.unstable_avoidThisFallback || !c);
                    }
                  }
                  if (d) {
                    var m = f.updateQueue;
                    if (null === m) {
                      var g = new Set();
                      g.add(u), (f.updateQueue = g);
                    } else m.add(u);
                    if (0 == (2 & f.mode)) {
                      if (
                        ((f.effectTag |= 64),
                        (o.effectTag &= -2981),
                        1 === o.tag)
                      )
                        if (null === o.alternate) o.tag = 17;
                        else {
                          var y = li(1073741823, null);
                          (y.tag = 2), ui(o, y);
                        }
                      o.expirationTime = 1073741823;
                      break e;
                    }
                    (l = void 0), (o = t);
                    var b = a.pingCache;
                    if (
                      (null === b
                        ? ((b = a.pingCache = new pl()),
                          (l = new Set()),
                          b.set(u, l))
                        : void 0 === (l = b.get(u)) &&
                          ((l = new Set()), b.set(u, l)),
                      !l.has(o))
                    ) {
                      l.add(o);
                      var v = vu.bind(null, a, u, o);
                      u.then(v, v);
                    }
                    (f.effectTag |= 4096), (f.expirationTime = t);
                    break e;
                  }
                  f = f.return;
                } while (null !== f);
                l = Error(
                  (ge(o.type) || 'A React component') +
                    ' suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.' +
                    ye(o),
                );
              }
              5 !== Al && (Al = 2), (l = Xo(l, o)), (f = i);
              do {
                switch (f.tag) {
                  case 3:
                    (u = l),
                      (f.effectTag |= 4096),
                      (f.expirationTime = t),
                      si(f, hl(f, u, t));
                    break e;
                  case 1:
                    u = l;
                    var x = f.type,
                      E = f.stateNode;
                    if (
                      0 == (64 & f.effectTag) &&
                      ('function' == typeof x.getDerivedStateFromError ||
                        (null !== E &&
                          'function' == typeof E.componentDidCatch &&
                          (null === Ml || !Ml.has(E))))
                    ) {
                      (f.effectTag |= 4096),
                        (f.expirationTime = t),
                        si(f, ml(f, u, t));
                      break e;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Cl = cu(Cl);
          } catch (e) {
            t = e;
            continue;
          }
          break;
        }
      }
      function au() {
        var e = bl.current;
        return (bl.current = go), null === e ? go : e;
      }
      function iu(e, t) {
        e < Sl && 2 < e && (Sl = e),
          null !== t && e < Nl && 2 < e && ((Nl = e), (Ol = t));
      }
      function ou(e) {
        e > Fl && (Fl = e);
      }
      function lu() {
        for (; null !== Cl; ) Cl = su(Cl);
      }
      function uu() {
        for (; null !== Cl && !ja(); ) Cl = su(Cl);
      }
      function su(e) {
        var t = gl(e.alternate, e, _l);
        return (
          (e.memoizedProps = e.pendingProps),
          null === t && (t = cu(e)),
          (vl.current = null),
          t
        );
      }
      function cu(e) {
        Cl = e;
        do {
          var t = Cl.alternate;
          if (((e = Cl.return), 0 == (2048 & Cl.effectTag))) {
            if (
              ((t = Go(t, Cl, _l)), 1 === _l || 1 !== Cl.childExpirationTime)
            ) {
              for (var n = 0, r = Cl.child; null !== r; ) {
                var a = r.expirationTime,
                  i = r.childExpirationTime;
                a > n && (n = a), i > n && (n = i), (r = r.sibling);
              }
              Cl.childExpirationTime = n;
            }
            if (null !== t) return t;
            null !== e &&
              0 == (2048 & e.effectTag) &&
              (null === e.firstEffect && (e.firstEffect = Cl.firstEffect),
              null !== Cl.lastEffect &&
                (null !== e.lastEffect &&
                  (e.lastEffect.nextEffect = Cl.firstEffect),
                (e.lastEffect = Cl.lastEffect)),
              1 < Cl.effectTag &&
                (null !== e.lastEffect
                  ? (e.lastEffect.nextEffect = Cl)
                  : (e.firstEffect = Cl),
                (e.lastEffect = Cl)));
          } else {
            if (null !== (t = Zo(Cl))) return (t.effectTag &= 2047), t;
            null !== e &&
              ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
          }
          if (null !== (t = Cl.sibling)) return t;
          Cl = e;
        } while (null !== Cl);
        return Al === xl && (Al = 5), null;
      }
      function fu(e) {
        var t = e.expirationTime;
        return t > (e = e.childExpirationTime) ? t : e;
      }
      function du(e) {
        var t = La();
        return $a(99, pu.bind(null, e, t)), null;
      }
      function pu(e, t) {
        do {
          mu();
        } while (null !== Ll);
        if (0 != (48 & Dl)) throw Error(o(327));
        var n = e.finishedWork,
          r = e.finishedExpirationTime;
        if (null === n) return null;
        if (
          ((e.finishedWork = null),
          (e.finishedExpirationTime = 0),
          n === e.current)
        )
          throw Error(o(177));
        (e.callbackNode = null),
          (e.callbackExpirationTime = 0),
          (e.callbackPriority = 90),
          (e.nextKnownPendingLevel = 0);
        var a = fu(n);
        if (
          ((e.firstPendingTime = a),
          r <= e.lastSuspendedTime
            ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
            : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
          r <= e.lastPingedTime && (e.lastPingedTime = 0),
          r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
          e === kl && ((Cl = kl = null), (_l = 0)),
          1 < n.effectTag
            ? null !== n.lastEffect
              ? ((n.lastEffect.nextEffect = n), (a = n.firstEffect))
              : (a = n)
            : (a = n.firstEffect),
          null !== a)
        ) {
          var i = Dl;
          (Dl |= 32), (vl.current = null), (mn = qt);
          var l = pn();
          if (hn(l)) {
            if ('selectionStart' in l)
              var u = { start: l.selectionStart, end: l.selectionEnd };
            else
              e: {
                var s =
                  (u = ((u = l.ownerDocument) && u.defaultView) || window)
                    .getSelection && u.getSelection();
                if (s && 0 !== s.rangeCount) {
                  u = s.anchorNode;
                  var c = s.anchorOffset,
                    f = s.focusNode;
                  s = s.focusOffset;
                  try {
                    u.nodeType, f.nodeType;
                  } catch (e) {
                    u = null;
                    break e;
                  }
                  var d = 0,
                    p = -1,
                    h = -1,
                    m = 0,
                    g = 0,
                    y = l,
                    b = null;
                  t: for (;;) {
                    for (
                      var v;
                      y !== u || (0 !== c && 3 !== y.nodeType) || (p = d + c),
                        y !== f || (0 !== s && 3 !== y.nodeType) || (h = d + s),
                        3 === y.nodeType && (d += y.nodeValue.length),
                        null !== (v = y.firstChild);

                    )
                      (b = y), (y = v);
                    for (;;) {
                      if (y === l) break t;
                      if (
                        (b === u && ++m === c && (p = d),
                        b === f && ++g === s && (h = d),
                        null !== (v = y.nextSibling))
                      )
                        break;
                      b = (y = b).parentNode;
                    }
                    y = v;
                  }
                  u = -1 === p || -1 === h ? null : { start: p, end: h };
                } else u = null;
              }
            u = u || { start: 0, end: 0 };
          } else u = null;
          (gn = {
            activeElementDetached: null,
            focusedElem: l,
            selectionRange: u,
          }),
            (qt = !1),
            (Rl = a);
          do {
            try {
              hu();
            } catch (e) {
              if (null === Rl) throw Error(o(330));
              bu(Rl, e), (Rl = Rl.nextEffect);
            }
          } while (null !== Rl);
          Rl = a;
          do {
            try {
              for (l = e, u = t; null !== Rl; ) {
                var x = Rl.effectTag;
                if ((16 & x && Le(Rl.stateNode, ''), 128 & x)) {
                  var E = Rl.alternate;
                  if (null !== E) {
                    var w = E.ref;
                    null !== w &&
                      ('function' == typeof w ? w(null) : (w.current = null));
                  }
                }
                switch (1038 & x) {
                  case 2:
                    sl(Rl), (Rl.effectTag &= -3);
                    break;
                  case 6:
                    sl(Rl), (Rl.effectTag &= -3), fl(Rl.alternate, Rl);
                    break;
                  case 1024:
                    Rl.effectTag &= -1025;
                    break;
                  case 1028:
                    (Rl.effectTag &= -1025), fl(Rl.alternate, Rl);
                    break;
                  case 4:
                    fl(Rl.alternate, Rl);
                    break;
                  case 8:
                    cl(l, (c = Rl), u), ll(c);
                }
                Rl = Rl.nextEffect;
              }
            } catch (e) {
              if (null === Rl) throw Error(o(330));
              bu(Rl, e), (Rl = Rl.nextEffect);
            }
          } while (null !== Rl);
          if (
            ((w = gn),
            (E = pn()),
            (x = w.focusedElem),
            (u = w.selectionRange),
            E !== x &&
              x &&
              x.ownerDocument &&
              (function e(t, n) {
                return (
                  !(!t || !n) &&
                  (t === n ||
                    ((!t || 3 !== t.nodeType) &&
                      (n && 3 === n.nodeType
                        ? e(t, n.parentNode)
                        : 'contains' in t
                        ? t.contains(n)
                        : !!t.compareDocumentPosition &&
                          !!(16 & t.compareDocumentPosition(n)))))
                );
              })(x.ownerDocument.documentElement, x))
          ) {
            null !== u &&
              hn(x) &&
              ((E = u.start),
              void 0 === (w = u.end) && (w = E),
              'selectionStart' in x
                ? ((x.selectionStart = E),
                  (x.selectionEnd = Math.min(w, x.value.length)))
                : (w =
                    ((E = x.ownerDocument || document) && E.defaultView) ||
                    window).getSelection &&
                  ((w = w.getSelection()),
                  (c = x.textContent.length),
                  (l = Math.min(u.start, c)),
                  (u = void 0 === u.end ? l : Math.min(u.end, c)),
                  !w.extend && l > u && ((c = u), (u = l), (l = c)),
                  (c = dn(x, l)),
                  (f = dn(x, u)),
                  c &&
                    f &&
                    (1 !== w.rangeCount ||
                      w.anchorNode !== c.node ||
                      w.anchorOffset !== c.offset ||
                      w.focusNode !== f.node ||
                      w.focusOffset !== f.offset) &&
                    ((E = E.createRange()).setStart(c.node, c.offset),
                    w.removeAllRanges(),
                    l > u
                      ? (w.addRange(E), w.extend(f.node, f.offset))
                      : (E.setEnd(f.node, f.offset), w.addRange(E))))),
              (E = []);
            for (w = x; (w = w.parentNode); )
              1 === w.nodeType &&
                E.push({ element: w, left: w.scrollLeft, top: w.scrollTop });
            for (
              'function' == typeof x.focus && x.focus(), x = 0;
              x < E.length;
              x++
            )
              ((w = E[x]).element.scrollLeft = w.left),
                (w.element.scrollTop = w.top);
          }
          (qt = !!mn), (gn = mn = null), (e.current = n), (Rl = a);
          do {
            try {
              for (x = e; null !== Rl; ) {
                var D = Rl.effectTag;
                if ((36 & D && il(x, Rl.alternate, Rl), 128 & D)) {
                  E = void 0;
                  var k = Rl.ref;
                  if (null !== k) {
                    var C = Rl.stateNode;
                    switch (Rl.tag) {
                      case 5:
                        E = C;
                        break;
                      default:
                        E = C;
                    }
                    'function' == typeof k ? k(E) : (k.current = E);
                  }
                }
                Rl = Rl.nextEffect;
              }
            } catch (e) {
              if (null === Rl) throw Error(o(330));
              bu(Rl, e), (Rl = Rl.nextEffect);
            }
          } while (null !== Rl);
          (Rl = null), Pa(), (Dl = i);
        } else e.current = n;
        if (zl) (zl = !1), (Ll = e), (Ul = t);
        else
          for (Rl = a; null !== Rl; )
            (t = Rl.nextEffect), (Rl.nextEffect = null), (Rl = t);
        if (
          (0 === (t = e.firstPendingTime) && (Ml = null),
          1073741823 === t
            ? e === Vl
              ? Hl++
              : ((Hl = 0), (Vl = e))
            : (Hl = 0),
          'function' == typeof Eu && Eu(n.stateNode, r),
          Zl(e),
          Bl)
        )
          throw ((Bl = !1), (e = Il), (Il = null), e);
        return 0 != (8 & Dl) || Wa(), null;
      }
      function hu() {
        for (; null !== Rl; ) {
          var e = Rl.effectTag;
          0 != (256 & e) && nl(Rl.alternate, Rl),
            0 == (512 & e) ||
              zl ||
              ((zl = !0),
              Ha(97, function() {
                return mu(), null;
              })),
            (Rl = Rl.nextEffect);
        }
      }
      function mu() {
        if (90 !== Ul) {
          var e = 97 < Ul ? 97 : Ul;
          return (Ul = 90), $a(e, gu);
        }
      }
      function gu() {
        if (null === Ll) return !1;
        var e = Ll;
        if (((Ll = null), 0 != (48 & Dl))) throw Error(o(331));
        var t = Dl;
        for (Dl |= 32, e = e.current.firstEffect; null !== e; ) {
          try {
            var n = e;
            if (0 != (512 & n.effectTag))
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                case 22:
                  rl(5, n), al(5, n);
              }
          } catch (t) {
            if (null === e) throw Error(o(330));
            bu(e, t);
          }
          (n = e.nextEffect), (e.nextEffect = null), (e = n);
        }
        return (Dl = t), Wa(), !0;
      }
      function yu(e, t, n) {
        ui(e, (t = hl(e, (t = Xo(n, t)), 1073741823))),
          null !== (e = Kl(e, 1073741823)) && Zl(e);
      }
      function bu(e, t) {
        if (3 === e.tag) yu(e, e, t);
        else
          for (var n = e.return; null !== n; ) {
            if (3 === n.tag) {
              yu(n, e, t);
              break;
            }
            if (1 === n.tag) {
              var r = n.stateNode;
              if (
                'function' == typeof n.type.getDerivedStateFromError ||
                ('function' == typeof r.componentDidCatch &&
                  (null === Ml || !Ml.has(r)))
              ) {
                ui(n, (e = ml(n, (e = Xo(t, e)), 1073741823))),
                  null !== (n = Kl(n, 1073741823)) && Zl(n);
                break;
              }
            }
            n = n.return;
          }
      }
      function vu(e, t, n) {
        var r = e.pingCache;
        null !== r && r.delete(t),
          kl === e && _l === n
            ? Al === wl || (Al === El && 1073741823 === Sl && za() - Pl < 500)
              ? nu(e, _l)
              : (jl = !0)
            : Fu(e, n) &&
              ((0 !== (t = e.lastPingedTime) && t < n) ||
                ((e.lastPingedTime = n), Zl(e)));
      }
      function xu(e, t) {
        var n = e.stateNode;
        null !== n && n.delete(t),
          0 === (t = 0) && (t = Yl((t = ql()), e, null)),
          null !== (e = Kl(e, t)) && Zl(e);
      }
      gl = function(e, t, n) {
        var r = t.expirationTime;
        if (null !== e) {
          var a = t.pendingProps;
          if (e.memoizedProps !== a || da.current) No = !0;
          else {
            if (r < n) {
              switch (((No = !1), t.tag)) {
                case 3:
                  zo(t), To();
                  break;
                case 5:
                  if ((ji(t), 4 & t.mode && 1 !== n && a.hidden))
                    return (t.expirationTime = t.childExpirationTime = 1), null;
                  break;
                case 1:
                  ma(t.type) && va(t);
                  break;
                case 4:
                  Oi(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  (r = t.memoizedProps.value),
                    (a = t.type._context),
                    sa(Ka, a._currentValue),
                    (a._currentValue = r);
                  break;
                case 13:
                  if (null !== t.memoizedState)
                    return 0 !== (r = t.child.childExpirationTime) && r >= n
                      ? Vo(e, t, n)
                      : (sa(Ri, 1 & Ri.current),
                        null !== (t = Qo(e, t, n)) ? t.sibling : null);
                  sa(Ri, 1 & Ri.current);
                  break;
                case 19:
                  if (
                    ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                  ) {
                    if (r) return Yo(e, t, n);
                    t.effectTag |= 64;
                  }
                  if (
                    (null !== (a = t.memoizedState) &&
                      ((a.rendering = null), (a.tail = null)),
                    sa(Ri, Ri.current),
                    !r)
                  )
                    return null;
              }
              return Qo(e, t, n);
            }
            No = !1;
          }
        } else No = !1;
        switch (((t.expirationTime = 0), t.tag)) {
          case 2:
            if (
              ((r = t.type),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (a = ha(t, fa.current)),
              ni(t, n),
              (a = Yi(null, t, r, e, a, n)),
              (t.effectTag |= 1),
              'object' == typeof a &&
                null !== a &&
                'function' == typeof a.render &&
                void 0 === a.$$typeof)
            ) {
              if (
                ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                ma(r))
              ) {
                var i = !0;
                va(t);
              } else i = !1;
              (t.memoizedState =
                null !== a.state && void 0 !== a.state ? a.state : null),
                ii(t);
              var l = r.getDerivedStateFromProps;
              'function' == typeof l && hi(t, r, l, e),
                (a.updater = mi),
                (t.stateNode = a),
                (a._reactInternalFiber = t),
                vi(t, r, e, n),
                (t = Mo(null, t, r, !0, i, n));
            } else (t.tag = 0), Oo(null, t, a, n), (t = t.child);
            return t;
          case 16:
            e: {
              if (
                ((a = t.elementType),
                null !== e &&
                  ((e.alternate = null),
                  (t.alternate = null),
                  (t.effectTag |= 2)),
                (e = t.pendingProps),
                (function(e) {
                  if (-1 === e._status) {
                    e._status = 0;
                    var t = e._ctor;
                    (t = t()),
                      (e._result = t),
                      t.then(
                        function(t) {
                          0 === e._status &&
                            ((t = t.default), (e._status = 1), (e._result = t));
                        },
                        function(t) {
                          0 === e._status && ((e._status = 2), (e._result = t));
                        },
                      );
                  }
                })(a),
                1 !== a._status)
              )
                throw a._result;
              switch (
                ((a = a._result),
                (t.type = a),
                (i = t.tag = (function(e) {
                  if ('function' == typeof e) return Cu(e) ? 1 : 0;
                  if (null != e) {
                    if ((e = e.$$typeof) === ue) return 11;
                    if (e === fe) return 14;
                  }
                  return 2;
                })(a)),
                (e = Qa(a, e)),
                i)
              ) {
                case 0:
                  t = Bo(null, t, a, e, n);
                  break e;
                case 1:
                  t = Io(null, t, a, e, n);
                  break e;
                case 11:
                  t = Fo(null, t, a, e, n);
                  break e;
                case 14:
                  t = jo(null, t, a, Qa(a.type, e), r, n);
                  break e;
              }
              throw Error(o(306, a, ''));
            }
            return t;
          case 0:
            return (
              (r = t.type),
              (a = t.pendingProps),
              Bo(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
            );
          case 1:
            return (
              (r = t.type),
              (a = t.pendingProps),
              Io(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
            );
          case 3:
            if ((zo(t), (r = t.updateQueue), null === e || null === r))
              throw Error(o(282));
            if (
              ((r = t.pendingProps),
              (a = null !== (a = t.memoizedState) ? a.element : null),
              oi(e, t),
              ci(t, r, null, n),
              (r = t.memoizedState.element) === a)
            )
              To(), (t = Qo(e, t, n));
            else {
              if (
                ((a = t.stateNode.hydrate) &&
                  ((Eo = En(t.stateNode.containerInfo.firstChild)),
                  (xo = t),
                  (a = wo = !0)),
                a)
              )
                for (n = Ci(t, null, r, n), t.child = n; n; )
                  (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
              else Oo(e, t, r, n), To();
              t = t.child;
            }
            return t;
          case 5:
            return (
              ji(t),
              null === e && Co(t),
              (r = t.type),
              (a = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (l = a.children),
              bn(r, a)
                ? (l = null)
                : null !== i && bn(r, i) && (t.effectTag |= 16),
              Ro(e, t),
              4 & t.mode && 1 !== n && a.hidden
                ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
                : (Oo(e, t, l, n), (t = t.child)),
              t
            );
          case 6:
            return null === e && Co(t), null;
          case 13:
            return Vo(e, t, n);
          case 4:
            return (
              Oi(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = ki(t, null, r, n)) : Oo(e, t, r, n),
              t.child
            );
          case 11:
            return (
              (r = t.type),
              (a = t.pendingProps),
              Fo(e, t, r, (a = t.elementType === r ? a : Qa(r, a)), n)
            );
          case 7:
            return Oo(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return Oo(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              (r = t.type._context),
                (a = t.pendingProps),
                (l = t.memoizedProps),
                (i = a.value);
              var u = t.type._context;
              if ((sa(Ka, u._currentValue), (u._currentValue = i), null !== l))
                if (
                  ((u = l.value),
                  0 ===
                    (i = Ir(u, i)
                      ? 0
                      : 0 |
                        ('function' == typeof r._calculateChangedBits
                          ? r._calculateChangedBits(u, i)
                          : 1073741823)))
                ) {
                  if (l.children === a.children && !da.current) {
                    t = Qo(e, t, n);
                    break e;
                  }
                } else
                  for (null !== (u = t.child) && (u.return = t); null !== u; ) {
                    var s = u.dependencies;
                    if (null !== s) {
                      l = u.child;
                      for (var c = s.firstContext; null !== c; ) {
                        if (c.context === r && 0 != (c.observedBits & i)) {
                          1 === u.tag &&
                            (((c = li(n, null)).tag = 2), ui(u, c)),
                            u.expirationTime < n && (u.expirationTime = n),
                            null !== (c = u.alternate) &&
                              c.expirationTime < n &&
                              (c.expirationTime = n),
                            ti(u.return, n),
                            s.expirationTime < n && (s.expirationTime = n);
                          break;
                        }
                        c = c.next;
                      }
                    } else
                      l = 10 === u.tag && u.type === t.type ? null : u.child;
                    if (null !== l) l.return = u;
                    else
                      for (l = u; null !== l; ) {
                        if (l === t) {
                          l = null;
                          break;
                        }
                        if (null !== (u = l.sibling)) {
                          (u.return = l.return), (l = u);
                          break;
                        }
                        l = l.return;
                      }
                    u = l;
                  }
              Oo(e, t, a.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (a = t.type),
              (r = (i = t.pendingProps).children),
              ni(t, n),
              (r = r((a = ri(a, i.unstable_observedBits)))),
              (t.effectTag |= 1),
              Oo(e, t, r, n),
              t.child
            );
          case 14:
            return (
              (i = Qa((a = t.type), t.pendingProps)),
              jo(e, t, a, (i = Qa(a.type, i)), r, n)
            );
          case 15:
            return Po(e, t, t.type, t.pendingProps, r, n);
          case 17:
            return (
              (r = t.type),
              (a = t.pendingProps),
              (a = t.elementType === r ? a : Qa(r, a)),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (t.tag = 1),
              ma(r) ? ((e = !0), va(t)) : (e = !1),
              ni(t, n),
              yi(t, r, a),
              vi(t, r, a, n),
              Mo(null, t, r, !0, e, n)
            );
          case 19:
            return Yo(e, t, n);
        }
        throw Error(o(156, t.tag));
      };
      var Eu = null,
        wu = null;
      function Du(e, t, n, r) {
        (this.tag = e),
          (this.key = n),
          (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
          (this.index = 0),
          (this.ref = null),
          (this.pendingProps = t),
          (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
          (this.mode = r),
          (this.effectTag = 0),
          (this.lastEffect = this.firstEffect = this.nextEffect = null),
          (this.childExpirationTime = this.expirationTime = 0),
          (this.alternate = null);
      }
      function ku(e, t, n, r) {
        return new Du(e, t, n, r);
      }
      function Cu(e) {
        return !(!(e = e.prototype) || !e.isReactComponent);
      }
      function _u(e, t) {
        var n = e.alternate;
        return (
          null === n
            ? (((n = ku(e.tag, t, e.key, e.mode)).elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.effectTag = 0),
              (n.nextEffect = null),
              (n.firstEffect = null),
              (n.lastEffect = null)),
          (n.childExpirationTime = e.childExpirationTime),
          (n.expirationTime = e.expirationTime),
          (n.child = e.child),
          (n.memoizedProps = e.memoizedProps),
          (n.memoizedState = e.memoizedState),
          (n.updateQueue = e.updateQueue),
          (t = e.dependencies),
          (n.dependencies =
            null === t
              ? null
              : {
                  expirationTime: t.expirationTime,
                  firstContext: t.firstContext,
                  responders: t.responders,
                }),
          (n.sibling = e.sibling),
          (n.index = e.index),
          (n.ref = e.ref),
          n
        );
      }
      function Au(e, t, n, r, a, i) {
        var l = 2;
        if (((r = e), 'function' == typeof e)) Cu(e) && (l = 1);
        else if ('string' == typeof e) l = 5;
        else
          e: switch (e) {
            case ne:
              return Tu(n.children, a, i, t);
            case le:
              (l = 8), (a |= 7);
              break;
            case re:
              (l = 8), (a |= 1);
              break;
            case ae:
              return (
                ((e = ku(12, n, t, 8 | a)).elementType = ae),
                (e.type = ae),
                (e.expirationTime = i),
                e
              );
            case se:
              return (
                ((e = ku(13, n, t, a)).type = se),
                (e.elementType = se),
                (e.expirationTime = i),
                e
              );
            case ce:
              return (
                ((e = ku(19, n, t, a)).elementType = ce),
                (e.expirationTime = i),
                e
              );
            default:
              if ('object' == typeof e && null !== e)
                switch (e.$$typeof) {
                  case ie:
                    l = 10;
                    break e;
                  case oe:
                    l = 9;
                    break e;
                  case ue:
                    l = 11;
                    break e;
                  case fe:
                    l = 14;
                    break e;
                  case de:
                    (l = 16), (r = null);
                    break e;
                  case pe:
                    l = 22;
                    break e;
                }
              throw Error(o(130, null == e ? e : typeof e, ''));
          }
        return (
          ((t = ku(l, n, t, a)).elementType = e),
          (t.type = r),
          (t.expirationTime = i),
          t
        );
      }
      function Tu(e, t, n, r) {
        return ((e = ku(7, e, r, t)).expirationTime = n), e;
      }
      function Su(e, t, n) {
        return ((e = ku(6, e, null, t)).expirationTime = n), e;
      }
      function Nu(e, t, n) {
        return (
          ((t = ku(
            4,
            null !== e.children ? e.children : [],
            e.key,
            t,
          )).expirationTime = n),
          (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
          }),
          t
        );
      }
      function Ou(e, t, n) {
        (this.tag = t),
          (this.current = null),
          (this.containerInfo = e),
          (this.pingCache = this.pendingChildren = null),
          (this.finishedExpirationTime = 0),
          (this.finishedWork = null),
          (this.timeoutHandle = -1),
          (this.pendingContext = this.context = null),
          (this.hydrate = n),
          (this.callbackNode = null),
          (this.callbackPriority = 90),
          (this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0);
      }
      function Fu(e, t) {
        var n = e.firstSuspendedTime;
        return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
      }
      function ju(e, t) {
        var n = e.firstSuspendedTime,
          r = e.lastSuspendedTime;
        n < t && (e.firstSuspendedTime = t),
          (r > t || 0 === n) && (e.lastSuspendedTime = t),
          t <= e.lastPingedTime && (e.lastPingedTime = 0),
          t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
      }
      function Pu(e, t) {
        t > e.firstPendingTime && (e.firstPendingTime = t);
        var n = e.firstSuspendedTime;
        0 !== n &&
          (t >= n
            ? (e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0)
            : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1),
          t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
      }
      function Ru(e, t) {
        var n = e.lastExpiredTime;
        (0 === n || n > t) && (e.lastExpiredTime = t);
      }
      function Bu(e, t, n, r) {
        var a = t.current,
          i = ql(),
          l = di.suspense;
        i = Yl(i, a, l);
        e: if (n) {
          t: {
            if (Je((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
              throw Error(o(170));
            var u = n;
            do {
              switch (u.tag) {
                case 3:
                  u = u.stateNode.context;
                  break t;
                case 1:
                  if (ma(u.type)) {
                    u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                    break t;
                  }
              }
              u = u.return;
            } while (null !== u);
            throw Error(o(171));
          }
          if (1 === n.tag) {
            var s = n.type;
            if (ma(s)) {
              n = ba(n, s, u);
              break e;
            }
          }
          n = u;
        } else n = ca;
        return (
          null === t.context ? (t.context = n) : (t.pendingContext = n),
          ((t = li(i, l)).payload = { element: e }),
          null !== (r = void 0 === r ? null : r) && (t.callback = r),
          ui(a, t),
          Ql(a, i),
          i
        );
      }
      function Iu(e) {
        if (!(e = e.current).child) return null;
        switch (e.child.tag) {
          case 5:
          default:
            return e.child.stateNode;
        }
      }
      function Mu(e, t) {
        null !== (e = e.memoizedState) &&
          null !== e.dehydrated &&
          e.retryTime < t &&
          (e.retryTime = t);
      }
      function zu(e, t) {
        Mu(e, t), (e = e.alternate) && Mu(e, t);
      }
      function Lu(e, t, n) {
        var r = new Ou(e, t, (n = null != n && !0 === n.hydrate)),
          a = ku(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
        (r.current = a),
          (a.stateNode = r),
          ii(a),
          (e[_n] = r.current),
          n &&
            0 !== t &&
            (function(e, t) {
              var n = Xe(t);
              _t.forEach(function(e) {
                ht(e, t, n);
              }),
                At.forEach(function(e) {
                  ht(e, t, n);
                });
            })(0, 9 === e.nodeType ? e : e.ownerDocument),
          (this._internalRoot = r);
      }
      function Uu(e) {
        return !(
          !e ||
          (1 !== e.nodeType &&
            9 !== e.nodeType &&
            11 !== e.nodeType &&
            (8 !== e.nodeType ||
              ' react-mount-point-unstable ' !== e.nodeValue))
        );
      }
      function $u(e, t, n, r, a) {
        var i = n._reactRootContainer;
        if (i) {
          var o = i._internalRoot;
          if ('function' == typeof a) {
            var l = a;
            a = function() {
              var e = Iu(o);
              l.call(e);
            };
          }
          Bu(t, o, e, a);
        } else {
          if (
            ((i = n._reactRootContainer = (function(e, t) {
              if (
                (t ||
                  (t = !(
                    !(t = e
                      ? 9 === e.nodeType
                        ? e.documentElement
                        : e.firstChild
                      : null) ||
                    1 !== t.nodeType ||
                    !t.hasAttribute('data-reactroot')
                  )),
                !t)
              )
                for (var n; (n = e.lastChild); ) e.removeChild(n);
              return new Lu(e, 0, t ? { hydrate: !0 } : void 0);
            })(n, r)),
            (o = i._internalRoot),
            'function' == typeof a)
          ) {
            var u = a;
            a = function() {
              var e = Iu(o);
              u.call(e);
            };
          }
          tu(function() {
            Bu(t, o, e, a);
          });
        }
        return Iu(o);
      }
      function Hu(e, t, n) {
        var r =
          3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: te,
          key: null == r ? null : '' + r,
          children: e,
          containerInfo: t,
          implementation: n,
        };
      }
      function Vu(e, t) {
        var n =
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!Uu(t)) throw Error(o(200));
        return Hu(e, t, null, n);
      }
      (Lu.prototype.render = function(e) {
        Bu(e, this._internalRoot, null, null);
      }),
        (Lu.prototype.unmount = function() {
          var e = this._internalRoot,
            t = e.containerInfo;
          Bu(null, e, null, function() {
            t[_n] = null;
          });
        }),
        (mt = function(e) {
          if (13 === e.tag) {
            var t = Ya(ql(), 150, 100);
            Ql(e, t), zu(e, t);
          }
        }),
        (gt = function(e) {
          13 === e.tag && (Ql(e, 3), zu(e, 3));
        }),
        (yt = function(e) {
          if (13 === e.tag) {
            var t = ql();
            Ql(e, (t = Yl(t, e, null))), zu(e, t);
          }
        }),
        (T = function(e, t, n) {
          switch (t) {
            case 'input':
              if ((Ce(e, n), (t = n.name), 'radio' === n.type && null != t)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                  n = n.querySelectorAll(
                    'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
                  ),
                    t = 0;
                  t < n.length;
                  t++
                ) {
                  var r = n[t];
                  if (r !== e && r.form === e.form) {
                    var a = Nn(r);
                    if (!a) throw Error(o(90));
                    Ee(r), Ce(r, a);
                  }
                }
              }
              break;
            case 'textarea':
              Fe(e, n);
              break;
            case 'select':
              null != (t = n.value) && Se(e, !!n.multiple, t, !1);
          }
        }),
        (P = eu),
        (R = function(e, t, n, r, a) {
          var i = Dl;
          Dl |= 4;
          try {
            return $a(98, e.bind(null, t, n, r, a));
          } finally {
            0 === (Dl = i) && Wa();
          }
        }),
        (B = function() {
          0 == (49 & Dl) &&
            ((function() {
              if (null !== $l) {
                var e = $l;
                ($l = null),
                  e.forEach(function(e, t) {
                    Ru(t, e), Zl(t);
                  }),
                  Wa();
              }
            })(),
            mu());
        }),
        (I = function(e, t) {
          var n = Dl;
          Dl |= 2;
          try {
            return e(t);
          } finally {
            0 === (Dl = n) && Wa();
          }
        });
      var Wu,
        qu,
        Yu = {
          Events: [
            Tn,
            Sn,
            Nn,
            _,
            D,
            In,
            function(e) {
              at(e, Bn);
            },
            F,
            j,
            Zt,
            lt,
            mu,
            { current: !1 },
          ],
        };
      (qu = (Wu = {
        findFiberByHostInstance: An,
        bundleType: 0,
        version: '16.14.0',
        rendererPackageName: 'react-dom',
      }).findFiberByHostInstance),
        (function(e) {
          if ('undefined' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
          var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (t.isDisabled || !t.supportsFiber) return !0;
          try {
            var n = t.inject(e);
            (Eu = function(e) {
              try {
                t.onCommitFiberRoot(
                  n,
                  e,
                  void 0,
                  64 == (64 & e.current.effectTag),
                );
              } catch (e) {}
            }),
              (wu = function(e) {
                try {
                  t.onCommitFiberUnmount(n, e);
                } catch (e) {}
              });
          } catch (e) {}
        })(
          a({}, Wu, {
            overrideHookState: null,
            overrideProps: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: G.ReactCurrentDispatcher,
            findHostInstanceByFiber: function(e) {
              return null === (e = nt(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance: function(e) {
              return qu ? qu(e) : null;
            },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
          }),
        ),
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yu),
        (t.createPortal = Vu),
        (t.findDOMNode = function(e) {
          if (null == e) return null;
          if (1 === e.nodeType) return e;
          var t = e._reactInternalFiber;
          if (void 0 === t) {
            if ('function' == typeof e.render) throw Error(o(188));
            throw Error(o(268, Object.keys(e)));
          }
          return (e = null === (e = nt(t)) ? null : e.stateNode);
        }),
        (t.flushSync = function(e, t) {
          if (0 != (48 & Dl)) throw Error(o(187));
          var n = Dl;
          Dl |= 1;
          try {
            return $a(99, e.bind(null, t));
          } finally {
            (Dl = n), Wa();
          }
        }),
        (t.hydrate = function(e, t, n) {
          if (!Uu(t)) throw Error(o(200));
          return $u(null, e, t, !0, n);
        }),
        (t.render = function(e, t, n) {
          if (!Uu(t)) throw Error(o(200));
          return $u(null, e, t, !1, n);
        }),
        (t.unmountComponentAtNode = function(e) {
          if (!Uu(e)) throw Error(o(40));
          return (
            !!e._reactRootContainer &&
            (tu(function() {
              $u(null, null, e, !1, function() {
                (e._reactRootContainer = null), (e[_n] = null);
              });
            }),
            !0)
          );
        }),
        (t.unstable_batchedUpdates = eu),
        (t.unstable_createPortal = function(e, t) {
          return Vu(
            e,
            t,
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null,
          );
        }),
        (t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
          if (!Uu(n)) throw Error(o(200));
          if (null == e || void 0 === e._reactInternalFiber) throw Error(o(38));
          return $u(e, t, n, !1, r);
        }),
        (t.version = '16.14.0');
    },
    72: function(e, t, n) {
      'use strict';
      e.exports = n(73);
    },
    73: function(e, t, n) {
      'use strict';
      /** @license React v0.19.1
       * scheduler.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var r, a, i, o, l;
      if ('undefined' == typeof window || 'function' != typeof MessageChannel) {
        var u = null,
          s = null,
          c = function() {
            if (null !== u)
              try {
                var e = t.unstable_now();
                u(!0, e), (u = null);
              } catch (e) {
                throw (setTimeout(c, 0), e);
              }
          },
          f = Date.now();
        (t.unstable_now = function() {
          return Date.now() - f;
        }),
          (r = function(e) {
            null !== u ? setTimeout(r, 0, e) : ((u = e), setTimeout(c, 0));
          }),
          (a = function(e, t) {
            s = setTimeout(e, t);
          }),
          (i = function() {
            clearTimeout(s);
          }),
          (o = function() {
            return !1;
          }),
          (l = t.unstable_forceFrameRate = function() {});
      } else {
        var d = window.performance,
          p = window.Date,
          h = window.setTimeout,
          m = window.clearTimeout;
        if ('undefined' != typeof console) {
          var g = window.cancelAnimationFrame;
          'function' != typeof window.requestAnimationFrame &&
            console.error(
              "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
            ),
            'function' != typeof g &&
              console.error(
                "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills",
              );
        }
        if ('object' == typeof d && 'function' == typeof d.now)
          t.unstable_now = function() {
            return d.now();
          };
        else {
          var y = p.now();
          t.unstable_now = function() {
            return p.now() - y;
          };
        }
        var b = !1,
          v = null,
          x = -1,
          E = 5,
          w = 0;
        (o = function() {
          return t.unstable_now() >= w;
        }),
          (l = function() {}),
          (t.unstable_forceFrameRate = function(e) {
            0 > e || 125 < e
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported',
                )
              : (E = 0 < e ? Math.floor(1e3 / e) : 5);
          });
        var D = new MessageChannel(),
          k = D.port2;
        (D.port1.onmessage = function() {
          if (null !== v) {
            var e = t.unstable_now();
            w = e + E;
            try {
              v(!0, e) ? k.postMessage(null) : ((b = !1), (v = null));
            } catch (e) {
              throw (k.postMessage(null), e);
            }
          } else b = !1;
        }),
          (r = function(e) {
            (v = e), b || ((b = !0), k.postMessage(null));
          }),
          (a = function(e, n) {
            x = h(function() {
              e(t.unstable_now());
            }, n);
          }),
          (i = function() {
            m(x), (x = -1);
          });
      }
      function C(e, t) {
        var n = e.length;
        e.push(t);
        e: for (;;) {
          var r = (n - 1) >>> 1,
            a = e[r];
          if (!(void 0 !== a && 0 < T(a, t))) break e;
          (e[r] = t), (e[n] = a), (n = r);
        }
      }
      function _(e) {
        return void 0 === (e = e[0]) ? null : e;
      }
      function A(e) {
        var t = e[0];
        if (void 0 !== t) {
          var n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, a = e.length; r < a; ) {
              var i = 2 * (r + 1) - 1,
                o = e[i],
                l = i + 1,
                u = e[l];
              if (void 0 !== o && 0 > T(o, n))
                void 0 !== u && 0 > T(u, o)
                  ? ((e[r] = u), (e[l] = n), (r = l))
                  : ((e[r] = o), (e[i] = n), (r = i));
              else {
                if (!(void 0 !== u && 0 > T(u, n))) break e;
                (e[r] = u), (e[l] = n), (r = l);
              }
            }
          }
          return t;
        }
        return null;
      }
      function T(e, t) {
        var n = e.sortIndex - t.sortIndex;
        return 0 !== n ? n : e.id - t.id;
      }
      var S = [],
        N = [],
        O = 1,
        F = null,
        j = 3,
        P = !1,
        R = !1,
        B = !1;
      function I(e) {
        for (var t = _(N); null !== t; ) {
          if (null === t.callback) A(N);
          else {
            if (!(t.startTime <= e)) break;
            A(N), (t.sortIndex = t.expirationTime), C(S, t);
          }
          t = _(N);
        }
      }
      function M(e) {
        if (((B = !1), I(e), !R))
          if (null !== _(S)) (R = !0), r(z);
          else {
            var t = _(N);
            null !== t && a(M, t.startTime - e);
          }
      }
      function z(e, n) {
        (R = !1), B && ((B = !1), i()), (P = !0);
        var r = j;
        try {
          for (
            I(n), F = _(S);
            null !== F && (!(F.expirationTime > n) || (e && !o()));

          ) {
            var l = F.callback;
            if (null !== l) {
              (F.callback = null), (j = F.priorityLevel);
              var u = l(F.expirationTime <= n);
              (n = t.unstable_now()),
                'function' == typeof u ? (F.callback = u) : F === _(S) && A(S),
                I(n);
            } else A(S);
            F = _(S);
          }
          if (null !== F) var s = !0;
          else {
            var c = _(N);
            null !== c && a(M, c.startTime - n), (s = !1);
          }
          return s;
        } finally {
          (F = null), (j = r), (P = !1);
        }
      }
      function L(e) {
        switch (e) {
          case 1:
            return -1;
          case 2:
            return 250;
          case 5:
            return 1073741823;
          case 4:
            return 1e4;
          default:
            return 5e3;
        }
      }
      var U = l;
      (t.unstable_IdlePriority = 5),
        (t.unstable_ImmediatePriority = 1),
        (t.unstable_LowPriority = 4),
        (t.unstable_NormalPriority = 3),
        (t.unstable_Profiling = null),
        (t.unstable_UserBlockingPriority = 2),
        (t.unstable_cancelCallback = function(e) {
          e.callback = null;
        }),
        (t.unstable_continueExecution = function() {
          R || P || ((R = !0), r(z));
        }),
        (t.unstable_getCurrentPriorityLevel = function() {
          return j;
        }),
        (t.unstable_getFirstCallbackNode = function() {
          return _(S);
        }),
        (t.unstable_next = function(e) {
          switch (j) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = j;
          }
          var n = j;
          j = t;
          try {
            return e();
          } finally {
            j = n;
          }
        }),
        (t.unstable_pauseExecution = function() {}),
        (t.unstable_requestPaint = U),
        (t.unstable_runWithPriority = function(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = j;
          j = e;
          try {
            return t();
          } finally {
            j = n;
          }
        }),
        (t.unstable_scheduleCallback = function(e, n, o) {
          var l = t.unstable_now();
          if ('object' == typeof o && null !== o) {
            var u = o.delay;
            (u = 'number' == typeof u && 0 < u ? l + u : l),
              (o = 'number' == typeof o.timeout ? o.timeout : L(e));
          } else (o = L(e)), (u = l);
          return (
            (e = {
              id: O++,
              callback: n,
              priorityLevel: e,
              startTime: u,
              expirationTime: (o = u + o),
              sortIndex: -1,
            }),
            u > l
              ? ((e.sortIndex = u),
                C(N, e),
                null === _(S) &&
                  e === _(N) &&
                  (B ? i() : (B = !0), a(M, u - l)))
              : ((e.sortIndex = o), C(S, e), R || P || ((R = !0), r(z))),
            e
          );
        }),
        (t.unstable_shouldYield = function() {
          var e = t.unstable_now();
          I(e);
          var n = _(S);
          return (
            (n !== F &&
              null !== F &&
              null !== n &&
              null !== n.callback &&
              n.startTime <= e &&
              n.expirationTime < F.expirationTime) ||
            o()
          );
        }),
        (t.unstable_wrapCallback = function(e) {
          var t = j;
          return function() {
            var n = j;
            j = t;
            try {
              return e.apply(this, arguments);
            } finally {
              j = n;
            }
          };
        });
    },
    74: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(75),
        o = n(76),
        l = n(6),
        u = n(4);
      e.exports = r(
        class extends a {
          title() {
            return this._json.title;
          }
          version() {
            return this._json.version;
          }
          termsOfService() {
            return this._json.termsOfService;
          }
          license() {
            return this._json.license ? new i(this._json.license) : null;
          }
          contact() {
            return this._json.contact ? new o(this._json.contact) : null;
          }
        },
        l,
        u,
      );
    },
    75: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
          url() {
            return this._json.url;
          }
        },
        i,
      );
    },
    76: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
          url() {
            return this._json.url;
          }
          email() {
            return this._json.email;
          }
        },
        i,
      );
    },
    77: function(e, t, n) {
      const r = n(3);
      e.exports = class extends r {};
    },
    78: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        o = n(4);
      e.exports = r(
        class extends a {
          url() {
            return this._json.url;
          }
        },
        i,
        o,
      );
    },
    79: function(e, t, n) {
      const r = n(30);
      e.exports = class extends r {
        isPublish() {
          return !0;
        }
        isSubscribe() {
          return !1;
        }
        kind() {
          return 'publish';
        }
      };
    },
    80: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        o = n(17),
        l = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
        },
        i,
        o,
        l,
      );
    },
    81: function(e, t, n) {
      'use strict';
      (t.byteLength = function(e) {
        var t = s(e),
          n = t[0],
          r = t[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (t.toByteArray = function(e) {
          var t,
            n,
            r = s(e),
            o = r[0],
            l = r[1],
            u = new i(
              (function(e, t, n) {
                return (3 * (t + n)) / 4 - n;
              })(0, o, l),
            ),
            c = 0,
            f = l > 0 ? o - 4 : o;
          for (n = 0; n < f; n += 4)
            (t =
              (a[e.charCodeAt(n)] << 18) |
              (a[e.charCodeAt(n + 1)] << 12) |
              (a[e.charCodeAt(n + 2)] << 6) |
              a[e.charCodeAt(n + 3)]),
              (u[c++] = (t >> 16) & 255),
              (u[c++] = (t >> 8) & 255),
              (u[c++] = 255 & t);
          2 === l &&
            ((t = (a[e.charCodeAt(n)] << 2) | (a[e.charCodeAt(n + 1)] >> 4)),
            (u[c++] = 255 & t));
          1 === l &&
            ((t =
              (a[e.charCodeAt(n)] << 10) |
              (a[e.charCodeAt(n + 1)] << 4) |
              (a[e.charCodeAt(n + 2)] >> 2)),
            (u[c++] = (t >> 8) & 255),
            (u[c++] = 255 & t));
          return u;
        }),
        (t.fromByteArray = function(e) {
          for (
            var t, n = e.length, a = n % 3, i = [], o = 0, l = n - a;
            o < l;
            o += 16383
          )
            i.push(c(e, o, o + 16383 > l ? l : o + 16383));
          1 === a
            ? ((t = e[n - 1]), i.push(r[t >> 2] + r[(t << 4) & 63] + '=='))
            : 2 === a &&
              ((t = (e[n - 2] << 8) + e[n - 1]),
              i.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + '='));
          return i.join('');
        });
      for (
        var r = [],
          a = [],
          i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          o =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          l = 0,
          u = o.length;
        l < u;
        ++l
      )
        (r[l] = o[l]), (a[o.charCodeAt(l)] = l);
      function s(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4');
        var n = e.indexOf('=');
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function c(e, t, n) {
        for (var a, i, o = [], l = t; l < n; l += 3)
          (a =
            ((e[l] << 16) & 16711680) +
            ((e[l + 1] << 8) & 65280) +
            (255 & e[l + 2])),
            o.push(
              r[((i = a) >> 18) & 63] +
                r[(i >> 12) & 63] +
                r[(i >> 6) & 63] +
                r[63 & i],
            );
        return o.join('');
      }
      (a['-'.charCodeAt(0)] = 62), (a['_'.charCodeAt(0)] = 63);
    },
    82: function(e, t) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      (t.read = function(e, t, n, r, a) {
        var i,
          o,
          l = 8 * a - r - 1,
          u = (1 << l) - 1,
          s = u >> 1,
          c = -7,
          f = n ? a - 1 : 0,
          d = n ? -1 : 1,
          p = e[t + f];
        for (
          f += d, i = p & ((1 << -c) - 1), p >>= -c, c += l;
          c > 0;
          i = 256 * i + e[t + f], f += d, c -= 8
        );
        for (
          o = i & ((1 << -c) - 1), i >>= -c, c += r;
          c > 0;
          o = 256 * o + e[t + f], f += d, c -= 8
        );
        if (0 === i) i = 1 - s;
        else {
          if (i === u) return o ? NaN : (1 / 0) * (p ? -1 : 1);
          (o += Math.pow(2, r)), (i -= s);
        }
        return (p ? -1 : 1) * o * Math.pow(2, i - r);
      }),
        (t.write = function(e, t, n, r, a, i) {
          var o,
            l,
            u,
            s = 8 * i - a - 1,
            c = (1 << s) - 1,
            f = c >> 1,
            d = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : i - 1,
            h = r ? 1 : -1,
            m = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((l = isNaN(t) ? 1 : 0), (o = c))
                : ((o = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
                  (t += o + f >= 1 ? d / u : d * Math.pow(2, 1 - f)) * u >= 2 &&
                    (o++, (u /= 2)),
                  o + f >= c
                    ? ((l = 0), (o = c))
                    : o + f >= 1
                    ? ((l = (t * u - 1) * Math.pow(2, a)), (o += f))
                    : ((l = t * Math.pow(2, f - 1) * Math.pow(2, a)), (o = 0)));
            a >= 8;
            e[n + p] = 255 & l, p += h, l /= 256, a -= 8
          );
          for (
            o = (o << a) | l, s += a;
            s > 0;
            e[n + p] = 255 & o, p += h, o /= 256, s -= 8
          );
          e[n + p - h] |= 128 * m;
        });
    },
    83: function(e, t, n) {
      const r = n(3);
      e.exports = class extends r {};
    },
    84: function(e, t, n) {
      const r = n(30);
      e.exports = class extends r {
        isPublish() {
          return !1;
        }
        isSubscribe() {
          return !0;
        }
        kind() {
          return 'subscribe';
        }
      };
    },
    85: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        o = n(3),
        l = n(40),
        u = n(43),
        s = n(10),
        c = n(86),
        f = n(38),
        d = n(41),
        p = n(46),
        h = n(47),
        m = n(44),
        g = n(39),
        y = n(4);
      e.exports = i(
        class extends o {
          channels() {
            return r(this._json.channels, l);
          }
          hasChannels() {
            return !!this._json.channels;
          }
          channel(e) {
            return a(this._json.channels, e, l);
          }
          messages() {
            return r(this._json.messages, u);
          }
          hasMessages() {
            return !!this._json.messages;
          }
          message(e) {
            return a(this._json.messages, e, u);
          }
          schemas() {
            return r(this._json.schemas, s);
          }
          hasSchemas() {
            return !!this._json.schemas;
          }
          schema(e) {
            return a(this._json.schemas, e, s);
          }
          securitySchemes() {
            return r(this._json.securitySchemes, c);
          }
          hasSecuritySchemes() {
            return !!this._json.securitySchemes;
          }
          securityScheme(e) {
            return a(this._json.securitySchemes, e, c);
          }
          servers() {
            return r(this._json.servers, f);
          }
          hasServers() {
            return !!this._json.servers;
          }
          server(e) {
            return a(this._json.servers, e, f);
          }
          parameters() {
            return r(this._json.parameters, d);
          }
          hasParameters() {
            return !!this._json.parameters;
          }
          parameter(e) {
            return a(this._json.parameters, e, d);
          }
          correlationIds() {
            return r(this._json.correlationIds, p);
          }
          hasCorrelationIds() {
            return !!this._json.correlationIds;
          }
          correlationId(e) {
            return a(this._json.correlationIds, e, p);
          }
          operationTraits() {
            return r(this._json.operationTraits, h);
          }
          hasOperationTraits() {
            return !!this._json.operationTraits;
          }
          operationTrait(e) {
            return a(this._json.operationTraits, e, h);
          }
          messageTraits() {
            return r(this._json.messageTraits, m);
          }
          hasMessageTraits() {
            return !!this._json.messageTraits;
          }
          messageTrait(e) {
            return a(this._json.messageTraits, e, m);
          }
          serverVariables() {
            return r(this._json.serverVariables, g);
          }
          hasServerVariables() {
            return !!this._json.serverVariables;
          }
          serverVariable(e) {
            return a(this._json.serverVariables, e, g);
          }
        },
        y,
      );
    },
    86: function(e, t, n) {
      const { createMapOfType: r, mix: a } = n(2),
        i = n(3),
        o = n(87),
        l = n(6),
        u = n(4);
      e.exports = a(
        class extends i {
          type() {
            return this._json.type;
          }
          name() {
            return this._json.name;
          }
          in() {
            return this._json.in;
          }
          scheme() {
            return this._json.scheme;
          }
          bearerFormat() {
            return this._json.bearerFormat;
          }
          openIdConnectUrl() {
            return this._json.openIdConnectUrl;
          }
          flows() {
            return r(this._json.flows, o);
          }
        },
        l,
        u,
      );
    },
    87: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(4);
      e.exports = r(
        class extends a {
          authorizationUrl() {
            return this._json.authorizationUrl;
          }
          tokenUrl() {
            return this._json.tokenUrl;
          }
          refreshUrl() {
            return this._json.refreshUrl;
          }
          scopes() {
            return this._json.scopes;
          }
        },
        i,
      );
    },
    88: function(e, t, n) {
      const { xParserMessageName: r, xParserSchemaId: a } = n(24),
        { traverseAsyncApiDocument: i } = n(48);
      function o(e) {
        for (const [t, n] of Object.entries(e))
          n.schema() && (n.schema().json()[String(a)] = t);
      }
      function l(e, t) {
        e.forEach(e => {
          void 0 === e.name() &&
            void 0 === e.ext(r) &&
            (e.json()[String(r)] = `<anonymous-message-${t}>`);
        });
      }
      e.exports = {
        assignNameToComponentMessages: function(e) {
          if (e.hasComponents())
            for (const [t, n] of Object.entries(e.components().messages()))
              void 0 === n.name() && (n.json()[String(r)] = t);
        },
        assignUidToParameterSchemas: function(e) {
          e.channelNames().forEach(t => {
            o(e.channel(t).parameters());
          });
        },
        assignUidToComponentSchemas: function(e) {
          if (e.hasComponents())
            for (const [t, n] of Object.entries(e.components().schemas()))
              n.json()[String(a)] = t;
        },
        assignUidToComponentParameterSchemas: function(e) {
          e.hasComponents() && o(e.components().parameters());
        },
        assignNameToAnonymousMessages: function(e) {
          let t = 0;
          e.hasChannels() &&
            e.channelNames().forEach(n => {
              const r = e.channel(n);
              r.hasPublish() && l(r.publish().messages(), ++t),
                r.hasSubscribe() && l(r.subscribe().messages(), ++t);
            });
        },
        assignIdToAnonymousSchemas: function(e) {
          let t = 0;
          i(e, e => {
            e.uid() || (e.json()[String(a)] = `<anonymous-schema-${++t}>`);
          });
        },
      };
    },
    89: function(e, t) {
      var n = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString;
      e.exports = function(e, t, a) {
        if ('[object Function]' !== r.call(t))
          throw new TypeError('iterator must be a function');
        var i = e.length;
        if (i === +i) for (var o = 0; o < i; o++) t.call(a, e[o], o, e);
        else for (var l in e) n.call(e, l) && t.call(a, e[l], l, e);
      };
    },
  }).default;
});
