"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function useLogger(_a) {
    var _b = (_a === void 0 ? {} : _a).level, filteredLevel = _b === void 0 ? "debug" : _b;
    function logger(level) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (logLevelToSeverity(level) >= logLevelToSeverity(filteredLevel)) {
                console[level].apply(console, __spread([new Date().toISOString(), level.toUpperCase()], args));
            }
        };
    }
    return {
        trace: logger("trace"),
        debug: logger("debug"),
        info: logger("info"),
        warn: logger("warn"),
        error: logger("error"),
    };
}
exports.default = useLogger;
function logLevelToSeverity(level) {
    switch (level) {
        case "trace":
            return 0;
        case "debug":
            return 10;
        case "info":
            return 20;
        case "warn":
            return 30;
        case "error":
            return 40;
    }
    return 99;
}
//# sourceMappingURL=useLogger.js.map