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
      n((n.s = 257))
    );
  })({
    0: function(t, n) {
      t.exports = e;
    },
    1: function(e, t, n) {
      'use strict';
      n.d(t, 'b', function() {
        return a;
      }),
        n.d(t, 'a', function() {
          return s;
        }),
        n.d(t, 'j', function() {
          return i;
        }),
        n.d(t, 'h', function() {
          return o;
        }),
        n.d(t, 'i', function() {
          return u;
        }),
        n.d(t, 'd', function() {
          return l;
        }),
        n.d(t, 'g', function() {
          return c;
        }),
        n.d(t, 'f', function() {
          return h;
        }),
        n.d(t, 'e', function() {
          return p;
        }),
        n.d(t, 'c', function() {
          return m;
        });
      var r,
        a = 'asyncapi',
        s = 'https://www.iana.org/assignments/media-types',
        i = 'https://github.com/asyncapi/parser-js/validation-errors',
        o = 'Terms of service',
        u = 'Support',
        l = 'External Docs',
        c = 'Servers',
        h = 'Operations',
        p = 'Messages',
        m = 'Error';
      !(function(e) {
        (e.INFO = 'info'),
          (e.CHANNELS = 'channels'),
          (e.SERVERS = 'servers'),
          (e.MESSAGES = 'messages'),
          (e.SCHEMAS = 'schemas');
      })(r || (r = {}));
      var f;
      Object.values(r);
      !(function(e) {
        (e.CHANNEL = 'channel'),
          (e.SERVER = 'server'),
          (e.MESSAGE = 'message'),
          (e.SCHEMA = 'schema');
      })(f || (f = {}));
      Object.values(f);
    },
    10: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: s } = n(2),
        i = n(3),
        o = n(5),
        u = n(16),
        l = n(4);
      class c extends i {
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
          return this._json.allOf ? this._json.allOf.map(e => new c(e)) : null;
        }
        oneOf() {
          return this._json.oneOf ? this._json.oneOf.map(e => new c(e)) : null;
        }
        anyOf() {
          return this._json.anyOf ? this._json.anyOf.map(e => new c(e)) : null;
        }
        not() {
          return this._json.not ? new c(this._json.not) : null;
        }
        items() {
          return this._json.items
            ? Array.isArray(this._json.items)
              ? this._json.items.map(e => new c(e))
              : new c(this._json.items)
            : null;
        }
        properties() {
          return r(this._json.properties, c);
        }
        property(e) {
          return a(this._json.properties, e, c);
        }
        additionalProperties() {
          const e = this._json.additionalProperties;
          if (null != e) return 'boolean' == typeof e ? e : new c(e);
        }
        additionalItems() {
          const e = this._json.additionalItems;
          if (null != e) return new c(e);
        }
        patternProperties() {
          return r(this._json.patternProperties, c);
        }
        const() {
          return this._json.const;
        }
        contains() {
          return this._json.contains ? new c(this._json.contains) : null;
        }
        dependencies() {
          if (!this._json.dependencies) return null;
          const e = {};
          return (
            Object.entries(this._json.dependencies).forEach(([t, n]) => {
              e[String(t)] = Array.isArray(n) ? n : new c(n);
            }),
            e
          );
        }
        propertyNames() {
          return this._json.propertyNames
            ? new c(this._json.propertyNames)
            : null;
        }
        if() {
          return this._json.if ? new c(this._json.if) : null;
        }
        then() {
          return this._json.then ? new c(this._json.then) : null;
        }
        else() {
          return this._json.else ? new c(this._json.else) : null;
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
          return r(this._json.definitions, c);
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
        isCircular() {
          return !!this.ext('x-parser-circular');
        }
        hasCircularProps() {
          return !!this.ext('x-parser-circular-props');
        }
        circularProps() {
          return this.ext('x-parser-circular-props');
        }
      }
      e.exports = s(c, o, u, l);
    },
    11: function(e, t) {
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
    117: function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return s;
      });
      var r = n(31),
        a = n.n(r),
        s = (function() {
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
                  ? new a.a(e)
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
    16: function(e, t, n) {
      const { getMapValueOfType: r } = n(2),
        a = n(65),
        s = {
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
      e.exports = s;
    },
    2: function(e, t) {
      const n = e.exports,
        r = (e, t, n) => {
          if ('string' != typeof t || !e) return null;
          const r = e[String(t)];
          return void 0 === r ? null : n ? new n(r) : r;
        };
      (n.createMapOfType = (e, t) => {
        const n = {};
        return e
          ? (Object.entries(e).forEach(([e, r]) => {
              n[String(e)] = new t(r);
            }),
            n)
          : n;
      }),
        (n.getMapValueOfType = (e, t, n) => r(e, t, n)),
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
    20: function(e, t, n) {
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
    21: function(e, t) {
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
    22: function(e, t, n) {
      const r = n(67),
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
    25: function(e, t, n) {
      'use strict';
      var r = n(0),
        a = n.n(r),
        s = n(117),
        i = {
          schemaID: '',
          show: {
            sidebar: !1,
            info: !0,
            servers: !0,
            operations: !0,
            messages: !0,
            errors: !0,
          },
          sidebar: { showOperations: 'byOperationsTags' },
        };
      var o = function(e) {
          void 0 === e && (e = {});
          var t = e.onResize,
            n = Object(r.useRef)(void 0);
          n.current = t;
          var a = Object(r.useRef)(),
            s = Object(r.useState)({ width: void 0, height: void 0 }),
            i = s[0],
            o = s[1],
            u = Object(r.useRef)(!1);
          Object(r.useEffect)(function() {
            return function() {
              u.current = !0;
            };
          }, []);
          var l = Object(r.useRef)({ width: void 0, height: void 0 }),
            c = (function(e, t) {
              var n,
                a = null,
                s = Object(r.useRef)(null),
                i = Object(r.useRef)(null),
                o = Object(r.useCallback)(function(e) {
                  (i.current = e), c();
                }, []),
                u = Object(r.useRef)(null),
                l = Object(r.useRef)(),
                c = function() {
                  var n = null;
                  i.current
                    ? (n = i.current)
                    : s.current
                    ? (n = s.current)
                    : t instanceof HTMLElement && (n = t),
                    u.current !== n &&
                      (l.current && (l.current(), (l.current = null)),
                      (u.current = n),
                      n && (l.current = e(n)));
                };
              return (
                !t || t instanceof HTMLElement || (a = t),
                Object(r.useEffect)(
                  function() {
                    a && (s.current = a.current), c();
                  },
                  [a, null == (n = a) ? void 0 : n.current, t],
                ),
                o
              );
            })(function(e) {
              return (
                a.current ||
                  (a.current = new ResizeObserver(function(e) {
                    if (Array.isArray(e) && e.length) {
                      var t = e[0],
                        r = Math.round(t.contentRect.width),
                        a = Math.round(t.contentRect.height);
                      if (l.current.width !== r || l.current.height !== a) {
                        var s = { width: r, height: a };
                        n.current
                          ? n.current(s)
                          : ((l.current.width = r),
                            (l.current.height = a),
                            u.current || o(s));
                      }
                    }
                  })),
                a.current.observe(e),
                function() {
                  a.current && a.current.unobserve(e);
                }
              );
            }, e.ref);
          return Object(r.useMemo)(
            function() {
              return { ref: c, width: i.width, height: i.height };
            },
            [c, i ? i.width : null, i ? i.height : null],
          );
        },
        u = function() {
          return (u =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        l = function(e, t) {
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
        c = function(e) {
          var t = e.chevronProps,
            n = e.children,
            r = l(e, ['chevronProps', 'children']);
          return a.a.createElement(
            'button',
            u({}, r, { className: 'focus:outline-none ' + r.className }),
            n,
            a.a.createElement(
              'svg',
              u(
                {
                  version: '1.1',
                  viewBox: '0 0 24 24',
                  x: '0',
                  xmlns: 'http://www.w3.org/2000/svg',
                  y: '0',
                },
                t,
                {
                  className:
                    'inline-block align-baseline cursor-pointer -mb-1 w-5 transform transition-transform duration-150 ease-linear ' +
                    ((null == t ? void 0 : t.className) || ''),
                },
              ),
              a.a.createElement('polygon', {
                points: '17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 ',
              }),
            ),
          );
        },
        h = a.a.createContext({ asyncapi: null });
      function p() {
        return Object(r.useContext)(h).asyncapi;
      }
      var m = a.a.createContext({
          setShowSidebar: function(e) {
            return e;
          },
        }),
        f = function(e) {
          var t = e.config,
            n = Object(r.useState)(!1),
            s = n[0],
            i = n[1],
            o = (null == t ? void 0 : t.showOperations) || 'byDefault',
            u = p(),
            l = u.info(),
            c = l.ext('x-logo'),
            h = u.allMessages(),
            f = d;
          return (
            'bySpecTags' === o ? (f = g) : 'byOperationsTags' === o && (f = y),
            a.a.createElement(
              m.Provider,
              { value: { setShowSidebar: i } },
              a.a.createElement(
                'div',
                {
                  className:
                    'burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500',
                  onClick: function() {
                    return i(function(e) {
                      return !e;
                    });
                  },
                  'data-lol': s,
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
                  className:
                    (s ? 'block fixed w-full' : 'hidden') +
                    ' sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20',
                },
                a.a.createElement(
                  'div',
                  {
                    className:
                      (s ? 'w-full' : '') +
                      ' block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200',
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
                            alt:
                              l.title() + ' logo, ' + l.version() + ' version',
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
                              return i(!1);
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
                                return i(!1);
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
                                  return i(!1);
                                },
                              },
                              'Operations',
                            ),
                            a.a.createElement(f, null),
                          ),
                          h.size > 0 &&
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
                                    return i(!1);
                                  },
                                },
                                'Messages',
                              ),
                              a.a.createElement(
                                'ul',
                                { className: 'text-sm mt-2' },
                                Array.from(h.keys()).map(function(e) {
                                  return a.a.createElement(
                                    'li',
                                    { key: e },
                                    a.a.createElement(
                                      'a',
                                      {
                                        className:
                                          'flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900',
                                        href: '#message-' + e,
                                        onClick: function() {
                                          return i(!1);
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
                            ),
                        ),
                    ),
                  ),
                ),
              ),
            )
          );
        },
        d = function() {
          var e = p().channels(),
            t = [];
          return (
            Object.entries(e).forEach(function(e) {
              var n = e[0],
                r = e[1];
              r.hasPublish() &&
                t.push(
                  a.a.createElement(b, { channelName: n, key: 'pub-' + n }),
                ),
                r.hasSubscribe() &&
                  t.push(
                    a.a.createElement(x, { channelName: n, key: 'sub-' + n }),
                  );
            }),
            a.a.createElement('ul', { className: 'text-sm mt-2' }, t)
          );
        },
        g = function() {
          var e = p(),
            t = e.channels(),
            n = e.tags(),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    i = t[1];
                  i.hasPublish() &&
                    s.a.containTags(i.publish(), e) &&
                    n.push(
                      a.a.createElement(b, { channelName: r, key: 'pub-' + r }),
                    ),
                    i.hasSubscribe() &&
                      s.a.containTags(i.subscribe(), e) &&
                      n.push(
                        a.a.createElement(x, {
                          channelName: r,
                          key: 'sub-' + r,
                        }),
                      );
                }),
                n
              );
            },
            i = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && s.a.containTags(r.publish(), n)) ||
                i.push(
                  a.a.createElement(b, { channelName: t, key: 'pub-' + t }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    s.a.containTags(r.subscribe(), n)) ||
                  i.push(
                    a.a.createElement(x, { channelName: t, key: 'sub-' + t }),
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
                        a.a.createElement(D, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                i.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(D, { tagName: 'Untagged' }, i),
                  ),
              ),
            )
          );
        },
        y = function() {
          var e = p(),
            t = e.channels(),
            n = s.a.operationsTags(e),
            r = function(e) {
              var n = [];
              return (
                Object.entries(t).forEach(function(t) {
                  var r = t[0],
                    i = t[1];
                  i.hasPublish() &&
                    s.a.containTags(i.publish(), e) &&
                    n.push(
                      a.a.createElement(b, { channelName: r, key: 'pub-' + r }),
                    ),
                    i.hasSubscribe() &&
                      s.a.containTags(i.subscribe(), e) &&
                      n.push(
                        a.a.createElement(x, {
                          channelName: r,
                          key: 'sub-' + r,
                        }),
                      );
                }),
                n
              );
            },
            i = [];
          return (
            Object.entries(t).forEach(function(e) {
              var t = e[0],
                r = e[1];
              !r.hasPublish() ||
                (r.publish().hasTags() && s.a.containTags(r.publish(), n)) ||
                i.push(
                  a.a.createElement(b, { channelName: t, key: 'pub-' + t }),
                ),
                !r.hasSubscribe() ||
                  (r.subscribe().hasTags() &&
                    s.a.containTags(r.subscribe(), n)) ||
                  i.push(
                    a.a.createElement(x, { channelName: t, key: 'sub-' + t }),
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
                        a.a.createElement(D, { tagName: e.name() }, r(e)),
                      )
                    );
                  }),
                i.length > 0 &&
                  a.a.createElement(
                    'li',
                    null,
                    a.a.createElement(D, { tagName: 'Untagged' }, i),
                  ),
              ),
            )
          );
        },
        D = function(e) {
          var t = e.tagName,
            n = e.children,
            s = Object(r.useState)(!1),
            i = s[0],
            o = s[1];
          return a.a.createElement(
            'div',
            null,
            a.a.createElement(
              c,
              {
                onClick: function() {
                  return o(function(e) {
                    return !e;
                  });
                },
                chevronProps: { className: i ? '-rotate-180' : '-rotate-90' },
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
                className:
                  (i ? 'block' : 'hidden') + ' text-sm mt-2 font-light',
              },
              n,
            ),
          );
        },
        b = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(m).setShowSidebar;
          return a.a.createElement(
            'li',
            null,
            a.a.createElement(
              'a',
              {
                className:
                  'flex no-underline text-gray-700 mb-2 hover:text-gray-900',
                href: '#operation-publish-' + t,
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
        x = function(e) {
          var t = e.channelName,
            n = Object(r.useContext)(m).setShowSidebar;
          return a.a.createElement(
            'li',
            null,
            a.a.createElement(
              'a',
              {
                className:
                  'flex no-underline text-gray-700 mb-2 hover:text-gray-900',
                href: '#operation-subscribe-' + t,
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
        v = function(e) {
          var t = e.href,
            n = e.title,
            r = e.className,
            s = e.children;
          return a.a.createElement(
            'a',
            {
              href: t,
              title: n,
              className: r,
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
            s,
          );
        },
        E = n(47),
        A = n(48),
        w = n.n(A),
        C = function(e) {
          var t = e.children;
          if (!t) return null;
          if ('string' != typeof t)
            return a.a.createElement(a.a.Fragment, null, t);
          var n = w()(t);
          return a.a.createElement('div', {
            className: 'prose max-w-max text-sm',
            dangerouslySetInnerHTML: { __html: Object(E.sanitize)(n) },
          });
        },
        k = function(e) {
          var t = e.tag,
            n = '#' + t.name(),
            r = t.description() || '',
            s = t.externalDocs(),
            i = a.a.createElement(
              'div',
              {
                title: r,
                className:
                  'border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1',
              },
              a.a.createElement('span', { className: s ? 'underline' : '' }, n),
            );
          return s ? a.a.createElement(v, { href: s.url(), title: r }, i) : i;
        },
        _ = function(e) {
          var t = e.tags;
          return t && t.length
            ? a.a.createElement(
                'ul',
                { className: 'flex flex-wrap leading-normal' },
                t.map(function(e) {
                  return a.a.createElement(
                    'li',
                    { className: 'inline-block mt-2 mr-2', key: e.name() },
                    a.a.createElement(k, { tag: e }),
                  );
                }),
              )
            : null;
        },
        F = n(1),
        j = function() {
          var e = p(),
            t = e.info();
          if (!t) return null;
          var n = e.externalDocs(),
            r = t.license(),
            s = t.termsOfService(),
            i = e.defaultContentType(),
            o = t.contact(),
            u = r || s || i || o || n;
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
              u &&
                a.a.createElement(
                  'ul',
                  { className: 'flex flex-wrap mt-2 leading-normal' },
                  r &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      r.url()
                        ? a.a.createElement(
                            v,
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: r.url(),
                            },
                            a.a.createElement('span', null, r.name()),
                          )
                        : a.a.createElement(
                            'span',
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            },
                            r.name(),
                          ),
                    ),
                  s &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        v,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: s,
                        },
                        a.a.createElement('span', null, F.h),
                      ),
                    ),
                  i &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        v,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: F.a + '/' + i,
                        },
                        a.a.createElement('span', null, i),
                      ),
                    ),
                  n &&
                    a.a.createElement(
                      'li',
                      { className: 'inline-block mt-2 mr-2' },
                      a.a.createElement(
                        v,
                        {
                          className:
                            'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                          href: n.url(),
                        },
                        a.a.createElement('span', null, F.d),
                      ),
                    ),
                  o &&
                    a.a.createElement(
                      a.a.Fragment,
                      null,
                      o.url() &&
                        a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2' },
                          a.a.createElement(
                            v,
                            {
                              className:
                                'border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: o.url(),
                            },
                            a.a.createElement('span', null, o.name() || F.i),
                          ),
                        ),
                      o.email() &&
                        a.a.createElement(
                          'li',
                          { className: 'inline-block mt-2 mr-2' },
                          a.a.createElement(
                            v,
                            {
                              className:
                                'border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                              href: 'mailto:' + o.email(),
                            },
                            a.a.createElement('span', null, o.email()),
                          ),
                        ),
                    ),
                ),
              t.hasDescription() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-4' },
                  a.a.createElement(C, null, t.description()),
                ),
              e.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-4' },
                  a.a.createElement(_, { tags: e.tags() }),
                ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        S = (function() {
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
            e
          );
        })(),
        N = function(e) {
          var t = e.serverRequirements,
            n = void 0 === t ? [] : t,
            r = p(),
            s = r.hasComponents() && r.components().securitySchemes();
          if (!n.length || !s || !Object.keys(s).length) return null;
          var i = n
            .map(function(e) {
              var t = s[Object.keys(e.json())[0]];
              return t
                ? a.a.createElement(O, { securitySchema: t, key: t.type() })
                : null;
            })
            .filter(Boolean);
          return i.length
            ? a.a.createElement(
                'div',
                { className: 'text-sm mt-4' },
                a.a.createElement(
                  'h5',
                  { className: 'text-gray-700 text-base' },
                  'Security:',
                ),
                a.a.createElement(
                  'ul',
                  null,
                  i.map(function(e, t) {
                    return a.a.createElement(
                      'li',
                      { className: 'mt-2', key: t },
                      e,
                    );
                  }),
                ),
              )
            : null;
        },
        O = function(e) {
          var t = e.securitySchema,
            n = [];
          t.name() &&
            n.push(a.a.createElement('span', null, 'Name: ', t.name())),
            t.in() && n.push(a.a.createElement('span', null, 'In: ', t.in())),
            t.scheme() &&
              n.push(a.a.createElement('span', null, 'Scheme: ', t.scheme())),
            t.bearerFormat() &&
              n.push(
                a.a.createElement(
                  'span',
                  null,
                  'Bearer format: ',
                  t.bearerFormat(),
                ),
              ),
            t.openIdConnectUrl() &&
              n.push(
                a.a.createElement(
                  v,
                  { href: t.openIdConnectUrl(), className: 'underline' },
                  'Connect URL',
                ),
              );
          var r = t.flows(),
            s =
              r &&
              Object.entries(r).map(function(e) {
                var t = e[0],
                  n = e[1],
                  r = n.authorizationUrl(),
                  s = n.tokenUrl(),
                  i = n.refreshUrl(),
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
                      S.flowName(t),
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
                        v,
                        { href: r, className: 'underline' },
                        r,
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
                        'Token URL:',
                      ),
                      a.a.createElement(
                        v,
                        { href: s, className: 'underline' },
                        s,
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
                        'Refresh URL:',
                      ),
                      a.a.createElement(
                        v,
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
            { className: 'ai-security__security__security-schema' },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'span',
                null,
                S.securityType(t.type()),
                n.length > 0 &&
                  a.a.createElement(
                    'ul',
                    { className: 'inline-block ml-2' },
                    n.map(function(e, t) {
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
            t.hasDescription() &&
              a.a.createElement(
                'div',
                null,
                a.a.createElement(C, null, t.description()),
              ),
            s &&
              s.length > 0 &&
              a.a.createElement(
                'ul',
                { className: 'my-2' },
                a.a.createElement('li', null, s),
              ),
          );
        },
        T = n(10),
        B = n.n(T),
        R = (function() {
          function e() {}
          return (
            (e.toSchemaType = function(e) {
              var t = this;
              if (!0 === e) return 'Any';
              if (!1 === e) return 'Never';
              var n = e.type();
              if (Array.isArray(n))
                return n
                  .map(function(n) {
                    return t.toType(n, e);
                  })
                  .join(' | ');
              n = this.toType(n, e);
              var r = this.toCombinedType(e);
              return n && r ? n + ' ' + r : r || n;
            }),
            (e.prettifyValue = function(e) {
              var t = typeof e;
              return 'string' === t
                ? '"' + e + '"'
                : 'number' === t || 'bigint' === t || 'boolean' === t
                ? e
                : Array.isArray(e)
                ? '[' + e.toString() + ']'
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
              var s = e.uniqueItems(),
                i = this.humanizeRangeConstraint(
                  s ? 'unique items' : 'items',
                  e.minItems(),
                  e.maxItems(),
                );
              void 0 !== i && t.push(i);
              var o = this.humanizeRangeConstraint(
                'properties',
                e.minProperties(),
                e.maxProperties(),
              );
              return void 0 !== o && t.push(o), t;
            }),
            (e.isExpandable = function(e) {
              var t = e.type();
              if (
                (t = Array.isArray(t) ? t : [t]).includes('object') ||
                t.includes('array')
              )
                return !0;
              if (
                e.oneOf() ||
                e.anyOf() ||
                e.allOf() ||
                e.not() ||
                Object.keys(e.properties()).length ||
                e.additionalProperties() ||
                e.items() ||
                e.additionalItems() ||
                e.if()
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
                        (e[n] = Object.assign({}, r.json())),
                        (e[n].type = 'string'),
                        e
                      );
                    }, {}),
                    required: Object.keys(e),
                  })[this.extRenderType] = !1),
                  (t[this.extRenderAdditionalInfo] = !1),
                  t);
                return new B.a(n);
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
                        a = t[1];
                      return (
                        (e[r] = Object.assign({}, a.schema().json())),
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
                return new B.a(r);
              }
            }),
            (e.jsonToSchema = function(e) {
              var t = this.jsonFieldToSchema(e);
              return new B.a(t);
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
            (e.toType = function(e, t) {
              var n = this;
              if ('array' === e) {
                var r = t.items(),
                  a = 'Unknown';
                return (
                  Array.isArray(r)
                    ? (a = r
                        .map(function(e) {
                          return n.toSchemaType(e);
                        })
                        .join(', '))
                    : r && (a = this.toSchemaType(r)),
                  'Array<' + a + '>'
                );
              }
              return e;
            }),
            (e.toCombinedType = function(e) {
              return e.oneOf()
                ? 'OneOf'
                : e.anyOf()
                ? 'AnyOf'
                : e.allOf()
                ? 'AllOf'
                : void 0;
            }),
            (e.humanizeNumberRangeConstraint = function(e, t, n, r) {
              var a,
                s = void 0 !== t,
                i = void 0 !== e || s,
                o = void 0 !== r,
                u = void 0 !== n || o;
              return (
                i && u
                  ? ((a = s ? '( ' : '[ '),
                    (a += s ? t : e),
                    (a += ' .. '),
                    (a += o ? r : n),
                    (a += o ? ' )' : ' ]'))
                  : i
                  ? ((a = s ? '> ' : '>= '), (a += e))
                  : u && ((a = o ? '< ' : '<= '), (a += n)),
                a
              );
            }),
            (e.humanizeMultipleOfConstraint = function(e) {
              if (void 0 !== e) {
                var t = e.toString(10);
                return /^0\.0*1$/.test(t)
                  ? 'decimal places <= ' + t.split('.')[1].length
                  : 'multiple of ' + t;
              }
            }),
            (e.humanizeRangeConstraint = function(e, t, n) {
              var r;
              return (
                void 0 !== t && void 0 !== n
                  ? (r =
                      t === n ? t + ' ' + e : '[ ' + t + ' .. ' + n + ' ] ' + e)
                  : void 0 !== n
                  ? (r = '<= ' + n + ' ' + e)
                  : void 0 !== t &&
                    (r = 1 === t ? 'non-empty' : '>= ' + t + ' ' + e),
                r
              );
            }),
            (e.jsonFieldToSchema = function(e) {
              var t,
                n,
                r,
                a = this;
              return 'object' != typeof e
                ? (((t = {
                    type: 'string',
                    const: 'function' == typeof e.toString ? e.toString() : e,
                  })[this.extRawValue] = !0),
                  t)
                : this.isJSONSchema(e)
                ? e
                : Array.isArray(e)
                ? (((n = {
                    type: 'array',
                    items: e.map(function(e) {
                      return a.jsonFieldToSchema(e);
                    }),
                  })[this.extRenderType] = !1),
                  (n[this.extRenderAdditionalInfo] = !1),
                  n)
                : (((r = {
                    type: 'object',
                    properties: Object.entries(e).reduce(function(e, t) {
                      var n = t[0],
                        r = t[1];
                      return (e[n] = a.jsonFieldToSchema(r)), e;
                    }, {}),
                  })[this.extRenderType] = !1),
                  (r[this.extRenderAdditionalInfo] = !1),
                  r);
            }),
            (e.isJSONSchema = function(e) {
              var t = this;
              return !(
                !e ||
                'object' != typeof e ||
                !(
                  this.jsonSchemaTypes.includes(e.type) ||
                  (Array.isArray(e.type) &&
                    e.type.some(function(e) {
                      return !t.jsonSchemaTypes.includes(e);
                    }))
                )
              );
            }),
            (e.extRenderType = 'x-schema-private-render-type'),
            (e.extRenderAdditionalInfo =
              'x-schema-private-render-additional-info'),
            (e.extRawValue = 'x-schema-private-raw-value'),
            (e.extParameterLocation = 'x-schema-private-parameter-location'),
            (e.jsonSchemaTypes = [
              'string',
              'number',
              'integer',
              'boolean',
              'array',
              'object',
              'null',
            ]),
            e
          );
        })(),
        P = function(e) {
          var t = e.name,
            n = void 0 === t ? 'Extensions' : t,
            r = e.item,
            s = R.getCustomExtensions(r);
          if (!s || !Object.keys(s).length) return null;
          var i = R.jsonToSchema(s);
          return a.a.createElement(
            'div',
            { className: 'mt-2' },
            a.a.createElement(M, { schemaName: n, schema: i }),
          );
        },
        I = a.a.createContext({ reverse: !1 }),
        M = function(e) {
          var t = e.schemaName,
            n = e.schema,
            s = e.required,
            i = void 0 !== s && s,
            o = e.isCircular,
            u = void 0 !== o && o,
            l = e.isPatternProperty,
            h = void 0 !== l && l,
            p = e.isProperty,
            m = void 0 !== p && p,
            f = e.expanded,
            d = void 0 !== f && f,
            g = Object(r.useContext)(I).reverse,
            y = Object(r.useState)(d),
            D = y[0],
            b = y[1];
          if (
            !n ||
            (null == t ? void 0 : t.startsWith('x-parser-')) ||
            (null == t ? void 0 : t.startsWith('x-schema-private-'))
          )
            return null;
          var x = n.uid(),
            E = R.humanizeConstraints(n),
            A = R.isExpandable(n),
            w = n.externalDocs(),
            k = !1 !== n.ext(R.extRenderType),
            _ = !0 === n.ext(R.extRawValue),
            F = n.ext(R.extParameterLocation);
          return a.a.createElement(
            I.Provider,
            { value: { reverse: !g } },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                'div',
                { className: 'flex py-2' },
                a.a.createElement(
                  'div',
                  { className: 'w-3/12 min-w-min mr-2' },
                  A && !u
                    ? a.a.createElement(
                        c,
                        {
                          onClick: function() {
                            return b(function(e) {
                              return !e;
                            });
                          },
                          chevronProps: {
                            className: D ? '-rotate-180' : '-rotate-90',
                          },
                        },
                        a.a.createElement(
                          'span',
                          {
                            className:
                              'break-words text-sm ' + (m ? 'italic' : ''),
                          },
                          t,
                        ),
                      )
                    : a.a.createElement(
                        'span',
                        {
                          className:
                            'break-words text-sm ' + (m ? 'italic' : ''),
                        },
                        t,
                      ),
                  h &&
                    a.a.createElement(
                      'div',
                      { className: 'text-gray-500 text-xs italic' },
                      '(pattern property)',
                    ),
                  i &&
                    a.a.createElement(
                      'div',
                      { className: 'text-red-600 text-xs' },
                      'required',
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
                _
                  ? a.a.createElement(
                      'div',
                      null,
                      a.a.createElement(
                        'div',
                        { className: 'text-sm font-bold' },
                        n.const(),
                      ),
                    )
                  : a.a.createElement(
                      'div',
                      null,
                      a.a.createElement(
                        'div',
                        null,
                        k &&
                          a.a.createElement(
                            'div',
                            {
                              className:
                                'capitalize text-sm text-teal-500 font-bold inline-block mr-2',
                            },
                            u ? '[CIRCULAR]' : R.toSchemaType(n),
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
                                  'bg-yellow-600 font-bold no-underline text-white rounded lowercase mr-2 p-1 text-xs',
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
                          !!E.length &&
                            E.map(function(e) {
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
                          x &&
                            !x.startsWith('<anonymous-') &&
                            a.a.createElement(
                              'span',
                              {
                                className:
                                  'border text-orange-600 rounded mr-2 p-1 text-xs',
                              },
                              'uid: ',
                              x,
                            ),
                        ),
                        n.hasDescription() &&
                          a.a.createElement(
                            'div',
                            null,
                            a.a.createElement(C, null, n.description()),
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
                              R.prettifyValue(n.default()),
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
                              R.prettifyValue(n.const()),
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
                                  R.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                        F &&
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
                              F,
                            ),
                          ),
                        w &&
                          a.a.createElement(
                            'span',
                            {
                              className:
                                'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-2 py-0',
                            },
                            a.a.createElement(
                              v,
                              { href: w.url(), title: w.description() || '' },
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
                                    'border inline-block text-orange-600 rounded ml-1 py-0 px-2',
                                },
                                a.a.createElement(
                                  'span',
                                  null,
                                  R.prettifyValue(e),
                                ),
                              );
                            }),
                          ),
                      ),
                    ),
              ),
              u || !A
                ? null
                : a.a.createElement(
                    'div',
                    {
                      className:
                        'rounded p-4 py-2 bg-gray-100 ' +
                        (g ? 'bg-gray-200' : '') +
                        ' ' +
                        (D ? 'block' : 'hidden'),
                    },
                    a.a.createElement(z, { schema: n }),
                    a.a.createElement(L, { schema: n }),
                    n.oneOf() &&
                      n.oneOf().map(function(e, t) {
                        return a.a.createElement(M, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Adheres to:' : 'Or to:',
                        });
                      }),
                    n.anyOf() &&
                      n.anyOf().map(function(e, t) {
                        return a.a.createElement(M, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Can adhere to:' : 'Or to:',
                        });
                      }),
                    n.allOf() &&
                      n.allOf().map(function(e, t) {
                        return a.a.createElement(M, {
                          key: t,
                          schema: e,
                          schemaName: 0 === t ? 'Consists of:' : 'And with:',
                        });
                      }),
                    n.not() &&
                      a.a.createElement(M, {
                        schema: n.not(),
                        schemaName: 'Cannot adhere to:',
                      }),
                    n.propertyNames() &&
                      a.a.createElement(M, {
                        schema: n.propertyNames(),
                        schemaName: 'Property names must adhere to:',
                      }),
                    n.contains() &&
                      a.a.createElement(M, {
                        schema: n.contains(),
                        schemaName: 'Array must contain at least one of:',
                      }),
                    n.if() &&
                      a.a.createElement(M, {
                        schema: n.if(),
                        schemaName: 'If schema adheres to:',
                      }),
                    n.then() &&
                      a.a.createElement(M, {
                        schema: n.then(),
                        schemaName: 'Then must adhere to:',
                      }),
                    n.else() &&
                      a.a.createElement(M, {
                        schema: n.else(),
                        schemaName: 'Otherwise:',
                      }),
                    a.a.createElement(P, { item: n }),
                    a.a.createElement(U, { schema: n }),
                    a.a.createElement($, { schema: n }),
                  ),
            ),
          );
        },
        z = function(e) {
          var t = e.schema,
            n = t.properties() || {};
          if (!Object.keys(n)) return null;
          var r = t.required() || [],
            s = t.patternProperties(),
            i = t.circularProps() || [];
          return a.a.createElement(
            a.a.Fragment,
            null,
            Object.entries(n).map(function(e) {
              var t = e[0],
                n = e[1];
              return a.a.createElement(M, {
                schema: n,
                schemaName: t,
                required: r.includes(t),
                isCircular: i.includes(t),
                isProperty: !0,
                key: t,
              });
            }),
            Object.entries(s).map(function(e) {
              var t = e[0],
                n = e[1];
              return a.a.createElement(M, {
                schema: n,
                schemaName: t,
                isCircular: i.includes(t),
                isPatternProperty: !0,
                isProperty: !0,
                key: t,
              });
            }),
          );
        },
        U = function(e) {
          var t = e.schema;
          if (!1 === t.ext(R.extRenderAdditionalInfo)) return null;
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
            : a.a.createElement(M, {
                schemaName: 'Additional properties:',
                schema: r,
              });
        },
        L = function(e) {
          var t = e.schema,
            n = t.type();
          if (!(n = Array.isArray(n) ? n : [n]).includes('array')) return null;
          var r = t.items();
          return r && !Array.isArray(r) && r.properties()
            ? a.a.createElement(z, { schema: r })
            : Array.isArray(r)
            ? a.a.createElement(
                a.a.Fragment,
                null,
                r.map(function(e, t) {
                  return a.a.createElement(M, {
                    schema: e,
                    schemaName: t + 1 + ' item:',
                    key: t,
                  });
                }),
              )
            : a.a.createElement(M, { schema: r, schemaName: 'Items:' });
        },
        $ = function(e) {
          var t = e.schema;
          if (!1 === t.ext(R.extRenderAdditionalInfo)) return null;
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
            : a.a.createElement(M, {
                schemaName: 'Additional items:',
                schema: r,
              });
        },
        q = function(e) {
          var t = e.name,
            n = void 0 === t ? 'Bindings' : t,
            r = e.bindings;
          if (!r || !Object.keys(r).length) return null;
          var s = R.jsonToSchema(r);
          return a.a.createElement(M, { schemaName: n, schema: s });
        },
        H = function(e) {
          var t = e.serverName,
            n = e.server,
            r = R.serverVariablesToSchema(n.variables()),
            s = n.protocolVersion(),
            i = n.security();
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(
                'div',
                { className: 'shadow rounded bg-gray-200 p-4' },
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
                    s ? n.protocol() + ' ' + s : n.protocol(),
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
                    a.a.createElement(C, null, n.description()),
                  ),
                r &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(M, {
                      schemaName: 'URL Variables',
                      schema: r,
                      expanded: !0,
                    }),
                  ),
                i && a.a.createElement(N, { serverRequirements: i }),
                n.hasBindings() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(q, { bindings: n.bindings() }),
                  ),
              ),
            ),
            a.a.createElement('div', { className: 'panel-item--right' }),
          );
        },
        Y = function() {
          var e = p().servers();
          return Object.keys(e).length
            ? a.a.createElement(
                'section',
                { id: 'servers', className: 'mt-16' },
                a.a.createElement(
                  'h2',
                  { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                  F.g,
                ),
                a.a.createElement(
                  'ul',
                  null,
                  Object.entries(e).map(function(e) {
                    var t = e[0],
                      n = e[1];
                    return a.a.createElement(
                      'li',
                      { className: 'mb-4', key: t },
                      a.a.createElement(H, {
                        serverName: t,
                        server: n,
                        key: t,
                      }),
                    );
                  }),
                ),
              )
            : null;
        },
        V = {
          keyClass: 'text-orange-500',
          numberClass: 'text-blue-500',
          stringClass: 'text-teal-500',
          trueClass: 'text-blue-500',
          falseClass: 'text-blue-500',
          nullClass: 'text-gray-500',
        },
        Z = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '`': '&#x60;',
          '=': '&#x3D;',
        };
      function W(e, t) {
        void 0 === t && (t = {});
        var n = typeof e;
        'string' !== n && (e = JSON.stringify(e, null, 2) || n);
        var r = Object.assign({}, V, t);
        return (e = e
          .replace(/&/g, '&')
          .replace(/</g, '<')
          .replace(/>/g, '>')).replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g,
          function(e) {
            var t,
              n = r.numberClass,
              a = '';
            return (
              /^"/.test(e)
                ? /:$/.test(e)
                  ? (n = r.keyClass)
                  : ((n = r.stringClass),
                    (e =
                      '"' +
                      ((t = e.substr(1, e.length - 2)),
                      String(t).replace(/[&<>"'`=]/g, function(e) {
                        return Z[e];
                      }) + '"')),
                    (a = 'word-wrap:break-word;white-space:pre-wrap;'))
                : (n = /true/.test(e)
                    ? r.trueClass
                    : /false/.test(e)
                    ? r.falseClass
                    : /null/.test(e)
                    ? r.nullClass
                    : n),
              '<span style="' + a + '" class="' + n + '">' + e + '</span>'
            );
          },
        );
      }
      var G = function(e) {
        var t = e.code;
        return a.a.createElement(
          'div',
          { className: 'border border-gray-900 bg-gray-900 rounded' },
          a.a.createElement(
            'pre',
            { className: 'p-2 text-gray-200 text-xs' },
            a.a.createElement('code', {
              dangerouslySetInnerHTML: { __html: W(t) },
            }),
          ),
        );
      };
      function K(e) {
        return e < 10 ? '0' + e : e;
      }
      function J(e, t) {
        return t > e.length
          ? e.repeat(Math.trunc(t / e.length) + 1).substring(0, t)
          : e;
      }
      function X(e) {
        return { value: 'object' === e ? {} : 'array' === e ? [] : void 0 };
      }
      function Q(e, t) {
        t && e.pop();
      }
      function ee(e, t, n, r, a) {
        let s = oe(e, n, r);
        const i = [];
        for (let e of t) {
          const { type: t, readOnly: o, writeOnly: u, value: l } = oe(
            { type: s.type, ...e },
            n,
            r,
            a,
          );
          s.type &&
            t &&
            t !== s.type &&
            (console.warn(
              "allOf: schemas with different types can't be merged",
            ),
            (s.type = t)),
            (s.type = s.type || t),
            (s.readOnly = s.readOnly || o),
            (s.writeOnly = s.writeOnly || u),
            null != l && i.push(l);
        }
        if ('object' === s.type)
          return (
            (s.value = (function e(...t) {
              const n = e => e && 'object' == typeof e;
              return t.reduce(
                (t, r) => (
                  Object.keys(r).forEach(a => {
                    const s = t[a],
                      i = r[a];
                    n(s) && n(i) ? (t[a] = e(s, i)) : (t[a] = i);
                  }),
                  t
                ),
                Array.isArray(t[t.length - 1]) ? [] : {},
              );
            })(s.value || {}, ...i.filter(e => 'object' == typeof e))),
            s
          );
        {
          'array' === s.type &&
            (n.quiet ||
              console.warn(
                'OpenAPI Sampler: found allOf with "array" type. Result may be incorrect',
              ));
          const e = i[i.length - 1];
          return (s.value = null != e ? e : s.value), s;
        }
      }
      const te = {
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
      function ne(e) {
        if (void 0 !== e.type) return e.type;
        const t = Object.keys(te);
        for (var n = 0; n < t.length; n++) {
          let r = t[n],
            a = te[r];
          if (void 0 !== e[r]) return a;
        }
        return null;
      }
      var re = n(49),
        ae = n.n(re);
      let se = {},
        ie = [];
      function oe(e, t, n, r) {
        if (r) {
          if (ie.includes(e)) return X(ne(e));
          ie.push(e);
        }
        if (r && r.depth > t.maxSampleDepth) return Q(ie, r), X(ne(e));
        if (e.$ref) {
          if (!n)
            throw new Error(
              'Your schema contains $ref. You must provide full specification in the third parameter.',
            );
          let a = decodeURIComponent(e.$ref);
          a.startsWith('#') && (a = a.substring(1));
          const s = ae.a.get(n, a);
          let i;
          if (!0 !== se[a]) (se[a] = !0), (i = oe(s, t, n, r)), (se[a] = !1);
          else {
            i = X(ne(s));
          }
          return Q(ie, r), i;
        }
        if (void 0 !== e.example)
          return (
            Q(ie, r),
            {
              value: e.example,
              readOnly: e.readOnly,
              writeOnly: e.writeOnly,
              type: e.type,
            }
          );
        if (void 0 !== e.allOf)
          return Q(ie, r), ee({ ...e, allOf: void 0 }, e.allOf, t, n, r);
        if (e.oneOf && e.oneOf.length)
          return (
            e.anyOf &&
              (t.quiet ||
                console.warn(
                  'oneOf and anyOf are not supported on the same level. Skipping anyOf',
                )),
            Q(ie, r),
            oe(e.oneOf[0], t, n, r)
          );
        if (e.anyOf && e.anyOf.length) return Q(ie, r), oe(e.anyOf[0], t, n, r);
        let a = null,
          s = null;
        if (void 0 !== e.default) a = e.default;
        else if (void 0 !== e.const) a = e.const;
        else if (void 0 !== e.enum && e.enum.length) a = e.enum[0];
        else if (void 0 !== e.examples && e.examples.length) a = e.examples[0];
        else {
          (s = e.type), s || (s = ne(e));
          let i = pe[s];
          i && (a = i(e, t, n, r));
        }
        return (
          Q(ie, r),
          { value: a, readOnly: e.readOnly, writeOnly: e.writeOnly, type: s }
        );
      }
      function ue(e) {
        let t;
        return e.maximum && e.minimum
          ? ((t = e.exclusiveMinimum ? Math.floor(e.minimum) + 1 : e.minimum),
            ((e.exclusiveMaximum && t >= e.maximum) ||
              (!e.exclusiveMaximum && t > e.maximum)) &&
              (t = (e.maximum + e.minimum) / 2),
            t)
          : e.minimum
          ? e.exclusiveMinimum
            ? Math.floor(e.minimum) + 1
            : e.minimum
          : e.maximum
          ? e.exclusiveMaximum
            ? e.maximum > 0
              ? 0
              : Math.floor(e.maximum) - 1
            : e.maximum > 0
            ? 0
            : e.maximum
          : 0;
      }
      function le(e, t, n) {
        let r = (function(e, t, n) {
          var r =
            e.getUTCFullYear() +
            '-' +
            K(e.getUTCMonth() + 1) +
            '-' +
            K(e.getUTCDate());
          return (
            t ||
              (r +=
                'T' +
                K(e.getUTCHours()) +
                ':' +
                K(e.getUTCMinutes()) +
                ':' +
                K(e.getUTCSeconds()) +
                (n
                  ? '.' + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5)
                  : '') +
                'Z'),
            r
          );
        })(new Date('2019-08-24T14:15:22.123Z'), n, !1);
        return (
          r.length < e &&
            console.warn(
              `Using minLength = ${e} is incorrect with format "date-time"`,
            ),
          t &&
            r.length > t &&
            console.warn(
              `Using maxLength = ${t} is incorrect with format "date-time"`,
            ),
          r
        );
      }
      function ce(e, t) {
        let n = J('string', e);
        return t && n.length > t && (n = n.substring(0, t)), n;
      }
      const he = {
        email: function() {
          return 'user@example.com';
        },
        password: function(e, t) {
          let n = 'pa$$word';
          return (
            e > n.length &&
              ((n += '_'),
              (n += J('qwerty!@#$%^123456', e - n.length).substring(
                0,
                e - n.length,
              ))),
            n
          );
        },
        'date-time': function(e, t) {
          return le(e, t);
        },
        date: function(e, t) {
          return le(e, t, !0);
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
        uri: function() {
          return 'http://example.com';
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
            (s = o),
            (i = o),
            (u = function() {
              var e = ((r |= 0) - (((a |= 0) << 27) | (a >>> 5))) | 0;
              return (
                (r = a ^ (((s |= 0) << 17) | (s >>> 15))),
                (a = (s + (i |= 0)) | 0),
                (s = (i + e) | 0),
                ((i = (r + e) | 0) >>> 0) / 4294967296
              );
            }),
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, e => {
              var t = (16 * u()) % 16 | 0;
              return ('x' == e ? t : (3 & t) | 8).toString(16);
            })
          );
          var r, a, s, i, o, u;
        },
        default: ce,
      };
      var pe = {};
      const me = { skipReadOnly: !1, maxSampleDepth: 15 };
      function fe(e, t, n) {
        let r = Object.assign({}, me, t);
        return (se = {}), (ie = []), oe(e, r, n).value;
      }
      function de(e, t) {
        pe[e] = t;
      }
      de('array', function(e, t = {}, n, r) {
        const a = (r && r.depth) || 1;
        let s = e.minItems || 1;
        Array.isArray(e.items) && (s = Math.max(s, e.items.length));
        let i = [];
        if (!e.items) return i;
        for (let r = 0; r < s; r++) {
          let s =
              ((o = r),
              Array.isArray(e.items) ? e.items[o] || {} : e.items || {}),
            { value: u } = oe(s, t, n, { depth: a + 1 });
          i.push(u);
        }
        var o;
        return i;
      }),
        de('boolean', function(e) {
          return !0;
        }),
        de('integer', ue),
        de('number', ue),
        de('object', function(e, t = {}, n, r) {
          let a = {};
          const s = (r && r.depth) || 1;
          if (e && 'object' == typeof e.properties) {
            let r = (Array.isArray(e.required) ? e.required : []).reduce(
              (e, t) => ((e[t] = !0), e),
              {},
            );
            Object.keys(e.properties).forEach(i => {
              if (t.skipNonRequired && !r.hasOwnProperty(i)) return;
              const o = oe(e.properties[i], t, n, {
                propertyName: i,
                depth: s + 1,
              });
              (t.skipReadOnly && o.readOnly) ||
                (t.skipWriteOnly && o.writeOnly) ||
                (a[i] = o.value);
            });
          }
          return (
            e &&
              'object' == typeof e.additionalProperties &&
              ((a.property1 = oe(e.additionalProperties, t, n, {
                depth: s + 1,
              }).value),
              (a.property2 = oe(e.additionalProperties, t, n, {
                depth: s + 1,
              }).value)),
            a
          );
        }),
        de('string', function(e, t, n, r) {
          let a = e.format || 'default',
            s = he[a] || ce,
            i = r && r.propertyName;
          return s(0 | e.minLength, e.maxLength, i);
        });
      var ge = (function() {
          function e() {}
          return (
            (e.generateExample = function(e, t) {
              void 0 === t && (t = {});
              try {
                return this.sanitizeExample(fe(e, t)) || '';
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
              )
                return t
                  .flatMap(function(e) {
                    return e.payload;
                  })
                  .filter(Boolean);
              var n = e.payload();
              return n && n.examples() ? n.examples() : void 0;
            }),
            (e.getHeadersExamples = function(e) {
              var t = e.examples();
              if (
                Array.isArray(t) &&
                t.some(function(e) {
                  return e.headers;
                })
              )
                return t
                  .flatMap(function(e) {
                    return e.headers;
                  })
                  .filter(Boolean);
              var n = e.headers();
              return n && n.examples() ? n.examples() : void 0;
            }),
            e
          );
        })(),
        ye = function(e) {
          var t = e.message,
            n = t.payload(),
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
              a.a.createElement(De, {
                type: 'Payload',
                schema: n,
                examples: ge.getPayloadExamples(t),
              }),
            r &&
              a.a.createElement(De, {
                type: 'Headers',
                schema: r,
                examples: ge.getHeadersExamples(t),
              }),
          );
        },
        De = function(e) {
          var t = e.type,
            n = void 0 === t ? 'Payload' : t,
            s = e.schema,
            i = e.examples,
            o = void 0 === i ? [] : i,
            u = Object(r.useState)(!1),
            l = u[0],
            h = u[1];
          return a.a.createElement(
            'div',
            { className: 'mt-4' },
            a.a.createElement(
              'div',
              null,
              a.a.createElement(
                c,
                {
                  onClick: function() {
                    return h(function(e) {
                      return !e;
                    });
                  },
                  chevronProps: {
                    className:
                      'fill-current text-gray-200 ' +
                      (l ? '-rotate-180' : '-rotate-90'),
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
                          { className: 'text-xs font-bold text-gray-700' },
                          'Example #',
                          t + 1,
                        ),
                        a.a.createElement(
                          'div',
                          { className: 'mt-1' },
                          a.a.createElement(G, { code: ge.sanitizeExample(e) }),
                        ),
                      );
                    }),
                  )
                : a.a.createElement(
                    'div',
                    { className: 'mt-4' },
                    a.a.createElement(G, {
                      code: ge.generateExample(s.json()),
                    }),
                    a.a.createElement(
                      'h6',
                      {
                        className:
                          'text-xs font-bold text-gray-700 italic mt-2',
                      },
                      'This example has been generated automatically.',
                    ),
                  ),
            ),
          );
        },
        be = function(e) {
          var t = e.message,
            n = e.index,
            r = e.showExamples,
            s = void 0 !== r && r,
            i = t.title(),
            o = t.summary(),
            u = t.payload(),
            l = t.headers(),
            c = t.correlationId(),
            h = t.contentType(),
            p = t.externalDocs(),
            m = h || p;
          return a.a.createElement(
            'div',
            { className: 'panel-item' },
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(
                'div',
                { className: 'shadow rounded bg-gray-200 p-4' },
                a.a.createElement(
                  'div',
                  null,
                  void 0 !== n &&
                    a.a.createElement(
                      'span',
                      { className: 'text-gray-700 font-bold mr-2' },
                      '#',
                      n,
                    ),
                  i &&
                    a.a.createElement(
                      'span',
                      { className: 'text-gray-700 mr-2' },
                      i,
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
                o &&
                  a.a.createElement(
                    'p',
                    { className: 'text-gray-600 text-sm' },
                    o,
                  ),
                m &&
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
                          v,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: F.a + '/' + h,
                          },
                          a.a.createElement('span', null, h),
                        ),
                      ),
                    p &&
                      a.a.createElement(
                        'li',
                        { className: 'inline-block' },
                        a.a.createElement(
                          v,
                          {
                            className:
                              'border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1',
                            href: p.url(),
                          },
                          a.a.createElement('span', null, F.d),
                        ),
                      ),
                  ),
                c &&
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
                        c.location(),
                      ),
                    ),
                    c.hasDescription() &&
                      a.a.createElement(
                        'div',
                        { className: 'mt-2' },
                        a.a.createElement(C, null, c.description()),
                      ),
                  ),
                t.hasDescription() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(C, null, t.description()),
                  ),
                u &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(M, { schemaName: 'Payload', schema: u }),
                  ),
                l &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(M, { schemaName: 'Headers', schema: l }),
                  ),
                t.hasBindings() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(q, { bindings: t.bindings() }),
                  ),
                a.a.createElement(P, { item: t }),
                t.hasTags() &&
                  a.a.createElement(
                    'div',
                    { className: 'mt-2' },
                    a.a.createElement(_, { tags: t.tags() }),
                  ),
              ),
            ),
            s &&
              a.a.createElement(
                'div',
                { className: 'panel-item--right px-8' },
                a.a.createElement(ye, { message: t }),
              ),
          );
        },
        xe = n(7),
        ve = function(e) {
          var t = e.type,
            n = void 0 === t ? xe.b.PUBLISH : t,
            r = e.operation,
            s = e.channelName,
            i = e.channel,
            o = R.parametersToSchema(i.parameters()),
            u = r.summary();
          return a.a.createElement(
            'div',
            { id: 'operation-' + n + '-' + s },
            a.a.createElement(
              'div',
              { className: 'panel-item--center px-8' },
              a.a.createElement(
                'div',
                { className: 'mb-4' },
                a.a.createElement(
                  'h3',
                  null,
                  a.a.createElement(
                    'span',
                    {
                      className:
                        'font-mono border uppercase p-1 rounded mr-2 ' +
                        (n === xe.b.PUBLISH
                          ? 'border-blue-600 text-blue-500'
                          : 'border-green-600 text-green-600'),
                      title: n,
                    },
                    n === xe.b.PUBLISH ? 'PUB' : 'SUB',
                  ),
                  ' ',
                  a.a.createElement(
                    'span',
                    { className: 'font-mono text-base' },
                    s,
                  ),
                ),
              ),
              i.hasDescription() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(C, null, i.description()),
                ),
              u &&
                a.a.createElement(
                  'p',
                  { className: 'text-gray-600 text-sm mt-2' },
                  u,
                ),
              r.hasDescription() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(C, null, r.description()),
                ),
              o &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(M, {
                    schemaName: 'Parameters',
                    schema: o,
                    expanded: !0,
                  }),
                ),
              r.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(q, {
                    name: 'Operation Bindings',
                    bindings: r.bindings(),
                  }),
                ),
              i.hasBindings() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(q, {
                    name: 'Channel Bindings',
                    bindings: i.bindings(),
                  }),
                ),
              a.a.createElement(P, { item: r }),
              r.hasTags() &&
                a.a.createElement(
                  'div',
                  { className: 'mt-2' },
                  a.a.createElement(_, { tags: r.tags() }),
                ),
            ),
            a.a.createElement(
              'div',
              { className: 'w-full mt-4' },
              r.hasMultipleMessages()
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
                      r.messages().map(function(e, t) {
                        return a.a.createElement(
                          'li',
                          { className: 'mt-4', key: t },
                          a.a.createElement(be, {
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
                      a.a.createElement(be, {
                        message: r.message(),
                        showExamples: !0,
                      }),
                    ),
                  ),
            ),
          );
        },
        Ee = function() {
          var e = p().channels();
          if (!Object.keys(e).length) return null;
          var t = [];
          return (
            Object.entries(e).forEach(function(e) {
              var n = e[0],
                r = e[1];
              r.hasPublish() &&
                t.push(
                  a.a.createElement(
                    'li',
                    { className: 'mb-12', key: 'pub-' + n },
                    a.a.createElement(ve, {
                      type: xe.b.PUBLISH,
                      operation: r.publish(),
                      channelName: n,
                      channel: r,
                    }),
                  ),
                ),
                r.hasSubscribe() &&
                  t.push(
                    a.a.createElement(
                      'li',
                      { className: 'mb-12', key: 'sub-' + n },
                      a.a.createElement(ve, {
                        type: xe.b.SUBSCRIBE,
                        operation: r.subscribe(),
                        channelName: n,
                        channel: r,
                      }),
                    ),
                  );
            }),
            a.a.createElement(
              'section',
              { id: 'operations', className: 'mt-16' },
              a.a.createElement(
                'h2',
                { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                F.f,
              ),
              a.a.createElement('ul', null, t),
            )
          );
        },
        Ae = function() {
          var e = p().allMessages();
          return e.size
            ? a.a.createElement(
                'section',
                { id: 'messages', className: 'mt-16' },
                a.a.createElement(
                  'h2',
                  { className: '2xl:w-7/12 text-3xl font-light mb-4 px-8' },
                  F.e,
                ),
                a.a.createElement(
                  'ul',
                  null,
                  Array.from(e).map(function(e, t) {
                    var n = e[0],
                      r = e[1];
                    return a.a.createElement(
                      'li',
                      { className: 'mb-4', key: n, id: 'message-' + r.uid() },
                      a.a.createElement(be, {
                        message: r,
                        index: t + 1,
                        key: n,
                      }),
                    );
                  }),
                ),
              )
            : null;
        },
        we = function(e) {
          var t = e.error;
          if (!t) return null;
          var n,
            r = t.title,
            s = t.validationErrors;
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
                  r ? F.c + ': ' + r : F.c,
                ),
                s && s.length
                  ? a.a.createElement(
                      'div',
                      { className: 'bg-gray-800 text-white text-xs p-2' },
                      a.a.createElement(
                        'pre',
                        null,
                        (n = s)
                          ? n
                              .map(function(e, t) {
                                return e && e.title && e.location
                                  ? a.a.createElement(
                                      'div',
                                      { key: t, className: 'flex' },
                                      a.a.createElement(
                                        'span',
                                        null,
                                        e.location.startLine + '.',
                                      ),
                                      a.a.createElement(
                                        'code',
                                        {
                                          className:
                                            'break-words whitespace-pre-wrap ml-2',
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
        };
      function Ce(e) {
        if (!e) return '';
        var t = e.match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        );
        return t
          ? t
              .map(function(e) {
                return e.toLowerCase();
              })
              .join('-')
          : e;
      }
      var ke,
        _e = new ((function() {
          function e() {
            this.schemaID = F.b;
          }
          return (
            (e.prototype.getSchemaID = function() {
              return this.schemaID;
            }),
            (e.prototype.setSchemaID = function(e) {
              this.schemaID = e ? Ce(e) : this.schemaID;
            }),
            (e.prototype.element = function(e) {
              return e ? F.b + '__' + e : '';
            }),
            (e.prototype.modifier = function(e, t) {
              return e ? F.b + (t ? '__' + t : '') + '--' + e : '';
            }),
            (e.prototype.concatenate = function(e) {
              return e.filter(Boolean).join(' ');
            }),
            (e.prototype.identifier = function(e) {
              var t = this,
                n = e
                  .map(function(e) {
                    if (e)
                      return t.isIdentifier(e)
                        ? e.toKebabCase
                          ? Ce(e.id)
                          : e.id
                        : e;
                  })
                  .filter(Boolean)
                  .join('--');
              return n.startsWith(this.schemaID) ? n : this.schemaID + '--' + n;
            }),
            (e.prototype.isIdentifier = function(e) {
              return e.hasOwnProperty('id');
            }),
            e
          );
        })())(),
        Fe = function(e) {
          var t,
            n,
            s,
            i,
            u,
            l,
            c = e.asyncapi,
            p = e.config,
            m = e.error,
            d = void 0 === m ? null : m,
            g = Object(r.useState)(1281),
            y = g[0],
            D = g[1],
            b = o({
              onResize: function(e) {
                var t = e.width;
                y !== t && t && D(t);
              },
            }).ref;
          return (
            _e.setSchemaID(p.schemaID),
            a.a.createElement(
              h.Provider,
              { value: { asyncapi: c } },
              a.a.createElement(
                'section',
                {
                  className:
                    (y <= 1280 ? 'container:xl' : 'container:base') +
                    ' relative md:flex bg-white',
                  id: _e.getSchemaID(),
                  ref: b,
                },
                (null === (t = p.show) || void 0 === t ? void 0 : t.sidebar) &&
                  a.a.createElement(f, { config: p.sidebar }),
                a.a.createElement(
                  'div',
                  { className: 'panel--center relative py-8 flex-1' },
                  a.a.createElement(
                    'div',
                    { className: 'relative z-10' },
                    (null === (n = p.show) || void 0 === n
                      ? void 0
                      : n.errors) &&
                      d &&
                      a.a.createElement(we, { error: d }),
                    (null === (s = p.show) || void 0 === s ? void 0 : s.info) &&
                      a.a.createElement(j, null),
                    (null === (i = p.show) || void 0 === i
                      ? void 0
                      : i.servers) && a.a.createElement(Y, null),
                    (null === (u = p.show) || void 0 === u
                      ? void 0
                      : u.operations) && a.a.createElement(Ee, null),
                    (null === (l = p.show) || void 0 === l
                      ? void 0
                      : l.messages) && a.a.createElement(Ae, null),
                  ),
                  a.a.createElement('div', {
                    className:
                      'panel--right absolute top-0 right-0 h-full bg-gray-800',
                  }),
                ),
              ),
            )
          );
        },
        je =
          ((ke = function(e, t) {
            return (ke =
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
            function n() {
              this.constructor = e;
            }
            ke(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((n.prototype = t.prototype), new n()));
          }),
        Se = function() {
          return (Se =
            Object.assign ||
            function(e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var a in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
              return e;
            }).apply(this, arguments);
        },
        Ne = function(e, t, n, r) {
          return new (n || (n = Promise))(function(a, s) {
            function i(e) {
              try {
                u(r.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                u(r.throw(e));
              } catch (e) {
                s(e);
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
                      })).then(i, o);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        Oe = function(e, t) {
          var n,
            r,
            a,
            s,
            i = {
              label: 0,
              sent: function() {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (s = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (s[Symbol.iterator] = function() {
                return this;
              }),
            s
          );
          function o(s) {
            return function(o) {
              return (function(s) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; i; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (a =
                          2 & s[0]
                            ? r.return
                            : s[0]
                            ? r.throw || ((a = r.return) && a.call(r), 0)
                            : r.next) &&
                        !(a = a.call(r, s[1])).done)
                    )
                      return a;
                    switch (((r = 0), a && (s = [2 & s[0], a.value]), s[0])) {
                      case 0:
                      case 1:
                        a = s;
                        break;
                      case 4:
                        return i.label++, { value: s[1], done: !1 };
                      case 5:
                        i.label++, (r = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = i.ops.pop()), i.trys.pop();
                        continue;
                      default:
                        if (
                          !((a = i.trys),
                          (a = a.length > 0 && a[a.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0]))
                        ) {
                          i = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!a || (s[1] > a[0] && s[1] < a[3]))
                        ) {
                          i.label = s[1];
                          break;
                        }
                        if (6 === s[0] && i.label < a[1]) {
                          (i.label = a[1]), (a = s);
                          break;
                        }
                        if (a && i.label < a[2]) {
                          (i.label = a[2]), i.ops.push(s);
                          break;
                        }
                        a[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    s = t.call(e, i);
                  } catch (e) {
                    (s = [6, e]), (r = 0);
                  } finally {
                    n = a = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, o]);
            };
          }
        },
        Te = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            n.state = { asyncapi: void 0, error: void 0 };
            var r = s.a.retrieveParsedSpec(t.schema);
            return r && (n.state = { asyncapi: r }), n;
          }
          return (
            je(t, e),
            (t.prototype.componentDidMount = function() {
              return Ne(this, void 0, void 0, function() {
                return Oe(this, function(e) {
                  return (
                    this.state.asyncapi || this.updateState(this.props.schema),
                    [2]
                  );
                });
              });
            }),
            (t.prototype.componentDidUpdate = function(e) {
              return Ne(this, void 0, void 0, function() {
                var t, n;
                return Oe(this, function(r) {
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
                s = this.state,
                o = s.asyncapi,
                u = s.error,
                l = r || u,
                c = Se(Se(Se({}, i), n), {
                  show: Se(Se({}, i.show), !!n && n.show),
                  sidebar: Se(Se({}, i.sidebar), !!n && n.sidebar),
                });
              return o
                ? a.a.createElement(Fe, { asyncapi: o, config: c, error: l })
                : l
                ? (null === (e = c.show) || void 0 === e ? void 0 : e.errors) &&
                  a.a.createElement(we, { error: l })
                : null;
            }),
            (t.prototype.updateState = function(e) {
              var t = s.a.retrieveParsedSpec(e);
              t
                ? this.setState({ asyncapi: t })
                : this.setState({ asyncapi: void 0 });
            }),
            t
          );
        })(r.Component);
      t.a = Te;
    },
    257: function(e, t, n) {
      'use strict';
      n.r(t);
      var r = n(25);
      t.default = r.a;
    },
    3: function(e, t, n) {
      const r = n(21);
      e.exports = class {
        constructor(e) {
          if (!e)
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
    31: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: s } = n(2),
        i = n(3),
        o = n(58),
        u = n(61),
        l = n(64),
        c = n(71),
        h = n(16),
        p = n(22),
        m = n(4),
        { xParserSpecParsed: f, xParserCircle: d, xParserCircleProps: g } = n(
          38,
        ),
        {
          assignNameToAnonymousMessages: y,
          assignNameToComponentMessages: D,
          assignUidToComponentSchemas: b,
          assignUidToParameterSchemas: x,
          assignIdToAnonymousSchemas: v,
        } = n(76),
        { traverseAsyncApiDocument: E, SchemaIteratorCallbackType: A } = n(39);
      e.exports = s(
        class extends i {
          constructor(...e) {
            super(...e),
              !0 !== this.ext(f) &&
                (D(this),
                y(this),
                (function(e) {
                  const t = [],
                    n = [];
                  E(e, (e, r, a) => {
                    switch (a) {
                      case A.END_SCHEMA:
                        n.pop(), t.pop();
                        break;
                      case A.NEW_SCHEMA:
                        const a = e.json();
                        if (t.includes(a)) {
                          return (
                            ((e, t) => {
                              if ('array' === e.type())
                                return (e.json()[String(d)] = !0);
                              const n = e.json()[String(g)] || [];
                              void 0 !== t && n.push(t),
                                (e.json()[String(g)] = n);
                            })(n.length > 0 ? n[n.length - 1] : e, r),
                            !1
                          );
                        }
                        return t.push(a), n.push(e), !0;
                    }
                  });
                })(this),
                b(this),
                x(this),
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
              E(this, t => {
                t.uid() && e.set(t.uid(), t);
              }),
              e
            );
          }
          hasCircular() {
            return !!this._json[String(d)];
          }
          traverseSchemas(e, t) {
            E(this, e, t);
          }
        },
        p,
        h,
        m,
      );
    },
    32: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(10),
        i = n(5),
        o = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
          schema() {
            return this._json.schema ? new s(this._json.schema) : null;
          }
        },
        i,
        o,
      );
    },
    33: function(e, t, n) {
      const r = n(34),
        a = n(35);
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
      };
    },
    34: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(5),
        i = n(22),
        o = n(16),
        u = n(20),
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
        s,
        i,
        o,
        u,
        l,
      );
    },
    35: function(e, t, n) {
      (function(t) {
        const r = n(36),
          a = n(10);
        e.exports = class extends r {
          uid() {
            return (
              this.name() ||
              this.ext('x-parser-message-name') ||
              t.from(JSON.stringify(this._json)).toString('base64')
            );
          }
          payload() {
            return this._json.payload ? new a(this._json.payload) : null;
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
      }.call(this, n(8).Buffer));
    },
    36: function(e, t, n) {
      const { getMapValueOfType: r, mix: a } = n(2),
        s = n(3),
        i = n(10),
        o = n(37),
        u = n(5),
        l = n(16),
        c = n(22),
        h = n(20),
        p = n(4);
      e.exports = a(
        class extends s {
          headers() {
            return this._json.headers ? new i(this._json.headers) : null;
          }
          header(e) {
            return this._json.headers
              ? r(this._json.headers.properties, e, i)
              : null;
          }
          correlationId() {
            return this._json.correlationId
              ? new o(this._json.correlationId)
              : null;
          }
          schemaFormat() {
            return 'application/schema+json;version=draft-07';
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
        p,
      );
    },
    37: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(5),
        i = n(4);
      e.exports = r(
        class extends a {
          location() {
            return this._json.location;
          }
        },
        i,
        s,
      );
    },
    38: function(e, t) {
      e.exports = {
        xParserSpecParsed: 'x-parser-spec-parsed',
        xParserMessageName: 'x-parser-message-name',
        xParserSchemaId: 'x-parser-schema-id',
        xParserCircle: 'x-parser-circular',
        xParserCircleProps: 'x-parser-circular-props',
      };
    },
    39: function(e, t) {
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
        });
      function a(e, t, s, i) {
        if (
          null !== e &&
          (i.includes(r.arrays) || 'array' !== e.type()) &&
          (i.includes(r.objects) || 'object' !== e.type()) &&
          !e.isCircular() &&
          !1 !== t(e, s, n.NEW_SCHEMA)
        ) {
          if (void 0 !== e.type())
            switch (e.type()) {
              case 'object':
                o(e, t, i);
                break;
              case 'array':
                u(e, t, i);
            }
          else
            !(function(e, t, n) {
              const s = e => {
                (e || []).forEach(e => {
                  a(e, t, null, n);
                });
              };
              n.includes(r.allOfs) && s(e.allOf());
              n.includes(r.anyOfs) && s(e.anyOf());
              n.includes(r.oneOfs) && s(e.oneOf());
            })(e, t, i);
          t(e, s, n.END_SCHEMA);
        }
      }
      function s(e, t, n) {
        n.includes(r.parameters) &&
          Object.values(e.parameters()).forEach(e => {
            a(e.schema(), t, null, n);
          }),
          e.hasPublish() &&
            e
              .publish()
              .messages()
              .forEach(e => {
                i(e, t, n);
              }),
          e.hasSubscribe() &&
            e
              .subscribe()
              .messages()
              .forEach(e => {
                i(e, t, n);
              });
      }
      function i(e, t, n) {
        null !== e &&
          (n.includes(r.headers) && a(e.headers(), t, null, n),
          n.includes(r.payloads) && a(e.payload(), t, null, n));
      }
      function o(e, t, n) {
        if (
          void 0 !== e.additionalProperties() &&
          'boolean' != typeof e.additionalProperties()
        ) {
          a(e.additionalProperties(), t, null, n);
        }
        if (null !== e.properties()) {
          const r = e.properties();
          for (const [s, i] of Object.entries(r)) {
            const r = e.circularProps();
            (void 0 !== r && r.includes(s)) || a(i, t, s, n);
          }
        }
      }
      function u(e, t, n) {
        if (void 0 !== e.additionalItems()) {
          a(e.additionalItems(), t, null, n);
        }
        null !== e.items() &&
          (Array.isArray(e.items())
            ? e.items().forEach(e => {
                a(e, t, null, n);
              })
            : a(e.items(), t, null, n));
      }
      e.exports = {
        SchemaIteratorCallbackType: n,
        SchemaTypesToIterate: r,
        traverseSchema: a,
        traverseAsyncApiDocument: function(e, t, n) {
          n || (n = Object.values(r)),
            e.hasChannels() &&
              e.channelNames().forEach(r => {
                s(e.channel(r), t, n);
              }),
            e.hasComponents() &&
              n.includes(r.components) &&
              (Object.values(e.components().schemas()).forEach(e => {
                a(e, t, null, n);
              }),
              Object.values(e.components().messages()).forEach(e => {
                i(e, t, n);
              }));
        },
        traverseChannel: s,
        traverseMessage: i,
        recursiveSchemaObject: o,
        recursiveSchemaArray: u,
      };
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
      /*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.2.2/LICENSE */
      e.exports = (function() {
        'use strict';
        var e = Object.hasOwnProperty,
          t = Object.setPrototypeOf,
          n = Object.isFrozen,
          r = Object.getPrototypeOf,
          a = Object.getOwnPropertyDescriptor,
          s = Object.freeze,
          i = Object.seal,
          o = Object.create,
          u = 'undefined' != typeof Reflect && Reflect,
          l = u.apply,
          c = u.construct;
        l ||
          (l = function(e, t, n) {
            return e.apply(t, n);
          }),
          s ||
            (s = function(e) {
              return e;
            }),
          i ||
            (i = function(e) {
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
          p = E(Array.prototype.forEach),
          m = E(Array.prototype.pop),
          f = E(Array.prototype.push),
          d = E(String.prototype.toLowerCase),
          g = E(String.prototype.match),
          y = E(String.prototype.replace),
          D = E(String.prototype.indexOf),
          b = E(String.prototype.trim),
          x = E(RegExp.prototype.test),
          v =
            ((h = TypeError),
            function() {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              return c(h, t);
            });
        function E(e) {
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
            var s = r[a];
            if ('string' == typeof s) {
              var i = d(s);
              i !== s && (n(r) || (r[a] = i), (s = i));
            }
            e[s] = !0;
          }
          return e;
        }
        function w(t) {
          var n = o(null),
            r = void 0;
          for (r in t) l(e, t, [r]) && (n[r] = t[r]);
          return n;
        }
        function C(e, t) {
          for (; null !== e; ) {
            var n = a(e, t);
            if (n) {
              if (n.get) return E(n.get);
              if ('function' == typeof n.value) return E(n.value);
            }
            e = r(e);
          }
          return function(e) {
            return console.warn('fallback value for', e), null;
          };
        }
        var k = s([
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
          _ = s([
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
          F = s([
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
          j = s([
            'animate',
            'color-profile',
            'cursor',
            'discard',
            'fedropshadow',
            'feimage',
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
          S = s([
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
          N = s([
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
          O = s(['#text']),
          T = s([
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
          ]),
          B = s([
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
          R = s([
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
          P = s([
            'xlink:href',
            'xml:id',
            'xlink:title',
            'xml:space',
            'xmlns:xlink',
          ]),
          I = i(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
          M = i(/<%[\s\S]*|[\s\S]*%>/gm),
          z = i(/^data-[\-\w.\u00B7-\uFFFF]/),
          U = i(/^aria-[\-\w]+$/),
          L = i(
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          ),
          $ = i(/^(?:\w+script|data):/i),
          q = i(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
          H =
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
        function Y(e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
          }
          return Array.from(e);
        }
        var V = function() {
            return 'undefined' == typeof window ? null : window;
          },
          Z = function(e, t) {
            if (
              'object' !== (void 0 === e ? 'undefined' : H(e)) ||
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
                : V(),
            n = function(t) {
              return e(t);
            };
          if (
            ((n.version = '2.2.7'),
            (n.removed = []),
            !t || !t.document || 9 !== t.document.nodeType)
          )
            return (n.isSupported = !1), n;
          var r = t.document,
            a = t.document,
            i = t.DocumentFragment,
            o = t.HTMLTemplateElement,
            u = t.Node,
            l = t.Element,
            c = t.NodeFilter,
            h = t.NamedNodeMap,
            E = void 0 === h ? t.NamedNodeMap || t.MozNamedAttrMap : h,
            W = t.Text,
            G = t.Comment,
            K = t.DOMParser,
            J = t.trustedTypes,
            X = l.prototype,
            Q = C(X, 'cloneNode'),
            ee = C(X, 'nextSibling'),
            te = C(X, 'childNodes'),
            ne = C(X, 'parentNode');
          if ('function' == typeof o) {
            var re = a.createElement('template');
            re.content &&
              re.content.ownerDocument &&
              (a = re.content.ownerDocument);
          }
          var ae = Z(J, r),
            se = ae && Ie ? ae.createHTML('') : '',
            ie = a,
            oe = ie.implementation,
            ue = ie.createNodeIterator,
            le = ie.getElementsByTagName,
            ce = ie.createDocumentFragment,
            he = r.importNode,
            pe = {};
          try {
            pe = w(a).documentMode ? a.documentMode : {};
          } catch (e) {}
          var me = {};
          n.isSupported =
            'function' == typeof ne &&
            oe &&
            void 0 !== oe.createHTMLDocument &&
            9 !== pe;
          var fe = I,
            de = M,
            ge = z,
            ye = U,
            De = $,
            be = q,
            xe = L,
            ve = null,
            Ee = A({}, [].concat(Y(k), Y(_), Y(F), Y(S), Y(O))),
            Ae = null,
            we = A({}, [].concat(Y(T), Y(B), Y(R), Y(P))),
            Ce = null,
            ke = null,
            _e = !0,
            Fe = !0,
            je = !1,
            Se = !1,
            Ne = !1,
            Oe = !1,
            Te = !1,
            Be = !1,
            Re = !1,
            Pe = !0,
            Ie = !1,
            Me = !0,
            ze = !0,
            Ue = !1,
            Le = {},
            $e = A({}, [
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
            He = A({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
            Ye = null,
            Ve = A({}, [
              'alt',
              'class',
              'for',
              'id',
              'label',
              'name',
              'pattern',
              'placeholder',
              'summary',
              'title',
              'value',
              'style',
              'xmlns',
            ]),
            Ze = null,
            We = a.createElement('form'),
            Ge = function(e) {
              (Ze && Ze === e) ||
                ((e && 'object' === (void 0 === e ? 'undefined' : H(e))) ||
                  (e = {}),
                (e = w(e)),
                (ve = 'ALLOWED_TAGS' in e ? A({}, e.ALLOWED_TAGS) : Ee),
                (Ae = 'ALLOWED_ATTR' in e ? A({}, e.ALLOWED_ATTR) : we),
                (Ye =
                  'ADD_URI_SAFE_ATTR' in e
                    ? A(w(Ve), e.ADD_URI_SAFE_ATTR)
                    : Ve),
                (qe =
                  'ADD_DATA_URI_TAGS' in e
                    ? A(w(He), e.ADD_DATA_URI_TAGS)
                    : He),
                (Ce = 'FORBID_TAGS' in e ? A({}, e.FORBID_TAGS) : {}),
                (ke = 'FORBID_ATTR' in e ? A({}, e.FORBID_ATTR) : {}),
                (Le = 'USE_PROFILES' in e && e.USE_PROFILES),
                (_e = !1 !== e.ALLOW_ARIA_ATTR),
                (Fe = !1 !== e.ALLOW_DATA_ATTR),
                (je = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                (Se = e.SAFE_FOR_TEMPLATES || !1),
                (Ne = e.WHOLE_DOCUMENT || !1),
                (Be = e.RETURN_DOM || !1),
                (Re = e.RETURN_DOM_FRAGMENT || !1),
                (Pe = !1 !== e.RETURN_DOM_IMPORT),
                (Ie = e.RETURN_TRUSTED_TYPE || !1),
                (Te = e.FORCE_BODY || !1),
                (Me = !1 !== e.SANITIZE_DOM),
                (ze = !1 !== e.KEEP_CONTENT),
                (Ue = e.IN_PLACE || !1),
                (xe = e.ALLOWED_URI_REGEXP || xe),
                Se && (Fe = !1),
                Re && (Be = !0),
                Le &&
                  ((ve = A({}, [].concat(Y(O)))),
                  (Ae = []),
                  !0 === Le.html && (A(ve, k), A(Ae, T)),
                  !0 === Le.svg && (A(ve, _), A(Ae, B), A(Ae, P)),
                  !0 === Le.svgFilters && (A(ve, F), A(Ae, B), A(Ae, P)),
                  !0 === Le.mathMl && (A(ve, S), A(Ae, R), A(Ae, P))),
                e.ADD_TAGS && (ve === Ee && (ve = w(ve)), A(ve, e.ADD_TAGS)),
                e.ADD_ATTR && (Ae === we && (Ae = w(Ae)), A(Ae, e.ADD_ATTR)),
                e.ADD_URI_SAFE_ATTR && A(Ye, e.ADD_URI_SAFE_ATTR),
                ze && (ve['#text'] = !0),
                Ne && A(ve, ['html', 'head', 'body']),
                ve.table && (A(ve, ['tbody']), delete Ce.tbody),
                s && s(e),
                (Ze = e));
            },
            Ke = A({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
            Je = A({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
            Xe = A({}, _);
          A(Xe, F), A(Xe, j);
          var Qe = A({}, S);
          A(Qe, N);
          var et = 'http://www.w3.org/1998/Math/MathML',
            tt = 'http://www.w3.org/2000/svg',
            nt = 'http://www.w3.org/1999/xhtml',
            rt = function(e) {
              var t = ne(e);
              (t && t.tagName) ||
                (t = { namespaceURI: nt, tagName: 'template' });
              var n = d(e.tagName),
                r = d(t.tagName);
              if (e.namespaceURI === tt)
                return t.namespaceURI === nt
                  ? 'svg' === n
                  : t.namespaceURI === et
                  ? 'svg' === n && ('annotation-xml' === r || Ke[r])
                  : Boolean(Xe[n]);
              if (e.namespaceURI === et)
                return t.namespaceURI === nt
                  ? 'math' === n
                  : t.namespaceURI === tt
                  ? 'math' === n && Je[r]
                  : Boolean(Qe[n]);
              if (e.namespaceURI === nt) {
                if (t.namespaceURI === tt && !Je[r]) return !1;
                if (t.namespaceURI === et && !Ke[r]) return !1;
                var a = A({}, ['title', 'style', 'font', 'a', 'script']);
                return !Qe[n] && (a[n] || !Xe[n]);
              }
              return !1;
            },
            at = function(e) {
              f(n.removed, { element: e });
              try {
                e.parentNode.removeChild(e);
              } catch (t) {
                try {
                  e.outerHTML = se;
                } catch (t) {
                  e.remove();
                }
              }
            },
            st = function(e, t) {
              try {
                f(n.removed, { attribute: t.getAttributeNode(e), from: t });
              } catch (e) {
                f(n.removed, { attribute: null, from: t });
              }
              if ((t.removeAttribute(e), 'is' === e && !Ae[e]))
                if (Be || Re)
                  try {
                    at(t);
                  } catch (e) {}
                else
                  try {
                    t.setAttribute(e, '');
                  } catch (e) {}
            },
            it = function(e) {
              var t = void 0,
                n = void 0;
              if (Te) e = '<remove></remove>' + e;
              else {
                var r = g(e, /^[\r\n\t ]+/);
                n = r && r[0];
              }
              var s = ae ? ae.createHTML(e) : e;
              try {
                t = new K().parseFromString(s, 'text/html');
              } catch (e) {}
              if (!t || !t.documentElement) {
                var i = (t = oe.createHTMLDocument('')).body;
                i.parentNode.removeChild(i.parentNode.firstElementChild),
                  (i.outerHTML = s);
              }
              return (
                e &&
                  n &&
                  t.body.insertBefore(
                    a.createTextNode(n),
                    t.body.childNodes[0] || null,
                  ),
                le.call(t, Ne ? 'html' : 'body')[0]
              );
            },
            ot = function(e) {
              return ue.call(
                e.ownerDocument || e,
                e,
                c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT,
                function() {
                  return c.FILTER_ACCEPT;
                },
                !1,
              );
            },
            ut = function(e) {
              return !(
                e instanceof W ||
                e instanceof G ||
                ('string' == typeof e.nodeName &&
                  'string' == typeof e.textContent &&
                  'function' == typeof e.removeChild &&
                  e.attributes instanceof E &&
                  'function' == typeof e.removeAttribute &&
                  'function' == typeof e.setAttribute &&
                  'string' == typeof e.namespaceURI &&
                  'function' == typeof e.insertBefore)
              );
            },
            lt = function(e) {
              return 'object' === (void 0 === u ? 'undefined' : H(u))
                ? e instanceof u
                : e &&
                    'object' === (void 0 === e ? 'undefined' : H(e)) &&
                    'number' == typeof e.nodeType &&
                    'string' == typeof e.nodeName;
            },
            ct = function(e, t, r) {
              me[e] &&
                p(me[e], function(e) {
                  e.call(n, t, r, Ze);
                });
            },
            ht = function(e) {
              var t = void 0;
              if ((ct('beforeSanitizeElements', e, null), ut(e)))
                return at(e), !0;
              if (g(e.nodeName, /[\u0080-\uFFFF]/)) return at(e), !0;
              var r = d(e.nodeName);
              if (
                (ct('uponSanitizeElement', e, { tagName: r, allowedTags: ve }),
                !lt(e.firstElementChild) &&
                  (!lt(e.content) || !lt(e.content.firstElementChild)) &&
                  x(/<[/\w]/g, e.innerHTML) &&
                  x(/<[/\w]/g, e.textContent))
              )
                return at(e), !0;
              if (!ve[r] || Ce[r]) {
                if (ze && !$e[r]) {
                  var a = ne(e),
                    s = te(e);
                  if (s && a)
                    for (var i = s.length - 1; i >= 0; --i)
                      a.insertBefore(Q(s[i], !0), ee(e));
                }
                return at(e), !0;
              }
              return e instanceof l && !rt(e)
                ? (at(e), !0)
                : ('noscript' !== r && 'noembed' !== r) ||
                  !x(/<\/no(script|embed)/i, e.innerHTML)
                ? (Se &&
                    3 === e.nodeType &&
                    ((t = e.textContent),
                    (t = y(t, fe, ' ')),
                    (t = y(t, de, ' ')),
                    e.textContent !== t &&
                      (f(n.removed, { element: e.cloneNode() }),
                      (e.textContent = t))),
                  ct('afterSanitizeElements', e, null),
                  !1)
                : (at(e), !0);
            },
            pt = function(e, t, n) {
              if (Me && ('id' === t || 'name' === t) && (n in a || n in We))
                return !1;
              if (Fe && x(ge, t));
              else if (_e && x(ye, t));
              else {
                if (!Ae[t] || ke[t]) return !1;
                if (Ye[t]);
                else if (x(xe, y(n, be, '')));
                else if (
                  ('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
                  'script' === e ||
                  0 !== D(n, 'data:') ||
                  !qe[e]
                )
                  if (je && !x(De, y(n, be, '')));
                  else if (n) return !1;
              }
              return !0;
            },
            mt = function(e) {
              var t = void 0,
                r = void 0,
                a = void 0,
                s = void 0;
              ct('beforeSanitizeAttributes', e, null);
              var i = e.attributes;
              if (i) {
                var o = {
                  attrName: '',
                  attrValue: '',
                  keepAttr: !0,
                  allowedAttributes: Ae,
                };
                for (s = i.length; s--; ) {
                  var u = (t = i[s]),
                    l = u.name,
                    c = u.namespaceURI;
                  if (
                    ((r = b(t.value)),
                    (a = d(l)),
                    (o.attrName = a),
                    (o.attrValue = r),
                    (o.keepAttr = !0),
                    (o.forceKeepAttr = void 0),
                    ct('uponSanitizeAttribute', e, o),
                    (r = o.attrValue),
                    !o.forceKeepAttr && (st(l, e), o.keepAttr))
                  )
                    if (x(/\/>/i, r)) st(l, e);
                    else {
                      Se && ((r = y(r, fe, ' ')), (r = y(r, de, ' ')));
                      var h = e.nodeName.toLowerCase();
                      if (pt(h, a, r))
                        try {
                          c ? e.setAttributeNS(c, l, r) : e.setAttribute(l, r),
                            m(n.removed);
                        } catch (e) {}
                    }
                }
                ct('afterSanitizeAttributes', e, null);
              }
            },
            ft = function e(t) {
              var n = void 0,
                r = ot(t);
              for (ct('beforeSanitizeShadowDOM', t, null); (n = r.nextNode()); )
                ct('uponSanitizeShadowNode', n, null),
                  ht(n) || (n.content instanceof i && e(n.content), mt(n));
              ct('afterSanitizeShadowDOM', t, null);
            };
          return (
            (n.sanitize = function(e, a) {
              var s = void 0,
                o = void 0,
                l = void 0,
                c = void 0,
                h = void 0;
              if ((e || (e = '\x3c!--\x3e'), 'string' != typeof e && !lt(e))) {
                if ('function' != typeof e.toString)
                  throw v('toString is not a function');
                if ('string' != typeof (e = e.toString()))
                  throw v('dirty is not a string, aborting');
              }
              if (!n.isSupported) {
                if (
                  'object' === H(t.toStaticHTML) ||
                  'function' == typeof t.toStaticHTML
                ) {
                  if ('string' == typeof e) return t.toStaticHTML(e);
                  if (lt(e)) return t.toStaticHTML(e.outerHTML);
                }
                return e;
              }
              if (
                (Oe || Ge(a),
                (n.removed = []),
                'string' == typeof e && (Ue = !1),
                Ue)
              );
              else if (e instanceof u)
                (1 ===
                  (o = (s = it('\x3c!----\x3e')).ownerDocument.importNode(
                    e,
                    !0,
                  )).nodeType &&
                  'BODY' === o.nodeName) ||
                'HTML' === o.nodeName
                  ? (s = o)
                  : s.appendChild(o);
              else {
                if (!Be && !Se && !Ne && -1 === e.indexOf('<'))
                  return ae && Ie ? ae.createHTML(e) : e;
                if (!(s = it(e))) return Be ? null : se;
              }
              s && Te && at(s.firstChild);
              for (var p = ot(Ue ? e : s); (l = p.nextNode()); )
                (3 === l.nodeType && l === c) ||
                  ht(l) ||
                  (l.content instanceof i && ft(l.content), mt(l), (c = l));
              if (((c = null), Ue)) return e;
              if (Be) {
                if (Re)
                  for (h = ce.call(s.ownerDocument); s.firstChild; )
                    h.appendChild(s.firstChild);
                else h = s;
                return Pe && (h = he.call(r, h, !0)), h;
              }
              var m = Ne ? s.outerHTML : s.innerHTML;
              return (
                Se && ((m = y(m, fe, ' ')), (m = y(m, de, ' '))),
                ae && Ie ? ae.createHTML(m) : m
              );
            }),
            (n.setConfig = function(e) {
              Ge(e), (Oe = !0);
            }),
            (n.clearConfig = function() {
              (Ze = null), (Oe = !1);
            }),
            (n.isValidAttribute = function(e, t, n) {
              Ze || Ge({});
              var r = d(e),
                a = d(t);
              return pt(r, a, n);
            }),
            (n.addHook = function(e, t) {
              'function' == typeof t && ((me[e] = me[e] || []), f(me[e], t));
            }),
            (n.removeHook = function(e) {
              me[e] && m(me[e]);
            }),
            (n.removeHooks = function(e) {
              me[e] && (me[e] = []);
            }),
            (n.removeAllHooks = function() {
              me = {};
            }),
            n
          );
        })();
      })();
    },
    47: function(e, t, n) {
      e.exports =
        window.DOMPurify || (window.DOMPurify = n(40).default || n(40));
    },
    48: function(e, t, n) {
      e.exports = (function() {
        'use strict';
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function t(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        function n(e, n) {
          var r;
          if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
            if (
              Array.isArray(e) ||
              (r = (function(e, n) {
                if (e) {
                  if ('string' == typeof e) return t(e, n);
                  var r = Object.prototype.toString.call(e).slice(8, -1);
                  return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                      ? Array.from(e)
                      : 'Arguments' === r ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? t(e, n)
                      : void 0
                  );
                }
              })(e)) ||
              (n && e && 'number' == typeof e.length)
            ) {
              r && (e = r);
              var a = 0;
              return function() {
                return a >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[a++] };
              };
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          }
          return (r = e[Symbol.iterator]()).next.bind(r);
        }
        var r = (function(e) {
            var t = { exports: {} };
            return e(t, t.exports), t.exports;
          })(function(e) {
            function t() {
              return {
                baseUrl: null,
                breaks: !1,
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
            e.exports = {
              defaults: {
                baseUrl: null,
                breaks: !1,
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
              },
              getDefaults: t,
              changeDefaults: function(t) {
                e.exports.defaults = t;
              },
            };
          }),
          a = /[&<>"']/,
          s = /[&<>"']/g,
          i = /[<>"']|&(?!#?\w+;)/,
          o = /[<>"']|&(?!#?\w+;)/g,
          u = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          },
          l = function(e) {
            return u[e];
          },
          c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
        function h(e) {
          return e.replace(c, function(e, t) {
            return 'colon' === (t = t.toLowerCase())
              ? ':'
              : '#' === t.charAt(0)
              ? 'x' === t.charAt(1)
                ? String.fromCharCode(parseInt(t.substring(2), 16))
                : String.fromCharCode(+t.substring(1))
              : '';
          });
        }
        var p = /(^|[^\[])\^/g,
          m = /[^\w:]/g,
          f = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i,
          d = {},
          g = /^[^:]+:\/*[^/]*$/,
          y = /^([^:]+:)[\s\S]*$/,
          D = /^([^:]+:\/*[^/]*)[\s\S]*$/;
        function b(e, t) {
          d[' ' + e] ||
            (g.test(e) ? (d[' ' + e] = e + '/') : (d[' ' + e] = x(e, '/', !0)));
          var n = -1 === (e = d[' ' + e]).indexOf(':');
          return '//' === t.substring(0, 2)
            ? n
              ? t
              : e.replace(y, '$1') + t
            : '/' === t.charAt(0)
            ? n
              ? t
              : e.replace(D, '$1') + t
            : e + t;
        }
        function x(e, t, n) {
          var r = e.length;
          if (0 === r) return '';
          for (var a = 0; a < r; ) {
            var s = e.charAt(r - a - 1);
            if (s !== t || n) {
              if (s === t || !n) break;
              a++;
            } else a++;
          }
          return e.substr(0, r - a);
        }
        var v = function(e, t) {
            if (t) {
              if (a.test(e)) return e.replace(s, l);
            } else if (i.test(e)) return e.replace(o, l);
            return e;
          },
          E = h,
          A = function(e, t) {
            (e = e.source || e), (t = t || '');
            var n = {
              replace: function(t, r) {
                return (
                  (r = (r = r.source || r).replace(p, '$1')),
                  (e = e.replace(t, r)),
                  n
                );
              },
              getRegex: function() {
                return new RegExp(e, t);
              },
            };
            return n;
          },
          w = function(e, t, n) {
            if (e) {
              var r;
              try {
                r = decodeURIComponent(h(n))
                  .replace(m, '')
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
            t && !f.test(n) && (n = b(t, n));
            try {
              n = encodeURI(n).replace(/%25/g, '%');
            } catch (e) {
              return null;
            }
            return n;
          },
          C = { exec: function() {} },
          k = function(e) {
            for (var t, n, r = 1; r < arguments.length; r++)
              for (n in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
          _ = function(e, t) {
            var n = e
                .replace(/\|/g, function(e, t, n) {
                  for (var r = !1, a = t; --a >= 0 && '\\' === n[a]; ) r = !r;
                  return r ? '|' : ' |';
                })
                .split(/ \|/),
              r = 0;
            if (n.length > t) n.splice(t);
            else for (; n.length < t; ) n.push('');
            for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|');
            return n;
          },
          F = x,
          j = function(e, t) {
            if (-1 === e.indexOf(t[1])) return -1;
            for (var n = e.length, r = 0, a = 0; a < n; a++)
              if ('\\' === e[a]) a++;
              else if (e[a] === t[0]) r++;
              else if (e[a] === t[1] && --r < 0) return a;
            return -1;
          },
          S = function(e) {
            e &&
              e.sanitize &&
              !e.silent &&
              console.warn(
                'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options',
              );
          },
          N = function(e, t) {
            if (t < 1) return '';
            for (var n = ''; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e);
            return n + e;
          },
          O = r.defaults,
          T = F,
          B = _,
          R = v,
          P = j;
        function I(e, t, n) {
          var r = t.href,
            a = t.title ? R(t.title) : null,
            s = e[1].replace(/\\([\[\]])/g, '$1');
          return '!' !== e[0].charAt(0)
            ? { type: 'link', raw: n, href: r, title: a, text: s }
            : { type: 'image', raw: n, href: r, title: a, text: R(s) };
        }
        var M = (function() {
            function e(e) {
              this.options = e || O;
            }
            var t = e.prototype;
            return (
              (t.space = function(e) {
                var t = this.rules.block.newline.exec(e);
                if (t)
                  return t[0].length > 1
                    ? { type: 'space', raw: t[0] }
                    : { raw: '\n' };
              }),
              (t.code = function(e) {
                var t = this.rules.block.code.exec(e);
                if (t) {
                  var n = t[0].replace(/^ {1,4}/gm, '');
                  return {
                    type: 'code',
                    raw: t[0],
                    codeBlockStyle: 'indented',
                    text: this.options.pedantic ? n : T(n, '\n'),
                  };
                }
              }),
              (t.fences = function(e) {
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
              (t.heading = function(e) {
                var t = this.rules.block.heading.exec(e);
                if (t) {
                  var n = t[2].trim();
                  if (/#$/.test(n)) {
                    var r = T(n, '#');
                    this.options.pedantic
                      ? (n = r.trim())
                      : (r && !/ $/.test(r)) || (n = r.trim());
                  }
                  return {
                    type: 'heading',
                    raw: t[0],
                    depth: t[1].length,
                    text: n,
                  };
                }
              }),
              (t.nptable = function(e) {
                var t = this.rules.block.nptable.exec(e);
                if (t) {
                  var n = {
                    type: 'table',
                    header: B(t[1].replace(/^ *| *\| *$/g, '')),
                    align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: t[3] ? t[3].replace(/\n$/, '').split('\n') : [],
                    raw: t[0],
                  };
                  if (n.header.length === n.align.length) {
                    var r,
                      a = n.align.length;
                    for (r = 0; r < a; r++)
                      /^ *-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'right')
                        : /^ *:-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'center')
                        : /^ *:-+ *$/.test(n.align[r])
                        ? (n.align[r] = 'left')
                        : (n.align[r] = null);
                    for (a = n.cells.length, r = 0; r < a; r++)
                      n.cells[r] = B(n.cells[r], n.header.length);
                    return n;
                  }
                }
              }),
              (t.hr = function(e) {
                var t = this.rules.block.hr.exec(e);
                if (t) return { type: 'hr', raw: t[0] };
              }),
              (t.blockquote = function(e) {
                var t = this.rules.block.blockquote.exec(e);
                if (t) {
                  var n = t[0].replace(/^ *> ?/gm, '');
                  return { type: 'blockquote', raw: t[0], text: n };
                }
              }),
              (t.list = function(e) {
                var t = this.rules.block.list.exec(e);
                if (t) {
                  var n,
                    r,
                    a,
                    s,
                    i,
                    o,
                    u,
                    l,
                    c,
                    h = t[0],
                    p = t[2],
                    m = p.length > 1,
                    f = {
                      type: 'list',
                      raw: h,
                      ordered: m,
                      start: m ? +p.slice(0, -1) : '',
                      loose: !1,
                      items: [],
                    },
                    d = t[0].match(this.rules.block.item),
                    g = !1,
                    y = d.length;
                  a = this.rules.block.listItemStart.exec(d[0]);
                  for (var D = 0; D < y; D++) {
                    if (
                      ((h = n = d[D]),
                      this.options.pedantic ||
                        ((c = n.match(
                          new RegExp(
                            '\\n\\s*\\n {0,' + (a[0].length - 1) + '}\\S',
                          ),
                        )) &&
                          ((i =
                            n.length -
                            c.index +
                            d.slice(D + 1).join('\n').length),
                          (f.raw = f.raw.substring(0, f.raw.length - i)),
                          (h = n = n.substring(0, c.index)),
                          (y = D + 1))),
                      D !== y - 1)
                    ) {
                      if (
                        ((s = this.rules.block.listItemStart.exec(d[D + 1])),
                        this.options.pedantic
                          ? s[1].length > a[1].length
                          : s[1].length >= a[0].length || s[1].length > 3)
                      ) {
                        d.splice(
                          D,
                          2,
                          d[D] +
                            (!this.options.pedantic &&
                            s[1].length < a[0].length &&
                            !d[D].match(/\n$/)
                              ? ''
                              : '\n') +
                            d[D + 1],
                        ),
                          D--,
                          y--;
                        continue;
                      }
                      (!this.options.pedantic || this.options.smartLists
                        ? s[2][s[2].length - 1] !== p[p.length - 1]
                        : m === (1 === s[2].length)) &&
                        ((i = d.slice(D + 1).join('\n').length),
                        (f.raw = f.raw.substring(0, f.raw.length - i)),
                        (D = y - 1)),
                        (a = s);
                    }
                    (r = n.length),
                      ~(n = n.replace(/^ *([*+-]|\d+[.)]) ?/, '')).indexOf(
                        '\n ',
                      ) &&
                        ((r -= n.length),
                        (n = this.options.pedantic
                          ? n.replace(/^ {1,4}/gm, '')
                          : n.replace(
                              new RegExp('^ {1,' + r + '}', 'gm'),
                              '',
                            ))),
                      (n = T(n, '\n')),
                      D !== y - 1 && (h += '\n'),
                      (o = g || /\n\n(?!\s*$)/.test(h)),
                      D !== y - 1 &&
                        ((g = '\n\n' === h.slice(-2)), o || (o = g)),
                      o && (f.loose = !0),
                      this.options.gfm &&
                        ((l = void 0),
                        (u = /^\[[ xX]\] /.test(n)) &&
                          ((l = ' ' !== n[1]),
                          (n = n.replace(/^\[[ xX]\] +/, '')))),
                      f.items.push({
                        type: 'list_item',
                        raw: h,
                        task: u,
                        checked: l,
                        loose: o,
                        text: n,
                      });
                  }
                  return f;
                }
              }),
              (t.html = function(e) {
                var t = this.rules.block.html.exec(e);
                if (t)
                  return {
                    type: this.options.sanitize ? 'paragraph' : 'html',
                    raw: t[0],
                    pre:
                      !this.options.sanitizer &&
                      ('pre' === t[1] || 'script' === t[1] || 'style' === t[1]),
                    text: this.options.sanitize
                      ? this.options.sanitizer
                        ? this.options.sanitizer(t[0])
                        : R(t[0])
                      : t[0],
                  };
              }),
              (t.def = function(e) {
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
              (t.table = function(e) {
                var t = this.rules.block.table.exec(e);
                if (t) {
                  var n = {
                    type: 'table',
                    header: B(t[1].replace(/^ *| *\| *$/g, '')),
                    align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: t[3] ? t[3].replace(/\n$/, '').split('\n') : [],
                  };
                  if (n.header.length === n.align.length) {
                    n.raw = t[0];
                    var r,
                      a = n.align.length;
                    for (r = 0; r < a; r++)
                      /^ *-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'right')
                        : /^ *:-+: *$/.test(n.align[r])
                        ? (n.align[r] = 'center')
                        : /^ *:-+ *$/.test(n.align[r])
                        ? (n.align[r] = 'left')
                        : (n.align[r] = null);
                    for (a = n.cells.length, r = 0; r < a; r++)
                      n.cells[r] = B(
                        n.cells[r].replace(/^ *\| *| *\| *$/g, ''),
                        n.header.length,
                      );
                    return n;
                  }
                }
              }),
              (t.lheading = function(e) {
                var t = this.rules.block.lheading.exec(e);
                if (t)
                  return {
                    type: 'heading',
                    raw: t[0],
                    depth: '=' === t[2].charAt(0) ? 1 : 2,
                    text: t[1],
                  };
              }),
              (t.paragraph = function(e) {
                var t = this.rules.block.paragraph.exec(e);
                if (t)
                  return {
                    type: 'paragraph',
                    raw: t[0],
                    text:
                      '\n' === t[1].charAt(t[1].length - 1)
                        ? t[1].slice(0, -1)
                        : t[1],
                  };
              }),
              (t.text = function(e) {
                var t = this.rules.block.text.exec(e);
                if (t) return { type: 'text', raw: t[0], text: t[0] };
              }),
              (t.escape = function(e) {
                var t = this.rules.inline.escape.exec(e);
                if (t) return { type: 'escape', raw: t[0], text: R(t[1]) };
              }),
              (t.tag = function(e, t, n) {
                var r = this.rules.inline.tag.exec(e);
                if (r)
                  return (
                    !t && /^<a /i.test(r[0])
                      ? (t = !0)
                      : t && /^<\/a>/i.test(r[0]) && (t = !1),
                    !n && /^<(pre|code|kbd|script)(\s|>)/i.test(r[0])
                      ? (n = !0)
                      : n &&
                        /^<\/(pre|code|kbd|script)(\s|>)/i.test(r[0]) &&
                        (n = !1),
                    {
                      type: this.options.sanitize ? 'text' : 'html',
                      raw: r[0],
                      inLink: t,
                      inRawBlock: n,
                      text: this.options.sanitize
                        ? this.options.sanitizer
                          ? this.options.sanitizer(r[0])
                          : R(r[0])
                        : r[0],
                    }
                  );
              }),
              (t.link = function(e) {
                var t = this.rules.inline.link.exec(e);
                if (t) {
                  var n = t[2].trim();
                  if (!this.options.pedantic && /^</.test(n)) {
                    if (!/>$/.test(n)) return;
                    var r = T(n.slice(0, -1), '\\');
                    if ((n.length - r.length) % 2 == 0) return;
                  } else {
                    var a = P(t[2], '()');
                    if (a > -1) {
                      var s =
                        (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + a;
                      (t[2] = t[2].substring(0, a)),
                        (t[0] = t[0].substring(0, s).trim()),
                        (t[3] = '');
                    }
                  }
                  var i = t[2],
                    o = '';
                  if (this.options.pedantic) {
                    var u = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
                    u && ((i = u[1]), (o = u[3]));
                  } else o = t[3] ? t[3].slice(1, -1) : '';
                  return (
                    (i = i.trim()),
                    /^</.test(i) &&
                      (i =
                        this.options.pedantic && !/>$/.test(n)
                          ? i.slice(1)
                          : i.slice(1, -1)),
                    I(
                      t,
                      {
                        href: i
                          ? i.replace(this.rules.inline._escapes, '$1')
                          : i,
                        title: o
                          ? o.replace(this.rules.inline._escapes, '$1')
                          : o,
                      },
                      t[0],
                    )
                  );
                }
              }),
              (t.reflink = function(e, t) {
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
                  return I(n, r, n[0]);
                }
              }),
              (t.emStrong = function(e, t, n) {
                void 0 === n && (n = '');
                var r = this.rules.inline.emStrong.lDelim.exec(e);
                if (
                  r &&
                  (!r[3] ||
                    !n.match(
                      /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/,
                    ))
                ) {
                  var a = r[1] || r[2] || '';
                  if (
                    !a ||
                    (a && ('' === n || this.rules.inline.punctuation.exec(n)))
                  ) {
                    var s,
                      i,
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
                      if ((s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]))
                        if (((i = s.length), r[3] || r[4])) u += i;
                        else if (!((r[5] || r[6]) && o % 3) || (o + i) % 3) {
                          if (!((u -= i) > 0)) {
                            if (
                              (u + l - i <= 0 &&
                                !t.slice(c.lastIndex).match(c) &&
                                (i = Math.min(i, i + u + l)),
                              Math.min(o, i) % 2)
                            )
                              return {
                                type: 'em',
                                raw: e.slice(0, o + r.index + i + 1),
                                text: e.slice(1, o + r.index + i),
                              };
                            if (Math.min(o, i) % 2 == 0)
                              return {
                                type: 'strong',
                                raw: e.slice(0, o + r.index + i + 1),
                                text: e.slice(2, o + r.index + i - 1),
                              };
                          }
                        } else l += i;
                  }
                }
              }),
              (t.codespan = function(e) {
                var t = this.rules.inline.code.exec(e);
                if (t) {
                  var n = t[2].replace(/\n/g, ' '),
                    r = /[^ ]/.test(n),
                    a = /^ /.test(n) && / $/.test(n);
                  return (
                    r && a && (n = n.substring(1, n.length - 1)),
                    (n = R(n, !0)),
                    { type: 'codespan', raw: t[0], text: n }
                  );
                }
              }),
              (t.br = function(e) {
                var t = this.rules.inline.br.exec(e);
                if (t) return { type: 'br', raw: t[0] };
              }),
              (t.del = function(e) {
                var t = this.rules.inline.del.exec(e);
                if (t) return { type: 'del', raw: t[0], text: t[2] };
              }),
              (t.autolink = function(e, t) {
                var n,
                  r,
                  a = this.rules.inline.autolink.exec(e);
                if (a)
                  return (
                    (r =
                      '@' === a[2]
                        ? 'mailto:' +
                          (n = R(this.options.mangle ? t(a[1]) : a[1]))
                        : (n = R(a[1]))),
                    {
                      type: 'link',
                      raw: a[0],
                      text: n,
                      href: r,
                      tokens: [{ type: 'text', raw: n, text: n }],
                    }
                  );
              }),
              (t.url = function(e, t) {
                var n;
                if ((n = this.rules.inline.url.exec(e))) {
                  var r, a;
                  if ('@' === n[2])
                    a =
                      'mailto:' + (r = R(this.options.mangle ? t(n[0]) : n[0]));
                  else {
                    var s;
                    do {
                      (s = n[0]),
                        (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
                    } while (s !== n[0]);
                    (r = R(n[0])), (a = 'www.' === n[1] ? 'http://' + r : r);
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
              (t.inlineText = function(e, t, n) {
                var r,
                  a = this.rules.inline.text.exec(e);
                if (a)
                  return (
                    (r = t
                      ? this.options.sanitize
                        ? this.options.sanitizer
                          ? this.options.sanitizer(a[0])
                          : R(a[0])
                        : a[0]
                      : R(this.options.smartypants ? n(a[0]) : a[0])),
                    { type: 'text', raw: a[0], text: r }
                  );
              }),
              e
            );
          })(),
          z = C,
          U = A,
          L = k,
          $ = {
            newline: /^(?: *(?:\n|$))+/,
            code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
            hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
            html:
              '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))',
            def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
            nptable: z,
            table: z,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
          };
        ($.def = U($.def)
          .replace('label', $._label)
          .replace('title', $._title)
          .getRegex()),
          ($.bullet = /(?:[*+-]|\d{1,9}[.)])/),
          ($.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/),
          ($.item = U($.item, 'gm')
            .replace(/bull/g, $.bullet)
            .getRegex()),
          ($.listItemStart = U(/^( *)(bull) */)
            .replace('bull', $.bullet)
            .getRegex()),
          ($.list = U($.list)
            .replace(/bull/g, $.bullet)
            .replace(
              'hr',
              '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
            )
            .replace('def', '\\n+(?=' + $.def.source + ')')
            .getRegex()),
          ($._tag =
            'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
          ($._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
          ($.html = U($.html, 'i')
            .replace('comment', $._comment)
            .replace('tag', $._tag)
            .replace(
              'attribute',
              / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
            )
            .getRegex()),
          ($.paragraph = U($._paragraph)
            .replace('hr', $.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)',
            )
            .replace('tag', $._tag)
            .getRegex()),
          ($.blockquote = U($.blockquote)
            .replace('paragraph', $.paragraph)
            .getRegex()),
          ($.normal = L({}, $)),
          ($.gfm = L({}, $.normal, {
            nptable:
              '^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
            table:
              '^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
          })),
          ($.gfm.nptable = U($.gfm.nptable)
            .replace('hr', $.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)',
            )
            .replace('tag', $._tag)
            .getRegex()),
          ($.gfm.table = U($.gfm.table)
            .replace('hr', $.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
              'html',
              '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)',
            )
            .replace('tag', $._tag)
            .getRegex()),
          ($.pedantic = L({}, $.normal, {
            html: U(
              '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
            )
              .replace('comment', $._comment)
              .replace(
                /tag/g,
                '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
              )
              .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: z,
            paragraph: U($.normal._paragraph)
              .replace('hr', $.hr)
              .replace('heading', ' *#{1,6} *[^\n]')
              .replace('lheading', $.lheading)
              .replace('blockquote', ' {0,3}>')
              .replace('|fences', '')
              .replace('|list', '')
              .replace('|html', '')
              .getRegex(),
          }));
        var q = {
          escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
          autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
          url: z,
          tag:
            '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
          link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
          reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
          nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
          reflinkSearch: 'reflink|nolink(?!\\()',
          emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst: /\_\_[^_]*?\*[^_]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
            rDelimUnd: /\*\*[^*]*?\_[^*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
          },
          code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
          br: /^( {2,}|\\)\n(?!\s*$)/,
          del: z,
          text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
          punctuation: /^([\spunctuation])/,
          _punctuation: '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~',
        };
        (q.punctuation = U(q.punctuation)
          .replace(/punctuation/g, q._punctuation)
          .getRegex()),
          (q.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
          (q.escapedEmSt = /\\\*|\\_/g),
          (q._comment = U($._comment)
            .replace('(?:--\x3e|$)', '--\x3e')
            .getRegex()),
          (q.emStrong.lDelim = U(q.emStrong.lDelim)
            .replace(/punct/g, q._punctuation)
            .getRegex()),
          (q.emStrong.rDelimAst = U(q.emStrong.rDelimAst, 'g')
            .replace(/punct/g, q._punctuation)
            .getRegex()),
          (q.emStrong.rDelimUnd = U(q.emStrong.rDelimUnd, 'g')
            .replace(/punct/g, q._punctuation)
            .getRegex()),
          (q._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
          (q._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
          (q._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
          (q.autolink = U(q.autolink)
            .replace('scheme', q._scheme)
            .replace('email', q._email)
            .getRegex()),
          (q._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
          (q.tag = U(q.tag)
            .replace('comment', q._comment)
            .replace('attribute', q._attribute)
            .getRegex()),
          (q._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
          (q._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
          (q._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
          (q.link = U(q.link)
            .replace('label', q._label)
            .replace('href', q._href)
            .replace('title', q._title)
            .getRegex()),
          (q.reflink = U(q.reflink)
            .replace('label', q._label)
            .getRegex()),
          (q.reflinkSearch = U(q.reflinkSearch, 'g')
            .replace('reflink', q.reflink)
            .replace('nolink', q.nolink)
            .getRegex()),
          (q.normal = L({}, q)),
          (q.pedantic = L({}, q.normal, {
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
            link: U(/^!?\[(label)\]\((.*?)\)/)
              .replace('label', q._label)
              .getRegex(),
            reflink: U(/^!?\[(label)\]\s*\[([^\]]*)\]/)
              .replace('label', q._label)
              .getRegex(),
          })),
          (q.gfm = L({}, q.normal, {
            escape: U(q.escape)
              .replace('])', '~|])')
              .getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/,
          })),
          (q.gfm.url = U(q.gfm.url, 'i')
            .replace('email', q.gfm._extended_email)
            .getRegex()),
          (q.breaks = L({}, q.gfm, {
            br: U(q.br)
              .replace('{2,}', '*')
              .getRegex(),
            text: U(q.gfm.text)
              .replace('\\b_', '\\b_| {2,}\\n')
              .replace(/\{2,\}/g, '*')
              .getRegex(),
          }));
        var H = { block: $, inline: q },
          Y = r.defaults,
          V = H.block,
          Z = H.inline,
          W = N;
        function G(e) {
          return e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…');
        }
        function K(e) {
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
        var J = (function() {
            function t(e) {
              (this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = e || Y),
                (this.options.tokenizer = this.options.tokenizer || new M()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options);
              var t = { block: V.normal, inline: Z.normal };
              this.options.pedantic
                ? ((t.block = V.pedantic), (t.inline = Z.pedantic))
                : this.options.gfm &&
                  ((t.block = V.gfm),
                  this.options.breaks
                    ? (t.inline = Z.breaks)
                    : (t.inline = Z.gfm)),
                (this.tokenizer.rules = t);
            }
            (t.lex = function(e, n) {
              return new t(n).lex(e);
            }),
              (t.lexInline = function(e, n) {
                return new t(n).inlineTokens(e);
              });
            var n,
              r,
              a,
              s = t.prototype;
            return (
              (s.lex = function(e) {
                return (
                  (e = e.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ')),
                  this.blockTokens(e, this.tokens, !0),
                  this.inline(this.tokens),
                  this.tokens
                );
              }),
              (s.blockTokens = function(e, t, n) {
                var r, a, s, i;
                for (
                  void 0 === t && (t = []),
                    void 0 === n && (n = !0),
                    this.options.pedantic && (e = e.replace(/^ +$/gm, ''));
                  e;

                )
                  if ((r = this.tokenizer.space(e)))
                    (e = e.substring(r.raw.length)), r.type && t.push(r);
                  else if ((r = this.tokenizer.code(e)))
                    (e = e.substring(r.raw.length)),
                      (i = t[t.length - 1]) && 'paragraph' === i.type
                        ? ((i.raw += '\n' + r.raw), (i.text += '\n' + r.text))
                        : t.push(r);
                  else if ((r = this.tokenizer.fences(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.heading(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.nptable(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.hr(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.blockquote(e)))
                    (e = e.substring(r.raw.length)),
                      (r.tokens = this.blockTokens(r.text, [], n)),
                      t.push(r);
                  else if ((r = this.tokenizer.list(e))) {
                    for (
                      e = e.substring(r.raw.length), s = r.items.length, a = 0;
                      a < s;
                      a++
                    )
                      r.items[a].tokens = this.blockTokens(
                        r.items[a].text,
                        [],
                        !1,
                      );
                    t.push(r);
                  } else if ((r = this.tokenizer.html(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if (n && (r = this.tokenizer.def(e)))
                    (e = e.substring(r.raw.length)),
                      this.tokens.links[r.tag] ||
                        (this.tokens.links[r.tag] = {
                          href: r.href,
                          title: r.title,
                        });
                  else if ((r = this.tokenizer.table(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.lheading(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if (n && (r = this.tokenizer.paragraph(e)))
                    (e = e.substring(r.raw.length)), t.push(r);
                  else if ((r = this.tokenizer.text(e)))
                    (e = e.substring(r.raw.length)),
                      (i = t[t.length - 1]) && 'text' === i.type
                        ? ((i.raw += '\n' + r.raw), (i.text += '\n' + r.text))
                        : t.push(r);
                  else if (e) {
                    var o = 'Infinite loop on byte: ' + e.charCodeAt(0);
                    if (this.options.silent) {
                      console.error(o);
                      break;
                    }
                    throw new Error(o);
                  }
                return t;
              }),
              (s.inline = function(e) {
                var t,
                  n,
                  r,
                  a,
                  s,
                  i,
                  o = e.length;
                for (t = 0; t < o; t++)
                  switch ((i = e[t]).type) {
                    case 'paragraph':
                    case 'text':
                    case 'heading':
                      (i.tokens = []), this.inlineTokens(i.text, i.tokens);
                      break;
                    case 'table':
                      for (
                        i.tokens = { header: [], cells: [] },
                          a = i.header.length,
                          n = 0;
                        n < a;
                        n++
                      )
                        (i.tokens.header[n] = []),
                          this.inlineTokens(i.header[n], i.tokens.header[n]);
                      for (a = i.cells.length, n = 0; n < a; n++)
                        for (
                          s = i.cells[n], i.tokens.cells[n] = [], r = 0;
                          r < s.length;
                          r++
                        )
                          (i.tokens.cells[n][r] = []),
                            this.inlineTokens(s[r], i.tokens.cells[n][r]);
                      break;
                    case 'blockquote':
                      this.inline(i.tokens);
                      break;
                    case 'list':
                      for (a = i.items.length, n = 0; n < a; n++)
                        this.inline(i.items[n].tokens);
                  }
                return e;
              }),
              (s.inlineTokens = function(e, t, n, r) {
                var a, s;
                void 0 === t && (t = []),
                  void 0 === n && (n = !1),
                  void 0 === r && (r = !1);
                var i,
                  o,
                  u,
                  l = e;
                if (this.tokens.links) {
                  var c = Object.keys(this.tokens.links);
                  if (c.length > 0)
                    for (
                      ;
                      null !=
                      (i = this.tokenizer.rules.inline.reflinkSearch.exec(l));

                    )
                      c.includes(i[0].slice(i[0].lastIndexOf('[') + 1, -1)) &&
                        (l =
                          l.slice(0, i.index) +
                          '[' +
                          W('a', i[0].length - 2) +
                          ']' +
                          l.slice(
                            this.tokenizer.rules.inline.reflinkSearch.lastIndex,
                          ));
                }
                for (
                  ;
                  null != (i = this.tokenizer.rules.inline.blockSkip.exec(l));

                )
                  l =
                    l.slice(0, i.index) +
                    '[' +
                    W('a', i[0].length - 2) +
                    ']' +
                    l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                for (
                  ;
                  null != (i = this.tokenizer.rules.inline.escapedEmSt.exec(l));

                )
                  l =
                    l.slice(0, i.index) +
                    '++' +
                    l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
                for (; e; )
                  if ((o || (u = ''), (o = !1), (a = this.tokenizer.escape(e))))
                    (e = e.substring(a.raw.length)), t.push(a);
                  else if ((a = this.tokenizer.tag(e, n, r))) {
                    (e = e.substring(a.raw.length)),
                      (n = a.inLink),
                      (r = a.inRawBlock);
                    var h = t[t.length - 1];
                    h && 'text' === a.type && 'text' === h.type
                      ? ((h.raw += a.raw), (h.text += a.text))
                      : t.push(a);
                  } else if ((a = this.tokenizer.link(e)))
                    (e = e.substring(a.raw.length)),
                      'link' === a.type &&
                        (a.tokens = this.inlineTokens(a.text, [], !0, r)),
                      t.push(a);
                  else if ((a = this.tokenizer.reflink(e, this.tokens.links))) {
                    e = e.substring(a.raw.length);
                    var p = t[t.length - 1];
                    'link' === a.type
                      ? ((a.tokens = this.inlineTokens(a.text, [], !0, r)),
                        t.push(a))
                      : p && 'text' === a.type && 'text' === p.type
                      ? ((p.raw += a.raw), (p.text += a.text))
                      : t.push(a);
                  } else if ((a = this.tokenizer.emStrong(e, l, u)))
                    (e = e.substring(a.raw.length)),
                      (a.tokens = this.inlineTokens(a.text, [], n, r)),
                      t.push(a);
                  else if ((a = this.tokenizer.codespan(e)))
                    (e = e.substring(a.raw.length)), t.push(a);
                  else if ((a = this.tokenizer.br(e)))
                    (e = e.substring(a.raw.length)), t.push(a);
                  else if ((a = this.tokenizer.del(e)))
                    (e = e.substring(a.raw.length)),
                      (a.tokens = this.inlineTokens(a.text, [], n, r)),
                      t.push(a);
                  else if ((a = this.tokenizer.autolink(e, K)))
                    (e = e.substring(a.raw.length)), t.push(a);
                  else if (n || !(a = this.tokenizer.url(e, K))) {
                    if ((a = this.tokenizer.inlineText(e, r, G)))
                      (e = e.substring(a.raw.length)),
                        '_' !== a.raw.slice(-1) && (u = a.raw.slice(-1)),
                        (o = !0),
                        (s = t[t.length - 1]) && 'text' === s.type
                          ? ((s.raw += a.raw), (s.text += a.text))
                          : t.push(a);
                    else if (e) {
                      var m = 'Infinite loop on byte: ' + e.charCodeAt(0);
                      if (this.options.silent) {
                        console.error(m);
                        break;
                      }
                      throw new Error(m);
                    }
                  } else (e = e.substring(a.raw.length)), t.push(a);
                return t;
              }),
              (n = t),
              (a = [
                {
                  key: 'rules',
                  get: function() {
                    return { block: V, inline: Z };
                  },
                },
              ]),
              (r = null) && e(n.prototype, r),
              a && e(n, a),
              t
            );
          })(),
          X = r.defaults,
          Q = w,
          ee = v,
          te = (function() {
            function e(e) {
              this.options = e || X;
            }
            var t = e.prototype;
            return (
              (t.code = function(e, t, n) {
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
                      ee(r, !0) +
                      '">' +
                      (n ? e : ee(e, !0)) +
                      '</code></pre>\n'
                    : '<pre><code>' + (n ? e : ee(e, !0)) + '</code></pre>\n'
                );
              }),
              (t.blockquote = function(e) {
                return '<blockquote>\n' + e + '</blockquote>\n';
              }),
              (t.html = function(e) {
                return e;
              }),
              (t.heading = function(e, t, n, r) {
                return this.options.headerIds
                  ? '<h' +
                      t +
                      ' id="' +
                      this.options.headerPrefix +
                      r.slug(n) +
                      '">' +
                      e +
                      '</h' +
                      t +
                      '>\n'
                  : '<h' + t + '>' + e + '</h' + t + '>\n';
              }),
              (t.hr = function() {
                return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
              }),
              (t.list = function(e, t, n) {
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
              (t.listitem = function(e) {
                return '<li>' + e + '</li>\n';
              }),
              (t.checkbox = function(e) {
                return (
                  '<input ' +
                  (e ? 'checked="" ' : '') +
                  'disabled="" type="checkbox"' +
                  (this.options.xhtml ? ' /' : '') +
                  '> '
                );
              }),
              (t.paragraph = function(e) {
                return '<p>' + e + '</p>\n';
              }),
              (t.table = function(e, t) {
                return (
                  t && (t = '<tbody>' + t + '</tbody>'),
                  '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
                );
              }),
              (t.tablerow = function(e) {
                return '<tr>\n' + e + '</tr>\n';
              }),
              (t.tablecell = function(e, t) {
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
              (t.strong = function(e) {
                return '<strong>' + e + '</strong>';
              }),
              (t.em = function(e) {
                return '<em>' + e + '</em>';
              }),
              (t.codespan = function(e) {
                return '<code>' + e + '</code>';
              }),
              (t.br = function() {
                return this.options.xhtml ? '<br/>' : '<br>';
              }),
              (t.del = function(e) {
                return '<del>' + e + '</del>';
              }),
              (t.link = function(e, t, n) {
                if (
                  null ===
                  (e = Q(this.options.sanitize, this.options.baseUrl, e))
                )
                  return n;
                var r = '<a href="' + ee(e) + '"';
                return (
                  t && (r += ' title="' + t + '"'), (r += '>' + n + '</a>')
                );
              }),
              (t.image = function(e, t, n) {
                if (
                  null ===
                  (e = Q(this.options.sanitize, this.options.baseUrl, e))
                )
                  return n;
                var r = '<img src="' + e + '" alt="' + n + '"';
                return (
                  t && (r += ' title="' + t + '"'),
                  (r += this.options.xhtml ? '/>' : '>')
                );
              }),
              (t.text = function(e) {
                return e;
              }),
              e
            );
          })(),
          ne = (function() {
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
          re = (function() {
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
          ae = r.defaults,
          se = E,
          ie = (function() {
            function e(e) {
              (this.options = e || ae),
                (this.options.renderer = this.options.renderer || new te()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new ne()),
                (this.slugger = new re());
            }
            (e.parse = function(t, n) {
              return new e(n).parse(t);
            }),
              (e.parseInline = function(t, n) {
                return new e(n).parseInline(t);
              });
            var t = e.prototype;
            return (
              (t.parse = function(e, t) {
                void 0 === t && (t = !0);
                var n,
                  r,
                  a,
                  s,
                  i,
                  o,
                  u,
                  l,
                  c,
                  h,
                  p,
                  m,
                  f,
                  d,
                  g,
                  y,
                  D,
                  b,
                  x = '',
                  v = e.length;
                for (n = 0; n < v; n++)
                  switch ((h = e[n]).type) {
                    case 'space':
                      continue;
                    case 'hr':
                      x += this.renderer.hr();
                      continue;
                    case 'heading':
                      x += this.renderer.heading(
                        this.parseInline(h.tokens),
                        h.depth,
                        se(this.parseInline(h.tokens, this.textRenderer)),
                        this.slugger,
                      );
                      continue;
                    case 'code':
                      x += this.renderer.code(h.text, h.lang, h.escaped);
                      continue;
                    case 'table':
                      for (
                        l = '', u = '', s = h.header.length, r = 0;
                        r < s;
                        r++
                      )
                        u += this.renderer.tablecell(
                          this.parseInline(h.tokens.header[r]),
                          { header: !0, align: h.align[r] },
                        );
                      for (
                        l += this.renderer.tablerow(u),
                          c = '',
                          s = h.cells.length,
                          r = 0;
                        r < s;
                        r++
                      ) {
                        for (
                          u = '', i = (o = h.tokens.cells[r]).length, a = 0;
                          a < i;
                          a++
                        )
                          u += this.renderer.tablecell(this.parseInline(o[a]), {
                            header: !1,
                            align: h.align[a],
                          });
                        c += this.renderer.tablerow(u);
                      }
                      x += this.renderer.table(l, c);
                      continue;
                    case 'blockquote':
                      (c = this.parse(h.tokens)),
                        (x += this.renderer.blockquote(c));
                      continue;
                    case 'list':
                      for (
                        p = h.ordered,
                          m = h.start,
                          f = h.loose,
                          s = h.items.length,
                          c = '',
                          r = 0;
                        r < s;
                        r++
                      )
                        (y = (g = h.items[r]).checked),
                          (D = g.task),
                          (d = ''),
                          g.task &&
                            ((b = this.renderer.checkbox(y)),
                            f
                              ? g.tokens.length > 0 &&
                                'text' === g.tokens[0].type
                                ? ((g.tokens[0].text =
                                    b + ' ' + g.tokens[0].text),
                                  g.tokens[0].tokens &&
                                    g.tokens[0].tokens.length > 0 &&
                                    'text' === g.tokens[0].tokens[0].type &&
                                    (g.tokens[0].tokens[0].text =
                                      b + ' ' + g.tokens[0].tokens[0].text))
                                : g.tokens.unshift({ type: 'text', text: b })
                              : (d += b)),
                          (d += this.parse(g.tokens, f)),
                          (c += this.renderer.listitem(d, D, y));
                      x += this.renderer.list(c, p, m);
                      continue;
                    case 'html':
                      x += this.renderer.html(h.text);
                      continue;
                    case 'paragraph':
                      x += this.renderer.paragraph(this.parseInline(h.tokens));
                      continue;
                    case 'text':
                      for (
                        c = h.tokens ? this.parseInline(h.tokens) : h.text;
                        n + 1 < v && 'text' === e[n + 1].type;

                      )
                        c +=
                          '\n' +
                          ((h = e[++n]).tokens
                            ? this.parseInline(h.tokens)
                            : h.text);
                      x += t ? this.renderer.paragraph(c) : c;
                      continue;
                    default:
                      var E = 'Token with "' + h.type + '" type was not found.';
                      if (this.options.silent) return void console.error(E);
                      throw new Error(E);
                  }
                return x;
              }),
              (t.parseInline = function(e, t) {
                t = t || this.renderer;
                var n,
                  r,
                  a = '',
                  s = e.length;
                for (n = 0; n < s; n++)
                  switch ((r = e[n]).type) {
                    case 'escape':
                      a += t.text(r.text);
                      break;
                    case 'html':
                      a += t.html(r.text);
                      break;
                    case 'link':
                      a += t.link(
                        r.href,
                        r.title,
                        this.parseInline(r.tokens, t),
                      );
                      break;
                    case 'image':
                      a += t.image(r.href, r.title, r.text);
                      break;
                    case 'strong':
                      a += t.strong(this.parseInline(r.tokens, t));
                      break;
                    case 'em':
                      a += t.em(this.parseInline(r.tokens, t));
                      break;
                    case 'codespan':
                      a += t.codespan(r.text);
                      break;
                    case 'br':
                      a += t.br();
                      break;
                    case 'del':
                      a += t.del(this.parseInline(r.tokens, t));
                      break;
                    case 'text':
                      a += t.text(r.text);
                      break;
                    default:
                      var i = 'Token with "' + r.type + '" type was not found.';
                      if (this.options.silent) return void console.error(i);
                      throw new Error(i);
                  }
                return a;
              }),
              e
            );
          })(),
          oe = k,
          ue = S,
          le = v,
          ce = r.getDefaults,
          he = r.changeDefaults,
          pe = r.defaults;
        function me(e, t, n) {
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
            (t = oe({}, me.defaults, t || {})),
            ue(t),
            n)
          ) {
            var r,
              a = t.highlight;
            try {
              r = J.lex(e, t);
            } catch (e) {
              return n(e);
            }
            var s = function(e) {
              var s;
              if (!e)
                try {
                  s = ie.parse(r, t);
                } catch (t) {
                  e = t;
                }
              return (t.highlight = a), e ? n(e) : n(null, s);
            };
            if (!a || a.length < 3) return s();
            if ((delete t.highlight, !r.length)) return s();
            var i = 0;
            return (
              me.walkTokens(r, function(e) {
                'code' === e.type &&
                  (i++,
                  setTimeout(function() {
                    a(e.text, e.lang, function(t, n) {
                      if (t) return s(t);
                      null != n &&
                        n !== e.text &&
                        ((e.text = n), (e.escaped = !0)),
                        0 == --i && s();
                    });
                  }, 0));
              }),
              void (0 === i && s())
            );
          }
          try {
            var o = J.lex(e, t);
            return (
              t.walkTokens && me.walkTokens(o, t.walkTokens), ie.parse(o, t)
            );
          } catch (e) {
            if (
              ((e.message +=
                '\nPlease report this to https://github.com/markedjs/marked.'),
              t.silent)
            )
              return (
                '<p>An error occurred:</p><pre>' +
                le(e.message + '', !0) +
                '</pre>'
              );
            throw e;
          }
        }
        return (
          (me.options = me.setOptions = function(e) {
            return oe(me.defaults, e), he(me.defaults), me;
          }),
          (me.getDefaults = ce),
          (me.defaults = pe),
          (me.use = function(e) {
            var t = oe({}, e);
            if (
              (e.renderer &&
                (function() {
                  var n = me.defaults.renderer || new te(),
                    r = function(t) {
                      var r = n[t];
                      n[t] = function() {
                        for (
                          var a = arguments.length, s = new Array(a), i = 0;
                          i < a;
                          i++
                        )
                          s[i] = arguments[i];
                        var o = e.renderer[t].apply(n, s);
                        return !1 === o && (o = r.apply(n, s)), o;
                      };
                    };
                  for (var a in e.renderer) r(a);
                  t.renderer = n;
                })(),
              e.tokenizer &&
                (function() {
                  var n = me.defaults.tokenizer || new M(),
                    r = function(t) {
                      var r = n[t];
                      n[t] = function() {
                        for (
                          var a = arguments.length, s = new Array(a), i = 0;
                          i < a;
                          i++
                        )
                          s[i] = arguments[i];
                        var o = e.tokenizer[t].apply(n, s);
                        return !1 === o && (o = r.apply(n, s)), o;
                      };
                    };
                  for (var a in e.tokenizer) r(a);
                  t.tokenizer = n;
                })(),
              e.walkTokens)
            ) {
              var n = me.defaults.walkTokens;
              t.walkTokens = function(t) {
                e.walkTokens(t), n && n(t);
              };
            }
            me.setOptions(t);
          }),
          (me.walkTokens = function(e, t) {
            for (var r, a = n(e); !(r = a()).done; ) {
              var s = r.value;
              switch ((t(s), s.type)) {
                case 'table':
                  for (var i, o = n(s.tokens.header); !(i = o()).done; ) {
                    var u = i.value;
                    me.walkTokens(u, t);
                  }
                  for (var l, c = n(s.tokens.cells); !(l = c()).done; )
                    for (var h, p = n(l.value); !(h = p()).done; ) {
                      var m = h.value;
                      me.walkTokens(m, t);
                    }
                  break;
                case 'list':
                  me.walkTokens(s.items, t);
                  break;
                default:
                  s.tokens && me.walkTokens(s.tokens, t);
              }
            }
          }),
          (me.parseInline = function(e, t) {
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
            (t = oe({}, me.defaults, t || {})), ue(t);
            try {
              var n = J.lexInline(e, t);
              return (
                t.walkTokens && me.walkTokens(n, t.walkTokens),
                ie.parseInline(n, t)
              );
            } catch (e) {
              if (
                ((e.message +=
                  '\nPlease report this to https://github.com/markedjs/marked.'),
                t.silent)
              )
                return (
                  '<p>An error occurred:</p><pre>' +
                  le(e.message + '', !0) +
                  '</pre>'
                );
              throw e;
            }
          }),
          (me.Parser = ie),
          (me.parser = ie.parse),
          (me.Renderer = te),
          (me.TextRenderer = ne),
          (me.Lexer = J),
          (me.lexer = J.lex),
          (me.Tokenizer = M),
          (me.Slugger = re),
          (me.parse = me),
          me
        );
      })();
    },
    49: function(e, t, n) {
      'use strict';
      var r = n(77);
      function a(e, t, n) {
        if (3 === arguments.length) return a.set(e, t, n);
        if (2 === arguments.length) return a.get(e, t);
        var r = a.bind(a, e);
        for (var s in a) a.hasOwnProperty(s) && (r[s] = a[s].bind(r, e));
        return r;
      }
      (e.exports = a),
        (a.get = function(e, t) {
          for (
            var n = Array.isArray(t) ? t : a.parse(t), r = 0;
            r < n.length;
            ++r
          ) {
            var s = n[r];
            if ('object' != typeof e || !(s in e))
              throw new Error('Invalid reference token: ' + s);
            e = e[s];
          }
          return e;
        }),
        (a.set = function(e, t, n) {
          var r = Array.isArray(t) ? t : a.parse(t),
            s = r[0];
          if (0 === r.length) throw Error('Can not set the root object');
          for (var i = 0; i < r.length - 1; ++i) {
            var o = r[i];
            '__proto__' !== o &&
              'constructor' !== o &&
              'prototype' !== o &&
              ('-' === o && Array.isArray(e) && (o = e.length),
              (s = r[i + 1]),
              o in e || (s.match(/^(\d+|-)$/) ? (e[o] = []) : (e[o] = {})),
              (e = e[o]));
          }
          return (
            '-' === s && Array.isArray(e) && (s = e.length), (e[s] = n), this
          );
        }),
        (a.remove = function(e, t) {
          var n = Array.isArray(t) ? t : a.parse(t),
            r = n[n.length - 1];
          if (void 0 === r)
            throw new Error('Invalid JSON pointer for remove: "' + t + '"');
          var s = a.get(e, n.slice(0, -1));
          if (Array.isArray(s)) {
            var i = +r;
            if ('' === r && isNaN(i))
              throw new Error('Invalid array index: "' + r + '"');
            Array.prototype.splice.call(s, i, 1);
          } else delete s[r];
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
          var s = [];
          (n =
            n ||
            function(e) {
              var t = Object.prototype.toString.call(e);
              return '[object Object]' === t || '[object Array]' === t;
            }),
            (function e(i) {
              r(i, function(r, i) {
                s.push(String(i)), n(r) ? e(r) : t(r, a.compile(s)), s.pop();
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
    5: function(e, t, n) {
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
    51: function(e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function(e) {
          return '[object Array]' == n.call(e);
        };
    },
    58: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(59),
        i = n(60),
        o = n(5),
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
            return this._json.license ? new s(this._json.license) : null;
          }
          contact() {
            return this._json.contact ? new i(this._json.contact) : null;
          }
        },
        o,
        u,
      );
    },
    59: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
          url() {
            return this._json.url;
          }
        },
        s,
      );
    },
    60: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(4);
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
        s,
      );
    },
    61: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: s } = n(2),
        i = n(3),
        o = n(62),
        u = n(63),
        l = n(5),
        c = n(20),
        h = n(4);
      e.exports = s(
        class extends i {
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
    62: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(5),
        i = n(4);
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
        s,
        i,
      );
    },
    63: function(e, t, n) {
      const r = n(3);
      e.exports = class extends r {};
    },
    64: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: s } = n(2),
        i = n(3),
        o = n(32),
        u = n(66),
        l = n(70),
        c = n(5),
        h = n(20),
        p = n(4);
      e.exports = s(
        class extends i {
          parameters() {
            return r(this._json.parameters, o);
          }
          parameter(e) {
            return a(this._json.parameters, e, o);
          }
          hasParameters() {
            return !!this._json.parameters;
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
        p,
      );
    },
    65: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(5),
        i = n(4);
      e.exports = r(
        class extends a {
          url() {
            return this._json.url;
          }
        },
        s,
        i,
      );
    },
    66: function(e, t, n) {
      const r = n(33);
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
    67: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(5),
        i = n(16),
        o = n(4);
      e.exports = r(
        class extends a {
          name() {
            return this._json.name;
          }
        },
        s,
        i,
        o,
      );
    },
    68: function(e, t, n) {
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
            i = r[0],
            o = r[1],
            u = new s(
              (function(e, t, n) {
                return (3 * (t + n)) / 4 - n;
              })(0, i, o),
            ),
            c = 0,
            h = o > 0 ? i - 4 : i;
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
            var t, n = e.length, a = n % 3, s = [], i = 0, o = n - a;
            i < o;
            i += 16383
          )
            s.push(c(e, i, i + 16383 > o ? o : i + 16383));
          1 === a
            ? ((t = e[n - 1]), s.push(r[t >> 2] + r[(t << 4) & 63] + '=='))
            : 2 === a &&
              ((t = (e[n - 2] << 8) + e[n - 1]),
              s.push(r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + '='));
          return s.join('');
        });
      for (
        var r = [],
          a = [],
          s = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          i =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          o = 0,
          u = i.length;
        o < u;
        ++o
      )
        (r[o] = i[o]), (a[i.charCodeAt(o)] = o);
      function l(e) {
        var t = e.length;
        if (t % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4');
        var n = e.indexOf('=');
        return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
      }
      function c(e, t, n) {
        for (var a, s, i = [], o = t; o < n; o += 3)
          (a =
            ((e[o] << 16) & 16711680) +
            ((e[o + 1] << 8) & 65280) +
            (255 & e[o + 2])),
            i.push(
              r[((s = a) >> 18) & 63] +
                r[(s >> 12) & 63] +
                r[(s >> 6) & 63] +
                r[63 & s],
            );
        return i.join('');
      }
      (a['-'.charCodeAt(0)] = 62), (a['_'.charCodeAt(0)] = 63);
    },
    69: function(e, t) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      (t.read = function(e, t, n, r, a) {
        var s,
          i,
          o = 8 * a - r - 1,
          u = (1 << o) - 1,
          l = u >> 1,
          c = -7,
          h = n ? a - 1 : 0,
          p = n ? -1 : 1,
          m = e[t + h];
        for (
          h += p, s = m & ((1 << -c) - 1), m >>= -c, c += o;
          c > 0;
          s = 256 * s + e[t + h], h += p, c -= 8
        );
        for (
          i = s & ((1 << -c) - 1), s >>= -c, c += r;
          c > 0;
          i = 256 * i + e[t + h], h += p, c -= 8
        );
        if (0 === s) s = 1 - l;
        else {
          if (s === u) return i ? NaN : (1 / 0) * (m ? -1 : 1);
          (i += Math.pow(2, r)), (s -= l);
        }
        return (m ? -1 : 1) * i * Math.pow(2, s - r);
      }),
        (t.write = function(e, t, n, r, a, s) {
          var i,
            o,
            u,
            l = 8 * s - a - 1,
            c = (1 << l) - 1,
            h = c >> 1,
            p = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            m = r ? 0 : s - 1,
            f = r ? 1 : -1,
            d = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
          for (
            t = Math.abs(t),
              isNaN(t) || t === 1 / 0
                ? ((o = isNaN(t) ? 1 : 0), (i = c))
                : ((i = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -i)) < 1 && (i--, (u *= 2)),
                  (t += i + h >= 1 ? p / u : p * Math.pow(2, 1 - h)) * u >= 2 &&
                    (i++, (u /= 2)),
                  i + h >= c
                    ? ((o = 0), (i = c))
                    : i + h >= 1
                    ? ((o = (t * u - 1) * Math.pow(2, a)), (i += h))
                    : ((o = t * Math.pow(2, h - 1) * Math.pow(2, a)), (i = 0)));
            a >= 8;
            e[n + m] = 255 & o, m += f, o /= 256, a -= 8
          );
          for (
            i = (i << a) | o, l += a;
            l > 0;
            e[n + m] = 255 & i, m += f, i /= 256, l -= 8
          );
          e[n + m - f] |= 128 * d;
        });
    },
    7: function(e, t, n) {
      'use strict';
      var r, a, s, i;
      function o(e) {
        return void 0 !== e.url;
      }
      n.d(t, 'b', function() {
        return a;
      }),
        n.d(t, 'c', function() {
          return o;
        }),
        (function(e) {
          (e.http = 'http'),
            (e.ws = 'ws'),
            (e.kafka = 'kafka'),
            (e.amqp = 'amqp'),
            (e.amqp1 = 'amqp1'),
            (e.mqtt = 'mqtt'),
            (e.mqtt5 = 'mqtt5'),
            (e.nats = 'nats'),
            (e.jms = 'jms'),
            (e.sns = 'sns'),
            (e.sqs = 'sqs'),
            (e.stomp = 'stomp'),
            (e.redis = 'redis');
        })(r || (r = {})),
        (function(e) {
          (e.PUBLISH = 'publish'), (e.SUBSCRIBE = 'subscribe');
        })(a || (a = {})),
        (function(e) {
          (e.userPassword = 'User / Password'),
            (e.apiKey = 'API key'),
            (e.X509 = 'X509'),
            (e.symmetricEncryption = 'Symmetric Encryption'),
            (e.asymmetricEncryption = 'Asymmetric Encryption'),
            (e.httpApiKey = 'HTTP API key'),
            (e.http = 'HTTP'),
            (e.oauth2 = 'OAuth2'),
            (e.openIdConnect = 'Open ID');
        })(s || (s = {})),
        (function(e) {
          (e.implicit = 'Implicit'),
            (e.password = 'Password'),
            (e.clientCredentials = 'Client Credentials'),
            (e.authorizationCode = 'Authorization Code');
        })(i || (i = {}));
    },
    70: function(e, t, n) {
      const r = n(33);
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
    71: function(e, t, n) {
      const { createMapOfType: r, getMapValueOfType: a, mix: s } = n(2),
        i = n(3),
        o = n(35),
        u = n(10),
        l = n(72),
        c = n(32),
        h = n(37),
        p = n(74),
        m = n(75),
        f = n(4);
      e.exports = s(
        class extends i {
          messages() {
            return r(this._json.messages, o);
          }
          hasMessages() {
            return !!this._json.messages;
          }
          message(e) {
            return a(this._json.messages, e, o);
          }
          schemas() {
            return r(this._json.schemas, u);
          }
          hasSchemas() {
            return !!this._json.schemas;
          }
          schema(e) {
            return a(this._json.schemas, e, u);
          }
          securitySchemes() {
            return r(this._json.securitySchemes, l);
          }
          hasSecuritySchemes() {
            return !!this._json.securitySchemes;
          }
          securityScheme(e) {
            return a(this._json.securitySchemes, e, l);
          }
          parameters() {
            return r(this._json.parameters, c);
          }
          hasParameters() {
            return !!this._json.parameters;
          }
          parameter(e) {
            return a(this._json.parameters, e, c);
          }
          correlationIds() {
            return r(this._json.correlationIds, h);
          }
          hasCorrelationIds() {
            return !!this._json.correlationIds;
          }
          correlationId(e) {
            return a(this._json.correlationIds, e, h);
          }
          operationTraits() {
            return r(this._json.operationTraits, p);
          }
          hasOperationTraits() {
            return !!this._json.operationTraits;
          }
          operationTrait(e) {
            return a(this._json.operationTraits, e, p);
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
        },
        f,
      );
    },
    72: function(e, t, n) {
      const { createMapOfType: r, mix: a } = n(2),
        s = n(3),
        i = n(73),
        o = n(5),
        u = n(4);
      e.exports = a(
        class extends s {
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
            return r(this._json.flows, i);
          }
        },
        o,
        u,
      );
    },
    73: function(e, t, n) {
      const { mix: r } = n(2),
        a = n(3),
        s = n(4);
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
        s,
      );
    },
    74: function(e, t, n) {
      const r = n(34);
      e.exports = class extends r {};
    },
    75: function(e, t, n) {
      const r = n(36);
      e.exports = class extends r {};
    },
    76: function(e, t, n) {
      const { xParserMessageName: r, xParserSchemaId: a } = n(38),
        { traverseAsyncApiDocument: s } = n(39);
      function i(e, t) {
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
            const n = e.channel(t);
            for (const [e, t] of Object.entries(n.parameters()))
              t.json()[String(a)] = e;
          });
        },
        assignUidToComponentSchemas: function(e) {
          if (e.hasComponents())
            for (const [t, n] of Object.entries(e.components().schemas()))
              n.json()[String(a)] = t;
        },
        assignNameToAnonymousMessages: function(e) {
          let t = 0;
          e.hasChannels() &&
            e.channelNames().forEach(n => {
              const r = e.channel(n);
              r.hasPublish() && i(r.publish().messages(), ++t),
                r.hasSubscribe() && i(r.subscribe().messages(), ++t);
            });
        },
        assignIdToAnonymousSchemas: function(e) {
          let t = 0;
          s(e, e => {
            e.uid() || (e.json()[String(a)] = `<anonymous-schema-${++t}>`);
          });
        },
      };
    },
    77: function(e, t) {
      var n = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString;
      e.exports = function(e, t, a) {
        if ('[object Function]' !== r.call(t))
          throw new TypeError('iterator must be a function');
        var s = e.length;
        if (s === +s) for (var i = 0; i < s; i++) t.call(a, e[i], i, e);
        else for (var o in e) n.call(e, o) && t.call(a, e[o], o, e);
      };
    },
    8: function(e, t, n) {
      'use strict';
      (function(e) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = n(68),
          a = n(69),
          s = n(51);
        function i() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function o(e, t) {
          if (i() < t) throw new RangeError('Invalid typed array length');
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
                  : (e = p(e, t));
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
                  var n = 0 | m(t.length);
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
                      : p(e, t);
                  if ('Buffer' === t.type && s(t.data)) return p(e, t.data);
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
          if ((c(t), (e = o(e, t < 0 ? 0 : 0 | m(t))), !u.TYPED_ARRAY_SUPPORT))
            for (var n = 0; n < t; ++n) e[n] = 0;
          return e;
        }
        function p(e, t) {
          var n = t.length < 0 ? 0 : 0 | m(t.length);
          e = o(e, n);
          for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
          return e;
        }
        function m(e) {
          if (e >= i())
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum size: 0x' +
                i().toString(16) +
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
                return U(e).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * n;
              case 'hex':
                return n >>> 1;
              case 'base64':
                return L(e).length;
              default:
                if (r) return U(e).length;
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
                return k(this, t, n);
              case 'ascii':
                return _(this, t, n);
              case 'latin1':
              case 'binary':
                return F(this, t, n);
              case 'base64':
                return C(this, t, n);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return S(this, t, n);
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
            return 0 === t.length ? -1 : D(e, t, n, r, a);
          if ('number' == typeof t)
            return (
              (t &= 255),
              u.TYPED_ARRAY_SUPPORT &&
              'function' == typeof Uint8Array.prototype.indexOf
                ? a
                  ? Uint8Array.prototype.indexOf.call(e, t, n)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                : D(e, [t], n, r, a)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function D(e, t, n, r, a) {
          var s,
            i = 1,
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
            (i = 2), (o /= 2), (u /= 2), (n /= 2);
          }
          function l(e, t) {
            return 1 === i ? e[t] : e.readUInt16BE(t * i);
          }
          if (a) {
            var c = -1;
            for (s = n; s < o; s++)
              if (l(e, s) === l(t, -1 === c ? 0 : s - c)) {
                if ((-1 === c && (c = s), s - c + 1 === u)) return c * i;
              } else -1 !== c && (s -= s - c), (c = -1);
          } else
            for (n + u > o && (n = o - u), s = n; s >= 0; s--) {
              for (var h = !0, p = 0; p < u; p++)
                if (l(e, s + p) !== l(t, p)) {
                  h = !1;
                  break;
                }
              if (h) return s;
            }
          return -1;
        }
        function b(e, t, n, r) {
          n = Number(n) || 0;
          var a = e.length - n;
          r ? (r = Number(r)) > a && (r = a) : (r = a);
          var s = t.length;
          if (s % 2 != 0) throw new TypeError('Invalid hex string');
          r > s / 2 && (r = s / 2);
          for (var i = 0; i < r; ++i) {
            var o = parseInt(t.substr(2 * i, 2), 16);
            if (isNaN(o)) return i;
            e[n + i] = o;
          }
          return i;
        }
        function x(e, t, n, r) {
          return $(U(t, e.length - n), e, n, r);
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
        function E(e, t, n, r) {
          return v(e, t, n, r);
        }
        function A(e, t, n, r) {
          return $(L(t), e, n, r);
        }
        function w(e, t, n, r) {
          return $(
            (function(e, t) {
              for (
                var n, r, a, s = [], i = 0;
                i < e.length && !((t -= 2) < 0);
                ++i
              )
                (n = e.charCodeAt(i)),
                  (r = n >> 8),
                  (a = n % 256),
                  s.push(a),
                  s.push(r);
              return s;
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
        function k(e, t, n) {
          n = Math.min(e.length, n);
          for (var r = [], a = t; a < n; ) {
            var s,
              i,
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
                  128 == (192 & (s = e[a + 1])) &&
                    (u = ((31 & l) << 6) | (63 & s)) > 127 &&
                    (c = u);
                  break;
                case 3:
                  (s = e[a + 1]),
                    (i = e[a + 2]),
                    128 == (192 & s) &&
                      128 == (192 & i) &&
                      (u = ((15 & l) << 12) | ((63 & s) << 6) | (63 & i)) >
                        2047 &&
                      (u < 55296 || u > 57343) &&
                      (c = u);
                  break;
                case 4:
                  (s = e[a + 1]),
                    (i = e[a + 2]),
                    (o = e[a + 3]),
                    128 == (192 & s) &&
                      128 == (192 & i) &&
                      128 == (192 & o) &&
                      (u =
                        ((15 & l) << 18) |
                        ((63 & s) << 12) |
                        ((63 & i) << 6) |
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
          (t.kMaxLength = i()),
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
              var n = e.length, r = t.length, a = 0, s = Math.min(n, r);
              a < s;
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
            if (!s(e))
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
              var i = e[n];
              if (!u.isBuffer(i))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers',
                );
              i.copy(r, a), (a += i.length);
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
              ? k(this, 0, e)
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
              var s = (a >>>= 0) - (r >>>= 0),
                i = (n >>>= 0) - (t >>>= 0),
                o = Math.min(s, i),
                l = this.slice(r, a),
                c = e.slice(t, n),
                h = 0;
              h < o;
              ++h
            )
              if (l[h] !== c[h]) {
                (s = l[h]), (i = c[h]);
                break;
              }
            return s < i ? -1 : i < s ? 1 : 0;
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
            for (var s = !1; ; )
              switch (r) {
                case 'hex':
                  return b(this, e, t, n);
                case 'utf8':
                case 'utf-8':
                  return x(this, e, t, n);
                case 'ascii':
                  return v(this, e, t, n);
                case 'latin1':
                case 'binary':
                  return E(this, e, t, n);
                case 'base64':
                  return A(this, e, t, n);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return w(this, e, t, n);
                default:
                  if (s) throw new TypeError('Unknown encoding: ' + r);
                  (r = ('' + r).toLowerCase()), (s = !0);
              }
          }),
          (u.prototype.toJSON = function() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        function _(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(127 & e[a]);
          return r;
        }
        function F(e, t, n) {
          var r = '';
          n = Math.min(e.length, n);
          for (var a = t; a < n; ++a) r += String.fromCharCode(e[a]);
          return r;
        }
        function j(e, t, n) {
          var r = e.length;
          (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
          for (var a = '', s = t; s < n; ++s) a += z(e[s]);
          return a;
        }
        function S(e, t, n) {
          for (var r = e.slice(t, n), a = '', s = 0; s < r.length; s += 2)
            a += String.fromCharCode(r[s] + 256 * r[s + 1]);
          return a;
        }
        function N(e, t, n) {
          if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
          if (e + t > n)
            throw new RangeError('Trying to access beyond buffer length');
        }
        function O(e, t, n, r, a, s) {
          if (!u.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > a || t < s)
            throw new RangeError('"value" argument is out of bounds');
          if (n + r > e.length) throw new RangeError('Index out of range');
        }
        function T(e, t, n, r) {
          t < 0 && (t = 65535 + t + 1);
          for (var a = 0, s = Math.min(e.length - n, 2); a < s; ++a)
            e[n + a] =
              (t & (255 << (8 * (r ? a : 1 - a)))) >>> (8 * (r ? a : 1 - a));
        }
        function B(e, t, n, r) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var a = 0, s = Math.min(e.length - n, 4); a < s; ++a)
            e[n + a] = (t >>> (8 * (r ? a : 3 - a))) & 255;
        }
        function R(e, t, n, r, a, s) {
          if (n + r > e.length) throw new RangeError('Index out of range');
          if (n < 0) throw new RangeError('Index out of range');
        }
        function P(e, t, n, r, s) {
          return s || R(e, 0, n, 4), a.write(e, t, n, r, 23, 4), n + 4;
        }
        function I(e, t, n, r, s) {
          return s || R(e, 0, n, 8), a.write(e, t, n, r, 52, 8), n + 8;
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
            for (var s = 0; s < a; ++s) n[s] = this[s + e];
          }
          return n;
        }),
          (u.prototype.readUIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e], a = 1, s = 0; ++s < t && (a *= 256); )
              r += this[e + s] * a;
            return r;
          }),
          (u.prototype.readUIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e + --t], a = 1; t > 0 && (a *= 256); )
              r += this[e + --t] * a;
            return r;
          }),
          (u.prototype.readUInt8 = function(e, t) {
            return t || N(e, 1, this.length), this[e];
          }),
          (u.prototype.readUInt16LE = function(e, t) {
            return t || N(e, 2, this.length), this[e] | (this[e + 1] << 8);
          }),
          (u.prototype.readUInt16BE = function(e, t) {
            return t || N(e, 2, this.length), (this[e] << 8) | this[e + 1];
          }),
          (u.prototype.readUInt32LE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                16777216 * this[e + 3]
            );
          }),
          (u.prototype.readUInt32BE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              16777216 * this[e] +
                ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
            );
          }),
          (u.prototype.readIntLE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = this[e], a = 1, s = 0; ++s < t && (a *= 256); )
              r += this[e + s] * a;
            return r >= (a *= 128) && (r -= Math.pow(2, 8 * t)), r;
          }),
          (u.prototype.readIntBE = function(e, t, n) {
            (e |= 0), (t |= 0), n || N(e, t, this.length);
            for (var r = t, a = 1, s = this[e + --r]; r > 0 && (a *= 256); )
              s += this[e + --r] * a;
            return s >= (a *= 128) && (s -= Math.pow(2, 8 * t)), s;
          }),
          (u.prototype.readInt8 = function(e, t) {
            return (
              t || N(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (u.prototype.readInt16LE = function(e, t) {
            t || N(e, 2, this.length);
            var n = this[e] | (this[e + 1] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt16BE = function(e, t) {
            t || N(e, 2, this.length);
            var n = this[e + 1] | (this[e] << 8);
            return 32768 & n ? 4294901760 | n : n;
          }),
          (u.prototype.readInt32LE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function(e, t) {
            return (
              t || N(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (u.prototype.readFloatLE = function(e, t) {
            return t || N(e, 4, this.length), a.read(this, e, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function(e, t) {
            return t || N(e, 4, this.length), a.read(this, e, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function(e, t) {
            return t || N(e, 8, this.length), a.read(this, e, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function(e, t) {
            return t || N(e, 8, this.length), a.read(this, e, !1, 52, 8);
          }),
          (u.prototype.writeUIntLE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var a = 1,
              s = 0;
            for (this[t] = 255 & e; ++s < n && (a *= 256); )
              this[t + s] = (e / a) & 255;
            return t + n;
          }),
          (u.prototype.writeUIntBE = function(e, t, n, r) {
            ((e = +e), (t |= 0), (n |= 0), r) ||
              O(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            var a = n - 1,
              s = 1;
            for (this[t + a] = 255 & e; --a >= 0 && (s *= 256); )
              this[t + a] = (e / s) & 255;
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
            var s = 0,
              i = 1,
              o = 0;
            for (this[t] = 255 & e; ++s < n && (i *= 256); )
              e < 0 && 0 === o && 0 !== this[t + s - 1] && (o = 1),
                (this[t + s] = (((e / i) >> 0) - o) & 255);
            return t + n;
          }),
          (u.prototype.writeIntBE = function(e, t, n, r) {
            if (((e = +e), (t |= 0), !r)) {
              var a = Math.pow(2, 8 * n - 1);
              O(this, e, t, n, a - 1, -a);
            }
            var s = n - 1,
              i = 1,
              o = 0;
            for (this[t + s] = 255 & e; --s >= 0 && (i *= 256); )
              e < 0 && 0 === o && 0 !== this[t + s + 1] && (o = 1),
                (this[t + s] = (((e / i) >> 0) - o) & 255);
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
            return P(this, e, t, !0, n);
          }),
          (u.prototype.writeFloatBE = function(e, t, n) {
            return P(this, e, t, !1, n);
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
              s = r - n;
            if (this === e && n < t && t < r)
              for (a = s - 1; a >= 0; --a) e[a + t] = this[a + n];
            else if (s < 1e3 || !u.TYPED_ARRAY_SUPPORT)
              for (a = 0; a < s; ++a) e[a + t] = this[a + n];
            else Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
            return s;
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
            var s;
            if (
              ((t >>>= 0),
              (n = void 0 === n ? this.length : n >>> 0),
              e || (e = 0),
              'number' == typeof e)
            )
              for (s = t; s < n; ++s) this[s] = e;
            else {
              var i = u.isBuffer(e) ? e : U(new u(e, r).toString()),
                o = i.length;
              for (s = 0; s < n - t; ++s) this[s + t] = i[s % o];
            }
            return this;
          });
        var M = /[^+\/0-9A-Za-z-_]/g;
        function z(e) {
          return e < 16 ? '0' + e.toString(16) : e.toString(16);
        }
        function U(e, t) {
          var n;
          t = t || 1 / 0;
          for (var r = e.length, a = null, s = [], i = 0; i < r; ++i) {
            if ((n = e.charCodeAt(i)) > 55295 && n < 57344) {
              if (!a) {
                if (n > 56319) {
                  (t -= 3) > -1 && s.push(239, 191, 189);
                  continue;
                }
                if (i + 1 === r) {
                  (t -= 3) > -1 && s.push(239, 191, 189);
                  continue;
                }
                a = n;
                continue;
              }
              if (n < 56320) {
                (t -= 3) > -1 && s.push(239, 191, 189), (a = n);
                continue;
              }
              n = 65536 + (((a - 55296) << 10) | (n - 56320));
            } else a && (t -= 3) > -1 && s.push(239, 191, 189);
            if (((a = null), n < 128)) {
              if ((t -= 1) < 0) break;
              s.push(n);
            } else if (n < 2048) {
              if ((t -= 2) < 0) break;
              s.push((n >> 6) | 192, (63 & n) | 128);
            } else if (n < 65536) {
              if ((t -= 3) < 0) break;
              s.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
            } else {
              if (!(n < 1114112)) throw new Error('Invalid code point');
              if ((t -= 4) < 0) break;
              s.push(
                (n >> 18) | 240,
                ((n >> 12) & 63) | 128,
                ((n >> 6) & 63) | 128,
                (63 & n) | 128,
              );
            }
          }
          return s;
        }
        function L(e) {
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
      }.call(this, n(11)));
    },
  }).default;
});
