import { A_SDK_TYPES__Error } from "./A_SDK_Error.type";
import { A_SDK_TYPES__Dictionary } from "./common.types";
export type A_SDK_TYPES__ContextConstructor = {
    namespace: string;
    errors: A_SDK_TYPES__Dictionary<A_SDK_TYPES__Error> | A_SDK_TYPES__Error[];
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
