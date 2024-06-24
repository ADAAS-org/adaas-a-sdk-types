export type A_SDK_TYPES__ContextConfigurations = {

    /**
     * Namespace for the ADAAS Application
     */
    namespace: string,

    /**
     * Verbose mode for the SDK
     */
    verbose?: boolean,

    /**
     * Ignore errors mode for the SDK
     */
    ignoreErrors?: boolean,

    /**
     * SDK Validation mode
     */
    sdkValidation?: boolean,

    /**
     * FrontEnd mode: if true, the SDK will be configured for the FrontEnd and will not require API Credentials
     */
    frontEnd: boolean
}


export interface A_SDK_TYPES__IContextCredentials {
    /**
      * API Credentials Client ID
      */
    client_id: string,
    /**
     * API Credentials Client Secret
     */
    client_secret: string
}