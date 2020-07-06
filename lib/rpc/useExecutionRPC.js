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
var executeScript_1 = __importDefault(require("../chrome/executeScript"));
var nanoid_1 = require("nanoid");
var once_1 = __importDefault(require("./once"));
var queryTabs_1 = __importDefault(require("../chrome/queryTabs"));
var usePromise_1 = __importDefault(require("./usePromise"));
function useExecutionRPC(_a) {
    var _b = (_a === void 0 ? {} : _a).logger, logger = _b === void 0 ? useLogger_1.default() : _b;
    function serve(functionName, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = JSON.parse(_executionContext);
                        logger.debug(_executionId, "Call delegate", functionName, "with", args);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, fn.apply(void 0, __spread(args))];
                    case 2:
                        result = _a.sent();
                        logger.debug(_executionId, functionName, result);
                        chrome.runtime.sendMessage({
                            executionId: _executionId,
                            payload: result,
                        });
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        logger.debug(_executionId, functionName, error_1);
                        chrome.runtime.sendMessage({ executionId: _executionId, payload: error_1 });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    }
    var promiseMap = {};
    function listen() {
        var _this = this;
        chrome.runtime.onMessage.addListener(function (request) { return __awaiter(_this, void 0, void 0, function () {
            var _a, executionId, payload;
            return __generator(this, function (_b) {
                _a = request, executionId = _a.executionId, payload = _a.payload;
                logger.debug("Listen from execution", request);
                if (executionId && executionId in promiseMap) {
                    if (payload instanceof Error) {
                        promiseMap[executionId].reject(payload);
                    }
                    else {
                        promiseMap[executionId].resolve(payload);
                    }
                    delete promiseMap[executionId];
                }
                return [2];
            });
        }); });
    }
    var listenOnce = once_1.default(listen);
    function stub(functionName) {
        listenOnce();
        return function delegate() {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var tabId, thisExecutionId, _b, promise, resolve, reject;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, queryTabs_1.default({ active: true, currentWindow: true })];
                        case 1:
                            tabId = (_a = (_c.sent())[0]) === null || _a === void 0 ? void 0 : _a.id;
                            thisExecutionId = nanoid_1.nanoid();
                            logger.debug("Run query on tab", tabId, "with", thisExecutionId);
                            _b = usePromise_1.default(), promise = _b.promise, resolve = _b.resolve, reject = _b.reject;
                            promiseMap[thisExecutionId] = { resolve: resolve, reject: reject };
                            logger.debug({ tabId: tabId, thisExecutionId: thisExecutionId }, "Setup context");
                            return [4, executeScript_1.default(tabId, {
                                    code: "var _executionId = \"" + thisExecutionId + "\"; var _executionContext = " + JSON.stringify(JSON.stringify(args)) + "; console.log(_executionId, _executionContext);",
                                })];
                        case 2:
                            _c.sent();
                            logger.debug({ tabId: tabId, thisExecutionId: thisExecutionId, functionName: functionName, args: args }, "Run function");
                            return [4, executeScript_1.default(tabId, { file: "execute." + functionName + ".js" })];
                        case 3:
                            _c.sent();
                            return [2, promise];
                    }
                });
            });
        };
    }
    return { serve: serve, stub: stub };
}
exports.default = useExecutionRPC;
//# sourceMappingURL=useExecutionRPC.js.map