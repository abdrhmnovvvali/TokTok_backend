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
exports.CreateMessageDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateMessageDto {
    content;
    media;
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: false, type: () => String, minLength: 1 }, media: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: "Content cannot be empty" }),
    (0, swagger_1.ApiProperty)({
        required: false,
        example: "Salam",
        description: "Mesaj mətni"
    }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value || undefined),
    (0, class_validator_1.IsUUID)("4", { message: "Media must be a valid UUID" }),
    (0, swagger_1.ApiProperty)({
        required: false,
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Media faylının ID-si",
    }),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "media", void 0);
//# sourceMappingURL=create-message.dto.js.map