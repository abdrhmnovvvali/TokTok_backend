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
exports.ParticipantEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Chat_entity_1 = require("./Chat.entity");
let ParticipantEntity = class ParticipantEntity extends typeorm_1.BaseEntity {
    id;
    chatId;
    request;
    userId;
    chat;
    user;
    unreadCount;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, chatId: { required: true, type: () => Number }, request: { required: true, type: () => Boolean }, userId: { required: true, type: () => Number }, chat: { required: true, type: () => require("./Chat.entity").ChatEntity }, user: { required: true, type: () => require("./User.entity").UserEntity }, unreadCount: { required: true, type: () => Number } };
    }
};
exports.ParticipantEntity = ParticipantEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ParticipantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ParticipantEntity.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ParticipantEntity.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ParticipantEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat_entity_1.ChatEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "chatId" }),
    __metadata("design:type", Chat_entity_1.ChatEntity)
], ParticipantEntity.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], ParticipantEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ParticipantEntity.prototype, "unreadCount", void 0);
exports.ParticipantEntity = ParticipantEntity = __decorate([
    (0, typeorm_1.Entity)("participants")
], ParticipantEntity);
//# sourceMappingURL=Participant.entity.js.map