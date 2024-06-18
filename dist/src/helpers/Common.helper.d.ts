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
        namespace?: string;
        entity: string;
        id: number | string;
    }): string;
    /**
     * Extract namespace, entity, and id from an ASEID
     *
     * @param identity
     * @returns
     */
    static extractASEID(identity: string): {
        namespace: string;
        entity: string;
        id: number | string;
    };
}
