import { A_SDK_TYPES__Error } from "../types/A_SDK_Error.type";
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_ServerError } from "./A_SDK_ServerError.class";
import { A_SDK_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_TYPES__Dictionary } from "../types/common.types";
import { A_SDK_TYPES__ServerError } from "../types/A_SDK_ServerError.types";
import { A_SDK_TYPES__ErrorsProviderConstructor } from "../types/A_SDK_ErrorsProvider.types";
/**
 * This class helps to organize and manage errors in the SDK.
 */
export declare class A_SDK_ErrorsProvider {
    /**
     * Namespace for the errors
     * generally it is the application name or code, should correspond to the namespace of the application
     */
    protected namespace: string;
    protected registeredErrors: Map<string, A_SDK_TYPES__Error | A_SDK_TYPES__ServerError>;
    constructor(params: Partial<A_SDK_TYPES__ErrorsProviderConstructor>);
    /**
     * This method adds a dictionary of errors to the registry.
     *
     * @param registry
     */
    addRegistry(registry: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error> | A_SDK_TYPES__Error[]): A_SDK_ErrorsProvider;
    /**
     *
     * Adds an error to the registry
     *
     * @param error
     */
    registerError(error: A_SDK_TYPES__Error): A_SDK_ErrorsProvider;
    /**
     * This method returns an error object by its code.
     *
     * @param code
     * @returns
     */
    getError(code: A_SDK_CONSTANTS__ERROR_CODES | string): A_SDK_ServerError | A_SDK_Error | undefined;
    /**
     * This method throws an error by its code.
     *
     * @param code
     */
    throw(code: A_SDK_CONSTANTS__ERROR_CODES | string): void;
}
