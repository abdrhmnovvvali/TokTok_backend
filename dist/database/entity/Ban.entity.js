"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let BanEntity = class BanEntity extends typeorm_1.BaseEntity {
    id;
    fromId;
    toId;
    createdAt;
    updatedAt;
    from;
    to;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fromId: { required: true, type: () => Number }, toId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, from: { required: true, type: () => require("./User.entity").UserEntity }, to: { required: true, type: () => require("./User.entity").UserEntity } };
    }
};
exports.BanEntity = BanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BanEntity.prototype, "fromId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BanEntity.prototype, "toId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BanEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BanEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.bannedUsers, { onDelete: "CASCADE" }),
    __metadata("design:type", User_entity_1.UserEntity)
], BanEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.bannedBy, { onDelete: "CASCADE" }),
    __metadata("design:type", User_entity_1.UserEntity)
], BanEntity.prototype, "to", void 0);
exports.BanEntity = BanEntity = __decorate([
    (0, typeorm_1.Entity)("bans")
], BanEntity);
//# sourceMappingURL=Ban.entity.js.map