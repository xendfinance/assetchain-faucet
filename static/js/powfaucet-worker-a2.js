/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/FaucetConfig.ts":
/*!************************************!*\
  !*** ./src/common/FaucetConfig.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PoWHashAlgo": function() { return /* binding */ PoWHashAlgo; }
/* harmony export */ });
var PoWHashAlgo = /*#__PURE__*/function (PoWHashAlgo) {
  PoWHashAlgo["SCRYPT"] = "scrypt";
  PoWHashAlgo["CRYPTONIGHT"] = "cryptonight";
  PoWHashAlgo["ARGON2"] = "argon2";
  return PoWHashAlgo;
}({});

/***/ }),

/***/ "./src/utils/ConvertHelpers.ts":
/*!*************************************!*\
  !*** ./src/utils/ConvertHelpers.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "base64ToHex": function() { return /* binding */ base64ToHex; },
/* harmony export */   "toDecimalUnit": function() { return /* binding */ toDecimalUnit; },
/* harmony export */   "toReadableAmount": function() { return /* binding */ toReadableAmount; }
/* harmony export */ });
function base64ToHex(str) {
  var raw = atob(str);
  var result = '';
  for (var i = 0; i < raw.length; i++) {
    var hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result;
}
function toDecimalUnit(amount, decimals) {
  var factor = Math.pow(10, decimals || 18);
  return amount / factor;
}
function toReadableAmount(amount, decimals, unit, precision) {
  if (!decimals) decimals = 18;
  if (!precision) precision = 3;
  if (!amount) return "0" + (unit ? " " + unit : "");
  if (typeof amount === "bigint") amount = Number(amount);
  var decimalAmount = toDecimalUnit(amount, decimals);
  var precisionFactor = Math.pow(10, precision);
  var amountStr = (Math.round(decimalAmount * precisionFactor) / precisionFactor).toString();
  return amountStr + (unit ? " " + unit : "");
}

/***/ }),

/***/ "./src/utils/PoWParamsHelper.ts":
/*!**************************************!*\
  !*** ./src/utils/PoWParamsHelper.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPoWParamsStr": function() { return /* binding */ getPoWParamsStr; }
/* harmony export */ });
/* harmony import */ var _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/FaucetConfig */ "./src/common/FaucetConfig.ts");

function getPoWParamsStr(params, difficulty) {
  switch (params.a) {
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.SCRYPT:
      return params.a + "|" + params.n + "|" + params.r + "|" + params.p + "|" + params.l + "|" + difficulty;
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.CRYPTONIGHT:
      return params.a + "|" + params.c + "|" + params.v + "|" + params.h + "|" + difficulty;
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.ARGON2:
      return params.a + "|" + params.t + "|" + params.v + "|" + params.i + "|" + params.m + "|" + params.p + "|" + params.l + "|" + difficulty;
  }
}

/***/ }),

/***/ "./src/worker/PoWWorker.ts":
/*!*********************************!*\
  !*** ./src/worker/PoWWorker.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PoWWorker": function() { return /* binding */ PoWWorker; }
/* harmony export */ });
/* harmony import */ var _utils_PoWParamsHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PoWParamsHelper */ "./src/utils/PoWParamsHelper.ts");
/* harmony import */ var _utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ConvertHelpers */ "./src/utils/ConvertHelpers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var PoWWorker = /*#__PURE__*/function () {
  function PoWWorker(options) {
    var _this = this;
    _classCallCheck(this, PoWWorker);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "workerId", void 0);
    _defineProperty(this, "powParams", void 0);
    _defineProperty(this, "powDifficulty", void 0);
    _defineProperty(this, "powPreImage", void 0);
    _defineProperty(this, "working", false);
    _defineProperty(this, "workNonce", void 0);
    _defineProperty(this, "nonceRanges", void 0);
    _defineProperty(this, "statsCount", void 0);
    _defineProperty(this, "statsPoll", void 0);
    this.options = options;
    addEventListener("message", function (evt) {
      return _this.onControlMessage(evt);
    });
    postMessage({
      action: "init"
    });
  }
  _createClass(PoWWorker, [{
    key: "onControlMessage",
    value: function onControlMessage(evt) {
      var msg = evt.data;
      if (!msg || _typeof(msg) !== "object") return;

      //console.log(evt);

      switch (msg.action) {
        case "setWork":
          this.onCtrlSetWork(msg.data);
          break;
        case "addRange":
          this.onCtrlAddRange(msg.data);
          break;
        case "setParams":
          this.onCtrlSetParams(msg.data);
          break;
        case "verify":
          this.onCtrlVerify(msg.data);
          break;
      }
    }
  }, {
    key: "onCtrlSetWork",
    value: function onCtrlSetWork(data) {
      this.workerId = data.workerid;
      this.powParams = this.getWorkerParams(data.params, data.difficulty);
      this.powPreImage = (0,_utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__.base64ToHex)(data.preimage);
      this.nonceRanges = [{
        first: data.nonceStart,
        last: data.nonceStart + data.nonceCount - 1,
        count: data.nonceCount
      }];
      this.workNonce = data.nonceStart;
      this.startWorkLoop();
    }
  }, {
    key: "onCtrlAddRange",
    value: function onCtrlAddRange(data) {
      this.nonceRanges.push({
        first: data.start,
        last: data.start + data.count - 1,
        count: data.count
      });
      if (this.nonceRanges.length === 1) this.workNonce = data.start;
    }
  }, {
    key: "onCtrlSetParams",
    value: function onCtrlSetParams(data) {
      this.powParams = this.getWorkerParams(data.params, data.difficulty);
    }
  }, {
    key: "onCtrlVerify",
    value: function onCtrlVerify(share) {
      var preimg = (0,_utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__.base64ToHex)(share.preimage);
      var isValid = share.nonces.length > 0;
      for (var i = 0; i < share.nonces.length && isValid; i++) {
        if (!this.checkHash(share.nonces[i], preimg)) {
          isValid = false;
          break;
        }
      }
      postMessage({
        action: "verifyResult",
        data: {
          shareId: share.shareId,
          isValid: isValid
        }
      });
    }
  }, {
    key: "getWorkerParams",
    value: function getWorkerParams(params, difficulty) {
      var workerParams = {
        params: params,
        difficulty: difficulty,
        dmask: this.getDifficultyMask(difficulty),
        pstr: (0,_utils_PoWParamsHelper__WEBPACK_IMPORTED_MODULE_0__.getPoWParamsStr)(params, difficulty)
      };
      return workerParams;
    }
  }, {
    key: "getDifficultyMask",
    value: function getDifficultyMask(difficulty) {
      var byteCount = Math.floor(difficulty / 8) + 1;
      var bitCount = difficulty - (byteCount - 1) * 8;
      var maxValue = Math.pow(2, 8 - bitCount);
      var mask = maxValue.toString(16);
      while (mask.length < byteCount * 2) {
        mask = "0" + mask;
      }
      return mask;
    }
  }, {
    key: "startWorkLoop",
    value: function startWorkLoop() {
      var _this2 = this;
      if (this.working) return;
      this.statsCount = 0;
      this.statsPoll = new Date().getTime();
      setInterval(function () {
        return _this2.collectStats();
      }, 2000);
      this.working = true;
      this.workLoop();
    }
  }, {
    key: "collectStats",
    value: function collectStats() {
      var now = new Date().getTime();
      var nonces = 0;
      if (this.nonceRanges.length > 0) {
        nonces += this.nonceRanges[0].last - this.workNonce;
        for (var i = 1; i < this.nonceRanges.length; i++) {
          nonces += this.nonceRanges[i].count;
        }
      }
      postMessage({
        action: "stats",
        data: {
          shares: this.statsCount,
          time: now - this.statsPoll,
          last: this.workNonce,
          nonces: nonces
        }
      });
      this.statsCount = 0;
      this.statsPoll = now;
    }
  }, {
    key: "workLoop",
    value: function workLoop() {
      var _this3 = this;
      if (!this.working) return;
      for (var i = 0; i < 8; i++) {
        this.work();
      }
      var tout = this.nonceRanges.length === 0 ? 20 : 0;
      setTimeout(function () {
        return _this3.workLoop();
      }, tout);
    }
  }, {
    key: "work",
    value: function work() {
      var rangeCount = this.nonceRanges.length;
      if (rangeCount === 0) return;
      var nonce = this.workNonce++;
      if (nonce >= this.nonceRanges[0].last) {
        this.nonceRanges.splice(0, 1);
        if (rangeCount !== 1) {
          this.workNonce = this.nonceRanges[0].first;
        }
      }
      var hash;
      if (hash = this.checkHash(nonce, this.powPreImage)) {
        // found a nonce! :>
        postMessage({
          action: "nonce",
          data: {
            nonce: nonce,
            params: this.powParams.pstr
          }
        });
      }
    }
  }, {
    key: "checkHash",
    value: function checkHash(nonce, preimg) {
      var nonceHex = nonce.toString(16);
      // pad hex to 64bit (16 hex characters) to prevent re-hashing the same nonce multiple times
      if (nonceHex.length < 16) {
        nonceHex = "0000000000000000".substring(0, 16 - nonceHex.length) + nonceHex;
      }
      this.statsCount++;
      var hashHex = this.options.hashFn(nonceHex, preimg, this.powParams.params);
      var startOfHash = hashHex.substring(0, this.powParams.dmask.length);
      return startOfHash <= this.powParams.dmask ? hashHex : null;
    }
  }]);
  return PoWWorker;
}();

/***/ }),

/***/ "../libs/argon2_wasm.js":
/*!******************************!*\
  !*** ../libs/argon2_wasm.js ***!
  \******************************/
