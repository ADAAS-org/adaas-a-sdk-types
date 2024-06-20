import { A_SDK_TYPES__Error } from "../types/A_SDK_Error.type";
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_ServerError } from "./A_SDK_ServerError.class";
import { A_SDK_CONSTANTS__DEFAULT_ERRORS, A_SDK_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_TYPES__Dictionary } from "../types/common.types";


/**
 * This class helps to organize and manage errors in the SDK.
 */
export class A_SDK_ErrorsProvider {

    private namespace: string = 'a-sdk';

    protected registeredErrors: Map<string, A_SDK_TYPES__Error> = new Map();

    constructor(
        /**
         * Namespace for the errors
         * generally it is the application name or code, should correspond to the namespace of the application
         */
        namespace?: string
    ) {

        this.namespace = namespace || process.env.ADAAS_NAMESPACE || this.namespace;
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
    addRegistry(registry: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error>): A_SDK_ErrorsProvider {
        const errors = Object.values(registry);

        errors.forEach(err => this.registerError(err));

        return this;
    }


    /**
     * 
     * @param error 
     */
    registerError(error: A_SDK_TYPES__Error): A_SDK_ErrorsProvider {
        this.registeredErrors.set(error.code, {
            ...error,
            code: `${this.namespace}@error:${error.code}`
        });

        return this;
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