// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Петя",
  "friends": [10, 2, 6]
}, {
  "id": 2,
  "name": "Вася",
  "friends": [5, 1, 3]
}, {
  "id": 3,
  "name": "Оля",
  "friends": [9, 4, 3]
}, {
  "id": 4,
  "name": "Максим",
  "friends": [11, 12, 2]
}, {
  "id": 5,
  "name": "Елена",
  "friends": [7, 8, 4]
}, {
  "id": 6,
  "name": "Иван",
  "friends": [6, 1, 12]
}, {
  "id": 7,
  "name": "Никита",
  "friends": [1, 8, 5]
}, {
  "id": 8,
  "name": "Марат",
  "friends": [11, 12, 10]
}, {
  "id": 9,
  "name": "Анатолий",
  "friends": [1, 2, 3]
}, {
  "id": 10,
  "name": "Наташа",
  "friends": [8, 4, 2]
}, {
  "id": 11,
  "name": "Марина",
  "friends": [1, 5, 8]
}, {
  "id": 12,
  "name": "Кирилл",
  "friends": [5, 2, 12]
}];
},{}],"modules/renderUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderUser;

function renderUser(name) {
  var template = document.querySelector('.user');
  var user = template.cloneNode(true);
  user.querySelector('p').textContent = name;
  return user;
}
},{}],"modules/renderUserCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderUserCard;

function renderUserCard(_ref, usersMentions) {
  var name = _ref.name,
      friendsNames = _ref.friendsNames,
      nonFriends = _ref.nonFriends;

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var nonFriendsList = [];

  (function getRandomNonFriends() {
    if (nonFriendsList.length === 3) return nonFriendsList;
    var lastIndex = nonFriends.length - 1;
    var randomNonFriend = nonFriends[randomInteger(0, lastIndex)];
    if (!nonFriendsList.includes(randomNonFriend)) nonFriendsList.push(randomNonFriend);
    getRandomNonFriends();
  })();

  var popularFriendsList = [];

  (function getPopularFriends() {
    if (popularFriendsList.length === 3) return popularFriendsList;
    Object.keys(usersMentions).forEach(function (user) {
      if (user !== name) popularFriendsList.push(user);
    });
  })();

  var template = document.querySelector('.user-card');
  var userCard = template.cloneNode(true);
  userCard.hidden = false;
  userCard.querySelector('#name').textContent = name;
  userCard.querySelector('#firstFriend').textContent = friendsNames[0] || 'fallback';
  userCard.querySelector('#secondFriend').textContent = friendsNames[1] || 'fallback';
  userCard.querySelector('#thirdFriend').textContent = friendsNames[2] || 'fallback';
  userCard.querySelector('#firstNonFriend').textContent = nonFriendsList[0] || 'fallback';
  userCard.querySelector('#secondNonFriend').textContent = nonFriendsList[1] || 'fallback';
  userCard.querySelector('#thirdNonFriend').textContent = nonFriendsList[2] || 'fallback';
  userCard.querySelector('#firstPopularPerson').textContent = popularFriendsList[0] || 'fallback';
  userCard.querySelector('#secondPopularPerson').textContent = popularFriendsList[1] || 'fallback';
  userCard.querySelector('#thirdPopularPerson').textContent = popularFriendsList[2] || 'fallback';
  return userCard;
}
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("../data.json"));

var _renderUser = _interopRequireDefault(require("../modules/renderUser"));

var _renderUserCard = _interopRequireDefault(require("../modules/renderUserCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var app = document.querySelector("#app");
var usersContainer = document.querySelector(".users-container");
var userCardContainer = document.querySelector(".user-card-container");
var globalFriendsList = []; // initial rendering

_data.default.forEach(function (user) {
  var userElement = (0, _renderUser.default)(user.name);
  usersContainer.append(userElement);
  user.friendsNames = addFriendsNames(user);
  user.nonFriends = addNonFriends(user);
  globalFriendsList.push.apply(globalFriendsList, _toConsumableArray(user.friendsNames));
});

var usersMentions = {};
globalFriendsList.forEach(function (friend) {
  usersMentions[friend] = (usersMentions[friend] || 0) + 1;
});
var friendsMentionsSorted = Object.fromEntries(Object.entries(usersMentions).sort(function (_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 2),
      nameA = _ref3[0],
      countA = _ref3[1];

  var _ref4 = _slicedToArray(_ref2, 2),
      nameB = _ref4[0],
      countB = _ref4[1];

  if (countA === countB) return sortByNames(nameA, nameB);
  return countB - countA;
}));

function sortByNames(nameA, nameB) {
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
}

function addFriendsNames(user) {
  var _usersData, _usersData2, _usersData3;

  return [(_usersData = _data.default[user.friends[0] - 1]) === null || _usersData === void 0 ? void 0 : _usersData.name, (_usersData2 = _data.default[user.friends[1] - 1]) === null || _usersData2 === void 0 ? void 0 : _usersData2.name, (_usersData3 = _data.default[user.friends[2] - 1]) === null || _usersData3 === void 0 ? void 0 : _usersData3.name];
}

function addNonFriends(user) {
  var nonFriends = [];
  var namesToSkip = [user.name].concat(_toConsumableArray(user.friendsNames));

  _data.default.forEach(function (user) {
    if (!namesToSkip.includes(user.name)) nonFriends.push(user.name);
  });

  return nonFriends;
}

var usersElements = usersContainer.querySelectorAll(".user");

function showUserCard() {
  var _this = this;

  var clickedUser = _data.default.find(function (user) {
    return user.name === _this.innerText;
  });

  var userCardContent = (0, _renderUserCard.default)(clickedUser, friendsMentionsSorted);
  userCardContainer.innerHTML = "";
  userCardContainer.append(userCardContent);
  app.classList.add("overflow-type");
  userCardContainer.classList.add("visible");
  var arrowBack = document.querySelector(".user-card__back-arrow");
  arrowBack.addEventListener("click", hideUserCard, {
    once: true
  });
}

function hideUserCard() {
  app.classList.remove("overflow-type");
  userCardContainer.classList.remove("visible");
}

usersElements.forEach(function (user) {
  return user.addEventListener("click", showUserCard);
});
},{"../data.json":"data.json","../modules/renderUser":"modules/renderUser.js","../modules/renderUserCard":"modules/renderUserCard.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50170" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map