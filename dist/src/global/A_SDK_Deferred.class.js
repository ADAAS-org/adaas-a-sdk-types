"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_Deferred = void 0;
class A_SDK_Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
    }
    resolve(value) {
        this.resolveFn(value);
    }
    reject(reason) {
        this.rejectFn(reason);
    }
}
exports.A_SDK_Deferred = A_SDK_Deferred;
//# sourceMappingURL=A_SDK_Deferred.class.js.map