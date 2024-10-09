/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nextcloud/browser-storage/dist/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@nextcloud/browser-storage/dist/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clearAll = clearAll;
exports.clearNonPersistent = clearNonPersistent;
exports.getBuilder = getBuilder;
var _storagebuilder = _interopRequireDefault(__webpack_require__(/*! ./storagebuilder */ "./node_modules/@nextcloud/browser-storage/dist/storagebuilder.js"));
var _scopedstorage = _interopRequireDefault(__webpack_require__(/*! ./scopedstorage */ "./node_modules/@nextcloud/browser-storage/dist/scopedstorage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Get the storage builder for an app
 * @param appId App ID to scope storage
 */
function getBuilder(appId) {
  return new _storagebuilder.default(appId);
}

/**
 * Clear values from storage
 * @param storage The storage to clear
 * @param pred Callback to check if value should be cleared
 */
function clearStorage(storage, pred) {
  Object.keys(storage).filter(k => pred ? pred(k) : true).map(storage.removeItem.bind(storage));
}

/**
 * Clear all values from all storages
 */
function clearAll() {
  const storages = [window.sessionStorage, window.localStorage];
  storages.map(s => clearStorage(s));
}

/**
 * Clear ony non persistent values
 */
function clearNonPersistent() {
  const storages = [window.sessionStorage, window.localStorage];
  storages.map(s => clearStorage(s, k => !k.startsWith(_scopedstorage.default.GLOBAL_SCOPE_PERSISTENT)));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@nextcloud/browser-storage/dist/scopedstorage.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nextcloud/browser-storage/dist/scopedstorage.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ScopedStorage {
  constructor(scope, wrapped, persistent) {
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "wrapped", void 0);
    this.scope = "".concat(persistent ? ScopedStorage.GLOBAL_SCOPE_PERSISTENT : ScopedStorage.GLOBAL_SCOPE_VOLATILE, "_").concat(btoa(scope), "_");
    this.wrapped = wrapped;
  }
  scopeKey(key) {
    return "".concat(this.scope).concat(key);
  }
  setItem(key, value) {
    this.wrapped.setItem(this.scopeKey(key), value);
  }
  getItem(key) {
    return this.wrapped.getItem(this.scopeKey(key));
  }
  removeItem(key) {
    this.wrapped.removeItem(this.scopeKey(key));
  }
  clear() {
    Object.keys(this.wrapped).filter(key => key.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
  }
}
exports["default"] = ScopedStorage;
_defineProperty(ScopedStorage, "GLOBAL_SCOPE_VOLATILE", 'nextcloud_vol');
_defineProperty(ScopedStorage, "GLOBAL_SCOPE_PERSISTENT", 'nextcloud_per');
//# sourceMappingURL=scopedstorage.js.map

/***/ }),

/***/ "./node_modules/@nextcloud/browser-storage/dist/storagebuilder.js":
/*!************************************************************************!*\
  !*** ./node_modules/@nextcloud/browser-storage/dist/storagebuilder.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _scopedstorage = _interopRequireDefault(__webpack_require__(/*! ./scopedstorage */ "./node_modules/@nextcloud/browser-storage/dist/scopedstorage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class StorageBuilder {
  constructor(appId) {
    _defineProperty(this, "appId", void 0);
    _defineProperty(this, "persisted", false);
    _defineProperty(this, "clearedOnLogout", false);
    this.appId = appId;
  }
  persist() {
    let persist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.persisted = persist;
    return this;
  }
  clearOnLogout() {
    let clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.clearedOnLogout = clear;
    return this;
  }
  build() {
    return new _scopedstorage.default(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
  }
}
exports["default"] = StorageBuilder;
//# sourceMappingURL=storagebuilder.js.map

/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/classes/semver.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/classes/semver.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(/*! ../internal/debug */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/debug.js")
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(/*! ../internal/constants */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/constants.js")
const { safeRe: re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/re.js")

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/parse-options.js")
const { compareIdentifiers } = __webpack_require__(/*! ../internal/identifiers */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/identifiers.js")
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('build compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier, identifierBase) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier, identifierBase)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier, identifierBase)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier, identifierBase)
        this.inc('pre', identifier, identifierBase)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase)
        }
        this.inc('pre', identifier, identifierBase)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre': {
        const base = Number(identifierBase) ? 1 : 0

        if (!identifier && identifierBase === false) {
          throw new Error('invalid increment argument: identifier is empty')
        }

        if (this.prerelease.length === 0) {
          this.prerelease = [base]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            if (identifier === this.prerelease.join('.') && identifierBase === false) {
              throw new Error('invalid increment argument: identifier already exists')
            }
            this.prerelease.push(base)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          let prerelease = [identifier, base]
          if (identifierBase === false) {
            prerelease = [identifier]
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease
            }
          } else {
            this.prerelease = prerelease
          }
        }
        break
      }
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.raw = this.format()
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`
    }
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/major.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/major.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/@nextcloud/event-bus/node_modules/semver/classes/semver.js")
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/parse.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/parse.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/@nextcloud/event-bus/node_modules/semver/classes/semver.js")
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version
  }
  try {
    return new SemVer(version, options)
  } catch (er) {
    if (!throwErrors) {
      return null
    }
    throw er
  }
}

module.exports = parse


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/valid.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/functions/valid.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(/*! ./parse */ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/parse.js")
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/constants.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/internal/constants.js ***!
  \*************************************************************************************/
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]

module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010,
}


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/debug.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/internal/debug.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/identifiers.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/internal/identifiers.js ***!
  \***************************************************************************************/
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/parse-options.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/internal/parse-options.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

// parse out just the options we care about
const looseOption = Object.freeze({ loose: true })
const emptyOpts = Object.freeze({ })
const parseOptions = options => {
  if (!options) {
    return emptyOpts
  }

  if (typeof options !== 'object') {
    return looseOption
  }

  return options
}
module.exports = parseOptions


/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/re.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/node_modules/semver/internal/re.js ***!
  \******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH,
} = __webpack_require__(/*! ./constants */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/constants.js")
const debug = __webpack_require__(/*! ./debug */ "./node_modules/@nextcloud/event-bus/node_modules/semver/internal/debug.js")
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const safeRe = exports.safeRe = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const LETTERDASHNUMBER = '[a-zA-Z0-9-]'

// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
  ['\\s', 1],
  ['\\d', MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
]

const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value
      .split(`${token}*`).join(`${token}{0,${max}}`)
      .split(`${token}+`).join(`${token}{1,${max}}`)
  }
  return value
}

const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value)
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '\\d+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`)

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`)

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`)
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`)
createToken('COERCEFULL', src[t.COERCEPLAIN] +
              `(?:${src[t.PRERELEASE]})?` +
              `(?:${src[t.BUILD]})?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)
createToken('COERCERTLFULL', src[t.COERCEFULL], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
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
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/cancelable-promise/umd/CancelablePromise.js":
/*!******************************************************************!*\
  !*** ./node_modules/cancelable-promise/umd/CancelablePromise.js ***!
  \******************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CancelablePromise = void 0;
  _exports.cancelable = cancelable;
  _exports.default = void 0;
  _exports.isCancelablePromise = isCancelablePromise;

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

  var toStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : '@@toStringTag';

  var _internals = /*#__PURE__*/new WeakMap();

  var _promise = /*#__PURE__*/new WeakMap();

  var CancelablePromiseInternal = /*#__PURE__*/function () {
    function CancelablePromiseInternal(_ref) {
      var _ref$executor = _ref.executor,
          executor = _ref$executor === void 0 ? function () {} : _ref$executor,
          _ref$internals = _ref.internals,
          internals = _ref$internals === void 0 ? defaultInternals() : _ref$internals,
          _ref$promise = _ref.promise,
          promise = _ref$promise === void 0 ? new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }) : _ref$promise;

      _classCallCheck(this, CancelablePromiseInternal);

      _classPrivateFieldInitSpec(this, _internals, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _promise, {
        writable: true,
        value: void 0
      });

      _defineProperty(this, toStringTag, 'CancelablePromise');

      this.cancel = this.cancel.bind(this);

      _classPrivateFieldSet(this, _internals, internals);

      _classPrivateFieldSet(this, _promise, promise || new Promise(function (resolve, reject) {
        return executor(resolve, reject, function (onCancel) {
          internals.onCancelList.push(onCancel);
        });
      }));
    }

    _createClass(CancelablePromiseInternal, [{
      key: "then",
      value: function then(onfulfilled, onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).then(createCallback(onfulfilled, _classPrivateFieldGet(this, _internals)), createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "catch",
      value: function _catch(onrejected) {
        return makeCancelable(_classPrivateFieldGet(this, _promise).catch(createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "finally",
      value: function _finally(onfinally, runWhenCanceled) {
        var _this = this;

        if (runWhenCanceled) {
          _classPrivateFieldGet(this, _internals).onCancelList.push(onfinally);
        }

        return makeCancelable(_classPrivateFieldGet(this, _promise).finally(createCallback(function () {
          if (onfinally) {
            if (runWhenCanceled) {
              _classPrivateFieldGet(_this, _internals).onCancelList = _classPrivateFieldGet(_this, _internals).onCancelList.filter(function (callback) {
                return callback !== onfinally;
              });
            }

            return onfinally();
          }
        }, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
      }
    }, {
      key: "cancel",
      value: function cancel() {
        _classPrivateFieldGet(this, _internals).isCanceled = true;

        var callbacks = _classPrivateFieldGet(this, _internals).onCancelList;

        _classPrivateFieldGet(this, _internals).onCancelList = [];

        var _iterator = _createForOfIteratorHelper(callbacks),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var callback = _step.value;

            if (typeof callback === 'function') {
              try {
                callback();
              } catch (err) {
                console.error(err);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "isCanceled",
      value: function isCanceled() {
        return _classPrivateFieldGet(this, _internals).isCanceled === true;
      }
    }]);

    return CancelablePromiseInternal;
  }();

  var CancelablePromise = /*#__PURE__*/function (_CancelablePromiseInt) {
    _inherits(CancelablePromise, _CancelablePromiseInt);

    var _super = _createSuper(CancelablePromise);

    function CancelablePromise(executor) {
      _classCallCheck(this, CancelablePromise);

      return _super.call(this, {
        executor: executor
      });
    }

    return _createClass(CancelablePromise);
  }(CancelablePromiseInternal);

  _exports.CancelablePromise = CancelablePromise;

  _defineProperty(CancelablePromise, "all", function all(iterable) {
    return makeAllCancelable(iterable, Promise.all(iterable));
  });

  _defineProperty(CancelablePromise, "allSettled", function allSettled(iterable) {
    return makeAllCancelable(iterable, Promise.allSettled(iterable));
  });

  _defineProperty(CancelablePromise, "any", function any(iterable) {
    return makeAllCancelable(iterable, Promise.any(iterable));
  });

  _defineProperty(CancelablePromise, "race", function race(iterable) {
    return makeAllCancelable(iterable, Promise.race(iterable));
  });

  _defineProperty(CancelablePromise, "resolve", function resolve(value) {
    return cancelable(Promise.resolve(value));
  });

  _defineProperty(CancelablePromise, "reject", function reject(reason) {
    return cancelable(Promise.reject(reason));
  });

  _defineProperty(CancelablePromise, "isCancelable", isCancelablePromise);

  var _default = CancelablePromise;
  _exports.default = _default;

  function cancelable(promise) {
    return makeCancelable(promise, defaultInternals());
  }

  function isCancelablePromise(promise) {
    return promise instanceof CancelablePromise || promise instanceof CancelablePromiseInternal;
  }

  function createCallback(onResult, internals) {
    if (onResult) {
      return function (arg) {
        if (!internals.isCanceled) {
          var result = onResult(arg);

          if (isCancelablePromise(result)) {
            internals.onCancelList.push(result.cancel);
          }

          return result;
        }

        return arg;
      };
    }
  }

  function makeCancelable(promise, internals) {
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function makeAllCancelable(iterable, promise) {
    var internals = defaultInternals();
    internals.onCancelList.push(function () {
      var _iterator2 = _createForOfIteratorHelper(iterable),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var resolvable = _step2.value;

          if (isCancelablePromise(resolvable)) {
            resolvable.cancel();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    return new CancelablePromiseInternal({
      internals: internals,
      promise: promise
    });
  }

  function defaultInternals() {
    return {
      isCanceled: false,
      onCancelList: []
    };
  }
});
//# sourceMappingURL=CancelablePromise.js.map

/***/ }),

/***/ "./node_modules/dompurify/dist/purify.js":
/*!***********************************************!*\
  !*** ./node_modules/dompurify/dist/purify.js ***!
  \***********************************************/
/***/ (function(module) {

/*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object; // eslint-disable-line import/no-mutable-exports
  let {
    apply,
    construct
  } = typeof Reflect !== 'undefined' && Reflect;
  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct(Func, args) {
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);

  /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param {Function} func - The function to be wrapped and called.
   * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
   */
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }

  /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param {Function} func - The constructor function to be wrapped and called.
   * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
   */
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }

  /**
   * Add properties to a lookup table
   *
   * @param {Object} set - The set to which elements will be added.
   * @param {Array} array - The array containing elements to be added to the set.
   * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns {Object} The modified set with added elements.
   */
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }

  /**
   * Clean up an array to harden against CSPP
   *
   * @param {Array} array - The array to be cleaned.
   * @returns {Array} The cleaned version of the array
   */
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }

  /**
   * Shallow clone an object
   *
   * @param {Object} object - The object to be cloned.
   * @returns {Object} A new object that copies the original.
   */
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === 'object' && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }

  /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param {Object} object - The object to look up the getter function in its prototype chain.
   * @param {String} prop - The property name for which to find the getter function.
   * @returns {Function} The getter function found in the prototype chain or a fallback function.
   */
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.
  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);

  // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.
  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  // eslint-disable-next-line unicorn/better-regex
  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  const DOCTYPE_NAME = seal(/^html$/i);
  const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

  var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    ERB_EXPR: ERB_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR,
    DATA_ATTR: DATA_ATTR,
    ARIA_ATTR: ARIA_ATTR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    DOCTYPE_NAME: DOCTYPE_NAME,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  const NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    // Deprecated
    entityNode: 6,
    // Deprecated
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12 // Deprecated
  };
  const getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return {TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };
  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
    const DOMPurify = root => createDOMPurify(root);

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '3.1.6';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];
    if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document
    } = window;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const remove = lookupGetter(ElementPrototype, 'remove');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode');

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.
    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = '';
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document;
    const {
      importNode
    } = originalDocument;
    let hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
    const {
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE,
      CUSTOM_ELEMENT
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;

    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);

    /* Allowed attribute names */
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);

    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    let FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    let FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    let ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    let ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    let ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */
    let ALLOW_SELF_CLOSE_IN_ATTR = true;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    let SAFE_FOR_TEMPLATES = false;

    /* Output should be safe even for XML used within HTML and alike.
     * This means, DOMPurify removes comments when containing risky content.
     */
    let SAFE_FOR_XML = true;

    /* Decide if document with <html>... should be returned */
    let WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    let SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    let FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    let RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    let RETURN_DOM_FRAGMENT = false;

    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    let RETURN_TRUSTED_TYPE = false;

    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */
    let SANITIZE_DOM = true;

    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';

    /* Keep element content when removing element? */
    let KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    let IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    let USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

    /* Tags that are safe for data: URIs */
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

    /* Attributes safe for values like "javascript:" */
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;

    /* Allowed XHTML+XML namespaces */
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);

    /* Parsing of strict XHTML documents */
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc = null;

    /* Keep a reference to config to pass to hooks */
    let CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    const formElement = document.createElement('form');
    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    const _parseConfig = function _parseConfig() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }

      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE =
      // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;

      // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;

      /* Set configuration parameters */
      ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }

        // Overwrite existing TrustedTypes policy.
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;

        // Sign local variables required by `sanitize`.
        emptyHTML = trustedTypesPolicy.createHTML('');
      } else {
        // Uninitialized policy, attempt to initialize the internal dompurify policy.
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }

        // If creating the internal policy succeeded sign internal variables.
        if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
          emptyHTML = trustedTypesPolicy.createHTML('');
        }
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'annotation-xml']);

    // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);

    /**
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */
    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element);

      // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        }

        // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }

        // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        }

        // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        }

        // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }

      // For XHTML and XML documents that support custom namespaces
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }

      // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.
      return false;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        getParentNode(node).removeChild(node);
      } catch (_) {
        remove(node);
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    const _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }
      node.removeAttribute(name);

      // We void attribute values for unremovable "is"" attributes
      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }

      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
          // Syntax error if dirtyPayload is invalid xml
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };

    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param  {Node} root The root element or node to start traversing on.
     * @return {NodeIterator} The created NodeIterator
     */
    const _createNodeIterator = function _createNodeIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    const _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };

    /**
     * Checks whether the given object is a DOM node.
     *
     * @param  {Node} object object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    const _isNode = function _isNode(object) {
      return typeof Node === 'function' && object instanceof Node;
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    const _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }
      arrayForEach(hooks[entryPoint], hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content = null;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      const tagName = transformCaseFunc(currentNode.nodeName);

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Detect mXSS attempts abusing namespace confusion */
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove any occurrence of processing instructions */
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove any kind of possibly harmful comments */
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }

        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              const childClone = cloneNode(childNodes[i], true);
              childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }

      /* Check whether element has a valid namespace */
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Make sure that older browsers don't get fallback-tag mXSS */
      if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        /* Get the element's text content */
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          content = stringReplace(content, expr, ' ');
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);
      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
        // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
        return false;
      } else ;
      return true;
    };

    /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param {string} tagName name of the tag of the node to sanitize
     * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */
    const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
      return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);
      const {
        attributes
      } = currentNode;

      /* Check if we have attributes; if not we might have a text node */
      if (!attributes) {
        return;
      }
      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === 'value' ? attrValue : stringTrim(attrValue);

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;

        /* Work around a security issue with comments inside attributes */
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }

        /* Remove attribute */
        _removeAttribute(name, currentNode);

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Work around a security issue in jQuery 3.0 */
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            value = stringReplace(value, expr, ' ');
          });
        }

        /* Is `value` valid for this attribute? */
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */
        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode);

          // Prefix the value and later re-create the attribute with the sanitized value
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }

        /* Handle attributes that require Trusted Types */
        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }
              case 'TrustedScriptURL':
                {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
            }
          }
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} cfg object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        if (typeof dirty.toString === 'function') {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        } else {
          throw typeErrorCreate('toString is not a function');
        }
      }

      /* Return dirty HTML if DOMPurify cannot run */
      if (!DOMPurify.isSupported) {
        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);
      }

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Serialize doctype if allowed */
      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          serializedHTML = stringReplace(serializedHTML, expr, ' ');
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function () {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {String} tag Tag name of containing element.
     * @param  {String} attr Attribute name.
     * @param  {String} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }
      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./node_modules/escape-html/index.js":
/*!*******************************************!*\
  !*** ./node_modules/escape-html/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/@nextcloud/auth/dist/index.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/@nextcloud/auth/dist/index.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCSPNonce: () => (/* binding */ getCSPNonce),
/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),
/* harmony export */   getGuestNickname: () => (/* binding */ getGuestNickname),
/* harmony export */   getRequestToken: () => (/* binding */ getRequestToken),
/* harmony export */   onRequestTokenUpdate: () => (/* binding */ onRequestTokenUpdate),
/* harmony export */   setGuestNickname: () => (/* binding */ setGuestNickname)
/* harmony export */ });
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/* harmony import */ var _nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/browser-storage */ "./node_modules/@nextcloud/browser-storage/dist/index.js");


let token;
const observers = [];
function getRequestToken() {
  if (token === void 0) {
    token = document.head.dataset.requesttoken ?? null;
  }
  return token;
}
function onRequestTokenUpdate(observer) {
  observers.push(observer);
}
(0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_0__.subscribe)("csrf-token-update", (e) => {
  token = e.token;
  observers.forEach((observer) => {
    try {
      observer(token);
    } catch (e2) {
      console.error("Error updating CSRF token observer", e2);
    }
  });
});
function getCSPNonce() {
  const meta = document?.querySelector('meta[name="csp-nonce"]');
  if (!meta) {
    const token2 = getRequestToken();
    return token2 ? btoa(token2) : void 0;
  }
  return meta.nonce;
}
const browserStorage = (0,_nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_1__.getBuilder)("public").persist().build();
function getGuestNickname() {
  return browserStorage.getItem("guestNickname");
}
function setGuestNickname(nickname) {
  browserStorage.setItem("guestNickname", nickname);
}
let currentUser;
const getAttribute = (el, attribute) => {
  if (el) {
    return el.getAttribute(attribute);
  }
  return null;
};
function getCurrentUser() {
  if (currentUser !== void 0) {
    return currentUser;
  }
  const head = document?.getElementsByTagName("head")[0];
  if (!head) {
    return null;
  }
  const uid = getAttribute(head, "data-user");
  if (uid === null) {
    currentUser = null;
    return currentUser;
  }
  currentUser = {
    uid,
    displayName: getAttribute(head, "data-user-displayname"),
    isAdmin: !!window._oc_isadmin
  };
  return currentUser;
}



/***/ }),

/***/ "./node_modules/@nextcloud/axios/dist/index.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@nextcloud/axios/dist/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cancelableClient),
/* harmony export */   isAxiosError: () => (/* reexport safe */ axios__WEBPACK_IMPORTED_MODULE_3__.isAxiosError),
/* harmony export */   isCancel: () => (/* reexport safe */ axios__WEBPACK_IMPORTED_MODULE_3__.isCancel)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");




const RETRY_KEY = Symbol("csrf-retry");
const onError$2 = (axios) => async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  if (status === 412 && ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.message) === "CSRF check failed" && config[RETRY_KEY] === void 0) {
    console.warn("Request to ".concat(responseURL, " failed because of a CSRF mismatch. Fetching a new token"));
    const { data: { token } } = await axios.get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)("/csrftoken"));
    console.debug("New request token ".concat(token, " fetched"));
    axios.defaults.headers.requesttoken = token;
    return axios({
      ...config,
      headers: {
        ...config.headers,
        requesttoken: token
      },
      [RETRY_KEY]: true
    });
  }
  return Promise.reject(error);
};
const RETRY_DELAY_KEY = Symbol("retryDelay");
const onError$1 = (axios) => async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  const headers = response == null ? void 0 : response.headers;
  if (status === 503 && headers["x-nextcloud-maintenance-mode"] === "1" && config.retryIfMaintenanceMode && (!config[RETRY_DELAY_KEY] || config[RETRY_DELAY_KEY] <= 32)) {
    const retryDelay = ((_a2 = config[RETRY_DELAY_KEY]) != null ? _a2 : 1) * 2;
    console.warn("Request to ".concat(responseURL, " failed because of maintenance mode. Retrying in ").concat(retryDelay, "s"));
    await new Promise((resolve) => {
      setTimeout(resolve, retryDelay * 1e3);
    });
    return axios({
      ...config,
      [RETRY_DELAY_KEY]: retryDelay
    });
  }
  return Promise.reject(error);
};
const onError = async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  if (status === 401 && ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.message) === "Current user is not logged in" && config.reloadExpiredSession && (window == null ? void 0 : window.location)) {
    console.error("Request to ".concat(responseURL, " failed because the user session expired. Reloading the page …"));
    window.location.reload();
  }
  return Promise.reject(error);
};
var _a;
const client = axios__WEBPACK_IMPORTED_MODULE_2__["default"].create({
  headers: {
    requesttoken: (_a = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getRequestToken)()) != null ? _a : "",
    "X-Requested-With": "XMLHttpRequest"
  }
});
const cancelableClient = Object.assign(client, {
  CancelToken: axios__WEBPACK_IMPORTED_MODULE_2__["default"].CancelToken,
  isCancel: axios__WEBPACK_IMPORTED_MODULE_2__["default"].isCancel
});
cancelableClient.interceptors.response.use((r) => r, onError$2(cancelableClient));
cancelableClient.interceptors.response.use((r) => r, onError$1(cancelableClient));
cancelableClient.interceptors.response.use((r) => r, onError);
(0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.onRequestTokenUpdate)((token) => {
  client.defaults.headers.requesttoken = token;
});



/***/ }),

/***/ "./node_modules/@nextcloud/capabilities/dist/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@nextcloud/capabilities/dist/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCapabilities: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");

function e() {
  try {
    return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__.loadState)("core", "capabilities");
  } catch {
    return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
  }
}



/***/ }),

/***/ "./node_modules/@nextcloud/event-bus/dist/index.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/@nextcloud/event-bus/dist/index.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProxyBus: () => (/* binding */ ProxyBus),
/* harmony export */   SimpleBus: () => (/* binding */ SimpleBus),
/* harmony export */   emit: () => (/* binding */ emit),
/* harmony export */   subscribe: () => (/* binding */ subscribe),
/* harmony export */   unsubscribe: () => (/* binding */ unsubscribe)
/* harmony export */ });
/* harmony import */ var semver_functions_valid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! semver/functions/valid.js */ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/valid.js");
/* harmony import */ var semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semver/functions/major.js */ "./node_modules/@nextcloud/event-bus/node_modules/semver/functions/major.js");


class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !semver_functions_valid_js__WEBPACK_IMPORTED_MODULE_0__(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__(bus2.getVersion()) !== semver_functions_major_js__WEBPACK_IMPORTED_MODULE_1__(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, event) {
    this.bus.emit(name, event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h) => h !== handler)
    );
  }
  emit(name, event) {
    (this.handlers.get(name) || []).forEach((h) => {
      try {
        h(event);
      } catch (e) {
        console.error("could not invoke event listener", e);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function subscribe(name, handler) {
  getBus().subscribe(name, handler);
}
function unsubscribe(name, handler) {
  getBus().unsubscribe(name, handler);
}
function emit(name, event) {
  getBus().emit(name, event);
}



/***/ }),

/***/ "./node_modules/@nextcloud/files/dist/index.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@nextcloud/files/dist/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Column: () => (/* binding */ Column),
/* harmony export */   DefaultType: () => (/* binding */ DefaultType),
/* harmony export */   File: () => (/* binding */ File),
/* harmony export */   FileAction: () => (/* binding */ FileAction),
/* harmony export */   FileListFilter: () => (/* binding */ FileListFilter),
/* harmony export */   FileType: () => (/* binding */ FileType),
/* harmony export */   FilesSortingMode: () => (/* binding */ FilesSortingMode),
/* harmony export */   Folder: () => (/* binding */ Folder),
/* harmony export */   Header: () => (/* binding */ Header),
/* harmony export */   InvalidFilenameError: () => (/* binding */ InvalidFilenameError),
/* harmony export */   InvalidFilenameErrorReason: () => (/* binding */ InvalidFilenameErrorReason),
/* harmony export */   Navigation: () => (/* binding */ Navigation),
/* harmony export */   NewMenuEntryCategory: () => (/* binding */ NewMenuEntryCategory),
/* harmony export */   Node: () => (/* binding */ Node),
/* harmony export */   NodeStatus: () => (/* binding */ NodeStatus),
/* harmony export */   Permission: () => (/* binding */ Permission),
/* harmony export */   View: () => (/* binding */ View),
/* harmony export */   addNewFileMenuEntry: () => (/* binding */ addNewFileMenuEntry),
/* harmony export */   davGetClient: () => (/* binding */ davGetClient),
/* harmony export */   davGetDefaultPropfind: () => (/* binding */ davGetDefaultPropfind),
/* harmony export */   davGetFavoritesReport: () => (/* binding */ davGetFavoritesReport),
/* harmony export */   davGetRecentSearch: () => (/* binding */ davGetRecentSearch),
/* harmony export */   davGetRemoteURL: () => (/* binding */ davGetRemoteURL),
/* harmony export */   davGetRootPath: () => (/* binding */ davGetRootPath),
/* harmony export */   davParsePermissions: () => (/* binding */ davParsePermissions),
/* harmony export */   davRemoteURL: () => (/* binding */ davRemoteURL),
/* harmony export */   davResultToNode: () => (/* binding */ davResultToNode),
/* harmony export */   davRootPath: () => (/* binding */ davRootPath),
/* harmony export */   defaultDavNamespaces: () => (/* binding */ defaultDavNamespaces),
/* harmony export */   defaultDavProperties: () => (/* binding */ defaultDavProperties),
/* harmony export */   formatFileSize: () => (/* binding */ formatFileSize),
/* harmony export */   getDavNameSpaces: () => (/* binding */ getDavNameSpaces),
/* harmony export */   getDavProperties: () => (/* binding */ getDavProperties),
/* harmony export */   getFavoriteNodes: () => (/* binding */ getFavoriteNodes),
/* harmony export */   getFileActions: () => (/* binding */ getFileActions),
/* harmony export */   getFileListFilters: () => (/* binding */ getFileListFilters),
/* harmony export */   getFileListHeaders: () => (/* binding */ getFileListHeaders),
/* harmony export */   getNavigation: () => (/* binding */ getNavigation),
/* harmony export */   getNewFileMenuEntries: () => (/* binding */ getNewFileMenuEntries),
/* harmony export */   getUniqueName: () => (/* binding */ getUniqueName),
/* harmony export */   isFilenameValid: () => (/* binding */ isFilenameValid),
/* harmony export */   orderBy: () => (/* binding */ orderBy),
/* harmony export */   parseFileSize: () => (/* binding */ parseFileSize),
/* harmony export */   registerDavProperty: () => (/* binding */ registerDavProperty),
/* harmony export */   registerFileAction: () => (/* binding */ registerFileAction),
/* harmony export */   registerFileListFilter: () => (/* binding */ registerFileListFilter),
/* harmony export */   registerFileListHeaders: () => (/* binding */ registerFileListHeaders),
/* harmony export */   removeNewFileMenuEntry: () => (/* binding */ removeNewFileMenuEntry),
/* harmony export */   sortNodes: () => (/* binding */ sortNodes),
/* harmony export */   unregisterFileListFilter: () => (/* binding */ unregisterFileListFilter),
/* harmony export */   validateFilename: () => (/* binding */ validateFilename)
/* harmony export */ });
/* harmony import */ var _nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/logger */ "./node_modules/@nextcloud/logger/dist/index.mjs");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
/* harmony import */ var _nextcloud_paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/paths */ "./node_modules/@nextcloud/paths/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var cancelable_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cancelable-promise */ "./node_modules/cancelable-promise/umd/CancelablePromise.js");
/* harmony import */ var webdav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! webdav */ "./node_modules/webdav/dist/web/index.js");
/* harmony import */ var _nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nextcloud/sharing/public */ "./node_modules/@nextcloud/sharing/dist/public.mjs");
/* harmony import */ var _nextcloud_capabilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nextcloud/capabilities */ "./node_modules/@nextcloud/capabilities/dist/index.mjs");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var typescript_event_target__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! typescript-event-target */ "./node_modules/typescript-event-target/dist/index.mjs");
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");











