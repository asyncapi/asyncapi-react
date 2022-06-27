!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('react')))
    : 'function' == typeof define && define.amd
    ? define('AsyncApiComponent', ['react'], t)
    : 'object' == typeof exports
    ? (exports.AsyncApiComponent = t(require('react')))
    : (e.AsyncApiComponent = t(e.React));
})('undefined' != typeof self ? self : this, function(e) {
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
      n((n.s = 267))
    );
  })({
    0: function(t, n) {
      t.exports = e;
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
          return s;
        }),
        n.d(t, 'c', function() {
          return o;
        }),
        n.d(t, 'g', function() {
          return u;
        }),
        n.d(t, 'e', function() {
          return l;
        }),
        n.d(t, 'd', function() {
          return c;
        }),
        n.d(t, 'f', function() {
          return h;
        }),
        n.d(t, 'b', function() {
          return m;
        });
      var r = 'https://www.iana.org/assignments/media-types',
        a = 'https://github.com/asyncapi/parser-js/validation-errors',
        i = 'Terms of service',
        s = 'Support',
        o = 'External Docs',
        u = 'Servers',
        l = 'Operations',
        c = 'Messages',
        h = 'Schemas',
        m = 'Error';
    },
    10: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        s = n(3),
        { xParserCircle: o, xParserCircleProps: u } = n(24),
        l = n(6),
        c = n(17),
        h = n(4);
      class m extends s {
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
            ? this._json.allOf.map(e => new m(e, { parent: this }))
            : null;
        }
        oneOf() {
          return this._json.oneOf
            ? this._json.oneOf.map(e => new m(e, { parent: this }))
            : null;
        }
        anyOf() {
          return this._json.anyOf
            ? this._json.anyOf.map(e => new m(e, { parent: this }))
            : null;
        }
        not() {
          return this._json.not
            ? new m(this._json.not, { parent: this })
            : null;
        }
        items() {
          return this._json.items
            ? Array.isArray(this._json.items)
              ? this._json.items.map(e => new m(e, { parent: this }))
              : new m(this._json.items, { parent: this })
            : null;
        }
        properties() {
          return r(this._json.properties, m, { parent: this });
        }
        property(e) {
          return a(this._json.properties, e, m, { parent: this });
        }
        additionalProperties() {
          const e = this._json.additionalProperties;
          if (null != e)
            return 'boolean' == typeof e ? e : new m(e, { parent: this });
        }
        additionalItems() {
          const e = this._json.additionalItems;
          if (null != e) return new m(e, { parent: this });
        }
        patternProperties() {
          return r(this._json.patternProperties, m, { parent: this });
        }
        const() {
          return this._json.const;
        }
        contains() {
          return this._json.contains
            ? new m(this._json.contains, { parent: this })
            : null;
        }
        dependencies() {
          if (!this._json.dependencies) return null;
          const e = {};
          return (
            Object.entries(this._json.dependencies).forEach(([t, n]) => {
              e[String(t)] = Array.isArray(n) ? n : new m(n, { parent: this });
            }),
            e
          );
        }
        propertyNames() {
          return this._json.propertyNames
            ? new m(this._json.propertyNames, { parent: this })
            : null;
        }
        if() {
          return this._json.if ? new m(this._json.if, { parent: this }) : null;
        }
        then() {
          return this._json.then
            ? new m(this._json.then, { parent: this })
            : null;
        }
        else() {
          return this._json.else
            ? new m(this._json.else, { parent: this })
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
          return r(this._json.definitions, m, { parent: this });
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
          if (this.ext(o)) return !0;
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
      e.exports = i(m, l, c, h);
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
        var r = n(74),
          a = n(75),
          i = n(60);
        function s() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function o(e, t) {
          if (s() < t) throw new RangeError('Invalid typed array length');
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
            return h(this, e);
          }
          return l(this, e, t, n);
        }
        function l(e, t, n, r) {
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
                  : (e = m(e, t));
                return e;
              })(e, t, n, r)
            : 'string' == typeof t
            ? (function(e, t, n) {
                ('string' == typeof n && '' !== n) || (n = 'utf8');
                if (!u.isEncoding(n))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding',
                  );
                var r = 0 | f(t, n),
                  a = (e = o(e, r)).write(t, n);
                a !== r && (e = e.slice(0, a));
                return e;
              })(e, t, n)
            : (function(e, t) {
                if (u.isBuffer(t)) {
                  var n = 0 | p(t.length);
                  return 0 === (e = o(e, n)).length || t.copy(e, 0, 0, n), e;
                }
                if (t) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    'length' in t
                  )
                    return 'number' != typeof t.length || (r = t.length) != r
                      ? o(e, 0)
                      : m(e, t);
                  if ('Buffer' === t.type && i(t.data)) return m(e, t.data);
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
        function h(e, t) {
          if ((c(t), (e = o(e, t < 0 ? 0 : 0 | p(t))), !u.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < t; ++n) e[n] = 0;
          return e;
        }
        function m(e, t) {
          var n = t.length < 0 ? 0 : 0 | p(t.length);
          e = o(e, n);
          for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
          return e;
        }
        function p(e) {
          if (e >= s())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                s().toString(16) +
                ' bytes',
            );
          return 0 | e;
        }
        function f(e, t) {
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
                return z(e).length;
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
                if (r) return z(e).length;
                (t = ('' + t).toLowerCase()), (r = !0);
            }
        }
        function d(e, t, n) {
          var r = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
          if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
            return '';
          if ((n >>>= 0) <= (t >>>= 0)) return '';
          for (e || (e = 'utf8'); ; )
            switch (e) {
              case 'hex':
                return j(this, t, n);
              case 'utf8':
              case 'utf-8':
                return _(this, t, n);
              case 'ascii':
                return C(this, t, n);
              case 'latin1':
              case 'binary':
                return N(this, t, n);
              case 'base64':
                return k(this, t, n);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return F(this, t, n);
              default:
                if (r) throw new TypeError('Unknown encoding: ' + e);
                (e = (e + '').toLowerCase()), (r = !0);
            }
        }
        function g(e, t, n) {
          var r = e[t];
          (e[t] = e[n]), (e[n] = r);
        }
        function b(e, t, n, r, a) {
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
            return 0 === t.length ? -1 : y(e, t, n, r, a);
          if ('number' == typeof t)
            return (
              (t &= 255),
              u.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? a
                  ? Uint8Array.prototype.indexOf.call(e, t, n)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                : y(e, [t], n, r, a)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function y(e, t, n, r, a) {
          var i,
            s = 1,
            o = e.length,
            u = t.length;
          if (
            void 0 !== r &&
            ('ucs2' === (r = String(r).toLowerCase()) ||
              'ucs-2' === r ||
              'utf16le' === r ||
              'utf-16le' === r)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (s = 2), (o /= 2), (u /= 2), (n /= 2);
          }
          function l(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s);
          }
          if (a) {
            var c = -1;
            for (i = n; i < o; i++)
              if (l(e, i) === l(t, -1 === c ? 0 : i - c)) {
                if ((-1 === c && (c = i), i - c + 1 === u)) return c * s;
              } else -1 !== c && (i -= i - c), (c = -1);
          } else
            for (n + u > o && (n = o - u), i = n; i >= 0; i--) {
              for (var h = !0, m = 0; m < u; m++)
                if (l(e, i + m) !== l(t, m)) {
                  h = !1;
                  break;
                }
              if (h) return i;
            }
          return -1;
        }
        function x(e, t, n, r) {
          n = Number(n) || 0;
          var a = e.length - n;
          r ? (r = Number(r)) > a && (r = a) : (r = a);
          var i = t.length;
          if (i % 2 != 0) throw new TypeError('Invalid hex string');
          r > i / 2 && (r = i / 2);
          for (var s = 0; s < r; ++s) {
            var o = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(o)) return s;
            e[n + s] = o;
          }
          return s;
        }
        function E(e, t, n, r) {
          return $(z(t, e.length - n), e, n, r);
        }
        function v(e, t, n, r) {
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
        function D(e, t, n, r) {
          return v(e, t, n, r);
        }
        function A(e, t, n, r) {
          return $(U(t), e, n, r);
        }
        function w(e, t, n, r) {
          return $(
            (function(e, t) {
              for (
                var n, r, a, i = [], s = 0;
                s < e.length && !((t -= 2) < 0);
                ++s
              )
                (n = e.charCodeAt(s)),
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
        function k(e, t, n) {
          return 0 === t && n === e.length
            ? r.fromByteArray(e)
            : r.fromByteArray(e.slice(t, n));
        }
        function _(e, t, n) {
          n = Math.min(e.length, n);
          for (var r = [], a = t; a < n; ) {
            var i,
              s,
              o,
              u,
              l = e[a],
              c = null,
              h = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
            if (a + h <= n)
              switch (h) {
                case 1:
                  l < 128 && (c = l);
                  break;
                case 2:
                  128 == (192 & (i = e[a + 1])) &&
                    (u = ((31 & l) << 6) | (63 & i)) > 127 &&
                    (c = u);
                  break;
                case 3:
                  (i = e[a + 1]),
                    (s = e[a + 2]),
                    128 == (192 & i) &&
                      128 == (192 & s) &&
                      (u = ((15 & l) << 12) | ((63 & i) << 6) | (63 & s)) >
                        2047 &&
                      (u < 55296 || u > 57343) &&
                      (c = u);
                  break;
                case 4:
                  (i = e[a + 1]),
                    (s = e[a + 2]),
                    (o = e[a + 3]),
                    128 == (192 & i) &&
                      128 == (192 & s) &&
                      128 == (192 & o) &&
                      (u =
                        ((15 & l) << 18) |
                        ((63 & i) << 12) |
                        ((63 & s) << 6) |
                        (63 & o)) > 65535 &&
                      u < 1114112 &&
                      (c = u);
              }
            null === c
              ? ((c = 65533), (h = 1))
              : c > 65535 &&
                ((c -= 65536),
                r.push(((c >>> 10) & 1023) | 55296),
                (c = 56320 | (1023 & c))),
              r.push(c),
              (a += h);
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
          (t.kMaxLength = s()),
          (u.poolSize = 8192),
          (u._augment = function(e) {
            return (e.__proto__ = u.prototype), e;
          }),
          (u.from = function(e, t, n) {
            return l(null, e, t, n);
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
                  ? o(e, t)
                  : void 0 !== n
                  ? 'string' == typeof r
                    ? o(e, t).fill(n, r)
                    : o(e, t).fill(n)
                  : o(e, t)
              );
            })(null, e, t, n);
          }),
          (u.allocUnsafe = function(e) {
            return h(null, e);
          }),
          (u.allocUnsafeSlow = function(e) {
            return h(null, e);
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
              var s = e[n];
              if (!u.isBuffer(s))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers',
                );
              s.copy(r, a), (a += s.length);
            }
            return r;
          }),
          (u.byteLength = f),
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
              : d.apply(this, arguments);
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
                s = (n >>>= 0) - (t >>>= 0),
                o = Math.min(i, s),
                l = this.slice(r, a),
                c = e.slice(t, n),
                h = 0;
              h < o;
              ++h
            )
              if (l[h] !== c[h]) {
                (i = l[h]), (s = c[h]);
                break;
              }
            return i < s ? -1 : s < i ? 1 : 0;
          }),
          (u.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n);
          }),
          (u.prototype.indexOf = function(e, t, n) {
            return b(this, e, t, n, !0);
          }),
          (u.prototype.lastIndexOf = function(e, t, n) {
            return b(this, e, t, n, !1);
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
                  return x(this, e, t, n);
                case 'utf8':
                case 'utf-8':
                  return E(this, e, t, n);
                case 'ascii':
                  return v(this, e, t, n);
                case 'latin1':
                case 'binary':
                  return D(this, e, t, n);
                case 'base64':
                  return A(this, e, t, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return w(this, e, t, n);
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
        function C(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(127 & e[a]);
          return r;
        }
        function N(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(e[a]);
          return r;
        }
        function j(e, t, n) {
          var r = e.length;
          (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
          for (var a = '', i = t; i < n; ++i) a += L(e[i]);
          return a;
        }
        function F(e, t, n) {
          for (var r = e.slice(t, n), a = '', i = 0; i < r.length; i += 2)
            a += String.fromCharCode(r[i] + 256 * r[i + 1]);
          return a;
        }
        function S(e, t, n) {
          if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
          if (e + t > n)
            throw new RangeError('Trying to access beyond buffer length');
        }
        function O(e, t, n, r, a, i) {
          if (!u.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > a || t < i)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > e.length) throw new RangeError('Index out of range');
        }
        function T(e, t, n, r) {
          t < 0 && (t = 65535 + t + 1);
          for (var a = 0, i = Math.min(e.length - n, 2); a < i; ++a)
            e[n + a] =
              (t & (255 << (8 * (r ? a : 1 - a)))) >>> (8 * (r ? a : 1 - a));
        }
        function B(e, t, n, r) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var a = 0, i = Math.min(e.length - n, 4); a < i; ++a)
            e[n + a] = (t >>> (8 * (r ? a : 3 - a))) & 255;
        }
        function R(e, t, n, r, a, i) {
          if (n + r > e.length) throw new RangeError('Index out of range');
          if (n < 0) throw new RangeError('Index out of range');
        }
        function I(e, t, n, r, i) {
          return i || R(e, 0, n, 4), a.write(e, t, n, r, 23, 4), n + 4;
        }
        function P(e, t, n, r, i) {
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
            (e |= 0), (t |= 0), n || S(e, t, this.length);
            for (var r = this[e], a = 1, i = 0; ++i < t && (a *= 256); )
              r += this[e + i] * a;
            return r;
          }),
          (u.prototype.readUIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || S(e, t, this.length);
            for (var r = this[e + --t], a = 1; t > 0 && (a *= 256); )
              r += this[e + --t] * a;
            return r;
          }),
          (u.prototype.readUInt8 = function(e, t) {
            return t || S(e, 1, this.length), this[e];
          }),
          (u.prototype.readUInt16LE = function(e, t) {
            return t || S(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (u.prototype.readUInt16BE = function(e, t) {
            return t || S(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (u.prototype.readUInt32LE = function(e, t) {
            return (
              t || S(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (u.prototype.readUInt32BE = function(e, t) {
            return (
              t || S(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (u.prototype.readIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || S(e, t, this.length);
            for (var r = this[e], a = 1, i = 0; ++i < t && (a *= 256); )
              r += this[e + i] * a;
            return r >= (a *= 128) && (r -= Math.pow(2, 8 * t)), r;
          }),
          (u.prototype.readIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || S(e, t, this.length);
            for (var r = t, a = 1, i = this[e + --r]; r > 0 && (a *= 256); )
              i += this[e + --r] * a;
            return i >= (a *= 128) && (i -= Math.pow(2, 8 * t)), i;
          }),
          (u.prototype.readInt8 = function(e, t) {
            return (
              t || S(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (u.prototype.readInt16LE = function(e, t) {
            t || S(e, 2, this.length);
            var n = this[e] | (this[e + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt16BE = function(e, t) {
            t || S(e, 2, this.length);
            var n = this[e + 1] | (this[e] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt32LE = function(e, t) {
            return (
              t || S(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function(e, t) {
            return (
              t || S(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (u.prototype.readFloatLE = function(e, t) {
            return t || S(e, 4, this.length), a.read(this, e, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function(e, t) {
            return t || S(e, 4, this.length), a.read(this, e, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function(e, t) {
            return t || S(e, 8, this.length), a.read(this, e, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function(e, t) {
            return t || S(e, 8, this.length), a.read(this, e, !1, 52, 8);
          }),
          (u.prototype.writeUIntLE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var a = 1,
              i = 0;
            for (this[t] = 255 & e; ++i < n && (a *= 256); )
              this[t + i] = (e / a) & 255;
            return t + n;
          }),
          (u.prototype.writeUIntBE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
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
              n || O(this, e, t, 1, 255, 0),
              u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (u.prototype.writeUInt16LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : T(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeUInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 2, 65535, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : T(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeUInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e))
                : B(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeUInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 4, 4294967295, 0),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : B(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeIntLE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var a = Math.pow(2, 8 * n - 1);
              O(this, e, t, n, a - 1, -a);
            }
            var i = 0,
              s = 1,
              o = 0;
            for (this[t] = 255 & e; ++i < n && (s *= 256); )
              e < 0 && 0 === o && 0 !== this[t + i - 1] && (o = 1),
                (this[t + i] = (((e / s) >> 0) - o) & 255);
            return t + n;
          }),
          (u.prototype.writeIntBE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var a = Math.pow(2, 8 * n - 1);
              O(this, e, t, n, a - 1, -a);
            }
            var i = n - 1,
              s = 1,
              o = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); )
              e < 0 && 0 === o && 0 !== this[t + i + 1] && (o = 1),
                (this[t + i] = (((e / s) >> 0) - o) & 255);
            return t + n;
          }),
          (u.prototype.writeInt8 = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 1, 127, -128),
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
              n || O(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                : T(this, e, t, !0),
              t + 2
            );
          }),
          (u.prototype.writeInt16BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 2, 32767, -32768),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                : T(this, e, t, !1),
              t + 2
            );
          }),
          (u.prototype.writeInt32LE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 4, 2147483647, -2147483648),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24))
                : B(this, e, t, !0),
              t + 4
            );
          }),
          (u.prototype.writeInt32BE = function(e, t, n) {
            return (
              (e = +e),
              (t |= 0),
              n || O(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              u.TYPED_ARRAY_SUPPORT
                ? ((this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e))
                : B(this, e, t, !1),
              t + 4
            );
          }),
          (u.prototype.writeFloatLE = function(e, t, n) {
            return I(this, e, t, !0, n);
          }),
          (u.prototype.writeFloatBE = function(e, t, n) {
            return I(this, e, t, !1, n);
          }),
          (u.prototype.writeDoubleLE = function(e, t, n) {
            return P(this, e, t, !0, n);
          }),
          (u.prototype.writeDoubleBE = function(e, t, n) {
            return P(this, e, t, !1, n);
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
              var s = u.isBuffer(e) ? e : z(new u(e, r).toString()),
                o = s.length;
              for (i = 0; i < n - t; ++i) this[i + t] = s[i % o];
            }
            return this;
          });
        var M = /[^+\/0-9A-Za-z-_]/g;
        function L(e) {
          return e < 16 ? '0' + e.toString(16) : e.toString(16);
        }
        function z(e, t) {
          var n;
          t = t || 1 / 0;
          for (var r = e.length, a = null, i = [], s = 0; s < r; ++s) {
            if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
              if (!a) {
                if (n > 56319) {
                  (t -= 3) > -1 && i.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === r) {
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
    122: function(e, t, n) {
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
      function s(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      }
      function o(e, ...t) {
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
      class l {
        constructor(e, t) {
          (this.buffer = ''), (this.classPrefix = t.classPrefix), e.walk(this);
        }
        addText(e) {
          this.buffer += s(e);
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
      class h extends c {
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
          return new l(this, this.options).value();
        }
        finalize() {
          return !0;
        }
      }
      function m(e) {
        return e ? ('string' == typeof e ? e : e.source) : null;
      }
      const p = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      const f =
          '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)',
        d = { begin: '\\\\[\\s\\S]', relevance: 0 },
        g = {
          className: 'string',
          begin: "'",
          end: "'",
          illegal: '\\n',
          contains: [d],
        },
        b = {
          className: 'string',
          begin: '"',
          end: '"',
          illegal: '\\n',
          contains: [d],
        },
        y = {
          begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
        },
        x = function(e, t, n = {}) {
          const r = o(
            { className: 'comment', begin: e, end: t, contains: [] },
            n,
          );
          return (
            r.contains.push(y),
            r.contains.push({
              className: 'doctag',
              begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
              relevance: 0,
            }),
            r
          );
        },
        E = x('//', '$'),
        v = x('/\\*', '\\*/'),
        D = x('#', '$'),
        A = { className: 'number', begin: '\\b\\d+(\\.\\d+)?', relevance: 0 },
        w = { className: 'number', begin: f, relevance: 0 },
        k = { className: 'number', begin: '\\b(0b[01]+)', relevance: 0 },
        _ = {
          className: 'number',
          begin:
            '\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
          relevance: 0,
        },
        C = {
          begin: /(?=\/[^/\n]*\/)/,
          contains: [
            {
              className: 'regexp',
              begin: /\//,
              end: /\/[gimuy]*/,
              illegal: /\n/,
              contains: [
                d,
                { begin: /\[/, end: /\]/, relevance: 0, contains: [d] },
              ],
            },
          ],
        },
        N = { className: 'title', begin: '[a-zA-Z]\\w*', relevance: 0 },
        j = { className: 'title', begin: '[a-zA-Z_]\\w*', relevance: 0 },
        F = { begin: '\\.\\s*[a-zA-Z_]\\w*', relevance: 0 };
      var S = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: '[a-zA-Z]\\w*',
        UNDERSCORE_IDENT_RE: '[a-zA-Z_]\\w*',
        NUMBER_RE: '\\b\\d+(\\.\\d+)?',
        C_NUMBER_RE: f,
        BINARY_NUMBER_RE: '\\b(0b[01]+)',
        RE_STARTERS_RE:
          '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~',
        SHEBANG: (e = {}) => {
          const t = /^#![ ]*\//;
          return (
            e.binary &&
              (e.begin = (function(...e) {
                return e.map(e => m(e)).join('');
              })(t, /.*\b/, e.binary, /\b.*/)),
            o(
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
        BACKSLASH_ESCAPE: d,
        APOS_STRING_MODE: g,
        QUOTE_STRING_MODE: b,
        PHRASAL_WORDS_MODE: y,
        COMMENT: x,
        C_LINE_COMMENT_MODE: E,
        C_BLOCK_COMMENT_MODE: v,
        HASH_COMMENT_MODE: D,
        NUMBER_MODE: A,
        C_NUMBER_MODE: w,
        BINARY_NUMBER_MODE: k,
        CSS_NUMBER_MODE: _,
        REGEXP_MODE: C,
        TITLE_MODE: N,
        UNDERSCORE_TITLE_MODE: j,
        METHOD_GUARD: F,
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
      function O(e, t) {
        '.' === e.input[e.index - 1] && t.ignoreMatch();
      }
      function T(e, t) {
        t &&
          e.beginKeywords &&
          ((e.begin =
            '\\b(' +
            e.beginKeywords.split(' ').join('|') +
            ')(?!\\.)(?=\\b|\\s)'),
          (e.__beforeBegin = O),
          (e.keywords = e.keywords || e.beginKeywords),
          delete e.beginKeywords,
          void 0 === e.relevance && (e.relevance = 0));
      }
      function B(e, t) {
        Array.isArray(e.illegal) &&
          (e.illegal = (function(...e) {
            return '(' + e.map(e => m(e)).join('|') + ')';
          })(...e.illegal));
      }
      function R(e, t) {
        if (e.match) {
          if (e.begin || e.end)
            throw new Error('begin & end are not supported with match');
          (e.begin = e.match), delete e.match;
        }
      }
      function I(e, t) {
        void 0 === e.relevance && (e.relevance = 1);
      }
      const P = [
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
              return P.includes(e.toLowerCase());
            })(e)
          ? 0
          : 1;
      }
      function L(e, { plugins: t }) {
        function n(t, n) {
          return new RegExp(
            m(t),
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
                    let r = m(e),
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
          (e.classNameAliases = o(e.classNameAliases || {})),
          (function t(r, i) {
            const s = r;
            if (r.isCompiled) return s;
            [R].forEach(e => e(r, i)),
              e.compilerExtensions.forEach(e => e(r, i)),
              (r.__beforeBegin = null),
              [T, B, I].forEach(e => e(r, i)),
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
              (s.keywordPatternRe = n(u, !0)),
              i &&
                (r.begin || (r.begin = /\B|\b/),
                (s.beginRe = n(r.begin)),
                r.endSameAsBegin && (r.end = r.begin),
                r.end || r.endsWithParent || (r.end = /\B|\b/),
                r.end && (s.endRe = n(r.end)),
                (s.terminatorEnd = m(r.end) || ''),
                r.endsWithParent &&
                  i.terminatorEnd &&
                  (s.terminatorEnd += (r.end ? '|' : '') + i.terminatorEnd)),
              r.illegal && (s.illegalRe = n(r.illegal)),
              r.contains || (r.contains = []),
              (r.contains = [].concat(
                ...r.contains.map(function(e) {
                  return (function(e) {
                    e.variants &&
                      !e.cachedVariants &&
                      (e.cachedVariants = e.variants.map(function(t) {
                        return o(e, { variants: null }, t);
                      }));
                    if (e.cachedVariants) return e.cachedVariants;
                    if (
                      (function e(t) {
                        return !!t && (t.endsWithParent || e(t.starts));
                      })(e)
                    )
                      return o(e, { starts: e.starts ? o(e.starts) : null });
                    if (Object.isFrozen(e)) return o(e);
                    return e;
                  })('self' === e ? r : e);
                }),
              )),
              r.contains.forEach(function(e) {
                t(e, s);
              }),
              r.starts && t(r.starts, i),
              (s.matcher = (function(e) {
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
              })(s)),
              s
            );
          })(e)
        );
      }
      function z(e) {
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
                  s(this.code)
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
              function o() {
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
                      return ' ' + e.nodeName + '="' + s(e.value) + '"';
                    })
                    .join('') +
                  '>';
              }
              function l(e) {
                a += '</' + $(e) + '>';
              }
              function c(e) {
                ('start' === e.event ? u : l)(e.node);
              }
              for (; e.length || t.length; ) {
                let t = o();
                if (
                  ((a += s(n.substring(r, t[0].offset))),
                  (r = t[0].offset),
                  t === e)
                ) {
                  i.reverse().forEach(l);
                  do {
                    c(t.splice(0, 1)[0]), (t = o());
                  } while (t === e && t.length && t[0].offset === r);
                  i.reverse().forEach(u);
                } else
                  'start' === t[0].event ? i.push(t[0].node) : i.pop(),
                    c(t.splice(0, 1)[0]);
              }
              return a + s(n.substr(r));
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
      const q = {},
        Y = e => {
          console.error(e);
        },
        V = (e, ...t) => {
          console.log('WARN: ' + e, ...t);
        },
        W = (e, t) => {
          q[`${e}/${t}`] ||
            (console.log(`Deprecated as of ${e}. ${t}`), (q[`${e}/${t}`] = !0));
        },
        G = s,
        Z = o,
        K = Symbol('nomatch');
      var J = (function(e) {
        const t = Object.create(null),
          n = Object.create(null),
          a = [];
        let s = !0;
        const o = /(^(<[^>]+>|\t|)+|\n)/gm,
          u =
            "Could not find the language '{}', did you forget to load/include a language module?",
          l = { disableAutodetect: !0, name: 'Plain text', contains: [] };
        let c = {
          noHighlightRe: /^(no-?highlight)$/i,
          languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
          classPrefix: 'hljs-',
          tabReplace: null,
          useBR: !1,
          languages: null,
          __emitter: h,
        };
        function m(e) {
          return c.noHighlightRe.test(e);
        }
        function p(e, t, n, r) {
          let a = '',
            i = '';
          'object' == typeof t
            ? ((a = e), (n = t.ignoreIllegals), (i = t.language), (r = void 0))
            : (W(
                '10.7.0',
                'highlight(lang, code, ...args) has been deprecated.',
              ),
              W(
                '10.7.0',
                'Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277',
              ),
              (i = e),
              (a = t));
          const s = { code: a, language: i };
          _('before:highlight', s);
          const o = s.result ? s.result : f(s.language, s.code, n, r);
          return (o.code = s.code), _('after:highlight', o), o;
        }
        function f(e, n, r, o) {
          function l(e, t) {
            const n = E.case_insensitive ? t[0].toLowerCase() : t[0];
            return (
              Object.prototype.hasOwnProperty.call(e.keywords, n) &&
              e.keywords[n]
            );
          }
          function h() {
            null != w.subLanguage
              ? (function() {
                  if ('' === C) return;
                  let e = null;
                  if ('string' == typeof w.subLanguage) {
                    if (!t[w.subLanguage]) return void _.addText(C);
                    (e = f(w.subLanguage, C, !0, k[w.subLanguage])),
                      (k[w.subLanguage] = e.top);
                  } else e = d(C, w.subLanguage.length ? w.subLanguage : null);
                  w.relevance > 0 && (N += e.relevance),
                    _.addSublanguage(e.emitter, e.language);
                })()
              : (function() {
                  if (!w.keywords) return void _.addText(C);
                  let e = 0;
                  w.keywordPatternRe.lastIndex = 0;
                  let t = w.keywordPatternRe.exec(C),
                    n = '';
                  for (; t; ) {
                    n += C.substring(e, t.index);
                    const r = l(w, t);
                    if (r) {
                      const [e, a] = r;
                      if ((_.addText(n), (n = ''), (N += a), e.startsWith('_')))
                        n += t[0];
                      else {
                        const n = E.classNameAliases[e] || e;
                        _.addKeyword(t[0], n);
                      }
                    } else n += t[0];
                    (e = w.keywordPatternRe.lastIndex),
                      (t = w.keywordPatternRe.exec(C));
                  }
                  (n += C.substr(e)), _.addText(n);
                })(),
              (C = '');
          }
          function m(e) {
            return (
              e.className &&
                _.openNode(E.classNameAliases[e.className] || e.className),
              (w = Object.create(e, { parent: { value: w } })),
              w
            );
          }
          function p(e) {
            return 0 === w.matcher.regexIndex
              ? ((C += e[0]), 1)
              : ((S = !0), 0);
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
                ? (C += t)
                : (n.excludeBegin && (C += t),
                  h(),
                  n.returnBegin || n.excludeBegin || (C = t)),
              m(n),
              n.returnBegin ? 0 : t.length
            );
          }
          function b(e) {
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
              })(w, e, r);
            if (!a) return K;
            const s = w;
            s.skip
              ? (C += t)
              : (s.returnEnd || s.excludeEnd || (C += t),
                h(),
                s.excludeEnd && (C = t));
            do {
              w.className && _.closeNode(),
                w.skip || w.subLanguage || (N += w.relevance),
                (w = w.parent);
            } while (w !== a.parent);
            return (
              a.starts &&
                (a.endSameAsBegin && (a.starts.endRe = a.endRe), m(a.starts)),
              s.returnEnd ? 0 : t.length
            );
          }
          let y = {};
          function x(t, a) {
            const i = a && a[0];
            if (((C += t), null == i)) return h(), 0;
            if (
              'begin' === y.type &&
              'end' === a.type &&
              y.index === a.index &&
              '' === i
            ) {
              if (((C += n.slice(a.index, a.index + 1)), !s)) {
                const t = new Error('0 width match regex');
                throw ((t.languageName = e), (t.badRule = y.rule), t);
              }
              return 1;
            }
            if (((y = a), 'begin' === a.type)) return g(a);
            if ('illegal' === a.type && !r) {
              const e = new Error(
                'Illegal lexeme "' +
                  i +
                  '" for mode "' +
                  (w.className || '<unnamed>') +
                  '"',
              );
              throw ((e.mode = w), e);
            }
            if ('end' === a.type) {
              const e = b(a);
              if (e !== K) return e;
            }
            if ('illegal' === a.type && '' === i) return 1;
            if (F > 1e5 && F > 3 * a.index) {
              throw new Error(
                'potential infinite loop, way more iterations than matches',
              );
            }
            return (C += i), i.length;
          }
          const E = A(e);
          if (!E)
            throw (Y(u.replace('{}', e)),
            new Error('Unknown language: "' + e + '"'));
          const v = L(E, { plugins: a });
          let D = '',
            w = o || v;
          const k = {},
            _ = new c.__emitter(c);
          !(function() {
            const e = [];
            for (let t = w; t !== E; t = t.parent)
              t.className && e.unshift(t.className);
            e.forEach(e => _.openNode(e));
          })();
          let C = '',
            N = 0,
            j = 0,
            F = 0,
            S = !1;
          try {
            for (w.matcher.considerAll(); ; ) {
              F++,
                S ? (S = !1) : w.matcher.considerAll(),
                (w.matcher.lastIndex = j);
              const e = w.matcher.exec(n);
              if (!e) break;
              const t = x(n.substring(j, e.index), e);
              j = e.index + t;
            }
            return (
              x(n.substr(j)),
              _.closeAllNodes(),
              _.finalize(),
              (D = _.toHTML()),
              {
                relevance: Math.floor(N),
                value: D,
                language: e,
                illegal: !1,
                emitter: _,
                top: w,
              }
            );
          } catch (t) {
            if (t.message && t.message.includes('Illegal'))
              return {
                illegal: !0,
                illegalBy: {
                  msg: t.message,
                  context: n.slice(j - 100, j + 100),
                  mode: t.mode,
                },
                sofar: D,
                relevance: 0,
                value: G(n),
                emitter: _,
              };
            if (s)
              return {
                illegal: !1,
                relevance: 0,
                value: G(n),
                emitter: _,
                language: e,
                top: w,
                errorRaised: t,
              };
            throw t;
          }
        }
        function d(e, n) {
          n = n || c.languages || Object.keys(t);
          const r = (function(e) {
              const t = {
                relevance: 0,
                emitter: new c.__emitter(c),
                value: G(e),
                illegal: !1,
                top: l,
              };
              return t.emitter.addText(e), t;
            })(e),
            a = n
              .filter(A)
              .filter(k)
              .map(t => f(t, e, !1));
          a.unshift(r);
          const i = a.sort((e, t) => {
              if (e.relevance !== t.relevance) return t.relevance - e.relevance;
              if (e.language && t.language) {
                if (A(e.language).supersetOf === t.language) return 1;
                if (A(t.language).supersetOf === e.language) return -1;
              }
              return 0;
            }),
            [s, o] = i,
            u = s;
          return (u.second_best = o), u;
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
          b = /^(<[^>]+>|\t)+/gm,
          y = {
            'after:highlightElement': ({ result: e }) => {
              c.tabReplace &&
                (e.value = e.value.replace(b, e =>
                  e.replace(/\t/g, c.tabReplace),
                ));
            },
          };
        function x(e) {
          let t = null;
          const r = (function(e) {
            let t = e.className + ' ';
            t += e.parentNode ? e.parentNode.className : '';
            const n = c.languageDetectRe.exec(t);
            if (n) {
              const t = A(n[1]);
              return (
                t ||
                  (V(u.replace('{}', n[1])),
                  V('Falling back to no-highlight mode for this block.', e)),
                t ? n[1] : 'no-highlight'
              );
            }
            return t.split(/\s+/).find(e => m(e) || A(e));
          })(e);
          if (m(r)) return;
          _('before:highlightElement', { el: e, language: r }), (t = e);
          const a = t.textContent,
            i = r ? p(a, { language: r, ignoreIllegals: !0 }) : d(a);
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
        const E = () => {
          if (E.called) return;
          (E.called = !0),
            W(
              '10.6.0',
              'initHighlighting() is deprecated.  Use highlightAll() instead.',
            );
          document.querySelectorAll('pre code').forEach(x);
        };
        let v = !1;
        function D() {
          if ('loading' === document.readyState) return void (v = !0);
          document.querySelectorAll('pre code').forEach(x);
        }
        function A(e) {
          return (e = (e || '').toLowerCase()), t[e] || t[n[e]];
        }
        function w(e, { languageName: t }) {
          'string' == typeof e && (e = [e]),
            e.forEach(e => {
              n[e.toLowerCase()] = t;
            });
        }
        function k(e) {
          const t = A(e);
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
              v && D();
            },
            !1,
          ),
          Object.assign(e, {
            highlight: p,
            highlightAuto: d,
            highlightAll: D,
            fixMarkup: function(e) {
              return (
                W('10.2.0', 'fixMarkup will be removed entirely in v11.0'),
                W(
                  '10.2.0',
                  'Please see https://github.com/highlightjs/highlight.js/issues/2534',
                ),
                (t = e),
                c.tabReplace || c.useBR
                  ? t.replace(o, e =>
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
            highlightElement: x,
            highlightBlock: function(e) {
              return (
                W('10.7.0', 'highlightBlock will be removed entirely in v12.0'),
                W('10.7.0', 'Please use highlightElement now.'),
                x(e)
              );
            },
            configure: function(e) {
              e.useBR &&
                (W('10.3.0', "'useBR' will be removed entirely in v11.0"),
                W(
                  '10.3.0',
                  'Please see https://github.com/highlightjs/highlight.js/issues/2559',
                )),
                (c = Z(c, e));
            },
            initHighlighting: E,
            initHighlightingOnLoad: function() {
              W(
                '10.6.0',
                'initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.',
              ),
                (v = !0);
            },
            registerLanguage: function(n, r) {
              let a = null;
              try {
                a = r(e);
              } catch (e) {
                if (
                  (Y(
                    "Language definition for '{}' could not be registered.".replace(
                      '{}',
                      n,
                    ),
                  ),
                  !s)
                )
                  throw e;
                Y(e), (a = l);
              }
              a.name || (a.name = n),
                (t[n] = a),
                (a.rawDefinition = r.bind(null, e)),
                a.aliases && w(a.aliases, { languageName: n });
            },
            unregisterLanguage: function(e) {
              delete t[e];
              for (const t of Object.keys(n)) n[t] === e && delete n[t];
            },
            listLanguages: function() {
              return Object.keys(t);
            },
            getLanguage: A,
            registerAliases: w,
            requireLanguage: function(e) {
              W('10.4.0', 'requireLanguage will be removed entirely in v11.'),
                W(
                  '10.4.0',
                  'Please see https://github.com/highlightjs/highlight.js/pull/2844',
                );
              const t = A(e);
              if (t) return t;
              throw new Error(
                "The '{}' language is required, but not loaded.".replace(
                  '{}',
                  e,
                ),
              );
            },
            autoDetection: k,
            inherit: Z,
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
            vuePlugin: z(e).VuePlugin,
          }),
          (e.debugMode = function() {
            s = !1;
          }),
          (e.safeMode = function() {
            s = !0;
          }),
          (e.versionString = '10.7.3');
        for (const e in S) 'object' == typeof S[e] && r(S[e]);
        return (
          Object.assign(e, S), e.addPlugin(g), e.addPlugin(U), e.addPlugin(y), e
        );
      })({});
      e.exports = J;
    },
    17: function(e, t, n) {
      const { getMapValueOfType: r } = n(2),
        a = n(71),
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
        s = n(3),
        o = n(67),
        u = n(35),
        l = n(37),
        c = n(78),
        h = n(17),
        m = n(25),
        p = n(4),
        {
          xParserSpecParsed: f,
          xParserSpecStringified: d,
          xParserCircle: g,
        } = n(24),
        {
          assignNameToAnonymousMessages: b,
          assignNameToComponentMessages: y,
          assignUidToComponentSchemas: x,
          assignUidToParameterSchemas: E,
          assignIdToAnonymousSchemas: v,
          assignUidToComponentParameterSchemas: D,
        } = n(81),
        { traverseAsyncApiDocument: A } = n(45);
      class w extends s {
        constructor(...e) {
          super(...e),
            !0 !== this.ext(f) &&
              (y(this),
              b(this),
              x(this),
              D(this),
              E(this),
              v(this),
              (this.json()[String(f)] = !0));
        }
        version() {
          return this._json.asyncapi;
        }
        info() {
          return new o(this._json.info);
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
          return r(this._json.channels, l, this);
        }
        channelNames() {
          return this._json.channels ? Object.keys(this._json.channels) : [];
        }
        channel(e) {
          return a(this._json.channels, e, l, this);
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
            A(this, t => {
              t.uid() && e.set(t.uid(), t);
            }),
            e
          );
        }
        hasCircular() {
          return !!this._json[String(g)];
        }
        traverseSchemas(e, t) {
          A(this, e, t);
        }
        static stringify(e, t) {
          const n = { ...e.json() };
          return (
            (n[String(d)] = !0),
            JSON.stringify(
              n,
              (function() {
                const e = new Map(),
                  t = new Map();
                let n = null;
                return function(r, a) {
                  const i =
                      e.get(this) + (Array.isArray(this) ? `[${r}]` : '.' + r),
                    s = a === Object(a);
                  s && e.set(a, i);
                  const o = t.get(a) || '';
                  if (!o && s) {
                    const e = i.replace(/undefined\.\.?/, '');
                    t.set(a, e);
                  }
                  const u = '[' === o[0] ? '$' : '$.';
                  let l = o ? `$ref:${u}${o}` : a;
                  return null === n ? (n = a) : l === n && (l = '$ref:$'), l;
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
            'object' != typeof t || !t[String(f)])
          )
            throw new Error('Cannot parse invalid AsyncAPI document');
          if (!t[String(d)]) return new w(t);
          delete t[String(d)];
          return (
            (function e(t, n, r, a, i) {
              let s = t,
                o = '$ref:$';
              if (void 0 !== n) {
                s = t[String(n)];
                const e = n ? '.' + n : '';
                o = a.get(t) + (Array.isArray(t) ? `[${n}]` : e);
              }
              a.set(s, o), i.set(o, s);
              const u = i.get(s);
              u && (t[String(n)] = u);
              ('$ref:$' !== s && '$ref:$' !== u) || (t[String(n)] = r);
              if (s === Object(s)) for (const t in s) e(s, t, r, a, i);
            })(t, void 0, t, new Map(), new Map()),
            new w(t)
          );
        }
      }
      e.exports = i(w, m, h, p);
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
      const r = n(73),
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
    267: function(e, t, n) {
      'use strict';
      n.r(t);
      var r = n(28),
        a = n(15),
        i = n.n(a);
      n.d(t, 'hljs', function() {
        return i.a;
      }),
        (t.default = r.a);
    },
    28: function(e, t, n) {
      'use strict';
      var r = n(0),
        a = n.n(r),
        i = n(122),
        s = {
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
      var o = function(e, t, n) {
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
          s = Object(r.useState)({ width: void 0, height: void 0 }),
          u = s[0],
          l = s[1],
          c = Object(r.useRef)(!1);
        Object(r.useEffect)(function() {
          return function() {
            c.current = !0;
          };
        }, []);
        var h,
          m,
          p,
          f,
          d,
          g,
          b = Object(r.useRef)({ width: void 0, height: void 0 }),
          y =
            ((h = Object(r.useCallback)(
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
                          s = o(r, i, 'inlineSize'),
                          u = o(r, i, 'blockSize'),
                          h = s ? a(s) : void 0,
                          m = u ? a(u) : void 0;
                        if (b.current.width !== h || b.current.height !== m) {
                          var p = { width: h, height: m };
                          (b.current.width = h),
                            (b.current.height = m),
                            n.current ? n.current(p) : c.current || l(p);
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
            (m = e.ref),
            (p = Object(r.useRef)(null)),
            (f = Object(r.useRef)(null)),
            (d = Object(r.useRef)()),
            (g = Object(r.useCallback)(
              function() {
                var e = null;
                p.current
                  ? (e = p.current)
                  : m && (e = m instanceof HTMLElement ? m : m.current),
                  (f.current &&
                    f.current.element === e &&
                    f.current.reporter === g) ||
                    (d.current && (d.current(), (d.current = null)),
                    (f.current = { reporter: g, element: e }),
                    e && (d.current = h(e)));
              },
              [m, h],
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
            return { ref: y, width: u.width, height: u.height };
          },
          [y, u ? u.width : null, u ? u.height : null],
        );
      }
      var l = function() {
          return (l =
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
        h = function(e) {
          var t = e.chevronProps,
            n = e.children,
            r = c(e, ['chevronProps', 'children']);
          return a.a.createElement(
            'button',
            l({}, r, { className: 'focus:outline-none '.concat(r.className) }),
            n,
            a.a.createElement(
              'svg',
              l(
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
        m = a.a.createContext(null);
      function p() {
        return Object(r.useContext)(m);
      }
      var f = a.a.createContext({
          setShowSidebar: function(e) {
            return e;
          },
        }),
        d = function(e) {
          var t = e.config,
            n = Object(r.useState)(!1),
            i = n[0],
            s = n[1],
            o = (null == t ? void 0 : t.showOperations) || 'byDefault',
            u = p(),
            l = u.info(),
            c = l.ext('x-logo'),
            h = u.hasComponents() && u.components(),
            m = h && h.messages(),
            d = h && h.schemas(),
            x = g;
          'bySpecTags' === o ? (x = b) : 'byOperationsTags' === o && (x = y);
          var E =
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
                    href: '#messages',
                    onClick: function() {
                      return s(!1);
                    },
                  },
                  'Messages',
                ),
                a.a.createElement(
                  'ul',
                  { className: 'text-sm mt-2' },
                  Object.entries(m).map(function(e) {
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
                            return s(!1);
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
            v =
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
                    href: '#schemas',
                    onClick: function() {
                      return s(!1);
                    },
                  },
                  'Schemas',
                ),
                a.a.createElement(
                  'ul',
                  { className: 'text-sm mt-2' },
                  Object.keys(d).map(function(e) {
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
                            return s(!1);
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
            f.Provider,
            { value: { setShowSidebar: s } },
            a.a.createElement(
              'div',
              {
                className:
                  'burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500',
                onClick: function() {
                  return s(function(e) {
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
                            .concat(l.title(), ' logo, ')
                            .concat(l.version(), ' version'),
                        })
                      : a.a.createElement(
                          'h1',
                          { className: 'text-2xl font-light' },
                          l.title(),
                          ' ',
                          l.version(),
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
                            return s(!1);
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
                              return s(!1);
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
                                return s(!1);
                              },
                            },
                            'Operations',
                          ),
                          a.a.createElement(x, null),
                        ),
                        E,
                        v,
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
                  a.a.createElement(E, {
                    channelName: n,
                    key: 'pub-'.concat(n),
                  }),
                ),
                r.hasSubscribe() &&
                  t.push(
                    a.a.createElement(v, {
                      channelName: n,
                      key: 'sub-'.concat(n),
                    }),
                  );
            }),
            a.a.createElement('ul', { className: 'text-sm mt-2' }, t)
          );
        },
        b = function() {
          var e = p(),
            t = e.channels(),
            n = e.tags(),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    s = t[1];
                  s.hasPublish() &&
                    i.a.containTags(s.publish(), e) &&
                    n.push(
                      a.a.createElement(E, {
                        channelName: r,
                        key: 'pub-'.concat(r),
                      }),
                    ),
                    s.hasSubscribe() &&
                      i.a.containTags(s.subscribe(), e) &&
                      n.push(
                        a.a.createElement(v, {
                          channelName: r,
                          key: 'sub-'.concat(r),
                        }),
                      );
                }),
                n
              );
            },
            s = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && i.a.containTags(r.publish(), n)) ||
                s.push(
                  a.a.createElement(E, {
                    channelName: t,
                    key: 'pub-'.concat(t),
                  }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    i.a.containTags(r.subscribe(), n)) ||
                  s.push(
                    a.a.createElement(v, {
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
                        a.a.createElement(x, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                s.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(x, { tagName: 'Untagged' }, s),
                  ),
              ),
            )
          );
        },
        y = function() {
          var e = p(),
            t = e.channels(),
            n = i.a.operationsTags(e),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    s = t[1];
                  s.hasPublish() &&
                    i.a.containTags(s.publish(), e) &&
                    n.push(
                      a.a.createElement(E, {
                        channelName: r,
                        key: 'pub-'.concat(r),
                      }),
                    ),
                    s.hasSubscribe() &&
                      i.a.containTags(s.subscribe(), e) &&
                      n.push(
                        a.a.createElement(v, {
                          channelName: r,
                          key: 'sub-'.concat(r),
                        }),
                      );
                }),
                n
              );
            },
            s = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && i.a.containTags(r.publish(), n)) ||
                s.push(
                  a.a.createElement(E, {
                    channelName: t,
                    key: 'pub-'.concat(t),
                  }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    i.a.containTags(r.subscribe(), n)) ||
                  s.push(
                    a.a.createElement(v, {
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
                        a.a.createElement(x, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                s.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(x, { tagName: 'Untagged' }, s),
                  ),
              ),
            )
          );
        },
        x = function(e) {
          var t = e.tagName,
            n = e.children,
            i = Object(r.useState)(!1),
            s = i[0],
            o = i[1];
          return a.a.createElement(
            'div',
            null,
            a.a.createElement(
              h,
              {
                onClick: function() {
                  return o(function(e) {
                    return !e;
                  });
                },
                chevronProps: { className: s ? '-rotate-180' : '-rotate-90' },
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
                  s ? 'block' : 'hidden',
                  ' text-sm mt-2 font-light',
                ),
              },
              n,
            ),
          );
        },
        E = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(f).setShowSidebar;
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
        v = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(f).setShowSidebar;
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
        D = function(e) {
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
        A = n(53),
        w = n(54),
        k = n(15),
        _ = n.n(k),
        C = n(55),
        N = n.n(C),
        j = n(56),
        F = n.n(j),
        S = n(57),
        O = n.n(S);
      _.a.registerLanguage('json', N.a),
        _.a.registerLanguage('yaml', F.a),
        _.a.registerLanguage('bash', O.a);
      var T = {
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
      var B = function(e) {
          var t,
            n = e.children;
          return n
            ? 'string' != typeof n
              ? a.a.createElement(a.a.Fragment, null, n)
              : a.a.createElement('div', {
                  className: 'prose max-w-none text-sm',
                  dangerouslySetInnerHTML: {
                    __html: Object(A.sanitize)(
                      ((t = n), Object(w.marked)(t, T)),
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
            s = a.a.createElement(
              'div',
              {
                title: r,
                className:
                  'border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1',
              },
              a.a.createElement('span', { className: i ? 'underline' : '' }, n),
            );
          return i ? a.a.createElement(D, { href: i.url(), title: r }, s) : s;
        },
        I = function(e) {
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
        P = n(1),
        M = function() {
          var e = p(),
            t = e.info();
          if (!t) return null;
          var n = e.id(),
            r = e.externalDocs(),
            i = t.license(),
            s = t.termsOfService(),
            o = e.defaultContentType(),
            u = t.contact(),
            l = i || s || o || u || r;
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
              l &&
                a.a.createElement(
                  'ul',
                  { className: 'flex flex-wrap mt-2 leading-normal' },
                  i &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      i.url()
                        ? a.a.createElement(
                            D,
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
                  s &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        D,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: s,
                        },
                        a.a.createElement('span', null, P.h),
                      ),
                    ),
                  o &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        D,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: ''.concat(P.a, '/').concat(o),
                        },
                        a.a.createElement('span', null, o),
                      ),
                    ),
                  r &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        D,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: r.url(),
                        },
                        a.a.createElement('span', null, P.c),
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
                            D,
                            {
                              className:
                                'border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: u.url(),
                            },
                            a.a.createElement('span', null, u.name() || P.i),
                          ),
                        ),
                      u.email() &&
                        a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2' },
                          a.a.createElement(
                            D,
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
                  a.a.createElement(B, null, t.description()),
                ),
              e.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-4' },
                  a.a.createElement(I, { tags: e.tags() }),
                ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        L = (function() {
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
        z = function(e) {
          var t,
            n = e.security,
            r = void 0 === n ? [] : n,
            i = e.protocol,
            s = void 0 === i ? '' : i,
            o = e.header,
            u = void 0 === o ? 'Security' : o,
            l = p(),
            c = l.hasComponents() && l.components().securitySchemes();
          if (r && r.length && c && Object.keys(c).length) {
            var h = r
              .map(function(e) {
                var t = e.json(),
                  n = Object.keys(t)[0],
                  r = c[String(n)],
                  i = t[String(n)];
                return r
                  ? a.a.createElement($, {
                      protocol: s,
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
              h.map(function(e, t) {
                return a.a.createElement(
                  'li',
                  { className: 'mt-2', key: t },
                  e,
                );
              }),
            );
          } else
            ('kafka' !== s && 'kafka-secure' !== s) ||
              (t = a.a.createElement($, { protocol: s, securitySchema: null }));
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
                        D,
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
            var s = L.getKafkaSecurity(r, n),
              o = s.securityProtocol,
              u = s.saslMechanism;
            t = a.a.createElement(
              'div',
              {
                className:
                  'px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded',
              },
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
                    'security.protocol:',
                  ),
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1',
                    },
                    o,
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
          var l = n && n.flows(),
            c =
              l &&
              Object.entries(l).map(function(e) {
                var t = e[0],
                  n = e[1],
                  r = n.authorizationUrl(),
                  i = n.tokenUrl(),
                  s = n.refreshUrl(),
                  o = n.scopes();
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
                      L.flowName(t),
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
                        D,
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
                        D,
                        { href: i, className: 'underline' },
                        i,
                      ),
                    ),
                  s &&
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
                        D,
                        { href: s, className: 'underline' },
                        s,
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
                        'Scopes:',
                      ),
                      a.a.createElement(
                        'ul',
                        { className: 'inline-block' },
                        o &&
                          Object.entries(o).map(function(e) {
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
                  L.securityType(n.type()),
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
                a.a.createElement(B, null, n.description()),
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
        q = n.n(H);
      !(function(e) {
        (e.ANY = 'any'),
          (e.RESTRICTED_ANY = 'restricted any'),
          (e.NEVER = 'never'),
          (e.UNKNOWN = 'unknown');
      })(U || (U = {}));
      var Y = [
          'string',
          'number',
          'integer',
          'boolean',
          'array',
          'object',
          'null',
        ],
        V = Object.keys({
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
        W = (function() {
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
                s = this.humanizeRangeConstraint(
                  i ? 'unique items' : 'items',
                  e.minItems(),
                  e.maxItems(),
                );
              void 0 !== s && t.push(s);
              var o = this.humanizeRangeConstraint(
                'properties',
                e.minProperties(),
                e.maxProperties(),
              );
              return void 0 !== o && t.push(o), t;
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
                return new q.a(n);
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
                return new q.a(r);
              }
            }),
            (e.jsonToSchema = function(e) {
              var t = this.jsonFieldToSchema(e);
              return new q.a(t);
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
                  var s = i[a],
                    o = s[0],
                    u = s[1];
                  Array.isArray(u) && u.includes(e) && n.push(o);
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
                  var s = i[a],
                    o = s[0],
                    u = s[1];
                  'object' != typeof u || Array.isArray(u) || (r[o] = u);
                }
                if (Object.keys(r).length) {
                  var l =
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
                  return new q.a(l);
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
                V.some(function(e) {
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
                s = void 0 !== e || i,
                o = void 0 !== r,
                u = void 0 !== n || o;
              return (
                s && u
                  ? ((a = i ? '( ' : '[ '),
                    (a += i ? t : e),
                    (a += ' .. '),
                    (a += o ? r : n),
                    (a += o ? ' )' : ' ]'))
                  : s
                  ? ((a = i ? '> ' : '>= '), (a += i ? t : e))
                  : u && ((a = o ? '< ' : '<= '), (a += o ? r : n)),
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
                  Y.includes(e.type) ||
                  (Array.isArray(e.type) &&
                    e.type.some(function(e) {
                      return !Y.includes(e);
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
        G = function(e) {
          var t = e.name,
            n = void 0 === t ? 'Extensions' : t,
            r = e.item,
            i = W.getCustomExtensions(r);
          if (!i || !Object.keys(i).length) return null;
          var s = W.jsonToSchema(i);
          return (
            s &&
            a.a.createElement(
              'div',
              { className: 'mt-2' },
              a.a.createElement(K, { schemaName: n, schema: s, onlyTitle: !0 }),
            )
          );
        },
        Z = a.a.createContext({ reverse: !1 }),
        K = function(e) {
          var t = e.schemaName,
            n = e.schema,
            i = e.required,
            s = void 0 !== i && i,
            o = e.isPatternProperty,
            u = void 0 !== o && o,
            l = e.isProperty,
            c = void 0 !== l && l,
            m = e.isCircular,
            p = void 0 !== m && m,
            f = e.dependentRequired,
            d = e.expanded,
            g = void 0 !== d && d,
            b = e.onlyTitle,
            y = void 0 !== b && b,
            x = Object(r.useContext)(Z).reverse,
            E = Object(r.useState)(g),
            v = E[0],
            A = E[1];
          if (
            !n ||
            ('string' == typeof t &&
              ((null == t ? void 0 : t.startsWith('x-parser-')) ||
                (null == t ? void 0 : t.startsWith('x-schema-private-'))))
          )
            return null;
          var w = W.getDependentSchemas(n),
            k = W.humanizeConstraints(n),
            _ = n.externalDocs(),
            C = !1 !== n.ext(W.extRenderType),
            N = !0 === n.ext(W.extRawValue),
            j = n.ext(W.extParameterLocation),
            F = W.isExpandable(n) || w,
            S = W.toSchemaType(n);
          p = p || n.isCircular() || n.ext('x-parser-circular') || !1;
          var O = n.uid(),
            T = n.items();
          T && !Array.isArray(T)
            ? ((p = p || T.isCircular() || T.ext('x-parser-circular') || !1),
              (O = T.uid()),
              p &&
                'function' == typeof T.circularSchema &&
                (S = W.toSchemaType(T.circularSchema())))
            : p &&
              'function' == typeof n.circularSchema &&
              (S = W.toSchemaType(n.circularSchema()));
          var R = c ? 'italic' : '',
            I =
              'string' == typeof t
                ? a.a.createElement(
                    'span',
                    { className: 'break-words text-sm '.concat(R) },
                    t,
                  )
                : t;
          return a.a.createElement(
            Z.Provider,
            { value: { reverse: !x } },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'div',
                { className: 'flex py-2' },
                a.a.createElement(
                  'div',
                  { className: ''.concat(y ? '' : 'min-w-1/4', ' mr-2') },
                  F && !p
                    ? a.a.createElement(
                        h,
                        {
                          onClick: function() {
                            return A(function(e) {
                              return !e;
                            });
                          },
                          chevronProps: {
                            className: v ? '-rotate-180' : '-rotate-90',
                          },
                        },
                        I,
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
                  s &&
                    a.a.createElement(
                      'div',
                      { className: 'text-red-600 text-xs' },
                      'required',
                    ),
                  f &&
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
                        f.join(', '),
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
                N
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
                        C &&
                          a.a.createElement(
                            'div',
                            {
                              className:
                                'capitalize text-sm text-teal-500 font-bold inline-block mr-2',
                            },
                            p ? ''.concat(S, ' [CIRCULAR]') : S,
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
                          !!k.length &&
                            k.map(function(e) {
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
                          O &&
                            !O.startsWith('<anonymous-') &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border text-orange-600 rounded mr-2 p-1 text-xs',
                              },
                              'uid: ',
                              O,
                            ),
                        ),
                        n.hasDescription() &&
                          a.a.createElement(
                            'div',
                            null,
                            a.a.createElement(B, null, n.description()),
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
                              W.prettifyValue(n.default()),
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
                              W.prettifyValue(n.const()),
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
                                  W.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                        j &&
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
                              j,
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
                              D,
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
                                  W.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                      ),
                    ),
              ),
              p || !F
                ? null
                : a.a.createElement(
                    'div',
                    {
                      className: 'rounded p-4 py-2 border bg-gray-100 '
                        .concat(x ? 'bg-gray-200' : '', ' ')
                        .concat(v ? 'block' : 'hidden'),
                    },
                    a.a.createElement(J, { schema: n }),
                    a.a.createElement(Q, { schema: n }),
                    n.oneOf() &&
                      n.oneOf().map(function(e, t) {
                        return a.a.createElement(K, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Adheres to:' : 'Or to:',
                        });
                      }),
                    n.anyOf() &&
                      n.anyOf().map(function(e, t) {
                        return a.a.createElement(K, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Can adhere to:' : 'Or to:',
                        });
                      }),
                    n.allOf() &&
                      n.allOf().map(function(e, t) {
                        return a.a.createElement(K, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Consists of:' : 'And with:',
                        });
                      }),
                    n.not() &&
                      a.a.createElement(K, {
                        schema: n.not(),
                        schemaName: 'Cannot adhere to:',
                      }),
                    n.propertyNames() &&
                      a.a.createElement(K, {
                        schema: n.propertyNames(),
                        schemaName: 'Property names must adhere to:',
                      }),
                    n.contains() &&
                      a.a.createElement(K, {
                        schema: n.contains(),
                        schemaName: 'Array must contain at least one of:',
                      }),
                    n.if() &&
                      a.a.createElement(K, {
                        schema: n.if(),
                        schemaName: 'If schema adheres to:',
                      }),
                    n.then() &&
                      a.a.createElement(K, {
                        schema: n.then(),
                        schemaName: 'Then must adhere to:',
                      }),
                    n.else() &&
                      a.a.createElement(K, {
                        schema: n.else(),
                        schemaName: 'Otherwise:',
                      }),
                    w &&
                      a.a.createElement(K, {
                        schema: w,
                        schemaName: 'Dependent schemas:',
                      }),
                    a.a.createElement(G, { item: n }),
                    a.a.createElement(X, { schema: n }),
                    a.a.createElement(ee, { schema: n }),
                  ),
            ),
          );
        },
        J = function(e) {
          var t = e.schema,
            n = t.properties() || {};
          if (!Object.keys(n)) return null;
          var r = t.required() || [],
            i = t.patternProperties(),
            s = t.ext('x-parser-circular-props') || [];
          return a.a.createElement(
            a.a.Fragment,
            null,
            Object.entries(n).map(function(e) {
              var n = e[0],
                i = e[1];
              return a.a.createElement(K, {
                schema: i,
                schemaName: n,
                required: r.includes(n),
                isProperty: !0,
                isCircular: s.includes(n),
                dependentRequired: W.getDependentRequired(n, t),
                key: n,
              });
            }),
            Object.entries(i).map(function(e) {
              var t = e[0],
                n = e[1];
              return a.a.createElement(K, {
                schema: n,
                schemaName: t,
                isPatternProperty: !0,
                isProperty: !0,
                isCircular: s.includes(t),
                key: t,
              });
            }),
          );
        },
        X = function(e) {
          var t = e.schema;
          if (!1 === t.ext(W.extRenderAdditionalInfo)) return null;
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
            : a.a.createElement(K, {
                schemaName: 'Additional properties:',
                schema: r,
              });
        },
        Q = function(e) {
          var t = e.schema,
            n = t.type();
          if (!(n = Array.isArray(n) ? n : [n]).includes('array')) return null;
          var r = t.items();
          return r &&
            !Array.isArray(r) &&
            Object.keys(r.properties() || {}).length
            ? a.a.createElement(J, { schema: r })
            : Array.isArray(r)
            ? a.a.createElement(
                a.a.Fragment,
                null,
                r.map(function(e, t) {
                  return a.a.createElement(K, {
                    schema: e,
                    schemaName: ''.concat(t + 1, ' item:'),
                    key: t,
                  });
                }),
              )
            : a.a.createElement(K, { schema: r, schemaName: 'Items:' });
        },
        ee = function(e) {
          var t = e.schema;
          if (!1 === t.ext(W.extRenderAdditionalInfo)) return null;
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
            : a.a.createElement(K, {
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
              i = W.jsonToSchema(r),
              s = a.a.createElement(
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
              a.a.createElement(K, {
                schemaName: s,
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
          var i = W.serverVariablesToSchema(n.variables()),
            s = n.protocolVersion(),
            o = n.security();
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
                    s ? ''.concat(n.protocol(), ' ').concat(s) : n.protocol(),
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
                    a.a.createElement(B, null, n.description()),
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
                    a.a.createElement(K, {
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
                  a.a.createElement(z, { protocol: n.protocol(), security: o }),
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
        se = function() {
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
                  P.g,
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
        oe = function(e) {
          var t = e.snippet;
          return (
            'object' == typeof t &&
              (t = '```json\n' + JSON.stringify(t, void 0, 2) + '\n```'),
            a.a.createElement(B, null, t)
          );
        };
      function ue(e) {
        return e < 10 ? '0' + e : e;
      }
      function le(e, t) {
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
      function he(e) {
        return { value: 'object' === e ? {} : 'array' === e ? [] : void 0 };
      }
      function me(e, t) {
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
      function fe(e) {
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
      var de = n(58),
        ge = n.n(de);
      let be = {},
        ye = [];
      function xe(e) {
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
      function Ee(e) {
        const t = xe(e);
        if (void 0 !== t)
          return {
            value: t,
            readOnly: e.readOnly,
            writeOnly: e.writeOnly,
            type: null,
          };
      }
      function ve(e, t, n, r) {
        if (r) {
          if (ye.includes(e)) return he(fe(e));
          ye.push(e);
        }
        if (r && r.depth > t.maxSampleDepth) return me(ye, r), he(fe(e));
        if (e.$ref) {
          if (!n)
            throw new Error(
              'Your schema contains $ref. You must provide full specification in the third parameter.',
            );
          let a = decodeURIComponent(e.$ref);
          a.startsWith('#') && (a = a.substring(1));
          const i = ge.a.get(n, a);
          let s;
          if (!0 !== be[a]) (be[a] = !0), (s = ve(i, t, n, r)), (be[a] = !1);
          else {
            s = he(fe(i));
          }
          return me(ye, r), s;
        }
        if (void 0 !== e.example)
          return (
            me(ye, r),
            {
              value: e.example,
              readOnly: e.readOnly,
              writeOnly: e.writeOnly,
              type: e.type,
            }
          );
        if (void 0 !== e.allOf)
          return (
            me(ye, r),
            Ee(e) ||
              (function(e, t, n, r, a) {
                let i = ve(e, n, r);
                const s = [];
                for (let e of t) {
                  const { type: t, readOnly: o, writeOnly: u, value: l } = ve(
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
                    (i.readOnly = i.readOnly || o),
                    (i.writeOnly = i.writeOnly || u),
                    null != l && s.push(l);
                }
                if ('object' === i.type)
                  return (
                    (i.value = ce(
                      i.value || {},
                      ...s.filter(e => 'object' == typeof e),
                    )),
                    i
                  );
                {
                  'array' === i.type &&
                    (n.quiet ||
                      console.warn(
                        'OpenAPI Sampler: found allOf with "array" type. Result may be incorrect',
                      ));
                  const e = s[s.length - 1];
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
            me(ye, r);
          const a = Object.assign(
            { readOnly: e.readOnly, writeOnly: e.writeOnly },
            e.oneOf[0],
          );
          return Ee(e) || ve(a, t, n, r);
        }
        if (e.anyOf && e.anyOf.length)
          return me(ye, r), Ee(e) || ve(e.anyOf[0], t, n, r);
        if (e.if && e.then)
          return me(ye, r), Ee(e) || ve(ce(e.if, e.then), t, n, r);
        let a = xe(e),
          i = null;
        if (void 0 === a) {
          (a = null),
            (i = e.type),
            Array.isArray(i) && e.type.length > 0 && (i = e.type[0]),
            i || (i = fe(e));
          let s = _e[i];
          s && (a = s(e, t, n, r));
        }
        return (
          me(ye, r),
          { value: a, readOnly: e.readOnly, writeOnly: e.writeOnly, type: i }
        );
      }
      function De(e) {
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
      function Ae({ min: e, max: t, omitTime: n, omitDate: r }) {
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
      function we(e, t) {
        let n = le('string', e);
        return t && n.length > t && (n = n.substring(0, t)), n;
      }
      const ke = {
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
              (n += le('qwerty!@#$%^123456', e - n.length).substring(
                0,
                e - n.length,
              ))),
            n
          );
        },
        'date-time': function(e, t) {
          return Ae({ min: e, max: t, omitTime: !1, omitDate: !1 });
        },
        date: function(e, t) {
          return Ae({ min: e, max: t, omitTime: !0, omitDate: !1 });
        },
        time: function(e, t) {
          return Ae({ min: e, max: t, omitTime: !1, omitDate: !0 }).slice(1);
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
            (o = (function(e) {
              var t = 0;
              if (0 == e.length) return t;
              for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                (t = (t << 5) - t + r), (t &= t);
              }
              return t;
            })(n || 'id')),
            (r = o),
            (a = o),
            (i = o),
            (s = o),
            (u = function() {
              var e = ((r |= 0) - (((a |= 0) << 27) | (a >>> 5))) | 0;
              return (
                (r = a ^ (((i |= 0) << 17) | (i >>> 15))),
                (a = (i + (s |= 0)) | 0),
                (i = (s + e) | 0),
                ((s = (r + e) | 0) >>> 0) / 4294967296
              );
            }),
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, e => {
              var t = (16 * u()) % 16 | 0;
              return ('x' == e ? t : (3 & t) | 8).toString(16);
            })
          );
          var r, a, i, s, o, u;
        },
        default: we,
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
      const Ce = { skipReadOnly: !1, maxSampleDepth: 15 };
      function Ne(e, t, n) {
        let r = Object.assign({}, Ce, t);
        return (be = {}), (ye = []), ve(e, r, n).value;
      }
      function je(e, t) {
        _e[e] = t;
      }
      je('array', function(e, t = {}, n, r) {
        const a = (r && r.depth) || 1;
        let i = Math.min(
          null != e.maxItems ? e.maxItems : 1 / 0,
          e.minItems || 1,
        );
        const s = e.items || e.contains;
        Array.isArray(s) && (i = Math.max(i, s.length));
        let o = [];
        if (!s) return o;
        for (let r = 0; r < i; r++) {
          let i = ((u = r), Array.isArray(e.items) ? s[u] || {} : s || {}),
            { value: l } = ve(i, t, n, { depth: a + 1 });
          o.push(l);
        }
        var u;
        return o;
      }),
        je('boolean', function(e) {
          return !0;
        }),
        je('integer', De),
        je('number', De),
        je('object', function(e, t = {}, n, r) {
          let a = {};
          const i = (r && r.depth) || 1;
          if (e && 'object' == typeof e.properties) {
            let r = (Array.isArray(e.required) ? e.required : []).reduce(
              (e, t) => ((e[t] = !0), e),
              {},
            );
            Object.keys(e.properties).forEach(s => {
              if (t.skipNonRequired && !r.hasOwnProperty(s)) return;
              const o = ve(e.properties[s], t, n, {
                propertyName: s,
                depth: i + 1,
              });
              (t.skipReadOnly && o.readOnly) ||
                (t.skipWriteOnly && o.writeOnly) ||
                (a[s] = o.value);
            });
          }
          if (e && 'object' == typeof e.additionalProperties) {
            const r =
              e.additionalProperties['x-additionalPropertiesName'] ||
              'property';
            (a[String(r) + '1'] = ve(e.additionalProperties, t, n, {
              depth: i + 1,
            }).value),
              (a[String(r) + '2'] = ve(e.additionalProperties, t, n, {
                depth: i + 1,
              }).value);
          }
          return a;
        }),
        je('string', function(e, t, n, r) {
          let a = e.format || 'default',
            i = ke[a] || we,
            s = r && r.propertyName;
          return i(0 | e.minLength, e.maxLength, s);
        });
      var Fe,
        Se = (function() {
          function e() {}
          return (
            (e.generateExample = function(e, t) {
              void 0 === t && (t = {});
              try {
                return this.sanitizeExample(Ne(e, t)) || '';
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
        Oe = function(e) {
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
              a.a.createElement(Te, {
                type: 'Payload',
                schema: n,
                examples: Se.getPayloadExamples(t),
              }),
            r &&
              a.a.createElement(Te, {
                type: 'Headers',
                schema: r,
                examples: Se.getHeadersExamples(t),
              }),
          );
        },
        Te = function(e) {
          var t = e.type,
            n = void 0 === t ? 'Payload' : t,
            i = e.schema,
            s = e.examples,
            o = void 0 === s ? [] : s,
            u = Object(r.useState)(!1),
            l = u[0],
            c = u[1];
          return a.a.createElement(
            'div',
            { className: 'mt-4' },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                h,
                {
                  onClick: function() {
                    return c(function(e) {
                      return !e;
                    });
                  },
                  chevronProps: {
                    className: 'fill-current text-gray-200 '.concat(
                      l ? '-rotate-180' : '-rotate-90',
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
              { className: l ? 'block' : 'hidden' },
              o && o.length > 0
                ? a.a.createElement(
                    'ul',
                    null,
                    o.map(function(e, t) {
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
                          a.a.createElement(oe, {
                            snippet: Se.sanitizeExample(e.example),
                          }),
                        ),
                      );
                    }),
                  )
                : a.a.createElement(
                    'div',
                    { className: 'mt-4' },
                    a.a.createElement(oe, {
                      snippet: Se.generateExample(i.json()),
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
        Be = function(e) {
          var t = e.message,
            n = e.messageName,
            r = e.index,
            i = e.showExamples,
            s = void 0 !== i && i,
            o = re();
          if (!t) return null;
          var u = 'function' == typeof t.id && t.id(),
            l = t.title(),
            c = t.summary(),
            h = t.payload(),
            m = t.headers(),
            p = t.correlationId(),
            f = t.contentType(),
            d = t.externalDocs(),
            g = f || d;
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
                  l &&
                    a.a.createElement(
                      'span',
                      { className: 'text-gray-700 mr-2' },
                      l,
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
                    f &&
                      a.a.createElement(
                        'li',
                        { className: 'inline-block' },
                        a.a.createElement(
                          D,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: ''.concat(P.a, '/').concat(f),
                          },
                          a.a.createElement('span', null, f),
                        ),
                      ),
                    d &&
                      a.a.createElement(
                        'li',
                        { className: 'inline-block' },
                        a.a.createElement(
                          D,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: d.url(),
                          },
                          a.a.createElement('span', null, P.c),
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
                        a.a.createElement(B, null, p.description()),
                      ),
                  ),
                t.hasDescription() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(B, null, t.description()),
                  ),
                h &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'mt-2',
                      id: n
                        ? ae.getIdentifier('message-'.concat(n, '-payload'), o)
                        : void 0,
                    },
                    a.a.createElement(K, { schemaName: 'Payload', schema: h }),
                  ),
                m &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'mt-2',
                      id: n
                        ? ae.getIdentifier('message-'.concat(n, '-headers'), o)
                        : void 0,
                    },
                    a.a.createElement(K, { schemaName: 'Headers', schema: m }),
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
                a.a.createElement(G, { item: t }),
                t.hasTags() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(I, { tags: t.tags() }),
                  ),
              ),
            ),
            s &&
              a.a.createElement(
                'div',
                { className: 'panel-item--right px-8' },
                a.a.createElement(Oe, { message: t }),
              ),
          );
        },
        Re = n(7),
        Ie = function() {
          return (Ie =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        Pe = function(e) {
          var t = re(),
            n = e.type,
            r = void 0 === n ? Re.b.PUBLISH : n,
            i = e.operation,
            s = e.channelName,
            o = e.channel;
          if (!i || !o) return null;
          var u = 'function' == typeof o.servers && o.servers(),
            l = 'function' == typeof i.security && i.security(),
            c = W.parametersToSchema(o.parameters());
          return a.a.createElement(
            'div',
            null,
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(Me, Ie({}, e)),
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
                      'operation-'.concat(r, '-').concat(s, '-parameters'),
                      t,
                    ),
                  },
                  a.a.createElement(K, {
                    schemaName: 'Parameters',
                    schema: c,
                    expanded: !0,
                  }),
                ),
              l &&
                a.a.createElement(
                  'div',
                  {
                    className: 'mt-2',
                    id: ae.getIdentifier(
                      'operation-'.concat(r, '-').concat(s, '-security'),
                      t,
                    ),
                  },
                  a.a.createElement(z, {
                    security: l,
                    header: 'Additional security requirements',
                  }),
                ),
              o.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(te, {
                    name: 'Channel specific information',
                    bindings: o.bindings(),
                  }),
                ),
              a.a.createElement(G, { name: 'Channel Extensions', item: o }),
              i.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(te, {
                    name: 'Operation specific information',
                    bindings: i.bindings(),
                  }),
                ),
              a.a.createElement(G, { name: 'Operation Extensions', item: i }),
              i.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(I, { tags: i.tags() }),
                ),
            ),
            a.a.createElement(
              'div',
              {
                className: 'w-full mt-4',
                id: ae.getIdentifier(
                  'operation-'.concat(r, '-').concat(s, '-message'),
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
                          a.a.createElement(Be, {
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
                      a.a.createElement(Be, {
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
            n = void 0 === t ? Re.b.PUBLISH : t,
            r = e.operation,
            i = e.channelName,
            s = e.channel,
            o = r.summary(),
            u = r.externalDocs(),
            l = r.id();
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
                      n === Re.b.PUBLISH
                        ? 'border-blue-600 text-blue-500'
                        : 'border-green-600 text-green-600',
                    ),
                    title: n,
                  },
                  n === Re.b.PUBLISH ? 'PUB' : 'SUB',
                ),
                ' ',
                a.a.createElement(
                  'span',
                  { className: 'font-mono text-base' },
                  i,
                ),
              ),
            ),
            s.hasDescription() &&
              a.a.createElement(
                'div',
                { className: 'mt-2' },
                a.a.createElement(B, null, s.description()),
              ),
            o &&
              a.a.createElement(
                'p',
                { className: 'text-gray-600 text-sm mt-2' },
                o,
              ),
            r.hasDescription() &&
              a.a.createElement(
                'div',
                { className: 'mt-2' },
                a.a.createElement(B, null, r.description()),
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
                      D,
                      {
                        className:
                          'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                        href: u.url(),
                      },
                      a.a.createElement('span', null, P.c),
                    ),
                  ),
              ),
            l &&
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
                    l,
                  ),
                ),
              ),
          );
        },
        Le = function() {
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
                        'operation-'.concat(Re.b.PUBLISH, '-').concat(r),
                        t,
                      ),
                    },
                    a.a.createElement(Pe, {
                      type: Re.b.PUBLISH,
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
                          'operation-'.concat(Re.b.SUBSCRIBE, '-').concat(r),
                          t,
                        ),
                      },
                      a.a.createElement(Pe, {
                        type: Re.b.SUBSCRIBE,
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
                P.e,
              ),
              a.a.createElement('ul', null, n),
            )
          );
        },
        ze = function() {
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
                  P.d,
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
                      a.a.createElement(Be, {
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
                    a.a.createElement(K, { schemaName: t, schema: n }),
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
                  P.f,
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
                  r ? ''.concat(P.b, ': ').concat(r) : P.b,
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
        qe = function(e) {
          var t,
            n,
            i,
            s,
            o,
            l,
            c,
            h = e.asyncapi,
            p = e.config,
            f = e.error,
            g = void 0 === f ? null : f,
            b = Object(r.useState)('container:xl'),
            y = b[0],
            x = b[1],
            E = u({
              onResize: function(e) {
                var t = e.width;
                requestAnimationFrame(function() {
                  if (void 0 !== t) {
                    var e = t <= 1280 ? 'container:xl' : 'container:base';
                    e !== y && x(e);
                  }
                });
              },
            }).ref;
          return a.a.createElement(
            ne.Provider,
            { value: p },
            a.a.createElement(
              m.Provider,
              { value: h },
              a.a.createElement(
                'section',
                { className: 'aui-root' },
                a.a.createElement(
                  'div',
                  {
                    className: ''.concat(
                      y,
                      ' relative md:flex bg-white leading-normal',
                    ),
                    id: p.schemaID || void 0,
                    ref: E,
                  },
                  (null === (t = p.show) || void 0 === t
                    ? void 0
                    : t.sidebar) && a.a.createElement(d, { config: p.sidebar }),
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
                      (null === (s = p.show) || void 0 === s
                        ? void 0
                        : s.servers) && a.a.createElement(se, null),
                      (null === (o = p.show) || void 0 === o
                        ? void 0
                        : o.operations) && a.a.createElement(Le, null),
                      (null === (l = p.show) || void 0 === l
                        ? void 0
                        : l.messages) && a.a.createElement(ze, null),
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
        Ye =
          ((Fe = function(e, t) {
            return (Fe =
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
            Fe(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((n.prototype = t.prototype), new n()));
          }),
        Ve = function() {
          return (Ve =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        We = function(e, t, n, r) {
          return new (n || (n = Promise))(function(a, i) {
            function s(e) {
              try {
                u(r.next(e));
              } catch (e) {
                i(e);
              }
            }
            function o(e) {
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
                      })).then(s, o);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Ge = function(e, t) {
          var n,
            r,
            a,
            i,
            s = {
              label: 0,
              sent: function() {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (i = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (i[Symbol.iterator] = function() {
                return this;
              }),
            i
          );
          function o(i) {
            return function(o) {
              return (function(i) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; s; )
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
                        return s.label++, { value: i[1], done: !1 };
                      case 5:
                        s.label++, (r = i[1]), (i = [0]);
                        continue;
                      case 7:
                        (i = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = s.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== i[0] && 2 !== i[0]))
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === i[0] &&
                          (!a || (i[1] > a[0] && i[1] < a[3]))
                        ) {
                          s.label = i[1];
                          break;
                        }
                        if (6 === i[0] && s.label < a[1]) {
                          (s.label = a[1]), (a = i);
                          break;
                        }
                        if (a && s.label < a[2]) {
                          (s.label = a[2]), s.ops.push(i);
                          break;
                        }
                        a[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    i = t.call(e, s);
                  } catch (e) {
                    (i = [6, e]), (r = 0);
                  } finally {
                    n = a = 0;
                  }
                if (5 & i[0]) throw i[1];
                return { value: i[0] ? i[1] : void 0, done: !0 };
              })([i, o]);
            };
          }
        },
        Ze = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            n.state = { asyncapi: void 0, error: void 0 };
            var r = i.a.retrieveParsedSpec(t.schema);
            return r && (n.state = { asyncapi: r }), n;
          }
          return (
            Ye(t, e),
            (t.prototype.componentDidMount = function() {
              return We(this, void 0, void 0, function() {
                return Ge(this, function(e) {
                  return (
                    this.state.asyncapi || this.updateState(this.props.schema),
                    [2]
                  );
                });
              });
            }),
            (t.prototype.componentDidUpdate = function(e) {
              return We(this, void 0, void 0, function() {
                var t, n;
                return Ge(this, function(r) {
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
                o = i.asyncapi,
                u = i.error,
                l = r || u,
                c = Ve(Ve(Ve({}, s), n), {
                  show: Ve(Ve({}, s.show), !!n && n.show),
                  sidebar: Ve(Ve({}, s.sidebar), !!n && n.sidebar),
                });
              return o
                ? a.a.createElement(qe, { asyncapi: o, config: c, error: l })
                : l
                ? (null === (e = c.show) || void 0 === e ? void 0 : e.errors) &&
                  a.a.createElement(He, { error: l })
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
      t.a = Ze;
    },
    29: function(e, t, n) {
      const r = n(39),
        a = n(40),
        i = n(44),
        s = n(76);
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
            ? this._json.security.map(e => new s(e))
            : null;
        }
      };
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
    35: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        s = n(3),
        o = n(36),
        u = n(70),
        l = n(6),
        c = n(21),
        h = n(4);
      e.exports = i(
        class extends s {
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
            return r(this._json.variables, o);
          }
          variable(e) {
            return a(this._json.variables, e, o);
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
        l,
        c,
        h,
      );
    },
    36: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        s = n(4);
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
        s,
      );
    },
    37: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        s = n(3),
        o = n(38),
        u = n(72),
        l = n(77),
        c = n(6),
        h = n(21),
        m = n(4);
      e.exports = i(
        class extends s {
          parameters() {
            return r(this._json.parameters, o);
          }
          parameter(e) {
            return a(this._json.parameters, e, o);
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
            return this._json.subscribe ? new l(this._json.subscribe) : null;
          }
          hasPublish() {
            return !!this._json.publish;
          }
          hasSubscribe() {
            return !!this._json.subscribe;
          }
        },
        c,
        h,
        m,
      );
    },
    38: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(10),
        s = n(6),
        o = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
          schema() {
            return this._json.schema ? new i(this._json.schema) : null;
          }
        },
        s,
        o,
      );
    },
    39: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        s = n(25),
        o = n(17),
        u = n(21),
        l = n(4);
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
        s,
        o,
        u,
        l,
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
      (function(t) {
        const r = n(41),
          a = n(42),
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
    41: function(e, t, n) {
      const r = n(42);
      e.exports = class extends r {};
    },
    42: function(e, t, n) {
      const { getMapValueOfType: r, mix: a } = n(2),
        i = n(3),
        s = n(10),
        o = n(43),
        u = n(6),
        l = n(17),
        c = n(25),
        h = n(21),
        m = n(4);
      e.exports = a(
        class extends i {
          headers() {
            return this._json.headers ? new s(this._json.headers) : null;
          }
          header(e) {
            return this._json.headers
              ? r(this._json.headers.properties, e, s)
              : null;
          }
          id() {
            return this._json.messageId;
          }
          correlationId() {
            return this._json.correlationId
              ? new o(this._json.correlationId)
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
        l,
        h,
        m,
      );
    },
    43: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        s = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
        },
        s,
        i,
      );
    },
    44: function(e, t, n) {
      const r = n(39);
      e.exports = class extends r {};
    },
    45: function(e, t) {
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
        const { callback: s, schemaTypesToIterate: o, seenSchemas: u } = i,
          l = e.json();
        if (u.has(l)) return;
        u.add(l);
        let c = e.type() || [];
        Array.isArray(c) || (c = [c]),
          (!o.includes(r.objects) && c.includes('object')) ||
            (!o.includes(r.arrays) && c.includes('array')) ||
            (!1 !== s(e, t, n.NEW_SCHEMA) &&
              (o.includes(r.objects) &&
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
              o.includes(r.arrays) &&
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
              o.includes(r.oneOfs) &&
                (e.oneOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              o.includes(r.anyOfs) &&
                (e.anyOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              o.includes(r.allOfs) &&
                (e.allOf() || []).forEach((e, t) => {
                  a(e, t, i);
                }),
              o.includes(r.nots) && e.not() && a(e.not(), null, i),
              o.includes(r.ifs) && e.if() && a(e.if(), null, i),
              o.includes(r.thenes) && e.then() && a(e.then(), null, i),
              o.includes(r.elses) && e.else() && a(e.else(), null, i),
              o.includes(r.dependencies) &&
                Object.entries(e.dependencies() || {}).forEach(([e, t]) => {
                  t && !Array.isArray(t) && a(t, e, i);
                }),
              o.includes(r.definitions) &&
                Object.entries(e.definitions() || {}).forEach(([e, t]) => {
                  a(t, e, i);
                }),
              s(e, t, n.END_SCHEMA),
              u.delete(l)));
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
          const s = {
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
                })(e, s);
              }),
            n.includes(r.components) && e.hasComponents())
          ) {
            const t = e.components();
            Object.values(t.messages() || {}).forEach(e => {
              i(e, s);
            }),
              Object.values(t.schemas() || {}).forEach(e => {
                a(e, null, s);
              }),
              n.includes(r.parameters) &&
                Object.values(t.parameters() || {}).forEach(e => {
                  a(e.schema(), null, s);
                }),
              Object.values(t.messageTraits() || {}).forEach(e => {
                !(function(e, t) {
                  if (!e) return;
                  const { schemaTypesToIterate: n } = t;
                  n.includes(r.headers) && a(e.headers(), null, t);
                })(e, s);
              });
          }
        },
      };
    },
    46: function(e, t, n) {
      /*! @license DOMPurify 2.3.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.6/LICENSE */
      e.exports = (function() {
        'use strict';
        var e = Object.hasOwnProperty,
          t = Object.setPrototypeOf,
          n = Object.isFrozen,
          r = Object.getPrototypeOf,
          a = Object.getOwnPropertyDescriptor,
          i = Object.freeze,
          s = Object.seal,
          o = Object.create,
          u = 'undefined' != typeof Reflect && Reflect,
          l = u.apply,
          c = u.construct;
        l ||
          (l = function(e, t, n) {
            return e.apply(t, n);
          }),
          i ||
            (i = function(e) {
              return e;
            }),
          s ||
            (s = function(e) {
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
        var h,
          m = D(Array.prototype.forEach),
          p = D(Array.prototype.pop),
          f = D(Array.prototype.push),
          d = D(String.prototype.toLowerCase),
          g = D(String.prototype.match),
          b = D(String.prototype.replace),
          y = D(String.prototype.indexOf),
          x = D(String.prototype.trim),
          E = D(RegExp.prototype.test),
          v =
            ((h = TypeError),
            function() {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return c(h, t);
            });
        function D(e) {
          return function(t) {
            for (
              var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1;
              a < n;
              a++
            )
              r[a - 1] = arguments[a];
            return l(e, t, r);
          };
        }
        function A(e, r) {
          t && t(e, null);
          for (var a = r.length; a--; ) {
            var i = r[a];
            if ('string' == typeof i) {
              var s = d(i);
              s !== i && (n(r) || (r[a] = s), (i = s));
            }
            e[i] = !0;
          }
          return e;
        }
        function w(t) {
          var n = o(null),
            r = void 0;
          for (r in t) l(e, t, [r]) && (n[r] = t[r]);
          return n;
        }
        function k(e, t) {
          for (; null !== e; ) {
            var n = a(e, t);
            if (n) {
              if (n.get) return D(n.get);
              if ('function' == typeof n.value) return D(n.value);
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
          C = i([
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
          N = i([
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
          j = i([
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
          F = i([
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
          S = i([
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
          O = i(['#text']),
          T = i([
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
          B = i([
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
          I = i([
            'xlink:href',
            'xml:id',
            'xlink:title',
            'xml:space',
            'xmlns:xlink',
          ]),
          P = s(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
          M = s(/<%[\s\S]*|[\s\S]*%>/gm),
          L = s(/^data-[\-\w.\u00B7-\uFFFF]/),
          z = s(/^aria-[\-\w]+$/),
          U = s(
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          ),
          $ = s(/^(?:\w+script|data):/i),
          H = s(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
          q = s(/^html$/i),
          Y =
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
        function V(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
          }
          return Array.from(e);
        }
        var W = function() {
            return 'undefined' == typeof window ? null : window;
          },
          G = function(e, t) {
            if (
              'object' !== (void 0 === e ? 'undefined' : Y(e)) ||
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
                : W(),
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
            s = t.DocumentFragment,
            o = t.HTMLTemplateElement,
            u = t.Node,
            l = t.Element,
            c = t.NodeFilter,
            h = t.NamedNodeMap,
            D = void 0 === h ? t.NamedNodeMap || t.MozNamedAttrMap : h,
            Z = t.HTMLFormElement,
            K = t.DOMParser,
            J = t.trustedTypes,
            X = l.prototype,
            Q = k(X, 'cloneNode'),
            ee = k(X, 'nextSibling'),
            te = k(X, 'childNodes'),
            ne = k(X, 'parentNode');
          if ('function' == typeof o) {
            var re = a.createElement('template');
            re.content &&
              re.content.ownerDocument &&
              (a = re.content.ownerDocument);
          }
          var ae = G(J, r),
            ie = ae ? ae.createHTML('') : '',
            se = a,
            oe = se.implementation,
            ue = se.createNodeIterator,
            le = se.createDocumentFragment,
            ce = se.getElementsByTagName,
            he = r.importNode,
            me = {};
          try {
            me = w(a).documentMode ? a.documentMode : {};
          } catch (e) {}
          var pe = {};
          n.isSupported =
            'function' == typeof ne &&
            oe &&
            void 0 !== oe.createHTMLDocument &&
            9 !== me;
          var fe = P,
            de = M,
            ge = L,
            be = z,
            ye = $,
            xe = H,
            Ee = U,
            ve = null,
            De = A({}, [].concat(V(_), V(C), V(N), V(F), V(O))),
            Ae = null,
            we = A({}, [].concat(V(T), V(B), V(R), V(I))),
            ke = Object.seal(
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
            Ce = null,
            Ne = !0,
            je = !0,
            Fe = !1,
            Se = !1,
            Oe = !1,
            Te = !1,
            Be = !1,
            Re = !1,
            Ie = !1,
            Pe = !1,
            Me = !0,
            Le = !0,
            ze = !1,
            Ue = {},
            $e = null,
            He = A({}, [
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
            qe = null,
            Ye = A({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
            Ve = null,
            We = A({}, [
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
            Ge = 'http://www.w3.org/1998/Math/MathML',
            Ze = 'http://www.w3.org/2000/svg',
            Ke = 'http://www.w3.org/1999/xhtml',
            Je = Ke,
            Xe = !1,
            Qe = void 0,
            et = ['application/xhtml+xml', 'text/html'],
            tt = 'text/html',
            nt = void 0,
            rt = null,
            at = a.createElement('form'),
            it = function(e) {
              return e instanceof RegExp || e instanceof Function;
            },
            st = function(e) {
              (rt && rt === e) ||
                ((e && 'object' === (void 0 === e ? 'undefined' : Y(e))) ||
                  (e = {}),
                (e = w(e)),
                (ve = 'ALLOWED_TAGS' in e ? A({}, e.ALLOWED_TAGS) : De),
                (Ae = 'ALLOWED_ATTR' in e ? A({}, e.ALLOWED_ATTR) : we),
                (Ve =
                  'ADD_URI_SAFE_ATTR' in e
                    ? A(w(We), e.ADD_URI_SAFE_ATTR)
                    : We),
                (qe =
                  'ADD_DATA_URI_TAGS' in e
                    ? A(w(Ye), e.ADD_DATA_URI_TAGS)
                    : Ye),
                ($e = 'FORBID_CONTENTS' in e ? A({}, e.FORBID_CONTENTS) : He),
                (_e = 'FORBID_TAGS' in e ? A({}, e.FORBID_TAGS) : {}),
                (Ce = 'FORBID_ATTR' in e ? A({}, e.FORBID_ATTR) : {}),
                (Ue = 'USE_PROFILES' in e && e.USE_PROFILES),
                (Ne = !1 !== e.ALLOW_ARIA_ATTR),
                (je = !1 !== e.ALLOW_DATA_ATTR),
                (Fe = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                (Se = e.SAFE_FOR_TEMPLATES || !1),
                (Oe = e.WHOLE_DOCUMENT || !1),
                (Re = e.RETURN_DOM || !1),
                (Ie = e.RETURN_DOM_FRAGMENT || !1),
                (Pe = e.RETURN_TRUSTED_TYPE || !1),
                (Be = e.FORCE_BODY || !1),
                (Me = !1 !== e.SANITIZE_DOM),
                (Le = !1 !== e.KEEP_CONTENT),
                (ze = e.IN_PLACE || !1),
                (Ee = e.ALLOWED_URI_REGEXP || Ee),
                (Je = e.NAMESPACE || Ke),
                e.CUSTOM_ELEMENT_HANDLING &&
                  it(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                  (ke.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                e.CUSTOM_ELEMENT_HANDLING &&
                  it(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                  (ke.attributeNameCheck =
                    e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                e.CUSTOM_ELEMENT_HANDLING &&
                  'boolean' ==
                    typeof e.CUSTOM_ELEMENT_HANDLING
                      .allowCustomizedBuiltInElements &&
                  (ke.allowCustomizedBuiltInElements =
                    e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                (Qe = Qe =
                  -1 === et.indexOf(e.PARSER_MEDIA_TYPE)
                    ? tt
                    : e.PARSER_MEDIA_TYPE),
                (nt =
                  'application/xhtml+xml' === Qe
                    ? function(e) {
                        return e;
                      }
                    : d),
                Se && (je = !1),
                Ie && (Re = !0),
                Ue &&
                  ((ve = A({}, [].concat(V(O)))),
                  (Ae = []),
                  !0 === Ue.html && (A(ve, _), A(Ae, T)),
                  !0 === Ue.svg && (A(ve, C), A(Ae, B), A(Ae, I)),
                  !0 === Ue.svgFilters && (A(ve, N), A(Ae, B), A(Ae, I)),
                  !0 === Ue.mathMl && (A(ve, F), A(Ae, R), A(Ae, I))),
                e.ADD_TAGS && (ve === De && (ve = w(ve)), A(ve, e.ADD_TAGS)),
                e.ADD_ATTR && (Ae === we && (Ae = w(Ae)), A(Ae, e.ADD_ATTR)),
                e.ADD_URI_SAFE_ATTR && A(Ve, e.ADD_URI_SAFE_ATTR),
                e.FORBID_CONTENTS &&
                  ($e === He && ($e = w($e)), A($e, e.FORBID_CONTENTS)),
                Le && (ve['#text'] = !0),
                Oe && A(ve, ['html', 'head', 'body']),
                ve.table && (A(ve, ['tbody']), delete _e.tbody),
                i && i(e),
                (rt = e));
            },
            ot = A({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
            ut = A({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
            lt = A({}, C);
          A(lt, N), A(lt, j);
          var ct = A({}, F);
          A(ct, S);
          var ht = function(e) {
              var t = ne(e);
              (t && t.tagName) ||
                (t = { namespaceURI: Ke, tagName: 'template' });
              var n = d(e.tagName),
                r = d(t.tagName);
              if (e.namespaceURI === Ze)
                return t.namespaceURI === Ke
                  ? 'svg' === n
                  : t.namespaceURI === Ge
                  ? 'svg' === n && ('annotation-xml' === r || ot[r])
                  : Boolean(lt[n]);
              if (e.namespaceURI === Ge)
                return t.namespaceURI === Ke
                  ? 'math' === n
                  : t.namespaceURI === Ze
                  ? 'math' === n && ut[r]
                  : Boolean(ct[n]);
              if (e.namespaceURI === Ke) {
                if (t.namespaceURI === Ze && !ut[r]) return !1;
                if (t.namespaceURI === Ge && !ot[r]) return !1;
                var a = A({}, ['title', 'style', 'font', 'a', 'script']);
                return !ct[n] && (a[n] || !lt[n]);
              }
              return !1;
            },
            mt = function(e) {
              f(n.removed, { element: e });
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
                f(n.removed, { attribute: t.getAttributeNode(e), from: t });
              } catch (e) {
                f(n.removed, { attribute: null, from: t });
              }
              if ((t.removeAttribute(e), 'is' === e && !Ae[e]))
                if (Re || Ie)
                  try {
                    mt(t);
                  } catch (e) {}
                else
                  try {
                    t.setAttribute(e, '');
                  } catch (e) {}
            },
            ft = function(e) {
              var t = void 0,
                n = void 0;
              if (Be) e = '<remove></remove>' + e;
              else {
                var r = g(e, /^[\r\n\t ]+/);
                n = r && r[0];
              }
              'application/xhtml+xml' === Qe &&
                (e =
                  '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                  e +
                  '</body></html>');
              var i = ae ? ae.createHTML(e) : e;
              if (Je === Ke)
                try {
                  t = new K().parseFromString(i, Qe);
                } catch (e) {}
              if (!t || !t.documentElement) {
                t = oe.createDocument(Je, 'template', null);
                try {
                  t.documentElement.innerHTML = Xe ? '' : i;
                } catch (e) {}
              }
              var s = t.body || t.documentElement;
              return (
                e &&
                  n &&
                  s.insertBefore(a.createTextNode(n), s.childNodes[0] || null),
                Je === Ke
                  ? ce.call(t, Oe ? 'html' : 'body')[0]
                  : Oe
                  ? t.documentElement
                  : s
              );
            },
            dt = function(e) {
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
                e instanceof Z &&
                ('string' != typeof e.nodeName ||
                  'string' != typeof e.textContent ||
                  'function' != typeof e.removeChild ||
                  !(e.attributes instanceof D) ||
                  'function' != typeof e.removeAttribute ||
                  'function' != typeof e.setAttribute ||
                  'string' != typeof e.namespaceURI ||
                  'function' != typeof e.insertBefore)
              );
            },
            bt = function(e) {
              return 'object' === (void 0 === u ? 'undefined' : Y(u))
                ? e instanceof u
                : e &&
                    'object' === (void 0 === e ? 'undefined' : Y(e)) &&
                    'number' == typeof e.nodeType &&
                    'string' == typeof e.nodeName;
            },
            yt = function(e, t, r) {
              pe[e] &&
                m(pe[e], function(e) {
                  e.call(n, t, r, rt);
                });
            },
            xt = function(e) {
              var t = void 0;
              if ((yt('beforeSanitizeElements', e, null), gt(e)))
                return mt(e), !0;
              if (g(e.nodeName, /[\u0080-\uFFFF]/)) return mt(e), !0;
              var r = nt(e.nodeName);
              if (
                (yt('uponSanitizeElement', e, { tagName: r, allowedTags: ve }),
                !bt(e.firstElementChild) &&
                  (!bt(e.content) || !bt(e.content.firstElementChild)) &&
                  E(/<[/\w]/g, e.innerHTML) &&
                  E(/<[/\w]/g, e.textContent))
              )
                return mt(e), !0;
              if ('select' === r && E(/<template/i, e.innerHTML))
                return mt(e), !0;
              if (!ve[r] || _e[r]) {
                if (!_e[r] && vt(r)) {
                  if (
                    ke.tagNameCheck instanceof RegExp &&
                    E(ke.tagNameCheck, r)
                  )
                    return !1;
                  if (ke.tagNameCheck instanceof Function && ke.tagNameCheck(r))
                    return !1;
                }
                if (Le && !$e[r]) {
                  var a = ne(e) || e.parentNode,
                    i = te(e) || e.childNodes;
                  if (i && a)
                    for (var s = i.length - 1; s >= 0; --s)
                      a.insertBefore(Q(i[s], !0), ee(e));
                }
                return mt(e), !0;
              }
              return e instanceof l && !ht(e)
                ? (mt(e), !0)
                : ('noscript' !== r && 'noembed' !== r) ||
                  !E(/<\/no(script|embed)/i, e.innerHTML)
                ? (Se &&
                    3 === e.nodeType &&
                    ((t = e.textContent),
                    (t = b(t, fe, ' ')),
                    (t = b(t, de, ' ')),
                    e.textContent !== t &&
                      (f(n.removed, { element: e.cloneNode() }),
                      (e.textContent = t))),
                  yt('afterSanitizeElements', e, null),
                  !1)
                : (mt(e), !0);
            },
            Et = function(e, t, n) {
              if (Me && ('id' === t || 'name' === t) && (n in a || n in at))
                return !1;
              if (je && !Ce[t] && E(ge, t));
              else if (Ne && E(be, t));
              else if (!Ae[t] || Ce[t]) {
                if (
                  !(
                    (vt(e) &&
                      ((ke.tagNameCheck instanceof RegExp &&
                        E(ke.tagNameCheck, e)) ||
                        (ke.tagNameCheck instanceof Function &&
                          ke.tagNameCheck(e))) &&
                      ((ke.attributeNameCheck instanceof RegExp &&
                        E(ke.attributeNameCheck, t)) ||
                        (ke.attributeNameCheck instanceof Function &&
                          ke.attributeNameCheck(t)))) ||
                    ('is' === t &&
                      ke.allowCustomizedBuiltInElements &&
                      ((ke.tagNameCheck instanceof RegExp &&
                        E(ke.tagNameCheck, n)) ||
                        (ke.tagNameCheck instanceof Function &&
                          ke.tagNameCheck(n))))
                  )
                )
                  return !1;
              } else if (Ve[t]);
              else if (E(Ee, b(n, xe, '')));
              else if (
                ('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
                'script' === e ||
                0 !== y(n, 'data:') ||
                !qe[e]
              )
                if (Fe && !E(ye, b(n, xe, '')));
                else if (n) return !1;
              return !0;
            },
            vt = function(e) {
              return e.indexOf('-') > 0;
            },
            Dt = function(e) {
              var t = void 0,
                r = void 0,
                a = void 0,
                i = void 0;
              yt('beforeSanitizeAttributes', e, null);
              var s = e.attributes;
              if (s) {
                var o = {
                  attrName: '',
                  attrValue: '',
                  keepAttr: !0,
                  allowedAttributes: Ae,
                };
                for (i = s.length; i--; ) {
                  var u = (t = s[i]),
                    l = u.name,
                    c = u.namespaceURI;
                  if (
                    ((r = x(t.value)),
                    (a = nt(l)),
                    (o.attrName = a),
                    (o.attrValue = r),
                    (o.keepAttr = !0),
                    (o.forceKeepAttr = void 0),
                    yt('uponSanitizeAttribute', e, o),
                    (r = o.attrValue),
                    !o.forceKeepAttr && (pt(l, e), o.keepAttr))
                  )
                    if (E(/\/>/i, r)) pt(l, e);
                    else {
                      Se && ((r = b(r, fe, ' ')), (r = b(r, de, ' ')));
                      var h = nt(e.nodeName);
                      if (Et(h, a, r))
                        try {
                          c ? e.setAttributeNS(c, l, r) : e.setAttribute(l, r),
                            p(n.removed);
                        } catch (e) {}
                    }
                }
                yt('afterSanitizeAttributes', e, null);
              }
            },
            At = function e(t) {
              var n = void 0,
                r = dt(t);
              for (yt('beforeSanitizeShadowDOM', t, null); (n = r.nextNode()); )
                yt('uponSanitizeShadowNode', n, null),
                  xt(n) || (n.content instanceof s && e(n.content), Dt(n));
              yt('afterSanitizeShadowDOM', t, null);
            };
          return (
            (n.sanitize = function(e, a) {
              var i = void 0,
                o = void 0,
                l = void 0,
                c = void 0,
                h = void 0;
              if (
                ((Xe = !e) && (e = '\x3c!--\x3e'),
                'string' != typeof e && !bt(e))
              ) {
                if ('function' != typeof e.toString)
                  throw v('toString is not a function');
                if ('string' != typeof (e = e.toString()))
                  throw v('dirty is not a string, aborting');
              }
              if (!n.isSupported) {
                if (
                  'object' === Y(t.toStaticHTML) ||
                  'function' == typeof t.toStaticHTML
                ) {
                  if ('string' == typeof e) return t.toStaticHTML(e);
                  if (bt(e)) return t.toStaticHTML(e.outerHTML);
                }
                return e;
              }
              if (
                (Te || st(a),
                (n.removed = []),
                'string' == typeof e && (ze = !1),
                ze)
              ) {
                if (e.nodeName) {
                  var m = nt(e.nodeName);
                  if (!ve[m] || _e[m])
                    throw v(
                      'root node is forbidden and cannot be sanitized in-place',
                    );
                }
              } else if (e instanceof u)
                (1 ===
                  (o = (i = ft('\x3c!----\x3e')).ownerDocument.importNode(
                    e,
                    !0,
                  )).nodeType &&
                  'BODY' === o.nodeName) ||
                'HTML' === o.nodeName
                  ? (i = o)
                  : i.appendChild(o);
              else {
                if (!Re && !Se && !Oe && -1 === e.indexOf('<'))
                  return ae && Pe ? ae.createHTML(e) : e;
                if (!(i = ft(e))) return Re ? null : Pe ? ie : '';
              }
              i && Be && mt(i.firstChild);
              for (var p = dt(ze ? e : i); (l = p.nextNode()); )
                (3 === l.nodeType && l === c) ||
                  xt(l) ||
                  (l.content instanceof s && At(l.content), Dt(l), (c = l));
              if (((c = null), ze)) return e;
              if (Re) {
                if (Ie)
                  for (h = le.call(i.ownerDocument); i.firstChild; )
                    h.appendChild(i.firstChild);
                else h = i;
                return Ae.shadowroot && (h = he.call(r, h, !0)), h;
              }
              var f = Oe ? i.outerHTML : i.innerHTML;
              return (
                Oe &&
                  ve['!doctype'] &&
                  i.ownerDocument &&
                  i.ownerDocument.doctype &&
                  i.ownerDocument.doctype.name &&
                  E(q, i.ownerDocument.doctype.name) &&
                  (f = '<!DOCTYPE ' + i.ownerDocument.doctype.name + '>\n' + f),
                Se && ((f = b(f, fe, ' ')), (f = b(f, de, ' '))),
                ae && Pe ? ae.createHTML(f) : f
              );
            }),
            (n.setConfig = function(e) {
              st(e), (Te = !0);
            }),
            (n.clearConfig = function() {
              (rt = null), (Te = !1);
            }),
            (n.isValidAttribute = function(e, t, n) {
              rt || st({});
              var r = nt(e),
                a = nt(t);
              return Et(r, a, n);
            }),
            (n.addHook = function(e, t) {
              'function' == typeof t && ((pe[e] = pe[e] || []), f(pe[e], t));
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
    53: function(e, t, n) {
      e.exports =
        window.DOMPurify || (window.DOMPurify = n(46).default || n(46));
    },
    54: function(e, t, n) {
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
          s = /[&<>"']/g,
          o = /[<>"']|&(?!#?\w+;)/,
          u = /[<>"']|&(?!#?\w+;)/g,
          l = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          },
          c = function(e) {
            return l[e];
          };
        function h(e, t) {
          if (t) {
            if (i.test(e)) return e.replace(s, c);
          } else if (o.test(e)) return e.replace(u, c);
          return e;
        }
        var m = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
        function p(e) {
          return e.replace(m, function(e, t) {
            return 'colon' === (t = t.toLowerCase())
              ? ':'
              : '#' === t.charAt(0)
              ? 'x' === t.charAt(1)
                ? String.fromCharCode(parseInt(t.substring(2), 16))
                : String.fromCharCode(+t.substring(1))
              : '';
          });
        }
        var f = /(^|[^\[])\^/g;
        function d(e, t) {
          (e = 'string' == typeof e ? e : e.source), (t = t || '');
          var n = {
            replace: function(t, r) {
              return (
                (r = (r = r.source || r).replace(f, '$1')),
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
          b = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function y(e, t, n) {
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
            !b.test(n) &&
            (n = (function(e, t) {
              x[' ' + e] ||
                (E.test(e)
                  ? (x[' ' + e] = e + '/')
                  : (x[' ' + e] = _(e, '/', !0)));
              var n = -1 === (e = x[' ' + e]).indexOf(':');
              return '//' === t.substring(0, 2)
                ? n
                  ? t
                  : e.replace(v, '$1') + t
                : '/' === t.charAt(0)
                ? n
                  ? t
                  : e.replace(D, '$1') + t
                : e + t;
            })(t, n));
          try {
            n = encodeURI(n).replace(/%25/g, '%');
          } catch (e) {
            return null;
          }
          return n;
        }
        var x = {},
          E = /^[^:]+:\/*[^/]*$/,
          v = /^([^:]+:)[\s\S]*$/,
          D = /^([^:]+:\/*[^/]*)[\s\S]*$/,
          A = { exec: function() {} };
        function w(e) {
          for (var t, n, r = 1; r < arguments.length; r++)
            for (n in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }
        function k(e, t) {
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
        function C(e) {
          e &&
            e.sanitize &&
            !e.silent &&
            console.warn(
              'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options',
            );
        }
        function N(e, t) {
          if (t < 1) return '';
          for (var n = ''; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e);
          return n + e;
        }
        function j(e, t, n, r) {
          var a = t.href,
            i = t.title ? h(t.title) : null,
            s = e[1].replace(/\\([\[\]])/g, '$1');
          if ('!' !== e[0].charAt(0)) {
            r.state.inLink = !0;
            var o = {
              type: 'link',
              raw: n,
              href: a,
              title: i,
              text: s,
              tokens: r.inlineTokens(s, []),
            };
            return (r.state.inLink = !1), o;
          }
          return { type: 'image', raw: n, href: a, title: i, text: h(s) };
        }
        var F = (function() {
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
                    s,
                    o,
                    u,
                    l,
                    c,
                    h,
                    m,
                    p,
                    f,
                    d = t[1].trim(),
                    g = d.length > 1,
                    b = {
                      type: 'list',
                      raw: '',
                      ordered: g,
                      start: g ? +d.slice(0, -1) : '',
                      loose: !1,
                      items: [],
                    };
                  (d = g ? '\\d{1,9}\\' + d.slice(-1) : '\\' + d),
                    this.options.pedantic && (d = g ? d : '[*+-]');
                  for (
                    var y = new RegExp(
                      '^( {0,3}' + d + ')((?:[\t ][^\\n]*)?(?:\\n|$))',
                    );
                    e &&
                    ((f = !1), (t = y.exec(e))) &&
                    !this.rules.block.hr.test(e);

                  ) {
                    if (
                      ((n = t[0]),
                      (e = e.substring(n.length)),
                      (c = t[2].split('\n', 1)[0]),
                      (h = e.split('\n', 1)[0]),
                      this.options.pedantic
                        ? ((s = 2), (p = c.trimLeft()))
                        : ((s = (s = t[2].search(/[^ ]/)) > 4 ? 1 : s),
                          (p = c.slice(s)),
                          (s += t[1].length)),
                      (u = !1),
                      !c &&
                        /^ *$/.test(h) &&
                        ((n += h + '\n'),
                        (e = e.substring(h.length + 1)),
                        (f = !0)),
                      !f)
                    )
                      for (
                        var x = new RegExp(
                          '^ {0,' +
                            Math.min(3, s - 1) +
                            '}(?:[*+-]|\\d{1,9}[.)])',
                        );
                        e &&
                        ((c = m = e.split('\n', 1)[0]),
                        this.options.pedantic &&
                          (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
                        !x.test(c));

                      ) {
                        if (c.search(/[^ ]/) >= s || !c.trim())
                          p += '\n' + c.slice(s);
                        else {
                          if (u) break;
                          p += '\n' + c;
                        }
                        u || c.trim() || (u = !0),
                          (n += m + '\n'),
                          (e = e.substring(m.length + 1));
                      }
                    b.loose ||
                      (l ? (b.loose = !0) : /\n *\n *$/.test(n) && (l = !0)),
                      this.options.gfm &&
                        (a = /^\[[ xX]\] /.exec(p)) &&
                        ((i = '[ ] ' !== a[0]),
                        (p = p.replace(/^\[[ xX]\] +/, ''))),
                      b.items.push({
                        type: 'list_item',
                        raw: n,
                        task: !!a,
                        checked: i,
                        loose: !1,
                        text: p,
                      }),
                      (b.raw += n);
                  }
                  (b.items[b.items.length - 1].raw = n.trimRight()),
                    (b.items[b.items.length - 1].text = p.trimRight()),
                    (b.raw = b.raw.trimRight());
                  var E = b.items.length;
                  for (o = 0; o < E; o++) {
                    (this.lexer.state.top = !1),
                      (b.items[o].tokens = this.lexer.blockTokens(
                        b.items[o].text,
                        [],
                      ));
                    var v = b.items[o].tokens.filter(function(e) {
                        return 'space' === e.type;
                      }),
                      D = v.every(function(e) {
                        for (
                          var t, n = 0, a = r(e.raw.split(''));
                          !(t = a()).done;

                        )
                          if (('\n' === t.value && (n += 1), n > 1)) return !0;
                        return !1;
                      });
                    !b.loose &&
                      v.length &&
                      D &&
                      ((b.loose = !0), (b.items[o].loose = !0));
                  }
                  return b;
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
                        : h(t[0])),
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
                    header: k(t[1]).map(function(e) {
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
                      s,
                      o = n.align.length;
                    for (r = 0; r < o; r++)
                      /^ *-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'right')
                        : /^ *:-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'center')
                        : /^ *:-+ *$/.test(n.align[r])
                        ? (n.align[r] = 'left')
                        : (n.align[r] = null);
                    for (o = n.rows.length, r = 0; r < o; r++)
                      n.rows[r] = k(n.rows[r], n.header.length).map(function(
                        e,
                      ) {
                        return { text: e };
                      });
                    for (o = n.header.length, a = 0; a < o; a++)
                      (n.header[a].tokens = []),
                        this.lexer.inlineTokens(
                          n.header[a].text,
                          n.header[a].tokens,
                        );
                    for (o = n.rows.length, a = 0; a < o; a++)
                      for (s = n.rows[a], i = 0; i < s.length; i++)
                        (s[i].tokens = []),
                          this.lexer.inlineTokens(s[i].text, s[i].tokens);
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
                if (t) return { type: 'escape', raw: t[0], text: h(t[1]) };
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
                          : h(t[0])
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
                  var s = t[2],
                    o = '';
                  if (this.options.pedantic) {
                    var u = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
                    u && ((s = u[1]), (o = u[3]));
                  } else o = t[3] ? t[3].slice(1, -1) : '';
                  return (
                    (s = s.trim()),
                    /^</.test(s) &&
                      (s =
                        this.options.pedantic && !/>$/.test(n)
                          ? s.slice(1)
                          : s.slice(1, -1)),
                    j(
                      t,
                      {
                        href: s
                          ? s.replace(this.rules.inline._escapes, '$1')
                          : s,
                        title: o
                          ? o.replace(this.rules.inline._escapes, '$1')
                          : o,
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
                  return j(n, r, n[0], this.lexer);
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
                      s,
                      o = r[0].length - 1,
                      u = o,
                      l = 0,
                      c =
                        '*' === r[0][0]
                          ? this.rules.inline.emStrong.rDelimAst
                          : this.rules.inline.emStrong.rDelimUnd;
                    for (
                      c.lastIndex = 0, t = t.slice(-1 * e.length + o);
                      null != (r = c.exec(t));

                    )
                      if ((i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]))
                        if (((s = i.length), r[3] || r[4])) u += s;
                        else if (!((r[5] || r[6]) && o % 3) || (o + s) % 3) {
                          if (!((u -= s) > 0)) {
                            if (
                              ((s = Math.min(s, s + u + l)), Math.min(o, s) % 2)
                            ) {
                              var h = e.slice(1, o + r.index + s);
                              return {
                                type: 'em',
                                raw: e.slice(0, o + r.index + s + 1),
                                text: h,
                                tokens: this.lexer.inlineTokens(h, []),
                              };
                            }
                            var m = e.slice(2, o + r.index + s - 1);
                            return {
                              type: 'strong',
                              raw: e.slice(0, o + r.index + s + 1),
                              text: m,
                              tokens: this.lexer.inlineTokens(m, []),
                            };
                          }
                        } else l += s;
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
                    (n = h(n, !0)),
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
                          (n = h(this.options.mangle ? t(a[1]) : a[1]))
                        : (n = h(a[1]))),
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
                      'mailto:' + (r = h(this.options.mangle ? t(n[0]) : n[0]));
                  else {
                    var i;
                    do {
                      (i = n[0]),
                        (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
                    } while (i !== n[0]);
                    (r = h(n[0])), (a = 'www.' === n[1] ? 'http://' + r : r);
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
                          : h(r[0])
                        : r[0]
                      : h(this.options.smartypants ? t(r[0]) : r[0])),
                    { type: 'text', raw: r[0], text: n }
                  );
              }),
              t
            );
          })(),
          S = {
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
            table: A,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
          };
        (S.def = d(S.def)
          .replace('label', S._label)
          .replace('title', S._title)
          .getRegex()),
          (S.bullet = /(?:[*+-]|\d{1,9}[.)])/),
          (S.listItemStart = d(/^( *)(bull) */)
            .replace('bull', S.bullet)
            .getRegex()),
          (S.list = d(S.list)
            .replace(/bull/g, S.bullet)
            .replace(
              'hr',
              '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
            )
            .replace('def', '\\n+(?=' + S.def.source + ')')
            .getRegex()),
          (S._tag =
            'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
          (S._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
          (S.html = d(S.html, 'i')
            .replace('comment', S._comment)
            .replace('tag', S._tag)
            .replace(
              'attribute',
              / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
            )
            .getRegex()),
          (S.paragraph = d(S._paragraph)
            .replace('hr', S.hr)
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
            .replace('tag', S._tag)
            .getRegex()),
          (S.blockquote = d(S.blockquote)
            .replace('paragraph', S.paragraph)
            .getRegex()),
          (S.normal = w({}, S)),
          (S.gfm = w({}, S.normal, {
            table:
              '^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
          })),
          (S.gfm.table = d(S.gfm.table)
            .replace('hr', S.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
            )
            .replace('tag', S._tag)
            .getRegex()),
          (S.gfm.paragraph = d(S._paragraph)
            .replace('hr', S.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('table', S.gfm.table)
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
            )
            .replace('tag', S._tag)
            .getRegex()),
          (S.pedantic = w({}, S.normal, {
            html: d(
              '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
            )
              .replace('comment', S._comment)
              .replace(
                /tag/g,
                '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
              )
              .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: A,
            paragraph: d(S.normal._paragraph)
              .replace('hr', S.hr)
              .replace('heading', ' *#{1,6} *[^\n]')
              .replace('lheading', S.lheading)
              .replace('blockquote', ' {0,3}>')
              .replace('|fences', '')
              .replace('|list', '')
              .replace('|html', '')
              .getRegex(),
          }));
        var O = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: A,
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
          del: A,
          text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
          punctuation: /^([\spunctuation])/,
        };
        function T(e) {
          return e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…');
        }
        function B(e) {
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
        (O._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~'),
          (O.punctuation = d(O.punctuation)
            .replace(/punctuation/g, O._punctuation)
            .getRegex()),
          (O.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
          (O.escapedEmSt = /\\\*|\\_/g),
          (O._comment = d(S._comment)
            .replace('(?:--\x3e|$)', '--\x3e')
            .getRegex()),
          (O.emStrong.lDelim = d(O.emStrong.lDelim)
            .replace(/punct/g, O._punctuation)
            .getRegex()),
          (O.emStrong.rDelimAst = d(O.emStrong.rDelimAst, 'g')
            .replace(/punct/g, O._punctuation)
            .getRegex()),
          (O.emStrong.rDelimUnd = d(O.emStrong.rDelimUnd, 'g')
            .replace(/punct/g, O._punctuation)
            .getRegex()),
          (O._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
          (O._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
          (O._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
          (O.autolink = d(O.autolink)
            .replace('scheme', O._scheme)
            .replace('email', O._email)
            .getRegex()),
          (O._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
          (O.tag = d(O.tag)
            .replace('comment', O._comment)
            .replace('attribute', O._attribute)
            .getRegex()),
          (O._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
          (O._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
          (O._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
          (O.link = d(O.link)
            .replace('label', O._label)
            .replace('href', O._href)
            .replace('title', O._title)
            .getRegex()),
          (O.reflink = d(O.reflink)
            .replace('label', O._label)
            .replace('ref', S._label)
            .getRegex()),
          (O.nolink = d(O.nolink)
            .replace('ref', S._label)
            .getRegex()),
          (O.reflinkSearch = d(O.reflinkSearch, 'g')
            .replace('reflink', O.reflink)
            .replace('nolink', O.nolink)
            .getRegex()),
          (O.normal = w({}, O)),
          (O.pedantic = w({}, O.normal, {
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
            link: d(/^!?\[(label)\]\((.*?)\)/)
              .replace('label', O._label)
              .getRegex(),
            reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/)
              .replace('label', O._label)
              .getRegex(),
          })),
          (O.gfm = w({}, O.normal, {
            escape: d(O.escape)
              .replace('])', '~|])')
              .getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
          })),
          (O.gfm.url = d(O.gfm.url, 'i')
            .replace('email', O.gfm._extended_email)
            .getRegex()),
          (O.breaks = w({}, O.gfm, {
            br: d(O.br)
              .replace('{2,}', '*')
              .getRegex(),
            text: d(O.gfm.text)
              .replace('\\b_', '\\b_| {2,}\\n')
              .replace(/\{2,\}/g, '*')
              .getRegex(),
          }));
        var R = (function() {
            function n(t) {
              (this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = t || e.defaults),
                (this.options.tokenizer = this.options.tokenizer || new F()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options),
                (this.tokenizer.lexer = this),
                (this.inlineQueue = []),
                (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
              var n = { block: S.normal, inline: O.normal };
              this.options.pedantic
                ? ((n.block = S.pedantic), (n.inline = O.pedantic))
                : this.options.gfm &&
                  ((n.block = S.gfm),
                  this.options.breaks
                    ? (n.inline = O.breaks)
                    : (n.inline = O.gfm)),
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
              s = n.prototype;
            return (
              (s.lex = function(e) {
                var t;
                for (
                  e = e.replace(/\r\n|\r/g, '\n'),
                    this.blockTokens(e, this.tokens);
                  (t = this.inlineQueue.shift());

                )
                  this.inlineTokens(t.src, t.tokens);
                return this.tokens;
              }),
              (s.blockTokens = function(e, t) {
                var n,
                  r,
                  a,
                  i,
                  s = this;
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
                          !!(n = r.call({ lexer: s }, e, t)) &&
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
                          s.options.extensions.startBlock.forEach(function(e) {
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
                      var o = 'Infinite loop on byte: ' + e.charCodeAt(0);
                      if (this.options.silent) {
                        console.error(o);
                        break;
                      }
                      throw new Error(o);
                    }
                return (this.state.top = !0), t;
              }),
              (s.inline = function(e, t) {
                this.inlineQueue.push({ src: e, tokens: t });
              }),
              (s.inlineTokens = function(e, t) {
                var n,
                  r,
                  a,
                  i = this;
                void 0 === t && (t = []);
                var s,
                  o,
                  u,
                  l = e;
                if (this.tokens.links) {
                  var c = Object.keys(this.tokens.links);
                  if (c.length > 0)
                    for (
                      ;
                      null !=
                      (s = this.tokenizer.rules.inline.reflinkSearch.exec(l));

                    )
                      c.includes(s[0].slice(s[0].lastIndexOf('[') + 1, -1)) &&
                        (l =
                          l.slice(0, s.index) +
                          '[' +
                          N('a', s[0].length - 2) +
                          ']' +
                          l.slice(
                            this.tokenizer.rules.inline.reflinkSearch.lastIndex,
                          ));
                }
                for (
                  ;
                  null != (s = this.tokenizer.rules.inline.blockSkip.exec(l));

                )
                  l =
                    l.slice(0, s.index) +
                    '[' +
                    N('a', s[0].length - 2) +
                    ']' +
                    l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                for (
                  ;
                  null != (s = this.tokenizer.rules.inline.escapedEmSt.exec(l));

                )
                  l =
                    l.slice(0, s.index) +
                    '++' +
                    l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
                for (; e; )
                  if (
                    (o || (u = ''),
                    (o = !1),
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
                    else if ((n = this.tokenizer.emStrong(e, l, u)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.codespan(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.br(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.del(e)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if ((n = this.tokenizer.autolink(e, B)))
                      (e = e.substring(n.raw.length)), t.push(n);
                    else if (
                      this.state.inLink ||
                      !(n = this.tokenizer.url(e, B))
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
                        (n = this.tokenizer.inlineText(a, T)))
                      )
                        (e = e.substring(n.raw.length)),
                          '_' !== n.raw.slice(-1) && (u = n.raw.slice(-1)),
                          (o = !0),
                          (r = t[t.length - 1]) && 'text' === r.type
                            ? ((r.raw += n.raw), (r.text += n.text))
                            : t.push(n);
                      else if (e) {
                        var h = 'Infinite loop on byte: ' + e.charCodeAt(0);
                        if (this.options.silent) {
                          console.error(h);
                          break;
                        }
                        throw new Error(h);
                      }
                    } else (e = e.substring(n.raw.length)), t.push(n);
                return t;
              }),
              (r = n),
              (i = [
                {
                  key: 'rules',
                  get: function() {
                    return { block: S, inline: O };
                  },
                },
              ]),
              (a = null) && t(r.prototype, a),
              i && t(r, i),
              Object.defineProperty(r, 'prototype', { writable: !1 }),
              n
            );
          })(),
          I = (function() {
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
                      h(r, !0) +
                      '">' +
                      (n ? e : h(e, !0)) +
                      '</code></pre>\n'
                    : '<pre><code>' + (n ? e : h(e, !0)) + '</code></pre>\n'
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
                  (e = y(this.options.sanitize, this.options.baseUrl, e))
                )
                  return n;
                var r = '<a href="' + h(e) + '"';
                return (
                  t && (r += ' title="' + t + '"'), (r += '>' + n + '</a>')
                );
              }),
              (n.image = function(e, t, n) {
                if (
                  null ===
                  (e = y(this.options.sanitize, this.options.baseUrl, e))
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
          P = (function() {
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
          L = (function() {
            function t(t) {
              (this.options = t || e.defaults),
                (this.options.renderer = this.options.renderer || new I()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new P()),
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
                  s,
                  o,
                  u,
                  l,
                  c,
                  h,
                  m,
                  f,
                  d,
                  g,
                  b,
                  y,
                  x,
                  E,
                  v,
                  D = '',
                  A = e.length;
                for (n = 0; n < A; n++)
                  if (
                    ((h = e[n]),
                    !(
                      this.options.extensions &&
                      this.options.extensions.renderers &&
                      this.options.extensions.renderers[h.type]
                    ) ||
                      (!1 ===
                        (v = this.options.extensions.renderers[h.type].call(
                          { parser: this },
                          h,
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
                        ].includes(h.type)))
                  )
                    switch (h.type) {
                      case 'space':
                        continue;
                      case 'hr':
                        D += this.renderer.hr();
                        continue;
                      case 'heading':
                        D += this.renderer.heading(
                          this.parseInline(h.tokens),
                          h.depth,
                          p(this.parseInline(h.tokens, this.textRenderer)),
                          this.slugger,
                        );
                        continue;
                      case 'code':
                        D += this.renderer.code(h.text, h.lang, h.escaped);
                        continue;
                      case 'table':
                        for (
                          l = '', u = '', i = h.header.length, r = 0;
                          r < i;
                          r++
                        )
                          u += this.renderer.tablecell(
                            this.parseInline(h.header[r].tokens),
                            { header: !0, align: h.align[r] },
                          );
                        for (
                          l += this.renderer.tablerow(u),
                            c = '',
                            i = h.rows.length,
                            r = 0;
                          r < i;
                          r++
                        ) {
                          for (
                            u = '', s = (o = h.rows[r]).length, a = 0;
                            a < s;
                            a++
                          )
                            u += this.renderer.tablecell(
                              this.parseInline(o[a].tokens),
                              { header: !1, align: h.align[a] },
                            );
                          c += this.renderer.tablerow(u);
                        }
                        D += this.renderer.table(l, c);
                        continue;
                      case 'blockquote':
                        (c = this.parse(h.tokens)),
                          (D += this.renderer.blockquote(c));
                        continue;
                      case 'list':
                        for (
                          m = h.ordered,
                            f = h.start,
                            d = h.loose,
                            i = h.items.length,
                            c = '',
                            r = 0;
                          r < i;
                          r++
                        )
                          (y = (b = h.items[r]).checked),
                            (x = b.task),
                            (g = ''),
                            b.task &&
                              ((E = this.renderer.checkbox(y)),
                              d
                                ? b.tokens.length > 0 &&
                                  'paragraph' === b.tokens[0].type
                                  ? ((b.tokens[0].text =
                                      E + ' ' + b.tokens[0].text),
                                    b.tokens[0].tokens &&
                                      b.tokens[0].tokens.length > 0 &&
                                      'text' === b.tokens[0].tokens[0].type &&
                                      (b.tokens[0].tokens[0].text =
                                        E + ' ' + b.tokens[0].tokens[0].text))
                                  : b.tokens.unshift({ type: 'text', text: E })
                                : (g += E)),
                            (g += this.parse(b.tokens, d)),
                            (c += this.renderer.listitem(g, x, y));
                        D += this.renderer.list(c, m, f);
                        continue;
                      case 'html':
                        D += this.renderer.html(h.text);
                        continue;
                      case 'paragraph':
                        D += this.renderer.paragraph(
                          this.parseInline(h.tokens),
                        );
                        continue;
                      case 'text':
                        for (
                          c = h.tokens ? this.parseInline(h.tokens) : h.text;
                          n + 1 < A && 'text' === e[n + 1].type;

                        )
                          c +=
                            '\n' +
                            ((h = e[++n]).tokens
                              ? this.parseInline(h.tokens)
                              : h.text);
                        D += t ? this.renderer.paragraph(c) : c;
                        continue;
                      default:
                        var w =
                          'Token with "' + h.type + '" type was not found.';
                        if (this.options.silent) return void console.error(w);
                        throw new Error(w);
                    }
                  else D += v || '';
                return D;
              }),
              (n.parseInline = function(e, t) {
                t = t || this.renderer;
                var n,
                  r,
                  a,
                  i = '',
                  s = e.length;
                for (n = 0; n < s; n++)
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
                        var o =
                          'Token with "' + r.type + '" type was not found.';
                        if (this.options.silent) return void console.error(o);
                        throw new Error(o);
                    }
                  else i += a || '';
                return i;
              }),
              t
            );
          })();
        function z(e, t, n) {
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
            C((t = w({}, z.defaults, t || {}))),
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
                  t.walkTokens && z.walkTokens(r, t.walkTokens),
                    (i = L.parse(r, t));
                } catch (t) {
                  e = t;
                }
              return (t.highlight = a), e ? n(e) : n(null, i);
            };
            if (!a || a.length < 3) return i();
            if ((delete t.highlight, !r.length)) return i();
            var s = 0;
            return (
              z.walkTokens(r, function(e) {
                'code' === e.type &&
                  (s++,
                  setTimeout(function() {
                    a(e.text, e.lang, function(t, n) {
                      if (t) return i(t);
                      null != n &&
                        n !== e.text &&
                        ((e.text = n), (e.escaped = !0)),
                        0 == --s && i();
                    });
                  }, 0));
              }),
              void (0 === s && i())
            );
          }
          try {
            var o = R.lex(e, t);
            return t.walkTokens && z.walkTokens(o, t.walkTokens), L.parse(o, t);
          } catch (e) {
            if (
              ((e.message +=
                '\nPlease report this to https://github.com/markedjs/marked.'),
              t.silent)
            )
              return (
                '<p>An error occurred:</p><pre>' +
                h(e.message + '', !0) +
                '</pre>'
              );
            throw e;
          }
        }
        (z.options = z.setOptions = function(t) {
          var n;
          return w(z.defaults, t), (n = z.defaults), (e.defaults = n), z;
        }),
          (z.getDefaults = a),
          (z.defaults = e.defaults),
          (z.use = function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            var r,
              a = w.apply(void 0, [{}].concat(t)),
              i = z.defaults.extensions || { renderers: {}, childTokens: {} };
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
                    var t = z.defaults.renderer || new I(),
                      n = function(n) {
                        var r = t[n];
                        t[n] = function() {
                          for (
                            var a = arguments.length, i = new Array(a), s = 0;
                            s < a;
                            s++
                          )
                            i[s] = arguments[s];
                          var o = e.renderer[n].apply(t, i);
                          return !1 === o && (o = r.apply(t, i)), o;
                        };
                      };
                    for (var r in e.renderer) n(r);
                    a.renderer = t;
                  })(),
                e.tokenizer &&
                  (function() {
                    var t = z.defaults.tokenizer || new F(),
                      n = function(n) {
                        var r = t[n];
                        t[n] = function() {
                          for (
                            var a = arguments.length, i = new Array(a), s = 0;
                            s < a;
                            s++
                          )
                            i[s] = arguments[s];
                          var o = e.tokenizer[n].apply(t, i);
                          return !1 === o && (o = r.apply(t, i)), o;
                        };
                      };
                    for (var r in e.tokenizer) n(r);
                    a.tokenizer = t;
                  })(),
                e.walkTokens)
              ) {
                var t = z.defaults.walkTokens;
                a.walkTokens = function(n) {
                  e.walkTokens.call(this, n), t && t.call(this, n);
                };
              }
              r && (a.extensions = i), z.setOptions(a);
            });
          }),
          (z.walkTokens = function(e, t) {
            for (
              var n,
                a = function() {
                  var e = n.value;
                  switch ((t.call(z, e), e.type)) {
                    case 'table':
                      for (var a, i = r(e.header); !(a = i()).done; ) {
                        var s = a.value;
                        z.walkTokens(s.tokens, t);
                      }
                      for (var o, u = r(e.rows); !(o = u()).done; )
                        for (var l, c = r(o.value); !(l = c()).done; ) {
                          var h = l.value;
                          z.walkTokens(h.tokens, t);
                        }
                      break;
                    case 'list':
                      z.walkTokens(e.items, t);
                      break;
                    default:
                      z.defaults.extensions &&
                      z.defaults.extensions.childTokens &&
                      z.defaults.extensions.childTokens[e.type]
                        ? z.defaults.extensions.childTokens[e.type].forEach(
                            function(n) {
                              z.walkTokens(e[n], t);
                            },
                          )
                        : e.tokens && z.walkTokens(e.tokens, t);
                  }
                },
                i = r(e);
              !(n = i()).done;

            )
              a();
          }),
          (z.parseInline = function(e, t) {
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
            C((t = w({}, z.defaults, t || {})));
            try {
              var n = R.lexInline(e, t);
              return (
                t.walkTokens && z.walkTokens(n, t.walkTokens),
                L.parseInline(n, t)
              );
            } catch (e) {
              if (
                ((e.message +=
                  '\nPlease report this to https://github.com/markedjs/marked.'),
                t.silent)
              )
                return (
                  '<p>An error occurred:</p><pre>' +
                  h(e.message + '', !0) +
                  '</pre>'
                );
              throw e;
            }
          }),
          (z.Parser = L),
          (z.parser = L.parse),
          (z.Renderer = I),
          (z.TextRenderer = P),
          (z.Lexer = R),
          (z.lexer = R.lex),
          (z.Tokenizer = F),
          (z.Slugger = M),
          (z.parse = z);
        var U = z.options,
          $ = z.setOptions,
          H = z.use,
          q = z.walkTokens,
          Y = z.parseInline,
          V = z,
          W = L.parse,
          G = R.lex;
        (e.Lexer = R),
          (e.Parser = L),
          (e.Renderer = I),
          (e.Slugger = M),
          (e.TextRenderer = P),
          (e.Tokenizer = F),
          (e.getDefaults = a),
          (e.lexer = G),
          (e.marked = z),
          (e.options = U),
          (e.parse = V),
          (e.parseInline = Y),
          (e.parser = W),
          (e.setOptions = $),
          (e.use = H),
          (e.walkTokens = q),
          Object.defineProperty(e, '__esModule', { value: !0 });
      })(t);
    },
    55: function(e, t) {
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
          s = {
            begin: '\\[',
            end: '\\]',
            contains: [e.inherit(a)],
            illegal: '\\S',
          };
        return (
          r.push(i, s),
          n.forEach(function(e) {
            r.push(e);
          }),
          { name: 'JSON', contains: r, keywords: t, illegal: '\\S' }
        );
      };
    },
    56: function(e, t) {
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
          s = {
            end: ',',
            endsWithParent: !0,
            excludeEnd: !0,
            keywords: t,
            relevance: 0,
          },
          o = {
            begin: /\{/,
            end: /\}/,
            contains: [s],
            illegal: '\\n',
            relevance: 0,
          },
          u = {
            begin: '\\[',
            end: '\\]',
            contains: [s],
            illegal: '\\n',
            relevance: 0,
          },
          l = [
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
            o,
            u,
            r,
          ],
          c = [...l];
        return (
          c.pop(),
          c.push(a),
          (s.contains = c),
          { name: 'YAML', case_insensitive: !0, aliases: ['yml'], contains: l }
        );
      };
    },
    57: function(e, t) {
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
          s = {
            className: 'string',
            begin: /"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, t, a],
          };
        a.contains.push(s);
        const o = {
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
          l = {
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
            l,
            o,
            e.HASH_COMMENT_MODE,
            i,
            s,
            { className: '', begin: /\\"/ },
            { className: 'string', begin: /'/, end: /'/ },
            t,
          ],
        };
      };
    },
    58: function(e, t, n) {
      'use strict';
      var r = n(82);
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
          for (var s = 0; s < r.length - 1; ++s) {
            var o = r[s];
            'string' != typeof o && 'number' != typeof o && (o = String(o)),
              '__proto__' !== o &&
                'constructor' !== o &&
                'prototype' !== o &&
                ('-' === o && Array.isArray(e) && (o = e.length),
                (i = r[s + 1]),
                o in e || (i.match(/^(\d+|-)$/) ? (e[o] = []) : (e[o] = {})),
                (e = e[o]));
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
            var s = +r;
            if ('' === r && isNaN(s))
              throw new Error('Invalid array index: "' + r + '"');
            Array.prototype.splice.call(i, s, 1);
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
            (function e(s) {
              r(s, function(r, s) {
                i.push(String(s)), n(r) ? e(r) : t(r, a.compile(i)), i.pop();
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
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    67: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(68),
        s = n(69),
        o = n(6),
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
            return this._json.contact ? new s(this._json.contact) : null;
          }
        },
        o,
        u,
      );
    },
    68: function(e, t, n) {
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
    69: function(e, t, n) {
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
    7: function(e, t, n) {
      'use strict';
      function r(e) {
        return void 0 !== e.url;
      }
      var a;
      n.d(t, 'c', function() {
        return r;
      }),
        n.d(t, 'b', function() {
          return a;
        }),
        (function(e) {
          (e.PUBLISH = 'publish'), (e.SUBSCRIBE = 'subscribe');
        })(a || (a = {}));
    },
    70: function(e, t, n) {
      const r = n(3);
      e.exports = class extends r {};
    },
    71: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        s = n(4);
      e.exports = r(
        class extends a {
          url() {
            return this._json.url;
          }
        },
        i,
        s,
      );
    },
    72: function(e, t, n) {
      const r = n(29);
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
    73: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        i = n(6),
        s = n(17),
        o = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
        },
        i,
        s,
        o,
      );
    },
    74: function(e, t, n) {
      'use strict';
      (t.byteLength = function(e) {
        var t = l(e),
          n = t[0],
          r = t[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (t.toByteArray = function(e) {
          var t,
            n,
            r = l(e),
            s = r[0],
            o = r[1],
            u = new i(
              (function(e, t, n) {
                return (3 * (t + n)) / 4 - n;
              })(0, s, o),
            ),
            c = 0,
            h = o > 0 ? s - 4 : s;
          for (n = 0; n < h; n += 4)
            (t =
              (a[e.charCodeAt(n)] << 18) |
              (a[e.charCodeAt(n + 1)] << 12) |
              (a[e.charCodeAt(n + 2)] << 6) |
              a[e.charCodeAt(n + 3)]),
              (u[c++] = (t >> 16) & 255),
              (u[c++] = (t >> 8) & 255),
              (u[c++] = 255 & t);
          2 === o &&
            ((t = (a[e.charCodeAt(n)] << 2) | (a[e.charCodeAt(n + 1)] >> 4)),
            (u[c++] = 255 & t));
          1 === o &&
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
            var t, n = e.length, a = n % 3, i = [], s = 0, o = n - a;
            s < o;
            s += 16383
          )
            i.push(c(e, s, s + 16383 > o ? o : s + 16383));
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
          s =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          o = 0,
          u = s.length;
        o < u;
        ++o
      )
        (r[o] = s[o]), (a[s.charCodeAt(o)] = o);
      function l(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4');
        var n = e.indexOf('=');
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function c(e, t, n) {
        for (var a, i, s = [], o = t; o < n; o += 3)
          (a =
            ((e[o] << 16) & 16711680) +
            ((e[o + 1] << 8) & 65280) +
            (255 & e[o + 2])),
            s.push(
              r[((i = a) >> 18) & 63] +
                r[(i >> 12) & 63] +
                r[(i >> 6) & 63] +
                r[63 & i],
            );
        return s.join('');
      }
      (a['-'.charCodeAt(0)] = 62), (a['_'.charCodeAt(0)] = 63);
    },
    75: function(e, t) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      (t.read = function(e, t, n, r, a) {
        var i,
          s,
          o = 8 * a - r - 1,
          u = (1 << o) - 1,
          l = u >> 1,
          c = -7,
          h = n ? a - 1 : 0,
          m = n ? -1 : 1,
          p = e[t + h];
        for (
          h += m, i = p & ((1 << -c) - 1), p >>= -c, c += o;
          c > 0;
          i = 256 * i + e[t + h], h += m, c -= 8
        );
        for (
          s = i & ((1 << -c) - 1), i >>= -c, c += r;
          c > 0;
          s = 256 * s + e[t + h], h += m, c -= 8
        );
        if (0 === i) i = 1 - l;
        else {
          if (i === u) return s ? NaN : (1 / 0) * (p ? -1 : 1);
          (s += Math.pow(2, r)), (i -= l);
        }
        return (p ? -1 : 1) * s * Math.pow(2, i - r);
      }),
        (t.write = function(e, t, n, r, a, i) {
          var s,
            o,
            u,
            l = 8 * i - a - 1,
            c = (1 << l) - 1,
            h = c >> 1,
            m = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : i - 1,
            f = r ? 1 : -1,
            d = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((o = isNaN(t) ? 1 : 0), (s = c))
                : ((s = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
                  (t += s + h >= 1 ? m / u : m * Math.pow(2, 1 - h)) * u >= 2 &&
                    (s++, (u /= 2)),
                  s + h >= c
                    ? ((o = 0), (s = c))
                    : s + h >= 1
                    ? ((o = (t * u - 1) * Math.pow(2, a)), (s += h))
                    : ((o = t * Math.pow(2, h - 1) * Math.pow(2, a)), (s = 0)));
            a >= 8;
            e[n + p] = 255 & o, p += f, o /= 256, a -= 8
          );
          for (
            s = (s << a) | o, l += a;
            l > 0;
            e[n + p] = 255 & s, p += f, s /= 256, l -= 8
          );
          e[n + p - f] |= 128 * d;
        });
    },
    76: function(e, t, n) {
      const r = n(3);
      e.exports = class extends r {};
    },
    77: function(e, t, n) {
      const r = n(29);
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
    78: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: i } = n(2),
        s = n(3),
        o = n(37),
        u = n(40),
        l = n(10),
        c = n(79),
        h = n(35),
        m = n(38),
        p = n(43),
        f = n(44),
        d = n(41),
        g = n(36),
        b = n(4);
      e.exports = i(
        class extends s {
          channels() {
            return r(this._json.channels, o);
          }
          hasChannels() {
            return !!this._json.channels;
          }
          channel(e) {
            return a(this._json.channels, e, o);
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
            return r(this._json.schemas, l);
          }
          hasSchemas() {
            return !!this._json.schemas;
          }
          schema(e) {
            return a(this._json.schemas, e, l);
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
            return r(this._json.servers, h);
          }
          hasServers() {
            return !!this._json.servers;
          }
          server(e) {
            return a(this._json.servers, e, h);
          }
          parameters() {
            return r(this._json.parameters, m);
          }
          hasParameters() {
            return !!this._json.parameters;
          }
          parameter(e) {
            return a(this._json.parameters, e, m);
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
            return r(this._json.operationTraits, f);
          }
          hasOperationTraits() {
            return !!this._json.operationTraits;
          }
          operationTrait(e) {
            return a(this._json.operationTraits, e, f);
          }
          messageTraits() {
            return r(this._json.messageTraits, d);
          }
          hasMessageTraits() {
            return !!this._json.messageTraits;
          }
          messageTrait(e) {
            return a(this._json.messageTraits, e, d);
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
        b,
      );
    },
    79: function(e, t, n) {
      const { createMapOfType: r, mix: a } = n(2),
        i = n(3),
        s = n(80),
        o = n(6),
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
            return r(this._json.flows, s);
          }
        },
        o,
        u,
      );
    },
    80: function(e, t, n) {
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
    81: function(e, t, n) {
      const { xParserMessageName: r, xParserSchemaId: a } = n(24),
        { traverseAsyncApiDocument: i } = n(45);
      function s(e) {
        for (const [t, n] of Object.entries(e))
          n.schema() && (n.schema().json()[String(a)] = t);
      }
      function o(e, t) {
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
            s(e.channel(t).parameters());
          });
        },
        assignUidToComponentSchemas: function(e) {
          if (e.hasComponents())
            for (const [t, n] of Object.entries(e.components().schemas()))
              n.json()[String(a)] = t;
        },
        assignUidToComponentParameterSchemas: function(e) {
          e.hasComponents() && s(e.components().parameters());
        },
        assignNameToAnonymousMessages: function(e) {
          let t = 0;
          e.hasChannels() &&
            e.channelNames().forEach(n => {
              const r = e.channel(n);
              r.hasPublish() && o(r.publish().messages(), ++t),
                r.hasSubscribe() && o(r.subscribe().messages(), ++t);
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
    82: function(e, t) {
      var n = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString;
      e.exports = function(e, t, a) {
        if ('[object Function]' !== r.call(t))
          throw new TypeError('iterator must be a function');
        var i = e.length;
        if (i === +i) for (var s = 0; s < i; s++) t.call(a, e[s], s, e);
        else for (var o in e) n.call(e, o) && t.call(a, e[o], o, e);
      };
    },
  }).default;
});
