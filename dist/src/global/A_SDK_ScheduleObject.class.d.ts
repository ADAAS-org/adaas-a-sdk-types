import { A_SDK_TYPES__ScheduleObjectConfig } from "../types/A_SDK_ScheduleObject.types";
export declare class A_SDK_ScheduleObject<T> {
    private timeout;
    private deferred;
    private config;
    constructor(ms: number, action: () => Promise<T>, config?: A_SDK_TYPES__ScheduleObjectConfig);
    get promise(): Promise<T>;
    clear(): void;
}
