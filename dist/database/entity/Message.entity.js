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
exports.MessageEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const MessageMedia_entity_1 = require("./MessageMedia.entity");
const Chat_entity_1 = require("./Chat.entity");
let MessageEntity = class MessageEntity extends typeorm_1.BaseEntity {
    id;
    content;
    userId;
    chatId;
    isDeleted;
    user;
    chat;
    media;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, userId: { required: true, type: () => Number }, chatId: { required: true, type: () => Number }, isDeleted: { required: true, type: () => Boolean }, user: { required: true, type: () => require("./User.entity").UserEntity }, chat: { required: true, type: () => require("./Chat.entity").ChatEntity }, media: { required: true, type: () => require("./MessageMedia.entity").MessageMediaEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], MessageEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Chat_entity_1.ChatEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "chatId" }),
    __metadata("design:type", Chat_entity_1.ChatEntity)
], MessageEntity.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => MessageMedia_entity_1.MessageMediaEntity, (media) => media.message),
    __metadata("design:type", MessageMedia_entity_1.MessageMediaEntity)
], MessageEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updatedAt", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)("messages")
], MessageEntity);
//# sourceMappingURL=Message.entity.js.map