(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("MKAppLoader"), require("MKUtils"), require("React"), require("Immutable"), require("ReactDom"));
	else if(typeof define === 'function' && define.amd)
		define(["MKAppLoader", "MKUtils", "React", "Immutable", "ReactDom"], factory);
	else if(typeof exports === 'object')
		exports["MKComponent"] = factory(require("MKAppLoader"), require("MKUtils"), require("React"), require("Immutable"), require("ReactDom"));
	else
		root["MKComponent"] = factory(root["MKAppLoader"], root["MKUtils"], root["React"], root["Immutable"], root["ReactDom"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_120__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(29)('wks');
var uid = __webpack_require__(21);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(31);
var hide = __webpack_require__(9);
var has = __webpack_require__(5);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(32);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(44);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(43);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(86);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(88);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = __webpack_require__(20);

var _keys2 = _interopRequireDefault(_keys);

var _mkAppLoader = __webpack_require__(18);

var _componentFactory = __webpack_require__(33);

var _componentFactory2 = _interopRequireDefault(_componentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toast, notification, modal, errorBox, apps;

function config(option) {
	var components = option.components;

	toast = option.toast;
	notification = option.notification;
	modal = option.modal;
	errorBox = option.errorBox;
	apps = option.apps;

	(0, _mkAppLoader.config)(option);

	_componentFactory2.default.registerComponent('AppLoader', _mkAppLoader.AppLoader);

	if (components && components.length > 0) {
		components.forEach(function (c) {
			if (c.appName) _componentFactory2.default.registerAppComponent(c.appName, c.name, c.component);else _componentFactory2.default.registerComponent(c.name, c.component);
		});
	}

	if (apps) {
		(0, _keys2.default)(apps).forEach(function (k) {
			var a = apps[k];
			if (a.components && a.components.length > 0) {
				a.components.forEach(function (c) {
					_componentFactory2.default.registerAppComponent(a.name, c.name, c.component);
				});
			}
		});
	}
}

config.getToast = function () {
	return toast;
};
config.getNotification = function () {
	return notification;
};
config.getModal = function () {
	return modal;
};
config.getApps = function () {
	return apps;
};

exports.default = config;
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(78);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys');
var uid = __webpack_require__(21);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(66);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(67);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentFactory = function () {
    function componentFactory() {
        (0, _classCallCheck3.default)(this, componentFactory);

        this.components = {};
        this.appComponents = {};
    }

    (0, _createClass3.default)(componentFactory, [{
        key: 'registerComponent',
        value: function registerComponent(name, component, ingoreExists) {
            if (this.components[name]) {
                if (ingoreExists) {
                    return;
                } else {
                    throw '\u7EC4\u4EF6existed. name: ' + name;
                }
            }
            this.components[name] = component;
        }
    }, {
        key: 'registerAppComponent',
        value: function registerAppComponent(appName, componentName, component) {
            this.appComponents[appName] = this.appComponents[appName] || {};
            this.appComponents[appName].components = this.appComponents[appName].components || {};
            if (this.appComponents[appName].components[componentName]) throw '\u7EC4\u4EF6existed. app:' + appName + ', name: ' + componentName;
            this.appComponents[appName].components[componentName] = component;
        }
    }, {
        key: 'registerComponents',
        value: function registerComponents(components) {
            var _this = this;

            if (!components || components.length == 0) return;
            components.forEach(function (c) {
                return _this.registerComponent(c.name, c.component);
            });
        }
    }, {
        key: 'getComponent',
        value: function getComponent(appName, name) {
            if (!name) throw 'component name can not null';

            if (name.substring(0, 2) == '::') {
                if (name.substr(2)) return name.substr(2);else throw '\u6CA1\u6709\u7EC4\u4EF6. name: ::';
            }

            var nameSegs = name.split('.'),
                firstSeg = nameSegs[0];

            if (this.appComponents && this.appComponents[appName] && this.appComponents[appName].components && this.appComponents[appName].components[firstSeg]) {
                var com = this.appComponents[appName].components[name];

                if (com && nameSegs.length > 1) {
                    com = this.findChild(com, nameSegs);
                }

                if (com) return com;
            }

            var component = this.components[firstSeg];

            if (component && nameSegs.length > 1) {
                component = this.findChild(component, nameSegs);
            }

            if (!component) {
                debugger;
                throw '\u6CA1\u6709\u7EC4\u4EF6. name: ' + name;
            }

            return component;
        }
    }, {
        key: 'findChild',
        value: function findChild(component, nameSegs) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(nameSegs.slice(1)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var s = _step.value;

                    if (!component[s]) {
                        component = undefined;
                        return;
                    }

                    component = component[s];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return component;
        }
    }]);
    return componentFactory;
}();

var instance = new componentFactory();

exports.default = instance;
module.exports = exports['default'];

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(73);
var enumBugKeys = __webpack_require__(30);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(48)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(74).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(5);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(75)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(50)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(34);
var wksExt = __webpack_require__(39);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(64)(false);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(48)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
var global = __webpack_require__(2);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(72);
var setToStringTag = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(52);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(5);
var toObject = __webpack_require__(13);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(77);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(82);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(43);
var hiddenKeys = __webpack_require__(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(23);
var createDesc = __webpack_require__(15);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(32);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(20);

var _keys2 = _interopRequireDefault(_keys);

exports.setMeta = setMeta;
exports.setMetaForce = setMetaForce;
exports.getMeta = getMeta;
exports.getField = getField;
exports.getFields = getFields;
exports.setField = setField;
exports.setFields = setFields;
exports.updateField = updateField;

var _immutable = __webpack_require__(42);

var _immutable2 = _interopRequireDefault(_immutable);

var _mkUtils = __webpack_require__(24);

var _mkUtils2 = _interopRequireDefault(_mkUtils);

var _templateFactory = __webpack_require__(58);

var _templateFactory2 = _interopRequireDefault(_templateFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var existsParamsInPath = _mkUtils.path.existsParamsInPath,
    parsePath = _mkUtils.path.parsePath;


var cache = { meta: (0, _immutable.Map)() };

window['__getCache'] = function () {
    return cache;
};

function setMeta(appInfo) {

    if (!appInfo || !appInfo.meta) return;

    var appName = appInfo.name;

    if (cache.meta.has(appName)) return;

    setMetaForce(appName, appInfo.meta);
}

function setMetaForce(appName, meta) {
    if (!appName || !meta) return;

    meta = (0, _immutable.fromJS)(meta);

    meta = parseMetaTemplate(meta);

    cache.meta = cache.meta.setIn([appName, 'meta'], meta).setIn([appName, 'metaMap'], parseMeta(meta));
}

function getMeta(appInfo, fullpath, propertys) {
    //path空取整个meta
    if (!fullpath) return cache.meta.getIn([appInfo.name, 'meta']).toJS();

    var parsedPath = parsePath(fullpath),
        vars = parsedPath.vars,
        metaMap = cache.meta.getIn([appInfo.name, 'metaMap']),
        meta = cache.meta.getIn([appInfo.name, 'meta']);

    var path = metaMap.get(parsedPath.path);

    var currentMeta = path ? meta.getIn(path.split('.')) : meta;

    //属性空，获取该路径下所有属性
    if (!propertys) return currentMeta.toJS();

    var ret = {};

    //属性为数组，遍历获取
    if (propertys instanceof Array) {
        var i, p;

        for (i = 0; p = propertys[i++];) {
            var val = currentMeta.getIn(p.split('.'));
            ret[p] = val && val.toJS ? val.toJS() : val;
        }

        /*
        propertys.forEach(p => {
            let val = currentMeta.getIn(p.split('.'))
            //immutable值，直接toJS()
            ret[p] = (val && val.toJS) ? val.toJS() : val
        })*/

        return ret;
    }

    //属性为字符串，直接获取
    if (typeof propertys == 'string') {
        var _val = currentMeta.getIn(propertys.split('.'));
        return _val && _val.toJS ? _val.toJS() : _val;
    }
}

function getField(state, fieldPath) {
    if (!fieldPath) {
        return state.get('data');
    }

    if (fieldPath instanceof Array) {
        return state.getIn(fieldPath);
    } else {
        return state.getIn(fieldPath.split('.'));
    }
}

function getFields(state, fieldPaths) {
    var ret = {};
    fieldPaths.forEach(function (o) {
        return ret[o] = getField(state, o);
    });
    return ret;
}

function setField(state, fieldPath, value) {
    if (fieldPath instanceof Array) {
        return state.setIn(fieldPath, value);
    } else {
        return state.setIn(fieldPath.split('.'), value);
    }
}

function setFields(state, values) {
    var keys = (0, _keys2.default)(values),
        i,
        key;

    for (i = 0; key = keys[i++];) {
        state = setField(state, key, values[key]);
    }
    return state;
}

function updateField(state, fieldPath, fn) {
    if (fieldPath instanceof Array) {
        return state.updateIn(fieldPath, fn);
    } else {
        return state.updateIn(fieldPath.split('.'), fn);
    }
}

function isComponent(meta) {
    return (typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta)) == 'object' && !!meta.name && !!meta.component;
}

function parseMetaTemplate(meta) {
    var templates = [];

    var parseProp = function parseProp(propValue, path) {
        if (!(propValue instanceof _immutable2.default.Map)) {
            return;
        }
        if (propValue.get('component')) {
            var component = _mkUtils2.default.string.trim(propValue.get('component'));
            if (component.substring(0, 2) == '##') {
                var template = _templateFactory2.default.getTemplate(component.substr(2));
                if (template) {
                    templates.push([path, (0, _immutable.fromJS)(template(propValue.toJS()))]);
                    return;
                }
            }
        }

        propValue.keySeq().toArray().forEach(function (p) {
            var v = propValue.get(p);
            if (v instanceof _immutable2.default.List) {
                v.forEach(function (c, index) {
                    var currentPath = path ? path + '.' + p + '.' + index : p + '.' + index;
                    parseProp(c, currentPath);
                });
            } else {
                var currentPath = path ? path + '.' + p : p;
                parseProp(v, currentPath);
            }
        });
    };
    parseProp(meta, '');
    templates.forEach(function (t) {
        var seg = t[0].split('.');
        if (t[1] instanceof _immutable2.default.List && meta.getIn(seg.slice(0, seg.length - 1)) instanceof _immutable2.default.List) {
            var index = seg.pop();
            meta = meta.updateIn(seg, function (ll) {
                ll = ll.remove(index);

                t[1].forEach(function (o) {
                    ll = ll.insert(index, o);
                    index++;
                });
                return ll;
            });
        } else {
            meta = meta.setIn(seg, t[1]);
        }
    });
    return meta;
}

function parseMeta(meta) {
    var ret = (0, _immutable.Map)();
    var parseProp = function parseProp(propValue, parentPath, parentRealPath) {
        if (!(propValue instanceof _immutable2.default.Map)) {
            return;
        }
        if (propValue.get('name') && propValue.get('component')) {
            var name = _mkUtils2.default.string.trim(propValue.get('name'));
            parentPath = parentPath ? parentPath + '.' + name : name;
            ret = ret.set(parentPath, parentRealPath);
        }

        propValue.keySeq().toArray().forEach(function (p) {

            var v = propValue.get(p),
                currentPath = parentPath ? parentPath + '.' + p : p;
            if (v instanceof _immutable2.default.List) {
                v.forEach(function (c, index) {
                    var currentRealPath = parentRealPath ? parentRealPath + '.' + p + '.' + index : p + '.' + index;
                    parseProp(c, '' + currentPath, currentRealPath);
                });
            } else {
                var currentRealPath = parentRealPath ? parentRealPath + '.' + p : p;
                parseProp(v, '' + currentPath, currentRealPath);
            }
        });
    };

    parseProp(meta, '', '');
    return ret;
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFactory = function () {
    function templateFactory() {
        (0, _classCallCheck3.default)(this, templateFactory);

        this.templates = {};
    }

    (0, _createClass3.default)(templateFactory, [{
        key: 'registerTemplate',
        value: function registerTemplate(name, templateHandler, ingoreExists) {
            if (this.templates[name]) {
                if (ingoreExists) {
                    return;
                } else {
                    throw 'template existed. name: ' + name;
                }
            }
            this.templates[name] = templateHandler;
        }
    }, {
        key: 'registerTemplates',
        value: function registerTemplates(templates) {
            var _this = this;

            if (!templates || templates.length == 0) return;
            templates.forEach(function (t) {
                return _this.registerTemplate(t.name, t.templateHandler);
            });
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate(name) {
            if (!name) throw 'template name can not null';
            var template = this.templates[name];
            return template;
        }
    }]);
    return templateFactory;
}();

var instance = new templateFactory();

exports.default = instance;
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = function () {
	function context() {
		(0, _classCallCheck3.default)(this, context);

		this._context = {};
	}

	(0, _createClass3.default)(context, [{
		key: "set",
		value: function set(key, value) {
			this._context[key] = value;
		}
	}, {
		key: "get",
		value: function get(key) {
			return this._context[key];
		}
	}]);
	return context;
}();

var instance = new context();

exports.default = instance;
module.exports = exports["default"];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(61);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mkAppLoader = __webpack_require__(18);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _action = __webpack_require__(81);

var _action2 = _interopRequireDefault(_action);

var _reducer = __webpack_require__(106);

var _reducer2 = _interopRequireDefault(_reducer);

var _wrapper = __webpack_require__(107);

var _wrapper2 = _interopRequireDefault(_wrapper);

var _componentFactory = __webpack_require__(33);

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _templateFactory = __webpack_require__(58);

var _templateFactory2 = _interopRequireDefault(_templateFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import tryCatchError from './reactTryCatchBatchingStrategy'

exports.default = {
	start: _mkAppLoader.start,
	config: _config2.default,
	action: _action2.default,
	reducer: _reducer2.default,
	wrapper: _wrapper2.default,
	componentFactory: _componentFactory2.default,
	templateFactory: _templateFactory2.default,
	AppLoader: _mkAppLoader.AppLoader
};
module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(13);
var $keys = __webpack_require__(14);

__webpack_require__(46)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(37);
module.exports = __webpack_require__(76);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(70);
var step = __webpack_require__(71);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(50)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(35);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(36);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(14);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var get = __webpack_require__(53);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(26);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = __webpack_require__(54);

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = __webpack_require__(98);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(20);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = creator;

var _react = __webpack_require__(41);

var _react2 = _interopRequireDefault(_react);

var _mkAppLoader = __webpack_require__(18);

var _common = __webpack_require__(57);

var common = _interopRequireWildcard(_common);

var _mkUtils = __webpack_require__(24);

var _mkUtils2 = _interopRequireDefault(_mkUtils);

var _immutable = __webpack_require__(42);

var _context = __webpack_require__(59);

var _context2 = _interopRequireDefault(_context);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appInstances = {};

var action = function action(option) {
	(0, _classCallCheck3.default)(this, action);

	_initialiseProps.call(this);

	this.appInfo = option.appInfo;
	this.meta = (0, _immutable.fromJS)(option.appInfo.meta);
	this.cache = {};

	common.setMeta(option.appInfo);
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.config = function (_ref) {
		var metaHandlers = _ref.metaHandlers;

		_this.metaHandlers = metaHandlers;
	};

	this.initView = function (component, injections) {
		_this.component = component;
		_this.injections = injections;

		appInstances[component.props.appFullName] = {
			appName: component.props.appName,
			appQuery: component.props.appQuery,
			//app: config.getApps()[component.props.appName],
			instance: component
		};

		_this.metaHandlers && _this.metaHandlers['onInit'] && _this.metaHandlers['onInit']({ component: component, injections: injections });
	};

	this.unmount = function () {
		delete appInstances[_this.component.appFullName];
	};

	this.componentWillMount = function () {
		_this.metaHandlers && _this.metaHandlers['componentWillMount'] && _this.metaHandlers['componentWillMount'] != _this.componentWillMount && _this.metaHandlers['componentWillMount']();
	};

	this.componentDidMount = function () {
		_this.metaHandlers && _this.metaHandlers['componentDidMount'] && _this.metaHandlers['componentDidMount'] != _this.componentDidMount && _this.metaHandlers['componentDidMount']();
	};

	this.shouldComponentUpdate = function (nextProps, nextState) {
		_this.metaHandlers && _this.metaHandlers['shouldComponentUpdate'] && _this.metaHandlers['shouldComponentUpdate'] != _this.shouldComponentUpdate && _this.metaHandlers['shouldComponentUpdate'](nextProps, nextState);
	};

	this.componentWillReceiveProps = function (nextProps) {
		_this.metaHandlers && _this.metaHandlers['componentWillReceiveProps'] && _this.metaHandlers['componentWillReceiveProps'] != _this.componentWillReceiveProps && _this.metaHandlers['componentWillReceiveProps'](nextProps);
	};

	this.componentWillUpdate = function (nextProps, nextState) {
		_this.metaHandlers && _this.metaHandlers['componentWillUpdate'] && _this.metaHandlers['componentWillUpdate'] != _this.componentWillUpdate && _this.metaHandlers['componentWillUpdate'](nextProps, nextState);
	};

	this.componentDidCatch = function (error, info) {
		_this.metaHandlers && _this.metaHandlers['componentDidCatch'] && _this.metaHandlers['componentDidCatch'] != _this.componentDidCatch && _this.metaHandlers['componentDidCatch'](error, info);
	};

	this.componentWillUnmount = function () {
		_this.metaHandlers && _this.metaHandlers['componentWillUnmount'] && _this.metaHandlers['componentWillUnmount'] != _this.componentWillUnmount && _this.metaHandlers['componentWillUnmount']();
	};

	this.componentDidUpdate = function () {
		_this.metaHandlers && _this.metaHandlers['componentDidUpdate'] && _this.metaHandlers['componentDidUpdate'] != _this.componentDidUpdate && _this.metaHandlers['componentDidUpdate']();
	};

	this.getAppInstances = function () {
		return appInstances;
	};

	this.getField = function (fieldPath) {
		return common.getField(_this.injections.getState(), fieldPath);
	};

	this.getFields = function (fieldPaths) {
		return common.getFields(_this.injections.getState(), fieldPaths);
	};

	this.setField = function (fieldPath, value) {
		return _this.injections.reduce('setField', fieldPath, value);
	};

	this.setFields = function (values) {
		return _this.injections.reduce('setFields', values);
	};

	this.parseExpreesion = function (v) {
		if (!_this.cache.expression) _this.cache.expression = {};

		if (_this.cache.expression[v]) {
			return _this.cache.expression[v];
		}

		if (!_this.cache.expressionParams) {
			_this.cache.expressionParams = ['data'].concat((0, _keys2.default)(_this.metaHandlers).map(function (k) {
				return "$" + k;
			})).concat(['_path', '_rowIndex', '_vars', '_ctrlPath', '_lastIndex']);
		}

		var params = _this.cache.expressionParams;

		var body = _mkUtils2.default.expression.getExpressionBody(v);

		_this.cache.expression[v] = new (Function.prototype.bind.apply(Function, [null].concat((0, _toConsumableArray3.default)(params), [body])))();
		return _this.cache.expression[v];
	};

	this.execExpression = function (expressContent, data, path, rowIndex, vars, ctrlPath) {
		var values = [data];

		var metaHandlerKeys = (0, _keys2.default)(_this.metaHandlers),
		    i,
		    key;

		var fun = function fun(n, option) {
			return function () {
				var _metaHandlers;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return (_metaHandlers = _this.metaHandlers)[n].apply(_metaHandlers, args.concat([option]));
			};
		};

		for (i = 0; key = metaHandlerKeys[i++];) {
			values.push(fun(key, {
				currentPath: path, rowIndex: rowIndex, vars: vars, lastIndex: vars && vars[vars.length - 1]
			}));
		}

		/*
  	Object.keys(this.metaHandlers).forEach(k => {
  	values.push((...args) => this.metaHandlers[k](...args, { currentPath: path, rowIndex, vars, lastIndex: vars && vars[vars.length - 1] }))
  })
  */
		values.push(path);
		values.push(rowIndex);
		values.push(vars);
		values.push(ctrlPath);
		values.push(vars && vars[vars.length - 1]);
		//values = values.concat([path, rowIndex, vars, ctrlPath, vars && vars[vars.length-1] ])
		try {
			return _this.parseExpreesion(expressContent).apply(_this, values);
		} catch (e) {
			_this.metaHandlers && _this.metaHandlers.componentDidCatch && _this.metaHandlers.componentDidCatch != _this.componentDidCatch && _this.metaHandlers.componentDidCatch(e);
			setTimeout(function () {
				console.error('\u8868\u8FBE\u5F0F\u89E3\u6790\u9519\u8BEF\uFF1A' + expressContent);
				_mkUtils2.default.exception.error(e);
			}, 500);
		}
	};

	this.needUpdate = function (meta) {
		if (!meta) return false;

		var t = typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta);

		if (t == 'string' && _mkUtils2.default.expression.isExpression(meta)) return true;

		if (t != 'object') return false;

		if (meta._notParse === true) {
			return false;
		}

		return !(t != 'object' || !!meta['$$typeof'] || !!meta._isAMomentObject || !!meta._power || meta._visible === false);
	};

	this.updateMeta = function (meta, path, rowIndex, vars, data, ctrlPath) {

		if (!_this.needUpdate(meta)) return;

		if (meta instanceof Array) {
			for (var _i = 0; _i < meta.length; _i++) {
				var sub = meta[_i];
				var currentPath = path;
				if (!sub) continue;

				if (sub._power) {
					currentPath = path + '.' + sub.name;
					sub.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
					continue;
				}

				var subType = typeof sub === 'undefined' ? 'undefined' : (0, _typeof3.default)(sub),
				    isExpression = false,
				    isMeta = false;

				if (subType == 'string' && _mkUtils2.default.expression.isExpression(sub)) {
					sub = _this.execExpression(sub, data, path, rowIndex, vars, ctrlPath);
					isExpression = true;
					if (sub && sub['_isMeta'] === true) isMeta = true;

					if (sub && sub['_isMeta'] === true) {
						isMeta = true;
						meta[_i] = sub.value;
					} else {
						meta[_i] = sub;
					}
				}

				if (!_this.needUpdate(sub)) continue;

				if (isExpression && !isMeta) {
					continue;
				}

				subType = typeof sub === 'undefined' ? 'undefined' : (0, _typeof3.default)(sub);

				if (sub instanceof Array) {
					currentPath = path + '.' + _i;
					sub.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
					_this.updateMeta(sub, currentPath, rowIndex, vars, data, ctrlPath);
					continue;
				}

				if (sub.name && sub.component) {
					currentPath = path + '.' + sub.name;
					sub.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
					_this.updateMeta(sub, currentPath, rowIndex, vars, data, sub.path);
				} else {
					currentPath = path + '.' + _i;
					sub.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
					_this.updateMeta(sub, currentPath, rowIndex, vars, data, ctrlPath);
				}
			}
			return;
		}

		var excludeProps = meta["_excludeProps"];
		if (excludeProps && _mkUtils2.default.expression.isExpression(excludeProps)) {
			excludeProps = _this.execExpression(excludeProps, data, path, rowIndex, vars, ctrlPath);
		}

		//去除meta的排除属性
		if (excludeProps && excludeProps instanceof Array) {

			var excludePropsKeys = (0, _keys2.default)(excludeProps),
			    i,
			    excludePropsKey;

			for (i = 0; excludePropsKey = excludePropsKeys[i++];) {
				if (meta[excludePropsKey]) delete meta[excludePropsKey];
			}
			/*
   excludeProps.forEach(k => {
   	if (meta[k])
   		delete meta[k]
   })*/
		}

		var keys = (0, _keys2.default)(meta),
		    j,
		    key;

		var _loop = function _loop() {
			var v = meta[key],
			    t = typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v),
			    currentPath = path;

			if (!v) return 'continue';

			if (v._power) {
				currentPath = path + '.' + key + '.' + v.name;
				v.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
				return 'continue';
			}

			var isExpression = false,
			    isMeta = false;
			if (t == 'string' && _mkUtils2.default.expression.isExpression(v)) {
				v = _this.execExpression(v, data, path + '.' + key, rowIndex, vars, ctrlPath);
				isExpression = true;
				if (key == '...' && v && (typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) == 'object') {
					(0, _keys2.default)(v).forEach(function (kk) {
						meta[kk] = v[kk];
					});
					delete meta['...'];
				} else {
					if (v && v['_isMeta'] === true) {
						isMeta = true;
						meta[key] = v.value;
					} else {
						meta[key] = v;
					}
				}
			}

			t = typeof t === 'undefined' ? 'undefined' : (0, _typeof3.default)(t);

			if (!_this.needUpdate(v)) return 'continue';

			if (isExpression && !isMeta) {
				return 'continue';
			}

			if (v instanceof Array) {
				_this.updateMeta(v, path + '.' + key, rowIndex, vars, data, ctrlPath);
				return 'continue';
			}

			if (v.name && v.component) {
				currentPath = path + '.' + key + '.' + v.name;
				v.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
				_this.updateMeta(v, currentPath, rowIndex, vars, data, v.path);
			} else {
				currentPath = path + '.' + key;
				v.path = vars ? currentPath + ', ' + vars.join(',') : currentPath;
				_this.updateMeta(v, currentPath, rowIndex, vars, data, ctrlPath);
			}
		};

		for (j = 0; key = keys[j++];) {
			var _ret = _loop();

			if (_ret === 'continue') continue;
		}
	};

	this.getMeta = function (fullPath, propertys, data) {
		var meta = common.getMeta(_this.appInfo, fullPath, propertys),
		    parsedPath = _mkUtils2.default.path.parsePath(fullPath),
		    path = parsedPath.path,
		    rowIndex = parsedPath.vars ? parsedPath.vars[0] : undefined,
		    vars = parsedPath.vars;

		if (!data) data = common.getField(_this.injections.getState()).toJS();

		meta._power = undefined;
		meta.path = fullPath;
		_this.updateMeta(meta, path, rowIndex, vars, data, fullPath);
		return meta;
	};

	this.setMetaForce = function (appName, meta) {
		common.setMetaForce(appName, meta);
	};

	this.focus = function (path) {
		if (_this.isFocus(path)) return false;
		_this.setField('data.other.focusFieldPath', path);
		return true;
	};

	this.focusByEvent = function (e) {
		var path = _mkUtils2.default.path.findPathByEvent(e);
		return _this.focus(path);
	};

	this.isFocus = function (path) {
		if (!path) return false;
		var focusFieldPath = _this.getField('data.other.focusFieldPath');
		if (!focusFieldPath) return false;
		return path.replace(/\s/g, '') == focusFieldPath.replace(/\s/g, '');
	};

	this.getDirectFuns = function () {
		return {
			getMeta: function getMeta() {
				return _this.getMeta.apply(_this, arguments);
			},
			getField: function getField(fieldPath) {
				return _this.getField(fieldPath);
			},
			gm: function gm() {
				return _this.getMeta.apply(_this, arguments);
			},
			gf: function gf(fieldPath) {
				return _this.getField(fieldPath);
			}
		};
	};

	this.toast = function () {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		var Toast = _config2.default.getToast();
		if (!Toast || args.length == 0 || !Toast[args[0]]) return;
		Toast[args[0]].apply(Toast, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.notification = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		var Notification = _config2.default.getNotification();
		if (!Notification || args.length == 0 || !Notification[args[0]]) return;
		Notification[args[0]].apply(Notification, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.modal = function () {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		var Modal = _config2.default.getModal();
		if (!Modal || args.length == 0 || !Modal[args[0]]) return;
		return Modal[args[0]].apply(Modal, (0, _toConsumableArray3.default)(args.slice(1)));
	};

	this.loadApp = function (name, props) {
		return _react2.default.createElement(_mkAppLoader.AppLoader, (0, _extends3.default)({}, props, { name: name }));
	};

	this.gm = this.getMeta;
	this.gf = this.getField;
	this.gfs = this.getFields;
	this.sf = this.setField;
	this.sfs = this.setFields;
	this.findPathByEvent = _mkUtils2.default.path.findPathByEvent;
	this.stringToMoment = _mkUtils2.default.moment.stringToMoment;
	this.momentToString = _mkUtils2.default.moment.momentToString;
	this.fromJS = _immutable.fromJS;
	this.context = _context2.default;
};

function creator(option) {
	return new action(option);
}
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(85) });


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(14);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(23);
var toObject = __webpack_require__(13);
var IObject = __webpack_require__(44);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(49);
module.exports = __webpack_require__(39).f('iterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(97);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(51);
var META = __webpack_require__(91).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(29);
var setToStringTag = __webpack_require__(36);
var uid = __webpack_require__(21);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(39);
var wksDefine = __webpack_require__(40);
var enumKeys = __webpack_require__(92);
var isArray = __webpack_require__(93);
var anObject = __webpack_require__(6);
var isObject = __webpack_require__(10);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(32);
var createDesc = __webpack_require__(15);
var _create = __webpack_require__(35);
var gOPNExt = __webpack_require__(94);
var $GOPD = __webpack_require__(56);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(14);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(55).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(23).f = $propertyIsEnumerable;
  __webpack_require__(38).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(34)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(21)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(5);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(14);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(26);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(55).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {



/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40)('asyncIterator');


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40)('observable');


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(99);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(101);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(31);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(13);
var call = __webpack_require__(102);
var isArrayIter = __webpack_require__(103);
var toLength = __webpack_require__(45);
var createProperty = __webpack_require__(104);
var getIterFn = __webpack_require__(53);

$export($export.S + $export.F * !__webpack_require__(105)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(15);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = creator;

var _immutable = __webpack_require__(42);

var _immutable2 = _interopRequireDefault(_immutable);

var _context = __webpack_require__(59);

var _context2 = _interopRequireDefault(_context);

var _common = __webpack_require__(57);

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer(option) {
	(0, _classCallCheck3.default)(this, reducer);

	_initialiseProps.call(this);

	this.appInfo = option.appInfo;
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.init = function (state, option) {
		var _option$data = option.data,
		    data = _option$data === undefined ? {} : _option$data;


		return _this.initByImmutable(state, {
			data: _immutable2.default.fromJS(data)
		});
	};

	this.initByImmutable = function (state, option) {
		var data = option.data;

		//清除state中非@@开头的属性，那属性是mk-app-loader增加的

		var keys = [];
		state.mapKeys(function (key) {
			if (key.indexOf('@@') === -1) keys.push(key);
		});

		keys.forEach(function (key) {
			state = state.remove(key);
		});

		//设置状态
		return state.set('data', data);
	};

	this.getMeta = common.getMeta;
	this.getField = common.getField;
	this.getFields = common.getFields;
	this.setField = common.setField;
	this.setFields = common.setFields;
	this.gm = common.getMeta;
	this.gf = common.getField;
	this.gfs = common.getFields;
	this.sf = common.setField;
	this.sfs = common.setFields;
	this.context = _context2.default;
};

function creator(option) {
	return new reducer(option);
}
module.exports = exports['default'];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = __webpack_require__(54);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(108);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(22);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(111);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(112);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = wrapper;

var _react = __webpack_require__(41);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(120);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _monkeyKing = __webpack_require__(121);

var _monkeyKing2 = _interopRequireDefault(_monkeyKing);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _mkUtils = __webpack_require__(24);

var _mkUtils2 = _interopRequireDefault(_mkUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapper(option) {
	return function (WrappedComponent) {
		return function (_Component) {
			(0, _inherits3.default)(internal, _Component);

			function internal(props) {
				(0, _classCallCheck3.default)(this, internal);

				var _this = (0, _possibleConstructorReturn3.default)(this, (internal.__proto__ || (0, _getPrototypeOf2.default)(internal)).call(this, props));

				_this.state = { hasError: false };
				return _this;
			}

			(0, _createClass3.default)(internal, [{
				key: 'componentWillMount',
				value: function componentWillMount() {
					this.props.componentWillMount && this.props.componentWillMount();
				}
			}, {
				key: 'componentDidMount',
				value: function componentDidMount() {
					this.props.initView && this.props.initView(this); //兼容以前版本
					this.props.componentDidMount && this.props.componentDidMount();
				}
			}, {
				key: 'shouldComponentUpdate',
				value: function shouldComponentUpdate(nextProps, nextState) {
					if (this.props.shouldComponentUpdate && this.props.shouldComponentUpdate(nextProps, nextState) === true) return true;

					if (nextState.hasError != this.state.hasError) {
						return true;
					}

					for (var o in this.props) {
						if (this.props[o] != nextProps[o]) {
							return true;
						}
					}
					return false;
				}
			}, {
				key: 'componentWillReceiveProps',
				value: function componentWillReceiveProps(nextProps) {
					if (this.state.hasError) {
						this.setState({ hasError: false, error: undefined });
					}

					this.props.componentWillReceiveProps && this.props.componentWillReceiveProps(nextProps);
				}
			}, {
				key: 'componentWillUpdate',
				value: function componentWillUpdate(nextProps, nextState) {
					this.props.componentWillUpdate && this.props.componentWillUpdate(nextProps, nextState);
				}
			}, {
				key: 'componentDidCatch',
				value: function componentDidCatch(error, info) {
					_mkUtils2.default.exception.error(error);
					this.setState({ hasError: true, error: error });

					this.props.componentDidCatch && this.props.componentDidCatch(error, info);
				}
			}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
					this.props.unmount && this.props.unmount(); //兼容以前版本
					this.props.componentWillUnmount && this.props.componentWillUnmount();
				}
			}, {
				key: 'componentDidUpdate',
				value: function componentDidUpdate() {
					this.props.componentDidUpdate && this.props.componentDidUpdate();
				}
			}, {
				key: 'render',
				value: function render() {
					if (this.state.hasError) {
						return _react2.default.createElement(
							'div',
							{ style: { color: 'red' } },
							this.state.error && this.state.error.message
						);
					}

					if (this.props.notRender === true || this.props._notRender === true) return null;

					if (!WrappedComponent) return null;

					if (!this.props.payload || !this.props.payload.get('data')) return null;

					if (this.props.payload.getIn(['data', '_notRender']) === true) return null;

					return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, { monkeyKing: _monkeyKing2.default }));
				}
			}]);
			return internal;
		}(_react.Component);
	};
}
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(13);
var $getPrototypeOf = __webpack_require__(52);

__webpack_require__(46)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(113);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(117);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(116).set });


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(10);
var anObject = __webpack_require__(6);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(31)(Function.call, __webpack_require__(56).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(35) });


/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_120__;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(20);

var _keys2 = _interopRequireDefault(_keys);

var _react = __webpack_require__(41);

var _react2 = _interopRequireDefault(_react);

var _mkAppLoader = __webpack_require__(18);

var _componentFactory = __webpack_require__(33);

var _componentFactory2 = _interopRequireDefault(_componentFactory);

var _omit = __webpack_require__(122);

var _omit2 = _interopRequireDefault(_omit);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _mkUtils = __webpack_require__(24);

var _mkUtils2 = _interopRequireDefault(_mkUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseMetaProps(meta, props, data) {
    var ret = {};

    (0, _keys2.default)(meta).forEach(function (key) {
        var v = meta[key],
            t = typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v);

        if (v instanceof Array) {
            ret[key] = [];

            var i, c;

            for (i = 0; c = v[i++];) {
                //v.forEach(c => {
                if (c instanceof Array) {
                    ret[key] = v;
                } else {
                    var mc = metaToComponent(c, props, data);
                    if (mc instanceof Array) ret[key] = ret[key].concat(mc);else ret[key].push(mc);
                }
            }
        } else if (t == 'object') {
            if (v && v._notParse) {
                ret[key] = v;
            } else {
                ret[key] = metaToComponent(v, props, data);
            }
        }
        /*else if (t == 'function') {
            ret[key] = v()
        }*/
        else {
                ret[key] = v;
            }
    });

    return ret;
}

var toFunction = _mkUtils2.default._.memoize(function (v) {
    return new Function(v);
});

function metaToComponent(meta, props, data) {
    if (!meta) return meta;

    var metaType = typeof meta === 'undefined' ? 'undefined' : (0, _typeof3.default)(meta);

    if (metaType == 'object' && meta['$$typeof']) {
        return meta;
    } else if (metaType == 'object' && meta['_isAMomentObject']) {
        return meta;
    } else if (metaType == 'object' && meta instanceof Date) {
        return meta;
    } else if (metaType == 'object') {
        if (meta.component) {
            if (typeof meta.component == 'function') {
                meta.component = meta.component();
            }
            if (meta._visible === false) return null;

            if (typeof meta._visible === 'function' && meta._visible() === false) return null;

            //for in data.list
            if (meta['_power'] && /for[ ]+in/.test(meta._power)) {
                var p = meta._power.replace(/for[ ]+in/, '').replace(' ', '');

                if (p.indexOf('_rowIndex') != -1) p = p.replace('_rowIndex', meta.path.split(',').length > 1 ? meta.path.split(',')[1].replace(' ', '') : 0);

                var items = props.gf(p);

                if (!items || items.size == 0) return;
                items = items.toJS();
                return items.map(function (o, index) {
                    var childMeta = props.gm(meta.path + ',' + index, undefined, data);
                    delete childMeta._power;
                    return metaToComponent(childMeta, props, data);
                });
            }

            //({rowIndex})=>rowIndex
            if (meta._power && meta._power.indexOf('=>') != -1) {
                return function () {
                    var varsString = toFunction('return ' + meta['_power'])().apply(undefined, arguments);
                    var childMeta = props.gm(meta.path + ',' + varsString, undefined, data);
                    childMeta._power = undefined;
                    return metaToComponent(childMeta, props, data);
                    //return co ? React.cloneElement(co, { path: meta.path + ',' + varsString }) : co
                };
            }

            var componentName = meta.component,
                component = _componentFactory2.default.getComponent(props.appName, componentName);

            /*
            var allProps = {
                key: meta.path,
                ...props,
                ...parseMetaProps(meta, props, data),
            }*/

            var allProps = parseMetaProps(meta, props, data);
            if (!allProps.key) {
                allProps.key = meta.path;
            }

            /*
             var metaProps = parseMetaProps(meta, props, data)
             var metaPropsKeys = Object.keys(metaProps)
            for (var i = 0; i < metaPropsKeys.length; i++) {
                allProps[metaPropsKeys[i]] = metaProps[metaPropsKeys[i]]
            }*/

            delete allProps.component;
            delete allProps.name;

            //使用omit性能较低
            //allProps = omit(allProps, ['clearAppState', 'component', 'name', 'getDirectFuns', 'initView', 'payload'])

            if (componentName == 'AppLoader') {

                var propKeys = (0, _keys2.default)(props),
                    i,
                    key;

                for (i = 0; key = propKeys[i++];) {
                    if (allProps[key] == undefined) {
                        allProps[key] = props[key];
                    }
                }

                //删除一些组件不需要的属性
                delete allProps.clearAppState;
                delete allProps.getDirectFuns;
                delete allProps.initView;
                delete allProps.payload;
                delete allProps.componentWillMount;
                delete allProps.componentDidMount;
                delete allProps.shouldComponentUpdate;
                delete allProps.componentWillReceiveProps;
                delete allProps.componentWillUpdate;
                delete allProps.componentDidCatch;
                delete allProps.componentWillUnmount;
                delete allProps.componentDidUpdate;
                delete allProps.unmount;

                if (!allProps.appName) return null;

                if (allProps._notRender === true && !(0, _mkAppLoader.getApps)()[allProps.appName]) {
                    return null;
                }
                allProps.key = allProps.appName;
                allProps.name = allProps.appName;
                return _react2.default.createElement(component, allProps);
            }

            /*
            delete allProps.store
            delete allProps.appName
            delete allProps.appFullName
            delete allProps.appQuery
            delete allProps.appParams
            delete allProps.storeSubscription
            */

            return _react2.default.createElement(component, allProps);
        } else {
            return parseMetaProps(meta, props, data);
        }
    } else {
        return meta;
    }
}

var MonkeyKing = function MonkeyKing(props) {
    var path = props.path,
        gm = props.gm,
        gf = props.gf;

    var data = gf().toJS();
    return metaToComponent(gm(path, undefined, data), props, data);
};

exports.default = MonkeyKing;
module.exports = exports['default'];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(123);

module.exports = function omit(obj, fields) {
  var copy = assign({}, obj);
  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    delete copy[key];
  }
  return copy;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);
});