import { A_SDK_TYPES__Error } from "./A_SDK_Error.type";
import { A_SDK_TYPES__Dictionary } from "./common.types";
export type A_SDK_TYPES__ContextConstructor = {
    namespace: string;
    errors: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error> | A_SDK_TYPES__Error[];
    /**
     * Completely not mandatory but can be used to control the behavior of parent methods and properties
     */
    control: A_SDK_TYPES__ContextConfigControl;
};
export type A_SDK_TYPES__ContextConfigControl = {
    /**
     * Can let know the parent context that it inherits in other class
     * This information helps to handle super methods properly
     */
    inheritance: boolean;
    /**
     * Parent context will include or exclude the listeners from process
     * Includes: uncaughtException, unhandledRejection
     */
    processListeners: boolean;
};
export type A_SDK_TYPES__ContextConfigurations = {
    /**
     * Namespace for the ADAAS Application
     */
    namespace: string;
    /**
     * Verbose mode for the SDK
     */
    verbose?: boolean;
    /**
     * Ignore errors mode for the SDK
     */
    ignoreErrors?: boolean;
    /**
     * SDK Validation mode
     */
    sdkValidation?: boolean;
    /**
     * Credentials for the SDK or any other context variables
     */
    variables: A_SDK_TYPES__IContextCredentials;
};
export interface A_SDK_TYPES__IContextCredentials {
    /**
     * Api Credentials Client ID to authenticate the SDK
     * can be skipped for the FrontEnd SDKs
     */
    client_id: string;
    /**
     * Api Credentials Client Secret to authenticate the SDK
     * can be skipped for the FrontEnd SDKs
     */
    client_secret: string;
}
