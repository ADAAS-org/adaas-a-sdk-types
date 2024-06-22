import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { A_SDK_TYPES__ContextConfigurations } from '../types/A_SDK_Context.types';
export declare class A_SDK_Context {
    logger: A_SDK_DefaultLogger;
    namespace: string;
    protected CLIENT_ID: string;
    protected CLIENT_SECRET: string;
    protected CONFIG_SDK_VALIDATION: boolean;
    protected CONFIG_VERBOSE: boolean;
    protected CONFIG_IGNORE_ERRORS: boolean;
    protected CONFIG_FRONTEND: boolean;
    protected credentialsPromise?: Promise<void>;
    constructor();
    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    protected init(): void;
    get verbose(): boolean;
    get ignoreErrors(): boolean;
    get sdkValidation(): boolean;
    get environment(): 'server' | 'frontend';
    protected get clientIdAlias(): string;
    protected get clientSecretAlias(): string;
    protected getConfigurationPropertyAlias(property: string): string;
    /**
     * Configures the SDK with the provided parameters or uses the default ones
     * Useful for Front End applications to omit env variables and use the SDK
     *
     * @param verbose
     * @param ignoreErrors
     * @param sdkValidation
     */
    configure(config: Partial<A_SDK_TYPES__ContextConfigurations>): void;
    setCredentials(
    /**
     * API Credentials Client ID
     */
    client_id: string, 
    /**
     * API Credentials Client Secret
     */
    client_secret: string): void;
    protected loadCredentials(): Promise<void>;
    protected loadCredentialsFromEnvironment(): Promise<void>;
    protected loadConfigurationsFromFile(): Promise<void>;
}
