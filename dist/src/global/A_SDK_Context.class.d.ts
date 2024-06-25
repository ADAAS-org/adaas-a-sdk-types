import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { A_SDK_TYPES__ContextConfigurations, A_SDK_TYPES__IContextCredentials } from '../types/A_SDK_Context.types';
export declare class A_SDK_Context {
    logger: A_SDK_DefaultLogger;
    namespace: string;
    protected CLIENT_ID: string;
    protected CLIENT_SECRET: string;
    protected CONFIG_SDK_VALIDATION: boolean;
    protected CONFIG_VERBOSE: boolean;
    protected CONFIG_IGNORE_ERRORS: boolean;
    protected CONFIG_FRONTEND: boolean;
    ready: Promise<void>;
    protected defaultAllowedToReadProperties: readonly ["CONFIG_SDK_VALIDATION", "CONFIG_VERBOSE", "CONFIG_IGNORE_ERRORS", "CONFIG_FRONTEND"];
    constructor(namespace?: string);
    getConfigurationProperty<T = any>(property: typeof this.defaultAllowedToReadProperties[number]): T | undefined;
    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    init(): Promise<void>;
    protected defaultInit(): Promise<void>;
    get verbose(): boolean;
    get ignoreErrors(): boolean;
    get sdkValidation(): boolean;
    get environment(): 'server' | 'frontend';
    protected getConfigurationProperty_ENV_Alias(property: string): string;
    protected getConfigurationProperty_File_Alias(property: string): string;
    /**
     * Configures the SDK with the provided parameters or uses the default ones
     * Useful for Front End applications to omit env variables and use the SDK
     *
     * @param verbose
     * @param ignoreErrors
     * @param sdkValidation
     */
    configure(config: Partial<A_SDK_TYPES__ContextConfigurations>): void;
    setCredentials<T extends A_SDK_TYPES__IContextCredentials = A_SDK_TYPES__IContextCredentials>(credentials: T): void;
    private loadCredentials;
    private loadCredentialsFromEnvironment;
    private loadConfigurationsFromFile;
    protected loadExtendedConfigurationsFromFile<T = any>(config: T): Promise<void>;
    protected loadExtendedConfigurationsFromEnvironment(): Promise<void>;
}
