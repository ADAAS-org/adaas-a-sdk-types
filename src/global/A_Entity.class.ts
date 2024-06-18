import { A_SDK_TYPES__IAEntity } from "../types/A_Entity.types";

export class A_Entity implements A_SDK_TYPES__IAEntity {
    aseid: string;

    constructor(aseid: string) {
        this.aseid = aseid;
    }
}
