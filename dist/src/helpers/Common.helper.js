"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_SDK_CommonHelper = void 0;
class A_SDK_CommonHelper {
    static delay(ms = 1000) {
        return new Promise((resolve) => setTimeout(resolve, ms));
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
        function removeProperties(obj, currPath) {
            const currKey = currPath[0];
            if (currPath.length === 1) {
                // If current path has only one key, delete the property
                delete obj[currKey];
            }
            else if (obj[currKey] !== undefined && typeof obj[currKey] === 'object') {
                // If current key exists and is an object, recursively call removeProperties
                removeProperties(obj[currKey], currPath.slice(1));
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
}
exports.A_SDK_CommonHelper = A_SDK_CommonHelper;
A_SDK_CommonHelper.aseidRegexp = new RegExp(`^[a-z|A-Z|0-9]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z]+:[a-z|A-Z|0-9|-]+(@v[0-9]+|@lts)?$`);
//# sourceMappingURL=Common.helper.js.map