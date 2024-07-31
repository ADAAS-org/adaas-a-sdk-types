import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { LibPolyfill } from '../lib/Lib.polyfill'
import { A_SDK_Error } from "./A_SDK_Error.class";
import {
    A_SDK_TYPES__ContextConfigurations,
    A_SDK_TYPES__ContextConstructor,
    A_SDK_TYPES__IContextCredentials
} from '../types/A_SDK_Context.types';
import { A_SDK_CommonHelper } from '../helpers/Common.helper';
import { A_SDK_ErrorsProvider } from "./A_SDK_ErrorsProvider.class";
import { A_SDK_CONSTANTS__DEFAULT_ERRORS, A_SDK_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";


export class A_SDK_ContextClass {

    namespace: string;


    // Credentials for ADAAS SDKs from default names as A_SDK_CLIENT_ID, A_SDK_CLIENT_SECRET
    protected CLIENT_ID: string = '';
    protected CLIENT_SECRET: string = '';

    // Configuration
    protected CONFIG_SDK_VALIDATION: boolean = true
    protected CONFIG_VERBOSE: boolean = false;
    protected CONFIG_IGNORE_ERRORS: boolean = false;



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
    ready!: Promise<void>;


    protected defaultAllowedToReadProperties = [
        'CONFIG_SDK_VALIDATION',
        'CONFIG_VERBOSE',
        'CONFIG_IGNORE_ERRORS',
    ] as const;


    constructor(
        protected params: Partial<A_SDK_TYPES__ContextConstructor>
    ) {

        this.namespace = params.namespace
            ? params.namespace
            : (process.env.ADAAS_NAMESPACE || process.env.ADAAS_APP_NAMESPACE || 'a-sdk');

        this.Logger = new A_SDK_DefaultLogger({
            namespace: this.namespace
        });
        this.Errors = new A_SDK_ErrorsProvider({
            namespace: this.namespace,
        })

        this.init();
    }


    getConfigurationProperty<T = any>(
        property: typeof this.defaultAllowedToReadProperties[number]
    ): T {
        if (this.defaultAllowedToReadProperties.includes(property as any))
            return this[property as string] as T;

        this.Errors.throw(A_SDK_CONSTANTS__ERROR_CODES.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ)
    }


    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    async init() {
        if (!this.ready)
            this.ready = new Promise(async (resolve, reject) => {
                try {
                    await this.loadConfigurations();

                    this.defaultInit();

                    return resolve();
                } catch (error) {
                    if (error instanceof A_SDK_Error) {
                        this.Logger.error(error);
                    }
                    return reject(error);
                }
            });
        else
            await this.ready;
    }


    protected defaultInit() {
        this.Logger = new A_SDK_DefaultLogger({
            verbose: this.CONFIG_VERBOSE,
            ignoreErrors: this.CONFIG_IGNORE_ERRORS,
            namespace: this.namespace
        });

        this.Errors = new A_SDK_ErrorsProvider({
            namespace: this.namespace,
            errors: this.params.errors
        });

        // global logger configuration
        if (this.environment === 'server') {
            // eslint-disable-next-line no-use-before-define
            process.on('uncaughtException', (error) => {
                // log only in case of A_AUTH_Error
                if (error instanceof A_SDK_Error)
                    this.Logger.error(error);
            });
            // eslint-disable-next-line no-use-before-define
            process.on('unhandledRejection', (error) => {
                if (error instanceof A_SDK_Error)
                    this.Logger.error(error);
            });
        }
    }

    get verbose(): boolean {
        return this.CONFIG_VERBOSE;
    }

    get ignoreErrors(): boolean {
        return this.CONFIG_IGNORE_ERRORS;
    }

    get sdkValidation(): boolean {
        return this.CONFIG_SDK_VALIDATION;
    }

    get environment(): 'server' | 'browser' {
        return LibPolyfill.env;
    }

    protected getConfigurationProperty_ENV_Alias(property: string): string {
        return `${A_SDK_CommonHelper.toUpperSnakeCase(this.namespace)}_${A_SDK_CommonHelper.toUpperSnakeCase(property)}`;
    }

    protected getConfigurationProperty_File_Alias(property: string): string {
        return A_SDK_CommonHelper.toCamelCase(property);
    }


    /**
     * Configures the SDK with the provided parameters or uses the default ones
     * Useful for Front End applications to omit env variables and use the SDK
     * 
     * @param verbose 
     * @param ignoreErrors 
     * @param sdkValidation 
     */
    configure(config: Partial<A_SDK_TYPES__ContextConfigurations>) {
        this.namespace = config.namespace || this.namespace;

        this.CONFIG_VERBOSE = config.verbose || this.CONFIG_VERBOSE;
        this.CONFIG_IGNORE_ERRORS = config.ignoreErrors || this.CONFIG_IGNORE_ERRORS;
        this.CONFIG_SDK_VALIDATION = config.sdkValidation || this.CONFIG_SDK_VALIDATION;


        /**
         * Since configuration properties passed manually we should ignore the loadConfigurations stage 
         */
        this.defaultInit();
    }


    setCredentials<T extends A_SDK_TYPES__IContextCredentials = A_SDK_TYPES__IContextCredentials>(
        credentials: T
    ) {
        this.CLIENT_ID = credentials.client_id;
        this.CLIENT_SECRET = credentials.client_secret;

        this.Logger.log('Credentials set manually');
    }


    private async loadConfigurations(): Promise<void> {
        const fs = await LibPolyfill.fs();

        if (!!(process && process.env)) {
            await this.loadConfigurationsFromEnvironment();
        }

        if (fs.existsSync(`${this.namespace}.conf.json`)) {
            await this.loadConfigurationsFromFile();
        }
    }


    private async loadConfigurationsFromEnvironment() {

        this.CLIENT_ID = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_ID')] || this.CLIENT_ID;
        this.CLIENT_SECRET = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_SECRET')] || this.CLIENT_SECRET;

        this.CONFIG_SDK_VALIDATION = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_SDK_VALIDATION')] === 'true' || this.CONFIG_SDK_VALIDATION;
        this.CONFIG_VERBOSE = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_VERBOSE')] === 'true' || this.CONFIG_VERBOSE;
        this.CONFIG_IGNORE_ERRORS = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_IGNORE_ERRORS')] === 'true' || this.CONFIG_IGNORE_ERRORS;

        await this.loadExtendedConfigurationsFromEnvironment();

        this.Logger.log('Configurations loaded from environment variables.');
    }



    private async loadConfigurationsFromFile() {
        const fs = await LibPolyfill.fs();
        try {
            const data = fs.readFileSync(`${this.namespace}.conf.json`, 'utf8');

            const config = JSON.parse(data);

            this.CLIENT_ID = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_ID;
            this.CLIENT_SECRET = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_SECRET;

            this.CONFIG_VERBOSE = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_VERBOSE;
            this.CONFIG_IGNORE_ERRORS = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_IGNORE_ERRORS;
            this.CONFIG_SDK_VALIDATION = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_SDK_VALIDATION;

            await this.loadExtendedConfigurationsFromFile(config);

            this.Logger.log('Configurations loaded from file.');
        } catch (error) {
            this.Logger.error(error);
        }
    }



    /**
     *  Load extended configurations from file
     * 
     * @param config 
     * @returns 
     */
    protected async loadExtendedConfigurationsFromFile<T = any>(config: T) {
        // override this method to load extended configurations from file
        return;
    }


    /**
     *  Load extended configurations from environment
     * 
     * @returns 
     */
    protected async loadExtendedConfigurationsFromEnvironment() {
        // override this method to load extended configurations from environment variables
        return;
    }
}



export const A_SDK_Context = new A_SDK_ContextClass({});