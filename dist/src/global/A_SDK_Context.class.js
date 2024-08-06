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
exports.A_SDK_Context = exports.A_SDK_ContextClass = void 0;
const A_SDK_Logger_class_1 = require("./A_SDK_Logger.class");
const Lib_polyfill_1 = require("../lib/Lib.polyfill");
const A_SDK_Error_class_1 = require("./A_SDK_Error.class");
const Common_helper_1 = require("../helpers/Common.helper");
const A_SDK_ErrorsProvider_class_1 = require("./A_SDK_ErrorsProvider.class");
const errors_constants_1 = require("../constants/errors.constants");
class A_SDK_ContextClass {
    constructor(params) {
        this.params = params;
        // Credentials for ADAAS SDKs from default names as A_SDK_CLIENT_ID, A_SDK_CLIENT_SECRET
        this.CLIENT_ID = '';
        this.CLIENT_SECRET = '';
        // Configuration
        this.CONFIG_SDK_VALIDATION = true;
        this.CONFIG_VERBOSE = false;
        this.CONFIG_IGNORE_ERRORS = false;
        this.defaultAllowedToReadProperties = [
            'CONFIG_SDK_VALIDATION',
            'CONFIG_VERBOSE',
            'CONFIG_IGNORE_ERRORS',
        ];
        this.namespace = params.namespace
            ? params.namespace
            : (process.env.ADAAS_NAMESPACE || process.env.ADAAS_APP_NAMESPACE || 'a-sdk');
        this.Logger = new A_SDK_Logger_class_1.A_SDK_DefaultLogger({
            namespace: this.namespace
        });
        this.Errors = new A_SDK_ErrorsProvider_class_1.A_SDK_ErrorsProvider({
            namespace: this.namespace,
            errors: params.errors ?
                Array.isArray(params.errors) ?
                    [
                        ...Object.values(errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS),
                        ...params.errors
                    ]
                    : Object.assign(Object.assign({}, errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS), params.errors)
                : errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS
        });
        this.init();
    }
    getConfigurationProperty(property) {
        if (this.defaultAllowedToReadProperties.includes(property))
            return this[property];
        this.Errors.throw(errors_constants_1.A_SDK_CONSTANTS__ERROR_CODES.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ);
    }
    hasInherited(cl) {
        return this.constructor === cl
            ? false
            : true;
    }
    /**
     * Initializes the SDK or can be used to reinitialize the SDK
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ready)
                this.ready = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield this.loadConfigurations();
                        this.defaultInit();
                        return resolve();
                    }
                    catch (error) {
                        if (error instanceof A_SDK_Error_class_1.A_SDK_Error) {
                            this.Logger.error(error);
                        }
                        return reject(error);
                    }
                }));
            else
                yield this.ready;
        });
    }
    defaultInit() {
        this.Logger = new A_SDK_Logger_class_1.A_SDK_DefaultLogger({
            verbose: this.CONFIG_VERBOSE,
            ignoreErrors: this.CONFIG_IGNORE_ERRORS,
            namespace: this.namespace
        });
        this.Errors = new A_SDK_ErrorsProvider_class_1.A_SDK_ErrorsProvider({
            namespace: this.namespace,
            errors: this.params.errors ?
                Array.isArray(this.params.errors) ?
                    [
                        ...Object.values(errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS),
                        ...this.params.errors
                    ]
                    : Object.assign(Object.assign({}, errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS), this.params.errors)
                : errors_constants_1.A_SDK_CONSTANTS__DEFAULT_ERRORS
        });
        // global logger configuration
        if (this.environment === 'server') {
            // eslint-disable-next-line no-use-before-define
            process.on('uncaughtException', (error) => {
                // log only in case of A_AUTH_Error
                if (error instanceof A_SDK_Error_class_1.A_SDK_Error)
                    this.Logger.error(error);
            });
            // eslint-disable-next-line no-use-before-define
            process.on('unhandledRejection', (error) => {
                if (error instanceof A_SDK_Error_class_1.A_SDK_Error)
                    this.Logger.error(error);
            });
        }
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
        return Lib_polyfill_1.LibPolyfill.env;
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
        if (config.variables) {
            this.CLIENT_ID = config.variables.client_id || this.CLIENT_ID;
            this.CLIENT_SECRET = config.variables.client_secret || this.CLIENT_SECRET;
        }
        if (this.hasInherited(A_SDK_ContextClass))
            this.Logger.log('Configurations loaded from manual configuration.');
        /**
         * Since configuration properties passed manually we should ignore the loadConfigurations stage
         */
        this.defaultInit();
    }
    loadConfigurations() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = yield Lib_polyfill_1.LibPolyfill.fs();
            if (this.environment === 'server') {
                yield this.loadConfigurationsFromEnvironment();
            }
            if (fs.existsSync(`${this.namespace}.conf.json`)) {
                yield this.loadConfigurationsFromFile();
            }
        });
    }
    loadConfigurationsFromEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            this.CLIENT_ID = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_ID')] || this.CLIENT_ID;
            this.CLIENT_SECRET = process.env[this.getConfigurationProperty_ENV_Alias('CLIENT_SECRET')] || this.CLIENT_SECRET;
            this.CONFIG_SDK_VALIDATION = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_SDK_VALIDATION')] === 'true' || this.CONFIG_SDK_VALIDATION;
            this.CONFIG_VERBOSE = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_VERBOSE')] === 'true' || this.CONFIG_VERBOSE;
            this.CONFIG_IGNORE_ERRORS = process.env[this.getConfigurationProperty_ENV_Alias('CONFIG_IGNORE_ERRORS')] === 'true' || this.CONFIG_IGNORE_ERRORS;
            yield this.loadExtendedConfigurationsFromEnvironment();
            this.Logger.log('Configurations loaded from environment variables.');
        });
    }
    loadConfigurationsFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const fs = yield Lib_polyfill_1.LibPolyfill.fs();
            try {
                const data = fs.readFileSync(`${this.namespace}.conf.json`, 'utf8');
                const config = JSON.parse(data);
                this.CLIENT_ID = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_ID;
                this.CLIENT_SECRET = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CLIENT_SECRET;
                this.CONFIG_VERBOSE = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_VERBOSE;
                this.CONFIG_IGNORE_ERRORS = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_IGNORE_ERRORS;
                this.CONFIG_SDK_VALIDATION = config[this.getConfigurationProperty_File_Alias('CLIENT_ID')] || this.CONFIG_SDK_VALIDATION;
                yield this.loadExtendedConfigurationsFromFile(config);
                this.Logger.log('Configurations loaded from file.');
            }
            catch (error) {
                this.Logger.error(error);
            }
        });
    }
    /**
     *  Load extended configurations from file
     *
     * @param config
     * @returns
     */
    loadExtendedConfigurationsFromFile(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // override this method to load extended configurations from file
            return;
        });
    }
    /**
     *  Load extended configurations from environment
     *
     * @returns
     */
    loadExtendedConfigurationsFromEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            // override this method to load extended configurations from environment variables
            return;
        });
    }
}
exports.A_SDK_ContextClass = A_SDK_ContextClass;
exports.A_SDK_Context = new A_SDK_ContextClass({});
//# sourceMappingURL=A_SDK_Context.class.js.map