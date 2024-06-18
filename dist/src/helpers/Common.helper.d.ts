export declare class A_SDK_CommonHelper {
    static delay(ms?: number): Promise<unknown>;
    static resolve(): Promise<undefined>;
    static omitArrayProperties<T, S extends string>(array: Array<T>, fields: string[]): Omit<T, S>[];
    static sanitizeHTML(html: string): string;
    static omitProperties<T, S extends string>(input: T, paths: string[]): Omit<T, S>;
    static formatWithLeadingZeros(number: any, maxZeros?: number): string;
    static removeLeadingZeros(formattedNumber: any): string;
    static generateASEID(props: {
        namespace?: string;
        entity: string;
        id: number;
    }): string;
    static extractASEID(identity: string): {
        namespace: string;
        entity: string;
        id: number;
    };
    static extractIdFromIdentity(identity: string): number;
    static generateIdentity(name: string, id: number): string;
}
