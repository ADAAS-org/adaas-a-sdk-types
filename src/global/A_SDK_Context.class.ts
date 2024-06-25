import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { LibPolyfill } from '../lib/Lib.polyfill'
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_TYPES__ContextConfigurations, A_SDK_TYPES__IContextCredentials } from '../types/A_SDK_Context.types';
import { A_SDK_CommonHelper } from '../helpers/Common.helper';


export class A_SDK_Context {

    logger!: A_SDK_DefaultLogger

    namespace: string;

    // Credentials for ADAAS SSO via API
    protected CLIENT_ID: string = '';
    protected CLIENT_SECRET: string = '';

    // Configuration
    protected CONFIG_SDK_VALIDATION: boolean = true
    protected CONFIG_VERBOSE: boolean = false;
    protected CONFIG_IGNORE_ERRORS: boolean = false;
    protected CONFIG_FRONTEND: boolean = false;

    ready!: Promise<void>;

    protected defaultAllowedToReadProperties = [
        'CONFIG_SDK_VALIDATION',
        'CONFIG_VERBOSE',
        'CONFIG_IGNORE_ERRORS',
        'CONFIG_FRONTEND',
    ] as const;


    constructor(
        namespace: string = 'a-sdk'
    ) {
        this.namespace = namespace;

        this.init();
    }


    getConfigurationProperty<T = any>(
        property: typeof this.defaultAllowedToReadProperties[number]
    ): T | undefined {
        if (this.defaultAllowedToReadProperties.includes(property as any))
            return this[property as string] as T;

        return undefined;
    }


    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    async init() {
        await this.loadCredentials();
        await this.defaultInit();
    }


    protected async defaultInit() {
        this.logger = new A_SDK_DefaultLogger(this.verbose, this.ignoreErrors);

        // global logger configuration

        if (!this.CONFIG_FRONTEND) {
            process.on('uncaughtException', (error) => {
                // log only in case of A_AUTH_Error
                if (error instanceof A_SDK_Error)
                    this.logger.error(error);
            });
            process.on('unhandledRejection', (error) => {
                if (error instanceof A_SDK_Error)
                    this.logger.error(error);
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

    get environment(): 'server' | 'frontend' {
        return this.CONFIG_FRONTEND ? 'frontend' : 'server';
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
        this.CONFIG_FRONTEND = config.frontEnd || this.CONFIG_FRONTEND;


        // reinitialize the SDK
        this.init();
    }


    setCredentials<T extends A_SDK_TYPES__IContextCredentials = A_SDK_TYPES__IContextCredentials>(
        credentials: T
    ) {
        this.CLIENT_ID = credentials.client_id;
        this.CLIENT_SECRET = credentials.client_secret;

        this.logger.log('Credentials set manually');
    }


    private async loadCredentials(): Promise<void> {
        const fs = await LibPolyfill.fs();

        if (!this.ready)
            this.ready = new Promise(async (resolve) => {

                if (!!(process && process.env)) {
                    await this.loadCredentialsFromEnvironment();
                }

                if (fs.existsSync(`${this.namespace}.conf.json`)) {
                    await this.loadConfigurationsFromFile();
                }

                this.init();

                resolve();
            });

        return this.ready;
    }


    private async loadCredentialsFromEnvironment() {
        this.namespace = process.env.ADAAS_NAMESPACE || process.env.ADAAS_APP_NAMESPACE || this.namespace;


        this.CLIENT_ID = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_ID')] || this.CLIENT_ID;
        this.CLIENT_SECRET = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_SECRET')] || this.CLIENT_SECRET;

        this.CONFIG_SDK_VALIDATION = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_SDK_VALIDATION')] === 'true' || this.CONFIG_SDK_VALIDATION;
        this.CONFIG_VERBOSE = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_VERBOSE')] === 'true' || this.CONFIG_VERBOSE;
        this.CONFIG_IGNORE_ERRORS = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_IGNORE_ERRORS')] === 'true' || this.CONFIG_IGNORE_ERRORS;
        this.CONFIG_FRONTEND = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_FRONTEND')] === 'true' || this.CONFIG_FRONTEND;

        await this.loadExtendedConfigurationsFromEnvironment();

        this.logger.log('Credentials loaded from environment variables.');
    }



    private async loadConfigurationsFromFile() {
        const fs = await LibPolyfill.fs();
        try {
            const data = fs.readFileSync(`${this.namespace}.conf.json`, 'utf8');

            const config = JSON.parse(data);

            this.namespace = config.namespace || this.namespace;

            this.CLIENT_ID = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_ID;
            this.CLIENT_SECRET = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_SECRET;

            this.CONFIG_VERBOSE = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_VERBOSE;
            this.CONFIG_IGNORE_ERRORS = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_IGNORE_ERRORS;
            this.CONFIG_SDK_VALIDATION = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_SDK_VALIDATION;

            await this.loadExtendedConfigurationsFromFile(config);

            this.logger.log('Credentials loaded from file.');
        } catch (error) {
            this.logger.error(error);
        }
    }



    protected async loadExtendedConfigurationsFromFile<T = any>(config: T) {

    }


    protected async loadExtendedConfigurationsFromEnvironment() {

    }
}
