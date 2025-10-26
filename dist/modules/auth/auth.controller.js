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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const forget_password_dto_1 = require("./dto/forget-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const check_dto_1 = require("./dto/check.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(body) {
        return this.authService.register(body);
    }
    login(body) {
        return this.authService.login(body);
    }
    otpConfim(body) {
        return this.authService.confirmOtpCode(body);
    }
    check(body) {
        return this.authService.check(body);
    }
    forgetPassword(body) {
        return this.authService.forgetPassword(body);
    }
    forgetPasswordConfirm(body) {
        return this.authService.forgetPasswordConfirm(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    loginWithFirebase(body) {
        return this.authService.loginWithFirebase(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("otp_confirm"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ConfirmOtpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "otpConfim", null);
__decorate([
    (0, common_1.Post)("check"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_dto_1.CheckDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "check", null);
__decorate([
    (0, common_1.Post)("forget_password"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)("forget_password/confirm"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordConfirmDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPasswordConfirm", null);
__decorate([
    (0, common_1.Post)("reset_password"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('firebase'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginWithFirebaseDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginWithFirebase", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map