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
exports.LoginWithFirebaseDto = exports.LoginDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class LoginDto {
    username;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 3 }, password: { required: true, type: () => String, minLength: 8 } };
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ default: "john123" }),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, swagger_1.ApiProperty)({ default: "12345678" }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class LoginWithFirebaseDto {
    token;
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String } };
    }
}
exports.LoginWithFirebaseDto = LoginWithFirebaseDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginWithFirebaseDto.prototype, "token", void 0);
//# sourceMappingURL=login.dto.js.map