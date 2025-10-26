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
exports.FollowEntity = void 0;
const openapi = require("@nestjs/swagger");
const Follow_enum_1 = require("../../shared/enums/Follow.enum");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let FollowEntity = class FollowEntity extends typeorm_1.BaseEntity {
    id;
    status;
    fromId;
    toId;
    from;
    to;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, status: { required: true, enum: require("../../shared/enums/Follow.enum").FollowStatusEnum }, fromId: { required: true, type: () => Number }, toId: { required: true, type: () => Number }, from: { required: true, type: () => require("./User.entity").UserEntity }, to: { required: true, type: () => require("./User.entity").UserEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.FollowEntity = FollowEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FollowEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Follow_enum_1.FollowStatusEnum }),
    __metadata("design:type", String)
], FollowEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FollowEntity.prototype, "fromId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FollowEntity.prototype, "toId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.following, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_entity_1.UserEntity)
], FollowEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.follower, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_entity_1.UserEntity)
], FollowEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FollowEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FollowEntity.prototype, "updatedAt", void 0);
exports.FollowEntity = FollowEntity = __decorate([
    (0, typeorm_1.Entity)("follows")
], FollowEntity);
//# sourceMappingURL=Follow.entity.js.map