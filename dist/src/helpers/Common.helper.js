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
    static formatWithLeadingZeros(number, maxZeros = 10) {
        const formattedNumber = String(number).padStart(maxZeros + 1, '0');
        return formattedNumber.slice(-maxZeros);
    }
    static removeLeadingZeros(formattedNumber) {
        return String(Number(formattedNumber)); // Convert to number and back to string to remove leading zeros
    }
    static extractIdFromIdentity(identity) {
        return parseInt(identity.split(':')[1]);
    }
    static generateIdentity(name, id) {
        return `${name}:${this.formatWithLeadingZeros(id)}`;
    }
}
exports.A_SDK_CommonHelper = A_SDK_CommonHelper;
//# sourceMappingURL=Common.helper.js.map