const logger = (0,_nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__.getLoggerBuilder)().setApp("@nextcloud/files").detectUser().build();
var NewMenuEntryCategory = /* @__PURE__ */ ((NewMenuEntryCategory2) => {
  NewMenuEntryCategory2[NewMenuEntryCategory2["UploadFromDevice"] = 0] = "UploadFromDevice";
  NewMenuEntryCategory2[NewMenuEntryCategory2["CreateNew"] = 1] = "CreateNew";
  NewMenuEntryCategory2[NewMenuEntryCategory2["Other"] = 2] = "Other";
  return NewMenuEntryCategory2;
})(NewMenuEntryCategory || {});
class NewFileMenu {
  _entries = [];
  registerEntry(entry) {
    this.validateEntry(entry);
    entry.category = entry.category ?? 1;
    this._entries.push(entry);
  }
  unregisterEntry(entry) {
    const entryIndex = typeof entry === "string" ? this.getEntryIndex(entry) : this.getEntryIndex(entry.id);
    if (entryIndex === -1) {
      logger.warn("Entry not found, nothing removed", { entry, entries: this.getEntries() });
      return;
    }
    this._entries.splice(entryIndex, 1);
  }
  /**
   * Get the list of registered entries
   *
   * @param {Folder} context the creation context. Usually the current folder
   */
  getEntries(context) {
    if (context) {
      return this._entries.filter((entry) => typeof entry.enabled === "function" ? entry.enabled(context) : true);
    }
    return this._entries;
  }
  getEntryIndex(id) {
    return this._entries.findIndex((entry) => entry.id === id);
  }
  validateEntry(entry) {
    if (!entry.id || !entry.displayName || !(entry.iconSvgInline || entry.iconClass) || !entry.handler) {
      throw new Error("Invalid entry");
    }
    if (typeof entry.id !== "string" || typeof entry.displayName !== "string") {
      throw new Error("Invalid id or displayName property");
    }
    if (entry.iconClass && typeof entry.iconClass !== "string" || entry.iconSvgInline && typeof entry.iconSvgInline !== "string") {
      throw new Error("Invalid icon provided");
    }
    if (entry.enabled !== void 0 && typeof entry.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (typeof entry.handler !== "function") {
      throw new Error("Invalid handler property");
    }
    if ("order" in entry && typeof entry.order !== "number") {
      throw new Error("Invalid order property");
    }
    if (this.getEntryIndex(entry.id) !== -1) {
      throw new Error("Duplicate entry");
    }
  }
}
const getNewFileMenu = function() {
  if (typeof window._nc_newfilemenu === "undefined") {
    window._nc_newfilemenu = new NewFileMenu();
    logger.debug("NewFileMenu initialized");
  }
  return window._nc_newfilemenu;
};
var DefaultType = /* @__PURE__ */ ((DefaultType2) => {
  DefaultType2["DEFAULT"] = "default";
  DefaultType2["HIDDEN"] = "hidden";
  return DefaultType2;
})(DefaultType || {});
class FileAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get title() {
    return this._action.title;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  get execBatch() {
    return this._action.execBatch;
  }
  get order() {
    return this._action.order;
  }
  get parent() {
    return this._action.parent;
  }
  get default() {
    return this._action.default;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("title" in action && typeof action.title !== "function") {
      throw new Error("Invalid title function");
    }
    if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if ("execBatch" in action && typeof action.execBatch !== "function") {
      throw new Error("Invalid execBatch function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if ("parent" in action && typeof action.parent !== "string") {
      throw new Error("Invalid parent");
    }
    if (action.default && !Object.values(DefaultType).includes(action.default)) {
      throw new Error("Invalid default");
    }
    if ("inline" in action && typeof action.inline !== "function") {
      throw new Error("Invalid inline function");
    }
    if ("renderInline" in action && typeof action.renderInline !== "function") {
      throw new Error("Invalid renderInline function");
    }
  }
}
const registerFileAction = function(action) {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  if (window._nc_fileactions.find((search) => search.id === action.id)) {
    logger.error(`FileAction ${action.id} already registered`, { action });
    return;
  }
  window._nc_fileactions.push(action);
};
const getFileActions = function() {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  return window._nc_fileactions;
};
class Header {
  _header;
  constructor(header) {
    this.validateHeader(header);
    this._header = header;
  }
  get id() {
    return this._header.id;
  }
  get order() {
    return this._header.order;
  }
  get enabled() {
    return this._header.enabled;
  }
  get render() {
    return this._header.render;
  }
  get updated() {
    return this._header.updated;
  }
  validateHeader(header) {
    if (!header.id || !header.render || !header.updated) {
      throw new Error("Invalid header: id, render and updated are required");
    }
    if (typeof header.id !== "string") {
      throw new Error("Invalid id property");
    }
    if (header.enabled !== void 0 && typeof header.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (header.render && typeof header.render !== "function") {
      throw new Error("Invalid render property");
    }
    if (header.updated && typeof header.updated !== "function") {
      throw new Error("Invalid updated property");
    }
  }
}
const registerFileListHeaders = function(header) {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  if (window._nc_filelistheader.find((search) => search.id === header.id)) {
    logger.error(`Header ${header.id} already registered`, { header });
    return;
  }
  window._nc_filelistheader.push(header);
};
const getFileListHeaders = function() {
  if (typeof window._nc_filelistheader === "undefined") {
    window._nc_filelistheader = [];
    logger.debug("FileListHeaders initialized");
  }
  return window._nc_filelistheader;
};
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2[Permission2["NONE"] = 0] = "NONE";
  Permission2[Permission2["CREATE"] = 4] = "CREATE";
  Permission2[Permission2["READ"] = 1] = "READ";
  Permission2[Permission2["UPDATE"] = 2] = "UPDATE";
  Permission2[Permission2["DELETE"] = 8] = "DELETE";
  Permission2[Permission2["SHARE"] = 16] = "SHARE";
  Permission2[Permission2["ALL"] = 31] = "ALL";
  return Permission2;
})(Permission || {});
const defaultDavProperties = [
  "d:getcontentlength",
  "d:getcontenttype",
  "d:getetag",
  "d:getlastmodified",
  "d:creationdate",
  "d:displayname",
  "d:quota-available-bytes",
  "d:resourcetype",
  "nc:has-preview",
  "nc:is-encrypted",
  "nc:mount-type",
  "oc:comments-unread",
  "oc:favorite",
  "oc:fileid",
  "oc:owner-display-name",
  "oc:owner-id",
  "oc:permissions",
  "oc:size"
];
const defaultDavNamespaces = {
  d: "DAV:",
  nc: "http://nextcloud.org/ns",
  oc: "http://owncloud.org/ns",
  ocs: "http://open-collaboration-services.org/ns"
};
const registerDavProperty = function(prop, namespace = { nc: "http://nextcloud.org/ns" }) {
  if (typeof window._nc_dav_properties === "undefined") {
    window._nc_dav_properties = [...defaultDavProperties];
    window._nc_dav_namespaces = { ...defaultDavNamespaces };
  }
  const namespaces = { ...window._nc_dav_namespaces, ...namespace };
  if (window._nc_dav_properties.find((search) => search === prop)) {
    logger.warn(`${prop} already registered`, { prop });
    return false;
  }
  if (prop.startsWith("<") || prop.split(":").length !== 2) {
    logger.error(`${prop} is not valid. See example: 'oc:fileid'`, { prop });
    return false;
  }
  const ns = prop.split(":")[0];
  if (!namespaces[ns]) {
    logger.error(`${prop} namespace unknown`, { prop, namespaces });
    return false;
  }
  window._nc_dav_properties.push(prop);
  window._nc_dav_namespaces = namespaces;
  return true;
};
const getDavProperties = function() {
  if (typeof window._nc_dav_properties === "undefined") {
    window._nc_dav_properties = [...defaultDavProperties];
  }
  return window._nc_dav_properties.map((prop) => `<${prop} />`).join(" ");
};
const getDavNameSpaces = function() {
  if (typeof window._nc_dav_namespaces === "undefined") {
    window._nc_dav_namespaces = { ...defaultDavNamespaces };
  }
  return Object.keys(window._nc_dav_namespaces).map((ns) => `xmlns:${ns}="${window._nc_dav_namespaces?.[ns]}"`).join(" ");
};
const davGetDefaultPropfind = function() {
  return `<?xml version="1.0"?>
		<d:propfind ${getDavNameSpaces()}>
			<d:prop>
				${getDavProperties()}
			</d:prop>
		</d:propfind>`;
};
const davGetFavoritesReport = function() {
  return `<?xml version="1.0"?>
		<oc:filter-files ${getDavNameSpaces()}>
			<d:prop>
				${getDavProperties()}
			</d:prop>
			<oc:filter-rules>
				<oc:favorite>1</oc:favorite>
			</oc:filter-rules>
		</oc:filter-files>`;
};
const davGetRecentSearch = function(lastModified) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${getDavNameSpaces()}
	xmlns:ns="https://github.com/icewind1991/SearchDAV/ns">
	<d:basicsearch>
		<d:select>
			<d:prop>
				${getDavProperties()}
			</d:prop>
		</d:select>
		<d:from>
			<d:scope>
				<d:href>/files/${(0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)()?.uid}/</d:href>
				<d:depth>infinity</d:depth>
			</d:scope>
		</d:from>
		<d:where>
			<d:and>
				<d:or>
					<d:not>
						<d:eq>
							<d:prop>
								<d:getcontenttype/>
							</d:prop>
							<d:literal>httpd/unix-directory</d:literal>
						</d:eq>
					</d:not>
					<d:eq>
						<d:prop>
							<oc:size/>
						</d:prop>
						<d:literal>0</d:literal>
					</d:eq>
				</d:or>
				<d:gt>
					<d:prop>
						<d:getlastmodified/>
					</d:prop>
					<d:literal>${lastModified}</d:literal>
				</d:gt>
			</d:and>
		</d:where>
		<d:orderby>
			<d:order>
				<d:prop>
					<d:getlastmodified/>
				</d:prop>
				<d:descending/>
			</d:order>
		</d:orderby>
		<d:limit>
			<d:nresults>100</d:nresults>
			<ns:firstresult>0</ns:firstresult>
		</d:limit>
	</d:basicsearch>
</d:searchrequest>`;
};
const davParsePermissions = function(permString = "") {
  let permissions = Permission.NONE;
  if (!permString) {
    return permissions;
  }
  if (permString.includes("C") || permString.includes("K")) {
    permissions |= Permission.CREATE;
  }
  if (permString.includes("G")) {
    permissions |= Permission.READ;
  }
  if (permString.includes("W") || permString.includes("N") || permString.includes("V")) {
    permissions |= Permission.UPDATE;
  }
  if (permString.includes("D")) {
    permissions |= Permission.DELETE;
  }
  if (permString.includes("R")) {
    permissions |= Permission.SHARE;
  }
  return permissions;
};
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["Folder"] = "folder";
  FileType2["File"] = "file";
  return FileType2;
})(FileType || {});
const isDavRessource = function(source, davService) {
  return source.match(davService) !== null;
};
const validateData = (data, davService) => {
  if (data.id && typeof data.id !== "number") {
    throw new Error("Invalid id type of value");
  }
  if (!data.source) {
    throw new Error("Missing mandatory source");
  }
  try {
    new URL(data.source);
  } catch (e) {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!data.source.startsWith("http")) {
    throw new Error("Invalid source format, only http(s) is supported");
  }
  if (data.displayname && typeof data.displayname !== "string") {
    throw new Error("Invalid displayname type");
  }
  if (data.mtime && !(data.mtime instanceof Date)) {
    throw new Error("Invalid mtime type");
  }
  if (data.crtime && !(data.crtime instanceof Date)) {
    throw new Error("Invalid crtime type");
  }
  if (!data.mime || typeof data.mime !== "string" || !data.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) {
    throw new Error("Missing or invalid mandatory mime");
  }
  if ("size" in data && typeof data.size !== "number" && data.size !== void 0) {
    throw new Error("Invalid size type");
  }
  if ("permissions" in data && data.permissions !== void 0 && !(typeof data.permissions === "number" && data.permissions >= Permission.NONE && data.permissions <= Permission.ALL)) {
    throw new Error("Invalid permissions");
  }
  if (data.owner && data.owner !== null && typeof data.owner !== "string") {
    throw new Error("Invalid owner type");
  }
  if (data.attributes && typeof data.attributes !== "object") {
    throw new Error("Invalid attributes type");
  }
  if (data.root && typeof data.root !== "string") {
    throw new Error("Invalid root type");
  }
  if (data.root && !data.root.startsWith("/")) {
    throw new Error("Root must start with a leading slash");
  }
  if (data.root && !data.source.includes(data.root)) {
    throw new Error("Root must be part of the source");
  }
  if (data.root && isDavRessource(data.source, davService)) {
    const service = data.source.match(davService)[0];
    if (!data.source.includes((0,path__WEBPACK_IMPORTED_MODULE_2__.join)(service, data.root))) {
      throw new Error("The root must be relative to the service. e.g /files/emma");
    }
  }
  if (data.status && !Object.values(NodeStatus).includes(data.status)) {
    throw new Error("Status must be a valid NodeStatus");
  }
};
var NodeStatus = /* @__PURE__ */ ((NodeStatus2) => {
  NodeStatus2["NEW"] = "new";
  NodeStatus2["FAILED"] = "failed";
  NodeStatus2["LOADING"] = "loading";
  NodeStatus2["LOCKED"] = "locked";
  return NodeStatus2;
})(NodeStatus || {});
class Node {
  _data;
  _attributes;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(Node.prototype)).filter((e) => typeof e[1].get === "function" && e[0] !== "__proto__").map((e) => e[0]);
  handler = {
    set: (target, prop, value) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target, prop) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.deleteProperty(target, prop);
    },
    // TODO: This is deprecated and only needed for files v3
    get: (target, prop, receiver) => {
      if (this.readonlyAttributes.includes(prop)) {
        logger.warn(`Accessing "Node.attributes.${prop}" is deprecated, access it directly on the Node instance.`);
        return Reflect.get(this, prop);
      }
      return Reflect.get(target, prop, receiver);
    }
  };
  constructor(data, davService) {
    validateData(data, davService || this._knownDavService);
    this._data = {
      // TODO: Remove with next major release, this is just for compatibility
      displayname: data.attributes?.displayname,
      ...data,
      attributes: {}
    };
    this._attributes = new Proxy(this._data.attributes, this.handler);
    this.update(data.attributes ?? {});
    if (davService) {
      this._knownDavService = davService;
    }
  }
  /**
   * Get the source url to this object
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin } = new URL(this.source);
    return origin + (0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_3__.encodePath)(this.source.slice(origin.length));
  }
  /**
   * Get this object name
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get basename() {
    return (0,path__WEBPACK_IMPORTED_MODULE_2__.basename)(this.source);
  }
  /**
   * The nodes displayname
   * By default the display name and the `basename` are identical,
   * but it is possible to have a different name. This happens
   * on the files app for example for shared folders.
   */
  get displayname() {
    return this._data.displayname || this.basename;
  }
  /**
   * Set the displayname
   */
  set displayname(displayname) {
    this._data.displayname = displayname;
  }
  /**
   * Get this object's extension
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get extension() {
    return (0,path__WEBPACK_IMPORTED_MODULE_2__.extname)(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   *
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get dirname() {
    if (this.root) {
      let source = this.source;
      if (this.isDavRessource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return (0,path__WEBPACK_IMPORTED_MODULE_2__.dirname)(source.slice(firstMatch + root.length) || "/");
    }
    const url = new URL(this.source);
    return (0,path__WEBPACK_IMPORTED_MODULE_2__.dirname)(url.pathname);
  }
  /**
   * Get the file mime
   * There is no setter as the mime is not meant to be changed
   */
  get mime() {
    return this._data.mime;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Set the file modification time
   */
  set mtime(mtime) {
    this._data.mtime = mtime;
  }
  /**
   * Get the file creation time
   * There is no setter as the creation time is not meant to be changed
   */
  get crtime() {
    return this._data.crtime;
  }
  /**
   * Get the file size
   */
  get size() {
    return this._data.size;
  }
  /**
   * Set the file size
   */
  set size(size) {
    this.updateMtime();
    this._data.size = size;
  }
  /**
   * Get the file attribute
   * This contains all additional attributes not provided by the Node class
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    if (this.owner === null && !this.isDavRessource) {
      return Permission.READ;
    }
    return this._data.permissions !== void 0 ? this._data.permissions : Permission.NONE;
  }
  /**
   * Set the file permissions
   */
  set permissions(permissions) {
    this.updateMtime();
    this._data.permissions = permissions;
  }
  /**
   * Get the file owner
   * There is no setter as the owner is not meant to be changed
   */
  get owner() {
    if (!this.isDavRessource) {
      return null;
    }
    return this._data.owner;
  }
  /**
   * Is this a dav-related ressource ?
   */
  get isDavRessource() {
    return isDavRessource(this.source, this._knownDavService);
  }
  /**
   * Get the dav root of this object
   * There is no setter as the root is not meant to be changed
   */
  get root() {
    if (this._data.root) {
      return this._data.root.replace(/^(.+)\/$/, "$1");
    }
    if (this.isDavRessource) {
      const root = (0,path__WEBPACK_IMPORTED_MODULE_2__.dirname)(this.source);
      return root.split(this._knownDavService).pop() || null;
    }
    return null;
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    if (this.root) {
      let source = this.source;
      if (this.isDavRessource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return source.slice(firstMatch + root.length) || "/";
    }
    return (this.dirname + "/" + this.basename).replace(/\/\//g, "/");
  }
  /**
   * Get the node id if defined.
   * There is no setter as the fileid is not meant to be changed
   */
  get fileid() {
    return this._data?.id;
  }
  /**
   * Get the node status.
   */
  get status() {
    return this._data?.status;
  }
  /**
   * Set the node status.
   */
  set status(status) {
    this._data.status = status;
  }
  /**
   * Move the node to a new destination
   *
   * @param {string} destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(destination) {
    validateData({ ...this._data, source: destination }, this._knownDavService);
    const oldBasename = this.basename;
    this._data.source = destination;
    if (this.displayname === oldBasename && this.basename !== oldBasename) {
      this.displayname = this.basename;
    }
    this.updateMtime();
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(basename2) {
    if (basename2.includes("/")) {
      throw new Error("Invalid basename");
    }
    this.move((0,path__WEBPACK_IMPORTED_MODULE_2__.dirname)(this.source) + "/" + basename2);
  }
  /**
   * Update the mtime if exists
   */
  updateMtime() {
    if (this._data.mtime) {
      this._data.mtime = /* @__PURE__ */ new Date();
    }
  }
  /**
   * Update the attributes of the node
   * Warning, updating attributes will NOT automatically update the mtime.
   *
   * @param attributes The new attributes to update on the Node attributes
   */
  update(attributes) {
    for (const [name, value] of Object.entries(attributes)) {
      try {
        if (value === void 0) {
          delete this.attributes[name];
        } else {
          this.attributes[name] = value;
        }
      } catch (e) {
        if (e instanceof TypeError) {
          continue;
        }
        throw e;
      }
    }
  }
}
class File extends Node {
  get type() {
    return FileType.File;
  }
}
class Folder extends Node {
  constructor(data) {
    super({
      ...data,
      mime: "httpd/unix-directory"
    });
  }
  get type() {
    return FileType.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}
function davGetRootPath() {
  if ((0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_7__.isPublicShare)()) {
    return `/files/${(0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_7__.getSharingToken)()}`;
  }
  return `/files/${(0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)()?.uid}`;
}
const davRootPath = davGetRootPath();
function davGetRemoteURL() {
  const url = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_4__.generateRemoteUrl)("dav");
  if ((0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_7__.isPublicShare)()) {
    return url.replace("remote.php", "public.php");
  }
  return url;
}
const davRemoteURL = davGetRemoteURL();
const davGetClient = function(remoteURL = davRemoteURL, headers = {}) {
  const client = (0,webdav__WEBPACK_IMPORTED_MODULE_6__.createClient)(remoteURL, { headers });
  function setHeaders(token) {
    client.setHeaders({
      ...headers,
      // Add this so the server knows it is an request from the browser
      "X-Requested-With": "XMLHttpRequest",
      // Inject user auth
      requesttoken: token ?? ""
    });
  }
  (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.onRequestTokenUpdate)(setHeaders);
  setHeaders((0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getRequestToken)());
  const patcher = (0,webdav__WEBPACK_IMPORTED_MODULE_6__.getPatcher)();
  patcher.patch("fetch", (url, options) => {
    const headers2 = options.headers;
    if (headers2?.method) {
      options.method = headers2.method;
      delete headers2.method;
    }
    return fetch(url, options);
  });
  return client;
};
const getFavoriteNodes = (davClient, path = "/", davRoot = davRootPath) => {
  const controller = new AbortController();
  return new cancelable_promise__WEBPACK_IMPORTED_MODULE_5__.CancelablePromise(async (resolve, reject, onCancel) => {
    onCancel(() => controller.abort());
    try {
      const contentsResponse = await davClient.getDirectoryContents(`${davRoot}${path}`, {
        signal: controller.signal,
        details: true,
        data: davGetFavoritesReport(),
        headers: {
          // see davGetClient for patched webdav client
          method: "REPORT"
        },
        includeSelf: true
      });
      const nodes = contentsResponse.data.filter((node) => node.filename !== path).map((result) => davResultToNode(result, davRoot));
      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
};
const davResultToNode = function(node, filesRoot = davRootPath, remoteURL = davRemoteURL) {
  let userId = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)()?.uid;
  if ((0,_nextcloud_sharing_public__WEBPACK_IMPORTED_MODULE_7__.isPublicShare)()) {
    userId = userId ?? "anonymous";
  } else if (!userId) {
    throw new Error("No user id found");
  }
  const props = node.props;
  const permissions = davParsePermissions(props?.permissions);
  const owner = String(props?.["owner-id"] || userId);
  const id = props.fileid || 0;
  const nodeData = {
    id,
    source: `${remoteURL}${node.filename}`,
    mtime: new Date(Date.parse(node.lastmod)),
    mime: node.mime || "application/octet-stream",
    // Manually cast to work around for https://github.com/perry-mitchell/webdav-client/pull/380
    displayname: props.displayname !== void 0 ? String(props.displayname) : void 0,
    size: props?.size || Number.parseInt(props.getcontentlength || "0"),
    // The fileid is set to -1 for failed requests
    status: id < 0 ? NodeStatus.FAILED : void 0,
    permissions,
    owner,
    root: filesRoot,
    attributes: {
      ...node,
      ...props,
      hasPreview: props?.["has-preview"]
    }
  };
  delete nodeData.attributes?.props;
  return node.type === "file" ? new File(nodeData) : new Folder(nodeData);
};
var InvalidFilenameErrorReason = /* @__PURE__ */ ((InvalidFilenameErrorReason2) => {
  InvalidFilenameErrorReason2["ReservedName"] = "reserved name";
  InvalidFilenameErrorReason2["Character"] = "character";
  InvalidFilenameErrorReason2["Extension"] = "extension";
  return InvalidFilenameErrorReason2;
})(InvalidFilenameErrorReason || {});
class InvalidFilenameError extends Error {
  constructor(options) {
    super(`Invalid ${options.reason} '${options.segment}' in filename '${options.filename}'`, { cause: options });
  }
  /**
   * The filename that was validated
   */
  get filename() {
    return this.cause.filename;
  }
  /**
   * Reason why the validation failed
   */
  get reason() {
    return this.cause.reason;
  }
  /**
   * Part of the filename that caused this error
   */
  get segment() {
    return this.cause.segment;
  }
}
function validateFilename(filename) {
  const capabilities = (0,_nextcloud_capabilities__WEBPACK_IMPORTED_MODULE_8__.getCapabilities)().files;
  const forbiddenCharacters = capabilities.forbidden_filename_characters ?? window._oc_config?.forbidden_filenames_characters ?? ["/", "\\"];
  for (const character of forbiddenCharacters) {
    if (filename.includes(character)) {
      throw new InvalidFilenameError({ segment: character, reason: "character", filename });
    }
  }
  filename = filename.toLocaleLowerCase();
  const forbiddenFilenames = capabilities.forbidden_filenames ?? [".htaccess"];
  if (forbiddenFilenames.includes(filename)) {
    throw new InvalidFilenameError({
      filename,
      segment: filename,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const endOfBasename = filename.indexOf(".", 1);
  const basename2 = filename.substring(0, endOfBasename === -1 ? void 0 : endOfBasename);
  const forbiddenFilenameBasenames = capabilities.forbidden_filename_basenames ?? [];
  if (forbiddenFilenameBasenames.includes(basename2)) {
    throw new InvalidFilenameError({
      filename,
      segment: basename2,
      reason: "reserved name"
      /* ReservedName */
    });
  }
  const forbiddenFilenameExtensions = capabilities.forbidden_filename_extensions ?? [".part", ".filepart"];
  for (const extension of forbiddenFilenameExtensions) {
    if (filename.length > extension.length && filename.endsWith(extension)) {
      throw new InvalidFilenameError({ segment: extension, reason: "extension", filename });
    }
  }
}
function isFilenameValid(filename) {
  try {
    validateFilename(filename);
    return true;
  } catch (error) {
    if (error instanceof InvalidFilenameError) {
      return false;
    }
    throw error;
  }
}
function getUniqueName(name, otherNames, options) {
  const opts = {
    suffix: (n) => `(${n})`,
    ignoreFileExtension: false,
    ...options
  };
  let newName = name;
  let i = 1;
  while (otherNames.includes(newName)) {
    const ext = opts.ignoreFileExtension ? "" : (0,path__WEBPACK_IMPORTED_MODULE_2__.extname)(name);
    const base = (0,path__WEBPACK_IMPORTED_MODULE_2__.basename)(name, ext);
    newName = `${base} ${opts.suffix(i++)}${ext}`;
  }
  return newName;
}
const humanList = ["B", "KB", "MB", "GB", "TB", "PB"];
const humanListBinary = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function formatFileSize(size, skipSmallSizes = false, binaryPrefixes = false, base1000 = false) {
  binaryPrefixes = binaryPrefixes && !base1000;
  if (typeof size === "string") {
    size = Number(size);
  }
  let order = size > 0 ? Math.floor(Math.log(size) / Math.log(base1000 ? 1e3 : 1024)) : 0;
  order = Math.min((binaryPrefixes ? humanListBinary.length : humanList.length) - 1, order);
  const readableFormat = binaryPrefixes ? humanListBinary[order] : humanList[order];
  let relativeSize = (size / Math.pow(base1000 ? 1e3 : 1024, order)).toFixed(1);
  if (skipSmallSizes === true && order === 0) {
    return (relativeSize !== "0.0" ? "< 1 " : "0 ") + (binaryPrefixes ? humanListBinary[1] : humanList[1]);
  }
  if (order < 2) {
    relativeSize = parseFloat(relativeSize).toFixed(0);
  } else {
    relativeSize = parseFloat(relativeSize).toLocaleString((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_9__.getCanonicalLocale)());
  }
  return relativeSize + " " + readableFormat;
}
function parseFileSize(value, forceBinary = false) {
  try {
    value = `${value}`.toLocaleLowerCase().replaceAll(/\s+/g, "").replaceAll(",", ".");
  } catch (e) {
    return null;
  }
  const match = value.match(/^([0-9]*(\.[0-9]*)?)([kmgtp]?)(i?)b?$/);
  if (match === null || match[1] === "." || match[1] === "") {
    return null;
  }
  const bytesArray = {
    "": 0,
    k: 1,
    m: 2,
    g: 3,
    t: 4,
    p: 5,
    e: 6
  };
  const decimalString = `${match[1]}`;
  const base = match[4] === "i" || forceBinary ? 1024 : 1e3;
  return Math.round(Number.parseFloat(decimalString) * base ** bytesArray[match[3]]);
}
function stringify(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
function orderBy(collection, identifiers2, orders) {
  identifiers2 = identifiers2 ?? [(value) => value];
  orders = orders ?? [];
  const sorting = identifiers2.map((_, index) => (orders[index] ?? "asc") === "asc" ? 1 : -1);
  const collator = Intl.Collator(
    [(0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_9__.getLanguage)(), (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_9__.getCanonicalLocale)()],
    {
      // handle 10 as ten and not as one-zero
      numeric: true,
      usage: "sort"
    }
  );
  return [...collection].sort((a, b) => {
    for (const [index, identifier] of identifiers2.entries()) {
      const value = collator.compare(stringify(identifier(a)), stringify(identifier(b)));
      if (value !== 0) {
        return value * sorting[index];
      }
    }
    return 0;
  });
}
var FilesSortingMode = /* @__PURE__ */ ((FilesSortingMode2) => {
  FilesSortingMode2["Name"] = "basename";
  FilesSortingMode2["Modified"] = "mtime";
  FilesSortingMode2["Size"] = "size";
  return FilesSortingMode2;
})(FilesSortingMode || {});
function sortNodes(nodes, options = {}) {
  const sortingOptions = {
    // Default to sort by name
    sortingMode: "basename",
    // Default to sort ascending
    sortingOrder: "asc",
    ...options
  };
  const basename2 = (name) => name.lastIndexOf(".") > 0 ? name.slice(0, name.lastIndexOf(".")) : name;
  const identifiers2 = [
    // 1: Sort favorites first if enabled
    ...sortingOptions.sortFavoritesFirst ? [(v) => v.attributes?.favorite !== 1] : [],
    // 2: Sort folders first if sorting by name
    ...sortingOptions.sortFoldersFirst ? [(v) => v.type !== "folder"] : [],
    // 3: Use sorting mode if NOT basename (to be able to use display name too)
    ...sortingOptions.sortingMode !== "basename" ? [(v) => v[sortingOptions.sortingMode]] : [],
    // 4: Use display name if available, fallback to name
    (v) => basename2(v.attributes?.displayname || v.basename),
    // 5: Finally, use basename if all previous sorting methods failed
    (v) => v.basename
  ];
  const orders = [
    // (for 1): always sort favorites before normal files
    ...sortingOptions.sortFavoritesFirst ? ["asc"] : [],
    // (for 2): always sort folders before files
    ...sortingOptions.sortFoldersFirst ? ["asc"] : [],
    // (for 3): Reverse if sorting by mtime as mtime higher means edited more recent -> lower
    ...sortingOptions.sortingMode === "mtime" ? [sortingOptions.sortingOrder === "asc" ? "desc" : "asc"] : [],
    // (also for 3 so make sure not to conflict with 2 and 3)
    ...sortingOptions.sortingMode !== "mtime" && sortingOptions.sortingMode !== "basename" ? [sortingOptions.sortingOrder] : [],
    // for 4: use configured sorting direction
    sortingOptions.sortingOrder,
    // for 5: use configured sorting direction
    sortingOptions.sortingOrder
  ];
  return orderBy(nodes, identifiers2, orders);
}
class Navigation extends typescript_event_target__WEBPACK_IMPORTED_MODULE_10__.TypedEventTarget {
  _views = [];
  _currentView = null;
  /**
   * Register a new view on the navigation
   * @param view The view to register
   * @throws `Error` is thrown if a view with the same id is already registered
   */
  register(view) {
    if (this._views.find((search) => search.id === view.id)) {
      throw new Error(`View id ${view.id} is already registered`);
    }
    this._views.push(view);
    this.dispatchTypedEvent("update", new CustomEvent("update"));
  }
  /**
   * Remove a registered view
   * @param id The id of the view to remove
   */
  remove(id) {
    const index = this._views.findIndex((view) => view.id === id);
    if (index !== -1) {
      this._views.splice(index, 1);
      this.dispatchTypedEvent("update", new CustomEvent("update"));
    }
  }
  /**
   * Set the currently active view
   * @fires UpdateActiveViewEvent
   * @param view New active view
   */
  setActive(view) {
    this._currentView = view;
    const event = new CustomEvent("updateActive", { detail: view });
    this.dispatchTypedEvent("updateActive", event);
  }
  /**
   * The currently active files view
   */
  get active() {
    return this._currentView;
  }
  /**
   * All registered views
   */
  get views() {
    return this._views;
  }
}
const getNavigation = function() {
  if (typeof window._nc_navigation === "undefined") {
    window._nc_navigation = new Navigation();
    logger.debug("Navigation service initialized");
  }
  return window._nc_navigation;
};
class Column {
  _column;
  constructor(column) {
    isValidColumn(column);
    this._column = column;
  }
  get id() {
    return this._column.id;
  }
  get title() {
    return this._column.title;
  }
  get render() {
    return this._column.render;
  }
  get sort() {
    return this._column.sort;
  }
  get summary() {
    return this._column.summary;
  }
}
const isValidColumn = function(column) {
  if (!column.id || typeof column.id !== "string") {
    throw new Error("A column id is required");
  }
  if (!column.title || typeof column.title !== "string") {
    throw new Error("A column title is required");
  }
  if (!column.render || typeof column.render !== "function") {
    throw new Error("A render function is required");
  }
  if (column.sort && typeof column.sort !== "function") {
    throw new Error("Column sortFunction must be a function");
  }
  if (column.summary && typeof column.summary !== "function") {
    throw new Error("Column summary must be a function");
  }
  return true;
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var validator$2 = {};
var util$3 = {};
(function(exports) {
  const nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  const nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  const nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
  const regexName = new RegExp("^" + nameRegexp + "$");
  const getAllMatches = function(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while (match) {
      const allmatches = [];
      allmatches.startIndex = regex.lastIndex - match[0].length;
      const len = match.length;
      for (let index = 0; index < len; index++) {
        allmatches.push(match[index]);
      }
      matches.push(allmatches);
      match = regex.exec(string);
    }
    return matches;
  };
  const isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === "undefined");
  };
  exports.isExist = function(v) {
    return typeof v !== "undefined";
  };
  exports.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
  };
  exports.merge = function(target, a, arrayMode) {
    if (a) {
      const keys = Object.keys(a);
      const len = keys.length;
      for (let i = 0; i < len; i++) {
        if (arrayMode === "strict") {
          target[keys[i]] = [a[keys[i]]];
        } else {
          target[keys[i]] = a[keys[i]];
        }
      }
    }
  };
  exports.getValue = function(v) {
    if (exports.isExist(v)) {
      return v;
    } else {
      return "";
    }
  };
  exports.isName = isName;
  exports.getAllMatches = getAllMatches;
  exports.nameRegexp = nameRegexp;
})(util$3);
const util$2 = util$3;
const defaultOptions$2 = {
  allowBooleanAttributes: false,
  //A tag can have attributes without any value
  unpairedTags: []
};
validator$2.validate = function(xmlData, options) {
  options = Object.assign({}, defaultOptions$2, options);
  const tags = [];
  let tagFound = false;
  let reachedRoot = false;
  if (xmlData[0] === "\uFEFF") {
    xmlData = xmlData.substr(1);
  }
  for (let i = 0; i < xmlData.length; i++) {
    if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
      i += 2;
      i = readPI(xmlData, i);
      if (i.err) return i;
    } else if (xmlData[i] === "<") {
      let tagStartPos = i;
      i++;
      if (xmlData[i] === "!") {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === "/") {
          closingTag = true;
          i++;
        }
        let tagName = "";
        for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        if (tagName[tagName.length - 1] === "/") {
          tagName = tagName.substring(0, tagName.length - 1);
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "Invalid space after '<'.";
          } else {
            msg = "Tag '" + tagName + "' is an invalid name.";
          }
          return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
        }
        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;
        if (attrStr[attrStr.length - 1] === "/") {
          const attrStrStart = i - attrStr.length;
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
          } else {
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
          } else if (tags.length === 0) {
            return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
          } else {
            const otg = tags.pop();
            if (tagName !== otg.tagName) {
              let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
              return getErrorObject(
                "InvalidTag",
                "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                getLineNumberForPosition(xmlData, tagStartPos)
              );
            }
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }
          if (reachedRoot === true) {
            return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
          } else if (options.unpairedTags.indexOf(tagName) !== -1) ;
          else {
            tags.push({ tagName, tagStartPos });
          }
          tagFound = true;
        }
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            if (xmlData[i + 1] === "!") {
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else if (xmlData[i + 1] === "?") {
              i = readPI(xmlData, ++i);
              if (i.err) return i;
            } else {
              break;
            }
          } else if (xmlData[i] === "&") {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          } else {
            if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
              return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
            }
          }
        }
        if (xmlData[i] === "<") {
          i--;
        }
      }
    } else {
      if (isWhiteSpace(xmlData[i])) {
        continue;
      }
      return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }
  if (!tagFound) {
    return getErrorObject("InvalidXml", "Start tag expected.", 1);
  } else if (tags.length == 1) {
    return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
  } else if (tags.length > 0) {
    return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t2) => t2.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
  }
  return true;
};
function isWhiteSpace(char) {
  return char === " " || char === "	" || char === "\n" || char === "\r";
}
function readPI(xmlData, i) {
  const start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == "?" || xmlData[i] == " ") {
      const tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === "xml") {
        return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}
function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "<") {
        angleBracketsCount++;
      } else if (xmlData[i] === ">") {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
        i += 2;
        break;
      }
    }
  }
  return i;
}
const doubleQuote = '"';
const singleQuote = "'";
function readAttributeStr(xmlData, i) {
  let attrStr = "";
  let startChar = "";
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === "") {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) ;
      else {
        startChar = "";
      }
    } else if (xmlData[i] === ">") {
      if (startChar === "") {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== "") {
    return false;
  }
  return {
    value: attrStr,
    index: i,
    tagClosed
  };
}
const validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function validateAttributeString(attrStr, options) {
  const matches = util$2.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};
  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
      return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
      return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
    }
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      attrNames[attrName] = 1;
    } else {
      return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
    }
  }
  return true;
}
function validateNumberAmpersand(xmlData, i) {
  let re2 = /\d/;
  if (xmlData[i] === "x") {
    i++;
    re2 = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ";")
      return i;
    if (!xmlData[i].match(re2))
      break;
  }
  return -1;
}
function validateAmpersand(xmlData, i) {
  i++;
  if (xmlData[i] === ";")
    return -1;
  if (xmlData[i] === "#") {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ";")
      break;
    return -1;
  }
  return i;
}
function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code,
      msg: message,
      line: lineNumber.line || lineNumber,
      col: lineNumber.col
    }
  };
}
function validateAttrName(attrName) {
  return util$2.isName(attrName);
}
function validateTagName(tagname) {
  return util$2.isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
  const lines = xmlData.substring(0, index).split(/\r?\n/);
  return {
    line: lines.length,
    // column number is last line's length + 1, because column numbering starts at 1:
    col: lines[lines.length - 1].length + 1
  };
}
function getPositionFromMatch(match) {
  return match.startIndex + match[1].length;
}
var OptionsBuilder = {};
const defaultOptions$1 = {
  preserveOrder: false,
  attributeNamePrefix: "@_",
  attributesGroupName: false,
  textNodeName: "#text",
  ignoreAttributes: true,
  removeNSPrefix: false,
  // remove NS from tag name or attribute name if true
  allowBooleanAttributes: false,
  //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseTagValue: true,
  parseAttributeValue: false,
  trimValues: true,
  //Trim string values of tag and attributes
  cdataPropName: false,
  numberParseOptions: {
    hex: true,
    leadingZeros: true,
    eNotation: true
  },
  tagValueProcessor: function(tagName, val2) {
    return val2;
  },
  attributeValueProcessor: function(attrName, val2) {
    return val2;
  },
  stopNodes: [],
  //nested tags will not be parsed even for errors
  alwaysCreateTextNode: false,
  isArray: () => false,
  commentPropName: false,
  unpairedTags: [],
  processEntities: true,
  htmlEntities: false,
  ignoreDeclaration: false,
  ignorePiTags: false,
  transformTagName: false,
  transformAttributeName: false,
  updateTag: function(tagName, jPath, attrs) {
    return tagName;
  }
  // skipEmptyListItem: false
};
const buildOptions$1 = function(options) {
  return Object.assign({}, defaultOptions$1, options);
};
OptionsBuilder.buildOptions = buildOptions$1;
OptionsBuilder.defaultOptions = defaultOptions$1;
class XmlNode {
  constructor(tagname) {
    this.tagname = tagname;
    this.child = [];
    this[":@"] = {};
  }
  add(key, val2) {
    if (key === "__proto__") key = "#__proto__";
    this.child.push({ [key]: val2 });
  }
  addChild(node) {
    if (node.tagname === "__proto__") node.tagname = "#__proto__";
    if (node[":@"] && Object.keys(node[":@"]).length > 0) {
      this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
    } else {
      this.child.push({ [node.tagname]: node.child });
    }
  }
}
var xmlNode$1 = XmlNode;
const util$1 = util$3;
function readDocType$1(xmlData, i) {
  const entities = {};
  if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
    i = i + 9;
    let angleBracketsCount = 1;
    let hasBody = false, comment = false;
    let exp = "";
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === "<" && !comment) {
        if (hasBody && isEntity(xmlData, i)) {
          i += 7;
          [entityName, val, i] = readEntityExp(xmlData, i + 1);
          if (val.indexOf("&") === -1)
            entities[validateEntityName(entityName)] = {
              regx: RegExp(`&${entityName};`, "g"),
              val
            };
        } else if (hasBody && isElement(xmlData, i)) i += 8;
        else if (hasBody && isAttlist(xmlData, i)) i += 8;
        else if (hasBody && isNotation(xmlData, i)) i += 9;
        else if (isComment) comment = true;
        else throw new Error("Invalid DOCTYPE");
        angleBracketsCount++;
        exp = "";
      } else if (xmlData[i] === ">") {
        if (comment) {
          if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
            comment = false;
            angleBracketsCount--;
          }
        } else {
          angleBracketsCount--;
        }
        if (angleBracketsCount === 0) {
          break;
        }
      } else if (xmlData[i] === "[") {
        hasBody = true;
      } else {
        exp += xmlData[i];
      }
    }
    if (angleBracketsCount !== 0) {
      throw new Error(`Unclosed DOCTYPE`);
    }
  } else {
    throw new Error(`Invalid Tag instead of DOCTYPE`);
  }
  return { entities, i };
}
function readEntityExp(xmlData, i) {
  let entityName2 = "";
  for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
    entityName2 += xmlData[i];
  }
  entityName2 = entityName2.trim();
  if (entityName2.indexOf(" ") !== -1) throw new Error("External entites are not supported");
  const startChar = xmlData[i++];
  let val2 = "";
  for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
    val2 += xmlData[i];
  }
  return [entityName2, val2, i];
}
function isComment(xmlData, i) {
  if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") return true;
  return false;
}
function isEntity(xmlData, i) {
  if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") return true;
  return false;
}
function isElement(xmlData, i) {
  if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") return true;
  return false;
}
function isAttlist(xmlData, i) {
  if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T") return true;
  return false;
}
function isNotation(xmlData, i) {
  if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N") return true;
  return false;
}
function validateEntityName(name) {
  if (util$1.isName(name))
    return name;
  else
    throw new Error(`Invalid entity name ${name}`);
}
var DocTypeReader = readDocType$1;
const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
const numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
if (!Number.parseInt && window.parseInt) {
  Number.parseInt = window.parseInt;
}
if (!Number.parseFloat && window.parseFloat) {
  Number.parseFloat = window.parseFloat;
}
const consider = {
  hex: true,
  leadingZeros: true,
  decimalPoint: ".",
  eNotation: true
  //skipLike: /regex/
};
function toNumber$1(str, options = {}) {
  options = Object.assign({}, consider, options);
  if (!str || typeof str !== "string") return str;
  let trimmedStr = str.trim();
  if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
  else if (options.hex && hexRegex.test(trimmedStr)) {
    return Number.parseInt(trimmedStr, 16);
  } else {
    const match = numRegex.exec(trimmedStr);
    if (match) {
      const sign = match[1];
      const leadingZeros = match[2];
      let numTrimmedByZeros = trimZeros(match[3]);
      const eNotation = match[4] || match[6];
      if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str;
      else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str;
      else {
        const num = Number(trimmedStr);
        const numStr = "" + num;
        if (numStr.search(/[eE]/) !== -1) {
          if (options.eNotation) return num;
          else return str;
        } else if (eNotation) {
          if (options.eNotation) return num;
          else return str;
        } else if (trimmedStr.indexOf(".") !== -1) {
          if (numStr === "0" && numTrimmedByZeros === "") return num;
          else if (numStr === numTrimmedByZeros) return num;
          else if (sign && numStr === "-" + numTrimmedByZeros) return num;
          else return str;
        }
        if (leadingZeros) {
          if (numTrimmedByZeros === numStr) return num;
          else if (sign + numTrimmedByZeros === numStr) return num;
          else return str;
        }
        if (trimmedStr === numStr) return num;
        else if (trimmedStr === sign + numStr) return num;
        return str;
      }
    } else {
      return str;
    }
  }
}
function trimZeros(numStr) {
  if (numStr && numStr.indexOf(".") !== -1) {
    numStr = numStr.replace(/0+$/, "");
    if (numStr === ".") numStr = "0";
    else if (numStr[0] === ".") numStr = "0" + numStr;
    else if (numStr[numStr.length - 1] === ".") numStr = numStr.substr(0, numStr.length - 1);
    return numStr;
  }
  return numStr;
}
var strnum = toNumber$1;
const util = util$3;
const xmlNode = xmlNode$1;
const readDocType = DocTypeReader;
const toNumber = strnum;
let OrderedObjParser$1 = class OrderedObjParser {
  constructor(options) {
    this.options = options;
    this.currentNode = null;
    this.tagsNodeStack = [];
    this.docTypeEntities = {};
    this.lastEntities = {
      "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
      "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
      "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
      "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
    };
    this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
    this.htmlEntities = {
      "space": { regex: /&(nbsp|#160);/g, val: " " },
      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
      "cent": { regex: /&(cent|#162);/g, val: "¢" },
      "pound": { regex: /&(pound|#163);/g, val: "£" },
      "yen": { regex: /&(yen|#165);/g, val: "¥" },
      "euro": { regex: /&(euro|#8364);/g, val: "€" },
      "copyright": { regex: /&(copy|#169);/g, val: "©" },
      "reg": { regex: /&(reg|#174);/g, val: "®" },
      "inr": { regex: /&(inr|#8377);/g, val: "₹" },
      "num_dec": { regex: /&#([0-9]{1,7});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
      "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 16)) }
    };
    this.addExternalEntities = addExternalEntities;
    this.parseXml = parseXml;
    this.parseTextData = parseTextData;
    this.resolveNameSpace = resolveNameSpace;
    this.buildAttributesMap = buildAttributesMap;
    this.isItStopNode = isItStopNode;
    this.replaceEntitiesValue = replaceEntitiesValue$1;
    this.readStopNodeData = readStopNodeData;
    this.saveTextToParentTag = saveTextToParentTag;
    this.addChild = addChild;
  }
};
function addExternalEntities(externalEntities) {
  const entKeys = Object.keys(externalEntities);
  for (let i = 0; i < entKeys.length; i++) {
    const ent = entKeys[i];
    this.lastEntities[ent] = {
      regex: new RegExp("&" + ent + ";", "g"),
      val: externalEntities[ent]
    };
  }
}
function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
  if (val2 !== void 0) {
    if (this.options.trimValues && !dontTrim) {
      val2 = val2.trim();
    }
    if (val2.length > 0) {
      if (!escapeEntities) val2 = this.replaceEntitiesValue(val2);
      const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
      if (newval === null || newval === void 0) {
        return val2;
      } else if (typeof newval !== typeof val2 || newval !== val2) {
        return newval;
      } else if (this.options.trimValues) {
        return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
      } else {
        const trimmedVal = val2.trim();
        if (trimmedVal === val2) {
          return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
        } else {
          return val2;
        }
      }
    }
  }
}
function resolveNameSpace(tagname) {
  if (this.options.removeNSPrefix) {
    const tags = tagname.split(":");
    const prefix = tagname.charAt(0) === "/" ? "/" : "";
    if (tags[0] === "xmlns") {
      return "";
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}
const attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function buildAttributesMap(attrStr, jPath, tagName) {
  if (!this.options.ignoreAttributes && typeof attrStr === "string") {
    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length;
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      let oldVal = matches[i][4];
      let aName = this.options.attributeNamePrefix + attrName;
      if (attrName.length) {
        if (this.options.transformAttributeName) {
          aName = this.options.transformAttributeName(aName);
        }
        if (aName === "__proto__") aName = "#__proto__";
        if (oldVal !== void 0) {
          if (this.options.trimValues) {
            oldVal = oldVal.trim();
          }
          oldVal = this.replaceEntitiesValue(oldVal);
          const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
          if (newVal === null || newVal === void 0) {
            attrs[aName] = oldVal;
          } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
            attrs[aName] = newVal;
          } else {
            attrs[aName] = parseValue(
              oldVal,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          }
        } else if (this.options.allowBooleanAttributes) {
          attrs[aName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (this.options.attributesGroupName) {
      const attrCollection = {};
      attrCollection[this.options.attributesGroupName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}
const parseXml = function(xmlData) {
  xmlData = xmlData.replace(/\r\n?/g, "\n");
  const xmlObj = new xmlNode("!xml");
  let currentNode = xmlObj;
  let textData = "";
  let jPath = "";
  for (let i = 0; i < xmlData.length; i++) {
    const ch = xmlData[i];
    if (ch === "<") {
      if (xmlData[i + 1] === "/") {
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
        let tagName = xmlData.substring(i + 2, closeIndex).trim();
        if (this.options.removeNSPrefix) {
          const colonIndex = tagName.indexOf(":");
          if (colonIndex !== -1) {
            tagName = tagName.substr(colonIndex + 1);
          }
        }
        if (this.options.transformTagName) {
          tagName = this.options.transformTagName(tagName);
        }
        if (currentNode) {
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
        }
        const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
        if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
          throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
        }
        let propIndex = 0;
        if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
          propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
          this.tagsNodeStack.pop();
        } else {
          propIndex = jPath.lastIndexOf(".");
        }
        jPath = jPath.substring(0, propIndex);
        currentNode = this.tagsNodeStack.pop();
        textData = "";
        i = closeIndex;
      } else if (xmlData[i + 1] === "?") {
        let tagData = readTagExp(xmlData, i, false, "?>");
        if (!tagData) throw new Error("Pi Tag is not closed.");
        textData = this.saveTextToParentTag(textData, currentNode, jPath);
        if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) ;
        else {
          const childNode = new xmlNode(tagData.tagName);
          childNode.add(this.options.textNodeName, "");
          if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
            childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
          }
          this.addChild(currentNode, childNode, jPath);
        }
        i = tagData.closeIndex + 1;
      } else if (xmlData.substr(i + 1, 3) === "!--") {
        const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
        if (this.options.commentPropName) {
          const comment = xmlData.substring(i + 4, endIndex - 2);
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
          currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
        }
        i = endIndex;
      } else if (xmlData.substr(i + 1, 2) === "!D") {
        const result = readDocType(xmlData, i);
        this.docTypeEntities = result.entities;
        i = result.i;
      } else if (xmlData.substr(i + 1, 2) === "![") {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
        const tagExp = xmlData.substring(i + 9, closeIndex);
        textData = this.saveTextToParentTag(textData, currentNode, jPath);
        let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
        if (val2 == void 0) val2 = "";
        if (this.options.cdataPropName) {
          currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
        } else {
          currentNode.add(this.options.textNodeName, val2);
        }
        i = closeIndex + 2;
      } else {
        let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
        let tagName = result.tagName;
        const rawTagName = result.rawTagName;
        let tagExp = result.tagExp;
        let attrExpPresent = result.attrExpPresent;
        let closeIndex = result.closeIndex;
        if (this.options.transformTagName) {
          tagName = this.options.transformTagName(tagName);
        }
        if (currentNode && textData) {
          if (currentNode.tagname !== "!xml") {
            textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
          }
        }
        const lastTag = currentNode;
        if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
          currentNode = this.tagsNodeStack.pop();
          jPath = jPath.substring(0, jPath.lastIndexOf("."));
        }
        if (tagName !== xmlObj.tagname) {
          jPath += jPath ? "." + tagName : tagName;
        }
        if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
          let tagContent = "";
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            i = result.closeIndex;
          } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
            i = result.closeIndex;
          } else {
            const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
            if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
            i = result2.i;
            tagContent = result2.tagContent;
          }
          const childNode = new xmlNode(tagName);
          if (tagName !== tagExp && attrExpPresent) {
            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
          }
          if (tagContent) {
            tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
          }
          jPath = jPath.substr(0, jPath.lastIndexOf("."));
          childNode.add(this.options.textNodeName, tagContent);
          this.addChild(currentNode, childNode, jPath);
        } else {
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            const childNode = new xmlNode(tagName);
            if (tagName !== tagExp && attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath);
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
          } else {
            const childNode = new xmlNode(tagName);
            this.tagsNodeStack.push(currentNode);
            if (tagName !== tagExp && attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath);
            currentNode = childNode;
          }
          textData = "";
          i = closeIndex;
        }
      }
    } else {
      textData += xmlData[i];
    }
  }
  return xmlObj.child;
};
function addChild(currentNode, childNode, jPath) {
  const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
  if (result === false) ;
  else if (typeof result === "string") {
    childNode.tagname = result;
    currentNode.addChild(childNode);
  } else {
    currentNode.addChild(childNode);
  }
}
const replaceEntitiesValue$1 = function(val2) {
  if (this.options.processEntities) {
    for (let entityName2 in this.docTypeEntities) {
      const entity = this.docTypeEntities[entityName2];
      val2 = val2.replace(entity.regx, entity.val);
    }
    for (let entityName2 in this.lastEntities) {
      const entity = this.lastEntities[entityName2];
      val2 = val2.replace(entity.regex, entity.val);
    }
    if (this.options.htmlEntities) {
      for (let entityName2 in this.htmlEntities) {
        const entity = this.htmlEntities[entityName2];
        val2 = val2.replace(entity.regex, entity.val);
      }
    }
    val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
  }
  return val2;
};
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
  if (textData) {
    if (isLeafNode === void 0) isLeafNode = Object.keys(currentNode.child).length === 0;
    textData = this.parseTextData(
      textData,
      currentNode.tagname,
      jPath,
      false,
      currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
      isLeafNode
    );
    if (textData !== void 0 && textData !== "")
      currentNode.add(this.options.textNodeName, textData);
    textData = "";
  }
  return textData;
}
function isItStopNode(stopNodes, jPath, currentTagName) {
  const allNodesExp = "*." + currentTagName;
  for (const stopNodePath in stopNodes) {
    const stopNodeExp = stopNodes[stopNodePath];
    if (allNodesExp === stopNodeExp || jPath === stopNodeExp) return true;
  }
  return false;
}
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < xmlData.length; index++) {
    let ch = xmlData[index];
    if (attrBoundary) {
      if (ch === attrBoundary) attrBoundary = "";
    } else if (ch === '"' || ch === "'") {
      attrBoundary = ch;
    } else if (ch === closingChar[0]) {
      if (closingChar[1]) {
        if (xmlData[index + 1] === closingChar[1]) {
          return {
            data: tagExp,
            index
          };
        }
      } else {
        return {
          data: tagExp,
          index
        };
      }
    } else if (ch === "	") {
      ch = " ";
    }
    tagExp += ch;
  }
}
function findClosingIndex(xmlData, str, i, errMsg) {
  const closingIndex = xmlData.indexOf(str, i);
  if (closingIndex === -1) {
    throw new Error(errMsg);
  } else {
    return closingIndex + str.length - 1;
  }
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
  const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
  if (!result) return;
  let tagExp = result.data;
  const closeIndex = result.index;
  const separatorIndex = tagExp.search(/\s/);
  let tagName = tagExp;
  let attrExpPresent = true;
  if (separatorIndex !== -1) {
    tagName = tagExp.substring(0, separatorIndex);
    tagExp = tagExp.substring(separatorIndex + 1).trimStart();
  }
  const rawTagName = tagName;
  if (removeNSPrefix) {
    const colonIndex = tagName.indexOf(":");
    if (colonIndex !== -1) {
      tagName = tagName.substr(colonIndex + 1);
      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
    }
  }
  return {
    tagName,
    tagExp,
    closeIndex,
    attrExpPresent,
    rawTagName
  };
}
function readStopNodeData(xmlData, tagName, i) {
  const startIndex = i;
  let openTagCount = 1;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === "<") {
      if (xmlData[i + 1] === "/") {
        const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
        let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
        if (closeTagName === tagName) {
          openTagCount--;
          if (openTagCount === 0) {
            return {
              tagContent: xmlData.substring(startIndex, i),
              i: closeIndex
            };
          }
        }
        i = closeIndex;
      } else if (xmlData[i + 1] === "?") {
        const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 3) === "!--") {
        const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 2) === "![") {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
        i = closeIndex;
      } else {
        const tagData = readTagExp(xmlData, i, ">");
        if (tagData) {
          const openTagName = tagData && tagData.tagName;
          if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
            openTagCount++;
          }
          i = tagData.closeIndex;
        }
      }
    }
  }
}
function parseValue(val2, shouldParse, options) {
  if (shouldParse && typeof val2 === "string") {
    const newval = val2.trim();
    if (newval === "true") return true;
    else if (newval === "false") return false;
    else return toNumber(val2, options);
  } else {
    if (util.isExist(val2)) {
      return val2;
    } else {
      return "";
    }
  }
}
var OrderedObjParser_1 = OrderedObjParser$1;
var node2json = {};
function prettify$1(node, options) {
  return compress(node, options);
}
function compress(arr, options, jPath) {
  let text;
  const compressedObj = {};
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const property = propName$1(tagObj);
    let newJpath = "";
    if (jPath === void 0) newJpath = property;
    else newJpath = jPath + "." + property;
    if (property === options.textNodeName) {
      if (text === void 0) text = tagObj[property];
      else text += "" + tagObj[property];
    } else if (property === void 0) {
      continue;
    } else if (tagObj[property]) {
      let val2 = compress(tagObj[property], options, newJpath);
      const isLeaf = isLeafTag(val2, options);
      if (tagObj[":@"]) {
        assignAttributes(val2, tagObj[":@"], newJpath, options);
      } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
        val2 = val2[options.textNodeName];
      } else if (Object.keys(val2).length === 0) {
        if (options.alwaysCreateTextNode) val2[options.textNodeName] = "";
        else val2 = "";
      }
      if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
        if (!Array.isArray(compressedObj[property])) {
          compressedObj[property] = [compressedObj[property]];
        }
        compressedObj[property].push(val2);
      } else {
        if (options.isArray(property, newJpath, isLeaf)) {
          compressedObj[property] = [val2];
        } else {
          compressedObj[property] = val2;
        }
      }
    }
  }
  if (typeof text === "string") {
    if (text.length > 0) compressedObj[options.textNodeName] = text;
  } else if (text !== void 0) compressedObj[options.textNodeName] = text;
  return compressedObj;
}
function propName$1(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== ":@") return key;
  }
}
function assignAttributes(obj, attrMap, jpath, options) {
  if (attrMap) {
    const keys = Object.keys(attrMap);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const atrrName = keys[i];
      if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
        obj[atrrName] = [attrMap[atrrName]];
      } else {
        obj[atrrName] = attrMap[atrrName];
      }
    }
  }
}
function isLeafTag(obj, options) {
  const { textNodeName } = options;
  const propCount = Object.keys(obj).length;
  if (propCount === 0) {
    return true;
  }
  if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
    return true;
  }
  return false;
}
node2json.prettify = prettify$1;
const { buildOptions } = OptionsBuilder;
const OrderedObjParser2 = OrderedObjParser_1;
const { prettify } = node2json;
const validator$1 = validator$2;
let XMLParser$1 = class XMLParser {
  constructor(options) {
    this.externalEntities = {};
    this.options = buildOptions(options);
  }
  /**
   * Parse XML dats to JS object 
   * @param {string|Buffer} xmlData 
   * @param {boolean|Object} validationOption 
   */
  parse(xmlData, validationOption) {
    if (typeof xmlData === "string") ;
    else if (xmlData.toString) {
      xmlData = xmlData.toString();
    } else {
      throw new Error("XML data is accepted in String or Bytes[] form.");
    }
    if (validationOption) {
      if (validationOption === true) validationOption = {};
      const result = validator$1.validate(xmlData, validationOption);
      if (result !== true) {
        throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
      }
    }
    const orderedObjParser = new OrderedObjParser2(this.options);
    orderedObjParser.addExternalEntities(this.externalEntities);
    const orderedResult = orderedObjParser.parseXml(xmlData);
    if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
    else return prettify(orderedResult, this.options);
  }
  /**
   * Add Entity which is not by default supported by this library
   * @param {string} key 
   * @param {string} value 
   */
  addEntity(key, value) {
    if (value.indexOf("&") !== -1) {
      throw new Error("Entity value can't have '&'");
    } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
      throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
    } else if (value === "&") {
      throw new Error("An entity with value '&' is not permitted");
    } else {
      this.externalEntities[key] = value;
    }
  }
};
var XMLParser_1 = XMLParser$1;
const EOL = "\n";
function toXml(jArray, options) {
  let indentation = "";
  if (options.format && options.indentBy.length > 0) {
    indentation = EOL;
  }
  return arrToStr(jArray, options, "", indentation);
}
function arrToStr(arr, options, jPath, indentation) {
  let xmlStr = "";
  let isPreviousElementTag = false;
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const tagName = propName(tagObj);
    if (tagName === void 0) continue;
    let newJPath = "";
    if (jPath.length === 0) newJPath = tagName;
    else newJPath = `${jPath}.${tagName}`;
    if (tagName === options.textNodeName) {
      let tagText = tagObj[tagName];
      if (!isStopNode(newJPath, options)) {
        tagText = options.tagValueProcessor(tagName, tagText);
        tagText = replaceEntitiesValue(tagText, options);
      }
      if (isPreviousElementTag) {
        xmlStr += indentation;
      }
      xmlStr += tagText;
      isPreviousElementTag = false;
      continue;
    } else if (tagName === options.cdataPropName) {
      if (isPreviousElementTag) {
        xmlStr += indentation;
      }
      xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
      isPreviousElementTag = false;
      continue;
    } else if (tagName === options.commentPropName) {
      xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
      isPreviousElementTag = true;
      continue;
    } else if (tagName[0] === "?") {
      const attStr2 = attr_to_str(tagObj[":@"], options);
      const tempInd = tagName === "?xml" ? "" : indentation;
      let piTextNodeName = tagObj[tagName][0][options.textNodeName];
      piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
      xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
      isPreviousElementTag = true;
      continue;
    }
    let newIdentation = indentation;
    if (newIdentation !== "") {
      newIdentation += options.indentBy;
    }
    const attStr = attr_to_str(tagObj[":@"], options);
    const tagStart = indentation + `<${tagName}${attStr}`;
    const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
    if (options.unpairedTags.indexOf(tagName) !== -1) {
      if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
      else xmlStr += tagStart + "/>";
    } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
      xmlStr += tagStart + "/>";
    } else if (tagValue && tagValue.endsWith(">")) {
      xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
    } else {
      xmlStr += tagStart + ">";
      if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
        xmlStr += indentation + options.indentBy + tagValue + indentation;
      } else {
        xmlStr += tagValue;
      }
      xmlStr += `</${tagName}>`;
    }
    isPreviousElementTag = true;
  }
  return xmlStr;
}
function propName(obj) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!obj.hasOwnProperty(key)) continue;
    if (key !== ":@") return key;
  }
}
function attr_to_str(attrMap, options) {
  let attrStr = "";
  if (attrMap && !options.ignoreAttributes) {
    for (let attr in attrMap) {
      if (!attrMap.hasOwnProperty(attr)) continue;
      let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
      attrVal = replaceEntitiesValue(attrVal, options);
      if (attrVal === true && options.suppressBooleanAttributes) {
        attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
      } else {
        attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
      }
    }
  }
  return attrStr;
}
function isStopNode(jPath, options) {
  jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
  let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
  for (let index in options.stopNodes) {
    if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName) return true;
  }
  return false;
}
function replaceEntitiesValue(textValue, options) {
  if (textValue && textValue.length > 0 && options.processEntities) {
    for (let i = 0; i < options.entities.length; i++) {
      const entity = options.entities[i];
      textValue = textValue.replace(entity.regex, entity.val);
    }
  }
  return textValue;
}
var orderedJs2Xml = toXml;
const buildFromOrderedJs = orderedJs2Xml;
const defaultOptions = {
  attributeNamePrefix: "@_",
  attributesGroupName: false,
  textNodeName: "#text",
  ignoreAttributes: true,
  cdataPropName: false,
  format: false,
  indentBy: "  ",
  suppressEmptyNode: false,
  suppressUnpairedNode: true,
  suppressBooleanAttributes: true,
  tagValueProcessor: function(key, a) {
    return a;
  },
  attributeValueProcessor: function(attrName, a) {
    return a;
  },
  preserveOrder: false,
  commentPropName: false,
  unpairedTags: [],
  entities: [
    { regex: new RegExp("&", "g"), val: "&amp;" },
    //it must be on top
    { regex: new RegExp(">", "g"), val: "&gt;" },
    { regex: new RegExp("<", "g"), val: "&lt;" },
    { regex: new RegExp("'", "g"), val: "&apos;" },
    { regex: new RegExp('"', "g"), val: "&quot;" }
  ],
  processEntities: true,
  stopNodes: [],
  // transformTagName: false,
  // transformAttributeName: false,
  oneListGroup: false
};
function Builder(options) {
  this.options = Object.assign({}, defaultOptions, options);
  if (this.options.ignoreAttributes || this.options.attributesGroupName) {
    this.isAttribute = function() {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  this.processTextOrObjNode = processTextOrObjNode;
  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = ">\n";
    this.newLine = "\n";
  } else {
    this.indentate = function() {
      return "";
    };
    this.tagEndChar = ">";
    this.newLine = "";
  }
}
Builder.prototype.build = function(jObj) {
  if (this.options.preserveOrder) {
    return buildFromOrderedJs(jObj, this.options);
  } else {
    if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
      jObj = {
        [this.options.arrayNodeName]: jObj
      };
    }
    return this.j2x(jObj, 0).val;
  }
};
Builder.prototype.j2x = function(jObj, level) {
  let attrStr = "";
  let val2 = "";
  for (let key in jObj) {
    if (!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
    if (typeof jObj[key] === "undefined") {
      if (this.isAttribute(key)) {
        val2 += "";
      }
    } else if (jObj[key] === null) {
      if (this.isAttribute(key)) {
        val2 += "";
      } else if (key[0] === "?") {
        val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
      } else {
        val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
      }
    } else if (jObj[key] instanceof Date) {
      val2 += this.buildTextValNode(jObj[key], key, "", level);
    } else if (typeof jObj[key] !== "object") {
      const attr = this.isAttribute(key);
      if (attr) {
        attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
      } else {
        if (key === this.options.textNodeName) {
          let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
          val2 += this.replaceEntitiesValue(newval);
        } else {
          val2 += this.buildTextValNode(jObj[key], key, "", level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      const arrLen = jObj[key].length;
      let listTagVal = "";
      let listTagAttr = "";
      for (let j = 0; j < arrLen; j++) {
        const item = jObj[key][j];
        if (typeof item === "undefined") ;
        else if (item === null) {
          if (key[0] === "?") val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          else val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        } else if (typeof item === "object") {
          if (this.options.oneListGroup) {
            const result = this.j2x(item, level + 1);
            listTagVal += result.val;
            if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
              listTagAttr += result.attrStr;
            }
          } else {
            listTagVal += this.processTextOrObjNode(item, key, level);
          }
        } else {
          if (this.options.oneListGroup) {
            let textValue = this.options.tagValueProcessor(key, item);
            textValue = this.replaceEntitiesValue(textValue);
            listTagVal += textValue;
          } else {
            listTagVal += this.buildTextValNode(item, key, "", level);
          }
        }
      }
      if (this.options.oneListGroup) {
        listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
      }
      val2 += listTagVal;
    } else {
      if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
        }
      } else {
        val2 += this.processTextOrObjNode(jObj[key], key, level);
      }
    }
  }
  return { attrStr, val: val2 };
};
Builder.prototype.buildAttrPairStr = function(attrName, val2) {
  val2 = this.options.attributeValueProcessor(attrName, "" + val2);
  val2 = this.replaceEntitiesValue(val2);
  if (this.options.suppressBooleanAttributes && val2 === "true") {
    return " " + attrName;
  } else return " " + attrName + '="' + val2 + '"';
};
function processTextOrObjNode(object, key, level) {
  const result = this.j2x(object, level + 1);
  if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
    return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
  } else {
    return this.buildObjectNode(result.val, key, result.attrStr, level);
  }
}
Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
  if (val2 === "") {
    if (key[0] === "?") return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
    else {
      return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
    }
  } else {
    let tagEndExp = "</" + key + this.tagEndChar;
    let piClosingChar = "";
    if (key[0] === "?") {
      piClosingChar = "?";
      tagEndExp = "";
    }
    if ((attrStr || attrStr === "") && val2.indexOf("<") === -1) {
      return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
    } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
      return this.indentate(level) + `<!--${val2}-->` + this.newLine;
    } else {
      return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
    }
  }
};
Builder.prototype.closeTag = function(key) {
  let closeTag = "";
  if (this.options.unpairedTags.indexOf(key) !== -1) {
    if (!this.options.suppressUnpairedNode) closeTag = "/";
  } else if (this.options.suppressEmptyNode) {
    closeTag = "/";
  } else {
    closeTag = `></${key}`;
  }
  return closeTag;
};
Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
  if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
    return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
  } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
    return this.indentate(level) + `<!--${val2}-->` + this.newLine;
  } else if (key[0] === "?") {
    return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
  } else {
    let textValue = this.options.tagValueProcessor(key, val2);
    textValue = this.replaceEntitiesValue(textValue);
    if (textValue === "") {
      return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
    } else {
      return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
    }
  }
};
Builder.prototype.replaceEntitiesValue = function(textValue) {
  if (textValue && textValue.length > 0 && this.options.processEntities) {
    for (let i = 0; i < this.options.entities.length; i++) {
      const entity = this.options.entities[i];
      textValue = textValue.replace(entity.regex, entity.val);
    }
  }
  return textValue;
};
function indentate(level) {
  return this.options.indentBy.repeat(level);
}
function isAttribute(name) {
  if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}
var json2xml = Builder;
const validator = validator$2;
const XMLParser2 = XMLParser_1;
const XMLBuilder = json2xml;
var fxp = {
  XMLParser: XMLParser2,
  XMLValidator: validator,
  XMLBuilder
};
function isSvg(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  string = string.trim();
  if (string.length === 0) {
    return false;
  }
  if (fxp.XMLValidator.validate(string) !== true) {
    return false;
  }
  let jsonObject;
  const parser = new fxp.XMLParser();
  try {
    jsonObject = parser.parse(string);
  } catch {
    return false;
  }
  if (!jsonObject) {
    return false;
  }
  if (!Object.keys(jsonObject).some((x) => x.toLowerCase() === "svg")) {
    return false;
  }
  return true;
}
class View {
  _view;
  constructor(view) {
    isValidView(view);
    this._view = view;
  }
  get id() {
    return this._view.id;
  }
  get name() {
    return this._view.name;
  }
  get caption() {
    return this._view.caption;
  }
  get emptyTitle() {
    return this._view.emptyTitle;
  }
  get emptyCaption() {
    return this._view.emptyCaption;
  }
  get getContents() {
    return this._view.getContents;
  }
  get icon() {
    return this._view.icon;
  }
  set icon(icon) {
    this._view.icon = icon;
  }
  get order() {
    return this._view.order;
  }
  set order(order) {
    this._view.order = order;
  }
  get params() {
    return this._view.params;
  }
  set params(params) {
    this._view.params = params;
  }
  get columns() {
    return this._view.columns;
  }
  get emptyView() {
    return this._view.emptyView;
  }
  get parent() {
    return this._view.parent;
  }
  get sticky() {
    return this._view.sticky;
  }
  get expanded() {
    return this._view.expanded;
  }
  set expanded(expanded) {
    this._view.expanded = expanded;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
  get loadChildViews() {
    return this._view.loadChildViews;
  }
}
const isValidView = function(view) {
  if (!view.id || typeof view.id !== "string") {
    throw new Error("View id is required and must be a string");
  }
  if (!view.name || typeof view.name !== "string") {
    throw new Error("View name is required and must be a string");
  }
  if (view.columns && view.columns.length > 0 && (!view.caption || typeof view.caption !== "string")) {
    throw new Error("View caption is required for top-level views and must be a string");
  }
  if (!view.getContents || typeof view.getContents !== "function") {
    throw new Error("View getContents is required and must be a function");
  }
  if (!view.icon || typeof view.icon !== "string" || !isSvg(view.icon)) {
    throw new Error("View icon is required and must be a valid svg string");
  }
  if ("order" in view && typeof view.order !== "number") {
    throw new Error("View order must be a number");
  }
  if (view.columns) {
    view.columns.forEach((column) => {
      if (!(column instanceof Column)) {
        throw new Error("View columns must be an array of Column. Invalid column found");
      }
    });
  }
  if (view.emptyView && typeof view.emptyView !== "function") {
    throw new Error("View emptyView must be a function");
  }
  if (view.parent && typeof view.parent !== "string") {
    throw new Error("View parent must be a string");
  }
  if ("sticky" in view && typeof view.sticky !== "boolean") {
    throw new Error("View sticky must be a boolean");
  }
  if ("expanded" in view && typeof view.expanded !== "boolean") {
    throw new Error("View expanded must be a boolean");
  }
  if (view.defaultSortKey && typeof view.defaultSortKey !== "string") {
    throw new Error("View defaultSortKey must be a string");
  }
  if (view.loadChildViews && typeof view.loadChildViews !== "function") {
    throw new Error("View loadChildViews must be a function");
  }
  return true;
};
const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
var re$1 = { exports: {} };
(function(module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$1, re$1.exports);
var reExports = re$1.exports;
const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants;
const { safeRe: re, t } = reExports;
const parseOptions = parseOptions_1;
const { compareIdentifiers } = identifiers;
let SemVer$2 = class SemVer {
  constructor(version, options) {
    options = parseOptions(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("build compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease = [identifier, base];
          if (identifierBase === false) {
            prerelease = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease;
            }
          } else {
            this.prerelease = prerelease;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver = SemVer$2;
const SemVer$1 = semver;
const parse$1 = (version, options, throwErrors = false) => {
  if (version instanceof SemVer$1) {
    return version;
  }
  try {
    return new SemVer$1(version, options);
  } catch (er) {
    if (!throwErrors) {
      return null;
    }
    throw er;
  }
};
var parse_1 = parse$1;
const parse = parse_1;
const valid = (version, options) => {
  const v = parse(version, options);
  return v ? v.version : null;
};
var valid_1 = valid;
const valid$1 = /* @__PURE__ */ getDefaultExportFromCjs(valid_1);
const SemVer2 = semver;
const major = (a, loose) => new SemVer2(a, loose).major;
var major_1 = major;
const major$1 = /* @__PURE__ */ getDefaultExportFromCjs(major_1);
class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !valid$1(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major$1(bus2.getVersion()) !== major$1(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, event) {
    this.bus.emit(name, event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h) => h !== handler)
    );
  }
  emit(name, event) {
    (this.handlers.get(name) || []).forEach((h) => {
      try {
        h(event);
      } catch (e) {
        console.error("could not invoke event listener", e);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function emit(name, event) {
  getBus().emit(name, event);
}
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
class FileListFilter extends typescript_event_target__WEBPACK_IMPORTED_MODULE_10__.TypedEventTarget {
  id;
  order;
  constructor(id, order = 100) {
    super();
    this.id = id;
    this.order = order;
  }
  filter(nodes) {
    throw new Error("Not implemented");
  }
  updateChips(chips) {
    this.dispatchTypedEvent("update:chips", new CustomEvent("update:chips", { detail: chips }));
  }
  filterUpdated() {
    this.dispatchTypedEvent("update:filter", new CustomEvent("update:filter"));
  }
}
function registerFileListFilter(filter) {
  if (!window._nc_filelist_filters) {
    window._nc_filelist_filters = /* @__PURE__ */ new Map();
  }
  if (window._nc_filelist_filters.has(filter.id)) {
    throw new Error(`File list filter "${filter.id}" already registered`);
  }
  window._nc_filelist_filters.set(filter.id, filter);
  emit("files:filter:added", filter);
}
function unregisterFileListFilter(filterId) {
  if (window._nc_filelist_filters && window._nc_filelist_filters.has(filterId)) {
    window._nc_filelist_filters.delete(filterId);
    emit("files:filter:removed", filterId);
  }
}
function getFileListFilters() {
  if (!window._nc_filelist_filters) {
    return [];
  }
  return [...window._nc_filelist_filters.values()];
}
const addNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.registerEntry(entry);
};
const removeNewFileMenuEntry = function(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.unregisterEntry(entry);
};
const getNewFileMenuEntries = function(context) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.getEntries(context).sort((a, b) => {
    if (a.order !== void 0 && b.order !== void 0 && a.order !== b.order) {
      return a.order - b.order;
    }
    return a.displayName.localeCompare(b.displayName, void 0, { numeric: true, sensitivity: "base" });
  });
};



/***/ }),

/***/ "./node_modules/@nextcloud/initial-state/dist/index.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/@nextcloud/initial-state/dist/index.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadState: () => (/* binding */ loadState)
/* harmony export */ });
function loadState(app, key, fallback) {
  const elem = document.querySelector(`#initial-state-${app}-${key}`);
  if (elem === null) {
    if (fallback !== void 0) {
      return fallback;
    }
    throw new Error(`Could not find initial state ${key} of ${app}`);
  }
  try {
    return JSON.parse(atob(elem.value));
  } catch (e) {
    throw new Error(`Could not parse initial state ${key} of ${app}`);
  }
}



