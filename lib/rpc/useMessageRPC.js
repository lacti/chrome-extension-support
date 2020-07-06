"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useLogger_1 = __importDefault(require("../logger/useLogger"));
var nanoid_1 = require("nanoid");
var once_1 = __importDefault(require("./once"));
var usePromise_1 = __importDefault(require("./usePromise"));
function useMessageRPC(_a) {
    var _b = (_a === void 0 ? {} : _a).logger, logger = _b === void 0 ? useLogger_1.default() : _b;
    var functionMap = {};
    var promiseMap = {};
    function listen() {
        var _this = this;
        chrome.runtime.onMessage.addListener(function (request) { return __awaiter(_this, void 0, void 0, function () {
            var callId, functionName, payload, result, error_1, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug("Receive message", request);
                        callId = request.callId;
                        if (!callId) {
                            return [2];
                        }
                        functionName = request.functionName;
                        if (!functionName) return [3, 5];
                        payload = request.payload;
                        logger.debug(callId, "Call function", functionName, "with", payload);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, functionMap[functionName].apply(functionMap, __spread(payload))];
                    case 2:
                        result = _a.sent();
                        logger.debug("Return function", functionName, "with", result);
                        chrome.runtime.sendMessage({ callId: callId, payload: result });
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        chrome.runtime.sendMessage({ callId: callId, error: error_1 });
                        logger.debug("Error function", functionName, "with", error_1);
                        return [3, 4];
                    case 4: return [3, 6];
                    case 5:
                        if (callId in promiseMap) {
                            payload = request.payload;
                            logger.debug("Receive return", callId, payload);
                            if (payload instanceof Error) {
                                promiseMap[callId].reject(payload);
                            }
                            else {
                                promiseMap[callId].resolve(payload);
                                delete promiseMap[callId];
                            }
                        }
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        }); });
    }
    var listenOnce = once_1.default(listen);
    function serve(functionName, fn) {
        listenOnce();
        functionMap[functionName] = fn;
    }
    function stub(functionName) {
        listenOnce();
        return function delegate() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var callId, _a, promise, resolve, reject;
                return __generator(this, function (_b) {
                    callId = nanoid_1.nanoid();
                    _a = usePromise_1.default(), promise = _a.promise, resolve = _a.resolve, reject = _a.reject;
                    promiseMap[callId] = { resolve: resolve, reject: reject };
                    logger.debug("Request call", callId, functionName, args);
                    chrome.runtime.sendMessage({
                        functionName: functionName,
                        callId: callId,
                        payload: args,
                    });
                    return [2, promise];
                });
            });
        };
    }
    return { serve: serve, stub: stub };
}
exports.default = useMessageRPC;
//# sourceMappingURL=useMessageRPC.js.map