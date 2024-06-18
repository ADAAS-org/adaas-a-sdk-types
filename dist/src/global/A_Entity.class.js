"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_Entity = void 0;
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
}
exports.A_Entity = A_Entity;
//# sourceMappingURL=A_Entity.class.js.map