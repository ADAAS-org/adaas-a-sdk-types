import { A_SDK_DefaultLogger } from "./A_SDK_Logger.class";
import { LibPolyfill } from '../lib/Lib.polyfill'
import { A_SDK_Error } from "./A_SDK_Error.class";
import { A_SDK_TYPES__ContextConfigurations } from '../types/A_SDK_Context.types';
import { A_SDK_CommonHelper } from '../helpers/Common.helper';


export class A_SDK_Context {

    logger!: A_SDK_DefaultLogger

    namespace: string = 'a-sdk';

    // Credentials for ADAAS SSO via API
    protected CLIENT_ID: string = '';
    protected CLIENT_SECRET: string = '';

    // Configuration
    protected CONFIG_SDK_VALIDATION: boolean = true
    protected CONFIG_VERBOSE: boolean = false;
    protected CONFIG_IGNORE_ERRORS: boolean = false;
    protected CONFIG_FRONTEND: boolean = false;

    protected credentialsPromise?: Promise<void>;

    constructor() {
    }


    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    protected init() {
        this.logger = new A_SDK_DefaultLogger(this.verbose, this.ignoreErrors);

        // global logger configuration

        if (!this.CONFIG_FRONTEND)
            process.on('uncaughtException', (error) => {
                // log only in case of A_AUTH_Error
                if (error instanceof A_SDK_Error)
                    this.logger.error(error);
            });
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

    protected get clientIdAlias(): string {
        return `${A_SDK_CommonHelper.toUpperSnakeCase(this.namespace)}_CLIENT_ID`;
    }

    protected get clientSecretAlias(): string {
        return `${A_SDK_CommonHelper.toUpperSnakeCase(this.namespace)}_CLIENT_SECRET`;
    }


    protected getConfigurationPropertyAlias(property: string): string {
        return `${String(this.namespace).toUpperCase()}_${A_SDK_CommonHelper.toUpperSnakeCase(property)}`;
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


    setCredentials(
        /**
         * API Credentials Client ID
         */
        client_id: string,
        /**
         * API Credentials Client Secret
         */
        client_secret: string
    ) {
        this.CLIENT_ID = client_id;
        this.CLIENT_SECRET = client_secret;

        this.logger.log('Credentials set manually');
    }


    protected async loadCredentials(): Promise<void> {
        const fs = await LibPolyfill.fs();

        if (!this.credentialsPromise)
            this.credentialsPromise = new Promise(async (resolve) => {

                if (!!(process && process.env)) {
                    await this.loadCredentialsFromEnvironment();
                }

                if (fs.existsSync(`${this.namespace}.conf.json`)) {
                    await this.loadConfigurationsFromFile();
                }

                this.init();

                resolve();
            });

        return this.credentialsPromise;
    }


    protected async loadCredentialsFromEnvironment() {

        this.CLIENT_ID = process.env[this.clientIdAlias] || this.CLIENT_ID;
        this.CLIENT_SECRET = process.env[this.clientSecretAlias] || this.CLIENT_SECRET;

        this.CONFIG_SDK_VALIDATION = process.env[this.getConfigurationPropertyAlias('CONFIG_SDK_VALIDATION')] === 'true' || this.CONFIG_SDK_VALIDATION;
        this.CONFIG_VERBOSE = process.env[this.getConfigurationPropertyAlias('CONFIG_VERBOSE')] === 'true' || this.CONFIG_VERBOSE;
        this.CONFIG_IGNORE_ERRORS = process.env[this.getConfigurationPropertyAlias('CONFIG_IGNORE_ERRORS')] === 'true' || this.CONFIG_IGNORE_ERRORS;
        this.CONFIG_FRONTEND = process.env[this.getConfigurationPropertyAlias('CONFIG_FRONTEND')] === 'true' || this.CONFIG_FRONTEND;


        this.logger.log('Credentials loaded from environment variables');
    }



    protected async loadConfigurationsFromFile() {
        const fs = await LibPolyfill.fs();
        try {
            const data = fs.readFileSync(`${this.namespace}.conf.json`, 'utf8');

            const config = JSON.parse(data);

            this.namespace = config.namespace || this.namespace;
            this.CLIENT_ID = config.client_id || config.clientId || this.CLIENT_ID;
            this.CLIENT_SECRET = config.client_secret || config.clientSecret || this.CLIENT_SECRET;
            this.CONFIG_VERBOSE = config.verbose || this.CONFIG_VERBOSE;
            this.CONFIG_IGNORE_ERRORS = config.ignoreErrors || this.CONFIG_IGNORE_ERRORS;
            this.CONFIG_SDK_VALIDATION = config.sdkValidation || this.CONFIG_SDK_VALIDATION;

            this.logger.log('Credentials loaded from file');
        } catch (error) {
            this.logger.error(error);
        }
    }
}