/***/ }),

/***/ "./node_modules/@nextcloud/l10n/dist/chunks/locale-BQFSYg2g.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/@nextcloud/l10n/dist/chunks/locale-BQFSYg2g.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getLanguage),
/* harmony export */   b: () => (/* binding */ getCanonicalLocale),
/* harmony export */   g: () => (/* binding */ getLocale),
/* harmony export */   i: () => (/* binding */ isRTL)
/* harmony export */ });
function getLocale() {
  return document.documentElement.dataset.locale || "en";
}
function getCanonicalLocale() {
  return getLocale().replace(/_/g, "-");
}
function getLanguage() {
  return document.documentElement.lang || "en";
}
function isRTL(language) {
  const languageCode = language || getLanguage();
  const rtlLanguages = [
    /* eslint-disable no-multi-spaces */
    "ae",
    // Avestan
    "ar",
    // 'العربية', Arabic
    "arc",
    // Aramaic
    "arz",
    // 'مصرى', Egyptian
    "bcc",
    // 'بلوچی مکرانی', Southern Balochi
    "bqi",
    // 'بختياري', Bakthiari
    "ckb",
    // 'Soranî / کوردی', Sorani
    "dv",
    // Dhivehi
    "fa",
    // 'فارسی', Persian
    "glk",
    // 'گیلکی', Gilaki
    "ha",
    // 'هَوُسَ', Hausa
    "he",
    // 'עברית', Hebrew
    "khw",
    // 'کھوار', Khowar
    "ks",
    // 'कॉशुर / کٲشُر', Kashmiri
    "ku",
    // 'Kurdî / كوردی', Kurdish
    "mzn",
    // 'مازِرونی', Mazanderani
    "nqo",
    // 'ߒߞߏ', N’Ko
    "pnb",
    // 'پنجابی', Western Punjabi
    "ps",
    // 'پښتو', Pashto,
    "sd",
    // 'سنڌي', Sindhi
    "ug",
    // 'Uyghurche / ئۇيغۇرچە', Uyghur
    "ur",
    // 'اردو', Urdu
    "uzs",
    // 'اوزبیکی', Uzbek Afghan
    "yi"
    // 'ייִדיש', Yiddish
    /* eslint-enable no-multi-spaces */
  ];
  if ((language || getCanonicalLocale()).startsWith("uz-AF")) {
    return true;
  }
  return rtlLanguages.includes(languageCode);
}



