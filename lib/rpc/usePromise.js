"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function usePromise() {
    var resolve;
    var reject;
    var promise = new Promise(function (resolveIn, rejectIn) {
        resolve = resolveIn;
        reject = rejectIn;
    });
    return { promise: promise, resolve: resolve, reject: reject };
}
exports.default = usePromise;
//# sourceMappingURL=usePromise.js.map