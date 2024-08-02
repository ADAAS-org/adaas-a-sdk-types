"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_CommonHelper = void 0;
const A_SDK_ScheduleObject_class_1 = require("../global/A_SDK_ScheduleObject.class");
class A_SDK_CommonHelper {
    static delay(ms = 1000, resolver) {
        return new Promise((resolve, reject) => setTimeout(() => {
            if (resolver) {
                resolver.then(resolve).catch(reject);
            }
            else {
                resolve(0);
            }
        }, ms));
    }
    static schedule(ms = 1000, resolver, config) {
        return new A_SDK_ScheduleObject_class_1.A_SDK_ScheduleObject(ms, resolver, config);
    }
    static resolve() {
        return new Promise((resolve) => resolve(undefined));
    }
    static omitArrayProperties(array, fields) {
        return array;
    }
    static sanitizeHTML(html) {
        // Define the regular expression pattern to match all tags except <span>
        const regex = /<(?!\/?span(?=>|\s.*>))\/?.*?>/g;
        // Replace all matched tags with an empty string
        return html.replace(regex, '');
    }
    /**
     *  Omit properties from an object or array with nested objects
     *
     * @param input
     * @param paths
     * @returns
     */
    static omitProperties(input, paths) {
        // Deep clone the input object or array
        const result = JSON.parse(JSON.stringify(input));
        // Helper function to recursively remove properties
        function removeProperties(target, currPath) {
            const currKey = currPath[0];
            if (currPath.length === 1) {
                // If current path has only one key, delete the property
                delete target[currKey];
            }
            else if (target[currKey] !== undefined && typeof target[currKey] === 'object') {
                // If current key exists and is an object, recursively call removeProperties
                removeProperties(target[currKey], currPath.slice(1));
            }
        }
        // Iterate through each path and remove corresponding properties from the result
        paths.forEach(path => {
            const pathKeys = path.split('.');
            removeProperties(result, pathKeys);
        });
        return result;
    }
    /**
     *  Format a number with leading zeros to a fixed length
     *
     * @param number
     * @param maxZeros
     * @returns
     */
    static formatWithLeadingZeros(number, maxZeros = 10) {
        const formattedNumber = String(number).padStart(maxZeros + 1, '0');
        return formattedNumber.slice(-maxZeros);
    }
    /**
     * Remove leading zeros from a formatted number
     */
    static removeLeadingZeros(formattedNumber) {
        return String(Number(formattedNumber)); // Convert to number and back to string to remove leading zeros
    }
    static isASEID(identity) {
        return this.aseidRegexp.test(identity);
    }
    /**
     * Generate an ASEID from a namespace, entity, and id
     *
     * @param props
     * @returns
     */
    static generateASEID(props, config) {
        const namespace = props.namespace
            ? this.isASEID(props.namespace)
                ? this.parseASEID(props.namespace).id
                : props.namespace
            : process.env.ADAAS_NAMESPACE;
        const scope = typeof props.scope === 'number'
            ? this.formatWithLeadingZeros(props.scope) :
            this.isASEID(props.scope)
                ? this.parseASEID(props.scope).id
                : props.scope;
        const entity = props.entity;
        const id = typeof props.id === 'number'
            ? this.formatWithLeadingZeros(props.id)
            : props.id;
        const version = props.version;
        const shard = (config === null || config === void 0 ? void 0 : config.noShard) ? undefined : process.env.ADAAS_APP_SHARD;
        return `${namespace}@${scope}:${entity}:${shard ? (shard + '--' + id) : id}${version ? ('@' + version) : ''}`;
    }
    /**
     * Parse ASEID into its components
     *
     *
     * @param identity
     * @returns
     */
    static parseASEID(identity) {
        const [namespace, body, version] = identity.split('@');
        const [scope, entity, id] = body.split(':');
        return {
            namespace,
            scope: scope,
            entity,
            id: id,
            version: version ? version : undefined
        };
    }
    static toUpperSnakeCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    }
    static toCamelCase(str) {
        return str.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    }
    static isObject(item) {
        return item !== null && typeof item === 'object' && !Array.isArray(item);
    }
    static deepMerge(target, source, visited = new Map()) {
        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        target[key] = {};
                    }
                    // Check if the source object has already been visited
                    if (!visited.has(source[key])) {
                        visited.set(source[key], {});
                        this.deepMerge(target[key], source[key], visited);
                    }
                    else {
                        target[key] = visited.get(source[key]);
                    }
                }
                else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
    static deepClone(target) {
        // Check if the value is null or undefined
        if (target === null || target === undefined) {
            return target;
        }
        // Handle primitive types (string, number, boolean, etc.)
        if (typeof target !== 'object') {
            return target;
        }
        // Handle Date
        if (target instanceof Date) {
            return new Date(target.getTime());
        }
        // Handle Array
        if (Array.isArray(target)) {
            return target.map(item => this.deepClone(item));
        }
        // Handle Function
        if (typeof target === 'function') {
            return target;
        }
        // Handle Object
        if (target instanceof Object) {
            const clone = {};
            for (const key in target) {
                if (target.hasOwnProperty(key)) {
                    clone[key] = this.deepClone(target[key]);
                }
            }
            return clone;
        }
        // For any other cases
        throw new Error('Unable to clone the object. Unsupported type.');
    }
    static deepCloneAndMerge(target, source) {
        if ((source === null || source === undefined) &&
            (target === null || target === undefined))
            return target;
        // Check if the value is null or undefined
        if ((target === null || target === undefined) &&
            source) {
            return this.deepClone(source);
        }
        // Handle primitive types (string, number, boolean, etc.)
        if (typeof target !== 'object') {
            return target;
        }
        // Handle Date
        if (target instanceof Date) {
            return new Date(target.getTime());
        }
        // Handle Array
        if (Array.isArray(target)) {
            return target.map(item => this.deepCloneAndMerge(item, source));
        }
        // Handle Function
        if (typeof target === 'function') {
            return target;
        }
        // Handle Object
        if (target instanceof Object) {
            const clone = {};
            for (const key in target) {
                if (source[key])
                    clone[key] = this.deepCloneAndMerge(target[key], source[key]);
                else
                    clone[key] = this.deepClone(target[key]);
            }
            for (const key in source) {
                if (target[key])
                    clone[key] = this.deepCloneAndMerge(target[key], source[key]);
                else
                    clone[key] = this.deepClone(source[key]);
            }
            return clone;
        }
        // For any other cases
        throw new Error('Unable to clone the object. Unsupported type.');
    }
}
exports.A_SDK_CommonHelper = A_SDK_CommonHelper;
A_SDK_CommonHelper.aseidRegexp = new RegExp(`^[a-z|A-Z|0-9]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z]+:[a-z|A-Z|0-9|-]+(@v[0-9]+|@lts)?$`);
//# sourceMappingURL=Common.helper.js.map