import { A_SDK_Deferred } from "../global/A_SDK_Deferred.class";
import { A_SDK_ScheduleObject } from "../global/A_SDK_ScheduleObject.class";
import { A_SDK_TYPES__ScheduleObjectConfig } from "../types/A_SDK_ScheduleObject.types";

type NestedObject = { [key: string]: any };

export class A_SDK_CommonHelper {

    static aseidRegexp: RegExp = new RegExp(`^[a-z|A-Z|0-9]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z]+:[a-z|A-Z|0-9|-]+(@v[0-9]+|@lts)?$`)


    static delay<T = void>(ms = 1000, resolver?: Promise<T>) {
        return new Promise<T>((resolve, reject) => setTimeout(() => {
            if (resolver) {
                resolver.then(resolve).catch(reject);
            }
            else {
                resolve(0 as T);
            }
        }, ms))
    }


    static schedule<T = void>(
        ms = 1000,
        resolver: () => Promise<T>,
        config?: A_SDK_TYPES__ScheduleObjectConfig
    ): A_SDK_ScheduleObject<T> {
        return new A_SDK_ScheduleObject<T>(ms, resolver, config);
    }

    static resolve() {
        return new Promise<undefined>((resolve) => resolve(undefined));
    }

    static omitArrayProperties<T, S extends string>(array: Array<T>, fields: string[]): Omit<T, S>[] {

        return array;
    }

    static sanitizeHTML(html: string): string {
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
    static omitProperties<T, S extends string>(
        input: T,
        paths: string[]

    ): Omit<T, S> {

        // Deep clone the input object or array
        const result = JSON.parse(JSON.stringify(input));

        // Helper function to recursively remove properties
        function removeProperties(obj: NestedObject | any[], currPath: string[]) {
            const currKey = currPath[0];
            if (currPath.length === 1) {
                // If current path has only one key, delete the property
                delete obj[currKey];
            } else if (obj[currKey] !== undefined && typeof obj[currKey] === 'object') {
                // If current key exists and is an object, recursively call removeProperties
                removeProperties(obj[currKey], currPath.slice(1));
            }
        }

        // Iterate through each path and remove corresponding properties from the result
        paths.forEach(path => {
            const pathKeys = path.split('.');
            removeProperties(result, pathKeys);
        });

        return result as Omit<T, S>;
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

    static isASEID(identity: string): boolean {
        return this.aseidRegexp.test(
            identity
        )
    }


    /**
     * Generate an ASEID from a namespace, entity, and id
     * 
     * @param props 
     * @returns 
     */
    static generateASEID(
        props: {
            /**
             * Namespace for the ASEID 
             * Generally it is the application name or code, should correspond to the namespace of the application
             * Could be ID or ASEID
             */
            namespace?: string,

            /**
             * Entity Scope the primary location of the resource 
             * Organization, or organization Unit
             * Could be ID or ASEID
             * 
             */
            scope: number | string

            /**
             * Entity Type the type of the resource
             */
            entity: string

            /**
             * Entity ID the unique identifier of the resource
             */
            id: number | string

            /**
             * Version of the entity (optional)
             */
            version?: string
        },
        config?: Partial<{
            /**
             * If true, the shard will not be added to the ASEID
             */
            noShard: boolean
        }>
    ): string {

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

        const shard = config?.noShard ? undefined : process.env.ADAAS_APP_SHARD;


        return `${namespace}@${scope}:${entity}:${shard ? (shard + '--' + id) : id}${version ? ('@' + version) : ''}`
    }


    /**
     * Parse ASEID into its components
     * 
     * 
     * @param identity 
     * @returns 
     */
    static parseASEID(identity: string): {
        /*
         * Namespace for the ASEID 
         * generally it is the application name or code, should correspond to the namespace of the application
         */
        namespace: string,
        /**
         * Entity Scope the primary location of the resource
         * Organization, or organization Unit
         */
        scope: string,
        /**
         * Entity Type the type of the resource
         */
        entity: string
        /**
         * Entity ID the unique identifier of the resource
         */
        id: string

        /**
         * Version of the entity (optional)
         */
        version?: string
    } {
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


    static toUpperSnakeCase(str: string): string {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    }

    static toCamelCase(str: string): string {
        return str.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
    }



    static isObject(item: any): boolean {
        return item !== null && typeof item === 'object' && !Array.isArray(item);
    }

    static deepMerge<T = any>(target: any, source: any, visited = new Map<any, any>()): T {
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
                    } else {
                        target[key] = visited.get(source[key]);
                    }
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }


    deepClone<T>(obj: T): T {
        // Check if the value is null or undefined
        if (obj === null || obj === undefined) {
            return obj;
        }

        // Handle primitive types (string, number, boolean, etc.)
        if (typeof obj !== 'object') {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            return new Date(obj.getTime()) as T;
        }

        // Handle Array
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item)) as unknown as T;
        }

        // Handle Function
        if (typeof obj === 'function') {
            return obj;
        }

        // Handle Object
        if (obj instanceof Object) {
            const clone = {} as T;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clone[key] = this.deepClone(obj[key]);
                }
            }
            return clone;
        }

        // For any other cases
        throw new Error('Unable to clone the object. Unsupported type.');
    }
}