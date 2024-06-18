import { A_SDK_TYPES__IAEntity } from "../types/A_Entity.types";
export declare class A_Entity<_NewType = any, _SerializedType extends A_SDK_TYPES__IAEntity = A_SDK_TYPES__IAEntity> implements A_SDK_TYPES__IAEntity {
    /**
     *  A - ADAAS
     *  S - System
     *  E - Entity
     *  I - Identifier
     *  D - iDenitifier
     *
     *
     *  adaas-sso@usr:0000000001
     *
     *  APP_NAMESPACE + @ + ENTITY_NAME + : + ID_WITH_LEADING_ZEROS
     */
    aseid: string;
    constructor(aseidOrEntity?: string | _SerializedType | _NewType);
}
