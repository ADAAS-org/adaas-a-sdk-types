"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_Entity = void 0;
const Common_helper_1 = require("../helpers/Common.helper");
class A_Entity {
    constructor(aseidOrEntity) {
        if (aseidOrEntity) {
            if (typeof aseidOrEntity === 'string') {
                this.aseid = aseidOrEntity;
            }
            else if (aseidOrEntity.hasOwnProperty('aseid') || aseidOrEntity.aseid) {
                this.aseid = aseidOrEntity.aseid;
            }
        }
    }
    /**
     * Extracts the ID from the ASEID
     * ID is the unique identifier of the entity
     */
    get id() {
        const { id } = Common_helper_1.A_SDK_CommonHelper.extractASEID(this.aseid);
        return id;
    }
    /**
     * Extracts the namespace from the ASEID
     * namespace is an application specific identifier from where the entity is coming from
     */
    get namespace() {
        const { namespace } = Common_helper_1.A_SDK_CommonHelper.extractASEID(this.aseid);
        return namespace;
    }
    /**
     * Extracts the entity from the ASEID
     * entity is the name of the entity from Application Namespace
     */
    get entity() {
        const { entity } = Common_helper_1.A_SDK_CommonHelper.extractASEID(this.aseid);
        return entity;
    }
}
exports.A_Entity = A_Entity;
//# sourceMappingURL=A_Entity.class.js.map