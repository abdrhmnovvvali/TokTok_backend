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
exports.LoginAttemptEntity = exports.AttemptEntity = void 0;
const openapi = require("@nestjs/swagger");
const User_enum_1 = require("../../shared/enums/User.enum");
const typeorm_1 = require("typeorm");
let AttemptEntity = class AttemptEntity extends typeorm_1.BaseEntity {
    id;
    userId;
    type;
    attempt;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, type: { required: true, enum: require("../../shared/enums/User.enum").UserAttemptType }, attempt: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.AttemptEntity = AttemptEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttemptEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AttemptEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: User_enum_1.UserAttemptType }),
    __metadata("design:type", String)
], AttemptEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AttemptEntity.prototype, "attempt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], AttemptEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], AttemptEntity.prototype, "updatedAt", void 0);
exports.AttemptEntity = AttemptEntity = __decorate([
    (0, typeorm_1.Entity)("attempts")
], AttemptEntity);
let LoginAttemptEntity = class LoginAttemptEntity extends typeorm_1.BaseEntity {
    id;
    ip;
    userId;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, ip: { required: true, type: () => String }, userId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date } };
    }
};
exports.LoginAttemptEntity = LoginAttemptEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LoginAttemptEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LoginAttemptEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LoginAttemptEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], LoginAttemptEntity.prototype, "createdAt", void 0);
exports.LoginAttemptEntity = LoginAttemptEntity = __decorate([
    (0, typeorm_1.Entity)('login_attempts')
], LoginAttemptEntity);
//# sourceMappingURL=Attempt.entity.js.map