/***/ (function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// THIS FILE IS GENERATED AUTOMATICALLY
// Don't edit this file by hand. 
// Edit the build located in the faucet-wasm folder.

var argon2Promise, argon2;
module.exports = {
  getArgon2: function getArgon2() {
    return argon2;
  },
  getArgon2ReadyPromise: function getArgon2ReadyPromise() {
    return argon2Promise;
  }
};
function getWasmBinary() {
  var base32768 = function (exports) {
    'use strict';

    /**
      Base32768 is a binary-to-text encoding optimised for UTF-16-encoded text.
      (e.g. Windows, Java, JavaScript)
    */

    // Z is a number, usually a uint15 but sometimes a uint7
    var BITS_PER_CHAR = 15; // Base32768 is a 15-bit encoding
    var BITS_PER_BYTE = 8;

    // Base32768 uses blocks of 32 characters.
    var blockSize = 1 << 5;
    var repertoires = ['ҠԀڀڠݠހ߀ကႠᄀᄠᅀᆀᇠሀሠበዠጠᎠᏀᐠᑀᑠᒀᒠᓀᓠᔀᔠᕀᕠᖀᖠᗀᗠᘀᘠᙀᚠᛀកᠠᡀᣀᦀ᧠ᨠᯀᰀᴀ⇠⋀⍀⍠⎀⎠⏀␀─┠╀╠▀■◀◠☀☠♀♠⚀⚠⛀⛠✀✠❀➀➠⠀⠠⡀⡠⢀⢠⣀⣠⤀⤠⥀⥠⦠⨠⩀⪀⪠⫠⬀⬠⭀ⰀⲀⲠⳀⴀⵀ⺠⻀㇀㐀㐠㑀㑠㒀㒠㓀㓠㔀㔠㕀㕠㖀㖠㗀㗠㘀㘠㙀㙠㚀㚠㛀㛠㜀㜠㝀㝠㞀㞠㟀㟠㠀㠠㡀㡠㢀㢠㣀㣠㤀㤠㥀㥠㦀㦠㧀㧠㨀㨠㩀㩠㪀㪠㫀㫠㬀㬠㭀㭠㮀㮠㯀㯠㰀㰠㱀㱠㲀㲠㳀㳠㴀㴠㵀㵠㶀㶠㷀㷠㸀㸠㹀㹠㺀㺠㻀㻠㼀㼠㽀㽠㾀㾠㿀㿠䀀䀠䁀䁠䂀䂠䃀䃠䄀䄠䅀䅠䆀䆠䇀䇠䈀䈠䉀䉠䊀䊠䋀䋠䌀䌠䍀䍠䎀䎠䏀䏠䐀䐠䑀䑠䒀䒠䓀䓠䔀䔠䕀䕠䖀䖠䗀䗠䘀䘠䙀䙠䚀䚠䛀䛠䜀䜠䝀䝠䞀䞠䟀䟠䠀䠠䡀䡠䢀䢠䣀䣠䤀䤠䥀䥠䦀䦠䧀䧠䨀䨠䩀䩠䪀䪠䫀䫠䬀䬠䭀䭠䮀䮠䯀䯠䰀䰠䱀䱠䲀䲠䳀䳠䴀䴠䵀䵠䶀䷀䷠一丠乀习亀亠什仠伀传佀你侀侠俀俠倀倠偀偠傀傠僀僠儀儠兀兠冀冠净几刀删剀剠劀加勀勠匀匠區占厀厠叀叠吀吠呀呠咀咠哀哠唀唠啀啠喀喠嗀嗠嘀嘠噀噠嚀嚠囀因圀圠址坠垀垠埀埠堀堠塀塠墀墠壀壠夀夠奀奠妀妠姀姠娀娠婀婠媀媠嫀嫠嬀嬠孀孠宀宠寀寠尀尠局屠岀岠峀峠崀崠嵀嵠嶀嶠巀巠帀帠幀幠庀庠廀廠开张彀彠往徠忀忠怀怠恀恠悀悠惀惠愀愠慀慠憀憠懀懠戀戠所扠技抠拀拠挀挠捀捠掀掠揀揠搀搠摀摠撀撠擀擠攀攠敀敠斀斠旀无昀映晀晠暀暠曀曠最朠杀杠枀枠柀柠栀栠桀桠梀梠检棠椀椠楀楠榀榠槀槠樀樠橀橠檀檠櫀櫠欀欠歀歠殀殠毀毠氀氠汀池沀沠泀泠洀洠浀浠涀涠淀淠渀渠湀湠満溠滀滠漀漠潀潠澀澠激濠瀀瀠灀灠炀炠烀烠焀焠煀煠熀熠燀燠爀爠牀牠犀犠狀狠猀猠獀獠玀玠珀珠琀琠瑀瑠璀璠瓀瓠甀甠畀畠疀疠痀痠瘀瘠癀癠皀皠盀盠眀眠着睠瞀瞠矀矠砀砠础硠碀碠磀磠礀礠祀祠禀禠秀秠稀稠穀穠窀窠竀章笀笠筀筠简箠節篠簀簠籀籠粀粠糀糠紀素絀絠綀綠緀締縀縠繀繠纀纠绀绠缀缠罀罠羀羠翀翠耀耠聀聠肀肠胀胠脀脠腀腠膀膠臀臠舀舠艀艠芀芠苀苠茀茠荀荠莀莠菀菠萀萠葀葠蒀蒠蓀蓠蔀蔠蕀蕠薀薠藀藠蘀蘠虀虠蚀蚠蛀蛠蜀蜠蝀蝠螀螠蟀蟠蠀蠠血衠袀袠裀裠褀褠襀襠覀覠觀觠言訠詀詠誀誠諀諠謀謠譀譠讀讠诀诠谀谠豀豠貀負賀賠贀贠赀赠趀趠跀跠踀踠蹀蹠躀躠軀軠輀輠轀轠辀辠迀迠退造遀遠邀邠郀郠鄀鄠酀酠醀醠釀釠鈀鈠鉀鉠銀銠鋀鋠錀錠鍀鍠鎀鎠鏀鏠鐀鐠鑀鑠钀钠铀铠销锠镀镠門閠闀闠阀阠陀陠隀隠雀雠需霠靀靠鞀鞠韀韠頀頠顀顠颀颠飀飠餀餠饀饠馀馠駀駠騀騠驀驠骀骠髀髠鬀鬠魀魠鮀鮠鯀鯠鰀鰠鱀鱠鲀鲠鳀鳠鴀鴠鵀鵠鶀鶠鷀鷠鸀鸠鹀鹠麀麠黀黠鼀鼠齀齠龀龠ꀀꀠꁀꁠꂀꂠꃀꃠꄀꄠꅀꅠꆀꆠꇀꇠꈀꈠꉀꉠꊀꊠꋀꋠꌀꌠꍀꍠꎀꎠꏀꏠꐀꐠꑀꑠ꒠ꔀꔠꕀꕠꖀꖠꗀꗠꙀꚠꛀ꜀꜠ꝀꞀꡀ',
    // length = 1 << 10
    'ƀɀɠʀ' // length = 1 << 2
    ];

    var lookupE = {};
    repertoires.forEach(function (repertoire, r) {
      var numZBits = BITS_PER_CHAR - BITS_PER_BYTE * r; // 0 -> 15, 1 -> 7
      var encodeRepertoire = [];
      for (var i = 0; i < repertoire.length; i++) {
        var charCode = repertoire.charCodeAt(i);
        for (var offset = 0; offset < blockSize; offset++) {
          encodeRepertoire.push(String.fromCharCode(charCode + offset));
        }
      }
      lookupE[numZBits] = encodeRepertoire;
    });
    var lookupD = {};
    Object.entries(lookupE).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        numZBits = _ref2[0],
        encodeRepertoire = _ref2[1];
      encodeRepertoire.forEach(function (chr, z) {
        lookupD[chr] = [Number(numZBits), z];
      });
    });
    var encode = function encode(uint8Array) {
      var length = uint8Array.length;
      var str = '';
      var z = 0;
      var numZBits = 0;
      for (var i = 0; i < length; i++) {
        var uint8 = uint8Array[i];

        // Take most significant bit first
        for (var j = BITS_PER_BYTE - 1; j >= 0; j--) {
          var bit = uint8 >> j & 1;
          z = (z << 1) + bit;
          numZBits++;
          if (numZBits === BITS_PER_CHAR) {
            str += lookupE[numZBits][z];
            z = 0;
            numZBits = 0;
          }
        }
      }
      if (numZBits !== 0) {
        // Final bits require special treatment.

        // z = bbbbbbcccccccc, numZBits = 14, padBits = 1
        // z = bbbbbcccccccc, numZBits = 13, padBits = 2
        // z = bbbbcccccccc, numZBits = 12, padBits = 3
        // z = bbbcccccccc, numZBits = 11, padBits = 4
        // z = bbcccccccc, numZBits = 10, padBits = 5
        // z = bcccccccc, numZBits = 9, padBits = 6
        // z = cccccccc, numZBits = 8, padBits = 7
        // => Pad `z` out to 15 bits using 1s, then encode as normal (r = 0)

        // z = ccccccc, numZBits = 7, padBits = 0
        // z = cccccc, numZBits = 6, padBits = 1
        // z = ccccc, numZBits = 5, padBits = 2
        // z = cccc, numZBits = 4, padBits = 3
        // z = ccc, numZBits = 3, padBits = 4
        // z = cc, numZBits = 2, padBits = 5
        // z = c, numZBits = 1, padBits = 6
        // => Pad `z` out to 7 bits using 1s, then encode specially (r = 1)

        while (!(numZBits in lookupE)) {
          z = (z << 1) + 1;
          numZBits++;
        }
        str += lookupE[numZBits][z];
      }
      return str;
    };
    var decode = function decode(str) {
      var length = str.length;

      // This length is a guess. There's a chance we allocate one more byte here
      // than we actually need. But we can count and slice it off later
      var uint8Array = new Uint8Array(Math.floor(length * BITS_PER_CHAR / BITS_PER_BYTE));
      var numUint8s = 0;
      var uint8 = 0;
      var numUint8Bits = 0;
      for (var i = 0; i < length; i++) {
        var chr = str.charAt(i);
        if (!(chr in lookupD)) {
          throw new Error("Unrecognised Base32768 character: ".concat(chr));
        }
        var _lookupD$chr = _slicedToArray(lookupD[chr], 2),
          numZBits = _lookupD$chr[0],
          z = _lookupD$chr[1];
        if (numZBits !== BITS_PER_CHAR && i !== length - 1) {
          throw new Error('Secondary character found before end of input at position ' + String(i));
        }

        // Take most significant bit first
        for (var j = numZBits - 1; j >= 0; j--) {
          var bit = z >> j & 1;
          uint8 = (uint8 << 1) + bit;
          numUint8Bits++;
          if (numUint8Bits === BITS_PER_BYTE) {
            uint8Array[numUint8s] = uint8;
            numUint8s++;
            uint8 = 0;
            numUint8Bits = 0;
          }
        }
      }

      // Final padding bits! Requires special consideration!
      // Remember how we always pad with 1s?
      // Note: there could be 0 such bits, check still works though
      if (uint8 !== (1 << numUint8Bits) - 1) {
        throw new Error('Padding mismatch');
      }
      return new Uint8Array(uint8Array.buffer, 0, numUint8s);
    };
    exports.decode = decode;
    exports.encode = encode;
    return exports;
  }({});
  var base32768WASM = "Ԑ茻䙠Ҡҭ䙄圠ᓿ星暿鉠乗鹣ҥꔂ꜀ᐿ藿瘯虦ҳ꒼ᑾ虤星䗟虬ҷ鹣ҭꗾꙀ噢䘟陏陦ҳ꒰߀Ꮏ敠㹁㘏蹇陫ꐠ⣾ꜟ星晸Ҡᯀ⪘ᨱ晨ꜟ星暿鉠幇驐ᨽ晦ꜟ敠㹀噀㸦ԋ꒽ꗾꙁ昐ᆟ闯鹗ꊘᨽ晠ᅟ噤䘟陏鹗ꊛꊥꗀ⺿星蘿陏鹗ꊛ꒽ꔂꙃ䏝Ҡ曀㙐㹨Ҭቲ⠆ݡᄢ蚡暀◘䙀Һᒈ⎠ᕀ曂Ԁ◀㚄䩆ᛃႣ曤蛠䙐䙐㺔Ҡ㱗ቢ暼Ԁ皰亐ᖆұҨᒄ暿蚈䁊籠◌㔨▦崒膻钯㙠ڛ᧩甾钒嘔㺜鍠ᔐ憣᧭眞螒Ҽᴗ鉍㴦䦋濵浈藆愗㼝ⴍ鵅ꉃᣉ缪Ⴀᦏ肻玎泶⥣䰩灠㽉怚㺘鏊屷妈ߔ㼦髁堕竹哎浗㥨ߐ㬦髁堕皻⻍鲐ᆘ䩨በ条ᣂሆ䴦蜊苀ⲫ湦Ⴃ旰Ҩڍ䡐㹒ҩҤ暀Ұڜ躀嵴亂ݠݢᓱ䣆暨ڈ㙄蛈ᘀڂባ䙐ݨԅ癠ሐҠ晢条孰暨ڈ㙖睰⚤⎂歭ᆐݨک㜐ژ器㱄暀ᇠ杲䟠በ䁈㟬橨䙀䫆晨Ҥ㙠䁁Ҩ晢占ҽҠᖀ䡀✈Ҥ驠ᄀႰڋ䙀䧠ұҨ晢占ᆝҠ詠㩐䦑ᖄ晤杤孱ݨݩ眰ژ噬㲀ԁႦݢ詠ተ㚘⚠晦柜廱Ⴐ幠ᘐ蹡Ҩ晨枠孱ᄲ蠀ԔႠ☠ጰበ䅁ҨڄҲ晰㜘ᖈ䙂㙀灠杦蚀杠☠ጰቬ䅁ᒈڄҲ晰朸ᖠ䙂㙀灠棦蚁䝀☠ጰቸ䅁ᯈڄҲ晰霸ᖸ䙂㙀灠橦蚂Ⴀ☠ጰዤ䅁⚨ڄҲ晱䜘ᗐ䙂㙀灠毦蚂蝠☠ጰደ䅁⪨ڄҲ晱眸ᗨ䙂㙀灠浦蚃杠☠ጰዼ䅁㕈Ԉ㩆罨ᘀᘂ曋㝁□倁癠纹Ҩ晨畭ҡ癨ڄҲ晰ߘᖀ䙁䛂䃈䙤Ԅ◃仨ᗀᗉ⋀ᑂ詠䡀䂈㝀⋀䙂㙀熠ҧ䙀Ⴀᛄᑔ䝁㙁㚀厤䙢Һ䉴Ҷ⤠ҥ裠暠幐㨰⚠晠佣幱Ⴔ♄ڂҡ䩍隠ԈႢ☠䩀Ꮐ㞡▩綸ꋂᐫ花䛈ደቨ栌橤䩀䛿溠䚈በݡ劔ڀԀᄀ樺満㡀ᄠ☠䡀ځރ榠ᖀ䤐ڹᖄ㲀ጡ◕⚠ᖀ㡠䁈ᄘ䁂䙀㩁Ⴈ䙤Ң晱囤ᖖ䙀䝿琠鑤Ңҩ繩皠ԀᏐݨԍ愧蠘㐡ᑾ㕋㙂盠嗤㚒ҡ䙈◢ᄀҴݢᖠ䙤Ⴀބ⎀䡄书晨ݤڗ轰㛀ᗀᅋ粌榠ᖀ㡀䭻令ᖖ䙀㙁⻀獤ҢԉҠ癤劂Ұښ鯯槐䈁Ҡ晢畤䙐ڐ䙭塠䀐Ҡ㲀ᒋ蟥ݡ噁鹂㹂┠ߖ䡅㡀□◿ꡟꡟꡜꙆ䝌㙁□㛨乨ᖄቢႡݠ昡溢橠䩯ꡟꡟꡞ旣㝆盨㝄㜢Ԃ♢㞎桟꜠芨䜠䩀㡁ҩᗡ♇䜿Ꞁ咄䛔㘿ꊥ糣Ꮐ文杰ᖀ驿ꡘᦍᒃھ䯆暢詠㭂Ҳ⪟ꡟꡟꡟꡟ虰墀聴ቢႡݠ蛟Ꞁ⢄ޔ㩄ቢႡ߀ꡟ晴䦨皤Ⴀ⚪Ⴁݠ暠◁ᖡ䜀㚙ҭ䚀ᗂꡟꡟꡟꡟꡘቬ橤棠暠䙠㙘㘿鹢盠ᘅݠ暠䙠㹟ꡐᏈ鍴☠䙄䞀䙠㙐▢ᖡᖨ晦䝁ᯁᑈԄޔ㩄ቢႡ߀ꡟ暁囪ڄႠ☠⎨癤䙡䙠㙐▨⎧ꡜڂ⡂Ұ暣ڡ塠硴ቢႡݠ蛟Ꞁ㛄㛤㙁ᖄ㹄⤠ᆐݰ癰▨ᖄᒃꡞݥ梈Ⴐᖀ㡀芁ᖉᖀ䝁㙁㩁▨乨ᖄቢሁꡟҰ棣ڡ塠硴ቢႡݠ蛟Ꞁ㛄㛠虰勠ጠ⦤乢㙐晤㙐虰勠ᗀᔄ乢㙐晤㙐虰勠㳅ꡟꡟꡟ蹋ڄႠ㭇䙀邀ݰᓈԄߒڪ曨⫶龀ᒠ柽㯯烒㙲ᖽ粀ᴁ▰ᆚ誀衠侨⺠橺梀橰槨ޅ㙵Ⴈᖬ晤楟ꡟꡟꡇ鯀蹡ҵᏀ醀ᆐᒈڤ߂ڢ曨㙶龀ᖠ柽㯯烒㚂ᖽ粀ᰀᒐቺ躂⍂◑Ҵ硦溁ᯐᄪ䚨ተ㺙ҭᖟᰂᦁ䙠䘟靘㽐☠Ꮔ䛈㝂䗈桤ޔ㝄䛈䲀ᄢꡟꡟ衐墀⪓雨䓄䛆㝈湠䩀乇蝰勠䣩厀Ⴐᓐ號ꡟ黜⭈䄼䡕㙂▤阯梁⚠坨䕌䙃䝘袁ᗂ䩯ꡟꡜ䕆䡃㙀藿ᗂ桠齠枲胤䛆㙇盨㝐渢㚹Ҩ晼棠晢䝈柯袁坠嫠䴼ꋂ⎰ᘐ橱ᖨᖄበ㝈䡂㙀藿ᗂበ㽀㠹麤㢂㚃䕈楏桰⚠䋀㤔䙆宀ꡟ虭塰噲ݠᗀᗾ㝌▣ᖂ幇蝰㛀圉厀ተႨڤߗ驁▱厺ꋀႰᒟ痤ڂԁڄ暊笍㙈湥⣕縧蝰㞚腘䙃㙆䗈曄Ԃګꂐ橤䙃傶盨㜄Ԅ㝄䡑麠ᖠᄁ◁痤䙢Ԃ礕麠ዠႰᖈጪ鄲ڱڙ侺䙎㙈㯫嗯檂ᖱډᗁ☤摱ݵ簏桠㝀☠䒀㪔糰ᕈᑪ鄷詁▩厺ꋂዡ䙠㙐▨ᯀቭ䛊ᗀ㙃㚀厤㚠虨勠㳄旨㛁湡◠㺢Ҳ⚞㝈䝄㙁㛀圤Ҵ㠼䡐桤䙋䝀蟨䞤ԒҪ▦Ⳉ䝁ᣐᆐ晟陴隂ݠ㫅ݠ暠䙠㹟ꡐᖡᖩᖀ䝁ᯀ椠瘤ڤ▢噱ݢᄀᒵ满躐Ҵ麂ႨڂႬᆅ湡了⍂ڙҤ晬桟ԕ☡桠衠偩ᇨ晤䙄㙃ᖁ橠穱ᓑԌ晢䙇▧湡䩀䡀䝀䊀䒀ញᆘ□䭠姨䡐ᄪ肠ញᆐ□䭠坨䩡ᖬ晪佣㩐ᄪ䚣◢▩Ҵ硦ԁႰᄪ䚡߀◹ұᨿꡟꡟꞏ雄ڪ遱桺▶䙊桰棨ᅊበ⠐ᅄ晢棠暠䙠㙐▨ᕺ櫍⠈暀ᛐݰ暏梀⚠⛲腘䝊ᯀ椨ᅄҴ㩄ቢႡݠ暠䘡囪ᗐ䡁Ҩ桢⪡ᣐᏈڄԄ㙌㐰橢䙂傶蕨䞁塠Ⴀᙜᯀ䙀㙅㐀蝤ڔ㕀ᇨ湠⩅ᖁݿ褏袐ቬҥ粤ዤҰݨԈ㹀☠ݤጠԉᇬ㛾庿❙ⳝ瘣屡ខᖐҪ䚪ᖮ蘴䆪꜋鴡㘂溣䩀Ꮠ䂂⡿塓耢潍䛦限硰潠ބ⋀椱椭扞聒滝▤㫄㪀ԉᆜ◡橠Ꮠ㿁ᖐ晠佣㩐枨ҥ㙲Ⴈ䋀ڒᒘ㛇■ក坢☙Ҡ硦◁☰Ҫ䚠ተ職渗遑䯧ꗓ辿誁檊藦瘲蘽挗䑐橰緙鄊崦樎跖ꚡ❁䡤蓓虜踬㧨ڂ㡃䙐ᆈᆄݢҩҭቬ骂ᄀ顤ⵅԀቨ㐑窲ᒀ㙃▣痯梀媊☢㢄☜㝆䞐歱㡡䝀䀰晢䙂䜦ᖚ歠䙄▻砈硦ڼ㝃■䩀䩛䛃伀ᖀ杣悕⡀虤ڲݱԈ晢䙂䜘ᖚ歠䙄▻砈硦Ԁᔐᑟ㗄䚸偱ዤ橴ꋂ␂盪㝤䛲ԛ顐檊䙊椁⫢䪁䡀驁◨晷ᠢ߄满闤ҲҲ╀䜔乢Ԁ朽ⵅ㙰ᕡ◘晢䙂䜢ᖚ歠䙄▻砈硦ԀተᖈᇤҲҲ⎠䜔乢Ԁ朽ⵅ㙰Ⴀ㛀䔸ꋂጢ盨㝤䜗蝰呵ᗑ⛂▰Ⴟ㗄䚂ڬ㭈蝲䡖椁◂䪁硠⚠⚦麀邈Ⴀ㚀铭䣐㹁Ҵ暆䙉㙀湠溗Ⴆ瞠□ቦ髊㫁晨ބႷ詁▶⢄䛉㝄蕨桐窂檩◼晪ꌜ㝂湢圈䥈潰䫀䔸䡘摱ᕈတ窂檩▼晼ꋀݰݰ揢⍂晰Ⴄ⎈邉ᆀ䕈栤ߘ偱梄橺䙏摱ᙈတ窀⬉ᖜ晢䙂䜲ᖚ歠䙄▻砈硦Ԁᘐڈڈ䑁ᓑ䙈ݢᓴ孴朠ᖀ桠坠䡕ᗡ⛂ᖐᒟᗀ桡䩪▦㢄⇼摱Ꭱ交☲㛉ډ麤⫠ᓂ盪㝤䚢ڋ顐橾䙑椁⫢䪁㡀詁◨晭ᠢ߄溡橠㡀㡎隡窰በ䛁荺殀噢ԁԈ晢䙂䜬ᖚ歠䙄▻砈硦ԀᏐᑈᑏ梀你桵ᖃ⛂ዾ䕈枰窂ᗉ◍麤⫠ጢ盪㝤䚂ړ顐檂䙋椁⫢䪁䡀詁◐晩ᠢ߄溡ᖀ㡀㡎皡窰በ䛁荺殀噢ԉԀ晢䙂䜨ᖚ歠䙄▻砈硦Ԁ⦰ᰁ亠㻒㙩ڕ齘䡈椁◂䪂╢㛡Ҷ⢄仩㝂湢㗏梀罠桵ᗡ⛂ᖐᛟᗂበ劊▦㢂កᇠ暺檠婰袘婠㲀ԀᣐҪ䚠◲ݴ㬜ᯀ䙀㙈湠ក囨你瑴鑦◀Ұᕈҥ㙱ᖩڂ⡮ᒐ㙀▣橠Ꮠ㼄㫀㽊嵣⪰ҨငҢ湹ቴ晵ភᆐ■ᖀ硠ᄨⰂ⡀✥䇁灨Ҥڂҡ䩌蝪䙍棻本ᖀበ坠ބ⇱កᗂ琠赤Ҵ⪠ᦈ湠⤸ݠ蘨虨㝆罰☰ڀዠһݣᖀ䡀❐◀晤乢ᰀ晨څԀ桬Ԁ癤ұҠ⋈ڈ㝆瞀ԍ遢ᅞ㙀■䩀湂ұҭꎘ䙃䝐䡈暤Ҵ㝄䛈⚜ꋀᇡ晟ꡟ靘㽐⭀Ꮕꡟꡟ橀誠㸢㙪☢㚀ᒠዿ䕈曈䡈橁Ҥ晤ꔠᇡ晟ꡟ靘䈡▥ᗁ☜䇁桨Ҥڔ㸿ꡟꔟᒠށ◁盦隐ښ晤ᑼጠ㙁盐Ү㚄Ⴀᘀ⋂曊紣◠溠ተ☀ᖬ晦歭Ұݨڵ碀䩱ҥᔀԀᇵ釂㛄㙢ҩҲ⬂Ⴋ㙀■䴠噢ҡҨ鑦▫齡ݠ癀㸠㡁ҩ⠚ԀҰڎ晠በႠ❈橦条寰ڎ晠በ㡈ⴄ䁀䙀㙀瓠ڄҢҩ蹠ጠᓁᇵ湠䶀ҢҺᖉ粠ᄚҠ■満髰蹡Ҡ晢恠ᆐߐ䛍塠➐Ҡ晤杩䫆晨Ҩ㙂ң卤⎂䡄孱߈Ԉ䘰⦪ᯆᛈ☌㝀珠晤Ԓұұ糢ꌑ㝂䃈暨㚆罠ᙘᖀ䙄䛄碣䙄Ԓҩ繨㚀ᒠݻݡᖀ䩐榹Ҥ鉤Ԁᄀ楺詠㦠㙁ұዲ潭Ұ߈Ԇ蚁杠⭀Ꭼቴ㙁湠䴀䝂ҹҤ鉤⫠ᄀ橺詠㦠㙁ҩየ醀ݻݠᖀ䩑榹Ҥ鉤Ԁᄀ浺詠㦠㙁Ұ晦杤开汼檠洒㙒ᘁ㡚Ԁߖ眀噰□ᕱᖔ晦䙄孰暠蹤Ҳԉ艬嚠ᄀᏛ朤ᖀ㡀倘⫠晢䙅䇁晨Ԉ㡆睨ᘀᘂ䚫㝁㚇迁癠纹Ҡ㷊⚢ዿႿ諀ᖟң勨㪈Ԁዡ晟ꡟꡟꡟꡜႦ䝅ᄀݰᖀ㭂㚉ҩᨿꡟꡟꡟꡟ陨㽐㽊Ⴁݠ暠嚟ꡀ╴㩄ቢႡ߀暠䘕ᖀ譡肈㝀晦桠佰ᄰ癰▨ᖄᒃꡞڽ㝄㛠㙐▨ᖆቢသ粀ᖡ䙠㙐▨ᯄቡꖢ䅍ݥ湢䩀誈ᖄቢႡ束꜠㭈߈乨ᖄቢᆁꡟԈ洱䛈በ㡔ቢႡݠ㚂◡ᖀ㡐㺠◌晦皀ᐡ䙠㙐▨ᯇꡜވ䙅䞀䙠㙐▬▟ꊡ䡶此䙐Ⴐ癰▨ᖄݢ◢ᖌႥ湠䩀誈ᖄቢႡ束꜠䞡⠀橤㩄ቢႡကꡟ晨ڄҲҼ㫀ᗀᘅ䞀䙠㙐▨ᖄሾ⤈皂ᘍ溡◠በ⚠䪬桦⪢ᣐ߈ވ乨ᖄቢᆁꡟڂ蝴ᇠ㡀⚠䁑䙈暀ᆐᅁ◠ក蹱Ҥ晧ᒡᆐݨݰ塰䚠◌晦䙅梈㞃䙄Ҳ▹Ҩ桨⪡ᣐ߈ԄҲҺ盠⡀ᴖ㙂湡炃墀蜹ᖔ晨䙂㙆⍨杨噟ꡟꡟꕿᒡᒐݨݤ߁罰䍈蝱䶁ꡟ暼䩡塠桱梂瓣ꡟޘ滢伀橢ڒ┠ߔ䙅㙃□䩀衠壡◄嵒䙉䛃䍫嗴颀灨搌䙌䙊㫁聨䜄ނ湻ݤ⢂㙠ᘵ溢䞤ҲҹԐ岢ᒠᔡ晟ꡟꡟꂜ⭄◠⥅ዠ▢溚Ҧ睠⭀◠ᒠተႴᗁ堗潠卤ⲩ叜秱ᑐ䠭坠塨曠㴖䝋㙅⡀酤㚂ڑ䩍䚂ᒋ㙂㛀霤Ԕ㠬䡑ᛁݠ暠䙠ݰ桰㝀㽈⎬䙅䝞袁ᖠ桠䁐㑘桢䙇㙄䞈䚠䩂ډԍ⪺Ԁᘐᑚ誡婿鹢剱ݤԁᄁڈ䙡晰罠佥ߖ䙁㙁㚠Ԅޖ绠㻀㫂囊㙀湠橡坠齠伄⇠䙊㫁癨ᄥ㙴檂□䮛ᖡݰᏊ䚧ተ㚙ұᛁݠ暠䙠ݰ桰彠㭈⎬䝆ᄀ■躠ថ䡂■桦桠㛂■䩀躲ұҾ⤈癭Ⴐᆈԏ硰你䋀ᚺ䙁㙃㯫嘄䚄㸿ꡟꡟꡟᇫᓀ䩁䩒ᓑҴ晨䙅㙂□⠄䛱舩ԍቬ鬍撳皣⺤䛱ԑԄ晶醁ᘐᏊ䚥ተ䝀伄ᴀ䝅ᯀ椨Ԅڧ蝰㫀ᐩ厀Ⴐሟ㗄䚄㩄ቢႡݠᗁ穣䙄ڔ㙌⭀☤旦㙂盠坰溢◉ԅቢ邁ᘐႰ暑ተ䚙ԁᛁݠ暠䙠㙐▘㽈ᘀ㣃ꡟއႰᖀ㩨ᖄቢႡ束꜠䝈䛈䙂▸噤㳂ԁᣁ㙈ᄈ㙄皂ݠ㢂⤌ݥ湢溂⍂ԉҰ晲桟ԕᖁ橡䡀你㝄ጠ✋▧湢殀噢ڑ䩌䚀⠩ᆌ䝐晪儸䝈㫀㪒ᒈ㛂ᑈݨ䨘坠㭈⎱ᖢႰᅉ躀鵲㚊ᖑ㶚ꋂᆐݵ㯤ڄ㙜䝋ꡟꡟꡟ癀詡愴㟄䁐晣ᗼ㛂ݰᖁ㩐䡰㝀晨䙃䝀蜨暄ԗ蝰⭀ᐩ叜㛂ᒀ䞤ݴ仈ᖬ㲀Ԁᆛ朠ᖀበ䟸⫠晴桐ԕ⚠ᅏ蚀㨸ᨸ池杰寱߉ҤҠ㨱ҥ⠈暢Ҧڂ詠塠⚠ᛄ敊䡂忰ݺ誠儴㙁ҩ璤ጡ軠䃄߄Ԓ湸䝊Ⴁݠ暠噠㛨䀨ҩҩ綺梐榞■亐▨ᖃ蠦胤䛆桰杨ڥ㙰ڙ艬ڀԀቻ朢ᖀ婱ᓑ㙀㸲Ⴂᇿݿ諀ᖑᓙ▴湠Ꮎ㙀閨曈噟ꡟꡟꡟꡟځ滠溰▨ᖄቢҰꏢꡟꡟꡟꡞꡘᅀ☠䙂䝞䟈䛄Ԅ㙤䝊Ⴁݠ暠䙠┯朠◹ҩᛁݠ暠䙠䕟陥皂ݠ⋄拦㛂■躠滤㩄ቢႡ߀ꡟ暁ᆀ㛲Ҳ晱ݤҬݥ湡䩀䩠Ⴀ㓝瓢䚪㙁㛈㝔鳒Ҳ⠂ႡҰ偭满溆㳡ԑҴ硦ԁተᄪ䚡ᖨᖄቢႡ晠椀覞Ҥڦ菊♢Ⳉ⤡ႰҨݦ隐Ⴀݠᗀᓂ暠䙠㙐▨ᖃꔎ☎ᒈ㙂皤ⵄ晠肘ᖉꕀԀݻ朼ᖀበᄠ♐晠乢ቱߚ鯦隗杠ހᖐ䝂ᄀ■偡癢ұҭ綸䙁処晨ڤҺ憱ᖈ㲀ԀႻݺᅔ霠◛ꊩڀڅ⋀■◁⍒㙙ҡቨ醈Ⴀ☠亏⎲㙃令⠄暀ހ暼䟠በ⠈㐅⠚ᄀᆐߊڀዠ⥙▭ᓰ䱨Ⴀ㢃䙤Ңҫ令ݣ抆㩁Ҩڨ隤Ⴀᛇꔂ獤䙐ߊځዠ㝀ᛄ⎌䡄䛁荰恤贄圱Ҩ晦乢ᯑڑ曨ᖚ枒⍀犰በ䛿□㔮㦠㙀噬㲀ዠݻݣᖀ㡀㟰◀㹄⤠ᆔݦᖠ蚄Ⴀ⭀ᴐቬ㝀砡▤Ԓ晰䛈ᗀᄖႦ■䩀䦠㚀噤㱄暀ᇠ歺檠䣀㙁▰䁀䙃䛈䃈暥ԀႰ㙴ݢԁݦڂ蛈በ㝈䋀◤ᄡ⠵☠歠䙂㙠婠晢杰孰曨ԅԁႰ㙴Ҷ䙇䛀⻀晡塠墈婤ᘀ䙃㩁⎨暨㙧䡎蜁窤ᖨႠ■輠橢ԁҤ鉤Ԁݦ暰寤詺螑䙈ݢꔠᄛ芭暠߀㺙ҹዠ杴㙃⠀桤Ԕ圻仠Ꭼበ㙀瞣䚁塠⚠㼘ᖰ䙃㩁ᖈ暠橢ҩҨ鉤㙠Ⴐڍ暣ޒҹ䙈交ጥ⋀湠䩀䦠㛡Ҩ晢屢⪦ڂ詠磠㙡▥ቦ鞡ᇣ榠◖Ꭲҡ繨ڀកހ藼䴀䚂ҹҡቢ颖Ⴂ■ᖀ崂ҡ繨Ҿ⤠ᆐᄳ蠀በ侠▰橢条异榠ڈበ⠈➅⠈暡虳⠀晤ڔ嚂Ⴇڌ䙃䅁Ұ峤詻䝱䙈ڀڪ㝀⻀晤ԒҢᖅ諌ቤ㙁盏ᙅԀዸ婭ᓠ䲁һݠ◗棄□繨Ҿ⥁葳⠀晤ڔ嚂Ⴆ麬䙃䅁Ұ層詻ᄑ䙈ڀڪ㝀⻀晤ԒҢᖅ諌ቤ㙀■鎤ң噰Ԝ㲀ᄡ折湠ⵄ㙀㡁ҥᕾᄭዠ□䭀䛂㙑ҥቦ鲂ዠ朽◚Ꭶ碐軠ᗀឈႦ☠传橤ⵁ㽆皬乢Ԁ藨ݮ鵳噰Ԑᖖ䙂㙀珠柤Ҳұ繨㙘Ⴋ㙂灠楤㚠㡁Ҵ晪乢ᯑڑ蛨በ侠◀橤栘㥔ݠ⛃䡀㝀ᙘᖘ䙁㙁⻀条晰繲ݠ⢂㪪㝁⠀晤䚀蹡ҵዠ邂Ⴔݠᗀ朰ቨݤቸႫᇠ■檀顠䝐ᛄ伴䡂㩁Ҩ曡癢Ҫᗁ窢ዠݴݤᗀ朰ڙҽበ屢ҥ湡漁癠㡁Ҵ癤䉢ᄀ曽◛Ꮖ睰㛠ᖀ䙅䥂㙈ݤҳ噰ݠቺᄡ米㚫ᙅԀቫ黠ᚮ鞖Ⴀᒀ柄ڤ☢ᗐ晬乢▰ᄱ槍䡀❐■晢歭ݥ湠䩀觀㜁Ҵ癤㙢Ⴂ㙈Ԅԃ噰曠ᗀᄖႬᑈޅԁ䝐⚴䁀䙁㙁⻀棤Ԃҩ繨噶䙃㙀㚀咦蚀䝀ݠ⍴䙀䅁Ҩڨ䈂垠□㑚ᄡ繳■⍠䙀麹Ҵ晢柞廻ݡᖀ塠ቨ᧨鉤ᖠҰߚ橠ᓠ㙀勠ݣꙁ䳂㙈Ҩ㙷坰ᛄ⎈栰㥵◠ڏ驺枑䙈ڄጡݰڝᗀ㵔亂Ⴆ皬䙁㙁䋍暠በڠᖬ晠乢ᖅ溠橠በ㿰◀晤䙃䅁ᒈڤң噰因ᴀዶႤᕂ躃顰㝀Ⴇꡟꙇ䳂㙈Ҩ㛇坰ᘀᏃသ䗵㚄㔈㛇⚰᧰橤䙂䜀幧鎨㝇塨㠄橤骂ተႰ噰ဖ硨根ቤ鞂ዺ㚃锤Ҳҳ滠⚄醂ހ暽ᖀበ⠈簉鋢ᅑ往浺檀䛲ҹҨ鉤䉠ᇡҭ蚢በ㡈➑ᔰ今㛀曰ڈԄቭ囸癤Ԃዠ暨ڎ梀懪㩑ݣ劆㙂□钦蚀Ⴀᘀ⇬በ㙁湠䴀䟀虨勠ݢځ⭐ݰ䙮贒Ҳᗽ⫶骁Ⴐڊڀተ►ݠጤᖨႢ㚞㑤Ҥ囈☠ᘂ䎶㛀湠満㶂▱Ұ晢杤引☡躂⍂晰ݨቺҫ㙃湠贠䝂ҹҰ鉤㹋㙁湠贠䜂ҹҬ鉤▬ݥ湡ᛀ䛂㙁Ҭ鉤⫠ተߍ暡በ䁈ߘᖰ䙃㙂⻀柤Ԓҡ繨㙖栨㥠顩歠䙄▫勨ݢꚠҭ珠晡圛暐◡ꔊꔣԀ虦⺤䚲䙀⚠晠歭ҡ䗀湤Ң晱ݨᘂᄦዠ■䯠ݢ◉Ҥ癤ԁᒆڂ詠㤐ځᖔ晢乢Ұ朠湤Ԅ▲䉴ڀᒍҰᄰ晀㵔▲䩴ቶጠ㙁㚂潁癢Ҹ婠晪桟ޘ皠辁癰罠⭀⢃ꙁ廱ݼ漄䛴▫盤◠ጥ㛇■輄㜄㙀噤㲀␁Ԁ虢በ颀䁍暁竢ځ蹣橡覤Ԓԕ嬼⎠◀ݺ曡ᖢ䡀㽀㳵ᨾᆃ䇁詢ᖀ塡㟸㑠㚀ᒠҺ曣⎀忠杠ߔᖐ䝒㙁湠簆隚暡Ҭ暄嵣癤□橠穿鹫櫨⚄䡂䣐椰䙤㜲Ԃ㫄䊀ᴅ㛆■曨በ聨᧰桨桠ᯀ椨ڨ䙓幽暀晦䙃䜀ቺ橠婸ݣ仨☢Ұ⤐߈ݤڄ■暹ቤ䝄䛀◡亠㛲♉Ұ晠乢▱ጳ蠀ᖗ齠ހᖨ䡆䛀脨߄Ҳ晰㛈ᙘ䙄孰ጨވ䘰⦩◕缴䡊㙃䉆詡䳢◉ԑ⡂㙠⍀暺檂㡀㮩ᗌ智杣䥐朠蹤ބ▫勠⡀⠠ᒸ㚀伣塰你物ꕀ㕄䙐Ⴐ晀⎲㙒㩑ڀ⏀⢡ڟᗂ秐䏀䛀㒀␁晤䃈ဈ㹁ᓑ◁በ㙖㙃湢ᖁᖐݠ續普柠◕■満嶦盀ᖬ晠乢Ұᄰ䞎洀羨⪠檄梀檳湠ᛀ䟇ᡉԌ岢㩂数ᒁ▤က䡁ұቢ醁ᖡңځ塠潠尐桤䙓㙊㪁▤Ԃԃ佤ᑖ䝈䝀ᒀ柄ԂԂ㯬桰桠ᯀ椨Ꭴᄥ◃ꌠ◠⛡昙胡亀ᖗ齠㚬晲酫㙃䃈䝈䙂Ҹ婠媠⛀♖冢誂衠ᄠ■橤䙅䛅䍚橠䡀坠磽绢⡴孰ᣈႨ㙖菋雠㞚䙒䞿ꡟꡁ麒㛑ډꌤ䛈斁◂㗤ڪ鉵䍄㬨邀ႰᏐ䞎洂ҡ䙈☢㚇㙈䊄ᑄڄ▫仨ᗀԈႨ☢侀橢ڒᖅ窢⠠ᐠ暺檀硠ᄠ◰桬䙂㛂ᒀ䞡塠⚠㜘ᖘ⤠ᔠ虦ⵄ晠花婤㴾䥀䛈䄈柄晠㡀⚠ᘀጠᄀݰڈԄҲҩҤ暀Ԁꎠ倀橤ⵁ㻠ᖀ䡆䛈■◁崄⩃櫠ݢ⥉⻑ሐ䚮袀㧱▥ቦ靤䙁㙈Ԉ㸷䁈᧤晤邂ᄀ朽ᗀᖝᄓ仨ጠځ鉳䃊ڀዠ㾀◀橠汤䙠適橠詷靠➝裌በᯀ椨Ҥҳ噰因ጠԖႤᑈڤԄ▻盨ݢᓲ䅁ႨҤԖ睰ݠڐቤ䛀苭暠桠䁈䟨桠⪬ᣐሐ層裠㙁◉䁚ᄀݢ㙀湨㙢ҳ盨ݢԀԕ苨Ԅԇ䧉□በ䙀尘皠叄䙂Ңᖱ鋢㚱㝁䏈暈㚗塨䠄橠䙂彰ڈҮ袀⠈➙ቨ鞂ԙ■䩀│㙊ᖅ鋢Ꮁ㝀䋈Ԅҧ坰ᛄᑬ条廱Ҽ橠㡀ᔳ仨ᘂᓴ㝀㚴ᙍ䡠⚠Ⴇ嚬邈Ⴀ☡ᛀ䛂㙂㹑ݣ了㙃㚟橠䷗⚰㼘ᖀ⪡ᣐҨԆ蚀蝠ᘀڬቨᣐႨဈ㙷㟰▰晨䙇孱ڈڈ㙷䝐ݠ㔖䡂䛀苭暠桠Ⴀ㟨晤屢ҰᏁ▤ބ▻绨ݢᓴ䜨✺檀穻螑䙈ڂᒂ旰ᆐ䙤ҧ䝐ህ⠈暡穳■ᖀ趃噰ݠ⠘Ⴋ㙂灠条塰Ⴀ㫀⇬ቨ㙀■贠䜂ҹҴ鉤⫠ᆐҭ暡ޔ㐡㻀Ꭼበ䜘✨چ蚀Ⴀ㝄㜔䝀ᯆᑐ寤裠㙁◅⠚ᄀᘠ晨ᄍ嵴▫勨ڀځᰛ㚄㑤䙧坰ᛄ⣬杨廱Ҩڎ䡀⚠መ橢杢憀杼䪀⏂ҩҡ銤ᄡޛ㚀璄䙇㝀ᘀဌ䡁䛀菰䙮㡠ᔑҤ晠鳊䛁䍐慥⍂晰ݨጰቤ䛼䊈ဍ塰㽀ᘄᖆ晢䙐ݪڂዠየ㝀晤乢⠑ұ䟠㛲ҡ䙈☢黑㙃脨暤Ԓұҭ㢄ቻ㛁湠ᖀ㡀㜙ᖄ晠䝂ᯀ椢詠㣀㜁ᖠ晢䙁㩁ᒈ月隤Ⴀᘠᖐ䡀䜜✪ڀᘑ睠ݠ⡬ቬ㙂湠⍠䛀蚸勠Ꮒ㪪㝁⠀晤䙄亂ݠጰተ㝀㞃䚤Ҵ☣令ᖖᓀ㙁◡ᖀዠ偨砈橤乢ұң䙄ڔ☣令ᗀឈႨ☠ᇠޒԂᖀ鉤Ҭᛅ皿誀顠ቭ꒽㱚ԀԀ椺檠ᖗ槩ᖝᓘ䱨Ⴀ☢企癤□ҽ粢ᒂ䙁㙀湠乔□ҽᒀጩ⋀⋐䨤ڴ㘿ꡜ㓖ⳀⳐҰ䝎袀ႠႦሼ旊䛈䏐䝎㡠㧡■晠柠陯胰䡎詰䧉▥躤ԀԀ蚀ር䩑ᔲᖉ袤ڴ䛇菨Ԅԇ㝀ሉ粤ځޚ□詠ᖑ决罤ᑢ颡㑵ᑈ木㙧䡎蜁窰በ㝁㞁▨㙂■噤㳂ԁҰሐ䙈㟒Ԓᖅ錶䙆䛏矦铤㙐䁀⚠晤乢ዠ葼䩀鴒㙡ҭ䑚ԀႰ枨ݤ䙰蹢ᖀ桦䙂㛀ᒀ蟄Ңұ䙈交ᖠተݨԈ㠗塨㠅窰ተ㝁㟆詠በ䜙ᖀ晢条恰暨ځ癠纹Ҡ晪颥ዠ㚀ᖠ穰㝀䀐橠杠㙀䄜橡㵒㙂㩴ᴀځҰҺ针㙖罰ݠݢ⬶䛈䊈暮袀⠈㰙ተ鞂Ұݼ橠㡀ᔱ▥ቤ鲡ዸ滠㒄Ҳң绨Ꮒᅖ䛁䊈普䡀⚠መ橢条憀暼䪀⏂ҩҡ錴杢悀鱪ⵅԀႨԌ晠歭ݥ朰ᖀᏀ㙢ᨡ袠┋㝀湠辄㙢ҩҬ晤䅡ᆐҨބԁ罨㫀ڐተ㝀板詠㚒ҡ䙈乶䡀⋀ᑂ詠窰蹡ҭᓠ䱨Ⴀ□鏉霰Ⴀ㫠ᖰ䝆㙂湡䭀䜂㙊䉑ڀឈႤ☠◗Ꭲ晰ᄄ媠Ԁݻݣᖀ㡀ᇰ◀㹒⤠ᐠ歺檠䣀㙁□⠈暀Ꮤݤᗀᗐ蹹ҵዠ邁Ⴅ朰ᖀ䡐䝀ݨᏂ㪪㝁⠀晤䙀蹡ҥዠ邁ႰڊڂዠڨԌ晨杠䅁ңႡ塠恭書癤Ԃᄆ杰◗棂晰ݤᯄ暀Ⴐሚ誠㩑Ꮈ㝁ᓠ䱠ݻݠ◗棂ҹҽ窤ԖႠ■ᖀ㩐⦱繨◠ዠᇵ■䴀䙂ҹҽቦ颖Ⴂᒀ䞨䈂塨ߘᖀ栐㥠晭暠በ㽀⚤⎄屢ተݨڭ䡠Ⴀހᖈ条彻ݡᅄԔ◣令Ҹ⠋㙃盍ᙅԀႰ䝤☠栔㥐ቨဍ墀❐□ᔀ䲁虳⠀晤䙢ԛ仨ڬበ㙀■亀㵣噰㛀ᗀ␁ᇹ⻀曤Ԅ◣令Ҹ⠋䛀◠ᖀ驲ꇱ◄ᚾ柠㭔ݠݨᖘ枱䙈ҸႫ䜆⢐癆隀ቬ㛩ᛁ䛀暠䙁⎀䙄⪡仠㳂⬪䛸䊐慵厺皋猸ᖀ柴㭠晭暠ᖞ䞊ᖀ鉤ځ晰ᑈ暍䡠塨ݠᑖ䡄廱ݨဉ眰灯ބ癤ԂᏂ㙐慥㣀㙁▬晤邂ݰߓ䟡䡀⚠㭬䁔⥁顴熠Ҩ㚇☈㙉Ҥ暡虳⠀晤䙰䡂╀碢ң䙐߈ҥԀႰវ☠䙁㙀⠀曭䡀䂘婬㲀ԈႤ☠ᇠސ聨ڀ䢄ᄡ昃ᓁ䩀䡐塬㛨癤Ԃᇠ暺誠በ⦨㝀晤䙁寰Ҩԍ䩐Ⴀ㇍褴䝆ᣐᆈဉ眰你㽇꒿ꡟᔥ榡亜Ꮢ晰ݨ⠈暡鉴灠晤䙲ԓ仨ڀᓍ⋃■ᖀ笐躐勠⫠㝢Ұڑ蠀㜀庹Ҹ晰醀ዸ满溟陟ꡘ䍬䁈䙆▨滠䩀Ꮐ㙁Ҡ癤ᗪ䥆木Ԅ㙀繲ݠݢꛆ⋀□躆⍂Ԓ媔ݣ◊㩁Ҩ暄ݲԓ吉በ䙁尘滠亟陟ꡘ䍬☠䙀㛀楡蟄ұݪᨽ㑈暀ݰᆚ檀衠Ⴈᖰ㑖杠㙃䄄ዣ䜀䚙Ҡ橢柟䧆枣ڡ婰Ⴈ㩰㑖杠㛀楡䞤Ҵ⪚䉴ᖖ桄㫠齪䭀䙄◃漸ᖀ⤠ᄀꝟꡟ雔终ᘀᖠ㝡ހ晤ዤ㙂Ҫᨽ⪺ᄀԀ蘱栀㡀Ⴀប䁂䙀㙀脨朤ڴ⛣侔䁂⥁鉴盖ចԀႠ㿨橠屢Ԁ鵪䭀䙂Ң䩑ݣ芉㙀⻀晡嚄Ҳҩݣ暆㩁Ҩ曠橤㖁䫄Ҧ暀ݰҪڀዠ㽀ހᖈ䡂它ᓀ橠Ꮐ㚁■䁀⤌Ⴅ盎ᙅԀႰႤڀԀކ洱䛈ᖛ枑Ҥ鉤ҫ䛀◠◝棲ԑ繨ݣ躉㙀珠晨䋂填ꍸᖀ栬㥠虪歠䙃噰Ⴇ躲杠䅁Ҡ蹤Ҥ▻盨⋃纆孰ߐ恤贂㙑繨ڀᓁ鑳䃈چ蚀ႠႤᑔ䡀䛐㠃䙁婻䝱ҹጰ醂ᇠ葨ԍ婰懪ᖀ晢杨宀格䦤䙆罰♸ᖀ栠㥐Ҩԍ䡠ᇰ■晠䙂䛀苭暠桠⚠㇉ጰ屢ዠ革溒ᐢ晰ߘᖀ⪢ᣐҫ䙁橰槨婠晦䙄䯆晨Ԅڄ軈ݠڀዠᒵ⻀曨䉂坠㝅隠ᗫ䛃芰䙄ڄ◣佤㔢䅢ԕ☠洠䙄㇁㽆躬乢Ұᆚ檠㡀ᓙ■鉤ԀႰҰ䙮䦠㙡Ҥ晨邡㩛ݡ◘棄⭁伀ᖀ屢Ҧڂ躗Ꭲ晰ݠᏖᗀ䜜✨Ԇ蚀ڙҤ晬邁ᄀꂪ䩠ԄҲҩҤ晢䙁㙀蹤Ԃҡ䙈ݮᗀ㙀⠀杤䙀蹨器㱖䙀㳀ᒐ䝎㪐蹨卧皲䝀ᇠ□ᖀᏀ㙁▩䑈暀ႰҪڀ洂㙩ұ㱚ᒋ㙀⠀杤㙀虠剠㲀Ԁݻݠᖀበᄠ▰晬邖Ⴂ■亏በ⥚ᖝ裢Ԁހ桺満鵱膱◄普杣彻ݡᖀ䩗杠❍ቮ鞡Ұݰ䝍䩐懨鐈橬䙇㙄胨杭塰㝀㛀⭌ᗀ䜠✨Ⴆ蚀ቭ盹ᓨ䱨Ⴀ■玤䙃噰ݠ㚀ځޙ⻀曡暐聭雸癤ԀᒣႰ◗棂ځ繨ݣ嚆䜘✪ڀበ㦑■鉤ԀᖐҰ䙮䦠㙡Ҡ晰邀һݠᆀ園ԑ䙈◤ځᇸ皠传橢Ңᨡ袢ᖂ䙐Ұ晀㬐䡁Ҹ癤◂ᆐҰ䚮袀ቨ㐑ᔠ䲪䥍■詠裠㚡▥⪨暡穳㚪ᙅԀቫ黠ဎ鞖Ⴀᒀ柄Ԓҩ繨㺀ᄀᆛݢᆀ㛲ԑ䙈嚢⎢䙐ᆈ߅Ԁ蝰ᛜ☠䙆㩁ቨ晤ҳ噰因ጠԖႤᒀ䞠䩂Ԓᗑ窤ԈႠ☠蠀በ塨栈橠乢ұ߃䙈㙂▨噤㱆暀Ұ枨ڤ䙔♃仨ڐበ㝁榠ᖀ㩑ᓑᖀ晢乢▱߃䙁塠偨ߘᖀ⤠ᔢ榠ڈበ垠☐橦杢悀鱪ⵄ䙂晰ݠ⭌ᗀ㙀■䴀䙂Ҩ婥ᓘ䲁米⠀晨㸢һ萤鉤ҬႥ湡躂ᖑ䝀䋠ᖠ䙆䥍胨Ԇ蚀Ⴀᛔ䁂⤠ݰል暣በ垠◠橠ᗀ㙀湠⍠䝂ҡҤ鉤㹋㙃⠀棤䙄仈ݠጠԖႪ■ᖀ㦠㜀勠ᗀᗪ㛁□ᖀ贂㙱䙈◢ҫ㙃■●赳噰㛀㚀ጡޙ⻀曤Ԃڃ仠ᗬበ㙁㚿蚉皤Ⴀ⚤⎌䡀䛁荰恤贂▰➽ᓐ䱨Ⴀ☠亀㡀ᔡ□裪ᗀ䜔✨Ҥҷ㟰■晤⪡ᣐݪځޒ□Ҩ晰屢ᖐҨႦ蚀蝠䛀ᗬቬ㙄■⍠䛀虸卤撢Ԁᄀꡟꡀ鬰䡁ҩተ鲂ҰҰ噿詖硨根ተ鞂ᇺ☠ᖀᖘ⎠ꑉዠ鲡ዸ滠哤䙂ҢᯂҾ邡◛㚀璄䙇䡈搸晢䙃彰Ҽ珄䙄▫盠ᗀځ⢵䏐䙮㵤⚃令Ҷ䙈㙀⻀槤ݤ㙁艨䚀ځᄚ㚶ᛍ䡐乲Ⴆ纬乢ұߐ䙤ҧ䝐᧥⠈暡米■䩀嶃噰ݠ⡀◖Ⴀ▢ᖀ秀㜀噤㲀ጡԀ沨Ҩ㙗妹ҡዾ汻恰晨ޅԀႨᖍڀᄂᆔݡ●⎲Ҳ㹴ᴀځ㓻◠䩀ᖐ⨡ᖀ晦䙁䛂䊚檠磠㛁▤䁀⤠Ꮠቭ暢በ杠Ⲙᖰ⤠ᖐቭ暡桠杠䜘ᖐ⪢ᦀ鍩橠該榹▭ᑰ䙁尀格亀በ⠈䟩ቮ靻㝀䄈暦蚀ቮݸ晠䙁孱ҭ暠በႠ⚤ᑤ屢ተڈڭ䩒栐▱ᔈ䲁湵⠀晦蚀Ⴀ㛀⢂䵠ᐵ皡针㙂Ԋᘝ糢┑㇕㚋鏄䙂ҡұዠ邩⻑ݰ䦦蚀䝀⚧蚲佢һ曤ᖀ䩞枩䩈ڮቨ䜸⡈ڈ㛆砐□ᕘ侀ᒛݠ◝Ꮢҩ繨ݣ骉䛀⻀晤Ԅ♣令Ҧ暀Ԁ栭暠桠ቨ䟨桢䙀䛂䃈䙄ҲԊ䩴Ҷ䙂㙂㟃䚤Ԃұ䙈☢ꕱ䅁ႨݤԂԃ勨⢂ᅒ䅁Ⴈڄړ噰ݠ⢃ꙁ䳂㙈ވ㙷坰Ⴄ⎈栰㥵◠暯驺枑䙈ڄᄡݰҽᗀ⎴亂Ⴆ皬䙀㙀苭暠በ㚠ᖬ晤乢ᖅ溠ᖀ䡀䟰◀晠䙄䅁ᒈݤԃ噰因◠ԖႤᒁᅈ㠲□ҵᕿꡟᔦ杰ᖀ穰樑■晠柠ꙟ胰䡎詰槩▩躤ԀԀ蚘ᕭ䩑ᔲᖑ袤ᅔ㝀■◐■ꇲᗁ鋢Ꮁ㝀䍐䠮衠⚠➈晠飋㝀㚀哤ڒҢᗕ筌条弙㚇ⵄ㙀罠㛀ڬቼ㙂㛀⎀䝂Ңᖉ軣纈孰朠湨䄂垠■橤条㙀䍈暎㪐䡂⍐犠ᄀᄙ⻀晤Ԓԁ繨ڀᖠᆛݦᆀ㛲Ԋᖁዲ䙀䛀菺詠ᖑꃐ鐰桠䙃㩁Ҩ䙠婢ҩ▨癤ᗁ折湡伡皢Ңᗵ銢ᄀԀ暽ᖠበ㝀ᛄ⚂邂ᆔݤᗀ㜐ڙҬ晨屢▰Ⴈچ蚁暹Ұ晨屢ᯐႨݦ蚀曀⫬晦乢ᖑҨႦ蚀蝠⭀㚬ቨ㙄㚀⍠䟂ځҬ鉤⫠ᖐҭ暡ޒڊᖡ窢ҬᏅ湠歠䛂㙁Ұ鉤⫠ႰႭ暡በ䡈ߘᖰ䙄㙁⻀柤ڂҡ繨㙖栔㥔ݠᗀበ惈婡ᓨ䱠Ұሚ誠㦠㙂⎠狣暆㩁Ҩ暤ڶ睰ߘᖀ䙀㙀皠咦蚀䝀☠㓂ᓲ䅁Ⴈڈ㛆睨Ԑᯖ桘㡠牭暠ᖐႨԐᖖጠ㙃㞃䙀䩂ԉ䙈庤ጡᄚ㚶ᛍ䡠ᄠ■晪汤䙐ҨԆ蚀ႠᖴᏃ劆㙄皿橠䷗⚰䬘ᖀ⪢ᣐᆐ䡈㞂ԑ䙈䚀ᠦ㇕■䴀䙂Ҫ㩴ቶ䙁㙃⻀楤ڒ晰曨Ҩ暀ݰҭ暢በႠᙘᖰ⤠Ꮤݥᗀᗐ蹡Ҥ晠屢⠐ҨԆ蚁暸⚠晦杯䳂㙈ބԒԛ仨ݢᓲ䅁ႨҤږ睰ݠڐቤ䛀苭暠朠◹Ҵ普杣彻ݡᖀ硠憱▰晦条彻ݡᖀ塠䦑Ҭ鉤ԀᇠꞀ倀橢Һᖍ銤ځᇺ㚴ᙍ䡐㙓ꎦ皬乢ұڐ䙤ҧ䝐ህ⠈暡穳■ᖀ㵣噰ݠᖘႫ㙁⠀条塰Ⴀ☠☌ቨ㙀□⍠䜂ԁҨ鉤⫠ተҭ暡߀◺ᗼ桠䙃䜿ꡟ蝉皤ႠⳄ㜬䡀㙀㚠䘇鴄☣罤㜢䡂恱ҨҨ㹎ရ佤䜬杤廱ڝᗀበቬበ䔔杰憀曼䪀␄☛绠ጠᎲ㙀䋚誠ᖐ⨡Ҭ晠杵宛㚀咎䩑覱ᖀ㲀ᖠһݧᖀ檀ᇸ◠晠杢悀鱪ⵄ㙐㡀⚠晲条㙀䍈暮㪐䡂⍐犠ዠᘹ⻀晤Ҳԁ繨ҸႫ㙁皠◃㡀ቨ᧹粠ځ㗣⍽ᖠበ⛠■桮ᓀ㙃滠䭀䚄⩃櫠⋌Ⳃ㙀㚇唤㙢Ңᖅ躢Ԁݰݰ䛎㳢㙑䙈䚄⎭ҥ湠橠槀㛀勠◠ᄖႬ□ᖀ槀㚡Ұ晨屢ᖆڂ詠㣀㚁■晨屢ᯐڈݦ蚀杠㝄ڬቸ㙂■䴀䜂ԁҠ鉤▫㙂皢ⵄ㙀虨剩ڀ◥⋀ݰᖀ㣀㜡▩ቤ骡鉴䃈晥ԀႠᛘ☠䙀㙂珠晤ڐ蹪⍐犠⛡数ݽ钆蚀ڠ◌晰杰䛊▢ᛀ䝂Ҫ㺭窠ពႠ□企癰罠㫀㚬ቸ㙀灠桤䙀䡁Ҵ晠屢▰Ҩކ蚁暹Ҥ癤㩢Ԃ榠ᖀ硠ᇰ◰晠䙅䅁ᯂ蚨በ䁈掔☠䙁㙁湡鎤䙄▻漸ᖈ䙀㙀胨晤Ң晰㝄ᑤ屢ቦڂ詠㡀恨㐈鉤ᖠݰሚ檠䡀䁈᧨鉤ᖠႰߚ橠姀㙁Ԉ☠䙊䛁菨晨㙷䡎曹窢ᗁ葳⠀晤㚐㨺ᖄ晠骂Ұᆜ伀橤ⵁ㻀ڀ⇲䅁Ҩݡ晰罠㛠ᖐ⤡ҰႨކ蚀杠ݠ⡬ቬ㙂湡⍠䜂ԉҠ鉤▫䜞✨چ蚀ቭ書晦屢ҥ湠亁⍂■勠㳂㚪㡀■ᅊҰ⪐⚠晦栠Ԙ杰ᖀ䡀䁊ᇪ腰䝁䝀◠柠㛲Һ㩴ڀጡ虠■鏕绂ҩҮ肤ᘈ桰暨ڄڈ杨◌晠䙁䇁晨Ҥԃ幸䙯屢ቡ旡䗐䙤㚀㡁ҡᖀ碀ށ晟ꡟꡟꡟꡜႦ䡅䞀䙠㙐▬▟ꊡ加ᠢ暠䙠㙐⪯ꡘᄤ屺ԀᄁҴ橠媏ꡟꡟꡟꡟ꜠䜈木乨ᖄቢᆁꡟԋ□溰▨ᖄባሿꙀ仭榠ᖀበ㩡Ҵ晭ᘄ乢㙐䙁霒ҩҮ⋄ڙዠ㚟誀桠Ⴀ⛰晢䙃俰ڈڪ㟰蹩Ҡ晥កݰခ囨䙅㚸卥ꕂᖠҰݵ橠㡀䃩Ҥ晦睻⋀■ᖀ亲ҩҮ⤈桠佰杢詠朔幨➽ᕀ䙨Ⴀ☠䩀ᖐ䆒ᨱ袤Ꭺ㛀ݰᖀ䩐ႠݠᏚ䅍Ұү虨㝇䢘婡ᕀ䙠һݠᖀ㜰聯蛱Ꭰ屢Ԁ蘢鑀㙗齸ႦҤ醂ᏒҠ湤ԂҺ嚔ڀᗁ曀Ⴜ䟠በ你ᛇꔂ鞀Ⴐߚ誠䩘ұҩᒀጩ㝀洤ဃ䡀⠨㝀⋀䙀㙂盀ڂᄲҲᯀᙖ䡂䜿暲蠀ސ罠ݠ⡀ተ⢅湡亐Ԇ瞀ԍꔂᓿ㙀◠䚈በቨ㐄☠ᓀ㙀熠Ҩ眰㝀ᛄᑔ䡁䛁芣䙁圐䁁Ҥ橤杤孰暨څԀႰⳅꗦ䙃䜀蜁Ⴍ嵴⪤ᯊ⚐鞥⋀ᑈڨ䘰⦪㩑ڀዠԕ樢蛈በ㞨Ҥ桦䙂䛀胨暄㙢Ҹ婠㱖䙁㙀䄂鋀䙗鹫黬ݢ㚫㝁⚠ᖀԇ靠ᛔ☠桠ᯀ椨ڄҺ遰ݠᑎ䡁䜨智桠衠㞈⫡ᛁݠ暠䙰Ұ穹驠ᘀᑗ厢㺃䕈䚤Ԃ湸Ԍ鑦ԀҰߍ蛁በ㡈栈湠⨾ݠ朿詠ᑐҢᘁ裪ᗀᄀ■䩠嚄Ⴀ☠ڄᄈႨ☠ݯ顠ԉҤ䚠ⳁ㙀灠桡塠⛠◰橪醫ዠ■䩀塠㝀ᘠᗈ㝀ҭᒀ柀䩂ҩ䙉䛂ڈ⋀■檀ԔႠݨ☪ⳁ㙁湡◀㳲㙃伔Ҡ杪䧆晢詠㡀㽀㛀ጰዤ☠Ҩݩ㜐⚠⭀♴䝃㙁□⺤㙢ҩ䙈亢ᛋ㙂湠詠䝀ߑҤ晢乢⠐ݺ洠䞀纸劎纒ታ敢蘨虨㹁ᓙ◼湠䙗䜀ቺ橠㩘ڀ晠婦暀⫠朽ᗀ㡁恬ԁ窤䂪㝌湦䭠噢ҡҥ窲ᒀ棻朠ᖃ䡀⠈䠈檒邂⻐⍪䚠በႠ谈硦ݥ䇁晨ᓄҴ☣滨头䡛㙍炠虤Ңߋ伄ᯁភᆀ▦橠㩑槱▥窤㽠⭔朠ᖀበ⥑䩌Ⴊ嵣Ұᯐ䛍䡡桬ҥ㑚ҫ㙋湥躐ݦ硬Ԁ䙀䝗㙁杰◀ተҺݠ咠ځᇺ☠厤䙲ҹ䩌ڀᄀᄕ⡀虰秐㹁ڜ晢杨影ߚ檣ቡ枨⪠晤䙃孴朠㛦隐Ⴀ苠Ꮒ㚲㝁胨楤ᆂ湸ݠᗀᓪ㫁暁䴠噢ޙҥደ颂ޕ☠詠声㹁Ҥ晤邉ᆀ䞍蛀በቨ㟨橠柠ރ榠ᅁ婰ႨႤڂ㹃䙐᧰噡⍂߂ᖝ輴䡁㙀炠赤䚲ҩ䩌嚤☜㙄㛀在噏ꡟꌞᴀ␂ꡟꡟ衐幇蝰䛀ጲᓸ椁◂䪀硠⛨⺠橬ꋀᒡڡ溿陟ꡘꔌ晪楟ꡟꞃ雏踢㙱Ҿ⢄仩㝃湢㗄ڴ㸿ꡟꔟᒠᖡڡ溿陟ꡘꔍꎘ䡈㙂螰汱㡠你ᘤᴐ䡄㙀炠蝤䛗蝠䭈ᒌ楞ꡟꞇ雄ڄ㸿ꡟꔟᓾ摱ጨԅ㙶檊☢㢄⫠ݴ朲ᗁ縢ڪ▦⭅ꗿꡟ湀詡檏ꡟꡜ䕆ꕼ㝆湡㛨䣈潰㛀㤸䙄䞿ꡟꡁ麒ڊ▦⭅ꗿꡟ湀阯梀潠塵ᗡ⛂ᯐᓟᖁ檏ꡟꡜ䕆䙍䝀蟰蘿ꡟ齜㐹麤ⴀጢ盠垄䚂ҩ䩌暤㙠ݴ朠ᗁ帢ښ▦⭅ꗿꡟ湀詢ᖯꡟꡜ䕆ꕼ㝅湠䭠屨偱ዤ檂䙁䛠䄈曅㙰Ⴐ硐暈桡榁星ꡟ願㽀歫ꡟꡟ╡藿ᗂ桡ᖪ♂㢄㙠ᦞ▤◿ꡟꡘ摬晶桡榁星ꡟ願䈳雨㴸䙄䞿ꡟꡁ麒ښ▦⭅ꗿꡟ湀阯梀窊☢㢄㭠ݴ本ᗂ䡀⛨⬀橼ꋀ⏁ڡ溿陟ꡘꔌ暄楟ꡟꞃ雏踢㚱Ҥ硦雥䝐䢈棄Ҳ湺曨䔸䙏䝀蟰蘿ꡟ齜⭀䳅ꡟꡟ橀阯梀齠灵ᗑ⛂⚰ᔟᖂ䩯ꡟꡜ䕆䙎䝀蟰蘿ꡟ齜㐹麤㑠➂盬㝤䝲ڻ雠䳅ꡟꡟ橀詡骀⫲⪛ꡟꙟ栟䕈桏桡偷ꡟꡞ㗃㙇盠在噏ꡟꌞ⎜ꋂ⤐ᄁ亥☲㙡ԉ麠ᗂꡟꡟ衐塠硰ᯙᨽꡟꜯ蜿痤䛣幸ݠጠ⠠⣂盬㝤䛣幻蛠ጠ⠠⤾▢溿ꡟꡘ摬暌桡榁星ꡟ願䈳雨㪮ᓐ㙀湡ᖁ亴㙌䬜ᴐ䙁㙂湡痤ڔ㸿ꡟꔟᒠᒡڡ溿陟ꡘꔍꎘ䡅㙇湤眈䙘潰㻀㤸䙆䞿ꡟꡁ麒ڊ▦⭅ꗿꡟ湀阯梀䝀勠䥊梐櫱Ꭱ交☲㚛雠⢄ᆆ䞿晟ꡃ麒ښ⪟ꡟꙏ栟䕈梄ڨ偱䡤橬䙄摰ᆐ號ꡟ黜⭀☤ᆆ䞿晟ꡃ麗驁◈晷ᠢ㺄满⎀屢ҩԈ鑦◀ݰᆈݤႷ蝠㝋ꡟꡟ╡湤亠㺤㸷ꡟꔿᓾ摱ᇡ亠㻓幹曠ጠᰗᇬ■䩀硠把▦㢄⏀⏞□躿ꡟꡘ摬晼桡榁星ꡟ願䈳雨⡀⭅䝐䢈朤ݲރ雠㣅ꡟꡟ橀詢檀⫲⪛ꡟꙟ栟䕈曯桠塷ꡟꡞ㗃㙂㛀在噏ꡟꌞ⎜ꋂᘐሡ亥☲㙹ҵ麠␂ꡟꡟ衐塠偰ᯙᨽꡟꜯ蜿痤䚓幸曠ጠកᓂ盬㝤䚓幻䛀ᴀកᘾ□亿ꡟꡘ摬晲桡榁星ꡟ願䈳雨㢮ᒀ㙀湢ᖀ桡ᖪ▦㢄ᡜ㙄㛀在噏ꡟꌞᴀᠢꡟꡟ衐幇蝰䛀䵊梀櫱ᆈᇯ桠塷ꡟꡞ㗃㙆盠在噏ꡟꌞ⎜ꋂተᅁ亥☲㙩ԁ麠ᠢꡟꡟ衐塠桰ᯙᨽꡟꜯ蜿痤䜂Ԕ㭈蝲䡈㙂䕈Ⴈ噟ꡟꋞᴀᗂ߃㛿號ꡑꊻꂐ橬嵣䩐ڈႦ隗Ⴀᘀ㺮ᒘ㙀湡詡㺔㙌䬜⇰䙁㙂湡眈䙘瀘⭀暐条孱ᯐ䝈霰ژⳀ暎柠ᖵ■◀润睰ᘀጲᔈᆑለԅ㙸晩◁麠◢߃㛿號ꡑꊹҽᨿꡟꜧ蜿痤䛂ҩ䩎㙏ᠢ㚄满䩀㣐䊀㫈Ⲹ䙆䝀蟰蘿ꡟ齜⭀⢅ꡟꡟ橀阯梀坠䑕ᗑ⛂ᔐቿᖀ骏ꡟꡜ䕆䙈䝀蟰蘿ꡟ齜㐹麤◀ᑂ盬㝤䚒ҩ䩎㙄䡄㙀炠蝤䛗蝠䭈ᒌ楞ꡟꞇ雄ڄ㸿ꡟꔟᓾ摱ጨԅ㙸暔㭈杲䡌㙀炠靠梀鉁ԕᖃᴂꜟꡟ詐塠衷ꡟꡞ㗃斞☣䩀溴㞄䫈◠✜㙂㛿ꡟꡐꊹԅᖃᴂꜟꡟ詐幇蝰䫀㽊梐櫱ᒈᇯ桠衷ꡟꡞ㗃㙆盠在噏ꡟꌞ⎜ꋂ⋐ᄁ亠㻒㙡Ҥ硧Ң㝈■䭠噢㚛雠㳄ᆆ䞿晟ꡃ麒ݢ⪟ꡟꙏ栟䕈柄Ҳ湼Һ⢄䛉㝈湠䭠幠䝐硐暈桡榁星ꡟ願㽀歫ꡟꡟ╡藿ᗂ桡ᖪ♂㢄㙠ᦞ▤◿ꡟꡘ摬晶桡榁星ꡟ願䈳雨㴸䙄䞿ꡟꡁ麒ښ▦⭅ꗿꡟ湀阯梀窊☢㢄㭠ݴ杀ڤ䝢ҩ䩎Ң䡎摰ᔐ暐誏鹟ꡜ敦䙒䞿ꡟꡁ麗驁◘晢佣晣螰橱㡡㽀ᘤ⎠គ╞▣躠㺤㸷ꡟꔿᒠ❁晟ꡟ靘䈳雨䒀㣅䝔䢈梤ဇ蝠潫ꡟꡟ╡湣溠㺤㸷ꡟꔿᓾ摱ᔈᎰ窃ᗉ◬晾ꋀ❁晟ꡟ靘㽀捨ᒌ楞ꡟꞇ雏踢㚻雠僥ꡟꡟ橀詡骀⫲⪛ꡟꙟ栟䕈椤ڈ偱䡤橨䙊摰Ⴐ號ꡟ黜⭀㫄ᆆ䞿晟ꡃ麗驁◈鑦ԀݰᏈᐰ窃ᗉ◈鑧▧㙀湢橢踢ڒ⪟ꡟꙏ柰ᣐ暐誏鹟ꡜ敦ꕼ㝅㐀陠硠⚠㛀㭊桡櫻杂ڄҲԉҹ麠ᠢꡟꡟ衐塠塰ᯙᨽꡟꜯ蜿痤䚒ڹڊ⢄ᆉ㝃▢嗤ڤ㸿ꡟꔟᒠᘡڡ溿陟ꡘꔍꎘ䡄㙅湤圈䥈潰䱕ᗁ⛂ᦞ□亠㺤㸷ꡟꔿᒠᦁ晟ꡟ靘䈳雨䢀⋅䝔䢈朤ڇ蝠㽋ꡟꡟ╡湡◠㺤㸷ꡟꔿᓾ摱Ꮘᅐ窃ᗉ▰鑧Ҧ㙀湢浀团ҩҰ暂ꋀዡ晟ꡟ靘㽀歨ᒌ楞ꡟꞇ雏踢㙡艮㙊䙁㙂□眈䙘瀘㑀ᴀᄀᏐሡ亠㻒㙹ԙ麠␂ꡟꡟ衐塠顰ᯙᨽꡟꜯ蜿痤䚒ڤ㭈杲䡆㙄湥㗄ݴ㸿ꡟꔟᒠ⠡ڡ溿陟ꡘꔍꎘ䡄摰ᆐ號ꡟ黜⭀☤ᆆ䞿晟ꡃ麗驁◄景ᠢ㪄满詠縢Ԛ⪟ꡟꙏ柰ᄰ暐誏鹟ꡜ敦ꕼ㝆□眈䥈潰㬜⎰ᰀݰᒍ蛐ҲҩҴ晲ꋀᐡ晟ꡟ靘㽀䭈ᒌ楞ꡟꞇ雏踢㙩艮Ҩ䙁㙂湡霈䙘瀘㑠ᴀᄀᖐႨተ窀⬉▽麠◢߃㛿號ꡑꊹҽᨿꡟꜧ蜿痤䛂ݼ㭈杲䡅㙆蕨ވ噟ꡟꋞᴀⵂ߃㛿號ꡑꊻꂐ橬䙇椁⠢䪀顠橁ҽᨿꡟꜧ蜨Ⴈ䙘塷ꊟꡞ䗃斞☡ᖀ纴㟄䫈㚮ᔀᔐڈݦ隘晩Ҥ晬䙈摰ተ號ꡟ黜⭀⭄ᆆ䞿晟ꡃ麗驁◀鑧▤㙀湡詡◴㙌䬜⎠ዠԀ暺檠ᖐ梘婠㲀ዠ⨠虢በተቨݤ噦暀Ұᯐ䚮梀⥑▨晤佣Ұ᧰噡⍂㜉ҥ窲ᒀ棻朠ᖀበ⠈䠈橤邂ᆐߊ䚠በ㝀谈硦ݥ䇁晨ҤҴ☣滨ᙔ䡃㙁炠虤ᅔ⪠䟨晤邉ᆀ䞍蛀በႠᛄ坄䡁孱ݨڅ㙰Ⴀ荦Ұ邀ޕ⡀虰秐㹁ڡቨ邂⫠虠佁癠罠荦Ԁ還ҥ鄠暠幐㨱⪡Ꮐ邂ᆒҰ噄㚀㡁ҡ⠚Ԁނ榠ᖀᏀ㵠ᘀᘖⳀ㙀⡀遨䙅㚨ݠڀԉᇠ☡橠Ꮐ㵀ᘈᠺꋂᔛ朰ᖀበᄨⴀ晬䙇冶蕭蛉በᅈᔠቨ暀ԁ䘍蛋ޒҢ➼鑦皡Ұ杨Ҩ䑀ᓑ▴晤邡Ԁ虠䩀䳱Ԙ軠ڀᛐᆐ߈ҥ㙳栘Ⲡ晦䙀㫁牭蛆በ㽀ބᴐ嵣㩐߈ҥ㙲ᇸ⭀晦䙀㫁汭蛃በ㽀ބᰀ嵣▰߈ҥ㙰栘⫠晦䙀㫁晭蛀በ⚠⭀ڐᑤݨҦ溛桢晰Ⴔ䁀䙃䜠Ҥݨ䐂ᄠ□⠚Ԁᐠ虠䡀橽蝡䙈ݪⳀ㙀㚰Ңڀ罠ⳅߖ䩀㙂ᑷ蛀㚷齸Ⴄ䜖䡈㡀▢ᖀ䦠㚡⪡ᓀᅋ㝂潠ᖀ穰榱▭ᓀ䆁湠橠ᓄڒҡ繨躠កһݧᖀ穿ꡟꡜ㓂ꔠԕ满橠詿ꡟꡜ㓖䅢ᘛݮᖀ硠Ⴀ䯨橠屢㡐ᄨҦ蚁杸Ⴇ䙂醂ቲҨݤԃ噶噤晨栀ޕ☠◀ᖒ曠䊨晨䙄㩁奠䴀勠▲Ⴄڀᄀዠ顠厤ڄ㓀ᇨ晠㙮䛀㡁▨㸲■噤㲀ᒨᄆ㚀➄㙢ҹ䙈ڂᰀᆔݲ◀ᙀ䡁Ҭ晬枿廻ݠᅀ乐㡀⚠晦乢㹢杰ᖀ婽ҡ繨蚠ᓁһݧᖀ媀ᇸ⬀晦乢㱐栨ڤڃ噱嚐ቶ䙃㩁ᖃ䙡婷齠⬀虺Ⴚᣐ߈Ԅڄ㒀ᦈ晨栰ԕ□◔Ҷ盡庌桢䙇ዠ■躀ᖐႠⰀᗈ㝀ҭ■躀ᓠ㟁Ҭ普屢㱐ߐ䙆蚁蝠Ⰰᖨ䝀㙁盠⎀坢Ҫᨼ晠䅡ݥ湠詠壠㙁■晬枀弙⻀晨㸲ҩҡጠ靻㛀■漁癠罠㝇䙂還ҰҨ䙤ݰ䡁Ҵ癤䉢ҰҨޅԁ梓卤ڴҠᣐᄰ婠㳢䙁ԁዠ還Ұڂ裀ᖘ螒⇰烌በ䜢⛰䮆蚀ښ㙄ᑾ䥀䛈䄈朄晢ԉҤ晤䙃㙂㛠㙐▨ᖄቢဟᛐᖐᄪ䚠ተ⚠ݠ⡒ᒈ䇁桨Ҥҳ幸ݠ⢂㚪㡀ᑼᄠ㙗齸Ⴇ虨醂ቲҨݤҳ噴噤ᘀ䙁䜠ҳ䛈በ⠨㝀ᘀ格㙔ݠݨበ䡌晥竣陡▢□ᦀ㗀㡨婤㲀ᗂ旻杚ԁ塠䡓ꍼ╠ႬႥ湡◚Ҷ硨Ⴆ虢㙇ⳐႰ薘嗩苭㔏蠖ԗሤڈݨ唟窖酞鉍板䇁陠䩀檉ꗇ跇ឃ胢琟琠鵠㡀䡖汶尿ꅯ炣骠⎀慠⚠㝋註魘礳꜉鬏駐䎀ᘀ☥剐遚剛緶騣幽Ҥ晨椛趵倖䁝憛艙艮噢䙄䛂⻀葠䡀䝀㛠ᛘᄖᅘڈݤҳ噷癨晨䙁䜀䙡Ⴎ儴㪄爮扟獙棕ԁ䴠彠⚠㝆䙂邀Ⴐ߄ᔨ㙄曈ᘀ☣㙁孰ҨԂᅑ盀ᖬ晨栰ޕ㚀◖ұԘ軠☥ꁢꋭ諈鳞㇐ᇸ㕠ጠᗂ鱝䟶繖藌⚙良Ң䙄䞏鲞憘佽穴鑜鑧幡㙂㛴圓啟糜硿䡀嵣繠湡◾䔟严㳟ꇯ䮿䇁遠䩀檊藦瘲蘽挗䑛杈Ԅڄ㰞愊琑睋耽蘭蛓ҲԂ⤢䰯㰿賜螚晦隙ҩұᛉݠ暠ቭ蛞ԂԁҰ癥⪡䅁扠䩀橹ҫ仠ᗀᒐ㓠晲ᇠበ䡌晥窠ᗁ䙵盐Ңᅔ▢䙴ڀԀቴ朰⎀ҢҡҰ硦溗Ҥ■ᖀ棰䄁艠嚠Ԁቴ朴⎀ႢҢᘁ窢ዠހ湺誠婼▢扱ڀᗁ虡胨䙀婢ҹᖄ晨䙄㫁葭蛇በ䝀㛤⎀嵣㹐Ⴈݥ㙶栘Ⰰ晨䙄㫁繭蛄በ䝀㛤⍐嵣⪰Ⴈݥ㙵ᇸ⬀晨䙄㫁硭蛁በ䝀㛤⋀嵣ҰҰ䙈䅀☠䊨晨栠һޙݤڄ㸎⪂嶃䧳黍晭蛗ԒԂ⨯魭脟腛嚧赀慠㽀㝊昑ꁹ螨鴀秏駐䎀⭀☥知珗ꖳ飰ꎰᇸ㓀ᴀᗂ齖ꏞ㫴Ꞛ掋ꍼ⏐ᒠዡ兜䂾煞鱅荐鑧㙃㙂㛮ꁵ働泧售鵞嵣橡湡◹⛏挏ꚳ饩遠䇁虠詠桠䞈㐠鑧㹄㙂□ក嵣幼晰晨䙄㫁聭蛑ڂԁҰ硦蚗ሀႨݤڂ湺蜼▐ᒠተႪ䚪ᓰ䗀⭀◠ᖩᇤ㐀ꎠ塠䝀㛤⋀嵣陡湡◘ң噷Ұ晨柠ᇵ□◈⍔㑀ڀ咢ᓁ鑰⠀晠橢Ԃᯀ⍴桐ݨႢ詠婰ጠ婨晤䙄㫁癭虠በ㝀㛤⋐嵠ᖐݨݥ㙵栘ڠ晤䙄㫁穭虢በ㡉ᇨ桤䙁䛐䄈曈䉀ጸ婠㱖䙄㙂⡀镦隓杠㛀◲ᓰ䇁牨ݤڂ湻䜜ᴐ䙄㙂⡀鉦隒Ⴀ㛀◲ᓘ䇁汨ݤڂ湺朼ᰀ䙄㙂⡀车隐杠㛀◲ᓀ䇁晰噄㙀㡁ҥጢ潭ҰႰ幠崄▢⍠ዠ⎺㙂㛾庿❙ⳝ瘣屠嵣艡湡◽昈崵ꗗ鏢䕷መ߈ݨ偝渮赪䧵Ꮫ旻杊ڤڄ㳌㲫處痴橈晭蛔ԒԂ⩇艉鼅穞遉噆隙晹ұᠷ霳ꃷꉏ㴧槐䋀⭀☥戮箳岔䎶戗ꁘ㑠ᴀᖠᆛޙݤڂҺᯂႨ☒紁䡤蓓虜踬㧨Ⴊ嵣晡湡◐Ԗ睠㝇Ҡ㙝䛀㡃䙄ڄ⪠㇈晨枠寰߄ᑤ㙀聮雠癤Ҥ䙐Ⴐ噠崄㗀ᗀ▶䙀䛀㡃䙄ԂԂᛁ粠ᒐҭᑐ懤Ꮐ㙀㝀晨柰ޕ㚼Ԃڀ罠㝇虨還ҥ邠䙠㸄䙀ҠҠတ䗐暠湤Ҥ⪠䝸☠橠ҠҠҼ▒▩ҡᕾ㖉ዠ■◟雖罨Ԑᖖ橠ҠҠҾ▒▩ҡᕺ㵠Ԁꛅ轣婿雛勤ҸႫ㙀㚠啩䜐ዠҠҠҠ噡溠䩀ᖛ槢剱ڀځ諣胨䙁晰肀ҠҠҠҠ◠䩀ᖟᓁҡᕠ躪㇀諣鎤㙀罠ᘀݣꙇ家盭㜗ꃀ芠▨⎞ᅞᄀ■漁癤⪙ᖌ晠歭Ұڑ䟠በᄨⵁᖀ硭ҡ㙈ҥԎҩ▬晤邡曠碣䙄Ҥ㕀ᇨ橪䙃孰ڐ噠㡀䆙▰䙀䁠ҰҪ䚨ዠ塴ҥ黎ᓀ㙀■ក嫢Ԓ⪝ꍍ叜䇁硨ҤڑҺᖀ桦䙀䛀⻀艠㡀⚠㟨桢䙂㙂䄈暨㹐⡈婠⋀䙀㙀⡀蹤䚤㩀ᨰ鑦暀ҰҪ䚩በ塷꒹厺ꋗᇤ■ᖀ㝀㽀ᛆҢ邁ݰݰ噠㳲㙒ᯀᏖⳀᣐҪڜҲ▸勠ڀᓪ䜰Һ橠㡀㛀ڨ晠䙀㩁幠䩀䳣噷ҥበ䝃ᣐ߂駀噰扚ᨼ桨䙃䛁臨木㙧䝈㩉Ҥ晢䙐ᆐ䚭橷ꈹҭ穼ቡҡᑈވ㙗㝈㩬晪杢孰枢詠㡀傸㠼ᘀ䙃䣆晰䙄㚀䁁ұተ邁ተݫ䙀ዠ杠䍄㜨颁ᔁ癨Ҥ䙒ԙҰ橬杦寱Ⴝ溇鵲㙂⎧ꔀ邡ᖻ㚟铈㤷⚠Ⴇ瑞ᓪ䛄䏈构Ҥ㑈ᇩ襄䙀䜦映鎨㛇坰仠ݣ浠官湢亏鶗⦱ҡᕸᅊ㙀㚰虀崄◣耤晴柟怘苨Ҩ䉟鹣獤ᑔ杨憀蘼躅嵷㠐Ҡ晢条孰晨ݨ㚔终Ԍ晤条孰曨ڨ㙖罰⫴Ҷ䙄䣆晨Ԅݤ☁ҹ絈枟廱Ұ废陦硨䠙ᑾ馡㷸湠◜限䆒ᖡ銤ዠԀ隠ⵎ㵢Ң⏓ꔆ邡ᖻ☠詠ᖜ幣値晤柟怘苨Ҩ䘀⥑ҡᔅꙃ宀桽璄Ԕ⪛琥誠ځ蝟晼躀㳤◣罥ꗦ枋弙㓀ԄҴ△令Ҷ䙀䛀㓀Ҥڐ偫ꋌ㵢ቡᄟ湠♀橤⤸抌晠乢Ԃ杰●靐繳ꎥꋠԈႢ㚁⛁癡睠ހᖐ此䙠臨ҥԀ蛈ᗨ㲀ԈႪ◠䩀Ꮐ㛂㩑ݢ鎡捰چ衁婷睠ᛄ㛒ⳀⳐҪڃᗐ䡂ᦐ晠乢㑆暦柄Ң晱Ⴔ☠柋㙀⠀櫡癱皺᧨晠乢㱑ڐ䝉㜐ߒ᧤晢柠暠ڒ蠀ᇤ⦱Ҥ晠乢㹑ݰ䚮櫰蹠軠ڐየ䣂㙐員霒Ҳ㩑ݢ陯ᦀ舨ڈ䘿ꡘ䍬䁀䁠Ҵݭᗀ㪐䡂ᣐ䑖柃㙀盟ꡟ雔终ڨ晠乢䙐暠湤Ң晱陱ڀႭހ肣蟈㳂Ҩ婤婶杠ᣅ躣蚠繐驑⪡ᔠᎫ㝂潠ᖀ檏ꡟꡟꡞ旣㛅■溿ꡟꡟꡜꙆ䝌㙁□㛨乨ᖄቢႡݠ昡溣䩀檃ᗅ䍇ꡞᅑ㛄ݰڈበ㡑梂瓣ꡟޘ滢亟ꡐ⥚ᯊလ畤䙐ተ晟陶聬ᯁꌶⳁᣐڔᖀ䩯ꡟꡟꡟꡟ꜠䜈案乨ᖄቢᆁꡟԊ▣躰▨ᖄባሿꙀ仭瞡▤Ԅ㩄ቢႡԀ桰榣ځ塠䃁ұᨿꡟꡟꡟꡟ陨㽐⚪Ⴁݠ暠嚟ꡀᠢҲ⠂Ⴁݠ曀晟虪㟴亂ݠ☥ݠ暠䙠ᖐ桰轠⭄ቸቫ㙀湣躰▨ᖄባሿꙀ椢㩁▤ԒҲ⠂Ⴁݠ曀晟虰纥ԂႨڂᄢ暠䙠㙐㑏ꡘݤ䁘ᒋ㙆眀㙐▨ᖆᕿꔁᖡ⍁Ҩ䙡暀罠⭀ᘅݠ暠䙠㹟ꡐᖬ㞀☠桠㛀楠柄Ҳڼ㞀☠棠暠䙠㙜㘿鹡Ԕ晤䙃梈⍨䟨䙂▨器㲀ዠሂ㩁▤ߔ㩄ቢႡ߀ꡟ暁ᖡ窀Ⴈᖰᖖ䙏䞿ꡟꡟꡓꅠ㝀晪栠ᄕ■䩁桠⚠因㻠䡆㇜湡満趪鉅䋈⭂㖫▣㚄ᖀ贒◑Ҵ硧湢㛆□䭠扠㝈ᖬ晤楟ꡟꡟꡇ鯀蹡ҵᓠᎪ㙁湢橠塠睠侠橮䆹㙃皡瓵縪彰䍄䔖㙆㙃□鎨㝆罨㻀⡒ᔸႰ棨ޅ㙻ұᖌ㲀ᠡ癡䃈ᄨ乨ᖄቢᆀݤ㝉㛃霤Ԕ㟌䡐橤桠䞀䙠㙖㒫詷穠晤ꏂዡҤބڔ⭀❉ᖀ䙅㫁遠瘈䙂Ԃ■䙊䙅䜀ݺ橠磰䌀⚨ᒌ䙅㫁詠溧黨䝐㝈ڀጢҨᄨވ䕀⥑ұᖀ桠㙂炠靠临㙀晴晪桀ޕ□䭠无⠐ᯘ晪佣鹠盯靰梀䡐ݠᘄҰᏐᄰ恠㳢Ԃ□ᖀ䙅㫁ꂠ嘈䙁ԉҵᔀᅊ㙂炠ꆠ㩠⫱Ҵ硧癡䝟袁ᗀ檀Ⴀ⚨Ԁកᐠ鉠厤ڄ㙂■晪佣詠薰晢ڒԊ⋀ᑔ䙂䝀□䭠懠⠐ᯘ晪佣繠盯靰檀⪉▩ᖀ㙅㙂盄ԍ䡀䁐摹ᖀ䙂䝀ᖁ䩀穿ң仠ᘄڂҰᄪ䚵Ҳԉ䩎晢䡏㙂炠饠㸂㙡ԝ侺ꋀዡڕ簏渴㙀晴晪柠ޕ㛀䩀渴㙁ҩᖀ㙅㙃▢䩁⍖睨㹉ꕀញᇸ☤◠㺢㛡Ҵ硧□㝇㛀圤ڒ湼ҥᗿ☤摱ᑐ荝晧轰筨杰䡂㙆㛠㙐▨ᖆҢ◤㲂߃■产黨䝐坨杰䡄敱ᗈԈ䙘坰捨杰䡊㙅湥儵硠罠瞲肠ញᇼ㛀圤Ⴄ㠼䡐晼梟檞䕟◠㸒㛂☢㚄⥾摱ᔈዪ焲ڱԘ暀楟ꡟꞃ雄䝂ڢ⪟ꡟꙏ柱ᛟ痤䜥寋雠◠⥾摰Ⴈቯ袁㽀勠作ꋂ☰ᙕ㯨䡈坠歨東ᗼ㙇▣橢㩢ᖳ雨䋭叜㙇▣橢窏ꡟꡜ䕆䡕㙊䗈棄Ԃړꂐ檂䙓傶湤䩂㡁Ⴀ捫꒿ꡟ╡滤阯梁⢵屑麤㒖紞▣橠桡剑◼晶䙓斞☡ᖀ䡁䨳雨㲀⠠◟䕈桨䡈杠勠䛭厀ተ᧵㯤ڂښ脕齘梀榢䕈曤စ䮫雠◠㝠Ⴐᙟ檠䡀睠籙麤⡂㚄■橡䮪遱ቺ⚘䡂㙈箋䩀䡁ቱቹ麠ጴ紞䕈暤څ䮫雨☥ꡟꡟꡟꡀᣀ䡁ҵᔠڪ㙁□ᖀ塡㛀㫀Ꮔ埦㙂炠酯硠侨ⵀ橢桠侶薨䞨䙂ҫ髤㪀ᴁꜟ智柠㛲Ԋ┠ߔ䙄䝟蟨ڈ䙘檁▨晨桡橱ႨڤᄁԉҥᗡᰀᏔ机㗤ڒ湻ݨ㻄ڒ紞溢躠በ詉ᖨ晢䝏㙋◣ᖀ詿ꡘᇨ㲄ᴁꡟ暳曨በ遴ቢႡݠ蛟Ꞁ㛄㜔㙁ᖄ㹂⤂数ᆐ䙉䚄Ⴀ卨ᒌ䙊䝟袁ᖡ塠䡗ꡟꡟꡟ䘁湡簈䥈媁ᖰ晴桡楦ڂ詠詸ꊚ噱ݤԁݦݢ詠穴ᓙҨ晨条㙃䄄ሤڔ✣仠䒀⫠ᒠꊠⵂڢԊᘁ窠ᒠ⚰ᄪ䚨ዠ㝀㫤⋐䡌▢湡䭠姢ԉ䩌盤ᆆ㙂炠詤䙔㠼䡑ꃠញᆘ☡ᖀ㩠⫱▥侺ꏁᣐႨԏ眒◁ҵዠ邀ᆐᘐ曈䙁ԉҴ晦䙒䝂盠በ硠蝠☠ᗀᒠᄁڠ誠㡀䨡▭亠⤠ݰߕ簏梀⚠澸晢䙒仭醿ᗀ䮪鉁▰晤䙂㙂㛠㙐▨ᖆᕿꔀ窀ᆐᄪ䚢ᡂҩҴ硦㹢ያ■䩀歱臭屐橤納摱Ⴈڄڄ㩄ቢႡ߀ꡟ晵ᖀ塠侨⪡加ᄀᏔ朢ᗀ寂ҩҭ䡶頍摱ڈڊ焷蝠屰桺⤠Ұڍ蛀በႠ嬼ᯐ䙅䜨ݺ櫠ޜ䙈▥ꔄꕁ旰朠湤Ҥ㙂滠Ꮕꡟꡟꡟꡟꡐᖙ▱ᛁݠ暠䙰䘿陥坠㝊Ⴁݠ暠嚟ꡀᛑ终Ⴄڀጢꡟꡟꡟꡟꡘቬ橪棠暠䙠㙘㘿鹢绠⢅ݠ暠䙠㹟ꡐᏈ銔ڀԀተᅁ㛊ڄቨԜ㲀ᄀᄡ盠⤠橤□Ҥ晤禀ݰݴ䦡癲ҡҤ晥ᣄ䝀㫃蟄Ҥ㙂滠ጠጵ㙀湠炃地ႠݠጠᏅ梁Ҵ檀園Ҹ叄ᖂꙁ敡㙀癈㙂Ң㩴Ԕ䙀紁ށ檠僒㙉ҡቨ颡暠Ⴒ䟠ᇤ⪙Ҥ晤梀檳洢誠㝀靰Ⴔ䁀䙀䛂䄋䙀ᖐ䇊㩴ڀځҰڄဃ䛲Ҡ嘀㱂⇿㙀■厤㚐㡀⚠晠乢ቱݰ䙮㜐Ⴀ⚤⎂歭ݰҪڀዠ㝀ᦈ桢ጠ㙀■珄䙄㐡㻠ᖀ浤䙐ݰ晀㬐䡁Ҡ癤◂ተݰ䚮袀㡈㐑ᔠ䲪䥍■ᛀ䜂㙙ұ㑚ጡ穳㚪ᙅԀቫ黠ᚮ鞖Ⴀᒀ蟄Ң晰蛤⪤暀ҰҪځ梀䁸㝀晠乢ᖑݰ嵤裠㙂䪨晤䙃䅁ᒈڤԃ噰䙰ቶጠ㙀㚅ⵄ䙢晰ݨ►ԀԀ橺檠䣀㙁▰䁀杠㛁楠䞠婢ұᖜ晨䡃䛊䃈暥ԀႰ㙴ڀᓁ◕◠橠壠㛁▰䁀⤠ᔠ晭暠ޒԒ㩴ᖄ暀Ҵݧᗀ橰㧢─眴䡂㩁ҨҨ蚤Ⴀ☠⇬በ㙁榠井棄⺡㻠ᖀ柞㙂䐜䴀䙀蚀勠⭂㚁⠐ᆊڂበደ鐈晦屢Ұߑ䟠園ҹҸ鉤㹠Ҵݤᗀ䚄Ⴀ⭀ᗬተ㙁■贠䟀罠ހᖨ䡂䣆曨ڤԃ噰盠ᗀᒶႬᒀ柄ڒ晰㛈ᘂᓱ䛁砣䙨䅂坠ᙘᖀ䙅㙁㚟璆蚀䝀ݠᏂᅒ䅁Ⴈބҳ噰Ԝ㲀ᖠᆛݣᖀ塠䟰◀㱄暀Ꮤݡᗀ䩐㧊㩑ݣ暆㩁Ҩވ蚤ቮݸ晠屢Ԁ鍩準棂晰ݠᑔ䡁䅁ҨҤҴ▫漸ᖈ䙀䜞✪ڀᗰ蹺⍠狢ԖႠ㚯ᙈ㙃噰Ԝ㳃抆㩁Ҩވ蚤ቭ雸晠屢Ԁ鉩準Ꭲ晰ݠᑔ䡁䅁ҨҤҴ▫漸ᖈ䙀㙀胨Ԇ蚀ڸ勠ᘂ黑㙀胨䙠䩂Ҳ▜Ꮪᗀ㙂灠杤䚂Ҳᖍ銤ጡᇺ㚴ᙍ䪡睠㛀⡐ቬ㝁矡▨䃂塭䛘癤ځ数ݽ钆蚀ڠ◌晨䙃䅁ᒈڤڃ噰䙰ቶ䙅㩁ᯈ䜀䩂ԉҴ癤⫢ᇣ杰ᖀ磠㚁▩ᓰ䱨Ⴀ㢆橠䡀㿰◐晦䙂䅁ባԁ嚄Ⴀ㭄伴䡄㩁Ҩ暡癢Ԋᗁ窤ᖨႠ☠栀ᖐႨ⫰ቶᓀ㙂◡詠䡠䁈砈橨乢ұݣ䙄Ԕ☣令◠ᒨႨ☠栀ޒԚᖀ鉤ҫ㙃㞃䙀䩂ԉ䙈庤ᗁᄚ㚶ᛍ䡠㞀■晪汤䙐ݨڦ蚀Ⴀ⫴Ꮓ劆䜖✪ڀᖗ靠㠝裌በᯁᑈ߈㝄♁Ҹ癤㙠ᐣ⍺橠姀㙁ҭ⠚Ⴋ㙁湡洠䟂ԉ䙈䚄ቤ䙐߈چ蚁Ⴀ☠⇬ቸᣐᄪڂ梀㡨婠晦䙂䅁ᛈڄԓ噰蚌晠䙁䛀苭暠桠Ⴀᦈ晢屢ҰҰ巤裠㙂䉴Ꮓ嚆㙀珠晡霒ԉҩᑼ鞖Ⴂ■ᖀ㩐⦱繨◠Ԁޕ■䴀䙀罠ᛇꔂ獤䙐ڐ䚮袀㡈㐑ᔠ䲪㛀替躕Ꭲ晰ݨ⋂ᄀᄚ☠璈皤ቭ䛘晤䙃彻ݠᖀ㜀◹Ҥ癤▫㛁■䩀ᓠ㚁Ҩ晠屢ᯐҨԆ蚀蝠ݠᗬቨ┥皧誀䡀⠏ꡟꔎ獤䙐ڐ䝎袀㝀⚦ሼ旊䛈䏐䝎㡠䧡▨晤柠陯胰䡎詰䧉▭躤ዠᄀ蚀ር䩑ᔲᖉ袤Ꮄ䛇菨ڤڇ㝀➉粤ጡޚ■䩀䩑决罤ᑢ颡㑵◠柄Ңұ繨庠ڂһ曤ᖀ䩐㧢─眴䝇ᄀݰ◕棂晰ݨ☢ᄀᄚ☠针皤ቭ囸晦䙄彻ݠᖀ顠ᇰ■晠䙇䅁ᯃԁ塠⠈Ⴄ墠ጡޛ䄈ڈ㠴圻盤ᗀ⏈Ⴀ◠蛈በ㽐㛠ᖈ柘廰ڑ栀䡀㡈鰸桦䙂䛀荨䚄ڂҺᖑ褴䡇䛈䃊ڀዠ㺨Ԍ普䙀䅁ᖈҤڃ噰蚌晠䙀䅁ᒈҤң噰䙼㲀ᖨႤ☠䩀ᓠ㚡Ұ晠屢ᖐҰ䙆蚁杠ݠ☌ቬ㙀■䴀䛀纼㹠ቶꚠԂ杰ᖀ㝀雘勠Ꮒ暯ዠ㚾ᘈ㥃噰ႤҾ⤂昀橨Ԉ㛶硫蠤晢杫䫍溡䩀ᖐ榹▸癤ᖢᘠ葼䩠暄Ⴀ䭄⎂此䙠晨ވ㹀㢈婨媠ᠡድ□❀橢ԑᖈ晨䙅尀衪歠䙄▫瞔䁄⥁Ҧݢ詠桠妱ᖜᘀ䙄㙂稡▤ڂԋ勨⋂㚉⋀湡橡㩐⦩ҵ諢Ꮂ䅁Ⴈބڦ睰☠⋂ᓲ䅁Ⴈငڲ晰㝄ᑤ屢ተݨڢደ虨卧ڌ乢Ұሑ曨ᖛ䝱䙈ڀᗪ㝂□倁皂ԑԅቢ鞀ᐹ㚀璦蚀䝀㫀Ⲕ䡃㙂□叄䙤▫漸ᖈ栔㥐ݭ暠ᖜᄑҬ鉤Ҭݥ盏ᙅԀႠ䍘☠栐㥔ݠᖀ洂㙙ҵ㡚ቢ䙐߈ލ墀㡈果☠䙆㙄皠咄ڗ㡈➈鉤ᖠᏐᆚ檠桠㡈᧨鉤ᖠᆐᆚ檠塠㟰■晦䙃㩁Ⴐ嘮㦠㙠噤㲀ᰀᘠ暼䩀嶄△漸ᖈ䙃㙃䃈暤Ԃ晰㝄ᑤ屢ዠ晨䚈㙂◀卦麬䙄䅁Ұ層衠㟰■㹂⤠ᔔݡᗀ婰㧈婤晦柘廰Ⴚ檡䡀储婤晴䙅寰楠湤Ԕ㘸ប☠䙇㩁ቨ曤Ԕ▻绨ᘂᓴ䜨✺漣䡀䝀䋠ᖘ䡃䥂㙐孤詺枑䙈ݢꔠᄛ芭暠߀㚙Ұ晦屢ᯐ߈ݦ蚀曀ᖬ普乢⪰椠湤ڲԙ䙈㺄◧ዠ□譠䛂㙒⎀犰በ䫍■橡ᓠ㚡Ԁ晤屢ᖆڂ蚨በ恨砈橨乢ұݣ䙄ڴ☣仨◰በ㝁ᓀ◀ተ曀ᖬ⋀䙄㛁湠檡ᖑ䦑▰癤ԂႦ晨Ⴈ㝆睨㛀㚐ተ㝁ᓀᅄԔ□繨Ҷ䙋䣆晠湤ڲ晰雨⋂Ꮄ䜬⠚檠䣀㙁ҽ⪨暀Ⴐቭ暠በ曈ᛆ纬栌㥔ݠ●衠䇻欸ᖀ⪢ᣐᑐ䡈㞂ڙ䙈䚀␆㇕▢⍠䙂ڂ㩴ቶ䙈㙅珠楤ڲ晰曨ᖈ暀ᖐݭ暢በ㝀䜘ᖰ⤠ᔔݥᗀ䪐蹡Ԁ晤屢⠐ݨႦ蚁暹ԑቾ獤䙐ᆈᄈ㙗⚠倩ቤ颖Ⴂ□橡䳢㙑Ҩ癤ᗁޙ⻀曡晰罠㻀㣂ᅑ㙂苰䚎䦠㙡Ҵ晬邂ᆐᒐ䚮䦠㙡Ҹ晴邂Ⴐݪڀ橰⦱繨◠ᒠᯈ♢詠衰㚙Ҩ㲄ቤ䙐ݰ䝍䜰罠ᗀ䊄ᓅዠ㚀ሡ塠㽀Ⴅ黢麀ᒔݡᗀ䩐䇈鋠ᘂ黑孱ݨԄҲҲ勌䙀䁠Ҩᒈڡ忐㙁ҡ⠈暡ҧ椠癀䩂Ҡ㠼晢桟Ԇ榠䚈ᖘ螑䙈ڐበ䣂㙈Ԉ㹇ꈪᯂꔆ汭ᆆڂ詠㩟黚婱ڀԀހ瘼亐ҷ㠐Ҥ晠䙁䛃䏐幠㵣癠Ⴄᖘᖋ㙀盀▮㩘ᯀⳜ晢柠繡稼伀橢ҡҥᎾ鞡晠苮晠䡀Ⴀᛄ㼬桀ޙ㓀ҤҢҪᖙ鋢旑䜀ڜ涠Ҵ▸噰㲀ᄡ暠Ⴚ躟ꡓꄈ㝀晠䙁䛟芰噠㵣癠⭀ڀᄡ⛛㚼Ԏ䧠ҡҠ晢杦憀瘼亐ҷ㠐Ҩ晠䙁䛆䏐乎㩘ҫ潈Ң杤ᯂᑂ躟ጤ♩繨ݢꙅ䛀椣ԁ塠ႠᚨҠ条ᣅ眠ڈበየ婠ᘀጠᄀݰᖀ㩐㦐幸Ңቢቡ杢詠በ㠠Ҡ䑖䙀㙁㖀䙁霒ҡҨꊤүᣐҨچ隐ژ喴ᯄᗿޟݰڏ隄ҲҩꕀԈႢ☠䩀Ꮐ㦂䉑ڀԀހ暺洠䚂ҩ婠ҸႫ㙀ᖀ䞤䙔⛻劘ᯀႠݥ湠亅竂◀➼晠乢ቱڈҥԆ梘㝀晠䙁䛀胭暠桠✈Ҡ㹂⤠Ҩڂ誠㩓禸噤㲀ᄡ䍵椰唩隤Ⴀᛄ蜶䡂䛅㢁■婢ҩҭቴ鋊䛘䄈曈䌉珿㹁㙄ꚠҴݡᗀ㡀ᄠ❁㑈暀Ұڐ䙭䦠㙡Ҥ聠Ҭݥ湠በ㛲㙊ᙁ粤ጡᘦ芣䙁塠䎡ᖔ㱄暀ᄀ棳蠀ԔႠ⍔晪桪斞㛌㗤㚐㨹Ҡ癤ᖢݰҪڍᗰ䡁Ҡ晢条孻ݡᖀ㤐Ҡ噤㲀Ұݥ滠了⍒㙒ᖥ㱚ᄀᐡ刃霚ꌜ㶝⪥䱚ҫᣐݰ䞉㚄ҺҩꕀԈႢ☠䩀Ꮐ㦂䉑ڀԀހ暺洠䚂ҩ婠ҸႫ㙀ᖀ䞨㥆聨侄䁀⤋㙀⡀鑨䙅溂ݠڀԈႢ㚀叆蚀䚚■晪ꏀᏐႦ誀眠◺⠂Ⴁݠ暠䙠㘤㚒ҡ䩍蛤ړ⋀■ᖀᏀ㙢ᖅ糌ቤ䞀䙠㙐▨ᖄሼ䑖䙅ᨦᆀ曯隗靸ႦҢ醂ᏒҠ湠䩀㡁Ҭ晨桠䝀ᖄ♁癠㨹ұᨿꡟꡟꞏ雄㛐㨹ұᗡ♇䜿Ꞁ咄䚤㘿ꊥ㑈暡ተᆃ䙣䩐㡈⭀ᴀ✤乭楠柄Ԓڌ㞀㱖䝇㙁㛌㝔颀桯ꡜᑢ䡆䜿Ꞁ伡癢Ԙ婤㲀ᠡ◕■䩀䡀㽀㚀ᗀកᏔ朤ᗀ㡀侨⬠橤䙁㙁ᖈᖀ磰㺁ᖈ晪佣Ұ杣ԁ塠⚠⚫ꡟꡟꡟ癀詠鄴㟄䁐橴䙃㙂㛿ꡟꡟꡙꔌ晨梐檳盟ꡀ㵒㙽孨蝭ᖢᘈᖐ䙉暤Ⴀᘀ㪀ᒠᘈᖁ▤Ҳ◀器㲀ᠡ鹠䃈ԄԄ㙂■䙄䙅㫁葨䚄ڒ湻曤▸Ⴋ㙃Ⴟ橠㚒Ԋ┠ߔ䙁㙅㛀◰▨ᖄባᅗ晠□□䭠峢㚒♢㞎桘ԕ溡橠磰䅀勤◠␅ዠ□亚Ҧ睠⭀㣄ڂ暠䙠㙐⪫葠ڀᗀញᇬ☢亦☪息虡粢⏀Ꮤ朴ᖠ園ڊ⪟ꡟꡟꜿ蜰癰▨ᖄᒀႨ䝉㙅㛿ꡟꡟꡙꔍᛁݠ暠䙰Ұ桰睠㻀㓔ᗀᇠݿ橡䡀牉Ҭ晨納擱ᑐ晫㚄Ⴀ勠◠ᓽ㝂䝔ݨበ偩ᇨ晢䙂䝀㛀በ䡀侨Ⰰ桤䙅㫁湨䛁暰罠卨ᒌ䙄䝟袁ᆀ㛲ڒ▦⬀ᗂ䘄䝂誁䡀䡐ᯘ桨䙆䛀脨朤ڴ盈Ԍ普䝆ᣁ㙈ᄤݷ轠⭀♍叝㝄盠⡠橢ڑᖤ㹂⤠ᘐႨگ碀䩢□䩚Ԁᐠ牺橠㡀㡐ႨԀዠᏔ朮ᖠ䡀侨Ⲁ桨⪡ᣐጰ號ꡟꡟꎝ器晣䙐Ⴐ湑ተ⚠㽄ᑖ䝆㙂㛀圤㚂ҩԅᖃ⋄㝄眀㙐▨ᖆҡ乺ҫᣐተ噰ԇ⚨䋀⭂ڌዠ□予⍒ԁԅᨿꡟꡟꞏ雄ڤ㘀ᇨ普餍䝘䟡◠ᖨᖄቢႡ朣䗈ݨޅ㙴杨☠⡒ᓀ㛂ᒀ䞤ݴ㸿ꡟꡟꚿ柰ᆈဎ儴㟄䁐桤⤠ҰႭ蛀በႠ♼ᯐ䙅䜀ښ櫠ޛ鹰ᖅꕆځ蹠䄈曤晠㡁ҭᒁҡ䵂㙈ݨ㡆睠ᘀᘄڂ暠䙠㙐▯ꡘڀᗀᖩᆔ◠橠棰㽁ᖄ晦桟꜠碡▤Ԕ㘿ꊡ粢ᒌႥ湡◂⍂ҩҩᖀ棠暠䙠㙐㘿鹠晨晦桝꜡■躟虐㢀鍧꒾ᅋ㛁湡ក埢▱Ұ硦㙡ݦڂ詠婸⪣ꏈ䁀䙄䛠䄈ԄԄ㙂⠂Ⴁݠ暠㒄ڄڂ湺䛄ᗀᖩᇠ◠䩀婿䩃龌☠䙃䜆Ꞁⵄ㙰虨勠☢囊㙀湠溠ᖨᖄቢႡԙ□■躝▷轠ⳇ睢ꏪ㇀负暍䡐㽀㛤⇰䝂㙂⡀豤㙐罠㛀ጠጢҰߐ晟陦篊♢⫠ዠҰႪ䚡ᓰ㺁Ҡ晨佣һ朠ᖀ橽ң仰Ҷ孠㙀■䴠噢ҡҩᨿꡟꡟꞏ雄ڄ㟄䣝ᒁҢ廰ݰ汱⡴㘿ꊥ襅厢㺃䝍蛁ޗ虨➼晠䙀㩁㡈暈㙖罠᧨鉤満ҴݥᖀᏀ㜢䉑ڀځԀ晨ҥԂ䛈Ҡ婶䙀䛀⻀槤Ҥ㙁艬䚀ԈႠ☠亀浰䡁Ҡ晢枀彻ݠ●靐罠ݠڐዬ㙀⠀汭䡠㟰◀晠䙂䅁ႨԈ㟷䡈ꑴ㶸በᄀݰڈԄҲҩҤ晢䙁㙀湠䩂Ҫᖥ籼㡀ᖄ棢ᄀ㙠㹠亄㩔▩Ꮓሂ詠䡀㞀■橢杤孻ݠᖀበ⛠■鉤үᣐݨڅԀႰᛄ♴屢ҰҨԆ䙐ᇸ⪠䑖䙂㙁⠀晤䙔◃伸ᖀ䙀㙀猠䙆隐ڸ勠ᗀየႠ☠亀洃噰ݠڀᄐҠ㐀虡霒ұҨ癤Ԃހ杺洠䙂ҡҤ衠ԗᆀᕂ詠䡀㞀□ቮ邡折滠亁⍃噰ݠڀᄋᆀ㒀虡霒ҡҩበ㝁ҥ樢詠䡀㞀■橢杤孻ݠᖀበ❀■鑦үᣐݨڅԀႰᛄ♴屢ҰҨԆ皀ᇸ⪠䑖䙂㙁⠀晨㚶硫蠤橢杨孻ݠᖀበ⛨⪠鑦ҫ彠朿詠Ꮐ㙁噠ݢ囋䛅㨁▨㙀麸Ⳁ晠乢Ұ朰噄㙒Ҳ⏒姇豠䳂㙐噄Ԓ虠Ⴄ蜶䡁㙁㚂珤䙦睠ᛇꡟꡟᔐݺ辣塰◹Ҡ晦条孻ݠᖀ㡐㝀ⰐҢ析尀棲䟠ޒҰ嘔䱄㞿ᄟ♠◚Ҧ罰㫐ڀកݻݳᖀ穳憱ᗐ晪枘孰橰䙄㙐㡀⚠ᘀጠᇠ■亟ꡟꡘ䋀㴖灭ݰڈᅍ䡐罠㫠ᘘ䡊㛀曰ڈԄႠ伔Ҡ䡉ዠߐڈԄႠ䭇ꔂ鞂ᒢ杰ᖀ㡐滀ᖬ晬枅䧆暨Ԅ㛐䁁Ҥ聠ᄡ㣣榠䩀硠⠈❈橬屢䱐ጰ䙭䡐潠ᘴҤ䝈㙃◠䩁ᖒ傐婠㱖䙉㙅䄈暈䘿ꡟꊼ晶醂⢥ᓁ詠ڄႠݠ㪀Ⴐ⢅湠䟠詷齨捤ጢᰀᏔݳᖠ㙤ႠᘰҢ析尀棳蠀በ✈ҩጨ浭ҰڋҠ㩓ᓙᖽቢ䝒䛁溡柄ڒҩҹ窤ᄖᄆ㚀ᖡ暄ႠᘰҠ䡑䛐䄈杨㠴纂ݠጢᯌݥ湠䩠詰⚠䠐橮柩転䊑䟠ԔႠ㫀Ꮒᅊ㝃⻀濤ڲڣ滤㺀ᄌҠ滤亄⍒㚂ᘁ䑚ᄀᒐ暰䙤ݧ䝐䍆㧢ᗱ⋀ᑂ蚨ቡ⠉佸☠䙅ᄟ曰ᖀ褠Ҫᙁ糢⡏⋀□䭀䬂㙉婠ᘂ䪇⋀■䯀Ҵ△盠♴栠ޕ皢洠䙂ҩ噠Ꮒᓴ㙁胰噠崒晰ݤ䃂ᄁ⚰ڐ䚭䜀◹ڈ䁌杠㛉㚀ᖡ硠ԂݠᗀየႠ☠亀洃噰ݠጰበ㛆椨ޅԄ表ᦈ㲄ᄖᄆ▣亀ᚠ蹪ᖀ智醁⋐ᒐ噸ҧ㝈嚐ቶ䙅䜦Һ桥碀遨ᄀ䁐䙅㩁㥈䙡婰Ⴈ㽅ꕂ⎢昀晨ԅ癠ቩ彼䁀䁠ݶ晠亅䪠䡁Ҵᚾጠ㙀煠ڈ㥆聨侜䁀䙅㩁㥈暅癠䁉㝜䁀䙁㱀ݰ䚎桠䦒⎠ᑖ杪䅁Ҩԅ晠㡈㐐晦邡晡脪ڀተ彠ᛄ♴⪡ᣐᘃ䜄Ҡ䨹Ҩ晤乢ұڐ䛍䦠㙁Ҥ癤ҥ䛀ᑈ䜤ڒ晲坤ᙔ⤢ݻݳᖀ驷ꈺᗽ鉸Ⴋ㙂湠亀㳣噲因⢃牠孨⥈䜤ڒ晲囤ᏂႫ㛉朰ᖀ衰顨雤㢀ᄌҠ㚾虭婴墨媄晪䙁䛀胨梆蚄蝠ᘰҠ䝆㙈溠䩀衠顩逑竣Ꙗ孶晠ᗀ詰⥚ᖡ㡚ҫᄀݰᖀ話肘㝀晬歭ᣐᕐ䙉蚤Ⴀ㛀䓂Ꮄ孰ᆍ暠በ你⭀䓂ᓴ孴朠⎀婠虰勠ݪⳈ㙂皰⺤ڢҰ朐晪乢䱐檣ځ塠ꂨᄘ䁔⥁Ұ暨Ҩ眰庹ԑᕿꜛ廱ቨᆄ߄⪦ҡ袖䝆䛀◣◓ݢ☙ڀ桲ጠᄀݰڏ隄ҲҩҤ晢旡㙀湠䩀㡀⚠ᘀጠ㙈皠叅晠Ⴐᛅ敂䙁㙀皣针㙴圹Ҥ晼䅢ހ鱠⺡衰䛠皰予㩔⠇ᛃ蜡蝀需㺐予㩂Ꮑ步ᄂ晱䛠㙀㱄暀ހ隠⺡蛐需劰䉜㑀ᣐڐ惀ᗠ躨嚬㲀ញᇠ◥溓ݠ蚈卤ڂႢ䙁㙀湠䩀㡀⚠ᘀ䙎䜿暼䠁Ҡ▰⪰婪ᯚᣐᄪڈበ耐■㹲⤠Ꮤݰᖁ姀㙀囀㲀ឈᄀ▢鯦隐ڠ芌晪乢䙐ᑎ蚀߁嚹Ҵ癤暀ᣝҠᆂ眒ԉ䙉ڀ⤶Ⴀᒅᅄڒ晲ݠ㶘嵣Ҧᙂ詠驰杠䍄㛖䅡ᔐᆐ䝎䡐塯虠桢⤠▰桨Ԉ㡇⚨廠⡒ᓀ㝋㩑䛈ԔႠ䝄ᑖ䡈㙋倰䠮㩙ߛ伔Ҡ䙎彽Ҡᖂ誀ꅑᖨ暌桤橰毨ᄡ癠纹Ԁ桴䙅㫁癴ᇠ塠塨䠅⠚ᒠހ杽溓ݦ睨捤ᗂ⪬ᆅ湤ᖠ㡀侨Ⳁ檌皥ዠߐᖀ㩐⥙▤暍䶁ᔸ皬㒇䙀Ⴀ罨㓬䝈㙋㛀靤㞢ڀ婠㱖䙁㛅□溁⎴仈☠㒀㙠ផ滠亀㳢ҩҽ㙶䝇ᯁᑈޅ㙴Ⴐ罨ކᗀ㙂盠ᖂ踲㛱艭ݢᄁᰀ豢ᆀ㛲Ԓᯀ䜢ᗀ䛀溣◓㛀虨卦婰柸ᖐᆐ䙮㡠蜸勤䒀㙡ᛁ㙈ᑈ乨ᖄځ乨暀⤐氣ԁ嚔Ⴀ佤ᑖ䡊㙋▥溡乢㛺◉ꎛ䶁㹹㓀Ҥᅄ㸿ꡟꚾᄶ㛀湥誂衠☈Ԍ㲀㷧㝄Ⴐڨበ硨ᦌ橴䙈㙄㚂琤䙔◳堍Ꭰ颚Ҡ▢◁㫲☑Ҥ桰䙎⋀ᑂ蟄ᄔ□ҽበ湻⋇□溟ꡗ臩Ҹ暆䅡ᒁ㙈ޅ㙴Ⴐ罨ބⳀ㙃榠ᖂዠ睨䭄ڂ⎬ᯅ湡詢譢ݡԉ紴䡁㙀湡轣塰廀劌晪乢䙑ڐ姂በ♹◈橲䙇䜿ꡟꡀ顠息ꡟꡞ␉⻑ᆄᨤ䙒ڋ勠⬀Ⴛ㝀湢玤㛒Ԛᖁ䉈暀ᖐ柨Ԅ㚰蚸勠㚂ᰀݰ栨ᄅ癠ڨ媐㩖䙇ዠ□䭀䩀虰卤ڂᄀԀ湨ᇨ㙂Ԑ暨㹄⤠ᐠ晭暡桠你㫤⋀摢ᖐᄨވ㛆睰ᙘᘀ柟㛃湠䞤㛔□ᖄᘀᓀ㙄灠晤䛄仈ᖉڀᠡድ▢ቤ碀硨ᄀ橰Ⳁ㙅□詠㳴终ݠ㣂ᗪ㛄湡詠㡀禱▥㱚ႬႥ椨Ⴁ眰聩髤㢀ᄡԄᓂ詠ᖒႠ嫠ጠᯐ⚰ڑ䛈ᖐႨᖰቶ杠㛃湡䭀䩂◨Ⳁ晲乢ұቱ䟠㡀偨㟨晰㙥㝄□鎤䚲Ҫ劔ጠԀᐠ杺橡Ⴁ你䭄♴䝉㙀湡迁癠纹ҡጠ䙍㙀湡源⪠ᔘ暨智䙁㙀湣佣塰☀䙬暆杠㙃皠⚣地桩髤㢀ԀᏕ朰ᖁ硠彠㻀Ꮒұ⠀☠亀ᚠ躘嚄㲀កᏔ朰┠ᓴ▩ᖜ暈䝊㙄◡柠朒ԉҥቢ邂ᒛݳᖀ㤐ҩᖤ晬䝁ᯀᑀᅄҠ躙ډ⠚ጡݰ暠蹤ڂҪᖉ輴乢ұҡ▤ԒҪᖍ輴䙀㙁ᖋ◀㡐罠ᛄᑔ䡁䛅㠃䙡曰纺ᖄ桶䙁䛅㨃䜠婢ԁҥቤ髊㩁ң䙤Ҵ▫仨Ꮒ⡇⋀ᑃခ婱蝨䩰▶䙇㙄湢珄䜢ԙԙ㩶䡈䜿ꡟꡀ顠覺五ᘂ掁ᘐᓈႤ߆睰䋀㒀ⵈ⻑ڈᐩ䜐㽀Ⴄ暠ᄀᔐᆄጤҢڹԐ䙪䙀䛘■䩀顠塬በ⚆㙒㙀㚌ᖁበ顨ڀ䪀ԀᛐᔄᐤҤ⚡Ҥ普䙆䜀噠㒢ᄀ虨劍በ䝋ᯁ椰丄㛐聯蛰晲屢ҥ皿誁園Ԋ␀ߔ䩀㙅楎蚀㙗齠ᛄݮ䝂ᄀݰڈበቨ㐅⠚Ԁނ榠ڨበᅈҡ⠚ዠހ暺誠㩐ዹᖈ晠条孱Ұ䚮㪐蹩Ҥ䁀⤋㙁㞃䙡嚄ҲݠښҠ䣆晨Ԉ㚄滈ҭڀԈႠ☠溏鶒Ҳᯆᛈ☋开蚀嚰淧☈☠ݢᗪ㛀■亀洒㙊ᖍ㱚ҫᣐڑ䟠㛰䁁Ҡ聠څዠ■ሡ塠ቨᦈ桠䙁䛀脨暁癠纺ᖀ㳲Ⴁ旰ҨҥԄ杰ᛄᑖ䙁彻ݲᖀᏀ㙁▥ተ靤䙐ҨԈ㡇㟰□ᑾ㕋㙀㛀⎀䚂ҡҠ癤劂ݻݧᖀበ❐◰晠䙁㙀⠀汭䦠㛂ᖀ㸔繣㑿桿暏梐ቨ栌檖䩀㙍湠䴀䜂㹂ᴀᑖ䡂㡀■満ᖙҨ晼橦柟䅁㥈ڤң噱因⋂ᖶႰ■詠ᓠ㣡Ҥ梎杠㛀㚣䝄㚲㹂⍠ᙖ䡋㡀■譠䬁癲ҩҤ暀ᆔݡᇠበ㻁勈晦乢ቦ晣ԁ婸躡婠ڄᄥ⋀曰ڈԄҲҭҤ晢䙐ڐ晀㵒㙊ᘁ⬀ᄡᘵ皡侎䚄Һݠ㒄ᄡޕ◡詠㤐ҩ▩ጠ沀ᄀ梺躀竷㚨Ԍ晦桠▥朰ڏ顠㾀▰橤䙃㩁䁑蛨በ㽀⚤ᑔ屢ተݫ䙀߀◹Ҭ䙂⤢ᄀ湱橠䩐熺ᖕ㤤Ⳁᣐߊڀ桰彠Ⰴ⎀桠勢㙈ڤڴ▫勨㒬ቤᣐለڥԂ覽因ᴒᓸ㙒䕟ᖤ朠◸➼ᘀጠ㙃熠Ҩ㢔嚂ݠ㒚ҡ㝀皪漡癲Ҫᘕ㑚ቫ㙁盠ቡ嚄Ⴀ䋴Ҡ枅䥂㙀蹠乒ҹ䙈◤ᄀᆔݺ⚀橢ҹҥቢ邖Ⴂ■䯠Ҡ虨勠ᰀႫ㝀皨♤Ҵ◫卤⢒顭ҥ湡躀㳢◘噤㲀ᒨႢ☠䩀壠㦂䉑ڀᒠހ暺洠䚂ҩ婠ڂႬݥ湠衠㡐◹Ҽ聠Ԁރ杰ᖀ声䇂□塨暀ᆐߊڀ橰⥙繨▶䙁䛀㧃䟈㙂◑ڠ䁘⪫ᣐߊڀ桠㾀♑綸䙃㫁葨ᘏ渢⛁Ҽ桢⪣ᦀ晨䠤ڴ△亐ቶጠ㙀皬⺨㛤黈ݠ㒚Ң䛒㠃䙄ڲ蹠ᛄ蜶䝁㟀㚄⺤䙢ޙ繨㺀ዠ⦰ڐ䚎橰䦚ᖀ晢条䯍胨暈㚆砐◀晢乢Ұ樨ဈ㙶盀ᖬ暎乢Ұ樨ᑨ㚆睨苠㓂ᅊᣐ暰䙄㝴□ᖜ晢占Ԁ牺躁䫐䡀Ⳁ晢占Ұሐ䞍洄✣勤㒀ᄍҠ溠橠㩐⥑ᖄ晤析尀棲䟠ސ罠ᘴҠ䡉䜶晱蛯顠◊ᖀ桺䙏䛀㠈䢤Ҳ蹠ᘄ㣂ԁҰڐ䙭䛲㙒ᖅ窢ᄡᆐ枨Ꭴ㚠㡀⚠ᘀጠᄀݰᖁ㩜▣劘驨⪤ᯂႡᆁ朠虸嚐㹘⪬ቦᒃᆀ朠蚀嚐㹘⪤ᯂႡݠ晠䙨噤㹈ᖄᯆႠ曡朠䚠◐㲀ጡᄕ■䩀䤐Ҫ╀ݬ䡂⻐暰嘨㸲Ұ鋤⠘ᖋ㙁㚀玤Ҳұ婠Ꮓ鉠䥑ݦ誀㩐䁈ᘀᖶ䝅ᯁ椰䙤㚐虰卤ᗂᛌݥ皠ᖠ硠㝈ᖭቢ䙅㙀熠Ҥ䙤✛此⋌䡅⻐柠湤Ԅ⚣滠ᗀᛛ㝂㚶虨蜰Ҳݠ☣鑠䧂㙈ݨ䑰ዸ婤普条㙃皠侣塰廀◌晾䙆㙒ᖉ柠䛲Һ■䙖ᓀᄟ湠譠䚂㙑Ҭ癤躧ዠ■詠䩐⥑繨◠ይҠᒀ䞤ԑҨ勨ᘂ䚆㙁㚂又㚔燰婠㲀ᒨႢ◠橠声䇂□塨暀ᆐݰ䙭墀㟰▰㲀ዠᆔݫ⺵桠㾈㐠暨ꌜ㛒ᑈڤں蝰麠㱄暀ᆔݡᗀ䡀㾀❁㑈暀ᆐݰ䙭䦠㙠噤㲀ᒐހ晲ᇠ蜒ҹ䩍蛤ڙዠ■詠壠㙢ᖅ糌ቤᦀ橨䚀䩀㡀⚠ᘀጠᄀݰڈԄҲݠ☣繠寧◡极㙠溨䩤㡂⚢በ暠䝠盰溨䩤ᯌ⚩Ⴄ杢䝠虠罠㝇በ醂ᄀ柲蠁ᖐ⚠➑ᕢڱ䣆桢躠ቱ顰ݤ擢ԁᖠ晨䜨䙂⚪ᖀ桴桠㛐㚀ᖢ㩐Ⴈ彤ڂ⛢Ұ滰䙄㚄㙁ᘍᖀ䝥㟀㚌⺤䝂䙀⚠晬䡒䛁㦁▤ᄄ△盨ᘃ鉼孴ݠᖢ硠㡏ڱ窰በ㛊ߐڏ顠㾀▰橤䙃㩁䁑蛨በ㽀⚤ᑔ屢ተݫ䙀߀◹Ҭ䙂⤢ᄀ湱橠䩐熺ᖕ㤤Ⳁᦀ暨䛠䩀㡁ҩጶ酮ᆀڀԁ婷ꂨᘀᘂ厦⻐枨ڥԀ䝐☠ᴐᎨ䧂㙈ڤԄ▫伸ᖈ䙂㳀Ҩ䚁晰罠⬀ጢቫᄀݰڨበ桬㙡窸Ҡ㙁㚈㒈蚤Ҳݠ㛂ᴋ⋀■譠䚂㙑Ҭ癤躧ዠ■詠䩐⥑繨◠ይҠ◠柠㛲Ҹ晤桤⤠ᖠ暺檡ᖐ梘婤㹄⤋㙄㚀轀橢ڂᖡ⪺ႬႥ湠讀嵤㙂話ڀᒠᆔݡ◀㳳噰㙬㲆ځ◕满櫠ԇ靠㴉ᯀݠ昪啨月䘿ꡟꊽ袤ጡ暠䙁⺨䘿ꡟ艽䁈暀ᄶ盦在乨ᖄቢႡ暟摦ڂ詠脴㜌㽊Ⴁݠ暠嚟ꡀ◢ҲᯂႡꊧ䷦晦溠በ㡨婠媠ᰀᄶ盠ᖀ䲲㙒␄ߔ㙆㙃⡀虤㠢ԑ䩌㛅ݠ暠䙠㹀◴⬏ꊠ晤鈍䝘䟡ᅄ㠲ݡڸ鑦Ԁ▰╨ވ㹈ᖄሡ覺梀榢㐀蝤ڤ☣仰ڀ㙩ᆄ◧橢Ꮠ㹁ᗼ㹄⤂䙁㙀湤ݠ蹢ᖀ桰ᓀ㙄㚮螭䤀ҡҩጠ颧⋀曰ᖁᖐ⡘婠晦乢ቱݨڥԆ梘㝀晦䙂䛀胭暠桠㞨Ҡ桤⪡ᣐ߄Ԅ㙠罠䝄ᑔ䡈䛁砣䙁圠◸⚠ᘀ䙈⎢Ҡ䙠䙐繲ݠᘂ嚧⋀ݿ詠壠㙡▸晦乢媃杰ᖀ塠塨ᦈ鉤ᖠᒖ晠ᆀ㛲Ҹ晤㳂藑䜬ұ曨ደቭ晭粤ዤҡ䘈ڥԀ䝐㻀ᴐᎨ䧂㙈ڤڤ▫伸ᖈ䙆㳀ңԁ塠㻀ᖬ桰ጠᄟ朰ᖁᖓዸ㝀ᘀ䙈䛗㠃䛄Ԓ晰㛈⬀ᒨᄔ㟃䙄ԒԒᖅ竌ቤ㙃⥀ҡ暐纉Ҭ癤ᖢᒐߊڍᗰ䨺ᖄ桮䙃㙃㚀厦蚀䝀㻴Ҡᠡݰ栨ڢҰ罨䙰ቶ⤠ᆈڂ誁ᖐ⚨櫠㛂嚧⋀ߐᖄᖠ⪉ᘀᚾ䙃㩁Ⴈ朤Ԓ晳䝜☠䙃㙃㚀厦蚀䝀㻴Ҡ⪡ᣐ߄ԁ墀桩杸䁀⥁ݰ栢躰▨ᖄባሾ斁㗁㙀蹠䩂ڂᘁ誢ᯂ䙁㙈Ⴈ㥆罰佤㫒Ⳁ㙄㚋潄ڤ㕈ᇭቬ痑⋂▢◅諐蹡ڄ䁄条㛈湧檄߀◹ҹᔮګ㙅▢◇㫡罨㹉ڀ䒂ᔫ杰ᖀ衠灨㠑窢⚬ݥ湧溣毠䡁ҩᎠ邀ᒈጨڈ㡆睡⭀擤ڂ暠䙠㙐⪯遘晨晤杰孰ݪ䚦በ㞈Ⲡ晤佣㙑♨څ㙲杰ꋠᗀዠႴ朤ᖀ䣐㼁ݤ暤㙈㙁⡀蝤㡢ұ䩌ڂ䝌ݥ湡漁癢Ԁ婠晤栰ԕ▨詣骀ቴቢႡݠ曟瘤ڄԄ⠃勠ᗒᓐ㙁⡀酤ቲႰ暀晤佣䩐滰䙤㚂ұ䩍ڂ䝋㙏㛀嗤㠤▩ᖜ㲀ᒨႢ☡橠壠㦂䉑ꕀᒠᒠ暺洠䚂ԑ婠Ҫ䙃■椨䝁晰纺ᘸ桰⤂数ሑ䛈በ㾈㐁ᖀ罤䙐߈ڥԀ䡈ᦌ鉤ᖋ㙁盠ቡ塠㡏ҡ窠ᦗ䡀ҠҠҠҥ◠㪀ዩᇰ◨䩀䣐䆀噤㲀䒂ᔫ杰ᖃ衱鹺ݠ㣂ᗴ㛄湧躠㸂㜺◁䩚ҫᣁ㙈Ⴈ㰷⠎晡⪨暀ᆈ➈橈乨ᖄቢႡݠ昉ᓀ亠ቲ⚠ⳈԀ⥂Ҧݢ躠ቱ齠Ⰴ⎀桠俦晨ڤԒ晰㝄ᑖ屢ብ湢伀橢Ҳ╠ߔ䙅舂ҠҠҠҠᏈ䙔䙂㫁艨䩤Ԃ湻蚐ቶ䙠㙏▤䦨䙨坠꒱ᗀꏂ㕠晨ᐭ愵亂Ⴇ隨栤һݠᖀ䩚ҫ仠⠠⛀ᄀ詠厤Ԃ湽Ҥ晤佣穠盿躿ꡟꡟꡞꡟꙀ□■源Ҷ睠♄⏀ᄀႴ杆Ԉ乔㸿ꡟꡟꝟꡟ晤ڄԂ湼Ҥ梢䙂㫁衠䟀㛲ފ┨ᑗ劀㕫杰ᖁ㩐Ꮀ㝀⋀䙂䜐ߚ橤㡂㡐ႪႡݠ暠嚟鹏靠条ᘀ櫥ݠ暠䙠㙟驑Ⴉᖘ晤柰ᇵ▨䩄䡂⚠♄␀ᒠᒠ晲ᗀ頒ႱҨ硧乣㙃洤Ⴄሤ㙋髤抠ዩሌ߈䪄Ԃ湼晬梢䙉䛀荨߈㙄駱◅በ瑭ҥ椠瘤ሢލ塕ᗀꋂ㘓满満በ塨ᄈ岠㩠㗐ឋ僃墀塯橡䉈暀ᄀ虠鎤ڑډҨ硧▣㛐■殀幠㽉ⳈҸႫ㙁㚸ڍ䩙ҩҹ粀䉐ᛐݰ恠䳢Ԉ暄晤桐ᄕ■殀摠㝀♄╰ዠႴ杔ڄ䡲ұ䩏噤䡠▵■殀无㝉㫀ᗒᕰႥ溧詠䩜ҳ仠㢀⛡ޘ瞨ᖤዤ㙂■䙠杠䧐ᆐ䩉⎷⚰㯨䙨䙂䜘ݺ橤塢Ⴀ♄┠ዠႴ杒ڂԂҲᴀᙔ䙂㫁鉠橠䣐䐀☠撠䭐ᖐݰ婠䳢Ⴙݡᖀ䙡㙂洰晤ዢԈ銠ᗀጡ晡䃈څ㙺ұҨ硧乢㙁⡀顠䡀㞈㒠ᖠ◀ᄀꊠ厤Ԃ湼Ҩ晤佣橡▧詤睡睠♄▀ᄂ㗐ݪ䚿Ҳ㝂□ᖀ㙐䣂㙐敤橼䙁繨Ҷ䙂䜰ښ橣顢Ⴀꄼ䚒䙂㫁鹠䩤㡀㞈㗠ቸႫ䜼⚰廠ᓠ㙁ҩᔠᅊ㙂橢䩀䩜ҫ仠ᗒᕐݰݪ䚻Ҵ㙂⠂Ⴁݠ曀ҤڄԄ⻀ᦈ晤佣虠湠殀拠⠐ႪႡݠ暠噠በ䡀㞈㔀ጢ䝠Ⴔ李ԁ塱靠曠棎ᒐ㙈▧浀埢Ҳ⍠⍴䩀㙈⡀襤㠢ݡ䩌䚂䕌ᒅ湠讀嵤㙂犔ڀᒠᆔݡ◀㳳噰㙬晪䝉䛀◡䪠ᖙᰐᇬ橨䩀䛀▥ᖂ紂㜣勤恤晢旡癨ڈ㥄庂ҩڀጡ㵣榡ᖀ壠㙡▨晦乢媃ᓀᖀ塠㡈ᦈ鉤ᖠႶ晠ᆀ圐你Ⰰᖈ䡂㙁灠獨隧ꂨᘄ⡀ᒠᄀ暺洠䚂ұ婠Ҫ条㛂湠衠㛲▰噤㱖䙃■椨䚈㙒◱ҩᎠ浭ҡ癨ᕈ䙗轨鹩ꕀᒨႢ☠橠壠㦂䉑ڀᒠᄀ暺洠䚂ұ婠ҸႫ㙁橠䞤䙤✢㹴Ҷ条㛂椨ݨ㙃噴晸晤析寰楨በ乀㡀⚠ᘀጠᄀݰڈበ㡉彸橬Ⳁ㙆㚂倁癠虨剭Ҥ暀ᒠ暼䛈በ碈㝀暞䝞䛀溢柠䛲Ԋ㫄⪸ᖋ㙏盠嗤㠲Ԛ▐䓘ᗀ㙈湧魄Ԅ✢㺬梂䙄䜈ᆚ橠驰㧣仨⡀㑄旰ݨޅԀቨ們竢囋Ꮠᒂ贠䙄▩ᖕበ䙎䛀胨暤Ԅ◪㻈ᖶ䝎㙁□鎤㚰虨勠ᘂ嚦⋀□ᖀ棠㩂㽄ᑤ屢暃㚷㠠㡑◸➼晦乢ቱݨڥԆ梘㝀晦䙂䛀胭暠桠㞨Ҡ㹂⤠ᆈڂ誠䩓ᓙᖰ晤枎䥑ᆃ䙄߄◲䩴Ҷ⤠㕐╨ᄣ塱陲ݠ⢊Ⳁ㙁㚗针䊐ዸ婠晦㙧㝐眀㙐▨ᖄቢသ睭ተᄱ䟠塡靡ᨰ梜⪥ᣐᄱ䩠衠㡈ᄀ䁂⤠ᆔ朼◠ថ蹡Ҭ晦乢ዠ暺贠䚀罠㽔䁄⥁ꊲ㚇⍠䙀聰ݤ撠ᓂҨᑐ晡晰罠㛠កᰂᄂ杰ᖀ桠琚㙀ҠҠҠԈ桡䡀䞈⪠梞䙄㫁档ԁ嚄Ⴀꎨ㣪Ⳁ㙏▧邡癢ނᗹ㻂ԀႰᛝ槁癢Ԃᙁ窠⚰ᘐႰ䩍䡀㛀盠☢㚪㙂⡀豤ڂ湹蛠◲ᒠ㙂⡀譢Ԃԁ䩌䚂䕠ቴ朦ᆀ㛲ފᨹ膺䙞俢㙐敤橼䙁繨ڀᗁ陠䃈ᄂݲԂ␀ߔ䙄㫁繨ݥ㙶桳ꎫꡟꡟꡟ陟ꡀႠ㝀㝅ߖ䙄㫁穨ݥ㙵桳ꎫꡟꡟꡟ陟ꡀႠ㝀㛤⋀䝟㙂⡀轡晰罠筧橢鈌㙏㮁▨䗂䡎㙀鉤Ԁዠ詠厤ݱډұᒀᅊ㙂⡀顠㡀䞈㒠Ꮔڂ暠䙠㙐⪠ݠ☠☣陠孰Ⴊ䚰Ҳԁ䩎㙂桠䞀䙠㙐▬Ҡ晨晨佣幰渨ݥ㙷曀ᖬ晼ᗀ㙇㚂✠橢ԂᴀⲔ䙇䛁䍚檠䣀㙁ᖠ⋀䙈䛅䅈䝄င▫仨䋂⛧⋀ᑈڄݣ噰Ԍ普条孰栢詣郒◰⚠暂杩䵆晨ᄤႴ曈ݠ㫂㞊⋀▢溁㪠䡁ұᔀᅊ㙄橢䩀橻ҫ仠◰Ꮠᒈᛈݨ䁀⥑Ұ硧晡㙂⡀齠㡀䞈㔀ጠᖩሜڄڄڂ湽Ҥ梞䙄㫁遠䟀䛲ڒᖡ㹈暀ዠ詠玤ݱډұᒀᎪ㙂⠀硠蝡䝀㝇虢邀ቴ杄ڄڂ湼虨晨佣晡□ក廠㛀☠☣虡宀晨ᄭ婰㧢┠弴乢Ҩጨݨ䍀⥑Ұ硧陡㙂⡀Ꙁ㡀䞈㗀ጠᖩሴڄᖄڂ湾晤梞䙄㫁鱠䟀䛲ށԉᑺ鋊䛍胨暨㠤表ݠ◰Ꮠᒑᄨڎ蠐蹡ұᕀᎪ㙄橢䩀橽ҳ仠⠠㩠ዠ陠玤ڂ湿Ҩ晨佣驡□ក捠㝀㛤═ተႰႰ屠䳢ڒᖉ軣㹜孴ݠቡ㡀䡍ҩ窠ᖩሠݨݥ㙼晱Ұ硧噢㙂⡀鵠䝀㝀㛤␀ዡ㗐Ⴊ䚵Ԁ虨剭ڀᗁ湣䃈င䙤▫勨㓂Ꮄ孴ݠ♁癠聨ݤ䉄暀ក梻誠窰䡂ᖀ桬⪡ᦀ晨䜄ڔ◫仠⡀⡁Ԅ⍨䛠䩂Ҳ㩑ݢԁႦڂ躐⛮蕀Ⳅڀᡋ䛁䍐扣洂晰ݨ㔚䝑䛀◣◀ተ智ݠ☣㙆孰ተ䚎洂㛱Ԑ暌乢ұᣈဍ袁熱◐鉤Ԁᒠ暺溟靗⚠㻀㻊䙆㙄㟜䪁栒◑ԉቲ醀ᛐᒆ誁䡁⚠绠㒀㾬尖◣ᖁᖐ⥑◀晤浭ҥ湣♁癢ԂᴀⲔ䙂䛁䍚橡槀㙁ҩቢ邁Ⴅ湢橠純◫令㩖ᓀ㙂㚤ߍ䡀塨➑窢▢䙁癨ᄨ㢄隂ݠ㫂䪇⋁▢ᛀ䙄㓏乄☾Ⳃᣐݰ晁鴂◊ᖀ桸ᓀ㙆冨ݨ㽀妱ҵᕾ㖱㝃皠瓭䡠倈□ᖻ⇼㝏㛠壽搠䃠㠽በក㕐┰癲甝虼ݨ擥ݴ鱎ߟ瘄㠢ဝ䉬桸䙅㙏倨朆蚀Ⴀ☠ᗀዠᔐᄦ詠衠悐鋠㒀ጡޕ盟衎㪱罨☠㓂ᅋ㛂湡橠髐蹠勠䋂䎫㛇▣♁癠罠☠⭂ᅋ䜿樼䪀諀䡁ұᒠ⇪㝂湠溟蝖硯ꋝ裢Ꮄ孱ለစԀႠ⚤ᑖ桟╘滠満䶂ԋ伀ᖀ颖Ⴀᑈᄨ㛖睨仠☣㙆孰ᆐ䚎洂ڡ繨ҸႫᣁ㙀蹤Ԅ▫佧ꔞ鞁ᔐႰ塠贂Ҳᖅ糣ꙏ开曽ⵄ㝐䁂ᖥቢ䙊䛖磦誁暄Һݠ⬂ᠡҰ桠湠婠㡁Ҵ晰邡ꜧ芨朤Ԅ囈ݠ☣㙆孰ᆐ䚎洂晰ݨ⬀◡ᄚ㚬ᔍ䣀㙁◹㡚Ԁᒐᣒ蠀䡀桨ᦈ橰杤䧆暢蟄ބ⛂䉴ݤԁ㕠晨䝈䙂⚘Ⳁ晤䙅㙄䃐晁鵲㙲㹑ڀጡޕ㚿衎㡠㡈➐晨邡һރ߁塠䡌ҹ窠ᗁ湣䃈߈㙧䦑䙈Ԁ㩠ዠꊡ厤ሢယ□ᛁݠ曒贍頸ҡұұᕀᡊ㙂⡀ꔀ硠䞈㘠⡀ᖩሀᆈݥ㙸暐暀晨佣驢溧詠棰䕀㫄抠◡ޕ☢◀櫐蹠勠☣癥孰ጤᄄڄ㑀㯨暜䙟㙂⡀ꂠ硠䞈㖠⠠ዠቴ杒ބ㠴㙁ᗸ晨佣虢溨䩁詿▣仨㺀㮫㝃皠ᖀ驰ጰ鋠亠⏀⠤☢ᓤ䚤㗀ᄐ䁄⪥ᣐᒈል䡐靠㫀ᗄᴆ⋀ᑐ噲甝虹ԑ銢㲁旰ᒝ●鶒♪ᖀ桰䙅㛃ߐᖀ橹ԓ仠⢂Ꮄ孱⋈Ⴄᇢ晰ݨ媠⬶孱ቭ暠በ塨ᦉᕾ㖱㙃▢♄ڒԒ䀄橰䅡ᒐᏐ䝭塠睠䚬桴䙙㙍䊈ᑍ桰杠㭄ᑔ桟╘满䩀䪰蹠勠㛊ⳁ㙃□轀橢ԂᴀⲔ䙂䛁䍚橡ᓠ㙁Ҽ桤⪣ᣐᗈዥԀቨ᧨鉤Ҭݥ椢詠橹ԋ佧桢䙆寨⎤ᄤڄ⻀㯨晨佣湢湡ក忠佡ᘀ撀傀ቴ李ބ㡢ԁ䩎虪䝣㙂㚠ލ䩟□ҹ粀䉐ᛐႰ婠紂Ⴉڼ晨佣晢湡ក廠仡䛀☣除孰◨ᕤڂ湽Ҵ檜䙄㫁遡䪄Ⴁ睠㝇晨邀㟐☨ݥ㙿ԁҰ硧鹤▤□ក擠䝈ꌠ◲ᕠተ溢蚨በ偨㟩ᕾ㖱㝅■漡癠㡁ұᒠ⇪㙅㚀瓭䣀㙁◉ᕿ瀕鵠禡▤ބ你㭄⣔桟╘湠漮㜐⚠㝇虦邀ᙛ睠ҠҠҦ杞檀⠠ዠ鹠鎤ሢႡҰ硧陣㙂⡀Ꙁ坠杠㛤╰ᒡ㙐Ⴊ䚼Ԓ⚐噤㲀⡁曅叛暈隤Ⴀ㝇䙈邀ᙛ睠ҠҠҧ䜾檀⠠ዠ陡ⵄሢႡҰ硧癤㙂⡀ꆠ杠杠㛤┰ᖡ㙐Ⴊ䚸ڂ⚐噤㲀❗㛓■橠穰冲▜䔢汤䙐Ⴐ塠洂ᄒ㙀ҠҠڰ㘨桡䡀䡌ұ窠䑠㙐Ⴊ䚲ڂԁ䩎器㙈㙂⡀靠桲Ⴀ㛤⎠ᖡ㕆ڂ詠橻ԃ仠狨ҠҠҠ䍇ꃁڑұᓀᗪ㙏▨ᖀ棰䏀㛀◲ᔸቨቨݥ㙺暁ᘀ晨佣癢◧柄ڤ㖸ᄈ䁀䙄䜨ߚ橣衢ተႪႡݠ暠嚟蹂Ꮒԁ䩏䙆䙄㫁鱠躠ᖠݠ暔ڀᗁ虡胨ᕄቤ㙂⠂Ⴁݠ曀是衡በ䞈㕠ᴂ䙠ቴ材ڤ㠠罠㝆虦邀㛐╨ᕄቡځұᓀᓪ㙂⡀鱠塠䞈㔠ᴀ䥠㝈⋈ݥ㙺晹ᗼ晨佣癡溨䚈ᖗ靠頌晸桟ꡟꞁ钉蜰Ⴀ㛀擥ꡟꡟꡟꡟꡐᖙ艮噦䙄㙐琠顠塠䡌ҭ窠䝠㗡Ұ癰▨ᖄባꕾ㙂㙂⡀顠塠䞈㒠⋅ݠ暠䙠㙗⪠ݡᘄᗀ䕠ቴ杂ڤԄ▢䛈⠶䝟㙐湡ក幠㽀㪬梢杠㙎湣橠䩐Ꮃ仨䋃鑠宇▧橤ᖠተڀ䛂ڇ㙄▢ᖀ衠悛櫠⠶靻⋀㚾ᘈ䊀ᇰ■㲀ᗁ鹡䃈ᖤሲڰ朄晨佣鹡◧詠棰䘀◌鑦亀▰╭蛄በ䡌楸ߔ䩀㙈⡀譤㠢ݡ䩌暢䕌ብ楠䞠䩀㨹Ҭ癤ᖢႰߊڍᗰ䡁Ҭ晤条孻ݡᖀ䤐Ҡ噤㲀ᒐݥ皪♠橤▩ᖠ㹂⥂暠䙠㙐㑏ꡘݤ抠ᒩᇸ㛀⡡皒ҹҬ癤ᗁޕ珠曡暐繺ҩꕀᒨႢ☠橠壠㦂䉑ڀᒠᄀ暺洠䚂ұ婠ҸႫ㙁橠䞤䙤㑈ᇬ桪ጠᄀ■溆⍔◲䩴ڀᠡⴄ榠ᖀ䩝鹢㹴ڀጡ雠䄐䦉霰◹ԁቢ邁ᖆڂ蟈乨ᖄቢሁꡟҰ淨ڈ㣔囈◌晦佣庁Ҷ䛈በ㽀Ⰰᖈ条寻ݡᅈ䗂䡈霸ᖀ䙃䝀ᖂ蟈䙂⚐勠㲀䕷ᆄ▢詣觐㻁ځᎠ還Ұߊ䚯ᖠႠⰀᖈ䙃㩁⤚鯯简躈嚐㲀ᗁ鷠芰拀ᗠ䡁ԍጠ邡昀蚠桠頂ښᖀ驠䙠ዠꍠ⚁盂ښᖀ驠枀ᦀ普晥衠聨ߘጴ⪦ᣐᑐ䩍䡀✈Ҥ橤栾ԃ☡亐㙡Ԙ軠㳂ԚҰ■亀䳢Ҫᖅ窠ᛛ㛄替蚨ԄႠᛄᘂᄀᏍ胫䙀ዠ⠉孼☠䙁䜮晱栀㡀㡎鹡㒂កᘆ߂詡塠㡎鹡㒄រԇᒀ䞤ޒҲ┘ݮ䡅䍀䗂詡㩐⥐勤ቦ晢䙐ڋ䙀ዠ㡉孼☠䙂䣆樨ڈ䐐ዸ婤㹐⥁㳐曨ԅ癠⚰䭔䁀䙉䜮晱栀በ⠈ᦈ梄ጠ㙄湠亀㳲蹠ݨᏚᗀ㙄溠柠㛰䁁ҥቢ邂ݰᑐ䩍䳢ԉ蹠ڀᄀ⚶晠ᗀ䫐蹠劌暄䝁ᣐݨᅍ䡀倰ݤ晢条孰暣ҡ噠聨䛄ᖘቫ䛅◠柠㛴□ᖈ㳄ԁ㕠晨䜨㙂◪ᖀ梄䥀䛈䄈杤晠㡁ҩቢ涀ᄀ潳咈皤ቯ蛱ዸ屢Ҧڂ蛈ԇ齠Ⰰᖈ䡅㙁灠獨隤Ⴀ⭀⢂ᅊ䅁Ⴈޅ癠ڠᖬ晦㙁ᣑᄰ䩈衠偨䯭ቪ濒⋀ᑀ湠䩂Ԋᘭ籼ᒀݠڂ躏驰Ⴀ㭄胬䅡⚰ߊڀ梀你Ⰰᙐ浤䙐߈ވ㙖砐▰晪占Ұ枣ԁ塠㻀ᘄ⠖ጠᄀݰڈԄႠ⚥蕂Ⳁ㙂皬⚁癠㨹Ҭ癤ᖢᏐߊڍᗰ䡁Ҭ晪条孻ݡᖀ礰Ҡ噤㲀ᒐݥ满事鵴㔀Ⴘ☠杰㛁ݿ詠壠㙡▴晦乢媃杰ᖀ塠偨ᦈ鉤ᖠᏖ晠ᆀ㛲Ҹ晤㲄ᠡ曮胫䙀ᖑጨ婬晦佣庁Ҷ䛈በ㽀Ⰰᖈ条寻ݡᅄԔ㙀暌㹌⤠Ⴆ暰䝄㙠虰勠ᘂ⠠Ⴍ滠橠穸⚋伔Ҡ煭Ұߊ䚮ᖠᑈ㝀晦䙃㩁Ⴐ䙭姀㙠勠⋄Ұᦀꔉ◃槀㙀噰㲀ጡឃ榠ᖀ穳ᓙ▽ቲ獤䙠晨䚀婢Ҳᖩ纠┊㝁㚦峜錠⡈➼晦乢ቱᄨڥԆ梘㝀晦䙅䛀胭暠桠俈Ҡ㹂⤠ᆈڂ誠穳ᓙ▽ቲ珑⋀ᑈڕ硱隸⚠普杩䯆晨ᕈ䛧靨ꌠ㖚䝠ᇠ▧詤╢⚐➼晦乢ቱݨڥԆ梘㝀晦䙂䛀胭暠桠㞨Ҡ㹂⤠ᆈڂ誠穳ᓙ▽ቲ煭ݰ┰禶擌謭痻㹲聭ݰ┰枯袁齠䓴檠棟椌ᓀᅈ㛢▰器㳂⠡Ⴐሐ䝩眰☀◌晤䙂䛀脼䛈በ偬ᗵ窺Ҡ㝄湠澀橠䁁Ҩ普銀ᘵ☡躘ꔿ➂䩉ꕀᒨႢ☡䩀壠㦂䉑ڀᒠᐠ暺洠䚂ԉ婠ҸႫ㙁橠䞤䚔⪨鰈聠Ԃᘐݲ咁癠罠䓴梜⤠Ⴐጳ䟠㡀㮩ᗼ⋀䙞㙏藨橤ݺ遷ꊦᴄ䞂昢篣䚄ቢႫ雤抠ቢ旰ߊڀ梀你Ⰰᙐ浤䙐߈ވ㙖砐▰晪占Ҧڂ詠坠◹▵ᒂ䎪㳀Ҩ枉眰㝀䛀擤Ԁ㕡Ҥބݢ湸䞀䁀⤌ݥ湠溂鴤○罤㔢柡㗵⤀Ҥ㛢Ԋᯄ愴占ұለډ㚄Һݠ㢀⡴㙃苨枈㹈ᖆҡ㡄ꚠᆔݡᗀ硠㾀❁㑈暀ᆐᄰ䙭䦠㙡Ҵ聠Ҭݥ湠衠㛲㙪ᯄ愴占ұለډ㵐蹠勠㦚䝞ᣐݨဉ眰ታꌠ㮚䡟橱▨ᕊ朰Һݠ㖚楟߁湧橣黈䝈黠ᖄꚠᆔݡᗀ硠㾀❁㑈暀ᆐᄰ䙭䦠㙡Ҵ聠Ҭݥ湠衠㛲㙪ᯄ愴占ұሓ䟠㡁靡ᅀ䁀⤋㙁□亐㠖矈ҡ䁚ң䙐ݠ癄Ԓ晰㛈⡀ᒨᄔ㠁▤ԒԊᖅ竌ቤ㙂熠ҡ晰罠⬀ቶ柡㓵⥀ҩ地ښ▀滣橠䅁Ұ䙄㝤㨹ᗸ㲀ᒩᇸ㛀⤠橢ҹҬ癤ᗁޕ珠曡嚄Ⴀ齩ꖤⳀᣐ┨ጵ梁ꋉڽꃢ䑋㙄㚄ⵄ晢ҹ䩍雤Ԁᆔݡᖀ壠㞣唑ꅂⳇᄀ□◞Ҥ廈ݠ䓊Ⳁ㙇湧渠䙀虸勠䒀ᰀ㕈✣ځ塠ꃈ婤晶佣▰渨ᅅ㙰杩ҩҤ晢䙐ᘃ曀Ұ㙠勬ݢ䚫㝂潠ڈቡꂷꡟꡟꡟꡟꞀ㚤䠤㩄ቢႡ߀虿薨ᕈ乨ᖄቢᆁ映Ԟ筡▤ሴ㜌䣜桬䙠买╰號ꡐꊹ☙ᛁݠᖪ▧溰▨ڂ櫍⠈暀ᒠ蛀㙐چ睨◐ᖖ䙆䜀䙠㙀洂▱ݠ暜棠暠ዡ囨䙅㚨ᘀᗀᴁޘ胨䚁晰罡ᄠ暜棠暠䙠㙘㘿鹢盠拥ݠ暠䙠㹟ꡐᏈ鍴☠䙟䝌袉躟ꡟ鹫武Ⴁသᔹ◠柠㛴⪤ባ鹮䝂㙏㛿ꡟꡟꡝꗿҠ籭Ԁ晨䚄ሤ㟄䣜橬柱Ꙁ㢃䙄ڔ☣仠暠䖂ꡟꡟꡟ驘䁔ቢႡݠ虠䝈樤ڤ⪯鹡粀ᰀᏐ▨ᕈ㹟鹡ҹ粀㕠Ꮤ朢ᗃ誁犥䋄ᗀញᆀ□䭠坢ԉ䩌坨桠侶蝨橪ቡ顷ꡟꔟᒢ㕡䙠㙁ᠢဒ⠂Ⴀ◱㇂杰ᖀ䩐⥑ᖈ㹂⤠㙐┰癰■檌㝈ބⳀ㙁㚀咄Ԇ睨◌晪枀孲ҨሤԂယ☢㞎柠暠䙞㑮䦠㙀噬㲆ځ㙵滠櫠ԄႠꎫꡟꡟꡟꡟꡀ◒㝊⠂Ⴁݠ曀䙏㗤ቴ㩄ቢႡ߀ꡁ晿僠橢ယ▲⬀䚂䒄䝈䩤ቤ㸿ꡟꡟꡟꜧ蜨橨乸ᖄቢႡҨ卢㙈ᖨ乸ᖄቢႡ߀Ԟ◧柠䛲Ⴊ⠂Ⴁݠ暠䙐㗤㠢Ⴂ⠂Ⴁݠ暠䙂⡁癲ထݥᖃᓼ㛏ᒀ䞤ብႡᛊႡݠ暠嚟ꡀᠢႪ⠂Ⴁݠ曀晟虪㟴亂ݠ擤ᘆ㙐㛏㝐檏ꡟꡟꡟꙃ栁䙠㙐▨ᖇ驜Ⴈ䝞ᯀ椰癰▨ᖄባ類ԁ㕐◰號ꡟꡟꗿꜦږ⋀㛀ᖣ衢⠑梂璤ᠡ潛晲䟠በ㡈栈暠䙟䞿ꡟꡟꡓꊺ⠂Ⴁݠ曀ԁᗃ衠偬╼ߖ㙆㙁▨ᖃ詸㘀ݠ⣖㙏㙁⡀蝨䚈坠♄ᯀ䡠䝞䡡ᖣ衠㞈⬀晤佣⬂㛀⡕硢ቷꡟꡟꡟꡟ橀雤䡄㩌ቢႡݠ晤㳁▤ሤ㙋雤扸Ⴋ㙐㛠㙐▨ᖄበ㛤Ⳁ㙏㛀囄ሧ蝨麌晤枀孲Ҩሤሢယ⠂Ⴁݠ暠䙠㘰庣幸Ԑᖖ䙏㙐㐀虤ဒမ艬㙘Ⴋ㙃皠厨㠲Ԃ┬ݬ䡌⻐枠湤ڤ▪㹑ڀ㕡Ⴐᙁ▤ڔ△皠䊄ጥ⋃椨ᅈ䙃幽䙉በ䝇ᇠ■檀ԄҺҩꕀᒨႢ☠橠壠㦂䉑ڀᒠᄀ暺洠䚂ұ婠ҸႫ㙁橠䞤䙢ڛ伔ڂ歭ݰᑈڇ䙁罠卤弴䝉䛀◣䪠ᖑᓙ◈湠䙋䜔ݺ檠䩚䝱Ҩ岤㡨Ⴀ◠暨ԄҲݠ㳂䆪㝃㞁▤Ԁ蹨噬㳂ꔡ⋐ጨᄨ㜆睠䪬桰ጠ㙁Ⴐ◀㡐滀ᖬ晬占ұݰ䥎橱樉◅በ瑤䙐ቨچ蚀Ⴀ䭄ݮ䝍ᯂᑈ߅晠Ⴈ⚦㺌乢Ҵݠ♀橢ځҩᕿ散廻ݠ◀㡐軀㙬晤桟ޘ盐暍墀㡉澌䁂䙂䛁䍐塣鴂晰ݤᘂԂᘢ榠橠詰⥑ᖘ㲀ᰍҠ☣満巂㛂ᗁ粠ጡⴚ湤ⵎ䩐悸婠⋀䙉䛀脨䝤င⪠ᦌ晤杦悙☠満ᚠ䡁ډበ屢Ұቨچ蚀ቨᘀ㤖䝍ᯂᑈᄈ眰㝀㽄ᑔ䡆㳀Ҩ栨䉀⦪ᯀᏌⳀᣅ湤満ᓠ㙂▀滢㽶Ⴀ㚟誁眠◹ڈ晤屢ҥ湢溂⍂䙁Ԕ橤柞䥆晰䙄㜒Ҳᨽ⪺⤠Ң㙈Ҥڴ△砈晶乢㑛ݠᖀ驰⥑ᖜ㲀㥠Ꮠሑ璈眰ښᖄ桬䙀㙂皠哨㙗㝐㭄ᚨ㙤㝁ᓀ䟁圐聨ݤ䂀ԁᏐᑐ孠䳠䨹Ԍ癥乢ᐠ晢蠁߀◹ڌ☠杠㛃湡䡁袀㡨婸⋀䙂㛆朰ڏ顠㾀▰橠䙃㩁䁑蛨በ㽀Ⴄᑔ屢ተҫ䙀߀◹Ҭ䙂⤢Ұᑚ氀ቴ亂Ⴄڂក⋐晣ݡ塠彠專晠恠Ұሐ䙭䡠彠㭜䁀⥁ݰ柰䙄㙂کҵቢ骡ޙ☡䡄梀㚨Ԍ㹒⥁Ұ栨ሠ橠䁀➼晦乢ቱҨڥԆ梘㝀晦䙀䛀胭暠桠ᅈҠ㹂⤠ᆈڂ誠በ膱婠桨暀ᔐᕚ橠ᔠҡҽቢ邁ᔆځ亀ተ你拨ڂⳌᆅ晢虡嚔ҳꌠᴐቤ㝀■譠䳄庂ݠᴀځޕ⻀曤Ң蹠Ԑቶ䙃■椨ᅍ䤐Ⴈ婠㳂ԁԀ晨䟨㙂◈勠ᴐቤ㛁■讀嵤㙂話ڀᒠᄀ暺誠䦠㙠勠ᴒᓸ㙁■譠䤆菃雨攀Ⳃ㙂㚸虨衡靠ꏩ衺ዠ✢㙈ሤң噰Ԍᘀ䙌⋀□䛈በ你䍄ᚨ邡һݠᅄߔ亂ႤڂⳌݥ湡詡約□蹠Ҷ䙅㛀ᑈڥԀ䝀Ⰰᗘ鈌㙁炠镤ጧ詁ᘐ暐䙏䛀㠚檃ޒҪᖅ窢⏀ݶ晠䪀㜐☀䉬㲀ខҦڂ躀㡐塨ݤ䃂ԁҦݢ詢塰囀◌暆䝆ᣐᯃ䙁塠墈婠智㙌㙀ᖃᅄޔ⻀❈湠䙃䜈ښ櫠ቡ聨栈湠⨠㵁ᒟ蚏袐ቩ栌橮䩀ᄀ■ባ颀㺨Ⴅ犢ᒠހ棲蠀ᖐ⚠᧱ᒎ☑䣆晨ҥԂ蝨㫀ڐደ㛅■ᛀ䧂▹ҽበ屢Ұለڦ蚀䝀ހᗐ䝃㙃湢洠䟂ԙҬ鉤◀ᔐᄨᄨ㙷䝐⭀ᴀᠩ⻐Ꮠ䚎梀䆱▴鉤㙠ᔐᄰ䚎槀㛡Ҽ晦䙅屻ݣᖀᏀ㟡ᖌ普䙁䅁▨ငԓ噰雠ᴀ⡋ዠ□詡䦠㜠勬ݣ癠寱ႩҨ㲲◰⚠普歭Ұұ䟠በ彠ߘᗐ柊㛅□譠䜂㙊▟ꡞᅑ㙀砣䙄Ҵ◳盤ᯄ暀Ҵݯᗀ㚄Ⴀ䋀ᴀႱበ⋈စԀႨ⫰ቶ䙇㙁橣檠姀㙀勠⋊Ⳁ㙀◢䩀飠㝁ᖨ池柠ᄕ滠櫠ԄႠ㝔䁀䙉䣆晨ڈ䍀ᓒᖁᓠႰᔍ■溘ң噷癤晤楙蟜䴤嫖敭繡艭㚀ጢ鱝䟶繖藌⚙艭ڀጢ癌擖庲䏨㬛ꍼ⇰䙂䞨蟆葟卙䩾橠鑦嚀ᄁ招擿⡚晍䓕ꕮᒨ㙁㛪ꔚ斪꜕餼黎ᒠ㙁㛮ꁵ働泧售鵞嵣⪰ݰ署嗙噞婆➔ԗᆈ■橡㣀㟁▤鉤隀Ⴐڍ暡桠㝀䫠ᖈ䡁䅁䍈ڈ㛃噷晤晤䙁䅁ᒈڄݲ晱囨ᎬᎸ㙁■䴀䜂Ҳᖰ鉥陡㙁▢䭀䣃噰坤㺂ᯂ䙁㙈څ㙶Ꮐ㝀晤桜ԕ■溁洄◀晠媠ዠႴޜԈ㚆睰㼘ᨠᄀႰጪڇᓠ㚡Ҩ硦蚰䣂㙈ڄݲ晰囨Ꭼቬ㙄皣ⵄ㛀虸剩ڀᴁꖀ䄐是謐䡂ᖐ桦䙂䛆䃈䛡晰罠⚧虠邂Ꮠᆚ橠䩐覱▭ᒀᄀᒵ滠䡀ᇢұҨ硦纀Ⴔ朴ᗁ誏ꊒ脕黎ᓘ㙁▣溰ҷ蠘ⵀ晤杰孰ᄤڤԄ□繫虢䙁㙁胨䛤ڤ㘠ᇬ橦柡ބ杰◀ተ囀ᖬ⋀䙂㙁⡀遤䜤㩀ᨰ鑦皀Ⴐݪ䚫በ顷꒹厺ꋗᇬ■溂⍂Ԉ晬晪柠ޕ◡䩀婸ҫ勨⋃ҡ䯆晢詠䣀㷀ᘄ⪶䙂㙃䃐摠⍂ԉҬ䙀䁠ႰᏍ暡桠㝀♀ᨠᄀᇵ☡洠啠⚠♄⍠癭ݥ湠橡㣀㚡▤鉤⫠ᘠ楺檁߀◸⚠晬桝ԕ盟瘩嚤ቨ㛄ᴀጡᰕ◡䟀㛲Ҳ╠ߔ䡅㙃䃈ڈ㜆睰ⳆҢ䙆寱ڄң䡀㝀♄⍐䙂㫁穨栨噗餕屐鑦纀Ⴐᔐ癠㸃幺曠ᘂ㚪㙂橠詠䩐ᇰ⩀ጠᄀᇵ◡䩀詿虣勨⋃Ⴁ䫂㙐䙄㚠虨剭ڀዠႴ朴ᗁ誈ҫ霼⍀䙂㙁⡀酤င㸻龺腘嵣剰ݰ䡍䡀仠⭀⢃ҡ孰枨ڨ㹀⥙▭ᒀᄫ⋀ᑈڅԏҩᖘ㲀ዠᒵ㚼ҭ䡀你⬀Ԕ䙂㙁⠀葠㡀䆑▸鉥陡㙁▢䭀䜂㙉繨㺀⛡ᰕ◢ᖀ䣐䅂□䩚Ң䙐ᆐ昀⍔㘳龌☠杤㛁湠溁洂◈噤㲀ጡ鹠䃈枤ڦ睠⚤㼔䡅䜀ڈߍ墀㻀ڨ晤䙂㫁籨څ㙵Ⴐ彫ꗼ納摻朶ᖀ䡀顴ҥ黎ᓐ㙁㚄ⵄށҹҩበ屢鹠湠詠紂◉ҹᕸګ㝁盀䙩㚄ቨݤ⪸Ⴋᇠ■橠䣐䃁◙ᛀᅜ䇁穨ڄԂ湺蛠䋅ꜞ冶蕭蛋በ㡈栈晪㙃㙂盀ԍ䡐你ⳆҢ醂ᇠ虠俁癠罠♀ᨠᄁᒅ湠橠贄㗀ᇨ晪䙃■⋈ڄԂ晷晤晦邂ᒛޜԁ嚄Ⴀ䫠ᖐ䡊䣆晠湤Ҵ仈ݠᗒᓠ䝀㫃䙀䩂ҩҹ竣Ⴁ䫂㙈ᄤ㚒ҩᖌ㹂⤠ᄀꊠⵄ䙲ԓ仠㫃ҡ㙃䄈柂ҡ睠☠ᗒᓘ㙁⡀遤䜤㸻龺腘嵣剰ݨለ习⪁艭䚀ጡ◕■衠婰Ⴈ㻀ᘂԖᅘڈᄤޖ睨㫀ጠ⥫㝁盀䙩㜐Һݠᗀዩᇨ☣溰ҷ蠘ⵀ晤䙂㫁籨ለ噗餕屐鑦纀ᄀ橺橠睠㽀㭆Ң邁Ꮠߐ噠㳲㙚ᯀᏖⳀᣐݪڞҲ◐勠ᗀ⇪䜸Һ橠硠㻀ڨ晤䙂㩁扠䩀崂㙱繫虢⤠ᘖ晱◀㵔仈ݠ㪀Ⴐተተ䙆蚀ڙҨ晲乢⠑ڍ暡桠㞈⻁䙈晢䙐ᆐ昀⍔㘳龌☠杤㛁湠溁洂◈噤㲀ጡ鹠䃈枤ڦ睠⚤㼔䡅䜀ڈߍ墀㻀ڨ晤䙂㫁籨څ㙵Ⴐ彫ꗼ納摻朶ᖀ䡀顴ҥ黎ᓐ㙁㚄ⵄށҹҩበ屢鹠湠詠紂◉ҹᕸګ㝁盀䙩㚄ቨݤ⪸Ⴋᇠ■橠䣐䃁◙ᛀᅜ䇁穨ڄԂ湺蛠䋅ꜞ冶蕭蛋በ㡈栈晪㙃㙂盀ԍ䡐你ⳆҢ醂ᇠ虠俁癠罠♀ᨠᄁᒅ湠橠贄㗀ᇨ晪䙃■⋈ڄԂ晷晤晦邂ᒛޜԁ嚄Ҳݠ㢐ተ㝂瞣䙄Ҵ仈ݠᗒᓠ亂杰ᖀ䡀澠☐橢屢ᯐጰ䧍䡐曀◌ᘀ䙁㙃䃐嚀㫐蹡ҩᕠڪ㝁湡玤ڔ⪠ᘀⲖ䡊■⋈ڄԂ湺蛠ᗒᓐ㝇㛿阪鄷蠘⺠晤䙎䞀ڟ⎀孢Ҳᗁ窠ᒐᇠ晨䜄Ԅ□繫虢䙅㙅䃈䛤Ҳړ勨ᏃႡ䫆晠蹤Ԃұ䩍䚄㒂晠蕭蛊በ㝀♄⍐䙎䞿藵簏槐䄁ҩዠ邀Ꮘ߈ވ㹀⥑ᖔ晢柠ޕ滠亐Ҵ终Ԍ晤乢鹠溡柄Ԃԓ佧虠邀Ꮠڄң䡀㝀♀ᨠᄀޕ☡洠啠◹Ҩ晲乢㑑ڍ暡桠灨須桰䙂㫁繰晪䜐Ҳݠ⭃ꎠ尀ꜿ激橤◁ᖌ晤杬孰枣ԁ塠㡏晡窤⠠ᒵ■溁洂㙪ᯀጠ⇫㝁橠ᓄԂұ䩍嚠ዩᇨ☣溿鹅寋霼⍐䙂㙇㛠ԏ槐䃁ҩዠ邀ᛈ߈ڈ㙃噷晤晦䙅孰枨߈䘀ᓙ▭ᒂᄩዠ㚀ᖠ蜠◸Ⳁ晤䙂㫁穨栨习⪁艭䚀ዠႴ朶ᖁ誏ꊒ脕黎ᓘ㙁㚄ⵄڑҹҵᒀᅊ㛂湠躐Ҷ罰ⳆҢ煭ҥ湠歠啠⚨㹬晤䙆宀ꊠⵄڒҸ晠媠ዠႴޜԄԖ睰㼘ᨠႫᄀ▢䭀䟂㚒㩴Ҥ暀ނ榠ᖀ䣐䅂□䩚Ң䙐ڈߍ䩘▪䩑ڀ⠡Ꮠڈ䚡晰罠⚧虠邂ᆐᆚ橡䩘ҩҹ粤⤐ҭ■橠䣐䄁Ҩ硦皂⏁昿焵縣幺蛠ᗀ㒂晠蕭蛊በ㡈栈晦㙃䛀◡橠䩐ᇰ⩀ጠ⠠ᦕ◡䩀㡀膹▭ᒂᄩ⋀ߐᖀ䡀㞈ⵀ橼棠ޞ㐀遤Ԃұ䩍嚠㒂ꝟ㯫嗦隕杠⚤䜔䙅□湡亐Ҷ睨㫀⋃ҡ寱ߐ噠㫰蹠勠ᗐᑰݰ柢詠䡀妲╠ߔ䙅㙁橠ᓄԂұ䙋虢䙃孱ᆍ暾Ұ罠䫴ݨ杢异榠ᖁ䡀☠㛀㛂ԖႠᑈڄݲ晱㛈Ꭼቬᄀ■殀層㙂溔Ҥ暀ᒠꛀ⺨䘧颸㝁ቨ䝃㙁㚃ⵄ㚐虨勠ᘃ陠孱Ꮘߍ䡀㡈堈橪柠ݰᆚ誠坠ߑҨ晤佣剰ݪ䚪ዠ顷꒹厺ꋗᇬ■橡誈ҫ霼⍀䙂䛈䃈ᄢԒҲᖀ鉥陡㙁湡厤㚒Ԓ▐ߖ䡃䜀暲䛈ᖐႨ㹰ቶᓀ㙁■殀孢㚲⠀ᑸ嵣买ݨڅ㙵杠彫ꗼ納摻朶ᖀ䩑ᓑҴ䙆䙅䜀ښ檀硠䁌ҥ粤ᓁ晠礣䙁塠㞀⩀ጢᯋ㙁□玨䕀ᓑҴ晦㙀Ⳑݨڅԏҩҭ窤ᰖᅘڈᄅԂႰ㭔䁀䙁䣆晨څ㙶ተᄨ䁀ጠ㙀湡玨㹐⡈婠晤桐ԕ☠詠贂Ԋᯀጠ⇫㝅ᖀᓄԂұ䩍嚠ዩᇨ☣溿鹅寋霼⍐䙂㙇㛠ԏ槐䃁ҩዠ邀ᆈߐ䙄㚢Ҳᖀ鉥陡㙂湢玤㚒ҩԉ粤ᄡ曠碣䙀婢ұҨ硦皂⏁䙀嗦隕Ⴀ☠ᗒᓘ㙇㛿阪鄷蠘⺠晤杰孰ᄤڤڔ⪠ᦈ桪䙁䜀ښ誠㩘Ҫ劔Ҷ䙂㩁扠䩠蜒ұҹ竣陠孰ᄨԂҡ睠☠ᗐᑰݰښ洠啠◹ҩዠ邀ዠ陠ቢ頀罠⚦Ҥ還Ԁ晨䞈䐂ᄠ■☠䙄䛠䄐䝂ڀ聨ݤጦځ晤䄈杤晢ԙ䙈器晣䙐ႨԆ虤䝀㝄ڬڀ㙄㚠Ⴄڄ㒀ڀ岠⏈Ⴀ□譠䞂ҫ坤㬨邁ᦀ晨䚠婢ڙҭቦ骂ᘵ▢ᖁ㳢湸ߜᯀ䙋㙄皢㒄䚖睠㫀㜔佣һ朠ᖁ塠灨栨橪邀Ꮠቺ殀噣幸ݠ㲀⛡⫹☡厤ڒڃ伄ᯀ嵣Ұߐ䛍䡠䁌ҥ㑚ҫ㙂㚀䴀ᖂڂᯀ㚀ᗁ詠ᖆ詠飠㙁Ҽ癤㩠ޖ㚂瓭䩘ڃ令㳂ԁᆁ癨ᅄԔ▻盨㤔䙈㙄胪䚠ᓰ㹁Ԍ晲杨影ᄺ橠硠榱䩌ڮᒀ㙅湢亂⏂㙫仠⡀☊㫁晭蛀በ罠䭄坄䡅孰ᄨႭ䣐㹁艬ڀᓁድ☠躐Ҵ廈Ԍ晢条孱ڈစԁ梨婠㱖格㙔ݠݨበ桬Ԁ䙈⤠ᖠ虢ⵄ晤㔡ހᖀ歭ҰႰ彠Ⴀ䚙ұᔠڪ㡀▢檠地ቨݤ㲆ځ癠脨曤晤⤹ᖠᘀ䙇䣆晨စԁ杰㭔䁀䙇㩁⎰䙨蚤Ⴀ䋠ᖐ䡁䣂㙐䙄㛀虰卤ጢ▣䙐ቡ㘨㙂▨⚠晪䡃ዠߐᖀ橰ሐጠጠᗁһޅԄڄ⠃勠◲ᔐݻ朠ᖀ桠耐⠠ጠᖠݻރԄڂԁ䩎㙂嵣䉐ለݨ㧆盠嫠Ꮒᅊ㝀湡譠䟂㙚䩴Ҷ杠㛂湠輁癰䁁ұቢ恠湠湡◀ᓠ㫠ᘀ◠ᖩለڍ蛆በ䝀匸ᛐᄀተᄭ暱晲ԁҰ硧□䇁灨ငڄ⛣亠䂀ᠡޕ☡䩀飠㜁▥㡚ҫ䛀◡䩀㪐蹨Ⳁ晨杢䍀䩀䩀橰ᇰ⡐ጠᖠቴ杄Ԇ隒Ⴀ㛀㲬ᏈݰႨކ蚈虩Ұ晨佣橠琠襤ڲԂᗡ窀ⴀᐠ暺檠硠徠☀橦潭ҥ椰䙄㛄□ᖔ晦歭ҡ癨ݨ㙳癤晤晨杠䅁䭀䩀桠䞈㒀Ꭾᒐ㙂▢贠仠⚠㛀㚬ᏌݰႨݥ㙸晩艬㚀⏀ዠ桺桡硠桨ᦈ橰䙇㩁ᯈ有㜐ژ勠㒐ቨ㛀湡䛨㙀罨䛀㳂ᅊ㝅湠侁癠聨ݤ㙘Ⴋ㙂㚀⍠倠⚠㝄ڬᏘݰᄰ䚎桰潠䋠ᗐ䡁㩁㙈䞀䩀㡀⚠ᘀጠ㙀灠淤䙔亂ݠ◠ᛐ㝑ڍ暳晲Ҩ婥ᑔ䝈ᯁ椨ݨ䀀⥑Ԅ晢㝄ҭ□ᛀ倠⠈ݠ㡠⎺㙂⠀秠㪐䡂ᦈ桰⪣ᣐႰ奠㳢ډҤ䡈Һ㙂⠀祠㩐Ⴀ䪀㑴䙄㩁䱀䩡߀◹Ұ晪㙢㝄⻀祠㛰㡁ԁ⠈暡孰档ԁ塠徠◁⠈暡Ұ档ԁ塠徠☀桢ᓀᄀ■䩠婰Ⴈ䝄ڂႢ䙐ߑ䟠ԔႠ䋠ᖸ䡁㙄㦁▤ڂ晴除晰䙁尀曽ⵅԀߐ噬㲀ᗁҽԄԄڄ□繪乢䙄㙅珠睠㡀䝀䜘ᛘᄀᖠ死ᗀ㡀䞀⡠ᑔ䙇䅁Ҩݥԉ晩ҥ窤ᄀቴ杂Ԇ隀䝀ᘀ◲ᔐݻ曣ᖀ桠䞈㒀ᎮᔀݰႨݥ㙸晩艭隠⏀ዠꔀⵂߒڂᖅ窤◀ᔔݦᗀ嫰蹠勠ᴀᒠᔔݧ⺤䙔纂ݠ◰Ꮬݰڐ䚎洂晰کᐾ䝈ᯂᑐ䙄㙒Һ㩴Ҧ暀ᔔݧᗀ塠⡨㝀晨乢瑠湠䩀崔△砈癤Һᯁ椨ݨ㙓癤晤晨杠䅁䭀䩀桠耐⠠ጠᖠݻރԄҴ♃囨ᴀᖨᄬښ橠駀㙁Ұ癥㹁㙁胨曄ڂ湼䙄鑤ᖠᆐႪ䚲ҳ幰因◠ᖩለڍ蛎በ䝀㛤⎰ᄗᇴ□詠橾晣亠䂀ᄡޕ☠䩀飠㜁▭㡚ҫ㙁湠詠飠㜣勨Ꮦᗀ㙂⠀秠㡀⠈➑窰በⴀ縨䝁暠聨ݤጠᓅ⋀ߐᖀ飠㜡▬晢獤䙐Ⴊړ晲ҩҭ糢Ꮄ孴ݠᓁ暐罠㝄ᗴݰݰႰ䙆蚉䙉Ұ晶屢橠湡ᖀ㦠㪠ᘀᏂ㪬㝁湡ᛀ俠⥑Ҽ鉤ԀቴކԄԖ睰⭀◲ᔈݻ曡ᖀ塠䞈㒀Ꭾቬ㙂□ក彠❘⻀晨䙄㫁衠䴠寢ԙұᔰڪ▦湠亀㳢㙉Ҽ癤㹢ᇤ榠ᅄԒҹҼ癤䊫㝀礡▤ڂ晴除晢杢悕⠀晣䩕齨䙰▶杠㛀湠輁癠䁁Ҽ癤䉢ᆐړ䛈በ䞀⡰ጠᄀᇵ皠瓭䣀㙀躐ᯖ䙄䛁瓠㡀㡀䡈ߘឈᄀተᑍ暱ҲԁҤ鉥⪡㙀皥⻄䙲ԁ䙊噢邀ᔛݠᖀ棠㬀ᘀ⍴䡃㙂⡀靠㦰㙡Ҭ晨佣湠琠柤ڂԁ䩎䙂嵣买Ⴈݥ㙸晩艭㚀⏀ዠ顠ⵂߒҪᖅ窤ᄀᔔݦᗀ嫰蹠勠ᴄᄀݰሊڃ洒㙚媔ڀᖨᄮڈڨ㙧䦑䙈Ԕ枿㛄ᒀ蟈㙂◡ԍቢ邂ᣐሊځᘐ蹨器㱖枿㛄ᑈݥԉ虩▥⠚Ԁគ榠䩀㡀潠交በ⤠ቴކԄ䙔仈☠㫊ⳁ㙀湢䩁䝐■器㲀ႰᯐႪړҲ㙊㩴ቶ䙁▦ᑈݨ䁀⥑㙀晰䡃⋀♠◐Ⴆ罰困Ҥ暀Ԃ榠ᖀ骰蹡ԑᒀ☊㙃灠晤䛒ԙ䙈交⥁រ䃐噡⍔⪠䚀Ԕ䙇㩁ᯈ枨㙤麂ݠ㳂ᅋ㛂皠䩠蚔Ⴀ䫀⡀ᰀᦖ䃐䞎洂☊ᖀ桨ᓀ㙂㚀铤䙢ڢᯀ㜔䡈孱ڈԅ㙰Ⴀ☠䄔佣ڂ琠虤ݢҲᖡ誤ᓪ㝀湠䭠噢ҹԕ窲ᒀ棻朠ᖁበ㡈栨橦邂ݰڊ䚠በ㽀專硦ݥ䇁晨ႤԄ♣滨⍴䡁㙀炠虤Ԓګ伄ᯁភᆀ□◀洂㙢ᯀᏎⳀᣐᆐ䙭䡠坠佼䁀⤋㙆▣◐ݦ硬Ԁ䙀䝁㙀⠀晤Ң晰㛀ᏃҨ▭曰ڈᖝ蝡䙈Ҩ暀ހ虢ⵈ㹀曠㝇庠乢Ҧ暢詠飠㚢ᖩ躢ᄀᔔݠᖠ圠◹ҥᒀ▰ተሊځ橰稁ᖄ普乢ұߑ䟠ᖝ蝡䙈ݪⳀ㙁湠䡀朒ҡ䙉ڄҤ䙐߈Ԅҡ▨Ԑቶ䙃▦ᑈᆈ㹁ᓑ㙁በ䝃ᣐሐ䱍䢀Ⴀ⫬䙀䥀㙀䄐呮㡠ᄀݠҶᯀ㙀⚠ᅀ晢㹀厤ቤꚠݰҪڊ梀⚠ᘀᘃҢ孱߄ᨤ䚂ҫ勠ᴀᖛ㝁湠橠䡀䂘鋨ᖠҺ㙀■䩀崂㙙繩亠Ԁᆛݢᖀበ⚠❈鉤ᖠႥ邠䙠湒ҡ䙉交ᒨႢ☡䩀Ꮐ㛡Ҡ癤䉢ᒵ满ᖀ桠傸鋨▨暀ᆔݠᖀ衠䛀ڨ晦䙃㩁Ҩݭ䦠㙁Ҭ晦乢ተႺ誠秀㙠勠ᴐበ㛂□䩀䡀㝀㭬岤ᛄ䙐ႨԄڑҠ軠ᴀᒨႠ□厤䚃噰ݠᴀᒨႢ□叆蚀䚙ұበ恠ҰҨҥԂ蝰ᙘᖸ䙀㙀珠棤Ԁ薈㩄Ⲿ䥀䜸Һ誡ጠႠ䛀Ԁ㥢ᘠ暽檡婰ꇲ᧡褶䡌㡀▢亀䬰䡁ԍቢ䙋䛀礦誁䩐Ⴈ䩍ڀ◀ᘐᒚ洠䡂ҡԁጠ遰㻐Ұ䚍䡐Ⴀ䭄ᑔ䡉㙅㠃䙁園ڡҤ䙦䡀䛀菨枈㜶硫栥粤⠤ҰҰ䚉隤Ⴀ䭄ጠ⛡ޅ洨䟨㙂■Ⳁ晰䙀㙅䃍暢በ⚠䝄䜔㙱㙀皠玤㙒Ңᖅ窤Ԁ⍃榠ᅁ塠睠⚦ᖄ䙂䜁ݲᓤ䙔☛佥蝂醂⋒Ұ嘤㙀㡀⚠ᘀ䙁䛂㢃䙄ұڱ▩⠈暡孰晣ԁ塠桰ߜ⋐䙈䝀㐀蹤ݢډ繨麠◀ᛛݮᖁበ耐♰晰䙌䅁⪨Ⴄҳ噱因㚀ዶႴ▢◀ᓠ㦡ԁᖀ嵢塰ቨކ蚅蝠䛀⡬ጸ㙄□⍠䮂ځҬ鉤皀ᖐል暬በ桩䟨晬㙲㝀㞃䙨䐂ᄠ■☠䙂㙀橡ᅄԁڠ卧蚠极䍀Ұ撄ተ▲ҩڀځ唇板詠ᖐ㧢⎐唴乢Ң盙蟡墀ቯ櫡賢ᓱዠ■ᦀҢ▰噤㲀ځᇸ杰ڨበ⚠ޔҠ䡂䍀Ҩڈ眰㽀ᛄᑔ䝁㙀㚀厤䙄▻檔Ҷ⤠Ҵݠᗀ䩗ꈹҩᒃᏄᖵ芰噰㹨䨃檔Ҧ暀ݰݭ暠በᄠ▰桤䙁䛂䃈䙤Ҥ◃令ڀጡ朡䝂⺤Ԅ⪛琥ᒁᆂ梜䊑䟠ސ罠ᘀᗴҠ㙁㚿蚎㪐蹠Ⳁ晢䙀㳀ڈ暧䙀⚠ᛄᑔ䝁㙀㚀厤㙂Ұ婠㱖⪡ᣐᓈڄұҡᖍᔸ䙨ႠႰᖀ䡀☠㙬晤㙌㙀皠䩀㩐⡘鋤ᘃ隀㛀皠ᖠԔႠ䛀ڀᓪ㳀ҭ暠በ⠌犀晰㙘㙀胨䙤Ҥ▫仨ڀጧ⋀ᑂ詡ᖟң仰ݣ隀ᨫ栠䚯颐ቮ晡粤ⴄԀ藨䠀䩂ڂᖑ㡚Ԁᖈᔈ案皤ቫ令䉘Ⴋ㙆盠⎀壢ڪ■鑦䙠⋐ᆍ暣桠轠㬘ᖰ䙍㙂⻀棤ߒҹ繨䚀ⴀᖛݣᖁ硠ꁐ◀智杠䅁㥈ᇨ䙃干㛀䂀ዶႾ▣䩀䦠㠁Ԕ晢屢䁐ᓈҦ蚃Ⴀ嫠㺬ጠᄀݰᖁ穰榱Ԍ䚤䡎ዠ㚷ᖅԀڨᖰᖖ䙇ዠ□詡顠曠ڨ㱄暀ᘢ榠ᖁ䪐蹡ԕተ邁Ⴑ晰扠⍒㙁㙁ᓆⴁᇠ纨䙠䩀㡀⚠ᘀጠ㙅槢蛀Ұ䙠㙐▨ᖂብ盛螤㙰虰卧驸䝃ᯀ椰嬡ተ㺙Ҩ䙾䡁⋀▢満䫐䡂ᣄ桢⪡ᣐጰ䫇噠Ⴀ佤ᑖ䡄㙁橤誠㬐䡂ᣄ桢⪡ᣐጰ䙭䡀㽀ᛄᑔ㙀㛁湡ᖀ㳲㙢ᖑ㡈暡困暣ԁ塠⚠㇈橦栄鳚暭晠በႠ♀ᗰ屢㹐Ұ乭墀⠍◀晠析孨ᯆ橠橰䆙▰晢㙓㝀禡▨㱒▨噤㲀ᓁᇵ■◈⍒Ҫᖅ窀ԁᆐႨԍ墀䡈㝤☠柁㛀楠䞤Ҳһ仨⋃䬚ꄠ珠ҤҢұ䙈绌ዠ㙀㚐⺤䙔Ⳑ䛀ݢ䚪▬⋈ݨ㙶罰㛀ዠ㥢ކ杰◌㡐☀ᖬ晦杣孰Ұ乭塠⠈ᦈ䙀䝃㙂■叄䚄◂䩑ݢ螁ݦڂ詠㡀䆑▭ᓙ轕ݻҠᖀበ㞀♀鉤㙠Ԁ発誠㩚㚁ҡዠ遰⪭□◀崒㙡Ҥ䙦䡁䳂㙐劄㙐虨勠⋂ᓪ㙀㚐⺤Ҵ▫亠ڂᒠተښ誠橰䢈㝁ᑂ䝁ᯀ椨ԄԖ睰Ⳇ耡魡䅀ҨҤԂ晱朸ᖀ䙀䛠䄈暈䁠杠ڀ嚔䙄䛁脨曤ұݹ▥䁈暡困暣ԁ塠䁈㇈晠枠寰ڐ䙭䝀Ⴈ⭀◠ᅋ㝂㚀澀橤⤉ᖄ㹂⤠ݰߚ檠㩒䠘Ҡ晢条孱ᄨݨ㙖罰㛀ᗐተ㙁⠀棢ሢ㙚ᨽ⬄ᯄ䙠纨䙡晰聫ᘄጠᗁҰ߈߃崒㙢ᖉ㡚Ԁᆐᄺ檠㩒䠘ҡᑂ杠㙀皠厤ڄ▫勠ᗐበ㙁⠀曢ሤ⪚㺬桢⤠Ԁ鹠ⵄ晢Ҫ㩴ݢ螁⏀鵨ᛀ䙄仈☠䒀▰ዠ鵨ᛀ䙄仈☠㢀⠐ቦݢ躀ተ顮雠癤څ⋀椨ሤݡԀ勠䑠⪫㙆盔ҭ䢀Ⴀ庌㷜㱓Ԁ虢ᅔ㛀■ҡ礼賉嶔荾䙄禆榣虠烀壘Ҷ焨ᖄᒅ柣虠焸魠圙䀛鐦䶐Ꮋ簱蝊骀嬙湽㐭顧䆃搩蹠私岚►哄␆ꈙል眾飔ԉ羸钬綢ᓋ狡輾門怔䈜瓠ᛆ⦻琽蕄誀嬙湽㐭顧䆃搩蹠染怗缺劎沶䝃㟅輢䚩忰䍛鑄⏖槛瀰ކ闍声䈙橬絆䆻㟕溠雁徐膹哬綇㽃᧩炠髏巰䅛鐬顦ꈱሑ蔾䚳媗苽ҩ糷䇛䯹璠蟒娚膹吮涐ᐣ搜机蟎拰䅘听綐ᐣ搜本诗㙶㺛猎噥䦻拡脢铙㙺䁜猌㲇㹂思躠诎帚耺ᖎ泧㥫ᣑ豠珅崗苾䩌㴆觛⻅輲闎㙲苼瑎䙆饫幡䄊鏏徜湸鑎嶢ᓋ狡輾門怖纻⻀ᠦ燋㫁派駔㙴茨㓍鵒ᔛ寥缸ڡ従舻沭㙅䦃㫁蜢駓戗苹ᖌ浖凹ᇹ蕈䚭圚㼚ᖎ泦佣琵蝀鋉夒►⫮峠Ꮋ簱蝊骀店肻瓬綂ᓫ䰍脢髃婠㨝哮␗䝃䰌杈闏㙶䈛獀ព⥣盡祆䚴帗湻㐭賐Ꮫ㯍謪骀嬙湽㐭顦觛忼ހ蟓怛舼狤⋗㽃砝蒠鋏嶓晰哎嵖䆋᧱焨䚤圚㺈ⴎ塧䦻拡缾铇Ԋ䁜猌㲆燓䋁猢迌愙㾀❌紶ꈳ諡派駔㙴茨㓍鵒ᓣ᧩甪ڔ嬖羨⬭鶗䝃䰌杈闏㙶㺜獌癥凓吙蕎钀夙䋛钤ᰖꇃ㩁楄跏嵹䂙Ҩ絆䆻㟥茮䚦圔腹勠ᗆ养揱礼趀妐肻Ⰼ晦⦳䏽苄詠䛹䀛鐦䰴䆻怱煐骀堗臽Ⰿ␂ᓋ狡䋪犬ԇ莽㑎綢ᔃ搅荈诒㙴茨➊笤虢码炠蟌岗缸哬硦醋尝譒䚣圖䅘犌崒ᓋ狡䋪犬Ԋ䁙䩌趆冉ᇵ焺闒拰㼘叭沆⤛勡祆䚎儆㥀⢍ᴗ㥩ᇥ負铏㙹莸鍤┆凳琅蔼䚯奰㚜獍鵃㙂珥罈䚰帔臽Ⰾ䡆燹ᄙ僸犌㙱䎝ᖎ屶訁ᇱ焼跔婰䂜詭赗䝁晡䴊角多▼㐭㴧䥫满祆䚎儆㥋ᖌ䶗䝃珵浄诔㙶㾛獎波ᓋ狡茾骀㹀㩘哎巖ꈳ㛁蜾迎悒苨ⴎ塤養垐纠裕恰䉘哎巖ꈳ㛁缪铇悔►哄⎆ꉁ߀ݢ駓帑肸哬粢ᒣ᧱梠雏嬗䍙咤⋗㽂徵㻘劀垚荨⫬桦見忽輰䚩忰䇛铤ᒀᄣ怵缸你䜚ᖂꖠ晰ҠҨҠңҠҡҠҠ习Ҡ⪠ҠᔀҠႠҠڈҠҴҠҥ晠ҡ晠Ҡ婠Ҡ㑀ҠᕀҠကҠԈҠҤҠҢҠҠ湠Ҡ䑀Ҡ⋀Ҡ߀ҠҨҠҸҠҠҠҠ䙀Ҡ剠Ҡ⎠ҠᄠҠԐҠԌҠҨҠңҠҠҠҠ⠀ҠႠҠሠҠڨҠҴҠҧҠҠ噠Ҡ㹀Ҡ⎠ҠڀҠݰҠҰҠҧҠҢ䙀Ҡ㹀ҠበҠ⋀ҠᆀҠژҠҼҠҡҠҠ虠Ҡ㩀Ҡ⠀ҠႠҠҠҠԜҠҨҠҢ䙀ҠҠҠ⠀ҠᔀҠڀҠԀҠҴҠҧ晠ҡ虠ҠᖀҠ⤀ҠᒀҠڠҠԀҠңҠң䙀Ҡ㙀Ҡ㹀ҠᒀҠᄠҠҠҠҶҠҤҠҠ噠Ҡ㙀ҠⳀҠሀҠڐҠԜҠҮҠҠ䙀Ҡ湠Ҡ㹀ҠᏀҠԀҠڸҠҼҠҦ晠Ҡ晠Ҡ习ҠҠҠሀҠڠҠҬҠҩҠҠ晠Ҡ晠Ҡ㱀Ҡ⋀ҠᅀҠԘҠҼҠҦҠҠ㙀Ҡ⪠Ҡ⚠ҠᄠҠҠҠԜҠҤҠҢҠҠ噠ҠᖀҠᛀҠ߀ҠڸҠҼҠҤ晠ҡ噠Ҡ⪠ҠҠҠበҠ߀ҠҨҠҭҠҡ虠Ҡ■Ҡ■ҠᛀҠހҠڐҠҤҠҤҠҠ晠Ҡ䉀ҠᯀҠڀҠڐҠԜҠҫҠҢ䙀Ҡ陠ҠᯀҠᯀҠᇠᖛ䛨喔ᖂҠҡҠҠ噠Ҡ㙀ҠᛀҠᆀҠڰҠԀҠҩҠҢ晠Ҡ繠Ҡ㹀Ҡ⋀ҠሀҠڸҠҼҠҥҠҠ晠Ҡ䙀Ҡ⚠ҠᕀҠߐҠҸҠҡҠңҠҠҠҠᖀҠᣀҠကҠԈҠҦҠԛ枠ҳ嚠ҡ㩘ҡ㥆Ҡ䜁晠Ⳁ䙀ᕼ■ҰᏀԉ䛠Ң庘Ң籬Ҡ難Ҡ߀陠Ⴘ㩀ሆ⎠Ԝ栠ҩ䚰ҥ噼ҡ衤Ҡ抡Ҡᓰ噠လ⠀ڐᒀҶހҮ◈ҡ乨ҠᘃҠ㘀晠⋀㩀ݤᖀںᄠҭڀҥ驴Ҡ呤Ҡ壡晠ҠҠڤҴҹ⭌晠ҠڐҠҠҠ⚠ҠҢ虠ҠҠҠԒұᛌ沦䚡䚰ҨԄ㱰Ҡᘃᑀҡ噠在ҠԒ㽙Ԁ誦ᅄ㜠ҠҠҠҠ⭀Ꮓ䥣㟐ڨҠᖀ⚮ҠҢ䙁虠ڰႧ㱰⤁ᯀ㚵襡垱㹀ҠԆҠҠጣҠҠҠ噠Ҹځ棬椠䡀ᖙ♨労䑀Ҡቧ晠ҠݱҠҠҠ㙀ҨҰ幃㛰☰Ⴇ㱲⤞☠ҠҢ㙀ҠԄ䩀ҠҠᘀҢ䙀ߐҠԔ䁚Ԁ蛦柁蠀Ҡڨ媔ҠҠҠᄀᖛ㼐剤习栟ⳅ殥虠ҠޘҠҠ⚴ҠҠҢ晠ހႧ肔⤁⤀㚾䦁壑习ҠԊҠҠጥ晠ҠҠ繠ԌҠ㹘独賦秃怡譥ᘆ檥䥀㚱ᓡ噰㹂═屶⚟ꡟꡟꡟꡐቭ曐㶘ᙑ悯ҵ騗礈ᔂ溟ꡞ撇ᛀҠ⭀Ҡ␀⪠Ԁ䵀ڐ䟀䙈ᖠ鹤ጺ噠ခꄢ池ҠᓐҠሄҠګꡟꡓ藟ꡙ㰿ꡜҠҠҠҠ䘿ꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟ鹠ᖈᯈᛆᔄᎿꡟꡟꡟꋈ㱘Ⳏ┨ᗄ棂枱團蛄媖䉝㕏湨䪄晟ꡟꡟꔔ⤌⋇ᕄዢ䝱䛨纼嚒䁛㑎淧詤㡢䘿ꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟꡟ陠▰㙜ᯌᛀҠҠҠԀҦҬҡ晤Ҡ噡䙀⪠噠ᒀ㑀߀ᖀԐᄀҬڐңҶҠ虦Ҡ㹁癠ᯀ幠ᆀ㕀ڠᖀҸႰҦڈҡ晳Ҡ噥Ҡ⪡习ᒀ剠߀⦠ԐᒀҬ߈ңԔҠ虭晠㹃晠ᯀ驠ᆀ䑀ڠ╠ҸҠҥ牤ҡ楢Ҡ圠虠⫰䙀ᒌ⠀߃ᒀԐ蝀Ҭ㺀ңᯒҠ蟥Ҡ㺡噠ᯘ噠ᆆⳀک槠Ҹ坐Ҧ⪠ҹ慡Ҧ圠晡犐㹀奬■ⲛԀ鵨ᅀ陰Ҡݠ儁";
  return base32768.decode(base32768WASM);
}
(function () {
  var wasmMeta = {};
  if (typeof self === "undefined") {
    var self = {
      location: {
        href: ""
      }
    };
  }
  var Module = function () {
    var _scriptDir = wasmMeta.url;
    return function (Module) {
      Module = Module || {};
      var Module = typeof Module != "undefined" ? Module : {};
      var readyPromiseResolve, readyPromiseReject;
      Module["ready"] = new Promise(function (resolve, reject) {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      Module["wasmBinary"] = getWasmBinary();
      Module["locateFile"] = function () {};
      Module["onRuntimeInitialized"] = function () {
        argon2 = cwrap("hash_a2", "string", ["string", "string", "number", "number", "number", "number", "number", "number"]);
      };
      var moduleOverrides = Object.assign({}, Module);
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = function quit_(status, toThrow) {
        throw toThrow;
      };
      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = true;
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var read_, readAsync, readBinary, setWindowTitle;
      if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document != "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptDir) {
          scriptDirectory = _scriptDir;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        } else {
          scriptDirectory = "";
        }
        {
          read_ = function read_(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = function readBinary(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            };
          }
          readAsync = function readAsync(url, onload, onerror) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
        setWindowTitle = function setWindowTitle(title) {
          return document.title = title;
        };
      } else {}
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.warn.bind(console);
      Object.assign(Module, moduleOverrides);
      moduleOverrides = null;
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      if (Module["quit"]) quit_ = Module["quit"];
      var wasmBinary;
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
      var noExitRuntime = Module["noExitRuntime"] || true;
      if ((typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) != "object") {
        abort("no native wasm support detected");
      }
      var wasmMemory;
      var ABORT = false;
      var EXITSTATUS;
      function getCFunc(ident) {
        var func = Module["_" + ident];
        return func;
      }
      function ccall(ident, returnType, argTypes, args, opts) {
        var toC = {
          "string": function string(str) {
            var ret = 0;
            if (str !== null && str !== undefined && str !== 0) {
              var len = (str.length << 2) + 1;
              ret = stackAlloc(len);
              stringToUTF8(str, ret, len);
            }
            return ret;
          },
          "array": function array(arr) {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret;
          }
        };
        function convertReturnValue(ret) {
          if (returnType === "string") return UTF8ToString(ret);
          if (returnType === "boolean") return Boolean(ret);
          return ret;
        }
        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        if (args) {
          for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
              if (stack === 0) stack = stackSave();
              cArgs[i] = converter(args[i]);
            } else {
              cArgs[i] = args[i];
            }
          }
        }
        var ret = func.apply(null, cArgs);
        function onDone(ret) {
          if (stack !== 0) stackRestore(stack);
          return convertReturnValue(ret);
        }
        ret = onDone(ret);
        return ret;
      }
      function cwrap(ident, returnType, argTypes, opts) {
        argTypes = argTypes || [];
        var numericArgs = argTypes.every(function (type) {
          return type === "number";
        });
        var numericRet = returnType !== "string";
        if (numericRet && numericArgs && !opts) {
          return getCFunc(ident);
        }
        return function () {
          return ccall(ident, returnType, argTypes, arguments, opts);
        };
      }
      var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
      function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
          return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str;
      }
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      function writeArrayToMemory(array, buffer) {
        HEAP8.set(array, buffer);
      }
      var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 67108864;
      var wasmTable;
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      function keepRuntimeAlive() {
        return noExitRuntime;
      }
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__);
      }
      function preMain() {
        callRuntimeCallbacks(__ATMAIN__);
      }
      function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
      }
      function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      function abort(what) {
        {
          if (Module["onAbort"]) {
            Module["onAbort"](what);
          }
        }
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        EXITSTATUS = 1;
        what += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";
      function isDataURI(filename) {
        return filename.startsWith(dataURIPrefix);
      }
      var wasmBinaryFile;
      if (Module["locateFile"]) {
        wasmBinaryFile = "hash_a2.wasm";
        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = locateFile(wasmBinaryFile);
        }
      } else {
        wasmBinaryFile = new URL("hash_a2.wasm", wasmMeta.url).toString();
      }
      function getBinary(file) {
        try {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          } else {
            throw "both async and sync fetching of the wasm failed";
          }
        } catch (err) {
          abort(err);
        }
      }
      function getBinaryPromise() {
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
          if (typeof fetch == "function") {
            return fetch(wasmBinaryFile, {
              credentials: "same-origin"
            }).then(function (response) {
              if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
              }
              return response["arrayBuffer"]();
            })["catch"](function () {
              return getBinary(wasmBinaryFile);
            });
          }
        }
        return Promise.resolve().then(function () {
          return getBinary(wasmBinaryFile);
        });
      }
      function createWasm() {
        var info = {
          "env": asmLibraryArg,
          "wasi_snapshot_preview1": asmLibraryArg
        };
        function receiveInstance(instance, module) {
          var exports = instance.exports;
          Module["asm"] = exports;
          wasmMemory = Module["asm"]["memory"];
          updateGlobalBufferAndViews(wasmMemory.buffer);
          wasmTable = Module["asm"]["__indirect_function_table"];
          removeRunDependency("wasm-instantiate");
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result) {
          receiveInstance(result["instance"]);
        }
        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(function (instance) {
            return instance;
          }).then(receiver, function (reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason);
          });
        }
        function instantiateAsync() {
          if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && typeof fetch == "function") {
            return fetch(wasmBinaryFile, {
              credentials: "same-origin"
            }).then(function (response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiationResult, function (reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(receiveInstantiationResult);
              });
            });
          } else {
            return instantiateArrayBuffer(receiveInstantiationResult);
          }
        }
        if (Module["instantiateWasm"]) {
          try {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports;
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
          }
        }
        instantiateAsync()["catch"](readyPromiseReject);
        return {};
      }
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback(Module);
            continue;
          }
          var func = callback.func;
          if (typeof func == "number") {
            if (callback.arg === undefined) {
              getWasmTableEntry(func)();
            } else {
              getWasmTableEntry(func)(callback.arg);
            }
          } else {
            func(callback.arg === undefined ? null : callback.arg);
          }
        }
      }
      var wasmTableMirror = [];
      function getWasmTableEntry(funcPtr) {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      }
      function handleException(e) {
        if (e instanceof ExitStatus || e == "unwind") {
          return EXITSTATUS;
        }
        quit_(1, e);
      }
      var asmLibraryArg = {};
      var asm = createWasm();
      var _argon2_hash = Module["_argon2_hash"] = function () {
        return (_argon2_hash = Module["_argon2_hash"] = Module["asm"]["argon2_hash"]).apply(null, arguments);
      };
      var _hash_a2 = Module["_hash_a2"] = function () {
        return (_hash_a2 = Module["_hash_a2"] = Module["asm"]["hash_a2"]).apply(null, arguments);
      };
      var __initialize = Module["__initialize"] = function () {
        return (__initialize = Module["__initialize"] = Module["asm"]["_initialize"]).apply(null, arguments);
      };
      var stackSave = Module["stackSave"] = function () {
        return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments);
      };
      var stackRestore = Module["stackRestore"] = function () {
        return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments);
      };
      var stackAlloc = Module["stackAlloc"] = function () {
        return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments);
      };
      var calledRun;
      function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
      }
      var calledMain = false;
      var mainArgs = undefined;
      dependenciesFulfilled = function runCaller() {
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller;
      };
      function callMain(args) {
        var entryFunction = Module["__initialize"];
        mainArgs = [thisProgram].concat(args);
        try {
          entryFunction();
          var ret = 0;
          exit(ret, true);
          return ret;
        } catch (e) {
          return handleException(e);
        } finally {
          calledMain = true;
        }
      }
      function run(args) {
        args = args || arguments_;
        if (runDependencies > 0) {
          return;
        }
        preRun();
        if (runDependencies > 0) {
          return;
        }
        function doRun() {
          if (calledRun) return;
          calledRun = true;
          Module["calledRun"] = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          readyPromiseResolve(Module);
          if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
          if (shouldRunNow) callMain(args);
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function () {
            setTimeout(function () {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      Module["run"] = run;
      function exit(status, implicit) {
        EXITSTATUS = status;
        procExit(status);
      }
      function procExit(code) {
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
          if (Module["onExit"]) Module["onExit"](code);
          ABORT = true;
        }
        quit_(code, new ExitStatus(code));
      }
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      var shouldRunNow = true;
      if (Module["noInitialRun"]) shouldRunNow = false;
      run();
      return Module.ready;
    };
  }();
  argon2Promise = Module();
})();

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*************************************!*\
  !*** ./src/worker/worker-argon2.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PoWWorker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PoWWorker */ "./src/worker/PoWWorker.ts");
/* harmony import */ var _libs_argon2_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../libs/argon2_wasm */ "../libs/argon2_wasm.js");
/* harmony import */ var _libs_argon2_wasm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_argon2_wasm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/FaucetConfig */ "./src/common/FaucetConfig.ts");



(function () {
  (0,_libs_argon2_wasm__WEBPACK_IMPORTED_MODULE_1__.getArgon2ReadyPromise)().then(function () {
    var argon2 = (0,_libs_argon2_wasm__WEBPACK_IMPORTED_MODULE_1__.getArgon2)();
    new _PoWWorker__WEBPACK_IMPORTED_MODULE_0__.PoWWorker({
      hashFn: function hashFn(nonce, preimg, params) {
        if (params.a !== _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_2__.PoWHashAlgo.ARGON2) return null;
        return argon2(nonce, preimg, params.l, params.i, params.m, params.p, params.t, params.v);
      }
    });
  });
})();
}();
/******/ })()
;
//# sourceMappingURL=powfaucet-worker-a2.js.map