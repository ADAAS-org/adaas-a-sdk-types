"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_Error = void 0;
const axios_1 = require("axios");
class A_SDK_Error extends Error {
    constructor(params) {
        super((params === null || params === void 0 ? void 0 : params.message) || 'Oops... Something went wrong');
        this.identifyErrorType(params);
    }
    identifyErrorType(error) {
        var _a, _b, _c;
        if (error.code &&
            error.description &&
            error.serverCode) {
            const target = error;
            this.message = target.message;
            this.code = target.code;
            this.description = target.description;
            this.originalError = target.originalError;
        }
        else if (error instanceof Error) {
            this.message = error.message;
            this.code = 'ADAAS-DEFAULT-ERR-0000';
            this.description = 'If you see this error please let us know.';
            this.originalError = error;
        }
        else if (error instanceof axios_1.AxiosError) {
            this.message = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) || error.message;
            this.code = ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data.code) || 'ADAAS-DEFAULT-ERR-0000';
            this.description = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data.description) || 'If you see this error please let us know.';
            this.originalError = error.response;
        }
    }
    get compilingData() {
        return {
            message: this.message,
            code: this.code,
            description: this.description,
            originalError: this.originalError
        };
    }
    toJSON() {
        return this.compilingData;
    }
}
exports.A_SDK_Error = A_SDK_Error;
//# sourceMappingURL=A_SDK_Error.class.js.map