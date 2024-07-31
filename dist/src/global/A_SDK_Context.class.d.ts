import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { A_SDK_TYPES__ContextConfigurations, A_SDK_TYPES__ContextConstructor } from '../types/A_SDK_Context.types';
import { A_SDK_ErrorsProvider } from "./A_SDK_ErrorsProvider.class";
export declare class A_SDK_ContextClass {
    protected params: Partial<A_SDK_TYPES__ContextConstructor>;
    namespace: string;
    protected CLIENT_ID: string;
    protected CLIENT_SECRET: string;
    protected CONFIG_SDK_VALIDATION: boolean;
    protected CONFIG_VERBOSE: boolean;
    protected CONFIG_IGNORE_ERRORS: boolean;
    /**
     * Logger for the SDK inside namespace
     */
    Logger: A_SDK_DefaultLogger;
    /**
     * Errors Provider for the SDK inside namespace
     */
    Errors: A_SDK_ErrorsProvider;
    /**
     * Ready Promise to ensure the SDK is ready to use
     */
    ready: Promise<void>;
    protected defaultAllowedToReadProperties: readonly ["CONFIG_SDK_VALIDATION", "CONFIG_VERBOSE", "CONFIG_IGNORE_ERRORS"];
    constructor(params: Partial<A_SDK_TYPES__ContextConstructor>);
    getConfigurationProperty<T = any>(property: typeof this.defaultAllowedToReadProperties[number]): T;
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
export declare const A_SDK_Context: A_SDK_ContextClass;
