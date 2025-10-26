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
exports.CreateNotificationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Notification_enum_1 = require("../../../shared/enums/Notification.enum");
class CreateNotificationDto {
    userId;
    type;
    message;
    postId;
    storyId;
    commentId;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number, minimum: 1 }, type: { required: true, enum: require("../../../shared/enums/Notification.enum").NotificationEnum }, message: { required: true, type: () => String, minLength: 3 }, postId: { required: false, type: () => Number, minimum: 1 }, storyId: { required: false, type: () => Number, minimum: 1 }, commentId: { required: false, type: () => Number, minimum: 1 } };
    }
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiProperty)({ default: 0 }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsEnum)(Notification_enum_1.NotificationEnum),
    (0, swagger_1.ApiProperty)({ default: Notification_enum_1.NotificationEnum.COMMENT }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: 0 }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "postId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: 0 }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "storyId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: 0 }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "commentId", void 0);
//# sourceMappingURL=create-notification.dto.js.map