import { A_SDK_CommonHelper } from "../helpers/Common.helper";
import { A_SDK_TYPES__IAEntity } from "../types/A_Entity.types";

export class A_Entity<
    _NewType = any,
    _SerializedType extends A_SDK_TYPES__IAEntity = A_SDK_TYPES__IAEntity,
>
    implements A_SDK_TYPES__IAEntity {


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
    aseid!: string;

    constructor(aseidOrEntity?: string | _SerializedType | _NewType) {
        if (aseidOrEntity) {
            if (typeof aseidOrEntity === 'string') {
                this.aseid = aseidOrEntity;
            } else if (aseidOrEntity.hasOwnProperty('aseid') || (aseidOrEntity as any).aseid) {
                this.aseid = (aseidOrEntity as _SerializedType).aseid;
            }
        }
    }

    /**
     * Extracts the ID from the ASEID
     * ID is the unique identifier of the entity
     */
    get id(): string | number {
        const { id } = A_SDK_CommonHelper.parseASEID(this.aseid);
        return id;
    }

    /**
     * Extracts the namespace from the ASEID
     * namespace is an application specific identifier from where the entity is coming from
     */
    get namespace(): string {
        const { namespace } = A_SDK_CommonHelper.parseASEID(this.aseid);
        return namespace;
    }


    /**
     * Extracts the scope from the ASEID
     * scope is the scope of the entity from Application Namespace
     */
    get scope(): string {
        const { scope } = A_SDK_CommonHelper.parseASEID(this.aseid);
        return scope;
    }

    /**
     * Extracts the entity from the ASEID
     * entity is the name of the entity from Application Namespace
     */
    get entity(): string {
        const { entity } = A_SDK_CommonHelper.parseASEID(this.aseid);
        return entity;
    }
}
