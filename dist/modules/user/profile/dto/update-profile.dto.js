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
exports.UpdateProfileDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateProfileDto {
    fullName;
    birth;
    occupation;
    bio;
    imageId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String, minLength: 3 }, birth: { required: true, type: () => String, minLength: 3 }, occupation: { required: true, type: () => String, minLength: 2 }, bio: { required: true, type: () => String, minLength: 3 }, imageId: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birth", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "occupation", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: 'fa45b86b-5b2b-4365-a5ec-3a2d41f4dfe6' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "imageId", void 0);
//# sourceMappingURL=update-profile.dto.js.map