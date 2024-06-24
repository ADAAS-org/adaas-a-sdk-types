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
     * FrontEnd mode: if true, the SDK will be configured for the FrontEnd and will not require API Credentials
     */
    frontEnd: boolean;
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
