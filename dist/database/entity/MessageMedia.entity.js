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
exports.MessageMediaEntity = void 0;
const openapi = require("@nestjs/swagger");
const Media_enum_1 = require("../../shared/enums/Media.enum");
const typeorm_1 = require("typeorm");
const Message_entity_1 = require("./Message.entity");
let MessageMediaEntity = class MessageMediaEntity extends typeorm_1.BaseEntity {
    id;
    url;
    messageId;
    type;
    message;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, url: { required: true, type: () => String }, messageId: { required: true, type: () => Number }, type: { required: true, enum: require("../../shared/enums/Media.enum").MessageMediaTypes }, message: { required: true, type: () => require("./Message.entity").MessageEntity } };
    }
};
exports.MessageMediaEntity = MessageMediaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageMediaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MessageMediaEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MessageMediaEntity.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Media_enum_1.MessageMediaTypes }),
    __metadata("design:type", String)
], MessageMediaEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Message_entity_1.MessageEntity, (message) => message, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "messageId" }),
    __metadata("design:type", Message_entity_1.MessageEntity)
], MessageMediaEntity.prototype, "message", void 0);
exports.MessageMediaEntity = MessageMediaEntity = __decorate([
    (0, typeorm_1.Entity)("message_media")
], MessageMediaEntity);
//# sourceMappingURL=MessageMedia.entity.js.map