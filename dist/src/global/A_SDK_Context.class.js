"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_Context = void 0;
const A_SDK_Logger_class_1 = require("./A_SDK_Logger.class");
const Lib_polyfill_1 = require("../lib/Lib.polyfill");
const A_SDK_Error_class_1 = require("./A_SDK_Error.class");
const Common_helper_1 = require("../helpers/Common.helper");
class A_SDK_Context {
    constructor(namespace = 'a-sdk') {
        // Credentials for ADAAS SSO via API
        this.CLIENT_ID = '';
        this.CLIENT_SECRET = '';
        // Configuration
        this.CONFIG_SDK_VALIDATION = true;
        this.CONFIG_VERBOSE = false;
        this.CONFIG_IGNORE_ERRORS = false;
        this.CONFIG_FRONTEND = false;
        this.allowedToReadProperties = [
            'CONFIG_SDK_VALIDATION',
            'CONFIG_VERBOSE',
            'CONFIG_IGNORE_ERRORS',
            'CONFIG_FRONTEND',
        ];
        this.namespace = namespace;
        this.init();
    }
    getConfigurationProperty(property) {
        if (this.allowedToReadProperties.includes(property))
            return this[property];
        return undefined;
    }
    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCredentials();
            yield this.defaultInit();
        });
    }
    defaultInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger = new A_SDK_Logger_class_1.A_SDK_DefaultLogger(this.verbose, this.ignoreErrors);
            // global logger configuration
            if (!this.CONFIG_FRONTEND) {
                process.on('uncaughtException', (error) => {
                    // log only in case of A_AUTH_Error
                    if (error instanceof A_SDK_Error_class_1.A_SDK_Error)
                        this.logger.error(error);
                });
                process.on('unhandledRejection', (error) => {
                    if (error instanceof A_SDK_Error_class_1.A_SDK_Error)
                        this.logger.error(error);
                });
            }
        });
    }
    get verbose() {
        return this.CONFIG_VERBOSE;
    }
    get ignoreErrors() {
        return this.CONFIG_IGNORE_ERRORS;
    }
    get sdkValidation() {
        return this.CONFIG_SDK_VALIDATION;
    }
    get environment() {
        return this.CONFIG_FRONTEND ? 'frontend' : 'server';
    }
    getConfigurationProperty_ENV_Alias(property) {
        return `${Common_helper_1.A_SDK_CommonHelper.toUpperSnakeCase(this.namespace)}_${Common_helper_1.A_SDK_CommonHelper.toUpperSnakeCase(property)}`;
    }
    getConfigurationProperty_File_Alias(property) {
        return Common_helper_1.A_SDK_CommonHelper.toCamelCase(property);
    }
    /**
     * Configures the SDK with the provided parameters or uses the default ones
     * Useful for Front End applications to omit env variables and use the SDK
     *
     * @param verbose
     * @param ignoreErrors
     * @param sdkValidation
     */
    configure(config) {
        this.namespace = config.namespace || this.namespace;
        this.CONFIG_VERBOSE = config.verbose || this.CONFIG_VERBOSE;
        this.CONFIG_IGNORE_ERRORS = config.ignoreErrors || this.CONFIG_IGNORE_ERRORS;
        this.CONFIG_SDK_VALIDATION = config.sdkValidation || this.CONFIG_SDK_VALIDATION;
        this.CONFIG_FRONTEND = config.frontEnd || this.CONFIG_FRONTEND;
        // reinitialize the SDK
        this.init();
    }
    setCredentials(credentials) {
        this.CLIENT_ID = credentials.client_id;
        this.CLIENT_SECRET = credentials.client_secret;
        this.logger.log('Credentials set manually');
    }
    loadCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = yield Lib_polyfill_1.LibPolyfill.fs();
            if (!this.ready)
                this.ready = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    if (!!(process && process.env)) {
                        yield this.loadCredentialsFromEnvironment();
                    }
                    if (fs.existsSync(`${this.namespace}.conf.json`)) {
                        yield this.loadConfigurationsFromFile();
                    }
                    this.init();
                    resolve();
                }));
            return this.ready;
        });
    }
    loadCredentialsFromEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            this.namespace = process.env.ADAAS_NAMESPACE || process.env.ADAAS_APP_NAMESPACE || this.namespace;
            this.CLIENT_ID = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_ID')] || this.CLIENT_ID;
            this.CLIENT_SECRET = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_SECRET')] || this.CLIENT_SECRET;
            this.CONFIG_SDK_VALIDATION = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_SDK_VALIDATION')] === 'true' || this.CONFIG_SDK_VALIDATION;
            this.CONFIG_VERBOSE = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_VERBOSE')] === 'true' || this.CONFIG_VERBOSE;
            this.CONFIG_IGNORE_ERRORS = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_IGNORE_ERRORS')] === 'true' || this.CONFIG_IGNORE_ERRORS;
            this.CONFIG_FRONTEND = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_FRONTEND')] === 'true' || this.CONFIG_FRONTEND;
            yield this.loadExtendedConfigurationsFromEnvironment();
            this.logger.log('Credentials loaded from environment variables.');
        });
    }
    loadConfigurationsFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = yield Lib_polyfill_1.LibPolyfill.fs();
            try {
                const data = fs.readFileSync(`${this.namespace}.conf.json`, 'utf8');
                const config = JSON.parse(data);
                this.namespace = config.namespace || this.namespace;
                this.CLIENT_ID = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_ID;
                this.CLIENT_SECRET = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_SECRET;
                this.CONFIG_VERBOSE = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_VERBOSE;
                this.CONFIG_IGNORE_ERRORS = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_IGNORE_ERRORS;
                this.CONFIG_SDK_VALIDATION = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_SDK_VALIDATION;
                yield this.loadExtendedConfigurationsFromFile(config);
                this.logger.log('Credentials loaded from file.');
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    loadExtendedConfigurationsFromFile(config) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    loadExtendedConfigurationsFromEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.A_SDK_Context = A_SDK_Context;
//# sourceMappingURL=A_SDK_Context.class.js.map