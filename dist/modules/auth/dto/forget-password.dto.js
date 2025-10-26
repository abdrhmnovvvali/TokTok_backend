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
exports.ForgetPasswordConfirmDto = exports.ConfirmOtpDto = exports.ForgetPasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ForgetPasswordDto {
    email;
    resetLink;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, resetLink: { required: true, type: () => String, minLength: 1 } };
    }
}
exports.ForgetPasswordDto = ForgetPasswordDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ForgetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ForgetPasswordDto.prototype, "resetLink", void 0);
class ConfirmOtpDto {
    code;
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => String, minLength: 4 } };
    }
}
exports.ConfirmOtpDto = ConfirmOtpDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ConfirmOtpDto.prototype, "code", void 0);
class ForgetPasswordConfirmDto {
    newPassword;
    repeatPassword;
    token;
    static _OPENAPI_METADATA_FACTORY() {
        return { newPassword: { required: true, type: () => String, minLength: 8 }, repeatPassword: { required: true, type: () => String, minLength: 8 }, token: { required: true, type: () => String, minLength: 1 } };
    }
}
exports.ForgetPasswordConfirmDto = ForgetPasswordConfirmDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ForgetPasswordConfirmDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ForgetPasswordConfirmDto.prototype, "repeatPassword", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)({ default: '' }),
    __metadata("design:type", String)
], ForgetPasswordConfirmDto.prototype, "token", void 0);
//# sourceMappingURL=forget-password.dto.js.map