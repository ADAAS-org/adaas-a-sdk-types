import { A_SDK_TYPES__Error } from "../types/A_SDK_Error.type";
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_ServerError } from "./A_SDK_ServerError.class";
import { A_SDK_CONSTANTS__DEFAULT_ERRORS, A_SDK_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_TYPES__Dictionary } from "../types/common.types";


/**
 * This class helps to organize and manage errors in the SDK.
 */
export class A_SDK_ErrorsProvider {

    private alias: string = 'A_SDK_ErrorsProvider';

    protected registeredErrors: Map<string, A_SDK_TYPES__Error> = new Map();

    constructor(alias: string) {
        this.alias = alias;
        /**
         * Add default errors to the registry
         */
        this.addRegistry(A_SDK_CONSTANTS__DEFAULT_ERRORS);
    }

    /**
     * This method adds a dictionary of errors to the registry.
     * 
     * @param registry 
     */
    addRegistry(registry: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error>) {
        const errors = Object.values(registry);

        errors.forEach(err => this.registerError(err));
    }


    /**
     * 
     * @param error 
     */
    registerError(error: A_SDK_TYPES__Error) {
        this.registeredErrors.set(error.code, {
            ...error,
            code: `${this.alias}-${error.code}`
        });
    }

    /**
     * This method returns an error object by its code.
     * 
     * @param code 
     * @returns 
     */
    getError(code: A_SDK_CONSTANTS__ERROR_CODES | string): A_SDK_ServerError | A_SDK_Error | undefined {
        const template = this.registeredErrors.get(code);

        if (!template) return;

        if (template.serverCode) {
            return new A_SDK_ServerError(template);
        } else {
            return new A_SDK_Error(template);
        }
    }
}