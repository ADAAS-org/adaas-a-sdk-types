import { A_SDK_TYPES__Error } from "../types/A_SDK_Error.type";
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_ServerError } from "./A_SDK_ServerError.class";
import { A_SDK_CONSTANTS__DEFAULT_ERRORS, A_SDK_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_TYPES__Dictionary } from "../types/common.types";
import { A_SDK_TYPES__ServerError } from "../types/A_SDK_ServerError.types";
import { A_SDK_TYPES__ErrorsProviderConstructor } from "../types/A_SDK_ErrorsProvider.types";
import { AxiosError } from "axios";

/**
 * This class helps to organize and manage errors in the SDK.
 */
export class A_SDK_ErrorsProvider {
    /**
     * Namespace for the errors
     * generally it is the application name or code, should correspond to the namespace of the application
     */
    protected namespace: string = 'a-sdk';

    protected registeredErrors: Map<string, A_SDK_TYPES__Error | A_SDK_TYPES__ServerError> = new Map();

    constructor(
        params: Partial<A_SDK_TYPES__ErrorsProviderConstructor>
    ) {

        this.namespace = params.namespace || this.namespace;

        /**
         * Add default errors to the registry
         */
        this.addRegistry(A_SDK_CONSTANTS__DEFAULT_ERRORS);

        if (params.errors) {
            this.addRegistry(params.errors);
        }
    }

    /**
     * This method adds a dictionary of errors to the registry.
     * 
     * @param registry 
     */
    addRegistry(registry: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error> | A_SDK_TYPES__Error[]
    ): A_SDK_ErrorsProvider {
        const errors = Array.isArray(registry) ? registry : Object.values(registry);

        errors.forEach(err => this.registerError(err));

        return this;
    }


    /**
     * 
     * Adds an error to the registry
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
        let template = this.registeredErrors.get(code);

        if (!template)
            template = this.registeredErrors.get(A_SDK_CONSTANTS__ERROR_CODES.UNEXPECTED_ERROR);

        if ((template as A_SDK_TYPES__ServerError).serverCode) {
            return new A_SDK_ServerError(template as A_SDK_TYPES__ServerError);
        } else {
            return new A_SDK_Error(template);
        }
    }


    /**
     * This method throws an error by its code.
     * 
     * @param code 
     */
    throw(code: A_SDK_CONSTANTS__ERROR_CODES | string): never {

        const err = this.getError(code);

        throw err;
    }


    /**
     *  This method wraps an error into the SDK error object.
     * 
     * @param error 
     * @returns 
     */
    wrap(error: Error | AxiosError | A_SDK_Error | unknown): A_SDK_ServerError | A_SDK_Error {
        if (error instanceof A_SDK_Error) {
            return new A_SDK_ServerError(error);
        }

        return new A_SDK_Error(error);
    }
}