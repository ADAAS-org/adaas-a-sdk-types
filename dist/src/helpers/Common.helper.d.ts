import { A_SDK_ScheduleObject } from "../global/A_SDK_ScheduleObject.class";
import { A_SDK_TYPES__ScheduleObjectConfig } from "../types/A_SDK_ScheduleObject.types";
export declare class A_SDK_CommonHelper {
    static aseidRegexp: RegExp;
    static delay<T = void>(ms?: number, resolver?: Promise<T>): Promise<T>;
    static schedule<T = void>(ms: number | undefined, resolver: () => Promise<T>, config?: A_SDK_TYPES__ScheduleObjectConfig): A_SDK_ScheduleObject<T>;
    static resolve(): Promise<undefined>;
    static omitArrayProperties<T, S extends string>(array: Array<T>, fields: string[]): Omit<T, S>[];
    static sanitizeHTML(html: string): string;
    /**
     *  Omit properties from an object or array with nested objects
     *
     * @param input
     * @param paths
     * @returns
     */
    static omitProperties<T, S extends string>(input: T, paths: string[]): Omit<T, S>;
    /**
     *  Format a number with leading zeros to a fixed length
     *
     * @param number
     * @param maxZeros
     * @returns
     */
    static formatWithLeadingZeros(number: any, maxZeros?: number): string;
    /**
     * Remove leading zeros from a formatted number
     */
    static removeLeadingZeros(formattedNumber: any): string;
    static isASEID(identity: string): boolean;
    /**
     * Generate an ASEID from a namespace, entity, and id
     *
     * @param props
     * @returns
     */
    static generateASEID(props: {
        /**
         * Namespace for the ASEID
         * Generally it is the application name or code, should correspond to the namespace of the application
         * Could be ID or ASEID
         */
        namespace?: string;
        /**
         * Entity Scope the primary location of the resource
         * Organization, or organization Unit
         * Could be ID or ASEID
         *
         */
        scope: number | string;
        /**
         * Entity Type the type of the resource
         */
        entity: string;
        /**
         * Entity ID the unique identifier of the resource
         */
        id: number | string;
        /**
         * Version of the entity (optional)
         */
        version?: string;
    }, config?: Partial<{
        /**
         * If true, the shard will not be added to the ASEID
         */
        noShard: boolean;
    }>): string;
    /**
     * Parse ASEID into its components
     *
     *
     * @param identity
     * @returns
     */
    static parseASEID(identity: string): {
        namespace: string;
        /**
         * Entity Scope the primary location of the resource
         * Organization, or organization Unit
         */
        scope: string;
        /**
         * Entity Type the type of the resource
         */
        entity: string;
        /**
         * Entity ID the unique identifier of the resource
         */
        id: string;
        /**
         * Version of the entity (optional)
         */
        version?: string;
    };
    static toUpperSnakeCase(str: string): string;
    static toCamelCase(str: string): string;
}
