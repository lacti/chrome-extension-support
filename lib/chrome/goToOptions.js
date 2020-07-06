"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function goToOptions(_a) {
    var _b = (_a === void 0 ? {} : _a).optionsPageFile, optionsPageFile = _b === void 0 ? "options.html" : _b;
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    }
    else {
        window.open(chrome.runtime.getURL(optionsPageFile));
    }
}
exports.default = goToOptions;
//# sourceMappingURL=goToOptions.js.map