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
exports.ChatEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Message_entity_1 = require("./Message.entity");
const Participant_entity_1 = require("./Participant.entity");
let ChatEntity = class ChatEntity extends typeorm_1.BaseEntity {
    id;
    name;
    isGroup;
    adminId;
    lastMessageId;
    createdAt;
    updatedAt;
    admin;
    messages;
    lastMessage;
    participants;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, isGroup: { required: true, type: () => Boolean }, adminId: { required: true, type: () => Number }, lastMessageId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, admin: { required: true, type: () => require("./User.entity").UserEntity }, messages: { required: true, type: () => [require("./Message.entity").MessageEntity] }, lastMessage: { required: true, type: () => require("./Message.entity").MessageEntity }, participants: { required: true, type: () => [require("./Participant.entity").ParticipantEntity] } };
    }
};
exports.ChatEntity = ChatEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ChatEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChatEntity.prototype, "isGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatEntity.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatEntity.prototype, "lastMessageId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChatEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: "adminId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], ChatEntity.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_entity_1.MessageEntity, (message) => message.chat),
    __metadata("design:type", Array)
], ChatEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Message_entity_1.MessageEntity),
    (0, typeorm_1.JoinColumn)({ name: "lastMessageId" }),
    __metadata("design:type", Message_entity_1.MessageEntity)
], ChatEntity.prototype, "lastMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Participant_entity_1.ParticipantEntity, (participant) => participant.chat, { cascade: true }),
    __metadata("design:type", Array)
], ChatEntity.prototype, "participants", void 0);
exports.ChatEntity = ChatEntity = __decorate([
    (0, typeorm_1.Entity)("chats")
], ChatEntity);
//# sourceMappingURL=Chat.entity.js.map