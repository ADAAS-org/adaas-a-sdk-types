"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_CONSTANTS__DEFAULT_ERRORS = exports.A_SDK_CONSTANTS__ERROR_CODES = void 0;
var A_SDK_CONSTANTS__ERROR_CODES;
(function (A_SDK_CONSTANTS__ERROR_CODES) {
    A_SDK_CONSTANTS__ERROR_CODES["UNEXPECTED_ERROR"] = "DEFAULT-ERR-0001";
    A_SDK_CONSTANTS__ERROR_CODES["METHOD_NOT_IMPLEMENTED"] = "DEFAULT-ERR-0002";
    A_SDK_CONSTANTS__ERROR_CODES["ROUTE_NOT_FOUND"] = "DEFAULT-ERR-0003";
    A_SDK_CONSTANTS__ERROR_CODES["TOKEN_NOT_PROVIDED"] = "DEFAULT-ERR-0004";
    A_SDK_CONSTANTS__ERROR_CODES["NOT_ALL_PARAMS_WAS_PROVIDED"] = "DEFAULT-ERR-0005";
})(A_SDK_CONSTANTS__ERROR_CODES || (exports.A_SDK_CONSTANTS__ERROR_CODES = A_SDK_CONSTANTS__ERROR_CODES = {}));
;
exports.A_SDK_CONSTANTS__DEFAULT_ERRORS = {
    UNEXPECTED_ERROR: {
        serverCode: 500,
        code: 'DEFAULT-ERR-0001',
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    METHOD_NOT_IMPLEMENTED: {
        serverCode: 500,
        code: 'DEFAULT-ERR-0002',
        description: 'If you see this error please let us know.',
        message: 'Oops... Something went wrong'
    },
    ROUTE_NOT_FOUND: {
        serverCode: 404,
        code: 'DEFAULT-ERR-0003',
        description: 'We can not find the route you\'re looking for. Please make sure that you\'re using the correct path.',
        message: 'The target route is not found.'
    },
    TOKEN_NOT_PROVIDED: {
        serverCode: 401,
        code: 'DEFAULT-ERR-0004',
        description: 'The token is missed in the Authorization header. Please make sure that it\'s presented.',
        message: 'Token has not found in the authorization header.'
    },
    NOT_ALL_PARAMS_WAS_PROVIDED: {
        serverCode: 409,
        name: 'NOT_ALL_PARAMS_WAS_PROVIDED',
        code: 'DEFAULT-ERR-0005',
        description: 'Not all required params provided in the request',
        message: 'Conflict in request'
    },
};
//# sourceMappingURL=errors.constants.js.map