/***/ }),

/***/ "./node_modules/@nextcloud/l10n/dist/index.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/@nextcloud/l10n/dist/index.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalLocale: () => (/* reexport safe */ _chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.b),
/* harmony export */   getDayNames: () => (/* binding */ getDayNames),
/* harmony export */   getDayNamesMin: () => (/* binding */ getDayNamesMin),
/* harmony export */   getDayNamesShort: () => (/* binding */ getDayNamesShort),
/* harmony export */   getFirstDay: () => (/* binding */ getFirstDay),
/* harmony export */   getLanguage: () => (/* reexport safe */ _chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.a),
/* harmony export */   getLocale: () => (/* reexport safe */ _chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.g),
/* harmony export */   getMonthNames: () => (/* binding */ getMonthNames),
/* harmony export */   getMonthNamesShort: () => (/* binding */ getMonthNamesShort),
/* harmony export */   getPlural: () => (/* binding */ getPlural),
/* harmony export */   isRTL: () => (/* reexport safe */ _chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.i),
/* harmony export */   loadTranslations: () => (/* binding */ loadTranslations),
/* harmony export */   n: () => (/* binding */ translatePlural),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   t: () => (/* binding */ translate),
/* harmony export */   translate: () => (/* binding */ translate),
/* harmony export */   translatePlural: () => (/* binding */ translatePlural),
/* harmony export */   unregister: () => (/* binding */ unregister)
/* harmony export */ });
/* harmony import */ var _chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunks/locale-BQFSYg2g.mjs */ "./node_modules/@nextcloud/l10n/dist/chunks/locale-BQFSYg2g.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js");





function getFirstDay() {
  if (typeof window.firstDay === "undefined") {
    console.warn("No firstDay found");
    return 1;
  }
  return window.firstDay;
}
function getDayNames() {
  if (typeof window.dayNames === "undefined") {
    console.warn("No dayNames found");
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }
  return window.dayNames;
}
function getDayNamesShort() {
  if (typeof window.dayNamesShort === "undefined") {
    console.warn("No dayNamesShort found");
    return ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  }
  return window.dayNamesShort;
}
function getDayNamesMin() {
  if (typeof window.dayNamesMin === "undefined") {
    console.warn("No dayNamesMin found");
    return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  }
  return window.dayNamesMin;
}
function getMonthNames() {
  if (typeof window.monthNames === "undefined") {
    console.warn("No monthNames found");
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }
  return window.monthNames;
}
function getMonthNamesShort() {
  if (typeof window.monthNamesShort === "undefined") {
    console.warn("No monthNamesShort found");
    return [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec."
    ];
  }
  return window.monthNamesShort;
}
function hasAppTranslations(appId) {
  var _a, _b;
  return ((_a = window._oc_l10n_registry_translations) == null ? void 0 : _a[appId]) !== void 0 && ((_b = window._oc_l10n_registry_plural_functions) == null ? void 0 : _b[appId]) !== void 0;
}
function registerAppTranslations(appId, translations, pluralFunction) {
  var _a;
  window._oc_l10n_registry_translations = Object.assign(
    window._oc_l10n_registry_translations || {},
    {
      [appId]: Object.assign(((_a = window._oc_l10n_registry_translations) == null ? void 0 : _a[appId]) || {}, translations)
    }
  );
  window._oc_l10n_registry_plural_functions = Object.assign(
    window._oc_l10n_registry_plural_functions || {},
    {
      [appId]: pluralFunction
    }
  );
}
function unregisterAppTranslations(appId) {
  var _a, _b;
  (_a = window._oc_l10n_registry_translations) == null ? true : delete _a[appId];
  (_b = window._oc_l10n_registry_plural_functions) == null ? true : delete _b[appId];
}
function getAppTranslations(appId) {
  var _a, _b, _c, _d;
  return {
    translations: (_b = (_a = window._oc_l10n_registry_translations) == null ? void 0 : _a[appId]) != null ? _b : {},
    pluralFunction: (_d = (_c = window._oc_l10n_registry_plural_functions) == null ? void 0 : _c[appId]) != null ? _d : (number) => number
  };
}
function translate(app, text, vars, number, options) {
  const allOptions = {
    // defaults
    escape: true,
    sanitize: true,
    // overwrite with user config
    ...options || {}
  };
  const identity = (value) => value;
  const optSanitize = allOptions.sanitize ? dompurify__WEBPACK_IMPORTED_MODULE_2__.sanitize : identity;
  const optEscape = allOptions.escape ? escape_html__WEBPACK_IMPORTED_MODULE_3__ : identity;
  const isValidReplacement = (value) => typeof value === "string" || typeof value === "number";
  const _build = (text2, vars2, number2) => {
    return text2.replace(/%n/g, "" + number2).replace(/{([^{}]*)}/g, (match, key) => {
      if (vars2 === void 0 || !(key in vars2)) {
        return optEscape(match);
      }
      const replacement = vars2[key];
      if (isValidReplacement(replacement)) {
        return optEscape("".concat(replacement));
      } else if (typeof replacement === "object" && isValidReplacement(replacement.value)) {
        const escape = replacement.escape !== false ? escape_html__WEBPACK_IMPORTED_MODULE_3__ : identity;
        return escape("".concat(replacement.value));
      } else {
        return optEscape(match);
      }
    });
  };
  const bundle = getAppTranslations(app);
  let translation = bundle.translations[text] || text;
  translation = Array.isArray(translation) ? translation[0] : translation;
  if (typeof vars === "object" || number !== void 0) {
    return optSanitize(_build(
      translation,
      vars,
      number
    ));
  } else {
    return optSanitize(translation);
  }
}
function translatePlural(app, textSingular, textPlural, number, vars, options) {
  const identifier = "_" + textSingular + "_::_" + textPlural + "_";
  const bundle = getAppTranslations(app);
  const value = bundle.translations[identifier];
  if (typeof value !== "undefined") {
    const translation = value;
    if (Array.isArray(translation)) {
      const plural = bundle.pluralFunction(number);
      return translate(app, translation[plural], vars, number, options);
    }
  }
  if (number === 1) {
    return translate(app, textSingular, vars, number, options);
  } else {
    return translate(app, textPlural, vars, number, options);
  }
}
function loadTranslations(appName, callback) {
  if (hasAppTranslations(appName) || (0,_chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.g)() === "en") {
    return Promise.resolve().then(callback);
  }
  const url = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateFilePath)(appName, "l10n", (0,_chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.g)() + ".json");
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onerror = () => {
      reject(new Error(request.statusText || "Network error"));
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        try {
          const bundle = JSON.parse(request.responseText);
          if (typeof bundle.translations === "object")
            resolve(bundle);
        } catch (error) {
        }
        reject(new Error("Invalid content of translation bundle"));
      } else {
        reject(new Error(request.statusText));
      }
    };
    request.send();
  });
  return promise.then((result) => {
    register(appName, result.translations);
    return result;
  }).then(callback);
}
function register(appName, bundle) {
  registerAppTranslations(appName, bundle, getPlural);
}
function unregister(appName) {
  return unregisterAppTranslations(appName);
}
function getPlural(number) {
  let language = (0,_chunks_locale_BQFSYg2g_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  if (language === "pt-BR") {
    language = "xbr";
  }
  if (language.length > 3) {
    language = language.substring(0, language.lastIndexOf("-"));
  }
  switch (language) {
    case "az":
    case "bo":
    case "dz":
    case "id":
    case "ja":
    case "jv":
    case "ka":
    case "km":
    case "kn":
    case "ko":
    case "ms":
    case "th":
    case "tr":
    case "vi":
    case "zh":
      return 0;
    case "af":
    case "bn":
    case "bg":
    case "ca":
    case "da":
    case "de":
    case "el":
    case "en":
    case "eo":
    case "es":
    case "et":
    case "eu":
    case "fa":
    case "fi":
    case "fo":
    case "fur":
    case "fy":
    case "gl":
    case "gu":
    case "ha":
    case "he":
    case "hu":
    case "is":
    case "it":
    case "ku":
    case "lb":
    case "ml":
    case "mn":
    case "mr":
    case "nah":
    case "nb":
    case "ne":
    case "nl":
    case "nn":
    case "no":
    case "oc":
    case "om":
    case "or":
    case "pa":
    case "pap":
    case "ps":
    case "pt":
    case "so":
    case "sq":
    case "sv":
    case "sw":
    case "ta":
    case "te":
    case "tk":
    case "ur":
    case "zu":
      return number === 1 ? 0 : 1;
    case "am":
    case "bh":
    case "fil":
    case "fr":
    case "gun":
    case "hi":
    case "hy":
    case "ln":
    case "mg":
    case "nso":
    case "xbr":
    case "ti":
    case "wa":
      return number === 0 || number === 1 ? 0 : 1;
    case "be":
    case "bs":
    case "hr":
    case "ru":
    case "sh":
    case "sr":
    case "uk":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "cs":
    case "sk":
      return number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
    case "ga":
      return number === 1 ? 0 : number === 2 ? 1 : 2;
    case "lt":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "sl":
      return number % 100 === 1 ? 0 : number % 100 === 2 ? 1 : number % 100 === 3 || number % 100 === 4 ? 2 : 3;
    case "mk":
      return number % 10 === 1 ? 0 : 1;
    case "mt":
      return number === 1 ? 0 : number === 0 || number % 100 > 1 && number % 100 < 11 ? 1 : number % 100 > 10 && number % 100 < 20 ? 2 : 3;
    case "lv":
      return number === 0 ? 0 : number % 10 === 1 && number % 100 !== 11 ? 1 : 2;
    case "pl":
      return number === 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 1 : 2;
    case "cy":
      return number === 1 ? 0 : number === 2 ? 1 : number === 8 || number === 11 ? 2 : 3;
    case "ro":
      return number === 1 ? 0 : number === 0 || number % 100 > 0 && number % 100 < 20 ? 1 : 2;
    case "ar":
      return number === 0 ? 0 : number === 1 ? 1 : number === 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 && number % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}



/***/ }),

/***/ "./node_modules/@nextcloud/logger/dist/index.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@nextcloud/logger/dist/index.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevel: () => (/* binding */ LogLevel),
/* harmony export */   getLogger: () => (/* binding */ getLogger),
/* harmony export */   getLoggerBuilder: () => (/* binding */ getLoggerBuilder)
/* harmony export */ });
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");

var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["Fatal"] = 4] = "Fatal";
  return LogLevel2;
})(LogLevel || {});
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ConsoleLogger {
  constructor(context) {
    __publicField$1(this, "context");
    this.context = context || {};
  }
  formatMessage(message, level, context) {
    let msg = "[" + LogLevel[level].toUpperCase() + "] ";
    if (context && context.app) {
      msg += context.app + ": ";
    }
    if (typeof message === "string")
      return msg + message;
    msg += "Unexpected ".concat(message.name);
    if (message.message)
      msg += ' "'.concat(message.message, '"');
    if (level === LogLevel.Debug && message.stack)
      msg += "\n\nStack trace:\n".concat(message.stack);
    return msg;
  }
  log(level, message, context) {
    var _a, _b;
    if (typeof ((_a = this.context) == null ? void 0 : _a.level) === "number" && level < ((_b = this.context) == null ? void 0 : _b.level)) {
      return;
    }
    if (typeof message === "object" && (context == null ? void 0 : context.error) === void 0) {
      context.error = message;
    }
    switch (level) {
      case LogLevel.Debug:
        console.debug(this.formatMessage(message, LogLevel.Debug, context), context);
        break;
      case LogLevel.Info:
        console.info(this.formatMessage(message, LogLevel.Info, context), context);
        break;
      case LogLevel.Warn:
        console.warn(this.formatMessage(message, LogLevel.Warn, context), context);
        break;
      case LogLevel.Error:
        console.error(this.formatMessage(message, LogLevel.Error, context), context);
        break;
      case LogLevel.Fatal:
      default:
        console.error(this.formatMessage(message, LogLevel.Fatal, context), context);
        break;
    }
  }
  debug(message, context) {
    this.log(LogLevel.Debug, message, Object.assign({}, this.context, context));
  }
  info(message, context) {
    this.log(LogLevel.Info, message, Object.assign({}, this.context, context));
  }
  warn(message, context) {
    this.log(LogLevel.Warn, message, Object.assign({}, this.context, context));
  }
  error(message, context) {
    this.log(LogLevel.Error, message, Object.assign({}, this.context, context));
  }
  fatal(message, context) {
    this.log(LogLevel.Fatal, message, Object.assign({}, this.context, context));
  }
}
function buildConsoleLogger(context) {
  return new ConsoleLogger(context);
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoggerBuilder {
  constructor(factory) {
    __publicField(this, "context");
    __publicField(this, "factory");
    this.context = {};
    this.factory = factory;
  }
  /**
   * Set the app name within the logging context
   *
   * @param appId App name
   */
  setApp(appId) {
    this.context.app = appId;
    return this;
  }
  /**
   * Set the logging level within the logging context
   *
   * @param level Logging level
   */
  setLogLevel(level) {
    this.context.level = level;
    return this;
  }
  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * Set the user id within the logging context
   * @param uid User ID
   * @see {@link detectUser}
   */
  /* eslint-enable jsdoc/no-undefined-types */
  setUid(uid) {
    this.context.uid = uid;
    return this;
  }
  /**
   * Detect the currently logged in user and set the user id within the logging context
   */
  detectUser() {
    const user = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
    if (user !== null) {
      this.context.uid = user.uid;
    }
    return this;
  }
  /**
   * Detect and use logging level configured in nextcloud config
   */
  detectLogLevel() {
    const self = this;
    const onLoaded = () => {
      var _a, _b;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        self.context.level = (_b = (_a = window._oc_config) == null ? void 0 : _a.loglevel) != null ? _b : LogLevel.Warn;
        if (window._oc_debug) {
          self.context.level = LogLevel.Debug;
        }
        document.removeEventListener("readystatechange", onLoaded);
      } else {
        document.addEventListener("readystatechange", onLoaded);
      }
    };
    onLoaded();
    return this;
  }
  /** Build a logger using the logging context and factory */
  build() {
    if (this.context.level === void 0) {
      this.detectLogLevel();
    }
    return this.factory(this.context);
  }
}
function getLoggerBuilder() {
  return new LoggerBuilder(buildConsoleLogger);
}
function getLogger() {
  return getLoggerBuilder().build();
}



/***/ }),

/***/ "./node_modules/@nextcloud/paths/dist/index.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@nextcloud/paths/dist/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   basename: () => (/* binding */ basename),
/* harmony export */   dirname: () => (/* binding */ dirname),
/* harmony export */   encodePath: () => (/* binding */ encodePath),
/* harmony export */   isSamePath: () => (/* binding */ isSamePath),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths)
/* harmony export */ });
function encodePath(path) {
  if (!path) {
    return path;
  }
  return path.split("/").map(encodeURIComponent).join("/");
}
function basename(path) {
  return path.replace(/\\/g, "/").replace(/.*\//, "");
}
function dirname(path) {
  return path.replace(/\\/g, "/").replace(/\/[^\/]*$/, "");
}
function joinPaths(...args) {
  if (arguments.length < 1) {
    return "";
  }
  const nonEmptyArgs = args.filter((arg) => arg.length > 0);
  if (nonEmptyArgs.length < 1) {
    return "";
  }
  const lastArg = nonEmptyArgs[nonEmptyArgs.length - 1];
  const leadingSlash = nonEmptyArgs[0].charAt(0) === "/";
  const trailingSlash = lastArg.charAt(lastArg.length - 1) === "/";
  const sections = nonEmptyArgs.reduce((acc, section) => acc.concat(section.split("/")), []);
  let first = !leadingSlash;
  const path = sections.reduce((acc, section) => {
    if (section === "") {
      return acc;
    }
    if (first) {
      first = false;
      return acc + section;
    }
    return acc + "/" + section;
  }, "");
  if (trailingSlash) {
    return path + "/";
  }
  return path;
}
function isSamePath(path1, path2) {
  const pathSections1 = (path1 || "").split("/").filter((p) => p !== ".");
  const pathSections2 = (path2 || "").split("/").filter((p) => p !== ".");
  path1 = joinPaths.apply(void 0, pathSections1);
  path2 = joinPaths.apply(void 0, pathSections2);
  return path1 === path2;
}



/***/ }),

/***/ "./node_modules/@nextcloud/router/dist/index.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@nextcloud/router/dist/index.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateFilePath: () => (/* binding */ d),
/* harmony export */   generateOcsUrl: () => (/* binding */ v),
/* harmony export */   generateRemoteUrl: () => (/* binding */ U),
/* harmony export */   generateUrl: () => (/* binding */ _),
/* harmony export */   getAppRootUrl: () => (/* binding */ b),
/* harmony export */   getBaseUrl: () => (/* binding */ w),
/* harmony export */   getRootUrl: () => (/* binding */ f),
/* harmony export */   imagePath: () => (/* binding */ h),
/* harmony export */   linkTo: () => (/* binding */ R)
/* harmony export */ });
const R = (n, e) => d(n, "", e), g = (n) => "/remote.php/" + n, U = (n, e) => {
  var o;
  return ((o = e == null ? void 0 : e.baseURL) != null ? o : w()) + g(n);
}, v = (n, e, o) => {
  var c;
  const i = Object.assign({
    ocsVersion: 2
  }, o || {}).ocsVersion === 1 ? 1 : 2;
  return ((c = o == null ? void 0 : o.baseURL) != null ? c : w()) + "/ocs/v" + i + ".php" + u(n, e, o);
}, u = (n, e, o) => {
  const c = Object.assign({
    escape: !0
  }, o || {}), r = function(i, s) {
    return s = s || {}, i.replace(
      /{([^{}]*)}/g,
      function(l, t) {
        const a = s[t];
        return c.escape ? encodeURIComponent(typeof a == "string" || typeof a == "number" ? a.toString() : l) : typeof a == "string" || typeof a == "number" ? a.toString() : l;
      }
    );
  };
  return n.charAt(0) !== "/" && (n = "/" + n), r(n, e || {});
}, _ = (n, e, o) => {
  var c, r, i;
  const s = Object.assign({
    noRewrite: !1
  }, o || {}), l = (c = o == null ? void 0 : o.baseURL) != null ? c : f();
  return ((i = (r = window == null ? void 0 : window.OC) == null ? void 0 : r.config) == null ? void 0 : i.modRewriteWorking) === !0 && !s.noRewrite ? l + u(n, e, o) : l + "/index.php" + u(n, e, o);
}, h = (n, e) => e.includes(".") ? d(n, "img", e) : d(n, "img", "".concat(e, ".svg")), d = (n, e, o) => {
  var c, r, i;
  const s = (i = (r = (c = window == null ? void 0 : window.OC) == null ? void 0 : c.coreApps) == null ? void 0 : r.includes(n)) != null ? i : !1, l = o.slice(-3) === "php";
  let t = f();
  return l && !s ? (t += "/index.php/apps/".concat(n), e && (t += "/".concat(encodeURI(e))), o !== "index.php" && (t += "/".concat(o))) : !l && !s ? (t = b(n), e && (t += "/".concat(e, "/")), t.at(-1) !== "/" && (t += "/"), t += o) : ((n === "settings" || n === "core" || n === "search") && e === "ajax" && (t += "/index.php"), n && (t += "/".concat(n)), e && (t += "/".concat(e)), t += "/".concat(o)), t;
}, w = () => window.location.protocol + "//" + window.location.host + f();
function f() {
  let n = window._oc_webroot;
  if (typeof n > "u") {
    n = location.pathname;
    const e = n.indexOf("/index.php/");
    if (e !== -1)
      n = n.slice(0, e);
    else {
      const o = n.indexOf("/", 1);
      n = n.slice(0, o > 0 ? o : void 0);
    }
  }
  return n;
}
function b(n) {
  var e, o;
  return (o = ((e = window._oc_appswebroots) != null ? e : {})[n]) != null ? o : "";
}



/***/ }),

/***/ "./node_modules/@nextcloud/sharing/dist/public.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/@nextcloud/sharing/dist/public.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSharingToken: () => (/* binding */ getSharingToken),
/* harmony export */   isPublicShare: () => (/* binding */ isPublicShare)
/* harmony export */ });
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");

function isPublicShare() {
  return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__.loadState)("files_sharing", "isPublic", null) ?? document.querySelector(
    'input#isPublic[type="hidden"][name="isPublic"][value="1"]'
  ) !== null;
}
function getSharingToken() {
  return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__.loadState)("files_sharing", "sharingToken", null) ?? document.querySelector('input#sharingToken[type="hidden"]')?.value ?? null;
}



/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Axios: () => (/* binding */ Axios),
/* harmony export */   AxiosError: () => (/* binding */ AxiosError),
/* harmony export */   AxiosHeaders: () => (/* binding */ AxiosHeaders),
/* harmony export */   Cancel: () => (/* binding */ Cancel),
/* harmony export */   CancelToken: () => (/* binding */ CancelToken),
/* harmony export */   CanceledError: () => (/* binding */ CanceledError),
/* harmony export */   HttpStatusCode: () => (/* binding */ HttpStatusCode),
/* harmony export */   VERSION: () => (/* binding */ VERSION),
/* harmony export */   all: () => (/* binding */ all),
/* harmony export */   "default": () => (/* reexport safe */ _lib_axios_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   formToJSON: () => (/* binding */ formToJSON),
/* harmony export */   getAdapter: () => (/* binding */ getAdapter),
/* harmony export */   isAxiosError: () => (/* binding */ isAxiosError),
/* harmony export */   isCancel: () => (/* binding */ isCancel),
/* harmony export */   mergeConfig: () => (/* binding */ mergeConfig),
/* harmony export */   spread: () => (/* binding */ spread),
/* harmony export */   toFormData: () => (/* binding */ toFormData)
/* harmony export */ });
/* harmony import */ var _lib_axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/axios.js */ "./node_modules/axios/lib/axios.js");


// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = _lib_axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];




/***/ }),

/***/ "./node_modules/axios/lib/adapters/adapters.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetch.js */ "./node_modules/axios/lib/adapters/fetch.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");






const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  fetch: _fetch_js__WEBPACK_IMPORTED_MODULE_2__["default"]
}

_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction(adapter) || adapter === null || adapter === false;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAdapter: (adapters) => {
    adapters = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
});


/***/ }),

/***/ "./node_modules/axios/lib/adapters/fetch.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/adapters/fetch.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/composeSignals.js */ "./node_modules/axios/lib/helpers/composeSignals.js");
/* harmony import */ var _helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/trackStream.js */ "./node_modules/axios/lib/helpers/trackStream.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/settle.js */ "./node_modules/axios/lib/core/settle.js");










const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

// used only inside the fetch adapter
const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
);

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
}

const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;

  const hasContentType = new Request(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin, {
    body: new ReadableStream(),
    method: 'POST',
    get duplex() {
      duplexAccessed = true;
      return 'half';
    },
  }).headers.has('Content-Type');

  return duplexAccessed && !hasContentType;
});

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const supportsResponseStream = isReadableStreamSupported &&
  test(() => _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isReadableStream(new Response('').body));


const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};

isFetchSupported && (((res) => {
  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
    !resolvers[type] && (resolvers[type] = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(res[type]) ? (res) => res[type]() :
      (_, config) => {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](`Response type '${type}' is not supported`, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NOT_SUPPORT, config);
      })
  });
})(new Response));

const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }

  if(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isBlob(body)) {
    return body.size;
  }

  if(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isSpecCompliantForm(body)) {
    return (await new Request(body).arrayBuffer()).byteLength;
  }

  if(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBufferView(body) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBuffer(body)) {
    return body.byteLength;
  }

  if(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isURLSearchParams(body)) {
    body = body + '';
  }

  if(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(body)) {
    return (await encodeText(body)).byteLength;
  }
}

const resolveBodyLength = async (headers, body) => {
  const length = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(headers.getContentLength());

  return length == null ? getBodyLength(body) : length;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = 'same-origin',
    fetchOptions
  } = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(config);

  responseType = responseType ? (responseType + '').toLowerCase() : 'text';

  let [composedSignal, stopTimeout] = (signal || cancelToken || timeout) ?
    (0,_helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_4__["default"])([signal, cancelToken], timeout) : [];

  let finished, request;

  const onFinish = () => {
    !finished && setTimeout(() => {
      composedSignal && composedSignal.unsubscribe();
    });

    finished = true;
  }

  let requestContentLength;

  try {
    if (
      onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
      (requestContentLength = await resolveBodyLength(headers, data)) !== 0
    ) {
      let _request = new Request(url, {
        method: 'POST',
        body: data,
        duplex: "half"
      });

      let contentTypeHeader;

      if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
        headers.setContentType(contentTypeHeader)
      }

      if (_request.body) {
        const [onProgress, flush] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.progressEventDecorator)(
          requestContentLength,
          (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.asyncDecorator)(onUploadProgress))
        );

        data = (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_6__.trackStream)(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush, encodeText);
      }
    }

    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(withCredentials)) {
      withCredentials = withCredentials ? 'include' : 'omit';
    }

    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: withCredentials
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
      const options = {};

      ['status', 'statusText', 'headers'].forEach(prop => {
        options[prop] = response[prop];
      });

      const responseContentLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(response.headers.get('content-length'));

      const [onProgress, flush] = onDownloadProgress && (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.progressEventDecorator)(
        responseContentLength,
        (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_5__.asyncDecorator)(onDownloadProgress), true)
      ) || [];

      response = new Response(
        (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_6__.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          isStreamResponse && onFinish();
        }, encodeText),
        options
      );
    }

    responseType = responseType || 'text';

    let responseData = await resolvers[_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].findKey(resolvers, responseType) || 'text'](response, config);

    !isStreamResponse && onFinish();

    stopTimeout && stopTimeout();

    return await new Promise((resolve, reject) => {
      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_7__["default"])(resolve, reject, {
        data: responseData,
        headers: _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__["default"].from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      })
    })
  } catch (err) {
    onFinish();

    if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
      throw Object.assign(
        new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      )
    }

    throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(err, err && err.code, config, request);
  }
}));




/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");











const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_0__["default"])(config);
    let requestData = _config.data;
    const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(_config.headers).normalize();
    let {responseType, onUploadProgress, onDownloadProgress} = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;

    function done() {
      flushUpload && flushUpload(); // flush events
      flushDownload && flushDownload(); // flush events

      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
    }

    let request = new XMLHttpRequest();

    request.open(_config.method.toUpperCase(), _config.url, true);

    // Set the request timeout in MS
    request.timeout = _config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = _config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_4__["default"];
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = _config.responseType;
    }

    // Handle progress if needed
    if (onDownloadProgress) {
      ([downloadThrottled, flushDownload] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)(onDownloadProgress, true));
      request.addEventListener('progress', downloadThrottled);
    }

    // Not all browsers support upload events
    if (onUploadProgress && request.upload) {
      ([uploadThrottled, flushUpload] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)(onUploadProgress));

      request.upload.addEventListener('progress', uploadThrottled);

      request.upload.addEventListener('loadend', flushUpload);
    }

    if (_config.cancelToken || _config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_7__["default"](null, config, request) : cancel);
        request.abort();
        request = null;
      };

      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_config.url);

    if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_9__["default"].protocols.indexOf(protocol) === -1) {
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, context, {allOwnKeys: true});

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_8__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__["default"];

axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__["default"];

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CancelToken);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  __CANCEL__: true
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanceledError);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isCancel)
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");











const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;

        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].merge(
      headers.common,
      headers[config.method]
    );

    headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__["default"])(config.baseURL, config.url);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axios);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosError);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosHeaders);


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterceptorManager);


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFullPath)
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL)) {
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dispatchRequest)
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"].adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
      config,
      config.transformResponse,
      response
    );

    response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__["default"])(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeConfig)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({caseless}, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settle)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transformData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

    if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__["default"])(data)) : data;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)
    ) {
      return data;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data, this.formSerializer).toString();
      }

      if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isResponse(data) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)) {
      return data;
    }

    if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
const VERSION = "1.7.4";

/***/ }),

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosURLSearchParams);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpStatusCode);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildURL)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
      params.toString() :
      new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ combineURLs)
/* harmony export */ });


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/composeSignals.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/composeSignals.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");



const composeSignals = (signals, timeout) => {
  let controller = new AbortController();

  let aborted;

  const onabort = function (cancel) {
    if (!aborted) {
      aborted = true;
      unsubscribe();
      const err = cancel instanceof Error ? cancel : this.reason;
      controller.abort(err instanceof _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? err : new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_1__["default"](err instanceof Error ? err.message : err));
    }
  }

  let timer = timeout && setTimeout(() => {
    onabort(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](`timeout ${timeout} of ms exceeded`, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ETIMEDOUT))
  }, timeout)

  const unsubscribe = () => {
    if (signals) {
      timer && clearTimeout(timer);
      timer = null;
      signals.forEach(signal => {
        signal &&
        (signal.removeEventListener ? signal.removeEventListener('abort', onabort) : signal.unsubscribe(onabort));
      });
      signals = null;
    }
  }

  signals.forEach((signal) => signal && signal.addEventListener && signal.addEventListener('abort', onabort));

  const {signal} = controller;

  signal.unsubscribe = unsubscribe;

  return [signal, () => {
    timer && clearTimeout(timer);
    timer = null;
  }];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (composeSignals);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(path) && cookie.push('path=' + path);

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  });



/***/ }),

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formDataToJSON);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAbsoluteURL)
/* harmony export */ });


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAxiosError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// eslint-disable-next-line strict
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProtocol)
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/progressEventReducer.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/progressEventReducer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncDecorator: () => (/* binding */ asyncDecorator),
/* harmony export */   progressEventDecorator: () => (/* binding */ progressEventDecorator),
/* harmony export */   progressEventReducer: () => (/* binding */ progressEventReducer)
/* harmony export */ });
/* harmony import */ var _speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/axios/lib/helpers/throttle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = (0,_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

  return (0,_throttle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true
    };

    listener(data);
  }, freq);
}

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
}

const asyncDecorator = (fn) => (...args) => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].asap(() => fn(...args));


/***/ }),

/***/ "./node_modules/axios/lib/helpers/resolveConfig.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/resolveConfig.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _cookies_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _buildURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((config) => {
  const newConfig = (0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, config);

  let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

  newConfig.headers = headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(headers);

  newConfig.url = (0,_buildURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_3__["default"])(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  let contentType;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isFormData(data)) {
    if (_platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].hasStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // Let the browser set it
    } else if ((contentType = headers.getContentType()) !== false) {
      // fix semicolon duplication issue for ReactNative FormData implementation
      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (_platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].hasStandardBrowserEnv) {
    withXSRFToken && _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && (0,_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_6__["default"])(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && _cookies_js__WEBPACK_IMPORTED_MODULE_7__["default"].read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
});



/***/ }),

/***/ "./node_modules/axios/lib/helpers/speedometer.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (speedometer);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ spread)
/* harmony export */ });


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/throttle.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/throttle.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  }

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if ( passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs)
        }, threshold - passed);
      }
    }
  }

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/node/classes/FormData.js */ "./node_modules/axios/lib/helpers/null.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! ./node_modules/buffer/index.js */ "./node_modules/buffer/index.js")["Buffer"];




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSpecCompliantForm(formData);

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]')) && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(
        formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toFormData);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toURLEncodedForm)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/trackStream.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/trackStream.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readBytes: () => (/* binding */ readBytes),
/* harmony export */   streamChunk: () => (/* binding */ streamChunk),
/* harmony export */   trackStream: () => (/* binding */ trackStream)
/* harmony export */ });

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
}

const readBytes = async function* (iterable, chunkSize, encode) {
  for await (const chunk of iterable) {
    yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : (await encode(String(chunk))), chunkSize);
  }
}

const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
  const iterator = readBytes(stream, chunkSize, encode);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  }

  return new ReadableStream({
    async pull(controller) {
      try {
        const {done, value} = await iterator.next();

        if (done) {
         _onFinish();
          controller.close();
          return;
        }

        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  assertOptions,
  validators
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/Blob.js":
/*!*****************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/Blob.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Blob !== 'undefined' ? Blob : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js":
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof FormData !== 'undefined' ? FormData : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");
/* harmony import */ var _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Blob.js */ "./node_modules/axios/lib/platform/browser/classes/Blob.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob: _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/common/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/platform/common/utils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBrowserEnv: () => (/* binding */ hasBrowserEnv),
/* harmony export */   hasStandardBrowserEnv: () => (/* binding */ hasStandardBrowserEnv),
/* harmony export */   hasStandardBrowserWebWorkerEnv: () => (/* binding */ hasStandardBrowserWebWorkerEnv),
/* harmony export */   origin: () => (/* binding */ origin)
/* harmony export */ });
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = hasBrowserEnv && window.location.href || 'http://localhost';




/***/ }),

/***/ "./node_modules/axios/lib/platform/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/platform/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils.js */ "./node_modules/axios/lib/platform/common/utils.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ..._common_utils_js__WEBPACK_IMPORTED_MODULE_0__,
  ..._node_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");




// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({source, data}) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);

    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    }
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === 'function',
  isFunction(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
});


/***/ }),

/***/ "./node_modules/typescript-event-target/dist/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/typescript-event-target/dist/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypedEventTarget: () => (/* binding */ e)
/* harmony export */ });
var e=class extends EventTarget{dispatchTypedEvent(s,t){return super.dispatchEvent(t)}};


/***/ }),

/***/ "./node_modules/webdav/dist/web/index.js":
/*!***********************************************!*\
  !*** ./node_modules/webdav/dist/web/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthType: () => (/* binding */ nn),
