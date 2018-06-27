/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34);


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

Vue.component('order-list', __webpack_require__(35));
Vue.component('order-card', __webpack_require__(38));

vm = new Vue({
    el: '#app_orders',
    data: {
        orders: [], //массив заказов, загруженных с сервера
        chosenIndex: 0 //индекс выбранного заказа
    },
    computed: {},
    methods: {
        chooseOrder: function chooseOrder(index) {
            this.chosenIndex = index;
            if (this.orders[index].status == 0) {
                this.sendOrderStatus(index, 1);
            }
        },
        loadOrders: function loadOrders() {
            var _this = this;

            axios.get('api/orders').then(function (response) {
                return _this.orders = response.data;
            }).catch(function (error) {
                alert('loading_orders_fail');console.log(error);
            });
        },
        subscribe: function subscribe() {
            var _this2 = this;

            Echo.channel('orders.channel').listen('.order.shipped', function (e) {
                _this2.loadOrders();
                _this2.chosenIndex++;
            }).listen('.order.status.changed', function (e) {
                _this2.setLocalOrderStatus(e.id, e.status);
            });
        },
        sendOrderStatus: function sendOrderStatus(index, status) {
            axios.get('api/orders/' + this.orders[index].id + '/status/' + status);
        },
        setLocalOrderStatus: function setLocalOrderStatus(id, status) {
            this.orders.forEach(function (order) {
                if (order.id == id) {
                    order.status = status;
                }
            });
        }
    },
    mounted: function mounted() {
        this.loadOrders();
        this.subscribe();
    }
});

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(36)
/* template */
var __vue_template__ = __webpack_require__(37)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\order-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14313858", Component.options)
  } else {
    hotAPI.reload("data-v-14313858", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            first_visible: 0,
            total_visible: 25
        };
    },
    props: ['orders', 'chosen_index'],
    computed: {},
    methods: {
        choose: function choose(index) {
            this.$emit('choose', index);
        }
    }
});

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h4", { staticClass: "mt-4" }, [_vm._v("Список заказов:")]),
    _vm._v(" "),
    _c("div", { staticClass: "card" }, [
      _c("div", { staticClass: "card-body p-0" }, [
        _c(
          "div",
          { staticClass: "list-group" },
          _vm._l(_vm.orders, function(order, index) {
            return index >= _vm.first_visible &&
              index < _vm.total_visible + _vm.first_visible
              ? _c(
                  "button",
                  {
                    staticClass: "list-group-item list-group-item-action",
                    class: {
                      active: index === _vm.chosen_index,
                      "border-warning": order.status == 0,
                      "border-info": order.status == 1,
                      "border-success": order.status == 2,
                      "border-danger": order.status == 3
                    },
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        _vm.choose(index)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-3 pl-1" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(order.created_at.substring(11, 16)) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-5 p-0 text-center" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(order.user_name) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-4  p-0 text-right" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(order.user_tel) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]
                )
              : _vm._e()
          })
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-14313858", module.exports)
  }
}

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(39)
/* template */
var __vue_template__ = __webpack_require__(40)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\order-card.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b596b574", Component.options)
  } else {
    hotAPI.reload("data-v-b596b574", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },
    props: ['order'],
    computed: {
        total_cost: function total_cost() {
            var result = 0;
            this.order.items.forEach(function (item) {
                result += item.count * item.price;
            });
            return result;
        }
    },
    methods: {
        changeStatus: function changeStatus(status) {
            this.$emit('status', status);
        }
    }
});

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h4", { staticClass: "mt-4" }, [_vm._v("Описание:")]),
    _vm._v(" "),
    _vm.order != null
      ? _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-header" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-danger",
                on: {
                  click: function($event) {
                    _vm.changeStatus(3)
                  }
                }
              },
              [_vm._v("Отклонить")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                on: {
                  click: function($event) {
                    _vm.changeStatus(2)
                  }
                }
              },
              [_vm._v("Принять")]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _vm._v(
              "\n            Заказчик: " + _vm._s(_vm.order.user_name) + " "
            ),
            _c("br"),
            _vm._v(
              "\n            Телефон: " + _vm._s(_vm.order.user_tel) + " "
            ),
            _c("br"),
            _vm._v(
              "\n            Адрес: " + _vm._s(_vm.order.user_address) + " "
            ),
            _c("br"),
            _vm._v(
              "\n            Комментарий: " +
                _vm._s(_vm.order.user_comment) +
                " "
            ),
            _c("br"),
            _vm._v("\n            Заказ: "),
            _c("br"),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "list-group" },
              [
                _vm._l(_vm.order.items, function(item) {
                  return _c("li", { staticClass: "list-group-item py-1" }, [
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-6 col-md-3" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(item.name) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-6 col-md-3 text-right" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(item.unit) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-6 col-md-3" }, [
                        _vm._v(
                          "\n                                x" +
                            _vm._s(item.count) +
                            "\n                            "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-6 col-md-3 pr-0 text-right" },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(item.price * item.count) +
                              "руб\n                            "
                          )
                        ]
                      )
                    ])
                  ])
                }),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item py-1 bg-light" }, [
                  _c("div", { staticClass: "row" }, [
                    _c(
                      "div",
                      { staticClass: "col-8 col-md-3 offset-md-5 text-right" },
                      [
                        _vm._v(
                          "\n                            Итого\n                        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-4 p-0 text-right" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.total_cost) +
                          "руб\n                        "
                      )
                    ])
                  ])
                ])
              ],
              2
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b596b574", module.exports)
  }
}

/***/ })

/******/ });