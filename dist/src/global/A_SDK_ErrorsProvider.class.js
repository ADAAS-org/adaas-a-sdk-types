"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_ErrorsProvider = void 0;
const A_SDK_Error_class_1 = require("./A_SDK_Error.class");
const A_SDK_ServerError_class_1 = require("./A_SDK_ServerError.class");
const errors_constants_1 = require("../constants/errors.constants");
/**
 * This class helps to organize and manage errors in the SDK.
 */
class A_SDK_ErrorsProvider {
    constructor(alias) {
        this.alias = 'A_SDK_ErrorsProvider';
        this.registeredErrors = new Map();
        this.alias = alias;
        /**
         * Add default errors to the registry
         */
        this.addRegistry(errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS);
    }
    /**
     * This method adds a dictionary of errors to the registry.
     *
     * @param registry
     */
    addRegistry(registry) {
        const errors = Object.values(registry);
        errors.forEach(err => this.registerError(err));
    }
    /**
     *
     * @param error
     */
    registerError(error) {
        this.registeredErrors.set(error.code, Object.assign(Object.assign({}, error), { code: `${this.alias}-${error.code}` }));
    }
    /**
     * This method returns an error object by its code.
     *
     * @param code
     * @returns
     */
    getError(code) {
        const template = this.registeredErrors.get(code);
        if (!template)
            return;
        if (template.serverCode) {
            return new A_SDK_ServerError_class_1.A_SDK_ServerError(template);
        }
        else {
            return new A_SDK_Error_class_1.A_SDK_Error(template);
        }
    }
}
exports.A_SDK_ErrorsProvider = A_SDK_ErrorsProvider;
//# sourceMappingURL=A_SDK_ErrorsProvider.class.js.map