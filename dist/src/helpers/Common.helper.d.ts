export declare class A_SDK_CommonHelper {
    static delay(ms?: number): Promise<unknown>;
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
    /**
     * Generate an ASEID from a namespace, entity, and id
     *
     * @param props
     * @returns
     */
    static generateASEID(props: {
        /**
         * Namespace for the ASEID
         * generally it is the application name or code, should correspond to the namespace of the application
         */
        namespace?: string;
        /**
         * Entity Scope the primary location of the resource
         * Organization, or organization Unit
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
    }): string;
    /**
     * Extract namespace, entity, and id from an ASEID
     *
     * @param identity
     * @returns
     */
    static extractASEID(identity: string): {
        namespace: string;
        /**
         * Entity Scope the primary location of the resource
         * Organization, or organization Unit
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
    };
}