/* harmony export */   ErrorCode: () => (/* binding */ rn),
/* harmony export */   Request: () => (/* binding */ on),
/* harmony export */   Response: () => (/* binding */ sn),
/* harmony export */   createClient: () => (/* binding */ an),
/* harmony export */   getPatcher: () => (/* binding */ un),
/* harmony export */   parseStat: () => (/* binding */ cn),
/* harmony export */   parseXML: () => (/* binding */ ln),
/* harmony export */   prepareFileFromProps: () => (/* binding */ hn),
/* harmony export */   processResponsePayload: () => (/* binding */ pn),
/* harmony export */   translateDiskSpace: () => (/* binding */ fn)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/*! For license information please see index.js.LICENSE.txt */
var t={2:t=>{function e(t,e,o){t instanceof RegExp&&(t=n(t,o)),e instanceof RegExp&&(e=n(e,o));var i=r(t,e,o);return i&&{start:i[0],end:i[1],pre:o.slice(0,i[0]),body:o.slice(i[0]+t.length,i[1]),post:o.slice(i[1]+e.length)}}function n(t,e){var n=e.match(t);return n?n[0]:null}function r(t,e,n){var r,o,i,s,a,u=n.indexOf(t),c=n.indexOf(e,u+1),l=u;if(u>=0&&c>0){for(r=[],i=n.length;l>=0&&!a;)l==u?(r.push(l),u=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),c]:((o=r.pop())<i&&(i=o,s=c),c=n.indexOf(e,l+1)),l=u<c&&u>=0?u:c;r.length&&(a=[i,s])}return a}t.exports=e,e.range=r},101:function(t,e,n){var r;t=n.nmd(t),function(o){var i=(t&&t.exports,"object"==typeof global&&global);i.global!==i&&i.window;var s=function(t){this.message=t};(s.prototype=new Error).name="InvalidCharacterError";var a=function(t){throw new s(t)},u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=/[\t\n\f\r ]/g,l={encode:function(t){t=String(t),/[^\0-\xFF]/.test(t)&&a("The string to be encoded contains characters outside of the Latin1 range.");for(var e,n,r,o,i=t.length%3,s="",c=-1,l=t.length-i;++c<l;)e=t.charCodeAt(c)<<16,n=t.charCodeAt(++c)<<8,r=t.charCodeAt(++c),s+=u.charAt((o=e+n+r)>>18&63)+u.charAt(o>>12&63)+u.charAt(o>>6&63)+u.charAt(63&o);return 2==i?(e=t.charCodeAt(c)<<8,n=t.charCodeAt(++c),s+=u.charAt((o=e+n)>>10)+u.charAt(o>>4&63)+u.charAt(o<<2&63)+"="):1==i&&(o=t.charCodeAt(c),s+=u.charAt(o>>2)+u.charAt(o<<4&63)+"=="),s},decode:function(t){var e=(t=String(t).replace(c,"")).length;e%4==0&&(e=(t=t.replace(/==?$/,"")).length),(e%4==1||/[^+a-zA-Z0-9/]/.test(t))&&a("Invalid character: the string to be decoded is not correctly encoded.");for(var n,r,o=0,i="",s=-1;++s<e;)r=u.indexOf(t.charAt(s)),n=o%4?64*n+r:r,o++%4&&(i+=String.fromCharCode(255&n>>(-2*o&6)));return i},version:"1.0.0"};void 0===(r=function(){return l}.call(e,n,e,t))||(t.exports=r)}()},172:(t,e)=>{e.d=function(t){if(!t)return 0;for(var e=(t=t.toString()).length,n=t.length;n--;){var r=t.charCodeAt(n);56320<=r&&r<=57343&&n--,127<r&&r<=2047?e++:2047<r&&r<=65535&&(e+=2)}return e}},526:t=>{var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=e},298:t=>{var e,n;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,r=0;n<t.length;n++,r+=8)e[r>>>5]|=t[n]<<24-r%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var n=[],r=0;r<t.length;r+=3)for(var o=t[r]<<16|t[r+1]<<8|t[r+2],i=0;i<4;i++)8*r+6*i<=8*t.length?n.push(e.charAt(o>>>6*(3-i)&63)):n.push("=");return n.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,o=0;r<t.length;o=++r%4)0!=o&&n.push((e.indexOf(t.charAt(r-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(r))>>>6-2*o);return n}},t.exports=n},635:(t,e,n)=>{const r=n(31),o=n(338),i=n(221);t.exports={XMLParser:o,XMLValidator:r,XMLBuilder:i}},705:(t,e)=>{const n=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",r="["+n+"]["+n+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",o=new RegExp("^"+r+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,n){if(e){const r=Object.keys(e),o=r.length;for(let i=0;i<o;i++)t[r[i]]="strict"===n?[e[r[i]]]:e[r[i]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==o.exec(t))},e.getAllMatches=function(t,e){const n=[];let r=e.exec(t);for(;r;){const o=[];o.startIndex=e.lastIndex-r[0].length;const i=r.length;for(let t=0;t<i;t++)o.push(r[t]);n.push(o),r=e.exec(t)}return n},e.nameRegexp=r},31:(t,e,n)=>{const r=n(705),o={allowBooleanAttributes:!1,unpairedTags:[]};function i(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function s(t,e){const n=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const r=t.substr(n,e-n);if(e>5&&"xml"===r)return d("InvalidXml","XML declaration allowed only at the start of the document.",m(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function a(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}e.validate=function(t,e){e=Object.assign({},o,e);const n=[];let u=!1,c=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let o=0;o<t.length;o++)if("<"===t[o]&&"?"===t[o+1]){if(o+=2,o=s(t,o),o.err)return o}else{if("<"!==t[o]){if(i(t[o]))continue;return d("InvalidChar","char '"+t[o]+"' is not expected.",m(t,o))}{let g=o;if(o++,"!"===t[o]){o=a(t,o);continue}{let y=!1;"/"===t[o]&&(y=!0,o++);let v="";for(;o<t.length&&">"!==t[o]&&" "!==t[o]&&"\t"!==t[o]&&"\n"!==t[o]&&"\r"!==t[o];o++)v+=t[o];if(v=v.trim(),"/"===v[v.length-1]&&(v=v.substring(0,v.length-1),o--),h=v,!r.isName(h)){let e;return e=0===v.trim().length?"Invalid space after '<'.":"Tag '"+v+"' is an invalid name.",d("InvalidTag",e,m(t,o))}const b=l(t,o);if(!1===b)return d("InvalidAttr","Attributes for '"+v+"' have open quote.",m(t,o));let w=b.value;if(o=b.index,"/"===w[w.length-1]){const n=o-w.length;w=w.substring(0,w.length-1);const r=p(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,n+r.err.line));u=!0}else if(y){if(!b.tagClosed)return d("InvalidTag","Closing tag '"+v+"' doesn't have proper closing.",m(t,o));if(w.trim().length>0)return d("InvalidTag","Closing tag '"+v+"' can't have attributes or invalid starting.",m(t,g));if(0===n.length)return d("InvalidTag","Closing tag '"+v+"' has not been opened.",m(t,g));{const e=n.pop();if(v!==e.tagName){let n=m(t,e.tagStartPos);return d("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+n.line+", col "+n.col+") instead of closing tag '"+v+"'.",m(t,g))}0==n.length&&(c=!0)}}else{const r=p(w,e);if(!0!==r)return d(r.err.code,r.err.msg,m(t,o-w.length+r.err.line));if(!0===c)return d("InvalidXml","Multiple possible root nodes found.",m(t,o));-1!==e.unpairedTags.indexOf(v)||n.push({tagName:v,tagStartPos:g}),u=!0}for(o++;o<t.length;o++)if("<"===t[o]){if("!"===t[o+1]){o++,o=a(t,o);continue}if("?"!==t[o+1])break;if(o=s(t,++o),o.err)return o}else if("&"===t[o]){const e=f(t,o);if(-1==e)return d("InvalidChar","char '&' is not expected.",m(t,o));o=e}else if(!0===c&&!i(t[o]))return d("InvalidXml","Extra text at the end",m(t,o));"<"===t[o]&&o--}}}var h;return u?1==n.length?d("InvalidTag","Unclosed tag '"+n[0].tagName+"'.",m(t,n[0].tagStartPos)):!(n.length>0)||d("InvalidXml","Invalid '"+JSON.stringify(n.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):d("InvalidXml","Start tag expected.",1)};const u='"',c="'";function l(t,e){let n="",r="",o=!1;for(;e<t.length;e++){if(t[e]===u||t[e]===c)""===r?r=t[e]:r!==t[e]||(r="");else if(">"===t[e]&&""===r){o=!0;break}n+=t[e]}return""===r&&{value:n,index:e,tagClosed:o}}const h=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function p(t,e){const n=r.getAllMatches(t,h),o={};for(let t=0;t<n.length;t++){if(0===n[t][1].length)return d("InvalidAttr","Attribute '"+n[t][2]+"' has no space in starting.",y(n[t]));if(void 0!==n[t][3]&&void 0===n[t][4])return d("InvalidAttr","Attribute '"+n[t][2]+"' is without value.",y(n[t]));if(void 0===n[t][3]&&!e.allowBooleanAttributes)return d("InvalidAttr","boolean attribute '"+n[t][2]+"' is not allowed.",y(n[t]));const r=n[t][2];if(!g(r))return d("InvalidAttr","Attribute '"+r+"' is an invalid name.",y(n[t]));if(o.hasOwnProperty(r))return d("InvalidAttr","Attribute '"+r+"' is repeated.",y(n[t]));o[r]=1}return!0}function f(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let n=/\d/;for("x"===t[e]&&(e++,n=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(n))break}return-1}(t,++e);let n=0;for(;e<t.length;e++,n++)if(!(t[e].match(/\w/)&&n<20)){if(";"===t[e])break;return-1}return e}function d(t,e,n){return{err:{code:t,msg:e,line:n.line||n,col:n.col}}}function g(t){return r.isName(t)}function m(t,e){const n=t.substring(0,e).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function y(t){return t.startIndex+t[1].length}},221:(t,e,n)=>{const r=n(87),o={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function i(t){this.options=Object.assign({},o,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=u),this.processTextOrObjNode=s,this.options.format?(this.indentate=a,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function s(t,e,n){const r=this.j2x(t,n+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,r.attrStr,n):this.buildObjectNode(r.val,e,r.attrStr,n)}function a(t){return this.options.indentBy.repeat(t)}function u(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}i.prototype.build=function(t){return this.options.preserveOrder?r(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},i.prototype.j2x=function(t,e){let n="",r="";for(let o in t)if(Object.prototype.hasOwnProperty.call(t,o))if(void 0===t[o])this.isAttribute(o)&&(r+="");else if(null===t[o])this.isAttribute(o)?r+="":"?"===o[0]?r+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:r+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(t[o]instanceof Date)r+=this.buildTextValNode(t[o],o,"",e);else if("object"!=typeof t[o]){const i=this.isAttribute(o);if(i)n+=this.buildAttrPairStr(i,""+t[o]);else if(o===this.options.textNodeName){let e=this.options.tagValueProcessor(o,""+t[o]);r+=this.replaceEntitiesValue(e)}else r+=this.buildTextValNode(t[o],o,"",e)}else if(Array.isArray(t[o])){const n=t[o].length;let i="",s="";for(let a=0;a<n;a++){const n=t[o][a];if(void 0===n);else if(null===n)"?"===o[0]?r+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:r+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if("object"==typeof n)if(this.options.oneListGroup){const t=this.j2x(n,e+1);i+=t.val,this.options.attributesGroupName&&n.hasOwnProperty(this.options.attributesGroupName)&&(s+=t.attrStr)}else i+=this.processTextOrObjNode(n,o,e);else if(this.options.oneListGroup){let t=this.options.tagValueProcessor(o,n);t=this.replaceEntitiesValue(t),i+=t}else i+=this.buildTextValNode(n,o,"",e)}this.options.oneListGroup&&(i=this.buildObjectNode(i,o,s,e)),r+=i}else if(this.options.attributesGroupName&&o===this.options.attributesGroupName){const e=Object.keys(t[o]),r=e.length;for(let i=0;i<r;i++)n+=this.buildAttrPairStr(e[i],""+t[o][e[i]])}else r+=this.processTextOrObjNode(t[o],o,e);return{attrStr:n,val:r}},i.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},i.prototype.buildObjectNode=function(t,e,n,r){if(""===t)return"?"===e[0]?this.indentate(r)+"<"+e+n+"?"+this.tagEndChar:this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar;{let o="</"+e+this.tagEndChar,i="";return"?"===e[0]&&(i="?",o=""),!n&&""!==n||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===i.length?this.indentate(r)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(r)+"<"+e+n+i+this.tagEndChar+t+this.indentate(r)+o:this.indentate(r)+"<"+e+n+i+">"+t+o}},i.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":`></${t}`,e},i.prototype.buildTextValNode=function(t,e,n,r){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(r)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(r)+`\x3c!--${t}--\x3e`+this.newLine;if("?"===e[0])return this.indentate(r)+"<"+e+n+"?"+this.tagEndChar;{let o=this.options.tagValueProcessor(e,t);return o=this.replaceEntitiesValue(o),""===o?this.indentate(r)+"<"+e+n+this.closeTag(e)+this.tagEndChar:this.indentate(r)+"<"+e+n+">"+o+"</"+e+this.tagEndChar}},i.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const n=this.options.entities[e];t=t.replace(n.regex,n.val)}return t},t.exports=i},87:t=>{function e(t,s,a,u){let c="",l=!1;for(let h=0;h<t.length;h++){const p=t[h],f=n(p);if(void 0===f)continue;let d="";if(d=0===a.length?f:`${a}.${f}`,f===s.textNodeName){let t=p[f];o(d,s)||(t=s.tagValueProcessor(f,t),t=i(t,s)),l&&(c+=u),c+=t,l=!1;continue}if(f===s.cdataPropName){l&&(c+=u),c+=`<![CDATA[${p[f][0][s.textNodeName]}]]>`,l=!1;continue}if(f===s.commentPropName){c+=u+`\x3c!--${p[f][0][s.textNodeName]}--\x3e`,l=!0;continue}if("?"===f[0]){const t=r(p[":@"],s),e="?xml"===f?"":u;let n=p[f][0][s.textNodeName];n=0!==n.length?" "+n:"",c+=e+`<${f}${n}${t}?>`,l=!0;continue}let g=u;""!==g&&(g+=s.indentBy);const m=u+`<${f}${r(p[":@"],s)}`,y=e(p[f],s,d,g);-1!==s.unpairedTags.indexOf(f)?s.suppressUnpairedNode?c+=m+">":c+=m+"/>":y&&0!==y.length||!s.suppressEmptyNode?y&&y.endsWith(">")?c+=m+`>${y}${u}</${f}>`:(c+=m+">",y&&""!==u&&(y.includes("/>")||y.includes("</"))?c+=u+s.indentBy+y+u:c+=y,c+=`</${f}>`):c+=m+"/>",l=!0}return c}function n(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const r=e[n];if(t.hasOwnProperty(r)&&":@"!==r)return r}}function r(t,e){let n="";if(t&&!e.ignoreAttributes)for(let r in t){if(!t.hasOwnProperty(r))continue;let o=e.attributeValueProcessor(r,t[r]);o=i(o,e),!0===o&&e.suppressBooleanAttributes?n+=` ${r.substr(e.attributeNamePrefix.length)}`:n+=` ${r.substr(e.attributeNamePrefix.length)}="${o}"`}return n}function o(t,e){let n=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let r in e.stopNodes)if(e.stopNodes[r]===t||e.stopNodes[r]==="*."+n)return!0;return!1}function i(t,e){if(t&&t.length>0&&e.processEntities)for(let n=0;n<e.entities.length;n++){const r=e.entities[n];t=t.replace(r.regex,r.val)}return t}t.exports=function(t,n){let r="";return n.format&&n.indentBy.length>0&&(r="\n"),e(t,n,"",r)}},193:(t,e,n)=>{const r=n(705);function o(t,e){let n="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)n+=t[e];if(n=n.trim(),-1!==n.indexOf(" "))throw new Error("External entites are not supported");const r=t[e++];let o="";for(;e<t.length&&t[e]!==r;e++)o+=t[e];return[n,o,e]}function i(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function s(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function a(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function u(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function c(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function l(t){if(r.isName(t))return t;throw new Error(`Invalid entity name ${t}`)}t.exports=function(t,e){const n={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let r=1,h=!1,p=!1,f="";for(;e<t.length;e++)if("<"!==t[e]||p)if(">"===t[e]){if(p?"-"===t[e-1]&&"-"===t[e-2]&&(p=!1,r--):r--,0===r)break}else"["===t[e]?h=!0:f+=t[e];else{if(h&&s(t,e))e+=7,[entityName,val,e]=o(t,e+1),-1===val.indexOf("&")&&(n[l(entityName)]={regx:RegExp(`&${entityName};`,"g"),val});else if(h&&a(t,e))e+=8;else if(h&&u(t,e))e+=8;else if(h&&c(t,e))e+=9;else{if(!i)throw new Error("Invalid DOCTYPE");p=!0}r++,f=""}if(0!==r)throw new Error("Unclosed DOCTYPE")}return{entities:n,i:e}}},63:(t,e)=>{const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,n){return t}};e.buildOptions=function(t){return Object.assign({},n,t)},e.defaultOptions=n},299:(t,e,n)=>{const r=n(705),o=n(365),i=n(193),s=n(494);function a(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const r=e[n];this.lastEntities[r]={regex:new RegExp("&"+r+";","g"),val:t[r]}}}function u(t,e,n,r,o,i,s){if(void 0!==t&&(this.options.trimValues&&!r&&(t=t.trim()),t.length>0)){s||(t=this.replaceEntitiesValue(t));const r=this.options.tagValueProcessor(e,t,n,o,i);return null==r?t:typeof r!=typeof t||r!==t?r:this.options.trimValues||t.trim()===t?w(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function c(t){if(this.options.removeNSPrefix){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}const l=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function h(t,e,n){if(!this.options.ignoreAttributes&&"string"==typeof t){const n=r.getAllMatches(t,l),o=n.length,i={};for(let t=0;t<o;t++){const r=this.resolveNameSpace(n[t][1]);let o=n[t][4],s=this.options.attributeNamePrefix+r;if(r.length)if(this.options.transformAttributeName&&(s=this.options.transformAttributeName(s)),"__proto__"===s&&(s="#__proto__"),void 0!==o){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);const t=this.options.attributeValueProcessor(r,o,e);i[s]=null==t?o:typeof t!=typeof o||t!==o?t:w(o,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(i[s]=!0)}if(!Object.keys(i).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=i,t}return i}}const p=function(t){t=t.replace(/\r\n?/g,"\n");const e=new o("!xml");let n=e,r="",s="";for(let a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){const e=y(t,">",a,"Closing Tag is not closed.");let o=t.substring(a+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(r=this.saveTextToParentTag(r,n,s));const i=s.substring(s.lastIndexOf(".")+1);if(o&&-1!==this.options.unpairedTags.indexOf(o))throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let u=0;i&&-1!==this.options.unpairedTags.indexOf(i)?(u=s.lastIndexOf(".",s.lastIndexOf(".")-1),this.tagsNodeStack.pop()):u=s.lastIndexOf("."),s=s.substring(0,u),n=this.tagsNodeStack.pop(),r="",a=e}else if("?"===t[a+1]){let e=v(t,a,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(r=this.saveTextToParentTag(r,n,s),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new o(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,s,e.tagName)),this.addChild(n,t,s)}a=e.closeIndex+1}else if("!--"===t.substr(a+1,3)){const e=y(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(a+4,e-2);r=this.saveTextToParentTag(r,n,s),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}a=e}else if("!D"===t.substr(a+1,2)){const e=i(t,a);this.docTypeEntities=e.entities,a=e.i}else if("!["===t.substr(a+1,2)){const e=y(t,"]]>",a,"CDATA is not closed.")-2,o=t.substring(a+9,e);r=this.saveTextToParentTag(r,n,s);let i=this.parseTextData(o,n.tagname,s,!0,!1,!0,!0);null==i&&(i=""),this.options.cdataPropName?n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]):n.add(this.options.textNodeName,i),a=e+2}else{let i=v(t,a,this.options.removeNSPrefix),u=i.tagName;const c=i.rawTagName;let l=i.tagExp,h=i.attrExpPresent,p=i.closeIndex;this.options.transformTagName&&(u=this.options.transformTagName(u)),n&&r&&"!xml"!==n.tagname&&(r=this.saveTextToParentTag(r,n,s,!1));const f=n;if(f&&-1!==this.options.unpairedTags.indexOf(f.tagname)&&(n=this.tagsNodeStack.pop(),s=s.substring(0,s.lastIndexOf("."))),u!==e.tagname&&(s+=s?"."+u:u),this.isItStopNode(this.options.stopNodes,s,u)){let e="";if(l.length>0&&l.lastIndexOf("/")===l.length-1)"/"===u[u.length-1]?(u=u.substr(0,u.length-1),s=s.substr(0,s.length-1),l=u):l=l.substr(0,l.length-1),a=i.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(u))a=i.closeIndex;else{const n=this.readStopNodeData(t,c,p+1);if(!n)throw new Error(`Unexpected end of ${c}`);a=n.i,e=n.tagContent}const r=new o(u);u!==l&&h&&(r[":@"]=this.buildAttributesMap(l,s,u)),e&&(e=this.parseTextData(e,u,s,!0,h,!0,!0)),s=s.substr(0,s.lastIndexOf(".")),r.add(this.options.textNodeName,e),this.addChild(n,r,s)}else{if(l.length>0&&l.lastIndexOf("/")===l.length-1){"/"===u[u.length-1]?(u=u.substr(0,u.length-1),s=s.substr(0,s.length-1),l=u):l=l.substr(0,l.length-1),this.options.transformTagName&&(u=this.options.transformTagName(u));const t=new o(u);u!==l&&h&&(t[":@"]=this.buildAttributesMap(l,s,u)),this.addChild(n,t,s),s=s.substr(0,s.lastIndexOf("."))}else{const t=new o(u);this.tagsNodeStack.push(n),u!==l&&h&&(t[":@"]=this.buildAttributesMap(l,s,u)),this.addChild(n,t,s),n=t}r="",a=p}}else r+=t[a];return e.child};function f(t,e,n){const r=this.options.updateTag(e.tagname,n,e[":@"]);!1===r||("string"==typeof r?(e.tagname=r,t.addChild(e)):t.addChild(e))}const d=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const n=this.docTypeEntities[e];t=t.replace(n.regx,n.val)}for(let e in this.lastEntities){const n=this.lastEntities[e];t=t.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const n=this.htmlEntities[e];t=t.replace(n.regex,n.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function g(t,e,n,r){return t&&(void 0===r&&(r=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,n,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,r))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function m(t,e,n){const r="*."+n;for(const n in t){const o=t[n];if(r===o||e===o)return!0}return!1}function y(t,e,n,r){const o=t.indexOf(e,n);if(-1===o)throw new Error(r);return o+e.length-1}function v(t,e,n){const r=function(t,e){let n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">",o="";for(let i=e;i<t.length;i++){let e=t[i];if(n)e===n&&(n="");else if('"'===e||"'"===e)n=e;else if(e===r[0]){if(!r[1])return{data:o,index:i};if(t[i+1]===r[1])return{data:o,index:i}}else"\t"===e&&(e=" ");o+=e}}(t,e+1,arguments.length>3&&void 0!==arguments[3]?arguments[3]:">");if(!r)return;let o=r.data;const i=r.index,s=o.search(/\s/);let a=o,u=!0;-1!==s&&(a=o.substring(0,s),o=o.substring(s+1).trimStart());const c=a;if(n){const t=a.indexOf(":");-1!==t&&(a=a.substr(t+1),u=a!==r.data.substr(t+1))}return{tagName:a,tagExp:o,closeIndex:i,attrExpPresent:u,rawTagName:c}}function b(t,e,n){const r=n;let o=1;for(;n<t.length;n++)if("<"===t[n])if("/"===t[n+1]){const i=y(t,">",n,`${e} is not closed`);if(t.substring(n+2,i).trim()===e&&(o--,0===o))return{tagContent:t.substring(r,n),i};n=i}else if("?"===t[n+1])n=y(t,"?>",n+1,"StopNode is not closed.");else if("!--"===t.substr(n+1,3))n=y(t,"--\x3e",n+3,"StopNode is not closed.");else if("!["===t.substr(n+1,2))n=y(t,"]]>",n,"StopNode is not closed.")-2;else{const r=v(t,n,">");r&&((r&&r.tagName)===e&&"/"!==r.tagExp[r.tagExp.length-1]&&o++,n=r.closeIndex)}}function w(t,e,n){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&s(t,n)}return r.isExist(t)?t:""}t.exports=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,16))}},this.addExternalEntities=a,this.parseXml=p,this.parseTextData=u,this.resolveNameSpace=c,this.buildAttributesMap=h,this.isItStopNode=m,this.replaceEntitiesValue=d,this.readStopNodeData=b,this.saveTextToParentTag=g,this.addChild=f}}},338:(t,e,n)=>{const{buildOptions:r}=n(63),o=n(299),{prettify:i}=n(728),s=n(31);t.exports=class{constructor(t){this.externalEntities={},this.options=r(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const n=s.validate(t,e);if(!0!==n)throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`)}const n=new o(this.options);n.addExternalEntities(this.externalEntities);const r=n.parseXml(t);return this.options.preserveOrder||void 0===r?r:i(r,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}},728:(t,e)=>{function n(t,e,s){let a;const u={};for(let c=0;c<t.length;c++){const l=t[c],h=r(l);let p="";if(p=void 0===s?h:s+"."+h,h===e.textNodeName)void 0===a?a=l[h]:a+=""+l[h];else{if(void 0===h)continue;if(l[h]){let t=n(l[h],e,p);const r=i(t,e);l[":@"]?o(t,l[":@"],p,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==u[h]&&u.hasOwnProperty(h)?(Array.isArray(u[h])||(u[h]=[u[h]]),u[h].push(t)):e.isArray(h,p,r)?u[h]=[t]:u[h]=t}}}return"string"==typeof a?a.length>0&&(u[e.textNodeName]=a):void 0!==a&&(u[e.textNodeName]=a),u}function r(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=e[t];if(":@"!==n)return n}}function o(t,e,n,r){if(e){const o=Object.keys(e),i=o.length;for(let s=0;s<i;s++){const i=o[s];r.isArray(i,n+"."+i,!0,!0)?t[i]=[e[i]]:t[i]=e[i]}}}function i(t,e){const{textNodeName:n}=e,r=Object.keys(t).length;return 0===r||!(1!==r||!t[n]&&"boolean"!=typeof t[n]&&0!==t[n])}e.prettify=function(t,e){return n(t,e)}},365:t=>{t.exports=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}},135:t=>{function e(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}t.exports=function(t){return null!=t&&(e(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&e(t.slice(0,0))}(t)||!!t._isBuffer)}},542:(t,e,n)=>{!function(){var e=n(298),r=n(526).utf8,o=n(135),i=n(526).bin,s=function(t,n){t.constructor==String?t=n&&"binary"===n.encoding?i.stringToBytes(t):r.stringToBytes(t):o(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||t.constructor===Uint8Array||(t=t.toString());for(var a=e.bytesToWords(t),u=8*t.length,c=1732584193,l=-271733879,h=-1732584194,p=271733878,f=0;f<a.length;f++)a[f]=16711935&(a[f]<<8|a[f]>>>24)|4278255360&(a[f]<<24|a[f]>>>8);a[u>>>5]|=128<<u%32,a[14+(u+64>>>9<<4)]=u;var d=s._ff,g=s._gg,m=s._hh,y=s._ii;for(f=0;f<a.length;f+=16){var v=c,b=l,w=h,x=p;c=d(c,l,h,p,a[f+0],7,-680876936),p=d(p,c,l,h,a[f+1],12,-389564586),h=d(h,p,c,l,a[f+2],17,606105819),l=d(l,h,p,c,a[f+3],22,-1044525330),c=d(c,l,h,p,a[f+4],7,-176418897),p=d(p,c,l,h,a[f+5],12,1200080426),h=d(h,p,c,l,a[f+6],17,-1473231341),l=d(l,h,p,c,a[f+7],22,-45705983),c=d(c,l,h,p,a[f+8],7,1770035416),p=d(p,c,l,h,a[f+9],12,-1958414417),h=d(h,p,c,l,a[f+10],17,-42063),l=d(l,h,p,c,a[f+11],22,-1990404162),c=d(c,l,h,p,a[f+12],7,1804603682),p=d(p,c,l,h,a[f+13],12,-40341101),h=d(h,p,c,l,a[f+14],17,-1502002290),c=g(c,l=d(l,h,p,c,a[f+15],22,1236535329),h,p,a[f+1],5,-165796510),p=g(p,c,l,h,a[f+6],9,-1069501632),h=g(h,p,c,l,a[f+11],14,643717713),l=g(l,h,p,c,a[f+0],20,-373897302),c=g(c,l,h,p,a[f+5],5,-701558691),p=g(p,c,l,h,a[f+10],9,38016083),h=g(h,p,c,l,a[f+15],14,-660478335),l=g(l,h,p,c,a[f+4],20,-405537848),c=g(c,l,h,p,a[f+9],5,568446438),p=g(p,c,l,h,a[f+14],9,-1019803690),h=g(h,p,c,l,a[f+3],14,-187363961),l=g(l,h,p,c,a[f+8],20,1163531501),c=g(c,l,h,p,a[f+13],5,-1444681467),p=g(p,c,l,h,a[f+2],9,-51403784),h=g(h,p,c,l,a[f+7],14,1735328473),c=m(c,l=g(l,h,p,c,a[f+12],20,-1926607734),h,p,a[f+5],4,-378558),p=m(p,c,l,h,a[f+8],11,-2022574463),h=m(h,p,c,l,a[f+11],16,1839030562),l=m(l,h,p,c,a[f+14],23,-35309556),c=m(c,l,h,p,a[f+1],4,-1530992060),p=m(p,c,l,h,a[f+4],11,1272893353),h=m(h,p,c,l,a[f+7],16,-155497632),l=m(l,h,p,c,a[f+10],23,-1094730640),c=m(c,l,h,p,a[f+13],4,681279174),p=m(p,c,l,h,a[f+0],11,-358537222),h=m(h,p,c,l,a[f+3],16,-722521979),l=m(l,h,p,c,a[f+6],23,76029189),c=m(c,l,h,p,a[f+9],4,-640364487),p=m(p,c,l,h,a[f+12],11,-421815835),h=m(h,p,c,l,a[f+15],16,530742520),c=y(c,l=m(l,h,p,c,a[f+2],23,-995338651),h,p,a[f+0],6,-198630844),p=y(p,c,l,h,a[f+7],10,1126891415),h=y(h,p,c,l,a[f+14],15,-1416354905),l=y(l,h,p,c,a[f+5],21,-57434055),c=y(c,l,h,p,a[f+12],6,1700485571),p=y(p,c,l,h,a[f+3],10,-1894986606),h=y(h,p,c,l,a[f+10],15,-1051523),l=y(l,h,p,c,a[f+1],21,-2054922799),c=y(c,l,h,p,a[f+8],6,1873313359),p=y(p,c,l,h,a[f+15],10,-30611744),h=y(h,p,c,l,a[f+6],15,-1560198380),l=y(l,h,p,c,a[f+13],21,1309151649),c=y(c,l,h,p,a[f+4],6,-145523070),p=y(p,c,l,h,a[f+11],10,-1120210379),h=y(h,p,c,l,a[f+2],15,718787259),l=y(l,h,p,c,a[f+9],21,-343485551),c=c+v>>>0,l=l+b>>>0,h=h+w>>>0,p=p+x>>>0}return e.endian([c,l,h,p])};s._ff=function(t,e,n,r,o,i,s){var a=t+(e&n|~e&r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._gg=function(t,e,n,r,o,i,s){var a=t+(e&r|n&~r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._hh=function(t,e,n,r,o,i,s){var a=t+(e^n^r)+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._ii=function(t,e,n,r,o,i,s){var a=t+(n^(e|~r))+(o>>>0)+s;return(a<<i|a>>>32-i)+e},s._blocksize=16,s._digestsize=16,t.exports=function(t,n){if(null==t)throw new Error("Illegal argument "+t);var r=e.wordsToBytes(s(t,n));return n&&n.asBytes?r:n&&n.asString?i.bytesToString(r):e.bytesToHex(r)}}()},285:(t,e,n)=>{var r=n(2);t.exports=function(t){return t?("{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2)),m(function(t){return t.split("\\\\").join(o).split("\\{").join(i).split("\\}").join(s).split("\\,").join(a).split("\\.").join(u)}(t),!0).map(l)):[]};var o="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",s="\0CLOSE"+Math.random()+"\0",a="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function c(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function l(t){return t.split(o).join("\\").split(i).join("{").split(s).join("}").split(a).join(",").split(u).join(".")}function h(t){if(!t)return[""];var e=[],n=r("{","}",t);if(!n)return t.split(",");var o=n.pre,i=n.body,s=n.post,a=o.split(",");a[a.length-1]+="{"+i+"}";var u=h(s);return s.length&&(a[a.length-1]+=u.shift(),a.push.apply(a,u)),e.push.apply(e,a),e}function p(t){return"{"+t+"}"}function f(t){return/^-?0\d/.test(t)}function d(t,e){return t<=e}function g(t,e){return t>=e}function m(t,e){var n=[],o=r("{","}",t);if(!o)return[t];var i=o.pre,a=o.post.length?m(o.post,!1):[""];if(/\$$/.test(o.pre))for(var u=0;u<a.length;u++){var l=i+"{"+o.body+"}"+a[u];n.push(l)}else{var y,v,b=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o.body),w=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o.body),x=b||w,N=o.body.indexOf(",")>=0;if(!x&&!N)return o.post.match(/,.*\}/)?m(t=o.pre+"{"+o.body+s+o.post):[t];if(x)y=o.body.split(/\.\./);else if(1===(y=h(o.body)).length&&1===(y=m(y[0],!1).map(p)).length)return a.map((function(t){return o.pre+y[0]+t}));if(x){var P=c(y[0]),A=c(y[1]),O=Math.max(y[0].length,y[1].length),E=3==y.length?Math.abs(c(y[2])):1,T=d;A<P&&(E*=-1,T=g);var j=y.some(f);v=[];for(var S=P;T(S,A);S+=E){var $;if(w)"\\"===($=String.fromCharCode(S))&&($="");else if($=String(S),j){var C=O-$.length;if(C>0){var I=new Array(C+1).join("0");$=S<0?"-"+I+$.slice(1):I+$}}v.push($)}}else{v=[];for(var k=0;k<y.length;k++)v.push.apply(v,m(y[k],!1))}for(k=0;k<v.length;k++)for(u=0;u<a.length;u++)l=i+v[k]+a[u],(!e||x||l)&&n.push(l)}return n}},829:t=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t){var e="function"==typeof Map?new Map:void 0;return n=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,s)}function s(){return r(t,arguments,i(this).constructor)}return s.prototype=Object.create(t.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),o(s,t)},n(t)}function r(t,e,n){return r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},r.apply(null,arguments)}function o(t,e){return o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}var s=function(t){function n(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(r=function(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}(this,i(n).call(this,t))).name="ObjectPrototypeMutationError",r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(n,t),n}(n(Error));function a(t,n){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=n.split("."),i=o.length,s=function(e){var n=o[e];if(!t)return{v:void 0};if("+"===n){if(Array.isArray(t))return{v:t.map((function(n,i){var s=o.slice(e+1);return s.length>0?a(n,s.join("."),r):r(t,i,o,e)}))};var i=o.slice(0,e).join(".");throw new Error("Object at wildcard (".concat(i,") is not an array"))}t=r(t,n,o,e)},u=0;u<i;u++){var c=s(u);if("object"===e(c))return c.v}return t}function u(t,e){return t.length===e+1}t.exports={set:function(t,n,r){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n]=r,t[n];try{return a(t,n,(function(t,e,n,o){if(t===Reflect.getPrototypeOf({}))throw new s("Attempting to mutate Object.prototype");if(!t[e]){var i=Number.isInteger(Number(n[o+1])),a="+"===n[o+1];t[e]=i||a?[]:{}}return u(n,o)&&(t[e]=r),t[e]}))}catch(e){if(e instanceof s)throw e;return t}},get:function(t,n){if("object"!=e(t)||null===t)return t;if(void 0===n)return t;if("number"==typeof n)return t[n];try{return a(t,n,(function(t,e){return t[e]}))}catch(e){return t}},has:function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;if("number"==typeof n)return n in t;try{var o=!1;return a(t,n,(function(t,e,n,i){if(!u(n,i))return t&&t[e];o=r.own?t.hasOwnProperty(e):e in t})),o}catch(t){return!1}},hasOwn:function(t,e,n){return this.has(t,e,n||{own:!0})},isIn:function(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("object"!=e(t)||null===t)return!1;if(void 0===n)return!1;try{var i=!1,s=!1;return a(t,n,(function(t,n,o,a){return i=i||t===r||!!t&&t[n]===r,s=u(o,a)&&"object"===e(t)&&n in t,t&&t[n]})),o.validPath?i&&s:i}catch(t){return!1}},ObjectPrototypeMutationError:s}},47:(t,e,n)=>{var r=n(410),o=function(t){return"string"==typeof t};function i(t,e){for(var n=[],r=0;r<t.length;r++){var o=t[r];o&&"."!==o&&(".."===o?n.length&&".."!==n[n.length-1]?n.pop():e&&n.push(".."):n.push(o))}return n}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a={};function u(t){return s.exec(t).slice(1)}a.resolve=function(){for(var t="",e=!1,n=arguments.length-1;n>=-1&&!e;n--){var r=n>=0?arguments[n]:process.cwd();if(!o(r))throw new TypeError("Arguments to path.resolve must be strings");r&&(t=r+"/"+t,e="/"===r.charAt(0))}return(e?"/":"")+(t=i(t.split("/"),!e).join("/"))||"."},a.normalize=function(t){var e=a.isAbsolute(t),n="/"===t.substr(-1);return(t=i(t.split("/"),!e).join("/"))||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},a.isAbsolute=function(t){return"/"===t.charAt(0)},a.join=function(){for(var t="",e=0;e<arguments.length;e++){var n=arguments[e];if(!o(n))throw new TypeError("Arguments to path.join must be strings");n&&(t+=t?"/"+n:n)}return a.normalize(t)},a.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n+1)}t=a.resolve(t).substr(1),e=a.resolve(e).substr(1);for(var r=n(t.split("/")),o=n(e.split("/")),i=Math.min(r.length,o.length),s=i,u=0;u<i;u++)if(r[u]!==o[u]){s=u;break}var c=[];for(u=s;u<r.length;u++)c.push("..");return(c=c.concat(o.slice(s))).join("/")},a._makeLong=function(t){return t},a.dirname=function(t){var e=u(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},a.basename=function(t,e){var n=u(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},a.extname=function(t){return u(t)[3]},a.format=function(t){if(!r.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!o(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);return(t.dir?t.dir+a.sep:"")+(t.base||"")},a.parse=function(t){if(!o(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=u(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,e[1].length-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},a.sep="/",a.delimiter=":",t.exports=a},647:(t,e)=>{var n=Object.prototype.hasOwnProperty;function r(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(t){return null}}function o(t){try{return encodeURIComponent(t)}catch(t){return null}}e.stringify=function(t,e){e=e||"";var r,i,s=[];for(i in"string"!=typeof e&&(e="?"),t)if(n.call(t,i)){if((r=t[i])||null!=r&&!isNaN(r)||(r=""),i=o(i),r=o(r),null===i||null===r)continue;s.push(i+"="+r)}return s.length?e+s.join("&"):""},e.parse=function(t){for(var e,n=/([^=?#&]+)=?([^&]*)/g,o={};e=n.exec(t);){var i=r(e[1]),s=r(e[2]);null===i||null===s||i in o||(o[i]=s)}return o}},670:t=>{t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},494:t=>{const e=/^[-+]?0x[a-fA-F0-9]+$/,n=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const r={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(o=Object.assign({},r,o),!t||"string"!=typeof t)return t;let i=t.trim();if(void 0!==o.skipLike&&o.skipLike.test(i))return t;if(o.hex&&e.test(i))return Number.parseInt(i,16);{const e=n.exec(i);if(e){const n=e[1],r=e[2];let a=(s=e[3])&&-1!==s.indexOf(".")?("."===(s=s.replace(/0+$/,""))?s="0":"."===s[0]?s="0"+s:"."===s[s.length-1]&&(s=s.substr(0,s.length-1)),s):s;const u=e[4]||e[6];if(!o.leadingZeros&&r.length>0&&n&&"."!==i[2])return t;if(!o.leadingZeros&&r.length>0&&!n&&"."!==i[1])return t;{const e=Number(i),s=""+e;return-1!==s.search(/[eE]/)||u?o.eNotation?e:t:-1!==i.indexOf(".")?"0"===s&&""===a||s===a||n&&s==="-"+a?e:t:r?a===s||n+a===s?e:t:i===s||i===n+s?e:t}}return t}var s}},737:(t,e,n)=>{var r=n(670),o=n(647),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,s=/[\n\r\t]/g,a=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,u=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function h(t){return(t||"").toString().replace(i,"")}var p=[["#","hash"],["?","query"],function(t,e){return g(e.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],f={hash:1,query:1};function d(t){var e,n=("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}).location||{},r={},o=typeof(t=t||n);if("blob:"===t.protocol)r=new y(unescape(t.pathname),{});else if("string"===o)for(e in r=new y(t,{}),f)delete r[e];else if("object"===o){for(e in t)e in f||(r[e]=t[e]);void 0===r.slashes&&(r.slashes=a.test(t.href))}return r}function g(t){return"file:"===t||"ftp:"===t||"http:"===t||"https:"===t||"ws:"===t||"wss:"===t}function m(t,e){t=(t=h(t)).replace(s,""),e=e||{};var n,r=c.exec(t),o=r[1]?r[1].toLowerCase():"",i=!!r[2],a=!!r[3],u=0;return i?a?(n=r[2]+r[3]+r[4],u=r[2].length+r[3].length):(n=r[2]+r[4],u=r[2].length):a?(n=r[3]+r[4],u=r[3].length):n=r[4],"file:"===o?u>=2&&(n=n.slice(2)):g(o)?n=r[4]:o?i&&(n=n.slice(2)):u>=2&&g(e.protocol)&&(n=r[4]),{protocol:o,slashes:i||g(o),slashesCount:u,rest:n}}function y(t,e,n){if(t=(t=h(t)).replace(s,""),!(this instanceof y))return new y(t,e,n);var i,a,u,c,f,v,b=p.slice(),w=typeof e,x=this,N=0;for("object"!==w&&"string"!==w&&(n=e,e=null),n&&"function"!=typeof n&&(n=o.parse),i=!(a=m(t||"",e=d(e))).protocol&&!a.slashes,x.slashes=a.slashes||i&&e.slashes,x.protocol=a.protocol||e.protocol||"",t=a.rest,("file:"===a.protocol&&(2!==a.slashesCount||l.test(t))||!a.slashes&&(a.protocol||a.slashesCount<2||!g(x.protocol)))&&(b[3]=[/(.*)/,"pathname"]);N<b.length;N++)"function"!=typeof(c=b[N])?(u=c[0],v=c[1],u!=u?x[v]=t:"string"==typeof u?~(f="@"===u?t.lastIndexOf(u):t.indexOf(u))&&("number"==typeof c[2]?(x[v]=t.slice(0,f),t=t.slice(f+c[2])):(x[v]=t.slice(f),t=t.slice(0,f))):(f=u.exec(t))&&(x[v]=f[1],t=t.slice(0,f.index)),x[v]=x[v]||i&&c[3]&&e[v]||"",c[4]&&(x[v]=x[v].toLowerCase())):t=c(t,x);n&&(x.query=n(x.query)),i&&e.slashes&&"/"!==x.pathname.charAt(0)&&(""!==x.pathname||""!==e.pathname)&&(x.pathname=function(t,e){if(""===t)return e;for(var n=(e||"/").split("/").slice(0,-1).concat(t.split("/")),r=n.length,o=n[r-1],i=!1,s=0;r--;)"."===n[r]?n.splice(r,1):".."===n[r]?(n.splice(r,1),s++):s&&(0===r&&(i=!0),n.splice(r,1),s--);return i&&n.unshift(""),"."!==o&&".."!==o||n.push(""),n.join("/")}(x.pathname,e.pathname)),"/"!==x.pathname.charAt(0)&&g(x.protocol)&&(x.pathname="/"+x.pathname),r(x.port,x.protocol)||(x.host=x.hostname,x.port=""),x.username=x.password="",x.auth&&(~(f=x.auth.indexOf(":"))?(x.username=x.auth.slice(0,f),x.username=encodeURIComponent(decodeURIComponent(x.username)),x.password=x.auth.slice(f+1),x.password=encodeURIComponent(decodeURIComponent(x.password))):x.username=encodeURIComponent(decodeURIComponent(x.auth)),x.auth=x.password?x.username+":"+x.password:x.username),x.origin="file:"!==x.protocol&&g(x.protocol)&&x.host?x.protocol+"//"+x.host:"null",x.href=x.toString()}y.prototype={set:function(t,e,n){var i=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(n||o.parse)(e)),i[t]=e;break;case"port":i[t]=e,r(e,i.protocol)?e&&(i.host=i.hostname+":"+e):(i.host=i.hostname,i[t]="");break;case"hostname":i[t]=e,i.port&&(e+=":"+i.port),i.host=e;break;case"host":i[t]=e,u.test(e)?(e=e.split(":"),i.port=e.pop(),i.hostname=e.join(":")):(i.hostname=e,i.port="");break;case"protocol":i.protocol=e.toLowerCase(),i.slashes=!n;break;case"pathname":case"hash":if(e){var s="pathname"===t?"/":"#";i[t]=e.charAt(0)!==s?s+e:e}else i[t]=e;break;case"username":case"password":i[t]=encodeURIComponent(e);break;case"auth":var a=e.indexOf(":");~a?(i.username=e.slice(0,a),i.username=encodeURIComponent(decodeURIComponent(i.username)),i.password=e.slice(a+1),i.password=encodeURIComponent(decodeURIComponent(i.password))):i.username=encodeURIComponent(decodeURIComponent(e))}for(var c=0;c<p.length;c++){var l=p[c];l[4]&&(i[l[1]]=i[l[1]].toLowerCase())}return i.auth=i.password?i.username+":"+i.password:i.username,i.origin="file:"!==i.protocol&&g(i.protocol)&&i.host?i.protocol+"//"+i.host:"null",i.href=i.toString(),i},toString:function(t){t&&"function"==typeof t||(t=o.stringify);var e,n=this,r=n.host,i=n.protocol;i&&":"!==i.charAt(i.length-1)&&(i+=":");var s=i+(n.protocol&&n.slashes||g(n.protocol)?"//":"");return n.username?(s+=n.username,n.password&&(s+=":"+n.password),s+="@"):n.password?(s+=":"+n.password,s+="@"):"file:"!==n.protocol&&g(n.protocol)&&!r&&"/"!==n.pathname&&(s+="@"),(":"===r[r.length-1]||u.test(n.hostname)&&!n.port)&&(r+=":"),s+=r+n.pathname,(e="object"==typeof n.query?t(n.query):n.query)&&(s+="?"!==e.charAt(0)?"?"+e:e),n.hash&&(s+=n.hash),s}},y.extractProtocol=m,y.location=d,y.trimLeft=h,y.qs=o,t.exports=y},410:()=>{},388:()=>{},805:()=>{},345:()=>{},800:()=>{}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var r={};n.d(r,{hT:()=>C,O4:()=>I,Kd:()=>S,YK:()=>$,UU:()=>en,Gu:()=>F,ky:()=>oe,h4:()=>ne,ch:()=>re,hq:()=>Xt,i5:()=>ie});var o=n(737),i=n.n(o);function s(t){if(!a(t))throw new Error("Parameter was not an error")}function a(t){return!!t&&"object"==typeof t&&"[object Error]"===(e=t,Object.prototype.toString.call(e))||t instanceof Error;var e}class u extends Error{constructor(t,e){const n=[...arguments],{options:r,shortMessage:o}=function(t){let e,n="";if(0===t.length)e={};else if(a(t[0]))e={cause:t[0]},n=t.slice(1).join(" ")||"";else if(t[0]&&"object"==typeof t[0])e=Object.assign({},t[0]),n=t.slice(1).join(" ")||"";else{if("string"!=typeof t[0])throw new Error("Invalid arguments passed to Layerr");e={},n=n=t.join(" ")||""}return{options:e,shortMessage:n}}(n);let i=o;if(r.cause&&(i=`${i}: ${r.cause.message}`),super(i),this.message=i,r.name&&"string"==typeof r.name?this.name=r.name:this.name="Layerr",r.cause&&Object.defineProperty(this,"_cause",{value:r.cause}),Object.defineProperty(this,"_info",{value:{}}),r.info&&"object"==typeof r.info&&Object.assign(this._info,r.info),Error.captureStackTrace){const t=r.constructorOpt||this.constructor;Error.captureStackTrace(this,t)}}static cause(t){return s(t),t._cause&&a(t._cause)?t._cause:null}static fullStack(t){s(t);const e=u.cause(t);return e?`${t.stack}\ncaused by: ${u.fullStack(e)}`:t.stack??""}static info(t){s(t);const e={},n=u.cause(t);return n&&Object.assign(e,u.info(n)),t._info&&Object.assign(e,t._info),e}toString(){let t=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(t=`${t}: ${this.message}`),t}}var c=n(47),l=n.n(c);const h="__PATH_SEPARATOR_POSIX__",p="__PATH_SEPARATOR_WINDOWS__";function f(t){try{const e=t.replace(/\//g,h).replace(/\\\\/g,p);return encodeURIComponent(e).split(p).join("\\\\").split(h).join("/")}catch(t){throw new u(t,"Failed encoding path")}}function d(t){return t.startsWith("/")?t:"/"+t}function g(t){let e=t;return"/"!==e[0]&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function m(t){let e=new(i())(t).pathname;return e.length<=0&&(e="/"),g(e)}function y(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(){return function(t){var e=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var n=t.shift();t[0]=n+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o)throw new TypeError("Url must be a string. Received "+o);""!==o&&(r>0&&(o=o.replace(/^[\/]+/,"")),o=r<t.length-1?o.replace(/[\/]+$/,""):o.replace(/[\/]+$/,"/"),e.push(o))}var i=e.join("/"),s=(i=i.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}(e.reduce(((t,e,n)=>((0===n||"/"!==e||"/"===e&&"/"!==t[t.length-1])&&t.push(e),t)),[]))}var v=n(542),b=n.n(v);const w="abcdef0123456789";function x(t,e){const n=t.url.replace("//",""),r=-1==n.indexOf("/")?"/":n.slice(n.indexOf("/")),o=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",s=`00000000${e.nc}`.slice(-8),a=function(t,e,n,r,o,i,s){const a=s||b()(`${e}:${n}:${r}`);return t&&"md5-sess"===t.toLowerCase()?b()(`${a}:${o}:${i}`):a}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),u=b()(`${o}:${r}`),c=i?b()(`${a}:${e.nonce}:${s}:${e.cnonce}:${i}:${u}`):b()(`${a}:${e.nonce}:${u}`),l={username:e.username,realm:e.realm,nonce:e.nonce,uri:r,qop:i,response:c,nc:s,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},h=[];for(const t in l)l[t]&&("qop"===t||"nc"===t||"algorithm"===t?h.push(`${t}=${l[t]}`):h.push(`${t}="${l[t]}"`));return`Digest ${h.join(", ")}`}function N(t){return"digest"===(t.headers&&t.headers.get("www-authenticate")||"").split(/\s/)[0].toLowerCase()}var P=n(101),A=n.n(P);function O(t){return A().decode(t)}function E(t,e){var n;return`Basic ${n=`${t}:${e}`,A().encode(n)}`}const T="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:"undefined"!=typeof window?window:globalThis,j=T.fetch.bind(T),S=(T.Headers,T.Request),$=T.Response;let C=function(t){return t.Auto="auto",t.Digest="digest",t.None="none",t.Password="password",t.Token="token",t}({}),I=function(t){return t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth",t.InvalidUpdateRange="invalid-update-range",t.NotSupported="not-supported",t}({});function k(t,e,n,r,o){switch(t.authType){case C.Auto:e&&n&&(t.headers.Authorization=E(e,n));break;case C.Digest:t.digest=function(t,e,n){return{username:t,password:e,ha1:n,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,n,o);break;case C.None:break;case C.Password:t.headers.Authorization=E(e,n);break;case C.Token:t.headers.Authorization=`${(i=r).token_type} ${i.access_token}`;break;default:throw new u({info:{code:I.InvalidAuthType}},`Invalid auth type: ${t.authType}`)}var i}n(345),n(800);const R="@@HOTPATCHER",L=()=>{};function _(t){return{original:t,methods:[t],final:!1}}class M{constructor(){this._configuration={registry:{},getEmptyAction:"null"},this.__type__=R}get configuration(){return this._configuration}get getEmptyAction(){return this.configuration.getEmptyAction}set getEmptyAction(t){this.configuration.getEmptyAction=t}control(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t||t.__type__!==R)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(t.configuration.registry).forEach((n=>{this.configuration.registry.hasOwnProperty(n)?e&&(this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])):this.configuration.registry[n]=Object.assign({},t.configuration.registry[n])})),t._configuration=this.configuration,this}execute(t){const e=this.get(t)||L;for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return e(...r)}get(t){const e=this.configuration.registry[t];if(!e)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error(`Failed handling method request: No method provided for override: ${t}`);default:throw new Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`)}return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)throw new Error("Failed creating sequence: No functions provided");return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];let o=n;const i=this;for(;e.length>0;)o=[e.shift().apply(i,o)];return o[0]}}(...e.methods)}isPatched(t){return!!this.configuration.registry[t]}patch(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{chain:r=!1}=n;if(this.configuration.registry[t]&&this.configuration.registry[t].final)throw new Error(`Failed patching '${t}': Method marked as being final`);if("function"!=typeof e)throw new Error(`Failed patching '${t}': Provided method is not a function`);if(r)this.configuration.registry[t]?this.configuration.registry[t].methods.push(e):this.configuration.registry[t]=_(e);else if(this.isPatched(t)){const{original:n}=this.configuration.registry[t];this.configuration.registry[t]=Object.assign(_(e),{original:n})}else this.configuration.registry[t]=_(e);return this}patchInline(t,e){this.isPatched(t)||this.patch(t,e);for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return this.execute(t,...r)}plugin(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.forEach((e=>{this.patch(t,e,{chain:!0})})),this}restore(t){if(!this.isPatched(t))throw new Error(`Failed restoring method: No method present for key: ${t}`);if("function"!=typeof this.configuration.registry[t].original)throw new Error(`Failed restoring method: Original method not found or of invalid type for key: ${t}`);return this.configuration.registry[t].methods=[this.configuration.registry[t].original],this}setFinal(t){if(!this.configuration.registry.hasOwnProperty(t))throw new Error(`Failed marking '${t}' as final: No method found for key`);return this.configuration.registry[t].final=!0,this}}let U=null;function F(){return U||(U=new M),U}function D(t){return function(t){if("object"!=typeof t||null===t||"[object Object]"!=Object.prototype.toString.call(t))return!1;if(null===Object.getPrototypeOf(t))return!0;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function B(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];let r=null,o=[...e];for(;o.length>0;){const t=o.shift();r=r?W(r,t):D(t)}return r}function W(t,e){const n=D(t);return Object.keys(e).forEach((t=>{n.hasOwnProperty(t)?Array.isArray(e[t])?n[t]=Array.isArray(n[t])?[...n[t],...e[t]]:[...e[t]]:"object"==typeof e[t]&&e[t]?n[t]="object"==typeof n[t]&&n[t]?W(n[t],e[t]):D(e[t]):n[t]=e[t]:n[t]=e[t]})),n}function V(t){const e={};for(const n of t.keys())e[n]=t.get(n);return e}function z(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(0===e.length)return{};const r={};return e.reduce(((t,e)=>(Object.keys(e).forEach((n=>{const o=n.toLowerCase();r.hasOwnProperty(o)?t[r[o]]=e[n]:(r[o]=n,t[n]=e[n])})),t)),{})}n(805);const G="function"==typeof ArrayBuffer,{toString:q}=Object.prototype;function H(t){return G&&(t instanceof ArrayBuffer||"[object ArrayBuffer]"===q.call(t))}function X(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function Z(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function Y(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const K=Z((function(t){const e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=B(t,{headers:{Authorization:x(t,e)}})),Y(et(t),(function(n){let r=!1;return o=function(t){return r?t:n},(i=function(){if(401==n.status)return e.hasDigestAuth=function(t,e){if(!N(t))return!1;const n=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;for(;;){const r=t.headers&&t.headers.get("www-authenticate")||"",o=n.exec(r);if(!o)break;e[o[1]]=o[2]||o[3]}return e.nc+=1,e.cnonce=function(){let t="";for(let e=0;e<32;++e)t=`${t}${w[Math.floor(16*Math.random())]}`;return t}(),!0}(n,e),function(){if(e.hasDigestAuth)return Y(et(t=B(t,{headers:{Authorization:x(t,e)}})),(function(t){return 401==t.status?e.hasDigestAuth=!1:e.nc++,r=!0,t}))}();e.nc++}())&&i.then?i.then(o):o(i);var o,i}))})),J=Z((function(t,e){return Y(et(t),(function(n){return n.ok?(e.authType=C.Password,n):401==n.status&&N(n)?(e.authType=C.Digest,k(e,e.username,e.password,void 0,void 0),t._digest=e.digest,K(t)):n}))})),Q=Z((function(t,e){return e.authType===C.Auto?J(t,e):t._digest?K(t):et(t)}));function tt(t,e,n){const r=D(t);return r.headers=z(e.headers,r.headers||{},n.headers||{}),void 0!==n.data&&(r.data=n.data),n.signal&&(r.signal=n.signal),e.httpAgent&&(r.httpAgent=e.httpAgent),e.httpsAgent&&(r.httpsAgent=e.httpsAgent),e.digest&&(r._digest=e.digest),"boolean"==typeof e.withCredentials&&(r.withCredentials=e.withCredentials),r}function et(t){const e=F();return e.patchInline("request",(t=>e.patchInline("fetch",j,t.url,function(t){let e={};const n={method:t.method};if(t.headers&&(e=z(e,t.headers)),void 0!==t.data){const[r,o]=function(t){if("string"==typeof t)return[t,{}];if(X(t))return[t,{}];if(H(t))return[t,{}];if(t&&"object"==typeof t)return[JSON.stringify(t),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: "+typeof t)}(t.data);n.body=r,e=z(e,o)}return t.signal&&(n.signal=t.signal),t.withCredentials&&(n.credentials="include"),n.headers=e,n}(t))),t)}var nt=n(285);const rt=t=>{if("string"!=typeof t)throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")},ot={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},it=t=>t.replace(/[[\]\\-]/g,"\\$&"),st=t=>t.join(""),at=(t,e)=>{const n=e;if("["!==t.charAt(n))throw new Error("not in a brace expression");const r=[],o=[];let i=n+1,s=!1,a=!1,u=!1,c=!1,l=n,h="";t:for(;i<t.length;){const e=t.charAt(i);if("!"!==e&&"^"!==e||i!==n+1){if("]"===e&&s&&!u){l=i+1;break}if(s=!0,"\\"!==e||u){if("["===e&&!u)for(const[e,[s,u,c]]of Object.entries(ot))if(t.startsWith(e,i)){if(h)return["$.",!1,t.length-n,!0];i+=e.length,c?o.push(s):r.push(s),a=a||u;continue t}u=!1,h?(e>h?r.push(it(h)+"-"+it(e)):e===h&&r.push(it(e)),h="",i++):t.startsWith("-]",i+1)?(r.push(it(e+"-")),i+=2):t.startsWith("-",i+1)?(h=e,i+=2):(r.push(it(e)),i++)}else u=!0,i++}else c=!0,i++}if(l<i)return["",!1,0,!1];if(!r.length&&!o.length)return["$.",!1,t.length-n,!0];if(0===o.length&&1===r.length&&/^\\?.$/.test(r[0])&&!c){return[(p=2===r[0].length?r[0].slice(-1):r[0],p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,l-n,!1]}var p;const f="["+(c?"^":"")+st(r)+"]",d="["+(c?"":"^")+st(o)+"]";return[r.length&&o.length?"("+f+"|"+d+")":r.length?f:d,a,l-n,!0]},ut=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")},ct=new Set(["!","?","+","*","@"]),lt=t=>ct.has(t),ht="(?!\\.)",pt=new Set(["[","."]),ft=new Set(["..","."]),dt=new Set("().*{}+?[]^$\\!"),gt="[^/]",mt=gt+"*?",yt=gt+"+?";class vt{type;#t;#e;#n=!1;#r=[];#o;#i;#s;#a=!1;#u;#c;#l=!1;constructor(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.type=t,t&&(this.#e=!0),this.#o=e,this.#t=this.#o?this.#o.#t:this,this.#u=this.#t===this?n:this.#t.#u,this.#s=this.#t===this?[]:this.#t.#s,"!"!==t||this.#t.#a||this.#s.push(this),this.#i=this.#o?this.#o.#r.length:0}get hasMagic(){if(void 0!==this.#e)return this.#e;for(const t of this.#r)if("string"!=typeof t&&(t.type||t.hasMagic))return this.#e=!0;return this.#e}toString(){return void 0!==this.#c?this.#c:this.type?this.#c=this.type+"("+this.#r.map((t=>String(t))).join("|")+")":this.#c=this.#r.map((t=>String(t))).join("")}#h(){if(this!==this.#t)throw new Error("should only call on root");if(this.#a)return this;let t;for(this.toString(),this.#a=!0;t=this.#s.pop();){if("!"!==t.type)continue;let e=t,n=e.#o;for(;n;){for(let r=e.#i+1;!n.type&&r<n.#r.length;r++)for(const e of t.#r){if("string"==typeof e)throw new Error("string part in extglob AST??");e.copyIn(n.#r[r])}e=n,n=e.#o}}return this}push(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];for(const t of e)if(""!==t){if("string"!=typeof t&&!(t instanceof vt&&t.#o===this))throw new Error("invalid part: "+t);this.#r.push(t)}}toJSON(){const t=null===this.type?this.#r.slice().map((t=>"string"==typeof t?t:t.toJSON())):[this.type,...this.#r.map((t=>t.toJSON()))];return this.isStart()&&!this.type&&t.unshift([]),this.isEnd()&&(this===this.#t||this.#t.#a&&"!"===this.#o?.type)&&t.push({}),t}isStart(){if(this.#t===this)return!0;if(!this.#o?.isStart())return!1;if(0===this.#i)return!0;const t=this.#o;for(let e=0;e<this.#i;e++){const n=t.#r[e];if(!(n instanceof vt&&"!"===n.type))return!1}return!0}isEnd(){if(this.#t===this)return!0;if("!"===this.#o?.type)return!0;if(!this.#o?.isEnd())return!1;if(!this.type)return this.#o?.isEnd();const t=this.#o?this.#o.#r.length:0;return this.#i===t-1}copyIn(t){"string"==typeof t?this.push(t):this.push(t.clone(this))}clone(t){const e=new vt(this.type,t);for(const t of this.#r)e.copyIn(t);return e}static#p(t,e,n,r){let o=!1,i=!1,s=-1,a=!1;if(null===e.type){let u=n,c="";for(;u<t.length;){const n=t.charAt(u++);if(o||"\\"===n)o=!o,c+=n;else if(i)u===s+1?"^"!==n&&"!"!==n||(a=!0):"]"!==n||u===s+2&&a||(i=!1),c+=n;else if("["!==n)if(r.noext||!lt(n)||"("!==t.charAt(u))c+=n;else{e.push(c),c="";const o=new vt(n,e);u=vt.#p(t,o,u,r),e.push(o)}else i=!0,s=u,a=!1,c+=n}return e.push(c),u}let u=n+1,c=new vt(null,e);const l=[];let h="";for(;u<t.length;){const n=t.charAt(u++);if(o||"\\"===n)o=!o,h+=n;else if(i)u===s+1?"^"!==n&&"!"!==n||(a=!0):"]"!==n||u===s+2&&a||(i=!1),h+=n;else if("["!==n)if(lt(n)&&"("===t.charAt(u)){c.push(h),h="";const e=new vt(n,c);c.push(e),u=vt.#p(t,e,u,r)}else if("|"!==n){if(")"===n)return""===h&&0===e.#r.length&&(e.#l=!0),c.push(h),h="",e.push(...l,c),u;h+=n}else c.push(h),h="",l.push(c),c=new vt(null,e);else i=!0,s=u,a=!1,h+=n}return e.type=null,e.#e=void 0,e.#r=[t.substring(n-1)],u}static fromGlob(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=new vt(null,void 0,e);return vt.#p(t,n,0,e),n}toMMPattern(){if(this!==this.#t)return this.#t.toMMPattern();const t=this.toString(),[e,n,r,o]=this.toRegExpSource();if(!(r||this.#e||this.#u.nocase&&!this.#u.nocaseMagicOnly&&t.toUpperCase()!==t.toLowerCase()))return n;const i=(this.#u.nocase?"i":"")+(o?"u":"");return Object.assign(new RegExp(`^${e}$`,i),{_src:e,_glob:t})}get options(){return this.#u}toRegExpSource(t){const e=t??!!this.#u.dot;if(this.#t===this&&this.#h(),!this.type){const n=this.isStart()&&this.isEnd(),r=this.#r.map((e=>{const[r,o,i,s]="string"==typeof e?vt.#f(e,this.#e,n):e.toRegExpSource(t);return this.#e=this.#e||i,this.#n=this.#n||s,r})).join("");let o="";if(this.isStart()&&"string"==typeof this.#r[0]&&(1!==this.#r.length||!ft.has(this.#r[0]))){const n=pt,i=e&&n.has(r.charAt(0))||r.startsWith("\\.")&&n.has(r.charAt(2))||r.startsWith("\\.\\.")&&n.has(r.charAt(4)),s=!e&&!t&&n.has(r.charAt(0));o=i?"(?!(?:^|/)\\.\\.?(?:$|/))":s?ht:""}let i="";return this.isEnd()&&this.#t.#a&&"!"===this.#o?.type&&(i="(?:$|\\/)"),[o+r+i,ut(r),this.#e=!!this.#e,this.#n]}const n="*"===this.type||"+"===this.type,r="!"===this.type?"(?:(?!(?:":"(?:";let o=this.#d(e);if(this.isStart()&&this.isEnd()&&!o&&"!"!==this.type){const t=this.toString();return this.#r=[t],this.type=null,this.#e=void 0,[t,ut(this.toString()),!1,!1]}let i=!n||t||e?"":this.#d(!0);i===o&&(i=""),i&&(o=`(?:${o})(?:${i})*?`);let s="";return s="!"===this.type&&this.#l?(this.isStart()&&!e?ht:"")+yt:r+o+("!"===this.type?"))"+(!this.isStart()||e||t?"":ht)+mt+")":"@"===this.type?")":"?"===this.type?")?":"+"===this.type&&i?")":"*"===this.type&&i?")?":`)${this.type}`),[s,ut(o),this.#e=!!this.#e,this.#n]}#d(t){return this.#r.map((e=>{if("string"==typeof e)throw new Error("string type in extglob ast??");const[n,r,o,i]=e.toRegExpSource(t);return this.#n=this.#n||i,n})).filter((t=>!(this.isStart()&&this.isEnd()&&!t))).join("|")}static#f(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!1,o="",i=!1;for(let s=0;s<t.length;s++){const a=t.charAt(s);if(r)r=!1,o+=(dt.has(a)?"\\":"")+a;else if("\\"!==a){if("["===a){const[n,r,a,u]=at(t,s);if(a){o+=n,i=i||r,s+=a-1,e=e||u;continue}}"*"!==a?"?"!==a?o+=a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):(o+=gt,e=!0):(o+=n&&"*"===t?yt:mt,e=!0)}else s===t.length-1?o+="\\\\":r=!0}return[o,ut(t),!!e,i]}}const bt=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return rt(e),!(!n.nocomment&&"#"===e.charAt(0))&&new Gt(e,n).match(t)},wt=/^\*+([^+@!?\*\[\(]*)$/,xt=t=>e=>!e.startsWith(".")&&e.endsWith(t),Nt=t=>e=>e.endsWith(t),Pt=t=>(t=t.toLowerCase(),e=>!e.startsWith(".")&&e.toLowerCase().endsWith(t)),At=t=>(t=t.toLowerCase(),e=>e.toLowerCase().endsWith(t)),Ot=/^\*+\.\*+$/,Et=t=>!t.startsWith(".")&&t.includes("."),Tt=t=>"."!==t&&".."!==t&&t.includes("."),jt=/^\.\*+$/,St=t=>"."!==t&&".."!==t&&t.startsWith("."),$t=/^\*+$/,Ct=t=>0!==t.length&&!t.startsWith("."),It=t=>0!==t.length&&"."!==t&&".."!==t,kt=/^\?+([^+@!?\*\[\(]*)?$/,Rt=t=>{let[e,n=""]=t;const r=Ut([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},Lt=t=>{let[e,n=""]=t;const r=Ft([e]);return n?(n=n.toLowerCase(),t=>r(t)&&t.toLowerCase().endsWith(n)):r},_t=t=>{let[e,n=""]=t;const r=Ft([e]);return n?t=>r(t)&&t.endsWith(n):r},Mt=t=>{let[e,n=""]=t;const r=Ut([e]);return n?t=>r(t)&&t.endsWith(n):r},Ut=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&!t.startsWith(".")},Ft=t=>{let[e]=t;const n=e.length;return t=>t.length===n&&"."!==t&&".."!==t},Dt="object"==typeof process&&process?"object"==typeof process.env&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix";bt.sep="win32"===Dt?"\\":"/";const Bt=Symbol("globstar **");bt.GLOBSTAR=Bt,bt.filter=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n=>bt(n,t,e)};const Wt=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},t,e)};bt.defaults=t=>{if(!t||"object"!=typeof t||!Object.keys(t).length)return bt;const e=bt;return Object.assign((function(n,r){return e(n,r,Wt(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}),{Minimatch:class extends e.Minimatch{constructor(e){super(e,Wt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}))}static defaults(n){return e.defaults(Wt(t,n)).Minimatch}},AST:class extends e.AST{constructor(e,n){super(e,n,Wt(t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}))}static fromGlob(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.AST.fromGlob(n,Wt(t,r))}},unescape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.unescape(n,Wt(t,r))},escape:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.escape(n,Wt(t,r))},filter:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter(n,Wt(t,r))},defaults:n=>e.defaults(Wt(t,n)),makeRe:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.makeRe(n,Wt(t,r))},braceExpand:function(n){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.braceExpand(n,Wt(t,r))},match:function(n,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.match(n,r,Wt(t,o))},sep:e.sep,GLOBSTAR:Bt})};const Vt=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return rt(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:nt(t)};bt.braceExpand=Vt,bt.makeRe=function(t){return new Gt(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).makeRe()},bt.match=function(t,e){const n=new Gt(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});return t=t.filter((t=>n.match(t))),n.options.nonull&&!t.length&&t.push(e),t};const zt=/[?*]|[+@!]\(.*?\)|\[|\]/;class Gt{options;set;pattern;windowsPathsNoEscape;nonegate;negate;comment;empty;preserveMultipleSlashes;partial;globSet;globParts;nocase;isWindows;platform;windowsNoMagicRoot;regexp;constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};rt(t),e=e||{},this.options=e,this.pattern=t,this.platform=e.platform||Dt,this.isWindows="win32"===this.platform,this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||!1===e.allowWindowsEscape,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!e.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!e.nonegate,this.comment=!1,this.empty=!1,this.partial=!!e.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=void 0!==e.windowsNoMagicRoot?e.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(const t of this.set)for(const e of t)if("string"!=typeof e)return!0;return!1}debug(){}make(){const t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],e.debug&&(this.debug=function(){return console.error(...arguments)}),this.debug(this.pattern,this.globSet);const n=this.globSet.map((t=>this.slashSplit(t)));this.globParts=this.preprocess(n),this.debug(this.pattern,this.globParts);let r=this.globParts.map(((t,e,n)=>{if(this.isWindows&&this.windowsNoMagicRoot){const e=!(""!==t[0]||""!==t[1]||"?"!==t[2]&&zt.test(t[2])||zt.test(t[3])),n=/^[a-z]:/i.test(t[0]);if(e)return[...t.slice(0,4),...t.slice(4).map((t=>this.parse(t)))];if(n)return[t[0],...t.slice(1).map((t=>this.parse(t)))]}return t.map((t=>this.parse(t)))}));if(this.debug(this.pattern,r),this.set=r.filter((t=>-1===t.indexOf(!1))),this.isWindows)for(let t=0;t<this.set.length;t++){const e=this.set[t];""===e[0]&&""===e[1]&&"?"===this.globParts[t][2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3])&&(e[2]="?")}this.debug(this.pattern,this.set)}preprocess(t){if(this.options.noglobstar)for(let e=0;e<t.length;e++)for(let n=0;n<t[e].length;n++)"**"===t[e][n]&&(t[e][n]="*");const{optimizationLevel:e=1}=this.options;return e>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):t=e>=1?this.levelOneOptimize(t):this.adjascentGlobstarOptimize(t),t}adjascentGlobstarOptimize(t){return t.map((t=>{let e=-1;for(;-1!==(e=t.indexOf("**",e+1));){let n=e;for(;"**"===t[n+1];)n++;n!==e&&t.splice(e,n-e)}return t}))}levelOneOptimize(t){return t.map((t=>0===(t=t.reduce(((t,e)=>{const n=t[t.length-1];return"**"===e&&"**"===n?t:".."===e&&n&&".."!==n&&"."!==n&&"**"!==n?(t.pop(),t):(t.push(e),t)}),[])).length?[""]:t))}levelTwoFileOptimize(t){Array.isArray(t)||(t=this.slashSplit(t));let e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(let n=1;n<t.length-1;n++){const r=t[n];1===n&&""===r&&""===t[0]||"."!==r&&""!==r||(e=!0,t.splice(n,1),n--)}"."!==t[0]||2!==t.length||"."!==t[1]&&""!==t[1]||(e=!0,t.pop())}let n=0;for(;-1!==(n=t.indexOf("..",n+1));){const r=t[n-1];r&&"."!==r&&".."!==r&&"**"!==r&&(e=!0,t.splice(n-1,2),n-=2)}}while(e);return 0===t.length?[""]:t}firstPhasePreProcess(t){let e=!1;do{e=!1;for(let n of t){let r=-1;for(;-1!==(r=n.indexOf("**",r+1));){let o=r;for(;"**"===n[o+1];)o++;o>r&&n.splice(r+1,o-r);let i=n[r+1];const s=n[r+2],a=n[r+3];if(".."!==i)continue;if(!s||"."===s||".."===s||!a||"."===a||".."===a)continue;e=!0,n.splice(r,1);const u=n.slice(0);u[r]="**",t.push(u),r--}if(!this.preserveMultipleSlashes){for(let t=1;t<n.length-1;t++){const r=n[t];1===t&&""===r&&""===n[0]||"."!==r&&""!==r||(e=!0,n.splice(t,1),t--)}"."!==n[0]||2!==n.length||"."!==n[1]&&""!==n[1]||(e=!0,n.pop())}let o=0;for(;-1!==(o=n.indexOf("..",o+1));){const t=n[o-1];if(t&&"."!==t&&".."!==t&&"**"!==t){e=!0;const t=1===o&&"**"===n[o+1]?["."]:[];n.splice(o-1,2,...t),0===n.length&&n.push(""),o-=2}}}}while(e);return t}secondPhasePreProcess(t){for(let e=0;e<t.length-1;e++)for(let n=e+1;n<t.length;n++){const r=this.partsMatch(t[e],t[n],!this.preserveMultipleSlashes);if(r){t[e]=[],t[n]=r;break}}return t.filter((t=>t.length))}partsMatch(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=0,o=0,i=[],s="";for(;r<t.length&&o<e.length;)if(t[r]===e[o])i.push("b"===s?e[o]:t[r]),r++,o++;else if(n&&"**"===t[r]&&e[o]===t[r+1])i.push(t[r]),r++;else if(n&&"**"===e[o]&&t[r]===e[o+1])i.push(e[o]),o++;else if("*"!==t[r]||!e[o]||!this.options.dot&&e[o].startsWith(".")||"**"===e[o]){if("*"!==e[o]||!t[r]||!this.options.dot&&t[r].startsWith(".")||"**"===t[r])return!1;if("a"===s)return!1;s="b",i.push(e[o]),r++,o++}else{if("b"===s)return!1;s="a",i.push(t[r]),r++,o++}return t.length===e.length&&i}parseNegate(){if(this.nonegate)return;const t=this.pattern;let e=!1,n=0;for(let r=0;r<t.length&&"!"===t.charAt(r);r++)e=!e,n++;n&&(this.pattern=t.slice(n)),this.negate=e}matchOne(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=this.options;if(this.isWindows){const n="string"==typeof t[0]&&/^[a-z]:$/i.test(t[0]),r=!n&&""===t[0]&&""===t[1]&&"?"===t[2]&&/^[a-z]:$/i.test(t[3]),o="string"==typeof e[0]&&/^[a-z]:$/i.test(e[0]),i=r?3:n?0:void 0,s=!o&&""===e[0]&&""===e[1]&&"?"===e[2]&&"string"==typeof e[3]&&/^[a-z]:$/i.test(e[3])?3:o?0:void 0;if("number"==typeof i&&"number"==typeof s){const[n,r]=[t[i],e[s]];n.toLowerCase()===r.toLowerCase()&&(e[s]=n,s>i?e=e.slice(s):i>s&&(t=t.slice(i)))}}const{optimizationLevel:o=1}=this.options;o>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var i=0,s=0,a=t.length,u=e.length;i<a&&s<u;i++,s++){this.debug("matchOne loop");var c=e[s],l=t[i];if(this.debug(e,c,l),!1===c)return!1;if(c===Bt){this.debug("GLOBSTAR",[e,c,l]);var h=i,p=s+1;if(p===u){for(this.debug("** at the end");i<a;i++)if("."===t[i]||".."===t[i]||!r.dot&&"."===t[i].charAt(0))return!1;return!0}for(;h<a;){var f=t[h];if(this.debug("\nglobstar while",t,h,e,p,f),this.matchOne(t.slice(h),e.slice(p),n))return this.debug("globstar found match!",h,a,f),!0;if("."===f||".."===f||!r.dot&&"."===f.charAt(0)){this.debug("dot detected!",t,h,e,p);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!n||(this.debug("\n>>> no match, partial?",t,h,e,p),h!==a))}let o;if("string"==typeof c?(o=l===c,this.debug("string match",c,l,o)):(o=c.test(l),this.debug("pattern match",c,l,o)),!o)return!1}if(i===a&&s===u)return!0;if(i===a)return n;if(s===u)return i===a-1&&""===t[i];throw new Error("wtf?")}braceExpand(){return Vt(this.pattern,this.options)}parse(t){rt(t);const e=this.options;if("**"===t)return Bt;if(""===t)return"";let n,r=null;(n=t.match($t))?r=e.dot?It:Ct:(n=t.match(wt))?r=(e.nocase?e.dot?At:Pt:e.dot?Nt:xt)(n[1]):(n=t.match(kt))?r=(e.nocase?e.dot?Lt:Rt:e.dot?_t:Mt)(n):(n=t.match(Ot))?r=e.dot?Tt:Et:(n=t.match(jt))&&(r=St);const o=vt.fromGlob(t,this.options).toMMPattern();return r&&"object"==typeof o&&Reflect.defineProperty(o,"test",{value:r}),o}makeRe(){if(this.regexp||!1===this.regexp)return this.regexp;const t=this.set;if(!t.length)return this.regexp=!1,this.regexp;const e=this.options,n=e.noglobstar?"[^/]*?":e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=new Set(e.nocase?["i"]:[]);let o=t.map((t=>{const e=t.map((t=>{if(t instanceof RegExp)for(const e of t.flags.split(""))r.add(e);return"string"==typeof t?t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):t===Bt?Bt:t._src}));return e.forEach(((t,r)=>{const o=e[r+1],i=e[r-1];t===Bt&&i!==Bt&&(void 0===i?void 0!==o&&o!==Bt?e[r+1]="(?:\\/|"+n+"\\/)?"+o:e[r]=n:void 0===o?e[r-1]=i+"(?:\\/|"+n+")?":o!==Bt&&(e[r-1]=i+"(?:\\/|\\/"+n+"\\/)"+o,e[r+1]=Bt))})),e.filter((t=>t!==Bt)).join("/")})).join("|");const[i,s]=t.length>1?["(?:",")"]:["",""];o="^"+i+o+s+"$",this.negate&&(o="^(?!"+o+").+$");try{this.regexp=new RegExp(o,[...r].join(""))}catch(t){this.regexp=!1}return this.regexp}slashSplit(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?["",...t.split(/\/+/)]:t.split(/\/+/)}match(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.partial;if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;const n=this.options;this.isWindows&&(t=t.split("\\").join("/"));const r=this.slashSplit(t);this.debug(this.pattern,"split",r);const o=this.set;this.debug(this.pattern,"set",o);let i=r[r.length-1];if(!i)for(let t=r.length-2;!i&&t>=0;t--)i=r[t];for(let t=0;t<o.length;t++){const s=o[t];let a=r;if(n.matchBase&&1===s.length&&(a=[i]),this.matchOne(a,s,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate}static defaults(t){return bt.defaults(t).Minimatch}}function qt(t){const e=new Error(`${arguments.length>1&&void 0!==arguments[1]?arguments[1]:""}Invalid response: ${t.status} ${t.statusText}`);return e.status=t.status,e.response=t,e}function Ht(t,e){const{status:n}=e;if(401===n&&t.digest)return e;if(n>=400)throw qt(e);return e}function Xt(t,e){return arguments.length>2&&void 0!==arguments[2]&&arguments[2]?{data:e,headers:t.headers?V(t.headers):{},status:t.status,statusText:t.statusText}:e}bt.AST=vt,bt.Minimatch=Gt,bt.escape=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},bt.unescape=ut;const Zt=(Yt=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"COPY",headers:{Destination:y(t.remoteURL,f(n)),Overwrite:!1===r.overwrite?"F":"T",Depth:r.shallow?"0":"infinity"}},t,r);return s=function(e){Ht(t,e)},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(Yt.apply(this,t))}catch(t){return Promise.reject(t)}});var Yt,Kt=n(635),Jt=n(829),Qt=n.n(Jt),te=function(t){return t.Array="array",t.Object="object",t.Original="original",t}(te||{});function ee(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:te.Original;const r=Qt().get(t,e);return"array"===n&&!1===Array.isArray(r)?[r]:"object"===n&&Array.isArray(r)?r[0]:r}function ne(t){return new Promise((e=>{e(function(t){const{multistatus:e}=t;if(""===e)return{multistatus:{response:[]}};if(!e)throw new Error("Invalid response: No root multistatus found");const n={multistatus:Array.isArray(e)?e[0]:e};return Qt().set(n,"multistatus.response",ee(n,"multistatus.response",te.Array)),Qt().set(n,"multistatus.response",Qt().get(n,"multistatus.response").map((t=>function(t){const e=Object.assign({},t);return e.status?Qt().set(e,"status",ee(e,"status",te.Object)):(Qt().set(e,"propstat",ee(e,"propstat",te.Object)),Qt().set(e,"propstat.prop",ee(e,"propstat.prop",te.Object))),e}(t)))),n}(new Kt.XMLParser({removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1}}).parse(t)))}))}function re(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{getlastmodified:r=null,getcontentlength:o="0",resourcetype:i=null,getcontenttype:s=null,getetag:a=null}=t,u=i&&"object"==typeof i&&void 0!==i.collection?"directory":"file",c={filename:e,basename:l().basename(e),lastmod:r,size:parseInt(o,10),type:u,etag:"string"==typeof a?a.replace(/"/g,""):null};return"file"===u&&(c.mime=s&&"string"==typeof s?s.split(";")[0]:""),n&&(void 0!==t.displayname&&(t.displayname=String(t.displayname)),c.props=t),c}function oe(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=null;try{t.multistatus.response[0].propstat&&(r=t.multistatus.response[0])}catch(t){}if(!r)throw new Error("Failed getting item stat: bad response");const{propstat:{prop:o,status:i}}=r,[s,a,u]=i.split(" ",3),c=parseInt(a,10);if(c>=400){const t=new Error(`Invalid response: ${c} ${u}`);throw t.status=c,t}return re(o,g(e),n)}function ie(t){switch(String(t)){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(String(t),10)}}function se(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const ae=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=tt({url:y(t.remoteURL,f(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,n);return se(Q(o,t),(function(n){return Ht(t,n),se(n.text(),(function(t){return se(ne(t),(function(t){const o=oe(t,e,r);return Xt(n,o,r)}))}))}))}));function ue(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const ce=le((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=function(t){if(!t||"/"===t)return[];let e=t;const n=[];do{n.push(e),e=l().dirname(e)}while(e&&"/"!==e);return n}(g(e));r.sort(((t,e)=>t.length>e.length?1:e.length>t.length?-1:0));let o=!1;return function(t,e,n){if("function"==typeof t[fe]){var r,o,i,s=t[fe]();function l(t){try{for(;!(r=s.next()).done;)if((t=e(r.value))&&t.then){if(!me(t))return void t.then(l,i||(i=de.bind(null,o=new ge,2)));t=t.v}o?de(o,1,t):o=t}catch(t){de(o||(o=new ge),2,t)}}if(l(),s.return){var a=function(t){try{r.done||s.return()}catch(t){}return t};if(o&&o.then)return o.then(a,(function(t){throw a(t)}));a()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var u=[],c=0;c<t.length;c++)u.push(t[c]);return function(t,e,n){var r,o,i=-1;return function s(a){try{for(;++i<t.length&&(!n||!n());)if((a=e(i))&&a.then){if(!me(a))return void a.then(s,o||(o=de.bind(null,r=new ge,2)));a=a.v}r?de(r,1,a):r=a}catch(t){de(r||(r=new ge),2,t)}}(),r}(u,(function(t){return e(u[t])}),n)}(r,(function(r){return i=function(){return function(n,o){try{var i=ue(ae(t,r),(function(t){if("directory"!==t.type)throw new Error(`Path includes a file: ${e}`)}))}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,(function(e){const i=e;return function(){if(404===i.status)return o=!0,pe(ye(t,r,{...n,recursive:!1}));throw e}()}))},(s=function(){if(o)return pe(ye(t,r,{...n,recursive:!1}))}())&&s.then?s.then(i):i();var i,s}),(function(){return!1}))}));function le(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}function he(){}function pe(t,e){if(!e)return t&&t.then?t.then(he):Promise.resolve()}const fe="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function de(t,e,n){if(!t.s){if(n instanceof ge){if(!n.s)return void(n.o=de.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(de.bind(null,t,e),de.bind(null,t,2));t.s=e,t.v=n;const r=t.o;r&&r(t)}}const ge=function(){function t(){}return t.prototype.then=function(e,n){const r=new t,o=this.s;if(o){const t=1&o?e:n;if(t){try{de(r,1,t(this.v))}catch(t){de(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?de(r,1,e?e(o):o):n?de(r,1,n(o)):de(r,2,o)}catch(t){de(r,2,t)}},r},t}();function me(t){return t instanceof ge&&1&t.s}const ye=le((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!0===n.recursive)return ce(t,e,n);const r=tt({url:y(t.remoteURL,(o=f(e),o.endsWith("/")?o:o+"/")),method:"MKCOL"},t,n);var o;return ue(Q(r,t),(function(e){Ht(t,e)}))}));var ve=n(388),be=n.n(ve);const we=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r={};if("object"==typeof n.range&&"number"==typeof n.range.start){let t=`bytes=${n.range.start}-`;"number"==typeof n.range.end&&(t=`${t}${n.range.end}`),r.Range=t}const o=tt({url:y(t.remoteURL,f(e)),method:"GET",headers:r},t,n);return s=function(e){if(Ht(t,e),r.Range&&206!==e.status){const t=new Error(`Invalid response code for partial request: ${e.status}`);throw t.status=e.status,t}return n.callback&&setTimeout((()=>{n.callback(e)}),0),e.body},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s})),xe=()=>{},Ne=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){n.url||(n.url=y(t.remoteURL,f(e)));const r=tt(n,t,{});return i=function(e){return Ht(t,e),e},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i})),Pe=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"DELETE"},t,n);return i=function(e){Ht(t,e)},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i})),Ae=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(r,o){try{var i=(s=ae(t,e,n),a=function(){return!0},u?a?a(s):s:(s&&s.then||(s=Promise.resolve(s)),a?s.then(a):s))}catch(t){return o(t)}var s,a,u;return i&&i.then?i.then(void 0,o):i}(0,(function(t){if(404===t.status)return!1;throw t}))}));function Oe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ee=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:n.deep?"infinity":"1"}},t,n);return Oe(Q(r,t),(function(r){return Ht(t,r),Oe(r.text(),(function(o){if(!o)throw new Error("Failed parsing directory contents: Empty response");return Oe(ne(o),(function(o){const i=d(e);let s=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const i=l().join(e,"/"),{multistatus:{response:s}}=t,a=s.map((t=>{const e=function(t){try{return t.replace(/^https?:\/\/[^\/]+/,"")}catch(t){throw new u(t,"Failed normalising HREF")}}(t.href),{propstat:{prop:n}}=t;return re(n,"/"===i?decodeURIComponent(g(e)):g(l().relative(decodeURIComponent(i),decodeURIComponent(e))),r)}));return o?a:a.filter((t=>t.basename&&("file"===t.type||t.filename!==n.replace(/\/$/,""))))}(o,d(t.remoteBasePath||t.remotePath),i,n.details,n.includeSelf);return n.glob&&(s=function(t,e){return t.filter((t=>bt(t.filename,e,{matchBase:!0})))}(s,n.glob)),Xt(r,s,n.details)}))}))}))}));function Te(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const je=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[Ie]},t,n);return Se(Q(r,t),(function(e){return Ht(t,e),Se(e.text(),(function(t){return Xt(e,t,n.details)}))}))}));function Se(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const $e=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"GET"},t,n);return Se(Q(r,t),(function(e){let r;return Ht(t,e),function(t,e){var n=t();return n&&n.then?n.then(e):e()}((function(){return Se(e.arrayBuffer(),(function(t){r=t}))}),(function(){return Xt(e,r,n.details)}))}))})),Ce=Te((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{format:r="binary"}=n;if("binary"!==r&&"text"!==r)throw new u({info:{code:I.InvalidOutputFormat}},`Invalid output format: ${r}`);return"text"===r?je(t,e,n):$e(t,e,n)})),Ie=t=>t;function ke(t){return new Kt.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(Re({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function Re(t,e){const n={...t};for(const t in n)n.hasOwnProperty(t)&&(n[t]&&"object"==typeof n[t]&&-1===t.indexOf(":")?(n[`${e}:${t}`]=Re(n[t],e),delete n[t]):!1===/^@_/.test(t)&&(n[`${e}:${t}`]=n[t],delete n[t]));return n}function Le(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function _e(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Me=_e((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"UNLOCK",headers:{"Lock-Token":n}},t,r);return Le(Q(o,t),(function(e){if(Ht(t,e),204!==e.status&&200!==e.status)throw qt(e)}))})),Ue=_e((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{refreshToken:r,timeout:o=Fe}=n,i={Accept:"text/plain,application/xml",Timeout:o};r&&(i.If=r);const s=tt({url:y(t.remoteURL,f(e)),method:"LOCK",headers:i,data:ke(t.contactHref)},t,n);return Le(Q(s,t),(function(e){return Ht(t,e),Le(e.text(),(function(t){const n=(i=t,new Kt.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(i)),r=Qt().get(n,"prop.lockdiscovery.activelock.locktoken.href"),o=Qt().get(n,"prop.lockdiscovery.activelock.timeout");var i;if(!r)throw qt(e,"No lock token received: ");return{token:r,serverTimeout:o}}))}))})),Fe="Infinite, Second-4100000000";function De(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Be=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=e.path||"/",r=tt({url:y(t.remoteURL,n),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return De(Q(r,t),(function(n){return Ht(t,n),De(n.text(),(function(t){return De(ne(t),(function(t){const r=function(t){try{const[e]=t.multistatus.response,{propstat:{prop:{"quota-used-bytes":n,"quota-available-bytes":r}}}=e;return void 0!==n&&void 0!==r?{used:parseInt(String(n),10),available:ie(r)}:null}catch(t){}return null}(t);return Xt(n,r,e.details)}))}))}))}));function We(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ve=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{details:r=!1}=n,o=tt({url:y(t.remoteURL,f(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,n);return We(Q(o,t),(function(n){return Ht(t,n),We(n.text(),(function(t){return We(ne(t),(function(t){const o=function(t,e,n){const r={truncated:!1,results:[]};return r.truncated=t.multistatus.response.some((t=>"507"===(t.status||t.propstat?.status).split(" ",3)?.[1]&&t.href.replace(/\/$/,"").endsWith(f(e).replace(/\/$/,"")))),t.multistatus.response.forEach((t=>{if(void 0===t.propstat)return;const e=t.href.split("/").map(decodeURIComponent).join("/");r.results.push(re(t.propstat.prop,e,n))})),r}(t,e,r);return Xt(n,o,r)}))}))}))})),ze=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const o=tt({url:y(t.remoteURL,f(e)),method:"MOVE",headers:{Destination:y(t.remoteURL,f(n)),Overwrite:!1===r.overwrite?"F":"T"}},t,r);return s=function(e){Ht(t,e)},(i=Q(o,t))&&i.then||(i=Promise.resolve(i)),s?i.then(s):i;var i,s}));var Ge=n(172);const qe=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const{contentLength:o=!0,overwrite:i=!0}=r,s={"Content-Type":"application/octet-stream"};!1===o||(s["Content-Length"]="number"==typeof o?`${o}`:`${function(t){if(H(t))return t.byteLength;if(X(t))return t.length;if("string"==typeof t)return(0,Ge.d)(t);throw new u({info:{code:I.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(n)}`),i||(s["If-None-Match"]="*");const a=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:s,data:n},t,r);return l=function(e){try{Ht(t,e)}catch(t){const e=t;if(412!==e.status||i)throw e;return!1}return!0},(c=Q(a,t))&&c.then||(c=Promise.resolve(c)),l?c.then(l):c;var c,l})),He=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}((function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=tt({url:y(t.remoteURL,f(e)),method:"OPTIONS"},t,n);return i=function(e){try{Ht(t,e)}catch(t){throw t}return{compliance:(e.headers.get("DAV")??"").split(",").map((t=>t.trim())),server:e.headers.get("Server")??""}},(o=Q(r,t))&&o.then||(o=Promise.resolve(o)),i?o.then(i):o;var o,i}));function Xe(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const Ze=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new u({info:{code:I.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const s={"Content-Type":"application/octet-stream","Content-Length":""+(r-n+1),"Content-Range":`bytes ${n}-${r}/*`},a=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:s,data:o},t,i);return Xe(Q(a,t),(function(e){Ht(t,e)}))}));function Ye(t,e){var n=t();return n&&n.then?n.then(e):e(n)}const Ke=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};if(n>r||n<0)throw new u({info:{code:I.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const s={"Content-Type":"application/x-sabredav-partialupdate","Content-Length":""+(r-n+1),"X-Update-Range":`bytes=${n}-${r}`},a=tt({url:y(t.remoteURL,f(e)),method:"PATCH",headers:s,data:o},t,i);return Xe(Q(a,t),(function(e){Ht(t,e)}))}));function Je(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}}const Qe=Je((function(t,e,n,r,o){let i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};return Xe(He(t,e,i),(function(s){let a=!1;return Ye((function(){if(s.compliance.includes("sabredav-partialupdate"))return Xe(Ke(t,e,n,r,o,i),(function(t){return a=!0,t}))}),(function(c){let l=!1;return a?c:Ye((function(){if(s.server.includes("Apache")&&s.compliance.includes("<http://apache.org/dav/propset/fs/1>"))return Xe(Ze(t,e,n,r,o,i),(function(t){return l=!0,t}))}),(function(t){if(l)return t;throw new u({info:{code:I.NotSupported}},"Not supported")}))}))}))})),tn="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function en(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{authType:n=null,remoteBasePath:r,contactHref:o=tn,ha1:i,headers:s={},httpAgent:a,httpsAgent:c,password:l,token:h,username:p,withCredentials:d}=e;let g=n;g||(g=p||l?C.Password:C.None);const v={authType:g,remoteBasePath:r,contactHref:o,ha1:i,headers:Object.assign({},s),httpAgent:a,httpsAgent:c,password:l,remotePath:m(t),remoteURL:t,token:h,username:p,withCredentials:d};return k(v,p,l,h,i),{copyFile:(t,e,n)=>Zt(v,t,e,n),createDirectory:(t,e)=>ye(v,t,e),createReadStream:(t,e)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=new(0,be().PassThrough);return we(t,e,n).then((t=>{t.pipe(r)})).catch((t=>{r.emit("error",t)})),r}(v,t,e),createWriteStream:(t,e,n)=>function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:xe;const o=new(0,be().PassThrough),i={};!1===n.overwrite&&(i["If-None-Match"]="*");const s=tt({url:y(t.remoteURL,f(e)),method:"PUT",headers:i,data:o,maxRedirects:0},t,n);return Q(s,t).then((e=>Ht(t,e))).then((t=>{setTimeout((()=>{r(t)}),0)})).catch((t=>{o.emit("error",t)})),o}(v,t,e,n),customRequest:(t,e)=>Ne(v,t,e),deleteFile:(t,e)=>Pe(v,t,e),exists:(t,e)=>Ae(v,t,e),getDirectoryContents:(t,e)=>Ee(v,t,e),getFileContents:(t,e)=>Ce(v,t,e),getFileDownloadLink:t=>function(t,e){let n=y(t.remoteURL,f(e));const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=O(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,`${r}://${e}@`);break}default:throw new u({info:{code:I.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${t.authType}`)}return n}(v,t),getFileUploadLink:t=>function(t,e){let n=`${y(t.remoteURL,f(e))}?Content-Type=application/octet-stream`;const r=/^https:/i.test(n)?"https":"http";switch(t.authType){case C.None:break;case C.Password:{const e=O(t.headers.Authorization.replace(/^Basic /i,"").trim());n=n.replace(/^https?:\/\//,`${r}://${e}@`);break}default:throw new u({info:{code:I.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${t.authType}`)}return n}(v,t),getHeaders:()=>Object.assign({},v.headers),getQuota:t=>Be(v,t),lock:(t,e)=>Ue(v,t,e),moveFile:(t,e,n)=>ze(v,t,e,n),putFileContents:(t,e,n)=>qe(v,t,e,n),partialUpdateFileContents:(t,e,n,r,o)=>Qe(v,t,e,n,r,o),getDAVCompliance:t=>He(v,t),search:(t,e)=>Ve(v,t,e),setHeaders:t=>{v.headers=Object.assign({},t)},stat:(t,e)=>ae(v,t,e),unlock:(t,e,n)=>Me(v,t,e,n)}}var nn=r.hT,rn=r.O4,on=r.Kd,sn=r.YK,an=r.UU,un=r.Gu,cn=r.ky,ln=r.h4,hn=r.ch,pn=r.hq,fn=r.i5;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/filesplugin.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.mjs");
/* harmony import */ var _nextcloud_files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/files */ "./node_modules/@nextcloud/files/dist/index.mjs");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.mjs");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");






const state = (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_2__.loadState)('app_api', 'ex_files_actions_menu');
function loadStaticAppAPIInlineSvgIcon() {
  return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512; filter: var(--background-invert-if-dark);" xml:space="preserve" class=""><g><g stroke-linecap="round" stroke-linejoin="round"><path d="M53.105 17.553a1 1 0 0 0-.623.447 2.93 2.93 0 0 1-4.975-.006 1 1 0 0 0-1.378-.314L26.16 30.22a1 1 0 0 0-.318 1.376 2.955 2.955 0 0 1 0 3.133 1 1 0 0 0 .318 1.375l19.83 12.45a1 1 0 0 0 1.416-.38 2.91 2.91 0 0 1 2.596-1.557c1.127 0 2.093.626 2.584 1.557a1 1 0 0 0 1.416.38l19.51-12.24a1 1 0 0 0 .285-1.425 2.95 2.95 0 0 1-.557-1.721c0-.65.2-1.23.551-1.715a1 1 0 0 0-.277-1.433l-19.65-12.34a1 1 0 0 0-.759-.127zm-6.544 2.218c.898.924 2.054 1.606 3.441 1.606 1.38 0 2.533-.68 3.43-1.606l18.402 11.555c-.253.596-.594 1.16-.594 1.842 0 .689.337 1.246.59 1.84L53.605 46.44c-.906-1.05-2.123-1.824-3.603-1.824-1.486 0-2.707.774-3.615 1.824L27.827 34.79c.193-.53.464-1.03.464-1.621 0-.596-.273-1.098-.467-1.63z" fill="#000000" data-original="#000000" class=""></path><path d="M27.223 34.41a1 1 0 0 0-1.377.313 2.931 2.931 0 0 1-2.494 1.384 1 1 0 0 0-1 1v23.12a1 1 0 0 0 1 1c1.641 0 2.939 1.3 2.939 2.941 0 .5-.125.969-.344 1.383a1 1 0 0 0 .352 1.312l19.83 12.451A1 1 0 0 0 47.508 79a2.93 2.93 0 0 1 4.974-.006 1 1 0 0 0 1.381.32l19.96-12.52a1 1 0 0 0 .314-1.382 2.793 2.793 0 0 1-.436-1.525 2.936 2.936 0 0 1 2.94-2.94 1 1 0 0 0 1-1v-22.87a1 1 0 0 0-1.131-.991 2.41 2.41 0 0 1-.328.021c-.992 0-1.851-.483-2.393-1.228a1 1 0 0 0-1.34-.26L52.94 46.86a1 1 0 0 0-.345 1.327c.222.407.347.87.347 1.37 0 1.64-1.31 2.94-2.939 2.94a2.918 2.918 0 0 1-2.941-2.94c0-.5.127-.968.345-1.382a1 1 0 0 0-.353-1.315zm-.43 2.09 18.61 11.686c-.137.45-.342.874-.342 1.37 0 2.719 2.223 4.94 4.941 4.94 2.71 0 4.94-2.218 4.94-4.94 0-.494-.212-.92-.35-1.372l18.316-11.49c.75.692 1.665 1.155 2.733 1.28V59.15c-2.224.48-3.94 2.377-3.94 4.737 0 .578.268 1.069.455 1.59L53.432 77.223c-.897-.926-2.05-1.606-3.43-1.606-1.387 0-2.543.682-3.441 1.606L27.949 65.539c.136-.451.342-.874.342-1.371 0-2.364-1.714-4.26-3.94-4.738V37.844a4.748 4.748 0 0 0 2.442-1.344z" fill="#000000" data-original="#000000" class=""></path><path d="M27.223 34.41a1 1 0 0 0-1.377.313 2.931 2.931 0 0 1-2.494 1.384 1 1 0 0 0-1 1v23.12a1 1 0 0 0 1 1c1.641 0 2.939 1.3 2.939 2.941 0 .5-.125.969-.344 1.383a1 1 0 0 0 .352 1.312l19.83 12.451A1 1 0 0 0 47.508 79a2.93 2.93 0 0 1 4.974-.006 1 1 0 0 0 1.381.32l19.96-12.52a1 1 0 0 0 .314-1.382 2.793 2.793 0 0 1-.436-1.525 2.936 2.936 0 0 1 2.94-2.94 1 1 0 0 0 1-1v-22.87a1 1 0 0 0-1.131-.991 2.41 2.41 0 0 1-.328.021c-.992 0-1.851-.483-2.393-1.228a1 1 0 0 0-1.34-.26L52.94 46.86a1 1 0 0 0-.345 1.327c.222.407.347.87.347 1.37 0 1.64-1.31 2.94-2.939 2.94a2.918 2.918 0 0 1-2.941-2.94c0-.5.127-.968.345-1.382a1 1 0 0 0-.353-1.315zm-.43 2.09 18.61 11.686c-.137.45-.342.874-.342 1.37 0 2.719 2.223 4.94 4.941 4.94 2.71 0 4.94-2.218 4.94-4.94 0-.494-.212-.92-.35-1.372l18.316-11.49c.75.692 1.665 1.155 2.733 1.28V59.15c-2.224.48-3.94 2.377-3.94 4.737 0 .578.268 1.069.455 1.59L53.432 77.223c-.897-.926-2.05-1.606-3.43-1.606-1.387 0-2.543.682-3.441 1.606L27.949 65.539c.136-.451.342-.874.342-1.371 0-2.364-1.714-4.26-3.94-4.738V37.844a4.748 4.748 0 0 0 2.442-1.344z" fill="#000000" data-original="#000000" class=""></path><path d="M53.105 17.553a1 1 0 0 0-.623.447 2.93 2.93 0 0 1-4.975-.006 1 1 0 0 0-1.378-.314L26.16 30.22a1 1 0 0 0-.318 1.376 2.955 2.955 0 0 1 0 3.133 1 1 0 0 0 .318 1.375l19.83 12.45a1 1 0 0 0 1.416-.38 2.91 2.91 0 0 1 2.596-1.557c1.127 0 2.093.626 2.584 1.557a1 1 0 0 0 1.416.38l19.51-12.24a1 1 0 0 0 .285-1.425 2.95 2.95 0 0 1-.557-1.721c0-.65.2-1.23.551-1.715a1 1 0 0 0-.277-1.433l-19.65-12.34a1 1 0 0 0-.759-.127zm-6.544 2.218c.898.924 2.054 1.606 3.441 1.606 1.38 0 2.533-.68 3.43-1.606l18.402 11.555c-.253.596-.594 1.16-.594 1.842 0 .689.337 1.246.59 1.84L53.605 46.44c-.906-1.05-2.123-1.824-3.603-1.824-1.486 0-2.707.774-3.615 1.824L27.827 34.79c.193-.53.464-1.03.464-1.621 0-.596-.273-1.098-.467-1.63z" fill="#000000" data-original="#000000" class=""></path><path d="M65.91 38.799a1 1 0 0 0-1.379.314 1 1 0 0 0 .313 1.38l-.012-.009a1 1 0 0 0 .969.926 1 1 0 0 0 1-1v-.5a1 1 0 0 0-.469-.846zM65.8 44.17a1 1 0 0 0-1 1v.951a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-.951a1 1 0 0 0-1-1zm0 5.709a1 1 0 0 0-1 1v.951a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-.951a1 1 0 0 0-1-1zM65.8 55.59a1 1 0 0 0-.968.926l.012-.008a1 1 0 0 0-.313 1.379 1 1 0 0 0 1.38.314l.421-.265a1 1 0 0 0 .469-.846v-.5a1 1 0 0 0-1-1zM61.201 59.14a1 1 0 0 0-.754.13l-.879.55a1 1 0 0 0-.316 1.38 1 1 0 0 0 1.379.316l.879-.553a1 1 0 0 0 .316-1.379 1 1 0 0 0-.625-.443zm-6.031 3.442-.879.55a1 1 0 0 0-.316 1.38 1 1 0 0 0 1.379.316l.878-.553a1 1 0 0 0 .317-1.379 1 1 0 0 0-1.38-.314zM49.355 65.766a1 1 0 0 0-.625.443 1 1 0 0 0 .315 1.379l.422.266a1 1 0 0 0 1.066 0l.422-.266a1 1 0 0 0 .315-1.379 1 1 0 0 0-1.208-.344l.047.03a1 1 0 0 0-.109-.02 1 1 0 0 0-.11.02l.047-.03a1 1 0 0 0-.582-.1zM38.799 59.14a1 1 0 0 0-.623.444 1 1 0 0 0 .314 1.379l.88.553a1 1 0 0 0 1.378-.317 1 1 0 0 0-.314-1.379l-.881-.55a1 1 0 0 0-.754-.13zm6.033 3.442a1 1 0 0 0-1.379.314 1 1 0 0 0 .315 1.38l.878.552a1 1 0 0 0 1.38-.316 1 1 0 0 0-.315-1.377zM34.2 55.59a1 1 0 0 0-1 1v.5a1 1 0 0 0 .468.846l.422.265a1 1 0 0 0 1.379-.314 1 1 0 0 0-.27-1.332v.035a1 1 0 0 0-.01-.045 1 1 0 0 0-.033-.037l.031.021a1 1 0 0 0-.988-.94zM34.2 44.17a1 1 0 0 0-1 1v.951a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-.951a1 1 0 0 0-1-1zm0 5.709a1 1 0 0 0-1 1v.951a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-.951a1 1 0 0 0-1-1zM34.846 38.67a1 1 0 0 0-.756.129l-.422.265a1 1 0 0 0-.469.846v.5a1 1 0 0 0 1 1 1 1 0 0 0 .969-.926l-.012.008a1 1 0 0 0 .016-.017 1 1 0 0 0 .027-.065v.035a1 1 0 0 0 .27-1.332 1 1 0 0 0-.623-.443zM45.402 32.045a1 1 0 0 0-.756.127l-.878.553a1 1 0 0 0-.317 1.379 1 1 0 0 0 1.38.314l.878-.55a1 1 0 0 0 .316-1.38 1 1 0 0 0-.623-.443zm-5.279 3.312a1 1 0 0 0-.754.127l-.879.553a1 1 0 0 0-.316 1.379 1 1 0 0 0 1.379.314l.879-.55a1 1 0 0 0 .316-1.38 1 1 0 0 0-.625-.443zM49.467 29.146l-.422.266a1 1 0 0 0-.315 1.379 1 1 0 0 0 1.27.29 1 1 0 0 0 1.27-.29 1 1 0 0 0-.315-1.379l-.422-.266a1 1 0 0 0-1.066 0zM54.598 32.045a1 1 0 0 0-.623.443 1 1 0 0 0 .314 1.377l.879.553a1 1 0 0 0 1.379-.314 1 1 0 0 0-.315-1.38l-.878-.552a1 1 0 0 0-.756-.127zm5.277 3.312a1 1 0 0 0-.623.444 1 1 0 0 0 .314 1.379l.881.55a1 1 0 0 0 1.377-.314 1 1 0 0 0-.314-1.379l-.88-.553a1 1 0 0 0-.755-.127z" fill="#000000" data-original="#000000" class=""></path><g stroke-miterlimit="10"><path d="M50.002 52.496a1 1 0 0 0-1 1v23.121a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-23.12a1 1 0 0 0-1-1zM50 11.5c-2.716 0-4.94 2.223-4.94 4.94s2.224 4.94 4.94 4.94 4.94-2.224 4.94-4.94S52.715 11.5 50 11.5zm0 2c1.636 0 2.94 1.304 2.94 2.94s-1.304 2.94-2.94 2.94-2.94-1.305-2.94-2.94S48.365 13.5 50 13.5zM23.354 28.227a4.954 4.954 0 0 0-4.94 4.939 4.954 4.954 0 0 0 4.94 4.94c2.716 0 4.94-2.224 4.94-4.94s-2.224-4.94-4.94-4.94zm0 2a2.926 2.926 0 0 1 2.94 2.939 2.926 2.926 0 0 1-2.94 2.94 2.924 2.924 0 0 1-2.94-2.94 2.924 2.924 0 0 1 2.94-2.94z" fill="#000000" data-original="#000000" class=""></path><path d="M50 44.617a4.954 4.954 0 0 0-4.94 4.94c0 2.716 2.224 4.94 4.94 4.94s4.94-2.224 4.94-4.94a4.954 4.954 0 0 0-4.94-4.94zm0 2a2.924 2.924 0 0 1 2.94 2.94c0 1.635-1.304 2.94-2.94 2.94s-2.94-1.305-2.94-2.94a2.924 2.924 0 0 1 2.94-2.94zM76.182 28.227a4.954 4.954 0 0 0-4.94 4.939 4.954 4.954 0 0 0 4.94 4.94 4.954 4.954 0 0 0 4.94-4.94 4.954 4.954 0 0 0-4.94-4.94zm0 2a2.924 2.924 0 0 1 2.94 2.939 2.924 2.924 0 0 1-2.94 2.94 2.924 2.924 0 0 1-2.94-2.94 2.924 2.924 0 0 1 2.94-2.94zM23.354 59.229a4.954 4.954 0 0 0-4.94 4.939 4.954 4.954 0 0 0 4.94 4.94c2.716 0 4.94-2.224 4.94-4.94s-2.224-4.94-4.94-4.94zm0 2c1.635 0 2.94 1.303 2.94 2.939s-1.305 2.94-2.94 2.94a2.924 2.924 0 0 1-2.94-2.94 2.924 2.924 0 0 1 2.94-2.94zM50 75.62c-2.716 0-4.94 2.224-4.94 4.94S47.285 85.5 50 85.5s4.94-2.223 4.94-4.94-2.224-4.94-4.94-4.94zm0 2c1.636 0 2.94 1.305 2.94 2.94S51.635 83.5 50 83.5s-2.94-1.304-2.94-2.94 1.304-2.94 2.94-2.94zM76.646 58.951c-2.716 0-4.94 2.225-4.94 4.942s2.224 4.939 4.94 4.939c2.717 0 4.94-2.223 4.94-4.94s-2.223-4.94-4.94-4.94zm0 2c1.636 0 2.94 1.306 2.94 2.942s-1.304 2.939-2.94 2.939c-1.635 0-2.94-1.304-2.94-2.94s1.305-2.94 2.94-2.94zM82.527 16.059l-2.129 2.128a1 1 0 0 0 0 1.415 1 1 0 0 0 1.415 0l2.128-2.13a1 1 0 0 0 0-1.413 1 1 0 0 0-1.414 0zM18.895 80.105a1 1 0 0 0-.707.293l-2.13 2.13a1 1 0 0 0 0 1.413 1 1 0 0 0 1.415 0l2.129-2.129a1 1 0 0 0 0-1.414 1 1 0 0 0-.707-.293zM93.99 49a1 1 0 0 0-1 1 1 1 0 0 0 1 1H97a1 1 0 0 0 1-1 1 1 0 0 0-1-1zM3 49a1 1 0 0 0-1 1 1 1 0 0 0 1 1h3.01a1 1 0 0 0 1-1 1 1 0 0 0-1-1zM50 2a1 1 0 0 0-1 1v3.01a1 1 0 0 0 1 1 1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM50 92.99a1 1 0 0 0-1 1V97a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-3.01a1 1 0 0 0-1-1zM80.398 80.398a1 1 0 0 0 0 1.415l2.13 2.128a1 1 0 0 0 1.413 0 1 1 0 0 0 0-1.414l-2.129-2.129a1 1 0 0 0-1.414 0zM16.766 15.766a1 1 0 0 0-.707.293 1 1 0 0 0 0 1.414l2.128 2.129a1 1 0 0 0 1.415 0 1 1 0 0 0 0-1.414l-2.13-2.13a1 1 0 0 0-.706-.292z" fill="#000000" data-original="#000000" class=""></path></g></g></g></svg>';
}
function loadExAppInlineSvgIcon(appId, route) {
  const url = generateAppAPIProxyUrl(appId, route);
  return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(url).then(response => {
    // Check content type to be svg image
    if (response.headers['content-type'] !== 'image/svg+xml') {
      return null;
    }
    return response.data;
  }).catch(error => {
    console.error('Failed to load ExApp FileAction icon inline svg', error);
    return null;
  });
}
function generateAppAPIProxyUrl(appId, route) {
  return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)(`/apps/app_api/proxy/${appId}/${route}`);
}
function generateExAppUIPageUrl(appId, route) {
  return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)(`/apps/app_api/embedded/${appId}/${route}`);
}
function registerFileAction28(fileAction, inlineSvgIcon) {
  const action = new _nextcloud_files__WEBPACK_IMPORTED_MODULE_3__.FileAction({
    id: fileAction.name,
    displayName: () => (0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_5__.translate)(fileAction.appid, fileAction.display_name),
    iconSvgInline: () => inlineSvgIcon,
    order: Number(fileAction.order),
    enabled(files, view) {
      if (files.length === 1) {
        // Check for multiple mimes separated by comma
        let isMimeMatch = false;
        fileAction.mime.split(',').forEach(mime => {
          if (files[0].mime.indexOf(mime.trim()) !== -1) {
            isMimeMatch = true;
          }
        });
        return isMimeMatch;
      } else if (files.length > 1) {
        // Check all files match fileAction mime
        return files.every(file => {
          // Check for multiple mimes separated by comma
          let isMimeMatch = false;
          fileAction.mime.split(',').forEach(mime => {
            if (file.mime.indexOf(mime.trim()) !== -1) {
              isMimeMatch = true;
            }
          });
          return isMimeMatch;
        });
      }
    },
    async exec(node, view, dir) {
      const exAppFileActionHandler = generateAppAPIProxyUrl(fileAction.appid, fileAction.action_handler);
      if ('version' in fileAction && fileAction.version === '2.0') {
        return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(exAppFileActionHandler, {
          files: [buildNodeInfo(node)]
        }).then(response => {
          if (typeof response.data === 'object' && 'redirect_handler' in response.data) {
            const redirectPage = generateExAppUIPageUrl(fileAction.appid, response.data.redirect_handler);
            window.location.assign(`${redirectPage}?fileIds=${node.fileid}`);
            return true;
          }
          return true;
        }).catch(error => {
          console.error('Failed to send FileAction request to ExApp', error);
          return false;
        });
      }
      return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(exAppFileActionHandler, buildNodeInfo(node)).then(() => {
        return true;
      }).catch(error => {
        console.error('Failed to send FileAction request to ExApp', error);
        return false;
      });
    },
    async execBatch(nodes, view, dir) {
      if ('version' in fileAction && fileAction.version === '2.0') {
        const exAppFileActionHandler = generateAppAPIProxyUrl(fileAction.appid, fileAction.action_handler);
        const nodesDataList = nodes.map(buildNodeInfo);
        return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(exAppFileActionHandler, {
          files: nodesDataList
        }).then(response => {
          if (typeof response.data === 'object' && 'redirect_handler' in response.data) {
            const redirectPage = generateExAppUIPageUrl(fileAction.appid, response.data.redirect_handler);
            const fileIds = nodes.map(node => node.fileid).join(',');
            window.location.assign(`${redirectPage}?fileIds=${fileIds}`);
          }
          return nodes.map(_ => true);
        }).catch(error => {
          console.error('Failed to send FileAction request to ExApp', error);
          return nodes.map(_ => false);
        });
      }
      // for version 1.0 behavior is not changed
      return Promise.all(nodes.map(node => {
        return this.exec(node, view, dir);
      }));
    }
  });
  (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_3__.registerFileAction)(action);
}
function buildNodeInfo(node) {
  return {
    fileId: node.fileid,
    name: node.basename,
    directory: node.dirname,
    etag: node.attributes.etag,
    mime: node.mime,
    favorite: Boolean(node.attributes.favorite).toString(),
    permissions: node.permissions,
    fileType: node.type,
    size: Number(node.size),
    mtime: new Date(node.mtime).getTime() / 1000,
    // convert ms to s
    shareTypes: node.attributes.shareTypes || null,
    shareAttributes: node.attributes.shareAttributes || null,
    sharePermissions: node.attributes.sharePermissions || null,
    shareOwner: node.attributes.ownerDisplayName || null,
    shareOwnerId: node.attributes.ownerId || null,
    userId: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_4__.getCurrentUser)().uid,
    instanceId: state.instanceId
  };
}
document.addEventListener('DOMContentLoaded', () => {
  state.fileActions.forEach(fileAction => {
    if (fileAction.icon === '') {
      const inlineSvgIcon = loadStaticAppAPIInlineSvgIcon();
      registerFileAction28(fileAction, inlineSvgIcon);
    } else {
      loadExAppInlineSvgIcon(fileAction.appid, fileAction.icon).then(svg => {
        if (svg !== null) {
          // Set css filter for theming
          const parser = new DOMParser();
          const icon = parser.parseFromString(svg, 'image/svg+xml');
          icon.documentElement.setAttribute('style', 'filter: var(--background-invert-if-dark);');
          // Convert back to inline string
          const inlineSvgIcon = icon.documentElement.outerHTML;
          registerFileAction28(fileAction, inlineSvgIcon);
        }
      });
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=app_api-filesplugin.js.map