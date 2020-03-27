module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(39);
} else {}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(66);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(63);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(70);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(69);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  if (false) {}

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(40);
} else {}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(73);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  EMPTY_BUFFER: Buffer.alloc(0),
  NOOP: function NOOP() {}
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(64);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(65);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(71);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var zlib = __webpack_require__(47);

var bufferUtil = __webpack_require__(15);

var Limiter = __webpack_require__(48);

var _require = __webpack_require__(9),
    kStatusCode = _require.kStatusCode,
    NOOP = _require.NOOP;

var TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
var kPerMessageDeflate = Symbol('permessage-deflate');
var kTotalLength = Symbol('total-length');
var kCallback = Symbol('callback');
var kBuffers = Symbol('buffers');
var kError = Symbol('error'); //
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//

var zlibLimiter;
/**
 * permessage-deflate implementation.
 */

var PerMessageDeflate = /*#__PURE__*/function () {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
   *     of server context takeover
   * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
   *     disabling of client context takeover
   * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
   *     for, or request, a custom client window size
   * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
   * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
   * @param {Number} options.threshold Size (in bytes) below which messages
   *     should not be compressed
   * @param {Number} options.concurrencyLimit The number of concurrent calls to
   *     zlib
   * @param {Boolean} isServer Create the instance in either server or client
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  function PerMessageDeflate(options, isServer, maxPayload) {
    _classCallCheck(this, PerMessageDeflate);

    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold = this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;
    this.params = null;

    if (!zlibLimiter) {
      var concurrency = this._options.concurrencyLimit !== undefined ? this._options.concurrencyLimit : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }
  /**
   * @type {String}
   */


  _createClass(PerMessageDeflate, [{
    key: "offer",

    /**
     * Create an extension negotiation offer.
     *
     * @return {Object} Extension parameters
     * @public
     */
    value: function offer() {
      var params = {};

      if (this._options.serverNoContextTakeover) {
        params.server_no_context_takeover = true;
      }

      if (this._options.clientNoContextTakeover) {
        params.client_no_context_takeover = true;
      }

      if (this._options.serverMaxWindowBits) {
        params.server_max_window_bits = this._options.serverMaxWindowBits;
      }

      if (this._options.clientMaxWindowBits) {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      } else if (this._options.clientMaxWindowBits == null) {
        params.client_max_window_bits = true;
      }

      return params;
    }
    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */

  }, {
    key: "accept",
    value: function accept(configurations) {
      configurations = this.normalizeParams(configurations);
      this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
      return this.params;
    }
    /**
     * Releases all resources used by the extension.
     *
     * @public
     */

  }, {
    key: "cleanup",
    value: function cleanup() {
      if (this._inflate) {
        this._inflate.close();

        this._inflate = null;
      }

      if (this._deflate) {
        var callback = this._deflate[kCallback];

        this._deflate.close();

        this._deflate = null;

        if (callback) {
          callback(new Error('The deflate stream was closed while data was being processed'));
        }
      }
    }
    /**
     *  Accept an extension negotiation offer.
     *
     * @param {Array} offers The extension negotiation offers
     * @return {Object} Accepted configuration
     * @private
     */

  }, {
    key: "acceptAsServer",
    value: function acceptAsServer(offers) {
      var opts = this._options;
      var accepted = offers.find(function (params) {
        if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === 'number' && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === 'number' && !params.client_max_window_bits) {
          return false;
        }

        return true;
      });

      if (!accepted) {
        throw new Error('None of the extension offers can be accepted');
      }

      if (opts.serverNoContextTakeover) {
        accepted.server_no_context_takeover = true;
      }

      if (opts.clientNoContextTakeover) {
        accepted.client_no_context_takeover = true;
      }

      if (typeof opts.serverMaxWindowBits === 'number') {
        accepted.server_max_window_bits = opts.serverMaxWindowBits;
      }

      if (typeof opts.clientMaxWindowBits === 'number') {
        accepted.client_max_window_bits = opts.clientMaxWindowBits;
      } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
        delete accepted.client_max_window_bits;
      }

      return accepted;
    }
    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */

  }, {
    key: "acceptAsClient",
    value: function acceptAsClient(response) {
      var params = response[0];

      if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      }

      if (!params.client_max_window_bits) {
        if (typeof this._options.clientMaxWindowBits === 'number') {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        }
      } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === 'number' && params.client_max_window_bits > this._options.clientMaxWindowBits) {
        throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
      }

      return params;
    }
    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */

  }, {
    key: "normalizeParams",
    value: function normalizeParams(configurations) {
      var _this = this;

      configurations.forEach(function (params) {
        Object.keys(params).forEach(function (key) {
          var value = params[key];

          if (value.length > 1) {
            throw new Error("Parameter \"".concat(key, "\" must have only a single value"));
          }

          value = value[0];

          if (key === 'client_max_window_bits') {
            if (value !== true) {
              var num = +value;

              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError("Invalid value for parameter \"".concat(key, "\": ").concat(value));
              }

              value = num;
            } else if (!_this._isServer) {
              throw new TypeError("Invalid value for parameter \"".concat(key, "\": ").concat(value));
            }
          } else if (key === 'server_max_window_bits') {
            var _num = +value;

            if (!Number.isInteger(_num) || _num < 8 || _num > 15) {
              throw new TypeError("Invalid value for parameter \"".concat(key, "\": ").concat(value));
            }

            value = _num;
          } else if (key === 'client_no_context_takeover' || key === 'server_no_context_takeover') {
            if (value !== true) {
              throw new TypeError("Invalid value for parameter \"".concat(key, "\": ").concat(value));
            }
          } else {
            throw new Error("Unknown parameter \"".concat(key, "\""));
          }

          params[key] = value;
        });
      });
      return configurations;
    }
    /**
     * Decompress data. Concurrency limited.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */

  }, {
    key: "decompress",
    value: function decompress(data, fin, callback) {
      var _this2 = this;

      zlibLimiter.add(function (done) {
        _this2._decompress(data, fin, function (err, result) {
          done();
          callback(err, result);
        });
      });
    }
    /**
     * Compress data. Concurrency limited.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */

  }, {
    key: "compress",
    value: function compress(data, fin, callback) {
      var _this3 = this;

      zlibLimiter.add(function (done) {
        _this3._compress(data, fin, function (err, result) {
          done();
          callback(err, result);
        });
      });
    }
    /**
     * Decompress data.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */

  }, {
    key: "_decompress",
    value: function _decompress(data, fin, callback) {
      var _this4 = this;

      var endpoint = this._isServer ? 'client' : 'server';

      if (!this._inflate) {
        var key = "".concat(endpoint, "_max_window_bits");
        var windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
        this._inflate = zlib.createInflateRaw(_objectSpread({}, this._options.zlibInflateOptions, {
          windowBits: windowBits
        }));
        this._inflate[kPerMessageDeflate] = this;
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        this._inflate.on('error', inflateOnError);

        this._inflate.on('data', inflateOnData);
      }

      this._inflate[kCallback] = callback;

      this._inflate.write(data);

      if (fin) this._inflate.write(TRAILER);

      this._inflate.flush(function () {
        var err = _this4._inflate[kError];

        if (err) {
          _this4._inflate.close();

          _this4._inflate = null;
          callback(err);
          return;
        }

        var data = bufferUtil.concat(_this4._inflate[kBuffers], _this4._inflate[kTotalLength]);

        if (fin && _this4.params["".concat(endpoint, "_no_context_takeover")]) {
          _this4._inflate.close();

          _this4._inflate = null;
        } else {
          _this4._inflate[kTotalLength] = 0;
          _this4._inflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }
    /**
     * Compress data.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */

  }, {
    key: "_compress",
    value: function _compress(data, fin, callback) {
      var _this5 = this;

      var endpoint = this._isServer ? 'server' : 'client';

      if (!this._deflate) {
        var key = "".concat(endpoint, "_max_window_bits");
        var windowBits = typeof this.params[key] !== 'number' ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
        this._deflate = zlib.createDeflateRaw(_objectSpread({}, this._options.zlibDeflateOptions, {
          windowBits: windowBits
        }));
        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = []; //
        // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
        // `zlib.DeflateRaw` instance is closed while data is being processed.
        // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
        // time due to an abnormal WebSocket closure.
        //

        this._deflate.on('error', NOOP);

        this._deflate.on('data', deflateOnData);
      }

      this._deflate[kCallback] = callback;

      this._deflate.write(data);

      this._deflate.flush(zlib.Z_SYNC_FLUSH, function () {
        if (!_this5._deflate) {
          //
          // The deflate stream was closed while data was being processed.
          //
          return;
        }

        var data = bufferUtil.concat(_this5._deflate[kBuffers], _this5._deflate[kTotalLength]);
        if (fin) data = data.slice(0, data.length - 4); //
        // Ensure that the callback will not be called again in
        // `PerMessageDeflate#cleanup()`.
        //

        _this5._deflate[kCallback] = null;

        if (fin && _this5.params["".concat(endpoint, "_no_context_takeover")]) {
          _this5._deflate.close();

          _this5._deflate = null;
        } else {
          _this5._deflate[kTotalLength] = 0;
          _this5._deflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }
  }], [{
    key: "extensionName",
    get: function get() {
      return 'permessage-deflate';
    }
  }]);

  return PerMessageDeflate;
}();

module.exports = PerMessageDeflate;
/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */

function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}
/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */


function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}
/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */


function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(9),
    EMPTY_BUFFER = _require.EMPTY_BUFFER;
/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */


function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];
  var target = Buffer.allocUnsafe(totalLength);
  var offset = 0;

  for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);
  return target;
}
/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */


function _mask(source, mask, output, offset, length) {
  for (var i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}
/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */


function _unmask(buffer, mask) {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  var length = buffer.length;

  for (var i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}
/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */


function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}
/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */


function toBuffer(data) {
  toBuffer.readOnly = true;
  if (Buffer.isBuffer(data)) return data;
  var buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = viewToBuffer(data);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}
/**
 * Converts an `ArrayBuffer` view into a buffer.
 *
 * @param {(DataView|TypedArray)} view The view to convert
 * @return {Buffer} Converted view
 * @private
 */


function viewToBuffer(view) {
  var buf = Buffer.from(view.buffer);

  if (view.byteLength !== view.buffer.byteLength) {
    return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  return buf;
}

try {
  var bufferUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  var bu = bufferUtil.BufferUtil || bufferUtil;
  module.exports = {
    concat: concat,
    mask: function mask(source, _mask2, output, offset, length) {
      if (length < 48) _mask(source, _mask2, output, offset, length);else bu.mask(source, _mask2, output, offset, length);
    },
    toArrayBuffer: toArrayBuffer,
    toBuffer: toBuffer,
    unmask: function unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);else bu.unmask(buffer, mask);
    }
  };
} catch (e)
/* istanbul ignore next */
{
  module.exports = {
    concat: concat,
    mask: _mask,
    toArrayBuffer: toArrayBuffer,
    toBuffer: toBuffer,
    unmask: _unmask
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(61);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(68);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(60);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 22 */
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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = __webpack_require__(10);

var https = __webpack_require__(43);

var http = __webpack_require__(18);

var net = __webpack_require__(44);

var tls = __webpack_require__(45);

var _require = __webpack_require__(19),
    randomBytes = _require.randomBytes,
    createHash = _require.createHash;

var _require2 = __webpack_require__(46),
    URL = _require2.URL;

var PerMessageDeflate = __webpack_require__(14);

var Receiver = __webpack_require__(24);

var Sender = __webpack_require__(27);

var _require3 = __webpack_require__(9),
    BINARY_TYPES = _require3.BINARY_TYPES,
    EMPTY_BUFFER = _require3.EMPTY_BUFFER,
    GUID = _require3.GUID,
    kStatusCode = _require3.kStatusCode,
    kWebSocket = _require3.kWebSocket,
    NOOP = _require3.NOOP;

var _require4 = __webpack_require__(49),
    addEventListener = _require4.addEventListener,
    removeEventListener = _require4.removeEventListener;

var _require5 = __webpack_require__(28),
    format = _require5.format,
    parse = _require5.parse;

var _require6 = __webpack_require__(15),
    toBuffer = _require6.toBuffer;

var readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
var protocolVersions = [8, 13];
var closeTimeout = 30 * 1000;
/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */

var WebSocket = /*#__PURE__*/function (_EventEmitter) {
  _inherits(WebSocket, _EventEmitter);

  var _super = _createSuper(WebSocket);

  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|url.URL)} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  function WebSocket(address, protocols, options) {
    var _this;

    _classCallCheck(this, WebSocket);

    _this = _super.call(this);
    _this.readyState = WebSocket.CONNECTING;
    _this.protocol = '';
    _this._binaryType = BINARY_TYPES[0];
    _this._closeFrameReceived = false;
    _this._closeFrameSent = false;
    _this._closeMessage = '';
    _this._closeTimer = null;
    _this._closeCode = 1006;
    _this._extensions = {};
    _this._receiver = null;
    _this._sender = null;
    _this._socket = null;

    if (address !== null) {
      _this._bufferedAmount = 0;
      _this._isServer = false;
      _this._redirects = 0;

      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (_typeof(protocols) === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient(_assertThisInitialized(_this), address, protocols, options);
    } else {
      _this._isServer = true;
    }

    return _this;
  }

  _createClass(WebSocket, [{
    key: "setSocket",

    /**
     * Set up the socket and the internal resources.
     *
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Number} maxPayload The maximum allowed message size
     * @private
     */
    value: function setSocket(socket, head, maxPayload) {
      var receiver = new Receiver(this._binaryType, this._extensions, this._isServer, maxPayload);
      this._sender = new Sender(socket, this._extensions);
      this._receiver = receiver;
      this._socket = socket;
      receiver[kWebSocket] = this;
      socket[kWebSocket] = this;
      receiver.on('conclude', receiverOnConclude);
      receiver.on('drain', receiverOnDrain);
      receiver.on('error', receiverOnError);
      receiver.on('message', receiverOnMessage);
      receiver.on('ping', receiverOnPing);
      receiver.on('pong', receiverOnPong);
      socket.setTimeout(0);
      socket.setNoDelay();
      if (head.length > 0) socket.unshift(head);
      socket.on('close', socketOnClose);
      socket.on('data', socketOnData);
      socket.on('end', socketOnEnd);
      socket.on('error', socketOnError);
      this.readyState = WebSocket.OPEN;
      this.emit('open');
    }
    /**
     * Emit the `'close'` event.
     *
     * @private
     */

  }, {
    key: "emitClose",
    value: function emitClose() {
      if (!this._socket) {
        this.readyState = WebSocket.CLOSED;
        this.emit('close', this._closeCode, this._closeMessage);
        return;
      }

      if (this._extensions[PerMessageDeflate.extensionName]) {
        this._extensions[PerMessageDeflate.extensionName].cleanup();
      }

      this._receiver.removeAllListeners();

      this.readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
    }
    /**
     * Start a closing handshake.
     *
     *          +----------+   +-----------+   +----------+
     *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
     *    |     +----------+   +-----------+   +----------+     |
     *          +----------+   +-----------+         |
     * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
     *          +----------+   +-----------+   |
     *    |           |                        |   +---+        |
     *                +------------------------+-->|fin| - - - -
     *    |         +---+                      |   +---+
     *     - - - - -|fin|<---------------------+
     *              +---+
     *
     * @param {Number} code Status code explaining why the connection is closing
     * @param {String} data A string explaining why the connection is closing
     * @public
     */

  }, {
    key: "close",
    value: function close(code, data) {
      var _this2 = this;

      if (this.readyState === WebSocket.CLOSED) return;

      if (this.readyState === WebSocket.CONNECTING) {
        var msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this.readyState === WebSocket.CLOSING) {
        if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
        return;
      }

      this.readyState = WebSocket.CLOSING;

      this._sender.close(code, data, !this._isServer, function (err) {
        //
        // This error is handled by the `'error'` listener on the socket. We only
        // want to know if the close frame has been sent here.
        //
        if (err) return;
        _this2._closeFrameSent = true;
        if (_this2._closeFrameReceived) _this2._socket.end();
      }); //
      // Specify a timeout for the closing handshake to complete.
      //


      this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
    }
    /**
     * Send a ping.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the ping is sent
     * @public
     */

  }, {
    key: "ping",
    value: function ping(data, mask, cb) {
      if (this.readyState === WebSocket.CONNECTING) {
        throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
      }

      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (typeof data === 'number') data = data.toString();

      if (this.readyState !== WebSocket.OPEN) {
        sendAfterClose(this, data, cb);
        return;
      }

      if (mask === undefined) mask = !this._isServer;

      this._sender.ping(data || EMPTY_BUFFER, mask, cb);
    }
    /**
     * Send a pong.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the pong is sent
     * @public
     */

  }, {
    key: "pong",
    value: function pong(data, mask, cb) {
      if (this.readyState === WebSocket.CONNECTING) {
        throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
      }

      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (typeof data === 'number') data = data.toString();

      if (this.readyState !== WebSocket.OPEN) {
        sendAfterClose(this, data, cb);
        return;
      }

      if (mask === undefined) mask = !this._isServer;

      this._sender.pong(data || EMPTY_BUFFER, mask, cb);
    }
    /**
     * Send a data message.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress
     *     `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback which is executed when data is written out
     * @public
     */

  }, {
    key: "send",
    value: function send(data, options, cb) {
      if (this.readyState === WebSocket.CONNECTING) {
        throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
      }

      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      if (typeof data === 'number') data = data.toString();

      if (this.readyState !== WebSocket.OPEN) {
        sendAfterClose(this, data, cb);
        return;
      }

      var opts = _objectSpread({
        binary: typeof data !== 'string',
        mask: !this._isServer,
        compress: true,
        fin: true
      }, options);

      if (!this._extensions[PerMessageDeflate.extensionName]) {
        opts.compress = false;
      }

      this._sender.send(data || EMPTY_BUFFER, opts, cb);
    }
    /**
     * Forcibly close the connection.
     *
     * @public
     */

  }, {
    key: "terminate",
    value: function terminate() {
      if (this.readyState === WebSocket.CLOSED) return;

      if (this.readyState === WebSocket.CONNECTING) {
        var msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this._socket) {
        this.readyState = WebSocket.CLOSING;

        this._socket.destroy();
      }
    }
  }, {
    key: "CONNECTING",
    get: function get() {
      return WebSocket.CONNECTING;
    }
  }, {
    key: "CLOSING",
    get: function get() {
      return WebSocket.CLOSING;
    }
  }, {
    key: "CLOSED",
    get: function get() {
      return WebSocket.CLOSED;
    }
  }, {
    key: "OPEN",
    get: function get() {
      return WebSocket.OPEN;
    }
    /**
     * This deviates from the WHATWG interface since ws doesn't support the
     * required default "blob" type (instead we define a custom "nodebuffer"
     * type).
     *
     * @type {String}
     */

  }, {
    key: "binaryType",
    get: function get() {
      return this._binaryType;
    },
    set: function set(type) {
      if (!BINARY_TYPES.includes(type)) return;
      this._binaryType = type; //
      // Allow to change `binaryType` on the fly.
      //

      if (this._receiver) this._receiver._binaryType = type;
    }
    /**
     * @type {Number}
     */

  }, {
    key: "bufferedAmount",
    get: function get() {
      if (!this._socket) return this._bufferedAmount; //
      // `socket.bufferSize` is `undefined` if the socket is closed.
      //

      return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
    }
    /**
     * @type {String}
     */

  }, {
    key: "extensions",
    get: function get() {
      return Object.keys(this._extensions).join();
    }
  }]);

  return WebSocket;
}(EventEmitter);

readyStates.forEach(function (readyState, i) {
  WebSocket[readyState] = i;
}); //
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//

['open', 'error', 'close', 'message'].forEach(function (method) {
  Object.defineProperty(WebSocket.prototype, "on".concat(method), {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get: function get() {
      var listeners = this.listeners(method);

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },

    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set: function set(listener) {
      var listeners = this.listeners(method);

      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }

      this.addEventListener(method, listener);
    }
  });
});
WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;
module.exports = WebSocket;
/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|url.URL)} address The URL to which to connect
 * @param {String} protocols The subprotocols
 * @param {Object} options Connection options
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
 *     permessage-deflate
 * @param {Number} options.handshakeTimeout Timeout in milliseconds for the
 *     handshake request
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version`
 *     header
 * @param {String} options.origin Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {Boolean} options.followRedirects Whether or not to follow redirects
 * @param {Number} options.maxRedirects The maximum number of redirects allowed
 * @private
 */

function initAsClient(websocket, address, protocols, options) {
  var opts = _objectSpread({
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10
  }, options, {
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: undefined,
    auth: undefined,
    host: undefined,
    path: undefined,
    port: undefined
  });

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError("Unsupported protocol version: ".concat(opts.protocolVersion, " ") + "(supported versions: ".concat(protocolVersions.join(', '), ")"));
  }

  var parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket.url = address.href;
  } else {
    parsedUrl = new URL(address);
    websocket.url = address;
  }

  var isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
    throw new Error("Invalid URL: ".concat(websocket.url));
  }

  var isSecure = parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
  var defaultPort = isSecure ? 443 : 80;
  var key = randomBytes(16).toString('base64');
  var get = isSecure ? https.get : http.get;
  var perMessageDeflate;
  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[') ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
  opts.headers = _objectSpread({
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket'
  }, opts.headers);
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
    opts.headers['Sec-WebSocket-Extensions'] = format(_defineProperty({}, PerMessageDeflate.extensionName, perMessageDeflate.offer()));
  }

  if (protocols) {
    opts.headers['Sec-WebSocket-Protocol'] = protocols;
  }

  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }

  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = "".concat(parsedUrl.username, ":").concat(parsedUrl.password);
  }

  if (isUnixSocket) {
    var parts = opts.path.split(':');
    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  var req = websocket._req = get(opts);

  if (opts.timeout) {
    req.on('timeout', function () {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', function (err) {
    if (websocket._req.aborted) return;
    req = websocket._req = null;
    websocket.readyState = WebSocket.CLOSING;
    websocket.emit('error', err);
    websocket.emitClose();
  });
  req.on('response', function (res) {
    var location = res.headers.location;
    var statusCode = res.statusCode;

    if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();
      var addr = new URL(location, address);
      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(websocket, req, "Unexpected server response: ".concat(res.statusCode));
    }
  });
  req.on('upgrade', function (res, socket, head) {
    websocket.emit('upgrade', res); //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //

    if (websocket.readyState !== WebSocket.CONNECTING) return;
    req = websocket._req = null;
    var digest = createHash('sha1').update(key + GUID).digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    var serverProt = res.headers['sec-websocket-protocol'];
    var protList = (protocols || '').split(/, */);
    var protError;

    if (!protocols && serverProt) {
      protError = 'Server sent a subprotocol but none was requested';
    } else if (protocols && !serverProt) {
      protError = 'Server sent no subprotocol';
    } else if (serverProt && !protList.includes(serverProt)) {
      protError = 'Server sent an invalid subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket.protocol = serverProt;

    if (perMessageDeflate) {
      try {
        var extensions = parse(res.headers['sec-websocket-extensions']);

        if (extensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Extensions header');
        return;
      }
    }

    websocket.setSocket(socket, head, opts.maxPayload);
  });
}
/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */


function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}
/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */


function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = options.host;
  }

  return tls.connect(options);
}
/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
 *     socket to destroy
 * @param {String} message The error message
 * @private
 */


function abortHandshake(websocket, stream, message) {
  websocket.readyState = WebSocket.CLOSING;
  var err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();
    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}
/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} data The data to send
 * @param {Function} cb Callback
 * @private
 */


function sendAfterClose(websocket, data, cb) {
  if (data) {
    var length = toBuffer(data).length; //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //

    if (websocket._socket) websocket._sender._bufferedBytes += length;else websocket._bufferedAmount += length;
  }

  if (cb) {
    var err = new Error("WebSocket is not open: readyState ".concat(websocket.readyState, " ") + "(".concat(readyStates[websocket.readyState], ")"));
    cb(err);
  }
}
/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {String} reason The reason for closing
 * @private
 */


function receiverOnConclude(code, reason) {
  var websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket._socket.resume();

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;
  if (code === 1005) websocket.close();else websocket.close(code, reason);
}
/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */


function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}
/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */


function receiverOnError(err) {
  var websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket.readyState = WebSocket.CLOSING;
  websocket._closeCode = err[kStatusCode];
  websocket.emit('error', err);

  websocket._socket.destroy();
}
/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */


function receiverOnFinish() {
  this[kWebSocket].emitClose();
}
/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
 * @private
 */


function receiverOnMessage(data) {
  this[kWebSocket].emit('message', data);
}
/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */


function receiverOnPing(data) {
  var websocket = this[kWebSocket];
  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}
/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */


function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}
/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */


function socketOnClose() {
  var websocket = this[kWebSocket];
  this.removeListener('close', socketOnClose);
  this.removeListener('end', socketOnEnd);
  websocket.readyState = WebSocket.CLOSING; //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk and emitted synchronously in a single
  // `'data'` event.
  //

  websocket._socket.read();

  websocket._receiver.end();

  this.removeListener('data', socketOnData);
  this[kWebSocket] = undefined;
  clearTimeout(websocket._closeTimer);

  if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);

    websocket._receiver.on('finish', receiverOnFinish);
  }
}
/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */


function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}
/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */


function socketOnEnd() {
  var websocket = this[kWebSocket];
  websocket.readyState = WebSocket.CLOSING;

  websocket._receiver.end();

  this.end();
}
/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */


function socketOnError() {
  var websocket = this[kWebSocket];
  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket.readyState = WebSocket.CLOSING;
    this.destroy();
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = __webpack_require__(25),
    Writable = _require.Writable;

var PerMessageDeflate = __webpack_require__(14);

var _require2 = __webpack_require__(9),
    BINARY_TYPES = _require2.BINARY_TYPES,
    EMPTY_BUFFER = _require2.EMPTY_BUFFER,
    kStatusCode = _require2.kStatusCode,
    kWebSocket = _require2.kWebSocket;

var _require3 = __webpack_require__(15),
    concat = _require3.concat,
    toArrayBuffer = _require3.toArrayBuffer,
    unmask = _require3.unmask;

var _require4 = __webpack_require__(26),
    isValidStatusCode = _require4.isValidStatusCode,
    isValidUTF8 = _require4.isValidUTF8;

var GET_INFO = 0;
var GET_PAYLOAD_LENGTH_16 = 1;
var GET_PAYLOAD_LENGTH_64 = 2;
var GET_MASK = 3;
var GET_DATA = 4;
var INFLATING = 5;
/**
 * HyBi Receiver implementation.
 *
 * @extends stream.Writable
 */

var Receiver = /*#__PURE__*/function (_Writable) {
  _inherits(Receiver, _Writable);

  var _super = _createSuper(Receiver);

  /**
   * Creates a Receiver instance.
   *
   * @param {String} binaryType The type for binary data
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Boolean} isServer Specifies whether to operate in client or server
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  function Receiver(binaryType, extensions, isServer, maxPayload) {
    var _this;

    _classCallCheck(this, Receiver);

    _this = _super.call(this);
    _this._binaryType = binaryType || BINARY_TYPES[0];
    _this[kWebSocket] = undefined;
    _this._extensions = extensions || {};
    _this._isServer = !!isServer;
    _this._maxPayload = maxPayload | 0;
    _this._bufferedBytes = 0;
    _this._buffers = [];
    _this._compressed = false;
    _this._payloadLength = 0;
    _this._mask = undefined;
    _this._fragmented = 0;
    _this._masked = false;
    _this._fin = false;
    _this._opcode = 0;
    _this._totalPayloadLength = 0;
    _this._messageLength = 0;
    _this._fragments = [];
    _this._state = GET_INFO;
    _this._loop = false;
    return _this;
  }
  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   */


  _createClass(Receiver, [{
    key: "_write",
    value: function _write(chunk, encoding, cb) {
      if (this._opcode === 0x08 && this._state == GET_INFO) return cb();
      this._bufferedBytes += chunk.length;

      this._buffers.push(chunk);

      this.startLoop(cb);
    }
    /**
     * Consumes `n` bytes from the buffered data.
     *
     * @param {Number} n The number of bytes to consume
     * @return {Buffer} The consumed bytes
     * @private
     */

  }, {
    key: "consume",
    value: function consume(n) {
      this._bufferedBytes -= n;
      if (n === this._buffers[0].length) return this._buffers.shift();

      if (n < this._buffers[0].length) {
        var buf = this._buffers[0];
        this._buffers[0] = buf.slice(n);
        return buf.slice(0, n);
      }

      var dst = Buffer.allocUnsafe(n);

      do {
        var _buf = this._buffers[0];
        var offset = dst.length - n;

        if (n >= _buf.length) {
          dst.set(this._buffers.shift(), offset);
        } else {
          dst.set(new Uint8Array(_buf.buffer, _buf.byteOffset, n), offset);
          this._buffers[0] = _buf.slice(n);
        }

        n -= _buf.length;
      } while (n > 0);

      return dst;
    }
    /**
     * Starts the parsing loop.
     *
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "startLoop",
    value: function startLoop(cb) {
      var err;
      this._loop = true;

      do {
        switch (this._state) {
          case GET_INFO:
            err = this.getInfo();
            break;

          case GET_PAYLOAD_LENGTH_16:
            err = this.getPayloadLength16();
            break;

          case GET_PAYLOAD_LENGTH_64:
            err = this.getPayloadLength64();
            break;

          case GET_MASK:
            this.getMask();
            break;

          case GET_DATA:
            err = this.getData(cb);
            break;

          default:
            // `INFLATING`
            this._loop = false;
            return;
        }
      } while (this._loop);

      cb(err);
    }
    /**
     * Reads the first two bytes of a frame.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "getInfo",
    value: function getInfo() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      var buf = this.consume(2);

      if ((buf[0] & 0x30) !== 0x00) {
        this._loop = false;
        return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
      }

      var compressed = (buf[0] & 0x40) === 0x40;

      if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      this._fin = (buf[0] & 0x80) === 0x80;
      this._opcode = buf[0] & 0x0f;
      this._payloadLength = buf[1] & 0x7f;

      if (this._opcode === 0x00) {
        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (!this._fragmented) {
          this._loop = false;
          return error(RangeError, 'invalid opcode 0', true, 1002);
        }

        this._opcode = this._fragmented;
      } else if (this._opcode === 0x01 || this._opcode === 0x02) {
        if (this._fragmented) {
          this._loop = false;
          return error(RangeError, "invalid opcode ".concat(this._opcode), true, 1002);
        }

        this._compressed = compressed;
      } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
        if (!this._fin) {
          this._loop = false;
          return error(RangeError, 'FIN must be set', true, 1002);
        }

        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (this._payloadLength > 0x7d) {
          this._loop = false;
          return error(RangeError, "invalid payload length ".concat(this._payloadLength), true, 1002);
        }
      } else {
        this._loop = false;
        return error(RangeError, "invalid opcode ".concat(this._opcode), true, 1002);
      }

      if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
      this._masked = (buf[1] & 0x80) === 0x80;

      if (this._isServer) {
        if (!this._masked) {
          this._loop = false;
          return error(RangeError, 'MASK must be set', true, 1002);
        }
      } else if (this._masked) {
        this._loop = false;
        return error(RangeError, 'MASK must be clear', true, 1002);
      }

      if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;else return this.haveLength();
    }
    /**
     * Gets extended payload length (7+16).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "getPayloadLength16",
    value: function getPayloadLength16() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      this._payloadLength = this.consume(2).readUInt16BE(0);
      return this.haveLength();
    }
    /**
     * Gets extended payload length (7+64).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "getPayloadLength64",
    value: function getPayloadLength64() {
      if (this._bufferedBytes < 8) {
        this._loop = false;
        return;
      }

      var buf = this.consume(8);
      var num = buf.readUInt32BE(0); //
      // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
      // if payload length is greater than this number.
      //

      if (num > Math.pow(2, 53 - 32) - 1) {
        this._loop = false;
        return error(RangeError, 'Unsupported WebSocket frame: payload length > 2^53 - 1', false, 1009);
      }

      this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
      return this.haveLength();
    }
    /**
     * Payload length has been read.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "haveLength",
    value: function haveLength() {
      if (this._payloadLength && this._opcode < 0x08) {
        this._totalPayloadLength += this._payloadLength;

        if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
          this._loop = false;
          return error(RangeError, 'Max payload size exceeded', false, 1009);
        }
      }

      if (this._masked) this._state = GET_MASK;else this._state = GET_DATA;
    }
    /**
     * Reads mask bytes.
     *
     * @private
     */

  }, {
    key: "getMask",
    value: function getMask() {
      if (this._bufferedBytes < 4) {
        this._loop = false;
        return;
      }

      this._mask = this.consume(4);
      this._state = GET_DATA;
    }
    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "getData",
    value: function getData(cb) {
      var data = EMPTY_BUFFER;

      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = false;
          return;
        }

        data = this.consume(this._payloadLength);
        if (this._masked) unmask(data, this._mask);
      }

      if (this._opcode > 0x07) return this.controlMessage(data);

      if (this._compressed) {
        this._state = INFLATING;
        this.decompress(data, cb);
        return;
      }

      if (data.length) {
        //
        // This message is not compressed so its lenght is the sum of the payload
        // length of all fragments.
        //
        this._messageLength = this._totalPayloadLength;

        this._fragments.push(data);
      }

      return this.dataMessage();
    }
    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "decompress",
    value: function decompress(data, cb) {
      var _this2 = this;

      var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      perMessageDeflate.decompress(data, this._fin, function (err, buf) {
        if (err) return cb(err);

        if (buf.length) {
          _this2._messageLength += buf.length;

          if (_this2._messageLength > _this2._maxPayload && _this2._maxPayload > 0) {
            return cb(error(RangeError, 'Max payload size exceeded', false, 1009));
          }

          _this2._fragments.push(buf);
        }

        var er = _this2.dataMessage();

        if (er) return cb(er);

        _this2.startLoop(cb);
      });
    }
    /**
     * Handles a data message.
     *
     * @return {(Error|undefined)} A possible error
     * @private
     */

  }, {
    key: "dataMessage",
    value: function dataMessage() {
      if (this._fin) {
        var messageLength = this._messageLength;
        var fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];

        if (this._opcode === 2) {
          var data;

          if (this._binaryType === 'nodebuffer') {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === 'arraybuffer') {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else {
            data = fragments;
          }

          this.emit('message', data);
        } else {
          var buf = concat(fragments, messageLength);

          if (!isValidUTF8(buf)) {
            this._loop = false;
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('message', buf.toString());
        }
      }

      this._state = GET_INFO;
    }
    /**
     * Handles a control message.
     *
     * @param {Buffer} data Data to handle
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */

  }, {
    key: "controlMessage",
    value: function controlMessage(data) {
      if (this._opcode === 0x08) {
        this._loop = false;

        if (data.length === 0) {
          this.emit('conclude', 1005, '');
          this.end();
        } else if (data.length === 1) {
          return error(RangeError, 'invalid payload length 1', true, 1002);
        } else {
          var code = data.readUInt16BE(0);

          if (!isValidStatusCode(code)) {
            return error(RangeError, "invalid status code ".concat(code), true, 1002);
          }

          var buf = data.slice(2);

          if (!isValidUTF8(buf)) {
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('conclude', code, buf.toString());
          this.end();
        }
      } else if (this._opcode === 0x09) {
        this.emit('ping', data);
      } else {
        this.emit('pong', data);
      }

      this._state = GET_INFO;
    }
  }]);

  return Receiver;
}(Writable);

module.exports = Receiver;
/**
 * Builds an error object.
 *
 * @param {(Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @return {(Error|RangeError)} The error
 * @private
 */

function error(ErrorCtor, message, prefix, statusCode) {
  var err = new ErrorCtor(prefix ? "Invalid WebSocket frame: ".concat(message) : message);
  Error.captureStackTrace(err, error);
  err[kStatusCode] = statusCode;
  return err;
}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

try {
  var isValidUTF8 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  exports.isValidUTF8 = _typeof(isValidUTF8) === 'object' ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
  : isValidUTF8;
} catch (e)
/* istanbul ignore next */
{
  exports.isValidUTF8 = function () {
    return true;
  };
}
/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */


exports.isValidStatusCode = function (code) {
  return code >= 1000 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3000 && code <= 4999;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(19),
    randomFillSync = _require.randomFillSync;

var PerMessageDeflate = __webpack_require__(14);

var _require2 = __webpack_require__(9),
    EMPTY_BUFFER = _require2.EMPTY_BUFFER;

var _require3 = __webpack_require__(26),
    isValidStatusCode = _require3.isValidStatusCode;

var _require4 = __webpack_require__(15),
    applyMask = _require4.mask,
    toBuffer = _require4.toBuffer;

var mask = Buffer.alloc(4);
/**
 * HyBi Sender implementation.
 */

var Sender = /*#__PURE__*/function () {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  function Sender(socket, extensions) {
    _classCallCheck(this, Sender);

    this._extensions = extensions || {};
    this._socket = socket;
    this._firstFragment = true;
    this._compress = false;
    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }
  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */


  _createClass(Sender, [{
    key: "close",

    /**
     * Sends a close message to the other peer.
     *
     * @param {(Number|undefined)} code The status code component of the body
     * @param {String} data The message component of the body
     * @param {Boolean} mask Specifies whether or not to mask the message
     * @param {Function} cb Callback
     * @public
     */
    value: function close(code, data, mask, cb) {
      var buf;

      if (code === undefined) {
        buf = EMPTY_BUFFER;
      } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
        throw new TypeError('First argument must be a valid error code number');
      } else if (data === undefined || data === '') {
        buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(code, 0);
      } else {
        var length = Buffer.byteLength(data);

        if (length > 123) {
          throw new RangeError('The message must not be greater than 123 bytes');
        }

        buf = Buffer.allocUnsafe(2 + length);
        buf.writeUInt16BE(code, 0);
        buf.write(data, 2);
      }

      if (this._deflating) {
        this.enqueue([this.doClose, buf, mask, cb]);
      } else {
        this.doClose(buf, mask, cb);
      }
    }
    /**
     * Frames and sends a close message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "doClose",
    value: function doClose(data, mask, cb) {
      this.sendFrame(Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x08,
        mask: mask,
        readOnly: false
      }), cb);
    }
    /**
     * Sends a ping message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */

  }, {
    key: "ping",
    value: function ping(data, mask, cb) {
      var buf = toBuffer(data);

      if (buf.length > 125) {
        throw new RangeError('The data size must not be greater than 125 bytes');
      }

      if (this._deflating) {
        this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
      } else {
        this.doPing(buf, mask, toBuffer.readOnly, cb);
      }
    }
    /**
     * Frames and sends a ping message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "doPing",
    value: function doPing(data, mask, readOnly, cb) {
      this.sendFrame(Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x09,
        mask: mask,
        readOnly: readOnly
      }), cb);
    }
    /**
     * Sends a pong message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */

  }, {
    key: "pong",
    value: function pong(data, mask, cb) {
      var buf = toBuffer(data);

      if (buf.length > 125) {
        throw new RangeError('The data size must not be greater than 125 bytes');
      }

      if (this._deflating) {
        this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
      } else {
        this.doPong(buf, mask, toBuffer.readOnly, cb);
      }
    }
    /**
     * Frames and sends a pong message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "doPong",
    value: function doPong(data, mask, readOnly, cb) {
      this.sendFrame(Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x0a,
        mask: mask,
        readOnly: readOnly
      }), cb);
    }
    /**
     * Sends a data message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */

  }, {
    key: "send",
    value: function send(data, options, cb) {
      var buf = toBuffer(data);
      var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      var opcode = options.binary ? 2 : 1;
      var rsv1 = options.compress;

      if (this._firstFragment) {
        this._firstFragment = false;

        if (rsv1 && perMessageDeflate) {
          rsv1 = buf.length >= perMessageDeflate._threshold;
        }

        this._compress = rsv1;
      } else {
        rsv1 = false;
        opcode = 0;
      }

      if (options.fin) this._firstFragment = true;

      if (perMessageDeflate) {
        var opts = {
          fin: options.fin,
          rsv1: rsv1,
          opcode: opcode,
          mask: options.mask,
          readOnly: toBuffer.readOnly
        };

        if (this._deflating) {
          this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
        } else {
          this.dispatch(buf, this._compress, opts, cb);
        }
      } else {
        this.sendFrame(Sender.frame(buf, {
          fin: options.fin,
          rsv1: false,
          opcode: opcode,
          mask: options.mask,
          readOnly: toBuffer.readOnly
        }), cb);
      }
    }
    /**
     * Dispatches a data message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} compress Specifies whether or not to compress `data`
     * @param {Object} options Options object
     * @param {Number} options.opcode The opcode
     * @param {Boolean} options.readOnly Specifies whether `data` can be modified
     * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "dispatch",
    value: function dispatch(data, compress, options, cb) {
      var _this = this;

      if (!compress) {
        this.sendFrame(Sender.frame(data, options), cb);
        return;
      }

      var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      this._deflating = true;
      perMessageDeflate.compress(data, options.fin, function (_, buf) {
        if (_this._socket.destroyed) {
          var err = new Error('The socket was closed while data was being compressed');
          if (typeof cb === 'function') cb(err);

          for (var i = 0; i < _this._queue.length; i++) {
            var callback = _this._queue[i][4];
            if (typeof callback === 'function') callback(err);
          }

          return;
        }

        _this._deflating = false;
        options.readOnly = false;

        _this.sendFrame(Sender.frame(buf, options), cb);

        _this.dequeue();
      });
    }
    /**
     * Executes queued send operations.
     *
     * @private
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      while (!this._deflating && this._queue.length) {
        var params = this._queue.shift();

        this._bufferedBytes -= params[1].length;
        Reflect.apply(params[0], this, params.slice(1));
      }
    }
    /**
     * Enqueues a send operation.
     *
     * @param {Array} params Send operation parameters.
     * @private
     */

  }, {
    key: "enqueue",
    value: function enqueue(params) {
      this._bufferedBytes += params[1].length;

      this._queue.push(params);
    }
    /**
     * Sends a frame.
     *
     * @param {Buffer[]} list The frame to send
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "sendFrame",
    value: function sendFrame(list, cb) {
      if (list.length === 2) {
        this._socket.cork();

        this._socket.write(list[0]);

        this._socket.write(list[1], cb);

        this._socket.uncork();
      } else {
        this._socket.write(list[0], cb);
      }
    }
  }], [{
    key: "frame",
    value: function frame(data, options) {
      var merge = options.mask && options.readOnly;
      var offset = options.mask ? 6 : 2;
      var payloadLength = data.length;

      if (data.length >= 65536) {
        offset += 8;
        payloadLength = 127;
      } else if (data.length > 125) {
        offset += 2;
        payloadLength = 126;
      }

      var target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
      target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
      if (options.rsv1) target[0] |= 0x40;
      target[1] = payloadLength;

      if (payloadLength === 126) {
        target.writeUInt16BE(data.length, 2);
      } else if (payloadLength === 127) {
        target.writeUInt32BE(0, 2);
        target.writeUInt32BE(data.length, 6);
      }

      if (!options.mask) return [target, data];
      randomFillSync(mask, 0, 4);
      target[1] |= 0x80;
      target[offset - 4] = mask[0];
      target[offset - 3] = mask[1];
      target[offset - 2] = mask[2];
      target[offset - 1] = mask[3];

      if (merge) {
        applyMask(data, mask, target, offset, data.length);
        return [target];
      }

      applyMask(data, mask, data, 0, data.length);
      return [target, data];
    }
  }]);

  return Sender;
}();

module.exports = Sender;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore

var tokenChars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];
/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */

function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];else dest[name].push(elem);
}
/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */


function parse(header) {
  var offers = Object.create(null);
  if (header === undefined || header === '') return offers;
  var params = Object.create(null);
  var mustUnescape = false;
  var isEscaping = false;
  var inQuotes = false;
  var extensionName;
  var paramName;
  var start = -1;
  var end = -1;
  var i = 0;

  for (; i < header.length; i++) {
    var code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20
      /* ' ' */
      || code === 0x09
      /* '\t' */
      ) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b
      /* ';' */
      || code === 0x2c
      /* ',' */
      ) {
          if (start === -1) {
            throw new SyntaxError("Unexpected character at index ".concat(i));
          }

          if (end === -1) end = i;
          var name = header.slice(start, end);

          if (code === 0x2c) {
            push(offers, name, params);
            params = Object.create(null);
          } else {
            extensionName = name;
          }

          start = end = -1;
        } else {
        throw new SyntaxError("Unexpected character at index ".concat(i));
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError("Unexpected character at index ".concat(i));
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);

        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d
      /* '=' */
      && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError("Unexpected character at index ".concat(i));
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError("Unexpected character at index ".concat(i));
        }

        if (start === -1) start = i;else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22
        /* '"' */
        && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c
        /* '\' */
        ) {
            isEscaping = true;
          } else {
          throw new SyntaxError("Unexpected character at index ".concat(i));
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError("Unexpected character at index ".concat(i));
        }

        if (end === -1) end = i;
        var value = header.slice(start, end);

        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }

        push(params, paramName, value);

        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError("Unexpected character at index ".concat(i));
      }
    }
  }

  if (start === -1 || inQuotes) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  var token = header.slice(start, end);

  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }

    push(offers, extensionName, params);
  }

  return offers;
}
/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */


function format(extensions) {
  return Object.keys(extensions).map(function (extension) {
    var configurations = extensions[extension];
    if (!Array.isArray(configurations)) configurations = [configurations];
    return configurations.map(function (params) {
      return [extension].concat(Object.keys(params).map(function (k) {
        var values = params[k];
        if (!Array.isArray(values)) values = [values];
        return values.map(function (v) {
          return v === true ? k : "".concat(k, "=").concat(v);
        }).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
}

module.exports = {
  format: format,
  parse: parse
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(58)();
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WebSocket = __webpack_require__(23);

WebSocket.createWebSocketStream = __webpack_require__(50);
WebSocket.Server = __webpack_require__(51);
WebSocket.Receiver = __webpack_require__(24);
WebSocket.Sender = __webpack_require__(27);
module.exports = WebSocket;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(56);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//  Import support https://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd
(function (name, definition) {
  if (true) {
    module.exports = definition();
  } else {}
})("clipboard", function () {
  if (typeof document === 'undefined' || !document.addEventListener) {
    return null;
  }

  var clipboard = {};

  clipboard.copy = function () {
    var _intercept = false;
    var _data = null; // Map from data type (e.g. "text/html") to value.

    var _bogusSelection = false;

    function cleanup() {
      _intercept = false;
      _data = null;

      if (_bogusSelection) {
        window.getSelection().removeAllRanges();
      }

      _bogusSelection = false;
    }

    document.addEventListener("copy", function (e) {
      if (_intercept) {
        for (var key in _data) {
          e.clipboardData.setData(key, _data[key]);
        }

        e.preventDefault();
      }
    }); // Workaround for Safari: https://bugs.webkit.org/show_bug.cgi?id=156529

    function bogusSelect() {
      var sel = document.getSelection(); // If "nothing" is selected...

      if (!document.queryCommandEnabled("copy") && sel.isCollapsed) {
        // ... temporarily select the entire body.
        //
        // We select the entire body because:
        // - it's guaranteed to exist,
        // - it works (unlike, say, document.head, or phantom element that is
        //   not inserted into the DOM),
        // - it doesn't seem to flicker (due to the synchronous copy event), and
        // - it avoids modifying the DOM (can trigger mutation observers).
        //
        // Because we can't do proper feature detection (we already checked
        // document.queryCommandEnabled("copy") , which actually gives a false
        // negative for Blink when nothing is selected) and UA sniffing is not
        // reliable (a lot of UA strings contain "Safari"), this will also
        // happen for some browsers other than Safari. :-()
        var range = document.createRange();
        range.selectNodeContents(document.body);
        sel.removeAllRanges();
        sel.addRange(range);
        _bogusSelection = true;
      }
    }

    ;
    return function (data) {
      return new Promise(function (resolve, reject) {
        _intercept = true;

        if (typeof data === "string") {
          _data = {
            "text/plain": data
          };
        } else if (data instanceof Node) {
          _data = {
            "text/html": new XMLSerializer().serializeToString(data)
          };
        } else if (data instanceof Object) {
          _data = data;
        } else {
          reject("Invalid data type. Must be string, DOM node, or an object mapping MIME types to strings.");
        }

        function triggerCopy(tryBogusSelect) {
          try {
            if (document.execCommand("copy")) {
              // document.execCommand is synchronous: http://www.w3.org/TR/2015/WD-clipboard-apis-20150421/#integration-with-rich-text-editing-apis
              // So we can call resolve() back here.
              cleanup();
              resolve();
            } else {
              if (!tryBogusSelect) {
                bogusSelect();
                triggerCopy(true);
              } else {
                cleanup();
                throw new Error("Unable to copy. Perhaps it's not available in your browser?");
              }
            }
          } catch (e) {
            cleanup();
            reject(e);
          }
        }

        triggerCopy(false);
      });
    };
  }();

  clipboard.paste = function () {
    var _intercept = false;

    var _resolve;

    var _dataType;

    document.addEventListener("paste", function (e) {
      if (_intercept) {
        _intercept = false;
        e.preventDefault();
        var resolve = _resolve;
        _resolve = null;
        resolve(e.clipboardData.getData(_dataType));
      }
    });
    return function (dataType) {
      return new Promise(function (resolve, reject) {
        _intercept = true;
        _resolve = resolve;
        _dataType = dataType || "text/plain";

        try {
          if (!document.execCommand("paste")) {
            _intercept = false;
            reject(new Error("Unable to paste. Pasting only works in Internet Explorer at the moment."));
          }
        } catch (e) {
          _intercept = false;
          reject(new Error(e));
        }
      });
    };
  }(); // Handle IE behaviour.


  if (typeof ClipboardEvent === "undefined" && typeof window.clipboardData !== "undefined" && typeof window.clipboardData.setData !== "undefined") {
    /*! promise-polyfill 2.0.1 */
    (function (a) {
      function b(a, b) {
        return function () {
          a.apply(b, arguments);
        };
      }

      function c(a) {
        if ("object" != _typeof(this)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof a) throw new TypeError("not a function");
        this._state = null, this._value = null, this._deferreds = [], i(a, b(e, this), b(f, this));
      }

      function d(a) {
        var b = this;
        return null === this._state ? void this._deferreds.push(a) : void j(function () {
          var c = b._state ? a.onFulfilled : a.onRejected;
          if (null === c) return void (b._state ? a.resolve : a.reject)(b._value);
          var d;

          try {
            d = c(b._value);
          } catch (e) {
            return void a.reject(e);
          }

          a.resolve(d);
        });
      }

      function e(a) {
        try {
          if (a === this) throw new TypeError("A promise cannot be resolved with itself.");

          if (a && ("object" == _typeof(a) || "function" == typeof a)) {
            var c = a.then;
            if ("function" == typeof c) return void i(b(c, a), b(e, this), b(f, this));
          }

          this._state = !0, this._value = a, g.call(this);
        } catch (d) {
          f.call(this, d);
        }
      }

      function f(a) {
        this._state = !1, this._value = a, g.call(this);
      }

      function g() {
        for (var a = 0, b = this._deferreds.length; b > a; a++) {
          d.call(this, this._deferreds[a]);
        }

        this._deferreds = null;
      }

      function h(a, b, c, d) {
        this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, this.resolve = c, this.reject = d;
      }

      function i(a, b, c) {
        var d = !1;

        try {
          a(function (a) {
            d || (d = !0, b(a));
          }, function (a) {
            d || (d = !0, c(a));
          });
        } catch (e) {
          if (d) return;
          d = !0, c(e);
        }
      }

      var j = c.immediateFn || "function" == typeof setImmediate && setImmediate || function (a) {
        setTimeout(a, 1);
      },
          k = Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      };

      c.prototype["catch"] = function (a) {
        return this.then(null, a);
      }, c.prototype.then = function (a, b) {
        var e = this;
        return new c(function (c, f) {
          d.call(e, new h(a, b, c, f));
        });
      }, c.all = function () {
        var a = Array.prototype.slice.call(1 === arguments.length && k(arguments[0]) ? arguments[0] : arguments);
        return new c(function (b, c) {
          function d(f, g) {
            try {
              if (g && ("object" == _typeof(g) || "function" == typeof g)) {
                var h = g.then;
                if ("function" == typeof h) return void h.call(g, function (a) {
                  d(f, a);
                }, c);
              }

              a[f] = g, 0 === --e && b(a);
            } catch (i) {
              c(i);
            }
          }

          if (0 === a.length) return b([]);

          for (var e = a.length, f = 0; f < a.length; f++) {
            d(f, a[f]);
          }
        });
      }, c.resolve = function (a) {
        return a && "object" == _typeof(a) && a.constructor === c ? a : new c(function (b) {
          b(a);
        });
      }, c.reject = function (a) {
        return new c(function (b, c) {
          c(a);
        });
      }, c.race = function (a) {
        return new c(function (b, c) {
          for (var d = 0, e = a.length; e > d; d++) {
            a[d].then(b, c);
          }
        });
      },  true && module.exports ? module.exports = c : a.Promise || (a.Promise = c);
    })(this);

    clipboard.copy = function (data) {
      return new Promise(function (resolve, reject) {
        // IE supports string and URL types: https://msdn.microsoft.com/en-us/library/ms536744(v=vs.85).aspx
        // We only support the string type for now.
        if (typeof data !== "string" && !("text/plain" in data)) {
          throw new Error("You must provide a text/plain type.");
        }

        var strData = typeof data === "string" ? data : data["text/plain"];
        var copySucceeded = window.clipboardData.setData("Text", strData);

        if (copySucceeded) {
          resolve();
        } else {
          reject(new Error("Copying was rejected."));
        }
      });
    };

    clipboard.paste = function () {
      return new Promise(function (resolve, reject) {
        var strData = window.clipboardData.getData("Text");

        if (strData) {
          resolve(strData);
        } else {
          // The user rejected the paste request.
          reject(new Error("Pasting was rejected."));
        }
      });
    };
  }

  return clipboard;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(62);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(67);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if ( true && _typeof(__webpack_require__(30)) === 'object' && __webpack_require__(30)) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();

/***/ }),
/* 37 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Used for built-in method references. */

var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */

var now = function now() {
  return root.Date.now();
};
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */


function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */


function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = _typeof(value);

  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */


function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = throttle;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(72);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.0.0-fec00a869
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var k = __webpack_require__(22),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.concurrent_mode") : 60111,
    y = n ? Symbol.for("react.forward_ref") : 60112,
    z = n ? Symbol.for("react.suspense") : 60113,
    aa = n ? Symbol.for("react.memo") : 60115,
    ba = n ? Symbol.for("react.lazy") : 60116,
    A = "function" === typeof Symbol && Symbol.iterator;

function ca(a, b, d, c, e, g, h, f) {
  if (!a) {
    a = void 0;
    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [d, c, e, g, h, f],
          m = 0;
      a = Error(b.replace(/%s/g, function () {
        return l[m++];
      }));
      a.name = "Invariant Violation";
    }
    a.framesToPop = 1;
    throw a;
  }
}

function B(a) {
  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
    d += "&args[]=" + encodeURIComponent(arguments[c + 1]);
  }

  ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
}

var C = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    D = {};

function E(a, b, d) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = d || C;
}

E.prototype.isReactComponent = {};

E.prototype.setState = function (a, b) {
  "object" !== _typeof(a) && "function" !== typeof a && null != a ? B("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function F() {}

F.prototype = E.prototype;

function G(a, b, d) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = d || C;
}

var H = G.prototype = new F();
H.constructor = G;
k(H, E.prototype);
H.isPureReactComponent = !0;
var I = {
  current: null
},
    J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, d) {
  var c = void 0,
      e = {},
      g = null,
      h = null;
  if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) e.children = d;else if (1 < f) {
    for (var l = Array(f), m = 0; m < f; m++) {
      l[m] = arguments[m + 2];
    }

    e.children = l;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === e[c] && (e[c] = f[c]);
  }
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: h,
    props: e,
    _owner: J.current
  };
}

function da(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function N(a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var O = /\/+/g,
    P = [];

function Q(a, b, d, c) {
  if (P.length) {
    var e = P.pop();
    e.result = a;
    e.keyPrefix = b;
    e.func = d;
    e.context = c;
    e.count = 0;
    return e;
  }

  return {
    result: a,
    keyPrefix: b,
    func: d,
    context: c,
    count: 0
  };
}

function R(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > P.length && P.push(a);
}

function S(a, b, d, c) {
  var e = _typeof(a);

  if ("undefined" === e || "boolean" === e) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (e) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return d(c, a, "" === b ? "." + T(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
    e = a[h];
    var f = b + T(e, h);
    g += S(e, f, d, c);
  } else if (null === a || "object" !== _typeof(a) ? f = null : (f = A && a[A] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(e = a.next()).done;) {
    e = e.value, f = b + T(e, h++), g += S(e, f, d, c);
  } else "object" === e && (d = "" + a, B("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));
  return g;
}

function U(a, b, d) {
  return null == a ? 0 : S(a, "", b, d);
}

function T(a, b) {
  return "object" === _typeof(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function ea(a, b) {
  a.func.call(a.context, b, a.count++);
}

function fa(a, b, d) {
  var c = a.result,
      e = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? V(a, c, d, function (a) {
    return a;
  }) : null != a && (N(a) && (a = da(a, e + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + d)), c.push(a));
}

function V(a, b, d, c, e) {
  var g = "";
  null != d && (g = ("" + d).replace(O, "$&/") + "/");
  b = Q(b, g, c, e);
  U(a, fa, b);
  R(b);
}

function W() {
  var a = I.current;
  null === a ? B("298") : void 0;
  return a;
}

var X = {
  Children: {
    map: function map(a, b, d) {
      if (null == a) return a;
      var c = [];
      V(a, c, null, b, d);
      return c;
    },
    forEach: function forEach(a, b, d) {
      if (null == a) return a;
      b = Q(null, null, b, d);
      U(a, ea, b);
      R(b);
    },
    count: function count(a) {
      return U(a, function () {
        return null;
      }, null);
    },
    toArray: function toArray(a) {
      var b = [];
      V(a, b, null, function (a) {
        return a;
      });
      return b;
    },
    only: function only(a) {
      N(a) ? void 0 : B("143");
      return a;
    }
  },
  createRef: function createRef() {
    return {
      current: null
    };
  },
  Component: E,
  PureComponent: G,
  createContext: function createContext(a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: w,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    a.Provider = {
      $$typeof: v,
      _context: a
    };
    return a.Consumer = a;
  },
  forwardRef: function forwardRef(a) {
    return {
      $$typeof: y,
      render: a
    };
  },
  lazy: function lazy(a) {
    return {
      $$typeof: ba,
      _ctor: a,
      _status: -1,
      _result: null
    };
  },
  memo: function memo(a, b) {
    return {
      $$typeof: aa,
      type: a,
      compare: void 0 === b ? null : b
    };
  },
  useCallback: function useCallback(a, b) {
    return W().useCallback(a, b);
  },
  useContext: function useContext(a, b) {
    return W().useContext(a, b);
  },
  useEffect: function useEffect(a, b) {
    return W().useEffect(a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, d) {
    return W().useImperativeHandle(a, b, d);
  },
  useDebugValue: function useDebugValue() {},
  useLayoutEffect: function useLayoutEffect(a, b) {
    return W().useLayoutEffect(a, b);
  },
  useMemo: function useMemo(a, b) {
    return W().useMemo(a, b);
  },
  useReducer: function useReducer(a, b, d) {
    return W().useReducer(a, b, d);
  },
  useRef: function useRef(a) {
    return W().useRef(a);
  },
  useState: function useState(a) {
    return W().useState(a);
  },
  Fragment: r,
  StrictMode: t,
  Suspense: z,
  createElement: M,
  cloneElement: function cloneElement(a, b, d) {
    null === a || void 0 === a ? B("267", a) : void 0;
    var c = void 0,
        e = k({}, a.props),
        g = a.key,
        h = a.ref,
        f = a._owner;

    if (null != b) {
      void 0 !== b.ref && (h = b.ref, f = J.current);
      void 0 !== b.key && (g = "" + b.key);
      var l = void 0;
      a.type && a.type.defaultProps && (l = a.type.defaultProps);

      for (c in b) {
        K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }
    }

    c = arguments.length - 2;
    if (1 === c) e.children = d;else if (1 < c) {
      l = Array(c);

      for (var m = 0; m < c; m++) {
        l[m] = arguments[m + 2];
      }

      e.children = l;
    }
    return {
      $$typeof: p,
      type: a.type,
      key: g,
      ref: h,
      props: e,
      _owner: f
    };
  },
  createFactory: function createFactory(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: N,
  version: "16.7.0-canary-fec00a869",
  unstable_ConcurrentMode: x,
  unstable_Profiler: u,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentDispatcher: I,
    ReactCurrentOwner: J,
    assign: k
  }
},
    Y = {
  default: X
},
    Z = Y && X || Y;
module.exports = Z.default || Z;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.0.0-fec00a869
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var aa = __webpack_require__(0),
    p = __webpack_require__(22),
    ba = __webpack_require__(41);

function ca(a, b, c, d, e, f, g, h) {
  if (!a) {
    a = void 0;
    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var l = [c, d, e, f, g, h],
          k = 0;
      a = Error(b.replace(/%s/g, function () {
        return l[k++];
      }));
      a.name = "Invariant Violation";
    }
    a.framesToPop = 1;
    throw a;
  }
}

function t(a) {
  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) {
    c += "&args[]=" + encodeURIComponent(arguments[d + 1]);
  }

  ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
}

aa ? void 0 : t("227");

function da(a, b, c, d, e, f, g, h, l) {
  var k = Array.prototype.slice.call(arguments, 3);

  try {
    b.apply(c, k);
  } catch (m) {
    this.onError(m);
  }
}

var ea = !1,
    fa = null,
    ha = !1,
    ia = null,
    ja = {
  onError: function onError(a) {
    ea = !0;
    fa = a;
  }
};

function ka(a, b, c, d, e, f, g, h, l) {
  ea = !1;
  fa = null;
  da.apply(ja, arguments);
}

function la(a, b, c, d, e, f, g, h, l) {
  ka.apply(this, arguments);

  if (ea) {
    if (ea) {
      var k = fa;
      ea = !1;
      fa = null;
    } else t("198"), k = void 0;

    ha || (ha = !0, ia = k);
  }
}

var ma = null,
    na = {};

function oa() {
  if (ma) for (var a in na) {
    var b = na[a],
        c = ma.indexOf(a);
    -1 < c ? void 0 : t("96", a);

    if (!pa[c]) {
      b.extractEvents ? void 0 : t("97", a);
      pa[c] = b;
      c = b.eventTypes;

      for (var d in c) {
        var e = void 0;
        var f = c[d],
            g = b,
            h = d;
        ra.hasOwnProperty(h) ? t("99", h) : void 0;
        ra[h] = f;
        var l = f.phasedRegistrationNames;

        if (l) {
          for (e in l) {
            l.hasOwnProperty(e) && sa(l[e], g, h);
          }

          e = !0;
        } else f.registrationName ? (sa(f.registrationName, g, h), e = !0) : e = !1;

        e ? void 0 : t("98", d, a);
      }
    }
  }
}

function sa(a, b, c) {
  ta[a] ? t("100", a) : void 0;
  ta[a] = b;
  ua[a] = b.eventTypes[c].dependencies;
}

var pa = [],
    ra = {},
    ta = {},
    ua = {},
    va = null,
    wa = null,
    xa = null;

function ya(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = xa(c);
  la(d, b, void 0, a);
  a.currentTarget = null;
}

function za(a, b) {
  null == b ? t("30") : void 0;
  if (null == a) return b;

  if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;
    a.push(b);
    return a;
  }

  return Array.isArray(b) ? [a].concat(b) : [a, b];
}

function Aa(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}

var Ba = null;

function Ca(a) {
  if (a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;
    if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
      ya(a, b[d], c[d]);
    } else b && ya(a, b, c);
    a._dispatchListeners = null;
    a._dispatchInstances = null;
    a.isPersistent() || a.constructor.release(a);
  }
}

var Da = {
  injectEventPluginOrder: function injectEventPluginOrder(a) {
    ma ? t("101") : void 0;
    ma = Array.prototype.slice.call(a);
    oa();
  },
  injectEventPluginsByName: function injectEventPluginsByName(a) {
    var b = !1,
        c;

    for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        na.hasOwnProperty(c) && na[c] === d || (na[c] ? t("102", c) : void 0, na[c] = d, b = !0);
      }
    }

    b && oa();
  }
};

function Ea(a, b) {
  var c = a.stateNode;
  if (!c) return null;
  var d = va(c);
  if (!d) return null;
  c = d[b];

  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;

    default:
      a = !1;
  }

  if (a) return null;
  c && "function" !== typeof c ? t("231", b, _typeof(c)) : void 0;
  return c;
}

function Fa(a) {
  null !== a && (Ba = za(Ba, a));
  a = Ba;
  Ba = null;
  if (a && (Aa(a, Ca), Ba ? t("95") : void 0, ha)) throw a = ia, ha = !1, ia = null, a;
}

var Ga = Math.random().toString(36).slice(2),
    Ha = "__reactInternalInstance$" + Ga,
    Ia = "__reactEventHandlers$" + Ga;

function Ja(a) {
  if (a[Ha]) return a[Ha];

  for (; !a[Ha];) {
    if (a.parentNode) a = a.parentNode;else return null;
  }

  a = a[Ha];
  return 5 === a.tag || 6 === a.tag ? a : null;
}

function Ka(a) {
  a = a[Ha];
  return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
}

function La(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  t("33");
}

function Ma(a) {
  return a[Ia] || null;
}

function Na(a) {
  do {
    a = a.return;
  } while (a && 5 !== a.tag);

  return a ? a : null;
}

function Oa(a, b, c) {
  if (b = Ea(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = za(c._dispatchListeners, b), c._dispatchInstances = za(c._dispatchInstances, a);
}

function Pa(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    for (var b = a._targetInst, c = []; b;) {
      c.push(b), b = Na(b);
    }

    for (b = c.length; 0 < b--;) {
      Oa(c[b], "captured", a);
    }

    for (b = 0; b < c.length; b++) {
      Oa(c[b], "bubbled", a);
    }
  }
}

function Qa(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Ea(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = za(c._dispatchListeners, b), c._dispatchInstances = za(c._dispatchInstances, a));
}

function Ra(a) {
  a && a.dispatchConfig.registrationName && Qa(a._targetInst, null, a);
}

function Sa(a) {
  Aa(a, Pa);
}

var Ta = !("undefined" === typeof window || !window.document || !window.document.createElement);

function Ua(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var Va = {
  animationend: Ua("Animation", "AnimationEnd"),
  animationiteration: Ua("Animation", "AnimationIteration"),
  animationstart: Ua("Animation", "AnimationStart"),
  transitionend: Ua("Transition", "TransitionEnd")
},
    Wa = {},
    Xa = {};
Ta && (Xa = document.createElement("div").style, "AnimationEvent" in window || (delete Va.animationend.animation, delete Va.animationiteration.animation, delete Va.animationstart.animation), "TransitionEvent" in window || delete Va.transitionend.transition);

function Ya(a) {
  if (Wa[a]) return Wa[a];
  if (!Va[a]) return a;
  var b = Va[a],
      c;

  for (c in b) {
    if (b.hasOwnProperty(c) && c in Xa) return Wa[a] = b[c];
  }

  return a;
}

var Za = Ya("animationend"),
    $a = Ya("animationiteration"),
    ab = Ya("animationstart"),
    bb = Ya("transitionend"),
    cb = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    db = null,
    eb = null,
    fb = null;

function gb() {
  if (fb) return fb;
  var a,
      b = eb,
      c = b.length,
      d,
      e = "value" in db ? db.value : db.textContent,
      f = e.length;

  for (a = 0; a < c && b[a] === e[a]; a++) {
    ;
  }

  var g = c - a;

  for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {
    ;
  }

  return fb = e.slice(a, 1 < d ? 1 - d : void 0);
}

function hb() {
  return !0;
}

function ib() {
  return !1;
}

function A(a, b, c, d) {
  this.dispatchConfig = a;
  this._targetInst = b;
  this.nativeEvent = c;
  a = this.constructor.Interface;

  for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }

  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? hb : ib;
  this.isPropagationStopped = ib;
  return this;
}

p(A.prototype, {
  preventDefault: function preventDefault() {
    this.defaultPrevented = !0;
    var a = this.nativeEvent;
    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = hb);
  },
  stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;
    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = hb);
  },
  persist: function persist() {
    this.isPersistent = hb;
  },
  isPersistent: ib,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;

    for (b in a) {
      this[b] = null;
    }

    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = ib;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
A.Interface = {
  type: null,
  target: null,
  currentTarget: function currentTarget() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

A.extend = function (a) {
  function b() {}

  function c() {
    return d.apply(this, arguments);
  }

  var d = this;
  b.prototype = d.prototype;
  var e = new b();
  p(e, c.prototype);
  c.prototype = e;
  c.prototype.constructor = c;
  c.Interface = p({}, d.Interface, a);
  c.extend = d.extend;
  jb(c);
  return c;
};

jb(A);

function kb(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();
    this.call(e, a, b, c, d);
    return e;
  }

  return new this(a, b, c, d);
}

function lb(a) {
  a instanceof this ? void 0 : t("279");
  a.destructor();
  10 > this.eventPool.length && this.eventPool.push(a);
}

function jb(a) {
  a.eventPool = [];
  a.getPooled = kb;
  a.release = lb;
}

var mb = A.extend({
  data: null
}),
    nb = A.extend({
  data: null
}),
    ob = [9, 13, 27, 32],
    pb = Ta && "CompositionEvent" in window,
    qb = null;
Ta && "documentMode" in document && (qb = document.documentMode);
var rb = Ta && "TextEvent" in window && !qb,
    sb = Ta && (!pb || qb && 8 < qb && 11 >= qb),
    ub = String.fromCharCode(32),
    vb = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: "onBeforeInput",
      captured: "onBeforeInputCapture"
    },
    dependencies: ["compositionend", "keypress", "textInput", "paste"]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: "onCompositionEnd",
      captured: "onCompositionEndCapture"
    },
    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture"
    },
    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: "onCompositionUpdate",
      captured: "onCompositionUpdateCapture"
    },
    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
  }
},
    wb = !1;

function xb(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== ob.indexOf(b.keyCode);

    case "keydown":
      return 229 !== b.keyCode;

    case "keypress":
    case "mousedown":
    case "blur":
      return !0;

    default:
      return !1;
  }
}

function yb(a) {
  a = a.detail;
  return "object" === _typeof(a) && "data" in a ? a.data : null;
}

var zb = !1;

function Ab(a, b) {
  switch (a) {
    case "compositionend":
      return yb(b);

    case "keypress":
      if (32 !== b.which) return null;
      wb = !0;
      return ub;

    case "textInput":
      return a = b.data, a === ub && wb ? null : a;

    default:
      return null;
  }
}

function Bb(a, b) {
  if (zb) return "compositionend" === a || !pb && xb(a, b) ? (a = gb(), fb = eb = db = null, zb = !1, a) : null;

  switch (a) {
    case "paste":
      return null;

    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }

      return null;

    case "compositionend":
      return sb && "ko" !== b.locale ? null : b.data;

    default:
      return null;
  }
}

var Cb = {
  eventTypes: vb,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = void 0;
    var f = void 0;
    if (pb) b: {
      switch (a) {
        case "compositionstart":
          e = vb.compositionStart;
          break b;

        case "compositionend":
          e = vb.compositionEnd;
          break b;

        case "compositionupdate":
          e = vb.compositionUpdate;
          break b;
      }

      e = void 0;
    } else zb ? xb(a, c) && (e = vb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = vb.compositionStart);
    e ? (sb && "ko" !== c.locale && (zb || e !== vb.compositionStart ? e === vb.compositionEnd && zb && (f = gb()) : (db = d, eb = "value" in db ? db.value : db.textContent, zb = !0)), e = mb.getPooled(e, b, c, d), f ? e.data = f : (f = yb(c), null !== f && (e.data = f)), Sa(e), f = e) : f = null;
    (a = rb ? Ab(a, c) : Bb(a, c)) ? (b = nb.getPooled(vb.beforeInput, b, c, d), b.data = a, Sa(b)) : b = null;
    return null === f ? b : null === b ? f : [f, b];
  }
},
    Db = null,
    Eb = null,
    Fb = null;

function Gb(a) {
  if (a = wa(a)) {
    "function" !== typeof Db ? t("280") : void 0;
    var b = va(a.stateNode);
    Db(a.stateNode, a.type, b);
  }
}

function Hb(a) {
  Eb ? Fb ? Fb.push(a) : Fb = [a] : Eb = a;
}

function Ib() {
  if (Eb) {
    var a = Eb,
        b = Fb;
    Fb = Eb = null;
    Gb(a);
    if (b) for (a = 0; a < b.length; a++) {
      Gb(b[a]);
    }
  }
}

function Jb(a, b) {
  return a(b);
}

function Kb(a, b, c) {
  return a(b, c);
}

function Lb() {}

var Mb = !1;

function Nb(a, b) {
  if (Mb) return a(b);
  Mb = !0;

  try {
    return Jb(a, b);
  } finally {
    if (Mb = !1, null !== Eb || null !== Fb) Lb(), Ib();
  }
}

var Ob = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
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
  week: !0
};

function Pb(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!Ob[a.type] : "textarea" === b ? !0 : !1;
}

function Rb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}

function Sb(a) {
  if (!Ta) return !1;
  a = "on" + a;
  var b = (a in document);
  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
  return b;
}

function Tb(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}

function Ub(a) {
  var b = Tb(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];

  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function get() {
        return e.call(this);
      },
      set: function set(a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function getValue() {
        return d;
      },
      setValue: function setValue(a) {
        d = "" + a;
      },
      stopTracking: function stopTracking() {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}

function Vb(a) {
  a._valueTracker || (a._valueTracker = Ub(a));
}

function Wb(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = Tb(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}

var Xb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Yb = /^(.*)[\\\/]/,
    D = "function" === typeof Symbol && Symbol.for,
    Zb = D ? Symbol.for("react.element") : 60103,
    $b = D ? Symbol.for("react.portal") : 60106,
    ac = D ? Symbol.for("react.fragment") : 60107,
    bc = D ? Symbol.for("react.strict_mode") : 60108,
    cc = D ? Symbol.for("react.profiler") : 60114,
    dc = D ? Symbol.for("react.provider") : 60109,
    ec = D ? Symbol.for("react.context") : 60110,
    fc = D ? Symbol.for("react.concurrent_mode") : 60111,
    gc = D ? Symbol.for("react.forward_ref") : 60112,
    hc = D ? Symbol.for("react.suspense") : 60113,
    ic = D ? Symbol.for("react.memo") : 60115,
    jc = D ? Symbol.for("react.lazy") : 60116,
    kc = "function" === typeof Symbol && Symbol.iterator;

function lc(a) {
  if (null === a || "object" !== _typeof(a)) return null;
  a = kc && a[kc] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function mc(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case fc:
      return "ConcurrentMode";

    case ac:
      return "Fragment";

    case $b:
      return "Portal";

    case cc:
      return "Profiler";

    case bc:
      return "StrictMode";

    case hc:
      return "Suspense";
  }

  if ("object" === _typeof(a)) switch (a.$$typeof) {
    case ec:
      return "Context.Consumer";

    case dc:
      return "Context.Provider";

    case gc:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case ic:
      return mc(a.type);

    case jc:
      if (a = 1 === a._status ? a._result : null) return mc(a);
  }
  return null;
}

function nc(a) {
  var b = "";

  do {
    a: switch (a.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var c = "";
        break a;

      default:
        var d = a._debugOwner,
            e = a._debugSource,
            f = mc(a.type);
        c = null;
        d && (c = mc(d.type));
        d = f;
        f = "";
        e ? f = " (at " + e.fileName.replace(Yb, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
        c = "\n    in " + (d || "Unknown") + f;
    }

    b += c;
    a = a.return;
  } while (a);

  return b;
}

var oc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    pc = Object.prototype.hasOwnProperty,
    qc = {},
    rc = {};

function sc(a) {
  if (pc.call(rc, a)) return !0;
  if (pc.call(qc, a)) return !1;
  if (oc.test(a)) return rc[a] = !0;
  qc[a] = !0;
  return !1;
}

function tc(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (_typeof(b)) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function uc(a, b, c, d) {
  if (null === b || "undefined" === typeof b || tc(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function F(a, b, c, d, e) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
}

var G = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  G[a] = new F(a, 0, !1, a, null);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  G[b] = new F(b, 1, !1, a[1], null);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  G[a] = new F(a, 2, !1, a.toLowerCase(), null);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  G[a] = new F(a, 2, !1, a, null);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  G[a] = new F(a, 3, !1, a.toLowerCase(), null);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  G[a] = new F(a, 3, !0, a, null);
});
["capture", "download"].forEach(function (a) {
  G[a] = new F(a, 4, !1, a, null);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  G[a] = new F(a, 6, !1, a, null);
});
["rowSpan", "start"].forEach(function (a) {
  G[a] = new F(a, 5, !1, a.toLowerCase(), null);
});
var vc = /[\-:]([a-z])/g;

function wc(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(vc, wc);
  G[b] = new F(b, 1, !1, a, null);
});
"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(vc, wc);
  G[b] = new F(b, 1, !1, a, "http://www.w3.org/1999/xlink");
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(vc, wc);
  G[b] = new F(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
});
G.tabIndex = new F("tabIndex", 1, !1, "tabindex", null);

function xc(a, b, c, d) {
  var e = G.hasOwnProperty(b) ? G[b] : null;
  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
  f || (uc(b, c, e, d) && (c = null), d || null === e ? sc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}

function yc(a) {
  switch (_typeof(a)) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;

    default:
      return "";
  }
}

function zc(a, b) {
  var c = b.checked;
  return p({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}

function Ac(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;
  c = yc(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}

function Bc(a, b) {
  b = b.checked;
  null != b && xc(a, "checked", b, !1);
}

function Cc(a, b) {
  Bc(a, b);
  var c = yc(b.value),
      d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? Dc(a, b.type, c) : b.hasOwnProperty("defaultValue") && Dc(a, b.type, yc(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}

function Ec(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }

  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !a.defaultChecked;
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}

function Dc(a, b, c) {
  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}

var Fc = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
  }
};

function Gc(a, b, c) {
  a = A.getPooled(Fc.change, a, b, c);
  a.type = "change";
  Hb(c);
  Sa(a);
  return a;
}

var Hc = null,
    Ic = null;

function Jc(a) {
  Fa(a);
}

function Kc(a) {
  var b = La(a);
  if (Wb(b)) return a;
}

function Lc(a, b) {
  if ("change" === a) return b;
}

var Mc = !1;
Ta && (Mc = Sb("input") && (!document.documentMode || 9 < document.documentMode));

function Nc() {
  Hc && (Hc.detachEvent("onpropertychange", Oc), Ic = Hc = null);
}

function Oc(a) {
  "value" === a.propertyName && Kc(Ic) && (a = Gc(Ic, a, Rb(a)), Nb(Jc, a));
}

function Pc(a, b, c) {
  "focus" === a ? (Nc(), Hc = b, Ic = c, Hc.attachEvent("onpropertychange", Oc)) : "blur" === a && Nc();
}

function Qc(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Kc(Ic);
}

function Rc(a, b) {
  if ("click" === a) return Kc(b);
}

function Sc(a, b) {
  if ("input" === a || "change" === a) return Kc(b);
}

var Tc = {
  eventTypes: Fc,
  _isInputEventSupported: Mc,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? La(b) : window,
        f = void 0,
        g = void 0,
        h = e.nodeName && e.nodeName.toLowerCase();
    "select" === h || "input" === h && "file" === e.type ? f = Lc : Pb(e) ? Mc ? f = Sc : (f = Qc, g = Pc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = Rc);
    if (f && (f = f(a, b))) return Gc(f, c, d);
    g && g(a, e, b);
    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && Dc(e, "number", e.value);
  }
},
    Uc = A.extend({
  view: null,
  detail: null
}),
    Vc = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};

function Wc(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Vc[a]) ? !!b[a] : !1;
}

function Xc() {
  return Wc;
}

var Yc = 0,
    Zc = 0,
    $c = !1,
    ad = !1,
    bd = Uc.extend({
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
  getModifierState: Xc,
  button: null,
  buttons: null,
  relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  },
  movementX: function movementX(a) {
    if ("movementX" in a) return a.movementX;
    var b = Yc;
    Yc = a.screenX;
    return $c ? "mousemove" === a.type ? a.screenX - b : 0 : ($c = !0, 0);
  },
  movementY: function movementY(a) {
    if ("movementY" in a) return a.movementY;
    var b = Zc;
    Zc = a.screenY;
    return ad ? "mousemove" === a.type ? a.screenY - b : 0 : (ad = !0, 0);
  }
}),
    cd = bd.extend({
  pointerId: null,
  width: null,
  height: null,
  pressure: null,
  tangentialPressure: null,
  tiltX: null,
  tiltY: null,
  twist: null,
  pointerType: null,
  isPrimary: null
}),
    dd = {
  mouseEnter: {
    registrationName: "onMouseEnter",
    dependencies: ["mouseout", "mouseover"]
  },
  mouseLeave: {
    registrationName: "onMouseLeave",
    dependencies: ["mouseout", "mouseover"]
  },
  pointerEnter: {
    registrationName: "onPointerEnter",
    dependencies: ["pointerout", "pointerover"]
  },
  pointerLeave: {
    registrationName: "onPointerLeave",
    dependencies: ["pointerout", "pointerover"]
  }
},
    ed = {
  eventTypes: dd,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = "mouseover" === a || "pointerover" === a,
        f = "mouseout" === a || "pointerout" === a;
    if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;
    e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;
    f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Ja(b) : null) : f = null;
    if (f === b) return null;
    var g = void 0,
        h = void 0,
        l = void 0,
        k = void 0;
    if ("mouseout" === a || "mouseover" === a) g = bd, h = dd.mouseLeave, l = dd.mouseEnter, k = "mouse";else if ("pointerout" === a || "pointerover" === a) g = cd, h = dd.pointerLeave, l = dd.pointerEnter, k = "pointer";
    var m = null == f ? e : La(f);
    e = null == b ? e : La(b);
    a = g.getPooled(h, f, c, d);
    a.type = k + "leave";
    a.target = m;
    a.relatedTarget = e;
    c = g.getPooled(l, b, c, d);
    c.type = k + "enter";
    c.target = e;
    c.relatedTarget = m;
    d = b;
    if (f && d) a: {
      b = f;
      e = d;
      k = 0;

      for (g = b; g; g = Na(g)) {
        k++;
      }

      g = 0;

      for (l = e; l; l = Na(l)) {
        g++;
      }

      for (; 0 < k - g;) {
        b = Na(b), k--;
      }

      for (; 0 < g - k;) {
        e = Na(e), g--;
      }

      for (; k--;) {
        if (b === e || b === e.alternate) break a;
        b = Na(b);
        e = Na(e);
      }

      b = null;
    } else b = null;
    e = b;

    for (b = []; f && f !== e;) {
      k = f.alternate;
      if (null !== k && k === e) break;
      b.push(f);
      f = Na(f);
    }

    for (f = []; d && d !== e;) {
      k = d.alternate;
      if (null !== k && k === e) break;
      f.push(d);
      d = Na(d);
    }

    for (d = 0; d < b.length; d++) {
      Qa(b[d], "bubbled", a);
    }

    for (d = f.length; 0 < d--;) {
      Qa(f[d], "captured", c);
    }

    return [a, c];
  }
};

function fd(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var gd = Object.prototype.hasOwnProperty;

function jd(a, b) {
  if (fd(a, b)) return !0;
  if ("object" !== _typeof(a) || null === a || "object" !== _typeof(b) || null === b) return !1;
  var c = Object.keys(a),
      d = Object.keys(b);
  if (c.length !== d.length) return !1;

  for (d = 0; d < c.length; d++) {
    if (!gd.call(b, c[d]) || !fd(a[c[d]], b[c[d]])) return !1;
  }

  return !0;
}

function kd(a) {
  var b = a;
  if (a.alternate) for (; b.return;) {
    b = b.return;
  } else {
    if (0 !== (b.effectTag & 2)) return 1;

    for (; b.return;) {
      if (b = b.return, 0 !== (b.effectTag & 2)) return 1;
    }
  }
  return 3 === b.tag ? 2 : 3;
}

function ld(a) {
  2 !== kd(a) ? t("188") : void 0;
}

function md(a) {
  var b = a.alternate;
  if (!b) return b = kd(a), 3 === b ? t("188") : void 0, 1 === b ? null : a;

  for (var c = a, d = b;;) {
    var e = c.return,
        f = e ? e.alternate : null;
    if (!e || !f) break;

    if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return ld(e), a;
        if (g === d) return ld(e), b;
        g = g.sibling;
      }

      t("188");
    }

    if (c.return !== d.return) c = e, d = f;else {
      g = !1;

      for (var h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }

        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }

        h = h.sibling;
      }

      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }

          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }

          h = h.sibling;
        }

        g ? void 0 : t("189");
      }
    }
    c.alternate !== d ? t("190") : void 0;
  }

  3 !== c.tag ? t("188") : void 0;
  return c.stateNode.current === c ? a : b;
}

function nd(a) {
  a = md(a);
  if (!a) return null;

  for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;
    if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;

      for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  return null;
}

var od = A.extend({
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    pd = A.extend({
  clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }
}),
    qd = Uc.extend({
  relatedTarget: null
});

function rd(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}

var sd = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
},
    td = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
},
    ud = Uc.extend({
  key: function key(a) {
    if (a.key) {
      var b = sd[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }

    return "keypress" === a.type ? (a = rd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? td[a.keyCode] || "Unidentified" : "";
  },
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: Xc,
  charCode: function charCode(a) {
    return "keypress" === a.type ? rd(a) : 0;
  },
  keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  },
  which: function which(a) {
    return "keypress" === a.type ? rd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }
}),
    vd = bd.extend({
  dataTransfer: null
}),
    wd = Uc.extend({
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: Xc
}),
    xd = A.extend({
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
}),
    yd = bd.extend({
  deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: null,
  deltaMode: null
}),
    zd = [["abort", "abort"], [Za, "animationEnd"], [$a, "animationIteration"], [ab, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [bb, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
    Ad = {},
    Bd = {};

function Cd(a, b) {
  var c = a[0];
  a = a[1];
  var d = "on" + (a[0].toUpperCase() + a.slice(1));
  b = {
    phasedRegistrationNames: {
      bubbled: d,
      captured: d + "Capture"
    },
    dependencies: [c],
    isInteractive: b
  };
  Ad[a] = b;
  Bd[c] = b;
}

[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["auxclick", "auxClick"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
  Cd(a, !0);
});
zd.forEach(function (a) {
  Cd(a, !1);
});
var Dd = {
  eventTypes: Ad,
  isInteractiveTopLevelEventType: function isInteractiveTopLevelEventType(a) {
    a = Bd[a];
    return void 0 !== a && !0 === a.isInteractive;
  },
  extractEvents: function extractEvents(a, b, c, d) {
    var e = Bd[a];
    if (!e) return null;

    switch (a) {
      case "keypress":
        if (0 === rd(c)) return null;

      case "keydown":
      case "keyup":
        a = ud;
        break;

      case "blur":
      case "focus":
        a = qd;
        break;

      case "click":
        if (2 === c.button) return null;

      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
        a = bd;
        break;

      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
        a = vd;
        break;

      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
        a = wd;
        break;

      case Za:
      case $a:
      case ab:
        a = od;
        break;

      case bb:
        a = xd;
        break;

      case "scroll":
        a = Uc;
        break;

      case "wheel":
        a = yd;
        break;

      case "copy":
      case "cut":
      case "paste":
        a = pd;
        break;

      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
        a = cd;
        break;

      default:
        a = A;
    }

    b = a.getPooled(e, b, c, d);
    Sa(b);
    return b;
  }
},
    Ed = Dd.isInteractiveTopLevelEventType,
    Fd = [];

function Gd(a) {
  var b = a.targetInst,
      c = b;

  do {
    if (!c) {
      a.ancestors.push(c);
      break;
    }

    var d;

    for (d = c; d.return;) {
      d = d.return;
    }

    d = 3 !== d.tag ? null : d.stateNode.containerInfo;
    if (!d) break;
    a.ancestors.push(c);
    c = Ja(d);
  } while (c);

  for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c];
    var e = Rb(a.nativeEvent);
    d = a.topLevelType;

    for (var f = a.nativeEvent, g = null, h = 0; h < pa.length; h++) {
      var l = pa[h];
      l && (l = l.extractEvents(d, b, f, e)) && (g = za(g, l));
    }

    Fa(g);
  }
}

var Hd = !0;

function H(a, b) {
  if (!b) return null;
  var c = (Ed(a) ? Id : Jd).bind(null, a);
  b.addEventListener(a, c, !1);
}

function Kd(a, b) {
  if (!b) return null;
  var c = (Ed(a) ? Id : Jd).bind(null, a);
  b.addEventListener(a, c, !0);
}

function Id(a, b) {
  Kb(Jd, a, b);
}

function Jd(a, b) {
  if (Hd) {
    var c = Rb(b);
    c = Ja(c);
    null === c || "number" !== typeof c.tag || 2 === kd(c) || (c = null);

    if (Fd.length) {
      var d = Fd.pop();
      d.topLevelType = a;
      d.nativeEvent = b;
      d.targetInst = c;
      a = d;
    } else a = {
      topLevelType: a,
      nativeEvent: b,
      targetInst: c,
      ancestors: []
    };

    try {
      Nb(Gd, a);
    } finally {
      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > Fd.length && Fd.push(a);
    }
  }
}

var Ld = {},
    Md = 0,
    Nd = "_reactListenersID" + ("" + Math.random()).slice(2);

function Od(a) {
  Object.prototype.hasOwnProperty.call(a, Nd) || (a[Nd] = Md++, Ld[a[Nd]] = {});
  return Ld[a[Nd]];
}

function Pd(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;

  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}

function Qd(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }

  return a;
}

function Rd(a, b) {
  var c = Qd(a);
  a = 0;

  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }

    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }

        c = c.parentNode;
      }

      c = void 0;
    }

    c = Qd(c);
  }
}

function Sd(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Sd(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}

function Td() {
  for (var a = window, b = Pd(); b instanceof a.HTMLIFrameElement;) {
    try {
      a = b.contentDocument.defaultView;
    } catch (c) {
      break;
    }

    b = Pd(a.document);
  }

  return b;
}

function Ud(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}

var Vd = Ta && "documentMode" in document && 11 >= document.documentMode,
    Wd = {
  select: {
    phasedRegistrationNames: {
      bubbled: "onSelect",
      captured: "onSelectCapture"
    },
    dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
  }
},
    Xd = null,
    Yd = null,
    Zd = null,
    $d = !1;

function ae(a, b) {
  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;
  if ($d || null == Xd || Xd !== Pd(c)) return null;
  c = Xd;
  "selectionStart" in c && Ud(c) ? c = {
    start: c.selectionStart,
    end: c.selectionEnd
  } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
    anchorNode: c.anchorNode,
    anchorOffset: c.anchorOffset,
    focusNode: c.focusNode,
    focusOffset: c.focusOffset
  });
  return Zd && jd(Zd, c) ? null : (Zd = c, a = A.getPooled(Wd.select, Yd, a, b), a.type = "select", a.target = Xd, Sa(a), a);
}

var be = {
  eventTypes: Wd,
  extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;

    if (!(f = !e)) {
      a: {
        e = Od(e);
        f = ua.onSelect;

        for (var g = 0; g < f.length; g++) {
          var h = f[g];

          if (!e.hasOwnProperty(h) || !e[h]) {
            e = !1;
            break a;
          }
        }

        e = !0;
      }

      f = !e;
    }

    if (f) return null;
    e = b ? La(b) : window;

    switch (a) {
      case "focus":
        if (Pb(e) || "true" === e.contentEditable) Xd = e, Yd = b, Zd = null;
        break;

      case "blur":
        Zd = Yd = Xd = null;
        break;

      case "mousedown":
        $d = !0;
        break;

      case "contextmenu":
      case "mouseup":
      case "dragend":
        return $d = !1, ae(c, d);

      case "selectionchange":
        if (Vd) break;

      case "keydown":
      case "keyup":
        return ae(c, d);
    }

    return null;
  }
};
Da.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
va = Ma;
wa = Ka;
xa = La;
Da.injectEventPluginsByName({
  SimpleEventPlugin: Dd,
  EnterLeaveEventPlugin: ed,
  ChangeEventPlugin: Tc,
  SelectEventPlugin: be,
  BeforeInputEventPlugin: Cb
});

function ce(a) {
  var b = "";
  aa.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

function de(a, b) {
  a = p({
    children: void 0
  }, b);
  if (b = ce(b.children)) a.children = b;
  return a;
}

function ee(a, b, c, d) {
  a = a.options;

  if (b) {
    b = {};

    for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }

    for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + yc(c);
    b = null;

    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }

      null !== b || a[e].disabled || (b = a[e]);
    }

    null !== b && (b.selected = !0);
  }
}

function fe(a, b) {
  null != b.dangerouslySetInnerHTML ? t("91") : void 0;
  return p({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}

function ge(a, b) {
  var c = b.value;
  null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? t("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : t("93"), b = b[0]), c = b), null == c && (c = ""));
  a._wrapperState = {
    initialValue: yc(c)
  };
}

function he(a, b) {
  var c = yc(b.value),
      d = yc(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}

function ie(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && (a.value = b);
}

var je = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function ke(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

function le(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? ke(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}

var me = void 0,
    ne = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== je.svg || "innerHTML" in a) a.innerHTML = b;else {
    me = me || document.createElement("div");
    me.innerHTML = "<svg>" + b + "</svg>";

    for (b = me.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }

    for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});

function oe(a, b) {
  if (b) {
    var c = a.firstChild;

    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }

  a.textContent = b;
}

var pe = {
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
  strokeWidth: !0
},
    qe = ["Webkit", "ms", "Moz", "O"];
Object.keys(pe).forEach(function (a) {
  qe.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pe[b] = pe[a];
  });
});

function re(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pe.hasOwnProperty(a) && pe[a] ? ("" + b).trim() : b + "px";
}

function se(a, b) {
  a = a.style;

  for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"),
          e = re(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}

var te = p({
  menuitem: !0
}, {
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
  wbr: !0
});

function ue(a, b) {
  b && (te[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? t("137", a, "") : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? t("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : t("61")), null != b.style && "object" !== _typeof(b.style) ? t("62", "") : void 0);
}

function ve(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;

    default:
      return !0;
  }
}

function we(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
  var c = Od(a);
  b = ua[b];

  for (var d = 0; d < b.length; d++) {
    var e = b[d];

    if (!c.hasOwnProperty(e) || !c[e]) {
      switch (e) {
        case "scroll":
          Kd("scroll", a);
          break;

        case "focus":
        case "blur":
          Kd("focus", a);
          Kd("blur", a);
          c.blur = !0;
          c.focus = !0;
          break;

        case "cancel":
        case "close":
          Sb(e) && Kd(e, a);
          break;

        case "invalid":
        case "submit":
        case "reset":
          break;

        default:
          -1 === cb.indexOf(e) && H(e, a);
      }

      c[e] = !0;
    }
  }
}

function xe() {}

var ye = null,
    ze = null;

function Ae(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }

  return !1;
}

function Be(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}

var Ce = "function" === typeof setTimeout ? setTimeout : void 0,
    De = "function" === typeof clearTimeout ? clearTimeout : void 0;

function Ee(a, b, c, d, e) {
  a[Ia] = e;
  "input" === c && "radio" === e.type && null != e.name && Bc(a, e);
  ve(c, d);
  d = ve(c, e);

  for (var f = 0; f < b.length; f += 2) {
    var g = b[f],
        h = b[f + 1];
    "style" === g ? se(a, h) : "dangerouslySetInnerHTML" === g ? ne(a, h) : "children" === g ? oe(a, h) : xc(a, g, h, d);
  }

  switch (c) {
    case "input":
      Cc(a, e);
      break;

    case "textarea":
      he(a, e);
      break;

    case "select":
      b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? ee(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? ee(a, !!e.multiple, e.defaultValue, !0) : ee(a, !!e.multiple, e.multiple ? [] : "", !1));
  }
}

function Fe(a) {
  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }

  return a;
}

function Ge(a) {
  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
    a = a.nextSibling;
  }

  return a;
}

new Set();
var He = [],
    Ie = -1;

function I(a) {
  0 > Ie || (a.current = He[Ie], He[Ie] = null, Ie--);
}

function J(a, b) {
  Ie++;
  He[Ie] = a.current;
  a.current = b;
}

var Je = {},
    K = {
  current: Je
},
    L = {
  current: !1
},
    Ke = Je;

function Le(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Je;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
      f;

  for (f in c) {
    e[f] = b[f];
  }

  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}

function M(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}

function Me(a) {
  I(L, a);
  I(K, a);
}

function Oe(a) {
  I(L, a);
  I(K, a);
}

function Pe(a, b, c) {
  K.current !== Je ? t("168") : void 0;
  J(K, b, a);
  J(L, c, a);
}

function Qe(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();

  for (var e in d) {
    e in a ? void 0 : t("108", mc(b) || "Unknown", e);
  }

  return p({}, c, d);
}

function Re(a) {
  var b = a.stateNode;
  b = b && b.__reactInternalMemoizedMergedChildContext || Je;
  Ke = K.current;
  J(K, b, a);
  J(L, L.current, a);
  return !0;
}

function Se(a, b, c) {
  var d = a.stateNode;
  d ? void 0 : t("169");
  c ? (b = Qe(a, b, Ke), d.__reactInternalMemoizedMergedChildContext = b, I(L, a), I(K, a), J(K, b, a)) : I(L, a);
  J(L, c, a);
}

var Te = null,
    Ue = null;

function Ve(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}

function We(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (b.isDisabled || !b.supportsFiber) return !0;

  try {
    var c = b.inject(a);
    Te = Ve(function (a) {
      return b.onCommitFiberRoot(c, a);
    });
    Ue = Ve(function (a) {
      return b.onCommitFiberUnmount(c, a);
    });
  } catch (d) {}

  return !0;
}

function Xe(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.contextDependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}

function N(a, b, c, d) {
  return new Xe(a, b, c, d);
}

function Ye(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}

function Ze(a) {
  if ("function" === typeof a) return Ye(a) ? 1 : 0;

  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === gc) return 11;
    if (a === ic) return 14;
  }

  return 2;
}

function $e(a, b) {
  var c = a.alternate;
  null === c ? (c = N(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childExpirationTime = a.childExpirationTime;
  c.expirationTime = a.expirationTime;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  c.contextDependencies = a.contextDependencies;
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}

function af(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) Ye(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case ac:
      return bf(c.children, e, f, b);

    case fc:
      return cf(c, e | 3, f, b);

    case bc:
      return cf(c, e | 2, f, b);

    case cc:
      return a = N(12, c, b, e | 4), a.elementType = cc, a.type = cc, a.expirationTime = f, a;

    case hc:
      return a = N(13, c, b, e), a.elementType = hc, a.type = hc, a.expirationTime = f, a;

    default:
      if ("object" === _typeof(a) && null !== a) switch (a.$$typeof) {
        case dc:
          g = 10;
          break a;

        case ec:
          g = 9;
          break a;

        case gc:
          g = 11;
          break a;

        case ic:
          g = 14;
          break a;

        case jc:
          g = 16;
          d = null;
          break a;
      }
      t("130", null == a ? a : _typeof(a), "");
  }
  b = N(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.expirationTime = f;
  return b;
}

function bf(a, b, c, d) {
  a = N(7, a, d, b);
  a.expirationTime = c;
  return a;
}

function cf(a, b, c, d) {
  a = N(8, a, d, b);
  b = 0 === (b & 1) ? bc : fc;
  a.elementType = b;
  a.type = b;
  a.expirationTime = c;
  return a;
}

function df(a, b, c) {
  a = N(6, a, null, b);
  a.expirationTime = c;
  return a;
}

function ef(a, b, c) {
  b = N(4, null !== a.children ? a.children : [], a.key, b);
  b.expirationTime = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}

function ff(a, b) {
  a.didError = !1;
  var c = a.earliestPendingTime;
  0 === c ? a.earliestPendingTime = a.latestPendingTime = b : c < b ? a.earliestPendingTime = b : a.latestPendingTime > b && (a.latestPendingTime = b);
  gf(b, a);
}

function hf(a, b) {
  a.didError = !1;
  a.latestPingedTime >= b && (a.latestPingedTime = 0);
  var c = a.earliestPendingTime,
      d = a.latestPendingTime;
  c === b ? a.earliestPendingTime = d === b ? a.latestPendingTime = 0 : d : d === b && (a.latestPendingTime = c);
  c = a.earliestSuspendedTime;
  d = a.latestSuspendedTime;
  0 === c ? a.earliestSuspendedTime = a.latestSuspendedTime = b : c < b ? a.earliestSuspendedTime = b : d > b && (a.latestSuspendedTime = b);
  gf(b, a);
}

function jf(a, b) {
  var c = a.earliestPendingTime;
  a = a.earliestSuspendedTime;
  c > b && (b = c);
  a > b && (b = a);
  return b;
}

function gf(a, b) {
  var c = b.earliestSuspendedTime,
      d = b.latestSuspendedTime,
      e = b.earliestPendingTime,
      f = b.latestPingedTime;
  e = 0 !== e ? e : f;
  0 === e && (0 === a || d < a) && (e = d);
  a = e;
  0 !== a && c > a && (a = c);
  b.nextExpirationTimeToWorkOn = e;
  b.expirationTime = a;
}

function P(a, b) {
  if (a && a.defaultProps) {
    b = p({}, b);
    a = a.defaultProps;

    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }

  return b;
}

function kf(a) {
  var b = a._result;

  switch (a._status) {
    case 1:
      return b;

    case 2:
      throw b;

    case 0:
      throw b;

    default:
      a._status = 0;
      b = a._ctor;
      b = b();
      b.then(function (b) {
        0 === a._status && (b = b.default, a._status = 1, a._result = b);
      }, function (b) {
        0 === a._status && (a._status = 2, a._result = b);
      });

      switch (a._status) {
        case 1:
          return a._result;

        case 2:
          throw a._result;
      }

      a._result = b;
      throw b;
  }
}

var lf = new aa.Component().refs;

function mf(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : p({}, b, c);
  a.memoizedState = c;
  d = a.updateQueue;
  null !== d && 0 === a.expirationTime && (d.baseState = c);
}

var vf = {
  isMounted: function isMounted(a) {
    return (a = a._reactInternalFiber) ? 2 === kd(a) : !1;
  },
  enqueueSetState: function enqueueSetState(a, b, c) {
    a = a._reactInternalFiber;
    var d = nf();
    d = of(d, a);
    var e = pf(d);
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    qf();
    rf(a, e);
    sf(a, d);
  },
  enqueueReplaceState: function enqueueReplaceState(a, b, c) {
    a = a._reactInternalFiber;
    var d = nf();
    d = of(d, a);
    var e = pf(d);
    e.tag = tf;
    e.payload = b;
    void 0 !== c && null !== c && (e.callback = c);
    qf();
    rf(a, e);
    sf(a, d);
  },
  enqueueForceUpdate: function enqueueForceUpdate(a, b) {
    a = a._reactInternalFiber;
    var c = nf();
    c = of(c, a);
    var d = pf(c);
    d.tag = uf;
    void 0 !== b && null !== b && (d.callback = b);
    qf();
    rf(a, d);
    sf(a, c);
  }
};

function wf(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !jd(c, d) || !jd(e, f) : !0;
}

function xf(a, b, c) {
  var d = !1,
      e = Je;
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? f = yf(f) : (e = M(b) ? Ke : K.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Le(a, e) : Je);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = vf;
  a.stateNode = b;
  b._reactInternalFiber = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}

function zf(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && vf.enqueueReplaceState(b, b.state, null);
}

function Af(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = lf;
  var f = b.contextType;
  "object" === _typeof(f) && null !== f ? e.context = yf(f) : (f = M(b) ? Ke : K.current, e.context = Le(a, f));
  f = a.updateQueue;
  null !== f && (Bf(a, f, c, e, d), e.state = a.memoizedState);
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (mf(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && vf.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (Bf(a, f, c, e, d), e.state = a.memoizedState));
  "function" === typeof e.componentDidMount && (a.effectTag |= 4);
}

var Cf = Array.isArray;

function Df(a, b, c) {
  a = c.ref;

  if (null !== a && "function" !== typeof a && "object" !== _typeof(a)) {
    if (c._owner) {
      c = c._owner;
      var d = void 0;
      c && (1 !== c.tag ? t("308") : void 0, d = c.stateNode);
      d ? void 0 : t("147", a);
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

      b = function b(a) {
        var b = d.refs;
        b === lf && (b = d.refs = {});
        null === a ? delete b[e] : b[e] = a;
      };

      b._stringRef = e;
      return b;
    }

    "string" !== typeof a ? t("284") : void 0;
    c._owner ? void 0 : t("290", a);
  }

  return a;
}

function Ef(a, b) {
  "textarea" !== a.type && t("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}

function Ff(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;
      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
      c.nextEffect = null;
      c.effectTag = 8;
    }
  }

  function c(c, d) {
    if (!a) return null;

    for (; null !== d;) {
      b(c, d), d = d.sibling;
    }

    return null;
  }

  function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }

    return a;
  }

  function e(a, b, c) {
    a = $e(a, b, c);
    a.index = 0;
    a.sibling = null;
    return a;
  }

  function f(b, c, d) {
    b.index = d;
    if (!a) return c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
    b.effectTag = 2;
    return c;
  }

  function g(b) {
    a && null === b.alternate && (b.effectTag = 2);
    return b;
  }

  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = df(c, a.mode, d), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function l(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props, d), d.ref = Df(a, b, c), d.return = a, d;
    d = af(c.type, c.key, c.props, null, a.mode, d);
    d.ref = Df(a, b, c);
    d.return = a;
    return d;
  }

  function k(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = ef(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || [], d);
    b.return = a;
    return b;
  }

  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = bf(c, a.mode, d, f), b.return = a, b;
    b = e(b, c, d);
    b.return = a;
    return b;
  }

  function q(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = df("" + b, a.mode, c), b.return = a, b;

    if ("object" === _typeof(b) && null !== b) {
      switch (b.$$typeof) {
        case Zb:
          return c = af(b.type, b.key, b.props, null, a.mode, c), c.ref = Df(a, null, b), c.return = a, c;

        case $b:
          return b = ef(b, a.mode, c), b.return = a, b;
      }

      if (Cf(b) || lc(b)) return b = bf(b, a.mode, c, null), b.return = a, b;
      Ef(a, b);
    }

    return null;
  }

  function x(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

    if ("object" === _typeof(c) && null !== c) {
      switch (c.$$typeof) {
        case Zb:
          return c.key === e ? c.type === ac ? m(a, b, c.props.children, d, e) : l(a, b, c, d) : null;

        case $b:
          return c.key === e ? k(a, b, c, d) : null;
      }

      if (Cf(c) || lc(c)) return null !== e ? null : m(a, b, c, d, null);
      Ef(a, c);
    }

    return null;
  }

  function C(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

    if ("object" === _typeof(d) && null !== d) {
      switch (d.$$typeof) {
        case Zb:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === ac ? m(b, a, d.props.children, e, d.key) : l(b, a, d, e);

        case $b:
          return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
      }

      if (Cf(d) || lc(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      Ef(b, d);
    }

    return null;
  }

  function w(e, g, h, k) {
    for (var l = null, m = null, n = g, u = g = 0, r = null; null !== n && u < h.length; u++) {
      n.index > u ? (r = n, n = null) : r = n.sibling;
      var v = x(e, n, h[u], k);

      if (null === v) {
        null === n && (n = r);
        break;
      }

      a && n && null === v.alternate && b(e, n);
      g = f(v, g, u);
      null === m ? l = v : m.sibling = v;
      m = v;
      n = r;
    }

    if (u === h.length) return c(e, n), l;

    if (null === n) {
      for (; u < h.length; u++) {
        if (n = q(e, h[u], k)) g = f(n, g, u), null === m ? l = n : m.sibling = n, m = n;
      }

      return l;
    }

    for (n = d(e, n); u < h.length; u++) {
      if (r = C(n, e, u, h[u], k)) a && null !== r.alternate && n.delete(null === r.key ? u : r.key), g = f(r, g, u), null === m ? l = r : m.sibling = r, m = r;
    }

    a && n.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  function E(e, g, h, k) {
    var l = lc(h);
    "function" !== typeof l ? t("150") : void 0;
    h = l.call(h);
    null == h ? t("151") : void 0;

    for (var m = l = null, n = g, u = g = 0, r = null, v = h.next(); null !== n && !v.done; u++, v = h.next()) {
      n.index > u ? (r = n, n = null) : r = n.sibling;
      var z = x(e, n, v.value, k);

      if (null === z) {
        n || (n = r);
        break;
      }

      a && n && null === z.alternate && b(e, n);
      g = f(z, g, u);
      null === m ? l = z : m.sibling = z;
      m = z;
      n = r;
    }

    if (v.done) return c(e, n), l;

    if (null === n) {
      for (; !v.done; u++, v = h.next()) {
        v = q(e, v.value, k), null !== v && (g = f(v, g, u), null === m ? l = v : m.sibling = v, m = v);
      }

      return l;
    }

    for (n = d(e, n); !v.done; u++, v = h.next()) {
      v = C(n, e, u, v.value, k), null !== v && (a && null !== v.alternate && n.delete(null === v.key ? u : v.key), g = f(v, g, u), null === m ? l = v : m.sibling = v, m = v);
    }

    a && n.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  return function (a, d, f, h) {
    var k = "object" === _typeof(f) && null !== f && f.type === ac && null === f.key;
    k && (f = f.props.children);
    var l = "object" === _typeof(f) && null !== f;
    if (l) switch (f.$$typeof) {
      case Zb:
        a: {
          l = f.key;

          for (k = d; null !== k;) {
            if (k.key === l) {
              if (7 === k.tag ? f.type === ac : k.elementType === f.type) {
                c(a, k.sibling);
                d = e(k, f.type === ac ? f.props.children : f.props, h);
                d.ref = Df(a, k, f);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, k);
                break;
              }
            } else b(a, k);
            k = k.sibling;
          }

          f.type === ac ? (d = bf(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = af(f.type, f.key, f.props, null, a.mode, h), h.ref = Df(a, d, f), h.return = a, a = h);
        }

        return g(a);

      case $b:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);
                d = e(d, f.children || [], h);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, d);
                break;
              }
            } else b(a, d);
            d = d.sibling;
          }

          d = ef(f, a.mode, h);
          d.return = a;
          a = d;
        }

        return g(a);
    }
    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = df(f, a.mode, h), d.return = a, a = d), g(a);
    if (Cf(f)) return w(a, d, f, h);
    if (lc(f)) return E(a, d, f, h);
    l && Ef(a, f);
    if ("undefined" === typeof f && !k) switch (a.tag) {
      case 1:
      case 0:
        h = a.type, t("152", h.displayName || h.name || "Component");
    }
    return c(a, d);
  };
}

var Gf = Ff(!0),
    Hf = Ff(!1),
    If = {},
    Jf = {
  current: If
},
    Kf = {
  current: If
},
    Lf = {
  current: If
};

function Mf(a) {
  a === If ? t("174") : void 0;
  return a;
}

function Nf(a, b) {
  J(Lf, b, a);
  J(Kf, a, a);
  J(Jf, If, a);
  var c = b.nodeType;

  switch (c) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : le(null, "");
      break;

    default:
      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = le(b, c);
  }

  I(Jf, a);
  J(Jf, b, a);
}

function Of(a) {
  I(Jf, a);
  I(Kf, a);
  I(Lf, a);
}

function Pf(a) {
  Mf(Lf.current);
  var b = Mf(Jf.current);
  var c = le(b, a.type);
  b !== c && (J(Kf, a, a), J(Jf, c, a));
}

function Qf(a) {
  Kf.current === a && (I(Jf, a), I(Kf, a));
}

var Rf = 0,
    Sf = 2,
    Tf = 4,
    Uf = 8,
    Vf = 16,
    Wf = 32,
    Xf = 64,
    Yf = 128,
    Zf = Xb.ReactCurrentDispatcher,
    $f = 0,
    ag = null,
    Q = null,
    bg = null,
    cg = null,
    R = null,
    dg = null,
    eg = 0,
    fg = null,
    gg = 0,
    hg = !1,
    ig = null,
    jg = 0;

function kg() {
  t("298");
}

function lg(a, b) {
  if (null === b) return !1;

  for (var c = 0; c < b.length && c < a.length; c++) {
    if (!fd(a[c], b[c])) return !1;
  }

  return !0;
}

function mg(a, b, c, d, e, f) {
  $f = f;
  ag = b;
  bg = null !== a ? a.memoizedState : null;
  Zf.current = null === bg ? ng : og;
  b = c(d, e);

  if (hg) {
    do {
      hg = !1, jg += 1, bg = null !== a ? a.memoizedState : null, dg = cg, fg = R = Q = null, Zf.current = og, b = c(d, e);
    } while (hg);

    ig = null;
    jg = 0;
  }

  Zf.current = pg;
  a = ag;
  a.memoizedState = cg;
  a.expirationTime = eg;
  a.updateQueue = fg;
  a.effectTag |= gg;
  a = null !== Q && null !== Q.next;
  $f = 0;
  dg = R = cg = bg = Q = ag = null;
  eg = 0;
  fg = null;
  gg = 0;
  a ? t("300") : void 0;
  return b;
}

function qg() {
  Zf.current = pg;
  $f = 0;
  dg = R = cg = bg = Q = ag = null;
  eg = 0;
  fg = null;
  gg = 0;
  hg = !1;
  ig = null;
  jg = 0;
}

function rg() {
  var a = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === R ? cg = R = a : R = R.next = a;
  return R;
}

function sg() {
  if (null !== dg) R = dg, dg = R.next, Q = bg, bg = null !== Q ? Q.next : null;else {
    null === bg ? t("309") : void 0;
    Q = bg;
    var a = {
      memoizedState: Q.memoizedState,
      baseState: Q.baseState,
      queue: Q.queue,
      baseUpdate: Q.baseUpdate,
      next: null
    };
    R = null === R ? cg = a : R.next = a;
    bg = Q.next;
  }
  return R;
}

function tg(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function ug(a) {
  var b = sg(),
      c = b.queue;
  null === c ? t("310") : void 0;

  if (0 < jg) {
    var d = c.dispatch;

    if (null !== ig) {
      var e = ig.get(c);

      if (void 0 !== e) {
        ig.delete(c);
        var f = b.memoizedState;

        do {
          f = a(f, e.action), e = e.next;
        } while (null !== e);

        f !== b.memoizedState && (vg = !0);
        b.memoizedState = f;
        b.baseUpdate === c.last && (b.baseState = f);
        return [f, d];
      }
    }

    return [b.memoizedState, d];
  }

  d = c.last;
  var g = b.baseUpdate;
  f = b.baseState;
  null !== g ? (null !== d && (d.next = null), d = g.next) : d = null !== d ? d.next : null;

  if (null !== d) {
    var h = e = null,
        l = d,
        k = !1;

    do {
      var m = l.expirationTime;
      m < $f ? (k || (k = !0, h = g, e = f), m > eg && (eg = m)) : f = l.eagerReducer === a ? l.eagerState : a(f, l.action);
      g = l;
      l = l.next;
    } while (null !== l && l !== d);

    k || (h = g, e = f);
    f !== b.memoizedState && (vg = !0);
    b.memoizedState = f;
    b.baseUpdate = h;
    b.baseState = e;
    c.eagerReducer = a;
    c.eagerState = f;
  }

  return [b.memoizedState, c.dispatch];
}

function wg(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  null === fg ? (fg = {
    lastEffect: null
  }, fg.lastEffect = a.next = a) : (b = fg.lastEffect, null === b ? fg.lastEffect = a.next = a : (c = b.next, b.next = a, a.next = c, fg.lastEffect = a));
  return a;
}

function xg(a, b, c, d) {
  var e = rg();
  gg |= a;
  e.memoizedState = wg(b, c, void 0, void 0 === d ? null : d);
}

function yg(a, b, c, d) {
  var e = sg();
  d = void 0 === d ? null : d;
  var f = void 0;

  if (null !== Q) {
    var g = Q.memoizedState;
    f = g.destroy;

    if (null !== d && lg(d, g.deps)) {
      wg(Rf, c, f, d);
      return;
    }
  }

  gg |= a;
  e.memoizedState = wg(b, c, f, d);
}

function zg(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}

function Bg() {}

function Cg(a, b, c) {
  25 > jg ? void 0 : t("301");
  var d = a.alternate;
  if (a === ag || null !== d && d === ag) {
    if (hg = !0, a = {
      expirationTime: $f,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    }, null === ig && (ig = new Map()), c = ig.get(b), void 0 === c) ig.set(b, a);else {
      for (b = c; null !== b.next;) {
        b = b.next;
      }

      b.next = a;
    }
  } else {
    qf();
    var e = nf();
    e = of(e, a);
    var f = {
      expirationTime: e,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    },
        g = b.last;
    if (null === g) f.next = f;else {
      var h = g.next;
      null !== h && (f.next = h);
      g.next = f;
    }
    b.last = f;
    if (0 === a.expirationTime && (null === d || 0 === d.expirationTime) && (d = b.eagerReducer, null !== d)) try {
      var l = b.eagerState,
          k = d(l, c);
      f.eagerReducer = d;
      f.eagerState = k;
      if (k === l) return;
    } catch (m) {} finally {}
    sf(a, e);
  }
}

var pg = {
  readContext: yf,
  useCallback: kg,
  useContext: kg,
  useEffect: kg,
  useImperativeHandle: kg,
  useLayoutEffect: kg,
  useMemo: kg,
  useReducer: kg,
  useRef: kg,
  useState: kg,
  useDebugValue: kg
},
    ng = {
  readContext: yf,
  useCallback: function useCallback(a, b) {
    rg().memoizedState = [a, void 0 === b ? null : b];
    return a;
  },
  useContext: yf,
  useEffect: function useEffect(a, b) {
    return xg(516, Yf | Xf, a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : [a];
    return xg(4, Tf | Wf, zg.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return xg(4, Tf | Wf, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = rg();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: function useReducer(a, b, c) {
    var d = rg();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = {
      last: null,
      dispatch: null,
      eagerReducer: a,
      eagerState: b
    };
    a = a.dispatch = Cg.bind(null, ag, a);
    return [d.memoizedState, a];
  },
  useRef: function useRef(a) {
    var b = rg();
    a = {
      current: a
    };
    return b.memoizedState = a;
  },
  useState: function useState(a) {
    var b = rg();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = {
      last: null,
      dispatch: null,
      eagerReducer: tg,
      eagerState: a
    };
    a = a.dispatch = Cg.bind(null, ag, a);
    return [b.memoizedState, a];
  },
  useDebugValue: Bg
},
    og = {
  readContext: yf,
  useCallback: function useCallback(a, b) {
    var c = sg();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && lg(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  },
  useContext: yf,
  useEffect: function useEffect(a, b) {
    return yg(516, Yf | Xf, a, b);
  },
  useImperativeHandle: function useImperativeHandle(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : [a];
    return yg(4, Tf | Wf, zg.bind(null, b, a), c);
  },
  useLayoutEffect: function useLayoutEffect(a, b) {
    return yg(4, Tf | Wf, a, b);
  },
  useMemo: function useMemo(a, b) {
    var c = sg();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && lg(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: ug,
  useRef: function useRef() {
    return sg().memoizedState;
  },
  useState: function useState(a) {
    return ug(tg, a);
  },
  useDebugValue: Bg
},
    Dg = null,
    Eg = null,
    Fg = !1;

function Gg(a, b) {
  var c = N(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.effectTag = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}

function Hg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, !0) : !1;

    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

    default:
      return !1;
  }
}

function Ig(a) {
  if (Fg) {
    var b = Eg;

    if (b) {
      var c = b;

      if (!Hg(a, b)) {
        b = Fe(c);

        if (!b || !Hg(a, b)) {
          a.effectTag |= 2;
          Fg = !1;
          Dg = a;
          return;
        }

        Gg(Dg, c);
      }

      Dg = a;
      Eg = Ge(b);
    } else a.effectTag |= 2, Fg = !1, Dg = a;
  }
}

function Jg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag;) {
    a = a.return;
  }

  Dg = a;
}

function Kg(a) {
  if (a !== Dg) return !1;
  if (!Fg) return Jg(a), Fg = !0, !1;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !Be(b, a.memoizedProps)) for (b = Eg; b;) {
    Gg(a, b), b = Fe(b);
  }
  Jg(a);
  Eg = Dg ? Fe(a.stateNode) : null;
  return !0;
}

function Lg() {
  Eg = Dg = null;
  Fg = !1;
}

var Mg = Xb.ReactCurrentOwner,
    vg = !1;

function S(a, b, c, d) {
  b.child = null === a ? Hf(b, null, c, d) : Gf(b, a.child, c, d);
}

function Ng(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  Og(b, e);
  d = mg(a, b, c, d, f, e);
  if (null !== a && !vg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Pg(a, b, e);
  b.effectTag |= 1;
  S(a, b, d, e);
  return b.child;
}

function Qg(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;
    if ("function" === typeof g && !Ye(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, Rg(a, b, g, d, e, f);
    a = af(c.type, null, d, null, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  g = a.child;
  if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : jd, c(e, d) && a.ref === b.ref)) return Pg(a, b, f);
  b.effectTag |= 1;
  a = $e(g, d, f);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}

function Rg(a, b, c, d, e, f) {
  return null !== a && jd(a.memoizedProps, d) && a.ref === b.ref && (vg = !1, e < f) ? Pg(a, b, f) : Sg(a, b, c, d, f);
}

function Tg(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
}

function Sg(a, b, c, d, e) {
  var f = M(c) ? Ke : K.current;
  f = Le(b, f);
  Og(b, e);
  c = mg(a, b, c, d, f, e);
  if (null !== a && !vg) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), Pg(a, b, e);
  b.effectTag |= 1;
  S(a, b, c, e);
  return b.child;
}

function Ug(a, b, c, d, e) {
  if (M(c)) {
    var f = !0;
    Re(b);
  } else f = !1;

  Og(b, e);
  if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), xf(b, c, d, e), Af(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;
    g.props = h;
    var l = g.context,
        k = c.contextType;
    "object" === _typeof(k) && null !== k ? k = yf(k) : (k = M(c) ? Ke : K.current, k = Le(b, k));
    var m = c.getDerivedStateFromProps,
        q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && zf(b, g, d, k);
    Vg = !1;
    var x = b.memoizedState;
    l = g.state = x;
    var C = b.updateQueue;
    null !== C && (Bf(b, C, d, g, e), l = b.memoizedState);
    h !== d || x !== l || L.current || Vg ? ("function" === typeof m && (mf(b, c, m, d), l = b.memoizedState), (h = Vg || wf(b, c, h, d, x, l, k)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = l), g.props = d, g.state = l, g.context = k, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
  } else g = b.stateNode, h = b.memoizedProps, g.props = b.type === b.elementType ? h : P(b.type, h), l = g.context, k = c.contextType, "object" === _typeof(k) && null !== k ? k = yf(k) : (k = M(c) ? Ke : K.current, k = Le(b, k)), m = c.getDerivedStateFromProps, (q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || l !== k) && zf(b, g, d, k), Vg = !1, l = b.memoizedState, x = g.state = l, C = b.updateQueue, null !== C && (Bf(b, C, d, g, e), x = b.memoizedState), h !== d || l !== x || L.current || Vg ? ("function" === typeof m && (mf(b, c, m, d), x = b.memoizedState), (m = Vg || wf(b, c, h, d, l, x, k)) ? (q || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = m) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && l === a.memoizedState || (b.effectTag |= 256), d = !1);
  return Wg(a, b, c, d, f, e);
}

function Wg(a, b, c, d, e, f) {
  Tg(a, b);
  var g = 0 !== (b.effectTag & 64);
  if (!d && !g) return e && Se(b, c, !1), Pg(a, b, f);
  d = b.stateNode;
  Mg.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.effectTag |= 1;
  null !== a && g ? (b.child = Gf(b, a.child, null, f), b.child = Gf(b, null, h, f)) : S(a, b, h, f);
  b.memoizedState = d.state;
  e && Se(b, c, !0);
  return b.child;
}

function Xg(a) {
  var b = a.stateNode;
  b.pendingContext ? Pe(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Pe(a, b.context, !1);
  Nf(a, b.containerInfo);
}

function Yg(a, b, c) {
  var d = b.mode,
      e = b.pendingProps,
      f = b.memoizedState;

  if (0 === (b.effectTag & 64)) {
    f = null;
    var g = !1;
  } else f = {
    timedOutAt: null !== f ? f.timedOutAt : 0
  }, g = !0, b.effectTag &= -65;

  if (null === a) {
    if (g) {
      var h = e.fallback;
      a = bf(null, d, 0, null);
      0 === (b.mode & 1) && (a.child = null !== b.memoizedState ? b.child.child : b.child);
      d = bf(h, d, c, null);
      a.sibling = d;
      c = a;
      c.return = d.return = b;
    } else c = d = Hf(b, null, e.children, c);
  } else null !== a.memoizedState ? (d = a.child, h = d.sibling, g ? (c = e.fallback, e = $e(d, d.pendingProps, 0), 0 === (b.mode & 1) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== d.child && (e.child = g)), d = e.sibling = $e(h, c, h.expirationTime), c = e, e.childExpirationTime = 0, c.return = d.return = b) : c = d = Gf(b, d.child, e.children, c)) : (h = a.child, g ? (g = e.fallback, e = bf(null, d, 0, null), e.child = h, 0 === (b.mode & 1) && (e.child = null !== b.memoizedState ? b.child.child : b.child), d = e.sibling = bf(g, d, c, null), d.effectTag |= 2, c = e, e.childExpirationTime = 0, c.return = d.return = b) : d = c = Gf(b, h, e.children, c)), b.stateNode = a.stateNode;
  b.memoizedState = f;
  b.child = c;
  return d;
}

function Pg(a, b, c) {
  null !== a && (b.contextDependencies = a.contextDependencies);
  if (b.childExpirationTime < c) return null;
  null !== a && b.child !== a.child ? t("153") : void 0;

  if (null !== b.child) {
    a = b.child;
    c = $e(a, a.pendingProps, a.expirationTime);
    b.child = c;

    for (c.return = b; null !== a.sibling;) {
      a = a.sibling, c = c.sibling = $e(a, a.pendingProps, a.expirationTime), c.return = b;
    }

    c.sibling = null;
  }

  return b.child;
}

function Zg(a, b, c) {
  var d = b.expirationTime;
  if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || L.current) vg = !0;else {
      if (d < c) {
        vg = !1;

        switch (b.tag) {
          case 3:
            Xg(b);
            Lg();
            break;

          case 5:
            Pf(b);
            break;

          case 1:
            M(b.type) && Re(b);
            break;

          case 4:
            Nf(b, b.stateNode.containerInfo);
            break;

          case 10:
            $g(b, b.memoizedProps.value);
            break;

          case 13:
            if (null !== b.memoizedState) {
              d = b.child.childExpirationTime;
              if (0 !== d && d >= c) return Yg(a, b, c);
              b = Pg(a, b, c);
              return null !== b ? b.sibling : null;
            }

        }

        return Pg(a, b, c);
      }
    }
  } else vg = !1;
  b.expirationTime = 0;

  switch (b.tag) {
    case 2:
      d = b.elementType;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      a = b.pendingProps;
      var e = Le(b, K.current);
      Og(b, c);
      e = mg(null, b, d, a, e, c);
      b.effectTag |= 1;

      if ("object" === _typeof(e) && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        qg();

        if (M(d)) {
          var f = !0;
          Re(b);
        } else f = !1;

        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        var g = d.getDerivedStateFromProps;
        "function" === typeof g && mf(b, d, g, a);
        e.updater = vf;
        b.stateNode = e;
        e._reactInternalFiber = b;
        Af(b, d, a, c);
        b = Wg(null, b, d, !0, f, c);
      } else b.tag = 0, S(null, b, e, c), b = b.child;

      return b;

    case 16:
      e = b.elementType;
      null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
      f = b.pendingProps;
      a = kf(e);
      b.type = a;
      e = b.tag = Ze(a);
      f = P(a, f);
      g = void 0;

      switch (e) {
        case 0:
          g = Sg(null, b, a, f, c);
          break;

        case 1:
          g = Ug(null, b, a, f, c);
          break;

        case 11:
          g = Ng(null, b, a, f, c);
          break;

        case 14:
          g = Qg(null, b, a, P(a.type, f), d, c);
          break;

        default:
          t("306", a, "");
      }

      return g;

    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : P(d, e), Sg(a, b, d, e, c);

    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : P(d, e), Ug(a, b, d, e, c);

    case 3:
      Xg(b);
      d = b.updateQueue;
      null === d ? t("282") : void 0;
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      Bf(b, d, b.pendingProps, null, c);
      d = b.memoizedState.element;
      if (d === e) Lg(), b = Pg(a, b, c);else {
        e = b.stateNode;
        if (e = (null === a || null === a.child) && e.hydrate) Eg = Ge(b.stateNode.containerInfo), Dg = b, e = Fg = !0;
        e ? (b.effectTag |= 2, b.child = Hf(b, null, d, c)) : (S(a, b, d, c), Lg());
        b = b.child;
      }
      return b;

    case 5:
      return Pf(b), null === a && Ig(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Be(d, e) ? g = null : null !== f && Be(d, f) && (b.effectTag |= 16), Tg(a, b), 1 !== c && b.mode & 1 && e.hidden ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (S(a, b, g, c), b = b.child), b;

    case 6:
      return null === a && Ig(b), null;

    case 13:
      return Yg(a, b, c);

    case 4:
      return Nf(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Gf(b, null, d, c) : S(a, b, d, c), b.child;

    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : P(d, e), Ng(a, b, d, e, c);

    case 7:
      return S(a, b, b.pendingProps, c), b.child;

    case 8:
      return S(a, b, b.pendingProps.children, c), b.child;

    case 12:
      return S(a, b, b.pendingProps.children, c), b.child;

    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        $g(b, f);

        if (null !== g) {
          var h = g.value;
          f = fd(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

          if (0 === f) {
            if (g.children === e.children && !L.current) {
              b = Pg(a, b, c);
              break a;
            }
          } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
            var l = h.contextDependencies;

            if (null !== l) {
              g = h.child;

              for (var k = l.first; null !== k;) {
                if (k.context === d && 0 !== (k.observedBits & f)) {
                  1 === h.tag && (k = pf(c), k.tag = uf, rf(h, k));
                  h.expirationTime < c && (h.expirationTime = c);
                  k = h.alternate;
                  null !== k && k.expirationTime < c && (k.expirationTime = c);

                  for (var m = h.return; null !== m;) {
                    k = m.alternate;
                    if (m.childExpirationTime < c) m.childExpirationTime = c, null !== k && k.childExpirationTime < c && (k.childExpirationTime = c);else if (null !== k && k.childExpirationTime < c) k.childExpirationTime = c;else break;
                    m = m.return;
                  }

                  l.expirationTime < c && (l.expirationTime = c);
                  break;
                }

                k = k.next;
              }
            } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

            if (null !== g) g.return = h;else for (g = h; null !== g;) {
              if (g === b) {
                g = null;
                break;
              }

              h = g.sibling;

              if (null !== h) {
                h.return = g.return;
                g = h;
                break;
              }

              g = g.return;
            }
            h = g;
          }
        }

        S(a, b, e.children, c);
        b = b.child;
      }

      return b;

    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, Og(b, c), e = yf(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, S(a, b, d, c), b.child;

    case 14:
      return e = b.type, f = P(e, b.pendingProps), f = P(e.type, f), Qg(a, b, e, f, d, c);

    case 15:
      return Rg(a, b, b.type, b.pendingProps, d, c);

    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : P(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, M(d) ? (a = !0, Re(b)) : a = !1, Og(b, c), xf(b, d, e, c), Af(b, d, e, c), Wg(null, b, d, !0, a, c);

    default:
      t("156");
  }
}

var ah = {
  current: null
},
    bh = null,
    ch = null,
    dh = null;

function $g(a, b) {
  var c = a.type._context;
  J(ah, c._currentValue, a);
  c._currentValue = b;
}

function eh(a) {
  var b = ah.current;
  I(ah, a);
  a.type._context._currentValue = b;
}

function Og(a, b) {
  bh = a;
  dh = ch = null;
  var c = a.contextDependencies;
  null !== c && c.expirationTime >= b && (vg = !0);
  a.contextDependencies = null;
}

function yf(a, b) {
  if (dh !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) dh = a, b = 1073741823;
    b = {
      context: a,
      observedBits: b,
      next: null
    };
    null === ch ? (null === bh ? t("307") : void 0, ch = b, bh.contextDependencies = {
      first: b,
      expirationTime: 0
    }) : ch = ch.next = b;
  }

  return a._currentValue;
}

var fh = 0,
    tf = 1,
    uf = 2,
    gh = 3,
    Vg = !1;

function hh(a) {
  return {
    baseState: a,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function ih(a) {
  return {
    baseState: a.baseState,
    firstUpdate: a.firstUpdate,
    lastUpdate: a.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}

function pf(a) {
  return {
    expirationTime: a,
    tag: fh,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}

function jh(a, b) {
  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
}

function rf(a, b) {
  var c = a.alternate;

  if (null === c) {
    var d = a.updateQueue;
    var e = null;
    null === d && (d = a.updateQueue = hh(a.memoizedState));
  } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = hh(a.memoizedState), e = c.updateQueue = hh(c.memoizedState)) : d = a.updateQueue = ih(e) : null === e && (e = c.updateQueue = ih(d));

  null === e || d === e ? jh(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (jh(d, b), jh(e, b)) : (jh(d, b), e.lastUpdate = b);
}

function kh(a, b) {
  var c = a.updateQueue;
  c = null === c ? a.updateQueue = hh(a.memoizedState) : lh(a, c);
  null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
}

function lh(a, b) {
  var c = a.alternate;
  null !== c && b === c.updateQueue && (b = a.updateQueue = ih(b));
  return b;
}

function mh(a, b, c, d, e, f) {
  switch (c.tag) {
    case tf:
      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

    case gh:
      a.effectTag = a.effectTag & -2049 | 64;

    case fh:
      a = c.payload;
      e = "function" === typeof a ? a.call(f, d, e) : a;
      if (null === e || void 0 === e) break;
      return p({}, d, e);

    case uf:
      Vg = !0;
  }

  return d;
}

function Bf(a, b, c, d, e) {
  Vg = !1;
  b = lh(a, b);

  for (var f = b.baseState, g = null, h = 0, l = b.firstUpdate, k = f; null !== l;) {
    var m = l.expirationTime;
    m < e ? (null === g && (g = l, f = k), h < m && (h = m)) : (k = mh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = l : (b.lastEffect.nextEffect = l, b.lastEffect = l)));
    l = l.next;
  }

  m = null;

  for (l = b.firstCapturedUpdate; null !== l;) {
    var q = l.expirationTime;
    q < e ? (null === m && (m = l, null === g && (f = k)), h < q && (h = q)) : (k = mh(a, b, l, k, c, d), null !== l.callback && (a.effectTag |= 32, l.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = l : (b.lastCapturedEffect.nextEffect = l, b.lastCapturedEffect = l)));
    l = l.next;
  }

  null === g && (b.lastUpdate = null);
  null === m ? b.lastCapturedUpdate = null : a.effectTag |= 32;
  null === g && null === m && (f = k);
  b.baseState = f;
  b.firstUpdate = g;
  b.firstCapturedUpdate = m;
  a.expirationTime = h;
  a.memoizedState = k;
}

function nh(a, b, c) {
  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
  oh(b.firstEffect, c);
  b.firstEffect = b.lastEffect = null;
  oh(b.firstCapturedEffect, c);
  b.firstCapturedEffect = b.lastCapturedEffect = null;
}

function oh(a, b) {
  for (; null !== a;) {
    var c = a.callback;

    if (null !== c) {
      a.callback = null;
      var d = b;
      "function" !== typeof c ? t("191", c) : void 0;
      c.call(d);
    }

    a = a.nextEffect;
  }
}

function ph(a, b) {
  return {
    value: a,
    source: b,
    stack: nc(b)
  };
}

function qh(a) {
  a.effectTag |= 4;
}

var rh = void 0,
    sh = void 0,
    wh = void 0,
    xh = void 0;

rh = function rh(a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
};

sh = function sh() {};

wh = function wh(a, b, c, d, e) {
  var f = a.memoizedProps;

  if (f !== d) {
    var g = b.stateNode;
    Mf(Jf.current);
    a = null;

    switch (c) {
      case "input":
        f = zc(g, f);
        d = zc(g, d);
        a = [];
        break;

      case "option":
        f = de(g, f);
        d = de(g, d);
        a = [];
        break;

      case "select":
        f = p({}, f, {
          value: void 0
        });
        d = p({}, d, {
          value: void 0
        });
        a = [];
        break;

      case "textarea":
        f = fe(g, f);
        d = fe(g, d);
        a = [];
        break;

      default:
        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = xe);
    }

    ue(c, d);
    g = c = void 0;
    var h = null;

    for (c in f) {
      if (!d.hasOwnProperty(c) && f.hasOwnProperty(c) && null != f[c]) if ("style" === c) {
        var l = f[c];

        for (g in l) {
          l.hasOwnProperty(g) && (h || (h = {}), h[g] = "");
        }
      } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (ta.hasOwnProperty(c) ? a || (a = []) : (a = a || []).push(c, null));
    }

    for (c in d) {
      var k = d[c];
      l = null != f ? f[c] : void 0;
      if (d.hasOwnProperty(c) && k !== l && (null != k || null != l)) if ("style" === c) {
        if (l) {
          for (g in l) {
            !l.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (h || (h = {}), h[g] = "");
          }

          for (g in k) {
            k.hasOwnProperty(g) && l[g] !== k[g] && (h || (h = {}), h[g] = k[g]);
          }
        } else h || (a || (a = []), a.push(c, h)), h = k;
      } else "dangerouslySetInnerHTML" === c ? (k = k ? k.__html : void 0, l = l ? l.__html : void 0, null != k && l !== k && (a = a || []).push(c, "" + k)) : "children" === c ? l === k || "string" !== typeof k && "number" !== typeof k || (a = a || []).push(c, "" + k) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (ta.hasOwnProperty(c) ? (null != k && we(e, c), a || l === k || (a = [])) : (a = a || []).push(c, k));
    }

    h && (a = a || []).push("style", h);
    e = a;
    (b.updateQueue = e) && qh(b);
  }
};

xh = function xh(a, b, c, d) {
  c !== d && qh(b);
};

var yh = "function" === typeof WeakSet ? WeakSet : Set;

function zh(a, b) {
  var c = b.source,
      d = b.stack;
  null === d && null !== c && (d = nc(c));
  null !== c && mc(c.type);
  b = b.value;
  null !== a && 1 === a.tag && mc(a.type);

  try {
    console.error(b);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}

function Ah(a) {
  var b = a.ref;
  if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    Bh(a, c);
  } else b.current = null;
}

function Ch(a, b, c) {
  c = c.updateQueue;
  c = null !== c ? c.lastEffect : null;

  if (null !== c) {
    var d = c = c.next;

    do {
      if ((d.tag & a) !== Rf) {
        var e = d.destroy;
        d.destroy = void 0;
        void 0 !== e && e();
      }

      (d.tag & b) !== Rf && (e = d.create, d.destroy = e());
      d = d.next;
    } while (d !== c);
  }
}

function Dh(a, b) {
  for (var c = a;;) {
    if (5 === c.tag) {
      var d = c.stateNode;
      if (b) d.style.display = "none";else {
        d = c.stateNode;
        var e = c.memoizedProps.style;
        e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
        d.style.display = re("display", e);
      }
    } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;else if (13 === c.tag && null !== c.memoizedState) {
      d = c.child.sibling;
      d.return = c;
      c = d;
      continue;
    } else if (null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }

    if (c === a) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === a) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
}

function Eh(a) {
  "function" === typeof Ue && Ue(a);

  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      var b = a.updateQueue;

      if (null !== b && (b = b.lastEffect, null !== b)) {
        var c = b = b.next;

        do {
          var d = c.destroy;

          if (void 0 !== d) {
            var e = a;

            try {
              d();
            } catch (f) {
              Bh(e, f);
            }
          }

          c = c.next;
        } while (c !== b);
      }

      break;

    case 1:
      Ah(a);
      b = a.stateNode;
      if ("function" === typeof b.componentWillUnmount) try {
        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
      } catch (f) {
        Bh(a, f);
      }
      break;

    case 5:
      Ah(a);
      break;

    case 4:
      Fh(a);
  }
}

function Gh(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}

function Hh(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (Gh(b)) {
        var c = b;
        break a;
      }

      b = b.return;
    }

    t("160");
    c = void 0;
  }

  var d = b = void 0;

  switch (c.tag) {
    case 5:
      b = c.stateNode;
      d = !1;
      break;

    case 3:
      b = c.stateNode.containerInfo;
      d = !0;
      break;

    case 4:
      b = c.stateNode.containerInfo;
      d = !0;
      break;

    default:
      t("161");
  }

  c.effectTag & 16 && (oe(b, ""), c.effectTag &= -17);

  a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || Gh(c.return)) {
        c = null;
        break a;
      }

      c = c.return;
    }

    c.sibling.return = c.return;

    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag;) {
      if (c.effectTag & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }

    if (!(c.effectTag & 2)) {
      c = c.stateNode;
      break a;
    }
  }

  for (var e = a;;) {
    if (5 === e.tag || 6 === e.tag) {
      if (c) {
        if (d) {
          var f = b,
              g = e.stateNode,
              h = c;
          8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
        } else b.insertBefore(e.stateNode, c);
      } else d ? (g = b, h = e.stateNode, 8 === g.nodeType ? (f = g.parentNode, f.insertBefore(h, g)) : (f = g, f.appendChild(h)), g = g._reactRootContainer, null !== g && void 0 !== g || null !== f.onclick || (f.onclick = xe)) : b.appendChild(e.stateNode);
    } else if (4 !== e.tag && null !== e.child) {
      e.child.return = e;
      e = e.child;
      continue;
    }
    if (e === a) break;

    for (; null === e.sibling;) {
      if (null === e.return || e.return === a) return;
      e = e.return;
    }

    e.sibling.return = e.return;
    e = e.sibling;
  }
}

function Fh(a) {
  for (var b = a, c = !1, d = void 0, e = void 0;;) {
    if (!c) {
      c = b.return;

      a: for (;;) {
        null === c ? t("160") : void 0;

        switch (c.tag) {
          case 5:
            d = c.stateNode;
            e = !1;
            break a;

          case 3:
            d = c.stateNode.containerInfo;
            e = !0;
            break a;

          case 4:
            d = c.stateNode.containerInfo;
            e = !0;
            break a;
        }

        c = c.return;
      }

      c = !0;
    }

    if (5 === b.tag || 6 === b.tag) {
      a: for (var f = b, g = f;;) {
        if (Eh(g), null !== g.child && 4 !== g.tag) g.child.return = g, g = g.child;else {
          if (g === f) break;

          for (; null === g.sibling;) {
            if (null === g.return || g.return === f) break a;
            g = g.return;
          }

          g.sibling.return = g.return;
          g = g.sibling;
        }
      }

      e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
    } else if (4 === b.tag ? (d = b.stateNode.containerInfo, e = !0) : Eh(b), null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }

    if (b === a) break;

    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return;
      b = b.return;
      4 === b.tag && (c = !1);
    }

    b.sibling.return = b.return;
    b = b.sibling;
  }
}

function Ih(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ch(Tf, Uf, b);
      break;

    case 1:
      break;

    case 5:
      var c = b.stateNode;

      if (null != c) {
        var d = b.memoizedProps;
        a = null !== a ? a.memoizedProps : d;
        var e = b.type,
            f = b.updateQueue;
        b.updateQueue = null;
        null !== f && Ee(c, f, e, a, d, b);
      }

      break;

    case 6:
      null === b.stateNode ? t("162") : void 0;
      b.stateNode.nodeValue = b.memoizedProps;
      break;

    case 3:
      break;

    case 12:
      break;

    case 13:
      c = b.memoizedState;
      d = void 0;
      a = b;
      null === c ? d = !1 : (d = !0, a = b.child, 0 === c.timedOutAt && (c.timedOutAt = nf()));
      null !== a && Dh(a, d);
      c = b.updateQueue;

      if (null !== c) {
        b.updateQueue = null;
        var g = b.stateNode;
        null === g && (g = b.stateNode = new yh());
        c.forEach(function (a) {
          var c = Jh.bind(null, b, a);
          g.has(a) || (g.add(a), a.then(c, c));
        });
      }

      break;

    case 17:
      break;

    default:
      t("163");
  }
}

var Kh = "function" === typeof WeakMap ? WeakMap : Map;

function Lh(a, b, c) {
  c = pf(c);
  c.tag = gh;
  c.payload = {
    element: null
  };
  var d = b.value;

  c.callback = function () {
    Mh(d);
    zh(a, b);
  };

  return c;
}

function Nh(a, b, c) {
  c = pf(c);
  c.tag = gh;
  var d = a.type.getDerivedStateFromError;

  if ("function" === typeof d) {
    var e = b.value;

    c.payload = function () {
      return d(e);
    };
  }

  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === Oh ? Oh = new Set([this]) : Oh.add(this));
    var c = b.value,
        e = b.stack;
    zh(a, b);
    this.componentDidCatch(c, {
      componentStack: null !== e ? e : ""
    });
  });
  return c;
}

function Ph(a) {
  switch (a.tag) {
    case 1:
      M(a.type) && Me(a);
      var b = a.effectTag;
      return b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;

    case 3:
      return Of(a), Oe(a), b = a.effectTag, 0 !== (b & 64) ? t("285") : void 0, a.effectTag = b & -2049 | 64, a;

    case 5:
      return Qf(a), null;

    case 13:
      return b = a.effectTag, b & 2048 ? (a.effectTag = b & -2049 | 64, a) : null;

    case 4:
      return Of(a), null;

    case 10:
      return eh(a), null;

    default:
      return null;
  }
}

var Qh = Xb.ReactCurrentDispatcher,
    Rh = Xb.ReactCurrentOwner,
    Sh = 1073741822,
    Th = 0,
    Uh = !1,
    T = null,
    Vh = null,
    U = 0,
    Wh = -1,
    Xh = !1,
    V = null,
    Yh = !1,
    Zh = null,
    $h = null,
    ai = null,
    Oh = null;

function bi() {
  if (null !== T) for (var a = T.return; null !== a;) {
    var b = a;

    switch (b.tag) {
      case 1:
        var c = b.type.childContextTypes;
        null !== c && void 0 !== c && Me(b);
        break;

      case 3:
        Of(b);
        Oe(b);
        break;

      case 5:
        Qf(b);
        break;

      case 4:
        Of(b);
        break;

      case 10:
        eh(b);
    }

    a = a.return;
  }
  Vh = null;
  U = 0;
  Wh = -1;
  Xh = !1;
  T = null;
}

function ci(a, b) {
  ai = $h = Zh = null;
  var c = W;
  W = !0;

  do {
    if (b.effectTag & 512) {
      var d = !1,
          e = void 0;

      try {
        var f = b;
        Ch(Yf, Rf, f);
        Ch(Rf, Xf, f);
      } catch (g) {
        d = !0, e = g;
      }

      d && Bh(b, e);
    }

    b = b.nextEffect;
  } while (null !== b);

  W = c;
  c = a.expirationTime;
  0 !== c && di(a, c);
}

function qf() {
  null !== ai && (ba.unstable_cancelCallback($h), ai());
}

function ei(a) {
  for (;;) {
    var b = a.alternate,
        c = a.return,
        d = a.sibling;

    if (0 === (a.effectTag & 1024)) {
      T = a;

      a: {
        var e = b;
        b = a;
        var f = U;
        var g = b.pendingProps;

        switch (b.tag) {
          case 2:
            break;

          case 16:
            break;

          case 15:
          case 0:
            break;

          case 1:
            M(b.type) && Me(b);
            break;

          case 3:
            Of(b);
            Oe(b);
            g = b.stateNode;
            g.pendingContext && (g.context = g.pendingContext, g.pendingContext = null);
            if (null === e || null === e.child) Kg(b), b.effectTag &= -3;
            sh(b);
            break;

          case 5:
            Qf(b);
            var h = Mf(Lf.current);
            f = b.type;
            if (null !== e && null != b.stateNode) wh(e, b, f, g, h), e.ref !== b.ref && (b.effectTag |= 128);else if (g) {
              var l = Mf(Jf.current);

              if (Kg(b)) {
                g = b;
                e = g.stateNode;
                var k = g.type,
                    m = g.memoizedProps,
                    q = h;
                e[Ha] = g;
                e[Ia] = m;
                f = void 0;
                h = k;

                switch (h) {
                  case "iframe":
                  case "object":
                    H("load", e);
                    break;

                  case "video":
                  case "audio":
                    for (k = 0; k < cb.length; k++) {
                      H(cb[k], e);
                    }

                    break;

                  case "source":
                    H("error", e);
                    break;

                  case "img":
                  case "image":
                  case "link":
                    H("error", e);
                    H("load", e);
                    break;

                  case "form":
                    H("reset", e);
                    H("submit", e);
                    break;

                  case "details":
                    H("toggle", e);
                    break;

                  case "input":
                    Ac(e, m);
                    H("invalid", e);
                    we(q, "onChange");
                    break;

                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!m.multiple
                    };
                    H("invalid", e);
                    we(q, "onChange");
                    break;

                  case "textarea":
                    ge(e, m), H("invalid", e), we(q, "onChange");
                }

                ue(h, m);
                k = null;

                for (f in m) {
                  m.hasOwnProperty(f) && (l = m[f], "children" === f ? "string" === typeof l ? e.textContent !== l && (k = ["children", l]) : "number" === typeof l && e.textContent !== "" + l && (k = ["children", "" + l]) : ta.hasOwnProperty(f) && null != l && we(q, f));
                }

                switch (h) {
                  case "input":
                    Vb(e);
                    Ec(e, m, !0);
                    break;

                  case "textarea":
                    Vb(e);
                    ie(e, m);
                    break;

                  case "select":
                  case "option":
                    break;

                  default:
                    "function" === typeof m.onClick && (e.onclick = xe);
                }

                f = k;
                g.updateQueue = f;
                g = null !== f ? !0 : !1;
                g && qh(b);
              } else {
                m = b;
                e = f;
                q = g;
                k = 9 === h.nodeType ? h : h.ownerDocument;
                l === je.html && (l = ke(e));
                l === je.html ? "script" === e ? (e = k.createElement("div"), e.innerHTML = "<script>\x3c/script>", k = e.removeChild(e.firstChild)) : "string" === typeof q.is ? k = k.createElement(e, {
                  is: q.is
                }) : (k = k.createElement(e), "select" === e && q.multiple && (k.multiple = !0)) : k = k.createElementNS(l, e);
                e = k;
                e[Ha] = m;
                e[Ia] = g;
                rh(e, b, !1, !1);
                q = e;
                k = f;
                m = g;
                var x = h,
                    C = ve(k, m);

                switch (k) {
                  case "iframe":
                  case "object":
                    H("load", q);
                    h = m;
                    break;

                  case "video":
                  case "audio":
                    for (h = 0; h < cb.length; h++) {
                      H(cb[h], q);
                    }

                    h = m;
                    break;

                  case "source":
                    H("error", q);
                    h = m;
                    break;

                  case "img":
                  case "image":
                  case "link":
                    H("error", q);
                    H("load", q);
                    h = m;
                    break;

                  case "form":
                    H("reset", q);
                    H("submit", q);
                    h = m;
                    break;

                  case "details":
                    H("toggle", q);
                    h = m;
                    break;

                  case "input":
                    Ac(q, m);
                    h = zc(q, m);
                    H("invalid", q);
                    we(x, "onChange");
                    break;

                  case "option":
                    h = de(q, m);
                    break;

                  case "select":
                    q._wrapperState = {
                      wasMultiple: !!m.multiple
                    };
                    h = p({}, m, {
                      value: void 0
                    });
                    H("invalid", q);
                    we(x, "onChange");
                    break;

                  case "textarea":
                    ge(q, m);
                    h = fe(q, m);
                    H("invalid", q);
                    we(x, "onChange");
                    break;

                  default:
                    h = m;
                }

                ue(k, h);
                l = void 0;
                var w = k,
                    E = q,
                    v = h;

                for (l in v) {
                  if (v.hasOwnProperty(l)) {
                    var n = v[l];
                    "style" === l ? se(E, n) : "dangerouslySetInnerHTML" === l ? (n = n ? n.__html : void 0, null != n && ne(E, n)) : "children" === l ? "string" === typeof n ? ("textarea" !== w || "" !== n) && oe(E, n) : "number" === typeof n && oe(E, "" + n) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ta.hasOwnProperty(l) ? null != n && we(x, l) : null != n && xc(E, l, n, C));
                  }
                }

                switch (k) {
                  case "input":
                    Vb(q);
                    Ec(q, m, !1);
                    break;

                  case "textarea":
                    Vb(q);
                    ie(q, m);
                    break;

                  case "option":
                    null != m.value && q.setAttribute("value", "" + yc(m.value));
                    break;

                  case "select":
                    h = q;
                    h.multiple = !!m.multiple;
                    q = m.value;
                    null != q ? ee(h, !!m.multiple, q, !1) : null != m.defaultValue && ee(h, !!m.multiple, m.defaultValue, !0);
                    break;

                  default:
                    "function" === typeof h.onClick && (q.onclick = xe);
                }

                (g = Ae(f, g)) && qh(b);
                b.stateNode = e;
              }

              null !== b.ref && (b.effectTag |= 128);
            } else null === b.stateNode ? t("166") : void 0;
            break;

          case 6:
            e && null != b.stateNode ? xh(e, b, e.memoizedProps, g) : ("string" !== typeof g && (null === b.stateNode ? t("166") : void 0), e = Mf(Lf.current), Mf(Jf.current), Kg(b) ? (g = b, f = g.stateNode, e = g.memoizedProps, f[Ha] = g, (g = f.nodeValue !== e) && qh(b)) : (f = b, g = (9 === e.nodeType ? e : e.ownerDocument).createTextNode(g), g[Ha] = b, f.stateNode = g));
            break;

          case 11:
            break;

          case 13:
            g = b.memoizedState;

            if (0 !== (b.effectTag & 64)) {
              b.expirationTime = f;
              T = b;
              break a;
            }

            g = null !== g;
            f = null !== e && null !== e.memoizedState;
            null !== e && !g && f && (e = e.child.sibling, null !== e && (h = b.firstEffect, null !== h ? (b.firstEffect = e, e.nextEffect = h) : (b.firstEffect = b.lastEffect = e, e.nextEffect = null), e.effectTag = 8));
            if (g || f) b.effectTag |= 4;
            break;

          case 7:
            break;

          case 8:
            break;

          case 12:
            break;

          case 4:
            Of(b);
            sh(b);
            break;

          case 10:
            eh(b);
            break;

          case 9:
            break;

          case 14:
            break;

          case 17:
            M(b.type) && Me(b);
            break;

          default:
            t("156");
        }

        T = null;
      }

      b = a;

      if (1 === U || 1 !== b.childExpirationTime) {
        g = 0;

        for (f = b.child; null !== f;) {
          e = f.expirationTime, h = f.childExpirationTime, e > g && (g = e), h > g && (g = h), f = f.sibling;
        }

        b.childExpirationTime = g;
      }

      if (null !== T) return T;
      null !== c && 0 === (c.effectTag & 1024) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));
    } else {
      a = Ph(a, U);
      if (null !== a) return a.effectTag &= 1023, a;
      null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 1024);
    }

    if (null !== d) return d;
    if (null !== c) a = c;else break;
  }

  return null;
}

function fi(a) {
  var b = Zg(a.alternate, a, U);
  a.memoizedProps = a.pendingProps;
  null === b && (b = ei(a));
  Rh.current = null;
  return b;
}

function gi(a, b) {
  Uh ? t("243") : void 0;
  qf();
  Uh = !0;
  var c = Qh.current;
  Qh.current = pg;
  var d = a.nextExpirationTimeToWorkOn;
  if (d !== U || a !== Vh || null === T) bi(), Vh = a, U = d, T = $e(Vh.current, null, U), a.pendingCommitExpirationTime = 0;
  var e = !1;

  do {
    try {
      if (b) for (; null !== T && !hi();) {
        T = fi(T);
      } else for (; null !== T;) {
        T = fi(T);
      }
    } catch (E) {
      if (dh = ch = bh = null, qg(), null === T) e = !0, Mh(E);else {
        null === T ? t("271") : void 0;
        var f = T,
            g = f.return;
        if (null === g) e = !0, Mh(E);else {
          a: {
            var h = a,
                l = g,
                k = f,
                m = E;
            g = U;
            k.effectTag |= 1024;
            k.firstEffect = k.lastEffect = null;

            if (null !== m && "object" === _typeof(m) && "function" === typeof m.then) {
              var q = m;
              m = l;
              var x = -1,
                  C = -1;

              do {
                if (13 === m.tag) {
                  var w = m.alternate;

                  if (null !== w && (w = w.memoizedState, null !== w)) {
                    C = 10 * (1073741822 - w.timedOutAt);
                    break;
                  }

                  w = m.pendingProps.maxDuration;
                  if ("number" === typeof w) if (0 >= w) x = 0;else if (-1 === x || w < x) x = w;
                }

                m = m.return;
              } while (null !== m);

              m = l;

              do {
                if (w = 13 === m.tag) w = void 0 === m.memoizedProps.fallback ? !1 : null === m.memoizedState;

                if (w) {
                  l = m.updateQueue;
                  null === l ? (l = new Set(), l.add(q), m.updateQueue = l) : l.add(q);

                  if (0 === (m.mode & 1)) {
                    m.effectTag |= 64;
                    k.effectTag &= -1957;
                    1 === k.tag && (null === k.alternate ? k.tag = 17 : (g = pf(1073741823), g.tag = uf, rf(k, g)));
                    k.expirationTime = 1073741823;
                    break a;
                  }

                  k = h.pingCache;
                  null === k ? (k = h.pingCache = new Kh(), l = new Set(), k.set(q, l)) : (l = k.get(q), void 0 === l && (l = new Set(), k.set(q, l)));
                  l.has(g) || (l.add(g), k = ii.bind(null, h, q, g), q.then(k, k));
                  -1 === x ? h = 1073741823 : (-1 === C && (C = 10 * (1073741822 - jf(h, g)) - 5E3), h = C + x);
                  0 <= h && Wh < h && (Wh = h);
                  m.effectTag |= 2048;
                  m.expirationTime = g;
                  break a;
                }

                m = m.return;
              } while (null !== m);

              m = Error((mc(k.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + nc(k));
            }

            Xh = !0;
            m = ph(m, k);
            h = l;

            do {
              switch (h.tag) {
                case 3:
                  h.effectTag |= 2048;
                  h.expirationTime = g;
                  g = Lh(h, m, g);
                  kh(h, g);
                  break a;

                case 1:
                  if (q = m, x = h.type, C = h.stateNode, 0 === (h.effectTag & 64) && ("function" === typeof x.getDerivedStateFromError || null !== C && "function" === typeof C.componentDidCatch && (null === Oh || !Oh.has(C)))) {
                    h.effectTag |= 2048;
                    h.expirationTime = g;
                    g = Nh(h, q, g);
                    kh(h, g);
                    break a;
                  }

              }

              h = h.return;
            } while (null !== h);
          }

          T = ei(f);
          continue;
        }
      }
    }

    break;
  } while (1);

  Uh = !1;
  Qh.current = c;
  dh = ch = bh = null;
  qg();
  if (e) Vh = null, a.finishedWork = null;else if (null !== T) a.finishedWork = null;else {
    c = a.current.alternate;
    null === c ? t("281") : void 0;
    Vh = null;

    if (Xh) {
      e = a.latestPendingTime;
      f = a.latestSuspendedTime;
      g = a.latestPingedTime;

      if (0 !== e && e < d || 0 !== f && f < d || 0 !== g && g < d) {
        hf(a, d);
        ji(a, c, d, a.expirationTime, -1);
        return;
      }

      if (!a.didError && b) {
        a.didError = !0;
        d = a.nextExpirationTimeToWorkOn = d;
        b = a.expirationTime = 1073741823;
        ji(a, c, d, b, -1);
        return;
      }
    }

    b && -1 !== Wh ? (hf(a, d), b = 10 * (1073741822 - jf(a, d)), b < Wh && (Wh = b), b = 10 * (1073741822 - nf()), b = Wh - b, ji(a, c, d, a.expirationTime, 0 > b ? 0 : b)) : (a.pendingCommitExpirationTime = d, a.finishedWork = c);
  }
}

function Bh(a, b) {
  for (var c = a.return; null !== c;) {
    switch (c.tag) {
      case 1:
        var d = c.stateNode;

        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Oh || !Oh.has(d))) {
          a = ph(b, a);
          a = Nh(c, a, 1073741823);
          rf(c, a);
          sf(c, 1073741823);
          return;
        }

        break;

      case 3:
        a = ph(b, a);
        a = Lh(c, a, 1073741823);
        rf(c, a);
        sf(c, 1073741823);
        return;
    }

    c = c.return;
  }

  3 === a.tag && (c = ph(b, a), c = Lh(a, c, 1073741823), rf(a, c), sf(a, 1073741823));
}

function of(a, b) {
  0 !== Th ? a = Th : Uh ? a = Yh ? 1073741823 : U : b.mode & 1 ? (a = ki ? 1073741822 - 10 * (((1073741822 - a + 15) / 10 | 0) + 1) : 1073741822 - 25 * (((1073741822 - a + 500) / 25 | 0) + 1), null !== Vh && a === U && --a) : a = 1073741823;
  ki && (0 === li || a < li) && (li = a);
  return a;
}

function ii(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  if (null !== Vh && U === c) Vh = null;else if (b = a.earliestSuspendedTime, d = a.latestSuspendedTime, 0 !== b && c <= b && c >= d) {
    a.didError = !1;
    b = a.latestPingedTime;
    if (0 === b || b > c) a.latestPingedTime = c;
    gf(c, a);
    c = a.expirationTime;
    0 !== c && di(a, c);
  }
}

function Jh(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = nf();
  b = of(b, a);
  a = mi(a, b);
  null !== a && (ff(a, b), b = a.expirationTime, 0 !== b && di(a, b));
}

function mi(a, b) {
  a.expirationTime < b && (a.expirationTime = b);
  var c = a.alternate;
  null !== c && c.expirationTime < b && (c.expirationTime = b);
  var d = a.return,
      e = null;
  if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
    c = d.alternate;
    d.childExpirationTime < b && (d.childExpirationTime = b);
    null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);

    if (null === d.return && 3 === d.tag) {
      e = d.stateNode;
      break;
    }

    d = d.return;
  }
  return e;
}

function sf(a, b) {
  a = mi(a, b);
  null !== a && (!Uh && 0 !== U && b > U && bi(), ff(a, b), Uh && !Yh && Vh === a || di(a, a.expirationTime), ni > oi && (ni = 0, t("185")));
}

function pi(a, b, c, d, e) {
  var f = Th;
  Th = 1073741823;

  try {
    return a(b, c, d, e);
  } finally {
    Th = f;
  }
}

var qi = null,
    X = null,
    ri = 0,
    si = void 0,
    W = !1,
    ti = null,
    Y = 0,
    li = 0,
    ui = !1,
    vi = null,
    Z = !1,
    wi = !1,
    ki = !1,
    xi = null,
    yi = ba.unstable_now(),
    zi = 1073741822 - (yi / 10 | 0),
    Ai = zi,
    oi = 50,
    ni = 0,
    Bi = null;

function Ci() {
  zi = 1073741822 - ((ba.unstable_now() - yi) / 10 | 0);
}

function Di(a, b) {
  if (0 !== ri) {
    if (b < ri) return;
    null !== si && ba.unstable_cancelCallback(si);
  }

  ri = b;
  a = ba.unstable_now() - yi;
  si = ba.unstable_scheduleCallback(Ei, {
    timeout: 10 * (1073741822 - b) - a
  });
}

function ji(a, b, c, d, e) {
  a.expirationTime = d;
  0 !== e || hi() ? 0 < e && (a.timeoutHandle = Ce(Fi.bind(null, a, b, c), e)) : (a.pendingCommitExpirationTime = c, a.finishedWork = b);
}

function Fi(a, b, c) {
  a.pendingCommitExpirationTime = c;
  a.finishedWork = b;
  Ci();
  Ai = zi;
  Gi(a, c);
}

function nf() {
  if (W) return Ai;
  Hi();
  if (0 === Y || 1 === Y) Ci(), Ai = zi;
  return Ai;
}

function di(a, b) {
  null === a.nextScheduledRoot ? (a.expirationTime = b, null === X ? (qi = X = a, a.nextScheduledRoot = a) : (X = X.nextScheduledRoot = a, X.nextScheduledRoot = qi)) : b > a.expirationTime && (a.expirationTime = b);
  W || (Z ? wi && (ti = a, Y = 1073741823, Ii(a, 1073741823, !1)) : 1073741823 === b ? Ji(1073741823, !1) : Di(a, b));
}

function Hi() {
  var a = 0,
      b = null;
  if (null !== X) for (var c = X, d = qi; null !== d;) {
    var e = d.expirationTime;

    if (0 === e) {
      null === c || null === X ? t("244") : void 0;

      if (d === d.nextScheduledRoot) {
        qi = X = d.nextScheduledRoot = null;
        break;
      } else if (d === qi) qi = e = d.nextScheduledRoot, X.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === X) {
        X = c;
        X.nextScheduledRoot = qi;
        d.nextScheduledRoot = null;
        break;
      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;

      d = c.nextScheduledRoot;
    } else {
      e > a && (a = e, b = d);
      if (d === X) break;
      if (1073741823 === a) break;
      c = d;
      d = d.nextScheduledRoot;
    }
  }
  ti = b;
  Y = a;
}

var Ki = !1;

function hi() {
  return Ki ? !0 : ba.unstable_shouldYield() ? Ki = !0 : !1;
}

function Ei() {
  try {
    if (!hi() && null !== qi) {
      Ci();
      var a = qi;

      do {
        var b = a.expirationTime;
        0 !== b && zi <= b && (a.nextExpirationTimeToWorkOn = zi);
        a = a.nextScheduledRoot;
      } while (a !== qi);
    }

    Ji(0, !0);
  } finally {
    Ki = !1;
  }
}

function Ji(a, b) {
  Hi();
  if (b) for (Ci(), Ai = zi; null !== ti && 0 !== Y && a <= Y && !(Ki && zi > Y);) {
    Ii(ti, Y, zi > Y), Hi(), Ci(), Ai = zi;
  } else for (; null !== ti && 0 !== Y && a <= Y;) {
    Ii(ti, Y, !1), Hi();
  }
  b && (ri = 0, si = null);
  0 !== Y && Di(ti, Y);
  ni = 0;
  Bi = null;
  if (null !== xi) for (a = xi, xi = null, b = 0; b < a.length; b++) {
    var c = a[b];

    try {
      c._onComplete();
    } catch (d) {
      ui || (ui = !0, vi = d);
    }
  }
  if (ui) throw a = vi, vi = null, ui = !1, a;
}

function Gi(a, b) {
  W ? t("253") : void 0;
  ti = a;
  Y = b;
  Ii(a, b, !1);
  Ji(1073741823, !1);
}

function Ii(a, b, c) {
  W ? t("245") : void 0;
  W = !0;

  if (c) {
    var d = a.finishedWork;
    null !== d ? Mi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, De(d)), gi(a, c), d = a.finishedWork, null !== d && (hi() ? a.finishedWork = d : Mi(a, d, b)));
  } else d = a.finishedWork, null !== d ? Mi(a, d, b) : (a.finishedWork = null, d = a.timeoutHandle, -1 !== d && (a.timeoutHandle = -1, De(d)), gi(a, c), d = a.finishedWork, null !== d && Mi(a, d, b));

  W = !1;
}

function Mi(a, b, c) {
  var d = a.firstBatch;

  if (null !== d && d._expirationTime >= c && (null === xi ? xi = [d] : xi.push(d), d._defer)) {
    a.finishedWork = b;
    a.expirationTime = 0;
    return;
  }

  a.finishedWork = null;
  a === Bi ? ni++ : (Bi = a, ni = 0);
  Yh = Uh = !0;
  a.current === b ? t("177") : void 0;
  c = a.pendingCommitExpirationTime;
  0 === c ? t("261") : void 0;
  a.pendingCommitExpirationTime = 0;
  d = b.expirationTime;
  var e = b.childExpirationTime;
  d = e > d ? e : d;
  a.didError = !1;
  0 === d ? (a.earliestPendingTime = 0, a.latestPendingTime = 0, a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0) : (d < a.latestPingedTime && (a.latestPingedTime = 0), e = a.latestPendingTime, 0 !== e && (e > d ? a.earliestPendingTime = a.latestPendingTime = 0 : a.earliestPendingTime > d && (a.earliestPendingTime = a.latestPendingTime)), e = a.earliestSuspendedTime, 0 === e ? ff(a, d) : d < a.latestSuspendedTime ? (a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0, ff(a, d)) : d > e && ff(a, d));
  gf(0, a);
  Rh.current = null;
  1 < b.effectTag ? null !== b.lastEffect ? (b.lastEffect.nextEffect = b, d = b.firstEffect) : d = b : d = b.firstEffect;
  ye = Hd;
  e = Td();

  if (Ud(e)) {
    if ("selectionStart" in e) var f = {
      start: e.selectionStart,
      end: e.selectionEnd
    };else a: {
      f = (f = e.ownerDocument) && f.defaultView || window;
      var g = f.getSelection && f.getSelection();

      if (g && 0 !== g.rangeCount) {
        f = g.anchorNode;
        var h = g.anchorOffset,
            l = g.focusNode;
        g = g.focusOffset;

        try {
          f.nodeType, l.nodeType;
        } catch (tb) {
          f = null;
          break a;
        }

        var k = 0,
            m = -1,
            q = -1,
            x = 0,
            C = 0,
            w = e,
            E = null;

        b: for (;;) {
          for (var v;;) {
            w !== f || 0 !== h && 3 !== w.nodeType || (m = k + h);
            w !== l || 0 !== g && 3 !== w.nodeType || (q = k + g);
            3 === w.nodeType && (k += w.nodeValue.length);
            if (null === (v = w.firstChild)) break;
            E = w;
            w = v;
          }

          for (;;) {
            if (w === e) break b;
            E === f && ++x === h && (m = k);
            E === l && ++C === g && (q = k);
            if (null !== (v = w.nextSibling)) break;
            w = E;
            E = w.parentNode;
          }

          w = v;
        }

        f = -1 === m || -1 === q ? null : {
          start: m,
          end: q
        };
      } else f = null;
    }
    f = f || {
      start: 0,
      end: 0
    };
  } else f = null;

  ze = {
    focusedElem: e,
    selectionRange: f
  };
  Hd = !1;

  for (V = d; null !== V;) {
    e = !1;
    f = void 0;

    try {
      for (; null !== V;) {
        if (V.effectTag & 256) a: {
          var n = V.alternate;
          h = V;

          switch (h.tag) {
            case 0:
            case 11:
            case 15:
              Ch(Sf, Rf, h);
              break a;

            case 1:
              if (h.effectTag & 256 && null !== n) {
                var u = n.memoizedProps,
                    z = n.memoizedState,
                    Ag = h.stateNode,
                    Li = Ag.getSnapshotBeforeUpdate(h.elementType === h.type ? u : P(h.type, u), z);
                Ag.__reactInternalSnapshotBeforeUpdate = Li;
              }

              break a;

            case 3:
            case 5:
            case 6:
            case 4:
            case 17:
              break a;

            default:
              t("163");
          }
        }
        V = V.nextEffect;
      }
    } catch (tb) {
      e = !0, f = tb;
    }

    e && (null === V ? t("178") : void 0, Bh(V, f), null !== V && (V = V.nextEffect));
  }

  for (V = d; null !== V;) {
    n = !1;
    u = void 0;

    try {
      for (; null !== V;) {
        var y = V.effectTag;
        y & 16 && oe(V.stateNode, "");

        if (y & 128) {
          var B = V.alternate;

          if (null !== B) {
            var r = B.ref;
            null !== r && ("function" === typeof r ? r(null) : r.current = null);
          }
        }

        switch (y & 14) {
          case 2:
            Hh(V);
            V.effectTag &= -3;
            break;

          case 6:
            Hh(V);
            V.effectTag &= -3;
            Ih(V.alternate, V);
            break;

          case 4:
            Ih(V.alternate, V);
            break;

          case 8:
            z = V;
            Fh(z);
            z.return = null;
            z.child = null;
            z.memoizedState = null;
            z.updateQueue = null;
            var O = z.alternate;
            null !== O && (O.return = null, O.child = null, O.memoizedState = null, O.updateQueue = null);
        }

        V = V.nextEffect;
      }
    } catch (tb) {
      n = !0, u = tb;
    }

    n && (null === V ? t("178") : void 0, Bh(V, u), null !== V && (V = V.nextEffect));
  }

  r = ze;
  B = Td();
  y = r.focusedElem;
  n = r.selectionRange;

  if (B !== y && y && y.ownerDocument && Sd(y.ownerDocument.documentElement, y)) {
    null !== n && Ud(y) && (B = n.start, r = n.end, void 0 === r && (r = B), "selectionStart" in y ? (y.selectionStart = B, y.selectionEnd = Math.min(r, y.value.length)) : (r = (B = y.ownerDocument || document) && B.defaultView || window, r.getSelection && (r = r.getSelection(), u = y.textContent.length, O = Math.min(n.start, u), n = void 0 === n.end ? O : Math.min(n.end, u), !r.extend && O > n && (u = n, n = O, O = u), u = Rd(y, O), z = Rd(y, n), u && z && (1 !== r.rangeCount || r.anchorNode !== u.node || r.anchorOffset !== u.offset || r.focusNode !== z.node || r.focusOffset !== z.offset) && (B = B.createRange(), B.setStart(u.node, u.offset), r.removeAllRanges(), O > n ? (r.addRange(B), r.extend(z.node, z.offset)) : (B.setEnd(z.node, z.offset), r.addRange(B))))));
    B = [];

    for (r = y; r = r.parentNode;) {
      1 === r.nodeType && B.push({
        element: r,
        left: r.scrollLeft,
        top: r.scrollTop
      });
    }

    "function" === typeof y.focus && y.focus();

    for (y = 0; y < B.length; y++) {
      r = B[y], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }

  ze = null;
  Hd = !!ye;
  ye = null;
  a.current = b;

  for (V = d; null !== V;) {
    y = !1;
    B = void 0;

    try {
      for (r = a, O = c; null !== V;) {
        var qa = V.effectTag;

        if (qa & 36) {
          var Qb = V.alternate;
          n = V;
          u = O;

          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              Ch(Vf, Wf, n);
              break;

            case 1:
              var hd = n.stateNode;
              if (n.effectTag & 4) if (null === Qb) hd.componentDidMount();else {
                var bj = n.elementType === n.type ? Qb.memoizedProps : P(n.type, Qb.memoizedProps);
                hd.componentDidUpdate(bj, Qb.memoizedState, hd.__reactInternalSnapshotBeforeUpdate);
              }
              var th = n.updateQueue;
              null !== th && nh(n, th, hd, u);
              break;

            case 3:
              var uh = n.updateQueue;

              if (null !== uh) {
                z = null;
                if (null !== n.child) switch (n.child.tag) {
                  case 5:
                    z = n.child.stateNode;
                    break;

                  case 1:
                    z = n.child.stateNode;
                }
                nh(n, uh, z, u);
              }

              break;

            case 5:
              var cj = n.stateNode;
              null === Qb && n.effectTag & 4 && Ae(n.type, n.memoizedProps) && cj.focus();
              break;

            case 6:
              break;

            case 4:
              break;

            case 12:
              break;

            case 13:
              break;

            case 17:
              break;

            default:
              t("163");
          }
        }

        if (qa & 128) {
          var id = V.ref;

          if (null !== id) {
            var vh = V.stateNode;

            switch (V.tag) {
              case 5:
                var Ne = vh;
                break;

              default:
                Ne = vh;
            }

            "function" === typeof id ? id(Ne) : id.current = Ne;
          }
        }

        qa & 512 && (Zh = r);
        V = V.nextEffect;
      }
    } catch (tb) {
      y = !0, B = tb;
    }

    y && (null === V ? t("178") : void 0, Bh(V, B), null !== V && (V = V.nextEffect));
  }

  null !== d && null !== Zh && (qa = ci.bind(null, a, d), $h = ba.unstable_scheduleCallback(qa), ai = qa);
  Uh = Yh = !1;
  "function" === typeof Te && Te(b.stateNode);
  qa = b.expirationTime;
  b = b.childExpirationTime;
  b = b > qa ? b : qa;
  0 === b && (Oh = null);
  a.expirationTime = b;
  a.finishedWork = null;
}

function Mh(a) {
  null === ti ? t("246") : void 0;
  ti.expirationTime = 0;
  ui || (ui = !0, vi = a);
}

function Ni(a, b) {
  var c = Z;
  Z = !0;

  try {
    return a(b);
  } finally {
    (Z = c) || W || Ji(1073741823, !1);
  }
}

function Oi(a, b) {
  if (Z && !wi) {
    wi = !0;

    try {
      return a(b);
    } finally {
      wi = !1;
    }
  }

  return a(b);
}

function Pi(a, b, c) {
  if (ki) return a(b, c);
  Z || W || 0 === li || (Ji(li, !1), li = 0);
  var d = ki,
      e = Z;
  Z = ki = !0;

  try {
    return a(b, c);
  } finally {
    ki = d, (Z = e) || W || Ji(1073741823, !1);
  }
}

function Qi(a, b, c, d, e) {
  var f = b.current;

  a: if (c) {
    c = c._reactInternalFiber;

    b: {
      2 === kd(c) && 1 === c.tag ? void 0 : t("170");
      var g = c;

      do {
        switch (g.tag) {
          case 3:
            g = g.stateNode.context;
            break b;

          case 1:
            if (M(g.type)) {
              g = g.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }

        }

        g = g.return;
      } while (null !== g);

      t("171");
      g = void 0;
    }

    if (1 === c.tag) {
      var h = c.type;

      if (M(h)) {
        c = Qe(c, h, g);
        break a;
      }
    }

    c = g;
  } else c = Je;

  null === b.context ? b.context = c : b.pendingContext = c;
  b = e;
  e = pf(d);
  e.payload = {
    element: a
  };
  b = void 0 === b ? null : b;
  null !== b && (e.callback = b);
  qf();
  rf(f, e);
  sf(f, d);
  return d;
}

function Ri(a, b, c, d) {
  var e = b.current,
      f = nf();
  e = of(f, e);
  return Qi(a, b, c, e, d);
}

function Si(a) {
  a = a.current;
  if (!a.child) return null;

  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;

    default:
      return a.child.stateNode;
  }
}

function Ti(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: $b,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}

Db = function Db(a, b, c) {
  switch (b) {
    case "input":
      Cc(a, c);
      b = c.name;

      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) {
          c = c.parentNode;
        }

        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

        for (b = 0; b < c.length; b++) {
          var d = c[b];

          if (d !== a && d.form === a.form) {
            var e = Ma(d);
            e ? void 0 : t("90");
            Wb(d);
            Cc(d, e);
          }
        }
      }

      break;

    case "textarea":
      he(a, c);
      break;

    case "select":
      b = c.value, null != b && ee(a, !!c.multiple, b, !1);
  }
};

function Ui(a) {
  var b = 1073741822 - 25 * (((1073741822 - nf() + 500) / 25 | 0) + 1);
  b >= Sh && (b = Sh - 1);
  this._expirationTime = Sh = b;
  this._root = a;
  this._callbacks = this._next = null;
  this._hasChildren = this._didComplete = !1;
  this._children = null;
  this._defer = !0;
}

Ui.prototype.render = function (a) {
  this._defer ? void 0 : t("250");
  this._hasChildren = !0;
  this._children = a;
  var b = this._root._internalRoot,
      c = this._expirationTime,
      d = new Vi();
  Qi(a, b, null, c, d._onCommit);
  return d;
};

Ui.prototype.then = function (a) {
  if (this._didComplete) a();else {
    var b = this._callbacks;
    null === b && (b = this._callbacks = []);
    b.push(a);
  }
};

Ui.prototype.commit = function () {
  var a = this._root._internalRoot,
      b = a.firstBatch;
  this._defer && null !== b ? void 0 : t("251");

  if (this._hasChildren) {
    var c = this._expirationTime;

    if (b !== this) {
      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));

      for (var d = null, e = b; e !== this;) {
        d = e, e = e._next;
      }

      null === d ? t("251") : void 0;
      d._next = e._next;
      this._next = b;
      a.firstBatch = this;
    }

    this._defer = !1;
    Gi(a, c);
    b = this._next;
    this._next = null;
    b = a.firstBatch = b;
    null !== b && b._hasChildren && b.render(b._children);
  } else this._next = null, this._defer = !1;
};

Ui.prototype._onComplete = function () {
  if (!this._didComplete) {
    this._didComplete = !0;
    var a = this._callbacks;
    if (null !== a) for (var b = 0; b < a.length; b++) {
      (0, a[b])();
    }
  }
};

function Vi() {
  this._callbacks = null;
  this._didCommit = !1;
  this._onCommit = this._onCommit.bind(this);
}

Vi.prototype.then = function (a) {
  if (this._didCommit) a();else {
    var b = this._callbacks;
    null === b && (b = this._callbacks = []);
    b.push(a);
  }
};

Vi.prototype._onCommit = function () {
  if (!this._didCommit) {
    this._didCommit = !0;
    var a = this._callbacks;
    if (null !== a) for (var b = 0; b < a.length; b++) {
      var c = a[b];
      "function" !== typeof c ? t("191", c) : void 0;
      c();
    }
  }
};

function Wi(a, b, c) {
  b = N(3, null, null, b ? 3 : 0);
  a = {
    current: b,
    containerInfo: a,
    pendingChildren: null,
    pingCache: null,
    earliestPendingTime: 0,
    latestPendingTime: 0,
    earliestSuspendedTime: 0,
    latestSuspendedTime: 0,
    latestPingedTime: 0,
    didError: !1,
    pendingCommitExpirationTime: 0,
    finishedWork: null,
    timeoutHandle: -1,
    context: null,
    pendingContext: null,
    hydrate: c,
    nextExpirationTimeToWorkOn: 0,
    expirationTime: 0,
    firstBatch: null,
    nextScheduledRoot: null
  };
  this._internalRoot = b.stateNode = a;
}

Wi.prototype.render = function (a, b) {
  var c = this._internalRoot,
      d = new Vi();
  b = void 0 === b ? null : b;
  null !== b && d.then(b);
  Ri(a, c, null, d._onCommit);
  return d;
};

Wi.prototype.unmount = function (a) {
  var b = this._internalRoot,
      c = new Vi();
  a = void 0 === a ? null : a;
  null !== a && c.then(a);
  Ri(null, b, null, c._onCommit);
  return c;
};

Wi.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
  var d = this._internalRoot,
      e = new Vi();
  c = void 0 === c ? null : c;
  null !== c && e.then(c);
  Ri(b, d, a, e._onCommit);
  return e;
};

Wi.prototype.createBatch = function () {
  var a = new Ui(this),
      b = a._expirationTime,
      c = this._internalRoot,
      d = c.firstBatch;
  if (null === d) c.firstBatch = a, a._next = null;else {
    for (c = null; null !== d && d._expirationTime >= b;) {
      c = d, d = d._next;
    }

    a._next = d;
    null !== c && (c._next = a);
  }
  return a;
};

function Xi(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}

Jb = Ni;
Kb = Pi;

Lb = function Lb() {
  W || 0 === li || (Ji(li, !1), li = 0);
};

function Yi(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b) for (var c; c = a.lastChild;) {
    a.removeChild(c);
  }
  return new Wi(a, !1, b);
}

function Zi(a, b, c, d, e) {
  var f = c._reactRootContainer;

  if (f) {
    if ("function" === typeof e) {
      var g = e;

      e = function e() {
        var a = Si(f._internalRoot);
        g.call(a);
      };
    }

    null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
  } else {
    f = c._reactRootContainer = Yi(c, d);

    if ("function" === typeof e) {
      var h = e;

      e = function e() {
        var a = Si(f._internalRoot);
        h.call(a);
      };
    }

    Oi(function () {
      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
    });
  }

  return Si(f._internalRoot);
}

function $i(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  Xi(b) ? void 0 : t("200");
  return Ti(a, b, null, c);
}

var dj = {
  createPortal: $i,
  findDOMNode: function findDOMNode(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternalFiber;
    void 0 === b && ("function" === typeof a.render ? t("188") : t("268", Object.keys(a)));
    a = nd(b);
    a = null === a ? null : a.stateNode;
    return a;
  },
  hydrate: function hydrate(a, b, c) {
    Xi(b) ? void 0 : t("200");
    return Zi(null, a, b, !0, c);
  },
  render: function render(a, b, c) {
    Xi(b) ? void 0 : t("200");
    return Zi(null, a, b, !1, c);
  },
  unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    Xi(c) ? void 0 : t("200");
    null == a || void 0 === a._reactInternalFiber ? t("38") : void 0;
    return Zi(a, b, c, !1, d);
  },
  unmountComponentAtNode: function unmountComponentAtNode(a) {
    Xi(a) ? void 0 : t("40");
    return a._reactRootContainer ? (Oi(function () {
      Zi(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  },
  unstable_createPortal: function unstable_createPortal() {
    return $i.apply(void 0, arguments);
  },
  unstable_batchedUpdates: Ni,
  unstable_interactiveUpdates: Pi,
  flushSync: function flushSync(a, b) {
    W ? t("187") : void 0;
    var c = Z;
    Z = !0;

    try {
      return pi(a, b);
    } finally {
      Z = c, Ji(1073741823, !1);
    }
  },
  unstable_createRoot: aj,
  unstable_flushControlled: function unstable_flushControlled(a) {
    var b = Z;
    Z = !0;

    try {
      pi(a);
    } finally {
      (Z = b) || W || Ji(1073741823, !1);
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [Ka, La, Ma, Da.injectEventPluginsByName, ra, Sa, function (a) {
      Aa(a, Ra);
    }, Hb, Ib, Jd, Fa]
  }
};

function aj(a, b) {
  Xi(a) ? void 0 : t("299", "unstable_createRoot");
  return new Wi(a, !0, null != b && !0 === b.hydrate);
}

(function (a) {
  var b = a.findFiberByHostInstance;
  return We(p({}, a, {
    overrideProps: null,
    currentDispatcherRef: Xb.ReactCurrentDispatcher,
    findHostInstanceByFiber: function findHostInstanceByFiber(a) {
      a = nd(a);
      return null === a ? null : a.stateNode;
    },
    findFiberByHostInstance: function findFiberByHostInstance(a) {
      return b ? b(a) : null;
    }
  }));
})({
  findFiberByHostInstance: Ja,
  bundleType: 0,
  version: "16.7.0-canary-fec00a869",
  rendererPackageName: "react-dom"
});

var ej = {
  default: dj
},
    fj = ej && dj || ej;
module.exports = fj.default || fj;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(42);
} else {}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.0.0-fec00a869
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var c = null,
    f = !1,
    h = 3,
    k = -1,
    l = -1,
    m = !1,
    n = !1;

function p() {
  if (!m) {
    var a = c.expirationTime;
    n ? q() : n = !0;

    _r(t, a);
  }
}

function u() {
  var a = c,
      b = c.next;
  if (c === b) c = null;else {
    var d = c.previous;
    c = d.next = b;
    b.previous = d;
  }
  a.next = a.previous = null;
  d = a.callback;
  b = a.expirationTime;
  a = a.priorityLevel;
  var e = h,
      Q = l;
  h = a;
  l = b;

  try {
    var g = d();
  } finally {
    h = e, l = Q;
  }

  if ("function" === typeof g) if (g = {
    callback: g,
    priorityLevel: a,
    expirationTime: b,
    next: null,
    previous: null
  }, null === c) c = g.next = g.previous = g;else {
    d = null;
    a = c;

    do {
      if (a.expirationTime >= b) {
        d = a;
        break;
      }

      a = a.next;
    } while (a !== c);

    null === d ? d = c : d === c && (c = g, p());
    b = d.previous;
    b.next = d.previous = g;
    g.next = d;
    g.previous = b;
  }
}

function v() {
  if (-1 === k && null !== c && 1 === c.priorityLevel) {
    m = !0;

    try {
      do {
        u();
      } while (null !== c && 1 === c.priorityLevel);
    } finally {
      m = !1, null !== c ? p() : n = !1;
    }
  }
}

function t(a) {
  m = !0;
  var b = f;
  f = a;

  try {
    if (a) for (; null !== c;) {
      var d = exports.unstable_now();

      if (c.expirationTime <= d) {
        do {
          u();
        } while (null !== c && c.expirationTime <= d);
      } else break;
    } else if (null !== c) {
      do {
        u();
      } while (null !== c && !w());
    }
  } finally {
    m = !1, f = b, null !== c ? p() : n = !1, v();
  }
}

var x = Date,
    y = "function" === typeof setTimeout ? setTimeout : void 0,
    z = "function" === typeof clearTimeout ? clearTimeout : void 0,
    A = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0,
    B = "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0,
    C,
    D;

function E(a) {
  C = A(function (b) {
    z(D);
    a(b);
  });
  D = y(function () {
    B(C);
    a(exports.unstable_now());
  }, 100);
}

if ("object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now) {
  var F = performance;

  exports.unstable_now = function () {
    return F.now();
  };
} else exports.unstable_now = function () {
  return x.now();
};

var _r,
    q,
    w,
    G = null;

"undefined" !== typeof window ? G = window : "undefined" !== typeof global && (G = global);

if (G && G._schedMock) {
  var H = G._schedMock;
  _r = H[0];
  q = H[1];
  w = H[2];
  exports.unstable_now = H[3];
} else if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var I = null,
      J = function J(a) {
    if (null !== I) try {
      I(a);
    } finally {
      I = null;
    }
  };

  _r = function r(a) {
    null !== I ? setTimeout(_r, 0, a) : (I = a, setTimeout(J, 0, !1));
  };

  q = function q() {
    I = null;
  };

  w = function w() {
    return !1;
  };
} else {
  "undefined" !== typeof console && ("function" !== typeof A && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof B && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
  var K = null,
      L = !1,
      M = -1,
      N = !1,
      O = !1,
      P = 0,
      R = 33,
      S = 33;

  w = function w() {
    return P <= exports.unstable_now();
  };

  var T = new MessageChannel(),
      U = T.port2;

  T.port1.onmessage = function () {
    L = !1;
    var a = K,
        b = M;
    K = null;
    M = -1;
    var d = exports.unstable_now(),
        e = !1;
    if (0 >= P - d) if (-1 !== b && b <= d) e = !0;else {
      N || (N = !0, E(V));
      K = a;
      M = b;
      return;
    }

    if (null !== a) {
      O = !0;

      try {
        a(e);
      } finally {
        O = !1;
      }
    }
  };

  var V = function V(a) {
    if (null !== K) {
      E(V);
      var b = a - P + S;
      b < S && R < S ? (8 > b && (b = 8), S = b < R ? R : b) : R = b;
      P = a + S;
      L || (L = !0, U.postMessage(void 0));
    } else N = !1;
  };

  _r = function _r(a, b) {
    K = a;
    M = b;
    O || 0 > b ? U.postMessage(void 0) : N || (N = !0, E(V));
  };

  q = function q() {
    K = null;
    L = !1;
    M = -1;
  };
}

exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var d = h,
      e = k;
  h = a;
  k = exports.unstable_now();

  try {
    return b();
  } finally {
    h = d, k = e, v();
  }
};

exports.unstable_scheduleCallback = function (a, b) {
  var d = -1 !== k ? k : exports.unstable_now();
  if ("object" === _typeof(b) && null !== b && "number" === typeof b.timeout) b = d + b.timeout;else switch (h) {
    case 1:
      b = d + -1;
      break;

    case 2:
      b = d + 250;
      break;

    case 5:
      b = d + 1073741823;
      break;

    case 4:
      b = d + 1E4;
      break;

    default:
      b = d + 5E3;
  }
  a = {
    callback: a,
    priorityLevel: h,
    expirationTime: b,
    next: null,
    previous: null
  };
  if (null === c) c = a.next = a.previous = a, p();else {
    d = null;
    var e = c;

    do {
      if (e.expirationTime > b) {
        d = e;
        break;
      }

      e = e.next;
    } while (e !== c);

    null === d ? d = c : d === c && (c = a, p());
    b = d.previous;
    b.next = d.previous = a;
    a.next = d;
    a.previous = b;
  }
  return a;
};

exports.unstable_cancelCallback = function (a) {
  var b = a.next;

  if (null !== b) {
    if (b === a) c = null;else {
      a === c && (c = b);
      var d = a.previous;
      d.next = b;
      b.previous = d;
    }
    a.next = a.previous = null;
  }
};

exports.unstable_wrapCallback = function (a) {
  var b = h;
  return function () {
    var d = h,
        e = k;
    h = b;
    k = exports.unstable_now();

    try {
      return a.apply(this, arguments);
    } finally {
      h = d, k = e, v();
    }
  };
};

exports.unstable_getCurrentPriorityLevel = function () {
  return h;
};

exports.unstable_shouldYield = function () {
  return !f && (null !== c && c.expirationTime < l || w());
};

exports.unstable_continueExecution = function () {
  null !== c && p();
};

exports.unstable_pauseExecution = function () {};

exports.unstable_getFirstCallbackNode = function () {
  return c;
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var kDone = Symbol('kDone');
var kRun = Symbol('kRun');
/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */

var Limiter = /*#__PURE__*/function () {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} concurrency The maximum number of jobs allowed to run
   *     concurrently
   */
  function Limiter(concurrency) {
    var _this = this;

    _classCallCheck(this, Limiter);

    this[kDone] = function () {
      _this.pending--;

      _this[kRun]();
    };

    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @public
   */


  _createClass(Limiter, [{
    key: "add",
    value: function add(job) {
      this.jobs.push(job);
      this[kRun]();
    }
    /**
     * Removes a job from the queue and runs it if possible.
     *
     * @private
     */

  }, {
    key: kRun,
    value: function value() {
      if (this.pending === this.concurrency) return;

      if (this.jobs.length) {
        var job = this.jobs.shift();
        this.pending++;
        job(this[kDone]);
      }
    }
  }]);

  return Limiter;
}();

module.exports = Limiter;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Class representing an event.
 *
 * @private
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event =
/**
 * Create a new `Event`.
 *
 * @param {String} type The name of the event
 * @param {Object} target A reference to the target to which the event was dispatched
 */
function Event(type, target) {
  _classCallCheck(this, Event);

  this.target = target;
  this.type = type;
};
/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */


var MessageEvent = /*#__PURE__*/function (_Event) {
  _inherits(MessageEvent, _Event);

  var _super = _createSuper(MessageEvent);

  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function MessageEvent(data, target) {
    var _this;

    _classCallCheck(this, MessageEvent);

    _this = _super.call(this, 'message', target);
    _this.data = data;
    return _this;
  }

  return MessageEvent;
}(Event);
/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */


var CloseEvent = /*#__PURE__*/function (_Event2) {
  _inherits(CloseEvent, _Event2);

  var _super2 = _createSuper(CloseEvent);

  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being closed
   * @param {String} reason A human-readable string explaining why the connection is closing
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function CloseEvent(code, reason, target) {
    var _this2;

    _classCallCheck(this, CloseEvent);

    _this2 = _super2.call(this, 'close', target);
    _this2.wasClean = target._closeFrameReceived && target._closeFrameSent;
    _this2.reason = reason;
    _this2.code = code;
    return _this2;
  }

  return CloseEvent;
}(Event);
/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */


var OpenEvent = /*#__PURE__*/function (_Event3) {
  _inherits(OpenEvent, _Event3);

  var _super3 = _createSuper(OpenEvent);

  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function OpenEvent(target) {
    _classCallCheck(this, OpenEvent);

    return _super3.call(this, 'open', target);
  }

  return OpenEvent;
}(Event);
/**
 * Class representing an error event.
 *
 * @extends Event
 * @private
 */


var ErrorEvent = /*#__PURE__*/function (_Event4) {
  _inherits(ErrorEvent, _Event4);

  var _super4 = _createSuper(ErrorEvent);

  /**
   * Create a new `ErrorEvent`.
   *
   * @param {Object} error The error that generated this event
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  function ErrorEvent(error, target) {
    var _this3;

    _classCallCheck(this, ErrorEvent);

    _this3 = _super4.call(this, 'error', target);
    _this3.message = error.message;
    _this3.error = error;
    return _this3;
  }

  return ErrorEvent;
}(Event);
/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */


var EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} method A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @public
   */
  addEventListener: function addEventListener(method, listener) {
    if (typeof listener !== 'function') return;

    function onMessage(data) {
      listener.call(this, new MessageEvent(data, this));
    }

    function onClose(code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError(error) {
      listener.call(this, new ErrorEvent(error, this));
    }

    function onOpen() {
      listener.call(this, new OpenEvent(this));
    }

    if (method === 'message') {
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
      onOpen._listener = listener;
      this.on(method, onOpen);
    } else {
      this.on(method, listener);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} method A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener: function removeEventListener(method, listener) {
    var listeners = this.listeners(method);

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(method, listeners[i]);
      }
    }
  }
};
module.exports = EventTarget;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(25),
    Duplex = _require.Duplex;
/**
 * Emits the `'close'` event on a stream.
 *
 * @param {stream.Duplex} The stream.
 * @private
 */


function emitClose(stream) {
  stream.emit('close');
}
/**
 * The listener of the `'end'` event.
 *
 * @private
 */


function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}
/**
 * The listener of the `'error'` event.
 *
 * @private
 */


function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();

  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}
/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} options The options for the `Duplex` constructor
 * @return {stream.Duplex} The duplex stream
 * @public
 */


function createWebSocketStream(ws, options) {
  var resumeOnReceiverDrain = true;

  function receiverOnDrain() {
    if (resumeOnReceiverDrain) ws._socket.resume();
  }

  if (ws.readyState === ws.CONNECTING) {
    ws.once('open', function open() {
      ws._receiver.removeAllListeners('drain');

      ws._receiver.on('drain', receiverOnDrain);
    });
  } else {
    ws._receiver.removeAllListeners('drain');

    ws._receiver.on('drain', receiverOnDrain);
  }

  var duplex = new Duplex(_objectSpread({}, options, {
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  }));
  ws.on('message', function message(msg) {
    if (!duplex.push(msg)) {
      resumeOnReceiverDrain = false;

      ws._socket.pause();
    }
  });
  ws.once('error', function error(err) {
    if (duplex.destroyed) return;
    duplex.destroy(err);
  });
  ws.once('close', function close() {
    if (duplex.destroyed) return;
    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    var called = false;
    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });
    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });
    ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    } // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.


    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      if (duplex._readableState.endEmitted) duplex.destroy();
      callback();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });

      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
      resumeOnReceiverDrain = true;
      if (!ws._receiver._writableState.needDrain) ws._socket.resume();
    }
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = __webpack_require__(10);

var _require = __webpack_require__(19),
    createHash = _require.createHash;

var _require2 = __webpack_require__(18),
    createServer = _require2.createServer,
    STATUS_CODES = _require2.STATUS_CODES;

var PerMessageDeflate = __webpack_require__(14);

var WebSocket = __webpack_require__(23);

var _require3 = __webpack_require__(28),
    format = _require3.format,
    parse = _require3.parse;

var _require4 = __webpack_require__(9),
    GUID = _require4.GUID;

var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
var kUsedByWebSocketServer = Symbol('kUsedByWebSocketServer');
/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */

var WebSocketServer = /*#__PURE__*/function (_EventEmitter) {
  _inherits(WebSocketServer, _EventEmitter);

  var _super = _createSuper(WebSocketServer);

  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} options.backlog The maximum length of the queue of pending
   *     connections
   * @param {Boolean} options.clientTracking Specifies whether or not to track
   *     clients
   * @param {Function} options.handleProtocols A hook to handle protocols
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Boolean} options.noServer Enable no server mode
   * @param {String} options.path Accept only connections matching this path
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
   *     permessage-deflate
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient A hook to reject connections
   * @param {Function} callback A listener for the `listening` event
   */
  function WebSocketServer(options, callback) {
    var _this;

    _classCallCheck(this, WebSocketServer);

    _this = _super.call(this);
    options = _objectSpread({
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null,
      // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null
    }, options);

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError('One of the "port", "server", or "noServer" options must be specified');
    }

    if (options.port != null) {
      _this._server = createServer(function (req, res) {
        var body = STATUS_CODES[426];
        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });

      _this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      if (options.server[kUsedByWebSocketServer]) {
        throw new Error('The HTTP/S server is already being used by another WebSocket server');
      }

      options.server[kUsedByWebSocketServer] = true;
      _this._server = options.server;
    }

    if (_this._server) {
      _this._removeListeners = addListeners(_this._server, {
        listening: _this.emit.bind(_assertThisInitialized(_this), 'listening'),
        error: _this.emit.bind(_assertThisInitialized(_this), 'error'),
        upgrade: function upgrade(req, socket, head) {
          _this.handleUpgrade(req, socket, head, function (ws) {
            _this.emit('connection', ws, req);
          });
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) _this.clients = new Set();
    _this.options = options;
    return _this;
  }
  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */


  _createClass(WebSocketServer, [{
    key: "address",
    value: function address() {
      if (this.options.noServer) {
        throw new Error('The server is operating in "noServer" mode');
      }

      if (!this._server) return null;
      return this._server.address();
    }
    /**
     * Close the server.
     *
     * @param {Function} cb Callback
     * @public
     */

  }, {
    key: "close",
    value: function close(cb) {
      var _this2 = this;

      if (cb) this.once('close', cb); //
      // Terminate all associated clients.
      //

      if (this.clients) {
        var _iterator = _createForOfIteratorHelper(this.clients),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var client = _step.value;
            client.terminate();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var server = this._server;

      if (server) {
        this._removeListeners();

        this._removeListeners = this._server = null; //
        // Close the http server if it was internally created.
        //

        if (this.options.port != null) {
          server.close(function () {
            return _this2.emit('close');
          });
          return;
        }

        delete server[kUsedByWebSocketServer];
      }

      process.nextTick(emitClose, this);
    }
    /**
     * See if a given request should be handled by this server instance.
     *
     * @param {http.IncomingMessage} req Request object to inspect
     * @return {Boolean} `true` if the request is valid, else `false`
     * @public
     */

  }, {
    key: "shouldHandle",
    value: function shouldHandle(req) {
      if (this.options.path) {
        var index = req.url.indexOf('?');
        var pathname = index !== -1 ? req.url.slice(0, index) : req.url;
        if (pathname !== this.options.path) return false;
      }

      return true;
    }
    /**
     * Handle a HTTP Upgrade request.
     *
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @public
     */

  }, {
    key: "handleUpgrade",
    value: function handleUpgrade(req, socket, head, cb) {
      var _this3 = this;

      socket.on('error', socketOnError);
      var key = req.headers['sec-websocket-key'] !== undefined ? req.headers['sec-websocket-key'].trim() : false;
      var version = +req.headers['sec-websocket-version'];
      var extensions = {};

      if (req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket' || !key || !keyRegex.test(key) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
        return abortHandshake(socket, 400);
      }

      if (this.options.perMessageDeflate) {
        var perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);

        try {
          var offers = parse(req.headers['sec-websocket-extensions']);

          if (offers[PerMessageDeflate.extensionName]) {
            perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
            extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          return abortHandshake(socket, 400);
        }
      } //
      // Optionally call external client verification handler.
      //


      if (this.options.verifyClient) {
        var info = {
          origin: req.headers["".concat(version === 8 ? 'sec-websocket-origin' : 'origin')],
          secure: !!(req.connection.authorized || req.connection.encrypted),
          req: req
        };

        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(info, function (verified, code, message, headers) {
            if (!verified) {
              return abortHandshake(socket, code || 401, message, headers);
            }

            _this3.completeUpgrade(key, extensions, req, socket, head, cb);
          });
          return;
        }

        if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
      }

      this.completeUpgrade(key, extensions, req, socket, head, cb);
    }
    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {String} key The value of the `Sec-WebSocket-Key` header
     * @param {Object} extensions The accepted extensions
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @private
     */

  }, {
    key: "completeUpgrade",
    value: function completeUpgrade(key, extensions, req, socket, head, cb) {
      var _this4 = this;

      //
      // Destroy the socket if the client has already sent a FIN packet.
      //
      if (!socket.readable || !socket.writable) return socket.destroy();
      var digest = createHash('sha1').update(key + GUID).digest('base64');
      var headers = ['HTTP/1.1 101 Switching Protocols', 'Upgrade: websocket', 'Connection: Upgrade', "Sec-WebSocket-Accept: ".concat(digest)];
      var ws = new WebSocket(null);
      var protocol = req.headers['sec-websocket-protocol'];

      if (protocol) {
        protocol = protocol.trim().split(/ *, */); //
        // Optionally call external protocol selection handler.
        //

        if (this.options.handleProtocols) {
          protocol = this.options.handleProtocols(protocol, req);
        } else {
          protocol = protocol[0];
        }

        if (protocol) {
          headers.push("Sec-WebSocket-Protocol: ".concat(protocol));
          ws.protocol = protocol;
        }
      }

      if (extensions[PerMessageDeflate.extensionName]) {
        var params = extensions[PerMessageDeflate.extensionName].params;
        var value = format(_defineProperty({}, PerMessageDeflate.extensionName, [params]));
        headers.push("Sec-WebSocket-Extensions: ".concat(value));
        ws._extensions = extensions;
      } //
      // Allow external modification/inspection of handshake headers.
      //


      this.emit('headers', headers, req);
      socket.write(headers.concat('\r\n').join('\r\n'));
      socket.removeListener('error', socketOnError);
      ws.setSocket(socket, head, this.options.maxPayload);

      if (this.clients) {
        this.clients.add(ws);
        ws.on('close', function () {
          return _this4.clients.delete(ws);
        });
      }

      cb(ws);
    }
  }]);

  return WebSocketServer;
}(EventEmitter);

module.exports = WebSocketServer;
/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when called
 * @private
 */

function addListeners(server, map) {
  for (var _i = 0, _Object$keys = Object.keys(map); _i < _Object$keys.length; _i++) {
    var event = _Object$keys[_i];
    server.on(event, map[event]);
  }

  return function removeListeners() {
    for (var _i2 = 0, _Object$keys2 = Object.keys(map); _i2 < _Object$keys2.length; _i2++) {
      var _event = _Object$keys2[_i2];
      server.removeListener(_event, map[_event]);
    }
  };
}
/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */


function emitClose(server) {
  server.emit('close');
}
/**
 * Handle premature socket errors.
 *
 * @private
 */


function socketOnError() {
  this.destroy();
}
/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */


function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || STATUS_CODES[code];
    headers = _objectSpread({
      Connection: 'close',
      'Content-type': 'text/html',
      'Content-Length': Buffer.byteLength(message)
    }, headers);
    socket.write("HTTP/1.1 ".concat(code, " ").concat(STATUS_CODES[code], "\r\n") + Object.keys(headers).map(function (h) {
      return "".concat(h, ": ").concat(headers[h]);
    }).join('\r\n') + '\r\n\r\n' + message);
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(53);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* Used to detect in JavaScript if apps have loaded styles or not. */\n:root {\n  --reach-menu-button: 1;\n}\n\n[data-reach-menu] {\n  display: block;\n  position: absolute;\n}\n\n[data-reach-menu-list],\n[data-reach-menu-items] {\n  display: block;\n  white-space: nowrap;\n  border: solid 1px hsla(0, 0%, 0%, 0.25);\n  background: hsla(0, 100%, 100%, 0.99);\n  outline: none;\n  padding: 1rem 0;\n  font-size: 85%;\n}\n\n[data-reach-menu-item] {\n  display: block;\n  user-select: none;\n}\n\n/*\n The dom structure of a MenuLink is reach-menu-item > a,\n so to target all items we can use `data-reach-menu-item`\n*/\n[data-reach-menu-item] {\n  /*\n    These are styled in one rule instead of something like a[data-reach-menu-item]\n    and li[data-reach-menu-item] so that apps don't have to fight specificity and\n    can style both li and a menu items with one rule,\n    ie: `[data-selected] { background: red; }`.\n    Otherwise they'd have to define two styles, one for a and one for li.\n  */\n\n  /* reach-menu-item */\n  cursor: pointer;\n\n  /* a */\n  display: block;\n  color: inherit;\n  font: inherit;\n  text-decoration: initial;\n\n  /* both */\n  padding: 5px 20px;\n}\n\n/* pseudo pseudo selector */\n[data-reach-menu-item][data-selected] {\n  background: hsl(211, 81%, 36%);\n  color: white;\n  outline: none;\n}\n", "",{"version":3,"sources":["styles.css"],"names":[],"mappings":"AAAA,oEAAoE;AACpE;EACE,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;;EAEE,cAAc;EACd,mBAAmB;EACnB,uCAAuC;EACvC,qCAAqC;EACrC,aAAa;EACb,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;;;CAGC;AACD;EACE;;;;;;GAMC;;EAED,oBAAoB;EACpB,eAAe;;EAEf,MAAM;EACN,cAAc;EACd,cAAc;EACd,aAAa;EACb,wBAAwB;;EAExB,SAAS;EACT,iBAAiB;AACnB;;AAEA,2BAA2B;AAC3B;EACE,8BAA8B;EAC9B,YAAY;EACZ,aAAa;AACf","file":"styles.css","sourcesContent":["/* Used to detect in JavaScript if apps have loaded styles or not. */\n:root {\n  --reach-menu-button: 1;\n}\n\n[data-reach-menu] {\n  display: block;\n  position: absolute;\n}\n\n[data-reach-menu-list],\n[data-reach-menu-items] {\n  display: block;\n  white-space: nowrap;\n  border: solid 1px hsla(0, 0%, 0%, 0.25);\n  background: hsla(0, 100%, 100%, 0.99);\n  outline: none;\n  padding: 1rem 0;\n  font-size: 85%;\n}\n\n[data-reach-menu-item] {\n  display: block;\n  user-select: none;\n}\n\n/*\n The dom structure of a MenuLink is reach-menu-item > a,\n so to target all items we can use `data-reach-menu-item`\n*/\n[data-reach-menu-item] {\n  /*\n    These are styled in one rule instead of something like a[data-reach-menu-item]\n    and li[data-reach-menu-item] so that apps don't have to fight specificity and\n    can style both li and a menu items with one rule,\n    ie: `[data-selected] { background: red; }`.\n    Otherwise they'd have to define two styles, one for a and one for li.\n  */\n\n  /* reach-menu-item */\n  cursor: pointer;\n\n  /* a */\n  display: block;\n  color: inherit;\n  font: inherit;\n  text-decoration: initial;\n\n  /* both */\n  padding: 5px 20px;\n}\n\n/* pseudo pseudo selector */\n[data-reach-menu-item][data-selected] {\n  background: hsl(211, 81%, 36%);\n  color: white;\n  outline: none;\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(55);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ":root {\n  --reach-tooltip: 1;\n}\n\n[data-reach-tooltip] {\n  z-index: 1;\n  pointer-events: none;\n  position: absolute;\n  padding: 0.25em 0.5em;\n  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);\n  white-space: nowrap;\n  font-size: 85%;\n  background: #f0f0f0;\n  color: #444;\n  border: solid 1px #ccc;\n}\n", "",{"version":3,"sources":["styles.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,oBAAoB;EACpB,kBAAkB;EAClB,qBAAqB;EACrB,6CAA6C;EAC7C,mBAAmB;EACnB,cAAc;EACd,mBAAmB;EACnB,WAAW;EACX,sBAAsB;AACxB","file":"styles.css","sourcesContent":[":root {\n  --reach-tooltip: 1;\n}\n\n[data-reach-tooltip] {\n  z-index: 1;\n  pointer-events: none;\n  position: absolute;\n  padding: 0.25em 0.5em;\n  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);\n  white-space: nowrap;\n  font-size: 85%;\n  background: #f0f0f0;\n  color: #444;\n  border: solid 1px #ccc;\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ButtonIcon___1ZKoI {\n  width: 1rem;\n  height: 1rem;\n  fill: currentColor;\n}\n", "",{"version":3,"sources":["ButtonIcon.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB","file":"ButtonIcon.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ButtonIcon {\n  width: 1rem;\n  height: 1rem;\n  fill: currentColor;\n}\n"]}]);
// Exports
exports.locals = {
	"ButtonIcon": "ButtonIcon___1ZKoI"
};
module.exports = exports;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function warning() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = __webpack_require__(59);

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Button___1DVwT {\n  border: none;\n  background: var(--color-button-background);\n  color: var(--color-button);\n  padding: 0;\n  border-radius: 0.25rem;\n  flex: 0 0 auto;\n}\n.ButtonContent___2Yt-B {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 0.25rem;\n  padding: 0.25rem;\n}\n\n.Button___1DVwT:hover {\n  color: var(--color-button-hover);\n}\n.Button___1DVwT:active {\n  color: var(--color-button-focus);\n  outline: none;\n}\n.Button___1DVwT:focus,\n.ButtonContent___2Yt-B:focus {\n  outline: none;\n}\n\n.Button___1DVwT:focus > .ButtonContent___2Yt-B {\n  background: var(--color-button-background-focus);\n}\n\n.Button___1DVwT:disabled,\n.Button___1DVwT:disabled:active {\n  background: var(--color-button-background);\n  color: var(--color-button-disabled);\n  cursor: default;\n}\n", "",{"version":3,"sources":["Button.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,YAAY;EACZ,0CAA0C;EAC1C,0BAA0B;EAC1B,UAAU;EACV,sBAAsB;EACtB,cAAc;AAChB;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;AAClB;;AAEA;EACE,gCAAgC;AAClC;AACA;EACE,gCAAgC;EAChC,aAAa;AACf;AACA;;EAEE,aAAa;AACf;;AAEA;EACE,gDAAgD;AAClD;;AAEA;;EAEE,0CAA0C;EAC1C,mCAAmC;EACnC,eAAe;AACjB","file":"Button.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Button {\n  border: none;\n  background: var(--color-button-background);\n  color: var(--color-button);\n  padding: 0;\n  border-radius: 0.25rem;\n  flex: 0 0 auto;\n}\n.ButtonContent {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 0.25rem;\n  padding: 0.25rem;\n}\n\n.Button:hover {\n  color: var(--color-button-hover);\n}\n.Button:active {\n  color: var(--color-button-focus);\n  outline: none;\n}\n.Button:focus,\n.ButtonContent:focus {\n  outline: none;\n}\n\n.Button:focus > .ButtonContent {\n  background: var(--color-button-background-focus);\n}\n\n.Button:disabled,\n.Button:disabled:active {\n  background: var(--color-button-background);\n  color: var(--color-button-disabled);\n  cursor: default;\n}\n"]}]);
// Exports
exports.locals = {
	"Button": "Button___1DVwT",
	"ButtonContent": "ButtonContent___2Yt-B"
};
module.exports = exports;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Tooltip___3B71s {\n  border: none;\n  border-radius: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  font-size: 12px;\n  background-color: var(--color-tooltip-background);\n  color: var(--color-tooltip-text);\n\n  /* Make sure this is above the DevTools, which are above the Overlay */\n  z-index: 10000002;\n}\n", "",{"version":3,"sources":["Tooltip.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,YAAY;EACZ,sBAAsB;EACtB,uBAAuB;EACvB,eAAe;EACf,iDAAiD;EACjD,gCAAgC;;EAEhC,sEAAsE;EACtE,iBAAiB;AACnB","file":"Tooltip.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Tooltip {\n  border: none;\n  border-radius: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  font-size: 12px;\n  background-color: var(--color-tooltip-background);\n  color: var(--color-tooltip-text);\n\n  /* Make sure this is above the DevTools, which are above the Overlay */\n  z-index: 10000002;\n}\n"]}]);
// Exports
exports.locals = {
	"Tooltip": "Tooltip___3B71s"
};
module.exports = exports;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ExpandCollapseToggle___2IKpu {\n  flex: 0 0 1rem;\n  width: 1rem;\n  height: 1rem;\n  padding: 0;\n  color: var(--color-expand-collapse-toggle);\n}\n", "",{"version":3,"sources":["ExpandCollapseToggle.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,UAAU;EACV,0CAA0C;AAC5C","file":"ExpandCollapseToggle.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ExpandCollapseToggle {\n  flex: 0 0 1rem;\n  width: 1rem;\n  height: 1rem;\n  padding: 0;\n  color: var(--color-expand-collapse-toggle);\n}\n"]}]);
// Exports
exports.locals = {
	"ExpandCollapseToggle": "ExpandCollapseToggle___2IKpu"
};
module.exports = exports;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Item___38LoN:not([hidden]) {\n  display: flex;\n}\n\n.Name___1kIAV {\n  color: var(--color-dim);\n  flex: 0 0 auto;\n  user-select: none;\n}\n.Name___1kIAV:after {\n  content: ': ';\n  color: var(--color-text);\n  margin-right: 0.5rem;\n}\n\n.Value___3qGHZ {\n  color: var(--color-attribute-value);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.None___23wbI {\n  color: var(--color-dimmer);\n  font-style: italic;\n}\n\n.ExpandCollapseToggleSpacer___1g1PK {\n  flex: 0 0 1rem;\n  width: 1rem;\n}\n\n.Empty___USy12 {\n  color: var(--color-dimmer);\n}\n", "",{"version":3,"sources":["KeyValue.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,aAAa;AACf;;AAEA;EACE,uBAAuB;EACvB,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,wBAAwB;EACxB,oBAAoB;AACtB;;AAEA;EACE,mCAAmC;EACnC,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,0BAA0B;EAC1B,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,WAAW;AACb;;AAEA;EACE,0BAA0B;AAC5B","file":"KeyValue.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Item:not([hidden]) {\n  display: flex;\n}\n\n.Name {\n  color: var(--color-dim);\n  flex: 0 0 auto;\n  user-select: none;\n}\n.Name:after {\n  content: ': ';\n  color: var(--color-text);\n  margin-right: 0.5rem;\n}\n\n.Value {\n  color: var(--color-attribute-value);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.None {\n  color: var(--color-dimmer);\n  font-style: italic;\n}\n\n.ExpandCollapseToggleSpacer {\n  flex: 0 0 1rem;\n  width: 1rem;\n}\n\n.Empty {\n  color: var(--color-dimmer);\n}\n"]}]);
// Exports
exports.locals = {
	"Item": "Item___38LoN",
	"Name": "Name___1kIAV",
	"Value": "Value___3qGHZ",
	"None": "None___23wbI",
	"ExpandCollapseToggleSpacer": "ExpandCollapseToggleSpacer___1g1PK",
	"Empty": "Empty___USy12"
};
module.exports = exports;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.InspectedElementTree___1QgZO {\n  padding: 0.25rem;\n  border-top: 1px solid var(--color-border);\n}\n.InspectedElementTree___1QgZO:first-of-type {\n  border-top: none;\n}\n\n.HeaderRow___1m1oG {\n  display: flex;\n  align-items: center;\n}\n\n.Header___iJrnw {\n  flex: 1 1;\n  font-family: var(--font-family-sans);\n}\n\n.Item___33K0f {\n  display: flex;\n}\n\n.Name___1RYp6 {\n  color: var(--color-attribute-name);\n  flex: 0 0 auto;\n}\n.Name___1RYp6:after {\n  content: ': ';\n  color: var(--color-text);\n  margin-right: 0.5rem;\n}\n\n.Value___3LESm {\n  color: var(--color-attribute-value);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.None___wien4 {\n  color: var(--color-dimmer);\n  font-style: italic;\n}\n\n.Empty___2RthR {\n  color: var(--color-dimmer);\n  font-style: italic;\n  padding-left: 0.75rem;\n}\n", "",{"version":3,"sources":["InspectedElementTree.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,gBAAgB;EAChB,yCAAyC;AAC3C;AACA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,oCAAoC;AACtC;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kCAAkC;EAClC,cAAc;AAChB;AACA;EACE,aAAa;EACb,wBAAwB;EACxB,oBAAoB;AACtB;;AAEA;EACE,mCAAmC;EACnC,gBAAgB;EAChB,uBAAuB;AACzB;;AAEA;EACE,0BAA0B;EAC1B,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,kBAAkB;EAClB,qBAAqB;AACvB","file":"InspectedElementTree.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.InspectedElementTree {\n  padding: 0.25rem;\n  border-top: 1px solid var(--color-border);\n}\n.InspectedElementTree:first-of-type {\n  border-top: none;\n}\n\n.HeaderRow {\n  display: flex;\n  align-items: center;\n}\n\n.Header {\n  flex: 1 1;\n  font-family: var(--font-family-sans);\n}\n\n.Item {\n  display: flex;\n}\n\n.Name {\n  color: var(--color-attribute-name);\n  flex: 0 0 auto;\n}\n.Name:after {\n  content: ': ';\n  color: var(--color-text);\n  margin-right: 0.5rem;\n}\n\n.Value {\n  color: var(--color-attribute-value);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.None {\n  color: var(--color-dimmer);\n  font-style: italic;\n}\n\n.Empty {\n  color: var(--color-dimmer);\n  font-style: italic;\n  padding-left: 0.75rem;\n}\n"]}]);
// Exports
exports.locals = {
	"InspectedElementTree": "InspectedElementTree___1QgZO",
	"HeaderRow": "HeaderRow___1m1oG",
	"Header": "Header___iJrnw",
	"Item": "Item___33K0f",
	"Name": "Name___1RYp6",
	"Value": "Value___3LESm",
	"None": "None___wien4",
	"Empty": "Empty___2RthR"
};
module.exports = exports;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ErrorBoundary___20UVU {\n  height: 100%;\n  width: 100%;\n  background-color: white;\n  color: red;\n  padding: 0.5rem;\n  overflow: auto;\n}\n\n.Header___jJp40 {\n  font-size: var(--font-size-sans-large);\n  font-weight: bold;\n}\n\n.Stack___KTi0J {\n  margin-top: 0.5rem;\n  white-space: pre-wrap;\n  font-family: var(--font-family-monospace);\n  font-size: var(--font-size-monospace-small);\n  background-color: hsl(0, 100%, 97%);\n  border: 1px solid hsl(0, 100%, 92%);\n  border-radius: 0.25rem;\n  padding: 0.5rem;\n}\n", "",{"version":3,"sources":["ErrorBoundary.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,UAAU;EACV,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,sCAAsC;EACtC,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,yCAAyC;EACzC,2CAA2C;EAC3C,mCAAmC;EACnC,mCAAmC;EACnC,sBAAsB;EACtB,eAAe;AACjB","file":"ErrorBoundary.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.ErrorBoundary {\n  height: 100%;\n  width: 100%;\n  background-color: white;\n  color: red;\n  padding: 0.5rem;\n  overflow: auto;\n}\n\n.Header {\n  font-size: var(--font-size-sans-large);\n  font-weight: bold;\n}\n\n.Stack {\n  margin-top: 0.5rem;\n  white-space: pre-wrap;\n  font-family: var(--font-family-monospace);\n  font-size: var(--font-size-monospace-small);\n  background-color: hsl(0, 100%, 97%);\n  border: 1px solid hsl(0, 100%, 92%);\n  border-radius: 0.25rem;\n  padding: 0.5rem;\n}\n"]}]);
// Exports
exports.locals = {
	"ErrorBoundary": "ErrorBoundary___20UVU",
	"Header": "Header___jJp40",
	"Stack": "Stack___KTi0J"
};
module.exports = exports;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Network___oqyzF {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-normal);\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.Toolbar___3PKdz {\n  padding: 0 0.25rem;\n  flex: 0;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--color-border);\n}\n\n.Spacer___1TY5J {\n  flex: 1;\n}\n\n.SectionTitle___3x2Ul {\n  color: #616161;\n  font-weight: bold;\n}\n\n.SectionContent___1tQqf {\n  margin-left: 20px;\n  white-space: pre-wrap;\n}\n\n.Requests___3NHEn {\n  border-right: 1px solid #d0d0d0;\n  color: #303942;\n  flex: 1;\n  overflow: scroll;\n}\n\n.Content___1wvC2 {\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n}\n\n.Request___3OKdI {\n  background: #ffffff;\n  cursor: pointer;\n  padding: 1px 4px;\n}\n.Request___3OKdI:hover {\n  background: #f1f6fd;\n}\n.Request___3OKdI:nth-child(2n) {\n  background: #f5f5f5;\n}\n.Request___3OKdI:nth-child(2n):hover {\n  background: #eef3fa;\n}\n.Request___3OKdI.SelectedRequest___3sfTq,\n.Request___3OKdI.SelectedRequest___3sfTq:hover {\n  background: #1a73e8;\n  color: white;\n}\n.Request___3OKdI::before {\n  display: inline-block;\n  width: 1em;\n  content: '';\n}\n.StatusActive___1kXP6::before {\n  color: #6a6;\n  content: '●';\n}\n.StatusUnsubscribed___10np9 {\n  color: #aaa;\n}\n.StatusError___ZwPgt {\n  color: #a66;\n}\n\n.RequestDetails___1s3cd {\n  flex: 3;\n  overflow: scroll;\n  padding: 3px;\n}\n", "",{"version":3,"sources":["Network.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,oBAAoB;EACpB,oCAAoC;EACpC,uCAAuC;EACvC,yCAAyC;EACzC,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,aAAa;EACb,mBAAmB;EACnB,4CAA4C;AAC9C;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,OAAO;EACP,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,qBAAqB;EACrB,UAAU;EACV,WAAW;AACb;AACA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,YAAY;AACd","file":"Network.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Network {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-normal);\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.Toolbar {\n  padding: 0 0.25rem;\n  flex: 0;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--color-border);\n}\n\n.Spacer {\n  flex: 1;\n}\n\n.SectionTitle {\n  color: #616161;\n  font-weight: bold;\n}\n\n.SectionContent {\n  margin-left: 20px;\n  white-space: pre-wrap;\n}\n\n.Requests {\n  border-right: 1px solid #d0d0d0;\n  color: #303942;\n  flex: 1;\n  overflow: scroll;\n}\n\n.Content {\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n}\n\n.Request {\n  background: #ffffff;\n  cursor: pointer;\n  padding: 1px 4px;\n}\n.Request:hover {\n  background: #f1f6fd;\n}\n.Request:nth-child(2n) {\n  background: #f5f5f5;\n}\n.Request:nth-child(2n):hover {\n  background: #eef3fa;\n}\n.Request.SelectedRequest,\n.Request.SelectedRequest:hover {\n  background: #1a73e8;\n  color: white;\n}\n.Request::before {\n  display: inline-block;\n  width: 1em;\n  content: '';\n}\n.StatusActive::before {\n  color: #6a6;\n  content: '●';\n}\n.StatusUnsubscribed {\n  color: #aaa;\n}\n.StatusError {\n  color: #a66;\n}\n\n.RequestDetails {\n  flex: 3;\n  overflow: scroll;\n  padding: 3px;\n}\n"]}]);
// Exports
exports.locals = {
	"Network": "Network___oqyzF",
	"Toolbar": "Toolbar___3PKdz",
	"Spacer": "Spacer___1TY5J",
	"SectionTitle": "SectionTitle___3x2Ul",
	"SectionContent": "SectionContent___1tQqf",
	"Requests": "Requests___3NHEn",
	"Content": "Content___1wvC2",
	"Request": "Request___3OKdI",
	"SelectedRequest": "SelectedRequest___3sfTq",
	"StatusActive": "StatusActive___1kXP6",
	"StatusUnsubscribed": "StatusUnsubscribed___10np9",
	"StatusError": "StatusError___ZwPgt",
	"RequestDetails": "RequestDetails___1s3cd"
};
module.exports = exports;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Icon___110Bu {\n  width: 1rem;\n  height: 1rem;\n  fill: currentColor;\n}\n", "",{"version":3,"sources":["Icon.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB","file":"Icon.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Icon {\n  width: 1rem;\n  height: 1rem;\n  fill: currentColor;\n}\n"]}]);
// Exports
exports.locals = {
	"Icon": "Icon___110Bu"
};
module.exports = exports;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".SearchInput___4fgwJ {\n  flex: 1 1;\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 1rem;\n}\n\n.Input___2p-9Q {\n  flex: 1 1 100px;\n  width: 100px;\n  font-size: var(--font-size-sans-large);\n  outline: none;\n  border: none;\n  background-color: var(--color-background);\n  color: var(--color-text);\n  padding-left: 1.5rem;\n  margin-left: -1rem;\n}\n\n.InputIcon___1qu8r {\n  pointer-events: none;\n  z-index: 2;\n  color: var(--color-dimmer);\n}\n", "",{"version":3,"sources":["SearchInput.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,sCAAsC;EACtC,aAAa;EACb,YAAY;EACZ,yCAAyC;EACzC,wBAAwB;EACxB,oBAAoB;EACpB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,UAAU;EACV,0BAA0B;AAC5B","file":"SearchInput.css","sourcesContent":[".SearchInput {\n  flex: 1 1;\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 1rem;\n}\n\n.Input {\n  flex: 1 1 100px;\n  width: 100px;\n  font-size: var(--font-size-sans-large);\n  outline: none;\n  border: none;\n  background-color: var(--color-background);\n  color: var(--color-text);\n  padding-left: 1.5rem;\n  margin-left: -1rem;\n}\n\n.InputIcon {\n  pointer-events: none;\n  z-index: 2;\n  color: var(--color-dimmer);\n}\n"]}]);
// Exports
exports.locals = {
	"SearchInput": "SearchInput___4fgwJ",
	"Input": "Input___2p-9Q",
	"InputIcon": "InputIcon___1qu8r"
};
module.exports = exports;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.StoreInspector___3sE54 {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-normal);\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.Toolbar___2OqSc {\n  padding: 0 0.25rem;\n  flex: 0;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--color-border);\n}\n\n.Spacer___30asC {\n  flex: 1;\n}\n\n.SectionTitle___2YJfu {\n  color: #616161;\n  font-weight: bold;\n}\n\n.SectionContent___1H6_9 {\n  margin-left: 20px;\n  white-space: pre-wrap;\n}\n\n.Records___QWzzK {\n  border-right: 1px solid #d0d0d0;\n  color: #303942;\n  flex: 1;\n  overflow: scroll;\n}\n\n.Content___3rXxf {\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n}\n\n.Record___34s8L {\n  background: #ffffff;\n  cursor: pointer;\n  padding: 1px 4px;\n}\n.Record___34s8L:hover {\n  background: #f1f6fd;\n}\n.Record___34s8L:nth-child(2n) {\n  background: #f5f5f5;\n}\n.Record___34s8L:nth-child(2n):hover {\n  background: #eef3fa;\n}\n.Record___34s8L.SelectedRequest___3qlYw,\n.Record___34s8L.SelectedRequest___3qlYw:hover {\n  background: #1a73e8;\n  color: white;\n}\n.Record___34s8L::before {\n  display: inline-block;\n  width: 1em;\n  content: '';\n}\n\n.RecordDetails___nNOHt {\n  flex: 3;\n  overflow: scroll;\n  padding: 3px;\n}\n", "",{"version":3,"sources":["StoreInspector.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,oBAAoB;EACpB,oCAAoC;EACpC,uCAAuC;EACvC,yCAAyC;EACzC,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,aAAa;EACb,mBAAmB;EACnB,4CAA4C;AAC9C;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,+BAA+B;EAC/B,cAAc;EACd,OAAO;EACP,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,qBAAqB;EACrB,UAAU;EACV,WAAW;AACb;;AAEA;EACE,OAAO;EACP,gBAAgB;EAChB,YAAY;AACd","file":"StoreInspector.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.StoreInspector {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-normal);\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.Toolbar {\n  padding: 0 0.25rem;\n  flex: 0;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--color-border);\n}\n\n.Spacer {\n  flex: 1;\n}\n\n.SectionTitle {\n  color: #616161;\n  font-weight: bold;\n}\n\n.SectionContent {\n  margin-left: 20px;\n  white-space: pre-wrap;\n}\n\n.Records {\n  border-right: 1px solid #d0d0d0;\n  color: #303942;\n  flex: 1;\n  overflow: scroll;\n}\n\n.Content {\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n}\n\n.Record {\n  background: #ffffff;\n  cursor: pointer;\n  padding: 1px 4px;\n}\n.Record:hover {\n  background: #f1f6fd;\n}\n.Record:nth-child(2n) {\n  background: #f5f5f5;\n}\n.Record:nth-child(2n):hover {\n  background: #eef3fa;\n}\n.Record.SelectedRequest,\n.Record.SelectedRequest:hover {\n  background: #1a73e8;\n  color: white;\n}\n.Record::before {\n  display: inline-block;\n  width: 1em;\n  content: '';\n}\n\n.RecordDetails {\n  flex: 3;\n  overflow: scroll;\n  padding: 3px;\n}\n"]}]);
// Exports
exports.locals = {
	"StoreInspector": "StoreInspector___3sE54",
	"Toolbar": "Toolbar___2OqSc",
	"Spacer": "Spacer___30asC",
	"SectionTitle": "SectionTitle___2YJfu",
	"SectionContent": "SectionContent___1H6_9",
	"Records": "Records___QWzzK",
	"Content": "Content___3rXxf",
	"Record": "Record___34s8L",
	"SelectedRequest": "SelectedRequest___3qlYw",
	"RecordDetails": "RecordDetails___nNOHt"
};
module.exports = exports;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Tab___2Kzpx,\n.TabCurrent___3SX16,\n.TabDisabled___SDNMj {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  user-select: none;\n  color: var(--color-text);\n\n  /* Electron drag area */\n  -webkit-app-region: no-drag;\n}\n.Tab___2Kzpx:hover,\n.TabCurrent___3SX16:hover {\n  background-color: var(--color-background-hover);\n}\n.Tab___2Kzpx:focus-within,\n.TabCurrent___3SX16:focus-within {\n  background-color: var(--color-background-hover);\n}\n\n.TabCurrent___3SX16 {\n  border-bottom: 3px solid var(--color-tab-selected-border);\n}\n\n.TabDisabled___SDNMj {\n  color: var(--color-dim);\n  cursor: default;\n}\n\n.TabSizeLarge___25wbL {\n  font-size: var(--font-size-sans-large);\n  padding: 0.5rem 1rem;\n}\n.TabSizeSmall___m67JS {\n  font-size: var(--font-size-sans-normal);\n  padding: 0.25rem 0.5rem;\n}\n\n.Input___p8bQl {\n  width: 0;\n  margin: 0;\n  opacity: 0;\n}\n\n.IconSizeLarge___2SfgS,\n.IconSizeSmall___ALL5j {\n  margin-right: 0.5rem;\n  color: var(--color-button-active);\n}\n\n.IconDisabled___AyqEP {\n  color: var(--color-dim);\n}\n\n.IconSizeLarge___2SfgS {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.IconSizeSmall___ALL5j {\n  width: 1rem;\n  height: 1rem;\n}\n\n.TabLabelLarge___1FFdo,\n.TabLabelSmall___3odxY {\n}\n\n@media screen and (max-width: 900px) {\n  .TabLabelSmall___3odxY {\n    display: none;\n  }\n\n  .IconSizeSmall___ALL5j {\n    margin-right: 0;\n  }\n}\n\n@media screen and (max-width: 525px) {\n  .IconSizeLarge___2SfgS {\n    margin-right: 0;\n  }\n\n  .TabLabelLarge___1FFdo {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["TabBar.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;;;EAGE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,iCAAiC;EACjC,oCAAoC;EACpC,iBAAiB;EACjB,wBAAwB;;EAExB,uBAAuB;EACvB,2BAA2B;AAC7B;AACA;;EAEE,+CAA+C;AACjD;AACA;;EAEE,+CAA+C;AACjD;;AAEA;EACE,yDAAyD;AAC3D;;AAEA;EACE,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,sCAAsC;EACtC,oBAAoB;AACtB;AACA;EACE,uCAAuC;EACvC,uBAAuB;AACzB;;AAEA;EACE,QAAQ;EACR,SAAS;EACT,UAAU;AACZ;;AAEA;;EAEE,oBAAoB;EACpB,iCAAiC;AACnC;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;;AAEA;;AAEA;EACE;IACE,aAAa;EACf;;EAEA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;;EAEA;IACE,aAAa;EACf;AACF","file":"TabBar.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Tab,\n.TabCurrent,\n.TabDisabled {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  user-select: none;\n  color: var(--color-text);\n\n  /* Electron drag area */\n  -webkit-app-region: no-drag;\n}\n.Tab:hover,\n.TabCurrent:hover {\n  background-color: var(--color-background-hover);\n}\n.Tab:focus-within,\n.TabCurrent:focus-within {\n  background-color: var(--color-background-hover);\n}\n\n.TabCurrent {\n  border-bottom: 3px solid var(--color-tab-selected-border);\n}\n\n.TabDisabled {\n  color: var(--color-dim);\n  cursor: default;\n}\n\n.TabSizeLarge {\n  font-size: var(--font-size-sans-large);\n  padding: 0.5rem 1rem;\n}\n.TabSizeSmall {\n  font-size: var(--font-size-sans-normal);\n  padding: 0.25rem 0.5rem;\n}\n\n.Input {\n  width: 0;\n  margin: 0;\n  opacity: 0;\n}\n\n.IconSizeLarge,\n.IconSizeSmall {\n  margin-right: 0.5rem;\n  color: var(--color-button-active);\n}\n\n.IconDisabled {\n  color: var(--color-dim);\n}\n\n.IconSizeLarge {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.IconSizeSmall {\n  width: 1rem;\n  height: 1rem;\n}\n\n.TabLabelLarge,\n.TabLabelSmall {\n}\n\n@media screen and (max-width: 900px) {\n  .TabLabelSmall {\n    display: none;\n  }\n\n  .IconSizeSmall {\n    margin-right: 0;\n  }\n}\n\n@media screen and (max-width: 525px) {\n  .IconSizeLarge {\n    margin-right: 0;\n  }\n\n  .TabLabelLarge {\n    display: none;\n  }\n}\n"]}]);
// Exports
exports.locals = {
	"Tab": "Tab___2Kzpx",
	"TabCurrent": "TabCurrent___3SX16",
	"TabDisabled": "TabDisabled___SDNMj",
	"TabSizeLarge": "TabSizeLarge___25wbL",
	"TabSizeSmall": "TabSizeSmall___m67JS",
	"Input": "Input___p8bQl",
	"IconSizeLarge": "IconSizeLarge___2SfgS",
	"IconSizeSmall": "IconSizeSmall___ALL5j",
	"IconDisabled": "IconDisabled___AyqEP",
	"TabLabelLarge": "TabLabelLarge___1FFdo",
	"TabLabelSmall": "TabLabelSmall___3odxY"
};
module.exports = exports;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Background___15gt- {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 1rem;\n  background-color: var(--color-modal-background);\n  overflow: auto;\n}\n\n.Dialog___2YnNl {\n  position: relative;\n  z-index: 3;\n  width: 25rem;\n  min-width: 20rem;\n  max-width: 100%;\n  display: inline-block;\n  background-color: var(--color-background);\n  padding: 0.5rem;\n  border: 1px solid var(--color-border);\n  border-radius: 0.25rem;\n}\n\n.Title___2hj_Y {\n  font-size: var(--font-size-sans-large);\n  margin-bottom: 0.5rem;\n}\n\n.Buttons___1vehg {\n  text-align: right;\n  margin-top: 0.5rem;\n}\n", "",{"version":3,"sources":["ModalDialog.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,uBAAuB;EACvB,aAAa;EACb,+CAA+C;EAC/C,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,gBAAgB;EAChB,eAAe;EACf,qBAAqB;EACrB,yCAAyC;EACzC,eAAe;EACf,qCAAqC;EACrC,sBAAsB;AACxB;;AAEA;EACE,sCAAsC;EACtC,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB","file":"ModalDialog.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.Background {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 1rem;\n  background-color: var(--color-modal-background);\n  overflow: auto;\n}\n\n.Dialog {\n  position: relative;\n  z-index: 3;\n  width: 25rem;\n  min-width: 20rem;\n  max-width: 100%;\n  display: inline-block;\n  background-color: var(--color-background);\n  padding: 0.5rem;\n  border: 1px solid var(--color-border);\n  border-radius: 0.25rem;\n}\n\n.Title {\n  font-size: var(--font-size-sans-large);\n  margin-bottom: 0.5rem;\n}\n\n.Buttons {\n  text-align: right;\n  margin-top: 0.5rem;\n}\n"]}]);
// Exports
exports.locals = {
	"Background": "Background___15gt-",
	"Dialog": "Dialog___2YnNl",
	"Title": "Title___2hj_Y",
	"Buttons": "Buttons___1vehg"
};
module.exports = exports;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.RelayLogo___1Orh9 {\n  width: 1.75rem;\n  height: 1.75rem;\n  margin: 0 0.75rem 0 0.25rem;\n  color: var(--color-button-active);\n}\n", "",{"version":3,"sources":["RelayLogo.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,cAAc;EACd,eAAe;EACf,2BAA2B;EAC3B,iCAAiC;AACnC","file":"RelayLogo.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.RelayLogo {\n  width: 1.75rem;\n  height: 1.75rem;\n  margin: 0 0.75rem 0 0.25rem;\n  color: var(--color-button-active);\n}\n"]}]);
// Exports
exports.locals = {
	"RelayLogo": "RelayLogo___1Orh9"
};
module.exports = exports;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.DevTools___1cWA5 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.TabBar___kT_Wo {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  padding: 0 0.5rem;\n  background-color: var(--color-background);\n  border-top: 1px solid var(--color-border);\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-large);\n  user-select: none;\n\n  /* Electron drag area */\n  -webkit-app-region: drag;\n}\n\n.Spacer___1jzko {\n  flex: 1;\n}\n\n.TabContent___aOE7b {\n  flex: 1 1 100%;\n  overflow: auto;\n}\n\n.DevToolsVersion___1Q1Qn {\n  font-size: var(--font-size-sans-normal);\n  margin-right: 0.5rem;\n}\n\n.DevToolsVersion___1Q1Qn:before {\n  font-size: var(--font-size-sans-large);\n  content: 'DevTools ';\n}\n\n@media screen and (max-width: 400px) {\n  .DevToolsVersion___1Q1Qn:before {\n    content: '';\n  }\n}\n\n@media screen and (max-width: 300px) {\n  .DevToolsVersion___1Q1Qn {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["DevTools.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,yCAAyC;EACzC,wBAAwB;AAC1B;;AAEA;EACE,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,yCAAyC;EACzC,yCAAyC;EACzC,oCAAoC;EACpC,sCAAsC;EACtC,iBAAiB;;EAEjB,uBAAuB;EACvB,wBAAwB;AAC1B;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,uCAAuC;EACvC,oBAAoB;AACtB;;AAEA;EACE,sCAAsC;EACtC,oBAAoB;AACtB;;AAEA;EACE;IACE,WAAW;EACb;AACF;;AAEA;EACE;IACE,aAAa;EACf;AACF","file":"DevTools.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n.DevTools {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-background);\n  color: var(--color-text);\n}\n\n.TabBar {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  padding: 0 0.5rem;\n  background-color: var(--color-background);\n  border-top: 1px solid var(--color-border);\n  font-family: var(--font-family-sans);\n  font-size: var(--font-size-sans-large);\n  user-select: none;\n\n  /* Electron drag area */\n  -webkit-app-region: drag;\n}\n\n.Spacer {\n  flex: 1;\n}\n\n.TabContent {\n  flex: 1 1 100%;\n  overflow: auto;\n}\n\n.DevToolsVersion {\n  font-size: var(--font-size-sans-normal);\n  margin-right: 0.5rem;\n}\n\n.DevToolsVersion:before {\n  font-size: var(--font-size-sans-large);\n  content: 'DevTools ';\n}\n\n@media screen and (max-width: 400px) {\n  .DevToolsVersion:before {\n    content: '';\n  }\n}\n\n@media screen and (max-width: 300px) {\n  .DevToolsVersion {\n    display: none;\n  }\n}\n"]}]);
// Exports
exports.locals = {
	"DevTools": "DevTools___1cWA5",
	"TabBar": "TabBar___kT_Wo",
	"Spacer": "Spacer___1jzko",
	"TabContent": "TabContent___aOE7b",
	"DevToolsVersion": "DevToolsVersion___1Q1Qn"
};
module.exports = exports;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(75);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n:root {\n  /**\n   * IMPORTANT: When new theme variables are added below– also add them to SettingsContext updateThemeVariables()\n   */\n\n  /* Light theme */\n  --light-color-attribute-name: #ef6632;\n  --light-color-attribute-name-inverted: rgba(255, 255, 255, 0.7);\n  --light-color-attribute-value: #1a1aa6;\n  --light-color-attribute-value-inverted: #ffffff;\n  --light-color-attribute-editable-value: #1a1aa6;\n  --light-color-background: #ffffff;\n  --light-color-background-hover: rgba(0, 136, 250, 0.1);\n  --light-color-background-inactive: #e5e5e5;\n  --light-color-background-invalid: #fff0f0;\n  --light-color-background-selected: #0088fa;\n  --light-color-button-background: #ffffff;\n  --light-color-button-background-focus: #ededed;\n  --light-color-button: #5f6673;\n  --light-color-button-disabled: #cfd1d5;\n  --light-color-button-active: #0088fa;\n  --light-color-button-focus: #23272f;\n  --light-color-button-hover: #23272f;\n  --light-color-border: #eeeeee;\n  --light-color-commit-did-not-render-fill: #cfd1d5;\n  --light-color-commit-did-not-render-fill-text: #000000;\n  --light-color-commit-did-not-render-pattern: #cfd1d5;\n  --light-color-commit-did-not-render-pattern-text: #333333;\n  --light-color-commit-gradient-0: #37afa9;\n  --light-color-commit-gradient-1: #63b19e;\n  --light-color-commit-gradient-2: #80b393;\n  --light-color-commit-gradient-3: #97b488;\n  --light-color-commit-gradient-4: #abb67d;\n  --light-color-commit-gradient-5: #beb771;\n  --light-color-commit-gradient-6: #cfb965;\n  --light-color-commit-gradient-7: #dfba57;\n  --light-color-commit-gradient-8: #efbb49;\n  --light-color-commit-gradient-9: #febc38;\n  --light-color-commit-gradient-text: #000000;\n  --light-color-component-name: #6a51b2;\n  --light-color-component-name-inverted: #ffffff;\n  --light-color-component-badge-background: rgba(0, 0, 0, 0.1);\n  --light-color-component-badge-background-inverted: rgba(255, 255, 255, 0.25);\n  --light-color-component-badge-count: #777d88;\n  --light-color-component-badge-count-inverted: rgba(255, 255, 255, 0.7);\n  --light-color-dim: #777d88;\n  --light-color-dimmer: #cfd1d5;\n  --light-color-dimmest: #eff0f1;\n  --light-color-expand-collapse-toggle: #777d88;\n  --light-color-modal-background: rgba(255, 255, 255, 0.75);\n  --light-color-record-active: #fc3a4b;\n  --light-color-record-hover: #3578e5;\n  --light-color-record-inactive: #0088fa;\n  --light-color-scroll-thumb: #c2c2c2;\n  --light-color-scroll-track: #fafafa;\n  --light-color-search-match: yellow;\n  --light-color-search-match-current: #f7923b;\n  --light-color-selected-tree-highlight-active: rgba(0, 136, 250, 0.1);\n  --light-color-selected-tree-highlight-inactive: rgba(0, 0, 0, 0.05);\n  --light-color-tab-selected-border: #0088fa;\n  --light-color-text: #000000;\n  --light-color-text-invalid: #ff0000;\n  --light-color-text-selected: #ffffff;\n  --light-color-toggle-background-invalid: #fc3a4b;\n  --light-color-toggle-background-on: #0088fa;\n  --light-color-toggle-background-off: #cfd1d5;\n  --light-color-toggle-text: #ffffff;\n  --light-color-tooltip-background: rgba(0, 0, 0, 0.9);\n  --light-color-tooltip-text: #ffffff;\n\n  /* Dark theme */\n  --dark-color-attribute-name: #9d87d2;\n  --dark-color-attribute-name-inverted: #282828;\n  --dark-color-attribute-value: #cedae0;\n  --dark-color-attribute-value-inverted: #ffffff;\n  --dark-color-attribute-editable-value: yellow;\n  --dark-color-background: #282c34;\n  --dark-color-background-hover: rgba(255, 255, 255, 0.1);\n  --dark-color-background-inactive: #3d424a;\n  --dark-color-background-invalid: #5c0000;\n  --dark-color-background-selected: #178fb9;\n  --dark-color-button-background: #282c34;\n  --dark-color-button-background-focus: #3d424a;\n  --dark-color-button: #afb3b9;\n  --dark-color-button-active: #61dafb;\n  --dark-color-button-disabled: #4f5766;\n  --dark-color-button-focus: #a2e9fc;\n  --dark-color-button-hover: #ededed;\n  --dark-color-border: #3d424a;\n  --dark-color-commit-did-not-render-fill: #777d88;\n  --dark-color-commit-did-not-render-fill-text: #000000;\n  --dark-color-commit-did-not-render-pattern: #666c77;\n  --dark-color-commit-did-not-render-pattern-text: #ffffff;\n  --dark-color-commit-gradient-0: #37afa9;\n  --dark-color-commit-gradient-1: #63b19e;\n  --dark-color-commit-gradient-2: #80b393;\n  --dark-color-commit-gradient-3: #97b488;\n  --dark-color-commit-gradient-4: #abb67d;\n  --dark-color-commit-gradient-5: #beb771;\n  --dark-color-commit-gradient-6: #cfb965;\n  --dark-color-commit-gradient-7: #dfba57;\n  --dark-color-commit-gradient-8: #efbb49;\n  --dark-color-commit-gradient-9: #febc38;\n  --dark-color-commit-gradient-text: #000000;\n  --dark-color-component-name: #61dafb;\n  --dark-color-component-name-inverted: #282828;\n  --dark-color-component-badge-background: rgba(255, 255, 255, 0.25);\n  --dark-color-component-badge-background-inverted: rgba(0, 0, 0, 0.25);\n  --dark-color-component-badge-count: #8f949d;\n  --dark-color-component-badge-count-inverted: rgba(255, 255, 255, 0.7);\n  --dark-color-dim: #8f949d;\n  --dark-color-dimmer: #777d88;\n  --dark-color-dimmest: #4f5766;\n  --dark-color-expand-collapse-toggle: #8f949d;\n  --dark-color-modal-background: rgba(0, 0, 0, 0.75);\n  --dark-color-record-active: #fc3a4b;\n  --dark-color-record-hover: #a2e9fc;\n  --dark-color-record-inactive: #61dafb;\n  --dark-color-scroll-thumb: #afb3b9;\n  --dark-color-scroll-track: #313640;\n  --dark-color-search-match: yellow;\n  --dark-color-search-match-current: #f7923b;\n  --dark-color-selected-tree-highlight-active: rgba(23, 143, 185, 0.15);\n  --dark-color-selected-tree-highlight-inactive: rgba(255, 255, 255, 0.05);\n  --dark-color-tab-selected-border: #178fb9;\n  --dark-color-text: #ffffff;\n  --dark-color-text-invalid: #ff8080;\n  --dark-color-text-selected: #ffffff;\n  --dark-color-toggle-background-invalid: #fc3a4b;\n  --dark-color-toggle-background-on: #178fb9;\n  --dark-color-toggle-background-off: #777d88;\n  --dark-color-toggle-text: #ffffff;\n  --dark-color-tooltip-background: rgba(255, 255, 255, 0.9);\n  --dark-color-tooltip-text: #000000;\n\n  /* Font smoothing */\n  --light-font-smoothing: auto;\n  --dark-font-smoothing: antialiased;\n  --font-smoothing: auto;\n\n  /* Compact density */\n  --compact-font-size-monospace-small: 9px;\n  --compact-font-size-monospace-normal: 11px;\n  --compact-font-size-monospace-large: 15px;\n  --compact-font-size-sans-small: 10px;\n  --compact-font-size-sans-normal: 12px;\n  --compact-font-size-sans-large: 14px;\n  --compact-line-height-data: 18px;\n  --compact-root-font-size: 16px;\n\n  /* Comfortable density */\n  --comfortable-font-size-monospace-small: 10px;\n  --comfortable-font-size-monospace-normal: 13px;\n  --comfortable-font-size-monospace-large: 17px;\n  --comfortable-font-size-sans-small: 12px;\n  --comfortable-font-size-sans-normal: 14px;\n  --comfortable-font-size-sans-large: 16px;\n  --comfortable-line-height-data: 22px;\n  --comfortable-root-font-size: 20px;\n\n  /* GitHub.com system fonts */\n  --font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,\n    Courier, monospace;\n  --font-family-sans: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,\n    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n\n  /* Constant values shared between JS and CSS */\n  --interaction-commit-size: 10px;\n  --interaction-label-width: 200px;\n}\n\n* {\n  box-sizing: border-box;\n\n  -webkit-font-smoothing: var(--font-smoothing);\n}\n", "",{"version":3,"sources":["root.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE;;IAEE;;EAEF,gBAAgB;EAChB,qCAAqC;EACrC,+DAA+D;EAC/D,sCAAsC;EACtC,+CAA+C;EAC/C,+CAA+C;EAC/C,iCAAiC;EACjC,sDAAsD;EACtD,0CAA0C;EAC1C,yCAAyC;EACzC,0CAA0C;EAC1C,wCAAwC;EACxC,8CAA8C;EAC9C,6BAA6B;EAC7B,sCAAsC;EACtC,oCAAoC;EACpC,mCAAmC;EACnC,mCAAmC;EACnC,6BAA6B;EAC7B,iDAAiD;EACjD,sDAAsD;EACtD,oDAAoD;EACpD,yDAAyD;EACzD,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,wCAAwC;EACxC,2CAA2C;EAC3C,qCAAqC;EACrC,8CAA8C;EAC9C,4DAA4D;EAC5D,4EAA4E;EAC5E,4CAA4C;EAC5C,sEAAsE;EACtE,0BAA0B;EAC1B,6BAA6B;EAC7B,8BAA8B;EAC9B,6CAA6C;EAC7C,yDAAyD;EACzD,oCAAoC;EACpC,mCAAmC;EACnC,sCAAsC;EACtC,mCAAmC;EACnC,mCAAmC;EACnC,kCAAkC;EAClC,2CAA2C;EAC3C,oEAAoE;EACpE,mEAAmE;EACnE,0CAA0C;EAC1C,2BAA2B;EAC3B,mCAAmC;EACnC,oCAAoC;EACpC,gDAAgD;EAChD,2CAA2C;EAC3C,4CAA4C;EAC5C,kCAAkC;EAClC,oDAAoD;EACpD,mCAAmC;;EAEnC,eAAe;EACf,oCAAoC;EACpC,6CAA6C;EAC7C,qCAAqC;EACrC,8CAA8C;EAC9C,6CAA6C;EAC7C,gCAAgC;EAChC,uDAAuD;EACvD,yCAAyC;EACzC,wCAAwC;EACxC,yCAAyC;EACzC,uCAAuC;EACvC,6CAA6C;EAC7C,4BAA4B;EAC5B,mCAAmC;EACnC,qCAAqC;EACrC,kCAAkC;EAClC,kCAAkC;EAClC,4BAA4B;EAC5B,gDAAgD;EAChD,qDAAqD;EACrD,mDAAmD;EACnD,wDAAwD;EACxD,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,uCAAuC;EACvC,0CAA0C;EAC1C,oCAAoC;EACpC,6CAA6C;EAC7C,kEAAkE;EAClE,qEAAqE;EACrE,2CAA2C;EAC3C,qEAAqE;EACrE,yBAAyB;EACzB,4BAA4B;EAC5B,6BAA6B;EAC7B,4CAA4C;EAC5C,kDAAkD;EAClD,mCAAmC;EACnC,kCAAkC;EAClC,qCAAqC;EACrC,kCAAkC;EAClC,kCAAkC;EAClC,iCAAiC;EACjC,0CAA0C;EAC1C,qEAAqE;EACrE,wEAAwE;EACxE,yCAAyC;EACzC,0BAA0B;EAC1B,kCAAkC;EAClC,mCAAmC;EACnC,+CAA+C;EAC/C,0CAA0C;EAC1C,2CAA2C;EAC3C,iCAAiC;EACjC,yDAAyD;EACzD,kCAAkC;;EAElC,mBAAmB;EACnB,4BAA4B;EAC5B,kCAAkC;EAClC,sBAAsB;;EAEtB,oBAAoB;EACpB,wCAAwC;EACxC,0CAA0C;EAC1C,yCAAyC;EACzC,oCAAoC;EACpC,qCAAqC;EACrC,oCAAoC;EACpC,gCAAgC;EAChC,8BAA8B;;EAE9B,wBAAwB;EACxB,6CAA6C;EAC7C,8CAA8C;EAC9C,6CAA6C;EAC7C,wCAAwC;EACxC,yCAAyC;EACzC,wCAAwC;EACxC,oCAAoC;EACpC,kCAAkC;;EAElC,4BAA4B;EAC5B;sBACoB;EACpB;yEACuE;;EAEvE,8CAA8C;EAC9C,+BAA+B;EAC/B,gCAAgC;AAClC;;AAEA;EACE,sBAAsB;;EAEtB,6CAA6C;AAC/C","file":"root.css","sourcesContent":["/**\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n:root {\n  /**\n   * IMPORTANT: When new theme variables are added below– also add them to SettingsContext updateThemeVariables()\n   */\n\n  /* Light theme */\n  --light-color-attribute-name: #ef6632;\n  --light-color-attribute-name-inverted: rgba(255, 255, 255, 0.7);\n  --light-color-attribute-value: #1a1aa6;\n  --light-color-attribute-value-inverted: #ffffff;\n  --light-color-attribute-editable-value: #1a1aa6;\n  --light-color-background: #ffffff;\n  --light-color-background-hover: rgba(0, 136, 250, 0.1);\n  --light-color-background-inactive: #e5e5e5;\n  --light-color-background-invalid: #fff0f0;\n  --light-color-background-selected: #0088fa;\n  --light-color-button-background: #ffffff;\n  --light-color-button-background-focus: #ededed;\n  --light-color-button: #5f6673;\n  --light-color-button-disabled: #cfd1d5;\n  --light-color-button-active: #0088fa;\n  --light-color-button-focus: #23272f;\n  --light-color-button-hover: #23272f;\n  --light-color-border: #eeeeee;\n  --light-color-commit-did-not-render-fill: #cfd1d5;\n  --light-color-commit-did-not-render-fill-text: #000000;\n  --light-color-commit-did-not-render-pattern: #cfd1d5;\n  --light-color-commit-did-not-render-pattern-text: #333333;\n  --light-color-commit-gradient-0: #37afa9;\n  --light-color-commit-gradient-1: #63b19e;\n  --light-color-commit-gradient-2: #80b393;\n  --light-color-commit-gradient-3: #97b488;\n  --light-color-commit-gradient-4: #abb67d;\n  --light-color-commit-gradient-5: #beb771;\n  --light-color-commit-gradient-6: #cfb965;\n  --light-color-commit-gradient-7: #dfba57;\n  --light-color-commit-gradient-8: #efbb49;\n  --light-color-commit-gradient-9: #febc38;\n  --light-color-commit-gradient-text: #000000;\n  --light-color-component-name: #6a51b2;\n  --light-color-component-name-inverted: #ffffff;\n  --light-color-component-badge-background: rgba(0, 0, 0, 0.1);\n  --light-color-component-badge-background-inverted: rgba(255, 255, 255, 0.25);\n  --light-color-component-badge-count: #777d88;\n  --light-color-component-badge-count-inverted: rgba(255, 255, 255, 0.7);\n  --light-color-dim: #777d88;\n  --light-color-dimmer: #cfd1d5;\n  --light-color-dimmest: #eff0f1;\n  --light-color-expand-collapse-toggle: #777d88;\n  --light-color-modal-background: rgba(255, 255, 255, 0.75);\n  --light-color-record-active: #fc3a4b;\n  --light-color-record-hover: #3578e5;\n  --light-color-record-inactive: #0088fa;\n  --light-color-scroll-thumb: #c2c2c2;\n  --light-color-scroll-track: #fafafa;\n  --light-color-search-match: yellow;\n  --light-color-search-match-current: #f7923b;\n  --light-color-selected-tree-highlight-active: rgba(0, 136, 250, 0.1);\n  --light-color-selected-tree-highlight-inactive: rgba(0, 0, 0, 0.05);\n  --light-color-tab-selected-border: #0088fa;\n  --light-color-text: #000000;\n  --light-color-text-invalid: #ff0000;\n  --light-color-text-selected: #ffffff;\n  --light-color-toggle-background-invalid: #fc3a4b;\n  --light-color-toggle-background-on: #0088fa;\n  --light-color-toggle-background-off: #cfd1d5;\n  --light-color-toggle-text: #ffffff;\n  --light-color-tooltip-background: rgba(0, 0, 0, 0.9);\n  --light-color-tooltip-text: #ffffff;\n\n  /* Dark theme */\n  --dark-color-attribute-name: #9d87d2;\n  --dark-color-attribute-name-inverted: #282828;\n  --dark-color-attribute-value: #cedae0;\n  --dark-color-attribute-value-inverted: #ffffff;\n  --dark-color-attribute-editable-value: yellow;\n  --dark-color-background: #282c34;\n  --dark-color-background-hover: rgba(255, 255, 255, 0.1);\n  --dark-color-background-inactive: #3d424a;\n  --dark-color-background-invalid: #5c0000;\n  --dark-color-background-selected: #178fb9;\n  --dark-color-button-background: #282c34;\n  --dark-color-button-background-focus: #3d424a;\n  --dark-color-button: #afb3b9;\n  --dark-color-button-active: #61dafb;\n  --dark-color-button-disabled: #4f5766;\n  --dark-color-button-focus: #a2e9fc;\n  --dark-color-button-hover: #ededed;\n  --dark-color-border: #3d424a;\n  --dark-color-commit-did-not-render-fill: #777d88;\n  --dark-color-commit-did-not-render-fill-text: #000000;\n  --dark-color-commit-did-not-render-pattern: #666c77;\n  --dark-color-commit-did-not-render-pattern-text: #ffffff;\n  --dark-color-commit-gradient-0: #37afa9;\n  --dark-color-commit-gradient-1: #63b19e;\n  --dark-color-commit-gradient-2: #80b393;\n  --dark-color-commit-gradient-3: #97b488;\n  --dark-color-commit-gradient-4: #abb67d;\n  --dark-color-commit-gradient-5: #beb771;\n  --dark-color-commit-gradient-6: #cfb965;\n  --dark-color-commit-gradient-7: #dfba57;\n  --dark-color-commit-gradient-8: #efbb49;\n  --dark-color-commit-gradient-9: #febc38;\n  --dark-color-commit-gradient-text: #000000;\n  --dark-color-component-name: #61dafb;\n  --dark-color-component-name-inverted: #282828;\n  --dark-color-component-badge-background: rgba(255, 255, 255, 0.25);\n  --dark-color-component-badge-background-inverted: rgba(0, 0, 0, 0.25);\n  --dark-color-component-badge-count: #8f949d;\n  --dark-color-component-badge-count-inverted: rgba(255, 255, 255, 0.7);\n  --dark-color-dim: #8f949d;\n  --dark-color-dimmer: #777d88;\n  --dark-color-dimmest: #4f5766;\n  --dark-color-expand-collapse-toggle: #8f949d;\n  --dark-color-modal-background: rgba(0, 0, 0, 0.75);\n  --dark-color-record-active: #fc3a4b;\n  --dark-color-record-hover: #a2e9fc;\n  --dark-color-record-inactive: #61dafb;\n  --dark-color-scroll-thumb: #afb3b9;\n  --dark-color-scroll-track: #313640;\n  --dark-color-search-match: yellow;\n  --dark-color-search-match-current: #f7923b;\n  --dark-color-selected-tree-highlight-active: rgba(23, 143, 185, 0.15);\n  --dark-color-selected-tree-highlight-inactive: rgba(255, 255, 255, 0.05);\n  --dark-color-tab-selected-border: #178fb9;\n  --dark-color-text: #ffffff;\n  --dark-color-text-invalid: #ff8080;\n  --dark-color-text-selected: #ffffff;\n  --dark-color-toggle-background-invalid: #fc3a4b;\n  --dark-color-toggle-background-on: #178fb9;\n  --dark-color-toggle-background-off: #777d88;\n  --dark-color-toggle-text: #ffffff;\n  --dark-color-tooltip-background: rgba(255, 255, 255, 0.9);\n  --dark-color-tooltip-text: #000000;\n\n  /* Font smoothing */\n  --light-font-smoothing: auto;\n  --dark-font-smoothing: antialiased;\n  --font-smoothing: auto;\n\n  /* Compact density */\n  --compact-font-size-monospace-small: 9px;\n  --compact-font-size-monospace-normal: 11px;\n  --compact-font-size-monospace-large: 15px;\n  --compact-font-size-sans-small: 10px;\n  --compact-font-size-sans-normal: 12px;\n  --compact-font-size-sans-large: 14px;\n  --compact-line-height-data: 18px;\n  --compact-root-font-size: 16px;\n\n  /* Comfortable density */\n  --comfortable-font-size-monospace-small: 10px;\n  --comfortable-font-size-monospace-normal: 13px;\n  --comfortable-font-size-monospace-large: 17px;\n  --comfortable-font-size-sans-small: 12px;\n  --comfortable-font-size-sans-normal: 14px;\n  --comfortable-font-size-sans-large: 16px;\n  --comfortable-line-height-data: 22px;\n  --comfortable-root-font-size: 20px;\n\n  /* GitHub.com system fonts */\n  --font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,\n    Courier, monospace;\n  --font-family-sans: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,\n    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n\n  /* Constant values shared between JS and CSS */\n  --interaction-commit-size: 10px;\n  --interaction-label-width: 200px;\n}\n\n* {\n  box-sizing: border-box;\n\n  -webkit-font-smoothing: var(--font-smoothing);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/react-dom/index.js
var react_dom = __webpack_require__(7);

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(10);
var external_events_default = /*#__PURE__*/__webpack_require__.n(external_events_);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/bridge.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var BATCH_DURATION = 100;

var Bridge = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Bridge, _EventEmitter);

  var _super = _createSuper(Bridge);

  function Bridge(wall) {
    var _this;

    _classCallCheck(this, Bridge);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_isShutdown", false);

    _defineProperty(_assertThisInitialized(_this), "_messageQueue", []);

    _defineProperty(_assertThisInitialized(_this), "_timeoutID", null);

    _defineProperty(_assertThisInitialized(_this), "_wallUnlisten", null);

    _defineProperty(_assertThisInitialized(_this), "_flush", function () {
      // This method is used after the bridge is marked as destroyed in shutdown sequence,
      // so we do not bail out if the bridge marked as destroyed.
      // It is a private method that the bridge ensures is only called at the right times.
      clearTimeout(_this._timeoutID);
      _this._timeoutID = null;

      if (_this._messageQueue.length) {
        for (var i = 0; i < _this._messageQueue.length; i += 3) {
          _this._wall.send(_this._messageQueue[i], _this._messageQueue[i + 1], _this._messageQueue[i + 2]);
        }

        _this._messageQueue.length = 0; // Check again for queued messages in BATCH_DURATION ms. This will keep
        // flushing in a loop as long as messages continue to be added. Once no
        // more are, the timer expires.

        _this._timeoutID = setTimeout(_this._flush, BATCH_DURATION);
      }
    });

    _this._wall = wall;
    _this._wallUnlisten = wall.listen(function (message) {
      _assertThisInitialized(_this).emit(message.event, message.payload);
    }) || null;
    return _this;
  }

  _createClass(Bridge, [{
    key: "send",
    value: function send(event, payload, transferable) {
      if (this._isShutdown) {
        console.warn("Cannot send message \"".concat(event, "\" through a Bridge that has been shutdown."));
        return;
      } // When we receive a message:
      // - we add it to our queue of messages to be sent
      // - if there hasn't been a message recently, we set a timer for 0 ms in
      //   the future, allowing all messages created in the same tick to be sent
      //   together
      // - if there *has* been a message flushed in the last BATCH_DURATION ms
      //   (or we're waiting for our setTimeout-0 to fire), then _timeoutID will
      //   be set, and we'll simply add to the queue and wait for that


      this._messageQueue.push(event, payload, transferable);

      if (!this._timeoutID) {
        this._timeoutID = setTimeout(this._flush, 0);
      }
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      if (this._isShutdown) {
        console.warn('Bridge was already shutdown.');
        return;
      } // Queue the shutdown outgoing message for subscribers.


      this.send('shutdown'); // Mark this bridge as destroyed, i.e. disable its public API.

      this._isShutdown = true; // Disable the API inherited from EventEmitter that can add more listeners and send more messages.
      // $FlowFixMe This property is not writable.

      this.addListener = function () {};

      this.emit = function () {}; // NOTE: There's also EventEmitter API like `on` and `prependListener` that we didn't add to our Flow type of EventEmitter.
      // Unsubscribe this bridge incoming message listeners to be sure, and so they don't have to do that.


      this.removeAllListeners(); // Stop accepting and emitting incoming messages from the wall.

      var wallUnlisten = this._wallUnlisten;

      if (wallUnlisten) {
        wallUnlisten();
      } // Synchronously flush all queued outgoing messages.
      // At this step the subscribers' code may run in this call stack.


      do {
        this._flush();
      } while (this._messageQueue.length); // Make sure once again that there is no dangling timer.


      clearTimeout(this._timeoutID);
      this._timeoutID = null;
    }
  }]);

  return Bridge;
}(external_events_default.a);

/* harmony default export */ var src_bridge = (Bridge);
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/constants.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// Flip this flag to true to enable verbose console debug logging.
var __DEBUG__ = false;
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/store.js
function store_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { store_typeof = function _typeof(obj) { return typeof obj; }; } else { store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return store_typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function store_createClass(Constructor, protoProps, staticProps) { if (protoProps) store_defineProperties(Constructor.prototype, protoProps); if (staticProps) store_defineProperties(Constructor, staticProps); return Constructor; }

function store_createSuper(Derived) { return function () { var Super = store_getPrototypeOf(Derived), result; if (store_isNativeReflectConstruct()) { var NewTarget = store_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return store_possibleConstructorReturn(this, result); }; }

function store_possibleConstructorReturn(self, call) { if (call && (store_typeof(call) === "object" || typeof call === "function")) { return call; } return store_assertThisInitialized(self); }

function store_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function store_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function store_getPrototypeOf(o) { store_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return store_getPrototypeOf(o); }

function store_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) store_setPrototypeOf(subClass, superClass); }

function store_setPrototypeOf(o, p) { store_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return store_setPrototypeOf(o, p); }

function store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var store_debug = function debug(methodName) {
  if (__DEBUG__) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["%cStore %c".concat(methodName), 'color: green; font-weight: bold;', 'font-weight: bold;'].concat(args));
  }
};
/**
 * The store is the single source of truth for updates from the backend.
 * ContextProviders can subscribe to the Store for specific things they want to provide.
 */


var store_Store = /*#__PURE__*/function (_EventEmitter) {
  store_inherits(Store, _EventEmitter);

  var _super = store_createSuper(Store);

  function Store(bridge) {
    var _this;

    store_classCallCheck(this, Store);

    _this = _super.call(this);

    store_defineProperty(store_assertThisInitialized(_this), "_environmentEvents", []);

    store_defineProperty(store_assertThisInitialized(_this), "onBridgeEvents", function (events) {
      var _iterator = _createForOfIteratorHelper(events),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;

          if (event.name === 'store.updated') {
            _this._relayStoreRecords = event.records;
          } else {
            _this._environmentEvents.push(event);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      _this.emit('mutated');
    });

    store_defineProperty(store_assertThisInitialized(_this), "clearEvents", function () {
      var completed = new Set();

      var _iterator2 = _createForOfIteratorHelper(_this._environmentEvents),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var event = _step2.value;

          if (event.name === 'execute.complete' || event.name === 'execute.error' || event.name === 'execute.unsubscribe') {
            completed.add(event.transactionID);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      _this._environmentEvents = _this._environmentEvents.filter(function (event) {
        return event.name !== 'queryresource.fetch' && !completed.has(event.transactionID);
      });

      _this.emit('mutated');
    });

    store_defineProperty(store_assertThisInitialized(_this), "onBridgeShutdown", function () {
      if (__DEBUG__) {
        store_debug('onBridgeShutdown', 'unsubscribing from Bridge');
      }

      _this._bridge.removeListener('events', _this.onBridgeEvents);

      _this._bridge.removeListener('shutdown', _this.onBridgeShutdown);
    });

    _this._bridge = bridge;
    bridge.addListener('events', _this.onBridgeEvents);
    bridge.addListener('shutdown', _this.onBridgeShutdown);
    return _this;
  }

  store_createClass(Store, [{
    key: "getEvents",
    value: function getEvents() {
      return this._environmentEvents;
    }
  }, {
    key: "getRecords",
    value: function getRecords() {
      return this._relayStoreRecords;
    }
  }]);

  return Store;
}(external_events_default.a);


// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/ws/index.js
var ws = __webpack_require__(31);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(20);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/hook.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Install the hook on window, which is an event emitter.
 * Note because Chrome content scripts cannot directly modify the window object,
 * we are evaling this function by inserting a script tag.
 * That's why we have to inline the whole event emitter implementation here.
 */
function installHook(target) {
  if (target.hasOwnProperty('__RELAY_DEVTOOLS_HOOK__')) {
    return null;
  }

  var listeners = {};
  var environments = new Map();
  var uidCounter = 0;

  function registerEnvironment(environment) {
    var id = ++uidCounter;
    environments.set(id, environment);
    hook.emit('environment', {
      id: id,
      environment: environment
    });
    return id;
  }

  function sub(event, fn) {
    hook.on(event, fn);
    return function () {
      return hook.off(event, fn);
    };
  }

  function on(event, fn) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) {
      return;
    }

    var index = listeners[event].indexOf(fn);

    if (index !== -1) {
      listeners[event].splice(index, 1);
    }

    if (!listeners[event].length) {
      delete listeners[event];
    }
  }

  function emit(event, data) {
    if (listeners[event]) {
      listeners[event].map(function (fn) {
        return fn(data);
      });
    }
  }

  var environmentWrappers = new Map();
  var hook = {
    registerEnvironment: registerEnvironment,
    environmentWrappers: environmentWrappers,
    // listeners,
    environments: environments,
    emit: emit,
    // inject,
    on: on,
    off: off,
    sub: sub
  };
  Object.defineProperty(target, '__RELAY_DEVTOOLS_HOOK__', {
    // This property needs to be configurable for the test environment,
    // else we won't be able to delete and recreate it beween tests.
    configurable: false,
    enumerable: false,
    get: function get() {
      return hook;
    }
  });
  return hook;
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/menu-button/styles.css
var styles = __webpack_require__(52);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/tooltip/styles.css
var tooltip_styles = __webpack_require__(54);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/context.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var BridgeContext = Object(react["createContext"])(null);
BridgeContext.displayName = 'BridgeContext';
var StoreContext = Object(react["createContext"])(null);
StoreContext.displayName = 'StoreContext';
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ButtonIcon.css
var ButtonIcon = __webpack_require__(32);
var ButtonIcon_default = /*#__PURE__*/__webpack_require__.n(ButtonIcon);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ButtonIcon.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function ButtonIcon_ButtonIcon(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      type = _ref.type;
  var pathData = null;

  switch (type) {
    case 'add':
      pathData = PATH_ADD;
      break;

    case 'cancel':
      pathData = PATH_CANCEL;
      break;

    case 'clear':
      pathData = PATH_CLEAR;
      break;

    case 'close':
      pathData = PATH_CLOSE;
      break;

    case 'collapsed':
      pathData = PATH_COLLAPSED;
      break;

    case 'copy':
      pathData = PATH_COPY;
      break;

    case 'delete':
      pathData = PATH_DELETE;
      break;

    case 'down':
      pathData = PATH_DOWN;
      break;

    case 'expanded':
      pathData = PATH_EXPANDED;
      break;

    case 'export':
      pathData = PATH_EXPORT;
      break;

    case 'filter':
      pathData = PATH_FILTER;
      break;

    case 'import':
      pathData = PATH_IMPORT;
      break;

    case 'log-data':
      pathData = PATH_LOG_DATA;
      break;

    case 'more':
      pathData = PATH_MORE;
      break;

    case 'next':
      pathData = PATH_NEXT;
      break;

    case 'previous':
      pathData = PATH_PREVIOUS;
      break;

    case 'record':
      pathData = PATH_RECORD;
      break;

    case 'reload':
      pathData = PATH_RELOAD;
      break;

    case 'save':
      pathData = PATH_SAVE;
      break;

    case 'search':
      pathData = PATH_SEARCH;
      break;

    case 'settings':
      pathData = PATH_SETTINGS;
      break;

    case 'suspend':
      pathData = PATH_SUSPEND;
      break;

    case 'undo':
      pathData = PATH_UNDO;
      break;

    case 'up':
      pathData = PATH_UP;
      break;

    case 'view-dom':
      pathData = PATH_VIEW_DOM;
      break;

    case 'view-source':
      pathData = PATH_VIEW_SOURCE;
      break;

    default:
      console.warn("Unsupported type \"".concat(type, "\" specified for ButtonIcon"));
      break;
  }

  return /*#__PURE__*/react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "".concat(ButtonIcon_default.a.ButtonIcon, " ").concat(className),
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: pathData
  }));
}
var PATH_ADD = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z';
var PATH_CANCEL = "\n  M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\n";
var PATH_CLEAR = "\n  M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69\n  16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z\n";
var PATH_CLOSE = 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';
var PATH_COLLAPSED = 'M10 17l5-5-5-5v10z';
var PATH_COPY = "\n  M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3a2 2 0 0 0 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9a2 2 0 0 0-2\n  2v10a2 2 0 0 0 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z\n";
var PATH_DELETE = "\n  M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12\n  13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\n";
var PATH_DOWN = 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z';
var PATH_EXPANDED = 'M7 10l5 5 5-5z';
var PATH_EXPORT = 'M15.82,2.14v7H21l-9,9L3,9.18H8.18v-7ZM3,20.13H21v1.73H3Z';
var PATH_FILTER = 'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z';
var PATH_IMPORT = 'M8.18,18.13v-7H3l9-8.95,9,9H15.82v7ZM3,20.13H21v1.73H3Z';
var PATH_LOG_DATA = "\n  M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41\n  3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04\n  1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6\n  8h-4v-2h4v2zm0-4h-4v-2h4v2z\n";
var PATH_MORE = "\n  M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 \n  2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\n";
var PATH_NEXT = 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z';
var PATH_PREVIOUS = 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z';
var PATH_RECORD = 'M4,12a8,8 0 1,0 16,0a8,8 0 1,0 -16,0';
var PATH_RELOAD = "\n  M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0\n  6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0\n  3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z\n";
var PATH_SAVE = "\n  M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z\n";
var PATH_SEARCH = "\n  M8.5,22H3.7l-1.4-1.5V3.8l1.3-1.5h17.2l1,1.5v4.9h-1.3V4.3l-0.4-0.6H4.2L3.6,4.3V20l0.7,0.7h4.2V22z\n  M23,13.9l-4.6,3.6l4.6,4.6l-1.1,1.1l-4.7-4.4l-3.3,4.4l-3.2-12.3L23,13.9z\n";
var PATH_SETTINGS = "\n  M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12\n  2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39\n  0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69\n  1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58\n  1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0\n  .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z\n";
var PATH_SUSPEND = "\n  M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97\n  0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\n";
var PATH_UNDO = "\n  M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88\n  3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z\n";
var PATH_UP = 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z';
var PATH_VIEW_DOM = "\n  M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12\n  17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3\n  3-1.34 3-3-1.34-3-3-3z\n";
var PATH_VIEW_SOURCE = "\n  M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z\n  ";
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/warning/warning.js
var warning = __webpack_require__(57);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/utils/dist/utils.esm.js


/* eslint-disable no-restricted-globals, eqeqeq,  */

/**
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * TODO: We are calling useLayoutEffect in a couple of places that will likely
 * cause some issues for SSR users, whether the warning shows or not. Audit and
 * fix these.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */

var useIsomorphicLayoutEffect = /*#__PURE__*/canUseDOM() ? react_default.a.useLayoutEffect : react_default.a.useEffect;
var checkedPkgs = {};
/**
 * When in dev mode, checks that styles for a given @reach package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */
// @ts-ignore

var checkStyles = function checkStyles(packageName) {
  return void packageName;
};

if (false) { var utils_esm_ref, env; }
/**
 * Ponyfill for the global object in some environments.
 *
 * @link https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
 */


var ponyfillGlobal = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self :
/*#__PURE__*/
// eslint-disable-next-line no-new-func
Function("return this")();
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */

function assignRef(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error("Cannot assign value \"" + value + "\" to ref \"" + ref + "\"");
    }
  }
}
/**
 * Checks true|"true" vs false|"false"
 *
 * @param value
 */


function boolOrBoolString(value) {
  return value === "true" ? true : isBoolean(value) ? value : false;
}

function canUseDOM() {
  return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
}
/**
 * Type-safe clone element
 *
 * @param element
 * @param props
 * @param children
 */


function cloneValidElement(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return Object(react["isValidElement"])(element) ? react["cloneElement"].apply(void 0, [element, props].concat(children)) : element;
}

function createNamedContext(name, defaultValue) {
  var Ctx = Object(react["createContext"])(defaultValue);
  Ctx.displayName = name;
  return Ctx;
}
/**
 * This is a hack for sure. The thing is, getting a component to intelligently
 * infer props based on a component or JSX string passed into an `as` prop is
 * kind of a huge pain. Getting it to work and satisfy the constraints of
 * `forwardRef` seems dang near impossible. To avoid needing to do this awkward
 * type song-and-dance every time we want to forward a ref into a component
 * that accepts an `as` prop, we abstract all of that mess to this function for
 * the time time being.
 *
 * TODO: Eventually we should probably just try to get the type defs above
 * working across the board, but ain't nobody got time for that mess!
 *
 * @param Comp
 */


function forwardRefWithAs(comp) {
  return react_default.a.forwardRef(comp);
}
/**
 * Get a computed style value by property, backwards compatible with IE
 * @param element
 * @param styleProp
 */


function getElementComputedStyle(element, styleProp) {
  var y = null;
  var doc = getOwnerDocument(element);

  if (element.currentStyle) {
    y = element.currentStyle[styleProp];
  } else if (doc && doc.defaultView && isFunction(doc.defaultView.getComputedStyle)) {
    y = doc.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
  }

  return y;
}
/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */


function getOwnerDocument(element) {
  return element && element.ownerDocument ? element.ownerDocument : canUseDOM() ? document : null;
}
/**
 * Get the scrollbar offset distance.
 */


function getScrollbarOffset() {
  try {
    if (window.innerWidth > document.documentElement.clientWidth) {
      return window.innerWidth - document.documentElement.clientWidth;
    }
  } catch (err) {}

  return 0;
}
/**
 * Checks whether or not a value is a boolean.
 *
 * @param value
 */


function isBoolean(value) {
  return typeof value === "boolean";
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */


function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Checks whether or not a value is a number.
 *
 * @param value
 */


function isNumber(value) {
  return typeof value === "number";
}
/**
 * Detects right clicks
 *
 * @param nativeEvent
 */


function isRightClick(nativeEvent) {
  return nativeEvent.which === 3 || nativeEvent.button === 2;
}
/**
 * Checks whether or not a value is a string.
 *
 * @param value
 */


function isString(value) {
  return typeof value === "string";
}
/**
 * Joins strings to format IDs for compound components.
 *
 * @param args
 */


function makeId() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.filter(function (val) {
    return val != null;
  }).join("--");
}
/**
 * No-op function.
 */


function noop() {}
/**
 * Convert our state strings for HTML data attributes.
 * No need for a fancy kebab-caser here, we know what our state strings are!
 *
 * @param state
 */


function stateToAttributeString(state) {
  return String(state).replace(/([\s_]+)/g, "-").toLowerCase();
}
/**
 * Logs a warning in dev mode when a component switches from controlled to
 * uncontrolled, or vice versa
 *
 * A single prop should typically be used to determine whether or not a
 * component is controlled or not.
 *
 * @param controlPropValue
 * @param controlPropName
 * @param componentName
 */


function useControlledSwitchWarning(controlPropValue, controlPropName, componentName) {
  /*
   * Determine whether or not the component is controlled and warn the developer
   * if this changes unexpectedly.
   */
  var isControlled = controlPropValue != null;

  var _useRef = Object(react["useRef"])(isControlled),
      wasControlled = _useRef.current;

  var effect = noop;

  if (false) {}

  Object(react["useEffect"])(effect, [componentName, controlPropName, isControlled]);
}
/**
 * React hook for creating a value exactly once.
 * @see https://github.com/Andarist/use-constant
 */


function useConstant(fn) {
  var ref = react_default.a.useRef();

  if (!ref.current) {
    ref.current = {
      v: fn()
    };
  }

  return ref.current.v;
}
/**
 * Detect when focus changes in our document.
 *
 * @param handleChange
 * @param when
 * @param ownerDocument
 */


function useFocusChange(handleChange, when, ownerDocument) {
  if (handleChange === void 0) {
    handleChange = console.log;
  }

  if (when === void 0) {
    when = "focus";
  }

  if (ownerDocument === void 0) {
    ownerDocument = document;
  }

  var lastActiveElement = Object(react["useRef"])(ownerDocument.activeElement);
  Object(react["useEffect"])(function () {
    lastActiveElement.current = ownerDocument.activeElement;

    function onChange(event) {
      if (lastActiveElement.current !== ownerDocument.activeElement) {
        handleChange(ownerDocument.activeElement, lastActiveElement.current, event);
        lastActiveElement.current = ownerDocument.activeElement;
      }
    }

    ownerDocument.addEventListener(when, onChange, true);
    return function () {
      ownerDocument.removeEventListener(when, onChange);
    };
  }, [when, handleChange, ownerDocument]);
}
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */


function useForkedRef() {
  for (var _len3 = arguments.length, refs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    refs[_key3] = arguments[_key3];
  }

  return Object(react["useMemo"])(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
/**
 * Returns the previous value of a reference after a component update.
 *
 * @param value
 */


function usePrevious(value) {
  var ref = Object(react["useRef"])(null);
  Object(react["useEffect"])(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}
/**
 * Call an effect after a component update, skipping the initial mount.
 *
 * @param effect Effect to call
 * @param deps Effect dependency list
 */


function useUpdateEffect(effect, deps) {
  var mounted = Object(react["useRef"])(false);
  Object(react["useEffect"])(function () {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
}
/**
 * Just a lil state logger
 *
 * @param state
 * @param DEBUG
 */


function useStateLogger(state, DEBUG) {
  if (DEBUG === void 0) {
    DEBUG = false;
  }

  var effect = noop;

  if (false) {}

  Object(react["useEffect"])(effect, [state]);
}
/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */


function wrapEvent(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}


// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/auto-id/dist/auto-id.esm.js


/*
 * Welcome to @reach/auto-id!

 * Let's see if we can make sense of why this hook exists and its
 * implementation.
 *
 * Some background:
 *   1. Accessibiliy APIs rely heavily on element IDs
 *   2. Requiring developers to put IDs on every element in Reach UI is both
 *      cumbersome and error-prone
 *   3. With a component model, we can generate IDs for them!
 *
 * Solution 1: Generate random IDs.
 *
 * This works great as long as you don't server render your app. When React (in
 * the client) tries to reuse the markup from the server, the IDs won't match
 * and React will then recreate the entire DOM tree.
 *
 * Solution 2: Increment an integer
 *
 * This sounds great. Since we're rendering the exact same tree on the server
 * and client, we can increment a counter and get a deterministic result between
 * client and server. Also, JS integers can go up to nine-quadrillion. I'm
 * pretty sure the tab will be closed before an app never needs
 * 10 quadrillion IDs!
 *
 * Problem solved, right?
 *
 * Ah, but there's a catch! React's concurrent rendering makes this approach
 * non-deterministic. While the client and server will end up with the same
 * elements in the end, depending on suspense boundaries (and possibly some user
 * input during the initial render) the incrementing integers won't always match
 * up.
 *
 * Solution 3: Don't use IDs at all on the server; patch after first render.
 *
 * What we've done here is solution 2 with some tricks. With this approach, the
 * ID returned is an empty string on the first render. This way the server and
 * client have the same markup no matter how wild the concurrent rendering may
 * have gotten.
 *
 * After the render, we patch up the components with an incremented ID. This
 * causes a double render on any components with `useId`. Shouldn't be a problem
 * since the components using this hook should be small, and we're only updating
 * the ID attribute on the DOM, nothing big is happening.
 *
 * It doesn't have to be an incremented number, though--we could do generate
 * random strings instead, but incrementing a number is probably the cheapest
 * thing we can do.
 *
 * Additionally, we only do this patchup on the very first client render ever.
 * Any calls to `useId` that happen dynamically in the client will be
 * populated immediately with a value. So, we only get the double render after
 * server hydration and never again, SO BACK OFF ALRIGHT?
 */

var serverHandoffComplete = false;
var auto_id_esm_id = 0;

var genId = function genId() {
  return ++auto_id_esm_id;
};
/**
 * useId
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be `null` and will update after a
 * component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 *
 * @see Docs https://reacttraining.com/reach-ui/auto-id
 */


var auto_id_esm_useId = function useId(idFromProps) {
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  var initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  var _useState = Object(react["useState"])(initialId),
      id = _useState[0],
      setId = _useState[1];

  useIsomorphicLayoutEffect(function () {
    if (id === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setId(genId());
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  Object(react["useEffect"])(function () {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};


// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/portal/dist/portal.esm.js



/**
 * Welcome to @reach/portal!
 *
 * Creates and appends a DOM node to the end of `document.body` and renders a
 * React tree into it. Useful for rendering a natural React element hierarchy
 * with a different DOM hierarchy to prevent parent styles from clipping or
 * hiding content (for popovers, dropdowns, and modals).
 *
 * @see Docs   https://reacttraining.com/reach-ui/portal
 * @see Source https://github.com/reach/reach-ui/tree/master/packages/portal
 * @see React  https://reactjs.org/docs/portals.html
 */

/**
 * Portal
 *
 * @see Docs https://reacttraining.com/reach-ui/portal#portal
 */

var portal_esm_Portal = function Portal(_ref) {
  var children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "reach-portal" : _ref$type;
  var mountNode = Object(react["useRef"])(null);
  var portalNode = Object(react["useRef"])(null);

  var _useState = Object(react["useState"])(),
      forceUpdate = _useState[1];

  useIsomorphicLayoutEffect(function () {
    // It's possible that the content we are portal has, itself, been portaled.
    // In that case, it's important to append to the correct document element.
    var ownerDocument = mountNode.current.ownerDocument;
    portalNode.current = ownerDocument === null || ownerDocument === void 0 ? void 0 : ownerDocument.createElement(type);
    ownerDocument.body.appendChild(portalNode.current);
    forceUpdate({});
    return function () {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current);
      }
    };
  }, [type]);
  return portalNode.current ? Object(react_dom["createPortal"])(children, portalNode.current) : react_default.a.createElement("span", {
    ref: mountNode
  });
};

if (false) {}

/* harmony default export */ var portal_esm = (portal_esm_Portal);
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/visually-hidden/dist/visually-hidden.esm.js

/**
 * Welcome to @reach/visually-hidden!
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 *
 * @see https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 * @see https://a11yproject.com/posts/how-to-hide-content/
 * @see Docs     https://reacttraining.com/reach-ui/visually-hidden
 * @see Source   https://github.com/reach/reach-ui/tree/master/packages/visually-hidden
 */

/**
 * VisuallyHidden
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */

var visually_hidden_esm_VisuallyHidden = /*#__PURE__*/Object(react["forwardRef"])(function VisuallyHidden(props, ref) {
  return react_default.a.createElement("span", Object.assign({
    ref: ref,
    style: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }
  }, props));
});

if (false) {}

/* harmony default export */ var visually_hidden_esm = (visually_hidden_esm_VisuallyHidden);
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/prop-types/index.js
var prop_types = __webpack_require__(29);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/observe-rect/dist/observe-rect.esm.js
var observe_rect_esm_props = ['bottom', 'height', 'left', 'right', 'top', 'width'];

var rectChanged = function rectChanged(a, b) {
  if (a === void 0) {
    a = {};
  }

  if (b === void 0) {
    b = {};
  }

  return observe_rect_esm_props.some(function (prop) {
    return a[prop] !== b[prop];
  });
};

var observedNodes = /*#__PURE__*/new Map();
var rafId;

var run = function run() {
  var changedStates = [];
  observedNodes.forEach(function (state, node) {
    var newRect = node.getBoundingClientRect();

    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });
  changedStates.forEach(function (state) {
    state.callbacks.forEach(function (cb) {
      return cb(state.rect);
    });
  });
  rafId = window.requestAnimationFrame(run);
};

function observeRect(node, cb) {
  return {
    observe: function observe() {
      var wasEmpty = observedNodes.size === 0;

      if (observedNodes.has(node)) {
        observedNodes.get(node).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb]
        });
      }

      if (wasEmpty) run();
    },
    unobserve: function unobserve() {
      var state = observedNodes.get(node);

      if (state) {
        // Remove the callback
        var index = state.callbacks.indexOf(cb);
        if (index >= 0) state.callbacks.splice(index, 1); // Remove the node reference

        if (!state.callbacks.length) observedNodes["delete"](node); // Stop the loop

        if (!observedNodes.size) cancelAnimationFrame(rafId);
      }
    }
  };
}

/* harmony default export */ var observe_rect_esm = (observeRect);
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/rect/dist/rect.esm.js




/**
 * Welcome to @reach/rect!
 *
 * Measures DOM elements (aka. bounding client rect).
 *
 * @see getBoundingClientRect https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * @see Docs                  https://reacttraining.com/reach-ui/rect
 * @see Source                https://github.com/reach/reach-ui/tree/master/packages/rect
 */

/**
 * Rect
 *
 * @param props
 */

var rect_esm_Rect = function Rect(_ref) {
  var onChange = _ref.onChange,
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? true : _ref$observe,
      children = _ref.children;
  var ref = Object(react["useRef"])(null);
  var rect = useRect(ref, observe, onChange);
  return children({
    ref: ref,
    rect: rect
  });
};

if (false) {} ////////////////////////////////////////////////////////////////////////////////

/**
 * useRect
 *
 * @param nodeRef
 * @param observe
 * @param onChange
 */


function useRect(nodeRef, observe, onChange) {
  if (observe === void 0) {
    observe = true;
  }

  var initialRectSet = Object(react["useRef"])(false);

  var _useState = Object(react["useState"])(null),
      rect = _useState[0],
      setRect = _useState[1];

  var observerRef = Object(react["useRef"])(null);
  useIsomorphicLayoutEffect(function () {
    var cleanup = function cleanup() {
      observerRef.current && observerRef.current.unobserve();
    };

    if (!nodeRef.current) {
      console.warn("You need to place the ref");
      return cleanup;
    }

    if (!observerRef.current) {
      observerRef.current = observe_rect_esm(nodeRef.current, function (rect) {
        onChange && onChange(rect);
        setRect(rect);
      });
    }

    if (!initialRectSet.current) {
      initialRectSet.current = true;
      setRect(nodeRef.current.getBoundingClientRect());
    }

    observe && observerRef.current.observe();
    return cleanup; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observe, onChange]);
  return rect;
}

/* harmony default export */ var rect_esm = (rect_esm_Rect);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/node_modules/@reach/tooltip/dist/tooltip.esm.js








function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _on, _on2, _on3, _on4, _on5, _states;

var MOUSE_REST_TIMEOUT = 100;
var LEAVE_TIMEOUT = 500; ////////////////////////////////////////////////////////////////////////////////
// States
// Nothing goin' on

var IDLE = "IDLE"; // We're considering showing the tooltip, but we're gonna wait a sec

var FOCUSED = "FOCUSED"; // It's on!

var VISIBLE = "VISIBLE"; // Focus has left, but we want to keep it visible for a sec

var LEAVING_VISIBLE = "LEAVING_VISIBLE"; // The user clicked the tool, so we want to hide the thing, we can't just use
// IDLE because we need to ignore mousemove, etc.

var DISMISSED = "DISMISSED"; ////////////////////////////////////////////////////////////////////////////////
// Events

var BLUR = "BLUR";
var FOCUS = "FOCUS";
var GLOBAL_MOUSE_MOVE = "GLOBAL_MOUSE_MOVE";
var MOUSE_DOWN = "MOUSE_DOWN";
var MOUSE_ENTER = "MOUSE_ENTER";
var MOUSE_LEAVE = "MOUSE_LEAVE";
var MOUSE_MOVE = "MOUSE_MOVE";
var REST = "REST";
var SELECT_WITH_KEYBOARD = "SELECT_WITH_KEYBOARD";
var TIME_COMPLETE = "TIME_COMPLETE";
var chart = {
  initial: IDLE,
  states: (_states = {}, _states[IDLE] = {
    enter: clearContextId,
    on: (_on = {}, _on[MOUSE_ENTER] = FOCUSED, _on[FOCUS] = VISIBLE, _on)
  }, _states[FOCUSED] = {
    enter: startRestTimer,
    leave: clearRestTimer,
    on: (_on2 = {}, _on2[MOUSE_MOVE] = FOCUSED, _on2[MOUSE_LEAVE] = IDLE, _on2[MOUSE_DOWN] = DISMISSED, _on2[BLUR] = IDLE, _on2[REST] = VISIBLE, _on2)
  }, _states[VISIBLE] = {
    on: (_on3 = {}, _on3[FOCUS] = FOCUSED, _on3[MOUSE_ENTER] = FOCUSED, _on3[MOUSE_LEAVE] = LEAVING_VISIBLE, _on3[BLUR] = LEAVING_VISIBLE, _on3[MOUSE_DOWN] = DISMISSED, _on3[SELECT_WITH_KEYBOARD] = DISMISSED, _on3[GLOBAL_MOUSE_MOVE] = LEAVING_VISIBLE, _on3)
  }, _states[LEAVING_VISIBLE] = {
    enter: startLeavingVisibleTimer,
    leave: function leave() {
      clearLeavingVisibleTimer();
      clearContextId();
    },
    on: (_on4 = {}, _on4[MOUSE_ENTER] = VISIBLE, _on4[FOCUS] = VISIBLE, _on4[TIME_COMPLETE] = IDLE, _on4)
  }, _states[DISMISSED] = {
    leave: function leave() {
      // allows us to come on back later w/o entering something else first
      context.id = null;
    },
    on: (_on5 = {}, _on5[MOUSE_LEAVE] = IDLE, _on5[BLUR] = IDLE, _on5)
  }, _states)
};
/*
 * Chart context allows us to persist some data around, in Tooltip all we use
 * is the id of the current tooltip being interacted with.
 */

var context = {
  id: null
};
var tooltip_esm_state = chart.initial; ////////////////////////////////////////////////////////////////////////////////
// Subscriptions:
//
// We could require apps to render a <TooltipProvider> around the app and use
// React context to notify Tooltips of changes to our state machine, instead
// we manage subscriptions ourselves and simplify the Tooltip API.
//
// Maybe if default context could take a hook (instead of just a static value)
// that was rendered at the root for us, that'd be cool! But it doesn't.

var subscriptions = [];

function tooltip_esm_subscribe(fn) {
  subscriptions.push(fn);
  return function () {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}

function notify() {
  subscriptions.forEach(function (fn) {
    return fn(tooltip_esm_state, context);
  });
} ////////////////////////////////////////////////////////////////////////////////
// Timeouts:
// Manages when the user "rests" on an element. Keeps the interface from being
// flashing tooltips all the time as the user moves the mouse around the screen.


var restTimeout;

function startRestTimer() {
  window.clearTimeout(restTimeout);
  restTimeout = window.setTimeout(function () {
    return transition(REST);
  }, MOUSE_REST_TIMEOUT);
}

function clearRestTimer() {
  window.clearTimeout(restTimeout);
} // Manages the delay to hide the tooltip after rest leaves.


var leavingVisibleTimer;

function startLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
  leavingVisibleTimer = window.setTimeout(function () {
    return transition(TIME_COMPLETE);
  }, LEAVE_TIMEOUT);
}

function clearLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
} // allows us to come on back later w/o entering something else first after the
// user leaves or dismisses


function clearContextId() {
  context.id = null;
} ////////////////////////////////////////////////////////////////////////////////

/**
 * useTooltip
 *
 * @param params
 */


function useTooltip(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      idProp = _ref.id,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onKeyDown = _ref.onKeyDown,
      onMouseDown = _ref.onMouseDown,
      forwardedRef = _ref.ref,
      DEBUG_STYLE = _ref.DEBUG_STYLE;

  var id = String(auto_id_esm_useId(idProp));

  var _useState = Object(react["useState"])(DEBUG_STYLE ? true : id === null ? false : context.id === id && tooltip_esm_state === VISIBLE),
      isVisible = _useState[0],
      setIsVisible = _useState[1]; // hopefully they always pass a ref if they ever pass one


  var ownRef = Object(react["useRef"])(null);
  var ref = useForkedRef(forwardedRef, ownRef); // TODO: Fix in utils

  var triggerRect = useRect(ownRef, isVisible);
  Object(react["useEffect"])(function () {
    return tooltip_esm_subscribe(function () {
      if (context.id === id && (tooltip_esm_state === VISIBLE || tooltip_esm_state === LEAVING_VISIBLE)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [id]);
  Object(react["useEffect"])(function () {
    return checkStyles("tooltip");
  }, []);
  Object(react["useEffect"])(function () {
    var ownerDocument = getOwnerDocument(ownRef.current) || document;

    function listener(event) {
      if ((event.key === "Escape" || event.key === "Esc") && tooltip_esm_state === VISIBLE) {
        transition(SELECT_WITH_KEYBOARD);
      }
    }

    ownerDocument.addEventListener("keydown", listener);
    return function () {
      return ownerDocument.removeEventListener("keydown", listener);
    };
  }, []);

  var handleMouseEnter = function handleMouseEnter() {
    transition(MOUSE_ENTER, {
      id: id
    });
  };

  var handleMouseMove = function handleMouseMove() {
    transition(MOUSE_MOVE, {
      id: id
    });
  };

  var handleFocus = function handleFocus() {
    // @ts-ignore
    if (window.__REACH_DISABLE_TOOLTIPS) {
      return;
    }

    transition(FOCUS, {
      id: id
    });
  };

  var handleMouseLeave = function handleMouseLeave() {
    transition(MOUSE_LEAVE);
  };

  var handleBlur = function handleBlur() {
    // Allow quick click from one tool to another
    if (context.id !== id) return;
    transition(BLUR);
  };

  var handleMouseDown = function handleMouseDown() {
    // Allow quick click from one tool to another
    if (context.id !== id) return;
    transition(MOUSE_DOWN);
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      transition(SELECT_WITH_KEYBOARD);
    }
  };

  var trigger = {
    "aria-describedby": isVisible ? makeId("tooltip", id) : undefined,
    "data-reach-tooltip-trigger": "",
    ref: ref,
    onMouseEnter: wrapEvent(onMouseEnter, handleMouseEnter),
    onMouseMove: wrapEvent(onMouseMove, handleMouseMove),
    onFocus: wrapEvent(onFocus, handleFocus),
    onBlur: wrapEvent(onBlur, handleBlur),
    onMouseLeave: wrapEvent(onMouseLeave, handleMouseLeave),
    onKeyDown: wrapEvent(onKeyDown, handleKeyDown),
    onMouseDown: wrapEvent(onMouseDown, handleMouseDown)
  };
  var tooltip = {
    id: id,
    triggerRect: triggerRect,
    isVisible: isVisible
  };
  return [trigger, tooltip, isVisible];
} ////////////////////////////////////////////////////////////////////////////////

/**
 * Tooltip
 *
 * @see Docs https://reacttraining.com/reach-ui/tooltip#tooltip
 */


var Tooltip = /*#__PURE__*/forwardRefWithAs(function (_ref2, forwardedRef) {
  var children = _ref2.children,
      label = _ref2.label,
      ariaLabel = _ref2.ariaLabel,
      id = _ref2.id,
      DEBUG_STYLE = _ref2.DEBUG_STYLE,
      rest = _objectWithoutPropertiesLoose(_ref2, ["children", "label", "ariaLabel", "id", "DEBUG_STYLE"]);

  var child = react["Children"].only(children); // We need to pass some properties from the child into useTooltip
  // to make sure users can maintain control over the trigger's ref and events

  var _useTooltip = useTooltip({
    id: id,
    onMouseEnter: child.props.onMouseEnter,
    onMouseMove: child.props.onMouseMove,
    onMouseLeave: child.props.onMouseLeave,
    onFocus: child.props.onFocus,
    onBlur: child.props.onBlur,
    onKeyDown: child.props.onKeyDown,
    onMouseDown: child.props.onMouseDown,
    ref: child.ref,
    DEBUG_STYLE: DEBUG_STYLE
  }),
      trigger = _useTooltip[0],
      tooltip = _useTooltip[1];

  return react_default.a.createElement(react["Fragment"], null, Object(react["cloneElement"])(child, trigger), react_default.a.createElement(tooltip_esm_TooltipPopup, Object.assign({
    ref: forwardedRef,
    label: label,
    ariaLabel: ariaLabel
  }, tooltip, rest)));
});

if (false) {}
/**
 * TooltipPopup
 *
 * @see Docs https://reacttraining.com/reach-ui/tooltip#tooltippopup
 */


var tooltip_esm_TooltipPopup = /*#__PURE__*/forwardRefWithAs(function TooltipPopup(_ref3, forwardRef) {
  var label = _ref3.label,
      ariaLabel = _ref3.ariaLabel,
      position = _ref3.position,
      isVisible = _ref3.isVisible,
      id = _ref3.id,
      triggerRect = _ref3.triggerRect,
      rest = _objectWithoutPropertiesLoose(_ref3, ["label", "ariaLabel", "position", "isVisible", "id", "triggerRect"]);

  return isVisible ? react_default.a.createElement(portal_esm, null, react_default.a.createElement(tooltip_esm_TooltipContent, Object.assign({
    label: label,
    ariaLabel: ariaLabel,
    position: position,
    isVisible: isVisible,
    id: makeId("tooltip", String(id)),
    triggerRect: triggerRect,
    ref: forwardRef
  }, rest))) : null;
});

if (false) {}
/**
 * TooltipContent
 *
 * We need a separate component so that useRect works inside the portal.
 *
 * @see Docs https://reacttraining.com/reach-ui/tooltip#tooltipcontent
 */


var tooltip_esm_TooltipContent = /*#__PURE__*/forwardRefWithAs(function TooltipContent(_ref4, forwardedRef) {
  var ariaLabel = _ref4.ariaLabel,
      _ref4$as = _ref4.as,
      Comp = _ref4$as === void 0 ? "div" : _ref4$as,
      id = _ref4.id,
      isVisible = _ref4.isVisible,
      label = _ref4.label,
      _ref4$position = _ref4.position,
      position = _ref4$position === void 0 ? positionDefault : _ref4$position,
      style = _ref4.style,
      triggerRect = _ref4.triggerRect,
      rest = _objectWithoutPropertiesLoose(_ref4, ["ariaLabel", "as", "id", "isVisible", "label", "position", "style", "triggerRect"]);

  var useAriaLabel = ariaLabel != null;
  var ownRef = Object(react["useRef"])(null);
  var ref = useForkedRef(forwardedRef, ownRef);
  var tooltipRect = useRect(ownRef, isVisible);
  return react_default.a.createElement(react["Fragment"], null, react_default.a.createElement(Comp, Object.assign({
    "data-reach-tooltip": true,
    role: useAriaLabel ? undefined : "tooltip",
    id: useAriaLabel ? undefined : id,
    children: label,
    style: _extends({}, style, {}, getStyles(position, triggerRect, tooltipRect)),
    ref: ref
  }, rest)), useAriaLabel && react_default.a.createElement(visually_hidden_esm, {
    role: "tooltip",
    id: id
  }, ariaLabel));
});

if (false) {} ////////////////////////////////////////////////////////////////////////////////
// feels awkward when it's perfectly aligned w/ the trigger


var OFFSET = 8;

function getStyles(position, triggerRect, tooltipRect) {
  var haventMeasuredTooltipYet = !tooltipRect;

  if (haventMeasuredTooltipYet) {
    return {
      visibility: "hidden"
    };
  }

  return position(triggerRect, tooltipRect);
}

var positionDefault = function positionDefault(triggerRect, tooltipRect) {
  if (!triggerRect || !tooltipRect) {
    return {};
  }

  var collisions = {
    top: triggerRect.top - tooltipRect.height < 0,
    right: window.innerWidth < triggerRect.left + tooltipRect.width,
    bottom: window.innerHeight < triggerRect.bottom + tooltipRect.height + OFFSET,
    left: triggerRect.left - tooltipRect.width < 0
  };
  var directionRight = collisions.right && !collisions.left;
  var directionUp = collisions.bottom && !collisions.top;
  return {
    left: directionRight ? triggerRect.right - tooltipRect.width + window.pageXOffset + "px" : triggerRect.left + window.pageXOffset + "px",
    top: directionUp ? triggerRect.top - OFFSET - tooltipRect.height + window.pageYOffset + "px" : triggerRect.top + OFFSET + triggerRect.height + window.pageYOffset + "px"
  };
}; ////////////////////////////////////////////////////////////////////////////////

/**
 * Finds the next state from the current state + action. If the chart doesn't
 * describe that transition, it will throw.
 *
 * It also manages lifecycles of the machine, (enter/leave hooks on the state
 * chart)
 *
 * @param event
 * @param payload
 */


var transition = function transition(event, payload) {
  var stateDef = chart.states[tooltip_esm_state];
  var nextState = stateDef && stateDef.on && stateDef.on[event]; // Really useful for debugging
  // console.log({ event, state, nextState, contextId: context.id });
  // !nextState && console.log('no transition taken')

  if (!nextState) {
    return;
  }

  if (stateDef && stateDef.leave) {
    stateDef.leave();
  }

  if (payload) {
    context = payload;
  }

  var nextDef = chart.states[nextState];

  if (nextDef && nextDef.enter) {
    nextDef.enter();
  }

  tooltip_esm_state = nextState;
  notify();
};

/* harmony default export */ var tooltip_esm = (Tooltip);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Button.css
var Button = __webpack_require__(21);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Tooltip.css
var views_Tooltip = __webpack_require__(16);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(views_Tooltip);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Button.js
function Button_extends() { Button_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Button_extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Button_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Button_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




function Button_Button(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      rest = _objectWithoutProperties(_ref, ["children", "className", "title"]);

  var button = /*#__PURE__*/react_default.a.createElement("button", Button_extends({}, rest, {
    className: "".concat(Button_default.a.Button, " ").concat(className)
  }), /*#__PURE__*/react_default.a.createElement("span", {
    className: "".concat(Button_default.a.ButtonContent, " ").concat(className),
    tabIndex: -1
  }, children));

  if (title) {
    button = /*#__PURE__*/react_default.a.createElement(tooltip_esm, {
      className: Tooltip_default.a.Tooltip,
      label: title
    }, button);
  }

  return button;
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/clipboard-js/clipboard.js
var clipboard = __webpack_require__(33);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/ExpandCollapseToggle.css
var ExpandCollapseToggle = __webpack_require__(34);
var ExpandCollapseToggle_default = /*#__PURE__*/__webpack_require__.n(ExpandCollapseToggle);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/ExpandCollapseToggle.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




function ExpandCollapseToggle_ExpandCollapseToggle(_ref) {
  var isOpen = _ref.isOpen,
      setIsOpen = _ref.setIsOpen;
  return /*#__PURE__*/react_default.a.createElement(Button_Button, {
    className: ExpandCollapseToggle_default.a.ExpandCollapseToggle,
    onClick: function onClick() {
      return setIsOpen(function (prevIsOpen) {
        return !prevIsOpen;
      });
    },
    title: "".concat(isOpen ? 'Collapse' : 'Expand', " prop value")
  }, /*#__PURE__*/react_default.a.createElement(ButtonIcon_ButtonIcon, {
    type: isOpen ? 'expanded' : 'collapsed'
  }));
}
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/utils.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function alphaSortEntries(entryA, entryB) {
  var a = entryA[0];
  var b = entryB[0];

  if ('' + +a === a) {
    if ('' + +b !== b) {
      return -1;
    }

    return +a < +b ? -1 : 1;
  }

  return a < b ? -1 : 1;
}
function serializeDataForCopy(props) {
  try {
    return JSON.stringify(props, null, 2);
  } catch (error) {
    return '';
  }
}
function truncateText(text, maxLength) {
  var length = text.length;

  if (length > maxLength) {
    return text.substr(0, Math.floor(maxLength / 2)) + '…' + text.substr(length - Math.ceil(maxLength / 2) - 1);
  } else {
    return text;
  }
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/KeyValue.css
var KeyValue = __webpack_require__(4);
var KeyValue_default = /*#__PURE__*/__webpack_require__.n(KeyValue);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/KeyValue.js
function KeyValue_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { KeyValue_typeof = function _typeof(obj) { return typeof obj; }; } else { KeyValue_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return KeyValue_typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || KeyValue_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function KeyValue_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return KeyValue_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return KeyValue_arrayLikeToArray(o, minLen); }

function KeyValue_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

// import EditableValue from './EditableValue';



function KeyValue_KeyValue(_ref) {
  var alphaSort = _ref.alphaSort,
      depth = _ref.depth,
      hidden = _ref.hidden,
      name = _ref.name,
      path = _ref.path,
      value = _ref.value;

  var _useState = Object(react["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = Object(react["useState"])(isOpen),
      _useState4 = _slicedToArray(_useState3, 2),
      wasOpen = _useState4[0],
      setWasOpen = _useState4[1];

  if (isOpen && !wasOpen) {
    setWasOpen(true);
  }

  var toggleIsOpen = function toggleIsOpen() {
    return setIsOpen(function (prevIsOpen) {
      return !prevIsOpen;
    });
  };

  var dataType = KeyValue_typeof(value);

  var isSimpleType = dataType === 'number' || dataType === 'string' || dataType === 'boolean' || value == null;
  var style = {
    paddingLeft: "".concat((depth - 1) * 0.75, "rem")
  };
  var children = null;

  if (isSimpleType) {
    var displayValue = value;

    if (dataType === 'string') {
      displayValue = "\"".concat(value, "\"");
    } else if (dataType === 'boolean') {
      displayValue = value ? 'true' : 'false';
    } else if (value === null) {
      displayValue = 'null';
    } else if (value === undefined) {
      displayValue = 'undefined';
    }

    children = /*#__PURE__*/react_default.a.createElement("div", {
      key: "root",
      className: KeyValue_default.a.Item,
      hidden: hidden,
      style: style
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: KeyValue_default.a.ExpandCollapseToggleSpacer
    }), /*#__PURE__*/react_default.a.createElement("span", {
      className: KeyValue_default.a.Name
    }, name), /*#__PURE__*/react_default.a.createElement("span", {
      className: KeyValue_default.a.Value
    }, displayValue));
  } else {
    if (Array.isArray(value)) {
      var hasChildren = value.length > 0;
      children = wasOpen ? value.map(function (innerValue, index) {
        return /*#__PURE__*/react_default.a.createElement(KeyValue_KeyValue, {
          key: index,
          alphaSort: alphaSort,
          depth: depth + 1,
          hidden: hidden || !isOpen,
          name: index,
          path: path.concat(index),
          value: value[index]
        });
      }) : [];
      children.unshift( /*#__PURE__*/react_default.a.createElement("div", {
        key: "".concat(depth, "-root"),
        className: KeyValue_default.a.Item,
        hidden: hidden,
        style: style
      }, hasChildren ? /*#__PURE__*/react_default.a.createElement(ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }) : /*#__PURE__*/react_default.a.createElement("div", {
        className: KeyValue_default.a.ExpandCollapseToggleSpacer
      }), /*#__PURE__*/react_default.a.createElement("span", {
        className: KeyValue_default.a.Name,
        onClick: hasChildren ? toggleIsOpen : undefined
      }, name), /*#__PURE__*/react_default.a.createElement("span", null, "Array", ' ', hasChildren ? '' : /*#__PURE__*/react_default.a.createElement("span", {
        className: KeyValue_default.a.Empty
      }, "(empty)"))));
    } else {
      var entries = Object.entries(value);

      if (alphaSort) {
        entries.sort(alphaSortEntries);
      }

      var _hasChildren = entries.length > 0;

      var displayName = 'Object';
      children = wasOpen ? entries.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            name = _ref3[0],
            value = _ref3[1];

        return /*#__PURE__*/react_default.a.createElement(KeyValue_KeyValue, {
          key: name,
          alphaSort: alphaSort,
          depth: depth + 1,
          hidden: hidden || !isOpen,
          name: name,
          path: path.concat(name),
          value: value
        });
      }) : [];
      children.unshift( /*#__PURE__*/react_default.a.createElement("div", {
        key: "".concat(depth, "-root"),
        className: KeyValue_default.a.Item,
        hidden: hidden,
        style: style
      }, _hasChildren ? /*#__PURE__*/react_default.a.createElement(ExpandCollapseToggle_ExpandCollapseToggle, {
        isOpen: isOpen,
        setIsOpen: setIsOpen
      }) : /*#__PURE__*/react_default.a.createElement("div", {
        className: KeyValue_default.a.ExpandCollapseToggleSpacer
      }), /*#__PURE__*/react_default.a.createElement("span", {
        className: KeyValue_default.a.Name,
        onClick: _hasChildren ? toggleIsOpen : undefined
      }, name), /*#__PURE__*/react_default.a.createElement("span", null, "".concat(displayName || '', " "), _hasChildren ? '' : /*#__PURE__*/react_default.a.createElement("span", {
        className: KeyValue_default.a.Empty
      }, "(empty)"))));
    }
  }

  return children;
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/InspectedElementTree.css
var InspectedElementTree = __webpack_require__(11);
var InspectedElementTree_default = /*#__PURE__*/__webpack_require__.n(InspectedElementTree);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/InspectedElementTree.js
function InspectedElementTree_slicedToArray(arr, i) { return InspectedElementTree_arrayWithHoles(arr) || InspectedElementTree_iterableToArrayLimit(arr, i) || InspectedElementTree_unsupportedIterableToArray(arr, i) || InspectedElementTree_nonIterableRest(); }

function InspectedElementTree_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function InspectedElementTree_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return InspectedElementTree_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return InspectedElementTree_arrayLikeToArray(o, minLen); }

function InspectedElementTree_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function InspectedElementTree_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function InspectedElementTree_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */







function InspectedElementTree_InspectedElementTree(_ref) {
  var data = _ref.data,
      label = _ref.label,
      _ref$showWhenEmpty = _ref.showWhenEmpty,
      showWhenEmpty = _ref$showWhenEmpty === void 0 ? false : _ref$showWhenEmpty;
  var entries = data != null ? Object.entries(data) : null;

  if (entries !== null) {
    entries.sort(alphaSortEntries);
  }

  var isEmpty = entries === null || entries.length === 0;
  var handleCopy = Object(react["useCallback"])(function () {
    return Object(clipboard["copy"])(serializeDataForCopy(data));
  }, [data]);

  if (isEmpty && !showWhenEmpty) {
    return null;
  } else {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: InspectedElementTree_default.a.InspectedElementTree
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: InspectedElementTree_default.a.HeaderRow
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: InspectedElementTree_default.a.Header
    }, label), !isEmpty && /*#__PURE__*/react_default.a.createElement(Button_Button, {
      onClick: handleCopy,
      title: "Copy to clipboard"
    }, /*#__PURE__*/react_default.a.createElement(ButtonIcon_ButtonIcon, {
      type: "copy"
    }))), isEmpty && /*#__PURE__*/react_default.a.createElement("div", {
      className: InspectedElementTree_default.a.Empty
    }, "None"), !isEmpty && entries.map(function (_ref2) {
      var _ref3 = InspectedElementTree_slicedToArray(_ref2, 2),
          name = _ref3[0],
          value = _ref3[1];

      return /*#__PURE__*/react_default.a.createElement(KeyValue_KeyValue, {
        key: name,
        alphaSort: true,
        depth: 1,
        name: name,
        path: [name],
        value: value
      });
    }));
  }
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ErrorBoundary.css
var views_ErrorBoundary = __webpack_require__(12);
var ErrorBoundary_default = /*#__PURE__*/__webpack_require__.n(views_ErrorBoundary);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ErrorBoundary.js
function ErrorBoundary_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ErrorBoundary_typeof = function _typeof(obj) { return typeof obj; }; } else { ErrorBoundary_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ErrorBoundary_typeof(obj); }

function ErrorBoundary_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ErrorBoundary_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ErrorBoundary_createClass(Constructor, protoProps, staticProps) { if (protoProps) ErrorBoundary_defineProperties(Constructor.prototype, protoProps); if (staticProps) ErrorBoundary_defineProperties(Constructor, staticProps); return Constructor; }

function ErrorBoundary_createSuper(Derived) { return function () { var Super = ErrorBoundary_getPrototypeOf(Derived), result; if (ErrorBoundary_isNativeReflectConstruct()) { var NewTarget = ErrorBoundary_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ErrorBoundary_possibleConstructorReturn(this, result); }; }

function ErrorBoundary_possibleConstructorReturn(self, call) { if (call && (ErrorBoundary_typeof(call) === "object" || typeof call === "function")) { return call; } return ErrorBoundary_assertThisInitialized(self); }

function ErrorBoundary_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ErrorBoundary_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ErrorBoundary_getPrototypeOf(o) { ErrorBoundary_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ErrorBoundary_getPrototypeOf(o); }

function ErrorBoundary_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ErrorBoundary_setPrototypeOf(subClass, superClass); }

function ErrorBoundary_setPrototypeOf(o, p) { ErrorBoundary_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ErrorBoundary_setPrototypeOf(o, p); }

function ErrorBoundary_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ErrorBoundary_ErrorBoundary = /*#__PURE__*/function (_Component) {
  ErrorBoundary_inherits(ErrorBoundary, _Component);

  var _super = ErrorBoundary_createSuper(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    ErrorBoundary_classCallCheck(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    ErrorBoundary_defineProperty(ErrorBoundary_assertThisInitialized(_this), "state", {
      callStack: null,
      componentStack: null,
      errorMessage: null,
      hasError: false
    });

    return _this;
  }

  ErrorBoundary_createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, _ref) {
      var componentStack = _ref.componentStack;
      var errorMessage = ErrorBoundary_typeof(error) === 'object' && error.hasOwnProperty('message') ? error.message : error;
      var callStack = ErrorBoundary_typeof(error) === 'object' && error.hasOwnProperty('stack') ? error.stack.split('\n').slice(1).join('\n') : null;
      this.setState({
        callStack: callStack,
        componentStack: componentStack,
        errorMessage: errorMessage,
        hasError: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state = this.state,
          callStack = _this$state.callStack,
          componentStack = _this$state.componentStack,
          errorMessage = _this$state.errorMessage,
          hasError = _this$state.hasError;
      var bugURL = "https://github.com/relayjs/relay-devtools";

      if (bugURL) {
        var title = "Error: \"".concat(errorMessage || '', "\"");
        var label = '😭 bug';
        var body = '<!-- please provide repro information here -->\n';
        body += '\n---------------------------------------------';
        body += '\nPlease do not remove the text below this line';
        body += '\n---------------------------------------------';
        body += "\n\nDevTools version: ".concat("1.0.0-c1afb10" || false);

        if (callStack) {
          body += "\n\nCall stack: ".concat(callStack.trim());
        }

        if (componentStack) {
          body += "\n\nComponent stack: ".concat(componentStack.trim());
        }

        bugURL += "/issues/new?labels=".concat(encodeURI(label), "&title=").concat(encodeURI(title), "&body=").concat(encodeURI(body));
      }

      if (hasError) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: ErrorBoundary_default.a.ErrorBoundary
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: ErrorBoundary_default.a.Header
        }, "An error was thrown: \"", errorMessage, "\""), bugURL && /*#__PURE__*/react_default.a.createElement("a", {
          href: bugURL,
          rel: "noopener noreferrer",
          target: "_blank",
          title: "Report bug"
        }, "Report this issue"), !!callStack && /*#__PURE__*/react_default.a.createElement("div", {
          className: ErrorBoundary_default.a.Stack
        }, "The error was thrown ", callStack.trim()), !!componentStack && /*#__PURE__*/react_default.a.createElement("div", {
          className: ErrorBoundary_default.a.Stack
        }, "The error occurred ", componentStack.trim()));
      }

      return children;
    }
  }]);

  return ErrorBoundary;
}(react["Component"]);


// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/portaledContent.js
function portaledContent_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = portaledContent_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function portaledContent_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



function portaledContent(Component) {
  return function PortaledContent(_ref) {
    var portalContainer = _ref.portalContainer,
        rest = portaledContent_objectWithoutProperties(_ref, ["portalContainer"]);

    var children = /*#__PURE__*/react_default.a.createElement(ErrorBoundary_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(Component, rest));
    return portalContainer != null ? Object(react_dom["createPortal"])(children, portalContainer) : children;
  };
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Network/Network.css
var Network = __webpack_require__(3);
var Network_default = /*#__PURE__*/__webpack_require__.n(Network);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Network/Network.js
function Network_createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = Network_unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Network_slicedToArray(arr, i) { return Network_arrayWithHoles(arr) || Network_iterableToArrayLimit(arr, i) || Network_unsupportedIterableToArray(arr, i) || Network_nonIterableRest(); }

function Network_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Network_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Network_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Network_arrayLikeToArray(o, minLen); }

function Network_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Network_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Network_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */








function Section(props) {
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.SectionTitle
  }, props.title), /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.SectionContent
  }, props.children));
}

function RequestDetails(props) {
  var request = props.request;

  if (request == null) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: Network_default.a.RequestDetails
    }, "No request selected");
  }

  var responses = request.responses.map(function (response, i) {
    return /*#__PURE__*/react_default.a.createElement(InspectedElementTree_InspectedElementTree, {
      key: i,
      label: request.responses.length > 1 ? "response (".concat(i + 1, " of ").concat(request.responses.length, ")") : 'response',
      data: response,
      showWhenEmpty: true
    });
  });
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.RequestDetails
  }, /*#__PURE__*/react_default.a.createElement(Section, {
    title: "Status"
  }, request.status), /*#__PURE__*/react_default.a.createElement(InspectedElementTree_InspectedElementTree, {
    label: "request",
    data: request.params,
    showWhenEmpty: true
  }), /*#__PURE__*/react_default.a.createElement(InspectedElementTree_InspectedElementTree, {
    label: "variables",
    data: request.variables,
    showWhenEmpty: true
  }), /*#__PURE__*/react_default.a.createElement(InspectedElementTree_InspectedElementTree, {
    label: "info",
    data: request.infos
  }), responses);
}

function Network_Network(props) {
  var store = Object(react["useContext"])(StoreContext);

  var _useState = Object(react["useState"])({}),
      _useState2 = Network_slicedToArray(_useState, 2),
      forceUpdate = _useState2[1];

  Object(react["useEffect"])(function () {
    var onMutated = function onMutated() {
      forceUpdate({});
    };

    store.addListener('mutated', onMutated);
    return function () {
      store.removeListener('mutated', onMutated);
    };
  }, [store]);

  var _useState3 = Object(react["useState"])(0),
      _useState4 = Network_slicedToArray(_useState3, 2),
      selectedRequestID = _useState4[0],
      setSelectedRequestID = _useState4[1];

  var events = store.getEvents();
  var requests = new Map();

  var _iterator = Network_createForOfIteratorHelper(events),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var event = _step.value;

      switch (event.name) {
        case 'execute.start':
          {
            requests.set(event.transactionID, {
              id: event.transactionID,
              params: event.params,
              variables: event.variables,
              status: 'active',
              responses: [],
              infos: []
            });
            break;
          }

        case 'execute.complete':
          {
            var request = requests.get(event.transactionID);

            if (request != null) {
              request.status = 'completed';
            }

            break;
          }

        case 'execute.next':
          {
            var _request = requests.get(event.transactionID);

            if (_request != null) {
              _request.responses.push(event.response);
            }

            break;
          }

        case 'execute.info':
          {
            var _request2 = requests.get(event.transactionID);

            if (_request2 != null) {
              _request2.infos.push(event.info);
            }

            break;
          }

        case 'execute.unsubscribe':
          {
            var _request3 = requests.get(event.transactionID);

            if (_request3 != null) {
              _request3.status = 'unsubscribed';
            }

            break;
          }

        case 'execute.error':
          {
            var _request4 = requests.get(event.transactionID);

            if (_request4 != null) {
              _request4.status = 'error';
            }

            break;
          }

        case 'queryresource.fetch':
          // ignore
          break;

        default:
          {
            /*:: (event.name: null); */
            break; // ignore unknown events
          }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var selectedRequest = requests.get(selectedRequestID);
  var requestRows = Array.from(requests.values(), function (request) {
    var _selectedRequest;

    if (selectedRequest == null) {
      selectedRequest = request;
    }

    var statusClass;

    switch (request.status) {
      case 'unsubscribed':
        statusClass = Network_default.a.StatusUnsubscribed;
        break;

      case 'error':
        statusClass = Network_default.a.StatusError;
        break;

      case 'active':
        statusClass = Network_default.a.StatusActive;
        break;

      default:
        statusClass = '';
        break;
    }

    return /*#__PURE__*/react_default.a.createElement("div", {
      key: request.id,
      onClick: function onClick() {
        setSelectedRequestID(request.id);
      },
      className: "".concat(Network_default.a.Request, " ").concat(request.id === ((_selectedRequest = selectedRequest) === null || _selectedRequest === void 0 ? void 0 : _selectedRequest.id) ? Network_default.a.SelectedRequest : '', " ").concat(statusClass)
    }, request.params.name, " (", request.status, ")");
  });
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.Network
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.Toolbar
  }, /*#__PURE__*/react_default.a.createElement(Button_Button, {
    onClick: store.clearEvents,
    title: "Clear Logs"
  }, /*#__PURE__*/react_default.a.createElement(ButtonIcon_ButtonIcon, {
    type: "clear"
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.Spacer
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.Content
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: Network_default.a.Requests
  }, requestRows), /*#__PURE__*/react_default.a.createElement(RequestDetails, {
    request: selectedRequest
  })));
}

/* harmony default export */ var views_Network_Network = (portaledContent(Network_Network));
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Icon.css
var Icon = __webpack_require__(35);
var Icon_default = /*#__PURE__*/__webpack_require__.n(Icon);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Icon.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function Icon_Icon(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      type = _ref.type;
  var pathData = null;

  switch (type) {
    case 'arrow':
      pathData = PATH_ARROW;
      break;

    case 'components':
      pathData = PATH_COMPONENTS;
      break;

    case 'flame-chart':
      pathData = PATH_FLAME_CHART;
      break;

    case 'interactions':
      pathData = PATH_INTERACTIONS;
      break;

    case 'network':
      // TODO add network icon
      pathData = PATH_RANKED_CHART;
      break;

    case 'ranked-chart':
      pathData = PATH_RANKED_CHART;
      break;

    case 'search':
      pathData = Icon_PATH_SEARCH;
      break;

    case 'store-inspector':
      pathData = Icon_PATH_SEARCH;
      break;

    case 'settings':
      pathData = Icon_PATH_SETTINGS;
      break;

    default:
      console.warn("Unsupported type \"".concat(type, "\" specified for Icon"));
      break;
  }

  return /*#__PURE__*/react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "".concat(Icon_default.a.Icon, " ").concat(className),
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    fill: "currentColor",
    d: pathData
  }));
}
var PATH_ARROW = 'M8 5v14l11-7z';
var PATH_COMPONENTS = 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z';
var PATH_FLAME_CHART = "\n  M10.0650893,21.5040462 C7.14020814,20.6850349 5,18.0558698 5,14.9390244 C5,14.017627\n  5,9.81707317 7.83333333,7.37804878 C7.83333333,7.37804878 7.58333333,11.199187 10,\n  10.6300813 C11.125,10.326087 13.0062497,7.63043487 8.91666667,2.5 C14.1666667,3.06910569\n  19,9.32926829 19,14.9390244 C19,18.0558698 16.8597919,20.6850349 13.9349107,21.5040462\n  C14.454014,21.0118505 14.7765152,20.3233394 14.7765152,19.5613412 C14.7765152,17.2826087\n  12,15.0875871 12,15.0875871 C12,15.0875871 9.22348485,17.2826087 9.22348485,19.5613412\n  C9.22348485,20.3233394 9.54598603,21.0118505 10.0650893,21.5040462 Z M12.0833333,20.6514763\n  C11.3814715,20.6514763 10.8125,20.1226027 10.8125,19.4702042 C10.8125,18.6069669\n  12.0833333,16.9347829 12.0833333,16.9347829 C12.0833333,16.9347829 13.3541667,18.6069669\n  13.3541667,19.4702042 C13.3541667,20.1226027 12.7851952,20.6514763 12.0833333,20.6514763 Z\n";
var PATH_INTERACTIONS = "\n  M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2\n  2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55\n  4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02\n  9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55\n  2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z\n";
var Icon_PATH_SEARCH = "\n  M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91\n  16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99\n  5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\n";
var PATH_RANKED_CHART = 'M3 5h18v3H3zM3 10.5h13v3H3zM3 16h8v3H3z';
var Icon_PATH_SETTINGS = "\n  M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12\n  2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39\n  0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69\n  1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58\n  1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0\n  .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z\n";
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/SearchInput.css
var SearchInput = __webpack_require__(17);
var SearchInput_default = /*#__PURE__*/__webpack_require__.n(SearchInput);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Components/SearchInput.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




function SearchInput_SearchInput(_ref) {
  var searchText = _ref.searchText,
      onChange = _ref.onChange;
  var inputRef = Object(react["useRef"])(null);
  var handleTextChange = Object(react["useCallback"])(function (_ref2) {
    var currentTarget = _ref2.currentTarget;
    return onChange(currentTarget.value);
  }, [onChange]); // Auto-focus search input

  Object(react["useEffect"])(function () {
    if (inputRef.current === null) {
      return function () {};
    }

    var handleWindowKey = function handleWindowKey(event) {
      var key = event.key,
          metaKey = event.metaKey;

      if (key === 'f' && metaKey) {
        if (inputRef.current !== null) {
          inputRef.current.focus();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }; // It's important to listen to the ownerDocument to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.


    var ownerDocument = inputRef.current.ownerDocument;
    ownerDocument.addEventListener('keydown', handleWindowKey);
    return function () {
      return ownerDocument.removeEventListener('keydown', handleWindowKey);
    };
  }, [inputRef]);
  return /*#__PURE__*/react["createElement"]("div", {
    className: SearchInput_default.a.SearchInput
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: SearchInput_default.a.InputIcon,
    type: "search"
  }), /*#__PURE__*/react["createElement"]("input", {
    className: SearchInput_default.a.Input,
    onChange: handleTextChange,
    placeholder: "Search (ID or type)",
    ref: inputRef,
    value: searchText
  }));
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/StoreInspector/StoreInspector.css
var StoreInspector = __webpack_require__(6);
var StoreInspector_default = /*#__PURE__*/__webpack_require__.n(StoreInspector);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/StoreInspector/StoreInspector.js
function StoreInspector_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = StoreInspector_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function StoreInspector_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function StoreInspector_slicedToArray(arr, i) { return StoreInspector_arrayWithHoles(arr) || StoreInspector_iterableToArrayLimit(arr, i) || StoreInspector_unsupportedIterableToArray(arr, i) || StoreInspector_nonIterableRest(); }

function StoreInspector_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function StoreInspector_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return StoreInspector_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return StoreInspector_arrayLikeToArray(o, minLen); }

function StoreInspector_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function StoreInspector_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function StoreInspector_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function StoreInspector_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { StoreInspector_typeof = function _typeof(obj) { return typeof obj; }; } else { StoreInspector_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return StoreInspector_typeof(obj); }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */







function getRecordData(records, record) {
  if (Array.isArray(record)) {
    return record.map(function (r) {
      return getRecordData(records, r);
    });
  } else if (record !== null && StoreInspector_typeof(record) === 'object') {
    var result = {};

    for (var _i = 0, _Object$entries = Object.entries(record); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = StoreInspector_slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (key === '__ref') {
        result = getRecordData(records, records[value]);
      } else if (key === '__refs') {
        result = value.map(function (r) {
          return getRecordData(records, records[r]);
        });
      } else {
        result[key] = getRecordData(records, value);
      }
    }

    return result;
  } else {
    return record;
  }
}

function StoreInspector_Section(props) {
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.SectionTitle
  }, props.title), /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.SectionContent
  }, props.children));
}

function RecordsList(_ref) {
  var records = _ref.records,
      selectedRecordID = _ref.selectedRecordID,
      setSelectedRecordID = _ref.setSelectedRecordID;

  var _useState = Object(react["useState"])(''),
      _useState2 = StoreInspector_slicedToArray(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1];

  var handleSearchTextChange = Object(react["useCallback"])(function (text) {
    setSearchText(text);
  }, []);
  var recordRows = Object.keys(records).filter(function (recordID) {
    return searchText.length === 0 || recordID.startsWith(searchText) || records[recordID].__typename.startsWith(searchText);
  }).map(function (recordID) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      key: recordID,
      onClick: function onClick() {
        setSelectedRecordID(recordID);
      },
      className: "".concat(StoreInspector_default.a.Record, " ").concat(recordID === selectedRecordID ? StoreInspector_default.a.SelectedRequest : '')
    }, recordID);
  });
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.Records
  }, /*#__PURE__*/react_default.a.createElement(SearchInput_SearchInput, {
    searchText: searchText,
    onChange: handleSearchTextChange
  }), recordRows, ">");
}

function RecordDetails(_ref2) {
  var record = _ref2.record,
      records = _ref2.records;

  if (record == null) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: StoreInspector_default.a.RecordDetails
    }, "No record selected");
  }

  var __id = record.__id,
      __typename = record.__typename,
      data = StoreInspector_objectWithoutProperties(record, ["__id", "__typename"]);

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.RecordDetails
  }, /*#__PURE__*/react_default.a.createElement(StoreInspector_Section, {
    title: "ID"
  }, __id), /*#__PURE__*/react_default.a.createElement(StoreInspector_Section, {
    title: "Type"
  }, __typename), /*#__PURE__*/react_default.a.createElement(InspectedElementTree_InspectedElementTree, {
    label: "Data",
    data: getRecordData(records, data),
    showWhenEmpty: true
  }));
}

function StoreInspector_StoreInspector(props) {
  var store = Object(react["useContext"])(StoreContext);

  var _useState3 = Object(react["useState"])({}),
      _useState4 = StoreInspector_slicedToArray(_useState3, 2),
      forceUpdate = _useState4[1];

  Object(react["useEffect"])(function () {
    var onMutated = function onMutated() {
      forceUpdate({});
    };

    store.addListener('mutated', onMutated);
    return function () {
      store.removeListener('mutated', onMutated);
    };
  }, [store]);
  var records = store.getRecords();

  var _useState5 = Object(react["useState"])(null),
      _useState6 = StoreInspector_slicedToArray(_useState5, 2),
      selectedRecordID = _useState6[0],
      setSelectedRecordID = _useState6[1];

  if (records == null) {
    return 'Loading...';
  }

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.StoreInspector
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: StoreInspector_default.a.Content
  }, /*#__PURE__*/react_default.a.createElement(RecordsList, {
    records: records,
    selectedRecordID: selectedRecordID,
    setSelectedRecordID: setSelectedRecordID
  }), /*#__PURE__*/react_default.a.createElement(RecordDetails, {
    records: records,
    record: records[selectedRecordID]
  })));
}

/* harmony default export */ var views_StoreInspector_StoreInspector = (portaledContent(StoreInspector_StoreInspector));
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/classnames/index.js
var classnames = __webpack_require__(36);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/TabBar.css
var TabBar = __webpack_require__(5);
var TabBar_default = /*#__PURE__*/__webpack_require__.n(TabBar);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/TabBar.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */






function TabBar_TabBar(_ref) {
  var currentTab = _ref.currentTab,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      groupName = _ref.id,
      selectTab = _ref.selectTab,
      size = _ref.size,
      tabs = _ref.tabs;

  if (!tabs.some(function (tab) {
    return tab.id === currentTab;
  })) {
    selectTab(tabs[0].id);
  }

  var onChange = Object(react["useCallback"])(function (_ref2) {
    var currentTarget = _ref2.currentTarget;
    return selectTab(currentTarget.value);
  }, [selectTab]);
  var handleKeyDown = Object(react["useCallback"])(function (event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
        event.stopPropagation();
        break;

      default:
        break;
    }
  }, []);
  var tabClassName = size === 'large' ? TabBar_default.a.TabSizeLarge : TabBar_default.a.TabSizeSmall;
  return /*#__PURE__*/react_default.a.createElement(react["Fragment"], null, tabs.map(function (_ref3) {
    var icon = _ref3.icon,
        id = _ref3.id,
        label = _ref3.label,
        title = _ref3.title;
    var button = /*#__PURE__*/react_default.a.createElement("label", {
      className: classnames_default()(tabClassName, disabled ? TabBar_default.a.TabDisabled : TabBar_default.a.Tab, !disabled && currentTab === id ? TabBar_default.a.TabCurrent : null),
      key: id,
      onKeyDown: handleKeyDown,
      onMouseDown: function onMouseDown() {
        return selectTab(id);
      }
    }, /*#__PURE__*/react_default.a.createElement("input", {
      type: "radio",
      className: TabBar_default.a.Input,
      checked: currentTab === id,
      disabled: disabled,
      name: groupName,
      value: id,
      onChange: onChange
    }), /*#__PURE__*/react_default.a.createElement(Icon_Icon, {
      className: "".concat(disabled ? TabBar_default.a.IconDisabled : '', " ").concat(size === 'large' ? TabBar_default.a.IconSizeLarge : TabBar_default.a.IconSizeSmall),
      type: icon
    }), /*#__PURE__*/react_default.a.createElement("span", {
      className: size === 'large' ? TabBar_default.a.TabLabelLarge : TabBar_default.a.TabLabelSmall
    }, label));

    if (title) {
      button = /*#__PURE__*/react_default.a.createElement(tooltip_esm, {
        key: id,
        className: Tooltip_default.a.Tooltip,
        label: title
      }, button);
    }

    return button;
  }));
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/node_modules/lodash.throttle/index.js
var lodash_throttle = __webpack_require__(37);
var lodash_throttle_default = /*#__PURE__*/__webpack_require__.n(lodash_throttle);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/storage.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function localStorageGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}
function localStorageSetItem(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {}
}
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/hooks.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { hooks_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function hooks_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hooks_slicedToArray(arr, i) { return hooks_arrayWithHoles(arr) || hooks_iterableToArrayLimit(arr, i) || hooks_unsupportedIterableToArray(arr, i) || hooks_nonIterableRest(); }

function hooks_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function hooks_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return hooks_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return hooks_arrayLikeToArray(o, minLen); }

function hooks_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function hooks_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function hooks_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



function useIsOverflowing(containerRef, totalChildWidth) {
  var _useState = Object(react["useState"])(false),
      _useState2 = hooks_slicedToArray(_useState, 2),
      isOverflowing = _useState2[0],
      setIsOverflowing = _useState2[1]; // It's important to use a layout effect, so that we avoid showing a flash of overflowed content.


  Object(react["useLayoutEffect"])(function () {
    if (containerRef.current === null) {
      return function () {};
    }

    var container = containerRef.current;
    var handleResize = lodash_throttle_default()(function () {
      return setIsOverflowing(container.clientWidth <= totalChildWidth);
    }, 100);
    handleResize(); // It's important to listen to the ownerDocument.defaultView to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.

    var ownerWindow = container.ownerDocument.defaultView;
    ownerWindow.addEventListener('resize', handleResize);
    return function () {
      return ownerWindow.removeEventListener('resize', handleResize);
    };
  }, [containerRef, totalChildWidth]);
  return isOverflowing;
} // Forked from https://usehooks.com/useLocalStorage/

function useLocalStorage(key, initialValue) {
  var getValueFromLocalStorage = Object(react["useCallback"])(function () {
    try {
      var item = localStorageGetItem(key);

      if (item != null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.log(error);
    }

    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  }, [initialValue, key]);

  var _useState3 = Object(react["useState"])(getValueFromLocalStorage),
      _useState4 = hooks_slicedToArray(_useState3, 2),
      storedValue = _useState4[0],
      setStoredValue = _useState4[1];

  var setValue = Object(react["useCallback"])(function (value) {
    try {
      var valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorageSetItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]); // Listen for changes to this local storage value made from other windows.
  // This enables the e.g. "⚛️ Elements" tab to update in response to changes from "⚛️ Settings".

  Object(react["useLayoutEffect"])(function () {
    var onStorage = function onStorage(event) {
      var newValue = getValueFromLocalStorage();

      if (key === event.key && storedValue !== newValue) {
        setValue(newValue);
      }
    };

    window.addEventListener('storage', onStorage);
    return function () {
      window.removeEventListener('storage', onStorage);
    };
  }, [getValueFromLocalStorage, key, storedValue, setValue]);
  return [storedValue, setValue];
}
function useModalDismissSignal(modalRef, dismissCallback) {
  Object(react["useEffect"])(function () {
    if (modalRef.current === null) {
      return function () {};
    }

    var handleKeyDown = function handleKeyDown(_ref) {
      var key = _ref.key;

      if (key === 'Escape') {
        dismissCallback();
      }
    };

    var handleClick = function handleClick(event) {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        event.stopPropagation();
        event.preventDefault();
        dismissCallback();
      }
    }; // It's important to listen to the ownerDocument to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.


    var ownerDocument = modalRef.current.ownerDocument;
    ownerDocument.addEventListener('keydown', handleKeyDown);
    ownerDocument.addEventListener('click', handleClick);
    return function () {
      ownerDocument.removeEventListener('keydown', handleKeyDown);
      ownerDocument.removeEventListener('click', handleClick);
    };
  }, [modalRef, dismissCallback]);
} // Copied from https://github.com/facebook/react/pull/15022

function useSubscription(_ref2) {
  var getCurrentValue = _ref2.getCurrentValue,
      subscribe = _ref2.subscribe;

  var _useState5 = Object(react["useState"])({
    getCurrentValue: getCurrentValue,
    subscribe: subscribe,
    value: getCurrentValue()
  }),
      _useState6 = hooks_slicedToArray(_useState5, 2),
      state = _useState6[0],
      setState = _useState6[1];

  if (state.getCurrentValue !== getCurrentValue || state.subscribe !== subscribe) {
    setState({
      getCurrentValue: getCurrentValue,
      subscribe: subscribe,
      value: getCurrentValue()
    });
  }

  Object(react["useEffect"])(function () {
    var didUnsubscribe = false;

    var checkForUpdates = function checkForUpdates() {
      if (didUnsubscribe) {
        return;
      }

      setState(function (prevState) {
        if (prevState.getCurrentValue !== getCurrentValue || prevState.subscribe !== subscribe) {
          return prevState;
        }

        var value = getCurrentValue();

        if (prevState.value === value) {
          return prevState;
        }

        return _objectSpread({}, prevState, {
          value: value
        });
      });
    };

    var unsubscribe = subscribe(checkForUpdates);
    checkForUpdates();
    return function () {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [getCurrentValue, subscribe]);
  return state.value;
}
// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/Settings/SettingsContext.js
function SettingsContext_slicedToArray(arr, i) { return SettingsContext_arrayWithHoles(arr) || SettingsContext_iterableToArrayLimit(arr, i) || SettingsContext_unsupportedIterableToArray(arr, i) || SettingsContext_nonIterableRest(); }

function SettingsContext_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function SettingsContext_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SettingsContext_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SettingsContext_arrayLikeToArray(o, minLen); }

function SettingsContext_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function SettingsContext_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function SettingsContext_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


var SettingsContext = Object(react["createContext"])(null);
SettingsContext.displayName = 'SettingsContext';

function SettingsContextController(_ref) {
  var browserTheme = _ref.browserTheme,
      children = _ref.children,
      networkPortalContainer = _ref.networkPortalContainer,
      settingsPortalContainer = _ref.settingsPortalContainer;

  var _useLocalStorage = useLocalStorage('Relay::DevTools::displayDensity', 'compact'),
      _useLocalStorage2 = SettingsContext_slicedToArray(_useLocalStorage, 2),
      displayDensity = _useLocalStorage2[0],
      setDisplayDensity = _useLocalStorage2[1];

  var _useLocalStorage3 = useLocalStorage('Relay::DevTools::theme', 'auto'),
      _useLocalStorage4 = SettingsContext_slicedToArray(_useLocalStorage3, 2),
      theme = _useLocalStorage4[0],
      setTheme = _useLocalStorage4[1];

  var documentElements = Object(react["useMemo"])(function () {
    var array = [document.documentElement];

    if (networkPortalContainer != null) {
      array.push(networkPortalContainer.ownerDocument.documentElement);
    }

    if (settingsPortalContainer != null) {
      array.push(settingsPortalContainer.ownerDocument.documentElement);
    }

    return array;
  }, [networkPortalContainer, settingsPortalContainer]);
  var computedStyle = getComputedStyle(document.body);
  var comfortableLineHeight = parseInt(computedStyle.getPropertyValue('--comfortable-line-height-data'), 10);
  var compactLineHeight = parseInt(computedStyle.getPropertyValue('--compact-line-height-data'), 10);
  Object(react["useLayoutEffect"])(function () {
    switch (displayDensity) {
      case 'comfortable':
        updateDisplayDensity('comfortable', documentElements);
        break;

      case 'compact':
        updateDisplayDensity('compact', documentElements);
        break;

      default:
        throw Error("Unsupported displayDensity value \"".concat(displayDensity, "\""));
    }
  }, [displayDensity, documentElements]);
  Object(react["useLayoutEffect"])(function () {
    switch (theme) {
      case 'light':
        updateThemeVariables('light', documentElements);
        break;

      case 'dark':
        updateThemeVariables('dark', documentElements);
        break;

      case 'auto':
        updateThemeVariables(browserTheme, documentElements);
        break;

      default:
        throw Error("Unsupported theme value \"".concat(theme, "\""));
    }
  }, [browserTheme, theme, documentElements]);
  var value = Object(react["useMemo"])(function () {
    return {
      displayDensity: displayDensity,
      setDisplayDensity: setDisplayDensity,
      theme: theme,
      setTheme: setTheme,
      lineHeight: displayDensity === 'compact' ? compactLineHeight : comfortableLineHeight
    };
  }, [comfortableLineHeight, compactLineHeight, displayDensity, setDisplayDensity, setTheme, theme]);
  return /*#__PURE__*/react_default.a.createElement(SettingsContext.Provider, {
    value: value
  }, children);
}

function setStyleVariable(name, value, documentElements) {
  documentElements.forEach(function (documentElement) {
    return documentElement.style.setProperty(name, value);
  });
}

function updateStyleHelper(themeKey, style, documentElements) {
  setStyleVariable("--".concat(style), "var(--".concat(themeKey, "-").concat(style, ")"), documentElements);
}

function updateDisplayDensity(displayDensity, documentElements) {
  updateStyleHelper(displayDensity, 'font-size-monospace-normal', documentElements);
  updateStyleHelper(displayDensity, 'font-size-monospace-large', documentElements);
  updateStyleHelper(displayDensity, 'font-size-monospace-small', documentElements);
  updateStyleHelper(displayDensity, 'font-size-sans-normal', documentElements);
  updateStyleHelper(displayDensity, 'font-size-sans-large', documentElements);
  updateStyleHelper(displayDensity, 'font-size-sans-small', documentElements);
  updateStyleHelper(displayDensity, 'line-height-data', documentElements); // Sizes and paddings/margins are all rem-based,
  // so update the root font-size as well when the display preference changes.

  var computedStyle = getComputedStyle(document.body);
  var fontSize = computedStyle.getPropertyValue("--".concat(displayDensity, "-root-font-size"));
  var root = document.querySelector(':root');
  root.style.fontSize = fontSize;
}

function updateThemeVariables(theme, documentElements) {
  updateStyleHelper(theme, 'color-attribute-name', documentElements);
  updateStyleHelper(theme, 'color-attribute-name-inverted', documentElements);
  updateStyleHelper(theme, 'color-attribute-value', documentElements);
  updateStyleHelper(theme, 'color-attribute-value-inverted', documentElements);
  updateStyleHelper(theme, 'color-attribute-editable-value', documentElements);
  updateStyleHelper(theme, 'color-background', documentElements);
  updateStyleHelper(theme, 'color-background-hover', documentElements);
  updateStyleHelper(theme, 'color-background-inactive', documentElements);
  updateStyleHelper(theme, 'color-background-invalid', documentElements);
  updateStyleHelper(theme, 'color-background-selected', documentElements);
  updateStyleHelper(theme, 'color-border', documentElements);
  updateStyleHelper(theme, 'color-button-background', documentElements);
  updateStyleHelper(theme, 'color-button-background-focus', documentElements);
  updateStyleHelper(theme, 'color-button', documentElements);
  updateStyleHelper(theme, 'color-button-active', documentElements);
  updateStyleHelper(theme, 'color-button-disabled', documentElements);
  updateStyleHelper(theme, 'color-button-focus', documentElements);
  updateStyleHelper(theme, 'color-button-hover', documentElements);
  updateStyleHelper(theme, 'color-commit-did-not-render-fill', documentElements);
  updateStyleHelper(theme, 'color-commit-did-not-render-fill-text', documentElements);
  updateStyleHelper(theme, 'color-commit-did-not-render-pattern', documentElements);
  updateStyleHelper(theme, 'color-commit-did-not-render-pattern-text', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-0', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-1', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-2', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-3', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-4', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-5', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-6', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-7', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-8', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-9', documentElements);
  updateStyleHelper(theme, 'color-commit-gradient-text', documentElements);
  updateStyleHelper(theme, 'color-component-name', documentElements);
  updateStyleHelper(theme, 'color-component-name-inverted', documentElements);
  updateStyleHelper(theme, 'color-component-badge-background', documentElements);
  updateStyleHelper(theme, 'color-component-badge-background-inverted', documentElements);
  updateStyleHelper(theme, 'color-component-badge-count', documentElements);
  updateStyleHelper(theme, 'color-component-badge-count-inverted', documentElements);
  updateStyleHelper(theme, 'color-dim', documentElements);
  updateStyleHelper(theme, 'color-dimmer', documentElements);
  updateStyleHelper(theme, 'color-dimmest', documentElements);
  updateStyleHelper(theme, 'color-expand-collapse-toggle', documentElements);
  updateStyleHelper(theme, 'color-modal-background', documentElements);
  updateStyleHelper(theme, 'color-record-active', documentElements);
  updateStyleHelper(theme, 'color-record-hover', documentElements);
  updateStyleHelper(theme, 'color-record-inactive', documentElements);
  updateStyleHelper(theme, 'color-color-scroll-thumb', documentElements);
  updateStyleHelper(theme, 'color-color-scroll-track', documentElements);
  updateStyleHelper(theme, 'color-search-match', documentElements);
  updateStyleHelper(theme, 'color-search-match-current', documentElements);
  updateStyleHelper(theme, 'color-selected-tree-highlight-active', documentElements);
  updateStyleHelper(theme, 'color-selected-tree-highlight-inactive', documentElements);
  updateStyleHelper(theme, 'color-tab-selected-border', documentElements);
  updateStyleHelper(theme, 'color-text', documentElements);
  updateStyleHelper(theme, 'color-text-invalid', documentElements);
  updateStyleHelper(theme, 'color-text-selected', documentElements);
  updateStyleHelper(theme, 'color-toggle-background-invalid', documentElements);
  updateStyleHelper(theme, 'color-toggle-background-on', documentElements);
  updateStyleHelper(theme, 'color-toggle-background-off', documentElements);
  updateStyleHelper(theme, 'color-toggle-text', documentElements);
  updateStyleHelper(theme, 'color-tooltip-background', documentElements);
  updateStyleHelper(theme, 'color-tooltip-text', documentElements); // Font smoothing varies based on the theme.

  updateStyleHelper(theme, 'font-smoothing', documentElements); // Update scrollbar color to match theme.
  // this CSS property is currently only supported in Firefox,
  // but it makes a significant UI improvement in dark mode.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color

  documentElements.forEach(function (documentElement) {
    // $FlowFixMe scrollbarColor is missing in CSSStyleDeclaration
    documentElement.style.scrollbarColor = "var(".concat("--".concat(theme, "-color-scroll-thumb"), ") var(", "--".concat(theme, "-color-scroll-track"), ")");
  });
}


// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ModalDialog.css
var ModalDialog = __webpack_require__(13);
var ModalDialog_default = /*#__PURE__*/__webpack_require__.n(ModalDialog);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/ModalDialog.js
function ModalDialog_slicedToArray(arr, i) { return ModalDialog_arrayWithHoles(arr) || ModalDialog_iterableToArrayLimit(arr, i) || ModalDialog_unsupportedIterableToArray(arr, i) || ModalDialog_nonIterableRest(); }

function ModalDialog_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ModalDialog_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ModalDialog_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ModalDialog_arrayLikeToArray(o, minLen); }

function ModalDialog_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ModalDialog_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ModalDialog_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */




var ModalDialogContext = Object(react["createContext"])(null);
ModalDialogContext.displayName = 'ModalDialogContext';

function dialogReducer(state, action) {
  switch (action.type) {
    case 'HIDE':
      return {
        content: null,
        isVisible: false,
        title: null
      };

    case 'SHOW':
      return {
        content: action.content,
        isVisible: true,
        title: action.title || null
      };

    default:
      throw new Error("Invalid action \"".concat(action.type, "\""));
  }
}

function ModalDialogContextController(_ref) {
  var children = _ref.children;

  var _useReducer = Object(react["useReducer"])(dialogReducer, {
    content: null,
    isVisible: false,
    title: null
  }),
      _useReducer2 = ModalDialog_slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var value = Object(react["useMemo"])(function () {
    return {
      content: state.content,
      isVisible: state.isVisible,
      title: state.title,
      dispatch: dispatch
    };
  }, [state, dispatch]);
  return /*#__PURE__*/react_default.a.createElement(ModalDialogContext.Provider, {
    value: value
  }, children);
}

function ModalDialog_ModalDialog(_) {
  var _useContext = Object(react["useContext"])(ModalDialogContext),
      isVisible = _useContext.isVisible;

  return isVisible ? /*#__PURE__*/react_default.a.createElement(ModalDialogImpl, null) : null;
}

function ModalDialogImpl(_) {
  var _useContext2 = Object(react["useContext"])(ModalDialogContext),
      content = _useContext2.content,
      dispatch = _useContext2.dispatch,
      title = _useContext2.title;

  var dismissModal = Object(react["useCallback"])(function () {
    return dispatch({
      type: 'HIDE'
    });
  }, [dispatch]);
  var modalRef = Object(react["useRef"])(null);
  useModalDismissSignal(modalRef, dismissModal);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: ModalDialog_default.a.Background
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: ModalDialog_default.a.Dialog,
    ref: modalRef
  }, title !== null && /*#__PURE__*/react_default.a.createElement("div", {
    className: ModalDialog_default.a.Title
  }, title), content, /*#__PURE__*/react_default.a.createElement("div", {
    className: ModalDialog_default.a.Buttons
  }, /*#__PURE__*/react_default.a.createElement(Button_Button, {
    autoFocus: true,
    onClick: dismissModal
  }, "Okay"))));
}


// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/RelayLogo.css
var RelayLogo = __webpack_require__(38);
var RelayLogo_default = /*#__PURE__*/__webpack_require__.n(RelayLogo);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/RelayLogo.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function RelayLogo_RelayLogo() {
  return /*#__PURE__*/react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: RelayLogo_default.a.RelayLogo,
    width: "600",
    height: "600",
    viewBox: "0 0 600 600"
  }, /*#__PURE__*/react_default.a.createElement("g", {
    fill: "currentColor"
  }, /*#__PURE__*/react_default.a.createElement("path", {
    d: "M142.536 198.858c0 26.36-21.368 47.72-47.72 47.72-26.36 0-47.722-21.36-47.722-47.72s21.36-47.72 47.72-47.72c26.355 0 47.722 21.36 47.722 47.72"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M505.18 414.225H238.124c-35.25 0-63.926-28.674-63.926-63.923s28.678-63.926 63.926-63.926h120.78c20.816 0 37.753-16.938 37.753-37.756s-16.938-37.756-37.753-37.756H94.81c-7.227 0-13.086-5.86-13.086-13.085 0-7.227 5.86-13.086 13.085-13.086h264.093c35.25 0 63.923 28.678 63.923 63.926s-28.674 63.923-63.923 63.923h-120.78c-20.82 0-37.756 16.938-37.756 37.76 0 20.816 16.938 37.753 37.756 37.753H505.18c7.227 0 13.086 5.86 13.086 13.085 0 7.226-5.858 13.085-13.085 13.085z"
  }), /*#__PURE__*/react_default.a.createElement("path", {
    d: "M457.464 401.142c0-26.36 21.36-47.72 47.72-47.72s47.72 21.36 47.72 47.72-21.36 47.72-47.72 47.72-47.72-21.36-47.72-47.72"
  })));
}
// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/DevTools.css
var DevTools = __webpack_require__(8);
var DevTools_default = /*#__PURE__*/__webpack_require__.n(DevTools);

// EXTERNAL MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/root.css
var root = __webpack_require__(74);

// CONCATENATED MODULE: /Users/janic/Developer/relay-devtools/src/devtools/views/DevTools.js
function DevTools_slicedToArray(arr, i) { return DevTools_arrayWithHoles(arr) || DevTools_iterableToArrayLimit(arr, i) || DevTools_unsupportedIterableToArray(arr, i) || DevTools_nonIterableRest(); }

function DevTools_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function DevTools_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return DevTools_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DevTools_arrayLikeToArray(o, minLen); }

function DevTools_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function DevTools_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function DevTools_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// Reach styles need to come before any component styles.
// This makes overridding the styles simpler.













var networkTab = {
  id: 'network',
  icon: 'network',
  label: 'Network',
  title: 'Relay Network'
};
var storeInspectorTab = {
  id: 'store-inspector',
  icon: 'store-inspector',
  label: 'Store',
  title: 'Relay Store'
};
var DevTools_tabs = [networkTab, storeInspectorTab];
function DevTools_DevTools(_ref) {
  var bridge = _ref.bridge,
      _ref$browserTheme = _ref.browserTheme,
      browserTheme = _ref$browserTheme === void 0 ? 'light' : _ref$browserTheme,
      _ref$defaultTab = _ref.defaultTab,
      defaultTab = _ref$defaultTab === void 0 ? 'network' : _ref$defaultTab,
      networkPortalContainer = _ref.networkPortalContainer,
      storeInspectorPortalContainer = _ref.storeInspectorPortalContainer,
      overrideTab = _ref.overrideTab,
      settingsPortalContainer = _ref.settingsPortalContainer,
      _ref$showTabBar = _ref.showTabBar,
      showTabBar = _ref$showTabBar === void 0 ? false : _ref$showTabBar,
      store = _ref.store,
      viewElementSourceFunction = _ref.viewElementSourceFunction,
      _ref$viewElementSourc = _ref.viewElementSourceRequiresFileLocation,
      viewElementSourceRequiresFileLocation = _ref$viewElementSourc === void 0 ? false : _ref$viewElementSourc;

  var _useState = Object(react["useState"])(defaultTab),
      _useState2 = DevTools_slicedToArray(_useState, 2),
      tab = _useState2[0],
      setTab = _useState2[1];

  if (overrideTab != null && overrideTab !== tab) {
    setTab(overrideTab);
  }

  return /*#__PURE__*/react_default.a.createElement(BridgeContext.Provider, {
    value: bridge
  }, /*#__PURE__*/react_default.a.createElement(StoreContext.Provider, {
    value: store
  }, /*#__PURE__*/react_default.a.createElement(ModalDialogContextController, null, /*#__PURE__*/react_default.a.createElement(SettingsContextController, {
    browserTheme: browserTheme,
    networkPortalContainer: networkPortalContainer,
    settingsPortalContainer: settingsPortalContainer
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: DevTools_default.a.DevTools
  }, showTabBar && /*#__PURE__*/react_default.a.createElement("div", {
    className: DevTools_default.a.TabBar
  }, /*#__PURE__*/react_default.a.createElement(RelayLogo_RelayLogo, null), /*#__PURE__*/react_default.a.createElement("span", {
    className: DevTools_default.a.DevToolsVersion
  }, "1.0.0-c1afb10"), /*#__PURE__*/react_default.a.createElement("div", {
    className: DevTools_default.a.Spacer
  }), /*#__PURE__*/react_default.a.createElement(TabBar_TabBar, {
    currentTab: tab,
    id: "DevTools",
    selectTab: setTab,
    size: "large",
    tabs: DevTools_tabs
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: DevTools_default.a.TabContent,
    hidden: tab !== 'network'
  }, /*#__PURE__*/react_default.a.createElement(views_Network_Network, {
    portalContainer: networkPortalContainer
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: DevTools_default.a.TabContent,
    hidden: tab !== 'store-inspector'
  }, /*#__PURE__*/react_default.a.createElement(views_StoreInspector_StoreInspector, {
    portalContainer: storeInspectorPortalContainer
  })))))));
}
// CONCATENATED MODULE: ./src/standalone.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */









installHook(window);
var node = null;
var nodeWaitingToConnectHTML = '';

var statusListener = function statusListener(message) {};

function setContentDOMNode(value) {
  node = value; // Save so we can restore the exact waiting message between sessions.

  nodeWaitingToConnectHTML = node.innerHTML;
  return DevtoolsUI;
}

function setStatusListener(value) {
  statusListener = value;
  return DevtoolsUI;
}

var standalone_bridge = null;
var standalone_store = null;
var standalone_root = null;

var log = function log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_console = console).log.apply(_console, ['[Relay DevTools]'].concat(args));
};

log.warn = function () {
  var _console2;

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return (_console2 = console).warn.apply(_console2, ['[Relay DevTools]'].concat(args));
};

log.error = function () {
  var _console3;

  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return (_console3 = console).error.apply(_console3, ['[Relay DevTools]'].concat(args));
};

function standalone_debug(methodName) {
  if (__DEBUG__) {
    var _console4;

    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    (_console4 = console).log.apply(_console4, ["%c[core/standalone] %c".concat(methodName), 'color: teal; font-weight: bold;', 'font-weight: bold;'].concat(args));
  }
}

function safeUnmount() {
  Object(react_dom["flushSync"])(function () {
    if (standalone_root !== null) {
      standalone_root.unmount();
    }
  });
  standalone_root = null;
}

function reload() {
  safeUnmount();
  node.innerHTML = '';
  setTimeout(function () {
    standalone_root = Object(react_dom["unstable_createRoot"])(node);
    standalone_root.render(Object(react["createElement"])(DevTools_DevTools, {
      bridge: standalone_bridge,
      showTabBar: true,
      store: standalone_store,
      viewElementSourceRequiresFileLocation: true
    }));
  }, 100);
}

function onDisconnected() {
  safeUnmount();
  node.innerHTML = nodeWaitingToConnectHTML;
}

function onError(_ref) {
  var code = _ref.code,
      message = _ref.message;
  safeUnmount();

  if (code === 'EADDRINUSE') {
    node.innerHTML = "<div id=\"waiting\"><h2>Another instance of DevTools is running</h2></div>";
  } else {
    node.innerHTML = "<div id=\"waiting\"><h2>Unknown error (".concat(message, ")</h2></div>");
  }
}

function initialize(socket) {
  var listeners = [];

  socket.onmessage = function (event) {
    var data;

    try {
      if (typeof event.data === 'string') {
        data = JSON.parse(event.data);

        if (__DEBUG__) {
          standalone_debug('WebSocket.onmessage', data);
        }
      } else {
        throw Error();
      }
    } catch (e) {
      log.error('Failed to parse JSON', event.data);
      return;
    }

    listeners.forEach(function (fn) {
      try {
        fn(data);
      } catch (error) {
        log.error('Error calling listener', data);
        throw error;
      }
    });
  };

  standalone_bridge = new src_bridge({
    listen: function listen(fn) {
      listeners.push(fn);
      return function () {
        var index = listeners.indexOf(fn);

        if (index >= 0) {
          listeners.splice(index, 1);
        }
      };
    },
    send: function send(event, payload, transferable) {
      if (socket.readyState === socket.OPEN) {
        socket.send(JSON.stringify({
          event: event,
          payload: payload
        }));
      }
    }
  });
  standalone_bridge.addListener('shutdown', function () {
    socket.close();
  });
  standalone_store = new store_Store(standalone_bridge);
  log('Connected');
  reload();
}

var startServerTimeoutID = null;

function connectToSocket(socket) {
  socket.onerror = function (err) {
    onDisconnected();
    log.error('Error with websocket connection', err);
  };

  socket.onclose = function () {
    onDisconnected();
    log('Connection to RN closed');
  };

  initialize(socket);
  return {
    close: function close() {
      onDisconnected();
    }
  };
}

function startServer() {
  var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8097;

  var httpServer = __webpack_require__(18).createServer();

  var server = new ws["Server"]({
    server: httpServer
  });
  var connected = null;
  server.on('connection', function (socket) {
    if (connected !== null) {
      connected.close();
      log.warn('Only one connection allowed at a time.', 'Closing the previous connection');
    }

    connected = socket;

    socket.onerror = function (error) {
      connected = null;
      onDisconnected();
      log.error('Error with websocket connection', error);
    };

    socket.onclose = function () {
      connected = null;
      onDisconnected();
      log('Connection to RN closed');
    };

    initialize(socket);
  });
  server.on('error', function (event) {
    onError(event);
    log.error('Failed to start the DevTools server', event);
    startServerTimeoutID = setTimeout(function () {
      return startServer(port);
    }, 1000);
  });
  httpServer.on('request', function (request, response) {
    // NPM installs should read from node_modules,
    // But local dev mode needs to use a relative path.
    var basePath = Object(external_fs_["existsSync"])('./node_modules/relay-devtools-core') ? 'node_modules/relay-devtools-core' : '../relay-devtools-core'; // Serve a file that immediately sets up the connection.

    var backendFile = Object(external_fs_["readFileSync"])("".concat(basePath, "/dist/backend.js"));
    response.end(backendFile.toString() + '\n;' + 'RelayDevToolsBackend.connectToDevTools();');
  });
  httpServer.on('error', function (event) {
    onError(event);
    statusListener('Failed to start the server.');
    startServerTimeoutID = setTimeout(function () {
      return startServer(port);
    }, 1000);
  });
  httpServer.listen(port, function () {
    statusListener('The server is listening on the port ' + port + '.');
  });
  return {
    close: function close() {
      connected = null;
      onDisconnected();
      clearTimeout(startServerTimeoutID);
      server.close();
      httpServer.close();
    }
  };
}

var DevtoolsUI = {
  connectToSocket: connectToSocket,
  setContentDOMNode: setContentDOMNode,
  setStatusListener: setStatusListener,
  startServer: startServer
};
/* harmony default export */ var standalone = __webpack_exports__["default"] = (DevtoolsUI);

/***/ })
/******/ ]);