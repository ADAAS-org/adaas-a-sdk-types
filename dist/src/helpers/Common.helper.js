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
    /**
     * Generate an ASEID from a namespace, entity, and id
     *
     * @param props
     * @returns
     */
    static generateASEID(props) {
        const namespace = props.namespace || process.env.ADAAS_NAMESPACE;
        return `${namespace}@${typeof props.scope === 'number'
            ? this.formatWithLeadingZeros(props.scope)
            : props.scope}:${props.entity}:${typeof props.id === 'number'
            ? this.formatWithLeadingZeros(props.id)
            : props.id}${props.version ? '@' + props.version : ''}`;
    }
    /**
     * Extract namespace, entity, and id from an ASEID
     *
     * @param identity
     * @returns
     */
    static extractASEID(identity) {
        const [namespace, body, version] = identity.split('@');
        const [scope, entity, id] = body.split(':');
        return {
            namespace,
            scope: isNaN(Number(scope)) ? scope : Number(scope),
            entity,
            id: isNaN(Number(id)) ? id : Number(id),
            version: version ? version : undefined
        };
    }
}
exports.A_SDK_CommonHelper = A_SDK_CommonHelper;
//# sourceMappingURL=Common.helper.js.map