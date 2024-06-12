export type A_AUTH_RequestParam = {
    id?: string,
    /**
     * The issuer of the parameter. Could be system, custom, proxy, credentials or SIC to data provider service(e.g. CSS)
     */
    issuer?: 'system' | 'custom' | 'proxy' | 'credentials' | string;
    /**
     * Common internal value, uses for proper mapping
     */
    key?: string,
    /**
     * Allows to define the type of the parameter to convert input during the execution
     */
    type: 'json' | 'array' | 'number' | 'string' | 'boolean' | 'base_64' | 'file' | 'file_url';
    /**
     * The name of the parameter
     */
    name: string,
    /**
     * The value of the parameter
     */
    value: string
}





// =======================================================
// ==================== COMMON TYPES =====================
// =======================================================

export type A_SDK_TYPES__DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? A_SDK_TYPES__DeepPartial<T[P]> : T[P];
};

export type A_SDK_TYPES__ObjectKeyEnum<T, E> = {
    [P in keyof T]?: T[P] extends object ? A_SDK_TYPES__ObjectKeyEnum<T[P], E> : E;
};


export type A_SDK_TYPES__Dictionary<T> = {
    [Key: string]: T;
}