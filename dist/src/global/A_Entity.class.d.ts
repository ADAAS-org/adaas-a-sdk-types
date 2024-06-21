import { A_SDK_TYPES__IAEntity } from "../types/A_Entity.types";
export declare class A_Entity<_NewType = any, _SerializedType extends A_SDK_TYPES__IAEntity = A_SDK_TYPES__IAEntity> implements A_SDK_TYPES__IAEntity {
    /**
     *  A - ADAAS
     *  S - System
     *  E - Entity
     *  I - Identifier
     *  D - iDentifier
     *
     *
     *  adaas-sso@scope:usr:0000000001
     *
     *  APP_NAMESPACE + @ + SCOPE + : ENTITY_NAME + : + ID + @ + VERSION
     */
    aseid: string;
    constructor(aseidOrEntity?: string | _SerializedType | _NewType);
    /**
     * Extracts the ID from the ASEID
     * ID is the unique identifier of the entity
     */
    get id(): string | number;
    /**
     * Extracts the namespace from the ASEID
     * namespace is an application specific identifier from where the entity is coming from
     */
    get namespace(): string;
    /**
     * Extracts the scope from the ASEID
     * scope is the scope of the entity from Application Namespace
     */
    get scope(): string;
    /**
     * Extracts the entity from the ASEID
     * entity is the name of the entity from Application Namespace
     */
    get entity(): string;
}
