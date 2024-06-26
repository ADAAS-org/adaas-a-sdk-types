import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { A_SDK_TYPES__ContextConfigurations, A_SDK_TYPES__ContextConstructor, A_SDK_TYPES__IContextCredentials } from '../types/A_SDK_Context.types';
import { A_SDK_ErrorsProvider } from "./A_SDK_ErrorsProvider.class";
export declare class A_SDK_Context {
    protected params: Partial<A_SDK_TYPES__ContextConstructor>;
    namespace: string;
    Logger: A_SDK_DefaultLogger;
    Errors: A_SDK_ErrorsProvider;
    protected CLIENT_ID: string;
    protected CLIENT_SECRET: string;
    protected CONFIG_SDK_VALIDATION: boolean;
    protected CONFIG_VERBOSE: boolean;
    protected CONFIG_IGNORE_ERRORS: boolean;
    ready: Promise<void>;
    protected defaultAllowedToReadProperties: readonly ["CONFIG_SDK_VALIDATION", "CONFIG_VERBOSE", "CONFIG_IGNORE_ERRORS"];
    constructor(params: Partial<A_SDK_TYPES__ContextConstructor>);
    getConfigurationProperty<T = any>(property: typeof this.defaultAllowedToReadProperties[number]): T | undefined;
    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    init(): Promise<void>;
    protected defaultInit(): void;
    get verbose(): boolean;
    get ignoreErrors(): boolean;
    get sdkValidation(): boolean;
    get environment(): 'server' | 'browser';
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
    private loadConfigurations;
    private loadConfigurationsFromEnvironment;
    private loadConfigurationsFromFile;
    /**
     *  Load extended configurations from file
     *
     * @param config
     * @returns
     */
    protected loadExtendedConfigurationsFromFile<T = any>(config: T): Promise<void>;
    /**
     *  Load extended configurations from environment
     *
     * @returns
     */
    protected loadExtendedConfigurationsFromEnvironment(): Promise<void>;
}
